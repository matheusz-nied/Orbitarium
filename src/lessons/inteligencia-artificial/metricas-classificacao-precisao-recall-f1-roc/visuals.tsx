import type { LessonModule } from "../../../types/content";

export const visuals = {
  "metricas-hero": MetricasHeroVisual,
  "acuracia-vs-realidade": AcuraciaVsRealidadeVisual,
  "matriz-de-confusao": MatrizDeConfusaoVisual,
  "precisao-recall-balanca": PrecisaoRecallBalancaVisual,
  "threshold-operacional": ThresholdOperacionalVisual,
  "f1-combinacao": F1CombinacaoVisual,
  "roc-space": RocSpaceVisual,
  "escolha-de-metricas": EscolhaDeMetricasVisual,
} satisfies LessonModule["visuals"];

function MetricasHeroVisual() {
  return (
    <figure className="overflow-hidden rounded-[2rem] border border-rose-200 bg-white p-4 shadow-xl shadow-rose-900/10">
      <svg className="w-full" viewBox="0 0 760 420" role="img" aria-label="Fluxo de avaliação de classificação">
        <defs>
          <linearGradient id="metricsHeroBg" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#fff7ed" />
            <stop offset="50%" stopColor="#eef2ff" />
            <stop offset="100%" stopColor="#fff1f2" />
          </linearGradient>
        </defs>
        <rect width="760" height="420" rx="28" fill="url(#metricsHeroBg)" />
        <text x="380" y="44" textAnchor="middle" fill="#0f172a" fontSize="26" fontWeight="900">
          Um classificador não "acerta" só de um jeito
        </text>
        <rect x="60" y="108" width="150" height="88" rx="20" fill="#ffffff" stroke="#f97316" strokeWidth="3" />
        <text x="135" y="142" textAnchor="middle" fill="#c2410c" fontSize="16" fontWeight="900">
          probabilidades
        </text>
        <text x="135" y="168" textAnchor="middle" fill="#7c2d12" fontSize="13" fontWeight="700">
          escores do modelo
        </text>
        <path d="M 220 152 H 284" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
        <path d="M 274 142 L 284 152 L 274 162" fill="#475569" />
        <rect x="300" y="108" width="150" height="88" rx="20" fill="#ffffff" stroke="#4f46e5" strokeWidth="3" />
        <text x="375" y="142" textAnchor="middle" fill="#3730a3" fontSize="16" fontWeight="900">
          threshold
        </text>
        <text x="375" y="168" textAnchor="middle" fill="#4338ca" fontSize="13" fontWeight="700">
          decide positivo / negativo
        </text>
        <path d="M 460 152 H 524" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
        <path d="M 514 142 L 524 152 L 514 162" fill="#475569" />
        <rect x="540" y="108" width="160" height="88" rx="20" fill="#ffffff" stroke="#e11d48" strokeWidth="3" />
        <text x="620" y="142" textAnchor="middle" fill="#9f1239" fontSize="16" fontWeight="900">
          matriz de confusão
        </text>
        <text x="620" y="168" textAnchor="middle" fill="#be123c" fontSize="13" fontWeight="700">
          TP, FP, TN, FN
        </text>
        <rect x="120" y="246" width="520" height="110" rx="24" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
        <text x="380" y="278" textAnchor="middle" fill="#0f172a" fontSize="18" fontWeight="900">
          precisão • recall • F1 • ROC/AUC
        </text>
        <text x="380" y="312" textAnchor="middle" fill="#475569" fontSize="14" fontWeight="700">
          Cada métrica destaca um tipo de risco e um aspecto do comportamento do modelo
        </text>
      </svg>
    </figure>
  );
}

function AcuraciaVsRealidadeVisual() {
  return (
    <figure className="rounded-[2rem] border border-amber-200 bg-amber-50 p-4 shadow-xl shadow-amber-900/5">
      <svg className="w-full" viewBox="0 0 760 330" role="img" aria-label="Acurácia alta em base desbalanceada">
        <rect width="760" height="330" rx="28" fill="#fffbeb" />
        <text x="380" y="42" textAnchor="middle" fill="#92400e" fontSize="22" fontWeight="900">
          Acurácia alta pode esconder um classificador inútil
        </text>
        {Array.from({ length: 10 }).map((_, index) => (
          <circle
            key={index}
            cx={110 + (index % 5) * 58}
            cy={122 + Math.floor(index / 5) * 58}
            r="20"
            fill={index === 8 ? "#e11d48" : "#d1d5db"}
          />
        ))}
        <rect x="430" y="98" width="230" height="120" rx="22" fill="#ffffff" stroke="#f59e0b" strokeWidth="3" />
        <text x="545" y="132" textAnchor="middle" fill="#92400e" fontSize="16" fontWeight="900">
          modelo prevê tudo como negativo
        </text>
        <text x="545" y="170" textAnchor="middle" fill="#0f172a" fontSize="36" fontWeight="900">
          90%
        </text>
        <text x="545" y="196" textAnchor="middle" fill="#475569" fontSize="14" fontWeight="700">
          de acurácia, mas recall zero para a classe rara
        </text>
      </svg>
    </figure>
  );
}

function MatrizDeConfusaoVisual() {
  return (
    <figure className="rounded-[2rem] border border-indigo-200 bg-indigo-50 p-4 shadow-xl shadow-indigo-900/5">
      <svg className="w-full" viewBox="0 0 760 320" role="img" aria-label="Matriz de confusão com quatro células">
        <rect width="760" height="320" rx="28" fill="#eef2ff" />
        <text x="380" y="42" textAnchor="middle" fill="#3730a3" fontSize="22" fontWeight="900">
          Toda métrica binária nasce daqui
        </text>
        <text x="320" y="86" textAnchor="middle" fill="#475569" fontSize="12" fontWeight="800">
          real positivo
        </text>
        <text x="470" y="86" textAnchor="middle" fill="#475569" fontSize="12" fontWeight="800">
          real negativo
        </text>
        <text x="200" y="152" textAnchor="middle" fill="#475569" fontSize="12" fontWeight="800">
          previsto +
        </text>
        <text x="200" y="236" textAnchor="middle" fill="#475569" fontSize="12" fontWeight="800">
          previsto -
        </text>
        {[
          { x: 260, y: 106, label: "TP", fill: "#c7d2fe", color: "#312e81" },
          { x: 410, y: 106, label: "FP", fill: "#fed7aa", color: "#9a3412" },
          { x: 260, y: 190, label: "FN", fill: "#fee2e2", color: "#b91c1c" },
          { x: 410, y: 190, label: "TN", fill: "#d1fae5", color: "#065f46" },
        ].map((cell) => (
          <g key={cell.label}>
            <rect x={cell.x} y={cell.y} width="120" height="64" rx="18" fill={cell.fill} />
            <text x={cell.x + 60} y={cell.y + 39} textAnchor="middle" fill={cell.color} fontSize="20" fontWeight="900">
              {cell.label}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  );
}

function PrecisaoRecallBalancaVisual() {
  return (
    <figure className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-4 shadow-xl shadow-emerald-900/5">
      <svg className="w-full" viewBox="0 0 760 320" role="img" aria-label="Balança entre precisão e recall">
        <rect width="760" height="320" rx="28" fill="#ecfdf5" />
        <text x="380" y="42" textAnchor="middle" fill="#065f46" fontSize="22" fontWeight="900">
          Precisão e recall enfatizam riscos diferentes
        </text>
        <line x1="380" y1="100" x2="380" y2="232" stroke="#065f46" strokeWidth="8" strokeLinecap="round" />
        <line x1="250" y1="134" x2="510" y2="134" stroke="#065f46" strokeWidth="8" strokeLinecap="round" />
        <line x1="250" y1="134" x2="218" y2="212" stroke="#065f46" strokeWidth="4" />
        <line x1="510" y1="134" x2="542" y2="212" stroke="#065f46" strokeWidth="4" />
        <rect x="150" y="212" width="136" height="54" rx="18" fill="#ffffff" stroke="#10b981" strokeWidth="2" />
        <rect x="474" y="212" width="136" height="54" rx="18" fill="#ffffff" stroke="#10b981" strokeWidth="2" />
        <text x="218" y="244" textAnchor="middle" fill="#065f46" fontSize="15" fontWeight="900">
          precisão
        </text>
        <text x="542" y="244" textAnchor="middle" fill="#065f46" fontSize="15" fontWeight="900">
          recall
        </text>
        <text x="218" y="286" textAnchor="middle" fill="#475569" fontSize="13" fontWeight="700">
          pune FP
        </text>
        <text x="542" y="286" textAnchor="middle" fill="#475569" fontSize="13" fontWeight="700">
          pune FN
        </text>
      </svg>
    </figure>
  );
}

function ThresholdOperacionalVisual() {
  return (
    <figure className="rounded-[2rem] border border-teal-200 bg-teal-50 p-4 shadow-xl shadow-teal-900/5">
      <svg className="w-full" viewBox="0 0 760 330" role="img" aria-label="Threshold movendo a fronteira entre positivos e negativos previstos">
        <rect width="760" height="330" rx="28" fill="#f0fdfa" />
        <text x="380" y="42" textAnchor="middle" fill="#0f766e" fontSize="22" fontWeight="900">
          O threshold move a política de decisão
        </text>
        <line x1="90" y1="250" x2="670" y2="250" stroke="#94a3b8" strokeWidth="2" />
        {Array.from({ length: 12 }).map((_, index) => (
          <circle
            key={index}
            cx={120 + index * 42}
            cy={170 + ((index % 3) - 1) * 18}
            r="12"
            fill={index < 7 ? "#10b981" : "#cbd5e1"}
          />
        ))}
        <line x1="404" y1="92" x2="404" y2="256" stroke="#0f172a" strokeDasharray="8 5" strokeWidth="4" />
        <text x="404" y="82" textAnchor="middle" fill="#0f172a" fontSize="13" fontWeight="900">
          threshold
        </text>
        <text x="250" y="290" textAnchor="middle" fill="#0f766e" fontSize="14" fontWeight="800">
          abaixo do corte → negativos previstos
        </text>
        <text x="536" y="290" textAnchor="middle" fill="#0f766e" fontSize="14" fontWeight="800">
          acima do corte → positivos previstos
        </text>
      </svg>
    </figure>
  );
}

function F1CombinacaoVisual() {
  return (
    <figure className="rounded-[2rem] border border-violet-200 bg-violet-50 p-4 shadow-xl shadow-violet-900/5">
      <svg className="w-full" viewBox="0 0 760 320" role="img" aria-label="Combinação de precisão e recall na F1">
        <rect width="760" height="320" rx="28" fill="#faf5ff" />
        <text x="380" y="42" textAnchor="middle" fill="#6d28d9" fontSize="22" fontWeight="900">
          F1 pune desequilíbrio entre precisão e recall
        </text>
        <rect x="120" y="96" width="150" height="118" rx="22" fill="#ffffff" stroke="#8b5cf6" strokeWidth="3" />
        <text x="195" y="132" textAnchor="middle" fill="#6d28d9" fontSize="16" fontWeight="900">
          precisão
        </text>
        <text x="195" y="182" textAnchor="middle" fill="#0f172a" fontSize="34" fontWeight="900">
          0,95
        </text>
        <rect x="490" y="96" width="150" height="118" rx="22" fill="#ffffff" stroke="#8b5cf6" strokeWidth="3" />
        <text x="565" y="132" textAnchor="middle" fill="#6d28d9" fontSize="16" fontWeight="900">
          recall
        </text>
        <text x="565" y="182" textAnchor="middle" fill="#0f172a" fontSize="34" fontWeight="900">
          0,35
        </text>
        <path d="M 286 154 H 474" stroke="#8b5cf6" strokeWidth="6" strokeLinecap="round" />
        <text x="380" y="144" textAnchor="middle" fill="#6d28d9" fontSize="15" fontWeight="900">
          média harmônica
        </text>
        <rect x="302" y="194" width="156" height="58" rx="18" fill="#ffffff" stroke="#c4b5fd" strokeWidth="2" />
        <text x="380" y="230" textAnchor="middle" fill="#6d28d9" fontSize="22" fontWeight="900">
          F1 cai
        </text>
      </svg>
    </figure>
  );
}

function RocSpaceVisual() {
  return (
    <figure className="rounded-[2rem] border border-rose-200 bg-rose-50 p-4 shadow-xl shadow-rose-900/5">
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label="Espaço ROC">
        <rect width="760" height="340" rx="28" fill="#fff1f2" />
        <text x="380" y="42" textAnchor="middle" fill="#9f1239" fontSize="22" fontWeight="900">
          ROC mostra TPR contra FPR para vários thresholds
        </text>
        <line x1="110" y1="280" x2="650" y2="280" stroke="#94a3b8" strokeWidth="2" />
        <line x1="110" y1="92" x2="110" y2="280" stroke="#94a3b8" strokeWidth="2" />
        <line x1="110" y1="280" x2="650" y2="92" stroke="#cbd5e1" strokeDasharray="8 6" strokeWidth="2" />
        <path d="M 110 280 C 160 230, 200 170, 260 150 S 380 104, 650 92" fill="none" stroke="#e11d48" strokeWidth="5" />
        <circle cx="320" cy="132" r="8" fill="#0f172a" />
        <text x="328" y="120" fill="#9f1239" fontSize="13" fontWeight="900">
          um threshold
        </text>
        <text x="650" y="304" textAnchor="end" fill="#475569" fontSize="13" fontWeight="800">
          FPR
        </text>
        <text x="84" y="98" textAnchor="middle" fill="#475569" fontSize="13" fontWeight="800">
          TPR
        </text>
      </svg>
    </figure>
  );
}

function EscolhaDeMetricasVisual() {
  return (
    <figure className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/5">
      <svg className="w-full" viewBox="0 0 760 320" role="img" aria-label="Escolha de métricas por contexto">
        <rect width="760" height="320" rx="28" fill="#f8fafc" />
        <text x="380" y="42" textAnchor="middle" fill="#0f172a" fontSize="22" fontWeight="900">
          Métrica boa é a que respeita o custo do erro
        </text>
        {[
          { x: 72, title: "triagem", body1: "recall alto", body2: "evita perder casos" },
          { x: 286, title: "bloqueio", body1: "precisão alta", body2: "evita alarmes falsos" },
          { x: 500, title: "ranking", body1: "ROC/AUC", body2: "olha vários limiares" },
        ].map((card) => (
          <g key={card.title}>
            <rect x={card.x} y="96" width="188" height="152" rx="22" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
            <text x={card.x + 94} y="130" textAnchor="middle" fill="#0f172a" fontSize="18" fontWeight="900">
              {card.title}
            </text>
            <text x={card.x + 94} y="176" textAnchor="middle" fill="#4f46e5" fontSize="16" fontWeight="900">
              {card.body1}
            </text>
            <text x={card.x + 94} y="206" textAnchor="middle" fill="#475569" fontSize="13" fontWeight="700">
              {card.body2}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  );
}
