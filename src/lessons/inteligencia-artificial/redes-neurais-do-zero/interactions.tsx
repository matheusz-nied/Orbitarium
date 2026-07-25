import { useState } from "react";
import { Activity, Layers, SlidersHorizontal } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import {
  InteractiveShell,
  MetricCard,
} from "../../../components/lesson/InteractionPrimitives";

export const interactions = {
  "neuronio-ajustavel": NeuronioAjustavelInteraction,
  "animacao-forward-pass": AnimacaoForwardPassInteraction,
  "mini-treino-rede": MiniTreinoRedeInteraction,
} satisfies LessonModule["interactions"];

function NeuronioAjustavelInteraction() {
  const [x1, setX1] = useState(0.7);
  const [x2, setX2] = useState(0.4);
  const [w1, setW1] = useState(1.2);
  const [w2, setW2] = useState(-0.6);
  const [bias, setBias] = useState(0.2);
  const [activation, setActivation] = useState<"linear" | "relu" | "sigmoid">("relu");

  const z = x1 * w1 + x2 * w2 + bias;
  const output = activation === "linear"
    ? z
    : activation === "relu"
      ? Math.max(0, z)
      : 1 / (1 + Math.exp(-z));

  return (
    <InteractiveShell
      eyebrow="Exploração"
      title="Ajuste um neurônio manualmente"
      tone="violet"
      icon={<SlidersHorizontal size={18} aria-hidden="true" />}
      description="Mude entradas, pesos, bias e ativação para perceber quem puxa a soma para cima, quem puxa para baixo e como a ativação remodela a resposta final."
    >
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-4">
          <RangeControl label="Entrada x1" value={x1} min={-1} max={1} step={0.1} onChange={setX1} />
          <RangeControl label="Entrada x2" value={x2} min={-1} max={1} step={0.1} onChange={setX2} />
          <RangeControl label="Peso w1" value={w1} min={-2} max={2} step={0.1} onChange={setW1} />
          <RangeControl label="Peso w2" value={w2} min={-2} max={2} step={0.1} onChange={setW2} />
          <RangeControl label="Bias" value={bias} min={-1.5} max={1.5} step={0.1} onChange={setBias} />
          <div className="flex flex-wrap gap-2">
            {([
              ["linear", "Linear"],
              ["relu", "ReLU"],
              ["sigmoid", "Sigmoid"],
            ] as const).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setActivation(id)}
                className={`rounded-2xl px-4 py-2 text-sm font-black transition ${
                  activation === id
                    ? "bg-violet-600 text-white"
                    : "bg-white text-slate-700 hover:bg-violet-100"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard label="x1 · w1" value={(x1 * w1).toFixed(2)} />
            <MetricCard label="x2 · w2" value={(x2 * w2).toFixed(2)} />
            <MetricCard label="z antes da ativação" value={z.toFixed(2)} />
            <MetricCard label="saída final" value={output.toFixed(2)} />
          </div>
          <div className="rounded-3xl border border-violet-200 bg-white p-5">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-violet-700">Leitura didática</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {z > 0
                ? "A soma ponderada está positiva. O neurônio tende a ativar, e a função escolhida decide o formato dessa ativação."
                : "A soma ponderada está negativa. Dependendo da ativação, a saída pode permanecer negativa, ser truncada em zero ou virar uma probabilidade abaixo de 0,5."}
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {Math.abs(x1 * w1) > Math.abs(x2 * w2)
                ? "No momento, x1 exerce influência maior que x2 na soma."
                : "No momento, x2 exerce influência maior que x1 na soma."}
            </p>
          </div>
          <div className="rounded-3xl border border-violet-200 bg-violet-50 p-5">
            <p className="font-mono text-sm font-bold text-slate-700">
              z = ({x1.toFixed(1)} × {w1.toFixed(1)}) + ({x2.toFixed(1)} × {w2.toFixed(1)}) + {bias.toFixed(1)}
            </p>
            <p className="mt-2 font-mono text-lg font-black text-violet-700">
              z = {z.toFixed(2)} → saída = {output.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </InteractiveShell>
  );
}

function AnimacaoForwardPassInteraction() {
  const [x1, setX1] = useState(0.9);
  const [x2, setX2] = useState(0.3);
  const [step, setStep] = useState(3);

  const hidden1 = Math.max(0, 1.1 * x1 - 0.4 * x2 + 0.2);
  const hidden2 = Math.max(0, -0.3 * x1 + 1.2 * x2 + 0.1);
  const logit = 1.0 * hidden1 + 0.8 * hidden2 - 0.25;
  const output = 1 / (1 + Math.exp(-logit));

  return (
    <InteractiveShell
      eyebrow="Fluxo"
      title="Siga um forward pass em etapas"
      tone="amber"
      icon={<Layers size={18} aria-hidden="true" />}
      description="Avance passo a passo para ver a rede transformar entradas em ativações ocultas e depois em uma previsão final."
    >
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="grid gap-4">
          <RangeControl label="Entrada x1" value={x1} min={0} max={1} step={0.1} onChange={setX1} />
          <RangeControl label="Entrada x2" value={x2} min={0} max={1} step={0.1} onChange={setX2} />
          <label className="grid gap-2 text-sm font-black text-slate-700">
            <span className="flex items-center justify-between">
              Etapa do forward pass
              <span className="font-mono text-amber-700">{step}/3</span>
            </span>
            <input
              className="w-full accent-slate-950"
              type="range"
              min={1}
              max={3}
              step={1}
              value={step}
              onChange={(event) => setStep(Number(event.target.value))}
            />
          </label>
          <div className="rounded-3xl bg-white p-5">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-amber-700">O que acontece agora?</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {step === 1 && "A rede ainda só conhece as entradas. Nenhuma combinação interna foi calculada."}
              {step === 2 && "A camada escondida cria dois sinais intermediários. Eles já misturam as entradas com pesos diferentes."}
              {step === 3 && "A camada de saída combina os sinais ocultos e produz uma probabilidade final para a previsão atual."}
            </p>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="rounded-3xl border border-amber-200 bg-white p-5">
            <svg className="w-full" viewBox="0 0 460 240" role="img" aria-label="Diagrama simplificado de forward pass">
              <rect width="460" height="240" rx="24" fill="#fffbeb" />
              <circle cx="70" cy="80" r="22" fill={step >= 1 ? "#ffffff" : "#fef3c7"} stroke="#f59e0b" strokeWidth="3" />
              <circle cx="70" cy="160" r="22" fill={step >= 1 ? "#ffffff" : "#fef3c7"} stroke="#f59e0b" strokeWidth="3" />
              <text x="70" y="86" textAnchor="middle" fill="#92400e" fontSize="13" fontWeight="900">x1</text>
              <text x="70" y="166" textAnchor="middle" fill="#92400e" fontSize="13" fontWeight="900">x2</text>
              <circle cx="225" cy="80" r="26" fill={step >= 2 ? "#ffffff" : "#fde68a"} stroke="#d97706" strokeWidth="3" opacity={step >= 2 ? 1 : 0.45} />
              <circle cx="225" cy="160" r="26" fill={step >= 2 ? "#ffffff" : "#fde68a"} stroke="#d97706" strokeWidth="3" opacity={step >= 2 ? 1 : 0.45} />
              <text x="225" y="86" textAnchor="middle" fill="#92400e" fontSize="13" fontWeight="900">h1</text>
              <text x="225" y="166" textAnchor="middle" fill="#92400e" fontSize="13" fontWeight="900">h2</text>
              <circle cx="390" cy="120" r="28" fill={step >= 3 ? "#ffffff" : "#bbf7d0"} stroke="#0f766e" strokeWidth="3" opacity={step >= 3 ? 1 : 0.45} />
              <text x="390" y="126" textAnchor="middle" fill="#0f766e" fontSize="16" fontWeight="900">ŷ</text>
              {[[92,80,199,80],[92,80,199,160],[92,160,199,80],[92,160,199,160]].map(([x1p,y1p,x2p,y2p], idx) => (
                <path key={idx} d={`M ${x1p} ${y1p} C 130 ${y1p}, 165 ${y2p}, ${x2p} ${y2p}`} stroke="#f59e0b" strokeWidth="3" fill="none" opacity={step >= 2 ? 1 : 0.25} />
              ))}
              <path d="M251 80 C 295 80, 330 108, 362 120" stroke="#0f766e" strokeWidth="3" fill="none" opacity={step >= 3 ? 1 : 0.25} />
              <path d="M251 160 C 295 160, 330 132, 362 120" stroke="#0f766e" strokeWidth="3" fill="none" opacity={step >= 3 ? 1 : 0.25} />
            </svg>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard label="h1" value={step >= 2 ? hidden1.toFixed(2) : "—"} />
            <MetricCard label="h2" value={step >= 2 ? hidden2.toFixed(2) : "—"} />
            <MetricCard label="logit" value={step >= 3 ? logit.toFixed(2) : "—"} />
            <MetricCard label="probabilidade" value={step >= 3 ? output.toFixed(2) : "—"} />
          </div>
        </div>
      </div>
    </InteractiveShell>
  );
}

function MiniTreinoRedeInteraction() {
  const [weightA, setWeightA] = useState(0.2);
  const [weightB, setWeightB] = useState(0.2);
  const [bias, setBias] = useState(-0.1);
  const [lr, setLr] = useState(0.6);

  const samples = [
    { x1: 0, x2: 0, y: 0 },
    { x1: 0, x2: 1, y: 1 },
    { x1: 1, x2: 0, y: 1 },
    { x1: 1, x2: 1, y: 1 },
  ];

  const predictions = samples.map((sample) => {
    const z = sample.x1 * weightA + sample.x2 * weightB + bias;
    const yHat = 1 / (1 + Math.exp(-z));
    return { ...sample, z, yHat };
  });

  const loss = predictions.reduce((acc, sample) => {
    const eps = 1e-6;
    return acc - (sample.y * Math.log(sample.yHat + eps) + (1 - sample.y) * Math.log(1 - sample.yHat + eps));
  }, 0) / predictions.length;

  const averageGradW1 = predictions.reduce((acc, sample) => acc + (sample.yHat - sample.y) * sample.x1, 0) / predictions.length;
  const averageGradW2 = predictions.reduce((acc, sample) => acc + (sample.yHat - sample.y) * sample.x2, 0) / predictions.length;
  const averageGradB = predictions.reduce((acc, sample) => acc + (sample.yHat - sample.y), 0) / predictions.length;

  const takeStep = () => {
    setWeightA((value) => value - lr * averageGradW1);
    setWeightB((value) => value - lr * averageGradW2);
    setBias((value) => value - lr * averageGradB);
  };

  const reset = () => {
    setWeightA(0.2);
    setWeightB(0.2);
    setBias(-0.1);
    setLr(0.6);
  };

  return (
    <InteractiveShell
      eyebrow="Treinamento"
      title="Brinque com um mini treino supervisionado"
      tone="emerald"
      icon={<Activity size={18} aria-hidden="true" />}
      description="Use uma versão mínima de uma rede de saída sigmoide para sentir como pesos e bias se movem quando o erro médio aponta uma direção de correção."
    >
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard label="w1" value={weightA.toFixed(2)} />
            <MetricCard label="w2" value={weightB.toFixed(2)} />
            <MetricCard label="bias" value={bias.toFixed(2)} />
            <MetricCard label="loss média" value={loss.toFixed(3)} />
          </div>
          <RangeControl label="taxa de aprendizado" value={lr} min={0.1} max={1} step={0.1} onChange={setLr} />
          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={takeStep} className="rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-black text-white shadow-lg shadow-emerald-900/15">
              Dar um passo de treino
            </button>
            <button type="button" onClick={reset} className="rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-700">
              Resetar
            </button>
          </div>
          <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-4">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">Leitura do momento</p>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              Se a perda cair após alguns passos, os parâmetros estão se deslocando para previsões mais coerentes com o alvo. Se oscilar demais, a taxa de aprendizado pode estar agressiva.
            </p>
          </div>
        </div>
        <div className="rounded-3xl bg-white p-5">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">Mini conjunto tipo OR</p>
          <div className="mt-4 grid gap-3">
            {predictions.map((sample) => (
              <div key={`${sample.x1}-${sample.x2}`} className="rounded-2xl border border-emerald-100 px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-black text-slate-800">
                    entrada ({sample.x1}, {sample.x2}) → alvo {sample.y}
                  </p>
                  <span className="font-mono text-sm font-black text-emerald-700">ŷ = {sample.yHat.toFixed(2)}</span>
                </div>
                <div className="mt-2 h-3 overflow-hidden rounded-full bg-emerald-100">
                  <div className="h-full rounded-full bg-emerald-500 transition-[width]" style={{ width: `${sample.yHat * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Este toy usa um único neurônio sigmoide para isolar a intuição do treinamento. Em redes maiores, a mesma lógica de reduzir a perda se espalha por muitos parâmetros ao mesmo tempo.
          </p>
        </div>
      </div>
    </InteractiveShell>
  );
}

function RangeControl({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="grid gap-2 text-sm font-black text-slate-700">
      <span className="flex items-center justify-between gap-3">
        {label}
        <span className="font-mono text-slate-950">{value.toFixed(1)}</span>
      </span>
      <input
        className="w-full accent-slate-950"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}
