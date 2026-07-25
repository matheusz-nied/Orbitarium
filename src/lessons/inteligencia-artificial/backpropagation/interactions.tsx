import { useMemo, useState } from "react";
import { Gauge, GitBranch, MoveRight } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import { InteractiveShell, MetricCard } from "../../../components/lesson/InteractionPrimitives";

export const interactions = {
  "cadeia-backprop": CadeiaBackpropInteraction,
  "magnitudes-gradiente": MagnitudesGradienteInteraction,
  "demo-learning-rate": DemoLearningRateInteraction,
} satisfies LessonModule["interactions"];

function CadeiaBackpropInteraction() {
  const [x, setX] = useState(1.4);
  const [w1, setW1] = useState(0.8);
  const [b1, setB1] = useState(-0.3);
  const [w2, setW2] = useState(1.2);
  const [target, setTarget] = useState(1);
  const [step, setStep] = useState(4);

  const z1 = w1 * x + b1;
  const a1 = Math.max(0, z1);
  const yHat = w2 * a1;
  const loss = 0.5 * Math.pow(yHat - target, 2);
  const dLdy = yHat - target;
  const dydw2 = a1;
  const dLdw2 = dLdy * dydw2;
  const dLda1 = dLdy * w2;
  const da1dz1 = z1 > 0 ? 1 : 0;
  const dLdw1 = dLda1 * da1dz1 * x;
  const dLdb1 = dLda1 * da1dz1;

  return (
    <InteractiveShell
      eyebrow="Regra da cadeia"
      title="Siga um backward pass em uma rede minúscula"
      tone="violet"
      icon={<GitBranch size={18} aria-hidden="true" />}
      description="Controle uma rede escalar simples e veja, em etapas, como a derivada da perda se decompõe em fatores locais até alcançar cada parâmetro."
    >
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="grid gap-4">
          <RangeControl label="entrada x" value={x} min={-2} max={2} step={0.1} onChange={setX} />
          <RangeControl label="w1" value={w1} min={-2} max={2} step={0.1} onChange={setW1} />
          <RangeControl label="b1" value={b1} min={-1.5} max={1.5} step={0.1} onChange={setB1} />
          <RangeControl label="w2" value={w2} min={-2} max={2} step={0.1} onChange={setW2} />
          <RangeControl label="alvo y" value={target} min={-1} max={2} step={0.1} onChange={setTarget} />
          <RangeControl label="etapa do backward" value={step} min={1} max={4} step={1} onChange={setStep} format={(value) => value.toFixed(0)} />
        </div>
        <div className="grid gap-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard label="z1" value={z1.toFixed(2)} />
            <MetricCard label="a1 = ReLU(z1)" value={a1.toFixed(2)} />
            <MetricCard label="ŷ" value={yHat.toFixed(2)} />
            <MetricCard label="loss" value={loss.toFixed(3)} />
          </div>
          <div className="rounded-3xl border border-violet-200 bg-white p-5 text-sm leading-6 text-slate-600">
            {step >= 1 && <p><strong>1.</strong> dL/dŷ = {dLdy.toFixed(2)} indica como a perda reage a mudanças na saída final.</p>}
            {step >= 2 && <p className="mt-2"><strong>2.</strong> dL/dw2 = dL/dŷ · dŷ/dw2 = {dLdy.toFixed(2)} · {dydw2.toFixed(2)} = {dLdw2.toFixed(2)}.</p>}
            {step >= 3 && <p className="mt-2"><strong>3.</strong> O gradiente volta para a ativação escondida: dL/da1 = {dLda1.toFixed(2)}.</p>}
            {step >= 4 && <p className="mt-2"><strong>4.</strong> Como da1/dz1 = {da1dz1}, obtemos dL/dw1 = {dLdw1.toFixed(2)} e dL/db1 = {dLdb1.toFixed(2)}.</p>}
          </div>
        </div>
      </div>
    </InteractiveShell>
  );
}

function MagnitudesGradienteInteraction() {
  const [depth, setDepth] = useState(8);
  const [localFactor, setLocalFactor] = useState(0.7);

  const magnitudes = useMemo(() => {
    return Array.from({ length: depth }, (_, index) => Math.pow(localFactor, index + 1));
  }, [depth, localFactor]);

  return (
    <InteractiveShell
      eyebrow="Estabilidade"
      title="Multiplicando fatores locais ao longo da profundidade"
      tone="amber"
      icon={<Gauge size={18} aria-hidden="true" />}
      description="Ajuste um fator local médio para ver rapidamente por que cadeias profundas podem matar ou inflar gradientes."
    >
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="grid gap-4">
          <RangeControl label="profundidade" value={depth} min={2} max={12} step={1} onChange={setDepth} format={(value) => value.toFixed(0)} />
          <RangeControl label="fator local médio" value={localFactor} min={0.2} max={1.4} step={0.05} onChange={setLocalFactor} />
          <div className="rounded-3xl border border-amber-200 bg-white p-5 text-sm leading-6 text-slate-600">
            {localFactor < 1
              ? "Cada etapa encolhe o sinal. Em profundidade suficiente, o gradiente praticamente desaparece antes de alcançar o início da rede."
              : localFactor > 1
                ? "Cada etapa amplia o sinal. Em poucas camadas o gradiente já pode crescer demais e gerar updates explosivos."
                : "Fator unitário é um caso idealizado: o sinal mantém escala parecida ao longo da cadeia."}
          </div>
        </div>
        <div className="rounded-3xl bg-white p-5">
          <div className="grid gap-3">
            {magnitudes.map((value, index) => (
              <div key={index}>
                <div className="mb-1 flex items-center justify-between text-sm font-black text-slate-700">
                  <span>camada {index + 1}</span>
                  <span className="font-mono text-amber-700">{value.toFixed(4)}</span>
                </div>
                <div className="h-4 overflow-hidden rounded-full bg-amber-100">
                  <div className="h-full rounded-full bg-amber-500 transition-[width]" style={{ width: `${Math.min(100, Math.max(3, value * 100))}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </InteractiveShell>
  );
}

function DemoLearningRateInteraction() {
  const [weight, setWeight] = useState(5);
  const [learningRate, setLearningRate] = useState(0.4);
  const optimum = 1.5;
  const gradient = 2 * (weight - optimum);
  const loss = Math.pow(weight - optimum, 2);
  const nextWeight = weight - learningRate * gradient;

  const takeStep = () => setWeight(nextWeight);
  const reset = () => {
    setWeight(5);
    setLearningRate(0.4);
  };

  return (
    <InteractiveShell
      eyebrow="Atualização"
      title="Transforme gradiente em passo real"
      tone="emerald"
      icon={<MoveRight size={18} aria-hidden="true" />}
      description="Use uma perda quadrática simples para ver convergência, lentidão ou overshoot ao mudar a learning rate."
    >
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="grid gap-4">
          <RangeControl label="peso atual" value={weight} min={-2} max={6} step={0.1} onChange={setWeight} />
          <RangeControl label="learning rate" value={learningRate} min={0.05} max={1.2} step={0.05} onChange={setLearningRate} />
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard label="gradiente" value={gradient.toFixed(2)} />
            <MetricCard label="loss" value={loss.toFixed(3)} />
            <MetricCard label="próximo peso" value={nextWeight.toFixed(2)} />
            <MetricCard label="ótimo" value={optimum.toFixed(1)} />
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={takeStep} className="rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-black text-white shadow-lg shadow-emerald-900/15">
              Dar um passo
            </button>
            <button type="button" onClick={reset} className="rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-700">
              Resetar
            </button>
          </div>
        </div>
        <div className="rounded-3xl bg-white p-5">
          <svg className="w-full" viewBox="0 0 520 260" role="img" aria-label="Parábola com peso atual e próximo passo">
            <rect width="520" height="260" rx="24" fill="#ecfdf5" />
            <path d="M60 220 C 140 70, 280 70, 460 220" stroke="#10b981" strokeWidth="5" fill="none" />
            <circle cx={60 + ((weight + 2) / 8) * 400} cy={220 - Math.min(150, loss * 10)} r="8" fill="#be123c" />
            <circle cx={60 + ((nextWeight + 2) / 8) * 400} cy={220 - Math.min(150, Math.pow(nextWeight - optimum, 2) * 10)} r="8" fill="#0f766e" />
            <text x="70" y="244" fill="#475569" fontSize="12" fontWeight="800">peso atual em vermelho • próximo passo em verde</text>
          </svg>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Se o ponto verde se aproxima do fundo da parábola, a taxa está ajudando. Se ele salta demais para o outro lado repetidamente, a learning rate está agressiva.
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
        <span className="font-mono text-slate-950">{format ? format(value) : value.toFixed(2).replace(/\.00$/, "")}</span>
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
