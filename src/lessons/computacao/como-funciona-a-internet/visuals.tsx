import type { LessonModule } from "../../../types/content";

export const visuals = {
  "internet-hero": InternetHeroVisual,
  "internet-layers": LayersVisual,
  "internet-dns-chain": DnsChainVisual,
  "internet-request-path": RequestPathVisual,
} satisfies LessonModule["visuals"];

function InternetHeroVisual() {
  return (
    <figure className="overflow-hidden rounded-[2rem] border border-sky-200 bg-white p-4 shadow-xl shadow-sky-900/10">
      <svg className="w-full" viewBox="0 0 760 400" role="img" aria-label="Jornada de uma requisição na internet">
        <defs>
          <linearGradient id="internetHeroBg" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#eff6ff" />
            <stop offset="50%" stopColor="#ecfeff" />
            <stop offset="100%" stopColor="#f5f3ff" />
          </linearGradient>
        </defs>
        <rect width="760" height="400" rx="32" fill="url(#internetHeroBg)" />
        <text x="380" y="50" textAnchor="middle" fill="#0f172a" fontSize="26" fontWeight="900">
          Da URL ao conteúdo: uma jornada em camadas
        </text>
        {[
          { x: 60, label: "DNS", color: "#dbeafe" },
          { x: 185, label: "TCP", color: "#bfdbfe" },
          { x: 310, label: "TLS", color: "#ddd6fe" },
          { x: 435, label: "HTTP", color: "#fef3c7" },
          { x: 560, label: "Resposta", color: "#bbf7d0" },
        ].map((step) => (
          <g key={step.label}>
            <rect x={step.x} y="170" width="110" height="60" rx="18" fill={step.color} stroke="#38bdf8" strokeWidth="3" />
            <text x={step.x + 55} y="207" textAnchor="middle" fill="#0f172a" fontSize="18" fontWeight="900">
              {step.label}
            </text>
          </g>
        ))}
        {Array.from({ length: 4 }).map((_, index) => (
          <g key={index}>
            <path d={`M${170 + index * 125} 200h18`} stroke="#475569" strokeWidth="5" strokeLinecap="round" />
            <path d={`M${180 + index * 125} 190l10 10l-10 10`} fill="#475569" />
          </g>
        ))}
      </svg>
    </figure>
  );
}

function LayersVisual() {
  return (
    <figure className="rounded-[2rem] border border-indigo-200 bg-indigo-50 p-4 shadow-xl shadow-indigo-900/5">
      <svg className="w-full" viewBox="0 0 760 330" role="img" aria-label="Camadas simplificadas da internet">
        <rect width="760" height="330" rx="28" fill="#eef2ff" />
        <text x="380" y="44" textAnchor="middle" fill="#3730a3" fontSize="22" fontWeight="900">
          Cada camada responde a uma pergunta diferente
        </text>
        {[
          { y: 90, label: "HTTP — o que a aplicação quer pedir?", fill: "#fef3c7" },
          { y: 138, label: "TLS — como proteger a conversa?", fill: "#fde68a" },
          { y: 186, label: "TCP — como organizar entrega confiável?", fill: "#ddd6fe" },
          { y: 234, label: "IP — como encaminhar pacotes?", fill: "#bfdbfe" },
        ].map((layer) => (
          <g key={layer.label}>
            <rect x="120" y={layer.y} width="520" height="34" rx="12" fill={layer.fill} />
            <text x="380" y={layer.y + 22} textAnchor="middle" fill="#0f172a" fontSize="14" fontWeight="900">
              {layer.label}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  );
}

function DnsChainVisual() {
  return (
    <figure className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-4 shadow-xl shadow-emerald-900/5">
      <svg className="w-full" viewBox="0 0 760 320" role="img" aria-label="Cadeia de resolução DNS">
        <rect width="760" height="320" rx="28" fill="#ecfdf5" />
        <text x="380" y="44" textAnchor="middle" fill="#065f46" fontSize="22" fontWeight="900">
          Resolução DNS: cliente → resolvedor → hierarquia → resposta
        </text>
        {[
          { x: 60, label: "Cliente" },
          { x: 210, label: "Resolvedor" },
          { x: 390, label: "Raiz / TLD" },
          { x: 570, label: "Autoritativo" },
        ].map((node) => (
          <g key={node.label}>
            <rect x={node.x} y="145" width="120" height="56" rx="18" fill="#ffffff" stroke="#10b981" strokeWidth="3" />
            <text x={node.x + 60} y="178" textAnchor="middle" fill="#065f46" fontSize="15" fontWeight="900">
              {node.label}
            </text>
          </g>
        ))}
        {Array.from({ length: 3 }).map((_, index) => (
          <g key={index}>
            <path d={`M${180 + index * 180} 173h18`} stroke="#047857" strokeWidth="5" strokeLinecap="round" />
            <path d={`M${190 + index * 180} 163l10 10l-10 10`} fill="#047857" />
          </g>
        ))}
      </svg>
    </figure>
  );
}

function RequestPathVisual() {
  return (
    <figure className="rounded-[2rem] border border-amber-200 bg-amber-50 p-4 shadow-xl shadow-amber-900/5">
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label="Caminho simplificado dos pacotes até o servidor">
        <rect width="760" height="340" rx="28" fill="#fffbeb" />
        <text x="380" y="44" textAnchor="middle" fill="#92400e" fontSize="22" fontWeight="900">
          O pacote vai por saltos, não por teleporte
        </text>
        {[
          { x: 70, y: 170, label: "Cliente" },
          { x: 210, y: 115, label: "Roteador A" },
          { x: 370, y: 190, label: "Roteador B" },
          { x: 530, y: 125, label: "Roteador C" },
          { x: 630, y: 210, label: "Servidor" },
        ].map((node) => (
          <g key={node.label}>
            <circle cx={node.x} cy={node.y} r="34" fill="#ffffff" stroke="#f59e0b" strokeWidth="3" />
            <text x={node.x} y={node.y + 5} textAnchor="middle" fill="#92400e" fontSize="12" fontWeight="900">
              {node.label}
            </text>
          </g>
        ))}
        <path d="M104 160 C145 142, 170 130, 178 123" stroke="#d97706" strokeWidth="5" fill="none" />
        <path d="M242 127 C292 145, 325 168, 337 181" stroke="#d97706" strokeWidth="5" fill="none" />
        <path d="M403 183 C450 165, 488 147, 498 137" stroke="#d97706" strokeWidth="5" fill="none" />
        <path d="M558 149 C590 175, 608 191, 616 201" stroke="#d97706" strokeWidth="5" fill="none" />
      </svg>
    </figure>
  );
}
