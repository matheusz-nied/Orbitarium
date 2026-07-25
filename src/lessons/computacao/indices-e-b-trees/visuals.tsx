import type { LessonModule } from "../../../types/content";

export const visuals = {
  "btree-hero": BtreeHeroVisual,
  "btree-anatomy": BtreeAnatomyVisual,
  "btree-range": BtreeRangeVisual,
  "btree-maintenance": BtreeMaintenanceVisual,
} satisfies LessonModule["visuals"];

function BtreeHeroVisual() {
  return (
    <figure className="overflow-hidden rounded-[2rem] border border-amber-200 bg-white p-4 shadow-xl shadow-amber-900/10">
      <svg className="w-full" viewBox="0 0 760 400" role="img" aria-label="Índice B-Tree como atalho de busca">
        <defs>
          <linearGradient id="btHeroBg" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#fffbeb" />
            <stop offset="50%" stopColor="#fefce8" />
            <stop offset="100%" stopColor="#eef2ff" />
          </linearGradient>
        </defs>
        <rect width="760" height="400" rx="32" fill="url(#btHeroBg)" />
        <text x="380" y="50" textAnchor="middle" fill="#0f172a" fontSize="26" fontWeight="900">
          Índice: menos leitura cega, mais navegação guiada
        </text>
        <rect x="70" y="145" width="170" height="90" rx="24" fill="#ffffff" stroke="#f59e0b" strokeWidth="3" />
        <text x="155" y="182" textAnchor="middle" fill="#92400e" fontSize="18" fontWeight="900">
          Consulta
        </text>
        <text x="155" y="205" textAnchor="middle" fill="#475569" fontSize="13" fontWeight="700">
          WHERE chave = ...
        </text>
        <path d="M242 190h68" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
        <path d="M302 180l10 10l-10 10" fill="#475569" />
        <rect x="325" y="105" width="150" height="170" rx="28" fill="#ffffff" stroke="#d97706" strokeWidth="3" />
        <text x="400" y="140" textAnchor="middle" fill="#92400e" fontSize="20" fontWeight="900">
          B-Tree
        </text>
        <text x="400" y="170" textAnchor="middle" fill="#475569" fontSize="13" fontWeight="700">
          pouca altura
        </text>
        <text x="400" y="192" textAnchor="middle" fill="#475569" fontSize="13" fontWeight="700">
          folhas ordenadas
        </text>
        <text x="400" y="214" textAnchor="middle" fill="#475569" fontSize="13" fontWeight="700">
          range scan
        </text>
        <path d="M476 190h72" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
        <path d="M540 180l10 10l-10 10" fill="#475569" />
        <rect x="560" y="145" width="140" height="90" rx="24" fill="#ffffff" stroke="#0ea5e9" strokeWidth="3" />
        <text x="630" y="183" textAnchor="middle" fill="#0369a1" fontSize="18" fontWeight="900">
          Linhas alvo
        </text>
      </svg>
    </figure>
  );
}

function BtreeAnatomyVisual() {
  return (
    <figure className="rounded-[2rem] border border-violet-200 bg-violet-50 p-4 shadow-xl shadow-violet-900/5">
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label="Anatomia de uma B-Tree">
        <rect width="760" height="340" rx="28" fill="#faf5ff" />
        <text x="380" y="44" textAnchor="middle" fill="#5b21b6" fontSize="22" fontWeight="900">
          Nós internos dividem faixas; folhas guardam a ordem final
        </text>
        <rect x="315" y="85" width="130" height="44" rx="14" fill="#ffffff" stroke="#8b5cf6" strokeWidth="3" />
        <text x="380" y="113" textAnchor="middle" fill="#5b21b6" fontSize="16" fontWeight="900">
          20 | 50
        </text>
        {[
          { x: 120, label: "< 20" },
          { x: 315, label: "20..49" },
          { x: 510, label: ">= 50" },
        ].map((node) => (
          <g key={node.label}>
            <rect x={node.x} y="215" width="130" height="44" rx="14" fill="#ffffff" stroke="#c4b5fd" strokeWidth="3" />
            <text x={node.x + 65} y="243" textAnchor="middle" fill="#4c1d95" fontSize="14" fontWeight="900">
              {node.label}
            </text>
          </g>
        ))}
        <path d="M355 129L185 215" stroke="#7c3aed" strokeWidth="4" fill="none" />
        <path d="M380 129L380 215" stroke="#7c3aed" strokeWidth="4" fill="none" />
        <path d="M405 129L575 215" stroke="#7c3aed" strokeWidth="4" fill="none" />
      </svg>
    </figure>
  );
}

function BtreeRangeVisual() {
  return (
    <figure className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-4 shadow-xl shadow-emerald-900/5">
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label="Percurso ordenado nas folhas da B-Tree">
        <rect width="760" height="340" rx="28" fill="#ecfdf5" />
        <text x="380" y="44" textAnchor="middle" fill="#065f46" fontSize="22" fontWeight="900">
          Range scan: ache o começo e caminhe pelas folhas em ordem
        </text>
        {["10", "12", "14", "18", "22", "24", "27", "31"].map((label, index) => (
          <g key={label}>
            <rect x={80 + index * 76} y="160" width="56" height="44" rx="14" fill={index >= 2 && index <= 5 ? "#bbf7d0" : "#ffffff"} stroke="#10b981" strokeWidth="3" />
            <text x={108 + index * 76} y="188" textAnchor="middle" fill="#065f46" fontSize="15" fontWeight="900">
              {label}
            </text>
          </g>
        ))}
        <path d="M140 182h20" stroke="#10b981" strokeWidth="4" strokeLinecap="round" />
        <path d="M216 182h20" stroke="#10b981" strokeWidth="4" strokeLinecap="round" />
        <path d="M292 182h20" stroke="#10b981" strokeWidth="4" strokeLinecap="round" />
        <path d="M368 182h20" stroke="#10b981" strokeWidth="4" strokeLinecap="round" />
        <path d="M444 182h20" stroke="#10b981" strokeWidth="4" strokeLinecap="round" />
        <path d="M520 182h20" stroke="#10b981" strokeWidth="4" strokeLinecap="round" />
        <path d="M596 182h20" stroke="#10b981" strokeWidth="4" strokeLinecap="round" />
        <text x="380" y="280" textAnchor="middle" fill="#065f46" fontSize="14" fontWeight="800">
          Intervalo destacado: depois de achar 14, o banco segue ordenado até sair da faixa
        </text>
      </svg>
    </figure>
  );
}

function BtreeMaintenanceVisual() {
  return (
    <figure className="rounded-[2rem] border border-rose-200 bg-rose-50 p-4 shadow-xl shadow-rose-900/5">
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label="Split de nó em B-Tree">
        <rect width="760" height="340" rx="28" fill="#fff1f2" />
        <text x="380" y="44" textAnchor="middle" fill="#9f1239" fontSize="22" fontWeight="900">
          Inserção pode forçar split para manter equilíbrio
        </text>
        <rect x="120" y="150" width="180" height="50" rx="16" fill="#ffffff" stroke="#fb7185" strokeWidth="3" />
        <text x="210" y="182" textAnchor="middle" fill="#be123c" fontSize="16" fontWeight="900">
          10 | 20 | 30 | 40
        </text>
        <path d="M310 175h70" stroke="#e11d48" strokeWidth="5" strokeLinecap="round" />
        <path d="M372 165l10 10l-10 10" fill="#e11d48" />
        <rect x="400" y="125" width="100" height="40" rx="14" fill="#ffe4e6" stroke="#fb7185" strokeWidth="3" />
        <text x="450" y="151" textAnchor="middle" fill="#be123c" fontSize="15" fontWeight="900">
          sobe 30
        </text>
        <rect x="400" y="190" width="110" height="50" rx="16" fill="#ffffff" stroke="#fb7185" strokeWidth="3" />
        <text x="455" y="222" textAnchor="middle" fill="#be123c" fontSize="16" fontWeight="900">
          10 | 20
        </text>
        <rect x="540" y="190" width="110" height="50" rx="16" fill="#ffffff" stroke="#fb7185" strokeWidth="3" />
        <text x="595" y="222" textAnchor="middle" fill="#be123c" fontSize="16" fontWeight="900">
          40 | 50
        </text>
      </svg>
    </figure>
  );
}
