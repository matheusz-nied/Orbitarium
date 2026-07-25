import type { LessonModule } from "../../../types/content";
import { createStandardLessonVisuals } from "../_shared/visualFactories";

export const visuals = createStandardLessonVisuals({
  "tone": "violet",
  "heroTitle": "Prompt injection é um problema de confiança, não só de texto",
  "heroSubtitle": "Quando dados e comandos se misturam, a arquitetura precisa impor fronteiras que o modelo não reconhece sozinho",
  "heroSteps": [
    "Separar",
    "Limitar",
    "Observar"
  ],
  "heroFooter": "Quanto mais poder o sistema tem, mais importante é presumir que algum contexto será hostil.",
  "conceptTitle": "De onde veio esse texto e por que ele ganhou autoridade?",
  "conceptLeft": {
    "title": "Comando confiável",
    "body": "Políticas e instruções internas do sistema."
  },
  "conceptRight": {
    "title": "Conteúdo externo",
    "body": "Dados úteis, porém potencialmente manipuláveis e não confiáveis."
  },
  "conceptFooter": "Boa defesa começa distinguindo quem pode orientar e quem apenas informa.",
  "pipelineTitle": "Fluxo defensivo simplificado",
  "pipelineSteps": [
    "Classificar",
    "Delimitar",
    "Executar",
    "Filtrar",
    "Auditar"
  ],
  "comparisonTitle": "Mais poder, mais impacto potencial",
  "comparisonLeft": {
    "title": "Chat fechado",
    "body": "Menor superfície de ação e menor blast radius."
  },
  "comparisonRight": {
    "title": "Agente com ferramentas",
    "body": "Mais utilidade, porém superfície e impacto muito maiores."
  },
  "tradeoffTitle": "Capacidade operacional vs. risco de abuso de contexto",
  "tradeoffXAxis": "Poder do sistema",
  "tradeoffYAxis": "Risco se o contexto falhar",
  "tradeoffPoints": [
    {
      "label": "Chat isolado",
      "x": 0.18,
      "y": 0.18
    },
    {
      "label": "RAG",
      "x": 0.46,
      "y": 0.42
    },
    {
      "label": "Agente com ferramentas",
      "x": 0.8,
      "y": 0.82
    },
    {
      "label": "Agente com aprovações",
      "x": 0.76,
      "y": 0.52
    }
  ],
  "checklistTitle": "Checklist de defesa em LLM apps",
  "checklistItems": [
    "As fontes externas são tratadas como não confiáveis?",
    "Ferramentas têm privilégio mínimo?",
    "Existem barreiras para ações sensíveis?",
    "Conteúdo recuperado recebe marcação ou delimitação clara?",
    "Saídas e chamadas de ferramenta são observadas?",
    "Há plano para investigar e aprender com incidentes?"
  ]
}) satisfies LessonModule["visuals"];
