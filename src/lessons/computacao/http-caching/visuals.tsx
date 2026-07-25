import type { LessonModule } from "../../../types/content";
import { createComputacaoVisuals } from "../_shared/factories";

const visualConfig = {
  "title": "HTTP Caching",
  "subtitle": "Freshness, revalidation e reaproveitamento: como reduzir round trips sem perder o controle sobre conteúdo velho, privado ou incorreto.",
  "level": "Intermediário",
  "tags": [
    "HTTP",
    "Caching",
    "ETag",
    "Cache-Control",
    "304",
    "CDN"
  ],
  "conceptNodes": [
    "Cache-Control",
    "ETag",
    "Last-Modified",
    "304 Not Modified"
  ],
  "pipelineSteps": [
    "Armazenamento com política",
    "Freshness check",
    "Revalidação",
    "Invalidação prática"
  ],
  "leftLabel": "frescor imediato",
  "rightLabel": "reaproveitamento agressivo",
  "impactRows": [
    {
      "label": "Unidade crítica",
      "value": "a representação HTTP acompanhada de seus cabeçalhos de cache e validação"
    },
    {
      "label": "Primeira etapa",
      "value": "Armazenamento com política"
    },
    {
      "label": "Erro comum",
      "value": "definir cabeçalhos de cache por costume ou por copiar e colar, sem pensar no tipo de resposta"
    },
    {
      "label": "Eixo de projeto",
      "value": "frescor imediato ↔ reaproveitamento agressivo"
    }
  ]
};

export const visuals = createComputacaoVisuals(visualConfig) satisfies LessonModule["visuals"];
