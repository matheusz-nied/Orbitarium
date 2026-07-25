import type { LessonModule } from "../../../types/content";

export const visuals = {
  "memory-hero": MemoryHeroVisual,
  "address-space-visual": AddressSpaceVisual,
  "stack-frame-visual": StackFrameVisual,
  "heap-visual": HeapVisual,
  "pointer-visual": PointerVisual,
  "lifetime-visual": LifetimeVisual,
  "bug-visual": BugVisual,
  "tooling-visual": ToolingVisual,
} satisfies LessonModule["visuals"];

function MemoryHeroVisual() {
  return (
    <Frame title="Stack, heap e ponteiros são geografia + tempo" tone="indigo">
      <svg className="w-full" viewBox="0 0 760 360" role="img" aria-label="Mapa geral de stack, heap e ponteiro">
        <rect width="760" height="360" rx="28" fill="#eef2ff" />
        <text x="380" y="48" textAnchor="middle" fill="#3730a3" fontSize="24" fontWeight="900">Endereços, regiões e duração explicam o comportamento da memória</text>
        <rect x="90" y="92" width="190" height="210" rx="24" fill="#ffffff" stroke="#4f46e5" strokeWidth="4" />
        <text x="185" y="124" textAnchor="middle" fill="#4338ca" fontSize="20" fontWeight="900">Stack</text>
        <rect x="125" y="146" width="120" height="36" rx="10" fill="#e0e7ff" />
        <rect x="125" y="190" width="120" height="36" rx="10" fill="#c7d2fe" />
        <rect x="125" y="234" width="120" height="36" rx="10" fill="#a5b4fc" />
        <rect x="485" y="92" width="190" height="210" rx="24" fill="#ffffff" stroke="#16a34a" strokeWidth="4" />
        <text x="580" y="124" textAnchor="middle" fill="#166534" fontSize="20" fontWeight="900">Heap</text>
        <rect x="520" y="152" width="56" height="46" rx="10" fill="#dcfce7" />
        <rect x="596" y="182" width="44" height="34" rx="10" fill="#bbf7d0" />
        <rect x="530" y="236" width="92" height="38" rx="10" fill="#86efac" />
        <rect x="316" y="160" width="120" height="56" rx="18" fill="#ffffff" stroke="#d97706" strokeWidth="3" />
        <text x="376" y="195" textAnchor="middle" fill="#b45309" fontSize="18" fontWeight="900">ponteiro</text>
        <path d="M436 188h78" stroke="#d97706" strokeWidth="4" strokeLinecap="round" />
        <path d="M506 180l12 8l-12 8" fill="#d97706" />
      </svg>
    </Frame>
  );
}

function AddressSpaceVisual() {
  return (
    <Frame title="Um processo enxerga regiões com papéis diferentes" tone="teal">
      <svg className="w-full" viewBox="0 0 760 360" role="img" aria-label="Espaco de enderecamento com codigo, dados, heap e stack">
        <rect width="760" height="360" rx="28" fill="#f0fdfa" />
        <text x="380" y="48" textAnchor="middle" fill="#0f766e" fontSize="22" fontWeight="900">Modelo conceitual do espaço de memória de um processo</text>
        <rect x="285" y="88" width="190" height="230" rx="24" fill="#ffffff" stroke="#14b8a6" strokeWidth="4" />
        <Segment y={102} h={46} label="código" fill="#ccfbf1" />
        <Segment y={152} h={46} label="dados globais" fill="#99f6e4" />
        <Segment y={202} h={46} label="heap" fill="#5eead4" />
        <Segment y={252} h={52} label="stack" fill="#2dd4bf" />
      </svg>
    </Frame>
  );
}

function StackFrameVisual() {
  return (
    <Frame title="Cada chamada empilha um novo contexto" tone="violet">
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label="Frames de stack empilhados">
        <rect width="760" height="340" rx="28" fill="#faf5ff" />
        <text x="380" y="48" textAnchor="middle" fill="#6d28d9" fontSize="22" fontWeight="900">main → foo → bar = três frames vivos</text>
        <FrameBox x={270} y={220} w={220} h={62} title="bar()" body="variáveis locais atuais" color="#7c3aed" />
        <FrameBox x={250} y={150} w={260} h={62} title="foo()" body="endereço de retorno + locais" color="#8b5cf6" />
        <FrameBox x={230} y={80} w={300} h={62} title="main()" body="contexto mais antigo ainda ativo" color="#a78bfa" />
      </svg>
    </Frame>
  );
}

function HeapVisual() {
  return (
    <Frame title="A heap não segue entrada/saída de função automaticamente" tone="rose">
      <svg className="w-full" viewBox="0 0 760 330" role="img" aria-label="Blocos alocados na heap">
        <rect width="760" height="330" rx="28" fill="#fff1f2" />
        <text x="380" y="48" textAnchor="middle" fill="#be123c" fontSize="22" fontWeight="900">Blocos podem nascer e morrer em ordens diferentes</text>
        <rect x="100" y="110" width="560" height="160" rx="28" fill="#ffffff" stroke="#f43f5e" strokeWidth="3" />
        <rect x="130" y="144" width="120" height="52" rx="12" fill="#ffe4e6" stroke="#fb7185" strokeWidth="2" />
        <rect x="280" y="214" width="90" height="34" rx="10" fill="#fecdd3" stroke="#fb7185" strokeWidth="2" />
        <rect x="410" y="150" width="160" height="60" rx="14" fill="#fda4af" stroke="#e11d48" strokeWidth="2" />
        <text x="490" y="246" textAnchor="middle" fill="#be123c" fontSize="14" fontWeight="800">duração flexível, gestão mais complexa</text>
      </svg>
    </Frame>
  );
}

function PointerVisual() {
  return (
    <Frame title="Ponteiro guarda coordenada, não conteúdo final" tone="amber">
      <svg className="w-full" viewBox="0 0 760 330" role="img" aria-label="Ponteiro apontando para valor em memoria">
        <rect width="760" height="330" rx="28" fill="#fffbeb" />
        <text x="380" y="48" textAnchor="middle" fill="#b45309" fontSize="22" fontWeight="900">Indireção: primeiro o endereço, depois o dado</text>
        <rect x="120" y="138" width="160" height="62" rx="18" fill="#ffffff" stroke="#d97706" strokeWidth="3" />
        <text x="200" y="170" textAnchor="middle" fill="#b45309" fontSize="18" fontWeight="900">p = 0x1008</text>
        <path d="M280 169h150" stroke="#d97706" strokeWidth="4" strokeLinecap="round" />
        <path d="M422 161l12 8l-12 8" fill="#d97706" />
        <rect x="440" y="118" width="150" height="102" rx="20" fill="#ffffff" stroke="#16a34a" strokeWidth="3" />
        <text x="515" y="156" textAnchor="middle" fill="#166534" fontSize="16" fontWeight="900">endereço 0x1008</text>
        <text x="515" y="188" textAnchor="middle" fill="#166534" fontSize="28" fontWeight="900">42</text>
      </svg>
    </Frame>
  );
}

function LifetimeVisual() {
  return (
    <Frame title="Lugar e tempo precisam combinar" tone="emerald">
      <svg className="w-full" viewBox="0 0 760 330" role="img" aria-label="Linha do tempo de stack e heap">
        <rect width="760" height="330" rx="28" fill="#ecfdf5" />
        <text x="380" y="48" textAnchor="middle" fill="#047857" fontSize="22" fontWeight="900">Dados podem continuar vivos além do escopo local — ou não</text>
        <path d="M110 220h540" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
        <rect x="150" y="150" width="170" height="42" rx="12" fill="#c7d2fe" />
        <text x="235" y="177" textAnchor="middle" fill="#4338ca" fontSize="14" fontWeight="900">variável local</text>
        <rect x="270" y="96" width="280" height="42" rx="12" fill="#bbf7d0" />
        <text x="410" y="123" textAnchor="middle" fill="#166534" fontSize="14" fontWeight="900">objeto alocado na heap</text>
        <text x="640" y="246" textAnchor="end" fill="#475569" fontSize="14" fontWeight="700">tempo →</text>
      </svg>
    </Frame>
  );
}

function BugVisual() {
  return (
    <Frame title="O ponteiro sobrevive, o objeto não" tone="slate">
      <svg className="w-full" viewBox="0 0 760 330" role="img" aria-label="Use after free representado visualmente">
        <rect width="760" height="330" rx="28" fill="#f8fafc" />
        <text x="380" y="48" textAnchor="middle" fill="#0f172a" fontSize="22" fontWeight="900">Dangling pointer: endereço antigo, significado quebrado</text>
        <rect x="120" y="132" width="150" height="62" rx="18" fill="#ffffff" stroke="#f59e0b" strokeWidth="3" />
        <text x="195" y="170" textAnchor="middle" fill="#b45309" fontSize="18" fontWeight="900">p = 0x2040</text>
        <path d="M270 163h120" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />
        <path d="M382 155l12 8l-12 8" fill="#f59e0b" />
        <rect x="400" y="118" width="180" height="90" rx="20" fill="#fee2e2" stroke="#ef4444" strokeWidth="3" strokeDasharray="8 8" />
        <text x="490" y="165" textAnchor="middle" fill="#991b1b" fontSize="18" fontWeight="900">bloco já liberado</text>
      </svg>
    </Frame>
  );
}

function ToolingVisual() {
  return (
    <Frame title="Ferramentas e linguagens tentam colocar guard-rails" tone="indigo">
      <svg className="w-full" viewBox="0 0 760 320" role="img" aria-label="Ferramentas de mitigacao para bugs de memoria">
        <rect width="760" height="320" rx="28" fill="#eef2ff" />
        <text x="380" y="48" textAnchor="middle" fill="#3730a3" fontSize="22" fontWeight="900">Tipos, ownership, GC e sanitizers atacam o problema por ângulos diferentes</text>
        <Badge x={90} y={118} label="ownership" color="#4f46e5" />
        <Badge x={250} y={118} label="GC" color="#16a34a" />
        <Badge x={410} y={118} label="asan" color="#d97706" />
        <Badge x={570} y={118} label="tipos" color="#7c3aed" />
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

function Segment({ y, h, label, fill }: { y: number; h: number; label: string; fill: string }) {
  return (
    <g>
      <rect x="300" y={y} width="160" height={h} rx="12" fill={fill} />
      <text x="380" y={y + h / 2 + 5} textAnchor="middle" fill="#0f172a" fontSize="16" fontWeight="900">{label}</text>
    </g>
  );
}

function FrameBox({
  x,
  y,
  w,
  h,
  title,
  body,
  color,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  body: string;
  color: string;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="18" fill="#ffffff" stroke={color} strokeWidth="3" />
      <text x={x + w / 2} y={y + 26} textAnchor="middle" fill={color} fontSize="18" fontWeight="900">{title}</text>
      <text x={x + w / 2} y={y + 48} textAnchor="middle" fill="#475569" fontSize="13" fontWeight="700">{body}</text>
    </g>
  );
}

function Badge({ x, y, label, color }: { x: number; y: number; label: string; color: string }) {
  return (
    <g>
      <rect x={x} y={y} width="110" height="70" rx="20" fill="#ffffff" stroke={color} strokeWidth="3" />
      <text x={x + 55} y={y + 42} textAnchor="middle" fill={color} fontSize="18" fontWeight="900">{label}</text>
    </g>
  );
}
