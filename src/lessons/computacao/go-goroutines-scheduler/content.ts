import type { LessonContent } from "../../../types/content";

export const goGoroutinesSchedulerContent: LessonContent = {
  id: "go-goroutines-scheduler",
  title: "Go: Goroutines e Scheduler",
  subtitle:
    "Goroutines parecem leves porque o runtime faz muito trabalho por trás: multiplexa execução, redistribui filas, lida com bloqueios e preserva justiça sob pressão.",
  description:
    "Uma aula sobre como o scheduler de Go funciona em alto nível: goroutines, G-M-P, filas de execução, preempção, GOMAXPROCS, containers e ferramentas de diagnóstico.",
  primaryCategoryId: "computacao",
  secondaryCategoryId: "engenharia",
  level: "Intermediário",
  estimatedTime: "55-70 min",
  tags: [
    "Go",
    "Goroutines",
    "Scheduler",
    "GOMAXPROCS",
    "Preempção",
    "Runtime",
    "Concorrência",
  ],
  learningObjectives: [
    "Explicar por que goroutines são leves, mas não gratuitas.",
    "Entender o papel de Gs, Ms e Ps no runtime de Go.",
    "Relacionar filas, bloqueios e preempção à latência observada de serviços.",
    "Interpretar GOMAXPROCS como orçamento de paralelismo e não como simples sinônimo de 'mais rápido'.",
    "Usar ferramentas oficiais para investigar sintomas de scheduler em vez de adivinhar.",
  ],
  prerequisites: [
    "Conhecimento básico de threads, processos e concorrência.",
    "Contato prévio com a ideia de bloqueio por I/O e trabalho CPU-bound.",
    "Noções de como serviços concorrentes usam CPU e memória ajudam bastante.",
  ],
  references: [
    {
      title: "Container-aware GOMAXPROCS",
      source: "The Go Blog",
      url: "https://go.dev/blog/container-aware-gomaxprocs",
      note: "Post oficial que explica GOMAXPROCS como orçamento de paralelismo e sua relação com limites de CPU em containers.",
    },
    {
      title: "Go runtime: 4 years later",
      source: "The Go Blog",
      url: "https://go.dev/blog/go119runtime",
      note: "Resumo valioso de melhorias em preempção, scheduler, GC e latência no runtime recente.",
    },
    {
      title: "Go 1.14 is released",
      source: "The Go Blog",
      url: "https://go.dev/blog/go1.14",
      note: "Introduz a ideia de goroutines assincronamente preemptíveis como ponto importante de fairness.",
    },
    {
      title: "runtime/HACKING",
      source: "The Go Programming Language",
      url: "https://go.dev/src/runtime/HACKING",
      note: "Documento oficial do runtime que descreve Gs, Ms e Ps em nível conceitual.",
    },
    {
      title: "Diagnostics",
      source: "The Go Programming Language",
      url: "https://go.dev/doc/diagnostics",
      note: "Guia oficial para uso de trace, schedtrace, gctrace e perfis na investigação de problemas.",
    },
    {
      title: "Getting to Go: The Journey of Go's Garbage Collector",
      source: "The Go Blog",
      url: "https://go.dev/blog/ismmkeynote",
      note: "Explica a relação entre stacks de goroutines, safepoints e o funcionamento do runtime.",
    },
  ],
  heroVisual: "go-scheduler-hero",
  openingText:
    "Uma goroutine parece quase mágica para quem vem de threads do sistema operacional: você cria milhares, escreve código bloqueante e, mesmo assim, muita coisa continua funcionando. Mas o truque não é grátis nem invisível. Entre a sua chamada `go f()` e o trabalho real acontecer existe um scheduler sofisticado tentando casar goroutines, threads, direito de executar código Go e pressão de CPU do ambiente. Quando esse casamento vai bem, o programa parece simples e rápido. Quando vai mal, surgem filas de runnable goroutines, caudas de latência, throttling em containers e discussões intermináveis sobre GOMAXPROCS. Entender o scheduler não serve para decorar internals; serve para deixar de culpar 'o Go' de forma vaga e começar a ver o que o runtime está realmente tentando equilibrar.",
  quickFacts: [
    {
      title: "Goroutine é barata, não grátis",
      body: "Ela evita thread dedicada, mas ainda exige stack, bookkeeping e tempo de scheduler.",
    },
    {
      title: "GOMAXPROCS fala de paralelismo",
      body: "Ele limita quantas goroutines podem executar código Go ao mesmo tempo.",
    },
    {
      title: "Bloqueio não mata necessariamente o progresso",
      body: "O runtime tenta reaproveitar threads e Ps quando goroutines param em I/O, syscall ou sincronização.",
    },
    {
      title: "Trace vence palpite",
      body: "Scheduler e GC deixam sinais concretos para investigação oficial.",
    },
  ],
  sections: [
    s(
      "por-que-goroutines-parecem-leves",
      "Intuição",
      "Goroutines são leves porque não exigem uma thread por unidade de trabalho",
      "O runtime transforma threads em recurso compartilhado, o que barateia criação, bloqueio e retomada de muitas atividades concorrentes.",
      "go-scheduler-map",
      undefined,
      [
        "Uma implementação ingênua de concorrência poderia mapear cada goroutine para uma thread do sistema operacional. Isso herdaria custo alto de criação, pilha grande por padrão e dependência direta do escalonador do kernel para qualquer explosão de concorrência.",
        "Go escolhe outro caminho: uma goroutine representa trabalho lógico, não um compromisso fixo com uma thread. O runtime pode então mover esse trabalho entre threads conforme surgem bloqueios, despertadores, retornos de syscall e necessidade de fairness.",
        "Esse desacoplamento é o que torna natural escrever código com muitas atividades bloqueantes sem que o design inteiro desmorone em callbacks ou em pools manuais de threads. Ainda assim, a leveza vem de um runtime ativo, não de ausência de custo.",
      ],
      [
        {
          type: "definition",
          title: "Goroutine",
          body: "Unidade leve de execução gerenciada pelo runtime de Go, separada da noção de thread do sistema operacional.",
        },
        {
          type: "insight",
          title: "Leveza nasce de multiplexação",
          body: "Criar muitas goroutines é barato porque o runtime compartilha threads e pilhas de maneira dinâmica.",
        },
      ],
    ),
    s(
      "modelo-gmp",
      "Modelo",
      "Gs, Ms e Ps: o triângulo que organiza a execução",
      "O scheduler tenta casar trabalho, thread e direito de executar código Go de forma eficiente.",
      undefined,
      "go-scheduler-cycle-lab",
      [
        "A documentação oficial do runtime descreve três peças centrais. G é a goroutine, ou seja, o trabalho que queremos executar. M é a thread do sistema operacional em que esse trabalho pode rodar. P representa os recursos necessários para executar código Go, incluindo estado local importante para o scheduler e para o alocador.",
        "Não basta haver uma thread livre para rodar código Go: ela também precisa de um P. Por isso, o número de Ps ativos é tão importante. Ele modela o paralelismo disponível para o runtime. Em termos práticos, GOMAXPROCS controla exatamente quantos Ps existem.",
        "Esse desenho permite que uma thread que entre em syscall devolva seu P, deixando outra thread continuar executando goroutines Go. A separação evita que bloqueios do mundo externo congelem desnecessariamente o progresso do mundo Go.",
      ],
      [
        {
          type: "definition",
          title: "P no scheduler de Go",
          body: "Entidade lógica que representa o direito e os recursos de runtime necessários para executar código Go; existem exatamente GOMAXPROCS Ps.",
        },
        {
          type: "mistake",
          title: "Confundir goroutine com thread",
          body: "Uma goroutine é trabalho lógico. A thread é apenas um veículo momentâneo para executá-lo quando houver um P disponível.",
        },
      ],
    ),
    s(
      "filas-e-work-stealing",
      "Filas",
      "Run queues existem porque concorrência também é problema de distribuição",
      "Se muitas goroutines estão prontas ao mesmo tempo, o scheduler precisa decidir onde colocá-las e quem as rouba quando falta trabalho local.",
      undefined,
      undefined,
      [
        "Cada P mantém fila local de goroutines runnable, e o runtime ainda preserva uma fila global para certos casos. Isso melhora localidade e reduz contenção: nem toda decisão de escalonamento precisa disputar a mesma estrutura central.",
        "Quando um P fica sem trabalho, ele pode roubar goroutines de outro P. Essa ideia de work stealing ajuda a redistribuir carga e manter CPUs úteis sem exigir gerenciamento manual pelo programador.",
        "O detalhe importante para engenharia é simples: muitos runnable goroutines não significam progresso automático. Significam demanda por tempo de CPU e necessidade de distribuição. Se o workload é CPU-bound, essa fila é orçamento disputado, não throughput grátis.",
      ],
      [
        {
          type: "definition",
          title: "Runnable",
          body: "Estado da goroutine que está pronta para executar, mas ainda não está rodando naquele instante.",
        },
        {
          type: "example",
          title: "Explosão de goroutines CPU-bound",
          body: "Criar milhares de workers para poucas CPUs pode inflar filas de runnable goroutines sem aumentar trabalho útil concluído.",
        },
      ],
    ),
    s(
      "bloqueios-syscalls-e-stacks",
      "Bloqueio",
      "Bloqueio é parte normal do design do scheduler, não exceção",
      "Goroutines frequentemente param em I/O, timers, channels, mutexes e syscalls; o runtime foi desenhado para absorver isso bem.",
      undefined,
      undefined,
      [
        "Um dos poderes práticos de Go é deixar código de I/O parecer síncrono. Isso funciona porque, quando uma goroutine bloqueia, o runtime tenta liberar recursos para que outras continuem progredindo.",
        "A interação com syscalls é especialmente importante. Se uma thread entra no kernel e fica presa ali, o runtime não quer perder um P à toa. O desenho G-M-P torna possível devolver esse P e realocá-lo para outra thread capaz de seguir executando código Go.",
        "As stacks pequenas e gerenciadas dinamicamente das goroutines também ajudam nessa história. Elas diminuem o custo de manter muitas atividades vivas, embora ainda participem do orçamento de memória e do trabalho do runtime.",
      ],
      [
        {
          type: "insight",
          title: "Código bloqueante legível depende de runtime sofisticado",
          body: "A simplicidade da superfície de Go vem do fato de o runtime esconder a multiplexação, e não do fato de ela não existir.",
        },
      ],
    ),
    s(
      "preempcao-e-fairness",
      "Fairness",
      "Preempção importa porque nem toda goroutine cede por boa vontade",
      "Loops quentes, trabalho CPU-bound e pontos longos sem bloqueio exigem que o runtime proteja justiça e latência.",
      undefined,
      "go-scheduler-scenario-lab",
      [
        "Durante muito tempo, parte da justiça do scheduler dependia mais da própria estrutura do código: chamadas de função, bloqueios e pontos específicos ajudavam o runtime a trocar de contexto. Melhorias do runtime, destacadas em materiais oficiais de Go 1.14 e posteriores, reforçaram a capacidade de preempção para reduzir situações de starvation e aliviar latências.",
        "Isso importa especialmente porque GC, timers e requisições concorrentes precisam de oportunidade para avançar. Se uma goroutine CPU-bound ocupa demais o palco, o problema não é só throughput: a cauda de latência de outras atividades também sofre.",
        "A lição prática é não romantizar goroutines como se elas se organizassem sozinhas. O runtime trabalha duro para isso, e seus custos aparecem em tracing e tail latency.",
      ],
      [
        {
          type: "definition",
          title: "Preempção",
          body: "Interrupção controlada da execução corrente para permitir que outras goroutines ou tarefas do runtime avancem.",
        },
        {
          type: "mistake",
          title: "Achar que CPU-bound puro sempre escala só por usar goroutines",
          body: "Sem CPU disponível, goroutines apenas disputam turnos; o scheduler não fabrica paralelismo físico.",
        },
      ],
    ),
    s(
      "gomaxprocs",
      "Paralelismo",
      "GOMAXPROCS é um orçamento de paralelismo, não um turbo universal",
      "Ele define quantos Ps existem e, portanto, quantas goroutines podem executar código Go ao mesmo tempo.",
      undefined,
      "go-gomaxprocs-dial",
      [
        "O material oficial mais recente enfatiza um ponto importante: GOMAXPROCS fala sobre paralelo simultâneo disponível para o runtime, não apenas sobre 'quantos núcleos eu tenho'. Em uma máquina nua, usar o número de CPUs lógicas costuma ser um bom começo. Em container, isso pode ser enganoso se o limite de CPU real for menor.",
        "O post sobre GOMAXPROCS container-aware mostra por que oversubscription pode ferir latência. Se o processo acredita que pode usar muito mais CPU do que o ambiente realmente permite, o kernel pode aplicar throttling. E throttling em períodos fixos é uma ferramenta brusca, capaz de aumentar caudas muito além do que um simples multiplexing mais suave faria.",
        "Por isso, tuning de GOMAXPROCS não deve ser superstição. Ele precisa conversar com workload, ambiente de execução e sinais de trace e runtime.",
      ],
      [
        {
          type: "definition",
          title: "GOMAXPROCS",
          body: "Configuração que determina o máximo de threads usando Ps para executar goroutines ao mesmo tempo.",
        },
        {
          type: "example",
          title: "Container com limite apertado",
          body: "Se o processo enxerga uma máquina grande, mas o container só pode consumir uma fração dela, GOMAXPROCS excessivo pode introduzir ruído e throttling.",
        },
      ],
    ),
    s(
      "diagnostico-oficial",
      "Ferramentas",
      "Trace, schedtrace e perfis dão ao scheduler a chance de se explicar",
      "Sem observabilidade, quase todo sintoma concorrente vira mito ou achismo.",
      undefined,
      undefined,
      [
        "A documentação oficial de diagnostics recomenda um arsenal simples e poderoso. `go tool trace` ajuda a ver eventos de scheduler, syscalls, GC e utilização ao longo do tempo. `GODEBUG=schedtrace=X` resume periodicamente o estado do scheduler. Perfis e métricas completam o quadro.",
        "Essas ferramentas importam porque muitos sintomas se parecem na superfície. Alta latência pode vir de fila de runnable goroutines, de lock contention, de GC, de syscalls demoradas ou de throttling do ambiente. Sem traço temporal, tudo vira 'o Go travou'.",
        "Aprender scheduler, portanto, não é decorar internals; é ganhar um mapa melhor para interpretar evidências reais quando o serviço entra sob carga.",
      ],
      [
        {
          type: "example",
          title: "schedtrace",
          body: "O resumo periódico do scheduler ajuda a ver idleprocs, threads, spinning threads e fila global, oferecendo pistas úteis sobre gargalos.",
        },
      ],
    ),
    s(
      "sintese-pratica",
      "Síntese",
      "O scheduler funciona melhor quando o código coopera com o mundo físico onde roda",
      "Concorrência idiomática em Go combina simplicidade de escrita com respeito a CPU real, filas, bloqueios e limites do ambiente.",
      "go-scheduler-summary",
      undefined,
      [
        "Goroutines são uma ótima abstração porque deixam o programador pensar em trabalho lógico e não em threads como unidade principal. Mas a física não desaparece: CPUs são finitas, ambiente pode impor limites e o runtime continua precisando escolher quem roda agora.",
        "O melhor modelo mental é este: crie concorrência para modelar o problema, não para performar um ritual. Depois, use trace e perfis para ver se o scheduler está distribuindo bem esse problema dentro do orçamento real do sistema.",
        "Quando essa visão amadurece, GOMAXPROCS, preempção, filas e work stealing deixam de ser exotismos de runtime e passam a ser peças normais da engenharia de latência.",
      ],
      [
        {
          type: "insight",
          title: "Simplicidade do código não elimina complexidade do runtime",
          body: "Ela apenas desloca essa complexidade para um sistema especializado que, felizmente, também nos oferece ferramentas de diagnóstico.",
        },
      ],
    ),
    s(
      "quiz-revisao",
      "Revisão",
      "Quiz de revisão",
      "Cheque se G-M-P, filas, preempção, GOMAXPROCS e diagnóstico por evidência ficaram bem conectados.",
      undefined,
      "quiz",
      [
        "O alvo não é decorar siglas; é conseguir ler sintomas de concorrência e imaginar o que o runtime pode estar tentando equilibrar.",
      ],
      [],
    ),
    s(
      "glossario",
      "Glossário",
      "Termos essenciais",
      "Feche a aula consolidando o vocabulário do scheduler de Go.",
      undefined,
      "glossary",
      [
        "Esses termos serão reutilizados ao estudar channels, sync, GC, pprof e tracing em Go.",
      ],
      [],
    ),
  ],
  summaryCards: [
    {
      title: "Goroutines desacoplam trabalho de threads",
      body: "O runtime multiplexa execução e absorve bloqueios para manter o sistema útil.",
    },
    {
      title: "G, M e P têm papéis diferentes",
      body: "Entender essa separação esclarece syscalls, paralelismo e distribuição de carga.",
    },
    {
      title: "Fila runnable não é throughput grátis",
      body: "Ela pode representar demanda legítima ou simplesmente competição excessiva por CPU.",
    },
    {
      title: "Preempção protege fairness e latência",
      body: "Sem ela, loops quentes e trabalho CPU-bound podem degradar o resto do serviço.",
    },
    {
      title: "GOMAXPROCS depende do ambiente",
      body: "Especialmente em containers, paralelismo percebido e CPU efetivamente disponível podem divergir.",
    },
    {
      title: "Trace vence narrativa improvisada",
      body: "Diagnóstico sério de scheduler precisa de evidência temporal do runtime.",
    },
  ],
  quiz: [
    q(
      "q1",
      "Por que goroutines podem ser criadas em grande quantidade?",
      "Porque não exigem uma thread dedicada para cada unidade de trabalho.",
      "Porque sempre executam sem usar memória de stack.",
      "Porque o kernel as ignora completamente.",
      "a",
      "A leveza vem do desacoplamento entre trabalho lógico e threads do sistema operacional.",
    ),
    q(
      "q2",
      "No modelo G-M-P, o que representa o P?",
      "Os recursos e o direito de executar código Go, limitados por GOMAXPROCS.",
      "Uma goroutine estacionada aguardando I/O.",
      "Uma thread sempre ligada ao kernel.",
      "a",
      "P é peça central para entender por que GOMAXPROCS controla paralelismo real do runtime.",
    ),
    q(
      "q3",
      "O que significa uma goroutine estar runnable?",
      "Ela está pronta para executar, mas ainda não está rodando naquele instante.",
      "Ela terminou e aguarda GC.",
      "Ela está bloqueada em syscall.",
      "a",
      "Runnable não é o mesmo que running; ela ainda disputa uma oportunidade de CPU Go.",
    ),
    q(
      "q4",
      "Qual é o papel do work stealing?",
      "Redistribuir goroutines entre Ps quando alguns ficam sem trabalho local.",
      "Mover toda execução para a fila global sempre.",
      "Converter goroutines em syscalls.",
      "a",
      "Roubar trabalho ajuda a equilibrar carga e melhorar uso de CPU disponível.",
    ),
    q(
      "q5",
      "Por que preempção importa para latência?",
      "Porque impede que goroutines longas monopolizem demais a execução.",
      "Porque elimina a necessidade de filas de runnable goroutines.",
      "Porque transforma toda carga CPU-bound em I/O-bound.",
      "a",
      "Fairness do runtime protege progresso de outras tarefas e do próprio GC.",
    ),
    q(
      "q6",
      "Como interpretar GOMAXPROCS corretamente?",
      "Como orçamento de paralelismo para execução de código Go ao mesmo tempo.",
      "Como contagem obrigatória de goroutines ativas.",
      "Como garantia de que sempre haverá throughput máximo.",
      "a",
      "Ele limita Ps e, portanto, o paralelo simultâneo disponível ao runtime.",
    ),
    q(
      "q7",
      "Qual problema o post sobre GOMAXPROCS em containers destaca?",
      "Paralelismo configurado acima do limite efetivo pode causar throttling e piorar tail latency.",
      "Containers impedem totalmente o uso de goroutines.",
      "GOMAXPROCS só faz sentido fora de Kubernetes.",
      "a",
      "O ambiente pode permitir ver muitos CPUs lógicos, mas impor orçamento menor de CPU real.",
    ),
    q(
      "q8",
      "Qual é a melhor forma de investigar gargalos de scheduler?",
      "Usar trace, schedtrace, perfis e métricas do runtime.",
      "Aumentar GOMAXPROCS até o problema sumir.",
      "Trocar todo mutex por channel automaticamente.",
      "a",
      "O runtime oferece sinais específicos; tuning sem observabilidade tende a mover o problema sem explicá-lo.",
    ),
  ],
  glossary: [
    g("Goroutine", "Unidade leve de execução gerenciada pelo runtime de Go."),
    g("Scheduler", "Componente do runtime responsável por distribuir goroutines sobre threads e Ps."),
    g("G", "Abreviação informal para a goroutine no modelo interno do runtime."),
    g("M", "Thread do sistema operacional usada pelo runtime para executar trabalho."),
    g("P", "Entidade lógica com recursos e direito de executar código Go; existem GOMAXPROCS Ps."),
    g("Runnable", "Estado em que a goroutine está pronta para rodar, mas ainda não está executando."),
    g("Run queue", "Fila de goroutines prontas aguardando oportunidade de execução."),
    g("Work stealing", "Estratégia em que um P sem trabalho local rouba trabalho de outro P."),
    g("Preempção", "Interrupção controlada da execução corrente para preservar fairness e progresso global."),
    g("GOMAXPROCS", "Configuração que define o máximo de Ps ativos e, portanto, o paralelismo disponível."),
    g("Throttling", "Restrição brusca de CPU aplicada pelo ambiente, comum em containers com limite excedido."),
    g("Trace", "Registro temporal detalhado de eventos do runtime, útil para analisar scheduler, GC e syscalls."),
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
