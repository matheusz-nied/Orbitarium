import type { LessonModule } from "../../../types/content";
import { createStandardLessonVisuals } from "../_shared/visualFactories";

export const visuals = createStandardLessonVisuals({
  tone: "rose",
  heroTitle: "Alinhamento é ajustar comportamento, não refazer a linguagem do zero",
  heroSubtitle: "SFT, preferências e RLHF empurram a política do modelo para respostas mais desejadas",
  heroSteps: ["Demonstrar", "Comparar", "Otimizar"],
  heroFooter: "O pipeline alinha o modelo a sinais humanos observados, não a uma noção universal completa de valores.",
  conceptTitle: "Dois tipos de sinal humano",
  conceptLeft: {
    title: "Demonstrações",
    body: "Mostram explicitamente como uma boa resposta pode parecer.",
  },
  conceptRight: {
    title: "Preferências",
    body: "Comparam alternativas e capturam melhor julgamentos relativos entre respostas.",
  },
  conceptFooter: "SFT organiza a política inicial; RLHF a refina por sinais comparativos.",
  pipelineTitle: "Pipeline resumido de alinhamento",
  pipelineSteps: ["Pré-treino", "SFT", "Comparações", "Reward model", "RLHF"],
  comparisonTitle: "O que muda entre base e alinhamento",
  comparisonLeft: {
    title: "Modelo base",
    body: "Muito bom em linguagem plausível, mas não necessariamente em obedecer intenção do usuário.",
  },
  comparisonRight: {
    title: "Modelo alinhado",
    body: "Mais moldado por utilidade, formato e preferências observadas em um protocolo humano concreto.",
  },
  tradeoffTitle: "Melhorar comportamento também cria novos riscos",
  tradeoffXAxis: "Liberdade da política",
  tradeoffYAxis: "Risco de explorar o proxy",
  tradeoffPoints: [
    { label: "SFT", x: 0.3, y: 0.18 },
    { label: "RLHF balanceado", x: 0.55, y: 0.34 },
    { label: "Pouco freio", x: 0.86, y: 0.82 },
    { label: "Excesso de restrição", x: 0.16, y: 0.26 },
  ],
  checklistTitle: "Checklist de alinhamento",
  checklistItems: [
    "As demonstrações supervisionadas cobrem bem o comportamento desejado?",
    "Os avaliadores concordam minimamente entre si?",
    "O reward model está sendo auditado contra hacking?",
    "Há freio suficiente para não descolar demais da política base?",
    "O protocolo de avaliação representa o uso real do produto?",
    "Existem camadas adicionais de defesa além do modelo alinhado?",
  ],
}) satisfies LessonModule["visuals"];
