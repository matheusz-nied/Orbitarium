import type { LessonModule } from "../../../types/content";
import { createStandardLessonVisuals } from "../_shared/visualFactories";

const standardVisuals = createStandardLessonVisuals({
  "tone": "violet",
  "heroTitle": "Parece agente — mas em que sentido?",
  "heroSubtitle": "Interação convincente não basta para autonomia forte ou responsabilidade moral.",
  "heroSteps": [
    "Linguagem",
    "Ferramentas",
    "Ação"
  ],
  "heroFooter": "A boa análise separa comportamento funcional de status ontológico.",
  "conceptTitle": "Mapa conceitual da agência",
  "conceptLeft": {
    "title": "Função",
    "body": "Executar tarefas, manter contexto, planejar passos e usar ferramentas."
  },
  "conceptRight": {
    "title": "Status forte",
    "body": "Ter fins próprios, entendimento robusto e responsabilidade em sentido moral."
  },
  "conceptFooter": "Confundir essas camadas produz tanto hype quanto má governança.",
  "pipelineTitle": "Loop de sistema agentificado",
  "pipelineSteps": [
    "Meta",
    "Busca",
    "Ferramenta",
    "Saída",
    "Validação"
  ],
  "comparisonTitle": "Autonomia e controle",
  "comparisonLeft": {
    "title": "Delegação limitada",
    "body": "Sistema sugere, consulta e propõe, mas humanos mantêm revisão e poder de veto."
  },
  "comparisonRight": {
    "title": "Delegação extensa",
    "body": "Sistema executa mais passos sozinho, aumentando impacto e exigência de governança."
  },
  "tradeoffTitle": "Delegação operacional x exigência de supervisão",
  "tradeoffXAxis": "Mais delegação ao sistema",
  "tradeoffYAxis": "Mais necessidade de controle, logs e recurso",
  "tradeoffPoints": [
    {
      "label": "Assistente",
      "x": 0.22,
      "y": 0.28
    },
    {
      "label": "Co-piloto",
      "x": 0.56,
      "y": 0.62
    },
    {
      "label": "Executor",
      "x": 0.86,
      "y": 0.9
    }
  ],
  "checklistTitle": "Responsabilidade por camadas",
  "checklistItems": [
    "Definir metas permitidas",
    "Limitar ações críticas",
    "Registrar contexto e saídas",
    "Validar uso de ferramentas",
    "Atribuir revisão humana",
    "Preparar recurso e correção"
  ]
});

export const visuals = {
  "agencia-autonomia-limites-llms-hero": standardVisuals.hero,
  "agencia-autonomia-limites-llms-conceitos": standardVisuals.concept,
  "agencia-autonomia-limites-llms-loop-ferramentas": standardVisuals.pipeline,
  "agencia-autonomia-limites-llms-autonomia-vs-controle": standardVisuals.comparison,
  "agencia-autonomia-limites-llms-escalada": standardVisuals.tradeoff,
  "agencia-autonomia-limites-llms-responsabilidade": standardVisuals.checklist,
} satisfies LessonModule["visuals"];
