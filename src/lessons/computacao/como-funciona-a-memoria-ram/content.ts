import type { LessonContent } from "../../../types/content";

export const comoFuncionaAMemoriaRamContent: LessonContent = {
  id: "como-funciona-a-memoria-ram",
  title: "Como Funciona a Memória RAM",
  subtitle:
    "Chamamos de RAM como se fosse uma superfície lisa e uniforme, mas por dentro ela é uma hierarquia organizada em chips, bancos, linhas, colunas e células que precisam ser lidas, restauradas e refreshadas.",
  description:
    "Aula interativa sobre o papel da RAM na hierarquia de memória, células DRAM, linhas e colunas, row buffer, refresh, burst/DDR e diferenças conceituais entre registradores, cache, RAM e armazenamento persistente.",
  primaryCategoryId: "computacao",
  secondaryCategoryId: "engenharia",
  level: "Intermediário",
  estimatedTime: "50-60 min",
  tags: ["RAM", "DRAM", "Memória", "Row Buffer", "Refresh", "DDR", "Hierarquia"],
  learningObjectives: [
    "Entender o papel da RAM como memória principal volátil na hierarquia do sistema.",
    "Explicar conceitualmente como uma célula DRAM armazena um bit.",
    "Visualizar organização em linhas, colunas, bancos e row buffers.",
    "Entender por que acesso sequencial à mesma linha pode ser mais favorável.",
    "Explicar por que DRAM precisa de refresh periódico.",
    "Distinguir cache, RAM e armazenamento persistente sem simplificações erradas.",
  ],
  prerequisites: [
    "CPU, cache e hierarquia de memória.",
    "Bits e bytes.",
    "Curiosidade sobre funcionamento físico de hardware.",
  ],
  references: [
    {
      title: "How DRAM memory works",
      source: "Micron Technology — Educator Hub",
      url: "https://www.micron.com/educatorhub/courses/how-dram-memory-works",
      note:
        "Visão oficial e didática de DRAM, incluindo célula, arquitetura e papel sistêmico.",
    },
    {
      title: "Introduction to Memory",
      source: "Micron Technology — material educacional",
      url: "https://www.micron.com/content/dam/micron/educatorhub/intro-to-memory/micron-intro-to-memory-presentation.pdf",
      note:
        "Material introdutório sobre memória semicondutora, DRAM e terminologia relevante.",
    },
    {
      title: "Computation Structures",
      source: "MIT OpenCourseWare — 6.004",
      url: "https://ocw.mit.edu/courses/6-004-computation-structures-spring-2017/",
      note: "Base conceitual de memória, organização e interface com processadores.",
    },
    {
      title: "Operating Systems: Three Easy Pieces",
      source: "Arpaci-Dusseau & Arpaci-Dusseau",
      url: "https://pages.cs.wisc.edu/~remzi/OSTEP/",
      note: "Importante para posicionar RAM dentro da abstração de memória do sistema.",
    },
    {
      title: "What Every Programmer Should Know About Memory",
      source: "Ulrich Drepper",
      url: "https://www.akkadia.org/drepper/cpumemory.pdf",
      note: "Contextualiza memória principal e gargalos práticos para software.",
    },
    {
      title: "DDR SDRAM Standard",
      source: "JEDEC",
      url: "https://www.jedec.org/standards-documents/docs/jesd-79f",
      note: "Referência oficial de padronização da família DDR SDRAM.",
    },
  ],
  heroVisual: "ram-hero",
  openingText:
    "A RAM costuma ser apresentada como 'onde ficam os programas abertos'. Isso é verdade, mas incompleto. Ela é a memória principal do sistema: grande demais para ter a velocidade dos registradores e do cache, porém rápida demais para ser substituída por armazenamento persistente. Entender RAM é entender a camada onde o sistema mantém o estado ativo da computação — e por que esse estado ainda custa tempo e energia para ser acessado.",
  quickFacts: [
    { title: "RAM é volátil", body: "Sem energia, o conteúdo armazenado desaparece." },
    { title: "DRAM guarda carga", body: "Cada célula representa bits por meio de carga elétrica que se perde com o tempo." },
    { title: "Acesso ocorre em linhas", body: "Ativar uma linha inteira influencia o custo dos acessos seguintes." },
    { title: "Refresh é manutenção", body: "A DRAM precisa restaurar periodicamente suas células." },
  ],
  sections: [
    s(
      "papel-da-ram",
      "Hierarquia",
      "Onde a RAM fica no sistema",
      "RAM é a memória principal: maior e mais barata que cache, mas ainda muito mais próxima do processador do que disco ou SSD.",
      "ram-role-visual",
      undefined,
      [
        "Quando um programa roda, seu código e dados ativos precisam estar em algum lugar acessível à CPU com latência razoável. Esse lugar é a RAM, não o armazenamento persistente.",
        "A CPU prefere registradores e cache sempre que possível. Mas quando o conjunto de dados cresce ou o cache não basta, a RAM sustenta o estado principal do processo.",
        "Por isso a RAM é central para multitarefa, bancos em execução, navegação com muitas abas e qualquer carga que mantenha muito estado vivo.",
      ],
      [
        { type: "definition", title: "RAM", body: "Memória principal volátil do sistema, usada para manter dados e instruções ativos durante a execução." },
      ],
    ),
    s(
      "dram-cell",
      "Célula",
      "Como um bit cabe em DRAM",
      "Na DRAM, um bit nasce da presença ou ausência de carga elétrica em uma célula muito pequena.",
      "dram-cell-visual",
      undefined,
      [
        "Uma explicação didática comum descreve a célula DRAM como um transistor e um capacitor. O capacitor guarda uma pequena carga que representa um estado lógico.",
        "O problema é que essa carga vaza com o tempo. Portanto a informação não permanece estável sozinha; a memória precisa ser lida e restaurada periodicamente.",
        "É exatamente por isso que DRAM é chamada de dinâmica: ela depende de manutenção elétrica contínua para preservar os bits.",
      ],
      [
        { type: "definition", title: "DRAM", body: "Dynamic Random Access Memory; tipo de RAM em que as células precisam de refresh periódico." },
        { type: "insight", title: "Dinâmica não significa aleatória", body: "Significa que o estado elétrico precisa ser mantido e restaurado ao longo do tempo." },
      ],
    ),
    s(
      "linhas-colunas-bancos",
      "Organização",
      "A RAM é uma matriz organizada",
      "Endereços não são atendidos por uma massa amorfa de bytes; eles passam por uma organização em linhas, colunas e bancos.",
      "dram-matrix-visual",
      undefined,
      [
        "Uma forma intuitiva de ver a DRAM é como uma grande matriz. Para acessar um dado, o sistema ativa uma linha e depois escolhe colunas dentro dela.",
        "Os chips são ainda organizados em bancos, o que permite algum paralelismo e multiplexação de acessos. Isso ajuda a esconder parte do custo interno.",
        "O ponto pedagógico é que 'acessar um byte' já embute uma coreografia física maior do que a API aparente sugere.",
      ],
      [
        { type: "definition", title: "Banco", body: "Subconjunto da memória DRAM que pode manter organização própria de linhas e colunas." },
      ],
    ),
    s(
      "row-buffer",
      "Acesso",
      "Abrir uma linha cria contexto para os próximos acessos",
      "Quando uma linha é ativada, a DRAM ganha um tipo de vizinhança ativa que favorece certos padrões de leitura.",
      "row-buffer-visual",
      "dram-row-buffer-lab",
      [
        "Uma linha ativada pode ser entendida como estando 'aberta' em um buffer temporário. Acessos seguintes à mesma linha tendem a aproveitar esse contexto já preparado.",
        "Quando o acesso muda para outra linha do mesmo banco, a memória precisa fechar ou prechargear o estado anterior e ativar a nova linha. Isso acrescenta custo.",
        "Essa ideia conversa com a aula de cache: também aqui a vizinhança e o padrão de acesso importam, embora por motivos internos diferentes.",
      ],
      [
        { type: "definition", title: "Row buffer", body: "Buffer associado à linha ativada da DRAM, usado para servir acessos às colunas daquela linha." },
      ],
    ),
    s(
      "refresh",
      "Manutenção",
      "Por que a DRAM precisa de refresh",
      "Se a carga vaza, o sistema precisa regravar periodicamente as células antes que a informação se perca.",
      "refresh-visual",
      "refresh-burst-simulator",
      [
        "Refresh é um processo de preservação. Ele percorre linhas da memória para restaurar a carga elétrica das células, mantendo os bits válidos ao longo do tempo.",
        "Isso consome tempo e energia, ainda que grande parte do processo seja abstraída pelo controlador de memória e pelos módulos modernos.",
        "A consequência conceitual é importante: RAM não é um meio perfeitamente estático. Ela exige atividade contínua apenas para manter o estado existente.",
      ],
      [
        { type: "mistake", title: "Pensar que refresh é só uma otimização", body: "Sem refresh, a DRAM perderia informação por vazamento de carga." },
      ],
    ),
    s(
      "ddr-e-burst",
      "Transferência",
      "DDR e burst: movimentar vários dados por ativação",
      "Uma parte importante do desempenho vem da forma como dados são transferidos em rajadas eficientes, não apenas do acesso unitário.",
      "ddr-burst-visual",
      undefined,
      [
        "Memórias DDR foram projetadas para aumentar a taxa de transferência por meio de mecanismos de temporização e transferência em rajadas. Isso melhora o aproveitamento do caminho de dados.",
        "Na prática, vale guardar a intuição de que a memória é otimizada para fluxos organizados e blocos, não para uma sequência totalmente caótica de pedidos unitários.",
        "Essa organização explica por que controladores, pré-buscas e padrões de acesso sequenciais influenciam tanto a largura de banda observada.",
      ],
      [
        { type: "definition", title: "Burst", body: "Transferência de uma sequência curta de dados em uma rajada após a preparação do acesso." },
      ],
    ),
    s(
      "ram-vs-cache-vs-disco",
      "Comparação",
      "RAM não é cache e também não é armazenamento persistente",
      "Confundir essas camadas leva a intuições erradas sobre velocidade, capacidade e durabilidade dos dados.",
      "hierarchy-compare-visual",
      "memory-hierarchy-chooser",
      [
        "Cache serve como camada menor e muito mais rápida para tentar esconder a latência da RAM. A RAM, por sua vez, guarda o estado principal ativo do sistema. Disco e SSD servem para persistência, não para alimentar a CPU diretamente em cada operação.",
        "Quando um programa fecha, os dados que só estavam na RAM desaparecem. Quando o sistema precisa de algo que está no SSD, ele precisa primeiro trazê-lo de volta para a RAM.",
        "Essa separação ajuda a interpretar consumo de memória, page faults, warm caches e gargalos de I/O em sistemas reais.",
      ],
      [
        { type: "example", title: "Abrir um arquivo grande", body: "Os bytes vêm do armazenamento persistente para a RAM; dali a CPU passa a consumi-los com ajuda dos caches." },
      ],
    ),
    s(
      "software-e-ram",
      "Síntese",
      "Pensar em RAM melhora software e arquitetura",
      "Aplicações, sistemas operacionais e controladores de memória todos tentam cooperar com essa organização física.",
      "ram-software-visual",
      undefined,
      [
        "A ordem de acesso, o volume de dados ativos, a forma de particionar estruturas e o reuso de regiões quentes afetam a pressão sobre a RAM e sobre os níveis superiores da hierarquia.",
        "Sistemas operacionais também entram no jogo, alocando páginas, gerenciando processos e equilibrando o uso da memória principal.",
        "A moral é simples: RAM não é uma caixa-preta homogênea. Ela é uma peça ativa da performance e da confiabilidade do sistema.",
      ],
      [
        { type: "insight", title: "Memória principal é infraestrutura de software", body: "Toda aplicação real negocia com a RAM, queira ou não." },
      ],
    ),
    s("quiz-revisao", "Revisão", "Quiz de revisão", "Reforce o modelo de DRAM, row buffer, refresh e posição da RAM na hierarquia.", undefined, "quiz", ["O objetivo é substituir a ideia de 'RAM como caixa única' por um modelo mais rico e útil."], []),
    s("glossario", "Glossário", "Termos essenciais", "Consolide o vocabulário mínimo para falar de memória principal com precisão.", undefined, "glossary", ["Esses conceitos reaparecem em sistema operacional, virtual memory, GPU e performance."], []),
  ],
  summaryCards: [
    { title: "RAM é memória principal", body: "Ela sustenta o estado ativo da computação entre cache e armazenamento persistente." },
    { title: "DRAM guarda carga", body: "Cada bit depende de estado elétrico que precisa ser mantido." },
    { title: "Organização importa", body: "Linhas, colunas e bancos estruturam o acesso interno." },
    { title: "Linha aberta ajuda", body: "Acessos à mesma linha podem aproveitar o row buffer." },
    { title: "Refresh preserva dados", body: "Sem manutenção periódica, as células perderiam informação." },
    { title: "DDR explora rajadas", body: "Transferências eficientes valorizam fluxo organizado de dados." },
  ],
  quiz: [
    q("q1", "Qual é o papel principal da RAM no sistema?", "Guardar dados e instruções ativos durante a execução.", "Substituir registradores e cache.", "Persistir arquivos sem energia.", "a", "RAM é a memória principal volátil onde o estado ativo fica disponível ao sistema."),
    q("q2", "Por que a DRAM é chamada de dinâmica?", "Porque suas células precisam de refresh periódico para manter os bits.", "Porque muda automaticamente o valor dos programas.", "Porque só funciona com dados variáveis.", "a", "A carga elétrica vaza com o tempo e precisa ser restaurada."),
    q("q3", "Qual descrição intuitiva ajuda a entender uma célula DRAM?", "Um transistor e um capacitor usados para armazenar carga.", "Um registrador completo dentro de cada byte.", "Uma porta XOR para cada endereço.", "a", "Essa é a explicação didática comum para a célula básica da DRAM."),
    q("q4", "O que acontece quando uma linha da DRAM é ativada?", "Ela pode ser tratada como aberta em um row buffer para acessos às suas colunas.", "Toda a memória vira cache.", "O SSD recebe uma cópia dos dados.", "a", "A linha aberta cria contexto favorável para acessos subsequentes nessa mesma linha."),
    q("q5", "Por que refresh existe?", "Porque a carga das células vaza e precisa ser restaurada.", "Porque a CPU precisa recalcular números inteiros.", "Porque o cache invalida a RAM continuamente.", "a", "Sem refresh, a DRAM perderia informação armazenada."),
    q("q6", "Qual frase diferencia bem RAM e armazenamento persistente?", "RAM é volátil e serve ao estado ativo; SSD/disco persistem dados a longo prazo.", "RAM e SSD têm o mesmo papel, só mudam de tamanho.", "SSD existe apenas para backup manual.", "a", "Essas camadas têm funções distintas na hierarquia."),
    q("q7", "O que burst ajuda a fazer?", "Transferir uma sequência de dados de forma mais eficiente após a preparação do acesso.", "Eliminar a necessidade de row buffer.", "Transformar RAM em cache L1.", "a", "Burst melhora o aproveitamento do caminho de transferência."),
    q("q8", "Por que o padrão de acesso também importa para RAM, e não só para cache?", "Porque a organização em linhas e bancos favorece certos acessos mais do que outros.", "Porque a RAM escolhe aleatoriamente a ordem dos bytes.", "Porque a ALU decide como a DRAM se organiza fisicamente.", "a", "A estrutura interna da DRAM também reage ao padrão de leitura e escrita."),
  ],
  glossary: [
    g("RAM", "Memória principal volátil usada para dados e instruções ativos."),
    g("DRAM", "Tipo de RAM dinâmica que requer refresh periódico."),
    g("Volátil", "Que perde conteúdo quando a energia é removida."),
    g("Célula de memória", "Unidade física básica usada para armazenar um bit."),
    g("Linha (row)", "Conjunto de células ativado em bloco em uma matriz DRAM."),
    g("Coluna", "Seleção interna usada após a ativação de uma linha."),
    g("Banco", "Subestrutura da DRAM com organização própria de linhas e colunas."),
    g("Row buffer", "Buffer associado à linha atualmente ativada."),
    g("Refresh", "Processo de restauração periódica da carga das células DRAM."),
    g("DDR", "Família de memórias SDRAM com alta taxa de transferência por temporização e rajadas."),
    g("Burst", "Sequência curta de dados transferida em rajada."),
    g("Memória principal", "Camada onde o sistema mantém o estado ativo acessível ao processador."),
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
