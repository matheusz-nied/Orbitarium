import type { LessonContent } from "../../../types/content";

export const comoFuncionaUmCompiladorContent: LessonContent = {
  "id": "como-funciona-um-compilador",
  "title": "Como Funciona um Compilador",
  "subtitle": "Do texto-fonte ao código de máquina: léxico, sintaxe, AST, IR, otimização e geração final.",
  "description": "Uma aula visual sobre lexer, parser, AST, IR, otimizações, codegen, alvo de arquitetura e por que um compilador é uma cadeia de traduções bem disciplinadas.",
  "primaryCategoryId": "computacao",
  "secondaryCategoryId": "engenharia",
  "level": "Intermediário",
  "estimatedTime": "45-60 min",
  "tags": [
    "Compiladores",
    "Lexer",
    "Parser",
    "AST",
    "LLVM",
    "IR",
    "Codegen"
  ],
  "learningObjectives": [
    "Descrever o pipeline conceitual de um compilador moderno.",
    "Distinguir tokenização, parsing e construção de AST.",
    "Entender por que IR existe como camada intermediária entre fonte e arquitetura.",
    "Relacionar otimizações a trade-offs entre tempo de compilação e qualidade do código gerado.",
    "Explicar por que o mesmo frontend pode mirar arquiteturas diferentes.",
    "Ler erros de compilação como pistas de em qual estágio o problema ocorreu."
  ],
  "prerequisites": [
    "Noção básica de programação e sintaxe de linguagem.",
    "Curiosidade sobre o que acontece antes do binário final existir.",
    "Não é necessário já ter estudado teoria formal de linguagens."
  ],
  "references": [
    {
      "title": "My First Language Frontend with LLVM",
      "source": "LLVM Documentation",
      "url": "https://llvm.org/docs/tutorial/MyFirstLanguageFrontend/index.html",
      "note": "Tutorial oficial e incremental para construir um frontend com lexer, parser, AST e IR."
    },
    {
      "title": "LLVM Tutorial Table of Contents",
      "source": "LLVM Documentation",
      "url": "https://llvm.org/docs/tutorial/",
      "note": "Visão oficial das etapas de um compilador usando LLVM."
    },
    {
      "title": "Code generation to LLVM IR",
      "source": "LLVM Documentation",
      "url": "https://www.llvm.org/docs/tutorial/MyFirstLanguageFrontend/LangImpl03.html",
      "note": "Explica a passagem da AST para IR."
    },
    {
      "title": "Compiling to Object Code",
      "source": "LLVM Documentation",
      "url": "https://llvm.org/docs/tutorial/MyFirstLanguageFrontend/LangImpl08.html",
      "note": "Mostra como o backend chega ao objeto final para um alvo real."
    },
    {
      "title": "GCC Internals Manual",
      "source": "GNU",
      "url": "https://gcc.gnu.org/onlinedocs/gccint/",
      "note": "Referência oficial sobre a organização interna do GCC."
    },
    {
      "title": "Crafting Interpreters",
      "source": "Bob Nystrom",
      "url": "https://craftinginterpreters.com/",
      "note": "Material didático reconhecido sobre construção de linguagens e frontends."
    }
  ],
  "heroVisual": "compilador-hero",
  "openingText": "Compilar não é um salto mágico do arquivo fonte para um executável. É uma sequência de representações cada vez mais estruturadas e apropriadas para decisões diferentes. Primeiro o compilador precisa reconhecer símbolos; depois entender a estrutura; depois representar o significado da árvore; depois produzir uma forma intermediária que favoreça análise e otimização; por fim, precisa respeitar uma ISA real, registradores, calling conventions e formatos de objeto. O poder do compilador está justamente em separar essas responsabilidades.",
  "quickFacts": [
    {
      "title": "Lexer não entende gramática",
      "body": "Ele reconhece unidades léxicas; a estrutura sintática vem no parser."
    },
    {
      "title": "IR é moeda comum",
      "body": "Uma representação intermediária ajuda a desacoplar frontend, otimizações e backend."
    },
    {
      "title": "Otimizar custa tempo",
      "body": "Mais análise e reescrita podem gerar binários melhores, mas também aumentam tempo de compilação."
    }
  ],
  "sections": [
    {
      "id": "por-que-varias-etapas",
      "eyebrow": "Visão geral",
      "title": "Compiladores são fábricas de representações, não tradutores em um único salto",
      "lead": "A maneira mais estável de transformar linguagem humana estruturada em máquina é decompor o problema.",
      "visual": "compilador-mapa",
      "paragraphs": [
        "Cada estágio do compilador responde uma pergunta diferente: quais são as unidades do texto, como elas se encaixam, o que significam, como podem ser melhoradas e como virar instruções de uma ISA real.",
        "Essa separação permite diagnosticar erros com mais precisão, reutilizar infraestrutura entre linguagens e manter a complexidade administrável."
      ],
      "blocks": [
        {
          "type": "definition",
          "title": "Pipeline de compilação",
          "body": "Sequência de transformações que convertem código-fonte em uma forma executável ou quase executável."
        },
        {
          "type": "insight",
          "title": "Separar responsabilidades simplifica",
          "body": "Quando frontend, otimização e backend são camadas distintas, fica mais fácil evoluir a linguagem e trocar o alvo."
        }
      ]
    },
    {
      "id": "lexer-parser",
      "eyebrow": "Fluxo",
      "title": "Lexer e parser fazem perguntas diferentes ao mesmo texto",
      "lead": "Primeiro reconhecemos peças; depois verificamos como elas se organizam.",
      "interactive": "compiler-pipeline-lab",
      "paragraphs": [
        "O lexer transforma caracteres em tokens como identificadores, números, operadores e palavras-chave. O parser pega esses tokens e tenta encaixá-los na gramática da linguagem para construir uma estrutura mais rica.",
        "Quando esse encaixe falha, o compilador consegue produzir mensagens de erro que apontam não só um caractere errado, mas uma quebra na estrutura esperada da linguagem."
      ],
      "blocks": [
        {
          "type": "example",
          "title": "Exemplo",
          "body": "Na expressão a + b * c, o lexer reconhece nomes e operadores; o parser decide que a multiplicação se agrupa antes da soma."
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Achar que tokenizar e entender precedência são a mesma coisa. Tokenizar reconhece peças; parsing monta a estrutura."
        }
      ]
    },
    {
      "id": "ast-e-significado",
      "eyebrow": "Modelo interno",
      "title": "ASTs capturam estrutura sem carregar todo o ruído textual",
      "lead": "Uma boa árvore sintática abstrai detalhes de superfície para deixar visível o que realmente importa semanticamente.",
      "paragraphs": [
        "Parênteses redundantes, espaços e várias formas sintáticas equivalentes costumam desaparecer em uma AST bem construída. O objetivo não é preservar o texto original, mas representar relações que importam para análise semântica e geração de código.",
        "É nessa fase que nomes, escopos, tipos e usos válidos ou inválidos começam a ganhar uma interpretação mais sólida."
      ],
      "blocks": [
        {
          "type": "definition",
          "title": "AST",
          "body": "Árvore sintática abstrata que representa a estrutura relevante de um programa sem carregar todo o texto bruto."
        },
        {
          "type": "insight",
          "title": "Texto não é o fim do jogo",
          "body": "Uma linguagem pode ter sintaxes diferentes para ideias equivalentes; a AST aproxima essas variações de um núcleo comum."
        }
      ]
    },
    {
      "id": "representacoes",
      "eyebrow": "Comparação",
      "title": "Fonte, AST, IR e código de máquina servem a públicos diferentes",
      "lead": "Cada representação é mais conveniente para algum tipo de análise ou transformação.",
      "interactive": "representation-lab",
      "paragraphs": [
        "O fonte é feito para humanos. A AST ajuda a raciocinar sobre estrutura e semântica. A IR facilita otimizações e análise de fluxo. O código de máquina, por fim, obedece às restrições da arquitetura real.",
        "Misturar todos esses objetivos em uma única forma gera sistemas rígidos e difíceis de evoluir. Por isso compiladores modernos adoram camadas intermediárias explícitas."
      ],
      "blocks": [
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Imaginar que IR é só assembly mais bonito. Em geral ela foi desenhada para análises e transformações que seriam penosas diretamente no assembly."
        },
        {
          "type": "example",
          "title": "Exemplo",
          "body": "Uma IR pode explicitar dependências de dados e blocos básicos de forma mais conveniente para passes de otimização."
        }
      ]
    },
    {
      "id": "otimizacao",
      "eyebrow": "Trade-off",
      "title": "Otimizar é escolher onde gastar tempo de compilação para ganhar qualidade no código final",
      "lead": "Nem toda build precisa do mesmo nível de análise, e nem todo projeto valoriza os mesmos ganhos.",
      "interactive": "optimization-dial-lab",
      "paragraphs": [
        "Passes de otimização removem redundâncias, melhoram uso de registradores, reorganizam operações e simplificam fluxos. Tudo isso, porém, custa tempo e complexidade no compilador.",
        "Por isso níveis de otimização existem: desenvolvimento local costuma preferir feedback rápido; builds finais de release aceitam gastar mais esforço para extrair um binário melhor."
      ],
      "blocks": [
        {
          "type": "definition",
          "title": "Pass de otimização",
          "body": "Transformação que reescreve uma representação intermediária para melhorar alguma propriedade sem alterar o comportamento observável desejado."
        },
        {
          "type": "insight",
          "title": "Não existe melhor universal",
          "body": "Ganhar desempenho em runtime, tamanho de binário ou tempo de compilação normalmente exige prioridades diferentes."
        }
      ]
    },
    {
      "id": "backend-e-alvo",
      "eyebrow": "Arquitetura",
      "title": "O backend precisa respeitar a realidade da arquitetura de destino",
      "lead": "No fim do pipeline, ideias abstratas viram registradores, instruções, calling conventions e formato de objeto.",
      "visual": "compilador-resumo",
      "paragraphs": [
        "Gerar código não é apenas trocar operações por assembly. O backend precisa conhecer registradores disponíveis, convenções de chamada, alinhamento, layout de dados e formato de arquivo esperado pelo ecossistema da plataforma.",
        "Essa separação explica por que um mesmo frontend pode, em princípio, mirar múltiplas ISAs: a linguagem fica mais desacoplada do hardware desde que exista um backend capaz de honrar o contrato do alvo."
      ],
      "blocks": [
        {
          "type": "example",
          "title": "Exemplo",
          "body": "A mesma operação de alto nível pode virar instruções diferentes em x86, ARM ou RISC-V sem que o programador mude o fonte."
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Achar que o compilador conhece somente a linguagem. Ele também precisa conhecer profundamente a máquina que vai receber o resultado."
        }
      ]
    },
    {
      "id": "sintese-operacional",
      "eyebrow": "Síntese",
      "title": "Resumo mental do pipeline",
      "lead": "Use os cartões para fixar o papel de cada etapa.",
      "interactive": "summary-cards",
      "paragraphs": [
        "Revise a cadeia de representações e as decisões que ficam mais fáceis em cada camada."
      ]
    },
    {
      "id": "quiz-revisao",
      "eyebrow": "Revisão",
      "title": "Quiz de revisão",
      "lead": "Cheque se fonte, AST, IR e backend ficaram bem diferenciados.",
      "interactive": "quiz",
      "paragraphs": [
        "O objetivo é associar etapa, função e trade-off."
      ]
    },
    {
      "id": "glossario",
      "eyebrow": "Vocabulário",
      "title": "Glossário essencial",
      "lead": "Termos recorrentes em cursos, docs de toolchains e discussões de performance.",
      "interactive": "glossary",
      "paragraphs": [
        "Dominar o vocabulário ajuda a interpretar mensagens de erro, flags e documentação de compiladores."
      ]
    }
  ],
  "summaryCards": [
    {
      "title": "Frontend entende o texto",
      "body": "Lexer, parser e AST cuidam de transformar caracteres em estrutura e semântica inicial."
    },
    {
      "title": "IR desacopla o meio do pipeline",
      "body": "Ela facilita análise, otimização e reutilização entre múltiplas linguagens e alvos."
    },
    {
      "title": "Backend conversa com a ISA",
      "body": "No final, tudo precisa respeitar registradores, convenções e formato do alvo real."
    }
  ],
  "quiz": [
    {
      "id": "q1",
      "prompt": "Qual estágio converte caracteres em tokens?",
      "options": [
        {
          "id": "a",
          "label": "Parser"
        },
        {
          "id": "b",
          "label": "Lexer"
        },
        {
          "id": "c",
          "label": "Backend"
        }
      ],
      "correctOptionId": "b",
      "feedback": "O lexer reconhece unidades léxicas como identificadores, números e operadores."
    },
    {
      "id": "q2",
      "prompt": "Qual é o papel principal do parser?",
      "options": [
        {
          "id": "a",
          "label": "Montar estrutura sintática a partir dos tokens."
        },
        {
          "id": "b",
          "label": "Escolher registradores finais."
        },
        {
          "id": "c",
          "label": "Fazer chamadas de sistema."
        }
      ],
      "correctOptionId": "a",
      "feedback": "O parser aplica a gramática da linguagem sobre a sequência de tokens."
    },
    {
      "id": "q3",
      "prompt": "Por que ASTs são úteis?",
      "options": [
        {
          "id": "a",
          "label": "Porque preservam exatamente todos os espaços do texto original."
        },
        {
          "id": "b",
          "label": "Porque destacam a estrutura relevante sem carregar todo o ruído textual."
        },
        {
          "id": "c",
          "label": "Porque já são código de máquina."
        }
      ],
      "correctOptionId": "b",
      "feedback": "ASTs abstraem detalhes de superfície para enfatizar estrutura."
    },
    {
      "id": "q4",
      "prompt": "O que a IR costuma oferecer?",
      "options": [
        {
          "id": "a",
          "label": "Uma camada conveniente para análise e otimização."
        },
        {
          "id": "b",
          "label": "Uma interface gráfica para IDE."
        },
        {
          "id": "c",
          "label": "Uma cópia da documentação da linguagem."
        }
      ],
      "correctOptionId": "a",
      "feedback": "IR é a moeda comum do meio do pipeline."
    },
    {
      "id": "q5",
      "prompt": "Qual trade-off está presente em níveis de otimização?",
      "options": [
        {
          "id": "a",
          "label": "Tempo de compilação versus qualidade do código gerado."
        },
        {
          "id": "b",
          "label": "Teclado versus mouse."
        },
        {
          "id": "c",
          "label": "Indentação versus comentário."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Mais otimização costuma exigir mais trabalho do compilador."
    },
    {
      "id": "q6",
      "prompt": "O backend precisa conhecer o quê?",
      "options": [
        {
          "id": "a",
          "label": "Somente nomes de variáveis."
        },
        {
          "id": "b",
          "label": "A arquitetura de destino e suas convenções."
        },
        {
          "id": "c",
          "label": "Apenas a cor do editor."
        }
      ],
      "correctOptionId": "b",
      "feedback": "Gerar código final exige respeitar o alvo real."
    },
    {
      "id": "q7",
      "prompt": "Fonte, AST e código de máquina são equivalentes para análise?",
      "options": [
        {
          "id": "a",
          "label": "Sim, qualquer um serve do mesmo jeito."
        },
        {
          "id": "b",
          "label": "Não; cada representação favorece tipos diferentes de decisão."
        },
        {
          "id": "c",
          "label": "Só em linguagens funcionais."
        }
      ],
      "correctOptionId": "b",
      "feedback": "Compiladores separam camadas porque cada forma é melhor para certas tarefas."
    },
    {
      "id": "q8",
      "prompt": "Quando um erro de gramática aparece, em geral estamos em qual parte do pipeline?",
      "options": [
        {
          "id": "a",
          "label": "No parsing."
        },
        {
          "id": "b",
          "label": "Na paginação do SO."
        },
        {
          "id": "c",
          "label": "No linking dinâmico."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Erros estruturais pertencem tipicamente à fase de parsing."
    }
  ],
  "glossary": [
    {
      "term": "Lexer",
      "definition": "Componente que converte caracteres do fonte em tokens."
    },
    {
      "term": "Token",
      "definition": "Unidade léxica reconhecida no código, como identificador, operador ou literal."
    },
    {
      "term": "Parser",
      "definition": "Componente que aplica a gramática da linguagem sobre os tokens."
    },
    {
      "term": "AST",
      "definition": "Árvore sintática abstrata que representa estrutura relevante do programa."
    },
    {
      "term": "Análise semântica",
      "definition": "Etapa em que escopos, tipos e usos válidos começam a ser verificados."
    },
    {
      "term": "IR",
      "definition": "Representação intermediária usada para análises e otimizações."
    },
    {
      "term": "Pass",
      "definition": "Transformação ou análise executada sobre uma representação do programa."
    },
    {
      "term": "Codegen",
      "definition": "Geração de código final ou quase final para um alvo."
    },
    {
      "term": "Backend",
      "definition": "Parte do compilador que mira a arquitetura de destino."
    },
    {
      "term": "Calling convention",
      "definition": "Conjunto de regras sobre passagem de argumentos, retornos e uso de registradores."
    },
    {
      "term": "Toolchain",
      "definition": "Conjunto de compilador, assembler, linker e ferramentas relacionadas."
    }
  ],
  "relatedTopics": [
    {
      "title": "ISA: x86, ARM e RISC-V",
      "body": "Entenda o contrato de hardware que o backend precisa respeitar."
    },
    {
      "title": "Como um Programa Vira Processo",
      "body": "Conecte o binário gerado ao momento em que ele é carregado pelo sistema operacional."
    }
  ]
};
