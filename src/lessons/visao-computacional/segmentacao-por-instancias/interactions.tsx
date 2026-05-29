import { useMemo, useState, type ReactNode } from "react";
import { Boxes, Eye, ScanSearch, SlidersHorizontal } from "lucide-react";
import type { LessonModule } from "../../../types/content";

export const interactions = {
  "instance-picker": InstancePicker,
  "output-filter": OutputFilter,
  "mask-head-demo": MaskHeadDemo,
  "nms-simulator": NmsSimulator,
} satisfies LessonModule["interactions"];

type Tone = "emerald" | "amber" | "violet" | "rose";

function InstancePicker() {
  const [selected, setSelected] = useState(1);
  return <Shell tone="emerald" eyebrow="Instâncias" title="Selecione um indivíduo da mesma classe" icon={<Eye size={18} />} description="Todos são da classe objeto, mas cada um tem identidade e máscara próprias."><div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]"><Control label="Instância selecionada" value={selected} min={1} max={3} onChange={setSelected} /><Metric tone="emerald" rows={[["Classe", "objeto"], ["ID", selected.toString()], ["Máscara", "individual"], ["Contagem", "3"]]} /><InstanceSvg selected={selected} /></div></Shell>;
}

function OutputFilter() {
  const [threshold, setThreshold] = useState(55);
  const scores = [92, 67, 41, 28];
  const kept = scores.filter((s) => s >= threshold).length;
  return <Shell tone="amber" eyebrow="Scores" title="Filtre detecções por confiança" icon={<SlidersHorizontal size={18} />} description="Subir o limiar reduz falsos positivos, mas pode remover objetos reais."><div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]"><Control label="Score mínimo" value={threshold} min={20} max={95} onChange={setThreshold} /><Metric tone="amber" rows={[["Mantidas", kept.toString()], ["Removidas", (scores.length - kept).toString()], ["Risco alto", "FN"], ["Risco baixo", "FP"]]} /><ScoreList scores={scores} threshold={threshold} /></div></Shell>;
}

function MaskHeadDemo() {
  const [quality, setQuality] = useState(70);
  return <Shell tone="violet" eyebrow="Mask head" title="Caixa boa ajuda máscara boa" icon={<Boxes size={18} />} description="A cabeça de máscara refina uma região candidata. Propostas ruins limitam o resultado."><div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]"><Control label="Qualidade da proposta" value={quality} min={25} max={95} onChange={setQuality} /><Metric tone="violet" rows={[["Box", quality > 55 ? "alinhada" : "deslocada"], ["Máscara", quality > 70 ? "boa" : "frágil"], ["Cabeça", "mask"], ["Classe", "paralela"]]} /><MaskSvg quality={quality} /></div></Shell>;
}

function NmsSimulator() {
  const [overlap, setOverlap] = useState(68);
  const suppress = overlap > 50;
  return <Shell tone="rose" eyebrow="NMS" title="Sobreposição alta remove duplicatas" icon={<ScanSearch size={18} />} description="Quando duas caixas parecem explicar o mesmo objeto, NMS mantém a mais confiante."><div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]"><Control label="Sobreposição IoU" value={overlap} min={10} max={90} onChange={setOverlap} /><Metric tone="rose" rows={[["IoU", (overlap / 100).toFixed(2)], ["Ação", suppress ? "suprimir" : "manter"], ["Motivo", "duplicata"], ["Vence", "score maior"]]} /><NmsSvg overlap={overlap} /></div></Shell>;
}

function InstanceSvg({ selected }: { selected: number }) { const fills = ["#38bdf8", "#22c55e", "#f59e0b"]; return <Svg label="Instâncias">{[1, 2, 3].map((id, i) => <g key={id}><circle cx={75 + i * 65} cy="95" r={id === selected ? 35 : 28} fill={fills[i]} opacity={id === selected ? 0.95 : 0.35} /><text x={75 + i * 65} y="102" textAnchor="middle" fill="#0f172a" fontSize="18" fontWeight="900">{id}</text></g>)}</Svg>; }
function ScoreList({ scores, threshold }: { scores: number[]; threshold: number }) { return <div className="grid gap-3 rounded-3xl bg-white p-4">{scores.map((score, i) => <div key={score} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3"><span className="font-black text-slate-700">obj {i + 1}</span><span className={score >= threshold ? "font-black text-emerald-600" : "font-black text-rose-600"}>{score}%</span></div>)}</div>; }
function MaskSvg({ quality }: { quality: number }) { const shift = (75 - quality) * 0.35; return <Svg label="Cabeça de máscara"><rect x={70 + shift} y={48 + shift} width="130" height="105" rx="16" fill="none" stroke="#7c3aed" strokeWidth="5" /><path d="M105 70 C160 40 205 84 184 125 C154 166 86 140 105 70Z" fill="#0f172a" opacity="0.9" /><path d="M113 78 C155 54 190 86 174 119 C150 148 98 129 113 78Z" fill="#a78bfa" opacity={quality / 100} /></Svg>; }
function NmsSvg({ overlap }: { overlap: number }) { const dx = 78 - overlap * 0.55; return <Svg label="NMS"><rect x="78" y="55" width="105" height="82" rx="14" fill="none" stroke="#e11d48" strokeWidth="5" /><rect x={78 + dx} y="66" width="105" height="82" rx="14" fill="none" stroke="#f59e0b" strokeWidth="5" strokeDasharray="8 6" /></Svg>; }
function Svg({ label, children }: { label: string; children: ReactNode }) { return <div className="rounded-3xl bg-white p-4"><svg className="w-full" viewBox="0 0 280 190" role="img" aria-label={label}><rect width="280" height="190" rx="22" fill="#f8fafc" />{children}</svg></div>; }

function Shell({ tone, eyebrow, title, description, icon, children }: { tone: Tone; eyebrow: string; title: string; description: string; icon: ReactNode; children: ReactNode }) { const styles = { emerald: "border-emerald-200 bg-emerald-50 text-emerald-700 shadow-emerald-900/5", amber: "border-amber-200 bg-amber-50 text-amber-700 shadow-amber-900/5", violet: "border-violet-200 bg-violet-50 text-violet-700 shadow-violet-900/5", rose: "border-rose-200 bg-rose-50 text-rose-700 shadow-rose-900/5" }; return <section className={`rounded-[2rem] border p-5 shadow-xl ${styles[tone]}`}><div className="mb-5"><p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em]">{icon}{eyebrow}</p><h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-slate-950">{title}</h3><p className="mt-2 max-w-3xl leading-7 text-slate-600">{description}</p></div>{children}</section>; }
function Control({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (value: number) => void }) { return <label className="grid gap-2 text-sm font-black text-slate-700"><span className="flex justify-between">{label}<span className="font-mono">{value}</span></span><input className="w-full accent-slate-950" type="range" min={min} max={max} value={value} onChange={(e) => onChange(Number(e.target.value))} /></label>; }
function Metric({ rows, tone }: { rows: Array<[string, string]>; tone: Tone }) { const color = tone === "emerald" ? "text-emerald-700" : tone === "amber" ? "text-amber-700" : tone === "violet" ? "text-violet-700" : "text-rose-700"; return <div className="grid gap-3 sm:grid-cols-2">{rows.map(([k, v]) => <div key={k} className="rounded-2xl bg-white px-4 py-3"><p className={`text-xs font-black uppercase tracking-[0.16em] ${color}`}>{k}</p><p className="mt-1 font-display text-xl font-semibold text-slate-950">{v}</p></div>)}</div>; }
