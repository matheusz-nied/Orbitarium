import type { LessonContent } from "../../../types/content";

export const pipelineDeCpuContent: LessonContent = {
  "id": "pipeline-de-cpu",
  "title": "Pipeline de CPU",
  "subtitle": "Sobreposição de etapas para ganhar throughput — e os hazards que aparecem quando instruções dependem umas das outras.",
  "description": "Uma aula visual sobre IF/ID/EX/MEM/WB, throughput, latência, hazards de dados e controle, stalls, forwarding e previsão de desvios.",
  "primaryCategoryId": "computacao",
  "secondaryCategoryId": "engenharia",
  "level": "Avançado",
  "estimatedTime": "50-65 min",
  "tags": [
    "CPU",
    "Pipeline",
    "Hazards",
    "Forwarding",
    "Branch prediction",
    "Arquitetura de computadores"
  ],
  "learningObjectives": [
    "Explicar por que pipeline aumenta throughput sem necessariamente reduzir latência individual.",
    "Reconhecer o papel das etapas IF, ID, EX, MEM e WB em um pipeline clássico.",
    "Distinguir hazards estruturais, de dados e de controle.",
    "Entender por que stalls e bolhas surgem quando dependências entram em conflito com sobreposição.",
    "Interpretar forwarding e previsão de desvios como mecanismos para salvar throughput.",
    "Ler pipelines como compromissos entre simplicidade, frequência e complexidade de controle."
  ],
  "prerequisites": [
    "Noção básica de CPU e ciclo de instrução.",
    "Familiaridade leve com registradores e memória ajuda bastante.",
    "Disposição para pensar em várias instruções coexistindo ao mesmo tempo no hardware."
  ],
  "references": [
    {
      "title": "15 Pipelining the Beta",
      "source": "MIT OpenCourseWare 6.004",
      "url": "https://ocw.mit.edu/courses/6-004-computation-structures-spring-2017/pages/c15/",
      "note": "Página oficial do módulo de pipeline no curso de Computation Structures."
    },
    {
      "title": "Pipeline Hazards",
      "source": "MIT OpenCourseWare 6.004",
      "url": "https://ocw.mit.edu/courses/6-004-computation-structures-spring-2017/pages/c15/c15s1/",
      "note": "Material oficial sobre hazards, stalls, bypassing e controle."
    },
    {
      "title": "Annotated Slides on Pipelining",
      "source": "MIT OpenCourseWare 6.004",
      "url": "https://ocw.mit.edu/courses/6-004-computation-structures-spring-2017/7e3cf23c8eff1f556aff9ed11c96b438_IE9cFQ9b33U.pdf",
      "note": "Slides anotados com o pipeline de 5 estágios e dependências."
    },
    {
      "title": "Pipeline Issues",
      "source": "MIT OpenCourseWare 6.004",
      "url": "https://ocw.mit.edu/courses/6-004-computation-structures-spring-2009/resources/mit6_004s09_lec23/",
      "note": "Material adicional sobre hazards de controle, annulment e exceções."
    },
    {
      "title": "Machine Language, Assemblers, and Compilers",
      "source": "MIT OpenCourseWare 6.004",
      "url": "https://ocw.mit.edu/courses/6-004-computation-structures-spring-2009/resources/lecture-notes/",
      "note": "Coleção de notas do curso que contextualiza pipeline dentro da arquitetura."
    }
  ],
  "heroVisual": "pipeline-cpu-hero",
  "openingText": "Uma CPU pipelined não espera uma instrução terminar por completo para começar a próxima. Em vez disso, sobrepõe etapas diferentes de várias instruções ao mesmo tempo, como uma linha de montagem. O ganho central é throughput: mais instruções concluídas por unidade de tempo. Mas a mágica cobra um preço. Assim que duas instruções disputam o mesmo recurso ou quando uma precisa de um resultado ainda não pronto, surgem hazards. Entender pipeline é entender tanto a elegância da sobreposição quanto a engenharia necessária para impedir que essa elegância desmorone.",
  "quickFacts": [
    {
      "title": "Pipeline melhora vazão",
      "body": "O principal ganho é concluir mais instruções por unidade de tempo."
    },
    {
      "title": "Latência individual pode continuar parecida",
      "body": "Uma instrução ainda atravessa várias etapas; o ganho vem da sobreposição entre instruções."
    },
    {
      "title": "Hazards são o preço da paralelização interna",
      "body": "Dependências e disputas impedem que o fluxo ideal se mantenha sempre cheio."
    }
  ],
  "sections": [
    {
      "id": "intuicao",
      "eyebrow": "Intuição",
      "title": "Pipeline troca trabalho sequencial por trabalho sobreposto",
      "lead": "Em vez de uma instrução monopolizar a CPU até o fim, várias instruções percorrem estágios diferentes em paralelo.",
      "visual": "pipeline-cpu-mapa",
      "paragraphs": [
        "A analogia com linha de montagem é útil porque mostra a essência do ganho: enquanto uma instrução está buscando dados, outra pode estar decodificando e uma terceira já pode estar executando na ALU.",
        "Isso não faz uma única instrução teletransportar; o que aumenta é a ocupação eficiente do hardware entre instruções consecutivas."
      ],
      "blocks": [
        {
          "type": "definition",
          "title": "Throughput",
          "body": "Quantidade de instruções concluídas por unidade de tempo."
        },
        {
          "type": "insight",
          "title": "Latência e throughput não são a mesma coisa",
          "body": "Pipeline foi criado sobretudo para melhorar vazão, não para encurtar dramaticamente o caminho individual de cada instrução."
        }
      ]
    },
    {
      "id": "estagios",
      "eyebrow": "Fluxo",
      "title": "No pipeline clássico, cada estágio faz uma parte pequena e previsível do trabalho",
      "lead": "Separar IF, ID, EX, MEM e WB ajuda a modular a CPU e a permitir sobreposição.",
      "interactive": "pipeline-stages-lab",
      "paragraphs": [
        "O estágio de busca traz a instrução, o de decodificação entende operandos, o de execução calcula, o de memória acessa dados quando necessário e o de write-back publica o resultado.",
        "Esse desenho parece limpo no quadro, mas só funciona bem se os estágios estiverem equilibrados e se as dependências entre instruções puderem ser tratadas sem esvaziar o pipeline com frequência demais."
      ],
      "blocks": [
        {
          "type": "example",
          "title": "Exemplo",
          "body": "Enquanto uma instrução faz acesso à memória, outra pode estar apenas sendo buscada e outra pode estar escrevendo resultado."
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Imaginar que todas as instruções usam todas as etapas do mesmo jeito. O fluxo lógico passa pelos estágios, mas nem toda instrução usa recursos intensivos em cada um."
        }
      ]
    },
    {
      "id": "hazards-intuicao",
      "eyebrow": "Problema",
      "title": "Hazards surgem quando a sobreposição encontra dependências reais",
      "lead": "O fluxo ideal quebra quando duas instruções querem o mesmo recurso ou quando uma depende da outra cedo demais.",
      "paragraphs": [
        "Hazards estruturais aparecem quando o hardware não consegue atender duas demandas ao mesmo tempo. Hazards de dados surgem quando uma instrução precisa de um valor ainda não escrito. Hazards de controle surgem quando não sabemos com segurança qual é a próxima instrução correta por causa de um desvio.",
        "Essa taxonomia é útil porque cada família de hazard tende a exigir estratégias diferentes de correção e de otimização."
      ],
      "blocks": [
        {
          "type": "definition",
          "title": "Hazard",
          "body": "Situação em que a execução correta ou eficiente do pipeline é ameaçada por conflito de recurso, dependência de dados ou incerteza de controle."
        },
        {
          "type": "insight",
          "title": "Pipeline bom é pipeline que lida bem com o imperfeito",
          "body": "O desenho ideal sem hazards quase nunca existe em programas reais; o valor está em mitigar conflitos frequentes."
        }
      ]
    },
    {
      "id": "hazards-comparacao",
      "eyebrow": "Comparação",
      "title": "Nem todo hazard dói do mesmo jeito",
      "lead": "Comparar famílias de hazards ajuda a priorizar soluções de hardware e software.",
      "interactive": "hazards-lab",
      "paragraphs": [
        "Alguns conflitos podem ser resolvidos duplicando recursos; outros pedem bypassing; outros dependem de adivinhar o futuro com previsão de desvios. O custo de corrigir cada tipo no hardware também varia bastante.",
        "Uma CPU moderna de alto desempenho investe pesado justamente para não perder tantas bolhas nos casos mais frequentes."
      ],
      "blocks": [
        {
          "type": "example",
          "title": "Exemplo",
          "body": "Uma dependência simples entre instruções aritméticas pode ser resolvida com forwarding; um branch mal previsto pode jogar fora várias instruções especulativas."
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Tratar todos os stalls como se tivessem a mesma causa. Sem identificar o tipo de hazard, a mitigação vira adivinhação."
        }
      ]
    },
    {
      "id": "tradeoffs-de-controle",
      "eyebrow": "Trade-off",
      "title": "Stalls, forwarding e previsão existem para recuperar throughput",
      "lead": "O pipeline precisa de estratégias ativas para não desperdiçar paralelismo interno.",
      "interactive": "throughput-dial-lab",
      "paragraphs": [
        "Stalls são a solução mais simples: esperar. Forwarding encurta a espera ao encaminhar resultados antes do write-back. Já desvios exigem apostar em um caminho provável e lidar com penalidade quando a aposta falha.",
        "Cada mecanismo melhora uma classe de problema, mas aumenta a complexidade do hardware e do controle. A história do pipeline moderno é também a história dessa escalada de sofisticação."
      ],
      "blocks": [
        {
          "type": "definition",
          "title": "Forwarding",
          "body": "Técnica que encaminha resultados produzidos em etapas posteriores diretamente para instruções que já precisam deles."
        },
        {
          "type": "insight",
          "title": "Esperar é correto, mas caro",
          "body": "Stalls mantêm a correção, porém jogam fora parte da vazão que justificou o pipeline."
        }
      ]
    },
    {
      "id": "desempenho-real",
      "eyebrow": "Operação",
      "title": "Desempenho de pipeline depende tanto do programa quanto do hardware",
      "lead": "A mesma CPU pode parecer elegante ou travada dependendo do padrão de dependências do código.",
      "visual": "pipeline-cpu-resumo",
      "paragraphs": [
        "Laços com muitos desvios, dependências apertadas e acessos imprevisíveis à memória tendem a expor mais bolhas e penalidades. Já sequências mais regulares conseguem manter a linha de montagem mais cheia.",
        "Isso explica por que compiladores, escalonamento de instruções e organização do código de máquina conversam tanto com a microarquitetura: o pipeline sente o padrão do programa."
      ],
      "blocks": [
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Achar que pipeline garante aceleração uniforme para qualquer workload. O padrão do código continua importando muito."
        },
        {
          "type": "example",
          "title": "Exemplo",
          "body": "Um loop com dependência direta entre iterações deixa pouco espaço para ocultar latências via sobreposição."
        }
      ]
    },
    {
      "id": "sintese-operacional",
      "eyebrow": "Síntese",
      "title": "Resumo mental do pipeline",
      "lead": "Revise os cartões antes de seguir para microarquitetura mais profunda.",
      "interactive": "summary-cards",
      "paragraphs": [
        "Consolide estágio, hazard e mecanismo de recuperação de throughput."
      ]
    },
    {
      "id": "quiz-revisao",
      "eyebrow": "Revisão",
      "title": "Quiz de revisão",
      "lead": "Teste o entendimento de throughput, hazards e mitigação.",
      "interactive": "quiz",
      "paragraphs": [
        "As perguntas ligam mecanismo e consequência."
      ]
    },
    {
      "id": "glossario",
      "eyebrow": "Vocabulário",
      "title": "Glossário essencial",
      "lead": "Termos que aparecem em arquitetura, microarquitetura e performance.",
      "interactive": "glossary",
      "paragraphs": [
        "Use o glossário para conectar CPU pipeline a leituras mais avançadas."
      ]
    }
  ],
  "summaryCards": [
    {
      "title": "Pipeline busca vazão",
      "body": "O ganho principal é manter múltiplas instruções em estágios diferentes ao mesmo tempo."
    },
    {
      "title": "Hazards quebram o ideal",
      "body": "Dependências e disputas impedem que a linha de montagem permaneça sempre cheia."
    },
    {
      "title": "Mitigação custa complexidade",
      "body": "Forwarding, stalls e previsão salvam throughput, mas complicam bastante o hardware."
    }
  ],
  "quiz": [
    {
      "id": "q1",
      "prompt": "Qual é o objetivo principal do pipeline?",
      "options": [
        {
          "id": "a",
          "label": "Reduzir imediatamente a latência de memória."
        },
        {
          "id": "b",
          "label": "Aumentar throughput ao sobrepor etapas de instruções diferentes."
        },
        {
          "id": "c",
          "label": "Eliminar a necessidade de registradores."
        }
      ],
      "correctOptionId": "b",
      "feedback": "Pipeline foi concebido principalmente para melhorar vazão."
    },
    {
      "id": "q2",
      "prompt": "Qual sequência representa um pipeline clássico de 5 estágios?",
      "options": [
        {
          "id": "a",
          "label": "IF, ID, EX, MEM, WB"
        },
        {
          "id": "b",
          "label": "LEX, PARSE, AST, IR, OBJ"
        },
        {
          "id": "c",
          "label": "GET, PUT, POST, PATCH, DELETE"
        }
      ],
      "correctOptionId": "a",
      "feedback": "IF/ID/EX/MEM/WB é a referência didática clássica."
    },
    {
      "id": "q3",
      "prompt": "O que caracteriza um hazard de dados?",
      "options": [
        {
          "id": "a",
          "label": "Duas instruções querem o mesmo recurso físico ao mesmo tempo."
        },
        {
          "id": "b",
          "label": "Uma instrução precisa de um valor que ainda não ficou pronto."
        },
        {
          "id": "c",
          "label": "O branch predictor acertou demais."
        }
      ],
      "correctOptionId": "b",
      "feedback": "Hazard de dados nasce de dependência temporal entre resultados."
    },
    {
      "id": "q4",
      "prompt": "Para que serve forwarding?",
      "options": [
        {
          "id": "a",
          "label": "Aumentar o tamanho do cache."
        },
        {
          "id": "b",
          "label": "Encaminhar resultado cedo para evitar stalls desnecessários."
        },
        {
          "id": "c",
          "label": "Trocar a ISA da máquina."
        }
      ],
      "correctOptionId": "b",
      "feedback": "Forwarding entrega resultados antes do write-back."
    },
    {
      "id": "q5",
      "prompt": "Hazard de controle está ligado a quê?",
      "options": [
        {
          "id": "a",
          "label": "Incerteza sobre a próxima instrução por causa de desvios."
        },
        {
          "id": "b",
          "label": "Falta de energia no processador."
        },
        {
          "id": "c",
          "label": "Comentários no código-fonte."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Branches e desvios trazem dúvida sobre o fluxo correto."
    },
    {
      "id": "q6",
      "prompt": "Stall resolve conflito como?",
      "options": [
        {
          "id": "a",
          "label": "Mudando a linguagem de programação."
        },
        {
          "id": "b",
          "label": "Esperando até que a condição correta seja satisfeita."
        },
        {
          "id": "c",
          "label": "Ignorando a dependência."
        }
      ],
      "correctOptionId": "b",
      "feedback": "Stalls mantêm correção ao preço de throughput."
    },
    {
      "id": "q7",
      "prompt": "Qual afirmação sobre pipeline é correta?",
      "options": [
        {
          "id": "a",
          "label": "Latência e throughput são equivalentes."
        },
        {
          "id": "b",
          "label": "Pipeline melhora throughput mesmo quando a latência individual não cai muito."
        },
        {
          "id": "c",
          "label": "Pipeline elimina qualquer dependência de dados."
        }
      ],
      "correctOptionId": "b",
      "feedback": "Essa é a intuição correta do ganho de pipeline."
    },
    {
      "id": "q8",
      "prompt": "Por que compiladores se importam com pipeline?",
      "options": [
        {
          "id": "a",
          "label": "Porque o padrão de instruções influencia hazards e ocupação do hardware."
        },
        {
          "id": "b",
          "label": "Porque compiladores substituem completamente o hardware."
        },
        {
          "id": "c",
          "label": "Porque branches não existem em código real."
        }
      ],
      "correctOptionId": "a",
      "feedback": "O arranjo do código afeta como a microarquitetura sente dependências e desvios."
    }
  ],
  "glossary": [
    {
      "term": "Pipeline",
      "definition": "Organização em estágios que sobrepõe partes da execução de várias instruções."
    },
    {
      "term": "IF",
      "definition": "Instruction Fetch: estágio que busca a instrução."
    },
    {
      "term": "ID",
      "definition": "Instruction Decode: estágio que decodifica a instrução e lê operandos."
    },
    {
      "term": "EX",
      "definition": "Execute: estágio em que operações principais são calculadas."
    },
    {
      "term": "MEM",
      "definition": "Estágio de acesso à memória de dados quando necessário."
    },
    {
      "term": "WB",
      "definition": "Write Back: publicação do resultado em registradores."
    },
    {
      "term": "Throughput",
      "definition": "Quantidade de trabalho concluído por unidade de tempo."
    },
    {
      "term": "Latência",
      "definition": "Tempo que uma operação individual leva para atravessar o sistema."
    },
    {
      "term": "Hazard estrutural",
      "definition": "Conflito por recurso físico compartilhado."
    },
    {
      "term": "Hazard de dados",
      "definition": "Dependência em que uma instrução precisa de dado ainda não disponível."
    },
    {
      "term": "Hazard de controle",
      "definition": "Incerteza sobre o fluxo correto por causa de branches ou exceções."
    },
    {
      "term": "Forwarding",
      "definition": "Encaminhamento antecipado de resultados para reduzir stalls."
    }
  ],
  "relatedTopics": [
    {
      "title": "ISA: x86, ARM e RISC-V",
      "body": "Conecte pipeline à interface visível ao software e à implementação interna."
    },
    {
      "title": "Como Funciona um Compilador",
      "body": "Veja como o compilador reorganiza instruções pensando na microarquitetura."
    }
  ]
};
