import type { LessonModule } from "../../../types/content";

export const visuals = {
  "ativacoes-hero": AtivacoesHeroVisual,
  "linear-vs-nao-linear": LinearVsNaoLinearVisual,
  "familias-ativacao": FamiliasAtivacaoVisual,
  "expressividade-em-camadas": ExpressividadeEmCamadasVisual,
  "gradiente-em-cascata": GradienteEmCascataVisual,
  "softmax-distribuicao": SoftmaxDistribuicaoVisual,
  "escolha-pratica-ativacoes": EscolhaPraticaAtivacoesVisual,
} satisfies LessonModule["visuals"];

function AtivacoesHeroVisual() {
  return (
    <figure className="overflow-hidden rounded-[2rem] border border-fuchsia-200 bg-white p-4 shadow-xl shadow-fuchsia-900/10">
      <svg className="w-full" viewBox="0 0 760 400" role="img" aria-label="Ativações curvando o fluxo de sinais em uma rede">
        <defs>
          <linearGradient id="actHeroBg" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#fdf4ff" />
            <stop offset="50%" stopColor="#eef2ff" />
            <stop offset="100%" stopColor="#ecfeff" />
          </linearGradient>
        </defs>
        <rect width="760" height="400" rx="30" fill="url(#actHeroBg)" />
        <text x="380" y="52" textAnchor="middle" fill="#86198f" fontSize="26" fontWeight="900">
          A ativação é a dobradiça da expressividade
        </text>
        <path d="M90 260 C 160 260, 180 120, 260 120 S 360 260, 430 260 S 520 120, 670 150" stroke="#d946ef" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d="M90 310 H 260 V 120 H 430 V 260 H 670" stroke="#0f766e" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.85" />
        <path d="M90 300 C 180 300, 240 300, 335 200 S 520 100, 670 95" stroke="#4f46e5" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.85" />
        <text x="180" y="342" textAnchor="middle" fill="#86198f" fontSize="14" fontWeight="900">sigmoid / tanh</text>
        <text x="380" y="342" textAnchor="middle" fill="#0f766e" fontSize="14" fontWeight="900">ReLU</text>
        <text x="580" y="342" textAnchor="middle" fill="#4338ca" fontSize="14" fontWeight="900">softmax na saída</text>
      </svg>
    </figure>
  );
}

function LinearVsNaoLinearVisual() {
  return (
    <figure className="rounded-[2rem] border border-indigo-200 bg-indigo-50 p-4 shadow-xl shadow-indigo-900/5">
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label="Comparação entre composição linear e não linear">
        <rect width="760" height="340" rx="28" fill="#eef2ff" />
        <text x="380" y="48" textAnchor="middle" fill="#3730a3" fontSize="22" fontWeight="900">
          Profundidade sem ativação continua linear
        </text>
        <rect x="70" y="95" width="270" height="180" rx="18" fill="#ffffff" stroke="#6366f1" strokeWidth="3" />
        <line x1="100" y1="250" x2="300" y2="120" stroke="#4f46e5" strokeWidth="5" strokeLinecap="round" />
        <text x="205" y="295" textAnchor="middle" fill="#4338ca" fontSize="14" fontWeight="900">linear + linear + linear → ainda uma reta</text>
        <rect x="420" y="95" width="270" height="180" rx="18" fill="#ffffff" stroke="#a855f7" strokeWidth="3" />
        <path d="M450 250 C 500 250, 515 135, 565 135 S 635 250, 665 180" stroke="#a855f7" strokeWidth="5" fill="none" strokeLinecap="round" />
        <text x="555" y="295" textAnchor="middle" fill="#86198f" fontSize="14" fontWeight="900">linear + ativação + linear → nova geometria</text>
      </svg>
    </figure>
  );
}

function FamiliasAtivacaoVisual() {
  return (
    <figure className="rounded-[2rem] border border-fuchsia-200 bg-fuchsia-50 p-4 shadow-xl shadow-fuchsia-900/5">
      <svg className="w-full" viewBox="0 0 760 350" role="img" aria-label="Curvas principais de sigmoid tanh e relu">
        <rect width="760" height="350" rx="28" fill="#fdf4ff" />
        <text x="380" y="48" textAnchor="middle" fill="#86198f" fontSize="22" fontWeight="900">Três formas, três vieses</text>
        <line x1="110" y1="280" x2="650" y2="280" stroke="#94a3b8" strokeWidth="2" />
        <line x1="180" y1="80" x2="180" y2="310" stroke="#94a3b8" strokeWidth="2" />
        <path d="M120 250 C 210 250, 230 120, 320 120 S 440 250, 620 250" stroke="#d946ef" strokeWidth="5" fill="none" />
        <path d="M120 280 C 220 280, 240 95, 320 95 S 420 280, 620 280" stroke="#4f46e5" strokeWidth="5" fill="none" opacity="0.75" />
        <path d="M120 280 H 320 L 620 80" stroke="#0f766e" strokeWidth="5" fill="none" />
        <text x="585" y="118" fill="#0f766e" fontSize="14" fontWeight="900">ReLU</text>
        <text x="585" y="210" fill="#d946ef" fontSize="14" fontWeight="900">sigmoid</text>
        <text x="585" y="240" fill="#4f46e5" fontSize="14" fontWeight="900">tanh</text>
      </svg>
    </figure>
  );
}

function ExpressividadeEmCamadasVisual() {
  return (
    <figure className="rounded-[2rem] border border-teal-200 bg-teal-50 p-4 shadow-xl shadow-teal-900/5">
      <svg className="w-full" viewBox="0 0 760 350" role="img" aria-label="Camadas ReLU criando regiões piecewise linear">
        <rect width="760" height="350" rx="28" fill="#f0fdfa" />
        <text x="380" y="48" textAnchor="middle" fill="#0f766e" fontSize="22" fontWeight="900">A rede costura muitos regimes locais</text>
        <rect x="90" y="95" width="250" height="180" rx="18" fill="#ffffff" stroke="#2dd4bf" strokeWidth="3" />
        <path d="M120 250 H 190 L 250 170 L 310 170" stroke="#14b8a6" strokeWidth="5" fill="none" strokeLinecap="round" />
        <text x="215" y="300" textAnchor="middle" fill="#0f766e" fontSize="14" fontWeight="900">uma unidade ReLU = um vinco</text>
        <rect x="420" y="95" width="250" height="180" rx="18" fill="#ffffff" stroke="#0f766e" strokeWidth="3" />
        <path d="M450 240 L 500 240 L 535 185 L 570 185 L 605 130 L 640 130" stroke="#0f766e" strokeWidth="5" fill="none" strokeLinecap="round" />
        <text x="545" y="300" textAnchor="middle" fill="#0f766e" fontSize="14" fontWeight="900">muitas unidades = muitos vincos combinados</text>
      </svg>
    </figure>
  );
}

function GradienteEmCascataVisual() {
  return (
    <figure className="rounded-[2rem] border border-amber-200 bg-amber-50 p-4 shadow-xl shadow-amber-900/5">
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label="Gradiente enfraquecendo ao atravessar várias camadas saturadas">
        <rect width="760" height="340" rx="28" fill="#fffbeb" />
        <text x="380" y="48" textAnchor="middle" fill="#92400e" fontSize="22" fontWeight="900">O sinal de correção pode se apagar no caminho</text>
        {[120, 240, 360, 480, 600].map((x, index) => (
          <g key={x}>
            <circle cx={x} cy="170" r="28" fill="#ffffff" stroke="#f59e0b" strokeWidth="3" />
            <text x={x} y="176" textAnchor="middle" fill="#92400e" fontSize="14" fontWeight="900">L{index + 1}</text>
          </g>
        ))}
        {[0.9, 0.6, 0.35, 0.18].map((opacity, index) => (
          <path key={index} d={`M ${148 + index * 120} 170 H ${212 + index * 120}`} stroke="#d97706" strokeWidth="8" strokeLinecap="round" opacity={opacity} />
        ))}
        <text x="380" y="300" textAnchor="middle" fill="#92400e" fontSize="15" fontWeight="800">
          se cada etapa responde pouco, o gradiente chega pequeno às primeiras camadas
        </text>
      </svg>
    </figure>
  );
}

function SoftmaxDistribuicaoVisual() {
  return (
    <figure className="rounded-[2rem] border border-rose-200 bg-rose-50 p-4 shadow-xl shadow-rose-900/5">
      <svg className="w-full" viewBox="0 0 760 350" role="img" aria-label="Softmax convertendo logits em probabilidades">
        <rect width="760" height="350" rx="28" fill="#fff1f2" />
        <text x="380" y="48" textAnchor="middle" fill="#9f1239" fontSize="22" fontWeight="900">Softmax é comparação global entre classes</text>
        <rect x="90" y="95" width="220" height="180" rx="18" fill="#ffffff" stroke="#fb7185" strokeWidth="3" />
        <text x="200" y="130" textAnchor="middle" fill="#9f1239" fontSize="17" fontWeight="900">Logits</text>
        <text x="200" y="175" textAnchor="middle" fill="#475569" fontSize="15" fontWeight="800">gato = 3.2</text>
        <text x="200" y="205" textAnchor="middle" fill="#475569" fontSize="15" fontWeight="800">cão = 2.7</text>
        <text x="200" y="235" textAnchor="middle" fill="#475569" fontSize="15" fontWeight="800">avião = 0.9</text>
        <path d="M320 185h90" stroke="#be123c" strokeWidth="5" strokeLinecap="round" />
        <path d="M400 175l12 10l-12 10" fill="#be123c" />
        <rect x="430" y="95" width="240" height="180" rx="18" fill="#ffffff" stroke="#be123c" strokeWidth="3" />
        <text x="550" y="130" textAnchor="middle" fill="#9f1239" fontSize="17" fontWeight="900">Probabilidades</text>
        <rect x="470" y="160" width="150" height="18" rx="9" fill="#fecdd3" />
        <rect x="470" y="160" width="88" height="18" rx="9" fill="#e11d48" />
        <rect x="470" y="195" width="150" height="18" rx="9" fill="#fecdd3" />
        <rect x="470" y="195" width="60" height="18" rx="9" fill="#fb7185" />
        <rect x="470" y="230" width="150" height="18" rx="9" fill="#fecdd3" />
        <rect x="470" y="230" width="14" height="18" rx="9" fill="#fda4af" />
      </svg>
    </figure>
  );
}

function EscolhaPraticaAtivacoesVisual() {
  return (
    <figure className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-4 shadow-xl shadow-emerald-900/5">
      <svg className="w-full" viewBox="0 0 760 330" role="img" aria-label="Mapa simples de escolha prática de ativações">
        <rect width="760" height="330" rx="28" fill="#ecfdf5" />
        <text x="380" y="48" textAnchor="middle" fill="#065f46" fontSize="22" fontWeight="900">Escolher ativação é alinhar saída e treino</text>
        <rect x="70" y="95" width="180" height="150" rx="18" fill="#ffffff" stroke="#10b981" strokeWidth="3" />
        <text x="160" y="130" textAnchor="middle" fill="#065f46" fontSize="16" fontWeight="900">camadas escondidas</text>
        <text x="160" y="165" textAnchor="middle" fill="#047857" fontSize="14" fontWeight="800">ReLU e variantes</text>
        <text x="160" y="195" textAnchor="middle" fill="#047857" fontSize="13" fontWeight="700">treino estável em muitos casos</text>
        <rect x="290" y="95" width="180" height="150" rx="18" fill="#ffffff" stroke="#10b981" strokeWidth="3" />
        <text x="380" y="130" textAnchor="middle" fill="#065f46" fontSize="16" fontWeight="900">saída binária</text>
        <text x="380" y="165" textAnchor="middle" fill="#047857" fontSize="14" fontWeight="800">sigmoid</text>
        <text x="380" y="195" textAnchor="middle" fill="#047857" fontSize="13" fontWeight="700">probabilidade independente</text>
        <rect x="510" y="95" width="180" height="150" rx="18" fill="#ffffff" stroke="#10b981" strokeWidth="3" />
        <text x="600" y="130" textAnchor="middle" fill="#065f46" fontSize="16" fontWeight="900">saída multiclasse</text>
        <text x="600" y="165" textAnchor="middle" fill="#047857" fontSize="14" fontWeight="800">softmax</text>
        <text x="600" y="195" textAnchor="middle" fill="#047857" fontSize="13" fontWeight="700">classes competem</text>
      </svg>
    </figure>
  );
}
