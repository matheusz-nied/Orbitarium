import type { LessonContent } from "../../../types/content";

export const comoFuncionaUmaCpuContent: LessonContent = {
  id: "como-funciona-uma-cpu",
  title: "Como Funciona uma CPU",
  subtitle:
    "A CPU parece uma caixa mágica que 'executa programas', mas por dentro ela repete um ritual preciso de buscar instruções, decodificar sinais e mover dados entre registradores, ALU e memória.",
  description:
    "Aula interativa sobre ISA, ciclo fetch-decode-execute, registradores, ALU, controle, clock, desvios e a diferença entre o programa que escrevemos e as micro-operações que a CPU realmente realiza.",
  primaryCategoryId: "computacao",
  secondaryCategoryId: "engenharia",
  level: "Intermediário",
  estimatedTime: "50-60 min",
  tags: ["CPU", "Arquitetura", "Registradores", "ALU", "ISA", "Clock", "Fetch-Decode-Execute"],
  learningObjectives: [
    "Explicar o papel da CPU como orquestradora de instruções e dados.",
    "Distinguir ISA, instrução, registrador e micro-operação.",
    "Descrever o ciclo fetch-decode-execute em linguagem acessível.",
    "Entender por que registradores são centrais para desempenho e fluxo de dados.",
    "Relacionar ALU e unidade de controle às operações executadas.",
    "Reconhecer o impacto de branches, memória e clock no comportamento observado.",
  ],
  prerequisites: [
    "Bits, bytes e representação de dados.",
    "Noção básica de memória e endereços.",
    "Curiosidade sobre como programas viram ação física.",
  ],
  references: [
    {
      title: "Computer Systems: A Programmer's Perspective",
      source: "Bryant e O'Hallaron — Carnegie Mellon University",
      url: "https://csapp.cs.cmu.edu/",
      note: "Base forte para arquitetura de processadores, instruções e caminho de dados.",
    },
    {
      title: "Computation Structures",
      source: "MIT OpenCourseWare — 6.004",
      url: "https://ocw.mit.edu/courses/6-004-computation-structures-spring-2017/",
      note: "Curso aberto sobre estruturas computacionais, ALU, registradores e controle.",
    },
    {
      title: "Nand to Tetris",
      source: "Site oficial",
      url: "https://www.nand2tetris.org/",
      note: "Excelente ponte entre portas lógicas, CPU didática e execução de instruções.",
    },
    {
      title: "RISC-V Ratified Specifications Library",
      source: "RISC-V International",
      url: "https://docs.riscv.org/reference/home/index.html",
      note:
        "Referência oficial para ISA aberta, útil para entender o contrato entre software e processador.",
    },
    {
      title: "CS 61C Course Notes",
      source: "UC Berkeley",
      url: "https://notes.cs61c.org/",
      note: "Notas modernas de arquitetura com foco em CPU, ISA e hierarquia de memória.",
    },
  ],
  heroVisual: "cpu-hero",
  openingText:
    "Quando dizemos que a CPU 'roda um programa', estamos resumindo milhões ou bilhões de pequenas ações coordenadas. A CPU lê instruções de memória, decide o que cada uma quer dizer, move dados para lugares rápidos chamados registradores, usa circuitos aritméticos e lógicos para calcular e depois grava resultados. Esse ciclo parece simples, mas é o núcleo de praticamente toda computação geral.",
  quickFacts: [
    { title: "ISA é contrato", body: "Ela define as instruções que software pode pedir para o processador executar." },
    { title: "Registradores são mesa de trabalho", body: "Antes de ir à memória principal, a CPU tenta operar em um conjunto muito pequeno e muito rápido." },
    { title: "ALU calcula", body: "Somas, comparações, máscaras e deslocamentos passam por circuitos especializados." },
    { title: "Controle sincroniza", body: "Sem sinais de controle, os blocos existem mas não cooperam." },
  ],
  sections: [
    s(
      "papel-da-cpu",
      "Visão Geral",
      "O que a CPU realmente faz",
      "A CPU não 'entende' o programa como nós; ela coordena passos elementares sobre dados codificados.",
      "cpu-role-visual",
      undefined,
      [
        "Um programa é, do ponto de vista da máquina, uma sequência de instruções codificadas. Cada instrução pede alguma combinação de operações como carregar um valor, somar dois registradores, comparar números ou saltar para outro trecho.",
        "A CPU é a unidade que transforma esse pedido em ação organizada. Ela busca a instrução, interpreta seus campos, ativa os caminhos corretos e produz o efeito esperado.",
        "Essa visão evita o mito da CPU como 'cérebro inteligente'. Ela é melhor entendida como uma fábrica altamente coordenada, não como um leitor semântico de código.",
      ],
      [
        { type: "definition", title: "CPU", body: "Unidade central de processamento responsável por executar instruções e coordenar movimentação e transformação de dados." },
      ],
    ),
    s(
      "isa-e-instrucoes",
      "Contrato",
      "ISA: o idioma entre software e hardware",
      "Programas não falam diretamente com transistores; eles falam com uma arquitetura de instruções.",
      "isa-visual",
      undefined,
      [
        "ISA significa Instruction Set Architecture. Ela define quais instruções existem, como registradores aparecem para o software, quais modos de endereçamento são permitidos e como o comportamento deve parecer para o programa.",
        "Isso separa camadas importantes. Duas CPUs diferentes podem implementar a mesma ISA e, ainda assim, ter organizações internas distintas. Para o programa, porém, ambas parecem obedecer ao mesmo contrato.",
        "Quando compiladores geram código para RISC-V, x86 ou ARM, estão mirando essa camada de contrato, não o desenho elétrico exato do chip.",
      ],
      [
        { type: "definition", title: "ISA", body: "Contrato visível ao software que descreve instruções, registradores e comportamento arquitetural do processador." },
        { type: "insight", title: "Mesmo idioma, motores diferentes", body: "Implementações internas podem variar muito sem quebrar o software, desde que preservem a ISA." },
      ],
    ),
    s(
      "ciclo",
      "Execução",
      "Fetch, decode, execute",
      "O ciclo de instrução é a espinha dorsal conceitual de uma CPU clássica.",
      "instruction-cycle-visual",
      "instruction-cycle-simulator",
      [
        "No fetch, a CPU usa o contador de programa para buscar a próxima instrução em memória. No decode, ela interpreta os campos dessa instrução: operação, registradores, imediato, endereço. No execute, ativa ALU, memória ou lógica de controle conforme necessário.",
        "Muitas instruções ainda exigem etapas de escrita de volta do resultado. Outras mudam o contador de programa por meio de saltos e desvios. O importante é perceber que 'executar' não é um ato único, mas uma sequência coordenada.",
        "Mesmo em processadores modernos que sobrepõem etapas, paralelizam e especulam, essa decomposição continua sendo a melhor intuição de entrada.",
      ],
      [
        { type: "definition", title: "Program Counter (PC)", body: "Registrador que guarda o endereço da próxima instrução a ser buscada." },
        { type: "mistake", title: "Imaginar que toda instrução leva um único gesto atômico", body: "Na prática, cada instrução se desdobra em leituras, seleção de sinais, cálculo e atualização de estado." },
      ],
    ),
    s(
      "registradores",
      "Dados Rápidos",
      "Registradores: a bancada interna da CPU",
      "Antes de tocar memória principal, a CPU prefere trabalhar em um conjunto mínimo e rápido de valores.",
      "registers-visual",
      "register-transfer-lab",
      [
        "Registradores são pequenas áreas de armazenamento muito próximas do caminho de execução. Ler e escrever neles é muito mais rápido do que depender da memória principal.",
        "Instruções frequentemente significam mover valores entre registradores, combinar dois deles na ALU e armazenar o resultado de volta. Essa repetição é tão importante que o layout do banco de registradores molda o design inteiro do processador.",
        "Quanto mais o compilador consegue manter valores úteis em registradores, menos a CPU precisa esperar por acessos externos.",
      ],
      [
        { type: "definition", title: "Registrador", body: "Armazenamento pequeno e muito rápido usado pela CPU durante a execução de instruções." },
        { type: "example", title: "add r1, r2, r3", body: "Uma instrução desse tipo soma r2 com r3 e grava o resultado em r1." },
      ],
    ),
    s(
      "alu-e-controle",
      "Circuitos Internos",
      "ALU e unidade de controle trabalham em dupla",
      "A ALU calcula; a unidade de controle decide qual cálculo e quais caminhos devem ser ativados.",
      "alu-control-visual",
      "alu-decoder-playground",
      [
        "A ALU executa operações como soma, subtração, comparação, AND, OR, XOR e deslocamentos. Ela é a parte 'operária' da CPU para cálculo inteiro e lógico.",
        "Mas sem controle não existe ordem. A unidade de controle traduz a instrução em sinais: qual registrador ler, qual operação pedir à ALU, se deve acessar memória e onde gravar o resultado.",
        "É por isso que o termo datapath faz sentido. Há um caminho por onde os dados fluem e uma camada de controle que governa esse fluxo.",
      ],
      [
        { type: "definition", title: "ALU", body: "Unidade aritmética e lógica responsável por operações de cálculo e manipulação bit a bit." },
        { type: "insight", title: "Controle é coreografia", body: "Os blocos da CPU precisam ser ativados na combinação certa para produzir o efeito de uma instrução." },
      ],
    ),
    s(
      "memoria-e-branches",
      "Desafios",
      "Nem tudo é cálculo: memória e desvios atrapalham o fluxo",
      "Instruções que leem memória ou mudam o caminho de execução são mais desafiadoras do que parecem.",
      "memory-branch-visual",
      undefined,
      [
        "Uma soma entre registradores é relativamente local. Já um load pode precisar esperar dados vindos de níveis mais lentos da hierarquia de memória. Um branch pode quebrar a sequência esperada de instruções e mudar o PC.",
        "Isso ajuda a entender por que CPUs modernas investem tanto em cache, predição de desvios e pipelines. O gargalo raramente é 'fazer uma soma'; é manter um fluxo estável de dados e decisões.",
        "Mesmo sem entrar em microarquitetura profunda, vale guardar esta intuição: tempo de CPU é frequentemente tempo de coordenação, não apenas de aritmética.",
      ],
      [
        { type: "mistake", title: "Achar que CPU é limitada só pela ALU", body: "Em muitos cenários, o problema real é esperar memória ou lidar com desvios imprevisíveis." },
      ],
    ),
    s(
      "clock-e-ilusoes",
      "Performance",
      "Clock ajuda, mas não explica tudo",
      "Frequência importa, porém desempenho real depende do trabalho feito por ciclo e das esperas evitadas.",
      "clock-visual",
      undefined,
      [
        "O clock oferece um ritmo de sincronização para partes do processador. É tentador concluir que 'mais GHz = sempre mais rápido', mas isso esconde muitos fatores.",
        "Duas CPUs com clocks diferentes podem ter desempenhos muito diferentes dependendo de ISA, cache, largura do datapath, profundidade de pipeline, branch prediction e latência de memória.",
        "A métrica útil não é apenas quantos ciclos existem por segundo, mas o que cada ciclo consegue realizar e quantos deles acabam desperdiçados esperando algo.",
      ],
      [
        { type: "insight", title: "Clock mede cadência, não inteligência", body: "Desempenho vem da combinação entre frequência, organização interna e qualidade do fluxo de dados." },
      ],
    ),
    s("quiz-revisao", "Revisão", "Quiz de revisão", "Teste se o caminho entre instrução, registradores, ALU e controle ficou claro.", undefined, "quiz", ["O objetivo é montar um modelo mental operativo da CPU, não decorar siglas."], []),
    s("glossario", "Glossário", "Termos essenciais", "Feche a aula consolidando o vocabulário da arquitetura básica de processadores.", undefined, "glossary", ["Esses termos serão usados novamente em memória, cache, compiladores e sistemas operacionais."], []),
  ],
  summaryCards: [
    { title: "CPU executa contratos", body: "Ela materializa instruções definidas por uma ISA." },
    { title: "Ciclo organiza execução", body: "Buscar, decodificar e executar continua sendo a melhor intuição inicial." },
    { title: "Registradores reduzem espera", body: "São a bancada local de trabalho da CPU." },
    { title: "ALU calcula", body: "Operações aritméticas e lógicas passam por circuitos especializados." },
    { title: "Controle coordena", body: "Sinais internos escolhem caminhos, fontes e destinos dos dados." },
    { title: "Memória e branch complicam", body: "O fluxo real depende de dados chegarem a tempo e do caminho de execução ser previsível." },
  ],
  quiz: [
    q("q1", "O que a ISA descreve?", "O contrato visível ao software: instruções, registradores e comportamento arquitetural.", "A disposição física exata dos transistores.", "A temperatura máxima da CPU.", "a", "ISA é o idioma entre software e hardware, não o layout do chip."),
    q("q2", "Qual registrador indica a próxima instrução a ser buscada?", "Program Counter.", "Stack Pointer.", "Carry Flag.", "a", "O PC guarda o endereço da próxima instrução."),
    q("q3", "Qual sequência melhor resume o ciclo clássico de instrução?", "Buscar, decodificar, executar.", "Compilar, ligar, interpretar.", "Ler, imprimir, salvar.", "a", "Essa decomposição organiza a execução conceitual de uma CPU."),
    q("q4", "Por que registradores são importantes?", "Porque armazenam dados muito perto da execução e reduzem dependência da memória principal.", "Porque substituem completamente a memória RAM.", "Porque só existem em GPUs.", "a", "Eles são pequenos, rápidos e centrais para o fluxo de dados."),
    q("q5", "Qual é o papel da ALU?", "Executar operações aritméticas e lógicas.", "Buscar instruções em disco.", "Compilar código-fonte.", "a", "A ALU é o bloco de cálculo inteiro/lógico da CPU."),
    q("q6", "O que a unidade de controle faz?", "Traduz instruções em sinais internos e coordena o datapath.", "Guarda todos os dados do programa.", "Elimina a necessidade de registradores.", "a", "Ela governa quais blocos são ativados em cada instrução."),
    q("q7", "Por que loads e branches costumam ser mais desafiadores do que somas simples?", "Porque dependem de memória e podem alterar o fluxo previsto de execução.", "Porque a ALU não sabe lidar com eles.", "Porque não usam clock.", "a", "Essas instruções trazem latência e incerteza de caminho."),
    q("q8", "Por que mais GHz não explicam sozinhos o desempenho?", "Porque desempenho também depende do trabalho por ciclo e das esperas evitadas.", "Porque clock não tem relação alguma com CPU.", "Porque toda CPU moderna roda no mesmo clock efetivo.", "a", "Frequência importa, mas não captura cache, pipeline, latência e organização interna."),
  ],
  glossary: [
    g("CPU", "Unidade central de processamento que executa instruções e coordena dados."),
    g("ISA", "Instruction Set Architecture; contrato de instruções e estado visível ao software."),
    g("Instrução", "Operação codificada que a CPU deve realizar."),
    g("Program Counter", "Registrador com o endereço da próxima instrução."),
    g("Registrador", "Armazenamento interno pequeno e muito rápido da CPU."),
    g("Datapath", "Caminho por onde os dados fluem entre registradores, ALU e outras unidades."),
    g("ALU", "Unidade aritmética e lógica."),
    g("Unidade de controle", "Bloco que gera sinais para coordenar a execução da instrução."),
    g("Load", "Instrução que traz um valor da memória para um registrador."),
    g("Store", "Instrução que grava um valor de registrador na memória."),
    g("Branch", "Instrução que pode alterar o caminho de execução."),
    g("Clock", "Sinal de sincronização que marca a cadência de operação da CPU."),
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
