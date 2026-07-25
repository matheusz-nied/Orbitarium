import type { LessonModule } from "../../../types/content";
import { createStandardLessonVisuals } from "../_shared/visualFactories";

export const visuals = createStandardLessonVisuals({
  "tone": "emerald",
  "heroTitle": "MLOps é tornar modelos reproduzíveis, promovíveis e observáveis",
  "heroSubtitle": "Sem pipeline e governança, cada release de ML vira um ato de memória e improviso",
  "heroSteps": [
    "Versionar",
    "Validar",
    "Operar"
  ],
  "heroFooter": "Ferramentas mudam; a disciplina de rastrear, testar e reverter continua.",
  "conceptTitle": "Código sozinho não reproduz um modelo",
  "conceptLeft": {
    "title": "Só repositório",
    "body": "Faltam dados, parâmetros, ambiente e contexto de execução."
  },
  "conceptRight": {
    "title": "Artefato completo",
    "body": "Modelo, dados e metadados viajam juntos para permitir comparação justa."
  },
  "conceptFooter": "Reprodutibilidade começa quando o experimento deixa de depender da memória do autor.",
  "pipelineTitle": "Fluxo essencial de MLOps",
  "pipelineSteps": [
    "Ingerir",
    "Validar",
    "Treinar",
    "Registrar",
    "Promover"
  ],
  "comparisonTitle": "Automação sem critério vs. automação com gates",
  "comparisonLeft": {
    "title": "Pipeline cego",
    "body": "Corre rápido, mas promove regressões com facilidade."
  },
  "comparisonRight": {
    "title": "Pipeline governado",
    "body": "Move mais devagar no curto prazo e muito melhor no longo prazo."
  },
  "tradeoffTitle": "Velocidade de release vs. risco operacional",
  "tradeoffXAxis": "Velocidade percebida",
  "tradeoffYAxis": "Risco de regressão",
  "tradeoffPoints": [
    {
      "label": "Manual puro",
      "x": 0.18,
      "y": 0.7
    },
    {
      "label": "Gates básicos",
      "x": 0.48,
      "y": 0.38
    },
    {
      "label": "Automação madura",
      "x": 0.74,
      "y": 0.26
    },
    {
      "label": "Automação sem governança",
      "x": 0.86,
      "y": 0.8
    }
  ],
  "checklistTitle": "Checklist mínimo de MLOps",
  "checklistItems": [
    "Você consegue reproduzir um treino importante?",
    "Dados, código e modelo têm lineage rastreável?",
    "Existem gates claros antes de promoção?",
    "Há registry e ownership definidos?",
    "Produção é monitorada com alertas relevantes?",
    "Rollback para uma versão anterior é simples e seguro?"
  ]
}) satisfies LessonModule["visuals"];
