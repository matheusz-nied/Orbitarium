import type { LessonModule } from "../../../types/content";

export const visuals = {
  "logic-gates-hero": LogicGatesHeroVisual,
  "signal-to-bit": SignalToBitVisual,
  "truth-table-visual": TruthTableVisual,
  "gates-family": GatesFamilyVisual,
  "nand-universal-visual": NandUniversalVisual,
  "half-adder-visual": HalfAdderVisual,
  "mux-control-visual": MuxControlVisual,
  "logic-to-cpu-visual": LogicToCpuVisual,
} satisfies LessonModule["visuals"];

function LogicGatesHeroVisual() {
  return (
    <Frame title="Pequenas regras lógicas formam máquinas grandes" tone="indigo">
      <svg className="w-full" viewBox="0 0 760 350" role="img" aria-label="Portas lógicas levando a somador e CPU">
        <rect width="760" height="350" rx="28" fill="#eef2ff" />
        <text x="380" y="48" textAnchor="middle" fill="#3730a3" fontSize="24" fontWeight="900">Portas → circuitos → computador</text>
        <Node x={100} y={120} label="AND" color="#4f46e5" />
        <Node x={260} y={120} label="XOR" color="#7c3aed" />
        <Node x={420} y={120} label="NAND" color="#0f766e" />
        <Node x={580} y={120} label="MUX" color="#d97706" />
        <path d="M150 145h60" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
        <path d="M310 145h60" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
        <path d="M470 145h60" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
        <rect x="235" y="220" width="290" height="86" rx="20" fill="#ffffff" stroke="#6366f1" strokeWidth="3" />
        <text x="380" y="256" textAnchor="middle" fill="#4338ca" fontSize="20" fontWeight="900">ALU / Controle / Registradores</text>
        <text x="380" y="285" textAnchor="middle" fill="#475569" fontSize="14" fontWeight="700">blocos maiores que nascem das mesmas portas</text>
      </svg>
    </Frame>
  );
}

function SignalToBitVisual() {
  return (
    <Frame title="Faixas de tensão são mapeadas para lógica" tone="teal">
      <svg className="w-full" viewBox="0 0 760 320" role="img" aria-label="Faixas de sinal analogico e valores logicos">
        <rect width="760" height="320" rx="28" fill="#f0fdfa" />
        <text x="380" y="48" textAnchor="middle" fill="#0f766e" fontSize="22" fontWeight="900">Não é ausência de física: é abstração sobre a física</text>
        <rect x="120" y="120" width="520" height="44" rx="12" fill="#ffffff" stroke="#99f6e4" strokeWidth="3" />
        <rect x="120" y="120" width="180" height="44" rx="12" fill="#dbeafe" />
        <rect x="460" y="120" width="180" height="44" rx="12" fill="#dcfce7" />
        <text x="210" y="149" textAnchor="middle" fill="#1d4ed8" fontSize="16" fontWeight="900">faixa lógica 0</text>
        <text x="550" y="149" textAnchor="middle" fill="#166534" fontSize="16" fontWeight="900">faixa lógica 1</text>
        <text x="380" y="149" textAnchor="middle" fill="#64748b" fontSize="14" fontWeight="800">transição / indefinição</text>
        <text x="380" y="250" textAnchor="middle" fill="#0f766e" fontSize="16" fontWeight="800">Sistemas digitais funcionam porque separam regiões confiáveis</text>
      </svg>
    </Frame>
  );
}

function TruthTableVisual() {
  const rows = [
    ["0", "0", "0"],
    ["0", "1", "0"],
    ["1", "0", "0"],
    ["1", "1", "1"],
  ];
  return (
    <Frame title="Uma porta pode ser entendida como uma função pequena" tone="violet">
      <svg className="w-full" viewBox="0 0 760 330" role="img" aria-label="Tabela verdade de uma porta AND">
        <rect width="760" height="330" rx="28" fill="#faf5ff" />
        <text x="380" y="48" textAnchor="middle" fill="#6d28d9" fontSize="22" fontWeight="900">Exemplo: tabela-verdade da AND</text>
        {["A", "B", "Saída"].map((label, index) => (
          <rect key={label} x={200 + index * 120} y="92" width="110" height="48" rx="12" fill="#ddd6fe" />
        ))}
        {["A", "B", "Saída"].map((label, index) => (
          <text key={label} x={255 + index * 120} y="122" textAnchor="middle" fill="#5b21b6" fontSize="16" fontWeight="900">{label}</text>
        ))}
        {rows.map((row, rowIndex) =>
          row.map((value, colIndex) => (
            <g key={`${rowIndex}-${colIndex}`}>
              <rect x={200 + colIndex * 120} y={150 + rowIndex * 38} width="110" height="34" rx="10" fill="#ffffff" stroke="#c4b5fd" strokeWidth="2" />
              <text x={255 + colIndex * 120} y={172 + rowIndex * 38} textAnchor="middle" fill="#6d28d9" fontSize="15" fontWeight="900">{value}</text>
            </g>
          )),
        )}
      </svg>
    </Frame>
  );
}

function GatesFamilyVisual() {
  return (
    <Frame title="Cada porta resolve um padrão lógico" tone="rose">
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label="Familia de portas logicas">
        <rect width="760" height="340" rx="28" fill="#fff1f2" />
        <text x="380" y="48" textAnchor="middle" fill="#be123c" fontSize="22" fontWeight="900">AND, OR, NOT, XOR em uma visão operacional</text>
        <GateCard x={70} y={100} title="NOT" subtitle="inverte" color="#e11d48" />
        <GateCard x={240} y={100} title="AND" subtitle="coincidência" color="#2563eb" />
        <GateCard x={410} y={100} title="OR" subtitle="alternativa" color="#0f766e" />
        <GateCard x={580} y={100} title="XOR" subtitle="diferença" color="#d97706" />
      </svg>
    </Frame>
  );
}

function NandUniversalVisual() {
  return (
    <Frame title="Um único tijolo pode reconstruir outros" tone="amber">
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label="NAND como porta universal">
        <rect width="760" height="340" rx="28" fill="#fffbeb" />
        <text x="380" y="48" textAnchor="middle" fill="#b45309" fontSize="22" fontWeight="900">NAND permite construir o resto</text>
        <Node x={110} y={120} label="NAND" color="#d97706" />
        <Node x={270} y={120} label="NOT" color="#ef4444" />
        <Node x={430} y={120} label="AND" color="#2563eb" />
        <Node x={590} y={120} label="OR" color="#0f766e" />
        <path d="M160 145h60" stroke="#92400e" strokeWidth="4" strokeLinecap="round" />
        <path d="M320 145h60" stroke="#92400e" strokeWidth="4" strokeLinecap="round" />
        <path d="M480 145h60" stroke="#92400e" strokeWidth="4" strokeLinecap="round" />
        <text x="380" y="280" textAnchor="middle" fill="#92400e" fontSize="16" fontWeight="800">Universalidade = poder de composição, não simplicidade mágica</text>
      </svg>
    </Frame>
  );
}

function HalfAdderVisual() {
  return (
    <Frame title="Somar dois bits gera dois resultados" tone="emerald">
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label="Meio somador com XOR e AND">
        <rect width="760" height="340" rx="28" fill="#ecfdf5" />
        <text x="380" y="48" textAnchor="middle" fill="#047857" fontSize="22" fontWeight="900">Meio somador = XOR para soma, AND para carry</text>
        <text x="100" y="140" fill="#047857" fontSize="18" fontWeight="900">A</text>
        <text x="100" y="210" fill="#047857" fontSize="18" fontWeight="900">B</text>
        <path d="M120 134h120" stroke="#10b981" strokeWidth="4" strokeLinecap="round" />
        <path d="M120 204h120" stroke="#10b981" strokeWidth="4" strokeLinecap="round" />
        <Node x={240} y={105} label="XOR" color="#7c3aed" />
        <Node x={240} y={190} label="AND" color="#2563eb" />
        <path d="M320 130h160" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
        <path d="M320 215h160" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
        <text x="500" y="135" fill="#5b21b6" fontSize="18" fontWeight="900">Soma</text>
        <text x="500" y="220" fill="#1d4ed8" fontSize="18" fontWeight="900">Carry</text>
      </svg>
    </Frame>
  );
}

function MuxControlVisual() {
  return (
    <Frame title="Circuitos também escolhem caminhos" tone="slate">
      <svg className="w-full" viewBox="0 0 760 330" role="img" aria-label="Multiplexador escolhendo entrada">
        <rect width="760" height="330" rx="28" fill="#f8fafc" />
        <text x="380" y="48" textAnchor="middle" fill="#0f172a" fontSize="22" fontWeight="900">MUX: escolher A ou B conforme o controle</text>
        <rect x="290" y="98" width="180" height="140" rx="24" fill="#ffffff" stroke="#334155" strokeWidth="3" />
        <text x="380" y="156" textAnchor="middle" fill="#0f172a" fontSize="28" fontWeight="900">MUX</text>
        <text x="380" y="188" textAnchor="middle" fill="#475569" fontSize="14" fontWeight="700">seletor</text>
        <path d="M90 130h200" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" />
        <path d="M90 205h200" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" />
        <path d="M470 168h180" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
        <path d="M380 238v50" stroke="#d97706" strokeWidth="4" strokeLinecap="round" />
        <text x="70" y="136" textAnchor="end" fill="#2563eb" fontSize="16" fontWeight="900">A</text>
        <text x="70" y="211" textAnchor="end" fill="#16a34a" fontSize="16" fontWeight="900">B</text>
        <text x="655" y="174" fill="#0f172a" fontSize="16" fontWeight="900">Saída</text>
        <text x="380" y="308" textAnchor="middle" fill="#d97706" fontSize="16" fontWeight="900">controle</text>
      </svg>
    </Frame>
  );
}

function LogicToCpuVisual() {
  return (
    <Frame title="Abstrações maiores escondem as portas" tone="indigo">
      <svg className="w-full" viewBox="0 0 760 330" role="img" aria-label="Portas virando blocos maiores de computador">
        <rect width="760" height="330" rx="28" fill="#eef2ff" />
        <text x="380" y="48" textAnchor="middle" fill="#3730a3" fontSize="22" fontWeight="900">Portas → registradores → ALU → CPU</text>
        <Stage x={90} y={120} label="Portas" />
        <Stage x={250} y={120} label="Registradores" />
        <Stage x={440} y={120} label="ALU" />
        <Stage x={590} y={120} label="CPU" />
        <path d="M180 155h50" stroke="#4f46e5" strokeWidth="4" strokeLinecap="round" />
        <path d="M380 155h40" stroke="#4f46e5" strokeWidth="4" strokeLinecap="round" />
        <path d="M530 155h40" stroke="#4f46e5" strokeWidth="4" strokeLinecap="round" />
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

function Node({ x, y, label, color }: { x: number; y: number; label: string; color: string }) {
  return (
    <g>
      <rect x={x} y={y} width="90" height="50" rx="16" fill="#ffffff" stroke={color} strokeWidth="3" />
      <text x={x + 45} y={y + 31} textAnchor="middle" fill={color} fontSize="16" fontWeight="900">{label}</text>
    </g>
  );
}

function GateCard({ x, y, title, subtitle, color }: { x: number; y: number; title: string; subtitle: string; color: string }) {
  return (
    <g>
      <rect x={x} y={y} width="120" height="110" rx="18" fill="#ffffff" stroke={color} strokeWidth="3" />
      <text x={x + 60} y={y + 42} textAnchor="middle" fill={color} fontSize="22" fontWeight="900">{title}</text>
      <text x={x + 60} y={y + 74} textAnchor="middle" fill="#475569" fontSize="14" fontWeight="700">{subtitle}</text>
    </g>
  );
}

function Stage({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <g>
      <rect x={x} y={y} width="120" height="70" rx="18" fill="#ffffff" stroke="#6366f1" strokeWidth="3" />
      <text x={x + 60} y={y + 43} textAnchor="middle" fill="#4338ca" fontSize="18" fontWeight="900">{label}</text>
    </g>
  );
}
