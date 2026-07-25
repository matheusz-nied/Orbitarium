import type { LessonModule } from "../../../types/content";
import { createStandardLessonVisuals } from "../_shared/visualFactories";

const standardVisuals = createStandardLessonVisuals({
  "tone": "amber",
  "heroTitle": "Prever o futuro exige respeitar o passado",
  "heroSubtitle": "Em forecasting, direção temporal e validação são parte do modelo.",
  "heroSteps": [
    "Passado",
    "Features",
    "Horizonte"
  ],
  "heroFooter": "Bom score sem disciplina temporal costuma ser ilusão metodológica.",
  "conceptTitle": "Componentes de uma série",
  "conceptLeft": {
    "title": "Estrutura",
    "body": "Tendência, sazonalidade e eventos organizam parte importante do comportamento temporal."
  },
  "conceptRight": {
    "title": "Resíduo",
    "body": "Ruído e choques lembram que previsão nunca é pura extrapolação linear sem incerteza."
  },
  "conceptFooter": "Ler a série antes de modelar evita muita engenharia vazia.",
  "pipelineTitle": "Pipeline honesto de forecasting",
  "pipelineSteps": [
    "Treino no passado",
    "Features causais",
    "Validação temporal",
    "Backtesting",
    "Deploy"
  ],
  "comparisonTitle": "Split aleatório x split temporal",
  "comparisonLeft": {
    "title": "Aleatório",
    "body": "Pode misturar futuro no treino e inflar performance de forma irrealista."
  },
  "comparisonRight": {
    "title": "Temporal",
    "body": "Respeita a seta do tempo e aproxima melhor o uso real de previsão."
  },
  "tradeoffTitle": "Horizonte x dificuldade de previsão",
  "tradeoffXAxis": "Horizonte mais longo",
  "tradeoffYAxis": "Mais incerteza e necessidade de estrutura",
  "tradeoffPoints": [
    {
      "label": "Curto",
      "x": 0.18,
      "y": 0.22
    },
    {
      "label": "Médio",
      "x": 0.52,
      "y": 0.56
    },
    {
      "label": "Longo",
      "x": 0.86,
      "y": 0.9
    }
  ],
  "checklistTitle": "Checklist antes de escolher o modelo",
  "checklistItems": [
    "Há baseline forte?",
    "As features são causais no tempo?",
    "O split é temporal?",
    "O horizonte está claro?",
    "A métrica é apropriada?",
    "O modelo complexo realmente ganha?"
  ]
});

export const visuals = {
  "time-series-forecasting-ml-hero": standardVisuals.hero,
  "time-series-forecasting-ml-componentes": standardVisuals.concept,
  "time-series-forecasting-ml-pipeline-forecast": standardVisuals.pipeline,
  "time-series-forecasting-ml-splits": standardVisuals.comparison,
  "time-series-forecasting-ml-horizonte": standardVisuals.tradeoff,
  "time-series-forecasting-ml-modelos": standardVisuals.checklist,
} satisfies LessonModule["visuals"];
