import type { LessonContent } from "../../../types/content";

export const monolitoVsMicroservicosContent: LessonContent = {
  "id": "monolito-vs-microservicos",
  "title": "Monolito vs Microserviços",
  "subtitle": "Fronteiras de deploy, coordenação e custo operacional: por que dividir um sistema nem sempre o torna mais simples.",
  "description": "Uma aula sobre modular monolith, fronteiras de serviço, acoplamento, latência em rede, observabilidade e o imposto operacional dos sistemas distribuídos.",
  "primaryCategoryId": "computacao",
  "secondaryCategoryId": "engenharia",
  "level": "Intermediário",
  "estimatedTime": "50-60 min",
  "tags": [
    "Arquitetura",
    "Monolito",
    "Microserviços",
    "Deploy",
    "Latência",
    "Observabilidade"
  ],
  "learningObjectives": [
    "Entender microserviços como escolha de fronteira, não como upgrade automático.",
    "Relacionar isolamento organizacional a custo de rede, dados e operação.",
    "Comparar modular monolith com decomposição prematura em serviços.",
    "Enxergar trade-offs entre autonomia de times e imposto distribuído."
  ],
  "prerequisites": [
    "Noção básica de aplicações web ou serviços backend.",
    "Curiosidade sobre deploy, times de engenharia e escalabilidade.",
    "Ajuda ter visto APIs e sistemas distribuídos, mas não é obrigatório."
  ],
  "references": [
    {
      "title": "Microservices",
      "source": "Martin Fowler",
      "url": "https://martinfowler.com/articles/microservices.html",
      "note": "Texto de referência para o vocabulário e os custos de microserviços."
    },
    {
      "title": "Monolith First",
      "source": "Martin Fowler",
      "url": "https://martinfowler.com/bliki/MonolithFirst.html",
      "note": "Contrapeso importante ao hype de decomposição prematura."
    },
    {
      "title": "Microservices architecture style",
      "source": "Microsoft Azure Architecture Center",
      "url": "https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/microservices",
      "note": "Discussão prática de quando a abordagem faz sentido."
    },
    {
      "title": "Microservice Architecture Pattern",
      "source": "microservices.io",
      "url": "https://microservices.io/patterns/microservices.html",
      "note": "Catálogo clássico de padrões e implicações operacionais."
    },
    {
      "title": "Site Reliability Engineering",
      "source": "Google SRE",
      "url": "https://sre.google/books/",
      "note": "Livro-base para custo operacional, observabilidade e confiabilidade."
    }
  ],
  "heroVisual": "lesson-hero",
  "openingText": "Em muitos times, a discussão sobre arquitetura começa com a pergunta errada: 'devemos ir para microserviços?'. A pergunta melhor é: onde a complexidade vai morar se movermos a fronteira do processo para a rede? Monólito e microserviços são formas diferentes de pagar por coordenação, isolamento e evolução.",
  "quickFacts": [
    {
      "title": "Unidade crítica",
      "body": "a fronteira de serviço e a unidade de deploy correspondente"
    },
    {
      "title": "Trade-off central",
      "body": "simplicidade de entrega ↔ autonomia e isolamento por serviço"
    },
    {
      "title": "Regra prática",
      "body": "comece por modularidade clara e só mova a fronteira para a rede quando houver motivo operacional ou organizacional forte"
    }
  ],
  "sections": [
    {
      "id": "motivacao",
      "eyebrow": "Motivação",
      "title": "Por que Monolito vs Microserviços aparece em sistemas sérios",
      "lead": "Escolher fronteiras de deploy e coordenação que caibam no produto, na equipe e no perfil de risco muda latência, custo, previsibilidade ou segurança. Por isso, o tema aparece cedo em qualquer sistema que sai do protótipo.",
      "visual": "lesson-hero",
      "paragraphs": [
        "Monolito vs Microserviços existe para escolher fronteiras de deploy e coordenação que caibam no produto, na equipe e no perfil de risco. Sem isso, a arquitetura vira moda, os custos ficam escondidos e a operação passa a sofrer com fronteiras ruins.",
        "Um bom modelo intuitivo é pensar em fronteiras como deslocamento de complexidade: dentro do processo ou através da rede. Pense em um produto que sai de um deploy único para múltiplos times, bancos e fluxos de release.",
        "Esse assunto importa porque afeta deployabilidade, custo de operação, latência de ponta a ponta e acoplamento entre times. Quando você o entende, decisões de arquitetura deixam de parecer um conjunto de truques desconexos."
      ],
      "blocks": [
        {
          "type": "insight",
          "title": "Intuição útil",
          "body": "pensar em fronteiras como deslocamento de complexidade: dentro do processo ou através da rede"
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "tratar microserviços como solução universal de escalabilidade antes de ter problema organizacional ou de isolamento claros"
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
        "Definição operacional: trade-off entre manter grande parte da lógica em um deploy coeso ou distribuí-la em serviços independentes coordenados por rede.",
        "A unidade crítica para raciocinar sobre custo e comportamento é a fronteira de serviço e a unidade de deploy correspondente. É nela que atrasos, contenção ou corrupção costumam aparecer primeiro.",
        "Quando você enxerga a unidade certa, fica mais fácil separar sintoma de causa. Isso evita o atalho mental de achar que tratar microserviços como solução universal de escalabilidade antes de ter problema organizacional ou de isolamento claros."
      ],
      "blocks": [
        {
          "type": "definition",
          "title": "Definição",
          "body": "trade-off entre manter grande parte da lógica em um deploy coeso ou distribuí-la em serviços independentes coordenados por rede"
        },
        {
          "type": "example",
          "title": "Exemplo concreto",
          "body": "um produto que sai de um deploy único para múltiplos times, bancos e fluxos de release"
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
        "Em alto nível, o fluxo é uma requisição entra, percorre módulos ou serviços, coordena dados e só então devolve resultado com impacto em logs, tracing e recovery.",
        "Em vez de decorar siglas, vale observar a ordem das decisões: fronteira de código, fronteira de deploy, coordenação distribuída e operação contínua. O desenho muda de tema para tema, mas a disciplina mental é a mesma.",
        "A pergunta importante não é apenas 'qual etapa existe?'. A pergunta melhor é 'onde a decisão errada se propaga e quanto custa corrigi-la depois?'."
      ],
      "blocks": [
        {
          "type": "example",
          "title": "Etapas para observar",
          "body": "Use a interação para percorrer a pipeline e notar onde surgem classificação, mediação, sincronização, persistência ou reaproveitamento.",
          "items": [
            "Fronteira de código",
            "Fronteira de deploy",
            "Coordenação distribuída",
            "Operação contínua"
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
        "O eixo central desta aula vai de simplicidade de entrega até autonomia e isolamento por serviço. Mais serviços podem dar autonomia e isolamento de falha, mas também adicionam descoberta, tracing, contratos, latência e consistência distribuída.",
        "Empurrar o desenho demais para um extremo tende a simplificar uma parte e complicar outra. O trabalho do arquiteto é tornar essa troca visível, não escondê-la atrás de defaults.",
        "Por isso, a pergunta madura não é 'qual tecnologia vence?'. É 'qual ponto do eixo faz sentido para este perfil de tráfego, risco e equipe?'."
      ],
      "blocks": [
        {
          "type": "insight",
          "title": "Projeto é posicionamento",
          "body": "O eixo 'simplicidade de entrega ↔ autonomia e isolamento por serviço' existe porque cada ponta otimiza uma propriedade diferente do sistema."
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
        "O erro recorrente é tratar microserviços como solução universal de escalabilidade antes de ter problema organizacional ou de isolamento claros. Isso costuma soar plausível porque a abstração superficial parece simples demais.",
        "Na prática, o limite aparece quando fronteiras demais transformam chamadas locais em hops de rede, multiplicando latência, debugging e custo cognitivo. É nesse ponto que o sistema revela o que realmente estava sendo garantido - ou apenas assumido.",
        "Tratar esses limites como detalhes raros é caro. Tratá-los como parte do desenho inicial economiza incidentes, retrabalho e debates improdutivos depois."
      ],
      "blocks": [
        {
          "type": "mistake",
          "title": "Suposição perigosa",
          "body": "tratar microserviços como solução universal de escalabilidade antes de ter problema organizacional ou de isolamento claros"
        },
        {
          "type": "insight",
          "title": "Limites são parte da especificação",
          "body": "fronteiras demais transformam chamadas locais em hops de rede, multiplicando latência, debugging e custo cognitivo"
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
        "Uma regra prática desta aula é comece por modularidade clara e só mova a fronteira para a rede quando houver motivo operacional ou organizacional forte.",
        "Repare nos cenários propostos: startup pequena, plataforma multi-time e hot path sensível. O mecanismo é o mesmo, mas a decisão muda conforme estado, risco e tipo de carga.",
        "É por isso que bons times documentam intenção, observam métricas e revisam o desenho quando o contexto operacional muda."
      ],
      "blocks": [
        {
          "type": "example",
          "title": "Heurística de decisão",
          "body": "As recomendações abaixo não são receitas eternas; elas são pontos de partida guiados pelo mecanismo que a aula explicou.",
          "items": [
            "Preferir monólito modular bem organizado antes de decompor em rede.",
            "Mover apenas domínios maduros e bem definidos para serviços independentes.",
            "Evitar hops de rede desnecessários e questionar se a decomposição realmente compensa."
          ]
        },
        {
          "type": "definition",
          "title": "Regra prática",
          "body": "comece por modularidade clara e só mova a fronteira para a rede quando houver motivo operacional ou organizacional forte"
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
        "Plataformas de modelos, ingestion pipelines e backends de agentes também sofrem quando viram uma malha de serviços sem critério.",
        "Em produtos modernos, a mesma lógica reaparece em APIs, jobs assíncronos, pipelines de dados, páginas web, storage, modelos e plataformas internas.",
        "Aprender este tópico dá vocabulário para discutir latência, throughput, integridade, consistência, segurança e custo com mais precisão técnica."
      ],
      "blocks": [
        {
          "type": "insight",
          "title": "Transferência de modelo mental",
          "body": "deployabilidade, custo de operação, latência de ponta a ponta e acoplamento entre times"
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
      "body": "escolher fronteiras de deploy e coordenação que caibam no produto, na equipe e no perfil de risco"
    },
    {
      "title": "Modelo mental",
      "body": "pensar em fronteiras como deslocamento de complexidade: dentro do processo ou através da rede"
    },
    {
      "title": "Erro comum",
      "body": "tratar microserviços como solução universal de escalabilidade antes de ter problema organizacional ou de isolamento claros"
    },
    {
      "title": "Onde reaparece",
      "body": "Plataformas de modelos, ingestion pipelines e backends de agentes também sofrem quando viram uma malha de serviços sem critério"
    }
  ],
  "quiz": [
    {
      "id": "q1",
      "prompt": "Qual é a função principal de Monolito vs Microserviços em um sistema?",
      "options": [
        {
          "id": "a",
          "label": "escolher fronteiras de deploy e coordenação que caibam no produto, na equipe e no perfil de risco"
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
      "feedback": "A ideia central da aula é escolher fronteiras de deploy e coordenação que caibam no produto, na equipe e no perfil de risco. O tema melhora o projeto do sistema, mas não apaga restrições físicas nem substitui todas as outras camadas."
    },
    {
      "id": "q2",
      "prompt": "Qual modelo mental ajuda mais a entender monolito vs microserviços?",
      "options": [
        {
          "id": "a",
          "label": "pensar em fronteiras como deslocamento de complexidade: dentro do processo ou através da rede"
        },
        {
          "id": "b",
          "label": "Pensar apenas na interface visual, ignorando o mecanismo interno."
        },
        {
          "id": "c",
          "label": "Assumir que monolito vs microserviços resolve sozinho qualquer gargalo restante."
        }
      ],
      "correctOptionId": "a",
      "feedback": "O melhor atalho mental aqui é: pensar em fronteiras como deslocamento de complexidade: dentro do processo ou através da rede. Esse modelo ajuda a prever custo, limite e comportamento operacional."
    },
    {
      "id": "q3",
      "prompt": "No fluxo estudado, qual etapa aparece cedo e condiciona decisões posteriores?",
      "options": [
        {
          "id": "a",
          "label": "Fronteira de código"
        },
        {
          "id": "b",
          "label": "Operação contínua"
        },
        {
          "id": "c",
          "label": "Uma etapa mágica que elimina a necessidade de observar o sistema."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Fronteira de código acontece cedo e molda o resto do caminho. Erros de classificação ou roteamento se propagam com facilidade."
    },
    {
      "id": "q4",
      "prompt": "Qual afirmação descreve melhor o trade-off central da aula?",
      "options": [
        {
          "id": "a",
          "label": "O objetivo é equilibrar simplicidade de entrega e autonomia e isolamento por serviço, não maximizar um extremo automaticamente."
        },
        {
          "id": "b",
          "label": "Sempre vale empurrar tudo para autonomia e isolamento por serviço."
        },
        {
          "id": "c",
          "label": "Sempre vale empurrar tudo para simplicidade de entrega."
        }
      ],
      "correctOptionId": "a",
      "feedback": "O eixo 'simplicidade de entrega ↔ autonomia e isolamento por serviço' existe porque cada extremo resolve uma dor e cria outra. Projeto maduro explicita essa troca."
    },
    {
      "id": "q5",
      "prompt": "Qual das opções abaixo representa um erro comum discutido na aula?",
      "options": [
        {
          "id": "a",
          "label": "tratar microserviços como solução universal de escalabilidade antes de ter problema organizacional ou de isolamento claros"
        },
        {
          "id": "b",
          "label": "comece por modularidade clara e só mova a fronteira para a rede quando houver motivo operacional ou organizacional forte"
        },
        {
          "id": "c",
          "label": "Medir hipóteses antes de alterar um sistema que já está em produção."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Este é o atalho mental perigoso do tema: tratar microserviços como solução universal de escalabilidade antes de ter problema organizacional ou de isolamento claros. A aula insiste em tornar essas suposições explícitas."
    },
    {
      "id": "q6",
      "prompt": "Pensando em cenários reais, qual decisão inicial está mais alinhada com a aula?",
      "options": [
        {
          "id": "a",
          "label": "Preferir monólito modular bem organizado antes de decompor em rede."
        },
        {
          "id": "b",
          "label": "Mover apenas domínios maduros e bem definidos para serviços independentes."
        },
        {
          "id": "c",
          "label": "Evitar hops de rede desnecessários e questionar se a decomposição realmente compensa."
        }
      ],
      "correctOptionId": "a",
      "feedback": "No primeiro cenário, a recomendação é preferir monólito modular bem organizado antes de decompor em rede.. A solução depende do mecanismo certo para o caso, não de um padrão aplicado sem contexto."
    },
    {
      "id": "q7",
      "prompt": "Por que este tema também importa para sistemas de IA e produtos modernos?",
      "options": [
        {
          "id": "a",
          "label": "Plataformas de modelos, ingestion pipelines e backends de agentes também sofrem quando viram uma malha de serviços sem critério"
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
      "feedback": "A ponte da aula é direta: plataformas de modelos, ingestion pipelines e backends de agentes também sofrem quando viram uma malha de serviços sem critério. Os mesmos fundamentos reaparecem em serving, dados, rede, storage e operação."
    },
    {
      "id": "q8",
      "prompt": "O que costuma quebrar ou exigir cuidado adicional neste tema?",
      "options": [
        {
          "id": "a",
          "label": "fronteiras demais transformam chamadas locais em hops de rede, multiplicando latência, debugging e custo cognitivo"
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
      "feedback": "O limite importante aqui é concreto: fronteiras demais transformam chamadas locais em hops de rede, multiplicando latência, debugging e custo cognitivo. Em sistemas reais, garantias dependem de política, falha, carga e integração entre camadas."
    }
  ],
  "glossary": [
    {
      "term": "Monólito",
      "definition": "Aplicação em que grande parte da lógica é publicada como uma unidade de deploy coesa."
    },
    {
      "term": "Modular monolith",
      "definition": "Monólito com fronteiras internas claras entre domínios e módulos."
    },
    {
      "term": "Microserviço",
      "definition": "Serviço pequeno e independente que conversa com outros por rede e possui ciclo de deploy próprio."
    },
    {
      "term": "Fronteira de serviço",
      "definition": "Limite onde uma responsabilidade passa a viver em outro processo ou deploy."
    },
    {
      "term": "Falha parcial",
      "definition": "Situação em que parte do sistema falha enquanto outra continua ativa."
    },
    {
      "term": "Tracing",
      "definition": "Rastreamento de uma requisição através de múltiplos componentes."
    },
    {
      "term": "Acoplamento",
      "definition": "Grau de dependência entre partes de um sistema."
    },
    {
      "term": "Contrato",
      "definition": "Acordo de interface e comportamento entre consumidores e provedores de um serviço."
    },
    {
      "term": "Blast radius",
      "definition": "Área de impacto de uma falha em produção."
    },
    {
      "term": "Coordenação distribuída",
      "definition": "Necessidade de alinhar estado e comportamento entre processos separados por rede."
    }
  ]
} satisfies LessonContent;
