import type { LessonModule } from "../../../types/content";
import { createComputacaoVisuals } from "../_shared/factories";

const visualConfig = {
  "title": "False Sharing e Cache Lines",
  "subtitle": "Duas threads podem 'brigar' mesmo escrevendo campos diferentes, desde que esses campos morem na mesma linha de cache.",
  "level": "Avançado",
  "tags": [
    "False Sharing",
    "Cache Line",
    "Coerência",
    "Multicore",
    "Padding",
    "perf c2c"
  ],
  "conceptNodes": [
    "coerência",
    "cache line",
    "line bouncing",
    "padding"
  ],
  "pipelineSteps": [
    "Writer quente toca a linha",
    "Coerência invalida vizinhos",
    "Leitores ou writers pagam a volta",
    "Layout ou algoritmo mudam"
  ],
  "leftLabel": "densidade de memória",
  "rightLabel": "isolamento por linha",
  "impactRows": [
    {
      "label": "Unidade crítica",
      "value": "a cache line, não o campo lógico isolado"
    },
    {
      "label": "Primeira etapa",
      "value": "provar o hotspot e localizar a linha disputada"
    },
    {
      "label": "Erro comum",
      "value": "confundir true sharing com false sharing"
    },
    {
      "label": "Eixo de projeto",
      "value": "densidade de memória ↔ isolamento por linha"
    }
  ]
};

export const visuals = createComputacaoVisuals(visualConfig) satisfies LessonModule["visuals"];
