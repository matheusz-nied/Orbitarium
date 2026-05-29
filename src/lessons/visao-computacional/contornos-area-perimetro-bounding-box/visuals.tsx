import type { LessonModule } from "../../../types/content";

export const visuals = {
  "contornos-hero": Hero,
  "contornos-motivacao": Motivacao,
  "contorno-visual": Contorno,
  "modos-contorno": Modos,
  "area-visual": Area,
  "perimetro-visual": Perimetro,
  "bbox-visual": Bbox,
  "area-vs-perimetro": AreaVsPerimetro,
  "pipeline-contornos": Pipeline,
} satisfies LessonModule["visuals"];

function Hero() { return <Flow title="Do blob às features geométricas" steps={["Blob", "Contorno", "Área", "Perímetro", "BBox"]} color="#2563eb" bg="#eff6ff" />; }
function Motivacao() { return <ShapeFigure title="Medir a forma, não só ver a forma" overlays={["contour", "bbox", "centroid"]} color="#0f766e" bg="#ecfdf5" />; }
function Contorno() { return <ShapeFigure title="Contorno acompanha a borda" overlays={["contour"]} color="#7c3aed" bg="#faf5ff" />; }
function Modos() { return <Flow title="findContours: modo e aproximação" steps={["binary", "RETR_EXTERNAL", "CHAIN_APPROX_SIMPLE", "contours"]} color="#f59e0b" bg="#fffbeb" />; }
function Area() { return <ShapeFigure title="Área = região encerrada" overlays={["fill"]} color="#0f766e" bg="#ecfdf5" />; }
function Perimetro() { return <ShapeFigure title="Perímetro = comprimento da borda" overlays={["contour", "ticks"]} color="#e11d48" bg="#fff1f2" />; }
function Bbox() { return <ShapeFigure title="Bounding box = x, y, w, h" overlays={["bbox"]} color="#2563eb" bg="#eff6ff" />; }
function AreaVsPerimetro() { return <CompareShapes />; }
function Pipeline() { return <Flow title="Loop de extração de features" steps={["findContours", "area", "perimeter", "bbox", "DataFrame"]} color="#7c3aed" bg="#faf5ff" />; }

function Flow({ title, steps, color, bg }: { title: string; steps: string[]; color: string; bg: string }) {
  const gap = 132;
  return <figure className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/5"><svg className="w-full" viewBox="0 0 760 330" role="img" aria-label={title}><rect width="760" height="330" rx="28" fill={bg} /><text x="380" y="48" textAnchor="middle" fill={color} fontSize="22" fontWeight="900">{title}</text>{steps.map((step, i) => <g key={step}><rect x={55 + i * gap} y="115" width="104" height="84" rx="18" fill="#ffffff" stroke={color} strokeWidth="3" /><text x={107 + i * gap} y="164" textAnchor="middle" fill={color} fontSize="13" fontWeight="900">{step}</text>{i < steps.length - 1 ? <path d={`M${164 + i * gap} 157h28`} stroke="#475569" strokeWidth="4" strokeLinecap="round" /> : null}</g>)}<text x="380" y="280" textAnchor="middle" fill={color} fontSize="15" fontWeight="800">cada contorno vira uma linha com medidas</text></svg></figure>;
}

function ShapeFigure({ title, overlays, color, bg }: { title: string; overlays: string[]; color: string; bg: string }) {
  return <figure className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/5"><svg className="w-full" viewBox="0 0 760 350" role="img" aria-label={title}><rect width="760" height="350" rx="28" fill={bg} /><text x="380" y="48" textAnchor="middle" fill={color} fontSize="22" fontWeight="900">{title}</text><Blob x={380} y={178} color={overlays.includes("fill") ? color : "#0f172a"} opacity={overlays.includes("fill") ? 0.35 : 1} />{overlays.includes("contour") ? <path d="M290 180 C300 110 360 90 420 110 C490 132 500 215 440 250 C380 285 300 260 290 180Z" fill="none" stroke="#f97316" strokeWidth="6" strokeLinecap="round" /> : null}{overlays.includes("bbox") ? <rect x="286" y="102" width="210" height="168" rx="8" fill="none" stroke="#2563eb" strokeWidth="5" strokeDasharray="8 6" /> : null}{overlays.includes("centroid") ? <circle cx="390" cy="184" r="8" fill="#ffffff" stroke="#0f172a" strokeWidth="4" /> : null}{overlays.includes("ticks") ? [0,1,2,3,4,5].map((i) => <circle key={i} cx={310 + i * 32} cy={125 + (i % 2) * 115} r="5" fill="#e11d48" />) : null}<text x="380" y="318" textAnchor="middle" fill={color} fontSize="15" fontWeight="800">borda, área e caixa resumem a geometria do objeto</text></svg></figure>;
}

function Blob({ x, y, color, opacity = 1 }: { x: number; y: number; color: string; opacity?: number }) { return <path d={`M${x - 90} ${y} C${x - 80} ${y - 70} ${x - 20} ${y - 90} ${x + 40} ${y - 68} C${x + 110} ${y - 46} ${x + 120} ${y + 35} ${x + 60} ${y + 72} C${x} ${y + 107} ${x - 80} ${y + 82} ${x - 90} ${y}Z`} fill={color} opacity={opacity} />; }

function CompareShapes() {
  return <figure className="rounded-[2rem] border border-amber-200 bg-amber-50 p-4 shadow-xl shadow-amber-900/5"><svg className="w-full" viewBox="0 0 760 350" role="img" aria-label="Área parecida, perímetro diferente"><rect width="760" height="350" rx="28" fill="#fffbeb" /><text x="380" y="48" textAnchor="middle" fill="#92400e" fontSize="22" fontWeight="900">Área parecida, perímetro diferente</text><circle cx="230" cy="170" r="62" fill="#0f172a" /><text x="230" y="270" textAnchor="middle" fill="#92400e" fontSize="15" fontWeight="900">compacto</text><path d="M530 92 L552 145 L610 150 L565 185 L580 242 L530 210 L480 242 L495 185 L450 150 L508 145Z" fill="#0f172a" /><text x="530" y="270" textAnchor="middle" fill="#92400e" fontSize="15" fontWeight="900">irregular</text><text x="380" y="318" textAnchor="middle" fill="#92400e" fontSize="15" fontWeight="800">perímetro ajuda a revelar complexidade da borda</text></svg></figure>;
}
