import type { LessonModule } from "../../../types/content";
import { createStandardLessonVisuals } from "../_shared/visualFactories";

const standardVisuals = createStandardLessonVisuals({
  "tone": "amber",
  "heroTitle": "Explicar o quê, para quem e com qual fidelidade?",
  "heroSubtitle": "Boa explicação depende de finalidade, usuário e limite da técnica.",
  "heroSteps": [
    "Predição",
    "Explicação",
    "Ação"
  ],
  "heroFooter": "Uma explicação convincente nem sempre é uma explicação fiel.",
  "conceptTitle": "Mapa conceitual de XAI",
  "conceptLeft": {
    "title": "Acesso ao mecanismo",
    "body": "Interpretabilidade sugere estrutura legível ou diretamente inspecionável."
  },
  "conceptRight": {
    "title": "Relato sobre o mecanismo",
    "body": "Explicabilidade inclui aproximações pós-hoc e justificativas voltadas a usuários."
  },
  "conceptFooter": "Transparência e rastreabilidade orbitam o problema, mas não o esgotam.",
  "pipelineTitle": "Ferramentas e perguntas",
  "pipelineSteps": [
    "Caso",
    "Perturbar",
    "Atribuir",
    "Comparar",
    "Validar"
  ],
  "comparisonTitle": "Fidelidade e utilidade",
  "comparisonLeft": {
    "title": "Explicação fiel",
    "body": "Representa melhor o modelo, mas pode ser difícil de entender ou usar."
  },
  "comparisonRight": {
    "title": "Explicação útil",
    "body": "Ajuda alguém a agir ou revisar um caso, mas pode simplificar demais o mecanismo."
  },
  "tradeoffTitle": "Complexidade do modelo x exigência de governança",
  "tradeoffXAxis": "Mais complexidade opaca",
  "tradeoffYAxis": "Mais exigência de legibilidade e justificativa",
  "tradeoffPoints": [
    {
      "label": "Exploração",
      "x": 0.28,
      "y": 0.34
    },
    {
      "label": "Produto",
      "x": 0.58,
      "y": 0.56
    },
    {
      "label": "Alto risco",
      "x": 0.82,
      "y": 0.86
    }
  ],
  "checklistTitle": "Checklist por audiência",
  "checklistItems": [
    "Definir usuário da explicação",
    "Dizer escopo local ou global",
    "Medir estabilidade",
    "Relatar limite de fidelidade",
    "Separar depuração de justificativa",
    "Escolher modelo com prudência"
  ]
});

export const visuals = {
  "explicabilidade-interpretabilidade-hero": standardVisuals.hero,
  "explicabilidade-interpretabilidade-mapa-conceitos": standardVisuals.concept,
  "explicabilidade-interpretabilidade-ferramentas": standardVisuals.pipeline,
  "explicabilidade-interpretabilidade-fidelidade-vs-utilidade": standardVisuals.comparison,
  "explicabilidade-interpretabilidade-tradeoffs": standardVisuals.tradeoff,
  "explicabilidade-interpretabilidade-stakeholders": standardVisuals.checklist,
} satisfies LessonModule["visuals"];
