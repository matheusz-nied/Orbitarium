import type { LessonContent } from "../../../types/content";

export const goGcELatenciaContent: LessonContent = {
  id: "go-gc-e-latencia",
  title: "Go: GC e Latência",
  subtitle:
    "O coletor de Go foi desenhado para baixa latência, mas o custo real do gerenciamento de memória aparece como uma conversa contínua entre alocação, orçamento de heap, CPU e observabilidade.",
  description:
    "Uma aula avançada sobre GC em Go: mark-sweep concorrente, write barrier, GOGC, memory limit, pressão de alocação, GC thrashing e como diagnosticar latência sem transformar o coletor em bode expiatório.",
  primaryCategoryId: "computacao",
  secondaryCategoryId: "engenharia",
  level: "Avançado",
  estimatedTime: "60-75 min",
  tags: [
    "Go",
    "GC",
    "Latência",
    "GOGC",
    "GOMEMLIMIT",
    "Runtime",
    "Performance",
  ],
  learningObjectives: [
    "Entender o GC de Go como um mecanismo de orçamento entre memória e CPU.",
    "Explicar o básico do collector concorrente mark-sweep e do papel da write barrier.",
    "Reconhecer por que latência de GC não se resume a pausas stop-the-world.",
    "Relacionar GOGC e memory limit aos trade-offs de throughput, memória e cauda.",
    "Usar ferramentas oficiais de diagnóstico para investigar pressão de heap com mais precisão.",
  ],
  prerequisites: [
    "Familiaridade com conceitos gerais de coleta de lixo e alocação dinâmica.",
    "Noções de scheduler, heap e escape analysis em Go ajudam bastante.",
    "Interesse por latência e comportamento de runtime sob carga real.",
  ],
  references: [
    {
      title: "Go GC: Prioritizing low latency and simplicity",
      source: "The Go Blog",
      url: "https://go.dev/blog/go15gc",
      note: "Post oficial que apresenta a direção de baixa latência e o collector concorrente tri-color mark-sweep.",
    },
    {
      title: "Go runtime: 4 years later",
      source: "The Go Blog",
      url: "https://go.dev/blog/go119runtime",
      note: "Resume melhorias recentes do runtime, incluindo preempção, scheduler, GC e memory limit.",
    },
    {
      title: "A Guide to the Go Garbage Collector",
      source: "The Go Programming Language",
      url: "https://go.dev/doc/gc-guide",
      note: "Guia oficial mais detalhado para custos do GC, tuning de GOGC e análise de alocação.",
    },
    {
      title: "Getting to Go: The Journey of Go's Garbage Collector",
      source: "The Go Blog",
      url: "https://go.dev/blog/ismmkeynote",
      note: "Oferece contexto histórico e estratégico sobre a evolução do GC e sua relação com stacks e escape analysis.",
    },
    {
      title: "Diagnostics",
      source: "The Go Programming Language",
      url: "https://go.dev/doc/diagnostics",
      note: "Reúne ferramentas oficiais como gctrace, trace e perfis úteis para diagnosticar latência.",
    },
    {
      title: "runtime package",
      source: "Go Packages",
      url: "https://pkg.go.dev/runtime",
      note: "Documentação oficial para GOGC e outras chaves de runtime relacionadas ao GC.",
    },
  ],
  heroVisual: "go-gc-hero",
  openingText:
    "Falar de GC em sistemas de baixa latência costuma produzir dois erros simétricos. O primeiro é tratá-lo como vilão absoluto: qualquer cauda ruim vira culpa do coletor. O segundo é tratá-lo como problema já resolvido: basta confiar no runtime e seguir. O material oficial de Go aponta um caminho mais interessante. O GC foi desenhado para privilegiar baixa latência e simplicidade de tuning, mas isso não elimina trade-offs. Quanto mais memória você permite, menos frequentemente coleta; quanto menos memória você permite, mais cedo e mais agressivamente o runtime precisa trabalhar. Além disso, o custo não aparece apenas em pausas explícitas. Ele também surge como write barriers, trabalho de marcação concorrente, assistências do mutator, pressão de alocação e mudanças de comportamento quando o ambiente impõe limites. Aprender GC em Go é aprender a enxergar esse orçamento completo.",
  quickFacts: [
    {
      title: "O GC de Go é concorrente",
      body: "Grande parte do trabalho acontece enquanto a aplicação continua rodando.",
    },
    {
      title: "Latência não é só pausa",
      body: "Assistências, alocação, write barriers e pressão de heap também entram na conta.",
    },
    {
      title: "GOGC troca memória por CPU",
      body: "Mais folga de heap costuma reduzir frequência de coleta; menos folga força trabalho mais cedo.",
    },
    {
      title: "Memory limit protege, mas pode apertar demais",
      body: "Se o orçamento for irrealista, o runtime pode gastar esforço excessivo só tentando sobreviver.",
    },
  ],
  sections: [
    s(
      "mentalidade-certa",
      "Modelo",
      "O GC é um gerenciador de orçamento, não apenas um coletor de lixo",
      "Ele tenta equilibrar memória, CPU e responsividade dentro das restrições do programa e do ambiente.",
      "go-gc-map",
      undefined,
      [
        "No guia oficial do GC, a primeira grande mudança de mentalidade é esta: o custo relevante não é 'ter GC', mas como o programa produz memória e quanto orçamento o runtime recebe para reciclar essa memória com eficiência.",
        "Se a aplicação aloca pouco e com boa localidade temporal, o coletor tende a ser apenas pano de fundo. Se aloca muito, espalha objetos pela heap e opera em ambiente de memória apertada, o GC deixa de ser figurante e vira parte central da latência observada.",
        "Isso desloca a conversa de opiniões abstratas sobre linguagens para decisões concretas sobre throughput, footprint de memória e comportamento em carga.",
      ],
      [
        {
          type: "definition",
          title: "Orçamento de GC",
          body: "Forma de raciocinar sobre quanto trabalho de coleta, quanto uso de memória e quanta CPU a aplicação pode pagar para se manter saudável.",
        },
        {
          type: "insight",
          title: "O vilão quase nunca é o coletor isolado",
          body: "Com frequência, a raiz do problema é a taxa de alocação ou um limite operacional incompatível com essa taxa.",
        },
      ],
    ),
    s(
      "mark-sweep-concorrente",
      "Mecanismo",
      "O GC de Go segue a linha mark-sweep concorrente com write barrier",
      "A ideia central é descobrir o que continua vivo sem depender de pausas longas para fazer todo o trabalho.",
      undefined,
      "go-gc-cycle-lab",
      [
        "O post do Go 1.5 apresenta a direção estratégica do collector: baixa latência e simplicidade de tuning. O mecanismo descrito é um collector concorrente, tri-color, mark-sweep. Em alto nível, ele marca objetos alcançáveis e depois recicla o restante.",
        "Como o programa continua executando enquanto a marcação acontece, o runtime precisa garantir que não perderá ponteiros novos ou recém-atualizados. É aí que entra a write barrier: ela ajuda a preservar as invariantes que tornam a coleta concorrente segura.",
        "O ponto importante para a prática é que mark e sweep são fases com naturezas diferentes, e que o custo total do GC se distribui ao longo do tempo. Pensar apenas em 'pausa' empobrece demais o diagnóstico.",
      ],
      [
        {
          type: "definition",
          title: "Write barrier",
          body: "Mecanismo acionado em certas atualizações de ponteiro para manter as invariantes necessárias à coleta concorrente.",
        },
        {
          type: "definition",
          title: "Mark-sweep",
          body: "Estratégia em que o GC primeiro identifica o que está vivo e depois recicla o que não foi marcado como alcançável.",
        },
      ],
    ),
    s(
      "latencia-nao-e-so-pausa",
      "Latência",
      "A maior parte da dor prática costuma vir do trabalho distribuído, não de uma pausa isolada",
      "GC assist, barreiras, pressão de alocação e scans de raízes podem aparecer como cauda ruim mesmo quando a pausa explícita não parece dramática.",
      undefined,
      undefined,
      [
        "Quando uma aplicação sofre sob pressão de memória, parte do custo aparece em caminhos que o programador não vê diretamente em uma linha de código: assistência do mutator ao trabalho de marcação, maior frequência de ciclos, mais scanning de estruturas e mais custo por objeto produzido.",
        "Isso ajuda a entender por que duas aplicações com o mesmo 'tipo de GC' podem se comportar de forma tão diferente. Não basta saber o algoritmo; é preciso observar volume de alocação, formato dos objetos, stacks ativas e o ritmo imposto pelo ambiente.",
        "Uma consequência didática importante é esta: latência atribuída ao GC pode ser, na verdade, sintoma de desenho de alocação ou de configuração de memória incompatível com a carga.",
      ],
      [
        {
          type: "insight",
          title: "Pausa curta não encerra o diagnóstico",
          body: "Mesmo quando o stop-the-world parece pequeno, o resto do ciclo pode estar cobrando juros no throughput e na cauda.",
        },
      ],
    ),
    s(
      "gogc",
      "Tuning",
      "GOGC controla o trade-off entre memória extra e trabalho de coleta",
      "Mais folga de heap tende a reduzir frequência de coleta; menos folga tende a aumentar trabalho mais cedo.",
      undefined,
      "go-gc-tradeoff-dial",
      [
        "O post do Go 1.5 e a documentação de runtime insistem em uma filosofia importante: o Go prefere poucos knobs. GOGC é o principal deles, e sua função é mover a balança entre overhead de memória e overhead de CPU do GC.",
        "Quando o valor favorece mais memória, o runtime pode deixar a heap crescer mais antes de iniciar novo ciclo. Quando favorece menos memória, ele precisa agir antes, o que preserva footprint ao preço de mais atividade de coleta.",
        "Essa troca não tem resposta universal. O melhor ponto depende do tipo de carga, do ambiente, dos objetivos de latência e do quanto de memória a aplicação realmente pode usar sem risco operacional.",
      ],
      [
        {
          type: "definition",
          title: "GOGC",
          body: "Principal parâmetro de tuning do GC em Go, usado para ajustar o trade-off entre uso de memória e trabalho de coleta.",
        },
        {
          type: "mistake",
          title: "Buscar um valor mágico de GOGC",
          body: "O ponto certo depende de workload, limites do ambiente e objetivos de operação, não de superstição replicada entre projetos.",
        },
      ],
    ),
    s(
      "memory-limit",
      "Orçamento",
      "Memory limit amplia robustez, mas também pode apertar demais a aplicação",
      "Em ambientes com memória limitada, o runtime precisa saber o teto disponível para reagir melhor a picos e evitar surpresas.",
      undefined,
      "go-gc-pressure-scenarios",
      [
        "O post 'Go runtime: 4 years later' explica por que o runtime ganhou um soft memory limit. Só GOGC não basta quando a aplicação vive dentro de um orçamento concreto de memória, especialmente em containers.",
        "Com um limite bem escolhido, o runtime pode trabalhar de forma mais informada sob pressão. Porém, se esse teto fica apertado demais para a realidade da carga, o programa pode passar tempo demais coletando e tempo de menos fazendo trabalho útil. É o cenário chamado de GC thrashing.",
        "Essa observação é valiosa porque mostra que tuning de memória é inseparável do ambiente. Não adianta falar em latência sem falar em cgroup, reserva de memória, picos de uso e políticas operacionais do deployment.",
      ],
      [
        {
          type: "definition",
          title: "Soft memory limit",
          body: "Limite de memória informado ao runtime para guiá-lo sob pressão, sem ser tratado como um simples número abstrato de heap.",
        },
        {
          type: "mistake",
          title: "Achar que limite mais baixo é sempre mais eficiente",
          body: "Se o orçamento não comporta a carga real, o runtime pode entrar em modo de sobrevivência e piorar throughput e latência.",
        },
      ],
    ),
    s(
      "reduzir-pressao",
      "Projeto",
      "O jeito mais confiável de aliviar GC é produzir menos pressão desnecessária",
      "Escape analysis, reuse criterioso, estruturas apropriadas e batching costumam ajudar mais do que tuning cego.",
      undefined,
      undefined,
      [
        "O próprio material oficial do Go conecta escape analysis e desempenho do GC. Quanto menos objetos desnecessários chegam à heap, menor o universo a ser rastreado e menor a frequência com que o runtime precisa agir agressivamente.",
        "Isso não significa perseguir zero alocações. Significa distinguir alocações inevitáveis daquelas criadas por desenhos descuidados, cópias transitórias excessivas, interfaces quentes demais ou pipelines que produzem lixo estrutural sem necessidade.",
        "Em muitos casos, uma pequena melhoria no desenho do hot path reduz mais latência do que ajustes nervosos de parâmetros de runtime.",
      ],
      [
        {
          type: "example",
          title: "Reduzir escapes em caminho quente",
          body: "Se um valor não precisa sobreviver, permitir que ele fique na stack reduz trabalho de heap e, por tabela, do GC.",
        },
      ],
    ),
    s(
      "diagnosticar",
      "Ferramentas",
      "gctrace, runtime/metrics, trace e perfis transformam suspeita em evidência",
      "A observabilidade oficial do runtime ajuda a separar problema de GC, problema de scheduler e problema de ambiente.",
      undefined,
      undefined,
      [
        "A página de diagnostics do Go reúne as principais ferramentas: `GODEBUG=gctrace=1` para eventos de coleta, `runtime/metrics` para sinais mais granulares, `go tool trace` para ver scheduler e GC no tempo, além de perfis de heap e CPU.",
        "Esses instrumentos importam porque latência ruim pode vir de muitas fontes vizinhas. Um serviço pode culpar o GC quando o problema real é throttling, lock contention ou explosão de goroutines runnable.",
        "Somente quando combinamos métricas de heap, ritmo de coleta, sinais de CPU e traços temporais é que tuning de GC passa a ser engenharia e deixa de ser ritual.",
      ],
      [
        {
          type: "example",
          title: "`GODEBUG=gctrace=1`",
          body: "A saída do runtime ajuda a enxergar quando os ciclos acontecem e como a aplicação está se comportando sob pressão de memória.",
        },
        {
          type: "insight",
          title: "GC precisa de contexto temporal",
          body: "Olhar apenas um contador isolado raramente basta; é preciso ver como alocação, CPU e coleta evoluem juntos.",
        },
      ],
    ),
    s(
      "sintese",
      "Síntese",
      "Baixa latência em Go nasce de alocação disciplinada, orçamento realista e leitura correta do runtime",
      "O collector ajuda muito, mas ele não desfaz escolhas ruins de desenho nem limites impossíveis de cumprir.",
      "go-gc-summary",
      undefined,
      [
        "A literatura oficial de Go sobre GC é valiosa justamente por evitar triunfalismo. Ela não promete custo zero; promete uma direção de design focada em baixa latência e poucos knobs, com melhorias contínuas do runtime ao longo das releases.",
        "Para quem opera serviços, a grande lição é esta: GC bom é GC compreendido. Isso significa entender a mecânica básica, saber qual trade-off GOGC move, tratar memory limit como parte do deployment e observar a taxa de alocação como primeiro-class citizen da latência.",
        "Quando essas peças se encaixam, o coletor deixa de ser um fantasma genérico e vira apenas mais um subsistema importante do orçamento de performance.",
      ],
      [
        {
          type: "insight",
          title: "O melhor tuning começa no código e termina no ambiente",
          body: "Heap, scheduler, limites do container e desenho de alocação formam um sistema só; otimizar uma peça isoladamente raramente basta.",
        },
      ],
    ),
    s(
      "quiz-revisao",
      "Revisão",
      "Quiz de revisão",
      "Confirme se collector concorrente, write barrier, GOGC, memory limit e diagnóstico por evidência ficaram conectados.",
      undefined,
      "quiz",
      [
        "O objetivo não é decorar internals exóticos, e sim construir critério para interpretar latência e pressão de memória em aplicações Go.",
      ],
      [],
    ),
    s(
      "glossario",
      "Glossário",
      "Termos essenciais",
      "Feche a aula consolidando o vocabulário de GC e latência em Go.",
      undefined,
      "glossary",
      [
        "Esses termos retornam em tuning, observabilidade, profiling e discussões de custo em produção.",
      ],
      [],
    ),
  ],
  summaryCards: [
    {
      title: "GC é orçamento contínuo",
      body: "Ele distribui custo entre memória disponível, CPU de coleta e latência percebida.",
    },
    {
      title: "Coleta concorrente ajuda muito",
      body: "Mas write barriers, assist e alocação ainda compõem o custo total observado.",
    },
    {
      title: "GOGC move a balança principal",
      body: "Mais heap geralmente compra menos coleta frequente; menos heap compra menor footprint e mais trabalho cedo.",
    },
    {
      title: "Memory limit precisa ser realista",
      body: "Ele aumenta robustez, mas pode empurrar a aplicação para thrashing se o orçamento for irreal.",
    },
    {
      title: "Alocação excessiva é fonte central de pressão",
      body: "Reduzir heap acidental costuma aliviar o GC de forma mais estrutural que tuning cego.",
    },
    {
      title: "Diagnóstico sério usa ferramentas do runtime",
      body: "gctrace, metrics, trace e perfis ajudam a separar hipóteses de evidência.",
    },
  ],
  quiz: [
    q(
      "q1",
      "Qual leitura é mais correta sobre GC em Go?",
      "Ele gerencia um orçamento entre memória, CPU e latência, não apenas 'apaga lixo'.",
      "Ele só importa quando há stop-the-world longo.",
      "Ele é irrelevante se o programa usa goroutines.",
      "a",
      "O custo real do GC aparece em várias dimensões, não apenas em pausas explícitas.",
    ),
    q(
      "q2",
      "O que caracteriza, em alto nível, o GC moderno de Go?",
      "Um collector concorrente mark-sweep apoiado por write barrier.",
      "Um collector puramente manual controlado pelo usuário.",
      "Um sistema sem qualquer relação com o runtime.",
      "a",
      "Esse é o modelo descrito no material oficial sobre a evolução do GC de Go.",
    ),
    q(
      "q3",
      "Por que latência de GC não se resume a pausas?",
      "Porque parte do custo aparece como trabalho distribuído em marcação, barriers, assists e pressão de alocação.",
      "Porque pausas não existem em Go.",
      "Porque heap não afeta CPU.",
      "a",
      "A cauda pode piorar mesmo sem uma pausa dramática visível em isolamento.",
    ),
    q(
      "q4",
      "O que GOGC ajusta conceitualmente?",
      "O trade-off entre overhead de memória e trabalho de coleta.",
      "O número de goroutines que o programa pode criar.",
      "A semântica do memory model.",
      "a",
      "Esse knob move a balança principal de tuning do GC em Go.",
    ),
    q(
      "q5",
      "Quando o memory limit pode prejudicar a aplicação?",
      "Quando o orçamento informado é apertado demais para a carga real e força trabalho excessivo de GC.",
      "Quando a aplicação aloca pouco.",
      "Quando o programa não usa channels.",
      "a",
      "Limite realista ajuda; limite irreal pode empurrar o programa para thrashing.",
    ),
    q(
      "q6",
      "Qual caminho costuma aliviar GC de modo mais estrutural?",
      "Reduzir pressão de heap desnecessária no hot path.",
      "Trocar toda interface por reflexão.",
      "Aumentar buffers aleatoriamente em todas as filas.",
      "a",
      "Menos objetos desnecessários na heap normalmente significam menos trabalho recorrente do runtime.",
    ),
    q(
      "q7",
      "Qual ferramenta oficial ajuda a ver eventos de coleta em tempo de execução?",
      "`GODEBUG=gctrace=1`.",
      "`go fmt`.",
      "`go clean`.",
      "a",
      "gctrace é uma das ferramentas oficiais para começar a observar ciclos de GC.",
    ),
    q(
      "q8",
      "Qual conclusão é mais madura sobre tuning de GC?",
      "Ele precisa combinar desenho de alocação, limites do ambiente e observabilidade do runtime.",
      "Basta escolher um valor universal de GOGC encontrado em blog post.",
      "Depois do collector concorrente, tuning nunca mais importa.",
      "a",
      "GC saudável depende do encontro entre código, workload e ambiente operacional.",
    ),
  ],
  glossary: [
    g("GC", "Garbage collector; sistema de reciclagem automática de memória do runtime."),
    g("Mark-sweep", "Estratégia de coleta que primeiro identifica o que está vivo e depois recicla o resto."),
    g("Write barrier", "Mecanismo usado para preservar invariantes durante coleta concorrente."),
    g("Mutator", "Nome dado à aplicação enquanto ela executa e aloca memória em paralelo ao GC."),
    g("GC assist", "Situação em que trabalho do programa ajuda a pagar parte do custo de marcação do collector."),
    g("GOGC", "Knob principal do runtime para ajustar o trade-off entre memória e trabalho de GC."),
    g("Soft memory limit", "Limite informado ao runtime para guiá-lo sob pressão de memória."),
    g("GC thrashing", "Estado em que o programa gasta esforço excessivo em coleta e pouco em trabalho útil."),
    g("Heap pressure", "Nível de demanda que a aplicação impõe à heap por alocação e retenção."),
    g("gctrace", "Saída de diagnóstico do runtime para eventos de coleta de lixo."),
    g("runtime/metrics", "API oficial de métricas do runtime para observação mais granular."),
    g("Tail latency", "Comportamento das respostas mais lentas, sensível a bursts, pressão de memória e contenção."),
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
