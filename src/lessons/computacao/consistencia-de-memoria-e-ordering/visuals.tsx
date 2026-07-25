import type { LessonModule } from "../../../types/content";

function MemoryOrderingHero() {
  return (
    <figure className="overflow-hidden rounded-[2rem] border border-violet-200 bg-white p-4 shadow-xl shadow-violet-900/5">
      <svg
        className="w-full"
        viewBox="0 0 760 360"
        role="img"
        aria-label="Visual introdutorio sobre consistencia de memoria e ordering"
      >
        <defs>
          <linearGradient id="memoryOrderingHeroBg" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#f5f3ff" />
            <stop offset="100%" stopColor="#eef2ff" />
          </linearGradient>
        </defs>
        <rect width="760" height="360" rx="28" fill="url(#memoryOrderingHeroBg)" />
        <text x="380" y="42" textAnchor="middle" fill="#4c1d95" fontSize="23" fontWeight="900">
          Ver a mesma variavel nao e ver o mesmo mundo
        </text>
        <text x="380" y="68" textAnchor="middle" fill="#6d28d9" fontSize="13" fontWeight="700">
          ordering decide quando uma observacao pode carregar o resto do estado junto
        </text>

        <rect x="70" y="108" width="188" height="132" rx="22" fill="#ffffff" stroke="#c4b5fd" strokeWidth="3" />
        <text x="164" y="136" textAnchor="middle" fill="#5b21b6" fontSize="14" fontWeight="900">
          Thread produtora
        </text>
        <rect x="98" y="160" width="132" height="24" rx="12" fill="#ede9fe" />
        <text x="164" y="176" textAnchor="middle" fill="#6d28d9" fontSize="12" fontWeight="800">
          escreve payload
        </text>
        <rect x="98" y="196" width="132" height="24" rx="12" fill="#ddd6fe" />
        <text x="164" y="212" textAnchor="middle" fill="#6d28d9" fontSize="12" fontWeight="800">
          publica flag
        </text>

        <rect x="502" y="108" width="188" height="132" rx="22" fill="#ffffff" stroke="#c4b5fd" strokeWidth="3" />
        <text x="596" y="136" textAnchor="middle" fill="#5b21b6" fontSize="14" fontWeight="900">
          Thread consumidora
        </text>
        <rect x="530" y="160" width="132" height="24" rx="12" fill="#ede9fe" />
        <text x="596" y="176" textAnchor="middle" fill="#6d28d9" fontSize="12" fontWeight="800">
          observa flag
        </text>
        <rect x="530" y="196" width="132" height="24" rx="12" fill="#ddd6fe" />
        <text x="596" y="212" textAnchor="middle" fill="#6d28d9" fontSize="12" fontWeight="800">
          usa payload
        </text>

        <rect x="296" y="142" width="168" height="64" rx="20" fill="#ffffff" stroke="#a78bfa" strokeWidth="3" />
        <text x="380" y="168" textAnchor="middle" fill="#5b21b6" fontSize="14" fontWeight="900">
          happens-before
        </text>
        <text x="380" y="190" textAnchor="middle" fill="#475569" fontSize="12" fontWeight="700">
          a borda que autoriza visibilidade
        </text>

        <path d="M258 175h38" stroke="#7c3aed" strokeWidth="6" strokeLinecap="round" />
        <path d="M464 175h38" stroke="#7c3aed" strokeWidth="6" strokeLinecap="round" />
        <path d="M286 165l12 10l-12 10" fill="#7c3aed" />
        <path d="M502 165l-12 10l12 10" fill="#7c3aed" />

        <text x="380" y="312" textAnchor="middle" fill="#475569" fontSize="13" fontWeight="700">
          Sem a borda correta, a flag pode chegar sem carregar o significado inteiro do estado publicado.
        </text>
      </svg>
    </figure>
  );
}

function OrderingSpectrum() {
  const columns = [
    {
      title: "Relaxed",
      body: "atomicidade do objeto; nao publica genericamente o resto do estado",
      color: "#ef4444",
    },
    {
      title: "Acquire / Release",
      body: "publicacao e consumo quando ha uma ligacao clara entre produtor e consumidor",
      color: "#0ea5e9",
    },
    {
      title: "SeqCst",
      body: "mais forte e intuitivo; adiciona uma ordem global para operacoes seq-cst",
      color: "#22c55e",
    },
  ];

  return (
    <figure className="rounded-[2rem] border border-indigo-200 bg-indigo-50 p-4 shadow-xl shadow-indigo-900/5">
      <svg
        className="w-full"
        viewBox="0 0 760 330"
        role="img"
        aria-label="Espectro de orderings de memoria"
      >
        <rect width="760" height="330" rx="28" fill="#eef2ff" />
        <text x="380" y="42" textAnchor="middle" fill="#3730a3" fontSize="22" fontWeight="900">
          Nem toda operacao pede o mesmo contrato
        </text>
        {columns.map((column, index) => {
          const x = 56 + index * 220;
          return (
            <g key={column.title}>
              <rect x={x} y="104" width="188" height="126" rx="24" fill="#ffffff" stroke={column.color} strokeWidth="3" />
              <text x={x + 94} y="138" textAnchor="middle" fill={column.color} fontSize="16" fontWeight="900">
                {column.title}
              </text>
              <text x={x + 18} y="172" fill="#334155" fontSize="12" fontWeight="700">
                {column.body}
              </text>
            </g>
          );
        })}
        <text x="380" y="286" textAnchor="middle" fill="#4338ca" fontSize="13" fontWeight="800">
          A forca do ordering so faz sentido quando ligada a um caso de uso e a uma borda de sincronizacao.
        </text>
      </svg>
    </figure>
  );
}

function HappensBeforeMap() {
  const steps = [
    { title: "Produzir", body: "preparar payload e invariantes locais" },
    { title: "Publicar", body: "emitir release / unlock / send" },
    { title: "Observar", body: "adquirir via acquire / lock / receive" },
    { title: "Consumir", body: "usar dados com direito de visibilidade" },
  ];

  return (
    <figure className="rounded-[2rem] border border-teal-200 bg-teal-50 p-4 shadow-xl shadow-teal-900/5">
      <svg
        className="w-full"
        viewBox="0 0 760 330"
        role="img"
        aria-label="Mapa de happens-before"
      >
        <rect width="760" height="330" rx="28" fill="#f0fdfa" />
        <text x="380" y="42" textAnchor="middle" fill="#0f766e" fontSize="22" fontWeight="900">
          Happens-before como pipeline de prova
        </text>
        {steps.map((step, index) => {
          const x = 38 + index * 176;
          return (
            <g key={step.title}>
              <rect x={x} y="116" width="144" height="100" rx="22" fill="#ffffff" stroke="#14b8a6" strokeWidth="3" />
              <text x={x + 72} y="146" textAnchor="middle" fill="#0f766e" fontSize="13" fontWeight="900">
                {step.title}
              </text>
              <text x={x + 72} y="176" textAnchor="middle" fill="#334155" fontSize="11" fontWeight="700">
                {step.body}
              </text>
              {index < steps.length - 1 ? (
                <>
                  <path d={`M${x + 144} 166 h24`} stroke="#14b8a6" strokeWidth="5" strokeLinecap="round" />
                  <path d={`M${x + 158} 156 l10 10 l-10 10`} fill="#14b8a6" />
                </>
              ) : null}
            </g>
          );
        })}
      </svg>
    </figure>
  );
}

function PublishObserveBoard() {
  return (
    <figure className="rounded-[2rem] border border-amber-200 bg-amber-50 p-4 shadow-xl shadow-amber-900/5">
      <svg
        className="w-full"
        viewBox="0 0 760 340"
        role="img"
        aria-label="Painel de publicacao e observacao com acquire e release"
      >
        <rect width="760" height="340" rx="28" fill="#fffbeb" />
        <text x="380" y="42" textAnchor="middle" fill="#92400e" fontSize="22" fontWeight="900">
          Acquire / Release fazem sentido como historia
        </text>
        <rect x="74" y="106" width="250" height="168" rx="24" fill="#ffffff" stroke="#f59e0b" strokeWidth="3" />
        <text x="199" y="136" textAnchor="middle" fill="#b45309" fontSize="15" fontWeight="900">
          Produtor
        </text>
        <text x="98" y="172" fill="#334155" fontSize="12" fontWeight="700">
          1. termina payload
        </text>
        <text x="98" y="198" fill="#334155" fontSize="12" fontWeight="700">
          2. publica sinal com release
        </text>
        <text x="98" y="224" fill="#334155" fontSize="12" fontWeight="700">
          3. promete que os efeitos anteriores
        </text>
        <text x="98" y="242" fill="#334155" fontSize="12" fontWeight="700">
          podem ser observados pelo consumidor
        </text>

        <rect x="436" y="106" width="250" height="168" rx="24" fill="#ffffff" stroke="#f59e0b" strokeWidth="3" />
        <text x="561" y="136" textAnchor="middle" fill="#b45309" fontSize="15" fontWeight="900">
          Consumidor
        </text>
        <text x="460" y="172" fill="#334155" fontSize="12" fontWeight="700">
          1. observa o sinal com acquire
        </text>
        <text x="460" y="198" fill="#334155" fontSize="12" fontWeight="700">
          2. ganha direito de ler o payload
        </text>
        <text x="460" y="224" fill="#334155" fontSize="12" fontWeight="700">
          3. nao esta adivinhando ordem:
        </text>
        <text x="460" y="242" fill="#334155" fontSize="12" fontWeight="700">
          esta consumindo uma publicacao valida
        </text>

        <path d="M324 190 h112" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" />
        <path d="M426 180 l10 10 l-10 10" fill="#f59e0b" />
      </svg>
    </figure>
  );
}

function SyncChoiceBoard() {
  const choices = [
    {
      title: "Relaxed",
      body: "contador estatistico ou metrica isolada, sem publicar outro estado",
      color: "#3b82f6",
    },
    {
      title: "Acquire / Release",
      body: "sinal simples de publicacao-consumo, com ligacao clara entre escritor e leitor",
      color: "#10b981",
    },
    {
      title: "Mutex / canal / lock",
      body: "estado composto, invariantes multiplas e revisao que precisa ser simples",
      color: "#f97316",
    },
  ];

  return (
    <figure className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-4 shadow-xl shadow-emerald-900/5">
      <svg
        className="w-full"
        viewBox="0 0 760 330"
        role="img"
        aria-label="Painel de escolha entre diferentes mecanismos de sincronizacao"
      >
        <rect width="760" height="330" rx="28" fill="#ecfdf5" />
        <text x="380" y="42" textAnchor="middle" fill="#047857" fontSize="22" fontWeight="900">
          Escolha o menor contrato que ainda prove o que importa
        </text>
        {choices.map((choice, index) => {
          const x = 52 + index * 222;
          return (
            <g key={choice.title}>
              <rect x={x} y="106" width="194" height="130" rx="24" fill="#ffffff" stroke={choice.color} strokeWidth="3" />
              <text x={x + 97} y="138" textAnchor="middle" fill={choice.color} fontSize="15" fontWeight="900">
                {choice.title}
              </text>
              <text x={x + 18} y="176" fill="#334155" fontSize="12" fontWeight="700">
                {choice.body}
              </text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}

function BoundaryMap() {
  const layers = [
    ["Linguagem", "contrato sobre o que o programa pode assumir"],
    ["Compilador", "transformacoes que ainda respeitam o contrato"],
    ["Hardware", "mecanismo real que implementa observacoes validas"],
    ["Mitos", "o que parece funcionar sem fonte nem prova de borda"],
  ];

  return (
    <figure className="rounded-[2rem] border border-rose-200 bg-rose-50 p-4 shadow-xl shadow-rose-900/5">
      <svg
        className="w-full"
        viewBox="0 0 760 340"
        role="img"
        aria-label="Mapa das fronteiras entre modelo de linguagem, compilador e hardware"
      >
        <rect width="760" height="340" rx="28" fill="#fff1f2" />
        <text x="380" y="42" textAnchor="middle" fill="#be123c" fontSize="22" fontWeight="900">
          Linguagem, compilador e hardware nao sao a mesma camada
        </text>
        {layers.map(([title, body], index) => {
          const x = 90 + index * 148;
          const y = 108 + (index % 2) * 56;
          return (
            <g key={title}>
              <rect x={x} y={y} width="132" height="84" rx="20" fill="#ffffff" stroke="#fda4af" strokeWidth="3" />
              <text x={x + 66} y={y + 28} textAnchor="middle" fill="#be123c" fontSize="12" fontWeight="900">
                {title}
              </text>
              <text x={x + 66} y={y + 54} textAnchor="middle" fill="#334155" fontSize="11" fontWeight="700">
                {body}
              </text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}

export const visuals = {
  "memory-ordering-hero": MemoryOrderingHero,
  "ordering-spectrum": OrderingSpectrum,
  "happens-before-map": HappensBeforeMap,
  "publish-observe-board": PublishObserveBoard,
  "sync-choice-board": SyncChoiceBoard,
  "boundary-map": BoundaryMap,
} satisfies LessonModule["visuals"];
