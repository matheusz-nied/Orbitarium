import type { LessonModule } from "../../../types/content";
import { createStandardLessonVisuals } from "../_shared/visualFactories";

export const visuals = createStandardLessonVisuals({
  "tone": "amber",
  "heroTitle": "Quantizar é trocar precisão por orçamento operacional",
  "heroSubtitle": "Menos bits reduzem memória e largura de banda, mas introduzem erro de aproximação",
  "heroSteps": [
    "Mapear",
    "Calibrar",
    "Validar"
  ],
  "heroFooter": "A melhor quantização não é a mais agressiva: é a que fecha a conta entre qualidade, latência e hardware.",
  "conceptTitle": "Do valor real ao valor discreto",
  "conceptLeft": {
    "title": "Domínio real",
    "body": "Pesos e ativações vivem em uma faixa contínua de valores."
  },
  "conceptRight": {
    "title": "Domínio quantizado",
    "body": "Poucos níveis precisam aproximar essa faixa com erro controlado."
  },
  "conceptFooter": "Escala, zero-point e clipping definem onde o erro aparece.",
  "pipelineTitle": "Pipeline prático de PTQ/QAT",
  "pipelineSteps": [
    "Modelo base",
    "Calibrar",
    "Quantizar",
    "Benchmark",
    "Ajustar"
  ],
  "comparisonTitle": "Granularidade muda a fidelidade",
  "comparisonLeft": {
    "title": "Escala única",
    "body": "Mais simples, porém pode desperdiçar resolução útil."
  },
  "comparisonRight": {
    "title": "Escalas locais",
    "body": "Capturam melhor canais heterogêneos e preservam qualidade."
  },
  "tradeoffTitle": "Agressividade vs. risco de regressão",
  "tradeoffXAxis": "Compressão e eficiência",
  "tradeoffYAxis": "Risco de perda de qualidade",
  "tradeoffPoints": [
    {
      "label": "FP16",
      "x": 0.12,
      "y": 0.08
    },
    {
      "label": "INT8",
      "x": 0.42,
      "y": 0.28
    },
    {
      "label": "INT4",
      "x": 0.74,
      "y": 0.58
    },
    {
      "label": "INT4 mal calibrado",
      "x": 0.88,
      "y": 0.84
    }
  ],
  "checklistTitle": "Checklist de quantização útil",
  "checklistItems": [
    "O runtime possui kernels maduros para o formato escolhido?",
    "A calibração representa o tráfego real?",
    "Há comparação por latência, memória e qualidade?",
    "Camadas sensíveis foram tratadas com cuidado?",
    "A estratégia serve ao produto, não apenas ao paper?",
    "Existe plano de rollback para regressões silenciosas?"
  ]
}) satisfies LessonModule["visuals"];
