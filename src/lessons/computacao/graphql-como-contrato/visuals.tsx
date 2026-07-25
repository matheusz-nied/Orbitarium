import type { LessonModule } from "../../../types/content";
import { createComputacaoVisuals } from "../_shared/factories";

const visualConfig = {
  "title": "GraphQL como Contrato de API",
  "subtitle": "Schema tipado, resolvers e custo de execução: o que muda quando o cliente escolhe o formato da resposta.",
  "level": "Intermediário",
  "tags": [
    "GraphQL",
    "API",
    "Schema",
    "Resolvers",
    "Contrato",
    "N+1"
  ],
  "conceptNodes": [
    "Schema",
    "Resolver",
    "Query",
    "Mutation"
  ],
  "pipelineSteps": [
    "Schema e validação",
    "Execução de resolvers",
    "Batching e políticas",
    "Resposta estruturada"
  ],
  "leftLabel": "rigidez do servidor",
  "rightLabel": "flexibilidade do cliente",
  "impactRows": [
    {
      "label": "Unidade crítica",
      "value": "o tipo, o campo e o resolver responsável por produzi-lo"
    },
    {
      "label": "Primeira etapa",
      "value": "Schema e validação"
    },
    {
      "label": "Erro comum",
      "value": "achar que GraphQL elimina a necessidade de desenho de API, caching e controle de autorização"
    },
    {
      "label": "Eixo de projeto",
      "value": "rigidez do servidor ↔ flexibilidade do cliente"
    }
  ]
};

export const visuals = createComputacaoVisuals(visualConfig) satisfies LessonModule["visuals"];
