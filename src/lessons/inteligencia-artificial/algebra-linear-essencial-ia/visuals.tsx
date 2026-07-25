import type { LessonModule } from "../../../types/content";

export const visuals = {
  "algebra-linear-hero": AlgebraLinearHeroVisual,
  "ia-vetorial": IaVetorialVisual,
  "vetores-no-plano": VetoresNoPlanoVisual,
  "matriz-transformacao": MatrizTransformacaoVisual,
  "produto-matriz-vetor": ProdutoMatrizVetorVisual,
  "produto-escalar-similaridade": ProdutoEscalarSimilaridadeVisual,
  "espacos-span": EspacosSpanVisual,
  "projecao-intuicao": ProjecaoIntuicaoVisual,
  "algebra-no-ml": AlgebraNoMlVisual,
} satisfies LessonModule["visuals"];

function AlgebraLinearHeroVisual() {
  return (
    <figure className="overflow-hidden rounded-[2rem] border border-violet-200 bg-white p-4 shadow-xl shadow-violet-900/10">
      <svg className="w-full" viewBox="0 0 760 420" role="img" aria-label="Álgebra linear como linguagem geométrica da IA">
        <defs>
          <linearGradient id="algHeroBg" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#f5f3ff" />
            <stop offset="55%" stopColor="#eef2ff" />
            <stop offset="100%" stopColor="#ecfeff" />
          </linearGradient>
        </defs>
        <rect width="760" height="420" rx="30" fill="url(#algHeroBg)" />
        <text x="380" y="52" textAnchor="middle" fill="#0f172a" fontSize="28" fontWeight="900">
          Dados viram vetores • matrizes viram transformações
        </text>
        <rect x="70" y="95" width="180" height="210" rx="22" fill="#ffffff" stroke="#7c3aed" strokeWidth="3" />
        <text x="160" y="130" textAnchor="middle" fill="#6d28d9" fontSize="18" fontWeight="900">Representação</text>
        <text x="160" y="170" textAnchor="middle" fill="#7c3aed" fontSize="14" fontWeight="800">[pixel, pixel, pixel, ...]</text>
        <text x="160" y="198" textAnchor="middle" fill="#7c3aed" fontSize="14" fontWeight="800">[idade, renda, cliques]</text>
        <text x="160" y="226" textAnchor="middle" fill="#7c3aed" fontSize="14" fontWeight="800">[embedding 1, 2, 3, ...]</text>
        <path d="M285 200h65" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
        <path d="M335 188l16 12l-16 12" fill="#475569" />
        <rect x="380" y="95" width="310" height="210" rx="22" fill="#ffffff" stroke="#0f766e" strokeWidth="3" />
        <text x="535" y="130" textAnchor="middle" fill="#0f766e" fontSize="18" fontWeight="900">Transformação</text>
        <rect x="435" y="155" width="48" height="48" rx="12" fill="#ccfbf1" stroke="#14b8a6" strokeWidth="2" />
        <rect x="492" y="155" width="48" height="48" rx="12" fill="#ccfbf1" stroke="#14b8a6" strokeWidth="2" />
        <rect x="549" y="155" width="48" height="48" rx="12" fill="#ccfbf1" stroke="#14b8a6" strokeWidth="2" />
        <path d="M435 230l155-55" stroke="#14b8a6" strokeWidth="6" strokeLinecap="round" />
        <circle cx="590" cy="175" r="8" fill="#14b8a6" />
        <text x="535" y="255" textAnchor="middle" fill="#115e59" fontSize="14" fontWeight="800">nova representação</text>
        <rect x="110" y="338" width="540" height="52" rx="18" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
        <text x="380" y="370" textAnchor="middle" fill="#0f172a" fontSize="16" fontWeight="800">
          Quase toda IA moderna consiste em representar vetores e aprender como transformá-los
        </text>
      </svg>
    </figure>
  );
}

function IaVetorialVisual() {
  return (
    <figure className="rounded-[2rem] border border-indigo-200 bg-indigo-50 p-4 shadow-xl shadow-indigo-900/5">
      <svg className="w-full" viewBox="0 0 760 360" role="img" aria-label="Exemplos de vetores em IA">
        <rect width="760" height="360" rx="28" fill="#eef2ff" />
        <text x="380" y="48" textAnchor="middle" fill="#3730a3" fontSize="22" fontWeight="900">
          A mesma linguagem vetorial reaparece em vários domínios
        </text>
        {[
          [70, "Usuário", "idade, renda, cliques"],
          [290, "Imagem", "pixels e canais"],
          [510, "Texto", "embedding do token"],
        ].map(([x, title, label]) => (
          <g key={String(title)}>
            <rect x={Number(x)} y="100" width="180" height="180" rx="18" fill="#ffffff" stroke="#4f46e5" strokeWidth="3" />
            <text x={Number(x) + 90} y="135" textAnchor="middle" fill="#3730a3" fontSize="16" fontWeight="900">{title}</text>
            <text x={Number(x) + 90} y="180" textAnchor="middle" fill="#6366f1" fontSize="13" fontWeight="700">[{label}]</text>
          </g>
        ))}
        <text x="380" y="330" textAnchor="middle" fill="#3730a3" fontSize="15" fontWeight="800">
          Vetor é um formato unificador para tipos de dados muito diferentes
        </text>
      </svg>
    </figure>
  );
}

function VetoresNoPlanoVisual() {
  return (
    <figure className="rounded-[2rem] border border-sky-200 bg-sky-50 p-4 shadow-xl shadow-sky-900/5">
      <svg className="w-full" viewBox="0 0 760 360" role="img" aria-label="Vetores desenhados no plano cartesiano">
        <rect width="760" height="360" rx="28" fill="#f0f9ff" />
        <text x="380" y="48" textAnchor="middle" fill="#0369a1" fontSize="22" fontWeight="900">
          Vetores no plano: direção e magnitude
        </text>
        <line x1="100" y1="290" x2="660" y2="290" stroke="#0f172a" strokeWidth="3" />
        <line x1="380" y1="90" x2="380" y2="320" stroke="#0f172a" strokeWidth="3" />
        <path d="M380 290L520 180" stroke="#0284c7" strokeWidth="6" strokeLinecap="round" />
        <path d="M520 180l-20 4l8 18" fill="#0284c7" />
        <path d="M380 290L250 220" stroke="#38bdf8" strokeWidth="6" strokeLinecap="round" />
        <path d="M250 220l18 -3l-6 18" fill="#38bdf8" />
        <text x="535" y="170" fill="#0369a1" fontSize="14" fontWeight="900">v = (4, 3)</text>
        <text x="210" y="216" fill="#0284c7" fontSize="14" fontWeight="900">w = (-3, 2)</text>
      </svg>
    </figure>
  );
}

function MatrizTransformacaoVisual() {
  return (
    <figure className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-4 shadow-xl shadow-emerald-900/5">
      <svg className="w-full" viewBox="0 0 760 360" role="img" aria-label="Matriz como transformação geométrica">
        <rect width="760" height="360" rx="28" fill="#ecfdf5" />
        <text x="380" y="48" textAnchor="middle" fill="#047857" fontSize="22" fontWeight="900">
          Matriz pode girar, esticar ou comprimir o espaço
        </text>
        <rect x="70" y="100" width="250" height="200" rx="18" fill="#ffffff" stroke="#10b981" strokeWidth="3" />
        <rect x="120" y="150" width="100" height="70" rx="10" fill="#a7f3d0" stroke="#059669" strokeWidth="3" />
        <text x="195" y="270" textAnchor="middle" fill="#047857" fontSize="14" fontWeight="800">antes</text>
        <path d="M345 200h65" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
        <path d="M395 188l16 12l-16 12" fill="#475569" />
        <rect x="440" y="100" width="250" height="200" rx="18" fill="#ffffff" stroke="#10b981" strokeWidth="3" />
        <path d="M520 150l80 20l-20 90l-85 -25z" fill="#6ee7b7" stroke="#059669" strokeWidth="3" />
        <text x="565" y="270" textAnchor="middle" fill="#047857" fontSize="14" fontWeight="800">depois da transformação</text>
      </svg>
    </figure>
  );
}

function ProdutoMatrizVetorVisual() {
  return (
    <figure className="rounded-[2rem] border border-teal-200 bg-teal-50 p-4 shadow-xl shadow-teal-900/5">
      <svg className="w-full" viewBox="0 0 760 360" role="img" aria-label="Multiplicação matriz por vetor">
        <rect width="760" height="360" rx="28" fill="#f0fdfa" />
        <text x="380" y="48" textAnchor="middle" fill="#0f766e" fontSize="22" fontWeight="900">
          Matriz × vetor = nova posição no espaço
        </text>
        <text x="160" y="170" textAnchor="middle" fill="#115e59" fontSize="18" fontWeight="900">A</text>
        <text x="160" y="200" textAnchor="middle" fill="#0f766e" fontSize="14" fontWeight="800">transformação</text>
        <text x="380" y="170" textAnchor="middle" fill="#115e59" fontSize="18" fontWeight="900">x</text>
        <text x="380" y="200" textAnchor="middle" fill="#0f766e" fontSize="14" fontWeight="800">vetor</text>
        <text x="610" y="170" textAnchor="middle" fill="#115e59" fontSize="18" fontWeight="900">Ax</text>
        <text x="610" y="200" textAnchor="middle" fill="#0f766e" fontSize="14" fontWeight="800">vetor transformado</text>
        <path d="M230 185h70" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
        <path d="M285 173l16 12l-16 12" fill="#475569" />
        <path d="M460 185h70" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
        <path d="M515 173l16 12l-16 12" fill="#475569" />
      </svg>
    </figure>
  );
}

function ProdutoEscalarSimilaridadeVisual() {
  return (
    <figure className="rounded-[2rem] border border-amber-200 bg-amber-50 p-4 shadow-xl shadow-amber-900/5">
      <svg className="w-full" viewBox="0 0 760 360" role="img" aria-label="Produto escalar e alinhamento entre vetores">
        <rect width="760" height="360" rx="28" fill="#fffbeb" />
        <text x="380" y="48" textAnchor="middle" fill="#92400e" fontSize="22" fontWeight="900">
          Quanto mais alinhados, maior o produto escalar
        </text>
        <line x1="120" y1="285" x2="640" y2="285" stroke="#0f172a" strokeWidth="3" />
        <line x1="380" y1="95" x2="380" y2="320" stroke="#0f172a" strokeWidth="3" />
        <path d="M380 285L520 170" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" />
        <path d="M380 285L500 195" stroke="#d97706" strokeWidth="6" strokeLinecap="round" />
        <text x="545" y="165" fill="#92400e" fontSize="14" fontWeight="900">muito alinhados</text>
        <text x="500" y="330" textAnchor="middle" fill="#b45309" fontSize="15" fontWeight="800">produto escalar grande</text>
      </svg>
    </figure>
  );
}

function EspacosSpanVisual() {
  return (
    <figure className="rounded-[2rem] border border-rose-200 bg-rose-50 p-4 shadow-xl shadow-rose-900/5">
      <svg className="w-full" viewBox="0 0 760 360" role="img" aria-label="Span de vetores independentes e paralelos">
        <rect width="760" height="360" rx="28" fill="#fff1f2" />
        <text x="380" y="48" textAnchor="middle" fill="#be123c" fontSize="22" fontWeight="900">
          Duas direções independentes abrem um plano; paralelas não
        </text>
        <rect x="70" y="100" width="260" height="200" rx="18" fill="#ffffff" stroke="#fb7185" strokeWidth="3" />
        <path d="M120 260L210 170" stroke="#e11d48" strokeWidth="6" strokeLinecap="round" />
        <path d="M120 260L250 230" stroke="#fb7185" strokeWidth="6" strokeLinecap="round" />
        <text x="200" y="285" textAnchor="middle" fill="#be123c" fontSize="14" fontWeight="800">span = plano</text>
        <rect x="430" y="100" width="260" height="200" rx="18" fill="#ffffff" stroke="#fb7185" strokeWidth="3" />
        <path d="M470 255L620 195" stroke="#e11d48" strokeWidth="6" strokeLinecap="round" />
        <path d="M500 240L650 180" stroke="#fb7185" strokeWidth="6" strokeLinecap="round" />
        <text x="560" y="285" textAnchor="middle" fill="#be123c" fontSize="14" fontWeight="800">span = reta</text>
      </svg>
    </figure>
  );
}

function ProjecaoIntuicaoVisual() {
  return (
    <figure className="rounded-[2rem] border border-cyan-200 bg-cyan-50 p-4 shadow-xl shadow-cyan-900/5">
      <svg className="w-full" viewBox="0 0 760 360" role="img" aria-label="Projeção de um vetor sobre uma direção">
        <rect width="760" height="360" rx="28" fill="#ecfeff" />
        <text x="380" y="48" textAnchor="middle" fill="#155e75" fontSize="22" fontWeight="900">
          Projeção é a sombra do vetor em uma direção escolhida
        </text>
        <line x1="120" y1="285" x2="640" y2="165" stroke="#0e7490" strokeWidth="5" strokeLinecap="round" />
        <path d="M240 280L390 150" stroke="#06b6d4" strokeWidth="6" strokeLinecap="round" />
        <line x1="390" y1="150" x2="430" y2="215" stroke="#94a3b8" strokeDasharray="6 6" strokeWidth="3" />
        <circle cx="430" cy="215" r="8" fill="#0e7490" />
        <text x="455" y="220" fill="#155e75" fontSize="14" fontWeight="900">projeção</text>
      </svg>
    </figure>
  );
}

function AlgebraNoMlVisual() {
  return (
    <figure className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/5">
      <svg className="w-full" viewBox="0 0 760 360" role="img" aria-label="Álgebra linear aparecendo em diferentes componentes de ML">
        <rect width="760" height="360" rx="28" fill="#f8fafc" />
        <text x="380" y="48" textAnchor="middle" fill="#0f172a" fontSize="22" fontWeight="900">
          Embeddings, camadas lineares e atenção compartilham a mesma base
        </text>
        {[
          [80, "Embeddings"],
          [300, "Camada linear"],
          [520, "Atenção"],
        ].map(([x, label]) => (
          <g key={String(label)}>
            <rect x={Number(x)} y="110" width="160" height="150" rx="18" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
            <text x={Number(x) + 80} y="150" textAnchor="middle" fill="#334155" fontSize="16" fontWeight="900">{label}</text>
          </g>
        ))}
        <text x="380" y="320" textAnchor="middle" fill="#475569" fontSize="15" fontWeight="800">
          Muda o problema; permanecem representar vetores, transformá-los e comparar alinhamento
        </text>
      </svg>
    </figure>
  );
}

