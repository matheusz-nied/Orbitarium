import type { LessonModule } from "../../../types/content";
import { createComputacaoVisuals } from "../_shared/factories";

const visualConfig = {
  "title": "Concorrência em Baixo Nível",
  "subtitle": "Atomics, happens-before e ordens de memória: por que ver a mesma variável não significa ver o mesmo mundo entre cores.",
  "level": "Avançado",
  "tags": [
    "Atomics",
    "Concurrency",
    "Memory Order",
    "Lock-Free",
    "Happens-Before",
    "Multicore"
  ],
  "conceptNodes": [
    "Atomic",
    "Data race",
    "Acquire",
    "Release"
  ],
  "pipelineSteps": [
    "Produção local",
    "Publicação sincronizada",
    "Observação remota",
    "Progresso e retry"
  ],
  "leftLabel": "simplicidade de raciocínio",
  "rightLabel": "paralelismo e baixa contenção",
  "impactRows": [
    {
      "label": "Unidade crítica",
      "value": "a operação atômica e a borda de happens before que ela estabelece"
    },
    {
      "label": "Primeira etapa",
      "value": "Produção local"
    },
    {
      "label": "Erro comum",
      "value": "assumir que a ordem escrita no código é a mesma ordem observada por todas as threads"
    },
    {
      "label": "Eixo de projeto",
      "value": "simplicidade de raciocínio ↔ paralelismo e baixa contenção"
    }
  ]
};

export const visuals = createComputacaoVisuals(visualConfig) satisfies LessonModule["visuals"];
