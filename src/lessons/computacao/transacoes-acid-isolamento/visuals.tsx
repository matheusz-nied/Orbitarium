import type { LessonModule } from "../../../types/content";
import { createComputacaoVisuals } from "../_shared/factories";

const visualConfig = {
  "title": "Transações, ACID e Isolamento",
  "subtitle": "O que um commit realmente promete quando várias operações disputam os mesmos dados ao mesmo tempo.",
  "level": "Avançado",
  "tags": [
    "Banco de Dados",
    "ACID",
    "MVCC",
    "Isolamento",
    "Concorrência",
    "WAL"
  ],
  "conceptNodes": [
    "Transação",
    "Atomicidade",
    "Consistência",
    "Isolamento"
  ],
  "pipelineSteps": [
    "Início e snapshot",
    "Leituras e escritas",
    "Detecção de conflito",
    "Commit e WAL"
  ],
  "leftLabel": "concorrência máxima",
  "rightLabel": "isolamento forte",
  "impactRows": [
    {
      "label": "Unidade crítica",
      "value": "o conjunto de leituras, escritas e a visibilidade de versões para uma operação lógica"
    },
    {
      "label": "Primeira etapa",
      "value": "Início e snapshot"
    },
    {
      "label": "Erro comum",
      "value": "achar que ACID faz qualquer regra de negócio ficar correta automaticamente, independentemente de nível de isolamento ou lógica da aplicação"
    },
    {
      "label": "Eixo de projeto",
      "value": "concorrência máxima ↔ isolamento forte"
    }
  ]
};

export const visuals = createComputacaoVisuals(visualConfig) satisfies LessonModule["visuals"];
