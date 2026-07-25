import type { LessonModule } from "../../../types/content";
import { buildComputacaoInteractions } from "../shared/lessonFactory";

export const interactions = buildComputacaoInteractions({
  "flow": {
    "id": "rest-request-lab",
    "eyebrow": "Requisição",
    "title": "Siga uma chamada REST ponta a ponta",
    "description": "Acompanhe intenção, roteamento, execução e resposta como partes do mesmo contrato.",
    "tone": "indigo",
    "icon": "Network",
    "stages": [
      {
        "label": "Cliente",
        "detail": "O consumidor escolhe método, URI, cabeçalhos e, quando necessário, corpo.",
        "cue": "intenção explícita"
      },
      {
        "label": "Rota do recurso",
        "detail": "O servidor identifica qual recurso ou coleção foi endereçado.",
        "cue": "identidade estável"
      },
      {
        "label": "Handler",
        "detail": "A lógica valida entrada, aplica regras e conversa com dependências internas.",
        "cue": "execução de negócio"
      },
      {
        "label": "Persistência/estado",
        "detail": "A operação toca estado durável ou consulta informações para montar a resposta.",
        "cue": "efeito real"
      },
      {
        "label": "Resposta HTTP",
        "detail": "Status, cabeçalhos e representação contam ao cliente o que aconteceu.",
        "cue": "contrato de retorno"
      }
    ]
  },
  "compare": {
    "id": "method-semantics-lab",
    "eyebrow": "Métodos",
    "title": "Compare a semântica dos métodos mais usados",
    "description": "Veja como o protocolo já sugere expectativas operacionais para cada verbo HTTP.",
    "tone": "violet",
    "icon": "ArrowRightLeft",
    "options": [
      {
        "label": "GET",
        "headline": "Leitura segura e naturalmente amigável a cache e retry",
        "bullets": [
          "Representa consulta do estado do recurso.",
          "Costuma ser seguro e idempotente.",
          "É o método que mais se beneficia de semântica limpa e observável."
        ]
      },
      {
        "label": "POST",
        "headline": "Método flexível, útil, mas mais ambíguo se abusado",
        "bullets": [
          "Muito usado para criação e comandos específicos.",
          "Não oferece idempotência por padrão.",
          "Quando usado para tudo, empurra semântica para dentro do corpo."
        ]
      },
      {
        "label": "PUT/DELETE",
        "headline": "Operações com semântica mais previsível para retries",
        "bullets": [
          "PUT tende a substituir ou definir estado de forma idempotente.",
          "DELETE é idempotente no efeito pretendido, mesmo se o status variar.",
          "Essas garantias ajudam muito na operação sob falha."
        ]
      }
    ]
  },
  "slider": {
    "id": "coupling-dial-lab",
    "eyebrow": "Contrato",
    "title": "Ajuste o quanto o cliente depende de convenções escondidas",
    "description": "Compare contratos mais chatos de operar com contratos mais semânticos e previsíveis.",
    "tone": "emerald",
    "icon": "BarChart3",
    "axisLabel": "Estilo de contrato",
    "states": [
      {
        "label": "RPC disfarçado",
        "summary": "URLs e métodos parecem HTTP, mas quase toda a semântica real vive em nomes de ação e payloads específicos.",
        "leftLabel": "Simplicidade imediata",
        "leftValue": 82,
        "rightLabel": "Robustez semântica",
        "rightValue": 28,
        "takeaway": "Pode ser rápido para começar, mas costuma cobrar caro em retries, docs e evolução.",
        "metrics": [
          {
            "label": "Adivinhação do cliente",
            "value": "Alta"
          },
          {
            "label": "Compatível com cache",
            "value": "Baixa"
          },
          {
            "label": "Retry seguro",
            "value": "Fraco"
          },
          {
            "label": "Evolução",
            "value": "Mais custosa"
          }
        ]
      },
      {
        "label": "REST coerente",
        "summary": "Recurso, método e status colaboram para contar a história principal do contrato.",
        "leftLabel": "Simplicidade imediata",
        "leftValue": 60,
        "rightLabel": "Robustez semântica",
        "rightValue": 78,
        "takeaway": "É o melhor equilíbrio para a maioria das APIs de produto e integração.",
        "metrics": [
          {
            "label": "Adivinhação do cliente",
            "value": "Baixa"
          },
          {
            "label": "Compatível com cache",
            "value": "Boa"
          },
          {
            "label": "Retry seguro",
            "value": "Melhor"
          },
          {
            "label": "Evolução",
            "value": "Mais estável"
          }
        ]
      },
      {
        "label": "REST + assíncrono",
        "summary": "A API assume operações longas com 202, polling ou webhooks sem abandonar a semântica do protocolo.",
        "leftLabel": "Simplicidade imediata",
        "leftValue": 34,
        "rightLabel": "Robustez semântica",
        "rightValue": 90,
        "takeaway": "Mais trabalho de desenho, porém mais aderente ao mundo real de tarefas demoradas e distribuídas.",
        "metrics": [
          {
            "label": "Adivinhação do cliente",
            "value": "Baixa"
          },
          {
            "label": "Compatível com cache",
            "value": "Situacional"
          },
          {
            "label": "Retry seguro",
            "value": "Bom"
          },
          {
            "label": "Evolução",
            "value": "Alta"
          }
        ]
      }
    ]
  }
}) satisfies LessonModule["interactions"];
