import type { LessonModule } from "../../../types/content";
import { createComputacaoVisuals } from "../_shared/factories";

const visualConfig = {
  "title": "Bits, Portas Lógicas e Circuitos",
  "subtitle": "Da distinção entre 0 e 1 até o surgimento de somadores, multiplexadores e estado: a ponte entre álgebra booleana e hardware real.",
  "level": "Iniciante",
  "tags": [
    "Bits",
    "Portas Lógicas",
    "Circuitos",
    "Álgebra Booleana",
    "Clock",
    "Hardware"
  ],
  "conceptNodes": [
    "Bit",
    "Tabela verdade",
    "Porta lógica",
    "Álgebra booleana"
  ],
  "pipelineSteps": [
    "Codificação binária",
    "Combinação por portas",
    "Composição em blocos",
    "Captura de estado"
  ],
  "leftLabel": "simplicidade conceitual",
  "rightLabel": "expressividade dos circuitos",
  "impactRows": [
    {
      "label": "Unidade crítica",
      "value": "o bit e a saída produzida por cada porta ou elemento de estado"
    },
    {
      "label": "Primeira etapa",
      "value": "Codificação binária"
    },
    {
      "label": "Erro comum",
      "value": "imaginar portas lógicas como instruções de software executadas uma depois da outra"
    },
    {
      "label": "Eixo de projeto",
      "value": "simplicidade conceitual ↔ expressividade dos circuitos"
    }
  ]
};

export const visuals = createComputacaoVisuals(visualConfig) satisfies LessonModule["visuals"];
