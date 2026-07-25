import { useMemo, useState } from "react";
import { BarChart3, Compass, GitBranch, Lightbulb, ShieldAlert } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import {
  InteractiveShell,
  MetricCard,
} from "../../../components/lesson/InteractionPrimitives";

export const interactions = {
  "rules-vs-data-classifier": RulesVsDataClassifierInteraction,
  "feature-space-sketch": FeatureSpaceSketchInteraction,
  "when-ml-helps-or-fails": WhenMlHelpsOrFailsInteraction,
} satisfies LessonModule["interactions"];

const classifierExamples = [
  {
    id: "cupom",
    title: "Cupom relâmpago",
    preview: "Ganhe desconto agora!!! Clique no link e ative o cupom.",
    links: 2,
    exclamations: 3,
    unknownSender: true,
    hasUrgency: true,
    trueLabel: "spam",
  },
  {
    id: "boleto",
    title: "Boleto do fornecedor",
    preview: "Segue o boleto de julho. Qualquer dúvida, responda este e-mail.",
    links: 0,
    exclamations: 0,
    unknownSender: false,
    hasUrgency: false,
    trueLabel: "legitimo",
  },
  {
    id: "newsletter",
    title: "Newsletter elegante",
    preview: "Conheça nosso guia gratuito de produtividade. Link no rodapé.",
    links: 1,
    exclamations: 0,
    unknownSender: true,
    hasUrgency: false,
    trueLabel: "spam",
  },
  {
    id: "ti",
    title: "Aviso do time de TI",
    preview: "Atualize sua senha hoje para manter o acesso ao portal interno.",
    links: 1,
    exclamations: 0,
    unknownSender: false,
    hasUrgency: true,
    trueLabel: "legitimo",
  },
] as const;

type ClassifierExampleId = (typeof classifierExamples)[number]["id"];

function RulesVsDataClassifierInteraction() {
  const [selectedId, setSelectedId] = useState<ClassifierExampleId>(classifierExamples[0].id);
  const selected = classifierExamples.find((example) => example.id === selectedId) ?? classifierExamples[0];

  const manualRuleDecision =
    selected.hasUrgency && selected.links >= 1
      ? "spam"
      : selected.exclamations >= 2 || (selected.unknownSender && selected.links >= 2)
        ? "spam"
        : "legitimo";

  const priorSpamRate = 0.42;
  const statisticalDecision = priorSpamRate > 0.5 ? "spam" : "legitimo";

  const learnedScore = useMemo(() => {
    let score = 0.12;
    score += selected.links * 0.22;
    score += selected.exclamations * 0.09;
    if (selected.unknownSender) score += 0.18;
    if (selected.hasUrgency) score += 0.16;
    return Math.max(0, Math.min(0.98, score));
  }, [selected]);

  const learnedDecision = learnedScore >= 0.5 ? "spam" : "legitimo";

  return (
    <InteractiveShell
      eyebrow="Comparação"
      title="Regras, estatística simples e aprendizado por dados"
      tone="indigo"
      icon={<GitBranch size={18} aria-hidden="true" />}
      description="Selecione uma mensagem e compare três abordagens: regra escrita à mão, frequência média da base e modelo treinado em exemplos."
    >
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-4">
          <div className="rounded-3xl bg-white p-4">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-indigo-700">
              Exemplo
            </p>
            <div className="mt-3 grid gap-2">
              {classifierExamples.map((example) => (
                <button
                  className={`rounded-2xl px-4 py-3 text-left text-sm font-black transition ${
                    selectedId === example.id
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-50 text-slate-700 hover:bg-indigo-50"
                  }`}
                  key={example.id}
                  type="button"
                  onClick={() => setSelectedId(example.id)}
                >
                  <span className="block">{example.title}</span>
                  <span className={`mt-1 block text-xs ${selectedId === example.id ? "text-indigo-100" : "text-slate-500"}`}>
                    {example.preview}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard label="Links" value={String(selected.links)} />
            <MetricCard label="Exclamações" value={String(selected.exclamations)} />
            <MetricCard label="Remetente" value={selected.unknownSender ? "Desconhecido" : "Conhecido"} />
            <MetricCard label="Rótulo real" value={selected.trueLabel === "spam" ? "Spam" : "Legítimo"} />
          </div>
        </div>

        <div className="grid gap-4">
          <ClassifierCard
            title="Sistema por regras"
            tone="indigo"
            result={manualRuleDecision}
            detail="Se eu consegui escrever a lógica manualmente, o sistema decide sem precisar aprender."
            bullets={[
              "Forte quando as exceções são poucas e a lógica é clara.",
              "Frágil quando a linguagem muda ou quando surgem casos ambíguos.",
              `Aqui, a regra olhou urgência=${selected.hasUrgency ? "sim" : "não"} e links=${selected.links}.`,
            ]}
          />
          <ClassifierCard
            title="Estatística agregada"
            tone="amber"
            result={statisticalDecision}
            detail="Uma média da base pode dizer qual classe é mais comum, mas ainda não distingue cada caso individual."
            bullets={[
              `Na base, ${Math.round((1 - priorSpamRate) * 100)}% das mensagens eram legítimas.`,
              "Sem olhar os atributos do exemplo, a melhor aposta é a classe majoritária.",
              "Descrever frequência é útil, mas ainda não é aprender uma regra de decisão.",
            ]}
          />
          <ClassifierCard
            title="Aprendizado por dados"
            tone="emerald"
            result={learnedDecision}
            detail="O modelo combina vários sinais fracos para estimar a probabilidade da classe."
            bullets={[
              `Probabilidade estimada de spam: ${(learnedScore * 100).toFixed(0)}%.`,
              "Nenhuma feature sozinha precisa ser perfeita; a combinação é que importa.",
              "Se a distribuição dos dados mudar, o modelo também precisará ser revisado.",
            ]}
          />
        </div>
      </div>
    </InteractiveShell>
  );
}

const featureSpaces = {
  frutas: {
    xLabel: "Doçura",
    yLabel: "Crocância",
    classes: {
      maca: "#4f46e5",
      laranja: "#f97316",
    },
    points: [
      { x: 62, y: 74, label: "maca" },
      { x: 58, y: 68, label: "maca" },
      { x: 66, y: 78, label: "maca" },
      { x: 84, y: 41, label: "laranja" },
      { x: 80, y: 45, label: "laranja" },
      { x: 76, y: 38, label: "laranja" },
    ],
    queries: [
      { id: "q1", name: "Amostra A", x: 64, y: 70, predicted: "maca" },
      { id: "q2", name: "Amostra B", x: 79, y: 43, predicted: "laranja" },
      { id: "q3", name: "Amostra C", x: 70, y: 58, predicted: "fronteira" },
    ],
    description:
      "O objeto real é uma fruta. O algoritmo não vê 'casca' nem 'cheiro': ele vê medições como doçura e crocância.",
  },
  casas: {
    xLabel: "Área",
    yLabel: "Distância do centro",
    classes: {
      alto: "#0f766e",
      medio: "#f59e0b",
    },
    points: [
      { x: 78, y: 22, label: "alto" },
      { x: 82, y: 28, label: "alto" },
      { x: 74, y: 18, label: "alto" },
      { x: 42, y: 61, label: "medio" },
      { x: 48, y: 54, label: "medio" },
      { x: 38, y: 66, label: "medio" },
    ],
    queries: [
      { id: "q1", name: "Imóvel A", x: 76, y: 24, predicted: "alto" },
      { id: "q2", name: "Imóvel B", x: 44, y: 58, predicted: "medio" },
      { id: "q3", name: "Imóvel C", x: 60, y: 42, predicted: "fronteira" },
    ],
    description:
      "Em problemas reais, features são medições observáveis. A previsão emerge da geometria desse espaço, não de um texto explicativo humano.",
  },
  mensagens: {
    xLabel: "Comprimento do texto",
    yLabel: "Quantidade de links",
    classes: {
      spam: "#dc2626",
      legitima: "#2563eb",
    },
    points: [
      { x: 30, y: 75, label: "spam" },
      { x: 35, y: 70, label: "spam" },
      { x: 24, y: 82, label: "spam" },
      { x: 70, y: 18, label: "legitima" },
      { x: 76, y: 25, label: "legitima" },
      { x: 66, y: 14, label: "legitima" },
    ],
    queries: [
      { id: "q1", name: "Mensagem A", x: 32, y: 73, predicted: "spam" },
      { id: "q2", name: "Mensagem B", x: 72, y: 20, predicted: "legitima" },
      { id: "q3", name: "Mensagem C", x: 49, y: 48, predicted: "fronteira" },
    ],
    description:
      "Aqui, o significado semântico foi reduzido a medidas simples. Mesmo assim, elas já podem separar padrões úteis.",
  },
} as const;

type FeatureSpaceKey = keyof typeof featureSpaces;

function FeatureSpaceSketchInteraction() {
  const [spaceKey, setSpaceKey] = useState<FeatureSpaceKey>("frutas");
  const [queryId, setQueryId] = useState("q1");
  const space = featureSpaces[spaceKey];
  const query = space.queries.find((item) => item.id === queryId) ?? space.queries[0];

  return (
    <InteractiveShell
      eyebrow="Representação"
      title="Desenhe mentalmente o espaço de features"
      tone="violet"
      icon={<Compass size={18} aria-hidden="true" />}
      description="Troque o problema e veja como objetos do mundo viram pontos em um plano de duas features."
    >
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="grid gap-4">
          <div className="rounded-3xl bg-white p-4">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-700">
              Problema
            </p>
            <div className="mt-3 grid gap-2">
              {(Object.keys(featureSpaces) as FeatureSpaceKey[]).map((key) => (
                <button
                  className={`rounded-2xl px-4 py-3 text-left text-sm font-black transition ${
                    key === spaceKey
                      ? "bg-violet-600 text-white"
                      : "bg-slate-50 text-slate-700 hover:bg-violet-50"
                  }`}
                  key={key}
                  type="button"
                  onClick={() => {
                    setSpaceKey(key);
                    setQueryId(featureSpaces[key].queries[0].id);
                  }}
                >
                  {key === "frutas" ? "Frutas" : key === "casas" ? "Preços de casas" : "Mensagens"}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-4">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-700">
              Amostra nova
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {space.queries.map((item) => (
                <button
                  className={`rounded-full px-4 py-2 text-sm font-black transition ${
                    item.id === query.id
                      ? "bg-violet-600 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-violet-50"
                  }`}
                  key={item.id}
                  type="button"
                  onClick={() => setQueryId(item.id)}
                >
                  {item.name}
                </button>
              ))}
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <MetricCard label={space.xLabel} value={String(query.x)} />
              <MetricCard label={space.yLabel} value={String(query.y)} />
            </div>
          </div>

          <div className="rounded-3xl border border-violet-200 bg-violet-50 p-4">
            <p className="text-sm leading-6 text-slate-700">
              {space.description}
            </p>
            <p className="mt-3 text-sm font-black text-violet-700">
              Leitura da amostra:{" "}
              {query.predicted === "fronteira"
                ? "ela cai perto da fronteira: talvez precisemos de mais features ou aceitar incerteza."
                : `ela fica mais próxima da região "${query.predicted}".`}
            </p>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-5">
          <svg className="w-full" viewBox="0 0 480 360" role="img" aria-label="Espaço de features">
            <rect width="480" height="360" rx="24" fill="#faf5ff" />
            <line x1="70" y1="300" x2="430" y2="300" stroke="#475569" strokeWidth="3" />
            <line x1="70" y1="300" x2="70" y2="60" stroke="#475569" strokeWidth="3" />
            {Array.from({ length: 5 }).map((_, index) => (
              <g key={index}>
                <line x1={70} y1={260 - index * 45} x2={430} y2={260 - index * 45} stroke="#e9d5ff" />
                <line x1={110 + index * 60} y1={300} x2={110 + index * 60} y2={60} stroke="#e9d5ff" />
              </g>
            ))}
            {space.points.map((point, index) => {
              const color = space.classes[point.label as keyof typeof space.classes];
              return (
                <circle
                  key={`${point.label}-${index}`}
                  cx={70 + point.x * 3.3}
                  cy={300 - point.y * 2.3}
                  r="10"
                  fill={color}
                  opacity="0.88"
                />
              );
            })}
            <g>
              <path
                d={`M ${70 + query.x * 3.3} ${300 - query.y * 2.3 - 14} l 8 16 h -16 z`}
                fill="#0f172a"
              />
              <circle
                cx={70 + query.x * 3.3}
                cy={300 - query.y * 2.3}
                r="14"
                fill="none"
                stroke="#0f172a"
                strokeDasharray="4 4"
                strokeWidth="3"
              />
            </g>
            <text x="250" y="338" textAnchor="middle" fill="#6d28d9" fontSize="14" fontWeight="800">
              {space.xLabel}
            </text>
            <text x="24" y="190" fill="#6d28d9" fontSize="14" fontWeight="800" transform="rotate(-90 24 190)">
              {space.yLabel}
            </text>
          </svg>
        </div>
      </div>
    </InteractiveShell>
  );
}

function WhenMlHelpsOrFailsInteraction() {
  const [manyExamples, setManyExamples] = useState(true);
  const [stablePattern, setStablePattern] = useState(true);
  const [clearFeedback, setClearFeedback] = useState(true);
  const [rulesAlreadyEnough, setRulesAlreadyEnough] = useState(false);
  const [highCostErrors, setHighCostErrors] = useState(false);

  const positiveSignals = [manyExamples, stablePattern, clearFeedback].filter(Boolean).length;
  const cautionSignals = [rulesAlreadyEnough, highCostErrors].filter(Boolean).length;
  const score = positiveSignals - cautionSignals;

  const verdict =
    score >= 2 ? "bom-candidato" : score >= 1 ? "talvez" : "melhor-nao";

  return (
    <InteractiveShell
      eyebrow="Decisão"
      title="Quando ML ajuda — e quando atrapalha"
      tone="amber"
      icon={<ShieldAlert size={18} aria-hidden="true" />}
      description="Ajuste os sinais do problema. Machine learning brilha quando há padrões aprendíveis, dados suficientes e uma métrica clara de sucesso."
    >
      <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="grid gap-3">
          <ToggleCard
            title="Há muitos exemplos representativos?"
            body="Modelos aprendem melhor quando os dados cobrem a variedade real do problema."
            enabled={manyExamples}
            onToggle={() => setManyExamples((value) => !value)}
          />
          <ToggleCard
            title="O padrão é relativamente estável?"
            body="Se o ambiente muda toda semana, o que foi aprendido envelhece rapidamente."
            enabled={stablePattern}
            onToggle={() => setStablePattern((value) => !value)}
          />
          <ToggleCard
            title="Existe feedback claro?"
            body="Rótulos, metas ou recompensas ajudam a corrigir o modelo de forma objetiva."
            enabled={clearFeedback}
            onToggle={() => setClearFeedback((value) => !value)}
          />
          <ToggleCard
            title="Regras simples já resolvem bem?"
            body="Se um if bem definido basta, ML pode adicionar custo sem trazer ganho real."
            enabled={rulesAlreadyEnough}
            onToggle={() => setRulesAlreadyEnough((value) => !value)}
          />
          <ToggleCard
            title="Erros são muito caros ou difíceis de explicar?"
            body="Em contextos sensíveis, talvez seja preciso combinar ML com regras, revisão humana e auditoria."
            enabled={highCostErrors}
            onToggle={() => setHighCostErrors((value) => !value)}
          />
        </div>

        <div className="grid gap-4">
          <div className="grid gap-3 sm:grid-cols-3">
            <MetricCard label="Sinais favoráveis" value={String(positiveSignals)} />
            <MetricCard label="Sinais de cautela" value={String(cautionSignals)} />
            <MetricCard
              label="Veredito"
              value={
                verdict === "bom-candidato"
                  ? "ML faz sentido"
                  : verdict === "talvez"
                    ? "Exija piloto"
                    : "Prefira outra abordagem"
              }
            />
          </div>

          <div
            className={`rounded-3xl border p-5 ${
              verdict === "bom-candidato"
                ? "border-emerald-200 bg-emerald-50"
                : verdict === "talvez"
                  ? "border-amber-200 bg-amber-50"
                  : "border-rose-200 bg-rose-50"
            }`}
          >
            <div className="flex items-start gap-3">
              <span className="grid size-11 place-items-center rounded-2xl bg-white text-slate-900">
                <Lightbulb size={18} aria-hidden="true" />
              </span>
              <div>
                <h4 className="font-display text-2xl font-semibold tracking-tight text-slate-950">
                  {verdict === "bom-candidato" && "Ótimo caso para ML"}
                  {verdict === "talvez" && "Use ML com hipótese clara"}
                  {verdict === "melhor-nao" && "Talvez ML não seja o melhor primeiro passo"}
                </h4>
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  {verdict === "bom-candidato" &&
                    "Os sinais centrais estão presentes: dados, estabilidade e feedback. Agora o desafio vira representar bem as features e medir generalização."}
                  {verdict === "talvez" &&
                    "Existe potencial, mas a incerteza ainda é grande. Comece com linha de base simples, validação robusta e uma versão piloto antes de automatizar demais."}
                  {verdict === "melhor-nao" &&
                    "Sem dados confiáveis, sem métrica ou com regras suficientes, ML pode virar um sistema caro, opaco e pouco melhor do que uma heurística bem desenhada."}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-5">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-700">
              Lembrete prático
            </p>
            <div className="mt-3 grid gap-3 text-sm leading-6 text-slate-700">
              <p>ML é excelente quando a regra exata é difícil de escrever, mas o padrão pode ser aprendido com exemplos.</p>
              <p>Ele fracassa quando o dado não representa o mundo real, quando a métrica é mal definida ou quando a organização espera uma certeza que o problema não oferece.</p>
            </div>
          </div>
        </div>
      </div>
    </InteractiveShell>
  );
}

function ClassifierCard({
  title,
  tone,
  result,
  detail,
  bullets,
}: {
  title: string;
  tone: "indigo" | "amber" | "emerald";
  result: "spam" | "legitimo";
  detail: string;
  bullets: string[];
}) {
  const toneClasses = {
    indigo: "border-indigo-200 bg-indigo-50 text-indigo-700",
    amber: "border-amber-200 bg-amber-50 text-amber-700",
    emerald: "border-emerald-200 bg-emerald-50 text-emerald-700",
  } as const;

  return (
    <article className={`rounded-3xl border p-4 ${toneClasses[tone]}`}>
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em]">{title}</p>
          <p className="mt-2 text-sm leading-6 text-slate-700">{detail}</p>
        </div>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-slate-900">
          {result === "spam" ? "Spam" : "Legítimo"}
        </span>
      </div>
      <ul className="mt-4 grid gap-2 text-sm leading-6 text-slate-700">
        {bullets.map((bullet) => (
          <li className="flex gap-2" key={bullet}>
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-current opacity-70" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function ToggleCard({
  title,
  body,
  enabled,
  onToggle,
}: {
  title: string;
  body: string;
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      className={`rounded-3xl border p-4 text-left transition ${
        enabled
          ? "border-amber-300 bg-white shadow-lg shadow-amber-900/5"
          : "border-slate-200 bg-slate-50 hover:border-amber-200"
      }`}
      type="button"
      onClick={onToggle}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="font-display text-xl font-semibold tracking-tight text-slate-950">
            {title}
          </h4>
          <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.14em] ${
            enabled ? "bg-amber-500 text-white" : "bg-slate-200 text-slate-600"
          }`}
        >
          {enabled ? "sim" : "não"}
        </span>
      </div>
    </button>
  );
}
