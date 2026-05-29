import { useMemo, useState, type ReactNode } from "react";
import { GitBranch, MousePointer2, Route } from "lucide-react";
import type { LessonModule } from "../../../types/content";

export const interactions = {
  "conectividade-grid": ConectividadeGrid,
  "caminho-conectado-demo": CaminhoConectadoDemo,
  "comparador-4-8": Comparador48,
} satisfies LessonModule["interactions"];

type Connectivity = 4 | 8;
type Tone = "blue" | "emerald" | "violet";
type BinaryGrid = number[][];

const diagonalGrid: BinaryGrid = [
  [1, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 1],
];

const mixedGrid: BinaryGrid = [
  [0, 1, 1, 0, 0, 0, 0, 1],
  [0, 1, 0, 0, 1, 0, 0, 1],
  [0, 0, 1, 0, 0, 1, 0, 0],
  [1, 0, 0, 1, 0, 0, 1, 0],
  [1, 1, 0, 0, 0, 1, 1, 0],
  [0, 0, 0, 1, 1, 0, 0, 0],
];

const pathGrid: BinaryGrid = [
  [0, 1, 1, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 1, 0],
  [0, 0, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 1, 0, 0],
  [1, 1, 0, 0, 1, 1, 1],
  [0, 1, 1, 0, 0, 0, 0],
];

function ConectividadeGrid() {
  const [connectivity, setConnectivity] = useState<Connectivity>(4);
  const labels = useMemo(() => labelComponents(diagonalGrid, connectivity), [connectivity]);
  const count = Math.max(...labels.flat());

  return (
    <InteractiveShell
      eyebrow="Regra local"
      title="Alterne conectividade-4 e conectividade-8"
      tone="blue"
      icon={<MousePointer2 size={18} aria-hidden="true" />}
      description="A mesma diagonal de pixels pode ser muitos blobs ou um único blob, dependendo da regra escolhida."
    >
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="grid gap-4">
          <ConnectivityButtons value={connectivity} onChange={setConnectivity} tone="blue" />
          <MetricGrid
            metrics={[
              ["Conectividade", connectivity.toString()],
              ["Blobs", count.toString()],
              ["Diagonais", connectivity === 4 ? "não conectam" : "conectam"],
              ["Leitura", connectivity === 4 ? "fragmenta" : "une"],
            ]}
          />
          <Explanation tone="blue">
            {connectivity === 4
              ? "Com conectividade-4, cada pixel diagonal fica separado porque não toca horizontal ou verticalmente o próximo."
              : "Com conectividade-8, os contatos diagonais bastam para criar um caminho conectado único."}
          </Explanation>
        </div>
        <GridPanel grid={labels} title={`Labels com conectividade-${connectivity}`} tone="blue" />
      </div>
    </InteractiveShell>
  );
}

function CaminhoConectadoDemo() {
  const [connectivity, setConnectivity] = useState<Connectivity>(8);
  const labels = useMemo(() => labelComponents(pathGrid, connectivity), [connectivity]);
  const startLabel = labels[0][1];
  const endLabel = labels[4][6];
  const connected = startLabel > 0 && startLabel === endLabel;

  return (
    <InteractiveShell
      eyebrow="Caminho"
      title="Existe caminho entre A e B?"
      tone="emerald"
      icon={<Route size={18} aria-hidden="true" />}
      description="A conexão não precisa ser direta. Basta existir uma cadeia de pixels adjacentes entre os pontos."
    >
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="grid gap-4">
          <ConnectivityButtons value={connectivity} onChange={setConnectivity} tone="emerald" />
          <MetricGrid
            metrics={[
              ["A", `label ${startLabel}`],
              ["B", `label ${endLabel}`],
              ["Resultado", connected ? "conectados" : "separados"],
              ["Regra", `conectividade-${connectivity}`],
            ]}
          />
          <Explanation tone="emerald">
            {connected
              ? "A e B pertencem ao mesmo componente porque há uma cadeia de pixels adjacentes entre eles."
              : "A e B aparecem separados porque a regra escolhida quebra o caminho em algum ponto."}
          </Explanation>
        </div>
        <GridPanel grid={labels} title="A e B no mapa de labels" tone="emerald" markers={{ a: [0, 1], b: [4, 6] }} />
      </div>
    </InteractiveShell>
  );
}

function Comparador48() {
  const labels4 = useMemo(() => labelComponents(mixedGrid, 4), []);
  const labels8 = useMemo(() => labelComponents(mixedGrid, 8), []);
  const count4 = Math.max(...labels4.flat());
  const count8 = Math.max(...labels8.flat());

  return (
    <InteractiveShell
      eyebrow="Comparação"
      title="Conectividade-4 vs conectividade-8"
      tone="violet"
      icon={<GitBranch size={18} aria-hidden="true" />}
      description="Compare o mesmo binário com as duas regras e observe como a contagem de blobs muda."
    >
      <div className="grid gap-5">
        <MetricGrid
          metrics={[
            ["Blobs com 4", count4.toString()],
            ["Blobs com 8", count8.toString()],
            ["Diferença", Math.abs(count4 - count8).toString()],
            ["Causa", "diagonais"],
          ]}
        />
        <div className="grid gap-4 lg:grid-cols-2">
          <GridPanel grid={labels4} title="Conectividade-4" tone="violet" />
          <GridPanel grid={labels8} title="Conectividade-8" tone="violet" />
        </div>
        <Explanation tone="violet">
          Conectividade-4 separa mais componentes. Conectividade-8 une regiões por contatos diagonais. A escolha muda estatísticas e precisa ser relatada no notebook.
        </Explanation>
      </div>
    </InteractiveShell>
  );
}

function labelComponents(grid: BinaryGrid, connectivity: Connectivity): number[][] {
  const rows = grid.length;
  const cols = grid[0].length;
  const labels = Array.from({ length: rows }, () => Array.from({ length: cols }, () => 0));
  let current = 0;
  const neighbors = connectivity === 4
    ? [[1, 0], [-1, 0], [0, 1], [0, -1]]
    : [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]];

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      if (!grid[row][col] || labels[row][col]) continue;
      current += 1;
      const stack = [[row, col]];
      labels[row][col] = current;
      while (stack.length) {
        const [r, c] = stack.pop() ?? [0, 0];
        for (const [dr, dc] of neighbors) {
          const nr = r + dr;
          const nc = c + dc;
          if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
          if (!grid[nr][nc] || labels[nr][nc]) continue;
          labels[nr][nc] = current;
          stack.push([nr, nc]);
        }
      }
    }
  }
  return labels;
}

function GridPanel({ grid, title, tone, markers }: { grid: number[][]; title: string; tone: Tone; markers?: { a: [number, number]; b: [number, number] } }) {
  const color = tone === "blue" ? "text-blue-700" : tone === "emerald" ? "text-emerald-700" : "text-violet-700";
  return (
    <div className="rounded-3xl border border-white/70 bg-white p-4">
      <p className={`mb-3 text-xs font-black uppercase tracking-[0.16em] ${color}`}>{title}</p>
      <LabelGrid grid={grid} markers={markers} />
    </div>
  );
}

function LabelGrid({ grid, markers }: { grid: number[][]; markers?: { a: [number, number]; b: [number, number] } }) {
  const cell = 42;
  const colors = ["#2563eb", "#0f766e", "#7c3aed", "#f59e0b", "#e11d48", "#0891b2", "#65a30d", "#c2410c"];
  return (
    <svg className="w-full" viewBox={`0 0 ${grid[0].length * cell + 20} ${grid.length * cell + 20}`} role="img" aria-label="Grade de labels">
      <rect width={grid[0].length * cell + 20} height={grid.length * cell + 20} rx="18" fill="#f8fafc" />
      {grid.map((row, rowIndex) =>
        row.map((label, colIndex) => {
          const marker = markers?.a[0] === rowIndex && markers.a[1] === colIndex ? "A" : markers?.b[0] === rowIndex && markers.b[1] === colIndex ? "B" : "";
          return (
            <g key={`${rowIndex}-${colIndex}`}>
              <rect
                x={10 + colIndex * cell}
                y={10 + rowIndex * cell}
                width={cell - 3}
                height={cell - 3}
                rx="7"
                fill={label ? colors[(label - 1) % colors.length] : "#ffffff"}
                opacity={label ? 0.9 : 1}
                stroke="#cbd5e1"
                strokeWidth="1"
              />
              {label ? (
                <text x={10 + colIndex * cell + 19} y={10 + rowIndex * cell + 25} textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="900">{marker || label}</text>
              ) : null}
            </g>
          );
        }),
      )}
    </svg>
  );
}

function InteractiveShell({ eyebrow, title, description, tone, icon, children }: { eyebrow: string; title: string; description: string; tone: Tone; icon: ReactNode; children: ReactNode }) {
  const styles: Record<Tone, string> = {
    blue: "border-blue-200 bg-blue-50 text-blue-700 shadow-blue-900/5",
    emerald: "border-emerald-200 bg-emerald-50 text-emerald-700 shadow-emerald-900/5",
    violet: "border-violet-200 bg-violet-50 text-violet-700 shadow-violet-900/5",
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

function ConnectivityButtons({ value, onChange, tone }: { value: Connectivity; onChange: (value: Connectivity) => void; tone: Tone }) {
  const active = tone === "blue" ? "border-blue-600 bg-blue-600" : tone === "emerald" ? "border-emerald-600 bg-emerald-600" : "border-violet-600 bg-violet-600";
  const inactive = tone === "blue" ? "border-blue-100 hover:border-blue-300" : tone === "emerald" ? "border-emerald-100 hover:border-emerald-300" : "border-violet-100 hover:border-violet-300";
  return (
    <div className="grid grid-cols-2 gap-3">
      {[4, 8].map((item) => (
        <button key={item} type="button" onClick={() => onChange(item as Connectivity)} className={`rounded-2xl border px-4 py-3 text-sm font-black transition ${value === item ? `${active} text-white shadow-lg` : `${inactive} bg-white text-slate-700`}`}>
          Conectividade-{item}
        </button>
      ))}
    </div>
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

function Explanation({ children, tone }: { children: ReactNode; tone: Tone }) {
  const color = tone === "blue" ? "text-blue-700" : tone === "emerald" ? "text-emerald-700" : "text-violet-700";
  return (
    <div className="rounded-3xl border border-white/70 bg-white p-4">
      <p className={`text-xs font-black uppercase tracking-[0.16em] ${color}`}>Leitura</p>
      <p className="mt-2 text-sm leading-6 text-slate-600">{children}</p>
    </div>
  );
}
