export const visuals = {
  "llm-hero": LlmHeroVisual,
  "transformer-stack": TransformerStackVisual,
  "context-window": ContextWindowVisual,
};

function LlmHeroVisual() {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-teal-200 bg-white p-6 shadow-xl shadow-teal-900/10">
      <svg viewBox="0 0 760 360" role="img" aria-label="Fluxo de um LLM de tokens ate texto gerado" className="w-full">
        <defs>
          <linearGradient id="llmHeroGradient" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#0f766e" />
            <stop offset="55%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
        <rect width="760" height="360" rx="30" fill="#f8fafc" />
        <g transform="translate(52 60)">
          {["O", "modelo", "prevê", "o"].map((token, index) => (
            <g key={token} transform={`translate(${index * 104} 0)`}>
              <rect width="84" height="54" rx="16" fill="#ccfbf1" stroke="#14b8a6" />
              <text x="42" y="34" textAnchor="middle" fill="#0f172a" fontSize="17" fontWeight="800">{token}</text>
            </g>
          ))}
        </g>
        <path d="M120 150 C190 210 300 220 382 180 C455 145 514 134 608 176" fill="none" stroke="url(#llmHeroGradient)" strokeWidth="10" strokeLinecap="round" />
        <g transform="translate(440 68)">
          {["próximo", "token", "provável"].map((token, index) => (
            <g key={token} transform={`translate(0 ${index * 64})`}>
              <rect width="188" height="48" rx="16" fill={index === 0 ? "#dbeafe" : "#ede9fe"} stroke={index === 0 ? "#2563eb" : "#8b5cf6"} />
              <text x="94" y="31" textAnchor="middle" fill="#0f172a" fontSize="16" fontWeight="800">{token}</text>
            </g>
          ))}
        </g>
        <g transform="translate(102 255)">
          <rect width="556" height="56" rx="18" fill="#0f172a" />
          <text x="278" y="35" textAnchor="middle" fill="#f8fafc" fontSize="18" fontWeight="800">
            texto nasce de muitas escolhas probabilísticas em sequência
          </text>
        </g>
      </svg>
    </div>
  );
}

function TransformerStackVisual() {
  const layers = ["tokens", "embeddings", "atenção", "MLP", "probabilidades"];
  return (
    <div className="rounded-[2rem] border border-blue-200 bg-blue-50 p-6">
      <div className="grid gap-3 md:grid-cols-5">
        {layers.map((layer, index) => (
          <div className="rounded-3xl border border-blue-200 bg-white p-5 text-center shadow-sm" key={layer}>
            <p className="font-mono text-xs font-black text-blue-700">0{index + 1}</p>
            <p className="mt-2 text-lg font-black text-slate-950">{layer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContextWindowVisual() {
  return (
    <div className="rounded-[2rem] border border-amber-200 bg-amber-50 p-6">
      <div className="overflow-hidden rounded-3xl bg-white">
        <div className="grid grid-cols-[1.1fr_1.4fr_0.8fr] text-sm font-black text-white">
          <div className="bg-teal-700 p-4">instruções</div>
          <div className="bg-blue-700 p-4">contexto enviado</div>
          <div className="bg-violet-700 p-4">resposta</div>
        </div>
        <div className="grid grid-cols-[1.1fr_1.4fr_0.8fr] text-sm leading-6 text-slate-700">
          <div className="p-4">regras do sistema e objetivo</div>
          <div className="border-x border-slate-100 p-4">histórico, documentos e pergunta atual</div>
          <div className="p-4">tokens gerados um por vez</div>
        </div>
      </div>
    </div>
  );
}
