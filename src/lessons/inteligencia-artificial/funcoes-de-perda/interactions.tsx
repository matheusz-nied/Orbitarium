import { useMemo, useState } from "react";
import { BarChart3, Mountain, Target } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import { InteractiveShell, MetricCard } from "../../../components/lesson/InteractionPrimitives";

export const interactions = {
  "classificacao-loss-landscape": ClassificacaoLossLandscapeInteraction,
  "mse-vs-cross-entropy-probabilidades": MseVsCrossEntropyProbabilidadesInteraction,
  "sensibilidade-a-outliers": SensibilidadeAOutliersInteraction,
} satisfies LessonModule["interactions"];

function MseVsCrossEntropyProbabilidadesInteraction() {
  const [correctProbability, setCorrectProbability] = useState(0.65);

  const mse = Math.pow(1 - correctProbability, 2);
  const ce = -Math.log(Math.max(correctProbability, 1e-6));

  return (
    <InteractiveShell
      eyebrow="Comparação"
      title="MSE vs cross-entropy em probabilidades"
      tone="rose"
      icon={<BarChart3 size={18} aria-hidden="true" />}
      description="Deslize a probabilidade prevista para a classe correta e compare como as duas perdas reagem, principalmente perto dos erros confiantes."
    >
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="grid gap-4">
          <RangeControl label="probabilidade da classe correta" value={correctProbability} min={0.01} max={0.99} step={0.01} onChange={setCorrectProbability} />
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard label="MSE" value={mse.toFixed(3)} />
            <MetricCard label="cross-entropy" value={ce.toFixed(3)} />
            <MetricCard label="p correta" value={correctProbability.toFixed(2)} />
            <MetricCard label="p incorreta total" value={(1 - correctProbability).toFixed(2)} />
          </div>
        </div>
        <div className="rounded-3xl bg-white p-5">
          <div className="grid gap-4">
            <LossBar label="MSE" value={mse} colorClass="bg-sky-500" scale={1.4} />
            <LossBar label="Cross-Entropy" value={ce} colorClass="bg-rose-500" scale={1.4} />
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Quando a classe correta recebe pouca probabilidade, a cross-entropy cresce mais agressivamente para sinalizar urgência de correção.
          </p>
        </div>
      </div>
    </InteractiveShell>
  );
}

function ClassificacaoLossLandscapeInteraction() {
  const [correctProbability, setCorrectProbability] = useState(0.25);

  const points = useMemo(() => {
    return Array.from({ length: 50 }, (_, index) => {
      const p = 0.01 + index * 0.02;
      return { p, loss: -Math.log(p) };
    });
  }, []);

  const selectedLoss = -Math.log(correctProbability);
  const path = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${80 + point.p * 460} ${270 - Math.min(point.loss, 4) * 45}`)
    .join(" ");

  return (
    <InteractiveShell
      eyebrow="Paisagem"
      title="Veja o terreno da perda em classificação"
      tone="amber"
      icon={<Mountain size={18} aria-hidden="true" />}
      description="Aqui o eixo horizontal é a probabilidade dada à classe correta. A curva mostra quão caro é ficar confiante na região errada."
    >
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="grid gap-4">
          <RangeControl label="probabilidade da classe correta" value={correctProbability} min={0.01} max={0.99} step={0.01} onChange={setCorrectProbability} />
          <MetricCard label="perda no ponto atual" value={selectedLoss.toFixed(3)} />
          <div className="rounded-3xl border border-amber-200 bg-white p-5 text-sm leading-6 text-slate-600">
            Quanto mais perto de zero fica a probabilidade da classe correta, mais íngreme a parede da cross-entropy. Isso força correção forte em erros confiantes.
          </div>
        </div>
        <div className="rounded-3xl bg-white p-5">
          <svg className="w-full" viewBox="0 0 620 320" role="img" aria-label="Curva de perda para classificação binária">
            <rect width="620" height="320" rx="24" fill="#fffbeb" />
            <line x1="80" y1="270" x2="560" y2="270" stroke="#cbd5e1" strokeWidth="2" />
            <line x1="80" y1="60" x2="80" y2="270" stroke="#cbd5e1" strokeWidth="2" />
            <path d={path} stroke="#d97706" strokeWidth="5" fill="none" />
            <circle cx={80 + correctProbability * 460} cy={270 - Math.min(selectedLoss, 4) * 45} r="8" fill="#be123c" />
          </svg>
        </div>
      </div>
    </InteractiveShell>
  );
}

function SensibilidadeAOutliersInteraction() {
  const [prediction, setPrediction] = useState(8);
  const [target, setTarget] = useState(10);
  const [outlierGap, setOutlierGap] = useState(12);

  const baseError = Math.abs(target - prediction);
  const outlierError = baseError + outlierGap;
  const mseBase = Math.pow(baseError, 2);
  const mseOutlier = Math.pow(outlierError, 2);
  const maeBase = baseError;
  const maeOutlier = outlierError;
  const huber = (error: number) => (error <= 3 ? 0.5 * error * error : 3 * (error - 1.5));

  return (
    <InteractiveShell
      eyebrow="Robustez"
      title="Sinta o efeito de um outlier no objetivo"
      tone="teal"
      icon={<Target size={18} aria-hidden="true" />}
      description="Compare como MSE, MAE e Huber reagem quando um ponto extremo se distancia muito mais do que os casos comuns."
    >
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="grid gap-4">
          <RangeControl label="previsão comum" value={prediction} min={0} max={15} step={1} onChange={setPrediction} />
          <RangeControl label="alvo comum" value={target} min={0} max={15} step={1} onChange={setTarget} />
          <RangeControl label="distância extra do outlier" value={outlierGap} min={0} max={20} step={1} onChange={setOutlierGap} />
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard label="erro comum" value={baseError.toFixed(1)} />
            <MetricCard label="erro do outlier" value={outlierError.toFixed(1)} />
            <MetricCard label="MSE comum" value={mseBase.toFixed(1)} />
            <MetricCard label="MSE outlier" value={mseOutlier.toFixed(1)} />
          </div>
        </div>
        <div className="rounded-3xl bg-white p-5">
          <div className="grid gap-4">
            <LossBar label="MSE" value={mseOutlier} colorClass="bg-rose-500" scale={0.08} />
            <LossBar label="MAE" value={maeOutlier} colorClass="bg-teal-500" scale={1} />
            <LossBar label="Huber" value={huber(outlierError)} colorClass="bg-amber-500" scale={0.2} />
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            O MSE explode com erros extremos; MAE cresce linearmente; Huber fica no meio do caminho. A pergunta prática é: você quer que um ponto extremo comande o treino inteiro?
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
        <span className="font-mono text-slate-950">{value.toFixed(2).replace(/\.00$/, "")}</span>
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

function LossBar({
  label,
  value,
  colorClass,
  scale,
}: {
  label: string;
  value: number;
  colorClass: string;
  scale: number;
}) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-sm font-black text-slate-700">
        <span>{label}</span>
        <span className="font-mono">{value.toFixed(3)}</span>
      </div>
      <div className="h-5 overflow-hidden rounded-full bg-slate-100">
        <div className={`h-full rounded-full ${colorClass} transition-[width]`} style={{ width: `${Math.min(100, Math.max(4, value * scale * 100))}%` }} />
      </div>
    </div>
  );
}
