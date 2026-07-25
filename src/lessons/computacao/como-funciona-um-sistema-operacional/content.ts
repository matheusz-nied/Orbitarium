import type { LessonContent } from "../../../types/content";

export const comoFuncionaUmSistemaOperacionalContent: LessonContent = {
  id: "como-funciona-um-sistema-operacional",
  title: "Como Funciona um Sistema Operacional",
  subtitle:
    "O sistema operacional é o mediador invisível entre programas e hardware: ele cria abstrações, arbitra recursos e impõe regras para que tudo funcione sem caos.",
  description:
    "Uma aula visual sobre o papel do sistema operacional, processos, chamadas de sistema, modos usuário e kernel, escalonamento, memória, E/S, isolamento e compartilhamento de recursos.",
  primaryCategoryId: "computacao",
  secondaryCategoryId: "engenharia",
  level: "Intermediário",
  estimatedTime: "45-55 min",
  tags: ["Sistemas Operacionais", "Kernel", "Syscalls", "Escalonamento", "Processos", "Recursos"],
  learningObjectives: [
    "Explicar por que um sistema operacional existe e quais problemas ele resolve.",
    "Entender a diferença entre modo usuário e modo kernel.",
    "Descrever o papel das chamadas de sistema como ponte entre programas e hardware.",
    "Compreender como o escalonador distribui tempo de CPU entre múltiplos processos.",
    "Relacionar abstrações como arquivo, processo e memória virtual ao trabalho do kernel.",
    "Interpretar o sistema operacional como um gerenciador de recursos, proteção e isolamento.",
  ],
  prerequisites: [
    "Noção geral de programas, memória e CPU.",
    "Curiosidade sobre como vários aplicativos convivem na mesma máquina.",
    "Ter visto o básico de hardware ajuda, mas não é obrigatório.",
  ],
  references: [
    {
      title: "Operating Systems: Three Easy Pieces",
      source: "Arpaci-Dusseau & Arpaci-Dusseau",
      url: "https://pages.cs.wisc.edu/~remzi/OSTEP/",
      note:
        "Livro aberto que organiza sistemas operacionais em virtualização, concorrência e persistência.",
    },
    {
      title: "Linux man-pages — syscalls(2)",
      source: "man7.org",
      url: "https://man7.org/linux/man-pages/man2/syscalls.2.html",
      note:
        "Visão geral das chamadas de sistema expostas pelo kernel Linux.",
    },
    {
      title: "Linux man-pages — namespaces(7)",
      source: "man7.org",
      url: "https://man7.org/linux/man-pages/man7/namespaces.7.html",
      note:
        "Referência conceitual sobre isolamento de recursos em Linux.",
    },
    {
      title: "Control Group v2",
      source: "Linux kernel documentation",
      url: "https://www.kernel.org/doc/html/latest/admin-guide/cgroup-v2.html",
      note:
        "Mostra como o kernel controla consumo de recursos por grupos de processos.",
    },
    {
      title: "MIT 6.S081 / 6.828 Operating System Engineering",
      source: "MIT CSAIL",
      url: "https://pdos.csail.mit.edu/6.S081/2024/schedule.html",
      note:
        "Curso clássico sobre implementação e raciocínio de sistemas operacionais.",
    },
    {
      title: "Computer Systems: A Programmer's Perspective",
      source: "CMU",
      url: "https://csapp.cs.cmu.edu/",
      note:
        "Contextualiza como processos, exceções, memória e E/S aparecem para programadores.",
    },
  ],
  heroVisual: "so-hero",
  openingText:
    "Quando você abre o navegador, escuta música, baixa um arquivo e ainda roda uma IDE, parece que tudo acontece ao mesmo tempo. Mas CPU, memória e disco são finitos. O sistema operacional existe para transformar esse hardware limitado em uma plataforma utilizável: ele decide quem roda, por quanto tempo, quem pode acessar o quê e como erros são contidos. Sem ele, cada programa precisaria conversar diretamente com o hardware, disputar recursos na força bruta e provavelmente derrubar os outros no processo.",
  quickFacts: [
    {
      title: "O SO cria abstrações",
      body:
        "Processos, arquivos, sockets e memória virtual são formas mais amigáveis de usar hardware complexo.",
    },
    {
      title: "O kernel arbitra recursos",
      body:
        "Tempo de CPU, páginas de memória, acesso a disco e dispositivos são distribuídos sob regras.",
    },
    {
      title: "Proteção é parte central",
      body:
        "Programas comuns rodam em modo usuário; operações sensíveis exigem entrada controlada no kernel.",
    },
  ],
  sections: [
    s(
      "motivacao",
      "Motivação",
      "Por que computadores precisam de sistema operacional?",
      "Sem uma camada coordenando hardware e software, cada programa teria que ser seu próprio administrador de CPU, memória e dispositivos.",
      "so-abstracoes",
      undefined,
      [
        "Um computador não executa um único programa de cada vez na prática real. Ele precisa alternar entre dezenas ou centenas de tarefas, responder a interrupções, falar com disco, rede, teclado e tela, e ainda manter algum nível de isolamento entre aplicações.",
        "Se cada aplicação conversasse diretamente com o hardware, qualquer erro poderia travar a máquina inteira, corromper dados de outros programas ou monopolizar recursos. O sistema operacional aparece para impedir esse cenário.",
        "Em vez de exigir que todo desenvolvedor saiba pilotar controladores de disco, MMU, interrupções e escalonamento, o SO oferece interfaces estáveis e abstrações que tornam o hardware programável sem expor toda a complexidade interna.",
      ],
      [
        {
          type: "definition",
          title: "Sistema operacional",
          body:
            "Software fundamental que gerencia recursos de hardware, oferece abstrações para programas e aplica políticas de proteção, isolamento e compartilhamento.",
        },
        {
          type: "insight",
          title: "SO é menos 'programa bonito' e mais 'governança da máquina'",
          body:
            "O trabalho do sistema operacional não é só fornecer comandos; é decidir quem pode fazer o quê, quando e com qual limite.",
        },
      ],
    ),
    s(
      "abstracoes",
      "Abstrações",
      "O kernel simplifica o hardware com objetos mais úteis",
      "Processo, arquivo, socket e memória virtual não são peças físicas: são formas organizadas de enxergar recursos reais.",
      "so-servicos",
      undefined,
      [
        "O hardware oferece registradores, barramentos, blocos de disco, controladores e interrupções. Tudo isso é poderoso, mas péssimo de usar diretamente em software de aplicação.",
        "O sistema operacional encapsula esses mecanismos em abstrações: um arquivo parece um fluxo nomeado de bytes; um processo parece um programa 'rodando sozinho'; um socket parece uma ponta de comunicação; a memória virtual parece um espaço contínuo de endereços.",
        "Essas abstrações não eliminam o hardware. Elas escondem detalhes suficientes para permitir produtividade, portabilidade e segurança sem que o desenvolvedor precise reimplementar o mundo a cada projeto.",
      ],
      [
        {
          type: "example",
          title: "Arquivo não é o disco inteiro",
          body:
            "Quando você chama open() ou read(), está lidando com uma abstração gerenciada pelo SO, não com setores físicos diretamente.",
        },
        {
          type: "mistake",
          title: "Confundir abstração com ilusão sem custo",
          body:
            "Abstrações simplificam, mas têm implementação, overhead e políticas por trás. O trabalho do engenheiro é lembrar que há camadas escondidas.",
        },
      ],
    ),
    s(
      "modo-usuario-kernel",
      "Proteção",
      "Modo usuário e modo kernel: a fronteira que evita o caos",
      "Programas comuns não recebem acesso irrestrito ao hardware; eles precisam pedir serviços ao kernel por uma interface controlada.",
      "so-fronteira",
      "user-kernel-bridge",
      [
        "O processador diferencia pelo menos dois contextos importantes: modo usuário e modo kernel. No modo usuário, o programa roda com permissões limitadas. No modo kernel, o sistema operacional executa operações privilegiadas.",
        "Isso significa que um aplicativo não pode simplesmente reprogramar o controlador de disco, mexer livremente em tabelas de memória ou interromper outros processos. Para ações sensíveis, ele faz uma chamada de sistema.",
        "Essa separação não existe apenas por segurança no sentido clássico. Ela também protege a estabilidade da máquina: bugs de aplicações comuns tendem a morrer no próprio espaço em vez de corromper todo o sistema.",
      ],
      [
        {
          type: "definition",
          title: "Chamada de sistema",
          body:
            "Mecanismo controlado para transferir a execução do modo usuário para o kernel a fim de solicitar um serviço privilegiado.",
        },
        {
          type: "insight",
          title: "Syscall é uma porta estreita, não um túnel aberto",
          body:
            "A ideia é permitir acesso ao que é necessário sem entregar ao aplicativo autoridade total sobre a máquina.",
        },
      ],
    ),
    s(
      "syscalls",
      "Interface",
      "Como programas conversam com o sistema operacional",
      "Bibliotecas, runtime e kernel formam uma cadeia: sua aplicação pede alto nível; o kernel executa o trabalho de baixo nível.",
      "so-abstracoes",
      undefined,
      [
        "Em muitas linguagens, você nem vê a syscall diretamente. Um método como fs.readFile(), print() ou socket.connect() passa por bibliotecas, runtime e, por fim, cai em uma operação do kernel.",
        "O kernel valida permissões, traduz a solicitação para o recurso real e devolve resultado ou erro. Ler um arquivo, por exemplo, envolve descritores, cache de página, sistema de arquivos e eventualmente o dispositivo físico.",
        "Entender essa ponte ajuda a explicar por que certas operações podem bloquear, por que há latência de E/S e por que logs de sistema, erros de permissão e limites de arquivo aberto aparecem em software real.",
      ],
      [
        {
          type: "example",
          title: "Abrir um arquivo",
          body:
            "Seu código pede um arquivo por nome; o kernel resolve caminho, permissões, estrutura do sistema de arquivos e devolve um descritor para uso posterior.",
        },
        {
          type: "mistake",
          title: "Pensar que a biblioteca 'faz tudo sozinha'",
          body:
            "Quase sempre a biblioteca organiza a solicitação, mas o acesso privilegiado ao recurso continua dependendo do kernel.",
        },
      ],
    ),
    s(
      "escalonamento",
      "CPU",
      "Escalonamento: quem ganha tempo de processador?",
      "A CPU é compartilhada no tempo, e o escalonador decide como dividir esse recurso escasso sem destruir responsividade ou vazão.",
      "so-scheduler",
      "scheduler-lab",
      [
        "Em um sistema multiprogramado, vários processos competem por poucos núcleos. O sistema operacional salva contexto, troca o processo em execução e escolhe quem roda em seguida segundo uma política.",
        "Uma política simples como round-robin prioriza justiça básica: cada processo recebe um quantum e depois sai da CPU para outro entrar. Outras políticas tentam balancear interatividade, throughput, prioridade e previsibilidade.",
        "Esse é um ótimo exemplo de diferença entre mecanismo e política. O mecanismo é fazer context switch com segurança; a política é decidir qual processo merece a próxima fatia de CPU.",
      ],
      [
        {
          type: "definition",
          title: "Escalonador",
          body:
            "Parte do sistema operacional responsável por decidir qual tarefa usa a CPU em cada instante e por quanto tempo.",
        },
        {
          type: "insight",
          title: "Responsividade e throughput entram em tensão",
          body:
            "Dar quanta curtos melhora a sensação de fluidez, mas aumenta a frequência de trocas de contexto e o custo administrativo do sistema.",
        },
      ],
    ),
    s(
      "memoria-io",
      "Serviços",
      "Memória, arquivos e E/S: o kernel coordena mais do que CPU",
      "Escalonar processamento é só uma parte; o SO também arbitra acesso a memória, disco, rede e dispositivos.",
      "so-servicos",
      undefined,
      [
        "Quando um programa aloca memória, o sistema operacional participa ao mapear páginas, proteger regiões e lidar com faltas de página em conjunto com o hardware. A sensação de 'memória contínua' depende dessa coordenação.",
        "Ao escrever em disco ou enviar dados pela rede, o programa também não fala diretamente com o dispositivo. Ele passa por buffers, filas, drivers e políticas de E/S administradas pelo kernel.",
        "Isso explica por que desempenho de software não depende apenas do código da aplicação: o caminho entre aplicação e hardware inclui cache, sistema de arquivos, escalonamento de disco, pilha de rede e limites globais.",
      ],
      [
        {
          type: "example",
          title: "Um read() aparentemente simples",
          body:
            "Pode ser atendido do cache de página, pode acordar o driver de armazenamento ou pode bloquear até o dado chegar do dispositivo.",
        },
        {
          type: "definition",
          title: "Driver",
          body:
            "Componente de software que traduz operações genéricas do sistema operacional para detalhes específicos de um dispositivo.",
        },
      ],
    ),
    s(
      "isolamento",
      "Isolamento",
      "Proteger uma tarefa da outra é função central do SO",
      "Além de servir programas, o sistema operacional também precisa contê-los para que erro, abuso ou sobrecarga não se espalhem sem controle.",
      "so-fronteira",
      "resource-pressure-lab",
      [
        "Um processo comum não deve ler arbitrariamente a memória de outro, sobrescrever arquivos de sistema nem consumir recursos infinitamente. O kernel impõe fronteiras, permissões e limites.",
        "Em sistemas modernos, isolamento aparece em vários níveis: usuários e grupos, permissões de arquivo, tabelas de páginas separadas, namespaces, cgroups e políticas de segurança adicionais.",
        "Essa disciplina é o que permite que múltiplas aplicações convivam na mesma máquina com risco reduzido. Quando ela falha, vemos desde vazamento de dados até serviços derrubados por exaustão de memória ou CPU.",
      ],
      [
        {
          type: "insight",
          title: "Estabilidade também é segurança",
          body:
            "Mesmo sem um invasor, um processo sem limites pode ser suficiente para degradar ou derrubar um sistema inteiro.",
        },
        {
          type: "example",
          title: "Limites de recursos",
          body:
            "Cgroups e outros mecanismos permitem impedir que um grupo de processos tome CPU ou memória além do orçamento permitido.",
        },
      ],
    ),
    s(
      "tradeoffs",
      "Trade-offs",
      "O sistema operacional vive escolhendo entre metas conflitantes",
      "Justiça, desempenho, isolamento, simplicidade e compatibilidade nem sempre puxam na mesma direção.",
      "so-scheduler",
      undefined,
      [
        "Escalonar com foco total em throughput pode prejudicar interatividade. Isolar agressivamente pode aumentar overhead. Cachear mais melhora desempenho médio, mas pode tornar o comportamento menos previsível.",
        "Por isso, estudar sistemas operacionais não é decorar listas de APIs. É treinar o olhar para entender quais políticas estão sendo aplicadas e que custo elas impõem ao sistema como um todo.",
        "Essa mentalidade reaparece em praticamente toda a engenharia de software: servidores, bancos de dados, contêineres, GPUs e redes também vivem de mecanismos gerais combinados com políticas de compromisso.",
      ],
      [
        {
          type: "mistake",
          title: "Buscar uma política universalmente 'melhor'",
          body:
            "A política ótima depende do objetivo: desktop interativo, batch científico, banco de dados, sistema embarcado e nuvem valorizam coisas diferentes.",
        },
        {
          type: "insight",
          title: "Mecanismo + política é uma lente poderosa",
          body:
            "Primeiro pergunte como algo é possível; depois pergunte como o sistema decide quando e para quem aplicar aquilo.",
        },
      ],
    ),
    s(
      "quiz",
      "Revisão",
      "Quiz de revisão",
      "Teste os conceitos principais de abstração, syscalls, escalonamento, proteção e gerenciamento de recursos.",
      undefined,
      "quiz",
      [
        "Use o quiz para checar se você já consegue explicar o papel do sistema operacional sem reduzi-lo a 'a tela onde ficam os programas'.",
      ],
      [],
    ),
    s(
      "glossario",
      "Glossário",
      "Glossário e próximos estudos",
      "Consolide o vocabulário que será reutilizado nas aulas de processos, memória virtual, internet, banco de dados e containers.",
      undefined,
      "glossary",
      [
        "Com esse vocabulário firme, as próximas aulas conseguem focar em mecanismos específicos em vez de redefinir a base do sistema a cada etapa.",
      ],
      [],
    ),
  ],
  summaryCards: [
    {
      title: "SO cria abstrações",
      body:
        "Processos, arquivos e memória virtual tornam o hardware utilizável por software comum.",
    },
    {
      title: "Kernel é a camada privilegiada",
      body:
        "Ele executa operações sensíveis e impõe fronteiras entre aplicações e recursos reais.",
    },
    {
      title: "Syscalls são a ponte",
      body:
        "Programas em modo usuário pedem serviços ao kernel de forma controlada.",
    },
    {
      title: "Escalonar é escolher",
      body:
        "Tempo de CPU é finito e precisa ser repartido segundo alguma política.",
    },
    {
      title: "Isolamento evita colapso",
      body:
        "Separar memória, permissões e cotas impede que um processo comprometa os demais.",
    },
    {
      title: "Sistemas operacionais são cheios de trade-offs",
      body:
        "Desempenho, justiça, responsividade e simplicidade raramente apontam todos para a mesma solução.",
    },
  ],
  relatedTopics: [
    {
      title: "Processos, Threads e Concorrência",
      body:
        "Aprofunda o que exatamente o escalonador manipula e por que compartilhar memória traz riscos.",
    },
    {
      title: "Memória Virtual",
      body:
        "Explica a abstração de espaço de endereços e como páginas, TLB e page faults entram em cena.",
    },
    {
      title: "Docker e Containers",
      body:
        "Mostra como namespaces e cgroups reutilizam mecanismos do sistema operacional para isolamento prático.",
    },
  ],
  quiz: [
    q(
      "q1",
      "Qual é a função mais central de um sistema operacional?",
      "Gerenciar recursos de hardware e oferecer abstrações para programas.",
      "Substituir completamente o hardware físico.",
      "Compilar qualquer linguagem automaticamente.",
      "a",
      "O sistema operacional organiza CPU, memória, disco e dispositivos, além de oferecer interfaces mais amigáveis para usá-los.",
    ),
    q(
      "q2",
      "Por que programas comuns rodam em modo usuário?",
      "Para limitar acesso direto a operações privilegiadas e aumentar segurança e estabilidade.",
      "Porque modo kernel é sempre mais lento.",
      "Porque só drivers podem usar registradores.",
      "a",
      "Modo usuário restringe o que a aplicação pode fazer sozinha; ações sensíveis passam pelo kernel.",
    ),
    q(
      "q3",
      "O que uma chamada de sistema faz?",
      "Transfere o pedido de um programa ao kernel por uma interface controlada.",
      "Converte qualquer programa em processo distribuído.",
      "Cria automaticamente uma cópia do programa na memória.",
      "a",
      "Syscalls são o mecanismo formal para solicitar serviços privilegiados ao sistema operacional.",
    ),
    q(
      "q4",
      "Qual problema o escalonador tenta resolver?",
      "Como dividir tempo de CPU entre tarefas concorrentes.",
      "Como converter memória RAM em armazenamento permanente.",
      "Como colorir janelas do sistema.",
      "a",
      "Como a CPU é limitada, o SO precisa escolher quem executa e por quanto tempo.",
    ),
    q(
      "q5",
      "Processo, arquivo e socket são exemplos de quê?",
      "Abstrações oferecidas pelo sistema operacional.",
      "Dispositivos físicos do computador.",
      "Instruções especiais da GPU.",
      "a",
      "Eles simplificam a forma de usar recursos reais, escondendo boa parte da complexidade do hardware.",
    ),
    q(
      "q6",
      "Qual é o papel do isolamento entre processos?",
      "Evitar que um programa leia ou corrompa recursos de outro sem autorização.",
      "Eliminar completamente qualquer custo de contexto.",
      "Garantir que todos usem a mesma quantidade de CPU.",
      "a",
      "Isolamento protege memória, permissões e recursos para reduzir falhas em cascata.",
    ),
    q(
      "q7",
      "Por que nem toda política de escalonamento serve igualmente bem para qualquer cenário?",
      "Porque metas como responsividade, throughput e previsibilidade entram em conflito.",
      "Porque o hardware moderno não troca contexto.",
      "Porque kernels não conseguem medir prioridade.",
      "a",
      "Uma política boa para desktop pode ser ruim para batch, tempo real ou banco de dados.",
    ),
    q(
      "q8",
      "Qual frase resume melhor a relação entre kernel e hardware?",
      "O kernel media e organiza o acesso ao hardware em vez de deixar cada aplicativo falar direto com ele.",
      "O kernel é apenas uma interface gráfica para abrir programas.",
      "O kernel substitui a CPU em tarefas de alta prioridade.",
      "a",
      "O kernel coordena, protege e arbitra recursos, transformando hardware bruto em serviços reutilizáveis.",
    ),
  ],
  glossary: [
    g("Sistema operacional", "Software fundamental que gerencia recursos de hardware e oferece abstrações para programas."),
    g("Kernel", "Parte privilegiada do sistema operacional que executa operações sensíveis e coordena recursos."),
    g("Modo usuário", "Modo de execução com permissões limitadas, usado por aplicações comuns."),
    g("Modo kernel", "Modo privilegiado do processador em que o sistema operacional pode executar operações sensíveis."),
    g("Chamada de sistema", "Ponte controlada entre aplicação e kernel para solicitar serviços privilegiados."),
    g("Processo", "Abstração de um programa em execução com estado, memória e recursos próprios."),
    g("Escalonador", "Componente que escolhe qual tarefa usa a CPU em cada instante."),
    g("Context switch", "Troca de contexto entre tarefas para que a CPU passe a executar outra unidade de trabalho."),
    g("Driver", "Software que conecta o sistema operacional a um dispositivo específico."),
    g("Isolamento", "Separação entre tarefas e recursos para conter falhas, abusos e acessos indevidos."),
    g("Namespace", "Mecanismo de isolamento que faz um processo enxergar um conjunto próprio de recursos."),
    g("Cgroup", "Mecanismo de controle e contabilização de recursos para grupos de processos."),
  ],
};

function s(
  id: string,
  eyebrow: string,
  title: string,
  lead: string,
  visual: string | undefined,
  interactive: string | undefined,
  paragraphs: string[],
  blocks: LessonContent["sections"][number]["blocks"],
) {
  return { id, eyebrow, title, lead, visual, interactive, paragraphs, blocks };
}

function q(
  id: string,
  prompt: string,
  a: string,
  b: string,
  c: string,
  correctOptionId: string,
  feedback: string,
) {
  return {
    id,
    prompt,
    options: [
      { id: "a", label: a },
      { id: "b", label: b },
      { id: "c", label: c },
    ],
    correctOptionId,
    feedback,
  };
}

function g(term: string, definition: string) {
  return { term, definition };
}
