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
import type { Wave3PartATopicId } from "./wave3PartAVisuals";

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
  eyebrow: "Revisao",
  title: "Quiz de revisao",
  lead,
  interactive: "quiz",
  paragraphs: [
    "Use as perguntas para verificar se as ideias centrais ficaram conectadas. O objetivo nao e decorar slogans, e sim ganhar criterio para reconhecer o tipo de problema que esta diante de voce.",
  ],
});

const glossarySection = (lead: string): LessonSection => ({
  id: "glossario-proximos-passos",
  eyebrow: "Glossario",
  title: "Glossario e proximos passos",
  lead,
  interactive: "glossary",
  paragraphs: [
    "Consolidar vocabulario tecnico acelera muito a leitura de documentacao, papers, RFCs e cursos universitarios. Esta secao fecha a aula transformando intuicao em linguagem precisa.",
  ],
});

function buildContent(input: {
  id: Wave3PartATopicId;
  title: string;
  subtitle: string;
  description: string;
  secondaryCategoryId: string;
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
  timeline?: LessonContent["timeline"];
}): LessonContent {
  return {
    id: input.id,
    title: input.title,
    subtitle: input.subtitle,
    description: input.description,
    primaryCategoryId: "computacao",
    secondaryCategoryId: input.secondaryCategoryId,
    level: input.level,
    estimatedTime: input.estimatedTime,
    tags: input.tags,
    learningObjectives: input.learningObjectives,
    prerequisites: input.prerequisites,
    references: input.references,
    heroVisual: "hero",
    openingText: input.openingText,
    quickFacts: input.quickFacts,
    sections: [...input.coreSections, reviewSection(input.quizLead), glossarySection(input.glossaryLead)],
    quiz: input.quiz,
    glossary: input.glossary,
    summaryCards: input.summaryCards,
    timeline: input.timeline,
  };
}

export const turingEAIdeiaDeComputacaoContent = buildContent({
  id: "turing-e-a-ideia-de-computacao",
  title: "Turing e a Ideia de Computacao",
  subtitle:
    "Como uma fita imaginaria virou o modelo que separa o que e algoritmo, o que e dificil e o que e simplesmente impossivel para uma computacao geral.",
  description:
    "Uma aula sobre a maquina de Turing, a ideia de computabilidade, a tese de Church-Turing e os limites fundamentais que nasceram antes mesmo do computador eletronico moderno.",
  secondaryCategoryId: "historia-da-ciencia",
  level: "Intermediário",
  estimatedTime: "40-50 min",
  tags: [
    "Computabilidade",
    "Maquina de Turing",
    "Church-Turing",
    "Historia da Ciencia",
    "Teoria da Computacao",
  ],
  learningObjectives: [
    "Entender por que a pergunta 'o que e um algoritmo?' precisou de uma definicao formal.",
    "Explicar os componentes centrais de uma maquina de Turing e o que cada um abstrai.",
    "Diferenciar problema decidivel, reconhecivel e indecidivel sem confundir isso com mera lentidao.",
    "Entender a tese de Church-Turing como uma proposta sobre o alcance da nocao efetiva de calculo.",
    "Conectar a ideia de maquina universal com a nocao moderna de software programavel.",
  ],
  prerequisites: [
    "Curiosidade sobre a origem conceitual da computacao.",
    "Nocoes basicas de algoritmo como sequencia de passos.",
    "Disposicao para pensar em modelos abstratos, nao em hardware real.",
  ],
  references: [
    ref("Turing Machines", "Stanford Encyclopedia of Philosophy", "https://plato.stanford.edu/ENTRIES/turing-machine/", "Panorama filosofico e historico do modelo de Turing."),
    ref("Computability and Complexity", "Stanford Encyclopedia of Philosophy", "https://plato.stanford.edu/entries/computability/", "Explica computabilidade, decidibilidade e classes de complexidade."),
    ref("Automata, Computability, and Complexity", "MIT OpenCourseWare", "https://ocw.mit.edu/courses/6-045j-automata-computability-and-complexity-spring-2011/", "Curso universitario de referencia sobre os fundamentos formais."),
    ref("On Computable Numbers, with an Application to the Entscheidungsproblem", "MIT CSAIL mirror", "https://people.csail.mit.edu/brooks/idocs/Turing_Paper_1936.pdf", "Paper original de 1936."),
    ref("Turing machine", "Encyclopaedia Britannica", "https://www.britannica.com/technology/Turing-machine", "Entrada enciclopedica confiavel para contexto historico."),
    ref("Computational Complexity Theory", "Stanford Encyclopedia of Philosophy", "https://plato.stanford.edu/entries/computational-complexity/", "Boa ponte entre computabilidade e nocao de dificuldade."),
  ],
  openingText:
    "Em 1936, Alan Turing nao estava tentando vender um computador. Ele estava tentando responder uma pergunta muito mais profunda: quando dizemos que algo pode ser calculado, o que isso significa de forma precisa? A resposta exigiu uma maquina imaginaria ridiculamente simples: uma fita, um cabecote, alguns estados e uma tabela de regras. Essa austeridade foi uma virtude. Ao jogar fora detalhes de engenharia, Turing isolou a espinha dorsal do algoritmo. Foi assim que a computacao ganhou nao apenas uma origem historica, mas um criterio conceitual para distinguir o que e mecanicamente resolvivel, o que e apenas caro e o que fica fora do alcance de qualquer procedimento geral.",
  quickFacts: [
    card("Antes do hardware veio o conceito", "A maquina de Turing nasceu para formalizar a nocao de procedimento efetivo, nao para descrever um computador comercial."),
    card("Universalidade foi a virada", "Quando uma maquina pode simular a descricao de outra, programa e dado passam a habitar o mesmo universo simbolico."),
    card("Limite nao e lentidao", "Alguns problemas sao indecidiveis: nao faltam ciclos de CPU; falta um algoritmo geral que sempre termine corretamente."),
  ],
  coreSections: [
    section({
      id: "origem-do-problema",
      eyebrow: "Origem",
      title: "Antes do computador fisico veio a pergunta certa",
      lead:
        "A ideia de computacao nasceu quando matematicos perceberam que nao bastava ter intuicao sobre 'fazer contas': era preciso definir o que conta como procedimento mecanico geral.",
      visual: "flow",
      paragraphs: [
        "No inicio do seculo XX, uma das grandes ambicoes da logica era transformar partes da matematica em sistemas formais transparentes. Nesse contexto, perguntar se toda questao bem formulada podia ser decidida por regras finitas deixou de ser filosofia vaga e virou problema tecnico.",
        "Turing atacou essa pergunta reduzindo o ato de calcular a uma sequencia local de leituras, escritas e mudancas de estado. A genialidade esta justamente no corte: ele nao tentou imitar tudo o que um humano faz ao pensar; ele isolou o minimo necessario para falar de execucao mecanica.",
      ],
      blocks: [
        block("definition", "Procedimento efetivo", "Um metodo que pode ser descrito por regras finitas, aplicadas passo a passo, sem exigir intuicao criativa no meio da execucao."),
        block("insight", "Abstracao forte simplifica sem empobrecer", "Ao remover detalhes de engenharia, Turing ganhou uma linguagem limpa para discutir alcance e limite de algoritmos em geral."),
        block("example", "Divisao longa como algoritmo", "Mesmo um calculo escolar pode ser visto como uma rotina local: olhar simbolos, aplicar regra, escrever resultado parcial e seguir."),
      ],
    }),
    section({
      id: "anatomia-da-maquina",
      eyebrow: "Modelo",
      title: "Fita, cabecote, estados e regras: a anatomia da maquina de Turing",
      lead:
        "Cada componente da maquina existe para representar um aspecto diferente do que hoje chamamos de programa em execucao.",
      visual: "concept-map",
      paragraphs: [
        "A fita simboliza memoria externa; o cabecote le e escreve um simbolo por vez; os estados resumem o modo atual da computacao; e a tabela de transicao determina a proxima acao local. O conjunto parece pobre, mas essa pobreza e intencional: ela revela o que e estrutural em qualquer algoritmo.",
        "Quando falamos de 'configuracao' da maquina, estamos combinando posicao do cabecote, conteudo relevante da fita e estado atual. Computar vira entao uma caminhada entre configuracoes. Isso aproxima a nocao de programa da nocao de transformacao sistematica de simbolos.",
      ],
      blocks: [
        block("definition", "Maquina de Turing", "Modelo abstrato de computacao composto por memoria simbolica, cabecote leitor/escritor, estados finitos e regras locais de transicao."),
        block("mistake", "Imaginar que o valor da maquina esta no realismo fisico", "A maquina de Turing nao importa porque descreve um laptop por dentro, e sim porque captura o nucleo formal do que significa seguir um algoritmo."),
      ],
    }),
    section({
      id: "algoritmo-como-execucao",
      eyebrow: "Interacao",
      title: "Pensar computacao como execucao mecanica",
      lead:
        "Depois que a nocao de regra local fica clara, algoritmo deixa de ser intuicao nebulosa e passa a ser descricao operacional.",
      interactive: "model-lab",
      paragraphs: [
        "Uma licao profunda desta aula e que programa nao precisa ser imaginado primeiro como codigo em Python, JavaScript ou C. Em nivel conceitual, ele e uma estrategia finita que transforma configuracoes locais em outras configuracoes locais ate parar ou continuar indefinidamente.",
        "Essa visao e poderosa porque unifica linguagens diferentes sob a mesma pergunta: existe uma maneira geral, efetiva e mecanica de produzir a resposta? Se sim, falamos em computabilidade; se nao, a barreira e mais fundamental do que qualquer escolha de sintaxe.",
      ],
      blocks: [
        block("example", "Programa como tabela", "Em vez de 'funcao' ou 'metodo', pense numa lista de condicoes: se estou no estado X lendo Y, escrevo Z, movo para a direita e vou para o estado W."),
        block("insight", "Abstrair a linguagem revela o processo", "Trocar palavras de uma linguagem por regras de transicao ajuda a enxergar que o essencial da computacao mora na execucao, nao na superficie textual."),
      ],
    }),
    section({
      id: "memoria-e-poder",
      eyebrow: "Capacidade",
      title: "Mudar o modelo muda o tipo de padrao que conseguimos acompanhar",
      lead:
        "Parte do poder da teoria da computacao esta em mostrar que pequenas mudancas no modelo de memoria alteram radicalmente o que ele consegue reconhecer ou decidir.",
      interactive: "tradeoff-lab",
      paragraphs: [
        "Um automato finito, por exemplo, e excelente para reconhecer certos padroes locais, mas nao consegue contar arbitrariamente ou manter combinacoes mais ricas de contexto. Introduzir pilha ou memoria mais geral amplia o alcance do modelo e abre caminho para linguagens e algoritmos mais sofisticados.",
        "Essa escalada ajuda a entender por que compiladores, verificadores e analisadores usam modelos diferentes em momentos diferentes. Nem todo problema exige uma maquina universal, mas saber qual poder expressivo e necessario impede tanto exagero quanto subestimacao.",
      ],
      blocks: [
        block("definition", "Poder expressivo", "Capacidade de um modelo representar ou reconhecer determinadas familias de problemas e linguagens."),
        block("example", "Padroes regulares versus aninhamentos", "Reconhecer repeticoes simples e diferente de acompanhar estruturas aninhadas ou transformacoes gerais sobre uma fita de simbolos."),
      ],
    }),
    section({
      id: "decidivel-vs-indecidivel",
      eyebrow: "Limites",
      title: "Nem todo problema bem formulado admite algoritmo geral",
      lead:
        "A teoria fica adulta quando percebe que algumas perguntas nao sao apenas caras: elas escapam de qualquer procedimento universal que sempre termine com a resposta correta.",
      visual: "compare",
      paragraphs: [
        "Problemas decidiveis admitem um algoritmo que sempre para. Entre eles ha os faceis e os inviaveis na pratica, mas a diferenca continua sendo quantitativa. Ja problemas indecidiveis cruzam uma fronteira qualitativa: nao existe algoritmo geral que sirva para todos os casos da classe.",
        "O problema da parada e o exemplo canonico. Ele mostra que querer um programa que diga, para qualquer programa e qualquer entrada, se a execucao vai terminar ou nao, esbarra numa contradicao estrutural. O resultado nao mata a analise de programas; ele ensina onde a analise precisa ser parcial, aproximada ou restrita.",
      ],
      blocks: [
        block("definition", "Problema decidivel", "Problema para o qual existe um algoritmo geral que sempre termina e devolve a resposta correta em toda entrada valida."),
        block("mistake", "Confundir indecidivel com muito lento", "Lentidao ainda pressupoe que exista um algoritmo geral. Indecidibilidade diz que essa garantia universal simplesmente nao existe."),
      ],
    }),
    section({
      id: "legado-e-atualidade",
      eyebrow: "Atualidade",
      title: "Por que essa ideia ainda importa em compiladores, verificadores e IA",
      lead:
        "A maquina de Turing nao ficou presa em 1936. Ela continua sendo o pano de fundo quando discutimos interpretadores, simulacao, limites de analise e o proprio significado de software geral.",
      interactive: "scenario-lab",
      paragraphs: [
        "Sempre que um sistema executa instrucoes descritas externamente, estamos vivendo alguma forma de universalidade. Sempre que uma ferramenta promete 'provar' propriedades de qualquer programa, estamos rocando a borda da indecidibilidade. E sempre que discutimos custo, entramos na regiao vizinha entre computabilidade e complexidade.",
        "A grande maturidade conceitual vem de nao pedir a teoria o que ela nao promete. Ela nao nos diz como escrever um app bonito, mas nos diz quais sonhos de automacao sao realistas, quais exigem compromissos e quais tropeçam em limites formais inevitaveis.",
      ],
      blocks: [
        block("insight", "A teoria protege contra promessas magicas", "Ferramentas reais ficam melhores quando seus autores sabem distinguir analise parcial, heuristica e garantia universal."),
        block("example", "Verificacao com recortes", "Model checkers e analisadores estaticos costumam funcionar muito bem dentro de linguagens, dominios ou classes de propriedade cuidadosamente delimitados."),
      ],
    }),
  ],
  quizLead: "Revise maquina de Turing, computabilidade, universalidade e os limites entre o que e dificil e o que e impossivel em sentido formal.",
  glossaryLead: "Feche a aula dominando o vocabulario que sustenta computabilidade, decidibilidade e teoria da computacao.",
  quiz: [
    q("q1", "Qual era a motivacao central da maquina de Turing?", [["a", "Formalizar o que conta como procedimento mecanico geral."], ["b", "Construir o primeiro laptop eletrico."], ["c", "Substituir toda a logica matematica por engenharia eletrica."]], "a", "A maquina de Turing nasceu como modelo abstrato de computacao efetiva, nao como produto fisico."),
    q("q2", "Na maquina de Turing, o que a fita representa?", [["a", "Memoria simbolica sobre a qual a computacao opera."], ["b", "A fonte de energia do algoritmo."], ["c", "Uma lista de programas paralelos."]], "a", "A fita abstrai o espaco onde a entrada e os simbolos intermediarios podem ser lidos e escritos."),
    q("q3", "O que torna uma maquina 'universal'?", [["a", "Ela simula a descricao de outras maquinas."], ["b", "Ela usa infinitos processadores em paralelo."], ["c", "Ela responde qualquer pergunta em tempo constante."]], "a", "Universalidade significa poder interpretar a codificacao de outras maquinas e imitar seu comportamento."),
    q("q4", "Problema decidivel significa que...", [["a", "Existe algoritmo geral que sempre termina com a resposta correta."], ["b", "O problema e facil na pratica."], ["c", "O problema so pode ser resolvido por heuristica."]], "a", "Decidivel nao quer dizer facil; quer dizer que existe um procedimento geral que para sempre."),
    q("q5", "Qual e o erro classico ao falar de indecidibilidade?", [["a", "Confundir 'nao existe algoritmo geral' com 'o algoritmo seria lento demais'."], ["b", "Achar que memoria influencia o poder do modelo."], ["c", "Pensar que linguagens diferentes implementam a mesma ideia geral de algoritmo."]], "a", "Indecidibilidade e limite qualitativo, nao apenas custo alto."),
    q("q6", "O problema da parada e importante porque...", [["a", "Mostra um limite estrutural de algoritmos gerais sobre programas."], ["b", "Prova que software moderno e impossivel."], ["c", "Demonstra que toda execucao termina cedo ou tarde."]], "a", "Ele mostra que nao ha procedimento universal que determine corretamente, para qualquer programa e entrada, se a execucao vai parar."),
    q("q7", "A tese de Church-Turing afirma, em linhas gerais, que...", [["a", "Todo procedimento efetivamente computavel pode ser capturado por um modelo equivalente ao de Turing."], ["b", "Toda maquina fisica deve parecer uma fita infinita."], ["c", "Todo problema decidivel e eficiente."]], "a", "A tese relaciona a nocao intuitiva de calculo efetivo a modelos formais equivalentes em poder computacional."),
    q("q8", "Por que essa teoria ainda importa hoje?", [["a", "Porque ajuda a distinguir garantia universal, heuristica e limite formal em software real."], ["b", "Porque computadores modernos funcionam literalmente como fitas de papel."], ["c", "Porque substitui a necessidade de medir sistemas reais."]], "a", "A teoria continua orientando verificacao, linguagens, compiladores e expectativas realistas sobre automacao."),
  ],
  glossary: [
    g("Algoritmo", "Descricao finita de um procedimento executavel passo a passo."),
    g("Computabilidade", "Estudo do que pode ou nao pode ser resolvido por procedimentos efetivos gerais."),
    g("Maquina de Turing", "Modelo abstrato que formaliza a execucao mecanica de regras sobre simbolos."),
    g("Fita", "Memoria simbolica usada pela maquina para ler e escrever dados."),
    g("Estado", "Resumo finito do contexto atual da execucao."),
    g("Tabela de transicao", "Conjunto de regras que mapeia estado e simbolo lido para a proxima acao."),
    g("Maquina universal", "Maquina capaz de simular a descricao de outras maquinas."),
    g("Problema decidivel", "Problema para o qual existe algoritmo geral que sempre termina corretamente."),
    g("Problema indecidivel", "Problema para o qual nao existe algoritmo geral capaz de decidir todos os casos."),
    g("Problema da parada", "Pergunta sobre se um programa arbitrario termina ou roda indefinidamente numa dada entrada."),
    g("Tese de Church-Turing", "Hipotese de que a nocao intuitiva de calculo efetivo coincide com modelos equivalentes ao de Turing."),
  ],
  summaryCards: [
    card("A pergunta central", "Computacao comeca quando definimos o que conta como procedimento mecanico geral."),
    card("O modelo minimo", "Fita, cabecote, estados e regras bastam para formalizar execucao algoritmica."),
    card("Universalidade", "Programas e dados podem compartilhar o mesmo suporte simbolico."),
    card("Limites", "Indecidibilidade nao e lentidao; e ausencia de algoritmo geral que sempre termine."),
    card("Legado", "A teoria orienta verificacao, interpretacao, linguagens e expectativas realistas sobre automacao."),
  ],
});

export const algoritmosEComplexidadeContent = buildContent({
  id: "algoritmos-e-complexidade",
  title: "Algoritmos e Complexidade (Big-O na pratica)",
  subtitle:
    "Como comparar solucoes sem virar refem do cronometro da sua maquina: crescimento de custo, casos de analise e o ponto em que a curva vence a intuicao local.",
  description:
    "Uma aula sobre entrada, operacao dominante, notacao assintotica, piores e medios casos, custo amortizado e a relacao entre teoria de crescimento e desempenho real.",
  secondaryCategoryId: "matematica",
  level: "Intermediário",
  estimatedTime: "40-50 min",
  tags: ["Algoritmos", "Complexidade", "Big-O", "Analise Assintotica", "Estruturas de Dados"],
  learningObjectives: [
    "Entender por que medir crescimento e mais util do que medir segundos isolados.",
    "Diferenciar Big-O, Theta e Omega como notacoes de limite, nao como tempo exato.",
    "Reconhecer o papel de n, da operacao dominante e do modelo de entrada.",
    "Distinguir pior caso, caso medio e analise amortizada.",
    "Saber quando a complexidade teorica resolve a escolha e quando a observacao empirica ainda precisa entrar.",
  ],
  prerequisites: [
    "Nocao basica de algoritmo e repeticao.",
    "Conforto com a ideia de crescimento de funcoes simples.",
    "Curiosidade sobre como escolher entre solucoes diferentes para o mesmo problema.",
  ],
  references: [
    ref("Introduction to Algorithms - Lecture Notes", "MIT OpenCourseWare", "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/pages/lecture-notes/", "Curso introdutorio com foco em algoritmos e estruturas."),
    ref("Design and Analysis of Algorithms - Lecture Notes", "MIT OpenCourseWare", "https://ocw.mit.edu/courses/6-046j-design-and-analysis-of-algorithms-spring-2015/pages/lecture-notes/", "Curso com discussoes mais explicitamente analiticas."),
    ref("Computational Complexity Theory", "Stanford Encyclopedia of Philosophy", "https://plato.stanford.edu/entries/computational-complexity/", "Explica o pano de fundo teorico da nocao de dificuldade."),
    ref("Computability and Complexity", "Stanford Encyclopedia of Philosophy", "https://plato.stanford.edu/entries/computability/", "Boa ponte entre computabilidade e classes de custo."),
    ref("Mergesort", "Princeton Algorithms, 4th Edition", "https://algs4.cs.princeton.edu/22mergesort/", "Exemplo classico de analise n log n e recursao."),
    ref("Comparison-Based Sorting", "Open Data Structures", "https://opendatastructures.org/versions/edition-0.1f/ods-cpp/11_1_Comparison_Based_Sorti.html", "Discussao clara sobre comparacoes e recorrencias de sorting."),
  ],
  openingText:
    "Quando um iniciante pergunta se um algoritmo e 'rapido', a tentacao e abrir o terminal, rodar um benchmark e declarar vencedor. Essa resposta funciona para uma entrada, numa maquina, numa linguagem e numa implementacao especificas. O problema e que sistemas crescem, dados mudam e gargalos migram. A analise de complexidade surgiu justamente para criar uma linguagem mais robusta: em vez de perguntar quantos milissegundos gastamos hoje, perguntamos como o trabalho cresce quando a entrada cresce. Big-O e valioso porque troca fotografia local por tendencia estrutural. Mas ele fica realmente util quando voce tambem sabe o que ele nao esta dizendo.",
  quickFacts: [
    card("Complexidade fala de crescimento", "A pergunta principal e como o custo muda quando a entrada aumenta, nao quanto demorou num notebook especifico."),
    card("Big-O e limite superior assintotico", "Ele descreve ordem de crescimento dominante e ignora detalhes locais que param de importar em grande escala."),
    card("Teoria nao mata medicao", "Constantes, cache, linguagem e distribuicao de dados continuam importantes para a escolha final no mundo real."),
  ],
  coreSections: [
    section({
      id: "por-que-crescimento-importa",
      eyebrow: "Ponto de partida",
      title: "Cronometro local engana quando o sistema cresce",
      lead:
        "Uma medicao isolada pode ser util para tuning, mas e fraca como criterio geral de escolha entre algoritmos.",
      visual: "flow",
      paragraphs: [
        "Se um algoritmo leva 2 ms hoje e outro leva 5 ms, ainda nao sabemos qual escala melhor. Talvez o primeiro faca trabalho quadraticamente e o segundo cresca quase linearmente. Em entradas pequenas, a curva pior pode parecer boa por causa de constantes, alocacao ou ate otimizacoes do compilador.",
        "Analise de complexidade e a arte de abstrair esses detalhes temporariamente para enxergar a forma do crescimento. Isso nao substitui experimento; prepara um mapa para saber quais estradas sequer valem medir com seriedade.",
      ],
      blocks: [
        block("definition", "Tamanho da entrada (n)", "Parametro que descreve o que esta crescendo no problema: numero de elementos, vertices, bytes, linhas ou outro recurso relevante."),
        block("mistake", "Confundir benchmark curto com verdade geral", "Medir pouco e util para tuning local, mas nao revela automaticamente o comportamento estrutural para entradas maiores ou distribuicoes diferentes."),
      ],
    }),
    section({
      id: "notacoes-e-modelo",
      eyebrow: "Linguagem",
      title: "Big-O, Theta e Omega falam de limites, nao de segundos exatos",
      lead:
        "As notacoes assintoticas existem para falar com precisao sobre tendencia dominante de crescimento.",
      visual: "concept-map",
      paragraphs: [
        "O, Theta e Omega ajudam a expressar relacoes entre funcoes de custo quando n cresce. O simbolo mais popular e Big-O, que oferece um limite superior assintotico. Ele nao pretende ser um cronometro literal nem uma media empacotada.",
        "Para usar essas notacoes bem, voce precisa de duas escolhas conscientes: que medida de entrada esta crescendo e qual operacao ou conjunto de operacoes representa o trabalho relevante do algoritmo. Sem isso, a complexidade vira slogan em vez de analise.",
      ],
      blocks: [
        block("definition", "Notacao assintotica", "Forma de descrever como uma funcao cresce quando o tamanho da entrada tende a ficar grande."),
        block("insight", "A simplificacao e deliberada", "Ignorar constantes e termos menores nao e descuido: e uma maneira de destacar o comportamento que eventualmente domina."),
      ],
    }),
    section({
      id: "familias-de-crescimento",
      eyebrow: "Interacao",
      title: "Olhar curvas ajuda a escolher onde investigar",
      lead:
        "Entre O(log n), O(n), O(n log n) e O(n^2), a diferenca relevante aparece quando n deixa de ser pequeno.",
      interactive: "model-lab",
      paragraphs: [
        "Pensar em familias de crescimento e mais poderoso do que decorar nomes. Cada familia carrega uma intuicao operacional: logaritmico elimina grandes porcoes do espaco de busca, linear visita elementos uma vez, n log n costuma misturar divisao e recombinacao, quadraticos frequentemente comparam muitos pares.",
        "A funcao da analise e filtrar o espaco de design. Se um produto precisa escalar muito e a alternativa dominante atual e O(n^2), talvez o problema central nao seja otimizar o loop: seja trocar de estrategia.",
      ],
      blocks: [
        block("example", "Busca binaria versus varredura", "Se a estrutura de dados estiver ordenada, reduzir o espaco pela metade a cada passo muda radicalmente a historia."),
        block("insight", "Curva boa orienta arquitetura", "Muitas decisoes de produto e backend acabam sendo escolhas de familia algoritmica disfarcadas de implementacao."),
      ],
    }),
    section({
      id: "constantes-e-casos",
      eyebrow: "Interacao",
      title: "Constantes importam, mas nao governam para sempre",
      lead:
        "A pratica exige duas ideias ao mesmo tempo: assintotica para direcao e detalhe para fechamento da escolha.",
      interactive: "tradeoff-lab",
      paragraphs: [
        "Em tamanhos pequenos, um algoritmo teoricamente pior pode vencer por causa de cache, vetorizacao, codigo nativo ou simplesmente menos sobrecarga. Isso e normal e nao 'refuta' a analise assintotica. Apenas mostra que a curva dominante ainda nao teve chance de governar o jogo.",
        "Tambem importa perguntar de que caso estamos falando. Pior caso protege contra surpresas, caso medio depende de modelo probabilistico razoavel e analise amortizada fala sobre sequencias longas de operacoes, nao sobre latencia maxima de uma unica chamada.",
      ],
      blocks: [
        block("definition", "Analise amortizada", "Forma de distribuir custos raros e altos ao longo de muitas operacoes, produzindo uma media estrutural por operacao."),
        block("mistake", "Ler Big-O como tempo real", "Dizer 'isso e O(n)' nao significa que duas implementacoes lineares terao tempos parecidos em entradas pequenas ou ambientes diferentes."),
      ],
    }),
    section({
      id: "mundo-real-e-complexidade",
      eyebrow: "Nuance",
      title: "Dados, cache e ambiente mudam a pratica sem invalidar a teoria",
      lead:
        "Complexidade e uma lente estrutural; desempenho real ainda depende de como o algoritmo encontra memoria, dados e hardware.",
      visual: "compare",
      paragraphs: [
        "A mesma classe assintotica pode esconder comportamentos praticos bem diferentes. Uma estrutura contigua em memoria pode explorar localidade de cache; outra, teoricamente parecida, pode sofrer com ponteiros dispersos. Em sistemas reais, isso muda latencia observada e throughput de forma importante.",
        "A maturidade esta em combinar niveis de analise. Primeiro, descarte opcoes estruturalmente ruins para o regime de escala esperado. Depois, meca candidatas plausiveis no ambiente real. Teoria e benchmark nao competem; eles se corrigem mutuamente.",
      ],
      blocks: [
        block("example", "Mesma classe, experiencia diferente", "Duas implementacoes O(n) podem divergir muito se uma percorre memoria contigua e outra depende de acessos dispersos com pouca localidade."),
        block("insight", "Complexidade reduz busca, nao fecha debate sozinha", "Escolher bem costuma ser um processo em duas fases: modelar e depois medir."),
      ],
    }),
    section({
      id: "escolha-orientada-a-cenario",
      eyebrow: "Interacao",
      title: "O melhor argumento muda com o contexto do produto",
      lead:
        "Entradas pequenas, picos adversariais e sequencias longas pedem leituras diferentes da mesma biblioteca de tecnicas.",
      interactive: "scenario-lab",
      paragraphs: [
        "Uma feature interna usada com dezenas de itens por vez talvez priorize clareza e baixa constante. Um motor de recomendacao com milhoes de registros, nao. Uma API exposta a entradas maliciosas tambem enxerga pior caso com outros olhos. Complexidade so ganha valor quando e ligada a um contexto de uso real.",
        "Em resumo: Big-O nao responde 'qual algoritmo e melhor?' no vazio. Ele responde algo mais util: 'qual tipo de crescimento esta embutido nesta ideia e quando isso pode virar problema?'.",
      ],
      blocks: [
        block("insight", "A pergunta certa antecede a formula", "Antes de comparar classes, defina escala esperada, sensibilidade a picos e custo de manutencao."),
        block("example", "Fila dinamica", "Uma estrutura com picos de realocacao pode ser excelente na media, mas inadequada quando latencia maxima por operacao e requisito duro."),
      ],
    }),
  ],
  quizLead: "Revise crescimento, notacao assintotica, casos de analise e a relacao entre teoria de custo e desempenho observado.",
  glossaryLead: "Feche a aula dominando o vocabulario necessario para discutir complexidade com precisao em vez de repetir slogans.",
  quiz: [
    q("q1", "Qual e a principal pergunta da analise de complexidade?", [["a", "Como o custo cresce quando a entrada cresce."], ["b", "Quantos milissegundos o notebook do autor levou para executar."], ["c", "Qual linguagem de programacao parece mais elegante."]], "a", "Complexidade mede tendencia de crescimento em funcao da entrada, nao um tempo local isolado."),
    q("q2", "Big-O descreve principalmente...", [["a", "Um limite superior assintotico."], ["b", "A media exata de execucao em toda maquina."], ["c", "O uso real de CPU em porcentagem."]], "a", "Big-O fala de limite superior da ordem de crescimento quando n fica grande."),
    q("q3", "Por que precisamos definir bem n?", [["a", "Porque sem uma medida coerente de entrada a comparacao fica mal formulada."], ["b", "Porque todo algoritmo exige exatamente um unico tipo de n."], ["c", "Porque Big-O so funciona para listas."]], "a", "O tamanho relevante da entrada depende do problema; escolher mal n distorce a analise."),
    q("q4", "Qual afirmacao esta correta?", [["a", "Constantes ainda importam em entradas pequenas e na pratica."], ["b", "Constantes nunca importam se duas solucoes estao na mesma classe."], ["c", "Big-O elimina a necessidade de medir qualquer sistema real."]], "a", "A assintotica simplifica a comparacao, mas nao apaga detalhes praticos do ambiente real."),
    q("q5", "Analise amortizada e mais adequada quando...", [["a", "Custos raros e altos aparecem numa longa sequencia de operacoes."], ["b", "Queremos provar indecidibilidade."], ["c", "O pior caso nunca importa."]], "a", "Amortizado distribui picos ao longo de muitas operacoes e nao descreve latencia maxima individual."),
    q("q6", "Se um algoritmo O(n^2) vence um O(n log n) numa entrada pequena, isso significa que...", [["a", "A assintotica foi refutada."], ["b", "Constantes e detalhes locais ainda dominam nesse regime."], ["c", "O segundo algoritmo esta necessariamente errado."]], "b", "Em pequena escala, constantes e cache podem vencer antes de a curva dominante assumir o controle."),
    q("q7", "Qual caso de analise costuma ser preferido em contexto adversarial?", [["a", "Pior caso."], ["b", "Caso medio com entrada amigavel."], ["c", "Apenas amortizado."]], "a", "Se a entrada pode ser escolhida para explorar fraquezas, pior caso ganha prioridade."),
    q("q8", "A melhor relacao entre teoria e benchmark e...", [["a", "Teoria filtra familias promissoras e benchmark fecha a escolha em contexto real."], ["b", "Benchmark substitui qualquer modelo."], ["c", "So a teoria importa em producao."]], "a", "Escolhas maduras usam analise estrutural para reduzir a busca e medicao empirica para validar no ambiente concreto."),
  ],
  glossary: [
    g("Complexidade", "Descricao de como o custo de um algoritmo cresce com a entrada."),
    g("n", "Medida do tamanho relevante da entrada."),
    g("Operacao dominante", "Parte do trabalho que mais influencia o crescimento do custo total."),
    g("Big-O", "Limite superior assintotico para a ordem de crescimento."),
    g("Theta", "Notacao que indica limite assintotico apertado, de mesma ordem de crescimento."),
    g("Omega", "Limite inferior assintotico para a ordem de crescimento."),
    g("Pior caso", "Maior custo possivel entre todas as entradas de mesmo tamanho."),
    g("Caso medio", "Custo esperado segundo um modelo de distribuicao de entradas."),
    g("Analise amortizada", "Custo medio estrutural por operacao numa sequencia longa, levando em conta picos raros."),
    g("Assintotico", "Relacionado ao comportamento da funcao quando a entrada cresce muito."),
    g("Localidade de cache", "Propriedade pratica de acesso a memoria que pode alterar bastante o desempenho observado."),
  ],
  summaryCards: [
    card("A pergunta certa", "Complexidade pergunta como o custo cresce, nao quanto demorou num experimento local."),
    card("Notacoes", "Big-O, Theta e Omega falam de limites de crescimento, nao de tempos exatos."),
    card("Casos", "Pior caso, medio e amortizado respondem perguntas diferentes e nao sao intercambiaveis."),
    card("Pratica", "Constantes, cache e dados reais continuam relevantes para a decisao final."),
    card("Metodo", "Modelar primeiro e medir depois produz escolhas muito melhores do que confiar em um numero isolado."),
  ],
});


export const estruturasDeDadosEssenciaisContent = buildContent({
  id: "estruturas-de-dados-essenciais",
  title: "Estruturas de Dados Essenciais",
  subtitle:
    "Array, lista, hash, arvore e grafo como respostas diferentes para a mesma pergunta: quais operacoes seu sistema precisa fazer bem o tempo todo?",
  description:
    "Uma aula sobre como estruturas de dados moldam custo, expressividade e clareza: acesso, insercao, ordem, conectividade e invariantes.",
  secondaryCategoryId: "matematica",
  level: "Intermediário",
  estimatedTime: "40-50 min",
  tags: ["Estruturas de Dados", "Array", "Hash Table", "Arvores", "Grafos"],
  learningObjectives: [
    "Entender que estrutura de dados e escolha de organizacao, nao lista de nomes para decorar.",
    "Comparar arrays, listas, hashes, arvores e grafos pelas operacoes que privilegiam.",
    "Reconhecer o papel de invariantes como ordenacao, balanceamento e unicidade.",
    "Saber mapear casos de uso praticos para estruturas predominantes ou combinadas.",
    "Perceber como estrutura errada degrada ate algoritmos conceitualmente bons.",
  ],
  prerequisites: [
    "Familiaridade basica com colecoes de elementos.",
    "Nocao intuitiva de busca, insercao e remocao.",
    "Disposicao para comparar trade-offs em vez de procurar um vencedor universal.",
  ],
  references: [
    ref("Introduction to Algorithms - Lecture Notes", "MIT OpenCourseWare", "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/pages/lecture-notes/", "Notas com arrays, hashing, arvores e grafos."),
    ref("Open Data Structures", "Pat Morin", "https://opendatastructures.org/", "Livro aberto e didatico sobre estruturas fundamentais."),
    ref("Algorithms, 4th Edition", "Princeton University", "https://algs4.cs.princeton.edu/home/", "Referencia classica com implementacoes e intuicoes."),
    ref("Universal & Perfect Hashing", "MIT OpenCourseWare", "https://ocw.mit.edu/courses/6-046j-design-and-analysis-of-algorithms-spring-2015/resources/lecture-8-randomization-universal-perfect-hashing/", "Aprofunda intuicao sobre hashing."),
    ref("Design and Analysis of Algorithms - Lecture Notes", "MIT OpenCourseWare", "https://ocw.mit.edu/courses/6-046j-design-and-analysis-of-algorithms-spring-2015/pages/lecture-notes/", "Bom complemento para estruturas e custos."),
  ],
  openingText:
    "Toda estrutura de dados e uma aposta sobre o futuro. Quando voce escolhe um array, esta apostando que acesso por indice e localidade de memoria importarao muito. Quando escolhe um hash, aposta que igualdade por chave vale mais do que ordem. Quando parte para uma arvore ou grafo, admite que o formato das relacoes e parte do problema. O erro classico de muita programacao iniciante e tratar estruturas como recipientes neutros onde jogamos valores. Elas nao sao neutras. Elas sao decisoes arquitetonicas pequenas e frequentes, capazes de transformar busca, escrita, depuracao e escalabilidade.",
  quickFacts: [
    card("Estrutura e contrato operacional", "A pergunta central nao e 'onde guardar?', mas 'que operacoes preciso fazer bem e com que invariantes?'."),
    card("Nao existe campea universal", "Cada estrutura privilegia algumas operacoes e paga por isso em outras dimensoes."),
    card("Invariante cobra manutencao", "Ordem, balanceamento e mapeamento rapido sao poderosos, mas exigem trabalho estrutural continuo."),
  ],
  coreSections: [
    section({
      id: "dados-com-forma",
      eyebrow: "Intuicao",
      title: "Estruturas de dados dao forma ao problema",
      lead:
        "A mesma colecao de elementos pode ser pensada como lista linear, dicionario por chave, hierarquia ordenada ou rede de conexoes.",
      visual: "flow",
      paragraphs: [
        "Quando uma aplicacao precisa consultar um item por posicao, um array parece natural. Quando precisa associar usuarios a sessoes, um hash aparece quase automaticamente. Quando precisa responder prefixos ordenados ou navegar por relacionamentos, a historia muda de figura.",
        "Por isso, estrutura de dados nao e um capitulo auxiliar de algoritmos. Ela e parte do proprio raciocinio sobre o problema. Escolher bem muitas vezes significa enxergar antes quais perguntas a aplicacao fara repetidamente.",
      ],
      blocks: [
        block("definition", "Estrutura de dados", "Forma organizada de representar elementos e relacoes de modo que certas operacoes fiquem naturais ou eficientes."),
        block("mistake", "Pensar primeiro no tipo, e nao nas operacoes", "Escolher por costume leva a estruturas populares em contextos onde elas nao respondem bem as perguntas dominantes do sistema."),
      ],
    }),
    section({
      id: "familias-centrais",
      eyebrow: "Mapa",
      title: "Array, lista, hash, arvore e grafo respondem perguntas diferentes",
      lead:
        "Cada familia estrutural enfatiza um aspecto: posicao, edicao local, associacao por chave, ordem hierarquica ou conectividade geral.",
      visual: "concept-map",
      paragraphs: [
        "Arrays oferecem acesso indexado e localidade; listas encadeadas flexibilizam montagem local; hashes convertem chaves em posicoes provaveis; arvores mantem regras estruturais que favorecem buscas ordenadas; grafos abandonam linearidade para modelar relacoes gerais entre entidades.",
        "A intencao nao e decorar uma tabela. E perceber que a forma da estrutura precisa conversar com a forma da pergunta. Se o problema e de caminho ou conectividade, um array puro ja nasceu torto para a tarefa principal.",
      ],
      blocks: [
        block("insight", "Estrutura boa reduz acrobacia", "Quando a representacao combina com o dominio, o algoritmo fica mais simples, mais legivel e menos sujeito a gambiarras."),
      ],
    }),
    section({
      id: "custos-relativos",
      eyebrow: "Interacao",
      title: "O mesmo dado custa diferente dependendo da operacao",
      lead:
        "Leitura, escrita, remocao, percurso ordenado e consulta por relacao valorizam estruturas diferentes.",
      interactive: "model-lab",
      paragraphs: [
        "Arrays parecem incriveis enquanto a pergunta principal e 'qual e o elemento na posicao k?'. Eles deixam de parecer incriveis quando cada insercao no meio desloca muita coisa. Hashes brilham para igualdade de chave, mas tropeçam quando precisamos varrer em ordem ou fazer consultas por intervalo.",
        "Esse tipo de comparacao ensina algo mais profundo do que custo: ele mostra que estrutura de dados e escolha de perspectiva. Organizar para uma pergunta quase sempre complica outra.",
      ],
      blocks: [
        block("example", "Autocomplete", "Se a aplicacao depende de prefixos e ordem lexicografica, um hash puro costuma esconder justamente a estrutura que a consulta pede."),
        block("definition", "Trade-off estrutural", "Ganho sistematico em algumas operacoes obtido ao custo de piora, perda de ordem ou maior manutencao em outras."),
      ],
    }),
    section({
      id: "ajuste-por-prioridade",
      eyebrow: "Interacao",
      title: "Quando a prioridade muda, a recomendacao estrutural muda junto",
      lead:
        "Nao basta saber que uma estrutura e 'rapida'. E preciso saber rapida para o que, em que frequencia e sob quais invariantes.",
      interactive: "tradeoff-lab",
      paragraphs: [
        "Muitos sistemas combinam varias estruturas justamente porque requisitos entram em conflito. Um cache pode usar hash para localizar itens, fila ou lista para politica de expiracao e contadores auxiliares para metrica. O desenho real raramente e monocromatico.",
        "A boa noticia e que essa complexidade pode ser pensada sistematicamente: defina operacoes dominantes, peso de ordem, aceitacao de colisoes, necessidade de conectividade e custo de manutencao. A escolha deixa de ser supersticao e vira criterio.",
      ],
      blocks: [
        block("insight", "Estruturas compostas sao comuns", "Projetos reais frequentemente combinam duas ou tres estruturas para satisfazer contratos operacionais diferentes sobre o mesmo conjunto de dados."),
        block("mistake", "Querer uma estrutura que otimize tudo", "Tentar ganhar em acesso, insercao arbitraria, ordenacao global e consultas estruturadas ao mesmo tempo quase sempre empurra custo para algum canto."),
      ],
    }),
    section({
      id: "invariantes-e-manutencao",
      eyebrow: "Nuance",
      title: "Invariantes entregam poder, mas cobram manutencao",
      lead:
        "Ordem, balanceamento e organizacao por niveis nao aparecem de graca; alguem precisa preserva-los a cada atualizacao.",
      visual: "compare",
      paragraphs: [
        "Uma arvore balanceada, por exemplo, nao vale por ser 'arvore'. Ela vale por manter propriedades que limitam profundidade e preservam eficiencia de busca. O mesmo raciocinio vale para heaps, tries e outros formatos: o beneficio operacional depende de um compromisso estrutural continuo.",
        "Esse custo de manutencao nao e desvantagem absoluta. Ele e o preco de um contrato mais forte. A pergunta madura nao e 'ha manutencao?', mas 'o ganho que a invariante traz justifica pagar por ela neste dominio?'.",
      ],
      blocks: [
        block("definition", "Invariante", "Propriedade estrutural que deve permanecer verdadeira ao longo das operacoes para que a estrutura entregue o comportamento esperado."),
        block("example", "Balanceamento", "Limitar altura em estruturas hierarquicas e uma forma de impedir que boas ideias degenerem em percursos quase lineares."),
      ],
    }),
    section({
      id: "mapeando-casos-reais",
      eyebrow: "Interacao",
      title: "Casos de uso reais revelam por que estrutura e modelagem andam juntas",
      lead:
        "Caches, autocomplete, undo e redes sociais pedem representacoes diferentes porque fazem perguntas diferentes sobre os dados.",
      interactive: "scenario-lab",
      paragraphs: [
        "Quando a estrutura acompanha a semantica do dominio, o algoritmo para de lutar contra a representacao. Muitas dores de manutencao surgem exatamente quando insistimos em forcar uma estrutura familiar sobre um problema cuja topologia e outra.",
        "Por isso, aprender estruturas de dados nao e decorar uma zoologia. E aprender a reconhecer que tipo de relacao o problema expressa e qual custo operacional o produto esta disposto a aceitar repetidamente.",
      ],
      blocks: [
        block("insight", "Modelagem errada vaza para todo o sistema", "Uma representacao fraca obriga gambiarras em consulta, persistencia, indexacao e depuracao."),
        block("example", "Undo", "Quando a semantica natural ja e LIFO, usar pilha faz o codigo expressar a ideia do produto em vez de esconder a ideia sob remendos."),
      ],
    }),
  ],
  quizLead: "Revise estruturas basicas, operacoes dominantes, invariantes e o processo de escolher representacoes adequadas para o problema.",
  glossaryLead: "Feche a aula consolidando o vocabulario que permite comparar estruturas de dados com criterio operacional.",
  quiz: [
    q("q1", "Qual pergunta deve vir antes de escolher uma estrutura de dados?", [["a", "Quais operacoes o sistema precisa fazer bem com mais frequencia."], ["b", "Qual estrutura apareceu mais em entrevistas."], ["c", "Qual nome parece mais sofisticado."]], "a", "Estrutura boa depende das operacoes dominantes e dos invariantes exigidos."),
    q("q2", "Por que arrays sao atraentes?", [["a", "Porque oferecem acesso por indice e boa localidade de memoria."], ["b", "Porque sempre vencem em insercao no meio."], ["c", "Porque mantem automaticamente relacoes de grafo."]], "a", "Arrays brilham em acesso indexado e percursos contiguos em memoria."),
    q("q3", "Qual e a grande virtude de hash tables?", [["a", "Mapear chaves para valores com acesso medio rapido."], ["b", "Garantir ordem lexicografica nativa."], ["c", "Representar conectividade arbitraria entre entidades."]], "a", "Hashes sao muito fortes para igualdade por chave, mas nao para ordem global."),
    q("q4", "Quando uma arvore costuma fazer mais sentido que um hash puro?", [["a", "Quando ordem e consultas estruturadas importam."], ["b", "Quando nao existe qualquer invariante a manter."], ["c", "Quando o problema e puramente um mapeamento por igualdade de chave."]], "a", "Arvores entram quando o ganho de ordem ou hierarquia justifica manter invariantes adicionais."),
    q("q5", "O que e uma invariante estrutural?", [["a", "Propriedade que a estrutura preserva para continuar entregando o comportamento esperado."], ["b", "Valor imutavel que nunca muda na aplicacao."], ["c", "Atalho para evitar qualquer manutencao interna."]], "a", "Ordenacao, balanceamento e outras propriedades sao invariantes que sustentam o contrato da estrutura."),
    q("q6", "Autocomplete combina melhor com...", [["a", "Estruturas que respeitam prefixo e ordem, como arvores especializadas."], ["b", "Hash puro sem apoio estrutural."], ["c", "Apenas pilhas LIFO."]], "a", "Prefixo e ordem tornam arvores e tries mais naturais do que mapeamentos cegos por igualdade."),
    q("q7", "Qual licao pratica a aula enfatiza?", [["a", "Projetos reais frequentemente combinam varias estruturas sobre o mesmo problema."], ["b", "Uma unica estrutura otima costuma resolver tudo sozinha."], ["c", "Modelagem do dominio pouco influencia a escolha da estrutura."]], "a", "Caches, indices e sistemas reais quase sempre compoem estruturas para satisfazer contratos diferentes."),
    q("q8", "Estrutura errada faz o que com um bom algoritmo?", [["a", "Pode degradar custo, clareza e escalabilidade do sistema inteiro."], ["b", "Nao muda nada se a implementacao estiver correta."], ["c", "Afeta apenas a sintaxe, nao o comportamento."]], "a", "Representacao inadequada vaza para performance, manutencao e dificuldade de evolucao."),
  ],
  glossary: [
    g("Estrutura de dados", "Forma organizada de representar elementos e relacoes para favorecer certas operacoes."),
    g("Array", "Colecao indexada geralmente armazenada de forma contigua em memoria."),
    g("Lista encadeada", "Colecao de nos ligados por referencias, boa para edicao local."),
    g("Hash table", "Estrutura que usa uma funcao hash para mapear chaves para posicoes provaveis."),
    g("Colisao", "Situacao em que chaves diferentes disputam a mesma regiao de armazenamento em hashing."),
    g("Arvore", "Estrutura hierarquica que organiza elementos por relacoes pai-filho."),
    g("Balanceamento", "Manutencao de propriedades que evitam degeneracao estrutural em arvores."),
    g("Heap", "Estrutura que preserva prioridade relativa entre elementos e facilita extracao do extremo."),
    g("Grafo", "Estrutura formada por vertices e arestas para modelar conectividade geral."),
    g("Invariante", "Propriedade que precisa ser preservada para a estrutura manter seu contrato."),
    g("Trade-off estrutural", "Ganho operacional em uma dimensao pago com custo em outra."),
  ],
  summaryCards: [
    card("Forma importa", "Estrutura de dados nao e recipiente neutro; ela muda o problema que o algoritmo enxerga."),
    card("Operacoes primeiro", "A escolha correta nasce de ler o perfil de leitura, escrita, ordem e relacao do dominio."),
    card("Invariantes cobram manutencao", "Poder estrutural vem com custo continuo para preservar propriedades fortes."),
    card("Combinacoes sao comuns", "Sistemas reais misturam estruturas para atender contratos operacionais diferentes."),
    card("Modelagem e performance se encontram", "Escolher mal a representacao encarece algoritmo, produto e manutencao."),
  ],
});

export const recursaoEDividirParaConquistarContent = buildContent({
  id: "recursao-e-dividir-para-conquistar",
  title: "Recursao e Dividir para Conquistar",
  subtitle:
    "Como pensar problemas em camadas de subproblemas, ler arvores de chamadas e entender quando a elegancia recursiva vira ganho real em vez de custo escondido.",
  description:
    "Uma aula sobre caso base, pilha de chamadas, arvores recursivas, recorrencias, merge sort e os criterios para escolher entre recursao, iteracao e estrategias de dividir para conquistar.",
  secondaryCategoryId: "matematica",
  level: "Intermediário",
  estimatedTime: "40-50 min",
  tags: ["Recursao", "Dividir para Conquistar", "Merge Sort", "Recorrencias", "Algoritmos"],
  learningObjectives: [
    "Entender recursao como forma de especificar problemas auto-semelhantes.",
    "Reconhecer o papel do caso base, do passo recursivo e da pilha de execucao.",
    "Visualizar arvores de chamadas e relaciona-las ao custo do algoritmo.",
    "Diferenciar recursao linear, branching recursivo e dividir para conquistar.",
    "Saber quando a iteracao ou memoizacao e preferivel a uma definicao recursiva direta.",
  ],
  prerequisites: [
    "Nocao basica de funcao e chamada de funcao.",
    "Familiaridade intuitiva com loops e decomposicao de problemas.",
    "Curiosidade sobre por que alguns algoritmos recursivos escalam bem e outros explodem.",
  ],
  references: [
    ref("Design and Analysis of Algorithms - Lecture Notes", "MIT OpenCourseWare", "https://ocw.mit.edu/courses/6-046j-design-and-analysis-of-algorithms-spring-2015/pages/lecture-notes/", "Material forte em divide and conquer."),
    ref("Lecture 3: Divide & Conquer: FFT", "MIT OpenCourseWare", "https://ocw.mit.edu/courses/6-046j-design-and-analysis-of-algorithms-spring-2015/resources/lecture-3-divide-conquer-fft/", "Exemplo de aprofundamento em dividir para conquistar."),
    ref("Introduction to Algorithms - Lecture Notes", "MIT OpenCourseWare", "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/pages/lecture-notes/", "Referencia introdutoria solida."),
    ref("Mergesort", "Princeton Algorithms, 4th Edition", "https://algs4.cs.princeton.edu/22mergesort/", "Exemplo classico de recursao eficiente."),
    ref("Comparison-Based Sorting", "Open Data Structures", "https://opendatastructures.org/versions/edition-0.1f/ods-cpp/11_1_Comparison_Based_Sorti.html", "Discute merge sort e custo por arvore de recursao."),
    ref("Merge Sort", "Khan Academy", "https://www.khanacademy.org/computing/computer-science/algorithms/merge-sort", "Explicacao didatica sobre merge sort e sua relacao com recursao."),
  ],
  openingText:
    "Recursao tem reputacao dupla. Para alguns, e uma forma elegante de escrever codigo que descreve o problema quase do mesmo jeito que pensamos nele. Para outros, e uma fonte de stack overflow, bugs de caso base e algoritmos que explodem sem aviso. As duas reputacoes sao merecidas. Recursao e poderosa justamente porque permite que um problema fale consigo mesmo em escala menor. Mas isso so funciona quando sabemos parar, quando a reducao de tamanho e real e e quando a volta do problema pequeno para o problema grande tem custo controlado. Dividir para conquistar e a versao disciplinada dessa intuicao: quebrar, resolver e recombinar de modo estruturalmente vantajoso.",
  quickFacts: [
    card("Recursao e especificacao", "Ela expressa bem problemas auto-semelhantes porque descreve o todo em termos de casos menores do mesmo tipo."),
    card("Caso base e corretude", "Sem um caso pequeno resolvivel diretamente, a recursao nao representa solucao: representa laco infinito sofisticado."),
    card("Forma da arvore importa", "Profundidade, numero de filhos e custo de combinacao definem se a recursao sera barata, util ou explosiva."),
  ],
  coreSections: [
    section({
      id: "recursao-como-ideia",
      eyebrow: "Ideia central",
      title: "Resolver o problema falando dele mesmo, mas menor",
      lead:
        "Recursao nao e truque sintatico. E uma maneira de modelar problemas cuja estrutura reaparece em subpartes menores.",
      visual: "flow",
      paragraphs: [
        "Pastas dentro de pastas, arvores genealogicas, expressoes matematicas, merges em ordenacao e muitos percursos em grafos e arvores ja nascem com sabor recursivo. A representacao fica natural porque cada parte pequena tem o mesmo formato conceitual do todo.",
        "O perigo esta em confundir forma elegante com implementacao necessariamente boa. Uma especificacao recursiva pode ser conceitualmente perfeita e operacionalmente ruim se repetir subproblemas ou crescer em profundidade demais.",
      ],
      blocks: [
        block("definition", "Recursao", "Tecnica em que uma solucao chama a si mesma sobre versoes menores ou mais simples do mesmo problema."),
        block("insight", "Naturalidade estrutural", "Quando o dominio ja e hierarquico ou auto-semelhante, recursao costuma alinhar codigo e conceito de forma muito forte."),
      ],
    }),
    section({
      id: "caso-base-e-pilha",
      eyebrow: "Mecanica",
      title: "Caso base, passo recursivo e pilha de chamadas formam o esqueleto",
      lead:
        "Para funcionar, recursao precisa saber quando parar, como reduzir e o que cada chamada carrega para a volta.",
      visual: "concept-map",
      paragraphs: [
        "O caso base encerra a cascata num problema pequeno resolvido diretamente. O passo recursivo reduz a entrada para se aproximar desse caso. E a pilha de execucao guarda o contexto de cada chamada ate que a resposta possa ser remontada na volta.",
        "Essa visao ajuda a desfazer um misterio comum: recursao nao 'lembra' magicamente do que estava fazendo. Ela delega trabalho futuro a frames empilhados. Por isso profundidade e volume de chamadas produzem custo real de memoria e risco de estouro de pilha.",
      ],
      blocks: [
        block("definition", "Frame de pilha", "Registro temporario que guarda parametros, variaveis locais e ponto de retorno de uma chamada."),
        block("mistake", "Tratar caso base como detalhe decorativo", "Sem criterio de parada correto, o algoritmo pode nao terminar ou parar cedo demais, devolvendo resposta incompleta."),
      ],
    }),
    section({
      id: "arvore-de-chamadas",
      eyebrow: "Interacao",
      title: "Toda recursao desenha uma arvore de trabalho",
      lead:
        "Olhar a arvore de chamadas e uma das formas mais claras de prever custo e redundancia.",
      interactive: "model-lab",
      paragraphs: [
        "Recursao linear costuma produzir uma corrente profunda; dividir para conquistar gera uma arvore mais equilibrada; recursao branching pode explodir em largura. Essas formas nao sao apenas bonitas num quadro. Elas explicam por que certas ideias escalam bem e outras se tornam impraticaveis rapidamente.",
        "A arvore tambem revela quando a mesma subentrada aparece varias vezes. E justamente esse padrao de repeticao que empurra problemas como Fibonacci ingenuo para crescimento exponencial e motiva memoizacao ou programacao dinamica.",
      ],
      blocks: [
        block("example", "Fibonacci ingenuo", "A mesma pergunta pequena reaparece em varias partes da arvore, desperdicando trabalho e inflando custo."),
        block("insight", "Visualizar antes de codar", "Desenhar a forma da arvore mentalmente costuma antecipar gargalos antes de qualquer benchmark."),
      ],
    }),
    section({
      id: "dividir-para-conquistar",
      eyebrow: "Interacao",
      title: "Dividir para conquistar e recursao com disciplina arquitetural",
      lead:
        "A estrategia ganha forca quando a divisao reduz bem a entrada e a recombinacao e controlavel.",
      interactive: "tradeoff-lab",
      paragraphs: [
        "Merge sort e o exemplo mais pedagogico: divide em duas metades, resolve recursivamente e depois mescla. O custo bom nao vem de um truque local; vem da estrutura global da divisao somada a uma combinacao previsivel por nivel da arvore.",
        "Nem todo problema aceita esse desenho limpo. Em alguns, a divisao cria subproblemas desbalanceados ou faz a etapa de combinacao custar demais. O segredo e perceber que dividir para conquistar e uma heuristica estrutural, nao ritual automatico.",
      ],
      blocks: [
        block("definition", "Dividir para conquistar", "Paradigma que quebra um problema em partes menores, resolve cada uma e combina os resultados em uma resposta global."),
        block("example", "Merge sort", "Ao repartir a entrada e mesclar de volta, o algoritmo transforma uma tarefa de ordenacao em niveis coordenados de subproblemas menores."),
      ],
    }),
    section({
      id: "recorrencias-e-custo",
      eyebrow: "Nuance",
      title: "A volta tambem trabalha: recorrencias contam essa historia",
      lead:
        "Em algoritmos recursivos eficientes, custo nao mora apenas nas chamadas; ele mora no formato da divisao e no trabalho de recombinar.",
      visual: "compare",
      paragraphs: [
        "Uma recorrencia registra como o custo total depende do custo dos subproblemas mais o trabalho adicional por nivel. Mesmo sem resolver formalmente toda equacao, esse enquadramento ja organiza o pensamento: quantos filhos surgem? Qual o tamanho de cada um? Quanto custa combinar?",
        "Esse raciocinio tambem explica por que loops simples raramente precisam de recursao. Se o problema nao ganha clareza estrutural nem divisao vantajosa, a pilha vira overhead gratuito. Elegancia sem criterio custa caro.",
      ],
      blocks: [
        block("definition", "Recorrencia", "Equacao que expressa o custo de um problema em funcao do custo de subproblemas menores e do trabalho adicional."),
        block("mistake", "Achar que recursao sempre significa dividir para conquistar", "Muitas recursões nao dividem nada de forma vantajosa; algumas apenas caminham linearmente ou se ramificam de forma descontrolada."),
      ],
    }),
    section({
      id: "quando-usar-ou-evitar",
      eyebrow: "Interacao",
      title: "Boa engenharia recursiva sabe quando parar de ser recursiva",
      lead:
        "Ha problemas em que recursao comunica a ideia melhor; ha outros em que iteracao, memoizacao ou estruturas explicitas vencem facilmente.",
      interactive: "scenario-lab",
      paragraphs: [
        "Percorrer diretorios, processar arvores sintaticas e expressar divide and conquer costumam ficar claros com recursao. Somar vetor linear, por outro lado, raramente ganha algo com ela. E problemas com grande sobreposicao de subproblemas pedem memoizacao ou programacao dinamica para conter explosao de trabalho.",
        "A habilidade que vale ouro na pratica e reconhecer padrao estrutural, nao idolatrar estilo. Recursao boa e aquela que torna o raciocinio mais claro sem esconder custo, profundidade ou repeticao desnecessaria.",
      ],
      blocks: [
        block("insight", "Clareza e custo precisam andar juntos", "Codigo recursivo bonito que repete subproblemas inutilmente esta transmitindo bem a ideia, mas executando mal o trabalho."),
        block("example", "Memoizacao", "Guardar respostas de subproblemas repetidos e uma forma de manter a clareza recursiva enquanto se corta desperdicio."),
      ],
    }),
  ],
  quizLead: "Revise caso base, pilha de chamadas, arvores recursivas, dividir para conquistar e os sinais de explosao de custo.",
  glossaryLead: "Feche a aula consolidando o vocabulario que permite discutir recursao e recorrencias com precisao.",
  quiz: [
    q("q1", "Qual e a ideia central da recursao?", [["a", "Definir o problema em termos de casos menores do mesmo tipo."], ["b", "Eliminar completamente a necessidade de memoria."], ["c", "Substituir toda iteracao por elegancia sintatica."]], "a", "Recursao funciona quando a estrutura do problema reaparece em subproblemas menores."),
    q("q2", "Para que serve o caso base?", [["a", "Para encerrar a cadeia de chamadas num caso simples resolvido diretamente."], ["b", "Para acelerar qualquer algoritmo automaticamente."], ["c", "Para remover a necessidade de pilha."]], "a", "Sem caso base correto, a recursao nao tem ancora de parada."),
    q("q3", "O que a pilha de chamadas guarda?", [["a", "Contexto local de cada chamada ate o retorno."], ["b", "Todos os resultados do programa inteiro em disco."], ["c", "Apenas a resposta final do algoritmo."]], "a", "Frames de pilha preservam parametros, variaveis locais e ponto de retorno."),
    q("q4", "O que a arvore de chamadas ajuda a enxergar?", [["a", "Profundidade, largura e repeticao de subproblemas."], ["b", "Somente a sintaxe da linguagem usada."], ["c", "A temperatura do processador."]], "a", "Visualizar a arvore antecipa custo e redundancias."),
    q("q5", "Qual exemplo classico de dividir para conquistar aparece nesta aula?", [["a", "Merge sort."], ["b", "Bubble sort."], ["c", "Impressao linear de vetor."]], "a", "Merge sort divide, resolve partes e mescla resultados com custo previsivel por nivel."),
    q("q6", "Por que Fibonacci ingenuo e um alerta pedagogico?", [["a", "Porque repete subproblemas e gera crescimento explosivo."], ["b", "Porque nao usa qualquer chamada de funcao."], ["c", "Porque e iterativo demais."]], "a", "A arvore de chamadas reutiliza as mesmas perguntas varias vezes, desperdicando trabalho."),
    q("q7", "Quando um loop simples costuma vencer a recursao?", [["a", "Quando nao ha ganho estrutural claro e a pilha vira overhead."], ["b", "Quando o problema e claramente hierarquico."], ["c", "Quando o caso base e facil de escrever."]], "a", "Nem toda tarefa linear ganha clareza ou performance com recursao."),
    q("q8", "Qual e a relacao entre memoizacao e recursao?", [["a", "Memoizacao preserva a estrutura recursiva enquanto evita recomputacao de subproblemas repetidos."], ["b", "Memoizacao substitui qualquer necessidade de caso base."], ["c", "Memoizacao aumenta propositalmente a profundidade da pilha."]], "a", "Ela e uma resposta direta ao desperdicio de subproblemas repetidos em recursões branching."),
  ],
  glossary: [
    g("Recursao", "Tecnica em que a solucao chama a si mesma sobre versoes menores do problema."),
    g("Caso base", "Menor caso valido resolvido sem nova chamada recursiva."),
    g("Passo recursivo", "Transformacao que reduz o problema e delega parte da solucao a nova chamada."),
    g("Frame de pilha", "Registro temporario do contexto de uma chamada de funcao."),
    g("Arvore de chamadas", "Representacao das chamadas recursivas e de sua ramificacao."),
    g("Dividir para conquistar", "Paradigma que quebra, resolve partes e combina resultados."),
    g("Recorrencia", "Equacao que descreve custo em funcao de subproblemas menores."),
    g("Memoizacao", "Armazenamento de respostas de subproblemas para evitar recomputacao."),
    g("Subproblema", "Instancia menor do problema original, estruturalmente semelhante."),
    g("Profundidade recursiva", "Numero de chamadas aninhadas ativas num caminho da execucao."),
    g("Merge sort", "Algoritmo classico de dividir para conquistar para ordenacao."),
  ],
  summaryCards: [
    card("Estrutura antes da sintaxe", "Recursao e valiosa quando o problema ja nasce auto-semelhante ou hierarquico."),
    card("Caso base e ancora", "Parada correta e parte da corretude, nao detalhe cosmetico."),
    card("Arvore conta a historia", "Profundidade, filhos e recombinacao determinam o custo real."),
    card("Divide and conquer", "Quebrar e recombinar bem pode transformar a escalabilidade do algoritmo."),
    card("Maturidade", "Boa engenharia escolhe entre recursao, iteracao e memoizacao conforme a estrutura e o custo."),
  ],
});


export const dnsIpTcpHttpContent = buildContent({
  id: "dns-ip-tcp-http",
  title: "DNS, IP, TCP e HTTP em Camadas",
  subtitle:
    "Do nome digitado no navegador ate a resposta da aplicacao: cada camada resolve um problema diferente e deixa rastros diferentes quando falha.",
  description:
    "Uma aula sobre resolucao de nomes, roteamento IP, transporte TCP e semantica HTTP, com foco em responsabilidades, fronteiras e diagnostico por camadas.",
  secondaryCategoryId: "engenharia",
  level: "Intermediário",
  estimatedTime: "40-50 min",
  tags: ["DNS", "IP", "TCP", "HTTP", "Redes", "RFC"],
  learningObjectives: [
    "Entender por que DNS, IP, TCP e HTTP existem como camadas com responsabilidades distintas.",
    "Explicar o papel de resolvers, enderecos IP, handshake TCP e request/response HTTP.",
    "Reconhecer sintomas tipicos de falha em cada camada.",
    "Perceber como cache, perda e latencia se combinam ao longo da jornada da requisicao.",
    "Ganhar vocabulario para depurar problemas de rede sem misturar nome, rota, transporte e aplicacao.",
  ],
  prerequisites: [
    "Nocoes basicas de navegacao web.",
    "Curiosidade sobre o que acontece entre digitar uma URL e ver uma pagina.",
    "Disposicao para pensar em responsabilidades em camadas.",
  ],
  references: [
    ref("What is DNS?", "Cloudflare Learning Center", "https://www.cloudflare.com/learning/dns/what-is-dns/", "Visao didatica da resolucao de nomes."),
    ref("Domain Names - Concepts and Facilities", "RFC 1034", "https://www.rfc-editor.org/rfc/rfc1034.html", "Documento classico de conceitos de DNS."),
    ref("Domain Implementation and Specification", "RFC 1035", "https://www.rfc-editor.org/rfc/rfc1035.txt", "Detalhes do protocolo DNS."),
    ref("What is the Internet Protocol?", "Cloudflare Learning Center", "https://www.cloudflare.com/en-au/learning/network-layer/internet-protocol/", "Explicacao acessivel sobre IP e roteamento."),
    ref("Transmission Control Protocol", "RFC 9293", "https://datatracker.ietf.org/doc/html/rfc9293", "Especificacao consolidada moderna do TCP."),
    ref("Overview of HTTP", "MDN Web Docs", "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview", "Panorama pratico sobre arquitetura HTTP."),
    ref("HTTP Semantics", "RFC 9110", "https://www.rfc-editor.org/info/rfc9110/", "Semantica moderna consolidada do HTTP."),
  ],
  openingText:
    "Do ponto de vista do usuario, abrir um site parece uma acao unica: digitar um nome e esperar a pagina. Do ponto de vista da rede, isso e uma coreografia entre problemas diferentes. Primeiro, precisamos traduzir nome humano em endereco utilizavel. Depois, precisamos rotear pacotes ate o destino. Em seguida, abrir um canal de transporte que esconda perda e desordem. So entao a aplicacao pode pedir um recurso com metodos, cabecalhos e significado. Misturar essas camadas e uma das formas mais comuns de diagnosticar mal um sistema. Entende-las separadamente e o que permite depurar com criterio.",
  quickFacts: [
    card("DNS nao carrega pagina", "DNS responde a pergunta 'quem atende este nome?', nao a pergunta 'qual e o conteudo da resposta?'."),
    card("IP nao promete semantica", "IP roteia pacotes pelo endereco certo, mas nao garante ordem, entrega ou significado de aplicacao."),
    card("HTTP senta sobre transporte confiavel", "No caso classico da web, HTTP aproveita TCP para falar de recursos, metodos, status e cabecalhos."),
  ],
  coreSections: [
    section({
      id: "do-clique-a-resposta",
      eyebrow: "Panorama",
      title: "Uma requisicao web e uma sequencia de problemas empilhados",
      lead:
        "A URL que parece tao simples para o usuario ativa processos conceituais diferentes, cada um com responsabilidades bem especificas.",
      visual: "flow",
      paragraphs: [
        "Quando voce digita um dominio, a maquina precisa primeiro descobrir a quem esse nome corresponde. Depois, precisa enviar pacotes ate esse endereco por uma rede onde o caminho nao e fixo. Em seguida, precisa estabelecer um transporte confiavel antes de finalmente formular um pedido HTTP com semantica de aplicacao.",
        "Separar essas etapas nao e pedantismo academico. E o que torna possivel distinguir um erro de nome inexistente, um bloqueio de rede, uma conexao interrompida e um 404 do servidor. Sintomas diferentes nascem em camadas diferentes.",
      ],
      blocks: [
        block("definition", "Camada", "Conjunto de responsabilidades que resolve um tipo de problema e oferece um contrato para o nivel acima."),
        block("insight", "Abstracao economiza caos", "Camadas permitem evoluir parte da pilha sem redesenhar completamente todo o sistema."),
      ],
    }),
    section({
      id: "quem-resolve-o-que",
      eyebrow: "Mapa",
      title: "DNS, IP, TCP e HTTP: quatro perguntas diferentes",
      lead:
        "Cada camada existe porque a anterior ainda nao respondeu algo essencial para o sistema funcionar como experiencia completa.",
      visual: "concept-map",
      paragraphs: [
        "DNS responde 'qual endereco atende este nome?'. IP responde 'como encaminhar pacotes ate esse destino?'. TCP responde 'como entregar um fluxo ordenado e confiavel apesar de perda e reordenacao?'. HTTP responde 'que recurso estou pedindo, com que metodo e que status recebi?'.",
        "Essa sequencia mostra por que dizer genericamente 'a internet caiu' ou 'o HTTP falhou' raramente e diagnostico suficiente. A aplicacao pode ter falhado em um nivel muito especifico da pilha, e cada nivel pede ferramentas e raciocinio diferentes.",
      ],
      blocks: [
        block("example", "404 versus timeout", "Um 404 significa que a aplicacao recebeu o pedido e respondeu semanticamente; um timeout de conexao indica problema muito mais baixo na pilha."),
      ],
    }),
    section({
      id: "camadas-em-acao",
      eyebrow: "Interacao",
      title: "Associar responsabilidade a camada melhora o diagnostico",
      lead:
        "Quando cada camada tem funcao clara, os sintomas param de parecer misteriosos e passam a apontar para familias de causa.",
      interactive: "model-lab",
      paragraphs: [
        "Resolvers, caches DNS, roteadores, handshake TCP, retransmissoes, metodos HTTP e codigos de status deixam rastros diferentes. Aprender a ler esses rastros e uma das habilidades mais valiosas para quem constroi ou opera sistemas distribuidos pela internet.",
        "Mais importante do que decorar nomes e entender a fronteira: DNS nao resolve autenticacao; HTTP nao roteia pacote; IP nao define recurso; TCP nao sabe o que significa 404. Cada camada tem seu idioma.",
      ],
      blocks: [
        block("mistake", "Misturar semantica de aplicacao com conectividade", "Nem toda resposta errada da web e falha de rede, e nem toda indisponibilidade chega a produzir status HTTP."),
        block("insight", "Boa depuracao e classificacao", "Antes de corrigir, classifique o problema: nome, rota, transporte ou aplicacao."),
      ],
    }),
    section({
      id: "cache-e-latencia",
      eyebrow: "Interacao",
      title: "Cache DNS e perda em TCP alteram a jornada percebida",
      lead:
        "O mesmo site pode parecer quase instantaneo ou dolorosamente lento dependendo do que cada camada precisa refazer.",
      interactive: "tradeoff-lab",
      paragraphs: [
        "Se o nome ja esta em cache, o navegador economiza etapas de resolucao. Se ha perda e retransmissoes, o transporte consome mais round-trips. Do ponto de vista do usuario, tudo isso aparece como 'lento', mas a engenharia precisa separar latencia de nome, latencia de rede e latencia de aplicacao.",
        "Essa leitura tambem ajuda a evitar otimizacoes ingenuas. Melhorar apenas a camada errada pode ter efeito invisivel se o gargalo dominante estiver em outra parte da pilha.",
      ],
      blocks: [
        block("example", "Cache quente", "Quando o nome ja foi resolvido antes e ainda esta valido, a etapa DNS encolhe bastante para aquela maquina ou resolver."),
        block("insight", "Latencia total e soma de contratos", "Cada camada adiciona potencialmente espera, mas por motivos muito diferentes."),
      ],
    }),
    section({
      id: "fronteiras-e-falhas",
      eyebrow: "Nuance",
      title: "Entender fronteiras evita explicacoes erradas",
      lead:
        "Camadas se apoiam, mas nao se substituem. Confundir contratos e origem classica de troubleshooting ruim.",
      visual: "compare",
      paragraphs: [
        "Se o DNS falha, o pedido nem sabe para onde tentar ir. Se a rota IP falha, o destino esta nomeado, mas inacessivel. Se o TCP nao estabiliza, a aplicacao fica sem canal confiavel. Se o HTTP devolve 500, a rede cumpriu sua parte e o problema mora na logica do servidor ou do servico acima dele.",
        "Essa anatomia ajuda a enxergar tambem por que logs, traces, packet captures e resolucao local revelam partes diferentes da verdade. Nenhuma ferramenta sozinha conta a historia inteira da pilha.",
      ],
      blocks: [
        block("definition", "Best effort", "Modelo em que a rede tenta encaminhar pacotes ao destino, sem prometer por si so entrega perfeita ou ordenada."),
        block("mistake", "Dizer que HTTP 'garante' conectividade", "HTTP pressupoe um transporte e um destino ja estabelecidos; ele nao resolve problemas de base da rede."),
      ],
    }),
    section({
      id: "ler-sintomas",
      eyebrow: "Interacao",
      title: "Diagnosticar por sintoma e um superpoder operacional",
      lead:
        "Nome nao encontrado, reset, timeout e 404 parecem todos 'falha' para o usuario, mas apontam para classes de causa bem diferentes.",
      interactive: "scenario-lab",
      paragraphs: [
        "Quanto mais cedo a equipe aprende a classificar esses sinais, mais rapido ela para de atirar em todas as direcoes. Problemas de DNS pedem um tipo de investigacao. Problemas de transporte pedem outro. Problemas de aplicacao, outro completamente diferente.",
        "Essa habilidade tambem melhora desenho de observabilidade. Logs de aplicacao sem metricas de resolucao de nome ou handshake de transporte podem deixar o time cego para a camada que realmente esta falhando.",
      ],
      blocks: [
        block("insight", "Camada certa, ferramenta certa", "Packet capture, curl, logs de app, resolucao por DNS e traces de infra iluminam pontos diferentes da mesma viagem."),
        block("example", "Falha antes do 404", "Se o browser nao resolve o nome ou nao abre conexao, o servidor jamais tera a chance de responder 404."),
      ],
    }),
  ],
  quizLead: "Revise responsabilidades de DNS, IP, TCP e HTTP, alem das diferencas de sintoma quando algo falha em cada nivel.",
  glossaryLead: "Feche a aula consolidando o vocabulario essencial para navegar pela pilha classica da web com criterio.",
  quiz: [
    q("q1", "Qual camada responde pela traducao de nome para endereco?", [["a", "DNS."], ["b", "TCP."], ["c", "HTTP."]], "a", "DNS e o sistema de nomes que converte dominios em dados utilizaveis para alcance na rede."),
    q("q2", "Qual e o papel principal do IP?", [["a", "Encaminhar pacotes pelo endereco correto."], ["b", "Definir codigos 404 e 500."], ["c", "Interpretar cabecalhos HTTP."]], "a", "IP lida com enderecamento e roteamento, nao com semantica de aplicacao."),
    q("q3", "Por que TCP existe nessa pilha?", [["a", "Para oferecer fluxo ordenado e confiavel sobre uma rede imperfeita."], ["b", "Para substituir DNS."], ["c", "Para decidir qual HTML renderizar."]], "a", "TCP trata de ordenacao, retransmissao e controle de fluxo/congestionamento."),
    q("q4", "Qual afirmacao sobre HTTP esta correta?", [["a", "HTTP define pedido, resposta, metodos, status e significado de recursos."], ["b", "HTTP roteia pacotes pelo caminho mais curto."], ["c", "HTTP resolve nomes em cache do sistema."]], "a", "HTTP e camada de aplicacao, responsavel por semantica do dialogo entre cliente e servidor."),
    q("q5", "Se o nome do dominio nao resolve, o que provavelmente ainda nao aconteceu?", [["a", "A aplicacao nem recebeu um pedido HTTP valido."], ["b", "O servidor devolveu 404."], ["c", "O cliente ja processou cabecalhos HTTP."]], "a", "Sem nome resolvido, o navegador nao sabe sequer para onde tentar a conexao final."),
    q("q6", "Um 500 significa o que?", [["a", "O pedido chegou a camada de aplicacao, mas houve erro interno no servidor."], ["b", "Nao houve qualquer conexao TCP."], ["c", "O DNS nao conseguiu responder."]], "a", "500 e erro semantico/operacional do servidor, nao de resolucao de nome ou roteamento puro."),
    q("q7", "Como o cache DNS influencia a experiencia?", [["a", "Pode reduzir etapas de resolucao e encurtar a jornada percebida."], ["b", "Substitui completamente o transporte TCP."], ["c", "Garante resposta HTTP correta."]], "a", "Com cache valido, parte da resolucao de nome ja esta pronta para aquela consulta."),
    q("q8", "Por que separar camadas melhora depuracao?", [["a", "Porque cada camada deixa sintomas e pede ferramentas diferentes."], ["b", "Porque evita qualquer necessidade de observar a rede."], ["c", "Porque todo erro web sempre nasce em HTTP."]], "a", "Classificar o problema por camada reduz investigacao caotica e acelera o diagnostico."),
  ],
  glossary: [
    g("DNS", "Sistema que traduz nomes de dominio em informacoes como enderecos IP."),
    g("Resolver", "Componente que faz ou coordena consultas DNS em nome do cliente."),
    g("Servidor autoritativo", "Servidor DNS que responde com autoridade sobre uma zona."),
    g("IP", "Protocolo de internet responsavel por enderecamento e roteamento de pacotes."),
    g("Pacote", "Unidade de dados tratada pela camada de rede."),
    g("Roteamento", "Processo de escolher caminhos para encaminhar pacotes na rede."),
    g("TCP", "Protocolo de transporte que entrega fluxo confiavel e ordenado de bytes."),
    g("Handshake", "Etapa inicial de estabelecimento de contexto compartilhado entre endpoints."),
    g("HTTP", "Protocolo de aplicacao voltado a requisicoes e respostas na web."),
    g("Status code", "Codigo HTTP que resume o resultado semantico do pedido."),
    g("Header", "Metadado enviado em requests e responses HTTP."),
  ],
  summaryCards: [
    card("Problemas distintos", "DNS, IP, TCP e HTTP nao competem; eles resolvem perguntas diferentes na pilha."),
    card("Fronteiras claras", "Nome, rota, transporte e aplicacao exigem diagnosticos diferentes."),
    card("Cache e perda", "Latencia total muda quando DNS precisa consultar fora ou TCP precisa retransmitir."),
    card("Sintoma importa", "Timeout, reset, NXDOMAIN, 404 e 500 contam historias diferentes."),
    card("Depuracao madura", "Classificar a falha pela camada certa e metade da correcao."),
  ],
});

export const tcpVsUdpLatenciaConfiabilidadeContent = buildContent({
  id: "tcp-vs-udp-latencia-confiabilidade",
  title: "TCP vs UDP: Latencia e Confiabilidade",
  subtitle:
    "Escolher transporte nao e perguntar qual protocolo e melhor em abstrato, e sim qual contrato sua aplicacao nao pode abrir mao de cumprir.",
  description:
    "Uma aula sobre diferencas entre fluxo confiavel e datagramas, ordenacao, retransmissao, custo de handshake, sensibilidade a perda e o papel moderno de QUIC sobre UDP.",
  secondaryCategoryId: "engenharia",
  level: "Intermediário",
  estimatedTime: "40-50 min",
  tags: ["TCP", "UDP", "Latencia", "Confiabilidade", "QUIC", "HTTP/3"],
  learningObjectives: [
    "Diferenciar o contrato oferecido por TCP e UDP em vez de repetir slogans simplistas.",
    "Entender quando ordenacao e retransmissao ajudam ou atrapalham a experiencia da aplicacao.",
    "Perceber que datagrama e fluxo sao modelos diferentes de entrega.",
    "Relacionar casos de uso como arquivo, voz, jogo e HTTP/3 a exigencias distintas.",
    "Entender por que QUIC mostra que UDP nao significa ausencia total de confiabilidade.",
  ],
  prerequisites: [
    "Nocao basica de pilha de rede.",
    "Curiosidade sobre por que chamadas ao vivo e downloads nao querem o mesmo tipo de transporte.",
    "Familiaridade inicial com a ideia de perda de pacote e latencia.",
  ],
  references: [
    ref("Transmission Control Protocol", "RFC 9293", "https://datatracker.ietf.org/doc/html/rfc9293", "Especificacao moderna consolidada do TCP."),
    ref("User Datagram Protocol", "RFC 768", "https://www.rfc-editor.org/rfc/rfc768", "Documento basico de UDP."),
    ref("What is TCP/IP?", "Cloudflare Learning Center", "https://www.cloudflare.com/learning/ddos/glossary/tcp-ip/", "Boa explicacao intuitiva da relacao entre IP e TCP."),
    ref("What is UDP?", "Cloudflare Learning Center", "https://www.cloudflare.com/learning/ddos/glossary/user-datagram-protocol-udp/", "Explicacao acessivel sobre datagramas e perda."),
    ref("What is HTTP/3?", "Cloudflare Learning Center", "https://www.cloudflare.com/learning/performance/what-is-http3/", "Mostra QUIC sobre UDP em contexto moderno."),
    ref("The QUIC Transport Protocol", "RFC 9000", "https://www.rfc-editor.org/info/rfc9000", "Padrao moderno de transporte usado por HTTP/3."),
    ref("Overview of HTTP", "MDN Web Docs", "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview", "Explica por que HTTP classico dependeu de transporte confiavel."),
  ],
  openingText:
    "Poucas comparacoes foram tao simplificadas demais quanto 'TCP e confiavel, UDP e rapido'. A frase tem um fundo de verdade, mas esconde a parte importante: o transporte nao serve a si mesmo, serve a uma aplicacao com criterios muito concretos sobre perda, atraso, ordem e recuperacao. Para um arquivo, um byte faltando e desastre. Para uma chamada de voz, um pacote atrasado pode valer menos do que um pacote perdido. O ponto nao e decorar caracteristicas de protocolo. E aprender a perguntar que tipo de tempo, de erro e de garantias o produto consegue tolerar.",
  quickFacts: [
    card("TCP oferece fluxo confiavel", "Ele monta um canal ordenado de bytes com mecanismos de retransmissao, controle de fluxo e congestionamento."),
    card("UDP entrega datagramas", "Ele envia mensagens independentes sem garantir ordem, recuperacao ou estabelecimento formal de conexao."),
    card("QUIC complica os slogans", "Sobre UDP, protocolos modernos podem reintroduzir confiabilidade, criptografia e multiplexacao de outro jeito."),
  ],
  coreSections: [
    section({
      id: "confiabilidade-custa",
      eyebrow: "Intuicao",
      title: "Toda garantia de transporte cobra algum tipo de espera",
      lead:
        "Ordenar, confirmar, retransmitir e reagir a congestionamento tornam a comunicacao mais robusta, mas tambem mais comprometida com o passado.",
      visual: "flow",
      paragraphs: [
        "Quando um protocolo decide que a aplicacao so deve ver bytes em ordem e sem perdas aparentes, ele precisa guardar estado, numerar segmentos, esperar ACKs e eventualmente reenviar o que faltou. Isso e excelente para dados que nao podem se corromper silenciosamente.",
        "Por outro lado, essas mesmas garantias podem ser ruins quando a informacao envelhece rapido. Em tempo real, esperar por um pacote perdido pode arrastar para frente um frame ou amostra que ja perdeu utilidade para a experiencia do usuario.",
      ],
      blocks: [
        block("definition", "Contrato de transporte", "Conjunto de garantias e ausencias de garantia que uma camada de transporte oferece a aplicacao."),
        block("insight", "Tempo e qualidade nem sempre apontam na mesma direcao", "As vezes a melhor resposta para a aplicacao e receber algo incompleto agora, nao algo perfeito tarde demais."),
      ],
    }),
    section({
      id: "stream-vs-datagrama",
      eyebrow: "Mapa",
      title: "Fluxo e datagrama sao modelos diferentes de entrega",
      lead:
        "TCP apresenta um fluxo continuo de bytes; UDP preserva mensagens individuais chamadas datagramas.",
      visual: "concept-map",
      paragraphs: [
        "No mundo do TCP, as fronteiras entre mensagens precisam ser reconstruidas pela aplicacao. O transporte se preocupa com um fluxo ordenado, nao com o pacote logico da sua API. No mundo do UDP, cada envio ja nasce como uma unidade independente, o que muda framing, buffering e tratamento de atrasos.",
        "Essa diferenca por si so ja explica muito sobre design de protocolo. Parte do trabalho que some em TCP reaparece no nivel de aplicacao quando escolhemos UDP. E isso nao e defeito: e transferencia consciente de responsabilidade.",
      ],
      blocks: [
        block("definition", "Datagrama", "Mensagem individual tratada como unidade independente de envio e recebimento."),
        block("mistake", "Achar que UDP e 'TCP sem qualidade'", "Na pratica, UDP oferece um modelo diferente de entrega, com outro tipo de controle e outra alocacao de responsabilidade."),
      ],
    }),
    section({
      id: "comparando-contratos",
      eyebrow: "Interacao",
      title: "Comparar propriedade por propriedade esclarece muito mais do que decorar slogans",
      lead:
        "Handshake, ordenacao, recuperacao e fronteira de mensagem afetam a aplicacao de maneiras distintas.",
      interactive: "model-lab",
      paragraphs: [
        "Ao abrir a caixa do transporte, percebemos que o debate nao e binario. Ordem pode ser essencial para um banco e nociva para um stream ao vivo. Retransmissao pode salvar um download e arruinar a utilidade de um frame atrasado. A aplicacao precisa explicitar o que realmente lhe importa.",
        "Esse tipo de leitura tambem ajuda a entender por que muitos sistemas usam mais de um contrato no mesmo produto: chat, gameplay, login e telemetria nao precisam do mesmo transporte nem do mesmo rigor temporal.",
      ],
      blocks: [
        block("example", "Jogo online", "Posicoes efemeras podem preferir frescor; compra de item ou login podem precisar de transporte mais forte."),
        block("insight", "O melhor protocolo depende do dado", "Nao e o app inteiro que escolhe TCP ou UDP; em muitos casos, e cada categoria de mensagem."),
      ],
    }),
    section({
      id: "escolha-por-sensibilidade",
      eyebrow: "Interacao",
      title: "Perda e atraso doem de formas diferentes em cada aplicacao",
      lead:
        "A pergunta certa nao e 'aceita perda?', mas 'o que e pior: perder ou esperar?'.",
      interactive: "tradeoff-lab",
      paragraphs: [
        "Se a integridade do conteudo for dominante, como em arquivos, paginas e APIs classicas, esperar retransmissao faz sentido. Se o dado envelhece rapidamente, como audio e estado momentaneo de jogo, seguir adiante pode ser melhor do que recuperar o passado.",
        "Esse raciocinio evita a falsa guerra religiosa entre confiabilidade e performance. O que existe de fato e alinhamento entre custo de garantia e valor temporal da informacao transportada.",
      ],
      blocks: [
        block("definition", "Head-of-line blocking", "Atraso em partes de um fluxo ordenado que impede o consumo de dados posteriores, mesmo que estes tenham chegado."),
        block("insight", "Perda e ordem sao dimensoes separadas", "Uma aplicacao pode tolerar perder alguns eventos, mas nao tolerar reordenacao; outra pode aceitar reordenacao parcial, mas nao perda."),
      ],
    }),
    section({
      id: "quic-e-http3",
      eyebrow: "Nuance moderna",
      title: "QUIC mostra que UDP nao e sinonimo de ausencia de confiabilidade",
      lead:
        "Protocolos modernos podem usar UDP como base e ainda assim oferecer streams confiaveis, criptografia e multiplexacao.",
      visual: "compare",
      paragraphs: [
        "QUIC, base do HTTP/3, prova que a conversa madura nao e 'TCP versus UDP' em sentido moral. E possivel usar datagramas como substrato e reconstruir, no transporte, garantias mais adequadas a requisitos modernos, inclusive evitando algumas dores classicas associadas ao uso exclusivo de TCP para toda web.",
        "Isso nao torna TCP obsoleto, nem faz UDP virar superprotocolo. Apenas mostra que contratos de transporte podem evoluir e que o nome do protocolo base nao esgota as garantias oferecidas a aplicacao final.",
      ],
      blocks: [
        block("example", "HTTP/3", "A web moderna pode se beneficiar de um transporte que combine criptografia, menor custo de estabelecimento e streams mais flexiveis sobre UDP."),
        block("mistake", "Tratar QUIC como 'UDP puro'", "QUIC usa UDP, mas define acima dele um contrato muito mais rico do que datagramas nus."),
      ],
    }),
    section({
      id: "mapeando-casos-de-uso",
      eyebrow: "Interacao",
      title: "Escolher transporte fica mais facil quando o requisito esta bem nomeado",
      lead:
        "Arquivo, chamada ao vivo, jogo e web moderna parecem cenarios similares de rede, mas pedem contratos temporais bem diferentes.",
      interactive: "scenario-lab",
      paragraphs: [
        "Se voce nomeia claramente o que a aplicacao nao pode perder - integridade, ordem, frescor, baixa latencia inicial, tolerancia a retransmissao - a decisao deixa de ser folclore. Ela passa a ser engenharia de contrato.",
        "Essa mentalidade e especialmente util em produtos compostos. Uma mesma plataforma pode usar HTTP/2 ou HTTP/3 para API, UDP/QUIC para experiencias interativas e filas confiaveis para backoffice. O desenho adequado e plural por natureza.",
      ],
      blocks: [
        block("insight", "Requisito temporal e semantico", "A mensagem so vale o que vale no tempo e no contexto em que sera consumida."),
        block("example", "Video ao vivo", "Um pacote atrasado pode ser menos util do que um pacote perdido, porque ele trava a experiencia em vez de permitir continuidade."),
      ],
    }),
  ],
  quizLead: "Revise stream versus datagrama, ordenacao, retransmissao, latencia e o papel de QUIC na leitura moderna de transporte.",
  glossaryLead: "Feche a aula consolidando o vocabulario que permite comparar transportes de rede sem cair em simplificacoes pobres.",
  quiz: [
    q("q1", "Qual contrato classico o TCP oferece?", [["a", "Fluxo ordenado e confiavel de bytes."], ["b", "Datagramas independentes sem estado."], ["c", "Somente roteamento por nome."]], "a", "TCP trabalha para apresentar a aplicacao um fluxo consistente apesar das imperfeicoes da rede."),
    q("q2", "O que e mais caracteristico do UDP?", [["a", "Entrega de datagramas sem garantia nativa de ordem ou recuperacao."], ["b", "Reordenacao obrigatoria e retransmissao automatica."], ["c", "Semantica HTTP integrada."]], "a", "UDP oferece um modelo mais simples e deixa muitas responsabilidades para cima."),
    q("q3", "Por que retransmissao pode ser ruim em tempo real?", [["a", "Porque o dado pode perder valor enquanto espera ser recuperado."], ["b", "Porque datagramas deixam de existir."], ["c", "Porque a rede passa a usar DNS novamente."]], "a", "Quando o valor temporal da informacao e curto, recuperar o passado pode atrapalhar o presente."),
    q("q4", "Qual diferenca conceitual existe entre fluxo e datagrama?", [["a", "Fluxo trata bytes continuos; datagrama preserva mensagens individuais."], ["b", "Fluxo usa IP e datagrama nao."], ["c", "Fluxo e sempre mais rapido que datagrama."]], "a", "Essa diferenca muda framing, buffering e modelo de entrega para a aplicacao."),
    q("q5", "Em qual caso TCP costuma ser preferivel?", [["a", "Download ou upload de arquivo em que perda invalida o resultado."], ["b", "Posicoes efemeras de um jogo em tempo real."], ["c", "Audio ao vivo onde pacotes atrasados nao servem mais."]], "a", "Quando integridade e ordem pesam mais do que frescor imediato, TCP tende a ser o encaixe natural."),
    q("q6", "Qual licao QUIC traz ao debate?", [["a", "Que sobre UDP tambem e possivel construir transporte confiavel e moderno."], ["b", "Que UDP deixou de existir."], ["c", "Que TCP nao pode mais ser usado para web."]], "a", "QUIC mostra que o protocolo base nao esgota o contrato oferecido a aplicacao."),
    q("q7", "Head-of-line blocking se relaciona principalmente a...", [["a", "Esperar partes anteriores de um fluxo antes de liberar as seguintes."], ["b", "Resolver nomes DNS com atraso."], ["c", "Escolher o endereco IP de destino."]], "a", "Quando a ordem global pesa, um item faltante pode atrasar o consumo do que veio depois."),
    q("q8", "A pergunta mais util para escolher transporte e...", [["a", "O que e pior para a aplicacao: perder ou esperar?"], ["b", "Qual protocolo e mais famoso."], ["c", "Qual cabecalho tem menos bytes apenas."]], "a", "Escolha madura de transporte parte do valor temporal e semantico da informacao trafegada."),
  ],
  glossary: [
    g("TCP", "Protocolo de transporte orientado a conexao que oferece fluxo confiavel e ordenado."),
    g("UDP", "Protocolo de transporte baseado em datagramas sem garantias nativas de recuperacao e ordem."),
    g("Datagrama", "Mensagem individual tratada como unidade de envio e recebimento."),
    g("Byte stream", "Modelo continuo de dados entregue sem fronteiras de mensagem expostas pelo transporte."),
    g("Handshake", "Etapa inicial de negociacao e estabelecimento de estado entre endpoints."),
    g("Retransmissao", "Reenvio de dados quando a entrega esperada nao foi confirmada."),
    g("Controle de congestionamento", "Mecanismos para adaptar o envio ao estado da rede e evitar colapso."),
    g("Head-of-line blocking", "Atraso gerado por depender da entrega/ordem de partes anteriores."),
    g("Frescor", "Valor temporal de uma informacao para a aplicacao no momento do consumo."),
    g("QUIC", "Transporte moderno sobre UDP usado por HTTP/3, com confiabilidade e criptografia integradas."),
    g("HTTP/3", "Versao do HTTP que usa QUIC como base de transporte."),
  ],
  summaryCards: [
    card("Transporte e contrato", "O ponto central nao e o protocolo em si, e o conjunto de garantias que a aplicacao precisa."),
    card("Fluxo versus datagrama", "TCP e UDP entregam modelos diferentes de comunicacao, nao apenas velocidades diferentes."),
    card("Perder ou esperar", "A escolha madura depende do valor temporal da informacao transportada."),
    card("QUIC muda a conversa", "Sobre UDP tambem e possivel construir confiabilidade, streams e criptografia modernas."),
    card("Produtos mistos", "Uma mesma plataforma pode usar transportes diferentes para tipos de mensagem diferentes."),
  ],
});


export const sistemasDistribuidosFundamentosContent = buildContent({
  id: "sistemas-distribuidos-fundamentos",
  title: "Sistemas Distribuidos: Fundamentos",
  subtitle:
    "Por que varias maquinas cooperando parecem uma boa ideia ate voce perceber que falha parcial, latencia e relogios imperfeitos viram parte do algoritmo.",
  description:
    "Uma aula sobre falha parcial, replicacao, relogios, consenso, quorum, retries e o custo de fazer varios nos parecerem um sistema coerente.",
  secondaryCategoryId: "engenharia",
  level: "Avançado",
  estimatedTime: "45-60 min",
  tags: ["Sistemas Distribuidos", "Replicacao", "Consenso", "Quorum", "Latencia", "Relogios"],
  learningObjectives: [
    "Entender por que sistemas distribuidos introduzem falha parcial e incerteza temporal como problemas centrais.",
    "Explicar o papel de replicacao, quoruns e algoritmos de consenso em manter estado coerente entre nos.",
    "Reconhecer o impacto de latencia entre nos na observabilidade e no custo de coordenacao.",
    "Relacionar retries, idempotencia e failover a falhas reais da rede.",
    "Construir intuicao sobre por que relogios fisicos nao bastam para ordenar toda a realidade distribuida.",
  ],
  prerequisites: [
    "Familiaridade basica com cliente e servidor.",
    "Nocao intuitiva de replicacao e alta disponibilidade.",
    "Interesse em entender por que escalar para varias maquinas muda o tipo de bug e de garantia em jogo.",
  ],
  references: [
    ref("6.5840: Distributed Systems", "MIT", "https://pdos.lcs.mit.edu/6.824/", "Curso classico sobre sistemas distribuidos e estudos de caso."),
    ref("6.5840 General Information", "MIT", "https://pdos.csail.mit.edu/6.824/general.html", "Contexto e temas formais do curso."),
    ref("Time, Clocks, and the Ordering of Events in a Distributed System", "Leslie Lamport", "https://lamport.org/pubs/time-clocks.pdf", "Paper fundador sobre ordenacao parcial e clocks logicos."),
    ref("Paxos Made Simple", "Leslie Lamport", "https://lamport.azurewebsites.net/pubs/paxos-simple.pdf", "Introducao classica a consenso e maquina de estados replicada."),
    ref("Spanner: Google's Globally-Distributed Database", "Google Research / OSDI", "https://research.google/pubs/spanner-googles-globally-distributed-database-2/", "Exemplo moderno de sistema global com consistencia forte."),
    ref("Perspectives on the CAP Theorem", "Seth Gilbert & Nancy Lynch", "https://groups.csail.mit.edu/tds/papers/Gilbert/Brewer2.pdf", "Contexto teorico e implicacoes praticas de trade-offs distribuidos."),
    ref("Designing Data-Intensive Applications", "O'Reilly", "https://www.oreilly.com/library/view/designing-data-intensive-applications/9781491903063/", "Referencia moderna amplamente adotada sobre replicacao e consistencia."),
  ],
  openingText:
    "Um programa local pode travar inteiro, mas pelo menos ele cai inteiro. Em sistemas distribuidos, a realidade e mais traicoeira: uma replica pode estar lenta, outra pode estar viva mas inacessivel, um cliente pode repetir o pedido porque nao viu a resposta, e dois nos podem discordar sobre a ordem em que eventos aconteceram. Distribuir traz escala, isolamento de falhas e proximidade geografica. Tambem traz uma nova classe de problemas em que rede, tempo e coordenacao deixam de ser detalhe de infraestrutura e viram parte do algoritmo. Essa e a virada mental que separa software de uma maquina de software de varias maquinas.",
  quickFacts: [
    card("Falha parcial e a regra", "Em sistemas distribuidos, raramente tudo falha junto; o dificil e interpretar o estado intermediario e ambiguo."),
    card("Latencia entra na semantica", "Quando varias maquinas precisam concordar, o tempo de rede deixa de ser mero detalhe de desempenho e passa a influenciar garantias."),
    card("Replicar exige coordenar", "Ter varias copias do estado melhora resiliencia, mas obriga o sistema a decidir quando uma escrita virou verdade coletiva."),
  ],
  coreSections: [
    section({
      id: "por-que-distribuir",
      eyebrow: "Ponto de partida",
      title: "Distribuir promete escala e resiliencia, mas troca simplicidade por incerteza coordenada",
      lead:
        "Sistemas distribuidos existem porque uma maquina so nao basta em capacidade, disponibilidade ou proximidade - mas essa expansao muda a natureza dos problemas.",
      visual: "flow",
      paragraphs: [
        "Separar responsabilidades por servicos, replicar dados, colocar nos em regioes diferentes e crescer horizontalmente sao movimentos poderosos. Eles ajudam a absorver carga, reduzir dependencia de uma maquina unica e aproximar usuarios geograficamente distantes.",
        "O custo e que agora o sistema precisa parecer uno enquanto e, de fato, muitos. Essa aparencia de unidade exige mensagens, temporizadores, protocolos de acordo e mecanismos para lidar com repeticao, atraso, queda parcial e visoes diferentes da realidade.",
      ],
      blocks: [
        block("definition", "Sistema distribuido", "Conjunto de processos em maquinas distintas que cooperam pela rede para oferecer algum comportamento comum."),
        block("insight", "Rede nao e canal transparente", "Ela introduz atraso, perda, duplicacao, reordenacao e incerteza sobre quem esta vivo ou nao."),
      ],
    }),
    section({
      id: "falha-tempo-e-estado",
      eyebrow: "Mapa",
      title: "Falha parcial, tempo e estado replicado sao as tres dores permanentes",
      lead:
        "Grande parte da engenharia distribuida pode ser lida como tentativa de responder a esses tres problemas ao mesmo tempo.",
      visual: "concept-map",
      paragraphs: [
        "Falha parcial significa que alguns componentes somem, atrasam ou parecem mortos para uns e vivos para outros. Tempo importa porque cada no observa o mundo por um relogio e por mensagens que chegam com atraso. Estado replicado importa porque queremos mais de uma copia sem perder a capacidade de falar de uma historia coerente.",
        "Essas dores se entrelacam. Um timeout, por exemplo, e ao mesmo tempo observacao de tempo, suspeita de falha e gatilho para algum protocolo sobre estado compartilhado. E por isso que sistemas distribuidos punem diagnosticos simplistas.",
      ],
      blocks: [
        block("definition", "Falha parcial", "Situacao em que partes do sistema param, atrasam ou ficam inacessiveis sem que o restante deixe necessariamente de funcionar."),
        block("example", "Timeout ambiguo", "Quando um cliente nao recebe resposta, ele nao sabe se o servidor caiu, se respondeu tarde demais ou se a rede comeu o retorno."),
      ],
    }),
    section({
      id: "varios-nos-mudam-tudo",
      eyebrow: "Interacao",
      title: "Basta haver varios nos para o algoritmo precisar lidar com uma realidade incompleta",
      lead:
        "Cada maquina enxerga o todo apenas por mensagens, e mensagens chegam tarde, fora de ordem ou nem chegam.",
      interactive: "model-lab",
      paragraphs: [
        "No fundo, sistemas distribuidos sao sistemas locais acoplados por observacao imperfeita. Cada no so conhece sua memoria local e o que a rede lhe contou ate agora. Isso significa que a nocao intuitiva de 'estado atual do sistema' e muito mais delicada do que parece.",
        "A partir dessa observacao, retries, heartbeats, eleicao de lider, quorum e logs replicados deixam de parecer aderecos sofisticados. Eles viram respostas naturais para a pergunta: como varias maquinas podem agir como se compartilhassem uma historia razoavelmente alinhada?",
      ],
      blocks: [
        block("insight", "Observacao parcial e constitutiva", "Nao ha ponto de vista onisciente gratuito dentro do sistema; o que existe sao aproximacoes coordenadas."),
        block("mistake", "Tratar timeout como prova de morte", "Timeout geralmente prova apenas que a comunicacao falhou no prazo esperado, nao que o componente sumiu de fato."),
      ],
    }),
    section({
      id: "coordenacao-custa",
      eyebrow: "Interacao",
      title: "Mais replicas melhoram resiliencia e aumentam o preco de coordenacao",
      lead:
        "Toda vez que varias copias precisam concordar antes de responder, latencia de rede entra no caminho do usuario.",
      interactive: "tradeoff-lab",
      paragraphs: [
        "Escrever em varias maquinas melhora disponibilidade e resistencia a falha, mas a aplicacao so pode tratar a escrita como confirmada quando alguma politica de acordo foi satisfeita. Dependendo do desenho, isso significa ouvir um lider, um quorum ou um conjunto de replicas em diferentes zonas ou regioes.",
        "A pergunta madura passa a ser: quanta coordenacao este endpoint realmente precisa? Nem toda operacao exige o mesmo rigor. Mas aquilo que exige precisa pagar com tempo ou indisponibilidade sob certas falhas.",
      ],
      blocks: [
        block("definition", "Quorum", "Conjunto suficiente de replicas cujas respostas permitem considerar uma operacao validada segundo a politica do sistema."),
        block("example", "Escrita replicada", "Mesmo sem particao, cada replica adicional pode adicionar round-trips ou esperas ao caminho de commit."),
      ],
    }),
    section({
      id: "replicacao-e-consenso",
      eyebrow: "Nuance",
      title: "Replicar estado bem exige alguma nocao de ordem compartilhada",
      lead:
        "Quando varios nos respondem pelo mesmo servico, surge a pergunta mais espinhosa: em que ordem as mudancas aconteceram de verdade para o sistema?",
      visual: "compare",
      paragraphs: [
        "Papers como o de Lamport sobre clocks logicos ensinam que 'antes' e 'depois' nao sao obvios em sistemas distribuidos. Algoritmos de consenso e maquinas de estados replicadas surgem para construir, a um custo, alguma historia comum suficientemente segura para que replicas tomem decisoes compativeis.",
        "Isso tambem explica por que bancos globais consistentes, como o Spanner, precisam de mecanismos sofisticados de tempo e commit. Manter coerencia forte em escala global nao e magia; e engenharia disciplinada sobre incerteza temporal e acordo distribuido.",
      ],
      blocks: [
        block("definition", "Consenso", "Familia de protocolos que busca fazer nos concordarem sobre valores, ordem de comandos ou lideranca apesar de falhas e atrasos."),
        block("insight", "Replicar e facil; concordar e a parte cara", "A dificuldade rara vez esta em copiar bytes e quase sempre em decidir quando eles viraram verdade compartilhada."),
      ],
    }),
    section({
      id: "incidentes-em-miniatura",
      eyebrow: "Interacao",
      title: "Retries, failover e clock skew mostram que distribuido e engenharia de ambiguidades",
      lead:
        "Muitos incidentes parecem bugs acidentais, mas na verdade revelam tensoes estruturais da distribuicao.",
      interactive: "scenario-lab",
      paragraphs: [
        "Cliente repetindo pedido, lider que some no meio do caminho, regiao lenta mas ainda viva, clocks fisicos discordando: esses casos mostram que robustez distribuida depende de assumir ambiguidade como estado normal e nao como excecao vergonhosa.",
        "E por isso que idempotencia, identificadores de operacao, observabilidade temporal e politicas de retry nao sao extras opcionais. Eles sao parte da semantica operacional do sistema, nao do acabamento depois que 'o produto ja funciona'.",
      ],
      blocks: [
        block("insight", "Idempotencia e ferramenta de sanidade", "Quando a rede pode esconder se um comando foi aplicado ou nao, repetir com seguranca vira requisito de projeto."),
        block("example", "Retry sem protecao", "Um cliente pode reenviar a mesma transferencia ou cobranca se nao houver identificadores e semantica para tratar duplicacao."),
      ],
    }),
  ],
  quizLead: "Revise falha parcial, relogios, quorum, consenso e os custos ocultos de fazer varias maquinas parecerem um sistema unico.",
  glossaryLead: "Feche a aula consolidando o vocabulario essencial para conversar sobre replicacao, tempo e coordenacao distribuida com rigor.",
  quiz: [
    q("q1", "Qual diferenca torna sistemas distribuidos especialmente traiçoeiros?", [["a", "Falha parcial e observacao incompleta da realidade pela rede."], ["b", "A impossibilidade de usar algoritmos."], ["c", "A ausencia total de memoria."]], "a", "Em sistemas distribuidos, partes podem falhar ou atrasar sem derrubar o todo, criando ambiguidades."),
    q("q2", "Por que timeout nao prova que um no morreu?", [["a", "Porque pode haver lentidao ou perda de mensagem sem falha definitiva do no."], ["b", "Porque timeouts so existem em linguagens lentas."], ["c", "Porque clocks logicos proíbem timeouts."]], "a", "Timeout e evidencia de incerteza temporal, nao certificacao de morte."),
    q("q3", "O que a replicacao oferece e o que ela cobra?", [["a", "Oferece resiliencia e cobra coordenacao."], ["b", "Oferece simplicidade e cobra menos mensagens."], ["c", "Oferece ordem global gratuita e cobra apenas memoria."]], "a", "Replicar melhora tolerancia a falhas, mas exige decidir quando varias copias concordam."),
    q("q4", "Qual papel um quorum cumpre?", [["a", "Define um conjunto suficiente de replicas para validar uma operacao."], ["b", "Escolhe automaticamente o melhor algoritmo local."], ["c", "Remove a necessidade de rede entre nos."]], "a", "Quorum e politica de acordo: quantas e quais replicas precisam responder."),
    q("q5", "Por que clocks fisicos nao bastam para ordenar toda a realidade distribuida?", [["a", "Porque redes atrasam mensagens e relogios derivam, tornando a ordem observada ambigua."], ["b", "Porque maquinas nao conseguem medir tempo."], ["c", "Porque algoritmos distribuidos proíbem timestamps."]], "a", "A ordem causal nem sempre coincide com um timestamp local bruto."),
    q("q6", "O que consenso tenta resolver?", [["a", "Acordo sobre valores, lideranca ou ordem apesar de falhas e atrasos."], ["b", "Compressao de pacotes na camada IP."], ["c", "Resolucao de nomes DNS em cache local."]], "a", "Consenso ajuda replicas a manter historia compativel quando precisam agir como um sistema unico."),
    q("q7", "Por que retries e idempotencia aparecem juntos?", [["a", "Porque a rede pode deixar ambigua a aplicacao de um pedido, exigindo repeticao segura."], ["b", "Porque retries eliminam qualquer falha de consistencia automaticamente."], ["c", "Porque idempotencia substitui observabilidade."]], "a", "Repetir pedidos sem causar efeitos duplicados e requisito central de robustez distribuida."),
    q("q8", "Qual licao a aula enfatiza sobre latencia?", [["a", "Latencia entre nos influencia tanto desempenho quanto o tipo de garantia que e viavel sustentar."], ["b", "Latencia importa so para UX, nunca para corretude."], ["c", "Latencia desaparece quando ha lider unico."]], "a", "Quando varias replicas precisam se ouvir, tempo de rede passa a afetar a propria semantica operacional do sistema."),
  ],
  glossary: [
    g("Sistema distribuido", "Conjunto de processos em maquinas distintas que cooperam pela rede."),
    g("Falha parcial", "Falha ou lentidao de parte do sistema sem parada total do restante."),
    g("Replicacao", "Manutencao de varias copias de dados ou servicos em nos diferentes."),
    g("Quorum", "Conjunto suficiente de replicas para validar uma operacao segundo alguma politica."),
    g("Consenso", "Acordo distribuido sobre valor, ordem ou lideranca apesar de falhas."),
    g("Clock logico", "Mecanismo para ordenar eventos de forma compativel com causalidade sem depender de relogio fisico perfeito."),
    g("Latencia", "Tempo gasto para mensagens atravessarem a rede e voltarem."),
    g("Failover", "Troca de componente ativo quando um lider ou replica deixa de atender."),
    g("Idempotencia", "Propriedade de repetir uma operacao sem alterar o efeito final alem da primeira aplicacao valida."),
    g("Retry", "Tentativa repetida de uma operacao apos falta de resposta ou erro."),
    g("State machine replication", "Tecnica de manter varias replicas aplicando a mesma sequencia de comandos."),
  ],
  summaryCards: [
    card("Distribuir muda o jogo", "Com varias maquinas, falha parcial e incerteza temporal viram parte do algoritmo."),
    card("Replicar exige coordenar", "Mais copias trazem resiliencia, mas tambem custo de acordo."),
    card("Tempo importa", "Latencia e clocks entram na semantica, nao apenas na performance."),
    card("Consenso e ordem", "Historias compativeis entre replicas pedem protocolos dedicados."),
    card("Ambiguidade e normal", "Retry, failover e idempotencia sao respostas estruturais a uma rede imperfeita."),
  ],
});

export const capConsistenciaDisponibilidadeContent = buildContent({
  id: "cap-consistencia-disponibilidade",
  title: "CAP, Consistencia e Disponibilidade",
  subtitle:
    "Uma leitura moderna do CAP sem caricatura: o que o teorema realmente diz durante particoes e por que PACELC ajuda a pensar o resto do tempo.",
  description:
    "Uma aula avancada sobre as definicoes formais por tras de CAP, a nuance de particao, disponibilidade, linearizabilidade, leituras stale e a extensao pratica oferecida por PACELC.",
  secondaryCategoryId: "engenharia",
  level: "Avançado",
  estimatedTime: "45-60 min",
  tags: ["CAP", "PACELC", "Consistencia", "Disponibilidade", "Particao", "Sistemas Distribuidos"],
  learningObjectives: [
    "Entender o que CAP realmente afirma no modelo formal e por que 'pick two' e simplificacao pobre.",
    "Distinguir consistencia forte, disponibilidade no sentido do teorema e tolerancia a particoes.",
    "Entender que P nao e escolha cosmetica em sistemas de rede reais.",
    "Introduzir PACELC como complemento para pensar latencia versus consistencia fora de particoes.",
    "Relacionar requisitos de produto a modelos e posturas diferentes por operacao.",
  ],
  prerequisites: [
    "Familiaridade inicial com replicacao e quorum.",
    "Nocoes basicas de sistemas distribuidos e latencia de rede.",
    "Disposicao para ler definicoes com mais cuidado do que slogans populares.",
  ],
  references: [
    ref("Perspectives on the CAP Theorem", "Gilbert & Lynch", "https://groups.csail.mit.edu/tds/papers/Gilbert/Brewer2.pdf", "Discussao cuidadosa de teoria e pratica ao redor de CAP."),
    ref("Brewer's Conjecture and the Feasibility of Consistent, Available, Partition-Tolerant Web Services", "Gilbert & Lynch", "https://sites.cs.ucsb.edu/~rich/class/cs293b-cloud/papers/cap-proof.pdf", "Formalizacao classica da impossibilidade."),
    ref("CAP Twelve Years Later", "Eric Brewer", "https://sites.cs.ucsb.edu/~rich/class/cs293b-cloud/papers/brewer-cap.pdf", "Releitura de Brewer sobre abusos e mudancas de entendimento."),
    ref("Consistency Tradeoffs in Modern Distributed Database System Design: CAP is Only Part of the Story", "Daniel Abadi", "https://www.cs.umd.edu/~abadi/papers/abadi-pacelc.pdf", "Texto chave para PACELC."),
    ref("Consistency", "Jepsen", "https://jepsen.io/consistency", "Guia pratico e conceitual sobre modelos de consistencia."),
    ref("Spanner: Google's Globally-Distributed Database", "Google Research / OSDI", "https://research.google/pubs/spanner-googles-globally-distributed-database-2/", "Exemplo moderno de sistema global com consistencia forte e custo real associado."),
  ],
  openingText:
    "CAP sofreu o destino de muitas ideias poderosas: virou adesivo de slide. A versao popular diz que todo sistema distribuido escolhe duas entre consistencia, disponibilidade e tolerancia a particoes. A versao madura e mais interessante e mais util. Particoes nao sao um detalhe opcional que o arquiteto simplesmente marca como 'nao'. Em redes reais, mensagens atrasam, se perdem e isolam componentes. O teorema nos obriga a perguntar o que o sistema faz nesse momento: recusa pedidos para preservar uma historia forte ou continua respondendo, aceitando algum grau de desatualizacao? E fora da particao? A conversa muda de novo, entrando em latencia versus consistencia. E ai que PACELC ajuda a completar o mapa.",
  quickFacts: [
    card("P nao e botao de desligar", "Em sistemas de rede reais, a possibilidade de particao precisa ser encarada como fato de projeto, nao como opcao filosofica."),
    card("Disponibilidade no teorema e especifica", "Responder sempre nao significa responder com o valor mais recente; a definicao formal e mais estreita do que o uso coloquial de uptime."),
    card("PACELC amplia a conversa", "Mesmo sem particao, replicas coordenadas frequentemente trocam latencia por consistencia mais forte."),
  ],
  coreSections: [
    section({
      id: "alem-do-pick-two",
      eyebrow: "Correcao conceitual",
      title: "CAP nao e menu; e aviso sobre particoes",
      lead:
        "A simplificacao 'escolha duas' pode ser pedagogicamente rapida, mas ela apaga a pergunta mais importante do teorema: o que acontece quando a rede se parte?",
      visual: "flow",
      paragraphs: [
        "Em um sistema distribuido replicado, mensagens podem atrasar ou nao chegar. Quando isso acontece, replicas deixam de se ouvir. Se o sistema insiste em manter uma forma forte de consistencia, talvez precise bloquear ou recusar pedidos em parte da topologia. Se insiste em responder a qualquer custo, talvez aceite devolver dados nao totalmente frescos.",
        "Perceba a mudanca de foco: a tensao relevante nao e um trio estetico de letras. E uma decisao de comportamento sob falha de comunicacao. Isso ja torna a conversa muito mais concreta e menos mistica.",
      ],
      blocks: [
        block("definition", "Particao", "Cenario em que componentes deixam de trocar mensagens de forma confiavel, ficando efetivamente isolados entre si."),
        block("mistake", "Tratar P como opcional", "Em ambientes de rede reais, voce nao escolhe abolir particoes; voce escolhe como reagir quando elas acontecem."),
      ],
    }),
    section({
      id: "definicoes-importam",
      eyebrow: "Definicoes",
      title: "Consistencia e disponibilidade significam algo tecnico especifico aqui",
      lead:
        "Sem definir o que e consistencia e o que e disponibilidade, qualquer debate sobre CAP vira neblina retorica.",
      visual: "concept-map",
      paragraphs: [
        "Na leitura classica do teorema, consistencia remete a uma forma forte, como consistencia atomica ou linearizavel. Nao e qualquer sensacao vaga de 'dados razoavelmente alinhados'. Disponibilidade, por sua vez, significa que cada no nao falho responde, ainda que a resposta nao incorpore necessariamente a escrita mais recente feita do outro lado de uma particao.",
        "Essas definicoes importam porque iluminam um erro comum: achar que um sistema AP esta 'errado' por responder stale ou que um sistema CP 'caiu' quando se recusa a responder sob isolamento. Na verdade, eles estao apenas escolhendo lados diferentes do mesmo dilema estrutural durante a particao.",
      ],
      blocks: [
        block("definition", "Linearizabilidade", "Modelo forte em que operacoes parecem acontecer instantaneamente em alguma ordem total compativel com o tempo observado pelos clientes."),
        block("insight", "Palavras familiares escondem tecnicalidades", "Consistencia e disponibilidade em CAP nao equivalem exatamente ao uso coloquial dessas palavras em produto ou SRE."),
      ],
    }),
    section({
      id: "durante-a-particao",
      eyebrow: "Interacao",
      title: "A grande pergunta de CAP e o comportamento durante a particao",
      lead:
        "Quando replicas se separam, o sistema precisa escolher se bloqueia, degrada ou continua servindo com alguma divergencia temporaria.",
      interactive: "model-lab",
      paragraphs: [
        "Um sistema CP tipicamente prefere preservar coerencia forte e pode recusar atualizacoes ou leituras em certas partes isoladas. Um sistema AP prefere continuar respondendo e lidar depois com convergencia, aceitando que alguns clientes vejam dados desatualizados ou conflitantes.",
        "Essa leitura tambem ajuda a abandonar moralismos. Nem CP e superior por principio, nem AP e atalho irresponsavel por definicao. O julgamento depende do custo de uma resposta stale versus do custo de parar de responder naquela operacao especifica.",
      ],
      blocks: [
        block("example", "Transferencia bancaria", "Se ha risco de inventar duas historias incompativeis para saldo e debito, bloquear pode ser melhor do que responder algo incorreto."),
        block("example", "Carrinho de compras", "Em algumas partes da experiencia, seguir respondendo e conciliar depois pode ser menos danoso do que indisponibilizar o fluxo inteiro."),
      ],
    }),
    section({
      id: "pacelc",
      eyebrow: "Interacao",
      title: "PACELC lembra que sem particao tambem existem custos fortes",
      lead:
        "Mesmo quando tudo parece saudavel, replicas sincronizadas ainda pagam com round-trips e latencia para sustentar leituras e escritas mais frescas.",
      interactive: "tradeoff-lab",
      paragraphs: [
        "A proposta PACELC, popularizada por Daniel Abadi, complementa CAP com outra pergunta: se nao ha particao, o sistema prefere menor latencia ou maior consistencia? Essa extensao e valiosa porque grande parte da experiencia do usuario acontece justamente fora de falhas graves.",
        "Leituras globais frescas, commits confirmados em varias replicas e ordenacao forte de observacoes tendem a adicionar espera. Leituras locais e respostas mais agressivas tendem a reduzir latencia, mas podem abrir espaco para stale reads. De novo, o ponto nao e decorar siglas. E ligar contrato a caso de uso.",
      ],
      blocks: [
        block("definition", "PACELC", "Se houver Particao, o sistema escolhe entre Availability e Consistency; Else, escolhe entre Latency e Consistency."),
        block("insight", "Latencia tambem e moeda de design", "Mesmo sem falha, consistencia forte raramente sai de graca quando dados estao replicados em lugares diferentes."),
      ],
    }),
    section({
      id: "modelos-de-consistencia",
      eyebrow: "Nuance",
      title: "Nao existe uma unica consistencia; existem modelos e contratos",
      lead:
        "Parte do amadurecimento em sistemas distribuidos e parar de tratar consistencia como interruptor binario e passar a falar de modelos concretos.",
      visual: "compare",
      paragraphs: [
        "Linearizabilidade, serializabilidade, consistencia eventual e outras garantias falam de fenomenos diferentes. Algumas regulam ordem observavel por clientes; outras regulam equivalencia de execucoes concorrentes; outras aceitam defasagem temporaria desde que haja convergencia posterior.",
        "Isso importa porque a mesma aplicacao pode pedir contratos diferentes em partes diferentes. Login, feed, analytics, saldo, dashboard e fila de notificacoes nao precisam do mesmo modelo. Projetar bem e, muitas vezes, distribuir rigor onde ele realmente vale o custo.",
      ],
      blocks: [
        block("mistake", "Falar 'meu sistema e consistente' sem dizer em que sentido", "Sem nomear o modelo ou o fenomeno proibido, a afirmacao vira marketing, nao engenharia."),
        block("insight", "Granularidade de contrato", "Sistemas modernos frequentemente escolhem modelo por operacao, endpoint ou fluxo de negocio, e nao por produto inteiro de forma monolitica."),
      ],
    }),
    section({
      id: "projeto-por-contexto",
      eyebrow: "Interacao",
      title: "A escolha madura e por contexto de produto, falha e operacao",
      lead:
        "Quando o debate sai do quadro teorico e entra em banco, carrinho, dashboard ou leitura global, CAP e PACELC ficam muito menos abstratos.",
      interactive: "scenario-lab",
      paragraphs: [
        "Produtos reais carregam custos morais e financeiros diferentes para dados stale, para latencia adicional e para indisponibilidade. E por isso que a boa arquitetura nomeia explicitamente: qual erro e pior aqui? Que tipo de mentira nao podemos contar? Que atraso ainda cabe?",
        "Essa postura evita tanto o dogma do 'sempre CP' quanto a comodidade do 'sempre eventual'. Em sistemas maduros, a resposta quase sempre e mais precisa: depende da operacao, da falha e do compromisso de negocio que esta em jogo naquele ponto da jornada.",
      ],
      blocks: [
        block("insight", "CAP e PACELC sao ferramentas de pergunta", "Elas ajudam a explicitar trade-offs, nao a carimbar sistemas inteiros com uma letra unica e eterna."),
        block("example", "Leitura global fresca", "Uma leitura que precisa refletir uma escrita acabada de acontecer em outra regiao provavelmente pagara mais latencia do que uma leitura local tolerante a defasagem."),
      ],
    }),
  ],
  quizLead: "Revise definicoes formais de CAP, o papel da particao, a leitura moderna de disponibilidade e a extensao oferecida por PACELC.",
  glossaryLead: "Feche a aula consolidando o vocabulario necessario para falar de consistencia e disponibilidade com mais rigor e menos slogans.",
  quiz: [
    q("q1", "Qual caricatura a aula combate logo de inicio?", [["a", "A ideia de que CAP e apenas 'escolher duas letras' sem olhar para particoes."], ["b", "A ideia de que redes podem falhar."], ["c", "A ideia de que bancos usam replicacao."]], "a", "A critica principal e ao uso superficial de CAP como slogan sem contexto de falha de comunicacao."),
    q("q2", "No contexto classico de CAP, consistencia se refere mais de perto a...", [["a", "Uma forma forte como consistencia atomica/linearizavel."], ["b", "Qualquer sensacao vaga de alinhamento de dados."], ["c", "Apenas ao uso do mesmo tipo em todas as tabelas."]], "a", "A letra C no teorema carrega um sentido tecnico mais forte do que a palavra sugere coloquialmente."),
    q("q3", "Por que P nao deve ser tratado como opcional?", [["a", "Porque particoes sao possibilidade real em sistemas de rede e exigem postura de projeto."], ["b", "Porque todo sistema e offline por definicao."], ["c", "Porque sem P nao existe latencia alguma."]], "a", "Nao escolhemos abolir a possibilidade de falha de comunicacao; escolhemos a reacao diante dela."),
    q("q4", "Em um sistema CP durante uma particao, o comportamento tipico e...", [["a", "Aceitar bloquear ou recusar algumas operacoes para preservar coerencia forte."], ["b", "Responder qualquer coisa, desde que rapido."], ["c", "Desativar toda a rede automaticamente."]], "a", "CP tende a priorizar consistencia mesmo que isso reduza disponibilidade local sob isolamento."),
    q("q5", "O que PACELC acrescenta a discussao?", [["a", "Que mesmo sem particao existe trade-off entre latencia e consistencia."], ["b", "Que particoes deixam de importar."], ["c", "Que disponibilidade nunca mais precisa ser considerada."]], "a", "PACELC complementa CAP olhando para o regime normal, nao apenas para o regime de falha."),
    q("q6", "Qual afirmacao sobre disponibilidade no teorema e correta?", [["a", "Responder nao implica necessariamente responder com o dado mais fresco."], ["b", "Disponibilidade e sinonimo exato de 100% uptime percebido pelo negocio."], ["c", "Disponibilidade proibe qualquer forma de dado stale."]], "a", "A definicao formal de disponibilidade em CAP e mais estreita do que o uso cotidiano em produto ou SRE."),
    q("q7", "Por que falar apenas 'meu sistema e consistente' e insuficiente?", [["a", "Porque existem varios modelos de consistencia com garantias diferentes."], ["b", "Porque toda consistencia e proibida em sistemas distribuidos."], ["c", "Porque consistencia so existe em bancos SQL."]], "a", "Linearizabilidade, serializabilidade e eventual consistency respondem a exigencias diferentes."),
    q("q8", "Qual e a postura madura recomendada pela aula?", [["a", "Escolher contrato por operacao e por contexto de negocio, falha e latencia aceitavel."], ["b", "Carimbar o produto inteiro para sempre como CP ou AP e parar de pensar."], ["c", "Ignorar particoes enquanto o sistema estiver estavel."]], "a", "Sistemas modernos distribuem rigor conforme o valor e o custo real de cada fluxo."),
  ],
  glossary: [
    g("CAP", "Teorema sobre limites simultaneos de consistencia forte, disponibilidade e tolerancia a particoes em sistemas replicados sob certos modelos."),
    g("Particao", "Quebra de comunicacao confiavel entre partes da rede ou do cluster."),
    g("Consistencia forte", "Familia de garantias em que observacoes refletem uma historia fortemente coordenada, como linearizabilidade."),
    g("Disponibilidade", "No contexto do teorema, propriedade de os nos nao falhos responderem a requisicoes."),
    g("Linearizabilidade", "Modelo em que operacoes parecem ocorrer instantaneamente numa ordem total coerente com o tempo observado."),
    g("Serializabilidade", "Propriedade transacional em que execucoes concorrentes equivalem a alguma ordem serial valida."),
    g("Consistencia eventual", "Modelo em que replicas podem divergir temporariamente, mas convergem na ausencia de novas atualizacoes."),
    g("Stale read", "Leitura que observa um valor atrasado em relacao ao estado mais recente global."),
    g("PACELC", "Formula que acrescenta o trade-off entre latencia e consistencia quando nao ha particao."),
    g("Quorum", "Quantidade suficiente de replicas para validar uma operacao segundo uma politica."),
    g("Modelo de consistencia", "Conjunto de regras sobre que historias de leitura e escrita o sistema pode exibir."),
  ],
  summaryCards: [
    card("CAP e sobre particao", "A pergunta central e o que o sistema faz quando replicas deixam de se ouvir de forma confiavel."),
    card("Definicoes importam", "Consistencia e disponibilidade no teorema sao termos tecnicos, nao slogans vagos."),
    card("P nao some", "Falha de comunicacao e fato de projeto em sistemas de rede reais."),
    card("PACELC completa o mapa", "Sem particao, consistencia forte ainda costuma cobrar com latencia."),
    card("Projeto maduro", "O melhor contrato costuma ser escolhido por operacao, nao por ideologia unica para o produto inteiro."),
  ],
});

export const wave3PartAContentMap: Record<Wave3PartATopicId, LessonContent> = {
  "turing-e-a-ideia-de-computacao": turingEAIdeiaDeComputacaoContent,
  "algoritmos-e-complexidade": algoritmosEComplexidadeContent,
  "estruturas-de-dados-essenciais": estruturasDeDadosEssenciaisContent,
  "recursao-e-dividir-para-conquistar": recursaoEDividirParaConquistarContent,
  "dns-ip-tcp-http": dnsIpTcpHttpContent,
  "tcp-vs-udp-latencia-confiabilidade": tcpVsUdpLatenciaConfiabilidadeContent,
  "sistemas-distribuidos-fundamentos": sistemasDistribuidosFundamentosContent,
  "cap-consistencia-disponibilidade": capConsistenciaDisponibilidadeContent,
};
