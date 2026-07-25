import type { LessonContent } from "../../../types/content";

export const rustOwnershipBorrowingContent: LessonContent = {
  id: "rust-ownership-borrowing",
  title: "Rust: Ownership e Borrowing",
  subtitle:
    "Em Rust, segurança de memória não aparece como um coletor de lixo invisível, mas como um contrato explícito sobre quem possui um valor, quem apenas o observa e quando esse acesso termina.",
  description:
    "Aula interativa sobre ownership, move semantics, referências, empréstimos mutáveis e imutáveis, slices, custo de clonagem e por que o borrow checker muda a forma de desenhar APIs e estruturas de dados.",
  primaryCategoryId: "computacao",
  secondaryCategoryId: "engenharia",
  level: "Intermediário",
  estimatedTime: "50-60 min",
  tags: [
    "Rust",
    "Ownership",
    "Borrowing",
    "Borrow Checker",
    "Slices",
    "Segurança de Memória",
  ],
  learningObjectives: [
    "Entender ownership como um sistema de posse e validade, não como uma regra arbitrária do compilador.",
    "Explicar por que moves evitam ambiguidades de liberação e de uso após o fim da vida útil.",
    "Distinguir empréstimos imutáveis e mutáveis pelo tipo de garantia que cada um exige.",
    "Relacionar slices e referências à ideia de janelas seguras sobre dados existentes.",
    "Reconhecer quando clonar resolve um problema real e quando apenas mascara um desenho ruim.",
    "Usar o borrow checker como ferramenta de design de APIs, e não só como fonte de erro.",
  ],
  prerequisites: [
    "Memória: stack, heap e ponteiros.",
    "Segurança de memória e tempo de vida de dados.",
    "Noções de funções, escopo e estruturas de dados básicas.",
  ],
  references: [
    {
      title: "Understanding Ownership",
      source: "The Rust Programming Language",
      url: "https://doc.rust-lang.org/book/ch04-00-understanding-ownership.html",
      note: "Capítulo-base para o modelo mental de ownership em Rust.",
    },
    {
      title: "References and Borrowing",
      source: "The Rust Programming Language",
      url: "https://doc.rust-lang.org/book/ch04-02-references-and-borrowing.html",
      note: "Explica as regras fundamentais de empréstimos imutáveis e mutáveis.",
    },
    {
      title: "The Slice Type",
      source: "The Rust Programming Language",
      url: "https://doc.rust-lang.org/book/ch04-03-slices.html",
      note: "Conecta referências a fatias, strings e janelas seguras sobre buffers.",
    },
    {
      title: "Rust API Guidelines",
      source: "Rust Library Team and Community",
      url: "https://rust-lang.github.io/api-guidelines/",
      note: "Bom material para pensar ownership e borrowing em interfaces públicas.",
    },
    {
      title: "The Rustonomicon",
      source: "Rust Project",
      url: "https://doc.rust-lang.org/nomicon/",
      note: "Referência complementar para entender por que as garantias importam tanto em systems programming.",
    },
  ],
  heroVisual: "lesson-hero",
  openingText:
    "Quem chega de linguagens com garbage collector costuma perguntar: 'por que Rust complica tanto para eu passar um valor adiante?'. A resposta curta é que Rust tenta impedir, em tempo de compilação, várias ambiguidades que em outras linguagens só aparecem como custo de runtime, bugs intermitentes ou discipline manual. Ownership e borrowing são o coração dessa escolha: uma dona por vez, referências com regras claras e liberação previsível quando o escopo termina.",
  quickFacts: [
    {
      title: "Move não é cópia",
      body: "Ao mover um valor, Rust transfere a posse e invalida o uso do nome antigo.",
    },
    {
      title: "Borrow não é posse",
      body: "Referências permitem usar um valor sem assumir a responsabilidade por destruí-lo.",
    },
    {
      title: "Mutabilidade exclusiva",
      body: "Se alguém pode escrever, Rust reduz o risco proibindo concorrência de acessos incompatíveis.",
    },
    {
      title: "Slice é uma janela",
      body: "Uma fatia aponta para parte de um buffer que continua pertencendo a outro dono.",
    },
  ],
  sections: [
    s(
      "ownership-como-contabilidade",
      "Modelo mental",
      "Ownership é contabilidade de recursos",
      "A grande ideia não é 'variáveis mágicas', mas um sistema que deixa claro quem responde por cada valor em cada ponto do programa.",
      "concept-grid",
      undefined,
      [
        "Em linguagens com gerenciamento automático, muitas vezes pensamos em dados como algo que simplesmente existe enquanto houver interesse. Em Rust, o programa precisa manter um mapa mais nítido: quem possui o valor, quem só o consulta e em que escopo a responsabilidade termina.",
        "Essa disciplina resolve dois problemas de uma vez. Primeiro, impede liberações ambíguas ou duplicadas. Segundo, evita o cenário em que vários nomes parecem válidos para um mesmo dado sem que fique claro quem pode mutar, destruir ou mover esse dado.",
        "O ganho não é apenas segurança. Quando o compilador entende posse e empréstimos, ele também elimina a necessidade de um garbage collector para essa classe de problemas, o que combina muito bem com sistemas sensíveis a latência e previsibilidade.",
      ],
      [
        {
          type: "definition",
          title: "Ownership",
          body: "Regra pela qual cada valor tem uma dona principal responsável por sua validade e por seu descarte quando o escopo termina.",
        },
        {
          type: "insight",
          title: "Posse é sobre responsabilidade",
          body: "Ownership não serve para 'proibir reuso'; serve para impedir dúvida sobre quem responde pelo recurso.",
        },
      ],
    ),
    s(
      "moves-transferem-responsabilidade",
      "Fluxo",
      "Move transfere responsabilidade em vez de duplicar sem aviso",
      "Quando um valor é movido, Rust prefere invalidar o nome antigo a manter duas entidades fingindo que controlam o mesmo recurso.",
      "pipeline-diagram",
      "pipeline-lab",
      [
        "Imagine um String alocado na heap. Se duas variáveis fossem tratadas como donas completas desse mesmo buffer, quem o liberaria no final? Copiar silenciosamente ponteiros resolveria a sintaxe, mas criaria uma ambiguidade perigosa na destruição.",
        "Por isso, para muitos tipos, uma atribuição ou passagem para função realiza um move. O nome de origem deixa de ser utilizável e o destino assume a posse. O valor continua existindo; o que muda é quem tem o direito de administrá-lo.",
        "Esse comportamento parece rígido no começo, mas ele transforma uma classe inteira de bugs em mensagens do compilador. Em systems programming, trocar incerteza em runtime por clareza no design quase sempre é um bom negócio.",
      ],
      [
        {
          type: "definition",
          title: "Move semantics",
          body: "Semântica em que a posse de um valor é transferida para outro nome, variável ou função, invalidando o uso do nome anterior.",
        },
        {
          type: "example",
          title: "Passar String por valor",
          body: "Ao chamar uma função que recebe String, você normalmente entrega a posse do buffer, não apenas uma vista dele.",
        },
      ],
    ),
    s(
      "borrowing-imutavel",
      "Leitura",
      "Borrowing permite usar sem possuir",
      "Referências existem para que o dado não precise mudar de dono toda vez que alguém só quer observá-lo.",
      "impact-board",
      undefined,
      [
        "Uma função que apenas lê um valor não precisa assumir a responsabilidade por destruí-lo. Em vez de mover a posse, ela pode receber uma referência imutável, que funciona como uma permissão temporária de leitura.",
        "Esse modelo é poderoso porque separa duas perguntas que em muitas linguagens ficam misturadas: quem usa o dado agora e quem responde por ele no fim. Várias partes do programa podem observar o mesmo valor ao mesmo tempo, desde que nenhuma delas precise mutá-lo.",
        "Na prática, isso faz APIs mais expressivas. Assinar uma função com &str, &[T] ou &MeuTipo comunica imediatamente: 'eu preciso enxergar esse dado, mas não preciso me tornar dona dele'.",
      ],
      [
        {
          type: "definition",
          title: "Borrow imutável",
          body: "Empréstimo temporário que permite ler um valor sem transferir sua posse nem autorizar mutação.",
        },
        {
          type: "insight",
          title: "Compartilhar leitura é barato",
          body: "Muitas APIs eficientes em Rust existem porque conseguem aceitar referências em vez de exigir cópias ou moves.",
        },
      ],
    ),
    s(
      "mutabilidade-exclusiva",
      "Escrita",
      "Se alguém pode mutar, Rust reduz a ambiguidade ao mínimo",
      "O compilador impõe exclusividade para evitar o caso mais traiçoeiro: um código lendo uma visão antiga enquanto outro altera o mesmo valor.",
      "tradeoff-spectrum",
      "tradeoff-lab",
      [
        "Escrever em um valor compartilhado é muito mais delicado do que apenas lê-lo. Se múltiplas referências pudessem modificar ou observar o mesmo dado sem coordenação, seria fácil criar estados intermediários incoerentes, aliasing perigoso ou races lógicas.",
        "Por isso, a regra central fica famosa: vários borrows imutáveis ou um único borrow mutável. Essa regra não é um fetiche de pureza; ela codifica uma ideia operacional importante sobre coerência do estado.",
        "Quando o compilador reclama de um borrow mutável concorrendo com outra referência, ele está dizendo que o desenho atual esconde uma política de acesso. Em vez de remendar, vale perguntar: quem realmente precisa escrever aqui, e em que janela de tempo?",
      ],
      [
        {
          type: "definition",
          title: "Borrow mutável",
          body: "Empréstimo temporário com permissão de escrita que exige exclusividade durante seu período de validade.",
        },
        {
          type: "mistake",
          title: "Tentar 'só mais uma leitura' durante um &mut",
          body: "Mesmo uma leitura adicional pode quebrar a clareza sobre qual visão do estado ainda é válida durante a mutação.",
        },
      ],
    ),
    s(
      "slices-janelas-seguras",
      "Estruturas",
      "Slices são janelas seguras sobre buffers alheios",
      "Em vez de copiar arrays e strings inteiras, Rust permite emprestar apenas uma parte visível do dado.",
      "concept-grid",
      undefined,
      [
        "Um slice carrega a ideia de 'subconjunto observado' sem se tornar dono do armazenamento. Em strings, isso aparece com &str. Em coleções lineares, com &[T] ou &mut [T].",
        "Esse detalhe muda bastante o design de funções. Muitas APIs não precisam pedir String ou Vec<T>; elas precisam apenas de algo que possa ser lido como fatia. Isso reduz alocações desnecessárias e torna chamadas mais flexíveis.",
        "Ao mesmo tempo, slices deixam explícito que a vida útil da janela depende da vida útil do buffer original. A fatia não existe sozinha; ela é uma vista temporária sobre um valor que outro escopo ainda possui.",
      ],
      [
        {
          type: "definition",
          title: "Slice",
          body: "Referência para uma sequência contígua dentro de um buffer que pertence a outro valor.",
        },
        {
          type: "example",
          title: "&str em vez de String",
          body: "Se a função só precisa ler texto, aceitar &str evita exigir posse e amplia os chamadores possíveis.",
        },
      ],
    ),
    s(
      "borrow-checker-como-coautor",
      "Depuração",
      "O borrow checker é um coautor de arquitetura",
      "Muitos erros do compilador são, na verdade, sinais de que o fluxo de posse e de acesso do programa ainda está nebuloso.",
      "impact-board",
      "scenario-lab",
      [
        "É tentador tratar mensagens sobre ownership como burocracia. Mas, com prática, elas começam a revelar mais do que um erro local: mostram onde sua API mistura leitura, escrita, posse e duração em um mesmo gesto.",
        "Quando um método exige clone demais, quando um retorno fica preso a um borrow longo demais ou quando uma função precisa mutar e iterar ao mesmo tempo, o compilador costuma expor que a estrutura dos passos precisa ser reorganizada.",
        "Em vez de lutar contra o checker, a abordagem produtiva é encurtar empréstimos, separar fases de leitura e escrita, devolver valores em vez de referências quando fizer sentido e modelar melhor a fronteira entre quem observa e quem possui.",
      ],
      [
        {
          type: "insight",
          title: "Erro de borrow frequentemente é erro de desenho",
          body: "O compilador raramente pede 'truques'; ele costuma pedir que você torne a política de acesso mais explícita.",
        },
        {
          type: "mistake",
          title: "Resolver tudo com clone",
          body: "Clonar pode ser a decisão certa, mas usar clone apenas para silenciar o checker costuma esconder uma API mal desenhada ou um custo evitável.",
        },
      ],
    ),
    s(
      "clone-copy-e-custo",
      "Performance",
      "Copiar, clonar e emprestar têm custos diferentes",
      "Nem toda duplicação é ruim, mas misturar Copy, Clone e borrow sem critério leva a software confuso ou caro demais.",
      "tradeoff-spectrum",
      undefined,
      [
        "Tipos pequenos e triviais podem implementar Copy, o que permite cópias implícitas seguras e baratas. Já tipos que controlam recursos na heap, arquivos ou locks normalmente exigem decisões explícitas, como move, borrow ou clone.",
        "Clone é útil quando você realmente precisa de duas instâncias independentes. O problema surge quando ele vira reflexo automático sempre que ownership parece inconveniente, especialmente em loops quentes, coleções grandes ou pipelines de texto.",
        "A escolha madura em Rust não é 'nunca clonar'; é entender qual semântica você quer. Precisa compartilhar leitura? Empreste. Precisa transferir responsabilidade? Mova. Precisa duplicar de fato? Clone conscientemente.",
      ],
      [
        {
          type: "definition",
          title: "Clone",
          body: "Operação explícita de duplicação lógica de um valor, potencialmente com custo proporcional ao conteúdo.",
        },
        {
          type: "mistake",
          title: "Confundir ergonomia com eficiência",
          body: "Uma chamada que 'resolveu rápido' com clone pode ter criado tráfego de memória e alocação que só aparecerão depois.",
        },
      ],
    ),
    s(
      "heuristicas-praticas",
      "Projeto",
      "Heurísticas práticas para APIs mais idiomáticas",
      "Ownership e borrowing ficam mais naturais quando você pensa primeiro na intenção da interface e só depois na sintaxe.",
      "pipeline-diagram",
      undefined,
      [
        "Se a função apenas lê, prefira receber referências. Se precisa transformar e devolver, considere receber posse e retornar o valor transformado. Se o dado será armazenado além da chamada, provavelmente a função precisa se tornar dona dele.",
        "Outra heurística importante é diminuir o tempo de vida dos empréstimos. Leia o que precisa, materialize decisões, depois solte a referência antes da próxima etapa. Isso ajuda tanto o compilador quanto a legibilidade humana.",
        "No fim, ownership não é um tema isolado de Rust: é uma forma de tornar explícitas decisões que toda linguagem precisa tomar, só que muitas vezes deixa escondidas em runtime. Em Rust, esse custo cognitivo sobe no começo para reduzir surpresa depois.",
      ],
      [
        {
          type: "example",
          title: "Ler com &str, armazenar com String",
          body: "Uma fronteira comum é aceitar entrada emprestada e decidir internamente quando faz sentido alocar uma versão própria.",
        },
        {
          type: "insight",
          title: "Escopos curtos ajudam mais do que gambiarra",
          body: "Frequentemente o melhor ajuste é reorganizar blocos e responsabilidades, não adicionar camadas extras de indireção.",
        },
      ],
    ),
    s(
      "quiz-revisao",
      "Revisão",
      "Quiz de revisão",
      "Teste se move, borrow, mutabilidade exclusiva e slices já formam um único modelo mental na sua cabeça.",
      undefined,
      "quiz",
      [
        "O objetivo aqui não é decorar slogans, mas enxergar a diferença entre posse, observação e duplicação.",
      ],
      [],
    ),
    s(
      "glossario",
      "Glossário",
      "Termos essenciais",
      "Feche a aula consolidando o vocabulário que aparece o tempo todo na documentação e nas mensagens do compilador.",
      undefined,
      "glossary",
      [
        "Ler mensagens de borrow checker fica muito mais fácil quando estes termos já parecem familiares.",
      ],
      [],
    ),
  ],
  summaryCards: [
    {
      title: "Ownership define responsabilidade",
      body: "Cada valor tem uma dona principal enquanto está válido.",
    },
    {
      title: "Move evita ambiguidade",
      body: "Transferir posse é mais seguro do que copiar controle de recursos sem aviso.",
    },
    {
      title: "Borrow separa uso de posse",
      body: "Referências permitem ler ou escrever temporariamente sem virar dono permanente.",
    },
    {
      title: "Mutabilidade exige exclusividade",
      body: "Rust restringe acessos incompatíveis para preservar coerência do estado.",
    },
    {
      title: "Slice é vista, não armazenamento",
      body: "Fatias dependem da vida útil do buffer original que continuam referenciando.",
    },
    {
      title: "Clone deve ser deliberado",
      body: "Duplicar dados pode ser correto, mas não deve virar resposta automática para todo conflito.",
    },
  ],
  quiz: [
    q(
      "q1",
      "Qual é a melhor leitura do conceito de ownership em Rust?",
      "Um sistema que deixa claro quem responde por um valor e quando essa responsabilidade termina.",
      "Uma exigência sintática criada apenas para economizar memória.",
      "Um substituto direto para tipagem estática.",
      "a",
      "Ownership organiza responsabilidade sobre recursos e validade, não apenas memória ocupada.",
    ),
    q(
      "q2",
      "Quando um String é movido para outra variável, o que acontece com o nome original?",
      "Ele deixa de poder ser usado como dono daquele valor.",
      "Ele continua dono junto com o novo nome.",
      "Ele vira automaticamente uma referência imutável.",
      "a",
      "O valor continua existindo, mas a posse foi transferida para evitar ambiguidade.",
    ),
    q(
      "q3",
      "Por que referências imutáveis são úteis?",
      "Porque permitem ler dados sem transferir posse e sem duplicar o conteúdo.",
      "Porque tornam todo valor automaticamente copiável.",
      "Porque substituem qualquer necessidade de escopo.",
      "a",
      "Borrowing imutável separa uso de leitura da responsabilidade por destruir o valor.",
    ),
    q(
      "q4",
      "Qual regra resume corretamente a política de borrowing em Rust?",
      "Vários borrows imutáveis ou um borrow mutável exclusivo.",
      "Sempre um único borrow, seja leitura ou escrita.",
      "Quantos borrows mutáveis forem necessários, desde que curtos.",
      "a",
      "A distinção protege coerência do estado e reduz aliasing perigoso.",
    ),
    q(
      "q5",
      "O que um slice como &str comunica numa API?",
      "Que a função quer uma visão sobre dados já existentes, sem necessariamente possuir o buffer.",
      "Que a função vai sempre copiar o texto recebido.",
      "Que a função só aceita strings alocadas na stack.",
      "a",
      "Slices são janelas sobre armazenamento já pertencente a outro valor.",
    ),
    q(
      "q6",
      "Quando usar clone costuma ser uma má decisão?",
      "Quando ele serve apenas para calar o compilador sem necessidade semântica real de duplicação.",
      "Quando o tipo implementa Clone explicitamente.",
      "Quando o valor será lido mais de uma vez.",
      "a",
      "Clone pode ser correto, mas seu uso automático frequentemente esconde custo ou desenho ruim.",
    ),
    q(
      "q7",
      "O que o borrow checker frequentemente revela além do erro local?",
      "Que a arquitetura do fluxo de posse e acesso ainda está confusa.",
      "Que o compilador não entende loops.",
      "Que Rust não suporta estruturas mutáveis.",
      "a",
      "Muitos erros de borrow indicam políticas de acesso mal explicitadas na API ou no algoritmo.",
    ),
    q(
      "q8",
      "Qual heurística é mais idiomática ao desenhar APIs em Rust?",
      "Receber referências para leitura e assumir posse apenas quando a função realmente precisa armazenar ou transformar com autonomia.",
      "Sempre exigir ownership para facilitar a implementação.",
      "Evitar referências e usar clone em todas as fronteiras.",
      "a",
      "A semântica da API deve refletir a intenção real: observar, transformar ou possuir.",
    ),
  ],
  glossary: [
    g("Ownership", "Sistema de posse que define quem responde por um valor e quando ele deve ser descartado."),
    g("Owner", "Nome ou estrutura que atualmente detém a posse principal de um valor."),
    g("Move", "Transferência de posse que invalida o uso do nome anterior como dono."),
    g("Borrow", "Empréstimo temporário de acesso sem transferência de posse."),
    g("Referência imutável", "Acesso somente de leitura a um valor durante uma janela limitada."),
    g("Referência mutável", "Acesso exclusivo de escrita e leitura a um valor emprestado."),
    g("Borrow checker", "Parte do compilador que verifica regras de posse, empréstimo e validade."),
    g("Slice", "Janela segura para parte de um buffer já existente, como &str ou &[T]."),
    g("Clone", "Duplicação explícita de um valor, possivelmente com custo relevante."),
    g("Copy", "Semântica de cópia implícita para tipos pequenos e triviais que não possuem destruição complexa."),
    g("Aliasing", "Situação em que múltiplos acessos apontam para o mesmo dado físico."),
    g("Drop", "Momento em que um valor sai de escopo e seus recursos associados são liberados."),
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
