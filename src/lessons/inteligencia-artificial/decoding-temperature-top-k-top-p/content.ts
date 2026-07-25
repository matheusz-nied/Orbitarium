import type { LessonContent } from "../../../types/content";

export const decodingTemperatureTopKTopPContent: LessonContent = {
  id: "decoding-temperature-top-k-top-p",
  title: "Decoding: Greedy, Temperature, Top-k e Top-p",
  subtitle:
    "Como transformar probabilidades em texto gerado e por que mudar a estratégia de escolha muda tanto o comportamento de um LLM.",
  description:
    "Uma aula visual sobre logits, softmax, greedy decoding, temperatura, truncação top-k, nucleus sampling top-p, diversidade e trade-offs entre estabilidade e criatividade.",
  primaryCategoryId: "inteligencia-artificial",
  secondaryCategoryId: "computacao",
  level: "Intermediário",
  estimatedTime: "40-50 min",
  tags: [
    "LLM",
    "Decoding",
    "Temperature",
    "Top-k",
    "Top-p",
    "Sampling",
  ],
  learningObjectives: [
    "Entender que o modelo gera uma distribuição sobre o próximo token, não uma frase pronta.",
    "Explicar o que greedy decoding faz e por que ele pode ficar repetitivo em tarefas abertas.",
    "Descrever o efeito da temperatura na concentração da distribuição.",
    "Diferenciar top-k de top-p como formas distintas de truncar candidatos.",
    "Entender por que nucleus sampling foi proposto para lidar com a cauda pouco confiável da distribuição.",
    "Relacionar estratégia de decoding ao tipo de tarefa, como código, resumo, brainstorming ou escrita aberta.",
    "Reconhecer que diversidade maior e risco maior frequentemente crescem juntos.",
  ],
  prerequisites: [
    "Noção básica de probabilidade e distribuição.",
    "Entender que LLMs geram um token por vez.",
    "Familiaridade inicial com logits e softmax ajuda, mas a aula recapitula a intuição central.",
  ],
  references: [
    {
      title: "The Curious Case of Neural Text Degeneration",
      source: "Holtzman et al., 2019 — arXiv",
      url: "https://arxiv.org/abs/1904.09751",
      note:
        "Referência principal para nucleus sampling (top-p) e a crítica à degeneração de métodos de maximização em texto aberto.",
    },
    {
      title: "How to generate text: using different decoding methods for language generation with Transformers",
      source: "Hugging Face Blog",
      url: "https://huggingface.co/blog/how-to-generate",
      note:
        "Guia didático e prático comparando estratégias de geração em Transformers.",
    },
    {
      title: "Text generation strategies",
      source: "Hugging Face Transformers — Documentação oficial",
      url: "https://huggingface.co/docs/transformers/en/generation_strategies",
      note:
        "Documentação oficial moderna sobre parâmetros e estratégias de geração em modelos autoregressivos.",
    },
    {
      title: "Language Models are Few-Shot Learners",
      source: "Brown et al., 2020 — arXiv",
      url: "https://arxiv.org/abs/2005.14165",
      note:
        "Referência histórica relevante para o comportamento de LLMs autoregressivos em geração aberta.",
    },
    {
      title: "Introduction to Large Language Models",
      source: "Stanford CS324",
      url: "https://stanford-cs324.github.io/winter2022/lectures/introduction/",
      note:
        "Notas de curso com excelente pano de fundo conceitual sobre geração autoregressiva e parâmetros de sampling.",
    },
  ],
  heroVisual: "hero",
  openingText:
    "Quando um LLM termina de processar o contexto, ele não 'decide a frase inteira'. Primeiro produz logits para o próximo token. Depois, alguma estratégia transforma esses valores em uma escolha concreta. Esse estágio final parece pequeno, mas muda radicalmente o comportamento do sistema. Um mesmo modelo pode soar preciso e conservador, ou criativo e arriscado, dependendo de como a distribuição é lida e truncada na hora do decoding.",
  quickFacts: [
    {
      title: "Logits não são a resposta final",
      body:
        "Eles são pontuações brutas que ainda precisam virar uma distribuição e, depois, uma escolha concreta.",
    },
    {
      title: "Decoding não torna o modelo mais inteligente",
      body:
        "Ele só muda como probabilidades já existentes são exploradas ou truncadas durante a geração.",
    },
    {
      title: "Tarefa define a estratégia",
      body:
        "Código e respostas factuais costumam preferir menos aleatoriedade; escrita aberta e brainstorming toleram mais diversidade.",
    },
  ],
  sections: [
    {
      id: "logits-distribuicao",
      eyebrow: "Ponto de partida",
      title: "Gerar texto começa com uma distribuição sobre o próximo token",
      lead:
        "Antes de qualquer sampling, o modelo produz pontuações brutas para todo o vocabulário possível.",
      visual: "hero",
      paragraphs: [
        "Em cada passo autoregressivo, o modelo observa o contexto atual e calcula logits para todos os tokens candidatos. Esses valores não são probabilidades prontas; são scores relativos que indicam preferência bruta antes da normalização.",
        "Aplicar softmax transforma esses logits em probabilidades. A partir daí, temos uma distribuição: alguns tokens ficam muito prováveis, outros pouco prováveis e uma cauda enorme de candidatos quase irrelevantes.",
        "Decoding é justamente a política que converte essa distribuição em uma escolha concreta. É aqui que entram greedy, temperatura, top-k e top-p.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Logit",
          body:
            "Pontuação bruta produzida pelo modelo antes da normalização em probabilidade via softmax.",
        },
        {
          type: "definition",
          title: "Softmax",
          body:
            "Função que converte logits em probabilidades normalizadas, somando 1 ao longo do vocabulário.",
        },
      ],
    },
    {
      id: "greedy",
      eyebrow: "Determinismo",
      title: "Greedy decoding sempre escolhe o token mais provável",
      lead:
        "A estratégia mais simples e estável é pegar o campeão local da distribuição em cada passo.",
      visual: "concept",
      paragraphs: [
        "Greedy decoding olha para a distribuição e escolhe diretamente o token com maior probabilidade. Depois, repete o processo no passo seguinte. Isso gera uma saída determinística para um mesmo contexto, desde que o modelo e a infraestrutura sejam estáveis.",
        "Essa estratégia costuma funcionar bem quando queremos previsibilidade e baixa variação, mas ela tem um custo. Em tarefas abertas, o caminho do token localmente mais provável pode levar a texto repetitivo, sem graça ou preso em padrões conservadores demais.",
        "O problema não é que greedy esteja 'errado'. O problema é que maximizar localmente não é o mesmo que produzir texto globalmente mais natural ou interessante.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Greedy decoding",
          body:
            "Estratégia que seleciona, a cada passo, o token de maior probabilidade na distribuição atual.",
        },
        {
          type: "mistake",
          title: "Erro comum",
          body:
            "Assumir que o token localmente mais provável sempre leva à melhor sequência global. Em texto aberto, isso frequentemente falha.",
        },
      ],
    },
    {
      id: "temperature",
      eyebrow: "Concentração",
      title: "Temperatura achata ou afia a distribuição antes da escolha",
      lead:
        "Temperatura não inventa candidatos. Ela apenas redistribui o peso relativo entre os que já estavam na disputa.",
      visual: "pipeline",
      interactive: "temperature-lab",
      paragraphs: [
        "Com temperatura baixa, a distribuição fica mais concentrada nos tokens mais prováveis. O modelo se torna mais conservador: repete menos surpresas, mas também explora menos alternativas plausíveis.",
        "Com temperatura alta, as diferenças entre logits são suavizadas. Tokens menos prováveis ganham espaço relativo e a geração fica mais diversa, porém também mais sujeita a desvios, incoerência ou erro factual.",
        "A lição importante é que temperatura regula exploração. Ela não melhora raciocínio nem adiciona conhecimento. Muda apenas o quanto nos afastamos do caminho mais previsível.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Temperatura",
          body:
            "Parâmetro que controla o quão concentrada ou espalhada fica a distribuição usada no sampling do próximo token.",
        },
        {
          type: "insight",
          title: "Mais criatividade e mais risco caminham juntos",
          body:
            "Ao abrir espaço para candidatos menos prováveis, temperatura alta aumenta diversidade, mas também eleva a chance de saídas ruins.",
        },
      ],
    },
    {
      id: "top-k",
      eyebrow: "Truncação fixa",
      title: "Top-k limita a escolha aos k candidatos mais prováveis",
      lead:
        "Em vez de considerar o vocabulário inteiro, top-k corta a distribuição para um conjunto fixo de finalistas.",
      paragraphs: [
        "A intuição do top-k é simples: se a maior parte dos tokens é claramente implausível naquele contexto, por que deixá-los participar do sorteio? Mantemos apenas os k mais prováveis e renormalizamos suas probabilidades.",
        "Isso costuma melhorar a qualidade em comparação com sampling irrestrito, porque remove a cauda mais absurda da distribuição. Ao mesmo tempo, o valor fixo de k tem uma limitação importante: nem todo contexto precisa do mesmo número de candidatos.",
        "Às vezes o modelo está muito confiante e bastariam poucos finalistas. Em outras situações, há muitos candidatos plausíveis. Um k fixo não se adapta naturalmente a essa mudança de incerteza.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Top-k",
          body:
            "Estratégia que retém apenas os k tokens mais prováveis antes do sampling, descartando o restante do vocabulário naquele passo.",
        },
      ],
    },
    {
      id: "top-p",
      eyebrow: "Truncação dinâmica",
      title: "Top-p usa um núcleo de probabilidade em vez de um número fixo de candidatos",
      lead:
        "Nucleus sampling adapta o tamanho da shortlist ao próprio formato da distribuição.",
      visual: "comparison",
      interactive: "candidate-truncation-lab",
      paragraphs: [
        "Em top-p, não escolhemos um número fixo de tokens. Escolhemos o menor conjunto de candidatos cuja probabilidade acumulada atinge um limiar p. Quando a distribuição está muito concentrada, o núcleo fica pequeno. Quando está mais espalhada, ele cresce.",
        "Essa adaptação dinâmica foi defendida como resposta ao problema da cauda pouco confiável. Em vez de deixar a cauda inteira participar ou de fixar k arbitrariamente, top-p procura a região 'confiável o bastante' daquela distribuição específica.",
        "Na prática, top-p costuma oferecer bom compromisso para escrita aberta e tarefas criativas porque se ajusta melhor à incerteza do contexto do que top-k puro.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Top-p / nucleus sampling",
          body:
            "Estratégia que retém o menor conjunto de tokens cuja probabilidade acumulada atinge um limiar p e sorteia apenas dentro desse núcleo.",
        },
        {
          type: "insight",
          title: "O núcleo muda a cada passo",
          body:
            "Diferentemente do top-k, o número de candidatos em top-p cresce e encolhe conforme a confiança do modelo muda ao longo da geração.",
        },
      ],
    },
    {
      id: "comparando",
      eyebrow: "Escolha de estratégia",
      title: "Decoding ideal depende do tipo de tarefa e do custo do erro",
      lead:
        "Não existe um conjunto universal de parâmetros ótimo para toda situação.",
      interactive: "decoding-scenarios",
      paragraphs: [
        "Em tarefas com forte exigência de precisão, como código, extração estruturada ou respostas curtas e factuais, geralmente preferimos baixa aleatoriedade e maior previsibilidade. Em tarefas abertas, como storytelling, brainstorming ou múltiplas reescritas, alguma exploração é desejável.",
        "Também importa o custo do erro. Se um desvio custa caro, restringimos mais a distribuição. Se o objetivo é variedade, podemos aceitar mais risco em troca de mais opções linguísticas.",
        "A boa prática não é perguntar 'qual temperatura certa?'. É perguntar 'qual comportamento esta aplicação precisa, e qual o custo de permitir desvios?'",
      ],
      blocks: [
        {
          type: "example",
          title: "Código vs. brainstorming",
          body:
            "Código geralmente pede menor entropia e mais consistência; brainstorming tolera mais exploração e diversidade.",
        },
      ],
    },
    {
      id: "degeneracao",
      eyebrow: "Riscos",
      title: "Texto repetitivo, bland ou incoerente é também um problema de decoding",
      lead:
        "Nem todo erro de geração nasce no treino do modelo; alguns nascem da forma como exploramos a distribuição.",
      visual: "tradeoff",
      paragraphs: [
        "Decoding muito conservador pode aprisionar o texto em loops previsíveis, frases excessivamente seguras ou formulações sem novidade. Decoding solto demais pode empurrar a geração para continuidades improváveis, contraditórias ou alucinadas.",
        "O artigo de Holtzman e colegas ficou famoso justamente por destacar que maximizar likelihood localmente não produz necessariamente texto humano-like em tarefas abertas. A distribuição tem uma cauda pouco confiável, mas a cabeça também pode ser monótona demais se explorada de forma rígida.",
        "Esse equilíbrio delicado explica por que parâmetros de geração são parte importante da engenharia de aplicações com LLMs. Eles não são só 'ajustes cosméticos'.",
      ],
      blocks: [
        {
          type: "mistake",
          title: "Erro comum",
          body:
            "Culpar apenas o modelo por um texto degenerado sem considerar que a estratégia de decoding pode ter empurrado a geração para esse comportamento.",
        },
      ],
    },
    {
      id: "limites",
      eyebrow: "Limites",
      title: "Sampling muda estilo de decisão, não corrige falta de conhecimento",
      lead:
        "Regular a distribuição pode melhorar a forma da resposta, mas não cria fatos corretos nem raciocínio ausente.",
      visual: "checklist",
      paragraphs: [
        "Se o modelo não tem evidência suficiente ou está em um contexto ruim, nenhum valor mágico de temperatura resolverá o problema fundamental. Sampling pode tornar a resposta mais conservadora ou mais diversa, mas não injeta verdade automaticamente.",
        "Isso vale especialmente para perguntas factuais, jurídicas, médicas ou técnicas. Em contextos de alto risco, controlar decoding é importante, mas deve vir junto de fontes, recuperação, validação e ferramentas externas.",
        "Em outras palavras: decoding é controle de comportamento probabilístico, não substituto de conhecimento, grounding ou verificação.",
      ],
      blocks: [
        {
          type: "insight",
          title: "Decoding controla a forma da aposta",
          body:
            "Ele escolhe como apostar dentro da distribuição já produzida pelo modelo; não muda o que o modelo realmente sabe.",
        },
      ],
    },
    {
      id: "resumo",
      eyebrow: "Síntese",
      title: "Resumo visual do decoding",
      lead:
        "Greedy maximiza localmente, temperatura regula entropia, top-k corta por quantidade e top-p corta por massa acumulada.",
      interactive: "summary-cards",
      paragraphs: [
        "Guarde esse mapa: toda estratégia de decoding está negociando previsibilidade, diversidade e risco dentro da distribuição do próximo token.",
      ],
    },
    {
      id: "quiz-revisao",
      eyebrow: "Revisão",
      title: "Quiz de revisão",
      lead:
        "Teste se a lógica de logits, temperatura, top-k, top-p e escolha por tarefa ficou conectada.",
      interactive: "quiz",
      paragraphs: [
        "A meta é compreender as trocas entre estratégias de geração, não decorar nomes isolados.",
      ],
    },
    {
      id: "glossario",
      eyebrow: "Vocabulário",
      title: "Glossário essencial",
      lead:
        "Feche a aula com o vocabulário mais frequente em documentação e papers sobre geração autoregressiva.",
      interactive: "glossary",
      paragraphs: [
        "Esses termos aparecem constantemente quando configuramos APIs, bibliotecas e produtos com LLMs.",
      ],
    },
  ],
  summaryCards: [
    {
      title: "O modelo gera distribuição, não sentença pronta",
      body:
        "Decoding é a política que transforma essa distribuição em uma escolha concreta a cada passo.",
    },
    {
      title: "Greedy é estável, mas pode empobrecer",
      body:
        "Escolher sempre o token mais provável aumenta previsibilidade, porém pode gerar saídas repetitivas em texto aberto.",
    },
    {
      title: "Temperatura regula exploração",
      body:
        "Baixa temperatura concentra probabilidade; alta temperatura abre espaço para diversidade e também para erro.",
    },
    {
      title: "Top-k e top-p truncam a cauda",
      body:
        "Top-k usa um número fixo de finalistas; top-p usa um núcleo dinâmico baseado em massa acumulada.",
    },
    {
      title: "A estratégia depende da tarefa",
      body:
        "Aplicações factuais e estruturadas tendem a preferir menos aleatoriedade; escrita aberta aceita mais exploração.",
    },
  ],
  quiz: [
    {
      id: "q1",
      prompt: "O que o modelo produz imediatamente antes do decoding?",
      options: [
        { id: "a", label: "Logits para o próximo token." },
        { id: "b", label: "A resposta final completa e determinística." },
        { id: "c", label: "Um embedding fixo do documento inteiro." },
      ],
      correctOptionId: "a",
      feedback:
        "O modelo produz scores brutos para os candidatos ao próximo token; o decoding transforma isso em escolha concreta.",
    },
    {
      id: "q2",
      prompt: "O que greedy decoding faz?",
      options: [
        { id: "a", label: "Escolhe sempre o token mais provável em cada passo." },
        { id: "b", label: "Sorteia uniformemente entre todos os tokens do vocabulário." },
        { id: "c", label: "Mantém apenas os tokens cuja soma acumulada atinge p." },
      ],
      correctOptionId: "a",
      feedback:
        "Greedy é a política mais direta: a cada passo, pega o campeão local da distribuição.",
    },
    {
      id: "q3",
      prompt: "Qual é o efeito típico de reduzir a temperatura?",
      options: [
        { id: "a", label: "Concentrar a distribuição nos tokens mais prováveis." },
        { id: "b", label: "Aumentar automaticamente a janela de contexto." },
        { id: "c", label: "Introduzir novos tokens no vocabulário." },
      ],
      correctOptionId: "a",
      feedback:
        "Temperatura menor torna a distribuição mais afiada e o comportamento mais conservador.",
    },
    {
      id: "q4",
      prompt: "Como top-k funciona?",
      options: [
        { id: "a", label: "Mantém apenas os k tokens mais prováveis antes do sampling." },
        { id: "b", label: "Mantém todos os tokens com probabilidade acima de p." },
        { id: "c", label: "Escolhe sempre o segundo token mais provável." },
      ],
      correctOptionId: "a",
      feedback:
        "Top-k cria uma shortlist fixa de candidatos, descartando a cauda do vocabulário naquele passo.",
    },
    {
      id: "q5",
      prompt: "Qual é a principal diferença entre top-k e top-p?",
      options: [
        { id: "a", label: "Top-k usa um número fixo de candidatos; top-p usa um conjunto dinâmico baseado em probabilidade acumulada." },
        { id: "b", label: "Top-k é determinístico e top-p sempre é idêntico ao greedy." },
        { id: "c", label: "Top-k não usa softmax e top-p usa." },
      ],
      correctOptionId: "a",
      feedback:
        "Em top-p, o tamanho do núcleo muda conforme a confiança do modelo muda a cada passo.",
    },
    {
      id: "q6",
      prompt: "Por que nucleus sampling foi proposto?",
      options: [
        { id: "a", label: "Para evitar a cauda pouco confiável da distribuição sem fixar arbitrariamente o número de candidatos." },
        { id: "b", label: "Para remover totalmente a aleatoriedade." },
        { id: "c", label: "Para substituir o treinamento do modelo." },
      ],
      correctOptionId: "a",
      feedback:
        "Top-p usa o menor conjunto de tokens que concentra a massa relevante da distribuição naquele contexto.",
    },
    {
      id: "q7",
      prompt: "Em qual cenário geralmente preferimos menos aleatoriedade?",
      options: [
        { id: "a", label: "Código, extração estruturada ou tarefas com alto custo de erro." },
        { id: "b", label: "Brainstorming e escrita criativa aberta." },
        { id: "c", label: "Quando queremos múltiplas opções radicalmente diferentes." },
      ],
      correctOptionId: "a",
      feedback:
        "Quanto maior o custo do desvio, mais tendemos a restringir a exploração da distribuição.",
    },
    {
      id: "q8",
      prompt: "O que sampling não consegue fazer?",
      options: [
        { id: "a", label: "Criar conhecimento factual correto que o modelo não possui ou não recebeu no contexto." },
        { id: "b", label: "Mudar o estilo probabilístico da escolha do próximo token." },
        { id: "c", label: "Controlar diversidade relativa da geração." },
      ],
      correctOptionId: "a",
      feedback:
        "Sampling muda como exploramos a distribuição, mas não corrige ausência de grounding, fonte ou conhecimento.",
    },
  ],
  glossary: [
    { term: "Logit", definition: "Pontuação bruta produzida pelo modelo antes da conversão em probabilidade." },
    { term: "Softmax", definition: "Função que transforma logits em probabilidades normalizadas." },
    { term: "Decoding", definition: "Estratégia usada para escolher o próximo token a partir da distribuição do modelo." },
    { term: "Greedy decoding", definition: "Política que sempre escolhe o token mais provável em cada passo." },
    { term: "Temperatura", definition: "Parâmetro que controla quão concentrada ou espalhada fica a distribuição antes do sampling." },
    { term: "Sampling", definition: "Escolha probabilística do próximo token com base na distribuição ajustada." },
    { term: "Top-k", definition: "Truncação da distribuição para os k candidatos mais prováveis." },
    { term: "Top-p", definition: "Truncação para o menor conjunto de tokens cuja probabilidade acumulada atinge um limiar p." },
    { term: "Nucleus sampling", definition: "Outro nome para top-p, destacando a ideia de amostrar do núcleo confiável da distribuição." },
    { term: "Entropia", definition: "Medida de dispersão ou incerteza de uma distribuição; intuitivamente, quão espalhada ela está." },
    { term: "Cauda da distribuição", definition: "Conjunto de tokens de probabilidade muito baixa, muitas vezes pouco confiáveis para geração." },
    { term: "Degeneração de texto", definition: "Produção de texto repetitivo, bland ou incoerente associada a escolhas inadequadas de decoding." },
  ],
};
