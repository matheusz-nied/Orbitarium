import type { LessonModule } from "../../../types/content";
import { createStandardLessonVisuals } from "../_shared/visualFactories";

export const visuals = createStandardLessonVisuals({
  tone: "teal",
  heroTitle: "Transferir é começar do meio, não do zero",
  heroSubtitle: "Representações pré-treinadas viram ponto de partida para novas tarefas",
  heroSteps: ["Pré-treinar", "Congelar", "Adaptar"],
  heroFooter: "O desafio não é só reaproveitar: é decidir quanto preservar e quanto deixar mudar.",
  conceptTitle: "Extrator fixo vs. backbone adaptável",
  conceptLeft: {
    title: "Congelar",
    body: "Preserva conhecimento e reduz risco em datasets pequenos.",
  },
  conceptRight: {
    title: "Fine-tuning",
    body: "Aumenta adaptação ao novo domínio, mas pede cuidado para não esquecer demais.",
  },
  conceptFooter: "A melhor escolha depende de dados, similaridade de domínio e custo disponível.",
  pipelineTitle: "Pipeline mental do transfer learning",
  pipelineSteps: ["Backbone", "Head novo", "Congela", "Descongela", "Valida"],
  comparisonTitle: "Features gerais vs. específicas",
  comparisonLeft: {
    title: "Camadas rasas",
    body: "Bordas, contrastes e texturas simples transferem para muitos problemas.",
  },
  comparisonRight: {
    title: "Camadas profundas",
    body: "Representações finais ficam mais alinhadas à tarefa original e podem pedir adaptação maior.",
  },
  tradeoffTitle: "Preservar ou adaptar é sempre uma troca",
  tradeoffXAxis: "Preservação do pré-treino",
  tradeoffYAxis: "Adaptação ao novo domínio",
  tradeoffPoints: [
    { label: "Head only", x: 0.9, y: 0.28 },
    { label: "Parcial", x: 0.62, y: 0.7 },
    { label: "Total", x: 0.25, y: 0.92 },
    { label: "Domínio distante", x: 0.38, y: 0.82 },
  ],
  checklistTitle: "Checklist de adaptação",
  checklistItems: [
    "O dataset alvo é pequeno ou grande?",
    "O domínio parece próximo do pré-treinamento?",
    "Vale começar com head only antes de descongelar?",
    "Backbone e head usam learning rates diferentes?",
    "A validação está acusando forgetting?",
    "A tarefa exige detalhe espacial, classificação ou detecção?",
  ],
}) satisfies LessonModule["visuals"];
