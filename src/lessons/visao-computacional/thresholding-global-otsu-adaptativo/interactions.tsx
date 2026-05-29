import { useState, useMemo } from "react";
import { Sliders, Zap, Grid3x3 } from "lucide-react";
import type { LessonModule } from "../../../types/content";

export const interactions = {
  "threshold-global-slider": ThresholdGlobalSliderInteraction,
  "otsu-comparador": OtsuComparadorInteraction,
  "adaptativo-comparador": AdaptativoComparadorInteraction,
} satisfies LessonModule["interactions"];

type Tone = "teal" | "indigo" | "violet" | "emerald" | "rose" | "amber";

function ThresholdGlobalSliderInteraction() {
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
      eyebrow="Global"
      title="Threshold Global: Ajuste Manual"
      tone="amber"
      icon={<Sliders size={18} aria-hidden="true" />}
      description="Ajuste o threshold e veja como a binarização muda. O mesmo valor é aplicado a toda a imagem."
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

function OtsuComparadorInteraction() {
  const [globalThreshold, setGlobalThreshold] = useState(128);

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

  const otsuThreshold = useMemo(() => {
    const hist = new Array(256).fill(0);
    pixelGrid.forEach((row) => {
      row.forEach((value) => {
        hist[value]++;
      });
    });

    const total = hist.reduce((sum, count) => sum + count, 0);
    let sumB = 0;
    let wB = 0;
    let wF = 0;
    let maxVariance = 0;
    let threshold = 0;

    for (let t = 0; t < 256; t++) {
      wB += hist[t];
      if (wB === 0) continue;
      wF = total - wB;
      if (wF === 0) break;

      sumB += t * hist[t];
      const mB = sumB / wB;
      const mF = (hist.reduce((sum, count, i) => sum + i * count, 0) - sumB) / wF;
      const variance = wB * wF * (mB - mF) ** 2;

      if (variance > maxVariance) {
        maxVariance = variance;
        threshold = t;
      }
    }

    return threshold;
  }, [pixelGrid]);

  const globalBinary = useMemo(() => {
    return pixelGrid.map((row) =>
      row.map((value) => (value > globalThreshold ? 255 : 0))
    );
  }, [pixelGrid, globalThreshold]);

  const otsuBinary = useMemo(() => {
    return pixelGrid.map((row) =>
      row.map((value) => (value > otsuThreshold ? 255 : 0))
    );
  }, [pixelGrid, otsuThreshold]);

  const globalObjectPixels = globalBinary.flat().filter((v) => v === 0).length;
  const otsuObjectPixels = otsuBinary.flat().filter((v) => v === 0).length;

  return (
    <InteractiveShell
      eyebrow="Otsu"
      title="Comparador: Global vs Otsu"
      tone="violet"
      icon={<Zap size={18} aria-hidden="true" />}
      description="Compare thresholding global manual com Otsu automático. Otsu calcula o threshold ideal analisando o histograma."
    >
      <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        <div className="grid gap-4">
          <RangeField
            label="Threshold Global (manual)"
            value={globalThreshold}
            min={0}
            max={255}
            step={1}
            onChange={setGlobalThreshold}
          />
          <div className="rounded-3xl border border-violet-200 bg-white p-4">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-violet-700">
              Threshold Otsu (automático)
            </p>
            <p className="mt-2 font-display text-3xl font-semibold tracking-tight text-slate-950">
              {otsuThreshold}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Otsu calculou este valor automaticamente minimizando a variância intra-classe.
            </p>
          </div>
          <MetricGrid
            metrics={[
              ["Global", globalThreshold.toString()],
              ["Otsu", otsuThreshold.toString()],
              ["Obj (Global)", globalObjectPixels.toString()],
              ["Obj (Otsu)", otsuObjectPixels.toString()],
            ]}
          />
          <div className="rounded-3xl border border-violet-200 bg-white p-4">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-violet-700">
              Análise
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {Math.abs(globalThreshold - otsuThreshold) < 10
                ? "Seu threshold manual está próximo do Otsu. Boa escolha!"
                : globalThreshold < otsuThreshold
                  ? "Seu threshold é menor que Otsu. Pode ter falso positivo."
                  : "Seu threshold é maior que Otsu. Pode ter falso negativo."}
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-3xl border border-violet-100 bg-white p-4">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.16em] text-violet-700">
              Global (threshold = {globalThreshold})
            </p>
            <PixelGridDisplay grid={globalBinary} isGray={false} />
          </div>
          <div className="rounded-3xl border border-violet-100 bg-white p-4">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.16em] text-violet-700">
              Otsu (threshold = {otsuThreshold})
            </p>
            <PixelGridDisplay grid={otsuBinary} isGray={false} />
          </div>
        </div>
      </div>
    </InteractiveShell>
  );
}

function AdaptativoComparadorInteraction() {
  const [blockSize, setBlockSize] = useState(11);
  const [method, setMethod] = useState<"mean" | "gaussian">("mean");

  const pixelGrid = useMemo(() => {
    const grid = [];
    for (let row = 0; row < 8; row++) {
      const rowData = [];
      for (let col = 0; col < 12; col++) {
        const centerX = 6;
        const centerY = 4;
        const dist = Math.sqrt((col - centerX) ** 2 + (row - centerY) ** 2);
        const isObject = dist < 3.5;

        const lightingFactor = 1 - ((12 - col) / 12) * 0.4;
        const baseValue = isObject ? 60 : 200;
        const adjustedValue = Math.floor(baseValue * lightingFactor);
        rowData.push(Math.max(0, Math.min(255, adjustedValue)));
      }
      grid.push(rowData);
    }
    return grid;
  }, []);

  const adaptiveBinary = useMemo(() => {
    const rows = pixelGrid.length;
    const cols = pixelGrid[0].length;
    const binary = [];
    const halfBlock = Math.floor(blockSize / 2);
    const C = 2;

    for (let row = 0; row < rows; row++) {
      const binaryRow = [];
      for (let col = 0; col < cols; col++) {
        let sum = 0;
        let count = 0;
        let weightedSum = 0;

        for (let dr = -halfBlock; dr <= halfBlock; dr++) {
          for (let dc = -halfBlock; dc <= halfBlock; dc++) {
            const r = row + dr;
            const c = col + dc;
            if (r >= 0 && r < rows && c >= 0 && c < cols) {
              const value = pixelGrid[r][c];
              if (method === "mean") {
                sum += value;
                count++;
              } else {
                const dist = Math.sqrt(dr * dr + dc * dc);
                const weight = Math.exp(-(dist * dist) / (2 * (blockSize / 4) ** 2));
                weightedSum += value * weight;
                sum += weight;
              }
            }
          }
        }

        const localThreshold = method === "mean" ? sum / count - C : weightedSum / sum - C;
        binaryRow.push(pixelGrid[row][col] > localThreshold ? 255 : 0);
      }
      binary.push(binaryRow);
    }

    return binary;
  }, [pixelGrid, blockSize, method]);

  const globalBinary = useMemo(() => {
    const threshold = 128;
    return pixelGrid.map((row) =>
      row.map((value) => (value > threshold ? 255 : 0))
    );
  }, [pixelGrid]);

  const adaptiveObjectPixels = adaptiveBinary.flat().filter((v) => v === 0).length;
  const globalObjectPixels = globalBinary.flat().filter((v) => v === 0).length;

  return (
    <InteractiveShell
      eyebrow="Adaptativo"
      title="Thresholding Adaptativo: Local"
      tone="emerald"
      icon={<Grid3x3 size={18} aria-hidden="true" />}
      description="Compare thresholding global com adaptativo em uma cena com iluminação desigual. Ajuste blockSize e método."
    >
      <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        <div className="grid gap-4">
          <RangeField
            label="blockSize (tamanho da janela)"
            value={blockSize}
            min={3}
            max={51}
            step={2}
            onChange={setBlockSize}
          />
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setMethod("mean")}
              className={`rounded-2xl border px-4 py-3 text-sm font-black transition ${
                method === "mean"
                  ? "border-emerald-600 bg-emerald-600 text-white shadow-lg shadow-emerald-900/15"
                  : "border-emerald-100 bg-white text-slate-700 hover:border-emerald-300"
              }`}
            >
              Média
            </button>
            <button
              type="button"
              onClick={() => setMethod("gaussian")}
              className={`rounded-2xl border px-4 py-3 text-sm font-black transition ${
                method === "gaussian"
                  ? "border-emerald-600 bg-emerald-600 text-white shadow-lg shadow-emerald-900/15"
                  : "border-emerald-100 bg-white text-slate-700 hover:border-emerald-300"
              }`}
            >
              Gaussiano
            </button>
          </div>
          <MetricGrid
            metrics={[
              ["blockSize", blockSize.toString()],
              ["Método", method === "mean" ? "Média" : "Gaussiano"],
              ["Obj (Global)", globalObjectPixels.toString()],
              ["Obj (Adapt)", adaptiveObjectPixels.toString()],
            ]}
          />
          <div className="rounded-3xl border border-emerald-200 bg-white p-4">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">
              Análise
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {blockSize < 11
                ? "blockSize muito pequeno: threshold muito local, sensível a ruído."
                : blockSize > 31
                  ? "blockSize grande: threshold mais global, suaviza variações."
                  : "blockSize equilibrado: boa adaptação local."}
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-3xl border border-emerald-100 bg-white p-4">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.16em] text-emerald-700">
              Global (threshold fixo = 128)
            </p>
            <PixelGridDisplay grid={globalBinary} isGray={false} />
            <p className="mt-2 text-center text-xs font-bold text-slate-600">
              Falha na região com sombra
            </p>
          </div>
          <div className="rounded-3xl border border-emerald-100 bg-white p-4">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.16em] text-emerald-700">
              Adaptativo (blockSize = {blockSize}, {method === "mean" ? "média" : "gaussiano"})
            </p>
            <PixelGridDisplay grid={adaptiveBinary} isGray={false} />
            <p className="mt-2 text-center text-xs font-bold text-slate-600">
              Adapta-se à iluminação desigual
            </p>
          </div>
        </div>
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
}: {
  histogram: number[];
  threshold: number;
  maxHist: number;
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
