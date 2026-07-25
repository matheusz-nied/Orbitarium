import { useMemo, useState } from "react";
import { BarChart3, Layers, Waves } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import { InteractiveShell, MetricCard } from "../../../components/lesson/InteractionPrimitives";

export const interactions = {
  "plot-ativacoes": PlotAtivacoesInteraction,
  "pilha-profunda-ativacoes": PilhaProfundaAtivacoesInteraction,
  "softmax-temperature-demo": SoftmaxTemperatureDemoInteraction,
} satisfies LessonModule["interactions"];

function PlotAtivacoesInteraction() {
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState(0);
  const [show, setShow] = useState<Record<string, boolean>>({ sigmoid: true, tanh: true, relu: true });

  const points = useMemo(() => {
    const xs = Array.from({ length: 49 }, (_, index) => -6 + index * 0.25);
    return xs.map((x) => {
      const adjusted = x * scale + offset;
      return {
        x,
        sigmoid: 1 / (1 + Math.exp(-adjusted)),
        tanh: Math.tanh(adjusted),
        relu: Math.max(0, adjusted),
      };
    });
  }, [scale, offset]);

  const toPath = (key: "sigmoid" | "tanh" | "relu", transformY: (value: number) => number) =>
    points
      .map((point, index) => `${index === 0 ? "M" : "L"} ${80 + (point.x + 6) * 45} ${transformY(point[key])}`)
      .join(" ");

  return (
    <InteractiveShell
      eyebrow="Curvas"
      title="Compare as ativações no mesmo eixo"
      tone="violet"
      icon={<Waves size={18} aria-hidden="true" />}
      description="Ajuste escala e deslocamento da entrada para perceber saturação, centralização e recorte positivo nas três funções."
    >
      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="grid gap-4">
          <RangeControl label="escala da entrada" value={scale} min={0.5} max={2} step={0.1} onChange={setScale} />
          <RangeControl label="deslocamento" value={offset} min={-2} max={2} step={0.1} onChange={setOffset} />
          <div className="flex flex-wrap gap-2">
            {([
              ["sigmoid", "Sigmoid", "bg-fuchsia-600"],
              ["tanh", "Tanh", "bg-indigo-600"],
              ["relu", "ReLU", "bg-teal-600"],
            ] as const).map(([id, label, activeClass]) => (
              <button
                key={id}
                type="button"
                onClick={() => setShow((current) => ({ ...current, [id]: !current[id] }))}
                className={`rounded-2xl px-4 py-2 text-sm font-black text-white ${show[id] ? activeClass : "bg-slate-300"}`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard label="sigmoid(0)" value={(1 / (1 + Math.exp(-offset))).toFixed(2)} />
            <MetricCard label="tanh(0)" value={Math.tanh(offset).toFixed(2)} />
            <MetricCard label="ReLU(0)" value={Math.max(0, offset).toFixed(2)} />
            <MetricCard label="escala" value={scale.toFixed(1)} />
          </div>
        </div>
        <div className="rounded-3xl bg-white p-5">
          <svg className="w-full" viewBox="0 0 640 340" role="img" aria-label="Curvas de ativações comparadas">
            <rect width="640" height="340" rx="24" fill="#faf5ff" />
            <line x1="80" y1="170" x2="600" y2="170" stroke="#cbd5e1" strokeWidth="2" />
            <line x1="350" y1="50" x2="350" y2="290" stroke="#cbd5e1" strokeWidth="2" />
            {show.sigmoid && <path d={toPath("sigmoid", (y) => 250 - y * 140)} stroke="#d946ef" strokeWidth="4" fill="none" />}
            {show.tanh && <path d={toPath("tanh", (y) => 170 - y * 110)} stroke="#4f46e5" strokeWidth="4" fill="none" />}
            {show.relu && <path d={toPath("relu", (y) => 250 - Math.min(y, 4) * 40)} stroke="#0f766e" strokeWidth="4" fill="none" />}
          </svg>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Observe como sigmoid e tanh achatam nas extremidades, enquanto ReLU preserva uma resposta linear no lado positivo e zera o lado negativo.
          </p>
        </div>
      </div>
    </InteractiveShell>
  );
}

function PilhaProfundaAtivacoesInteraction() {
  const [depth, setDepth] = useState(6);
  const [signal, setSignal] = useState(2.5);
  const [activation, setActivation] = useState<"sigmoid" | "relu">("sigmoid");

  const layers = Array.from({ length: depth }, (_, index) => {
    const gain = activation === "sigmoid"
      ? 0.62 * Math.max(0.25, 1 - Math.abs(signal - 2.5) * 0.18)
      : signal < 0 ? 0.1 : 0.95;
    return Math.pow(gain, index + 1);
  });

  return (
    <InteractiveShell
      eyebrow="Profundidade"
      title="Veja o gradiente encolher ou sobreviver"
      tone="amber"
      icon={<Layers size={18} aria-hidden="true" />}
      description="Compare uma pilha profunda sob ativação saturante e ReLU para construir intuição sobre vanishing gradients."
    >
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="grid gap-4">
          <RangeControl label="número de camadas" value={depth} min={2} max={10} step={1} onChange={setDepth} format={(value) => value.toFixed(0)} />
          <RangeControl label="intensidade do sinal" value={signal} min={-1} max={4} step={0.1} onChange={setSignal} />
          <div className="flex gap-2">
            {(["sigmoid", "relu"] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setActivation(item)}
                className={`rounded-2xl px-4 py-2 text-sm font-black transition ${activation === item ? "bg-amber-600 text-white" : "bg-white text-slate-700"}`}
              >
                {item === "sigmoid" ? "Sigmoid" : "ReLU"}
              </button>
            ))}
          </div>
          <div className="rounded-3xl border border-amber-200 bg-white p-5">
            <p className="text-sm leading-6 text-slate-600">
              {activation === "sigmoid"
                ? "Com unidades saturando, cada camada transmite menos sinal corretivo que a anterior. Em profundidade, isso tende a murchar o gradiente."
                : "Com ReLU ativa no lado positivo, o sinal costuma atravessar as camadas com menos compressão, embora ainda possa morrer no lado negativo."}
            </p>
          </div>
        </div>
        <div className="rounded-3xl bg-white p-5">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-amber-700">Magnitude relativa do gradiente</p>
          <div className="mt-4 grid gap-3">
            {layers.map((value, index) => (
              <div key={index}>
                <div className="mb-1 flex items-center justify-between text-sm font-black text-slate-700">
                  <span>camada {index + 1}</span>
                  <span className="font-mono text-amber-700">{value.toFixed(3)}</span>
                </div>
                <div className="h-4 overflow-hidden rounded-full bg-amber-100">
                  <div className="h-full rounded-full bg-amber-500 transition-[width]" style={{ width: `${Math.max(3, value * 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </InteractiveShell>
  );
}

function SoftmaxTemperatureDemoInteraction() {
  const [temperature, setTemperature] = useState(1);
  const [logitA, setLogitA] = useState(3.2);
  const [logitB, setLogitB] = useState(2.4);
  const [logitC, setLogitC] = useState(0.8);

  const probabilities = useMemo(() => {
    const scaled = [logitA, logitB, logitC].map((value) => value / temperature);
    const maxValue = Math.max(...scaled);
    const exps = scaled.map((value) => Math.exp(value - maxValue));
    const total = exps.reduce((sum, value) => sum + value, 0);
    return exps.map((value) => value / total);
  }, [temperature, logitA, logitB, logitC]);

  const labels = ["gato", "cão", "avião"];

  return (
    <InteractiveShell
      eyebrow="Softmax"
      title="Afie ou espalhe a distribuição"
      tone="rose"
      icon={<BarChart3 size={18} aria-hidden="true" />}
      description="Ajuste logits e uma temperatura conceitual para ver a disputa entre classes ficar mais afiada ou mais difusa."
    >
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="grid gap-4">
          <RangeControl label="logit gato" value={logitA} min={-1} max={5} step={0.1} onChange={setLogitA} />
          <RangeControl label="logit cão" value={logitB} min={-1} max={5} step={0.1} onChange={setLogitB} />
          <RangeControl label="logit avião" value={logitC} min={-1} max={5} step={0.1} onChange={setLogitC} />
          <RangeControl label="temperatura conceitual" value={temperature} min={0.5} max={2.5} step={0.1} onChange={setTemperature} />
          <div className="rounded-3xl border border-rose-200 bg-white p-5 text-sm leading-6 text-slate-600">
            Temperaturas menores deixam a distribuição mais afiada. Temperaturas maiores espalham a massa de probabilidade e reduzem a confiança relativa.
          </div>
        </div>
        <div className="rounded-3xl bg-white p-5">
          <div className="grid gap-3">
            {labels.map((label, index) => (
              <div key={label}>
                <div className="mb-1 flex items-center justify-between text-sm font-black text-slate-700">
                  <span>{label}</span>
                  <span className="font-mono text-rose-700">{(probabilities[index] * 100).toFixed(1)}%</span>
                </div>
                <div className="h-5 overflow-hidden rounded-full bg-rose-100">
                  <div className="h-full rounded-full bg-rose-500 transition-[width]" style={{ width: `${probabilities[index] * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Softmax é relativa: subir um logit não aumenta só a própria barra, mas também força uma redistribuição das demais.
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
  format,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  format?: (value: number) => string;
}) {
  return (
    <label className="grid gap-2 text-sm font-black text-slate-700">
      <span className="flex items-center justify-between gap-3">
        {label}
        <span className="font-mono text-slate-950">{format ? format(value) : value.toFixed(1)}</span>
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
