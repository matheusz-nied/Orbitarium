import { useMemo, useState } from "react";
import { ArrowRightLeft, GitBranch, Layers } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import { InteractiveShell } from "../../../components/lesson/InteractionPrimitives";
import {
  CalloutCard,
  MetricGrid,
  RangeField,
  TogglePills,
} from "../sharedPrimitives";

export const interactions = {
  "matrix-parallelism-lab": MatrixParallelismLabInteraction,
  "warp-divergence-lab": WarpDivergenceLabInteraction,
  "bandwidth-vs-compute-lab": BandwidthVsComputeLabInteraction,
} satisfies LessonModule["interactions"];

function MatrixParallelismLabInteraction() {
  const [size, setSize] = useState(16);
  const [workers, setWorkers] = useState(8);
  const cells = size * size;
  const serialSteps = cells;
  const parallelRounds = Math.ceil(cells / workers);

  return (
    <InteractiveShell
      eyebrow="Paralelismo"
      title="Distribua uma multiplicação de matriz"
      tone="indigo"
      icon={<Layers size={18} aria-hidden="true" />}
      description="Aumente o tamanho do problema e o número de workers conceituais para visualizar por que operações de tensor casam com paralelismo de dados."
    >
      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="grid gap-4">
          <RangeField label="Lado da matriz quadrada" value={size} min={4} max={32} step={4} onChange={setSize} />
          <RangeField label="Workers paralelos" value={workers} min={2} max={32} step={2} onChange={setWorkers} />
          <MetricGrid
            metrics={[
              { label: "Células de saída", value: `${cells}` },
              { label: "Passos seriais", value: `${serialSteps}` },
              { label: "Rodadas paralelas", value: `${parallelRounds}` },
              { label: "Leitura", value: workers > size ? "mais paralelismo" : "paralelismo moderado" },
            ]}
          />
        </div>
        <div className="grid gap-4">
          <div className="rounded-3xl border border-indigo-100 bg-white p-5">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-indigo-700">Intuição</p>
            <p className="mt-3 text-sm leading-6 text-slate-700">
              Cada célula da saída pode ser tratada como trabalho semelhante. Quanto mais workers independentes você consegue manter ocupados, mais o problema se aproxima do ponto forte da GPU.
            </p>
            <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-8">
              {Array.from({ length: Math.min(32, workers) }).map((_, index) => (
                <div key={index} className="rounded-xl bg-indigo-100 px-2 py-3 text-center text-xs font-black text-indigo-700">
                  W{index}
                </div>
              ))}
            </div>
          </div>
          <CalloutCard
            title="Leitura"
            body={
              parallelRounds <= size
                ? "Há trabalho homogêneo suficiente para manter muitos workers ocupados. Esse é o tipo de estrutura que a GPU explora muito bem."
                : "O problema ainda paraleliza, mas com poucos workers ou pouca regularidade o ganho efetivo diminui."
            }
            tone="indigo"
          />
        </div>
      </div>
    </InteractiveShell>
  );
}

function WarpDivergenceLabInteraction() {
  const [pattern, setPattern] = useState("uniform");
  const lanes = 8;
  const activeLanes = pattern === "uniform" ? lanes : 4;
  const efficiency = Math.round((activeLanes / lanes) * 100);

  return (
    <InteractiveShell
      eyebrow="SIMT"
      title="Veja a divergência de um grupo de threads"
      tone="rose"
      icon={<GitBranch size={18} aria-hidden="true" />}
      description="Compare um caso em que todas as lanes seguem a mesma lógica com outro em que metade toma um caminho diferente."
    >
      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="grid gap-4">
          <TogglePills
            value={pattern}
            onChange={setPattern}
            options={[
              { value: "uniform", label: "Fluxo uniforme" },
              { value: "divergent", label: "Fluxo divergente" },
            ]}
          />
          <MetricGrid
            metrics={[
              { label: "Lanes totais", value: `${lanes}` },
              { label: "Lanes ativas por passo", value: `${activeLanes}` },
              { label: "Eficiência estimada", value: `${efficiency}%` },
              { label: "Padrão", value: pattern === "uniform" ? "regular" : "irregular" },
            ]}
          />
        </div>
        <div className="grid gap-4">
          <div className="rounded-3xl border border-rose-100 bg-white p-5">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-rose-700">Grupo de execução</p>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {Array.from({ length: lanes }).map((_, index) => {
                const active = pattern === "uniform" || index < 4;
                return (
                  <div
                    key={index}
                    className={`rounded-2xl px-3 py-4 text-center text-sm font-black ${
                      active ? "bg-rose-100 text-rose-700" : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    T{index}
                  </div>
                );
              })}
            </div>
          </div>
          <CalloutCard
            title="Leitura"
            body={
              pattern === "uniform"
                ? "Quando todas as threads avançam pelo mesmo caminho, o hardware aproveita melhor o grupo."
                : "Com divergência, parte do grupo trabalha enquanto a outra parte fica ociosa ou precisa executar outro caminho depois."
            }
            tone={pattern === "uniform" ? "emerald" : "rose"}
          />
        </div>
      </div>
    </InteractiveShell>
  );
}

function BandwidthVsComputeLabInteraction() {
  const [arithmeticIntensity, setArithmeticIntensity] = useState(40);
  const [batching, setBatching] = useState(50);

  const computePressure = Math.round((arithmeticIntensity * 0.7) + (batching * 0.3));
  const memoryPressure = Math.round((100 - arithmeticIntensity) * 0.6 + batching * 0.4);
  const dominant = computePressure >= memoryPressure ? "compute-bound" : "memory-bound";

  return (
    <InteractiveShell
      eyebrow="Gargalo"
      title="Descubra se o problema pede cálculo ou alimentação de dados"
      tone="amber"
      icon={<ArrowRightLeft size={18} aria-hidden="true" />}
      description="Ajuste a intensidade aritmética e o nível de batching conceitual para ver quando a GPU tende a ser limitada por compute ou por bandwidth."
    >
      <div className="grid gap-5 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="grid gap-4">
          <RangeField
            label="Intensidade aritmética"
            value={arithmeticIntensity}
            min={0}
            max={100}
            step={1}
            onChange={setArithmeticIntensity}
            hint="Mais operações úteis por dado movido empurram o workload para compute-bound."
          />
          <RangeField
            label="Batching / volume simultâneo"
            value={batching}
            min={0}
            max={100}
            step={1}
            onChange={setBatching}
            hint="Mais lote aumenta ocupação, mas também pressiona memória e movimentação."
          />
          <MetricGrid
            metrics={[
              { label: "Pressão de compute", value: `${computePressure}` },
              { label: "Pressão de memória", value: `${memoryPressure}` },
              { label: "Leitura dominante", value: dominant },
              { label: "Balanço", value: `${Math.abs(computePressure - memoryPressure)}` },
            ]}
          />
        </div>
        <div className="grid gap-4">
          {[
            { label: "Compute", value: computePressure, color: "#7c3aed" },
            { label: "Memória", value: memoryPressure, color: "#f59e0b" },
          ].map((bar) => (
            <div key={bar.label} className="rounded-3xl border border-slate-100 bg-white p-4">
              <div className="flex items-center justify-between text-sm font-black text-slate-700">
                <span>{bar.label}</span>
                <span className="font-mono">{bar.value}</span>
              </div>
              <div className="mt-3 h-4 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full transition-[width]"
                  style={{ width: `${bar.value}%`, backgroundColor: bar.color }}
                />
              </div>
            </div>
          ))}
          <CalloutCard
            title="Diagnóstico"
            body={
              dominant === "compute-bound"
                ? "Há bastante trabalho útil por dado movimentado. A limitação tende a aparecer mais na capacidade de cálculo do que na alimentação de memória."
                : "Você está movimentando dados demais para o trabalho útil realizado. Otimizar layout, reuso e fusão de operações pode ajudar mais do que apenas lançar mais threads."
            }
            tone={dominant === "compute-bound" ? "emerald" : "amber"}
          />
        </div>
      </div>
    </InteractiveShell>
  );
}
