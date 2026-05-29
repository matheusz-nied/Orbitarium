import { useMemo, useState, type ReactNode } from "react";
import { Crosshair, MoveHorizontal, RotateCw } from "lucide-react";
import type { LessonModule } from "../../../types/content";

export const interactions = {
  "centroide-playground": CentroidePlayground,
  "bbox-centroid-comparison": BboxCentroidComparison,
  "orientation-slider": OrientationSlider,
} satisfies LessonModule["interactions"];

type Tone = "violet" | "amber" | "rose";

function CentroidePlayground() {
  const [bias, setBias] = useState(20);
  const cx = useMemo(() => Math.round(120 + bias * 0.55), [bias]);
  const cy = 92;
  return <Shell tone="violet" eyebrow="Centroide" title="Desloque massa e veja o centroide mover" icon={<Crosshair size={18} />} description="O centroide segue a distribuição dos pixels, não apenas o retângulo externo."><div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]"><Control label="Massa para a direita" value={bias} min={-60} max={60} onChange={setBias} /><Metric tone="violet" rows={[["cx", cx.toString()], ["cy", cy.toString()], ["M00", "área"], ["Fórmula", "M10/M00"]]} /><MomentSvg cx={cx} cy={cy} skew={bias} /></div></Shell>;
}

function BboxCentroidComparison() {
  const [asymmetry, setAsymmetry] = useState(60);
  const centroidX = Math.round(128 - asymmetry * 0.35);
  return <Shell tone="amber" eyebrow="Comparação" title="Centroide vs centro da bounding box" icon={<MoveHorizontal size={18} />} description="A caixa permanece parecida, mas o centroide muda quando a massa da forma se concentra em um lado."><div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]"><Control label="Assimetria" value={asymmetry} min={0} max={100} onChange={setAsymmetry} /><Metric tone="amber" rows={[["Centro bbox", "140, 95"], ["Centroide", `${centroidX}, 95`], ["Diferença", `${140 - centroidX}px`], ["Leitura", "massa deslocada"]]} /><MomentSvg cx={centroidX} cy={95} skew={-asymmetry} bbox /></div></Shell>;
}

function OrientationSlider() {
  const [angle, setAngle] = useState(35);
  const [elongation, setElongation] = useState(70);
  return <Shell tone="rose" eyebrow="Orientação" title="Eixo principal de alongamento" icon={<RotateCw size={18} />} description="Rotacione e alongue a forma para entender quando a orientação é estável."><div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]"><div className="grid gap-4"><Control label="Ângulo" value={angle} min={-80} max={80} onChange={setAngle} /><Control label="Alongamento" value={elongation} min={0} max={100} onChange={setElongation} /></div><Metric tone="rose" rows={[["Ângulo", `${angle}°`], ["Alongamento", `${elongation}%`], ["Estabilidade", elongation > 35 ? "boa" : "baixa"], ["Cuidado", elongation < 25 ? "quase circular" : "ok"]]} /><OrientationSvg angle={angle} elongation={elongation} /></div></Shell>;
}

function MomentSvg({ cx, cy, skew, bbox = false }: { cx: number; cy: number; skew: number; bbox?: boolean }) { const right = 165 + Math.max(0, skew) * 0.45; const left = 70 + Math.min(0, skew) * 0.2; return <div className="rounded-3xl bg-white p-4"><svg className="w-full" viewBox="0 0 280 190" role="img" aria-label="Centroide"><rect width="280" height="190" rx="22" fill="#f8fafc" /><path d={`M${left} 58 L${right} 40 L220 102 L180 145 L72 132 Z`} fill="#0f172a" />{bbox ? <rect x="58" y="40" width="170" height="110" rx="6" fill="none" stroke="#2563eb" strokeWidth="4" strokeDasharray="7 5" /> : null}<circle cx={cx} cy={cy} r="9" fill="#ffffff" stroke="#7c3aed" strokeWidth="5" /><text x={cx} y={cy + 28} textAnchor="middle" fill="#7c3aed" fontSize="12" fontWeight="900">centroide</text>{bbox ? <circle cx="143" cy="95" r="6" fill="#2563eb" /> : null}</svg></div>; }
function OrientationSvg({ angle, elongation }: { angle: number; elongation: number }) { const rx = 35 + elongation * 0.55; const ry = 55 - elongation * 0.35; return <div className="rounded-3xl bg-white p-4"><svg className="w-full" viewBox="0 0 280 190" role="img" aria-label="Orientação"><rect width="280" height="190" rx="22" fill="#f8fafc" /><g transform={`rotate(${angle} 140 95)`}><ellipse cx="140" cy="95" rx={rx} ry={Math.max(18, ry)} fill="#0f172a" /><line x1={140 - rx} y1="95" x2={140 + rx} y2="95" stroke="#e11d48" strokeWidth="5" strokeLinecap="round" /></g><text x="140" y="175" textAnchor="middle" fill="#e11d48" fontSize="13" fontWeight="900">eixo principal</text></svg></div>; }

function Shell({ tone, eyebrow, title, description, icon, children }: { tone: Tone; eyebrow: string; title: string; description: string; icon: ReactNode; children: ReactNode }) { const styles = { violet: "border-violet-200 bg-violet-50 text-violet-700 shadow-violet-900/5", amber: "border-amber-200 bg-amber-50 text-amber-700 shadow-amber-900/5", rose: "border-rose-200 bg-rose-50 text-rose-700 shadow-rose-900/5" }; return <section className={`rounded-[2rem] border p-5 shadow-xl ${styles[tone]}`}><div className="mb-5"><p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em]">{icon}{eyebrow}</p><h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-slate-950">{title}</h3><p className="mt-2 max-w-3xl leading-7 text-slate-600">{description}</p></div>{children}</section>; }
function Control({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (value: number) => void }) { return <label className="grid gap-2 text-sm font-black text-slate-700"><span className="flex justify-between">{label}<span className="font-mono">{value}</span></span><input className="w-full accent-slate-950" type="range" min={min} max={max} value={value} onChange={(e) => onChange(Number(e.target.value))} /></label>; }
function Metric({ rows, tone }: { rows: Array<[string, string]>; tone: Tone }) { const color = tone === "violet" ? "text-violet-700" : tone === "amber" ? "text-amber-700" : "text-rose-700"; return <div className="grid gap-3 sm:grid-cols-2">{rows.map(([k, v]) => <div key={k} className="rounded-2xl bg-white px-4 py-3"><p className={`text-xs font-black uppercase tracking-[0.16em] ${color}`}>{k}</p><p className="mt-1 font-display text-xl font-semibold text-slate-950">{v}</p></div>)}</div>; }
