import type { LessonModule } from "../../../types/content";
import { createStandardLessonVisuals } from "../_shared/visualFactories";

const standardVisuals = createStandardLessonVisuals({
  "tone": "indigo",
  "heroTitle": "Aprender a agir, não só a prever",
  "heroSubtitle": "RL muda o foco para política, retorno e tempo.",
  "heroSteps": [
    "Estado",
    "Ação",
    "Retorno"
  ],
  "heroFooter": "Decidir bem exige aprender com consequências que às vezes chegam tarde.",
  "conceptTitle": "Vocabulário mínimo do RL",
  "conceptLeft": {
    "title": "Situação atual",
    "body": "Estado e ações disponíveis estruturam o espaço do possível em cada passo."
  },
  "conceptRight": {
    "title": "Consequência futura",
    "body": "Recompensa, retorno e transição ligam a decisão atual ao que vem depois."
  },
  "conceptFooter": "A força do RL está em conectar percepção presente e efeito futuro.",
  "pipelineTitle": "Ciclo de aprendizado por interação",
  "pipelineSteps": [
    "Observar",
    "Agir",
    "Receber reward",
    "Atualizar",
    "Tentar de novo"
  ],
  "comparisonTitle": "Ganho local x retorno acumulado",
  "comparisonLeft": {
    "title": "Recompensa imediata",
    "body": "Pode seduzir o agente para soluções míopes que parecem boas agora."
  },
  "comparisonRight": {
    "title": "Retorno total",
    "body": "Exige considerar consequências futuras e atribuir crédito corretamente ao longo do tempo."
  },
  "tradeoffTitle": "Exploração x explotação",
  "tradeoffXAxis": "Mais exploração de alternativas",
  "tradeoffYAxis": "Mais custo, risco e informação potencial",
  "tradeoffPoints": [
    {
      "label": "Conservador",
      "x": 0.18,
      "y": 0.2
    },
    {
      "label": "Equilíbrio",
      "x": 0.5,
      "y": 0.56
    },
    {
      "label": "Aventureiro",
      "x": 0.84,
      "y": 0.86
    }
  ],
  "checklistTitle": "Quando RL faz sentido?",
  "checklistItems": [
    "Há decisão sequencial?",
    "A ação altera o futuro?",
    "O reward é realmente o objetivo?",
    "Explorar é viável?",
    "Existe simulação ou feedback?",
    "Outra formulação não seria mais simples?"
  ]
});

export const visuals = {
  "reinforcement-learning-introducao-hero": standardVisuals.hero,
  "reinforcement-learning-introducao-mdp": standardVisuals.concept,
  "reinforcement-learning-introducao-ciclo-aprendizado": standardVisuals.pipeline,
  "reinforcement-learning-introducao-recompensa-atrasada": standardVisuals.comparison,
  "reinforcement-learning-introducao-exploracao": standardVisuals.tradeoff,
  "reinforcement-learning-introducao-aplicacoes": standardVisuals.checklist,
} satisfies LessonModule["visuals"];
