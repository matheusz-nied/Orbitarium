import type { LessonContent } from "../../../types/content";

export const rustCollectionsEAlocacaoContent: LessonContent = {
  id: "rust-collections-e-alocacao",
  title: "Rust: Collections e Alocação",
  subtitle:
    "Escolher entre array, slice, Vec, String e HashMap em Rust não é apenas questão de sintaxe: é decidir forma de posse, crescimento, layout e custo de alocação.",
  description:
    "Aula interativa sobre collections da biblioteca padrão, heap e crescimento dinâmico, capacidade de Vec, relação entre String e &str, ownership em HashMap, custo de clones e estratégias para reduzir alocações acidentais em software real.",
  primaryCategoryId: "computacao",
  secondaryCategoryId: "engenharia",
  level: "Intermediário",
  estimatedTime: "50-60 min",
  tags: [
    "Rust",
    "Vec",
    "String",
    "HashMap",
    "Alocação",
    "Collections",
  ],
  learningObjectives: [
    "Relacionar collections de Rust à ideia de dados alocados na heap com tamanho variável.",
    "Entender capacidade, crescimento e realocação especialmente em Vec e String.",
    "Distinguir String de &str e reconhecer quando a posse de texto é realmente necessária.",
    "Interpretar a entrada de chaves e valores em HashMap sob a ótica de ownership e borrowing.",
    "Reduzir clones e alocações desnecessárias por meio de APIs mais precisas e buffers reaproveitados.",
    "Escolher collections com critério em vez de tratar Vec e String como padrão automático para tudo.",
  ],
  prerequisites: [
    "Memória: stack, heap e ponteiros.",
    "Cache de CPU e custo de layout de dados.",
    "Rust: Ownership e Borrowing.",
  ],
  references: [
    {
      title: "Common Collections",
      source: "The Rust Programming Language",
      url: "https://doc.rust-lang.org/book/ch08-00-common-collections.html",
      note: "Capítulo-base para vectors, strings e hash maps.",
    },
    {
      title: "std::vec::Vec",
      source: "Rust Standard Library",
      url: "https://doc.rust-lang.org/std/vec/struct.Vec.html",
      note: "Documentação oficial sobre capacidade, crescimento e APIs de Vec.",
    },
    {
      title: "std::string::String",
      source: "Rust Standard Library",
      url: "https://doc.rust-lang.org/std/string/struct.String.html",
      note: "Fundamental para entender posse de texto e relação com &str.",
    },
    {
      title: "std::collections::HashMap",
      source: "Rust Standard Library",
      url: "https://doc.rust-lang.org/std/collections/struct.HashMap.html",
      note: "Base oficial para operações, ownership e comportamento de HashMap.",
    },
    {
      title: "The Slice Type",
      source: "The Rust Programming Language",
      url: "https://doc.rust-lang.org/book/ch04-03-slices.html",
      note: "Complementa a intuição sobre janelas de dados sem posse.",
    },
  ],
  heroVisual: "lesson-hero",
  openingText:
    "Uma das primeiras armadilhas de quem começa em Rust é usar Vec e String como se fossem recipientes neutros, quase invisíveis. Eles funcionam muito bem, mas carregam decisões importantes: dados dinâmicos vivem na heap, podem crescer, podem realocar, podem exigir moves e podem induzir clones em série se a API não for pensada com cuidado. Entender collections em Rust é entender alocação, posse e layout com olhos de engenharia.",
  quickFacts: [
    {
      title: "Collection dinâmica custa gestão",
      body: "Se o tamanho muda em runtime, alguém precisa lidar com capacidade e realocação.",
    },
    {
      title: "Vec e String são parentes próximos",
      body: "String é, conceitualmente, um buffer de bytes UTF-8 com regras próprias de texto.",
    },
    {
      title: "Borrow evita cópia",
      body: "Muitas APIs podem aceitar slices ou &str em vez de exigir posse de buffers inteiros.",
    },
    {
      title: "Capacidade é pista de performance",
      body: "Reservar ou reaproveitar espaço pode evitar realocações e cópias extras.",
    },
  ],
  sections: [
    s(
      "collections-e-heap",
      "Fundamento",
      "Collections entram em cena quando tamanho e conteúdo variam",
      "Arrays fixos cobrem alguns casos; collections dinâmicas aparecem quando o programa precisa crescer, acumular ou reorganizar dados em runtime.",
      "concept-grid",
      undefined,
      [
        "Tipos como array e tuple resolvem muito bem dados de tamanho conhecido em compilação. Já Vec, String e HashMap existem para cenários em que o volume, a forma ou o conteúdo variam com o andamento do programa.",
        "Essa flexibilidade normalmente leva os dados para a heap. O valor principal pode permanecer na stack como handle pequeno, mas o armazenamento que cresce, diminui ou se reorganiza vive em memória dinâmica.",
        "Por isso, estudar collections em Rust também é estudar custo de gerenciamento: quem possui o buffer, quando ele cresce, quando precisa mudar de lugar e quanto isso afeta cache, cópias e design de APIs.",
      ],
      [
        {
          type: "definition",
          title: "Collection dinâmica",
          body: "Estrutura de dados cujo tamanho ou conteúdo pode crescer e mudar em tempo de execução.",
        },
        {
          type: "insight",
          title: "Flexibilidade não é grátis",
          body: "Crescer em runtime exige política de capacidade, posse clara e atenção a realocações.",
        },
      ],
    ),
    s(
      "vec-capacidade-crescimento",
      "Vec",
      "Vec não é só uma lista: é um buffer com tamanho e capacidade",
      "Entender a diferença entre quantos elementos existem e quanto espaço foi reservado muda bastante sua leitura de custo.",
      "pipeline-diagram",
      "pipeline-lab",
      [
        "Vec mantém, conceitualmente, pelo menos três informações importantes: ponteiro para o armazenamento, tamanho atual e capacidade reservada. O tamanho diz quantos elementos estão em uso; a capacidade diz quantos cabem antes de uma nova realocação ser necessária.",
        "Quando o programa faz push repetidamente e a capacidade se esgota, o vetor pode precisar reservar um bloco maior e copiar ou mover o conteúdo anterior. Em caminhos quentes, isso não é detalhe pequeno.",
        "Por isso, APIs como with_capacity ou reserve existem. Elas não tornam o código automaticamente melhor, mas permitem alinhar a política de alocação com conhecimento que o programa já tem sobre o volume esperado.",
      ],
      [
        {
          type: "definition",
          title: "Capacidade",
          body: "Quantidade de elementos que uma coleção baseada em buffer pode acomodar antes de precisar crescer o armazenamento.",
        },
        {
          type: "example",
          title: "with_capacity",
          body: "Se você sabe que receberá muitos itens, reservar espaço cedo pode reduzir realocações intermediárias.",
        },
      ],
    ),
    s(
      "string-vs-str",
      "Texto",
      "String e &str representam necessidades diferentes",
      "Texto em Rust não é só 'uma sequência de caracteres': ele envolve posse, UTF-8 e a decisão entre armazenar ou apenas observar.",
      "impact-board",
      undefined,
      [
        "String é um buffer de texto possuído e mutável em UTF-8. Já &str é uma fatia de texto emprestada: uma vista sobre bytes válidos de string que pertencem a outro lugar.",
        "Essa distinção tem efeito direto em APIs. Se a função só precisa ler texto, aceitar &str geralmente é melhor porque amplia compatibilidade e evita exigir alocação ou move do chamador. Se a função precisa guardar, transformar persistentemente ou devolver autonomia ao dado, String faz mais sentido.",
        "Também vale lembrar que texto UTF-8 não equivale a indexação trivial por 'caractere'. Muitas decisões com strings ficam mais claras quando você pensa em bytes válidos, fronteiras seguras e custo de materialização de novas strings.",
      ],
      [
        {
          type: "definition",
          title: "&str",
          body: "Slice de texto UTF-8 emprestado, usado quando a função precisa observar texto sem possuí-lo.",
        },
        {
          type: "mistake",
          title: "Pedir String por padrão",
          body: "Exigir posse quando só há leitura reduz flexibilidade e pode induzir clones desnecessários.",
        },
      ],
    ),
    s(
      "hashmap-e-ownership",
      "Mapas",
      "HashMap também participa do jogo de posse",
      "Inserir chaves e valores em um mapa frequentemente significa transferir ownership, o que afeta como você desenha chaves, lookups e reaproveitamento de dados.",
      "impact-board",
      "scenario-lab",
      [
        "Quando você insere String em um HashMap<String, V>, por exemplo, o mapa normalmente se torna dono daquela chave. Isso é ótimo para garantir que ela continue válida enquanto o mapa existir, mas muda o que pode ou não ser usado depois no código chamador.",
        "Ao mesmo tempo, buscas muitas vezes podem acontecer por referências compatíveis, o que mostra um padrão importante em Rust: armazenar com ownership e consultar com borrowing é uma combinação frequente e poderosa.",
        "Pensar assim evita confusão. O mapa não é um saco mágico onde valores entram sem consequência; ele é um componente que assume responsabilidade por parte dos dados e, com isso, define novas fronteiras de vida útil.",
      ],
      [
        {
          type: "definition",
          title: "Lookup por borrowing",
          body: "Padrão em que a estrutura armazena dados possuídos, mas permite consultas usando referências compatíveis para evitar cópias extras.",
        },
      ],
    ),
    s(
      "array-slice-vec",
      "Escolha",
      "Array, slice e Vec respondem a perguntas diferentes",
      "Escolher a estrutura certa começa perguntando se o tamanho é fixo, se a posse é necessária e se o consumo será apenas leitura.",
      "concept-grid",
      undefined,
      [
        "Array é excelente quando o tamanho é conhecido em compilação e faz parte da própria semântica do valor. Slice funciona bem quando você quer uma visão de leitura ou mutação temporária sobre uma sequência já existente. Vec entra quando precisa de crescimento dinâmico e posse do armazenamento.",
        "Muita ergonomia em Rust vem de aceitar slices nas fronteiras e usar Vec internamente quando necessário. Isso desacopla a API da política concreta de alocação do chamador.",
        "A pergunta madura é: preciso armazenar e crescer, ou só percorrer? Posso receber qualquer sequência emprestada, ou dependo de um buffer próprio? A resposta orienta melhor do que apego a um tipo favorito.",
      ],
      [
        {
          type: "insight",
          title: "Receber menos específico costuma ajudar",
          body: "Se a função só precisa de uma sequência lida linearmente, &[T] comunica melhor a intenção do que Vec<T>.",
        },
      ],
    ),
    s(
      "reservar-e-reutilizar",
      "Gestão",
      "Reservar e reutilizar buffers pode ser mais importante do que micro-otimizar loops",
      "Grande parte do custo em pipelines de dados aparece na política de alocação, não apenas nas operações sobre cada elemento.",
      "tradeoff-spectrum",
      "tradeoff-lab",
      [
        "Criar uma nova String ou um novo Vec a cada iteração pode ser correto e simples, mas em cargas repetitivas isso frequentemente gera pressão extra de alocação, realocação e cópia de bytes.",
        "Reaproveitar buffers, limpar e preencher novamente, reservar capacidade adequada ou estruturar o fluxo para evitar materializações intermediárias costuma render ganhos mais consistentes do que ajustes cosméticos no corpo do loop.",
        "O risco, claro, é exagerar cedo demais. Reuso de buffer adiciona estado e responsabilidade. O critério é simples: se a coleção fica no hot path ou em volume alto, vale medir e considerar gestão explícita; se não, simplicidade pode vencer.",
      ],
      [
        {
          type: "example",
          title: "Buffer de trabalho",
          body: "Em vez de alocar um Vec novo a cada chamada, um componente pode manter e reutilizar um buffer interno quando isso fizer sentido arquitetural.",
        },
      ],
    ),
    s(
      "clones-e-copias-escondidas",
      "Custo",
      "Collections amplificam o custo de clones descuidados",
      "Clonar um inteiro raramente dói; clonar buffers, mapas e strings grandes em cascata muda completamente o perfil do programa.",
      "impact-board",
      undefined,
      [
        "Como collections geralmente encapsulam armazenamento na heap, cloná-las pode significar duplicar volumes relevantes de dados. Isso afeta tempo, memória, localidade e até comportamento do cache.",
        "Muitas vezes o clone aparece porque a API exige ownership onde uma referência bastaria, ou porque a fronteira entre quem observa e quem armazena não foi bem desenhada. O custo real então nasce bem antes da linha que chama clone.",
        "A boa prática é auditar a semântica: esta estrutura realmente precisa de uma cópia independente, ou apenas de uma janela temporária de leitura? Em Rust, essa pergunta quase sempre vale ouro.",
      ],
      [
        {
          type: "mistake",
          title: "Clonar coleção para cada chamada auxiliar",
          body: "O conforto local pode multiplicar tráfego de memória e mascarar um contrato de API pouco preciso.",
        },
      ],
    ),
    s(
      "heuristicas-praticas",
      "Projeto",
      "Heurísticas práticas para escolher collections sem cair em automatismos",
      "O melhor tipo costuma ser o que expressa a menor quantidade de poder necessária para o problema atual.",
      "pipeline-diagram",
      undefined,
      [
        "Se o tamanho é fixo e pequeno, arrays podem ser perfeitos. Se a função só lê uma sequência, aceite slices. Se precisa crescer e armazenar, use Vec. Se o componente deve possuir texto, use String; se só vai ler, prefira &str. Se precisa associação por chave, HashMap entra no jogo com seu próprio custo de ownership.",
        "Também vale pensar no percurso dos dados. Algumas coleções são ótimas para construção incremental e outras para leitura quente. Em sistemas reais, a decisão não é apenas 'qual compila?', mas 'qual comunica melhor a intenção e cobra o custo certo?'.",
        "No fim, collections em Rust ensinam uma lição geral de engenharia: abstrações de dados são também políticas de memória. Escolher bem é parte do desenho do sistema, não detalhe posterior.",
      ],
      [
        {
          type: "insight",
          title: "O tipo mais poderoso nem sempre é o melhor",
          body: "Dar ao código apenas a flexibilidade de que ele realmente precisa costuma gerar APIs mais claras e baratas.",
        },
      ],
    ),
    s(
      "quiz-revisao",
      "Revisão",
      "Quiz de revisão",
      "Teste se Vec, String, HashMap, capacidade e borrowing já estão conectados como decisões de posse e alocação.",
      undefined,
      "quiz",
      [
        "A meta é pensar collections como política de memória e interface, não só como containers úteis.",
      ],
      [],
    ),
    s(
      "glossario",
      "Glossário",
      "Termos essenciais",
      "Feche a aula com o vocabulário que aparece o tempo todo na std e em discussões de performance com Rust.",
      undefined,
      "glossary",
      [
        "Esses termos ajudam a ler documentação, PRs e decisões de API com mais precisão.",
      ],
      [],
    ),
  ],
  summaryCards: [
    {
      title: "Collection dinâmica implica heap",
      body: "Flexibilidade de tamanho normalmente vem acompanhada de gestão explícita de armazenamento.",
    },
    {
      title: "Vec separa tamanho de capacidade",
      body: "Essa distinção ajuda a entender crescimento, reserva e realocação.",
    },
    {
      title: "String e &str têm semânticas diferentes",
      body: "Uma possui texto; a outra apenas o observa temporariamente.",
    },
    {
      title: "HashMap também tem ownership",
      body: "Armazenar chaves e valores muda a responsabilidade sobre sua vida útil.",
    },
    {
      title: "Buffers podem ser reaproveitados",
      body: "Em caminhos quentes, política de alocação pesa bastante na performance percebida.",
    },
    {
      title: "Clone de collection custa de verdade",
      body: "Muitas cópias extras revelam contratos de API que poderiam ser mais precisos.",
    },
  ],
  quiz: [
    q(
      "q1",
      "Por que collections como Vec e String costumam envolver heap?",
      "Porque precisam de armazenamento cujo tamanho pode variar em runtime.",
      "Porque Rust não permite arrays na stack.",
      "Porque toda sequência em Rust é alocada dinamicamente por padrão.",
      "a",
      "Flexibilidade de crescimento normalmente exige memória dinâmica.",
    ),
    q(
      "q2",
      "O que capacidade significa em um Vec?",
      "Quantos elementos ele pode comportar antes de precisar crescer o armazenamento.",
      "Quantos elementos ele contém neste instante.",
      "Quantos bytes ele sempre ocupa na stack.",
      "a",
      "Capacidade e tamanho são conceitos diferentes e ambos importam para performance.",
    ),
    q(
      "q3",
      "Quando aceitar &str em vez de String costuma ser melhor?",
      "Quando a função só precisa ler texto sem armazená-lo como dado próprio.",
      "Quando a função pretende modificar o texto recebido in place.",
      "Quando a função quer garantir uma alocação nova toda vez.",
      "a",
      "Borrow de texto amplia compatibilidade e evita posse desnecessária.",
    ),
    q(
      "q4",
      "O que frequentemente acontece ao inserir String como chave em HashMap<String, V>?",
      "O mapa passa a ser dono daquela chave.",
      "A chave continua automaticamente disponível para uso posterior sem restrição.",
      "A String é convertida em &str dentro do mapa.",
      "a",
      "Inserção por ownership transfere responsabilidade para a estrutura.",
    ),
    q(
      "q5",
      "Qual combinação de fronteira costuma ser idiomática em muitas APIs?",
      "Receber slices ou &str para leitura e usar collections possuídas internamente quando necessário.",
      "Sempre exigir Vec e String em qualquer função pública.",
      "Evitar totalmente collections possuídas para reduzir lifetimes.",
      "a",
      "Aceitar formas emprestadas frequentemente torna a API mais flexível e econômica.",
    ),
    q(
      "q6",
      "Qual é uma boa razão para usar with_capacity ou reserve?",
      "Reduzir o número de realocações quando o volume esperado já é conhecido.",
      "Garantir que nunca haverá cópia de dados em runtime.",
      "Transformar Vec em array fixo.",
      "a",
      "Reservar cedo pode alinhar o buffer ao padrão real de uso.",
    ),
    q(
      "q7",
      "Por que clones de collections merecem atenção?",
      "Porque podem duplicar buffers inteiros e amplificar custo de memória e cópia.",
      "Porque Clone sempre causa panic em runtime.",
      "Porque HashMap e Vec não implementam Clone.",
      "a",
      "Collections geralmente encapsulam dados na heap, então clonar pode ser caro.",
    ),
    q(
      "q8",
      "Qual heurística resume melhor a escolha de collections em Rust?",
      "Usar o tipo menos poderoso que ainda expressa corretamente a necessidade de posse, crescimento e acesso.",
      "Escolher sempre Vec para evitar complexidade.",
      "Evitar completamente qualquer alocação dinâmica.",
      "a",
      "A melhor coleção depende da semântica da interface e do custo que você quer assumir.",
    ),
  ],
  glossary: [
    g("Vec", "Coleção dinâmica contígua que armazena elementos em buffer possuído, normalmente na heap."),
    g("Capacidade", "Quantidade máxima de elementos que cabem no buffer atual antes de nova realocação."),
    g("Realocação", "Troca do bloco de armazenamento por outro maior ou diferente para acomodar crescimento."),
    g("String", "Tipo possuído de texto UTF-8 armazenado em buffer dinâmico."),
    g("&str", "Slice de texto UTF-8 emprestado, usado quando não é necessário possuir o conteúdo."),
    g("Slice", "Vista contígua sobre parte de uma sequência ou buffer existente."),
    g("HashMap", "Estrutura de associação entre chaves e valores com semântica própria de ownership."),
    g("Reserva de capacidade", "Ato de separar espaço antecipadamente para reduzir crescimento incremental caro."),
    g("Buffer reaproveitado", "Armazenamento mantido e reutilizado em vez de recriado do zero a cada operação."),
    g("Clone", "Duplicação explícita de valor que, em collections, pode significar copiar bastante dado."),
    g("Dados possuídos", "Dados cuja responsabilidade de validade pertence ao componente atual."),
    g("Dados emprestados", "Dados observados por referência sem transferência de posse."),
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
