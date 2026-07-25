import type { LessonModule } from "../../../types/content";
import { createStandardLessonVisuals } from "../_shared/visualFactories";

export const visuals = createStandardLessonVisuals({
  tone: "rose",
  heroTitle: "Avaliar LLMs é medir comportamento, não só admiração",
  heroSubtitle: "Objetivo, dados e critério explícito transformam impressões em comparação útil",
  heroSteps: ["Definir", "Medir", "Comparar"],
  heroFooter:
    "Sem baseline e slices relevantes, mudanças de modelo, prompt ou pipeline ficam muito mais arriscadas.",
  conceptTitle: "Duas ilusões comuns sobre qualidade",
  conceptLeft: {
    title: "Demo bonita",
    body: "Mostra capacidade em alguns exemplos, mas não garante consistência nem revela regressões silenciosas.",
  },
  conceptRight: {
    title: "Eval estruturado",
    body: "Define objetivo, dados e critério para comparar versões com mais memória e menos improviso subjetivo.",
  },
  conceptFooter:
    "Em sistemas generativos, qualidade sustentável depende de processo de avaliação, não só de impressão humana momentânea.",
  pipelineTitle: "Fluxo mental de um eval",
  pipelineSteps: ["Objetivo", "Dataset", "Critério", "Métrica", "Comparação"],
  comparisonTitle: "Três formas de julgar respostas",
  comparisonLeft: {
    title: "Automático",
    body: "Escala muito bem em critérios objetivos, mas captura pouco da nuance aberta de linguagem e utilidade contextual.",
  },
  comparisonRight: {
    title: "Humano / juiz-modelo",
    body: "Captura mais nuance, porém exige rubrica, calibração e cuidado com custo, viés e consistência.",
  },
  tradeoffTitle: "Mais escala raramente vem sem perda de nuance",
  tradeoffXAxis: "Escalabilidade da avaliação",
  tradeoffYAxis: "Nuance capturada no julgamento",
  tradeoffPoints: [
    { label: "Exact match", x: 0.9, y: 0.2 },
    { label: "LLM-judge", x: 0.66, y: 0.62 },
    { label: "Humano", x: 0.24, y: 0.9 },
    { label: "Rubrica híbrida", x: 0.52, y: 0.76 },
  ],
  checklistTitle: "Checklist de um eval útil",
  checklistItems: [
    "O objetivo de produto foi definido antes da métrica?",
    "O dataset representa casos reais e difíceis?",
    "Existem slices para cenários críticos?",
    "O critério de julgamento está explícito?",
    "Há baseline para comparar mudanças?",
    "O método escolhido mede o que realmente importa?",
  ],
}) satisfies LessonModule["visuals"];
