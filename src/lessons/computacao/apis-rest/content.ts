import type { LessonContent } from "../../../types/content";

export const apisRestContent: LessonContent = {
  "id": "apis-rest",
  "title": "APIs REST",
  "subtitle": "Recursos, métodos, status e idempotência: como transformar uma interface HTTP em um contrato legível, escalável e previsível.",
  "description": "Uma aula visual sobre recursos, URIs, métodos HTTP, status codes, idempotência, payloads, versionamento e os limites práticos do estilo REST.",
  "primaryCategoryId": "computacao",
  "secondaryCategoryId": "engenharia",
  "level": "Intermediário",
  "estimatedTime": "40-55 min",
  "tags": [
    "REST",
    "HTTP",
    "APIs",
    "Idempotência",
    "Status codes",
    "Backend",
    "Integrações"
  ],
  "learningObjectives": [
    "Explicar REST como estilo arquitetural e distinguir seu sentido acadêmico estrito do uso pragmático comum em APIs HTTP.",
    "Distinguir recursos, representações e operações.",
    "Relacionar métodos HTTP à semântica de leitura, criação, substituição e remoção.",
    "Entender por que idempotência importa para retries, caches e confiabilidade.",
    "Interpretar classes de status code como parte do contrato e da observabilidade da API.",
    "Reconhecer quando uma API parece REST na URL, mas ainda opera como RPC acoplado."
  ],
  "prerequisites": [
    "Noção básica de cliente, servidor e requisições web.",
    "Curiosidade sobre como frontends e serviços se conectam.",
    "Experiência prévia consumindo alguma API ajuda, mas não é obrigatória."
  ],
  "references": [
    {
      "title": "HTTP request methods",
      "source": "MDN Web Docs",
      "url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods",
      "note": "Resumo oficial e didático sobre métodos HTTP, segurança, cache e idempotência."
    },
    {
      "title": "HTTP response status codes",
      "source": "MDN Web Docs",
      "url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status",
      "note": "Referência oficial e organizada dos códigos de status HTTP."
    },
    {
      "title": "Idempotent",
      "source": "MDN Web Docs",
      "url": "https://developer.mozilla.org/en-US/docs/Glossary/Idempotent",
      "note": "Explicação clara da ideia de idempotência em HTTP."
    },
    {
      "title": "RFC 9110: HTTP Semantics",
      "source": "IETF RFC Editor",
      "url": "https://www.rfc-editor.org/rfc/rfc9110.html",
      "note": "Especificação moderna da semântica HTTP."
    },
    {
      "title": "Architectural Styles and the Design of Network-based Software Architectures",
      "source": "Roy Fielding",
      "url": "https://ics.uci.edu/~fielding/pubs/dissertation/top.htm",
      "note": "Texto clássico que introduz e contextualiza REST."
    }
  ],
  "heroVisual": "rest-hero",
  "openingText": "Uma API REST bem desenhada não é uma coleção arbitrária de endpoints com verbos em inglês. Ela é um contrato que usa o vocabulário do HTTP de forma coerente: recursos têm nomes estáveis, operações têm semântica previsível e respostas contam ao cliente o que aconteceu e o que fazer em seguida. No sentido acadêmico estrito de Roy Fielding, REST ainda inclui restrições como statelessness, cache, mensagens autodescritivas e hipermídia; na indústria, porém, o nome costuma ser usado de modo mais pragmático para APIs HTTP orientadas a recursos. Isso parece detalhe de estilo até o dia em que retries, caches, debuggers, logs e consumidores múltiplos entram em cena. Aí a semântica deixa de ser estética e vira engenharia de confiabilidade.",
  "quickFacts": [
    {
      "title": "Nem toda HTTP API é REST completo",
      "body": "No uso de mercado, “REST” muitas vezes nomeia APIs orientadas a recursos; academicamente, o estilo também envolve restrições como statelessness, cache e hipermídia."
    },
    {
      "title": "Métodos carregam semântica",
      "body": "GET, POST, PUT e DELETE não são só nomes diferentes para fazer algo."
    },
    {
      "title": "Idempotência ajuda a operar",
      "body": "Ela torna retries mais seguros e reduz ambiguidades em falhas de rede."
    }
  ],
  "sections": [
    {
      "id": "recurso-e-representacao",
      "eyebrow": "Modelo",
      "title": "REST começa por recursos, não por funções do servidor",
      "lead": "O foco sai do qual procedimento chamar e vai para qual entidade ou coleção está sendo representada.",
      "visual": "rest-mapa",
      "paragraphs": [
        "Quando uma API expõe /usuarios/42, o cliente enxerga um recurso com identidade relativamente estável. Já endpoints como /fazerLoginAgora ou /gerarRelatorioFinal apontam mais para verbos imperativos do que para recursos estruturados.",
        "Esse deslocamento de foco melhora legibilidade, reduz acoplamento e facilita reaproveitar o próprio protocolo HTTP de forma mais coerente."
      ],
      "blocks": [
        {
          "type": "definition",
          "title": "Recurso",
          "body": "Entidade ou coleção identificável por uma URI e manipulada por meio de representações."
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Achar que REST é só colocar substantivos na rota. O importante é a semântica completa, não apenas o nome da URL."
        }
      ]
    },
    {
      "id": "request-flow",
      "eyebrow": "Fluxo",
      "title": "Uma chamada REST bem formada carrega intenção, contexto e expectativa de resposta",
      "lead": "Cliente, método, URI, cabeçalhos e corpo participam juntos do contrato.",
      "interactive": "rest-request-lab",
      "paragraphs": [
        "O método descreve a intenção geral. A URI localiza o recurso. Cabeçalhos negociam formato, autenticação, cache e contexto. O corpo carrega dados quando necessário. A resposta devolve status, metadados e, às vezes, uma nova representação.",
        "Quando esses elementos ficam coerentes, a API conversa melhor com browsers, proxies, gateways, SDKs, ferramentas de teste e times humanos."
      ],
      "blocks": [
        {
          "type": "example",
          "title": "Exemplo",
          "body": "GET /pedidos/123 indica leitura de um recurso específico; o status e o corpo esclarecem se ele existe, mudou ou falhou por autorização."
        },
        {
          "type": "insight",
          "title": "HTTP já traz muito pronto",
          "body": "Uma boa API REST reaproveita a semântica do protocolo em vez de reinventar tudo no corpo da resposta."
        }
      ]
    },
    {
      "id": "metodos",
      "eyebrow": "Semântica",
      "title": "Métodos HTTP carregam expectativas operacionais reais",
      "lead": "Mudar o método certo não é perfumaria; muda como clientes e infraestrutura podem se comportar.",
      "interactive": "method-semantics-lab",
      "paragraphs": [
        "GET tende a ser seguro e idempotente. PUT e DELETE são idempotentes, mas não seguros. POST é flexível, porém não carrega essa mesma garantia. Essas distinções importam para caches, retries automáticos e interpretação do contrato.",
        "Quando um endpoint usa POST para tudo, parte desse valor se perde: o cliente precisa adivinhar a semântica em vez de herdá-la do protocolo."
      ],
      "blocks": [
        {
          "type": "definition",
          "title": "Método idempotente",
          "body": "Método cujo efeito pretendido no servidor é o mesmo quando a mesma requisição é repetida."
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Supor que idempotência significa que a resposta precisa ser idêntica. O contrato fala do efeito pretendido, não necessariamente do mesmo status ou corpo."
        }
      ]
    },
    {
      "id": "status-codes",
      "eyebrow": "Contrato",
      "title": "Status codes são parte da interface, não rodapé de implementação",
      "lead": "Eles ajudam o cliente a decidir próximos passos sem abrir o corpo na tentativa e erro.",
      "paragraphs": [
        "Classes 2xx, 4xx e 5xx contam histórias diferentes: sucesso, erro do cliente e erro do servidor. 202 indica aceitação assíncrona; 204 indica sucesso sem corpo; 409 e 422 ajudam a distinguir conflitos de validação e estado.",
        "Quanto melhor essa semântica é usada, mais fácil fica depurar integrações, monitorar a saúde da API e construir clientes robustos."
      ],
      "blocks": [
        {
          "type": "example",
          "title": "Exemplo",
          "body": "Retornar 202 Accepted para um processamento assíncrono ajuda o cliente a entender que o trabalho começou, mas ainda não terminou."
        },
        {
          "type": "insight",
          "title": "Status bem usado reduz acoplamento",
          "body": "O cliente consegue reagir melhor sem depender de convenções escondidas dentro do JSON."
        }
      ]
    },
    {
      "id": "idempotencia-e-operacao",
      "eyebrow": "Trade-off",
      "title": "Idempotência conversa diretamente com falhas de rede e retries",
      "lead": "Em sistemas reais, o cliente nem sempre sabe se a primeira tentativa chegou ao servidor.",
      "interactive": "coupling-dial-lab",
      "paragraphs": [
        "Se uma conexão cai após o envio, o cliente pode precisar tentar de novo. Em operações idempotentes, esse retry é mais fácil de raciocinar. Em operações não idempotentes, duplicidade vira risco operacional de verdade.",
        "Por isso o desenho do contrato precisa pensar não só no caminho feliz, mas também em timeouts, gateways, filas internas e comportamento sob falha parcial."
      ],
      "blocks": [
        {
          "type": "definition",
          "title": "Retry seguro",
          "body": "Nova tentativa que preserva o efeito pretendido quando a semântica da operação foi desenhada para suportá-la."
        },
        {
          "type": "example",
          "title": "Exemplo",
          "body": "Atualizar o estado inteiro de um recurso com PUT tende a ser mais previsível para retries do que um POST genérico com múltiplos significados."
        }
      ]
    },
    {
      "id": "limites-do-estilo",
      "eyebrow": "Prática",
      "title": "Nem toda API precisa ser purista, mas toda API ganha com semântica coerente",
      "lead": "REST é um estilo; a meta não é dogma, e sim previsibilidade e interoperabilidade.",
      "visual": "rest-resumo",
      "paragraphs": [
        "No sentido acadêmico estrito, REST combina restrições como cliente-servidor, ausência de estado na interação, cache, interface uniforme, camadas e, opcionalmente, code-on-demand. Dentro da interface uniforme entram identificação de recursos, manipulação por representações, mensagens autodescritivas e hipermídia como motor do estado da aplicação.",
        "Há casos em que operações assíncronas, comandos específicos ou workflows complexos pedem adaptações. O problema não é sair do purismo; o problema é abandonar semântica a ponto de tornar retries, observabilidade e evolução do contrato imprevisíveis. Muitas APIs chamadas de REST no mercado são, mais precisamente, APIs HTTP orientadas a recursos com apenas parte dessas restrições.",
        "A boa pergunta é: o protocolo continua ajudando os consumidores ou tudo foi empurrado para convenções implícitas no corpo?"
      ],
      "blocks": [
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Confundir flexibilidade com arbitrariedade. APIs incoerentes cobram essa conta no consumo, na operação e na evolução."
        },
        {
          "type": "insight",
          "title": "Critério prático",
          "body": "Uma API madura reduz surpresa: o cliente certo precisa adivinhar cada vez menos."
        }
      ]
    },
    {
      "id": "sintese-operacional",
      "eyebrow": "Síntese",
      "title": "Checklist mental para desenhar e ler uma API",
      "lead": "Use os cartões para revisar recurso, método, status e retries.",
      "interactive": "summary-cards",
      "paragraphs": [
        "Consolide os pontos que mais reduzem surpresa em integrações reais."
      ]
    },
    {
      "id": "quiz-revisao",
      "eyebrow": "Revisão",
      "title": "Quiz de revisão",
      "lead": "Cheque se os pilares semânticos do estilo REST ficaram conectados.",
      "interactive": "quiz",
      "paragraphs": [
        "As perguntas enfatizam método, contrato e operação sob falha."
      ]
    },
    {
      "id": "glossario",
      "eyebrow": "Vocabulário",
      "title": "Glossário essencial",
      "lead": "Termos recorrentes em APIs, gateways, docs e integrações.",
      "interactive": "glossary",
      "paragraphs": [
        "Use o glossário como referência rápida ao consumir ou projetar contratos HTTP."
      ]
    }
  ],
  "summaryCards": [
    {
      "title": "Recurso antes de função",
      "body": "Pensar em entidades e coleções ajuda a explorar melhor a semântica do HTTP."
    },
    {
      "title": "Método e status comunicam intenção",
      "body": "Boa parte do contrato pode ser entendida sem decifrar JSONs arbitrários."
    },
    {
      "title": "Idempotência protege operação",
      "body": "Retries e falhas de rede ficam muito mais previsíveis quando o contrato assume esse cenário."
    }
  ],
  "quiz": [
    {
      "id": "q1",
      "prompt": "Em REST, qual é a unidade mental principal?",
      "options": [
        {
          "id": "a",
          "label": "O recurso representado por uma URI."
        },
        {
          "id": "b",
          "label": "A função privada do servidor."
        },
        {
          "id": "c",
          "label": "O número de tabelas do banco."
        }
      ],
      "correctOptionId": "a",
      "feedback": "REST organiza o contrato em torno de recursos e representações."
    },
    {
      "id": "q2",
      "prompt": "Qual afirmação sobre GET é adequada?",
      "options": [
        {
          "id": "a",
          "label": "GET costuma ser seguro e idempotente."
        },
        {
          "id": "b",
          "label": "GET deve criar registros por padrão."
        },
        {
          "id": "c",
          "label": "GET sempre exige corpo JSON."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Essa é a semântica esperada do método GET."
    },
    {
      "id": "q3",
      "prompt": "O que idempotência descreve?",
      "options": [
        {
          "id": "a",
          "label": "O efeito pretendido de repetir a mesma requisição."
        },
        {
          "id": "b",
          "label": "A obrigatoriedade de mesma resposta byte a byte."
        },
        {
          "id": "c",
          "label": "O tamanho máximo do payload."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Idempotência fala do efeito pretendido no servidor."
    },
    {
      "id": "q4",
      "prompt": "Por que status codes importam?",
      "options": [
        {
          "id": "a",
          "label": "Porque fazem parte do contrato e ajudam o cliente a reagir corretamente."
        },
        {
          "id": "b",
          "label": "Porque substituem autenticação."
        },
        {
          "id": "c",
          "label": "Porque aumentam o clock da CPU."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Status bem usados reduzem ambiguidade entre cliente e servidor."
    },
    {
      "id": "q5",
      "prompt": "Qual cenário combina mais com 202 Accepted?",
      "options": [
        {
          "id": "a",
          "label": "Trabalho aceito, mas ainda em processamento assíncrono."
        },
        {
          "id": "b",
          "label": "Recurso removido definitivamente."
        },
        {
          "id": "c",
          "label": "Token expirado."
        }
      ],
      "correctOptionId": "a",
      "feedback": "202 é apropriado quando o processamento ainda não terminou."
    },
    {
      "id": "q6",
      "prompt": "Quando uma API usa POST para tudo, o que costuma acontecer?",
      "options": [
        {
          "id": "a",
          "label": "Parte da semântica do protocolo se perde e o cliente precisa adivinhar mais."
        },
        {
          "id": "b",
          "label": "A idempotência aumenta automaticamente."
        },
        {
          "id": "c",
          "label": "O contrato fica sempre mais claro."
        }
      ],
      "correctOptionId": "a",
      "feedback": "O excesso de POST genérico costuma empurrar semântica para convenções ocultas."
    },
    {
      "id": "q7",
      "prompt": "Qual pergunta operacional a idempotência ajuda a responder?",
      "options": [
        {
          "id": "a",
          "label": "Posso tentar de novo sem medo do efeito duplicado?"
        },
        {
          "id": "b",
          "label": "Qual é a cor do deploy?"
        },
        {
          "id": "c",
          "label": "Quantos monitores o time usa?"
        }
      ],
      "correctOptionId": "a",
      "feedback": "Retries são um dos lugares onde idempotência mais aparece na prática."
    },
    {
      "id": "q8",
      "prompt": "REST exige purismo absoluto para ser útil?",
      "options": [
        {
          "id": "a",
          "label": "Não; o importante é manter semântica coerente e previsível."
        },
        {
          "id": "b",
          "label": "Sim, qualquer exceção invalida o protocolo."
        },
        {
          "id": "c",
          "label": "Só funciona com GraphQL desligado."
        }
      ],
      "correctOptionId": "a",
      "feedback": "O valor está na coerência do contrato, não em dogma."
    }
  ],
  "glossary": [
    {
      "term": "REST",
      "definition": "Estilo arquitetural descrito por Roy Fielding com restrições como cliente-servidor, statelessness, cache, interface uniforme e hipermídia; em uso comum, o nome também é aplicado a muitas APIs HTTP orientadas a recursos."
    },
    {
      "term": "Recurso",
      "definition": "Entidade ou coleção identificável por URI."
    },
    {
      "term": "Representação",
      "definition": "Forma serializada de um recurso, como JSON ou XML."
    },
    {
      "term": "URI",
      "definition": "Identificador do recurso exposto pela API."
    },
    {
      "term": "GET",
      "definition": "Método HTTP tipicamente usado para leitura, seguro e idempotente."
    },
    {
      "term": "POST",
      "definition": "Método HTTP flexível, comumente usado para criação ou ações não idempotentes."
    },
    {
      "term": "PUT",
      "definition": "Método HTTP geralmente associado à substituição idempotente de um recurso."
    },
    {
      "term": "DELETE",
      "definition": "Método HTTP usado para remoção e considerado idempotente em sua semântica pretendida."
    },
    {
      "term": "Idempotência",
      "definition": "Propriedade segundo a qual repetir a mesma operação mantém o mesmo efeito pretendido."
    },
    {
      "term": "Status code",
      "definition": "Código numérico HTTP que resume o resultado semântico da requisição."
    },
    {
      "term": "Retry",
      "definition": "Nova tentativa de requisição após falha, timeout ou dúvida sobre entrega."
    }
  ],
  "relatedTopics": [
    {
      "title": "Autenticação e Autorização",
      "body": "Leve o contrato REST para o desenho de identidade e permissões nas rotas."
    },
    {
      "title": "TLS e HTTPS",
      "body": "Conecte semântica de aplicação com proteção do canal de transporte."
    }
  ]
};
