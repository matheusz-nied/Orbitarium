import type { LessonContent } from "../../../types/content";

export const balanceamentoECdnContent: LessonContent = {
  "id": "balanceamento-e-cdn",
  "title": "Balanceamento de Carga e CDN",
  "subtitle": "Distribuir requisições e aproximar conteúdo do usuário sem tratar origem, cache e invalidação como a mesma coisa.",
  "description": "Uma aula sobre balanceadores, edge caching, health checks, afinidade, invalidação e o trade-off entre latência baixa e controle operacional.",
  "primaryCategoryId": "computacao",
  "secondaryCategoryId": "engenharia",
  "level": "Intermediário",
  "estimatedTime": "50-60 min",
  "tags": [
    "CDN",
    "Load Balancing",
    "HTTP",
    "Edge",
    "Cache",
    "Distribuição"
  ],
  "learningObjectives": [
    "Entender a diferença entre balancear requisições e servir conteúdo em edge.",
    "Relacionar DNS, edge, origem e health checks em um único fluxo mental.",
    "Identificar quando cache melhora latência e quando conteúdo dinâmico exige política específica.",
    "Perceber os custos de afinidade, invalidação e consistência em sistemas distribuídos."
  ],
  "prerequisites": [
    "Noção básica de HTTP e cliente-servidor.",
    "Curiosidade sobre disponibilidade, latência e escalabilidade.",
    "Ajuda ter visto a aula sobre Internet, mas não é obrigatório."
  ],
  "references": [
    {
      "title": "What is a CDN?",
      "source": "Cloudflare Learning Center",
      "url": "https://www.cloudflare.com/learning/cdn/what-is-a-cdn/",
      "note": "Explica o papel de caches distribuídos na redução de latência e carga na origem."
    },
    {
      "title": "What is load balancing?",
      "source": "Cloudflare Learning Center",
      "url": "https://www.cloudflare.com/learning/performance/what-is-load-balancing/",
      "note": "Introdução clara a balanceamento, health checks e distribuição de requisições."
    },
    {
      "title": "HTTP Caching",
      "source": "RFC 9111",
      "url": "https://datatracker.ietf.org/doc/html/rfc9111",
      "note": "Base normativa para regras de cache que também impactam CDNs."
    },
    {
      "title": "The Site Reliability Workbook",
      "source": "Google SRE",
      "url": "https://sre.google/workbook/table-of-contents/",
      "note": "Material confiável sobre capacidade, disponibilidade e operação em escala."
    },
    {
      "title": "Computer Networking: A Top-Down Approach",
      "source": "Kurose & Ross",
      "url": "https://gaia.cs.umass.edu/kurose_ross/index.php",
      "note": "Livro clássico para conectar DNS, HTTP, latência e entrega de conteúdo."
    }
  ],
  "heroVisual": "lesson-hero",
  "openingText": "Quando um produto passa de alguns usuários para milhões, o problema deixa de ser apenas 'ter um servidor funcionando'. A pergunta vira: como atender rápido, sobreviver a picos e não depender de uma única máquina ou região? Balanceadores e CDNs respondem isso em camadas diferentes - e confundir essas camadas leva a erros clássicos.",
  "quickFacts": [
    {
      "title": "Unidade crítica",
      "body": "a requisição e o objeto cacheável correspondente"
    },
    {
      "title": "Trade-off central",
      "body": "controle rígido na origem ↔ agressividade de cache e distribuição"
    },
    {
      "title": "Regra prática",
      "body": "classifique rotas por perfil de cache, configure health checks e trate a origem como recurso caro"
    }
  ],
  "sections": [
    {
      "id": "motivacao",
      "eyebrow": "Motivação",
      "title": "Por que Balanceamento de Carga e CDN aparece em sistemas sérios",
      "lead": "Distribuir requisições entre origens saudáveis e aproximar conteúdo reutilizável do usuário final muda latência, custo, previsibilidade ou segurança. Por isso, o tema aparece cedo em qualquer sistema que sai do protótipo.",
      "visual": "lesson-hero",
      "paragraphs": [
        "Balanceamento de Carga e CDN existe para distribuir requisições entre origens saudáveis e aproximar conteúdo reutilizável do usuário final. Sem isso, um único ponto concentra latência, risco de queda e pressão de tráfego.",
        "Um bom modelo intuitivo é pensar em duas decisões distintas: o balanceador escolhe quem atende e a cdn decide o que pode ser servido mais perto. Pense em uma promoção global em que imagens estáticas precisam sair do edge enquanto apis dinâmicas continuam protegidas na origem.",
        "Esse assunto importa porque afeta latência percebida, disponibilidade regional e custo de egress. Quando você o entende, decisões de arquitetura deixam de parecer um conjunto de truques desconexos."
      ],
      "blocks": [
        {
          "type": "insight",
          "title": "Intuição útil",
          "body": "pensar em duas decisões distintas: o balanceador escolhe quem atende e a CDN decide o que pode ser servido mais perto"
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "achar que uma CDN acelera automaticamente qualquer endpoint, inclusive respostas personalizadas e sensíveis"
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
        "Definição operacional: conjunto de mecanismos que roteiam tráfego para origens apropriadas e usam caches geograficamente distribuídos para reduzir trabalho na origem.",
        "A unidade crítica para raciocinar sobre custo e comportamento é a requisição e o objeto cacheável correspondente. É nela que atrasos, contenção ou corrupção costumam aparecer primeiro.",
        "Quando você enxerga a unidade certa, fica mais fácil separar sintoma de causa. Isso evita o atalho mental de achar que achar que uma cdn acelera automaticamente qualquer endpoint, inclusive respostas personalizadas e sensíveis."
      ],
      "blocks": [
        {
          "type": "definition",
          "title": "Definição",
          "body": "conjunto de mecanismos que roteiam tráfego para origens apropriadas e usam caches geograficamente distribuídos para reduzir trabalho na origem"
        },
        {
          "type": "example",
          "title": "Exemplo concreto",
          "body": "uma promoção global em que imagens estáticas precisam sair do edge enquanto APIs dinâmicas continuam protegidas na origem"
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
        "Em alto nível, o fluxo é o cliente resolve um nome, alcança um edge, tenta reaproveitar cache e só então cai numa origem saudável escolhida por políticas de balanceamento.",
        "Em vez de decorar siglas, vale observar a ordem das decisões: resolução e roteamento, edge e cache, origem balanceada e invalidação e observabilidade. O desenho muda de tema para tema, mas a disciplina mental é a mesma.",
        "A pergunta importante não é apenas 'qual etapa existe?'. A pergunta melhor é 'onde a decisão errada se propaga e quanto custa corrigi-la depois?'."
      ],
      "blocks": [
        {
          "type": "example",
          "title": "Etapas para observar",
          "body": "Use a interação para percorrer a pipeline e notar onde surgem classificação, mediação, sincronização, persistência ou reaproveitamento.",
          "items": [
            "Resolução e roteamento",
            "Edge e cache",
            "Origem balanceada",
            "Invalidação e observabilidade"
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
        "O eixo central desta aula vai de controle rígido na origem até agressividade de cache e distribuição. Quanto mais você aproxima conteúdo do usuário e distribui tráfego, menor tende a ser a latência percebida - mas maior fica a necessidade de políticas explícitas de invalidação, afinidade e diferenciação entre conteúdo público e privado.",
        "Empurrar o desenho demais para um extremo tende a simplificar uma parte e complicar outra. O trabalho do arquiteto é tornar essa troca visível, não escondê-la atrás de defaults.",
        "Por isso, a pergunta madura não é 'qual tecnologia vence?'. É 'qual ponto do eixo faz sentido para este perfil de tráfego, risco e equipe?'."
      ],
      "blocks": [
        {
          "type": "insight",
          "title": "Projeto é posicionamento",
          "body": "O eixo 'controle rígido na origem ↔ agressividade de cache e distribuição' existe porque cada ponta otimiza uma propriedade diferente do sistema."
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
        "O erro recorrente é achar que uma cdn acelera automaticamente qualquer endpoint, inclusive respostas personalizadas e sensíveis. Isso costuma soar plausível porque a abstração superficial parece simples demais.",
        "Na prática, o limite aparece quando sessão, personalização e conteúdo público são misturados sem cache keys, ttls e regras de invalidação coerentes. É nesse ponto que o sistema revela o que realmente estava sendo garantido - ou apenas assumido.",
        "Tratar esses limites como detalhes raros é caro. Tratá-los como parte do desenho inicial economiza incidentes, retrabalho e debates improdutivos depois."
      ],
      "blocks": [
        {
          "type": "mistake",
          "title": "Suposição perigosa",
          "body": "achar que uma CDN acelera automaticamente qualquer endpoint, inclusive respostas personalizadas e sensíveis"
        },
        {
          "type": "insight",
          "title": "Limites são parte da especificação",
          "body": "sessão, personalização e conteúdo público são misturados sem cache keys, TTLs e regras de invalidação coerentes"
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
        "Uma regra prática desta aula é classifique rotas por perfil de cache, configure health checks e trate a origem como recurso caro.",
        "Repare nos cenários propostos: landing page global, dashboard autenticado e falha regional. O mecanismo é o mesmo, mas a decisão muda conforme estado, risco e tipo de carga.",
        "É por isso que bons times documentam intenção, observam métricas e revisam o desenho quando o contexto operacional muda."
      ],
      "blocks": [
        {
          "type": "example",
          "title": "Heurística de decisão",
          "body": "As recomendações abaixo não são receitas eternas; elas são pontos de partida guiados pelo mecanismo que a aula explicou.",
          "items": [
            "Empurrar estáticos para edge e versionar assets para permitir cache longo.",
            "Separar shell estático de chamadas dinâmicas e usar cache com chaves privadas ou revalidação curta.",
            "Usar health checks e failover para desviar tráfego antes que a degradação atinja todos os usuários."
          ]
        },
        {
          "type": "definition",
          "title": "Regra prática",
          "body": "classifique rotas por perfil de cache, configure health checks e trate a origem como recurso caro"
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
        "Frontends de inferência, APIs globais e distribuição de artefatos de modelos também dependem de edge, cache e proteção da origem.",
        "Em produtos modernos, a mesma lógica reaparece em APIs, jobs assíncronos, pipelines de dados, páginas web, storage, modelos e plataformas internas.",
        "Aprender este tópico dá vocabulário para discutir latência, throughput, integridade, consistência, segurança e custo com mais precisão técnica."
      ],
      "blocks": [
        {
          "type": "insight",
          "title": "Transferência de modelo mental",
          "body": "latência percebida, disponibilidade regional e custo de egress"
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
      "body": "distribuir requisições entre origens saudáveis e aproximar conteúdo reutilizável do usuário final"
    },
    {
      "title": "Modelo mental",
      "body": "pensar em duas decisões distintas: o balanceador escolhe quem atende e a CDN decide o que pode ser servido mais perto"
    },
    {
      "title": "Erro comum",
      "body": "achar que uma CDN acelera automaticamente qualquer endpoint, inclusive respostas personalizadas e sensíveis"
    },
    {
      "title": "Onde reaparece",
      "body": "Frontends de inferência, APIs globais e distribuição de artefatos de modelos também dependem de edge, cache e proteção da origem"
    }
  ],
  "quiz": [
    {
      "id": "q1",
      "prompt": "Qual é a função principal de Balanceamento de Carga e CDN em um sistema?",
      "options": [
        {
          "id": "a",
          "label": "distribuir requisições entre origens saudáveis e aproximar conteúdo reutilizável do usuário final"
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
      "feedback": "A ideia central da aula é distribuir requisições entre origens saudáveis e aproximar conteúdo reutilizável do usuário final. O tema melhora o projeto do sistema, mas não apaga restrições físicas nem substitui todas as outras camadas."
    },
    {
      "id": "q2",
      "prompt": "Qual modelo mental ajuda mais a entender balanceamento de carga e cdn?",
      "options": [
        {
          "id": "a",
          "label": "pensar em duas decisões distintas: o balanceador escolhe quem atende e a CDN decide o que pode ser servido mais perto"
        },
        {
          "id": "b",
          "label": "Pensar apenas na interface visual, ignorando o mecanismo interno."
        },
        {
          "id": "c",
          "label": "Assumir que balanceamento de carga e cdn resolve sozinho qualquer gargalo restante."
        }
      ],
      "correctOptionId": "a",
      "feedback": "O melhor atalho mental aqui é: pensar em duas decisões distintas: o balanceador escolhe quem atende e a cdn decide o que pode ser servido mais perto. Esse modelo ajuda a prever custo, limite e comportamento operacional."
    },
    {
      "id": "q3",
      "prompt": "No fluxo estudado, qual etapa aparece cedo e condiciona decisões posteriores?",
      "options": [
        {
          "id": "a",
          "label": "Resolução e roteamento"
        },
        {
          "id": "b",
          "label": "Invalidação e observabilidade"
        },
        {
          "id": "c",
          "label": "Uma etapa mágica que elimina a necessidade de observar o sistema."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Resolução e roteamento acontece cedo e molda o resto do caminho. Erros de classificação ou roteamento se propagam com facilidade."
    },
    {
      "id": "q4",
      "prompt": "Qual afirmação descreve melhor o trade-off central da aula?",
      "options": [
        {
          "id": "a",
          "label": "O objetivo é equilibrar controle rígido na origem e agressividade de cache e distribuição, não maximizar um extremo automaticamente."
        },
        {
          "id": "b",
          "label": "Sempre vale empurrar tudo para agressividade de cache e distribuição."
        },
        {
          "id": "c",
          "label": "Sempre vale empurrar tudo para controle rígido na origem."
        }
      ],
      "correctOptionId": "a",
      "feedback": "O eixo 'controle rígido na origem ↔ agressividade de cache e distribuição' existe porque cada extremo resolve uma dor e cria outra. Projeto maduro explicita essa troca."
    },
    {
      "id": "q5",
      "prompt": "Qual das opções abaixo representa um erro comum discutido na aula?",
      "options": [
        {
          "id": "a",
          "label": "achar que uma CDN acelera automaticamente qualquer endpoint, inclusive respostas personalizadas e sensíveis"
        },
        {
          "id": "b",
          "label": "classifique rotas por perfil de cache, configure health checks e trate a origem como recurso caro"
        },
        {
          "id": "c",
          "label": "Medir hipóteses antes de alterar um sistema que já está em produção."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Este é o atalho mental perigoso do tema: achar que uma cdn acelera automaticamente qualquer endpoint, inclusive respostas personalizadas e sensíveis. A aula insiste em tornar essas suposições explícitas."
    },
    {
      "id": "q6",
      "prompt": "Pensando em cenários reais, qual decisão inicial está mais alinhada com a aula?",
      "options": [
        {
          "id": "a",
          "label": "Empurrar estáticos para edge e versionar assets para permitir cache longo."
        },
        {
          "id": "b",
          "label": "Separar shell estático de chamadas dinâmicas e usar cache com chaves privadas ou revalidação curta."
        },
        {
          "id": "c",
          "label": "Usar health checks e failover para desviar tráfego antes que a degradação atinja todos os usuários."
        }
      ],
      "correctOptionId": "a",
      "feedback": "No primeiro cenário, a recomendação é empurrar estáticos para edge e versionar assets para permitir cache longo.. A solução depende do mecanismo certo para o caso, não de um padrão aplicado sem contexto."
    },
    {
      "id": "q7",
      "prompt": "Por que este tema também importa para sistemas de IA e produtos modernos?",
      "options": [
        {
          "id": "a",
          "label": "Frontends de inferência, APIs globais e distribuição de artefatos de modelos também dependem de edge, cache e proteção da origem"
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
      "feedback": "A ponte da aula é direta: frontends de inferência, apis globais e distribuição de artefatos de modelos também dependem de edge, cache e proteção da origem. Os mesmos fundamentos reaparecem em serving, dados, rede, storage e operação."
    },
    {
      "id": "q8",
      "prompt": "O que costuma quebrar ou exigir cuidado adicional neste tema?",
      "options": [
        {
          "id": "a",
          "label": "sessão, personalização e conteúdo público são misturados sem cache keys, TTLs e regras de invalidação coerentes"
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
      "feedback": "O limite importante aqui é concreto: sessão, personalização e conteúdo público são misturados sem cache keys, ttls e regras de invalidação coerentes. Em sistemas reais, garantias dependem de política, falha, carga e integração entre camadas."
    }
  ],
  "glossary": [
    {
      "term": "Balanceador de carga",
      "definition": "Componente que distribui requisições entre múltiplas origens segundo regras de saúde e política."
    },
    {
      "term": "CDN",
      "definition": "Rede de distribuição de conteúdo que serve respostas a partir de pontos de presença mais próximos do usuário."
    },
    {
      "term": "Edge",
      "definition": "Nó de borda onde uma CDN recebe a requisição e potencialmente responde sem consultar a origem."
    },
    {
      "term": "Origem",
      "definition": "Servidor ou serviço autoritativo do conteúdo quando o edge não consegue responder sozinho."
    },
    {
      "term": "Health check",
      "definition": "Verificação periódica para decidir se uma origem pode receber tráfego."
    },
    {
      "term": "TTL",
      "definition": "Tempo durante o qual uma resposta pode ser reutilizada antes de ser revalidada ou expirada."
    },
    {
      "term": "Cache key",
      "definition": "Conjunto de atributos que identifica qual resposta pode ser reaproveitada para uma requisição."
    },
    {
      "term": "Afinidade",
      "definition": "Técnica que tenta manter um cliente indo para a mesma origem por algum critério."
    },
    {
      "term": "Purge",
      "definition": "Invalidação explícita de entradas armazenadas em cache."
    },
    {
      "term": "Hit ratio",
      "definition": "Proporção de requisições atendidas pelo cache sem recorrer à origem."
    }
  ]
} satisfies LessonContent;
