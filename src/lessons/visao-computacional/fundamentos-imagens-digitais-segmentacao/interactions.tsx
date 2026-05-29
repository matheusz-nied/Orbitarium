import { useState, useMemo } from "react";
import { ZoomIn, Palette, Sliders } from "lucide-react";
import type { LessonModule } from "../../../types/content";

export const interactions = {
  "pixel-zoom-interactive": PixelZoomInteraction,
  "rgb-to-grayscale-interactive": RgbToGrayscaleInteraction,
  "contrast-slider-interactive": ContrastSliderInteraction,
} satisfies LessonModule["interactions"];

type Tone = "teal" | "indigo" | "violet" | "emerald" | "rose" | "amber";

function PixelZoomInteraction() {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedPixel, setSelectedPixel] = useState({ row: 3, col: 4 });

  const gridSize = 8;
  const pixelData = useMemo(() => {
    const data = [];
    for (let row = 0; row < gridSize; row++) {
      const rowData = [];
      for (let col = 0; col < gridSize; col++) {
        const value = Math.floor(Math.random() * 256);
        rowData.push(value);
      }
      data.push(rowData);
    }
    return data;
  }, []);

  const selectedValue = pixelData[selectedPixel.row]?.[selectedPixel.col] ?? 0;

  return (
    <InteractiveShell
      eyebrow="Exploração"
      title="Zoom no Pixel"
      tone="violet"
      icon={<ZoomIn size={18} aria-hidden="true" />}
      description="Clique em um pixel e use o slider para dar zoom. Veja como a imagem é feita de números individuais."
    >
      <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        <div className="grid gap-4">
          <RangeField
            label="Nível de Zoom"
            value={zoomLevel}
            min={1}
            max={5}
            step={1}
            onChange={setZoomLevel}
          />
          <div className="rounded-3xl bg-white p-5">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-700">
              Pixel Selecionado
            </p>
            <h4 className="mt-2 font-display text-3xl font-semibold tracking-tight text-slate-950">
              [{selectedPixel.row}, {selectedPixel.col}]
            </h4>
            <p className="mt-3 leading-7 text-slate-600">
              Valor de intensidade: <span className="font-mono font-black text-violet-700">{selectedValue}</span>
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div
                className="size-16 rounded-2xl border-2 border-violet-300"
                style={{ backgroundColor: `rgb(${selectedValue},${selectedValue},${selectedValue})` }}
              />
              <div>
                <p className="text-sm font-bold text-slate-700">
                  {selectedValue === 0 ? "Preto absoluto" : selectedValue === 255 ? "Branco absoluto" : `Cinza ${selectedValue}`}
                </p>
                <p className="text-xs text-slate-500">Linha {selectedPixel.row}, Coluna {selectedPixel.col}</p>
              </div>
            </div>
          </div>
          <div className="rounded-3xl border border-violet-100 bg-white p-4">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-violet-700">
              Instruções
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Clique em qualquer célula da grade para selecionar um pixel. O zoom aumenta o tamanho visual de cada pixel, revelando que a imagem é feita de quadrados individuais.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-violet-100 bg-white p-4">
          <PixelGrid
            data={pixelData}
            zoomLevel={zoomLevel}
            selectedPixel={selectedPixel}
            onSelect={setSelectedPixel}
          />
          <div className="mt-4 flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Zoom: {zoomLevel}x</span>
            <span>Grade: {gridSize}×{gridSize}</span>
          </div>
        </div>
      </div>
    </InteractiveShell>
  );
}

function RgbToGrayscaleInteraction() {
  const [channel, setChannel] = useState<"rgb" | "r" | "g" | "b" | "gray">("rgb");
  const [r, setR] = useState(180);
  const [g, setG] = useState(120);
  const [b, setB] = useState(80);

  const grayValue = Math.round(0.299 * r + 0.587 * g + 0.114 * b);

  const displayColor = useMemo(() => {
    if (channel === "rgb") return `rgb(${r},${g},${b})`;
    if (channel === "r") return `rgb(${r},0,0)`;
    if (channel === "g") return `rgb(0,${g},0)`;
    if (channel === "b") return `rgb(0,0,${b})`;
    return `rgb(${grayValue},${grayValue},${grayValue})`;
  }, [channel, r, g, b, grayValue]);

  return (
    <InteractiveShell
      eyebrow="Conversão"
      title="RGB para Escala de Cinza"
      tone="rose"
      icon={<Palette size={18} aria-hidden="true" />}
      description="Ajuste os valores RGB e veja como a fórmula ponderada converte para escala de cinza."
    >
      <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        <div className="grid gap-4">
          <RangeField label="Vermelho (R)" value={r} min={0} max={255} step={1} onChange={setR} />
          <RangeField label="Verde (G)" value={g} min={0} max={255} step={1} onChange={setG} />
          <RangeField label="Azul (B)" value={b} min={0} max={255} step={1} onChange={setB} />
          <MetricGrid
            metrics={[
              ["R", r.toString()],
              ["G", g.toString()],
              ["B", b.toString()],
              ["Cinza", grayValue.toString()],
            ]}
          />
          <div className="rounded-3xl border border-rose-200 bg-white p-4">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-rose-700">
              Fórmula
            </p>
            <p className="mt-2 font-mono text-sm font-bold text-slate-700">
              Y = 0.299×{r} + 0.587×{g} + 0.114×{b}
            </p>
            <p className="mt-2 font-mono text-lg font-black text-rose-700">
              Y = {grayValue}
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="grid grid-cols-5 gap-2">
            {(["rgb", "r", "g", "b", "gray"] as const).map((ch) => (
              <button
                key={ch}
                type="button"
                onClick={() => setChannel(ch)}
                className={`rounded-2xl border px-3 py-2 text-sm font-black transition ${
                  channel === ch
                    ? "border-rose-600 bg-rose-600 text-white shadow-lg shadow-rose-900/15"
                    : "border-rose-100 bg-white text-slate-700 hover:border-rose-300"
                }`}
              >
                {ch.toUpperCase()}
              </button>
            ))}
          </div>
          <div className="rounded-3xl border border-rose-100 bg-white p-4">
            <div
              className="aspect-square w-full rounded-2xl border-2 border-rose-200"
              style={{ backgroundColor: displayColor }}
            />
            <p className="mt-3 text-center text-sm font-bold text-slate-700">
              {channel === "rgb" && "Cor Original (RGB)"}
              {channel === "r" && "Canal Vermelho"}
              {channel === "g" && "Canal Verde"}
              {channel === "b" && "Canal Azul"}
              {channel === "gray" && "Escala de Cinza"}
            </p>
          </div>
          <div className="rounded-3xl bg-white p-4">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-rose-700">
              Observação
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              O canal verde tem o maior peso (0.587) porque o olho humano é mais sensível ao verde. A escala de cinza resultante parece mais natural do que uma média simples.
            </p>
          </div>
        </div>
      </div>
    </InteractiveShell>
  );
}

function ContrastSliderInteraction() {
  const [contrast, setContrast] = useState(50);
  const [threshold, setThreshold] = useState(128);

  const objectBase = 60;
  const backgroundBase = 200;

  const objectValue = useMemo(() => {
    const adjusted = objectBase + (contrast - 50) * 1.5;
    return Math.max(0, Math.min(255, Math.round(adjusted)));
  }, [contrast]);

  const backgroundValue = useMemo(() => {
    const adjusted = backgroundBase - (contrast - 50) * 1.5;
    return Math.max(0, Math.min(255, Math.round(adjusted)));
  }, [contrast]);

  const contrastDiff = Math.abs(backgroundValue - objectValue);
  const objectIsAbove = objectValue > threshold;
  const backgroundIsAbove = backgroundValue > threshold;

  const binaryObject = objectIsAbove ? 255 : 0;
  const binaryBackground = backgroundIsAbove ? 255 : 0;
  const segmentationWorks = binaryObject !== binaryBackground;

  return (
    <InteractiveShell
      eyebrow="Segmentação"
      title="Contraste e Threshold"
      tone="emerald"
      icon={<Sliders size={18} aria-hidden="true" />}
      description="Ajuste o contraste e o threshold para ver como a separação objeto/fundo depende da diferença de intensidade."
    >
      <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        <div className="grid gap-4">
          <RangeField
            label="Contraste (diferença objeto/fundo)"
            value={contrast}
            min={0}
            max={100}
            step={1}
            onChange={setContrast}
          />
          <RangeField
            label="Threshold (valor de corte)"
            value={threshold}
            min={0}
            max={255}
            step={1}
            onChange={setThreshold}
          />
          <MetricGrid
            metrics={[
              ["Objeto", objectValue.toString()],
              ["Fundo", backgroundValue.toString()],
              ["Diferença", contrastDiff.toString()],
              ["Threshold", threshold.toString()],
            ]}
          />
          <div
            className={`rounded-3xl border p-4 ${
              segmentationWorks
                ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                : "border-rose-200 bg-rose-50 text-rose-900"
            }`}
          >
            <p className="text-sm font-black uppercase tracking-[0.16em]">
              Resultado da Segmentação
            </p>
            <p className="mt-2 leading-7">
              {segmentationWorks
                ? `Sucesso! Objeto (${objectValue}) e fundo (${backgroundValue}) estão em lados opostos do threshold (${threshold}). A segmentação funciona.`
                : `Falha! Objeto (${objectValue}) e fundo (${backgroundValue}) estão do mesmo lado do threshold (${threshold}). Não é possível separar.`}
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-3xl border border-emerald-100 bg-white p-4">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.16em] text-emerald-700">
              Imagem Original (Escala de Cinza)
            </p>
            <div className="relative aspect-video overflow-hidden rounded-2xl border-2 border-emerald-200">
              <div
                className="absolute inset-0"
                style={{ backgroundColor: `rgb(${backgroundValue},${backgroundValue},${backgroundValue})` }}
              />
              <div
                className="absolute left-1/2 top-1/2 size-32 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{ backgroundColor: `rgb(${objectValue},${objectValue},${objectValue})` }}
              />
            </div>
          </div>
          <div className="rounded-3xl border border-emerald-100 bg-white p-4">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.16em] text-emerald-700">
              Imagem Binária (após threshold)
            </p>
            <div className="relative aspect-video overflow-hidden rounded-2xl border-2 border-emerald-200">
              <div
                className="absolute inset-0"
                style={{ backgroundColor: binaryBackground === 255 ? "#ffffff" : "#000000" }}
              />
              <div
                className="absolute left-1/2 top-1/2 size-32 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{ backgroundColor: binaryObject === 255 ? "#ffffff" : "#000000" }}
              />
            </div>
            <p className="mt-2 text-center text-xs font-bold text-slate-600">
              {segmentationWorks ? "Objeto separado do fundo" : "Objeto e fundo misturados"}
            </p>
          </div>
        </div>
      </div>
    </InteractiveShell>
  );
}

function PixelGrid({
  data,
  zoomLevel,
  selectedPixel,
  onSelect,
}: {
  data: number[][];
  zoomLevel: number;
  selectedPixel: { row: number; col: number };
  onSelect: (pixel: { row: number; col: number }) => void;
}) {
  const cellSize = 30 + (zoomLevel - 1) * 12;
  const gridSize = data.length;

  return (
    <svg
      className="w-full"
      viewBox={`0 0 ${gridSize * cellSize + 40} ${gridSize * cellSize + 40}`}
      role="img"
      aria-label="Grade de pixels interativa"
    >
      <rect width={gridSize * cellSize + 40} height={gridSize * cellSize + 40} rx="20" fill="#faf5ff" />
      {data.map((row, rowIndex) =>
        row.map((value, colIndex) => {
          const isSelected = rowIndex === selectedPixel.row && colIndex === selectedPixel.col;
          const gray = Math.floor(value * 0.8 + 30);
          return (
            <g
              key={`${rowIndex}-${colIndex}`}
              className="cursor-pointer"
              role="button"
              tabIndex={0}
              aria-label={`Pixel linha ${rowIndex}, coluna ${colIndex}, valor ${value}`}
              onClick={() => onSelect({ row: rowIndex, col: colIndex })}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  onSelect({ row: rowIndex, col: colIndex });
                }
              }}
            >
              <rect
                x={20 + colIndex * cellSize}
                y={20 + rowIndex * cellSize}
                width={cellSize - 2}
                height={cellSize - 2}
                rx="4"
                fill={`rgb(${gray},${gray},${gray})`}
                stroke={isSelected ? "#7c3aed" : "#ddd6fe"}
                strokeWidth={isSelected ? 4 : 2}
              />
              {zoomLevel >= 3 && (
                <text
                  x={20 + colIndex * cellSize + (cellSize - 2) / 2}
                  y={20 + rowIndex * cellSize + (cellSize - 2) / 2 + 5}
                  textAnchor="middle"
                  fill={gray > 128 ? "#0f172a" : "#ffffff"}
                  fontSize="11"
                  fontWeight="900"
                >
                  {value}
                </text>
              )}
            </g>
          );
        })
      )}
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
        <span className="font-mono text-slate-950">{value}</span>
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
