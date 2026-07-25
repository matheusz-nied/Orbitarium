import type { LessonContent } from "../../../types/content";

export const capstoneParserRustOwnershipContent: LessonContent = {
  id: "capstone-parser-rust-ownership",
  title: "Capstone: Parser/Buffer em Rust",
  subtitle:
    "Nesta oficina guiada, o objetivo não é escrever o parser mais esperto possível, mas desenhar um fluxo de buffers e parsing que use ownership, borrowing e lifetimes com critério.",
  description:
    "Capstone avançada sobre design de parser e buffers em Rust: medir custo antes de mexer, decidir entre dados borrowed e owned, entender onde zero-copy ajuda ou atrapalha, e criar fronteiras seguras para APIs, filas e camadas assíncronas.",
  primaryCategoryId: "computacao",
  secondaryCategoryId: "engenharia",
  level: "Avançado",
  estimatedTime: "65-85 min",
  tags: [
    "Rust",
    "Parser",
    "Ownership",
    "Borrowing",
    "Lifetimes",
    "Zero-Copy",
    "Buffers",
    "Engenharia",
  ],
  learningObjectives: [
    "Medir um problema de parsing/buffer antes de reformular ownership ou buscar zero-copy.",
    "Escolher conscientemente entre resultados borrowed, owned ou híbridos conforme a fronteira arquitetural.",
    "Explicar lifetimes como contrato entre entrada e saída, e não como ritual sintático.",
    "Reconhecer quando zero-copy reduz custo real e quando apenas espalha acoplamento temporal pelo sistema.",
    "Projetar fronteiras seguras entre parser, fila, cache, rede e armazenamento.",
    "Usar tipos como &[u8], &str, Bytes e Cow de acordo com o ciclo de vida dos dados.",
  ],
  prerequisites: [
    "Ownership e borrowing em Rust.",
    "Lifetimes em nível introdutório.",
    "Noções de buffers, parsing e custo de alocação.",
    "Leitura básica de perfis ou métricas de alocação.",
  ],
  references: [
    {
      title: "Understanding Ownership",
      source: "The Rust Programming Language",
      url: "https://doc.rust-lang.org/book/ch04-00-understanding-ownership.html",
      note: "Base para o modelo de posse que orienta decisões de parser e buffer.",
    },
    {
      title: "References and Borrowing",
      source: "The Rust Programming Language",
      url: "https://doc.rust-lang.org/book/ch04-02-references-and-borrowing.html",
      note: "Resume as garantias práticas que aparecem quando o parser devolve views em vez de cópias.",
    },
    {
      title: "Validating References with Lifetimes",
      source: "The Rust Programming Language",
      url: "https://doc.rust-lang.org/book/ch10-03-lifetime-syntax.html",
      note: "Útil para transformar lifetime em relação explícita entre entrada e saída.",
    },
    {
      title: "Ownership",
      source: "The Rustonomicon",
      url: "https://doc.rust-lang.org/nomicon/ownership.html",
      note: "Aprofunda por que Rust congela certas combinações de aliasing e mutação.",
    },
    {
      title: "Lifetimes",
      source: "The Rustonomicon",
      url: "https://doc.rust-lang.org/nomicon/lifetimes.html",
      note: "Ajuda a pensar lifetime como validade observável do borrow no fluxo do programa.",
    },
    {
      title: "nom",
      source: "docs.rs",
      url: "https://docs.rs/nom/latest/nom/",
      note: "Documentação oficial da crate, com ênfase em parsing seguro, streaming e zero-copy quando possível.",
    },
    {
      title: "Bytes",
      source: "docs.rs",
      url: "https://docs.rs/bytes/latest/bytes/struct.Bytes.html",
      note: "Mostra um modelo de buffer compartilhado, sliceable e barato de clonar para networking e parsing.",
    },
    {
      title: "Cow",
      source: "Rust Standard Library",
      url: "https://doc.rust-lang.org/std/borrow/enum.Cow.html",
      note: "Referência oficial para modelar saídas que às vezes emprestam e às vezes materializam dados.",
    },
  ],
  heroVisual: "lesson-hero",
  openingText:
    "Imagine uma pipeline que recebe payloads, encontra cabeçalhos, extrai campos e encaminha o resultado para outra camada. O parser atual funciona, mas o profiler mostra muita alocação, muita clonagem de strings e um desenho de ownership que ninguém sabe explicar com clareza. Este capstone parte exatamente desse tipo de situação. Em vez de sair trocando tudo por zero-copy ou espalhando clone para calar o compilador, vamos tratar o parser como uma oficina de engenharia: medir, formular hipótese, escolher a unidade de posse do buffer, testar fronteiras e só então decidir o que deve ser borrowed, owned ou compartilhado.",
  quickFacts: [
    {
      title: "Parser bom começa por contrato",
      body: "Antes de falar de combinadores ou micro-otimizações, decida quem possui o buffer e por quanto tempo.",
    },
    {
      title: "Zero-copy não é objetivo moral",
      body: "Ele é só uma técnica; vale quando remove custo real sem tornar a semântica do sistema opaca.",
    },
    {
      title: "Lifetime não prolonga vida",
      body: "A anotação descreve relação de validade entre referências; ela não cria bytes duráveis do nada.",
    },
    {
      title: "Fronteira segura às vezes copia",
      body: "Ao cruzar fila, cache ou persistência, materializar dados pode simplificar muito a arquitetura.",
    },
  ],
  sections: [
    s(
      "sintoma-real",
      "Oficina",
      "Comece pelo sintoma real, não pelo fascínio do zero-copy",
      "O capstone assume um parser que já entrega valor, mas cuja combinação de alocação, retenção de buffers e acoplamento de lifetime começou a incomodar.",
      "lesson-hero",
      undefined,
      [
        "Em software real, quase nunca partimos do zero. O mais comum é encontrar um parser funcional que nasceu simples, ganhou casos especiais, passou a encaminhar mais dados e agora tem comportamento difícil de explicar: clones demais, buffers grandes presos por pequenas fatias, ou tipos owned por toda parte porque ninguém quis negociar com o borrow checker.",
        "A tentação técnica é partir direto para slogans como 'vamos fazer zero-copy' ou 'vamos trocar tudo por Bytes'. Só que isso troca um tipo de incerteza por outro. Se você não entender onde está o custo, pode terminar com uma API mais frágil e sem ganho relevante.",
        "Nesta oficina, o parser é tratado como um sistema: ele consome um buffer, produz estruturas intermediárias, cruza fronteiras e convive com filas, logs, métricas e talvez retry. É essa fotografia completa que decide o design certo.",
      ],
      [
        {
          type: "definition",
          title: "Sintoma de engenharia",
          body: "Sinal observável de que a arquitetura atual do parser já não está bem alinhada com custo, clareza ou segurança operacional.",
        },
        {
          type: "mistake",
          title: "Atacar o mecanismo antes da medição",
          body: "Substituir String por &str ou Vec<u8> por Bytes sem antes provar que clones, retenções ou alocações são parte do problema dominante.",
        },
      ],
    ),
    s(
      "medir-o-caminho",
      "Medição",
      "A primeira pergunta é onde o parser realmente paga",
      "Antes de redesenhar ownership, identifique em que pontos a pipeline materializa dados, retém buffers ou prolonga o ciclo de vida da entrada.",
      "impact-board",
      undefined,
      [
        "Num parser típico, o custo pode aparecer em lugares muito diferentes: cópia de slices para String, normalização prematura, criação de estruturas temporárias, crescimento de buffers, ou retenção de um payload inteiro só porque um campo pequeno continua referenciado.",
        "A medição útil não precisa começar com números glamourosos. Ela começa com perguntas concretas: o parser está alocando mais do que deveria? Ele segura buffers grandes por tempo demais? A fila seguinte obriga a materializar tudo mesmo quando o parse é borrowed internamente?",
        "Essa etapa existe para impedir overfit de otimização. Às vezes o trabalho caro não está no parser, mas no estágio que vem depois. Em outras, o parser é barato, mas seu desenho espalha lifetime difícil por toda a base de código.",
      ],
      [
        {
          type: "example",
          title: "Checklist mínimo de observação",
          body: "Antes de mexer no tipo de saída do parser, vale responder estas perguntas.",
          items: [
            "Quais campos são copiados sempre, mesmo quando o consumidor só lê e descarta?",
            "Há uma fila, cache ou task assíncrona obrigando o dado a viver além do buffer original?",
            "Uma pequena fatia está retendo um backing buffer muito maior?",
            "Os perfis indicam churn de alocação no parse ou em etapas posteriores?",
          ],
        },
        {
          type: "insight",
          title: "Custo de lifetime também é custo",
          body: "Mesmo quando o perfil de CPU parece aceitável, um modelo de borrow que prende o desenho inteiro do sistema pode ser o gargalo humano da manutenção.",
        },
      ],
    ),
    s(
      "unidade-de-posse",
      "Modelo mental",
      "Escolha a unidade de ownership do buffer antes de escolher a sintaxe",
      "O erro recorrente é discutir &str, &[u8] ou Bytes cedo demais, sem definir quem é o verdadeiro dono do armazenamento.",
      "concept-grid",
      undefined,
      [
        "Toda decisão boa de parsing começa por uma pergunta simples: qual é a unidade de armazenamento que realmente possui os bytes? Pode ser um Vec<u8> carregado integralmente, um buffer de socket reusado, um Bytes compartilhado ou um bloco lido de arquivo.",
        "Se essa unidade não estiver clara, o resto vira improviso. Você não sabe se a saída pode emprestar fatias diretamente, se o consumidor precisará viver além do escopo do input ou se um buffer será reaproveitado antes da hora.",
        "Ownership de parser, portanto, não é um detalhe de tipo. É uma escolha arquitetural sobre onde a responsabilidade pelo armazenamento começa, onde termina e quem pode observar cada janela do dado no meio do caminho.",
      ],
      [
        {
          type: "definition",
          title: "Unidade de ownership",
          body: "Objeto ou estrutura que realmente controla o ciclo de vida do armazenamento de onde o parser retira seus bytes.",
        },
        {
          type: "example",
          title: "Duas escolhas bem diferentes",
          body: "Um &str empresta uma janela de texto existente; um Bytes pode representar uma visão barata sobre armazenamento compartilhado; um String novo materializa conteúdo próprio.",
        },
      ],
    ),
    s(
      "borrowed-ou-owned",
      "Intervenção",
      "Parser borrowed e parser owned resolvem problemas diferentes",
      "Retornar fatias da entrada é ótimo quando o resultado morre cedo; materializar dados é melhor quando a saída precisa autonomia.",
      "pipeline-diagram",
      "pipeline-lab",
      [
        "Uma saída borrowed é sedutora porque evita cópias. Se o parser devolve &str ou &[u8], ele pode apontar diretamente para o buffer de entrada, o que economiza alocação e preserva locality. Essa abordagem brilha quando o consumo do resultado acontece logo em seguida e dentro da mesma janela de validade.",
        "Mas uma saída owned resolve outra classe de problema: ela permite que a próxima etapa viva em outro escopo, outra thread, outra fila ou outro tempo sem carregar o buffer original junto. Isso reduz o acoplamento temporal entre parsing e consumo.",
        "A alternativa madura quase sempre é híbrida. Alguns campos ficam borrowed porque são transitórios; outros viram owned porque serão persistidos, enviados, normalizados ou mantidos em memória além do parse. O design certo nasce do ciclo de vida, não da pureza ideológica.",
      ],
      [
        {
          type: "insight",
          title: "Borrow não é versão superior de own",
          body: "Borrowed e owned não formam escala moral; eles respondem a horizontes de vida útil diferentes.",
        },
        {
          type: "mistake",
          title: "Owned em todo lugar para evitar lifetime",
          body: "Isso simplifica a assinatura local, mas pode empilhar cópias em caminhos quentes que nunca precisaram de autonomia real.",
        },
      ],
    ),
    s(
      "lifetimes-como-contrato",
      "Contrato",
      "Lifetime é uma relação explícita entre entrada e saída",
      "Quando o parser devolve referências, o tipo está declarando que o resultado só é válido enquanto a entrada continuar válida.",
      "concept-grid",
      undefined,
      [
        "Lifetimes parecem abstratos até você enxergá-los como contrato semântico. Se uma estrutura ParsedFrame<'a> guarda &str vindos do buffer de entrada, ela não está dizendo 'confie em mim'; ela está dizendo 'minha validade depende desse buffer'.",
        "Esse contrato é valioso porque desloca para o tipo uma verdade que, em outras linguagens, ficaria escondida em comentários ou disciplina manual. O compilador passa a impedir que o resultado atravesse fronteiras que o buffer original não consegue sustentar.",
        "O ponto-chave é não romantizar a anotação. Lifetime não estica a vida do buffer. Se a arquitetura precisa que o dado exista depois, a solução não é inventar um lifetime mais esperto; é possuir ou compartilhar armazenamento de outro jeito.",
      ],
      [
        {
          type: "definition",
          title: "Lifetime anotado",
          body: "Relação declarada entre a validade de referências em tipos ou assinaturas, permitindo ao compilador verificar se a saída não sobrevive ao dado emprestado.",
        },
        {
          type: "mistake",
          title: "Tratar lifetime como 'gambiarra de compilador'",
          body: "Quando o lifetime dói, normalmente o problema real é que o fluxo de validade do dado ainda não foi modelado com clareza.",
        },
      ],
    ),
    s(
      "complete-vs-streaming",
      "Fluxo",
      "Input completo e input em streaming pedem desenhos diferentes",
      "Um parser sobre arquivo inteiro e um parser sobre bytes chegando em partes têm trade-offs bem distintos de ownership e buffering.",
      "pipeline-diagram",
      undefined,
      [
        "Quando toda a entrada está em memória, devolver fatias borrowed costuma ser mais natural. O buffer-base é estável, o parser trabalha sobre um conjunto fechado de bytes e a validade do resultado é mais fácil de raciocinar.",
        "Já em streaming, o buffer pode crescer, ser compactado, ser refillado ou ser reaproveitado à medida que novos dados chegam. Nessa situação, zero-copy continua possível, mas o desenho exige muito mais cuidado: o parser precisa distinguir o que ainda depende do trecho atual e o que precisa ser materializado antes do próximo refill.",
        "É por isso que bibliotecas como nom explicitam a diferença entre parsing complete e streaming. A pergunta não é só 'eu consigo parsear?'; é 'o contrato continua correto quando a entrada chega em pedaços e o buffer muda de fase?'.",
      ],
      [
        {
          type: "example",
          title: "Por que Incomplete importa",
          body: "No modo streaming, um parser sério precisa poder dizer que ainda não há bytes suficientes para decidir, em vez de fingir sucesso ou falha definitiva cedo demais.",
        },
        {
          type: "insight",
          title: "Streaming aumenta o preço da semântica",
          body: "Quanto mais o buffer muda com o tempo, mais cara fica a decisão de manter saídas borrowed por longos trechos do pipeline.",
        },
      ],
    ),
    s(
      "zero-copy-ajuda",
      "Trade-off",
      "Zero-copy ajuda quando o parse é quente e o consumo é curto",
      "A técnica costuma pagar bem quando você extrai campos e decide rápido, sem carregar o payload original por muito tempo depois.",
      "tradeoff-spectrum",
      "tradeoff-lab",
      [
        "Zero-copy tem um caso de uso muito forte em caminhos quentes de parse e decisão: ler cabeçalhos, validar prefixos, extrair fatias de interesse e escolher o próximo passo sem materializar strings ou buffers inteiros desnecessariamente.",
        "Nesses cenários, o ganho não vem de uma mágica universal. Ele vem de evitar churn de alocação, tráfego de memória e cópias que só existiam porque a API pedia ownership cedo demais.",
        "O benefício cresce quando a janela de validade é curta e a semântica da etapa seguinte continua compatível com borrowing. A resposta madura não é 'sempre zero-copy', mas 'zero-copy enquanto o contrato continuar barato e claro'.",
      ],
      [
        {
          type: "definition",
          title: "Zero-copy útil",
          body: "Uso de referências ou handles sobre armazenamento existente quando isso reduz custo real sem comprometer a clareza das fronteiras do sistema.",
        },
        {
          type: "example",
          title: "Caso típico",
          body: "Parser de cabeçalhos, rotas ou tokens cujo resultado é consumido imediatamente na mesma etapa de decisão.",
        },
      ],
    ),
    s(
      "zero-copy-atrapalha",
      "Contraexemplo",
      "Zero-copy atrapalha quando a economia local espalha acoplamento pelo sistema",
      "Pequenas vitórias de alocação podem custar caro se obrigarem filas, caches e tasks a carregar o buffer original inteiro.",
      "impact-board",
      undefined,
      [
        "O lado perigoso do zero-copy é sua sedução local. Uma API pode parecer elegante ao devolver só fatias emprestadas, mas talvez isso obrigue componentes seguintes a manter o payload original vivo por tempo demais. Nesse caso, o ganho local vira retenção, acoplamento e custo organizacional.",
        "Outro problema comum é a fronteira assíncrona. Se o resultado do parse entra numa fila, num executor ou num cache, o borrow passa a disputar com o tempo do sistema. Manter tudo borrowed pode virar um desenho rígido demais para evolução, observabilidade e tratamento de falhas.",
        "É aqui que entram saídas híbridas e tipos como Cow ou handles compartilhados. Eles permitem preservar zero-copy em trajetos curtos e materializar apenas onde a autonomia passa a valer mais do que a economia de bytes.",
      ],
      [
        {
          type: "mistake",
          title: "Reter um buffer enorme por causa de um campo minúsculo",
          body: "O parser economiza uma cópia, mas o processo inteiro paga footprint e lifetime desnecessários.",
        },
        {
          type: "insight",
          title: "Custo de clareza importa",
          body: "Uma otimização só é boa se o time conseguir explicar com segurança quem ainda depende daquele buffer e por quê.",
        },
      ],
    ),
    s(
      "fronteiras-seguras",
      "Arquitetura",
      "A fronteira segura costuma separar borrowing interno de ownership externo",
      "Muitas arquiteturas ficam melhores quando o parser usa borrows por dentro, mas entrega resultados próprios ao cruzar camadas duradouras.",
      undefined,
      "scenario-lab",
      [
        "Uma regra prática forte é usar borrowing o mais perto possível da entrada e adotar ownership ou compartilhamento explícito ao cruzar fronteiras mais longas. Isso preserva desempenho dentro da janela quente sem infectar o restante do sistema com lifetimes onipresentes.",
        "Em alguns casos, a fronteira segura é uma cópia seletiva: apenas os campos que seguirão para log, fila, banco ou cache são materializados. Em outros, um buffer compartilhado como Bytes permite que múltiplos consumidores observem o mesmo armazenamento sem prender tudo a uma referência lexical.",
        "A questão central é tornar a política visível. O código deve responder facilmente: o que ainda depende do buffer original, o que já é autônomo e em que ponto essa transição acontece.",
      ],
      [
        {
          type: "example",
          title: "Fronteira idiomática",
          body: "Parser devolve campos borrowed para validação imediata, e um construtor posterior decide quais partes precisam virar String, Vec<u8> ou Bytes para sobreviver depois.",
        },
        {
          type: "definition",
          title: "Boundary safe",
          body: "Ponto em que a API deixa explícito se a próxima camada ainda depende do buffer original ou já possui seus próprios dados.",
        },
      ],
    ),
    s(
      "roteiro-da-oficina",
      "Síntese",
      "O workshop termina com uma hipótese verificável, não com um dogma",
      "A meta é sair com um desenho de parser defendável: o que será medido, o que será refatorado e quais fronteiras continuarão borrowed ou owned.",
      "pipeline-diagram",
      undefined,
      [
        "Se você chegou até aqui, a pergunta final não é 'qual técnica é a mais sofisticada?', mas 'qual arranjo reduz o risco dominante do meu parser?'. Às vezes a resposta será mais zero-copy; às vezes será ownership antecipada numa fronteira específica; e às vezes será descobrir que o custo real nem estava no parser.",
        "A oficina madura termina com uma hipótese verificável. Exemplo: 'separar parsing borrowed do estágio de persistência owned deve reduzir churn de alocação sem prender buffers no restante da pipeline'. Isso é muito melhor do que um objetivo nebuloso como 'deixar mais idiomático'.",
        "O ganho mais profundo deste capstone é mental. Você passa a tratar ownership como parte do desenho do sistema, não como uma trava de sintaxe. Parser bom em Rust nasce dessa clareza.",
      ],
      [
        {
          type: "example",
          title: "Sequência saudável",
          body: "Medir -> localizar cópias ou retenções -> escolher fronteira -> refatorar um trecho pequeno -> verificar se a hipótese se confirmou.",
        },
        {
          type: "mistake",
          title: "Reescrever tudo de uma vez",
          body: "Ownership ruim quase nunca melhora com refactor massivo sem checkpoints; ele melhora com experimentos pequenos e hipóteses nítidas.",
        },
      ],
    ),
    s(
      "quiz-revisao",
      "Revisão",
      "Quiz de revisão",
      "Teste se você consegue decidir entre borrow, own, streaming, zero-copy e fronteiras seguras sem cair em slogans.",
      undefined,
      "quiz",
      [
        "A meta aqui é raciocínio de projeto: em que contexto uma técnica faz sentido e qual risco ela empurra para frente.",
      ],
      [],
    ),
    s(
      "glossario",
      "Vocabulário",
      "Glossário essencial",
      "Consolide os termos que realmente aparecem quando você projeta parsers e buffers em Rust no mundo real.",
      undefined,
      "glossary",
      [
        "Se esses termos estiverem claros, discutir API, lifetime e zero-copy fica muito menos nebuloso.",
      ],
      [],
    ),
  ],
  summaryCards: [
    {
      title: "Meça antes de redesenhar",
      body: "O primeiro trabalho é descobrir onde o parser está pagando em cópias, retenção ou acoplamento.",
    },
    {
      title: "Escolha a dona do buffer",
      body: "Ownership do armazenamento é a base de qualquer decisão posterior sobre borrow ou materialização.",
    },
    {
      title: "Borrowed e owned resolvem horizontes diferentes",
      body: "Borrow é ótimo para consumo curto; own é melhor quando a saída precisa autonomia.",
    },
    {
      title: "Lifetime descreve dependência",
      body: "Ele torna explícita a validade das referências, mas não alonga a vida do buffer.",
    },
    {
      title: "Zero-copy vale quando o contrato continua barato",
      body: "Se a economia local espalha acoplamento pelo sistema, a técnica perdeu valor.",
    },
    {
      title: "Fronteira segura pode copiar seletivamente",
      body: "Muitas pipelines ficam melhores ao manter borrowing interno e ownership ao cruzar camadas duradouras.",
    },
  ],
  quiz: [
    q(
      "q1",
      "Um parser lê um payload, extrai um cabeçalho e decide a rota imediatamente, sem guardar o resultado depois. Qual opção tende a ser mais natural como ponto de partida?",
      "Devolver fatias borrowed como &[u8] ou &str enquanto o buffer original continua vivo na mesma etapa.",
      "Materializar todos os campos em String logo na entrada, para evitar qualquer conversa sobre lifetime.",
      "Clonar o payload inteiro a cada função para manter liberdade máxima.",
      "a",
      "Se o consumo é curto e na mesma janela de validade, borrowing costuma preservar clareza e evitar cópias desnecessárias.",
    ),
    q(
      "q2",
      "Quando o lifetime em um tipo de saída começa a doer, qual interpretação costuma ser mais produtiva?",
      "É um sinal de que a relação entre validade da saída e ciclo de vida do buffer ainda precisa ficar mais explícita.",
      "Basta trocar o nome do lifetime por outro mais descritivo que o problema some.",
      "O compilador está sendo excessivamente conservador e a saída deveria ser forçada a compilar.",
      "a",
      "Na maior parte dos casos, o atrito revela um contrato temporal mal modelado, não apenas um detalhe cosmético da assinatura.",
    ),
    q(
      "q3",
      "Qual situação favorece mais uma saída owned do parser?",
      "Quando o resultado precisa entrar numa fila assíncrona e sobreviver além do buffer original.",
      "Quando a próxima etapa só lê o dado imediatamente e o descarta.",
      "Quando o parser quer parecer mais simples em uma função isolada.",
      "a",
      "Ao cruzar fronteiras assíncronas ou duradouras, autonomia do dado costuma valer mais do que a economia de uma cópia local.",
    ),
    q(
      "q4",
      "No contexto de parsing em streaming, por que a distinção entre complete e streaming importa?",
      "Porque um parser streaming precisa lidar com buffers incompletos ou refilados sem fingir que a decisão já é definitiva.",
      "Porque complete e streaming têm exatamente a mesma semântica, mudando só o nome dos módulos.",
      "Porque streaming elimina a necessidade de ownership do buffer.",
      "a",
      "Quando a entrada chega em partes, o contrato precisa incorporar insuficiência temporária de dados e mudanças no buffer.",
    ),
    q(
      "q5",
      "Qual é um risco clássico do zero-copy mal encaixado?",
      "Uma pequena view manter vivo um backing buffer muito maior por tempo demais.",
      "O compilador passar a inserir garbage collector silenciosamente.",
      "O parser perder a capacidade de detectar erros sintáticos.",
      "a",
      "A economia da cópia local pode virar retenção global se o armazenamento-base continuar preso sem necessidade.",
    ),
    q(
      "q6",
      "Quando um tipo como Cow costuma fazer sentido em uma saída de parser?",
      "Quando alguns campos podem ser emprestados na maioria dos casos, mas certos cenários exigem materialização ou normalização.",
      "Quando você quer evitar qualquer decisão sobre posse e lifetime.",
      "Quando o parser precisa obrigatoriamente ser streaming.",
      "a",
      "Cow é útil justamente para expressar uma fronteira híbrida entre borrow e own sem pagar cópia sempre.",
    ),
    q(
      "q7",
      "Qual fronteira é frequentemente uma boa candidata para transformar dados borrowed em owned?",
      "A transição para cache, fila, persistência ou tasks que não compartilham a mesma janela de validade do input.",
      "O primeiro if dentro do parser, para evitar raciocínio mais profundo.",
      "Qualquer função pequena, mesmo sem custo observado.",
      "a",
      "Essas camadas costumam exigir autonomia temporal do dado e tornam ownership explícita uma escolha saudável.",
    ),
    q(
      "q8",
      "Qual frase resume melhor a atitude correta neste capstone?",
      "Emprestar enquanto o contrato é curto e claro; possuir ou compartilhar explicitamente quando a fronteira do sistema pede autonomia.",
      "Evitar toda cópia possível, mesmo que o desenho fique difícil de manter.",
      "Materializar tudo cedo, porque lifetime sempre atrapalha arquitetura séria.",
      "a",
      "A decisão madura combina eficiência com fronteiras compreensíveis e verificáveis.",
    ),
  ],
  glossary: [
    g("Buffer", "Região de armazenamento que contém os bytes sobre os quais o parser trabalha."),
    g("Ownership", "Responsabilidade pelo ciclo de vida do armazenamento e pela validade do acesso a ele."),
    g("Borrowing", "Uso temporário de um dado sem assumir sua posse."),
    g("Lifetime", "Relação de validade entre uma referência e o dado ao qual ela aponta."),
    g("Zero-copy", "Estratégia de reutilizar armazenamento existente em vez de materializar cópias desnecessárias."),
    g("Backing buffer", "Armazenamento real que sustenta fatias, views ou handles derivados."),
    g("Streaming parser", "Parser desenhado para lidar com entrada parcial, incompleta ou recebida em blocos."),
    g("Complete parser", "Parser que assume ter a entrada completa disponível no momento da análise."),
    g("Retenção", "Situação em que um buffer permanece vivo mais tempo do que o necessário."),
    g("Materialização", "Ato de criar dados próprios, como String ou Vec<u8>, a partir de conteúdo antes emprestado."),
    g("Cow", "Tipo da biblioteca padrão que pode carregar dado emprestado ou próprio conforme a necessidade."),
    g("Bytes", "Handle compartilhável e barato de clonar para regiões contíguas de memória, muito usado em networking."),
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
