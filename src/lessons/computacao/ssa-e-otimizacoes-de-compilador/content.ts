import type { LessonContent } from "../../../types/content";

export const ssaEOtimizacoesDeCompiladorContent: LessonContent = {
  id: "ssa-e-otimizacoes-de-compilador",
  title: "SSA e Otimizacoes de Compilador",
  subtitle:
    "Quando cada valor ganha um nome unico, o compilador enxerga dependencias com muito mais clareza.",
  description:
    "Uma aula avancada sobre IR em forma SSA, intuicao de phi-nodes, renomeacao, cadeia def-use, passos de otimizacao, dominadores, mem2reg no LLVM e os bloqueios causados por alias e side effects.",
  primaryCategoryId: "computacao",
  secondaryCategoryId: "engenharia",
  level: "Avançado",
  estimatedTime: "55-70 min",
  tags: [
    "Compiladores",
    "SSA",
    "LLVM",
    "IR",
    "Phi",
    "DCE",
    "Constant Propagation",
    "mem2reg",
  ],
  learningObjectives: [
    "Explicar por que compiladores modernos usam IR em vez de otimizar diretamente a AST ou o codigo-fonte.",
    "Entender a regra central de SSA: cada nome recebe atribuicao uma unica vez.",
    "Construir intuicao para phi-nodes como pontos de juncao entre caminhos de controle.",
    "Relacionar SSA a cadeias def-use, propagacao de constantes e eliminacao de codigo morto.",
    "Usar dominadores apenas no nivel necessario para entender por que phi aparece onde aparece.",
    "Reconhecer limites de SSA diante de aliasing, side effects e operacoes observaveis.",
  ],
  prerequisites: [
    "Ter visto o pipeline de um compilador ajuda a localizar onde a IR entra em cena.",
    "A aula compiladores e otimizacoes prepara o terreno para pensar em passes e trade-offs.",
    "A aula undefined behavior mindset ajuda a entender por que algumas transformacoes dependem de provas de seguranca semantica.",
  ],
  references: [
    {
      title: "LLVM Language Reference Manual",
      source: "LLVM Documentation",
      url: "https://llvm.org/docs/LangRef.html",
      note: "Define o LLVM IR como uma representacao baseada em SSA e documenta a instrucao phi.",
    },
    {
      title: "Kaleidoscope: Extending the Language: Mutable Variables",
      source: "LLVM Documentation",
      url: "https://llvm.org/docs/tutorial/MyFirstLanguageFrontend/LangImpl07.html",
      note: "Tutorial oficial que liga variaveis mutaveis a mem2reg e insercao de phi-nodes.",
    },
    {
      title: "Efficiently Computing Static Single Assignment Form and the Control Dependence Graph",
      source: "ACM TOPLAS",
      url: "https://doi.org/10.1145/115372.115320",
      note: "Paper classico de Cytron e coautores sobre construcao eficiente de SSA.",
    },
    {
      title: "CS 6120: Static Single Assignment",
      source: "Cornell University",
      url: "https://www.cs.cornell.edu/courses/cs6120/2025fa/lesson/6/",
      note: "Material didatico universitario com explicacoes acessiveis sobre phi, renomeacao e dominance frontier.",
    },
    {
      title: "CS 6120: Global Analysis & SSA",
      source: "Cornell University",
      url: "https://www.cs.cornell.edu/courses/cs6120/2020fa/lesson/5/",
      note: "Complementa a intuicao de dominadores, frontiers e analises globais sobre CFG.",
    },
  ],
  heroVisual: "ssa-compiler-hero",
  openingText:
    "Quando uma linguagem imperativa fala em variavel, o texto-fonte da a impressao de que estamos sempre mexendo na mesma caixinha: `x = ...`, depois `x = ...` de novo, depois `if` e `x` muda em outro ramo. Para o compilador, isso embaralha bastante a historia. Qual versao de `x` esta alimentando este calculo? Aquela de antes do branch, a do ramo verdadeiro, a do loop anterior? SSA existe para tirar essa neblina. Ao renomear cada atribuicao como um valor distinto e explicitar os pontos onde caminhos se reencontram, a IR vira um mapa muito melhor para provas, analises e reescritas. O ganho nao e cosmetico: ele muda o que o compilador consegue enxergar com seguranca relativa.",
  quickFacts: [
    {
      title: "SSA e sobre nomes, nao sobre magia",
      body: "A forma ajuda porque cada definicao fica identificada de modo unico ao longo do fluxo.",
    },
    {
      title: "Phi nao executa um if oculto",
      body: "Ele seleciona um valor de acordo com o predecessor pelo qual o controle chegou ao bloco.",
    },
    {
      title: "Otimizar depende de provas",
      body: "Alias, efeitos colaterais e observabilidade podem bloquear transformacoes aparentemente obvias.",
    },
    {
      title: "LLVM usa isso intensamente",
      body: "A propria documentacao oficial apresenta o LLVM IR como uma representacao baseada em SSA.",
    },
  ],
  sections: [
    s(
      "por-que-ir-existe",
      "Pipeline",
      "IR existe porque AST e codigo-fonte nao sao a melhor superficie para toda analise",
      "Compiladores modernos preferem uma forma intermediaria que explicita fluxo, valores e dependencias de um jeito mais util para transformacoes.",
      "ssa-compiler-map",
      undefined,
      [
        "ASTs sao excelentes para representar estrutura sintatica e semantica inicial, mas nem sempre sao a melhor superficie para passes de otimizacao. Elas carregam detalhes de linguagem de alto nivel e nem sempre tornam o fluxo de controle e as dependencias de dados tao diretos quanto o compilador gostaria.",
        "Uma IR boa atua como moeda comum: perto o suficiente do programa para preservar significado importante, e simples o bastante para analises globais, reescritas locais e ponte com multiplos backends.",
        "SSA aparece nesse ponto da historia. Ela nao substitui todas as representacoes do compilador, mas oferece uma forma particularmente forte para falar de definicoes, usos e caminhos que se encontram.",
      ],
      [
        {
          type: "definition",
          title: "IR",
          body: "Representacao intermediaria usada pelo compilador para analisar, transformar e preparar codigo para geracao final.",
        },
        {
          type: "insight",
          title: "A melhor representacao depende da pergunta",
          body: "AST e boa para significado estrutural; uma IR em SSA e excelente para provas e reescritas sobre fluxo e dados.",
        },
      ],
    ),
    s(
      "uma-atribuicao-por-nome",
      "Regra central",
      "Em SSA, cada nome recebe valor uma unica vez",
      "A variavel textual parece a mesma ao humano, mas o compilador passa a enxerga-la como uma sequencia de versoes distintas.",
      undefined,
      undefined,
      [
        "A regra principal de SSA e simples de enunciar: cada nome e definido exatamente uma vez. Se o programa reatribui `x`, o compilador cria novos nomes como `x1`, `x2`, `x3`, cada um associado a uma definicao especifica.",
        "Isso nao significa que o comportamento do programa mudou. O que muda e a clareza da historia. Em vez de perguntar 'qual x esta valendo aqui?', o compilador agora consegue apontar para uma origem precisa do valor.",
        "O efeito mais importante e sobre analise de dependencia. Falsas ambiguidades desaparecem para escalares porque o encadeamento entre quem produziu e quem consumiu fica muito mais direto.",
      ],
      [
        {
          type: "definition",
          title: "SSA",
          body: "Static Single Assignment: forma intermediaria em que cada nome e atribuido uma unica vez ao longo do programa.",
        },
        {
          type: "mistake",
          title: "Achar que SSA proibe mutacao no programa fonte",
          body: "Ela apenas reescreve a representacao interna para que cada definicao ganhe uma identidade separada.",
        },
      ],
    ),
    s(
      "blocos-renomeacao-e-fluxo",
      "Fluxo",
      "Renomeacao so faz sentido quando pensamos em blocos basicos e fluxo de controle",
      "Nao basta trocar nomes linearmente; e preciso respeitar branches, loops e pontos em que o controle pode chegar por caminhos distintos.",
      undefined,
      undefined,
      [
        "Compiladores organizam funcoes em blocos basicos, isto e, sequencias de instrucoes sem desvios internos. Esses blocos formam um grafo de controle. A renomeacao para SSA percorre esse grafo e atualiza usos para apontarem para a definicao mais recente valida naquele caminho.",
        "Em trechos lineares, isso e quase mecanico. O desafio real surge quando ha desvio condicional ou loop. A mesma variavel textual pode ganhar versoes diferentes em predecessores diferentes do bloco seguinte.",
        "E exatamente aqui que phi-nodes entram: eles tornam explicita a pergunta 'de qual caminho veio o valor que estou vendo agora?'.",
      ],
      [
        {
          type: "definition",
          title: "Bloco basico",
          body: "Sequencia de instrucoes com uma unica entrada e sem desvios internos, encerrada por uma transferencia de controle.",
        },
        {
          type: "example",
          title: "Branch simples",
          body: "Se `x` recebe um valor no ramo verdadeiro e outro no falso, o bloco de juncao precisa dizer qual versao passa a valer dali em diante.",
        },
      ],
    ),
    s(
      "phi-nodes",
      "Phi",
      "Phi-nodes sao a intuicao decisiva: eles juntam historias de caminhos diferentes",
      "Quando dois ou mais predecessores chegam ao mesmo bloco, a IR precisa de um jeito de nomear o valor correto sem perder a regra de atribuicao unica.",
      undefined,
      "ssa-to-ssa-lab",
      [
        "A documentacao do LLVM descreve `phi` como uma instrucao que seleciona um valor com base no bloco predecessor pelo qual o controle chegou. Em outras palavras, o bloco de juncao nao inventa um valor; ele escolhe entre versoes que ja existiam.",
        "Esse ponto costuma parecer misterioso porque, no texto-fonte, o `phi` nao tem equivalente direto com a mesma cara. Ele e um artefato da representacao intermediaria para explicitar uma dependencia que estava implicita no controle.",
        "A melhor intuicao e pensar em `phi` como uma legenda na porta de entrada de um bloco: se voce veio do caminho A, use esta versao; se veio do caminho B, use aquela outra.",
      ],
      [
        {
          type: "definition",
          title: "Phi-node",
          body: "Instrucao de SSA que escolhe um valor entre predecessores de um bloco, de acordo com o caminho tomado pelo controle.",
        },
        {
          type: "insight",
          title: "Phi codifica juncoes, nao adivinhacao",
          body: "Ele nao calcula um valor novo do nada; ele registra qual definicao anterior continua valida naquele ponto.",
        },
      ],
    ),
    s(
      "def-use",
      "Analise",
      "SSA deixa cadeias def-use muito mais nitidas",
      "Quando a origem de cada valor fica clara, analises de propagacao, alcance e eliminacao param de tatear no escuro.",
      undefined,
      undefined,
      [
        "Uma cadeia def-use liga uma definicao aos seus usos. Em representacoes com reatribuicoes repetidas, essas relacoes podem exigir bastante bookkeeping. Em SSA, muita coisa fica estruturalmente explicita porque cada uso aponta para uma definicao unica.",
        "Isso simplifica varias perguntas classicas. Se um valor e constante, quem depende dele talvez tambem possa ser simplificado. Se uma definicao nao alimenta nenhum uso observavel, ha chance de codigo morto. Se um valor domina outro calculo, certas provas ficam mais locais.",
        "Essa nitidez nao resolve todos os problemas do mundo, mas reduz dramaticamente a quantidade de ambiguidade acidental para valores escalares.",
      ],
      [
        {
          type: "definition",
          title: "Def-use chain",
          body: "Relacao entre o ponto em que um valor e definido e os pontos que o consomem depois.",
        },
        {
          type: "example",
          title: "Constante que se espalha",
          body: "Se `%a1` vale sempre `4`, qualquer operacao que use `%a1` pode se tornar candidata a simplificacao local.",
        },
      ],
    ),
    s(
      "passos-de-otimizacao",
      "Passes",
      "Constant propagation e DCE ficam mais naturais em SSA",
      "Quando o grafo de dependencias esta limpo, varios passes deixam de ser adivinhacao e viram reescritas guiadas por evidencia.",
      undefined,
      "ssa-opt-steps-lab",
      [
        "Um exemplo didatico comum e constant propagation. Se uma definicao produz um literal conhecido, usos subsequentes podem ser simplificados. Depois dessa simplificacao, outras instrucoes podem perder utilidade e virar alvo de DCE, eliminacao de codigo morto.",
        "O ganho nao vem de um passe isolado e sim da composicao. Uma transformacao expande o campo de visao da seguinte. Por isso pipelines de compilador executam varias analises e reescritas em sequencia.",
        "SSA ajuda exatamente porque faz o compilador enxergar com mais precisao quem depende de quem. Sem isso, cada simplificacao exigiria muito mais cautela e rastreamento.",
      ],
      [
        {
          type: "definition",
          title: "DCE",
          body: "Dead Code Elimination: remocao de instrucoes cujo resultado nao afeta comportamento observavel.",
        },
        {
          type: "insight",
          title: "Passes cooperam",
          body: "Uma propagacao de constantes pode destravar uma eliminacao de codigo morto, que por sua vez simplifica o CFG.",
        },
      ],
    ),
    s(
      "dominadores",
      "Estrutura",
      "Dominadores entram para responder de onde um valor pode vir com seguranca",
      "Voce nao precisa memorizar algoritmos para sentir a intuicao: alguns blocos estao em todo caminho ate outros.",
      undefined,
      undefined,
      [
        "Um bloco A domina um bloco B quando todo caminho da entrada ate B passa por A. Isso importa porque certas definicoes sao garantidamente visiveis em pontos dominados, enquanto outras so aparecem em alguns caminhos.",
        "A literatura classica de SSA, incluindo o trabalho de Cytron e coautores, usa essa estrutura para decidir onde phi precisa ser colocado de forma eficiente. A ideia de dominance frontier aparece justamente quando o dominio quase continua, mas um encontro de caminhos exige registrar a ambiguidade.",
        "Para esta aula, basta levar a intuicao operacional: dominadores ajudam a separar o que e sempre verdadeiro naquele ponto do grafo do que depende do caminho percorrido.",
      ],
      [
        {
          type: "definition",
          title: "Dominador",
          body: "Bloco que aparece em todo caminho da entrada do grafo ate outro bloco.",
        },
        {
          type: "formula",
          title: "Intuicao da frontier",
          body: "A frontier de dominancia marca pontos onde um dominio deixa de ser absoluto e a juncao precisa ser explicitada.",
          formula: "A domina um predecessor de B, mas nao domina B por completo.",
        },
      ],
    ),
    s(
      "bloqueios-por-alias-e-efeitos",
      "Limites",
      "SSA nao transforma qualquer reescrita em jogada segura",
      "Valores escalares ficam claros, mas memoria, aliasing e efeitos observaveis continuam exigindo provas extras.",
      undefined,
      "ssa-why-blocked-lab",
      [
        "Uma armadilha comum e imaginar que o compilador, so por usar SSA, sempre conseguira salvar codigo ruim. Nao funciona assim. Se duas referencias podem apontar para o mesmo lugar, mover, remover ou duplicar operacoes pode alterar resultado observavel.",
        "Chamadas de funcao desconhecidas, acessos a memoria, excecoes, atomics e operacoes com efeitos colaterais estendem a conversa para alem do grafo puro de nomes SSA. Nesses casos, analises complementares como alias analysis entram em cena.",
        "A licencao real do otimizador nao e 'parece equivalente'; e 'consigo provar equivalencia dentro do modelo da linguagem e da IR'.",
      ],
      [
        {
          type: "mistake",
          title: "Compilador sempre salva codigo ruim",
          body: "Muitas transformacoes desejaveis ficam bloqueadas porque o compilador nao conseguiu provar ausencia de alias ou de efeitos colaterais relevantes.",
        },
        {
          type: "example",
          title: "Load redundante talvez nao seja redundante",
          body: "Entre duas leituras do mesmo endereco, uma chamada desconhecida pode ter alterado a memoria observada.",
        },
      ],
    ),
    s(
      "llvm-mem2reg-e-sintese",
      "LLVM",
      "No LLVM, mem2reg mostra que SSA tambem e uma estrategia de engenharia",
      "Frontends podem gerar uma forma simples com allocas e deixar um passe consolidado promover variaveis locais para registradores SSA quando for seguro.",
      "ssa-compiler-summary",
      undefined,
      [
        "O tutorial oficial Kaleidoscope recomenda fortemente depender do passe `mem2reg` para promover variaveis locais em memoria para registradores SSA, inserindo phi-nodes quando necessario. Isso mostra um ponto importante: SSA nao e apenas teoria elegante; ela tambem organiza trabalho de implementacao real.",
        "Essa estrategia e valiosa porque deixa o frontend mais simples e delega a construcao eficiente de SSA a um passe maduro. Ao mesmo tempo, a propria documentacao lembra que isso so funciona em certos padroes de uso de memoria, o que reforca os limites discutidos na secao anterior.",
        "Leve daqui a sintese pratica: SSA ajuda o compilador a ver melhor, mas o que ele pode fazer de fato ainda depende do que consegue provar sobre fluxo, memoria e efeitos observaveis.",
      ],
      [
        {
          type: "insight",
          title: "SSA e uma interface de trabalho",
          body: "Ela conecta teoria de fluxo, analise de dependencias e engenharia de passes concretos como mem2reg.",
        },
        {
          type: "example",
          title: "Phi gerado automaticamente",
          body: "Um frontend pode escrever codigo simples com `alloca`, `load` e `store`, e deixar o LLVM promover esses acessos quando o padrao permitir.",
        },
      ],
    ),
    s(
      "quiz-revisao",
      "Revisao",
      "Quiz de revisao",
      "Teste se IR, SSA, phi, dominadores e limites por alias ficaram articulados.",
      undefined,
      "quiz",
      [
        "As perguntas favorecem leitura de cenarios e raciocinio sobre transformacoes, nao memorizacao de definicoes isoladas.",
      ],
      [],
    ),
    s(
      "glossario",
      "Glossario",
      "Termos essenciais de SSA e otimizacao",
      "Consolide o vocabulario usado em documentacao do LLVM, papers e discussoes de passes.",
      undefined,
      "glossary",
      [
        "Esses termos reaparecem em frontends, backends, papers classicos e ferramentas de depuracao de compilador.",
      ],
      [],
    ),
  ],
  quiz: [
    q(
      "q1",
      "Qual problema SSA tenta atacar primeiro?",
      "A dificuldade de saber qual definicao de um nome esta alimentando um uso em diferentes caminhos do programa.",
      "A falta de instrucoes SIMD no hardware.",
      "A lentidao do linker para montar bibliotecas.",
      "a",
      "SSA clareia exatamente a origem dos valores ao separar reatribuicoes em nomes distintos.",
    ),
    q(
      "q2",
      "Por que phi-nodes aparecem em blocos de juncao?",
      "Porque esses blocos precisam escolher entre versoes vindas de predecessores diferentes.",
      "Porque todo bloco precisa ter ao menos um phi.",
      "Porque phi substitui qualquer chamada de funcao.",
      "a",
      "Phi registra que o valor valido depende do caminho de controle pelo qual o programa chegou ali.",
    ),
    q(
      "q3",
      "Em um trecho linear sem branches, o que costuma acontecer ao converter para SSA?",
      "A renomeacao e direta, sem necessidade de phi.",
      "Toda instrucao vira um loop.",
      "As constantes deixam de existir.",
      "a",
      "Sem juncao de caminhos, basta dar nomes novos a cada definicao e atualizar seus usos.",
    ),
    q(
      "q4",
      "Qual transformacao costuma ficar mais facil quando a cadeia def-use esta explicita?",
      "Propagacao de constantes seguida de eliminacao de codigo morto.",
      "Montagem de pacotes do sistema operacional.",
      "Compressao do executavel por zip.",
      "a",
      "Quando a origem de um valor e clara, usos dependentes podem ser simplificados e instrucoes sem efeito podem desaparecer.",
    ),
    q(
      "q5",
      "O que significa dizer que um bloco A domina um bloco B?",
      "Todo caminho da entrada ate B passa por A.",
      "A vem alfabeticamente antes de B.",
      "A sempre executa mais instrucoes que B.",
      "a",
      "Dominio e uma propriedade estrutural do grafo de controle, nao uma ordem textual ou de custo.",
    ),
    q(
      "q6",
      "Por que uma otimizacao aparentemente obvia sobre loads pode ser bloqueada?",
      "Porque uma chamada desconhecida ou um alias pode ter alterado a memoria observada entre as leituras.",
      "Porque SSA proibe qualquer leitura de memoria.",
      "Porque phi-nodes invalidam acessos a ponteiros.",
      "a",
      "Sem prova de ausencia de alias ou de side effects relevantes, a reescrita deixa de ser segura.",
    ),
    q(
      "q7",
      "Qual mensagem do tutorial de mutable variables do LLVM e pedagogicamente importante?",
      "Frontends podem gerar codigo simples em memoria e deixar mem2reg promover variaveis locais para SSA quando for seguro.",
      "O LLVM recomenda evitar SSA em compiladores reais.",
      "Phi-nodes so existem em papers, nao em toolchains.",
      "a",
      "O proprio tutorial mostra SSA como estrategia pratica de engenharia, nao apenas como idealizacao academica.",
    ),
    q(
      "q8",
      "Qual afirmacao sobre SSA esta correta?",
      "SSA ajuda muito, mas nao resolve sozinha aliasing, side effects e toda semantica observavel.",
      "SSA garante que o compilador sempre encontre a melhor otimização possivel.",
      "SSA torna desnecessario qualquer CFG.",
      "a",
      "Ela melhora a visibilidade sobre valores, mas ainda depende de outras analises para provar seguranca das transformacoes.",
    ),
  ],
  glossary: [
    g("IR", "Representacao intermediaria usada pelo compilador entre o fonte e o codigo final."),
    g("SSA", "Forma em que cada nome recebe exatamente uma atribuicao estatica."),
    g("Phi-node", "Instrucao que escolhe entre valores de predecessores diferentes em um bloco de juncao."),
    g("CFG", "Control Flow Graph, grafo que descreve os caminhos possiveis de execucao entre blocos basicos."),
    g("Bloco basico", "Sequencia de instrucoes com uma unica entrada e sem desvios internos."),
    g("Def-use chain", "Ligacao entre um ponto de definicao de valor e seus usos posteriores."),
    g("Constant propagation", "Pass que substitui usos por constantes conhecidas quando isso e valido."),
    g("DCE", "Dead Code Elimination, remocao de codigo cujo resultado nao afeta o comportamento observavel."),
    g("Dominador", "Bloco que aparece em todo caminho da entrada ate outro bloco."),
    g("Dominance frontier", "Regiao do CFG onde um dominio deixa de ser absoluto e phi pode se tornar necessario."),
    g("Aliasing", "Possibilidade de duas referencias acessarem a mesma regiao de memoria."),
    g("Side effect", "Efeito observavel alem do valor retornado, como escrita em memoria, I/O ou sincronizacao."),
    g("mem2reg", "Passe do LLVM que promove certos usos de memoria para registradores em SSA."),
    g("LLVM IR", "Forma intermediaria do LLVM, documentada oficialmente como baseada em SSA."),
  ],
  relatedTopics: [
    {
      title: "Como Funciona um Compilador",
      body: "Retome o pipeline geral para localizar com clareza onde a IR entra e o que cada camada resolve.",
    },
    {
      title: "Compiladores e Otimizacoes",
      body: "Conecte os passes vistos aqui a uma visao mais ampla de trade-offs entre tempo de build e qualidade do codigo gerado.",
    },
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
