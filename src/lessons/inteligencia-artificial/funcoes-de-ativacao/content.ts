import type { LessonContent } from "../../../types/content";

export const funcoesDeAtivacaoContent: LessonContent = {
  id: "funcoes-de-ativacao",
  title: "Funções de Ativação e Expressividade",
  subtitle:
    "Por que uma rede precisa dobrar, truncar ou comprimir sinais para sair do regime puramente linear e começar a representar padrões realmente interessantes.",
  description:
    "Uma aula visual sobre sigmoid, tanh, ReLU, softmax, saturação, gradientes que desaparecem e a relação entre não linearidade e poder de representação.",
  primaryCategoryId: "inteligencia-artificial",
  secondaryCategoryId: "matematica",
  level: "Intermediário",
  estimatedTime: "40-55 min",
  tags: [
    "Ativações",
    "Sigmoid",
    "Tanh",
    "ReLU",
    "Softmax",
    "Gradientes",
    "Expressividade",
  ],
  learningObjectives: [
    "Entender por que empilhar apenas transformações lineares não aumenta a expressividade real da rede.",
    "Comparar o comportamento geométrico e numérico de sigmoid, tanh e ReLU.",
    "Visualizar como saturação pode enfraquecer o gradiente em redes profundas.",
    "Compreender por que ReLU se tornou uma escolha prática frequente em muitas arquiteturas.",
    "Interpretar softmax como uma transformação de logits em distribuição de probabilidades relativas.",
    "Escolher uma ativação com base em comportamento desejado, e não por hábito.",
  ],
  prerequisites: [
    "Compreensão básica do neurônio artificial e do forward pass.",
    "Noção intuitiva de gráfico de função no plano cartesiano.",
    "Familiaridade com a ideia de classificação e probabilidade.",
  ],
  references: [
    {
      title: "Deep Learning — Chapter 6: Deep Feedforward Networks",
      source: "Goodfellow, Bengio e Courville — MIT Press",
      url: "https://www.deeplearningbook.org/contents/mlp.html",
      note:
        "Referência ampla para unidades escondidas, não linearidades e comportamento de redes feedforward.",
    },
    {
      title: "CS231n — Neural Networks Part 1",
      source: "Stanford University",
      url: "https://cs231n.github.io/neural-networks-1/",
      note:
        "Notas claras sobre ativações, expressividade e arquitetura básica de redes neurais.",
    },
    {
      title: "CS231n — Neural Networks Part 2",
      source: "Stanford University",
      url: "https://cs231n.github.io/neural-networks-2/",
      note:
        "Discussões práticas sobre treino, perdas, ativações e estabilidade de redes profundas.",
    },
    {
      title: "Neural Networks and Deep Learning — Chapter 1",
      source: "Michael Nielsen",
      url: "http://neuralnetworksanddeeplearning.com/chap1.html",
      note:
        "Ajuda a ligar funções de ativação ao comportamento global de redes simples.",
    },
    {
      title: "Rectified Linear Units Improve Restricted Boltzmann Machines",
      source: "Nair e Hinton, ICML 2010",
      url: "https://www.cs.toronto.edu/~hinton/absps/reluICML.pdf",
      note:
        "Referência clássica associada à popularização prática de unidades retificadas.",
    },
    {
      title: "CS231n — Linear Classification",
      source: "Stanford University",
      url: "https://cs231n.github.io/linear-classify/",
      note:
        "Explica softmax e cross-entropy na interpretação probabilística de classificadores.",
    },
  ],
  heroVisual: "ativacoes-hero",
  openingText:
    "Uma rede sem função de ativação é como um time em que todos os jogadores só passam a bola em linha reta: por mais que você adicione pessoas ao campo, o tipo de jogada continua o mesmo. As ativações mudam esse jogo. Elas curvam, recortam, saturam e reescalam sinais. Esse gesto local aparentemente simples é o que permite a uma rede deixar de ser uma sequência de contas lineares e começar a representar fronteiras, regimes e padrões que o mundo real exige.",
  quickFacts: [
    {
      title: "Não linearidade é o ponto de virada",
      body:
        "Sem ela, várias camadas colapsam matematicamente em uma única transformação linear equivalente.",
    },
    {
      title: "Sigmoid comprime",
      body:
        "Ela mapeia qualquer número real para o intervalo entre 0 e 1, útil para interpretar probabilidades, mas sujeita a saturação.",
    },
    {
      title: "ReLU corta o negativo",
      body:
        "Ao zerar valores negativos e manter positivos, ela simplifica o fluxo de gradiente em muitos cenários práticos.",
    },
  ],
  sections: [
    {
      id: "por-que-nao-linearidade",
      eyebrow: "Motivação",
      title: "Sem não linearidade, profundidade não rende poder novo",
      lead:
        "Empilhar camadas lineares pode parecer sofisticado, mas o resultado final continua sendo linear. O ganho real aparece quando quebramos essa linearidade.",
      visual: "linear-vs-nao-linear",
      paragraphs: [
        "Considere duas camadas que apenas multiplicam por matrizes e somam bias. A composição delas ainda é outra transformação linear. Em outras palavras, se você não introduzir uma função não linear entre as camadas, pode condensar toda a rede em um único bloco linear equivalente. A profundidade fica cosmética, não substantiva.",
        "Isso explica por que funções de ativação não são detalhe de implementação. Elas impedem esse colapso algébrico. Ao curvar a resposta do neurônio, permitem que a rede crie regiões, limiares, comportamentos por partes e representações compostas que um único mapa linear não consegue imitar de forma compacta.",
        "Em termos intuitivos, a ativação dá à rede a capacidade de dizer 'daqui para frente me comporto de um jeito; dali para frente, de outro'. Essa flexibilidade local acumulada em muitas unidades é o que sustenta a expressividade global.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Não linearidade",
          body:
            "Propriedade de uma função cuja saída não cresce proporcionalmente à entrada em toda a faixa de valores, permitindo comportamentos mais ricos do que uma reta.",
        },
        {
          type: "insight",
          title: "Profundidade sem ativação vira decoração",
          body:
            "Você pode empilhar quantas camadas lineares quiser; sem ativação entre elas, continua preso à mesma família de funções lineares.",
        },
      ],
    },
    {
      id: "familias-de-ativacao",
      eyebrow: "Exploração",
      title: "Sigmoid, tanh e ReLU: três jeitos de transformar o mesmo sinal",
      lead:
        "Cada ativação impõe um viés geométrico diferente ao fluxo da rede: comprimir, centralizar ou retificar muda o que ela aprende com mais facilidade.",
      visual: "familias-ativacao",
      interactive: "plot-ativacoes",
      paragraphs: [
        "A sigmoid comprime tudo entre 0 e 1. Isso é útil quando queremos uma interpretação probabilística ou uma saída limitada, mas significa também que entradas muito positivas e muito negativas produzem regiões achatadas. Nesses trechos, pequenas mudanças no valor interno quase não afetam a saída.",
        "A tanh também satura nas extremidades, mas possui um benefício geométrico: é centrada em zero. Isso costuma facilitar a dinâmica de treino em comparação com uma ativação estritamente positiva, porque o sinal que segue para a próxima camada pode oscilar entre valores positivos e negativos de forma mais equilibrada.",
        "Já a ReLU toma uma decisão brutalmente simples: mantém o que é positivo e zera o que é negativo. Ela não é uma função suave em toda parte, mas ficou popular porque evita boa parte da compressão excessiva vista em ativações saturantes para valores positivos.",
      ],
      blocks: [
        {
          type: "example",
          title: "Três personalidades",
          body:
            "Sigmoid comprime; tanh comprime e centraliza; ReLU recorta metade do eixo e preserva a outra metade quase sem distorção.",
        },
        {
          type: "mistake",
          title: "Escolher ativação como ritual",
          body:
            "'Sempre use ReLU' ou 'sempre use sigmoid' são simplificações perigosas. A escolha depende da camada, da tarefa e do comportamento numérico desejado.",
        },
      ],
    },
    {
      id: "expressividade",
      eyebrow: "Capacidade",
      title: "Por que não linearidade aumenta a expressividade da rede",
      lead:
        "Ativações permitem dobrar o espaço de representação em regiões locais, de modo que a saída não precise obedecer a uma única regra global simples.",
      visual: "expressividade-em-camadas",
      paragraphs: [
        "Quando uma rede aplica ativações em muitas unidades, ela passa a construir respostas por partes. Pense na ReLU: cada neurônio define uma região em que está ativo e outra em que está silencioso. Ao combinar muitos desses recortes, a rede monta superfícies mais complexas, quase como se costurasse vários pedaços de comportamento linear local.",
        "Essa ideia ajuda a entender por que profundidade e não linearidade andam juntas. Uma camada pode recortar o espaço de entradas; a seguinte opera sobre os recortes produzidos pela anterior; a próxima recombina de novo. O resultado é uma geometria interna cada vez mais refinada.",
        "É por isso que dizer que uma rede 'aprende features' também pode ser lido como 'aprende uma sequência de reparametrizações úteis'. A ativação não é apenas um gatilho; ela participa da própria linguagem em que o problema é reescrito.",
      ],
      blocks: [
        {
          type: "insight",
          title: "Complexidade global nasce de regras locais simples",
          body:
            "Cada neurônio faz pouco sozinho, mas muitos recortes e curvaturas locais combinados constroem funções surpreendentemente expressivas.",
        },
        {
          type: "definition",
          title: "Expressividade",
          body:
            "Capacidade de um modelo representar famílias amplas e úteis de funções, padrões ou fronteiras de decisão.",
        },
      ],
    },
    {
      id: "saturacao-gradiente",
      eyebrow: "Treinamento",
      title: "Saturação e gradientes que encolhem ao voltar pela rede",
      lead:
        "Se uma ativação entra em regiões muito achatadas, pequenas mudanças antes dela quase não alteram a saída. Isso enfraquece o sinal de correção que retorna durante o treino.",
      visual: "gradiente-em-cascata",
      interactive: "pilha-profunda-ativacoes",
      paragraphs: [
        "Em ativações como sigmoid e tanh, os extremos tendem a saturar. Nessa situação, o neurônio fica pouco sensível a variações adicionais da entrada. Isso por si só não é sempre ruim, mas em redes profundas pode contribuir para um efeito cumulativo: o gradiente vai sendo multiplicado por termos pequenos e chega quase morto às primeiras camadas.",
        "A ReLU ganhou espaço justamente por reduzir parte desse problema no lado positivo do eixo. Quando a unidade está ativa, a resposta muda de modo mais direto com a entrada. Ainda assim, ela não é perfeita: neurônios podem ficar presos na região negativa e 'morrer' se nunca mais voltarem a ativar.",
        "A lição importante é que escolha de ativação afeta não apenas a forma da função representada, mas também a qualidade do treinamento. Expressividade e otimizabilidade andam juntas.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Saturação",
          body:
            "Regime em que a saída da ativação muda muito pouco mesmo quando a entrada continua variando, achatando a sensibilidade local da unidade.",
        },
        {
          type: "mistake",
          title: "Tratar vanishing gradient como mistério esotérico",
          body:
            "Na base, é um problema de sensibilidade acumulada: se muitas etapas respondem pouco, o sinal de correção se apaga antes de alcançar o início da rede.",
        },
      ],
    },
    {
      id: "softmax",
      eyebrow: "Saída",
      title: "Softmax: quando a ativação vira disputa entre classes",
      lead:
        "Na saída de um classificador multiclasse, softmax não olha cada logit isoladamente: ela transforma todos juntos em probabilidades relativas que somam 1.",
      visual: "softmax-distribuicao",
      interactive: "softmax-temperature-demo",
      paragraphs: [
        "Diferentemente de sigmoid, aplicada unidade a unidade, softmax é uma função coletiva. Ela pega um vetor de scores e o converte em probabilidades normalizadas. Isso significa que aumentar o score de uma classe muda não apenas a probabilidade dela, mas redistribui massa entre as demais.",
        "Essa competição entre classes é importante porque o modelo passa a ser penalizado por apostar de forma difusa quando deveria concentrar confiança, e também por concentrar confiança na classe errada. O comportamento fica muito alinhado ao cenário em que só uma classe correta deve vencer a disputa.",
        "A sensibilidade da softmax também depende da escala relativa dos logits. Se um logit se destaca muito, a distribuição fica afiada; se todos estão próximos, a distribuição fica mais espalhada. Esse detalhe ajuda a construir intuição sobre temperatura, calibração e certeza aparente.",
      ],
      blocks: [
        {
          type: "formula",
          title: "Softmax",
          body: "Transforma logits arbitrários em probabilidades relativas normalizadas.",
          formula: "softmax(z_i) = e^{z_i} / \sum_j e^{z_j}",
        },
        {
          type: "insight",
          title: "Probabilidade relativa, não absoluta",
          body:
            "O valor de uma classe depende dos scores das outras. Softmax é uma comparação global entre alternativas disponíveis.",
        },
      ],
    },
    {
      id: "escolha-pratica",
      eyebrow: "Projeto",
      title: "Como pensar na escolha de ativações de forma prática",
      lead:
        "Escolher ativação é equilibrar geometria da função, fluxo de gradiente, interpretação da saída e estabilidade do treinamento.",
      visual: "escolha-pratica-ativacoes",
      paragraphs: [
        "Em camadas escondidas, a pergunta central costuma ser: 'qual ativação facilita representar padrões úteis sem tornar o treino numericamente frágil?'. Em muitas arquiteturas clássicas, ReLU e variantes respondem bem a isso. Em algumas tarefas, tanh ainda é interessante quando uma saída centrada em zero ajuda a dinâmica interna.",
        "Na camada de saída, a escolha depende mais diretamente da tarefa. Sigmoid faz sentido em classificação binária ou multilabel; softmax, em classificação multiclasse exclusiva; nenhuma ativação ou uma ativação linear podem ser melhores em regressão. Não existe uma ativação universalmente superior para todos os papéis.",
        "O hábito saudável é sempre relacionar a ativação à semântica da saída e ao comportamento esperado do treinamento. Quando essa conexão fica explícita, muitas decisões aparentemente empíricas passam a fazer sentido conceitual.",
      ],
      blocks: [
        {
          type: "example",
          title: "Perguntas úteis",
          body:
            "A saída precisa representar probabilidade? Precisa aceitar múltiplas classes simultâneas? Precisa permanecer sensível a grandes valores positivos? Essas perguntas reduzem bastante o espaço de escolhas.",
        },
        {
          type: "insight",
          title: "A ativação participa do significado da saída",
          body:
            "Não é apenas uma transformação numérica. Ela impõe restrições e interpretações sobre o que aquele neurônio pode comunicar.",
        },
      ],
    },
    {
      id: "quiz",
      eyebrow: "Revisão",
      title: "Quiz de revisão",
      lead:
        "Verifique se as relações entre não linearidade, expressividade, saturação e softmax ficaram sólidas.",
      interactive: "quiz",
      paragraphs: [
        "As perguntas abaixo foram pensadas para testar raciocínio, não memorização literal de nomes.",
      ],
    },
    {
      id: "glossario",
      eyebrow: "Fechamento",
      title: "Glossário de ativações",
      lead:
        "Ter um vocabulário claro ajuda a ler papers e documentações com menos ruído conceitual.",
      interactive: "glossary",
      paragraphs: [
        "Os termos abaixo aparecem o tempo todo em cursos, bibliotecas e discussões sobre deep learning prático.",
      ],
    },
  ],
  summaryCards: [
    {
      title: "Não linearidade é indispensável",
      body:
        "Sem ativação, várias camadas lineares equivalem a uma só camada linear.",
    },
    {
      title: "Cada ativação impõe um viés",
      body:
        "Sigmoid comprime, tanh centraliza e ReLU retifica. Isso afeta representação e treino.",
    },
    {
      title: "Saturação enfraquece o sinal",
      body:
        "Se muitas unidades respondem pouco, o gradiente pode sumir antes de chegar ao início da rede.",
    },
    {
      title: "Softmax é competição coletiva",
      body:
        "Ela transforma logits em probabilidades relativas que somam 1.",
    },
    {
      title: "Escolha depende da tarefa",
      body:
        "Ativação de saída deve combinar com a semântica do problema, não com costume genérico.",
    },
  ],
  quiz: [
    {
      id: "q1",
      prompt: "O que acontece se empilharmos apenas camadas lineares sem ativação entre elas?",
      options: [
        { id: "a", label: "A rede continua equivalente a uma única transformação linear." },
        { id: "b", label: "A rede automaticamente se torna não linear pela profundidade." },
        { id: "c", label: "A rede deixa de precisar de treinamento." },
      ],
      correctOptionId: "a",
      feedback:
        "A composição de transformações lineares continua linear. A não linearidade é o que impede esse colapso algébrico.",
    },
    {
      id: "q2",
      prompt: "Qual característica diferencia tanh de sigmoid de forma útil para a dinâmica da rede?",
      options: [
        { id: "a", label: "A tanh é centrada em zero, enquanto a sigmoid fica entre 0 e 1." },
        { id: "b", label: "A tanh nunca satura nas extremidades." },
        { id: "c", label: "A tanh transforma logits em probabilidades multiclasse." },
      ],
      correctOptionId: "a",
      feedback:
        "Ambas podem saturar, mas a tanh produz valores positivos e negativos ao redor de zero, o que muda a dinâmica do sinal propagado.",
    },
    {
      id: "q3",
      prompt: "Por que ReLU costuma ajudar no treinamento de redes profundas?",
      options: [
        { id: "a", label: "Porque no lado positivo ela evita parte da compressão forte vista em ativações saturantes." },
        { id: "b", label: "Porque garante que todos os neurônios estejam sempre ativos." },
        { id: "c", label: "Porque converte saídas em probabilidades somando 1." },
      ],
      correctOptionId: "a",
      feedback:
        "ReLU não resolve tudo, mas em muitos casos mantém um fluxo mais direto de sinal para valores positivos e reduz dificuldades associadas à saturação.",
    },
    {
      id: "q4",
      prompt: "O que é saturação em uma ativação?",
      options: [
        { id: "a", label: "Quando a saída muda muito pouco apesar de a entrada continuar variando." },
        { id: "b", label: "Quando a rede atinge 100% de acurácia no treino." },
        { id: "c", label: "Quando todas as classes recebem a mesma probabilidade pela softmax." },
      ],
      correctOptionId: "a",
      feedback:
        "Saturação é um fenômeno local da função de ativação: a resposta fica achatada e perde sensibilidade a mudanças da entrada.",
    },
    {
      id: "q5",
      prompt: "Por que o gradiente pode desaparecer em redes profundas com ativações saturantes?",
      options: [
        { id: "a", label: "Porque o sinal de correção vai sendo enfraquecido ao atravessar várias etapas pouco sensíveis." },
        { id: "b", label: "Porque a função de perda deixa de existir depois de algumas camadas." },
        { id: "c", label: "Porque a softmax apaga automaticamente os pesos iniciais." },
      ],
      correctOptionId: "a",
      feedback:
        "Vanishing gradient é consequência acumulada de sensibilidades pequenas ao longo de muitas camadas, não um evento misterioso isolado.",
    },
    {
      id: "q6",
      prompt: "Como a softmax difere de uma sigmoid aplicada separadamente a cada saída?",
      options: [
        { id: "a", label: "Ela normaliza o vetor todo e faz as classes competirem entre si." },
        { id: "b", label: "Ela é linear e não altera a escala dos logits." },
        { id: "c", label: "Ela zera qualquer valor negativo e mantém os positivos." },
      ],
      correctOptionId: "a",
      feedback:
        "Softmax transforma o conjunto de logits em uma distribuição relativa que soma 1. Cada classe afeta a probabilidade das outras.",
    },
    {
      id: "q7",
      prompt: "Escolher a ativação da camada de saída depende principalmente de quê?",
      options: [
        { id: "a", label: "Da semântica da tarefa: regressão, classificação binária, multilabel ou multiclasse." },
        { id: "b", label: "Da cor usada nos gráficos da apresentação." },
        { id: "c", label: "Do número de epochs escolhido para o treino." },
      ],
      correctOptionId: "a",
      feedback:
        "A ativação final precisa combinar com o significado desejado para a saída, não apenas com convenções vagas de implementação.",
    },
    {
      id: "q8",
      prompt: "Qual frase resume melhor o papel das ativações em redes neurais?",
      options: [
        { id: "a", label: "Elas moldam tanto a expressividade da função quanto a facilidade de treinamento." },
        { id: "b", label: "Elas servem apenas para deixar o modelo mais profundo visualmente." },
        { id: "c", label: "Elas são úteis só na camada de saída." },
      ],
      correctOptionId: "a",
      feedback:
        "Ativações participam da geometria da função aprendida e do fluxo numérico do treino. Por isso, impactam representação e otimização ao mesmo tempo.",
    },
  ],
  glossary: [
    { term: "Função de ativação", definition: "Transformação aplicada à soma ponderada do neurônio para produzir um novo sinal, geralmente não linear." },
    { term: "Não linearidade", definition: "Propriedade que impede a rede de colapsar em uma única transformação linear equivalente." },
    { term: "Sigmoid", definition: "Ativação que comprime números reais para o intervalo entre 0 e 1." },
    { term: "Tanh", definition: "Ativação que comprime para o intervalo entre -1 e 1 e é centrada em zero." },
    { term: "ReLU", definition: "Ativação retificada dada por max(0, x), que zera valores negativos e mantém positivos." },
    { term: "Softmax", definition: "Função que converte um vetor de logits em probabilidades relativas que somam 1." },
    { term: "Logit", definition: "Score bruto produzido pela rede antes da aplicação de uma função como softmax ou sigmoid." },
    { term: "Saturação", definition: "Regime em que a ativação responde pouco a novas mudanças na entrada." },
    { term: "Vanishing gradient", definition: "Enfraquecimento progressivo do sinal de correção ao voltar por muitas camadas." },
    { term: "Expressividade", definition: "Capacidade de um modelo representar famílias ricas de funções e fronteiras de decisão." },
    { term: "Neurônio morto", definition: "Unidade ReLU que permanece na região negativa e deixa de ativar nos dados observados." },
  ],
};
