import type { LessonContent } from "../../../types/content";

export const metricasClassificacaoPrecisaoRecallF1RocContent: LessonContent = {
  id: "metricas-classificacao-precisao-recall-f1-roc",
  title: "Métricas de Classificação: Precisão, Recall, F1 e ROC",
  subtitle:
    "Avaliar um classificador é entender o tipo de erro que ele comete, o custo desses erros e como o limiar muda o jogo.",
  description:
    "Uma aula visual sobre matriz de confusão, precisão, recall, F1, threshold, curvas ROC, AUC e como escolher métricas de classificação sem cair na armadilha da acurácia isolada.",
  primaryCategoryId: "inteligencia-artificial",
  secondaryCategoryId: "matematica",
  level: "Intermediário",
  estimatedTime: "45-60 min",
  tags: [
    "Inteligência Artificial",
    "Classificação",
    "Precisão",
    "Recall",
    "F1",
    "ROC",
    "AUC",
    "Matriz de Confusão",
  ],
  learningObjectives: [
    "Entender por que acurácia isolada pode ser enganosa em problemas de classificação, especialmente quando há desbalanceamento.",
    "Ler e interpretar uma matriz de confusão como mapa dos acertos e erros do classificador.",
    "Calcular e interpretar precisão e recall em termos de falsos positivos e falsos negativos.",
    "Compreender como o limiar de decisão altera a relação entre precisão e recall.",
    "Explicar a F1 como média harmônica que penaliza desequilíbrios entre precisão e recall.",
    "Interpretar a curva ROC como visualização do comportamento do modelo ao longo de vários limiares.",
    "Entender o significado do AUC e saber quando ele é informativo ou quando outras curvas podem ser mais úteis.",
    "Escolher métricas com base no problema de negócio ou científico, e não apenas por conveniência.",
  ],
  prerequisites: [
    "Noção de classificação binária.",
    "Entender que modelos podem produzir probabilidades ou escores antes da decisão final.",
    "Conforto com frações simples e leitura de gráficos.",
  ],
  references: [
    {
      title: "Classification",
      source: "Google Machine Learning Crash Course",
      url: "https://developers.google.com/machine-learning/crash-course/classification",
      note:
        "Módulo oficial que conecta thresholds, métricas e interpretação de classificadores binários.",
    },
    {
      title: "Thresholds and the confusion matrix",
      source: "Google Machine Learning Crash Course",
      url: "https://developers.google.com/machine-learning/crash-course/classification/thresholding",
      note:
        "Explica como a escolha do limiar afeta a matriz de confusão e os tipos de erro.",
    },
    {
      title: "Classification: Accuracy, recall, precision, and related metrics",
      source: "Google Machine Learning Crash Course",
      url: "https://developers.google.com/machine-learning/crash-course/classification/accuracy-precision-recall",
      note:
        "Referência oficial sobre definições formais e trade-offs de precisão, recall e F1.",
    },
    {
      title: "Classification: ROC and AUC",
      source: "Google Machine Learning Crash Course",
      url: "https://developers.google.com/machine-learning/crash-course/classification/roc-and-auc",
      note:
        "Apresenta interpretação de ROC, AUC e escolha de thresholds.",
    },
    {
      title: "Metrics and scoring: quantifying the quality of predictions",
      source: "scikit-learn — Documentação oficial",
      url: "https://scikit-learn.org/stable/modules/model_evaluation.html",
      note:
        "Guia abrangente para métricas de classificação e regressão usadas em prática.",
    },
    {
      title: "roc_auc_score",
      source: "scikit-learn — Documentação oficial",
      url: "https://scikit-learn.org/stable/modules/generated/sklearn.metrics.roc_auc_score.html",
      note:
        "Documentação oficial do cálculo de ROC AUC e suas variações.",
    },
    {
      title: "Machine Learning Glossary: Metrics",
      source: "Google for Developers",
      url: "https://developers.google.com/machine-learning/glossary/metrics",
      note:
        "Glossário oficial com definições consistentes de métricas frequentemente confundidas.",
    },
  ],
  heroVisual: "metricas-hero",
  openingText:
    "Imagine um detector de câncer que acerta 99% dos casos. Soa excelente, até você descobrir que a doença é rara e que o modelo aprendeu a responder 'não' para quase todo mundo. De repente, 99% deixa de soar impressionante. Em classificação, avaliar bem é tão importante quanto modelar bem. O centro da questão não é apenas quantos acertos houve, mas quais erros aconteceram, em que direção o modelo erra e quanto custa cada falha. Precisão, recall, F1 e ROC existem porque a qualidade de um classificador não cabe numa única contagem bruta. Elas transformam erro em linguagem operacional.",
  quickFacts: [
    {
      title: "Acurácia pode enganar",
      body:
        "Quando uma classe é muito rara, acertar quase sempre a classe majoritária pode inflar a acurácia sem gerar utilidade real.",
    },
    {
      title: "Threshold muda o modelo operacional",
      body:
        "Mesmo classificador, com o mesmo ranking de probabilidades, pode ter comportamentos muito diferentes dependendo do limiar escolhido.",
    },
    {
      title: "Precisão e recall vivem em tensão",
      body:
        "Reduzir falsos positivos costuma exigir mais rigor, o que frequentemente aumenta falsos negativos.",
    },
    {
      title: "ROC resume todos os limiares",
      body:
        "A curva ROC mostra como o classificador se comporta ao variar o threshold, em vez de fixá-lo num único ponto.",
    },
  ],
  sections: [
    {
      id: "acuracia-nao-basta",
      eyebrow: "Motivação",
      title: "Por que 'percentual de acerto' não basta para julgar um classificador",
      lead:
        "Acurácia é intuitiva, mas frequentemente oculta exatamente o erro que mais importa.",
      visual: "acuracia-vs-realidade",
      paragraphs: [
        "Se 95% das transações são legítimas, um modelo que responde 'legítima' para tudo terá 95% de acurácia e utilidade quase nula para detecção de fraude. O problema não é a fórmula da acurácia; é a pergunta estreita que ela responde. Ela apenas mede a fração total de acertos.",
        "Em muitos problemas, os erros têm custos assimétricos. Em triagem médica, perder um caso positivo pode ser mais grave do que gerar alguns alarmes falsos. Em moderação automática, um falso positivo pode bloquear conteúdo inocente. Portanto, a mesma taxa de acerto pode corresponder a consequências totalmente diferentes.",
        "Para avaliar bem, precisamos decompor o erro. Em vez de perguntar só 'quanto acertou?', devemos perguntar 'o que acertou?', 'o que errou?', 'em que sentido errou?' e 'qual limiar foi usado para decidir?'.",
      ],
      blocks: [
        {
          type: "insight",
          title: "Métrica é escolha de prioridade",
          body:
            "Toda métrica enfatiza algum aspecto do comportamento do modelo. Não existe métrica universalmente melhor sem contexto.",
        },
        {
          type: "example",
          title: "Fraude rara",
          body:
            "Se fraudes são raras, prever sempre 'não fraude' pode gerar acurácia alta e recall desastroso para a classe importante.",
        },
        {
          type: "mistake",
          title: "Comparar modelos só por acurácia",
          body:
            "Isso pode premiar o modelo que ignora a classe minoritária, justamente onde o problema costuma ser mais sensível.",
        },
      ],
    },
    {
      id: "matriz-de-confusao",
      eyebrow: "Fundação",
      title: "A matriz de confusão: o mapa completo dos acertos e erros",
      lead:
        "Antes de calcular precisão ou recall, é preciso saber de onde esses números nascem.",
      visual: "matriz-de-confusao",
      interactive: "confusion-matrix-lab",
      paragraphs: [
        "A matriz de confusão organiza os resultados em quatro blocos: verdadeiros positivos, falsos positivos, verdadeiros negativos e falsos negativos. Ela nos obriga a olhar para o erro com resolução, e não como um número único compactado.",
        "Se o modelo marcou como positiva uma instância que realmente era positiva, temos um verdadeiro positivo. Se marcou positiva uma instância negativa, temos falso positivo. As outras duas células completam o quadro. A matriz é simples, mas contém quase toda a semântica da avaliação binária.",
        "Quase todas as métricas clássicas de classificação são frações construídas a partir dessas quatro contagens. Por isso, entender a matriz de confusão é mais importante do que decorar fórmulas separadas.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Matriz de confusão",
          body:
            "Tabela que cruza classe real e classe predita, permitindo decompor acertos e erros do classificador.",
        },
        {
          type: "insight",
          title: "A palavra 'confusão' é precisa",
          body:
            "O nome lembra que não erramos de forma abstrata; confundimos uma classe com outra em direções específicas.",
        },
        {
          type: "example",
          title: "Spam classificado como legítimo",
          body:
            "Esse caso é um falso negativo para a classe spam. Ele diminui recall, não precisão.",
        },
      ],
    },
    {
      id: "precisao-e-recall",
      eyebrow: "Métricas",
      title: "Precisão e recall: duas lentes para dois tipos de risco",
      lead:
        "Precisão responde 'quando o modelo diz sim, ele costuma ter razão?'. Recall responde 'dos casos realmente positivos, quantos ele encontra?'.",
      visual: "precisao-recall-balanca",
      paragraphs: [
        "Precisão é a fração dos positivos preditos que realmente eram positivos. Ela castiga falsos positivos. Se um classificador aciona muitos alarmes falsos, sua precisão cai. Isso importa quando um 'sim' errado custa caro, como bloqueio indevido ou acionamento operacional desnecessário.",
        "Recall é a fração dos positivos reais que o modelo conseguiu encontrar. Ele castiga falsos negativos. Quando deixar passar um caso positivo é grave, recall vira prioridade central. Triagens iniciais frequentemente preferem recall alto, aceitando mais revisão posterior.",
        "Nenhuma das duas métricas, sozinha, conta toda a história. Precisão alta pode conviver com recall muito baixo se o modelo só arrisca dizer 'positivo' em pouquíssimos casos. Recall alto pode coexistir com precisão ruim se o modelo dispara alarmes demais. O valor está em entender a tensão entre elas.",
      ],
      blocks: [
        {
          type: "formula",
          title: "Precisão e recall",
          body:
            "Precisão olha para o conjunto de positivos preditos; recall olha para o conjunto de positivos reais.",
          formula: "Precisão = TP / (TP + FP)   |   Recall = TP / (TP + FN)",
        },
        {
          type: "insight",
          title: "Perguntas diferentes, respostas diferentes",
          body:
            "Precisão mede confiança operacional do 'sim'. Recall mede cobertura do que realmente importava capturar.",
        },
        {
          type: "mistake",
          title: "Achar que recall alto implica precisão alta",
          body:
            "É possível capturar quase todos os positivos reais disparando muitos positivos falsos ao mesmo tempo.",
        },
      ],
    },
    {
      id: "threshold-e-troca",
      eyebrow: "Trade-off",
      title: "Threshold: o controle deslizante que muda precisão e recall",
      lead:
        "O mesmo modelo pode parecer conservador ou agressivo dependendo do corte que converte probabilidade em classe.",
      visual: "threshold-operacional",
      interactive: "threshold-tradeoff-lab",
      paragraphs: [
        "Se o limiar é baixo, o modelo rotula mais exemplos como positivos. Isso tende a aumentar recall, pois menos positivos reais escapam. Em compensação, mais negativos podem ser marcados incorretamente, reduzindo precisão. Se o limiar sobe, ocorre o oposto: o modelo vira mais seletivo.",
        "Esse mecanismo revela algo fundamental: precisão e recall não são propriedades totalmente fixas do modelo. Elas dependem também da política de decisão adotada sobre seus escores. Por isso comparar modelos exige especificar o limiar ou olhar curvas em vez de apenas um ponto.",
        "Em aplicações reais, escolher threshold é decisão de produto, risco ou política. O melhor ponto não está nas fórmulas; está no custo relativo dos tipos de erro.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Threshold",
          body:
            "Valor de corte aplicado a um escore ou probabilidade para decidir se uma instância será classificada como positiva.",
        },
        {
          type: "example",
          title: "Triagem médica",
          body:
            "Um limiar mais baixo pode encaminhar mais pacientes para exame complementar, aumentando recall e também o número de alarmes falsos.",
        },
        {
          type: "mistake",
          title: "Escolher 0,5 por inércia",
          body:
            "Esse valor é apenas um padrão frequente, não uma escolha universalmente ótima.",
        },
      ],
    },
    {
      id: "f1",
      eyebrow: "Síntese",
      title: "F1: quando queremos uma única métrica que puna desequilíbrios",
      lead:
        "A F1 combina precisão e recall, mas faz isso de um jeito exigente: pela média harmônica, não pela média simples.",
      visual: "f1-combinacao",
      paragraphs: [
        "A média harmônica é severa com discrepâncias. Se precisão for muito alta, mas recall muito baixo, a F1 não deixa o número parecer confortável. Isso a torna útil quando queremos premiar equilíbrio entre os dois lados.",
        "Ela é particularmente comum em problemas desbalanceados, nos quais a acurácia se torna pouco confiável. Ainda assim, a F1 não resolve tudo. Ela ignora verdadeiros negativos e não incorpora explicitamente o custo relativo entre falsos positivos e falsos negativos.",
        "Portanto, F1 é uma boa síntese em vários contextos, mas não deve ser idolatrada. Ela é um resumo útil, não uma substituta da análise da matriz de confusão e do trade-off operacional.",
      ],
      blocks: [
        {
          type: "formula",
          title: "F1",
          body:
            "Média harmônica entre precisão e recall, útil quando ambos importam e não queremos que um compense superficialmente o outro.",
          formula: "F1 = 2 · (Precisão · Recall) / (Precisão + Recall)",
        },
        {
          type: "insight",
          title: "F1 baixa quando há desequilíbrio",
          body:
            "Se uma das métricas cai muito, a F1 acompanha essa queda, em vez de mascará-la.",
        },
        {
          type: "mistake",
          title: "Usar F1 sem olhar o contexto do erro",
          body:
            "Dois modelos podem ter F1 parecida, mas com distribuições de falsos positivos e falsos negativos muito diferentes.",
        },
      ],
    },
    {
      id: "roc",
      eyebrow: "Curvas",
      title: "ROC: olhando o comportamento do classificador ao longo de todos os limiares",
      lead:
        "Em vez de congelar o threshold num ponto, a curva ROC acompanha como o modelo se move quando o corte varia.",
      visual: "roc-space",
      interactive: "roc-sketch-lab",
      paragraphs: [
        "A curva ROC plota taxa de verdadeiros positivos no eixo vertical e taxa de falsos positivos no eixo horizontal. Cada ponto da curva corresponde a um threshold diferente. Ao mover o corte, mudamos o equilíbrio entre sensibilidade e falsos alarmes.",
        "Um classificador aleatório tende a ficar próximo da diagonal. Um classificador melhor empurra a curva para o canto superior esquerdo, onde a taxa de positivos encontrados é alta enquanto a taxa de falsos positivos permanece baixa.",
        "AUC, a área sob a curva, resume esse comportamento num único número. Em linhas gerais, quanto maior a área, melhor a capacidade de ranking do modelo. Mas esse resumo ainda depende do contexto: em bases muito desbalanceadas, curvas precisão-recall podem ser mais informativas.",
      ],
      blocks: [
        {
          type: "definition",
          title: "ROC",
          body:
            "Curva que mostra a relação entre taxa de verdadeiros positivos e taxa de falsos positivos em vários limiares.",
        },
        {
          type: "definition",
          title: "AUC",
          body:
            "Área sob a curva ROC, usada como resumo da capacidade global de discriminação do modelo.",
        },
        {
          type: "insight",
          title: "ROC mede ranking, não decisão final",
          body:
            "Ela avalia como o modelo ordena positivos e negativos ao longo de todos os thresholds, não apenas o ponto operacional escolhido.",
        },
      ],
    },
    {
      id: "quando-usar-o-que",
      eyebrow: "Escolha",
      title: "Escolher métrica é escolher qual erro dói mais",
      lead:
        "A melhor métrica não está no paper mais bonito nem no dashboard mais comum, e sim no custo da falha no mundo real.",
      visual: "escolha-de-metricas",
      paragraphs: [
        "Se o custo de um falso negativo é enorme, recall merece protagonismo. Se falsos positivos são particularmente caros, precisão sobe de importância. Se você quer um resumo do ranking do modelo antes de fixar um limiar, ROC AUC pode ser útil. Se deseja equilíbrio entre precisão e recall, F1 pode ajudar.",
        "Em muitas equipes, o problema não é técnico, mas comunicacional. Métricas acabam virando troféus em vez de instrumentos. O time celebra um aumento de AUC sem perceber que o threshold usado no produto piorou recall no regime que realmente importava.",
        "Avaliar bem significa traduzir números em decisões. Métrica boa é a que preserva a estrutura do problema, e não a que produz o número mais bonito na apresentação.",
      ],
      blocks: [
        {
          type: "example",
          title: "Contextos diferentes, métricas diferentes",
          body:
            "No rastreio de doenças, recall costuma pesar mais. Em filtros de conteúdo sensível, precisão pode ser crítica para evitar bloqueios indevidos.",
        },
        {
          type: "insight",
          title: "Uma boa avaliação é multilente",
          body:
            "Na prática, quase sempre vale olhar mais de uma métrica: uma para cobertura, outra para confiança e outra para comportamento global.",
        },
        {
          type: "mistake",
          title: "Trocar análise por um número só",
          body:
            "Reduzir um classificador inteiro a uma única métrica é tentador, mas frequentemente empobrece demais a decisão.",
        },
      ],
    },
    {
      id: "sintese-operacional",
      eyebrow: "Síntese",
      title: "Mapa final: leia a matriz, pense no custo do erro e só então escolha a métrica",
      lead:
        "Avaliar classificação é um exercício de clareza conceitual e de responsabilidade operacional.",
      interactive: "summary-cards",
      paragraphs: [
        "Matriz de confusão, precisão, recall, F1 e ROC não competem entre si; elas iluminam o mesmo modelo por ângulos diferentes.",
        "Dominar essas métricas muda a forma como você enxerga classificadores: menos como caixas que acertam ou erram, e mais como sistemas que distribuem risco.",
      ],
    },
    {
      id: "quiz-revisao",
      eyebrow: "Revisão",
      title: "Quiz de revisão",
      lead:
        "Teste sua leitura sobre falsos positivos, falsos negativos, threshold, F1 e ROC.",
      interactive: "quiz",
      paragraphs: [
        "As perguntas abaixo foram pensadas para checar interpretação, não memorização cega de fórmulas.",
      ],
    },
    {
      id: "glossario-proximos-estudos",
      eyebrow: "Glossário",
      title: "Glossário e próximos estudos",
      lead:
        "Consolide o vocabulário central da avaliação de classificadores antes de avançar para calibração, PR curves e métricas multiclasses.",
      interactive: "glossary",
      paragraphs: [
        "Esses termos aparecem em praticamente qualquer pipeline sério de machine learning para classificação.",
      ],
    },
  ],
  summaryCards: [
    {
      title: "Acurácia não resolve tudo",
      body:
        "Ela pode parecer boa mesmo quando o modelo ignora a classe mais importante.",
    },
    {
      title: "A matriz de confusão é a base",
      body:
        "Precisão, recall e F1 são derivados de como acertos e erros se distribuem nas quatro células.",
    },
    {
      title: "Precisão mede confiança do positivo",
      body:
        "Quando o modelo diz 'sim', quão frequentemente ele está certo?",
    },
    {
      title: "Recall mede cobertura do positivo",
      body:
        "Dos positivos reais, quantos o modelo conseguiu capturar?",
    },
    {
      title: "Threshold troca um risco por outro",
      body:
        "Mudar o limiar altera o balanço entre falsos positivos e falsos negativos.",
    },
    {
      title: "ROC e AUC olham o ranking global",
      body:
        "Elas mostram o comportamento do classificador ao longo de vários limiares, não apenas num ponto fixo.",
    },
  ],
  quiz: [
    {
      id: "q1",
      prompt: "Por que acurácia pode ser enganosa em bases desbalanceadas?",
      options: [
        { id: "a", label: "Porque pode ficar alta mesmo que o modelo ignore a classe rara." },
        { id: "b", label: "Porque sempre vale zero em bases grandes." },
        { id: "c", label: "Porque não depende da matriz de confusão." },
      ],
      correctOptionId: "a",
      feedback:
        "Em problemas desbalanceados, acertar a classe majoritária quase sempre pode inflar a acurácia sem utilidade prática.",
    },
    {
      id: "q2",
      prompt: "Um falso positivo acontece quando:",
      options: [
        { id: "a", label: "O modelo prevê negativo e o caso era positivo." },
        { id: "b", label: "O modelo prevê positivo e o caso era negativo." },
        { id: "c", label: "O modelo prevê corretamente a classe positiva." },
      ],
      correctOptionId: "b",
      feedback:
        "Falso positivo é um alarme indevido: o modelo marcou positivo onde a realidade era negativa.",
    },
    {
      id: "q3",
      prompt: "Recall responde principalmente a qual pergunta?",
      options: [
        { id: "a", label: "Dos positivos reais, quantos foram encontrados?" },
        { id: "b", label: "Dos negativos reais, quantos foram encontrados?" },
        { id: "c", label: "Dos positivos preditos, quantos foram negativos?" },
      ],
      correctOptionId: "a",
      feedback:
        "Recall mede cobertura da classe positiva real. Ele cai quando há muitos falsos negativos.",
    },
    {
      id: "q4",
      prompt: "Se aumentamos bastante o threshold de classificação, a tendência geral é:",
      options: [
        { id: "a", label: "Aumentar recall e reduzir precisão." },
        { id: "b", label: "Reduzir recall e aumentar precisão." },
        { id: "c", label: "Não alterar nenhuma métrica." },
      ],
      correctOptionId: "b",
      feedback:
        "Um limiar alto torna o modelo mais seletivo: menos positivos preditos, normalmente menos falsos positivos e mais falsos negativos.",
    },
    {
      id: "q5",
      prompt: "Por que a F1 usa média harmônica em vez de média simples?",
      options: [
        { id: "a", label: "Porque ela penaliza mais o desequilíbrio entre precisão e recall." },
        { id: "b", label: "Porque ignora precisão." },
        { id: "c", label: "Porque considera apenas verdadeiros negativos." },
      ],
      correctOptionId: "a",
      feedback:
        "A média harmônica não permite que uma métrica muito alta esconda a outra muito baixa com facilidade.",
    },
    {
      id: "q6",
      prompt: "A curva ROC mostra:",
      options: [
        { id: "a", label: "Precisão versus recall para um único limiar." },
        { id: "b", label: "Taxa de verdadeiros positivos versus taxa de falsos positivos em vários limiares." },
        { id: "c", label: "Acurácia versus perda de treino ao longo das épocas." },
      ],
      correctOptionId: "b",
      feedback:
        "Cada ponto da curva ROC corresponde a um threshold diferente aplicado ao mesmo modelo.",
    },
    {
      id: "q7",
      prompt: "Um classificador aleatório tende a produzir uma ROC próxima de:",
      options: [
        { id: "a", label: "Uma diagonal sem grande vantagem sobre o acaso." },
        { id: "b", label: "O canto superior esquerdo perfeito." },
        { id: "c", label: "Uma curva com AUC necessariamente igual a 1." },
      ],
      correctOptionId: "a",
      feedback:
        "Sem poder de discriminação, o modelo se comporta como um ranking praticamente aleatório.",
    },
    {
      id: "q8",
      prompt: "Qual afirmação é a mais adequada ao escolher métricas?",
      options: [
        { id: "a", label: "A métrica deve refletir o custo relativo dos tipos de erro no problema." },
        { id: "b", label: "Acurácia é sempre suficiente se o conjunto for grande." },
        { id: "c", label: "Basta escolher a métrica mais comum em tutoriais." },
      ],
      correctOptionId: "a",
      feedback:
        "Métrica boa é a que preserva as prioridades reais da aplicação, e não a mais popular por hábito.",
    },
  ],
  glossary: [
    {
      term: "Acurácia",
      definition:
        "Proporção total de previsões corretas entre todos os exemplos avaliados.",
    },
    {
      term: "Matriz de confusão",
      definition:
        "Tabela que organiza verdadeiros positivos, falsos positivos, verdadeiros negativos e falsos negativos.",
    },
    {
      term: "Verdadeiro positivo (TP)",
      definition:
        "Caso em que o modelo prevê positivo e o exemplo realmente é positivo.",
    },
    {
      term: "Falso positivo (FP)",
      definition:
        "Caso em que o modelo prevê positivo, mas o exemplo real é negativo.",
    },
    {
      term: "Verdadeiro negativo (TN)",
      definition:
        "Caso em que o modelo prevê negativo e o exemplo realmente é negativo.",
    },
    {
      term: "Falso negativo (FN)",
      definition:
        "Caso em que o modelo prevê negativo, mas o exemplo real é positivo.",
    },
    {
      term: "Precisão",
      definition:
        "Fração dos positivos preditos que realmente pertencem à classe positiva.",
    },
    {
      term: "Recall",
      definition:
        "Fração dos positivos reais que o modelo conseguiu identificar.",
    },
    {
      term: "Threshold",
      definition:
        "Valor de corte usado para transformar probabilidade ou escore em classe positiva ou negativa.",
    },
    {
      term: "F1",
      definition:
        "Média harmônica entre precisão e recall, usada como síntese quando ambos importam.",
    },
    {
      term: "ROC",
      definition:
        "Curva que plota taxa de verdadeiros positivos contra taxa de falsos positivos ao variar o limiar.",
    },
    {
      term: "AUC",
      definition:
        "Área sob a curva ROC, usada como resumo da capacidade de discriminação do modelo.",
    },
  ],
};
