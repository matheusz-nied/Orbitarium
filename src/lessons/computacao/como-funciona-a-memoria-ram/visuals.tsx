import type { LessonModule } from "../../../types/content";
import { createComputacaoVisuals } from "../_shared/factories";

const visualConfig = {
  "title": "Como Funciona a Memória RAM",
  "subtitle": "A memória principal como área de trabalho ativa do computador: grande, volátil e rápida - mas nem de longe gratuita ou instantânea.",
  "level": "Intermediário",
  "tags": [
    "RAM",
    "DRAM",
    "Hierarquia de Memória",
    "Latência",
    "Largura de banda",
    "Working set"
  ],
  "conceptNodes": [
    "RAM",
    "DRAM",
    "SRAM",
    "Working set"
  ],
  "pipelineSteps": [
    "Miss de cache",
    "Escalonamento pelo controlador",
    "Ativação e burst",
    "Preenchimento e substituição"
  ],
  "leftLabel": "mais dados residentes",
  "rightLabel": "menos espera por acesso",
  "impactRows": [
    {
      "label": "Unidade crítica",
      "value": "a linha ou banco acessado e o bloco que sobe para preencher caches"
    },
    {
      "label": "Primeira etapa",
      "value": "Miss de cache"
    },
    {
      "label": "Erro comum",
      "value": "achar que adicionar RAM acelera qualquer programa igualmente, independentemente do padrão de acesso"
    },
    {
      "label": "Eixo de projeto",
      "value": "mais dados residentes ↔ menos espera por acesso"
    }
  ]
};

export const visuals = createComputacaoVisuals(visualConfig) satisfies LessonModule["visuals"];
