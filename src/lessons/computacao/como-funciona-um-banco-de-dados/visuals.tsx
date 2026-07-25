import type { LessonModule } from "../../../types/content";

export const visuals = {
  "db-hero": DbHeroVisual,
  "db-storage": DbStorageVisual,
  "db-transaction": DbTransactionVisual,
  "db-query-flow": DbQueryFlowVisual,
} satisfies LessonModule["visuals"];

function DbHeroVisual() {
  return (
    <figure className="overflow-hidden rounded-[2rem] border border-emerald-200 bg-white p-4 shadow-xl shadow-emerald-900/10">
      <svg className="w-full" viewBox="0 0 760 400" role="img" aria-label="Banco de dados como motor entre consultas e armazenamento">
        <defs>
          <linearGradient id="dbHeroBg" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#ecfdf5" />
            <stop offset="50%" stopColor="#eff6ff" />
            <stop offset="100%" stopColor="#fefce8" />
          </linearGradient>
        </defs>
        <rect width="760" height="400" rx="32" fill="url(#dbHeroBg)" />
        <text x="380" y="50" textAnchor="middle" fill="#0f172a" fontSize="26" fontWeight="900">
          Aplicação faz perguntas lógicas; a engine resolve o trabalho físico
        </text>
        <rect x="75" y="150" width="170" height="70" rx="22" fill="#ffffff" stroke="#22c55e" strokeWidth="3" />
        <text x="160" y="193" textAnchor="middle" fill="#166534" fontSize="20" fontWeight="900">
          SQL / aplicação
        </text>
        <path d="M245 185h60" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
        <path d="M297 175l10 10l-10 10" fill="#475569" />
        <rect x="320" y="115" width="150" height="140" rx="24" fill="#ffffff" stroke="#0ea5e9" strokeWidth="3" />
        <text x="395" y="150" textAnchor="middle" fill="#0369a1" fontSize="20" fontWeight="900">
          Engine do banco
        </text>
        <text x="395" y="180" textAnchor="middle" fill="#475569" fontSize="13" fontWeight="700">
          parser • planner
        </text>
        <text x="395" y="202" textAnchor="middle" fill="#475569" fontSize="13" fontWeight="700">
          executor • MVCC
        </text>
        <text x="395" y="224" textAnchor="middle" fill="#475569" fontSize="13" fontWeight="700">
          buffer • WAL
        </text>
        <path d="M470 185h55" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
        <path d="M517 175l10 10l-10 10" fill="#475569" />
        <rect x="540" y="145" width="145" height="80" rx="22" fill="#ffffff" stroke="#f59e0b" strokeWidth="3" />
        <text x="612" y="190" textAnchor="middle" fill="#92400e" fontSize="20" fontWeight="900">
          Páginas / disco
        </text>
      </svg>
    </figure>
  );
}

function DbStorageVisual() {
  return (
    <figure className="rounded-[2rem] border border-indigo-200 bg-indigo-50 p-4 shadow-xl shadow-indigo-900/5">
      <svg className="w-full" viewBox="0 0 760 330" role="img" aria-label="Páginas e buffer cache em banco de dados">
        <rect width="760" height="330" rx="28" fill="#eef2ff" />
        <text x="380" y="44" textAnchor="middle" fill="#3730a3" fontSize="22" fontWeight="900">
          O banco movimenta páginas entre armazenamento e memória
        </text>
        <rect x="90" y="105" width="220" height="170" rx="24" fill="#ffffff" stroke="#4f46e5" strokeWidth="3" />
        <text x="200" y="138" textAnchor="middle" fill="#3730a3" fontSize="20" fontWeight="900">
          Buffer cache
        </text>
        {["página 12", "página 19", "página 42"].map((label, index) => (
          <rect key={label} x="120" y={160 + index * 30} width="160" height="22" rx="8" fill={["#c7d2fe", "#ddd6fe", "#bfdbfe"][index]} />
        ))}
        <rect x="450" y="105" width="220" height="170" rx="24" fill="#ffffff" stroke="#f59e0b" strokeWidth="3" />
        <text x="560" y="138" textAnchor="middle" fill="#92400e" fontSize="20" fontWeight="900">
          Armazenamento
        </text>
        {["page 1", "page 2", "page 3", "page 4"].map((label, index) => (
          <rect key={label} x="485" y={160 + index * 24} width="150" height="18" rx="6" fill="#fde68a" />
        ))}
        <path d="M310 190h120" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
        <path d="M422 180l10 10l-10 10" fill="#475569" />
      </svg>
    </figure>
  );
}

function DbTransactionVisual() {
  return (
    <figure className="rounded-[2rem] border border-rose-200 bg-rose-50 p-4 shadow-xl shadow-rose-900/5">
      <svg className="w-full" viewBox="0 0 760 330" role="img" aria-label="Linha do tempo de transações">
        <rect width="760" height="330" rx="28" fill="#fff1f2" />
        <text x="380" y="44" textAnchor="middle" fill="#9f1239" fontSize="22" fontWeight="900">
          Transações definem começo, meio e fim lógico das mudanças
        </text>
        <rect x="90" y="115" width="580" height="24" rx="12" fill="#ffe4e6" />
        <rect x="140" y="110" width="180" height="34" rx="12" fill="#fb7185" />
        <text x="230" y="132" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="900">
          transação A
        </text>
        <rect x="360" y="165" width="210" height="34" rx="12" fill="#f9a8d4" />
        <text x="465" y="187" textAnchor="middle" fill="#831843" fontSize="13" fontWeight="900">
          transação B
        </text>
        <text x="230" y="215" textAnchor="middle" fill="#64748b" fontSize="13" fontWeight="700">
          commit
        </text>
        <text x="465" y="240" textAnchor="middle" fill="#64748b" fontSize="13" fontWeight="700">
          leitura com snapshot
        </text>
      </svg>
    </figure>
  );
}

function DbQueryFlowVisual() {
  return (
    <figure className="rounded-[2rem] border border-sky-200 bg-sky-50 p-4 shadow-xl shadow-sky-900/5">
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label="Fluxo de uma query em banco de dados">
        <rect width="760" height="340" rx="28" fill="#f0f9ff" />
        <text x="380" y="44" textAnchor="middle" fill="#075985" fontSize="22" fontWeight="900">
          Query: interpretar, planejar, executar
        </text>
        {[
          { x: 60, label: "SQL" },
          { x: 200, label: "Parser" },
          { x: 340, label: "Planner" },
          { x: 500, label: "Executor" },
          { x: 640, label: "Resultado" },
        ].map((step) => (
          <g key={step.label}>
            <rect x={step.x - 45} y="160" width="90" height="52" rx="18" fill="#ffffff" stroke="#38bdf8" strokeWidth="3" />
            <text x={step.x} y="192" textAnchor="middle" fill="#0369a1" fontSize="14" fontWeight="900">
              {step.label}
            </text>
          </g>
        ))}
        {Array.from({ length: 4 }).map((_, index) => (
          <g key={index}>
            <path d={`M${105 + index * 140} 186h28`} stroke="#0284c7" strokeWidth="5" strokeLinecap="round" />
            <path d={`M${125 + index * 140} 176l10 10l-10 10`} fill="#0284c7" />
          </g>
        ))}
      </svg>
    </figure>
  );
}
