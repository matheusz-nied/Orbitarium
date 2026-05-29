import { useMemo, useState, type ReactNode } from "react";
import { BarChart3, Map, Table2 } from "lucide-react";
import type { LessonModule } from "../../../types/content";

export const interactions = {
  "label-map-hover": LabelMapHover,
  "stats-table-demo": StatsTableDemo,
  "area-filter-demo": AreaFilterDemo,
} satisfies LessonModule["interactions"];

type Tone = "blue" | "amber" | "rose";

const components = [
  { id: 1, color: "#2563eb", x: 42, y: 55, rx: 32, ry: 26, area: 920, bbox: "18,29,52,45", cx: 42, cy: 55 },
  { id: 2, color: "#0f766e", x: 122, y: 38, rx: 24, ry: 20, area: 610, bbox: "101,21,43,34", cx: 122, cy: 38 },
  { id: 3, color: "#7c3aed", x: 132, y: 118, rx: 36, ry: 28, area: 1240, bbox: "96,91,72,54", cx: 132, cy: 118 },
  { id: 4, color: "#e11d48", x: 28, y: 135, rx: 8, ry: 7, area: 38, bbox: "21,129,14,12", cx: 28, cy: 135 },
];

function LabelMapHover() {
  const [selected, setSelected] = useState(1);
  const component = components.find((item) => item.id === selected) ?? components[0];
  return (
    <Shell eyebrow="Labels" title="Clique em um blob para ler seus stats" tone="blue" icon={<Map size={18} />} description="O mapa de labels permite selecionar todos os pixels de um componente pelo seu ID.">
      <div className="grid gap-5 lg:grid-cols-[1fr_0.8fr]">
        <ComponentSvg selected={selected} onSelect={setSelected} />
        <InfoCard tone="blue" title={`Blob ${component.id}`} rows={[["Área", component.area.toString()], ["BBox", component.bbox], ["Centroide", `(${component.cx}, ${component.cy})`], ["Label", component.id.toString()]]} />
      </div>
    </Shell>
  );
}

function StatsTableDemo() {
  const [selected, setSelected] = useState(1);
  return (
    <Shell eyebrow="Stats" title="Tabela sincronizada com os blobs" tone="amber" icon={<Table2 size={18} />} description="Selecione uma linha da tabela para destacar o componente correspondente no mapa.">
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl bg-white p-4">
          <table className="w-full text-left text-sm">
            <thead className="text-xs font-black uppercase tracking-[0.14em] text-amber-700"><tr><th>ID</th><th>Área</th><th>BBox</th></tr></thead>
            <tbody>
              {components.map((item) => <tr key={item.id} className={`cursor-pointer border-t border-amber-100 ${selected === item.id ? "bg-amber-50" : ""}`} onClick={() => setSelected(item.id)}><td className="py-3 font-black">{item.id}</td><td>{item.area}</td><td className="font-mono text-xs">{item.bbox}</td></tr>)}
            </tbody>
          </table>
        </div>
        <ComponentSvg selected={selected} onSelect={setSelected} />
      </div>
    </Shell>
  );
}

function AreaFilterDemo() {
  const [minArea, setMinArea] = useState(100);
  const visible = useMemo(() => components.filter((item) => item.area >= minArea), [minArea]);
  const removed = components.length - visible.length;
  return (
    <Shell eyebrow="Filtro" title="Remova ruído por área mínima" tone="rose" icon={<BarChart3 size={18} />} description="Ajuste o limite e veja quais componentes sobrevivem. O menor blob representa ruído residual.">
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="grid gap-4">
          <label className="grid gap-2 text-sm font-black text-slate-700"><span className="flex justify-between">Área mínima <span className="font-mono">{minArea}</span></span><input className="w-full accent-slate-950" type="range" min="0" max="1300" step="25" value={minArea} onChange={(event) => setMinArea(Number(event.target.value))} /></label>
          <InfoCard tone="rose" title="Resultado" rows={[["Mantidos", visible.length.toString()], ["Removidos", removed.toString()], ["Critério", `area >= ${minArea}`], ["Cuidado", "validar visualmente"]]} />
        </div>
        <ComponentSvg selected={visible[0]?.id ?? 0} onSelect={() => undefined} hiddenIds={components.filter((item) => item.area < minArea).map((item) => item.id)} />
      </div>
    </Shell>
  );
}

function ComponentSvg({ selected, onSelect, hiddenIds = [] }: { selected: number; onSelect: (id: number) => void; hiddenIds?: number[] }) {
  return (
    <div className="rounded-3xl border border-white/70 bg-white p-4">
      <svg className="w-full" viewBox="0 0 220 170" role="img" aria-label="Mapa de componentes conectados">
        <rect width="220" height="170" rx="22" fill="#f8fafc" />
        {components.map((item) => {
          const hidden = hiddenIds.includes(item.id);
          return <g key={item.id} className="cursor-pointer" onClick={() => onSelect(item.id)} opacity={hidden ? 0.15 : 1}><ellipse cx={item.x} cy={item.y} rx={item.rx} ry={item.ry} fill={item.color} opacity={selected === item.id ? 1 : 0.78} stroke={selected === item.id ? "#0f172a" : "#ffffff"} strokeWidth={selected === item.id ? 4 : 2} /><text x={item.x} y={item.y + 5} textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="900">{item.id}</text><circle cx={item.cx} cy={item.cy} r="3" fill="#ffffff" /></g>;
        })}
      </svg>
    </div>
  );
}

function Shell({ eyebrow, title, description, tone, icon, children }: { eyebrow: string; title: string; description: string; tone: Tone; icon: ReactNode; children: ReactNode }) {
  const styles = { blue: "border-blue-200 bg-blue-50 text-blue-700 shadow-blue-900/5", amber: "border-amber-200 bg-amber-50 text-amber-700 shadow-amber-900/5", rose: "border-rose-200 bg-rose-50 text-rose-700 shadow-rose-900/5" };
  return <section className={`rounded-[2rem] border p-5 shadow-xl ${styles[tone]}`}><div className="mb-5"><p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em]">{icon}{eyebrow}</p><h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-slate-950">{title}</h3><p className="mt-2 max-w-3xl leading-7 text-slate-600">{description}</p></div>{children}</section>;
}

function InfoCard({ title, rows, tone }: { title: string; rows: Array<[string, string]>; tone: Tone }) {
  const color = tone === "blue" ? "text-blue-700" : tone === "amber" ? "text-amber-700" : "text-rose-700";
  return <div className="rounded-3xl bg-white p-5"><p className={`text-xs font-black uppercase tracking-[0.16em] ${color}`}>{title}</p><div className="mt-4 grid gap-3">{rows.map(([label, value]) => <div key={label} className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3"><span className="text-sm font-bold text-slate-500">{label}</span><span className="font-mono text-sm font-black text-slate-950">{value}</span></div>)}</div></div>;
}
