import { useMemo, useState, type ReactNode } from "react";
import { Filter, GitBranch, SlidersHorizontal, Table2 } from "lucide-react";
import type { LessonModule } from "../../../types/content";

export const interactions = {
  "threshold-rule-builder": ThresholdRuleBuilder,
  "logic-composer": LogicComposer,
  "calibration-slider": CalibrationSlider,
  "error-gallery": ErrorGallery,
} satisfies LessonModule["interactions"];

type Tone = "blue" | "amber" | "emerald" | "rose";
const samples = [
  { id: 1, area: 420, circularity: 0.91, solidity: 0.96, label: "disco" },
  { id: 2, area: 52, circularity: 0.46, solidity: 0.74, label: "ruído" },
  { id: 3, area: 310, circularity: 0.39, solidity: 0.91, label: "risco" },
  { id: 4, area: 260, circularity: 0.72, solidity: 0.63, label: "quebrado" },
];

function ThresholdRuleBuilder() {
  const [minArea, setMinArea] = useState(180);
  const [minCircularity, setMinCircularity] = useState(70);
  const accepted = samples.filter((s) => s.area >= minArea && s.circularity >= minCircularity / 100);
  return <Shell tone="blue" eyebrow="Construtor" title="Monte uma regra de aceitação" icon={<Filter size={18} />} description="A regra aceita objetos grandes o suficiente e com circularidade mínima."><div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]"><div className="grid gap-4"><Control label="Área mínima" value={minArea} min={20} max={450} onChange={setMinArea} /><Control label="Circularidade mínima" value={minCircularity} min={20} max={98} onChange={setMinCircularity} /></div><Metric tone="blue" rows={[["Regra", "area AND circ"], ["Aceitos", accepted.length.toString()], ["Rejeitados", (samples.length - accepted.length).toString()], ["Classe alvo", "disco"]]} /><ObjectTable minArea={minArea} minCircularity={minCircularity / 100} /></div></Shell>;
}

function LogicComposer() {
  const [useOr, setUseOr] = useState(false);
  const [solid, setSolid] = useState(80);
  const matched = samples.filter((s) => useOr ? s.circularity > 0.75 || s.solidity > solid / 100 : s.circularity > 0.75 && s.solidity > solid / 100);
  return <Shell tone="amber" eyebrow="Lógica" title="AND é restritivo, OR é permissivo" icon={<GitBranch size={18} />} description="Troque o operador para ver como a mesma tabela gera decisões diferentes."><div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]"><div className="grid gap-4"><Control label="Solidez mínima" value={solid} min={45} max={98} onChange={setSolid} /><label className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-700"><input type="checkbox" checked={useOr} onChange={(e) => setUseOr(e.target.checked)} /> Usar OR em vez de AND</label></div><Metric tone="amber" rows={[["Operador", useOr ? "OR" : "AND"], ["Objetos passam", matched.length.toString()], ["Risco", useOr ? "falso positivo" : "falso negativo"], ["Prioridade", "explícita"]]} /><DecisionSvg permissive={useOr} /></div></Shell>;
}

function CalibrationSlider() {
  const [cut, setCut] = useState(70);
  const errors = useMemo(() => Math.abs(cut - 74) + 8, [cut]);
  return <Shell tone="emerald" eyebrow="Calibração" title="Arraste o corte e observe o tradeoff" icon={<SlidersHorizontal size={18} />} description="Cortes baixos aceitam demais; cortes altos rejeitam exemplos válidos."><div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]"><Control label="Corte de circularidade" value={cut} min={30} max={95} onChange={setCut} /><Metric tone="emerald" rows={[["Corte", (cut / 100).toFixed(2)], ["Erros estimados", errors.toString()], ["Baixo corte", "FP"], ["Alto corte", "FN"]]} /><AxisSvg cut={cut} /></div></Shell>;
}

function ErrorGallery() {
  const [mode, setMode] = useState(0);
  const modes = ["TP", "FP", "FN", "Indefinido"];
  return <Shell tone="rose" eyebrow="Validação" title="Inspecione uma galeria de casos" icon={<Table2 size={18} />} description="Ajuste regras olhando exemplos de erro, não apenas contagens."><div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]"><Control label="Tipo de caso" value={mode} min={0} max={3} onChange={setMode} /><Metric tone="rose" rows={[["Caso", modes[mode]], ["Ação", mode === 0 ? "manter" : "revisar"], ["Pergunta", "por quê?"], ["Evidência", "imagem"]]} /><GallerySvg mode={mode} /></div></Shell>;
}

function ObjectTable({ minArea, minCircularity }: { minArea: number; minCircularity: number }) { return <div className="overflow-hidden rounded-3xl bg-white"><table className="w-full text-left text-sm"><thead className="bg-slate-950 text-white"><tr><th className="px-3 py-2">id</th><th>area</th><th>circ</th><th>decisão</th></tr></thead><tbody>{samples.map((s) => { const ok = s.area >= minArea && s.circularity >= minCircularity; return <tr key={s.id} className="border-t border-slate-100"><td className="px-3 py-2 font-black">{s.id}</td><td>{s.area}</td><td>{s.circularity.toFixed(2)}</td><td className={ok ? "font-black text-emerald-600" : "font-black text-rose-600"}>{ok ? "aceita" : "rejeita"}</td></tr>; })}</tbody></table></div>; }
function DecisionSvg({ permissive }: { permissive: boolean }) { return <Svg label="Árvore lógica"><path d="M140 35 L85 92 L195 92 Z" fill="#0f172a" /><text x="140" y="75" textAnchor="middle" fill="#fff" fontSize="15" fontWeight="900">{permissive ? "OR" : "AND"}</text><line x1="105" y1="92" x2="70" y2="145" stroke="#f59e0b" strokeWidth="5" /><line x1="175" y1="92" x2="210" y2="145" stroke="#f59e0b" strokeWidth="5" /><circle cx="70" cy="150" r="24" fill={permissive ? "#22c55e" : "#ef4444"} /><circle cx="210" cy="150" r="24" fill="#22c55e" /></Svg>; }
function AxisSvg({ cut }: { cut: number }) { const x = 55 + cut * 1.7; return <Svg label="Corte de calibração"><line x1="45" y1="105" x2="235" y2="105" stroke="#334155" strokeWidth="5" strokeLinecap="round" />{[65, 92, 122, 154, 182, 214].map((p, i) => <circle key={p} cx={p} cy={i < 3 ? 86 : 124} r="9" fill={p < x ? "#ef4444" : "#22c55e"} />)}<line x1={x} y1="70" x2={x} y2="145" stroke="#0f766e" strokeWidth="5" /></Svg>; }
function GallerySvg({ mode }: { mode: number }) { const colors = ["#22c55e", "#f59e0b", "#ef4444", "#64748b"]; return <Svg label="Galeria de validação">{[0, 1, 2, 3].map((i) => <g key={i}><rect x={45 + (i % 2) * 105} y={38 + Math.floor(i / 2) * 72} width="82" height="54" rx="14" fill={i === mode ? colors[mode] : "#e2e8f0"} /><circle cx={86 + (i % 2) * 105} cy={65 + Math.floor(i / 2) * 72} r={i % 2 ? 13 : 20} fill="#0f172a" /></g>)}</Svg>; }
function Svg({ label, children }: { label: string; children: ReactNode }) { return <div className="rounded-3xl bg-white p-4"><svg className="w-full" viewBox="0 0 280 190" role="img" aria-label={label}><rect width="280" height="190" rx="22" fill="#f8fafc" />{children}</svg></div>; }

function Shell({ tone, eyebrow, title, description, icon, children }: { tone: Tone; eyebrow: string; title: string; description: string; icon: ReactNode; children: ReactNode }) { const styles = { blue: "border-blue-200 bg-blue-50 text-blue-700 shadow-blue-900/5", amber: "border-amber-200 bg-amber-50 text-amber-700 shadow-amber-900/5", emerald: "border-emerald-200 bg-emerald-50 text-emerald-700 shadow-emerald-900/5", rose: "border-rose-200 bg-rose-50 text-rose-700 shadow-rose-900/5" }; return <section className={`rounded-[2rem] border p-5 shadow-xl ${styles[tone]}`}><div className="mb-5"><p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em]">{icon}{eyebrow}</p><h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-slate-950">{title}</h3><p className="mt-2 max-w-3xl leading-7 text-slate-600">{description}</p></div>{children}</section>; }
function Control({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (value: number) => void }) { return <label className="grid gap-2 text-sm font-black text-slate-700"><span className="flex justify-between">{label}<span className="font-mono">{value}</span></span><input className="w-full accent-slate-950" type="range" min={min} max={max} value={value} onChange={(e) => onChange(Number(e.target.value))} /></label>; }
function Metric({ rows, tone }: { rows: Array<[string, string]>; tone: Tone }) { const color = tone === "blue" ? "text-blue-700" : tone === "amber" ? "text-amber-700" : tone === "emerald" ? "text-emerald-700" : "text-rose-700"; return <div className="grid gap-3 sm:grid-cols-2">{rows.map(([k, v]) => <div key={k} className="rounded-2xl bg-white px-4 py-3"><p className={`text-xs font-black uppercase tracking-[0.16em] ${color}`}>{k}</p><p className="mt-1 font-display text-xl font-semibold text-slate-950">{v}</p></div>)}</div>; }
