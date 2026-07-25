import { useMemo, useState, type ReactNode } from "react";
import { BarChart3, Calculator, Layers } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import {
  InteractiveShell,
  MetricCard,
} from "../../../components/lesson/InteractionPrimitives";

export const interactions = {
  "linear-fit-lab": LinearFitLab,
  "sigmoid-explorer": SigmoidExplorer,
  "decision-boundary-lab": DecisionBoundaryLab,
} satisfies LessonModule["interactions"];

const regressionPoints = [
  { x: 0.6, y: 2.3 },
  { x: 1.4, y: 4.1 },
  { x: 2.2, y: 4.8 },
  { x: 3.1, y: 6.7 },
  { x: 3.9, y: 7.2 },
  { x: 4.8, y: 8.8 },
  { x: 5.6, y: 10.1 },
  { x: 6.4, y: 11.5 },
];

const classPoints = [
  { x: 1.0, y: 4.8, label: 0 },
  { x: 1.6, y: 4.1, label: 0 },
  { x: 2.1, y: 3.6, label: 0 },
  { x: 2.8, y: 3.2, label: 0 },
  { x: 4.4, y: 1.5, label: 0 },
  { x: 4.8, y: 1.1, label: 0 },
  { x: 2.7, y: 5.6, label: 1 },
  { x: 3.6, y: 5.1, label: 1 },
  { x: 4.3, y: 4.4, label: 1 },
  { x: 5.2, y: 4.0, label: 1 },
  { x: 5.8, y: 3.4, label: 1 },
  { x: 6.4, y: 2.9, label: 1 },
];

function LinearFitLab() {
  const [slope, setSlope] = useState(1.3);
  const [intercept, setIntercept] = useState(1.8);

  const metrics = useMemo(() => {
    const errors = regressionPoints.map((point) => {
      const predicted = intercept + slope * point.x;
      const residual = point.y - predicted;
      return {
        ...point,
        predicted,
        residual,
      };
    });
    const mse =
      errors.reduce((total, point) => total + point.residual ** 2, 0) /
      errors.length;
    const mae =
      errors.reduce((total, point) => total + Math.abs(point.residual), 0) /
      errors.length;
    return { errors, mse, mae };
  }, [intercept, slope]);

  return (
    <InteractiveShell
      eyebrow="Ajuste linear"
      title="Mova a reta e sinta o erro"
      tone="teal"
      icon={<BarChart3 size={18} aria-hidden="true" />}
      description="Ajuste inclinação e intercepto para aproximar os pontos. Observe como resíduos, MSE e MAE respondem."
    >
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-4">
          <RangeField
            label="Inclinação (w)"
            min={0}
            max={2.5}
            step={0.05}
            value={slope}
            onChange={setSlope}
          />
          <RangeField
            label="Intercepto (b)"
            min={-1}
            max={4}
            step={0.05}
            value={intercept}
            onChange={setIntercept}
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard label="MSE" value={metrics.mse.toFixed(2)} />
            <MetricCard label="MAE" value={metrics.mae.toFixed(2)} />
            <MetricCard label="Equação" value={`y = ${intercept.toFixed(2)} + ${slope.toFixed(2)}x`} />
            <MetricCard
              label="Leitura"
              value={
                metrics.mse < 0.35
                  ? "Ótimo ajuste"
                  : metrics.mse < 0.9
                    ? "Ajuste razoável"
                    : "Reta distante"
              }
            />
          </div>
          <NoteCard title="Como ler">
            Resíduos verticais mostram a distância entre cada ponto real e a reta.
            Quando você melhora a reta, esses segmentos encurtam e o MSE cai.
          </NoteCard>
        </div>
        <div className="rounded-[1.75rem] bg-white p-4">
          <RegressionSvg points={metrics.errors} slope={slope} intercept={intercept} />
        </div>
      </div>
    </InteractiveShell>
  );
}

function SigmoidExplorer() {
  const [score, setScore] = useState(0);
  const [threshold, setThreshold] = useState(0.5);

  const probability = 1 / (1 + Math.exp(-score));
  const logOddsText =
    probability === 0 || probability === 1
      ? "extremo"
      : `${Math.log(probability / (1 - probability)).toFixed(2)}`;

  return (
    <InteractiveShell
      eyebrow="Sigmoide"
      title="Converta escore em probabilidade"
      tone="violet"
      icon={<Calculator size={18} aria-hidden="true" />}
      description="Arraste o escore linear z e veja como a sigmoide transforma log-odds em probabilidade. Depois escolha um threshold para decidir a classe."
    >
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-4">
          <RangeField
            label="Escore linear (z)"
            min={-10}
            max={10}
            step={0.1}
            value={score}
            onChange={setScore}
          />
          <RangeField
            label="Threshold de decisão"
            min={0.1}
            max={0.9}
            step={0.01}
            value={threshold}
            onChange={setThreshold}
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard label="Probabilidade" value={`${(probability * 100).toFixed(1)}%`} />
            <MetricCard label="Log-odds" value={logOddsText} />
            <MetricCard label="Classe prevista" value={probability >= threshold ? "Positiva" : "Negativa"} />
            <MetricCard label="Limiar atual" value={threshold.toFixed(2)} />
          </div>
          <NoteCard title="Intuição">
            No centro da curva, pequenas mudanças em z alteram bastante a
            probabilidade. Nas pontas, a sigmoide satura: o mesmo empurrão em z
            quase não muda a decisão.
          </NoteCard>
        </div>
        <div className="rounded-[1.75rem] bg-white p-4">
          <SigmoidSvg score={score} threshold={threshold} />
        </div>
      </div>
    </InteractiveShell>
  );
}

function DecisionBoundaryLab() {
  const [w1, setW1] = useState(1.2);
  const [w2, setW2] = useState(-1.1);
  const [bias, setBias] = useState(1.5);

  const classified = useMemo(() => {
    return classPoints.map((point) => {
      const z = bias + w1 * point.x + w2 * point.y;
      const probability = 1 / (1 + Math.exp(-z));
      const predicted = probability >= 0.5 ? 1 : 0;
      return { ...point, z, probability, predicted };
    });
  }, [bias, w1, w2]);

  const accuracy =
    classified.filter((point) => point.predicted === point.label).length /
    classified.length;

  const positives = classified.filter((point) => point.predicted === 1).length;

  return (
    <InteractiveShell
      eyebrow="Fronteira"
      title="Gire a fronteira de decisão"
      tone="indigo"
      icon={<Layers size={18} aria-hidden="true" />}
      description="Ajuste os pesos da regressão logística e veja como a reta z = 0 separa o plano em duas regiões de decisão."
    >
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-4">
          <RangeField
            label="Peso de x₁"
            min={-2.5}
            max={2.5}
            step={0.05}
            value={w1}
            onChange={setW1}
          />
          <RangeField
            label="Peso de x₂"
            min={-2.5}
            max={2.5}
            step={0.05}
            value={w2}
            onChange={setW2}
          />
          <RangeField
            label="Viés (b)"
            min={-6}
            max={6}
            step={0.1}
            value={bias}
            onChange={setBias}
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard label="Acurácia no conjunto" value={`${(accuracy * 100).toFixed(0)}%`} />
            <MetricCard label="Positivos previstos" value={`${positives}/${classified.length}`} />
            <MetricCard label="Fronteira" value={`${bias.toFixed(1)} + ${w1.toFixed(1)}x₁ + ${w2.toFixed(1)}x₂ = 0`} />
            <MetricCard
              label="Leitura"
              value={Math.abs(w2) < 0.15 ? "Quase vertical" : Math.abs(w1) < 0.15 ? "Quase horizontal" : "Reta inclinada"}
            />
          </div>
          <NoteCard title="Como pensar">
            A sigmoide transforma o escore em probabilidade, mas a classe muda
            quando cruzamos a reta em que z = 0. Tudo de um lado vira
            probabilidade maior que 0,5; do outro, menor.
          </NoteCard>
        </div>
        <div className="rounded-[1.75rem] bg-white p-4">
          <DecisionBoundarySvg points={classified} w1={w1} w2={w2} bias={bias} />
        </div>
      </div>
    </InteractiveShell>
  );
}

function RegressionSvg({
  points,
  slope,
  intercept,
}: {
  points: Array<{ x: number; y: number; predicted: number; residual: number }>;
  slope: number;
  intercept: number;
}) {
  const width = 480;
  const height = 340;
  const pad = 40;
  const minX = 0;
  const maxX = 7;
  const minY = 0;
  const maxY = 13;
  const mapX = (value: number) => pad + (value - minX) * ((width - pad * 2) / (maxX - minX));
  const mapY = (value: number) => height - pad - (value - minY) * ((height - pad * 2) / (maxY - minY));
  const lineStart = { x: 0, y: intercept };
  const lineEnd = { x: 7, y: intercept + slope * 7 };

  return (
    <svg className="w-full" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Ajuste de reta com resíduos">
      <rect width={width} height={height} rx="28" fill="#f0fdfa" />
      <line x1={pad} y1={height - pad} x2={width - pad} y2={height - pad} stroke="#94a3b8" strokeWidth="2" />
      <line x1={pad} y1={pad} x2={pad} y2={height - pad} stroke="#94a3b8" strokeWidth="2" />
      {[2, 4, 6, 8, 10, 12].map((value) => (
        <g key={value}>
          <line x1={pad} y1={mapY(value)} x2={width - pad} y2={mapY(value)} stroke="#d1fae5" strokeWidth="1" />
          <text x={pad - 10} y={mapY(value) + 4} textAnchor="end" fill="#64748b" fontSize="11" fontWeight="700">
            {value}
          </text>
        </g>
      ))}
      <line
        x1={mapX(lineStart.x)}
        y1={mapY(lineStart.y)}
        x2={mapX(lineEnd.x)}
        y2={mapY(lineEnd.y)}
        stroke="#0f766e"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {points.map((point, index) => (
        <g key={index}>
          <line
            x1={mapX(point.x)}
            y1={mapY(point.y)}
            x2={mapX(point.x)}
            y2={mapY(point.predicted)}
            stroke={Math.abs(point.residual) < 0.6 ? "#10b981" : "#f97316"}
            strokeDasharray="4 4"
            strokeWidth="2"
          />
          <circle cx={mapX(point.x)} cy={mapY(point.y)} r="6.5" fill="#0f172a" />
        </g>
      ))}
      <text x={width / 2} y={28} textAnchor="middle" fill="#0f766e" fontSize="18" fontWeight="900">
        Resíduos menores significam ajuste melhor
      </text>
    </svg>
  );
}

function SigmoidSvg({
  score,
  threshold,
}: {
  score: number;
  threshold: number;
}) {
  const width = 480;
  const height = 340;
  const pad = 44;
  const mapX = (value: number) => pad + ((value + 10) / 20) * (width - pad * 2);
  const mapY = (value: number) => height - pad - value * (height - pad * 2);

  const path = Array.from({ length: 160 }, (_, index) => {
    const x = -10 + (20 * index) / 159;
    const y = 1 / (1 + Math.exp(-x));
    return `${index === 0 ? "M" : "L"} ${mapX(x).toFixed(2)} ${mapY(y).toFixed(2)}`;
  }).join(" ");

  const probability = 1 / (1 + Math.exp(-score));

  return (
    <svg className="w-full" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Curva sigmoide com ponto destacado">
      <rect width={width} height={height} rx="28" fill="#faf5ff" />
      <line x1={pad} y1={height - pad} x2={width - pad} y2={height - pad} stroke="#cbd5e1" strokeWidth="2" />
      <line x1={pad} y1={pad} x2={pad} y2={height - pad} stroke="#cbd5e1" strokeWidth="2" />
      <line x1={pad} y1={mapY(threshold)} x2={width - pad} y2={mapY(threshold)} stroke="#f59e0b" strokeDasharray="6 4" strokeWidth="2" />
      <line x1={mapX(score)} y1={pad} x2={mapX(score)} y2={height - pad} stroke="#a78bfa" strokeDasharray="6 4" strokeWidth="2" />
      <path d={path} fill="none" stroke="#7c3aed" strokeWidth="5" strokeLinecap="round" />
      <circle cx={mapX(score)} cy={mapY(probability)} r="7" fill="#0f172a" />
      <text x={width / 2} y={26} textAnchor="middle" fill="#5b21b6" fontSize="18" fontWeight="900">
        z = {score.toFixed(1)} → p = {probability.toFixed(2)}
      </text>
      <text x={width - pad} y={mapY(threshold) - 8} textAnchor="end" fill="#b45309" fontSize="12" fontWeight="800">
        threshold {threshold.toFixed(2)}
      </text>
    </svg>
  );
}

function DecisionBoundarySvg({
  points,
  w1,
  w2,
  bias,
}: {
  points: Array<{
    x: number;
    y: number;
    label: number;
    predicted: number;
  }>;
  w1: number;
  w2: number;
  bias: number;
}) {
  const width = 480;
  const height = 340;
  const pad = 36;
  const minX = 0.5;
  const maxX = 6.8;
  const minY = 0.6;
  const maxY = 6;
  const mapX = (value: number) => pad + ((value - minX) / (maxX - minX)) * (width - pad * 2);
  const mapY = (value: number) => height - pad - ((value - minY) / (maxY - minY)) * (height - pad * 2);
  const boundaryPoints = getBoundaryPoints(w1, w2, bias, minX, maxX, minY, maxY);

  return (
    <svg className="w-full" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Plano com fronteira de decisão">
      <rect width={width} height={height} rx="28" fill="#eef2ff" />
      <BackgroundDecisionField
        width={width}
        height={height}
        pad={pad}
        minX={minX}
        maxX={maxX}
        minY={minY}
        maxY={maxY}
        w1={w1}
        w2={w2}
        bias={bias}
      />
      <line x1={pad} y1={height - pad} x2={width - pad} y2={height - pad} stroke="#94a3b8" strokeWidth="2" />
      <line x1={pad} y1={pad} x2={pad} y2={height - pad} stroke="#94a3b8" strokeWidth="2" />
      {boundaryPoints ? (
        <line
          x1={mapX(boundaryPoints.x1)}
          y1={mapY(boundaryPoints.y1)}
          x2={mapX(boundaryPoints.x2)}
          y2={mapY(boundaryPoints.y2)}
          stroke="#312e81"
          strokeWidth="4"
          strokeDasharray="8 5"
        />
      ) : null}
      {points.map((point, index) => {
        const correct = point.predicted === point.label;
        const fill = point.label === 1 ? "#4338ca" : "#f97316";
        return (
          <g key={index}>
            <circle
              cx={mapX(point.x)}
              cy={mapY(point.y)}
              r="7.5"
              fill={fill}
              stroke={correct ? "#ffffff" : "#ef4444"}
              strokeWidth={correct ? 2 : 4}
            />
          </g>
        );
      })}
      <text x={width / 2} y={26} textAnchor="middle" fill="#3730a3" fontSize="18" fontWeight="900">
        Região azul: p &ge; 0,5 • região laranja: p &lt; 0,5
      </text>
    </svg>
  );
}

function BackgroundDecisionField({
  width,
  height,
  pad,
  minX,
  maxX,
  minY,
  maxY,
  w1,
  w2,
  bias,
}: {
  width: number;
  height: number;
  pad: number;
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  w1: number;
  w2: number;
  bias: number;
}) {
  const cells: ReactNode[] = [];
  const cols = 14;
  const rows = 10;
  const innerWidth = width - pad * 2;
  const innerHeight = height - pad * 2;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = minX + ((col + 0.5) / cols) * (maxX - minX);
      const y = maxY - ((row + 0.5) / rows) * (maxY - minY);
      const z = bias + w1 * x + w2 * y;
      const positive = z >= 0;
      cells.push(
        <rect
          key={`${row}-${col}`}
          x={pad + (col * innerWidth) / cols}
          y={pad + (row * innerHeight) / rows}
          width={innerWidth / cols}
          height={innerHeight / rows}
          fill={positive ? "#c7d2fe" : "#fed7aa"}
          opacity={0.55}
        />,
      );
    }
  }
  return <>{cells}</>;
}

function getBoundaryPoints(
  w1: number,
  w2: number,
  bias: number,
  minX: number,
  maxX: number,
  minY: number,
  maxY: number,
) {
  const points: Array<{ x: number; y: number }> = [];

  if (Math.abs(w2) > 1e-6) {
    const yAtMinX = -(bias + w1 * minX) / w2;
    const yAtMaxX = -(bias + w1 * maxX) / w2;
    if (yAtMinX >= minY && yAtMinX <= maxY) points.push({ x: minX, y: yAtMinX });
    if (yAtMaxX >= minY && yAtMaxX <= maxY) points.push({ x: maxX, y: yAtMaxX });
  }
  if (Math.abs(w1) > 1e-6) {
    const xAtMinY = -(bias + w2 * minY) / w1;
    const xAtMaxY = -(bias + w2 * maxY) / w1;
    if (xAtMinY >= minX && xAtMinY <= maxX) points.push({ x: xAtMinY, y: minY });
    if (xAtMaxY >= minX && xAtMaxY <= maxX) points.push({ x: xAtMaxY, y: maxY });
  }

  const unique = points.filter(
    (point, index) =>
      points.findIndex(
        (candidate) =>
          Math.abs(candidate.x - point.x) < 1e-3 &&
          Math.abs(candidate.y - point.y) < 1e-3,
      ) === index,
  );

  if (unique.length < 2) return null;
  return {
    x1: unique[0].x,
    y1: unique[0].y,
    x2: unique[1].x,
    y2: unique[1].y,
  };
}

function RangeField({
  label,
  min,
  max,
  step,
  value,
  onChange,
}: {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="grid gap-2 text-sm font-black text-slate-700">
      <span className="flex items-center justify-between gap-3">
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

function NoteCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
        {title}
      </p>
      <p className="mt-2 text-sm leading-6 text-slate-700">{children}</p>
    </div>
  );
}
