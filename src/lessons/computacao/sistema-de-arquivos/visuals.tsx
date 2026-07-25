import type { LessonModule } from "../../../types/content";
import { createComputacaoVisuals } from "../_shared/factories";

const visualConfig = {
  "title": "Sistema de Arquivos",
  "subtitle": "A abstração que transforma blocos persistentes em nomes, diretórios, permissões e operações que fazem sentido para programas e pessoas.",
  "level": "Intermediário",
  "tags": [
    "File System",
    "inode",
    "Persistência",
    "Linux",
    "Journaling",
    "I/O"
  ],
  "conceptNodes": [
    "inode",
    "Entrada de diretório",
    "Page cache",
    "Journaling"
  ],
  "pipelineSteps": [
    "Path lookup",
    "Metadados e inode",
    "Page cache e journal",
    "Flush e recuperação"
  ],
  "leftLabel": "layout simples e direto",
  "rightLabel": "recuperação, cache e recursos extras",
  "impactRows": [
    {
      "label": "Unidade crítica",
      "value": "o inode, a entrada de diretório e o mapeamento para blocos"
    },
    {
      "label": "Primeira etapa",
      "value": "Path lookup"
    },
    {
      "label": "Erro comum",
      "value": "pensar que arquivo é apenas uma sequência de bytes com nome, ignorando metadados, diretórios e persistência adiada"
    },
    {
      "label": "Eixo de projeto",
      "value": "layout simples e direto ↔ recuperação, cache e recursos extras"
    }
  ]
};

export const visuals = createComputacaoVisuals(visualConfig) satisfies LessonModule["visuals"];
