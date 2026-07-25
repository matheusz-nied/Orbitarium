import { useMemo, useState, type ReactNode } from "react";
import { BarChart3, Layers, Sliders } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import {
  InteractiveShell,
  MetricCard,
} from "../../../components/lesson/InteractionPrimitives";

export const interactions = {
  "shallow-tree-builder": ShallowTreeBuilder,
  "weak-learners-vote": WeakLearnersVote,
  "bagging-vs-single-tree": BaggingVsSingleTree,
} satisfies LessonModule["interactions"];

const treePoints = [
  { x: 1.1, y: 1.2, label: 0 },
  { x: 1.5, y: 3.8, label: 0 },
  { x: 2.1, y: 2.0, label: 0 },
  { x: 2.6, y: 4.2, label: 1 },
  { x: 3.0, y: 3.4, label: 1 },
  { x: 3.3, y: 1.6, label: 0 },
  { x: 4.1, y: 4.6, label: 1 },
  { x: 4.6, y: 3.0, label: 1 },
  { x: 5.1, y: 1.4, label: 0 },
  { x: 5.6, y: 4.0, label: 1 },
  { x: 6.2, y: 2.4, label: 1 },
];

const baggingX = Array.from({ length: 13 }, (_, index) => index);
const targetCurve = [0.5, 1.2, 2.2, 3.6, 4.6, 5.0, 4.8, 4.0, 3.2, 2.5, 2.1, 1.8, 1.6];
const treePredictions = [
  [0.8, 1.6, 2.1, 3.2, 4.8, 5.4, 5.1, 4.4, 3.4, 2.3, 1.8, 1.6, 1.4],
  [0.4, 0.9, 1.9, 3.1, 4.2, 4.8, 5.2, 4.2, 3.6, 2.9, 2.3, 2.0, 1.7],
  [0.6, 1.3, 2.4, 3.8, 4.9, 5.1, 4.7, 4.1, 3.1, 2.7, 2.2, 1.9, 1.8],
  [0.9, 1.5, 2.7, 3.5, 4.7, 4.9, 4.5, 3.7, 2.8, 2.1, 2.0, 1.8, 1.5],
  [0.3, 1.0, 1.8, 3.0, 4.3, 5.3, 5.0, 4.5, 3.5, 2.8, 2.4, 1.9, 1.7],
  [0.7, 1.4, 2.3, 3.4, 4.4, 5.0, 4.6, 3.9, 3.0, 2.4, 1.9, 1.7, 1.6],
  [0.5, 1.1, 2.0, 3.7, 4.8, 5.5, 5.3, 4.3, 3.4, 2.6, 2.0, 1.7, 1.5],
  [0.6, 1.4, 2.6, 3.9, 4.5, 4.7, 4.4, 3.8, 3.1, 2.6, 2.1, 1.8, 1.6],
];

function ShallowTreeBuilder() {
  const [rootAxis, setRootAxis] = useState<"x" | "y">("x");
  const [rootThreshold, setRootThreshold] = useState(2.8);
  const [depth, setDepth] = useState(2);

  const analysis = useMemo(() => {
    const pointLeaves = treePoints.map((point) => {
      const rootRight = rootAxis === "x" ? point.x > rootThreshold : point.y > rootThreshold;
      let leaf = rootRight ? "direita" : "esquerda";

      if (depth >= 2) {
        if (rootRight) {
          const secondRight = rootAxis === "x" ? point.y > 3.3 : point.x > 3.6;
          leaf = secondRight ? `${leaf}-alto` : `${leaf}-baixo`;
        }
      }

      if (depth >= 3) {
        if (!rootRight) {
          const secondLeft = rootAxis === "x" ? point.y > 2.7 : point.x > 2.3;
          leaf = secondLeft ? `${leaf}-alto` : `${leaf}-baixo`;
        }
      }

      return { ...point, leaf };
    });

    const majority = new Map<string, number>();
    const leaves = Array.from(new Set(pointLeaves.map((point) => point.leaf)));
    for (const leaf of leaves) {
      const group = pointLeaves.filter((point) => point.leaf === leaf);
      const positives = group.filter((point) => point.label === 1).length;
      majority.set(leaf, positives >= group.length / 2 ? 1 : 0);
    }

    const classified = pointLeaves.map((point) => ({
      ...point,
      predicted: majority.get(point.leaf) ?? 0,
    }));

    const accuracy =
      classified.filter((point) => point.label === point.predicted).length /
      classified.length;

    return { classified, accuracy };
  }, [depth, rootAxis, rootThreshold]);

  return (
    <InteractiveShell
      eyebrow="Árvore rasa"
      title="Cresça uma árvore em poucos níveis"
      tone="emerald"
      icon={<BarChart3 size={18} aria-hidden="true" />}
      description="Escolha a variável do primeiro corte, ajuste o threshold e aumente a profundidade. Veja como o espaço vai sendo particionado."
    >
      <div className="grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="grid gap-4">
          <SegmentedControl
            label="Split da raiz"
            options={[
              { id: "x", label: "x > threshold" },
              { id: "y", label: "y > threshold" },
            ]}
            value={rootAxis}
            onChange={(value) => setRootAxis(value as "x" | "y")}
          />
          <RangeField
            label="Threshold da raiz"
            min={1.5}
            max={4.5}
            step={0.1}
            value={rootThreshold}
            onChange={setRootThreshold}
          />
          <RangeField
            label="Profundidade"
            min={1}
            max={3}
            step={1}
            value={depth}
            onChange={setDepth}
            integer
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard label="Acurácia" value={`${(analysis.accuracy * 100).toFixed(0)}%`} />
            <MetricCard label="Folhas ativas" value={String(new Set(analysis.classified.map((point) => point.leaf)).size)} />
            <MetricCard label="Raiz" value={rootAxis === "x" ? "x" : "y"} />
            <MetricCard label="Threshold" value={rootThreshold.toFixed(1)} />
          </div>
          <NoteCard title="Leitura">
            Árvores rasas criam poucas regiões grandes. Cada aumento de
            profundidade refina algumas dessas regiões e pode melhorar o ajuste,
            mas também abre espaço para mais sensibilidade.
          </NoteCard>
        </div>
        <div className="rounded-[1.75rem] bg-white p-4">
          <TreePartitionSvg
            points={analysis.classified}
            rootAxis={rootAxis}
            rootThreshold={rootThreshold}
            depth={depth}
          />
        </div>
      </div>
    </InteractiveShell>
  );
}

function WeakLearnersVote() {
  const [x, setX] = useState(3.1);
  const [y, setY] = useState(2.5);

  const rules = useMemo(
    () => [
      {
        id: "r1",
        label: "Se x > 2,8 então positivo",
        vote: x > 2.8 ? 1 : 0,
      },
      {
        id: "r2",
        label: "Se y > 3,0 então positivo",
        vote: y > 3.0 ? 1 : 0,
      },
      {
        id: "r3",
        label: "Se x + y > 6,1 então positivo",
        vote: x + y > 6.1 ? 1 : 0,
      },
      {
        id: "r4",
        label: "Se y < 1,8 então negativo",
        vote: y < 1.8 ? 0 : 1,
      },
    ],
    [x, y],
  );

  const positiveVotes = rules.filter((rule) => rule.vote === 1).length;
  const finalPrediction = positiveVotes >= 3 ? 1 : 0;

  return (
    <InteractiveShell
      eyebrow="Votação"
      title="Aprendizes fracos podem formar uma decisão forte"
      tone="violet"
      icon={<Layers size={18} aria-hidden="true" />}
      description="Mova um ponto no plano e observe como regras simples, imperfeitas isoladamente, constroem uma decisão por maioria."
    >
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-4">
          <RangeField label="x" min={0.5} max={6.5} step={0.1} value={x} onChange={setX} />
          <RangeField label="y" min={0.5} max={5.5} step={0.1} value={y} onChange={setY} />
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard label="Votos positivos" value={`${positiveVotes}/4`} />
            <MetricCard label="Decisão final" value={finalPrediction === 1 ? "Positiva" : "Negativa"} />
            <MetricCard label="Ponto" value={`(${x.toFixed(1)}, ${y.toFixed(1)})`} />
            <MetricCard label="Intuição" value={positiveVotes === 2 ? "Empate apertado" : positiveVotes > 2 ? "Maioria pró" : "Maioria contra"} />
          </div>
          <div className="grid gap-2">
            {rules.map((rule) => (
              <div
                key={rule.id}
                className={`rounded-2xl border px-4 py-3 text-sm ${
                  rule.vote === 1
                    ? "border-violet-200 bg-violet-50 text-violet-900"
                    : "border-slate-200 bg-slate-50 text-slate-700"
                }`}
              >
                <p className="font-black">{rule.label}</p>
                <p className="mt-1 font-mono text-xs uppercase tracking-[0.14em]">
                  voto: {rule.vote === 1 ? "positivo" : "negativo"}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[1.75rem] bg-white p-4">
          <VotingSvg x={x} y={y} rules={rules} finalPrediction={finalPrediction} />
        </div>
      </div>
    </InteractiveShell>
  );
}

function BaggingVsSingleTree() {
  const [selectedTree, setSelectedTree] = useState(1);
  const [ensembleSize, setEnsembleSize] = useState(4);

  const bagged = useMemo(() => {
    return baggingX.map((_, index) => {
      const avg =
        treePredictions
          .slice(0, ensembleSize)
          .reduce((total, tree) => total + tree[index], 0) / ensembleSize;
      return avg;
    });
  }, [ensembleSize]);

  const single = treePredictions[selectedTree - 1];

  const singleMse = useMemo(
    () =>
      single.reduce((total, value, index) => total + (value - targetCurve[index]) ** 2, 0) /
      single.length,
    [single],
  );

  const baggedMse = useMemo(
    () =>
      bagged.reduce((total, value, index) => total + (value - targetCurve[index]) ** 2, 0) /
      bagged.length,
    [bagged],
  );

  return (
    <InteractiveShell
      eyebrow="Bagging"
      title="Uma árvore oscila; a média estabiliza"
      tone="amber"
      icon={<Sliders size={18} aria-hidden="true" />}
      description="Compare uma árvore individual instável com a média de várias árvores bootstrap. O alvo é reduzir variância sem depender de uma única amostra."
    >
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-4">
          <RangeField
            label="Árvore individual observada"
            min={1}
            max={treePredictions.length}
            step={1}
            value={selectedTree}
            onChange={setSelectedTree}
            integer
          />
          <RangeField
            label="Quantidade de árvores no bagging"
            min={1}
            max={treePredictions.length}
            step={1}
            value={ensembleSize}
            onChange={setEnsembleSize}
            integer
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard label="MSE árvore única" value={singleMse.toFixed(2)} />
            <MetricCard label="MSE ensemble" value={baggedMse.toFixed(2)} />
            <MetricCard label="Árvores no ensemble" value={String(ensembleSize)} />
            <MetricCard
              label="Leitura"
              value={baggedMse < singleMse ? "Variância reduzida" : "Ainda semelhante"}
            />
          </div>
          <NoteCard title="Como ler">
            Cada curva laranja representa uma hipótese possível aprendida por uma
            árvore. O bagging faz média dessas hipóteses e tende a produzir uma
            predição mais estável do que confiar em uma delas isoladamente.
          </NoteCard>
        </div>
        <div className="rounded-[1.75rem] bg-white p-4">
          <BaggingSvg single={single} bagged={bagged} />
        </div>
      </div>
    </InteractiveShell>
  );
}

function TreePartitionSvg({
  points,
  rootAxis,
  rootThreshold,
  depth,
}: {
  points: Array<{ x: number; y: number; label: number; predicted: number }>;
  rootAxis: "x" | "y";
  rootThreshold: number;
  depth: number;
}) {
  const width = 500;
  const height = 340;
  const pad = 36;
  const minX = 0.5;
  const maxX = 6.6;
  const minY = 0.8;
  const maxY = 5;
  const mapX = (value: number) => pad + ((value - minX) / (maxX - minX)) * (width - pad * 2);
  const mapY = (value: number) => height - pad - ((value - minY) / (maxY - minY)) * (height - pad * 2);

  return (
    <svg className="w-full" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Particionamento do espaço por uma árvore rasa">
      <rect width={width} height={height} rx="28" fill="#ecfdf5" />
      <line x1={pad} y1={height - pad} x2={width - pad} y2={height - pad} stroke="#94a3b8" strokeWidth="2" />
      <line x1={pad} y1={pad} x2={pad} y2={height - pad} stroke="#94a3b8" strokeWidth="2" />

      {rootAxis === "x" ? (
        <line x1={mapX(rootThreshold)} y1={pad} x2={mapX(rootThreshold)} y2={height - pad} stroke="#065f46" strokeWidth="4" />
      ) : (
        <line x1={pad} y1={mapY(rootThreshold)} x2={width - pad} y2={mapY(rootThreshold)} stroke="#065f46" strokeWidth="4" />
      )}

      {depth >= 2 ? (
        rootAxis === "x" ? (
          <line x1={mapX(rootThreshold)} y1={mapY(3.3)} x2={width - pad} y2={mapY(3.3)} stroke="#10b981" strokeWidth="3" strokeDasharray="8 5" />
        ) : (
          <line x1={mapX(3.6)} y1={pad} x2={mapX(3.6)} y2={mapY(rootThreshold)} stroke="#10b981" strokeWidth="3" strokeDasharray="8 5" />
        )
      ) : null}

      {depth >= 3 ? (
        rootAxis === "x" ? (
          <line x1={pad} y1={mapY(2.7)} x2={mapX(rootThreshold)} y2={mapY(2.7)} stroke="#34d399" strokeWidth="3" strokeDasharray="8 5" />
        ) : (
          <line x1={mapX(2.3)} y1={mapY(rootThreshold)} x2={mapX(2.3)} y2={height - pad} stroke="#34d399" strokeWidth="3" strokeDasharray="8 5" />
        )
      ) : null}

      {points.map((point, index) => (
        <circle
          key={index}
          cx={mapX(point.x)}
          cy={mapY(point.y)}
          r="7.5"
          fill={point.label === 1 ? "#4338ca" : "#f97316"}
          stroke={point.predicted === point.label ? "#ffffff" : "#ef4444"}
          strokeWidth={point.predicted === point.label ? 2 : 4}
        />
      ))}

      <text x={width / 2} y={24} textAnchor="middle" fill="#065f46" fontSize="18" fontWeight="900">
        Mais profundidade = mais regiões e mais detalhe
      </text>
    </svg>
  );
}

function VotingSvg({
  x,
  y,
  rules,
  finalPrediction,
}: {
  x: number;
  y: number;
  rules: Array<{ id: string; label: string; vote: number }>;
  finalPrediction: number;
}) {
  const width = 500;
  const height = 340;
  const pad = 36;
  const minX = 0.5;
  const maxX = 6.6;
  const minY = 0.5;
  const maxY = 5.5;
  const mapX = (value: number) => pad + ((value - minX) / (maxX - minX)) * (width - pad * 2);
  const mapY = (value: number) => height - pad - ((value - minY) / (maxY - minY)) * (height - pad * 2);

  return (
    <svg className="w-full" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Regras fracas votando sobre um ponto">
      <rect width={width} height={height} rx="28" fill="#faf5ff" />
      <line x1={pad} y1={height - pad} x2={width - pad} y2={height - pad} stroke="#94a3b8" strokeWidth="2" />
      <line x1={pad} y1={pad} x2={pad} y2={height - pad} stroke="#94a3b8" strokeWidth="2" />
      <line x1={mapX(2.8)} y1={pad} x2={mapX(2.8)} y2={height - pad} stroke="#a78bfa" strokeDasharray="7 5" strokeWidth="2" />
      <line x1={pad} y1={mapY(3.0)} x2={width - pad} y2={mapY(3.0)} stroke="#a78bfa" strokeDasharray="7 5" strokeWidth="2" />
      <line x1={mapX(0.8)} y1={mapY(5.3)} x2={mapX(5.9)} y2={mapY(0.2)} stroke="#ddd6fe" strokeWidth="3" />
      <circle cx={mapX(x)} cy={mapY(y)} r="9" fill={finalPrediction === 1 ? "#7c3aed" : "#334155"} />
      <text x={width / 2} y={24} textAnchor="middle" fill="#6d28d9" fontSize="18" fontWeight="900">
        Regras simples se combinam por maioria
      </text>
      {rules.map((rule, index) => (
        <text
          key={rule.id}
          x={width - 24}
          y={64 + index * 24}
          textAnchor="end"
          fill={rule.vote === 1 ? "#6d28d9" : "#64748b"}
          fontSize="12"
          fontWeight="800"
        >
          {rule.vote === 1 ? "SIM" : "NÃO"}
        </text>
      ))}
    </svg>
  );
}

function BaggingSvg({
  single,
  bagged,
}: {
  single: number[];
  bagged: number[];
}) {
  const width = 500;
  const height = 340;
  const pad = 40;
  const minY = 0;
  const maxY = 6;
  const mapX = (value: number) => pad + (value / (baggingX.length - 1)) * (width - pad * 2);
  const mapY = (value: number) => height - pad - ((value - minY) / (maxY - minY)) * (height - pad * 2);

  const pathFor = (series: number[]) =>
    series
      .map((value, index) => `${index === 0 ? "M" : "L"} ${mapX(index).toFixed(2)} ${mapY(value).toFixed(2)}`)
      .join(" ");

  return (
    <svg className="w-full" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Comparação entre árvore única e bagging">
      <rect width={width} height={height} rx="28" fill="#fffbeb" />
      <line x1={pad} y1={height - pad} x2={width - pad} y2={height - pad} stroke="#94a3b8" strokeWidth="2" />
      <line x1={pad} y1={pad} x2={pad} y2={height - pad} stroke="#94a3b8" strokeWidth="2" />
      <path d={pathFor(targetCurve)} fill="none" stroke="#0f172a" strokeWidth="4" strokeDasharray="8 5" />
      <path d={pathFor(single)} fill="none" stroke="#f97316" strokeWidth="4" />
      <path d={pathFor(bagged)} fill="none" stroke="#7c3aed" strokeWidth="5" />
      <text x={width / 2} y={24} textAnchor="middle" fill="#92400e" fontSize="18" fontWeight="900">
        preto tracejado = alvo • laranja = árvore • roxo = média do ensemble
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
          {integer ? Math.round(value) : value.toFixed(1)}
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
  options,
  value,
  onChange,
}: {
  label: string;
  options: Array<{ id: string; label: string }>;
  value: string;
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
