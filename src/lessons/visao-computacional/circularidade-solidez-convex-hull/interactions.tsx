import { useMemo, useState, type ReactNode } from "react";
import { CircleDot, Layers3, Triangle } from "lucide-react";
import type { LessonModule } from "../../../types/content";

export const interactions = {
  "circularity-lab": CircularityLab,
  "hull-builder": HullBuilder,
  "solidity-comparison": SolidityComparison,
  "defect-depth-demo": DefectDepthDemo,
} satisfies LessonModule["interactions"];

type Tone = "blue" | "violet" | "emerald" | "rose";

function CircularityLab() {
  const [roughness, setRoughness] = useState(18);
  const [elongation, setElongation] = useState(24);
  const circularity = useMemo(() => Math.max(0.18, 1 - roughness / 135 - elongation / 170), [roughness, elongation]);
  return <Shell tone="blue" eyebrow="Circularidade" title="Perímetro irregular derruba redondeza" icon={<CircleDot size={18} />} description="Aumente rugosidade ou alongamento e observe a circularidade cair."><div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]"><div className="grid gap-4"><Control label="Rugosidade da borda" value={roughness} min={0} max={90} onChange={setRoughness} /><Control label="Alongamento" value={elongation} min={0} max={80} onChange={setElongation} /></div><Metric tone="blue" rows={[["Circularidade", circularity.toFixed(2)], ["Leitura", circularity > 0.78 ? "quase redondo" : circularity > 0.52 ? "moderado" : "irregular"], ["Fórmula", "4πA/P²"], ["Sensível a", "perímetro"]]} /><BlobSvg roughness={roughness} elongation={elongation} /></div></Shell>;
}

function HullBuilder() {
  const [showHull, setShowHull] = useState(true);
  const [concavity, setConcavity] = useState(52);
  return <Shell tone="violet" eyebrow="Convex hull" title="Estique um elástico em volta da forma" icon={<Triangle size={18} />} description="O hull preserva os pontos extremos e passa por fora das entradas."><div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]"><div className="grid gap-4"><Control label="Profundidade da concavidade" value={concavity} min={0} max={90} onChange={setConcavity} /><label className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-700"><input type="checkbox" checked={showHull} onChange={(e) => setShowHull(e.target.checked)} /> Mostrar hull</label></div><Metric tone="violet" rows={[["Hull", showHull ? "visível" : "oculto"], ["Concavidade", `${concavity}%`], ["Ideia", "elástico"], ["Função", "convexHull"]]} /><HullSvg concavity={concavity} showHull={showHull} /></div></Shell>;
}

function SolidityComparison() {
  const [bite, setBite] = useState(35);
  const solidity = useMemo(() => Math.max(0.35, 1 - bite / 135), [bite]);
  return <Shell tone="emerald" eyebrow="Solidez" title="Compare área real com área convexa" icon={<Layers3 size={18} />} description="Quanto mais profunda a mordida, maior a área vazia entre objeto e hull."><div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]"><Control label="Mordida interna" value={bite} min={0} max={85} onChange={setBite} /><Metric tone="emerald" rows={[["Solidez", solidity.toFixed(2)], ["Área real", `${Math.round(solidity * 100)}%`], ["Área hull", "100%"], ["Leitura", solidity > 0.82 ? "compacto" : "recortado"]]} /><HullSvg concavity={bite} showHull /></div></Shell>;
}

function DefectDepthDemo() {
  const [depth, setDepth] = useState(48);
  return <Shell tone="rose" eyebrow="Defeitos convexos" title="Profundidade separa ruído de concavidade" icon={<Triangle size={18} />} description="Pequenas entradas podem ser ruído; entradas profundas podem carregar significado geométrico."><div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]"><Control label="Profundidade do defeito" value={depth} min={5} max={90} onChange={setDepth} /><Metric tone="rose" rows={[["Profundidade", `${depth}%`], ["Classificação", depth > 45 ? "defeito relevante" : "leve"], ["Entre", "contorno e hull"], ["Cuidado", "ruído"]]} /><DefectSvg depth={depth} /></div></Shell>;
}

function BlobSvg({ roughness, elongation }: { roughness: number; elongation: number }) { const rx = 58 + elongation * 0.45; const ry = 68 - elongation * 0.18; const wobble = roughness * 0.28; const points = Array.from({ length: 18 }, (_, i) => { const a = (Math.PI * 2 * i) / 18; const r = 1 + Math.sin(i * 2.4) * wobble / 100; return `${140 + Math.cos(a) * rx * r},${95 + Math.sin(a) * ry * r}`; }).join(" "); return <Svg label="Forma com circularidade"><polygon points={points} fill="#0f172a" /><ellipse cx="140" cy="95" rx="74" ry="74" fill="none" stroke="#2563eb" strokeWidth="4" strokeDasharray="8 6" /></Svg>; }
function HullSvg({ concavity, showHull }: { concavity: number; showHull: boolean }) { const notch = 128 + concavity * 0.62; const points = `62,54 215,52 ${notch},96 220,140 82,146 118,98`; return <Svg label="Convex hull"><path d="M62 54 L215 52 L220 140 L82 146 Z" fill={showHull ? "#ede9fe" : "transparent"} stroke={showHull ? "#7c3aed" : "transparent"} strokeWidth="4" strokeDasharray="8 6" /><polygon points={points} fill="#0f172a" /><circle cx={notch} cy="96" r="7" fill="#fff" stroke="#7c3aed" strokeWidth="4" /></Svg>; }
function DefectSvg({ depth }: { depth: number }) { const notch = 94 + depth * 0.8; return <Svg label="Defeito convexo"><path d="M62 54 L215 52 L220 140 L82 146 Z" fill="#fff1f2" stroke="#e11d48" strokeWidth="4" strokeDasharray="8 6" /><polygon points={`62,54 215,52 ${notch},100 220,140 82,146 114,96`} fill="#0f172a" /><line x1="215" y1="52" x2={notch} y2="100" stroke="#e11d48" strokeWidth="5" strokeLinecap="round" /><circle cx={notch} cy="100" r="8" fill="#fff" stroke="#e11d48" strokeWidth="4" /></Svg>; }
function Svg({ label, children }: { label: string; children: ReactNode }) { return <div className="rounded-3xl bg-white p-4"><svg className="w-full" viewBox="0 0 280 190" role="img" aria-label={label}><rect width="280" height="190" rx="22" fill="#f8fafc" />{children}</svg></div>; }

function Shell({ tone, eyebrow, title, description, icon, children }: { tone: Tone; eyebrow: string; title: string; description: string; icon: ReactNode; children: ReactNode }) { const styles = { blue: "border-blue-200 bg-blue-50 text-blue-700 shadow-blue-900/5", violet: "border-violet-200 bg-violet-50 text-violet-700 shadow-violet-900/5", emerald: "border-emerald-200 bg-emerald-50 text-emerald-700 shadow-emerald-900/5", rose: "border-rose-200 bg-rose-50 text-rose-700 shadow-rose-900/5" }; return <section className={`rounded-[2rem] border p-5 shadow-xl ${styles[tone]}`}><div className="mb-5"><p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em]">{icon}{eyebrow}</p><h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-slate-950">{title}</h3><p className="mt-2 max-w-3xl leading-7 text-slate-600">{description}</p></div>{children}</section>; }
function Control({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (value: number) => void }) { return <label className="grid gap-2 text-sm font-black text-slate-700"><span className="flex justify-between">{label}<span className="font-mono">{value}</span></span><input className="w-full accent-slate-950" type="range" min={min} max={max} value={value} onChange={(e) => onChange(Number(e.target.value))} /></label>; }
function Metric({ rows, tone }: { rows: Array<[string, string]>; tone: Tone }) { const color = tone === "blue" ? "text-blue-700" : tone === "violet" ? "text-violet-700" : tone === "emerald" ? "text-emerald-700" : "text-rose-700"; return <div className="grid gap-3 sm:grid-cols-2">{rows.map(([k, v]) => <div key={k} className="rounded-2xl bg-white px-4 py-3"><p className={`text-xs font-black uppercase tracking-[0.16em] ${color}`}>{k}</p><p className="mt-1 font-display text-xl font-semibold text-slate-950">{v}</p></div>)}</div>; }
