import type { LessonModule } from "../../../types/content";
import { createStandardLessonVisuals } from "../_shared/visualFactories";

export const visuals = createStandardLessonVisuals({
  "tone": "indigo",
  "heroTitle": "Privacidade em IA falha em muitos pontos pequenos, não só em um banco central",
  "heroSubtitle": "Coleta, logs, vendors e inferências sensíveis ampliam a superfície de risco ao longo do pipeline",
  "heroSteps": [
    "Minimizar",
    "Restringir",
    "Descartar"
  ],
  "heroFooter": "Quanto menos o dado circula, menos lugares existem para corrigir depois.",
  "conceptTitle": "PII depende de contexto e recombinação",
  "conceptLeft": {
    "title": "Campo isolado",
    "body": "Nem sempre parece sensível sozinho."
  },
  "conceptRight": {
    "title": "Atributos combinados",
    "body": "Podem identificar ou revelar muito mais do que parecia possível."
  },
  "conceptFooter": "Em IA, a capacidade de cruzar sinais aumenta a necessidade de pensar contextualmente.",
  "pipelineTitle": "Ciclo de vida do dado sensível",
  "pipelineSteps": [
    "Coletar",
    "Transformar",
    "Servir",
    "Observar",
    "Descartar"
  ],
  "comparisonTitle": "Observabilidade útil vs. exposição excessiva",
  "comparisonLeft": {
    "title": "Logging amplo",
    "body": "Facilita debugging, mas pode acumular PII demais."
  },
  "comparisonRight": {
    "title": "Observabilidade filtrada",
    "body": "Preserva diagnóstico com menos exposição e retenção."
  },
  "tradeoffTitle": "Utilidade operacional vs. risco de exposição",
  "tradeoffXAxis": "Detalhe operacional coletado",
  "tradeoffYAxis": "Risco de privacidade",
  "tradeoffPoints": [
    {
      "label": "Mínimo necessário",
      "x": 0.2,
      "y": 0.18
    },
    {
      "label": "Visibilidade moderada",
      "x": 0.46,
      "y": 0.36
    },
    {
      "label": "Logs completos",
      "x": 0.82,
      "y": 0.84
    },
    {
      "label": "Filtrado + retenção curta",
      "x": 0.54,
      "y": 0.28
    }
  ],
  "checklistTitle": "Checklist de privacidade por desenho",
  "checklistItems": [
    "O dado é realmente necessário para este propósito?",
    "Logs e traces foram desenhados com redaction e retenção?",
    "Acesso é restrito por função e ambiente?",
    "Há política clara para vendors e compartilhamento?",
    "O sistema considera risco de memorization e inferência sensível?",
    "Existe descarte seguro e auditável?"
  ]
}) satisfies LessonModule["visuals"];
