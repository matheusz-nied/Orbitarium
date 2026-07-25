import type { LessonContent } from "../../../types/content";

export const bitsPortasLogicasCircuitosContent: LessonContent = {
  id: "bits-portas-logicas-circuitos",
  title: "Bits, Portas Lógicas e Circuitos",
  subtitle:
    "Entre o 0/1 abstrato e a CPU real existe uma camada decisiva: portas lógicas combinadas em circuitos que comparam, somam, escolhem caminhos e guardam estado.",
  description:
    "Aula interativa sobre álgebra booleana, portas NOT/AND/OR/XOR, universalidade do NAND, tabelas-verdade, meio somador e como circuitos combinacionais viram blocos funcionais de computadores.",
  primaryCategoryId: "computacao",
  secondaryCategoryId: "matematica",
  level: "Iniciante",
  estimatedTime: "45-55 min",
  tags: ["Portas Lógicas", "Booleano", "NAND", "Circuitos", "Somador", "Tabela-Verdade"],
  learningObjectives: [
    "Relacionar bits a sinais elétricos interpretados logicamente.",
    "Ler e construir tabelas-verdade de portas básicas.",
    "Entender o papel de NOT, AND, OR e XOR em circuitos digitais.",
    "Explicar por que NAND é chamada de porta universal.",
    "Montar intuitivamente um meio somador e distinguir soma de carry.",
    "Conectar portas simples a blocos maiores como multiplexadores, registradores e CPU.",
  ],
  prerequisites: [
    "Noções básicas de bits e representação binária.",
    "Raciocínio lógico elementar.",
    "Não é necessário saber eletrônica formal.",
  ],
  references: [
    {
      title: "Computation Structures",
      source: "MIT OpenCourseWare — 6.004",
      url: "https://ocw.mit.edu/courses/6-004-computation-structures-spring-2017/",
      note: "Base excelente para portas, circuitos combinacionais e abstração digital.",
    },
    {
      title: "Nand to Tetris",
      source: "Site oficial",
      url: "https://www.nand2tetris.org/",
      note:
        "Curso clássico que constrói portas, somadores, memória e CPU a partir de NAND.",
    },
    {
      title: "Projects — Boolean Logic and Boolean Arithmetic",
      source: "Nand to Tetris",
      url: "https://www.nand2tetris.org/course",
      note:
        "Mostra na prática como portas e somadores se compõem em blocos maiores.",
    },
    {
      title: "Logic Gates and Circuits",
      source: "Khan Academy",
      url: "https://www.khanacademy.org/computing/computers-and-internet/xcae6f4a7ff015e7d:computers/xcae6f4a7ff015e7d:logic-gates-and-circuits",
      note:
        "Recurso didático introdutório sobre portas lógicas e circuitos combinacionais.",
    },
    {
      title: "CS 61C Course Notes",
      source: "UC Berkeley",
      url: "https://notes.cs61c.org/",
      note:
        "Notas de arquitetura de computadores com ponte entre lógica e componentes maiores.",
    },
  ],
  heroVisual: "logic-gates-hero",
  openingText:
    "Portas lógicas parecem infantis quando vistas isoladamente: AND, OR, NOT. Mas são elas que implementam decisões, somas, seleção de caminhos e controle em praticamente todo computador. A passagem do bit abstrato para o circuito concreto acontece aqui. Você sai de 'existem 0 e 1' para 'com esses 0 e 1 eu consigo construir uma máquina que calcula'.",
  quickFacts: [
    { title: "Porta é função", body: "Ela recebe bits de entrada e produz um bit de saída por uma regra fixa." },
    { title: "Tabela-verdade é comportamento", body: "Ela lista o resultado para cada combinação possível de entradas." },
    { title: "NAND é universal", body: "Com NAND suficiente, você reconstrói as outras portas." },
    { title: "Somar cria dois resultados", body: "A soma binária separa bit de soma e bit de carry." },
  ],
  sections: [
    s(
      "do-sinal-ao-bit",
      "Fundação",
      "Do sinal físico ao valor lógico",
      "Circuitos digitais simplificam estados físicos contínuos em valores lógicos discretos.",
      "signal-to-bit",
      undefined,
      [
        "Em hardware real, tensões variam continuamente. O truque dos sistemas digitais é definir faixas que contam como 0 e faixas que contam como 1. Com isso, ganhamos margem contra ruído e fabricação imperfeita.",
        "A lógica digital não ignora a física; ela a domestica. Em vez de pedir medições precisas demais, escolhe limites estáveis e trata o resto como transição ou erro.",
        "Esse passo é importante porque portas lógicas são, no fundo, circuitos físicos que implementam regras booleanas sobre sinais elétricos.",
      ],
      [
        { type: "definition", title: "Valor lógico", body: "Abstração binária aplicada a um sinal físico, normalmente interpretado como 0 ou 1." },
      ],
    ),
    s(
      "tabelas-verdade",
      "Leitura",
      "Como ler portas por tabela-verdade",
      "A maneira mais clara de entender uma porta é observar todas as entradas possíveis e a saída resultante.",
      "truth-table-visual",
      "truth-table-lab",
      [
        "Uma porta lógica é uma função muito pequena: recebe poucas entradas binárias e devolve uma saída binária. Como há poucas combinações possíveis, podemos listar todas em uma tabela-verdade.",
        "AND só gera 1 quando ambas as entradas são 1. OR gera 1 quando pelo menos uma é 1. XOR gera 1 quando as entradas diferem. NOT inverte o valor.",
        "Aprender a ler essas tabelas é como aprender o alfabeto da eletrônica digital. Elas são simples, mas qualquer circuito maior nasce da composição dessas regras.",
      ],
      [
        { type: "definition", title: "Tabela-verdade", body: "Tabela que mostra a saída de uma função lógica para cada combinação possível de entradas." },
        { type: "example", title: "XOR", body: "A saída vale 1 quando as entradas são diferentes: 01 ou 10." },
      ],
    ),
    s(
      "portas-basicas",
      "Vocabulário",
      "O que cada porta faz",
      "Portas não são decoração: cada uma resolve um padrão lógico recorrente em circuitos.",
      "gates-family",
      undefined,
      [
        "NOT é negação: transforma 1 em 0 e 0 em 1. AND exige coincidência. OR aceita alternativa. XOR detecta diferença. Juntas, essas portas formam um conjunto extremamente expressivo.",
        "Quando falamos em 'controle', 'habilitar', 'comparar' ou 'alternar' em hardware, normalmente estamos descrevendo arranjos dessas portas. Elas reaparecem em decodificadores, seletores, ALUs e até mecanismos de memória.",
        "A intuição certa não é decorar símbolos, e sim perceber o papel operacional de cada porta em decisões simples.",
      ],
      [
        { type: "insight", title: "XOR é especial em soma", body: "Ele detecta diferença entre bits e por isso aparece naturalmente no bit de soma." },
        { type: "mistake", title: "Achar que portas são 'coisas separadas'", body: "Na prática, elas quase sempre aparecem compostas em blocos maiores." },
      ],
    ),
    s(
      "nand-universal",
      "Construção",
      "Por que NAND é chamada de universal",
      "Se uma única porta permite reconstruir as outras, ela se torna uma peça fundamental de projeto.",
      "nand-universal-visual",
      "nand-builder",
      [
        "NAND significa NOT(AND). À primeira vista parece só mais uma porta. Mas ela tem uma propriedade poderosa: com combinações adequadas de NAND, conseguimos montar NOT, AND, OR e circuitos maiores.",
        "Isso importa historicamente e conceitualmente. Em vez de pensar em muitas peças diferentes, podemos pensar em um tijolo universal e nas regras de composição dele.",
        "Universalidade não significa que tudo vira simples, e sim que existe uma base suficientemente rica para construir o resto. É o equivalente de dizer que um conjunto pequeno de instruções ainda pode expressar muitos programas.",
      ],
      [
        { type: "definition", title: "Porta universal", body: "Porta lógica a partir da qual é possível construir todas as demais." },
        { type: "example", title: "NOT com NAND", body: "Basta ligar a mesma entrada nos dois lados da NAND: NAND(A, A) = NOT(A)." },
      ],
    ),
    s(
      "somadores",
      "Aritmética",
      "Somar bits exige soma e carry",
      "A soma binária não produz um único resultado: ela separa o bit visível e o vai-um.",
      "half-adder-visual",
      "adder-simulator",
      [
        "No mundo decimal, aprendemos cedo a fazer 9 + 8 e carregar 1 para a próxima coluna. Em binário, o mesmo princípio aparece de forma ainda mais clara. Se 1 + 1 = 10, temos soma 0 e carry 1.",
        "O meio somador usa XOR para o bit de soma e AND para o carry. Essa combinação já mostra como portas lógicas viram aritmética concreta.",
        "Ao empilhar somadores e propagar carries, construímos unidades maiores capazes de realizar operações essenciais de uma CPU.",
      ],
      [
        { type: "definition", title: "Carry", body: "Bit que indica que a soma atual excedeu a coluna e precisa ser propagada para a próxima." },
        { type: "insight", title: "Somar é circuito, não magia", body: "A aritmética inteira surge da composição disciplinada de portas simples." },
      ],
    ),
    s(
      "selecao-e-controle",
      "Sistema",
      "Circuitos também escolhem caminhos",
      "Além de somar, circuitos selecionam entradas, habilitam componentes e controlam o fluxo interno da máquina.",
      "mux-control-visual",
      undefined,
      [
        "Multiplexadores escolhem uma entre várias entradas com base em bits de controle. Decodificadores transformam poucas entradas em várias linhas de ativação. Esses blocos são tão importantes quanto somadores.",
        "A razão é simples: um computador não só calcula. Ele precisa decidir de onde vem um dado, para onde ele vai e qual unidade deve trabalhar em cada ciclo.",
        "A camada de controle é a ponte entre lógica booleana e comportamento organizado. Sem ela, teríamos peças isoladas sem coordenação.",
      ],
      [
        { type: "example", title: "MUX 2→1", body: "Um seletor escolhe entre entrada A e entrada B conforme um bit de controle." },
      ],
    ),
    s(
      "dos-circuitos-a-cpu",
      "Síntese",
      "Como isso se conecta a computadores reais",
      "CPU, memória e barramentos são blocos maiores montados a partir desses circuitos básicos.",
      "logic-to-cpu-visual",
      undefined,
      [
        "Registradores usam circuitos com estado para guardar bits. ALUs combinam somadores, comparadores e lógica booleana. Unidades de controle ativam os caminhos corretos em cada instrução.",
        "Por isso estudar portas lógicas não é voltar demais no tempo. É entender o nível mais baixo em que o comportamento da máquina ainda é legível por humanos.",
        "Nas próximas aulas, quando falarmos de CPU, cache e RAM, essas portas desaparecerão da superfície — mas continuarão sendo a substância do hardware.",
      ],
      [
        { type: "insight", title: "Abstração esconde sem apagar", body: "Camadas superiores simplificam o raciocínio, mas continuam sustentadas por portas e circuitos." },
      ],
    ),
    s("quiz-revisao", "Revisão", "Quiz de revisão", "Verifique se portas, tabelas-verdade e soma binária ficaram intuitivas.", undefined, "quiz", ["As próximas aulas assumem esse vocabulário como base."], []),
    s("glossario", "Glossário", "Termos essenciais", "Consolide o vocabulário mínimo de lógica digital.", undefined, "glossary", ["Esses termos retornam em CPU, registradores, memória e ISA."], []),
  ],
  summaryCards: [
    { title: "Bit vira lógica", body: "Sinais físicos são interpretados como valores discretos para permitir circuitos confiáveis." },
    { title: "Tabela-verdade descreve comportamento", body: "Ela torna cada porta legível como uma função." },
    { title: "Portas compõem circuitos", body: "AND, OR, NOT e XOR aparecem como peças de blocos maiores." },
    { title: "NAND é base universal", body: "Ela consegue reconstruir as outras portas por composição." },
    { title: "Soma produz carry", body: "Somadores transformam lógica booleana em aritmética binária." },
    { title: "Controle escolhe caminhos", body: "MUX e decodificadores mostram que circuitos também decidem fluxos." },
  ],
  quiz: [
    q("q1", "Por que sistemas digitais preferem 0 e 1 em vez de muitos níveis lógicos?", "Porque dois estados são mais fáceis de detectar com robustez.", "Porque dois estados sempre usam menos energia.", "Porque a matemática proíbe três estados.", "a", "Faixas bem separadas de sinal ajudam a tolerar ruído e imperfeições."),
    q("q2", "O que uma tabela-verdade descreve?", "A saída de uma função lógica para cada combinação de entradas.", "A velocidade elétrica de uma porta.", "A lista de transistores de um chip.", "a", "Ela mostra comportamento lógico, não detalhes físicos de fabricação."),
    q("q3", "Quando a porta AND produz 1?", "Somente quando todas as entradas são 1.", "Quando ao menos uma entrada é 1.", "Quando as entradas são diferentes.", "a", "AND exige coincidência total das entradas em 1."),
    q("q4", "O que a XOR detecta com duas entradas?", "Se elas são diferentes.", "Se ambas são 1.", "Se ambas são 0.", "a", "Por isso ela é útil em comparação e no bit de soma."),
    q("q5", "Por que NAND é chamada de porta universal?", "Porque com NAND suficiente é possível construir as demais portas.", "Porque ela é a mais rápida em qualquer tecnologia.", "Porque ela substitui memória e clock.", "a", "Universalidade aqui significa poder expressivo de construção."),
    q("q6", "Num meio somador, qual combinação gera carry = 1?", "1 + 1.", "0 + 1.", "0 + 0.", "a", "O carry aparece quando a soma ultrapassa a coluna atual."),
    q("q7", "Qual porta aparece naturalmente no bit de soma de um meio somador?", "XOR.", "NOR.", "NAND apenas isolada.", "a", "XOR vale 1 quando os bits diferem, exatamente o comportamento do bit de soma sem carry de entrada."),
    q("q8", "O que um multiplexador faz?", "Escolhe uma entre várias entradas com base em sinais de controle.", "Armazena dados por longo prazo.", "Conta quantos bits existem em uma palavra.", "a", "Ele seleciona caminhos de dados dentro do circuito."),
  ],
  glossary: [
    g("Lógica booleana", "Sistema lógico em que variáveis assumem valores como 0/1 ou falso/verdadeiro."),
    g("Porta lógica", "Circuito que implementa uma função booleana simples."),
    g("Tabela-verdade", "Tabela com todas as combinações de entrada e a respectiva saída."),
    g("NOT", "Porta que inverte o valor lógico de entrada."),
    g("AND", "Porta cuja saída vale 1 apenas quando todas as entradas são 1."),
    g("OR", "Porta cuja saída vale 1 quando ao menos uma entrada é 1."),
    g("XOR", "Porta cuja saída vale 1 quando as entradas diferem."),
    g("NAND", "Negação da AND; porta universal em muitos contextos."),
    g("Circuito combinacional", "Circuito cuja saída depende apenas das entradas atuais."),
    g("Carry", "Bit propagado para a próxima coluna em uma soma binária."),
    g("Meio somador", "Circuito que soma dois bits e produz soma e carry."),
    g("Multiplexador", "Circuito que seleciona uma entre várias entradas."),
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

function q(id: string, prompt: string, a: string, b: string, c: string, correctOptionId: string, feedback: string) {
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
