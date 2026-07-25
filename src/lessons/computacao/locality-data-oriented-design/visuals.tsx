import type { LessonModule } from "../../../types/content";
import { createComputacaoVisuals } from "../_shared/factories";

const visualConfig = {
  "title": "Locality e Data-Oriented Design",
  "subtitle": "Quando um programa parece 'CPU-bound', muitas vezes ele está perdendo tempo esperando dados espalhados demais para o hardware consumir bem.",
  "level": "Intermediário",
  "tags": [
    "Localidade",
    "Data-Oriented Design",
    "AoS",
    "SoA",
    "Cache",
    "Layout"
  ],
  "conceptNodes": [
    "layout contíguo",
    "AoS vs SoA",
    "hot/cold split",
    "batches"
  ],
  "pipelineSteps": [
    "Achar o percurso quente",
    "Agrupar o que anda junto",
    "Iterar em blocos previsíveis",
    "Medir o efeito"
  ],
  "leftLabel": "flexibilidade de entidades",
  "rightLabel": "fluxo contíguo de dados",
  "impactRows": [
    {
      "label": "Unidade crítica",
      "value": "o conjunto de campos realmente tocados pelo hot path"
    },
    {
      "label": "Primeira etapa",
      "value": "identificar qual loop, consulta ou fase domina o custo"
    },
    {
      "label": "Erro comum",
      "value": "medir o algoritmo e ignorar a organização física dos dados"
    },
    {
      "label": "Eixo de projeto",
      "value": "flexibilidade de entidades ↔ fluxo contíguo de dados"
    }
  ]
};

export const visuals = createComputacaoVisuals(visualConfig) satisfies LessonModule["visuals"];
