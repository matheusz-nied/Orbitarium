import type { LessonContent } from "../../../types/content";

export const gpuParaIaContent: LessonContent = {
  id: "gpu-para-ia",
  title: "GPU: Por Que Ela É Boa para IA",
  subtitle:
    "Modelos de IA fazem muitas operações parecidas sobre muitos dados. A GPU se destaca justamente quando o trabalho pode ser dividido em milhares de pedaços coordenados.",
  description:
    "Uma aula visual sobre paralelismo massivo, SIMT, tensores, warps, hierarquia de memória, throughput, gargalos de bandwidth e por que GPUs aceleram treinamento e inferência.",
  primaryCategoryId: "computacao",
  secondaryCategoryId: "inteligencia-artificial",
  level: "Intermediário",
  estimatedTime: "45-55 min",
  tags: ["GPU", "IA", "Paralelismo", "SIMT", "Tensores", "Bandwidth"],
  learningObjectives: [
    "Entender por que cargas de IA combinam bem com GPU.",
    "Comparar CPU e GPU em termos de objetivo arquitetural, não de hype.",
    "Explicar a ideia de kernels, warps e execução SIMT.",
    "Relacionar desempenho de IA a paralelismo e movimentação de memória.",
    "Reconhecer o papel da hierarquia de memória no custo real de operações.",
    "Distinguir gargalos de compute e de bandwidth em linguagem conceitual.",
  ],
  prerequisites: [
    "Noção básica de matrizes e vetores.",
    "Entender que CPU executa instruções sobre dados em memória.",
    "Conhecimentos avançados de hardware não são necessários.",
  ],
  references: [
    {
      title: "CUDA C++ Programming Guide",
      source: "NVIDIA Documentation",
      url: "https://docs.nvidia.com/cuda/cuda-c-programming-guide/index.html",
      note:
        "Referência oficial para modelo de execução, memória e programação de GPUs NVIDIA.",
    },
    {
      title: "CUDA C++ Best Practices Guide",
      source: "NVIDIA Documentation",
      url: "https://docs.nvidia.com/cuda/cuda-c-best-practices-guide/index.html",
      note:
        "Discute localidade, movimentação de memória e padrões eficientes em GPU.",
    },
    {
      title: "PyTorch CUDA semantics",
      source: "PyTorch Documentation",
      url: "https://pytorch.org/docs/stable/notes/cuda.html",
      note:
        "Conecta o uso prático de GPU em deep learning com o modelo de execução do framework.",
    },
    {
      title: "Machine Learning Glossary — Accelerator",
      source: "Google for Developers",
      url: "https://developers.google.com/machine-learning/glossary#accelerator",
      note:
        "Material educativo sobre aceleradores e seu papel em cargas de machine learning.",
    },
    {
      title: "CS231n: Convolutional Neural Networks for Visual Recognition",
      source: "Stanford University",
      url: "https://cs231n.stanford.edu/",
      note:
        "Curso amplamente usado que contextualiza computação tensorial em deep learning.",
    },
    {
      title: "Computer Systems: A Programmer's Perspective",
      source: "CMU",
      url: "https://csapp.cs.cmu.edu/",
      note:
        "Ajuda a conectar arquitetura, throughput e hierarquia de memória ao desempenho observado.",
    },
  ],
  heroVisual: "gpu-hero",
  openingText:
    "Uma rede neural costuma aplicar a mesma classe de operações — multiplicar, somar, acumular, normalizar — sobre enormes grades de números. Isso é diferente de um programa interativo cheio de desvios imprevisíveis e decisões irregulares. A GPU brilha quando há muito trabalho homogêneo para muitos dados. Ela não é 'mágica para IA'; ela simplesmente foi organizada para throughput alto em tarefas paralelizáveis. O segredo está tanto na quantidade de unidades de execução quanto na forma como memória e controle são administrados.",
  quickFacts: [
    {
      title: "IA usa operações repetitivas",
      body:
        "Multiplicações e somas sobre tensores grandes podem ser distribuídas em muitos pedaços semelhantes.",
    },
    {
      title: "GPU mira throughput",
      body:
        "A arquitetura favorece manter muitas operações em andamento em vez de otimizar ao máximo uma única thread complexa.",
    },
    {
      title: "Memória pode mandar no desempenho",
      body:
        "Mover dados pode ser tão limitante quanto calcular, especialmente em lotes e ativações grandes.",
    },
  ],
  sections: [
    s(
      "motivacao",
      "Motivação",
      "O que IA faz que combina tanto com GPU?",
      "Modelos modernos executam padrões matemáticos muito repetidos sobre lotes inteiros de dados.",
      "gpu-cpu-vs-gpu",
      undefined,
      [
        "Treinar ou inferir com redes neurais envolve aplicar a mesma sequência de operações a muitos elementos de um tensor. A forma exata do modelo muda, mas a ideia geral se repete: muita álgebra linear e muita repetição estruturada.",
        "Esse perfil de trabalho favorece paralelismo de dados. Em vez de uma unidade poderosa fazendo tudo sozinha, milhares de unidades podem trabalhar em partes diferentes do mesmo problema.",
        "É por isso que GPU se tornou dominante em IA prática: não porque entenda aprendizado de máquina, mas porque o formato do trabalho encaixa bem na sua organização interna.",
      ],
      [
        {
          type: "definition",
          title: "Tensor",
          body:
            "Estrutura multidimensional de números sobre a qual modelos de IA aplicam operações como soma, multiplicação e redução.",
        },
        {
          type: "insight",
          title: "IA não precisa só de 'mais CPU'",
          body:
            "Ela precisa de uma forma eficiente de repetir operações parecidas muitas e muitas vezes em paralelo.",
        },
      ],
    ),
    s(
      "cpu-vs-gpu",
      "Arquitetura",
      "CPU e GPU foram desenhadas para objetivos diferentes",
      "CPU privilegia baixa latência e flexibilidade; GPU privilegia throughput e volume de trabalho homogêneo.",
      "gpu-cpu-vs-gpu",
      undefined,
      [
        "A CPU costuma ser ótima em tarefas cheias de ramificações, lógica de controle, decisões irregulares e pequenas quantidades de trabalho sensível à latência.",
        "A GPU foi organizada para manter muitas operações semelhantes avançando juntas. Em vez de colocar todo o orçamento em poucas unidades muito complexas, ela replica unidades de execução e depende de paralelismo massivo.",
        "Isso não torna uma melhor que a outra em geral. Significa apenas que cada uma responde melhor a perfis de carga diferentes. IA intensiva em tensores costuma parecer muito mais com o mundo da GPU.",
      ],
      [
        {
          type: "definition",
          title: "Throughput",
          body:
            "Quantidade total de trabalho concluído por unidade de tempo, especialmente relevante em arquiteturas voltadas a processar muitos dados.",
        },
        {
          type: "mistake",
          title: "Comparar CPU e GPU como se fossem rivais genéricas",
          body:
            "Elas são complementares e normalmente trabalham juntas: CPU orquestra, GPU acelera trechos adequados.",
        },
      ],
    ),
    s(
      "kernels",
      "Execução",
      "Kernel, blocos, warps: a GPU organiza multidões de threads",
      "Um kernel define o trabalho; a GPU o distribui em grupos que avançam com forte coordenação.",
      "gpu-simt",
      "matrix-parallelism-lab",
      [
        "Em programação de GPU, um kernel descreve uma operação a ser aplicada por muitas threads. Cada thread trabalha em um pedaço do dado, como um elemento de vetor ou uma célula da saída de uma matriz.",
        "Essas threads são agrupadas e executadas sob regras de coordenação específicas do hardware. O objetivo é manter a máquina ocupada com trabalho suficiente para esconder latências e sustentar throughput.",
        "Para IA, isso casa muito bem com operações como multiplicação de matrizes, convoluções e transformações sobre lotes, onde o mesmo padrão se repete em grande escala.",
      ],
      [
        {
          type: "definition",
          title: "Kernel (GPU)",
          body:
            "Função ou operação lançada para ser executada por muitas threads na GPU ao mesmo tempo.",
        },
        {
          type: "example",
          title: "Produto de matrizes",
          body:
            "Cada thread pode colaborar para calcular elementos diferentes do resultado, explorando paralelismo de dados.",
        },
      ],
    ),
    s(
      "simt",
      "Modelo",
      "SIMT: muitas threads, uma lógica parecida",
      "A GPU prospera quando grupos de threads seguem trajetórias semelhantes de execução.",
      "gpu-simt",
      "warp-divergence-lab",
      [
        "Um grupo de threads costuma avançar de forma coordenada. Quando todas executam caminhos parecidos, o hardware aproveita muito melhor os recursos.",
        "Quando cada thread começa a seguir ramificações muito diferentes, aparece divergência. Parte do grupo avança enquanto outra parte espera ou executa outro caminho, o que reduz eficiência.",
        "Muitas cargas de IA funcionam bem justamente porque aplicam operações regulares sobre dados numerosos. Há menos lógica imprevisível e mais repetição controlada.",
      ],
      [
        {
          type: "definition",
          title: "SIMT",
          body:
            "Single Instruction, Multiple Threads: modelo em que muitas threads executam trabalho semelhante sob coordenação do hardware.",
        },
        {
          type: "insight",
          title: "Regularidade é amiga da GPU",
          body:
            "Quanto mais homogêneo o fluxo de execução, melhor o hardware consegue manter suas unidades ocupadas.",
        },
      ],
    ),
    s(
      "memoria",
      "Hierarquia",
      "Nem tudo é calcular: mover dados também custa",
      "Uma operação pode estar limitada não pela matemática em si, mas pela velocidade com que os dados chegam ao lugar certo.",
      "gpu-memory",
      undefined,
      [
        "GPUs têm hierarquias de memória e custos diferentes para cada caminho de acesso. Buscar dados de áreas mais distantes ou de forma desorganizada pode degradar o ganho obtido com paralelismo.",
        "Por isso, programação eficiente em GPU não é apenas 'jogar para a placa'. É estruturar dados, acessos e reutilização de forma que muito trabalho útil aconteça por dado movimentado.",
        "Essa preocupação aparece diretamente em IA: batch size, layout de tensores, reuso em camadas e fusão de operações afetam o quanto a GPU passa o tempo calculando ou esperando memória.",
      ],
      [
        {
          type: "definition",
          title: "Bandwidth",
          body:
            "Taxa com que dados podem ser movimentados entre diferentes níveis de memória e unidades de processamento.",
        },
        {
          type: "mistake",
          title: "Achar que gargalo é sempre 'falta de poder de cálculo'",
          body:
            "Muitas vezes o problema é alimentar a GPU com dados no ritmo que ela conseguiria consumir.",
        },
      ],
    ),
    s(
      "compute-vs-bandwidth",
      "Trade-off",
      "Alguns workloads são compute-bound; outros, memory-bound",
      "Quanto trabalho útil você faz por dado movimentado muda completamente o tipo de gargalo.",
      "gpu-memory",
      "bandwidth-vs-compute-lab",
      [
        "Se cada bloco de dados gera muitas operações, o trabalho tende a ser mais compute-bound. Se pouco cálculo útil acontece antes de precisar buscar mais dados, o workload tende a ser mais memory-bound.",
        "Essa distinção ajuda a entender por que duas operações aparentemente 'grandes' podem ter comportamentos muito diferentes na GPU. Nem todo tensor enorme produz ótimo aproveitamento.",
        "Em IA prática, otimizações como fusão de kernels, melhor layout de memória e batching adequado tentam aumentar trabalho útil por acesso e reduzir desperdício de movimentação.",
      ],
      [
        {
          type: "insight",
          title: "Mais paralelismo não resolve tudo",
          body:
            "Se a memória continua sendo o gargalo, multiplicar threads por si só pode não destravar o desempenho.",
        },
      ],
    ),
    s(
      "cpu-orquestra",
      "Integração",
      "CPU continua importante: ela prepara, coordena e conversa com a GPU",
      "A aceleração em IA é quase sempre uma parceria entre componentes, não um cenário em que a CPU 'desaparece'.",
      "gpu-cpu-vs-gpu",
      undefined,
      [
        "A CPU ainda carrega dados, prepara estruturas, lança kernels, controla fluxo geral da aplicação e lida com partes menos adequadas à GPU. Frameworks escondem isso, mas não eliminam a necessidade.",
        "Também existe custo de mover dados entre memórias e sincronizar etapas. Em pipelines reais, parte do trabalho de engenharia está em reduzir trocas desnecessárias e sobreposições ruins.",
        "Em outras palavras: GPU acelera trechos apropriados, mas o sistema como um todo precisa ser desenhado para que esse ganho chegue à aplicação final.",
      ],
      [
        {
          type: "example",
          title: "Treinamento com framework",
          body:
            "A CPU monta batches e agenda etapas; a GPU executa kernels numéricos pesados sobre os tensores.",
        },
      ],
    ),
    s(
      "limites",
      "Realismo",
      "GPU não é resposta universal para qualquer código",
      "Carga irregular, pouco paralelizável ou dominada por controle pode não aproveitar bem a arquitetura.",
      "gpu-simt",
      undefined,
      [
        "Se o problema tem pouca regularidade, muito branching ou volume pequeno de trabalho, os custos de preparação e movimentação podem pesar demais em relação ao benefício.",
        "Além disso, usar GPU bem exige considerar memória disponível, formato dos dados, precisão numérica e comportamento do framework escolhido.",
        "Por isso, pensar em GPU para IA é pensar em casamento entre problema, implementação e arquitetura — não em uma solução automática que melhora tudo sozinha.",
      ],
      [
        {
          type: "mistake",
          title: "Chamar toda lentidão de 'falta de GPU'",
          body:
            "Às vezes o problema está no pipeline de dados, na CPU, no armazenamento ou no próprio desenho do workload.",
        },
        {
          type: "insight",
          title: "A pergunta certa é: o meu trabalho se parece com o que a GPU faz bem?",
          body:
            "Repetição, paralelismo de dados e boa reutilização de memória costumam ser sinais favoráveis.",
        },
      ],
    ),
    s(
      "quiz",
      "Revisão",
      "Quiz de revisão",
      "Teste a conexão entre IA, throughput, SIMT, warps e gargalos de memória.",
      undefined,
      "quiz",
      [
        "O quiz ajuda a separar intuição sólida de slogans vagos sobre aceleração em IA.",
      ],
      [],
    ),
    s(
      "glossario",
      "Glossário",
      "Glossário e próximos estudos",
      "Feche a aula consolidando o vocabulário que reaparece em frameworks, papers e discussões de performance.",
      undefined,
      "glossary",
      [
        "Esses termos ajudam a interpretar documentação de CUDA, PyTorch, kernels e desempenho de inferência.",
      ],
      [],
    ),
  ],
  summaryCards: [
    {
      title: "IA combina com paralelismo de dados",
      body:
        "Muitas operações semelhantes sobre muitos elementos favorecem a organização da GPU.",
    },
    {
      title: "GPU prioriza throughput",
      body:
        "Ela foi pensada para sustentar muito trabalho homogêneo, não para minimizar toda latência individual.",
    },
    {
      title: "SIMT depende de regularidade",
      body:
        "Fluxos muito divergentes reduzem a eficiência dos grupos de threads.",
    },
    {
      title: "Memória pesa tanto quanto cálculo",
      body:
        "Movimentar dados pode ser o verdadeiro limite em várias operações de IA.",
    },
    {
      title: "Compute-bound e memory-bound são leituras úteis",
      body:
        "Elas ajudam a decidir se o gargalo vem do cálculo ou da alimentação de dados.",
    },
    {
      title: "CPU e GPU cooperam",
      body:
        "Aceleração real depende da integração do pipeline inteiro, não só da placa.",
    },
  ],
  relatedTopics: [
    {
      title: "Como Funciona uma CPU",
      body:
        "Contrasta a lógica de baixa latência da CPU com a busca por throughput típica da GPU.",
    },
    {
      title: "Cache de CPU",
      body:
        "Ajuda a reforçar por que hierarquia de memória e padrões de acesso importam tanto para performance.",
    },
    {
      title: "Inferência, Latência, Batching e Throughput",
      body:
        "Aprofunda como decisões de lote e pipeline mudam o comportamento observado em sistemas de IA.",
    },
  ],
  quiz: [
    q("q1", "Por que cargas de IA combinam bem com GPU?", "Porque costumam repetir operações semelhantes sobre muitos dados.", "Porque toda tarefa de IA é dominada por lógica irregular.", "Porque GPU substitui totalmente a CPU.", "a", "Muitas operações em tensores grandes se beneficiam de paralelismo de dados e alto throughput."),
    q("q2", "Qual contraste resume melhor CPU e GPU?", "CPU prioriza flexibilidade e latência; GPU prioriza throughput em trabalho homogêneo.", "CPU é para texto e GPU é para números.", "GPU sempre vence a CPU em qualquer tipo de programa.", "a", "A diferença central é arquitetural e orientada ao tipo de carga."),
    q("q3", "O que um kernel de GPU representa?", "Uma operação lançada para muitas threads executarem em paralelo.", "Um sistema operacional completo rodando na placa.", "Uma tabela de páginas da VRAM.", "a", "Kernel, nesse contexto, é uma função/rotina para muitas threads."),
    q("q4", "Por que divergência em grupos de threads atrapalha?", "Porque reduz a regularidade do fluxo e piora o aproveitamento do hardware.", "Porque aumenta automaticamente a capacidade de memória.", "Porque transforma o workload em sequencial puro.", "a", "Quando threads seguem caminhos muito diferentes, a execução coordenada perde eficiência."),
    q("q5", "Qual frase descreve melhor o papel da memória em GPU?", "Movimentar dados pode ser tão limitante quanto calcular.", "Memória raramente influencia performance em IA.", "Toda operação pesada é sempre compute-bound.", "a", "Bandwidth e layout de acesso têm impacto direto sobre desempenho."),
    q("q6", "O que significa um workload ser memory-bound?", "Que o gargalo principal está em alimentar dados, não em fazer contas.", "Que a GPU parou de usar unidades de execução.", "Que não existe paralelismo possível.", "a", "Se pouca computação útil ocorre por dado movido, a memória passa a dominar."),
    q("q7", "A CPU deixa de ser importante quando usamos GPU em IA?", "Não; ela continua orquestrando e preparando partes do pipeline.", "Sim; toda a aplicação passa a existir só na GPU.", "Só quando o modelo é pequeno.", "a", "CPU e GPU cooperam em sistemas reais."),
    q("q8", "Qual pergunta é mais útil antes de mover algo para GPU?", "O meu workload é regular, paralelizável e aproveita bem memória?", "A GPU é sempre mais moderna que a CPU?", "Posso evitar qualquer custo de transferência?", "a", "A adequação da carga ao modelo da GPU importa mais do que slogans gerais."),
  ],
  glossary: [
    g("GPU", "Processador orientado a throughput, com muitas unidades de execução para trabalho paralelizável."),
    g("Tensor", "Estrutura multidimensional de números usada em machine learning e computação científica."),
    g("Kernel", "Operação lançada para muitas threads executarem na GPU."),
    g("Thread", "Unidade individual de trabalho executada como parte de um kernel."),
    g("Warp", "Grupo de threads coordenadas pelo hardware em várias arquiteturas de GPU."),
    g("SIMT", "Modelo de execução em que muitas threads seguem lógica semelhante sob coordenação do hardware."),
    g("Throughput", "Quantidade total de trabalho concluído por unidade de tempo."),
    g("Bandwidth", "Taxa de movimentação de dados entre memórias e unidades de processamento."),
    g("Memory-bound", "Situação em que a limitação principal está na movimentação/acesso a dados."),
    g("Compute-bound", "Situação em que a limitação principal está na capacidade de cálculo."),
    g("Batching", "Agrupamento de múltiplos exemplos para processá-los juntos."),
    g("Hierarquia de memória", "Conjunto de níveis de memória com custos e velocidades diferentes."),
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
