import { useMemo, useRef, useState } from "react";
import { Compass, MoveDiagonal, Workflow } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import {
  InteractiveShell,
  MetricCard,
} from "../../../components/lesson/InteractionPrimitives";

export const interactions = {
  "vector-playground-2d": VectorPlayground2DInteraction,
  "matrix-vector-machine": MatrixVectorMachineInteraction,
  "dot-product-similarity-lab": DotProductSimilarityLabInteraction,
} satisfies LessonModule["interactions"];

function VectorPlayground2DInteraction() {
  const [point, setPoint] = useState({ x: 3, y: 2 });
  const [dragging, setDragging] = useState(false);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const magnitude = Math.sqrt(point.x ** 2 + point.y ** 2);

  const updatePoint = (clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const localX = clientX - rect.left;
    const localY = clientY - rect.top;
    const x = clamp(((localX - 180) / 28), -5, 5);
    const y = clamp(((260 - localY) / 28), -5, 5);
    setPoint({ x: roundToHalf(x), y: roundToHalf(y) });
  };

  return (
    <InteractiveShell
      eyebrow="Vetor 2D arrastável"
      title="Arraste a ponta do vetor e observe a geometria mudar"
      tone="indigo"
      icon={<MoveDiagonal size={18} aria-hidden="true" />}
      description="Ao mover a ponta, você altera ao mesmo tempo a direção, o sentido e a magnitude do vetor. Essa intuição geométrica é a base para entender representações em espaços maiores."
    >
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard label="x" value={point.x.toFixed(1)} />
            <MetricCard label="y" value={point.y.toFixed(1)} />
            <MetricCard label="Magnitude" value={magnitude.toFixed(2)} />
            <MetricCard label="Quadrante" value={quadrantLabel(point.x, point.y)} />
          </div>
          <div className="rounded-3xl border border-indigo-200 bg-indigo-50 p-4">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-indigo-800">Como ler</p>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              Um vetor não é só um par de números. Ele pode ser visto como uma direção partindo da origem. Em dados, a mesma estrutura representa atributos; em geometria, representa deslocamento e orientação.
            </p>
          </div>
        </div>
        <div className="rounded-3xl bg-white p-5">
          <svg
            ref={svgRef}
            className="w-full touch-none"
            viewBox="0 0 360 320"
            role="img"
            aria-label="Plano cartesiano interativo com vetor arrastável"
            onMouseMove={(event) => dragging && updatePoint(event.clientX, event.clientY)}
            onMouseUp={() => setDragging(false)}
            onMouseLeave={() => setDragging(false)}
          >
            <rect width="360" height="320" rx="24" fill="#eef2ff" />
            {Array.from({ length: 11 }, (_, i) => 40 + i * 28).map((coord) => (
              <g key={coord}>
                <line x1={coord} y1="40" x2={coord} y2="260" stroke="#c7d2fe" />
                <line x1="40" y1={coord} x2="320" y2={coord} stroke="#c7d2fe" />
              </g>
            ))}
            <line x1="40" y1="260" x2="320" y2="260" stroke="#0f172a" strokeWidth="3" />
            <line x1="180" y1="40" x2="180" y2="300" stroke="#0f172a" strokeWidth="3" />
            <path d={`M180 260 L${toSvgX(point.x)} ${toSvgY(point.y)}`} stroke="#4f46e5" strokeWidth="6" strokeLinecap="round" />
            <circle
              cx={toSvgX(point.x)}
              cy={toSvgY(point.y)}
              r="11"
              fill="#4f46e5"
              className="cursor-grab"
              onMouseDown={(event) => {
                setDragging(true);
                updatePoint(event.clientX, event.clientY);
              }}
            />
            <text x={toSvgX(point.x) + 12} y={toSvgY(point.y) - 12} fill="#4338ca" fontSize="12" fontWeight="900">
              ({point.x.toFixed(1)}, {point.y.toFixed(1)})
            </text>
          </svg>
        </div>
      </div>
    </InteractiveShell>
  );
}

function MatrixVectorMachineInteraction() {
  const presets = {
    identidade: { label: "Identidade", matrix: [1, 0, 0, 1] },
    esticarX: { label: "Esticar X", matrix: [1.8, 0, 0, 1] },
    cisalhar: { label: "Cisalhar", matrix: [1, 0.8, 0, 1] },
    rotacaoLeve: { label: "Rotação leve", matrix: [0.8, -0.6, 0.6, 0.8] },
  } as const;

  const [presetKey, setPresetKey] = useState<keyof typeof presets>("esticarX");
  const [progress, setProgress] = useState(100);
  const input = { x: 2, y: 1.5 };
  const matrix = presets[presetKey].matrix;
  const transformed = {
    x: matrix[0] * input.x + matrix[1] * input.y,
    y: matrix[2] * input.x + matrix[3] * input.y,
  };
  const t = progress / 100;
  const animated = {
    x: input.x + (transformed.x - input.x) * t,
    y: input.y + (transformed.y - input.y) * t,
  };

  return (
    <InteractiveShell
      eyebrow="Matriz × vetor"
      title="Escolha uma transformação e veja o vetor se mover"
      tone="teal"
      icon={<Workflow size={18} aria-hidden="true" />}
      description="Alterne entre matrizes e controle o progresso da animação. Assim fica mais claro que multiplicar por matriz significa aplicar uma regra geométrica ao vetor."
    >
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-4">
          <div className="grid gap-2">
            {Object.entries(presets).map(([key, preset]) => (
              <button
                key={key}
                type="button"
                onClick={() => setPresetKey(key as keyof typeof presets)}
                className={`rounded-2xl border px-4 py-3 text-left text-sm font-black transition ${presetKey === key ? "border-teal-600 bg-teal-600 text-white" : "border-teal-100 bg-white text-slate-700 hover:border-teal-300"}`}
              >
                {preset.label}
              </button>
            ))}
          </div>
          <RangeField label="Progresso da transformação" value={progress} min={0} max={100} suffix="%" onChange={setProgress} />
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard label="Entrada" value={`(${input.x.toFixed(1)}, ${input.y.toFixed(1)})`} />
            <MetricCard label="Saída" value={`(${transformed.x.toFixed(1)}, ${transformed.y.toFixed(1)})`} />
            <MetricCard label="Linha 1" value={`${matrix[0].toFixed(1)}  ${matrix[1].toFixed(1)}`} />
            <MetricCard label="Linha 2" value={`${matrix[2].toFixed(1)}  ${matrix[3].toFixed(1)}`} />
          </div>
        </div>
        <div className="rounded-3xl bg-white p-5">
          <svg className="w-full" viewBox="0 0 360 320" role="img" aria-label="Plano com vetor original e vetor transformado">
            <rect width="360" height="320" rx="24" fill="#f0fdfa" />
            {Array.from({ length: 11 }, (_, i) => 40 + i * 24).map((coord) => (
              <g key={coord}>
                <line x1={coord} y1="40" x2={coord} y2="260" stroke="#ccfbf1" />
                <line x1="40" y1={coord} x2="320" y2={coord} stroke="#ccfbf1" />
              </g>
            ))}
            <line x1="40" y1="260" x2="320" y2="260" stroke="#0f172a" strokeWidth="3" />
            <line x1="160" y1="40" x2="160" y2="290" stroke="#0f172a" strokeWidth="3" />
            <path d={`M160 260 L${160 + input.x * 36} ${260 - input.y * 36}`} stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />
            <path d={`M160 260 L${160 + animated.x * 36} ${260 - animated.y * 36}`} stroke="#0f766e" strokeWidth="6" strokeLinecap="round" />
            <circle cx={160 + input.x * 36} cy={260 - input.y * 36} r="8" fill="#94a3b8" />
            <circle cx={160 + animated.x * 36} cy={260 - animated.y * 36} r="9" fill="#0f766e" />
            <text x="210" y="95" fill="#64748b" fontSize="12" fontWeight="900">vetor original</text>
            <text x="225" y="125" fill="#0f766e" fontSize="12" fontWeight="900">vetor transformado</text>
          </svg>
        </div>
      </div>
    </InteractiveShell>
  );
}

function DotProductSimilarityLabInteraction() {
  const [angleA, setAngleA] = useState(25);
  const [angleB, setAngleB] = useState(55);
  const [magA, setMagA] = useState(4);
  const [magB, setMagB] = useState(3);

  const a = useMemo(() => fromPolar(magA, angleA), [magA, angleA]);
  const b = useMemo(() => fromPolar(magB, angleB), [magB, angleB]);
  const dot = a.x * b.x + a.y * b.y;
  const cosine = dot / (magA * magB);

  return (
    <InteractiveShell
      eyebrow="Similaridade por produto escalar"
      title="Compare alinhamento entre dois vetores"
      tone="amber"
      icon={<Compass size={18} aria-hidden="true" />}
      description="Mude ângulos e magnitudes para ver quando os vetores ficam mais alinhados, ortogonais ou opostos. Essa é a intuição por trás de muitas comparações em IA."
    >
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-4">
          <RangeField label="Ângulo do vetor A" value={angleA} min={-150} max={150} suffix="°" onChange={setAngleA} />
          <RangeField label="Ângulo do vetor B" value={angleB} min={-150} max={150} suffix="°" onChange={setAngleB} />
          <RangeField label="Magnitude de A" value={magA} min={1} max={5} step={0.5} onChange={setMagA} />
          <RangeField label="Magnitude de B" value={magB} min={1} max={5} step={0.5} onChange={setMagB} />
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard label="A · B" value={dot.toFixed(2)} />
            <MetricCard label="cos(theta)" value={cosine.toFixed(2)} />
            <MetricCard label="Ângulo relativo" value={`${Math.abs(angleA - angleB).toFixed(0)}°`} />
            <MetricCard label="Leitura" value={alignmentLabel(cosine)} />
          </div>
        </div>
        <div className="rounded-3xl bg-white p-5">
          <svg className="w-full" viewBox="0 0 360 320" role="img" aria-label="Dois vetores comparados no plano">
            <rect width="360" height="320" rx="24" fill="#fffbeb" />
            <line x1="40" y1="260" x2="320" y2="260" stroke="#0f172a" strokeWidth="3" />
            <line x1="180" y1="40" x2="180" y2="300" stroke="#0f172a" strokeWidth="3" />
            <path d={`M180 260 L${180 + a.x * 28} ${260 - a.y * 28}`} stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" />
            <path d={`M180 260 L${180 + b.x * 28} ${260 - b.y * 28}`} stroke="#b45309" strokeWidth="6" strokeLinecap="round" />
            <text x={188 + a.x * 28} y={252 - a.y * 28} fill="#f59e0b" fontSize="12" fontWeight="900">A</text>
            <text x={188 + b.x * 28} y={252 - b.y * 28} fill="#b45309" fontSize="12" fontWeight="900">B</text>
          </svg>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Produto escalar grande e positivo sugere alinhamento. Próximo de zero sugere ortogonalidade. Negativo sugere oposição de sentidos.
          </p>
        </div>
      </div>
    </InteractiveShell>
  );
}

function RangeField({
  label,
  value,
  min,
  max,
  step = 1,
  suffix = "",
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="grid gap-2 text-sm font-black text-slate-700">
      <span className="flex items-center justify-between gap-4">
        {label}
        <span className="font-mono text-slate-950">{value}{suffix}</span>
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

function fromPolar(magnitude: number, angleDegrees: number) {
  const radians = (angleDegrees * Math.PI) / 180;
  return {
    x: magnitude * Math.cos(radians),
    y: magnitude * Math.sin(radians),
  };
}

function toSvgX(x: number) {
  return 180 + x * 28;
}

function toSvgY(y: number) {
  return 260 - y * 28;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function roundToHalf(value: number) {
  return Math.round(value * 2) / 2;
}

function quadrantLabel(x: number, y: number) {
  if (x === 0 || y === 0) return "Eixo";
  if (x > 0 && y > 0) return "I";
  if (x < 0 && y > 0) return "II";
  if (x < 0 && y < 0) return "III";
  return "IV";
}

function alignmentLabel(cosine: number) {
  if (cosine > 0.75) return "muito alinhados";
  if (cosine > 0.2) return "alinhados";
  if (cosine > -0.2) return "quase ortogonais";
  if (cosine > -0.75) return "opostos";
  return "muito opostos";
}

