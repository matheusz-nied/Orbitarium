import { useState, useMemo } from "react";
import { Sliders, BarChart3, Sun } from "lucide-react";
import type { LessonModule } from "../../../types/content";

export const interactions = {
  "threshold-slider-interactive": ThresholdSliderInteraction,
  "histograma-interativo": HistogramaInterativo,
  "iluminacao-simulador": IluminacaoSimulador,
} satisfies LessonModule["interactions"];

type Tone = "teal" | "indigo" | "violet" | "emerald" | "rose" | "amber";

function ThresholdSliderInteraction() {
  const [threshold, setThreshold] = useState(128);

  const pixelGrid = useMemo(() => {
    const grid = [];
    for (let row = 0; row < 8; row++) {
      const rowData = [];
      for (let col = 0; col < 12; col++) {
        const centerX = 6;
        const centerY = 4;
        const dist = Math.sqrt((col - centerX) ** 2 + (row - centerY) ** 2);
        const isObject = dist < 3.5;
        const baseValue = isObject ? 60 + Math.random() * 30 : 180 + Math.random() * 40;
        rowData.push(Math.floor(baseValue));
      }
      grid.push(rowData);
    }
    return grid;
  }, []);

  const binaryGrid = useMemo(() => {
    return pixelGrid.map((row) =>
      row.map((value) => (value > threshold ? 255 : 0))
    );
  }, [pixelGrid, threshold]);

  const histogram = useMemo(() => {
    const hist = new Array(256).fill(0);
    pixelGrid.forEach((row) => {
      row.forEach((value) => {
        hist[value]++;
      });
    });
    return hist;
  }, [pixelGrid]);

  const maxHist = Math.max(...histogram);
  const objectPixels = binaryGrid.flat().filter((v) => v === 0).length;
  const backgroundPixels = binaryGrid.flat().filter((v) => v === 255).length;

  return (
    <InteractiveShell
      eyebrow="Thresholding"
      title="Slider de Limiar"
      tone="amber"
      icon={<Sliders size={18} aria-hidden="true" />}
      description="Ajuste o threshold e veja como a imagem binária muda em tempo real. Observe o histograma e o valor de corte."
    >
      <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        <div className="grid gap-4">
          <RangeField
            label="Threshold"
            value={threshold}
            min={0}
            max={255}
            step={1}
            onChange={setThreshold}
          />
          <MetricGrid
            metrics={[
              ["Threshold", threshold.toString()],
              ["Objeto (0)", objectPixels.toString()],
              ["Fundo (255)", backgroundPixels.toString()],
              ["Total", (objectPixels + backgroundPixels).toString()],
            ]}
          />
          <div className="rounded-3xl border border-amber-200 bg-white p-4">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-amber-700">
              Análise
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {threshold < 100
                ? "Threshold baixo: muitos pixels do fundo viram objeto (falso positivo)."
                : threshold > 160
                  ? "Threshold alto: muitos pixels do objeto viram fundo (falso negativo)."
                  : "Threshold equilibrado: boa separação entre objeto e fundo."}
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-3xl border border-amber-100 bg-white p-4">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.16em] text-amber-700">
              Imagem Original (Escala de Cinza)
            </p>
            <PixelGridDisplay grid={pixelGrid} isGray />
          </div>
          <div className="rounded-3xl border border-amber-100 bg-white p-4">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.16em] text-amber-700">
              Imagem Binária (threshold = {threshold})
            </p>
            <PixelGridDisplay grid={binaryGrid} isGray={false} />
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-3xl border border-amber-100 bg-white p-4">
        <p className="mb-3 text-xs font-black uppercase tracking-[0.16em] text-amber-700">
          Histograma de Intensidades
        </p>
        <HistogramDisplay histogram={histogram} threshold={threshold} maxHist={maxHist} />
      </div>
    </InteractiveShell>
  );
}

function HistogramaInterativo() {
  const [objectIntensity, setObjectIntensity] = useState(60);
  const [backgroundIntensity, setBackgroundIntensity] = useState(200);
  const [spread, setSpread] = useState(20);

  const histogram = useMemo(() => {
    const hist = new Array(256).fill(0);
    for (let i = 0; i < 256; i++) {
      const objectContrib = Math.exp(-((i - objectIntensity) ** 2) / (2 * spread ** 2)) * 40;
      const backgroundContrib = Math.exp(-((i - backgroundIntensity) ** 2) / (2 * spread ** 2)) * 60;
      hist[i] = Math.floor(objectContrib + backgroundContrib);
    }
    return hist;
  }, [objectIntensity, backgroundIntensity, spread]);

  const maxHist = Math.max(...histogram);
  const separation = Math.abs(backgroundIntensity - objectIntensity);
  const isBimodal = separation > spread * 3;

  const idealThreshold = Math.floor((objectIntensity + backgroundIntensity) / 2);

  return (
    <InteractiveShell
      eyebrow="Histograma"
      title="Construtor de Histograma"
      tone="violet"
      icon={<BarChart3 size={18} aria-hidden="true" />}
      description="Ajuste as intensidades do objeto e do fundo para ver como o histograma muda. Observe quando ele se torna bimodal."
    >
      <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        <div className="grid gap-4">
          <RangeField
            label="Intensidade do Objeto"
            value={objectIntensity}
            min={0}
            max={255}
            step={1}
            onChange={setObjectIntensity}
          />
          <RangeField
            label="Intensidade do Fundo"
            value={backgroundIntensity}
            min={0}
            max={255}
            step={1}
            onChange={setBackgroundIntensity}
          />
          <RangeField
            label="Dispersão (ruído)"
            value={spread}
            min={5}
            max={50}
            step={1}
            onChange={setSpread}
          />
          <MetricGrid
            metrics={[
              ["Separação", separation.toString()],
              ["Dispersão", spread.toString()],
              ["Threshold ideal", idealThreshold.toString()],
              ["Tipo", isBimodal ? "Bimodal" : "Unimodal"],
            ]}
          />
          <div
            className={`rounded-3xl border p-4 ${
              isBimodal
                ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                : "border-rose-200 bg-rose-50 text-rose-900"
            }`}
          >
            <p className="text-sm font-black uppercase tracking-[0.16em]">
              Análise
            </p>
            <p className="mt-2 leading-7">
              {isBimodal
                ? `Histograma bimodal! Dois picos claros com vale em ~${idealThreshold}. Threshold global funciona bem.`
                : "Histograma sem separação clara. Threshold global vai falhar — considere thresholding adaptativo."}
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-violet-100 bg-white p-4">
          <HistogramDisplay
            histogram={histogram}
            threshold={idealThreshold}
            maxHist={maxHist}
            showThreshold={isBimodal}
          />
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-slate-100 p-3">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
                Objeto
              </p>
              <div className="mt-1 flex items-center gap-2">
                <div
                  className="size-8 rounded-lg border-2 border-slate-300"
                  style={{ backgroundColor: `rgb(${objectIntensity},${objectIntensity},${objectIntensity})` }}
                />
                <span className="font-mono text-sm font-bold text-slate-700">{objectIntensity}</span>
              </div>
            </div>
            <div className="rounded-2xl bg-slate-100 p-3">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
                Fundo
              </p>
              <div className="mt-1 flex items-center gap-2">
                <div
                  className="size-8 rounded-lg border-2 border-slate-300"
                  style={{ backgroundColor: `rgb(${backgroundIntensity},${backgroundIntensity},${backgroundIntensity})` }}
                />
                <span className="font-mono text-sm font-bold text-slate-700">{backgroundIntensity}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </InteractiveShell>
  );
}

function IluminacaoSimulador() {
  const [lightingUniformity, setLightingUniformity] = useState(80);
  const [threshold, setThreshold] = useState(128);

  const pixelGrid = useMemo(() => {
    const grid = [];
    for (let row = 0; row < 8; row++) {
      const rowData = [];
      for (let col = 0; col < 12; col++) {
        const centerX = 6;
        const centerY = 4;
        const dist = Math.sqrt((col - centerX) ** 2 + (row - centerY) ** 2);
        const isObject = dist < 3.5;

        const lightingFactor = 1 - ((12 - col) / 12) * ((100 - lightingUniformity) / 100) * 0.6;
        const baseValue = isObject ? 60 : 200;
        const adjustedValue = Math.floor(baseValue * lightingFactor);
        rowData.push(Math.max(0, Math.min(255, adjustedValue)));
      }
      grid.push(rowData);
    }
    return grid;
  }, [lightingUniformity]);

  const binaryGrid = useMemo(() => {
    return pixelGrid.map((row) =>
      row.map((value) => (value > threshold ? 255 : 0))
    );
  }, [pixelGrid, threshold]);

  const histogram = useMemo(() => {
    const hist = new Array(256).fill(0);
    pixelGrid.forEach((row) => {
      row.forEach((value) => {
        hist[value]++;
      });
    });
    return hist;
  }, [pixelGrid]);

  const maxHist = Math.max(...histogram);
  const isUniform = lightingUniformity > 70;

  return (
    <InteractiveShell
      eyebrow="Iluminação"
      title="Simulador de Iluminação"
      tone="emerald"
      icon={<Sun size={18} aria-hidden="true" />}
      description="Ajuste a uniformidade da iluminação e veja como o histograma e a binarização são afetados."
    >
      <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        <div className="grid gap-4">
          <RangeField
            label="Uniformidade da Iluminação"
            value={lightingUniformity}
            min={0}
            max={100}
            step={1}
            suffix="%"
            onChange={setLightingUniformity}
          />
          <RangeField
            label="Threshold"
            value={threshold}
            min={0}
            max={255}
            step={1}
            onChange={setThreshold}
          />
          <MetricGrid
            metrics={[
              ["Uniformidade", `${lightingUniformity}%`],
              ["Threshold", threshold.toString()],
              ["Iluminação", isUniform ? "Uniforme" : "Desigual"],
              ["Histograma", isUniform ? "Bimodal" : "Espalhado"],
            ]}
          />
          <div
            className={`rounded-3xl border p-4 ${
              isUniform
                ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                : "border-amber-200 bg-amber-50 text-amber-900"
            }`}
          >
            <p className="text-sm font-black uppercase tracking-[0.16em]">
              Diagnóstico
            </p>
            <p className="mt-2 leading-7">
              {isUniform
                ? "Iluminação uniforme. Histograma bimodal com separação clara. Threshold global funciona bem."
                : "Iluminação desigual. Histograma espalhado sem picos claros. Threshold global falha — considere thresholding adaptativo."}
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-3xl border border-emerald-100 bg-white p-4">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.16em] text-emerald-700">
              Imagem Original (com iluminação {isUniform ? "uniforme" : "desigual"})
            </p>
            <PixelGridDisplay grid={pixelGrid} isGray />
          </div>
          <div className="rounded-3xl border border-emerald-100 bg-white p-4">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.16em] text-emerald-700">
              Imagem Binária (threshold = {threshold})
            </p>
            <PixelGridDisplay grid={binaryGrid} isGray={false} />
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-3xl border border-emerald-100 bg-white p-4">
        <p className="mb-3 text-xs font-black uppercase tracking-[0.16em] text-emerald-700">
          Histograma de Intensidades
        </p>
        <HistogramDisplay histogram={histogram} threshold={threshold} maxHist={maxHist} />
      </div>
    </InteractiveShell>
  );
}

function PixelGridDisplay({
  grid,
  isGray,
}: {
  grid: number[][];
  isGray: boolean;
}) {
  const rows = grid.length;
  const cols = grid[0].length;
  const cellSize = 32;

  return (
    <svg
      className="w-full"
      viewBox={`0 0 ${cols * cellSize + 20} ${rows * cellSize + 20}`}
      role="img"
      aria-label="Grade de pixels"
    >
      <rect width={cols * cellSize + 20} height={rows * cellSize + 20} rx="16" fill="#f8fafc" />
      {grid.map((row, rowIndex) =>
        row.map((value, colIndex) => {
          const gray = isGray ? value : value;
          return (
            <rect
              key={`${rowIndex}-${colIndex}`}
              x={10 + colIndex * cellSize}
              y={10 + rowIndex * cellSize}
              width={cellSize - 2}
              height={cellSize - 2}
              rx="4"
              fill={`rgb(${gray},${gray},${gray})`}
              stroke="#cbd5e1"
              strokeWidth="1"
            />
          );
        })
      )}
    </svg>
  );
}

function HistogramDisplay({
  histogram,
  threshold,
  maxHist,
  showThreshold = true,
}: {
  histogram: number[];
  threshold: number;
  maxHist: number;
  showThreshold?: boolean;
}) {
  const width = 700;
  const height = 180;
  const barWidth = width / 256;

  return (
    <svg className="w-full" viewBox={`0 0 ${width} ${height + 40}`} role="img" aria-label="Histograma de intensidades">
      <rect width={width} height={height + 40} rx="16" fill="#f8fafc" />
      {histogram.map((count, intensity) => {
        const barHeight = maxHist > 0 ? (count / maxHist) * height : 0;
        const isAboveThreshold = intensity > threshold;
        return (
          <rect
            key={intensity}
            x={intensity * barWidth}
            y={height - barHeight}
            width={barWidth}
            height={barHeight}
            fill={isAboveThreshold ? "#10b981" : "#1e293b"}
            opacity="0.7"
          />
        );
      })}
      {showThreshold && (
        <>
          <line
            x1={threshold * barWidth}
            y1={0}
            x2={threshold * barWidth}
            y2={height}
            stroke="#ef4444"
            strokeWidth="3"
            strokeDasharray="6 4"
          />
          <text
            x={threshold * barWidth}
            y={height + 20}
            textAnchor="middle"
            fill="#ef4444"
            fontSize="12"
            fontWeight="900"
          >
            T={threshold}
          </text>
        </>
      )}
      <text x={0} y={height + 30} fill="#475569" fontSize="11" fontWeight="700">
        0
      </text>
      <text x={width} y={height + 30} textAnchor="end" fill="#475569" fontSize="11" fontWeight="700">
        255
      </text>
      <text x={width / 2} y={height + 30} textAnchor="middle" fill="#475569" fontSize="11" fontWeight="700">
        Intensidade
      </text>
    </svg>
  );
}

function InteractiveShell({
  eyebrow,
  title,
  description,
  tone,
  icon,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  tone: Tone;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  const styles: Record<Tone, string> = {
    teal: "border-teal-200 bg-teal-50 text-teal-700 shadow-teal-900/5",
    indigo: "border-indigo-200 bg-indigo-50 text-indigo-700 shadow-indigo-900/5",
    violet: "border-violet-200 bg-violet-50 text-violet-700 shadow-violet-900/5",
    emerald: "border-emerald-200 bg-emerald-50 text-emerald-700 shadow-emerald-900/5",
    rose: "border-rose-200 bg-rose-50 text-rose-700 shadow-rose-900/5",
    amber: "border-amber-200 bg-amber-50 text-amber-700 shadow-amber-900/5",
  };

  return (
    <section className={`rounded-[2rem] border p-5 shadow-xl ${styles[tone]}`}>
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em]">
            {icon}
            {eyebrow}
          </p>
          <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-slate-950">
            {title}
          </h3>
          <p className="mt-2 max-w-3xl leading-7 text-slate-600">{description}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

function RangeField({
  label,
  value,
  min,
  max,
  step,
  suffix = "",
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix?: string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="grid gap-2 text-sm font-black text-slate-700">
      <span className="flex items-center justify-between gap-3">
        {label}
        <span className="font-mono text-slate-950">
          {value}
          {suffix}
        </span>
      </span>
      <input
        className="w-full accent-slate-950"
        max={max}
        min={min}
        step={step}
        type="range"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}

function MetricGrid({ metrics }: { metrics: Array<[string, string]> }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {metrics.map(([label, value]) => (
        <div className="rounded-2xl bg-white px-4 py-3" key={label}>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
            {label}
          </p>
          <p className="mt-1 font-display text-xl font-semibold tracking-tight text-slate-950">
            {value}
          </p>
        </div>
      ))}
    </div>
  );
}
