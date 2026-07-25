import type { LessonModule } from "../../../types/content";
import { createComputacaoVisuals } from "../_shared/factories";

const visualConfig = {
  "title": "Como um SSD Funciona",
  "subtitle": "Por que storage sólido parece simples para o sistema operacional, mas esconde mapeamento, garbage collection e custo de regravação no controlador.",
  "level": "Intermediário",
  "tags": [
    "SSD",
    "NAND",
    "NVMe",
    "FTL",
    "Garbage Collection",
    "Storage"
  ],
  "conceptNodes": [
    "NAND flash",
    "Página",
    "Bloco de erase",
    "FTL"
  ],
  "pipelineSteps": [
    "Fila lógica do host",
    "Mapeamento FTL",
    "Program erase em flash",
    "Limpeza e desgaste"
  ],
  "leftLabel": "baixa latência aparente",
  "rightLabel": "durabilidade e housekeeping interno",
  "impactRows": [
    {
      "label": "Unidade crítica",
      "value": "a página física, o bloco de erase e o endereço lógico apresentado ao host"
    },
    {
      "label": "Primeira etapa",
      "value": "Fila lógica do host"
    },
    {
      "label": "Erro comum",
      "value": "achar que sobrescrever um bloco lógico significa mudar fisicamente os mesmos bits no mesmo lugar sem custo de fundo"
    },
    {
      "label": "Eixo de projeto",
      "value": "baixa latência aparente ↔ durabilidade e housekeeping interno"
    }
  ]
};

export const visuals = createComputacaoVisuals(visualConfig) satisfies LessonModule["visuals"];
