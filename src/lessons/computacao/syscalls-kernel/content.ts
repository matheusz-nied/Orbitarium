import type { LessonContent } from "../../../types/content";

export const syscallsKernelContent: LessonContent = {
  "id": "syscalls-kernel",
  "title": "Syscalls: Como Programas Conversam com o Kernel",
  "subtitle": "A ponte controlada entre user space e kernel space: chamadas, traps, wrappers e custos de atravessar a fronteira.",
  "description": "Uma aula visual sobre syscalls, wrappers de libc, modo usuário e kernel, errno, cópia de dados, mmap, bloqueio e custo de granularidade.",
  "primaryCategoryId": "computacao",
  "secondaryCategoryId": "engenharia",
  "level": "Intermediário",
  "estimatedTime": "40-55 min",
  "tags": [
    "Syscalls",
    "Kernel",
    "Linux",
    "libc",
    "read",
    "write",
    "mmap",
    "errno"
  ],
  "learningObjectives": [
    "Explicar por que programas precisam de syscalls para acessar recursos protegidos pelo kernel.",
    "Distinguir wrapper de biblioteca, syscall em si e trabalho real executado no kernel.",
    "Entender o custo conceitual de atravessar user space e kernel space.",
    "Comparar operações orientadas a stream, descriptor e mapeamento de memória.",
    "Relacionar granularidade de syscalls com latência, throughput e bloqueio.",
    "Interpretar errno como tradução amigável de falhas retornadas pelo kernel."
  ],
  "prerequisites": [
    "Noção inicial de processos e memória.",
    "Familiaridade leve com leitura e escrita de arquivos ajuda.",
    "Curiosidade sobre o que realmente acontece quando um programa usa I/O."
  ],
  "references": [
    {
      "title": "intro(2)",
      "source": "Linux man-pages",
      "url": "https://man7.org/linux/man-pages/man2/intro.2.html",
      "note": "Introdução oficial às system calls e à relação com wrappers de biblioteca."
    },
    {
      "title": "syscalls(2)",
      "source": "Linux man-pages",
      "url": "https://man7.org/linux/man-pages/man2/syscalls.2.html",
      "note": "Lista e visão geral de syscalls Linux."
    },
    {
      "title": "syscall(2)",
      "source": "Linux man-pages",
      "url": "https://man7.org/linux/man-pages/man2/syscall.2.html",
      "note": "Mostra como uma syscall pode ser invocada diretamente quando não há wrapper conveniente."
    },
    {
      "title": "read(2)",
      "source": "Linux man-pages",
      "url": "https://man7.org/linux/man-pages/man2/read.2.html",
      "note": "Referência oficial de leitura por descriptor."
    },
    {
      "title": "mmap(2)",
      "source": "Linux man-pages",
      "url": "https://man7.org/linux/man-pages/man2/mmap.2.html",
      "note": "Mostra a alternativa de mapear regiões de arquivo/memória para acesso indireto."
    },
    {
      "title": "Operating Systems: Three Easy Pieces",
      "source": "OSTEP — University of Wisconsin",
      "url": "https://pages.cs.wisc.edu/~remzi/OSTEP/",
      "note": "Livro aberto com a base conceitual de processos, sistema operacional e abstrações."
    }
  ],
  "heroVisual": "syscalls-hero",
  "openingText": "Programas comuns não têm permissão para abrir arbitrariamente discos, trocar tabelas de páginas ou falar direto com placas de rede. Essa mediação é papel do kernel. Syscalls são o conjunto de portas oficiais para pedir esses serviços. A imagem correta não é a de uma função mágica, mas a de uma travessia de fronteira: argumentos são preparados, a CPU muda de modo, o kernel valida permissões e executa a operação, e então o controle volta ao programa com um valor de retorno e, se necessário, um erro traduzido.",
  "quickFacts": [
    {
      "title": "Nem toda função é syscall",
      "body": "Muitas APIs de biblioteca apenas organizam argumentos e depois chamam uma syscall real."
    },
    {
      "title": "Atravessar a fronteira custa",
      "body": "Entrar no kernel envolve mudança de contexto de proteção, validação e coordenação com recursos compartilhados."
    },
    {
      "title": "Granularidade importa",
      "body": "Muitas syscalls pequenas podem custar bem mais do que poucas operações maiores ou mais eficientes."
    }
  ],
  "sections": [
    {
      "id": "fronteira-user-kernel",
      "eyebrow": "Contrato",
      "title": "User space e kernel space existem para separar poder e risco",
      "lead": "A fronteira não é burocracia acidental; ela é um mecanismo de segurança, isolamento e governança do hardware.",
      "visual": "syscalls-mapa",
      "paragraphs": [
        "Se qualquer processo pudesse tocar diretamente controladores, memória física ou estruturas globais, bastaria um bug simples para derrubar a máquina inteira. O kernel centraliza acesso a recursos justamente para aplicar regras, isolar falhas e multiplexar hardware entre processos concorrentes.",
        "Syscalls são a superfície dessa relação. Elas permitem pedir trabalho privilegiado sem entregar privilégio irrestrito para o programa chamador."
      ],
      "blocks": [
        {
          "type": "definition",
          "title": "Syscall",
          "body": "Entrada formal para serviços do kernel, usada por programas em user space quando precisam operar sobre recursos privilegiados."
        },
        {
          "type": "insight",
          "title": "A borda é produto",
          "body": "A API do kernel não é só técnica: ela molda desempenho, segurança, ergonomia e o estilo de programação disponível em user space."
        }
      ]
    },
    {
      "id": "travessia",
      "eyebrow": "Fluxo",
      "title": "Uma syscall é uma travessia coordenada de fronteira",
      "lead": "Há uma cadeia curta, mas importante, entre a chamada da função e o trabalho privilegiado.",
      "interactive": "syscall-bridge-lab",
      "paragraphs": [
        "Em muitos casos, a função da libc apenas copia argumentos para os lugares esperados, aciona a instrução de entrada no kernel e depois traduz o valor retornado para a convenção da linguagem, como -1 e errno em C. O trabalho real acontece no lado do kernel.",
        "Esse detalhe evita dois erros comuns: pensar que toda API de biblioteca é uma syscall e pensar que a syscall é apenas um if no kernel. Entre um lado e outro há validação, cópia, checagem de permissões e, muitas vezes, sincronização com subsistemas complexos."
      ],
      "blocks": [
        {
          "type": "example",
          "title": "Exemplo",
          "body": "Uma chamada read() parece uma função comum em C, mas por baixo dela existe uma entrada real no kernel para acessar dados associados a um descriptor."
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Confundir a API da linguagem com a API do kernel. Nem toda função toca o kernel, e algumas fazem mais pré e pós-processamento do que parece."
        }
      ]
    },
    {
      "id": "retornos-e-erros",
      "eyebrow": "Semântica",
      "title": "Retorno de syscall não é só sucesso ou fracasso; ele carrega protocolo",
      "lead": "Valores de retorno e errno formam um pequeno contrato semântico que o programa precisa respeitar.",
      "paragraphs": [
        "Uma leitura pode devolver menos bytes do que o pedido, uma operação pode ser interrompida por sinal, um descriptor pode não estar pronto e um acesso pode falhar por permissão. Tratar syscalls como sempre completam tudo produz bugs sutis em produção.",
        "Por isso, robustez em sistemas depende tanto de entender o recurso quanto de entender a semântica de retorno: partial reads, EAGAIN, EINTR e semelhantes são parte do contrato, não acidentes periféricos."
      ],
      "blocks": [
        {
          "type": "definition",
          "title": "errno",
          "body": "Convenção de biblioteca que traduz falhas retornadas pelo kernel em códigos nomeados que o programa consegue inspecionar."
        },
        {
          "type": "example",
          "title": "Exemplo",
          "body": "Em I/O não bloqueante, uma tentativa de leitura pode falhar temporariamente não porque o arquivo quebrou, mas porque ainda não há dados prontos."
        }
      ]
    },
    {
      "id": "familias-de-syscalls",
      "eyebrow": "Comparação",
      "title": "Chamadas diferentes expressam modelos diferentes de acesso a recursos",
      "lead": "Abrir, ler, escrever e mapear memória parecem parentes, mas comunicam intenções operacionais distintas.",
      "interactive": "syscall-family-lab",
      "paragraphs": [
        "Chamadas baseadas em descriptors tratam recursos como fluxos e endpoints sob mediação do kernel. Já mmap muda o estilo de acesso: em vez de pedir blocos explicitamente, o programa passa a enxergar uma região mapeada e deixa a paginação agir em segundo plano.",
        "Escolher a família errada não é apenas detalhe de API. Isso afeta cópias de dados, comportamento de page fault, facilidade de sincronização e observabilidade de desempenho."
      ],
      "blocks": [
        {
          "type": "insight",
          "title": "A forma de pedir altera o custo",
          "body": "Não é só o recurso que importa, mas o modelo de interação escolhido para conversar com ele."
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Assumir que mmap é sempre mais rápido ou que read/write são sempre mais simples. Cada abordagem muda trade-offs reais."
        }
      ]
    },
    {
      "id": "granularidade",
      "eyebrow": "Trade-off",
      "title": "Granularidade de syscall define muita coisa sobre desempenho percebido",
      "lead": "O mesmo trabalho lógico pode custar muito mais se for quebrado em travessias pequenas demais.",
      "interactive": "syscall-granularity-lab",
      "paragraphs": [
        "A fronteira com o kernel não é gratuita. Se um programa faz milhares de chamadas minúsculas, o overhead de entrada, checagem e coordenação pode dominar o tempo total. Buffers, batching e interfaces adequadas existem para reduzir essa fragmentação.",
        "Ao mesmo tempo, exagerar no batching pode aumentar latência percebida, consumo de memória e dificuldade de resposta incremental. A arte está em casar a granularidade com o padrão de uso."
      ],
      "blocks": [
        {
          "type": "example",
          "title": "Exemplo",
          "body": "Ler um arquivo byte a byte força uma travessia por byte; usar buffer concentra trabalho útil por ida ao kernel."
        },
        {
          "type": "definition",
          "title": "Granularidade",
          "body": "Tamanho da unidade de trabalho agrupada por chamada ao kernel."
        }
      ]
    },
    {
      "id": "bloqueio-e-espera",
      "eyebrow": "Operação",
      "title": "Muitas syscalls também modelam espera, bloqueio e prontidão",
      "lead": "Conversar com o kernel não é apenas pedir dados: é negociar quando o trabalho pode continuar.",
      "visual": "syscalls-resumo",
      "paragraphs": [
        "Syscalls de I/O frequentemente colocam o processo para dormir até que uma condição do mundo externo mude. Esse detalhe é decisivo em servidores, bancos, filas e aplicações de rede, onde boa parte do tempo é coordenação com recursos lentos ou concorridos.",
        "Entender bloqueio ajuda a interpretar perfis, traces e métricas. Um processo ocupado nem sempre está gastando CPU; às vezes está parado aguardando o kernel avisar que pode prosseguir."
      ],
      "blocks": [
        {
          "type": "insight",
          "title": "CPU não conta a história toda",
          "body": "Boa parte do comportamento de sistemas aparece como espera por I/O, não como computação intensa em user space."
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Ler um percentual baixo de CPU e concluir que não há gargalo. O processo pode estar bloqueado em chamadas ao kernel ou no subsistema de armazenamento/rede."
        }
      ]
    },
    {
      "id": "sintese-operacional",
      "eyebrow": "Síntese",
      "title": "Checklist mental para ler syscalls",
      "lead": "Use os cartões para consolidar a fronteira user↔kernel.",
      "interactive": "summary-cards",
      "paragraphs": [
        "Reveja o mecanismo, a semântica de retorno e a escolha de granularidade."
      ]
    },
    {
      "id": "quiz-revisao",
      "eyebrow": "Revisão",
      "title": "Quiz de revisão",
      "lead": "Teste se o modelo de travessia ficou sólido.",
      "interactive": "quiz",
      "paragraphs": [
        "As perguntas destacam o contrato da syscall e suas implicações práticas."
      ]
    },
    {
      "id": "glossario",
      "eyebrow": "Vocabulário",
      "title": "Glossário essencial",
      "lead": "Termos que aparecem o tempo todo em sistemas Linux e APIs de baixo nível.",
      "interactive": "glossary",
      "paragraphs": [
        "Use o glossário para conectar man pages, documentação e depuração prática."
      ]
    }
  ],
  "summaryCards": [
    {
      "title": "Syscall é fronteira",
      "body": "Ela existe para pedir trabalho privilegiado ao kernel sem derrubar isolamento e segurança."
    },
    {
      "title": "Wrapper não é sinônimo de kernel",
      "body": "A API da linguagem pode preparar e traduzir chamadas antes e depois da entrada real no kernel."
    },
    {
      "title": "Granularidade decide custo",
      "body": "Poucas chamadas bem agrupadas costumam aproveitar melhor a travessia do que milhares de operações minúsculas."
    }
  ],
  "quiz": [
    {
      "id": "q1",
      "prompt": "Por que programas comuns precisam de syscalls?",
      "options": [
        {
          "id": "a",
          "label": "Porque user space não deve acessar recursos privilegiados diretamente."
        },
        {
          "id": "b",
          "label": "Porque a CPU não executa funções normais."
        },
        {
          "id": "c",
          "label": "Porque o disco sempre exige interface gráfica."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Syscalls mediam acesso a recursos protegidos e compartilhados."
    },
    {
      "id": "q2",
      "prompt": "Qual alternativa descreve melhor o papel da libc em muitas syscalls?",
      "options": [
        {
          "id": "a",
          "label": "Executar todo o trabalho privilegiado no lugar do kernel."
        },
        {
          "id": "b",
          "label": "Servir como wrapper e tradução de convenções para a chamada real."
        },
        {
          "id": "c",
          "label": "Eliminar a necessidade de modo kernel."
        }
      ],
      "correctOptionId": "b",
      "feedback": "A libc frequentemente prepara argumentos e traduz retorno/errno."
    },
    {
      "id": "q3",
      "prompt": "O que errno representa?",
      "options": [
        {
          "id": "a",
          "label": "Uma cópia do programa em disco."
        },
        {
          "id": "b",
          "label": "Uma convenção de biblioteca para expor falhas retornadas pelo kernel."
        },
        {
          "id": "c",
          "label": "A quantidade de memória virtual livre."
        }
      ],
      "correctOptionId": "b",
      "feedback": "errno ajuda a inspecionar o motivo lógico da falha."
    },
    {
      "id": "q4",
      "prompt": "Qual cenário ilustra problema de granularidade?",
      "options": [
        {
          "id": "a",
          "label": "Ler um arquivo byte a byte com milhares de chamadas."
        },
        {
          "id": "b",
          "label": "Usar um buffer razoável para leitura."
        },
        {
          "id": "c",
          "label": "Mapear memória e nunca tocar nas páginas."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Travessias pequenas demais podem tornar o overhead dominante."
    },
    {
      "id": "q5",
      "prompt": "Sobre mmap, qual afirmação é mais adequada?",
      "options": [
        {
          "id": "a",
          "label": "Ele muda o modelo de acesso ao recurso ao expor uma região mapeada."
        },
        {
          "id": "b",
          "label": "Ele é apenas um alias de write."
        },
        {
          "id": "c",
          "label": "Ele impede page faults."
        }
      ],
      "correctOptionId": "a",
      "feedback": "mmap altera a forma de acesso e o tipo de custo observado."
    },
    {
      "id": "q6",
      "prompt": "Baixo uso de CPU significa ausência de gargalo?",
      "options": [
        {
          "id": "a",
          "label": "Sim, sempre."
        },
        {
          "id": "b",
          "label": "Não; o processo pode estar bloqueado em I/O ou espera do kernel."
        },
        {
          "id": "c",
          "label": "Só em programas sem rede."
        }
      ],
      "correctOptionId": "b",
      "feedback": "Bloqueio e espera no kernel podem dominar o comportamento."
    },
    {
      "id": "q7",
      "prompt": "Qual é um erro comum ao tratar syscalls?",
      "options": [
        {
          "id": "a",
          "label": "Assumir que toda operação retorna tudo de uma vez e sempre completa o pedido integralmente."
        },
        {
          "id": "b",
          "label": "Checar códigos de erro."
        },
        {
          "id": "c",
          "label": "Usar documentação oficial."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Partial reads, interrupções e não prontidão são parte normal do contrato."
    },
    {
      "id": "q8",
      "prompt": "O que a fronteira user↔kernel protege?",
      "options": [
        {
          "id": "a",
          "label": "Somente nomes de arquivos."
        },
        {
          "id": "b",
          "label": "Isolamento, segurança e coordenação de recursos compartilhados."
        },
        {
          "id": "c",
          "label": "Apenas o cache do navegador."
        }
      ],
      "correctOptionId": "b",
      "feedback": "A separação existe para manter a máquina íntegra e organizada."
    }
  ],
  "glossary": [
    {
      "term": "User space",
      "definition": "Região de execução sem privilégios diretos sobre recursos centrais do sistema."
    },
    {
      "term": "Kernel space",
      "definition": "Modo e espaço em que o kernel executa operações privilegiadas."
    },
    {
      "term": "Syscall",
      "definition": "Entrada formal para um serviço do kernel."
    },
    {
      "term": "Wrapper",
      "definition": "Função de biblioteca que prepara e traduz o uso de uma syscall."
    },
    {
      "term": "errno",
      "definition": "Convenção para expor códigos de erro após falhas em chamadas de sistema."
    },
    {
      "term": "Descriptor de arquivo",
      "definition": "Identificador inteiro usado pelo processo para referenciar um recurso aberto."
    },
    {
      "term": "Blocking I/O",
      "definition": "Operação que pode suspender o processo até que a condição necessária esteja pronta."
    },
    {
      "term": "Non-blocking I/O",
      "definition": "Operação configurada para retornar cedo quando o recurso ainda não está pronto."
    },
    {
      "term": "mmap",
      "definition": "Mecanismo para mapear arquivos ou memória em uma região de endereços do processo."
    },
    {
      "term": "Trap",
      "definition": "Transição controlada que leva a execução ao kernel."
    },
    {
      "term": "Granularidade",
      "definition": "Tamanho da unidade de trabalho agrupada por chamada ao kernel."
    }
  ],
  "relatedTopics": [
    {
      "title": "Como um Programa Vira Processo",
      "body": "Conecte syscalls ao ciclo de vida do processo e do startup."
    },
    {
      "title": "Observabilidade de Sistemas",
      "body": "Leve esse modelo para análise de latência, espera e comportamento em produção."
    }
  ]
};
