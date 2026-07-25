import type { LessonContent } from "../../../types/content";

export const filasEArquiteturaEventDrivenContent: LessonContent = {
  "id": "filas-e-arquitetura-event-driven",
  "title": "Filas e Arquitetura Event-Driven",
  "subtitle": "Como desacoplar produtores e consumidores sem perder de vista entrega, ordem, retries e idempotência.",
  "description": "Uma aula visual sobre filas, eventos, brokers, streams, semântica de entrega, consumer groups, backpressure e os cuidados práticos de arquiteturas assíncronas.",
  "primaryCategoryId": "computacao",
  "secondaryCategoryId": "engenharia",
  "level": "Intermediário",
  "estimatedTime": "45-60 min",
  "tags": [
    "Filas",
    "Eventos",
    "Mensageria",
    "Kafka",
    "RabbitMQ",
    "Backpressure",
    "Idempotência"
  ],
  "learningObjectives": [
    "Explicar por que filas e eventos reduzem acoplamento temporal e protegem sistemas sob carga irregular.",
    "Distinguir fila, broker de mensagens e stream de eventos em termos de uso e trade-offs.",
    "Relacionar semântica de entrega com retries, duplicidade e desenho de consumidores idempotentes.",
    "Entender efeitos de ordenação, partições, consumer groups e paralelismo.",
    "Reconhecer backpressure, dead letters e observabilidade como partes da operação assíncrona.",
    "Evitar erros comuns como supor exactly once em todo o sistema ou esquecer o contrato do evento."
  ],
  "prerequisites": [
    "Noção básica de APIs, serviços ou comunicação entre sistemas.",
    "Familiaridade com falhas de rede ou tarefas demoradas ajuda bastante.",
    "Interesse por integração e escalabilidade de backend."
  ],
  "references": [
    {
      "title": "Queues",
      "source": "RabbitMQ Documentation",
      "url": "https://www.rabbitmq.com/docs/queues",
      "note": "Conceitos oficiais sobre filas, mensagens e consumo."
    },
    {
      "title": "AMQP 0-9-1 Model Explained",
      "source": "RabbitMQ Documentation",
      "url": "https://www.rabbitmq.com/tutorials/amqp-concepts",
      "note": "Modelo conceitual de exchanges, bindings e filas."
    },
    {
      "title": "Introduction",
      "source": "Apache Kafka Documentation",
      "url": "https://kafka.apache.org/intro",
      "note": "Introdução oficial ao modelo de log distribuído e streaming."
    },
    {
      "title": "Event-driven architecture",
      "source": "AWS",
      "url": "https://aws.amazon.com/event-driven-architecture/",
      "note": "Visão prática de arquitetura orientada a eventos em sistemas modernos."
    },
    {
      "title": "Event-driven architecture style",
      "source": "Microsoft Learn",
      "url": "https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/event-driven",
      "note": "Guia oficial sobre o estilo arquitetural e seus trade-offs."
    },
    {
      "title": "CloudEvents",
      "source": "Cloud Native Computing Foundation",
      "url": "https://cloudevents.io/",
      "note": "Especificação aberta e reconhecida para descrição de eventos."
    }
  ],
  "heroVisual": "event-hero",
  "openingText": "Quando tudo depende de chamadas síncronas em cascata, o sistema fica rápido apenas enquanto o mundo coopera. Um pico de carga, uma dependência lenta ou um processamento mais pesado pode transformar cada requisição em uma fila invisível espalhada por threads e timeouts. Filas e arquiteturas orientadas a eventos tornam essa espera explícita, desacoplam etapas e permitem que produtores e consumidores evoluam em ritmos diferentes. Mas o ganho vem junto com novas perguntas: quem confirma entrega, como lidar com duplicidade, o que é ordem suficiente e onde o atraso vira problema de produto?",
  "quickFacts": [
    {
      "title": "Assíncrono desacopla no tempo",
      "body": "Produtor e consumidor não precisam estar prontos exatamente no mesmo instante."
    },
    {
      "title": "Entrega não é mágica",
      "body": "Retries e falhas parciais fazem duplicidade e atraso aparecerem cedo ou tarde."
    },
    {
      "title": "Evento também é contrato",
      "body": "Formato, significado e versionamento do evento afetam todos os consumidores."
    }
  ],
  "sections": [
    {
      "id": "por-que-filas",
      "eyebrow": "Fundamento",
      "title": "Filas tornam explícito um desacoplamento que sistemas síncronos escondem mal",
      "lead": "Quando a produção chega mais rápido do que o consumo, a espera existe de qualquer forma; a fila apenas a modela de modo controlável.",
      "visual": "event-mapa",
      "paragraphs": [
        "Em muitos sistemas, o tempo já está sendo usado como amortecedor, mas de maneira implícita: threads bloqueadas, conexões abertas, timeouts em cascata e usuários aguardando passos que poderiam ser delegados. Filas e eventos transformam isso em um mecanismo explícito e operável.",
        "O principal ganho é reduzir acoplamento temporal: o produtor pode registrar intenção de trabalho e seguir adiante, enquanto o consumidor processa no ritmo que a capacidade e a prioridade permitirem."
      ],
      "blocks": [
        {
          "type": "definition",
          "title": "Desacoplamento temporal",
          "body": "Capacidade de produtor e consumidor atuarem em momentos diferentes sem dependência síncrona direta."
        },
        {
          "type": "insight",
          "title": "Fila não é gambiarra",
          "body": "Ela é uma forma explícita de controlar espera, explosão de carga e ritmo de processamento."
        }
      ]
    },
    {
      "id": "fluxo-orientado-a-eventos",
      "eyebrow": "Fluxo",
      "title": "Entre produzir e consumir há publicação, roteamento, armazenamento e confirmação",
      "lead": "A jornada da mensagem envolve mais etapas do que “mandar e receber”.",
      "interactive": "event-flow-lab",
      "paragraphs": [
        "O produtor cria uma mensagem ou evento. Um broker ou log distribuído recebe, organiza e disponibiliza esse dado. Consumidores leem, processam e confirmam ou repetem a tentativa segundo o modelo adotado. Em cada salto podem ocorrer atraso, retry, duplicidade e reordenação.",
        "Entender essa trilha ajuda a desenhar sistemas que não dependem de entrega perfeita e instantânea para continuar corretos."
      ],
      "blocks": [
        {
          "type": "example",
          "title": "Exemplo",
          "body": "Uma compra pode registrar o pedido agora e delegar emissão de e-mail, antifraude e atualização analítica para consumidores independentes."
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Modelar mensageria como se ela se comportasse como chamada síncrona sem latência, retry ou perda temporária."
        }
      ]
    },
    {
      "id": "modelos-de-mensageria",
      "eyebrow": "Comparação",
      "title": "Fila, pub/sub e log de eventos favorecem necessidades diferentes",
      "lead": "A mesma palavra “evento” esconde modelos com garantias e ergonomias bem distintas.",
      "interactive": "messaging-models-lab",
      "paragraphs": [
        "Filas clássicas ajudam a distribuir trabalho entre consumidores competidores. Modelos pub/sub replicam informação para múltiplos assinantes interessados. Logs de eventos e streams priorizam retenção, replay e particionamento orientado a throughput e histórico.",
        "Escolher bem o modelo evita tentar forçar exatamente os mesmos hábitos operacionais em tecnologias e garantias diferentes."
      ],
      "blocks": [
        {
          "type": "definition",
          "title": "Broker",
          "body": "Componente intermediário que recebe, organiza e entrega mensagens conforme regras do sistema."
        },
        {
          "type": "insight",
          "title": "Nome parecido, comportamento diferente",
          "body": "Fila e stream podem resolver problemas relacionados, mas com ergonomias muito distintas."
        }
      ]
    },
    {
      "id": "semantica-de-entrega",
      "eyebrow": "Trade-off",
      "title": "Entrega prática sempre conversa com idempotência e repetição",
      "lead": "Retries e confirmações tornam duplicidade uma possibilidade natural, não uma exceção exótica.",
      "interactive": "delivery-dial-lab",
      "paragraphs": [
        "Muitas arquiteturas operam com pelo menos uma entrega e delegam ao consumidor a responsabilidade de lidar com reprocessamento. Isso exige idempotência, deduplicação ou desenho de efeitos seguros sob repetição.",
        "Promessas fortes como exactly once costumam depender de escopo bem delimitado. Em um sistema inteiro com múltiplas integrações, persistências e efeitos externos, o que conta é o comportamento final sob falha, não o slogan do produto."
      ],
      "blocks": [
        {
          "type": "definition",
          "title": "Idempotência",
          "body": "Propriedade segundo a qual repetir a mesma operação não altera o efeito pretendido além da primeira aplicação válida."
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Supor que o broker sozinho garante exatamente uma execução sem exigir desenho cuidadoso do consumidor e do estado."
        }
      ]
    },
    {
      "id": "ordem-e-paralelismo",
      "eyebrow": "Escala",
      "title": "Ordem total é cara; paralelismo barato raramente preserva tudo",
      "lead": "Particionar trabalho melhora throughput, mas obriga a decidir qual ordem realmente importa para o domínio.",
      "paragraphs": [
        "Em muitos cenários, basta manter ordem por chave de entidade, e não uma ordem global do sistema inteiro. Essa distinção permite usar partições, consumer groups e distribuição horizontal com muito mais eficiência.",
        "A pergunta saudável é: qual sequência precisa ser preservada para que o negócio continue correto? Tudo além disso pode ser custo desnecessário ou gargalo artificial."
      ],
      "blocks": [
        {
          "type": "example",
          "title": "Exemplo",
          "body": "Atualizações da mesma conta bancária talvez precisem de ordem por conta; eventos de contas diferentes podem andar em paralelo."
        },
        {
          "type": "definition",
          "title": "Consumer group",
          "body": "Conjunto de consumidores que compartilha o trabalho de leitura de uma mesma fonte lógica de eventos."
        }
      ]
    },
    {
      "id": "backpressure-e-operacao",
      "eyebrow": "Operação",
      "title": "Backpressure, filas mortas e observabilidade são o lado adulto do processamento assíncrono",
      "lead": "Quando o consumo fica atrás, o sistema precisa expor atraso, controlar ritmo e tratar mensagens problemáticas de forma explícita.",
      "visual": "event-resumo",
      "paragraphs": [
        "Profundidade da fila, idade das mensagens, taxa de retry, falhas por consumidor e volume em dead-letter queues são sinais operacionais centrais. Sem isso, o sistema parece estável até o dia em que o atraso se transforma em impacto de negócio.",
        "Arquiteturas event-driven boas não escondem a complexidade assíncrona; elas a tornam observável e governável com métricas, contratos e playbooks claros."
      ],
      "blocks": [
        {
          "type": "definition",
          "title": "Backpressure",
          "body": "Mecanismo ou situação em que o ritmo de produção precisa ser limitado pelo ritmo sustentável de consumo."
        },
        {
          "type": "insight",
          "title": "Fila cheia é sinal, não detalhe",
          "body": "Acúmulo pode indicar sucesso momentâneo sob pico ou falha estrutural de capacidade e processamento."
        }
      ]
    },
    {
      "id": "sintese-operacional",
      "eyebrow": "Síntese",
      "title": "Checklist mental para arquiteturas orientadas a eventos",
      "lead": "Revise contrato, entrega, ordem e observabilidade antes de empurrar tudo para “assíncrono”.",
      "interactive": "summary-cards",
      "paragraphs": [
        "Use os cartões para consolidar as decisões que mais influenciam robustez e clareza operacional."
      ]
    },
    {
      "id": "quiz-revisao",
      "eyebrow": "Revisão",
      "title": "Quiz de revisão",
      "lead": "Teste sua intuição sobre desacoplamento, entrega e consumidores idempotentes.",
      "interactive": "quiz",
      "paragraphs": [
        "As perguntas enfatizam trade-offs reais de mensageria e operação assíncrona."
      ]
    },
    {
      "id": "glossario",
      "eyebrow": "Vocabulário",
      "title": "Glossário essencial",
      "lead": "Termos recorrentes em brokers, streams e integrações orientadas a eventos.",
      "interactive": "glossary",
      "paragraphs": [
        "Consulte o glossário ao ler docs de Kafka, RabbitMQ e plataformas de integração."
      ]
    }
  ],
  "summaryCards": [
    {
      "title": "Assíncrono desacopla no tempo",
      "body": "Filas e eventos permitem separar produção de consumo sem exigir resposta imediata."
    },
    {
      "title": "Entrega forte exige consumidor forte",
      "body": "Retries e duplicidade tornam idempotência uma preocupação de desenho, não um detalhe."
    },
    {
      "title": "Operação precisa enxergar atraso",
      "body": "Profundidade de fila, idade de mensagem e DLQ contam a história real do sistema assíncrono."
    }
  ],
  "quiz": [
    {
      "id": "q1",
      "prompt": "Qual problema filas ajudam a atacar com mais clareza?",
      "options": [
        {
          "id": "a",
          "label": "Acoplamento temporal entre produzir e consumir trabalho."
        },
        {
          "id": "b",
          "label": "Falta de memória RAM no navegador."
        },
        {
          "id": "c",
          "label": "Escolha de tipografia da interface."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Filas ajudam especialmente quando produção e consumo não precisam acontecer no mesmo instante."
    },
    {
      "id": "q2",
      "prompt": "Qual afirmação sobre sistemas assíncronos é mais realista?",
      "options": [
        {
          "id": "a",
          "label": "Retries, atraso e duplicidade são possibilidades normais do modelo."
        },
        {
          "id": "b",
          "label": "Toda mensagem sempre será processada exatamente uma vez em qualquer cenário."
        },
        {
          "id": "c",
          "label": "A ordem global é gratuita em qualquer escala."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Falhas parciais tornam esses efeitos parte do desenho normal."
    },
    {
      "id": "q3",
      "prompt": "Para que serve um broker?",
      "options": [
        {
          "id": "a",
          "label": "Receber, organizar e disponibilizar mensagens ou eventos entre produtores e consumidores."
        },
        {
          "id": "b",
          "label": "Substituir certificados TLS."
        },
        {
          "id": "c",
          "label": "Renderizar páginas HTML no navegador."
        }
      ],
      "correctOptionId": "a",
      "feedback": "O broker medeia o fluxo de mensagens."
    },
    {
      "id": "q4",
      "prompt": "Por que idempotência importa em consumidores?",
      "options": [
        {
          "id": "a",
          "label": "Porque retries e redeliveries podem repetir a mesma intenção de trabalho."
        },
        {
          "id": "b",
          "label": "Porque ela aumenta o tamanho da fila."
        },
        {
          "id": "c",
          "label": "Porque ela impede o uso de partições."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Idempotência reduz o risco de efeitos duplicados sob repetição."
    },
    {
      "id": "q5",
      "prompt": "Qual trade-off aparece ao aumentar paralelismo?",
      "options": [
        {
          "id": "a",
          "label": "A necessidade de decidir que nível de ordenação realmente importa."
        },
        {
          "id": "b",
          "label": "A eliminação total de falhas de rede."
        },
        {
          "id": "c",
          "label": "A remoção de qualquer necessidade de observabilidade."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Paralelismo e ordem costumam disputar os mesmos recursos e garantias."
    },
    {
      "id": "q6",
      "prompt": "O que é backpressure?",
      "options": [
        {
          "id": "a",
          "label": "Situação ou mecanismo em que a produção precisa respeitar o ritmo sustentável de consumo."
        },
        {
          "id": "b",
          "label": "Um tipo de certificado digital."
        },
        {
          "id": "c",
          "label": "Uma técnica de minificação de JavaScript."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Backpressure aparece quando o sistema precisa controlar acúmulo e saturação."
    },
    {
      "id": "q7",
      "prompt": "Qual é um uso típico de dead-letter queue?",
      "options": [
        {
          "id": "a",
          "label": "Separar mensagens que falharam repetidamente para inspeção ou tratamento especial."
        },
        {
          "id": "b",
          "label": "Garantir ordem global perfeita."
        },
        {
          "id": "c",
          "label": "Substituir o banco de dados principal."
        }
      ],
      "correctOptionId": "a",
      "feedback": "DLQ ajuda a isolar casos problemáticos sem travar todo o fluxo."
    },
    {
      "id": "q8",
      "prompt": "Qual erro conceitual é comum em arquitetura event-driven?",
      "options": [
        {
          "id": "a",
          "label": "Achar que “exactly once” do marketing resolve sozinho todos os efeitos externos do sistema."
        },
        {
          "id": "b",
          "label": "Usar eventos como contrato entre componentes."
        },
        {
          "id": "c",
          "label": "Medir idade das mensagens na fila."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Garantias locais não eliminam a necessidade de desenho robusto ponta a ponta."
    }
  ],
  "glossary": [
    {
      "term": "Fila",
      "definition": "Estrutura lógica em que mensagens aguardam consumo ou processamento posterior."
    },
    {
      "term": "Evento",
      "definition": "Registro de algo que aconteceu e pode interessar a outros componentes."
    },
    {
      "term": "Broker",
      "definition": "Intermediário que recebe, organiza e distribui mensagens ou eventos."
    },
    {
      "term": "Pub/Sub",
      "definition": "Modelo em que múltiplos assinantes podem receber publicações relevantes."
    },
    {
      "term": "Stream",
      "definition": "Fluxo ordenado de registros, muitas vezes com retenção e possibilidade de replay."
    },
    {
      "term": "Consumer group",
      "definition": "Grupo de consumidores que divide trabalho de uma mesma fonte lógica."
    },
    {
      "term": "Offset",
      "definition": "Posição de leitura dentro de uma sequência ou log de eventos."
    },
    {
      "term": "Idempotência",
      "definition": "Propriedade de manter o mesmo efeito pretendido quando uma operação é repetida."
    },
    {
      "term": "Dead-letter queue",
      "definition": "Destino para mensagens que falharam repetidamente ou exigem tratamento separado."
    },
    {
      "term": "Backpressure",
      "definition": "Pressão exercida pelo limite de consumo sobre o ritmo de produção."
    },
    {
      "term": "Replay",
      "definition": "Reprocessamento de eventos já armazenados a partir de uma posição anterior."
    }
  ],
  "relatedTopics": [
    {
      "title": "Observabilidade de Sistemas",
      "body": "Sistemas assíncronos exigem sinais bons para enxergar atraso, retries e gargalos distribuídos."
    },
    {
      "title": "APIs REST",
      "body": "Chamadas síncronas e processamento assíncrono frequentemente convivem na mesma arquitetura."
    }
  ]
};
