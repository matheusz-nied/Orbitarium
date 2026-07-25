import type { LessonContent } from "../../../types/content";

export const regressaoLinearELogisticaContent: LessonContent = {
  id: "regressao-linear-e-logistica",
  title: "Regressão Linear e Logística",
  subtitle:
    "Duas ideias simples, duas missões diferentes: estimar quantidades com uma reta e separar classes com probabilidades e fronteiras de decisão.",
  description:
    "Uma aula visual e interativa sobre ajuste linear, resíduos, função sigmoide, regressão logística, log-odds, fronteiras de decisão e como esses modelos servem de base para muito do aprendizado supervisionado.",
  primaryCategoryId: "inteligencia-artificial",
  secondaryCategoryId: "matematica",
  level: "Intermediário",
  estimatedTime: "45-60 min",
  tags: [
    "Inteligência Artificial",
    "Aprendizado Supervisionado",
    "Regressão Linear",
    "Regressão Logística",
    "Sigmoide",
    "Fronteira de Decisão",
    "Classificação",
  ],
  learningObjectives: [
    "Entender por que regressão linear e regressão logística partem de uma combinação linear, mas resolvem problemas diferentes.",
    "Interpretar coeficientes de um modelo linear como inclinações e deslocamentos que mudam a predição.",
    "Relacionar resíduos, erro quadrático e o objetivo de encontrar a melhor reta para um conjunto de dados.",
    "Explicar por que regressão linear não é adequada para prever probabilidades de classes binárias.",
    "Compreender a função sigmoide como transformação que comprime valores reais no intervalo entre 0 e 1.",
    "Interpretar a saída da regressão logística como probabilidade e entender o papel do limiar de decisão.",
    "Visualizar como fronteiras de decisão surgem em duas dimensões a partir de uma equação linear.",
    "Reconhecer limitações, hipóteses e usos práticos desses modelos em problemas reais.",
  ],
  prerequisites: [
    "Noção de plano cartesiano e interpretação básica de gráficos.",
    "Familiaridade com variáveis, somas e multiplicação por coeficientes.",
    "Entender a diferença entre prever um número e escolher uma classe.",
    "Curiosidade sobre como modelos simples tomam decisões.",
  ],
  references: [
    {
      title: "CS229 Lecture Notes",
      source: "Stanford University",
      url: "https://cs229.stanford.edu/main_notes.pdf",
      note:
        "Notas oficiais do curso de Machine Learning de Stanford, cobrindo regressão linear, regressão logística e generalização.",
    },
    {
      title: "Linear Regression",
      source: "Google Machine Learning Crash Course",
      url: "https://developers.google.com/machine-learning/crash-course/linear-regression",
      note:
        "Módulo introdutório oficial do Google sobre regressão linear, interpretação e treinamento.",
    },
    {
      title: "Linear regression: Loss",
      source: "Google Machine Learning Crash Course",
      url: "https://developers.google.com/machine-learning/crash-course/linear-regression/loss",
      note:
        "Explica perdas como MAE, MSE e RMSE, úteis para discutir ajuste e sensibilidade a outliers.",
    },
    {
      title: "Logistic Regression",
      source: "Google Machine Learning Crash Course",
      url: "https://developers.google.com/machine-learning/crash-course/logistic-regression",
      note:
        "Apresenta regressão logística como modelo probabilístico para classificação binária.",
    },
    {
      title: "Logistic regression: Calculating a probability with the sigmoid function",
      source: "Google Machine Learning Crash Course",
      url: "https://developers.google.com/machine-learning/crash-course/logistic-regression/sigmoid-function",
      note:
        "Mostra a relação entre parte linear, sigmoide e interpretação probabilística.",
    },
    {
      title: "Generalized Linear Models and Linear Models",
      source: "scikit-learn — Documentação oficial",
      url: "https://scikit-learn.org/stable/modules/linear_model.html",
      note:
        "Documentação consolidada sobre modelos lineares e logísticos usados na prática.",
    },
    {
      title: "An Introduction to Statistical Learning",
      source: "Gareth James, Daniela Witten, Trevor Hastie, Robert Tibshirani",
      url: "https://www.statlearning.com/",
      note:
        "Referência didática clássica para interpretação, modelagem linear e classificação.",
    },
  ],
  heroVisual: "regressao-hero",
  openingText:
    "Imagine duas perguntas muito comuns em IA aplicada. A primeira: 'qual será o consumo de energia amanhã?'. A segunda: 'este paciente deve ser encaminhado para exame adicional?'. Na primeira, queremos um número contínuo. Na segunda, queremos uma decisão binária, mas idealmente acompanhada de uma probabilidade. Regressão linear e regressão logística parecem parentes próximas porque ambas começam com uma soma ponderada de variáveis. A diferença profunda está no que fazemos com esse resultado. Uma transforma a soma em valor final. A outra dobra a soma numa curva em S para convertê-la em chance. Entender essa bifurcação é entender metade do vocabulário básico de aprendizado supervisionado.",
  quickFacts: [
    {
      title: "Mesmo motor, saída diferente",
      body:
        "Os dois modelos calculam uma combinação linear das entradas. A diferença está na interpretação da saída e na transformação final aplicada a ela.",
    },
    {
      title: "Linear prevê magnitudes",
      body:
        "Quando o alvo é contínuo, como preço, temperatura ou tempo, a regressão linear é uma primeira ferramenta muito natural.",
    },
    {
      title: "Logística prevê probabilidades",
      body:
        "A regressão logística transforma a soma linear em uma probabilidade entre 0 e 1, o que permite classificar usando um limiar.",
    },
    {
      title: "Fronteira é linear no espaço",
      body:
        "Em duas dimensões, a regressão logística separa classes com uma reta. Em mais dimensões, a fronteira continua sendo um hiperplano.",
    },
  ],
  sections: [
    {
      id: "duas-perguntas-dois-tipos-de-saida",
      eyebrow: "Motivação",
      title: "A primeira decisão importante: prever um número ou decidir uma classe?",
      lead:
        "Muitos erros de modelagem começam antes do treinamento: usar um modelo de regressão para um problema de classificação, ou vice-versa.",
      visual: "tipos-de-saida",
      paragraphs: [
        "Se você quer prever o valor de aluguel de um apartamento, faz sentido que a saída possa ser 1800, 2400 ou 5300. Esse é um alvo contínuo. Já se você quer prever se um e-mail é spam ou não, a resposta final pertence a um conjunto de classes. Mesmo quando usamos números 0 e 1, a natureza do problema é diferente.",
        "A regressão linear foi desenhada para relacionar entradas com um resultado contínuo. Ela aprende uma reta, ou um plano em dimensões maiores, que tenta capturar uma tendência média. Já a regressão logística usa essa mesma combinação linear como ponto de partida, mas a converte em probabilidade de pertencer à classe positiva.",
        "Essa distinção parece semântica, porém afeta tudo: a função de perda, a interpretação dos coeficientes, o comportamento em extremos e o tipo de erro que o modelo comete. Escolher o modelo certo é escolher a linguagem correta para o problema.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Alvo contínuo vs. alvo categórico",
          body:
            "Alvos contínuos assumem muitos valores possíveis ao longo de uma escala. Alvos categóricos representam classes, rótulos ou decisões discretas.",
        },
        {
          type: "example",
          title: "Dois cenários clássicos",
          body:
            "Preço de uma casa pede regressão. Aprovação ou reprovação em um processo pede classificação.",
          items: [
            "Consumo mensal de energia → número contínuo",
            "Fraude em uma transação → classe sim/não",
            "Tempo de viagem → número contínuo",
          ],
        },
        {
          type: "mistake",
          title: "Achar que '0 ou 1' transforma tudo em regressão comum",
          body:
            "Mesmo quando as classes são codificadas com números, o problema continua sendo de classificação. O significado estatístico da saída é outro.",
        },
      ],
    },
    {
      id: "reta-como-modelo",
      eyebrow: "Fundação",
      title: "Regressão linear: aprender uma reta é aprender uma regra de tendência",
      lead:
        "Na regressão linear, cada variável empurra a predição para cima ou para baixo por meio de um coeficiente.",
      visual: "reta-como-modelo",
      paragraphs: [
        "A forma mais conhecida da regressão linear é y = b + w1x1 + w2x2 + ... + wnxn. O termo b desloca a reta; os coeficientes w medem o quanto cada variável altera a saída. Se um coeficiente é positivo, aumentar aquela entrada tende a aumentar a predição. Se é negativo, a tendência é oposta.",
        "O que torna esse modelo tão importante não é apenas sua simplicidade, mas sua interpretabilidade. Em muitos contextos, queremos entender a direção do efeito, não só prever. Em cenários com relação aproximadamente linear, a regressão linear oferece uma combinação rara de desempenho razoável, rapidez e clareza conceitual.",
        "Claro que a palavra linear não significa 'simplório'. Em várias dimensões, o modelo ainda representa um hiperplano. O nome vem do fato de os parâmetros aparecerem linearmente na equação, e isso permite treinamento eficiente e análise cuidadosa.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Combinação linear",
          body:
            "Soma ponderada das entradas, acrescida de um termo de intercepto. É o núcleo tanto da regressão linear quanto da regressão logística.",
        },
        {
          type: "insight",
          title: "Coeficiente não é importância absoluta",
          body:
            "O tamanho de um coeficiente depende da escala da variável. Comparar pesos sem normalizar as entradas pode levar a conclusões enganosas.",
        },
        {
          type: "example",
          title: "Horas de estudo e nota prevista",
          body:
            "Se um modelo aprende nota = 3 + 1,2 × horas, ele está dizendo que cada hora adicional eleva a nota prevista em cerca de 1,2 ponto, dentro do regime em que a relação continua válida.",
        },
      ],
    },
    {
      id: "ajuste-e-residuos",
      eyebrow: "Ajuste",
      title: "Como sabemos se a reta está boa? Pelos resíduos que ela deixa",
      lead:
        "Treinar regressão linear é procurar a reta que erra menos, mas o erro precisa ser medido de forma consistente.",
      visual: "residuos-e-ajuste",
      interactive: "linear-fit-lab",
      paragraphs: [
        "Cada ponto do conjunto de dados tem um valor real e uma predição do modelo. A diferença entre os dois é o resíduo. Se o modelo previu 70 e o valor real era 76, o resíduo é 6 em magnitude. O treinamento busca parâmetros que tornem esses resíduos pequenos no conjunto todo.",
        "Uma escolha clássica é o erro quadrático médio. Ao elevar os resíduos ao quadrado, evitamos cancelamento entre erros positivos e negativos e ainda punimos mais fortemente erros grandes. Isso faz a reta 'sentir' bastante a presença de pontos muito distantes.",
        "Esse detalhe é pedagogicamente importante: regressão linear não procura passar por todos os pontos, e sim equilibrar o conjunto. Em dados ruidosos, a melhor reta não é a mais bonita, mas a que reduz o erro agregado.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Resíduo",
          body:
            "Diferença entre o valor observado e o valor previsto pelo modelo para um exemplo específico.",
        },
        {
          type: "formula",
          title: "Erro quadrático médio",
          body:
            "Mede a média dos quadrados dos resíduos e aumenta bastante quando existem grandes desvios.",
          formula: "MSE = (1/n) · Σ (y_i - ŷ_i)^2",
        },
        {
          type: "mistake",
          title: "Confundir bom ajuste com passar por todos os pontos",
          body:
            "Em dados reais, quase sempre existe ruído. Obrigar a reta a perseguir cada ponto individual seria uma receita para instabilidade.",
        },
      ],
    },
    {
      id: "quando-linear-falha-para-classes",
      eyebrow: "Limite",
      title: "Por que regressão linear é uma má ideia para probabilidades binárias",
      lead:
        "Se queremos uma chance entre 0 e 1, uma reta pura tem um problema óbvio: ela pode prever menos que 0 ou mais que 1.",
      visual: "linear-vs-probabilidade",
      paragraphs: [
        "Suponha um problema de aprovação em que y vale 0 para 'não aprovado' e 1 para 'aprovado'. Em teoria, poderíamos ajustar uma reta aos rótulos e depois usar um corte. O problema é que nada impede a reta de devolver 1,3 ou -0,2. Isso até pode produzir uma decisão, mas produz uma probabilidade sem sentido.",
        "Além disso, a relação entre uma combinação linear e a chance de um evento geralmente não cresce de modo indefinido. Quando a evidência já é muito forte, a probabilidade se aproxima de 1 e satura. O mesmo vale para baixo: ela se aproxima de 0. A geometria correta é mais parecida com uma curva em S do que com uma reta infinita.",
        "É aí que a regressão logística entra. Ela preserva a parte linear como escore interno, mas aplica uma transformação não linear que comprime o resultado para o intervalo probabilístico apropriado.",
      ],
      blocks: [
        {
          type: "insight",
          title: "O escore linear ainda é útil",
          body:
            "A regressão logística não joga fora a combinação linear. Ela a reinterpretará como log-odds antes de convertê-la em probabilidade.",
        },
        {
          type: "example",
          title: "Saída inválida",
          body:
            "Se um modelo linear prevê 1,18 para a chance de fraude, isso já mostra que a estrutura da saída está inadequada para o problema.",
        },
        {
          type: "mistake",
          title: "Achar que cortar a reta em 0 e 1 resolve o problema",
          body:
            "Truncar valores fora do intervalo mascara o erro conceitual. O modelo continua não representando corretamente a relação entre escore e probabilidade.",
        },
      ],
    },
    {
      id: "sigmoide-e-log-odds",
      eyebrow: "Transformação",
      title: "Regressão logística: a reta vai por dentro, a sigmoide aparece por fora",
      lead:
        "A regressão logística pega o escore linear z e o passa por uma função sigmoide, obtendo uma probabilidade suave entre 0 e 1.",
      visual: "sigmoide-curva",
      interactive: "sigmoid-explorer",
      paragraphs: [
        "A sigmoide é dada por 1 / (1 + e^-z). Quando z é muito negativo, a saída fica perto de 0. Quando z é muito positivo, fica perto de 1. Perto de z = 0, a curva cresce mais rapidamente e cruza 0,5. Isso cria uma transição suave entre classes, algo muito mais compatível com incerteza do que um salto brusco.",
        "O valor z continua sendo uma combinação linear das entradas. A diferença é interpretativa: z representa o logaritmo da razão entre a chance do evento acontecer e a chance de não acontecer. Por isso dizemos que a regressão logística modela log-odds de forma linear.",
        "Esse detalhe explica por que os coeficientes ainda importam. Se um coeficiente aumenta, ele empurra z para cima e, com isso, aumenta a probabilidade prevista da classe positiva. O efeito na probabilidade final, porém, não é constante em toda a curva; ele depende do ponto em que estamos.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Sigmoide",
          body:
            "Função em S que transforma qualquer número real em um valor entre 0 e 1, permitindo interpretar a saída como probabilidade.",
        },
        {
          type: "formula",
          title: "Hipótese logística",
          body:
            "A combinação linear das entradas é transformada numa probabilidade por meio da sigmoide.",
          formula: "p(y=1|x) = 1 / (1 + e^-(b + w·x))",
        },
        {
          type: "insight",
          title: "A inclinação probabilística não é constante",
          body:
            "No centro da sigmoide, pequenas mudanças em z alteram bastante a probabilidade. Nas extremidades, mudanças iguais quase não alteram a saída.",
        },
      ],
    },
    {
      id: "fronteira-decisao",
      eyebrow: "Geometria",
      title: "De probabilidade para decisão: nasce a fronteira de decisão",
      lead:
        "Classificar é transformar uma probabilidade em escolha, e isso exige um limiar. Em duas dimensões, esse limiar vira uma reta separando o plano.",
      visual: "fronteira-decisao",
      interactive: "decision-boundary-lab",
      paragraphs: [
        "Se adotamos 0,5 como limiar, classificamos como positiva toda região do espaço em que a probabilidade prevista supera esse valor. Como a sigmoide cruza 0,5 exatamente em z = 0, a fronteira de decisão é dada pela equação b + w1x1 + w2x2 = 0.",
        "Isso é uma ideia poderosa: apesar de usar uma transformação não linear na saída, a regressão logística produz uma fronteira linear no espaço das variáveis originais. Em duas dimensões, é uma reta. Em três, um plano. Em mais dimensões, um hiperplano.",
        "Essa geometria ajuda a perceber onde o modelo funciona bem e onde não funciona. Se as classes realmente podem ser separadas aproximadamente por uma divisão linear, a regressão logística é elegante e eficiente. Se a forma necessária é muito tortuosa, talvez precisemos de interações, bases não lineares ou outros modelos.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Fronteira de decisão",
          body:
            "Superfície que separa as regiões do espaço de entrada atribuídas a classes diferentes pelo modelo.",
        },
        {
          type: "example",
          title: "Dois atributos, uma reta",
          body:
            "Num problema de admissão simplificado com nota e horas de estudo, a fronteira pode ser uma reta que divide a área de maior chance de aprovação da área de menor chance.",
        },
        {
          type: "mistake",
          title: "Achar que 0,5 é sempre o limiar ideal",
          body:
            "O melhor corte depende do custo de falsos positivos e falsos negativos. Em muitos sistemas reais, o limiar operacional não é 0,5.",
        },
      ],
    },
    {
      id: "comparando-os-dois-modelos",
      eyebrow: "Comparação",
      title: "Mesmo parecidos por fora, os dois modelos contam histórias diferentes",
      lead:
        "A semelhança algébrica inicial pode esconder diferenças práticas enormes na interpretação e no uso.",
      visual: "comparacao-modelos",
      paragraphs: [
        "Na regressão linear, a saída é uma estimativa direta da magnitude do alvo. O erro costuma ser avaliado com perdas como MSE, RMSE ou MAE. Na regressão logística, a saída é uma probabilidade e o treino normalmente envolve maximizar verossimilhança, o que leva à perda logística.",
        "Os coeficientes também são lidos de forma diferente. No modelo linear, eles medem mudança direta na saída esperada. No modelo logístico, eles medem mudança no log-odds. Isso significa que o impacto em probabilidade depende do contexto e não é uniforme em toda a faixa.",
        "A escolha, portanto, não é estética. É estrutural. Quando a pergunta certa é 'quanto?', pense em regressão. Quando a pergunta certa é 'quão provável?' ou 'qual classe?', pense em logística.",
      ],
      blocks: [
        {
          type: "insight",
          title: "Probabilidade antes de classe",
          body:
            "Classificação boa quase sempre nasce de uma boa pontuação probabilística. A classe final é apenas a etapa operacional depois disso.",
        },
        {
          type: "example",
          title: "Dois médicos, dois limiares",
          body:
            "O mesmo modelo logístico pode servir a contextos diferentes: um ambulatório pode usar um limiar mais sensível; um exame caro pode exigir limiar mais conservador.",
        },
        {
          type: "mistake",
          title: "Comparar métricas de regressão com métricas de classificação",
          body:
            "RMSE e precisão respondem a perguntas distintas. Trocar uma pela outra costuma produzir avaliações confusas.",
        },
      ],
    },
    {
      id: "regularizacao-e-cuidados",
      eyebrow: "Prática",
      title: "Modelos simples continuam exigindo cuidado: escala, extrapolação e regularização",
      lead:
        "A simplicidade matemática não elimina riscos de uso inadequado. Ela só torna os riscos mais visíveis.",
      visual: "cuidados-praticos",
      paragraphs: [
        "Em ambos os modelos, a escala das variáveis influencia a leitura dos coeficientes e pode afetar o treinamento. Comparar peso de idade com peso de renda sem considerar unidades quase sempre é enganoso. Padronização ajuda não só no ajuste, mas também na interpretação relativa.",
        "Outro cuidado é a extrapolação. Uma reta ajustada em uma faixa de dados não tem compromisso com regiões que nunca viu. Um modelo treinado para temperaturas de uma cidade ao longo de meses amenos pode prever absurdos ao ser forçado a extrapolar para condições completamente diferentes.",
        "Regularização entra justamente para frear soluções exageradas. Penalizando coeficientes muito grandes, ela ajuda a conter sobreajuste e torna o modelo mais estável. Em regressão logística, isso também ajuda a lidar com separação quase perfeita, cenário em que os pesos podem crescer demais.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Regularização",
          body:
            "Técnica que adiciona uma penalização ao tamanho dos coeficientes para favorecer soluções mais estáveis e menos propensas a sobreajuste.",
        },
        {
          type: "insight",
          title: "Simplicidade não é licença para descuido",
          body:
            "Justamente por serem modelos básicos, regressão linear e logística são frequentemente usadas rápido demais, sem análise de dados, sem validação e sem checagem de hipótese.",
        },
        {
          type: "mistake",
          title: "Interpretar coeficiente fora do domínio observado",
          body:
            "O significado aprendido pelo modelo depende da distribuição dos dados de treino. Fora dela, a interpretação perde segurança.",
        },
      ],
    },
    {
      id: "sintese-operacional",
      eyebrow: "Síntese",
      title: "Mapa mental final: o que guardar antes de seguir para modelos mais complexos",
      lead:
        "Quase toda arquitetura mais sofisticada reaproveita ideias daqui: combinação linear, erro, probabilidade e fronteira de decisão.",
      interactive: "summary-cards",
      paragraphs: [
        "Se a base conceitual desta aula estiver firme, muitos modelos futuros deixam de parecer mágicos. Redes neurais usam combinações lineares e funções não lineares em camadas. Classificadores lineares máximos, SVMs e até algumas etapas de deep learning conversam com as mesmas noções de escore, separação e ajuste.",
        "Por isso vale fixar menos as fórmulas isoladas e mais a lógica: reta para tendência contínua, sigmoide para probabilidade, limiar para decisão e regularização para disciplina do modelo.",
      ],
    },
    {
      id: "quiz-revisao",
      eyebrow: "Revisão",
      title: "Quiz de revisão",
      lead:
        "Teste se as ideias centrais se conectaram: saída contínua, resíduos, sigmoide, probabilidade e fronteira de decisão.",
      interactive: "quiz",
      paragraphs: [
        "O objetivo do quiz não é decorar símbolos, mas verificar se você consegue reconhecer qual modelo conversa melhor com cada tipo de problema e por quê.",
      ],
    },
    {
      id: "glossario-proximos-estudos",
      eyebrow: "Glossário",
      title: "Glossário e próximos estudos",
      lead:
        "Consolidar o vocabulário correto ajuda muito a avançar para métricas, árvores, SVMs e redes neurais.",
      interactive: "glossary",
      paragraphs: [
        "Revisite estes termos sempre que encontrar novos modelos. Eles reaparecem em quase toda trilha de aprendizado supervisionado.",
      ],
    },
  ],
  summaryCards: [
    {
      title: "Regressão linear estima quantidades",
      body:
        "Ela aprende uma tendência contínua e devolve diretamente um valor numérico previsto.",
    },
    {
      title: "Resíduos contam a história do ajuste",
      body:
        "Treinar é reduzir a discrepância entre valores observados e previstos no conjunto de dados.",
    },
    {
      title: "Reta não serve bem como probabilidade",
      body:
        "Saídas abaixo de 0 ou acima de 1 mostram por que classificação precisa de outra estrutura.",
    },
    {
      title: "A sigmoide comprime o escore",
      body:
        "Ela transforma qualquer valor real em uma chance entre 0 e 1, permitindo interpretação probabilística.",
    },
    {
      title: "Logística produz fronteira linear",
      body:
        "Com limiar fixado, a classe muda ao atravessar um hiperplano no espaço das entradas.",
    },
    {
      title: "Regularização estabiliza",
      body:
        "Penalizar coeficientes grandes ajuda a conter sobreajuste e melhora robustez.",
    },
  ],
  quiz: [
    {
      id: "q1",
      prompt: "Qual problema combina melhor com regressão linear?",
      options: [
        { id: "a", label: "Prever a temperatura máxima de amanhã." },
        { id: "b", label: "Decidir se um e-mail é spam ou não." },
        { id: "c", label: "Escolher entre as classes gato, cachorro ou peixe." },
      ],
      correctOptionId: "a",
      feedback:
        "Temperatura é um alvo contínuo. Regressão linear é adequada quando a pergunta central é 'quanto vale?'.",
    },
    {
      id: "q2",
      prompt: "O que é um resíduo em regressão linear?",
      options: [
        { id: "a", label: "A diferença entre valor observado e valor previsto." },
        { id: "b", label: "O coeficiente mais importante do modelo." },
        { id: "c", label: "A probabilidade de erro da regressão." },
      ],
      correctOptionId: "a",
      feedback:
        "Resíduo é o erro de um exemplo específico: quanto a predição se afasta do valor observado.",
    },
    {
      id: "q3",
      prompt: "Por que regressão linear é problemática para prever probabilidades?",
      options: [
        { id: "a", label: "Porque uma reta pode produzir valores menores que 0 ou maiores que 1." },
        { id: "b", label: "Porque não usa coeficientes." },
        { id: "c", label: "Porque não pode ter intercepto." },
      ],
      correctOptionId: "a",
      feedback:
        "Probabilidades precisam ficar entre 0 e 1. A saída linear pura não respeita esse limite estruturalmente.",
    },
    {
      id: "q4",
      prompt: "Na regressão logística, a função sigmoide serve para:",
      options: [
        { id: "a", label: "Ordenar as variáveis por importância." },
        { id: "b", label: "Transformar o escore linear em probabilidade." },
        { id: "c", label: "Eliminar a necessidade de um limiar." },
      ],
      correctOptionId: "b",
      feedback:
        "A sigmoide comprime qualquer escore real para o intervalo entre 0 e 1, permitindo leitura probabilística.",
    },
    {
      id: "q5",
      prompt: "Se o limiar de classificação é 0,5, a fronteira de decisão da regressão logística ocorre quando:",
      options: [
        { id: "a", label: "A soma dos coeficientes é máxima." },
        { id: "b", label: "O erro quadrático médio é zero." },
        { id: "c", label: "O escore linear z é igual a 0." },
      ],
      correctOptionId: "c",
      feedback:
        "A sigmoide vale 0,5 quando z = 0. Por isso a fronteira para esse limiar é dada por b + w·x = 0.",
    },
    {
      id: "q6",
      prompt: "Qual afirmação sobre coeficientes está mais correta?",
      options: [
        { id: "a", label: "Coeficientes grandes sempre indicam variáveis mais importantes, independentemente da escala." },
        { id: "b", label: "A interpretação depende da escala das variáveis e do tipo de modelo." },
        { id: "c", label: "Na regressão logística, coeficientes não têm interpretação alguma." },
      ],
      correctOptionId: "b",
      feedback:
        "Escala importa, e o significado muda: na regressão linear o efeito é direto na saída; na logística, é no log-odds.",
    },
    {
      id: "q7",
      prompt: "O que a regularização busca fazer nesses modelos?",
      options: [
        { id: "a", label: "Punir coeficientes excessivamente grandes para favorecer soluções mais estáveis." },
        { id: "b", label: "Garantir que o erro de treino seja sempre zero." },
        { id: "c", label: "Transformar um modelo linear em não supervisionado." },
      ],
      correctOptionId: "a",
      feedback:
        "Regularização controla complexidade e reduz o risco de o modelo se adaptar demais ao ruído do conjunto de treino.",
    },
    {
      id: "q8",
      prompt: "Qual pergunta descreve melhor um uso típico de regressão logística?",
      options: [
        { id: "a", label: "Quanto vai faturar a loja no próximo trimestre?" },
        { id: "b", label: "Qual é a probabilidade de um cliente cancelar o serviço?" },
        { id: "c", label: "Qual será o nível exato do rio em centímetros?" },
      ],
      correctOptionId: "b",
      feedback:
        "Regressão logística é apropriada quando queremos modelar a chance de um evento binário e depois tomar uma decisão com base nela.",
    },
  ],
  glossary: [
    {
      term: "Regressão linear",
      definition:
        "Modelo supervisionado que estima um valor contínuo como combinação linear das variáveis de entrada.",
    },
    {
      term: "Regressão logística",
      definition:
        "Modelo de classificação binária que transforma uma combinação linear em probabilidade usando a função sigmoide.",
    },
    {
      term: "Intercepto",
      definition:
        "Termo constante do modelo, responsável por deslocar a reta ou o hiperplano mesmo quando as entradas valem zero.",
    },
    {
      term: "Coeficiente",
      definition:
        "Peso associado a uma variável de entrada, indicando como mudanças nessa variável afetam o escore do modelo.",
    },
    {
      term: "Resíduo",
      definition:
        "Diferença entre o valor observado e o valor previsto em um exemplo individual de regressão.",
    },
    {
      term: "MSE",
      definition:
        "Erro quadrático médio, métrica que calcula a média dos quadrados dos resíduos e penaliza fortemente erros grandes.",
    },
    {
      term: "Sigmoide",
      definition:
        "Função em S que mapeia números reais para o intervalo entre 0 e 1.",
    },
    {
      term: "Probabilidade prevista",
      definition:
        "Saída da regressão logística interpretada como chance estimada de pertencer à classe positiva.",
    },
    {
      term: "Fronteira de decisão",
      definition:
        "Superfície que separa regiões atribuídas a classes diferentes no espaço das entradas.",
    },
    {
      term: "Limiar",
      definition:
        "Valor usado para converter uma probabilidade prevista em decisão de classe.",
    },
    {
      term: "Log-odds",
      definition:
        "Logaritmo da razão entre a probabilidade do evento e a probabilidade do não evento; grandeza modelada linearmente pela regressão logística.",
    },
    {
      term: "Regularização",
      definition:
        "Estratégia que penaliza coeficientes muito grandes para reduzir sobreajuste e aumentar estabilidade.",
    },
  ],
};
