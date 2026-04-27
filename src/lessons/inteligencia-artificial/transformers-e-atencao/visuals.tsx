import type { LessonModule } from "../../../types/content";

export const visuals = {
  "transformers-hero": TransformersHeroVisual,
  "rnn-sequential": RnnSequentialVisual,
  "attention-intuition": AttentionIntuitionVisual,
  "qkv-diagram": QkvDiagramVisual,
  "attention-math": AttentionMathVisual,
  "multi-head-visual": MultiHeadVisual,
  "positional-encoding-visual": PositionalEncodingVisual,
  "transformer-block": TransformerBlockVisual,
  "quadratic-cost": QuadraticCostVisual,
  "parallelization-visual": ParallelizationVisual,
  "summary-transformers-stack": SummaryTransformersStackVisual,
} satisfies LessonModule["visuals"];

function TransformersHeroVisual() {
  return (
    <figure className="overflow-hidden rounded-[2rem] border border-indigo-200 bg-white p-4 shadow-xl shadow-indigo-900/10">
      <svg className="w-full" viewBox="0 0 760 430" role="img" aria-label="Fluxo do Transformer: tokens com atenção geram representações contextuais">
        <defs>
          <linearGradient id="tfHeroBg" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#eef2ff" />
            <stop offset="55%" stopColor="#faf5ff" />
            <stop offset="100%" stopColor="#f0fdfa" />
          </linearGradient>
        </defs>
        <rect width="760" height="430" rx="30" fill="url(#tfHeroBg)" />
        <text x="380" y="50" textAnchor="middle" fill="#0f172a" fontSize="26" fontWeight="900">De tokens soltos a representações conectadas</text>
        {["O", "gato", "sentou", "no", "tapete"].map((word, index) => {
          const x = 68 + index * 130;
          return (
            <g key={word}>
              <rect x={x} y={82} width="110" height="44" rx="16" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
              <text x={x + 55} y={110} textAnchor="middle" fill="#1e3a8a" fontSize="17" fontWeight="900">{word}</text>
            </g>
          );
        })}
        <path d="M380 140v28" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
        <path d="M370 160l10 14l10-14" fill="#475569" />
        <rect x="100" y="195" width="560" height="55" rx="18" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
        <text x="380" y="228" textAnchor="middle" fill="#5b21b6" fontSize="16" fontWeight="900">Self-Attention: cada token consulta todos os outros</text>
        <path d="M380 260v28" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
        <path d="M370 278l10 14l10-14" fill="#475569" />
        {["O ✓", "gato ✓", "sentou ✓", "no ✓", "tapete ✓"].map((word, index) => {
          const x = 68 + index * 130;
          return (
            <g key={word}>
              <rect x={x} y={305} width="110" height="44" rx="16" fill="#ccfbf1" stroke="#0f766e" strokeWidth="2" />
              <text x={x + 55} y={331} textAnchor="middle" fill="#065f46" fontSize="15" fontWeight="800">{word}</text>
            </g>
          );
        })}
        <rect x="160" y="380" width="440" height="40" rx="14" fill="#0f172a" />
        <text x="380" y="406" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="800">
          tokens soltos → atenção → representações contextuais
        </text>
      </svg>
    </figure>
  );
}

function RnnSequentialVisual() {
  return (
    <figure className="rounded-[2rem] border border-rose-200 bg-rose-50 p-4 shadow-xl shadow-rose-900/5">
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label="Processamento sequencial de RNNs vs processamento paralelo de Transformers">
        <rect width="760" height="340" rx="28" fill="#fff1f2" />
        <text x="190" y="48" textAnchor="middle" fill="#9f1239" fontSize="20" fontWeight="900">RNN: sequencial</text>
        <text x="570" y="48" textAnchor="middle" fill="#0f766e" fontSize="20" fontWeight="900">Transformer: paralelo</text>
        <line x1="380" y1="30" x2="380" y2="320" stroke="#94a3b8" strokeWidth="3" strokeDasharray="6 6" />
        {["t₁", "t₂", "t₃", "t₄", "t₅"].map((token, index) => {
          const y = 100 + index * 48;
          return (
            <g key={`rnn-${token}`}>
              <rect x="110" y={y} width="160" height="38" rx="14" fill="#fecdd3" stroke="#f43f5e" strokeWidth="2" />
              <text x="190" y={y + 25} textAnchor="middle" fill="#9f1239" fontSize="15" fontWeight="800">{token}</text>
              {index > 0 && (
                <path d={`M270 ${y - 9} l20 0 m-10 -7 v14`} stroke="#f43f5e" strokeWidth="3" />
              )}
            </g>
          );
        })}
        {["t₁", "t₂", "t₃", "t₄", "t₅"].map((token, index) => {
          const x = 430 + index * 56;
          return (
            <g key={`tf-${token}`}>
              <rect x={x} y={100} width="46" height="38" rx="14" fill="#ccfbf1" stroke="#0f766e" strokeWidth="2" />
              <text x={x + 23} y={125} textAnchor="middle" fill="#065f46" fontSize="13" fontWeight="800">{token}</text>
            </g>
          );
        })}
        <rect x="420" y="85" width="330" height="65" rx="14" fill="#0f766e" opacity="0.08" stroke="#0f766e" strokeWidth="2" strokeDasharray="4 4" />
        <text x="585" y="165" textAnchor="middle" fill="#065f46" fontSize="14" fontWeight="800">processados juntos</text>
        <text x="190" y="310" textAnchor="middle" fill="#9f1239" fontSize="14" fontWeight="800">dependência sequencial</text>
        <text x="570" y="310" textAnchor="middle" fill="#0f766e" fontSize="14" fontWeight="800">todos ao mesmo tempo</text>
      </svg>
    </figure>
  );
}

function AttentionIntuitionVisual() {
  return (
    <figure className="rounded-[2rem] border border-indigo-200 bg-indigo-50 p-4 shadow-xl shadow-indigo-900/5">
      <svg className="w-full" viewBox="0 0 760 350" role="img" aria-label="Intuição da atenção: tokens conectam-se com relevância variável">
        <rect width="760" height="350" rx="28" fill="#eef2ff" />
        <text x="380" y="46" textAnchor="middle" fill="#312e81" fontSize="22" fontWeight="900">Cada token pergunta: quem é relevante para mim?</text>
        {[
          { word: "banco", x: 140, y: 160, color: "#7c3aed", attention: [{ dx: 280, weight: 0.7 }, { dx: 420, weight: 0.2 }, { dx: 560, weight: 0.1 }] },
        ].map((item) => (
          <g key={item.word}>
            {item.attention.map((att, i) => (
              <g key={i}>
                <line x1={item.x} y1={item.y} x2={att.dx} y2={item.y} stroke="#7c3aed" strokeWidth={att.weight * 8} opacity={0.3 + att.weight * 0.7} />
                <text x={att.dx} y={item.y + 5} textAnchor="middle" fill="#3730a3" fontSize="12" fontWeight="700">
                  {att.weight < 0.3 ? "fraco" : att.weight < 0.5 ? "médio" : "forte"}
                </text>
              </g>
            ))}
          </g>
        ))}
        {[
          { word: "banco", x: 140, y: 160, color: "#7c3aed" },
          { word: "financeiro", x: 280, y: 125, color: "#7c3aed" },
          { word: "roubou", x: 420, y: 200, color: "#475569" },
          { word: "ontem", x: 560, y: 175, color: "#475569" },
        ].map((item) => (
          <g key={`node-${item.word}`}>
            <circle cx={item.x} cy={item.y} r="28" fill={item.color} opacity="0.2" />
            <circle cx={item.x} cy={item.y} r="10" fill={item.color} />
            <text x={item.x} y={item.y + 45} textAnchor="middle" fill="#0f172a" fontSize="15" fontWeight="900">{item.word}</text>
          </g>
        ))}
        <line x1="140" y1="160" x2="280" y2="125" stroke="#7c3aed" strokeWidth="8" opacity="0.6" />
        <line x1="140" y1="160" x2="420" y2="200" stroke="#7c3aed" strokeWidth="2" opacity="0.3" strokeDasharray="4 4" />
        <line x1="140" y1="160" x2="560" y2="175" stroke="#7c3aed" strokeWidth="1.5" opacity="0.2" strokeDasharray="4 4" />
        <rect x="80" y="280" width="600" height="50" rx="16" fill="#ffffff" stroke="#7c3aed" strokeWidth="2" />
        <text x="380" y="312" textAnchor="middle" fill="#4338ca" fontSize="15" fontWeight="800">'banco' atende fortemente a 'financeiro' → representação contextualizada</text>
      </svg>
    </figure>
  );
}

function QkvDiagramVisual() {
  return (
    <figure className="rounded-[2rem] border border-violet-200 bg-violet-50 p-4 shadow-xl shadow-violet-900/5">
      <svg className="w-full" viewBox="0 0 760 360" role="img" aria-label="Diagrama de Query, Key e Value: como um token gera três projeções">
        <rect width="760" height="360" rx="28" fill="#faf5ff" />
        <text x="380" y="46" textAnchor="middle" fill="#5b21b6" fontSize="22" fontWeight="900">Do mesmo token nascem três projeções</text>
        <rect x="50" y="100" width="120" height="180" rx="18" fill="#dbeafe" stroke="#2563eb" strokeWidth="3" />
        <text x="110" y="150" textAnchor="middle" fill="#1e3a8a" fontSize="16" fontWeight="900">Token</text>
        <text x="110" y="175" textAnchor="middle" fill="#1e3a8a" fontSize="14" fontWeight="700">embedding</text>
        <text x="110" y="210" textAnchor="middle" fill="#475569" fontSize="12" fontWeight="700">"banco"</text>
        <text x="170" y="200" textAnchor="middle" fill="#475569" fontSize="24" fontWeight="900">×</text>
        {[
          { label: "Query", sub: "Wq", desc: "o que procuro", x: 280, color: "#7c3aed" },
          { label: "Key", sub: "Wk", desc: "o que ofereço", x: 440, color: "#0f766e" },
          { label: "Value", sub: "Wv", desc: "o que entrego", x: 600, color: "#dc2626" },
        ].map((item) => (
          <g key={item.label}>
            <rect x={item.x - 55} y="80" width="110" height="40" rx="12" fill="#f8fafc" stroke={item.color} strokeWidth="2" />
            <text x={item.x} y="106" textAnchor="middle" fill={item.color} fontSize="15" fontWeight="900">{item.sub}</text>
            <line x1="170" y1="190" x2={item.x} y2="120" stroke={item.color} strokeWidth="3" opacity="0.5" />
            <rect x={item.x - 55} y="150" width="110" height="45" rx="16" fill={item.color} opacity="0.15" stroke={item.color} strokeWidth="2" />
            <text x={item.x} y="178" textAnchor="middle" fill={item.color} fontSize="17" fontWeight="900">{item.label}</text>
            <rect x={item.x - 55} y="215" width="110" height="60" rx="12" fill="#ffffff" stroke={item.color} strokeWidth="2" />
            <text x={item.x} y="242" textAnchor="middle" fill="#0f172a" fontSize="12" fontWeight="700">{item.desc}</text>
            <text x={item.x} y="262" textAnchor="middle" fill="#475569" fontSize="11" fontWeight="600">vetor projetado</text>
          </g>
        ))}
        <text x="380" y="330" textAnchor="middle" fill="#5b21b6" fontSize="16" fontWeight="800">mesmo token, três perspectivas aprendidas</text>
      </svg>
    </figure>
  );
}

function AttentionMathVisual() {
  return (
    <figure className="rounded-[2rem] border border-blue-200 bg-blue-50 p-4 shadow-xl shadow-blue-900/5">
      <svg className="w-full" viewBox="0 0 760 380" role="img" aria-label="Fluxo matemático da atenção: Q·K, escala, softmax, soma ponderada de V">
        <rect width="760" height="380" rx="28" fill="#eff6ff" />
        <text x="380" y="46" textAnchor="middle" fill="#1e3a8a" fontSize="22" fontWeight="900">O cálculo da atenção em 4 passos</text>
        {[
          { step: "1", label: "Produto escalar", desc: "Q · Kᵀ mede similaridade", x: 100, color: "#2563eb" },
          { step: "2", label: "Escala", desc: "÷ √d_k estabiliza", x: 280, color: "#7c3aed" },
          { step: "3", label: "Softmax", desc: "normaliza em pesos", x: 460, color: "#0f766e" },
          { step: "4", label: "Soma ponderada", desc: "pesos × Values", x: 640, color: "#dc2626" },
        ].map((item, i) => (
          <g key={item.step}>
            <rect x={item.x - 70} y={70 + i * 5} width="140" height="80" rx="20" fill="#ffffff" stroke={item.color} strokeWidth="3" />
            <circle cx={item.x - 40} cy={95 + i * 5} r="16" fill={item.color} />
            <text x={item.x - 40} y={101 + i * 5} textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="900">{item.step}</text>
            <text x={item.x + 5} y={96 + i * 5} textAnchor="middle" fill="#0f172a" fontSize="13" fontWeight="900">{item.label}</text>
            <text x={item.x + 5} y={140 + i * 5} textAnchor="middle" fill="#475569" fontSize="11" fontWeight="700">{item.desc}</text>
            {i < 3 && (
              <path d={`M${item.x + 80} ${110 + i * 5} h30`} stroke="#475569" strokeWidth="3" />
            )}
          </g>
        ))}
        <rect x="70" y="250" width="620" height="55" rx="16" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
        <text x="380" y="283" textAnchor="middle" fill="#1e3a8a" fontSize="16" fontWeight="900">Attention(Q, K, V) = softmax(QKᵀ / √d_k) · V</text>
        <text x="380" y="345" textAnchor="middle" fill="#475569" fontSize="15" fontWeight="800">similaridade → escala → pesos → composição contextual</text>
      </svg>
    </figure>
  );
}

function MultiHeadVisual() {
  return (
    <figure className="rounded-[2rem] border border-teal-200 bg-teal-50 p-4 shadow-xl shadow-teal-900/5">
      <svg className="w-full" viewBox="0 0 760 380" role="img" aria-label="Multi-head attention: múltiplas cabeças capturando relações diferentes">
        <rect width="760" height="380" rx="28" fill="#f0fdfa" />
        <text x="380" y="42" textAnchor="middle" fill="#065f46" fontSize="20" fontWeight="900">Cada cabeça vê um aspecto diferente</text>
        {[
          { label: "Cabeça 1", desc: "sintaxe", x: 130, color: "#10b981" },
          { label: "Cabeça 2", desc: "referência", x: 310, color: "#3b82f6" },
          { label: "Cabeça 3", desc: "tópico", x: 490, color: "#8b5cf6" },
          { label: "Cabeça 4", desc: "sentimento", x: 640, color: "#f59e0b" },
        ].map((head) => (
          <g key={head.label}>
            <rect x={head.x - 70} y="70" width="140" height="65" rx="16" fill={head.color} opacity="0.15" stroke={head.color} strokeWidth="2" />
            <text x={head.x} y="95" textAnchor="middle" fill={head.color} fontSize="15" fontWeight="900">{head.label}</text>
            <text x={head.x} y="122" textAnchor="middle" fill="#0f172a" fontSize="13" fontWeight="700">{head.desc}</text>
          </g>
        ))}
        <rect x="60" y="155" width="640" height="30" rx="10" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
        <text x="380" y="176" textAnchor="middle" fill="#1e3a8a" fontSize="14" fontWeight="800">concatenação + projeção linear</text>
        {[
          { label: "Ela", x: 120 },
          { label: "disse", x: 220 },
          { label: "que", x: 320 },
          { label: "Maria", x: 420 },
          { label: "saiu", x: 520 },
          { label: "cedo", x: 620 },
        ].map((item) => (
          <g key={`out-${item.label}`}>
            <circle cx={item.x} cy="230" r="28" fill="#14b8a6" opacity="0.2" />
            <circle cx={item.x} cy="230" r="10" fill="#14b8a6" />
            <text x={item.x} y="272" textAnchor="middle" fill="#0f172a" fontSize="13" fontWeight="900">{item.label}</text>
          </g>
        ))}
        <rect x="60" y="300" width="640" height="55" rx="16" fill="#ffffff" stroke="#14b8a6" strokeWidth="2" />
        <text x="380" y="322" textAnchor="middle" fill="#065f46" fontSize="15" fontWeight="800">representação final: rica e multifacetada</text>
        <text x="380" y="344" textAnchor="middle" fill="#475569" fontSize="12" fontWeight="700">cada token incorpora relações sintáticas, referenciais, tópicas e emocionais</text>
      </svg>
    </figure>
  );
}

function PositionalEncodingVisual() {
  return (
    <figure className="rounded-[2rem] border border-amber-200 bg-amber-50 p-4 shadow-xl shadow-amber-900/5">
      <svg className="w-full" viewBox="0 0 760 360" role="img" aria-label="Positional encoding: ondas senoidais injetam ordem nos embeddings">
        <rect width="760" height="360" rx="28" fill="#fffbeb" />
        <text x="380" y="42" textAnchor="middle" fill="#78350f" fontSize="20" fontWeight="900">Ondas senoidais como GPS posicional</text>
        {[
          { dim: "dim 0 (rápida)", color: "#7c3aed", freq: 0.08 },
          { dim: "dim 4 (média)", color: "#2563eb", freq: 0.04 },
          { dim: "dim 60 (lenta)", color: "#0f766e", freq: 0.006 },
        ].map((wave, wi) => {
          const yBase = 110 + wi * 80;
          <text key={`lbl-${wi}`} x="70" y={yBase - 15} fill={wave.color} fontSize="11" fontWeight="800">{wave.dim}</text>;
          let pathD = "";
          for (let pos = 0; pos < 80; pos++) {
            const x = 100 + pos * 7;
            const y = yBase + Math.sin(pos * wave.freq * Math.PI * 2) * 28;
            pathD += (pos === 0 ? "M" : "L") + ` ${x} ${y}`;
          }
          return (
            <g key={wi}>
              <text x="70" y={yBase - 15} fill={wave.color} fontSize="11" fontWeight="800">{wave.dim}</text>
              <path d={pathD} fill="none" stroke={wave.color} strokeWidth="3" />
            </g>
          );
        })}
        <rect x="80" y="310" width="600" height="40" rx="14" fill="#ffffff" stroke="#78350f" strokeWidth="2" />
        <text x="380" y="336" textAnchor="middle" fill="#78350f" fontSize="14" fontWeight="800">dimensões rápidas distinguem posições adjacentes · lentas distinguem posições distantes</text>
      </svg>
    </figure>
  );
}

function TransformerBlockVisual() {
  return (
    <figure className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/5">
      <svg className="w-full" viewBox="0 0 760 520" role="img" aria-label="Bloco Transformer completo: atenção → Add & Norm → FFN → Add & Norm">
        <rect width="760" height="520" rx="28" fill="#f8fafc" />
        <text x="380" y="42" textAnchor="middle" fill="#0f172a" fontSize="22" fontWeight="900">Bloco Transformer</text>
        <rect x="180" y="65" width="400" height="55" rx="16" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
        <text x="380" y="97" textAnchor="middle" fill="#5b21b6" fontSize="16" fontWeight="800">Entrada: embeddings + positional encoding</text>
        {[
          { label: "Multi-Head Attention", y: 145, color: "#7c3aed", bg: "#ede9fe" },
          { label: "Add & Norm", y: 215, color: "#2563eb", bg: "#dbeafe" },
          { label: "Feed-Forward (FFN)", y: 285, color: "#0f766e", bg: "#ccfbf1" },
          { label: "Add & Norm", y: 355, color: "#2563eb", bg: "#dbeafe" },
        ].map((step, i) => (
          <g key={step.label}>
            <rect x="180" y={step.y} width="400" height="48" rx="16" fill={step.bg} stroke={step.color} strokeWidth="2" />
            <text x="380" y={step.y + 30} textAnchor="middle" fill={step.color} fontSize="16" fontWeight="800">{step.label}</text>
            {i < 3 && (
              <path d={`M380 ${step.y + 48} v17`} stroke="#475569" strokeWidth="3" />
            )}
          </g>
        ))}
        {[
          { x: 150, y: 218, label: "→", dy: -68 },
          { x: 150, y: 358, label: "→", dy: -68 },
        ].map((skip, i) => (
          <g key={`skip-${i}`}>
            <path d={`M${180} ${skip.y} H${skip.x} V${skip.y + skip.dy} H${180}`} fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="6 4" />
          </g>
        ))}
        <text x="100" y="286" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="800" transform="rotate(-90 100 286)">conexão residual</text>
        <rect x="180" y="420" width="400" height="55" rx="16" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
        <text x="380" y="452" textAnchor="middle" fill="#78350f" fontSize="16" fontWeight="800">Saída: representação contextualizada</text>
        <path d="M380 403 v17" stroke="#475569" strokeWidth="3" />
        <text x="380" y="505" textAnchor="middle" fill="#475569" fontSize="14" fontWeight="700">bloco repetido N vezes (6 a 96+)</text>
      </svg>
    </figure>
  );
}

function QuadraticCostVisual() {
  return (
    <figure className="rounded-[2rem] border border-rose-200 bg-rose-50 p-4 shadow-xl shadow-rose-900/5">
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label="Custo quadrático da atenção: n² comparações para n tokens">
        <rect width="760" height="340" rx="28" fill="#fff1f2" />
        <text x="380" y="42" textAnchor="middle" fill="#9f1239" fontSize="20" fontWeight="900">Custo quadrático: n² comparações</text>
        {[
          { n: "100", cells: "10.000", color: "#fef3c7" },
          { n: "1.000", cells: "1.000.000", color: "#fed7aa" },
          { n: "10.000", cells: "100.000.000", color: "#fca5a5" },
          { n: "128.000", cells: "16+ bilhões", color: "#f87171" },
        ].map((item, i) => {
          const x = 95 + i * 170;
          return (
            <g key={item.n}>
              <rect x={x} y="70" width="150" height="100" rx="18" fill={item.color} stroke="#9f1239" strokeWidth="2" />
              <text x={x + 75} y="105" textAnchor="middle" fill="#0f172a" fontSize="16" fontWeight="900">{item.n} tokens</text>
              <text x={x + 75} y="125" textAnchor="middle" fill="#9f1239" fontSize="12" fontWeight="700">matriz:</text>
              <text x={x + 75} y="148" textAnchor="middle" fill="#9f1239" fontSize="15" fontWeight="900">{item.cells}</text>
            </g>
          );
        })}
        <text x="380" y="205" textAnchor="middle" fill="#9f1239" fontSize="18" fontWeight="800">cada token compara com todos os outros</text>
        <rect x="80" y="230" width="600" height="90" rx="18" fill="#ffffff" stroke="#f43f5e" strokeWidth="2" />
        <text x="380" y="265" textAnchor="middle" fill="#9f1239" fontSize="15" fontWeight="800">dobrar a janela = 4× mais memória</text>
        <text x="380" y="290" textAnchor="middle" fill="#78350f" fontSize="13" fontWeight="700">4K → 128K tokens: 1024× mais elementos na matriz de atenção</text>
        <text x="380" y="310" textAnchor="middle" fill="#475569" fontSize="12" fontWeight="600">técnicas como atenção local dilatada e cache KV tentam contornar esse custo</text>
      </svg>
    </figure>
  );
}

function ParallelizationVisual() {
  return (
    <figure className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-4 shadow-xl shadow-emerald-900/5">
      <svg className="w-full" viewBox="0 0 760 360" role="img" aria-label="Comparação RNN vs Transformer em paralelização">
        <rect width="760" height="360" rx="28" fill="#ecfdf5" />
        <text x="380" y="42" textAnchor="middle" fill="#065f46" fontSize="20" fontWeight="900">O superpoder: processamento totalmente paralelo</text>
        <text x="190" y="90" textAnchor="middle" fill="#9f1239" fontSize="16" fontWeight="800">RNN</text>
        <text x="570" y="90" textAnchor="middle" fill="#065f46" fontSize="16" fontWeight="800">Transformer</text>
        <line x1="380" y1="70" x2="380" y2="340" stroke="#94a3b8" strokeWidth="3" strokeDasharray="6 6" />
        {["t₁", "t₂", "t₃", "t₄"].map((token, i) => {
          const y = 120 + i * 50;
          return (
            <g key={`rnn-${token}`}>
              <rect x="130" y={y} width="120" height="36" rx="14" fill="#fecdd3" stroke="#f43f5e" strokeWidth="2" />
              <text x="190" y={y + 24} textAnchor="middle" fill="#9f1239" fontSize="14" fontWeight="800">{token}</text>
              {i > 0 && <path d={`M190 ${y - 14} v14`} stroke="#f43f5e" strokeWidth="3" />}
            </g>
          );
        })}
        <text x="190" y="340" textAnchor="middle" fill="#9f1239" fontSize="13" fontWeight="800">espera o passo anterior</text>
        {["t₁", "t₂", "t₃", "t₄"].map((token, i) => {
          const x = 460 + i * 75;
          return (
            <g key={`tf-${token}`}>
              <rect x={x} y="150" width="60" height="36" rx="14" fill="#ccfbf1" stroke="#0f766e" strokeWidth="2" />
              <text x={x + 30} y={174} textAnchor="middle" fill="#065f46" fontSize="14" fontWeight="800">{token}</text>
            </g>
          );
        })}
        <rect x="445" y="138" width="285" height="60" rx="14" fill="#0f766e" opacity="0.08" stroke="#0f766e" strokeWidth="2" strokeDasharray="4 4" />
        <text x="587" y="218" textAnchor="middle" fill="#065f46" fontSize="13" fontWeight="800">todos ao mesmo tempo</text>
        <text x="570" y="255" textAnchor="middle" fill="#065f46" fontSize="14" fontWeight="800">8 GPUs processando em paralelo</text>
        <text x="570" y="275" textAnchor="middle" fill="#475569" fontSize="12" fontWeight="700">= bilhões de parâmetros em dias, não meses</text>
        <text x="570" y="310" textAnchor="middle" fill="#065f46" fontSize="15" fontWeight="900">escala viável = GPT, BERT, Gemini</text>
      </svg>
    </figure>
  );
}

function SummaryTransformersStackVisual() {
  return (
    <figure className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/5">
      <svg className="w-full" viewBox="0 0 760 320" role="img" aria-label="Resumo: pilha de conceitos do Transformer">
        <rect width="760" height="320" rx="28" fill="#f8fafc" />
        <text x="380" y="42" textAnchor="middle" fill="#0f172a" fontSize="22" fontWeight="900">A pilha do Transformer</text>
        {[
          { label: "Tokens + Positional Encoding", color: "#fef3c7", border: "#f59e0b" },
          { label: "Multi-Head Attention", color: "#ede9fe", border: "#7c3aed" },
          { label: "Add & Norm", color: "#dbeafe", border: "#2563eb" },
          { label: "Feed-Forward", color: "#ccfbf1", border: "#0f766e" },
          { label: "Add & Norm", color: "#dbeafe", border: "#2563eb" },
          { label: "Saída contextualizada", color: "#fef3c7", border: "#f59e0b" },
        ].map((item, i) => (
          <g key={item.label}>
            <rect x="170" y={70 + i * 40} width="420" height="32" rx="12" fill={item.color} stroke={item.border} strokeWidth="2" />
            <text x="380" y={92 + i * 40} textAnchor="middle" fill="#0f172a" fontSize="14" fontWeight="800">{item.label}</text>
            {i < 5 && (
              <path d={`M380 ${102 + i * 40} v8`} stroke="#475569" strokeWidth="2" />
            )}
          </g>
        ))}
        <text x="380" y="310" textAnchor="middle" fill="#475569" fontSize="15" fontWeight="800">repetido N vezes · total paralelizável · escalável</text>
      </svg>
    </figure>
  );
}