import type { LessonModule } from "../../../types/content";
import { createStandardLessonVisuals } from "../_shared/visualFactories";

const standardVisuals = createStandardLessonVisuals({
  "tone": "indigo",
  "heroTitle": "Três tradições, uma história em tensão",
  "heroSubtitle": "Regras explícitas, aprendizagem distribuída e escala contextual.",
  "heroSteps": [
    "Símbolos",
    "Redes",
    "Transformers"
  ],
  "heroFooter": "A história da IA alterna entre explicitar conhecimento e deixar o sistema aprendê-lo.",
  "conceptTitle": "Duas perguntas fundadoras",
  "conceptLeft": {
    "title": "Representar conhecimento",
    "body": "Como escrever estrutura, regras e conceitos de modo legível?"
  },
  "conceptRight": {
    "title": "Aprender com dados",
    "body": "Como ajustar parâmetros para descobrir regularidades úteis?"
  },
  "conceptFooter": "Grande parte da história da IA nasce do atrito entre essas duas perguntas.",
  "pipelineTitle": "Linha histórica simplificada",
  "pipelineSteps": [
    "Lógica",
    "Perceptron",
    "Especialistas",
    "Deep Learning",
    "Transformers"
  ],
  "comparisonTitle": "Duas forças permanentes",
  "comparisonLeft": {
    "title": "IA simbólica",
    "body": "Mais legibilidade e estrutura; menos flexibilidade para ambiguidade e escala aberta."
  },
  "comparisonRight": {
    "title": "IA conexionista",
    "body": "Mais adaptação e aprendizado; menos transparência direta sobre o que foi internalizado."
  },
  "tradeoffTitle": "Explicitude x adaptação aprendida",
  "tradeoffXAxis": "Mais adaptação a partir de dados",
  "tradeoffYAxis": "Mais estrutura explícita dada por humanos",
  "tradeoffPoints": [
    {
      "label": "Simbólica",
      "x": 0.18,
      "y": 0.84
    },
    {
      "label": "Híbrida",
      "x": 0.52,
      "y": 0.54
    },
    {
      "label": "Transformers",
      "x": 0.84,
      "y": 0.28
    }
  ],
  "checklistTitle": "Como ler a história sem mito",
  "checklistItems": [
    "Separar ideia, benchmark e produto",
    "Perguntar pelo custo de engenharia",
    "Observar dados e hardware",
    "Examinar o que foi realmente avaliado",
    "Evitar teleologia",
    "Reconhecer soluções híbridas"
  ]
});

export const visuals = {
  "historia-da-ia-hero": standardVisuals.hero,
  "historia-da-ia-mapa-fundador": standardVisuals.concept,
  "historia-da-ia-linha-do-tempo": standardVisuals.pipeline,
  "historia-da-ia-comparacao-tradicoes": standardVisuals.comparison,
  "historia-da-ia-tradeoffs": standardVisuals.tradeoff,
  "historia-da-ia-checklist": standardVisuals.checklist,
} satisfies LessonModule["visuals"];
