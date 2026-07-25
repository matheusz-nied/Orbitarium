import type { LessonModule } from "../../../types/content";
import { createStandardLessonVisuals } from "../_shared/visualFactories";

export const visuals = createStandardLessonVisuals({
  tone: "indigo",
  heroTitle: "Escalar bem é equilibrar modelo, dados e compute",
  heroSubtitle: "A eficiência surge da relação entre os eixos, não do crescimento cego de apenas um deles",
  heroSteps: ["Parâmetros", "Tokens", "Compute"],
  heroFooter: "Scaling laws transformam a pergunta de escala em uma discussão sobre alocação eficiente, não só tamanho bruto.",
  conceptTitle: "Modelo, dados e budget precisam conversar",
  conceptLeft: {
    title: "Oversizing",
    body: "Capacidade alta demais para a quantidade de dados vista naquele budget.",
  },
  conceptRight: {
    title: "Balanço",
    body: "Parâmetros e tokens mais coerentes para extrair melhor aprendizado por FLOP.",
  },
  conceptFooter: "Escalar só um eixo pode desperdiçar parte do potencial dos outros.",
  pipelineTitle: "Pipeline mental do pré-treinamento",
  pipelineSteps: ["Corpus", "Curadoria", "Tokens", "Otimização", "Modelo"],
  comparisonTitle: "Duas leituras da escala",
  comparisonLeft: {
    title: "Ênfase em parâmetros",
    body: "Destaca que modelos grandes são muito sample-efficient e podem justificar expansão agressiva.",
  },
  comparisonRight: {
    title: "Ênfase em equilíbrio",
    body: "Destaca que modelos grandes demais para pouco dado podem ficar subtreinados para o budget usado.",
  },
  tradeoffTitle: "Eficiência de escala depende do equilíbrio",
  tradeoffXAxis: "Ênfase em parâmetros",
  tradeoffYAxis: "Aproveitamento do budget",
  tradeoffPoints: [
    { label: "Oversized", x: 0.86, y: 0.34 },
    { label: "Balanceado", x: 0.58, y: 0.84 },
    { label: "Dados ruins", x: 0.52, y: 0.4 },
    { label: "Pequeno demais", x: 0.18, y: 0.3 },
  ],
  checklistTitle: "Checklist de escala",
  checklistItems: [
    "O modelo está vendo dados suficientes para seu tamanho?",
    "O budget de compute está equilibrado entre parâmetros e tokens?",
    "O corpus foi deduplicado e filtrado?",
    "A métrica de loss está sendo lida com senso crítico?",
    "O custo de inferência também entra na decisão?",
    "Escala está servindo ao objetivo do produto ou só ao marketing?",
  ],
}) satisfies LessonModule["visuals"];
