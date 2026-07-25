import type { LessonModule } from "../../../types/content";

export const visuals = {
  "ram-hero": RamHeroVisual,
  "ram-role-visual": RamRoleVisual,
  "dram-cell-visual": DramCellVisual,
  "dram-matrix-visual": DramMatrixVisual,
  "row-buffer-visual": RowBufferVisual,
  "refresh-visual": RefreshVisual,
  "ddr-burst-visual": DdrBurstVisual,
  "hierarchy-compare-visual": HierarchyCompareVisual,
  "ram-software-visual": RamSoftwareVisual,
} satisfies LessonModule["visuals"];

function RamHeroVisual() {
  return (
    <Frame title="RAM como memória principal ativa do sistema" tone="indigo">
      <svg className="w-full" viewBox="0 0 760 360" role="img" aria-label="Hierarquia com CPU, cache, RAM e armazenamento">
        <rect width="760" height="360" rx="28" fill="#eef2ff" />
        <text x="380" y="48" textAnchor="middle" fill="#3730a3" fontSize="24" fontWeight="900">A RAM sustenta o estado vivo entre o cache e o armazenamento</text>
        <Tier x={305} y={90} w={150} h={46} label="CPU" color="#4f46e5" />
        <Tier x={275} y={148} w={210} h={46} label="Cache" color="#16a34a" />
        <Tier x={235} y={206} w={290} h={54} label="RAM / DRAM" color="#d97706" />
        <Tier x={185} y={274} w={390} h={54} label="SSD / Disco" color="#64748b" />
      </svg>
    </Frame>
  );
}

function RamRoleVisual() {
  return (
    <Frame title="Programas ativos dependem da RAM" tone="teal">
      <svg className="w-full" viewBox="0 0 760 320" role="img" aria-label="Aplicativos e dados ativos na RAM">
        <rect width="760" height="320" rx="28" fill="#f0fdfa" />
        <text x="380" y="48" textAnchor="middle" fill="#0f766e" fontSize="22" fontWeight="900">Código em execução e dados quentes precisam morar aqui</text>
        <rect x="170" y="110" width="420" height="140" rx="28" fill="#ffffff" stroke="#14b8a6" strokeWidth="4" />
        <text x="380" y="155" textAnchor="middle" fill="#0f766e" fontSize="26" fontWeight="900">RAM</text>
        <text x="380" y="190" textAnchor="middle" fill="#475569" fontSize="14" fontWeight="700">processos, buffers, páginas ativas, bibliotecas carregadas</text>
      </svg>
    </Frame>
  );
}

function DramCellVisual() {
  return (
    <Frame title="Uma célula DRAM guarda um bit como carga elétrica" tone="violet">
      <svg className="w-full" viewBox="0 0 760 330" role="img" aria-label="Celula DRAM com transistor e capacitor">
        <rect width="760" height="330" rx="28" fill="#faf5ff" />
        <text x="380" y="48" textAnchor="middle" fill="#6d28d9" fontSize="22" fontWeight="900">Modelo didático: transistor + capacitor</text>
        <circle cx="470" cy="166" r="42" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="4" />
        <text x="470" y="173" textAnchor="middle" fill="#6d28d9" fontSize="16" fontWeight="900">carga</text>
        <rect x="250" y="130" width="70" height="72" rx="12" fill="#ffffff" stroke="#8b5cf6" strokeWidth="4" />
        <text x="285" y="171" textAnchor="middle" fill="#6d28d9" fontSize="16" fontWeight="900">switch</text>
        <path d="M320 166h108" stroke="#8b5cf6" strokeWidth="4" strokeLinecap="round" />
      </svg>
    </Frame>
  );
}

function DramMatrixVisual() {
  return (
    <Frame title="A DRAM é organizada como matriz de linhas e colunas" tone="rose">
      <svg className="w-full" viewBox="0 0 760 350" role="img" aria-label="Matriz DRAM com linha e coluna destacadas">
        <rect width="760" height="350" rx="28" fill="#fff1f2" />
        <text x="380" y="48" textAnchor="middle" fill="#be123c" fontSize="22" fontWeight="900">Endereços passam por seleção de row e column</text>
        {Array.from({ length: 6 }).map((_, row) =>
          Array.from({ length: 8 }).map((_, col) => (
            <rect
              key={`${row}-${col}`}
              x={150 + col * 52}
              y={96 + row * 34}
              width="40"
              height="24"
              rx="6"
              fill={row === 2 ? "#fecdd3" : col === 5 ? "#ffe4e6" : "#ffffff"}
              stroke="#fb7185"
              strokeWidth="2"
            />
          )),
        )}
        <text x="130" y="178" textAnchor="end" fill="#be123c" fontSize="14" fontWeight="900">row ativa</text>
        <text x="430" y="308" textAnchor="middle" fill="#be123c" fontSize="14" fontWeight="900">column selecionada</text>
      </svg>
    </Frame>
  );
}

function RowBufferVisual() {
  return (
    <Frame title="A linha aberta vira contexto útil" tone="amber">
      <svg className="w-full" viewBox="0 0 760 330" role="img" aria-label="Row buffer recebendo linha ativa">
        <rect width="760" height="330" rx="28" fill="#fffbeb" />
        <text x="380" y="48" textAnchor="middle" fill="#b45309" fontSize="22" fontWeight="900">Ativar uma row prepara acessos seguintes na mesma vizinhança</text>
        <rect x="130" y="122" width="260" height="94" rx="22" fill="#ffffff" stroke="#f59e0b" strokeWidth="3" />
        <text x="260" y="176" textAnchor="middle" fill="#b45309" fontSize="20" fontWeight="900">row 27</text>
        <path d="M390 169h80" stroke="#d97706" strokeWidth="4" strokeLinecap="round" />
        <rect x="470" y="122" width="160" height="94" rx="22" fill="#ffffff" stroke="#d97706" strokeWidth="3" />
        <text x="550" y="160" textAnchor="middle" fill="#b45309" fontSize="18" fontWeight="900">row buffer</text>
        <text x="550" y="186" textAnchor="middle" fill="#475569" fontSize="13" fontWeight="700">colunas saem daqui</text>
      </svg>
    </Frame>
  );
}

function RefreshVisual() {
  return (
    <Frame title="Refresh preserva células contra vazamento de carga" tone="emerald">
      <svg className="w-full" viewBox="0 0 760 330" role="img" aria-label="Refresh percorrendo linhas de DRAM">
        <rect width="760" height="330" rx="28" fill="#ecfdf5" />
        <text x="380" y="48" textAnchor="middle" fill="#047857" fontSize="22" fontWeight="900">Manter dados vivos também consome trabalho do sistema</text>
        {Array.from({ length: 5 }).map((_, index) => (
          <rect key={index} x={180} y={100 + index * 36} width="400" height="22" rx="8" fill={index === 2 ? "#86efac" : "#ffffff"} stroke="#34d399" strokeWidth="2" />
        ))}
        <text x="380" y="288" textAnchor="middle" fill="#047857" fontSize="16" fontWeight="800">Linhas são revisitadas para restaurar carga</text>
      </svg>
    </Frame>
  );
}

function DdrBurstVisual() {
  return (
    <Frame title="Transferência em rajadas melhora o aproveitamento do caminho" tone="slate">
      <svg className="w-full" viewBox="0 0 760 320" role="img" aria-label="Burst de dados saindo da memoria">
        <rect width="760" height="320" rx="28" fill="#f8fafc" />
        <text x="380" y="48" textAnchor="middle" fill="#0f172a" fontSize="22" fontWeight="900">Depois de preparar o acesso, vale a pena transferir uma sequência</text>
        {Array.from({ length: 6 }).map((_, index) => (
          <rect key={index} x={150 + index * 78} y="146" width="58" height="46" rx="12" fill="#dbeafe" stroke="#3b82f6" strokeWidth="3" />
        ))}
        <text x="380" y="240" textAnchor="middle" fill="#1d4ed8" fontSize="16" fontWeight="900">burst = vários dados aproveitando a ativação já feita</text>
      </svg>
    </Frame>
  );
}

function HierarchyCompareVisual() {
  return (
    <Frame title="Camadas diferentes servem propósitos diferentes" tone="indigo">
      <svg className="w-full" viewBox="0 0 760 330" role="img" aria-label="Comparacao entre cache, RAM e SSD">
        <rect width="760" height="330" rx="28" fill="#eef2ff" />
        <text x="380" y="48" textAnchor="middle" fill="#3730a3" fontSize="22" fontWeight="900">Cache ≠ RAM ≠ armazenamento persistente</text>
        <Card x={80} y={112} title="Cache" subtitle="pequena e muito rápida" color="#16a34a" />
        <Card x={280} y={112} title="RAM" subtitle="estado ativo principal" color="#d97706" />
        <Card x={480} y={112} title="SSD" subtitle="persistente e mais distante" color="#64748b" />
      </svg>
    </Frame>
  );
}

function RamSoftwareVisual() {
  return (
    <Frame title="Aplicações e sistema operacional cooperam com a memória principal" tone="teal">
      <svg className="w-full" viewBox="0 0 760 320" role="img" aria-label="Software interagindo com a RAM">
        <rect width="760" height="320" rx="28" fill="#f0fdfa" />
        <text x="380" y="48" textAnchor="middle" fill="#0f766e" fontSize="22" fontWeight="900">A forma de acessar dados influencia a pressão sobre a RAM</text>
        <rect x="140" y="120" width="210" height="112" rx="24" fill="#ffffff" stroke="#14b8a6" strokeWidth="3" />
        <text x="245" y="160" textAnchor="middle" fill="#0f766e" fontSize="18" fontWeight="900">aplicação</text>
        <rect x="410" y="120" width="210" height="112" rx="24" fill="#ffffff" stroke="#14b8a6" strokeWidth="3" />
        <text x="515" y="160" textAnchor="middle" fill="#0f766e" fontSize="18" fontWeight="900">SO / páginas</text>
      </svg>
    </Frame>
  );
}

function Frame({
  title,
  tone,
  children,
}: {
  title: string;
  tone: "indigo" | "teal" | "violet" | "rose" | "amber" | "emerald" | "slate";
  children: React.ReactNode;
}) {
  const styles: Record<typeof tone, string> = {
    indigo: "border-indigo-200 bg-indigo-50",
    teal: "border-teal-200 bg-teal-50",
    violet: "border-violet-200 bg-violet-50",
    rose: "border-rose-200 bg-rose-50",
    amber: "border-amber-200 bg-amber-50",
    emerald: "border-emerald-200 bg-emerald-50",
    slate: "border-slate-200 bg-white",
  };

  return (
    <figure className={`rounded-[2rem] border p-4 shadow-xl shadow-slate-900/5 ${styles[tone]}`}>
      <figcaption className="mb-3 text-sm font-black uppercase tracking-[0.16em] text-slate-500">{title}</figcaption>
      {children}
    </figure>
  );
}

function Tier({ x, y, w, h, label, color }: { x: number; y: number; w: number; h: number; label: string; color: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="18" fill="#ffffff" stroke={color} strokeWidth="3" />
      <text x={x + w / 2} y={y + h / 2 + 6} textAnchor="middle" fill={color} fontSize="18" fontWeight="900">{label}</text>
    </g>
  );
}

function Card({ x, y, title, subtitle, color }: { x: number; y: number; title: string; subtitle: string; color: string }) {
  return (
    <g>
      <rect x={x} y={y} width="180" height="94" rx="22" fill="#ffffff" stroke={color} strokeWidth="3" />
      <text x={x + 90} y={y + 38} textAnchor="middle" fill={color} fontSize="20" fontWeight="900">{title}</text>
      <text x={x + 90} y={y + 66} textAnchor="middle" fill="#475569" fontSize="14" fontWeight="700">{subtitle}</text>
    </g>
  );
}
