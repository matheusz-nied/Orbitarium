import type { LessonModule } from "../../../types/content";
import { buildComputacaoInteractions } from "../shared/lessonFactory";

export const interactions = buildComputacaoInteractions({
  "flow": {
    "id": "event-flow-lab",
    "eyebrow": "Mensageria",
    "title": "Siga uma mensagem da produção ao processamento",
    "description": "Veja onde publicação, retenção, consumo e confirmação introduzem os trade-offs do modelo assíncrono.",
    "tone": "indigo",
    "icon": "Workflow",
    "stages": [
      {
        "label": "Produtor",
        "detail": "Uma aplicação registra uma intenção de trabalho ou publica um fato relevante.",
        "cue": "evento nasce"
      },
      {
        "label": "Broker/log",
        "detail": "A mensagem é recebida, roteada, retida ou particionada conforme o modelo adotado.",
        "cue": "armazenar e encaminhar"
      },
      {
        "label": "Consumidor",
        "detail": "Um ou mais workers leem o item e executam a lógica correspondente.",
        "cue": "processamento"
      },
      {
        "label": "Confirmação/retry",
        "detail": "Falhas e sucessos mudam se a mensagem será confirmada, repetida ou desviada.",
        "cue": "entrega prática"
      },
      {
        "label": "Efeito de negócio",
        "detail": "O resultado real aparece em banco, integrações, notificações ou novos eventos.",
        "cue": "efeito final"
      }
    ]
  },
  "compare": {
    "id": "messaging-models-lab",
    "eyebrow": "Modelos",
    "title": "Compare fila clássica, pub/sub e log de eventos",
    "description": "Observe onde cada modelo costuma brilhar e que tipo de contrato operacional ele pede.",
    "tone": "violet",
    "icon": "ArrowRightLeft",
    "options": [
      {
        "label": "Fila clássica",
        "headline": "Boa para distribuir trabalho entre consumidores competidores",
        "bullets": [
          "Prioriza processamento de tarefas pendentes.",
          "Ajuda a nivelar picos de produção e consumo.",
          "Costuma enfatizar ack, retry e tratamento de falhas por mensagem."
        ]
      },
      {
        "label": "Pub/Sub",
        "headline": "Boa para disseminar um evento a múltiplos interessados",
        "bullets": [
          "Permite que diferentes consumidores reajam ao mesmo fato.",
          "Reduz acoplamento direto entre origem e destinos específicos.",
          "Exige atenção ao contrato do evento e à evolução dos assinantes."
        ]
      },
      {
        "label": "Log/stream",
        "headline": "Boa para retenção, replay e alto throughput orientado a partições",
        "bullets": [
          "Favorece leitura por posição e reprocessamento controlado.",
          "Escala bem com particionamento e consumer groups.",
          "Traz discussões fortes sobre ordem por chave e gerenciamento de offsets."
        ]
      }
    ]
  },
  "slider": {
    "id": "delivery-dial-lab",
    "eyebrow": "Entrega",
    "title": "Ajuste a estratégia operacional de entrega",
    "description": "Compare de fluxos frágeis sob repetição até consumidores desenhados para lidar bem com retries e atraso.",
    "tone": "emerald",
    "icon": "BarChart3",
    "axisLabel": "Postura de entrega",
    "states": [
      {
        "label": "Consumidor frágil",
        "summary": "A aplicação depende demais de entrega única implícita e sofre quando a mesma mensagem aparece de novo.",
        "leftLabel": "Simplicidade inicial",
        "leftValue": 80,
        "rightLabel": "Robustez sob falha",
        "rightValue": 28,
        "takeaway": "Parece simples até o primeiro retry em produção criar efeitos duplicados ou inconsistentes.",
        "metrics": [
          {
            "label": "Idempotência",
            "value": "Baixa"
          },
          {
            "label": "Retries",
            "value": "Perigosos"
          },
          {
            "label": "Observabilidade",
            "value": "Fraca"
          },
          {
            "label": "Risco operacional",
            "value": "Alto"
          }
        ]
      },
      {
        "label": "Consumidor cuidadoso",
        "summary": "Há algum controle de duplicidade, contratos razoáveis e monitoração básica de atraso e falha.",
        "leftLabel": "Simplicidade inicial",
        "leftValue": 58,
        "rightLabel": "Robustez sob falha",
        "rightValue": 74,
        "takeaway": "É um bom ponto médio para muitos sistemas orientados a eventos de produto.",
        "metrics": [
          {
            "label": "Idempotência",
            "value": "Boa"
          },
          {
            "label": "Retries",
            "value": "Gerenciáveis"
          },
          {
            "label": "Observabilidade",
            "value": "Razoável"
          },
          {
            "label": "Risco operacional",
            "value": "Moderado"
          }
        ]
      },
      {
        "label": "Arquitetura resiliente",
        "summary": "Contratos claros, consumers idempotentes e sinais operacionais fortes permitem absorver falhas e reprocessamentos com previsibilidade.",
        "leftLabel": "Simplicidade inicial",
        "leftValue": 34,
        "rightLabel": "Robustez sob falha",
        "rightValue": 92,
        "takeaway": "Exige mais modelagem, mas reduz surpresas em escala e sob falhas parciais inevitáveis.",
        "metrics": [
          {
            "label": "Idempotência",
            "value": "Alta"
          },
          {
            "label": "Retries",
            "value": "Seguros"
          },
          {
            "label": "Observabilidade",
            "value": "Forte"
          },
          {
            "label": "Risco operacional",
            "value": "Baixo"
          }
        ]
      }
    ]
  }
}) satisfies LessonModule["interactions"];
