import type { LessonModule } from "../../../types/content";
import { createComputacaoVisuals } from "../_shared/factories";

const visualConfig = {
  "title": "Monolito vs Microserviços",
  "subtitle": "Fronteiras de deploy, coordenação e custo operacional: por que dividir um sistema nem sempre o torna mais simples.",
  "level": "Intermediário",
  "tags": [
    "Arquitetura",
    "Monolito",
    "Microserviços",
    "Deploy",
    "Latência",
    "Observabilidade"
  ],
  "conceptNodes": [
    "Monólito",
    "Modular monolith",
    "Microserviço",
    "Fronteira de serviço"
  ],
  "pipelineSteps": [
    "Fronteira de código",
    "Fronteira de deploy",
    "Coordenação distribuída",
    "Operação contínua"
  ],
  "leftLabel": "simplicidade de entrega",
  "rightLabel": "autonomia e isolamento por serviço",
  "impactRows": [
    {
      "label": "Unidade crítica",
      "value": "a fronteira de serviço e a unidade de deploy correspondente"
    },
    {
      "label": "Primeira etapa",
      "value": "Fronteira de código"
    },
    {
      "label": "Erro comum",
      "value": "tratar microserviços como solução universal de escalabilidade antes de ter problema organizacional ou de isolamento claros"
    },
    {
      "label": "Eixo de projeto",
      "value": "simplicidade de entrega ↔ autonomia e isolamento por serviço"
    }
  ]
};

export const visuals = createComputacaoVisuals(visualConfig) satisfies LessonModule["visuals"];
