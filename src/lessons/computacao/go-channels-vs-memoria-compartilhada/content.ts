import type { LessonContent } from "../../../types/content";

export const goChannelsVsMemoriaCompartilhadaContent: LessonContent = {
  id: "go-channels-vs-memoria-compartilhada",
  title: "Go: Channels vs Memória Compartilhada",
  subtitle:
    "A pergunta certa não é 'qual primitiva é mais Go?', mas 'qual mecanismo expressa melhor ownership, ordem e custo neste problema concorrente?'",
  description:
    "Uma aula sobre como escolher entre channels, mutexes e atomics em Go, conectando o lema 'share memory by communicating' ao memory model, ao race detector e ao pragmatismo oficial da linguagem.",
  primaryCategoryId: "computacao",
  secondaryCategoryId: "engenharia",
  level: "Intermediário",
  estimatedTime: "50-65 min",
  tags: [
    "Go",
    "Channels",
    "Mutex",
    "Atomic",
    "Memory model",
    "Concorrência",
    "Race detector",
  ],
  learningObjectives: [
    "Entender quando channels são excelentes para handoff de ownership e coordenação.",
    "Reconhecer quando mutexes expressam melhor proteção de estado compartilhado.",
    "Situar atomics como ferramenta de baixo nível e uso criterioso.",
    "Relacionar essas escolhas ao happens-before do memory model de Go.",
    "Usar a documentação oficial para decidir por semântica do problema, e não por slogan.",
  ],
  prerequisites: [
    "Noção básica de goroutines e sincronização concorrente.",
    "Curiosidade sobre data races, filas de trabalho e estado compartilhado.",
    "Conhecer o básico de Go ajuda, mas os conceitos são apresentados de forma conceitual.",
  ],
  references: [
    {
      title: "Share Memory By Communicating",
      source: "The Go Blog",
      url: "https://go.dev/blog/codelab-share",
      note: "Post clássico que formula o lema central de channels como meio de estruturar ownership e coordenação.",
    },
    {
      title: "Use a sync.Mutex or a channel?",
      source: "Go Wiki",
      url: "https://go.dev/wiki/MutexOrChannel",
      note: "Guia oficial pragmático: use a ferramenta mais expressiva e mais simples para o problema.",
    },
    {
      title: "The Go Memory Model",
      source: "The Go Programming Language",
      url: "https://go.dev/ref/mem",
      note: "Referência oficial sobre happens-before, operações sincronizantes e garantia DRF-SC.",
    },
    {
      title: "sync/atomic",
      source: "Go Packages",
      url: "https://pkg.go.dev/sync/atomic",
      note: "Documentação oficial que situa atomics como primitivas de baixo nível que exigem muito cuidado.",
    },
    {
      title: "Data Race Detector",
      source: "The Go Programming Language",
      url: "https://go.dev/doc/articles/race_detector",
      note: "Explica como detectar corridas em testes e quais garantias o memory model oferece.",
    },
    {
      title: "Effective Go: Channels",
      source: "The Go Programming Language",
      url: "https://go.dev/doc/effective_go#channels",
      note: "Complementa a intuição prática sobre comunicação entre goroutines.",
    },
  ],
  heroVisual: "go-coordination-hero",
  openingText:
    "O lema mais famoso de concorrência em Go é bonito, memorável e perigoso se for lido de forma religiosa: 'não compartilhe memória comunicando; compartilhe memória por comunicação'. O ponto do lema não é proibir memória compartilhada. É mostrar que muitos problemas ficam mais claros quando tratamos dados como algo que passa de mão em mão, em vez de algo que todo mundo toca ao mesmo tempo. Só que a própria documentação oficial de Go faz um contraponto importante: não tenha medo de usar `sync.Mutex` quando isso for mais simples. E não esqueça que `sync/atomic` existe para casos ainda mais finos. A maturidade aqui está em escolher a ferramenta pela relação entre ownership, ordem e custo, não pela vontade de parecer mais idiomático do que o problema pede.",
  quickFacts: [
    {
      title: "Channel comunica dado e ordem",
      body: "Ele é ótimo quando o problema parece handoff, pipeline ou resultado assíncrono.",
    },
    {
      title: "Mutex continua sendo ferramenta oficial",
      body: "Para caches e estado compartilhado, lock claro muitas vezes é a solução mais simples.",
    },
    {
      title: "Atomic não é atalho genérico",
      body: "Serve bem a coordenação enxuta e de baixo nível, mas exige muito cuidado.",
    },
    {
      title: "Memory model dá o chão formal",
      body: "Sem happens-before, código concorrente pode quebrar mesmo quando 'parece funcionar'.",
    },
  ],
  sections: [
    s(
      "slogan-e-realidade",
      "Lema",
      "O slogan de Go é direção, não dogma",
      "A frase sobre compartilhar memória por comunicação ajuda a pensar ownership, mas não substitui raciocínio sobre o tipo de estado que o sistema realmente tem.",
      "go-coordination-map",
      undefined,
      [
        "O post 'Share Memory By Communicating' contrasta dois estilos: um modelo com estruturas compartilhadas protegidas por lock e um modelo em que recursos circulam por channels. O ganho não é místico; é organizacional. O código tende a ficar mais focado no trabalho principal e menos em bookkeeping.",
        "Mas o próprio ecossistema de Go evita transformar isso em catecismo. A wiki oficial sobre mutex ou channel deixa claro que ambos resolvem muitos problemas e que a escolha deve privilegiar a opção mais expressiva e simples.",
        "Esse equilíbrio é essencial para não forçar pipelines onde existe, na verdade, uma estrutura central muito disputada que precisa apenas de proteção correta e legível.",
      ],
      [
        {
          type: "definition",
          title: "Share memory by communicating",
          body: "Princípio de estruturar concorrência transferindo ownership e coordenação por comunicação explícita entre goroutines.",
        },
        {
          type: "mistake",
          title: "Tratar slogan como veto absoluto a mutex",
          body: "O material oficial do Go é pragmático: locks continuam válidos e muitas vezes mais simples.",
        },
      ],
    ),
    s(
      "happens-before",
      "Base formal",
      "O memory model responde à pergunta: quando uma goroutine realmente vê o efeito da outra?",
      "Sem uma relação de sincronização, a leitura de estado concorrente pode ser incorreta mesmo quando os testes pequenos parecem passar.",
      undefined,
      undefined,
      [
        "O memory model de Go descreve as condições sob as quais uma leitura em uma goroutine pode observar a escrita feita por outra. A mensagem principal para a prática é esta: se um efeito precisa ser observado por outra goroutine, use mecanismo de sincronização para estabelecer ordem relativa.",
        "Channels, mutexes, atomics e algumas primitivas de sync criam relações de 'synchronizes before'. Essa ordem é o que dá chão para afirmar que determinado estado já foi publicado corretamente.",
        "Programas livres de data race recebem, na prática, a garantia DRF-SC: comportam-se como se houvesse uma interleaving sequencialmente consistente. Essa é uma recompensa enorme por escrever concorrência com sincronização explícita.",
      ],
      [
        {
          type: "definition",
          title: "Happens-before / synchronizes-before",
          body: "Relação de ordenação que garante visibilidade correta entre operações concorrentes conforme o memory model.",
        },
        {
          type: "insight",
          title: "Concorrência correta é também um problema de publicação",
          body: "Não basta atualizar o valor certo; é preciso publicá-lo por uma sincronização que torne essa atualização observável.",
        },
      ],
    ),
    s(
      "channels-e-ownership",
      "Comunicação",
      "Channels brilham quando o dado muda de mãos",
      "Eles funcionam muito bem quando o problema principal é passar trabalho, resultados ou autorização para continuar.",
      undefined,
      "go-ownership-flow-lab",
      [
        "Quando uma goroutine envia um valor ou uma referência por channel, ela não está apenas transferindo bytes. Ela está dizendo algo sobre o momento em que o próximo estágio pode agir e, muitas vezes, sobre quem passa a ter controle efetivo daquele item.",
        "Esse estilo reduz a necessidade de múltiplas goroutines tocarem a mesma estrutura viva ao mesmo tempo. Pipelines, filas de trabalho, pools de workers e coordenação de resultados se encaixam bem aqui.",
        "Outro benefício é que channels ajudam a tornar backpressure e cancelamento mais visíveis, especialmente quando combinados com `select` e `context`. O fluxo de dados e o fluxo de espera ficam próximos.",
      ],
      [
        {
          type: "example",
          title: "Fila de trabalho",
          body: "Um canal de jobs permite distribuir unidades independentes a workers sem expor a fila interna a vários escritores ao mesmo tempo.",
        },
        {
          type: "insight",
          title: "Canal é dado + sincronização",
          body: "O valor transferido importa, mas o momento da transferência também faz parte do contrato.",
        },
      ],
    ),
    s(
      "buffers-select-e-backpressure",
      "Fluxo",
      "Canal sem buffer, com buffer e `select` contam histórias diferentes",
      "Escolher o tipo de canal é também escolher como produtores e consumidores se influenciam no tempo.",
      undefined,
      undefined,
      [
        "Canal sem buffer exige rendezvous: envio e recebimento precisam se encontrar, o que torna a sincronização muito explícita. Canal com buffer introduz folga e pode desacoplar ritmos até certo ponto.",
        "Essa folga, porém, não é neutra. Buffer demais pode esconder pressão até o sistema estar carregado demais; buffer de menos pode serializar demais partes do fluxo que poderiam se sobrepor com segurança.",
        "O `select` adiciona outra camada importante: ele permite combinar múltiplos canais, timeouts e cancelamento em um mesmo ponto de decisão. Em serviços reais, isso é frequentemente mais valioso do que o canal isolado em si.",
      ],
      [
        {
          type: "definition",
          title: "Backpressure",
          body: "Capacidade de um sistema lento ou congestionado influenciar produtores para evitar crescimento descontrolado de trabalho pendente.",
        },
        {
          type: "mistake",
          title: "Usar buffer como anestesia",
          body: "Buffer resolve desacoplamentos reais, mas também pode apenas adiar a percepção de um gargalo estrutural.",
        },
      ],
    ),
    s(
      "mutex-e-estado-compartilhado",
      "Proteção",
      "Quando várias goroutines precisam tocar a mesma estrutura viva, mutex costuma ser o contrato mais direto",
      "Canais podem simular esse modelo, mas muitas vezes com mais indireção, mais goroutines e menos clareza.",
      undefined,
      "go-sync-choice-lab",
      [
        "Caches, mapas compartilhados, estruturas com invariantes locais e contadores compostos frequentemente pedem proteção de estado, não transferência de ownership. Nesses casos, um `sync.Mutex` bem posicionado pode ser a solução mais expressiva.",
        "A wiki oficial do Go é explícita: use o que for mais simples e mais expressivo. Isso é importante porque muitos iniciantes tentam transformar qualquer disputa de estado em uma goroutine 'dona' com canal, mesmo quando um lock curto e óbvio seria melhor.",
        "O ganho de um mutex claro está em tornar a invariância local mais fácil de enxergar. Quem entra na seção crítica sabe que está vendo e atualizando o estado compartilhado sob uma regra de exclusão mútua.",
      ],
      [
        {
          type: "definition",
          title: "Exclusão mútua",
          body: "Garantia de que apenas uma execução por vez acessa uma região crítica protegida.",
        },
        {
          type: "example",
          title: "Mapa compartilhado",
          body: "Uma estrutura central consultada e atualizada por muitas goroutines costuma ficar mais clara com mutex do que com channels forçados.",
        },
      ],
    ),
    s(
      "atomics",
      "Baixo nível",
      "Atomics servem para coordenação fina, não para fugir de desenho",
      "Eles são excelentes em flags, contadores e publicações simples, mas o custo mental sobe muito quando a regra de negócio depende de vários campos relacionados.",
      undefined,
      undefined,
      [
        "A documentação de `sync/atomic` é cautelosa por um bom motivo: operações atômicas são primitivas de baixo nível. Elas oferecem sincronização forte para casos pontuais, mas não substituem com elegância invariantes complexas distribuídas por várias variáveis.",
        "Em hot paths bem medidos, atomics podem evitar lock contention desnecessária. Mas seu uso correto exige raciocinar com precisão sobre visibilidade, ordem e composição de estado.",
        "Uma boa heurística é esta: se a estrutura da regra começou a exigir explicações longas para justificar o atomic, talvez um mutex ou outro desenho esteja comunicando melhor a intenção.",
      ],
      [
        {
          type: "definition",
          title: "Atomic",
          body: "Operação de sincronização indivisível, útil para comunicação de baixo nível entre goroutines.",
        },
        {
          type: "mistake",
          title: "Confundir 'lock-free' com 'simples' ou 'sempre mais rápido'",
          body: "Atomics evitam certos locks, mas podem aumentar muito a complexidade e não garantem melhor performance por padrão.",
        },
      ],
    ),
    s(
      "escolha-pragmatica",
      "Escolha",
      "A decisão madura combina semântica do problema, custo e observabilidade",
      "Não existe prêmio por usar a primitiva mais fashion; existe custo real quando o mecanismo não combina com a topologia do estado.",
      undefined,
      "go-coordination-dial",
      [
        "Se o dado deveria estar nas mãos de uma goroutine por vez, channels costumam brilhar. Se várias goroutines precisam olhar e atualizar o mesmo estado central, mutex frequentemente vence em clareza. Se o contrato é extremamente fino e medido, atomics podem entrar bem.",
        "Muitos sistemas reais usam uma composição desses mecanismos: channels para pipeline, mutex para cache local, atomics para métricas e flags, WaitGroup para coordenação de ciclo de vida.",
        "Essa mistura não é falta de pureza; é maturidade. O que importa é que a escolha preserve leitura, corretude e possibilidade de diagnóstico.",
      ],
      [
        {
          type: "insight",
          title: "Primitivas são complementares",
          body: "A própria wiki oficial do Go lembra que channels, mutexes e wait groups podem conviver sem contradição alguma.",
        },
      ],
    ),
    s(
      "race-detector",
      "Validação",
      "O race detector fecha o ciclo entre teoria e prática",
      "Mesmo com um bom modelo mental, a execução real continua sendo o melhor lugar para descobrir corridas que de fato acontecem.",
      "go-coordination-summary",
      undefined,
      [
        "O artigo oficial do race detector lembra que data races estão entre os bugs mais comuns e mais difíceis de depurar em sistemas concorrentes. A ferramenta não prova ausência absoluta de erro, porque depende dos caminhos executados, mas é extremamente útil para desmontar falsa confiança.",
        "Rodar testes com `-race` e, quando necessário, exercitar o binário sob carga realista aproxima seu raciocínio do comportamento concreto do programa. Isso é especialmente importante quando coordenação e publicação de estado parecem corretas no papel, mas falham em cantos menos óbvios.",
        "No fim, channels, mutexes e atomics só são boas escolhas quando seus efeitos podem ser defendidos tanto teoricamente quanto empiricamente.",
      ],
      [
        {
          type: "example",
          title: "go test -race",
          body: "A flag ativa instrumentação para capturar corridas observadas em tempo de execução e ajuda a validar o desenho concorrente.",
        },
      ],
    ),
    s(
      "quiz-revisao",
      "Revisão",
      "Quiz de revisão",
      "Confirme se ownership, happens-before, mutex, atomic e race detector ficaram conectados.",
      undefined,
      "quiz",
      [
        "A meta é saber escolher a primitiva pela semântica do problema, e não apenas recitar o lema famoso de Go.",
      ],
      [],
    ),
    s(
      "glossario",
      "Glossário",
      "Termos essenciais",
      "Feche a aula consolidando o vocabulário da concorrência pragmática em Go.",
      undefined,
      "glossary",
      [
        "Esses conceitos reaparecem em scheduler, context, sync, tracing e depuração de sistemas concorrentes.",
      ],
      [],
    ),
  ],
  summaryCards: [
    {
      title: "Channel é ótimo para handoff",
      body: "Ele combina transferência de dado com sincronização e organiza bem pipelines.",
    },
    {
      title: "Mutex é ótimo para estado vivo",
      body: "Quando várias goroutines precisam tocar a mesma estrutura, lock claro costuma vencer em simplicidade.",
    },
    {
      title: "Atomic pede parcimônia",
      body: "Excelente em casos finos e bem medidos; caro cognitivamente quando o contrato cresce.",
    },
    {
      title: "Memory model dá a regra formal",
      body: "A ordem entre goroutines precisa ser estabelecida por mecanismos sincronizantes reais.",
    },
    {
      title: "Race detector é aliado prático",
      body: "Ele ajuda a confrontar a teoria do desenho concorrente com a execução observada.",
    },
    {
      title: "Pragmatismo vence dogma",
      body: "A melhor escolha é a mais expressiva e simples para a topologia do problema.",
    },
  ],
  quiz: [
    q(
      "q1",
      "Qual leitura é mais fiel ao lema 'share memory by communicating'?",
      "Ele orienta um estilo útil, mas não proíbe mutex ou memória compartilhada.",
      "Ele significa que mutex é sempre erro de design em Go.",
      "Ele elimina a necessidade de pensar em ordenação entre goroutines.",
      "a",
      "O lema organiza ownership, mas a documentação oficial continua pragmática sobre locks.",
    ),
    q(
      "q2",
      "Quando channels costumam ser especialmente bons?",
      "Quando o problema principal é passar trabalho, resultados ou autorização entre etapas.",
      "Quando várias goroutines precisam editar o mesmo mapa o tempo todo.",
      "Quando queremos evitar qualquer forma de sincronização.",
      "a",
      "Handoff de ownership e pipelines são cenários clássicos para channels.",
    ),
    q(
      "q3",
      "O que o memory model ajuda a responder?",
      "Quando uma goroutine pode observar corretamente o efeito de outra.",
      "Quantas goroutines o scheduler cria por segundo.",
      "Qual tamanho de buffer usar em qualquer canal.",
      "a",
      "A base formal da concorrência correta em Go é visibilidade ordenada por sincronização.",
    ),
    q(
      "q4",
      "Qual afirmação sobre mutex é mais adequada?",
      "Ele frequentemente é a forma mais simples de proteger estado compartilhado vivo.",
      "Ele só deveria existir em código legado não idiomático.",
      "Ele sempre perde para channels em clareza.",
      "a",
      "A própria wiki oficial encoraja usar mutex quando ele for mais expressivo e simples.",
    ),
    q(
      "q5",
      "Qual risco existe ao usar buffers em canais?",
      "Eles podem esconder pressão ou gargalo estrutural se forem usados sem critério.",
      "Eles desativam o memory model.",
      "Eles tornam mutexes inseguros.",
      "a",
      "Buffer é ferramenta útil, mas também pode apenas postergar a percepção de congestionamento.",
    ),
    q(
      "q6",
      "Como pensar sobre atomics em Go?",
      "Como primitivas de baixo nível para coordenação fina e casos bem delimitados.",
      "Como substitutos universais de locks e channels.",
      "Como maneira de evitar qualquer custo mental em concorrência.",
      "a",
      "Atomics exigem cuidado alto e não substituem desenho de sincronização mais amplo.",
    ),
    q(
      "q7",
      "Qual combinação é comum em sistemas reais?",
      "Channels para fluxo, mutex para estado local e atomics para sinais simples.",
      "Apenas channels, para manter pureza idiomática.",
      "Apenas atomics, para manter tudo lock-free.",
      "a",
      "Misturar mecanismos compatíveis com o problema é maturidade, não incoerência.",
    ),
    q(
      "q8",
      "Para que serve o race detector?",
      "Para encontrar corridas que ocorrem na execução observada e validar o desenho concorrente.",
      "Para provar matematicamente que toda concorrência está correta.",
      "Para substituir o memory model.",
      "a",
      "Ele é ferramenta empírica muito valiosa, mas depende dos caminhos executados.",
    ),
  ],
  glossary: [
    g("Channel", "Primitiva de comunicação entre goroutines que também estabelece sincronização."),
    g("Ownership", "Forma de raciocinar sobre quem controla e pode mutar um dado em determinado momento."),
    g("Backpressure", "Capacidade de propagação de pressão de consumo para evitar acumular trabalho demais."),
    g("Mutex", "Primitiva de exclusão mútua para proteger regiões críticas e estado compartilhado."),
    g("Atomic", "Operação indivisível de sincronização, adequada a coordenação de baixo nível."),
    g("Memory model", "Conjunto de regras formais que define ordenação e visibilidade entre goroutines."),
    g("Synchronizes-before", "Relação de ordenação que garante visibilidade correta entre operações concorrentes."),
    g("Data race", "Acesso concorrente a uma variável com pelo menos uma escrita sem sincronização adequada."),
    g("DRF-SC", "Garantia de consistência sequencial para programas livres de data race."),
    g("Pipeline", "Estrutura concorrente em que trabalho passa por etapas conectadas, muitas vezes por channels."),
    g("Estado compartilhado", "Estrutura viva acessada por múltiplas goroutines ao longo do tempo."),
    g("Race detector", "Ferramenta de instrumentação em runtime para capturar corridas observadas."),
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
