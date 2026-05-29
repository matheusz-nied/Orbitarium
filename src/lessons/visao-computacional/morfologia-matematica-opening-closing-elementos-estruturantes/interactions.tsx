import { useMemo, useState, type ReactNode } from "react";
import { BrushCleaning, Maximize2, Settings2 } from "lucide-react";
import type { LessonModule } from "../../../types/content";

export const interactions = {
  "erosao-dilatacao-simulador": ErosaoDilatacaoSimulador,
  "opening-closing-comparador": OpeningClosingComparador,
  "kernel-size-playground": KernelSizePlayground,
} satisfies LessonModule["interactions"];

type Tone = "teal" | "violet" | "amber";
type BinaryGrid = number[][];
type Operation = "erosion" | "dilation" | "opening" | "closing";

const baseObjectGrid: BinaryGrid = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
  [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const noisyGrid: BinaryGrid = [
  [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const holeGrid: BinaryGrid = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
  [0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0],
  [0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0],
  [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

function ErosaoDilatacaoSimulador() {
  const [operation, setOperation] = useState<"erosion" | "dilation">("erosion");
  const [iterations, setIterations] = useState(1);
  const result = useMemo(
    () => applyIterations(baseObjectGrid, operation, 3, iterations),
    [operation, iterations],
  );

  return (
    <InteractiveShell
      eyebrow="Operações base"
      title="Simule erosão e dilatação"
      tone="violet"
      icon={<Maximize2 size={18} aria-hidden="true" />}
      description="Alterne a operação e aumente as iterações para ver como a forma encolhe ou cresce de modo acumulativo."
    >
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="grid gap-4">
          <ModeButtons
            options={[
              ["erosion", "Erosão"],
              ["dilation", "Dilatação"],
            ]}
            value={operation}
            onChange={(value) => setOperation(value as "erosion" | "dilation")}
            tone="violet"
          />
          <RangeField label="Iterações" value={iterations} min={1} max={3} step={1} onChange={setIterations} />
          <MetricGrid
            metrics={[
              ["Operação", operation === "erosion" ? "Erosão" : "Dilatação"],
              ["Pixels antes", countPixels(baseObjectGrid).toString()],
              ["Pixels depois", countPixels(result).toString()],
              ["Variação", signedDelta(countPixels(result) - countPixels(baseObjectGrid))],
            ]}
          />
          <ExplanationCard tone="violet">
            {operation === "erosion"
              ? "Erosão exige que o kernel caiba dentro do objeto. Bordas e detalhes finos desaparecem primeiro."
              : "Dilatação expande o objeto quando o kernel encosta nele. Falhas pequenas se conectam, mas objetos próximos podem se fundir."}
          </ExplanationCard>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <GridPanel title="Original" grid={baseObjectGrid} tone="violet" />
          <GridPanel title="Resultado" grid={result} tone="violet" />
        </div>
      </div>
    </InteractiveShell>
  );
}

function OpeningClosingComparador() {
  const [scenario, setScenario] = useState<"noise" | "holes">("noise");
  const input = scenario === "noise" ? noisyGrid : holeGrid;
  const opening = useMemo(() => morph(input, "opening", 3), [input]);
  const closing = useMemo(() => morph(input, "closing", 3), [input]);

  return (
    <InteractiveShell
      eyebrow="Comparação"
      title="Opening ou closing?"
      tone="teal"
      icon={<BrushCleaning size={18} aria-hidden="true" />}
      description="Troque o tipo de defeito e compare o efeito de opening e closing no mesmo binário."
    >
      <div className="grid gap-5">
        <ModeButtons
          options={[
            ["noise", "Ruído branco"],
            ["holes", "Buracos pretos"],
          ]}
          value={scenario}
          onChange={(value) => setScenario(value as "noise" | "holes")}
          tone="teal"
        />
        <div className="grid gap-4 lg:grid-cols-3">
          <GridPanel title="Entrada" grid={input} tone="teal" />
          <GridPanel title="Opening" grid={opening} tone="teal" />
          <GridPanel title="Closing" grid={closing} tone="teal" />
        </div>
        <ExplanationCard tone="teal">
          {scenario === "noise"
            ? "Com ruído branco, opening costuma ser melhor: a erosão apaga partículas pequenas e a dilatação restaura o objeto principal."
            : "Com buracos internos, closing costuma ser melhor: a dilatação fecha falhas e a erosão restaura o tamanho aproximado do objeto."}
        </ExplanationCard>
      </div>
    </InteractiveShell>
  );
}

function KernelSizePlayground() {
  const [operation, setOperation] = useState<Operation>("opening");
  const [kernelSize, setKernelSize] = useState(3);
  const input = operation === "opening" || operation === "erosion" ? noisyGrid : holeGrid;
  const result = useMemo(() => morph(input, operation, kernelSize), [input, operation, kernelSize]);
  const delta = countPixels(result) - countPixels(input);

  return (
    <InteractiveShell
      eyebrow="Kernel"
      title="Playground de tamanho do kernel"
      tone="amber"
      icon={<Settings2 size={18} aria-hidden="true" />}
      description="Ajuste operação e kernel para sentir como 3×3, 5×5 e 7×7 mudam a escala da limpeza."
    >
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="grid gap-4">
          <ModeButtons
            options={[
              ["opening", "Opening"],
              ["closing", "Closing"],
              ["erosion", "Erosão"],
              ["dilation", "Dilatação"],
            ]}
            value={operation}
            onChange={(value) => setOperation(value as Operation)}
            tone="amber"
          />
          <RangeField label="Kernel" value={kernelSize} min={3} max={7} step={2} suffix="×" onChange={setKernelSize} />
          <MetricGrid
            metrics={[
              ["Kernel", `${kernelSize}×${kernelSize}`],
              ["Antes", countPixels(input).toString()],
              ["Depois", countPixels(result).toString()],
              ["Variação", signedDelta(delta)],
            ]}
          />
          <ExplanationCard tone="amber">
            {kernelSize === 3
              ? "Kernel 3×3 faz alterações locais suaves e preserva melhor detalhes finos."
              : kernelSize === 5
                ? "Kernel 5×5 remove ou preenche defeitos maiores, mas começa a alterar medidas."
                : "Kernel 7×7 é agressivo: bom para ruído grande, perigoso para objetos pequenos."}
          </ExplanationCard>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <GridPanel title="Entrada" grid={input} tone="amber" />
          <GridPanel title="Resultado" grid={result} tone="amber" />
        </div>
      </div>
    </InteractiveShell>
  );
}

function morph(grid: BinaryGrid, operation: Operation, kernelSize: number) {
  if (operation === "erosion") return erode(grid, kernelSize);
  if (operation === "dilation") return dilate(grid, kernelSize);
  if (operation === "opening") return dilate(erode(grid, kernelSize), kernelSize);
  return erode(dilate(grid, kernelSize), kernelSize);
}

function applyIterations(grid: BinaryGrid, operation: "erosion" | "dilation", kernelSize: number, iterations: number) {
  let current = grid;
  for (let index = 0; index < iterations; index += 1) {
    current = morph(current, operation, kernelSize);
  }
  return current;
}

function erode(grid: BinaryGrid, kernelSize: number): BinaryGrid {
  const offset = Math.floor(kernelSize / 2);
  return grid.map((row, rowIndex) =>
    row.map((_, colIndex) => {
      for (let y = -offset; y <= offset; y += 1) {
        for (let x = -offset; x <= offset; x += 1) {
          if ((grid[rowIndex + y]?.[colIndex + x] ?? 0) === 0) return 0;
        }
      }
      return 1;
    }),
  );
}

function dilate(grid: BinaryGrid, kernelSize: number): BinaryGrid {
  const offset = Math.floor(kernelSize / 2);
  return grid.map((row, rowIndex) =>
    row.map((_, colIndex) => {
      for (let y = -offset; y <= offset; y += 1) {
        for (let x = -offset; x <= offset; x += 1) {
          if ((grid[rowIndex + y]?.[colIndex + x] ?? 0) === 1) return 1;
        }
      }
      return 0;
    }),
  );
}

function countPixels(grid: BinaryGrid) {
  return grid.flat().filter(Boolean).length;
}

function signedDelta(delta: number) {
  return delta > 0 ? `+${delta}` : delta.toString();
}

function GridPanel({ title, grid, tone }: { title: string; grid: BinaryGrid; tone: Tone }) {
  const color = tone === "teal" ? "text-teal-700" : tone === "violet" ? "text-violet-700" : "text-amber-700";
  return (
    <div className="rounded-3xl border border-white/70 bg-white p-4">
      <p className={`mb-3 text-xs font-black uppercase tracking-[0.16em] ${color}`}>{title}</p>
      <BinaryGridSvg grid={grid} />
    </div>
  );
}

function BinaryGridSvg({ grid }: { grid: BinaryGrid }) {
  const cell = 28;
  const rows = grid.length;
  const cols = grid[0].length;
  return (
    <svg className="w-full" viewBox={`0 0 ${cols * cell + 20} ${rows * cell + 20}`} role="img" aria-label="Grade binária">
      <rect width={cols * cell + 20} height={rows * cell + 20} rx="16" fill="#f8fafc" />
      {grid.map((row, rowIndex) =>
        row.map((value, colIndex) => (
          <rect
            key={`${rowIndex}-${colIndex}`}
            x={10 + colIndex * cell}
            y={10 + rowIndex * cell}
            width={cell - 2}
            height={cell - 2}
            rx="5"
            fill={value ? "#0f172a" : "#ffffff"}
            stroke="#cbd5e1"
            strokeWidth="1"
          />
        )),
      )}
    </svg>
  );
}

function InteractiveShell({ eyebrow, title, description, tone, icon, children }: { eyebrow: string; title: string; description: string; tone: Tone; icon: ReactNode; children: ReactNode }) {
  const styles: Record<Tone, string> = {
    teal: "border-teal-200 bg-teal-50 text-teal-700 shadow-teal-900/5",
    violet: "border-violet-200 bg-violet-50 text-violet-700 shadow-violet-900/5",
    amber: "border-amber-200 bg-amber-50 text-amber-700 shadow-amber-900/5",
  };

  return (
    <section className={`rounded-[2rem] border p-5 shadow-xl ${styles[tone]}`}>
      <div className="mb-5">
        <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em]">{icon}{eyebrow}</p>
        <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-slate-950">{title}</h3>
        <p className="mt-2 max-w-3xl leading-7 text-slate-600">{description}</p>
      </div>
      {children}
    </section>
  );
}

function ModeButtons({ options, value, onChange, tone }: { options: Array<[string, string]>; value: string; onChange: (value: string) => void; tone: Tone }) {
  const active = tone === "teal" ? "border-teal-600 bg-teal-600" : tone === "violet" ? "border-violet-600 bg-violet-600" : "border-amber-600 bg-amber-600";
  const inactive = tone === "teal" ? "border-teal-100 hover:border-teal-300" : tone === "violet" ? "border-violet-100 hover:border-violet-300" : "border-amber-100 hover:border-amber-300";
  return (
    <div className="grid grid-cols-2 gap-3">
      {options.map(([optionValue, label]) => (
        <button
          key={optionValue}
          type="button"
          onClick={() => onChange(optionValue)}
          className={`rounded-2xl border px-4 py-3 text-sm font-black transition ${value === optionValue ? `${active} text-white shadow-lg` : `${inactive} bg-white text-slate-700`}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

function RangeField({ label, value, min, max, step, suffix = "", onChange }: { label: string; value: number; min: number; max: number; step: number; suffix?: string; onChange: (value: number) => void }) {
  return (
    <label className="grid gap-2 text-sm font-black text-slate-700">
      <span className="flex items-center justify-between gap-3">
        {label}
        <span className="font-mono text-slate-950">{value}{suffix}</span>
      </span>
      <input className="w-full accent-slate-950" max={max} min={min} step={step} type="range" value={value} onChange={(event) => onChange(Number(event.target.value))} />
    </label>
  );
}

function MetricGrid({ metrics }: { metrics: Array<[string, string]> }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {metrics.map(([label, value]) => (
        <div className="rounded-2xl bg-white px-4 py-3" key={label}>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">{label}</p>
          <p className="mt-1 font-display text-xl font-semibold tracking-tight text-slate-950">{value}</p>
        </div>
      ))}
    </div>
  );
}

function ExplanationCard({ children, tone }: { children: ReactNode; tone: Tone }) {
  const color = tone === "teal" ? "text-teal-700" : tone === "violet" ? "text-violet-700" : "text-amber-700";
  return (
    <div className="rounded-3xl border border-white/70 bg-white p-4">
      <p className={`text-xs font-black uppercase tracking-[0.16em] ${color}`}>Leitura</p>
      <p className="mt-2 text-sm leading-6 text-slate-600">{children}</p>
    </div>
  );
}
