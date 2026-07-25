import type { LessonContent } from "../../../types/content";

export const otimizadoresSgdMomentumAdamContent: LessonContent = {
  id: "otimizadores-sgd-momentum-adam",
  title: "Otimizadores: SGD, Momentum e Adam",
  subtitle:
    "Backprop entrega gradientes; otimizadores decidem como transformá-los em movimento útil sobre uma paisagem de perda muitas vezes áspera e mal condicionada.",
  description:
    "Uma aula sobre SGD, momentum, Adam, momentos de primeira e segunda ordem, trajetórias de otimização e schedules conceituais de learning rate.",
  primaryCategoryId: "inteligencia-artificial",
  secondaryCategoryId: "computacao",
  level: "Intermediário",
  estimatedTime: "45-60 min",
  tags: [
    "SGD",
    "Momentum",
    "Adam",
    "Otimização",
    "Learning Rate",
    "Moments",
    "Deep Learning",
  ],
  learningObjectives: [
    "Entender por que gradiente sozinho não basta para treinar redes profundas de forma eficiente.",
    "Construir intuição para SGD como estimativa ruidosa, porém útil, do gradiente do conjunto inteiro.",
    "Visualizar momentum como acumulação de velocidade ao longo do relevo da perda.",
    "Compreender Adam como combinação de média móvel do gradiente com adaptação por escala histórica.",
    "Comparar trajetórias qualitativas de SGD, momentum e Adam em superfícies simples.",
    "Interpretar schedules de learning rate como estratégia de exploração inicial e refinamento posterior.",
  ],
  prerequisites: [
    "Noção de gradiente, função de perda e learning rate.",
    "Intuição de update de parâmetros como movimento em uma superfície de erro.",
    "Familiaridade básica com mini-batches ou treino iterativo.",
  ],
  references: [
    {
      title: "Deep Learning — Chapter 8: Optimization for Training Deep Models",
      source: "Goodfellow, Bengio e Courville — MIT Press",
      url: "https://www.deeplearningbook.org/contents/optimization.html",
      note:
        "Referência central para SGD, momentum, métodos adaptativos e dificuldades práticas da otimização em deep learning.",
    },
    {
      title: "CS231n — Optimization Part 1",
      source: "Stanford University",
      url: "https://cs231n.github.io/optimization-1/",
      note:
        "Introduz gradiente, superfícies de perda e motivação para técnicas de otimização em redes neurais.",
    },
    {
      title: "CS231n — Neural Networks Part 3",
      source: "Stanford University",
      url: "https://cs231n.github.io/neural-networks-3/",
      note:
        "Notas práticas sobre SGD, momentum, Adam e cuidados no treinamento de redes profundas.",
    },
    {
      title: "Adam: A Method for Stochastic Optimization",
      source: "Kingma e Ba — arXiv / ICLR",
      url: "https://arxiv.org/abs/1412.6980",
      note:
        "Paper clássico que popularizou Adam com momentos de primeira e segunda ordem e correção de viés.",
    },
    {
      title: "Neural Networks and Deep Learning — Chapter 1",
      source: "Michael Nielsen",
      url: "http://neuralnetworksanddeeplearning.com/chap1.html",
      note:
        "Ajuda a ligar descida do gradiente à ideia de aprendizado gradual em redes neurais.",
    },
  ],
  heroVisual: "otimizadores-hero",
  openingText:
    "Depois que backpropagation nos entrega um gradiente, ainda resta uma pergunta difícil: como transformar esse vetor em um movimento bom sobre uma superfície de perda irregular, ruidosa e muitas vezes mal condicionada? O gradiente diz para que lado a perda cresce mais localmente, mas não resolve sozinho problemas como ruído de mini-batch, vales estreitos, oscilações laterais ou escalas muito diferentes entre parâmetros. É aí que entram os otimizadores. Eles não substituem o gradiente; eles o interpretam e o filtram para produzir trajetórias mais úteis.",
  quickFacts: [
    {
      title: "SGD é ruidoso por natureza",
      body:
        "Ele usa mini-batches e, por isso, vê uma estimativa imperfeita do gradiente total — algo que pode atrapalhar ou ajudar.",
    },
    {
      title: "Momentum acumula inércia",
      body:
        "Em vez de reagir só ao gradiente atual, ele combina passos recentes para atravessar vales com menos zigue-zague.",
    },
    {
      title: "Adam adapta por parâmetro",
      body:
        "Ele suaviza gradientes e ajusta a escala do passo usando médias móveis de primeira e segunda ordem.",
    },
  ],
  sections: [
    {
      id: "por-que-otimizadores",
      eyebrow: "Contexto",
      title: "Backprop entrega informação; o otimizador decide como usá-la",
      lead:
        "Ter um gradiente correto não garante trajetória eficiente. Em superfícies reais, a forma de converter gradiente em update faz enorme diferença.",
      visual: "por-que-otimizadores-visual",
      paragraphs: [
        "Em uma superfície perfeitamente suave e bem condicionada, um update básico de gradiente pode funcionar bem. Mas redes profundas raramente vivem nesse cenário ideal. Há vales alongados, regiões planas, escalas diferentes entre direções e ruído introduzido por mini-batches. Nesses casos, seguir cegamente o gradiente instantâneo pode ser lento ou instável.",
        "Otimizadores entram como estratégias de navegação. Alguns filtram ruído temporal, outros acumulam velocidade, outros ajustam a escala de atualização separadamente para cada parâmetro. O ponto central é que todos tentam responder à mesma pergunta: como aproveitar a informação local do gradiente sem ficar refém de suas limitações imediatas?",
        "Por isso, escolher um otimizador não é trocar de motor estético. É alterar a dinâmica real com que o modelo percorre a paisagem de perda.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Otimizador",
          body:
            "Algoritmo que transforma gradientes calculados pela retropropagação em atualizações efetivas dos parâmetros do modelo.",
        },
        {
          type: "insight",
          title: "Mesmo gradiente, trajetórias diferentes",
          body:
            "Dois otimizadores podem receber a mesma informação local e ainda assim percorrer caminhos muito distintos até chegar a uma boa solução.",
        },
      ],
    },
    {
      id: "sgd",
      eyebrow: "Base",
      title: "SGD: simples, ruidoso e surpreendentemente poderoso",
      lead:
        "Stochastic Gradient Descent usa um subconjunto dos dados para estimar a direção de descida, trocando exatidão instantânea por eficiência computacional.",
      visual: "sgd-ruido-visual",
      paragraphs: [
        "Se calculássemos o gradiente exato em todos os dados a cada passo, o custo por iteração seria enorme em bases grandes. SGD aceita uma aproximação: usa um mini-batch e atualiza os parâmetros com base nessa estimativa parcial. O resultado é um update mais barato e mais frequente.",
        "Essa aproximação introduz ruído. O gradiente de um mini-batch não coincide exatamente com o gradiente do conjunto completo, então a trajetória oscila. Mas esse ruído não é apenas defeito: ele também pode ajudar o treinamento a escapar de comportamentos excessivamente rígidos e a explorar a superfície com alguma energia estocástica.",
        "Na prática, SGD puro costuma exigir mais cuidado com learning rate e pode ziguezaguear bastante em vales estreitos. Ainda assim, continua sendo uma referência conceitual importante e um baseline forte, especialmente quando combinado com momentum.",
      ],
      blocks: [
        {
          type: "definition",
          title: "SGD",
          body:
            "Método de otimização que atualiza parâmetros usando estimativas do gradiente obtidas em mini-batches, em vez do conjunto inteiro.",
        },
        {
          type: "mistake",
          title: "Confundir ruído com falha total",
          body:
            "O ruído do mini-batch pode tornar a trajetória tortuosa, mas muitas vezes é um preço aceitável — ou até útil — pela escalabilidade e exploração.",
        },
      ],
    },
    {
      id: "momentum",
      eyebrow: "Aprimoramento",
      title: "Momentum: dar memória ao movimento",
      lead:
        "Momentum acumula uma espécie de velocidade. Em vez de reagir apenas ao gradiente atual, ele leva em conta a direção recente do trajeto.",
      visual: "momentum-velocidade-visual",
      paragraphs: [
        "A metáfora clássica é a de uma esfera rolando em um relevo. Se o gradiente muda um pouco a cada passo por causa do ruído ou da curvatura lateral, atualizar apenas com a informação instantânea produz vai-e-vem. Momentum suaviza esse comportamento ao manter parte da velocidade anterior.",
        "Isso é especialmente útil em vales alongados: numa direção a curvatura é forte e provoca oscilações; em outra, o avanço desejado é consistente mas lento. Momentum atenua o zigue-zague transversal e acelera o progresso na direção persistente de descida.",
        "A técnica não cria informação nova. Ela reorganiza temporalmente a informação já disponível, tornando o deslocamento mais estável e eficiente em muitos cenários práticos.",
      ],
      blocks: [
        {
          type: "formula",
          title: "Ideia básica do momentum",
          body: "A atualização mistura gradiente atual com a velocidade acumulada dos passos anteriores.",
          formula: "v_t = β v_{t-1} - η g_t ; w_t = w_{t-1} + v_t",
        },
        {
          type: "insight",
          title: "Memória ajuda a atravessar ruído",
          body:
            "Se a direção útil persiste ao longo do tempo, acumular velocidade pode ser melhor do que reiniciar do zero a cada mini-batch.",
        },
      ],
    },
    {
      id: "adam",
      eyebrow: "Adaptativo",
      title: "Adam: média móvel do gradiente + adaptação por escala",
      lead:
        "Adam combina dois tipos de memória: uma média do gradiente e uma média do quadrado do gradiente, ajustando o passo por parâmetro.",
      visual: "adam-momentos-visual",
      interactive: "momentos-do-adam",
      paragraphs: [
        "O primeiro momento funciona como uma versão suavizada do gradiente, análoga a uma velocidade média. O segundo momento monitora a escala típica das flutuações quadráticas do gradiente. Na formulação clássica, Adam ainda aplica correção de viés nesses dois acumuladores nos primeiros passos, compensando o fato de ambos começarem em zero.",
        "Essa adaptação por parâmetro tornou Adam extremamente popular, principalmente em problemas heterogêneos, esparsos ou com escalas internas bastante distintas. Na prática, ele costuma ser um bom ponto de partida para muitos experimentos, embora não seja sempre a escolha final ideal.",
        "É importante, porém, não tratá-lo como magia automática. Adam também depende de hiperparâmetros, escala do problema e do tipo de generalização desejada. Seu valor está em oferecer uma heurística robusta e amplamente útil, não em abolir o julgamento experimental.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Primeiro momento",
          body:
            "Média móvel do gradiente, usada como estimativa suavizada da direção predominante de atualização.",
        },
        {
          type: "definition",
          title: "Segundo momento",
          body:
            "Média móvel do quadrado do gradiente, usada para adaptar a escala do passo conforme a variabilidade observada.",
        },
      ],
    },
    {
      id: "trajetorias",
      eyebrow: "Comparação",
      title: "Otimizadores diferentes desenham trajetórias diferentes",
      lead:
        "Mesmo em uma superfície simples, SGD, momentum e Adam podem percorrer caminhos com personalidades bastante distintas.",
      visual: "trajetorias-visual",
      interactive: "corrida-otimizadores",
      paragraphs: [
        "SGD tende a refletir diretamente as irregularidades locais do gradiente. Momentum suaviza oscilações e mantém avanço em direções persistentes. Adam, além de suavizar, reescala o passo por coordenada, o que costuma ajudá-lo a lidar melhor com eixos de curvatura muito diferentes.",
        "Essas diferenças importam não só pela velocidade aparente de convergência, mas pelo tipo de região que cada método visita, pelo quanto oscila e pela robustez que oferece a certas escalas de hiperparâmetros. Em aplicações reais, muitas vezes o melhor método depende tanto do problema quanto do regime de treino.",
        "Observar trajetórias em 2D é didático porque reduz um fenômeno altamente dimensional a algo visualizável. O mapa é simplificado, mas a intuição transportada é valiosa.",
      ],
      blocks: [
        {
          type: "example",
          title: "Mesmo relevo, comportamentos diferentes",
          body:
            "Um otimizador pode chegar rápido ao vale mas oscilar mais; outro pode parecer mais suave porém mais conservador. O melhor depende da tarefa e do regime de tuning.",
        },
      ],
    },
    {
      id: "schedules",
      eyebrow: "Estratégia",
      title: "Learning rate schedules: explorar antes, refinar depois",
      lead:
        "Manter a mesma learning rate o treino inteiro nem sempre é ideal. Schedules permitem passos maiores no início e menor agressividade perto de boas regiões.",
      visual: "schedules-visual",
      interactive: "schedules-conceituais",
      paragraphs: [
        "No começo do treino, passos maiores podem ser úteis para percorrer rapidamente regiões ruins e ganhar escala de exploração. Mais adiante, quando o modelo já encontrou um vale promissor, passos menores ajudam a refinar sem tanta oscilação. Schedules formalizam essa mudança de regime.",
        "Há muitas famílias de schedules: constante, step decay, exponencial, cosine annealing e outras. Cada uma tenta dosar de forma diferente a transição entre exploração e refinamento. O detalhe importante é a lógica, não a decoração da curva.",
        "Isso também mostra um ponto mais geral: otimização em deep learning é menos uma aplicação de fórmula única e mais um conjunto de heurísticas bem motivadas que conversam com a geometria da perda e com o estágio do treinamento.",
      ],
      blocks: [
        {
          type: "insight",
          title: "A mesma taxa não serve igualmente para todas as fases",
          body:
            "No início queremos mobilidade; perto do vale queremos precisão. Schedules tentam traduzir essa intuição em regra temporal.",
        },
      ],
    },
    {
      id: "quiz",
      eyebrow: "Revisão",
      title: "Quiz de revisão",
      lead:
        "Teste se as diferenças conceituais entre SGD, momentum, Adam e schedules ficaram conectadas.",
      interactive: "quiz",
      paragraphs: [
        "O quiz foi desenhado para checar sua leitura da dinâmica de otimização, não apenas memorização de siglas.",
      ],
    },
    {
      id: "glossario",
      eyebrow: "Fechamento",
      title: "Glossário de otimização",
      lead:
        "Com estes termos em mãos, artigos e logs de treino passam a fazer muito mais sentido.",
      interactive: "glossary",
      paragraphs: [
        "Eles aparecem constantemente em cursos, papers e bibliotecas modernas de deep learning.",
      ],
    },
  ],
  summaryCards: [
    { title: "Gradiente não basta sozinho", body: "O otimizador decide como converter informação local em movimento útil sobre a paisagem de perda." },
    { title: "SGD troca exatidão por escalabilidade", body: "Mini-batches tornam o treino viável e introduzem um ruído que pode ser tanto custo quanto benefício." },
    { title: "Momentum adiciona memória", body: "Ele reduz oscilações laterais e acelera direções persistentes de descida." },
    { title: "Adam adapta por parâmetro", body: "Momentos de primeira e segunda ordem ajudam a calibrar a escala do passo em diferentes coordenadas." },
    { title: "Schedules mudam o regime do treino", body: "Passos maiores no início e menores depois costumam equilibrar exploração e refinamento." },
  ],
  quiz: [
    {
      id: "q1",
      prompt: "Por que um otimizador ainda é necessário depois de calcular gradientes com backpropagation?",
      options: [
        { id: "a", label: "Porque alguém precisa transformar gradientes em atualizações práticas e lidar com ruído, escala e estabilidade." },
        { id: "b", label: "Porque backpropagation não produz nenhuma direção de melhoria." },
        { id: "c", label: "Porque a função de perda some depois do backward pass." },
      ],
      correctOptionId: "a",
      feedback:
        "Backpropagation fornece informação. O otimizador define como usá-la de modo eficiente sobre a superfície de perda real.",
    },
    {
      id: "q2",
      prompt: "Qual trade-off básico está por trás do SGD?",
      options: [
        { id: "a", label: "Trocar gradiente exato por uma estimativa de mini-batch mais barata e mais ruidosa." },
        { id: "b", label: "Trocar derivadas por busca aleatória total." },
        { id: "c", label: "Trocar o uso de dados por regras manuais." },
      ],
      correctOptionId: "a",
      feedback:
        "SGD ganha escalabilidade ao usar mini-batches, aceitando o ruído dessa estimativa como parte do processo.",
    },
    {
      id: "q3",
      prompt: "O que momentum tenta melhorar em relação ao SGD puro?",
      options: [
        { id: "a", label: "Oscilações e lentidão em direções persistentes, acumulando velocidade ao longo do tempo." },
        { id: "b", label: "A necessidade de gradiente para atualizar parâmetros." },
        { id: "c", label: "A função de perda, tornando-a automaticamente convexa." },
      ],
      correctOptionId: "a",
      feedback:
        "Momentum dá memória ao movimento, suavizando zigue-zagues e acelerando a descida em direções consistentes.",
    },
    {
      id: "q4",
      prompt: "Em Adam, o segundo momento serve principalmente para quê?",
      options: [
        { id: "a", label: "Adaptar a escala do passo conforme a variabilidade histórica do gradiente em cada parâmetro." },
        { id: "b", label: "Substituir completamente a learning rate por uma constante fixa universal." },
        { id: "c", label: "Eliminar qualquer necessidade de mini-batches." },
      ],
      correctOptionId: "a",
      feedback:
        "O segundo momento acompanha o quadrado do gradiente e ajuda a modular o tamanho do update por coordenada.",
    },
    {
      id: "q5",
      prompt: "Por que trajetórias diferentes podem surgir mesmo com o mesmo gradiente local?",
      options: [
        { id: "a", label: "Porque cada otimizador filtra, acumula ou reescala o gradiente de forma diferente." },
        { id: "b", label: "Porque o gradiente deixa de ser definido quando escolhemos outro otimizador." },
        { id: "c", label: "Porque a arquitetura da rede muda automaticamente." },
      ],
      correctOptionId: "a",
      feedback:
        "O gradiente é só o insumo. O mecanismo de atualização do otimizador é que produz trajetórias distintas na prática.",
    },
    {
      id: "q6",
      prompt: "Qual afirmação sobre o ruído do SGD é mais justa?",
      options: [
        { id: "a", label: "Ele pode atrapalhar a estabilidade local, mas também contribuir para exploração e escalabilidade." },
        { id: "b", label: "Ele sempre destrói o treinamento sem exceções." },
        { id: "c", label: "Ele faz o gradiente virar exatamente o gradiente do conjunto completo." },
      ],
      correctOptionId: "a",
      feedback:
        "O ruído de mini-batch é um compromisso. Ele é custo e, em muitos casos, também parte da utilidade do método.",
    },
    {
      id: "q7",
      prompt: "Qual é a lógica principal por trás de schedules de learning rate?",
      options: [
        { id: "a", label: "Usar passos mais agressivos no início e mais finos conforme o treino amadurece." },
        { id: "b", label: "Manter a mesma taxa sempre, independentemente da fase do treino." },
        { id: "c", label: "Substituir o gradiente por uma busca exaustiva no espaço de parâmetros." },
      ],
      correctOptionId: "a",
      feedback:
        "Schedules refletem a intuição de explorar mais cedo e refinar depois, ajustando o regime temporal do treino.",
    },
    {
      id: "q8",
      prompt: "Qual resumo descreve melhor Adam?",
      options: [
        { id: "a", label: "Um método adaptativo que combina médias móveis do gradiente e do gradiente ao quadrado." },
        { id: "b", label: "Um SGD puro sem memória nem adaptação." },
        { id: "c", label: "Um método que ignora learning rate e hiperparâmetros." },
      ],
      correctOptionId: "a",
      feedback:
        "Essa é a essência conceitual do Adam: memória direcional + adaptação de escala por parâmetro.",
    },
  ],
  glossary: [
    { term: "Otimizador", definition: "Algoritmo que converte gradientes em atualizações de parâmetros." },
    { term: "SGD", definition: "Descida do gradiente estocástica com base em mini-batches." },
    { term: "Mini-batch", definition: "Subconjunto de exemplos usado para estimar o gradiente em uma iteração." },
    { term: "Momentum", definition: "Técnica que acumula velocidade para suavizar e acelerar a otimização." },
    { term: "Adam", definition: "Otimizador adaptativo baseado em médias móveis do gradiente e do gradiente ao quadrado, com correção de viés no início do treino." },
    { term: "Primeiro momento", definition: "Média móvel do gradiente usada como direção suavizada de atualização." },
    { term: "Segundo momento", definition: "Média móvel do quadrado do gradiente usada para adaptar a escala do passo." },
    { term: "Learning rate", definition: "Escala básica que controla o tamanho do update." },
    { term: "Schedule", definition: "Regra temporal que modifica a learning rate ao longo do treinamento." },
    { term: "Ruído de mini-batch", definition: "Variação introduzida pelo uso de subconjuntos de dados em vez do conjunto inteiro." },
    { term: "Convergência", definition: "Aproximação progressiva a uma região de baixa perda durante o treino." },
  ],
};
