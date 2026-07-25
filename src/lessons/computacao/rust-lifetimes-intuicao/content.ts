import type { LessonContent } from "../../../types/content";

export const rustLifetimesIntuicaoContent: LessonContent = {
  id: "rust-lifetimes-intuicao",
  title: "Rust: Lifetimes (Intuição)",
  subtitle:
    "Lifetime em Rust não é um cronômetro secreto dentro do valor, mas uma forma de declarar relações de validade entre referências e escopos.",
  description:
    "Aula avançada sobre a intuição por trás de lifetimes, sobreposição de escopos, anotações em assinaturas, lifetime elision, structs com referências, uso de 'static e critérios para possuir dados em vez de prolongar empréstimos.",
  primaryCategoryId: "computacao",
  secondaryCategoryId: "engenharia",
  level: "Avançado",
  estimatedTime: "55-65 min",
  tags: [
    "Rust",
    "Lifetimes",
    "Borrow Checker",
    "Referências",
    "Escopo",
    "API Design",
  ],
  learningObjectives: [
    "Entender lifetimes como relações entre referências, e não como duração física adicionada aos objetos.",
    "Visualizar por que o compilador precisa saber como escopos de entrada e saída se sobrepõem.",
    "Interpretar assinaturas com lifetimes como contratos sobre validade, não como instruções para prolongar dados.",
    "Reconhecer quando lifetime elision já resolve o caso e quando a anotação explícita é inevitável.",
    "Modelar structs com referências sem perder de vista o custo cognitivo desse desenho.",
    "Escolher conscientemente entre possuir dados ou propagar empréstimos por camadas demais.",
  ],
  prerequisites: [
    "Rust: Ownership e Borrowing.",
    "Memória: stack, heap e ponteiros.",
    "Conforto com funções, referências e retorno de valores.",
  ],
  references: [
    {
      title: "Validating References with Lifetimes",
      source: "The Rust Programming Language",
      url: "https://doc.rust-lang.org/book/ch10-03-lifetime-syntax.html",
      note: "Capítulo central para a sintaxe e a intuição das anotações de lifetime.",
    },
    {
      title: "Generic Types, Traits, and Lifetimes",
      source: "The Rust Programming Language",
      url: "https://doc.rust-lang.org/book/ch10-00-generics.html",
      note: "Contexto maior de como lifetimes convivem com outras formas de parametrização.",
    },
    {
      title: "Lifetime Elision",
      source: "The Rust Reference",
      url: "https://doc.rust-lang.org/reference/lifetime-elision.html",
      note: "Explica os casos em que o compilador pode inferir relações sem anotação explícita.",
    },
    {
      title: "Lifetimes",
      source: "The Rustonomicon",
      url: "https://doc.rust-lang.org/nomicon/lifetimes.html",
      note: "Leitura complementar para quem quer consolidar a intuição além do básico.",
    },
    {
      title: "References and Borrowing",
      source: "The Rust Programming Language",
      url: "https://doc.rust-lang.org/book/ch04-02-references-and-borrowing.html",
      note: "Revisão importante antes de avançar para contratos explícitos de validade.",
    },
  ],
  heroVisual: "lesson-hero",
  openingText:
    "Muita gente aprende lifetimes como se fossem uma camada esotérica do borrow checker. Isso costuma travar o estudo. A intuição útil é bem mais concreta: referências não podem sobreviver ao que apontam, e o compilador às vezes precisa que você explicite como diferentes escopos se relacionam. As anotações não 'estendem' a vida de nada; elas apenas tornam esse relacionamento verificável.",
  quickFacts: [
    {
      title: "Lifetime não cria duração",
      body: "A anotação descreve uma relação de validade; ela não prolonga um valor no runtime.",
    },
    {
      title: "Referência depende do alvo",
      body: "Se o dado original morreu, nenhuma sintaxe de lifetime pode torná-lo válido de novo.",
    },
    {
      title: "Elision é convenção",
      body: "Em muitos casos o compilador preenche relações óbvias sem você escrever nada.",
    },
    {
      title: "Own às vezes é melhor",
      body: "Propagar empréstimos por toda a arquitetura pode custar mais clareza do que uma alocação pontual.",
    },
  ],
  sections: [
    s(
      "lifetimes-sao-relacoes",
      "Intuição",
      "Lifetime é sobre relação, não sobre relógio interno",
      "A anotação de lifetime existe para dizer ao compilador como referências se apoiam em escopos reais que já existem no programa.",
      "concept-grid",
      undefined,
      [
        "Um erro comum é imaginar que lifetime seja um campo oculto anexado ao valor, como se o compilador estivesse contando segundos de vida. Não é isso. O que existe são escopos e referências, e a necessidade de provar que a referência não vai durar mais que o dado referenciado.",
        "Por isso, quando você escreve algo como &'a str, a letra não está 'dando vida' ao texto. Ela está nomeando uma relação: esta referência é válida dentro de uma janela associada a 'a, e essa janela precisa ser compatível com o uso posterior.",
        "Essa mudança de perspectiva tira boa parte da mística. Lifetimes são linguagem para falar de dependência entre regiões de uso, especialmente quando a assinatura da função, por si só, não deixa claro de onde vem a referência retornada.",
      ],
      [
        {
          type: "definition",
          title: "Lifetime",
          body: "Relação usada pelo compilador para verificar por quanto tempo uma referência pode permanecer válida em relação aos escopos envolvidos.",
        },
        {
          type: "insight",
          title: "Nada ganha vida extra",
          body: "A anotação descreve um vínculo lógico; ela não impede um valor de sair de escopo no runtime.",
        },
      ],
    ),
    s(
      "escopos-e-sobreposicao",
      "Escopos",
      "O ponto central é a sobreposição entre janelas de uso",
      "O compilador precisa saber se o período em que a referência será usada cabe dentro do período em que o dado continua existindo.",
      "pipeline-diagram",
      "pipeline-lab",
      [
        "Quando uma função recebe duas referências e devolve uma delas, o problema não é a sintaxe de retorno. O problema é descobrir a qual escopo de entrada a saída está vinculada e se esse escopo sobreviverá o suficiente.",
        "A palavra-chave aqui é sobreposição. Uma referência só é segura se a janela de uso estiver contida na janela de validade do alvo. Quando há múltiplos candidatos, o compilador se recusa a adivinhar uma relação sem prova suficiente.",
        "Essa leitura aproxima lifetimes de arquitetura de memória que você já conhece: o endereço pode existir, mas o significado lógico do dado depende de ainda haver um dono vivo e um escopo que justifique aquele acesso.",
      ],
      [
        {
          type: "definition",
          title: "Sobreposição de escopos",
          body: "Interseção entre a janela em que um dado está vivo e a janela em que a referência será usada.",
        },
        {
          type: "example",
          title: "Retornar uma das entradas",
          body: "Se a função pode devolver uma entre várias referências recebidas, a assinatura precisa expressar de qual relação a saída depende.",
        },
      ],
    ),
    s(
      "assinaturas-como-contratos",
      "Assinaturas",
      "Anotar lifetimes é declarar contrato de dependência",
      "Em funções, a anotação não fala sobre implementação interna; ela fala sobre como argumentos e retorno se relacionam.",
      "impact-board",
      undefined,
      [
        "Uma assinatura com lifetimes diz ao chamador algo muito específico: se você me entregar referências cujas janelas se comportam de tal maneira, eu devolvo uma referência subordinada a essa mesma lógica. É um contrato, não um truque local.",
        "Isso explica por que a anotação vive na fronteira da função. O borrow checker já enxerga muitos escopos dentro do corpo graças à inferência. O ponto em que a informação falta com mais frequência é a interface entre partes do programa.",
        "Ler assinaturas dessa forma muda o estudo. Em vez de perguntar 'qual letra eu escrevo?', você passa a perguntar 'de qual entrada a saída depende?' e 'essa dependência é real ou eu deveria devolver um valor possuído?'.",
      ],
      [
        {
          type: "insight",
          title: "A interface carrega a semântica",
          body: "Lifetime em assinatura é menos sobre o compilador do corpo e mais sobre o compromisso público da função.",
        },
      ],
    ),
    s(
      "o-exemplo-longest",
      "Exemplo",
      "O clássico longest ensina relação, não decoreba",
      "O exemplo mais famoso de lifetimes é útil porque obriga a enxergar que a saída está ligada ao menor intervalo seguro entre as entradas relevantes.",
      "impact-board",
      "scenario-lab",
      [
        "No exemplo em que uma função recebe duas strings e devolve a maior, o problema não é comparar comprimentos. O problema é garantir que a referência devolvida não continue viva depois que a string escolhida deixou de existir.",
        "Ao escrever um lifetime comum para ambas as entradas e para a saída, você não está dizendo que as duas entradas duram igual. Está dizendo que a referência retornada só pode ser usada dentro da interseção segura que o chamador fornecer.",
        "Esse é o coração da intuição: o compilador não quer saber apenas 'qual valor saiu', mas 'qual promessa de validade acompanha esse valor quando ele cruza a fronteira da função'.",
      ],
      [
        {
          type: "example",
          title: "A saída vive no menor intervalo aplicável",
          body: "Se o retorno pode vir de qualquer uma das entradas, a referência devolvida só pode ser usada enquanto ambas as garantias relevantes ainda forem compatíveis.",
        },
        {
          type: "mistake",
          title: "Achar que 'a força duas variáveis a durarem igual",
          body: "A anotação não modifica a vida real dos valores; ela apenas restringe onde o retorno pode ser considerado válido.",
        },
      ],
    ),
    s(
      "elision-sem-medo",
      "Ergonomia",
      "Lifetime elision existe para esconder o óbvio",
      "Boa parte do código idiomático usa lifetimes sem exibi-los, porque o compilador já conhece alguns padrões de dependência muito frequentes.",
      "pipeline-diagram",
      undefined,
      [
        "Se toda função exigisse anotações explícitas, Rust seria impraticável. As regras de elision existem para os casos em que a relação entre entradas e saída já é considerada suficientemente clara por convenção.",
        "Isso é comum em funções com uma única referência de entrada, em métodos cujo retorno se apoia no self e em outras formas simples de associação. Quando o caso foge dessas regras, aí sim a anotação aparece.",
        "A lição prática é importante: nem todo erro de lifetime pede mais letras. Às vezes o compilador já inferiu tudo o que podia, e o problema restante é semântico: a função está tentando devolver algo cuja relação de validade realmente está ambígua.",
      ],
      [
        {
          type: "definition",
          title: "Lifetime elision",
          body: "Conjunto de regras pelas quais o compilador infere lifetimes em casos padronizados, reduzindo ruído sintático.",
        },
      ],
    ),
    s(
      "structs-com-referencias",
      "Modelagem",
      "Structs com referências são poderosos, mas cobram clareza arquitetural",
      "Guardar borrows dentro de structs pode evitar cópias, porém propaga restrições de validade por mais camadas do sistema.",
      "tradeoff-spectrum",
      "tradeoff-lab",
      [
        "Quando uma struct armazena referências, ela passa a carregar junto a obrigação de provar que os dados apontados sobreviverão enquanto a própria struct existir. Isso pode ser ótimo para views, parsers de curto alcance e estruturas transitórias.",
        "O custo aparece quando esse padrão se espalha além do necessário. Cada camada que encapsula referências pode herdar lifetimes adicionais, tornando assinaturas mais densas e acoplando partes distantes do programa à mesma política de validade.",
        "Por isso, a pergunta certa não é 'dá para usar borrow aqui?', mas 'vale a pena que esta estrutura dependa de dados externos em vez de possuir o que precisa?'. Em muitos casos, uma cópia estratégica simplifica todo o restante.",
      ],
      [
        {
          type: "definition",
          title: "Dados emprestados em struct",
          body: "Modelagem em que a estrutura guarda referências para dados mantidos vivos por algum dono externo.",
        },
        {
          type: "mistake",
          title: "Emprestar por padrão em toda a arquitetura",
          body: "Evitar uma alocação local pode espalhar complexidade de lifetime por módulos inteiros.",
        },
      ],
    ),
    s(
      "static-sem-misticismo",
      "Vocabulário",
      "'static não significa 'sempre melhor'",
      "O lifetime 'static descreve dados válidos por toda a execução ou limites que aceitam algo suficientemente duradouro, mas isso não o torna solução universal.",
      "concept-grid",
      undefined,
      [
        "Literais de string normalmente têm lifetime 'static porque vivem embutidos no binário e podem ser referenciados durante toda a execução. Isso é um caso concreto e simples.",
        "O problema nasce quando iniciantes tentam usar 'static como remédio para qualquer erro. Quase sempre isso inverte a lógica: em vez de modelar a relação correta de validade, tenta-se pedir uma garantia muito mais forte do que o cenário realmente oferece.",
        "Pensar com precisão ajuda: se o dado realmente precisa durar a execução toda, 'static pode ser apropriado. Se não precisa, forçar esse lifetime costuma sinalizar entendimento incompleto ou desenho inadequado da API.",
      ],
      [
        {
          type: "definition",
          title: "'static",
          body: "Lifetime associado a dados válidos durante toda a execução do programa ou a limites que aceitam esse grau de duração.",
        },
        {
          type: "mistake",
          title: "Usar 'static para calar o compilador",
          body: "Pedir a garantia mais forte possível raramente resolve a modelagem errada de forma honesta.",
        },
      ],
    ),
    s(
      "quando-possuir",
      "Projeto",
      "Às vezes a melhor anotação de lifetime é não precisar dela",
      "Possuir dados em fronteiras estratégicas pode reduzir acoplamento e devolver simplicidade ao restante do sistema.",
      "impact-board",
      undefined,
      [
        "Se uma função precisa reter informação, atravessar threads, armazenar em cache ou sobreviver a pipelines longos, possuir o dado muitas vezes é mais estável do que manter cadeias extensas de referências.",
        "Isso não contradiz a filosofia de Rust. Pelo contrário: ownership é sobre clareza. Se o desenho lógico diz que aquele componente deve ser autônomo, dar a ele seus próprios dados pode expressar melhor a realidade do sistema.",
        "A maturidade aqui é escolher o ponto certo. Borrow para leitura local e barata; ownership para independência estrutural. Lifetimes existem para descrever dependências reais, não para provar heroicamente que tudo pode ser emprestado para sempre.",
      ],
      [
        {
          type: "insight",
          title: "Autonomia também tem valor",
          body: "Uma alocação consciente pode simplificar regras de validade, reduzir acoplamento e facilitar manutenção.",
        },
      ],
    ),
    s(
      "quiz-revisao",
      "Revisão",
      "Quiz de revisão",
      "Confira se a ideia de relação entre escopos, assinaturas e referências já está mais sólida que a mera sintaxe.",
      undefined,
      "quiz",
      [
        "O ganho real desta aula é aprender a ler contratos de validade, não decorar apóstrofos.",
      ],
      [],
    ),
    s(
      "glossario",
      "Glossário",
      "Termos essenciais",
      "Consolide o vocabulário que aparece em exemplos clássicos, documentação oficial e mensagens do borrow checker.",
      undefined,
      "glossary",
      [
        "Esses termos ajudam a transformar lifetimes de tema abstrato em ferramenta prática de leitura e design.",
      ],
      [],
    ),
  ],
  summaryCards: [
    {
      title: "Lifetime descreve relação",
      body: "A anotação só faz sentido em função da validade entre referências e escopos reais.",
    },
    {
      title: "Assinatura é contrato",
      body: "A fronteira da função comunica de quais entradas a validade do retorno depende.",
    },
    {
      title: "Elision cobre o óbvio",
      body: "Muitas relações comuns já são inferidas sem ruído sintático.",
    },
    {
      title: "Struct com borrow é escolha arquitetural",
      body: "Ganhar zero cópia local pode espalhar restrições pelo sistema inteiro.",
    },
    {
      title: "'static é caso especial",
      body: "Ele não deve ser tratado como cura genérica para qualquer erro de lifetime.",
    },
    {
      title: "Possuir pode simplificar",
      body: "Nem toda dependência precisa atravessar camadas como referência.",
    },
  ],
  quiz: [
    q(
      "q1",
      "Qual frase capta melhor a ideia de lifetime em Rust?",
      "É uma forma de declarar relações de validade entre referências e escopos.",
      "É um mecanismo que faz valores viverem mais tempo no runtime.",
      "É um substituto para tipos genéricos.",
      "a",
      "Lifetime não prolonga dados; ele descreve limites seguros para uso de referências.",
    ),
    q(
      "q2",
      "Por que o compilador pede lifetime explícito em alguns retornos por referência?",
      "Porque precisa saber de qual entrada a validade da saída depende.",
      "Porque toda função com duas entradas é avançada demais para inferência.",
      "Porque referências nunca podem ser retornadas sem anotação.",
      "a",
      "A anotação aparece quando a relação entre entradas e saída não é suficientemente óbvia pelas regras de elision.",
    ),
    q(
      "q3",
      "O que a anotação &'a T NÃO faz?",
      "Não aumenta a duração real do valor apontado.",
      "Não nomeia uma relação de validade para a referência.",
      "Não participa da verificação do compilador.",
      "a",
      "Ela só descreve um vínculo; o valor continua obedecendo ao seu escopo real.",
    ),
    q(
      "q4",
      "No exemplo clássico longest, o ponto central é:",
      "Garantir que a referência devolvida só seja usada dentro de uma janela compatível com as entradas relevantes.",
      "Transformar duas strings em dados 'static.",
      "Permitir que o retorno viva mais que os argumentos.",
      "a",
      "A função expressa a dependência do retorno em relação aos argumentos, não uma magia de extensão temporal.",
    ),
    q(
      "q5",
      "O que lifetime elision oferece ao programador?",
      "Inferência automática em padrões comuns para reduzir ruído sintático.",
      "Garantia de que nenhuma anotação explícita será necessária.",
      "Conversão de referências em ownership quando conveniente.",
      "a",
      "Elision cobre casos frequentes, mas não substitui contratos explícitos em cenários ambíguos.",
    ),
    q(
      "q6",
      "Qual é um risco de structs que armazenam referências?",
      "Propagar restrições de validade por mais camadas do sistema.",
      "Perder completamente a checagem do compilador.",
      "Impedir qualquer uso de traits.",
      "a",
      "Guardar borrows internamente pode ser ótimo, mas cobra clareza arquitetural em torno da validade dos dados.",
    ),
    q(
      "q7",
      "Quando usar 'static como resposta automática costuma ser um erro?",
      "Quando ele é usado só para calar o compilador sem refletir a duração real do dado.",
      "Quando o dado é um literal de string.",
      "Quando a referência nunca sai de uma função.",
      "a",
      "Pedir uma garantia mais forte do que o cenário precisa costuma mascarar um modelo mental incompleto.",
    ),
    q(
      "q8",
      "Qual decisão pode simplificar bastante uma API carregada de lifetimes?",
      "Possuir certos dados em fronteiras estratégicas em vez de prolongar empréstimos por toda a arquitetura.",
      "Remover todas as referências e usar apenas tipos primitivos.",
      "Trocar lifetimes por comentários explicativos.",
      "a",
      "Ownership em pontos certos reduz acoplamento e torna a estrutura do sistema mais previsível.",
    ),
  ],
  glossary: [
    g("Lifetime", "Relação de validade usada para verificar por quanto tempo uma referência pode ser usada com segurança."),
    g("Escopo", "Região do programa em que um nome e seus valores associados continuam válidos."),
    g("Referência", "Acesso emprestado a um valor pertencente a outro dono."),
    g("Dangling reference", "Referência que continuaria apontando para um dado já inválido se o compilador permitisse."),
    g("Elision", "Inferência automática de lifetimes em padrões reconhecidos pelo compilador."),
    g("Assinatura", "Fronteira pública de uma função ou método que comunica tipos e relações de validade."),
    g("Outlives", "Relação em que uma validade precisa durar pelo menos tanto quanto outra."),
    g("Dados emprestados", "Valores acessados por referência sem transferência de posse."),
    g("Dados possuídos", "Valores cuja responsabilidade de validade e descarte pertence ao componente atual."),
    g("'static", "Lifetime associado a dados válidos durante toda a execução ou a limites que exigem essa garantia."),
    g("Interseção segura", "Janela máxima em que uma referência retornada pode ser usada sem ultrapassar a validade do alvo."),
    g("Contrato de validade", "Leitura conceitual de uma anotação de lifetime em APIs públicas."),
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
