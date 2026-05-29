import { useMemo, useState, type ReactNode } from "react";
import { Brain, GitCompare, SlidersHorizontal, Zap } from "lucide-react";
import type { LessonModule } from "../../../types/content";

export const interactions = {
  "pipeline-selector": PipelineSelector,
  "classic-knobs": ClassicKnobs,
  "data-cost-slider": DataCostSlider,
  "stress-test": StressTest,
} satisfies LessonModule["interactions"];

type Tone = "violet" | "blue" | "emerald" | "rose";

function PipelineSelector() {
  const [variation, setVariation] = useState(45);
  const [data, setData] = useState(35);
  const recommendation = variation > 60 && data > 55 ? "deep learning" : variation < 50 ? "clássico" : "híbrido";
  return <Shell tone="violet" eyebrow="Escolha" title="Qual rota parece mais adequada?" icon={<GitCompare size={18} />} description="Aumente variação visual e disponibilidade de dados para ver a recomendação mudar."><div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]"><div className="grid gap-4"><Control label="Variação visual" value={variation} min={0} max={100} onChange={setVariation} /><Control label="Dados anotados" value={data} min={0} max={100} onChange={setData} /></div><Metric tone="violet" rows={[["Sugestão", recommendation], ["Variação", `${variation}%`], ["Dados", `${data}%`], ["Regra", "menor confiável"]]} /><BalanceSvg left={100 - variation} right={data} /></div></Shell>;
}

function ClassicKnobs() {
  const [threshold, setThreshold] = useState(55);
  const [morph, setMorph] = useState(35);
  const quality = useMemo(() => Math.max(20, 100 - Math.abs(threshold - 58) - Math.abs(morph - 42) * 0.6), [threshold, morph]);
  return <Shell tone="blue" eyebrow="Clássico" title="Ajuste parâmetros explícitos" icon={<SlidersHorizontal size={18} />} description="Threshold e morfologia são fáceis de visualizar, mas podem exigir ajuste quando a cena muda."><div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]"><div className="grid gap-4"><Control label="Threshold" value={threshold} min={20} max={90} onChange={setThreshold} /><Control label="Morfologia" value={morph} min={0} max={80} onChange={setMorph} /></div><Metric tone="blue" rows={[["Qualidade", `${Math.round(quality)}%`], ["Depuração", "alta"], ["Dados", "baixos"], ["Risco", "fragilidade"]]} /><MaskPreview quality={quality} /></div></Shell>;
}

function DataCostSlider() {
  const [annotations, setAnnotations] = useState(40);
  const [compute, setCompute] = useState(55);
  return <Shell tone="emerald" eyebrow="Custo" title="Deep learning troca regra por dados" icon={<Brain size={18} />} description="Mais anotações e computação aumentam a viabilidade de um modelo treinado."><div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]"><div className="grid gap-4"><Control label="Máscaras anotadas" value={annotations} min={0} max={100} onChange={setAnnotations} /><Control label="Computação disponível" value={compute} min={0} max={100} onChange={setCompute} /></div><Metric tone="emerald" rows={[["Viabilidade", annotations > 60 && compute > 45 ? "boa" : "limitada"], ["Anotação", `${annotations}%`], ["Compute", `${compute}%`], ["Manutenção", "modelo"]]} /><Bars values={[annotations, compute]} /></div></Shell>;
}

function StressTest() {
  const [noise, setNoise] = useState(35);
  const [shift, setShift] = useState(25);
  const classic = Math.max(5, 90 - noise - shift);
  const deep = Math.max(10, 76 - noise * 0.25 - shift * 0.35);
  return <Shell tone="rose" eyebrow="Robustez" title="Teste variações do mundo real" icon={<Zap size={18} />} description="Ruído e mudança de domínio afetam os dois caminhos, mas de formas diferentes."><div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]"><div className="grid gap-4"><Control label="Ruído" value={noise} min={0} max={85} onChange={setNoise} /><Control label="Mudança de domínio" value={shift} min={0} max={85} onChange={setShift} /></div><Metric tone="rose" rows={[["Clássico", `${Math.round(classic)}%`], ["Deep", `${Math.round(deep)}%`], ["Pior fator", noise > shift ? "ruído" : "domínio"], ["Ação", "validar"]]} /><ComparisonBars classic={classic} deep={deep} /></div></Shell>;
}

function BalanceSvg({ left, right }: { left: number; right: number }) { return <Svg label="Balança"><rect x="50" y={150 - left} width="70" height={left} rx="10" fill="#2563eb" /><rect x="160" y={150 - right} width="70" height={right} rx="10" fill="#7c3aed" /><text x="85" y="172" textAnchor="middle" fill="#2563eb" fontSize="12" fontWeight="900">clássico</text><text x="195" y="172" textAnchor="middle" fill="#7c3aed" fontSize="12" fontWeight="900">deep</text></Svg>; }
function MaskPreview({ quality }: { quality: number }) { const opacity = quality / 100; return <Svg label="Máscara clássica"><rect x="62" y="50" width="156" height="95" rx="20" fill="#0f172a" opacity={opacity} /><circle cx="112" cy="98" r="26" fill="#fff" opacity={1 - opacity * 0.35} /><circle cx="177" cy="98" r="22" fill="#fff" opacity={1 - opacity * 0.35} /></Svg>; }
function Bars({ values }: { values: number[] }) { return <div className="grid gap-4 rounded-3xl bg-white p-4">{["anotação", "compute"].map((label, i) => <div key={label}><div className="mb-1 flex justify-between text-sm font-black text-slate-700"><span>{label}</span><span>{values[i]}%</span></div><div className="h-5 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-emerald-500" style={{ width: `${values[i]}%` }} /></div></div>)}</div>; }
function ComparisonBars({ classic, deep }: { classic: number; deep: number }) { return <div className="grid gap-4 rounded-3xl bg-white p-4">{[["clássico", classic, "#2563eb"], ["deep", deep, "#7c3aed"]].map(([label, value, color]) => <div key={label as string}><div className="mb-1 flex justify-between text-sm font-black text-slate-700"><span>{label}</span><span>{Math.round(value as number)}%</span></div><div className="h-5 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full" style={{ width: `${value}%`, backgroundColor: color as string }} /></div></div>)}</div>; }
function Svg({ label, children }: { label: string; children: ReactNode }) { return <div className="rounded-3xl bg-white p-4"><svg className="w-full" viewBox="0 0 280 190" role="img" aria-label={label}><rect width="280" height="190" rx="22" fill="#f8fafc" />{children}</svg></div>; }

function Shell({ tone, eyebrow, title, description, icon, children }: { tone: Tone; eyebrow: string; title: string; description: string; icon: ReactNode; children: ReactNode }) { const styles = { violet: "border-violet-200 bg-violet-50 text-violet-700 shadow-violet-900/5", blue: "border-blue-200 bg-blue-50 text-blue-700 shadow-blue-900/5", emerald: "border-emerald-200 bg-emerald-50 text-emerald-700 shadow-emerald-900/5", rose: "border-rose-200 bg-rose-50 text-rose-700 shadow-rose-900/5" }; return <section className={`rounded-[2rem] border p-5 shadow-xl ${styles[tone]}`}><div className="mb-5"><p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em]">{icon}{eyebrow}</p><h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-slate-950">{title}</h3><p className="mt-2 max-w-3xl leading-7 text-slate-600">{description}</p></div>{children}</section>; }
function Control({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (value: number) => void }) { return <label className="grid gap-2 text-sm font-black text-slate-700"><span className="flex justify-between">{label}<span className="font-mono">{value}</span></span><input className="w-full accent-slate-950" type="range" min={min} max={max} value={value} onChange={(e) => onChange(Number(e.target.value))} /></label>; }
function Metric({ rows, tone }: { rows: Array<[string, string]>; tone: Tone }) { const color = tone === "violet" ? "text-violet-700" : tone === "blue" ? "text-blue-700" : tone === "emerald" ? "text-emerald-700" : "text-rose-700"; return <div className="grid gap-3 sm:grid-cols-2">{rows.map(([k, v]) => <div key={k} className="rounded-2xl bg-white px-4 py-3"><p className={`text-xs font-black uppercase tracking-[0.16em] ${color}`}>{k}</p><p className="mt-1 font-display text-xl font-semibold text-slate-950">{v}</p></div>)}</div>; }
