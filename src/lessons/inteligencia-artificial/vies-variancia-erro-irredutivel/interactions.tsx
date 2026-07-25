import { useMemo, useState, type ReactNode } from "react";
import { BarChart3, Layers, Sliders } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import {
  InteractiveShell,
  MetricCard,
} from "../../../components/lesson/InteractionPrimitives";

export const interactions = {
  "synthetic-dataset-lab": SyntheticDatasetLab,
  "complexity-error-lab": ComplexityErrorLab,
  "resampling-instability-lab": ResamplingInstabilityLab,
} satisfies LessonModule["interactions"];

const fewSamplePoints = [
  { x: 0.6, y: 2.1 },
  { x: 1.7, y: 3.6 },
  { x: 3.1, y: 3.3 },
  { x: 4.4, y: 4.7 },
  { x: 6.2, y: 2.8 },
  { x: 7.4, y: 1.7 },
  { x: 8.7, y: 2.9 },
];

const manySamplePoints = [
  { x: 0.5, y: 2.0 },
  { x: 1.1, y: 2.7 },
  { x: 1.8, y: 3.5 },
  { x: 2.4, y: 3.8 },
  { x: 3.0, y: 3.5 },
  { x: 3.7, y: 4.2 },
  { x: 4.3, y: 4.6 },
  { x: 4.9, y: 4.0 },
  { x: 5.6, y: 3.4 },
  { x: 6.2, y: 2.7 },
  { x: 6.9, y: 2.1 },
  { x: 7.5, y: 1.8 },
  { x: 8.2, y: 2.3 },
  { x: 8.8, y: 2.8 },
];

function targetFunction(x: number) {
  return 2.1 + 1.1 * Math.sin((x - 0.6) / 1.55) + 0.18 * x;
}

function lowComplexityCurve(x: number) {
  return 2.3 + 0.08 * x;
}

function mediumComplexityCurve(x: number) {
  return 2.15 + 0.92 * Math.sin((x - 0.5) / 1.8) + 0.16 * x;
}

function highComplexityCurve(x: number, sparse: boolean) {
  return (
    2.08 +
    1.02 * Math.sin((x - 0.5) / 1.72) +
    0.17 * x +
    (sparse ? 0.55 : 0.2) * Math.sin(2.45 * x - 0.6)
  );
}

function SyntheticDatasetLab() {
  const [datasetMode, setDatasetMode] = useState<"few" | "many">("few");
  const [complexity, setComplexity] = useState(2);

  const points = datasetMode === "few" ? fewSamplePoints : manySamplePoints;
  const curve = useMemo(() => {
    if (complexity === 1) return (x: number) => lowComplexityCurve(x);
    if (complexity === 2) return (x: number) => mediumComplexityCurve(x);
    return (x: number) => highComplexityCurve(x, datasetMode === "few");
  }, [complexity, datasetMode]);

  const metrics = useMemo(() => {
    const trainError =
      points.reduce((total, point) => total + (point.y - curve(point.x)) ** 2, 0) /
      points.length;
    const validationXs = [0.9, 2.1, 3.4, 4.8, 6.0, 7.2, 8.4];
    const validationError =
      validationXs.reduce((total, x) => total + (targetFunction(x) - curve(x)) ** 2, 0) /
      validationXs.length;
    return {
      trainError,
      validationError,
      diagnosis:
        complexity === 1
          ? "alto viés"
          : complexity === 3 && datasetMode === "few"
            ? "alta variância"
            : "equilíbrio melhor",
    };
  }, [curve, complexity, points, datasetMode]);

  return (
    <InteractiveShell
      eyebrow="Dados sintéticos"
      title="Troque o regime e veja o tipo de erro aparecer"
      tone="teal"
      icon={<BarChart3 size={18} aria-hidden="true" />}
      description="Use poucos ou muitos pontos e varie a complexidade do modelo. A mesma família pode migrar de alto viés para alta variância."
    >
      <div className="grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="grid gap-4">
          <SegmentedControl
            label="Conjunto observado"
            value={datasetMode}
            onChange={(value) => setDatasetMode(value as "few" | "many")}
            options={[
              { id: "few", label: "Poucos pontos" },
              { id: "many", label: "Mais pontos" },
            ]}
          />
          <RangeField
            label="Complexidade do modelo"
            min={1}
            max={3}
            step={1}
            value={complexity}
            onChange={setComplexity}
            integer
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard label="Erro no treino" value={metrics.trainError.toFixed(2)} />
            <MetricCard label="Erro de generalização" value={metrics.validationError.toFixed(2)} />
            <MetricCard label="Diagnóstico" value={metrics.diagnosis} />
            <MetricCard label="Regime" value={datasetMode === "few" ? "amostra pequena" : "amostra maior"} />
          </div>
          <NoteCard title="Interprete assim">
            Modelo simples demais gera alto viés mesmo com muitos dados. Modelo
            muito flexível, especialmente com poucos pontos, começa a seguir
            oscilações que parecem sinal, mas são parte do acaso da amostra.
          </NoteCard>
        </div>
        <div className="rounded-[1.75rem] bg-white p-4">
          <SyntheticDatasetSvg points={points} curve={curve} />
        </div>
      </div>
    </InteractiveShell>
  );
}

function ComplexityErrorLab() {
  const [complexity, setComplexity] = useState(5);

  const metrics = useMemo(() => {
    const bias2 = Math.max(0.35, 4.9 - 0.46 * complexity);
    const variance = 0.25 + ((complexity - 1) ** 2) / 16;
    const irreducible = 0.8;
    const total = bias2 + variance + irreducible;
    return { bias2, variance, irreducible, total };
  }, [complexity]);

  return (
    <InteractiveShell
      eyebrow="Decomposição"
      title="Veja o erro total como soma de componentes"
      tone="amber"
      icon={<Sliders size={18} aria-hidden="true" />}
      description="Aumente a complexidade do modelo e acompanhe como viés² cai, variância sobe e o erro irredutível permanece."
    >
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-4">
          <RangeField
            label="Complexidade"
            min={1}
            max={10}
            step={1}
            value={complexity}
            onChange={setComplexity}
            integer
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard label="Viés²" value={metrics.bias2.toFixed(2)} />
            <MetricCard label="Variância" value={metrics.variance.toFixed(2)} />
            <MetricCard label="Erro irredutível" value={metrics.irreducible.toFixed(2)} />
            <MetricCard label="Erro total" value={metrics.total.toFixed(2)} />
          </div>
          <NoteCard title="Essência da gangorra">
            Em cenários clássicos, mais capacidade reduz erro sistemático, mas
            pode aumentar sensibilidade à amostra. O ruído do problema não cede
            apenas com mais modelagem.
          </NoteCard>
        </div>
        <div className="rounded-[1.75rem] bg-white p-4">
          <ComplexitySvg complexity={complexity} />
        </div>
      </div>
    </InteractiveShell>
  );
}

function ResamplingInstabilityLab() {
  const [flexibility, setFlexibility] = useState(2);
  const [highlight, setHighlight] = useState(2);

  const curves = useMemo(() => {
    return Array.from({ length: 5 }, (_, sampleIndex) => {
      const amplitude = flexibility === 1 ? 0.1 : flexibility === 2 ? 0.25 : 0.55;
      const frequency = flexibility === 1 ? 0.7 : flexibility === 2 ? 1.2 : 2.0;
      return (x: number) =>
        mediumComplexityCurve(x) +
        amplitude * Math.sin(frequency * x + sampleIndex * 0.9) +
        (flexibility === 3 ? 0.18 * Math.cos(2.7 * x + sampleIndex) : 0);
    });
  }, [flexibility]);

  const spread = useMemo(() => {
    const xs = [1, 2.5, 4, 5.5, 7, 8.5];
    const deviations = xs.map((x) => {
      const values = curves.map((curve) => curve(x));
      const mean = values.reduce((total, value) => total + value, 0) / values.length;
      const variance =
        values.reduce((total, value) => total + (value - mean) ** 2, 0) /
        values.length;
      return Math.sqrt(variance);
    });
    return deviations.reduce((total, value) => total + value, 0) / deviations.length;
  }, [curves]);

  return (
    <InteractiveShell
      eyebrow="Reamostragem"
      title="Treine várias vezes e meça a instabilidade"
      tone="rose"
      icon={<Layers size={18} aria-hidden="true" />}
      description="Alterne a flexibilidade e destaque uma amostra. A dispersão entre curvas mostra a variância do procedimento de aprendizagem."
    >
      <div className="grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="grid gap-4">
          <RangeField
            label="Flexibilidade"
            min={1}
            max={3}
            step={1}
            value={flexibility}
            onChange={setFlexibility}
            integer
          />
          <RangeField
            label="Amostra destacada"
            min={1}
            max={5}
            step={1}
            value={highlight}
            onChange={setHighlight}
            integer
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard label="Desvio médio entre curvas" value={spread.toFixed(2)} />
            <MetricCard
              label="Diagnóstico"
              value={flexibility === 1 ? "baixa variância" : flexibility === 2 ? "variância moderada" : "alta variância"}
            />
            <MetricCard label="Família observada" value={flexibility === 1 ? "mais rígida" : flexibility === 2 ? "intermediária" : "muito flexível"} />
            <MetricCard label="Execuções" value="5 reamostragens" />
          </div>
          <NoteCard title="Leitura">
            Se várias amostras plausíveis geram curvas parecidas, a variância é
            baixa. Se cada treino produz uma hipótese diferente, o procedimento é
            sensível demais ao conjunto observado.
          </NoteCard>
        </div>
        <div className="rounded-[1.75rem] bg-white p-4">
          <ResamplingSvg curves={curves} highlight={highlight - 1} />
        </div>
      </div>
    </InteractiveShell>
  );
}

function SyntheticDatasetSvg({
  points,
  curve,
}: {
  points: Array<{ x: number; y: number }>;
  curve: (x: number) => number;
}) {
  const width = 500;
  const height = 340;
  const pad = 36;
  const minX = 0;
  const maxX = 9.5;
  const minY = 0.8;
  const maxY = 5.3;
  const mapX = (value: number) => pad + ((value - minX) / (maxX - minX)) * (width - pad * 2);
  const mapY = (value: number) => height - pad - ((value - minY) / (maxY - minY)) * (height - pad * 2);

  const targetPath = Array.from({ length: 120 }, (_, index) => {
    const x = (9.5 * index) / 119;
    const y = targetFunction(x);
    return `${index === 0 ? "M" : "L"} ${mapX(x).toFixed(2)} ${mapY(y).toFixed(2)}`;
  }).join(" ");

  const modelPath = Array.from({ length: 120 }, (_, index) => {
    const x = (9.5 * index) / 119;
    const y = curve(x);
    return `${index === 0 ? "M" : "L"} ${mapX(x).toFixed(2)} ${mapY(y).toFixed(2)}`;
  }).join(" ");

  return (
    <svg className="w-full" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Dados sintéticos e curvas de ajuste">
      <rect width={width} height={height} rx="28" fill="#f0fdfa" />
      <line x1={pad} y1={height - pad} x2={width - pad} y2={height - pad} stroke="#94a3b8" strokeWidth="2" />
      <line x1={pad} y1={pad} x2={pad} y2={height - pad} stroke="#94a3b8" strokeWidth="2" />
      <path d={targetPath} fill="none" stroke="#0f172a" strokeWidth="4" strokeDasharray="8 5" />
      <path d={modelPath} fill="none" stroke="#14b8a6" strokeWidth="5" />
      {points.map((point, index) => (
        <circle key={index} cx={mapX(point.x)} cy={mapY(point.y)} r="6.5" fill="#0f172a" />
      ))}
      <text x={width / 2} y={24} textAnchor="middle" fill="#0f766e" fontSize="18" fontWeight="900">
        preto tracejado = padrão alvo • verde = hipótese aprendida
      </text>
    </svg>
  );
}

function ComplexitySvg({ complexity }: { complexity: number }) {
  const width = 500;
  const height = 340;
  const pad = 40;
  const maxComplexity = 10;
  const maxY = 6;
  const mapX = (value: number) => pad + ((value - 1) / (maxComplexity - 1)) * (width - pad * 2);
  const mapY = (value: number) => height - pad - (value / maxY) * (height - pad * 2);

  const makePath = (fn: (x: number) => number) =>
    Array.from({ length: 10 }, (_, index) => {
      const x = index + 1;
      return `${index === 0 ? "M" : "L"} ${mapX(x).toFixed(2)} ${mapY(fn(x)).toFixed(2)}`;
    }).join(" ");

  const biasFn = (x: number) => Math.max(0.35, 4.9 - 0.46 * x);
  const varianceFn = (x: number) => 0.25 + ((x - 1) ** 2) / 16;
  const totalFn = (x: number) => biasFn(x) + varianceFn(x) + 0.8;

  return (
    <svg className="w-full" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Curvas de viés, variância e erro total">
      <rect width={width} height={height} rx="28" fill="#fffbeb" />
      <line x1={pad} y1={height - pad} x2={width - pad} y2={height - pad} stroke="#94a3b8" strokeWidth="2" />
      <line x1={pad} y1={pad} x2={pad} y2={height - pad} stroke="#94a3b8" strokeWidth="2" />
      <path d={makePath(biasFn)} fill="none" stroke="#0f766e" strokeWidth="4" />
      <path d={makePath(varianceFn)} fill="none" stroke="#db2777" strokeWidth="4" />
      <path d={makePath(totalFn)} fill="none" stroke="#7c3aed" strokeWidth="5" />
      <line x1={mapX(complexity)} y1={pad} x2={mapX(complexity)} y2={height - pad} stroke="#0f172a" strokeDasharray="7 5" strokeWidth="2.5" />
      <text x={width / 2} y={24} textAnchor="middle" fill="#92400e" fontSize="18" fontWeight="900">
        verde = viés² • rosa = variância • roxo = erro total
      </text>
    </svg>
  );
}

function ResamplingSvg({
  curves,
  highlight,
}: {
  curves: Array<(x: number) => number>;
  highlight: number;
}) {
  const width = 500;
  const height = 340;
  const pad = 36;
  const minX = 0;
  const maxX = 9.5;
  const minY = 0.8;
  const maxY = 5.3;
  const mapX = (value: number) => pad + ((value - minX) / (maxX - minX)) * (width - pad * 2);
  const mapY = (value: number) => height - pad - ((value - minY) / (maxY - minY)) * (height - pad * 2);

  return (
    <svg className="w-full" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Curvas aprendidas em diferentes amostras">
      <rect width={width} height={height} rx="28" fill="#fff1f2" />
      <line x1={pad} y1={height - pad} x2={width - pad} y2={height - pad} stroke="#94a3b8" strokeWidth="2" />
      <line x1={pad} y1={pad} x2={pad} y2={height - pad} stroke="#94a3b8" strokeWidth="2" />
      {curves.map((curve, curveIndex) => {
        const path = Array.from({ length: 120 }, (_, index) => {
          const x = (9.5 * index) / 119;
          const y = curve(x);
          return `${index === 0 ? "M" : "L"} ${mapX(x).toFixed(2)} ${mapY(y).toFixed(2)}`;
        }).join(" ");
        return (
          <path
            key={curveIndex}
            d={path}
            fill="none"
            stroke={curveIndex === highlight ? "#be123c" : "#fda4af"}
            strokeWidth={curveIndex === highlight ? 5 : 3}
            opacity={curveIndex === highlight ? 1 : 0.8}
          />
        );
      })}
      <text x={width / 2} y={24} textAnchor="middle" fill="#9f1239" fontSize="18" fontWeight="900">
        muitas amostras, muitas hipóteses possíveis
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

function SegmentedControl({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: Array<{ id: string; label: string }>;
  onChange: (value: string) => void;
}) {
  return (
    <div className="grid gap-2">
      <p className="text-sm font-black text-slate-700">{label}</p>
      <div className="grid grid-cols-2 gap-2">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            className={`rounded-2xl border px-4 py-3 text-sm font-black transition ${
              value === option.id
                ? "border-slate-950 bg-slate-950 text-white"
                : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
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
