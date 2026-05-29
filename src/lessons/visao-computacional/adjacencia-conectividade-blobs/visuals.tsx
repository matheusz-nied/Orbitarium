import type { LessonModule } from "../../../types/content";

export const visuals = {
  "conectividade-hero": ConectividadeHeroVisual,
  "pixels-viram-objetos": PixelsViramObjetosVisual,
  "adjacencia-vizinhanca": AdjacenciaVizinhancaVisual,
  "conectividade-4-visual": Conectividade4Visual,
  "conectividade-8-visual": Conectividade8Visual,
  "caminho-conectado-visual": CaminhoConectadoVisual,
  "blob-visual": BlobVisual,
  "comparando-4-8": Comparando48Visual,
  "escolha-conectividade": EscolhaConectividadeVisual,
  "ponte-rotulacao": PonteRotulacaoVisual,
} satisfies LessonModule["visuals"];

function ConectividadeHeroVisual() {
  return (
    <figure className="overflow-hidden rounded-[2rem] border border-blue-200 bg-white p-4 shadow-xl shadow-blue-900/10">
      <svg className="w-full" viewBox="0 0 760 430" role="img" aria-label="Pixels se conectando para formar blobs">
        <defs>
          <linearGradient id="connHeroBg" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#eff6ff" />
            <stop offset="60%" stopColor="#f0fdfa" />
            <stop offset="100%" stopColor="#faf5ff" />
          </linearGradient>
        </defs>
        <rect width="760" height="430" rx="30" fill="url(#connHeroBg)" />
        <text x="380" y="54" textAnchor="middle" fill="#0f172a" fontSize="26" fontWeight="900">Pixels viram regiões conectadas</text>
        <GridCluster x={90} y={95} mode="raw" />
        <Arrow x={300} y={205} />
        <GridCluster x={380} y={95} mode="labels" />
        <Arrow x={590} y={205} />
        <rect x="635" y="145" width="80" height="130" rx="18" fill="#ffffff" stroke="#2563eb" strokeWidth="3" />
        <text x="675" y="184" textAnchor="middle" fill="#1d4ed8" fontSize="16" fontWeight="900">Blobs</text>
        <text x="675" y="214" textAnchor="middle" fill="#2563eb" fontSize="14" fontWeight="800">1</text>
        <text x="675" y="238" textAnchor="middle" fill="#059669" fontSize="14" fontWeight="800">2</text>
        <text x="675" y="262" textAnchor="middle" fill="#7c3aed" fontSize="14" fontWeight="800">3</text>
        <rect x="110" y="348" width="540" height="58" rx="18" fill="#ffffff" stroke="#2563eb" strokeWidth="2" />
        <text x="380" y="383" textAnchor="middle" fill="#1d4ed8" fontSize="16" fontWeight="900">conectividade define o que é o mesmo objeto</text>
      </svg>
    </figure>
  );
}

function PixelsViramObjetosVisual() {
  return <Panel title="De pixels soltos a objetos candidatos" left="Pixels" right="Blobs" leftMode="raw" rightMode="labels" tone="#1d4ed8" bg="#eff6ff" />;
}

function AdjacenciaVizinhancaVisual() {
  return (
    <figure className="rounded-[2rem] border border-teal-200 bg-teal-50 p-4 shadow-xl shadow-teal-900/5">
      <svg className="w-full" viewBox="0 0 760 360" role="img" aria-label="Vizinhança 4 e 8">
        <rect width="760" height="360" rx="28" fill="#f0fdfa" />
        <text x="380" y="48" textAnchor="middle" fill="#0f766e" fontSize="22" fontWeight="900">Vizinhança de um pixel P</text>
        <Neighborhood x={220} y={120} diagonal={false} label="4-vizinhos" color="#0f766e" />
        <Neighborhood x={520} y={120} diagonal label="8-vizinhos" color="#7c3aed" />
        <text x="380" y="330" textAnchor="middle" fill="#0f766e" fontSize="15" fontWeight="800">a regra local de vizinhança muda a região global encontrada</text>
      </svg>
    </figure>
  );
}

function Conectividade4Visual() {
  return <Panel title="Conectividade-4: diagonais não conectam" left="Diagonal visual" right="Componentes separados" leftMode="diagonal" rightMode="four" tone="#f59e0b" bg="#fffbeb" />;
}

function Conectividade8Visual() {
  return <Panel title="Conectividade-8: diagonais conectam" left="Diagonal visual" right="Um componente" leftMode="diagonal" rightMode="eight" tone="#7c3aed" bg="#faf5ff" />;
}

function CaminhoConectadoVisual() {
  return (
    <figure className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-4 shadow-xl shadow-emerald-900/5">
      <svg className="w-full" viewBox="0 0 760 360" role="img" aria-label="Caminho conectado">
        <rect width="760" height="360" rx="28" fill="#ecfdf5" />
        <text x="380" y="48" textAnchor="middle" fill="#065f46" fontSize="22" fontWeight="900">Caminho conectado</text>
        <GridPath x={240} y={95} />
        <text x="380" y="318" textAnchor="middle" fill="#065f46" fontSize="15" fontWeight="800">A alcança F por uma sequência de pixels adjacentes</text>
      </svg>
    </figure>
  );
}

function BlobVisual() {
  return <Panel title="Blob = componente conectado mensurável" left="Labels coloridos" right="Tabela de atributos" leftMode="labels" rightMode="table" tone="#0f766e" bg="#ecfdf5" />;
}

function Comparando48Visual() {
  return <Panel title="A mesma imagem, duas contagens" left="Conectividade-4" right="Conectividade-8" leftMode="four" rightMode="eight" tone="#2563eb" bg="#eff6ff" />;
}

function EscolhaConectividadeVisual() {
  return (
    <figure className="rounded-[2rem] border border-amber-200 bg-amber-50 p-4 shadow-xl shadow-amber-900/5">
      <svg className="w-full" viewBox="0 0 760 350" role="img" aria-label="Como escolher conectividade">
        <rect width="760" height="350" rx="28" fill="#fffbeb" />
        <text x="380" y="48" textAnchor="middle" fill="#92400e" fontSize="22" fontWeight="900">Escolha pela semântica da cena</text>
        <DecisionCard x={80} y={105} title="Quer separar mais?" answer="Use 4" note="evita pontes diagonais" color="#f59e0b" />
        <DecisionCard x={300} y={105} title="Quer preservar diagonais?" answer="Use 8" note="mantém continuidade" color="#7c3aed" />
        <DecisionCard x={520} y={105} title="Está em dúvida?" answer="Compare" note="conte, visualize e justifique" color="#0f766e" />
      </svg>
    </figure>
  );
}

function PonteRotulacaoVisual() {
  return (
    <figure className="rounded-[2rem] border border-violet-200 bg-violet-50 p-4 shadow-xl shadow-violet-900/5">
      <svg className="w-full" viewBox="0 0 760 330" role="img" aria-label="Da conectividade para rotulação">
        <rect width="760" height="330" rx="28" fill="#faf5ff" />
        <text x="380" y="48" textAnchor="middle" fill="#6b21a8" fontSize="22" fontWeight="900">Próximo passo: rotular componentes</text>
        {[
          ["Binária", "0/255"],
          ["Conectividade", "4 ou 8"],
          ["Labels", "IDs por blob"],
          ["Stats", "área, bbox, centroide"],
        ].map(([title, note], index) => (
          <g key={title}>
            <rect x={55 + index * 180} y="110" width="140" height="90" rx="18" fill="#ffffff" stroke="#8b5cf6" strokeWidth="3" />
            <text x={125 + index * 180} y="148" textAnchor="middle" fill="#6b21a8" fontSize="16" fontWeight="900">{title}</text>
            <text x={125 + index * 180} y="174" textAnchor="middle" fill="#7c3aed" fontSize="12" fontWeight="700">{note}</text>
            {index < 3 ? <path d={`M${200 + index * 180} 155h34`} stroke="#475569" strokeWidth="4" strokeLinecap="round" /> : null}
          </g>
        ))}
        <text x="380" y="280" textAnchor="middle" fill="#6b21a8" fontSize="15" fontWeight="800">connectedComponentsWithStats transforma blobs em tabela</text>
      </svg>
    </figure>
  );
}

function Panel({ title, left, right, leftMode, rightMode, tone, bg }: { title: string; left: string; right: string; leftMode: string; rightMode: string; tone: string; bg: string }) {
  return (
    <figure className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/5">
      <svg className="w-full" viewBox="0 0 760 360" role="img" aria-label={title}>
        <rect width="760" height="360" rx="28" fill={bg} />
        <text x="380" y="48" textAnchor="middle" fill={tone} fontSize="22" fontWeight="900">{title}</text>
        <Box x={115} y={90} title={left} mode={leftMode} tone={tone} />
        <path d="M355 185h50" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
        <Box x={455} y={90} title={right} mode={rightMode} tone={tone} />
      </svg>
    </figure>
  );
}

function Box({ x, y, title, mode, tone }: { x: number; y: number; title: string; mode: string; tone: string }) {
  return (
    <g>
      <rect x={x} y={y} width="190" height="210" rx="20" fill="#ffffff" stroke={tone} strokeWidth="3" />
      <text x={x + 95} y={y + 34} textAnchor="middle" fill={tone} fontSize="15" fontWeight="900">{title}</text>
      {mode === "table" ? <MiniTable x={x + 26} y={y + 68} tone={tone} /> : <MiniGrid x={x + 38} y={y + 62} mode={mode} />}
    </g>
  );
}

function GridCluster({ x, y, mode }: { x: number; y: number; mode: string }) {
  return (
    <g>
      <rect x={x} y={y} width="180" height="220" rx="22" fill="#ffffff" stroke="#2563eb" strokeWidth="3" />
      <MiniGrid x={x + 28} y={y + 54} mode={mode} />
    </g>
  );
}

function MiniGrid({ x, y, mode }: { x: number; y: number; mode: string }) {
  const cells = mode === "diagonal" || mode === "four" || mode === "eight"
    ? [0, 7, 14, 21, 28]
    : [2, 3, 9, 10, 11, 17, 25, 26, 31, 32];
  const colors = ["#2563eb", "#0f766e", "#7c3aed", "#f59e0b", "#e11d48"];
  return (
    <g>
      {Array.from({ length: 36 }).map((_, i) => {
        const active = cells.includes(i);
        const labelMode = mode === "labels" || mode === "four" || mode === "eight";
        const color = labelMode && active ? colors[i % colors.length] : active ? "#0f172a" : "#ffffff";
        return <rect key={i} x={x + (i % 6) * 20} y={y + Math.floor(i / 6) * 20} width="18" height="18" rx="3" fill={color} stroke="#cbd5e1" strokeWidth="1" />;
      })}
      {(mode === "four" || mode === "eight") ? (
        <text x={x + 60} y={y + 145} textAnchor="middle" fill="#475569" fontSize="12" fontWeight="800">{mode === "four" ? "5 blobs" : "1 blob"}</text>
      ) : null}
    </g>
  );
}

function Neighborhood({ x, y, diagonal, label, color }: { x: number; y: number; diagonal: boolean; label: string; color: string }) {
  return (
    <g>
      <rect x={x - 85} y={y - 20} width="170" height="175" rx="18" fill="#ffffff" stroke={color} strokeWidth="3" />
      {Array.from({ length: 9 }).map((_, i) => {
        const isCenter = i === 4;
        const isOrthogonal = [1, 3, 5, 7].includes(i);
        const isDiagonal = [0, 2, 6, 8].includes(i);
        const active = isCenter || isOrthogonal || (diagonal && isDiagonal);
        return <rect key={i} x={x - 39 + (i % 3) * 30} y={y + 10 + Math.floor(i / 3) * 30} width="26" height="26" rx="5" fill={isCenter ? "#0f172a" : active ? color : "#e2e8f0"} opacity={active ? 1 : 0.75} />;
      })}
      <text x={x} y={y + 135} textAnchor="middle" fill={color} fontSize="15" fontWeight="900">{label}</text>
    </g>
  );
}

function GridPath({ x, y }: { x: number; y: number }) {
  const path = [1, 2, 8, 14, 15, 21, 27, 28];
  return (
    <g>
      <rect x={x} y={y} width="280" height="190" rx="20" fill="#ffffff" stroke="#10b981" strokeWidth="3" />
      {Array.from({ length: 36 }).map((_, i) => {
        const active = path.includes(i);
        return <rect key={i} x={x + 50 + (i % 6) * 30} y={y + 28 + Math.floor(i / 6) * 25} width="24" height="21" rx="4" fill={active ? "#0f766e" : "#ffffff"} stroke="#cbd5e1" strokeWidth="1" />;
      })}
      <text x={x + 65} y={y + 48} fill="#ffffff" fontSize="12" fontWeight="900">A</text>
      <text x={x + 200} y={y + 173} fill="#ffffff" fontSize="12" fontWeight="900">F</text>
    </g>
  );
}

function MiniTable({ x, y, tone }: { x: number; y: number; tone: string }) {
  return (
    <g>
      {["id", "área", "cx", "cy"].map((h, i) => <text key={h} x={x + i * 34} y={y} fill={tone} fontSize="11" fontWeight="900">{h}</text>)}
      {[1, 2, 3].map((row, r) => [row, 18 + r * 7, 40 + r * 20, 70 + r * 10].map((value, c) => <text key={`${r}-${c}`} x={x + c * 34} y={y + 25 + r * 25} fill="#475569" fontSize="11" fontWeight="800">{value}</text>))}
    </g>
  );
}

function DecisionCard({ x, y, title, answer, note, color }: { x: number; y: number; title: string; answer: string; note: string; color: string }) {
  return (
    <g>
      <rect x={x} y={y} width="160" height="150" rx="20" fill="#ffffff" stroke={color} strokeWidth="3" />
      <text x={x + 80} y={y + 38} textAnchor="middle" fill={color} fontSize="14" fontWeight="900">{title}</text>
      <text x={x + 80} y={y + 84} textAnchor="middle" fill={color} fontSize="24" fontWeight="900">{answer}</text>
      <text x={x + 80} y={y + 118} textAnchor="middle" fill="#475569" fontSize="12" fontWeight="800">{note}</text>
    </g>
  );
}

function Arrow({ x, y }: { x: number; y: number }) {
  return <path d={`M${x} ${y}h36`} stroke="#475569" strokeWidth="5" strokeLinecap="round" />;
}
