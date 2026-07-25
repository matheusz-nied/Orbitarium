import type { LessonModule } from "../../../types/content";

export const visuals = {
  "cache-hero": CacheHeroVisual,
  "memory-wall-visual": MemoryWallVisual,
  "locality-visual": LocalityVisual,
  "cache-line-visual": CacheLineVisual,
  "hit-miss-visual": HitMissVisual,
  "mapping-visual": MappingVisual,
  "stride-visual": StrideVisual,
  "policy-visual": PolicyVisual,
  "software-link-visual": SoftwareLinkVisual,
} satisfies LessonModule["visuals"];

function CacheHeroVisual() {
  return (
    <Frame title="O gargalo não é só calcular; é alimentar a CPU" tone="indigo">
      <svg className="w-full" viewBox="0 0 760 360" role="img" aria-label="Hierarquia de memoria com CPU e cache">
        <rect width="760" height="360" rx="28" fill="#eef2ff" />
        <text x="380" y="48" textAnchor="middle" fill="#3730a3" fontSize="24" fontWeight="900">Cache aproxima dados quentes da CPU</text>
        <Layer x={310} y={90} w={140} h={48} label="CPU" color="#4f46e5" />
        <Layer x={285} y={152} w={190} h={48} label="L1 / L2 / L3" color="#16a34a" />
        <Layer x={250} y={214} w={260} h={54} label="RAM" color="#d97706" />
        <path d="M380 138v14" stroke="#64748b" strokeWidth="4" />
        <path d="M380 200v14" stroke="#64748b" strokeWidth="4" />
      </svg>
    </Frame>
  );
}

function MemoryWallVisual() {
  return (
    <Frame title="Níveis diferentes tentam equilibrar velocidade e capacidade" tone="teal">
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label="Escada da hierarquia de memoria">
        <rect width="760" height="340" rx="28" fill="#f0fdfa" />
        <text x="380" y="48" textAnchor="middle" fill="#0f766e" fontSize="22" fontWeight="900">Quanto mais perto da CPU, menor e mais rápido</text>
        <Step x={130} y={220} w={500} h={48} label="RAM: maior, mais lenta" color="#0f766e" />
        <Step x={180} y={165} w={400} h={42} label="Cache: menor, mais rápida" color="#14b8a6" />
        <Step x={250} y={112} w={260} h={36} label="Registradores: minúsculos e muito rápidos" color="#2dd4bf" />
      </svg>
    </Frame>
  );
}

function LocalityVisual() {
  return (
    <Frame title="Localidade é o hábito que o cache explora" tone="violet">
      <svg className="w-full" viewBox="0 0 760 330" role="img" aria-label="Localidade temporal e espacial">
        <rect width="760" height="330" rx="28" fill="#faf5ff" />
        <text x="380" y="48" textAnchor="middle" fill="#6d28d9" fontSize="22" fontWeight="900">Reuso no tempo e vizinhança no espaço</text>
        <rect x="80" y="108" width="250" height="150" rx="24" fill="#ffffff" stroke="#8b5cf6" strokeWidth="3" />
        <text x="205" y="138" textAnchor="middle" fill="#6d28d9" fontSize="18" fontWeight="900">Temporal</text>
        <text x="205" y="178" textAnchor="middle" fill="#475569" fontSize="14" fontWeight="700">usa A, depois A de novo</text>
        <rect x="430" y="108" width="250" height="150" rx="24" fill="#ffffff" stroke="#8b5cf6" strokeWidth="3" />
        <text x="555" y="138" textAnchor="middle" fill="#6d28d9" fontSize="18" fontWeight="900">Espacial</text>
        <text x="555" y="178" textAnchor="middle" fill="#475569" fontSize="14" fontWeight="700">usa A, depois A+1, A+2...</text>
      </svg>
    </Frame>
  );
}

function CacheLineVisual() {
  return (
    <Frame title="Uma linha traz o dado pedido e seus vizinhos" tone="rose">
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label="Linha de cache trazendo varios bytes">
        <rect width="760" height="340" rx="28" fill="#fff1f2" />
        <text x="380" y="48" textAnchor="middle" fill="#be123c" fontSize="22" fontWeight="900">O cache pensa em blocos, não em bytes isolados</text>
        {Array.from({ length: 8 }).map((_, index) => (
          <g key={index}>
            <rect x={120 + index * 66} y="140" width="56" height="56" rx="12" fill={index === 3 ? "#fb7185" : "#ffffff"} stroke="#f43f5e" strokeWidth="3" />
            <text x={148 + index * 66} y="173" textAnchor="middle" fill={index === 3 ? "#ffffff" : "#be123c"} fontSize="16" fontWeight="900">{index}</text>
          </g>
        ))}
        <text x="380" y="248" textAnchor="middle" fill="#be123c" fontSize="16" fontWeight="800">Acesso ao byte 3 costuma trazer a linha inteira</text>
      </svg>
    </Frame>
  );
}

function HitMissVisual() {
  return (
    <Frame title="A instrução é a mesma; o tempo não" tone="amber">
      <svg className="w-full" viewBox="0 0 760 330" role="img" aria-label="Comparacao hit e miss">
        <rect width="760" height="330" rx="28" fill="#fffbeb" />
        <text x="380" y="48" textAnchor="middle" fill="#b45309" fontSize="22" fontWeight="900">Hit mantém fluxo; miss introduz espera</text>
        <Card x={100} y={110} title="Hit" subtitle="dado já estava perto" color="#16a34a" />
        <Card x={430} y={110} title="Miss" subtitle="precisa buscar abaixo" color="#ef4444" />
      </svg>
    </Frame>
  );
}

function MappingVisual() {
  return (
    <Frame title="Endereço vira índice e tag" tone="emerald">
      <svg className="w-full" viewBox="0 0 760 330" role="img" aria-label="Endereco dividido em indice e tag">
        <rect width="760" height="330" rx="28" fill="#ecfdf5" />
        <text x="380" y="48" textAnchor="middle" fill="#047857" fontSize="22" fontWeight="900">O cache procura rápido porque não busca em todo lugar</text>
        <rect x="110" y="130" width="170" height="66" rx="16" fill="#dcfce7" stroke="#16a34a" strokeWidth="3" />
        <rect x="290" y="130" width="170" height="66" rx="16" fill="#dbeafe" stroke="#2563eb" strokeWidth="3" />
        <rect x="470" y="130" width="170" height="66" rx="16" fill="#fee2e2" stroke="#ef4444" strokeWidth="3" />
        <text x="195" y="170" textAnchor="middle" fill="#166534" fontSize="18" fontWeight="900">tag</text>
        <text x="375" y="170" textAnchor="middle" fill="#1d4ed8" fontSize="18" fontWeight="900">índice</text>
        <text x="555" y="170" textAnchor="middle" fill="#991b1b" fontSize="18" fontWeight="900">offset</text>
      </svg>
    </Frame>
  );
}

function StrideVisual() {
  return (
    <Frame title="Padrões diferentes percorrem a memória de formas diferentes" tone="slate">
      <svg className="w-full" viewBox="0 0 760 330" role="img" aria-label="Acesso linear versus acesso espaçado">
        <rect width="760" height="330" rx="28" fill="#f8fafc" />
        <text x="380" y="48" textAnchor="middle" fill="#0f172a" fontSize="22" fontWeight="900">Acesso contíguo reaproveita melhor as linhas</text>
        {Array.from({ length: 10 }).map((_, index) => (
          <rect key={index} x={90 + index * 58} y="150" width="46" height="46" rx="10" fill={index < 5 ? "#dbeafe" : "#ffffff"} stroke="#94a3b8" strokeWidth="2" />
        ))}
        <text x="240" y="228" textAnchor="middle" fill="#1d4ed8" fontSize="14" fontWeight="900">varrendo sequência</text>
        <text x="560" y="228" textAnchor="middle" fill="#475569" fontSize="14" fontWeight="900">saltando posições</text>
      </svg>
    </Frame>
  );
}

function PolicyVisual() {
  return (
    <Frame title="Quando entra um bloco novo, outro sai" tone="indigo">
      <svg className="w-full" viewBox="0 0 760 320" role="img" aria-label="Substituicao de linhas de cache">
        <rect width="760" height="320" rx="28" fill="#eef2ff" />
        <text x="380" y="48" textAnchor="middle" fill="#3730a3" fontSize="22" fontWeight="900">Espaço finito obriga políticas de escolha</text>
        <Card x={120} y={112} title="linha A" subtitle="já ocupando espaço" color="#4f46e5" />
        <text x="380" y="152" textAnchor="middle" fill="#64748b" fontSize="18" fontWeight="900">⇄</text>
        <Card x={450} y={112} title="linha nova" subtitle="quer entrar no cache" color="#7c3aed" />
      </svg>
    </Frame>
  );
}

function SoftwareLinkVisual() {
  return (
    <Frame title="Layout e ordem de acesso são decisões de software" tone="teal">
      <svg className="w-full" viewBox="0 0 760 320" role="img" aria-label="Software organizando dados em blocos">
        <rect width="760" height="320" rx="28" fill="#f0fdfa" />
        <text x="380" y="48" textAnchor="middle" fill="#0f766e" fontSize="22" fontWeight="900">Programar bem também é programar para a memória</text>
        <rect x="130" y="112" width="200" height="110" rx="24" fill="#ffffff" stroke="#14b8a6" strokeWidth="3" />
        <text x="230" y="152" textAnchor="middle" fill="#0f766e" fontSize="18" fontWeight="900">dados contíguos</text>
        <rect x="430" y="112" width="200" height="110" rx="24" fill="#ffffff" stroke="#14b8a6" strokeWidth="3" />
        <text x="530" y="152" textAnchor="middle" fill="#0f766e" fontSize="18" fontWeight="900">blocos / batching</text>
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

function Layer({ x, y, w, h, label, color }: { x: number; y: number; w: number; h: number; label: string; color: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="18" fill="#ffffff" stroke={color} strokeWidth="3" />
      <text x={x + w / 2} y={y + h / 2 + 6} textAnchor="middle" fill={color} fontSize="18" fontWeight="900">{label}</text>
    </g>
  );
}

function Step({ x, y, w, h, label, color }: { x: number; y: number; w: number; h: number; label: string; color: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="18" fill="#ffffff" stroke={color} strokeWidth="3" />
      <text x={x + w / 2} y={y + h / 2 + 5} textAnchor="middle" fill={color} fontSize="16" fontWeight="900">{label}</text>
    </g>
  );
}

function Card({ x, y, title, subtitle, color }: { x: number; y: number; title: string; subtitle: string; color: string }) {
  return (
    <g>
      <rect x={x} y={y} width="220" height="92" rx="22" fill="#ffffff" stroke={color} strokeWidth="3" />
      <text x={x + 110} y={y + 38} textAnchor="middle" fill={color} fontSize="20" fontWeight="900">{title}</text>
      <text x={x + 110} y={y + 64} textAnchor="middle" fill="#475569" fontSize="14" fontWeight="700">{subtitle}</text>
    </g>
  );
}
