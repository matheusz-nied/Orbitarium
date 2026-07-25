import type { LessonModule } from "../../../types/content";
import { createComputacaoVisuals } from "../_shared/factories";

const visualConfig = {
  "title": "Branch Prediction e Código Quente",
  "subtitle": "No hot path, não basta decidir certo; muitas vezes importa se o hardware consegue prever o caminho antes de você confirmar a condição.",
  "level": "Avançado",
  "tags": [
    "Branch Prediction",
    "Hot Path",
    "Mispredict",
    "Perf",
    "Speculation",
    "Code Layout"
  ],
  "conceptNodes": [
    "predictor",
    "mispredict",
    "fast path",
    "code layout"
  ],
  "pipelineSteps": [
    "Predizer o caminho",
    "Executar especulativamente",
    "Confirmar e corrigir",
    "Moldar dados e caminho quente"
  ],
  "leftLabel": "lógica com muitos ramos",
  "rightLabel": "fluxo quente previsível",
  "impactRows": [
    {
      "label": "Unidade crítica",
      "value": "o branch muito frequente dentro do hot path"
    },
    {
      "label": "Primeira etapa",
      "value": "entender a distribuição real de dados e a taxa de acerto"
    },
    {
      "label": "Erro comum",
      "value": "forçar branchless sem medir previsibilidade ou custo extra"
    },
    {
      "label": "Eixo de projeto",
      "value": "lógica com muitos ramos ↔ fluxo quente previsível"
    }
  ]
};

export const visuals = createComputacaoVisuals(visualConfig) satisfies LessonModule["visuals"];
