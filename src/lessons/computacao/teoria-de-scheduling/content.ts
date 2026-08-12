import type { LessonContent } from "../../../types/content";

export const teoriaDeSchedulingContent: LessonContent = {
  id: "teoria-de-scheduling",
  title: "Teoria de Scheduling",
  subtitle:
    "Escalonar nao e apenas repartir CPU: e escolher quem espera, quem responde cedo e quem corre o risco de passar fome.",
  description:
    "Uma aula avancada sobre metricas de scheduling, politicas classicas, starvation, trade-offs entre latencia e throughput, afinidade em multicores e pontes conceituais para CFS/EEVDF e scheduler de goroutines.",
  primaryCategoryId: "computacao",
  secondaryCategoryId: "engenharia",
  level: "Avançado",
  estimatedTime: "50-65 min",
  tags: [
    "Scheduling",
    "Sistemas Operacionais",
    "Fairness",
    "Starvation",
    "Latencia",
    "Throughput",
    "CFS",
    "EEVDF",
    "Go",
  ],
  learningObjectives: [
    "Explicar por que scheduling sempre otimiza objetivos em tensao, e nao um unico numero magico.",
    "Distinguir turnaround, response time, waiting time, throughput e fairness em cenarios praticos.",
    "Comparar FIFO, SJF, Round Robin e prioridade a partir dos seus compromissos reais.",
    "Reconhecer starvation e entender por que mecanismos como aging existem.",
    "Relacionar mix de CPU e I/O, afinidade e migracao a decisoes modernas de scheduler.",
    "Usar CFS/EEVDF e o scheduler de Go como pontes conceituais, sem confundir politicas de processos com politicas de runtime.",
  ],
  prerequisites: [
    "Entender processos, threads e concorrencia ajuda a enxergar o que esta sendo escalonado.",
    "A aula de latencia versus throughput ajuda a interpretar por que otimizar media pode piorar experiencia interativa.",
    "Conhecer o scheduler de goroutines de Go e util para comparar scheduler de runtime com scheduler do kernel.",
  ],
  references: [
    {
      title: "Scheduling: Introduction",
      source: "Operating Systems: Three Easy Pieces",
      url: "https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched.pdf",
      note: "Capitulo classico sobre metricas, FIFO, SJF, STCF e Round Robin.",
    },
    {
      title: "Scheduling: The Multi-Level Feedback Queue",
      source: "Operating Systems: Three Easy Pieces",
      url: "https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched-mlfq.pdf",
      note: "Complementa a discussao sobre interatividade, prioridade e aproximacoes praticas.",
    },
    {
      title: "Multiprocessor Scheduling (Advanced)",
      source: "Operating Systems: Three Easy Pieces",
      url: "https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched-multi.pdf",
      note: "Base para falar de afinidade, filas por CPU e custos de migracao.",
    },
    {
      title: "CFS Scheduler",
      source: "Linux Kernel Documentation",
      url: "https://docs.kernel.org/scheduler/sched-design-CFS.html",
      note: "Documento oficial que apresenta o CFS como aproximacao de uma CPU multitarefa ideal via vruntime e aponta a transicao para EEVDF.",
    },
    {
      title: "EEVDF Scheduler",
      source: "Linux Kernel Documentation",
      url: "https://docs.kernel.org/scheduler/sched-eevdf.html",
      note: "Documento oficial do fair scheduler atual do Linux, sucessao conceitual do CFS com foco em elegibilidade e deadline virtual.",
    },
    {
      title: "runtime/HACKING",
      source: "The Go Programming Language",
      url: "https://go.dev/src/runtime/HACKING",
      note: "Documento oficial que descreve Gs, Ms, Ps e o ponto de vista do runtime sobre escalonamento.",
    },
    {
      title: "Go 1.14 is released",
      source: "The Go Blog",
      url: "https://go.dev/blog/go1.14",
      note: "Referencia oficial para a importancia da preempcao assincrona na justica entre goroutines.",
    },
  ],
  heroVisual: "scheduling-theory-hero",
  openingText:
    "Scheduling costuma ser apresentado como uma tabela de algoritmos, mas a intuicao importante e outra: toda politica responde a uma pergunta normativa. Quem deve correr agora? O job curto que melhora a media? A tarefa interativa que protege a sensacao de fluidez? O trabalho batch que quer throughput? O processo que ja esperou demais? Quando voce faz essa pergunta direito, percebe que escalonamento nao e um detalhe do kernel: e uma escolha de produto, de experiencia e de uso do hardware. O scheduler decide quem ganha o proximo pedaco de tempo, e esse pedaco de tempo muda filas, latencia, cauda, cache, justica e ate a historia que os graficos contam depois.",
  quickFacts: [
    {
      title: "Nao existe politica universal",
      body: "A mesma carga pode pedir respostas diferentes se a prioridade for interatividade, throughput ou fairness.",
    },
    {
      title: "Media boa pode esconder sofrimento",
      body: "Turnaround medio pequeno nao impede que uma tarefa especifica espere demais.",
    },
    {
      title: "Preempcao e uma decisao de produto",
      body: "Ela troca custo de troca de contexto por capacidade de resposta e protecao contra monopolio.",
    },
    {
      title: "Multicore nao apaga o problema",
      body: "Filas por CPU, afinidade e migracao adicionam novas escolhas ao scheduler.",
    },
  ],
  sections: [
    s(
      "escalonar-e-escolher-sob-conflito",
      "Problema",
      "Scheduling e a arte de escolher sob objetivos que brigam entre si",
      "O escalonador nao distribui tempo de forma neutra; ele materializa prioridades sobre quem responde primeiro, quem espera menos e quem usa melhor a maquina.",
      "scheduling-tension-map",
      undefined,
      [
        "Quando dizemos que uma CPU esta sendo compartilhada, o verbo importante nao e compartilhar: e escolher. Em cada instante, varias tarefas podem estar prontas, mas apenas algumas receberao tempo agora. O resto entra na fila e paga a conta da espera.",
        "Essa conta pode ser medida de jeitos diferentes. Um sistema interativo sofre quando o usuario clica e nada acontece. Um sistema batch sofre quando o conjunto de jobs demora para terminar. Um servidor sob carga pode aceitar throughput alto e, ainda assim, ter caudas de latencia ruins para usuarios especificos.",
        "Por isso, scheduling nao deve ser lido como uma lista de siglas. Ele e um problema de trade-offs: a politica boa depende do que voce esta tentando proteger.",
      ],
      [
        {
          type: "definition",
          title: "Politica de scheduling",
          body: "Regra usada para decidir qual tarefa pronta recebe o proximo intervalo de CPU.",
        },
        {
          type: "insight",
          title: "Todo scheduler explicita valores",
          body: "Ao favorecer uma metrica, a politica inevitavelmente piora alguma outra dimensao do sistema.",
        },
      ],
    ),
    s(
      "metricas-que-nao-andam-juntas",
      "Metricas",
      "Turnaround, response time e waiting time contam historias diferentes",
      "A mesma execucao pode parecer excelente por uma metrica e ruim por outra, o que explica muitas discussoes improdutivas sobre performance.",
      undefined,
      undefined,
      [
        "OSTEP usa um repertorio pequeno e poderoso de metricas. Turnaround time olha do envio ate a conclusao do job. Response time olha quanto demora para a primeira resposta util acontecer. Waiting time mede o periodo parado na fila. Throughput olha trabalho concluido por unidade de tempo. Fairness pergunta se a distribuicao do recurso esta equilibrada.",
        "Essas medidas importam porque cada uma seleciona um tipo de dor. Jobs batch sentem turnaround. Interfaces e servidores interativos sentem response time. Ambientes compartilhados sentem fairness. E times de infraestrutura quase sempre acabam discutindo throughput antes de perceber que o usuario experimenta outra coisa.",
        "Se a aula de latencia versus throughput ainda estiver fresca, este e o ponto de contato: otimizar a media do sistema nao garante boa experiencia para a ponta mais sensivel da distribuicao.",
      ],
      [
        {
          type: "definition",
          title: "Response time",
          body: "Tempo entre a chegada da tarefa e o primeiro sinal de progresso perceptivel.",
        },
        {
          type: "example",
          title: "Mesmo throughput, experiencia diferente",
          body: "Duas politicas podem concluir a mesma quantidade total de trabalho, mas uma delas pode deixar tarefas interativas esperando muito mais para comecar.",
        },
        {
          type: "mistake",
          title: "Confundir media com experiencia",
          body: "Uma media melhor pode mascarar caudas ruins e starvation localizado.",
        },
      ],
    ),
    s(
      "fifo-sjf-rr",
      "Politicas classicas",
      "FIFO, SJF e Round Robin sao respostas diferentes para a mesma fila",
      "As politicas basicas valem menos como receitas prontas e mais como modelos mentais para entender o que estamos priorizando.",
      undefined,
      "scheduling-policy-lab",
      [
        "FIFO e atraente por simplicidade: quem chegou primeiro roda primeiro. O problema e que um job longo cedo na fila empurra todos os outros para tras. OSTEP usa esse contraste justamente para mostrar por que simplicidade estrutural nao equivale a boa experiencia.",
        "SJF tenta terminar jobs curtos antes dos longos, melhorando turnaround medio quando o sistema consegue estimar tamanhos. A intuicao e forte, mas depende de informacao que raramente esta disponivel de maneira perfeita e pode sacrificar jobs grandes por muito tempo.",
        "Round Robin introduz preempcao para repartir CPU em fatias. Isso piora alguns custos medios, mas melhora a chance de uma tarefa interativa obter resposta cedo. A grande pergunta deixa de ser so quem termina primeiro e passa a ser quem fica invisivel por tempo demais.",
      ],
      [
        {
          type: "definition",
          title: "Preempcao",
          body: "Capacidade de interromper a tarefa atual para oferecer CPU a outra sem esperar termino voluntario.",
        },
        {
          type: "insight",
          title: "Round Robin compra responsividade",
          body: "Ele aceita mais trocas de contexto para reduzir o monopolio de tarefas longas.",
        },
      ],
    ),
    s(
      "latencia-vs-throughput",
      "Trade-off",
      "Boa vazao total nao significa boa sensacao de resposta",
      "A politica que deixa a media bonita pode piorar exatamente o fluxo que o usuario percebe como travamento.",
      undefined,
      undefined,
      [
        "Em workloads interativos, o valor pratico de uma primeira resposta cedo pode superar uma pequena perda de eficiencia agregada. Por isso sistemas de desktop, runtimes e servidores sensiveis a tail latency costumam aceitar mais sofisticacao de scheduling.",
        "Ja em lotes batch, a historia pode se inverter. Se o objetivo e terminar muitas tarefas sem urgencia individual, faz sentido preferir politicas que minimizam tempo total ou melhoram uso de cache, mesmo que a primeira resposta de cada job nao seja prioridade.",
        "Essa tensao explica por que benchmarking de scheduler sem declarar a metrica-alvo quase sempre confunde. Perguntar se uma politica e melhor sem perguntar para qual objetivo produz uma resposta vazia.",
      ],
      [
        {
          type: "example",
          title: "Desktop versus fila de processamento",
          body: "O usuario do desktop nota rapidamente um clique sem resposta; o operador de uma fila batch pode aceitar espera inicial se o lote inteiro terminar melhor.",
        },
        {
          type: "mistake",
          title: "Otimizar so a media",
          body: "Melhorar turnaround medio pode esconder picos de espera justamente nas tarefas mais sensiveis.",
        },
      ],
    ),
    s(
      "priority-starvation-aging",
      "Fairness",
      "Prioridade resolve urgencia local, mas pode criar starvation",
      "Dar preferencia continua a certos jobs e util, desde que o sistema aceite o custo de impedir que outros envelhecam indefinidamente na fila.",
      undefined,
      "scheduling-starvation-demo",
      [
        "Priority scheduling e sedutor porque parece expressar prioridade de negocio de modo direto: se algo e mais importante, rode antes. O problema aparece quando trabalho prioritario continua chegando. Nesse caso, um job de prioridade baixa pode esperar para sempre sem nunca se tornar tecnicamente incorreto dentro da politica.",
        "Esse fenomeno recebe o nome de starvation. A tarefa nao esta bloqueada por dependencia interna; ela esta faminta porque a regra de escolha sempre acha outro candidato mais urgente. Mecanismos como aging existem para reduzir esse risco, aumentando gradualmente a chance de quem esperou demais.",
        "A moral e forte para engenheiros: fairness nao e um luxo moralista. Ela protege previsibilidade operacional, evita invisibilidade sistematica e reduz surpresas politicas dentro da propria fila.",
      ],
      [
        {
          type: "definition",
          title: "Starvation",
          body: "Situacao em que uma tarefa continua pronta para executar, mas recebe CPU tarde demais ou nunca, por causa da politica escolhida.",
        },
        {
          type: "insight",
          title: "Aging e uma correcao de rota",
          body: "Ele tenta reintroduzir justica onde prioridade pura transformaria urgencia local em fome global.",
        },
      ],
    ),
    s(
      "work-conserving-cpu-io",
      "Carga mista",
      "Work-conserving, CPU-bound e I/O-bound mudam a leitura da fila",
      "Nem toda tarefa quer o mesmo tipo de tempo de CPU, e isso altera o significado de uma politica aparentemente identica.",
      undefined,
      undefined,
      [
        "Uma politica work-conserving tenta nao deixar CPU ociosa enquanto houver trabalho pronto. Em principio isso soa sempre correto, mas ainda falta perguntar que tipo de trabalho esta esperando. Tarefas I/O-bound costumam alternar pequenos bursts de CPU com longos periodos de espera externa; tarefas CPU-bound querem muitos intervalos de execucao sustentada.",
        "Quando esses mundos se misturam, o scheduler precisa evitar dois extremos ruins. Se favorecer demais os bursts curtos, pode fragmentar trabalho pesado sem necessidade. Se favorecer demais o job longo, a aplicacao interativa parece morta mesmo com uso de CPU aparentemente eficiente.",
        "Esse e outro ponto de ponte com a aula cpu-bound, io-bound e memory-bound: classificar a natureza da espera muda o diagnostico e tambem muda a politica mais saudavel.",
      ],
      [
        {
          type: "definition",
          title: "Work-conserving",
          body: "Politica que tenta manter o recurso ocupado sempre que houver tarefa pronta para usa-lo.",
        },
        {
          type: "example",
          title: "Burst curto de I/O",
          body: "Uma tarefa interativa pode precisar de poucos milissegundos de CPU agora para desbloquear muito tempo de espera percebida pelo usuario.",
        },
      ],
    ),
    s(
      "multicore-afinidade-migracao",
      "Multicore",
      "Com varios nucleos, o scheduler passa a equilibrar filas e preservar afinidade",
      "Distribuir trabalho entre CPUs melhora utilizacao, mas migrar demais tambem custa caro para caches e previsibilidade.",
      undefined,
      undefined,
      [
        "O capitulo avancado de multiprocessor scheduling do OSTEP deixa claro que o problema cresce com mais de um nucleo. Agora nao existe apenas a pergunta 'quem roda agora?', mas tambem 'em qual CPU essa tarefa deve rodar?'.",
        "Afinidade de cache importa porque uma tarefa que volta ao mesmo nucleo tende a reutilizar estado quente. Migracao ajuda a equilibrar filas, mas pode destruir localidade e aumentar custo indireto. Em outras palavras: justica global e locality local entram em tensao.",
        "Schedulers modernos, portanto, equilibram duas virtudes que nem sempre cooperam: manter todos os nucleos uteis e nao chacoalhar tarefas de um lado para outro sem motivo suficiente.",
      ],
      [
        {
          type: "definition",
          title: "Afinidade",
          body: "Tendencia de manter uma tarefa no mesmo nucleo para aproveitar caches e reduzir perturbacao.",
        },
        {
          type: "mistake",
          title: "Balancear demais",
          body: "Mover trabalho o tempo todo pode parecer justo no papel, mas piorar localidade e custo de execucao real.",
        },
      ],
    ),
    s(
      "pontes-cfs-go-e-escolha-de-objetivo",
      "Pratica moderna",
      "CFS, EEVDF, scheduler de Go e escolha de objetivo mostram a mesma licao em roupas diferentes",
      "Implementacoes reais variam muito, mas todas precisam explicitar o que tentam proteger quando distribuem tempo de execucao.",
      "scheduling-summary",
      "scheduling-goal-selector",
      [
        "A documentacao oficial do Linux apresenta o CFS como uma aproximacao de uma CPU multitarefa ideal. A intuicao do vruntime e simples: acompanhar quem recebeu menos tempo relativo e oferecer chance de recuperacao. A mesma documentacao deixa claro que o fair class moderno caminha para o EEVDF; o CFS continua util como modelo conceitual, nao como retrato completo do Linux atual.",
        "Ja o scheduler de Go vive em outro nivel de abstracao. Ele nao escolhe processos do sistema; escolhe goroutines sobre threads e Ps do runtime. Mesmo assim, o dilema persiste: throughput, latencia, bloqueios, preempcao e justica continuam em jogo, apenas com outras ferramentas e outra granularidade.",
        "O mapa final e este: scheduling bom nao e o que parece sofisticado, e sim o que casa a politica com o objetivo certo. Se voce sabe qual sofrimento quer evitar, as escolhas deixam de ser misticas e passam a ser engenharia.",
      ],
      [
        {
          type: "insight",
          title: "Politicas modernas sao compromissos explicitos",
          body: "CFS/EEVDF e scheduler de runtime diferem no mecanismo, mas ambos tornam visivel a luta entre fairness, localidade e responsividade.",
        },
        {
          type: "example",
          title: "Ponte com Go",
          body: "Preempcao em goroutines protege justica de runtime do mesmo modo que preempcao no kernel protege o resto do sistema contra monopolio.",
        },
      ],
    ),
    s(
      "quiz-revisao",
      "Revisao",
      "Quiz de revisao",
      "Cheque se metricas, starvation, multicore e os trade-offs centrais ficaram conectados.",
      undefined,
      "quiz",
      [
        "As perguntas abaixo priorizam cenarios e leitura operacional, nao decoracao de siglas.",
      ],
      [],
    ),
    s(
      "glossario",
      "Glossario",
      "Termos essenciais de scheduling",
      "Feche a aula consolidando o vocabulario que reaparece em sistemas operacionais, runtimes e discussao de latencia.",
      undefined,
      "glossary",
      [
        "Esses termos ajudam a ler OSTEP, documentacao do kernel e materiais de runtimes concorrentes com bem menos atrito.",
      ],
      [],
    ),
  ],
  quiz: [
    q(
      "q1",
      "Em um sistema interativo, por que Round Robin costuma ser lembrado mais pelo response time do que pelo turnaround medio?",
      "Porque ele reparte a CPU em fatias e aumenta a chance de cada tarefa comecar a rodar cedo.",
      "Porque ele elimina completamente custo de troca de contexto.",
      "Porque ele sempre termina jobs longos antes dos curtos.",
      "a",
      "Round Robin melhora a percepcao de resposta ao reduzir monopolio, mesmo aceitando mais overhead.",
    ),
    q(
      "q2",
      "Qual situacao descreve melhor starvation?",
      "Uma tarefa bloqueada esperando I/O terminar.",
      "Uma tarefa pronta que continua sendo adiada porque sempre aparece alguem com prioridade maior.",
      "Uma tarefa que terminou rapido demais.",
      "b",
      "Starvation e fome de CPU por regra de escolha, nao por dependencia interna da propria tarefa.",
    ),
    q(
      "q3",
      "Se o objetivo principal for reduzir turnaround medio de jobs curtos e o sistema conseguisse estimar duracoes bem, qual politica classica ganha atratividade?",
      "SJF",
      "FIFO",
      "Prioridade fixa sem aging",
      "a",
      "SJF nasceu exatamente desse impulso: terminar jobs curtos primeiro para melhorar medias agregadas.",
    ),
    q(
      "q4",
      "Por que otimizar somente throughput pode ser perigoso em um servico interativo?",
      "Porque throughput e inutil em qualquer contexto.",
      "Porque a politica pode concluir muito trabalho total e ainda deixar respostas individuais lentas demais.",
      "Porque throughput mede apenas uso de disco.",
      "b",
      "A vazao total nao garante boa experiencia para o usuario que espera a primeira resposta.",
    ),
    q(
      "q5",
      "O que o mecanismo de aging tenta corrigir?",
      "Excesso de uso de cache por tarefas curtas.",
      "Erro de parser no kernel.",
      "O risco de starvation criado por prioridade pura.",
      "c",
      "Aging reintroduz justica ao aumentar gradualmente a chance de quem esperou demais.",
    ),
    q(
      "q6",
      "Em ambiente multicore, por que afinidade pode ser valiosa?",
      "Porque manter a tarefa no mesmo nucleo pode preservar localidade de cache.",
      "Porque elimina a necessidade de qualquer fila.",
      "Porque impede preempcao.",
      "a",
      "Afinidade reduz perturbacao e pode aproveitar estado quente ja presente naquele nucleo.",
    ),
    q(
      "q7",
      "Qual leitura conceitual do CFS esta mais alinhada com a documentacao oficial?",
      "Ele modela uma CPU multitarefa ideal acompanhando quanto tempo relativo cada tarefa recebeu, e hoje serve principalmente como ponte para entender o fair class do Linux.",
      "Ele roda sempre o processo mais antigo.",
      "Ele evita qualquer forma de preempcao.",
      "a",
      "A intuicao do CFS parte de aproximar a justica de uma CPU ideal compartilhada; a documentacao atual tambem aponta a sucessao pelo EEVDF.",
    ),
    q(
      "q8",
      "Qual afirmacao conecta corretamente scheduler do kernel e scheduler de goroutines de Go?",
      "Sao a mesma camada do sistema e competem pelas mesmas filas.",
      "O primeiro escolhe processos e threads do sistema; o segundo escolhe goroutines dentro do runtime, mas ambos ainda lidam com justica e latencia.",
      "O scheduler de Go substitui o scheduler do Linux.",
      "b",
      "As camadas diferem, mas o conflito entre throughput, preempcao e fairness continua existindo.",
    ),
  ],
  glossary: [
    g("Scheduler", "Componente que decide qual tarefa pronta recebe CPU a seguir."),
    g("Turnaround time", "Tempo total entre a chegada do job e sua conclusao."),
    g("Response time", "Tempo ate a primeira resposta ou primeiro progresso perceptivel."),
    g("Waiting time", "Tempo acumulado em fila, sem executar."),
    g("Throughput", "Quantidade de trabalho concluido por unidade de tempo."),
    g("Fairness", "Grau de justica na distribuicao do recurso entre competidores."),
    g("FIFO", "Politica em que quem chega primeiro roda primeiro."),
    g("SJF", "Shortest Job First, politica que prioriza jobs curtos quando seu tamanho e conhecido ou estimado."),
    g("Round Robin", "Politica preemptiva que reparte CPU em fatias de tempo."),
    g("Starvation", "Fome de CPU causada por adiamento repetido de uma tarefa pronta."),
    g("Aging", "Tecnica que aumenta a prioridade de quem espera demais para reduzir starvation."),
    g("Afinidade", "Preferencia por manter uma tarefa no mesmo nucleo para aproveitar cache e reduzir migracao."),
    g("Migracao", "Movimento de uma tarefa de um nucleo para outro ao longo da execucao."),
    g("vruntime", "Medida usada no fair scheduling do Linux para aproximar quanto tempo relativo cada tarefa recebeu; e central na intuicao do CFS e permanece na linhagem do EEVDF."),
    g("EEVDF", "Earliest Eligible Virtual Deadline First, politica do fair class moderno do Linux que sucede o CFS na selecao de tarefas elegiveis."),
  ],
  relatedTopics: [
    {
      title: "Latencia vs Throughput",
      body: "Reforce a diferenca entre media agregada e experiencia percebida por requisicao.",
    },
    {
      title: "Go: Goroutines e Scheduler",
      body: "Compare a politica do runtime de Go com a politica do kernel sem misturar as camadas.",
    },
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
