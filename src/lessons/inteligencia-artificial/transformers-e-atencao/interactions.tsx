import { useMemo, useState } from "react";
import { BarChart3, Calculator, Eye, Layers, Timer, Zap } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import {
  InteractiveShell,
  MetricCard,
} from "../../../components/lesson/InteractionPrimitives";

export const interactions = {
  "attention-map": AttentionMapInteraction,
  "attention-calculator": AttentionCalculatorInteraction,
  "multi-head-demo": MultiHeadDemoInteraction,
  "positional-encoding-demo": PositionalEncodingDemoInteraction,
  "quadratic-cost-demo": QuadraticCostDemoInteraction,
  "rnn-vs-transformer": RnnVsTransformerInteraction,
} satisfies LessonModule["interactions"];

const phrases: Record<string, { tokens: string[]; weights: number[][] }> = {
  "O banco financeiro roubou dinheiro": {
    tokens: ["O", "banco", "financeiro", "roubou", "dinheiro"],
    weights: [
      [0.12, 0.20, 0.30, 0.22, 0.16],
      [0.08, 0.15, 0.42, 0.22, 0.13],
      [0.06, 0.38, 0.18, 0.24, 0.14],
      [0.04, 0.20, 0.28, 0.16, 0.32],
      [0.03, 0.12, 0.18, 0.27, 0.40],
    ],
  },
  "O banco do parque quebrou": {
    tokens: ["O", "banco", "do", "parque", "quebrou"],
    weights: [
      [0.10, 0.25, 0.18, 0.22, 0.25],
      [0.08, 0.12, 0.16, 0.40, 0.24],
      [0.10, 0.28, 0.14, 0.28, 0.20],
      [0.05, 0.35, 0.15, 0.12, 0.33],
      [0.04, 0.30, 0.12, 0.26, 0.28],
    ],
  },
  "Ela disse que saiu cedo": {
    tokens: ["Ela", "disse", "que", "saiu", "cedo"],
    weights: [
      [0.28, 0.35, 0.08, 0.18, 0.11],
      [0.30, 0.18, 0.12, 0.25, 0.15],
      [0.10, 0.32, 0.14, 0.26, 0.18],
      [0.32, 0.18, 0.10, 0.14, 0.26],
      [0.12, 0.14, 0.08, 0.40, 0.26],
    ],
  },
};

const phraseKeys = Object.keys(phrases);

function AttentionMapInteraction() {
  const [phraseKey, setPhraseKey] = useState(phraseKeys[0]);
  const [selectedRow, setSelectedRow] = useState(1);
  const data = phrases[phraseKey];
  const tokens = data.tokens;
  const selectedWeights = data.weights[selectedRow];

  return (
    <InteractiveShell
      eyebrow="Mapa de atenção"
      title="Visualize como tokens se conectam"
      tone="indigo"
      icon={<Eye size={18} aria-hidden="true" />}
      description="Clique em um token para ver quais outros tokens recebem mais peso de atenção. Compare frases com sentidos diferentes."
    >
      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="grid gap-4">
          <div className="rounded-3xl bg-white p-4">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-indigo-700">Frase</p>
            <div className="mt-3 grid gap-2">
              {phraseKeys.map((key) => (
                <button
                  className={`rounded-2xl px-4 py-3 text-left text-sm font-black transition ${
                    phraseKey === key ? "bg-indigo-600 text-white" : "bg-slate-50 text-slate-700 hover:bg-indigo-50"
                  }`}
                  key={key}
                  type="button"
                  onClick={() => { setPhraseKey(key); setSelectedRow(1); }}
                >
                  {key}
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-3xl bg-white p-4">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-indigo-700">Token selecionado</p>
            <h4 className="mt-2 font-display text-3xl font-semibold tracking-tight text-slate-950">
              {tokens[selectedRow]}
            </h4>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {selectedRow === 1 && phraseKey === phraseKeys[0]
                ? "'banco' atende fortemente a 'financeiro', indicando que interpreta como instituição."
                : selectedRow === 1 && phraseKey === phraseKeys[1]
                  ? "'banco' atende fortemente a 'parque', indicando que interpreta como assento."
                  : "Cada peso mostra quanto este token usa da informação dos outros."}
            </p>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-5">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-slate-500">Selecione um token:</p>
          <div className="mt-3 flex gap-2">
            {tokens.map((token, i) => (
              <button
                className={`flex-1 rounded-2xl px-3 py-2 text-sm font-black transition ${
                  selectedRow === i ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-indigo-50"
                }`}
                key={token}
                type="button"
                onClick={() => setSelectedRow(i)}
              >
                {token}
              </button>
            ))}
          </div>
          <div className="mt-4 grid gap-2">
            {tokens.map((token, i) => {
              const weight = selectedWeights[i];
              const maxWeight = Math.max(...selectedWeights);
              const isMax = weight === maxWeight;
              return (
                <div className="flex items-center gap-3" key={token}>
                  <span className={`w-16 shrink-0 text-sm font-black ${i === selectedRow ? "text-indigo-700" : "text-slate-600"}`}>
                    {token}
                  </span>
                  <div className="flex-1">
                    <div className="h-4 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full rounded-full transition-[width] ${isMax ? "bg-indigo-600" : "bg-indigo-300"}`}
                        style={{ width: `${weight * 100}%` }}
                      />
                    </div>
                  </div>
                  <span className={`w-14 text-right font-mono text-sm font-black ${isMax ? "text-indigo-700" : "text-slate-500"}`}>
                    {(weight * 100).toFixed(0)}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </InteractiveShell>
  );
}

const sentenceTokens = ["Ela", "disse", "que", "Maria", "saiu", "cedo"];

const headData = [
  {
    name: "Cabeça 1: Sintaxe",
    color: "#10b981",
    weights: [
      [0.35, 0.30, 0.08, 0.07, 0.12, 0.08],
      [0.25, 0.20, 0.22, 0.10, 0.13, 0.10],
      [0.05, 0.30, 0.20, 0.10, 0.25, 0.10],
      [0.15, 0.10, 0.08, 0.22, 0.35, 0.10],
      [0.08, 0.18, 0.25, 0.10, 0.20, 0.19],
      [0.08, 0.12, 0.08, 0.07, 0.35, 0.30],
    ],
  },
  {
    name: "Cabeça 2: Referência",
    color: "#3b82f6",
    weights: [
      [0.20, 0.10, 0.05, 0.55, 0.05, 0.05],
      [0.30, 0.15, 0.10, 0.20, 0.15, 0.10],
      [0.10, 0.20, 0.20, 0.30, 0.10, 0.10],
      [0.45, 0.10, 0.05, 0.20, 0.10, 0.10],
      [0.10, 0.15, 0.10, 0.35, 0.20, 0.10],
      [0.05, 0.10, 0.05, 0.10, 0.40, 0.30],
    ],
  },
  {
    name: "Cabeça 3: Tópico",
    color: "#8b5cf6",
    weights: [
      [0.22, 0.18, 0.12, 0.15, 0.18, 0.15],
      [0.18, 0.22, 0.14, 0.16, 0.16, 0.14],
      [0.12, 0.14, 0.22, 0.18, 0.18, 0.16],
      [0.16, 0.14, 0.18, 0.22, 0.16, 0.14],
      [0.14, 0.16, 0.16, 0.14, 0.22, 0.18],
      [0.14, 0.14, 0.16, 0.14, 0.20, 0.22],
    ],
  },
];

function MultiHeadDemoInteraction() {
  const [headIndex, setHeadIndex] = useState(0);
  const head = headData[headIndex];
  const maxInRow = head.weights.map((row) => Math.max(...row));

  return (
    <InteractiveShell
      eyebrow="Multi-head"
      title="Cada cabeça vê um padrão diferente"
      tone="teal"
      icon={<Layers size={18} aria-hidden="true" />}
      description="Alterne entre cabeças para ver como diferentes padrões de atenção se especializam na mesma frase."
    >
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="grid gap-3">
          {headData.map((h, i) => (
            <button
              className={`rounded-2xl border px-4 py-3 text-left transition ${
                headIndex === i ? "border-teal-600 bg-teal-600 text-white" : "border-slate-100 bg-white text-slate-700 hover:border-teal-300"
              }`}
              key={h.name}
              type="button"
              onClick={() => setHeadIndex(i)}
            >
              <span className="block text-sm font-black">{h.name}</span>
            </button>
          ))}
          <div className="rounded-3xl bg-white p-4">
            <p className="text-sm leading-6 text-slate-600">
              {headIndex === 0 && "A cabeça sintática conecta pronomes a verbos e sujeitos a predicados."}
              {headIndex === 1 && "A cabeça referencial conecta 'Ela' a 'Maria', resolvendo a referência."
              }
              {headIndex === 2 && "A cabeça tópico distribui atenção de forma mais uniforme, capturando o tema global da frase."}
            </p>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-5">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-teal-700">Frase: "Ela disse que Maria saiu cedo"</p>
          <div className="mt-4 space-y-2">
            {head.weights.map((row, i) => (
              <div className="flex items-center gap-2" key={i}>
                <span className="w-14 shrink-0 text-sm font-black text-slate-700">{sentenceTokens[i]}</span>
                <div className="flex flex-1 gap-1">
                  {row.map((w, j) => {
                    const isMax = w === maxInRow[i];
                    return (
                      <div
                        className="flex-1 rounded-lg text-center transition-all"
                        key={j}
                        style={{
                          backgroundColor: `${head.color}${isMax ? "55" : "22"}`,
                          padding: "4px 0",
                        }}
                      >
                        <span className={`text-xs font-black ${isMax ? "text-slate-950" : "text-slate-500"}`}>
                          {(w * 100).toFixed(0)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            {sentenceTokens.map((t) => (
              <span key={t} className="flex-1 text-center text-xs font-black text-slate-500">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </InteractiveShell>
  );
}

function AttentionCalculatorInteraction() {
  const [scaleFactor, setScaleFactor] = useState(8);
  const [selectedIndex, setSelectedIndex] = useState(1);

  const tokens = ["banco", "financeiro", "roubou", "ontem", "dinheiro"];
  const dk = scaleFactor;
  const rawScores = [
    [2.0, 1.5, 0.3, -0.8, 1.2],
    [0.8, 3.2, 1.1, 0.2, 2.5],
    [0.5, 1.8, 1.5, -0.3, 0.7],
    [-0.2, 0.6, 0.4, 1.0, 1.3],
    [0.3, 2.1, 0.8, 0.1, 1.8],
  ];

  const scaledScores = useMemo(() => {
    return rawScores.map((row) =>
      row.map((s) => s / Math.sqrt(dk))
    );
  }, [dk]);

  const softmaxWeights = useMemo(() => {
    const row = scaledScores[selectedIndex];
    const maxVal = Math.max(...row);
    const exps = row.map((v) => Math.exp(v - maxVal));
    const sum = exps.reduce((a, b) => a + b, 0);
    return exps.map((e) => e / sum);
  }, [scaledScores, selectedIndex]);

  const unscaledExps = useMemo(() => {
    const row = rawScores[selectedIndex];
    const maxVal = Math.max(...row);
    const exps = row.map((v) => Math.exp(v - maxVal));
    const sum = exps.reduce((a, b) => a + b, 0);
    return exps.map((e) => e / sum);
  }, [selectedIndex]);

  return (
    <InteractiveShell
      eyebrow="Cálculo"
      title="Veja a atenção passo a passo"
      tone="violet"
      icon={<Calculator size={18} aria-hidden="true" />}
      description="Selecione um token e ajuste d_k para ver como a escala afeta a distribuição de atenção."
    >
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-4">
          <div className="rounded-3xl bg-white p-5">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-700">Token consultando</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {tokens.map((token, i) => (
                <button
                  className={`rounded-2xl px-4 py-2 text-sm font-black transition ${
                    selectedIndex === i ? "bg-violet-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-violet-50"
                  }`}
                  key={token}
                  type="button"
                  onClick={() => setSelectedIndex(i)}
                >
                  {token}
                </button>
              ))}
            </div>
          </div>
          <label className="grid gap-2 text-sm font-black text-slate-700">
            <span className="flex items-center justify-between">
              d_k (dimensão das Keys): {dk}
            </span>
            <input
              className="w-full accent-slate-950"
              max={128}
              min={1}
              step={1}
              type="range"
              value={dk}
              onChange={(e) => setScaleFactor(Number(e.target.value))}
            />
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard label="d_k" value={String(dk)} />
            <MetricCard label="√d_k" value={Math.sqrt(dk).toFixed(2)} />
            <MetricCard label="Score máx (sem escala)" value={Math.max(...rawScores[selectedIndex]).toFixed(1)} />
            <MetricCard label="Score máx (com escala)" value={(Math.max(...rawScores[selectedIndex]) / Math.sqrt(dk)).toFixed(2)} />
          </div>
          <div className={`rounded-3xl border p-4 ${dk < 4 ? "border-amber-200 bg-amber-50" : "border-violet-100 bg-white"}`}>
            <p className="text-sm font-black uppercase tracking-[0.16em]">Efeito da escala</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {dk < 4
                ? "Com d_k muito pequena, os scores ficam grandes após a divisão. O softmax satura: um token recebe quase todo o peso, os outros quase zero. Isso mata o gradiente."
                : dk > 64
                  ? "Com d_k grande, a escala reduz os scores significativamente. O softmax distribui o peso de forma mais uniforme entre os tokens."
                  : "Valores moderados de d_k mantêm o softmax informativo: os pesos se concentram nos tokens relevantes sem saturar."}
            </p>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-5">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-700">Distribuição de atenção para "{tokens[selectedIndex]}"</p>
          <div className="mt-4 grid gap-3">
            {tokens.map((token, i) => (
              <div key={token}>
                <div className="flex items-center justify-between text-sm font-black text-slate-700">
                  <span>{token}</span>
                  <span className="flex gap-4">
                    <span className="text-slate-400">sem escala: {(unscaledExps[i] * 100).toFixed(1)}%</span>
                    <span className="text-violet-700">com escala: {(softmaxWeights[i] * 100).toFixed(1)}%</span>
                  </span>
                </div>
                <div className="mt-1 flex gap-1">
                  <div className="flex-1 h-3 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-slate-300 transition-[width]" style={{ width: `${unscaledExps[i] * 100}%` }} />
                  </div>
                  <div className="flex-1 h-3 overflow-hidden rounded-full bg-violet-100">
                    <div className="h-full rounded-full bg-violet-600 transition-[width]" style={{ width: `${softmaxWeights[i] * 100}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            barras cinza = softmax sem escala · barras violeta = softmax com escala por √d_k
          </p>
        </div>
      </div>
    </InteractiveShell>
  );
}

function PositionalEncodingDemoInteraction() {
  const [position, setPosition] = useState(5);
  const [dimStart, setDimStart] = useState(0);

  const dims = 8;
  const values = useMemo(() => {
    const result: number[] = [];
    for (let i = 0; i < dims; i++) {
      const d = dimStart + i;
      const angle = position / Math.pow(10000, (2 * Math.floor(d / 2)) / 64);
      result.push(d % 2 === 0 ? Math.sin(angle) : Math.cos(angle));
    }
    return result;
  }, [position, dimStart, dims]);

  const allPositions = 20;
  const waveValues = useMemo(() => {
    const result: number[][] = [];
    for (let p = 0; p < allPositions; p++) {
      const row: number[] = [];
      for (let i = 0; i < dims; i++) {
        const d = dimStart + i;
        const angle = p / Math.pow(10000, (2 * Math.floor(d / 2)) / 64);
        row.push(d % 2 === 0 ? Math.sin(angle) : Math.cos(angle));
      }
      result.push(row);
    }
    return result;
  }, [dimStart, dims]);

  return (
    <InteractiveShell
      eyebrow="Posição"
      title="Explore as ondas de positional encoding"
      tone="amber"
      icon={<Zap size={18} aria-hidden="true" />}
      description="Ajuste a posição e veja como o vetor posicional muda. Dimensões rápidas distinguem posições adjacentes; lentas distinguem posições distantes."
    >
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-4">
          <label className="grid gap-2 text-sm font-black text-slate-700">
            <span className="flex items-center justify-between">
              Posição: <span className="font-mono text-amber-700">{position}</span>
            </span>
            <input
              className="w-full accent-slate-950"
              max={19}
              min={0}
              step={1}
              type="range"
              value={position}
              onChange={(e) => setPosition(Number(e.target.value))}
            />
          </label>
          <label className="grid gap-2 text-sm font-black text-slate-700">
            <span className="flex items-center justify-between">
              Dimensão inicial: <span className="font-mono text-amber-700">{dimStart}</span>
            </span>
            <input
              className="w-full accent-slate-950"
              max={60}
              min={0}
              step={2}
              type="range"
              value={dimStart}
              onChange={(e) => setDimStart(Number(e.target.value))}
            />
          </label>
          <div className="rounded-3xl bg-white p-5">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-700">Vetor posicional (posição {position})</p>
            <div className="mt-3 grid gap-2">
              {values.map((v, i) => (
                <div className="flex items-center gap-2" key={i}>
                  <span className="w-16 shrink-0 text-xs font-mono font-black text-slate-500">d={dimStart + i}</span>
                  <div className="flex-1 h-3 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full transition-[width]"
                      style={{
                        width: `${Math.abs(v) * 100}%`,
                        backgroundColor: v >= 0 ? "#f59e0b" : "#7c3aed",
                      }}
                    />
                  </div>
                  <span className={`w-14 text-right font-mono text-xs font-black ${v >= 0 ? "text-amber-700" : "text-violet-700"}`}>
                    {v >= 0 ? "+" : ""}{v.toFixed(3)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-amber-100 bg-white p-5">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-700">Mapa de calor: posições × dimensões</p>
          <div className="mt-3 overflow-x-auto">
            <svg className="w-full min-w-[480px]" viewBox="0 0 480 320" role="img" aria-label="Mapa de calor do positional encoding">
              <rect width="480" height="320" rx="12" fill="#fffbeb" />
              {waveValues.map((row, pi) =>
                row.map((val, di) => {
                  const r = Math.floor((val >= 0 ? 245 : 124) * (1 - Math.abs(val)) + (val >= 0 ? 158 : 58) * Math.abs(val));
                  const g = Math.floor((val >= 0 ? 158 : 58) * (1 - Math.abs(val)) + (val >= 0 ? 158 : 30) * Math.abs(val));
                  const b = Math.floor((val >= 0 ? 11 : 237) * (1 - Math.abs(val)) + (val >= 0 ? 11 : 237) * Math.abs(val));
                  return (
                    <rect
                      key={`${pi}-${di}`}
                      x={40 + di * 50}
                      y={30 + pi * 14}
                      width="48"
                      height="12"
                      fill={`rgb(${r},${g},${b})`}
                      opacity={0.5 + Math.abs(val) * 0.5}
                    />
                  );
                })
              )}
              <rect
                x={39}
                y={28 + position * 14}
                width={(dims) * 50 + 2}
                height={16}
                fill="none"
                stroke="#0f172a"
                strokeWidth="2.5"
                rx="4"
              />
              {waveValues[0].map((_, di) => (
                <text key={`dim-${di}`} x={64 + di * 50} y="22" textAnchor="middle" fill="#78350f" fontSize="10" fontWeight="800">
                  d={dimStart + di}
                </text>
              ))}
            </svg>
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            A linha destacada mostra o vetor posicional da posição {position}. Dimensões baixas oscilam rápido (distinguindo posições próximas); dimensões altas oscilam devagar (distinguindo posições distantes).
          </p>
        </div>
      </div>
    </InteractiveShell>
  );
}

function QuadraticCostDemoInteraction() {
  const [seqLength, setSeqLength] = useState(512);
  const elements = seqLength * seqLength;
  const memoryGB = (elements * 4 * 2) / (1024 * 1024 * 1024);

  const dataPoints = [
    { n: 128, elements: 128 * 128, label: "128" },
    { n: 512, elements: 512 * 512, label: "512" },
    { n: 1024, elements: 1024 * 1024, label: "1K" },
    { n: 4096, elements: 4096 * 4096, label: "4K" },
    { n: 8192, elements: 8192 * 8192, label: "8K" },
    { n: 32768, elements: 32768 * 32768, label: "32K" },
    { n: 128000, elements: 128000 * 128000, label: "128K" },
  ];

  const maxElements = 128000 * 128000;
  const barScale = Math.log10(elements) / Math.log10(maxElements);

  return (
    <InteractiveShell
      eyebrow="Custo"
      title="A janela cresce, a memória explode"
      tone="rose"
      icon={<BarChart3 size={18} aria-hidden="true" />}
      description="Ajuste o tamanho da sequência e veja como a matriz de atenção cresce de forma quadrática."
    >
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-4">
          <label className="grid gap-2 text-sm font-black text-slate-700">
            <span className="flex items-center justify-between">
              Tamanho da sequência (n): <span className="font-mono text-rose-700">{seqLength.toLocaleString()}</span>
            </span>
            <input
              className="w-full accent-slate-950"
              max={128000}
              min={64}
              step={64}
              type="range"
              value={seqLength}
              onChange={(e) => setSeqLength(Number(e.target.value))}
            />
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard label="Tokens (n)" value={seqLength.toLocaleString()} />
            <MetricCard label="Elementos (n²)" value={elements.toLocaleString()} />
            <MetricCard label="Memória (fp32)" value={`${memoryGB.toFixed(2)} GB`} />
            <MetricCard label="Crescimento" value={seqLength <= 128 ? "—" : `${(elements / (128 * 128)).toFixed(0)}× vs 128`} />
          </div>
          <div className="rounded-3xl border border-rose-200 bg-rose-50 p-4">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-rose-700">Implicação</p>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              {seqLength <= 512
                ? "Janelas pequenas são manejáveis. A maioria dos modelos clássicos operava nesse regime."
                : seqLength <= 4096
                  ? "Na faixa de K tokens, a memória começa a pressionar limites de GPU. Modelos como BERT operavam aqui."
                  : seqLength <= 32768
                    ? "Janelas grandes exigem técnicas de otimização agressivas — Flash Attention, gradient checkpointing e atenção em blocos tornam-se necessárias."
                    : "Contextos de 128K tokens geram bilhões de elementos na matriz de atenção. Sem atenção eficiente (linear, sparse ou em chunks), a inferência é inviável."}
            </p>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-5">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-rose-700">Escala logarítmica: elementos na matriz de atenção</p>
          <div className="mt-4 grid gap-3">
            {dataPoints.map((point) => {
              const isCurrent = Math.abs(point.n - seqLength) <= Math.max(64, seqLength * 0.05);
              const barWidth = Math.log10(point.elements) / Math.log10(maxElements);
              return (
                <div className="flex items-center gap-3" key={point.label}>
                  <span className={`w-12 text-right text-sm font-black ${isCurrent ? "text-rose-700" : "text-slate-500"}`}>
                    {point.label}
                  </span>
                  <div className="flex-1">
                    <div className="h-4 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full rounded-full transition-[width] ${isCurrent ? "bg-rose-600" : "bg-slate-300"}`}
                        style={{ width: `${barWidth * 100}%` }}
                      />
                    </div>
                  </div>
                  <span className={`w-20 text-right font-mono text-xs font-black ${isCurrent ? "text-rose-700" : "text-slate-400"}`}>
                    {(point.elements / 1000000).toFixed(point.elements > 1000000 ? 0 : 2)}M
                  </span>
                </div>
              );
            })}
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            A barra <strong>escala logaritmicamente</strong>: mesmo visualmente, a diferença entre 4K e 128K é enorme. Dobrar a janela mais do que quadruplica a memória de atenção.
          </p>
        </div>
      </div>
    </InteractiveShell>
  );
}

function RnnVsTransformerInteraction() {
  const [step, setStep] = useState(5);
  const rnnTokens = ["t₁", "t₂", "t₃", "t₄", "t₅", "t₆", "t₇", "t₈"];
  const rnnSpeed = 120;
  const tfSpeed = 12;

  return (
    <InteractiveShell
      eyebrow="Processamento"
      title="Sequencial vs. paralelo: veja a diferença na prática"
      tone="emerald"
      icon={<Timer size={18} aria-hidden="true" />}
      description="Ajuste o número de tokens e compare o tempo de processamento hipotético de uma RNN (sequencial) com um Transformer (paralelo)."
    >
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-4">
          <label className="grid gap-2 text-sm font-black text-slate-700">
            <span className="flex items-center justify-between">
              Tokens na sequência: <span className="font-mono text-emerald-700">{step}</span>
            </span>
            <input
              className="w-full accent-slate-950"
              max={8}
              min={2}
              step={1}
              type="range"
              value={step}
              onChange={(e) => setStep(Number(e.target.value))}
            />
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard label="RNN (ms)" value={(step * rnnSpeed).toString()} />
            <MetricCard label="Transformer (ms)" value={tfSpeed.toString()} />
            <MetricCard label="Razão" value={`${(step * rnnSpeed / tfSpeed).toFixed(1)}×`} />
            <MetricCard label="Speedup" value={`${(step).toFixed(0)}× mais rápido`} />
          </div>
          <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-4">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-emerald-700">Por quê?</p>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              A RNN precisa processar {step} tokens em sequência: cada passo depende do anterior. O Transformer processa todos os {step} tokens simultaneamente em uma única passagem paralela. Com {step} tokens, o speedup teórico é {step}×.
            </p>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-5">
          <div className="grid gap-6">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-rose-700">RNN: processamento sequencial</p>
              <div className="mt-3 grid gap-1">
                {rnnTokens.slice(0, step).map((token, i) => (
                  <div key={token} className="flex items-center gap-2">
                    <span className="w-8 text-xs font-mono font-black text-rose-600">{token}</span>
                    <div className="flex-1 h-8 overflow-hidden rounded-lg bg-rose-100">
                      <div
                        className="h-full rounded-lg bg-rose-400 transition-[width]"
                        style={{ width: `${100}%`, animationDelay: `${i * rnnSpeed}ms` }}
                      />
                    </div>
                    <span className="w-20 text-right font-mono text-xs font-black text-rose-600">{(i + 1) * rnnSpeed}ms</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">Transformer: processamento paralelo</p>
              <div className="mt-3 flex flex-wrap gap-1">
                {rnnTokens.slice(0, step).map((token) => (
                  <div key={token} className="flex-1 min-w-[40px]">
                    <div className="h-8 rounded-lg bg-emerald-400 transition-[width]" />
                    <p className="mt-1 text-center text-xs font-mono font-black text-emerald-700">{token}</p>
                  </div>
                ))}
              </div>
              <p className="mt-2 font-mono text-sm font-black text-emerald-700">{tfSpeed}ms (passagem única)</p>
            </div>
          </div>
          <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3">
            <p className="text-sm leading-6 text-slate-700">
              Com <strong>{step} tokens</strong>: RNN leva <strong>{(step * rnnSpeed)}ms</strong> (serial), Transformer leva <strong>{tfSpeed}ms</strong> (paralelo). O speedup real em GPUs é massivo porque milhares de núcleos operam simultaneamente.
            </p>
          </div>
        </div>
      </div>
    </InteractiveShell>
  );
}

