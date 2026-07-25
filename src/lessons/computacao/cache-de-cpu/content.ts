import type { LessonContent } from "../../../types/content";

export const cacheDeCpuContent: LessonContent = {
  id: "cache-de-cpu",
  title: "Cache de CPU",
  subtitle:
    "Grande parte da velocidade percebida de um programa não depende só de 'quantas contas' ele faz, mas de quão bem ele reaproveita dados próximos no tempo e no espaço.",
  description:
    "Aula interativa sobre hierarquia de memória, localidade temporal e espacial, cache lines, hit/miss, mapeamento por conjuntos, stride de acesso e por que pequenos detalhes de organização mudam muito a performance.",
  primaryCategoryId: "computacao",
  secondaryCategoryId: "engenharia",
  level: "Intermediário",
  estimatedTime: "50-60 min",
  tags: ["Cache", "Localidade", "Performance", "Memória", "Cache Line", "Hit", "Miss"],
  learningObjectives: [
    "Entender por que caches existem na hierarquia de memória.",
    "Explicar localidade temporal e espacial com exemplos concretos.",
    "Visualizar o papel de cache lines e o custo relativo de hits e misses.",
    "Interpretar mapeamento por conjuntos, tag e índice de maneira intuitiva.",
    "Relacionar padrão de acesso em arrays e matrizes ao comportamento de cache.",
    "Reconhecer que performance de software depende fortemente de organização de dados.",
  ],
  prerequisites: [
    "CPU, registradores e memória principal.",
    "Noção de endereços e bytes.",
    "Curiosidade sobre desempenho de programas.",
  ],
  references: [
    {
      title: "Computer Systems: A Programmer's Perspective",
      source: "Bryant e O'Hallaron — Carnegie Mellon University",
      url: "https://csapp.cs.cmu.edu/",
      note: "Referência central para caches, localidade e efeitos em desempenho.",
    },
    {
      title: "What Every Programmer Should Know About Memory",
      source: "Ulrich Drepper",
      url: "https://www.akkadia.org/drepper/cpumemory.pdf",
      note: "Texto clássico sobre subsistemas de memória e implicações práticas.",
    },
    {
      title: "Memory Hierarchy, Revisited",
      source: "UC Berkeley CS 61C Notes",
      url: "https://notes.cs61c.org/content/caches-intro/memory-hierarchy/",
      note: "Introdução universitária moderna à hierarquia de memória.",
    },
    {
      title: "Cache Terminology",
      source: "UC Berkeley CS 61C Notes",
      url: "https://notes.cs61c.org/content/caches-ii/",
      note: "Ótimo para blocos, linhas, tags e vocabulário técnico.",
    },
    {
      title: "Computation Structures",
      source: "MIT OpenCourseWare — 6.004",
      url: "https://ocw.mit.edu/courses/6-004-computation-structures-spring-2017/",
      note: "Complementa a intuição de arquitetura e hierarquia de memória.",
    },
  ],
  heroVisual: "cache-hero",
  openingText:
    "Do ponto de vista do programador, memória parece uma coisa só: você pede um endereço e o dado aparece. Do ponto de vista do hardware, isso seria lento demais. A solução é empilhar níveis de armazenamento com tamanhos e velocidades diferentes. O cache é a camada que tenta manter por perto aquilo que a CPU provavelmente vai usar em seguida. Quase toda a intuição de performance moderna começa aqui.",
  quickFacts: [
    { title: "Hit é ouro", body: "Quando o dado já está no cache, a CPU evita um acesso mais caro aos níveis inferiores." },
    { title: "Miss custa coordenação", body: "Buscar fora do cache quebra o fluxo da CPU e introduz espera." },
    { title: "Linhas carregam vizinhança", body: "O cache traz blocos contíguos, não bytes isolados." },
    { title: "Localidade é aposta", body: "O hardware aposta que o programa vai reutilizar dados recentes ou próximos." },
  ],
  sections: [
    s(
      "parede-da-memoria",
      "Motivação",
      "Por que existe cache",
      "CPU e memória principal evoluíram em ritmos diferentes; o cache nasce para reduzir esse descompasso prático.",
      "memory-wall-visual",
      undefined,
      [
        "Se toda leitura tivesse que esperar diretamente a memória principal, a CPU passaria muito tempo ociosa. O problema não é apenas capacidade, mas principalmente latência e largura de banda efetiva no caminho dos dados.",
        "O cache é um armazenamento menor e mais rápido que guarda cópias de dados recentemente usados ou provavelmente úteis em breve.",
        "Essa ideia só funciona porque programas reais não acessam dados de maneira totalmente aleatória. Eles tendem a revisitar regiões e padrões. Essa regularidade recebe o nome de localidade.",
      ],
      [
        { type: "definition", title: "Cache", body: "Memória pequena e rápida que armazena cópias de dados vindos de níveis mais lentos da hierarquia." },
      ],
    ),
    s(
      "localidade",
      "Princípio",
      "Localidade temporal e espacial",
      "Caches dão certo porque programas costumam reutilizar dados recentes e acessar regiões vizinhas.",
      "locality-visual",
      "locality-walkthrough",
      [
        "Localidade temporal significa: se um dado foi usado agora, há boa chance de ser usado de novo em breve. Variáveis de loop, contadores e estruturas quentes entram aqui.",
        "Localidade espacial significa: se um endereço foi acessado, endereços próximos têm boa chance de serem acessados logo depois. Percorrer um array linearmente é o exemplo clássico.",
        "A hierarquia de memória foi desenhada para explorar esses dois hábitos. Programas que quebram esses padrões sofrem mais misses e parecem inexplicavelmente lentos.",
      ],
      [
        { type: "definition", title: "Localidade temporal", body: "Tendência de reutilizar dados recentemente acessados." },
        { type: "definition", title: "Localidade espacial", body: "Tendência de acessar dados próximos no endereço após um acesso inicial." },
      ],
    ),
    s(
      "linhas-de-cache",
      "Unidade",
      "Cache não carrega um byte de cada vez",
      "O hardware transfere blocos chamados cache lines porque a vizinhança do dado costuma importar.",
      "cache-line-visual",
      undefined,
      [
        "Quando a CPU pede um endereço e ocorre miss, o cache normalmente busca uma linha inteira da memória inferior. Isso amortiza o custo do acesso e prepara o terreno para localidade espacial.",
        "Se você acessa um elemento de um array, é comum que alguns elementos vizinhos venham juntos na mesma linha. Os próximos acessos então podem virar hits.",
        "Esse detalhe ajuda a explicar por que percursos lineares são tão amigos do cache e por que saltos grandes demais desperdiçam boa parte da linha trazida.",
      ],
      [
        { type: "definition", title: "Cache line", body: "Bloco de dados transferido entre níveis de memória e armazenado no cache como unidade básica." },
        { type: "insight", title: "Trazer mais do que pediu é estratégia", body: "O cache aposta que a vizinhança do dado será útil logo depois." },
      ],
    ),
    s(
      "hit-miss",
      "Comportamento",
      "Hit e miss: a diferença que o programa sente",
      "Do ponto de vista do código, a instrução é a mesma; o custo muda radicalmente conforme o dado já esteja ou não no cache.",
      "hit-miss-visual",
      undefined,
      [
        "Um hit ocorre quando o dado procurado já está disponível no cache relevante. Um miss ocorre quando é preciso buscá-lo em um nível inferior, como outro cache ou a RAM.",
        "A diferença operacional está no tempo de espera e no fluxo quebrado da CPU. Uma conta barata pode ficar cara se depende de dados que chegam tarde.",
        "É por isso que desempenho não pode ser medido apenas em número de operações lógicas ou aritméticas. A origem dos dados pesa enormemente.",
      ],
      [
        { type: "mistake", title: "Achar que toda leitura de memória 'é igual'", body: "Mesmo endereço lógico, tempos muito diferentes dependendo do nível onde o dado se encontra." },
      ],
    ),
    s(
      "mapeamento",
      "Organização",
      "Como o cache decide onde guardar um bloco",
      "Linhas não ficam em qualquer lugar; a organização usa índice, tag e, em muitos casos, conjuntos.",
      "mapping-visual",
      "cache-mapping-lab",
      [
        "Para procurar rapidamente um bloco, o cache divide o endereço em partes com papéis diferentes. Uma parte ajuda a escolher o conjunto ou posição candidata. Outra parte, a tag, confirma se aquele bloco é realmente o procurado.",
        "Esse arranjo evita busca ampla demais, mas cria conflitos: dois blocos distintos podem disputar as mesmas posições no cache.",
        "Quando o padrão de acesso provoca muitos conflitos, a taxa de miss pode crescer mesmo que o volume total de dados pareça pequeno.",
      ],
      [
        { type: "definition", title: "Tag", body: "Parte do endereço usada para confirmar se a linha armazenada corresponde ao bloco procurado." },
        { type: "definition", title: "Índice", body: "Parte do endereço usada para escolher a região do cache onde procurar o bloco." },
      ],
    ),
    s(
      "padroes-de-acesso",
      "Prática",
      "O padrão de acesso muda tudo",
      "Dois algoritmos com trabalho parecido podem ter comportamentos muito diferentes no cache.",
      "stride-visual",
      "stride-pattern-demo",
      [
        "Percorrer um array elemento por elemento aproveita localidade espacial e tende a reutilizar linhas recém-trazidas. Saltar de forma espaçada ou percorrer colunas de uma matriz armazenada em ordem por linhas tende a desperdiçar linhas e gerar mais misses.",
        "Isso vale muito em processamento numérico, imagens, bancos de dados e machine learning. A ordem de visita aos dados pode mudar a performance sem alterar o resultado lógico.",
        "O programador que entende cache passa a enxergar layout e iteração como decisões algorítmicas, não como detalhes cosméticos.",
      ],
      [
        { type: "example", title: "Matriz linha a linha", body: "Acessos seguem endereços contíguos e aproveitam melhor a linha de cache." },
        { type: "mistake", title: "Focar só em complexidade assintótica", body: "Dois O(n) podem ter custos muito diferentes se um deles destrói a localidade." },
      ],
    ),
    s(
      "escritas-e-substituicao",
      "Refino",
      "Cache também decide o que sai e quando escrever",
      "Quando o espaço é finito, o hardware precisa escolher vítimas e políticas de atualização.",
      "policy-visual",
      undefined,
      [
        "Se um novo bloco chega e não há espaço livre, alguma linha existente precisa ser substituída. Diferentes políticas tentam aproximar o 'melhor palpite' de qual linha fará menos falta depois.",
        "Escritas também exigem política: atualizar só o cache por um tempo, escrever imediatamente no próximo nível, alocar ou não em caso de miss. Cada escolha envolve compromissos entre simplicidade, consistência e tráfego.",
        "Mesmo sem entrar em todos os detalhes microarquiteturais, vale guardar a ideia de que o cache é um sistema de decisões contínuas, não um armário passivo.",
      ],
      [
        { type: "insight", title: "Cache é heurística em hardware", body: "Ele vive fazendo apostas sobre o futuro imediato do programa." },
      ],
    ),
    s(
      "ligacao-com-software",
      "Síntese",
      "Pensar em cache muda como escrevemos software",
      "Estruturas de dados, ordem de iteração e batching influenciam diretamente a eficiência do acesso.",
      "software-link-visual",
      undefined,
      [
        "Programas rápidos não apenas fazem menos trabalho abstrato; eles também organizam melhor o trabalho sobre a memória. Isso aparece em blocagem de matrizes, layouts contíguos, buffers quentes e particionamento por blocos.",
        "Em aplicações modernas, otimizações de cache aparecem de ponta a ponta: engines de banco, kernels numéricos, codecs, renderização e inferência de IA.",
        "A grande ideia é simples: o computador não sofre apenas para calcular. Ele sofre para trazer o que precisa calcular.",
      ],
      [
        { type: "insight", title: "Localidade é design", body: "Pensar nos dados como fluxo físico melhora a qualidade das decisões de software." },
      ],
    ),
    s("quiz-revisao", "Revisão", "Quiz de revisão", "Verifique se localidade, linhas, mapeamento e padrões de acesso ficaram conectados.", undefined, "quiz", ["O objetivo é enxergar cache como comportamento, não como uma lista de siglas."], []),
    s("glossario", "Glossário", "Termos essenciais", "Feche a aula consolidando o vocabulário da hierarquia de memória.", undefined, "glossary", ["Esses conceitos voltam em RAM, GPU, bancos de dados e performance de software."], []),
  ],
  summaryCards: [
    { title: "Cache reduz espera", body: "Ele aproxima da CPU dados que provavelmente serão usados." },
    { title: "Localidade justifica a aposta", body: "Programas reais costumam reutilizar dados recentes e vizinhos." },
    { title: "Linha é unidade prática", body: "O cache move blocos inteiros para aproveitar vizinhança." },
    { title: "Hit e miss mudam o tempo", body: "A mesma instrução sente custos muito diferentes conforme a origem do dado." },
    { title: "Mapeamento cria conflitos", body: "Mesmo com pouco dado total, padrões ruins podem disputar as mesmas linhas." },
    { title: "Software influencia cache", body: "Layout e ordem de acesso mudam muito a performance observada." },
  ],
  quiz: [
    q("q1", "Por que caches existem?", "Porque acessar diretamente níveis mais lentos o tempo todo deixaria a CPU esperando demais.", "Porque a RAM não consegue armazenar números inteiros.", "Porque registradores não podem guardar instruções.", "a", "O cache reduz o custo médio de acesso na hierarquia de memória."),
    q("q2", "O que é localidade temporal?", "Tendência de reutilizar em breve um dado acessado recentemente.", "Tendência de acessar endereços numericamente maiores.", "Tendência de usar sempre a mesma instrução.", "a", "Esse princípio ajuda a justificar manter dados recentes perto da CPU."),
    q("q3", "O que é localidade espacial?", "Tendência de acessar endereços próximos após um acesso inicial.", "Tendência de usar mais núcleos da CPU.", "Tendência de escrever mais do que ler.", "a", "Ela explica por que linhas de cache trazem blocos contíguos."),
    q("q4", "O que é uma cache line?", "Bloco básico transferido e armazenado pelo cache.", "Um registrador especial dentro da ALU.", "Uma instrução dedicada a acessar memória.", "a", "O cache trabalha com blocos, não normalmente com bytes isolados."),
    q("q5", "Qual situação descreve um hit?", "O dado já está no cache consultado.", "O dado precisa ser buscado na RAM.", "O processador mudou de núcleo.", "a", "Num hit, a CPU evita um acesso mais caro aos níveis inferiores."),
    q("q6", "Para que serve a tag no cache?", "Confirmar se a linha candidata corresponde ao bloco procurado.", "Medir a temperatura do bloco.", "Escolher o tamanho da RAM.", "a", "Ela participa da identificação correta do bloco armazenado."),
    q("q7", "Por que percorrer uma matriz linha a linha costuma ser melhor do que coluna a coluna em armazenamento row-major?", "Porque aproveita melhor a localidade espacial e as linhas de cache.", "Porque a ALU só entende linhas.", "Porque colunas ocupam mais bits.", "a", "Acessos contíguos reutilizam melhor blocos recém-carregados."),
    q("q8", "Qual ideia resume melhor a relação entre software e cache?", "A organização dos dados e a ordem de acesso influenciam diretamente a performance.", "Cache é invisível e portanto irrelevante para quem programa.", "Só hardware pode melhorar hits e misses.", "a", "Layout e iteração podem mudar muito o comportamento observado."),
  ],
  glossary: [
    g("Cache", "Memória pequena e rápida que guarda cópias de dados de níveis mais lentos."),
    g("Hierarquia de memória", "Organização em níveis com diferentes tamanhos e velocidades."),
    g("Localidade temporal", "Reuso provável de dados recentemente acessados."),
    g("Localidade espacial", "Acesso provável a dados vizinhos no endereço."),
    g("Cache line", "Bloco básico de transferência e armazenamento no cache."),
    g("Hit", "Acesso bem-sucedido em que o dado já está no cache."),
    g("Miss", "Acesso em que o dado precisa ser buscado em nível inferior."),
    g("Tag", "Parte do endereço usada para identificar um bloco armazenado."),
    g("Índice", "Parte do endereço usada para localizar o conjunto ou posição candidata."),
    g("Conflito de cache", "Situação em que blocos diferentes competem pelas mesmas posições."),
    g("Stride", "Passo entre acessos consecutivos em uma estrutura de dados."),
    g("Política de substituição", "Regra usada para escolher qual linha sai quando chega um novo bloco."),
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
