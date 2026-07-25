import type { LessonModule } from "../../../types/content";

export const visuals = {
  "regressao-hero": RegressaoHeroVisual,
  "tipos-de-saida": TiposDeSaidaVisual,
  "reta-como-modelo": RetaComoModeloVisual,
  "residuos-e-ajuste": ResiduosEAjusteVisual,
  "linear-vs-probabilidade": LinearVsProbabilidadeVisual,
  "sigmoide-curva": SigmoideCurvaVisual,
  "fronteira-decisao": FronteiraDecisaoVisual,
  "comparacao-modelos": ComparacaoModelosVisual,
  "cuidados-praticos": CuidadosPraticosVisual,
} satisfies LessonModule["visuals"];

function RegressaoHeroVisual() {
  return (
    <figure className="overflow-hidden rounded-[2rem] border border-indigo-200 bg-white p-4 shadow-xl shadow-indigo-900/10">
      <svg className="w-full" viewBox="0 0 760 420" role="img" aria-label="Comparação entre regressão linear e regressão logística">
        <defs>
          <linearGradient id="regHeroBg" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#ecfeff" />
            <stop offset="50%" stopColor="#eef2ff" />
            <stop offset="100%" stopColor="#faf5ff" />
          </linearGradient>
        </defs>
        <rect width="760" height="420" rx="28" fill="url(#regHeroBg)" />
        <text x="380" y="44" textAnchor="middle" fill="#0f172a" fontSize="26" fontWeight="900">
          Uma soma linear, duas missões
        </text>
        <rect x="52" y="90" width="290" height="250" rx="24" fill="#ffffff" stroke="#14b8a6" strokeWidth="3" />
        <text x="197" y="125" textAnchor="middle" fill="#0f766e" fontSize="18" fontWeight="900">
          Regressão Linear
        </text>
        <line x1="86" y1="300" x2="310" y2="300" stroke="#94a3b8" strokeWidth="2" />
        <line x1="86" y1="150" x2="86" y2="300" stroke="#94a3b8" strokeWidth="2" />
        <line x1="96" y1="278" x2="300" y2="188" stroke="#0f766e" strokeWidth="5" strokeLinecap="round" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <circle
            key={i}
            cx={102 + i * 32}
            cy={268 - i * 15 + (i % 2 === 0 ? 8 : -6)}
            r="6"
            fill="#0f172a"
          />
        ))}
        <text x="197" y="330" textAnchor="middle" fill="#0f766e" fontSize="14" fontWeight="800">
          Saída contínua: prever "quanto?"
        </text>

        <rect x="418" y="90" width="290" height="250" rx="24" fill="#ffffff" stroke="#7c3aed" strokeWidth="3" />
        <text x="563" y="125" textAnchor="middle" fill="#6d28d9" fontSize="18" fontWeight="900">
          Regressão Logística
        </text>
        <line x1="452" y1="300" x2="676" y2="300" stroke="#94a3b8" strokeWidth="2" />
        <line x1="452" y1="150" x2="452" y2="300" stroke="#94a3b8" strokeWidth="2" />
        <path
          d="M 468 282 C 520 282, 518 220, 560 220 S 604 160, 660 160"
          fill="none"
          stroke="#7c3aed"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <line x1="452" y1="230" x2="676" y2="230" stroke="#f59e0b" strokeDasharray="7 5" strokeWidth="2" />
        <text x="680" y="234" fill="#b45309" fontSize="12" fontWeight="800">
          0,5
        </text>
        <text x="563" y="330" textAnchor="middle" fill="#6d28d9" fontSize="14" fontWeight="800">
          Saída probabilística: prever "quão provável?"
        </text>

        <rect x="120" y="360" width="520" height="38" rx="18" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
        <text x="380" y="384" textAnchor="middle" fill="#334155" fontSize="14" fontWeight="800">
          Ambas começam com b + w·x, mas interpretam a saída de modos diferentes
        </text>
      </svg>
    </figure>
  );
}

function TiposDeSaidaVisual() {
  return (
    <figure className="rounded-[2rem] border border-teal-200 bg-teal-50 p-4 shadow-xl shadow-teal-900/5">
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label="Comparação entre prever números e decidir classes">
        <rect width="760" height="340" rx="28" fill="#f0fdfa" />
        <text x="380" y="44" textAnchor="middle" fill="#0f766e" fontSize="22" fontWeight="900">
          Primeiro: número contínuo ou classe?
        </text>
        <rect x="70" y="86" width="260" height="200" rx="22" fill="#ffffff" stroke="#14b8a6" strokeWidth="3" />
        <text x="200" y="122" textAnchor="middle" fill="#0f766e" fontSize="18" fontWeight="900">
          Regressão
        </text>
        <text x="200" y="160" textAnchor="middle" fill="#0f172a" fontSize="16" fontWeight="800">
          temperatura, preço, tempo
        </text>
        <text x="200" y="205" textAnchor="middle" fill="#14b8a6" fontSize="40" fontWeight="900">
          23,4
        </text>
        <text x="200" y="245" textAnchor="middle" fill="#475569" fontSize="14" fontWeight="700">
          Saída numérica em escala contínua
        </text>

        <rect x="430" y="86" width="260" height="200" rx="22" fill="#ffffff" stroke="#7c3aed" strokeWidth="3" />
        <text x="560" y="122" textAnchor="middle" fill="#6d28d9" fontSize="18" fontWeight="900">
          Classificação
        </text>
        <text x="560" y="160" textAnchor="middle" fill="#0f172a" fontSize="16" fontWeight="800">
          fraude, spam, aprovação
        </text>
        <rect x="488" y="188" width="144" height="42" rx="21" fill="#ede9fe" />
        <text x="560" y="214" textAnchor="middle" fill="#6d28d9" fontSize="18" fontWeight="900">
          positivo
        </text>
        <text x="560" y="245" textAnchor="middle" fill="#475569" fontSize="14" fontWeight="700">
          Saída final em classes discretas
        </text>
      </svg>
    </figure>
  );
}

function RetaComoModeloVisual() {
  return (
    <figure className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-4 shadow-xl shadow-emerald-900/5">
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label="Reta com intercepto e inclinação">
        <rect width="760" height="340" rx="28" fill="#ecfdf5" />
        <text x="380" y="44" textAnchor="middle" fill="#065f46" fontSize="22" fontWeight="900">
          Coeficientes mudam a inclinação; intercepto desloca a reta
        </text>
        <line x1="90" y1="280" x2="680" y2="280" stroke="#94a3b8" strokeWidth="2" />
        <line x1="90" y1="90" x2="90" y2="280" stroke="#94a3b8" strokeWidth="2" />
        <line x1="110" y1="255" x2="650" y2="165" stroke="#10b981" strokeWidth="5" />
        <line x1="110" y1="230" x2="650" y2="120" stroke="#059669" strokeWidth="5" strokeDasharray="10 6" />
        <text x="640" y="162" fill="#10b981" fontSize="14" fontWeight="800">
          w menor
        </text>
        <text x="640" y="116" fill="#059669" fontSize="14" fontWeight="800">
          w maior
        </text>
        <text x="125" y="230" fill="#065f46" fontSize="14" fontWeight="800">
          b
        </text>
        <rect x="510" y="224" width="170" height="70" rx="18" fill="#ffffff" stroke="#a7f3d0" strokeWidth="2" />
        <text x="595" y="252" textAnchor="middle" fill="#065f46" fontSize="15" fontWeight="900">
          y = b + w·x
        </text>
        <text x="595" y="276" textAnchor="middle" fill="#475569" fontSize="13" fontWeight="700">
          b desloca • w inclina
        </text>
      </svg>
    </figure>
  );
}

function ResiduosEAjusteVisual() {
  return (
    <figure className="rounded-[2rem] border border-cyan-200 bg-cyan-50 p-4 shadow-xl shadow-cyan-900/5">
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label="Pontos com resíduos até a reta ajustada">
        <rect width="760" height="340" rx="28" fill="#ecfeff" />
        <text x="380" y="44" textAnchor="middle" fill="#0f766e" fontSize="22" fontWeight="900">
          Resíduo é a distância vertical entre ponto e predição
        </text>
        <line x1="96" y1="284" x2="670" y2="284" stroke="#94a3b8" strokeWidth="2" />
        <line x1="96" y1="92" x2="96" y2="284" stroke="#94a3b8" strokeWidth="2" />
        <line x1="124" y1="256" x2="640" y2="144" stroke="#0f766e" strokeWidth="5" />
        {[
          { x: 150, y: 240, py: 250 },
          { x: 226, y: 212, py: 233 },
          { x: 310, y: 210, py: 214 },
          { x: 388, y: 177, py: 197 },
          { x: 472, y: 158, py: 179 },
          { x: 556, y: 142, py: 161 },
        ].map((point, index) => (
          <g key={index}>
            <line x1={point.x} y1={point.y} x2={point.x} y2={point.py} stroke="#f97316" strokeDasharray="6 5" strokeWidth="2" />
            <circle cx={point.x} cy={point.y} r="7" fill="#0f172a" />
          </g>
        ))}
        <rect x="520" y="226" width="158" height="62" rx="18" fill="#ffffff" stroke="#a5f3fc" strokeWidth="2" />
        <text x="599" y="251" textAnchor="middle" fill="#0f766e" fontSize="15" fontWeight="900">
          MSE aumenta
        </text>
        <text x="599" y="274" textAnchor="middle" fill="#475569" fontSize="13" fontWeight="700">
          quando resíduos grandes aparecem
        </text>
      </svg>
    </figure>
  );
}

function LinearVsProbabilidadeVisual() {
  return (
    <figure className="rounded-[2rem] border border-rose-200 bg-rose-50 p-4 shadow-xl shadow-rose-900/5">
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label="Reta produzindo probabilidades inválidas versus sigmoide limitada">
        <rect width="760" height="340" rx="28" fill="#fff1f2" />
        <text x="380" y="44" textAnchor="middle" fill="#9f1239" fontSize="22" fontWeight="900">
          Reta pura pode sair do intervalo probabilístico
        </text>
        <rect x="60" y="90" width="290" height="200" rx="22" fill="#ffffff" stroke="#fb7185" strokeWidth="3" />
        <line x1="92" y1="256" x2="322" y2="256" stroke="#94a3b8" strokeWidth="2" />
        <line x1="92" y1="118" x2="92" y2="256" stroke="#94a3b8" strokeWidth="2" />
        <line x1="110" y1="282" x2="316" y2="104" stroke="#e11d48" strokeWidth="5" />
        <text x="316" y="100" fill="#e11d48" fontSize="13" fontWeight="800">
          1,2
        </text>
        <text x="110" y="296" fill="#e11d48" fontSize="13" fontWeight="800">
          -0,1
        </text>
        <text x="205" y="280" textAnchor="middle" fill="#9f1239" fontSize="14" fontWeight="800">
          Problema: valores inválidos
        </text>

        <rect x="410" y="90" width="290" height="200" rx="22" fill="#ffffff" stroke="#8b5cf6" strokeWidth="3" />
        <line x1="442" y1="256" x2="672" y2="256" stroke="#94a3b8" strokeWidth="2" />
        <line x1="442" y1="118" x2="442" y2="256" stroke="#94a3b8" strokeWidth="2" />
        <path d="M 456 248 C 514 248, 516 174, 560 174 S 610 116, 668 116" fill="none" stroke="#7c3aed" strokeWidth="5" />
        <text x="675" y="120" fill="#7c3aed" fontSize="13" fontWeight="800">
          1
        </text>
        <text x="447" y="252" fill="#7c3aed" fontSize="13" fontWeight="800">
          0
        </text>
        <text x="555" y="280" textAnchor="middle" fill="#6d28d9" fontSize="14" fontWeight="800">
          Sigmoide respeita 0 ≤ p ≤ 1
        </text>
      </svg>
    </figure>
  );
}

function SigmoideCurvaVisual() {
  return (
    <figure className="rounded-[2rem] border border-violet-200 bg-violet-50 p-4 shadow-xl shadow-violet-900/5">
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label="Curva sigmoide com saturação nas pontas">
        <rect width="760" height="340" rx="28" fill="#faf5ff" />
        <text x="380" y="44" textAnchor="middle" fill="#6d28d9" fontSize="22" fontWeight="900">
          A sigmoide satura nas pontas e muda rápido no centro
        </text>
        <line x1="92" y1="272" x2="670" y2="272" stroke="#94a3b8" strokeWidth="2" />
        <line x1="92" y1="88" x2="92" y2="272" stroke="#94a3b8" strokeWidth="2" />
        <line x1="92" y1="180" x2="670" y2="180" stroke="#f59e0b" strokeDasharray="8 5" strokeWidth="2" />
        <path d="M 108 258 C 226 258, 244 180, 378 180 S 536 102, 654 102" fill="none" stroke="#7c3aed" strokeWidth="6" strokeLinecap="round" />
        <circle cx="378" cy="180" r="7" fill="#0f172a" />
        <text x="392" y="171" fill="#6d28d9" fontSize="13" fontWeight="800">
          z = 0 → p = 0,5
        </text>
        <text x="132" y="118" fill="#475569" fontSize="13" fontWeight="700">
          muita evidência negativa → prob. perto de 0
        </text>
        <text x="420" y="90" fill="#475569" fontSize="13" fontWeight="700">
          muita evidência positiva → prob. perto de 1
        </text>
      </svg>
    </figure>
  );
}

function FronteiraDecisaoVisual() {
  return (
    <figure className="rounded-[2rem] border border-indigo-200 bg-indigo-50 p-4 shadow-xl shadow-indigo-900/5">
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label="Plano com fronteira linear separando duas classes">
        <rect width="760" height="340" rx="28" fill="#eef2ff" />
        <text x="380" y="44" textAnchor="middle" fill="#3730a3" fontSize="22" fontWeight="900">
          Em 2D, a decisão nasce de uma reta
        </text>
        <polygon points="94,272 94,92 392,92 270,272" fill="#c7d2fe" opacity="0.85" />
        <polygon points="270,272 392,92 666,92 666,272" fill="#fed7aa" opacity="0.85" />
        <line x1="270" y1="272" x2="392" y2="92" stroke="#312e81" strokeWidth="5" strokeDasharray="10 6" />
        {[
          { x: 162, y: 218, positive: true },
          { x: 218, y: 180, positive: true },
          { x: 258, y: 146, positive: true },
          { x: 446, y: 170, positive: false },
          { x: 524, y: 132, positive: false },
          { x: 572, y: 208, positive: false },
        ].map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="8"
            fill={point.positive ? "#4338ca" : "#f97316"}
            stroke="#ffffff"
            strokeWidth="2"
          />
        ))}
        <text x="196" y="300" textAnchor="middle" fill="#3730a3" fontSize="14" fontWeight="800">
          p &ge; 0,5
        </text>
        <text x="542" y="300" textAnchor="middle" fill="#c2410c" fontSize="14" fontWeight="800">
          p &lt; 0,5
        </text>
      </svg>
    </figure>
  );
}

function ComparacaoModelosVisual() {
  return (
    <figure className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/5">
      <svg className="w-full" viewBox="0 0 760 320" role="img" aria-label="Tabela comparando regressão linear e logística">
        <rect width="760" height="320" rx="28" fill="#f8fafc" />
        <text x="380" y="42" textAnchor="middle" fill="#0f172a" fontSize="22" fontWeight="900">
          Parecidas na álgebra, diferentes na interpretação
        </text>
        <rect x="60" y="82" width="640" height="188" rx="20" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
        {["Problema", "Saída", "Perda típica", "Geometria"].map((label, index) => (
          <text key={label} x="94" y={116 + index * 40} fill="#475569" fontSize="14" fontWeight="800">
            {label}
          </text>
        ))}
        <text x="338" y="90" textAnchor="middle" fill="#0f766e" fontSize="16" fontWeight="900">
          Linear
        </text>
        <text x="558" y="90" textAnchor="middle" fill="#6d28d9" fontSize="16" fontWeight="900">
          Logística
        </text>
        <text x="338" y="116" textAnchor="middle" fill="#0f172a" fontSize="14" fontWeight="700">
          valor contínuo
        </text>
        <text x="558" y="116" textAnchor="middle" fill="#0f172a" fontSize="14" fontWeight="700">
          classe / probabilidade
        </text>
        <text x="338" y="156" textAnchor="middle" fill="#0f172a" fontSize="14" fontWeight="700">
          número real
        </text>
        <text x="558" y="156" textAnchor="middle" fill="#0f172a" fontSize="14" fontWeight="700">
          entre 0 e 1
        </text>
        <text x="338" y="196" textAnchor="middle" fill="#0f172a" fontSize="14" fontWeight="700">
          MSE / MAE / RMSE
        </text>
        <text x="558" y="196" textAnchor="middle" fill="#0f172a" fontSize="14" fontWeight="700">
          perda logística
        </text>
        <text x="338" y="236" textAnchor="middle" fill="#0f172a" fontSize="14" fontWeight="700">
          reta / plano
        </text>
        <text x="558" y="236" textAnchor="middle" fill="#0f172a" fontSize="14" fontWeight="700">
          hiperplano + sigmoide
        </text>
      </svg>
    </figure>
  );
}

function CuidadosPraticosVisual() {
  return (
    <figure className="rounded-[2rem] border border-amber-200 bg-amber-50 p-4 shadow-xl shadow-amber-900/5">
      <svg className="w-full" viewBox="0 0 760 320" role="img" aria-label="Cuidados práticos com escala, extrapolação e regularização">
        <rect width="760" height="320" rx="28" fill="#fffbeb" />
        <text x="380" y="42" textAnchor="middle" fill="#92400e" fontSize="22" fontWeight="900">
          Três cuidados práticos que mudam o resultado
        </text>
        {[
          {
            x: 70,
            title: "Escala",
            body1: "pesos não",
            body2: "se comparam crus",
          },
          {
            x: 285,
            title: "Extrapolação",
            body1: "fora do domínio",
            body2: "o risco cresce",
          },
          {
            x: 500,
            title: "Regularização",
            body1: "coeficientes mais",
            body2: "estáveis e contidos",
          },
        ].map((card) => (
          <g key={card.title}>
            <rect x={card.x} y="90" width="190" height="170" rx="22" fill="#ffffff" stroke="#f59e0b" strokeWidth="2" />
            <text x={card.x + 95} y="126" textAnchor="middle" fill="#92400e" fontSize="18" fontWeight="900">
              {card.title}
            </text>
            <text x={card.x + 95} y="180" textAnchor="middle" fill="#475569" fontSize="15" fontWeight="700">
              {card.body1}
            </text>
            <text x={card.x + 95} y="206" textAnchor="middle" fill="#475569" fontSize="15" fontWeight="700">
              {card.body2}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  );
}
