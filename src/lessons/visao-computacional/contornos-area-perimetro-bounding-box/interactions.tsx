import { useState, type ReactNode } from "react";
import { BoxSelect, Eye, Ruler } from "lucide-react";
import type { LessonModule } from "../../../types/content";

export const interactions = {
  "contorno-toggle": ContornoToggle,
  "area-perimeter-comparison": AreaPerimeterComparison,
  "bbox-inspector": BboxInspector,
} satisfies LessonModule["interactions"];

type Tone = "violet" | "emerald" | "blue";

function ContornoToggle() {
  const [showContour, setShowContour] = useState(true);
  const [showPoints, setShowPoints] = useState(false);
  return <Shell tone="violet" eyebrow="Contorno" title="Ative borda e pontos do contorno" icon={<Eye size={18} />} description="Veja a diferença entre região preenchida, linha de contorno e pontos armazenados pelo OpenCV."><Controls items={[["Contorno", showContour, setShowContour], ["Pontos", showPoints, setShowPoints]]} tone="violet" /><ShapeSvg contour={showContour} points={showPoints} bbox={false} /></Shell>;
}

function AreaPerimeterComparison() {
  const [irregularity, setIrregularity] = useState(50);
  const area = 980;
  const perimeter = Math.round(124 + irregularity * 1.9);
  return <Shell tone="emerald" eyebrow="Medidas" title="Área parecida, perímetro muda" icon={<Ruler size={18} />} description="Aumente a irregularidade da borda: a área simulada permanece parecida, mas o perímetro cresce."><div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]"><div className="grid gap-4"><label className="grid gap-2 text-sm font-black text-slate-700"><span className="flex justify-between">Irregularidade <span>{irregularity}%</span></span><input className="w-full accent-slate-950" type="range" min="0" max="100" value={irregularity} onChange={(e) => setIrregularity(Number(e.target.value))} /></label><Metric rows={[["Área", `${area} px²`], ["Perímetro", `${perimeter} px`], ["Leitura", irregularity > 60 ? "borda complexa" : "forma compacta"]]} tone="emerald" /></div><ShapeSvg contour points={irregularity > 60} bbox={false} jagged={irregularity} /></div></Shell>;
}

function BboxInspector() {
  const [padding, setPadding] = useState(0);
  const x = 78 - padding;
  const y = 34 - padding;
  const w = 128 + padding * 2;
  const h = 104 + padding * 2;
  return <Shell tone="blue" eyebrow="Bounding box" title="Inspecione x, y, w, h" icon={<BoxSelect size={18} />} description="A bounding box é alinhada aos eixos e resume posição e tamanho do objeto."><div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]"><div className="grid gap-4"><label className="grid gap-2 text-sm font-black text-slate-700"><span className="flex justify-between">Margem visual <span>{padding}px</span></span><input className="w-full accent-slate-950" type="range" min="0" max="24" value={padding} onChange={(e) => setPadding(Number(e.target.value))} /></label><Metric rows={[["x", x.toString()], ["y", y.toString()], ["w", w.toString()], ["h", h.toString()]]} tone="blue" /></div><ShapeSvg contour bbox bboxRect={{ x, y, w, h }} /></div></Shell>;
}

function ShapeSvg({ contour, points = false, bbox = false, jagged = 0, bboxRect = { x: 78, y: 34, w: 128, h: 104 } }: { contour: boolean; points?: boolean; bbox?: boolean; jagged?: number; bboxRect?: { x: number; y: number; w: number; h: number } }) {
  const d = jagged > 55 ? "M68 92 L78 42 L108 62 L136 28 L156 68 L194 62 L178 98 L206 126 L158 120 L132 150 L116 116 L76 132Z" : "M70 90 C75 42 118 28 160 50 C202 72 202 124 160 148 C116 172 72 140 70 90Z";
  return <div className="rounded-3xl bg-white p-4"><svg className="w-full" viewBox="0 0 280 190" role="img" aria-label="Objeto com contorno"><rect width="280" height="190" rx="22" fill="#f8fafc" /><path d={d} fill="#0f172a" opacity="0.92" />{contour ? <path d={d} fill="none" stroke="#f97316" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" /> : null}{points ? [0,1,2,3,4,5,6,7].map((i) => <circle key={i} cx={78 + (i % 4) * 36} cy={48 + Math.floor(i / 4) * 78} r="5" fill="#e11d48" />) : null}{bbox ? <rect x={bboxRect.x} y={bboxRect.y} width={bboxRect.w} height={bboxRect.h} rx="6" fill="none" stroke="#2563eb" strokeWidth="4" strokeDasharray="7 5" /> : null}</svg></div>;
}

function Shell({ tone, eyebrow, title, description, icon, children }: { tone: Tone; eyebrow: string; title: string; description: string; icon: ReactNode; children: ReactNode }) { const styles = { violet: "border-violet-200 bg-violet-50 text-violet-700 shadow-violet-900/5", emerald: "border-emerald-200 bg-emerald-50 text-emerald-700 shadow-emerald-900/5", blue: "border-blue-200 bg-blue-50 text-blue-700 shadow-blue-900/5" }; return <section className={`rounded-[2rem] border p-5 shadow-xl ${styles[tone]}`}><div className="mb-5"><p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em]">{icon}{eyebrow}</p><h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-slate-950">{title}</h3><p className="mt-2 max-w-3xl leading-7 text-slate-600">{description}</p></div>{children}</section>; }
function Controls({ items, tone }: { items: Array<[string, boolean, (value: boolean) => void]>; tone: Tone }) { const active = tone === "violet" ? "border-violet-600 bg-violet-600" : "border-blue-600 bg-blue-600"; return <div className="mb-4 grid gap-3 sm:grid-cols-2">{items.map(([label, value, set]) => <button key={label} type="button" onClick={() => set(!value)} className={`rounded-2xl border px-4 py-3 text-sm font-black ${value ? `${active} text-white` : "border-slate-200 bg-white text-slate-700"}`}>{label}</button>)}</div>; }
function Metric({ rows, tone }: { rows: Array<[string, string]>; tone: Tone }) { const color = tone === "emerald" ? "text-emerald-700" : tone === "blue" ? "text-blue-700" : "text-violet-700"; return <div className="grid gap-3 sm:grid-cols-2">{rows.map(([k, v]) => <div key={k} className="rounded-2xl bg-white px-4 py-3"><p className={`text-xs font-black uppercase tracking-[0.16em] ${color}`}>{k}</p><p className="mt-1 font-display text-xl font-semibold text-slate-950">{v}</p></div>)}</div>; }
