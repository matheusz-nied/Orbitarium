import type { LessonModule } from "../../../types/content";
import { createComputacaoVisuals } from "../_shared/factories";

const visualConfig = {
  "title": "SIMD: Intuição de Paralelismo de Dados",
  "subtitle": "Quando a mesma operação se repete sobre dados independentes e contíguos, o hardware pode fazer mais trabalho por instrução do que o código escalar sugere.",
  "level": "Avançado",
  "tags": [
    "SIMD",
    "Vectorization",
    "Lanes",
    "Intrinsics",
    "LLVM",
    "NEON"
  ],
  "conceptNodes": [
    "lanes",
    "contiguidade",
    "auto-vectorization",
    "tails"
  ],
  "pipelineSteps": [
    "Achar independência",
    "Expor contiguidade",
    "VetorizAR o corpo quente",
    "Tratar sobras e medir"
  ],
  "leftLabel": "escalar simples",
  "rightLabel": "paralelismo por lanes",
  "impactRows": [
    {
      "label": "Unidade crítica",
      "value": "o grupo de lanes alimentadas por dados independentes e contíguos"
    },
    {
      "label": "Primeira etapa",
      "value": "provar independência e regularidade do loop"
    },
    {
      "label": "Erro comum",
      "value": "ir para intrinsics antes de consertar layout e medir o bound real"
    },
    {
      "label": "Eixo de projeto",
      "value": "escalar simples ↔ paralelismo por lanes"
    }
  ]
};

export const visuals = createComputacaoVisuals(visualConfig) satisfies LessonModule["visuals"];
