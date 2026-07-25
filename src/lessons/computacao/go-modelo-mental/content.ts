import type { LessonContent } from "../../../types/content";

export const goModeloMentalContent: LessonContent = {
  id: "go-modelo-mental",
  title: "Go: Modelo Mental da Linguagem",
  subtitle:
    "Go foi desenhada para deixar contratos, concorrência e custos operacionais relativamente visíveis; entender essa escolha muda como você lê e escreve código na linguagem.",
  description:
    "Uma aula sobre a filosofia prática de Go: zero value, cópias e ponteiros, composição, interfaces pequenas, erros como valores e o tipo de simplicidade que a linguagem tenta forçar.",
  primaryCategoryId: "computacao",
  secondaryCategoryId: "engenharia",
  level: "Intermediário",
  estimatedTime: "50-65 min",
  tags: [
    "Go",
    "Modelo mental",
    "Interfaces",
    "Erros",
    "Composição",
    "Performance",
    "Engenharia",
  ],
  learningObjectives: [
    "Entender por que Go privilegia contratos explícitos em vez de superfícies mágicas.",
    "Relacionar zero value, cópias e ponteiros ao custo e à clareza de APIs.",
    "Explicar por que composição e interfaces pequenas são preferidas a hierarquias rígidas.",
    "Ler o tratamento de erros como parte do fluxo normal do programa.",
    "Perceber como decisões de estilo em Go conversam com debugging, profiling e operação.",
  ],
  prerequisites: [
    "Noções de funções, structs e ponteiros em alguma linguagem moderna.",
    "Curiosidade sobre concorrência e serviços backend ajuda, mas não é obrigatória.",
    "Contato prévio com noções de memória e custo de abstrações facilita a leitura.",
  ],
  references: [
    {
      title: "Effective Go",
      source: "The Go Programming Language",
      url: "https://go.dev/doc/effective_go",
      note: "Documento clássico com idioms centrais de estilo e desenho de APIs em Go.",
    },
    {
      title: "Errors are values",
      source: "The Go Blog",
      url: "https://go.dev/blog/errors-are-values",
      note: "Texto fundamental para entender por que erros fazem parte do fluxo explícito da linguagem.",
    },
    {
      title: "Working with Errors in Go 1.13",
      source: "The Go Blog",
      url: "https://go.dev/blog/go1.13-errors",
      note: "Explica wrapping, errors.Is e errors.As como continuação do modelo de erros como valores.",
    },
    {
      title: "Share Memory By Communicating",
      source: "The Go Blog",
      url: "https://go.dev/blog/codelab-share",
      note: "Conecta o modelo mental de simplicidade com a forma idiomática de estruturar concorrência.",
    },
    {
      title: "The Go Memory Model",
      source: "The Go Programming Language",
      url: "https://go.dev/ref/mem",
      note: "Referência oficial para entender ordenação e sincronização entre goroutines.",
    },
  ],
  heroVisual: "go-mental-hero",
  openingText:
    "Muita gente aprende Go pela superfície: sintaxe curta, goroutines, channels, interfaces implícitas. Isso ajuda a começar, mas não explica por que a linguagem parece ao mesmo tempo simples, rígida e surpreendentemente pragmática. O modelo mental que faz Go encaixar é outro: a linguagem tenta tornar o contrato principal legível cedo. O zero value precisa funcionar, a cópia precisa ser uma possibilidade real, a interface precisa dizer pouca coisa, o erro precisa continuar visível e o runtime precisa ter espaço para operar sem depender de superfícies excessivamente mágicas. Quando você lê Go assim, várias escolhas que antes pareciam limitações começam a parecer engenharia deliberada.",
  quickFacts: [
    {
      title: "Simplicidade em Go é disciplina",
      body: "A linguagem abre mão de alguns luxos para manter o contrato principal mais legível.",
    },
    {
      title: "Zero value carrega filosofia",
      body: "Tipos úteis sem construtor obrigatório reduzem ritual e bugs de inicialização parcial.",
    },
    {
      title: "Erro não sai do fluxo",
      body: "Falhas aparecem no mesmo plano das demais decisões do programa.",
    },
    {
      title: "Legibilidade ajuda operação",
      body: "Quando o custo e a mutação aparecem na assinatura, profiling e manutenção ficam menos obscuros.",
    },
  ],
  sections: [
    s(
      "filosofia-da-linguagem",
      "Fundação",
      "Go não tenta parecer profunda; tenta ser previsível",
      "A linguagem foi desenhada para times que precisam ler, manter e operar software grande sem depender demais de truques locais.",
      "go-mental-map",
      undefined,
      [
        "Parte da identidade de Go nasce de uma recusa: a linguagem não quer esconder demais. Em vez de oferecer dezenas de formas de expressar a mesma intenção, ela tende a empurrar o programador para um conjunto menor de escolhas cujo custo é mais fácil de reconhecer.",
        "Isso não quer dizer que tudo em Go seja barato ou óbvio. Quer dizer apenas que o contrato principal costuma aparecer cedo: você vê o tipo, o retorno de erro, o uso de ponteiro, a interface mínima e o ponto em que a concorrência entra.",
        "Em sistemas concorrentes e serviços que vivem anos, essa previsibilidade de leitura vale muito. Ela diminui tempo de onboarding, reduz magia operacional e melhora o diálogo entre design de API e comportamento de runtime.",
      ],
      [
        {
          type: "definition",
          title: "Modelo mental da linguagem",
          body: "Conjunto de expectativas sobre como o código costuma ser organizado, lido e otimizado dentro do ecossistema de uma linguagem.",
        },
        {
          type: "insight",
          title: "Previsibilidade é feature de engenharia",
          body: "Em software mantido por times, reduzir surpresa semântica costuma valer mais do que permitir estilos muito diferentes para a mesma tarefa.",
        },
      ],
    ),
    s(
      "zero-value",
      "Estado inicial",
      "Zero value não é detalhe; é compromisso de design",
      "Go espera que tipos úteis tenham um estado inicial válido ou, ao menos, seguro para uso básico.",
      undefined,
      "go-mental-model-flow",
      [
        "O zero value torna mais simples declarar estruturas, embutir tipos e construir APIs em que o chamador não precisa decorar rituais de inicialização para começar. Isso aparece em slices nil que ainda podem ser iteradas, mutexes zerados prontos para uso e buffers que crescem sob demanda.",
        "Esse estilo reduz a quantidade de construtores obrigatórios e de estados intermediários difíceis de testar. O benefício principal não é apenas ergonomia: é diminuir os lugares em que um objeto pode existir, mas ainda não estar pronto.",
        "A contrapartida é que nem todo tipo consegue ser realmente útil em zero value sem compromissos. Quando isso acontece, o programador precisa desenhar APIs que deixem as pré-condições evidentes, em vez de fingir que tudo é autoinicializável.",
      ],
      [
        {
          type: "definition",
          title: "Zero value",
          body: "Valor inicial padrão de um tipo em Go, obtido sem inicialização explícita adicional.",
        },
        {
          type: "example",
          title: "sync.Mutex",
          body: "Um mutex zerado já pode ser usado. Isso evita construtores artificiais só para preparar sincronização básica.",
        },
        {
          type: "mistake",
          title: "Tratar zero value como lixo inevitável",
          body: "No ecossistema Go, o estado inicial costuma ser parte consciente do contrato de um tipo, não apenas um acidente da implementação.",
        },
      ],
    ),
    s(
      "valores-e-ponteiros",
      "Semântica",
      "Em Go, cópia e endereço precisam ser escolhas legíveis",
      "A pergunta importante não é 'ponteiro é mais avançado?', mas 'que semântica de mutação e lifetime esta assinatura quer comunicar?'",
      undefined,
      "go-values-interfaces-lab",
      [
        "Passar por valor em Go não é uma relíquia acadêmica; é uma forma clara de dizer que a função recebe uma cópia daquele estado. Em tipos pequenos ou moderados, isso pode simplificar muito o raciocínio sobre aliasing e efeitos colaterais.",
        "Ponteiros entram quando mutação compartilhada, identidade estável ou custo de cópia tornam isso desejável. A chave é não transformar endereço em reflexo automático, porque ele espalha possibilidade de compartilhamento e costuma conversar com escape analysis, GC e depuração.",
        "Quando o leitor entende cedo se um dado será copiado, mutado ou mantido vivo, a assinatura da API passa a carregar mais verdade operacional. Esse é um traço recorrente do estilo Go.",
      ],
      [
        {
          type: "definition",
          title: "Semântica de valor",
          body: "Modelo em que a passagem e o retorno de dados enfatizam cópia e isolamento, salvo quando referências explícitas são usadas.",
        },
        {
          type: "insight",
          title: "Ponteiro é contrato, não enfeite",
          body: "Ao expor ponteiros, você costuma expor possibilidade de mutação compartilhada, lifetime maior ou custo diferente de alocação.",
        },
      ],
    ),
    s(
      "composicao",
      "Estrutura",
      "Composição vence quando o objetivo é montar comportamento sem hierarquia pesada",
      "Go prefere structs, funções e embedding simples a árvores profundas de herança e polimorfismo estrutural obscuro.",
      undefined,
      undefined,
      [
        "A composição em Go não é apenas uma alternativa estética à herança. Ela é um modo de construir software em que as peças tendem a ser menores, mais previsíveis e mais fáceis de reaproveitar em combinações novas.",
        "Ao usar structs que embutem outras structs, funções que recebem dependências explícitas e interfaces pequenas no limite do consumo, o código costuma ficar menos dependente de uma taxonomia rígida de tipos.",
        "Isso não elimina acoplamento automaticamente. Mas desloca o problema para um espaço mais explícito: quem depende de quem, por qual capacidade e com qual custo. Essa visibilidade ajuda especialmente em serviços e bibliotecas de infraestrutura.",
      ],
      [
        {
          type: "definition",
          title: "Composição",
          body: "Estratégia de montar comportamento combinando objetos, funções e capacidades menores em vez de depender principalmente de herança.",
        },
        {
          type: "example",
          title: "Estrutura com dependências explícitas",
          body: "Um handler que recebe logger, store e clock como campos deixa suas colaborações visíveis e testáveis.",
        },
      ],
    ),
    s(
      "interfaces-pequenas",
      "Capacidade",
      "Interfaces em Go costumam funcionar melhor quando dizem pouco",
      "O ideal comum é descrever a menor capacidade necessária para o consumidor fazer seu trabalho.",
      undefined,
      undefined,
      [
        "Interfaces implícitas são poderosas porque reduzem cerimônia, mas podem virar fonte de acoplamento silencioso se forem grandes demais. Quando a interface descreve dez métodos, ela deixa de ser uma capacidade mínima e começa a parecer um tipo concreto disfarçado.",
        "O estilo idiomático em Go costuma inverter a intuição de outras linguagens: em vez de o produtor publicar logo uma interface enorme, muitas vezes o consumidor define uma interface pequena com o que realmente precisa.",
        "Isso melhora testes, substituição e leitura de dependências. Também preserva liberdade de evolução do tipo concreto, já que o contrato público exigido por cada ponto de uso permanece estreito.",
      ],
      [
        {
          type: "definition",
          title: "Interface pequena",
          body: "Interface que expressa uma capacidade estreita, suficiente para um uso específico, sem replicar toda a superfície de um tipo concreto.",
        },
        {
          type: "mistake",
          title: "Publicar interface por reflexo",
          body: "Criar interfaces largas antes de saber onde a abstração realmente ajuda costuma aumentar acoplamento em vez de reduzi-lo.",
        },
      ],
    ),
    s(
      "erros-como-valores",
      "Fluxo",
      "Erros como valores significam que falhas continuam dentro do programa, não fora dele",
      "A verbosidade local do `if err != nil` faz sentido quando você percebe que o erro é parte do contrato e não exceção semântica.",
      undefined,
      undefined,
      [
        "O Go Blog resume a ideia em uma frase famosa: errors are values. Isso quer dizer que o programador pode acumular contexto, adiar checagem em padrões específicos, encapsular repetição e tomar decisões diferentes conforme o tipo e o significado da falha.",
        "A checagem explícita incomoda quem espera um mecanismo invisível de unwind, mas tem uma vantagem operacional forte: o leitor consegue ver onde a falha pode acontecer e como ela é traduzida para o chamador.",
        "Com Go 1.13, wrapping e inspeção via errors.Is e errors.As reforçaram esse modelo. O erro não é só mensagem; ele pode carregar cadeia causal e virar parte estável da API.",
      ],
      [
        {
          type: "definition",
          title: "Erro como valor",
          body: "Falha representada por um valor manipulável pela própria linguagem, em vez de um mecanismo totalmente externo ao fluxo normal.",
        },
        {
          type: "insight",
          title: "Explícito não precisa ser repetitivo",
          body: "O próprio Go Blog mostra padrões em que a linguagem ajuda a reduzir boilerplate sem esconder a existência do erro.",
        },
        {
          type: "mistake",
          title: "Achar que erros como valores significam checar tudo do mesmo jeito",
          body: "O ponto não é repetir mecanicamente, e sim desenhar APIs e fluxos que tratem falhas com contexto e clareza.",
        },
      ],
    ),
    s(
      "concorrencia-no-modelo-mental",
      "Runtime",
      "Goroutines e channels fazem parte da identidade da linguagem, mas não substituem desenho criterioso",
      "Go incentiva concorrência estruturada, porém continua exigindo que você escolha as ferramentas certas para cada disputa de estado e cada orçamento de CPU.",
      undefined,
      "go-explicitness-dial",
      [
        "A famosa frase 'não compartilhe memória comunicando; compartilhe memória por comunicação' é útil para organizar ownership e pipelines. Mas o próprio material oficial do Go lembra que mutexes e atomics continuam ferramentas legítimas quando o problema é estado compartilhado quente.",
        "O valor do modelo mental de Go está em juntar simplicidade sintática com pragmatismo operacional. Você pode escrever código bloqueante e legível, deixar o runtime multiplexar trabalho e ainda assim escolher locks quando eles expressam melhor o contrato.",
        "Em outras palavras: a linguagem favorece um estilo, não um culto. O objetivo continua sendo produzir software claro, confiável e observável.",
      ],
      [
        {
          type: "example",
          title: "Pipeline com ownership claro",
          body: "Quando um item passa de etapa em etapa, channel comunica dado e ordenação ao mesmo tempo.",
        },
        {
          type: "mistake",
          title: "Transformar channel em resposta universal",
          body: "Problemas de cache compartilhado, contadores quentes ou invariantes locais podem ficar mais simples com mutex ou atomic.",
        },
      ],
    ),
    s(
      "sintese-operacional",
      "Síntese",
      "Ler Go bem é enxergar contrato, mutação, lifetime e custo quase ao mesmo tempo",
      "Quando o modelo mental se encaixa, a linguagem deixa de parecer espartana e passa a parecer intencional.",
      "go-mental-summary",
      undefined,
      [
        "Uma assinatura em Go frequentemente quer lhe contar quatro coisas de uma vez: o que entra, o que pode falhar, que tipo de mutação é permitida e quanta abstração existe entre você e o trabalho real.",
        "Isso não elimina a necessidade de profiling, benchmarking ou estudo do runtime. Mas cria uma base em que o código conversa melhor com essas ferramentas, porque a superfície já é relativamente honesta.",
        "O resultado prático é uma linguagem boa para times que precisam raciocinar sobre serviços concorrentes e duradouros sem depender de muita telepatia entre autores e leitores.",
      ],
      [
        {
          type: "insight",
          title: "O alvo não é minimalismo por si só",
          body: "O alvo é um código cuja leitura já entrega boa parte das respostas que operação e manutenção vão cobrar depois.",
        },
      ],
    ),
    s(
      "quiz-revisao",
      "Revisão",
      "Quiz de revisão",
      "Verifique se zero value, semântica de valor, interfaces pequenas e erros explícitos ficaram conectados.",
      undefined,
      "quiz",
      [
        "O objetivo é confirmar se você está enxergando Go como uma linguagem de contratos legíveis, e não apenas de sintaxe curta.",
      ],
      [],
    ),
    s(
      "glossario",
      "Glossário",
      "Termos essenciais",
      "Feche a aula consolidando o vocabulário que organiza a leitura idiomática de código Go.",
      undefined,
      "glossary",
      [
        "Esses termos reaparecem quando você estudar scheduler, escape analysis, GC e desenho de APIs no ecossistema Go.",
      ],
      [],
    ),
  ],
  summaryCards: [
    {
      title: "Go privilegia previsibilidade",
      body: "Menos formas de fazer a mesma coisa ajudam leitura, manutenção e operação.",
    },
    {
      title: "Zero value participa do design",
      body: "Tipos úteis em estado inicial reduzem ritual e superfícies frágeis.",
    },
    {
      title: "Valores e ponteiros comunicam semântica",
      body: "A assinatura já sugere cópia, mutação, aliasing e lifetime.",
    },
    {
      title: "Interfaces pequenas envelhecem melhor",
      body: "Capacidades estreitas preservam flexibilidade e simplificam testes.",
    },
    {
      title: "Erros são parte do contrato",
      body: "Explícitos, programáveis e legíveis como fluxo normal do sistema.",
    },
    {
      title: "Simplicidade não é dogma",
      body: "Ela é uma estratégia para expor melhor trade-offs reais do runtime e da operação.",
    },
  ],
  quiz: [
    q(
      "q1",
      "Qual frase resume melhor o objetivo idiomático de Go?",
      "Reduzir surpresa e deixar contratos principais legíveis cedo.",
      "Esconder detalhes do runtime o máximo possível.",
      "Substituir toda forma de sincronização por channels.",
      "a",
      "O estilo de Go privilegia previsibilidade de leitura e contratos explícitos.",
    ),
    q(
      "q2",
      "Por que zero value é importante em Go?",
      "Porque ele tende a fazer parte do contrato útil de tipos e APIs.",
      "Porque evita qualquer possibilidade de nil.",
      "Porque elimina toda necessidade de inicialização.",
      "a",
      "O zero value reduz ritual e estados intermediários frágeis, mas não resolve todo caso sozinho.",
    ),
    q(
      "q3",
      "O que passar por valor comunica com frequência?",
      "Que a função recebe uma cópia daquele estado.",
      "Que a função sempre aloca no heap.",
      "Que o dado não pode ser retornado.",
      "a",
      "Em Go, semântica de valor costuma tornar cópia e isolamento mais visíveis.",
    ),
    q(
      "q4",
      "Quando um ponteiro costuma ser mais justificável?",
      "Quando identidade estável, mutação compartilhada ou custo de cópia importam.",
      "Sempre que o tipo tiver mais de um campo.",
      "Sempre que quisermos parecer mais eficientes.",
      "a",
      "Ponteiro é ferramenta de contrato, não reflexo automático.",
    ),
    q(
      "q5",
      "O que caracteriza uma interface pequena idiomática?",
      "Descrever a menor capacidade necessária para um uso específico.",
      "Ter o máximo de métodos possível para garantir flexibilidade.",
      "Ser definida sempre pelo produtor da biblioteca.",
      "a",
      "Interfaces estreitas costumam desacoplar melhor e envelhecer melhor.",
    ),
    q(
      "q6",
      "O que significa dizer que 'errors are values'?",
      "Que erros fazem parte do fluxo e podem ser programados como outros valores.",
      "Que erros não precisam ser checados imediatamente nunca.",
      "Que exceções são simuladas automaticamente por nil.",
      "a",
      "A ideia é tratar falhas explicitamente, usando a própria linguagem para organizar o fluxo.",
    ),
    q(
      "q7",
      "Qual erro de leitura é comum ao aprender Go?",
      "Confundir simplicidade idiomática com limitação acidental da linguagem.",
      "Achar que zero value sempre cria bugs.",
      "Supor que interfaces explícitas são obrigatórias para qualquer polimorfismo.",
      "a",
      "Muitas escolhas estranhas no começo fazem mais sentido quando vistas como disciplina de engenharia.",
    ),
    q(
      "q8",
      "Qual conclusão é mais alinhada ao material oficial de Go?",
      "Channels, mutexes e outras primitivas devem ser escolhidos pela semântica do problema.",
      "Channels devem substituir mutexes em qualquer sistema concorrente.",
      "O runtime resolve sozinho toda decisão de desenho concorrente.",
      "a",
      "O ecossistema Go é pragmático: a ferramenta certa depende do contrato que você quer expressar.",
    ),
  ],
  glossary: [
    g("Zero value", "Valor inicial padrão de um tipo em Go, frequentemente tratado como parte útil do contrato."),
    g("Semântica de valor", "Modelo em que passar ou retornar dados enfatiza cópia e isolamento."),
    g("Ponteiro", "Referência explícita a um valor, útil para mutação compartilhada, identidade ou redução de cópia."),
    g("Aliasing", "Situação em que múltiplas referências podem observar ou modificar o mesmo dado."),
    g("Composição", "Construção de comportamento por combinação de partes menores em vez de herança profunda."),
    g("Interface pequena", "Contrato estreito que descreve apenas a capacidade necessária para um uso específico."),
    g("Erro como valor", "Falha representada por um valor manipulável dentro do fluxo normal do programa."),
    g("Wrapping de erro", "Técnica de acrescentar contexto a um erro preservando sua causa subjacente."),
    g("Ownership", "Forma de raciocinar sobre quem controla um dado e quem pode mutá-lo."),
    g("Contrato explícito", "API cuja assinatura e fluxo deixam dependências, erros e efeitos mais visíveis."),
    g("Idiomaticidade", "Conjunto de práticas consideradas naturais e legíveis dentro do ecossistema de uma linguagem."),
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
