import type { LessonModule } from "../../../types/content";
import { createComputacaoVisuals } from "../_shared/factories";

const visualConfig = {
  "title": "TPU, NPU e Aceleradores",
  "subtitle": "Quando hardware especializado vence CPU generalista - e quando o movimento de dados destrói a vantagem prometida.",
  "level": "Avançado",
  "tags": [
    "TPU",
    "NPU",
    "Aceleradores",
    "IA",
    "Dataflow",
    "Quantização"
  ],
  "conceptNodes": [
    "Acelerador",
    "TPU",
    "NPU",
    "Tile"
  ],
  "pipelineSteps": [
    "Lowering do grafo",
    "Tile e escalonamento",
    "Reuso em memória local",
    "I/O e sincronização"
  ],
  "leftLabel": "generalidade de execução",
  "rightLabel": "especialização de operadores e energia",
  "impactRows": [
    {
      "label": "Unidade crítica",
      "value": "o tile de tensor e o operador que o hardware consegue reaproveitar eficientemente"
    },
    {
      "label": "Primeira etapa",
      "value": "Lowering do grafo"
    },
    {
      "label": "Erro comum",
      "value": "achar que qualquer workload de IA automaticamente roda melhor em qualquer acelerador anunciado como NPU ou TPU"
    },
    {
      "label": "Eixo de projeto",
      "value": "generalidade de execução ↔ especialização de operadores e energia"
    }
  ]
};

export const visuals = createComputacaoVisuals(visualConfig) satisfies LessonModule["visuals"];
