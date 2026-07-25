import type { LessonModule } from "../../../types/content";

export const visuals = {
  "probabilidade-hero": ProbabilidadeHeroVisual,
  "incerteza-decisao": IncertezaDecisaoVisual,
  "frequencia-vs-probabilidade": FrequenciaVsProbabilidadeVisual,
  "distribuicoes-comuns": DistribuicoesComunsVisual,
  "histograma-intuicao": HistogramaIntuicaoVisual,
  "variavel-aleatoria-mapa": VariavelAleatoriaMapaVisual,
  "valor-esperado-balanca": ValorEsperadoBalancaVisual,
  "bayes-fluxo": BayesFluxoVisual,
  "ml-probabilistico": MlProbabilisticoVisual,
} satisfies LessonModule["visuals"];

function ProbabilidadeHeroVisual() {
  return (
    <figure className="overflow-hidden rounded-[2rem] border border-sky-200 bg-white p-4 shadow-xl shadow-sky-900/10">
      <svg className="w-full" viewBox="0 0 760 420" role="img" aria-label="Probabilidade como linguagem da incerteza em IA">
        <defs>
          <linearGradient id="probHeroBg" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#eff6ff" />
            <stop offset="55%" stopColor="#f5f3ff" />
            <stop offset="100%" stopColor="#ecfeff" />
          </linearGradient>
        </defs>
        <rect width="760" height="420" rx="30" fill="url(#probHeroBg)" />
        <text x="380" y="52" textAnchor="middle" fill="#0f172a" fontSize="28" fontWeight="900">
          IA pensa em possibilidades, não em certezas mágicas
        </text>
        <rect x="60" y="95" width="190" height="210" rx="22" fill="#ffffff" stroke="#3b82f6" strokeWidth="3" />
        <text x="155" y="130" textAnchor="middle" fill="#1d4ed8" fontSize="18" fontWeight="900">
          Evidência
        </text>
        <circle cx="120" cy="180" r="28" fill="#bfdbfe" />
        <rect x="165" y="155" width="48" height="48" rx="12" fill="#dbeafe" />
        <path d="M100 245h110" stroke="#93c5fd" strokeWidth="10" strokeLinecap="round" />
        <text x="155" y="275" textAnchor="middle" fill="#1e40af" fontSize="14" fontWeight="700">
          dados incompletos + ruído
        </text>
        <path d="M280 200h70" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
        <path d="M335 188l16 12l-16 12" fill="#475569" />
        <rect x="380" y="95" width="320" height="210" rx="22" fill="#ffffff" stroke="#0f766e" strokeWidth="3" />
        <text x="540" y="130" textAnchor="middle" fill="#0f766e" fontSize="18" fontWeight="900">
          Distribuição de saídas
        </text>
        {[
          { x: 435, h: 45, label: "spam", color: "#93c5fd" },
          { x: 505, h: 120, label: "promoção", color: "#14b8a6" },
          { x: 575, h: 82, label: "social", color: "#8b5cf6" },
          { x: 645, h: 30, label: "outro", color: "#f59e0b" },
        ].map((bar) => (
          <g key={bar.label}>
            <rect x={bar.x} y={255 - bar.h} width="40" height={bar.h} rx="10" fill={bar.color} />
            <text x={bar.x + 20} y="280" textAnchor="middle" fill="#475569" fontSize="12" fontWeight="700">
              {bar.label}
            </text>
          </g>
        ))}
        <rect x="100" y="335" width="560" height="54" rx="18" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
        <text x="380" y="368" textAnchor="middle" fill="#0f172a" fontSize="16" fontWeight="800">
          Probabilidade transforma ambiguidade em graus de confiança utilizáveis
        </text>
      </svg>
    </figure>
  );
}

function IncertezaDecisaoVisual() {
  return (
    <figure className="rounded-[2rem] border border-indigo-200 bg-indigo-50 p-4 shadow-xl shadow-indigo-900/5">
      <svg className="w-full" viewBox="0 0 760 360" role="img" aria-label="Da evidência à decisão probabilística">
        <rect width="760" height="360" rx="28" fill="#eef2ff" />
        <text x="380" y="48" textAnchor="middle" fill="#3730a3" fontSize="22" fontWeight="900">
          Evidência parcial -&gt; confiança graduada -&gt; decisão
        </text>
        <rect x="70" y="90" width="180" height="200" rx="18" fill="#ffffff" stroke="#4f46e5" strokeWidth="3" />
        <text x="160" y="130" textAnchor="middle" fill="#4338ca" fontSize="16" fontWeight="900">Entrada</text>
        <text x="160" y="170" textAnchor="middle" fill="#6366f1" fontSize="14" fontWeight="700">sinais mistos</text>
        <text x="160" y="195" textAnchor="middle" fill="#6366f1" fontSize="14" fontWeight="700">dados incompletos</text>
        <text x="160" y="220" textAnchor="middle" fill="#6366f1" fontSize="14" fontWeight="700">contexto ruidoso</text>
        <path d="M275 190h65" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
        <path d="M325 178l16 12l-16 12" fill="#475569" />
        <rect x="370" y="90" width="160" height="200" rx="18" fill="#ffffff" stroke="#0f766e" strokeWidth="3" />
        <text x="450" y="130" textAnchor="middle" fill="#0f766e" fontSize="16" fontWeight="900">Modelo</text>
        <circle cx="450" cy="200" r="48" fill="#ccfbf1" stroke="#14b8a6" strokeWidth="3" />
        <text x="450" y="205" textAnchor="middle" fill="#115e59" fontSize="14" fontWeight="900">P(y | x)</text>
        <path d="M555 190h65" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
        <path d="M605 178l16 12l-16 12" fill="#475569" />
        <rect x="640" y="90" width="80" height="200" rx="18" fill="#ffffff" stroke="#f59e0b" strokeWidth="3" />
        <text x="680" y="130" textAnchor="middle" fill="#b45309" fontSize="16" fontWeight="900">Ação</text>
        <text x="680" y="175" textAnchor="middle" fill="#d97706" fontSize="13" fontWeight="800">aprovar</text>
        <text x="680" y="200" textAnchor="middle" fill="#d97706" fontSize="13" fontWeight="800">bloquear</text>
        <text x="680" y="225" textAnchor="middle" fill="#d97706" fontSize="13" fontWeight="800">revisar</text>
        <text x="380" y="334" textAnchor="middle" fill="#3730a3" fontSize="15" fontWeight="800">
          Sem probabilidade, toda ambiguidade vira chute disfarçado de certeza
        </text>
      </svg>
    </figure>
  );
}

function FrequenciaVsProbabilidadeVisual() {
  return (
    <figure className="rounded-[2rem] border border-sky-200 bg-sky-50 p-4 shadow-xl shadow-sky-900/5">
      <svg className="w-full" viewBox="0 0 760 350" role="img" aria-label="Frequência observada e probabilidade modelada">
        <rect width="760" height="350" rx="28" fill="#f0f9ff" />
        <text x="380" y="48" textAnchor="middle" fill="#0369a1" fontSize="22" fontWeight="900">
          Frequência descreve a amostra • probabilidade descreve o mecanismo
        </text>
        <rect x="70" y="95" width="260" height="190" rx="18" fill="#ffffff" stroke="#38bdf8" strokeWidth="3" />
        <text x="200" y="130" textAnchor="middle" fill="#0369a1" fontSize="16" fontWeight="900">O que vimos</text>
        <rect x="120" y="160" width="60" height="90" rx="12" fill="#38bdf8" />
        <rect x="220" y="190" width="60" height="60" rx="12" fill="#cbd5e1" />
        <text x="150" y="272" textAnchor="middle" fill="#0369a1" fontSize="13" fontWeight="800">52 caras</text>
        <text x="250" y="272" textAnchor="middle" fill="#475569" fontSize="13" fontWeight="800">48 coroas</text>
        <path d="M365 190h45" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
        <path d="M398 178l14 12l-14 12" fill="#475569" />
        <rect x="440" y="95" width="250" height="190" rx="18" fill="#ffffff" stroke="#0f766e" strokeWidth="3" />
        <text x="565" y="130" textAnchor="middle" fill="#0f766e" fontSize="16" fontWeight="900">O que inferimos</text>
        <rect x="500" y="160" width="120" height="26" rx="13" fill="#ccfbf1" />
        <rect x="500" y="160" width="68" height="26" rx="13" fill="#14b8a6" />
        <text x="560" y="205" textAnchor="middle" fill="#115e59" fontSize="13" fontWeight="800">P(cara) ~ 0,52</text>
        <text x="560" y="230" textAnchor="middle" fill="#475569" fontSize="13" fontWeight="700">estimativa, não certeza eterna</text>
        <text x="380" y="325" textAnchor="middle" fill="#0369a1" fontSize="15" fontWeight="800">
          Mais dados tendem a estabilizar a frequência, mas não apagam a ideia de incerteza
        </text>
      </svg>
    </figure>
  );
}

function DistribuicoesComunsVisual() {
  return (
    <figure className="rounded-[2rem] border border-violet-200 bg-violet-50 p-4 shadow-xl shadow-violet-900/5">
      <svg className="w-full" viewBox="0 0 760 360" role="img" aria-label="Distribuições como mapas de possibilidades">
        <rect width="760" height="360" rx="28" fill="#faf5ff" />
        <text x="380" y="48" textAnchor="middle" fill="#6d28d9" fontSize="22" fontWeight="900">
          Uma distribuição revela forma, concentração e extremos
        </text>
        <rect x="60" y="95" width="190" height="200" rx="18" fill="#ffffff" stroke="#8b5cf6" strokeWidth="3" />
        <text x="155" y="128" textAnchor="middle" fill="#6d28d9" fontSize="16" fontWeight="900">Uniforme</text>
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={95 + i * 35} y="190" width="24" height="55" rx="8" fill="#c4b5fd" />
        ))}
        <rect x="285" y="95" width="190" height="200" rx="18" fill="#ffffff" stroke="#8b5cf6" strokeWidth="3" />
        <text x="380" y="128" textAnchor="middle" fill="#6d28d9" fontSize="16" fontWeight="900">Concentrada</text>
        {[18, 55, 95, 55, 18].map((h, i) => (
          <rect key={i} x={315 + i * 26} y={245 - h} width="18" height={h} rx="8" fill="#8b5cf6" />
        ))}
        <rect x="510" y="95" width="190" height="200" rx="18" fill="#ffffff" stroke="#8b5cf6" strokeWidth="3" />
        <text x="605" y="128" textAnchor="middle" fill="#6d28d9" fontSize="16" fontWeight="900">Assimétrica</text>
        {[88, 60, 38, 22, 12].map((h, i) => (
          <rect key={i} x={540 + i * 26} y={245 - h} width="18" height={h} rx="8" fill="#a78bfa" />
        ))}
        <text x="380" y="330" textAnchor="middle" fill="#6d28d9" fontSize="15" fontWeight="800">
          A forma da distribuição muda a interpretação do risco e da previsão
        </text>
      </svg>
    </figure>
  );
}

function HistogramaIntuicaoVisual() {
  return (
    <figure className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-4 shadow-xl shadow-emerald-900/5">
      <svg className="w-full" viewBox="0 0 760 360" role="img" aria-label="Histograma como resumo visual dos dados">
        <rect width="760" height="360" rx="28" fill="#ecfdf5" />
        <text x="380" y="48" textAnchor="middle" fill="#047857" fontSize="22" fontWeight="900">
          Histograma: onde os dados se acumulam?
        </text>
        <line x1="100" y1="280" x2="670" y2="280" stroke="#065f46" strokeWidth="3" />
        <line x1="100" y1="90" x2="100" y2="280" stroke="#065f46" strokeWidth="3" />
        {[35, 80, 130, 110, 70, 28].map((h, i) => (
          <rect key={i} x={130 + i * 80} y={280 - h} width="54" height={h} rx="10" fill="#34d399" />
        ))}
        <text x="380" y="320" textAnchor="middle" fill="#047857" fontSize="15" fontWeight="800">
          Barras mais altas sugerem regiões comuns; caudas sugerem raridades
        </text>
      </svg>
    </figure>
  );
}

function VariavelAleatoriaMapaVisual() {
  return (
    <figure className="rounded-[2rem] border border-amber-200 bg-amber-50 p-4 shadow-xl shadow-amber-900/5">
      <svg className="w-full" viewBox="0 0 760 360" role="img" aria-label="Variável aleatória mapeando resultados em números">
        <rect width="760" height="360" rx="28" fill="#fffbeb" />
        <text x="380" y="48" textAnchor="middle" fill="#92400e" fontSize="22" fontWeight="900">
          Resultado simbólico -&gt; variável aleatória -&gt; número analisável
        </text>
        <rect x="70" y="90" width="250" height="210" rx="18" fill="#ffffff" stroke="#f59e0b" strokeWidth="3" />
        <text x="195" y="125" textAnchor="middle" fill="#b45309" fontSize="16" fontWeight="900">Duas moedas</text>
        <text x="195" y="165" textAnchor="middle" fill="#92400e" fontSize="14" fontWeight="800">CC • CK • KC • KK</text>
        <path d="M350 195h60" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
        <path d="M395 183l16 12l-16 12" fill="#475569" />
        <rect x="440" y="90" width="250" height="210" rx="18" fill="#ffffff" stroke="#d97706" strokeWidth="3" />
        <text x="565" y="125" textAnchor="middle" fill="#b45309" fontSize="16" fontWeight="900">X = número de caras</text>
        <text x="565" y="165" textAnchor="middle" fill="#92400e" fontSize="14" fontWeight="800">CC -&gt; 2</text>
        <text x="565" y="190" textAnchor="middle" fill="#92400e" fontSize="14" fontWeight="800">CK ou KC -&gt; 1</text>
        <text x="565" y="215" textAnchor="middle" fill="#92400e" fontSize="14" fontWeight="800">KK -&gt; 0</text>
        <text x="380" y="330" textAnchor="middle" fill="#92400e" fontSize="15" fontWeight="800">
          O experimento continua aleatório, mas agora pode ser resumido com média, dispersão e distribuição
        </text>
      </svg>
    </figure>
  );
}

function ValorEsperadoBalancaVisual() {
  return (
    <figure className="rounded-[2rem] border border-rose-200 bg-rose-50 p-4 shadow-xl shadow-rose-900/5">
      <svg className="w-full" viewBox="0 0 760 350" role="img" aria-label="Valor esperado como balanço entre chance e consequência">
        <rect width="760" height="350" rx="28" fill="#fff1f2" />
        <text x="380" y="48" textAnchor="middle" fill="#be123c" fontSize="22" fontWeight="900">
          Valor esperado combina chance com impacto
        </text>
        <line x1="380" y1="100" x2="380" y2="255" stroke="#475569" strokeWidth="8" strokeLinecap="round" />
        <path d="M220 150h320" stroke="#475569" strokeWidth="8" strokeLinecap="round" />
        <path d="M260 150l-25 70h90l-25-70" fill="none" stroke="#e11d48" strokeWidth="5" />
        <path d="M500 150l-25 70h90l-25-70" fill="none" stroke="#0f766e" strokeWidth="5" />
        <text x="280" y="245" textAnchor="middle" fill="#be123c" fontSize="14" fontWeight="900">cenário provável</text>
        <text x="520" y="245" textAnchor="middle" fill="#0f766e" fontSize="14" fontWeight="900">cenário raro, mas valioso</text>
        <text x="380" y="308" textAnchor="middle" fill="#475569" fontSize="15" fontWeight="800">
          A decisão melhor depende do peso médio dos cenários, não só do mais frequente
        </text>
      </svg>
    </figure>
  );
}

function BayesFluxoVisual() {
  return (
    <figure className="rounded-[2rem] border border-cyan-200 bg-cyan-50 p-4 shadow-xl shadow-cyan-900/5">
      <svg className="w-full" viewBox="0 0 760 350" role="img" aria-label="Fluxo de atualização bayesiana">
        <rect width="760" height="350" rx="28" fill="#ecfeff" />
        <text x="380" y="48" textAnchor="middle" fill="#155e75" fontSize="22" fontWeight="900">
          Bayes: crença anterior + evidência nova -&gt; crença atualizada
        </text>
        <rect x="60" y="110" width="180" height="140" rx="18" fill="#ffffff" stroke="#06b6d4" strokeWidth="3" />
        <text x="150" y="155" textAnchor="middle" fill="#155e75" fontSize="16" fontWeight="900">Prior</text>
        <text x="150" y="185" textAnchor="middle" fill="#0e7490" fontSize="13" fontWeight="700">o que você já acreditava</text>
        <path d="M265 180h55" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
        <path d="M305 168l16 12l-16 12" fill="#475569" />
        <rect x="350" y="110" width="180" height="140" rx="18" fill="#ffffff" stroke="#06b6d4" strokeWidth="3" />
        <text x="440" y="155" textAnchor="middle" fill="#155e75" fontSize="16" fontWeight="900">Evidência</text>
        <text x="440" y="185" textAnchor="middle" fill="#0e7490" fontSize="13" fontWeight="700">quão compatível é o dado</text>
        <path d="M555 180h55" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
        <path d="M595 168l16 12l-16 12" fill="#475569" />
        <rect x="620" y="110" width="90" height="140" rx="18" fill="#ffffff" stroke="#0891b2" strokeWidth="3" />
        <text x="665" y="155" textAnchor="middle" fill="#155e75" fontSize="16" fontWeight="900">Posterior</text>
        <text x="665" y="185" textAnchor="middle" fill="#0e7490" fontSize="12" fontWeight="700">nova confiança</text>
        <text x="380" y="315" textAnchor="middle" fill="#155e75" fontSize="15" fontWeight="800">
          Informação nova não apaga o passado: ela repondera as hipóteses
        </text>
      </svg>
    </figure>
  );
}

function MlProbabilisticoVisual() {
  return (
    <figure className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/5">
      <svg className="w-full" viewBox="0 0 760 360" role="img" aria-label="Fluxo probabilístico em machine learning">
        <rect width="760" height="360" rx="28" fill="#f8fafc" />
        <text x="380" y="48" textAnchor="middle" fill="#0f172a" fontSize="22" fontWeight="900">
          O produto mostra uma resposta; o modelo calcula uma distribuição
        </text>
        <rect x="70" y="105" width="170" height="150" rx="18" fill="#ffffff" stroke="#64748b" strokeWidth="3" />
        <text x="155" y="145" textAnchor="middle" fill="#334155" fontSize="16" fontWeight="900">Entrada</text>
        <text x="155" y="180" textAnchor="middle" fill="#64748b" fontSize="13" fontWeight="700">texto • imagem • clique</text>
        <path d="M270 180h65" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
        <path d="M320 168l16 12l-16 12" fill="#475569" />
        <rect x="360" y="90" width="220" height="180" rx="18" fill="#ffffff" stroke="#8b5cf6" strokeWidth="3" />
        <text x="470" y="125" textAnchor="middle" fill="#6d28d9" fontSize="16" fontWeight="900">Modelo probabilístico</text>
        {[0.68, 0.19, 0.09, 0.04].map((p, i) => (
          <g key={i}>
            <rect x="405" y={155 + i * 24} width="120" height="14" rx="7" fill="#ede9fe" />
            <rect x="405" y={155 + i * 24} width={120 * p} height="14" rx="7" fill="#8b5cf6" />
          </g>
        ))}
        <path d="M605 180h55" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
        <path d="M645 168l16 12l-16 12" fill="#475569" />
        <rect x="675" y="120" width="55" height="120" rx="18" fill="#ffffff" stroke="#14b8a6" strokeWidth="3" />
        <text x="702" y="165" textAnchor="middle" fill="#0f766e" fontSize="13" fontWeight="900">top-1</text>
        <text x="702" y="190" textAnchor="middle" fill="#14b8a6" fontSize="12" fontWeight="800">saída</text>
        <text x="380" y="325" textAnchor="middle" fill="#0f172a" fontSize="15" fontWeight="800">
          Entender a distribuição é entender a confiança, o risco e o custo da decisão do modelo
        </text>
      </svg>
    </figure>
  );
}

