import type { LessonModule } from "../../../types/content";
import { buildComputacaoVisuals } from "../shared/lessonFactory";

export const visuals = buildComputacaoVisuals({
  "hero": {
    "id": "event-hero",
    "title": "Filas e Arquitetura Event-Driven",
    "subtitle": "Desacoplar no tempo sem perder de vista entrega, ordem e operação",
    "chips": [
      "fila",
      "evento",
      "retry",
      "idempotência",
      "backpressure"
    ]
  },
  "map": {
    "id": "event-mapa",
    "title": "Do pico de produção ao efeito assíncrono controlado",
    "items": [
      {
        "label": "Produtor",
        "detail": "gera intenção"
      },
      {
        "label": "Broker",
        "detail": "segura o ritmo"
      },
      {
        "label": "Consumidor",
        "detail": "processa depois"
      },
      {
        "label": "Retry",
        "detail": "lida com falha"
      },
      {
        "label": "Resultado",
        "detail": "efeito de negócio"
      }
    ],
    "caption": "assíncrono maduro troca acoplamento imediato por contratos e operação mais explícitos"
  },
  "summary": {
    "id": "event-resumo",
    "title": "Três perguntas para revisar seu fluxo assíncrono",
    "panels": [
      {
        "label": "Qual é o contrato do evento?",
        "body": "Formato, significado e evolução precisam ser claros para todos os consumidores."
      },
      {
        "label": "Como o sistema reage a repetição?",
        "body": "Retries e redeliveries pedem idempotência e observabilidade de efeitos."
      },
      {
        "label": "O atraso está visível?",
        "body": "Sem sinais de fila, idade e DLQ, o problema aparece tarde demais."
      }
    ],
    "footer": "arquitetura orientada a eventos boa torna atraso, repetição e ordem problemas visíveis e governáveis"
  }
}) satisfies LessonModule["visuals"];
