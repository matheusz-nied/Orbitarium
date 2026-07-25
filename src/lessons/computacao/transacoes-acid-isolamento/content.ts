import type { LessonContent } from "../../../types/content";

export const transacoesAcidIsolamentoContent = {
  "id": "transacoes-acid-isolamento",
  "title": "Transações, ACID e Isolamento",
  "subtitle": "O que um commit realmente promete quando várias operações disputam os mesmos dados ao mesmo tempo.",
  "description": "Uma aula sobre atomicidade, consistência, isolamento, durabilidade, MVCC, níveis de isolamento e a diferença entre garantias do banco e invariantes da aplicação.",
  "primaryCategoryId": "computacao",
  "secondaryCategoryId": "engenharia",
  "level": "Avançado",
  "estimatedTime": "60-70 min",
  "tags": [
    "Banco de Dados",
    "ACID",
    "MVCC",
    "Isolamento",
    "Concorrência",
    "WAL"
  ],
  "learningObjectives": [
    "Entender transação como unidade de publicação de mudanças.",
    "Diferenciar atomicidade, isolamento e durabilidade sem confundir as garantias.",
    "Relacionar níveis de isolamento com throughput, anomalias e necessidade de retry.",
    "Perceber o papel da aplicação na manutenção de invariantes mais amplos."
  ],
  "prerequisites": [
    "Noção básica de bancos relacionais e operações de leitura/escrita.",
    "Ajuda já ter visto a aula sobre banco de dados, mas não é obrigatório.",
    "Conforto com a ideia de várias requisições acontecendo em paralelo."
  ],
  "references": [
    {
      "title": "Transactions",
      "source": "PostgreSQL Documentation",
      "url": "https://www.postgresql.org/docs/current/tutorial-transactions.html",
      "note": "Introdução oficial a BEGIN, COMMIT e ROLLBACK."
    },
    {
      "title": "Transaction Isolation",
      "source": "PostgreSQL Documentation",
      "url": "https://www.postgresql.org/docs/current/transaction-iso.html",
      "note": "Explica níveis de isolamento e anomalias suportadas."
    },
    {
      "title": "MVCC Introduction",
      "source": "PostgreSQL Documentation",
      "url": "https://www.postgresql.org/docs/current/mvcc-intro.html",
      "note": "Base para entender snapshots, versões e concorrência."
    },
    {
      "title": "Data Consistency Checks at the Application Level",
      "source": "PostgreSQL Documentation",
      "url": "https://www.postgresql.org/docs/current/applevel-consistency.html",
      "note": "Mostra por que ACID não elimina toda responsabilidade da aplicação."
    },
    {
      "title": "Database Systems",
      "source": "CMU 15-445",
      "url": "https://15445.courses.cs.cmu.edu/",
      "note": "Curso universitário de referência para controle de concorrência e recovery."
    }
  ],
  "heroVisual": "lesson-hero",
  "openingText": "Transferir saldo entre contas parece simples até duas operações competirem pelos mesmos dados, uma queda interromper o processo e um relatório ler o meio da história. A linguagem das transações existe para que um sistema publique mudanças como uma unidade coerente - mas a palavra ACID não é um feitiço que remove toda responsabilidade do desenho.",
  "quickFacts": [
    {
      "title": "Unidade crítica",
      "body": "o conjunto de leituras, escritas e a visibilidade de versões para uma operação lógica"
    },
    {
      "title": "Trade-off central",
      "body": "concorrência máxima ↔ isolamento forte"
    },
    {
      "title": "Regra prática",
      "body": "comece pela invariante que precisa sobreviver e só depois escolha isolamento, índices e política de retry"
    }
  ],
  "sections": [
    {
      "id": "motivacao",
      "eyebrow": "Motivação",
      "title": "Por que Transações, ACID e Isolamento aparece em sistemas sérios",
      "lead": "Agrupar leituras e escritas em uma unidade coerente mesmo sob falhas e concorrência muda latência, custo, previsibilidade ou segurança. Por isso, o tema aparece cedo em qualquer sistema que sai do protótipo.",
      "visual": "lesson-hero",
      "paragraphs": [
        "Transações, ACID e Isolamento existe para agrupar leituras e escritas em uma unidade coerente mesmo sob falhas e concorrência. Sem isso, atualizações parciais, perdas de invariantes e visões inconsistentes se acumulam rapidamente.",
        "Um bom modelo intuitivo é pensar na transação como uma história que o sistema publica inteira ou decide esquecer. Pense em uma transferência bancária em que débito e crédito precisam aparecer como um único fato publicado.",
        "Esse assunto importa porque afeta correção sob concorrência, recovery e previsibilidade de dados lidos por outras operações. Quando você o entende, decisões de arquitetura deixam de parecer um conjunto de truques desconexos."
      ],
      "blocks": [
        {
          "type": "insight",
          "title": "Intuição útil",
          "body": "pensar na transação como uma história que o sistema publica inteira ou decide esquecer"
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "achar que ACID faz qualquer regra de negócio ficar correta automaticamente, independentemente de nível de isolamento ou lógica da aplicação"
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
        "Definição operacional: mecanismo de banco de dados que delimita um conjunto de operações entre begin e commit ou rollback com regras explícitas de atomicidade, isolamento e durabilidade.",
        "A unidade crítica para raciocinar sobre custo e comportamento é o conjunto de leituras, escritas e a visibilidade de versões para uma operação lógica. É nela que atrasos, contenção ou corrupção costumam aparecer primeiro.",
        "Quando você enxerga a unidade certa, fica mais fácil separar sintoma de causa. Isso evita o atalho mental de achar que achar que acid faz qualquer regra de negócio ficar correta automaticamente, independentemente de nível de isolamento ou lógica da aplicação."
      ],
      "blocks": [
        {
          "type": "definition",
          "title": "Definição",
          "body": "mecanismo de banco de dados que delimita um conjunto de operações entre begin e commit ou rollback com regras explícitas de atomicidade, isolamento e durabilidade"
        },
        {
          "type": "example",
          "title": "Exemplo concreto",
          "body": "uma transferência bancária em que débito e crédito precisam aparecer como um único fato publicado"
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
        "Em alto nível, o fluxo é uma transação começa, lê uma visão dos dados, registra mudanças sob regras de concorrência e só publica o resultado quando o commit vence conflitos relevantes.",
        "Em vez de decorar siglas, vale observar a ordem das decisões: início e snapshot, leituras e escritas, detecção de conflito e commit e wal. O desenho muda de tema para tema, mas a disciplina mental é a mesma.",
        "A pergunta importante não é apenas 'qual etapa existe?'. A pergunta melhor é 'onde a decisão errada se propaga e quanto custa corrigi-la depois?'."
      ],
      "blocks": [
        {
          "type": "example",
          "title": "Etapas para observar",
          "body": "Use a interação para percorrer a pipeline e notar onde surgem classificação, mediação, sincronização, persistência ou reaproveitamento.",
          "items": [
            "Início e snapshot",
            "Leituras e escritas",
            "Detecção de conflito",
            "Commit e WAL"
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
        "O eixo central desta aula vai de concorrência máxima até isolamento forte. Quanto mais você pede isolamento, menos anomalias tolera - mas maior pode ser o custo em bloqueio, validação ou retries quando muitas operações competem ao mesmo tempo.",
        "Empurrar o desenho demais para um extremo tende a simplificar uma parte e complicar outra. O trabalho do arquiteto é tornar essa troca visível, não escondê-la atrás de defaults.",
        "Por isso, a pergunta madura não é 'qual tecnologia vence?'. É 'qual ponto do eixo faz sentido para este perfil de tráfego, risco e equipe?'."
      ],
      "blocks": [
        {
          "type": "insight",
          "title": "Projeto é posicionamento",
          "body": "O eixo 'concorrência máxima ↔ isolamento forte' existe porque cada ponta otimiza uma propriedade diferente do sistema."
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
        "O erro recorrente é achar que acid faz qualquer regra de negócio ficar correta automaticamente, independentemente de nível de isolamento ou lógica da aplicação. Isso costuma soar plausível porque a abstração superficial parece simples demais.",
        "Na prática, o limite aparece quando verificações de invariantes são feitas fora da transação certa ou sob isolamento mais fraco do que o caso exige. É nesse ponto que o sistema revela o que realmente estava sendo garantido - ou apenas assumido.",
        "Tratar esses limites como detalhes raros é caro. Tratá-los como parte do desenho inicial economiza incidentes, retrabalho e debates improdutivos depois."
      ],
      "blocks": [
        {
          "type": "mistake",
          "title": "Suposição perigosa",
          "body": "achar que ACID faz qualquer regra de negócio ficar correta automaticamente, independentemente de nível de isolamento ou lógica da aplicação"
        },
        {
          "type": "insight",
          "title": "Limites são parte da especificação",
          "body": "verificações de invariantes são feitas fora da transação certa ou sob isolamento mais fraco do que o caso exige"
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
        "Uma regra prática desta aula é comece pela invariante que precisa sobreviver e só depois escolha isolamento, índices e política de retry.",
        "Repare nos cenários propostos: transferência financeira, estoque concorrente e relatório analítico. O mecanismo é o mesmo, mas a decisão muda conforme estado, risco e tipo de carga.",
        "É por isso que bons times documentam intenção, observam métricas e revisam o desenho quando o contexto operacional muda."
      ],
      "blocks": [
        {
          "type": "example",
          "title": "Heurística de decisão",
          "body": "As recomendações abaixo não são receitas eternas; elas são pontos de partida guiados pelo mecanismo que a aula explicou.",
          "items": [
            "Executar toda a regra crítica dentro de uma transação que proteja a invariante de saldo.",
            "Escolher isolamento e checagens de conflito que impeçam venda dupla e prever retry.",
            "Usar nível compatível com leitura estável ou snapshot, em vez de serializar tudo cegamente."
          ]
        },
        {
          "type": "definition",
          "title": "Regra prática",
          "body": "comece pela invariante que precisa sobreviver e só depois escolha isolamento, índices e política de retry"
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
        "Cobrança, cotas, feature stores, filas transacionais e orquestração de jobs de IA dependem do mesmo raciocínio sobre publicação coerente de estado.",
        "Em produtos modernos, a mesma lógica reaparece em APIs, jobs assíncronos, pipelines de dados, páginas web, storage, modelos e plataformas internas.",
        "Aprender este tópico dá vocabulário para discutir latência, throughput, integridade, consistência, segurança e custo com mais precisão técnica."
      ],
      "blocks": [
        {
          "type": "insight",
          "title": "Transferência de modelo mental",
          "body": "correção sob concorrência, recovery e previsibilidade de dados lidos por outras operações"
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
      "body": "agrupar leituras e escritas em uma unidade coerente mesmo sob falhas e concorrência"
    },
    {
      "title": "Modelo mental",
      "body": "pensar na transação como uma história que o sistema publica inteira ou decide esquecer"
    },
    {
      "title": "Erro comum",
      "body": "achar que ACID faz qualquer regra de negócio ficar correta automaticamente, independentemente de nível de isolamento ou lógica da aplicação"
    },
    {
      "title": "Onde reaparece",
      "body": "Cobrança, cotas, feature stores, filas transacionais e orquestração de jobs de IA dependem do mesmo raciocínio sobre publicação coerente de estado"
    }
  ],
  "quiz": [
    {
      "id": "q1",
      "prompt": "Qual é a função principal de Transações, ACID e Isolamento em um sistema?",
      "options": [
        {
          "id": "a",
          "label": "agrupar leituras e escritas em uma unidade coerente mesmo sob falhas e concorrência"
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
      "feedback": "A ideia central da aula é agrupar leituras e escritas em uma unidade coerente mesmo sob falhas e concorrência. O tema melhora o projeto do sistema, mas não apaga restrições físicas nem substitui todas as outras camadas."
    },
    {
      "id": "q2",
      "prompt": "Qual modelo mental ajuda mais a entender transações, acid e isolamento?",
      "options": [
        {
          "id": "a",
          "label": "pensar na transação como uma história que o sistema publica inteira ou decide esquecer"
        },
        {
          "id": "b",
          "label": "Pensar apenas na interface visual, ignorando o mecanismo interno."
        },
        {
          "id": "c",
          "label": "Assumir que transações, acid e isolamento resolve sozinho qualquer gargalo restante."
        }
      ],
      "correctOptionId": "a",
      "feedback": "O melhor atalho mental aqui é: pensar na transação como uma história que o sistema publica inteira ou decide esquecer. Esse modelo ajuda a prever custo, limite e comportamento operacional."
    },
    {
      "id": "q3",
      "prompt": "No fluxo estudado, qual etapa aparece cedo e condiciona decisões posteriores?",
      "options": [
        {
          "id": "a",
          "label": "Início e snapshot"
        },
        {
          "id": "b",
          "label": "Commit e WAL"
        },
        {
          "id": "c",
          "label": "Uma etapa mágica que elimina a necessidade de observar o sistema."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Início e snapshot acontece cedo e molda o resto do caminho. Erros de classificação ou roteamento se propagam com facilidade."
    },
    {
      "id": "q4",
      "prompt": "Qual afirmação descreve melhor o trade-off central da aula?",
      "options": [
        {
          "id": "a",
          "label": "O objetivo é equilibrar concorrência máxima e isolamento forte, não maximizar um extremo automaticamente."
        },
        {
          "id": "b",
          "label": "Sempre vale empurrar tudo para isolamento forte."
        },
        {
          "id": "c",
          "label": "Sempre vale empurrar tudo para concorrência máxima."
        }
      ],
      "correctOptionId": "a",
      "feedback": "O eixo 'concorrência máxima ↔ isolamento forte' existe porque cada extremo resolve uma dor e cria outra. Projeto maduro explicita essa troca."
    },
    {
      "id": "q5",
      "prompt": "Qual das opções abaixo representa um erro comum discutido na aula?",
      "options": [
        {
          "id": "a",
          "label": "achar que ACID faz qualquer regra de negócio ficar correta automaticamente, independentemente de nível de isolamento ou lógica da aplicação"
        },
        {
          "id": "b",
          "label": "comece pela invariante que precisa sobreviver e só depois escolha isolamento, índices e política de retry"
        },
        {
          "id": "c",
          "label": "Medir hipóteses antes de alterar um sistema que já está em produção."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Este é o atalho mental perigoso do tema: achar que acid faz qualquer regra de negócio ficar correta automaticamente, independentemente de nível de isolamento ou lógica da aplicação. A aula insiste em tornar essas suposições explícitas."
    },
    {
      "id": "q6",
      "prompt": "Pensando em cenários reais, qual decisão inicial está mais alinhada com a aula?",
      "options": [
        {
          "id": "a",
          "label": "Executar toda a regra crítica dentro de uma transação que proteja a invariante de saldo."
        },
        {
          "id": "b",
          "label": "Escolher isolamento e checagens de conflito que impeçam venda dupla e prever retry."
        },
        {
          "id": "c",
          "label": "Usar nível compatível com leitura estável ou snapshot, em vez de serializar tudo cegamente."
        }
      ],
      "correctOptionId": "a",
      "feedback": "No primeiro cenário, a recomendação é executar toda a regra crítica dentro de uma transação que proteja a invariante de saldo.. A solução depende do mecanismo certo para o caso, não de um padrão aplicado sem contexto."
    },
    {
      "id": "q7",
      "prompt": "Por que este tema também importa para sistemas de IA e produtos modernos?",
      "options": [
        {
          "id": "a",
          "label": "Cobrança, cotas, feature stores, filas transacionais e orquestração de jobs de IA dependem do mesmo raciocínio sobre publicação coerente de estado"
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
      "feedback": "A ponte da aula é direta: cobrança, cotas, feature stores, filas transacionais e orquestração de jobs de ia dependem do mesmo raciocínio sobre publicação coerente de estado. Os mesmos fundamentos reaparecem em serving, dados, rede, storage e operação."
    },
    {
      "id": "q8",
      "prompt": "O que costuma quebrar ou exigir cuidado adicional neste tema?",
      "options": [
        {
          "id": "a",
          "label": "verificações de invariantes são feitas fora da transação certa ou sob isolamento mais fraco do que o caso exige"
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
      "feedback": "O limite importante aqui é concreto: verificações de invariantes são feitas fora da transação certa ou sob isolamento mais fraco do que o caso exige. Em sistemas reais, garantias dependem de política, falha, carga e integração entre camadas."
    }
  ],
  "glossary": [
    {
      "term": "Transação",
      "definition": "Conjunto de operações tratadas como uma unidade lógica pelo banco."
    },
    {
      "term": "Atomicidade",
      "definition": "Garantia de que uma transação publica tudo ou nada."
    },
    {
      "term": "Consistência",
      "definition": "Manutenção de invariantes declarados pelo banco e pela aplicação."
    },
    {
      "term": "Isolamento",
      "definition": "Controle de quanto uma transação enxerga das outras durante a execução."
    },
    {
      "term": "Durabilidade",
      "definition": "Persistência do efeito confirmado por um commit após falha apropriada do sistema."
    },
    {
      "term": "MVCC",
      "definition": "Controle de concorrência baseado em múltiplas versões visíveis conforme snapshot."
    },
    {
      "term": "Snapshot",
      "definition": "Visão consistente dos dados usada por uma transação em determinado momento."
    },
    {
      "term": "WAL",
      "definition": "Write-ahead log usado para recovery e durabilidade."
    },
    {
      "term": "Anomalia",
      "definition": "Comportamento incorreto ou surpreendente causado por concorrência e visibilidade inadequada."
    },
    {
      "term": "Retry",
      "definition": "Nova tentativa necessária quando um commit falha por conflito ou serialização."
    }
  ]
} satisfies LessonContent;
