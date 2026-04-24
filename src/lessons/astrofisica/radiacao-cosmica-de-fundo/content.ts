import type { LessonContent } from "../../../types/content";

export const radiacaoCosmicaDeFundoContent: LessonContent = {
  id: "radiacao-cosmica-de-fundo",
  title: "Radiação Cósmica de Fundo",
  subtitle: "O eco térmico do universo jovem e uma das evidências mais fortes do Big Bang.",
  description:
    "Uma aula visual sobre a CMB: universo opaco, recombinação, redshift cosmológico, anisotropias e as sementes das estruturas cósmicas.",
  primaryCategoryId: "astrofisica",
  secondaryCategoryId: "fisica",
  level: "Intermediário",
  estimatedTime: "45-60 min",
  tags: [
    "CMB",
    "Radiação Cósmica de Fundo",
    "Big Bang",
    "Recombinação",
    "Cosmologia",
    "Micro-ondas",
    "Anisotropias",
  ],
  learningObjectives: [
    "Entender por que a Radiação Cósmica de Fundo é uma janela para o universo jovem.",
    "Explicar a passagem de um universo opaco para um universo transparente durante a recombinação.",
    "Relacionar expansão cósmica, resfriamento e redshift da luz primordial.",
    "Interpretar anisotropias da CMB como pequenas variações ligadas às sementes das estruturas cósmicas.",
    "Reconhecer o papel de missões como COBE, WMAP e Planck na cosmologia observacional.",
  ],
  prerequisites: [
    "Noções gerais de luz, temperatura e radiação eletromagnética.",
    "Ideia básica de que observar objetos distantes também significa observar o passado.",
    "Familiaridade introdutória com o modelo do Big Bang.",
  ],
  references: [
    {
      title: "Planck and the cosmic microwave background",
      source: "ESA",
      url: "https://www.esa.int/Science_Exploration/Space_Science/Planck/Planck_and_the_cosmic_microwave_background",
      note: "Explicação da CMB, recombinação, anisotropias e missão Planck.",
    },
    {
      title: "Cosmic Microwave Background",
      source: "NASA",
      url: "https://www.nasa.gov/cosmic-microwave-background/",
      note: "Galeria e material institucional da NASA sobre a radiação cósmica de fundo.",
    },
    {
      title: "WMAP",
      source: "NASA Science",
      url: "https://science.nasa.gov/mission/wmap/",
      note: "Página oficial da missão WMAP e sua medição das anisotropias da CMB.",
    },
    {
      title: "WMAP Overview",
      source: "NASA Science",
      url: "https://science.nasa.gov/mission/wmap/wmap-overview/",
      note: "Visão geral científica sobre mapas de céu inteiro e pequenas diferenças de temperatura.",
    },
    {
      title: "Planck overview",
      source: "ESA",
      url: "https://www.esa.int/Science_Exploration/Space_Science/Planck_overview",
      note: "Resumo oficial da missão Planck e seus objetivos cosmológicos.",
    },
  ],
  theme: { variant: "cosmic" },
  heroVisual: "cmb-hero",
  openingText:
    "Quando olhamos para o céu em micro-ondas, vemos uma luz extremamente antiga. Ela não vem de estrelas, galáxias ou planetas. Ela vem de uma época em que o universo inteiro era quente, denso e cheio de plasma. Essa luz é a Radiação Cósmica de Fundo: uma espécie de fotografia térmica do universo quando ele se tornou transparente.",
  quickFacts: [
    {
      title: "O que é?",
      body: "Radiação antiga que preenche todo o universo observável.",
    },
    {
      title: "De onde veio?",
      body: "Do período em que o universo esfriou o bastante para formar átomos neutros.",
    },
    {
      title: "Por que importa?",
      body: "Porque preserva informações sobre o universo jovem.",
    },
    {
      title: "O que revela?",
      body: "Pequenas flutuações que deram origem às grandes estruturas cósmicas.",
    },
  ],
  sections: [
    {
      id: "pergunta-central",
      eyebrow: "Pergunta central",
      title: "Como podemos enxergar o universo jovem?",
      lead:
        "A CMB é uma janela observacional para uma fase do cosmos anterior às primeiras estrelas e galáxias.",
      visual: "cmb-observer-past",
      paragraphs: [
        "Em astronomia, olhar para longe também é olhar para o passado. A luz leva tempo para viajar. Quando observamos uma galáxia distante, vemos como ela era quando aquela luz saiu de lá.",
        "A Radiação Cósmica de Fundo é especial porque não vem de um objeto específico. Ela aparece em todas as direções do céu e carrega informação de uma fase em que o universo inteiro ainda era quente, denso e quase uniforme.",
        "Por isso, ela funciona como uma fotografia térmica do cosmos quando a luz finalmente conseguiu viajar livremente.",
      ],
      blocks: [
        {
          type: "insight",
          title: "Uma fotografia do universo inteiro",
          body:
            "A CMB não é uma foto de uma estrela ou galáxia. É uma fotografia térmica do universo inteiro quando ele se tornou transparente.",
        },
      ],
    },
    {
      id: "universo-opaco",
      eyebrow: "Antes da recombinação",
      title: "Antes da recombinação: um universo opaco",
      lead:
        "No universo jovem, a luz existia, mas era constantemente espalhada por elétrons livres no plasma primordial.",
      visual: "cmb-plasma",
      interactive: "cmb-recombination-before-after",
      paragraphs: [
        "Nos primeiros tempos, o universo era extremamente quente e denso. A matéria comum estava em forma de plasma: elétrons livres, prótons e fótons interagiam o tempo todo.",
        "A luz não conseguia viajar em linha reta por grandes distâncias. Cada fóton encontrava elétrons livres e mudava de direção repetidamente. O resultado era um universo opaco.",
        "Uma boa analogia é tentar enxergar através de uma neblina muito densa. A luz existe, mas se espalha tanto que não permite ver longe.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Plasma",
          body:
            "Estado da matéria em que elétrons e núcleos atômicos estão separados, formando um gás ionizado.",
        },
        {
          type: "definition",
          title: "Universo opaco",
          body:
            "Fase em que a luz não conseguia viajar livremente porque era constantemente espalhada por partículas carregadas.",
        },
      ],
    },
    {
      id: "expansao-resfriamento",
      eyebrow: "Expansão",
      title: "O universo expande, o universo esfria",
      lead:
        "A recombinação só foi possível porque a expansão reduziu a temperatura e a energia média dos fótons.",
      visual: "cmb-cooling",
      interactive: "cmb-cooling-slider",
      paragraphs: [
        "À medida que o universo se expandia, sua temperatura diminuía. Enquanto ele era quente demais, elétrons não conseguiam permanecer presos aos núcleos, porque fótons energéticos os arrancavam novamente.",
        "Quando a temperatura caiu o suficiente, elétrons e prótons puderam se combinar e formar átomos neutros, principalmente hidrogênio.",
        "A recombinação não aconteceu por vontade das partículas. Ela aconteceu porque as condições físicas do universo mudaram.",
      ],
      blocks: [
        {
          type: "insight",
          title: "Condição física",
          body:
            "A recombinação não aconteceu porque partículas decidiram se juntar. Ela aconteceu porque o universo esfriou o suficiente para permitir que átomos neutros sobrevivessem.",
        },
      ],
    },
    {
      id: "recombinacao",
      eyebrow: "Transparência",
      title: "Recombinação: quando o universo ficou transparente",
      lead:
        "Com menos elétrons livres, os fótons deixaram de ser espalhados continuamente e passaram a viajar pelo espaço.",
      visual: "cmb-recombination",
      interactive: "cmb-recombination-before-after",
      paragraphs: [
        "Recombinação é o nome dado ao período em que elétrons e prótons se combinaram para formar átomos neutros. O termo pode soar estranho, porque não significa que átomos completos existiam antes e apenas se recombinaram.",
        "É um termo histórico usado em cosmologia. O resultado físico importante foi a neutralização da matéria comum: menos elétrons livres, menos espalhamento e um universo transparente à luz.",
        "Esse momento, cerca de 380 mil anos após o Big Bang, marca a origem dos fótons que hoje observamos como Radiação Cósmica de Fundo.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Recombinação",
          body:
            "Fase em que elétrons livres se combinaram com núcleos atômicos, formando átomos neutros e tornando o universo transparente à luz.",
        },
        {
          type: "mistake",
          title: "A CMB não vem do instante zero",
          body:
            "Erro comum: pensar que a CMB surgiu exatamente no Big Bang. Na verdade, ela vem de uma fase posterior, quando o universo se tornou transparente, cerca de 380 mil anos após o Big Bang.",
        },
      ],
    },
    {
      id: "nascimento-da-cmb",
      eyebrow: "Afterglow",
      title: "O nascimento da luz mais antiga que conseguimos observar",
      lead:
        "A luz liberada na recombinação viajou por bilhões de anos e foi esticada pela expansão até chegar à faixa de micro-ondas.",
      visual: "cmb-redshift",
      interactive: "cmb-redshift-slider",
      paragraphs: [
        "Quando os fótons passaram a viajar livremente, eles carregaram uma imagem térmica do universo daquela época. Essa luz viajou pelo cosmos enquanto o próprio espaço continuava se expandindo.",
        "Com a expansão, o comprimento de onda dessa radiação foi alongado. O que antes era uma radiação muito mais energética hoje aparece principalmente como micro-ondas.",
        "É por isso que a CMB é chamada de eco térmico ou afterglow do universo jovem: não é som, nem uma explosão vista de fora, mas uma radiação remanescente resfriada pela expansão cósmica.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Última superfície de espalhamento",
          body:
            "Região/época de onde vieram os fótons da CMB que observamos hoje, quando a luz deixou de ser espalhada continuamente e passou a viajar livremente.",
        },
        {
          type: "definition",
          title: "Redshift cosmológico",
          body:
            "Alongamento do comprimento de onda da luz causado pela expansão do universo.",
        },
      ],
    },
    {
      id: "evidencia-big-bang",
      eyebrow: "Evidência observacional",
      title: "Por que a CMB é uma evidência tão forte do Big Bang?",
      lead:
        "Um universo que já foi quente e denso prevê uma radiação remanescente quase uniforme preenchendo todo o espaço.",
      visual: "cmb-evidence",
      paragraphs: [
        "Se o universo começou em um estado quente e denso, esperamos encontrar uma radiação remanescente preenchendo todo o espaço. Essa radiação deveria ter sido esticada pela expansão cósmica até aparecer hoje como micro-ondas.",
        "A Radiação Cósmica de Fundo corresponde exatamente a essa previsão geral: aparece em todas as direções, tem temperatura extremamente uniforme e contém pequenas variações compatíveis com sementes de estruturas cósmicas.",
        "Ela é importante porque conecta uma previsão teórica a uma observação concreta do céu.",
      ],
      blocks: [
        {
          type: "insight",
          title: "Previsão observável",
          body:
            "A CMB é importante porque não é apenas uma luz antiga. Ela é uma previsão observacional de um universo que já foi quente, denso e quase uniforme.",
        },
        {
          type: "mistake",
          title: "Big Bang não é explosão em um ponto",
          body:
            "No modelo cosmológico moderno, o Big Bang descreve a expansão do próprio espaço a partir de um estado inicial quente e denso, não uma explosão dentro de um espaço vazio.",
        },
      ],
    },
    {
      id: "mapa-temperatura",
      eyebrow: "Mapa térmico",
      title: "Um mapa térmico do universo jovem",
      lead:
        "As imagens famosas da CMB mostram o céu inteiro em micro-ondas, com cores representando pequenas diferenças de temperatura.",
      visual: "cmb-temperature-map",
      interactive: "cmb-temperature-map",
      paragraphs: [
        "Quando vemos imagens famosas da CMB, não estamos vendo estrelas nem galáxias. Estamos vendo um mapa do céu inteiro em micro-ondas.",
        "As cores são uma codificação visual de temperatura. Vermelho e laranja indicam regiões ligeiramente mais quentes; azul indica regiões ligeiramente mais frias.",
        "Essas diferenças são minúsculas. O contraste costuma ser amplificado para que possamos enxergar as variações.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Anisotropia",
          body:
            "Pequena variação em uma propriedade quando observamos diferentes direções. No caso da CMB, são variações minúsculas de temperatura no céu.",
        },
      ],
    },
    {
      id: "anisotropias-estruturas",
      eyebrow: "Sementes cósmicas",
      title: "As pequenas irregularidades que viraram estruturas cósmicas",
      lead:
        "As anisotropias revelam que o universo jovem não era perfeitamente uniforme, e essa imperfeição foi essencial.",
      visual: "cmb-structures",
      interactive: "cmb-structure-growth",
      paragraphs: [
        "As pequenas variações na CMB indicam regiões um pouco mais densas e outras um pouco menos densas no universo jovem.",
        "Com o tempo, a gravidade amplificou essas diferenças. Regiões ligeiramente mais densas atraíram mais matéria, ajudando a formar galáxias, aglomerados e filamentos cósmicos.",
        "Sem pequenas irregularidades iniciais, o universo teria muita dificuldade em formar a estrutura complexa que observamos hoje.",
      ],
      blocks: [
        {
          type: "insight",
          title: "Sementes cósmicas",
          body:
            "As anisotropias da CMB são como sementes cósmicas. Pequenas no início, mas fundamentais para formar a estrutura do universo.",
        },
      ],
    },
    {
      id: "timeline-universo",
      eyebrow: "Tempo cosmológico",
      title: "Quando tudo isso aconteceu?",
      lead:
        "A CMB ocupa um ponto muito específico na história cósmica: cerca de 380 mil anos após o Big Bang.",
      visual: "cmb-timeline",
      interactive: "cmb-timeline",
      paragraphs: [
        "A história do universo começa em um estado quente e denso, passa por uma fase de plasma primordial, torna-se transparente na recombinação e depois forma estrelas, galáxias e sistemas planetários.",
        "A CMB surge cedo em escala cosmológica, mas não no instante inicial. Ela é a luz liberada quando os fótons puderam viajar livremente.",
      ],
    },
    {
      id: "deteccao-cmb",
      eyebrow: "Observação",
      title: "Como sabemos que ela existe?",
      lead:
        "A CMB é observada em micro-ondas por instrumentos capazes de medir diferenças minúsculas de temperatura no céu.",
      visual: "cmb-missions",
      interactive: "cmb-mission-cards",
      paragraphs: [
        "A CMB é observada por instrumentos sensíveis à radiação de micro-ondas. Esses instrumentos medem o céu inteiro e buscam variações extremamente pequenas de temperatura.",
        "Missões como COBE, WMAP e Planck mapearam essa radiação com precisão crescente. Satélites ajudam a evitar interferências da atmosfera e a construir mapas mais limpos.",
        "Essas medições transformaram a CMB em uma das bases observacionais da cosmologia moderna.",
      ],
    },
    {
      id: "medidas-cosmologicas",
      eyebrow: "Informação cosmológica",
      title: "O que está escrito nesse fundo de micro-ondas?",
      lead:
        "O padrão de anisotropias permite inferir propriedades profundas do universo quando interpretado com modelos físicos.",
      visual: "cmb-measurements",
      interactive: "cmb-measurement-map",
      paragraphs: [
        "A CMB não mostra tudo diretamente como uma fotografia comum. Cosmólogos usam medições estatísticas e modelos físicos para extrair informação do padrão de flutuações.",
        "Esse padrão ajuda a inferir idade aproximada do universo, geometria em grande escala, composição cósmica, quantidade de matéria comum, matéria escura, energia escura e condições iniciais para formação de estruturas.",
      ],
      blocks: [
        {
          type: "mistake",
          title: "Não é uma fotografia comum",
          body:
            "A CMB é um mapa de radiação e temperatura, interpretado com modelos físicos e estatísticos. Ela não mostra galáxias visíveis.",
        },
      ],
    },
    {
      id: "resumo-final",
      eyebrow: "Resumo",
      title: "O que você precisa lembrar",
      lead:
        "A CMB conecta a física do universo jovem às estruturas que vemos no universo atual.",
      visual: "cmb-summary",
      interactive: "summary-cards",
      paragraphs: [
        "Antes da recombinação, o universo jovem era opaco porque fótons eram espalhados por elétrons livres. Quando elétrons e prótons formaram átomos neutros, a luz passou a viajar livremente.",
        "Essa luz foi esticada pela expansão do universo e hoje aparece como micro-ondas. Suas pequenas anisotropias revelam sementes das estruturas cósmicas.",
        "A Radiação Cósmica de Fundo é uma das maiores pontes entre observação e origem cósmica: uma luz antiga que ainda carrega a memória térmica do universo jovem.",
      ],
    },
    {
      id: "quiz-revisao",
      eyebrow: "Revisão",
      title: "Quiz de revisão",
      lead:
        "Teste se as ideias centrais ficaram claras: opacidade, recombinação, micro-ondas, anisotropias e evidência do Big Bang.",
      interactive: "quiz",
      paragraphs: [
        "As perguntas abaixo dão feedback imediato. Use-as para revisar conceitos, não para decorar frases.",
      ],
    },
    {
      id: "glossario-proximos-estudos",
      eyebrow: "Glossário",
      title: "Glossário e próximos estudos",
      lead:
        "Feche a aula revisando os termos principais e caminhos naturais para continuar estudando cosmologia.",
      interactive: "glossary",
      paragraphs: [
        "Os termos abaixo aparecem com frequência em cosmologia observacional. Dominar esse vocabulário ajuda a entender materiais mais avançados sobre o universo jovem.",
      ],
    },
  ],
  timeline: [
    {
      id: "big-bang",
      period: "Início",
      title: "Big Bang / universo quente e denso",
      description:
        "O modelo descreve um universo inicialmente muito quente, denso e em expansão. Não é uma explosão dentro de um espaço vazio.",
    },
    {
      id: "inflacao",
      period: "Frações iniciais",
      title: "Inflação cósmica",
      description:
        "Uma fase hipotética de expansão extremamente rápida, usada para explicar propriedades globais do universo observável.",
    },
    {
      id: "plasma",
      period: "Primeiros milhares de anos",
      title: "Plasma primordial",
      description:
        "Elétrons, núcleos e fótons interagem constantemente; a luz é espalhada e o universo é opaco.",
    },
    {
      id: "recombinacao",
      period: "~380 mil anos",
      title: "Recombinação",
      description:
        "Elétrons e prótons formam átomos neutros; os fótons passam a viajar livremente.",
    },
    {
      id: "cmb",
      period: "~380 mil anos",
      title: "Liberação da CMB",
      description:
        "A luz desacoplada da matéria começa sua viagem pelo cosmos e hoje é observada como micro-ondas.",
    },
    {
      id: "primeiras-estrelas",
      period: "Centenas de milhões de anos",
      title: "Primeiras estrelas",
      description:
        "A gravidade amplifica flutuações iniciais e permite o surgimento das primeiras fontes luminosas.",
    },
    {
      id: "primeiras-galaxias",
      period: "Universo jovem",
      title: "Primeiras galáxias",
      description:
        "Regiões densas crescem e formam galáxias, aglomerados e estruturas maiores.",
    },
    {
      id: "sistema-solar",
      period: "9,2 bilhões de anos depois",
      title: "Sistema Solar",
      description:
        "Muito depois da CMB, o Sol e os planetas se formam em uma galáxia já madura.",
    },
    {
      id: "hoje",
      period: "Hoje",
      title: "Observamos em micro-ondas",
      description:
        "Detectamos essa radiação esticada pela expansão como um fundo quase uniforme de micro-ondas.",
    },
  ],
  missionCards: [
    {
      title: "COBE",
      body:
        "Confirmou propriedades fundamentais da CMB e detectou anisotropias em escala cosmológica.",
    },
    {
      title: "WMAP",
      body:
        "Mapeou anisotropias com grande precisão e refinou parâmetros cosmológicos.",
    },
    {
      title: "Planck",
      body:
        "Produziu um mapa ainda mais detalhado da CMB e medições cosmológicas de alta precisão.",
    },
  ],
  summaryCards: [
    {
      title: "O universo jovem era opaco",
      body: "Antes da recombinação, fótons eram espalhados por elétrons livres.",
    },
    {
      title: "A recombinação mudou tudo",
      body:
        "Elétrons e prótons formaram átomos neutros, permitindo que a luz viajasse livremente.",
    },
    {
      title: "A CMB é luz antiga",
      body:
        "A radiação liberada naquela época foi esticada pela expansão e hoje aparece como micro-ondas.",
    },
    {
      title: "As anisotropias importam",
      body:
        "Pequenas variações de temperatura revelam sementes das estruturas cósmicas.",
    },
    {
      title: "É evidência do Big Bang",
      body:
        "A CMB corresponde ao que esperamos de um universo que já foi quente, denso e em expansão.",
    },
  ],
  relatedTopics: [
    {
      title: "Big Bang quente",
      body: "A base física que prevê uma radiação remanescente preenchendo o espaço.",
    },
    {
      title: "Inflação cósmica",
      body: "Uma hipótese para explicar uniformidade e pequenas flutuações iniciais.",
    },
    {
      title: "Redshift cosmológico",
      body: "Como a expansão estica o comprimento de onda da luz.",
    },
    {
      title: "Formação de galáxias",
      body: "Como pequenas flutuações crescem por gravidade até formar estruturas.",
    },
  ],
  quiz: [
    {
      id: "q1",
      prompt: "O que é a Radiação Cósmica de Fundo?",
      options: [
        {
          id: "a",
          label:
            "Radiação antiga remanescente de uma fase quente e densa do universo, hoje observada em micro-ondas.",
        },
        { id: "b", label: "Luz emitida por estrelas próximas ao Sistema Solar." },
        { id: "c", label: "Um mapa de galáxias visíveis no céu." },
      ],
      correctOptionId: "a",
      feedback:
        "A CMB é uma radiação remanescente do universo jovem, não luz de estrelas ou galáxias atuais.",
    },
    {
      id: "q2",
      prompt: "Por que o universo jovem era opaco?",
      options: [
        { id: "a", label: "Porque elétrons livres espalhavam constantemente os fótons." },
        { id: "b", label: "Porque ainda não existia luz de nenhum tipo." },
        { id: "c", label: "Porque galáxias bloqueavam toda a radiação." },
      ],
      correctOptionId: "a",
      feedback:
        "O plasma tinha elétrons livres que espalhavam a luz repetidamente.",
    },
    {
      id: "q3",
      prompt: "O que foi a recombinação?",
      options: [
        {
          id: "a",
          label:
            "A formação de átomos neutros a partir de elétrons e núcleos, permitindo que a luz viajasse livremente.",
        },
        { id: "b", label: "A formação das primeiras estrelas." },
        { id: "c", label: "A explosão inicial do Big Bang." },
      ],
      correctOptionId: "a",
      feedback:
        "Recombinação é sobre neutralização da matéria comum, não sobre estrelas nem instante inicial.",
    },
    {
      id: "q4",
      prompt: "A CMB veio exatamente do instante do Big Bang?",
      options: [
        { id: "a", label: "Sim, ela é o brilho do instante zero." },
        { id: "b", label: "Não. Ela vem de uma fase posterior, quando o universo se tornou transparente." },
      ],
      correctOptionId: "b",
      feedback:
        "A CMB vem de cerca de 380 mil anos após o Big Bang, quando os fótons passaram a viajar livremente.",
    },
    {
      id: "q5",
      prompt: "O que são anisotropias na CMB?",
      options: [
        { id: "a", label: "Pequenas variações de temperatura observadas em diferentes direções do céu." },
        { id: "b", label: "Planetas escondidos no mapa de micro-ondas." },
        { id: "c", label: "Explosões de estrelas recém-formadas." },
      ],
      correctOptionId: "a",
      feedback:
        "Anisotropias são pequenas diferenças no fundo quase uniforme da CMB.",
    },
    {
      id: "q6",
      prompt: "Por que as anisotropias são importantes?",
      options: [
        { id: "a", label: "Porque indicam flutuações iniciais que ajudaram a formar estruturas como galáxias." },
        { id: "b", label: "Porque mostram as galáxias diretamente." },
        { id: "c", label: "Porque provam que o universo é perfeitamente uniforme." },
      ],
      correctOptionId: "a",
      feedback:
        "Pequenas flutuações iniciais foram amplificadas pela gravidade ao longo do tempo.",
    },
    {
      id: "q7",
      prompt: "Por que a CMB é evidência do Big Bang?",
      options: [
        {
          id: "a",
          label:
            "Porque um universo inicialmente quente e denso prevê uma radiação remanescente quase uniforme, hoje resfriada para micro-ondas.",
        },
        { id: "b", label: "Porque mostra a explosão acontecendo em um ponto do espaço." },
        { id: "c", label: "Porque substitui todas as outras observações astronômicas." },
      ],
      correctOptionId: "a",
      feedback:
        "A CMB corresponde à previsão de uma radiação remanescente do universo quente e denso.",
    },
    {
      id: "q8",
      prompt: "O que aconteceu com a luz da CMB ao longo da expansão do universo?",
      options: [
        { id: "a", label: "Seu comprimento de onda foi esticado, reduzindo sua energia até micro-ondas." },
        { id: "b", label: "Ela virou matéria escura." },
        { id: "c", label: "Ela ficou mais energética com o tempo." },
      ],
      correctOptionId: "a",
      feedback:
        "A expansão cosmológica alonga o comprimento de onda da luz.",
    },
    {
      id: "q9",
      prompt: "Qual é a diferença entre antes e depois da recombinação?",
      options: [
        {
          id: "a",
          label:
            "Antes, a luz era espalhada pelo plasma; depois, com átomos neutros, passou a viajar livremente.",
        },
        { id: "b", label: "Antes havia galáxias; depois elas desapareceram." },
        { id: "c", label: "Antes não havia temperatura; depois surgiu calor." },
      ],
      correctOptionId: "a",
      feedback:
        "A mudança central foi a transição de plasma opaco para matéria neutra transparente.",
    },
    {
      id: "q10",
      prompt: "O mapa colorido da CMB mostra galáxias?",
      options: [
        { id: "a", label: "Não. Mostra variações minúsculas de temperatura na radiação de fundo." },
        { id: "b", label: "Sim. Cada mancha é uma galáxia individual." },
      ],
      correctOptionId: "a",
      feedback:
        "As cores representam anisotropias de temperatura amplificadas visualmente.",
    },
  ],
  glossary: [
    {
      term: "Radiação Cósmica de Fundo",
      definition:
        "Radiação remanescente do universo jovem, observada hoje principalmente em micro-ondas.",
    },
    {
      term: "Big Bang",
      definition:
        "Modelo cosmológico segundo o qual o universo evoluiu a partir de um estado inicial extremamente quente e denso.",
    },
    {
      term: "Recombinação",
      definition:
        "Fase em que elétrons e núcleos se combinaram para formar átomos neutros, permitindo que a luz viajasse livremente.",
    },
    {
      term: "Plasma",
      definition: "Estado ionizado da matéria, com elétrons livres e núcleos separados.",
    },
    {
      term: "Fóton",
      definition: "Partícula associada à luz e à radiação eletromagnética.",
    },
    {
      term: "Anisotropia",
      definition: "Pequena variação observada em diferentes direções.",
    },
    {
      term: "Redshift cosmológico",
      definition:
        "Alongamento do comprimento de onda da luz causado pela expansão do universo.",
    },
    {
      term: "Última superfície de espalhamento",
      definition:
        "Região/época de onde vieram os fótons da CMB que observamos hoje.",
    },
    {
      term: "Micro-ondas",
      definition: "Faixa do espectro eletromagnético em que observamos a CMB atualmente.",
    },
    {
      term: "Estrutura em larga escala",
      definition:
        "Distribuição de galáxias, aglomerados e filamentos cósmicos no universo.",
    },
  ],
};
