import type { LessonModule } from "../../../types/content";

export const visuals = {
  "perdas-hero": PerdasHeroVisual,
  "objetivo-vs-metrica": ObjetivoVsMetricaVisual,
  "mse-regressao": MseRegressaoVisual,
  "cross-entropy-classificacao": CrossEntropyClassificacaoVisual,
  "paisagem-de-perda": PaisagemDePerdaVisual,
  "comparacao-probabilidades": ComparacaoProbabilidadesVisual,
  "robustez-outliers": RobustezOutliersVisual,
} satisfies LessonModule["visuals"];

function PerdasHeroVisual() {
  return (
    <figure className="overflow-hidden rounded-[2rem] border border-rose-200 bg-white p-4 shadow-xl shadow-rose-900/10">
      <svg className="w-full" viewBox="0 0 760 390" role="img" aria-label="Funções de perda guiando uma previsão até o alvo">
        <defs>
          <linearGradient id="lossHeroBg" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#fff1f2" />
            <stop offset="55%" stopColor="#eff6ff" />
            <stop offset="100%" stopColor="#ecfeff" />
          </linearGradient>
        </defs>
        <rect width="760" height="390" rx="30" fill="url(#lossHeroBg)" />
        <text x="380" y="52" textAnchor="middle" fill="#9f1239" fontSize="26" fontWeight="900">
          A perda define para onde o modelo corre
        </text>
        <circle cx="160" cy="230" r="24" fill="#ffffff" stroke="#fb7185" strokeWidth="3" />
        <text x="160" y="236" textAnchor="middle" fill="#be123c" fontSize="13" fontWeight="900">ŷ</text>
        <path d="M184 230 C 260 230, 300 150, 385 150 S 520 230, 600 170" stroke="#e11d48" strokeWidth="5" fill="none" strokeLinecap="round" />
        <circle cx="620" cy="170" r="24" fill="#ffffff" stroke="#0f766e" strokeWidth="3" />
        <text x="620" y="176" textAnchor="middle" fill="#0f766e" fontSize="13" fontWeight="900">y</text>
        <rect x="120" y="290" width="520" height="44" rx="16" fill="#ffffff" stroke="#fda4af" strokeWidth="2" />
        <text x="380" y="318" textAnchor="middle" fill="#475569" fontSize="15" fontWeight="800">
          objetivo diferente → pressão de correção diferente → comportamento de treino diferente
        </text>
      </svg>
    </figure>
  );
}

function ObjetivoVsMetricaVisual() {
  return (
    <figure className="rounded-[2rem] border border-indigo-200 bg-indigo-50 p-4 shadow-xl shadow-indigo-900/5">
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label="Diferença entre métrica final e perda de treinamento">
        <rect width="760" height="340" rx="28" fill="#eef2ff" />
        <text x="380" y="48" textAnchor="middle" fill="#3730a3" fontSize="22" fontWeight="900">Métrica conta desempenho, perda ensina a treinar</text>
        <rect x="90" y="95" width="240" height="170" rx="18" fill="#ffffff" stroke="#6366f1" strokeWidth="3" />
        <text x="210" y="130" textAnchor="middle" fill="#3730a3" fontSize="17" fontWeight="900">Métrica</text>
        <text x="210" y="170" textAnchor="middle" fill="#475569" fontSize="14" fontWeight="700">resumo do resultado final</text>
        <text x="210" y="198" textAnchor="middle" fill="#475569" fontSize="14" fontWeight="700">ex.: acurácia, F1, RMSE</text>
        <rect x="430" y="95" width="240" height="170" rx="18" fill="#ffffff" stroke="#ec4899" strokeWidth="3" />
        <text x="550" y="130" textAnchor="middle" fill="#9f1239" fontSize="17" fontWeight="900">Perda</text>
        <text x="550" y="170" textAnchor="middle" fill="#475569" fontSize="14" fontWeight="700">função otimizada no treino</text>
        <text x="550" y="198" textAnchor="middle" fill="#475569" fontSize="14" fontWeight="700">ex.: MSE, cross-entropy</text>
      </svg>
    </figure>
  );
}

function MseRegressaoVisual() {
  return (
    <figure className="rounded-[2rem] border border-teal-200 bg-teal-50 p-4 shadow-xl shadow-teal-900/5">
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label="Erro quadrático em regressão">
        <rect width="760" height="340" rx="28" fill="#f0fdfa" />
        <text x="380" y="48" textAnchor="middle" fill="#0f766e" fontSize="22" fontWeight="900">MSE mede distância numérica</text>
        <line x1="120" y1="260" x2="640" y2="260" stroke="#94a3b8" strokeWidth="2" />
        <line x1="120" y1="80" x2="120" y2="280" stroke="#94a3b8" strokeWidth="2" />
        <circle cx="280" cy="150" r="10" fill="#0f766e" />
        <circle cx="420" cy="210" r="10" fill="#be123c" />
        <line x1="280" y1="150" x2="420" y2="210" stroke="#0f766e" strokeWidth="4" strokeDasharray="8 8" />
        <text x="280" y="132" textAnchor="middle" fill="#0f766e" fontSize="13" fontWeight="900">alvo</text>
        <text x="420" y="236" textAnchor="middle" fill="#be123c" fontSize="13" fontWeight="900">previsão</text>
        <text x="380" y="305" textAnchor="middle" fill="#0f766e" fontSize="15" fontWeight="800">o quadrado torna desvios grandes mais caros</text>
      </svg>
    </figure>
  );
}

function CrossEntropyClassificacaoVisual() {
  return (
    <figure className="rounded-[2rem] border border-fuchsia-200 bg-fuchsia-50 p-4 shadow-xl shadow-fuchsia-900/5">
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label="Cross entropy premiando alta probabilidade para a classe correta">
        <rect width="760" height="340" rx="28" fill="#fdf4ff" />
        <text x="380" y="48" textAnchor="middle" fill="#86198f" fontSize="22" fontWeight="900">Cross-entropy pune confiança errada</text>
        <rect x="130" y="120" width="90" height="120" rx="16" fill="#f5d0fe" />
        <rect x="250" y="95" width="90" height="145" rx="16" fill="#e879f9" />
        <rect x="370" y="165" width="90" height="75" rx="16" fill="#f5d0fe" />
        <rect x="490" y="210" width="90" height="30" rx="16" fill="#f5d0fe" />
        <text x="295" y="84" textAnchor="middle" fill="#86198f" fontSize="13" fontWeight="900">classe correta</text>
        <text x="380" y="295" textAnchor="middle" fill="#86198f" fontSize="15" fontWeight="800">queremos massa de probabilidade concentrada na resposta certa</text>
      </svg>
    </figure>
  );
}

function PaisagemDePerdaVisual() {
  return (
    <figure className="rounded-[2rem] border border-amber-200 bg-amber-50 p-4 shadow-xl shadow-amber-900/5">
      <svg className="w-full" viewBox="0 0 760 350" role="img" aria-label="Paisagem de perda conceitual">
        <rect width="760" height="350" rx="28" fill="#fffbeb" />
        <text x="380" y="48" textAnchor="middle" fill="#92400e" fontSize="22" fontWeight="900">Treinar é descer uma superfície abstrata</text>
        <path d="M90 250 C 150 210, 220 120, 300 160 S 420 290, 520 185 S 630 115, 690 170" stroke="#d97706" strokeWidth="6" fill="none" strokeLinecap="round" />
        <circle cx="145" cy="215" r="9" fill="#be123c" />
        <text x="145" y="198" textAnchor="middle" fill="#92400e" fontSize="12" fontWeight="900">início</text>
        <circle cx="514" cy="187" r="9" fill="#0f766e" />
        <text x="514" y="170" textAnchor="middle" fill="#0f766e" fontSize="12" fontWeight="900">vale melhor</text>
      </svg>
    </figure>
  );
}

function ComparacaoProbabilidadesVisual() {
  return (
    <figure className="rounded-[2rem] border border-sky-200 bg-sky-50 p-4 shadow-xl shadow-sky-900/5">
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label="Comparação de perdas ao variar probabilidade correta">
        <rect width="760" height="340" rx="28" fill="#f0f9ff" />
        <text x="380" y="48" textAnchor="middle" fill="#0c4a6e" fontSize="22" fontWeight="900">Mesma probabilidade, mensagens diferentes</text>
        <path d="M120 250 C 260 250, 350 220, 470 160 S 610 95, 640 80" stroke="#be123c" strokeWidth="5" fill="none" />
        <path d="M120 250 C 250 235, 380 205, 640 130" stroke="#0284c7" strokeWidth="5" fill="none" />
        <text x="615" y="92" fill="#be123c" fontSize="13" fontWeight="900">cross-entropy</text>
        <text x="615" y="145" fill="#0284c7" fontSize="13" fontWeight="900">MSE</text>
      </svg>
    </figure>
  );
}

function RobustezOutliersVisual() {
  return (
    <figure className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-4 shadow-xl shadow-emerald-900/5">
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label="Outliers puxando o ajuste em regressão">
        <rect width="760" height="340" rx="28" fill="#ecfdf5" />
        <text x="380" y="48" textAnchor="middle" fill="#065f46" fontSize="22" fontWeight="900">Nem todo problema quer obedecer a outliers</text>
        {[[170,220],[220,205],[280,190],[340,178],[400,165],[460,152],[520,140]].map(([x,y], idx) => (
          <circle key={idx} cx={x} cy={y} r="8" fill="#10b981" />
        ))}
        <circle cx="620" cy="90" r="10" fill="#be123c" />
        <path d="M130 240 C 240 215, 390 165, 560 135" stroke="#10b981" strokeWidth="5" fill="none" />
        <path d="M130 255 C 270 245, 430 210, 620 90" stroke="#fb7185" strokeWidth="5" fill="none" />
        <text x="615" y="75" fill="#be123c" fontSize="12" fontWeight="900">outlier</text>
      </svg>
    </figure>
  );
}
