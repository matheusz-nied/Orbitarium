import type { LessonModule } from "../../../types/content";

export const visuals = {
  "momentos-hero": Hero,
  "momentos-motivacao": Motivacao,
  "momentos-basicos": Basicos,
  "centroide-visual": Centroide,
  "bbox-vs-centroide": BboxVsCentroide,
  "momentos-centrais": Centrais,
  "orientacao-visual": Orientacao,
  "normalizacao-visual": Normalizacao,
  "pipeline-momentos": Pipeline,
} satisfies LessonModule["visuals"];

function Hero() { return <Flow title="Momentos transformam pixels em centro e direção" steps={["Contorno", "M00", "M10/M01", "Centroide", "Orientação"]} color="#7c3aed" bg="#faf5ff" />; }
function Motivacao() { return <Shape title="Massa de pixels" centroid bbox color="#0f766e" bg="#ecfdf5" />; }
function Basicos() { return <Formula title="Momentos básicos" lines={["M00 = soma dos pixels", "M10 = soma de x", "M01 = soma de y"]} color="#2563eb" bg="#eff6ff" />; }
function Centroide() { return <Shape title="Centroide = (M10/M00, M01/M00)" centroid color="#7c3aed" bg="#faf5ff" />; }
function BboxVsCentroide() { return <Shape title="Centroide pode divergir da caixa" centroid bbox color="#f59e0b" bg="#fffbeb" />; }
function Centrais() { return <Formula title="Momentos centrais" lines={["origem deslocada para o centroide", "mu20: dispersão em x", "mu02: dispersão em y", "mu11: correlação"]} color="#0f766e" bg="#ecfdf5" />; }
function Orientacao() { return <Shape title="Orientação principal" centroid axis color="#e11d48" bg="#fff1f2" />; }
function Normalizacao() { return <Formula title="Normalização reduz dependências" lines={["posição → momentos centrais", "escala → momentos normalizados", "forma → Hu Moments"]} color="#0e7490" bg="#ecfeff" />; }
function Pipeline() { return <Flow title="Pipeline prático" steps={["findContours", "moments", "checar M00", "cx/cy", "DataFrame"]} color="#2563eb" bg="#eff6ff" />; }

function Flow({ title, steps, color, bg }: { title: string; steps: string[]; color: string; bg: string }) { const gap = 132; return <figure className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/5"><svg className="w-full" viewBox="0 0 760 330" role="img" aria-label={title}><rect width="760" height="330" rx="28" fill={bg} /><text x="380" y="48" textAnchor="middle" fill={color} fontSize="22" fontWeight="900">{title}</text>{steps.map((step, i) => <g key={step}><rect x={55 + i * gap} y="115" width="104" height="84" rx="18" fill="#ffffff" stroke={color} strokeWidth="3" /><text x={107 + i * gap} y="164" textAnchor="middle" fill={color} fontSize="12" fontWeight="900">{step}</text>{i < steps.length - 1 ? <path d={`M${164 + i * gap} 157h28`} stroke="#475569" strokeWidth="4" strokeLinecap="round" /> : null}</g>)}<text x="380" y="280" textAnchor="middle" fill={color} fontSize="15" fontWeight="800">descritores geométricos viram colunas de tabela</text></svg></figure>; }

function Shape({ title, color, bg, centroid = false, bbox = false, axis = false }: { title: string; color: string; bg: string; centroid?: boolean; bbox?: boolean; axis?: boolean }) { return <figure className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/5"><svg className="w-full" viewBox="0 0 760 350" role="img" aria-label={title}><rect width="760" height="350" rx="28" fill={bg} /><text x="380" y="48" textAnchor="middle" fill={color} fontSize="22" fontWeight="900">{title}</text><path d="M300 115 L430 95 L490 170 L455 245 L325 230 L270 165Z" fill="#0f172a" opacity="0.92" />{bbox ? <rect x="270" y="95" width="220" height="150" rx="8" fill="none" stroke="#2563eb" strokeWidth="5" strokeDasharray="8 6" /> : null}{axis ? <line x1="285" y1="222" x2="480" y2="116" stroke="#e11d48" strokeWidth="6" strokeLinecap="round" /> : null}{centroid ? <circle cx="384" cy="172" r="10" fill="#ffffff" stroke={color} strokeWidth="5" /> : null}{bbox ? <circle cx="380" cy="170" r="7" fill="#2563eb" /> : null}<text x="380" y="310" textAnchor="middle" fill={color} fontSize="15" fontWeight="800">centroide depende da distribuição real dos pixels</text></svg></figure>; }

function Formula({ title, lines, color, bg }: { title: string; lines: string[]; color: string; bg: string }) { return <figure className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/5"><svg className="w-full" viewBox="0 0 760 330" role="img" aria-label={title}><rect width="760" height="330" rx="28" fill={bg} /><text x="380" y="48" textAnchor="middle" fill={color} fontSize="22" fontWeight="900">{title}</text><rect x="145" y="90" width="470" height="190" rx="24" fill="#ffffff" stroke={color} strokeWidth="3" />{lines.map((line, i) => <text key={line} x="380" y={135 + i * 38} textAnchor="middle" fill={i === 0 ? color : "#475569"} fontSize="18" fontWeight="900">{line}</text>)}</svg></figure>; }
