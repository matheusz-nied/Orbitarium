import type { LessonModule } from "../../../types/content";
import { createComputacaoVisuals } from "../_shared/factories";

const visualConfig = {
  "title": "Zero-Copy e Buffers",
  "subtitle": "Copiar é simples e seguro, mas em caminhos quentes o custo de mover bytes repetidamente pode dominar mais do que o algoritmo principal.",
  "level": "Intermediário",
  "tags": [
    "Zero-Copy",
    "Buffers",
    "sendfile",
    "Slices",
    "Ownership",
    "I/O"
  ],
  "conceptNodes": [
    "ownership de buffer",
    "slices",
    "sendfile",
    "pool de buffers"
  ],
  "pipelineSteps": [
    "Mapear duplicações",
    "Substituir por view ou in-kernel",
    "Garantir validade",
    "Copiar nas fronteiras certas"
  ],
  "leftLabel": "cópia defensiva",
  "rightLabel": "views e reuso",
  "impactRows": [
    {
      "label": "Unidade crítica",
      "value": "o buffer-base e as views que dependem dele"
    },
    {
      "label": "Primeira etapa",
      "value": "descobrir onde o mesmo conteúdo é copiado sem necessidade lógica"
    },
    {
      "label": "Erro comum",
      "value": "confundir ausência de cópia com ausência de contrato"
    },
    {
      "label": "Eixo de projeto",
      "value": "cópia defensiva ↔ views e reuso"
    }
  ]
};

export const visuals = createComputacaoVisuals(visualConfig) satisfies LessonModule["visuals"];
