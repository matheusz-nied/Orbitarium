import type { LessonContent } from "../../../types/content";

export const bitsPortasLogicasCircuitosContent: LessonContent = {
  "id": "bits-portas-logicas-circuitos",
  "title": "Bits, Portas Lógicas e Circuitos",
  "subtitle": "Da distinção entre 0 e 1 até o surgimento de somadores, multiplexadores e estado: a ponte entre álgebra booleana e hardware real.",
  "description": "Uma aula introdutória sobre bits, portas lógicas, tabelas verdade, lógica combinacional, flip-flops e a construção progressiva de circuitos digitais.",
  "primaryCategoryId": "computacao",
  "secondaryCategoryId": "matematica",
  "level": "Iniciante",
  "estimatedTime": "40-50 min",
  "tags": [
    "Bits",
    "Portas Lógicas",
    "Circuitos",
    "Álgebra Booleana",
    "Clock",
    "Hardware"
  ],
  "learningObjectives": [
    "Entender bits como abstração discreta sobre estados físicos.",
    "Relacionar portas lógicas a tabelas verdade e expressões booleanas.",
    "Perceber a diferença entre lógica combinacional e lógica sequencial.",
    "Enxergar como circuitos maiores surgem da composição de blocos simples."
  ],
  "prerequisites": [
    "Curiosidade sobre eletrônica digital e computadores.",
    "Noção básica de verdadeiro e falso já ajuda bastante.",
    "Não é preciso ter cursado eletrônica antes."
  ],
  "references": [
    {
      "title": "Nand to Tetris",
      "source": "nand2tetris",
      "url": "https://www.nand2tetris.org/",
      "note": "Projeto educacional excelente para ligar portas lógicas a computadores completos."
    },
    {
      "title": "Computation Structures",
      "source": "MIT OpenCourseWare 6.004",
      "url": "https://ocw.mit.edu/courses/6-004-computation-structures-spring-2017/",
      "note": "Curso de referência em lógica digital e circuitos."
    },
    {
      "title": "logic gate",
      "source": "Britannica",
      "url": "https://www.britannica.com/technology/logic-gate",
      "note": "Explicação enciclopédica confiável sobre portas lógicas."
    },
    {
      "title": "Computing",
      "source": "Khan Academy",
      "url": "https://www.khanacademy.org/computing/computer-science",
      "note": "Material introdutório útil para bits, representação e lógica booleana."
    },
    {
      "title": "Boolean algebra",
      "source": "Britannica",
      "url": "https://www.britannica.com/science/Boolean-algebra",
      "note": "Base conceitual para relacionar portas, expressões e circuitos."
    }
  ],
  "heroVisual": "lesson-hero",
  "openingText": "Antes de existir CPU, sistema operacional ou modelo de IA, existe uma pergunta mais básica: como transformar estados físicos ruidosos em decisões discretas e reprodutíveis? Bits, portas lógicas e circuitos respondem isso. Eles são a base do hardware digital sobre a qual todo o resto do computador é construído.",
  "quickFacts": [
    {
      "title": "Unidade crítica",
      "body": "o bit e a saída produzida por cada porta ou elemento de estado"
    },
    {
      "title": "Trade-off central",
      "body": "simplicidade conceitual ↔ expressividade dos circuitos"
    },
    {
      "title": "Regra prática",
      "body": "sempre pergunte o que é combinacional, o que é estado e onde está a fronteira de clock"
    }
  ],
  "sections": [
    {
      "id": "motivacao",
      "eyebrow": "Motivação",
      "title": "Por que Bits, Portas Lógicas e Circuitos aparece em sistemas sérios",
      "lead": "Mostrar como estados binários e operações booleanas se compõem em circuitos úteis muda latência, custo, previsibilidade ou segurança. Por isso, o tema aparece cedo em qualquer sistema que sai do protótipo.",
      "visual": "lesson-hero",
      "paragraphs": [
        "Bits, Portas Lógicas e Circuitos existe para mostrar como estados binários e operações booleanas se compõem em circuitos úteis. Sem isso, o computador moderno pareceria uma caixa mágica sem ponte entre matemática e hardware.",
        "Um bom modelo intuitivo é pensar em circuitos como uma composição de blocos que implementam tabelas verdade e, às vezes, lembram o passado. Pense em somar dois bits, selecionar um caminho com um multiplexador e armazenar um valor com estado.",
        "Esse assunto importa porque afeta compreensão da ponte entre álgebra booleana, hardware e desempenho físico. Quando você o entende, decisões de arquitetura deixam de parecer um conjunto de truques desconexos."
      ],
      "blocks": [
        {
          "type": "insight",
          "title": "Intuição útil",
          "body": "pensar em circuitos como uma composição de blocos que implementam tabelas verdade e, às vezes, lembram o passado"
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "imaginar portas lógicas como instruções de software executadas uma depois da outra"
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
        "Definição operacional: conjunto de abstrações que usa níveis discretos, portas booleanas e elementos de memória para construir hardware digital.",
        "A unidade crítica para raciocinar sobre custo e comportamento é o bit e a saída produzida por cada porta ou elemento de estado. É nela que atrasos, contenção ou corrupção costumam aparecer primeiro.",
        "Quando você enxerga a unidade certa, fica mais fácil separar sintoma de causa. Isso evita o atalho mental de achar que imaginar portas lógicas como instruções de software executadas uma depois da outra."
      ],
      "blocks": [
        {
          "type": "definition",
          "title": "Definição",
          "body": "conjunto de abstrações que usa níveis discretos, portas booleanas e elementos de memória para construir hardware digital"
        },
        {
          "type": "example",
          "title": "Exemplo concreto",
          "body": "somar dois bits, selecionar um caminho com um multiplexador e armazenar um valor com estado"
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
        "Em alto nível, o fluxo é bits entram, portas combinacionais transformam sinais, blocos maiores compõem operações e registradores capturam estado em fronteiras de clock.",
        "Em vez de decorar siglas, vale observar a ordem das decisões: codificação binária, combinação por portas, composição em blocos e captura de estado. O desenho muda de tema para tema, mas a disciplina mental é a mesma.",
        "A pergunta importante não é apenas 'qual etapa existe?'. A pergunta melhor é 'onde a decisão errada se propaga e quanto custa corrigi-la depois?'."
      ],
      "blocks": [
        {
          "type": "example",
          "title": "Etapas para observar",
          "body": "Use a interação para percorrer a pipeline e notar onde surgem classificação, mediação, sincronização, persistência ou reaproveitamento.",
          "items": [
            "Codificação binária",
            "Combinação por portas",
            "Composição em blocos",
            "Captura de estado"
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
        "O eixo central desta aula vai de simplicidade conceitual até expressividade dos circuitos. Poucas portas básicas já permitem construir máquinas poderosas, mas cada camada extra adiciona atraso, fan-out, necessidade de clock e mais complexidade de projeto.",
        "Empurrar o desenho demais para um extremo tende a simplificar uma parte e complicar outra. O trabalho do arquiteto é tornar essa troca visível, não escondê-la atrás de defaults.",
        "Por isso, a pergunta madura não é 'qual tecnologia vence?'. É 'qual ponto do eixo faz sentido para este perfil de tráfego, risco e equipe?'."
      ],
      "blocks": [
        {
          "type": "insight",
          "title": "Projeto é posicionamento",
          "body": "O eixo 'simplicidade conceitual ↔ expressividade dos circuitos' existe porque cada ponta otimiza uma propriedade diferente do sistema."
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
        "O erro recorrente é imaginar portas lógicas como instruções de software executadas uma depois da outra. Isso costuma soar plausível porque a abstração superficial parece simples demais.",
        "Na prática, o limite aparece quando o circuito parece correto na tabela verdade, mas falha quando timing, clock e estado entram na história. É nesse ponto que o sistema revela o que realmente estava sendo garantido - ou apenas assumido.",
        "Tratar esses limites como detalhes raros é caro. Tratá-los como parte do desenho inicial economiza incidentes, retrabalho e debates improdutivos depois."
      ],
      "blocks": [
        {
          "type": "mistake",
          "title": "Suposição perigosa",
          "body": "imaginar portas lógicas como instruções de software executadas uma depois da outra"
        },
        {
          "type": "insight",
          "title": "Limites são parte da especificação",
          "body": "o circuito parece correto na tabela verdade, mas falha quando timing, clock e estado entram na história"
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
        "Uma regra prática desta aula é sempre pergunte o que é combinacional, o que é estado e onde está a fronteira de clock.",
        "Repare nos cenários propostos: somar dois bits, selecionar um caminho e guardar um valor. O mecanismo é o mesmo, mas a decisão muda conforme estado, risco e tipo de carga.",
        "É por isso que bons times documentam intenção, observam métricas e revisam o desenho quando o contexto operacional muda."
      ],
      "blocks": [
        {
          "type": "example",
          "title": "Heurística de decisão",
          "body": "As recomendações abaixo não são receitas eternas; elas são pontos de partida guiados pelo mecanismo que a aula explicou.",
          "items": [
            "Modelar a tabela verdade e compor um meio somador antes de pensar em algo maior.",
            "Usar a ideia de multiplexação em vez de tentar desenhar ligações arbitrárias.",
            "Adicionar estado com flip-flops ou registradores e pensar no clock."
          ]
        },
        {
          "type": "definition",
          "title": "Regra prática",
          "body": "sempre pergunte o que é combinacional, o que é estado e onde está a fronteira de clock"
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
        "Aceleradores, CPUs e controladores digitais ainda reduzem, no fundo, à composição de lógica e armazenamento binário.",
        "Em produtos modernos, a mesma lógica reaparece em APIs, jobs assíncronos, pipelines de dados, páginas web, storage, modelos e plataformas internas.",
        "Aprender este tópico dá vocabulário para discutir latência, throughput, integridade, consistência, segurança e custo com mais precisão técnica."
      ],
      "blocks": [
        {
          "type": "insight",
          "title": "Transferência de modelo mental",
          "body": "compreensão da ponte entre álgebra booleana, hardware e desempenho físico"
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
      "body": "mostrar como estados binários e operações booleanas se compõem em circuitos úteis"
    },
    {
      "title": "Modelo mental",
      "body": "pensar em circuitos como uma composição de blocos que implementam tabelas verdade e, às vezes, lembram o passado"
    },
    {
      "title": "Erro comum",
      "body": "imaginar portas lógicas como instruções de software executadas uma depois da outra"
    },
    {
      "title": "Onde reaparece",
      "body": "Aceleradores, CPUs e controladores digitais ainda reduzem, no fundo, à composição de lógica e armazenamento binário"
    }
  ],
  "quiz": [
    {
      "id": "q1",
      "prompt": "Qual é a função principal de Bits, Portas Lógicas e Circuitos em um sistema?",
      "options": [
        {
          "id": "a",
          "label": "mostrar como estados binários e operações booleanas se compõem em circuitos úteis"
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
      "feedback": "A ideia central da aula é mostrar como estados binários e operações booleanas se compõem em circuitos úteis. O tema melhora o projeto do sistema, mas não apaga restrições físicas nem substitui todas as outras camadas."
    },
    {
      "id": "q2",
      "prompt": "Qual modelo mental ajuda mais a entender bits, portas lógicas e circuitos?",
      "options": [
        {
          "id": "a",
          "label": "pensar em circuitos como uma composição de blocos que implementam tabelas verdade e, às vezes, lembram o passado"
        },
        {
          "id": "b",
          "label": "Pensar apenas na interface visual, ignorando o mecanismo interno."
        },
        {
          "id": "c",
          "label": "Assumir que bits, portas lógicas e circuitos resolve sozinho qualquer gargalo restante."
        }
      ],
      "correctOptionId": "a",
      "feedback": "O melhor atalho mental aqui é: pensar em circuitos como uma composição de blocos que implementam tabelas verdade e, às vezes, lembram o passado. Esse modelo ajuda a prever custo, limite e comportamento operacional."
    },
    {
      "id": "q3",
      "prompt": "No fluxo estudado, qual etapa aparece cedo e condiciona decisões posteriores?",
      "options": [
        {
          "id": "a",
          "label": "Codificação binária"
        },
        {
          "id": "b",
          "label": "Captura de estado"
        },
        {
          "id": "c",
          "label": "Uma etapa mágica que elimina a necessidade de observar o sistema."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Codificação binária acontece cedo e molda o resto do caminho. Erros de classificação ou roteamento se propagam com facilidade."
    },
    {
      "id": "q4",
      "prompt": "Qual afirmação descreve melhor o trade-off central da aula?",
      "options": [
        {
          "id": "a",
          "label": "O objetivo é equilibrar simplicidade conceitual e expressividade dos circuitos, não maximizar um extremo automaticamente."
        },
        {
          "id": "b",
          "label": "Sempre vale empurrar tudo para expressividade dos circuitos."
        },
        {
          "id": "c",
          "label": "Sempre vale empurrar tudo para simplicidade conceitual."
        }
      ],
      "correctOptionId": "a",
      "feedback": "O eixo 'simplicidade conceitual ↔ expressividade dos circuitos' existe porque cada extremo resolve uma dor e cria outra. Projeto maduro explicita essa troca."
    },
    {
      "id": "q5",
      "prompt": "Qual das opções abaixo representa um erro comum discutido na aula?",
      "options": [
        {
          "id": "a",
          "label": "imaginar portas lógicas como instruções de software executadas uma depois da outra"
        },
        {
          "id": "b",
          "label": "sempre pergunte o que é combinacional, o que é estado e onde está a fronteira de clock"
        },
        {
          "id": "c",
          "label": "Medir hipóteses antes de alterar um sistema que já está em produção."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Este é o atalho mental perigoso do tema: imaginar portas lógicas como instruções de software executadas uma depois da outra. A aula insiste em tornar essas suposições explícitas."
    },
    {
      "id": "q6",
      "prompt": "Pensando em cenários reais, qual decisão inicial está mais alinhada com a aula?",
      "options": [
        {
          "id": "a",
          "label": "Modelar a tabela verdade e compor um meio somador antes de pensar em algo maior."
        },
        {
          "id": "b",
          "label": "Usar a ideia de multiplexação em vez de tentar desenhar ligações arbitrárias."
        },
        {
          "id": "c",
          "label": "Adicionar estado com flip-flops ou registradores e pensar no clock."
        }
      ],
      "correctOptionId": "a",
      "feedback": "No primeiro cenário, a recomendação é modelar a tabela verdade e compor um meio somador antes de pensar em algo maior.. A solução depende do mecanismo certo para o caso, não de um padrão aplicado sem contexto."
    },
    {
      "id": "q7",
      "prompt": "Por que este tema também importa para sistemas de IA e produtos modernos?",
      "options": [
        {
          "id": "a",
          "label": "Aceleradores, CPUs e controladores digitais ainda reduzem, no fundo, à composição de lógica e armazenamento binário"
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
      "feedback": "A ponte da aula é direta: aceleradores, cpus e controladores digitais ainda reduzem, no fundo, à composição de lógica e armazenamento binário. Os mesmos fundamentos reaparecem em serving, dados, rede, storage e operação."
    },
    {
      "id": "q8",
      "prompt": "O que costuma quebrar ou exigir cuidado adicional neste tema?",
      "options": [
        {
          "id": "a",
          "label": "o circuito parece correto na tabela verdade, mas falha quando timing, clock e estado entram na história"
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
      "feedback": "O limite importante aqui é concreto: o circuito parece correto na tabela verdade, mas falha quando timing, clock e estado entram na história. Em sistemas reais, garantias dependem de política, falha, carga e integração entre camadas."
    }
  ],
  "glossary": [
    {
      "term": "Bit",
      "definition": "Menor unidade de informação discreta em sistemas digitais, tipicamente 0 ou 1."
    },
    {
      "term": "Tabela verdade",
      "definition": "Tabela que mostra a saída de uma função booleana para todas as combinações de entrada."
    },
    {
      "term": "Porta lógica",
      "definition": "Bloco físico que implementa uma operação booleana simples sobre sinais."
    },
    {
      "term": "Álgebra booleana",
      "definition": "Sistema algébrico usado para raciocinar sobre verdadeiro e falso."
    },
    {
      "term": "Lógica combinacional",
      "definition": "Circuitos cuja saída depende apenas das entradas atuais."
    },
    {
      "term": "Lógica sequencial",
      "definition": "Circuitos cuja saída depende também de estado armazenado anteriormente."
    },
    {
      "term": "Flip-flop",
      "definition": "Elemento básico de armazenamento usado para reter um bit ao longo do tempo."
    },
    {
      "term": "Somador",
      "definition": "Circuito que realiza adição binária e pode produzir carry."
    },
    {
      "term": "Multiplexador",
      "definition": "Circuito que escolhe uma entre várias entradas conforme sinais de seleção."
    },
    {
      "term": "Clock",
      "definition": "Sinal temporal que coordena atualização de elementos sequenciais."
    }
  ]
} satisfies LessonContent;
