import type { LessonModule } from "../../../types/content";

export const visuals = {
  "teoria-informacao-hero": TeoriaInformacaoHeroVisual,
  "surpresa-intuicao": SurpresaIntuicaoVisual,
  "bits-perguntas": BitsPerguntasVisual,
  "entropia-distribuicao": EntropiaDistribuicaoVisual,
  "compressao-predictability": CompressaoPredictabilityVisual,
  "cross-entropy-loss": CrossEntropyLossVisual,
  "llm-proximapalavra": LlmProximaPalavraVisual,
  "semantica-vs-estatistica": SemanticaVsEstatisticaVisual,
} satisfies LessonModule["visuals"];

function TeoriaInformacaoHeroVisual() {
  return (
    <figure className="overflow-hidden rounded-[2rem] border border-cyan-200 bg-white p-4 shadow-xl shadow-cyan-900/10">
      <svg className="w-full" viewBox="0 0 760 420" role="img" aria-label="Teoria da informação conectando surpresa e loss em IA">
        <defs>
          <linearGradient id="infoHeroBg" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#ecfeff" />
            <stop offset="55%" stopColor="#eef2ff" />
            <stop offset="100%" stopColor="#fffbeb" />
          </linearGradient>
        </defs>
        <rect width="760" height="420" rx="30" fill="url(#infoHeroBg)" />
        <text x="380" y="52" textAnchor="middle" fill="#0f172a" fontSize="28" fontWeight="900">
          Surpresa, bits e loss falam a mesma língua probabilística
        </text>
        <rect x="70" y="95" width="180" height="210" rx="22" fill="#ffffff" stroke="#06b6d4" strokeWidth="3" />
        <text x="160" y="130" textAnchor="middle" fill="#155e75" fontSize="18" fontWeight="900">Evento</text>
        <text x="160" y="180" textAnchor="middle" fill="#0891b2" fontSize="14" fontWeight="800">raro -&gt; mais surpresa</text>
        <text x="160" y="205" textAnchor="middle" fill="#0891b2" fontSize="14" fontWeight="800">comum -&gt; menos surpresa</text>
        <path d="M285 200h65" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
        <path d="M335 188l16 12l-16 12" fill="#475569" />
        <rect x="380" y="95" width="310" height="210" rx="22" fill="#ffffff" stroke="#7c3aed" strokeWidth="3" />
        <text x="535" y="130" textAnchor="middle" fill="#6d28d9" fontSize="18" fontWeight="900">Distribuição / loss</text>
        <rect x="440" y="165" width="170" height="16" rx="8" fill="#ede9fe" />
        <rect x="440" y="165" width="120" height="16" rx="8" fill="#8b5cf6" />
        <rect x="440" y="195" width="170" height="16" rx="8" fill="#ede9fe" />
        <rect x="440" y="195" width="52" height="16" rx="8" fill="#a78bfa" />
        <text x="535" y="245" textAnchor="middle" fill="#6d28d9" fontSize="14" fontWeight="800">entropia / cross-entropy</text>
        <text x="380" y="360" textAnchor="middle" fill="#0f172a" fontSize="16" fontWeight="800">
          Teoria da informação mede incerteza média e custo de previsões probabilísticas
        </text>
      </svg>
    </figure>
  );
}

function SurpresaIntuicaoVisual() {
  return (
    <figure className="rounded-[2rem] border border-indigo-200 bg-indigo-50 p-4 shadow-xl shadow-indigo-900/5">
      <svg className="w-full" viewBox="0 0 760 360" role="img" aria-label="Comparação entre evento comum e evento raro">
        <rect width="760" height="360" rx="28" fill="#eef2ff" />
        <text x="380" y="48" textAnchor="middle" fill="#3730a3" fontSize="22" fontWeight="900">
          Evento improvável informa mais porque quebra mais expectativa
        </text>
        <rect x="70" y="100" width="250" height="190" rx="18" fill="#ffffff" stroke="#4f46e5" strokeWidth="3" />
        <text x="195" y="135" textAnchor="middle" fill="#3730a3" fontSize="16" fontWeight="900">Evento comum</text>
        <text x="195" y="190" textAnchor="middle" fill="#6366f1" fontSize="14" fontWeight="800">p alta</text>
        <text x="195" y="220" textAnchor="middle" fill="#6366f1" fontSize="14" fontWeight="800">pouca surpresa</text>
        <rect x="440" y="100" width="250" height="190" rx="18" fill="#ffffff" stroke="#4f46e5" strokeWidth="3" />
        <text x="565" y="135" textAnchor="middle" fill="#3730a3" fontSize="16" fontWeight="900">Evento raro</text>
        <text x="565" y="190" textAnchor="middle" fill="#6366f1" fontSize="14" fontWeight="800">p baixa</text>
        <text x="565" y="220" textAnchor="middle" fill="#6366f1" fontSize="14" fontWeight="800">muita surpresa</text>
      </svg>
    </figure>
  );
}

function BitsPerguntasVisual() {
  return (
    <figure className="rounded-[2rem] border border-sky-200 bg-sky-50 p-4 shadow-xl shadow-sky-900/5">
      <svg className="w-full" viewBox="0 0 760 360" role="img" aria-label="Bits como perguntas binárias">
        <rect width="760" height="360" rx="28" fill="#f0f9ff" />
        <text x="380" y="48" textAnchor="middle" fill="#0369a1" fontSize="22" fontWeight="900">
          1 bit = uma pergunta binária útil
        </text>
        <rect x="110" y="110" width="540" height="150" rx="20" fill="#ffffff" stroke="#38bdf8" strokeWidth="3" />
        <text x="380" y="145" textAnchor="middle" fill="#0369a1" fontSize="16" fontWeight="900">Resultado entre quatro opções equiprováveis</text>
        <text x="380" y="185" textAnchor="middle" fill="#0ea5e9" fontSize="14" fontWeight="800">Pergunta 1: está no grupo da esquerda?</text>
        <text x="380" y="212" textAnchor="middle" fill="#0ea5e9" fontSize="14" fontWeight="800">Pergunta 2: qual item do grupo?</text>
        <text x="380" y="240" textAnchor="middle" fill="#0369a1" fontSize="14" fontWeight="900">Total: 2 bits</text>
      </svg>
    </figure>
  );
}

function EntropiaDistribuicaoVisual() {
  return (
    <figure className="rounded-[2rem] border border-violet-200 bg-violet-50 p-4 shadow-xl shadow-violet-900/5">
      <svg className="w-full" viewBox="0 0 760 360" role="img" aria-label="Distribuições com entropia alta e baixa">
        <rect width="760" height="360" rx="28" fill="#faf5ff" />
        <text x="380" y="48" textAnchor="middle" fill="#6d28d9" fontSize="22" fontWeight="900">
          Distribuição equilibrada tende a ter entropia mais alta
        </text>
        <rect x="70" y="100" width="260" height="190" rx="18" fill="#ffffff" stroke="#8b5cf6" strokeWidth="3" />
        <text x="200" y="135" textAnchor="middle" fill="#6d28d9" fontSize="16" fontWeight="900">Baixa entropia</text>
        {[110, 25, 18, 14].map((h, i) => (
          <rect key={i} x={120 + i * 38} y={245 - h} width="26" height={h} rx="8" fill="#a78bfa" />
        ))}
        <rect x="430" y="100" width="260" height="190" rx="18" fill="#ffffff" stroke="#8b5cf6" strokeWidth="3" />
        <text x="560" y="135" textAnchor="middle" fill="#6d28d9" fontSize="16" fontWeight="900">Alta entropia</text>
        {[70, 68, 66, 64].map((h, i) => (
          <rect key={i} x={480 + i * 38} y={245 - h} width="26" height={h} rx="8" fill="#8b5cf6" />
        ))}
      </svg>
    </figure>
  );
}

function CompressaoPredictabilityVisual() {
  return (
    <figure className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-4 shadow-xl shadow-emerald-900/5">
      <svg className="w-full" viewBox="0 0 760 360" role="img" aria-label="Previsibilidade e compressão">
        <rect width="760" height="360" rx="28" fill="#ecfdf5" />
        <text x="380" y="48" textAnchor="middle" fill="#047857" fontSize="22" fontWeight="900">
          Quanto mais previsível a fonte, mais fácil comprimir
        </text>
        <rect x="80" y="105" width="230" height="170" rx="18" fill="#ffffff" stroke="#10b981" strokeWidth="3" />
        <text x="195" y="145" textAnchor="middle" fill="#047857" fontSize="16" fontWeight="900">AAAAAA...</text>
        <text x="195" y="205" textAnchor="middle" fill="#10b981" fontSize="14" fontWeight="800">alta previsibilidade</text>
        <text x="195" y="230" textAnchor="middle" fill="#10b981" fontSize="14" fontWeight="800">menos bits médios</text>
        <rect x="450" y="105" width="230" height="170" rx="18" fill="#ffffff" stroke="#10b981" strokeWidth="3" />
        <text x="565" y="145" textAnchor="middle" fill="#047857" fontSize="16" fontWeight="900">ABQDTR...</text>
        <text x="565" y="205" textAnchor="middle" fill="#10b981" fontSize="14" fontWeight="800">mais alternativas</text>
        <text x="565" y="230" textAnchor="middle" fill="#10b981" fontSize="14" fontWeight="800">mais bits médios</text>
      </svg>
    </figure>
  );
}

function CrossEntropyLossVisual() {
  return (
    <figure className="rounded-[2rem] border border-amber-200 bg-amber-50 p-4 shadow-xl shadow-amber-900/5">
      <svg className="w-full" viewBox="0 0 760 360" role="img" aria-label="Cross-entropy como custo de previsões ruins">
        <rect width="760" height="360" rx="28" fill="#fffbeb" />
        <text x="380" y="48" textAnchor="middle" fill="#92400e" fontSize="22" fontWeight="900">
          Acertar com baixa probabilidade custa mais do que acertar com confiança adequada
        </text>
        <rect x="90" y="100" width="250" height="190" rx="18" fill="#ffffff" stroke="#f59e0b" strokeWidth="3" />
        <text x="215" y="135" textAnchor="middle" fill="#92400e" fontSize="16" fontWeight="900">Distribuição boa</text>
        <rect x="150" y="170" width="120" height="16" rx="8" fill="#fde68a" />
        <rect x="150" y="170" width="95" height="16" rx="8" fill="#f59e0b" />
        <text x="215" y="225" textAnchor="middle" fill="#b45309" fontSize="14" fontWeight="800">classe correta com alta p</text>
        <rect x="420" y="100" width="250" height="190" rx="18" fill="#ffffff" stroke="#f59e0b" strokeWidth="3" />
        <text x="545" y="135" textAnchor="middle" fill="#92400e" fontSize="16" fontWeight="900">Distribuição ruim</text>
        <rect x="480" y="170" width="120" height="16" rx="8" fill="#fde68a" />
        <rect x="480" y="170" width="18" height="16" rx="8" fill="#f59e0b" />
        <text x="545" y="225" textAnchor="middle" fill="#b45309" fontSize="14" fontWeight="800">classe correta com baixa p</text>
      </svg>
    </figure>
  );
}

function LlmProximaPalavraVisual() {
  return (
    <figure className="rounded-[2rem] border border-teal-200 bg-teal-50 p-4 shadow-xl shadow-teal-900/5">
      <svg className="w-full" viewBox="0 0 760 360" role="img" aria-label="Modelo de linguagem prevendo próximo token">
        <rect width="760" height="360" rx="28" fill="#f0fdfa" />
        <text x="380" y="48" textAnchor="middle" fill="#0f766e" fontSize="22" fontWeight="900">
          LLM treina para melhorar a distribuição do próximo token
        </text>
        <rect x="90" y="115" width="220" height="140" rx="18" fill="#ffffff" stroke="#14b8a6" strokeWidth="3" />
        <text x="200" y="155" textAnchor="middle" fill="#115e59" fontSize="16" fontWeight="900">A Terra gira em torno do</text>
        <path d="M340 185h70" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
        <path d="M395 173l16 12l-16 12" fill="#475569" />
        <rect x="440" y="100" width="230" height="170" rx="18" fill="#ffffff" stroke="#14b8a6" strokeWidth="3" />
        {[0.72, 0.13, 0.09, 0.06].map((p, i) => (
          <g key={i}>
            <rect x="500" y={145 + i * 24} width="110" height="14" rx="7" fill="#ccfbf1" />
            <rect x="500" y={145 + i * 24} width={110 * p} height="14" rx="7" fill="#14b8a6" />
          </g>
        ))}
      </svg>
    </figure>
  );
}

function SemanticaVsEstatisticaVisual() {
  return (
    <figure className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/5">
      <svg className="w-full" viewBox="0 0 760 360" role="img" aria-label="Diferença entre previsibilidade estatística e significado humano">
        <rect width="760" height="360" rx="28" fill="#f8fafc" />
        <text x="380" y="48" textAnchor="middle" fill="#0f172a" fontSize="22" fontWeight="900">
          Entropia mede previsibilidade estatística, não sentido humano completo
        </text>
        <rect x="80" y="110" width="250" height="170" rx="18" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
        <text x="205" y="150" textAnchor="middle" fill="#334155" fontSize="16" fontWeight="900">baixa entropia</text>
        <text x="205" y="200" textAnchor="middle" fill="#64748b" fontSize="14" fontWeight="800">pode ser repetitivo e pobre</text>
        <rect x="430" y="110" width="250" height="170" rx="18" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
        <text x="555" y="150" textAnchor="middle" fill="#334155" fontSize="16" fontWeight="900">alta entropia</text>
        <text x="555" y="200" textAnchor="middle" fill="#64748b" fontSize="14" fontWeight="800">pode ser rico, caótico ou ambos</text>
      </svg>
    </figure>
  );
}

