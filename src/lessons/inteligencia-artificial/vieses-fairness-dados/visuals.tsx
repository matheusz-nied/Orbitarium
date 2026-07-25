import type { LessonModule } from "../../../types/content";
import { createStandardLessonVisuals } from "../_shared/visualFactories";

const standardVisuals = createStandardLessonVisuals({
  "tone": "rose",
  "heroTitle": "Onde a decisão começa a distorcer?",
  "heroSubtitle": "Coleta, métricas e instituições moldam fairness antes do score final.",
  "heroSteps": [
    "Dados",
    "Modelo",
    "Decisão"
  ],
  "heroFooter": "Sistemas injustos raramente nascem de uma única falha isolada.",
  "conceptTitle": "Fontes frequentes de distorção",
  "conceptLeft": {
    "title": "Antes do modelo",
    "body": "Amostra, medição, categorias e rótulos já podem carregar assimetrias."
  },
  "conceptRight": {
    "title": "Depois do modelo",
    "body": "Limiar, uso institucional e recurso também distribuem dano de forma desigual."
  },
  "conceptFooter": "Diagnóstico bom distingue origem do dano e tipo de mitigação.",
  "pipelineTitle": "Ciclo de decisão e realimentação",
  "pipelineSteps": [
    "Coleta",
    "Rótulo",
    "Treino",
    "Implantação",
    "Novo dado"
  ],
  "comparisonTitle": "Métricas em tensão",
  "comparisonLeft": {
    "title": "Igualar grupos",
    "body": "Alguns critérios priorizam independência ou paridade entre grupos nas saídas e erros."
  },
  "comparisonRight": {
    "title": "Preservar contexto",
    "body": "Outros critérios enfatizam calibração, custos de erro e semelhança relevante entre casos."
  },
  "tradeoffTitle": "Precisão média x reparação distributiva",
  "tradeoffXAxis": "Mais intervenção para corrigir disparidades",
  "tradeoffYAxis": "Mais aderência ao critério operacional atual",
  "tradeoffPoints": [
    {
      "label": "Status quo",
      "x": 0.15,
      "y": 0.82
    },
    {
      "label": "Ajuste técnico",
      "x": 0.52,
      "y": 0.58
    },
    {
      "label": "Redesenho",
      "x": 0.86,
      "y": 0.28
    }
  ],
  "checklistTitle": "Checklist de governança",
  "checklistItems": [
    "Documentar target e proxies",
    "Auditar grupos e interseções",
    "Definir recurso e revisão",
    "Monitorar uso em produção",
    "Testar uso fora do escopo",
    "Explicitar trade-offs"
  ]
});

export const visuals = {
  "vieses-fairness-dados-hero": standardVisuals.hero,
  "vieses-fairness-dados-fontes-de-distorcao": standardVisuals.concept,
  "vieses-fairness-dados-ciclo-decisao": standardVisuals.pipeline,
  "vieses-fairness-dados-metricas-em-tensao": standardVisuals.comparison,
  "vieses-fairness-dados-tradeoffs": standardVisuals.tradeoff,
  "vieses-fairness-dados-governanca": standardVisuals.checklist,
} satisfies LessonModule["visuals"];
