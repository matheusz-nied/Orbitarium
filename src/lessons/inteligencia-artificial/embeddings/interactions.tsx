import { useMemo, useState, type ReactNode } from "react";
import { AlertTriangle, Calculator, Network, Search, Waypoints } from "lucide-react";
import type { LessonModule } from "../../../types/content";

export const interactions = {
  "embedding-explorer": EmbeddingExplorerInteraction,
  "cosine-distance-demo": CosineDistanceDemoInteraction,
  "analogy-calculator": AnalogyCalculatorInteraction,
  "semantic-search-demo": SemanticSearchDemoInteraction,
  "bias-demo": BiasDemoInteraction,
} satisfies LessonModule["interactions"];

type Tone = "teal" | "indigo" | "violet" | "emerald" | "rose";
type Vector2 = [number, number];

interface EmbeddingPoint {
  id: string;
  label: string;
  x: number;
  y: number;
  cluster: string;
  note: string;
  color: string;
}

const embeddingPoints: EmbeddingPoint[] = [
  {
    id: "gato",
    label: "gato",
    x: 24,
    y: 73,
    cluster: "Animais",
    note: "Animal doméstico; perto de cachorro e peixe porque compartilha contextos de seres vivos.",
    color: "#10b981",
  },
  {
    id: "cachorro",
    label: "cachorro",
    x: 31,
    y: 70,
    cluster: "Animais",
    note: "Animal doméstico; vizinho de gato por similaridade semântica, não por grafia.",
    color: "#10b981",
  },
  {
    id: "peixe",
    label: "peixe",
    x: 28,
    y: 57,
    cluster: "Animais",
    note: "Ainda é animal, mas aparece em contextos diferentes de gato e cachorro.",
    color: "#10b981",
  },
  {
    id: "banana",
    label: "banana",
    x: 76,
    y: 74,
    cluster: "Alimentos",
    note: "Fruta; fica perto de maçã e abacate por contexto alimentar.",
    color: "#f59e0b",
  },
  {
    id: "maçã",
    label: "maçã",
    x: 69,
    y: 69,
    cluster: "Alimentos",
    note: "Fruta; semanticamente mais perto de banana que de foguete.",
    color: "#f59e0b",
  },
  {
    id: "abacate",
    label: "abacate",
    x: 80,
    y: 61,
    cluster: "Alimentos",
    note: "Alimento; divide região com outras frutas.",
    color: "#f59e0b",
  },
  {
    id: "brasil",
    label: "Brasil",
    x: 19,
    y: 25,
    cluster: "Lugares",
    note: "País; próximo de França e Japão por pertencer ao mesmo tipo de entidade.",
    color: "#3b82f6",
  },
  {
    id: "frança",
    label: "França",
    x: 30,
    y: 20,
    cluster: "Lugares",
    note: "País; próximo de Brasil, mas longe de frutas e animais.",
    color: "#3b82f6",
  },
  {
    id: "japão",
    label: "Japão",
    x: 24,
    y: 34,
    cluster: "Lugares",
    note: "País; compartilha a região de entidades geográficas.",
    color: "#3b82f6",
  },
  {
    id: "rei",
    label: "rei",
    x: 64,
    y: 30,
    cluster: "Monarquia",
    note: "Título de monarquia; perto de rainha e coroa.",
    color: "#8b5cf6",
  },
  {
    id: "rainha",
    label: "rainha",
    x: 70,
    y: 33,
    cluster: "Monarquia",
    note: "Título de monarquia; relação com rei aparece como direção no espaço.",
    color: "#8b5cf6",
  },
  {
    id: "coroa",
    label: "coroa",
    x: 72,
    y: 22,
    cluster: "Monarquia",
    note: "Objeto associado ao mesmo campo semântico de rei e rainha.",
    color: "#8b5cf6",
  },
];

interface AnalogyWord {
  id: string;
  label: string;
  x: number;
  y: number;
  group: string;
  color: string;
}

const analogyWords: AnalogyWord[] = [
  { id: "homem", label: "homem", x: 1, y: 1, group: "Gênero", color: "#2563eb" },
  { id: "mulher", label: "mulher", x: 1, y: 3, group: "Gênero", color: "#db2777" },
  { id: "rei", label: "rei", x: 4, y: 1, group: "Monarquia", color: "#7c3aed" },
  { id: "rainha", label: "rainha", x: 4, y: 3, group: "Monarquia", color: "#7c3aed" },
  { id: "franca", label: "França", x: 1, y: 6, group: "País/capital", color: "#0f766e" },
  { id: "paris", label: "Paris", x: 3, y: 6, group: "País/capital", color: "#0f766e" },
  { id: "brasil", label: "Brasil", x: 1, y: 8, group: "País/capital", color: "#0f766e" },
  { id: "brasilia", label: "Brasília", x: 3, y: 8, group: "País/capital", color: "#0f766e" },
  { id: "andar", label: "andar", x: 7, y: 1, group: "Verbos", color: "#ea580c" },
  { id: "andou", label: "andou", x: 7, y: 3, group: "Verbos", color: "#ea580c" },
  { id: "comer", label: "comer", x: 9, y: 1, group: "Verbos", color: "#ea580c" },
  { id: "comeu", label: "comeu", x: 9, y: 3, group: "Verbos", color: "#ea580c" },
];

interface SemanticDocument {
  id: string;
  title: string;
  body: string;
  vector: Vector2;
  theme: string;
}

const semanticDocuments: SemanticDocument[] = [
  {
    id: "nervosismo",
    title: "Técnicas para lidar com nervosismo",
    body: "Respiração, registro de pensamentos e rotinas de apoio para momentos de preocupação intensa.",
    vector: [0.95, 0.22],
    theme: "Saúde mental",
  },
  {
    id: "respiracao",
    title: "Exercícios de respiração para crises",
    body: "Estratégias corporais simples para acalmar o sistema nervoso antes de retomar uma atividade.",
    vector: [0.9, 0.08],
    theme: "Saúde mental",
  },
  {
    id: "sono",
    title: "Sono, atenção e estudo",
    body: "Como descanso, foco e memória se conectam durante a aprendizagem.",
    vector: [0.62, 0.44],
    theme: "Aprendizagem",
  },
  {
    id: "tarefas",
    title: "Organização de tarefas complexas",
    body: "Dividir projetos em etapas reduz sobrecarga e melhora a execução.",
    vector: [0.36, 0.65],
    theme: "Produtividade",
  },
  {
    id: "juros",
    title: "Guia visual de juros compostos",
    body: "Crescimento acumulado, porcentagens e comparação entre investimento e dívida.",
    vector: [-0.72, 0.8],
    theme: "Finanças",
  },
  {
    id: "corrida",
    title: "Primeiros passos na corrida",
    body: "Plano gradual de treino, aquecimento e recuperação para iniciantes.",
    vector: [0.1, -0.88],
    theme: "Esporte",
  },
  {
    id: "fermentacao",
    title: "Fermentação natural em casa",
    body: "Processo de alimentar o fermento, controlar temperatura e assar pão.",
    vector: [-0.62, -0.42],
    theme: "Culinária",
  },
];

const queryExamples = [
  "como tratar ansiedade",
  "formas de acalmar o nervosismo",
  "aprender melhor dormindo bem",
  "organizar um projeto grande",
  "calcular rendimento de investimento",
];

const stopWords = new Set([
  "a",
  "as",
  "ao",
  "aos",
  "com",
  "como",
  "da",
  "de",
  "do",
  "dos",
  "e",
  "em",
  "o",
  "os",
  "para",
  "por",
  "um",
  "uma",
]);

interface BiasTerm {
  id: string;
  label: string;
  x: number;
  y: number;
  color: string;
  note: string;
}

const biasTerms: BiasTerm[] = [
  {
    id: "programador",
    label: "programador",
    x: 7.4,
    y: -0.55,
    color: "#2563eb",
    note: "Termo de tecnologia com associação masculina no espaço simulado.",
  },
  {
    id: "programadora",
    label: "programadora",
    x: 7.7,
    y: 0.05,
    color: "#7c3aed",
    note: "Termo-alvo esperado quando removemos a direção de gênero da operação.",
  },
  {
    id: "enfermeira",
    label: "enfermeira",
    x: 6.8,
    y: 0.82,
    color: "#db2777",
    note: "Exemplo de associação estereotipada em corpora enviesados.",
  },
  {
    id: "enfermeiro",
    label: "enfermeiro",
    x: 6.4,
    y: -0.18,
    color: "#0f766e",
    note: "Mesmo campo profissional, menor deslocamento no eixo simulado.",
  },
  {
    id: "médico",
    label: "médico",
    x: 6.2,
    y: -0.48,
    color: "#2563eb",
    note: "Profissão com associação masculina no exemplo didático.",
  },
  {
    id: "médica",
    label: "médica",
    x: 6.3,
    y: 0.22,
    color: "#7c3aed",
    note: "Mesma região profissional com deslocamento mais próximo do eixo feminino.",
  },
  {
    id: "engenheira",
    label: "engenheira",
    x: 8.1,
    y: 0.18,
    color: "#7c3aed",
    note: "Profissão técnica próxima do campo de tecnologia.",
  },
  {
    id: "cientista",
    label: "cientista",
    x: 8,
    y: -0.12,
    color: "#0f766e",
    note: "Termo de carreira mais neutro, mas ainda levemente deslocado no exemplo.",
  },
  {
    id: "cuidadora",
    label: "cuidadora",
    x: 5.4,
    y: 0.9,
    color: "#db2777",
    note: "Outro termo usado para mostrar concentração no eixo de estereótipo.",
  },
];

function EmbeddingExplorerInteraction() {
  const [selectedId, setSelectedId] = useState("cachorro");
  const selectedPoint =
    embeddingPoints.find((point) => point.id === selectedId) ?? embeddingPoints[0];
  const neighbors = useMemo(
    () =>
      embeddingPoints
        .filter((point) => point.id !== selectedPoint.id)
        .map((point) => ({
          point,
          distance: distance2D([selectedPoint.x, selectedPoint.y], [point.x, point.y]),
        }))
        .sort((first, second) => first.distance - second.distance)
        .slice(0, 4),
    [selectedPoint],
  );

  return (
    <InteractiveShell
      eyebrow="Mapa semântico"
      title="Explore vizinhos no espaço de embeddings"
      tone="teal"
      icon={<Waypoints size={18} aria-hidden="true" />}
      description="Clique em uma palavra e veja quais conceitos ficam mais próximos nesse espaço 2D didático."
    >
      <div className="grid gap-5 lg:grid-cols-[0.86fr_1.14fr]">
        <div className="grid gap-4">
          <div className="rounded-3xl bg-white p-5">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-teal-700">
              Palavra selecionada
            </p>
            <h4 className="mt-2 font-display text-3xl font-semibold tracking-tight text-slate-950">
              {selectedPoint.label}
            </h4>
            <p className="mt-3 leading-7 text-slate-600">{selectedPoint.note}</p>
            <span
              className="mt-4 inline-flex rounded-full px-3 py-1 text-sm font-black text-white"
              style={{ backgroundColor: selectedPoint.color }}
            >
              {selectedPoint.cluster}
            </span>
          </div>

          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
            {neighbors.map(({ point, distance }) => (
              <button
                className="rounded-3xl border border-teal-100 bg-white p-4 text-left transition hover:border-teal-300 hover:shadow-lg hover:shadow-teal-900/10"
                key={point.id}
                type="button"
                onClick={() => setSelectedId(point.id)}
              >
                <span className="flex items-center justify-between gap-3">
                  <span className="font-black text-slate-950">{point.label}</span>
                  <span className="font-mono text-xs font-black text-teal-700">
                    d={distance.toFixed(1)}
                  </span>
                </span>
                <span className="mt-2 block text-sm font-semibold text-slate-500">
                  {point.cluster}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-teal-100 bg-white p-4">
          <EmbeddingMap selectedId={selectedPoint.id} onSelect={setSelectedId} />
          <div className="mt-4 flex flex-wrap gap-2">
            {["Animais", "Alimentos", "Lugares", "Monarquia"].map((cluster) => (
              <button
                className="rounded-full border border-slate-200 px-3 py-1 text-xs font-black text-slate-600 transition hover:border-teal-300 hover:text-teal-700"
                key={cluster}
                type="button"
                onClick={() => {
                  const firstPoint = embeddingPoints.find((point) => point.cluster === cluster);
                  if (firstPoint) {
                    setSelectedId(firstPoint.id);
                  }
                }}
              >
                {cluster}
              </button>
            ))}
          </div>
        </div>
      </div>
    </InteractiveShell>
  );
}

function CosineDistanceDemoInteraction() {
  const [angle, setAngle] = useState(18);
  const [magnitude, setMagnitude] = useState(1.65);
  const radians = (angle * Math.PI) / 180;
  const cosine = Math.cos(radians);
  const euclidean = Math.sqrt(1 + magnitude ** 2 - 2 * magnitude * cosine);
  const sameDirectionDifferentSize = angle <= 8 && Math.abs(magnitude - 1) > 0.25;

  return (
    <InteractiveShell
      eyebrow="Métrica"
      title="Cosseno mede direção; euclidiana mede distância"
      tone="indigo"
      icon={<Network size={18} aria-hidden="true" />}
      description="Ajuste o ângulo e o tamanho do vetor B para observar quando as duas métricas contam histórias diferentes."
    >
      <div className="grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="grid gap-4">
          <RangeField label="Ângulo entre os vetores" value={angle} min={0} max={180} step={1} suffix="°" onChange={setAngle} />
          <RangeField label="Magnitude do vetor B" value={magnitude} min={0.4} max={2.2} step={0.05} onChange={setMagnitude} />
          <MetricGrid
            metrics={[
              ["Cosseno", cosine.toFixed(3)],
              ["Ângulo", `${angle}°`],
              ["Euclidiana", euclidean.toFixed(3)],
              ["Magnitude B", magnitude.toFixed(2)],
            ]}
          />
          <div
            className={`rounded-3xl border p-4 ${
              sameDirectionDifferentSize
                ? "border-amber-200 bg-amber-50 text-amber-900"
                : "border-indigo-100 bg-white text-slate-600"
            }`}
          >
            <p className="text-sm font-black uppercase tracking-[0.16em]">
              Leitura
            </p>
            <p className="mt-2 leading-7">
              {sameDirectionDifferentSize
                ? "Os vetores quase apontam para a mesma direção, então o cosseno fica alto. A distância euclidiana continua relevante porque os tamanhos são diferentes."
                : "Quanto menor o ângulo, maior a similaridade de cosseno. A distância euclidiana também muda com a magnitude."}
            </p>
          </div>
        </div>

        <CosineSvg angle={angle} magnitude={magnitude} />
      </div>
    </InteractiveShell>
  );
}

function AnalogyCalculatorInteraction() {
  const [firstId, setFirstId] = useState("rei");
  const [secondId, setSecondId] = useState("homem");
  const [thirdId, setThirdId] = useState("mulher");
  const first = findAnalogyWord(firstId);
  const second = findAnalogyWord(secondId);
  const third = findAnalogyWord(thirdId);
  const result = {
    x: first.x - second.x + third.x,
    y: first.y - second.y + third.y,
  };
  const selectedIds = new Set([first.id, second.id, third.id]);
  const ranked = analogyWords
    .filter((word) => !selectedIds.has(word.id))
    .map((word) => ({
      word,
      distance: distance2D([result.x, result.y], [word.x, word.y]),
    }))
    .sort((left, right) => left.distance - right.distance)
    .slice(0, 3);
  const nearest = ranked[0];

  return (
    <InteractiveShell
      eyebrow="Álgebra"
      title="Teste analogias como deslocamentos"
      tone="violet"
      icon={<Calculator size={18} aria-hidden="true" />}
      description="Escolha A, B e C para calcular A - B + C. O ponto resultante é comparado com as palavras conhecidas."
    >
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-4">
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <WordSelect label="A" value={firstId} onChange={setFirstId} />
            <WordSelect label="B" value={secondId} onChange={setSecondId} />
            <WordSelect label="C" value={thirdId} onChange={setThirdId} />
          </div>
          <div className="rounded-3xl bg-white p-5">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-700">
              Resultado
            </p>
            <p className="mt-3 font-display text-2xl font-semibold tracking-tight text-slate-950">
              {first.label} - {second.label} + {third.label} ≈ {nearest.word.label}
            </p>
            <p className="mt-3 leading-7 text-slate-600">
              A operação remove uma direção e adiciona outra. Quando o espaço é coerente, o
              ponto calculado cai perto de uma palavra que preserva a relação.
            </p>
          </div>
          <div className="grid gap-2">
            {ranked.map(({ word, distance }, index) => (
              <div className="flex items-center justify-between gap-3 rounded-2xl bg-white px-4 py-3" key={word.id}>
                <span className="font-bold text-slate-800">
                  {index + 1}. {word.label}
                </span>
                <span className="font-mono text-xs font-black text-violet-700">
                  d={distance.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <AnalogySvg result={result} selectedIds={selectedIds} nearestId={nearest.word.id} />
      </div>
    </InteractiveShell>
  );
}

function SemanticSearchDemoInteraction() {
  const [query, setQuery] = useState(queryExamples[0]);
  const [mode, setMode] = useState<"semantic" | "lexical">("semantic");
  const queryVector = useMemo(() => inferQueryVector(query), [query]);
  const queryTerms = useMemo(() => extractTerms(query), [query]);
  const rankedDocuments = useMemo(
    () =>
      semanticDocuments
        .map((document) => {
          const documentTerms = extractTerms(`${document.title} ${document.body}`);
          const overlap = queryTerms.filter((term) => documentTerms.includes(term));
          const lexicalScore =
            queryTerms.length === 0 ? 0 : overlap.length / Math.max(1, queryTerms.length);
          const semanticScore = cosine2D(queryVector, document.vector);

          return {
            document,
            overlap,
            lexicalScore,
            semanticScore,
          };
        })
        .sort((left, right) =>
          mode === "semantic"
            ? right.semanticScore - left.semanticScore
            : right.lexicalScore - left.lexicalScore || right.semanticScore - left.semanticScore,
        ),
    [mode, queryTerms, queryVector],
  );

  return (
    <InteractiveShell
      eyebrow="Busca"
      title="Compare busca lexical e semântica"
      tone="emerald"
      icon={<Search size={18} aria-hidden="true" />}
      description="A busca lexical conta termos iguais. A semântica compara vetores de significado."
    >
      <div className="grid gap-5 lg:grid-cols-[0.84fr_1.16fr]">
        <div className="grid gap-4">
          <label className="grid gap-2 text-sm font-black text-slate-700">
            Pergunta
            <textarea
              className="min-h-28 resize-y rounded-3xl border border-emerald-200 bg-white px-4 py-3 text-base leading-7 text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          <div className="grid gap-2">
            {queryExamples.map((example) => (
              <button
                className="rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-left text-sm font-bold text-slate-700 transition hover:border-emerald-300"
                key={example}
                type="button"
                onClick={() => setQuery(example)}
              >
                {example}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <ModeButton active={mode === "semantic"} icon={<Network size={16} />} label="Semântica" onClick={() => setMode("semantic")} />
            <ModeButton active={mode === "lexical"} icon={<Search size={16} />} label="Lexical" onClick={() => setMode("lexical")} />
          </div>
        </div>

        <div className="grid gap-3">
          {rankedDocuments.map(({ document, overlap, lexicalScore, semanticScore }, index) => {
            const score = mode === "semantic" ? semanticScore : lexicalScore;
            const scoreLabel =
              mode === "semantic"
                ? `${Math.max(0, semanticScore * 100).toFixed(0)}% similar`
                : `${overlap.length} termo${overlap.length === 1 ? "" : "s"}`;
            const semanticWithoutLexical = overlap.length === 0 && semanticScore > 0.83;

            return (
              <article
                className={`rounded-3xl border bg-white p-5 transition ${
                  index === 0 ? "border-emerald-400 shadow-lg shadow-emerald-900/10" : "border-emerald-100"
                }`}
                key={document.id}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">
                      {document.theme}
                    </p>
                    <h4 className="mt-2 font-display text-2xl font-semibold tracking-tight text-slate-950">
                      {document.title}
                    </h4>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-black text-emerald-800">
                    {scoreLabel}
                  </span>
                </div>
                <p className="mt-3 leading-7 text-slate-600">{document.body}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs font-black">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">
                    score: {formatScore(score)}
                  </span>
                  {overlap.length ? (
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-800">
                      termos: {overlap.join(", ")}
                    </span>
                  ) : (
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">
                      sem termo igual
                    </span>
                  )}
                  {semanticWithoutLexical ? (
                    <span className="rounded-full bg-amber-100 px-3 py-1 text-amber-900">
                      recuperado por significado
                    </span>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </InteractiveShell>
  );
}

function BiasDemoInteraction() {
  const [mitigation, setMitigation] = useState(0);
  const strength = 1 - mitigation / 100;
  const currentTerms = biasTerms.map((term) => ({
    ...term,
    currentY: term.y * strength,
  }));
  const programmer = currentTerms.find((term) => term.id === "programador") ?? currentTerms[0];
  const result = {
    x: programmer.x,
    y: programmer.currentY - -1 * strength + 1 * strength,
  };
  const ranked = currentTerms
    .filter((term) => term.id !== "programador")
    .map((term) => ({
      term,
      distance: distance2D([result.x, result.y], [term.x, term.currentY]),
    }))
    .sort((left, right) => left.distance - right.distance)
    .slice(0, 3);
  const averageBias =
    currentTerms.reduce((sum, term) => sum + Math.abs(term.currentY), 0) / currentTerms.length;
  const nearest = ranked[0];

  return (
    <InteractiveShell
      eyebrow="Limitação"
      title="Viés aparece como direção no espaço"
      tone="rose"
      icon={<AlertTriangle size={18} aria-hidden="true" />}
      description="Esta simulação mostra como associações do corpus podem deslocar palavras neutras ao longo de um eixo social."
    >
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-4">
          <div className="rounded-3xl border border-rose-200 bg-white p-5">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-rose-700">
              Simulação didática
            </p>
            <p className="mt-3 leading-7 text-slate-600">
              Os pontos abaixo não são saída de um modelo real. Eles reproduzem a ideia
              geométrica descrita na literatura: uma associação social pode virar uma direção
              mensurável no embedding.
            </p>
          </div>
          <RangeField label="Mitigação visual do eixo de gênero" value={mitigation} min={0} max={100} step={5} suffix="%" onChange={setMitigation} />
          <MetricGrid
            metrics={[
              ["Viés médio", averageBias.toFixed(2)],
              ["Mitigação", `${mitigation}%`],
              ["Operação", "programador - homem + mulher"],
              ["Mais próximo", nearest.term.label],
            ]}
          />
          <div className="rounded-3xl bg-white p-5">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-rose-700">
              Operação enviesada
            </p>
            <p className="mt-3 font-display text-2xl font-semibold tracking-tight text-slate-950">
              programador - homem + mulher ≈ {nearest.term.label}
            </p>
            <p className="mt-3 leading-7 text-slate-600">
              Com o eixo social forte, o resultado pode cair perto de uma profissão
              estereotipada. Ao reduzir esse eixo, o ponto se aproxima de uma leitura mais
              neutra.
            </p>
          </div>
        </div>

        <BiasSvg terms={currentTerms} result={result} nearestId={nearest.term.id} strength={strength} />
      </div>
    </InteractiveShell>
  );
}

function EmbeddingMap({
  selectedId,
  onSelect,
}: {
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const selected = embeddingPoints.find((point) => point.id === selectedId) ?? embeddingPoints[0];
  const neighbors = embeddingPoints
    .filter((point) => point.id !== selected.id)
    .map((point) => ({
      point,
      distance: distance2D([selected.x, selected.y], [point.x, point.y]),
    }))
    .sort((left, right) => left.distance - right.distance)
    .slice(0, 3);

  return (
    <svg className="w-full" viewBox="0 0 660 390" role="img" aria-label="Mapa de embeddings em duas dimensões">
      <rect width="660" height="390" rx="28" fill="#f8fafc" />
      <line x1="45" y1="325" x2="610" y2="325" stroke="#cbd5e1" strokeWidth="2" />
      <line x1="45" y1="45" x2="45" y2="325" stroke="#cbd5e1" strokeWidth="2" />
      <text x="610" y="350" textAnchor="end" fill="#64748b" fontSize="13" fontWeight="800">
        eixo didático 1
      </text>
      <text x="20" y="55" fill="#64748b" fontSize="13" fontWeight="800" transform="rotate(-90 20 55)">
        eixo didático 2
      </text>

      <ClusterBubble label="Animais" x={180} y={130} width={170} height={120} color="#10b981" />
      <ClusterBubble label="Alimentos" x={460} y={120} width={170} height={125} color="#f59e0b" />
      <ClusterBubble label="Lugares" x={180} y={265} width={175} height={130} color="#3b82f6" />
      <ClusterBubble label="Monarquia" x={450} y={255} width={190} height={130} color="#8b5cf6" />

      {neighbors.map(({ point }) => (
        <line
          key={`neighbor-${point.id}`}
          x1={plotEmbeddingX(selected.x)}
          y1={plotEmbeddingY(selected.y)}
          x2={plotEmbeddingX(point.x)}
          y2={plotEmbeddingY(point.y)}
          stroke="#0f766e"
          strokeDasharray="6 6"
          strokeOpacity="0.45"
          strokeWidth="3"
        />
      ))}

      {embeddingPoints.map((point) => {
        const isSelected = point.id === selectedId;
        return (
          <g
            className="cursor-pointer"
            key={point.id}
            role="button"
            tabIndex={0}
            aria-label={`Selecionar ${point.label}`}
            onClick={() => onSelect(point.id)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                onSelect(point.id);
              }
            }}
          >
            <circle
              cx={plotEmbeddingX(point.x)}
              cy={plotEmbeddingY(point.y)}
              r={isSelected ? 21 : 15}
              fill={point.color}
              opacity={isSelected ? 0.25 : 0.14}
            />
            <circle
              cx={plotEmbeddingX(point.x)}
              cy={plotEmbeddingY(point.y)}
              r={isSelected ? 8 : 6}
              fill={point.color}
              stroke={isSelected ? "#0f172a" : "white"}
              strokeWidth={isSelected ? 3 : 2}
            />
            <text
              x={plotEmbeddingX(point.x)}
              y={plotEmbeddingY(point.y) - 20}
              textAnchor="middle"
              fill="#0f172a"
              fontSize="13"
              fontWeight="900"
            >
              {point.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function CosineSvg({ angle, magnitude }: { angle: number; magnitude: number }) {
  const radians = (angle * Math.PI) / 180;
  const origin = { x: 175, y: 245 };
  const vectorA = { x: origin.x + 112, y: origin.y };
  const vectorB = {
    x: origin.x + Math.cos(radians) * magnitude * 88,
    y: origin.y - Math.sin(radians) * magnitude * 88,
  };
  const arcEnd = {
    x: origin.x + Math.cos(radians) * 46,
    y: origin.y - Math.sin(radians) * 46,
  };

  return (
    <div className="rounded-3xl border border-indigo-100 bg-white p-4">
      <svg className="w-full" viewBox="0 0 620 360" role="img" aria-label="Vetores comparados por cosseno e distância euclidiana">
        <defs>
          <marker id="cosineArrow" markerHeight="8" markerWidth="8" orient="auto" refX="8" refY="4">
            <path d="M0,0 L8,4 L0,8" fill="#4338ca" />
          </marker>
          <marker id="cosineArrowB" markerHeight="8" markerWidth="8" orient="auto" refX="8" refY="4">
            <path d="M0,0 L8,4 L0,8" fill="#a855f7" />
          </marker>
        </defs>
        <rect width="620" height="360" rx="26" fill="#eef2ff" />
        <line x1="55" y1={origin.y} x2="565" y2={origin.y} stroke="#c7d2fe" strokeWidth="2" />
        <line x1={origin.x} y1="40" x2={origin.x} y2="315" stroke="#c7d2fe" strokeWidth="2" />
        <line
          x1={vectorA.x}
          y1={vectorA.y}
          x2={vectorB.x}
          y2={vectorB.y}
          stroke="#f97316"
          strokeDasharray="7 7"
          strokeWidth="4"
        />
        <line
          x1={origin.x}
          y1={origin.y}
          x2={vectorA.x}
          y2={vectorA.y}
          stroke="#4338ca"
          strokeLinecap="round"
          strokeWidth="6"
          markerEnd="url(#cosineArrow)"
        />
        <line
          x1={origin.x}
          y1={origin.y}
          x2={vectorB.x}
          y2={vectorB.y}
          stroke="#a855f7"
          strokeLinecap="round"
          strokeWidth="6"
          markerEnd="url(#cosineArrowB)"
        />
        <path
          d={`M ${origin.x + 46} ${origin.y} A 46 46 0 ${angle > 180 ? 1 : 0} 0 ${arcEnd.x} ${arcEnd.y}`}
          fill="none"
          stroke="#0f172a"
          strokeWidth="3"
        />
        <circle cx={origin.x} cy={origin.y} r="6" fill="#0f172a" />
        <circle cx={vectorA.x} cy={vectorA.y} r="8" fill="#4338ca" />
        <circle cx={vectorB.x} cy={vectorB.y} r="8" fill="#a855f7" />
        <text x={vectorA.x + 18} y={vectorA.y + 5} fill="#312e81" fontSize="15" fontWeight="900">
          A
        </text>
        <text x={vectorB.x + 16} y={vectorB.y - 8} fill="#7e22ce" fontSize="15" fontWeight="900">
          B
        </text>
        <text x="380" y="82" fill="#312e81" fontSize="18" fontWeight="900">
          A linha laranja é a distância euclidiana
        </text>
        <text x="380" y="112" fill="#475569" fontSize="14" fontWeight="700">
          O arco mede o ângulo usado pelo cosseno
        </text>
        <text x="380" y="285" fill="#312e81" fontSize="15" fontWeight="900">
          Vetores com mesma direção podem ter distância alta se a magnitude muda.
        </text>
      </svg>
    </div>
  );
}

function AnalogySvg({
  result,
  selectedIds,
  nearestId,
}: {
  result: { x: number; y: number };
  selectedIds: Set<string>;
  nearestId: string;
}) {
  return (
    <div className="rounded-3xl border border-violet-100 bg-white p-4">
      <svg className="w-full" viewBox="0 0 660 400" role="img" aria-label="Espaço vetorial com analogia calculada">
        <rect width="660" height="400" rx="28" fill="#faf5ff" />
        <line x1="50" y1="340" x2="610" y2="340" stroke="#ddd6fe" strokeWidth="2" />
        <line x1="50" y1="48" x2="50" y2="340" stroke="#ddd6fe" strokeWidth="2" />
        {analogyWords.map((word) => {
          const isSelected = selectedIds.has(word.id);
          const isNearest = word.id === nearestId;
          return (
            <g key={word.id}>
              <circle
                cx={plotAnalogyX(word.x)}
                cy={plotAnalogyY(word.y)}
                r={isNearest ? 20 : isSelected ? 17 : 13}
                fill={word.color}
                opacity={isNearest ? 0.28 : isSelected ? 0.22 : 0.14}
              />
              <circle
                cx={plotAnalogyX(word.x)}
                cy={plotAnalogyY(word.y)}
                r={isNearest ? 8 : 6}
                fill={word.color}
                stroke={isNearest ? "#0f172a" : "white"}
                strokeWidth={isNearest ? 3 : 2}
              />
              <text
                x={plotAnalogyX(word.x)}
                y={plotAnalogyY(word.y) - 20}
                textAnchor="middle"
                fill="#0f172a"
                fontSize="13"
                fontWeight="900"
              >
                {word.label}
              </text>
            </g>
          );
        })}
        <g>
          <circle cx={plotAnalogyX(result.x)} cy={plotAnalogyY(result.y)} r="18" fill="#f97316" opacity="0.25" />
          <path
            d={`M ${plotAnalogyX(result.x)} ${plotAnalogyY(result.y) - 13} L ${plotAnalogyX(result.x) + 4} ${plotAnalogyY(result.y) - 4} L ${plotAnalogyX(result.x) + 14} ${plotAnalogyY(result.y) - 3} L ${plotAnalogyX(result.x) + 6} ${plotAnalogyY(result.y) + 4} L ${plotAnalogyX(result.x) + 9} ${plotAnalogyY(result.y) + 14} L ${plotAnalogyX(result.x)} ${plotAnalogyY(result.y) + 8} L ${plotAnalogyX(result.x) - 9} ${plotAnalogyY(result.y) + 14} L ${plotAnalogyX(result.x) - 6} ${plotAnalogyY(result.y) + 4} L ${plotAnalogyX(result.x) - 14} ${plotAnalogyY(result.y) - 3} L ${plotAnalogyX(result.x) - 4} ${plotAnalogyY(result.y) - 4} Z`}
            fill="#f97316"
          />
          <text
            x={plotAnalogyX(result.x)}
            y={plotAnalogyY(result.y) + 34}
            textAnchor="middle"
            fill="#9a3412"
            fontSize="13"
            fontWeight="900"
          >
            resultado
          </text>
        </g>
      </svg>
    </div>
  );
}

function BiasSvg({
  terms,
  result,
  nearestId,
  strength,
}: {
  terms: Array<BiasTerm & { currentY: number }>;
  result: { x: number; y: number };
  nearestId: string;
  strength: number;
}) {
  const clampedResultY = Math.max(-1.12, Math.min(1.12, result.y));

  return (
    <div className="rounded-3xl border border-rose-100 bg-white p-4">
      <svg className="w-full" viewBox="0 0 680 420" role="img" aria-label="Visualização de viés como direção no embedding">
        <defs>
          <marker id="biasArrow" markerHeight="8" markerWidth="8" orient="auto" refX="8" refY="4">
            <path d="M0,0 L8,4 L0,8" fill="#be123c" />
          </marker>
        </defs>
        <rect width="680" height="420" rx="28" fill="#fff1f2" />
        <line x1="70" y1="215" x2="620" y2="215" stroke="#fecdd3" strokeWidth="3" />
        <line x1="110" y1="70" x2="110" y2="360" stroke="#fecdd3" strokeWidth="3" />
        <line
          x1="110"
          y1={plotBiasY(-1 * strength)}
          x2="110"
          y2={plotBiasY(1 * strength)}
          stroke="#be123c"
          strokeWidth="6"
          markerEnd="url(#biasArrow)"
          opacity="0.8"
        />
        <text x="125" y={plotBiasY(1 * strength) - 8} fill="#9f1239" fontSize="13" fontWeight="900">
          eixo social
        </text>
        <text x="600" y="392" textAnchor="end" fill="#64748b" fontSize="13" fontWeight="800">
          campo profissional →
        </text>
        <text x="42" y="110" fill="#9f1239" fontSize="13" fontWeight="800" transform="rotate(-90 42 110)">
          associação feminina ↑
        </text>
        <text x="42" y="330" fill="#1d4ed8" fontSize="13" fontWeight="800" transform="rotate(-90 42 330)">
          associação masculina ↓
        </text>

        {terms.map((term) => {
          const isNearest = term.id === nearestId;
          return (
            <g key={term.id}>
              <circle
                cx={plotBiasX(term.x)}
                cy={plotBiasY(term.currentY)}
                r={isNearest ? 20 : 14}
                fill={term.color}
                opacity={isNearest ? 0.28 : 0.16}
              />
              <circle
                cx={plotBiasX(term.x)}
                cy={plotBiasY(term.currentY)}
                r={isNearest ? 8 : 6}
                fill={term.color}
                stroke={isNearest ? "#0f172a" : "white"}
                strokeWidth={isNearest ? 3 : 2}
              />
              <text
                x={plotBiasX(term.x)}
                y={plotBiasY(term.currentY) - 19}
                textAnchor="middle"
                fill="#0f172a"
                fontSize="12"
                fontWeight="900"
              >
                {term.label}
              </text>
            </g>
          );
        })}

        <g>
          <circle cx={plotBiasX(result.x)} cy={plotBiasY(clampedResultY)} r="18" fill="#0f172a" opacity="0.16" />
          <circle cx={plotBiasX(result.x)} cy={plotBiasY(clampedResultY)} r="7" fill="#0f172a" />
          <text
            x={plotBiasX(result.x)}
            y={plotBiasY(clampedResultY) + 33}
            textAnchor="middle"
            fill="#0f172a"
            fontSize="13"
            fontWeight="900"
          >
            operação
          </text>
        </g>
      </svg>
    </div>
  );
}

function ClusterBubble({
  label,
  x,
  y,
  width,
  height,
  color,
}: {
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}) {
  return (
    <g>
      <ellipse cx={x} cy={y} rx={width / 2} ry={height / 2} fill={color} opacity="0.08" />
      <text x={x} y={y + height / 2 + 18} textAnchor="middle" fill={color} fontSize="12" fontWeight="900">
        {label}
      </text>
    </g>
  );
}

function WordSelect({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2 text-sm font-black text-slate-700">
      {label}
      <select
        className="rounded-2xl border border-violet-200 bg-white px-4 py-3 text-base font-bold text-slate-800 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {analogyWords.map((word) => (
          <option key={word.id} value={word.id}>
            {word.label} · {word.group}
          </option>
        ))}
      </select>
    </label>
  );
}

function ModeButton({
  active,
  icon,
  label,
  onClick,
}: {
  active: boolean;
  icon: ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-black transition ${
        active
          ? "border-emerald-600 bg-emerald-600 text-white shadow-lg shadow-emerald-900/15"
          : "border-emerald-100 bg-white text-slate-700 hover:border-emerald-300"
      }`}
      type="button"
      onClick={onClick}
    >
      {icon}
      {label}
    </button>
  );
}

function InteractiveShell({
  eyebrow,
  title,
  description,
  tone,
  icon,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  tone: Tone;
  icon: ReactNode;
  children: ReactNode;
}) {
  const styles: Record<Tone, string> = {
    teal: "border-teal-200 bg-teal-50 text-teal-700 shadow-teal-900/5",
    indigo: "border-indigo-200 bg-indigo-50 text-indigo-700 shadow-indigo-900/5",
    violet: "border-violet-200 bg-violet-50 text-violet-700 shadow-violet-900/5",
    emerald: "border-emerald-200 bg-emerald-50 text-emerald-700 shadow-emerald-900/5",
    rose: "border-rose-200 bg-rose-50 text-rose-700 shadow-rose-900/5",
  };

  return (
    <section className={`rounded-[2rem] border p-5 shadow-xl ${styles[tone]}`}>
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em]">
            {icon}
            {eyebrow}
          </p>
          <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-slate-950">
            {title}
          </h3>
          <p className="mt-2 max-w-3xl leading-7 text-slate-600">{description}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

function RangeField({
  label,
  value,
  min,
  max,
  step,
  suffix = "",
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix?: string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="grid gap-2 text-sm font-black text-slate-700">
      <span className="flex items-center justify-between gap-3">
        {label}
        <span className="font-mono text-slate-950">
          {Number.isInteger(value) ? value : value.toFixed(2)}
          {suffix}
        </span>
      </span>
      <input
        className="w-full accent-slate-950"
        max={max}
        min={min}
        step={step}
        type="range"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}

function MetricGrid({ metrics }: { metrics: Array<[string, string]> }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {metrics.map(([label, value]) => (
        <div className="rounded-2xl bg-white px-4 py-3" key={label}>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
            {label}
          </p>
          <p className="mt-1 font-display text-xl font-semibold tracking-tight text-slate-950">
            {value}
          </p>
        </div>
      ))}
    </div>
  );
}

function distance2D(first: Vector2, second: Vector2) {
  return Math.hypot(first[0] - second[0], first[1] - second[1]);
}

function cosine2D(first: Vector2, second: Vector2) {
  const denominator = Math.hypot(...first) * Math.hypot(...second);
  return denominator === 0 ? 0 : (first[0] * second[0] + first[1] * second[1]) / denominator;
}

function findAnalogyWord(id: string) {
  return analogyWords.find((word) => word.id === id) ?? analogyWords[0];
}

function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function extractTerms(value: string) {
  return normalizeText(value)
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((term) => term.length > 2 && !stopWords.has(term));
}

function inferQueryVector(query: string): Vector2 {
  const normalized = normalizeText(query);
  const topics: Array<{ terms: string[]; vector: Vector2 }> = [
    {
      terms: ["ansiedade", "ansioso", "nervosismo", "estresse", "acalmar", "respiracao", "crise"],
      vector: [0.94, 0.18],
    },
    {
      terms: ["sono", "dormir", "estudar", "aprendizagem", "memoria", "atencao"],
      vector: [0.62, 0.44],
    },
    {
      terms: ["organizar", "projeto", "tarefas", "etapas", "sobrecarga"],
      vector: [0.36, 0.65],
    },
    {
      terms: ["juros", "rendimento", "investimento", "porcentagem", "divida"],
      vector: [-0.72, 0.8],
    },
    {
      terms: ["corrida", "treino", "aquecimento", "recuperacao"],
      vector: [0.1, -0.88],
    },
    {
      terms: ["fermentacao", "pao", "receita", "assar", "cozinha"],
      vector: [-0.62, -0.42],
    },
  ];
  const matched = topics.filter((topic) => topic.terms.some((term) => normalized.includes(term)));

  if (matched.length === 0) {
    return [0.25, 0.25];
  }

  const sum = matched.reduce<Vector2>(
    (accumulator, topic) => [
      accumulator[0] + topic.vector[0],
      accumulator[1] + topic.vector[1],
    ],
    [0, 0],
  );

  return [sum[0] / matched.length, sum[1] / matched.length];
}

function formatScore(value: number) {
  return Math.max(0, value).toFixed(2);
}

function plotEmbeddingX(x: number) {
  return 45 + (x / 100) * 565;
}

function plotEmbeddingY(y: number) {
  return 325 - (y / 100) * 280;
}

function plotAnalogyX(x: number) {
  return 50 + ((x + 0.5) / 10) * 560;
}

function plotAnalogyY(y: number) {
  return 340 - ((y + 0.5) / 9) * 290;
}

function plotBiasX(x: number) {
  return 80 + (x / 10) * 540;
}

function plotBiasY(y: number) {
  return 215 - y * 120;
}
