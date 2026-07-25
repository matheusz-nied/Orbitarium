import type { LessonContent } from "../../../types/content";

export const graphqlComoContratoContent: LessonContent = {
  "id": "graphql-como-contrato",
  "title": "GraphQL como Contrato de API",
  "subtitle": "Schema tipado, resolvers e custo de execução: o que muda quando o cliente escolhe o formato da resposta.",
  "description": "Uma aula sobre schema, queries, resolvers, validação, N+1, autorização em nível de campo e a diferença entre flexibilidade de cliente e disciplina operacional.",
  "primaryCategoryId": "computacao",
  "secondaryCategoryId": "engenharia",
  "level": "Intermediário",
  "estimatedTime": "50-60 min",
  "tags": [
    "GraphQL",
    "API",
    "Schema",
    "Resolvers",
    "Contrato",
    "N+1"
  ],
  "learningObjectives": [
    "Entender GraphQL como contrato tipado entre cliente e servidor.",
    "Relacionar consulta, validação e execução de resolvers no mesmo fluxo mental.",
    "Perceber riscos como N+1, over-flexibility e autorização mal posicionada.",
    "Comparar ergonomia de cliente com custo operacional do backend."
  ],
  "prerequisites": [
    "Noção básica de APIs e JSON.",
    "Ajuda ter visto REST, mas não é obrigatório.",
    "Curiosidade sobre contratos entre frontend e backend."
  ],
  "references": [
    {
      "title": "GraphQL Learn",
      "source": "GraphQL.org",
      "url": "https://graphql.org/learn/",
      "note": "Visão geral oficial da linguagem e do ecossistema."
    },
    {
      "title": "Schemas and Types",
      "source": "GraphQL.org",
      "url": "https://graphql.org/learn/schema/",
      "note": "Base para entender GraphQL como contrato tipado."
    },
    {
      "title": "Queries and Mutations",
      "source": "GraphQL.org",
      "url": "https://graphql.org/learn/queries/",
      "note": "Mostra como o cliente especifica exatamente os campos desejados."
    },
    {
      "title": "Serving over HTTP",
      "source": "GraphQL.org",
      "url": "https://graphql.org/learn/serving-over-http/",
      "note": "Ponte prática entre o contrato GraphQL e a operação sobre HTTP."
    },
    {
      "title": "GraphQL Specification",
      "source": "GraphQL Foundation",
      "url": "https://spec.graphql.org/October2021/",
      "note": "Especificação formal da linguagem e do sistema de tipos."
    }
  ],
  "heroVisual": "lesson-hero",
  "openingText": "GraphQL costuma ser vendido como resposta elegante para overfetching e para explosão de endpoints. Isso é verdade só pela metade. O ganho real aparece quando o schema vira um contrato claro e o servidor continua controlando custo, autorização e composição. Sem esse segundo pedaço, a flexibilidade vira dívida operacional.",
  "quickFacts": [
    {
      "title": "Unidade crítica",
      "body": "o tipo, o campo e o resolver responsável por produzi-lo"
    },
    {
      "title": "Trade-off central",
      "body": "rigidez do servidor ↔ flexibilidade do cliente"
    },
    {
      "title": "Regra prática",
      "body": "trate o schema como produto, instrumente resolvers e explicite limites de custo e autorização"
    }
  ],
  "sections": [
    {
      "id": "motivacao",
      "eyebrow": "Motivação",
      "title": "Por que GraphQL como Contrato de API aparece em sistemas sérios",
      "lead": "Expor um contrato tipado em que clientes pedem campos e o servidor os resolve com políticas explícitas muda latência, custo, previsibilidade ou segurança. Por isso, o tema aparece cedo em qualquer sistema que sai do protótipo.",
      "visual": "lesson-hero",
      "paragraphs": [
        "GraphQL como Contrato de API existe para expor um contrato tipado em que clientes pedem campos e o servidor os resolve com políticas explícitas. Sem isso, clientes espalham chamadas ad hoc, superpedem dados ou dependem de múltiplos endpoints frágeis.",
        "Um bom modelo intuitivo é pensar no schema como menu e contrato, enquanto resolvers funcionam como a cozinha que compõe os dados. Pense em um app mobile que precisa perfil, feed e permissões em uma única forma de resposta coerente.",
        "Esse assunto importa porque afeta ergonomia de cliente, custo de resolução, evolução de contrato e segurança de acesso a dados. Quando você o entende, decisões de arquitetura deixam de parecer um conjunto de truques desconexos."
      ],
      "blocks": [
        {
          "type": "insight",
          "title": "Intuição útil",
          "body": "pensar no schema como menu e contrato, enquanto resolvers funcionam como a cozinha que compõe os dados"
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "achar que GraphQL elimina a necessidade de desenho de API, caching e controle de autorização"
        }
      ]
    },
    {
      "id": "modelo-mental",
      "eyebrow": "Modelo mental",
      "title": "A abstração certa para não decorar sem entender",
      "lead": "Boas decisões de engenharia nascem de uma abstração operacional simples: o que está sendo movido, validado, sincronizado ou reaproveitado?",
      "visual": "concept-grid",
      "paragraphs": [
        "Definição operacional: linguagem de consulta e sistema de schema em que tipos e campos definem o contrato e resolvers executam o trabalho necessário.",
        "A unidade crítica para raciocinar sobre custo e comportamento é o tipo, o campo e o resolver responsável por produzi-lo. É nela que atrasos, contenção ou corrupção costumam aparecer primeiro.",
        "Quando você enxerga a unidade certa, fica mais fácil separar sintoma de causa. Isso evita o atalho mental de achar que achar que graphql elimina a necessidade de desenho de api, caching e controle de autorização."
      ],
      "blocks": [
        {
          "type": "definition",
          "title": "Definição",
          "body": "linguagem de consulta e sistema de schema em que tipos e campos definem o contrato e resolvers executam o trabalho necessário"
        },
        {
          "type": "example",
          "title": "Exemplo concreto",
          "body": "um app mobile que precisa perfil, feed e permissões em uma única forma de resposta coerente"
        }
      ]
    },
    {
      "id": "fluxo-essencial",
      "eyebrow": "Fluxo",
      "title": "O caminho que os dados percorrem",
      "lead": "Quase todo gargalo difícil nasce quando esquecemos que há uma sequência de etapas, e que cada uma delas impõe uma política diferente.",
      "visual": "pipeline-diagram",
      "interactive": "pipeline-lab",
      "paragraphs": [
        "Em alto nível, o fluxo é o cliente envia uma query, o servidor valida contra o schema, executa resolvers e devolve uma resposta no mesmo formato estrutural pedido.",
        "Em vez de decorar siglas, vale observar a ordem das decisões: schema e validação, execução de resolvers, batching e políticas e resposta estruturada. O desenho muda de tema para tema, mas a disciplina mental é a mesma.",
        "A pergunta importante não é apenas 'qual etapa existe?'. A pergunta melhor é 'onde a decisão errada se propaga e quanto custa corrigi-la depois?'."
      ],
      "blocks": [
        {
          "type": "example",
          "title": "Etapas para observar",
          "body": "Use a interação para percorrer a pipeline e notar onde surgem classificação, mediação, sincronização, persistência ou reaproveitamento.",
          "items": [
            "Schema e validação",
            "Execução de resolvers",
            "Batching e políticas",
            "Resposta estruturada"
          ]
        },
        {
          "type": "insight",
          "title": "Fluxos distribuem responsabilidade",
          "body": "Uma etapa ruim costuma contaminar as seguintes. Por isso times experientes observam não só o resultado final, mas também o caminho percorrido."
        }
      ]
    },
    {
      "id": "tradeoffs",
      "eyebrow": "Trade-offs",
      "title": "A escolha que nunca é gratuita",
      "lead": "Sistemas bons não maximizam um único número. Eles escolhem conscientemente qual dor reduzir agora e qual custo aceitar depois.",
      "visual": "tradeoff-spectrum",
      "interactive": "tradeoff-lab",
      "paragraphs": [
        "O eixo central desta aula vai de rigidez do servidor até flexibilidade do cliente. Quanto mais flexível o cliente fica para montar respostas, mais disciplina o servidor precisa ter para controlar custo, batching, autorização e limites de profundidade.",
        "Empurrar o desenho demais para um extremo tende a simplificar uma parte e complicar outra. O trabalho do arquiteto é tornar essa troca visível, não escondê-la atrás de defaults.",
        "Por isso, a pergunta madura não é 'qual tecnologia vence?'. É 'qual ponto do eixo faz sentido para este perfil de tráfego, risco e equipe?'."
      ],
      "blocks": [
        {
          "type": "insight",
          "title": "Projeto é posicionamento",
          "body": "O eixo 'rigidez do servidor ↔ flexibilidade do cliente' existe porque cada ponta otimiza uma propriedade diferente do sistema."
        },
        {
          "type": "mistake",
          "title": "O mito do extremo ideal",
          "body": "Quando alguém trata um extremo como solução universal, geralmente está escondendo custos operacionais, latência, consistência ou carga cognitiva."
        }
      ]
    },
    {
      "id": "falhas-e-armadilhas",
      "eyebrow": "Armadilhas",
      "title": "Onde equipes experientes ainda escorregam",
      "lead": "A maioria dos incidentes não nasce da teoria errada, e sim de suposições implícitas que ninguém modelou até o sistema crescer.",
      "paragraphs": [
        "O erro recorrente é achar que graphql elimina a necessidade de desenho de api, caching e controle de autorização. Isso costuma soar plausível porque a abstração superficial parece simples demais.",
        "Na prática, o limite aparece quando queries profundas, resolvers ingênuos e acesso a campos sensíveis passam despercebidos até o sistema ficar caro ou inseguro. É nesse ponto que o sistema revela o que realmente estava sendo garantido - ou apenas assumido.",
        "Tratar esses limites como detalhes raros é caro. Tratá-los como parte do desenho inicial economiza incidentes, retrabalho e debates improdutivos depois."
      ],
      "blocks": [
        {
          "type": "mistake",
          "title": "Suposição perigosa",
          "body": "achar que GraphQL elimina a necessidade de desenho de API, caching e controle de autorização"
        },
        {
          "type": "insight",
          "title": "Limites são parte da especificação",
          "body": "queries profundas, resolvers ingênuos e acesso a campos sensíveis passam despercebidos até o sistema ficar caro ou inseguro"
        }
      ]
    },
    {
      "id": "decisoes-de-projeto",
      "eyebrow": "Prática",
      "title": "Como decidir em vez de só repetir padrões",
      "lead": "Padrão bom é padrão contextualizado. Sem cenário, benchmark e política, a mesma técnica vira conselho ruim.",
      "interactive": "scenario-lab",
      "paragraphs": [
        "Uma regra prática desta aula é trate o schema como produto, instrumente resolvers e explicite limites de custo e autorização.",
        "Repare nos cenários propostos: app mobile enxuto, dashboard agregador e campos sensíveis. O mecanismo é o mesmo, mas a decisão muda conforme estado, risco e tipo de carga.",
        "É por isso que bons times documentam intenção, observam métricas e revisam o desenho quando o contexto operacional muda."
      ],
      "blocks": [
        {
          "type": "example",
          "title": "Heurística de decisão",
          "body": "As recomendações abaixo não são receitas eternas; elas são pontos de partida guiados pelo mecanismo que a aula explicou.",
          "items": [
            "Usar um schema claro e selecionar somente os campos necessários.",
            "Investir em resolvers compostos, batching e ownership de schema.",
            "Aplicar autorização por campo e por resolver, não só por endpoint."
          ]
        },
        {
          "type": "definition",
          "title": "Regra prática",
          "body": "trate o schema como produto, instrumente resolvers e explicite limites de custo e autorização"
        }
      ]
    },
    {
      "id": "pontes",
      "eyebrow": "Conexões",
      "title": "Como este fundamento reaparece em outros sistemas",
      "lead": "Uma boa aula de computação não fecha em si mesma. Ela amplia sua capacidade de interpretar bancos, redes, runtimes, browsers e produtos de IA.",
      "visual": "impact-board",
      "paragraphs": [
        "Interfaces de IA que agregam múltiplas fontes de dados também ganham com contratos ricos, desde que custo e permissão continuem observáveis.",
        "Em produtos modernos, a mesma lógica reaparece em APIs, jobs assíncronos, pipelines de dados, páginas web, storage, modelos e plataformas internas.",
        "Aprender este tópico dá vocabulário para discutir latência, throughput, integridade, consistência, segurança e custo com mais precisão técnica."
      ],
      "blocks": [
        {
          "type": "insight",
          "title": "Transferência de modelo mental",
          "body": "ergonomia de cliente, custo de resolução, evolução de contrato e segurança de acesso a dados"
        }
      ]
    },
    {
      "id": "quiz-revisao",
      "eyebrow": "Revisão",
      "title": "Quiz de revisão",
      "lead": "Use o quiz para checar se mecanismo, trade-off e armadilhas ficaram conectados como um único raciocínio.",
      "interactive": "quiz",
      "paragraphs": [
        "O objetivo não é decorar frases, e sim verificar se você consegue explicar onde a abstração ajuda, onde ela falha e como decidir melhor em um sistema real."
      ]
    },
    {
      "id": "glossario",
      "eyebrow": "Glossário",
      "title": "Vocabulário para continuar estudando",
      "lead": "Feche a aula consolidando termos que aparecem em documentação, incidentes, artigos técnicos e discussões de arquitetura.",
      "interactive": "glossary",
      "paragraphs": [
        "Dominar esse vocabulário acelera leitura de documentação oficial, revisão de incidentes e conversas com outras camadas do stack."
      ]
    }
  ],
  "summaryCards": [
    {
      "title": "Problema que resolve",
      "body": "expor um contrato tipado em que clientes pedem campos e o servidor os resolve com políticas explícitas"
    },
    {
      "title": "Modelo mental",
      "body": "pensar no schema como menu e contrato, enquanto resolvers funcionam como a cozinha que compõe os dados"
    },
    {
      "title": "Erro comum",
      "body": "achar que GraphQL elimina a necessidade de desenho de API, caching e controle de autorização"
    },
    {
      "title": "Onde reaparece",
      "body": "Interfaces de IA que agregam múltiplas fontes de dados também ganham com contratos ricos, desde que custo e permissão continuem observáveis"
    }
  ],
  "quiz": [
    {
      "id": "q1",
      "prompt": "Qual é a função principal de GraphQL como Contrato de API em um sistema?",
      "options": [
        {
          "id": "a",
          "label": "expor um contrato tipado em que clientes pedem campos e o servidor os resolve com políticas explícitas"
        },
        {
          "id": "b",
          "label": "Substituir todas as outras camadas do stack por uma única técnica."
        },
        {
          "id": "c",
          "label": "Eliminar por definição qualquer latência, falha ou custo."
        }
      ],
      "correctOptionId": "a",
      "feedback": "A ideia central da aula é expor um contrato tipado em que clientes pedem campos e o servidor os resolve com políticas explícitas. O tema melhora o projeto do sistema, mas não apaga restrições físicas nem substitui todas as outras camadas."
    },
    {
      "id": "q2",
      "prompt": "Qual modelo mental ajuda mais a entender graphql como contrato de api?",
      "options": [
        {
          "id": "a",
          "label": "pensar no schema como menu e contrato, enquanto resolvers funcionam como a cozinha que compõe os dados"
        },
        {
          "id": "b",
          "label": "Pensar apenas na interface visual, ignorando o mecanismo interno."
        },
        {
          "id": "c",
          "label": "Assumir que graphql como contrato de api resolve sozinho qualquer gargalo restante."
        }
      ],
      "correctOptionId": "a",
      "feedback": "O melhor atalho mental aqui é: pensar no schema como menu e contrato, enquanto resolvers funcionam como a cozinha que compõe os dados. Esse modelo ajuda a prever custo, limite e comportamento operacional."
    },
    {
      "id": "q3",
      "prompt": "No fluxo estudado, qual etapa aparece cedo e condiciona decisões posteriores?",
      "options": [
        {
          "id": "a",
          "label": "Schema e validação"
        },
        {
          "id": "b",
          "label": "Resposta estruturada"
        },
        {
          "id": "c",
          "label": "Uma etapa mágica que elimina a necessidade de observar o sistema."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Schema e validação acontece cedo e molda o resto do caminho. Erros de classificação ou roteamento se propagam com facilidade."
    },
    {
      "id": "q4",
      "prompt": "Qual afirmação descreve melhor o trade-off central da aula?",
      "options": [
        {
          "id": "a",
          "label": "O objetivo é equilibrar rigidez do servidor e flexibilidade do cliente, não maximizar um extremo automaticamente."
        },
        {
          "id": "b",
          "label": "Sempre vale empurrar tudo para flexibilidade do cliente."
        },
        {
          "id": "c",
          "label": "Sempre vale empurrar tudo para rigidez do servidor."
        }
      ],
      "correctOptionId": "a",
      "feedback": "O eixo 'rigidez do servidor ↔ flexibilidade do cliente' existe porque cada extremo resolve uma dor e cria outra. Projeto maduro explicita essa troca."
    },
    {
      "id": "q5",
      "prompt": "Qual das opções abaixo representa um erro comum discutido na aula?",
      "options": [
        {
          "id": "a",
          "label": "achar que GraphQL elimina a necessidade de desenho de API, caching e controle de autorização"
        },
        {
          "id": "b",
          "label": "trate o schema como produto, instrumente resolvers e explicite limites de custo e autorização"
        },
        {
          "id": "c",
          "label": "Medir hipóteses antes de alterar um sistema que já está em produção."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Este é o atalho mental perigoso do tema: achar que graphql elimina a necessidade de desenho de api, caching e controle de autorização. A aula insiste em tornar essas suposições explícitas."
    },
    {
      "id": "q6",
      "prompt": "Pensando em cenários reais, qual decisão inicial está mais alinhada com a aula?",
      "options": [
        {
          "id": "a",
          "label": "Usar um schema claro e selecionar somente os campos necessários."
        },
        {
          "id": "b",
          "label": "Investir em resolvers compostos, batching e ownership de schema."
        },
        {
          "id": "c",
          "label": "Aplicar autorização por campo e por resolver, não só por endpoint."
        }
      ],
      "correctOptionId": "a",
      "feedback": "No primeiro cenário, a recomendação é usar um schema claro e selecionar somente os campos necessários.. A solução depende do mecanismo certo para o caso, não de um padrão aplicado sem contexto."
    },
    {
      "id": "q7",
      "prompt": "Por que este tema também importa para sistemas de IA e produtos modernos?",
      "options": [
        {
          "id": "a",
          "label": "Interfaces de IA que agregam múltiplas fontes de dados também ganham com contratos ricos, desde que custo e permissão continuem observáveis"
        },
        {
          "id": "b",
          "label": "Porque produtos de IA não dependem de infraestrutura, segurança ou dados."
        },
        {
          "id": "c",
          "label": "Porque modelos grandes fazem arquitetura e operação deixarem de importar."
        }
      ],
      "correctOptionId": "a",
      "feedback": "A ponte da aula é direta: interfaces de ia que agregam múltiplas fontes de dados também ganham com contratos ricos, desde que custo e permissão continuem observáveis. Os mesmos fundamentos reaparecem em serving, dados, rede, storage e operação."
    },
    {
      "id": "q8",
      "prompt": "O que costuma quebrar ou exigir cuidado adicional neste tema?",
      "options": [
        {
          "id": "a",
          "label": "queries profundas, resolvers ingênuos e acesso a campos sensíveis passam despercebidos até o sistema ficar caro ou inseguro"
        },
        {
          "id": "b",
          "label": "Somente o nome das variáveis ou detalhes cosméticos da interface."
        },
        {
          "id": "c",
          "label": "Nada relevante: testes básicos já eliminam esse tipo de risco completamente."
        }
      ],
      "correctOptionId": "a",
      "feedback": "O limite importante aqui é concreto: queries profundas, resolvers ingênuos e acesso a campos sensíveis passam despercebidos até o sistema ficar caro ou inseguro. Em sistemas reais, garantias dependem de política, falha, carga e integração entre camadas."
    }
  ],
  "glossary": [
    {
      "term": "Schema",
      "definition": "Descrição tipada dos tipos, campos e operações expostos pela API."
    },
    {
      "term": "Resolver",
      "definition": "Função ou lógica que produz o valor de um campo em uma operação GraphQL."
    },
    {
      "term": "Query",
      "definition": "Operação de leitura em GraphQL."
    },
    {
      "term": "Mutation",
      "definition": "Operação que representa mudança de estado."
    },
    {
      "term": "Field selection",
      "definition": "Escolha explícita dos campos desejados pelo cliente."
    },
    {
      "term": "Introspection",
      "definition": "Capacidade de consultar o próprio schema por meio da API."
    },
    {
      "term": "N+1",
      "definition": "Padrão ineficiente em que cada item dispara nova busca e multiplica custo."
    },
    {
      "term": "Federation",
      "definition": "Modelo em que múltiplos subgrafos compõem uma visão única para o cliente."
    },
    {
      "term": "Persisted query",
      "definition": "Consulta registrada antecipadamente para reduzir custo e risco operacional."
    },
    {
      "term": "Field-level authorization",
      "definition": "Controle de permissão aplicado no nível de campos e resolvers específicos."
    }
  ]
} satisfies LessonContent;
