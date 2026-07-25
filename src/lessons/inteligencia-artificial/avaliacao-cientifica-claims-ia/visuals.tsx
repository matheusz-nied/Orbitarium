import type { LessonModule } from "../../../types/content";
import { createStandardLessonVisuals } from "../_shared/visualFactories";

const standardVisuals = createStandardLessonVisuals({
  "tone": "teal",
  "heroTitle": "Score alto, claim forte — cadê a ponte?",
  "heroSubtitle": "Resultados precisam de desenho, controle e documentação para ganhar peso científico.",
  "heroSteps": [
    "Experimento",
    "Resultado",
    "Interpretação"
  ],
  "heroFooter": "O salto entre score e narrativa é onde muita má ciência acontece.",
  "conceptTitle": "Validade em duas camadas",
  "conceptLeft": {
    "title": "Validade interna",
    "body": "O experimento testou corretamente o que dizia testar?"
  },
  "conceptRight": {
    "title": "Validade externa",
    "body": "A conclusão se transfere para além do cenário medido?"
  },
  "conceptFooter": "Score sem validade suficiente não sustenta claim ambicioso.",
  "pipelineTitle": "Pipeline oculto da avaliação",
  "pipelineSteps": [
    "Dados",
    "Prompt",
    "Judge",
    "Agregação",
    "Relato"
  ],
  "comparisonTitle": "Benchmark e interpretação",
  "comparisonLeft": {
    "title": "Resultado localizado",
    "body": "Mede desempenho sob um protocolo concreto, com escopo e limitações definidos."
  },
  "comparisonRight": {
    "title": "Claim inflado",
    "body": "Generaliza demais a partir de um recorte estreito ou mal documentado."
  },
  "tradeoffTitle": "Escopo do claim x força necessária da evidência",
  "tradeoffXAxis": "Claim mais amplo e ambicioso",
  "tradeoffYAxis": "Exigência maior de robustez metodológica",
  "tradeoffPoints": [
    {
      "label": "Score local",
      "x": 0.18,
      "y": 0.26
    },
    {
      "label": "Capacidade específica",
      "x": 0.54,
      "y": 0.62
    },
    {
      "label": "Generalização ampla",
      "x": 0.86,
      "y": 0.92
    }
  ],
  "checklistTitle": "Checklist de reporting",
  "checklistItems": [
    "Relatar dados e escopo",
    "Descrever prompt e judge",
    "Publicar baselines e seeds",
    "Mostrar ablações",
    "Discutir leakage",
    "Limitar o claim ao desenho"
  ]
});

export const visuals = {
  "avaliacao-cientifica-claims-ia-hero": standardVisuals.hero,
  "avaliacao-cientifica-claims-ia-validade": standardVisuals.concept,
  "avaliacao-cientifica-claims-ia-pipeline-eval": standardVisuals.pipeline,
  "avaliacao-cientifica-claims-ia-benchmark-vs-claim": standardVisuals.comparison,
  "avaliacao-cientifica-claims-ia-forca-da-evidencia": standardVisuals.tradeoff,
  "avaliacao-cientifica-claims-ia-reporting": standardVisuals.checklist,
} satisfies LessonModule["visuals"];
