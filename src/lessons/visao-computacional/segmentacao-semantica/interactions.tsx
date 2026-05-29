import { useMemo, useState, type ReactNode } from "react";
import { Layers, MousePointer2, Network, Target } from "lucide-react";
import type { LessonModule } from "../../../types/content";

export const interactions = {
  "pixel-labeler": PixelLabeler,
  "confidence-map": ConfidenceMap,
  "architecture-toggle": ArchitectureToggle,
  "iou-simulator": IouSimulator,
} satisfies LessonModule["interactions"];

type Tone = "emerald" | "amber" | "violet" | "blue";
type SemanticLabel = 0 | 1 | 2;
const labels = ["céu", "estrada", "objeto"] as const;
const colors = ["#38bdf8", "#64748b", "#f59e0b"] as const;

function PixelLabeler() {
  const [active, setActive] = useState<SemanticLabel>(1);
  const [grid, setGrid] = useState<SemanticLabel[]>(() => Array.from({ length: 36 }, (_, i) => i < 12 ? 0 : i > 25 ? 1 : 2));
  return <Shell tone="emerald" eyebrow="Pixel" title="Pinte uma máscara semântica" icon={<MousePointer2 size={18} />} description="Cada clique muda a classe de um pixel. A máscara final é um mapa de rótulos."><div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]"><div className="grid gap-3">{labels.map((label, i) => <button key={label} type="button" onClick={() => setActive(i as SemanticLabel)} className={`rounded-2xl px-4 py-3 text-left text-sm font-black ${active === i ? "bg-slate-950 text-white" : "bg-white text-slate-700"}`}>{label}</button>)}</div><Metric tone="emerald" rows={[["Classe ativa", labels[active]], ["Pixels", grid.length.toString()], ["Saída", "máscara"], ["Semântica", "sem IDs"]]} /><div className="grid grid-cols-6 gap-2 rounded-3xl bg-white p-4">{grid.map((cell, i) => <button key={i} type="button" aria-label={`pixel ${i}`} onClick={() => setGrid((prev) => prev.map((v, idx) => idx === i ? active : v))} className="aspect-square rounded-xl" style={{ backgroundColor: colors[cell] }} />)}</div></div></Shell>;
}

function ConfidenceMap() {
  const [road, setRoad] = useState(62);
  const sky = Math.max(5, 100 - road - 18);
  const object = 100 - road - sky;
  const winner = road >= sky && road >= object ? "estrada" : sky >= object ? "céu" : "objeto";
  return <Shell tone="amber" eyebrow="Softmax" title="Um pixel, várias probabilidades" icon={<Layers size={18} />} description="Argmax escolhe a maior probabilidade, mas a confiança revela ambiguidade."><div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]"><Control label="Probabilidade de estrada" value={road} min={10} max={90} onChange={setRoad} /><Metric tone="amber" rows={[["Vencedor", winner], ["céu", `${sky}%`], ["estrada", `${road}%`], ["objeto", `${object}%`]]} /><Bars values={[sky, road, object]} /></div></Shell>;
}

function ArchitectureToggle() {
  const [skips, setSkips] = useState(true);
  const [depth, setDepth] = useState(3);
  return <Shell tone="violet" eyebrow="Arquitetura" title="Contexto profundo + detalhe local" icon={<Network size={18} />} description="Aumentar profundidade amplia contexto; skips ajudam a recuperar bordas."><div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]"><div className="grid gap-4"><Control label="Profundidade" value={depth} min={1} max={5} onChange={setDepth} /><label className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-700"><input type="checkbox" checked={skips} onChange={(e) => setSkips(e.target.checked)} /> Usar skip connections</label></div><Metric tone="violet" rows={[["Contexto", depth > 3 ? "alto" : "moderado"], ["Bordas", skips ? "melhores" : "borradas"], ["Modelo", "encoder-decoder"], ["Saída", "densa"]]} /><ArchitectureSvg skips={skips} depth={depth} /></div></Shell>;
}

function IouSimulator() {
  const [shift, setShift] = useState(18);
  const intersection = useMemo(() => Math.max(22, 80 - Math.abs(shift - 18) * 1.4), [shift]);
  const union = 120;
  const iou = intersection / union;
  return <Shell tone="blue" eyebrow="IoU" title="Desloque a previsão e veja a sobreposição cair" icon={<Target size={18} />} description="Máscaras parecidas visualmente podem ter IoU bem diferente quando a borda desloca."><div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]"><Control label="Deslocamento da previsão" value={shift} min={0} max={45} onChange={setShift} /><Metric tone="blue" rows={[["Interseção", Math.round(intersection).toString()], ["União", union.toString()], ["IoU", iou.toFixed(2)], ["Erro", shift > 28 ? "borda" : "baixo"]]} /><IouSvg shift={shift} /></div></Shell>;
}

function Bars({ values }: { values: number[] }) { return <div className="rounded-3xl bg-white p-4"><div className="grid gap-3">{values.map((v, i) => <div key={labels[i]}><div className="mb-1 flex justify-between text-sm font-black text-slate-700"><span>{labels[i]}</span><span>{v}%</span></div><div className="h-5 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full" style={{ width: `${v}%`, backgroundColor: colors[i] }} /></div></div>)}</div></div>; }
function ArchitectureSvg({ skips, depth }: { skips: boolean; depth: number }) { return <Svg label="Arquitetura encoder decoder">{Array.from({ length: depth + 2 }, (_, i) => <rect key={i} x={38 + i * 38} y={62 + Math.abs(i - depth / 2) * 14} width="30" height={70 - Math.abs(i - depth / 2) * 8} rx="8" fill={i <= depth / 2 ? "#7c3aed" : "#a78bfa"} />)}{skips ? <><path d="M55 55 C95 20 165 20 205 55" fill="none" stroke="#0f172a" strokeWidth="4" /><path d="M93 47 C122 30 150 30 178 47" fill="none" stroke="#0f172a" strokeWidth="4" /></> : null}</Svg>; }
function IouSvg({ shift }: { shift: number }) { return <Svg label="Simulador de IoU"><circle cx="125" cy="95" r="52" fill="#38bdf8" opacity="0.55" /><circle cx={125 + shift} cy="95" r="52" fill="#22c55e" opacity="0.55" /><text x="140" y="170" textAnchor="middle" fill="#2563eb" fontSize="13" fontWeight="900">referência + previsão</text></Svg>; }
function Svg({ label, children }: { label: string; children: ReactNode }) { return <div className="rounded-3xl bg-white p-4"><svg className="w-full" viewBox="0 0 280 190" role="img" aria-label={label}><rect width="280" height="190" rx="22" fill="#f8fafc" />{children}</svg></div>; }

function Shell({ tone, eyebrow, title, description, icon, children }: { tone: Tone; eyebrow: string; title: string; description: string; icon: ReactNode; children: ReactNode }) { const styles = { emerald: "border-emerald-200 bg-emerald-50 text-emerald-700 shadow-emerald-900/5", amber: "border-amber-200 bg-amber-50 text-amber-700 shadow-amber-900/5", violet: "border-violet-200 bg-violet-50 text-violet-700 shadow-violet-900/5", blue: "border-blue-200 bg-blue-50 text-blue-700 shadow-blue-900/5" }; return <section className={`rounded-[2rem] border p-5 shadow-xl ${styles[tone]}`}><div className="mb-5"><p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em]">{icon}{eyebrow}</p><h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-slate-950">{title}</h3><p className="mt-2 max-w-3xl leading-7 text-slate-600">{description}</p></div>{children}</section>; }
function Control({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (value: number) => void }) { return <label className="grid gap-2 text-sm font-black text-slate-700"><span className="flex justify-between">{label}<span className="font-mono">{value}</span></span><input className="w-full accent-slate-950" type="range" min={min} max={max} value={value} onChange={(e) => onChange(Number(e.target.value))} /></label>; }
function Metric({ rows, tone }: { rows: Array<[string, string]>; tone: Tone }) { const color = tone === "emerald" ? "text-emerald-700" : tone === "amber" ? "text-amber-700" : tone === "violet" ? "text-violet-700" : "text-blue-700"; return <div className="grid gap-3 sm:grid-cols-2">{rows.map(([k, v]) => <div key={k} className="rounded-2xl bg-white px-4 py-3"><p className={`text-xs font-black uppercase tracking-[0.16em] ${color}`}>{k}</p><p className="mt-1 font-display text-xl font-semibold text-slate-950">{v}</p></div>)}</div>; }
