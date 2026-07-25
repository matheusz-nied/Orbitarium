import type {
  GlossaryTerm,
  LessonBlock,
  LessonBlockType,
  LessonContent,
  LessonReference,
  QuizQuestion,
} from "../../../types/content";

function ref(title: string, source: string, url: string, note: string): LessonReference {
  return { title, source, url, note };
}

function block(
  type: LessonBlockType,
  title: string,
  body: string,
  items?: string[],
): LessonBlock {
  return { type, title, body, items };
}

function section(
  id: string,
  eyebrow: string,
  title: string,
  lead: string,
  paragraphs: string[],
  options?: {
    visual?: string;
    interactive?: string;
    blocks?: LessonBlock[];
  },
) {
  return {
    id,
    eyebrow,
    title,
    lead,
    paragraphs,
    visual: options?.visual,
    interactive: options?.interactive,
    blocks: options?.blocks,
  };
}

function quiz(
  id: string,
  prompt: string,
  options: [string, string, string],
  correctOptionId: "a" | "b" | "c",
  feedback: string,
): QuizQuestion {
  return {
    id,
    prompt,
    options: [
      { id: "a", label: options[0] },
      { id: "b", label: options[1] },
      { id: "c", label: options[2] },
    ],
    correctOptionId,
    feedback,
  };
}

function glossary(term: string, definition: string): GlossaryTerm {
  return { term, definition };
}

export const consistenciaDeMemoriaEOrderingContent: LessonContent = {
  id: "consistencia-de-memoria-e-ordering",
  title: "Consistencia de Memoria e Ordering",
  subtitle:
    "O que diferentes threads podem observar umas das outras, e por que atomics e sincronizacao existem para tornar essa ordem explicita.",
  description:
    "Uma aula avancada sobre reordering, happens-before, acquire/release, DRF-SC, modelos de linguagem versus hardware e criterios para escolher mutex, atomics ou fences.",
  primaryCategoryId: "computacao",
  secondaryCategoryId: "engenharia",
  level: "Avançado",
  estimatedTime: "50-65 min",
  tags: [
    "Memory Model",
    "Atomics",
    "Ordering",
    "Happens-Before",
    "Acquire Release",
    "Concurrency",
  ],
  learningObjectives: [
    "Entender por que ordem no codigo fonte nao e a mesma coisa que ordem observada entre threads.",
    "Distinguir consistencia sequencial, ordens mais relaxadas e a ideia de DRF-SC.",
    "Usar happens-before como lente para raciocinar sobre visibilidade correta.",
    "Escolher entre mutex, atomics e fences de forma conservadora e justificada.",
    "Evitar mitos como 'volatile resolve', 'atomic sempre substitui lock' e 'modelo da linguagem e igual ao hardware'.",
  ],
  prerequisites: [
    "As aulas `processos-threads-concorrencia` e `concorrencia-baixo-nivel` ajudam a reconhecer o vocabulário basico.",
    "Ter visto `lock-free-com-cuidado` ou `rust-concurrency-send-sync` facilita conectar ordering com seguranca de API.",
    "Nao e necessario programar em C++ ou Rust diariamente; o foco aqui e construir modelo mental seguro.",
  ],
  references: [
    ref(
      "The Go Memory Model",
      "Go Documentation",
      "https://go.dev/ref/mem",
      "Documento oficial que apresenta happens-before e a garantia DRF-SC para programas sem data races.",
    ),
    ref(
      "std::sync::atomic",
      "Rust Standard Library",
      "https://doc.rust-lang.org/stable/std/sync/atomic/",
      "Documentacao oficial de atomics em Rust, com observacoes sobre happens-before e semantica de acesso.",
    ),
    ref(
      "Ordering in std::sync::atomic",
      "Rust Standard Library",
      "https://doc.rust-lang.org/stable/std/sync/atomic/enum.Ordering.html",
      "Descricao oficial das ordens Relaxed, Release, Acquire, AcqRel e SeqCst.",
    ),
    ref(
      "Atomics",
      "The Rustonomicon",
      "https://doc.rust-lang.org/stable/nomicon/atomics.html",
      "Explica de forma direta como os orderings limitam reordenacao no compilador e no hardware.",
    ),
    ref(
      "std::memory_order",
      "cppreference",
      "https://en.cppreference.com/cpp/atomic/memory_order",
      "Referencia educacional amplamente usada para o modelo de memoria de C++.",
    ),
    ref(
      "Linux kernel memory barriers",
      "Linux Kernel Documentation",
      "https://docs.kernel.org/core-api/wrappers/memory-barriers.html",
      "Mostra como pensar em barreiras e ordering sem confundir compilador, CPU e observacao externa.",
    ),
    ref(
      "Foundations of the C++ Concurrency Memory Model",
      "PLDI 2008",
      "http://rsim.cs.uiuc.edu/Pubs/08PLDI.pdf",
      "Papel classico de Boehm e Adve por tras da intuicao de DRF-SC e happens-before.",
    ),
    ref(
      "The Art of Multiprocessor Programming",
      "Elsevier / Morgan Kaufmann",
      "https://shop.elsevier.com/books/the-art-of-multiprocessor-programming/herlihy/978-0-12-415950-1",
      "Referencia ampla para conceitos de programacao multiprocessada, locks, atomics e estruturas concorrentes.",
    ),
  ],
  heroVisual: "memory-ordering-hero",
  openingText:
    "Em um programa concorrente, ver a mesma variavel nao significa ver o mesmo mundo. Uma thread pode observar a flag pronta sem observar ainda todos os dados que deveriam ter sido publicados junto com ela. Consistencia de memoria existe para formalizar exatamente quais ordens de leitura e escrita sao permitidas, e ordering existe para transformar esse contrato em algo explicitamente programavel.",
  quickFacts: [
    {
      title: "Pergunta central",
      body: "qual relacao faz uma thread ter o direito de observar os efeitos da outra?",
    },
    {
      title: "Ferramenta mental",
      body: "happens-before: uma borda de ordem e visibilidade que precisa ser provada, nao presumida",
    },
    {
      title: "Regra de prudencia",
      body: "se um estado composto precisa de invariantes fortes, comece por mutex ou sincronizacao de mais alto nivel",
    },
  ],
  sections: [
    section(
      "ilusao-da-memoria-unica",
      "Ilusao",
      "Memoria compartilhada nao e uma linha do tempo unica",
      "A maior armadilha de quem comeca em concorrencia de baixo nivel e imaginar que todas as threads observam a memoria na ordem do codigo fonte.",
      [
        "Compiladores e hardwares modernos reorganizam e amortizam trabalho o tempo todo. Em um unico core isso frequentemente e invisivel, porque a execucao precisa preservar o comportamento observavel da thread. Quando varias threads entram em cena, porem, a pergunta muda: que observacoes cruzadas ainda sao garantidas?",
        "Essa e a funcao do memory model de uma linguagem: definir quais execucoes e observacoes contam como validas para um programa concorrente. Ele nao descreve toda a microarquitetura, mas estabelece um contrato sobre o que o programador pode assumir ao escrever sincronizacao.",
        "Por isso, consistencia de memoria nao e assunto so de HPC ou lock-free exotico. Ela aparece sempre que um estado produzido em uma thread precisa ser consumido corretamente por outra.",
      ],
      {
        visual: "memory-ordering-hero",
        blocks: [
          block(
            "definition",
            "Consistencia de memoria",
            "Conjunto de regras que define quais ordens de leitura e escrita podem ser observadas entre agentes concorrentes.",
          ),
          block(
            "mistake",
            "Erro comum",
            "Assumir que a ordem do codigo fonte e automaticamente a ordem de visibilidade entre threads.",
          ),
        ],
      },
    ),
    section(
      "reordering-sem-drama",
      "Reordering",
      "Reordenacao e sobre observacao, nao sobre magia",
      "Quando se fala em reordering, muita gente imagina uma CPU caotica. O ponto mais importante, no entanto, e mais simples: duas threads podem observar efeitos em ordens diferentes se nenhum contrato de sincronizacao impedir isso.",
      [
        "A documentacao de Rust e de C++ trata ordering como restricoes sobre como acessos atomicos sincronizam memoria e como acessos comuns ao redor deles podem ser observados. O modelo do kernel Linux tambem insiste em separar barreiras de compilador, barreiras de CPU e o que outros cores realmente podem perceber.",
        "Em termos didaticos, pense em dois problemas frequentes. No primeiro, uma thread publica um payload e depois sinaliza 'pronto'; outra le o sinal e espera que o payload esteja visivel. No segundo, duas threads escrevem e leem variaveis diferentes, produzindo resultados que parecem impossiveis em uma visao estritamente sequencial.",
        "A interacao a seguir usa esses dois formatos como simuladores conceituais, sem recorrer a codigo perigoso. O objetivo e aprender a dizer 'esse resultado e permitido' ou 'essa observacao foi bloqueada pela sincronizacao certa'.",
      ],
      {
        interactive: "reorder-simulator",
        blocks: [
          block(
            "example",
            "Exemplo classico",
            "Uma ready flag pode chegar ao observador antes que todos os dados associados a ela tenham se tornado visiveis, se a publicacao nao criar a borda correta de sincronizacao.",
          ),
        ],
      },
    ),
    section(
      "sc-vs-relaxado",
      "Modelos",
      "SC e modelos relaxados sao promessas diferentes",
      "Consistencia sequencial e uma abstracao forte: os efeitos parecem se encaixar em uma unica ordem global compativel com a ordem de cada thread.",
      [
        "Essa abstracao e excelente para raciocinar, mas nem toda operacao precisa pagar por ela o tempo todo. Por isso linguagens e bibliotecas expoem ordens mais fracas, como Relaxed, Acquire, Release e AcqRel. Elas trocam generalidade por custo e flexibilidade.",
        "O ponto crucial e nao confundir 'mais fraco' com 'errado'. Relaxed ainda preserva atomicidade da operacao. O que ele nao faz e publicar ou adquirir arbitrariamente o resto do estado. Ja Acquire e Release foram desenhados justamente para expressar a ideia de publicar um estado e consumi-lo depois com visibilidade correta.",
        "Em Go, o documento oficial formula a garantia DRF-SC: programas sem data races so podem ter resultados explicaveis por algum interleaving sequencialmente consistente das goroutines. Isso e uma ancora mental poderosa para saber o que acontece quando voce sai da zona segura.",
      ],
      {
        visual: "ordering-spectrum",
        blocks: [
          block(
            "insight",
            "DRF-SC em palavras",
            "Se o programa e livre de data races, a linguagem pode oferecer a tranquilidade de raciocinar como se houvesse um interleaving sequencial coerente.",
          ),
        ],
      },
    ),
    section(
      "happens-before",
      "Lente",
      "Happens-before e a pergunta que voce precisa saber responder",
      "Ao depurar ou revisar codigo concorrente, a pergunta madura nao e 'parece funcionar?'. E 'qual relacao faz esta leitura ter o direito de ver aqueles efeitos?'",
      [
        "Happens-before combina ordem local da thread com sincronizacao entre threads. Mutex unlock seguido de mutex lock, envio e recebimento em canais, join de thread e pares release-acquire sao exemplos de bordas que podem estabelecer essa relacao em modelos diferentes.",
        "Quando voce nao consegue apontar a borda de happens-before que protege uma leitura importante, seu sistema esta funcionando por sorte, por arquitetura especifica ou por teste insuficiente. Nenhum dos tres substitui o contrato correto.",
        "Esse vocabulário tambem conecta a aula atual a `concorrencia-baixo-nivel` e a `rust-concurrency-send-sync`: o problema nunca foi apenas 'paralelizar', e sim provar visibilidade segura sob interleavings validos.",
      ],
      {
        visual: "happens-before-map",
        blocks: [
          block(
            "definition",
            "Happens-before",
            "Relacao de ordem e visibilidade formada por sequenciamento local e por operacoes de sincronizacao compativeis entre threads.",
          ),
        ],
      },
    ),
    section(
      "atomics-como-contrato",
      "Atomics",
      "Atomic nao quer dizer automaticamente sincronizado do jeito certo",
      "Uma operacao atomica garante indivisibilidade sobre aquele objeto, mas a visibilidade do resto do estado depende do ordering usado e da relacao formada com outras operacoes.",
      [
        "A documentacao de Rust deixa isso explicito: os orderings definem como a operacao interage com happens-before. Relaxed preserva atomicidade, mas nao cria por si so uma promessa geral sobre outros dados. Release publica efeitos anteriores; Acquire consome esses efeitos quando observa o valor publicado.",
        "Essa distinção importa porque muitos bugs reais usam atomics corretamente do ponto de vista de indivisibilidade e incorretamente do ponto de vista de publicacao. O contador esta certo, a flag muda de valor, mas o estado ao redor continua incoerente.",
        "Em outras palavras, atomics sao contrato, nao amuleto. Use-os quando a semantica que voce precisa pode ser expressa por esse contrato. Caso contrario, a estrutura de sincronizacao de nivel mais alto continua sendo a ferramenta certa.",
      ],
      {
        visual: "publish-observe-board",
        blocks: [
          block(
            "insight",
            "Atomics nao sao 'mutex mais rapido'",
            "Eles resolvem uma classe diferente de problema e exigem prova de ordering muito mais explicita.",
          ),
        ],
      },
    ),
    section(
      "acquire-release",
      "Acquire / Release",
      "Publicar e consumir e uma historia mais util do que decorar nomes",
      "Acquire e Release fazem mais sentido quando voce pensa em publicacao de um estado e consumo desse estado por outra thread.",
      [
        "A thread produtora prepara dados locais e depois faz uma operacao de publicacao com semantica Release. A thread consumidora observa esse sinal com Acquire. Quando a leitura realmente enxerga o valor publicado, ela adquire o direito de observar os efeitos que foram colocados antes do Release correspondente.",
        "Isso e uma narrativa melhor do que decorar tabelas, porque expõe a pergunta correta: qual valor observado liga produtor e consumidor? Se essa ligacao nao existe, o ordering mais forte em outra variavel pode nao resolver o que voce pensa que resolve.",
        "Ainda assim, acquire/release nao e a resposta para tudo. Quando varios campos e invariantes precisam andar juntos, um mutex, um canal, uma fila pronta da biblioteca ou outro primitivo de mais alto nivel costuma ser a primeira opcao segura.",
      ],
      {
        visual: "publish-observe-board",
        blocks: [
          block(
            "example",
            "Ready flag seguro em abstracao",
            "Primeiro o produtor termina o payload; depois publica o sinal. O consumidor so usa o payload depois de observar o sinal com a borda correta de sincronizacao.",
          ),
        ],
      },
    ),
    section(
      "mutex-quando-ja-resolve",
      "Prudencia",
      "Mutex e sincronizacao de mais alto nivel resolvem muito mais do que parece",
      "Uma das manias mais caras em systems code e pular cedo demais para atomics em cenarios que pedem invariantes compostas, ownership claro e revisao simples.",
      [
        "Locks, canais e primitivas de biblioteca embutem bordas de happens-before cuja semantica e mais direta de revisar. O documento do kernel Linux lembra inclusive que adquirir e liberar lock traz expectativas de memoria claras para implementacoes corretas.",
        "Isso nao torna atomics obsoletos. Contadores, sinais de estado simples, algoritmos especializados e primitivas internas frequentemente precisam deles. O ponto e nao fazer downgrade da abstracao antes de provar que vale a pena.",
        "Uma boa heuristica: se voce precisa manter varios campos coerentes juntos ou explicar a solucao com muitas excecoes, reavalie se o mutex nao ja resolve com custo cognitivo bem menor.",
      ],
      {
        visual: "sync-choice-board",
        blocks: [
          block(
            "mistake",
            "Atalho perigoso",
            "Escolher atomic porque parece mais leve, mesmo quando o problema real e manter um estado composto e facil de revisar.",
          ),
        ],
      },
    ),
    section(
      "fence-chooser",
      "Escolhas",
      "Que tipo de sincronizacao este cenario realmente pede?",
      "A melhor forma de aprender ordering e parar de pensar em palavras isoladas e comecar a encaixa-las em cenarios.",
      [
        "Na interacao abaixo, voce vai comparar casos em que Relaxed basta, casos em que publicacao por Acquire/Release faz sentido, e casos em que a escolha madura e simplesmente usar mutex, canal ou outro primitivo estruturado.",
        "A meta nao e formar reflexo de micro-otimizacao. A meta e formar julgamento sobre o grau de contrato exigido por cada leitura importante.",
        "Se a resposta mais segura for uma abstracao mais alta, isso nao e 'desperdicio'. E engenharia prudente.",
      ],
      {
        interactive: "fence-chooser",
      },
    ),
    section(
      "bug-autopsy",
      "Autopsia",
      "Quando o sintoma parece aleatorio, a causa costuma ser conceitual",
      "Bugs de ordering raramente aparecem como uma falha limpa e reproduzivel. Eles surgem como sintomas plausiveis que apontam para garantias mal formuladas.",
      [
        "Flag verdadeira com payload velho, contador certo mas estado lateral incoerente, comportamento que some em debug e reaparece em producao: tudo isso pede uma autopsia guiada por happens-before, nao apenas testes repetidos.",
        "A interacao abaixo ajuda a diferenciar tres familias de causa. Em alguns casos faltou sincronizacao; em outros, a sincronizacao foi aplicada ao lugar errado; em outros, o bug nem e ordering, mas sim logica, vida util, ownership ou protocolo.",
        "Essa disciplina e particularmente importante para nao transformar qualquer concorrencia rara em 'precisa de SeqCst' por reflexo. Ordem mais forte sem modelo certo so mascara a investigacao.",
      ],
      {
        interactive: "bug-autopsy",
        blocks: [
          block(
            "insight",
            "Sintoma nao e diagnostico",
            "Dois bugs podem parecer iguais no dashboard e nascerem de familias completamente diferentes de erro.",
          ),
        ],
      },
    ),
    section(
      "cuidados-e-limites",
      "Cuidados",
      "Modelo da linguagem nao e diagrama completo do hardware",
      "Uma aula de ordering fica perigosa quando mistura sem aviso regras da linguagem, comportamento de CPU especifica e conselhos casuais de lock-free.",
      [
        "C++, Rust e Go definem contratos de linguagem. Esses contratos precisam ser implementados sobre hardwares com caracteristicas diferentes. Por isso, o modelo da linguagem nao e um diagrama fiel de store buffers, filas internas e todos os detalhes microarquiteturais. Ele e a interface confiavel sobre a qual seu programa pode raciocinar.",
        "O mesmo cuidado vale para `volatile`. Em muitas linguagens, volatile nao substitui sincronizacao para compartilhamento entre threads. Ele pode impedir certas otimizacoes ou ter usos de I/O mapeado em memoria, mas nao e passe livre para ordenar publicacao de estado concorrente.",
        "O resultado pratico e simples: faça claims fortes apenas quando conseguir apontar a fonte e a borda de sincronizacao correspondente. Sem isso, o design fica acoplado a sorte, arquitetura ou detalhe nao-portavel.",
      ],
      {
        visual: "boundary-map",
        blocks: [
          block(
            "mistake",
            "Mito perigoso",
            "Confundir atomicidade com publicacao, ou tratar volatile como substituto geral para ordering entre threads.",
          ),
        ],
      },
    ),
    section(
      "resumo-operacional",
      "Resumo",
      "Checklist mental para systems code",
      "Se voce tiver pouco tempo em uma revisao, alguns filtros mentais ja evitam boa parte dos bugs graves.",
      [
        "Primeiro: qual leitura importa? Segundo: qual borda de happens-before a protege? Terceiro: esse estado e simples o bastante para atomics ou merece mutex / canal / ownership mais forte? Quarto: o modelo invocado e da linguagem ou e uma intuicao vaga sobre hardware?",
        "Essa sequencia dialoga bem com `lock-free-com-cuidado`: lock-free so vale quando o contrato e claro, o beneficio e real e o time consegue revisar e testar a estrutura sem folclore. Caso contrario, a complexidade vira debito.",
        "Se a aula funcionar, voce sai com menos receitas e com mais perguntas boas. Em concorrencia de baixo nivel, isso vale ouro.",
      ],
      {
        blocks: [
          block(
            "definition",
            "Regra de bolso",
            "Aponte a borda de happens-before de cada leitura importante antes de assumir que a visibilidade esta resolvida.",
          ),
        ],
      },
    ),
    section(
      "quiz-revisao",
      "Revisao",
      "Quiz de revisao",
      "Use o quiz para testar se seu raciocinio diferencia atomicidade, ordering, publicacao e escolha de abstracao.",
      [
        "As perguntas foram feitas para cenarios concretos, nao para memorizacao de siglas.",
      ],
      {
        interactive: "quiz",
      },
    ),
    section(
      "glossario",
      "Glossario",
      "Vocabulário para seguir estudando modelos de memoria",
      "Feche a aula consolidando termos que reaparecem em documentacao oficial, papers e revisoes de codigo.",
      [
        "Dominar o vocabulario ajuda a identificar quando uma afirmacao esta amparada por um contrato real e quando e apenas mitologia operacional.",
      ],
      {
        interactive: "glossary",
      },
    ),
  ],
  summaryCards: [
    {
      title: "Pergunta certa",
      body: "qual borda de happens-before faz esta leitura ter o direito de ver aqueles efeitos?",
    },
    {
      title: "Nao confunda",
      body: "atomicidade do objeto com publicacao correta do estado ao redor dele",
    },
    {
      title: "Regra pratica",
      body: "para invariantes compostas, comece por sincronizacao de nivel mais alto",
    },
    {
      title: "Fronteira importante",
      body: "modelo da linguagem e contrato; hardware e mecanismo de implementacao desse contrato",
    },
  ],
  quiz: [
    quiz(
      "q1",
      "Uma thread publica dados em memoria comum e depois seta uma flag. Outra thread observa a flag e usa os dados. Qual propriedade voce precisa provar?",
      [
        "Que existe uma borda de sincronizacao que ligue a publicacao da flag a observacao dela, tornando os dados visiveis ao consumidor.",
        "Que a flag e uma variavel booleana, o que por si so garante ordenacao do payload.",
        "Que as threads rodam no mesmo socket fisico, o que elimina o problema.",
      ],
      "a",
      "A pergunta central e qual relacao de happens-before torna o payload visivel quando a flag e observada. O tipo da flag ou a topologia sozinhos nao substituem esse contrato.",
    ),
    quiz(
      "q2",
      "O que Relaxed garante em um atomic?",
      [
        "Atomicidade da operacao naquele objeto, sem uma promessa geral de publicacao do restante do estado.",
        "As mesmas garantias de um mutex, so que com menos custo.",
        "Uma ordem global unica observada por todas as threads.",
      ],
      "a",
      "Relaxed ainda e atomic, mas nao cria sozinho a relacao de sincronizacao geral que publicaria o resto do estado.",
    ),
    quiz(
      "q3",
      "Quando Acquire e Release fazem mais sentido conceitualmente?",
      [
        "Quando voce tem uma historia clara de publicar um estado e depois consumi-lo ao observar o valor publicado.",
        "Quando quer substituir qualquer estrutura de sincronizacao composta por uma unica flag.",
        "Quando precisa de um substituto universal para protocolo e ownership.",
      ],
      "a",
      "Acquire/Release brilham quando ha publicacao e consumo bem definidos. Eles nao sao atalho universal para problemas mais ricos de consistencia.",
    ),
    quiz(
      "q4",
      "Qual afirmacao resume melhor DRF-SC no contexto de Go?",
      [
        "Programas sem data races podem ser entendidos como se houvesse um interleaving sequencialmente consistente das goroutines.",
        "Todo programa Go e sequencialmente consistente mesmo com data races.",
        "Somente programas que usam atomics sao validos.",
      ],
      "a",
      "O documento oficial do Go destaca precisamente essa ancora: ausencia de data race permite raciocinar como se houvesse um interleaving sequencial coerente.",
    ),
    quiz(
      "q5",
      "Em que situacao um mutex costuma ser uma aposta melhor do que um conjunto de atomics soltos?",
      [
        "Quando varios campos e invariantes precisam permanecer coerentes juntos e a revisao da prova de ordering ficaria complexa demais.",
        "Quando voce quer aprender orderings e prefere algo mais dificil de manter.",
        "Quando a aplicacao nunca vai ter concorrencia real.",
      ],
      "a",
      "Mutex e sincronizacao de mais alto nivel costumam vencer quando o estado e composto e o custo cognitivo da prova com atomics explode.",
    ),
    quiz(
      "q6",
      "Qual e um erro conceitual recorrente em bugs de ordering?",
      [
        "Confundir atomicidade de uma variavel com visibilidade correta de todos os dados relacionados a ela.",
        "Usar happens-before como lente de revisao.",
        "Separar modelo de linguagem de detalhe de microarquitetura.",
      ],
      "a",
      "Esse e um dos bugs mais comuns: o atomic muda de valor corretamente, mas o estado que ele deveria publicar nao esta sob o contrato adequado.",
    ),
    quiz(
      "q7",
      "Por que 'volatile resolve' costuma ser um mito perigoso?",
      [
        "Porque volatile frequentemente nao substitui sincronizacao entre threads; ele nao e, por definicao geral, um mecanismo de ordering suficiente para publicar estado concorrente.",
        "Porque volatile sempre implica SeqCst em qualquer linguagem e hardware.",
        "Porque volatile elimina data races automaticamente.",
      ],
      "a",
      "O papel de volatile varia por linguagem e contexto, mas em geral ele nao substitui o contrato concorrente que locks, canais ou atomics com ordering adequado fornecem.",
    ),
    quiz(
      "q8",
      "Qual atitude e mais madura ao analisar um bug raro em multicore?",
      [
        "Perguntar qual leitura importante nao tem uma borda clara de happens-before e separar erro de sincronizacao de erro de logica.",
        "Fortalecer todas as operacoes para SeqCst sem investigar mais nada.",
        "Assumir que se o teste local passou, o comportamento esta provado.",
      ],
      "a",
      "Happens-before e a lente de diagnostico mais importante. Fortalecer tudo cegamente pode mascarar a causa e adicionar custo sem entendimento.",
    ),
  ],
  glossary: [
    glossary(
      "Memory model",
      "Contrato da linguagem ou plataforma sobre quais observacoes concorrentes sao permitidas e como sincronizacao estabelece ordem entre elas.",
    ),
    glossary(
      "Reordering",
      "Situacao em que a ordem observada entre acessos pode diferir da ordem intuitiva do codigo fonte quando nenhuma sincronizacao adequada a restringe.",
    ),
    glossary(
      "Sequential consistency",
      "Modelo forte em que os efeitos parecem caber em uma unica ordem global compativel com a ordem de cada thread.",
    ),
    glossary(
      "DRF-SC",
      "Propriedade segundo a qual programas livres de data race podem ser entendidos como sequencialmente consistentes.",
    ),
    glossary(
      "Happens-before",
      "Relacao que combina sequenciamento local e sincronizacao entre threads para justificar visibilidade e ordem.",
    ),
    glossary(
      "Atomicidade",
      "Garantia de indivisibilidade de uma operacao sobre um objeto atomico.",
    ),
    glossary(
      "Relaxed",
      "Ordering que preserva atomicidade no objeto, mas nao publica genericamente outros efeitos.",
    ),
    glossary(
      "Acquire",
      "Semantica de leitura que, ao observar um valor publicado com Release correspondente, passa a ver efeitos anteriores do produtor.",
    ),
    glossary(
      "Release",
      "Semantica de publicacao que torna observaveis efeitos anteriores para um consumidor que depois adquira esse valor.",
    ),
    glossary(
      "AcqRel",
      "Ordering usado em operacoes read-modify-write que precisa combinar efeitos de Acquire e Release.",
    ),
    glossary(
      "SeqCst",
      "Ordering mais forte e intuitivo, que adiciona uma ordem global para operacoes sequencialmente consistentes.",
    ),
    glossary(
      "Fence",
      "Barreira que impõe restricoes adicionais de ordenacao, normalmente usada com muito mais cuidado do que locks ou pares acquire/release.",
    ),
    glossary(
      "Data race",
      "Acesso concorrente conflitante ao mesmo dado, sem sincronizacao adequada, com pelo menos uma escrita.",
    ),
    glossary(
      "Race condition",
      "Dependencia indesejada de interleavings ou timing que pode existir mesmo sem violar a definicao formal de data race.",
    ),
  ],
} satisfies LessonContent;
