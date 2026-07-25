import { useMemo, useState } from "react";
import { ArrowDownCircle, Mountain, Route } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import {
  InteractiveShell,
  MetricCard,
} from "../../../components/lesson/InteractionPrimitives";

export const interactions = {
  "slope-at-point-lab": SlopeAtPointLabInteraction,
  "loss-surface-lr-lab": LossSurfaceLearningRateInteraction,
  "optimizer-path-lab": OptimizerPathLabInteraction,
} satisfies LessonModule["interactions"];

function SlopeAtPointLabInteraction() {
  const [x, setX] = useState(1.5);
  const y = slopeFunction(x);
  const derivative = slopeDerivative(x);
  const tangent = {
    x1: x - 1.2,
    y1: y - derivative * 1.2,
    x2: x + 1.2,
    y2: y + derivative * 1.2,
  };

  return (
    <InteractiveShell
      eyebrow="Derivada como inclinação"
      title="Mova o ponto e leia a inclinação local"
      tone="indigo"
      icon={<ArrowDownCircle size={18} aria-hidden="true" />}
      description="A derivada muda conforme a posição no gráfico. Ela não descreve a curva toda: descreve o comportamento local da função exatamente onde você está."
    >
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-4">
          <RangeField label="Posição x" value={x} min={-3} max={4} step={0.1} onChange={setX} />
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard label="f(x)" value={y.toFixed(2)} />
            <MetricCard label="f'(x)" value={derivative.toFixed(2)} />
            <MetricCard label="Sinal" value={derivative > 0 ? "subindo" : derivative < 0 ? "descendo" : "plano"} />
            <MetricCard label="Leitura" value={Math.abs(derivative) < 0.2 ? "quase horizontal" : "inclinação visível"} />
          </div>
        </div>
        <div className="rounded-3xl bg-white p-5">
          <svg className="w-full" viewBox="0 0 360 260" role="img" aria-label="Curva com tangente local">
            <rect width="360" height="260" rx="24" fill="#eef2ff" />
            <line x1="35" y1="210" x2="330" y2="210" stroke="#0f172a" strokeWidth="3" />
            <line x1="170" y1="35" x2="170" y2="235" stroke="#0f172a" strokeWidth="3" />
            <path d={curvePath()} fill="none" stroke="#4f46e5" strokeWidth="6" strokeLinecap="round" />
            <line x1={toPlotX(tangent.x1)} y1={toPlotY(tangent.y1)} x2={toPlotX(tangent.x2)} y2={toPlotY(tangent.y2)} stroke="#0f172a" strokeWidth="4" strokeDasharray="8 6" />
            <circle cx={toPlotX(x)} cy={toPlotY(y)} r="9" fill="#4f46e5" />
          </svg>
        </div>
      </div>
    </InteractiveShell>
  );
}

function LossSurfaceLearningRateInteraction() {
  const [learningRate, setLearningRate] = useState(18);
  const [startX, setStartX] = useState(2.8);
  const [startY, setStartY] = useState(-2.6);
  const lr = learningRate / 100;

  const path = useMemo(() => {
    const steps = [{ x: startX, y: startY }];
    let current = { x: startX, y: startY };
    for (let i = 0; i < 8; i += 1) {
      const gradient = bowlGradient(current.x, current.y);
      current = {
        x: current.x - lr * gradient.dx,
        y: current.y - lr * gradient.dy,
      };
      steps.push(current);
    }
    return steps;
  }, [lr, startX, startY]);

  const last = path[path.length - 1];
  const lastLoss = bowlLoss(last.x, last.y);

  return (
    <InteractiveShell
      eyebrow="Superfície de perda"
      title="Desça um vale 2D com learning rate ajustável"
      tone="teal"
      icon={<Mountain size={18} aria-hidden="true" />}
      description="A visualização mostra curvas de nível da perda. O caminho muda bastante quando o tamanho do passo muda, mesmo com a mesma superfície."
    >
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-4">
          <RangeField label="Learning rate" value={lr} min={0.02} max={0.45} step={0.01} onChange={(value) => setLearningRate(Math.round(value * 100))} />
          <RangeField label="Ponto inicial em x" value={startX} min={-4} max={4} step={0.1} onChange={setStartX} />
          <RangeField label="Ponto inicial em y" value={startY} min={-4} max={4} step={0.1} onChange={setStartY} />
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard label="Passos" value={String(path.length - 1)} />
            <MetricCard label="Loss final" value={lastLoss.toFixed(3)} />
            <MetricCard label="Ponto final" value={`(${last.x.toFixed(2)}, ${last.y.toFixed(2)})`} />
            <MetricCard label="Diagnóstico" value={lr > 0.28 ? "passos ousados" : lr < 0.08 ? "passos lentos" : "faixa estável"} />
          </div>
        </div>
        <div className="rounded-3xl bg-white p-5">
          <svg className="w-full" viewBox="0 0 360 320" role="img" aria-label="Curvas de nível com caminho de gradient descent">
            <rect width="360" height="320" rx="24" fill="#f0fdfa" />
            {[110, 80, 55, 32].map((radius, index) => (
              <ellipse key={radius} cx="180" cy="160" rx={radius} ry={radius * 0.7} fill="none" stroke={index === 3 ? "#14b8a6" : "#99f6e4"} strokeWidth="4" />
            ))}
            <polyline
              fill="none"
              stroke="#0f766e"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={path.map((point) => `${contourX(point.x)},${contourY(point.y)}`).join(" ")}
            />
            {path.map((point, index) => (
              <g key={index}>
                <circle cx={contourX(point.x)} cy={contourY(point.y)} r={index === path.length - 1 ? 8 : 6} fill={index === 0 ? "#334155" : "#0f766e"} />
                <text x={contourX(point.x) + 8} y={contourY(point.y) - 8} fill="#0f766e" fontSize="10" fontWeight="900">{index}</text>
              </g>
            ))}
          </svg>
        </div>
      </div>
    </InteractiveShell>
  );
}

function OptimizerPathLabInteraction() {
  const [mode, setMode] = useState<"suave" | "acidentada">("acidentada");
  const [start, setStart] = useState(1.8);
  const [learningRate, setLearningRate] = useState(0.12);

  const path = useMemo(() => {
    const result = [start];
    let current = start;
    for (let i = 0; i < 10; i += 1) {
      const grad = numericDerivative((x) => objective(mode, x), current);
      current = current - learningRate * grad;
      result.push(current);
    }
    return result;
  }, [mode, start, learningRate]);

  const finalX = path[path.length - 1];
  const finalLoss = objective(mode, finalX);

  return (
    <InteractiveShell
      eyebrow="Caminho do otimizador"
      title="Compare uma paisagem suave com outra cheia de vales competitivos"
      tone="amber"
      icon={<Route size={18} aria-hidden="true" />}
      description="Essa comparação ajuda a construir a intuição de mínimos locais versus paisagens mais simples. O mesmo algoritmo pode se comportar de maneira bem diferente."
    >
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-4">
          <div className="grid gap-2">
            {(["suave", "acidentada"] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setMode(option)}
                className={`rounded-2xl border px-4 py-3 text-left text-sm font-black transition ${mode === option ? "border-amber-600 bg-amber-600 text-white" : "border-amber-100 bg-white text-slate-700 hover:border-amber-300"}`}
              >
                {option === "suave" ? "Paisagem suave" : "Paisagem acidentada"}
              </button>
            ))}
          </div>
          <RangeField label="Ponto inicial" value={start} min={-3} max={3} step={0.1} onChange={setStart} />
          <RangeField label="Learning rate" value={learningRate} min={0.03} max={0.28} step={0.01} onChange={setLearningRate} />
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard label="Passos" value={String(path.length - 1)} />
            <MetricCard label="x final" value={finalX.toFixed(2)} />
            <MetricCard label="Loss final" value={finalLoss.toFixed(3)} />
            <MetricCard label="Leitura" value={mode === "suave" ? "vale simples" : "múltiplos atratores"} />
          </div>
          <div className="rounded-3xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm leading-6 text-slate-700">
              Na função acidentada, pequenas mudanças no início ou na taxa podem levar a trajetórias diferentes. Isso não invalida gradient descent; apenas mostra que a paisagem importa.
            </p>
          </div>
        </div>
        <div className="rounded-3xl bg-white p-5">
          <svg className="w-full" viewBox="0 0 360 260" role="img" aria-label="Função unidimensional com passos do otimizador">
            <rect width="360" height="260" rx="24" fill="#fffbeb" />
            <line x1="35" y1="210" x2="330" y2="210" stroke="#0f172a" strokeWidth="3" />
            <path d={objectivePath(mode)} fill="none" stroke="#d97706" strokeWidth="6" strokeLinecap="round" />
            {path.map((value, index) => (
              <g key={index}>
                <circle cx={toObjectiveX(value)} cy={toObjectiveY(objective(mode, value))} r={index === 0 ? 8 : 6} fill={index === 0 ? "#334155" : "#d97706"} />
                <text x={toObjectiveX(value) + 6} y={toObjectiveY(objective(mode, value)) - 8} fill="#92400e" fontSize="10" fontWeight="900">{index}</text>
              </g>
            ))}
          </svg>
        </div>
      </div>
    </InteractiveShell>
  );
}

function slopeFunction(x: number) {
  return 0.15 * x ** 3 - 0.6 * x + 0.7;
}

function slopeDerivative(x: number) {
  return 0.45 * x ** 2 - 0.6;
}

function curvePath() {
  const xs = Array.from({ length: 80 }, (_, i) => -3 + (i / 79) * 7);
  return xs
    .map((x, index) => `${index === 0 ? "M" : "L"}${toPlotX(x)} ${toPlotY(slopeFunction(x))}`)
    .join(" ");
}

function toPlotX(x: number) {
  return 35 + ((x + 3) / 7) * 295;
}

function toPlotY(y: number) {
  return 210 - (y - -1.2) * 70;
}

function bowlLoss(x: number, y: number) {
  return (x - 0.5) ** 2 + 0.6 * (y + 0.8) ** 2;
}

function bowlGradient(x: number, y: number) {
  return {
    dx: 2 * (x - 0.5),
    dy: 1.2 * (y + 0.8),
  };
}

function contourX(x: number) {
  return 180 + x * 30;
}

function contourY(y: number) {
  return 160 - y * 24;
}

function objective(mode: "suave" | "acidentada", x: number) {
  if (mode === "suave") {
    return 0.55 * (x + 1.2) ** 2 + 0.6;
  }
  return 0.12 * x ** 4 - 0.7 * x ** 2 + 0.28 * x + 1.2;
}

function numericDerivative(fn: (x: number) => number, x: number) {
  const h = 0.0001;
  return (fn(x + h) - fn(x - h)) / (2 * h);
}

function objectivePath(mode: "suave" | "acidentada") {
  const xs = Array.from({ length: 120 }, (_, i) => -3 + (i / 119) * 6);
  return xs.map((x, index) => `${index === 0 ? "M" : "L"}${toObjectiveX(x)} ${toObjectiveY(objective(mode, x))}`).join(" ");
}

function toObjectiveX(x: number) {
  return 35 + ((x + 3) / 6) * 295;
}

function toObjectiveY(y: number) {
  return 220 - (y - 0.1) * 70;
}

function RangeField({
  label,
  value,
  min,
  max,
  step = 0.1,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="grid gap-2 text-sm font-black text-slate-700">
      <span className="flex items-center justify-between gap-4">
        {label}
        <span className="font-mono text-slate-950">{value.toFixed(2)}</span>
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

