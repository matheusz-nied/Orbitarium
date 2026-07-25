import type { LessonModule } from "../../../types/content";
import { createComputacaoVisuals } from "../_shared/factories";

const visualConfig = {
  "title": "Barramentos: PCIe e Comunicação Interna",
  "subtitle": "Como GPUs, SSDs e placas de rede falam com o host por links, lanes, DMA e topologia - e por que x16 nem sempre significa o que parece.",
  "level": "Avançado",
  "tags": [
    "PCIe",
    "Barramentos",
    "DMA",
    "Topologia",
    "GPU",
    "NVMe"
  ],
  "conceptNodes": [
    "PCIe",
    "Lane",
    "Link width",
    "Root complex"
  ],
  "pipelineSteps": [
    "Enumeração",
    "Treino de link",
    "Transferência por DMA",
    "Interrupção e sincronização"
  ],
  "leftLabel": "flexibilidade de expansão",
  "rightLabel": "previsibilidade de largura de banda",
  "impactRows": [
    {
      "label": "Unidade crítica",
      "value": "a lane, o link negociado e a transação de dados associada"
    },
    {
      "label": "Primeira etapa",
      "value": "Enumeração"
    },
    {
      "label": "Erro comum",
      "value": "ler x16 como garantia automática de throughput total independentemente da topologia e dos outros dispositivos"
    },
    {
      "label": "Eixo de projeto",
      "value": "flexibilidade de expansão ↔ previsibilidade de largura de banda"
    }
  ]
};

export const visuals = createComputacaoVisuals(visualConfig) satisfies LessonModule["visuals"];
