import type { LessonContent } from "../../../types/content";

export const isaX86ArmRiscvContent: LessonContent = {
  "id": "isa-x86-arm-riscv",
  "title": "ISA: x86, ARM e RISC-V",
  "subtitle": "A interface entre software e hardware: o contrato visível que permite compilar, executar e portar programas.",
  "description": "Uma aula visual sobre o que é uma ISA, diferença entre ISA e microarquitetura, modelos x86, ARM e RISC-V, e o impacto desse contrato em compiladores e portabilidade.",
  "primaryCategoryId": "computacao",
  "secondaryCategoryId": "engenharia",
  "level": "Intermediário",
  "estimatedTime": "45-55 min",
  "tags": [
    "ISA",
    "x86",
    "ARM",
    "RISC-V",
    "Assembly",
    "Microarquitetura",
    "Portabilidade"
  ],
  "learningObjectives": [
    "Definir ISA como contrato visível ao software.",
    "Distinguir ISA de microarquitetura e de implementação física.",
    "Comparar x86, ARM e RISC-V em termos de ecossistema e filosofia.",
    "Entender o papel do compilador ao mirar diferentes ISAs.",
    "Reconhecer por que portabilidade e otimização local nem sempre apontam para o mesmo lado.",
    "Relacionar instruções, registradores e calling conventions ao que o software pode assumir sobre a máquina."
  ],
  "prerequisites": [
    "Noção inicial de CPU, registradores e instruções.",
    "Familiaridade leve com compiladores ou assembly ajuda.",
    "Interesse por como o software encontra o hardware real."
  ],
  "references": [
    {
      "title": "Intel 64 and IA-32 Architectures Software Developer Manuals",
      "source": "Intel",
      "url": "https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html",
      "note": "Coleção oficial de manuais da arquitetura x86 Intel."
    },
    {
      "title": "The RISC-V Instruction Set Manual (HTML snapshot)",
      "source": "RISC-V",
      "url": "https://riscv.github.io/riscv-isa-manual/snapshot/spec/",
      "note": "Versão pública da especificação RISC-V."
    },
    {
      "title": "The RISC-V Instruction Set Manual, Volume I",
      "source": "RISC-V International",
      "url": "https://docs.riscv.org/reference/isa/v20260120/_attachments/riscv-unprivileged.pdf",
      "note": "Especificação oficial do espaço não privilegiado da ISA."
    },
    {
      "title": "Ratified Specifications",
      "source": "RISC-V International",
      "url": "https://riscv.org/specifications/ratified/",
      "note": "Portal oficial das especificações ratificadas e públicas."
    },
    {
      "title": "Arm Architecture Reference Manual resources",
      "source": "Arm Developer",
      "url": "https://developer.arm.com/documentation",
      "note": "Portal oficial de documentação de arquitetura e software da Arm."
    },
    {
      "title": "Computer Systems: A Programmer's Perspective",
      "source": "CS:APP — Carnegie Mellon",
      "url": "https://csapp.cs.cmu.edu/",
      "note": "Ajuda a conectar ISA, assembly e execução do ponto de vista do programador."
    }
  ],
  "heroVisual": "isa-hero",
  "openingText": "Quando um compilador gera código, ele não mira o silício em geral. Ele mira um contrato: quais instruções existem, quantos registradores há, como chamadas de função funcionam, como a memória é endereçada e quais exceções são visíveis ao software. Esse contrato é a ISA. Duas CPUs podem implementar a mesma ISA de formas internas radicalmente diferentes, e ainda assim rodar o mesmo binário. É por isso que ISA é a fronteira correta entre o que o software pode assumir e o que a microarquitetura pode reinventar por baixo.",
  "quickFacts": [
    {
      "title": "ISA não é microarquitetura",
      "body": "A ISA é o contrato visível; a microarquitetura é a forma interna de cumprir esse contrato."
    },
    {
      "title": "Mesmo binário, hardwares diferentes",
      "body": "Se respeitarem a mesma ISA e ambiente, CPUs distintas podem executar o mesmo programa."
    },
    {
      "title": "Compiladores vivem nessa interface",
      "body": "Eles transformam construções de alto nível em instruções permitidas pela ISA alvo."
    }
  ],
  "sections": [
    {
      "id": "contrato-software-hardware",
      "eyebrow": "Contrato",
      "title": "ISA é a superfície que o software enxerga da máquina",
      "lead": "Ela define o conjunto de instruções, registradores, convenções e comportamento essencial que um binário pode esperar.",
      "visual": "isa-mapa",
      "paragraphs": [
        "Sem uma ISA estável, compiladores, sistemas operacionais e bibliotecas não teriam um alvo consistente. A ISA organiza o que é legal pedir da máquina sem amarrar o software ao desenho exato do pipeline, do cache ou da lógica interna.",
        "Por isso dizemos que ISA é interface, não implementação. Ela é o o quê; a microarquitetura é o como."
      ],
      "blocks": [
        {
          "type": "definition",
          "title": "ISA",
          "body": "Instruction Set Architecture: contrato software↔hardware com instruções, registradores, modos de endereçamento e efeitos observáveis."
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Chamar de ISA qualquer detalhe interno da CPU. Muitas decisões de pipeline e cache não fazem parte do contrato visível ao software."
        }
      ]
    },
    {
      "id": "do-fonte-ao-alvo",
      "eyebrow": "Fluxo",
      "title": "O compilador precisa transformar intenção em instruções válidas para uma ISA específica",
      "lead": "Portabilidade de linguagem não elimina o fato de que o binário final precisa obedecer a um contrato concreto.",
      "interactive": "isa-contract-lab",
      "paragraphs": [
        "Operações de alto nível como laços, chamadas e acesso a arrays podem acabar em instruções bem diferentes dependendo do alvo. O compilador escolhe encodings, convenções de chamada, uso de registradores e instruções auxiliares conforme a ISA.",
        "Isso explica por que mudar de arquitetura não é apenas mudar o chip: há todo um ecossistema de toolchain, ABI e bibliotecas por trás."
      ],
      "blocks": [
        {
          "type": "example",
          "title": "Exemplo",
          "body": "A mesma função em C pode virar um prologue diferente em x86 e ARM porque cada ecossistema tem convenções próprias para argumentos e registradores."
        },
        {
          "type": "insight",
          "title": "Portabilidade tem camadas",
          "body": "Linguagens ajudam a portar fontes, mas o binário sempre nasce amarrado a uma ISA e a uma ABI."
        }
      ]
    },
    {
      "id": "isa-vs-microarquitetura",
      "eyebrow": "Modelo",
      "title": "A mesma ISA pode esconder microarquiteturas muito diferentes",
      "lead": "Compatibilidade binária não implica semelhança interna entre processadores.",
      "paragraphs": [
        "Uma CPU simples e outra altamente fora de ordem podem ambas implementar a mesma ISA. Para o software, elas falam a mesma língua. Para o hardware, o caminho interno para produzir esse comportamento pode variar enormemente.",
        "Esse desacoplamento foi um dos grandes motores de evolução da computação: software continua útil enquanto implementações abaixo da linha ficam mais sofisticadas."
      ],
      "blocks": [
        {
          "type": "definition",
          "title": "Microarquitetura",
          "body": "Forma interna concreta de implementar uma ISA, incluindo pipeline, caches, execução fora de ordem e outras estratégias."
        },
        {
          "type": "example",
          "title": "Exemplo",
          "body": "Dois processadores x86 podem ter o mesmo contrato de instruções, mas comportamentos de performance muito diferentes por causa da microarquitetura."
        }
      ]
    },
    {
      "id": "familias",
      "eyebrow": "Comparação",
      "title": "x86, ARM e RISC-V ocupam posições diferentes no ecossistema",
      "lead": "Comparar essas famílias ajuda a entender legado, energia, abertura e portabilidade.",
      "interactive": "isa-family-lab",
      "paragraphs": [
        "x86 carrega um ecossistema histórico enorme e domina muitos desktops e servidores. ARM é muito forte em dispositivos móveis e sistemas energeticamente sensíveis, mas também aparece em servidores modernos. RISC-V se destaca pela abertura do padrão e pela modularidade de suas especificações.",
        "Mais importante do que slogans é perceber que cada família envolve ecossistema de compiladores, sistemas operacionais, ferramentas, IP e objetivos de mercado distintos."
      ],
      "blocks": [
        {
          "type": "insight",
          "title": "ISA não é só técnica",
          "body": "Governança do padrão, licenciamento, maturidade do ecossistema e ferramentas influenciam tanto quanto a filosofia das instruções."
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Resumir tudo a RISC bom, CISC ruim. O mundo real mistura legado, compatibilidade, mercado e implementação sofisticada."
        }
      ]
    },
    {
      "id": "abstracao-e-controle",
      "eyebrow": "Trade-off",
      "title": "Quanto mais você desce na abstração, mais controle ganha — e mais portabilidade perde",
      "lead": "A relação entre alto nível e tuning específico da ISA é um gradiente, não uma chave.",
      "interactive": "abstraction-dial-lab",
      "paragraphs": [
        "Código de alto nível permite portar melhor a lógica entre arquiteturas, mas esconde detalhes que talvez você queira explorar. Intrinsics e assembly local dão acesso mais fino ao hardware, porém apertam o acoplamento com um alvo específico.",
        "Equipes de engenharia vivem nesse equilíbrio. A pergunta quase nunca é alto nível ou assembly, e sim em quais pontos específicos vale pagar pelo acoplamento."
      ],
      "blocks": [
        {
          "type": "definition",
          "title": "Intrinsic",
          "body": "Função especial ou construção da linguagem que expõe uma capacidade da ISA sem exigir assembly manual completo."
        },
        {
          "type": "example",
          "title": "Exemplo",
          "body": "Uma biblioteca pode manter 95% do código portátil e reservar pequenos trechos específicos para vetorização por ISA."
        }
      ]
    },
    {
      "id": "isa-na-pratica",
      "eyebrow": "Aplicação",
      "title": "ABIs, calling conventions e registradores conectam a ISA ao software do dia a dia",
      "lead": "Na prática, o programador sente a ISA por meio de regras de chamada, layout e geração de código.",
      "visual": "isa-resumo",
      "paragraphs": [
        "Quando funções conversam, bibliotecas se ligam e o sistema operacional entra em cena, detalhes como convenções de chamada e registradores preservados deixam de ser curiosidade acadêmica e viram compatibilidade real.",
        "É aqui que a ISA toca compiladores, linkers, depuradores e FFI entre linguagens. O contrato não vive isolado em manuais; ele se espalha por toda a toolchain."
      ],
      "blocks": [
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Pensar que conhecer instruções basta. Em sistemas reais, ABI e convenções de chamada são tão importantes quanto o conjunto de instruções."
        },
        {
          "type": "insight",
          "title": "O contrato é ecossistêmico",
          "body": "ISA, ABI e toolchain formam uma cadeia; quebrar um elo compromete compatibilidade."
        }
      ]
    },
    {
      "id": "sintese-operacional",
      "eyebrow": "Síntese",
      "title": "Resumo mental da ISA",
      "lead": "Use os cartões para reter o que o software pode e não pode assumir.",
      "interactive": "summary-cards",
      "paragraphs": [
        "Revise contrato, implementação e ecossistema antes de avançar."
      ]
    },
    {
      "id": "quiz-revisao",
      "eyebrow": "Revisão",
      "title": "Quiz de revisão",
      "lead": "Teste o contraste entre ISA, microarquitetura e portabilidade.",
      "interactive": "quiz",
      "paragraphs": [
        "As perguntas focam interface, alvo e trade-offs."
      ]
    },
    {
      "id": "glossario",
      "eyebrow": "Vocabulário",
      "title": "Glossário essencial",
      "lead": "Termos indispensáveis em arquitetura, compiladores e portabilidade.",
      "interactive": "glossary",
      "paragraphs": [
        "Use o glossário como âncora para manuais de arquitetura e documentação de toolchains."
      ]
    }
  ],
  "summaryCards": [
    {
      "title": "ISA é contrato",
      "body": "Ela define a linguagem visível ao software sem revelar como a CPU realiza internamente cada operação."
    },
    {
      "title": "Microarquitetura é implementação",
      "body": "Pipelines, caches e execução fora de ordem podem variar muito sob a mesma ISA."
    },
    {
      "title": "Portabilidade tem custo e limite",
      "body": "Descer demais para tuning específico do alvo amplia controle, mas reduz mobilidade entre arquiteturas."
    }
  ],
  "quiz": [
    {
      "id": "q1",
      "prompt": "O que é ISA?",
      "options": [
        {
          "id": "a",
          "label": "O contrato visível ao software com instruções, registradores e comportamentos observáveis."
        },
        {
          "id": "b",
          "label": "A posição física dos transistores na CPU."
        },
        {
          "id": "c",
          "label": "O sistema de arquivos do sistema operacional."
        }
      ],
      "correctOptionId": "a",
      "feedback": "ISA é a interface software↔hardware."
    },
    {
      "id": "q2",
      "prompt": "Qual alternativa distingue ISA de microarquitetura?",
      "options": [
        {
          "id": "a",
          "label": "ISA é implementação e microarquitetura é marketing."
        },
        {
          "id": "b",
          "label": "ISA é o contrato; microarquitetura é a forma interna de cumpri-lo."
        },
        {
          "id": "c",
          "label": "São exatamente a mesma coisa."
        }
      ],
      "correctOptionId": "b",
      "feedback": "Essa é a distinção central."
    },
    {
      "id": "q3",
      "prompt": "Por que o compilador se importa com a ISA?",
      "options": [
        {
          "id": "a",
          "label": "Porque o binário final precisa usar instruções e convenções válidas para o alvo."
        },
        {
          "id": "b",
          "label": "Porque a ISA define a cor do código-fonte."
        },
        {
          "id": "c",
          "label": "Porque a ISA substitui o parser."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Sem um alvo ISA, não existe binário executável coerente."
    },
    {
      "id": "q4",
      "prompt": "Qual afirmação sobre x86, ARM e RISC-V é mais correta?",
      "options": [
        {
          "id": "a",
          "label": "São apenas nomes de pipelines idênticos."
        },
        {
          "id": "b",
          "label": "Representam famílias com ecossistemas e filosofias diferentes."
        },
        {
          "id": "c",
          "label": "Só diferem no tamanho do gabinete."
        }
      ],
      "correctOptionId": "b",
      "feedback": "A diferença envolve padrão, mercado e ferramentas."
    },
    {
      "id": "q5",
      "prompt": "O que um intrinsic oferece?",
      "options": [
        {
          "id": "a",
          "label": "Acesso mais direto a capacidades da ISA sem assembly total."
        },
        {
          "id": "b",
          "label": "Uma segunda AST para o compilador."
        },
        {
          "id": "c",
          "label": "Uma syscall para disco."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Intrinsics expõem recursos do alvo em nível mais alto que assembly puro."
    },
    {
      "id": "q6",
      "prompt": "O mesmo binário pode rodar em CPUs diferentes?",
      "options": [
        {
          "id": "a",
          "label": "Sim, se elas implementarem a mesma ISA e ambiente compatível."
        },
        {
          "id": "b",
          "label": "Não, cada binário é preso a um único chip físico."
        },
        {
          "id": "c",
          "label": "Só em computadores sem cache."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Compatibilidade vem do contrato comum."
    },
    {
      "id": "q7",
      "prompt": "Qual item conecta funções e bibliotecas à ISA na prática?",
      "options": [
        {
          "id": "a",
          "label": "Calling conventions e ABI."
        },
        {
          "id": "b",
          "label": "Apenas a velocidade do ventilador."
        },
        {
          "id": "c",
          "label": "Somente o editor de texto."
        }
      ],
      "correctOptionId": "a",
      "feedback": "ABI e convenções tornam a compatibilidade operacional concreta."
    },
    {
      "id": "q8",
      "prompt": "Descer para código muito específico da arquitetura tende a quê?",
      "options": [
        {
          "id": "a",
          "label": "Aumentar controle local e reduzir portabilidade."
        },
        {
          "id": "b",
          "label": "Aumentar portabilidade automaticamente."
        },
        {
          "id": "c",
          "label": "Eliminar a necessidade de compilador."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Esse é o trade-off mais comum quando se otimiza para um alvo específico."
    }
  ],
  "glossary": [
    {
      "term": "ISA",
      "definition": "Instruction Set Architecture: contrato entre software e hardware."
    },
    {
      "term": "Microarquitetura",
      "definition": "Implementação interna concreta de uma ISA."
    },
    {
      "term": "Registrador",
      "definition": "Armazenamento pequeno e rápido diretamente visível ou usado pela execução de instruções."
    },
    {
      "term": "Instruction encoding",
      "definition": "Forma binária pela qual uma instrução é representada."
    },
    {
      "term": "ABI",
      "definition": "Application Binary Interface: regras binárias de compatibilidade entre código compilado, SO e bibliotecas."
    },
    {
      "term": "Calling convention",
      "definition": "Convenção sobre passagem de argumentos, retornos e preservação de registradores."
    },
    {
      "term": "Assembly",
      "definition": "Representação textual de instruções da ISA."
    },
    {
      "term": "x86",
      "definition": "Família histórica de ISA muito presente em desktops e servidores."
    },
    {
      "term": "ARM",
      "definition": "Família de arquiteturas/ISA amplamente usada em dispositivos móveis e também em servidores modernos."
    },
    {
      "term": "RISC-V",
      "definition": "Padrão aberto de ISA modular e extensível."
    },
    {
      "term": "Intrinsic",
      "definition": "Construção de linguagem ou biblioteca que expõe recurso específico de ISA."
    }
  ],
  "relatedTopics": [
    {
      "title": "Como Funciona um Compilador",
      "body": "Aprofunde como a toolchain decide o código alvo para uma ISA concreta."
    },
    {
      "title": "Pipeline de CPU",
      "body": "Veja o que fica abaixo da ISA: como a implementação interna realiza esse contrato."
    }
  ]
};
