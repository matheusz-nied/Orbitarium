import type { LessonModule } from "../../../types/content";

export const visuals = {
  "cpu-hero": CpuHeroVisual,
  "cpu-role-visual": CpuRoleVisual,
  "isa-visual": IsaVisual,
  "instruction-cycle-visual": InstructionCycleVisual,
  "registers-visual": RegistersVisual,
  "alu-control-visual": AluControlVisual,
  "memory-branch-visual": MemoryBranchVisual,
  "clock-visual": ClockVisual,
} satisfies LessonModule["visuals"];

function CpuHeroVisual() {
  return (
    <Frame title="CPU como coordenadora de dados e decisões" tone="indigo">
      <svg className="w-full" viewBox="0 0 760 360" role="img" aria-label="Visão geral de uma CPU com registradores, ALU e controle">
        <rect width="760" height="360" rx="28" fill="#eef2ff" />
        <text x="380" y="48" textAnchor="middle" fill="#3730a3" fontSize="24" fontWeight="900">Programa entra como instruções; sai como estado atualizado</text>
        <rect x="205" y="92" width="350" height="190" rx="28" fill="#ffffff" stroke="#6366f1" strokeWidth="4" />
        <rect x="235" y="122" width="120" height="56" rx="16" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="3" />
        <text x="295" y="157" textAnchor="middle" fill="#4338ca" fontSize="18" fontWeight="900">Controle</text>
        <rect x="405" y="122" width="120" height="56" rx="16" fill="#dcfce7" stroke="#16a34a" strokeWidth="3" />
        <text x="465" y="157" textAnchor="middle" fill="#166534" fontSize="18" fontWeight="900">ALU</text>
        <rect x="265" y="205" width="230" height="48" rx="16" fill="#fef3c7" stroke="#d97706" strokeWidth="3" />
        <text x="380" y="235" textAnchor="middle" fill="#92400e" fontSize="18" fontWeight="900">Banco de registradores</text>
        <text x="100" y="165" textAnchor="middle" fill="#3730a3" fontSize="18" fontWeight="900">Instruções</text>
        <path d="M130 165h70" stroke="#64748b" strokeWidth="5" strokeLinecap="round" />
        <text x="660" y="165" textAnchor="middle" fill="#3730a3" fontSize="18" fontWeight="900">Resultados</text>
        <path d="M555 165h70" stroke="#64748b" strokeWidth="5" strokeLinecap="round" />
      </svg>
    </Frame>
  );
}

function CpuRoleVisual() {
  return (
    <Frame title="A CPU coordena caminhos e operações" tone="teal">
      <svg className="w-full" viewBox="0 0 760 320" role="img" aria-label="CPU recebendo instruções, dados e produzindo novo estado">
        <rect width="760" height="320" rx="28" fill="#f0fdfa" />
        <text x="380" y="48" textAnchor="middle" fill="#0f766e" fontSize="22" fontWeight="900">Executar um programa = repetir ciclos controlados</text>
        <rect x="270" y="100" width="220" height="110" rx="28" fill="#ffffff" stroke="#0f766e" strokeWidth="4" />
        <text x="380" y="160" textAnchor="middle" fill="#0f766e" fontSize="28" fontWeight="900">CPU</text>
        <Arrow x1={90} y1={125} x2={270} y2={125} label="instrução" />
        <Arrow x1={90} y1={195} x2={270} y2={195} label="dados" />
        <Arrow x1={490} y1={125} x2={670} y2={125} label="resultado" />
        <Arrow x1={490} y1={195} x2={670} y2={195} label="novo estado" />
      </svg>
    </Frame>
  );
}

function IsaVisual() {
  return (
    <Frame title="ISA como contrato estável" tone="violet">
      <svg className="w-full" viewBox="0 0 760 330" role="img" aria-label="Software, ISA e implementacoes diferentes">
        <rect width="760" height="330" rx="28" fill="#faf5ff" />
        <text x="380" y="48" textAnchor="middle" fill="#6d28d9" fontSize="22" fontWeight="900">Software fala com a ISA, não com transistores individuais</text>
        <Stage x={90} y={112} title="Programa" />
        <Stage x={290} y={112} title="ISA" />
        <Stage x={490} y={82} title="CPU A" />
        <Stage x={490} y={162} title="CPU B" />
        <path d="M180 147h90" stroke="#7c3aed" strokeWidth="4" strokeLinecap="round" />
        <path d="M380 147h90" stroke="#7c3aed" strokeWidth="4" strokeLinecap="round" />
        <path d="M380 147c55 0 55 -40 90 -40" stroke="#7c3aed" strokeWidth="4" fill="none" />
        <path d="M380 147c55 0 55 40 90 40" stroke="#7c3aed" strokeWidth="4" fill="none" />
      </svg>
    </Frame>
  );
}

function InstructionCycleVisual() {
  const stages = [
    { x: 110, y: 145, label: "Fetch", color: "#2563eb" },
    { x: 290, y: 145, label: "Decode", color: "#7c3aed" },
    { x: 470, y: 145, label: "Execute", color: "#16a34a" },
  ];
  return (
    <Frame title="O ciclo de instrução como mapa mental" tone="amber">
      <svg className="w-full" viewBox="0 0 760 330" role="img" aria-label="Fetch decode execute">
        <rect width="760" height="330" rx="28" fill="#fffbeb" />
        <text x="380" y="48" textAnchor="middle" fill="#b45309" fontSize="22" fontWeight="900">A execução pode ser quebrada em etapas legíveis</text>
        {stages.map((stage, index) => (
          <g key={stage.label}>
            <circle cx={stage.x} cy={stage.y} r="54" fill="#ffffff" stroke={stage.color} strokeWidth="4" />
            <text x={stage.x} y={stage.y + 6} textAnchor="middle" fill={stage.color} fontSize="20" fontWeight="900">{stage.label}</text>
            {index < stages.length - 1 ? (
              <path d={`M${stage.x + 54} ${stage.y}h72`} stroke="#64748b" strokeWidth="5" strokeLinecap="round" />
            ) : null}
          </g>
        ))}
        <rect x="590" y="100" width="110" height="90" rx="20" fill="#ffffff" stroke="#d97706" strokeWidth="3" />
        <text x="645" y="138" textAnchor="middle" fill="#b45309" fontSize="16" fontWeight="900">Write back</text>
        <text x="645" y="164" textAnchor="middle" fill="#475569" fontSize="13" fontWeight="700">quando necessário</text>
      </svg>
    </Frame>
  );
}

function RegistersVisual() {
  return (
    <Frame title="Registradores são a bancada rápida da CPU" tone="rose">
      <svg className="w-full" viewBox="0 0 760 330" role="img" aria-label="Banco de registradores">
        <rect width="760" height="330" rx="28" fill="#fff1f2" />
        <text x="380" y="48" textAnchor="middle" fill="#be123c" fontSize="22" fontWeight="900">Poucos slots, acesso rápido, uso intenso</text>
        {["R0", "R1", "R2", "R3", "R4", "R5"].map((name, index) => (
          <g key={name}>
            <rect x={120 + (index % 3) * 170} y={100 + Math.floor(index / 3) * 92} width="140" height="62" rx="18" fill="#ffffff" stroke="#f43f5e" strokeWidth="3" />
            <text x={190 + (index % 3) * 170} y={128 + Math.floor(index / 3) * 92} textAnchor="middle" fill="#be123c" fontSize="18" fontWeight="900">{name}</text>
            <text x={190 + (index % 3) * 170} y={151 + Math.floor(index / 3) * 92} textAnchor="middle" fill="#475569" fontSize="13" fontWeight="700">valor temporário</text>
          </g>
        ))}
      </svg>
    </Frame>
  );
}

function AluControlVisual() {
  return (
    <Frame title="Dados fluem, controle coreografa" tone="emerald">
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label="Datapath e sinais de controle">
        <rect width="760" height="340" rx="28" fill="#ecfdf5" />
        <text x="380" y="48" textAnchor="middle" fill="#047857" fontSize="22" fontWeight="900">ALU e controle se complementam</text>
        <rect x="130" y="120" width="160" height="70" rx="20" fill="#ffffff" stroke="#f59e0b" strokeWidth="3" />
        <text x="210" y="162" textAnchor="middle" fill="#b45309" fontSize="18" fontWeight="900">Registradores</text>
        <rect x="310" y="120" width="140" height="70" rx="20" fill="#ffffff" stroke="#16a34a" strokeWidth="3" />
        <text x="380" y="162" textAnchor="middle" fill="#166534" fontSize="18" fontWeight="900">ALU</text>
        <rect x="470" y="92" width="160" height="70" rx="20" fill="#ffffff" stroke="#4f46e5" strokeWidth="3" />
        <text x="550" y="135" textAnchor="middle" fill="#4338ca" fontSize="18" fontWeight="900">Controle</text>
        <path d="M290 155h20" stroke="#64748b" strokeWidth="4" />
        <path d="M450 155h120" stroke="#64748b" strokeWidth="4" />
        <path d="M550 162v60h-170v-32" stroke="#4f46e5" strokeWidth="4" fill="none" />
      </svg>
    </Frame>
  );
}

function MemoryBranchVisual() {
  return (
    <Frame title="Memória e desvios introduzem espera e incerteza" tone="slate">
      <svg className="w-full" viewBox="0 0 760 330" role="img" aria-label="Comparacao entre caminho simples e branch load">
        <rect width="760" height="330" rx="28" fill="#f8fafc" />
        <text x="380" y="48" textAnchor="middle" fill="#0f172a" fontSize="22" fontWeight="900">Nem toda instrução flui do mesmo jeito</text>
        <Stage x={90} y={118} title="ADD" />
        <Stage x={280} y={118} title="LOAD" />
        <Stage x={470} y={118} title="BRANCH" />
        <text x="150" y="234" textAnchor="middle" fill="#16a34a" fontSize="14" fontWeight="900">cálculo local</text>
        <text x="340" y="234" textAnchor="middle" fill="#d97706" fontSize="14" fontWeight="900">espera memória</text>
        <text x="530" y="234" textAnchor="middle" fill="#2563eb" fontSize="14" fontWeight="900">muda caminho</text>
      </svg>
    </Frame>
  );
}

function ClockVisual() {
  return (
    <Frame title="Clock marca cadência, mas não conta a história inteira" tone="indigo">
      <svg className="w-full" viewBox="0 0 760 320" role="img" aria-label="Clock e desempenho">
        <rect width="760" height="320" rx="28" fill="#eef2ff" />
        <text x="380" y="48" textAnchor="middle" fill="#3730a3" fontSize="22" fontWeight="900">Mais ciclos por segundo não bastam sem bom fluxo de dados</text>
        <path d="M90 210c40 -80 80 80 120 0s80 -80 120 0s80 80 120 0s80 -80 120 0s80 80 120 0" stroke="#4f46e5" strokeWidth="5" fill="none" />
        <text x="190" y="108" textAnchor="middle" fill="#475569" fontSize="14" fontWeight="700">clock</text>
        <rect x="250" y="240" width="260" height="42" rx="14" fill="#ffffff" stroke="#6366f1" strokeWidth="3" />
        <text x="380" y="267" textAnchor="middle" fill="#4338ca" fontSize="14" fontWeight="800">desempenho = frequência × trabalho útil por ciclo</text>
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

function Arrow({ x1, y1, x2, y2, label }: { x1: number; y1: number; x2: number; y2: number; label: string }) {
  return (
    <g>
      <path d={`M${x1} ${y1}H${x2}`} stroke="#64748b" strokeWidth="5" strokeLinecap="round" />
      <text x={(x1 + x2) / 2} y={y1 - 10} textAnchor="middle" fill="#475569" fontSize="13" fontWeight="700">{label}</text>
    </g>
  );
}

function Stage({ x, y, title }: { x: number; y: number; title: string }) {
  return (
    <g>
      <rect x={x} y={y} width="150" height="58" rx="18" fill="#ffffff" stroke="#8b5cf6" strokeWidth="3" />
      <text x={x + 75} y={y + 36} textAnchor="middle" fill="#6d28d9" fontSize="18" fontWeight="900">{title}</text>
    </g>
  );
}
