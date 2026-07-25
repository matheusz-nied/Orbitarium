import type { LessonContent } from "../../../types/content";

export const backpropagationContent: LessonContent = {
  id: "backpropagation",
  title: "Backpropagation",
  subtitle:
    "A técnica que torna redes treináveis em escala: em vez de testar cegamente milhões de ajustes, propagamos gradientes pela regra da cadeia.",
  description:
    "Uma aula avançada sobre regra da cadeia, fluxo reverso do erro, gradientes locais e globais, magnitudes que somem ou explodem e o papel da learning rate na atualização de parâmetros.",
  primaryCategoryId: "inteligencia-artificial",
  secondaryCategoryId: "matematica",
  level: "Avançado",
  estimatedTime: "45-60 min",
  tags: [
    "Backpropagation",
    "Regra da Cadeia",
    "Gradientes",
    "Learning Rate",
    "Treinamento",
    "Deep Learning",
  ],
  learningObjectives: [
    "Entender backpropagation como aplicação sistemática da regra da cadeia em grafos computacionais.",
    "Separar derivadas locais de efeitos globais sobre a perda.",
    "Acompanhar o fluxo reverso do erro em uma rede pequena.",
    "Interpretar gradiente como sensibilidade da perda a cada parâmetro.",
    "Reconhecer condições que favorecem gradientes muito pequenos ou muito grandes.",
    "Relacionar magnitude do gradiente e learning rate ao tamanho efetivo da atualização.",
  ],
  prerequisites: [
    "Compreensão de neurônio artificial, forward pass e função de perda.",
    "Noção básica de derivada como taxa de variação ou sensibilidade.",
    "Conforto com multiplicação de termos e composição de funções.",
  ],
  references: [
    {
      title: "Neural Networks and Deep Learning — Chapter 2",
      source: "Michael Nielsen",
      url: "http://neuralnetworksanddeeplearning.com/chap2.html",
      note:
        "Uma das explicações online mais acessíveis e didáticas do algoritmo de backpropagation.",
    },
    {
      title: "Learning representations by back-propagating errors",
      source: "Rumelhart, Hinton e Williams, Nature (1986)",
      url: "https://doi.org/10.1038/323533a0",
      note:
        "Paper clássico que consolidou a importância prática do backpropagation em redes multicamadas.",
    },
    {
      title: "CS231n — Optimization Part 1",
      source: "Stanford University",
      url: "https://cs231n.github.io/optimization-1/",
      note:
        "Notas sobre gradientes, otimização e o papel do cálculo analítico no treinamento.",
    },
    {
      title: "CS231n — Optimization Part 2",
      source: "Stanford University",
      url: "https://cs231n.github.io/optimization-2/",
      note:
        "Apresenta a lógica de staged computation e backprop em circuitos computacionais simples.",
    },
    {
      title: "Deep Learning — Chapter 6: Deep Feedforward Networks",
      source: "Goodfellow, Bengio e Courville — MIT Press",
      url: "https://www.deeplearningbook.org/contents/mlp.html",
      note:
        "Referência conceitual sobre diferenciação em redes feedforward e aprendizagem baseada em gradiente.",
    },
    {
      title: "Deep Learning — Chapter 8: Optimization for Training Deep Models",
      source: "Goodfellow, Bengio e Courville — MIT Press",
      url: "https://www.deeplearningbook.org/contents/optimization.html",
      note:
        "Conecta gradientes a learning rate, estabilidade e dinâmica global do treinamento.",
    },
  ],
  heroVisual: "backprop-hero",
  openingText:
    "Sem backpropagation, treinar redes profundas seria como regular um painel com milhões de botões fechando os olhos: você mexeria em tudo, veria o resultado final e não saberia quais ajustes ajudaram ou atrapalharam. Backprop muda esse cenário ao responder, para cada parâmetro, a pergunta decisiva: 'se eu variar um pouco este valor, quanto a perda muda?'. A genialidade do método não está em uma fórmula isolada, mas na economia de cálculo: ele reutiliza partes da computação e distribui o erro de trás para frente com uma disciplina matemática impecável.",
  quickFacts: [
    {
      title: "Gradiente é sensibilidade",
      body:
        "Ele mede quanto a perda mudaria se um parâmetro sofresse uma perturbação pequena.",
    },
    {
      title: "Backprop não é magia nova",
      body:
        "É a regra da cadeia aplicada de forma eficiente a uma composição grande de funções.",
    },
    {
      title: "Update depende de duas escalas",
      body:
        "A magnitude do gradiente diz a direção e a urgência; a learning rate decide o tamanho do passo.",
    },
  ],
  sections: [
    {
      id: "por-que-backprop",
      eyebrow: "Motivação",
      title: "Sem gradientes eficientes, treinar redes grandes é inviável",
      lead:
        "Uma rede com muitos parâmetros exige um método que diga, de forma barata, como cada um deles influencia a perda. É isso que backpropagation entrega.",
      visual: "por-que-backprop-visual",
      paragraphs: [
        "Poderíamos, em princípio, testar pequenas perturbações em cada peso e observar como a perda muda. Isso produz uma aproximação numérica do gradiente, mas é muito caro: para cada parâmetro, precisaríamos de avaliações extras da rede. Em modelos reais com milhões ou bilhões de parâmetros, esse caminho é impraticável.",
        "Backpropagation resolve o problema explorando a estrutura composta da rede. Em vez de recalcular tudo do zero para cada parâmetro, ele propaga sensibilidades locais pelo grafo computacional. Cada bloco informa como sua saída muda em resposta à sua entrada; a regra da cadeia costura esses blocos em um gradiente global coerente.",
        "O resultado é uma virada de escala: o que parecia explosivamente caro se torna viável o bastante para treinar redes modernas. Esse ganho computacional é tão importante quanto a elegância matemática do método.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Backpropagation",
          body:
            "Algoritmo que calcula eficientemente gradientes em modelos compostos, propagando sensibilidades da perda da saída para os parâmetros internos.",
        },
        {
          type: "insight",
          title: "Eficiência é a grande vitória",
          body:
            "Backprop não inventa a derivada; ele organiza o cálculo de derivadas para reutilizar computação em larga escala.",
        },
      ],
    },
    {
      id: "grafo-computacional",
      eyebrow: "Estrutura",
      title: "Pensar em grafo computacional clareia o algoritmo",
      lead:
        "Cada soma, multiplicação ou ativação pode ser vista como um nó em um grafo. O forward produz valores; o backward produz sensibilidades.",
      visual: "grafo-computacional-visual",
      paragraphs: [
        "Ao decompor a rede em operações simples, fica mais fácil enxergar o que cada etapa faz e como derivá-la. Um produto sabe como reagir a mudanças em cada fator; uma soma distribui o gradiente; uma ativação transforma a sensibilidade de acordo com sua derivada local. O algoritmo inteiro emerge dessa modularidade.",
        "No forward pass, cada nó recebe entradas e produz uma saída numérica. No backward pass, o sentido se inverte: cada nó recebe a sensibilidade da perda em relação à sua saída e a transforma em sensibilidades em relação às suas entradas. É literalmente uma corrente de dependências sendo invertida.",
        "Essa visão modular é poderosa porque vale para muito além de redes pequenas desenhadas em quadro. Bibliotecas de autograd usam a mesma ideia em escala industrial.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Grafo computacional",
          body:
            "Representação de um cálculo como composição de operações elementares conectadas por dependências de dados.",
        },
        {
          type: "example",
          title: "Quebrar para derivar",
          body:
            "Em vez de derivar a expressão inteira de uma vez, separamos em estágios simples e encadeamos suas derivadas locais.",
        },
      ],
    },
    {
      id: "regra-da-cadeia",
      eyebrow: "Coração matemático",
      title: "A regra da cadeia diz como sensibilidades se compõem",
      lead:
        "Se a perda depende de uma variável intermediária, e essa variável depende de um parâmetro, o efeito total é o produto dessas dependências locais.",
      visual: "regra-da-cadeia-visual",
      interactive: "cadeia-backprop",
      paragraphs: [
        "A regra da cadeia é o coração do backpropagation. Se L depende de z, e z depende de w, então a sensibilidade total de L em relação a w é dada pelo produto da sensibilidade de L em relação a z com a sensibilidade de z em relação a w. Em redes, repetimos essa lógica muitas vezes, atravessando caminhos inteiros.",
        "Isso nos ensina algo conceitualmente importante: um parâmetro influencia a perda não só pelo que faz localmente, mas por como seu efeito se propaga pelo restante da rede. Por isso, derivadas locais e derivada total não são a mesma coisa. O parâmetro participa de uma cadeia de consequências.",
        "Ao enxergar o gradiente como produto de influências locais, fica mais fácil entender tanto o sucesso do algoritmo quanto seus problemas clássicos, como gradientes que encolhem ou explodem em cadeias longas.",
      ],
      blocks: [
        {
          type: "formula",
          title: "Regra da cadeia",
          body: "A variação total se decompõe no produto de sensibilidades locais ao longo do caminho.",
          formula: "dL/dw = (dL/dz) · (dz/dw)",
        },
        {
          type: "mistake",
          title: "Confundir derivada local com efeito global",
          body:
            "A derivada de um nó em relação à sua entrada é só parte da história. O impacto na perda depende do restante da cadeia.",
        },
      ],
    },
    {
      id: "erro-fluindo-para-tras",
      eyebrow: "Fluxo reverso",
      title: "O erro não volta como culpa simbólica; volta como gradiente",
      lead:
        "Dizer que o erro 'se propaga para trás' é uma metáfora útil, mas o que realmente flui são derivadas da perda em relação às variáveis internas.",
      visual: "erro-fluindo-visual",
      paragraphs: [
        "No backward pass, a rede não envia mensagens semânticas como 'este neurônio errou muito'. O que circula é algo mais preciso: quanto a perda mudaria se a saída desta etapa variasse um pouco. Essa é a informação suficiente para que cada camada redistribua responsabilidade aos seus parâmetros e entradas.",
        "Esse refinamento conceitual importa porque evita interpretações antropomórficas. Backpropagation não entende o erro como um professor explicando conceitos. Ele opera com cálculo diferencial, transmitindo sensibilidades quantitativas que, combinadas, orientam a atualização dos parâmetros.",
        "Quando essa leitura fica clara, ganha força a ideia de que aprender em redes profundas é coordenar muitas responsabilidades locais a partir de um objetivo global único.",
      ],
      blocks: [
        {
          type: "insight",
          title: "Responsabilidade é quantitativa",
          body:
            "Cada parâmetro recebe um gradiente que estima sua contribuição marginal para a perda, não uma explicação humana do erro cometido.",
        },
      ],
    },
    {
      id: "magnitudes-de-gradiente",
      eyebrow: "Estabilidade",
      title: "Gradientes podem sumir ou explodir em cadeias longas",
      lead:
        "Como o backward multiplica sensibilidades locais, cadeias profundas podem transformar pequenos números em quase zero ou grandes números em instabilidade.",
      visual: "magnitudes-gradiente-visual",
      interactive: "magnitudes-gradiente",
      paragraphs: [
        "Se muitos fatores ao longo do caminho são menores que 1 em magnitude, o produto tende a encolher. O gradiente chega minúsculo às primeiras camadas, e o aprendizado nelas desacelera drasticamente. Esse é o fenômeno clássico do vanishing gradient.",
        "O oposto também pode ocorrer. Se vários fatores são maiores que 1, o produto cresce rápido demais, gerando atualizações enormes, perda instável e treinamento errático. É o caso do exploding gradient, especialmente visível em algumas arquiteturas recorrentes ou mal condicionadas.",
        "Inicialização, ativações, normalização e arquitetura influenciam fortemente esse equilíbrio. Por isso, backpropagation não é apenas um algoritmo fechado; ele interage profundamente com decisões de projeto do modelo.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Vanishing gradient",
          body:
            "Enfraquecimento progressivo do gradiente ao retropropagar por muitas etapas com sensibilidades pequenas.",
        },
        {
          type: "definition",
          title: "Exploding gradient",
          body:
            "Crescimento excessivo do gradiente ao retropropagar por cadeias em que fatores de sensibilidade ampliam demais o sinal.",
        },
      ],
    },
    {
      id: "learning-rate",
      eyebrow: "Atualização",
      title: "Learning rate converte gradiente em passo real",
      lead:
        "O gradiente aponta uma direção local de melhoria; a learning rate decide o tamanho do passo tomado nessa direção.",
      visual: "learning-rate-visual",
      interactive: "demo-learning-rate",
      paragraphs: [
        "Mesmo com gradientes corretos, o treinamento pode falhar se o passo for mal calibrado. Uma learning rate pequena demais produz progresso lento; uma grande demais pode fazer a atualização saltar por cima de vales promissores e oscilar sem convergir.",
        "Esse ponto parece banal, mas é central. O update efetivo resulta da interação entre gradiente e escala do passo. Um gradiente moderado com taxa alta pode ser destrutivo; um gradiente grande com taxa baixa pode ser aceitável. O que importa é o produto final que move o parâmetro.",
        "Em modelos profundos, essa sensibilidade ajuda a explicar por que schedules, momentum e otimizadores adaptativos são tão relevantes. Eles não substituem backpropagation; refinam a forma como seus gradientes são convertidos em movimento útil.",
      ],
      blocks: [
        {
          type: "formula",
          title: "Atualização básica",
          body: "O gradiente é subtraído do parâmetro escalado pela learning rate.",
          formula: "w ← w - η · dL/dw",
        },
        {
          type: "mistake",
          title: "Culpar só o gradiente por divergência",
          body:
            "Às vezes o gradiente está informando corretamente a direção local, mas a taxa de aprendizado transforma essa direção em um salto grande demais.",
        },
      ],
    },
    {
      id: "quiz",
      eyebrow: "Revisão",
      title: "Quiz de revisão",
      lead:
        "Confira se a lógica do backward pass, das magnitudes e do update ficou sólida.",
      interactive: "quiz",
      paragraphs: [
        "As perguntas abaixo focam em causalidade matemática: quem depende de quem, e como essa dependência vira gradiente útil.",
      ],
    },
    {
      id: "glossario",
      eyebrow: "Fechamento",
      title: "Glossário de backpropagation",
      lead:
        "Estes termos aparecem o tempo todo em cursos, artigos e frameworks de autograd.",
      interactive: "glossary",
      paragraphs: [
        "Ter clareza nesse vocabulário facilita diagnosticar problemas de treinamento com muito mais precisão.",
      ],
    },
  ],
  summaryCards: [
    { title: "Backprop reutiliza cálculo", body: "Ele torna viável obter gradientes em redes grandes sem perturbar cada parâmetro separadamente." },
    { title: "Regra da cadeia é o núcleo", body: "O efeito total de um parâmetro na perda é a composição de sensibilidades locais ao longo do caminho." },
    { title: "Backward propaga derivadas", body: "O que volta pela rede não é um julgamento qualitativo do erro, mas um gradiente quantitativo." },
    { title: "Magnitudes importam", body: "Produtos repetidos de derivadas podem fazer o gradiente sumir ou explodir." },
    { title: "Learning rate transforma direção em movimento", body: "Gradiente bom com passo ruim ainda produz treinamento ruim." },
  ],
  quiz: [
    {
      id: "q1",
      prompt: "Qual é a principal vantagem prática do backpropagation sobre estimativas numéricas ingênuas do gradiente?",
      options: [
        { id: "a", label: "Ele reutiliza a estrutura do cálculo e obtém gradientes com muito menos custo computacional." },
        { id: "b", label: "Ele dispensa completamente o forward pass." },
        { id: "c", label: "Ele elimina a necessidade de função de perda." },
      ],
      correctOptionId: "a",
      feedback:
        "Backpropagation é valioso porque calcula gradientes de forma eficiente, reaproveitando computações ao invés de perturbá-las uma a uma de forma cara.",
    },
    {
      id: "q2",
      prompt: "Em um grafo computacional, o que o forward pass produz?",
      options: [
        { id: "a", label: "Valores intermediários e saídas numéricas." },
        { id: "b", label: "Somente gradientes de todos os parâmetros." },
        { id: "c", label: "A arquitetura ideal da rede." },
      ],
      correctOptionId: "a",
      feedback:
        "No forward pass calculamos valores. O backward usa esses valores para propagar sensibilidades e obter gradientes.",
    },
    {
      id: "q3",
      prompt: "A regra da cadeia diz que o efeito de um parâmetro na perda é...",
      options: [
        { id: "a", label: "o produto das sensibilidades locais ao longo do caminho relevante." },
        { id: "b", label: "sempre igual à derivada da ativação final apenas." },
        { id: "c", label: "independente das variáveis intermediárias." },
      ],
      correctOptionId: "a",
      feedback:
        "O impacto total surge da composição de dependências locais, e é isso que a regra da cadeia formaliza.",
    },
    {
      id: "q4",
      prompt: "O que realmente 'flui para trás' no backpropagation?",
      options: [
        { id: "a", label: "Sensibilidades quantitativas da perda em relação às variáveis internas." },
        { id: "b", label: "Rótulos corrigidos manualmente pelo usuário." },
        { id: "c", label: "Um texto explicando o erro de cada neurônio." },
      ],
      correctOptionId: "a",
      feedback:
        "Backward pass transporta derivadas da perda. Essa informação basta para redistribuir responsabilidade pelos parâmetros e entradas anteriores.",
    },
    {
      id: "q5",
      prompt: "Por que gradientes podem desaparecer em redes profundas?",
      options: [
        { id: "a", label: "Porque o backward multiplica muitos fatores pequenos ao longo da cadeia." },
        { id: "b", label: "Porque a função de perda deixa de existir nas primeiras camadas." },
        { id: "c", label: "Porque o forward pass sempre zera a saída das primeiras camadas." },
      ],
      correctOptionId: "a",
      feedback:
        "Se derivadas locais pequenas se acumulam ao longo do caminho, o produto encolhe e o gradiente chega quase nulo ao início da rede.",
    },
    {
      id: "q6",
      prompt: "Qual situação pode gerar exploding gradients?",
      options: [
        { id: "a", label: "Multiplicação repetida de sensibilidades que ampliam demais o sinal no backward." },
        { id: "b", label: "Uso de learning rate muito pequena." },
        { id: "c", label: "Aplicação de softmax na saída." },
      ],
      correctOptionId: "a",
      feedback:
        "Quando a cadeia contém fatores que amplificam o sinal, o gradiente pode crescer excessivamente e tornar o treino instável.",
    },
    {
      id: "q7",
      prompt: "Qual papel da learning rate no update básico?",
      options: [
        { id: "a", label: "Escalar o tamanho do passo tomado na direção sugerida pelo gradiente." },
        { id: "b", label: "Substituir a necessidade de gradiente." },
        { id: "c", label: "Definir automaticamente a arquitetura da rede." },
      ],
      correctOptionId: "a",
      feedback:
        "A learning rate converte a direção e magnitude do gradiente em movimento efetivo do parâmetro. Passo demais ou de menos pode arruinar o treino.",
    },
    {
      id: "q8",
      prompt: "Qual afirmação resume melhor o backpropagation?",
      options: [
        { id: "a", label: "É a aplicação eficiente da regra da cadeia a uma composição grande de operações." },
        { id: "b", label: "É uma busca aleatória por pesos melhores." },
        { id: "c", label: "É um método que funciona sem derivadas." },
      ],
      correctOptionId: "a",
      feedback:
        "Essa é a essência do algoritmo: organizar e reutilizar derivadas locais para obter gradientes globais úteis em larga escala.",
    },
  ],
  glossary: [
    { term: "Backpropagation", definition: "Algoritmo eficiente para calcular gradientes em modelos compostos." },
    { term: "Gradiente", definition: "Medida de sensibilidade da perda em relação a uma variável ou parâmetro." },
    { term: "Regra da cadeia", definition: "Princípio do cálculo que compõe derivadas ao longo de funções encadeadas." },
    { term: "Grafo computacional", definition: "Representação modular de um cálculo como nós e dependências." },
    { term: "Derivada local", definition: "Sensibilidade imediata de uma operação em relação à sua entrada direta." },
    { term: "Derivada total", definition: "Efeito completo de uma variável na perda após toda a cadeia de dependências." },
    { term: "Vanishing gradient", definition: "Enfraquecimento progressivo do gradiente em cadeias profundas." },
    { term: "Exploding gradient", definition: "Crescimento excessivo do gradiente, causando instabilidade numérica." },
    { term: "Learning rate", definition: "Escala que controla o tamanho do passo de atualização dos parâmetros." },
    { term: "Autograd", definition: "Sistema automático de diferenciação usado por bibliotecas modernas de deep learning." },
    { term: "Update", definition: "Alteração aplicada aos parâmetros com base no gradiente calculado." },
  ],
};
