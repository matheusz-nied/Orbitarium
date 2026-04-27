import { useMemo, useState, type ReactNode } from "react";
import { Brain, SlidersHorizontal } from "lucide-react";
import type { LessonModule } from "../../../types/content";

export const interactions = {
  "llm-tokenizer": TokenizerInteraction,
  "next-token-prediction": NextTokenPredictionInteraction,
  "embedding-map": EmbeddingMapInteraction,
  "attention-map": AttentionMapInteraction,
  "temperature-sampling": TemperatureSamplingInteraction,
} satisfies LessonModule["interactions"];

const tokenColors = ["bg-teal-100 text-teal-900", "bg-blue-100 text-blue-900", "bg-violet-100 text-violet-900", "bg-amber-100 text-amber-900", "bg-rose-100 text-rose-900"];

function simpleTokenize(text: string) {
  return text.match(/\w+|[^\s\w]/gu) ?? [];
}

function TokenizerInteraction() {
  const [text, setText] = useState("Um LLM transforma texto em tokens antes de prever a continuação.");
  const tokens = useMemo(() => simpleTokenize(text), [text]);

  return (
    <InteractiveShell eyebrow="Tokenização" title="Veja a frase virar unidades de processamento">
      <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <label className="grid gap-2 text-sm font-black text-slate-700">
          Texto
          <textarea
            className="min-h-36 resize-y rounded-3xl border border-teal-200 bg-white px-4 py-3 text-base leading-7 text-slate-800 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
        </label>
        <div className="rounded-3xl bg-white p-5">
          <div className="flex items-center justify-between gap-3">
            <h4 className="font-display text-2xl font-semibold tracking-tight text-slate-950">Tokens aproximados</h4>
            <span className="rounded-full bg-teal-100 px-3 py-1 text-sm font-black text-teal-800">{tokens.length}</span>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {tokens.map((token, index) => (
              <span className={`rounded-2xl px-3 py-2 font-mono text-sm font-black ${tokenColors[index % tokenColors.length]}`} key={`${token}-${index}`}>
                {token}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-600">Esta simulação simplifica tokenizadores reais, mas mostra a ideia central: o modelo não escolhe letras soltas nem frases inteiras; ele opera sobre unidades discretas.</p>
        </div>
      </div>
    </InteractiveShell>
  );
}

const continuations = {
  "A capital do Brasil é": [
    ["Brasília", 0.72],
    ["São", 0.08],
    ["Rio", 0.05],
    ["uma", 0.04],
  ],
  "Para estudar melhor, eu devo": [
    ["revisar", 0.34],
    ["praticar", 0.27],
    ["dormir", 0.18],
    ["organizar", 0.12],
  ],
  "O modelo pode errar quando": [
    ["inventa", 0.31],
    ["falta", 0.25],
    ["confunde", 0.21],
    ["recebe", 0.13],
  ],
};

function NextTokenPredictionInteraction() {
  const [prompt, setPrompt] = useState<keyof typeof continuations>("A capital do Brasil é");
  const choices = continuations[prompt];

  return (
    <InteractiveShell eyebrow="Predição" title="Compare candidatos ao próximo token">
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="grid gap-3">
          {Object.keys(continuations).map((item) => (
            <button
              className={`rounded-2xl px-4 py-3 text-left text-sm font-black transition ${prompt === item ? "bg-slate-950 text-white" : "bg-white text-slate-700 hover:bg-teal-50"}`}
              key={item}
              type="button"
              onClick={() => setPrompt(item as keyof typeof continuations)}
            >
              {item} ...
            </button>
          ))}
        </div>
        <div className="rounded-3xl bg-white p-5">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-teal-700">Contexto atual</p>
          <p className="mt-2 text-2xl font-black text-slate-950">{prompt} <span className="text-teal-700">?</span></p>
          <div className="mt-5 grid gap-3">
            {choices.map(([token, probability]) => (
              <div key={token}>
                <div className="flex justify-between text-sm font-black text-slate-700">
                  <span>{token}</span>
                  <span>{Math.round(probability * 100)}%</span>
                </div>
                <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-teal-600 transition-[width]" style={{ width: `${probability * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </InteractiveShell>
  );
}

const embeddingPoints = [
  { label: "gato", x: 18, y: 62, group: "animais", color: "#0f766e" },
  { label: "cachorro", x: 28, y: 66, group: "animais", color: "#0f766e" },
  { label: "banana", x: 72, y: 64, group: "alimentos", color: "#d97706" },
  { label: "maçã", x: 80, y: 58, group: "alimentos", color: "#d97706" },
  { label: "programa", x: 34, y: 24, group: "tecnologia", color: "#2563eb" },
  { label: "algoritmo", x: 44, y: 18, group: "tecnologia", color: "#2563eb" },
  { label: "rei", x: 70, y: 28, group: "papeis", color: "#7c3aed" },
  { label: "rainha", x: 78, y: 30, group: "papeis", color: "#7c3aed" },
];

function EmbeddingMapInteraction() {
  const [selected, setSelected] = useState(embeddingPoints[0]);

  return (
    <InteractiveShell eyebrow="Embeddings" title="Explore proximidade semântica em um mapa 2D">
      <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <svg viewBox="0 0 640 360" className="w-full rounded-3xl bg-white" role="img" aria-label="Mapa didatico de embeddings">
          <line x1="48" y1="312" x2="596" y2="312" stroke="#cbd5e1" />
          <line x1="48" y1="42" x2="48" y2="312" stroke="#cbd5e1" />
          {embeddingPoints.map((point) => (
            <g key={point.label} onClick={() => setSelected(point)} className="cursor-pointer">
              <circle cx={point.x * 6} cy={330 - point.y * 3} r={selected.label === point.label ? 14 : 10} fill={point.color} opacity={selected.label === point.label ? 1 : 0.78} />
              <text x={point.x * 6 + 14} y={335 - point.y * 3} fill="#0f172a" fontSize="15" fontWeight="800">{point.label}</text>
            </g>
          ))}
        </svg>
        <div className="rounded-3xl bg-white p-5">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-700">Ponto selecionado</p>
          <h4 className="mt-2 font-display text-3xl font-semibold tracking-tight text-slate-950">{selected.label}</h4>
          <p className="mt-3 leading-7 text-slate-600">Grupo semântico: <strong>{selected.group}</strong>. Pontos próximos tendem a aparecer em contextos parecidos no treinamento, então o modelo pode usar essa geometria como entrada para camadas seguintes.</p>
        </div>
      </div>
    </InteractiveShell>
  );
}

const attentionRows = [
  { token: "O", weights: [0.08, 0.12, 0.25, 0.2, 0.35] },
  { token: "banco", weights: [0.1, 0.16, 0.34, 0.28, 0.12] },
  { token: "fica", weights: [0.04, 0.28, 0.16, 0.36, 0.16] },
  { token: "perto", weights: [0.03, 0.22, 0.2, 0.18, 0.37] },
  { token: "do rio", weights: [0.02, 0.18, 0.12, 0.32, 0.36] },
];

function AttentionMapInteraction() {
  const [row, setRow] = useState(1);
  const selected = attentionRows[row];

  return (
    <InteractiveShell eyebrow="Atenção" title="Veja quais tokens influenciam a interpretação">
      <div className="grid gap-5 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="grid gap-2">
          {attentionRows.map((item, index) => (
            <button
              className={`rounded-2xl px-4 py-3 text-left font-black transition ${row === index ? "bg-blue-700 text-white" : "bg-white text-slate-700 hover:bg-blue-50"}`}
              key={item.token}
              type="button"
              onClick={() => setRow(index)}
            >
              {item.token}
            </button>
          ))}
        </div>
        <div className="rounded-3xl bg-white p-5">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-700">Token consultando: {selected.token}</p>
          <div className="mt-5 grid grid-cols-5 gap-2">
            {attentionRows.map((target, index) => {
              const weight = selected.weights[index];
              return (
                <div className="rounded-2xl p-3 text-center text-sm font-black text-slate-950" style={{ backgroundColor: `rgba(37, 99, 235, ${0.12 + weight})` }} key={target.token}>
                  <p>{target.token}</p>
                  <p className="mt-2 font-mono">{Math.round(weight * 100)}%</p>
                </div>
              );
            })}
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-600">Atenção não é explicação perfeita do pensamento do modelo, mas mostra um mecanismo real: cada posição combina informação de outras posições antes de prever o próximo token.</p>
        </div>
      </div>
    </InteractiveShell>
  );
}

const baseTokens = [
  ["precisa", 4.2],
  ["pode", 3.4],
  ["deve", 2.8],
  ["talvez", 1.4],
  ["surpreendentemente", 0.5],
] as const;

function TemperatureSamplingInteraction() {
  const [temperature, setTemperature] = useState(0.8);
  const distribution = useMemo(() => {
    const weights = baseTokens.map(([, logit]) => Math.exp(logit / temperature));
    const total = weights.reduce((sum, value) => sum + value, 0);
    return baseTokens.map(([token], index) => [token, weights[index] / total] as const);
  }, [temperature]);

  return (
    <InteractiveShell eyebrow="Sampling" title="Ajuste a temperatura da geração">
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl bg-white p-5">
          <div className="flex items-center gap-3">
            <SlidersHorizontal className="text-violet-700" size={22} aria-hidden="true" />
            <label className="grid flex-1 gap-2 text-sm font-black text-slate-700">
              Temperatura: {temperature.toFixed(1)}
              <input type="range" min="0.2" max="1.8" step="0.1" value={temperature} onChange={(event) => setTemperature(Number(event.target.value))} />
            </label>
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-600">Temperatura baixa concentra a escolha no token mais provável. Temperatura alta espalha probabilidade e aumenta variação, mas também aumenta risco de saídas estranhas.</p>
        </div>
        <div className="rounded-3xl bg-white p-5">
          <p className="font-black text-slate-950">"O estudante {distribution[0][0]}..."</p>
          <div className="mt-5 grid gap-3">
            {distribution.map(([token, probability]) => (
              <div key={token}>
                <div className="flex justify-between text-sm font-black text-slate-700">
                  <span>{token}</span>
                  <span>{Math.round(probability * 100)}%</span>
                </div>
                <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-violet-600 transition-[width]" style={{ width: `${probability * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </InteractiveShell>
  );
}

function InteractiveShell({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return (
    <section className="rounded-[2rem] border border-teal-200 bg-teal-50 p-5 shadow-xl shadow-teal-900/5">
      <div className="mb-5 flex items-start gap-3">
        <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-white text-teal-700">
          <Brain size={21} aria-hidden="true" />
        </span>
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-teal-700">{eyebrow}</p>
          <h3 className="mt-1 font-display text-2xl font-semibold tracking-tight text-slate-950">{title}</h3>
        </div>
      </div>
      {children}
    </section>
  );
}
