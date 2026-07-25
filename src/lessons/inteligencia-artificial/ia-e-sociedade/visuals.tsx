import type { LessonModule } from "../../../types/content";
import { createStandardLessonVisuals } from "../_shared/visualFactories";

const standardVisuals = createStandardLessonVisuals({
  "tone": "emerald",
  "heroTitle": "IA muda a sociedade através de tarefas, regras e poder",
  "heroSubtitle": "Trabalho, criação e responsabilidade são reconfigurados por decisões de adoção.",
  "heroSteps": [
    "Trabalho",
    "Autoria",
    "Governança"
  ],
  "heroFooter": "Impacto social não é destino técnico: é desenho institucional.",
  "conceptTitle": "Dois eixos do debate social",
  "conceptLeft": {
    "title": "Quem faz o trabalho?",
    "body": "Automação redistribui tarefas, tempo, vigilância e qualificação."
  },
  "conceptRight": {
    "title": "Quem leva o crédito ou a culpa?",
    "body": "Autoria e responsabilidade dependem de contribuição humana e desenho institucional."
  },
  "conceptFooter": "Adoção de IA mexe tanto com produção quanto com imputação de valor e dano.",
  "pipelineTitle": "Cadeia de decisão sociotécnica",
  "pipelineSteps": [
    "Projeto",
    "Adoção",
    "Uso",
    "Impacto",
    "Recurso"
  ],
  "comparisonTitle": "Autoria e responsabilidade",
  "comparisonLeft": {
    "title": "Produção criativa",
    "body": "Importa saber onde houve contribuição humana significativa, curadoria e transformação."
  },
  "comparisonRight": {
    "title": "Decisão automatizada",
    "body": "Importa saber quem definiu escopo, monitorou risco e responde por dano quando o sistema erra."
  },
  "tradeoffTitle": "Automação x proteção social",
  "tradeoffXAxis": "Mais delegação e produtividade buscada",
  "tradeoffYAxis": "Mais necessidade de proteção, qualificação e recurso",
  "tradeoffPoints": [
    {
      "label": "Apoio",
      "x": 0.24,
      "y": 0.26
    },
    {
      "label": "Reconfiguração",
      "x": 0.58,
      "y": 0.62
    },
    {
      "label": "Substituição dura",
      "x": 0.86,
      "y": 0.88
    }
  ],
  "checklistTitle": "Checklist de governança social",
  "checklistItems": [
    "Mapear tarefas afetadas",
    "Garantir direito de recurso",
    "Explicitar autoria humana",
    "Monitorar distribuição de ganhos",
    "Treinar equipes afetadas",
    "Auditar concentração e dependência"
  ]
});

export const visuals = {
  "ia-e-sociedade-hero": standardVisuals.hero,
  "ia-e-sociedade-trabalho-autoria": standardVisuals.concept,
  "ia-e-sociedade-cadeia-decisao": standardVisuals.pipeline,
  "ia-e-sociedade-autoria-responsabilidade": standardVisuals.comparison,
  "ia-e-sociedade-automacao": standardVisuals.tradeoff,
  "ia-e-sociedade-governanca": standardVisuals.checklist,
} satisfies LessonModule["visuals"];
