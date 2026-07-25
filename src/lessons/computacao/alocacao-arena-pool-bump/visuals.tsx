import type { LessonModule } from "../../../types/content";
import { createComputacaoVisuals } from "../_shared/factories";

const visualConfig = {
  "title": "Alocação: Arena, Pool e Bump",
  "subtitle": "Nem toda alocação precisa do custo e da flexibilidade do heap geral; às vezes o lifetime do problema já sugere uma estratégia melhor.",
  "level": "Intermediário",
  "tags": [
    "Alocação",
    "Arena",
    "Pool",
    "Bump",
    "Lifetime",
    "Reuso"
  ],
  "conceptNodes": [
    "arena",
    "pool",
    "bump",
    "reset em lote"
  ],
  "pipelineSteps": [
    "Ler o lifetime",
    "Escolher a política",
    "Controlar reset e reuso",
    "Validar na carga real"
  ],
  "leftLabel": "flexibilidade geral",
  "rightLabel": "lifetime restrito e reuso",
  "impactRows": [
    {
      "label": "Unidade crítica",
      "value": "o grupo de objetos que compartilha lifetime ou ciclo de reuso"
    },
    {
      "label": "Primeira etapa",
      "value": "descobrir se o problema é em lote, por reciclagem ou totalmente irregular"
    },
    {
      "label": "Erro comum",
      "value": "especializar antes de provar fronteira semântica do lifetime"
    },
    {
      "label": "Eixo de projeto",
      "value": "flexibilidade geral ↔ lifetime restrito e reuso"
    }
  ]
};

export const visuals = createComputacaoVisuals(visualConfig) satisfies LessonModule["visuals"];
