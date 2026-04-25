import type { LessonModule } from "../../../types/content";

export const visuals = {
  "embeddings-hero": EmbeddingsHeroVisual,
  "one-hot-vs-embedding": OneHotVsEmbeddingVisual,
  "embedding-space-2d": EmbeddingSpace2dVisual,
  "cosine-similarity": CosineSimilarityVisual,
  "vector-operations": VectorOperationsVisual,
  "word2vec-training": Word2VecTrainingVisual,
  "static-vs-contextual": StaticVsContextualVisual,
  "semantic-search": SemanticSearchVisual,
  "clustering-visual": ClusteringVisual,
  "multimodal-embeddings": MultimodalEmbeddingsVisual,
  "limitations-visual": LimitationsVisual,
  "summary-embeddings-stack": SummaryEmbeddingsStackVisual,
} satisfies LessonModule["visuals"];

function EmbeddingsHeroVisual() {
  return (
    <figure className="overflow-hidden rounded-[2rem] border border-teal-200 bg-white p-4 shadow-xl shadow-teal-900/10">
      <svg className="w-full" viewBox="0 0 760 430" role="img" aria-label="Fluxo de transformação de palavras em embeddings">
        <defs>
          <linearGradient id="embHeroBg" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#f0fdfa" />
            <stop offset="55%" stopColor="#eff6ff" />
            <stop offset="100%" stopColor="#faf5ff" />
          </linearGradient>
        </defs>
        <rect width="760" height="430" rx="30" fill="url(#embHeroBg)" />
        <text x="380" y="52" textAnchor="middle" fill="#0f172a" fontSize="26" fontWeight="900">Significado vira geometria</text>
        {["gato", "cachorro", "planeta", "rei", "rainha"].map((word, index) => {
          const x = 68 + index * 138;
          return (
            <g key={word}>
              <rect x={x} y={82} width="118" height="44" rx="16" fill="#ccfbf1" stroke="#0f766e" strokeWidth="2" />
              <text x={x + 59} y={110} textAnchor="middle" fill="#0f766e" fontSize="18" fontWeight="900">{word}</text>
            </g>
          );
        })}
        <path d="M380 140v30" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
        <path d="M370 162l10 14l10-14" fill="#475569" />
        {[
          { label: "[0, 0, ..1, .., 0]", color: "#fee2e2", x: 50 },
          { label: "[0, 1, 0, .., 0]", color: "#fee2e2", x: 190 },
          { label: "[0, 0, ..1, 0, .]", color: "#fef3c7", x: 330 },
          { label: "[0.8, 0.3, .., -0.1]", color: "#ccfbf1", x: 470 },
          { label: "[0.7, -0.6, .., 0.2]", color: "#ccfbf1", x: 100 },
        ].map((item, index) => (
          <g key={index}>
            <rect x={item.x} y={190} width="200" height="38" rx="14" fill={item.color} />
          </g>
        ))}
        <text x="115" y="214" textAnchor="middle" fill="#991b1b" fontSize="13" fontWeight="800">one-hot: gato</text>
        <text x="285" y="214" textAnchor="middle" fill="#991b1b" fontSize="13" fontWeight="800">one-hot: cachorro</text>
        <text x="540" y="214" textAnchor="middle" fill="#115e59" fontSize="13" fontWeight="800">embedding: gato ≈ cachorro</text>
        <rect x="160" y="280" width="440" height="120" rx="24" fill="#ffffff" stroke="#0f766e" strokeWidth="3" />
        <circle cx="230" cy="320" r="14" fill="#10b981" />
        <text x="244" y="325" fill="#065f46" fontSize="14" fontWeight="800">gato</text>
        <circle cx="300" cy="330" r="14" fill="#10b981" />
        <text x="314" y="335" fill="#065f46" fontSize="14" fontWeight="800">cachorro</text>
        <circle cx="600" cy="310" r="14" fill="#f59e0b" />
        <text x="560" y="315" fill="#92400e" fontSize="14" fontWeight="800">planeta</text>
        <circle cx="380" cy="360" r="14" fill="#8b5cf6" />
        <text x="394" y="365" fill="#5b21b6" fontSize="14" fontWeight="800">rei</text>
        <circle cx="420" cy="350" r="14" fill="#8b5cf6" />
        <text x="434" y="355" fill="#5b21b6" fontSize="14" fontWeight="800">rainha</text>
        <text x="380" y="300" textAnchor="middle" fill="#0f766e" fontSize="12" fontWeight="800">proximidade = similaridade</text>
      </svg>
    </figure>
  );
}

function OneHotVsEmbeddingVisual() {
  return (
    <figure className="rounded-[2rem] border border-rose-200 bg-rose-50 p-4 shadow-xl shadow-rose-900/5">
      <svg className="w-full" viewBox="0 0 760 350" role="img" aria-label="Comparação entre one-hot encoding e embedding denso">
        <rect width="760" height="350" rx="28" fill="#fff1f2" />
        <text x="190" y="50" textAnchor="middle" fill="#9f1239" fontSize="22" fontWeight="900">One-hot</text>
        <text x="570" y="50" textAnchor="middle" fill="#115e59" fontSize="22" fontWeight="900">Embedding</text>
        {Array.from({ length: 8 }).map((_, i) => (
          <g key={`oh-${i}`}>
            <rect x={60 + i * 34} y={70} width="28" height="130" rx="4" fill={i === 2 ? "#f43f5e" : "#fecdd3"} />
            <text x={74 + i * 34} y={220} textAnchor="middle" fill="#9f1239" fontSize="13" fontWeight="800">{i === 2 ? "1" : "0"}</text>
          </g>
        ))}
        <text x="218" y="192" textAnchor="middle" fill="#9f1239" fontSize="12" fontWeight="800">...50.000 zeros...</text>
        <text x="190" y="245" textAnchor="middle" fill="#9f1239" fontSize="15" fontWeight="800">esparso, sem relação</text>
        {Array.from({ length: 8 }).map((_, i) => (
          <g key={`emb-${i}`}>
            <rect x={430 + i * 34} y={70} width="28" height="130" rx="4" fill="#ccfbf1" />
            <text x={444 + i * 34} y={155} textAnchor="middle" fill="#115e59" fontSize="11" fontWeight="800">
              {["0.8", "−0.3", "0.6", "0.1", "−0.5", "0.9", "−0.2", "0.4"][i]}
            </text>
          </g>
        ))}
        <text x="570" y="192" textAnchor="middle" fill="#115e59" fontSize="12" fontWeight="800">...300 dimensões densas...</text>
        <text x="570" y="245" textAnchor="middle" fill="#115e59" fontSize="15" fontWeight="800">denso, relações no espaço</text>
        <line x1="380" y1="30" x2="380" y2="280" stroke="#94a3b8" strokeWidth="3" strokeDasharray="6 6" />
        <text x="380" y="320" textAnchor="middle" fill="#475569" fontSize="16" fontWeight="800">de ilhas isoladas para um mapa de significados</text>
      </svg>
    </figure>
  );
}

function EmbeddingSpace2dVisual() {
  return (
    <figure className="rounded-[2rem] border border-teal-200 bg-teal-50 p-4 shadow-xl shadow-teal-900/5">
      <svg className="w-full" viewBox="0 0 760 400" role="img" aria-label="Espaço vetorial 2D com palavras posicionadas por similaridade">
        <rect width="760" height="400" rx="28" fill="#f0fdfa" />
        <line x1="80" y1="200" x2="680" y2="200" stroke="#99f6e4" strokeWidth="2" />
        <line x1="380" y1="40" x2="380" y2="360" stroke="#99f6e4" strokeWidth="2" />
        <text x="680" y="195" fill="#475569" fontSize="13" fontWeight="800">animado →</text>
        <text x="385" y="50" fill="#475569" fontSize="13" fontWeight="800">doméstico ↑</text>
        {[
          { word: "cachorro", x: 280, y: 120, color: "#10b981" },
          { word: "gato", x: 340, y: 135, color: "#10b981" },
          { word: "peixe", x: 310, y: 220, color: "#10b981" },
          { word: "árvore", x: 160, y: 180, color: "#059669" },
          { word: "planeta", x: 560, y: 300, color: "#f59e0b" },
          { word: "rei", x: 450, y: 90, color: "#8b5cf6" },
          { word: "rainha", x: 420, y: 70, color: "#8b5cf6" },
          { word: "carro", x: 530, y: 210, color: "#3b82f6" },
          { word: "avião", x: 540, y: 170, color: "#3b82f6" },
        ].map((point) => (
          <g key={point.word}>
            <circle cx={point.x} cy={point.y} r="20" fill={point.color} opacity="0.25" />
            <circle cx={point.x} cy={point.y} r="6" fill={point.color} />
            <text x={point.x} y={point.y - 18} textAnchor="middle" fill="#0f172a" fontSize="13" fontWeight="900">{point.word}</text>
          </g>
        ))}
        <text x="380" y="388" textAnchor="middle" fill="#0f766e" fontSize="18" fontWeight="900">conceitos próximos = significados relacionados</text>
      </svg>
    </figure>
  );
}

function CosineSimilarityVisual() {
  return (
    <figure className="rounded-[2rem] border border-indigo-200 bg-indigo-50 p-4 shadow-xl shadow-indigo-900/5">
      <svg className="w-full" viewBox="0 0 760 380" role="img" aria-label="Visualização de similaridade de cosseno vs distância euclidiana">
        <rect width="760" height="380" rx="28" fill="#eef2ff" />
        <text x="190" y="48" textAnchor="middle" fill="#3730a3" fontSize="20" fontWeight="900">Cosseno</text>
        <text x="570" y="48" textAnchor="middle" fill="#3730a3" fontSize="20" fontWeight="900">Euclidiana</text>
        <line x1="380" y1="30" x2="380" y2="360" stroke="#94a3b8" strokeWidth="3" strokeDasharray="6 6" />
        <g>
          <line x1="190" y1="190" x2="120" y2="100" stroke="#818cf8" strokeWidth="4" strokeLinecap="round" />
          <line x1="190" y1="190" x2="150" y2="85" stroke="#c084fc" strokeWidth="4" strokeLinecap="round" />
          <path d="M170 140 A 30 30 0 0 1 155 130" fill="none" stroke="#4f46e5" strokeWidth="3" />
          <circle cx="190" cy="190" r="5" fill="#0f172a" />
          <text x="90" y="90" fill="#4f46e5" fontSize="14" fontWeight="800">vetor A</text>
          <text x="100" y="78" fill="#7c3aed" fontSize="14" fontWeight="800">vetor B</text>
          <text x="190" y="280" textAnchor="middle" fill="#3730a3" fontSize="15" fontWeight="800">ângulo pequeno = similar</text>
          <text x="190" y="310" textAnchor="middle" fill="#3730a3" fontSize="14" fontWeight="700">ignora magnitude</text>
        </g>
        <g>
          <circle cx="570" cy="190" r="5" fill="#0f172a" />
          <circle cx="580" cy="100" r="8" fill="#818cf8" />
          <circle cx="630" cy="85" r="14" fill="#c084fc" />
          <line x1="570" y1="190" x2="580" y2="100" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 4" />
          <line x1="570" y1="190" x2="630" y2="85" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 4" />
          <text x="540" y="92" fill="#4f46e5" fontSize="14" fontWeight="800">A</text>
          <text x="640" y="78" fill="#7c3aed" fontSize="14" fontWeight="800">B</text>
          <text x="570" y="280" textAnchor="middle" fill="#3730a3" fontSize="15" fontWeight="800">distância varia com magnitude</text>
          <text x="570" y="310" textAnchor="middle" fill="#3730a3" fontSize="14" fontWeight="700">mesma direção ≠ mesma distância</text>
        </g>
        <text x="380" y="370" textAnchor="middle" fill="#312e81" fontSize="16" fontWeight="900">cosseno mede direção; euclidiana mede distância</text>
      </svg>
    </figure>
  );
}

function VectorOperationsVisual() {
  return (
    <figure className="rounded-[2rem] border border-violet-200 bg-violet-50 p-4 shadow-xl shadow-violet-900/5">
      <svg className="w-full" viewBox="0 0 760 350" role="img" aria-label="Operações vetoriais capturando analogias semânticas">
        <rect width="760" height="350" rx="28" fill="#faf5ff" />
        <text x="380" y="48" textAnchor="middle" fill="#5b21b6" fontSize="22" fontWeight="900">Analogias como operações vetoriais</text>
        {[
          { label: "rei", x: 220, y: 110, color: "#8b5cf6" },
          { label: "rainha", x: 370, y: 110, color: "#8b5cf6" },
          { label: "homem", x: 220, y: 260, color: "#3b82f6" },
          { label: "mulher", x: 370, y: 260, color: "#ec4899" },
        ].map((point) => (
          <g key={point.label}>
            <circle cx={point.x} cy={point.y} r="22" fill={point.color} opacity="0.2" />
            <circle cx={point.x} cy={point.y} r="8" fill={point.color} />
            <text x={point.x} y={point.y - 30} textAnchor="middle" fill="#0f172a" fontSize="16" fontWeight="900">{point.label}</text>
          </g>
        ))}
        <line x1="220" y1="130" x2="370" y2="130" stroke="#8b5cf6" strokeWidth="3" />
        <line x1="220" y1="240" x2="370" y2="240" stroke="#ec4899" strokeWidth="3" />
        <line x1="240" y1="130" x2="240" y2="240" stroke="#3b82f6" strokeWidth="3" />
        <text x="295" y="122" textAnchor="middle" fill="#7c3aed" fontSize="14" fontWeight="800">− homem</text>
        <text x="295" y="258" textAnchor="middle" fill="#db2777" fontSize="14" fontWeight="800">+ mulher</text>
        <text x="195" y="190" textAnchor="middle" fill="#2563eb" fontSize="14" fontWeight="800">gênero</text>
        <rect x="470" y="130" width="260" height="80" rx="20" fill="#ffffff" stroke="#8b5cf6" strokeWidth="2" />
        <text x="600" y="170" textAnchor="middle" fill="#5b21b6" fontSize="16" fontWeight="900">rei − homem + mulher</text>
        <text x="600" y="195" textAnchor="middle" fill="#5b21b6" fontSize="20" fontWeight="900">≈ rainha</text>
        <text x="380" y="330" textAnchor="middle" fill="#6d28d9" fontSize="16" fontWeight="800">direções no espaço = relações semânticas</text>
      </svg>
    </figure>
  );
}

function Word2VecTrainingVisual() {
  return (
    <figure className="rounded-[2rem] border border-blue-200 bg-blue-50 p-4 shadow-xl shadow-blue-900/5">
      <svg className="w-full" viewBox="0 0 760 350" role="img" aria-label="Processo de treinamento do Word2Vec">
        <rect width="760" height="350" rx="28" fill="#eff6ff" />
        <text x="380" y="48" textAnchor="middle" fill="#1e3a8a" fontSize="22" fontWeight="900">Como o espaço é aprendido</text>
        {[
          { label: "Corpus", sub: "'o gato sentou no tapete'", x: 80, y: 120, color: "#3b82f6" },
          { label: "Janela", sub: "gato → [o, sentou, no, tapete]", x: 280, y: 120, color: "#8b5cf6" },
          { label: "Predição", sub: "palavra central ↔ contexto", x: 480, y: 120, color: "#10b981" },
          { label: "Embedding", sub: "vetor otimizado por erro", x: 680, y: 120, color: "#f59e0b" },
        ].map((stage) => (
          <g key={stage.label}>
            <rect x={stage.x - 68} y={stage.y - 30} width="136" height="70" rx="18" fill="#ffffff" stroke={stage.color} strokeWidth="3" />
            <text x={stage.x} y={stage.y - 5} textAnchor="middle" fill={stage.color} fontSize="16" fontWeight="900">{stage.label}</text>
            <foreignObject x={stage.x - 58} y={stage.y + 5} width="116" height="30">
              <p className="text-center text-xs leading-tight font-bold text-slate-600">{stage.sub}</p>
            </foreignObject>
          </g>
        ))}
        <path d="M152 120h118" stroke="#475569" strokeWidth="3" strokeLinecap="round" markerEnd="url(#arrowW2V)" />
        <path d="M352 120h118" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
        <path d="M552 120h118" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
        <text x="380" y="260" textAnchor="middle" fill="#1e3a8a" fontSize="17" fontWeight="800">palavras que predizem contextos similares → vetores próximos</text>
        <text x="380" y="290" textAnchor="middle" fill="#1e3a8a" fontSize="14" fontWeight="700">o espaço emerge dos padrões de co-ocorrência</text>
        <text x="380" y="325" textAnchor="middle" fill="#475569" fontSize="13" fontWeight="700">"You shall know a word by the company it keeps" — Firth, 1957</text>
        <defs>
          <marker id="arrowW2V" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8" fill="#475569" />
          </marker>
        </defs>
      </svg>
    </figure>
  );
}

function StaticVsContextualVisual() {
  return (
    <figure className="rounded-[2rem] border border-amber-200 bg-amber-50 p-4 shadow-xl shadow-amber-900/5">
      <svg className="w-full" viewBox="0 0 760 360" role="img" aria-label="Embeddings estáticos vs contextuais">
        <rect width="760" height="360" rx="28" fill="#fffbeb" />
        <text x="190" y="48" textAnchor="middle" fill="#92400e" fontSize="20" fontWeight="900">Estático (Word2Vec)</text>
        <text x="570" y="48" textAnchor="middle" fill="#115e59" fontSize="20" fontWeight="900">Contextual (BERT)</text>
        <line x1="380" y1="30" x2="380" y2="340" stroke="#94a3b8" strokeWidth="3" strokeDasharray="6 6" />
        <g>
          <circle cx="190" cy="150" r="30" fill="#fbbf24" opacity="0.3" />
          <circle cx="190" cy="150" r="10" fill="#f59e0b" />
          <text x="190" y="110" textAnchor="middle" fill="#92400e" fontSize="16" fontWeight="900">banco</text>
          <text x="190" y="210" textAnchor="middle" fill="#92400e" fontSize="14" fontWeight="800">um vetor</text>
          <text x="190" y="230" textAnchor="middle" fill="#92400e" fontSize="13" fontWeight="700">média de todos os sentidos</text>
          <text x="190" y="290" textAnchor="middle" fill="#78350f" fontSize="13" fontWeight="800">"banco financeiro" → mesmo vetor</text>
          <text x="190" y="310" textAnchor="middle" fill="#78350f" fontSize="13" fontWeight="800">"banco de praça" → mesmo vetor</text>
        </g>
        <g>
          <circle cx="500" cy="120" r="24" fill="#34d399" opacity="0.3" />
          <circle cx="500" cy="120" r="8" fill="#10b981" />
          <text x="440" y="118" fill="#115e59" fontSize="15" fontWeight="900">banco₁</text>
          <text x="560" y="118" fill="#065f46" fontSize="13" fontWeight="700">financeiro</text>
          <circle cx="640" cy="210" r="24" fill="#60a5fa" opacity="0.3" />
          <circle cx="640" cy="210" r="8" fill="#3b82f6" />
          <text x="510" y="208" fill="#1e3a8a" fontSize="15" fontWeight="900">banco₂</text>
          <text x="700" y="208" fill="#1e40af" fontSize="13" fontWeight="700">assento</text>
          <text x="570" y="290" textAnchor="middle" fill="#065f46" fontSize="13" fontWeight="800">"banco financeiro" → vetor próximo de💰</text>
          <text x="570" y="310" textAnchor="middle" fill="#065f46" fontSize="13" fontWeight="800">"banco de praça" → vetor próximo de🪑</text>
        </g>
        <text x="380" y="350" textAnchor="middle" fill="#475569" fontSize="15" fontWeight="800">contextual resolve ambiguidade</text>
      </svg>
    </figure>
  );
}

function SemanticSearchVisual() {
  return (
    <figure className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-4 shadow-xl shadow-emerald-900/5">
      <svg className="w-full" viewBox="0 0 760 360" role="img" aria-label="Fluxo de busca semântica">
        <rect width="760" height="360" rx="28" fill="#ecfdf5" />
        <text x="380" y="46" textAnchor="middle" fill="#065f46" fontSize="22" fontWeight="900">Busca semântica em 4 etapas</text>
        {[
          { step: "1", label: "Embedar\npergunta", x: 95, y: 130, color: "#10b981" },
          { step: "2", label: "Comparar\ncom base", x: 285, y: 130, color: "#06b6d4" },
          { step: "3", label: "Ranking por\ncosseno", x: 475, y: 130, color: "#8b5cf6" },
          { step: "4", label: "Resultados\nordenados", x: 665, y: 130, color: "#f59e0b" },
        ].map(({ step, label, x, y, color }) => (
          <g key={step}>
            <rect x={x - 70} y={y - 30} width="140" height="90" rx="20" fill="#ffffff" stroke={color} strokeWidth="3" />
            <circle cx={x - 45} cy={y - 10} r="16" fill={color} />
            <text x={x - 45} y={y - 4} textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="900">{step}</text>
            <foreignObject x={x - 58} y={y + 10} width="116" height="40">
              <p className="text-center text-sm font-bold text-slate-700 leading-tight whitespace-pre-line">{label}</p>
            </foreignObject>
          </g>
        ))}
        {[0, 1, 2].map((i) => (
          <path key={`arr-${i}`} d={`M${165 + i * 190} 130h48`} stroke="#475569" strokeWidth="4" strokeLinecap="round" />
        ))}
        <rect x="60" y="250" width="640" height="80" rx="20" fill="#ffffff" stroke="#10b981" strokeWidth="2" />
        <text x="380" y="285" textAnchor="middle" fill="#065f46" fontSize="15" fontWeight="800">pergunta: "como lidar com ansiedade?" ≈ "técnicas para nervosismo"</text>
        <text x="380" y="310" textAnchor="middle" fill="#475569" fontSize="13" fontWeight="700">nenhuma palavra em comum, mas significado próximo</text>
      </svg>
    </figure>
  );
}

function ClusteringVisual() {
  return (
    <figure className="rounded-[2rem] border border-violet-200 bg-violet-50 p-4 shadow-xl shadow-violet-900/5">
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label="Clustering de embeddings agrupando conceitos por similaridade">
        <rect width="760" height="340" rx="28" fill="#faf5ff" />
        <text x="380" y="46" textAnchor="middle" fill="#5b21b6" fontSize="22" fontWeight="900">Clustering: grupos emergem da geometria</text>
        {[
          { cluster: "Saúde", color: "#f43f5e", points: [[120, 130], [150, 150], [135, 165], [110, 155]] },
          { cluster: "Tecnologia", color: "#3b82f6", points: [[320, 110], [350, 130], [370, 115], [340, 145]] },
          { cluster: "Esportes", color: "#10b981", points: [[520, 130], [550, 150], [540, 115], [530, 155]] },
        ].map(({ cluster, color, points }) => (
          <g key={cluster}>
            <ellipse
              cx={points.reduce((s, p) => s + p[0], 0) / points.length}
              cy={points.reduce((s, p) => s + p[1], 0) / points.length}
              rx="55" ry="40" fill={color} opacity="0.1" stroke={color} strokeWidth="2" strokeDasharray="4 4"
            />
            {points.map((p, i) => (
              <circle key={i} cx={p[0]} cy={p[1]} r="6" fill={color} />
            ))}
            <text
              x={points.reduce((s, p) => s + p[0], 0) / points.length}
              y={points.reduce((s, p) => s + p[1], 0) / points.length - 50}
              textAnchor="middle" fill={color} fontSize="16" fontWeight="900"
            >
              {cluster}
            </text>
          </g>
        ))}
        <text x="380" y="280" textAnchor="middle" fill="#5b21b6" fontSize="16" fontWeight="800">categorias emergem da posição dos pontos</text>
        <text x="380" y="305" textAnchor="middle" fill="#6d28d9" fontSize="13" fontWeight="700">sem rótulos pré-definidos, agrupamento por proximidade vetorial</text>
      </svg>
    </figure>
  );
}

function MultimodalEmbeddingsVisual() {
  return (
    <figure className="rounded-[2rem] border border-cyan-200 bg-cyan-50 p-4 shadow-xl shadow-cyan-900/5">
      <svg className="w-full" viewBox="0 0 760 330" role="img" aria-label="Embeddings multimodais: texto e imagem no mesmo espaço">
        <rect width="760" height="330" rx="28" fill="#ecfeff" />
        <text x="380" y="48" textAnchor="middle" fill="#0e7490" fontSize="22" fontWeight="900">Texto e imagem no mesmo espaço</text>
        <circle cx="280" cy="170" r="60" fill="#06b6d4" opacity="0.1" stroke="#06b6d4" strokeWidth="2" />
        <circle cx="300" cy="155" r="8" fill="#0891b2" />
        <text x="318" y="155" fill="#164e63" fontSize="12" fontWeight="800">"gato laranja"</text>
        <circle cx="260" cy="190" r="8" fill="#06b6d4" />
        <text x="230" y="210" fill="#164e63" fontSize="12" fontWeight="800">🐱 foto</text>
        <circle cx="500" cy="180" r="40" fill="#f59e0b" opacity="0.1" stroke="#f59e0b" strokeWidth="2" />
        <circle cx="490" cy="165" r="8" fill="#f59e0b" />
        <text x="508" y="165" fill="#78350f" fontSize="12" fontWeight="800">"carro"</text>
        <circle cx="510" cy="195" r="8" fill="#fb923c" />
        <text x="528" y="195" fill="#78350f" fontSize="12" fontWeight="800">🚗 foto</text>
        <text x="380" y="290" textAnchor="middle" fill="#0e7490" fontSize="16" fontWeight="800">CLIP: mesma cena, mesma região do espaço</text>
        <text x="380" y="316" textAnchor="middle" fill="#475569" fontSize="13" fontWeight="700">buscar imagens com texto e vice-versa</text>
      </svg>
    </figure>
  );
}

function LimitationsVisual() {
  return (
    <figure className="rounded-[2rem] border border-rose-200 bg-rose-50 p-4 shadow-xl shadow-rose-900/5">
      <svg className="w-full" viewBox="0 0 760 320" role="img" aria-label="Limitações de embeddings: viés, ambiguidade, projeção 2D">
        <rect width="760" height="320" rx="28" fill="#fff1f2" />
        <text x="380" y="46" textAnchor="middle" fill="#9f1239" fontSize="22" fontWeight="900">Limitações reais</text>
        {[
          { icon: "⚠️", title: "Viés", desc: "reflete preconceitos do corpus", x: 130 },
          { icon: "🔀", title: "Ambiguidade", desc: "'banco' funde sentidos", x: 380 },
          { icon: "📉", title: "Projeção 2D", desc: "clusters podem ser artefato", x: 630 },
        ].map((item) => (
          <g key={item.title}>
            <rect x={item.x - 100} y={80} width="200" height="140" rx="20" fill="#ffffff" stroke="#f43f5e" strokeWidth="2" />
            <text x={item.x} y={120} textAnchor="middle" fill="#9f1239" fontSize="28">{item.icon}</text>
            <text x={item.x} y={155} textAnchor="middle" fill="#0f172a" fontSize="18" fontWeight="900">{item.title}</text>
            <foreignObject x={item.x - 80} y={165} width="160" height="50">
              <p className="text-center text-sm font-bold text-slate-600">{item.desc}</p>
            </foreignObject>
          </g>
        ))}
        <text x="380" y="275" textAnchor="middle" fill="#9f1239" fontSize="16" fontWeight="800">embeddings são poderosos, mas não mágicos</text>
        <text x="380" y="300" textAnchor="middle" fill="#475569" fontSize="13" fontWeight="700">sempre audite os dados de treinamento e valide os resultados</text>
      </svg>
    </figure>
  );
}

function SummaryEmbeddingsStackVisual() {
  return (
    <figure className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/5">
      <svg className="w-full" viewBox="0 0 760 280" role="img" aria-label="Resumo: de texto a aplicações">
        <rect width="760" height="280" rx="28" fill="#f8fafc" />
        <text x="380" y="46" textAnchor="middle" fill="#0f172a" fontSize="24" fontWeight="900">De um-hot a busca semântica</text>
        {[
          { label: "One-hot", color: "#fecdd3", x: 95 },
          { label: "Embedding", color: "#ccfbf1", x: 225 },
          { label: "Cosseno", color: "#e0e7ff", x: 355 },
          { label: "Busca", color: "#fef3c7", x: 485 },
          { label: "Clustering", color: "#fae8ff", x: 615 },
        ].map((item, i) => (
          <g key={item.label}>
            <rect x={item.x - 55} y={80} width="110" height="56" rx="18" fill={item.color} stroke="#ffffff" strokeWidth="3" />
            <text x={item.x} y={115} textAnchor="middle" fill="#0f172a" fontSize="15" fontWeight="900">{item.label}</text>
          </g>
        ))}
        {[0, 1, 2, 3].map((i) => (
          <path key={`sarr-${i}`} d={`M${155 + i * 130} 108h48`} stroke="#475569" strokeWidth="4" strokeLinecap="round" />
        ))}
        <text x="380" y="190" textAnchor="middle" fill="#475569" fontSize="17" fontWeight="800">significado → coordenadas → busca → organização</text>
        <text x="380" y="225" textAnchor="middle" fill="#0f766e" fontSize="15" fontWeight="700"> embeddings transformam semântica em geometria</text>
      </svg>
    </figure>
  );
}
