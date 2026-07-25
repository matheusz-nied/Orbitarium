import type { LessonContent } from "../../../types/content";

export const viesVarianciaErroIrredutivelContent: LessonContent = {
  id: "vies-variancia-erro-irredutivel",
  title: "Viés, Variância e o Erro Irredutível",
  subtitle:
    "Por que um modelo pode errar por simplificar demais, por oscilar demais ou simplesmente porque parte do mundo é ruidosa.",
  description:
    "Uma aula avançada sobre decomposição conceitual do erro em viés, variância e ruído irredutível, com foco em generalização, complexidade do modelo, instabilidade entre amostras e estratégias práticas de diagnóstico.",
  primaryCategoryId: "inteligencia-artificial",
  secondaryCategoryId: "matematica",
  level: "Avançado",
  estimatedTime: "50-65 min",
  tags: [
    "Inteligência Artificial",
    "Generalização",
    "Viés",
    "Variância",
    "Overfitting",
    "Underfitting",
    "Erro Irredutível",
    "Complexidade de Modelo",
  ],
  learningObjectives: [
    "Entender a diferença entre erro de treino e erro de generalização.",
    "Definir viés como erro sistemático associado a hipóteses restritivas ou capacidade insuficiente.",
    "Definir variância como sensibilidade do modelo a flutuações no conjunto de treino.",
    "Compreender a existência do erro irredutível como ruído inerente ao processo gerador dos dados.",
    "Explicar intuitivamente a decomposição viés² + variância + ruído em contexto de erro quadrático médio.",
    "Visualizar como a complexidade do modelo move o equilíbrio entre underfitting e overfitting.",
    "Relacionar técnicas como regularização, mais dados e bagging ao controle de viés e variância.",
    "Diagnosticar sintomas de alto viés e alta variância em prática de modelagem.",
  ],
  prerequisites: [
    "Conhecimento básico de regressão ou classificação supervisionada.",
    "Entender a ideia de treino versus teste ou validação.",
    "Conforto com gráficos de curvas e interpretações qualitativas de erro.",
  ],
  references: [
    {
      title: "CS229 Lecture Notes",
      source: "Stanford University",
      url: "https://cs229.stanford.edu/main_notes.pdf",
      note:
        "Notas completas do curso, incluindo generalização e discussão formal do trade-off viés-variância.",
    },
    {
      title: "Bias-Variance",
      source: "Stanford CS229, Carlos Guestrin",
      url: "https://cs229.stanford.edu/notes2022fall/bias-variance.pdf",
      note:
        "Slides oficiais dedicados à decomposição do erro em viés, variância e ruído.",
    },
    {
      title: "Learning Theory",
      source: "Stanford Engineering Everywhere / CS229",
      url: "https://see.stanford.edu/materials/aimlcs229/cs229-notes4.pdf",
      note:
        "Notas clássicas de Andrew Ng que discutem viés, variância e diagnóstico de modelos.",
    },
    {
      title: "MS&E 226: Fundamentals of Data Science — Prediction",
      source: "Stanford University",
      url: "https://web.stanford.edu/class/msande226/2025/lectures/lecture7_prediction.pdf",
      note:
        "Material universitário recente com decomposição intuitiva e formal do erro médio quadrático.",
    },
    {
      title: "Single estimator versus bagging: bias-variance decomposition",
      source: "scikit-learn — Documentação oficial",
      url: "https://scikit-learn.org/stable/auto_examples/ensemble/plot_bias_variance.html",
      note:
        "Exemplo oficial mostrando como bagging reduz variância em relação a uma árvore individual.",
    },
    {
      title: "Ensembles: Gradient boosting, random forests, bagging, voting, stacking",
      source: "scikit-learn — Documentação oficial",
      url: "https://scikit-learn.org/stable/modules/ensemble",
      note:
        "Discute ensembles e seus efeitos sobre variância e viés de forma aplicada.",
    },
    {
      title: "An Introduction to Statistical Learning",
      source: "Gareth James, Daniela Witten, Trevor Hastie, Robert Tibshirani",
      url: "https://www.statlearning.com/",
      note:
        "Referência didática amplamente adotada para generalização, overfitting e seleção de complexidade.",
    },
  ],
  heroVisual: "vies-hero",
  openingText:
    "Todo modelo erra, mas nem todo erro tem a mesma origem. Às vezes o modelo erra porque é simplório demais para captar a estrutura real. Às vezes erra porque se apaixonou pelo acaso do conjunto de treino. E às vezes erra porque parte da realidade simplesmente é imprevisível com as variáveis disponíveis. A linguagem clássica para separar essas três fontes é viés, variância e erro irredutível. Essa decomposição não é apenas elegante; ela muda a forma como você diagnostica um sistema de IA. Em vez de perguntar genericamente 'por que está ruim?', você aprende a perguntar 'está simplificando demais?', 'está oscilando demais?' ou 'estamos exigindo do modelo algo que os dados não podem oferecer?'.",
  quickFacts: [
    {
      title: "Alto viés simplifica demais",
      body:
        "O modelo impõe uma forma rígida demais ao problema e erra sistematicamente mesmo com muito dado.",
    },
    {
      title: "Alta variância oscila demais",
      body:
        "O modelo se adapta fortemente à amostra disponível e mudaria bastante se treinado em outra amostra parecida.",
    },
    {
      title: "Nem todo erro é consertável",
      body:
        "Parte do erro vem de ruído intrínseco, medições imperfeitas ou fatores não observados.",
    },
    {
      title: "Complexidade é faca de dois gumes",
      body:
        "Aumentar capacidade pode reduzir viés, mas também elevar variância se não houver controle.",
    },
  ],
  sections: [
    {
      id: "erro-de-treino-vs-generalizacao",
      eyebrow: "Motivação",
      title: "Quando acertar o treino não significa entender o problema",
      lead:
        "Generalização é a habilidade de manter desempenho em dados novos, e não apenas reproduzir o conjunto já visto.",
      visual: "treino-vs-teste",
      paragraphs: [
        "Um modelo pode memorizar muito bem o conjunto de treino e ainda assim fracassar em novos exemplos. Essa é a diferença entre desempenho aparente e desempenho útil. Em machine learning, o teste real do modelo não é o passado observado, mas o futuro ainda não visto.",
        "Essa ideia é tão central que grande parte da prática moderna de IA pode ser lida como tentativa de proteger generalização: validação cruzada, regularização, early stopping, ensembles, separação de treino e teste. Tudo gira em torno do mesmo medo: confundir adaptação ao ruído com aprendizado de estrutura.",
        "Viés e variância são duas lentes clássicas para entender por que esse fracasso acontece. O modelo pode ser insuficiente para capturar o padrão verdadeiro ou pode ser sensível demais às particularidades da amostra.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Generalização",
          body:
            "Capacidade do modelo de manter bom desempenho em dados não usados no treinamento.",
        },
        {
          type: "insight",
          title: "Treino perfeito pode ser suspeito",
          body:
            "Quando o modelo erra muito pouco no treino, vale perguntar se ele aprendeu a estrutura ou apenas decorou detalhes acidentais.",
        },
        {
          type: "mistake",
          title: "Celebrar apenas a perda de treino",
          body:
            "Otimizar demais o que acontece no treino pode esconder degradação exatamente onde o modelo será usado de verdade.",
        },
      ],
    },
    {
      id: "tres-fontes-de-erro",
      eyebrow: "Decomposição",
      title: "Três fontes de erro: viés, variância e ruído irredutível",
      lead:
        "A decomposição clássica organiza o erro esperado em componentes que exigem remédios diferentes.",
      visual: "decomposicao-do-erro",
      paragraphs: [
        "Em um cenário clássico de regressão sob erro quadrático, o erro esperado pode ser pensado como soma de três partes: viés ao quadrado, variância e erro irredutível. O viés mede o quanto a média das previsões do modelo se afasta sistematicamente da função-alvo. A variância mede o quanto as previsões flutuam entre diferentes conjuntos de treino. O ruído irredutível representa a parte da realidade que não conseguimos prever com perfeição.",
        "Mesmo quando a formalização matemática exata depende de hipóteses específicas, a intuição conceitual é extremamente útil em muitos tipos de modelo. Ela ajuda a separar 'modelo simplista', 'modelo instável' e 'mundo ruidoso'.",
        "Essa separação é operacionalmente valiosa porque as correções diferem. Mais capacidade pode combater viés, mas piorar variância. Mais dados podem reduzir variância sem eliminar ruído. Melhor instrumentação pode reduzir ruído observado sem mudar a família do modelo.",
      ],
      blocks: [
        {
          type: "formula",
          title: "Decomposição conceitual do erro",
          body:
            "Em regressão com erro quadrático, o erro esperado pode ser lido como soma de ruído, viés ao quadrado e variância.",
          formula: "Erro esperado ≈ erro irredutível + viés^2 + variância",
        },
        {
          type: "definition",
          title: "Erro irredutível",
          body:
            "Parcela do erro causada por ruído inerente, fatores ausentes ou aleatoriedade que o modelo não consegue eliminar apenas aprendendo melhor.",
        },
        {
          type: "insight",
          title: "Diagnóstico antes de remédio",
          body:
            "A mesma performance ruim pode vir de causas opostas. Sem diagnóstico, é fácil aplicar a correção errada.",
        },
      ],
    },
    {
      id: "alto-vies",
      eyebrow: "Underfitting",
      title: "Alto viés: quando o modelo chega simples demais para a tarefa",
      lead:
        "Modelos de alto viés erram de forma sistemática porque a hipótese aprendida é rígida ou pobre demais.",
      visual: "alto-vies",
      paragraphs: [
        "Imagine ajustar uma reta a um fenômeno claramente curvo. Mesmo com milhares de exemplos, a reta continuará errando em padrões previsíveis. Isso é alto viés: a família de funções ou a regularização imposta são tão restritivas que o modelo não consegue representar a estrutura principal do dado.",
        "Sintomas típicos incluem erro de treino já relativamente alto e erro de validação não muito maior do que o de treino. Em outras palavras, o modelo nem consegue se sair muito bem no conjunto que viu. O problema não é oscilação; é incapacidade estrutural.",
        "Combater alto viés normalmente envolve ampliar a capacidade do modelo, enriquecer atributos, flexibilizar regularização ou escolher uma família mais expressiva. A chave é permitir que o modelo diga algo mais sofisticado sobre o dado.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Viés",
          body:
            "Erro sistemático associado a hipóteses simplificadoras demais ou capacidade insuficiente para representar o padrão verdadeiro.",
        },
        {
          type: "example",
          title: "Reta para curva",
          body:
            "Usar um modelo linear para um fenômeno altamente não linear costuma gerar erro persistente mesmo com mais treino.",
        },
        {
          type: "mistake",
          title: "Tentar resolver alto viés apenas com mais dados",
          body:
            "Se a família do modelo é inadequada, mais exemplos não corrigem uma rigidez estrutural profunda.",
        },
      ],
    },
    {
      id: "alta-variancia",
      eyebrow: "Overfitting",
      title: "Alta variância: quando o modelo escuta demais o acaso do treino",
      lead:
        "Modelos de alta variância parecem brilhantes em uma amostra e imprevisíveis na próxima.",
      visual: "alta-variancia",
      paragraphs: [
        "Considere um polinômio muito flexível ajustado a poucos pontos ruidosos. Ele pode passar perto de todos os exemplos de treino e ainda assim desenhar curvas absurdas entre eles. A mensagem é clara: o modelo aprendeu demais sobre esta amostra específica e pouco sobre a regularidade do fenômeno.",
        "O sintoma clássico é um erro de treino baixo acompanhado de erro de validação sensivelmente maior. O modelo 'domou' o treino, mas não produz previsões estáveis para novos exemplos. Nesse cenário, mudar alguns pontos do conjunto já pode alterar bastante a solução final.",
        "Para combater alta variância, estratégias comuns incluem regularização, simplificação do modelo, mais dados, bagging e melhor controle de ruído. Aqui a prioridade é tornar o aprendizado menos nervoso e menos dependente de idiossincrasias da amostra.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Variância",
          body:
            "Sensibilidade das previsões do modelo a mudanças no conjunto de treino.",
        },
        {
          type: "insight",
          title: "Treino excelente pode esconder fragilidade",
          body:
            "Alta variância produz sensação enganosa de domínio total no treino, exatamente porque o modelo absorve ruídos locais.",
        },
        {
          type: "mistake",
          title: "Responder alta variância com ainda mais complexidade",
          body:
            "Sem controle, mais flexibilidade pode aprofundar o problema em vez de resolvê-lo.",
        },
      ],
    },
    {
      id: "datasets-sinteticos",
      eyebrow: "Simulação",
      title: "Ver para entender: datasets sintéticos deixam viés e variância visíveis",
      lead:
        "Uma das melhores maneiras de internalizar o trade-off é comparar como famílias de modelos se comportam em dados controlados.",
      visual: "datasets-sinteticos",
      interactive: "synthetic-dataset-lab",
      paragraphs: [
        "Em dados sintéticos, podemos controlar a forma da função-alvo, o nível de ruído e a quantidade de exemplos. Isso permite observar um mesmo modelo subajustando uma curva complexa ou sobreajustando um conjunto pequeno e ruidoso.",
        "Quando enxergamos várias hipóteses sobre o mesmo padrão, a linguagem de viés e variância ganha corpo. O viés aparece como uma tendência média errada. A variância aparece como dispersão entre ajustes possíveis quando a amostra muda.",
        "Esse tipo de experimento mental é valioso porque impede leituras místicas. Em vez de pensar que o modelo 'ficou ruim do nada', passamos a rastrear se ele está travado pela simplicidade ou descontrolado pela sensibilidade.",
      ],
      blocks: [
        {
          type: "example",
          title: "Poucos pontos, muita flexibilidade",
          body:
            "Com amostras pequenas, modelos altamente flexíveis costumam variar bastante de uma realização para outra.",
        },
        {
          type: "insight",
          title: "Ruído muda a aula inteira",
          body:
            "Quanto maior o ruído dos dados, mais difícil fica separar erro do modelo e erro inerente ao processo.",
        },
        {
          type: "mistake",
          title: "Achar que viés e variância são apenas palavras para treino e teste",
          body:
            "Elas descrevem mecanismos de erro diferentes, não apenas tamanhos de curva em gráficos prontos.",
        },
      ],
    },
    {
      id: "complexidade-vs-componentes",
      eyebrow: "Trade-off",
      title: "Complexidade do modelo: a gangorra entre viés e variância",
      lead:
        "À medida que a capacidade cresce, o viés costuma cair, mas a variância pode subir se o ajuste ficar permissivo demais.",
      visual: "complexidade-e-erro",
      interactive: "complexity-error-lab",
      paragraphs: [
        "No retrato clássico, modelos muito simples têm alto viés e baixa variância. Modelos muito complexos têm baixo viés e alta variância. Entre esses extremos aparece uma região mais saudável, onde o erro total de generalização é menor.",
        "Essa curva não deve ser lida como receita mecânica, mas como bússola conceitual. Ela orienta perguntas como: vale liberar mais parâmetros? vale regularizar mais? vale coletar mais dados? vale trocar a família do modelo?",
        "O ponto essencial é que não estamos apenas diminuindo 'erro'. Estamos redistribuindo tipos de erro. Decidir bem significa saber qual tipo está dominando naquele momento.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Complexidade do modelo",
          body:
            "Capacidade da família de hipóteses de representar padrões variados e detalhados nos dados.",
        },
        {
          type: "insight",
          title: "Erro total é compromisso, não monotonia",
          body:
            "Melhorar um componente do erro pode piorar outro. O alvo é o equilíbrio útil de generalização.",
        },
        {
          type: "mistake",
          title: "Buscar capacidade máxima por padrão",
          body:
            "Capacidade sem restrição nem validação pode produzir modelos impressionantes apenas no conjunto de treino.",
        },
      ],
    },
    {
      id: "instabilidade-entre-amostras",
      eyebrow: "Reamostragem",
      title: "Treine de novo, veja de novo: variância é também um fenômeno entre amostras",
      lead:
        "Alta variância aparece quando repetimos o treinamento em amostras parecidas e obtemos previsões bastante diferentes.",
      visual: "reamostragem-instabilidade",
      interactive: "resampling-instability-lab",
      paragraphs: [
        "Uma forma intuitiva de enxergar variância é imaginar muitos laboratórios independentes coletando dados do mesmo fenômeno e treinando o mesmo algoritmo. Se as curvas aprendidas mudam muito de um laboratório para outro, temos alta variância.",
        "Essa visualização também ajuda a entender por que bagging funciona. Ao combinar modelos treinados em reamostragens diferentes, diminuímos a dispersão coletiva da predição. A média entre soluções instáveis pode ser muito mais estável do que cada uma isoladamente.",
        "Pensar dessa forma desloca a atenção do modelo único para a distribuição de modelos plausíveis. Isso é uma mudança conceitual profunda e extremamente útil.",
      ],
      blocks: [
        {
          type: "example",
          title: "Muitos laboratórios, um mesmo fenômeno",
          body:
            "Se cada amostra gera uma curva diferente, o procedimento de aprendizagem é sensível demais às flutuações do dado.",
        },
        {
          type: "insight",
          title: "Variância é propriedade do procedimento, não só da curva final",
          body:
            "O problema não está apenas numa previsão específica, mas em quão volátil é o processo de treino inteiro.",
        },
        {
          type: "mistake",
          title: "Confundir um ajuste bonito com um procedimento confiável",
          body:
            "Uma execução individual pode parecer excelente e ainda assim ser muito instável entre amostras.",
        },
      ],
    },
    {
      id: "como-agir",
      eyebrow: "Diagnóstico",
      title: "Como agir na prática: sinais de alto viés, sinais de alta variância",
      lead:
        "A utilidade maior desta teoria é orientar intervenções concretas quando o modelo não generaliza bem.",
      visual: "diagnostico-pratico",
      paragraphs: [
        "Se treino e validação estão ambos ruins e parecidos, suspeite de alto viés. Pergunte se o modelo é simples demais, se as features carregam pouca informação ou se a regularização está excessiva. Se treino está muito melhor do que validação, suspeite de alta variância.",
        "Para alto viés, remédios comuns são aumentar expressividade, criar melhores atributos ou aliviar restrições. Para alta variância, remédios incluem regularizar mais, simplificar, coletar mais dados, usar validação adequada e recorrer a ensembles estabilizadores.",
        "Também há casos em que o melhor próximo passo não é mudar o modelo, mas melhorar o dado. Ruído de medição, rótulos inconsistentes e variáveis ausentes podem elevar o erro observado sem que qualquer arquitetura consiga milagres.",
      ],
      blocks: [
        {
          type: "example",
          title: "Sintomas rápidos",
          body:
            "Treino ruim + validação ruim → provável alto viés. Treino ótimo + validação ruim → provável alta variância.",
        },
        {
          type: "insight",
          title: "Teoria boa vira checklist",
          body:
            "O valor pedagógico máximo do trade-off aparece quando ele orienta ações específicas de depuração.",
        },
        {
          type: "mistake",
          title: "Trocar arquitetura sem hipótese diagnóstica",
          body:
            "Mudar o modelo por tentativa cega pode mascarar o problema original e desperdiçar ciclos de iteração.",
        },
      ],
    },
    {
      id: "sintese-operacional",
      eyebrow: "Síntese",
      title: "Mapa final: todo erro ruim pede a pergunta certa antes da correção",
      lead:
        "A linguagem de viés, variância e ruído transforma fracasso difuso em diagnóstico acionável.",
      interactive: "summary-cards",
      paragraphs: [
        "Guardar esta lente conceitual ajuda a navegar desde regressões simples até ensembles e redes profundas. A forma do modelo pode mudar muito; os dilemas de generalização continuam.",
        "Quando você aprende a diferenciar erro sistemático, sensibilidade excessiva e ruído do mundo, o processo de modelagem deixa de ser tentativa cega e vira investigação estruturada.",
      ],
    },
    {
      id: "quiz-revisao",
      eyebrow: "Revisão",
      title: "Quiz de revisão",
      lead:
        "Teste se você consegue reconhecer sintomas, causas e remédios ligados a viés, variância e erro irredutível.",
      interactive: "quiz",
      paragraphs: [
        "O foco aqui é diagnóstico conceitual: entender que tipos diferentes de falha pedem intervenções diferentes.",
      ],
    },
    {
      id: "glossario-proximos-estudos",
      eyebrow: "Glossário",
      title: "Glossário e próximos estudos",
      lead:
        "Consolide os termos desta aula para interpretar melhor regularização, validação cruzada, ensembles e seleção de modelo.",
      interactive: "glossary",
      paragraphs: [
        "Essas ideias voltam repetidamente em machine learning, mesmo quando os modelos ficam muito mais sofisticados.",
      ],
    },
  ],
  summaryCards: [
    {
      title: "Viés é erro sistemático",
      body:
        "O modelo está limitado demais e falha em representar a estrutura principal do problema.",
    },
    {
      title: "Variância é oscilação",
      body:
        "Pequenas mudanças na amostra alteram muito as previsões ou a forma da hipótese aprendida.",
    },
    {
      title: "Ruído nem sempre cede",
      body:
        "Parte do erro vem do próprio processo gerador, de medições imperfeitas ou de variáveis ausentes.",
    },
    {
      title: "Treino e validação contam uma história",
      body:
        "A relação entre essas curvas ajuda a distinguir underfitting de overfitting.",
    },
    {
      title: "Complexidade redistribui erro",
      body:
        "Aumentar capacidade costuma reduzir viés, mas pode aumentar variância sem o controle adequado.",
    },
    {
      title: "Diagnóstico guia intervenção",
      body:
        "Mais dados, mais regularização, melhor feature engineering ou outro modelo fazem sentido em cenários diferentes.",
    },
  ],
  quiz: [
    {
      id: "q1",
      prompt: "O que melhor descreve erro de generalização?",
      options: [
        { id: "a", label: "Erro em dados novos, não usados no treinamento." },
        { id: "b", label: "Erro apenas em um único ponto do treino." },
        { id: "c", label: "Qualquer valor da função de perda sem contexto." },
      ],
      correctOptionId: "a",
      feedback:
        "Generalização é sobre desempenho fora do conjunto visto, onde o modelo realmente precisa provar que aprendeu estrutura.",
    },
    {
      id: "q2",
      prompt: "Alto viés costuma aparecer quando:",
      options: [
        { id: "a", label: "O modelo é rígido demais e erra até no treino." },
        { id: "b", label: "O modelo varia muito entre amostras, mas zera o treino." },
        { id: "c", label: "O ruído do dado desaparece completamente." },
      ],
      correctOptionId: "a",
      feedback:
        "Alto viés é underfitting: o modelo não consegue capturar a estrutura central nem mesmo nos dados de treino.",
    },
    {
      id: "q3",
      prompt: "Alta variância costuma aparecer quando:",
      options: [
        { id: "a", label: "Treino e validação são ambos ruins e próximos." },
        { id: "b", label: "O modelo se ajusta demais ao treino e muda muito com pequenas alterações na amostra." },
        { id: "c", label: "O erro irredutível é zero." },
      ],
      correctOptionId: "b",
      feedback:
        "Alta variância está ligada à sensibilidade excessiva ao conjunto de treino e ao overfitting.",
    },
    {
      id: "q4",
      prompt: "O erro irredutível representa:",
      options: [
        { id: "a", label: "A parcela do erro devida a ruído inerente ou fatores não observados." },
        { id: "b", label: "Uma falha inevitável de toda regressão linear apenas." },
        { id: "c", label: "A diferença entre treino e validação sempre que há overfitting." },
      ],
      correctOptionId: "a",
      feedback:
        "Mesmo com um modelo excelente, pode restar erro vindo de aleatoriedade e limitações do próprio dado.",
    },
    {
      id: "q5",
      prompt: "Se treino está ruim e validação também, sem grande diferença entre ambos, a hipótese mais plausível é:",
      options: [
        { id: "a", label: "Alto viés." },
        { id: "b", label: "Alta variância." },
        { id: "c", label: "ROC AUC insuficiente." },
      ],
      correctOptionId: "a",
      feedback:
        "Quando o modelo não vai bem nem no treino, o problema costuma ser insuficiência de capacidade ou restrição excessiva.",
    },
    {
      id: "q6",
      prompt: "Qual intervenção costuma ajudar mais em alta variância?",
      options: [
        { id: "a", label: "Regularizar mais ou usar ensembles como bagging." },
        { id: "b", label: "Ignorar validação e continuar aumentando a capacidade sem controle." },
        { id: "c", label: "Forçar o modelo a ser ainda mais complexo em qualquer cenário." },
      ],
      correctOptionId: "a",
      feedback:
        "Alta variância pede estabilização: mais regularização, mais dados ou agregação costumam ser remédios naturais.",
    },
    {
      id: "q7",
      prompt: "Qual afirmação sobre complexidade do modelo é a mais adequada?",
      options: [
        { id: "a", label: "Maior complexidade sempre reduz o erro total." },
        { id: "b", label: "Maior complexidade pode reduzir viés, mas elevar variância se não houver controle." },
        { id: "c", label: "Complexidade só importa em regressão, nunca em classificação." },
      ],
      correctOptionId: "b",
      feedback:
        "A relação clássica é de trade-off: o ganho em expressividade pode vir acompanhado de maior sensibilidade.",
    },
    {
      id: "q8",
      prompt: "Por que reamostrar e treinar várias vezes ajuda a entender variância?",
      options: [
        { id: "a", label: "Porque revela quanto a hipótese aprendida muda entre amostras semelhantes." },
        { id: "b", label: "Porque elimina automaticamente todo ruído do problema." },
        { id: "c", label: "Porque torna o viés sempre zero." },
      ],
      correctOptionId: "a",
      feedback:
        "Variância é justamente a instabilidade do procedimento de aprendizagem frente a mudanças no conjunto de treino.",
    },
  ],
  glossary: [
    {
      term: "Generalização",
      definition:
        "Capacidade do modelo de manter bom desempenho em dados não vistos durante o treinamento.",
    },
    {
      term: "Viés",
      definition:
        "Erro sistemático causado por hipóteses simplificadoras demais ou baixa capacidade do modelo.",
    },
    {
      term: "Variância",
      definition:
        "Sensibilidade das previsões do modelo a pequenas mudanças no conjunto de treino.",
    },
    {
      term: "Erro irredutível",
      definition:
        "Parcela do erro associada a ruído inerente, medições imperfeitas ou fatores não observados.",
    },
    {
      term: "Underfitting",
      definition:
        "Situação em que o modelo é simples demais e falha em capturar a estrutura principal dos dados.",
    },
    {
      term: "Overfitting",
      definition:
        "Situação em que o modelo se ajusta demais ao treino e perde robustez em dados novos.",
    },
    {
      term: "Complexidade do modelo",
      definition:
        "Capacidade da família de hipóteses de representar padrões variados e detalhados.",
    },
    {
      term: "Regularização",
      definition:
        "Conjunto de técnicas que restringem o modelo para reduzir sensibilidade excessiva e melhorar generalização.",
    },
    {
      term: "Erro de treino",
      definition:
        "Erro medido nos exemplos usados para ajustar o modelo.",
    },
    {
      term: "Erro de validação",
      definition:
        "Erro medido em dados separados do treino, usado como aproximação da generalização.",
    },
    {
      term: "Reamostragem",
      definition:
        "Procedimento de gerar novas amostras a partir dos dados para estudar estabilidade ou construir ensembles.",
    },
    {
      term: "Bagging",
      definition:
        "Estratégia de ensemble que combina modelos treinados em amostras bootstrap para reduzir variância.",
    },
  ],
};
