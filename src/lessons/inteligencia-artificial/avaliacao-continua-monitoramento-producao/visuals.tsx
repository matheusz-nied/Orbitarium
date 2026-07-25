import type { LessonModule } from "../../../types/content";
import { createStandardLessonVisuals } from "../_shared/visualFactories";

export const visuals = createStandardLessonVisuals({
  "tone": "teal",
  "heroTitle": "Monitorar é comparar o modelo prometido com o modelo realmente vivido em produção",
  "heroSubtitle": "Sem traces, feedback e alertas úteis, regressões silenciosas viram comportamento padrão do sistema",
  "heroSteps": [
    "Observar",
    "Comparar",
    "Responder"
  ],
  "heroFooter": "Produção não é o fim do treino; é o começo do aprendizado operacional do sistema.",
  "conceptTitle": "Uma métrica isolada não resume a saúde do sistema",
  "conceptLeft": {
    "title": "Dashboard agregado",
    "body": "Mostra tendência, mas pode esconder segmentos e casos raros."
  },
  "conceptRight": {
    "title": "Visão multimétrica",
    "body": "Combina qualidade, custo, latência e segurança de modo mais fiel."
  },
  "conceptFooter": "Avaliação contínua trabalha com vários sinais porque a produção falha de várias maneiras.",
  "pipelineTitle": "Ciclo de monitoramento útil",
  "pipelineSteps": [
    "Coletar",
    "Traçar",
    "Alertar",
    "Investigar",
    "Corrigir"
  ],
  "comparisonTitle": "Offline forte vs. online surpreendente",
  "comparisonLeft": {
    "title": "Validação offline",
    "body": "Necessária, porém limitada ao que foi medido em laboratório."
  },
  "comparisonRight": {
    "title": "Produção viva",
    "body": "Traz drift, skew, custos e padrões de uso que o offline não cobria."
  },
  "tradeoffTitle": "Cobertura de monitoramento vs. custo operacional",
  "tradeoffXAxis": "Cobertura e detalhe",
  "tradeoffYAxis": "Custo/complexidade operacional",
  "tradeoffPoints": [
    {
      "label": "Observação mínima",
      "x": 0.18,
      "y": 0.16
    },
    {
      "label": "Cobertura equilibrada",
      "x": 0.52,
      "y": 0.42
    },
    {
      "label": "Traces ricos",
      "x": 0.78,
      "y": 0.68
    },
    {
      "label": "Sampling inteligente",
      "x": 0.62,
      "y": 0.38
    }
  ],
  "checklistTitle": "Checklist de avaliação contínua",
  "checklistItems": [
    "As métricas representam a promessa do produto?",
    "Há traces e metadados suficientes para investigar casos estranhos?",
    "Skew e drift são observados por segmento?",
    "Feedback humano entra no ciclo de decisão?",
    "Alertas têm runbooks e responsáveis claros?",
    "Existe caminho seguro para rollback ou rollout gradual?"
  ]
}) satisfies LessonModule["visuals"];
