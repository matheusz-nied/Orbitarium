import type { LessonContent } from "../../../types/content";

export const funcoesDePerdaContent: LessonContent = {
  id: "funcoes-de-perda",
  title: "Funções de Perda: MSE, Cross-Entropy e Amigos",
  subtitle:
    "Toda rede aprende aquilo que sua perda manda levar a sério: distância numérica, confiança probabilística ou robustez a casos extremos.",
  description:
    "Uma aula sobre MSE, cross-entropy, paisagens de perda, probabilidades erradas com muita confiança e por que a escolha do objetivo altera o comportamento do modelo.",
  primaryCategoryId: "inteligencia-artificial",
  secondaryCategoryId: "matematica",
  level: "Intermediário",
  estimatedTime: "40-55 min",
  tags: [
    "Função de Perda",
    "MSE",
    "Cross-Entropy",
    "Classificação",
    "Regressão",
    "Gradientes",
    "Otimização",
  ],
  learningObjectives: [
    "Entender a função de perda como o objetivo matemático que define o que o modelo deve melhorar.",
    "Diferenciar perdas adequadas para regressão das adequadas para classificação probabilística.",
    "Visualizar por que cross-entropy pune fortemente erros confiantes em classificação.",
    "Comparar a sensibilidade de MSE e cross-entropy quando a probabilidade atribuída à classe correta varia.",
    "Interpretar paisagens de perda como superfícies que o otimizador tenta descer.",
    "Reconhecer cenários em que perdas alternativas, como MAE ou Huber, podem ser úteis.",
  ],
  prerequisites: [
    "Noção básica de probabilidade como grau de confiança.",
    "Familiaridade com saída de rede neural e função de ativação.",
    "Intuição de erro como distância entre previsão e alvo.",
  ],
  references: [
    {
      title: "Deep Learning — Chapter 6: Deep Feedforward Networks",
      source: "Goodfellow, Bengio e Courville — MIT Press",
      url: "https://www.deeplearningbook.org/contents/mlp.html",
      note:
        "Discussão conceitual sobre saídas, funções de custo e interpretações probabilísticas em redes profundas.",
    },
    {
      title: "Deep Learning — Chapter 8: Optimization for Training Deep Models",
      source: "Goodfellow, Bengio e Courville — MIT Press",
      url: "https://www.deeplearningbook.org/contents/optimization.html",
      note:
        "Ajuda a relacionar perda, superfície de otimização e comportamento de algoritmos de treino.",
    },
    {
      title: "CS231n — Linear Classification",
      source: "Stanford University",
      url: "https://cs231n.github.io/linear-classify/",
      note:
        "Explica a conexão entre logits, softmax e cross-entropy em classificação supervisionada.",
    },
    {
      title: "CS231n — Neural Networks Part 2",
      source: "Stanford University",
      url: "https://cs231n.github.io/neural-networks-2/",
      note:
        "Notas práticas sobre perdas em diferentes tipos de tarefa e implicações numéricas.",
    },
    {
      title: "Neural Networks and Deep Learning — Chapter 1",
      source: "Michael Nielsen",
      url: "http://neuralnetworksanddeeplearning.com/chap1.html",
      note:
        "Útil para conectar a noção intuitiva de erro ao aprendizado em redes neurais.",
    },
  ],
  heroVisual: "perdas-hero",
  openingText:
    "Quando uma rede neural erra, precisamos responder a uma pergunta mais sutil do que parece: 'o que exatamente significa errar?'. Prever 0,49 em vez de 0,51 é um problema tão grave quanto prever 0,001 para a classe correta com confiança máxima na classe errada? Em regressão, faz sentido punir igualmente todos os desvios ou tratar outliers com mais cuidado? A função de perda é a linguagem em que essas decisões são escritas. Ela não mede apenas desempenho: ela molda o tipo de comportamento que o modelo aprenderá a perseguir.",
  quickFacts: [
    {
      title: "Perda não é métrica final",
      body:
        "A perda orienta o treino; a métrica resume desempenho em um critério talvez mais humano ou de negócio.",
    },
    {
      title: "Cross-entropy pune confiança errada",
      body:
        "Errar com alta certeza costuma custar muito mais do que errar admitindo incerteza.",
    },
    {
      title: "MSE amplifica grandes desvios",
      body:
        "Ao elevar o erro ao quadrado, ela dá peso extra a erros grandes e outliers.",
    },
  ],
  sections: [
    {
      id: "objetivo-da-rede",
      eyebrow: "Fundamento",
      title: "A perda escolhe o que o modelo considera importante",
      lead:
        "Treinar uma rede não é pedir genericamente para ela 'acertar'; é pedir que reduza uma função específica que formaliza o tipo de erro que valorizamos.",
      visual: "objetivo-vs-metrica",
      paragraphs: [
        "Toda aprendizagem supervisionada precisa transformar uma comparação entre previsão e alvo em um número. Esse número precisa ser sensível a melhorias pequenas, distinguir erros mais graves de erros menos graves e ser compatível com o tipo de saída do modelo. A função de perda cumpre exatamente esse papel.",
        "A escolha da perda é uma decisão de modelagem, não uma formalidade. Se você usar um objetivo inadequado, a rede pode otimizar algo diferente do comportamento desejado. Em alguns casos isso leva a treinamento lento; em outros, leva a previsões mal calibradas, sensíveis demais a outliers ou incapazes de refletir incerteza de forma útil.",
        "Por isso vale repetir: o modelo aprende aquilo que a perda mede. Todo o resto — arquitetura, otimizador, regularização — opera em torno desse alvo.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Função de perda",
          body:
            "Função que converte a discrepância entre previsão e alvo em um número que o treinamento tenta minimizar.",
        },
        {
          type: "mistake",
          title: "Achar que perda é só um número para relatório",
          body:
            "A perda não serve só para monitorar o treino. Ela define o próprio problema de otimização que a rede resolve.",
        },
      ],
    },
    {
      id: "mse",
      eyebrow: "Regressão",
      title: "MSE: quando o erro é distância numérica",
      lead:
        "Mean Squared Error trata a previsão como um valor contínuo e pune o quadrado da diferença em relação ao alvo.",
      visual: "mse-regressao",
      paragraphs: [
        "Se estamos prevendo temperatura, preço, distância ou outra grandeza contínua, faz sentido perguntar 'quão longe numericamente fiquei do valor correto?'. MSE responde exatamente a isso: mede o erro quadrático médio entre previsões e alvos.",
        "O quadrado tem duas consequências importantes. Primeiro, transforma erros negativos e positivos em contribuições positivas, evitando cancelamento artificial. Segundo, aumenta o peso de desvios grandes. Errar por 4 dói muito mais do que errar por 2, não apenas o dobro. Isso torna a perda sensível a outliers.",
        "Esse comportamento é útil quando grandes desvios são de fato graves e devem receber muita atenção. Mas pode ser ruim quando o conjunto contém observações ruidosas extremas, porque a rede passa a gastar energia demais tentando agradar poucos pontos atípicos.",
      ],
      blocks: [
        {
          type: "formula",
          title: "Erro quadrático médio",
          body: "A perda soma os quadrados dos desvios e faz a média sobre os exemplos.",
          formula: "MSE = (1/n) \sum_i (y_i - \hat{y}_i)^2",
        },
        {
          type: "insight",
          title: "Quadrado é decisão semântica",
          body:
            "Ele não é apenas um truque algébrico. Ele embute a escolha de punir desvios grandes com força desproporcionalmente maior.",
        },
      ],
    },
    {
      id: "cross-entropy",
      eyebrow: "Classificação",
      title: "Cross-entropy: quando o erro é confiança mal colocada",
      lead:
        "Em classificação, não basta prever um rótulo: queremos uma distribuição de confiança coerente. Cross-entropy mede quão incompatível essa distribuição está com o alvo.",
      visual: "cross-entropy-classificacao",
      interactive: "mse-vs-cross-entropy-probabilidades",
      paragraphs: [
        "Se a tarefa é decidir entre classes, a saída da rede costuma ser interpretada como probabilidade ou confiança relativa. Nesse cenário, o erro relevante não é apenas a diferença numérica crua entre um score e o alvo, mas o quanto a probabilidade atribuída à resposta correta foi pequena — sobretudo quando o modelo estava muito confiante na direção errada.",
        "Cross-entropy cresce rapidamente quando a probabilidade da classe correta se aproxima de zero. Isso faz sentido: dizer 'tenho quase certeza de que a classe correta não é esta' é um erro muito mais problemático do que dizer 'estou em dúvida entre duas alternativas'. A perda codifica essa intuição diretamente.",
        "Essa característica torna cross-entropy uma parceira natural da softmax em classificação multiclasse e da sigmoid em classificação binária. O objetivo incentiva o modelo a concentrar probabilidade na resposta correta sem ignorar a estrutura probabilística do problema.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Cross-entropy",
          body:
            "Perda que mede o desajuste entre a distribuição prevista pelo modelo e a distribuição alvo, penalizando fortemente baixa probabilidade para a classe correta.",
        },
        {
          type: "example",
          title: "Dois erros, gravidades diferentes",
          body:
            "Prever 0,49 para a classe correta é um erro moderado. Prever 0,001 para a classe correta é um erro muito mais sério, porque o modelo está praticamente excluindo a resposta certa.",
        },
      ],
    },
    {
      id: "paisagem-de-perda",
      eyebrow: "Geometria",
      title: "Paisagens de perda: o terreno que o otimizador tenta descer",
      lead:
        "A perda pode ser imaginada como uma superfície sobre os parâmetros. Treinar é procurar regiões mais baixas dessa superfície.",
      visual: "paisagem-de-perda",
      interactive: "classificacao-loss-landscape",
      paragraphs: [
        "Uma boa imagem mental é pensar nos pesos da rede como coordenadas em um terreno montanhoso e na perda como altitude. Alguns ajustes nos parâmetros fazem a altitude cair; outros a fazem subir. O objetivo do treinamento é encontrar trajetórias que desçam esse relevo sem ficar paralisadas cedo demais nem oscilar sem controle.",
        "Claro que redes reais vivem em espaços de dimensão gigantesca, muito além de uma montanha desenhável. Ainda assim, a metáfora da paisagem ajuda muito. Ela explica por que learning rate, inicialização e escolha de perda influenciam a facilidade de descer. Algumas superfícies são suaves; outras, afiadas, achatadas ou mal condicionadas.",
        "Quando você muda a função de perda, não muda apenas o valor numérico calculado no final. Muda também a geometria da superfície que o otimizador enxerga — e isso altera profundamente a dinâmica de treinamento.",
      ],
      blocks: [
        {
          type: "insight",
          title: "A perda também é geometria",
          body:
            "Escolher uma perda é escolher como o erro será curvado no espaço de parâmetros. Isso afeta a direção e a intensidade das atualizações.",
        },
        {
          type: "mistake",
          title: "Pensar na perda só como escala vertical",
          body:
            "Não é apenas 'um número maior ou menor'. A forma da superfície muda o comportamento do otimizador, inclusive sua estabilidade.",
        },
      ],
    },
    {
      id: "mse-vs-ce",
      eyebrow: "Comparação",
      title: "MSE e cross-entropy não ensinam a mesma lição para probabilidades",
      lead:
        "Quando a saída representa confiança de classe, duas perdas podem concordar sobre quem está melhor, mas discordar sobre o quão urgente é corrigir um erro.",
      visual: "comparacao-probabilidades",
      paragraphs: [
        "Em um problema binário, podemos comparar MSE e cross-entropy usando a probabilidade atribuída à classe correta. Ambas diminuem quando essa probabilidade cresce, mas não com a mesma sensibilidade. Cross-entropy se torna especialmente severa quando o modelo está muito confiante e muito errado.",
        "Essa diferença é pedagógica e prática. Em classificação, queremos que o modelo aprenda rápido quando estiver excluindo a resposta correta com confiança. Cross-entropy fornece justamente esse tipo de pressão. MSE, por outro lado, trata o desvio de maneira mais simétrica e costuma ser menos adequada para esse tipo de saída probabilística.",
        "Não significa que MSE seja 'ruim' universalmente; significa apenas que ela expressa outro objetivo. O casamento entre semântica da saída e semântica da perda é o ponto central.",
      ],
      blocks: [
        {
          type: "insight",
          title: "Mesma direção, urgência diferente",
          body:
            "Duas perdas podem ordenar previsões de modo parecido, mas gerar pressões de correção muito diferentes para o treinamento.",
        },
      ],
    },
    {
      id: "amigos-da-perda",
      eyebrow: "Extensões",
      title: "MAE, Huber e outros 'amigos': quando vale buscar robustez",
      lead:
        "Nem todo problema quer amplificar muito os grandes erros. Em cenários ruidosos, perdas mais robustas podem ser melhores parceiras.",
      visual: "robustez-outliers",
      interactive: "sensibilidade-a-outliers",
      paragraphs: [
        "MAE mede o erro absoluto em vez do quadrático. Isso reduz a obsessão por outliers, porque um erro muito grande não explode tanto quanto no MSE. A contrapartida é que a superfície de otimização muda e pode fornecer um comportamento de gradiente menos suave em alguns contextos.",
        "A perda de Huber tenta combinar o melhor dos dois mundos: perto de zero, comporta-se de forma quadrática, encorajando refinamento estável; longe de zero, cresce mais como erro absoluto, evitando que outliers dominem demais o processo. Por isso, é bastante útil em regressão robusta.",
        "Essas variações mostram um princípio mais amplo: escolher perda é escolher quais erros merecem mais atenção. A pergunta certa não é 'qual é a melhor perda?', mas 'qual perda induz o comportamento que minha tarefa realmente precisa?'.",
      ],
      blocks: [
        {
          type: "definition",
          title: "MAE",
          body:
            "Mean Absolute Error mede a média do valor absoluto dos desvios, punindo erros de forma linear e mais robusta a outliers do que o MSE.",
        },
        {
          type: "definition",
          title: "Huber",
          body:
            "Perda híbrida que é quadrática para erros pequenos e aproximadamente linear para erros grandes.",
        },
      ],
    },
    {
      id: "quiz",
      eyebrow: "Revisão",
      title: "Quiz de revisão",
      lead:
        "Teste se as diferenças entre perdas para regressão, classificação e robustez ficaram claras.",
      interactive: "quiz",
      paragraphs: [
        "O foco do quiz é verificar sua leitura do comportamento induzido por cada objetivo, não decorar fórmulas isoladas.",
      ],
    },
    {
      id: "glossario",
      eyebrow: "Fechamento",
      title: "Glossário de perdas",
      lead:
        "Dominar este vocabulário torna muito mais fácil entender resultados de treino, papers e logs de experimentos.",
      interactive: "glossary",
      paragraphs: [
        "Os termos abaixo aparecem constantemente em machine learning prático e em discussões de modelagem.",
      ],
    },
  ],
  summaryCards: [
    { title: "A perda define o alvo", body: "O modelo aprende a reduzir a função que você escolheu, não uma ideia abstrata de acerto." },
    { title: "MSE mede distância numérica", body: "Excelente em regressão, mas sensível a grandes desvios e outliers." },
    { title: "Cross-entropy mede confiança errada", body: "Ela pune fortemente baixa probabilidade para a classe correta." },
    { title: "A perda altera a paisagem", body: "Mudanças no objetivo mudam a geometria que o otimizador precisa descer." },
    { title: "Perdas robustas mudam prioridades", body: "MAE e Huber reduzem a dominância de outliers em muitos cenários." },
  ],
  quiz: [
    {
      id: "q1",
      prompt: "Qual frase melhor descreve a função de perda?",
      options: [
        { id: "a", label: "Ela define matematicamente o que conta como erro e o que o treino tentará reduzir." },
        { id: "b", label: "Ela é apenas uma métrica visual usada depois do treinamento." },
        { id: "c", label: "Ela substitui o conjunto de dados." },
      ],
      correctOptionId: "a",
      feedback:
        "A perda é o objetivo do treinamento. Ela não é só um relatório; é a função que o modelo realmente otimiza.",
    },
    {
      id: "q2",
      prompt: "Por que MSE é naturalmente associado a regressão?",
      options: [
        { id: "a", label: "Porque mede desvios numéricos contínuos entre previsão e alvo." },
        { id: "b", label: "Porque transforma logits em probabilidades normalizadas." },
        { id: "c", label: "Porque ignora completamente outliers." },
      ],
      correctOptionId: "a",
      feedback:
        "Em regressão, faz sentido medir a distância entre valores contínuos. MSE faz isso e ainda enfatiza erros grandes por usar quadrado.",
    },
    {
      id: "q3",
      prompt: "Qual comportamento da cross-entropy é especialmente útil em classificação?",
      options: [
        { id: "a", label: "Punir fortemente casos em que a classe correta recebe probabilidade muito baixa." },
        { id: "b", label: "Tratar todo erro de classificação com exatamente a mesma severidade." },
        { id: "c", label: "Eliminar a necessidade de softmax ou sigmoid." },
      ],
      correctOptionId: "a",
      feedback:
        "Cross-entropy expressa a intuição de que errar com muita confiança é pior do que errar reconhecendo incerteza.",
    },
    {
      id: "q4",
      prompt: "O que a metáfora da paisagem de perda quer enfatizar?",
      options: [
        { id: "a", label: "Que o otimizador navega uma superfície cuja forma depende da perda e dos parâmetros." },
        { id: "b", label: "Que a perda sempre pode ser desenhada fielmente em duas dimensões." },
        { id: "c", label: "Que redes profundas nunca têm regiões planas." },
      ],
      correctOptionId: "a",
      feedback:
        "A metáfora mostra que treinar é buscar regiões mais baixas em uma superfície abstrata, cuja geometria importa para a estabilidade e a velocidade do treino.",
    },
    {
      id: "q5",
      prompt: "Por que MSE e cross-entropy podem levar a comportamentos de treino diferentes em classificação?",
      options: [
        { id: "a", label: "Porque elas atribuem urgências diferentes à correção de probabilidades erradas." },
        { id: "b", label: "Porque ambas são exatamente a mesma função sob nomes diferentes." },
        { id: "c", label: "Porque MSE não depende de previsões do modelo." },
      ],
      correctOptionId: "a",
      feedback:
        "Embora ambas melhorem quando a probabilidade correta sobe, a cross-entropy pressiona muito mais casos de erro confiante.",
    },
    {
      id: "q6",
      prompt: "Qual efeito do quadrado no MSE merece atenção?",
      options: [
        { id: "a", label: "Ele dá peso extra a desvios grandes, aumentando a sensibilidade a outliers." },
        { id: "b", label: "Ele faz a perda ignorar erros pequenos e grandes igualmente." },
        { id: "c", label: "Ele converte automaticamente uma regressão em classificação." },
      ],
      correctOptionId: "a",
      feedback:
        "O quadrado amplifica erros grandes. Isso é ótimo em alguns cenários e problemático em outros, especialmente com pontos extremos ruidosos.",
    },
    {
      id: "q7",
      prompt: "Quando perdas como MAE ou Huber podem ser interessantes?",
      options: [
        { id: "a", label: "Quando queremos reduzir a influência excessiva de outliers na regressão." },
        { id: "b", label: "Quando precisamos normalizar probabilidades de várias classes." },
        { id: "c", label: "Quando queremos tornar qualquer rede automaticamente linear." },
      ],
      correctOptionId: "a",
      feedback:
        "Essas perdas reequilibram a atenção dada a grandes erros, o que pode ser valioso em conjuntos ruidosos ou com pontos muito extremos.",
    },
    {
      id: "q8",
      prompt: "Qual é a melhor forma de pensar sobre a escolha de perda?",
      options: [
        { id: "a", label: "Como uma decisão sobre qual comportamento do modelo será recompensado ou punido." },
        { id: "b", label: "Como um detalhe sem impacto real no treinamento." },
        { id: "c", label: "Como algo definido exclusivamente pela biblioteca usada." },
      ],
      correctOptionId: "a",
      feedback:
        "A perda é uma escolha de comportamento. Ela explicita quais tipos de erro devem importar mais para a aprendizagem.",
    },
  ],
  glossary: [
    { term: "Função de perda", definition: "Objetivo matemático minimizado pelo treinamento para aproximar previsões e alvos." },
    { term: "MSE", definition: "Erro quadrático médio, muito usado em regressão contínua." },
    { term: "Cross-entropy", definition: "Perda que compara distribuições e penaliza fortemente baixa probabilidade para a classe correta." },
    { term: "Regressão", definition: "Tarefa em que a saída desejada é um valor contínuo." },
    { term: "Classificação", definition: "Tarefa em que a saída desejada é um rótulo ou distribuição sobre classes." },
    { term: "Logit", definition: "Score bruto antes de uma transformação como sigmoid ou softmax." },
    { term: "Paisagem de perda", definition: "Superfície abstrata que relaciona configurações de parâmetros aos valores da perda." },
    { term: "Outlier", definition: "Observação extrema que pode influenciar desproporcionalmente o ajuste do modelo." },
    { term: "MAE", definition: "Erro absoluto médio, mais robusto a outliers do que MSE em muitos cenários." },
    { term: "Huber", definition: "Perda híbrida entre comportamento quadrático e linear, útil em regressão robusta." },
    { term: "Calibração", definition: "Grau em que probabilidades previstas correspondem a frequências reais observadas." },
  ],
};
