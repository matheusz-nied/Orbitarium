import { useMemo, useState, type ReactNode } from "react";
import { BarChart3, Sliders, Target } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import {
  InteractiveShell,
  MetricCard,
} from "../../../components/lesson/InteractionPrimitives";

export const interactions = {
  "confusion-matrix-lab": ConfusionMatrixLab,
  "threshold-tradeoff-lab": ThresholdTradeoffLab,
  "roc-sketch-lab": RocSketchLab,
} satisfies LessonModule["interactions"];

const positiveScores = [0.98, 0.95, 0.92, 0.88, 0.84, 0.79, 0.72, 0.68, 0.61, 0.56, 0.48, 0.31];
const negativeScores = [0.83, 0.66, 0.58, 0.49, 0.41, 0.36, 0.27, 0.21, 0.19, 0.14, 0.09, 0.04];

function ConfusionMatrixLab() {
  const [tp, setTp] = useState(32);
  const [fp, setFp] = useState(10);
  const [tn, setTn] = useState(44);
  const [fn, setFn] = useState(14);

  const metrics = useMemo(() => {
    const total = tp + fp + tn + fn;
    const accuracy = total === 0 ? 0 : (tp + tn) / total;
    const precision = tp + fp === 0 ? 0 : tp / (tp + fp);
    const recall = tp + fn === 0 ? 0 : tp / (tp + fn);
    const f1 =
      precision + recall === 0
        ? 0
        : (2 * precision * recall) / (precision + recall);
    return { total, accuracy, precision, recall, f1 };
  }, [fn, fp, tn, tp]);

  return (
    <InteractiveShell
      eyebrow="Matriz de confusão"
      title="Monte a matriz e veja as métricas nascerem"
      tone="indigo"
      icon={<BarChart3 size={18} aria-hidden="true" />}
      description="Ajuste TP, FP, TN e FN para sentir como cada célula afeta precisão, recall, F1 e acurácia."
    >
      <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="grid gap-4">
          <RangeField label="Verdadeiros positivos (TP)" min={0} max={60} step={1} value={tp} onChange={setTp} integer />
          <RangeField label="Falsos positivos (FP)" min={0} max={60} step={1} value={fp} onChange={setFp} integer />
          <RangeField label="Verdadeiros negativos (TN)" min={0} max={60} step={1} value={tn} onChange={setTn} integer />
          <RangeField label="Falsos negativos (FN)" min={0} max={60} step={1} value={fn} onChange={setFn} integer />
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard label="Acurácia" value={`${(metrics.accuracy * 100).toFixed(1)}%`} />
            <MetricCard label="Precisão" value={`${(metrics.precision * 100).toFixed(1)}%`} />
            <MetricCard label="Recall" value={`${(metrics.recall * 100).toFixed(1)}%`} />
            <MetricCard label="F1" value={metrics.f1.toFixed(2)} />
          </div>
        </div>
        <div className="rounded-[1.75rem] bg-white p-4">
          <ConfusionMatrixSvg tp={tp} fp={fp} tn={tn} fn={fn} total={metrics.total} />
        </div>
      </div>
    </InteractiveShell>
  );
}

function ThresholdTradeoffLab() {
  const [threshold, setThreshold] = useState(0.5);

  const result = useMemo(() => {
    const tp = positiveScores.filter((score) => score >= threshold).length;
    const fn = positiveScores.length - tp;
    const fp = negativeScores.filter((score) => score >= threshold).length;
    const tn = negativeScores.length - fp;
    const precision = tp + fp === 0 ? 0 : tp / (tp + fp);
    const recall = tp + fn === 0 ? 0 : tp / (tp + fn);
    return { tp, fn, fp, tn, precision, recall };
  }, [threshold]);

  return (
    <InteractiveShell
      eyebrow="Threshold"
      title="O mesmo modelo muda quando o limiar muda"
      tone="emerald"
      icon={<Sliders size={18} aria-hidden="true" />}
      description="Mova o threshold sobre as mesmas probabilidades previstas e observe o balanço entre precisão e recall."
    >
      <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="grid gap-4">
          <RangeField
            label="Threshold"
            min={0}
            max={1}
            step={0.01}
            value={threshold}
            onChange={setThreshold}
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard label="TP / FN" value={`${result.tp} / ${result.fn}`} />
            <MetricCard label="FP / TN" value={`${result.fp} / ${result.tn}`} />
            <MetricCard label="Precisão" value={`${(result.precision * 100).toFixed(1)}%`} />
            <MetricCard label="Recall" value={`${(result.recall * 100).toFixed(1)}%`} />
          </div>
          <NoteCard title="Leitura">
            Threshold alto torna o modelo mais seletivo: menos positivos
            previstos, geralmente mais precisão e menos recall. Threshold baixo
            faz o oposto.
          </NoteCard>
        </div>
        <div className="rounded-[1.75rem] bg-white p-4">
          <ThresholdSvg
            threshold={threshold}
            tp={result.tp}
            fp={result.fp}
            precision={result.precision}
            recall={result.recall}
          />
        </div>
      </div>
    </InteractiveShell>
  );
}

function RocSketchLab() {
  const [threshold, setThreshold] = useState(0.5);

  const rocPoints = useMemo(() => {
    const thresholds = Array.from({ length: 21 }, (_, index) => 1 - index * 0.05);
    return thresholds.map((cut) => {
      const tp = positiveScores.filter((score) => score >= cut).length;
      const fp = negativeScores.filter((score) => score >= cut).length;
      const fn = positiveScores.length - tp;
      const tn = negativeScores.length - fp;
      const tpr = tp + fn === 0 ? 0 : tp / (tp + fn);
      const fpr = fp + tn === 0 ? 0 : fp / (fp + tn);
      return { cut, tpr, fpr };
    });
  }, []);

  const currentPoint = useMemo(() => {
    const tp = positiveScores.filter((score) => score >= threshold).length;
    const fp = negativeScores.filter((score) => score >= threshold).length;
    const fn = positiveScores.length - tp;
    const tn = negativeScores.length - fp;
    return {
      tpr: tp + fn === 0 ? 0 : tp / (tp + fn),
      fpr: fp + tn === 0 ? 0 : fp / (fp + tn),
    };
  }, [threshold]);

  return (
    <InteractiveShell
      eyebrow="ROC"
      title="Passeie pela curva ROC"
      tone="rose"
      icon={<Target size={18} aria-hidden="true" />}
      description="Cada threshold vira um ponto em ROC. Ao mover o corte, você desloca o equilíbrio entre taxa de positivos encontrados e taxa de falsos alarmes."
    >
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-4">
          <RangeField
            label="Threshold observado"
            min={0}
            max={1}
            step={0.01}
            value={threshold}
            onChange={setThreshold}
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard label="TPR / Recall" value={`${(currentPoint.tpr * 100).toFixed(1)}%`} />
            <MetricCard label="FPR" value={`${(currentPoint.fpr * 100).toFixed(1)}%`} />
            <MetricCard label="Threshold" value={threshold.toFixed(2)} />
            <MetricCard
              label="Leitura"
              value={
                currentPoint.tpr > 0.8 && currentPoint.fpr < 0.3
                  ? "Regime favorável"
                  : currentPoint.fpr > 0.5
                    ? "Muitos falsos alarmes"
                    : "Compromisso intermediário"
              }
            />
          </div>
          <NoteCard title="Intuição">
            ROC não fixa uma política operacional; ela mostra como o modelo se
            comporta em vários thresholds. O ponto ideal depende do custo dos
            erros no seu problema.
          </NoteCard>
        </div>
        <div className="rounded-[1.75rem] bg-white p-4">
          <RocSvg points={rocPoints} currentPoint={currentPoint} />
        </div>
      </div>
    </InteractiveShell>
  );
}

function ConfusionMatrixSvg({
  tp,
  fp,
  tn,
  fn,
  total,
}: {
  tp: number;
  fp: number;
  tn: number;
  fn: number;
  total: number;
}) {
  const width = 460;
  const height = 340;
  const cell = 96;
  const originX = 120;
  const originY = 92;

  return (
    <svg className="w-full" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Matriz de confusão interativa">
      <rect width={width} height={height} rx="28" fill="#eef2ff" />
      <text x={width / 2} y={28} textAnchor="middle" fill="#3730a3" fontSize="18" fontWeight="900">
        Matriz de confusão
      </text>
      <text x={214} y={74} textAnchor="middle" fill="#475569" fontSize="12" fontWeight="800">
        real positivo
      </text>
      <text x={310} y={74} textAnchor="middle" fill="#475569" fontSize="12" fontWeight="800">
        real negativo
      </text>
      <text x={86} y={145} textAnchor="middle" fill="#475569" fontSize="12" fontWeight="800">
        previsto +
      </text>
      <text x={86} y={241} textAnchor="middle" fill="#475569" fontSize="12" fontWeight="800">
        previsto -
      </text>
      {[
        { x: 0, y: 0, value: tp, label: "TP", fill: "#c7d2fe", text: "#312e81" },
        { x: 1, y: 0, value: fp, label: "FP", fill: "#fed7aa", text: "#9a3412" },
        { x: 0, y: 1, value: fn, label: "FN", fill: "#fee2e2", text: "#b91c1c" },
        { x: 1, y: 1, value: tn, label: "TN", fill: "#d1fae5", text: "#065f46" },
      ].map((cellData) => (
        <g key={cellData.label}>
          <rect
            x={originX + cellData.x * cell}
            y={originY + cellData.y * cell}
            width={cell}
            height={cell}
            rx="18"
            fill={cellData.fill}
            stroke="#ffffff"
            strokeWidth="3"
          />
          <text
            x={originX + cellData.x * cell + cell / 2}
            y={originY + cellData.y * cell + 36}
            textAnchor="middle"
            fill={cellData.text}
            fontSize="14"
            fontWeight="900"
          >
            {cellData.label}
          </text>
          <text
            x={originX + cellData.x * cell + cell / 2}
            y={originY + cellData.y * cell + 66}
            textAnchor="middle"
            fill="#0f172a"
            fontSize="28"
            fontWeight="900"
          >
            {cellData.value}
          </text>
        </g>
      ))}
      <text x={width / 2} y={312} textAnchor="middle" fill="#475569" fontSize="13" fontWeight="700">
        total avaliado: {total} exemplos
      </text>
    </svg>
  );
}

function ThresholdSvg({
  threshold,
  tp,
  fp,
  precision,
  recall,
}: {
  threshold: number;
  tp: number;
  fp: number;
  precision: number;
  recall: number;
}) {
  const width = 480;
  const height = 340;
  const pad = 36;
  const barWidth = 14;
  const gap = 6;
  const totalBars = positiveScores.length + negativeScores.length + 2;
  const chartWidth = totalBars * (barWidth + gap);
  const startX = pad + (width - pad * 2 - chartWidth) / 2;
  const mapY = (value: number) => height - 64 - value * 190;

  return (
    <svg className="w-full" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Distribuição de scores com threshold">
      <rect width={width} height={height} rx="28" fill="#ecfdf5" />
      <text x={width / 2} y={28} textAnchor="middle" fill="#065f46" fontSize="18" fontWeight="900">
        Positivos reais em verde • negativos reais em cinza
      </text>
      <line x1={pad} y1={height - 64} x2={width - pad} y2={height - 64} stroke="#94a3b8" strokeWidth="2" />
      <line
        x1={pad}
        y1={mapY(threshold)}
        x2={width - pad}
        y2={mapY(threshold)}
        stroke="#0f172a"
        strokeDasharray="7 5"
        strokeWidth="3"
      />
      {positiveScores.map((score, index) => (
        <rect
          key={`p-${score}`}
          x={startX + index * (barWidth + gap)}
          y={mapY(score)}
          width={barWidth}
          height={height - 64 - mapY(score)}
          rx="5"
          fill={score >= threshold ? "#10b981" : "#86efac"}
        />
      ))}
      {negativeScores.map((score, index) => (
        <rect
          key={`n-${score}`}
          x={startX + (positiveScores.length + 2 + index) * (barWidth + gap)}
          y={mapY(score)}
          width={barWidth}
          height={height - 64 - mapY(score)}
          rx="5"
          fill={score >= threshold ? "#f97316" : "#cbd5e1"}
        />
      ))}
      <text x={width / 2} y={height - 28} textAnchor="middle" fill="#065f46" fontSize="13" fontWeight="800">
        threshold {threshold.toFixed(2)} • TP {tp} • FP {fp} • precisão {(precision * 100).toFixed(0)}% • recall {(recall * 100).toFixed(0)}%
      </text>
      <text x={width - pad} y={mapY(threshold) - 8} textAnchor="end" fill="#0f172a" fontSize="12" fontWeight="800">
        corte no score
      </text>
    </svg>
  );
}

function RocSvg({
  points,
  currentPoint,
}: {
  points: Array<{ cut: number; tpr: number; fpr: number }>;
  currentPoint: { tpr: number; fpr: number };
}) {
  const width = 480;
  const height = 340;
  const pad = 44;
  const mapX = (value: number) => pad + value * (width - pad * 2);
  const mapY = (value: number) => height - pad - value * (height - pad * 2);

  const path = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${mapX(point.fpr).toFixed(2)} ${mapY(point.tpr).toFixed(2)}`)
    .join(" ");

  return (
    <svg className="w-full" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Curva ROC com threshold destacado">
      <rect width={width} height={height} rx="28" fill="#fff1f2" />
      <line x1={pad} y1={height - pad} x2={width - pad} y2={height - pad} stroke="#94a3b8" strokeWidth="2" />
      <line x1={pad} y1={pad} x2={pad} y2={height - pad} stroke="#94a3b8" strokeWidth="2" />
      <line x1={pad} y1={height - pad} x2={width - pad} y2={pad} stroke="#cbd5e1" strokeDasharray="8 6" strokeWidth="2" />
      <path d={path} fill="none" stroke="#e11d48" strokeWidth="5" strokeLinecap="round" />
      <circle cx={mapX(currentPoint.fpr)} cy={mapY(currentPoint.tpr)} r="7" fill="#0f172a" />
      <text x={width / 2} y={28} textAnchor="middle" fill="#9f1239" fontSize="18" fontWeight="900">
        canto superior esquerdo = região desejável
      </text>
      <text x={width - pad} y={height - 16} textAnchor="end" fill="#475569" fontSize="12" fontWeight="800">
        FPR
      </text>
      <text x={pad - 18} y={pad + 6} textAnchor="middle" fill="#475569" fontSize="12" fontWeight="800">
        TPR
      </text>
    </svg>
  );
}

function RangeField({
  label,
  min,
  max,
  step,
  value,
  onChange,
  integer = false,
}: {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  integer?: boolean;
}) {
  return (
    <label className="grid gap-2 text-sm font-black text-slate-700">
      <span className="flex items-center justify-between gap-3">
        {label}
        <span className="font-mono text-slate-950">
          {integer ? Math.round(value) : value.toFixed(2)}
        </span>
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
