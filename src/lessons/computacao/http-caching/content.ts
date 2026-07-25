import type { LessonContent } from "../../../types/content";

export const httpCachingContent: LessonContent = {
  "id": "http-caching",
  "title": "HTTP Caching",
  "subtitle": "Freshness, revalidation e reaproveitamento: como reduzir round trips sem perder o controle sobre conteúdo velho, privado ou incorreto.",
  "description": "Uma aula sobre Cache-Control, ETag, Last-Modified, 304, Vary, private, immutable e a diferença entre não enviar bytes e não consultar a origem.",
  "primaryCategoryId": "computacao",
  "secondaryCategoryId": "engenharia",
  "level": "Intermediário",
  "estimatedTime": "45-55 min",
  "tags": [
    "HTTP",
    "Caching",
    "ETag",
    "Cache-Control",
    "304",
    "CDN"
  ],
  "learningObjectives": [
    "Entender cache HTTP como contrato de reaproveitamento e revalidação.",
    "Relacionar freshness, validators e resposta 304.",
    "Diferenciar assets imutáveis de dados personalizados ou altamente mutáveis.",
    "Escrever políticas de cache com mais intenção técnica."
  ],
  "prerequisites": [
    "Noção básica de HTTP e resposta de servidor.",
    "Curiosidade sobre performance web, navegador ou CDN.",
    "Ajuda já ter visto a aula de balanceamento e CDN, mas não é obrigatório."
  ],
  "references": [
    {
      "title": "HTTP Caching",
      "source": "RFC 9111",
      "url": "https://datatracker.ietf.org/doc/html/rfc9111",
      "note": "Especificação oficial de caching HTTP moderno."
    },
    {
      "title": "HTTP Semantics",
      "source": "RFC 9110",
      "url": "https://datatracker.ietf.org/doc/html/rfc9110",
      "note": "Contexto normativo para representações, validação e cabeçalhos."
    },
    {
      "title": "HTTP caching",
      "source": "MDN Web Docs",
      "url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching",
      "note": "Guia didático excelente sobre Cache-Control, ETag e 304."
    },
    {
      "title": "Caching",
      "source": "Cloudflare Learning Center",
      "url": "https://www.cloudflare.com/learning/cdn/what-is-caching/",
      "note": "Ponte entre semântica HTTP e operação em edge/CDN."
    },
    {
      "title": "Cache-Control",
      "source": "MDN Web Docs",
      "url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control",
      "note": "Referência prática de diretivas e seus significados."
    }
  ],
  "heroVisual": "lesson-hero",
  "openingText": "Sem cache, o navegador pergunta tudo de novo o tempo todo. Com cache mal configurado, o usuário pode ver bytes velhos, privados ou inconsistentes. HTTP caching é o contrato que tenta equilibrar essas duas dores. Ele decide quando algo pode ser reaproveitado, quando deve ser revalidado e como intermediários podem cooperar com o cliente e a origem.",
  "quickFacts": [
    {
      "title": "Unidade crítica",
      "body": "a representação HTTP acompanhada de seus cabeçalhos de cache e validação"
    },
    {
      "title": "Trade-off central",
      "body": "frescor imediato ↔ reaproveitamento agressivo"
    },
    {
      "title": "Regra prática",
      "body": "separe assets imutáveis, recursos revalidáveis e respostas privadas antes de escolher cabeçalhos"
    }
  ],
  "sections": [
    {
      "id": "motivacao",
      "eyebrow": "Motivação",
      "title": "Por que HTTP Caching aparece em sistemas sérios",
      "lead": "Reduzir transferências e carga na origem com regras explícitas de frescor, validação e reaproveitamento muda latência, custo, previsibilidade ou segurança. Por isso, o tema aparece cedo em qualquer sistema que sai do protótipo.",
      "visual": "lesson-hero",
      "paragraphs": [
        "HTTP Caching existe para reduzir transferências e carga na origem com regras explícitas de frescor, validação e reaproveitamento. Sem isso, cada navegação repete trabalho desnecessário ou, no extremo oposto, conteúdo stale vaza para casos errados.",
        "Um bom modelo intuitivo é pensar em cache como um contrato sobre frescor e sobre o direito de reutilizar uma representação. Pense em um navegador que reutiliza js versionado por muito tempo, mas revalida um endpoint de catálogo com etag.",
        "Esse assunto importa porque afeta latência percebida, carga na origem, correção do conteúdo e previsibilidade entre navegador, proxy e cdn. Quando você o entende, decisões de arquitetura deixam de parecer um conjunto de truques desconexos."
      ],
      "blocks": [
        {
          "type": "insight",
          "title": "Intuição útil",
          "body": "pensar em cache como um contrato sobre frescor e sobre o direito de reutilizar uma representação"
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "definir cabeçalhos de cache por costume ou por copiar e colar, sem pensar no tipo de resposta"
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
        "Definição operacional: semântica HTTP que descreve quando uma resposta pode ser armazenada, reaproveitada, revalidada ou proibida de cache.",
        "A unidade crítica para raciocinar sobre custo e comportamento é a representação http acompanhada de seus cabeçalhos de cache e validação. É nela que atrasos, contenção ou corrupção costumam aparecer primeiro.",
        "Quando você enxerga a unidade certa, fica mais fácil separar sintoma de causa. Isso evita o atalho mental de achar que definir cabeçalhos de cache por costume ou por copiar e colar, sem pensar no tipo de resposta."
      ],
      "blocks": [
        {
          "type": "definition",
          "title": "Definição",
          "body": "semântica HTTP que descreve quando uma resposta pode ser armazenada, reaproveitada, revalidada ou proibida de cache"
        },
        {
          "type": "example",
          "title": "Exemplo concreto",
          "body": "um navegador que reutiliza JS versionado por muito tempo, mas revalida um endpoint de catálogo com ETag"
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
        "Em alto nível, o fluxo é a requisição encontra um cache, verifica se a resposta ainda está fresca, revalida se preciso e só então busca nova representação na origem.",
        "Em vez de decorar siglas, vale observar a ordem das decisões: armazenamento com política, freshness check, revalidação e invalidação prática. O desenho muda de tema para tema, mas a disciplina mental é a mesma.",
        "A pergunta importante não é apenas 'qual etapa existe?'. A pergunta melhor é 'onde a decisão errada se propaga e quanto custa corrigi-la depois?'."
      ],
      "blocks": [
        {
          "type": "example",
          "title": "Etapas para observar",
          "body": "Use a interação para percorrer a pipeline e notar onde surgem classificação, mediação, sincronização, persistência ou reaproveitamento.",
          "items": [
            "Armazenamento com política",
            "Freshness check",
            "Revalidação",
            "Invalidação prática"
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
        "O eixo central desta aula vai de frescor imediato até reaproveitamento agressivo. Quanto mais você reaproveita respostas, menor fica a latência e a carga na origem - mas maior precisa ser a disciplina para distinguir conteúdo imutável, revalidável e privado.",
        "Empurrar o desenho demais para um extremo tende a simplificar uma parte e complicar outra. O trabalho do arquiteto é tornar essa troca visível, não escondê-la atrás de defaults.",
        "Por isso, a pergunta madura não é 'qual tecnologia vence?'. É 'qual ponto do eixo faz sentido para este perfil de tráfego, risco e equipe?'."
      ],
      "blocks": [
        {
          "type": "insight",
          "title": "Projeto é posicionamento",
          "body": "O eixo 'frescor imediato ↔ reaproveitamento agressivo' existe porque cada ponta otimiza uma propriedade diferente do sistema."
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
        "O erro recorrente é definir cabeçalhos de cache por costume ou por copiar e colar, sem pensar no tipo de resposta. Isso costuma soar plausível porque a abstração superficial parece simples demais.",
        "Na prática, o limite aparece quando recursos personalizados ou muito mutáveis acabam servidos com política errada, gerando stale data ou comportamento inconsistente. É nesse ponto que o sistema revela o que realmente estava sendo garantido - ou apenas assumido.",
        "Tratar esses limites como detalhes raros é caro. Tratá-los como parte do desenho inicial economiza incidentes, retrabalho e debates improdutivos depois."
      ],
      "blocks": [
        {
          "type": "mistake",
          "title": "Suposição perigosa",
          "body": "definir cabeçalhos de cache por costume ou por copiar e colar, sem pensar no tipo de resposta"
        },
        {
          "type": "insight",
          "title": "Limites são parte da especificação",
          "body": "recursos personalizados ou muito mutáveis acabam servidos com política errada, gerando stale data ou comportamento inconsistente"
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
        "Uma regra prática desta aula é separe assets imutáveis, recursos revalidáveis e respostas privadas antes de escolher cabeçalhos.",
        "Repare nos cenários propostos: bundle versionado, api de catálogo e dashboard pessoal. O mecanismo é o mesmo, mas a decisão muda conforme estado, risco e tipo de carga.",
        "É por isso que bons times documentam intenção, observam métricas e revisam o desenho quando o contexto operacional muda."
      ],
      "blocks": [
        {
          "type": "example",
          "title": "Heurística de decisão",
          "body": "As recomendações abaixo não são receitas eternas; elas são pontos de partida guiados pelo mecanismo que a aula explicou.",
          "items": [
            "Usar cache longo e imutável com versionamento no nome do asset.",
            "Combinar freshness moderada com revalidação por ETag ou Last-Modified.",
            "Usar política privada ou sem armazenamento compartilhado e revisar Vary quando necessário."
          ]
        },
        {
          "type": "definition",
          "title": "Regra prática",
          "body": "separe assets imutáveis, recursos revalidáveis e respostas privadas antes de escolher cabeçalhos"
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
        "Apps de IA também servem bundles, documentação, artefatos estáticos e APIs de leitura que se beneficiam de caching bem desenhado.",
        "Em produtos modernos, a mesma lógica reaparece em APIs, jobs assíncronos, pipelines de dados, páginas web, storage, modelos e plataformas internas.",
        "Aprender este tópico dá vocabulário para discutir latência, throughput, integridade, consistência, segurança e custo com mais precisão técnica."
      ],
      "blocks": [
        {
          "type": "insight",
          "title": "Transferência de modelo mental",
          "body": "latência percebida, carga na origem, correção do conteúdo e previsibilidade entre navegador, proxy e CDN"
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
      "body": "reduzir transferências e carga na origem com regras explícitas de frescor, validação e reaproveitamento"
    },
    {
      "title": "Modelo mental",
      "body": "pensar em cache como um contrato sobre frescor e sobre o direito de reutilizar uma representação"
    },
    {
      "title": "Erro comum",
      "body": "definir cabeçalhos de cache por costume ou por copiar e colar, sem pensar no tipo de resposta"
    },
    {
      "title": "Onde reaparece",
      "body": "Apps de IA também servem bundles, documentação, artefatos estáticos e APIs de leitura que se beneficiam de caching bem desenhado"
    }
  ],
  "quiz": [
    {
      "id": "q1",
      "prompt": "Qual é a função principal de HTTP Caching em um sistema?",
      "options": [
        {
          "id": "a",
          "label": "reduzir transferências e carga na origem com regras explícitas de frescor, validação e reaproveitamento"
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
      "feedback": "A ideia central da aula é reduzir transferências e carga na origem com regras explícitas de frescor, validação e reaproveitamento. O tema melhora o projeto do sistema, mas não apaga restrições físicas nem substitui todas as outras camadas."
    },
    {
      "id": "q2",
      "prompt": "Qual modelo mental ajuda mais a entender http caching?",
      "options": [
        {
          "id": "a",
          "label": "pensar em cache como um contrato sobre frescor e sobre o direito de reutilizar uma representação"
        },
        {
          "id": "b",
          "label": "Pensar apenas na interface visual, ignorando o mecanismo interno."
        },
        {
          "id": "c",
          "label": "Assumir que http caching resolve sozinho qualquer gargalo restante."
        }
      ],
      "correctOptionId": "a",
      "feedback": "O melhor atalho mental aqui é: pensar em cache como um contrato sobre frescor e sobre o direito de reutilizar uma representação. Esse modelo ajuda a prever custo, limite e comportamento operacional."
    },
    {
      "id": "q3",
      "prompt": "No fluxo estudado, qual etapa aparece cedo e condiciona decisões posteriores?",
      "options": [
        {
          "id": "a",
          "label": "Armazenamento com política"
        },
        {
          "id": "b",
          "label": "Invalidação prática"
        },
        {
          "id": "c",
          "label": "Uma etapa mágica que elimina a necessidade de observar o sistema."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Armazenamento com política acontece cedo e molda o resto do caminho. Erros de classificação ou roteamento se propagam com facilidade."
    },
    {
      "id": "q4",
      "prompt": "Qual afirmação descreve melhor o trade-off central da aula?",
      "options": [
        {
          "id": "a",
          "label": "O objetivo é equilibrar frescor imediato e reaproveitamento agressivo, não maximizar um extremo automaticamente."
        },
        {
          "id": "b",
          "label": "Sempre vale empurrar tudo para reaproveitamento agressivo."
        },
        {
          "id": "c",
          "label": "Sempre vale empurrar tudo para frescor imediato."
        }
      ],
      "correctOptionId": "a",
      "feedback": "O eixo 'frescor imediato ↔ reaproveitamento agressivo' existe porque cada extremo resolve uma dor e cria outra. Projeto maduro explicita essa troca."
    },
    {
      "id": "q5",
      "prompt": "Qual das opções abaixo representa um erro comum discutido na aula?",
      "options": [
        {
          "id": "a",
          "label": "definir cabeçalhos de cache por costume ou por copiar e colar, sem pensar no tipo de resposta"
        },
        {
          "id": "b",
          "label": "separe assets imutáveis, recursos revalidáveis e respostas privadas antes de escolher cabeçalhos"
        },
        {
          "id": "c",
          "label": "Medir hipóteses antes de alterar um sistema que já está em produção."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Este é o atalho mental perigoso do tema: definir cabeçalhos de cache por costume ou por copiar e colar, sem pensar no tipo de resposta. A aula insiste em tornar essas suposições explícitas."
    },
    {
      "id": "q6",
      "prompt": "Pensando em cenários reais, qual decisão inicial está mais alinhada com a aula?",
      "options": [
        {
          "id": "a",
          "label": "Usar cache longo e imutável com versionamento no nome do asset."
        },
        {
          "id": "b",
          "label": "Combinar freshness moderada com revalidação por ETag ou Last-Modified."
        },
        {
          "id": "c",
          "label": "Usar política privada ou sem armazenamento compartilhado e revisar Vary quando necessário."
        }
      ],
      "correctOptionId": "a",
      "feedback": "No primeiro cenário, a recomendação é usar cache longo e imutável com versionamento no nome do asset.. A solução depende do mecanismo certo para o caso, não de um padrão aplicado sem contexto."
    },
    {
      "id": "q7",
      "prompt": "Por que este tema também importa para sistemas de IA e produtos modernos?",
      "options": [
        {
          "id": "a",
          "label": "Apps de IA também servem bundles, documentação, artefatos estáticos e APIs de leitura que se beneficiam de caching bem desenhado"
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
      "feedback": "A ponte da aula é direta: apps de ia também servem bundles, documentação, artefatos estáticos e apis de leitura que se beneficiam de caching bem desenhado. Os mesmos fundamentos reaparecem em serving, dados, rede, storage e operação."
    },
    {
      "id": "q8",
      "prompt": "O que costuma quebrar ou exigir cuidado adicional neste tema?",
      "options": [
        {
          "id": "a",
          "label": "recursos personalizados ou muito mutáveis acabam servidos com política errada, gerando stale data ou comportamento inconsistente"
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
      "feedback": "O limite importante aqui é concreto: recursos personalizados ou muito mutáveis acabam servidos com política errada, gerando stale data ou comportamento inconsistente. Em sistemas reais, garantias dependem de política, falha, carga e integração entre camadas."
    }
  ],
  "glossary": [
    {
      "term": "Cache-Control",
      "definition": "Cabeçalho que expressa diretivas de armazenamento e frescor em HTTP."
    },
    {
      "term": "ETag",
      "definition": "Validador que identifica uma representação específica de um recurso."
    },
    {
      "term": "Last-Modified",
      "definition": "Cabeçalho que informa quando a representação foi modificada pela última vez."
    },
    {
      "term": "304 Not Modified",
      "definition": "Resposta de revalidação que indica que a representação armazenada ainda vale."
    },
    {
      "term": "Freshness",
      "definition": "Janela em que uma resposta pode ser reutilizada sem consultar a origem."
    },
    {
      "term": "Revalidation",
      "definition": "Processo de confirmar com a origem se uma resposta antiga ainda é válida."
    },
    {
      "term": "immutable",
      "definition": "Diretiva que sinaliza que o recurso não mudará durante seu período de cache."
    },
    {
      "term": "private",
      "definition": "Diretiva indicando que a resposta não deve ser armazenada por caches compartilhados."
    },
    {
      "term": "Vary",
      "definition": "Cabeçalho que diz quais atributos da requisição influenciam a representação cacheável."
    },
    {
      "term": "Surrogate cache",
      "definition": "Cache intermediário, como CDN ou proxy reverso, entre cliente e origem."
    }
  ]
} satisfies LessonContent;
