import type { LessonModule } from "../../../types/content";
import { buildComputacaoVisuals } from "../shared/lessonFactory";

export const visuals = buildComputacaoVisuals({
  "hero": {
    "id": "rest-hero",
    "title": "APIs REST",
    "subtitle": "Semântica de protocolo como ferramenta de produto e operação",
    "chips": [
      "recursos",
      "métodos",
      "status",
      "idempotência",
      "retries"
    ]
  },
  "map": {
    "id": "rest-mapa",
    "title": "A semântica do HTTP pode fazer parte do contrato",
    "items": [
      {
        "label": "URI",
        "detail": "identifica recurso"
      },
      {
        "label": "Método",
        "detail": "expressa intenção"
      },
      {
        "label": "Headers",
        "detail": "contexto"
      },
      {
        "label": "Handler",
        "detail": "aplica regra"
      },
      {
        "label": "Status",
        "detail": "resume o resultado"
      }
    ],
    "caption": "uma boa API deixa o protocolo trabalhar a favor da clareza"
  },
  "summary": {
    "id": "rest-resumo",
    "title": "Três perguntas para ler qualquer endpoint",
    "panels": [
      {
        "label": "Qual recurso está em jogo?",
        "body": "Se isso não estiver claro, a URL pode estar escondendo RPC."
      },
      {
        "label": "O método combina com a intenção?",
        "body": "Método errado obriga o cliente a adivinhar semântica."
      },
      {
        "label": "Retry é seguro?",
        "body": "Falhas de rede fazem essa pergunta aparecer mais cedo ou mais tarde."
      }
    ],
    "footer": "semântica coerente reduz surpresa em consumo, debug e evolução do contrato"
  }
}) satisfies LessonModule["visuals"];
