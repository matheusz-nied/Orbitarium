import type { LessonContent } from "../../../types/content";

export const rustTiposTraitsZeroCostContent: LessonContent = {
  id: "rust-tipos-traits-zero-cost",
  title: "Rust: Tipos, Traits e Zero-Cost",
  subtitle:
    "Em Rust, tipos não servem apenas para 'pegar erro cedo': eles também modelam invariantes, guiam o design de APIs e permitem abstrações que podem desaparecer no custo de runtime.",
  description:
    "Aula interativa sobre modelagem com tipos, enums e newtypes, traits como contratos de comportamento, monomorfização, dispatch estático e dinâmico, iterators e o significado real de zero-cost abstractions em Rust.",
  primaryCategoryId: "computacao",
  secondaryCategoryId: "engenharia",
  level: "Intermediário",
  estimatedTime: "50-60 min",
  tags: [
    "Rust",
    "Tipos",
    "Traits",
    "Zero-Cost",
    "Monomorfização",
    "Iterators",
  ],
  learningObjectives: [
    "Usar tipos para representar invariantes e reduzir estados inválidos no design.",
    "Entender traits como contratos de comportamento reutilizáveis e composicionais.",
    "Explicar por que genéricos em Rust frequentemente viram código especializado em compilação.",
    "Distinguir dispatch estático de dispatch dinâmico com foco em trade-offs, não em slogans.",
    "Relacionar iterators e combinadores à ideia de abstração expressiva com otimização agressiva do compilador.",
    "Reconhecer que zero-cost não significa custo zero em qualquer contexto, mas ausência de penalidade estrutural desnecessária.",
  ],
  prerequisites: [
    "Rust: Ownership e Borrowing.",
    "Como funciona um compilador.",
    "Estruturas de dados e funções genéricas em outras linguagens ajudam.",
  ],
  references: [
    {
      title: "Generic Data Types",
      source: "The Rust Programming Language",
      url: "https://doc.rust-lang.org/book/ch10-01-syntax.html",
      note: "Base para ler tipos genéricos como ferramenta de modelagem e reutilização.",
    },
    {
      title: "Traits: Defining Shared Behavior",
      source: "The Rust Programming Language",
      url: "https://doc.rust-lang.org/book/ch10-02-traits.html",
      note: "Capítulo central para traits, bounds e comportamento compartilhado.",
    },
    {
      title: "Comparing Performance: Loops vs. Iterators",
      source: "The Rust Programming Language",
      url: "https://doc.rust-lang.org/book/ch13-04-performance.html",
      note: "Referência clássica para a intuição de zero-cost abstractions com iterators.",
    },
    {
      title: "Using Trait Objects That Allow for Values of Different Types",
      source: "The Rust Programming Language",
      url: "https://doc.rust-lang.org/book/ch18-02-trait-objects.html",
      note: "Ajuda a contrastar dispatch dinâmico com especialização estática.",
    },
    {
      title: "Rust API Guidelines",
      source: "Rust Library Team and Community",
      url: "https://rust-lang.github.io/api-guidelines/",
      note: "Material importante para pensar design de APIs idiomáticas baseadas em tipos e traits.",
    },
  ],
  heroVisual: "lesson-hero",
  openingText:
    "Rust é frequentemente vendido como a linguagem da memória segura, mas isso esconde uma segunda força igualmente importante: o sistema de tipos. Em Rust, tipos, enums, traits e genéricos não são apenas burocracia para agradar compilador. Eles formam o vocabulário com que você descreve estados válidos, promete comportamentos, especializa código em compilação e reduz custo acidental de abstrações.",
  quickFacts: [
    {
      title: "Tipo também é documentação",
      body: "Uma assinatura bem modelada comunica restrições e intenções antes mesmo da implementação.",
    },
    {
      title: "Trait não é classe",
      body: "Ele descreve comportamento compartilhado, sem carregar sozinho a ideia de herança tradicional.",
    },
    {
      title: "Genérico pode virar código especializado",
      body: "Em muitos casos o compilador instancia versões concretas sem pagar indireção em runtime.",
    },
    {
      title: "Zero-cost não é milagre",
      body: "O conceito vale quando a abstração não adiciona custo estrutural inevitável além do que o problema já exige.",
    },
  ],
  sections: [
    s(
      "tipos-como-invariantes",
      "Modelagem",
      "Tipos servem para carregar invariantes",
      "Um bom tipo não apenas guarda dados; ele delimita o que o programa considera um estado legítimo.",
      "concept-grid",
      undefined,
      [
        "Quando um sistema usa bools soltos, strings genéricas ou inteiros sem contexto para representar tudo, várias combinações inválidas continuam tecnicamente possíveis. O compilador aceita, e o erro só aparece depois em validações espalhadas.",
        "Em Rust, o sistema de tipos incentiva outro caminho: criar enums, structs específicas e newtypes que expressem quais estados realmente existem. Isso não elimina toda regra de negócio, mas move muitas garantias para mais perto da fronteira estática do programa.",
        "Esse estilo muda a qualidade da manutenção. Em vez de lembrar mentalmente que '0 significa rascunho e 1 significa publicado', você ensina isso à linguagem de forma explícita.",
      ],
      [
        {
          type: "definition",
          title: "Invariante",
          body: "Propriedade que deve permanecer verdadeira para que um valor ou componente seja considerado válido.",
        },
        {
          type: "insight",
          title: "Tipo bom reduz comentário compensatório",
          body: "Quando o domínio fica visível na assinatura, sobra menos espaço para estados ambíguos ou mal documentados.",
        },
      ],
    ),
    s(
      "enums-e-estados-impossiveis",
      "Domínio",
      "Enums ajudam a tornar estados impossíveis realmente impossíveis",
      "Ao enumerar variantes válidas, você força o código a lidar com o conjunto real de cenários em vez de adivinhar convenções implícitas.",
      "impact-board",
      undefined,
      [
        "Enums em Rust são mais poderosos do que uma lista de rótulos. Eles podem carregar dados diferentes por variante, o que os torna ótimos para modelar protocolos, fases de um parser, resultados de operações e máquinas de estado.",
        "Isso conversa muito bem com pattern matching. O match obriga o programador a tratar explicitamente as alternativas relevantes, reduzindo o risco de esquecer um caso importante ou tratar tudo como 'qualquer string'.",
        "Em engenharia de sistemas, estados impossíveis custam caro porque geram bugs difíceis de reproduzir. Modelar o domínio com enums é uma forma de trocar fragilidade implícita por estrutura explícita.",
      ],
      [
        {
          type: "example",
          title: "Estado de conexão",
          body: "Modelar Desconectado, Conectando e Conectado como variantes evita combinações absurdas de flags independentes.",
        },
      ],
    ),
    s(
      "traits-como-contrato",
      "Comportamento",
      "Traits descrevem comportamento compartilhado sem colapsar tudo em herança",
      "Um trait diz o que um tipo sabe fazer, e não necessariamente o que ele 'é' em uma árvore de classes.",
      "pipeline-diagram",
      "pipeline-lab",
      [
        "Traits permitem declarar capacidades: formatar, iterar, comparar, serializar, enviar por thread, entre muitas outras. Essa forma de pensar costuma ser mais flexível do que acoplar comportamento a uma hierarquia rígida.",
        "Ao mesmo tempo, bounds de traits aparecem nas assinaturas como critérios de compatibilidade. Uma função não precisa conhecer todos os tipos concretos possíveis; ela precisa apenas dos comportamentos mínimos exigidos para operar.",
        "Isso favorece composição. Em vez de perguntar 'qual classe-base eu herdo?', você pergunta 'quais capacidades preciso prometer para que esta peça se encaixe aqui?'.",
      ],
      [
        {
          type: "definition",
          title: "Trait",
          body: "Contrato que define comportamento compartilhado que tipos distintos podem implementar.",
        },
        {
          type: "insight",
          title: "Trait é linguagem de capacidade",
          body: "Ele organiza o sistema em torno do que os tipos fazem, não apenas de sua origem ou parentesco.",
        },
      ],
    ),
    s(
      "genericos-e-monomorfizacao",
      "Compilação",
      "Genéricos frequentemente viram código especializado",
      "Boa parte da fama de zero-cost em Rust vem do fato de que abstrações genéricas podem ser resolvidas antes do runtime.",
      "pipeline-diagram",
      undefined,
      [
        "Quando você escreve uma função genérica, não está pedindo necessariamente um mecanismo de despacho complexo em runtime. Em muitos casos, o compilador produz versões concretas para os tipos efetivamente usados, processo conhecido como monomorfização.",
        "Isso significa que a ergonomia do código genérico não precisa implicar a mesma indireção típica de sistemas mais dinâmicos. O programa final pode operar sobre tipos concretos, com espaço para inline e outras otimizações.",
        "Claro que isso tem custo em outro lugar: tamanho de binário, tempo de compilação e multiplicação de instâncias especializadas. De novo, o ponto não é dogma, mas compreender onde cada custo aparece.",
      ],
      [
        {
          type: "definition",
          title: "Monomorfização",
          body: "Transformação de código genérico em versões concretas especializadas para tipos específicos usados no programa.",
        },
        {
          type: "mistake",
          title: "Achar que genérico é sempre 'virtual' em runtime",
          body: "Em Rust, muitas abstrações genéricas são resolvidas durante a compilação, não durante a execução.",
        },
      ],
    ),
    s(
      "dispatch-estatico-vs-dinamico",
      "Trade-off",
      "Dispatch estático e dinâmico resolvem problemas diferentes",
      "Nem toda API deve escolher o mesmo mecanismo; a decisão depende de ergonomia, extensibilidade, hot path e forma de composição.",
      "tradeoff-spectrum",
      "tradeoff-lab",
      [
        "Com dispatch estático, o compilador conhece o tipo concreto e consegue especializar chamadas. Isso costuma favorecer otimização e previsibilidade em caminhos quentes.",
        "Com dispatch dinâmico, você abre mão de parte dessa especialização para ganhar heterogeneidade em coleções, fronteiras plugáveis e desacoplamento quando o conjunto de tipos concretos não faz sentido ser fixado em compilação.",
        "O erro comum é transformar essa escolha em religião. Dispatch dinâmico não é automaticamente 'ruim'; ele apenas move parte da flexibilidade para o runtime. A pergunta correta é onde essa flexibilidade entrega valor suficiente para pagar o custo extra.",
      ],
      [
        {
          type: "definition",
          title: "Dispatch estático",
          body: "Resolução de chamadas com conhecimento do tipo concreto em compilação, comum em genéricos monomorfizados.",
        },
        {
          type: "definition",
          title: "Dispatch dinâmico",
          body: "Resolução de chamadas em runtime por meio de uma camada de indireção, como trait objects.",
        },
      ],
    ),
    s(
      "iterators-e-zero-cost",
      "Expressividade",
      "Iterators mostram o lado mais elegante da ideia de zero-cost",
      "Você pode escrever transformações em pipeline sem necessariamente pagar um preço estrutural por cada camada conceitual.",
      "impact-board",
      undefined,
      [
        "Em muitas linguagens, cadeias de transformação podem gerar coleções intermediárias, caixas de abstração ou chamadas difíceis de otimizar. Em Rust, iterators foram desenhados para que o compilador consiga fundir etapas e gerar código próximo ao de loops manuais em vários cenários.",
        "Isso não quer dizer que qualquer pipeline será gratuito por definição. Capturas, alocações, boxing e fronteiras mal escolhidas ainda importam. Mas a abstração base foi construída para cooperar com o otimizador, não para enfrentá-lo.",
        "A lição importante é que zero-cost em Rust normalmente significa: você pode escrever em um nível de intenção mais alto sem impor, por princípio, um custo desnecessário ao programa final.",
      ],
      [
        {
          type: "example",
          title: "map + filter + fold",
          body: "Uma sequência expressiva pode ser compilada como um único fluxo eficiente, sem materializar estruturas intermediárias por obrigação.",
        },
      ],
    ),
    s(
      "newtypes-e-design-de-api",
      "Projeto",
      "Newtypes e fronteiras semânticas dão nomes reais às suposições",
      "Criar tipos pequenos em torno de tipos básicos pode parecer extra no começo, mas evita confusão semântica em APIs e módulos maiores.",
      "impact-board",
      "scenario-lab",
      [
        "Dois valores String podem ter significados radicalmente diferentes: um pode ser um e-mail validado; outro, um caminho de arquivo cru. Se ambos aparecem como String em toda parte, o compilador não ajuda a manter a distinção.",
        "Newtypes resolvem isso embalando um tipo existente em uma camada semântica explícita. Você ganha melhor legibilidade, implementações de traits sob medida e menos chance de misturar conceitos que só parecem compatíveis por acaso.",
        "Esse padrão também conversa com zero-cost. Em muitos casos, a camada adicional é puramente semântica do ponto de vista da API, enquanto a representação final continua simples o bastante para que o compilador não introduza penalidade relevante.",
      ],
      [
        {
          type: "definition",
          title: "Newtype",
          body: "Tipo criado como invólucro semântico em torno de outro tipo para diferenciar significado, invariantes ou comportamento.",
        },
        {
          type: "insight",
          title: "Domínio explícito escala melhor",
          body: "Pequenos tipos nomeados evitam que APIs grandes se apoiem demais em convenções frágeis e comentários.",
        },
      ],
    ),
    s(
      "zero-cost-nao-e-magica",
      "Critério",
      "Zero-cost não dispensa medição nem discernimento",
      "A promessa da linguagem é poderosa, mas continua sendo uma promessa contextual: abstrações bem desenhadas ajudam; escolhas ruins continuam cobrando preço.",
      "tradeoff-spectrum",
      undefined,
      [
        "Mesmo em Rust, custos reais como alocação, cópia de dados, branch prediction ruim, layout desfavorável e misses de cache não desaparecem porque a API ficou bonita. O sistema de tipos ajuda a controlar uma parte do problema, não o universo inteiro.",
        "Além disso, diferentes estratégias afetam tempos de compilação, tamanho de binário, flexibilidade arquitetural e ergonomia de manutenção. Às vezes, uma abstração ligeiramente menos otimizada no hot path compensa por simplificar um subsistema complexo.",
        "O melhor uso da ideia de zero-cost é como filtro de design: esta abstração está descrevendo o problema de forma mais clara sem impor custo estrutural inevitável? Se a resposta for sim, você provavelmente está no caminho certo.",
      ],
      [
        {
          type: "mistake",
          title: "Usar 'zero-cost' como mantra",
          body: "A expressão não substitui profiling, leitura de assembly ou análise de layout quando a performance realmente importa.",
        },
      ],
    ),
    s(
      "quiz-revisao",
      "Revisão",
      "Quiz de revisão",
      "Verifique se tipos, traits, genéricos e dispatch já aparecem na sua cabeça como ferramentas de projeto, não apenas recursos isolados da linguagem.",
      undefined,
      "quiz",
      [
        "A ambição desta aula é dar critério para escolher abstrações, não decorar jargões.",
      ],
      [],
    ),
    s(
      "glossario",
      "Glossário",
      "Termos essenciais",
      "Consolide o vocabulário que sustenta o discurso de abstração, especialização e modelagem em Rust.",
      undefined,
      "glossary",
      [
        "Esses termos voltam o tempo todo em crates, documentações e discussões de performance.",
      ],
      [],
    ),
  ],
  summaryCards: [
    {
      title: "Tipos carregam invariantes",
      body: "Eles descrevem estados válidos e reduzem combinações erradas ainda na interface.",
    },
    {
      title: "Traits organizam capacidades",
      body: "O foco passa a ser comportamento compartilhado, não apenas hierarquia.",
    },
    {
      title: "Genéricos podem ser especializados",
      body: "Monomorfização permite abstração expressiva sem depender de indireção em runtime.",
    },
    {
      title: "Dispatch é escolha arquitetural",
      body: "Flexibilidade e otimização aparecem em proporções diferentes conforme a estratégia.",
    },
    {
      title: "Iterators mostram zero-cost em ação",
      body: "Pipelines expressivos podem ser otimizados agressivamente pelo compilador.",
    },
    {
      title: "Medição continua necessária",
      body: "Nenhum slogan substitui análise concreta quando performance importa de verdade.",
    },
  ],
  quiz: [
    q(
      "q1",
      "Qual é uma vantagem central de modelar domínio com tipos mais específicos?",
      "Reduzir estados inválidos e tornar invariantes mais explícitos.",
      "Eliminar completamente a necessidade de testes.",
      "Fazer toda função virar genérica automaticamente.",
      "a",
      "Tipos melhores deslocam parte das garantias para a interface do programa.",
    ),
    q(
      "q2",
      "Como traits devem ser lidos conceitualmente?",
      "Como contratos de comportamento que tipos diferentes podem implementar.",
      "Como sinônimos obrigatórios de herança clássica.",
      "Como atalhos para alocação dinâmica.",
      "a",
      "Traits descrevem capacidades e combinam bem com composição.",
    ),
    q(
      "q3",
      "O que a monomorfização faz em muitos casos?",
      "Produz versões concretas de código genérico para tipos específicos usados no programa.",
      "Converte todo código genérico em dispatch dinâmico.",
      "Remove a tipagem do programa antes da compilação.",
      "a",
      "Essa especialização é peça-chave da ideia de zero-cost abstractions em Rust.",
    ),
    q(
      "q4",
      "Qual afirmação sobre dispatch dinâmico é mais adequada?",
      "Ele tem trade-offs e pode ser a escolha certa quando flexibilidade em runtime entrega valor real.",
      "Ele deve ser evitado em qualquer arquitetura séria.",
      "Ele é idêntico ao dispatch estático em custo e semântica.",
      "a",
      "O importante é compreender onde a flexibilidade compensa a indireção adicional.",
    ),
    q(
      "q5",
      "Por que iterators são frequentemente citados em discussões de zero-cost?",
      "Porque pipelines expressivos podem ser otimizados sem obrigar estruturas intermediárias em muitos casos.",
      "Porque nunca fazem alocação nem closures.",
      "Porque substituem qualquer loop manual por definição.",
      "a",
      "A abstração foi desenhada para cooperar com o compilador, não para impor camadas inevitáveis de runtime.",
    ),
    q(
      "q6",
      "Qual é o papel de um newtype?",
      "Dar significado semântico novo a um tipo existente e impor fronteiras mais claras.",
      "Forçar o uso de trait objects.",
      "Aumentar automaticamente a performance do programa.",
      "a",
      "Newtypes ajudam a distinguir conceitos que seriam confusos se aparecessem só como String, i32 e afins.",
    ),
    q(
      "q7",
      "O que 'zero-cost' NÃO significa?",
      "Que todo código abstrato será sempre gratuito em qualquer cenário sem precisar medir.",
      "Que certas abstrações podem ser otimizadas sem custo estrutural extra inevitável.",
      "Que o compilador participa ativamente da especialização de código.",
      "a",
      "A expressão não elimina custos reais de dados, memória, compilação e arquitetura.",
    ),
    q(
      "q8",
      "Qual postura é mais madura ao escolher abstrações em Rust?",
      "Equilibrar clareza de modelagem, custo de runtime, impacto em compilação e necessidade de extensibilidade.",
      "Escolher sempre a forma mais genérica disponível.",
      "Evitar traits para manter tudo explícito manualmente.",
      "a",
      "Rust oferece muitas opções; o critério vem de entender o problema e seus trade-offs.",
    ),
  ],
  glossary: [
    g("Invariante", "Propriedade que deve permanecer verdadeira para um valor ou componente ser considerado válido."),
    g("Trait", "Contrato de comportamento compartilhado que pode ser implementado por tipos distintos."),
    g("Bound", "Restrição que exige que um tipo genérico implemente certos traits."),
    g("Genérico", "Código parametrizado por tipos ou outros elementos decididos em compilação."),
    g("Monomorfização", "Especialização de código genérico em versões concretas para tipos usados de fato."),
    g("Dispatch estático", "Resolução de chamadas com tipo concreto conhecido em compilação."),
    g("Dispatch dinâmico", "Resolução de chamadas em runtime por meio de indireção, como trait objects."),
    g("Trait object", "Forma de usar comportamento via trait quando o tipo concreto não fica fixo em compilação."),
    g("Enum", "Tipo que representa um conjunto finito de variantes possíveis, cada uma podendo carregar dados próprios."),
    g("Pattern matching", "Mecanismo para distinguir e tratar explicitamente diferentes formas de um valor."),
    g("Newtype", "Invólucro semântico em torno de outro tipo para distinguir significado ou impor invariantes."),
    g("Zero-cost abstraction", "Abstração cujo uso não impõe custo estrutural inevitável além do necessário para o problema."),
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
