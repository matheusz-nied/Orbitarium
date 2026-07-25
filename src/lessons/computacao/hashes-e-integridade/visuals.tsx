import type { LessonModule } from "../../../types/content";
import { createComputacaoVisuals } from "../_shared/factories";

const visualConfig = {
  "title": "Hashes e Integridade",
  "subtitle": "Como resumir bytes em uma impressão digital útil para detectar mudanças - sem transformar hash em magia criptográfica.",
  "level": "Intermediário",
  "tags": [
    "Hash",
    "Integridade",
    "SHA-256",
    "Git",
    "Checksums",
    "Supply Chain"
  ],
  "conceptNodes": [
    "Digest",
    "Colisão",
    "Pré-imagem",
    "Checksum"
  ],
  "pipelineSteps": [
    "Entrada de bytes",
    "Mistura interna",
    "Digest final",
    "Comparação confiável"
  ],
  "leftLabel": "velocidade e conveniência",
  "rightLabel": "resistência criptográfica",
  "impactRows": [
    {
      "label": "Unidade crítica",
      "value": "o digest calculado a partir de uma entrada específica"
    },
    {
      "label": "Primeira etapa",
      "value": "Entrada de bytes"
    },
    {
      "label": "Erro comum",
      "value": "tratar qualquer hash como prova de autenticidade, mesmo sem uma fonte confiável ou assinatura que proteja o valor publicado"
    },
    {
      "label": "Eixo de projeto",
      "value": "velocidade e conveniência ↔ resistência criptográfica"
    }
  ]
};

export const visuals = createComputacaoVisuals(visualConfig) satisfies LessonModule["visuals"];
