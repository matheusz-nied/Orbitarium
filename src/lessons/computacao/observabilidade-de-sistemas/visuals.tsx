import type { LessonModule } from "../../../types/content";
import { buildComputacaoVisuals } from "../shared/lessonFactory";

export const visuals = buildComputacaoVisuals({
  "hero": {
    "id": "observability-hero",
    "title": "Observabilidade de Sistemas",
    "subtitle": "Perguntas melhores para entender sistemas reais em produção",
    "chips": [
      "logs",
      "métricas",
      "traces",
      "SLOs",
      "contexto"
    ]
  },
  "map": {
    "id": "observability-mapa",
    "title": "Do sinal bruto à decisão operacional",
    "items": [
      {
        "label": "Evento",
        "detail": "algo aconteceu"
      },
      {
        "label": "Contexto",
        "detail": "quem e onde?"
      },
      {
        "label": "Coleta",
        "detail": "o que ficou?"
      },
      {
        "label": "Consulta",
        "detail": "que pergunta faço?"
      },
      {
        "label": "Ação",
        "detail": "como respondo?"
      }
    ],
    "caption": "observabilidade madura aproxima sintomas técnicos de decisões operacionais úteis"
  },
  "summary": {
    "id": "observability-resumo",
    "title": "Três perguntas para revisar sua telemetria",
    "panels": [
      {
        "label": "Consigo correlacionar os sinais?",
        "body": "Sem contexto compartilhado, cada fonte conta uma história separada."
      },
      {
        "label": "Estou medindo o que importa?",
        "body": "SLIs e SLOs ajudam a escolher sinais com valor operacional real."
      },
      {
        "label": "O alerta é acionável?",
        "body": "Ruído demais enfraquece confiança e resposta a incidentes."
      }
    ],
    "footer": "telemetria útil é a que reduz adivinhação quando o sistema surpreende"
  }
}) satisfies LessonModule["visuals"];
