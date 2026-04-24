import { useEffect, useMemo, useState, type ReactNode } from "react";
import type { LessonModule } from "../../../types/content";

type EncodingName = "o200k_base" | "cl100k_base";

interface TokenPiece {
  id: number;
  text: string;
}

interface TokenEncoder {
  encode: (text: string) => number[];
  decode: (tokens: number[]) => string;
}

type EncoderMap = Record<EncodingName, TokenEncoder>;

let cachedEncoders: EncoderMap | null = null;
let encodersPromise: Promise<EncoderMap> | null = null;

const encodingLabels: Record<EncodingName, string> = {
  o200k_base: "o200k_base",
  cl100k_base: "cl100k_base",
};

export const interactions = {
  "token-playground": TokenPlaygroundInteraction,
  "rarity-comparison": RarityComparisonInteraction,
  "encoding-comparison": EncodingComparisonInteraction,
  "language-comparison": LanguageComparisonInteraction,
  "context-budget": ContextBudgetInteraction,
  "cost-context-simulator": CostContextSimulatorInteraction,
  "truncation-demo": TruncationDemoInteraction,
} satisfies LessonModule["interactions"];

function TokenPlaygroundInteraction() {
  const [text, setText] = useState(
    "Modelos de linguagem não leem frases como humanos: eles processam tokens.",
  );
  const [encoding, setEncoding] = useState<EncodingName>("o200k_base");
  const encoders = useTokenEncoders();
  const tokens = useMemo(
    () => (encoders ? tokenize(text, encoding, encoders) : []),
    [encoders, encoding, text],
  );

  return (
    <InteractiveShell
      eyebrow="Tokenizador real"
      title="Digite uma frase e veja os tokens"
      tone="teal"
      description="A divisão abaixo é calculada com js-tiktoken, usando o encoding selecionado."
    >
      <div className="grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="grid gap-4">
          <label className="grid gap-2 text-sm font-black text-slate-700">
            Texto
            <textarea
              className="min-h-40 resize-y rounded-3xl border border-teal-200 bg-white px-4 py-3 text-base leading-7 text-slate-800 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
              value={text}
              onChange={(event) => setText(event.target.value)}
            />
          </label>
          <EncodingSelect value={encoding} onChange={setEncoding} />
          <StatsGrid
            stats={[
              ["Caracteres", text.length],
              ["Palavras aprox.", countWords(text)],
              ["Tokens", tokens.length],
              ["Tokens / palavra", ratio(tokens.length, countWords(text))],
            ]}
          />
        </div>
        <TokenPanel
          tokens={tokens}
          emptyText={encoders ? "Digite algum texto para gerar tokens." : "Carregando tokenizador..."}
        />
      </div>
    </InteractiveShell>
  );
}

function RarityComparisonInteraction() {
  const samples = [
    {
      label: "Cotidiano",
      text: "Hoje eu vou estudar modelos de linguagem.",
      note: "Palavras frequentes costumam gerar sequências compactas.",
    },
    {
      label: "Técnico",
      text: "A hiperparametrização impacta a generalização do transformador.",
      note: "Termos menos comuns tendem a se dividir em mais subwords.",
    },
    {
      label: "Nome próprio",
      text: "A apresentação citou Kaczmarczyk, Miyazaki e Schopenhauer.",
      note: "Nomes raros e grafias específicas podem aumentar a fragmentação.",
    },
    {
      label: "Código",
      text: "const totalTokens = encoder.encode(prompt).length;",
      note: "Símbolos, camelCase e pontuação também entram na sequência.",
    },
  ];
  const [selected, setSelected] = useState(samples[0]);
  const encoders = useTokenEncoders();
  const tokens = useMemo(
    () => (encoders ? tokenize(selected.text, "o200k_base", encoders) : []),
    [encoders, selected.text],
  );

  return (
    <InteractiveShell
      eyebrow="Comparação"
      title="Palavras comuns e raras"
      tone="amber"
      description="Compare exemplos com o mesmo encoding e observe como o tipo de texto muda a contagem."
    >
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="grid gap-3">
          {samples.map((sample) => {
            const sampleTokens = encoders ? tokenize(sample.text, "o200k_base", encoders) : [];
            const isSelected = sample.label === selected.label;
            return (
              <button
                className={`rounded-3xl border p-4 text-left transition ${
                  isSelected
                    ? "border-amber-500 bg-white shadow-lg shadow-amber-900/10"
                    : "border-amber-200 bg-white/70 hover:bg-white"
                }`}
                key={sample.label}
                type="button"
                onClick={() => setSelected(sample)}
              >
                <span className="text-xs font-black uppercase tracking-[0.18em] text-amber-700">
                  {sample.label}
                </span>
                <span className="mt-2 block text-sm font-semibold leading-6 text-slate-700">
                  {sample.text}
                </span>
                <span className="mt-3 inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-black text-amber-900">
                  {encoders ? `${sampleTokens.length} tokens` : "carregando"}
                </span>
              </button>
            );
          })}
        </div>
        <div className="grid gap-4">
          <div className="rounded-3xl bg-white p-5">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-amber-700">
              {selected.label}
            </p>
            <p className="mt-3 text-lg font-bold leading-8 text-slate-950">{selected.text}</p>
            <p className="mt-3 leading-7 text-slate-600">{selected.note}</p>
          </div>
          <TokenPanel tokens={tokens} maxVisible={28} emptyText="Carregando tokenizador..." />
        </div>
      </div>
    </InteractiveShell>
  );
}

function EncodingComparisonInteraction() {
  const [text, setText] = useState("Tokenização muda quando o encoding muda. 🤖");
  const encoders = useTokenEncoders();
  const comparisons = useMemo(
    () =>
      (["o200k_base", "cl100k_base"] as EncodingName[]).map((encoding) => ({
        encoding,
        tokens: encoders ? tokenize(text, encoding, encoders) : [],
      })),
    [encoders, text],
  );

  return (
    <InteractiveShell
      eyebrow="Encodings"
      title="Mesmo texto, regras diferentes"
      tone="indigo"
      description="Compare dois encodings comuns. O texto é igual; a segmentação pode mudar."
    >
      <label className="grid gap-2 text-sm font-black text-slate-700">
        Texto para comparação
        <input
          className="rounded-2xl border border-indigo-200 bg-white px-4 py-3 text-base text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
      </label>
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {comparisons.map(({ encoding, tokens }) => (
          <article className="rounded-3xl border border-indigo-200 bg-white p-5" key={encoding}>
            <div className="flex items-center justify-between gap-3">
              <h4 className="font-display text-2xl font-semibold tracking-tight text-slate-950">
                {encodingLabels[encoding]}
              </h4>
              <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-black text-indigo-800">
                {tokens.length} tokens
              </span>
            </div>
            <TokenPanel tokens={tokens} maxVisible={18} compact emptyText="Carregando tokenizador..." />
          </article>
        ))}
      </div>
    </InteractiveShell>
  );
}

function LanguageComparisonInteraction() {
  const encoders = useTokenEncoders();
  const samples = [
    ["Português", "Você está estudando tokens com atenção."],
    ["English", "You are studying tokens carefully."],
    ["Español", "Estás estudiando tokens con atención."],
    ["日本語", "あなたはトークンを注意深く学んでいます。"],
    ["Árabe", "أنت تدرس الرموز بعناية."],
    ["Emoji", "Texto + IA 🤖✨📚"],
  ] as const;

  return (
    <InteractiveShell
      eyebrow="Multilíngue"
      title="Idiomas diferentes, contagens diferentes"
      tone="emerald"
      description="Use textos curtos equivalentes para observar que a eficiência do encoding varia."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {samples.map(([label, text]) => {
          const o200kTokens = encoders ? tokenize(text, "o200k_base", encoders) : [];
          const cl100kTokens = encoders ? tokenize(text, "cl100k_base", encoders) : [];
          return (
            <article className="rounded-3xl border border-emerald-200 bg-white p-5" key={label}>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">
                {label}
              </p>
              <p className="mt-2 min-h-14 text-lg font-bold leading-7 text-slate-950">{text}</p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <MetricPill label="o200k_base" value={encoders ? o200kTokens.length : "..."} />
                <MetricPill label="cl100k_base" value={encoders ? cl100kTokens.length : "..."} />
              </div>
            </article>
          );
        })}
      </div>
    </InteractiveShell>
  );
}

function ContextBudgetInteraction() {
  const [limit, setLimit] = useState(8192);
  const [systemTokens, setSystemTokens] = useState(600);
  const [historyTokens, setHistoryTokens] = useState(1400);
  const [documentTokens, setDocumentTokens] = useState(3000);
  const [outputTokens, setOutputTokens] = useState(900);
  const total = systemTokens + historyTokens + documentTokens + outputTokens;
  const overflow = Math.max(0, total - limit);
  const segments = [
    { label: "Instruções", value: systemTokens, color: "bg-teal-600" },
    { label: "Histórico", value: historyTokens, color: "bg-blue-600" },
    { label: "Documentos", value: documentTokens, color: "bg-orange-500" },
    { label: "Saída", value: outputTokens, color: "bg-amber-500" },
  ];

  return (
    <InteractiveShell
      eyebrow="Orçamento"
      title="Distribua a janela de contexto"
      tone="blue"
      description="Ajuste os blocos e veja quando o total deixa de caber."
    >
      <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="grid gap-4">
          <RangeField label="Limite total" value={limit} min={2048} max={32768} step={1024} onChange={setLimit} />
          <RangeField label="Instruções" value={systemTokens} min={0} max={5000} step={100} onChange={setSystemTokens} />
          <RangeField label="Histórico" value={historyTokens} min={0} max={9000} step={100} onChange={setHistoryTokens} />
          <RangeField label="Documentos" value={documentTokens} min={0} max={18000} step={100} onChange={setDocumentTokens} />
          <RangeField label="Saída reservada" value={outputTokens} min={100} max={6000} step={100} onChange={setOutputTokens} />
        </div>
        <div className="rounded-3xl bg-white p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h4 className="font-display text-2xl font-semibold tracking-tight text-slate-950">
              {total.toLocaleString("pt-BR")} / {limit.toLocaleString("pt-BR")} tokens
            </h4>
            <span className={`rounded-full px-3 py-1 text-sm font-black ${overflow ? "bg-rose-100 text-rose-800" : "bg-emerald-100 text-emerald-800"}`}>
              {overflow ? `excede ${overflow.toLocaleString("pt-BR")}` : "cabe no contexto"}
            </span>
          </div>
          <div className="mt-5 flex h-16 overflow-hidden rounded-2xl bg-slate-100">
            {segments.map((segment) => (
              <div
                className={`${segment.color} grid min-w-1 place-items-center text-xs font-black text-white transition-[width]`}
                key={segment.label}
                style={{ width: `${Math.max(2, (segment.value / Math.max(total, limit)) * 100)}%` }}
                title={`${segment.label}: ${segment.value} tokens`}
              />
            ))}
          </div>
          <div className="mt-4 grid gap-2">
            {segments.map((segment) => (
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-sm font-bold" key={segment.label}>
                <span className="flex items-center gap-2 text-slate-700">
                  <span className={`size-3 rounded-full ${segment.color}`} />
                  {segment.label}
                </span>
                <span className="font-mono text-slate-950">{segment.value.toLocaleString("pt-BR")}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </InteractiveShell>
  );
}

function CostContextSimulatorInteraction() {
  const [text, setText] = useState(
    "Explique tokenização para uma pessoa que está começando a usar modelos de linguagem.",
  );
  const [outputTokens, setOutputTokens] = useState(700);
  const [inputPrice, setInputPrice] = useState(1);
  const [outputPrice, setOutputPrice] = useState(4);
  const encoders = useTokenEncoders();
  const tokens = useMemo(
    () => (encoders ? tokenize(text, "o200k_base", encoders) : []),
    [encoders, text],
  );
  const inputCost = encoders ? (tokens.length / 1_000_000) * inputPrice : 0;
  const outputCost = (outputTokens / 1_000_000) * outputPrice;
  const totalCost = inputCost + outputCost;

  return (
    <InteractiveShell
      eyebrow="Custo"
      title="Simule custo por tokens"
      tone="orange"
      description="Use preços hipotéticos por 1M tokens ou substitua pelos valores atuais do modelo que você quer analisar."
    >
      <div className="grid gap-5 lg:grid-cols-[1fr_0.95fr]">
        <div className="grid gap-4">
          <label className="grid gap-2 text-sm font-black text-slate-700">
            Entrada
            <textarea
              className="min-h-36 resize-y rounded-3xl border border-orange-200 bg-white px-4 py-3 text-base leading-7 text-slate-800 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
              value={text}
              onChange={(event) => setText(event.target.value)}
            />
          </label>
          <RangeField label="Tokens de saída estimados" value={outputTokens} min={100} max={4000} step={50} onChange={setOutputTokens} />
          <div className="grid gap-3 sm:grid-cols-2">
            <NumberField label="Preço entrada / 1M" value={inputPrice} onChange={setInputPrice} />
            <NumberField label="Preço saída / 1M" value={outputPrice} onChange={setOutputPrice} />
          </div>
        </div>
        <div className="rounded-3xl bg-white p-5">
          <StatsGrid
            stats={[
              ["Tokens entrada", encoders ? tokens.length : "..."],
              ["Tokens saída", outputTokens],
              ["Custo entrada", encoders ? formatCurrency(inputCost) : "..."],
              ["Custo saída", formatCurrency(outputCost)],
            ]}
          />
          <div className="mt-5 rounded-3xl bg-slate-950 p-6 text-white">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-orange-200">
              Estimativa total
            </p>
            <p className="mt-3 font-display text-4xl font-semibold tracking-tight">
              {encoders ? formatCurrency(totalCost) : "..."}
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              A conta é aproximada e não substitui a medição da API. Use a página de preços atual para valores reais.
            </p>
          </div>
        </div>
      </div>
    </InteractiveShell>
  );
}

function TruncationDemoInteraction() {
  const [text, setText] = useState(
    "Instrução: responda apenas com base no documento.\nDocumento: tokens são unidades de texto processadas por modelos. A janela de contexto limita quanto conteúdo pode ser considerado. Se o texto passa do limite, partes podem ser removidas.\nPergunta: por que truncamento pode causar erro?",
  );
  const [limit, setLimit] = useState(70);
  const [reservedOutput, setReservedOutput] = useState(20);
  const encoders = useTokenEncoders();
  const tokens = useMemo(
    () => (encoders ? tokenize(text, "o200k_base", encoders) : []),
    [encoders, text],
  );
  const availableInput = Math.max(0, limit - reservedOutput);
  const kept = tokens.slice(0, availableInput);
  const removed = tokens.slice(availableInput);

  return (
    <InteractiveShell
      eyebrow="Truncamento"
      title="Veja o que cabe e o que fica fora"
      tone="rose"
      description="Reserve espaço para a resposta e observe como menos tokens ficam disponíveis para a entrada."
    >
      <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="grid gap-4">
          <label className="grid gap-2 text-sm font-black text-slate-700">
            Texto de entrada
            <textarea
              className="min-h-44 resize-y rounded-3xl border border-rose-200 bg-white px-4 py-3 text-base leading-7 text-slate-800 outline-none transition focus:border-rose-500 focus:ring-4 focus:ring-rose-100"
              value={text}
              onChange={(event) => setText(event.target.value)}
            />
          </label>
          <RangeField label="Limite total" value={limit} min={30} max={180} step={5} onChange={setLimit} />
          <RangeField label="Saída reservada" value={reservedOutput} min={0} max={80} step={5} onChange={setReservedOutput} />
          <StatsGrid
            stats={[
              ["Entrada", encoders ? tokens.length : "..."],
              ["Disponível", availableInput],
              ["Removidos", encoders ? removed.length : "..."],
              ["Saída reservada", reservedOutput],
            ]}
          />
        </div>
        <div className="grid gap-4">
          <article className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5">
            <h4 className="font-display text-2xl font-semibold tracking-tight text-slate-950">
              Parte enviada
            </h4>
            <TokenPanel
              tokens={kept}
              maxVisible={36}
              compact
              emptyText={encoders ? "Nenhum token para exibir." : "Carregando tokenizador..."}
            />
          </article>
          <article className="rounded-3xl border border-rose-200 bg-rose-50 p-5">
            <h4 className="font-display text-2xl font-semibold tracking-tight text-slate-950">
              Parte cortada
            </h4>
            <TokenPanel
              tokens={removed}
              maxVisible={28}
              compact
              emptyText={encoders ? "Nada foi cortado." : "Carregando tokenizador..."}
            />
          </article>
        </div>
      </div>
    </InteractiveShell>
  );
}

function useTokenEncoders() {
  const [encoders, setEncoders] = useState<EncoderMap | null>(cachedEncoders);

  useEffect(() => {
    if (encoders) {
      return;
    }

    let isMounted = true;
    loadTokenEncoders().then((loadedEncoders) => {
      if (isMounted) {
        setEncoders(loadedEncoders);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [encoders]);

  return encoders;
}

function loadTokenEncoders() {
  if (cachedEncoders) {
    return Promise.resolve(cachedEncoders);
  }

  if (!encodersPromise) {
    encodersPromise = Promise.all([
      import("js-tiktoken/lite"),
      import("js-tiktoken/ranks/o200k_base"),
      import("js-tiktoken/ranks/cl100k_base"),
    ]).then(([{ Tiktoken }, o200kBase, cl100kBase]) => {
      cachedEncoders = {
        o200k_base: new Tiktoken(o200kBase.default),
        cl100k_base: new Tiktoken(cl100kBase.default),
      };
      return cachedEncoders;
    });
  }

  return encodersPromise;
}

function tokenize(text: string, encoding: EncodingName, encoders: EncoderMap): TokenPiece[] {
  const encoder = encoders[encoding];
  return encoder.encode(text).map((id) => ({
    id,
    text: formatTokenText(encoder.decode([id])),
  }));
}

function formatTokenText(value: string) {
  if (!value) {
    return "∅";
  }

  return value
    .replaceAll(" ", "·")
    .replaceAll("\n", "↵")
    .replaceAll("\t", "⇥");
}

function countWords(text: string) {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

function ratio(value: number, divisor: number) {
  return divisor === 0 ? "0" : (value / divisor).toFixed(2);
}

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 6,
    maximumFractionDigits: 6,
  });
}

function InteractiveShell({
  eyebrow,
  title,
  description,
  tone,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  tone: "teal" | "amber" | "indigo" | "emerald" | "blue" | "orange" | "rose";
  children: ReactNode;
}) {
  const styles = {
    teal: "border-teal-200 bg-teal-50 text-teal-700 shadow-teal-900/5",
    amber: "border-amber-200 bg-amber-50 text-amber-700 shadow-amber-900/5",
    indigo: "border-indigo-200 bg-indigo-50 text-indigo-700 shadow-indigo-900/5",
    emerald: "border-emerald-200 bg-emerald-50 text-emerald-700 shadow-emerald-900/5",
    blue: "border-blue-200 bg-blue-50 text-blue-700 shadow-blue-900/5",
    orange: "border-orange-200 bg-orange-50 text-orange-700 shadow-orange-900/5",
    rose: "border-rose-200 bg-rose-50 text-rose-700 shadow-rose-900/5",
  };

  return (
    <section className={`rounded-[2rem] border p-5 shadow-xl ${styles[tone]}`}>
      <div className="mb-5">
        <p className="text-sm font-black uppercase tracking-[0.2em]">{eyebrow}</p>
        <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-slate-950">
          {title}
        </h3>
        <p className="mt-2 max-w-3xl leading-7 text-slate-600">{description}</p>
      </div>
      {children}
    </section>
  );
}

function EncodingSelect({
  value,
  onChange,
}: {
  value: EncodingName;
  onChange: (value: EncodingName) => void;
}) {
  return (
    <label className="grid gap-2 text-sm font-black text-slate-700">
      Encoding
      <select
        className="rounded-2xl border border-teal-200 bg-white px-4 py-3 text-base font-bold text-slate-800 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
        value={value}
        onChange={(event) => onChange(event.target.value as EncodingName)}
      >
        <option value="o200k_base">o200k_base</option>
        <option value="cl100k_base">cl100k_base</option>
      </select>
    </label>
  );
}

function TokenPanel({
  tokens,
  compact = false,
  maxVisible = 48,
  emptyText = "Nenhum token para exibir.",
}: {
  tokens: TokenPiece[];
  compact?: boolean;
  maxVisible?: number;
  emptyText?: string;
}) {
  const visibleTokens = tokens.slice(0, maxVisible);
  const hiddenCount = Math.max(0, tokens.length - visibleTokens.length);

  return (
    <div className={`rounded-3xl bg-white ${compact ? "mt-4 p-4" : "p-5"}`}>
      {tokens.length === 0 ? (
        <p className="text-sm font-bold text-slate-500">{emptyText}</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {visibleTokens.map((token, index) => (
            <span
              className="inline-flex max-w-full items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-800"
              key={`${token.id}-${index}-${token.text}`}
              title={`ID ${token.id}`}
            >
              <span className="truncate">{token.text}</span>
              <span className="rounded-full bg-slate-900 px-2 py-0.5 font-mono text-[0.68rem] font-black text-white">
                {token.id}
              </span>
            </span>
          ))}
          {hiddenCount ? (
            <span className="inline-flex items-center rounded-2xl bg-slate-900 px-3 py-2 text-sm font-black text-white">
              +{hiddenCount} tokens
            </span>
          ) : null}
        </div>
      )}
    </div>
  );
}

function StatsGrid({ stats }: { stats: Array<[string, string | number]> }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {stats.map(([label, value]) => (
        <div className="rounded-2xl bg-white px-4 py-3" key={label}>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
            {label}
          </p>
          <p className="mt-1 font-display text-2xl font-semibold tracking-tight text-slate-950">
            {typeof value === "number" ? value.toLocaleString("pt-BR") : value}
          </p>
        </div>
      ))}
    </div>
  );
}

function MetricPill({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-2xl bg-emerald-50 px-3 py-2">
      <p className="text-[0.68rem] font-black uppercase tracking-[0.14em] text-emerald-700">
        {label}
      </p>
      <p className="mt-1 font-display text-2xl font-semibold text-slate-950">
        {typeof value === "number" ? value.toLocaleString("pt-BR") : value}
      </p>
    </div>
  );
}

function RangeField({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="grid gap-2 text-sm font-black text-slate-700">
      <span className="flex items-center justify-between gap-3">
        {label}
        <span className="font-mono text-slate-950">{value.toLocaleString("pt-BR")}</span>
      </span>
      <input
        className="w-full accent-slate-950"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="grid gap-2 text-sm font-black text-slate-700">
      {label}
      <input
        className="rounded-2xl border border-orange-200 bg-white px-4 py-3 text-base font-bold text-slate-800 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
        type="number"
        min="0"
        step="0.01"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}
