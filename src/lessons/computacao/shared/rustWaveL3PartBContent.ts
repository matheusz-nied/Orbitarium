import type {
  GlossaryTerm,
  LessonBlock,
  LessonBlockType,
  LessonContent,
  LessonReference,
  LessonSection,
  QuizQuestion,
  SummaryCard,
} from "../../../types/content";

export type RustL3PartBTopicId =
  | "rust-concurrency-send-sync"
  | "rust-async-intuicao"
  | "rust-unsafe-boundaries"
  | "rust-ffi-e-c"
  | "rust-tooling-cargo-perf";

const card = (title: string, body: string): SummaryCard => ({ title, body });

const ref = (
  title: string,
  source: string,
  url: string,
  note?: string,
): LessonReference => ({ title, source, url, note });

const block = (
  type: LessonBlockType,
  title: string,
  body: string,
  items?: string[],
): LessonBlock => ({ type, title, body, items });

const section = (input: LessonSection): LessonSection => input;

const q = (
  id: string,
  prompt: string,
  options: Array<[string, string]>,
  correctOptionId: string,
  feedback: string,
): QuizQuestion => ({
  id,
  prompt,
  options: options.map(([optionId, label]) => ({ id: optionId, label })),
  correctOptionId,
  feedback,
});

const g = (term: string, definition: string): GlossaryTerm => ({ term, definition });

const reviewSection = (lead: string): LessonSection => ({
  id: "quiz-revisao",
  eyebrow: "Revisão",
  title: "Quiz de revisão",
  lead,
  interactive: "quiz",
  paragraphs: [
    "Use as perguntas para verificar se você consegue explicar o mecanismo, o trade-off e a fronteira segura do tema sem cair em slogans. O objetivo é ganhar critério técnico, não decorar rótulos.",
  ],
});

const glossarySection = (lead: string): LessonSection => ({
  id: "glossario",
  eyebrow: "Glossário",
  title: "Termos essenciais",
  lead,
  interactive: "glossary",
  paragraphs: [
    "Consolidar o vocabulário ajuda a ler documentação oficial, revisar código e discutir arquitetura com menos ambiguidade. Em Rust, muita clareza vem justamente de nomear bem o contrato que está em jogo.",
  ],
});

function buildContent(input: {
  id: RustL3PartBTopicId;
  title: string;
  subtitle: string;
  description: string;
  level: LessonContent["level"];
  estimatedTime: string;
  tags: string[];
  learningObjectives: string[];
  prerequisites: string[];
  references: LessonReference[];
  openingText: string;
  quickFacts: SummaryCard[];
  coreSections: LessonSection[];
  quizLead: string;
  glossaryLead: string;
  quiz: QuizQuestion[];
  glossary: GlossaryTerm[];
  summaryCards: SummaryCard[];
}): LessonContent {
  return {
    id: input.id,
    title: input.title,
    subtitle: input.subtitle,
    description: input.description,
    primaryCategoryId: "computacao",
    secondaryCategoryId: "engenharia",
    level: input.level,
    estimatedTime: input.estimatedTime,
    tags: input.tags,
    learningObjectives: input.learningObjectives,
    prerequisites: input.prerequisites,
    references: input.references,
    heroVisual: "hero",
    openingText: input.openingText,
    quickFacts: input.quickFacts,
    sections: [
      ...input.coreSections,
      reviewSection(input.quizLead),
      glossarySection(input.glossaryLead),
    ],
    quiz: input.quiz,
    glossary: input.glossary,
    summaryCards: input.summaryCards,
  };
}

export const rustWaveL3PartBContents: Record<RustL3PartBTopicId, LessonContent> = {
  "rust-concurrency-send-sync": buildContent({
    id: "rust-concurrency-send-sync",
    title: "Rust: Concurrency, Send e Sync",
    subtitle:
      "Em Rust, atravessar a fronteira entre threads não é implícito: os tipos precisam provar quando é seguro mover ownership e quando é seguro compartilhar referências.",
    description:
      "Uma aula avançada sobre `Send`, `Sync`, auto traits, `Arc`, `Mutex`, interior mutability e por que implementar esses contratos manualmente é raro e delicado.",
    level: "Avançado",
    estimatedTime: "60-70 min",
    tags: [
      "Rust",
      "Concurrency",
      "Send",
      "Sync",
      "Arc",
      "Mutex",
      "Threads",
    ],
    learningObjectives: [
      "Distinguir com precisão o que `Send` garante e o que `Sync` garante.",
      "Explicar por que alguns tipos são auto-derivados como thread-safe e outros não.",
      "Relacionar `Rc`, `Arc`, `Cell`, `RefCell`, `Mutex` e atomics aos contratos de compartilhamento.",
      "Entender que `Arc<T>` não torna qualquer `T` automaticamente seguro entre threads.",
      "Reconhecer quando a modelagem correta é mover dados, compartilhar leitura ou sincronizar mutação.",
      "Perceber por que `unsafe impl Send/Sync` é exceção e exige invariantes muito claros.",
    ],
    prerequisites: [
      "Ownership, borrowing e mutabilidade em Rust.",
      "Processos, threads e sincronização em nível conceitual.",
      "Noções de concorrência em baixo nível ajudam a dar contexto ao custo real das decisões.",
    ],
    references: [
      ref(
        "Extensible Concurrency with Send and Sync",
        "The Rust Programming Language",
        "https://doc.rust-lang.org/book/ch16-04-extensible-concurrency-sync-and-send.html",
        "Introdução oficial aos dois marker traits e às exceções mais importantes.",
      ),
      ref(
        "Send and Sync",
        "The Rustonomicon",
        "https://doc.rust-lang.org/nomicon/send-and-sync.html",
        "Referência central para entender por que implementar esses traits é operação unsafe.",
      ),
      ref(
        "Sync",
        "Rust Standard Library",
        "https://doc.rust-lang.org/stable/std/marker/trait.Sync.html",
        "Definição precisa: `T` é `Sync` se e somente se `&T` é `Send`.",
      ),
      ref(
        "Send",
        "Rust Standard Library",
        "https://doc.rust-lang.org/std/marker/trait.Send.html",
        "Documenta o contrato de mover ownership com segurança entre threads.",
      ),
      ref(
        "std::sync",
        "Rust Standard Library",
        "https://doc.rust-lang.org/std/sync/",
        "Panorama oficial das primitivas seguras de sincronização em Rust.",
      ),
    ],
    openingText:
      "Uma das ideias mais fortes de Rust é que concorrência segura não deveria depender apenas de atenção humana. Em vez de deixar toda thread-safety como convenção, a linguagem codifica parte do problema nos tipos. `Send` responde se ownership pode atravessar uma thread boundary. `Sync` responde se referências compartilhadas podem ser observadas de múltiplas threads sem abrir espaço para comportamento indefinido. A força do modelo está em tornar visíveis escolhas que em outras linguagens costumam virar comentário, disciplina de equipe ou bug raro.",
    quickFacts: [
      card("Mover não é compartilhar", "`Send` fala de transferir ownership; `Sync` fala de compartilhar acesso por referência."),
      card("Auto traits propagam contratos", "Se todos os campos de um tipo carregam o contrato certo, o compilador costuma derivá-lo automaticamente."),
      card("Exceções têm motivo", "`Rc` e `RefCell` não são acidentes: eles materializam semânticas que não são thread-safe."),
      card("Manual é raro", "Implementar `Send` ou `Sync` com `unsafe impl` só faz sentido quando a abstração realmente sustenta o contrato."),
    ],
    coreSections: [
      section({
        id: "motivacao",
        eyebrow: "Motivação",
        title: "Concorrência segura começa definindo o que pode atravessar a fronteira entre threads",
        lead:
          "Em Rust, thread-safety não é um comentário opcional: o modelo força você a explicitar quando um valor pode ser movido ou compartilhado sem quebrar invariantes.",
        visual: "hero",
        paragraphs: [
          "Em muitas linguagens, a pergunta 'isso é seguro entre threads?' aparece tarde, normalmente quando já existe uma estrutura de dados compartilhada em produção e algum incidente revela que o contrato era mais implícito do que real. Rust tenta inverter essa ordem: certos padrões nem compilam sem que o tipo consiga provar que o movimento ou o compartilhamento é aceitável.",
          "Isso não elimina toda a dificuldade da concorrência. Você ainda precisa decidir entre channels, `Arc`, locks, atomics e particionamento de estado. O que muda é que a linguagem ajuda a bloquear algumas combinações fundamentalmente perigosas antes que elas se tornem bug.",
        ],
        blocks: [
          block(
            "insight",
            "A pergunta certa",
            "Antes de discutir desempenho ou ergonomia, vale perguntar: este valor precisa ser movido para outra thread, ou apenas observado por mais de uma?",
          ),
          block(
            "mistake",
            "Erro comum",
            "Falar de concorrência como se todo problema fosse 'compartilhar tudo com todo mundo'. Em muitos casos, mover ownership é mais simples e mais robusto.",
          ),
        ],
      }),
      section({
        id: "send-sync-como-lentes",
        eyebrow: "Modelo mental",
        title: "`Send` e `Sync` são lentes diferentes sobre o mesmo risco",
        lead:
          "Os dois traits tratam de thread-safety, mas olham para duas perguntas distintas: transferência de posse e compartilhamento por referência.",
        visual: "concept-map",
        interactive: "model-lab",
        paragraphs: [
          "`Send` significa que é seguro enviar ownership de um valor para outra thread. Isso casa bem com patterns em que um produtor cria um valor e um consumidor, em outra thread, passa a ser o novo dono.",
          "`Sync`, por outro lado, significa que é seguro compartilhar referências imutáveis entre threads. A definição formal frequentemente usada é esta: `T` é `Sync` se e somente se `&T` é `Send`. Em outras palavras, enviar uma referência compartilhada de `T` para outra thread não pode introduzir undefined behavior, inclusive por data race.",
          "Separar essas duas perguntas é valioso porque evita slogans como 'esse tipo é concorrente'. O ponto não é ser 'concorrente' em abstrato; é saber qual forma de acesso ele suporta.",
        ],
        blocks: [
          block(
            "definition",
            "`Send`",
            "Marker trait que indica que ownership de valores daquele tipo pode ser transferido com segurança entre threads.",
          ),
          block(
            "definition",
            "`Sync`",
            "Marker trait que indica que referências compartilhadas para aquele tipo podem ser usadas em múltiplas threads sem quebrar o modelo de segurança.",
          ),
        ],
      }),
      section({
        id: "auto-traits-e-excecoes",
        eyebrow: "Semântica",
        title: "Auto traits funcionam bem porque o compilador propaga contratos já conhecidos",
        lead:
          "A maior parte dos tipos não precisa de anotação manual: se seus componentes são seguros nas condições certas, o tipo composto herda esse comportamento.",
        visual: "flow",
        paragraphs: [
          "Rust trata `Send` e `Sync` como auto traits. Isso significa que, quando todos os campos internos sustentam determinado contrato, o tipo inteiro tende a sustentá-lo também. Essa é uma das razões pelas quais muitos programas usam concorrência com `Vec`, `String`, `HashMap` e smart pointers sem precisar 'ensinar' nada ao compilador.",
          "As exceções mais pedagógicas são `Rc`, `Cell`, `RefCell` e `UnsafeCell`. `Rc` mantém contagem de referências sem sincronização atômica; logo, duas threads mexendo no contador ao mesmo tempo seriam um desastre. `RefCell` e `Cell` oferecem interior mutability sem sincronização thread-safe. Essas escolhas fazem sentido em código single-threaded, mas não podem ser promovidas automaticamente a contratos multi-thread.",
          "Raw pointers também não recebem `Send` e `Sync` automaticamente. O Rustonomicon explica que isso funciona como um freio importante: se um tipo carrega ownership não rastreado por ponteiros crus, o autor precisa pensar explicitamente sobre segurança entre threads em vez de ganhar um selo automático.",
        ],
        blocks: [
          block(
            "example",
            "Exceção didática",
            "`Rc<T>` é excelente para compartilhamento barato dentro de uma thread, mas justamente por não usar contagem atômica não pode atravessar threads com o mesmo contrato de segurança de `Arc<T>`.",
          ),
          block(
            "insight",
            "Auto-derivação não é magia",
            "Ela funciona porque o compilador reconhece composição de contratos conhecidos. Quando há ownership obscuro, interior mutability sem sincronização ou ponteiros crus, o problema precisa voltar à mesa do projetista.",
          ),
        ],
      }),
      section({
        id: "arc-locks-atomics",
        eyebrow: "Prática",
        title: "Os blocos de construção seguros não resolvem o mesmo problema",
        lead:
          "O valor de Rust não está só em negar combinações perigosas, mas em oferecer ferramentas com semânticas diferentes para tipos diferentes de compartilhamento.",
        visual: "compare-board",
        interactive: "tradeoff-lab",
        paragraphs: [
          "`Arc<T>` resolve o problema de ownership compartilhado entre threads, mas não adiciona mutabilidade segura por si só. Se `T` precisa ser mutado de modo compartilhado, normalmente entra em cena algo como `Mutex<T>`, `RwLock<T>` ou uma estrutura baseada em atomics.",
          "Essas ferramentas têm contratos distintos. `Mutex<T>` serializa acesso mutável; `RwLock<T>` separa leitores e escritores com custos próprios; atomics funcionam bem para estados pequenos e semânticas muito específicas. Nenhuma delas é 'a concorrência do Rust'. Cada uma representa uma escolha de engenharia sobre contenção, simplicidade e granularidade do estado.",
          "A melhor decisão frequentemente não é 'qual lock usar?', mas 'posso reestruturar este problema para mover dados em vez de compartilhar mutabilidade?'. Essa pergunta economiza complexidade antes que otimizações prematuras a reintroduzam.",
        ],
        blocks: [
          block(
            "mistake",
            "Armadilha frequente",
            "Assumir que `Arc<T>` torna qualquer `T` automaticamente compartilhável com segurança. O contrato continua dependendo das propriedades de `T`.",
          ),
          block(
            "example",
            "Heurística útil",
            "Se o estado pode ter um único dono por vez, channels ou transferência de ownership costumam ser mais simples do que um grafo de `Arc<Mutex<...>>`.",
          ),
        ],
      }),
      section({
        id: "armadilhas-de-modelagem",
        eyebrow: "Armadilhas",
        title: "Nem toda solução que compila representa um desenho fácil de sustentar",
        lead:
          "Os traits ajudam a bloquear muitas classes de erro, mas não eliminam escolhas ruins de arquitetura concorrente.",
        visual: "risk-board",
        paragraphs: [
          "É possível montar estruturas profundamente aninhadas, como `Arc<Mutex<HashMap<...>>>`, que passam no sistema de tipos e ainda assim produzem contenção, lock poisoning, latência imprevisível ou dificuldade enorme de teste. O tipo garante uma fronteira de segurança; ele não faz milagre sobre granularidade, fluxo de ownership ou observabilidade.",
          "Outra armadilha é tentar portar modelos single-threaded para multi-threaded apenas trocando `Rc` por `Arc` e `RefCell` por `Mutex`. Às vezes isso é suficiente; muitas vezes é sinal de que o estado ainda está grande demais, compartilhado demais ou com responsabilidades mal separadas.",
          "Por fim, vale lembrar que ausência de data race não equivale automaticamente a ausência de race condition lógica. O programa pode ser memory-safe e ainda assim publicar estados em ordem errada, bloquear demais ou processar eventos no momento inadequado.",
        ],
        blocks: [
          block(
            "mistake",
            "Confundir segurança com desenho ideal",
            "Um código pode ser seguro em termos de memória e mesmo assim ser difícil de escalar, depurar ou evoluir sob carga.",
          ),
        ],
      }),
      section({
        id: "unsafe-impl-e-abstracoes",
        eyebrow: "Unsafe",
        title: "Implementar `Send` e `Sync` manualmente significa prometer invariantes ao resto do ecossistema",
        lead:
          "Esses traits não têm métodos, mas isso não os torna triviais: o contrato vive nas propriedades do tipo, não em código executado diretamente.",
        visual: "boundary-board",
        paragraphs: [
          "O Rustonomicon é direto: `Send` e `Sync` são unsafe traits. Isso quer dizer que implementá-los incorretamente pode permitir que código aparentemente seguro acione comportamento indefinido. O problema não é apenas 'deu data race'; é que outros componentes podem assumir esse contrato como verdadeiro e otimizar ou encapsular código unsafe em cima dele.",
          "Na prática, `unsafe impl Send` ou `unsafe impl Sync` aparece quando alguém constrói uma abstração nova, normalmente envolvendo ponteiros crus, ownership manual ou interior mutability muito controlada, e consegue demonstrar que o tipo se comporta como uma contraparte segura conhecida.",
          "A regra de ouro é simples de formular e difícil de cumprir: mantenha o `unsafe` pequeno, documente o raciocínio e prove que todos os campos e caminhos de acesso preservam o contrato que você está afirmando para o tipo inteiro.",
        ],
        blocks: [
          block(
            "definition",
            "Unsafe trait",
            "Trait cujo contrato não pode ser verificado automaticamente pelo compilador e cuja implementação incorreta pode invalidar a segurança de código que confia nesse contrato.",
          ),
          block(
            "insight",
            "Marker trait também carrega semântica",
            "Mesmo sem métodos, `Send` e `Sync` informam ao resto do ecossistema quais formas de uso concorrente são permitidas.",
          ),
        ],
      }),
      section({
        id: "decisoes-de-engenharia",
        eyebrow: "Engenharia",
        title: "Escolher entre mover, compartilhar e sincronizar é decisão de modelagem, não detalhe de sintaxe",
        lead:
          "Boas arquiteturas concorrentes em Rust surgem quando ownership e fluxo de dados são desenhados cedo, antes que locks se espalhem por reflexo.",
        interactive: "scenario-lab",
        paragraphs: [
          "Quando o sistema usa workers independentes, passar ownership de tarefas via channel costuma deixar o raciocínio mais limpo. Quando muitos leitores observam um estado quase estático, `Arc<T>` pode bastar. Quando várias threads realmente precisam mutar algo em conjunto, entram as ferramentas de sincronização — mas já com uma pergunta explícita sobre custo e contenção.",
          "O ganho pedagógico de `Send` e `Sync` é justamente forçar essa conversa. Em vez de encobrir decisões com ponteiros compartilhados e boa vontade, o projeto precisa declarar qual semântica de acesso está oferecendo.",
        ],
        blocks: [
          block(
            "example",
            "Perguntas úteis de projeto",
            "Antes de escolher a estrutura, vale perguntar quem é dono do dado, quem realmente precisa observá-lo e se a mutação pode ser particionada.",
            [
              "Posso transferir ownership em vez de compartilhar?",
              "Leitura e escrita acontecem com a mesma frequência?",
              "Este estado precisa mesmo ser global?",
            ],
          ),
        ],
      }),
      section({
        id: "pontes",
        eyebrow: "Conexões",
        title: "Este tema reaparece em runtimes, filas, serviços e bibliotecas de sistemas",
        lead:
          "Entender `Send` e `Sync` melhora não só código Rust, mas também a forma como você lê abstrações concorrentes mais altas.",
        visual: "impact-board",
        paragraphs: [
          "Crates de runtime, filas, caches, pools de conexão e bibliotecas assíncronas usam `Send` e `Sync` para expor contratos explícitos a seus usuários. Quando um future precisa ser `Send`, quando um handle é `!Sync` ou quando um guard não pode atravessar threads, o raciocínio por trás quase sempre volta a ownership, aliasing e sincronização.",
          "Isso conecta diretamente Rust às aulas de threads, atomics, memória e contenção. O valor não é decorar quais tipos implementam quais traits, mas reconhecer que a semântica de acesso concorrente é parte da API.",
        ],
        blocks: [
          block(
            "insight",
            "API boa também comunica concorrência",
            "Em Rust, os tipos contam uma parte importante da história operacional: como o valor pode circular, ser emprestado e ser compartilhado.",
          ),
        ],
      }),
    ],
    quizLead:
      "Verifique se você separou corretamente os papéis de `Send`, `Sync`, auto traits e primitivas de sincronização.",
    glossaryLead:
      "Feche a aula consolidando o vocabulário de thread-safety que aparece constantemente em bibliotecas de Rust.",
    quiz: [
      q(
        "q1",
        "O que `Send` descreve?",
        [
          ["a", "Que ownership de valores daquele tipo pode ser transferido com segurança entre threads."],
          ["b", "Que duas threads podem mutar o mesmo valor ao mesmo tempo sem coordenação."],
          ["c", "Que o tipo sempre usa locks internamente."],
        ],
        "a",
        "`Send` fala de transferir ownership entre threads, não de permitir mutação compartilhada irrestrita.",
      ),
      q(
        "q2",
        "O que `Sync` descreve?",
        [
          ["a", "Que o tipo é automaticamente lock-free."],
          ["b", "Que referências compartilhadas para o tipo podem ser usadas entre threads sem quebrar a segurança."],
          ["c", "Que o tipo sempre é mais rápido que um `Mutex`."],
        ],
        "b",
        "A definição formal central é: `T` é `Sync` se e somente se `&T` é `Send`.",
      ),
      q(
        "q3",
        "Por que `Rc<T>` não implementa `Send`?",
        [
          ["a", "Porque sua contagem de referências não é sincronizada entre threads."],
          ["b", "Porque ele sempre aloca na stack."],
          ["c", "Porque o compilador não sabe o tamanho de `T`."],
        ],
        "a",
        "`Rc` é ótimo para compartilhamento single-threaded, mas sua contagem de referências não é atômica.",
      ),
      q(
        "q4",
        "Qual afirmação sobre `Arc<T>` é correta?",
        [
          ["a", "`Arc<T>` torna qualquer `T` automaticamente thread-safe."],
          ["b", "`Arc<T>` resolve ownership compartilhado, mas o contrato ainda depende das propriedades de `T`."],
          ["c", "`Arc<T>` substitui qualquer necessidade de sincronização."],
        ],
        "b",
        "`Arc` resolve contagem de referências entre threads; mutação segura e outras propriedades ainda dependem de `T`.",
      ),
      q(
        "q5",
        "Por que `Cell` e `RefCell` não são `Sync`?",
        [
          ["a", "Porque oferecem interior mutability sem sincronização thread-safe."],
          ["b", "Porque são tipos de tamanho dinâmico."],
          ["c", "Porque não podem armazenar números."],
        ],
        "a",
        "O problema é a interior mutability sem coordenação segura para múltiplas threads.",
      ),
      q(
        "q6",
        "Quando `unsafe impl Send/Sync` costuma ser necessário?",
        [
          ["a", "Quando um tipo novo baseado em ownership manual ou ponteiros crus precisa afirmar um contrato que o compilador não consegue inferir sozinho."],
          ["b", "Sempre que um struct tem mais de um campo."],
          ["c", "Toda vez que há `Arc` em algum lugar do código."],
        ],
        "a",
        "Implementação manual é rara e aparece em abstrações realmente novas, nas quais o contrato precisa ser provado pelo autor.",
      ),
      q(
        "q7",
        "Qual decisão costuma simplificar concorrência antes de adicionar locks?",
        [
          ["a", "Mover ownership quando possível, em vez de compartilhar mutabilidade global por padrão."],
          ["b", "Substituir todo valor por `Arc<Mutex<...>>` imediatamente."],
          ["c", "Evitar qualquer trait bound em APIs concorrentes."],
        ],
        "a",
        "Muitas arquiteturas ficam mais simples quando dados são passados adiante, não compartilhados indiscriminadamente.",
      ),
      q(
        "q8",
        "Qual afirmação resume melhor a lição desta aula?",
        [
          ["a", "Tipos thread-safe são um detalhe de biblioteca e não fazem parte da API."],
          ["b", "Em Rust, a semântica de acesso concorrente faz parte do contrato público dos tipos."],
          ["c", "Se um código compila, então sua arquitetura concorrente já é ideal."],
        ],
        "b",
        "O grande valor pedagógico é entender que ownership, empréstimo e compartilhamento entre threads também são parte da interface.",
      ),
    ],
    glossary: [
      g("Send", "Marker trait que indica que ownership de valores de um tipo pode ser transferido com segurança entre threads."),
      g("Sync", "Marker trait que indica que referências compartilhadas para um tipo podem ser usadas entre threads com segurança."),
      g("Auto trait", "Trait propagado automaticamente pelo compilador quando os componentes internos sustentam o contrato necessário."),
      g("Ownership", "Modelo que define quem é responsável por um valor e por seu ciclo de vida."),
      g("Interior mutability", "Padrão em que um valor pode ser mutado através de uma referência aparentemente imutável, desde que o tipo ofereça esse contrato."),
      g("Rc", "Smart pointer de contagem de referências para cenários single-threaded."),
      g("Arc", "Versão com contagem de referências atômica, adequada para ownership compartilhado entre threads."),
      g("Mutex", "Primitiva que permite acesso mutável exclusivo a um valor compartilhado."),
      g("RwLock", "Primitiva que separa múltiplos leitores de um escritor exclusivo."),
      g("Atomic", "Tipo ou operação que oferece garantias específicas de acesso concorrente em nível baixo."),
      g("UnsafeCell", "Base das abstrações de interior mutability; em si, não é `Sync`."),
      g("Data race", "Acesso concorrente não sincronizado a um mesmo local de memória, com pelo menos uma escrita."),
    ],
    summaryCards: [
      card("`Send` move", "Ele trata da transferência segura de ownership entre threads."),
      card("`Sync` compartilha", "Ele trata da segurança de referências compartilhadas entre threads."),
      card("Auto traits ajudam", "Grande parte dos tipos herda contratos corretos por composição."),
      card("Exceções ensinam", "`Rc`, `RefCell` e `UnsafeCell` mostram onde a thread-safety realmente quebra."),
      card("Primitivas têm semânticas distintas", "`Arc`, `Mutex`, `RwLock` e atomics não resolvem o mesmo problema."),
      card("Manual exige prova", "`unsafe impl Send/Sync` só é aceitável quando os invariantes estão muito bem justificados."),
    ],
  }),
  "rust-async-intuicao": buildContent({
    id: "rust-async-intuicao",
    title: "Rust: Async (Intuição)",
    subtitle:
      "Em Rust, `async` não significa 'rodando ao fundo por mágica': futures são computations inertes que um executor precisa pollar e acordar na hora certa.",
    description:
      "Uma aula avançada sobre `Future`, `Poll`, `Waker`, tarefas, executores, pinning e sobre quando `async` ajuda de verdade — e quando threads ou código síncrono são melhores.",
    level: "Avançado",
    estimatedTime: "60-70 min",
    tags: [
      "Rust",
      "Async",
      "Future",
      "Waker",
      "Executor",
      "Tokio",
      "I/O",
    ],
    learningObjectives: [
      "Entender que um future em Rust é a própria computação, não apenas um 'handle' para algo que já está rodando.",
      "Explicar o papel de `poll`, `Pending`, `Ready`, `Context` e `Waker`.",
      "Relacionar tasks, executores e runtimes à multiplexação de trabalho orientado a readiness.",
      "Distinguir bem quando `async` ajuda em workloads dominados por espera e quando não ajuda em CPU-bound.",
      "Reconhecer armadilhas como bloqueio dentro do runtime, spawns excessivos e fronteiras com APIs síncronas.",
      "Conectar pinning e state machines ao jeito como `async/await` é implementado em Rust.",
    ],
    prerequisites: [
      "Noções básicas de threads, I/O e concorrência ajudam bastante.",
      "Ownership e borrowing em Rust.",
      "Familiaridade geral com serviços de rede torna os exemplos mais concretos.",
    ],
    references: [
      ref(
        "The Future Trait",
        "Asynchronous Programming in Rust",
        "https://rust-lang.github.io/async-book/02_execution/02_future.html",
        "Explica o modelo de `poll`, `Pending`, `Ready`, `Context` e o papel de `Pin`.",
      ),
      ref(
        "Task Wakeups with Waker",
        "Asynchronous Programming in Rust",
        "https://rust-lang.github.io/async-book/02_execution/03_wakeups.html",
        "Mostra por que um future precisa registrar um `Waker` para voltar a fazer progresso.",
      ),
      ref(
        "Future",
        "Rust Standard Library",
        "https://doc.rust-lang.org/std/future/trait.Future.html",
        "Definição oficial do trait `Future`.",
      ),
      ref(
        "Waker",
        "Rust Standard Library",
        "https://doc.rust-lang.org/std/task/struct.Waker.html",
        "Documentação oficial do handle usado para acordar tasks.",
      ),
      ref(
        "Async in depth",
        "Tokio Tutorial",
        "https://tokio.rs/tokio/tutorial/async",
        "Boa ponte prática entre o modelo abstrato e um runtime real amplamente usado.",
      ),
    ],
    openingText:
      "Muita confusão com `async` nasce de uma metáfora ruim: imaginar que cada `async fn` já virou automaticamente um trabalho rodando em paralelo. Em Rust, isso não é verdade. Um future é uma computação que precisa ser avançada explicitamente por `poll`, normalmente por meio de uma task num executor. Esse detalhe importa porque explica tanto a eficiência do modelo para I/O quanto suas frustrações mais comuns: futures não fazem progresso sozinhos, bloquear dentro do runtime é tóxico e CPU-bound não some só porque ganhou `.await`.",
    quickFacts: [
      card("Future é inerte", "Sem `poll`, o future não faz progresso por conta própria."),
      card("`Pending` precisa de retorno", "Se o future ainda não pode terminar, ele precisa registrar como será acordado depois."),
      card("Async não é sinônimo de paralelismo", "Ele pode coexistir com paralelismo, mas o problema que resolve primeiro é espera concorrente."),
      card("Bloquear custa caro", "Uma task que bloqueia a thread do runtime atrapalha muitas outras que poderiam avançar."),
    ],
    coreSections: [
      section({
        id: "motivacao",
        eyebrow: "Motivação",
        title: "Async nasce quando há muito trabalho esperando e pouco trabalho realmente computando",
        lead:
          "O grande ganho de `async` não é fazer a CPU rodar mais rápido, mas permitir que uma mesma thread útil intercale muitas operações que passam grande parte do tempo aguardando I/O.",
        visual: "hero",
        paragraphs: [
          "Serviços de rede, bancos, proxies, brokers e clientes HTTP lidam com milhares de sockets, timers e respostas externas que não ficam prontas imediatamente. Se cada espera ocupar uma thread dedicada o tempo inteiro, você paga em memória, agendamento e coordenação mais do que gostaria.",
          "O modelo async permite que, enquanto uma operação aguarda um evento externo, outra task possa usar aquela capacidade de execução. Isso funciona muito bem quando o gargalo principal é latência de I/O ou espera por readiness. Ele não muda a física de um loop intensivo de CPU.",
        ],
        blocks: [
          block(
            "insight",
            "O alvo principal",
            "Async é especialmente valioso quando há muitas operações parcialmente ociosas competindo por poucas threads úteis.",
          ),
          block(
            "mistake",
            "Erro comum",
            "Esperar que `async` acelere sozinho uma rotina puramente CPU-bound e sem pontos reais de espera.",
          ),
        ],
      }),
      section({
        id: "future-task-executor",
        eyebrow: "Modelo mental",
        title: "Future, task e executor formam a unidade mínima de raciocínio",
        lead:
          "Em Rust, o future descreve a computação; a task é a unidade agendada pelo executor; o runtime fornece a infraestrutura para I/O, timers e wakeups.",
        visual: "concept-map",
        interactive: "model-lab",
        paragraphs: [
          "O future é o contrato: 'tente me avançar e eu direi se terminei (`Ready`) ou se ainda não posso progredir (`Pending`)'. A task normalmente embala um future de topo que o executor sabe reagendar. O executor, por sua vez, decide quando repollar tasks prontas.",
          "Essa divisão é importante porque impede uma leitura mágica de `async`. O future não é uma thread secreta. Ele é mais parecido com uma state machine que precisa ser retomada no momento certo.",
          "Runtimes como Tokio acrescentam mecanismos práticos para timers, sockets, filas de tarefas e integração com o sistema operacional. Mas mesmo aí a espinha dorsal continua sendo `poll` + wakeup.",
        ],
        blocks: [
          block(
            "definition",
            "Future",
            "Abstração que representa uma computação assíncrona cujo progresso é dirigido por chamadas a `poll`.",
          ),
          block(
            "definition",
            "Executor",
            "Componente que agenda e repolla tasks quando elas estão prontas para avançar.",
          ),
        ],
      }),
      section({
        id: "poll-pending-waker",
        eyebrow: "Mecanismo",
        title: "Se um future devolve `Pending`, ele também precisa deixar um caminho de volta",
        lead:
          "A grande elegância do modelo está em não fazer polling cego de tudo o tempo todo: o wakeup aponta exatamente quais tasks devem voltar à fila.",
        visual: "flow",
        paragraphs: [
          "Segundo a Async Book, quando um future não consegue completar agora, ele retorna `Poll::Pending` e registra um `Waker` derivado do `Context`. Quando o recurso externo fica pronto, esse `Waker` é acionado para avisar ao executor que a task específica pode avançar novamente.",
          "Sem esse mecanismo, o executor teria de ficar consultando todos os futures continuamente para descobrir se algum deles pode progredir. O resultado seria desperdício de CPU e má escalabilidade. O `Waker` transforma a retomada em um sinal direcionado.",
          "Também é por isso que a documentação insiste em atualizar o `Waker` quando necessário: a task associada ao future pode mudar, e um wakeup antigo pode apontar para o lugar errado.",
        ],
        blocks: [
          block(
            "example",
            "Intuição prática",
            "Um future aguardando leitura de socket não deve consumir CPU em loop. Ele se registra para ser acordado quando o socket ficar legível.",
          ),
          block(
            "insight",
            "Wakeup é seletivo",
            "O executor não precisa acordar o mundo inteiro; ele só precisa repollar quem foi sinalizado como apto a avançar.",
          ),
        ],
      }),
      section({
        id: "pinning-e-state-machines",
        eyebrow: "Implementação",
        title: "`async/await` vira state machine, e pinning existe para sustentar esse contrato",
        lead:
          "A ergonomia da sintaxe esconde bastante trabalho de compilador: variáveis locais, pontos de suspensão e retomadas precisam caber numa representação segura.",
        visual: "compare-board",
        interactive: "tradeoff-lab",
        paragraphs: [
          "A Async Book mostra a assinatura real de `poll`: `self: Pin<&mut Self>`. Esse detalhe existe porque alguns futures precisam ser imovíveis para que referências internas ou estruturas auto-referentes não sejam invalidadas por movimentação posterior.",
          "Na prática pedagógica desta aula, o mais importante não é dominar todas as sutilezas de pinning de primeira, mas entender que `async fn` não é só açúcar para callbacks. O compilador gera um objeto que carrega estado entre pontos de suspensão e que precisa ser retomado com cuidado.",
          "Isso ajuda a explicar por que certas capturas, lifetimes e constraints aparecem em código async de Rust de um jeito diferente do que aparecem em funções síncronas simples.",
        ],
        blocks: [
          block(
            "definition",
            "Pinning",
            "Mecanismo usado para garantir que um valor não será movido de lugar quando sua correção depende de estabilidade de endereço.",
          ),
          block(
            "mistake",
            "Erro comum",
            "Achar que `.await` é apenas 'pausar e voltar' sem perceber que existe uma state machine concreta sustentando variáveis, estados e retomadas.",
          ),
        ],
      }),
      section({
        id: "onde-async-ajuda",
        eyebrow: "Trade-offs",
        title: "Async ajuda muito em I/O-bound; em CPU-bound, a conversa é outra",
        lead:
          "A maturidade com async começa quando você sabe quando usá-lo e quando parar de forçá-lo.",
        visual: "risk-board",
        paragraphs: [
          "Se o programa passa boa parte do tempo esperando sockets, timers, RPCs ou disco, async pode multiplicar o trabalho útil por thread. Se o programa passa boa parte do tempo comprimindo, criptografando, renderizando ou calculando, `async` por si só não cria mais ciclos de CPU nem distribui o trabalho automaticamente entre núcleos.",
          "Isso não significa que CPU-bound e async nunca coexistem. Significa apenas que o lado CPU-bound geralmente precisa de outra estratégia: pool de threads, `spawn_blocking`, rayon ou particionamento explícito do trabalho.",
          "A decisão madura é reconhecer o tipo de espera dominante e alinhar a ferramenta com ele, em vez de usar `.await` como linguagem universal para todo tipo de concorrência.",
        ],
        blocks: [
          block(
            "insight",
            "Ferramenta certa para bound certo",
            "Async é excelente para multiplexar espera; paralelismo explícito continua sendo a conversa principal quando a CPU é o recurso dominante.",
          ),
        ],
      }),
      section({
        id: "armadilhas-reais",
        eyebrow: "Armadilhas",
        title: "As dores mais comuns surgem nas fronteiras com código bloqueante e no excesso de tarefas",
        lead:
          "Muitos problemas atribuídos a 'async ser ruim' na verdade vêm de misturar modelos sem explicitar a fronteira entre eles.",
        visual: "boundary-board",
        paragraphs: [
          "Bloquear uma thread do runtime com operação longa ou I/O síncrono pode travar o progresso de muitas tasks inocentes. O programador sente isso como latência imprevisível, timeout ou throughput abaixo do esperado, mesmo quando o código parece 'assíncrono'.",
          "Outra armadilha é gerar tasks demais sem uma política clara de backpressure, cancelamento ou limite de concorrência. Futures são leves em comparação com threads, mas não são gratuitos; cada task ainda carrega estado, contexto e custos de coordenação.",
          "Também vale cuidado com a semântica de cancelamento: dropar um future impede que aquele objeto faça mais progresso local, mas efeitos externos já iniciados podem exigir desenho explícito para serem interrompidos ou compensados.",
        ],
        blocks: [
          block(
            "mistake",
            "Sintaxe bonita, fronteira ruim",
            "Marcar uma API como async não corrige automaticamente o fato de ela chamar, por baixo, uma biblioteca bloqueante ou um serviço sem controle de concorrência.",
          ),
        ],
      }),
      section({
        id: "decisoes-de-engenharia",
        eyebrow: "Engenharia",
        title: "Projetar APIs async é projetar fluxo de espera, wakeup e pressão de carga",
        lead:
          "A pergunta útil não é 'posso usar async aqui?', mas 'que forma de progresso, suspensão e recuperação este serviço realmente precisa?'.",
        interactive: "scenario-lab",
        paragraphs: [
          "APIs async bem desenhadas tornam explícitos os pontos de espera, evitam ocultar bloqueios caros e deixam claro onde há limites de concorrência. Isso é especialmente importante em servidores, pipelines e bibliotecas reutilizáveis, onde um mau contrato se multiplica rapidamente.",
          "Na prática, uma arquitetura equilibrada costuma combinar async para orquestrar muitas esperas e algum mecanismo separado para trechos realmente bloqueantes ou intensivos de CPU.",
        ],
        blocks: [
          block(
            "example",
            "Perguntas de desenho",
            "Ao avaliar uma API async, vale perguntar se a espera é representativa, se o cancelamento foi pensado e se existe backpressure suficiente.",
            [
              "O trecho suspende por I/O de verdade ou só esconde trabalho bloqueante?",
              "Existe limite de concorrência ou qualquer usuário pode spawnar sem freio?",
              "Há um caminho claro para integrar CPU-bound sem envenenar o runtime?",
            ],
          ),
        ],
      }),
      section({
        id: "pontes",
        eyebrow: "Conexões",
        title: "Este modelo reaparece em servidores, drivers, runtimes e bibliotecas de rede",
        lead:
          "Entender async em Rust melhora sua leitura de frameworks inteiros, porque muitos dos trait bounds e constraints de biblioteca nascem dessa semântica.",
        visual: "impact-board",
        paragraphs: [
          "Quando uma biblioteca exige `Send`, quando um future precisa ser `'static` para `spawn`, quando um adaptador existe só para embrulhar trabalho bloqueante ou quando um stream precisa de backpressure, a explicação costuma voltar ao mesmo núcleo: state machine, task, executor e forma de wakeup.",
          "Esse conhecimento conversa diretamente com as aulas de threads, syscalls, rede e contenção. Async não substitui esses fundamentos; ele os organiza de outro jeito.",
        ],
        blocks: [
          block(
            "insight",
            "Abstrações altas ainda têm chão baixo",
            "Mesmo frameworks muito ergonômicos continuam dependentes de polling, readiness e políticas de escalonamento sob o capô.",
          ),
        ],
      }),
    ],
    quizLead:
      "Cheque se ficou claro o que um future é, quem o move adiante e quando async resolve o problema certo.",
    glossaryLead:
      "Feche a aula consolidando o vocabulário que aparece em runtimes, crates de rede e APIs baseadas em `async/await`.",
    quiz: [
      q(
        "q1",
        "Qual afirmação descreve melhor um future em Rust?",
        [
          ["a", "É a própria computação assíncrona, que precisa ser avançada por `poll`."],
          ["b", "É sempre uma thread separada já em execução."],
          ["c", "É apenas um ponteiro para um callback do sistema operacional."],
        ],
        "a",
        "A ideia central é justamente esta: o future representa a computação e precisa ser polled para avançar.",
      ),
      q(
        "q2",
        "O que significa `Poll::Pending`?",
        [
          ["a", "Que o future falhou definitivamente."],
          ["b", "Que o future ainda não pode completar e precisa ser acordado depois para tentar de novo."],
          ["c", "Que o executor deve criar uma nova thread imediatamente."],
        ],
        "b",
        "`Pending` significa 'ainda não terminei; me acorde quando eu puder voltar a progredir'.",
      ),
      q(
        "q3",
        "Qual é o papel do `Waker`?",
        [
          ["a", "Avisar ao executor que a task associada está pronta para ser repollada."],
          ["b", "Garantir paralelismo em múltiplos núcleos automaticamente."],
          ["c", "Substituir qualquer necessidade de runtime."],
        ],
        "a",
        "O `Waker` existe para sinalizar progresso possível à task certa, evitando polling cego de todos os futures.",
      ),
      q(
        "q4",
        "Quando async tende a ser mais vantajoso?",
        [
          ["a", "Quando há muitas operações esperando por I/O ou readiness."],
          ["b", "Quando o trabalho é puramente CPU-bound e não tem pontos reais de espera."],
          ["c", "Somente em programas single-threaded sem rede."],
        ],
        "a",
        "Async brilha em workloads I/O-bound ou fortemente dominados por espera concorrente.",
      ),
      q(
        "q5",
        "O que `async` não garante por si só?",
        [
          ["a", "Que o código ficará automaticamente paralelo em múltiplos núcleos."],
          ["b", "Que haverá pontos de suspensão explícitos."],
          ["c", "Que futures serão representados como state machines."],
        ],
        "a",
        "Async e paralelismo podem coexistir, mas um não implica o outro.",
      ),
      q(
        "q6",
        "Por que `Pin<&mut Self>` aparece em `Future::poll`?",
        [
          ["a", "Porque alguns futures precisam não ser movidos para preservar suas invariantes internas."],
          ["b", "Porque todo future vive obrigatoriamente na heap."],
          ["c", "Porque o runtime precisa trocar o tipo do future em tempo de execução."],
        ],
        "a",
        "Pinning existe para sustentar a correção de futures que dependem de estabilidade de endereço.",
      ),
      q(
        "q7",
        "Qual é uma armadilha clássica em sistemas async?",
        [
          ["a", "Executar trabalho bloqueante pesado na thread do runtime como se fosse só mais uma task qualquer."],
          ["b", "Separar claramente trabalho I/O-bound de trabalho CPU-bound."],
          ["c", "Usar limites de concorrência e backpressure."],
        ],
        "a",
        "Bloqueio dentro do runtime pode impedir muitas outras tasks de avançarem.",
      ),
      q(
        "q8",
        "Qual frase resume melhor a intuição madura sobre async em Rust?",
        [
          ["a", "É uma maneira disciplinada de multiplexar espera e retomar state machines no momento certo."],
          ["b", "É apenas um estilo de sintaxe para deixar funções mais curtas."],
          ["c", "É um substituto universal para threads, pools e profiling."],
        ],
        "a",
        "Async é, no coração, uma estratégia de progresso orientado a `poll` e wakeup.",
      ),
    ],
    glossary: [
      g("Future", "Objeto que representa uma computação assíncrona cujo progresso é dirigido por chamadas a `poll`."),
      g("Poll", "Enum que indica se um future terminou (`Ready`) ou ainda está pendente (`Pending`)."),
      g("Pending", "Estado em que o future ainda não pode completar e precisa ser acordado depois."),
      g("Ready", "Estado em que o future já produziu seu resultado final."),
      g("Task", "Unidade agendada pelo executor, normalmente envolvendo um future de topo."),
      g("Executor", "Componente que decide quando tasks devem ser polled novamente."),
      g("Runtime", "Infraestrutura que combina executor, integração com I/O, timers e outras facilidades operacionais."),
      g("Waker", "Handle usado para avisar ao executor que uma task está pronta para voltar a avançar."),
      g("Context", "Estrutura passada a `poll` que fornece, entre outras coisas, acesso ao `Waker` atual."),
      g("Pin", "Mecanismo que impede que determinados valores sejam movidos quando sua correção depende disso."),
      g("State machine", "Representação gerada pelo compilador para manter o estado de uma computação async entre suspensões."),
      g("Backpressure", "Estratégia para limitar produção ou concorrência quando o consumidor ou o sistema não acompanha o ritmo."),
    ],
    summaryCards: [
      card("Future é computação", "Ele não avança sozinho; precisa ser polled."),
      card("`Pending` exige wakeup", "O caminho de volta para o executor é parte do contrato."),
      card("Executor coordena", "Tasks só progridem quando o executor as repolla."),
      card("Async serve espera concorrente", "Ele é excelente quando há muito I/O aguardando."),
      card("CPU-bound continua CPU-bound", "Para isso, muitas vezes é preciso outra ferramenta além de `.await`."),
      card("Bloqueio e excesso de spawn cobram caro", "O desenho da fronteira com código síncrono é parte central da qualidade da solução."),
    ],
  }),
  "rust-unsafe-boundaries": buildContent({
    id: "rust-unsafe-boundaries",
    title: "Rust: Unsafe e Fronteiras Seguras",
    subtitle:
      "`unsafe` não é um passe livre para desligar Rust; é o lugar onde contratos que o compilador não consegue provar precisam ser afirmados, documentados e isolados.",
    description:
      "Uma aula avançada sobre o significado de `unsafe`, invariantes, soundness, raw pointers, `UnsafeCell`, `MaybeUninit` e sobre como construir abstrações seguras sobre uma superfície pequena e auditável.",
    level: "Avançado",
    estimatedTime: "65-75 min",
    tags: [
      "Rust",
      "Unsafe",
      "Soundness",
      "Undefined Behavior",
      "Raw Pointer",
      "UnsafeCell",
      "Miri",
    ],
    learningObjectives: [
      "Entender que `unsafe` não desliga o borrow checker nem o resto das verificações de Rust.",
      "Explicar os dois papéis principais da palavra-chave `unsafe`: declarar contratos e afirmar que eles foram verificados.",
      "Reconhecer as operações centrais que exigem `unsafe`, como dereferenciar raw pointers e chamar funções unsafe.",
      "Relacionar invariantes, soundness e encapsulamento a uma boa fronteira segura.",
      "Distinguir uso legítimo de `unsafe` de tentativas de escapar do modelo sem um contrato claro.",
      "Conhecer ferramentas e práticas de auditoria como documentação de segurança, Miri e sanitizers.",
    ],
    prerequisites: [
      "Ownership, borrowing e ponteiros em Rust.",
      "Noções de memória, lifetime e bugs como use-after-free ou aliasing incorreto.",
      "Curiosidade sobre como bibliotecas de sistemas expõem eficiência sem abandonar a segurança do restante do código.",
    ],
    references: [
      ref(
        "Unsafe Rust",
        "The Rust Programming Language",
        "https://doc.rust-lang.org/book/ch20-01-unsafe-rust.html",
        "Introdução oficial ao que `unsafe` permite e ao que ele não desliga.",
      ),
      ref(
        "The Rustonomicon",
        "Rustonomicon",
        "https://doc.rust-lang.org/nomicon/",
        "Companheiro oficial de alto nível para trabalhar com Unsafe Rust.",
      ),
      ref(
        "unsafe keyword",
        "Rust Standard Library",
        "https://doc.rust-lang.org/stable/std/keyword.unsafe.html",
        "Resume os diferentes sentidos de `unsafe` no ecossistema.",
      ),
      ref(
        "Vec::from_raw_parts",
        "Rust Standard Library",
        "https://doc.rust-lang.org/std/vec/struct.Vec.html#method.from_raw_parts",
        "Bom exemplo de API unsafe cujo contrato depende de invariantes fortes sobre ponteiro, tamanho e capacidade.",
      ),
      ref(
        "Miri",
        "rust-lang",
        "https://github.com/rust-lang/miri",
        "Ferramenta oficial mantida pelo projeto para detectar várias formas de UB em testes e experimentos.",
      ),
    ],
    openingText:
      "Unsafe Rust existe porque o compilador é deliberadamente conservador: ele prefere rejeitar alguns programas válidos a aceitar programas potencialmente incorretos. Só que sistemas reais às vezes precisam manipular ponteiros crus, falar com hardware, interoperar com C, construir coleções com layout manual ou representar invariantes que a análise estática não consegue expressar sozinha. `unsafe` é a ponte para esses casos — mas ponte não é atalho sem engenharia. A meta madura não é 'escrever código unsafe'; é manter a parte unsafe pequena, bem documentada e cercada por uma API segura.",
    quickFacts: [
      card("Unsafe não desliga Rust", "Referências, lifetimes e várias verificações continuam existindo dentro de blocos unsafe."),
      card("Contrato acima da sintaxe", "O risco real não está na palavra-chave; está em quais invariantes você prometeu manter."),
      card("Pequeno é melhor", "Quanto menor a superfície unsafe, menor a área que precisa de auditoria profunda."),
      card("Compilar não prova soundness", "Há bugs de invariantes que só aparecem em cenários raros, testes mais agressivos ou revisão cuidadosa."),
    ],
    coreSections: [
      section({
        id: "motivacao",
        eyebrow: "Motivação",
        title: "Unsafe existe porque a segurança de memória não cobre todas as formas legítimas de baixo nível",
        lead:
          "Rust quer que a maior parte do programa seja Safe Rust, mas precisa oferecer uma porta controlada para operações cujo contrato não cabe inteiro no sistema de tipos.",
        visual: "hero",
        paragraphs: [
          "Bibliotecas padrão e crates de infraestrutura usam `unsafe` para implementar coleções, alocadores, wrappers de FFI, primitivas de concorrência e várias otimizações finas. Sem essa válvula de escape, a linguagem seria segura demais para alguns casos e fraca demais para competir em systems programming.",
          "O ponto delicado é que essas operações precisam continuar servindo a um ideal forte: código seguro não deve conseguir disparar undefined behavior. Logo, sempre que `unsafe` aparece, alguém está assumindo responsabilidade extra para preservar as garantias do lado de fora.",
        ],
        blocks: [
          block(
            "insight",
            "Papel certo do unsafe",
            "Ele existe para representar contratos que o compilador não consegue provar, não para escapar de regras 'inconvenientes' sem argumento técnico.",
          ),
          block(
            "mistake",
            "Erro comum",
            "Tratar `unsafe` como sinônimo de 'rápido' ou 'avançado', em vez de tratá-lo como uma fronteira de responsabilidade.",
          ),
        ],
      }),
      section({
        id: "o-que-unsafe-significa",
        eyebrow: "Modelo mental",
        title: "A palavra-chave `unsafe` tem dois papéis: declarar um contrato e dizer que você o verificou",
        lead:
          "A documentação oficial resume bem: alguns usos de `unsafe` marcam que existe um contrato extra; outros usos afirmam que esse contrato foi checado naquele ponto.",
        visual: "concept-map",
        interactive: "model-lab",
        paragraphs: [
          "Segundo o material oficial, `unsafe fn` e `unsafe trait` declaram a existência de condições que o compilador não consegue verificar sozinho. Já `unsafe {}` e `unsafe impl` afirmam que o programador revisou as precondições e assumiu responsabilidade por mantê-las.",
          "Essa distinção evita um mal-entendido comum: nem todo `unsafe` significa a mesma coisa. Às vezes você está definindo uma obrigação para os chamadores; às vezes está descarregando uma obrigação que já vinha de outro lugar.",
          "Também é importante lembrar o que o Rust Book enfatiza: `unsafe` não desliga o borrow checker e não cancela as outras regras da linguagem. Ele libera um conjunto limitado de operações que exigem prova manual de segurança.",
        ],
        blocks: [
          block(
            "definition",
            "Fronteira unsafe",
            "Ponto do código em que o compilador deixa de provar parte da segurança e a responsabilidade passa a depender de contratos documentados e invariantes humanos.",
          ),
          block(
            "definition",
            "Soundness",
            "Propriedade segundo a qual código seguro não consegue acionar comportamento indefinido por meio da abstração exposta.",
          ),
        ],
      }),
      section({
        id: "superpoderes-e-invariantes",
        eyebrow: "Mecanismo",
        title: "O problema real não é a operação isolada; é a invariância que precisa continuar verdadeira antes e depois dela",
        lead:
          "Dereferenciar ponteiro cru, chamar função unsafe ou usar `from_raw_parts` só é aceitável quando todos os pressupostos da API foram satisfeitos.",
        visual: "flow",
        paragraphs: [
          "O Rust Book descreve cinco superpoderes clássicos do Unsafe Rust, mas a lista, sozinha, pouco ensina. O aprendizado prático vem quando você pergunta: que fatos precisam ser verdadeiros para esta operação não corromper memória, aliasing ou layout?",
          "Uma chamada como `Vec::from_raw_parts`, por exemplo, depende de pressupostos fortes sobre alinhamento, capacidade, comprimento e origem do ponteiro. Se qualquer um desses pontos for falso, a API deixa de representar um vetor válido — mesmo que a assinatura compile e um teste trivial pareça funcionar.",
          "Essa lente baseada em invariantes transforma `unsafe` em engenharia de contratos. Em vez de ver 'blocos proibidos', você passa a ver condições precisas que precisam ser protegidas nas bordas da abstração.",
        ],
        blocks: [
          block(
            "example",
            "Pergunta auditável",
            "Antes de qualquer operação unsafe, pergunte quais invariantes precisam ser verdadeiros agora, quais continuam verdadeiros depois e quem garante isso no restante da API.",
          ),
          block(
            "insight",
            "Invariante é o coração",
            "A operação pontual pode ter uma linha; o contrato que a torna legítima geralmente ocupa toda a abstração.",
          ),
        ],
      }),
      section({
        id: "ferramentas-de-base",
        eyebrow: "Ferramentas",
        title: "Raw pointers, `UnsafeCell` e `MaybeUninit` existem porque há necessidades legítimas que referências seguras não cobrem",
        lead:
          "Esses tipos não são 'inimigos' da linguagem; são peças de baixo nível que exigem encapsulamento disciplinado.",
        visual: "compare-board",
        interactive: "tradeoff-lab",
        paragraphs: [
          "Raw pointers servem para representar endereços e ownership não rastreado pelo borrow checker. `UnsafeCell` é a base formal da interior mutability. `MaybeUninit` permite trabalhar com memória ainda não inicializada sem mentir ao compilador sobre o estado daquele valor.",
          "Essas ferramentas aparecem em coleções, arenas, buffers, registradores mapeados em memória, FFI e estruturas que constroem ou desmontam dados em múltiplas etapas. O benefício é poder expressar layouts e ciclos de vida que seriam difíceis de representar apenas com referências seguras de alto nível.",
          "O custo é que a segurança não vem pronta. Ela precisa ser reconstruída pela abstração que envolve essas peças: checagens, documentação de precondições, testes e desenho cuidadoso de API.",
        ],
        blocks: [
          block(
            "mistake",
            "Atalho perigoso",
            "Usar raw pointers ou `UnsafeCell` sem uma justificativa clara de layout, aliasing ou performance, apenas para driblar empréstimos que pareciam incômodos.",
          ),
        ],
      }),
      section({
        id: "armadilhas-de-soundness",
        eyebrow: "Armadilhas",
        title: "Os bugs mais caros aparecem quando a abstração parece segura por fora, mas quebrou um contrato por dentro",
        lead:
          "É possível encapsular `unsafe` de modo elegante e ainda assim publicar uma API soundness-buggy se os invariantes foram mal pensados.",
        visual: "risk-board",
        paragraphs: [
          "Testes felizes costumam cobrir o uso esperado da API, não os estados estranhos em que aliasing incorreto, double free, uso após movimentação ou tamanhos inconsistentes aparecem. É por isso que o Rustonomicon insiste tanto em raciocínio formal e não apenas em experimento empírico.",
          "Outra fonte de bugs é espalhar `unsafe` por vários pontos do código sem uma única fronteira de responsabilidade. Quando a prova está fragmentada, ninguém sabe exatamente qual função garante o quê, e pequenas mudanças podem quebrar um acordo que ninguém sabia que existia.",
          "Por fim, vale desconfiar de abstrações que dependem de callers 'bonzinhos' sem um tipo ou API que force esse bom comportamento. Se a única defesa do contrato é esperança, a superfície segura não está realmente segura.",
        ],
        blocks: [
          block(
            "insight",
            "Surface area importa",
            "A meta não é zerar `unsafe` a qualquer custo, e sim concentrá-lo em poucos lugares cujo contrato seja legível, testável e revisável.",
          ),
        ],
      }),
      section({
        id: "fronteiras-seguras",
        eyebrow: "Abstração",
        title: "Boa engenharia com unsafe é construir uma API segura em volta de um núcleo pequeno e auditável",
        lead:
          "A melhor abstração é aquela em que o usuário comum nem vê o `unsafe`, mas se beneficia dele por meio de um contrato mais simples.",
        visual: "boundary-board",
        paragraphs: [
          "Muitas das melhores partes do ecossistema Rust funcionam assim: por dentro, há ponteiros crus, layouts específicos e truques de inicialização; por fora, há tipos que restringem o uso a formas sound. O mérito está em separar o lugar onde a prova é feita do lugar onde a API será usada diariamente.",
          "Essa fronteira segura costuma envolver documentação de segurança, `debug_assert!` para invariantes internos, testes direcionados e, quando possível, tipos de alto nível que representem mais explicitamente o estado válido.",
          "Quanto menor e mais local for o bloco `unsafe`, mais fácil fica revisar se a precondição realmente foi satisfeita naquele ponto. Isso reduz o risco de a justificativa virar uma névoa espalhada por vários módulos.",
        ],
        blocks: [
          block(
            "example",
            "Padrão saudável",
            "Use `unsafe` para implementar um detalhe baixo e exponha uma função segura que aceite só estados já validados pelo tipo ou pela API.",
          ),
          block(
            "definition",
            "Safety comment",
            "Comentário curto e específico explicando por que as precondições daquele trecho unsafe são válidas naquele ponto.",
          ),
        ],
      }),
      section({
        id: "auditoria-e-ferramentas",
        eyebrow: "Ferramentas",
        title: "Miri, sanitizers e revisão de invariantes não substituem a prova — mas ajudam a caçar violações",
        lead:
          "Nenhuma ferramenta automaticamente 'garante' soundness, mas elas aumentam a chance de encontrar contradições entre o contrato escrito e o comportamento real.",
        interactive: "scenario-lab",
        paragraphs: [
          "Ferramentas como Miri conseguem detectar várias classes de comportamento indefinido em testes e exemplos pequenos. Sanitizers ajudam a tornar visíveis leituras e escritas inválidas em cenários instrumentados. Nenhuma delas absolve a necessidade de raciocinar sobre invariantes, mas todas ampliam o alcance da auditoria.",
          "Em times, também vale estabelecer padrões de revisão: exigir comentário de segurança, reduzir `unsafe` espalhado, discutir quem garante cada precondição e desconfiar de abstrações cujo contrato só 'parece óbvio'.",
        ],
        blocks: [
          block(
            "example",
            "Checklist curto",
            "Uma revisão de unsafe fica mais forte quando pergunta explicitamente sobre aliasing, inicialização, validade de ponteiros, fronteira de ownership e estados após panic ou early return.",
            [
              "Que ponteiro ou referência está sendo assumido como válido?",
              "Quem garante exclusividade ou compartilhamento correto?",
              "O estado continua válido em todos os caminhos de saída?",
            ],
          ),
        ],
      }),
      section({
        id: "pontes",
        eyebrow: "Conexões",
        title: "Unsafe reaparece em FFI, coleções, runtimes e primitivos de sincronização",
        lead:
          "Estudar fronteiras seguras prepara você para ler boa parte das abstrações sofisticadas do ecossistema Rust com mais respeito e menos misticismo.",
        visual: "impact-board",
        paragraphs: [
          "Sempre que uma biblioteca precisa falar com C, controlar layout em memória, construir uma coleção manualmente ou otimizar acesso compartilhado com muita precisão, surge algum tipo de fronteira unsafe. O que muda entre bibliotecas boas e ruins não é a presença da palavra-chave, mas a qualidade do contrato em torno dela.",
          "Essa percepção também ajuda a avaliar trade-offs. Nem todo uso de unsafe é excessivo; nem toda ausência de unsafe significa melhor desenho. O critério é: a abstração continuou sound para código seguro?",
        ],
        blocks: [
          block(
            "insight",
            "Unsafe bom é invisível para o usuário comum",
            "Se a fronteira foi bem construída, quem consome a API costuma interagir com um contrato seguro, claro e mais difícil de violar por acidente.",
          ),
        ],
      }),
    ],
    quizLead:
      "Confira se a ideia de contrato, invariante e encapsulamento ficou mais forte do que a simples lista de 'superpoderes'.",
    glossaryLead:
      "Consolide o vocabulário que sustenta revisão de código unsafe, leitura do Rustonomicon e desenho de APIs seguras.",
    quiz: [
      q(
        "q1",
        "O que `unsafe` não faz?",
        [
          ["a", "Não desliga automaticamente o borrow checker nem todas as outras verificações da linguagem."],
          ["b", "Não exige nenhum raciocínio adicional de segurança."],
          ["c", "Não pode aparecer em FFI ou coleções."],
        ],
        "a",
        "O Rust Book enfatiza que `unsafe` libera algumas operações específicas, mas não cancela o restante do modelo.",
      ),
      q(
        "q2",
        "Qual é uma diferença importante entre `unsafe fn` e `unsafe {}`?",
        [
          ["a", "`unsafe fn` declara um contrato para quem chama; `unsafe {}` afirma que o contrato necessário foi checado naquele ponto."],
          ["b", "`unsafe fn` é sempre mais rápido que `unsafe {}`."],
          ["c", "`unsafe {}` só pode ser usado em código FFI."],
        ],
        "a",
        "A distinção entre declarar e descarregar obrigações é central para ler `unsafe` corretamente.",
      ),
      q(
        "q3",
        "Qual pergunta ajuda mais a auditar um trecho unsafe?",
        [
          ["a", "Quais invariantes precisam ser verdadeiros antes e depois desta operação?"],
          ["b", "Quantas linhas tem o bloco?"],
          ["c", "Ele usa sintaxe avançada o bastante para parecer confiável?"],
        ],
        "a",
        "O coração da revisão está nas invariantes e precondições, não na aparência do código.",
      ),
      q(
        "q4",
        "Por que `Vec::from_raw_parts` é uma boa referência pedagógica?",
        [
          ["a", "Porque mostra uma API unsafe cujo contrato depende de alinhamento, capacidade, comprimento e origem corretos."],
          ["b", "Porque não depende de nenhum contrato além do tipo do ponteiro."],
          ["c", "Porque torna qualquer ponteiro automaticamente seguro."],
        ],
        "a",
        "Ela ilustra bem como uma assinatura compacta pode carregar precondições profundas.",
      ),
      q(
        "q5",
        "Qual estratégia costuma produzir fronteiras mais seguras?",
        [
          ["a", "Concentrar `unsafe` em um núcleo pequeno e expor uma API segura ao redor."],
          ["b", "Espalhar pequenos trechos unsafe por vários módulos sem documentação."],
          ["c", "Tirar `unsafe` do código e colocá-lo em comentários."],
        ],
        "a",
        "Superfícies pequenas e auditáveis facilitam revisão e reduzem a chance de contrato implícito.",
      ),
      q(
        "q6",
        "Para que serve `UnsafeCell` no ecossistema?",
        [
          ["a", "Ser a base formal das abstrações de interior mutability."],
          ["b", "Garantir thread-safety automática para qualquer mutação."],
          ["c", "Substituir qualquer necessidade de ponteiros crus."],
        ],
        "a",
        "`UnsafeCell` é a base semântica sobre a qual várias abstrações de mutabilidade interna são construídas.",
      ),
      q(
        "q7",
        "O que Miri oferece?",
        [
          ["a", "Ajuda a detectar várias formas de comportamento indefinido em execuções de teste e experimentos controlados."],
          ["b", "Prova soundness completa de qualquer crate."],
          ["c", "Remove a necessidade de escrever safety comments."],
        ],
        "a",
        "Miri é excelente como ferramenta de detecção, mas não substitui o raciocínio sobre invariantes.",
      ),
      q(
        "q8",
        "Qual frase resume melhor o objetivo de trabalhar bem com unsafe?",
        [
          ["a", "Transformar contratos difíceis em uma abstração segura cujo lado de fora continue sound."],
          ["b", "Escrever o máximo de código possível em ponteiros crus para ganhar velocidade."],
          ["c", "Evitar toda documentação porque o compilador já entende a intenção."],
        ],
        "a",
        "Unsafe de qualidade é o que preserva a segurança do lado de fora por meio de uma fronteira bem construída.",
      ),
    ],
    glossary: [
      g("Unsafe Rust", "Conjunto de recursos que permite operações cujo contrato de segurança não pode ser totalmente verificado pelo compilador."),
      g("Unsafe block", "Bloco que afirma que as precondições das operações unsafe contidas nele foram verificadas pelo programador."),
      g("Unsafe function", "Função cuja chamada exige respeitar um contrato extra além do que os tipos expressam sozinhos."),
      g("Unsafe trait", "Trait cuja implementação correta depende de condições de segurança não verificáveis automaticamente."),
      g("Soundness", "Propriedade segundo a qual código seguro não consegue causar undefined behavior através da abstração."),
      g("Undefined Behavior", "Comportamento para o qual a linguagem não define resultado válido e no qual o compilador pode assumir que os contratos foram respeitados."),
      g("Invariant", "Propriedade que precisa continuar verdadeira para que uma estrutura ou API permaneça correta."),
      g("Raw pointer", "Ponteiro cru (`*const T` ou `*mut T`) cujo uso não é controlado pelo borrow checker como referências seguras."),
      g("UnsafeCell", "Tipo de baixo nível que permite interior mutability e serve de base para várias abstrações."),
      g("MaybeUninit", "Tipo usado para representar memória ainda não inicializada sem mentir sobre o estado do valor."),
      g("Aliasing", "Situação em que múltiplos acessos apontam para a mesma região de memória, com regras importantes sobre leitura e escrita."),
      g("Safety comment", "Comentário explicando por que um trecho unsafe é válido naquele contexto."),
    ],
    summaryCards: [
      card("Unsafe não é licença", "Ele desloca a prova de segurança para o programador; não remove o restante do modelo."),
      card("Contrato vem primeiro", "O sentido de `unsafe` está nas precondições e invariantes associadas."),
      card("Peças de baixo nível existem", "Raw pointers, `UnsafeCell` e `MaybeUninit` resolvem problemas legítimos."),
      card("Soundness depende da borda", "A API segura precisa continuar correta mesmo que o miolo use truques internos."),
      card("Ferramentas ajudam", "Miri e sanitizers ampliam a chance de encontrar violações de contrato."),
      card("Boa abstração esconde o perigo", "O usuário comum interage com um contrato seguro, não com o `unsafe` espalhado."),
    ],
  }),
  "rust-ffi-e-c": buildContent({
    id: "rust-ffi-e-c",
    title: "Rust: FFI com C",
    subtitle:
      "Cruzar a fronteira entre Rust e C exige disciplina sobre ABI, layout, ownership, strings, unwinding e sobre quem realmente é dono de cada byte.",
    description:
      "Uma aula avançada sobre `extern \"C\"`, `repr(C)`, pointers, opaque handles, `CString`/`CStr`, build scripts, bindgen/cbindgen e boas fronteiras seguras para interoperabilidade com C.",
    level: "Avançado",
    estimatedTime: "60-70 min",
    tags: [
      "Rust",
      "FFI",
      "C",
      "ABI",
      "repr(C)",
      "bindgen",
      "build.rs",
    ],
    learningObjectives: [
      "Entender por que chamadas FFI são inerentemente unsafe do ponto de vista do compilador Rust.",
      "Explicar o papel de `extern \"C\"`, `repr(C)` e de uma ABI estável na fronteira com C.",
      "Raciocinar sobre ownership, alocação, desalocação e nullability ao atravessar a FFI.",
      "Reconhecer armadilhas com strings, callbacks, structs by-value e unwinding entre linguagens.",
      "Conhecer o papel de `bindgen`, `cbindgen`, `build.rs` e da crate `cc` em integrações práticas.",
      "Aprender a preferir fronteiras pequenas com wrappers seguros e contratos explícitos.",
    ],
    prerequisites: [
      "Noções de ponteiros, ownership e `unsafe` em Rust.",
      "Conhecimento básico de C ajuda, mas o foco da aula é o contrato da fronteira.",
      "Curiosidade sobre bibliotecas legadas, APIs do sistema e integração entre toolchains.",
    ],
    references: [
      ref(
        "Foreign Function Interface",
        "The Rustonomicon",
        "https://doc.rust-lang.org/nomicon/ffi.html",
        "Referência oficial mais importante sobre contratos, layout e cuidados de FFI em Rust.",
      ),
      ref(
        "A little C with your Rust",
        "The Embedded Rust Book",
        "https://docs.rust-embedded.org/book/interoperability/c-with-rust.html",
        "Guia oficial para usar C em projetos Rust, incluindo build scripts e `cc`.",
      ),
      ref(
        "A little Rust with your C",
        "The Embedded Rust Book",
        "https://docs.rust-embedded.org/book/interoperability/rust-with-c.html",
        "Guia oficial para exportar APIs de Rust para projetos em C.",
      ),
      ref(
        "Build Scripts",
        "The Cargo Book",
        "https://doc.rust-lang.org/cargo/reference/build-scripts.html",
        "Documentação oficial para integrar compilação e geração de código na build.",
      ),
      ref(
        "std::ffi",
        "Rust Standard Library",
        "https://doc.rust-lang.org/std/ffi/",
        "Panorama oficial para strings C, tipos básicos de FFI e utilitários relacionados.",
      ),
    ],
    openingText:
      "Muitos sistemas reais não podem viver isolados num ecossistema 100% Rust. Eles precisam chamar bibliotecas C consolidadas, usar APIs de sistema, integrar kernels, drivers, SDKs legados ou expor uma ABI compatível com outro build system. FFI é a ponte para isso — e toda ponte traz custos de tradução. Do lado de Rust, o compilador já não consegue verificar o comportamento do código estrangeiro. Do lado de C, não existe o mesmo modelo de ownership e validade de referências. O trabalho de engenharia está em transformar essa fronteira em algo explícito, pequeno e auditável.",
    quickFacts: [
      card("FFI é unsafe por natureza", "O compilador não consegue provar que o outro lado respeita o modelo de memória de Rust."),
      card("ABI e layout importam", "Assinatura parecida não basta se calling convention ou representação mudam."),
      card("Ownership precisa de dono claro", "Quem aloca, quem libera e quando isso acontece devem ficar explícitos."),
      card("Cópias às vezes simplificam", "Zero-copy na fronteira nem sempre vale o risco extra de lifetime e aliasing."),
    ],
    coreSections: [
      section({
        id: "motivacao",
        eyebrow: "Motivação",
        title: "FFI existe porque software real conversa com bibliotecas, sistemas e toolchains heterogêneos",
        lead:
          "Interoperabilidade não é detalhe periférico; ela é parte da vida normal de quem escreve infraestrutura, runtimes, bindings e migrações incrementais.",
        visual: "hero",
        paragraphs: [
          "Projetos em Rust frequentemente precisam reutilizar bibliotecas maduras em C, chamar APIs de sistema operacional, embutir código em produtos legados ou oferecer uma interface estável para outro ecossistema. Reescrever tudo não é realista nem desejável em muitos contextos.",
          "O problema é que Rust e C não compartilham o mesmo modelo de tipos, ownership ou segurança. Logo, toda fronteira FFI precisa descrever cuidadosamente o que está entrando, o que está saindo e quais garantias foram perdidas no meio do caminho.",
        ],
        blocks: [
          block(
            "insight",
            "Interoperar é traduzir contratos",
            "A dificuldade não está só em chamar uma função; está em alinhar layout, calling convention, ownership e expectativas de validade entre dois mundos.",
          ),
          block(
            "mistake",
            "Erro comum",
            "Tratar a fronteira FFI como se fosse apenas 'mais uma importação', sem explicitar quem controla memória e quais representações são válidas.",
          ),
        ],
      }),
      section({
        id: "abi-e-layout",
        eyebrow: "Modelo mental",
        title: "Primeiro vem a ABI: `extern \"C\"` e `repr(C)` existem para reduzir ambiguidades na fronteira",
        lead:
          "Se os dois lados não concordam sobre chamada e representação, nem a função certa nem os bytes certos chegarão do outro lado de forma confiável.",
        visual: "concept-map",
        interactive: "model-lab",
        paragraphs: [
          "Ao declarar `extern \"C\"`, você está dizendo ao compilador para usar a ABI C naquela fronteira. Isso é importante porque a ABI padrão de Rust não é a ABI C e, além disso, C++ não oferece uma ABI estável única que o compilador Rust possa mirar diretamente em geral.",
          "`repr(C)` existe para aproximar a representação binária de structs, unions e alguns enums ao modelo C esperado naquela plataforma, reduzindo surpresas de layout. Isso ainda não torna qualquer tipo automaticamente FFI-safe: enums sem campos, enums com payload e outros tipos mais exóticos continuam exigindo checagem caso a caso do contrato real.",
          "Esses marcadores não 'provam segurança'. Eles apenas tornam o acordo binário mais previsível. O restante do trabalho continua dependendo de ownership, validade e documentação.",
        ],
        blocks: [
          block(
            "definition",
            "ABI",
            "Conjunto de convenções binárias que define como funções são chamadas, como valores são passados e como símbolos e tipos se comportam na fronteira entre componentes compilados.",
          ),
          block(
            "definition",
            "`repr(C)`",
            "Atributo usado para aproximar a representação binária de um tipo ao layout esperado pela ABI C, sem por si só tornar qualquer uso automaticamente seguro em FFI.",
          ),
        ],
      }),
      section({
        id: "ownership-e-ponteiros",
        eyebrow: "Ownership",
        title: "Quem aloca, quem libera e quem pode usar o ponteiro depois? Essa é a conversa central",
        lead:
          "Muitas dores de FFI não vêm da chamada em si, mas da semântica do recurso que atravessou a chamada.",
        visual: "flow",
        paragraphs: [
          "Chamadas FFI frequentemente trafegam ponteiros, buffers, callbacks e handles opacos. Em cada caso, você precisa saber se o ponteiro é apenas empréstimo temporário, se transfere ownership, se pode ser nulo, se aponta para memória mutável ou se exige desalocação por uma função específica.",
          "Misturar alocador de um lado com desalocador do outro, manter ponteiros além do lifetime prometido ou esquecer se o ponteiro ainda é válido são fontes clássicas de bugs. É por isso que wrappers seguros tentam traduzir tudo para um contrato mais idiomático assim que possível.",
          "Muitas APIs sólidas preferem opaque handles justamente para reduzir exposição de layout e controlar melhor quem gerencia destruição e mutabilidade.",
        ],
        blocks: [
          block(
            "example",
            "Regra de bolso",
            "Sempre documente se o ponteiro é apenas leitura, escrita, empréstimo temporário, transferência de posse ou handle cujo destroy precisa voltar para a biblioteca original.",
          ),
          block(
            "insight",
            "Ownership mal explicado vira bug tardio",
            "O ponteiro pode continuar existindo por muito tempo depois que o contrato sobre ele já foi quebrado.",
          ),
        ],
      }),
      section({
        id: "strings-buffers-callbacks",
        eyebrow: "Representação",
        title: "Strings, buffers e callbacks parecem simples até o momento em que semânticas diferentes colidem",
        lead:
          "A fronteira com C é especialmente sensível quando dados compostos ou fluxos de chamada reversa entram em cena.",
        visual: "compare-board",
        interactive: "tradeoff-lab",
        paragraphs: [
          "Strings C normalmente são tratadas como ponteiros para bytes terminados em NUL, enquanto strings Rust carregam invariantes e tipos diferentes. `CString` e `CStr` existem justamente para ajudar nessa tradução de forma explícita.",
          "Buffers também exigem atenção: às vezes o contrato usa `(ptr, len)`, às vezes espera terminação especial, às vezes quer um ponteiro para memória mutável previamente alocada. Em callbacks, o desafio se estende para quem possui o contexto, em qual thread o callback pode ser chamado e por quanto tempo as referências continuam válidas.",
          "Quanto mais dados compostos e fluxo reverso a API exige, maior a vantagem de esconder a superfície crua atrás de wrappers de alto nível.",
        ],
        blocks: [
          block(
            "mistake",
            "Armadilha comum",
            "Assumir que `String`, `&str`, `char*` e pares `(ptr, len)` são representações intercambiáveis sem uma camada de tradução explícita.",
          ),
        ],
      }),
      section({
        id: "armadilhas",
        eyebrow: "Armadilhas",
        title: "Unwinding, allocators e suposições de layout são fontes silenciosas de problemas",
        lead:
          "Alguns bugs de FFI não aparecem como crash imediato; eles corrompem o acordo binário e só se manifestam depois.",
        visual: "risk-board",
        paragraphs: [
          "O Rustonomicon destaca o cuidado com unwinding: se você espera que panic do Rust ou exceção estrangeira atravesse uma fronteira ABI, a fronteira precisa usar explicitamente uma ABI que permita unwind, como `extern \"C-unwind\"`. Deixar unwind atravessar uma fronteira declarada como `extern \"C\"` ou outra ABI não-unwind é comportamento indefinido; se essa travessia não faz parte do contrato, a borda deve conter esse comportamento antes de cruzar.",
          "Outro ponto clássico é desalocar um recurso do lado errado. Mesmo que o valor 'pareça' ser apenas um ponteiro, o alocador, o destrutor e a convenção esperada podem ser específicos da biblioteca que o criou.",
          "Também vale desconfiar de structs, enums ou booleans assumidos como compatíveis sem prova suficiente de layout e convenção. A forma mais barata de quebrar FFI é supor demais sobre representação binária.",
        ],
        blocks: [
          block(
            "insight",
            "Compatibilidade binária é concreta",
            "Na fronteira FFI, o contrato já não é só semântico. Ele também é físico: bits, ordem, calling convention e política de destruição importam de verdade.",
          ),
        ],
      }),
      section({
        id: "build-e-geracao",
        eyebrow: "Tooling",
        title: "Build scripts, `cc`, bindgen e cbindgen ajudam a reduzir trabalho manual e descompassos",
        lead:
          "Interoperabilidade sustentada depende tanto de código quanto de integração correta entre toolchains.",
        visual: "boundary-board",
        paragraphs: [
          "O Embedded Rust Book recomenda `bindgen` para gerar bindings Rust a partir de headers C e `cbindgen` para gerar headers C a partir de APIs Rust expostas para fora. Isso reduz erro manual e ajuda a manter a fronteira alinhada com mudanças reais de assinatura.",
          "Quando o código C faz parte do próprio projeto, `build.rs` e a crate `cc` permitem compilar e linkar artefatos durante a build do Cargo. Em projetos maiores, o build script também pode chamar sistemas existentes ou coordenar geração de código.",
          "A meta não é automatizar por automatizar. É reduzir o número de pontos onde um header, um layout ou uma assinatura podem se desalinhar silenciosamente do código que você realmente compilou.",
        ],
        blocks: [
          block(
            "example",
            "Ferramentas típicas",
            "Use `bindgen` quando Rust consome headers C; use `cbindgen` quando C consome uma API pública escrita em Rust; use `build.rs` para orquestrar compilação e linkedição.",
          ),
        ],
      }),
      section({
        id: "design-de-fronteira",
        eyebrow: "Engenharia",
        title: "A melhor FFI costuma ser a que mantém a superfície crua pequena e o contrato seguro logo depois dela",
        lead:
          "Chamar a função estrangeira pode ser uma linha; a engenharia real está em embrulhar essa linha de um jeito que o restante do programa consiga usar sem tropeçar.",
        interactive: "scenario-lab",
        paragraphs: [
          "Wrappers bons convertem ponteiros crus em tipos Rust assim que possível, restringem nullability, validam tamanhos, esclarecem ownership e evitam expor o restante da base de código a detalhes binários demais.",
          "Na direção oposta, quando Rust exporta uma API para C, vale preferir funções e handles simples, com destrutores explícitos e pouca dependência de representações complexas. Quanto menos estado implícito passar pela fronteira, melhor.",
        ],
        blocks: [
          block(
            "example",
            "Perguntas de desenho",
            "Ao revisar uma fronteira FFI, vale perguntar se a ABI está clara, se ownership está documentado e se o código seguro interno consegue esquecer a superfície crua rapidamente.",
            [
              "Quem libera cada recurso?",
              "Que layout está sendo assumido?",
              "O restante do programa precisa mesmo lidar com ponteiros crus?",
            ],
          ),
        ],
      }),
      section({
        id: "pontes",
        eyebrow: "Conexões",
        title: "FFI conversa com unsafe, build systems, alocação e APIs públicas",
        lead:
          "Estudar FFI com cuidado melhora a qualidade de qualquer integração entre runtimes e não apenas de bindings 'exóticos'.",
        visual: "impact-board",
        paragraphs: [
          "Muitos dos temas da aula anterior reaparecem aqui: invariantes, ponteiros, ownership, soundness e fronteiras pequenas. A diferença é que agora a fonte da incerteza não é só um detalhe de layout interno; é outro ecossistema de compilação, memória e convenções.",
          "Dominar essa camada ajuda tanto em bindings para sistemas operacionais quanto em migrações graduais de bases legadas, bibliotecas de compressão, codecs, bancos e SDKs nativos.",
        ],
        blocks: [
          block(
            "insight",
            "Interoperar bem é preservar contratos sob tradução",
            "A melhor FFI não tenta fingir que Rust e C são iguais; ela desenha explicitamente a diferença e organiza o restante do programa em volta disso.",
          ),
        ],
      }),
    ],
    quizLead:
      "Verifique se ABI, ownership, strings e tooling ficaram conectados como partes do mesmo contrato de interoperabilidade.",
    glossaryLead:
      "Feche a aula consolidando o vocabulário de ABI, layout e integração que volta sempre em bindings e migrações graduais.",
    quiz: [
      q(
        "q1",
        "Por que chamadas FFI são consideradas unsafe em Rust?",
        [
          ["a", "Porque o compilador não consegue verificar automaticamente se o código estrangeiro respeita os contratos esperados."],
          ["b", "Porque toda função em C é mais lenta."],
          ["c", "Porque `extern \"C\"` desliga toda verificação de tipos."],
        ],
        "a",
        "O problema central é a incapacidade do compilador de provar o comportamento do lado estrangeiro.",
      ),
      q(
        "q2",
        "Qual é o papel de `extern \"C\"`?",
        [
          ["a", "Pedir ao compilador que use a ABI C naquela fronteira."],
          ["b", "Garantir automaticamente que o código é sound."],
          ["c", "Transformar qualquer tipo Rust em FFI-safe."],
        ],
        "a",
        "`extern \"C\"` alinha a calling convention; ele não resolve ownership nem valida layout sozinho.",
      ),
      q(
        "q3",
        "Quando `repr(C)` costuma entrar na conversa?",
        [
          ["a", "Quando o layout de um tipo estruturado precisa ser compatível com o que C espera."],
          ["b", "Quando queremos tornar qualquer enum Rust seguro para FFI sem pensar em detalhes."],
          ["c", "Somente em programas sem ponteiros."],
        ],
        "a",
        "`repr(C)` ajuda a tornar a representação mais previsível na fronteira binária.",
      ),
      q(
        "q4",
        "Qual pergunta é central em qualquer ponteiro passado por FFI?",
        [
          ["a", "Quem aloca, quem libera e por quanto tempo esse ponteiro continua válido?"],
          ["b", "Quantos comentários existem no header?"],
          ["c", "Qual editor foi usado para compilar a biblioteca?"],
        ],
        "a",
        "Ownership e validade do ponteiro são o núcleo do contrato operacional.",
      ),
      q(
        "q5",
        "Por que `CString` e `CStr` são úteis?",
        [
          ["a", "Porque ajudam a traduzir explicitamente entre contratos de strings em Rust e strings C terminadas em NUL."],
          ["b", "Porque removem qualquer necessidade de lidar com buffers."],
          ["c", "Porque fazem panic sempre que recebem UTF-8."],
        ],
        "a",
        "Eles explicitam a diferença entre as representações e evitam tratar strings como se fossem equivalentes por magia.",
      ),
      q(
        "q6",
        "Qual é uma armadilha clássica de FFI?",
        [
          ["a", "Desalocar um recurso do lado errado ou assumir layout binário sem prova suficiente."],
          ["b", "Usar ferramentas de geração de bindings."],
          ["c", "Preferir opaque handles quando a API é complexa."],
        ],
        "a",
        "Mismatched allocators e suposições de layout são fontes recorrentes de bugs difíceis.",
      ),
      q(
        "q7",
        "Quando `bindgen` e `cbindgen` ajudam mais?",
        [
          ["a", "Quando queremos reduzir erro manual na sincronização entre código e headers."],
          ["b", "Quando não existe nenhuma fronteira entre C e Rust."],
          ["c", "Somente em projetos acadêmicos sem build system real."],
        ],
        "a",
        "Essas ferramentas ajudam a manter assinaturas e tipos mais alinhados ao código compilado de verdade.",
      ),
      q(
        "q8",
        "Qual frase resume melhor a engenharia de uma boa fronteira FFI?",
        [
          ["a", "Manter a superfície crua pequena e converter cedo para contratos mais seguros e explícitos."],
          ["b", "Expor ponteiros crus o máximo possível para não esconder detalhes."],
          ["c", "Confiar que ABI correta já resolve ownership e lifetime."],
        ],
        "a",
        "A meta madura é que o restante do programa esqueça a superfície crua o mais rápido possível.",
      ),
    ],
    glossary: [
      g("FFI", "Foreign Function Interface: mecanismo de interoperabilidade entre linguagens ou componentes binários distintos."),
      g("ABI", "Conjunto de convenções binárias sobre chamada, passagem de argumentos e representação de valores."),
      g("`extern \"C\"`", "Anotação usada para empregar a ABI C numa função ou bloco externo."),
      g("`repr(C)`", "Atributo que aproxima a representação binária de um tipo ao layout esperado por C na plataforma atual, sem tornar qualquer uso automaticamente FFI-safe."),
      g("Opaque handle", "Tipo opaco exposto na fronteira para esconder layout interno e controlar melhor ownership."),
      g("CString", "Tipo Rust para strings compatíveis com C, com terminação em NUL."),
      g("CStr", "View para interpretar uma string C recebida de fora sem tomar ownership dos bytes por padrão."),
      g("Nullability", "Possibilidade de um ponteiro ser nulo e a necessidade de tratar isso explicitamente no contrato."),
      g("Callback", "Função passada a outro componente para ser chamada posteriormente, às vezes com contexto associado."),
      g("build.rs", "Script de build do Cargo usado para orquestrar compilação, linkedição ou geração de código."),
      g("bindgen", "Ferramenta que gera bindings Rust a partir de headers C."),
      g("cbindgen", "Ferramenta que gera headers C a partir de APIs públicas escritas em Rust."),
    ],
    summaryCards: [
      card("FFI é fronteira", "Ela traduz contratos entre ecossistemas com modelos de memória e build diferentes."),
      card("ABI vem primeiro", "`extern \"C\"` e `repr(C)` ajudam a alinhar o acordo binário."),
      card("Ownership precisa ficar explícito", "Quem aloca, quem libera e por quanto tempo o recurso vive são perguntas centrais."),
      card("Strings e callbacks merecem atenção extra", "Representações e fluxos reversos complicam a borda rapidamente."),
      card("Tooling reduz erro manual", "bindgen, cbindgen e build.rs ajudam a manter a integração coerente."),
      card("Wrapper seguro é o objetivo", "A melhor FFI costuma esconder a superfície crua cedo e bem."),
    ],
  }),
  "rust-tooling-cargo-perf": buildContent({
    id: "rust-tooling-cargo-perf",
    title: "Rust: Cargo, Tests e Perf Tooling",
    subtitle:
      "Produtividade e performance em Rust dependem tanto de código quanto de loop de feedback: `cargo check`, perfis de build, testes, benchmarks e profiling precisam conversar.",
    description:
      "Uma aula intermediária sobre o mapa mental de Cargo, perfis `dev`/`release`/`test`/`bench`, testes, benchmarking honesto e profiling com `perf` e flamegraphs sem otimizar no escuro.",
    level: "Intermediário",
    estimatedTime: "55-65 min",
    tags: [
      "Rust",
      "Cargo",
      "Testing",
      "Benchmarking",
      "Profiling",
      "perf",
      "Flamegraph",
    ],
    learningObjectives: [
      "Entender o papel de `cargo check`, `build`, `test` e `bench` no loop de desenvolvimento.",
      "Relacionar os perfis `dev`, `release`, `test` e `bench` às propriedades de compilação e depuração.",
      "Distinguir testes, benchmarks e profiling como ferramentas para perguntas diferentes.",
      "Reconhecer por que medir performance em build errada ou workload não representativo produz conclusões frágeis.",
      "Conhecer práticas úteis para perf em Rust, como debuginfo adequado e frame pointers quando necessário.",
      "Montar um workflow mais disciplinado de regressão, diagnóstico e experimentação de desempenho.",
    ],
    prerequisites: [
      "Noções básicas de projetos Rust com Cargo.",
      "Curiosidade sobre medição, build e diagnóstico de performance.",
      "Não é preciso dominar Linux perf para acompanhar a aula conceitualmente.",
    ],
    references: [
      ref(
        "cargo check",
        "The Cargo Book",
        "https://doc.rust-lang.org/cargo/commands/cargo-check.html",
        "Documentação oficial do comando mais importante para feedback rápido no ciclo de edição.",
      ),
      ref(
        "cargo test",
        "The Cargo Book",
        "https://doc.rust-lang.org/cargo/commands/cargo-test.html",
        "Documentação oficial sobre testes unitários, integração e doc tests.",
      ),
      ref(
        "cargo bench",
        "The Cargo Book",
        "https://doc.rust-lang.org/cargo/commands/cargo-bench.html",
        "Documenta como Cargo orquestra targets de benchmark e perfis relacionados.",
      ),
      ref(
        "Profiles",
        "The Cargo Book",
        "https://doc.rust-lang.org/cargo/reference/profiles.html",
        "Referência oficial para `dev`, `release`, `test`, `bench` e perfis customizados.",
      ),
      ref(
        "Profiling",
        "The Rust Performance Book",
        "https://nnethercote.github.io/perf-book/profiling.html",
        "Guia prático para profiling em Rust, incluindo debuginfo e frame pointers.",
      ),
      ref(
        "perf(1)",
        "Linux man-pages project",
        "https://man7.org/linux/man-pages/man1/perf.1.html",
        "Referência para a ferramenta de profiling `perf` em Linux.",
      ),
    ],
    openingText:
      "Em performance engineering, a ferramenta errada produz convicção errada. Um benchmark rodado em build `dev`, um flamegraph sem símbolos úteis ou uma regressão julgada apenas por sensação levam o time a conversar sobre números sem estar medindo a mesma coisa. Em Rust, Cargo organiza muito desse mundo: perfis de compilação, testes, benches e integração com o restante do tooling. A meta desta aula é menos 'decorar comandos' e mais entender como montar um loop de feedback honesto entre editar, validar, medir e diagnosticar.",
    quickFacts: [
      card("`cargo check` acelera iteração", "Ele verifica o código sem produzir o artefato final completo do mesmo jeito que `build`."),
      card("Perfis mudam o comportamento", "Resultados de `dev` e `release` podem contar histórias muito diferentes sobre o mesmo código."),
      card("Teste não é benchmark", "Cada ferramenta responde a uma pergunta distinta sobre corretude, regressão e custo."),
      card("Perfil antes de otimizar", "Sem profiling, é fácil melhorar a parte errada do programa."),
    ],
    coreSections: [
      section({
        id: "motivacao",
        eyebrow: "Motivação",
        title: "O loop de feedback é parte da engenharia, não só da ergonomia",
        lead:
          "Times que medem bem editam melhor, testam melhor e erram menos quando precisam investigar regressões ou gargalos.",
        visual: "hero",
        paragraphs: [
          "Projetos Rust sérios vivem em um ciclo contínuo de edição, checagem, teste, build, benchmark e profiling. Ignorar esse ciclo e tratar cada ferramenta como comando isolado produz decisões lentas e conclusões frágeis.",
          "O valor do Cargo está em dar linguagem e estrutura a esse fluxo: cada comando tende a responder uma pergunta diferente sobre o estado atual do projeto. Confundir as perguntas é um dos erros mais caros em performance.",
        ],
        blocks: [
          block(
            "insight",
            "Ferramenta responde pergunta",
            "Antes de rodar qualquer comando, vale explicitar se você quer feedback rápido, validação de corretude, comparação de custo ou diagnóstico de hot paths.",
          ),
          block(
            "mistake",
            "Erro comum",
            "Tirar conclusões de performance a partir da build mais conveniente, e não da build que representa o problema real.",
          ),
        ],
      }),
      section({
        id: "mapa-do-cargo",
        eyebrow: "Modelo mental",
        title: "Cargo organiza o fluxo de trabalho: checar, compilar, testar e medir não são a mesma etapa",
        lead:
          "Uma visão limpa do mapa de comandos evita usar a ferramenta certa no momento errado.",
        visual: "concept-map",
        interactive: "model-lab",
        paragraphs: [
          "`cargo check` é excelente para feedback rápido no loop de edição. `cargo build` produz artefatos compilados. `cargo test` valida corretude em testes unitários, integração e doc tests. `cargo bench` organiza targets de benchmark e seu perfil associado.",
          "O detalhe importante é não confundir comando com harness nativo: o comando `cargo bench` existe no stable, mas o harness padrão com `#[bench]` continua unstable e nightly-only. Em projetos stable, é comum usar harness customizado com ferramentas como Criterion.",
          "Isso não quer dizer que cada comando vive isolado. O valor está em combiná-los adequadamente: editar com feedback rápido, validar mudanças, rodar testes focados, reproduzir cenários realistas e então medir de forma consciente.",
          "Quando esse mapa mental está claro, o time para de esperar que um único comando responda simultaneamente questões de sintaxe, regressão, ergonomia e throughput.",
        ],
        blocks: [
          block(
            "definition",
            "Loop de feedback",
            "Sequência de passos que transforma uma alteração no código em evidência sobre corretude, custo e impacto operacional.",
          ),
        ],
      }),
      section({
        id: "profiles",
        eyebrow: "Build",
        title: "Perfis de compilação mudam otimizações, debuginfo e até o tipo de pergunta que faz sentido responder",
        lead:
          "`dev`, `release`, `test` e `bench` existem porque velocidade de iteração e realismo de execução nem sempre apontam na mesma direção.",
        visual: "flow",
        paragraphs: [
          "A Cargo Book explica que `cargo build` e `cargo check` usam `dev` por padrão, `cargo test` usa `test`, e `cargo bench` usa `bench`, que herda de `release`. Isso já muda otimização, assertions, overflow checks, debuginfo e outros detalhes importantes.",
          "Esse ponto fala do perfil de compilação, não da estabilidade do harness interno. Mesmo quando o benchmark roda em perfil `bench`, o caminho concreto no stable frequentemente passa por harness customizado em vez do `#[bench]` nativo.",
          "Uma das lições mais úteis é abandonar a ideia de que 'compilar é compilar'. O mesmo código pode ter comportamento de performance e observabilidade muito diferente dependendo do perfil escolhido.",
          "Também entra aqui a noção de perfis customizados. Às vezes faz sentido criar um meio-termo entre rapidez de desenvolvimento e proximidade de produção, especialmente para investigação recorrente.",
        ],
        blocks: [
          block(
            "example",
            "Regra prática",
            "Use `dev` para iteração, `test` para validar corretude, `release` ou `bench` para observar custo mais próximo do artefato otimizado — salvo quando a depuração exigir outro equilíbrio.",
          ),
          block(
            "insight",
            "Perfil também é design de workflow",
            "Escolher bem o perfil poupa tempo e evita comparar números vindos de mundos de compilação diferentes.",
          ),
        ],
      }),
      section({
        id: "testes-e-docs",
        eyebrow: "Corretude",
        title: "Testes respondem 'continua correto?', não 'continua rápido?'",
        lead:
          "Mesmo assim, a maneira como você organiza testes afeta muito a confiabilidade do projeto e do próprio ciclo de performance.",
        visual: "compare-board",
        interactive: "tradeoff-lab",
        paragraphs: [
          "Unit tests, integration tests e doc tests ajudam a cobrir camadas diferentes do contrato do sistema. Uma otimização que parece brilhante e quebra invariantes sutis continua sendo regressão, mesmo que rode alguns microssegundos mais rápido.",
          "Ao mesmo tempo, testes não devem ser usados como benchmark improvisado. Rodar `cargo test` e observar 'pareceu rápido' não substitui workload representativa nem ferramentas específicas de medição.",
          "A maturidade aqui é separar as perguntas sem separar totalmente o workflow: primeiro assegure corretude, depois meça custo daquilo que continua correto.",
        ],
        blocks: [
          block(
            "mistake",
            "Confusão frequente",
            "Usar suíte de testes como se fosse evidência suficiente de performance, ou benchmark como se fosse prova de corretude.",
          ),
        ],
      }),
      section({
        id: "benchmark-vs-profile",
        eyebrow: "Medição",
        title: "Benchmark compara custos; profiling mostra para onde o tempo vai",
        lead:
          "As duas práticas se complementam, mas produzem evidências diferentes.",
        visual: "risk-board",
        paragraphs: [
          "Benchmarking serve para comparar alternativas sob uma carga conhecida. Profiling serve para localizar hot paths, chamadas dominantes, stack traces e padrões de uso de CPU ou outras métricas. Um benchmark pode dizer que a versão B ficou mais lenta; o perfil ajuda a explicar por quê.",
          "A Rust Performance Book insiste no profiling como etapa essencial antes de otimizar. Sem ele, é fácil gastar energia micro-otimizando a parte errada ou interpretar ruído como descoberta real.",
          "Essa distinção fica ainda mais importante em sistemas maiores, nos quais o custo total depende de chamada de biblioteca, layout de memória, syscalls, alocação, serialização e espera por I/O ao mesmo tempo.",
        ],
        blocks: [
          block(
            "insight",
            "Medir não é uma única coisa",
            "Perguntas de comparação e perguntas de diagnóstico exigem ferramentas e leituras diferentes.",
          ),
        ],
      }),
      section({
        id: "profiling-rust-na-pratica",
        eyebrow: "Perf",
        title: "Para perfis úteis, o binário precisa ser observável o bastante sem deixar de ser representativo",
        lead:
          "Debuginfo, frame pointers e perfil de build influenciam fortemente a qualidade do que as ferramentas enxergam.",
        visual: "boundary-board",
        paragraphs: [
          "A Rust Performance Book recomenda, em vários casos, habilitar pelo menos `debug = \"line-tables-only\"` em builds de `release` usadas para profiling, porque isso melhora a legibilidade de stack traces e linhas de código sem transformar o binário em uma build de desenvolvimento comum.",
          "Ela também chama atenção para frame pointers: em certos cenários, forçar `-C force-frame-pointers=yes` melhora a qualidade de stacks para ferramentas como `perf`. O objetivo não é decorar uma receita fixa, e sim entender que o observador também precisa de configuração adequada.",
          "Em Linux, `perf` e flamegraphs ajudam a localizar regiões quentes. O ganho real aparece quando a coleta foi feita sobre workload representativa e com símbolos suficientes para que a análise seja legível.",
        ],
        blocks: [
          block(
            "example",
            "Boa prática",
            "Antes de abrir um flamegraph, confirme em que perfil o binário foi gerado, qual carga o exercitou e se o nível de debuginfo permite interpretação útil.",
          ),
        ],
      }),
      section({
        id: "cenario-de-engenharia",
        eyebrow: "Engenharia",
        title: "Workflow maduro: editar rápido, validar cedo, medir certo, diagnosticar com contexto",
        lead:
          "Ferramenta boa sem processo bom ainda produz confusão; o ganho vem da sequência das perguntas.",
        interactive: "scenario-lab",
        paragraphs: [
          "No dia a dia, faz sentido usar `cargo check` no loop de edição, `cargo test` para regressões e um caminho separado para reproduzir gargalos reais com perfis representativos. Quando aparece uma suspeita de performance, benchmarking e profiling entram em momentos diferentes do mesmo raciocínio.",
          "Esse workflow também melhora colaboração: ao relatar uma regressão, você consegue dizer em qual perfil mediu, qual carga usou, qual ferramenta coletou o dado e qual hipótese o perfil sugeriu.",
        ],
        blocks: [
          block(
            "example",
            "Sequência produtiva",
            "Uma boa investigação geralmente alterna velocidade de iteração e fidelidade de medição em vez de buscar um único modo de trabalho para tudo.",
            [
              "Editar e checar rapidamente.",
              "Validar corretude com testes focados.",
              "Reproduzir custo em perfil representativo.",
              "Usar profiling para localizar a causa provável.",
            ],
          ),
        ],
      }),
      section({
        id: "pontes",
        eyebrow: "Conexões",
        title: "Cargo e perf tooling conectam o código à operação real do sistema",
        lead:
          "Quanto mais baixo o nível do problema, mais importante fica saber exatamente o que foi compilado, como foi medido e de onde vieram os stacks.",
        visual: "impact-board",
        paragraphs: [
          "Essas ferramentas fazem a ponte entre o código fonte, a configuração de compilação e o comportamento em execução. Sem essa ponte, discussões sobre performance degeneram rapidamente em palpite, e discussões sobre regressão viram guerra de percepções.",
          "Por isso a aula fecha voltando ao mesmo princípio da trilha: medir antes de otimizar, mas medir com artefato, carga e pergunta coerentes com o problema que você está tentando resolver.",
        ],
        blocks: [
          block(
            "insight",
            "Ferramenta certa, pergunta certa, build certa",
            "Quando essas três coisas se alinham, a análise de performance deixa de ser teatro e vira engenharia reproduzível.",
          ),
        ],
      }),
    ],
    quizLead:
      "Confira se comandos, perfis, testes, benchmarking e profiling ficaram separados na sua cabeça pelas perguntas que cada um responde.",
    glossaryLead:
      "Consolide o vocabulário que sustenta um workflow mais honesto de build, teste e performance em Rust.",
    quiz: [
      q(
        "q1",
        "Para que `cargo check` é especialmente útil?",
        [
          ["a", "Para feedback rápido no loop de edição, sem o mesmo foco em produzir o artefato final que `build` teria."],
          ["b", "Para medir throughput final em produção."],
          ["c", "Para substituir qualquer necessidade de testes."],
        ],
        "a",
        "`cargo check` é valioso porque acelera o ciclo de validação estrutural enquanto você ainda está editando.",
      ),
      q(
        "q2",
        "Qual perfil `cargo test` usa por padrão?",
        [
          ["a", "`release`"],
          ["b", "`test`"],
          ["c", "`bench`"],
        ],
        "b",
        "A Cargo Book deixa claro que `cargo test` usa o perfil `test`, que herda de `dev`.",
      ),
      q(
        "q3",
        "Qual perfil `cargo bench` usa por padrão?",
        [
          ["a", "`dev`"],
          ["b", "`test`"],
          ["c", "`bench`"],
        ],
        "c",
        "O perfil `bench` herda de `release` e existe justamente para workloads de benchmark.",
      ),
      q(
        "q4",
        "Qual diferença resume melhor benchmark e profiling?",
        [
          ["a", "Benchmark compara custos entre alternativas; profiling ajuda a localizar onde o programa gasta tempo."],
          ["b", "Benchmark prova corretude; profiling substitui testes."],
          ["c", "São sinônimos com nomes diferentes."],
        ],
        "a",
        "As duas práticas se complementam, mas respondem perguntas diferentes.",
      ),
      q(
        "q5",
        "Por que medir performance em build `dev` pode ser enganoso?",
        [
          ["a", "Porque otimizações, assertions e outras configurações podem ser muito diferentes do artefato que se quer avaliar."],
          ["b", "Porque `dev` não executa código."],
          ["c", "Porque `dev` é sempre mais rápido que `release`."],
        ],
        "a",
        "O perfil muda bastante o comportamento do binário e, portanto, o valor da medição.",
      ),
      q(
        "q6",
        "Que prática a Rust Performance Book destaca para melhorar profiling de release em muitos casos?",
        [
          ["a", "Adicionar debuginfo suficiente, como `line-tables-only`, para tornar stacks mais legíveis."],
          ["b", "Desabilitar qualquer símbolo para reduzir o tamanho do binário."],
          ["c", "Usar apenas testes unitários como fonte de profiling."],
        ],
        "a",
        "Sem debuginfo útil, o profiler enxerga muito menos do que você precisa para diagnosticar o hot path.",
      ),
      q(
        "q7",
        "Qual é um erro clássico em investigações de performance?",
        [
          ["a", "Otimizar antes de perfilar e concluir demais a partir de workload pouco representativa."],
          ["b", "Separar corretude de medição no workflow."],
          ["c", "Anotar em qual perfil a medição foi feita."],
        ],
        "a",
        "Sem pergunta clara e coleta representativa, a análise facilmente vira ruído ou teatro.",
      ),
      q(
        "q8",
        "Qual frase resume melhor a aula?",
        [
          ["a", "Build, teste e profiling são partes de um mesmo loop de feedback, mas cada uma responde perguntas diferentes."],
          ["b", "Qualquer comando do Cargo serve para qualquer finalidade desde que rode rápido."],
          ["c", "Performance depende apenas da linguagem, não do modo de compilação e medição."],
        ],
        "a",
        "O objetivo foi justamente separar as perguntas e recompor um workflow coerente entre elas.",
      ),
    ],
    glossary: [
      g("Cargo", "Ferramenta oficial de build, gerenciamento de dependências e orquestração de workflow em projetos Rust."),
      g("Profile", "Conjunto de configurações de compilação que afeta otimização, debuginfo, assertions e outros aspectos do binário."),
      g("dev", "Perfil voltado para desenvolvimento e iteração rápida."),
      g("release", "Perfil voltado para artefatos otimizados."),
      g("test", "Perfil padrão de `cargo test`, herdando em geral de `dev`."),
      g("bench", "Perfil padrão de `cargo bench`, herdando em geral de `release`; o comando existe no stable, mas o harness nativo com `#[bench]` continua nightly-only."),
      g("Doc test", "Exemplo em documentação executado como teste para validar que o uso exibido continua correto."),
      g("Benchmark", "Medição comparativa de custo sob um workload definido."),
      g("Profiler", "Ferramenta que ajuda a localizar onde o programa gasta tempo ou outros recursos."),
      g("Flamegraph", "Visualização agregada de stacks quentes para destacar regiões dominantes de execução."),
      g("Debuginfo", "Informação adicional embutida ou associada ao binário para melhorar depuração e profiling."),
      g("Frame pointer", "Metadado/estrutura de stack que pode ajudar ferramentas de profiling a reconstruir chamadas com mais qualidade."),
    ],
    summaryCards: [
      card("Ferramenta responde pergunta", "Use Cargo e perf tooling conforme a evidência que você precisa."),
      card("Perfis importam", "`dev`, `release`, `test` e `bench` mudam o binário e a leitura dos resultados."),
      card("Teste não mede hot path", "Corretude e custo precisam de ferramentas diferentes."),
      card("Benchmark e profiling se complementam", "Um compara alternativas; o outro explica onde o tempo foi gasto."),
      card("Observabilidade do binário conta", "Debuginfo e frame pointers podem fazer diferença na qualidade do diagnóstico."),
      card("Workflow disciplinado vence palpite", "Editar rápido, validar cedo e medir direito reduz regressões e debates vagos."),
    ],
  }),
};
