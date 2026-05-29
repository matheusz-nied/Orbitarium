import type { LessonModule } from "../../../types/content";

export const visuals = {
  "rotulacao-hero": Hero,
  "rotulacao-motivacao": Motivacao,
  "funcao-opencv": FuncaoOpenCv,
  "labels-visual": LabelsVisual,
  "stats-visual": StatsVisual,
  "centroides-visual": CentroidesVisual,
  "colorizacao-visual": ColorizacaoVisual,
  "filtragem-visual": FiltragemVisual,
  "histograma-areas-visual": HistogramaAreasVisual,
} satisfies LessonModule["visuals"];

function Hero() { return <Flow title="Rotulação transforma blobs em tabela" steps={["Binária", "Labels", "Stats", "DataFrame"]} color="#2563eb" bg="#eff6ff" />; }
function Motivacao() { return <Split title="De regiões para objetos mensuráveis" left="pixels brancos" right="IDs por blob" color="#0f766e" bg="#ecfdf5" />; }
function FuncaoOpenCv() { return <Flow title="connectedComponentsWithStats" steps={["binary", "num_labels", "labels", "stats + centroids"]} color="#7c3aed" bg="#faf5ff" />; }
function LabelsVisual() { return <LabelFigure title="Mapa de labels" note="cada cor é um componente" color="#2563eb" bg="#eff6ff" />; }
function StatsVisual() { return <TableFigure title="Stats: bbox e área" color="#f59e0b" bg="#fffbeb" />; }
function CentroidesVisual() { return <LabelFigure title="Centroides localizam blobs" note="ponto médio de cada região" color="#0f766e" bg="#ecfdf5" dots />; }
function ColorizacaoVisual() { return <LabelFigure title="Colormap de componentes" note="depuração visual rápida" color="#7c3aed" bg="#faf5ff" />; }
function FiltragemVisual() { return <Split title="Filtro de área" left="ruído pequeno" right="blobs relevantes" color="#e11d48" bg="#fff1f2" />; }
function HistogramaAreasVisual() { return <HistogramFigure />; }

function Flow({ title, steps, color, bg }: { title: string; steps: string[]; color: string; bg: string }) {
  return (
    <figure className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/5">
      <svg className="w-full" viewBox="0 0 760 330" role="img" aria-label={title}>
        <rect width="760" height="330" rx="28" fill={bg} />
        <text x="380" y="48" textAnchor="middle" fill={color} fontSize="22" fontWeight="900">{title}</text>
        {steps.map((step, index) => (
          <g key={step}>
            <rect x={55 + index * 180} y="115" width="140" height="90" rx="18" fill="#ffffff" stroke={color} strokeWidth="3" />
            <text x={125 + index * 180} y="168" textAnchor="middle" fill={color} fontSize="15" fontWeight="900">{step}</text>
            {index < steps.length - 1 ? <path d={`M${200 + index * 180} 160h34`} stroke="#475569" strokeWidth="4" strokeLinecap="round" /> : null}
          </g>
        ))}
        <text x="380" y="280" textAnchor="middle" fill={color} fontSize="15" fontWeight="800">imagem binária → objetos com medidas</text>
      </svg>
    </figure>
  );
}

function Split({ title, left, right, color, bg }: { title: string; left: string; right: string; color: string; bg: string }) {
  return (
    <figure className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/5">
      <svg className="w-full" viewBox="0 0 760 350" role="img" aria-label={title}>
        <rect width="760" height="350" rx="28" fill={bg} />
        <text x="380" y="48" textAnchor="middle" fill={color} fontSize="22" fontWeight="900">{title}</text>
        <rect x="120" y="95" width="190" height="180" rx="20" fill="#ffffff" stroke={color} strokeWidth="3" />
        <MiniBlobs x={160} y={135} mode="raw" />
        <text x="215" y="305" textAnchor="middle" fill={color} fontSize="14" fontWeight="900">{left}</text>
        <path d="M350 185h60" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
        <rect x="450" y="95" width="190" height="180" rx="20" fill="#ffffff" stroke={color} strokeWidth="3" />
        <MiniBlobs x={490} y={135} mode="labels" />
        <text x="545" y="305" textAnchor="middle" fill={color} fontSize="14" fontWeight="900">{right}</text>
      </svg>
    </figure>
  );
}

function LabelFigure({ title, note, color, bg, dots = false }: { title: string; note: string; color: string; bg: string; dots?: boolean }) {
  return (
    <figure className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/5">
      <svg className="w-full" viewBox="0 0 760 350" role="img" aria-label={title}>
        <rect width="760" height="350" rx="28" fill={bg} />
        <text x="380" y="48" textAnchor="middle" fill={color} fontSize="22" fontWeight="900">{title}</text>
        <MiniBlobs x={270} y={90} mode="labels" scale={1.7} dots={dots} />
        <text x="380" y="318" textAnchor="middle" fill={color} fontSize="15" fontWeight="800">{note}</text>
      </svg>
    </figure>
  );
}

function TableFigure({ title, color, bg }: { title: string; color: string; bg: string }) {
  return (
    <figure className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/5">
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label={title}>
        <rect width="760" height="340" rx="28" fill={bg} />
        <text x="380" y="48" textAnchor="middle" fill={color} fontSize="22" fontWeight="900">{title}</text>
        <rect x="115" y="95" width="530" height="180" rx="18" fill="#ffffff" stroke={color} strokeWidth="3" />
        {["id", "x", "y", "w", "h", "area"].map((h, i) => <text key={h} x={155 + i * 82} y="135" fill={color} fontSize="14" fontWeight="900">{h}</text>)}
        {[[1, 24, 18, 44, 35, 921], [2, 112, 51, 38, 29, 642], [3, 204, 88, 51, 41, 1180]].map((row, r) => row.map((v, c) => <text key={`${r}-${c}`} x={155 + c * 82} y={170 + r * 36} fill="#475569" fontSize="14" fontWeight="800">{v}</text>))}
      </svg>
    </figure>
  );
}

function HistogramFigure() {
  return (
    <figure className="rounded-[2rem] border border-indigo-200 bg-indigo-50 p-4 shadow-xl shadow-indigo-900/5">
      <svg className="w-full" viewBox="0 0 760 350" role="img" aria-label="Histograma de áreas">
        <rect width="760" height="350" rx="28" fill="#eef2ff" />
        <text x="380" y="48" textAnchor="middle" fill="#3730a3" fontSize="22" fontWeight="900">Histograma de áreas</text>
        <line x1="110" y1="270" x2="650" y2="270" stroke="#475569" strokeWidth="2" />
        <line x1="110" y1="90" x2="110" y2="270" stroke="#475569" strokeWidth="2" />
        {[90, 45, 130, 170, 100, 55, 25].map((h, i) => <rect key={i} x={140 + i * 65} y={270 - h} width="42" height={h} rx="8" fill={i < 2 ? "#e11d48" : "#4f46e5"} opacity="0.85" />)}
        <text x="380" y="318" textAnchor="middle" fill="#3730a3" fontSize="15" fontWeight="800">ruídos pequenos aparecem nas primeiras barras</text>
      </svg>
    </figure>
  );
}

function MiniBlobs({ x, y, mode, scale = 1, dots = false }: { x: number; y: number; mode: string; scale?: number; dots?: boolean }) {
  const colors = mode === "labels" ? ["#2563eb", "#0f766e", "#7c3aed"] : ["#0f172a", "#0f172a", "#0f172a"];
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <ellipse cx="35" cy="55" rx="30" ry="24" fill={colors[0]} />
      <ellipse cx="100" cy="35" rx="24" ry="20" fill={colors[1]} />
      <ellipse cx="112" cy="105" rx="34" ry="26" fill={colors[2]} />
      {dots ? <><circle cx="35" cy="55" r="5" fill="#ffffff" /><circle cx="100" cy="35" r="5" fill="#ffffff" /><circle cx="112" cy="105" r="5" fill="#ffffff" /></> : null}
    </g>
  );
}
