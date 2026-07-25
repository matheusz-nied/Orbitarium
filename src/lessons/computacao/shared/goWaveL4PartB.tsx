import type { LessonContent, LessonModule } from "../../../types/content";
import { buildComputacaoInteractions, buildComputacaoVisuals } from "./lessonFactory";

export const goSyncAtomicMutexVisuals = buildComputacaoVisuals({
  hero: {
    id: "go-sync-atomic-mutex-hero",
    title: "Go: sync, Atomic e Mutex",
    subtitle: "Como proteger estado compartilhado sem transformar concorrência em loteria.",
    chips: ["mutex", "atomic", "data race", "visibilidade", "contenção"],
  },
  map: {
    id: "go-sync-atomic-mutex-map",
    title: "De acesso concorrente a estado consistente",
    items: [
      { label: "Goroutines", detail: "trabalho simultâneo" },
      { label: "Estado", detail: "mapa, fila, cache" },
      { label: "Sincronização", detail: "coordena acesso" },
      { label: "Visibilidade", detail: "quem enxerga o quê" },
      { label: "Progresso", detail: "sem travar tudo" },
    ],
    caption: "concorrência correta depende de exclusão, ordenação e desenho de acesso",
  },
  summary: {
    id: "go-sync-atomic-mutex-summary",
    title: "Três perguntas antes de escolher a primitiva",
    panels: [
      {
        label: "Existe estado realmente compartilhado?",
        body: "Se for possível transferir posse por canal, você reduz a superfície de disputa.",
      },
      {
        label: "A operação é composta ou simples?",
        body: "Leituras e escritas isoladas podem caber em atomic; invariantes quase sempre pedem lock.",
      },
      {
        label: "O gargalo é contenção ou clareza?",
        body: "Otimizar cedo demais com low-level sync costuma cobrar juros em manutenção.",
      },
    ],
    footer: "a melhor primitiva é a que preserva corretude com o menor custo cognitivo razoável",
  },
}) satisfies LessonModule["visuals"];

export const goSyncAtomicMutexInteractions = buildComputacaoInteractions({
  flow: {
    id: "go-sync-access-flow-lab",
    eyebrow: "Fluxo seguro",
    title: "Acompanhe uma atualização concorrente bem coordenada",
    description:
      "Veja as etapas mentais de uma goroutine ao tocar estado compartilhado sem criar data race.",
    tone: "indigo",
    icon: "Workflow",
    stages: [
      {
        label: "Detectar disputa",
        detail:
          "O primeiro passo é perceber que mais de uma goroutine pode ler ou escrever o mesmo estado ao mesmo tempo.",
        cue: "há compartilhamento real?",
      },
      {
        label: "Escolher fronteira",
        detail:
          "Defina qual região crítica precisa ser protegida para preservar a invariância, não apenas uma linha isolada.",
        cue: "o que precisa ser atômico como conjunto?",
      },
      {
        label: "Sincronizar",
        detail:
          "Mutex, channel ownership ou atomic entram para estabelecer ordem observável entre as goroutines.",
        cue: "ordem e exclusão",
      },
      {
        label: "Publicar resultado",
        detail:
          "Depois da atualização, outras goroutines passam a enxergar um estado coerente, não um meio-termo indefinido.",
        cue: "visibilidade",
      },
      {
        label: "Liberar rápido",
        detail:
          "Região crítica longa aumenta contenção, latência e risco de acoplamento desnecessário.",
        cue: "progresso do sistema",
      },
    ],
  },
  compare: {
    id: "go-sync-primitiva-compare",
    eyebrow: "Escolha",
    title: "Compare canais, mutexes e atomics",
    description:
      "Cada abordagem resolve um tipo de coordenação melhor. O ponto não é moda, e sim semântica.",
    tone: "violet",
    icon: "ArrowRightLeft",
    options: [
      {
        label: "Channels",
        headline: "Ótimos quando você quer transferir posse do trabalho ou do dado",
        bullets: [
          "Reduzem acesso simultâneo ao mesmo estado ao reorganizar o fluxo.",
          "Combinam bem com pipelines, workers e coordenação explícita.",
          "Não substituem toda necessidade de lock quando o estado já é compartilhado.",
        ],
      },
      {
        label: "Mutex / RWMutex",
        headline: "Melhores quando várias goroutines realmente precisam do mesmo estado mutável",
        bullets: [
          "Tornam a região crítica explícita e preservam invariantes compostas.",
          "RWMutex só ajuda quando a leitura domina e a contenção de escrita compensa.",
          "Regiões críticas grandes ou reentrância implícita criam filas e bugs difíceis.",
        ],
      },
      {
        label: "Atomic",
        headline: "Úteis para flags, contadores, swaps e estruturas low-level muito específicas",
        bullets: [
          "Funcionam bem para operações simples e independentes.",
          "Exigem cuidado maior com desenho, visibilidade e semântica da operação completa.",
          "Não tornam mágicas operações compostas sobre mapas, slices ou múltiplos campos.",
        ],
      },
    ],
  },
  slider: {
    id: "go-sync-contention-dial",
    eyebrow: "Contenção",
    title: "Ajuste o nível de disputa pelo estado compartilhado",
    description:
      "O mesmo desenho pode se comportar muito bem com pouca concorrência e muito mal quando todos disputam a mesma região crítica.",
    tone: "emerald",
    icon: "BarChart3",
    axisLabel: "Nível de disputa",
    states: [
      {
        label: "Baixa disputa",
        summary:
          "Poucas goroutines tocam o mesmo estado ao mesmo tempo. Clareza normalmente vale mais do que micro-otimização.",
        leftLabel: "Simplicidade",
        leftValue: 90,
        rightLabel: "Pressão por tuning",
        rightValue: 24,
        takeaway:
          "Nesse cenário, um mutex pequeno e bem delimitado costuma ser excelente: fácil de ler, fácil de depurar.",
        metrics: [
          { label: "Tail latency", value: "estável" },
          { label: "Risco de bug", value: "baixo" },
          { label: "Custo cognitivo", value: "baixo" },
          { label: "Necessidade de atomic", value: "rara" },
        ],
      },
      {
        label: "Leitura dominante",
        summary:
          "Há muito acesso concorrente, mas a maior parte das operações só consulta o estado ou troca snapshots com pouca frequência.",
        leftLabel: "Reuso de leitura",
        leftValue: 78,
        rightLabel: "Cuidado com write path",
        rightValue: 61,
        takeaway:
          "Vale avaliar RWMutex ou copy-on-write com atomic.Value, mas só se a leitura realmente dominar o custo total.",
        metrics: [
          { label: "Tail latency", value: "moderada" },
          { label: "Risco de bug", value: "médio" },
          { label: "Escalabilidade", value: "boa se bem medida" },
          { label: "Trade-off", value: "mais complexidade" },
        ],
      },
      {
        label: "Alta disputa",
        summary:
          "Muitas goroutines competem pelo mesmo ponto quente. O problema frequentemente é de arquitetura, não só de primitiva.",
        leftLabel: "Pressão por throughput",
        leftValue: 88,
        rightLabel: "Risco de contenção",
        rightValue: 92,
        takeaway:
          "Antes de partir para atomics sofisticados, pergunte se vale particionar estado, reduzir compartilhamento ou mudar o fluxo.",
        metrics: [
          { label: "Tail latency", value: "sensível" },
          { label: "Risco de bug", value: "alto" },
          { label: "Escalabilidade", value: "limitada" },
          { label: "Ação útil", value: "redesenhar" },
        ],
      },
    ],
  },
}) satisfies LessonModule["interactions"];

export const goSyncAtomicMutexContent: LessonContent = {
  id: "go-sync-atomic-mutex",
  title: "Go: sync, Atomic e Mutex",
  subtitle:
    "Concorrência eficiente em Go nasce menos de truques e mais de escolher a fronteira certa para coordenar acesso a estado compartilhado.",
  description:
    "Aula sobre modelo mental de sincronização em Go, data races, mutexes, atomics, contenção, visibilidade de memória e critérios práticos para escolher a primitiva certa.",
  primaryCategoryId: "computacao",
  secondaryCategoryId: "engenharia",
  level: "Intermediário",
  estimatedTime: "50-65 min",
  tags: [
    "Go",
    "sync",
    "atomic",
    "Mutex",
    "Concorrência",
    "Data Race",
    "Performance",
  ],
  learningObjectives: [
    "Entender por que corretude concorrente depende de sincronização explícita mesmo em operações aparentemente simples.",
    "Relacionar data race, visibilidade e sincronizes-before ao modelo de memória do Go.",
    "Distinguir quando usar channels, mutexes, RWMutex e atomics.",
    "Reconhecer que operações compostas raramente ficam seguras apenas com leituras e escritas atômicas isoladas.",
    "Interpretar contenção como um problema tanto de design quanto de escolha de primitiva.",
    "Evitar erros comuns como copiar mutex, criar regiões críticas largas e misturar sync low-level sem medir.",
  ],
  prerequisites: [
    "Noção básica de goroutines e channels.",
    "Entendimento intuitivo de estado compartilhado e concorrência.",
    "Familiaridade com variáveis, funções e estruturas em Go ajuda bastante.",
  ],
  references: [
    ref(
      "The Go Memory Model",
      "Go",
      "https://go.dev/ref/mem",
      "Base oficial para entender data races, sincronização e garantias de ordem observável.",
    ),
    ref(
      "sync package",
      "Go Packages",
      "https://pkg.go.dev/sync",
      "Documentação oficial das primitivas de sincronização de mais alto nível.",
    ),
    ref(
      "sync/atomic package",
      "Go Packages",
      "https://pkg.go.dev/sync/atomic",
      "Referência oficial para operações atômicas e suas advertências de uso.",
    ),
    ref(
      "Data Race Detector",
      "Go",
      "https://go.dev/doc/articles/race_detector",
      "Guia oficial para detectar acessos concorrentes inseguros com o toolchain.",
    ),
    ref(
      "Share Memory By Communicating",
      "Go Blog",
      "https://go.dev/blog/codelab-share",
      "Artigo clássico do Go sobre reorganizar concorrência para reduzir compartilhamento.",
    ),
  ],
  heroVisual: "go-sync-atomic-mutex-hero",
  openingText:
    "Quando um programa Go começa a usar várias goroutines, o desafio deixa de ser apenas “fazer duas coisas ao mesmo tempo”. O desafio real passa a ser manter uma história coerente sobre quem lê, quem escreve e quando o resultado de uma goroutine se torna observável para outra. `sync`, `atomic` e `mutex` são ferramentas para contar essa história com disciplina. Sem isso, a concorrência deixa de ser paralelismo e vira sorte.",
  quickFacts: [
    {
      title: "Data race não é só bug feio",
      body: "Ela quebra a base semântica sobre a qual você imagina que o programa está executando.",
    },
    {
      title: "Atomic não substitui invariantes",
      body: "Uma operação atômica simples não protege automaticamente relações entre vários campos.",
    },
    {
      title: "Mutex é ferramenta nobre",
      body: "Na prática, um lock pequeno e claro costuma ser melhor do que uma pseudo-otimização opaca.",
    },
    {
      title: "Contenção é feedback de design",
      body: "Se tudo disputa o mesmo ponto quente, talvez o problema seja a arquitetura do estado.",
    },
  ],
  sections: [
    s(
      "estado-compartilhado",
      "Motivação",
      "O problema começa quando várias goroutines encostam no mesmo estado",
      "Concorrência não fica perigosa por existir em si, mas por combinar simultaneidade com leitura e escrita sobre os mesmos dados.",
      "go-sync-atomic-mutex-map",
      undefined,
      [
        "Um contador global, um mapa de cache, uma fila em memória ou um objeto com vários campos mutáveis parecem inocentes quando vistos de uma única goroutine. A partir do momento em que duas ou mais rotinas passam a tocá-los ao mesmo tempo, a ordem deixa de ser óbvia.",
        "Esse é o ponto em que concorrência deixa de ser apenas um mecanismo de throughput e passa a ser um problema de coordenação. A pergunta não é só “quantas goroutines tenho”, mas “como esse estado muda sem que alguém enxergue um meio-termo incoerente”.",
        "Em Go, esse cuidado não é opcional. O runtime agenda goroutines de forma eficiente, mas não inventa segurança semântica onde o programa não a construiu.",
      ],
      [
        block("definition", "Estado compartilhado", "Qualquer dado acessível por múltiplas goroutines ao longo do tempo."),
        block("insight", "O risco está na combinação", "Leituras concorrentes puras podem ser simples; o problema explode quando a escrita entra no mesmo espaço."),
      ],
    ),
    s(
      "modelo-de-memoria",
      "Semântica",
      "O modelo de memória do Go fala de ordem observável, não de boa vontade do scheduler",
      "Sem sincronização, você não tem contrato sólido sobre quando uma escrita de uma goroutine fica visível para outra.",
      undefined,
      undefined,
      [
        "O modelo de memória do Go define como leituras e escritas em goroutines distintas podem ser observadas. A ideia central é que, na ausência de data races, o programa se comporta como se houvesse uma ordem coerente suficiente para você raciocinar sobre ele.",
        "Essa propriedade costuma ser resumida como DRF-SC: programas livres de data race se comportam de maneira sequencialmente consistente. O contrário também é importante: se você permite uma race, perdeu a base para prever corretamente o resultado.",
        "Primitivas como mutexes, channels e operações atômicas estabelecem relações de sincronização. Elas não servem apenas para “evitar duas execuções ao mesmo tempo”, mas para publicar estado de forma confiável.",
      ],
      [
        block("definition", "Synchronizes-before", "Relação que garante que certos efeitos de memória se tornem observáveis em outra operação sincronizada posterior."),
        block("mistake", "Confiar em testes que 'parecem funcionar'", "Sem sincronização, o resultado correto observado em algumas execuções não prova que a semântica está preservada."),
      ],
    ),
    s(
      "mutex-regiao-critica",
      "Ferramenta central",
      "Mutex protege invariantes, não apenas linhas de código",
      "Quando você precisa de acesso exclusivo a um estado mutável, o mutex costuma ser a ferramenta mais honesta e legível.",
      undefined,
      "go-sync-access-flow-lab",
      [
        "Um `sync.Mutex` delimita uma região crítica: o trecho em que apenas uma goroutine por vez pode tocar um estado. O ganho real é preservar invariantes compostas, como “ler, decidir, atualizar e publicar” dentro de uma mesma fronteira lógica.",
        "Isso é muito mais importante do que pensar no mutex como um semáforo bruto. O que ele protege não é apenas uma variável, mas a coerência de uma sequência de ações que precisa parecer indivisível para o restante do sistema.",
        "Quando o lock é pequeno, bem nomeado e usado perto do estado que protege, ele costuma ser fácil de manter. O antipadrão é espalhar `Lock` e `Unlock` por caminhos de execução longos e acoplados.",
      ],
      [
        block("definition", "Região crítica", "Trecho do programa em que um recurso compartilhado é acessado sob exclusão coordenada."),
        block("example", "Mapa com cache e estatísticas", "Se ler o mapa e atualizar estatísticas fazem parte da mesma decisão, proteger só metade da operação costuma ser insuficiente."),
      ],
    ),
    s(
      "familia-sync",
      "Refino",
      "A família sync oferece ferramentas diferentes para problemas diferentes",
      "Nem tudo é Mutex: RWMutex, Once, WaitGroup, Cond e Map existem porque sincronização não é uma necessidade única.",
      undefined,
      undefined,
      [
        "O `RWMutex` existe para cenários em que leituras podem ocorrer em paralelo enquanto a escrita exige exclusão. Já `Once` expressa inicialização única, `WaitGroup` coordena conclusão de trabalho, `Cond` modela espera por condição, e `sync.Map` tenta atender perfis muito específicos de concorrência.",
        "Esse repertório mostra um princípio útil: escolher a abstração correta costuma simplificar mais do que forçar todas as necessidades dentro de um `Mutex` genérico.",
        "Ao mesmo tempo, mais opções não significam maior sofisticação automática. `RWMutex` pode piorar desempenho quando a escrita é frequente; `sync.Map` não é substituto universal de `map` com lock; `Cond` pede desenho disciplinado para não virar fonte de bloqueios sutis.",
      ],
      [
        block("insight", "Sincronização tem forma", "A primitiva certa expressa melhor a intenção do que um lock usado como martelo universal."),
        block("mistake", "Escolher pelo nome mais avançado", "Ferramentas mais especializadas só ajudam quando o padrão de acesso realmente combina com elas."),
      ],
    ),
    s(
      "atomics",
      "Baixo nível",
      "Atomic é excelente para operações simples, mas cobra precisão mental",
      "Contadores, flags, swaps e snapshots podem se beneficiar de `sync/atomic`, desde que a semântica completa da operação continue válida.",
      undefined,
      undefined,
      [
        "As operações atômicas do Go são desenhadas para casos low-level: incrementar um contador, ler uma flag, trocar um ponteiro ou publicar um snapshot tipado com `atomic.Value`. Nesses casos, o custo e a clareza podem ser muito bons.",
        "O problema começa quando alguém tenta esticar a ideia de atomic para operações compostas. Se a lógica depende de checar dois campos, iterar sobre uma estrutura ou manter múltiplas relações ao mesmo tempo, a atomicidade de passos isolados não basta.",
        "A própria documentação do pacote alerta: para a maioria das aplicações, sincronização de alto nível com channels ou `sync` é preferível. Atomic funciona melhor como peça de implementação cuidadosa, não como estilo de arquitetura padrão.",
      ],
      [
        block("definition", "Operação atômica", "Acesso indivisível que pode participar de garantias de sincronização e ordem observável entre goroutines."),
        block("insight", "Atomic tende a comprimir semântica", "Você troca explicitude por concisão. Isso pode ser ótimo ou perigoso, dependendo da invariância envolvida."),
      ],
    ),
    s(
      "escolhendo-a-primitiva",
      "Decisão",
      "Channels, mutexes e atomics resolvem dores diferentes",
      "Escolher bem começa por perguntar se você pode mover posse do dado, se precisa proteger um estado compartilhado ou se tem uma operação realmente pequena e isolada.",
      undefined,
      "go-sync-primitiva-compare",
      [
        "Channels brilham quando você reorganiza o sistema para evitar que várias goroutines toquem o mesmo estado ao mesmo tempo. Um worker recebe trabalho, atualiza o dado e devolve resultado: menos disputa, mais fluxo explícito.",
        "Mutexes são ideais quando o compartilhamento já faz parte do desenho. Você aceita essa realidade, cria uma fronteira crítica clara e preserva a coerência do estado.",
        "Atomics entram quando o problema é mais estreito: flag de desligamento, contagem, swap de snapshot, fast path de baixo nível. Fora disso, a economia inicial pode virar dívida cognitiva.",
      ],
      [
        block("example", "Ownership por canal", "Se uma única goroutine passa a ser dona do mapa e outras enviam pedidos por channel, o problema de sincronização muda de natureza."),
        block("mistake", "Dogmatismo", "Nem todo problema deve ser resolvido com channels; nem todo estado compartilhado exige lock-free."),
      ],
    ),
    s(
      "contencao-e-layout",
      "Performance",
      "Quando há contenção, o primeiro ajuste útil nem sempre é trocar de primitiva",
      "Hotspots de lock costumam revelar concentração excessiva de trabalho sobre o mesmo estado lógico.",
      undefined,
      "go-sync-contention-dial",
      [
        "Se centenas de goroutines disputam o mesmo lock, talvez o custo dominante não seja o `Mutex` em si, mas o fato de o sistema centralizar demais a mesma decisão em um único ponto.",
        "Antes de correr para atomics complexos, vale perguntar se dá para particionar por chave, usar sharding, reduzir frequência de escrita, publicar snapshots ou mover parte da coordenação para channels e filas internas.",
        "Essa leitura é importante porque desempenho concorrente nasce de reduzir conflito, não apenas de acelerar a instrução de sincronização. Às vezes o melhor lock é aquele que deixa de ser disputado porque o design mudou.",
      ],
      [
        block("insight", "Contenção é sintoma", "Ela frequentemente aponta para forma de acesso, centralização de estado ou fronteiras ruins de responsabilidade."),
      ],
    ),
    s(
      "erros-comuns",
      "Armadilhas",
      "Os erros mais caros costumam ser semânticos, não sintáticos",
      "Copiar mutex, esquecer unlock em caminhos de erro e supor que atomics protegem invariantes compostas são falhas clássicas.",
      "go-sync-atomic-mutex-summary",
      undefined,
      [
        "Um `Mutex` não deve ser copiado depois de usado, porque a identidade da proteção faz parte da semântica. Outro tropeço recorrente é abrir uma região crítica e deixar retornos, `panic` ou caminhos longos dificultarem o `Unlock` correto.",
        "Também é comum misturar lock com atomic sem contrato claro: parte do estado é lida atomically, outra parte é protegida por mutex, e o conjunto deixa de ter uma história consistente. O programa pode compilar, mas o raciocínio fica quebrado.",
        "Por isso, corretude concorrente melhora quando o desenho faz as fronteiras de posse e sincronização parecerem quase inevitáveis no código.",
      ],
      [
        block("mistake", "Atomic em volta de estrutura grande", "Atualizar um contador atomically não torna seguro acessar o resto da estrutura sem coordenação."),
        block("mistake", "Lock excessivamente largo", "Quanto mais trabalho dentro da região crítica, maior a fila e mais difícil isolar o verdadeiro gargalo."),
      ],
    ),
    s(
      "quiz-revisao",
      "Revisão",
      "Quiz de revisão",
      "Teste sua intuição sobre visibilidade, regiões críticas, contenção e escolha de primitiva.",
      undefined,
      "quiz",
      ["O objetivo é ligar sincronização a semântica e design, não só a API."],
      [],
    ),
    s(
      "glossario",
      "Vocabulário",
      "Glossário essencial",
      "Consolide o vocabulário que aparece em código concorrente e em investigações de performance.",
      undefined,
      "glossary",
      ["Esses termos reaparecem em scheduler, profiling, runtime e desenho de serviços."],
      [],
    ),
  ],
  summaryCards: [
    { title: "Sem sincronização, sem contrato", body: "Data race corrói a previsibilidade do programa." },
    { title: "Mutex protege invariantes", body: "Ele vale por preservar a operação lógica completa." },
    { title: "Atomic é ferramenta especializada", body: "Excelente para poucos casos, perigosa como default." },
    { title: "Channels mudam o fluxo", body: "Às vezes a melhor sincronização é reduzir compartilhamento." },
    { title: "Contenção revela desenho", body: "Hotspot recorrente é pista sobre arquitetura do estado." },
    { title: "Clareza também é performance", body: "Código concorrente legível é mais fácil de otimizar sem quebrar." },
  ],
  quiz: [
    q(
      "q1",
      "Por que um programa com data race é conceitualmente perigoso?",
      "Porque perde garantias confiáveis sobre a ordem observável entre leituras e escritas concorrentes.",
      "Porque o scheduler do Go para de usar múltiplos núcleos.",
      "Porque canais deixam de funcionar.",
      "a",
      "O problema central não é estético: sem sincronização, a base semântica do raciocínio fica quebrada.",
    ),
    q(
      "q2",
      "Qual frase resume melhor o papel de um mutex?",
      "Ele protege a coerência de uma região crítica e das invariantes associadas.",
      "Ele torna qualquer operação automaticamente mais rápida.",
      "Ele substitui a necessidade de pensar no layout do estado.",
      "a",
      "Mutex vale por coordenar acesso e publicar estado coerente.",
    ),
    q(
      "q3",
      "Quando `sync/atomic` costuma ser mais apropriado?",
      "Em flags, contadores, swaps e casos low-level de operação simples e bem delimitada.",
      "Sempre que houver mais de duas goroutines.",
      "Sempre que um mutex aparecer no profile.",
      "a",
      "Atomic brilha em operações pequenas e especializadas.",
    ),
    q(
      "q4",
      "Qual é um bom primeiro passo ao ver muita contenção?",
      "Perguntar se o desenho do estado pode ser particionado ou reorganizado.",
      "Trocar todos os locks por compare-and-swap.",
      "Desligar o race detector.",
      "a",
      "Contenção frequente costuma revelar um problema de arquitetura do acesso.",
    ),
    q(
      "q5",
      "Por que uma operação composta frequentemente não cabe só em atomics isoladas?",
      "Porque a invariância depende da relação entre vários passos ou campos, não apenas de uma instrução.",
      "Porque atomics só funcionam em Linux.",
      "Porque RWMutex é sempre obrigatório.",
      "a",
      "Atomicidade local não substitui coerência do conjunto.",
    ),
    q(
      "q6",
      "Qual vantagem conceitual channels podem oferecer?",
      "Reduzir o problema ao transferir posse do trabalho ou do dado entre goroutines.",
      "Eliminar qualquer necessidade de sincronização.",
      "Garantir desempenho melhor do que mutex em todo caso.",
      "a",
      "Muitas vezes eles reorganizam o fluxo para evitar compartilhamento simultâneo.",
    ),
    q(
      "q7",
      "Qual é um erro comum com `RWMutex`?",
      "Assumir que ele sempre melhora desempenho, mesmo com muitas escritas ou seções críticas ruins.",
      "Usá-lo para leituras concorrentes.",
      "Chamá-lo dentro de goroutines.",
      "a",
      "Ferramentas mais especializadas só ajudam quando o perfil de acesso combina com elas.",
    ),
    q(
      "q8",
      "O que o race detector do Go oferece?",
      "Um meio prático de detectar acessos concorrentes inseguros durante execução real.",
      "Uma prova formal completa de ausência de bugs concorrentes.",
      "Uma substituição para benchmarks e profiles.",
      "a",
      "Ele encontra races exercitadas em runtime, o que já é valiosíssimo na prática.",
    ),
  ],
  glossary: [
    g("Data race", "Acesso concorrente ao mesmo local de memória com pelo menos uma escrita sem sincronização adequada."),
    g("Synchronizes-before", "Relação de ordem observável criada por primitivas de sincronização."),
    g("Região crítica", "Trecho do programa em que acesso a um recurso compartilhado é coordenado."),
    g("Mutex", "Lock de exclusão mútua usado para proteger estado compartilhado."),
    g("RWMutex", "Lock que diferencia leitura concorrente e escrita exclusiva."),
    g("Atomic", "Operação indivisível usada em cenários low-level de sincronização."),
    g("Conteção", "Disputa entre goroutines pelo mesmo recurso sincronizado."),
    g("Invariante", "Propriedade que deve permanecer coerente durante e após uma operação."),
    g("Ownership por canal", "Estratégia de passar posse do dado ou trabalho por channels."),
    g("Race detector", "Ferramenta do Go para detectar data races em execução."),
    g("Snapshot", "Visão coerente de um estado publicada de uma vez para leitores."),
  ],
};

export const goPprofEBenchmarksVisuals = buildComputacaoVisuals({
  hero: {
    id: "go-pprof-e-benchmarks-hero",
    title: "Go: pprof e Benchmarks",
    subtitle: "Medir bem antes de otimizar: experimento, profile e interpretação.",
    chips: ["pprof", "benchmark", "CPU", "heap", "diagnóstico"],
  },
  map: {
    id: "go-pprof-e-benchmarks-map",
    title: "Do sintoma à hipótese validada",
    items: [
      { label: "Sintoma", detail: "latência, CPU, memória" },
      { label: "Experimento", detail: "benchmark ou carga" },
      { label: "Coleta", detail: "pprof / profiles" },
      { label: "Leitura", detail: "hot paths e alocação" },
      { label: "Decisão", detail: "mudar ou não" },
    ],
    caption: "otimização séria liga hipótese, medição e repetição",
  },
  summary: {
    id: "go-pprof-e-benchmarks-summary",
    title: "Três filtros contra autoengano",
    panels: [
      {
        label: "O benchmark representa o uso real?",
        body: "Sem aderência ao caso prático, o número pode ser lindo e inútil.",
      },
      {
        label: "O profile aponta custo relevante?",
        body: "Nem toda função no topo do profile merece intervenção imediata.",
      },
      {
        label: "A mudança foi reavaliada?",
        body: "Otimização sem re-medição vira narrativa, não engenharia.",
      },
    ],
    footer: "benchmark sem contexto e profile sem pergunta produzem mais ruído do que clareza",
  },
}) satisfies LessonModule["visuals"];

export const goPprofEBenchmarksInteractions = buildComputacaoInteractions({
  flow: {
    id: "go-benchmarking-loop-lab",
    eyebrow: "Método",
    title: "Percorra um ciclo saudável de otimização",
    description:
      "Use o fluxo para lembrar que benchmark e profile servem a uma investigação, não a uma vaidade numérica.",
    tone: "indigo",
    icon: "Search",
    stages: [
      {
        label: "Observar sintoma",
        detail:
          "Comece por um problema real: latência alta, muita CPU, alocação excessiva ou saturação sob carga.",
        cue: "o que está doendo?",
      },
      {
        label: "Isolar experimento",
        detail:
          "Monte benchmark ou cenário reproduzível suficiente para reduzir interferências e comparar alternativas.",
        cue: "medição repetível",
      },
      {
        label: "Coletar profile",
        detail:
          "CPU, heap, allocs, block ou mutex profile ajudam a localizar onde o custo realmente aparece.",
        cue: "evidência concreta",
      },
      {
        label: "Interpretar",
        detail:
          "Leia hot paths, alocadores e chamadas, distinguindo sintoma secundário de raiz provável do problema.",
        cue: "causa provável",
      },
      {
        label: "Mudar e revalidar",
        detail:
          "A otimização só se sustenta quando o benchmark e o profile depois da mudança confirmam o ganho desejado.",
        cue: "fechar o loop",
      },
    ],
  },
  compare: {
    id: "go-profile-types-compare",
    eyebrow: "Profiles",
    title: "Compare os principais tipos de profile no Go",
    description:
      "Cada profile responde melhor a um tipo de pergunta. Ler o profile errado leva a decisões erradas.",
    tone: "violet",
    icon: "ArrowRightLeft",
    options: [
      {
        label: "CPU",
        headline: "Mostra onde o tempo ativo de CPU está sendo consumido",
        bullets: [
          "Ótimo para encontrar hot paths computacionais e funções muito chamadas.",
          "Não explica sozinho espera por rede, bloqueio ou tempo dormindo.",
          "Costuma ser a primeira parada quando throughput e latência estão ruins sob carga ativa.",
        ],
      },
      {
        label: "Heap / Allocs",
        headline: "Mostra quem aloca, quem retém e quanto lixo o código está gerando",
        bullets: [
          "Ajuda a conectar performance com pressão de GC e churn de objetos.",
          "Nem toda alocação é bug; o problema é a alocação relevante para o objetivo do serviço.",
          "Muito útil para APIs, parsers, buffers e hot loops com escape desnecessário.",
        ],
      },
      {
        label: "Block / Mutex",
        headline: "Ajuda a enxergar espera e contenção entre goroutines",
        bullets: [
          "Excelente quando o problema parece ser coordenação e não cálculo puro.",
          "Pode revelar gargalos em locks, canais e serialização indevida.",
          "Costuma dialogar bem com o desenho de concorrência e não apenas com microcódigo.",
        ],
      },
    ],
  },
  slider: {
    id: "go-benchmark-rigor-dial",
    eyebrow: "Rigor",
    title: "Ajuste o grau de maturidade da sua medição",
    description:
      "Quanto melhor o desenho experimental, menor a chance de otimizar ruído ou regressão mascarada.",
    tone: "emerald",
    icon: "BarChart3",
    axisLabel: "Postura de medição",
    states: [
      {
        label: "Toy benchmark",
        summary:
          "Mede algo pequeno demais, com pouco contexto e sem relação clara com o comportamento sob uso real.",
        leftLabel: "Rapidez para medir",
        leftValue: 88,
        rightLabel: "Confiança no resultado",
        rightValue: 26,
        takeaway:
          "Serve para explorar hipóteses, mas não para justificar grandes refatorações ou mudanças arquiteturais.",
        metrics: [
          { label: "Representatividade", value: "baixa" },
          { label: "Variabilidade", value: "alta" },
          { label: "Risco de overfit", value: "alto" },
          { label: "Uso ideal", value: "exploração" },
        ],
      },
      {
        label: "Benchmark razoável",
        summary:
          "Já há repetição, controle básico e perguntas melhores, embora o cenário ainda seja simplificado.",
        leftLabel: "Praticidade",
        leftValue: 66,
        rightLabel: "Confiança no resultado",
        rightValue: 68,
        takeaway:
          "É o ponto em que muita otimização de aplicação começa a ficar útil: nem perfeito, nem ingênuo.",
        metrics: [
          { label: "Representatividade", value: "média" },
          { label: "Variabilidade", value: "moderada" },
          { label: "Leitura de diff", value: "útil" },
          { label: "Uso ideal", value: "iteração" },
        ],
      },
      {
        label: "Produção informada",
        summary:
          "Benchmark, carga e profiling foram alinhados com o padrão real de uso e com os riscos do serviço.",
        leftLabel: "Custo de preparo",
        leftValue: 42,
        rightLabel: "Confiança no resultado",
        rightValue: 90,
        takeaway:
          "É desse tipo de medição que surgem decisões maduras: você sabe melhor o que ganhou, o que pagou e o que mudou.",
        metrics: [
          { label: "Representatividade", value: "alta" },
          { label: "Variabilidade", value: "menor" },
          { label: "Capacidade de decisão", value: "forte" },
          { label: "Uso ideal", value: "trade-offs sérios" },
        ],
      },
    ],
  },
}) satisfies LessonModule["interactions"];

export const goPprofEBenchmarksContent: LessonContent = {
  id: "go-pprof-e-benchmarks",
  title: "Go: pprof e Benchmarks",
  subtitle:
    "Performance em Go melhora muito quando você trata benchmark e profile como instrumentos de investigação e não como placares soltos.",
  description:
    "Aula sobre benchmarking com `testing`, profiles com `pprof`, `net/http/pprof`, tipos de profile, leitura de hot paths e metodologia prática para otimização sem autoengano.",
  primaryCategoryId: "computacao",
  secondaryCategoryId: "engenharia",
  level: "Intermediário",
  estimatedTime: "55-70 min",
  tags: ["Go", "pprof", "Benchmark", "Diagnóstico", "CPU", "Heap", "Performance"],
  learningObjectives: [
    "Entender por que otimização útil começa com um sintoma e uma hipótese mensurável.",
    "Usar o modelo mental de benchmarks do pacote `testing` para comparar implementações de maneira disciplinada.",
    "Distinguir CPU, heap, allocs, block e mutex profiles pelas perguntas que eles respondem.",
    "Relacionar `go test`, `runtime/pprof`, `net/http/pprof` e a página oficial de diagnostics do Go.",
    "Evitar conclusões apressadas a partir de benchmarks artificiais ou profiles lidos fora de contexto.",
    "Fechar o ciclo benchmark → profile → mudança → revalidação.",
  ],
  prerequisites: [
    "Familiaridade básica com `go test` e funções em Go.",
    "Noção de concorrência e alocação ajuda, mas não é obrigatória.",
    "Interesse por medir desempenho sem depender de adivinhação.",
  ],
  references: [
    ref(
      "Diagnostics",
      "Go",
      "https://go.dev/doc/diagnostics",
      "Página oficial que organiza profiling, tracing e ferramentas de diagnóstico do ecossistema Go.",
    ),
    ref(
      "Profiling Go Programs",
      "Go Blog",
      "https://go.dev/blog/pprof",
      "Artigo clássico mostrando como coletar e interpretar profiles no fluxo de otimização.",
    ),
    ref(
      "runtime/pprof package",
      "Go Packages",
      "https://pkg.go.dev/runtime/pprof",
      "Referência oficial para coleta programática de profiling.",
    ),
    ref(
      "net/http/pprof package",
      "Go Packages",
      "https://pkg.go.dev/net/http/pprof",
      "Documentação oficial dos endpoints HTTP de profile ao vivo.",
    ),
    ref(
      "Go Wiki: Performance",
      "Go",
      "https://go.dev/wiki/Performance",
      "Guia prático com perfis adicionais e leitura operacional de gargalos.",
    ),
    ref(
      "testing package source docs",
      "Go",
      "https://go.dev/src/testing/testing.go?m=text",
      "Explica benchmarks, flags de profile e integração do harness de testes.",
    ),
  ],
  heroVisual: "go-pprof-e-benchmarks-hero",
  openingText:
    "Performance é um campo especialmente vulnerável ao autoengano. Um trecho de código pode parecer ruim porque chamou atenção visual, enquanto o gargalo real está em outra função, em alocação excessiva ou em contenção entre goroutines. Go tem uma vantagem rara aqui: o toolchain já entrega um conjunto muito bom de benchmarks e perfis. O desafio não é tanto ter ferramenta, mas aprender a fazer a pergunta certa para cada ferramenta.",
  quickFacts: [
    {
      title: "Benchmark não é prova isolada",
      body: "Ele mede um recorte. O valor aparece quando esse recorte representa uma hipótese útil.",
    },
    {
      title: "Profile responde perguntas diferentes",
      body: "CPU, heap, allocs, block e mutex enxergam custos de naturezas distintas.",
    },
    {
      title: "Top não é sentença final",
      body: "A função no topo pode ser sintoma de um desenho maior, não necessariamente a raiz da perda.",
    },
    {
      title: "Re-medição fecha o raciocínio",
      body: "Sem comparar antes e depois, otimização vira narrativa subjetiva.",
    },
  ],
  sections: [
    s(
      "medir-antes",
      "Princípio",
      "Otimizar sem medir é trocar engenharia por folclore",
      "Um bom trabalho de performance começa definindo onde dói e qual hipótese você quer confirmar ou refutar.",
      "go-pprof-e-benchmarks-map",
      undefined,
      [
        "Latência alta, consumo inesperado de CPU, explosão de heap ou throughput abaixo do esperado são sintomas. O próximo passo não é editar código imediatamente, e sim transformar o sintoma em pergunta observável.",
        "Essa pergunta pode virar benchmark, teste sob carga, profile em produção controlada ou uma combinação deles. O importante é que a medição tenha ligação com o comportamento do sistema que você de fato quer melhorar.",
        "Sem isso, você pode reduzir custo em um microtrecho irrelevante enquanto o problema real continua intocado.",
      ],
      [
        block("definition", "Hipótese de performance", "Suposição testável sobre onde o custo está e que mudança pode alterá-lo."),
        block("mistake", "Caçar código 'lento' a olho", "Intuição ajuda a formular hipóteses, mas não substitui coleta de evidência."),
      ],
    ),
    s(
      "benchmark-com-testing",
      "Experimento",
      "Benchmarks em Go são pequenos laboratórios de comparação",
      "O pacote `testing` já fornece um harness prático para repetir código e comparar alternativas.",
      undefined,
      "go-benchmarking-loop-lab",
      [
        "Funções `BenchmarkXxx(*testing.B)` permitem medir um trecho repetidamente, comparar versões e produzir saídas úteis como custo relativo e padrões de alocação. O valor está menos em decorar flags e mais em aprender a isolar o fenômeno certo.",
        "Um benchmark útil reduz ruído óbvio e deixa claro o que faz parte da medição e o que é preparação. Se você mistura setup caro, dados irreais e trabalho que não acontece no mundo real, o número perde poder explicativo.",
        "A mentalidade correta é: benchmark não existe para impressionar com um número pequeno, e sim para sustentar uma decisão melhor do que a anterior.",
      ],
      [
        block("definition", "Harness de benchmark", "Estrutura do toolchain que repete a função de teste e coleta medições relevantes."),
        block("example", "Comparação A/B", "Trocar duas implementações da mesma função em um benchmark bem desenhado é muito mais informativo do que discutir qual parece mais rápida."),
      ],
    ),
    s(
      "benchmark-honesto",
      "Rigor",
      "Benchmark bom representa a carga certa no nível certo",
      "O maior risco prático é medir uma versão simplificada demais do problema e otimizar o recorte errado.",
      undefined,
      "go-benchmark-rigor-dial",
      [
        "Às vezes o benchmark ideal é microscópico: um parser, uma função de serialização, um alocador de buffers. Em outras situações, um microbenchmark engana porque a interação com rede, cache, concorrência e GC domina o comportamento do serviço real.",
        "Por isso, engenharia madura combina granularidades. Você pode usar benchmarks pequenos para explorar hipóteses locais e depois validar se o ganho aparece no endpoint, no worker ou no serviço inteiro.",
        "Quanto mais séria a decisão, maior a obrigação de aproximar a medição do padrão real de uso.",
      ],
      [
        block("insight", "Rigor é adequação", "O objetivo não é criar o benchmark mais complexo do mundo, mas o mais honesto para a pergunta atual."),
      ],
    ),
    s(
      "pprof-fundamentos",
      "Ferramenta",
      "pprof conecta custo observado a caminhos concretos de execução",
      "O profile transforma intuição difusa em mapa de hot paths, alocação e espera.",
      undefined,
      undefined,
      [
        "O Go runtime produz dados de profiling no formato esperado pelo `pprof`. Isso permite enxergar onde o processo gasta CPU, quem aloca heap, quem bloqueia e como os custos se distribuem pelo grafo de chamadas.",
        "No fluxo mais simples, você coleta profiles com `go test` usando flags adequadas ou com `runtime/pprof` embutido em um programa standalone. Depois, `go tool pprof` ajuda a navegar por texto, gráfico e caminhos específicos.",
        "A leitura importante aqui é causal: qual função está quente, quem a chama, se ela é custo primário ou reflexo de outra escolha. O profile não é uma lista de culpados; é um mapa para investigação.",
      ],
      [
        block("definition", "Hot path", "Caminho de execução que concentra parcela relevante do custo observado."),
        block("insight", "Medir é localizar", "O profile vale porque aponta onde olhar, não porque decide sozinho qual mudança você deve fazer."),
      ],
    ),
    s(
      "tipos-de-profile",
      "Leitura",
      "Cada tipo de profile responde melhor a um tipo de gargalo",
      "Escolher entre CPU, heap, allocs, block e mutex profile depende da pergunta operacional.",
      undefined,
      "go-profile-types-compare",
      [
        "Se o serviço está gastando CPU demais sob carga ativa, o CPU profile costuma ser o primeiro aliado. Se o problema é churn de objetos e pausas mais sensíveis a memória, heap e allocation profiles iluminam melhor o quadro.",
        "Já block e mutex profiles ganham destaque quando a sensação é de paralelismo ruim: muitas goroutines, pouco avanço, travas disputadas ou esperas concentradas.",
        "Essa distinção evita o erro comum de usar um único profile como lente universal. A ferramenta certa economiza semanas de ajuste no lugar errado.",
      ],
      [
        block("mistake", "Perguntar de memória ao CPU profile", "Ele pode mostrar consequências, mas não é a melhor lente para retenção e churn de alocação."),
      ],
    ),
    s(
      "profiling-em-servidores",
      "Produção",
      "net/http/pprof abre uma janela poderosa — e precisa de critério",
      "Serviços HTTP em Go podem expor profiles ao vivo, o que é excelente para investigação controlada.",
      undefined,
      undefined,
      [
        "O pacote `net/http/pprof` registra handlers em `/debug/pprof/` e permite capturar CPU, heap, goroutines, mutexes, block e trace via HTTP. Isso é extremamente útil quando o problema só aparece em um processo vivo, com carga e dependências reais.",
        "A mesma potência exige disciplina operacional. Expor endpoints de profiling sem restrição é um risco; ativá-los indiscriminadamente em produção também adiciona custo, sobretudo para certas coletas.",
        "O ganho aqui é metodológico: quando benchmarks locais não bastam, profiles ao vivo aproximam diagnóstico e comportamento real do sistema.",
      ],
      [
        block("example", "Server degradado só em produção", "Quando o bug depende do padrão real de tráfego, o profile ao vivo pode mostrar exatamente onde a carga está concentrando custo."),
        block("mistake", "Ligar profiling sem política", "Ferramentas diagnósticas também precisam de controle de acesso, janela de uso e leitura cuidadosa do overhead."),
      ],
    ),
    s(
      "fechando-o-loop",
      "Método",
      "O ganho real aparece quando benchmark e profile conversam",
      "Uma mudança faz sentido quando reduz custo na evidência certa, e não apenas em uma métrica isolada.",
      undefined,
      undefined,
      [
        "Imagine que o benchmark mostra regressão em throughput e o heap profile revela churn de buffers. A hipótese fica mais forte se, após reduzir alocações, o benchmark melhora e o profile confirma menos pressão naquele caminho.",
        "Esse cruzamento é o coração da prática madura: benchmark ajuda a comparar versões; profile ajuda a explicar por que uma versão custa mais. Juntos, eles diminuem a chance de vitória ilusória.",
        "É por isso que performance não é sobre 'fazer o top ficar bonito'. É sobre fechar ciclos curtos de pergunta, evidência, mudança e revalidação.",
      ],
      [
        block("insight", "Explicação importa", "Ganhar alguns pontos percentuais sem entender de onde vieram pode ser pior do que não otimizar."),
      ],
    ),
    s(
      "erros-comuns",
      "Armadilhas",
      "Os erros mais comuns de profiling são de interpretação e contexto",
      "Números bonitos podem esconder benchmarks irreais, profiles incompletos e conclusões precipitadas.",
      "go-pprof-e-benchmarks-summary",
      undefined,
      [
        "Benchmark curto demais, carga artificial demais ou dados sempre iguais podem deixar o compilador e o runtime mostrarem um mundo otimista demais. Da mesma forma, profiles coletados fora do momento relevante do problema pouco explicam.",
        "Outro tropeço frequente é declarar vitória local e ignorar efeitos colaterais globais: reduzir alocação pode aumentar complexidade, diminuir legibilidade ou mover custo para outra etapa mais importante.",
        "A disciplina correta é quase científica: separar hipótese, coleta, interpretação e réplica.",
      ],
      [
        block("mistake", "Confundir microganho com ganho sistêmico", "Uma função mais rápida não garante endpoint mais rápido ou operação mais barata."),
        block("mistake", "Ler o primeiro profile como diagnóstico final", "Perfis são retratos de uma coleta específica, não oráculos universais."),
      ],
    ),
    s(
      "quiz-revisao",
      "Revisão",
      "Quiz de revisão",
      "Verifique se benchmark, profile e método investigativo ficaram conectados.",
      undefined,
      "quiz",
      ["O objetivo é entender por que medir bem é parte da arquitetura de performance."],
      [],
    ),
    s(
      "glossario",
      "Vocabulário",
      "Glossário essencial",
      "Feche a aula consolidando o vocabulário de medição e interpretação em Go.",
      undefined,
      "glossary",
      ["Esses termos voltam em otimização de APIs, serviços, pipelines e bibliotecas."],
      [],
    ),
  ],
  summaryCards: [
    { title: "Medição começa com pergunta", body: "Sintoma e hipótese orientam benchmark e profile." },
    { title: "Benchmark é recorte", body: "Ele precisa representar a decisão que você quer tomar." },
    { title: "pprof explica custo", body: "Hot paths e alocação ganham rosto e contexto." },
    { title: "Profiles não são universais", body: "CPU, heap e block respondem dores diferentes." },
    { title: "Produção exige critério", body: "Profiles ao vivo são poderosos, mas têm custo e superfície de risco." },
    { title: "Revalidar é obrigatório", body: "Sem antes/depois, performance vira opinião." },
  ],
  quiz: [
    q(
      "q1",
      "Qual é a melhor primeira atitude diante de um problema de performance?",
      "Definir o sintoma e formular uma hipótese mensurável.",
      "Trocar estruturas até o código parecer mais rápido.",
      "Abrir o pprof em qualquer processo disponível.",
      "a",
      "O trabalho sério começa transformando dor percebida em pergunta observável.",
    ),
    q(
      "q2",
      "Para que serve um benchmark bem desenhado?",
      "Comparar alternativas dentro de um experimento que represente a hipótese relevante.",
      "Provar que uma linguagem é superior à outra.",
      "Substituir qualquer teste de carga ou profile.",
      "a",
      "Benchmark é instrumento de decisão, não slogan.",
    ),
    q(
      "q3",
      "Quando um CPU profile é mais apropriado?",
      "Quando você quer entender onde o processo está consumindo tempo ativo de CPU.",
      "Quando quer saber somente quem retém objetos no heap.",
      "Quando precisa listar todos os goroutines do sistema operacional.",
      "a",
      "CPU profile é excelente para hot paths computacionais.",
    ),
    q(
      "q4",
      "Qual profile costuma ajudar mais em churn de memória e pressão de GC?",
      "Heap ou allocation profile.",
      "Apenas CPU profile.",
      "Somente trace de rede.",
      "a",
      "Quando o problema é alocação, a lente de memória fica muito mais útil.",
    ),
    q(
      "q5",
      "Por que `net/http/pprof` é valioso?",
      "Porque permite coletar perfis de um processo HTTP vivo em cenário real.",
      "Porque elimina a necessidade de segurança operacional.",
      "Porque não tem overhead algum.",
      "a",
      "A força dele está em aproximar diagnóstico do comportamento real do serviço.",
    ),
    q(
      "q6",
      "Qual é um erro comum na leitura de profile?",
      "Assumir que a primeira função no topo é automaticamente a raiz do problema.",
      "Relacionar o profile ao tipo de sintoma observado.",
      "Comparar antes e depois da mudança.",
      "a",
      "O topo do profile pode ser sintoma secundário de outra decisão estrutural.",
    ),
    q(
      "q7",
      "O que fecha um ciclo saudável de otimização?",
      "Mudar o código e revalidar com benchmark e/ou profile alinhados ao objetivo.",
      "Publicar o ganho sem repetir a medição.",
      "Trocar o hardware antes de medir.",
      "a",
      "Sem re-medição, não há confiança real na melhora.",
    ),
    q(
      "q8",
      "Qual frase resume melhor a relação entre benchmark e profile?",
      "Benchmark compara versões; profile ajuda a explicar por que uma delas custa mais.",
      "Eles servem para a mesma pergunta em qualquer cenário.",
      "Um exclui a necessidade do outro.",
      "a",
      "Juntos, eles reduzem autoengano e melhoram a qualidade da decisão.",
    ),
  ],
  glossary: [
    g("Benchmark", "Experimento repetível usado para comparar custo de uma operação ou implementação."),
    g("Harness", "Infraestrutura do toolchain que executa e mede benchmarks."),
    g("pprof", "Ferramenta e formato de profiling usados pelo runtime do Go."),
    g("CPU profile", "Profile que mostra onde o tempo ativo de CPU está sendo gasto."),
    g("Heap profile", "Profile que ajuda a enxergar alocação e retenção de memória."),
    g("Allocation profile", "Visão de onde objetos estão sendo alocados ao longo da execução."),
    g("Block profile", "Profile que ajuda a analisar espera por sincronização."),
    g("Mutex profile", "Profile que ajuda a localizar contenção em locks."),
    g("Hot path", "Caminho de execução que concentra uma parcela importante do custo."),
    g("Revalidação", "Medição depois da mudança para confirmar se a hipótese se sustentou."),
    g("Overhead", "Custo adicional introduzido pela própria medição ou instrumentação."),
  ],
};

export const goNetHttpPerformanceVisuals = buildComputacaoVisuals({
  hero: {
    id: "go-net-http-performance-hero",
    title: "Go: net/http e Performance",
    subtitle: "Latência HTTP nasce de conexões, timeouts, pools, handlers e observabilidade.",
    chips: ["Transport", "timeout", "keep-alive", "httptrace", "handlers"],
  },
  map: {
    id: "go-net-http-performance-map",
    title: "Os muitos trechos escondidos de uma requisição HTTP",
    items: [
      { label: "DNS", detail: "descobrir destino" },
      { label: "Conexão", detail: "abrir ou reutilizar" },
      { label: "TLS", detail: "handshake" },
      { label: "Handler", detail: "trabalho útil" },
      { label: "Resposta", detail: "bytes e backpressure" },
    ],
    caption: "otimizar HTTP é encurtar o caminho completo, não apenas o handler",
  },
  summary: {
    id: "go-net-http-performance-summary",
    title: "Três checagens antes de culpar o handler",
    panels: [
      {
        label: "A conexão está sendo reutilizada?",
        body: "Sem pool e keep-alive saudáveis, a latência renasce antes de o handler rodar.",
      },
      {
        label: "Os timeouts existem de forma explícita?",
        body: "Ausência de limites transforma falha de rede em fila silenciosa e recursos presos.",
      },
      {
        label: "Você sabe onde a latência aparece?",
        body: "Sem `httptrace`, pprof e métricas, DNS, conexão e aplicação viram um bolo só.",
      },
    ],
    footer: "boa performance HTTP nasce da pilha inteira: cliente, transporte, servidor e observabilidade",
  },
}) satisfies LessonModule["visuals"];

export const goNetHttpPerformanceInteractions = buildComputacaoInteractions({
  flow: {
    id: "go-http-roundtrip-flow",
    eyebrow: "Round trip",
    title: "Siga o caminho de uma chamada HTTP do cliente à resposta",
    description:
      "A latência total é a soma de etapas muito diferentes. Cada uma pede perguntas próprias.",
    tone: "indigo",
    icon: "Network",
    stages: [
      {
        label: "Resolver destino",
        detail:
          "DNS, proxy e seleção de destino já podem adicionar espera antes de existir conexão útil.",
        cue: "cheguei no host certo?",
      },
      {
        label: "Obter conexão",
        detail:
          "O cliente pode reutilizar conexão ociosa ou abrir uma nova, o que muda custo e tail latency.",
        cue: "pool versus dial",
      },
      {
        label: "Negociar transporte",
        detail:
          "TLS, HTTP/1.1 ou HTTP/2 alteram handshake, multiplexação e reutilização possíveis.",
        cue: "camada de transporte",
      },
      {
        label: "Executar handler",
        detail:
          "Só aqui a lógica de aplicação roda, junto com acesso a banco, cache, serialização e concorrência interna.",
        cue: "trabalho útil",
      },
      {
        label: "Entregar resposta",
        detail:
          "Streaming, body, flush, leitura do cliente e retorno ao pool também fazem parte do custo real.",
        cue: "fim do round trip",
      },
    ],
  },
  compare: {
    id: "go-http-knobs-compare",
    eyebrow: "Ajustes",
    title: "Compare três famílias de ajustes frequentes em `net/http`",
    description:
      "Nem todo problema HTTP se resolve no mesmo lugar. Ajustes de cliente, transporte e servidor têm papéis diferentes.",
    tone: "violet",
    icon: "ArrowRightLeft",
    options: [
      {
        label: "Cliente",
        headline: "Timeout global e uso correto de `http.Client` moldam o comportamento da chamada",
        bullets: [
          "O padrão realmente caro é não reutilizar o `Transport` ou criar `Transport` descartável por chamada; reutilizar `Client` e, sobretudo, `Transport` preserva pooling e configuração coerente.",
          "Timeout explícito evita operações penduradas por tempo indefinido.",
          "Contexto do request ajuda a cancelar o trabalho quando o resultado deixou de importar.",
        ],
      },
      {
        label: "Transport",
        headline: "Pool, keep-alive e parâmetros de conexão governam grande parte da eficiência",
        bullets: [
          "Reuso de conexão reduz dials e handshakes repetidos.",
          "Limites pequenos demais podem serializar tráfego sem você perceber.",
          "Ajustes de `MaxIdleConns`, `MaxIdleConnsPerHost` e `IdleConnTimeout` mudam bastante o comportamento.",
        ],
      },
      {
        label: "Servidor",
        headline: "Timeouts, handlers e forma de escrever a resposta afetam throughput e resiliência",
        bullets: [
          "Timeouts explícitos evitam conexões presas e clientes lentos consumindo recursos por demais.",
          "Handlers que alocam demais ou bloqueiam dependências espalham custo para toda a fila.",
          "Escrever resposta e fechar corpos corretamente também faz parte da saúde do sistema.",
        ],
      },
    ],
  },
  slider: {
    id: "go-http-load-posture-dial",
    eyebrow: "Carga",
    title: "Ajuste a postura do serviço sob tráfego crescente",
    description:
      "Com mais tráfego, reutilização, limites e backpressure passam a importar tanto quanto o código de negócio.",
    tone: "emerald",
    icon: "BarChart3",
    axisLabel: "Regime de carga",
    states: [
      {
        label: "Tráfego leve",
        summary:
          "O serviço ainda parece saudável mesmo com defaults pouco pensados, o que pode mascarar problemas de desenho.",
        leftLabel: "Folga operacional",
        leftValue: 84,
        rightLabel: "Sensibilidade a tuning",
        rightValue: 28,
        takeaway:
          "Aqui é fácil se iludir. A ausência de sintomas não prova que cliente, transport e timeouts estão bem configurados.",
        metrics: [
          { label: "Reuso de conexão", value: "útil, mas pouco sentido" },
          { label: "Fila", value: "pequena" },
          { label: "Tail latency", value: "baixa" },
          { label: "Risco invisível", value: "médio" },
        ],
      },
      {
        label: "Carga consistente",
        summary:
          "Pool, limites e timeouts passam a afetar throughput, latência e estabilidade de forma mais clara.",
        leftLabel: "Eficiência do transporte",
        leftValue: 72,
        rightLabel: "Pressão por disciplina",
        rightValue: 70,
        takeaway:
          "É o momento em que `Transport` bem ajustado, contexto e handlers mais econômicos passam a pagar dividendos claros.",
        metrics: [
          { label: "Reuso de conexão", value: "importante" },
          { label: "Fila", value: "moderada" },
          { label: "Tail latency", value: "sensível" },
          { label: "Observabilidade", value: "necessária" },
        ],
      },
      {
        label: "Pico / degradação",
        summary:
          "Sem limites claros e backpressure, o serviço pode multiplicar espera, conexões e custo por requisição.",
        leftLabel: "Pressão por resiliência",
        leftValue: 92,
        rightLabel: "Risco de colapso",
        rightValue: 90,
        takeaway:
          "Nesse regime, performance e proteção convergem: timeout, cancelamento, pools e shedding parcial evitam espirais ruins.",
        metrics: [
          { label: "Reuso de conexão", value: "crítico" },
          { label: "Fila", value: "alta" },
          { label: "Tail latency", value: "muito sensível" },
          { label: "Ação prioritária", value: "limitar e observar" },
        ],
      },
    ],
  },
}) satisfies LessonModule["interactions"];

export const goNetHttpPerformanceContent: LessonContent = {
  id: "go-net-http-performance",
  title: "Go: net/http e Performance",
  subtitle:
    "HTTP rápido em Go depende menos de um handler milagroso e mais de tratar cliente, transporte, servidor e diagnóstico como uma única linha de produção.",
  description:
    "Aula sobre performance com `net/http`, reuso de conexões, `Transport`, timeouts, `httptrace`, desenho de handlers, backpressure e investigação de latência em clientes e servidores Go.",
  primaryCategoryId: "computacao",
  secondaryCategoryId: "engenharia",
  level: "Intermediário",
  estimatedTime: "50-65 min",
  tags: ["Go", "net/http", "HTTP", "Transport", "Timeout", "httptrace", "Performance"],
  learningObjectives: [
    "Entender a requisição HTTP como uma cadeia de custos que vai além do handler.",
    "Relacionar `http.Client`, `Transport` e reutilização de conexões à latência e ao throughput.",
    "Explicar por que timeouts explícitos são parte de performance e também de resiliência.",
    "Reconhecer o papel de `httptrace` na decomposição da latência do cliente.",
    "Melhorar o desenho mental de handlers, resposta, bodies e pressão sob carga.",
    "Evitar armadilhas como recriar a pilha HTTP sem reuso coerente ou operar sem limites claros.",
  ],
  prerequisites: [
    "Noção básica de HTTP e APIs em Go.",
    "Familiaridade com goroutines e contexto ajuda.",
    "Interesse por performance de rede e serviços.",
  ],
  references: [
    ref(
      "net/http package",
      "Go Packages",
      "https://pkg.go.dev/net/http",
      "Referência oficial para cliente, servidor, timeouts e `Transport`.",
    ),
    ref(
      "httptrace package",
      "Go Packages",
      "https://pkg.go.dev/net/http/httptrace",
      "Documentação oficial para rastrear etapas internas de requests HTTP no cliente.",
    ),
    ref(
      "Introducing HTTP Tracing",
      "Go Blog",
      "https://go.dev/blog/http-tracing",
      "Artigo oficial que explica o uso de `httptrace` no ciclo de uma requisição.",
    ),
    ref(
      "Diagnostics",
      "Go",
      "https://go.dev/doc/diagnostics",
      "Página oficial que organiza profiling e tracing para diagnóstico de performance.",
    ),
    ref(
      "net/http/pprof package",
      "Go Packages",
      "https://pkg.go.dev/net/http/pprof",
      "Útil para relacionar latência de handlers com profiles do processo vivo.",
    ),
    ref(
      "context package",
      "Go Packages",
      "https://pkg.go.dev/context",
      "Importante para cancelamento e propagação de limites em requests HTTP.",
    ),
  ],
  heroVisual: "go-net-http-performance-hero",
  openingText:
    "É tentador tratar performance HTTP como uma questão de 'escrever handlers rápidos'. Só que boa parte da latência pode nascer antes do handler existir — em DNS, conexão, TLS, pool, limites ruins ou cancelamento ausente — e continuar depois dele, durante escrita da resposta, leitura do body e devolução da conexão ao pool. Em Go, `net/http` oferece ferramentas muito boas para esse caminho todo; o desafio é raciocinar sobre ele de ponta a ponta.",
  quickFacts: [
    {
      title: "Client e Transport pedem reuso consciente",
      body: "Reutilizar `http.Client` e, sobretudo, `Transport` muda muito o custo total de rede.",
    },
    {
      title: "Timeout também é performance",
      body: "Limites claros evitam filas invisíveis, goroutines presas e conexões sem destino.",
    },
    {
      title: "Latência tem capítulos",
      body: "DNS, dial, TLS, pool, aplicação e corpo da resposta contam histórias diferentes.",
    },
    {
      title: "Backpressure é parte do desenho",
      body: "Sob carga, throughput sem controle vira cauda longa e degradação espalhada.",
    },
  ],
  sections: [
    s(
      "latencia-completa",
      "Mapa",
      "A latência HTTP começa antes da aplicação e termina depois do handler",
      "O caminho completo inclui resolução, conexão, negociação, execução e entrega da resposta.",
      "go-net-http-performance-map",
      undefined,
      [
        "Uma chamada HTTP aparentemente simples pode incluir DNS, escolha de proxy, abertura ou reuso de conexão, handshake TLS, serialização da requisição, espera por resposta, trabalho do handler, streaming do corpo e fechamento ou retorno da conexão ao pool.",
        "Quando tudo isso aparece junto em um único gráfico de latência, é fácil culpar a aplicação de negócio por custos que nasceram em outra camada. O primeiro salto de maturidade é decompor o round trip.",
        "Esse mapa também explica por que boas configurações de cliente e transporte podem ter impacto tão grande quanto otimizações dentro do handler.",
      ],
      [
        block("definition", "Round trip HTTP", "Ciclo completo entre enviar a requisição e ter a resposta disponível ao chamador."),
        block("insight", "O handler é só um capítulo", "Parte importante da latência acontece fora da lógica de negócio."),
      ],
    ),
    s(
      "cliente-e-transport",
      "Cliente",
      "Muito problema de performance nasce no uso incorreto de `http.Client` e `Transport`",
      "O risco prático quase sempre está em perder reuso de `Transport`, espalhar configuração e tratar cliente/round trip como descartáveis.",
      undefined,
      "go-http-roundtrip-flow",
      [
        "Em Go, quem carrega o estado de pooling e conexões em cache é o `Transport`. O `Client` é a camada de política mais alta: timeout, cookies, redirecionamento e o uso daquele round trip. Na prática, reusar `Client` costuma ser o jeito mais seguro de também reusar `Transport` e manter a configuração consistente.",
        "A formulação correta, portanto, é mais precisa do que um slogan do tipo 'nunca crie client por requisição'. Um `Client` novo com `Transport` nulo ainda recorre ao `DefaultTransport`, mas o antipadrão perigoso continua sendo criar `Transport` descartável, perder a política compartilhada do cliente ou espalhar configurações divergentes a cada chamada.",
        "A consequência prática é importante: parte da otimização HTTP não está no parser ou no JSON, e sim em preservar reuso de conexão, timeout coerente e uma fronteira clara entre política de cliente e transporte.",
      ],
      [
        block("mistake", "Cliente e transporte descartáveis", "O problema clássico é perder reuso de `Transport`, handshakes e política consistente ao recriar a pilha HTTP sem necessidade."),
        block("definition", "Transport", "Componente responsável por detalhes de conexão, reuso, proxy, TLS e round trips no cliente HTTP."),
      ],
    ),
    s(
      "pool-e-keepalive",
      "Transporte",
      "Reuso de conexão é uma das alavancas mais concretas de eficiência",
      "Pool, keep-alive e limites de ociosidade alteram latência média, cauda e custo de CPU/rede.",
      undefined,
      "go-http-knobs-compare",
      [
        "Conexões reutilizadas economizam novas discagens, novos handshakes e parte do custo distribuído do transporte. Sob carga contínua, isso costuma aparecer como melhora de eficiência bem maior do que micro-otimizações isoladas.",
        "Esse reuso também depende de higiene de `Body`: na API de cliente do `net/http`, a resposta precisa ser fechada e, quando você quer reaproveitar a conexão persistente, o corpo precisa ser lido até EOF antes do `Close`.",
        "Mas pool bom não é infinito automático: limites muito baixos podem serializar tráfego; limites irresponsáveis podem mascarar acúmulo de conexões e pressão em dependências.",
        "É por isso que `Transport` merece atenção de engenharia. Ele é uma peça de performance, e não mero detalhe de biblioteca.",
      ],
      [
        block("example", "API interna de alto volume", "Quando o padrão de chamada é repetitivo para os mesmos hosts, reuso de conexão frequentemente vira ganho óbvio."),
      ],
    ),
    s(
      "timeouts-e-cancelamento",
      "Limites",
      "Timeout explícito evita transformar falha remota em desperdício local",
      "Sem limites, requisições lentas podem ocupar goroutines, conexões e memória por tempo demais.",
      undefined,
      undefined,
      [
        "O `http.Client` oferece timeout global de requisição, e o ecossistema inteiro conversa muito bem com `context.Context`. Em vez de deixar chamadas presas indefinidamente, você define contratos temporais claros para o que a aplicação aceita esperar.",
        "Isso não é apenas resiliência. É performance do sistema como um todo: conexões presas e goroutines penduradas roubam capacidade de trabalho útil e pioram a latência de outras operações.",
        "No servidor, timeouts explícitos também ajudam a evitar clientes lentos ou comportamento anômalo consumindo recursos além do razoável.",
      ],
      [
        block("insight", "Tempo também é recurso compartilhado", "Timeout protege CPU, conexões, memória e a fila de trabalho do processo."),
      ],
    ),
    s(
      "handlers-e-resposta",
      "Aplicação",
      "O handler importa muito, mas em contexto",
      "Alocação excessiva, serialização cara, bloqueio em dependências e escrita descuidada do body aparecem aqui.",
      undefined,
      undefined,
      [
        "Dentro do handler entram as escolhas clássicas de aplicação: quantas alocações você faz, quantas dependências chama, como organiza I/O, se há fan-out descontrolado e se a resposta é produzida de forma incremental ou só no fim.",
        "Mesmo assim, vale manter a disciplina de contexto: um handler pode parecer lento porque o banco está degradado, porque o pool do cliente está ruim ou porque a requisição carrega um payload enorme. `net/http` é a moldura; o gargalo pode estar dentro ou fora da moldura.",
        "O melhor uso de profiling aqui é localizar o peso real do handler dentro do round trip, em vez de assumir que ele explica tudo.",
      ],
      [
        block("mistake", "Culpar sempre o JSON ou o roteador", "Esses custos existem, mas frequentemente são menores do que dependência, pool ruim ou espera remota."),
      ],
    ),
    s(
      "httptrace",
      "Diagnóstico",
      "httptrace separa capítulos da latência no cliente",
      "Quando a chamada parece lenta, `httptrace` ajuda a descobrir se a espera está em DNS, conexão, handshake, reuso ou primeiro byte.",
      undefined,
      undefined,
      [
        "O pacote `net/http/httptrace` fornece hooks para etapas do ciclo de requisição no cliente. Isso permite responder perguntas muito específicas, como 'houve reuso de conexão?' ou 'o primeiro byte demorou por causa do servidor ou da conexão?'.",
        "Esse tipo de visibilidade é valioso porque transforma latência monolítica em sequência explicável. Em vez de dizer 'a API externa está lenta', você consegue dizer 'a conexão não está sendo reutilizada' ou 'o tempo está concentrado antes do primeiro byte'.",
        "Em engenharia de performance, essa decomposição vale ouro: ela evita consertar a peça errada da máquina.",
      ],
      [
        block("definition", "First byte", "Momento em que os cabeçalhos da resposta começam a ficar disponíveis para o cliente."),
        block("insight", "Diagnóstico bom reduz escopo", "Quanto mais cedo você separa as etapas, menor a chance de atacar o lugar errado."),
      ],
    ),
    s(
      "carga-e-backpressure",
      "Escala",
      "Sob carga, performance e proteção operacional se tornam a mesma conversa",
      "Pools, limites, timeouts e capacidade de cancelar cedo evitam que o sistema amplifique sua própria degradação.",
      undefined,
      "go-http-load-posture-dial",
      [
        "Em tráfego leve, más escolhas podem ficar invisíveis. Quando a carga cresce, aquilo que parecia detalhe — reuso de conexão, fila interna, saturação de dependências, cliente sem timeout — passa a definir a saúde do serviço.",
        "É nesse ponto que backpressure deixa de ser conceito bonito e vira política concreta: quantas requisições aceitar, por quanto tempo esperar, quando desistir e como preservar o processo para continuar útil.",
        "Performance de rede madura não busca só o máximo throughput possível; busca throughput sustentável com latência e falha previsíveis.",
      ],
      [
        block("insight", "Cauda longa destrói UX", "Sob pico, o que mata a experiência muitas vezes é a explosão das piores requisições, não da média."),
      ],
    ),
    s(
      "erros-comuns",
      "Armadilhas",
      "Os erros mais comuns são silenciosos: o serviço funciona, mas trabalha caro",
      "Transports descartáveis, ausência de timeout, falta de observabilidade e higiene ruim de `Body` sabotam eficiência ao longo do tempo.",
      "go-net-http-performance-summary",
      undefined,
      [
        "Muitas falhas de `net/http` são traiçoeiras porque não derrubam o processo imediatamente. Elas apenas removem reuso, aumentam espera, escondem vazamentos de recurso ou dificultam identificar onde a latência realmente está nascendo.",
        "Entre elas, uma das mais específicas da API do cliente é esquecer que a conexão persistente só volta ao pool quando o fluxo de resposta foi tratado corretamente. Fechar cedo demais ou abandonar `Body` no meio pode impedir o reaproveitamento daquela conexão.",
        "Isso explica por que times experientes tratam `Transport`, `Client`, contexto e observabilidade como parte do design de serviço, e não como detalhe de biblioteca.",
        "Em resumo: HTTP performático é mais disciplina de sistema do que truque de framework.",
      ],
      [
        block("mistake", "Operar no escuro", "Sem tracing de request, métricas e profiles, a pilha HTTP parece um bloco indistinto."),
        block("mistake", "Deixar tudo no default sem pergunta", "Defaults ajudam a começar; operar em produção exige entender se eles servem ao seu padrão de carga."),
      ],
    ),
    s(
      "quiz-revisao",
      "Revisão",
      "Quiz de revisão",
      "Teste sua leitura sobre `Transport`, reuso, timeouts e decomposição de latência.",
      undefined,
      "quiz",
      ["O foco é ligar configuração, comportamento sob carga e diagnóstico prático."],
      [],
    ),
    s(
      "glossario",
      "Vocabulário",
      "Glossário essencial",
      "Consolide os principais termos que aparecem em tuning e observabilidade HTTP em Go.",
      undefined,
      "glossary",
      ["Esses conceitos reaparecem em APIs, gateways, scrapers, workers e serviços internos."],
      [],
    ),
  ],
  summaryCards: [
    { title: "HTTP é cadeia de custos", body: "DNS, conexão, TLS, handler e resposta somam a latência real." },
    { title: "Transport precisa viver", body: "Reutilizar `http.Client` e, principalmente, `Transport` preserva pooling, handshakes e política coerente." },
    { title: "Timeout protege capacidade", body: "Sem limites, falha remota vira custo local espalhado." },
    { title: "Transport é alavanca", body: "Pool e keep-alive mudam throughput, cauda e custo de rede." },
    { title: "httptrace reduz adivinhação", body: "Ele separa capítulos internos da latência do cliente." },
    { title: "Carga revela defaults ruins", body: "O que parecia pequeno em tráfego leve vira gargalo sob pressão." },
  ],
  quiz: [
    q(
      "q1",
      "Qual ideia resume melhor a latência HTTP?",
      "Ela resulta de várias etapas, e não apenas do código do handler.",
      "Ela é definida quase sempre pela serialização JSON.",
      "Ela depende só do número de goroutines.",
      "a",
      "DNS, conexão, TLS, aplicação e resposta podem pesar de formas muito diferentes.",
    ),
    q(
      "q2",
      "Qual anti-pattern prejudica mais claramente o pooling HTTP em Go?",
      "Recriar `Transport` ou a pilha de cliente sem reutilização coerente entre chamadas.",
      "Instanciar `http.Client` sempre desativa keep-alive, mesmo quando o `Transport` é compartilhado.",
      "Pooling depende só do handler do servidor, não do cliente.",
      "a",
      "O estado de conexão em cache mora no `Transport`; recriá-lo sem necessidade aumenta dials, handshakes e dispersa configuração.",
    ),
    q(
      "q3",
      "Qual é o papel de `Transport` no cliente HTTP?",
      "Gerenciar conexões, keep-alive, proxy, TLS e detalhes do round trip.",
      "Substituir o handler do servidor.",
      "Executar garbage collection durante a resposta.",
      "a",
      "Boa parte da eficiência do cliente mora justamente nessa camada.",
    ),
    q(
      "q4",
      "Por que timeout é também tema de performance?",
      "Porque requisições penduradas consomem capacidade e pioram a latência do resto do sistema.",
      "Porque timeout sempre acelera cada requisição individual.",
      "Porque elimina a necessidade de retry e observabilidade.",
      "a",
      "Limitar espera ajuda a preservar recursos compartilhados.",
    ),
    q(
      "q5",
      "Quando `httptrace` é especialmente útil?",
      "Quando você precisa decompor a latência do cliente em etapas como DNS, conexão e primeiro byte.",
      "Quando quer substituir o `pprof` do processo.",
      "Quando precisa roteamento HTTP no servidor.",
      "a",
      "Ele permite fazer perguntas muito mais específicas sobre o round trip.",
    ),
    q(
      "q6",
      "Qual é um erro comum ao investigar APIs lentas?",
      "Culpar o handler sem distinguir custos de transporte e dependências remotas.",
      "Usar contexto no request.",
      "Medir reuso de conexão.",
      "a",
      "Sem decomposição, a camada errada vira suspeita padrão.",
    ),
    q(
      "q7",
      "O que muda quando a carga cresce?",
      "Pool, limites, backpressure e cancelamento passam a definir estabilidade e cauda de latência.",
      "O `net/http` deixa de reutilizar conexões por design.",
      "Handlers deixam de executar em Go.",
      "a",
      "Sob pressão, defaults e decisões implícitas ficam muito mais visíveis.",
    ),
    q(
      "q8",
      "Qual frase resume melhor performance HTTP madura?",
      "Ela trata cliente, transporte, servidor e observabilidade como um sistema único.",
      "Ela foca apenas em reduzir alocação do handler.",
      "Ela ignora timeouts para priorizar throughput.",
      "a",
      "Otimização localizada ajuda, mas a visão sistêmica é o que sustenta o ganho real.",
    ),
  ],
  glossary: [
    g("Round trip", "Ciclo completo entre enviar a requisição e ter a resposta disponível."),
    g("Transport", "Camada do cliente HTTP responsável por conexão, pooling, TLS e políticas de round trip."),
    g("Keep-alive", "Reaproveitamento de conexões para múltiplas requisições."),
    g("Idle connection", "Conexão ociosa pronta para ser reutilizada."),
    g("Timeout", "Limite de tempo para uma operação HTTP continuar tentando produzir resultado."),
    g("httptrace", "Pacote do Go que expõe hooks para etapas internas da requisição HTTP no cliente."),
    g("First byte", "Primeiro momento em que a resposta do servidor começa a chegar ao cliente."),
    g("Backpressure", "Mecanismo de conter ou modular demanda para preservar estabilidade."),
    g("Tail latency", "Comportamento das requisições mais lentas, não apenas da média."),
    g("Pooling", "Reuso e gestão de recursos, como conexões, para reduzir custo por operação."),
    g("Handler", "Função do servidor responsável por processar uma requisição HTTP."),
  ],
};

export const goContextCancelamentoVisuals = buildComputacaoVisuals({
  hero: {
    id: "go-context-cancelamento-hero",
    title: "Go: context e Cancelamento",
    subtitle: "Parar cedo também é performance: deadlines, cancel e propagação de intenção.",
    chips: ["context", "cancel", "deadline", "Done", "propagação"],
  },
  map: {
    id: "go-context-cancelamento-map",
    title: "Como uma intenção de cancelar atravessa o sistema",
    items: [
      { label: "Request", detail: "origem do trabalho" },
      { label: "Context", detail: "limites e sinal" },
      { label: "Goroutines", detail: "trabalho derivado" },
      { label: "Dependências", detail: "HTTP, DB, filas" },
      { label: "Encerramento", detail: "liberar recursos" },
    ],
    caption: "cancelamento bem propagado reduz desperdício e melhora a saúde global do processo",
  },
  summary: {
    id: "go-context-cancelamento-summary",
    title: "Três perguntas para auditar o uso de `context`",
    panels: [
      {
        label: "Toda operação longa escuta `Done`?",
        body: "Sem isso, o cancelamento para no papel e o trabalho continua vazando.",
      },
      {
        label: "Quem cria timeout também chama `cancel`?",
        body: "Liberar timers e referências é parte do contrato do contexto derivado.",
      },
      {
        label: "Os valores em contexto são mesmo request-scoped?",
        body: "Usar `context.Value` como mala genérica de dependências costuma degradar clareza.",
      },
    ],
    footer: "context bem usado expressa intenção de vida útil; mal usado espalha acoplamento invisível",
  },
}) satisfies LessonModule["visuals"];

export const goContextCancelamentoInteractions = buildComputacaoInteractions({
  flow: {
    id: "go-context-propagation-flow",
    eyebrow: "Propagação",
    title: "Siga o cancelamento da borda até as dependências",
    description:
      "Use o fluxo para visualizar por que `context` existe: conectar vida útil, não transportar dados arbitrários.",
    tone: "indigo",
    icon: "Workflow",
    stages: [
      {
        label: "Receber contexto",
        detail:
          "Uma requisição, job ou operação recebe um contexto pai que representa a vida útil daquele trabalho.",
        cue: "quem pediu isso?",
      },
      {
        label: "Derivar limites",
        detail:
          "Se necessário, a operação cria filhos com `WithCancel`, `WithTimeout` ou `WithDeadline`.",
        cue: "até quando vale?",
      },
      {
        label: "Propagar adiante",
        detail:
          "Chamadas HTTP, consultas a banco e goroutines derivadas recebem o contexto para partilhar o mesmo destino.",
        cue: "não perca o sinal",
      },
      {
        label: "Escutar `Done`",
        detail:
          "O trabalho interno verifica `ctx.Done()` e retorna cedo quando o resultado deixou de importar.",
        cue: "pare sem desperdiçar",
      },
      {
        label: "Liberar recursos",
        detail:
          "Quem criou o contexto derivado chama `cancel` para fechar o ciclo e soltar timers e referências.",
        cue: "encerrar direito",
      },
    ],
  },
  compare: {
    id: "go-context-primitives-compare",
    eyebrow: "Primitivas",
    title: "Compare `WithCancel`, `WithTimeout` e `WithDeadline`",
    description:
      "Os três derivam contexto, mas comunicam intenções temporais diferentes sobre o trabalho.",
    tone: "violet",
    icon: "ArrowRightLeft",
    options: [
      {
        label: "WithCancel",
        headline: "Quando você quer cancelar explicitamente por decisão da aplicação",
        bullets: [
          "Ótimo para encerrar fan-out redundante, workers auxiliares e goroutines transitórias.",
          "Expressa uma vida útil controlada por evento lógico, não por relógio.",
          "Continua exigindo `cancel` para liberar recursos associados ao contexto derivado.",
        ],
      },
      {
        label: "WithTimeout",
        headline: "Quando a operação não deve ultrapassar uma duração máxima relativa",
        bullets: [
          "Excelente para chamadas remotas e sub-operações com orçamento temporal conhecido.",
          "Ajuda a transformar espera infinita em contrato observável e monitorável.",
          "Exige cuidado para não empilhar timeouts arbitrários e incompatíveis.",
        ],
      },
      {
        label: "WithDeadline",
        headline: "Quando há um instante limite explícito compartilhado por várias etapas",
        bullets: [
          "Útil quando o orçamento precisa ser alinhado a uma data/hora absoluta.",
          "Facilita cascatas coerentes em pipelines que já nascem com prazo conhecido.",
          "Tende a ser menos comum no dia a dia do que `WithTimeout`, mas expressa melhor certos contratos.",
        ],
      },
    ],
  },
  slider: {
    id: "go-context-discipline-dial",
    eyebrow: "Disciplina",
    title: "Ajuste a maturidade do uso de `context` no sistema",
    description:
      "O mesmo pacote pode ser usado como ferramenta elegante de vida útil ou como depósito caótico de dependências e timeouts arbitrários.",
    tone: "emerald",
    icon: "BarChart3",
    axisLabel: "Postura de cancelamento",
    states: [
      {
        label: "Cancelamento nominal",
        summary:
          "O código passa `context` por assinatura, mas boa parte do trabalho interno não escuta `Done` nem fecha bem seus recursos.",
        leftLabel: "Aparência de integração",
        leftValue: 78,
        rightLabel: "Efetividade real",
        rightValue: 28,
        takeaway:
          "Aqui o pacote está presente no desenho, mas ainda não governa a vida útil do sistema de forma convincente.",
        metrics: [
          { label: "Goroutine leak", value: "provável" },
          { label: "Clareza", value: "média" },
          { label: "Cancelamento real", value: "fraco" },
          { label: "Context.Value", value: "abusado" },
        ],
      },
      {
        label: "Propagação consistente",
        summary:
          "Chamadas importantes recebem o contexto, escutam cancelamento e usam timeouts com razoável coerência.",
        leftLabel: "Clareza semântica",
        leftValue: 72,
        rightLabel: "Efetividade real",
        rightValue: 72,
        takeaway:
          "É o estágio em que `context` já começa a economizar recursos e simplificar raciocínio operacional.",
        metrics: [
          { label: "Goroutine leak", value: "menos comum" },
          { label: "Clareza", value: "boa" },
          { label: "Cancelamento real", value: "bom" },
          { label: "Timeouts", value: "razoáveis" },
        ],
      },
      {
        label: "Vida útil bem modelada",
        summary:
          "Contexto, deadlines, cancelamento e observabilidade contam a mesma história sobre quando o trabalho deve existir.",
        leftLabel: "Saúde operacional",
        leftValue: 90,
        rightLabel: "Desperdício evitado",
        rightValue: 88,
        takeaway:
          "Nesse ponto, cancelar cedo deixa de ser detalhe e vira propriedade sistêmica do serviço.",
        metrics: [
          { label: "Goroutine leak", value: "raro" },
          { label: "Clareza", value: "forte" },
          { label: "Cancelamento real", value: "alto" },
          { label: "Budget temporal", value: "coerente" },
        ],
      },
    ],
  },
}) satisfies LessonModule["interactions"];

export const goContextCancelamentoContent: LessonContent = {
  id: "go-context-cancelamento",
  title: "Go: context e Cancelamento",
  subtitle:
    "Context em Go não existe para carregar qualquer coisa: ele existe para propagar intenção de vida útil, cancelamento e deadline através do trabalho concorrente.",
  description:
    "Aula sobre `context.Context`, `Done`, `WithCancel`, `WithTimeout`, `WithDeadline`, integração com HTTP e banco, prevenção de goroutine leak e erros comuns no uso de valores em contexto.",
  primaryCategoryId: "computacao",
  secondaryCategoryId: "engenharia",
  level: "Intermediário",
  estimatedTime: "50-65 min",
  tags: ["Go", "context", "Cancelamento", "Deadline", "HTTP", "Goroutines", "Performance"],
  learningObjectives: [
    "Entender `context` como mecanismo de vida útil e propagação de cancelamento.",
    "Distinguir `WithCancel`, `WithTimeout` e `WithDeadline` por intenção semântica.",
    "Usar `Done` para evitar trabalho inútil e vazamento de goroutines.",
    "Relacionar contexto a requests HTTP, queries de banco e fan-out concorrente.",
    "Evitar abuso de `context.Value` como contêiner genérico de dependências.",
    "Melhorar o desenho temporal do sistema a partir de deadlines e encerramento disciplinado.",
  ],
  prerequisites: [
    "Noção básica de goroutines e channels.",
    "Experiência simples com funções HTTP em Go ajuda.",
    "Interesse por resiliência e coordenação entre operações.",
  ],
  references: [
    ref(
      "context package",
      "Go Packages",
      "https://pkg.go.dev/context",
      "Referência oficial do pacote, incluindo contrato de cancelamento e uso de `CancelFunc`.",
    ),
    ref(
      "Go Concurrency Patterns: Context",
      "Go Blog",
      "https://go.dev/blog/context",
      "Texto clássico sobre motivação e padrão de uso de `context`.",
    ),
    ref(
      "Canceling in-progress operations",
      "Go",
      "https://go.dev/doc/database/cancel-operations",
      "Guia oficial prático para cancelamento de operações em andamento com `Context`.",
    ),
    ref(
      "net/http package",
      "Go Packages",
      "https://pkg.go.dev/net/http",
      "Importante para entender `Request.Context()` e integração com ciclo de vida HTTP.",
    ),
    ref(
      "Diagnostics",
      "Go",
      "https://go.dev/doc/diagnostics",
      "Útil para relacionar cancelamento, tracing e depuração operacional em programas Go.",
    ),
  ],
  heroVisual: "go-context-cancelamento-hero",
  openingText:
    "Em sistemas concorrentes, uma operação que já não importa mas continua rodando é custo puro: ocupa goroutines, timers, conexões, memória e atenção diagnóstica. O pacote `context` existe para que essa percepção viaje junto com o trabalho. Ele não resolve todo o desenho de concorrência, mas oferece uma linguagem comum para dizer 'esse trabalho ainda faz sentido?' e para fazer o resto do sistema responder a essa pergunta.",
  quickFacts: [
    {
      title: "Cancelar cedo economiza",
      body: "Menos trabalho inútil significa menos pressão sobre CPU, memória e dependências.",
    },
    {
      title: "Contexto é árvore",
      body: "Filhos herdam cancelamento e prazos do pai, o que ajuda a alinhar vida útil.",
    },
    {
      title: "Done é contrato",
      body: "Se a função ignora `Done`, o cancelamento não produz efeito real.",
    },
    {
      title: "Value não é mochila sem fundo",
      body: "Valores em contexto devem ser request-scoped e usados com parcimônia.",
    },
  ],
  sections: [
    s(
      "por-que-cancelar",
      "Motivação",
      "Sem cancelamento, trabalho inútil continua consumindo o sistema",
      "Uma resposta que o usuário abandonou ou um job cuja janela expirou não deveriam continuar custando como se ainda fossem valiosos.",
      "go-context-cancelamento-map",
      undefined,
      [
        "Imagine uma requisição HTTP cancelada pelo cliente, mas cujo handler continua chamando outras APIs, consultando banco e montando resposta inteira. Do ponto de vista semântico, esse trabalho morreu; do ponto de vista operacional, ele ainda está vivo e gastando.",
        "Esse desencontro é exatamente o que `context` ajuda a evitar. Ele permite que uma intenção de cancelamento ou prazo limite viaje pelo sistema para que as partes relevantes possam encerrar cedo.",
        "Em cargas reais, isso melhora não só eficiência, mas a saúde global do processo: menos acúmulo de tarefas inúteis significa mais espaço para trabalho útil.",
      ],
      [
        block("definition", "Cancelamento cooperativo", "Estratégia em que as funções verificam sinais de cancelamento e encerram seu trabalho voluntariamente."),
        block("insight", "Parar cedo também é otimizar", "Performance não é só fazer rápido; é evitar fazer o desnecessário."),
      ],
    ),
    s(
      "arvore-de-contextos",
      "Modelo",
      "Contextos derivados formam uma árvore de vida útil",
      "O contexto pai representa uma operação maior; os filhos refinam limites ou escopo sem quebrar a relação com a origem.",
      undefined,
      "go-context-propagation-flow",
      [
        "Um `Context` pode gerar filhos com `WithCancel`, `WithTimeout` ou `WithDeadline`. Esses filhos herdam o cancelamento do pai e podem ainda ser encerrados antes, o que cria uma hierarquia natural da operação principal para suas subetapas.",
        "Esse desenho é poderoso porque transforma vida útil em estrutura. Um request HTTP pode ser o pai; a chamada a banco, o filho com timeout mais curto; um fan-out para múltiplos serviços, vários filhos que compartilham a mesma origem.",
        "A grande ideia é que os limites deixam de estar escondidos em detalhes locais e passam a ser parte explícita da assinatura do trabalho.",
      ],
      [
        block("definition", "Contexto derivado", "Novo contexto que herda cancelamento e possivelmente adiciona novos limites ao contexto pai."),
      ],
    ),
    s(
      "withcancel-timeout-deadline",
      "Primitivas",
      "As formas de derivar contexto comunicam intenções diferentes",
      "Nem todo encerramento acontece porque 'o tempo acabou'; às vezes a aplicação simplesmente decidiu parar.",
      undefined,
      "go-context-primitives-compare",
      [
        "`WithCancel` é útil quando o encerramento depende de um evento lógico: a primeira resposta útil chegou, o cliente desistiu, um job pai falhou ou o sistema decidiu abortar o fan-out restante.",
        "`WithTimeout` e `WithDeadline` entram quando o próprio tempo vira contrato explícito. Eles ajudam a impedir esperas indefinidas e a manter o orçamento temporal coerente entre etapas dependentes.",
        "O mais importante é não tratar esses construtores como superstição. Cada um existe para expressar uma história diferente sobre a vida útil da operação.",
      ],
      [
        block("mistake", "Empilhar timeouts arbitrários", "Vários timeouts desconexos podem tornar o fluxo imprevisível e difícil de diagnosticar."),
      ],
    ),
    s(
      "done-e-select",
      "Mecânica",
      "Escutar `Done` é o momento em que o cancelamento deixa de ser decorativo",
      "O canal `Done` fecha quando o contexto termina, e funções cooperativas precisam reagir a isso.",
      undefined,
      undefined,
      [
        "A forma idiomática de observar cancelamento em Go costuma envolver `select` com `<-ctx.Done()`. Isso vale para loops, workers, chamadas bloqueantes embrulhadas e operações que produzem dados progressivamente.",
        "Sem esse ponto de escuta, o contexto pode até ser passado por assinatura, mas não governa o comportamento real da função. Em outras palavras: o cancelamento existe no design, mas não no runtime.",
        "Esse padrão também ajuda a evitar goroutine leaks. Uma goroutine que espera para sempre em um canal ou continua gerando trabalho sem alguém consumir o resultado é, na prática, um vazamento de vida útil.",
      ],
      [
        block("definition", "Goroutine leak", "Goroutine que continua existindo e consumindo recursos além do tempo útil da operação."),
        block("example", "Producer que gera indefinidamente", "Sem observar `Done`, ele pode continuar produzindo mesmo depois que ninguém mais lerá sua saída."),
      ],
    ),
    s(
      "http-db-dependencias",
      "Integração",
      "O contexto fica realmente valioso quando atravessa fronteiras de processo e I/O",
      "HTTP, banco de dados e chamadas internas ganham um contrato comum para desistir de trabalho sem valor.",
      undefined,
      undefined,
      [
        "Em servidores HTTP, o `Request.Context()` já representa a vida útil daquela requisição. Ao propagá-lo para consultas, RPCs e goroutines auxiliares, você faz as dependências herdarem a mesma noção de utilidade.",
        "O mesmo vale para operações de banco com `QueryContext` e parentes. Se a requisição foi cancelada ou se o orçamento temporal acabou, a dependência recebe o mesmo sinal e pode encerrar seu trabalho mais cedo.",
        "Isso cria um sistema mais coerente: o pedido do usuário, o handler e as dependências concordam sobre quando o trabalho ainda faz sentido existir.",
      ],
      [
        block("insight", "Context une fronteiras", "Ele funciona como fio temporal que costura etapas distribuídas sob a mesma operação lógica."),
      ],
    ),
    s(
      "cancel-func",
      "Higiene",
      "Quem cria contexto derivado também precisa encerrá-lo explicitamente",
      "Chamar `cancel` não é burocracia; é parte do contrato para soltar timers e referências.",
      undefined,
      "go-context-discipline-dial",
      [
        "A documentação oficial é enfática: ao criar um contexto com cancelamento ou timeout, você deve chamar a `CancelFunc` assim que a operação terminar. Isso libera recursos associados e evita manter a árvore viva por mais tempo do que o necessário.",
        "Na prática, isso geralmente aparece como um `defer cancel()` logo após a criação, exceto em fluxos com controle mais fino. O ponto conceitual é simples: quem abriu a vida útil refinada é responsável por fechá-la.",
        "Essa disciplina parece pequena, mas faz diferença em processos vivos, especialmente quando muitas operações curtas criam timers e subcontextos o tempo todo.",
      ],
      [
        block("mistake", "Criar timeout e nunca chamar cancel", "O código pode até funcionar, mas mantém recursos associados vivos por mais tempo que o desejado."),
      ],
    ),
    s(
      "values-com-criterio",
      "Escopo",
      "`context.Value` não foi feito para virar contêiner genérico de aplicação",
      "Valores em contexto devem ser poucos, request-scoped e semanticamente ligados ao percurso da operação.",
      undefined,
      undefined,
      [
        "Um uso razoável de `context.Value` envolve metadados request-scoped, como IDs de correlação ou informações que realmente viajam com a operação entre camadas. O abuso começa quando ele vira depósito de logger, repositório, config e dependências arbitrárias.",
        "Esse antipadrão piora testabilidade, dificulta leitura de assinaturas e esconde acoplamento. O código compila, mas a arquitetura fica mais opaca.",
        "A heurística útil é: se o dado não descreve o contexto daquela operação e sua propagação, provavelmente não deveria morar em `context.Value`.",
      ],
      [
        block("mistake", "Service locator disfarçado", "Usar `context` para carregar dependências estruturais da aplicação corrói clareza arquitetural."),
      ],
    ),
    s(
      "observabilidade-e-erros",
      "Operação",
      "Cancelamento também precisa aparecer com semântica clara na observabilidade",
      "Saber se a operação expirou, foi cancelada pelo cliente ou falhou por outra razão melhora diagnóstico e política de retry.",
      "go-context-cancelamento-summary",
      undefined,
      [
        "Quando uma função retorna por `ctx.Err()`, isso informa algo importante ao restante do sistema: o trabalho foi encerrado por cancelamento ou deadline, não por erro funcional interno. Essa distinção orienta logs, métricas e reação da camada superior.",
        "Sem essa leitura, timeouts e cancelamentos podem parecer falhas arbitrárias, quando na verdade são parte esperada do contrato temporal do sistema.",
        "Do ponto de vista operacional, contexto bem usado reduz ruído: você consegue distinguir serviço lento, cliente que desistiu e sub-operação que passou do orçamento.",
      ],
      [
        block("insight", "Erro também comunica política", "Saber por que a operação parou muda decisão de retry, log e alerta."),
      ],
    ),
    s(
      "quiz-revisao",
      "Revisão",
      "Quiz de revisão",
      "Teste sua intuição sobre propagação, `Done`, timeout e bom uso de `context`.",
      undefined,
      "quiz",
      ["A meta é conectar vida útil de operação, ergonomia de API e saúde do sistema."],
      [],
    ),
    s(
      "glossario",
      "Vocabulário",
      "Glossário essencial",
      "Consolide os termos que aparecem o tempo todo em serviços Go bem comportados.",
      undefined,
      "glossary",
      ["Esses conceitos atravessam HTTP, banco, filas, tracing e concorrência interna."],
      [],
    ),
  ],
  summaryCards: [
    { title: "Context modela vida útil", body: "Ele responde quando o trabalho ainda faz sentido existir." },
    { title: "Cancelamento é cooperativo", body: "A função precisa escutar `Done` para que o sinal tenha efeito." },
    { title: "Derivação cria árvore", body: "Filhos herdam limites do pai e podem refiná-los." },
    { title: "Timeout economiza capacidade", body: "Esperas infinitas viram custo espalhado para todo o processo." },
    { title: "CancelFunc é parte do contrato", body: "Quem cria o contexto derivado também precisa encerrá-lo." },
    { title: "Value pede parcimônia", body: "Use apenas para dados request-scoped realmente ligados à operação." },
  ],
  quiz: [
    q(
      "q1",
      "Qual é o papel principal de `context.Context`?",
      "Propagar cancelamento, deadlines e dados request-scoped entre fronteiras de API.",
      "Substituir qualquer parâmetro de função.",
      "Guardar dependências globais do serviço.",
      "a",
      "O pacote existe para modelar vida útil e contexto de operação, não para carregar tudo.",
    ),
    q(
      "q2",
      "Quando `Done` fecha?",
      "Quando o contexto é cancelado, expira ou herda cancelamento do pai.",
      "Somente quando a goroutine morre.",
      "Apenas ao final do processo.",
      "a",
      "Esse fechamento sinaliza que o trabalho deveria abandonar sua execução o quanto antes.",
    ),
    q(
      "q3",
      "Por que chamar `cancel` após criar um contexto derivado é importante?",
      "Porque isso libera recursos associados e fecha corretamente o ciclo de vida do contexto.",
      "Porque sem isso o compilador não permite `select`.",
      "Porque `WithTimeout` não dispara sozinho.",
      "a",
      "A documentação oficial destaca esse contrato explicitamente.",
    ),
    q(
      "q4",
      "Quando `WithCancel` costuma ser mais adequado?",
      "Quando o encerramento depende de uma decisão lógica da aplicação, e não só de relógio.",
      "Quando qualquer operação precisa de data absoluta.",
      "Quando não existe trabalho concorrente.",
      "a",
      "Ele expressa cancelamento explícito por evento semântico.",
    ),
    q(
      "q5",
      "Qual é o risco de ignorar `ctx.Done()`?",
      "Continuar gastando recursos em trabalho que já não importa, inclusive vazando goroutines.",
      "Aumentar automaticamente a prioridade da goroutine.",
      "Perder acesso a `context.Value`.",
      "a",
      "Sem escutar o sinal, o cancelamento não gera efeito real.",
    ),
    q(
      "q6",
      "Como `context` ganha mais valor prático?",
      "Quando atravessa HTTP, banco, goroutines e dependências com a mesma noção de vida útil.",
      "Quando fica preso apenas ao handler externo.",
      "Quando é usado só para logs.",
      "a",
      "A potência aparece justamente na propagação de limites entre etapas conectadas.",
    ),
    q(
      "q7",
      "Qual é um mau uso clássico de `context.Value`?",
      "Transformá-lo em contêiner genérico de dependências da aplicação.",
      "Levar um request id entre camadas.",
      "Associá-lo a uma operação HTTP.",
      "a",
      "Isso esconde acoplamento e degrada clareza arquitetural.",
    ),
    q(
      "q8",
      "Por que distinguir cancelamento de outros erros na observabilidade?",
      "Porque a razão do encerramento muda decisões de retry, logging e diagnóstico.",
      "Porque `ctx.Err()` nunca deveria ser registrado.",
      "Porque timeout significa sempre bug lógico.",
      "a",
      "Cancelamento e deadline são parte do contrato temporal, não necessariamente falha funcional.",
    ),
  ],
  glossary: [
    g("Context", "Estrutura que propaga cancelamento, deadline e valores request-scoped."),
    g("CancelFunc", "Função retornada ao derivar contextos canceláveis."),
    g("Deadline", "Instante absoluto a partir do qual o trabalho deixa de ser válido."),
    g("Timeout", "Janela relativa máxima de duração para uma operação."),
    g("Done", "Canal fechado quando o contexto é cancelado ou expira."),
    g("Contexto pai", "Contexto de origem a partir do qual outros podem ser derivados."),
    g("Contexto derivado", "Filho que herda cancelamento e adiciona novos limites."),
    g("Goroutine leak", "Goroutine que continua viva além do tempo útil da operação."),
    g("Request-scoped value", "Dado semanticamente ligado à operação atual e que viaja com ela."),
    g("Cancelamento cooperativo", "Modelo em que as funções observam o sinal e se encerram por conta própria."),
    g("Budget temporal", "Orçamento de tempo disponível para uma operação e suas subetapas."),
  ],
};

export const goVsRustQuandoUsarVisuals = buildComputacaoVisuals({
  hero: {
    id: "go-vs-rust-quando-usar-hero",
    title: "Go vs Rust: Quando Usar Cada Um",
    subtitle: "Escolha técnica baseada em trade-offs reais, não em torcida.",
    chips: ["GC", "ownership", "concorrência", "tooling", "trade-offs"],
  },
  map: {
    id: "go-vs-rust-quando-usar-map",
    title: "Eixos úteis para decidir entre Go, Rust e composição",
    items: [
      { label: "Latência", detail: "quanto varia?" },
      { label: "Memória", detail: "quem gerencia?" },
      { label: "Equipe", detail: "curva e ritmo" },
      { label: "Domínio", detail: "backend, sistema, edge" },
      { label: "Integração", detail: "uma ou várias linguagens?" },
    ],
    caption: "escolha madura compara restrições do problema com o modelo de cada linguagem",
  },
  summary: {
    id: "go-vs-rust-quando-usar-summary",
    title: "Três filtros contra guerra de linguagem",
    panels: [
      {
        label: "Qual risco mais dói aqui?",
        body: "Tail latency, bugs de memória, tempo de entrega ou complexidade operacional podem puxar a decisão em direções diferentes.",
      },
      {
        label: "O time sustenta o modelo escolhido?",
        body: "Ferramenta poderosa demais para a maturidade atual do time pode virar custo contínuo.",
      },
      {
        label: "Precisa ser tudo ou nada?",
        body: "Muitas arquiteturas ganham quando Go e Rust convivem em fronteiras bem escolhidas.",
      },
    ],
    footer: "escolher linguagem é alinhar propriedades do runtime, do domínio e da equipe ao tipo de risco que você aceita pagar",
  },
}) satisfies LessonModule["visuals"];

export const goVsRustQuandoUsarInteractions = buildComputacaoInteractions({
  flow: {
    id: "go-vs-rust-decision-flow",
    eyebrow: "Decisão",
    title: "Percorra um caminho equilibrado de escolha",
    description:
      "Antes de preferências pessoais, compare o problema, o time, o runtime e o custo de manutenção.",
    tone: "indigo",
    icon: "Workflow",
    stages: [
      {
        label: "Definir o problema",
        detail:
          "Backend de negócios, serviço interno, edge, CLI, agente, biblioteca crítica e runtime-level pedem pesos diferentes.",
        cue: "o que estamos construindo?",
      },
      {
        label: "Mapear riscos",
        detail:
          "Pergunte se o risco dominante é latência previsível, segurança de memória, prazo de entrega ou ergonomia operacional.",
        cue: "qual custo dói mais?",
      },
      {
        label: "Comparar modelos",
        detail:
          "Go traz GC, runtime forte e simplicidade operacional; Rust traz ownership, controle fino e garantias fortes em compile time.",
        cue: "que tipo de ajuda a linguagem oferece?",
      },
      {
        label: "Olhar a equipe",
        detail:
          "A melhor escolha técnica perde valor se o time não consegue sustentar o ritmo de aprendizado e revisão necessário.",
        cue: "quem vai manter isso?",
      },
      {
        label: "Aceitar composição",
        detail:
          "Nem toda arquitetura precisa escolher um único idioma. Às vezes a combinação é o ponto ótimo.",
        cue: "híbrido também é decisão",
      },
    ],
  },
  compare: {
    id: "go-vs-rust-position-compare",
    eyebrow: "Posicionamento",
    title: "Compare quando Go, Rust ou abordagem híbrida tendem a brilhar",
    description:
      "O valor está em entender onde cada caminho reduz risco de forma mais natural.",
    tone: "violet",
    icon: "ArrowRightLeft",
    options: [
      {
        label: "Go",
        headline: "Forte para serviços, produtividade, operação simples e concorrência pragmática",
        bullets: [
          "Excelente quando tempo de entrega, legibilidade e ecossistema de backend pesam bastante.",
          "GC e runtime simplificam muita engenharia cotidiana, ainda que introduzam trade-offs de memória e latência.",
          "Costuma ser ótima escolha para APIs, jobs, infraestrutura e ferramentas internas de serviço.",
        ],
      },
      {
        label: "Rust",
        headline: "Forte quando segurança de memória e controle fino são requisitos centrais do domínio",
        bullets: [
          "Brilha em componentes com exigência alta de previsibilidade, integridade e baixo custo runtime.",
          "Ownership e tipos deslocam muitas falhas para compile time, ao preço de curva de aprendizado maior.",
          "É especialmente atraente em sistemas, edge, componentes críticos e bibliotecas onde overhead importa muito.",
        ],
      },
      {
        label: "Híbrido",
        headline: "Combinação natural quando diferentes partes do sistema pedem propriedades diferentes",
        bullets: [
          "Go pode orquestrar serviços e integração enquanto Rust cuida de partes mais críticas em segurança ou eficiência.",
          "Essa abordagem exige boa definição de fronteiras, FFI ou protocolos claros.",
          "Nem sempre vale o custo, mas frequentemente evita decisões dogmáticas demais.",
        ],
      },
    ],
  },
  slider: {
    id: "go-vs-rust-constraint-dial",
    eyebrow: "Pressão dominante",
    title: "Ajuste qual restrição mais pesa no projeto",
    description:
      "Projetos diferentes mudam o peso relativo de produtividade, previsibilidade, controle de memória e ergonomia do time.",
    tone: "emerald",
    icon: "BarChart3",
    axisLabel: "Tipo de pressão",
    states: [
      {
        label: "Entrega e simplicidade",
        summary:
          "A principal dor é construir, operar e iterar serviços com rapidez e clareza em um time de engenharia mais amplo.",
        leftLabel: "Vantagem de Go",
        leftValue: 88,
        rightLabel: "Valor de controle fino",
        rightValue: 34,
        takeaway:
          "Aqui Go frequentemente oferece o melhor custo-benefício sistêmico, desde que os trade-offs de runtime caibam no SLA.",
        metrics: [
          { label: "Curva do time", value: "mais suave" },
          { label: "Velocidade inicial", value: "alta" },
          { label: "Controle low-level", value: "moderado" },
          { label: "Operação de serviços", value: "forte" },
        ],
      },
      {
        label: "Equilíbrio pragmático",
        summary:
          "O projeto precisa de boa produtividade, mas também começa a sentir custos mais duros de memória, latência e hotspots críticos.",
        leftLabel: "Valor de Go",
        leftValue: 64,
        rightLabel: "Valor de Rust",
        rightValue: 66,
        takeaway:
          "Esse é o território em que a resposta mais madura muitas vezes é modular: escolher por componente e não por ideologia.",
        metrics: [
          { label: "Curva do time", value: "importa muito" },
          { label: "Latência", value: "relevante" },
          { label: "Composição", value: "atraente" },
          { label: "FFI/protocolos", value: "avaliar" },
        ],
      },
      {
        label: "Controle e previsibilidade",
        summary:
          "Bugs de memória, custos runtime e previsibilidade sob restrições duras pesam mais do que simplicidade imediata.",
        leftLabel: "Pressão por garantias",
        leftValue: 90,
        rightLabel: "Vantagem de Rust",
        rightValue: 92,
        takeaway:
          "Nessa faixa, Rust costuma ganhar apelo porque o modelo de ownership e o controle de baixo nível reduzem classes inteiras de risco.",
        metrics: [
          { label: "Curva do time", value: "mais íngreme" },
          { label: "Controle runtime", value: "alto" },
          { label: "Segurança de memória", value: "muito forte" },
          { label: "Tail latency", value: "mais previsível em muitos casos" },
        ],
      },
    ],
  },
}) satisfies LessonModule["interactions"];

export const goVsRustQuandoUsarContent: LessonContent = {
  id: "go-vs-rust-quando-usar",
  title: "Go vs Rust: Quando Usar Cada Um",
  subtitle:
    "A comparação útil entre Go e Rust não pergunta qual linguagem é 'melhor', mas qual modelo reduz melhor o risco dominante do seu problema.",
  description:
    "Aula comparativa sobre Go e Rust focada em runtime, GC, ownership, concorrência, tooling, custo de equipe e cenários em que uma escolha ou uma abordagem híbrida tende a ser mais adequada.",
  primaryCategoryId: "computacao",
  secondaryCategoryId: "engenharia",
  level: "Intermediário",
  estimatedTime: "55-70 min",
  tags: ["Go", "Rust", "GC", "Ownership", "Concorrência", "Trade-offs", "Engenharia"],
  learningObjectives: [
    "Comparar Go e Rust a partir de modelos de execução, não de slogans.",
    "Relacionar GC, ownership e runtime aos tipos de risco que cada projeto enfrenta.",
    "Entender como produtividade, ergonomia do time e previsibilidade operacional entram na decisão.",
    "Comparar a proposta de concorrência de Go com as garantias compile-time de Rust.",
    "Identificar cenários típicos em que Go, Rust ou composição híbrida fazem mais sentido.",
    "Evitar evangelismo técnico e decisões motivadas apenas por moda.",
  ],
  prerequisites: [
    "Noção básica de backend, concorrência e memória.",
    "Alguma familiaridade superficial com Go ou Rust ajuda, mas não é obrigatória.",
    "Interesse por trade-offs reais de linguagem e plataforma.",
  ],
  references: [
    ref(
      "A Guide to the Go Garbage Collector",
      "Go",
      "https://go.dev/doc/gc-guide",
      "Referência oficial para discutir trade-offs do GC do Go de forma técnica e equilibrada.",
    ),
    ref(
      "Documentation",
      "Go",
      "https://go.dev/doc/",
      "Página oficial com visão geral do ecossistema, filosofia e ferramentas do Go.",
    ),
    ref(
      "Diagnostics",
      "Go",
      "https://go.dev/doc/diagnostics",
      "Ajuda a ancorar a conversa sobre tooling e observabilidade do lado Go.",
    ),
    ref(
      "What is Ownership?",
      "The Rust Programming Language",
      "https://doc.rust-lang.org/stable/book/ch04-01-what-is-ownership.html",
      "Base oficial para discutir gestão de memória sem GC em Rust.",
    ),
    ref(
      "Fearless Concurrency",
      "The Rust Programming Language",
      "https://doc.rust-lang.org/book/ch16-00-concurrency.html",
      "Referência oficial para a proposta de concorrência segura em Rust.",
    ),
    ref(
      "Ownership and Lifetimes",
      "The Rustonomicon",
      "https://doc.rust-lang.org/nomicon/ownership.html",
      "Aprofunda implicações de ownership e segurança de memória em cenários mais exigentes.",
    ),
    ref(
      "Optimizing Build Performance",
      "The Cargo Book",
      "https://doc.rust-lang.org/cargo/guide/build-performance.html",
      "Útil para discutir o outro lado da moeda: custo e ergonomia do tooling e do ciclo de build em Rust.",
    ),
  ],
  heroVisual: "go-vs-rust-quando-usar-hero",
  openingText:
    "Comparar Go e Rust com honestidade é difícil justamente porque as duas linguagens atacam problemas reais, mas a partir de filosofias diferentes. Go tende a priorizar simplicidade estrutural, produtividade em sistemas concorrentes e um runtime com GC e tooling muito diretos. Rust tende a deslocar mais garantias para compile time, oferecendo forte segurança de memória e muito controle ao custo de uma curva cognitiva maior. A pergunta madura não é qual vence a discussão, e sim qual reduz melhor o risco que seu projeto realmente tem.",
  quickFacts: [
    {
      title: "Go compra simplicidade com runtime",
      body: "GC e runtime ajudam bastante, mas não são custo zero para todos os domínios.",
    },
    {
      title: "Rust compra controle com tipos",
      body: "Ownership e borrow checker transferem muitos problemas para a compilação.",
    },
    {
      title: "Equipe importa tanto quanto benchmark",
      body: "Uma linguagem só é boa se o time consegue mantê-la com qualidade.",
    },
    {
      title: "Híbrido é opção legítima",
      body: "Nem todo sistema precisa resolver todos os seus problemas com uma única linguagem.",
    },
  ],
  sections: [
    s(
      "anti-guerra-santa",
      "Premissa",
      "Comece pela natureza do problema, não pela identidade da linguagem",
      "Escolher entre Go e Rust faz mais sentido quando você explicita domínio, risco dominante e restrição operacional.",
      "go-vs-rust-quando-usar-map",
      undefined,
      [
        "Se o projeto é uma API interna, um agente de infraestrutura, um componente embarcado, uma biblioteca crítica de rede ou um serviço de dados com requisitos rígidos, o peso dos trade-offs muda completamente.",
        "Por isso, comparações genéricas do tipo 'X é sempre mais produtiva' ou 'Y é sempre mais rápida' quase não ajudam. A decisão útil precisa amarrar propriedade técnica a cenário concreto.",
        "Esse enquadramento já reduz metade do ruído: você deixa de discutir linguagem como identidade e passa a discutir linguagem como instrumento.",
      ],
      [
        block("definition", "Risco dominante", "Tipo de custo ou falha que mais ameaça o sucesso do projeto: prazo, bugs de memória, latência, operação ou manutenção."),
      ],
    ),
    s(
      "modelos-mentais",
      "Fundamento",
      "Go e Rust distribuem complexidade em lugares diferentes",
      "Go simplifica muito do uso cotidiano com runtime e GC; Rust exige mais do programador cedo para reduzir ambiguidade e custo depois.",
      undefined,
      "go-vs-rust-decision-flow",
      [
        "No Go, o runtime cuida de aspectos importantes como garbage collection, scheduling de goroutines e parte relevante do suporte operacional. Isso acelera a escrita de muito software de infraestrutura e backend.",
        "No Rust, ownership e borrowing colocam forte pressão semântica já na compilação. Em troca, muitas classes de bugs de memória e de concorrência incorreta são barradas antes de chegar em produção.",
        "Nenhuma dessas filosofias é gratuitamente superior. Elas deslocam custo entre implementação, operação, aprendizado e previsibilidade runtime.",
      ],
      [
        block("insight", "Toda linguagem escolhe onde cobrar", "A comparação útil é descobrir em que fase do projeto você prefere pagar mais: antes, durante ou depois."),
      ],
    ),
    s(
      "memoria-e-latencia",
      "Runtime",
      "GC versus ownership muda o perfil de custo e previsibilidade",
      "Go oferece conveniência valiosa com GC; Rust evita GC no modelo central e pode entregar mais controle sobre alocação e vida útil.",
      undefined,
      undefined,
      [
        "O GC do Go é um grande aliado de produtividade e segurança prática para a maioria dos serviços, mas ele introduz trade-offs reais de memória, alocação e comportamento runtime que precisam caber no SLA e no perfil de carga.",
        "Rust, por sua vez, usa ownership para liberar memória sem garbage collector no caminho principal. Isso pode tornar o perfil de latência e memória mais previsível em domínios sensíveis, embora aumente o custo cognitivo de modelagem de dados e referências.",
        "O ponto não é dizer que 'GC é ruim' ou que 'ownership resolve tudo'. É reconhecer que cada modelo facilita e dificulta partes diferentes da engenharia.",
      ],
      [
        block("definition", "Ownership", "Conjunto de regras que governa posse e vida útil de valores em Rust sem depender de GC tradicional."),
        block("mistake", "Fingir que runtime é detalhe", "Modelo de memória e execução influencia diretamente custo operacional e comportamento sob carga."),
      ],
    ),
    s(
      "concorrencia",
      "Paralelismo",
      "Go e Rust ajudam concorrência de jeitos diferentes",
      "Go privilegia ergonomia com goroutines e channels; Rust fortalece segurança compile-time com ownership, `Send` e `Sync`.",
      undefined,
      undefined,
      [
        "No Go, criar concorrência é barato mentalmente e sintaticamente. Goroutines e channels tornam natural estruturar pipelines, workers e serviços paralelos. O lado a vigiar é que data races e coordenação ruim continuam possíveis se o desenho for descuidado.",
        "No Rust, parte relevante da segurança concorrente vem de propriedades do tipo e do ownership. Muitas combinações perigosas simplesmente não compilam, o que reduz classes inteiras de bug em troca de uma modelagem mais exigente.",
        "De novo, há troca real: Go costuma reduzir atrito inicial; Rust costuma elevar a barra de garantia. A decisão depende de quão valiosa é cada coisa no seu contexto.",
      ],
      [
        block("example", "Serviços de backend", "Go costuma ser extremamente eficaz quando a concorrência principal é de requests, workers e I/O com boa observabilidade."),
        block("example", "Componentes críticos", "Rust ganha força quando a combinação de concorrência e segurança de memória precisa de garantia mais dura."),
      ],
    ),
    s(
      "tooling-e-ciclo",
      "Fluxo de trabalho",
      "Tooling e build também entram no custo total da linguagem",
      "A experiência do time com build, profiling, debug e feedback loop pesa tanto quanto a semântica do runtime.",
      undefined,
      undefined,
      [
        "Go é amplamente apreciado por um fluxo direto: `go test`, `pprof`, `race detector`, profiling e uma cultura forte de simplicidade operacional. Para muita engenharia de serviços, isso produz alta velocidade sustentada.",
        "Rust oferece tooling muito rico com Cargo e um ecossistema robusto, mas o custo de compilação, tuning de builds e complexidade geral do ciclo pode pesar mais dependendo do tamanho do projeto e do perfil da equipe.",
        "Isso não torna uma linguagem melhor que a outra; torna visível que tempo de feedback também é parte da arquitetura de produtividade.",
      ],
      [
        block("insight", "Build também é custo de engenharia", "Uma decisão de linguagem afeta não só o binário final, mas a rotina diária de desenvolvimento e revisão."),
      ],
    ),
    s(
      "equipe-e-dominio",
      "Organização",
      "A melhor linguagem técnica pode ser a pior linguagem organizacional — e vice-versa",
      "Capacidade do time, prazo, rotatividade, cultura de revisão e tipo de sistema influenciam o ponto ótimo.",
      undefined,
      undefined,
      [
        "Se você tem um time amplo de backend com demanda alta por APIs, jobs e serviços de negócio, Go frequentemente oferece excelente equilíbrio entre clareza, velocidade e operação. Em contextos com forte sensibilidade a memória, integridade e componentes mais sistêmicos, Rust pode reduzir risco estrutural de forma muito relevante.",
        "Também é preciso considerar manutenção. Uma solução brilhante em linguagem mais exigente perde valor se poucos conseguem revisá-la, evoluí-la ou depurá-la com segurança.",
        "A decisão madura, portanto, não separa linguagem de organização. Ela pergunta quem vai viver com esse código nos próximos anos.",
      ],
      [
        block("mistake", "Escolher para impressionar", "Decisão de linguagem baseada em prestígio técnico costuma ignorar custos reais de equipe e operação."),
      ],
    ),
    s(
      "quando-cada-um-brilha",
      "Aplicação",
      "Go, Rust e arquitetura híbrida brilham em cenários diferentes",
      "A comparação fica mais útil quando você admite que a melhor resposta pode variar por componente.",
      undefined,
      "go-vs-rust-position-compare",
      [
        "Go tende a ser muito forte em serviços, ferramentas internas, integrações, jobs e plataformas em que produtividade, simplicidade de operação e concorrência pragmática são centrais.",
        "Rust tende a ganhar apelo em componentes que lidam com recursos mais apertados, exigem previsibilidade runtime maior ou não podem aceitar certas classes de bug de memória.",
        "Entre esses polos, existe um espaço fértil para composições híbridas: um núcleo crítico em Rust e uma camada de orquestração, serviço ou integração em Go podem fazer muito sentido.",
      ],
      [
        block("insight", "Fronteiras bem escolhidas importam", "Se o sistema for híbrido, o sucesso depende mais da qualidade da interface do que do marketing das linguagens."),
      ],
    ),
    s(
      "dial-de-decisao",
      "Síntese",
      "O peso das restrições muda a resposta correta",
      "Quando produtividade, previsibilidade e controle mudam de prioridade, a recomendação também muda.",
      "go-vs-rust-quando-usar-summary",
      "go-vs-rust-constraint-dial",
      [
        "Projetos com pressão enorme por entrega, operação simples e equipes amplas costumam encontrar em Go uma escolha muito racional. Projetos nos quais custo runtime, integridade de memória e controle fino são dominantes tendem a enxergar mais valor em Rust.",
        "Entre esses extremos, a decisão realmente interessante é não ser dogmático. Escolher por módulo, por fronteira ou por tipo de risco costuma ser mais maduro do que impor uma solução monolítica por identidade técnica.",
        "Em outras palavras: linguagem é estratégia de risco, não troféu.",
      ],
      [
        block("insight", "Balanced, não fanboy", "A resposta boa reconhece méritos e custos reais dos dois lados."),
      ],
    ),
    s(
      "quiz-revisao",
      "Revisão",
      "Quiz de revisão",
      "Teste sua leitura sobre GC, ownership, concorrência, equipe e decisão por contexto.",
      undefined,
      "quiz",
      ["A meta é fortalecer uma comparação honesta e útil, não decorar slogans."],
      [],
    ),
    s(
      "glossario",
      "Vocabulário",
      "Glossário essencial",
      "Consolide os termos mais importantes do debate técnico entre Go e Rust.",
      undefined,
      "glossary",
      ["Esses conceitos ajudam a qualificar decisões de arquitetura e plataforma com mais precisão."],
      [],
    ),
  ],
  summaryCards: [
    { title: "Comece pelo risco dominante", body: "A linguagem boa é a que reduz o custo mais relevante do projeto." },
    { title: "Go simplifica com runtime", body: "GC, tooling e concorrência pragmática aceleram muito software de serviço." },
    { title: "Rust desloca garantias para compile time", body: "Ownership e tipos reduzem classes inteiras de falha." },
    { title: "Concorrência muda de natureza", body: "Go reduz atrito; Rust eleva garantias estruturais." },
    { title: "Equipe também decide", body: "Curva de aprendizado e manutenção fazem parte da engenharia." },
    { title: "Híbrido é legítimo", body: "Escolher por componente pode ser mais inteligente do que escolher por torcida." },
  ],
  comparisonRows: [
    {
      topic: "Modelo central de memória",
      newton: "Go: GC e runtime simplificam a vida cotidiana, com trade-offs de memória e latência.",
      leibniz: "Rust: ownership e borrowing dão mais controle sem GC no caminho principal.",
    },
    {
      topic: "Concorrência",
      newton: "Go: goroutines e channels reduzem atrito e aceleram modelos I/O-bound.",
      leibniz: "Rust: tipos e traits como Send/Sync empurram muitos erros para compile time.",
    },
    {
      topic: "Produtividade inicial",
      newton: "Go: costuma ser mais rápido colocar serviços legíveis e operáveis de pé.",
      leibniz: "Rust: normalmente cobra mais modelagem e revisão antes de convergir.",
    },
    {
      topic: "Controle fino",
      newton: "Go: bom, mas mediado por runtime e GC.",
      leibniz: "Rust: geralmente oferece mais controle explícito sobre alocação e custo runtime.",
    },
    {
      topic: "Ponto ótimo típico",
      newton: "Go: backends, infra, jobs, integração, serviços operacionais.",
      leibniz: "Rust: componentes críticos, sistemas, edge, bibliotecas de alta exigência.",
    },
  ],
  quiz: [
    q(
      "q1",
      "Qual é a pergunta mais madura ao comparar Go e Rust?",
      "Qual delas reduz melhor o risco dominante do projeto atual.",
      "Qual delas está mais popular nas redes.",
      "Qual delas promete benchmark maior em qualquer cenário.",
      "a",
      "A comparação útil sempre parte do contexto e das restrições reais.",
    ),
    q(
      "q2",
      "O que o GC do Go tende a oferecer?",
      "Produtividade e simplicidade prática importantes, junto com trade-offs runtime que precisam caber no caso de uso.",
      "Ausência completa de custo de memória.",
      "As mesmas garantias semânticas do ownership de Rust.",
      "a",
      "A visão equilibrada reconhece ajuda real e custo real.",
    ),
    q(
      "q3",
      "Qual é a ideia central do ownership em Rust?",
      "Gerenciar vida útil e posse de valores por regras verificadas em compile time.",
      "Executar garbage collection a cada função.",
      "Substituir qualquer forma de concorrência.",
      "a",
      "Ownership é o centro da proposta de memória do Rust.",
    ),
    q(
      "q4",
      "Como Go e Rust diferem na proposta de concorrência?",
      "Go enfatiza ergonomia com goroutines/channels; Rust enfatiza garantias compile-time com ownership e traits.",
      "Go não suporta concorrência real.",
      "Rust usa sempre o mesmo modelo de channels do Go.",
      "a",
      "Os dois ajudam, mas ajudam de maneiras bastante diferentes.",
    ),
    q(
      "q5",
      "Por que a equipe importa na escolha da linguagem?",
      "Porque manutenção, revisão, aprendizagem e ritmo de entrega fazem parte do custo total da decisão.",
      "Porque só benchmarks importam na prática.",
      "Porque runtime não influencia operação.",
      "a",
      "Linguagem é decisão sociotécnica, não só de compilador.",
    ),
    q(
      "q6",
      "Quando uma arquitetura híbrida pode ser sensata?",
      "Quando partes diferentes do sistema pedem propriedades diferentes e as fronteiras podem ser bem definidas.",
      "Nunca; misturar linguagens sempre é erro.",
      "Apenas quando o time desconhece as duas linguagens.",
      "a",
      "Híbrido é uma escolha técnica legítima quando os benefícios superam o custo de integração.",
    ),
    q(
      "q7",
      "Qual é um erro clássico nesse debate?",
      "Escolher linguagem por identidade ou prestígio, sem explicitar o tipo de risco do projeto.",
      "Discutir runtime e tooling.",
      "Admitir que há trade-offs em ambos os lados.",
      "a",
      "Sem contexto, a discussão vira torcida e perde valor técnico.",
    ),
    q(
      "q8",
      "Qual frase resume melhor uma visão balanced sobre Go vs Rust?",
      "Ambas resolvem problemas reais; a decisão certa depende do domínio, do runtime desejado e da equipe.",
      "Rust sempre substitui Go com vantagem total.",
      "Go sempre é superior porque é mais simples.",
      "a",
      "Comparação séria reconhece méritos e custos nos dois lados.",
    ),
  ],
  glossary: [
    g("GC", "Garbage collector que recicla memória automaticamente em tempo de execução."),
    g("Ownership", "Sistema de regras de posse e vida útil usado por Rust."),
    g("Borrowing", "Empréstimo de acesso a um valor em Rust sob regras verificadas pelo compilador."),
    g("Tail latency", "Comportamento das requisições ou operações mais lentas."),
    g("Runtime", "Camada de execução que oferece serviços como scheduling, GC ou suporte sistêmico."),
    g("Goroutine", "Unidade leve de concorrência fornecida pelo runtime do Go."),
    g("Send", "Trait de Rust ligada à transferência segura de posse entre threads."),
    g("Sync", "Trait de Rust ligada ao compartilhamento seguro por referência entre threads."),
    g("Trade-off", "Troca entre benefícios e custos de uma escolha técnica."),
    g("Curva de aprendizado", "Tempo e esforço necessários para o time dominar bem uma tecnologia."),
    g("Arquitetura híbrida", "Sistema que combina mais de uma linguagem em componentes distintos."),
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

function ref(title: string, source: string, url: string, note: string) {
  return { title, source, url, note };
}

function block(
  type: "definition" | "example" | "insight" | "mistake",
  title: string,
  body: string,
) {
  return { type, title, body };
}
