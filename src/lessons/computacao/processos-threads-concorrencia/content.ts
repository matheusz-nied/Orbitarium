import type { LessonContent } from "../../../types/content";

export const processosThreadsConcorrenciaContent: LessonContent = {
  id: "processos-threads-concorrencia",
  title: "Processos, Threads e Concorrência",
  subtitle:
    "Executar várias tarefas ao mesmo tempo parece simples na superfície, mas exige modelos de execução, compartilhamento de memória e coordenação cuidadosa.",
  description:
    "Uma aula visual sobre processo, thread, concorrência, paralelismo, estados de execução, troca de contexto, condições de corrida, exclusão mútua e deadlocks.",
  primaryCategoryId: "computacao",
  secondaryCategoryId: "engenharia",
  level: "Intermediário",
  estimatedTime: "45-55 min",
  tags: ["Processos", "Threads", "Concorrência", "Paralelismo", "Mutex", "Deadlock"],
  learningObjectives: [
    "Distinguir processo e thread com precisão conceitual.",
    "Entender o que concorrência resolve e onde paralelismo entra de fato.",
    "Relacionar estado de execução e troca de contexto ao trabalho do sistema operacional.",
    "Explicar por que memória compartilhada gera condições de corrida.",
    "Compreender o papel de mutexes e outras formas de sincronização.",
    "Reconhecer como deadlocks surgem e por que ordem de aquisição importa.",
  ],
  prerequisites: [
    "Noção geral do papel do sistema operacional.",
    "Entender que programas competem por CPU e memória.",
    "Ler pseudocódigo simples ajuda, mas não é obrigatório.",
  ],
  references: [
    {
      title: "Operating Systems: Three Easy Pieces",
      source: "Arpaci-Dusseau & Arpaci-Dusseau",
      url: "https://pages.cs.wisc.edu/~remzi/OSTEP/",
      note:
        "Base conceitual para processos, threads, locks, condition variables e bugs de concorrência.",
    },
    {
      title: "Linux man-pages — pthreads(7)",
      source: "man7.org",
      url: "https://man7.org/linux/man-pages/man7/pthreads.7.html",
      note:
        "Visão prática da API POSIX de threads e semântica de compartilhamento em Linux.",
    },
    {
      title: "Linux man-pages — fork(2)",
      source: "man7.org",
      url: "https://man7.org/linux/man-pages/man2/fork.2.html",
      note:
        "Referência clássica para criação de processos em sistemas tipo Unix.",
    },
    {
      title: "MIT 6.S081 / 6.828 Operating System Engineering",
      source: "MIT CSAIL",
      url: "https://pdos.csail.mit.edu/6.S081/2024/schedule.html",
      note:
        "Curso aberto com forte ênfase em implementação de processos, threads e sincronização.",
    },
    {
      title: "The Open Group Base Specifications — pthread_mutex_lock",
      source: "The Open Group",
      url: "https://pubs.opengroup.org/onlinepubs/9799919799/functions/pthread_mutex_lock.html",
      note:
        "Especificação padronizada de exclusão mútua em POSIX.",
    },
    {
      title: "Computer Systems: A Programmer's Perspective",
      source: "CMU",
      url: "https://csapp.cs.cmu.edu/",
      note:
        "Conecta execução concorrente, processos e threads ao ponto de vista do programador de sistemas.",
    },
  ],
  heroVisual: "ptc-hero",
  openingText:
    "Quando você pensa em um servidor web, um navegador com várias abas ou um banco processando múltiplas consultas, está pensando em concorrência. A máquina precisa lidar com várias unidades de trabalho que avançam, esperam, disputam CPU, compartilham dados e às vezes se bloqueiam mutuamente. Processos e threads são duas formas clássicas de modelar isso. A dificuldade começa quando o compartilhamento deixa de ser só performance e vira risco de inconsistência.",
  quickFacts: [
    {
      title: "Processo isola melhor",
      body:
        "Cada processo tem espaço de endereços próprio e fronteiras mais fortes entre falhas.",
    },
    {
      title: "Thread compartilha mais",
      body:
        "Threads do mesmo processo compartilham memória e outros recursos, o que reduz custo e aumenta risco.",
    },
    {
      title: "Concorrência sem coordenação quebra",
      body:
        "Quando várias unidades mexem no mesmo estado, a ordem dos eventos passa a importar.",
    },
  ],
  sections: [
    s(
      "motivacao",
      "Motivação",
      "Por que dividir trabalho em múltiplas unidades?",
      "Sistemas reais precisam responder a vários eventos ao mesmo tempo, mesmo quando há poucos núcleos ou muitos bloqueios de E/S.",
      "ptc-lifecycle",
      undefined,
      [
        "Um programa que aceita clientes de rede, acessa disco e atualiza memória interna não quer parar tudo para cada operação lenta. Concorrência é a arte de manter múltiplos fluxos de trabalho progredindo.",
        "Às vezes o objetivo é usar vários núcleos em paralelo. Em outros casos, o objetivo é apenas manter a aplicação responsiva enquanto uma parte espera rede, disco ou entrada do usuário.",
        "Processos e threads surgem como unidades organizadoras dessa execução. Entender as diferenças entre eles ajuda a decidir arquitetura, custo e risco.",
      ],
      [
        {
          type: "definition",
          title: "Concorrência",
          body:
            "Capacidade de lidar com várias tarefas em progresso, ainda que nem todas estejam executando ao mesmo tempo em hardware.",
        },
        {
          type: "insight",
          title: "Concorrência não significa automaticamente paralelismo",
          body:
            "Você pode ter várias tarefas intercaladas em um único núcleo sem que duas executem simultaneamente.",
        },
      ],
    ),
    s(
      "processo-vs-thread",
      "Modelo",
      "Processo e thread não são a mesma coisa",
      "Um processo é um contêiner de execução com isolamento; uma thread é uma linha de execução que vive dentro dele.",
      "ptc-process-thread",
      "process-thread-memory",
      [
        "Processos possuem espaço de endereços, descritores de arquivo, contexto de segurança e outros recursos próprios. São uma unidade mais pesada, mas oferecem separação mais robusta entre falhas.",
        "Threads vivem dentro de um processo e compartilham a maior parte do ambiente: heap, código, arquivos abertos e dados globais. Cada thread tem pilha e registradores próprios, mas não um universo isolado.",
        "Esse compartilhamento torna a comunicação entre threads mais barata, porém abre a porta para condições de corrida e bugs que não aparecem quando tudo está separado por processo.",
      ],
      [
        {
          type: "definition",
          title: "Thread",
          body:
            "Fluxo de execução com contador de programa, registradores e pilha próprios dentro de um processo maior.",
        },
        {
          type: "mistake",
          title: "Tratar thread como mini processo isolado",
          body:
            "Threads do mesmo processo podem enxergar e alterar o mesmo heap; essa é a grande diferença prática.",
        },
      ],
    ),
    s(
      "estados",
      "Estados",
      "Rodando, pronta, bloqueada: a vida de uma tarefa",
      "A maior parte do tempo uma unidade de execução não está efetivamente usando CPU.",
      "ptc-lifecycle",
      undefined,
      [
        "Uma tarefa pode estar rodando, pronta para rodar ou bloqueada esperando algum evento. Isso vale tanto para processos quanto para threads, dependendo de como o sistema modela a execução.",
        "Quando uma thread pede E/S ou dorme esperando um lock, ela pode sair do processador e abrir espaço para outra. Essa transição é um dos motivos pelos quais sistemas conseguem manter várias atividades em andamento.",
        "O escalonador observa esses estados para decidir quem entra na CPU. Logo, concorrência depende tanto do modelo de execução quanto das políticas do sistema operacional.",
      ],
      [
        {
          type: "example",
          title: "Servidor esperando banco de dados",
          body:
            "Enquanto uma thread espera resposta de rede, outra pode usar a CPU para atender uma requisição diferente.",
        },
        {
          type: "insight",
          title: "Bloqueio não é o mesmo que ocioso",
          body:
            "Uma tarefa bloqueada ainda está viva e relevante; ela só está parada até algum evento destravar seu progresso.",
        },
      ],
    ),
    s(
      "paralelismo",
      "Desempenho",
      "Concorrência e paralelismo se encontram, mas não se confundem",
      "Paralelismo exige capacidade de hardware; concorrência exige estrutura para lidar com múltiplas tarefas.",
      "ptc-process-thread",
      undefined,
      [
        "Em uma máquina com um único núcleo, duas threads podem se alternar e parecer simultâneas para o usuário, mas continuam usando a CPU uma por vez. Isso já é concorrência.",
        "Com múltiplos núcleos, tarefas independentes podem executar de verdade em paralelo. Nesse cenário, o modelo de thread frequentemente ajuda a explorar hardware, mas a coordenação fica ainda mais crítica.",
        "O ponto principal é que concorrência resolve organização e responsividade; paralelismo resolve capacidade de execução simultânea. Em muitos sistemas, os dois aparecem juntos.",
      ],
      [
        {
          type: "definition",
          title: "Paralelismo",
          body:
            "Execução realmente simultânea de múltiplas tarefas, tipicamente apoiada por múltiplos núcleos ou múltiplas unidades de processamento.",
        },
        {
          type: "mistake",
          title: "Achar que criar mais threads sempre acelera",
          body:
            "Se o gargalo for lock, memória, rede ou disco, mais threads podem apenas aumentar contenção e overhead.",
        },
      ],
    ),
    s(
      "race-condition",
      "Risco",
      "Condição de corrida: quando o resultado depende da ordem invisível dos eventos",
      "Compartilhar memória sem coordenação transforma uma operação simples em fonte de inconsistência.",
      "ptc-sync",
      "race-condition-lab",
      [
        "Imagine duas threads incrementando o mesmo contador. Ler, somar e escrever parece uma única ação em linguagem de alto nível, mas por baixo há etapas que podem se intercalar.",
        "Se as duas leem o valor antigo antes de qualquer uma escrever o novo, um incremento se perde. O resultado final fica menor do que o esperado, e o bug pode aparecer só em certas execuções.",
        "Esse tipo de problema é traiçoeiro porque o programa pode parecer correto em testes pequenos e falhar apenas sob carga, em outra máquina ou com outra ordem de agendamento.",
      ],
      [
        {
          type: "definition",
          title: "Condição de corrida",
          body:
            "Bug em que o comportamento depende da ordem relativa de acessos concorrentes a estado compartilhado.",
        },
        {
          type: "insight",
          title: "O erro não está em 'duas threads existirem', mas em compartilhar estado sem protocolo",
          body:
            "Concorrência segura depende de invariantes e disciplina sobre quem lê, escreve e em que momento.",
        },
      ],
    ),
    s(
      "sincronizacao",
      "Coordenação",
      "Mutexes e sincronização: restringir para preservar consistência",
      "Sincronizar é escolher onde a execução pode se intercalar e onde ela precisa ser exclusiva.",
      "ptc-sync",
      undefined,
      [
        "Um mutex permite que apenas uma thread entre em determinada seção crítica por vez. Isso impede que atualizações sensíveis se sobreponham e quebrem invariantes.",
        "Sincronização, porém, não é grátis. Locks introduzem espera, podem reduzir paralelismo efetivo e exigem cuidado para não proteger demais e transformar tudo em fila única.",
        "A engenharia de concorrência madura tenta minimizar estado compartilhado, reduzir o tamanho das seções críticas e tornar a coordenação o mais explícita e local possível.",
      ],
      [
        {
          type: "definition",
          title: "Seção crítica",
          body:
            "Trecho de código que acessa estado compartilhado e, por isso, não deve ser executado simultaneamente por múltiplas threads sem coordenação.",
        },
        {
          type: "example",
          title: "Contador protegido",
          body:
            "Uma thread adquire o mutex, atualiza o contador e libera o lock; as demais esperam sua vez.",
        },
      ],
    ),
    s(
      "deadlock",
      "Armadilha",
      "Deadlock: cada um segura um recurso e espera pelo outro",
      "Quando a coordenação é mal desenhada, as tarefas deixam de correr e começam a se bloquear mutuamente para sempre.",
      "ptc-sync",
      "deadlock-graph",
      [
        "Deadlock é o cenário em que um fluxo segura um recurso e espera outro, enquanto um segundo fluxo segura o segundo recurso e espera o primeiro. Ninguém consegue avançar.",
        "A causa típica é ordem inconsistente de aquisição. Se todos pegam locks em ordens diferentes dependendo do caminho do código, cedo ou tarde uma combinação ruim aparece.",
        "Uma forma clássica de prevenção é impor uma ordem global: por exemplo, sempre adquirir Lock A antes de Lock B. Isso reduz liberdade local, mas evita espera circular.",
      ],
      [
        {
          type: "definition",
          title: "Deadlock",
          body:
            "Bloqueio permanente em que duas ou mais tarefas aguardam recursos umas das outras em ciclo.",
        },
        {
          type: "mistake",
          title: "Achar que lock é sempre o problema e não a política de uso",
          body:
            "O lock em si é uma ferramenta; o deadlock costuma surgir da ordem e da composição das aquisições.",
        },
      ],
    ),
    s(
      "escolhas",
      "Projeto",
      "Como escolher entre processos, threads e outras estratégias",
      "A decisão depende do equilíbrio entre isolamento, custo, simplicidade e padrão de compartilhamento.",
      "ptc-process-thread",
      undefined,
      [
        "Processos tendem a oferecer isolamento melhor e falhas menos contagiosas. Threads tendem a facilitar compartilhamento e reduzir overhead de comunicação dentro do mesmo processo.",
        "Mas a escolha não é binária. Muitas arquiteturas combinam processos para fronteiras maiores e threads para concorrência interna, além de filas, pools e modelos baseados em eventos.",
        "A pergunta útil não é 'qual é melhor em abstrato?', e sim: qual unidade de execução torna explícitos meus limites, meus dados compartilhados e meus riscos de bloqueio?",
      ],
      [
        {
          type: "insight",
          title: "Modelo de concorrência é decisão de arquitetura",
          body:
            "Ele afeta segurança, capacidade de depuração, consumo de memória, throughput e ergonomia do time.",
        },
        {
          type: "example",
          title: "Separar por processo",
          body:
            "Uma arquitetura pode colocar workers independentes em processos distintos para conter falhas e usar threads apenas dentro de cada worker.",
        },
      ],
    ),
    s(
      "quiz",
      "Revisão",
      "Quiz de revisão",
      "Teste processo, thread, concorrência, paralelismo, condição de corrida, mutex e deadlock.",
      undefined,
      "quiz",
      [
        "Use este bloco para consolidar intuições antes de avançar para memória virtual e outros mecanismos do sistema.",
      ],
      [],
    ),
    s(
      "glossario",
      "Glossário",
      "Glossário e próximos estudos",
      "Feche a aula fixando o vocabulário que aparece em programação de sistemas e engenharia de software real.",
      undefined,
      "glossary",
      [
        "Esses conceitos voltam em bancos, servidores, containers, runtimes e aplicações que atendem muitas requisições simultâneas.",
      ],
      [],
    ),
  ],
  summaryCards: [
    {
      title: "Processo e thread têm papéis diferentes",
      body:
        "Processos isolam melhor; threads compartilham mais e, portanto, exigem mais coordenação.",
    },
    {
      title: "Concorrência organiza progresso",
      body:
        "Ela permite lidar com múltiplas tarefas, mesmo sem paralelismo real de hardware.",
    },
    {
      title: "Estado compartilhado é o ponto sensível",
      body:
        "Sem protocolo de acesso, a ordem dos eventos muda o resultado final.",
    },
    {
      title: "Mutex não é luxo",
      body:
        "É uma ferramenta para preservar invariantes em seções críticas.",
    },
    {
      title: "Deadlock é política ruim de aquisição",
      body:
        "Ordem inconsistente de locks costuma ser a faísca de ciclos de espera.",
    },
    {
      title: "Modelo de concorrência é decisão arquitetural",
      body:
        "Ele afeta custo, depuração, isolamento e desempenho do sistema inteiro.",
    },
  ],
  relatedTopics: [
    {
      title: "Como Funciona um Sistema Operacional",
      body:
        "Volta um passo para rever o papel do kernel, do escalonador e da proteção entre tarefas.",
    },
    {
      title: "Memória Virtual",
      body:
        "Aprofunda a noção de espaço de endereços que processos distintos usam para isolar memória.",
    },
    {
      title: "Como Funciona um Banco de Dados",
      body:
        "Mostra concorrência em outro nível: transações, isolamento e coordenação entre sessões.",
    },
  ],
  quiz: [
    q("q1", "Qual afirmação diferencia melhor processo e thread?", "Processos têm isolamento mais forte; threads compartilham o mesmo espaço de endereços do processo.", "Threads sempre usam processos separados.", "Processos não podem concorrer entre si.", "a", "Processos possuem espaço próprio; threads compartilham memória e recursos do processo pai."),
    q("q2", "O que concorrência resolve primeiro?", "Organizar múltiplas tarefas em progresso.", "Garantir paralelismo físico em qualquer máquina.", "Eliminar toda necessidade de sincronização.", "a", "Concorrência lida com múltiplos fluxos de trabalho mesmo antes de pensar em paralelismo real."),
    q("q3", "Duas threads em um único núcleo podem ser concorrentes?", "Sim, se o sistema alterna sua execução no tempo.", "Não, porque concorrência só existe com vários núcleos.", "Só se usarem memória diferente.", "a", "Concorrência pode existir por interleaving mesmo sem execução simultânea real."),
    q("q4", "Quando surge uma condição de corrida?", "Quando múltiplas tarefas acessam estado compartilhado sem coordenação adequada.", "Quando há apenas uma thread rodando.", "Quando um processo termina normalmente.", "a", "O resultado passa a depender da ordem dos acessos concorrentes."),
    q("q5", "Para que serve um mutex?", "Garantir exclusão mútua em uma seção crítica.", "Criar automaticamente novos processos.", "Aumentar a velocidade de qualquer algoritmo.", "a", "Mutex limita entrada concorrente em trechos que não podem ser intercalados livremente."),
    q("q6", "Qual situação descreve melhor um deadlock?", "Cada tarefa segura um recurso e espera por outro em ciclo.", "Uma thread demora demais por falta de CPU.", "Um processo recebe um PID duplicado.", "a", "Deadlock é um bloqueio circular e permanente entre dependências."),
    q("q7", "Por que criar muitas threads pode piorar desempenho?", "Porque contenção, overhead e espera também crescem.", "Porque o sistema para de usar múltiplos núcleos.", "Porque threads não conseguem fazer E/S.", "a", "Mais threads não significam automaticamente mais throughput quando o gargalo está em lock, memória ou E/S."),
    q("q8", "Qual prática ajuda a evitar deadlock?", "Definir ordem global para aquisição de locks.", "Permitir qualquer ordem dependendo do caminho do código.", "Proteger tudo com o mesmo lock e nunca liberar.", "a", "Uma ordem consistente remove a espera circular, uma das fontes clássicas de deadlock."),
  ],
  glossary: [
    g("Processo", "Unidade de execução com espaço de endereços e recursos próprios."),
    g("Thread", "Linha de execução dentro de um processo, com pilha e registradores próprios."),
    g("Concorrência", "Capacidade de lidar com múltiplas tarefas em progresso."),
    g("Paralelismo", "Execução simultânea real de tarefas em hardware."),
    g("Escalonamento", "Decisão sobre qual tarefa usa CPU em cada instante."),
    g("Context switch", "Troca de contexto entre unidades de execução."),
    g("Seção crítica", "Trecho de código que acessa estado compartilhado sensível."),
    g("Mutex", "Mecanismo de exclusão mútua para limitar acesso concorrente."),
    g("Condição de corrida", "Bug em que a ordem dos eventos concorrentes altera o resultado."),
    g("Deadlock", "Espera circular permanente entre tarefas e recursos."),
    g("Estado compartilhado", "Dados visíveis para mais de uma unidade de execução."),
    g("Bloqueio", "Situação em que uma tarefa precisa esperar um evento ou recurso para prosseguir."),
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
