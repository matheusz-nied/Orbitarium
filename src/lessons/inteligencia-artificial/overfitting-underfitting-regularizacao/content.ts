import type { LessonContent } from "../../../types/content";

export const overfittingUnderfittingRegularizacaoContent: LessonContent = {
  id: "overfitting-underfitting-regularizacao",
  title: "Overfitting, Underfitting e Regularização",
  subtitle:
    "Por que um modelo pode ser simples demais ou flexível demais — e como técnicas como L2 e early stopping ajudam a encontrar o meio-termo.",
  description:
    "Uma aula visual sobre capacidade do modelo, trade-off viés-complexidade, curvas de treino e teste, regularização L2, early stopping e leitura prática de sinais de sobreajuste.",
  primaryCategoryId: "inteligencia-artificial",
  secondaryCategoryId: "computacao",
  level: "Intermediário",
  estimatedTime: "40-55 min",
  tags: [
    "Overfitting",
    "Underfitting",
    "Regularização",
    "L2",
    "Early Stopping",
    "Generalização",
  ],
  learningObjectives: [
    "Diferenciar underfitting e overfitting em termos de capacidade e generalização.",
    "Interpretar curvas conceituais de erro de treino e teste conforme a complexidade do modelo muda.",
    "Construir intuição sobre viés, variância e o custo de flexibilidade excessiva.",
    "Entender regularização como um conjunto de técnicas para controlar complexidade efetiva.",
    "Explicar conceitualmente como L2 penaliza pesos grandes e por que isso pode reduzir variância.",
    "Entender early stopping como forma prática de regularização durante o treinamento iterativo.",
    "Reconhecer sintomas típicos de sobreajuste em métricas de treino e validação.",
    "Relacionar regularização a escolhas de engenharia como mais dados, simplificação do modelo e feature selection.",
  ],
  prerequisites: [
    "Noção básica de treino, validação e teste.",
    "Entender que modelos ajustam parâmetros para reduzir erro.",
    "Familiaridade inicial com a ideia de generalização para dados novos.",
  ],
  references: [
    {
      title: "Underfitting vs. Overfitting",
      source: "scikit-learn — Documentação oficial",
      url: "https://scikit-learn.org/stable/auto_examples/model_selection/plot_underfitting_overfitting.html",
      note:
        "Exemplo oficial que mostra a curva clássica de erro conforme a complexidade do modelo aumenta.",
    },
    {
      title: "Ridge coefficients as a function of the L2 Regularization",
      source: "scikit-learn — Documentação oficial",
      url: "https://scikit-learn.org/stable/auto_examples/linear_model/plot_ridge_coeffs.html",
      note:
        "Exemplo oficial que ilustra como a regularização L2 encolhe coeficientes e ajuda a conter overfitting.",
    },
    {
      title: "Ridge",
      source: "scikit-learn — Documentação oficial",
      url: "https://scikit-learn.org/stable/modules/generated/sklearn.linear_model.Ridge.html",
      note:
        "Referência direta do estimador Ridge, com definição concisa do papel da regularização L2.",
    },
    {
      title: "CS229 Lecture Notes",
      source: "Stanford University",
      url: "https://cs229.stanford.edu/main_notes.pdf",
      note:
        "Notas oficiais com seções sobre generalização, bias-variance tradeoff, regularização e model selection.",
    },
    {
      title: "Deep Learning",
      source: "Goodfellow, Bengio e Courville — MIT Press",
      url: "https://www.deeplearningbook.org/",
      note:
        "O livro dedica um capítulo inteiro à regularização e à metodologia prática de treino.",
    },
    {
      title: "Pattern Recognition and Machine Learning",
      source: "Christopher M. Bishop — Springer",
      url: "https://link.springer.com/book/9780387310732",
      note:
        "Referência clássica para a visão probabilística de complexidade do modelo, viés e capacidade de generalização.",
    },
  ],
  heroVisual: "fit-hero",
  openingText:
    "Treinar um modelo não é apenas reduzir erro. Se fosse, bastaria torná-lo cada vez mais flexível até encaixar perfeitamente todos os pontos do treino. O problema é que encaixar o passado demais pode piorar o futuro. Overfitting e underfitting são dois jeitos opostos de falhar: um por rigidez excessiva, outro por flexibilidade sem freio. Regularização é o conjunto de ideias que nos ajuda a ocupar a faixa útil entre esses extremos.",
  quickFacts: [
    {
      title: "Erro de treino pode enganar",
      body:
        "Ele quase sempre cai quando aumentamos a complexidade. O que importa é o efeito em dados novos.",
    },
    {
      title: "Mais flexível não é sempre melhor",
      body:
        "Um modelo muito expressivo consegue ajustar ruído local e perder robustez fora do treino.",
    },
    {
      title: "Regularizar é impor disciplina",
      body:
        "Penalizar pesos grandes, parar cedo ou simplificar o modelo são formas de controlar complexidade efetiva.",
    },
    {
      title: "O melhor ponto é intermediário",
      body:
        "A generalização tende a melhorar até certa capacidade e depois piorar quando o modelo começa a memorizar demais.",
    },
  ],
  sections: [
    {
      id: "dois-jeitos-de-falhar",
      eyebrow: "Visão geral",
      title: "Há dois jeitos clássicos de errar: ajustar de menos e ajustar demais",
      lead:
        "Um modelo pode falhar por não ter capacidade suficiente para capturar o padrão ou por ter capacidade excessiva e começar a seguir o ruído.",
      visual: "fit-hero",
      paragraphs: [
        "Underfitting acontece quando o modelo é simples demais para representar a estrutura relevante dos dados. Ele erra no treino e continua errando fora dele. Não é um problema de generalização fina; é um problema de aprendizado insuficiente do padrão central.",
        "Overfitting acontece quando o modelo fica bom demais em detalhes específicos do conjunto de treino. Ele parece ter aprendido muito, mas parte desse 'aprendizado' é ruído, acaso ou peculiaridade da amostra. Por isso o desempenho fora do treino cai.",
        "Esses dois extremos mostram que treinar bem não significa apenas minimizar erro localmente. Significa encontrar um nível de flexibilidade compatível com a estrutura real do problema.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Underfitting",
          body:
            "Situação em que o modelo é rígido demais para capturar o padrão principal, produzindo erro alto até no treino.",
        },
        {
          type: "definition",
          title: "Overfitting",
          body:
            "Situação em que o modelo se ajusta excessivamente ao treino, incluindo ruído e particularidades que não generalizam.",
        },
      ],
    },
    {
      id: "bias-variance-intuicao",
      eyebrow: "Intuição",
      title: "Viés e variância dão uma linguagem para entender o equilíbrio",
      lead:
        "Modelos simples tendem a errar por viés; modelos excessivamente sensíveis tendem a errar por variância.",
      visual: "bias-variance-targets",
      paragraphs: [
        "Viés alto significa que o modelo parte de uma forma tão restrita de ver o problema que perde regularidades importantes. É o caso clássico do underfitting: a função não consegue dobrar onde deveria dobrar.",
        "Variância alta significa que pequenas mudanças na amostra de treino alteram bastante o comportamento aprendido. Em linguagem intuitiva, o modelo está sensível demais ao conjunto específico que viu.",
        "O equilíbrio prático não é um número mágico. É uma região em que o modelo ainda é expressivo o bastante para aprender sinal, mas não tão livre a ponto de perseguir oscilações irrelevantes.",
      ],
      blocks: [
        {
          type: "insight",
          title: "Viés e variância não são inimigos separados",
          body:
            "Ao controlar um lado, frequentemente mexemos no outro. Regularização forte reduz variância, mas pode aumentar viés.",
        },
      ],
    },
    {
      id: "underfitting",
      eyebrow: "Extremo 1",
      title: "Underfitting: quando o modelo nem chega a aprender o padrão principal",
      lead:
        "Se o modelo é incapaz de expressar a relação importante entre entrada e saída, ele fracassa cedo e de forma consistente.",
      paragraphs: [
        "Um modelo linear tentando aproximar um padrão altamente não linear é uma imagem clássica de underfitting. Não importa o quanto você treine: se a família de funções é restrita demais, o ajuste não alcança a estrutura do problema.",
        "Os sintomas costumam aparecer como erro relativamente alto tanto no treino quanto na validação. Nesse caso, mais regularização não ajuda. O que pode ajudar é mais capacidade, melhores features, mais iterações ou até reformular o problema.",
        "Underfitting é importante porque nos lembra que simplificar nem sempre é virtude. Um modelo robusto não é um modelo cego.",
      ],
      blocks: [
        {
          type: "mistake",
          title: "Confundir simplicidade com qualidade",
          body:
            "Soluções simples são desejáveis, mas não quando sacrificam o padrão central do problema. Simplicidade útil não é simplificação cega.",
        },
      ],
    },
    {
      id: "overfitting",
      eyebrow: "Extremo 2",
      title: "Overfitting: quando o modelo começa a decorar ruído",
      lead:
        "O sinal de alerta mais famoso é um treino cada vez melhor acompanhado por uma validação que para de melhorar ou piora.",
      paragraphs: [
        "Overfitting aparece quando a liberdade do modelo é grande o bastante para incorporar flutuações acidentais da amostra. O modelo aprende não só a regularidade útil, mas também o acaso daquela base.",
        "Isso não significa que o modelo 'decidiu trapacear'. Significa que o objetivo de reduzir erro no treino, deixado sem freios adequados, empurra a solução para níveis de detalhe que não se repetem fora dali.",
        "Em problemas pequenos, ruidosos ou com features demais, esse risco aumenta. Por isso regularização, validação e leitura crítica das curvas são tão importantes.",
      ],
      blocks: [
        {
          type: "example",
          title: "Exemplo intuitivo",
          body:
            "Imagine uma curva extremamente sinuosa que passa por todos os pontos de treino. Ela parece brilhante localmente, mas costuma errar pontos novos entre eles.",
        },
      ],
    },
    {
      id: "curvas-de-capacidade",
      eyebrow: "Visualização",
      title: "Complexidade do modelo e erro de generalização formam uma curva em U",
      lead:
        "Aumentar capacidade tende a reduzir erro de treino de forma monotônica, mas o erro fora do treino costuma cair só até certo ponto.",
      visual: "capacity-curves",
      interactive: "complexity-vs-error",
      paragraphs: [
        "Essa curva conceitual ajuda a organizar a intuição. No início, ganhar capacidade é bom: o modelo sai do underfitting e começa a capturar o padrão central. Em algum ponto, a validação atinge sua melhor faixa. Depois disso, complexidade adicional reduz treino, mas cobra preço na generalização.",
        "É por isso que olhar apenas para o treinamento é perigoso. Quase sempre haverá uma versão 'mais impressionante' no treino. O desafio é descobrir qual versão continua boa fora dele.",
      ],
      blocks: [
        {
          type: "insight",
          title: "A capacidade efetiva importa mais que o nome do modelo",
          body:
            "Árvores, redes ou polinômios diferentes podem exibir o mesmo fenômeno se sua flexibilidade efetiva aumentar demais.",
        },
      ],
    },
    {
      id: "regularizacao",
      eyebrow: "Controle",
      title: "Regularização: mecanismos para impedir liberdade excessiva",
      lead:
        "Regularizar não é punir o modelo por princípio; é guiá-lo para soluções mais estáveis e mais propensas a generalizar.",
      visual: "regularization-toolbox",
      paragraphs: [
        "Regularização é um nome guarda-chuva para técnicas que limitam complexidade efetiva. Às vezes isso acontece restringindo pesos; às vezes acontece interrompendo o treinamento; às vezes acontece escolhendo menos features, coletando mais dados ou impondo estrutura arquitetural.",
        "A ideia comum é sempre a mesma: não deixe o objetivo de minimizar treino sozinho decidir até onde ir. Acrescente preferências por soluções mais simples, suaves ou estáveis.",
        "Essa é uma mudança importante de mentalidade. Não buscamos o menor erro possível no treino; buscamos o melhor equilíbrio entre ajustar e generalizar.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Regularização",
          body:
            "Conjunto de técnicas que controla a complexidade efetiva do modelo para melhorar generalização em dados novos.",
        },
      ],
    },
    {
      id: "l2",
      eyebrow: "Técnica 1",
      title: "L2 regularization: penalizar pesos muito grandes",
      lead:
        "Uma forma clássica de regularizar é tornar soluções com coeficientes muito grandes menos atraentes para a otimização.",
      visual: "weight-shrinkage",
      interactive: "regularization-strength-demo",
      paragraphs: [
        "Em termos conceituais, L2 adiciona ao objetivo de treino uma penalização para magnitudes elevadas dos pesos. Isso não impede completamente o uso de um peso grande, mas faz com que ele precise se justificar melhor em termos de redução real de erro.",
        "A consequência prática é que a solução tende a ficar mais distribuída e menos sensível a variações pequenas do conjunto de treino. Isso frequentemente reduz variância e melhora comportamento fora da amostra.",
        "Mas há trade-off: penalizar demais pode empobrecer a função aprendida e reintroduzir underfitting. Regularização é controle, não censura total.",
      ],
      blocks: [
        {
          type: "formula",
          title: "Intuição da perda regularizada",
          body:
            "A perda total passa a considerar erro no treino mais um custo por pesos grandes.",
          formula: "perda total = perda de treino + \\alpha \\|w\\|_2^2",
        },
        {
          type: "mistake",
          title: "Achar que regularizar sempre melhora tudo",
          body:
            "Regularização excessiva pode simplificar demais o modelo e piorar treino e validação. O ponto útil é intermediário.",
        },
      ],
    },
    {
      id: "early-stopping",
      eyebrow: "Técnica 2",
      title: "Early stopping: parar na hora certa também é regularizar",
      lead:
        "Em treinamentos iterativos, continuar reduzindo a loss de treino indefinidamente pode significar começar a encaixar ruído.",
      visual: "early-stopping-roadmap",
      interactive: "early-stopping-lab",
      paragraphs: [
        "Quando acompanhamos treino e validação por época, é comum ver a validação melhorar até certo ponto e depois estabilizar ou piorar enquanto o treino segue caindo. Esse comportamento sugere que o modelo continua usando sua capacidade para detalhes que não ajudam fora do conjunto visto.",
        "Early stopping usa esse sinal para interromper o processo perto do melhor ponto de validação. Em vez de deixar a otimização explorar toda a liberdade disponível, ela é interrompida quando a generalização já parou de ganhar.",
        "Na prática, early stopping é muito útil em redes neurais e outros métodos iterativos porque atua como um freio operacional simples e eficaz.",
      ],
      blocks: [
        {
          type: "example",
          title: "Leitura intuitiva",
          body:
            "Se a loss de treino continua descendo, mas a validação sobe, o modelo está usando as próximas épocas para explicar o passado, não para melhorar o futuro.",
        },
      ],
    },
    {
      id: "diagnostico-pratico",
      eyebrow: "Diagnóstico",
      title: "Como agir quando você suspeita de underfitting ou overfitting",
      lead:
        "O tratamento depende do padrão observado. Não existe uma única correção para qualquer diferença entre treino e validação.",
      paragraphs: [
        "Se treino e validação estão ambos ruins, pense em mais capacidade, mais tempo de treino, melhores features ou reformulação do problema. Se treino está ótimo e validação pior, pense em regularização, simplificação, mais dados ou controle de vazamento.",
        "Também vale investigar volume de dados, qualidade dos rótulos e mudanças de distribuição. Nem todo gap é sobreajuste puro; às vezes o conjunto de validação não representa o que importa, ou o pipeline está metodologicamente contaminado.",
        "O mais importante é resistir à resposta automática. Diagnóstico em ML é leitura combinada de curvas, dados, métricas e contexto de uso.",
      ],
      blocks: [
        {
          type: "insight",
          title: "Mais dados também regularizam, na prática",
          body:
            "Quando o problema permite, aumentar diversidade e volume de exemplos reduz a influência de ruídos locais da amostra.",
        },
      ],
    },
    {
      id: "resumo-final",
      eyebrow: "Síntese",
      title: "Resumo visual do equilíbrio entre capacidade e generalização",
      lead:
        "Se você precisa de uma regra mental simples, use esta: treino mede ajuste, validação mede equilíbrio, regularização impõe disciplina.",
      interactive: "summary-cards",
      paragraphs: [
        "Volte a este resumo sempre que o treino parecer impressionante demais. Em ML, desempenho bonito demais sem contraprova geralmente merece desconfiança metodológica.",
      ],
    },
    {
      id: "quiz",
      eyebrow: "Revisão",
      title: "Quiz de revisão",
      lead:
        "Teste se você consegue ler curvas conceituais e associar sintomas às intervenções corretas.",
      interactive: "quiz",
      paragraphs: [
        "O foco aqui é construir julgamento prático sobre capacidade, regularização e sinais de overfitting.",
      ],
    },
    {
      id: "glossario",
      eyebrow: "Vocabulário",
      title: "Glossário essencial",
      lead:
        "Termos fundamentais para discutir generalização, complexidade e controle de modelos.",
      interactive: "glossary",
      paragraphs: [
        "Use o glossário como referência rápida sempre que estiver lendo sobre tuning, curvas de aprendizado ou regularização.",
      ],
    },
  ],
  summaryCards: [
    {
      title: "Underfitting",
      body:
        "O modelo é simples demais e erra até no treino porque não consegue expressar o padrão principal.",
    },
    {
      title: "Overfitting",
      body:
        "O modelo vai bem no treino, mas começa a incorporar ruído e piora fora da amostra.",
    },
    {
      title: "Regularização",
      body:
        "Conjunto de mecanismos que reduz liberdade excessiva e favorece soluções mais estáveis.",
    },
    {
      title: "Early stopping e L2",
      body:
        "Parar cedo e penalizar pesos grandes são duas formas práticas de conter sobreajuste sem trocar totalmente de modelo.",
    },
  ],
  quiz: [
    {
      id: "q1",
      prompt: "Qual descrição combina melhor com underfitting?",
      options: [
        { id: "a", label: "Modelo simples demais, com erro alto inclusive no treino." },
        { id: "b", label: "Modelo com treino excelente e teste semelhante." },
        { id: "c", label: "Modelo que só falha porque o teste está cego." },
      ],
      correctOptionId: "a",
      feedback:
        "Underfitting indica incapacidade de representar o padrão principal, o que aparece até no conjunto de treino.",
    },
    {
      id: "q2",
      prompt: "Qual padrão é típico de overfitting?",
      options: [
        { id: "a", label: "Erro de treino alto e validação igualmente alta." },
        { id: "b", label: "Treino melhora muito enquanto validação para de melhorar ou piora." },
        { id: "c", label: "Treino e validação melhoram juntos indefinidamente." },
      ],
      correctOptionId: "b",
      feedback:
        "Esse descolamento entre treino e validação é um sinal clássico de que o modelo começou a ajustar ruído do conjunto visto.",
    },
    {
      id: "q3",
      prompt: "Por que aumentar capacidade pode piorar a generalização depois de certo ponto?",
      options: [
        { id: "a", label: "Porque o modelo passa a capturar ruído e particularidades da amostra." },
        { id: "b", label: "Porque modelos complexos não conseguem reduzir erro de treino." },
        { id: "c", label: "Porque a validação sempre acompanha o treino." },
      ],
      correctOptionId: "a",
      feedback:
        "Capacidade excessiva pode reduzir muito o erro de treino às custas de maior variância e menor robustez fora da amostra.",
    },
    {
      id: "q4",
      prompt: "Qual é a ideia central da regularização L2?",
      options: [
        { id: "a", label: "Eliminar completamente o erro de treino." },
        { id: "b", label: "Penalizar pesos grandes para favorecer soluções mais suaves." },
        { id: "c", label: "Substituir a validação por uma regra fixa." },
      ],
      correctOptionId: "b",
      feedback:
        "L2 adiciona uma penalidade para magnitudes elevadas dos pesos, controlando complexidade efetiva.",
    },
    {
      id: "q5",
      prompt: "Early stopping ajuda porque...",
      options: [
        { id: "a", label: "interrompe o treino quando a validação deixa de melhorar, evitando ajuste excessivo ao treino." },
        { id: "b", label: "garante zero erro no teste." },
        { id: "c", label: "remove a necessidade de regularização." },
      ],
      correctOptionId: "a",
      feedback:
        "Ao parar no melhor ponto de validação, evitamos usar épocas extras para encaixar ruído do conjunto de treino.",
    },
    {
      id: "q6",
      prompt: "Se treino e validação estão ambos ruins, qual hipótese faz mais sentido primeiro?",
      options: [
        { id: "a", label: "O modelo pode estar simples demais ou mal representado." },
        { id: "b", label: "A regularização sempre está fraca demais." },
        { id: "c", label: "O modelo certamente decorou o treino." },
      ],
      correctOptionId: "a",
      feedback:
        "Esse padrão aponta mais para underfitting, falta de capacidade ou features pouco informativas do que para sobreajuste.",
    },
    {
      id: "q7",
      prompt: "Qual intervenção pode reduzir overfitting sem trocar totalmente de paradigma?",
      options: [
        { id: "a", label: "Aplicar regularização, reduzir complexidade efetiva ou coletar mais dados." },
        { id: "b", label: "Olhar o teste repetidamente." },
        { id: "c", label: "Aumentar a complexidade indefinidamente." },
      ],
      correctOptionId: "a",
      feedback:
        "Essas ações atacam a variância excessiva ou reforçam o sinal útil disponível para o modelo.",
    },
    {
      id: "q8",
      prompt: "Qual frase resume melhor a meta de tuning em relação à complexidade?",
      options: [
        { id: "a", label: "Buscar o menor erro de treino possível, independentemente da validação." },
        { id: "b", label: "Encontrar uma faixa em que o modelo capta o padrão sem memorizar ruído." },
        { id: "c", label: "Sempre usar o modelo mais simples." },
      ],
      correctOptionId: "b",
      feedback:
        "O objetivo prático é localizar o ponto de melhor generalização, não o de maior exuberância no conjunto de treino.",
    },
  ],
  glossary: [
    {
      term: "Underfitting",
      definition:
        "Falha por capacidade insuficiente, em que o modelo não aprende bem nem mesmo o padrão central do treino.",
    },
    {
      term: "Overfitting",
      definition:
        "Falha por ajuste excessivo ao treino, incluindo ruído e detalhes que não generalizam.",
    },
    {
      term: "Regularização",
      definition:
        "Família de técnicas que controla a complexidade efetiva do modelo para melhorar generalização.",
    },
    {
      term: "L2",
      definition:
        "Penalização baseada na soma dos quadrados dos pesos, usada para desencorajar coeficientes muito grandes.",
    },
    {
      term: "Early stopping",
      definition:
        "Técnica que interrompe o treino iterativo quando a validação para de melhorar de forma útil.",
    },
    {
      term: "Viés",
      definition:
        "Erro sistemático associado a modelos rígidos demais ou hipóteses restritivas demais.",
    },
    {
      term: "Variância",
      definition:
        "Sensibilidade excessiva do modelo a flutuações da amostra de treino.",
    },
    {
      term: "Capacidade do modelo",
      definition:
        "Grau de flexibilidade que o modelo possui para representar relações complexas nos dados.",
    },
    {
      term: "Generalização",
      definition:
        "Capacidade de manter desempenho útil em dados novos da mesma família do problema.",
    },
    {
      term: "Erro de treino",
      definition:
        "Desempenho medido nos exemplos usados para ajustar diretamente o modelo.",
    },
    {
      term: "Erro de validação",
      definition:
        "Desempenho medido em dados não usados no fit direto, útil para comparar alternativas durante o desenvolvimento.",
    },
    {
      term: "Trade-off",
      definition:
        "Compromisso inevitável entre objetivos que não podem ser maximizados ao mesmo tempo, como baixo viés e baixa variância.",
    },
  ],
  relatedTopics: [
    {
      title: "Treino, validação e teste",
      body:
        "Curvas de overfitting só fazem sentido quando os splits foram montados de forma honesta e sem vazamento.",
    },
    {
      title: "Paradigmas supervisionados",
      body:
        "Classificação e regressão são os cenários mais comuns em que essa discussão de capacidade e regularização aparece.",
    },
  ],
};
