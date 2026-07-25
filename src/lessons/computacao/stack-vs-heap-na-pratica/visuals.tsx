import type { LessonModule } from "../../../types/content";
import { createComputacaoVisuals } from "../_shared/factories";

const visualConfig = {
  "title": "Stack vs Heap na Prática",
  "subtitle": "A pergunta madura não é 'stack é mais rápida?', e sim 'que lifetime, tamanho, compartilhamento e escape este valor realmente exige?'.",
  "level": "Intermediário",
  "tags": [
    "Stack",
    "Heap",
    "Escape Analysis",
    "Lifetime",
    "Indireção",
    "Ownership"
  ],
  "conceptNodes": [
    "escape",
    "ownership",
    "indireção",
    "lifetime local"
  ],
  "pipelineSteps": [
    "Nascer no escopo atual",
    "Perguntar se ele escapa",
    "Pagar em cópia ou indirection",
    "Medir e ajustar"
  ],
  "leftLabel": "duração local previsível",
  "rightLabel": "compartilhamento flexível",
  "impactRows": [
    {
      "label": "Unidade crítica",
      "value": "o valor e o contrato de lifetime que o cerca"
    },
    {
      "label": "Primeira etapa",
      "value": "perguntar se o dado precisa escapar, crescer ou ser compartilhado"
    },
    {
      "label": "Erro comum",
      "value": "tratar stack e heap como ranking moral em vez de contratos"
    },
    {
      "label": "Eixo de projeto",
      "value": "duração local previsível ↔ compartilhamento flexível"
    }
  ]
};

export const visuals = createComputacaoVisuals(visualConfig) satisfies LessonModule["visuals"];
