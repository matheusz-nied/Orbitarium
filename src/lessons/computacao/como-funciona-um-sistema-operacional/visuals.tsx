import type { LessonModule } from "../../../types/content";

export const visuals = {
  "so-hero": SoHeroVisual,
  "so-abstracoes": SoAbstracoesVisual,
  "so-servicos": SoServicosVisual,
  "so-fronteira": SoFronteiraVisual,
  "so-scheduler": SoSchedulerVisual,
} satisfies LessonModule["visuals"];

function SoHeroVisual() {
  return (
    <figure className="overflow-hidden rounded-[2rem] border border-sky-200 bg-white p-4 shadow-xl shadow-sky-900/10">
      <svg className="w-full" viewBox="0 0 760 420" role="img" aria-label="Sistema operacional entre aplicações e hardware">
        <defs>
          <linearGradient id="soHeroBg" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#eff6ff" />
            <stop offset="50%" stopColor="#ecfeff" />
            <stop offset="100%" stopColor="#f5f3ff" />
          </linearGradient>
        </defs>
        <rect width="760" height="420" rx="32" fill="url(#soHeroBg)" />
        <text x="380" y="52" textAnchor="middle" fill="#0f172a" fontSize="26" fontWeight="900">
          Aplicações não falam direto com o hardware
        </text>
        <rect x="70" y="95" width="620" height="82" rx="24" fill="#ffffff" stroke="#93c5fd" strokeWidth="3" />
        {["Navegador", "Editor", "Player", "Servidor"].map((label, index) => (
          <g key={label}>
            <rect x={95 + index * 145} y="115" width="115" height="42" rx="14" fill="#dbeafe" />
            <text x={152 + index * 145} y="142" textAnchor="middle" fill="#1d4ed8" fontSize="14" fontWeight="800">
              {label}
            </text>
          </g>
        ))}
        <rect x="120" y="205" width="520" height="82" rx="24" fill="#dcfce7" stroke="#22c55e" strokeWidth="3" />
        <text x="380" y="245" textAnchor="middle" fill="#166534" fontSize="24" fontWeight="900">
          Kernel / Sistema Operacional
        </text>
        <text x="380" y="268" textAnchor="middle" fill="#15803d" fontSize="14" fontWeight="700">
          abstrações • proteção • escalonamento • E/S
        </text>
        <path d="M380 177v24" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
        <path d="M372 194l8 10l8-10" fill="#475569" />
        <path d="M380 287v24" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
        <path d="M372 304l8 10l8-10" fill="#475569" />
        <rect x="85" y="325" width="590" height="58" rx="20" fill="#0f172a" />
        {["CPU", "Memória", "Disco", "Rede", "Dispositivos"].map((label, index) => (
          <text
            key={label}
            x={145 + index * 118}
            y="360"
            textAnchor="middle"
            fill="#e2e8f0"
            fontSize="15"
            fontWeight="800"
          >
            {label}
          </text>
        ))}
      </svg>
    </figure>
  );
}

function SoAbstracoesVisual() {
  const cards = [
    { x: 70, y: 96, title: "Processo", body: "Programa com estado e recursos próprios", color: "#dbeafe", stroke: "#2563eb" },
    { x: 400, y: 96, title: "Arquivo", body: "Fluxo nomeado de bytes persistentes", color: "#dcfce7", stroke: "#16a34a" },
    { x: 70, y: 220, title: "Socket", body: "Ponta de comunicação gerenciada", color: "#fef3c7", stroke: "#d97706" },
    { x: 400, y: 220, title: "Memória virtual", body: "Espaço de endereços isolado por processo", color: "#ede9fe", stroke: "#7c3aed" },
  ];

  return (
    <figure className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-4 shadow-xl shadow-emerald-900/5">
      <svg className="w-full" viewBox="0 0 760 380" role="img" aria-label="Abstrações clássicas do sistema operacional">
        <rect width="760" height="380" rx="28" fill="#ecfdf5" />
        <text x="380" y="48" textAnchor="middle" fill="#065f46" fontSize="22" fontWeight="900">
          O SO troca hardware cru por abstrações usáveis
        </text>
        {cards.map((card) => (
          <g key={card.title}>
            <rect x={card.x} y={card.y} width="290" height="96" rx="24" fill={card.color} stroke={card.stroke} strokeWidth="3" />
            <text x={card.x + 145} y={card.y + 36} textAnchor="middle" fill="#0f172a" fontSize="18" fontWeight="900">
              {card.title}
            </text>
            <text x={card.x + 145} y={card.y + 64} textAnchor="middle" fill="#334155" fontSize="13" fontWeight="700">
              {card.body}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  );
}

function SoServicosVisual() {
  return (
    <figure className="rounded-[2rem] border border-indigo-200 bg-indigo-50 p-4 shadow-xl shadow-indigo-900/5">
      <svg className="w-full" viewBox="0 0 760 350" role="img" aria-label="Serviços providos pelo kernel">
        <rect width="760" height="350" rx="28" fill="#eef2ff" />
        <text x="380" y="50" textAnchor="middle" fill="#3730a3" fontSize="22" fontWeight="900">
          O kernel coordena vários serviços ao mesmo tempo
        </text>
        <rect x="290" y="120" width="180" height="90" rx="22" fill="#ffffff" stroke="#4f46e5" strokeWidth="3" />
        <text x="380" y="155" textAnchor="middle" fill="#3730a3" fontSize="22" fontWeight="900">
          Kernel
        </text>
        <text x="380" y="180" textAnchor="middle" fill="#6366f1" fontSize="13" fontWeight="800">
          APIs + drivers + políticas
        </text>
        {[
          { x1: 380, y1: 120, x2: 380, y2: 78, label: "Processos" },
          { x1: 470, y1: 165, x2: 620, y2: 165, label: "Rede" },
          { x1: 380, y1: 210, x2: 380, y2: 280, label: "Memória" },
          { x1: 290, y1: 165, x2: 140, y2: 165, label: "Disco / FS" },
        ].map((link) => (
          <g key={link.label}>
            <path d={`M${link.x1} ${link.y1} L${link.x2} ${link.y2}`} stroke="#6366f1" strokeWidth="4" strokeLinecap="round" />
            <circle cx={link.x2} cy={link.y2} r="28" fill="#ffffff" stroke="#818cf8" strokeWidth="3" />
            <text x={link.x2} y={link.y2 + 5} textAnchor="middle" fill="#3730a3" fontSize="12" fontWeight="900">
              {link.label}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  );
}

function SoFronteiraVisual() {
  return (
    <figure className="rounded-[2rem] border border-rose-200 bg-rose-50 p-4 shadow-xl shadow-rose-900/5">
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label="Fronteira entre modo usuário e modo kernel">
        <rect width="760" height="340" rx="28" fill="#fff1f2" />
        <text x="380" y="48" textAnchor="middle" fill="#9f1239" fontSize="22" fontWeight="900">
          Modo usuário e modo kernel
        </text>
        <rect x="80" y="90" width="600" height="80" rx="22" fill="#ffffff" stroke="#fb7185" strokeWidth="3" />
        <text x="380" y="135" textAnchor="middle" fill="#be123c" fontSize="24" fontWeight="900">
          Aplicação em modo usuário
        </text>
        <rect x="80" y="185" width="600" height="24" rx="12" fill="#be123c" />
        <text x="380" y="203" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="900">
          syscall / trap / validação
        </text>
        <rect x="80" y="225" width="600" height="70" rx="22" fill="#ffe4e6" stroke="#e11d48" strokeWidth="3" />
        <text x="380" y="262" textAnchor="middle" fill="#9f1239" fontSize="24" fontWeight="900">
          Kernel e operações privilegiadas
        </text>
      </svg>
    </figure>
  );
}

function SoSchedulerVisual() {
  return (
    <figure className="rounded-[2rem] border border-amber-200 bg-amber-50 p-4 shadow-xl shadow-amber-900/5">
      <svg className="w-full" viewBox="0 0 760 360" role="img" aria-label="Escalonamento de processos na CPU">
        <rect width="760" height="360" rx="28" fill="#fffbeb" />
        <text x="380" y="50" textAnchor="middle" fill="#92400e" fontSize="22" fontWeight="900">
          Escalonar é repartir um recurso finito no tempo
        </text>
        <rect x="80" y="100" width="600" height="60" rx="18" fill="#ffffff" stroke="#f59e0b" strokeWidth="3" />
        {["A", "B", "C", "A", "D", "B", "C", "A"].map((label, index) => (
          <g key={`${label}-${index}`}>
            <rect
              x={92 + index * 73}
              y="112"
              width="64"
              height="36"
              rx="10"
              fill={["#fde68a", "#fdba74", "#fca5a5", "#a7f3d0"][index % 4]}
            />
            <text x={124 + index * 73} y="136" textAnchor="middle" fill="#78350f" fontSize="18" fontWeight="900">
              {label}
            </text>
          </g>
        ))}
        <text x="380" y="198" textAnchor="middle" fill="#92400e" fontSize="16" fontWeight="800">
          Cada bloco representa um quantum antes da próxima decisão do escalonador
        </text>
        <rect x="120" y="230" width="520" height="70" rx="20" fill="#ffffff" stroke="#fbbf24" strokeWidth="2" />
        <text x="380" y="258" textAnchor="middle" fill="#92400e" fontSize="16" fontWeight="900">
          justiça básica ↔ overhead de troca de contexto ↔ responsividade
        </text>
        <text x="380" y="284" textAnchor="middle" fill="#a16207" fontSize="13" fontWeight="700">
          A política decide prioridades; o mecanismo torna a troca possível
        </text>
      </svg>
    </figure>
  );
}
