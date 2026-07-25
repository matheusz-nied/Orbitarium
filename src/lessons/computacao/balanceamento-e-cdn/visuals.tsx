import type { LessonModule } from "../../../types/content";
import { createComputacaoVisuals } from "../_shared/factories";

const visualConfig = {
  "title": "Balanceamento de Carga e CDN",
  "subtitle": "Distribuir requisições e aproximar conteúdo do usuário sem tratar origem, cache e invalidação como a mesma coisa.",
  "level": "Intermediário",
  "tags": [
    "CDN",
    "Load Balancing",
    "HTTP",
    "Edge",
    "Cache",
    "Distribuição"
  ],
  "conceptNodes": [
    "Balanceador de carga",
    "CDN",
    "Edge",
    "Origem"
  ],
  "pipelineSteps": [
    "Resolução e roteamento",
    "Edge e cache",
    "Origem balanceada",
    "Invalidação e observabilidade"
  ],
  "leftLabel": "controle rígido na origem",
  "rightLabel": "agressividade de cache e distribuição",
  "impactRows": [
    {
      "label": "Unidade crítica",
      "value": "a requisição e o objeto cacheável correspondente"
    },
    {
      "label": "Primeira etapa",
      "value": "Resolução e roteamento"
    },
    {
      "label": "Erro comum",
      "value": "achar que uma CDN acelera automaticamente qualquer endpoint, inclusive respostas personalizadas e sensíveis"
    },
    {
      "label": "Eixo de projeto",
      "value": "controle rígido na origem ↔ agressividade de cache e distribuição"
    }
  ]
};

export const visuals = createComputacaoVisuals(visualConfig) satisfies LessonModule["visuals"];
