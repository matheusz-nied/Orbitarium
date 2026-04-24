import type { LessonModule } from "../../../types/content";

export const visuals = {
  "tokenization-hero": TokenizationHeroVisual,
  "token-chip-flow": TokenChipFlowVisual,
  "token-boundaries": TokenBoundariesVisual,
  "subword-split": SubwordSplitVisual,
  "vocabulary-map": VocabularyMapVisual,
  "encoding-layers": EncodingLayersVisual,
  "language-grid": LanguageGridVisual,
  "context-window": ContextWindowVisual,
  "cost-meter": CostMeterVisual,
  "truncation-visual": TruncationVisual,
  "summary-token-stack": SummaryTokenStackVisual,
} satisfies LessonModule["visuals"];

function TokenizationHeroVisual() {
  return (
    <figure className="overflow-hidden rounded-[2rem] border border-teal-200 bg-white p-4 shadow-xl shadow-teal-900/10">
      <svg className="w-full" viewBox="0 0 760 430" role="img" aria-label="Fluxo de tokenização de texto para tokens, IDs e modelo">
        <defs>
          <linearGradient id="tokenHeroBg" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#f0fdfa" />
            <stop offset="55%" stopColor="#eff6ff" />
            <stop offset="100%" stopColor="#fff7ed" />
          </linearGradient>
        </defs>
        <rect width="760" height="430" rx="30" fill="url(#tokenHeroBg)" />
        <Stage x={54} y={72} title="Texto" body="Modelos não leem como humanos." fill="#0f766e" />
        <Arrow x={235} y={166} />
        <Stage x={292} y={72} title="Tokens" body="Modelos | não | leem | como | humanos | ." fill="#2563eb" />
        <Arrow x={473} y={166} />
        <Stage x={530} y={72} title="IDs" body="11872 1027 553 1849 9134 13" fill="#ea580c" />
        <path d="M160 274h440" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" strokeDasharray="10 12" opacity="0.45" />
        {["instruções", "histórico", "documentos", "resposta"].map((label, index) => (
          <g key={label}>
            <rect x={88 + index * 148} y={302} width="120" height="48" rx="16" fill={["#ccfbf1", "#dbeafe", "#fee2e2", "#fef3c7"][index]} stroke="#ffffff" strokeWidth="4" />
            <text x={148 + index * 148} y="332" textAnchor="middle" fill="#0f172a" fontSize="16" fontWeight="900">
              {label}
            </text>
          </g>
        ))}
        <text x="380" y="388" textAnchor="middle" fill="#334155" fontSize="20" fontWeight="800">
          a janela de contexto é preenchida por tokens
        </text>
      </svg>
    </figure>
  );
}

function TokenChipFlowVisual() {
  return (
    <SimpleTokenVisual
      title="Uma frase vira peças menores"
      chips={["A", " token", "ização", " muda", " a", " conta", "."]}
      note="A separação real depende do encoding usado."
      palette={["#ccfbf1", "#dbeafe", "#fef3c7", "#fee2e2"]}
    />
  );
}

function TokenBoundariesVisual() {
  return (
    <SimpleTokenVisual
      title="Espaços e pontuação alteram fronteiras"
      chips={["Token", " token", "Token", ".", " token", "ização", "!"]}
      note="O espaço pode fazer parte do token."
      palette={["#ede9fe", "#dcfce7", "#ffedd5", "#e0f2fe"]}
    />
  );
}

function SubwordSplitVisual() {
  return (
    <SimpleTokenVisual
      title="Palavras raras se partem em subwords"
      chips={["hiper", "param", "etr", "ização", " anti", "constit", "ucional"]}
      note="Subwords tornam o vocabulário reutilizável."
      palette={["#fef3c7", "#cffafe", "#fae8ff", "#dcfce7"]}
    />
  );
}

function VocabularyMapVisual() {
  const rows = [
    [" token", "5963"],
    [" modelo", "5021"],
    ["ização", "91042"],
    [".", "13"],
  ];

  return (
    <figure className="rounded-[2rem] border border-slate-200 bg-slate-950 p-4 shadow-xl shadow-slate-900/15">
      <svg className="w-full" viewBox="0 0 760 330" role="img" aria-label="Vocabulário mapeando tokens para IDs">
        <rect width="760" height="330" rx="28" fill="#0f172a" />
        <text x="380" y="58" textAnchor="middle" fill="#f8fafc" fontSize="27" fontWeight="900">
          Vocabulário do tokenizador
        </text>
        {rows.map(([token, id], index) => (
          <g key={token}>
            <rect x="98" y={92 + index * 52} width="250" height="38" rx="14" fill="#f8fafc" />
            <rect x="412" y={92 + index * 52} width="250" height="38" rx="14" fill="#ccfbf1" />
            <path d={`M356 ${111 + index * 52}h48`} stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
            <text x="124" y={117 + index * 52} fill="#0f172a" fontSize="18" fontWeight="900">
              {token}
            </text>
            <text x="538" y={117 + index * 52} textAnchor="middle" fill="#115e59" fontSize="18" fontWeight="900">
              ID {id}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  );
}

function EncodingLayersVisual() {
  const layers = [
    { label: "Texto bruto", color: "#ffffff", x: 90 },
    { label: "Pré-tokenização", color: "#dbeafe", x: 160 },
    { label: "Regras BPE", color: "#ede9fe", x: 230 },
    { label: "IDs numéricos", color: "#ccfbf1", x: 300 },
  ];

  return (
    <figure className="rounded-[2rem] border border-indigo-200 bg-indigo-50 p-4 shadow-xl shadow-indigo-900/5">
      <svg className="w-full" viewBox="0 0 760 320" role="img" aria-label="Camadas de um encoding">
        <rect width="760" height="320" rx="28" fill="#eef2ff" />
        {layers.map(({ label, color, x }, index) => (
          <g key={label}>
            <rect x={x} y={82 + index * 6} width="280" height="64" rx="20" fill={color} stroke="#ffffff" strokeWidth="4" />
            <text x={x + 140} y={122 + index * 6} textAnchor="middle" fill="#111827" fontSize="20" fontWeight="900">
              {label}
            </text>
          </g>
        ))}
        <text x="380" y="270" textAnchor="middle" fill="#4338ca" fontSize="20" fontWeight="900">
          encoding = regras + vocabulário + IDs
        </text>
      </svg>
    </figure>
  );
}

function LanguageGridVisual() {
  const samples = [
    ["Português", "Você está estudando tokens."],
    ["English", "You are studying tokens."],
    ["日本語", "トークンを学んでいます。"],
    ["Emoji", "IA 🤖 + texto ✨"],
  ];

  return (
    <figure className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-4 shadow-xl shadow-emerald-900/5">
      <svg className="w-full" viewBox="0 0 760 360" role="img" aria-label="Comparação visual de textos em idiomas diferentes">
        <rect width="760" height="360" rx="28" fill="#ecfdf5" />
        {samples.map(([label, text], index) => {
          const x = index % 2 === 0 ? 68 : 398;
          const y = index < 2 ? 64 : 194;
          return (
            <g key={label}>
              <rect x={x} y={y} width="294" height="96" rx="22" fill="#ffffff" stroke="#bbf7d0" strokeWidth="3" />
              <text x={x + 22} y={y + 32} fill="#047857" fontSize="17" fontWeight="900">
                {label}
              </text>
              <text x={x + 22} y={y + 67} fill="#0f172a" fontSize="19" fontWeight="800">
                {text}
              </text>
            </g>
          );
        })}
        <text x="380" y="326" textAnchor="middle" fill="#065f46" fontSize="19" fontWeight="900">
          mesma intenção, orçamentos de tokens diferentes
        </text>
      </svg>
    </figure>
  );
}

function ContextWindowVisual() {
  return (
    <figure className="rounded-[2rem] border border-blue-200 bg-blue-50 p-4 shadow-xl shadow-blue-900/5">
      <svg className="w-full" viewBox="0 0 760 300" role="img" aria-label="Janela de contexto preenchida por tipos de token">
        <rect width="760" height="300" rx="28" fill="#eff6ff" />
        <rect x="82" y="118" width="596" height="56" rx="22" fill="#ffffff" stroke="#bfdbfe" strokeWidth="4" />
        <rect x="82" y="118" width="145" height="56" rx="22" fill="#0f766e" />
        <rect x="227" y="118" width="155" height="56" fill="#2563eb" />
        <rect x="382" y="118" width="188" height="56" fill="#ea580c" />
        <rect x="570" y="118" width="108" height="56" rx="22" fill="#f59e0b" />
        {[
          ["instruções", 154],
          ["histórico", 304],
          ["documentos", 476],
          ["saída", 624],
        ].map(([label, x]) => (
          <text key={label} x={Number(x)} y="151" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="900">
            {label}
          </text>
        ))}
        <text x="380" y="74" textAnchor="middle" fill="#1e3a8a" fontSize="26" fontWeight="900">
          Contexto é espaço compartilhado
        </text>
        <text x="380" y="226" textAnchor="middle" fill="#334155" fontSize="19" fontWeight="800">
          entrada grande reduz o espaço disponível para resposta
        </text>
      </svg>
    </figure>
  );
}

function CostMeterVisual() {
  return (
    <figure className="rounded-[2rem] border border-amber-200 bg-amber-50 p-4 shadow-xl shadow-amber-900/5">
      <svg className="w-full" viewBox="0 0 760 300" role="img" aria-label="Medidor de custo por tokens de entrada e saída">
        <rect width="760" height="300" rx="28" fill="#fffbeb" />
        <circle cx="210" cy="150" r="82" fill="#ffffff" stroke="#f59e0b" strokeWidth="16" />
        <path d="M210 150l52-38" stroke="#0f172a" strokeWidth="8" strokeLinecap="round" />
        <circle cx="210" cy="150" r="9" fill="#0f172a" />
        <rect x="360" y="88" width="260" height="46" rx="16" fill="#fed7aa" />
        <rect x="360" y="160" width="330" height="46" rx="16" fill="#bfdbfe" />
        <text x="490" y="117" textAnchor="middle" fill="#9a3412" fontSize="18" fontWeight="900">
          tokens de entrada
        </text>
        <text x="525" y="189" textAnchor="middle" fill="#1e3a8a" fontSize="18" fontWeight="900">
          tokens de saída
        </text>
        <text x="380" y="260" textAnchor="middle" fill="#92400e" fontSize="18" fontWeight="900">
          custo = quantidade de tokens x preço do modelo
        </text>
      </svg>
    </figure>
  );
}

function TruncationVisual() {
  return (
    <SimpleTokenVisual
      title="O que não cabe fica fora"
      chips={["instrução", "histórico", "documento", "evidência", "pergunta", "resposta"]}
      note="Truncar sem critério pode remover o trecho essencial."
      palette={["#dcfce7", "#dbeafe", "#fef3c7", "#fee2e2"]}
      fadeAfter={3}
    />
  );
}

function SummaryTokenStackVisual() {
  return (
    <SimpleTokenVisual
      title="Tokens conectam texto, contexto e custo"
      chips={["texto", "tokens", "IDs", "vetores", "atenção", "resposta"]}
      note="Entender tokens melhora prompts e arquitetura."
      palette={["#ccfbf1", "#e0e7ff", "#fed7aa", "#fce7f3"]}
    />
  );
}

function Stage({ x, y, title, body, fill }: { x: number; y: number; title: string; body: string; fill: string }) {
  return (
    <g>
      <rect x={x} y={y} width="176" height="148" rx="28" fill="#ffffff" stroke={fill} strokeWidth="4" />
      <text x={x + 88} y={y + 44} textAnchor="middle" fill={fill} fontSize="22" fontWeight="900">
        {title}
      </text>
      <foreignObject x={x + 18} y={y + 62} width="140" height="70">
        <p className="text-center text-sm font-bold leading-5 text-slate-700">{body}</p>
      </foreignObject>
    </g>
  );
}

function Arrow({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <path d={`M${x} ${y}h42`} stroke="#475569" strokeWidth="5" strokeLinecap="round" />
      <path d={`M${x + 42} ${y}l-12-9v18z`} fill="#475569" />
    </g>
  );
}

function SimpleTokenVisual({
  title,
  chips,
  note,
  palette,
  fadeAfter,
}: {
  title: string;
  chips: string[];
  note: string;
  palette: string[];
  fadeAfter?: number;
}) {
  return (
    <figure className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/5">
      <svg className="w-full" viewBox="0 0 760 320" role="img" aria-label={title}>
        <rect width="760" height="320" rx="28" fill="#f8fafc" />
        <text x="380" y="62" textAnchor="middle" fill="#0f172a" fontSize="25" fontWeight="900">
          {title}
        </text>
        {chips.map((chip, index) => {
          const x = 76 + (index % 4) * 154;
          const y = 104 + Math.floor(index / 4) * 72;
          const faded = fadeAfter !== undefined && index > fadeAfter;
          return (
            <g key={`${chip}-${index}`} opacity={faded ? 0.32 : 1}>
              <rect x={x} y={y} width="132" height="46" rx="16" fill={palette[index % palette.length]} stroke="#ffffff" strokeWidth="4" />
              <text x={x + 66} y={y + 30} textAnchor="middle" fill="#0f172a" fontSize="17" fontWeight="900">
                {chip}
              </text>
            </g>
          );
        })}
        <text x="380" y="276" textAnchor="middle" fill="#475569" fontSize="18" fontWeight="800">
          {note}
        </text>
      </svg>
    </figure>
  );
}
