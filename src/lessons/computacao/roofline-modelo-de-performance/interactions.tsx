import { useMemo, useState } from "react";
import { Activity, ArrowRightLeft, SlidersHorizontal } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import {
  InteractiveShell,
  MetricCard,
} from "../../../components/lesson/InteractionPrimitives";

type BoundKind = "memory" | "compute";

interface KernelScenario {
  name: string;
  pattern: string;
  clue: string;
  expected: "memory" | "compute" | "depends";
  explanation: string;
}

interface Intervention {
  id: string;
  label: string;
  intensityFactor: number;
  computeFactor: number;
  explanation: string;
}

const NORMALIZED_MACHINE = {
  computePeak: 100,
  bandwidthSlope: 16,
};

const classifierScenarios: KernelScenario[] = [
  {
    name: "AXPY / streaming",
    pattern: "Le muita memoria sequencial e faz pouco trabalho aritmetico por elemento.",
    clue: "Baixo reaproveitamento, pouco trabalho por byte.",
    expected: "memory",
    explanation:
      "Esse tipo de kernel tende a viver no lado esquerdo do grafico. Se o trabalho por byte e pequeno, a banda de memoria vira o teto dominante.",
  },
  {
    name: "Stencil com reuse moderado",
    pattern: "Reaproveita vizinhos, mas ainda visita muitos dados para cada atualizacao.",
    clue: "Intensidade intermediaria; pode melhorar muito com blocking.",
    expected: "depends",
    explanation:
      "Stencils costumam depender fortemente da forma como os dados cabem em cache. Dependendo do problema e do blocking, podem ficar presos na memoria ou caminhar para um regime mais equilibrado.",
  },
  {
    name: "SpMV",
    pattern: "Indices e acessos indiretos fazem muito trafego para pouco trabalho util.",
    clue: "Acesso irregular, baixa intensidade operacional.",
    expected: "memory",
    explanation:
      "Sparse matrix-vector multiply e um exemplo classico de kernel com pouca computacao por byte e acessos que nao ajudam tanto a locality. O teto de memoria costuma dominar.",
  },
  {
    name: "Matmul denso bloqueado",
    pattern: "Mesmo bloco de dados e reutilizado varias vezes antes de voltar a memoria lenta.",
    clue: "Alto reaproveitamento e alta intensidade operacional.",
    expected: "compute",
    explanation:
      "Quando o blocking esta bem feito, multiplicacao de matrizes densa costuma andar para a direita do Roofline e pode passar a depender bem mais do teto de compute.",
  },
];

const interventionOptions: Intervention[] = [
  {
    id: "locality",
    label: "Melhorar locality / blocking",
    intensityFactor: 2.6,
    computeFactor: 1,
    explanation:
      "Reducao de trafego e melhor reaproveitamento normalmente movem o ponto para a direita antes de mexer no teto horizontal.",
  },
  {
    id: "compute",
    label: "Aumentar compute pico / SIMD",
    intensityFactor: 1,
    computeFactor: 1.45,
    explanation:
      "Melhora o teto horizontal, mas so rende muito quando o kernel ja tem intensidade suficiente para querer esse teto.",
  },
  {
    id: "precision",
    label: "Reduzir bytes por elemento",
    intensityFactor: 1.8,
    computeFactor: 1.15,
    explanation:
      "Mudancas de precisao podem atuar nos dois lados: menos bytes por operacao e, em alguns hardwares, outro teto de throughput.",
  },
];

const kernels = [
  {
    id: "streaming",
    name: "AXPY didatico",
    intensity: 0.6,
    summary: "Muito trafego por pouco trabalho util.",
  },
  {
    id: "stencil",
    name: "Stencil moderado",
    intensity: 3.2,
    summary: "Ha reaproveitamento, mas ainda com forte dependencia de cache e DRAM.",
  },
  {
    id: "matmul",
    name: "Matmul bloqueado",
    intensity: 18,
    summary: "Reaproveita dados por varias etapas antes de voltar ao nivel lento da memoria.",
  },
] as const;

function evaluateRoofline(intensity: number, computePeak = NORMALIZED_MACHINE.computePeak) {
  const memoryRoof = intensity * NORMALIZED_MACHINE.bandwidthSlope;
  const performance = Math.min(memoryRoof, computePeak);
  const bound: BoundKind = memoryRoof < computePeak ? "memory" : "compute";
  return { memoryRoof, performance, bound, ridgePoint: computePeak / NORMALIZED_MACHINE.bandwidthSlope };
}

function intensityFromSlider(step: number) {
  return Number((2 ** (step / 2)).toFixed(2));
}

function mapX(value: number) {
  const min = Math.log10(0.25);
  const max = Math.log10(64);
  return 70 + ((Math.log10(value) - min) / (max - min)) * 410;
}

function mapY(value: number) {
  const min = Math.log10(1);
  const max = Math.log10(128);
  return 214 - ((Math.log10(value) - min) / (max - min)) * 154;
}

function rooflinePolyline(computePeak: number) {
  return [0.25, 0.5, 1, 2, 4, 8, 16, 32, 64]
    .map((x) => {
      const y = Math.min(computePeak, x * NORMALIZED_MACHINE.bandwidthSlope);
      return `${mapX(x).toFixed(1)},${mapY(y).toFixed(1)}`;
    })
    .join(" ");
}

function roofLabel(bound: BoundKind) {
  return bound === "memory" ? "memory-bound" : "compute-bound";
}

function RooflineMiniChart({
  intensity,
  computePeak,
}: {
  intensity: number;
  computePeak: number;
}) {
  const current = evaluateRoofline(intensity, computePeak);
  return (
    <svg className="w-full" viewBox="0 0 520 250" role="img" aria-label="Grafico Roofline didatico">
      <rect width="520" height="250" rx="24" fill="#ffffff" />
      <line x1="56" y1="214" x2="476" y2="214" stroke="#94a3b8" strokeWidth="2.5" />
      <line x1="56" y1="214" x2="56" y2="48" stroke="#94a3b8" strokeWidth="2.5" />
      <polyline
        points={rooflinePolyline(computePeak)}
        fill="none"
        stroke="#7c3aed"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={mapX(intensity)} cy={mapY(current.performance)} r="9" fill="#f59e0b" stroke="#ffffff" strokeWidth="3" />
      <text x={mapX(intensity)} y={mapY(current.performance) - 16} textAnchor="middle" fill="#92400e" fontSize="11" fontWeight="900">
        ponto atual
      </text>
      <text x="264" y="238" textAnchor="middle" fill="#475569" fontSize="11" fontWeight="800">
        intensidade operacional (escala log)
      </text>
    </svg>
  );
}

function RooflinePlayground() {
  const [step, setStep] = useState(2);
  const intensity = intensityFromSlider(step);
  const current = useMemo(() => evaluateRoofline(intensity), [intensity]);

  return (
    <InteractiveShell
      eyebrow="Playground"
      title="Mova o ponto no Roofline"
      tone="violet"
      icon={<Activity size={18} aria-hidden="true" />}
      description="O grafico usa uma maquina didatica normalizada. Nao sao FLOPs reais; o objetivo e treinar a leitura do teto relevante."
    >
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-4">
          <label className="grid gap-2 text-sm font-black text-slate-700">
            <span className="flex items-center justify-between gap-4">
              Intensidade operacional
              <span className="font-mono text-violet-700">{intensity} ops/byte</span>
            </span>
            <input
              className="w-full accent-slate-950"
              type="range"
              min={-4}
              max={12}
              step={1}
              value={step}
              onChange={(event) => setStep(Number(event.target.value))}
            />
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard label="Ridge point" value={`${current.ridgePoint.toFixed(2)} ops/byte`} />
            <MetricCard label="Classificacao" value={roofLabel(current.bound)} />
            <MetricCard label="Teto de memoria" value={`${current.memoryRoof.toFixed(1)} unidades`} />
            <MetricCard label="Throughput previsto" value={`${current.performance.toFixed(1)} unidades`} />
          </div>
          <div className="rounded-3xl border border-violet-200 bg-violet-50 p-4">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-violet-700">
              Leitura
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              {current.bound === "memory"
                ? "Voce ainda esta no lado em que a banda manda no jogo. Melhorar reuse, blocking e bytes trafegados tende a ser mais promissor do que erguer apenas o teto de compute."
                : "Voce ja tem intensidade suficiente para querer o teto horizontal. Agora vetorizacao, ILP e melhor uso das unidades de compute tendem a pesar mais."}
            </p>
          </div>
        </div>
        <div className="rounded-3xl bg-violet-100/60 p-4">
          <RooflineMiniChart intensity={intensity} computePeak={NORMALIZED_MACHINE.computePeak} />
        </div>
      </div>
    </InteractiveShell>
  );
}

function KernelClassifier() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [answer, setAnswer] = useState<Record<number, KernelScenario["expected"]>>({});
  const scenario = classifierScenarios[selectedIndex];
  const guess = answer[selectedIndex];
  const isCorrect = guess === scenario.expected;

  const choices: Array<{ id: KernelScenario["expected"]; label: string }> = [
    { id: "memory", label: "memory-bound provavel" },
    { id: "compute", label: "compute-bound provavel" },
    { id: "depends", label: "depende do tamanho / cache" },
  ];

  return (
    <InteractiveShell
      eyebrow="Classificador"
      title="Qual teto domina este kernel?"
      tone="teal"
      icon={<ArrowRightLeft size={18} aria-hidden="true" />}
      description="Escolha um caso, arrisque um diagnostico e compare o raciocinio com a explicacao."
    >
      <div className="grid gap-5 lg:grid-cols-[0.86fr_1.14fr]">
        <div className="grid gap-3">
          {classifierScenarios.map((item, index) => (
            <button
              key={item.name}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className={`rounded-2xl border px-4 py-3 text-left transition ${
                selectedIndex === index
                  ? "border-teal-600 bg-teal-600 text-white"
                  : "border-white/70 bg-white text-slate-700 hover:border-teal-300"
              }`}
            >
              <span className="block text-sm font-black">{item.name}</span>
              <span className="mt-1 block text-xs opacity-80">{item.pattern}</span>
            </button>
          ))}
        </div>
        <div className="rounded-3xl bg-white p-5">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-teal-700">Cenario</p>
          <h4 className="mt-2 font-display text-3xl font-semibold tracking-tight text-slate-950">
            {scenario.name}
          </h4>
          <p className="mt-3 leading-7 text-slate-600">{scenario.pattern}</p>
          <div className="mt-4 rounded-2xl border border-teal-100 bg-teal-50 p-4">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-teal-700">Pista</p>
            <p className="mt-2 text-sm leading-6 text-slate-700">{scenario.clue}</p>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {choices.map((choice) => (
              <button
                key={choice.id}
                type="button"
                onClick={() => setAnswer((previous) => ({ ...previous, [selectedIndex]: choice.id }))}
                className={`rounded-2xl border px-3 py-3 text-sm font-black transition ${
                  guess === choice.id
                    ? "border-slate-950 bg-slate-950 text-white"
                    : "border-slate-200 bg-slate-50 text-slate-700 hover:border-teal-400"
                }`}
              >
                {choice.label}
              </button>
            ))}
          </div>
          {guess ? (
            <div
              className={`mt-5 rounded-2xl border p-4 ${
                isCorrect ? "border-emerald-200 bg-emerald-50" : "border-amber-200 bg-amber-50"
              }`}
            >
              <p
                className={`text-sm font-black uppercase tracking-[0.16em] ${
                  isCorrect ? "text-emerald-700" : "text-amber-700"
                }`}
              >
                {isCorrect ? "Diagnostico coerente" : "Ajuste o raciocinio"}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">{scenario.explanation}</p>
            </div>
          ) : null}
        </div>
      </div>
    </InteractiveShell>
  );
}

function RooflineWhatIf() {
  const [kernelId, setKernelId] = useState<(typeof kernels)[number]["id"]>("streaming");
  const kernel = kernels.find((item) => item.id === kernelId) ?? kernels[0];

  const baseline = useMemo(() => evaluateRoofline(kernel.intensity), [kernel.intensity]);
  const ranked = useMemo(() => {
    return interventionOptions
      .map((intervention) => {
        const nextIntensity = kernel.intensity * intervention.intensityFactor;
        const nextComputePeak = NORMALIZED_MACHINE.computePeak * intervention.computeFactor;
        const next = evaluateRoofline(nextIntensity, nextComputePeak);
        return {
          ...intervention,
          nextIntensity,
          next,
          gain: next.performance - baseline.performance,
        };
      })
      .sort((a, b) => b.gain - a.gain);
  }, [baseline.performance, kernel.intensity]);

  return (
    <InteractiveShell
      eyebrow="What-if"
      title="Compare tipos de intervencao"
      tone="amber"
      icon={<SlidersHorizontal size={18} aria-hidden="true" />}
      description="Escolha um kernel didatico e veja qual familia de mudanca gera mais ganho no modelo normalizado."
    >
      <div className="grid gap-5">
        <div className="grid gap-3 md:grid-cols-3">
          {kernels.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setKernelId(item.id)}
              className={`rounded-2xl border px-4 py-4 text-left transition ${
                kernelId === item.id
                  ? "border-amber-600 bg-amber-600 text-white"
                  : "border-white/70 bg-white text-slate-700 hover:border-amber-300"
              }`}
            >
              <span className="block text-sm font-black">{item.name}</span>
              <span className="mt-1 block text-xs opacity-80">{item.summary}</span>
            </button>
          ))}
        </div>

        <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="grid gap-3">
            <MetricCard label="Intensidade base" value={`${kernel.intensity} ops/byte`} />
            <MetricCard label="Bound base" value={roofLabel(baseline.bound)} />
            <MetricCard label="Throughput base" value={`${baseline.performance.toFixed(1)} unidades`} />
            <div className="rounded-3xl border border-amber-200 bg-amber-50 p-4">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-amber-700">
                Leitura
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                {ranked[0]?.gain > 0
                  ? `Para ${kernel.name}, a melhor aposta no modelo e "${ranked[0]?.label.toLowerCase()}".`
                  : "Neste recorte didatico, nenhuma mudanca gera ganho relevante sem outra alteracao mais profunda do algoritmo."}
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            {ranked.map((item, index) => (
              <div
                key={item.id}
                className={`rounded-3xl border p-4 ${
                  index === 0 ? "border-emerald-200 bg-emerald-50" : "border-slate-200 bg-white"
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-lg font-black text-slate-950">{item.label}</p>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.16em] ${
                      index === 0 ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    ganho {item.gain.toFixed(1)}
                  </span>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <MetricCard label="Nova intensidade" value={`${item.nextIntensity.toFixed(2)} ops/byte`} />
                  <MetricCard label="Novo bound" value={roofLabel(item.next.bound)} />
                  <MetricCard label="Novo throughput" value={`${item.next.performance.toFixed(1)} unidades`} />
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-700">{item.explanation}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </InteractiveShell>
  );
}

export const interactions = {
  "roofline-playground": RooflinePlayground,
  "kernel-classifier": KernelClassifier,
  "roofline-what-if": RooflineWhatIf,
} satisfies LessonModule["interactions"];
