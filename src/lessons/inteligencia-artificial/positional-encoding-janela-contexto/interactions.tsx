import { Compass, Ruler, Waves } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import {
  createScenarioExplorer,
  createSliderPlayground,
} from "../_shared/interactionFactories";

const positionWaveLab = createSliderPlayground({
  eyebrow: "Ondas posicionais",
  title: "Explore posição e frequência",
  description:
    "Ajuste a posição, a frequência observada e o comprimento da sequência para sentir a diferença entre variações rápidas e lentas.",
  tone: "amber",
  icon: <Waves size={18} aria-hidden="true" />,
  initialState: {
    position: 24,
    frequency: 6,
    length: 128,
  },
  controls: [
    { key: "position", label: "posição observada", min: 0, max: 256, step: 1 },
    { key: "frequency", label: "escala/frequência", min: 1, max: 12, step: 1 },
    { key: "length", label: "comprimento da sequência", min: 32, max: 512, step: 32 },
  ],
  compute: ({ position, frequency, length }) => {
    const localSensitivity = Math.min(1, frequency / 12);
    const globalSpan = Math.max(0, 1 - frequency / 14);
    const normalizedPos = Math.min(1, position / Math.max(1, length));

    return {
      metrics: [
        { label: "posição relativa", value: `${(normalizedPos * 100).toFixed(0)}%` },
        { label: "sensibilidade local", value: `${(localSensitivity * 100).toFixed(0)}%` },
        { label: "alcance global", value: `${(globalSpan * 100).toFixed(0)}%` },
        { label: "sequência", value: `${length} tokens` },
      ],
      bars: [
        { label: "Distinguir vizinhos", value: localSensitivity, display: `${(localSensitivity * 100).toFixed(0)}%` },
        { label: "Distinguir regiões distantes", value: globalSpan, display: `${(globalSpan * 100).toFixed(0)}%` },
        { label: "Posição dentro da sequência", value: normalizedPos, display: `${(normalizedPos * 100).toFixed(0)}%` },
      ],
      narrative:
        frequency >= 9
          ? "Frequências mais altas oscilam rápido e ajudam a separar posições vizinhas com precisão, mas carregam menos noção ampla de distância."
          : frequency <= 3
            ? "Frequências mais baixas mudam devagar. Elas são úteis para distinguir regiões mais afastadas da sequência, não tanto microdiferenças entre vizinhos."
            : "A combinação de frequências é o segredo: algumas dimensões percebem vizinhança fina, outras preservam noção de distância em escala maior.",
      footer:
        "O positional encoding senoidal funciona como uma mistura de relógios com ritmos diferentes observando a mesma posição.",
    };
  },
});

const contextBudgetLab = createSliderPlayground({
  eyebrow: "Orçamento de contexto",
  title: "Distribua o espaço entre instruções, histórico e resposta",
  description:
    "Ajuste o consumo de tokens para ver como o orçamento da janela é disputado por diferentes partes da chamada.",
  tone: "teal",
  icon: <Ruler size={18} aria-hidden="true" />,
  initialState: {
    system: 400,
    history: 1200,
    retrieval: 1800,
    output: 600,
  },
  controls: [
    { key: "system", label: "instruções e setup", min: 0, max: 2000, step: 100 },
    { key: "history", label: "histórico da conversa", min: 0, max: 4000, step: 100 },
    { key: "retrieval", label: "documentos recuperados", min: 0, max: 6000, step: 100 },
    { key: "output", label: "reserva para resposta", min: 100, max: 4000, step: 100 },
  ],
  compute: ({ system, history, retrieval, output }) => {
    const total = system + history + retrieval + output;
    const budget = 8192;
    const usage = Math.min(1, total / budget);
    const retrievalShare = Math.min(1, retrieval / Math.max(1, total));
    const outputShare = Math.min(1, output / Math.max(1, total));

    return {
      metrics: [
        { label: "total usado", value: total.toLocaleString() },
        { label: "janela hipotética", value: budget.toLocaleString() },
        { label: "ocupação", value: `${(usage * 100).toFixed(0)}%` },
        { label: "estado", value: total > budget ? "estourado" : usage > 0.8 ? "apertado" : "folgado" },
      ],
      bars: [
        { label: "Uso total da janela", value: usage, display: `${(usage * 100).toFixed(0)}%` },
        { label: "Fatia de recuperação", value: retrievalShare, display: `${(retrievalShare * 100).toFixed(0)}%` },
        { label: "Fatia reservada à saída", value: outputShare, display: `${(outputShare * 100).toFixed(0)}%` },
      ],
      narrative:
        total > budget
          ? "O orçamento estourou. Algo precisa ser resumido, truncado ou removido antes da chamada funcionar."
          : retrieval > history + system
            ? "Os documentos estão consumindo boa parte da janela. Isso pode ser ótimo se forem altamente relevantes, ou desastroso se vierem redundantes."
            : "O contexto está dentro do limite, mas o ponto importante é outro: ainda vale perguntar se cada token que entrou realmente merece ocupar esse espaço.",
      footer:
        "Janelas maiores ajudam, mas continuam sendo orçamentos finitos. Projetar o contexto continua sendo uma tarefa de curadoria.",
    };
  },
});

const lengthScenarios = createScenarioExplorer({
  eyebrow: "Comparação",
  title: "Como diferentes mecanismos tratam posição e comprimento",
  description:
    "Selecione um mecanismo para comparar intuição, extrapolação e comportamento esperado.",
  tone: "indigo",
  icon: <Compass size={18} aria-hidden="true" />,
  scenarios: [
    {
      id: "absolute",
      label: "Absoluto clássico",
      title: "Cada posição recebe um vetor próprio",
      description:
        "A posição é tratada diretamente como índice explícito, o que é simples, mas nem sempre ideal para extrapolar comprimentos maiores.",
      bullets: [
        "Clareza conceitual alta.",
        "Menos natural para raciocinar sobre distância relativa.",
        "Extrapolação pode ser mais limitada dependendo do esquema.",
      ],
      metrics: [
        { label: "simplicidade", value: "alta" },
        { label: "foco em distância", value: "médio" },
      ],
      bars: [
        { label: "Extrapolação", value: 0.34, display: "34%" },
        { label: "Noção de ordem direta", value: 0.82, display: "82%" },
      ],
    },
    {
      id: "rope",
      label: "RoPE",
      title: "Posição embutida por rotação",
      description:
        "A informação posicional afeta diretamente as relações entre queries e keys, tornando a distância mais orgânica ao cálculo da atenção.",
      bullets: [
        "Muito popular em LLMs recentes.",
        "Boa intuição de relação relativa entre posições.",
        "Continua exigindo cuidado em extrapolações extremas.",
      ],
      metrics: [
        { label: "uso atual", value: "muito alto" },
        { label: "foco em distância", value: "alto" },
      ],
      bars: [
        { label: "Extrapolação", value: 0.72, display: "72%" },
        { label: "Noção de ordem direta", value: 0.76, display: "76%" },
      ],
    },
    {
      id: "alibi",
      label: "ALiBi",
      title: "Viés linear por distância",
      description:
        "Em vez de rotacionar vetores, adiciona um viés nos scores de atenção que favorece certos padrões de proximidade.",
      bullets: [
        "Elegante para extrapolação de comprimento.",
        "Enfatiza efeito da distância no score.",
        "Exemplo claro de solução relativa leve.",
      ],
      metrics: [
        { label: "simplicidade", value: "alta" },
        { label: "extrapolação", value: "boa" },
      ],
      bars: [
        { label: "Extrapolação", value: 0.78, display: "78%" },
        { label: "Noção de ordem direta", value: 0.62, display: "62%" },
      ],
    },
  ],
});

export const interactions = {
  "position-wave-lab": positionWaveLab,
  "context-budget-lab": contextBudgetLab,
  "length-scenarios": lengthScenarios,
} satisfies LessonModule["interactions"];
