import type { LessonContent } from "../../../types/content";

export const comoUmProgramaViraProcessoContent: LessonContent = {
  "id": "como-um-programa-vira-processo",
  "title": "Como um Programa Vira Processo",
  "subtitle": "Loader, execve e espaço de endereços: o instante em que bytes parados no disco viram trabalho vivo para o sistema operacional.",
  "description": "Uma aula visual sobre executáveis, loader, execve, layout de memória, argc/argv, bibliotecas dinâmicas, fork e a diferença entre programa e processo.",
  "primaryCategoryId": "computacao",
  "secondaryCategoryId": "engenharia",
  "level": "Intermediário",
  "estimatedTime": "45-60 min",
  "tags": [
    "Processos",
    "execve",
    "Loader",
    "ELF",
    "Memória virtual",
    "Linux",
    "Sistemas operacionais"
  ],
  "learningObjectives": [
    "Distinguir com precisão um programa em disco de um processo em execução.",
    "Explicar o papel do kernel e do loader ao criar um novo espaço de endereços.",
    "Reconhecer onde entram código, dados, heap, stack e bibliotecas compartilhadas.",
    "Entender por que execve substitui a imagem do processo em vez de criar uma segunda cópia.",
    "Relacionar fork, exec e shell ao lançamento de comandos no Unix.",
    "Diagnosticar conceitualmente problemas de ambiente, argumentos e mapeamentos no startup de um programa."
  ],
  "prerequisites": [
    "Noção inicial de sistema operacional e memória.",
    "Conhecer o básico de terminal e execução de programas ajuda, mas não é obrigatório.",
    "Curiosidade sobre o que acontece entre digitar um comando e vê-lo rodar."
  ],
  "references": [
    {
      "title": "The Abstraction: The Process",
      "source": "OSTEP — University of Wisconsin",
      "url": "https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-intro.pdf",
      "note": "Capítulo introdutório sobre processo como abstração central do SO."
    },
    {
      "title": "The Abstraction: Address Spaces",
      "source": "OSTEP — University of Wisconsin",
      "url": "https://pages.cs.wisc.edu/~remzi/OSTEP/vm-intro.pdf",
      "note": "Explica espaço de endereços, stack, heap e código no processo."
    },
    {
      "title": "execve(2)",
      "source": "Linux man-pages",
      "url": "https://man7.org/linux/man-pages/man2/execve.2.html",
      "note": "Referência oficial da syscall que troca a imagem do processo."
    },
    {
      "title": "fork(2)",
      "source": "Linux man-pages",
      "url": "https://man7.org/linux/man-pages/man2/fork.2.html",
      "note": "Referência oficial da criação de um novo processo no Unix/Linux."
    },
    {
      "title": "proc_pid_maps(5)",
      "source": "Linux man-pages",
      "url": "https://man7.org/linux/man-pages/man5/proc_pid_maps.5.html",
      "note": "Mostra como inspecionar os mapeamentos de memória de um processo real."
    },
    {
      "title": "Computer Systems: A Programmer's Perspective",
      "source": "CS:APP — Carnegie Mellon",
      "url": "https://csapp.cs.cmu.edu/",
      "note": "Livro de referência para entender executáveis, processos e memória do ponto de vista do programador."
    }
  ],
  "heroVisual": "programa-processo-hero",
  "openingText": "No disco, um programa é um conjunto de bytes organizado em um formato executável. Na CPU, um processo é estado: registradores, pilha, heap, arquivos abertos, credenciais e um espaço de endereços que o kernel consegue escalonar, interromper e isolar. Entre uma coisa e outra existe um ritual técnico: abrir o binário, interpretar seus metadados, montar memória, preparar argumentos e então saltar para o ponto de entrada. Entender esse ritual ajuda a explicar desde um simples comando no shell até cold starts, containers e debugs de produção.",
  "quickFacts": [
    {
      "title": "Programa não é processo",
      "body": "O programa é uma descrição persistida; o processo é a instância executando com estado próprio."
    },
    {
      "title": "execve troca a imagem",
      "body": "Ao executar um novo binário, o kernel reaproveita o processo e substitui quase todo o seu espaço de endereços."
    },
    {
      "title": "A stack nasce preparada",
      "body": "Argumentos, ambiente e ponteiros auxiliares são organizados antes de o programa começar de fato."
    }
  ],
  "sections": [
    {
      "id": "programa-vs-processo",
      "eyebrow": "Mapa mental",
      "title": "Programa é artefato; processo é execução com estado",
      "lead": "A diferença parece semântica, mas ela organiza toda a forma como um SO trabalha.",
      "visual": "programa-processo-mapa",
      "paragraphs": [
        "Um programa em disco não ocupa CPU, não possui registradores e não tem descritores de arquivos abertos. Ele é uma representação serializada do que poderia ser executado. O processo, por outro lado, já está imerso nas abstrações do sistema operacional: possui PID, permissões, memória mapeada e contexto de execução.",
        "Essa distinção importa porque quase toda discussão operacional acontece no nível do processo. Quando observamos consumo de RAM, sinais, page faults ou arquivos abertos, estamos olhando para a vida da instância em execução, não para o binário isolado."
      ],
      "blocks": [
        {
          "type": "definition",
          "title": "Processo",
          "body": "Abstração do sistema operacional para um programa em execução com memória, registradores, contexto de I/O e identidade próprios."
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Imaginar que “executar um arquivo” significa apenas copiar bytes para a memória e começar. O kernel precisa preparar muito mais do que isso."
        }
      ]
    },
    {
      "id": "loader-e-exec",
      "eyebrow": "Fluxo",
      "title": "O loader transforma o executável em espaço de endereços utilizável",
      "lead": "Entre o arquivo no disco e a primeira instrução executada existe uma sequência bem definida de decisões do kernel.",
      "interactive": "loader-pipeline-lab",
      "paragraphs": [
        "Ao receber um pedido para executar um binário, o kernel valida o formato, cria a nova imagem de memória, mapeia segmentos com permissões adequadas e prepara estruturas auxiliares. Em executáveis dinâmicos, ainda há o passo de localizar e carregar bibliotecas compartilhadas antes que o programa “real” assuma o controle.",
        "Esse momento explica por que permissões de execução, path do interpretador dinâmico, variáveis de ambiente e local de bibliotecas podem quebrar um processo antes mesmo de a lógica da aplicação começar."
      ],
      "blocks": [
        {
          "type": "insight",
          "title": "O ponto invisível do startup",
          "body": "Muitos erros que parecem bug da aplicação acontecem antes da main: no carregamento do binário, na resolução dinâmica ou na preparação da stack inicial."
        },
        {
          "type": "example",
          "title": "Exemplo",
          "body": "Quando o shell executa um comando, ele normalmente cria um filho e chama execve para que aquele processo filho passe a representar o novo programa."
        }
      ]
    },
    {
      "id": "layout-da-memoria",
      "eyebrow": "Estrutura",
      "title": "A imagem do processo é organizada em regiões com papéis diferentes",
      "lead": "Código, dados, heap, stack e bibliotecas não ficam misturados; cada região atende um tipo de uso e proteção.",
      "paragraphs": [
        "O segmento de código tende a ser mapeado como legível e executável, mas não gravável. Dados estáticos têm outra política. A heap cresce conforme o programa pede memória dinâmica, enquanto a stack acompanha chamadas, variáveis locais e retornos. Bibliotecas compartilhadas entram como mapeamentos adicionais.",
        "Essa organização não é apenas arrumação conceitual. Ela ajuda o sistema a impor isolamento, reduzir corrupção acidental, compartilhar páginas entre processos e depurar problemas de acesso inválido com mensagens e sinais significativos."
      ],
      "blocks": [
        {
          "type": "definition",
          "title": "Espaço de endereços",
          "body": "Visão de memória que o processo enxerga, composta por regiões virtuais com permissões e finalidades distintas."
        },
        {
          "type": "example",
          "title": "Exemplo",
          "body": "Uma falha por tentar escrever em uma região somente leitura é um sintoma clássico de que permissões de mapeamento importam tanto quanto a existência do endereço."
        }
      ]
    },
    {
      "id": "fork-e-exec",
      "eyebrow": "Comparação",
      "title": "fork e exec resolvem problemas diferentes, e o shell usa os dois juntos",
      "lead": "No Unix, criar um processo e trocar o programa desse processo são operações separadas por design.",
      "interactive": "fork-exec-lab",
      "paragraphs": [
        "fork cria um novo processo a partir do atual; execve troca a imagem do processo atual por outro programa. Separar essas operações dá ao shell um espaço precioso para configurar redirecionamentos, pipes, variáveis e diretórios entre a criação do filho e a troca do binário.",
        "Essa arquitetura parece estranha à primeira vista, mas é extremamente poderosa. Ela permite compor utilitários simples em pipelines, montar ambientes de execução distintos e controlar com precisão o que o novo programa herdará."
      ],
      "blocks": [
        {
          "type": "insight",
          "title": "Por que a dupla sobreviveu",
          "body": "O valor de fork+exec não está em ser a única forma possível de criar processos, mas em abrir um espaço de configuração muito flexível entre nascer e virar outro programa."
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Pensar que exec cria um processo novo. Na prática, ele reaproveita o processo chamador e substitui sua imagem de execução."
        }
      ]
    },
    {
      "id": "startup-real",
      "eyebrow": "Trade-off",
      "title": "Quanto mais runtime e dependências, mais complexo fica o arranque",
      "lead": "Nem todo processo sobe com o mesmo custo conceitual: linking dinâmico, ambiente e inicializações ampliam a superfície do startup.",
      "interactive": "process-layout-lab",
      "paragraphs": [
        "Um binário simples e estático tem uma história de inicialização diferente de um aplicativo com muitas bibliotecas, variáveis de ambiente extensas e runtime gerenciado. O mecanismo básico é o mesmo, mas a quantidade de mapeamentos, verificações e inicializadores cresce.",
        "Isso ajuda a raciocinar sobre cold starts, imagens enxutas e problemas que só aparecem em produção quando um processo depende do ambiente exato em que foi lançado."
      ],
      "blocks": [
        {
          "type": "example",
          "title": "Exemplo",
          "body": "Um container pode iniciar corretamente em uma máquina e falhar em outra porque o processo depende de paths, bibliotecas ou variáveis que mudaram entre ambientes."
        },
        {
          "type": "definition",
          "title": "Runtime de inicialização",
          "body": "Conjunto de etapas que acontece antes de a lógica de negócio começar: preparação de memória, linking, setup de ambiente e inicializadores."
        }
      ]
    },
    {
      "id": "depuracao-e-observacao",
      "eyebrow": "Diagnóstico",
      "title": "Problemas de processo costumam aparecer como sintomas de ambiente e mapeamento",
      "lead": "Quando um programa nem abre, o defeito pode estar muito antes da regra de negócio.",
      "visual": "programa-processo-resumo",
      "paragraphs": [
        "Permissão ausente, interpretador dinâmico incorreto, biblioteca não encontrada, argumento malformado e limite de recursos são exemplos de falhas que pertencem ao nascimento do processo. Saber onde o processo ainda está virando processo acelera muito a investigação.",
        "Ferramentas como procfs, strace, ldd e logs de bootstrap ajudam justamente porque revelam essa fase liminar entre o arquivo executável e a aplicação já de pé."
      ],
      "blocks": [
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Começar a depuração pelo código de negócio quando o problema real é um binário mal carregado, uma biblioteca ausente ou um ambiente mal preparado."
        },
        {
          "type": "insight",
          "title": "Critério operacional",
          "body": "Quanto mais cedo no ciclo de vida do processo ocorre a falha, mais valioso é observar loader, mapeamentos e herança de ambiente."
        }
      ]
    },
    {
      "id": "sintese-operacional",
      "eyebrow": "Síntese",
      "title": "Leve um checklist mental para produção",
      "lead": "A parte mais útil da teoria é virar um modelo rápido de diagnóstico e projeto.",
      "interactive": "summary-cards",
      "paragraphs": [
        "Revise os cartões para consolidar o fluxo completo: artefato, carregamento, espaço de endereços e herança de estado."
      ]
    },
    {
      "id": "quiz-revisao",
      "eyebrow": "Revisão",
      "title": "Quiz de revisão",
      "lead": "Teste se as peças do startup de um processo ficaram conectadas.",
      "interactive": "quiz",
      "paragraphs": [
        "As perguntas focam mecanismo e implicações práticas, não só terminologia."
      ]
    },
    {
      "id": "glossario",
      "eyebrow": "Vocabulário",
      "title": "Glossário essencial",
      "lead": "Use este glossário como mapa rápido quando encontrar documentação de SO, runtime e depuração.",
      "interactive": "glossary",
      "paragraphs": [
        "Dominar esse vocabulário reduz ruído quando você estiver analisando traces de bootstrap, procfs ou ferramentas de observação de processos."
      ]
    }
  ],
  "summaryCards": [
    {
      "title": "Programa é descrição",
      "body": "No disco há bytes e metadados; ainda não existe escalonamento, I/O aberto nem registradores ativos."
    },
    {
      "title": "Processo é estado vivo",
      "body": "O kernel cria identidade, espaço de endereços, stack inicial e contexto que pode ser interrompido e retomado."
    },
    {
      "title": "fork e exec se complementam",
      "body": "Um cria a instância; o outro troca o binário executado, abrindo espaço para redirecionamentos e composição no shell."
    }
  ],
  "quiz": [
    {
      "id": "q1",
      "prompt": "Qual afirmação distingue corretamente programa e processo?",
      "options": [
        {
          "id": "a",
          "label": "Programa é o artefato em disco; processo é a instância executando com estado."
        },
        {
          "id": "b",
          "label": "Programa é sempre sinônimo de processo."
        },
        {
          "id": "c",
          "label": "Processo existe apenas quando há interface gráfica."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Programa é descrição persistida; processo é a execução viva administrada pelo SO."
    },
    {
      "id": "q2",
      "prompt": "O que execve faz conceitualmente?",
      "options": [
        {
          "id": "a",
          "label": "Cria uma cópia do processo pai."
        },
        {
          "id": "b",
          "label": "Substitui a imagem do processo atual por outro programa."
        },
        {
          "id": "c",
          "label": "Apenas aumenta a prioridade do processo."
        }
      ],
      "correctOptionId": "b",
      "feedback": "execve troca a imagem de execução do processo chamador."
    },
    {
      "id": "q3",
      "prompt": "Por que o shell combina fork com exec?",
      "options": [
        {
          "id": "a",
          "label": "Porque exec sozinho não permite um espaço para configurar o filho antes da troca do binário."
        },
        {
          "id": "b",
          "label": "Porque fork já executa automaticamente qualquer binário."
        },
        {
          "id": "c",
          "label": "Porque o kernel exige dois processos para qualquer comando."
        }
      ],
      "correctOptionId": "a",
      "feedback": "O shell usa o intervalo entre fork e exec para redirecionamentos, pipes e ambiente."
    },
    {
      "id": "q4",
      "prompt": "Qual região costuma armazenar variáveis locais e endereços de retorno?",
      "options": [
        {
          "id": "a",
          "label": "Heap"
        },
        {
          "id": "b",
          "label": "Segmento de código"
        },
        {
          "id": "c",
          "label": "Stack"
        }
      ],
      "correctOptionId": "c",
      "feedback": "A stack acompanha chamadas, variáveis locais e retornos."
    },
    {
      "id": "q5",
      "prompt": "Qual é um sintoma típico de falha ainda na fase de startup?",
      "options": [
        {
          "id": "a",
          "label": "Biblioteca dinâmica ausente"
        },
        {
          "id": "b",
          "label": "Erro de regra de negócio após horas de uso"
        },
        {
          "id": "c",
          "label": "Relatório mensal com dados incorretos"
        }
      ],
      "correctOptionId": "a",
      "feedback": "Muitos problemas de nascimento do processo aparecem como falhas de linking, permissões ou ambiente."
    },
    {
      "id": "q6",
      "prompt": "O espaço de endereços de um processo serve para quê?",
      "options": [
        {
          "id": "a",
          "label": "Dar ao processo uma visão organizada de memória com regiões e permissões."
        },
        {
          "id": "b",
          "label": "Substituir a necessidade de CPU."
        },
        {
          "id": "c",
          "label": "Eliminar a diferença entre disco e RAM."
        }
      ],
      "correctOptionId": "a",
      "feedback": "O espaço de endereços organiza a memória visível ao processo."
    },
    {
      "id": "q7",
      "prompt": "Qual afirmação sobre linking dinâmico é a mais adequada?",
      "options": [
        {
          "id": "a",
          "label": "Ele pode introduzir dependências extras no startup do processo."
        },
        {
          "id": "b",
          "label": "Ele torna irrelevantes permissões e paths."
        },
        {
          "id": "c",
          "label": "Ele impede qualquer compartilhamento de páginas."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Bibliotecas compartilhadas e seus paths fazem parte da história de inicialização."
    },
    {
      "id": "q8",
      "prompt": "Quando faz sentido investigar procfs e mapeamentos?",
      "options": [
        {
          "id": "a",
          "label": "Quando a falha parece acontecer antes de a aplicação realmente começar."
        },
        {
          "id": "b",
          "label": "Somente em aplicações gráficas."
        },
        {
          "id": "c",
          "label": "Apenas depois de revisar todos os dashboards de negócio."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Essas ferramentas ajudam muito quando o defeito está no nascimento do processo."
    }
  ],
  "glossary": [
    {
      "term": "Programa",
      "definition": "Artefato persistido em disco contendo código e metadados que podem ser executados."
    },
    {
      "term": "Processo",
      "definition": "Instância em execução de um programa, com contexto próprio de memória, CPU e I/O."
    },
    {
      "term": "Loader",
      "definition": "Mecanismo responsável por preparar a imagem executável na memória e iniciar sua execução."
    },
    {
      "term": "execve",
      "definition": "Syscall que substitui a imagem do processo atual por um novo programa."
    },
    {
      "term": "fork",
      "definition": "Syscall que cria um novo processo a partir do processo chamador."
    },
    {
      "term": "Espaço de endereços",
      "definition": "Visão de memória que o processo enxerga, composta por regiões virtuais com papéis distintos."
    },
    {
      "term": "Stack",
      "definition": "Região de memória usada para chamadas de função, variáveis locais e retornos."
    },
    {
      "term": "Heap",
      "definition": "Região de memória usada para alocações dinâmicas controladas pelo programa."
    },
    {
      "term": "Biblioteca compartilhada",
      "definition": "Código reutilizável carregado dinamicamente e potencialmente compartilhado entre processos."
    },
    {
      "term": "PID",
      "definition": "Identificador numérico de processo usado pelo sistema operacional."
    },
    {
      "term": "argc/argv",
      "definition": "Estruturas que carregam para o programa os argumentos de linha de comando."
    }
  ],
  "relatedTopics": [
    {
      "title": "Como Funciona um Sistema Operacional",
      "body": "Amplie o papel do kernel, do escalonador e das abstrações de processo."
    },
    {
      "title": "Memória Virtual",
      "body": "Aprofunde como o espaço de endereços virtual é traduzido e protegido."
    }
  ]
};
