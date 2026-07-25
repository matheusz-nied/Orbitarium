import type { LessonContent } from "../../../types/content";

export const cnnsRedesConvolucionaisContent: LessonContent = {
  id: "cnns-redes-convolucionais",
  title: "CNNs: Redes Convolucionais",
  subtitle:
    "Como filtros locais, mapas de características e pooling permitem que uma rede enxergue padrões visuais sem tratar cada pixel como um caso isolado.",
  description:
    "Uma aula visual sobre convolução, kernels, receptive field, feature maps, stride, padding, pooling, hierarquia de features e o papel das CNNs na visão computacional.",
  primaryCategoryId: "inteligencia-artificial",
  secondaryCategoryId: "computacao",
  level: "Intermediário",
  estimatedTime: "45-60 min",
  tags: [
    "CNN",
    "Visão Computacional",
    "Convolução",
    "Feature Maps",
    "Pooling",
    "Deep Learning",
  ],
  learningObjectives: [
    "Entender por que uma rede totalmente conectada é ineficiente para imagens grandes.",
    "Explicar como filtros locais exploram estrutura espacial e compartilhamento de pesos.",
    "Interpretar mapas de ativação como detectores de padrões, não como imagens finais.",
    "Diferenciar stride, padding e receptive field em nível intuitivo e prático.",
    "Compreender o papel do pooling como redução de resolução com alguma robustez a pequenas variações.",
    "Descrever como camadas sucessivas constroem uma hierarquia de features, de bordas a objetos.",
    "Relacionar CNNs com tarefas da trilha de visão computacional já presente no projeto, como segmentação e classificação.",
  ],
  prerequisites: [
    "Entender que imagens digitais são matrizes de pixels.",
    "Noção básica de redes neurais feed-forward.",
    "Curiosidade sobre como sistemas distinguem texturas, formas e objetos em imagens.",
  ],
  references: [
    {
      title: "CS231n Notes: Convolutional Neural Networks",
      source: "Stanford CS231n",
      url: "https://cs231n.github.io/convolutional-networks/",
      note:
        "Notas clássicas e didáticas sobre convolução, pooling, camadas e arquitetura de CNNs.",
    },
    {
      title: "ImageNet Classification with Deep Convolutional Neural Networks",
      source: "Krizhevsky, Sutskever & Hinton, 2012 — NeurIPS",
      url: "https://proceedings.neurips.cc/paper/2012/file/c399862d3b9d6b76c8436e924a68c45b-Paper.pdf",
      note:
        "Artigo do AlexNet, marco histórico da retomada moderna das CNNs em grande escala.",
    },
    {
      title: "Visualizing and Understanding Convolutional Networks",
      source: "Zeiler & Fergus, 2013 — arXiv",
      url: "https://arxiv.org/abs/1311.2901",
      note:
        "Referência importante para entender feature maps, filtros aprendidos e visualização interna de CNNs.",
    },
    {
      title: "Conv2d",
      source: "PyTorch — Documentação oficial",
      url: "https://pytorch.org/docs/stable/generated/torch.nn.Conv2d.html",
      note:
        "Documentação prática para parâmetros como kernel size, stride, padding e grupos.",
    },
    {
      title: "CNN Explainer",
      source: "Polo Club of Data Science",
      url: "https://poloclub.github.io/cnn-explainer/",
      note:
        "Material interativo e didático excelente para construir intuição sobre filtros e mapas de ativação.",
    },
    {
      title: "Deep Learning — Chapter 9: Convolutional Networks",
      source: "Goodfellow, Bengio & Courville",
      url: "https://www.deeplearningbook.org/contents/convnets.html",
      note:
        "Capítulo de referência conceitual sobre o motivo estrutural das CNNs.",
    },
  ],
  heroVisual: "hero",
  openingText:
    "Se uma imagem de 224×224 fosse entregue a uma rede densa pura, cada neurônio precisaria tratar dezenas de milhares de pixels como entradas independentes. Isso ignora um fato óbvio para humanos: pixels vizinhos têm relações locais e repetitivas. As CNNs foram desenhadas para explorar exatamente essa regularidade. Elas aprendem filtros pequenos que deslizam pela imagem, detectam padrões reaproveitáveis e constroem, camada a camada, uma leitura visual mais abstrata.",
  quickFacts: [
    {
      title: "Filtro pequeno, imagem inteira",
      body:
        "Um kernel 3×3 vê apenas uma vizinhança local, mas ao deslizar pela imagem inteira vira um detector global reutilizável.",
    },
    {
      title: "Pesos são compartilhados",
      body:
        "O mesmo filtro é aplicado em várias posições. Isso reduz drasticamente o número de parâmetros comparado a uma camada totalmente conectada.",
    },
    {
      title: "Pooling não 'entende' objetos",
      body:
        "Ele apenas resume regiões e ajuda a tornar a representação menos sensível a pequenas mudanças de posição.",
    },
  ],
  sections: [
    {
      id: "motivacao",
      eyebrow: "Ponto de partida",
      title: "Por que imagens pedem uma arquitetura diferente de MLPs?",
      lead:
        "Pixels não são apenas uma lista de números. Eles têm vizinhança, posição relativa e padrões locais repetidos.",
      visual: "hero",
      paragraphs: [
        "Se embaralhássemos os pixels de uma foto, um humano perceberia imediatamente que algo estrutural se perdeu. Isso revela que ordem espacial importa. Uma rede densa clássica, porém, não enxerga essa ordem de forma privilegiada: para ela, cada entrada é apenas mais uma coordenada no vetor.",
        "Em imagens, a mesma borda pode aparecer no canto, no centro ou perto da base. Não faz sentido aprender um detector completamente novo para cada posição possível. Precisamos de uma arquitetura que reutilize o mesmo detector em diferentes regiões, preservando a estrutura espacial local.",
        "É aí que entram as CNNs: elas trocam conectividade total por conectividade local e compartilham pesos ao longo da imagem. O ganho não é só eficiência; é alinhamento com a natureza do dado visual.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Conectividade local",
          body:
            "Princípio segundo o qual um neurônio em uma CNN observa apenas uma vizinhança limitada da entrada, em vez de todos os pixels simultaneamente.",
        },
        {
          type: "insight",
          title: "A estrutura do dado orienta a arquitetura",
          body:
            "CNNs são fortes em visão porque embutem uma hipótese correta sobre imagens: padrões locais importam e se repetem em posições diferentes.",
        },
      ],
    },
    {
      id: "filtros",
      eyebrow: "Mecanismo central",
      title: "Filtros locais funcionam como detectores de padrão",
      lead:
        "Um filtro não é uma 'janela mágica'. É um pequeno conjunto de pesos que responde mais fortemente a certos arranjos de pixels.",
      visual: "concept",
      interactive: "filter-lab",
      paragraphs: [
        "Imagine um kernel 3×3 treinado para responder a transições verticais de intensidade. Quando ele passa por uma borda vertical, a soma ponderada fica alta. Quando passa por uma região homogênea, a resposta cai. O filtro não sabe o nome do objeto; ele apenas dispara para um padrão visual específico.",
        "No início da rede, esses padrões costumam ser simples: bordas, contrastes, texturas pequenas. Em camadas mais profundas, combinações desses detectores constroem partes maiores, como cantos, curvas, contornos e, eventualmente, padrões ligados a categorias visuais.",
        "O ponto essencial é que um filtro treinado uma vez pode ser útil em centenas de posições da imagem. Esse compartilhamento é uma das razões pelas quais CNNs foram tão eficazes e econômicas em visão.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Kernel ou filtro",
          body:
            "Matriz pequena de pesos aprendidos que desliza sobre a entrada e calcula respostas locais a padrões específicos.",
        },
        {
          type: "example",
          title: "Intuição visual",
          body:
            "Um filtro vertical responde bem onde há mudança brusca entre esquerda e direita; um filtro horizontal responde a mudanças entre cima e baixo.",
        },
      ],
    },
    {
      id: "feature-maps",
      eyebrow: "Representação",
      title: "Mapas de características mostram onde um padrão apareceu",
      lead:
        "Depois que um filtro percorre a imagem inteira, o resultado é um mapa que indica em quais regiões aquele padrão foi forte ou fraco.",
      paragraphs: [
        "Muitas pessoas confundem feature map com 'a imagem transformada'. Mais precisamente, ele é um mapa de resposta de um detector específico. Se o filtro é sensível a bordas diagonais, o feature map ficará intenso onde bordas diagonais aparecem.",
        "Uma camada convolucional usa vários filtros ao mesmo tempo. Cada um produz seu próprio mapa. O conjunto desses mapas forma uma representação mais rica da imagem, separando diferentes aspectos visuais em canais distintos.",
        "Pense nisso como uma bancada de especialistas. Um canal percebe bordas horizontais, outro texturas rugosas, outro contrastes locais. Nas camadas seguintes, a rede combina esses especialistas para formar padrões mais complexos.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Feature map",
          body:
            "Mapa de ativações produzido por um filtro ao ser aplicado sobre toda a entrada, indicando onde aquele padrão foi detectado com maior intensidade.",
        },
        {
          type: "mistake",
          title: "Erro comum",
          body:
            "Achar que um feature map já é um 'objeto detectado'. Em camadas iniciais, ele costuma indicar padrões visuais simples, não semântica completa.",
        },
      ],
    },
    {
      id: "stride-padding",
      eyebrow: "Geometria",
      title: "Stride e padding controlam o passo e a borda da leitura",
      lead:
        "Convolução não é só filtro. O modo como o filtro anda e como as bordas são tratadas muda bastante a resolução e o que a camada consegue preservar.",
      visual: "pipeline",
      paragraphs: [
        "Stride é o tamanho do passo com que o kernel desliza. Se o stride cresce, a saída encolhe mais rápido porque menos posições são avaliadas. Isso reduz custo, mas também pode pular detalhes finos demais. É um mecanismo de subsampling embutido.",
        "Padding adiciona borda artificial, normalmente com zeros, para que o filtro também consiga processar regiões próximas às extremidades sem diminuir tanto a saída. Sem padding, a informação das bordas tende a ser sub-representada.",
        "Esses parâmetros parecem pequenos, mas mudam o comportamento geométrico da rede. Uma arquitetura bem desenhada controla com cuidado quando reduzir resolução e quando preservar detalhe espacial.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Stride",
          body:
            "Quantidade de pixels que o filtro avança a cada passo. Stride maior reduz a dimensão espacial da saída com mais agressividade.",
        },
        {
          type: "definition",
          title: "Padding",
          body:
            "Borda adicionada à entrada para controlar o tamanho da saída e preservar informação nas extremidades.",
        },
      ],
    },
    {
      id: "pooling",
      eyebrow: "Compactação",
      title: "Pooling resume regiões e traz alguma robustez a pequenas translações",
      lead:
        "Pooling não aprende filtros novos. Ele pega ativações já calculadas e faz um resumo espacial local.",
      interactive: "pooling-lab",
      paragraphs: [
        "No max pooling, uma janela pequena percorre o feature map e retém apenas o maior valor de cada região. A interpretação intuitiva é: 'este padrão apareceu em algum ponto desta vizinhança?'. Isso ajuda a reduzir resolução sem perder completamente a evidência de presença.",
        "Esse resumo cria certa tolerância a pequenas mudanças de posição. Se uma borda andar alguns pixels, o máximo local pode continuar alto. Por isso pooling foi historicamente usado para introduzir um pouco de invariância espacial.",
        "Mas pooling também descarta detalhe. Ele não é um benefício automático em toda situação. Em tarefas densas, como segmentação, reduzir resolução cedo demais pode custar precisão espacial importante.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Pooling",
          body:
            "Operação que reduz a resolução espacial de um mapa de ativação resumindo vizinhanças locais, muitas vezes por máximo ou média.",
        },
        {
          type: "insight",
          title: "Robustez não é cegueira total",
          body:
            "Pooling ajuda com pequenas translações, mas não torna a rede automaticamente invariável a qualquer mudança geométrica.",
        },
      ],
    },
    {
      id: "hierarquia-features",
      eyebrow: "Profundidade",
      title: "Camadas empilhadas constroem uma hierarquia visual",
      lead:
        "O poder real das CNNs não está em um filtro isolado, mas no empilhamento de muitos detectores em níveis crescentes de abstração.",
      visual: "comparison",
      paragraphs: [
        "Camadas iniciais capturam padrões de baixa complexidade: bordas, orientações, contrastes. Camadas intermediárias começam a compor texturas, cantos, partes repetitivas e motivos locais mais ricos. Camadas profundas agregam evidências de partes maiores e configurações compatíveis com classes ou regiões.",
        "Esse raciocínio ajuda a entender por que CNNs transferem bem entre tarefas visuais. As primeiras camadas costumam aprender detectores mais genéricos, úteis para muitos domínios. Já camadas finais tendem a se especializar mais na tarefa ou no conjunto de classes de origem.",
        "A trilha de visão computacional deste projeto parte justamente dessa base. Segmentação semântica, instâncias e pipelines híbridos se apoiam em representações profundas aprendidas por redes que entendem cada vez melhor a estrutura visual.",
      ],
      blocks: [
        {
          type: "example",
          title: "Da borda ao objeto",
          body:
            "Uma roda pode depender de curvas e bordas; um carro depende da combinação coerente de rodas, janelas, contorno e textura.",
        },
        {
          type: "insight",
          title: "Hierarquia explica transfer learning",
          body:
            "Camadas rasas aprendem pistas mais gerais; camadas profundas ficam mais específicas à tarefa e ao dataset original.",
        },
      ],
    },
    {
      id: "tradeoffs-projeto",
      eyebrow: "Projeto",
      title: "Projetar uma CNN é equilibrar resolução, custo e semântica",
      lead:
        "Não existe uma única CNN ideal. Cada escolha de kernel, stride, profundidade e redução espacial muda o tipo de informação disponível.",
      visual: "tradeoff",
      interactive: "cnn-scenarios",
      paragraphs: [
        "Kernels pequenos empilhados costumam ser preferidos porque aumentam receptivo gradualmente com menos parâmetros do que kernels gigantes de uma vez. Ao mesmo tempo, profundidade maior aumenta custo e pode dificultar otimização se a arquitetura for descuidada.",
        "Reduzir resolução cedo economiza computação, mas também remove detalhes espaciais. Preservar resolução por mais tempo melhora localização, mas custa memória. Essa tensão aparece claramente quando comparamos classificação e segmentação.",
        "Pensar em CNN como uma cadeia de compromissos é mais útil do que pensar em receitas fixas. Arquitetura boa é arquitetura coerente com a tarefa.",
      ],
      blocks: [
        {
          type: "mistake",
          title: "Erro comum",
          body:
            "Copiar uma arquitetura de classificação e esperar que ela preserve localização fina para segmentação sem adaptações apropriadas.",
        },
        {
          type: "example",
          title: "Ligação com a trilha de visão",
          body:
            "Nas aulas de segmentação semântica e por instâncias, a preservação ou recuperação de detalhe espacial volta a ser decisiva.",
        },
      ],
    },
    {
      id: "limites",
      eyebrow: "Limitações",
      title: "CNNs foram transformadoras, mas não resolvem tudo sozinhas",
      lead:
        "Convolução introduz viés indutivo forte e útil para visão, mas isso também define seus limites.",
      visual: "checklist",
      paragraphs: [
        "CNNs brilham quando padrões locais e composição hierárquica são bons modelos do problema. Porém, relações muito longas, dependências globais e contexto de larga escala podem exigir mecanismos adicionais ou arquiteturas híbridas, como atenção.",
        "Mesmo em visão, camadas convolucionais não dispensam dados, regularização, augmentação e projeto cuidadoso. O fato de uma arquitetura ter o viés indutivo certo não garante desempenho sem pipeline de treino adequado.",
        "Hoje, muitas soluções combinam convolução com blocos de atenção, FPNs, heads especializadas e técnicas de pré-treinamento. Ainda assim, entender CNNs continua essencial porque elas moldaram quase toda a engenharia visual moderna.",
      ],
      blocks: [
        {
          type: "insight",
          title: "Viés indutivo é força e limite",
          body:
            "A mesma estrutura que ajuda a aprender imagens com eficiência também restringe o tipo de relação que a arquitetura prioriza naturalmente.",
        },
      ],
    },
    {
      id: "resumo",
      eyebrow: "Síntese",
      title: "Resumo visual das CNNs",
      lead:
        "Convolução explora localidade e compartilhamento de pesos; pooling resume; profundidade constrói semântica.",
      interactive: "summary-cards",
      paragraphs: [
        "Guarde este mapa mental antes de seguir para o quiz: filtros detectam, feature maps localizam respostas, pooling compacta e pilhas profundas compõem significado.",
      ],
    },
    {
      id: "quiz-revisao",
      eyebrow: "Revisão",
      title: "Quiz de revisão",
      lead:
        "Revise filtros, mapas de características, pooling, stride, padding e o papel estrutural das CNNs em visão computacional.",
      interactive: "quiz",
      paragraphs: [
        "O importante é entender por que a convolução é uma escolha arquitetural apropriada para imagens, não decorar jargões.",
      ],
    },
    {
      id: "glossario",
      eyebrow: "Vocabulário",
      title: "Glossário essencial",
      lead:
        "Use este glossário como apoio para ler papers, bibliotecas e as próximas aulas da trilha de visão computacional.",
      interactive: "glossary",
      paragraphs: [
        "As próximas aulas do projeto assumem familiaridade crescente com esses termos, especialmente em segmentação e pipelines profundos.",
      ],
    },
  ],
  summaryCards: [
    {
      title: "CNNs respeitam a geometria da imagem",
      body:
        "Elas exploram vizinhança local e repetição espacial, algo que uma MLP pura trata de forma ineficiente.",
    },
    {
      title: "Filtros são detectores reutilizáveis",
      body:
        "O mesmo kernel pode responder ao mesmo padrão em muitas regiões da imagem graças ao compartilhamento de pesos.",
    },
    {
      title: "Feature maps localizam respostas",
      body:
        "Cada mapa mostra onde um padrão aprendido foi forte, canal por canal.",
    },
    {
      title: "Pooling resume e reduz",
      body:
        "Ele compacta a representação e traz alguma robustez a pequenas translações, mas descarta detalhe espacial.",
    },
    {
      title: "Profundidade compõe semântica",
      body:
        "Bordas viram texturas, texturas viram partes, e partes ajudam a inferir objetos e regiões.",
    },
  ],
  quiz: [
    {
      id: "q1",
      prompt: "Qual problema principal uma CNN resolve em relação a uma rede densa aplicada diretamente a imagens?",
      options: [
        { id: "a", label: "Explora estrutura espacial local e compartilha pesos em vez de tratar cada pixel como entrada independente." },
        { id: "b", label: "Remove totalmente a necessidade de dados rotulados." },
        { id: "c", label: "Impede overfitting em qualquer cenário." },
      ],
      correctOptionId: "a",
      feedback:
        "CNNs alinham a arquitetura à estrutura da imagem: padrões locais importam e podem reaparecer em várias posições.",
    },
    {
      id: "q2",
      prompt: "O que um filtro convolucional aprende a fazer?",
      options: [
        { id: "a", label: "Responder mais fortemente a certos arranjos locais de pixels." },
        { id: "b", label: "Guardar a imagem inteira em um único neurônio." },
        { id: "c", label: "Eliminar a resolução espacial da entrada automaticamente." },
      ],
      correctOptionId: "a",
      feedback:
        "Filtros atuam como detectores de padrões locais, como bordas, texturas ou combinações mais ricas em camadas profundas.",
    },
    {
      id: "q3",
      prompt: "O que um feature map representa?",
      options: [
        { id: "a", label: "Onde um padrão específico foi ativado ao longo da imagem." },
        { id: "b", label: "Uma reconstrução fotográfica perfeita da entrada." },
        { id: "c", label: "O rótulo final da classe prevista." },
      ],
      correctOptionId: "a",
      feedback:
        "O feature map é o mapa de resposta de um filtro: ele indica onde aquele detector encontrou evidência do padrão que procura.",
    },
    {
      id: "q4",
      prompt: "Qual é o efeito principal de aumentar o stride?",
      options: [
        { id: "a", label: "Reduzir mais rapidamente a dimensão espacial da saída." },
        { id: "b", label: "Aumentar o número de canais automaticamente." },
        { id: "c", label: "Substituir a necessidade de pooling e padding em todos os casos." },
      ],
      correctOptionId: "a",
      feedback:
        "Stride maior faz o kernel dar passos maiores e, portanto, avaliar menos posições da entrada.",
    },
    {
      id: "q5",
      prompt: "Para que serve o padding?",
      options: [
        { id: "a", label: "Controlar o tratamento de bordas e ajudar a preservar o tamanho espacial." },
        { id: "b", label: "Transformar uma CNN em Transformer." },
        { id: "c", label: "Impedir que filtros aprendam padrões locais." },
      ],
      correctOptionId: "a",
      feedback:
        "Padding adiciona borda à entrada para que o filtro opere melhor nas extremidades e para controlar a dimensão da saída.",
    },
    {
      id: "q6",
      prompt: "O que o max pooling faz conceitualmente?",
      options: [
        { id: "a", label: "Resume uma região retendo a ativação mais forte daquele vizinho local." },
        { id: "b", label: "Aprende novos filtros mais profundos." },
        { id: "c", label: "Aumenta a resolução da imagem." },
      ],
      correctOptionId: "a",
      feedback:
        "Max pooling não aprende um filtro novo; ele apenas resume um mapa já calculado, retendo a evidência mais forte de cada região.",
    },
    {
      id: "q7",
      prompt: "Por que camadas iniciais de CNN costumam transferir bem entre tarefas visuais?",
      options: [
        { id: "a", label: "Porque aprendem padrões mais genéricos, como bordas e texturas simples." },
        { id: "b", label: "Porque já reconhecem classes finais sozinhas." },
        { id: "c", label: "Porque não dependem dos dados de origem." },
      ],
      correctOptionId: "a",
      feedback:
        "Features rasas costumam ser mais universais; as camadas profundas tendem a ficar mais especializadas na tarefa original.",
    },
    {
      id: "q8",
      prompt: "Qual trade-off aparece ao reduzir resolução cedo demais?",
      options: [
        { id: "a", label: "Economiza custo, mas pode destruir detalhe espacial importante." },
        { id: "b", label: "Aumenta custo e melhora precisão em qualquer tarefa." },
        { id: "c", label: "Elimina a necessidade de camadas profundas." },
      ],
      correctOptionId: "a",
      feedback:
        "Reduzir cedo demais pode ser ótimo para classificação global, mas ruim para tarefas que exigem localização fina, como segmentação.",
    },
  ],
  glossary: [
    { term: "Convolução", definition: "Operação em que um filtro pequeno percorre a entrada calculando respostas locais em diferentes posições." },
    { term: "Kernel", definition: "Matriz pequena de pesos aprendidos usada pela convolução para detectar padrões específicos." },
    { term: "Filtro", definition: "Outro nome para kernel convolucional; em redes profundas, refere-se ao detector aprendido de um padrão." },
    { term: "Feature map", definition: "Mapa de ativações produzido por um filtro ao ser aplicado à entrada ou à saída de uma camada anterior." },
    { term: "Stride", definition: "Passo com que o filtro se desloca pela entrada. Afeta diretamente a dimensão espacial da saída." },
    { term: "Padding", definition: "Borda adicionada à entrada para controlar o tamanho da saída e tratar melhor pixels das extremidades." },
    { term: "Receptive field", definition: "Região da entrada que influencia a ativação de um neurônio em determinada camada." },
    { term: "Compartilhamento de pesos", definition: "Uso do mesmo filtro em diferentes posições da imagem, reduzindo parâmetros e reforçando reutilização de padrões." },
    { term: "Pooling", definition: "Operação de resumo espacial local, como máximo ou média, usada para compactar mapas de ativação." },
    { term: "Max pooling", definition: "Tipo de pooling que retém a maior ativação dentro de cada janela local." },
    { term: "Canal", definition: "Dimensão que agrupa mapas diferentes em uma camada, cada qual associado a um filtro distinto." },
    { term: "Hierarquia de features", definition: "Ideia de que camadas profundas compõem padrões simples em representações visuais mais abstratas." },
  ],
  relatedTopics: [
    {
      title: "Segmentação semântica",
      body:
        "Veja como representações convolucionais são reutilizadas quando cada pixel precisa receber um rótulo.",
    },
    {
      title: "Pipeline clássico vs. deep learning em segmentação",
      body:
        "Compare o que muda quando saímos de regras manuais e passamos a usar features profundas aprendidas.",
    },
  ],
};
