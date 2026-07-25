import type { LessonContent } from "../../../types/content";

export const probabilidadeParaIaContent: LessonContent = {
  id: "probabilidade-para-ia",
  title: "Probabilidade para IA",
  subtitle:
    "A linguagem da incerteza que permite a modelos aprender com dados imperfeitos, fazer previsões graduais e decidir sem fingir certeza onde ela não existe.",
  description:
    "Uma aula visual sobre incerteza, frequência e probabilidade, distribuições, valor esperado, intuição bayesiana e por que aprendizado de máquina trata previsões como probabilidades.",
  primaryCategoryId: "inteligencia-artificial",
  secondaryCategoryId: "matematica",
  level: "Iniciante",
  estimatedTime: "40-55 min",
  tags: [
    "Probabilidade",
    "Machine Learning",
    "Incerteza",
    "Distribuições",
    "Valor Esperado",
    "Bayes",
    "Estatística",
  ],
  learningObjectives: [
    "Entender por que sistemas de IA trabalham com incerteza em vez de respostas totalmente determinísticas.",
    "Distinguir frequência observada de probabilidade modelada e saber por que as duas ideias se conversam sem serem idênticas.",
    "Interpretar distribuições como mapas de possibilidades e não apenas como tabelas de números.",
    "Ler histogramas como resumos visuais do comportamento de um conjunto de dados ou de um processo aleatório.",
    "Compreender valor esperado como média de longo prazo e como critério de decisão sob risco.",
    "Construir uma intuição inicial de probabilidade condicional e atualização bayesiana sem formalismo excessivo.",
    "Explicar por que classificação, regressão probabilística, recomendação e previsão de linguagem dependem de probabilidades.",
  ],
  prerequisites: [
    "Conforto básico com porcentagens e médias simples.",
    "Noção intuitiva de gráficos de barras e tabelas.",
    "Curiosidade sobre como modelos fazem previsões a partir de dados incompletos.",
    "Não é preciso conhecer fórmulas avançadas de estatística.",
  ],
  references: [
    {
      title: "Probabilistic Systems Analysis and Applied Probability",
      source: "MIT OpenCourseWare",
      url: "https://ocw.mit.edu/courses/6-041sc-probabilistic-systems-analysis-and-applied-probability-fall-2013/",
      note:
        "Curso clássico do MIT sobre modelagem da incerteza, variáveis aleatórias, inferência e regra de Bayes.",
    },
    {
      title: "Probability library",
      source: "Khan Academy",
      url: "https://www.khanacademy.org/math/statistics-probability/probability-library",
      note:
        "Trilha introdutória com noções de eventos, probabilidade, condicionamento e interpretação intuitiva.",
    },
    {
      title: "Random variables",
      source: "Khan Academy",
      url: "https://www.khanacademy.org/math/probability/statistics-probability/random-variables-stats-library/random-variables-discrete/v/random-variables",
      note:
        "Introdução didática a variáveis aleatórias como funções que transformam resultados em números analisáveis.",
    },
    {
      title: "Probability density functions",
      source: "Khan Academy",
      url: "https://www.khanacademy.org/math/statistics-probability/random-variables-stats-library/random-variables-continuous/v/probability-density-functions",
      note:
        "Ajuda a diferenciar probabilidade discreta de densidade em variáveis contínuas.",
    },
    {
      title: "Probability and Information Theory",
      source: "Deep Learning Book — Goodfellow, Bengio e Courville",
      url: "https://www.deeplearningbook.org/contents/prob.html",
      note:
        "Capítulo que mostra por que probabilidade é uma ferramenta central em inteligência artificial moderna.",
    },
    {
      title: "Logistic Regression",
      source: "Google Machine Learning Crash Course",
      url: "https://developers.google.com/machine-learning/crash-course/logistic-regression",
      note:
        "Material oficial que mostra classificadores produzindo probabilidades e não apenas rótulos rígidos.",
    },
  ],
  heroVisual: "probabilidade-hero",
  openingText:
    "Quando um filtro de spam decide se uma mensagem é perigosa, ele quase nunca tem certeza absoluta. Quando um modelo prevê chuva, fraude ou a próxima palavra de uma frase, ele está sempre lidando com possibilidades concorrentes. Probabilidade não entra na IA como um enfeite matemático: ela entra porque o mundo real é ambíguo, ruidoso e incompleto. Aprender probabilidade é aprender a pensar com graus de confiança, e isso muda completamente a forma como entendemos machine learning.",
  quickFacts: [
    {
      title: "Prever = distribuir confiança",
      body:
        "Um modelo útil não diz apenas 'sim' ou 'não'. Ele distribui confiança entre hipóteses possíveis para que possamos comparar riscos e decidir melhor.",
    },
    {
      title: "Frequência ensina",
      body:
        "Ao observar muitos exemplos, aprendemos padrões de repetição. É daí que surgem estimativas práticas de probabilidade em dados reais.",
    },
    {
      title: "Valor esperado decide",
      body:
        "Nem sempre a melhor ação é a mais provável. Muitas decisões em IA e em negócios dependem do retorno médio ponderado pelos cenários possíveis.",
    },
    {
      title: "Bayes atualiza",
      body:
        "Probabilidade muda quando chega informação nova. O coração do pensamento bayesiano é revisar crenças sem precisar recomeçar do zero.",
    },
  ],
  sections: [
    {
      id: "por-que-incerteza-importa",
      eyebrow: "Ponto de partida",
      title: "IA precisa de probabilidade porque o mundo não vem rotulado com certeza",
      lead:
        "Se o mundo fosse perfeitamente previsível, bastariam regras fixas. Como dados são incompletos, medições têm ruído e categorias se sobrepõem, modelos precisam representar incerteza.",
      visual: "incerteza-decisao",
      paragraphs: [
        "Em muitos problemas reais, a informação chega fragmentada. Um exame médico pode sugerir uma doença sem prová-la, um clique pode sinalizar interesse sem garantir compra, e uma frase pode admitir mais de uma interpretação. Tratar essas situações como totalmente certas produz sistemas frágeis, excessivamente confiantes e difíceis de calibrar.",
        "Probabilidade oferece uma linguagem para comparar hipóteses em vez de fingir certeza. Em vez de 'isto é gato', um modelo pode dizer 'há alta chance de ser gato, mas ainda existe chance de ser raposa'. Essa nuance não é fraqueza; é precisamente o que permite tomar decisões melhores quando a evidência é parcial.",
        "Na prática, pensar probabilisticamente também ajuda a desenhar pipelines inteiros: definir limiares, priorizar revisões humanas, avaliar risco e estimar custo de erro. IA não usa probabilidade só para prever; usa para agir de forma mais racional sob incerteza.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Incerteza",
          body:
            "Situação em que não conhecemos com total segurança qual resultado ocorrerá, qual hipótese é verdadeira ou qual medição representa melhor a realidade.",
        },
        {
          type: "insight",
          title: "Probabilidade não substitui conhecimento: ela organiza dúvida",
          body:
            "Um modelo probabilístico não precisa saber tudo. Ele precisa distribuir confiança de maneira coerente, para que novas evidências possam refinar a decisão.",
        },
      ],
    },
    {
      id: "frequencia-vs-probabilidade",
      eyebrow: "Intuição básica",
      title: "Frequência observada e probabilidade modelada não são a mesma coisa",
      lead:
        "Frequência responde ao que aconteceu muitas vezes. Probabilidade responde ao quão plausível é cada resultado segundo um modelo ou hipótese sobre o processo.",
      visual: "frequencia-vs-probabilidade",
      interactive: "coin-data-simulator",
      paragraphs: [
        "Se uma moeda deu cara 52 vezes em 100 lançamentos, a frequência observada de caras foi 52%. Isso descreve a amostra. Já a probabilidade tenta descrever o mecanismo gerador: se eu lançar de novo, qual chance faz sentido atribuir à próxima cara? Em experimentos equilibrados e com muitos dados, frequência e probabilidade tendem a se aproximar, mas continuam conceitos diferentes.",
        "Essa distinção importa em IA porque treinamos modelos com amostras finitas. Um conjunto de dados pode sugerir um padrão por acaso, por viés de coleta ou por tamanho insuficiente. O trabalho do modelo é aprender algo que generalize para dados futuros, não apenas repetir frequências passadas sem crítica.",
        "Por isso, falar em probabilidade é sempre falar também em hipótese, contexto e quantidade de dados. Frequências são evidência. Probabilidades são interpretações quantitativas dessa evidência.",
      ],
      blocks: [
        {
          type: "example",
          title: "Spam em um lote pequeno",
          body:
            "Se 8 de 10 e-mails de uma amostra eram spam, a frequência foi 80%. Isso não prova que exatamente 80% dos próximos e-mails serão spam; apenas sugere uma direção inicial.",
        },
        {
          type: "mistake",
          title: "Tomar uma amostra pequena como verdade final",
          body:
            "Em dados escassos, frequências oscilam bastante. Confundir isso com certeza leva a modelos superconfiantes e decisões ruins.",
        },
      ],
    },
    {
      id: "distribuicoes-como-mapas",
      eyebrow: "Linguagem central",
      title: "Distribuições são mapas das possibilidades",
      lead:
        "Uma distribuição não é só uma fórmula: é uma forma organizada de dizer quais resultados são comuns, raros, impossíveis ou mais prováveis sob certo processo.",
      visual: "distribuicoes-comuns",
      paragraphs: [
        "Quando falamos da altura de pessoas, do número de cliques em um anúncio ou do tempo até uma falha de servidor, estamos descrevendo comportamentos que variam. A distribuição resume esse comportamento. Ela mostra onde os resultados se concentram, quão espalhados ficam e se existe assimetria entre cenários prováveis e raros.",
        "Na IA, distribuições aparecem o tempo todo. Um classificador produz uma distribuição sobre classes. Um modelo de linguagem produz uma distribuição sobre o próximo token. Um modelo bayesiano mantém distribuições sobre parâmetros desconhecidos. Em todos esses casos, o objetivo não é adivinhar um único número, mas mapear um espaço de alternativas.",
        "Essa visão é poderosa porque separa duas perguntas: quais valores podem ocorrer, e com que intensidade cada um pesa na decisão. Sem distribuição, vemos apenas saídas isoladas. Com distribuição, vemos a estrutura da incerteza.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Distribuição de probabilidade",
          body:
            "Regra que associa probabilidades a resultados possíveis de uma variável aleatória, descrevendo como a massa de probabilidade se espalha entre cenários.",
        },
        {
          type: "insight",
          title: "Distribuição é contexto para cada previsão",
          body:
            "Dizer que um valor tem 0,6 de probabilidade só faz sentido quando entendemos quais outros valores competem com ele e como toda a massa foi distribuída.",
        },
      ],
    },
    {
      id: "histogramas",
      eyebrow: "Leitura de dados",
      title: "Histograma é a ponte visual entre dados brutos e distribuição",
      lead:
        "Antes de escrever fórmulas, quase sempre vale olhar a forma dos dados. O histograma mostra concentração, dispersão, caudas e assimetrias de um jeito rápido e concreto.",
      visual: "histograma-intuicao",
      interactive: "distribution-histogram-lab",
      paragraphs: [
        "Um histograma agrupa valores em faixas e conta quantas observações caem em cada faixa. Isso não entrega a distribuição verdadeira do fenômeno, mas produz um retrato útil da amostra. Picos podem sugerir valores comuns; caudas longas podem indicar raridades ou assimetrias; mais de um pico pode sinalizar misturas de populações diferentes.",
        "Em machine learning, histogramas ajudam a escolher normalizações, detectar valores extremos, entender desbalanceamento e comparar treino com produção. Muitas vezes o primeiro bug de dados aparece mais claramente em um histograma do que em uma métrica sofisticada.",
        "Também é importante lembrar que o histograma depende de escolhas de agrupamento. Faixas muito largas escondem estrutura; faixas muito estreitas amplificam ruído. Ler histogramas é interpretar padrões com prudência, não enxergar certezas mágicas.",
      ],
      blocks: [
        {
          type: "example",
          title: "Pontuações de modelo",
          body:
            "Se um classificador gera muitas probabilidades perto de 0,5, talvez ele esteja indeciso na maioria dos casos. Se concentra perto de 0 ou 1, pode estar mais confiante — ou excessivamente confiante.",
        },
        {
          type: "mistake",
          title: "Confundir histograma com distribuição exata",
          body:
            "O histograma é um resumo da amostra e depende do tamanho do conjunto e da escolha dos intervalos. Ele orienta a intuição, mas não substitui raciocínio estatístico.",
        },
      ],
    },
    {
      id: "variavel-aleatoria",
      eyebrow: "Ferramenta conceitual",
      title: "Variável aleatória transforma resultados em números manipuláveis",
      lead:
        "Probabilidade fica muito mais útil quando representamos resultados por números. É isso que a variável aleatória faz: ela converte cenários em valores sobre os quais podemos calcular, comparar e resumir.",
      visual: "variavel-aleatoria-mapa",
      paragraphs: [
        "Ao lançar duas moedas, os resultados possíveis são pares como cara-cara, cara-coroa e assim por diante. Podemos definir uma variável aleatória X como 'número de caras'. A partir daí, cada resultado do experimento passa a corresponder a um valor numérico: 0, 1 ou 2. O experimento continua aleatório, mas agora podemos organizar essa incerteza em uma linguagem mais tratável.",
        "Essa mudança parece pequena, mas é ela que libera quase toda a maquinaria da estatística e do ML. Variáveis aleatórias permitem falar de média, variância, correlação, expectativa de perda e muitas outras quantidades que ajudam a projetar algoritmos e avaliar risco.",
        "Em IA, quase tudo vira variável aleatória em algum nível: rótulo verdadeiro, entrada observada, erro residual, clique futuro, retorno esperado, palavra seguinte. Pensar assim ajuda a enxergar modelos como mecanismos que aprendem relações entre incertezas.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Variável aleatória",
          body:
            "Função que associa um valor numérico a cada resultado possível de um experimento aleatório, permitindo resumir e analisar o processo com ferramentas matemáticas.",
        },
        {
          type: "example",
          title: "Número de acertos",
          body:
            "Em um quiz com várias questões, uma variável aleatória pode representar quantas respostas corretas um aluno obtém. Isso transforma uma situação qualitativa em uma distribuição numérica.",
        },
      ],
    },
    {
      id: "valor-esperado",
      eyebrow: "Decisão sob risco",
      title: "Valor esperado é a média ponderada do futuro possível",
      lead:
        "Quando cada cenário tem um ganho ou custo diferente, probabilidade sozinha não basta. Precisamos combinar chance com consequência — e é isso que o valor esperado faz.",
      visual: "valor-esperado-balanca",
      interactive: "expected-value-lab",
      paragraphs: [
        "Valor esperado não diz o que acontecerá em uma rodada específica. Ele descreve a média de longo prazo se repetirmos o processo muitas vezes sob as mesmas condições. Por isso, ele é tão útil para comparar ações, políticas e estratégias em ambientes incertos.",
        "Em IA, valor esperado aparece em ranking, alocação de recursos, sistemas de recomendação, aprendizagem por reforço e até na escolha de limiares de classificação. Às vezes um evento raro compensa muito; às vezes um evento provável custa caro demais. Só olhar a classe mais provável pode esconder essa estrutura de custo-benefício.",
        "A intuição correta é: probabilidade responde ao 'quão provável?', enquanto valor esperado responde ao 'quanto vale, em média, agir assim?'. Uma boa decisão quase sempre precisa das duas coisas juntas.",
      ],
      blocks: [
        {
          type: "formula",
          title: "Valor esperado",
          body:
            "Média ponderada dos resultados possíveis, em que cada valor é multiplicado pela sua probabilidade antes de ser somado.",
          formula: "E[X] = soma de valor × probabilidade",
        },
        {
          type: "insight",
          title: "Alta probabilidade não implica melhor decisão",
          body:
            "Se um erro raro é muito caro, a ação com maior probabilidade de acerto pode ainda assim ter valor esperado pior que uma alternativa mais conservadora.",
        },
      ],
    },
    {
      id: "condicional-e-bayes",
      eyebrow: "Atualização de crenças",
      title: "Probabilidade condicional e Bayes: revisar o que você pensa quando chega evidência",
      lead:
        "Muitas perguntas importantes não são 'qual a chance de X?', mas sim 'qual a chance de X dado que observei Y?'. É aí que a probabilidade condicional entra, e a intuição bayesiana começa.",
      visual: "bayes-fluxo",
      paragraphs: [
        "Probabilidade condicional mede como uma hipótese muda quando restringimos o contexto. A chance de chuva amanhã não é a mesma com céu limpo e a mesma com nuvens carregadas. Em IA, novas evidências chegam o tempo inteiro: um pixel adicional, uma palavra precedente, uma transação anterior, um sintoma novo.",
        "A regra de Bayes organiza essa atualização. Ela combina o que você já acreditava antes de ver a evidência com o quanto essa evidência combina com cada hipótese. A versão intuitiva é simples: hipóteses que explicam melhor o que você observou devem ganhar peso; hipóteses incompatíveis devem perder peso.",
        "O valor pedagógico de Bayes é enorme porque ele ensina uma postura mental central para IA: conhecimento não é fixo. Modelos ajustam confiança à medida que recebem sinais, e fazem isso melhor quando distinguem contexto prévio de evidência recém-observada.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Probabilidade condicional",
          body:
            "Probabilidade de um evento considerando que outra informação já é conhecida. Ela refina o espaço de possibilidades relevante.",
        },
        {
          type: "example",
          title: "Detector de spam",
          body:
            "Palavras como 'grátis' ou 'urgente' não provam spam, mas aumentam a probabilidade condicional de a mensagem pertencer a essa classe quando combinadas com outros sinais.",
        },
        {
          type: "mistake",
          title: "Esquecer a taxa de base",
          body:
            "Uma evidência forte pode parecer conclusiva, mas ainda precisa ser interpretada à luz de quão comum ou rara era a hipótese antes da evidência aparecer.",
        },
      ],
    },
    {
      id: "ml-e-probabilistico",
      eyebrow: "Conexão com IA",
      title: "Por que machine learning é probabilístico mesmo quando o produto final mostra um único rótulo",
      lead:
        "Mesmo que a interface mostre apenas a resposta mais provável, o treinamento e a inferência de muitos modelos dependem de distribuições, perdas probabilísticas e estimativas de confiança.",
      visual: "ml-probabilistico",
      paragraphs: [
        "Classificadores modernos costumam produzir probabilidades sobre classes. Modelos de linguagem produzem probabilidades sobre o próximo token. Sistemas de recomendação estimam a chance de clique, compra ou abandono. Em todos esses casos, a predição final pode virar um único item, mas a computação interna depende de comparar cenários concorrentes.",
        "Isso importa porque aprendizado de máquina não lida apenas com acerto bruto. Ele lida com calibração, risco, incerteza epistêmica, custo de erro e generalização. Dois modelos com a mesma acurácia podem ser muito diferentes se um for bem calibrado e o outro der 99% de confiança para palpites errados.",
        "Quando entendemos esse ponto, fica mais claro por que funções de perda como log loss, técnicas como Naive Bayes e objetivos de máxima verossimilhança aparecem tanto. Não são detalhes esotéricos: são maneiras de ensinar máquinas a lidar com incerteza de forma quantitativa e útil.",
      ],
      blocks: [
        {
          type: "insight",
          title: "O rótulo final é só a ponta da distribuição",
          body:
            "Escolher a classe mais provável é comprimir uma distribuição inteira em uma decisão única. O trabalho importante aconteceu antes, na modelagem dessas probabilidades.",
        },
        {
          type: "example",
          title: "Previsão de próxima palavra",
          body:
            "Um modelo não 'sabe' a próxima palavra de forma determinística. Ele distribui massa de probabilidade entre muitas opções e então escolhe, amostra ou ranqueia conforme o objetivo.",
        },
      ],
    },
    {
      id: "quiz-revisao",
      eyebrow: "Revisão",
      title: "Quiz de revisão",
      lead:
        "Teste se as peças se conectaram: incerteza, frequência, distribuição, histograma, valor esperado, condicionamento e uso em ML.",
      interactive: "quiz",
      paragraphs: [
        "Use o quiz para reconstruir o raciocínio, não apenas para lembrar definições isoladas. A meta é enxergar como probabilidade sustenta decisões em IA.",
      ],
    },
    {
      id: "glossario-proximos-passos",
      eyebrow: "Fechamento",
      title: "Glossário e próximos passos",
      lead:
        "Feche a aula consolidando o vocabulário mínimo para estudar modelos probabilísticos, inferência e métricas mais à frente.",
      interactive: "glossary",
      paragraphs: [
        "Se esse vocabulário estiver claro, tópicos como entropia, verossimilhança, cross-entropy, classificação probabilística e modelos bayesianos ficam muito menos assustadores.",
      ],
    },
  ],
  summaryCards: [
    {
      title: "IA opera sob incerteza",
      body:
        "Probabilidade é necessária porque dados reais são ruidosos, incompletos e ambíguos.",
    },
    {
      title: "Frequência fornece evidência",
      body:
        "Contagens observadas ajudam a estimar padrões, mas não são a mesma coisa que probabilidade conceitual.",
    },
    {
      title: "Distribuições mostram estrutura",
      body:
        "Elas organizam possibilidades, concentração de massa e cenários raros de forma comparável.",
    },
    {
      title: "Histogramas ajudam a enxergar dados",
      body:
        "Antes de formalizar, vale ver como a amostra se comporta visualmente.",
    },
    {
      title: "Valor esperado junta chance e consequência",
      body:
        "Boas decisões dependem tanto do quão provável algo é quanto do impacto de cada resultado.",
    },
    {
      title: "Bayes atualiza confiança",
      body:
        "Novas evidências devem mudar o peso das hipóteses, não apenas confirmar opiniões antigas.",
    },
  ],
  quiz: [
    {
      id: "q1",
      prompt: "Qual problema a probabilidade resolve melhor em IA?",
      options: [
        { id: "a", label: "Representar incerteza quando dados e evidências são imperfeitos." },
        { id: "b", label: "Eliminar completamente o erro de previsão." },
        { id: "c", label: "Substituir qualquer necessidade de dados reais." },
      ],
      correctOptionId: "a",
      feedback:
        "Probabilidade não remove incerteza do mundo; ela fornece uma linguagem para quantificá-la e agir melhor apesar dela.",
    },
    {
      id: "q2",
      prompt: "Se uma amostra pequena mostrou 80% de um resultado, o que isso significa?",
      options: [
        { id: "a", label: "A frequência observada foi 80%, mas a probabilidade real ainda precisa ser inferida com cautela." },
        { id: "b", label: "A probabilidade verdadeira é exatamente 80% para sempre." },
        { id: "c", label: "A amostra não serve para nada." },
      ],
      correctOptionId: "a",
      feedback:
        "A amostra traz evidência, mas ainda pode conter ruído, viés ou flutuação aleatória. Frequência observada e probabilidade modelada não são idênticas.",
    },
    {
      id: "q3",
      prompt: "Qual frase descreve melhor uma distribuição de probabilidade?",
      options: [
        { id: "a", label: "Um mapa de como a probabilidade se espalha entre resultados possíveis." },
        { id: "b", label: "Uma lista dos resultados que já aconteceram, sem pesos." },
        { id: "c", label: "Uma técnica para eliminar eventos raros." },
      ],
      correctOptionId: "a",
      feedback:
        "Distribuição é justamente a organização das possibilidades com seus respectivos pesos probabilísticos.",
    },
    {
      id: "q4",
      prompt: "Para que um histograma é especialmente útil?",
      options: [
        { id: "a", label: "Visualizar concentração, dispersão e forma aproximada dos dados observados." },
        { id: "b", label: "Provar a distribuição exata do fenômeno sem incerteza." },
        { id: "c", label: "Substituir qualquer análise estatística posterior." },
      ],
      correctOptionId: "a",
      feedback:
        "O histograma resume a amostra visualmente, ajudando a enxergar padrões e anomalias, mas não é uma verdade absoluta sobre o processo gerador.",
    },
    {
      id: "q5",
      prompt: "O valor esperado é melhor interpretado como:",
      options: [
        { id: "a", label: "O resultado garantido da próxima rodada." },
        { id: "b", label: "A média ponderada de longo prazo dos resultados possíveis." },
        { id: "c", label: "A probabilidade do cenário mais comum." },
      ],
      correctOptionId: "b",
      feedback:
        "Valor esperado descreve média de longo prazo, não promessa para uma única tentativa.",
    },
    {
      id: "q6",
      prompt: "Qual ideia resume melhor a intuição bayesiana?",
      options: [
        { id: "a", label: "Ignorar crenças anteriores e olhar apenas o dado novo." },
        { id: "b", label: "Atualizar crenças antigas à luz da nova evidência." },
        { id: "c", label: "Assumir que toda evidência tem o mesmo peso em qualquer contexto." },
      ],
      correctOptionId: "b",
      feedback:
        "Bayes combina o que já se sabia antes com o quanto a evidência observada favorece cada hipótese.",
    },
    {
      id: "q7",
      prompt: "Por que um classificador probabilístico costuma ser mais útil do que um classificador que só devolve rótulo rígido?",
      options: [
        { id: "a", label: "Porque a distribuição de confiança permite calibrar risco, limiares e revisão humana." },
        { id: "b", label: "Porque probabilidades sempre garantem maior acurácia." },
        { id: "c", label: "Porque probabilidades dispensam avaliação do modelo." },
      ],
      correctOptionId: "a",
      feedback:
        "Probabilidades oferecem muito mais informação para decisão do que um rótulo seco. Elas ajudam a comparar cenários e agir conforme o custo do erro.",
    },
    {
      id: "q8",
      prompt: "Qual é um erro comum ao raciocinar com probabilidade?",
      options: [
        { id: "a", label: "Confundir uma frequência observada em poucos dados com certeza definitiva." },
        { id: "b", label: "Usar média ponderada quando há ganhos e perdas diferentes." },
        { id: "c", label: "Representar classes por uma distribuição de confiança." },
      ],
      correctOptionId: "a",
      feedback:
        "Amostras pequenas oscilam. Tomá-las como verdade final pode levar a decisões apressadas e modelos superconfiantes.",
    },
  ],
  glossary: [
    {
      term: "Incerteza",
      definition:
        "Condição em que não sabemos com total segurança qual hipótese é verdadeira ou qual resultado ocorrerá.",
    },
    {
      term: "Probabilidade",
      definition:
        "Medida quantitativa do quão plausível é um evento ou hipótese dentro de um modelo.",
    },
    {
      term: "Frequência relativa",
      definition:
        "Proporção observada de vezes que um resultado apareceu em uma amostra ou experimento repetido.",
    },
    {
      term: "Distribuição de probabilidade",
      definition:
        "Regra que descreve como a massa de probabilidade se reparte entre resultados possíveis.",
    },
    {
      term: "Histograma",
      definition:
        "Gráfico que agrupa observações em faixas e mostra quantas caem em cada intervalo.",
    },
    {
      term: "Variável aleatória",
      definition:
        "Função que associa valores numéricos a resultados de um experimento aleatório.",
    },
    {
      term: "Valor esperado",
      definition:
        "Média ponderada dos resultados possíveis segundo suas probabilidades.",
    },
    {
      term: "Probabilidade condicional",
      definition:
        "Probabilidade de um evento quando já sabemos que outra informação é verdadeira.",
    },
    {
      term: "Regra de Bayes",
      definition:
        "Princípio que atualiza crenças combinando informação prévia com nova evidência.",
    },
    {
      term: "Calibração",
      definition:
        "Grau em que as probabilidades previstas por um modelo correspondem às frequências observadas no longo prazo.",
    },
    {
      term: "Log loss",
      definition:
        "Função de perda que penaliza previsões probabilísticas confiantes quando elas estão erradas.",
    },
  ],
};

