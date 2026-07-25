import type { LessonContent } from "../../../types/content";

export const arvoresEnsemblesAgregacaoContent: LessonContent = {
  id: "arvores-ensembles-agregacao",
  title: "Árvores, Ensembles e o Poder da Agregação",
  subtitle:
    "Quando uma única árvore oscila demais, muitas árvores coordenadas podem produzir decisões mais estáveis, robustas e competitivas.",
  description:
    "Uma aula visual sobre árvores de decisão, partições do espaço, overfitting, bagging, random forests, boosting, voto de modelos fracos e interpretação básica de importância de atributos.",
  primaryCategoryId: "inteligencia-artificial",
  secondaryCategoryId: "computacao",
  level: "Intermediário",
  estimatedTime: "45-60 min",
  tags: [
    "Inteligência Artificial",
    "Árvores de Decisão",
    "Bagging",
    "Random Forest",
    "Boosting",
    "Ensemble",
    "Feature Importance",
  ],
  learningObjectives: [
    "Entender como árvores de decisão dividem o espaço de atributos por regras simples e sucessivas.",
    "Interpretar nós, folhas, profundidade e partições retangulares como partes de uma mesma geometria de decisão.",
    "Reconhecer por que árvores profundas tendem a ter alta variância e por que pequenas mudanças nos dados podem alterar bastante sua estrutura.",
    "Explicar a intuição do bagging como média ou votação de vários modelos treinados em amostras bootstrap.",
    "Compreender por que random forests reduzem correlação entre árvores e melhoram o ganho do bagging.",
    "Explicar boosting como construção sequencial de especialistas fracos que corrigem erros anteriores.",
    "Distinguir, em nível conceitual, métodos que reduzem variância dos que atacam principalmente o viés.",
    "Interpretar importância de atributos com cautela, entendendo seu valor prático e suas limitações.",
  ],
  prerequisites: [
    "Noção básica de classificação supervisionada.",
    "Conforto com gráficos de duas dimensões e comparação entre regiões.",
    "Entender que modelos podem errar por excesso de simplicidade ou excesso de sensibilidade.",
  ],
  references: [
    {
      title: "CS229 Lecture Notes: Decision Trees",
      source: "Stanford University",
      url: "https://cs229.stanford.edu/cs229-notes-decision_trees.pdf",
      note:
        "Notas oficiais cobrindo árvores, bagging, random forests e boosting com foco conceitual.",
    },
    {
      title: "An Introduction to Statistical Learning",
      source: "Gareth James, Daniela Witten, Trevor Hastie, Robert Tibshirani",
      url: "https://www.statlearning.com/",
      note:
        "Livro e materiais complementares amplamente usados para árvores e métodos de ensemble.",
    },
    {
      title: "Bagging Predictors",
      source: "Leo Breiman, 1996",
      url: "https://www.stat.berkeley.edu/~breiman/bagging.pdf",
      note:
        "Artigo clássico que formaliza bootstrap aggregating como estratégia para melhorar preditores instáveis.",
    },
    {
      title: "Random Forests",
      source: "Leo Breiman, 2001",
      url: "https://www.stat.berkeley.edu/~breiman/randomforest2001.pdf",
      note:
        "Trabalho seminal que combina bagging com aleatoriedade em atributos para reduzir correlação entre árvores.",
    },
    {
      title: "Greedy Function Approximation: A Gradient Boosting Machine",
      source: "Jerome H. Friedman, 2001",
      url: "https://projecteuclid.org/journals/annals-of-statistics/volume-29/issue-5/Greedy-Function-Approximation-A-Gradient-Boosting-Machine/10.1214/aos/1013203451.full",
      note:
        "Referência clássica sobre a formulação moderna de gradient boosting.",
    },
    {
      title: "Decision Trees",
      source: "scikit-learn — Documentação oficial",
      url: "https://scikit-learn.org/stable/modules/tree.html",
      note:
        "Explica árvores de decisão para classificação e regressão, inclusive critérios e controle de profundidade.",
    },
    {
      title: "Ensembles: Gradient boosting, random forests, bagging, voting, stacking",
      source: "scikit-learn — Documentação oficial",
      url: "https://scikit-learn.org/stable/modules/ensemble",
      note:
        "Documentação unificada sobre ensembles e seu papel na redução de viés e variância.",
    },
  ],
  heroVisual: "arvores-hero",
  openingText:
    "Uma árvore de decisão parece quase infantil: 'se isso, então aquilo'. Talvez por isso muita gente subestime seu poder. Só que esse formato de pergunta encadeada tem uma propriedade valiosa: ele transforma decisões abstratas em regiões concretas do espaço de dados. O problema é que árvores sozinhas são temperamentais. Mude alguns exemplos de lugar, e a estrutura inteira pode balançar. Foi dessa fragilidade que nasceram alguns dos algoritmos mais fortes do aprendizado de máquina clássico: bagging, random forests e boosting. Todos partem de uma ideia elegante: uma mente simples pode errar demais, mas muitas mentes simples organizadas do jeito certo podem produzir julgamentos excelentes.",
  quickFacts: [
    {
      title: "Árvore divide o espaço",
      body:
        "Cada pergunta cria um corte em alguma variável. Depois de muitos cortes, surgem regiões onde o modelo toma decisões locais.",
    },
    {
      title: "Árvores profundas variam muito",
      body:
        "Pequenas mudanças nos dados podem alterar o primeiro corte e, em cascata, o restante da estrutura.",
    },
    {
      title: "Bagging suaviza",
      body:
        "Ao combinar muitas árvores treinadas em amostras diferentes, o ensemble reduz oscilações da árvore individual.",
    },
    {
      title: "Boosting corrige em sequência",
      body:
        "Em vez de votar independentemente, os modelos fracos entram em fila e tentam consertar os erros acumulados.",
    },
  ],
  sections: [
    {
      id: "por-que-arvores-sao-intuitivas",
      eyebrow: "Motivação",
      title: "Árvores de decisão: o modelo que pensa em perguntas",
      lead:
        "Uma árvore classifica exemplos criando uma sequência de perguntas simples sobre os atributos.",
      visual: "arvore-intuicao",
      paragraphs: [
        "Se você estivesse separando frutas manualmente, poderia começar com uma regra como 'a casca é amarela?'. Depois talvez perguntasse 'o tamanho é grande?'. Árvores de decisão funcionam assim: cada nó interno testa uma condição, cada ramo segue uma resposta possível e cada folha entrega a previsão final.",
        "Essa lógica torna o modelo altamente interpretável. É possível seguir o caminho de uma previsão e explicar a decisão como cadeia de regras. Em áreas nas quais interpretabilidade importa, isso é extremamente atraente.",
        "Mas há um detalhe importante: a árvore não pensa linguisticamente. Geometricamente, cada pergunta recorta o espaço dos dados em regiões menores. O que parece uma conversa em linguagem natural é, na prática, um particionamento recursivo do plano ou do espaço de atributos.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Árvore de decisão",
          body:
            "Modelo supervisionado que toma decisões por meio de testes sucessivos em atributos, formando uma estrutura de nós e folhas.",
        },
        {
          type: "example",
          title: "Diagnóstico simplificado",
          body:
            "Uma árvore pode começar perguntando se há febre, depois avaliar saturação, depois idade, até chegar a um encaminhamento final.",
        },
        {
          type: "insight",
          title: "Perguntas são cortes geométricos",
          body:
            "Um teste como 'idade > 40?' parece verbal, mas geometricamente ele cria uma divisão do espaço em duas regiões.",
        },
      ],
    },
    {
      id: "particoes-e-profundidade",
      eyebrow: "Geometria",
      title: "Cada nó faz um corte; a profundidade multiplica as regiões",
      lead:
        "Entender árvores de decisão fica muito mais fácil quando você as enxerga como um mapa de partições no espaço.",
      visual: "particoes-do-espaco",
      interactive: "shallow-tree-builder",
      paragraphs: [
        "Num problema com duas variáveis, cada split vertical ou horizontal divide o plano. Depois de alguns cortes, formamos retângulos ou blocos em que a decisão é constante. A árvore, portanto, constrói uma aproximação em degraus para uma fronteira que pode ser bastante irregular.",
        "A profundidade controla quantas perguntas o modelo pode fazer antes de chegar a uma folha. Árvores rasas têm poucas regiões e são mais estáveis, porém podem simplificar demais o problema. Árvores profundas capturam nuances locais, mas correm mais risco de memorizar ruído.",
        "Essa tensão é central: a mesma flexibilidade que torna árvores expressivas também as deixa vulneráveis. Uma árvore muito adaptada ao treino parece brilhante naquele conjunto, mas pode envelhecer mal quando vê dados novos.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Profundidade",
          body:
            "Número máximo de divisões sucessivas ao longo de um caminho da raiz até uma folha.",
        },
        {
          type: "mistake",
          title: "Confundir mais profundidade com melhor generalização",
          body:
            "Profundidade aumenta capacidade de ajuste no treino, mas isso não garante desempenho melhor fora dele.",
        },
        {
          type: "example",
          title: "Mapa em degraus",
          body:
            "Se as classes ocupam regiões curvas, uma árvore aproximará essa curva com vários pequenos blocos retangulares.",
        },
      ],
    },
    {
      id: "criterios-de-divisao",
      eyebrow: "Critério",
      title: "Como a árvore escolhe a próxima pergunta? Reduzindo impureza",
      lead:
        "A árvore não testa splits aleatoriamente: ela procura cortes que deixem os grupos resultantes mais homogêneos.",
      visual: "impureza-e-ganho",
      paragraphs: [
        "Em classificação, critérios como entropia ou Gini medem o quão misturada está uma região. Se um nó contém metade da classe A e metade da classe B, ele é mais impuro do que um nó que contém quase só exemplos de A. Um bom split é aquele que produz filhos mais puros do que o pai.",
        "Em regressão, a lógica muda um pouco, mas a intuição permanece: procuramos cortes que reduzam a dispersão dos valores-alvo dentro de cada região. Em vez de pureza de classes, pensamos em homogeneidade do valor previsto.",
        "Essa busca local é poderosa, porém gananciosa. A árvore escolhe a melhor divisão disponível naquele momento, não a melhor estrutura global possível. Por isso duas árvores treinadas em amostras ligeiramente diferentes podem divergir cedo e acabar muito distintas.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Impureza",
          body:
            "Medida de mistura dentro de um nó. Quanto mais misturadas estão as classes, maior a impureza.",
        },
        {
          type: "formula",
          title: "Índice de Gini",
          body:
            "Uma medida comum de impureza em classificação; vale zero quando todas as amostras do nó pertencem à mesma classe.",
          formula: "Gini = 1 - Σ p_k^2",
        },
        {
          type: "insight",
          title: "Árvores são gananciosas por design",
          body:
            "Elas escolhem o melhor corte local agora, mesmo que isso não garanta a melhor árvore global possível.",
        },
      ],
    },
    {
      id: "instabilidade-da-arvore-unica",
      eyebrow: "Problema",
      title: "Árvore única: forte em interpretação, frágil em estabilidade",
      lead:
        "O mesmo mecanismo que permite flexibilidade também faz a árvore variar demais quando o conjunto de treino muda.",
      visual: "instabilidade-da-arvore",
      paragraphs: [
        "Árvores são modelos de alta variância, especialmente quando crescem muito. Se um pequeno grupo de exemplos muda de posição ou sai da amostra, o melhor primeiro split pode mudar. Como todos os splits posteriores dependem do caminho anterior, a árvore inteira se reorganiza.",
        "Isso não significa que árvores sejam ruins. Significa que elas são instáveis, e justamente por isso são ótimas candidatas para agregação. Modelos muito estáveis pouco se beneficiam de bagging. Modelos instáveis, como árvores profundas, ganham bastante quando fazemos média de muitas versões.",
        "Esse é um ponto bonito da história dos ensembles: não combatemos a fraqueza apagando-a, mas organizando-a. A instabilidade individual vira diversidade coletiva, e a diversidade coletiva pode virar robustez.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Alta variância",
          body:
            "Característica de modelos cujas previsões mudam bastante quando o conjunto de treino muda ligeiramente.",
        },
        {
          type: "example",
          title: "Primeiro corte decisivo",
          body:
            "Se uma árvore hesita entre usar 'idade' ou 'renda' na raiz, poucos exemplos adicionais podem inverter a escolha e alterar toda a estrutura abaixo.",
        },
        {
          type: "mistake",
          title: "Interpretar uma árvore única como verdade estrutural do domínio",
          body:
            "Muitas vezes ela é apenas uma dentre várias árvores plausíveis dadas as flutuações da amostra.",
        },
      ],
    },
    {
      id: "bagging-e-random-forests",
      eyebrow: "Agregação",
      title: "Bagging: muitas árvores para suavizar a variância de uma só",
      lead:
        "Treinamos várias árvores em amostras bootstrap e combinamos suas previsões por média ou voto.",
      visual: "bagging-random-forest",
      interactive: "bagging-vs-single-tree",
      paragraphs: [
        "Bagging vem de bootstrap aggregating. A ideia é gerar várias réplicas do conjunto de treino por amostragem com reposição, treinar uma árvore em cada réplica e depois agregar as saídas. Para regressão, fazemos média. Para classificação, usamos votação.",
        "O truque funciona porque árvores instáveis produzem soluções diferentes em cada réplica. Ao combinar essas soluções, cancelamos parte das oscilações individuais. A previsão coletiva costuma variar menos do que a de uma única árvore.",
        "Random forests dão um passo adicional: além de variar as amostras, variam também o subconjunto de atributos considerados em cada split. Isso reduz a correlação entre árvores, aumentando o benefício da média. Muitas árvores parecidas ajudam menos do que muitas árvores diversas.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Bagging",
          body:
            "Estratégia de ensemble que treina múltiplos modelos em amostras bootstrap e combina suas previsões para reduzir variância.",
        },
        {
          type: "definition",
          title: "Random forest",
          body:
            "Conjunto de árvores bagged com aleatoriedade adicional na escolha de atributos durante os splits.",
        },
        {
          type: "insight",
          title: "Diversidade importa",
          body:
            "A média só ajuda de verdade quando os erros individuais não são todos iguais. Reduzir correlação entre árvores é parte essencial do ganho.",
        },
      ],
    },
    {
      id: "voto-de-aprendizes-fracos",
      eyebrow: "Ensemble",
      title: "Quando modelos fracos votam bem: a intuição por trás da agregação",
      lead:
        "Nem sempre precisamos de especialistas individuais perfeitos; às vezes basta uma coleção de especialistas modestos e variados.",
      visual: "votacao-coletiva",
      interactive: "weak-learners-vote",
      paragraphs: [
        "Pense em vários classificadores rasos, cada um captando um indício parcial do problema. Um pode olhar mais para textura, outro para tamanho, outro para contexto. Individualmente, todos erram bastante. Coletivamente, podem formar um juízo melhor.",
        "Essa lógica é especialmente poderosa quando os erros não são totalmente correlacionados. Se cada aprendiz fraco tropeça em lugares diferentes, o voto coletivo consegue amortecer os tropeços individuais.",
        "O ensemble, então, não é apenas 'somar modelos'. É desenhar um mecanismo no qual diversidade e agregação se combinam para produzir uma decisão mais confiável.",
      ],
      blocks: [
        {
          type: "insight",
          title: "Independência parcial vale ouro",
          body:
            "Se todos os modelos erram exatamente nos mesmos exemplos, votar não melhora quase nada. O ganho nasce da complementaridade.",
        },
        {
          type: "example",
          title: "Conselho em vez de oráculo",
          body:
            "É melhor ouvir cinco analistas moderadamente bons com vieses diferentes do que um único analista instável e excessivamente confiante.",
        },
        {
          type: "mistake",
          title: "Achar que mais modelos sempre resolve",
          body:
            "Se os modelos são clones mal diversificados, o ensemble só repete o mesmo erro várias vezes.",
        },
      ],
    },
    {
      id: "boosting",
      eyebrow: "Sequência",
      title: "Boosting: em vez de votar ao acaso, os modelos entram em fila para corrigir erros",
      lead:
        "Boosting constrói um ensemble sequencial, no qual cada novo modelo foca no que os anteriores fizeram mal.",
      visual: "boosting-sequencial",
      paragraphs: [
        "Diferentemente do bagging, em que os modelos podem ser treinados de forma praticamente independente, o boosting é sequencial. A cada etapa, um novo aprendiz é adicionado com a missão de corrigir resíduos ou enfatizar exemplos mal tratados anteriormente.",
        "A intuição é menos 'vamos suavizar instabilidade' e mais 'vamos somar pequenas correções'. Por isso o boosting costuma ser visto como estratégia que ataca especialmente o viés, embora também possa afetar variância dependendo da configuração.",
        "Métodos modernos como gradient boosting e XGBoost nasceram dessa ideia e se tornaram extremamente fortes em dados tabulares. O preço é que, em geral, o modelo final fica menos transparente do que uma árvore única.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Boosting",
          body:
            "Família de ensembles sequenciais em que novos aprendizes são treinados para corrigir erros dos aprendizes anteriores.",
        },
        {
          type: "insight",
          title: "Bagging e boosting não fazem a mesma coisa",
          body:
            "Bagging usa paralelismo e média para reduzir oscilação. Boosting usa sequência e correção para construir um modelo forte a partir de ajustes incrementais.",
        },
        {
          type: "mistake",
          title: "Tratar boosting como mera votação",
          body:
            "No boosting, a ordem importa. Cada novo modelo depende do histórico de erros acumulado até ali.",
        },
      ],
    },
    {
      id: "importancia-de-atributos",
      eyebrow: "Interpretação",
      title: "Importância de atributos: útil, mas longe de ser a palavra final",
      lead:
        "Ensembles de árvores podem sugerir quais variáveis parecem relevantes, mas essa leitura exige cuidado.",
      visual: "importancia-de-atributos",
      paragraphs: [
        "Muitas bibliotecas expõem medidas de importance baseadas em redução acumulada de impureza ou em queda de desempenho após permutação de um atributo. Essas medidas ajudam a identificar variáveis que o ensemble usou com frequência ou que parecem influenciar bastante as previsões.",
        "O valor prático disso é enorme: em aplicações tabulares, árvores e florestas muitas vezes servem como ferramentas rápidas para triagem de atributos. Porém importância não é causalidade. Uma variável pode parecer importante por estar correlacionada com outra, por ter mais pontos de corte possíveis ou por carregar um atalho do conjunto.",
        "A leitura madura é esta: importância de atributos é um termômetro operacional do modelo, não uma prova sobre o mundo. Ela responde 'o ensemble usou isso?' mais do que 'isso causa o fenômeno?'.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Feature importance",
          body:
            "Medida que tenta quantificar quanto um atributo contribui para as decisões do modelo ou para sua qualidade preditiva.",
        },
        {
          type: "insight",
          title: "Importância não é causa",
          body:
            "O modelo pode usar um atributo porque ele serve como proxy conveniente, não porque ele explica o fenômeno no sentido científico.",
        },
        {
          type: "mistake",
          title: "Ordenar atributos e concluir uma hierarquia causal",
          body:
            "Sem desenho experimental, variáveis correlacionadas e vieses de coleta podem distorcer bastante a leitura.",
        },
      ],
    },
    {
      id: "sintese-operacional",
      eyebrow: "Síntese",
      title: "O que guardar: árvore para interpretar, ensemble para estabilizar e escalar",
      lead:
        "A lição central desta aula é que agregar modelos não é remendo: é um princípio de projeto extremamente poderoso.",
      interactive: "summary-cards",
      paragraphs: [
        "Árvores nos ensinam a pensar em regras locais e partições do espaço. Ensembles nos ensinam que um modelo não precisa ser brilhante sozinho para produzir excelente desempenho coletivo.",
        "Essa lógica aparece em vários lugares da IA. O poder da agregação não é um truque de árvores; é uma ideia geral sobre como diversidade e combinação podem aumentar robustez.",
      ],
    },
    {
      id: "quiz-revisao",
      eyebrow: "Revisão",
      title: "Quiz de revisão",
      lead:
        "Verifique se a diferença entre árvore única, bagging, random forest, boosting e importância de atributos ficou nítida.",
      interactive: "quiz",
      paragraphs: [
        "Procure responder pensando na função de cada técnica, não apenas no nome dela.",
      ],
    },
    {
      id: "glossario-proximos-estudos",
      eyebrow: "Glossário",
      title: "Glossário e próximos estudos",
      lead:
        "Feche a aula consolidando o vocabulário de árvores e ensembles, essencial para dados tabulares e modelagem clássica.",
      interactive: "glossary",
      paragraphs: [
        "Esses termos aparecem o tempo todo em bibliotecas, papers e competições de machine learning.",
      ],
    },
  ],
  summaryCards: [
    {
      title: "Árvores fazem perguntas sucessivas",
      body:
        "Cada pergunta corta o espaço de atributos e empurra o exemplo para uma região mais específica.",
    },
    {
      title: "Profundidade aumenta capacidade",
      body:
        "Mais níveis criam mais regiões e mais flexibilidade, mas também podem aumentar sobreajuste.",
    },
    {
      title: "Árvore única pode oscilar demais",
      body:
        "Pequenas mudanças na amostra podem produzir estruturas muito diferentes.",
    },
    {
      title: "Bagging reduz variância",
      body:
        "Treinar várias árvores em amostras bootstrap e agregar previsões suaviza instabilidades individuais.",
    },
    {
      title: "Random forests reduzem correlação",
      body:
        "Ao aleatorizar atributos nos splits, aumentam a diversidade útil entre árvores.",
    },
    {
      title: "Boosting soma correções",
      body:
        "Modelos fracos entram em sequência para atacar erros acumulados e construir um preditor forte.",
    },
  ],
  quiz: [
    {
      id: "q1",
      prompt: "Qual descrição representa melhor uma árvore de decisão?",
      options: [
        { id: "a", label: "Um conjunto de perguntas sucessivas sobre atributos." },
        { id: "b", label: "Uma média contínua de probabilidades sem regras locais." },
        { id: "c", label: "Um modelo que nunca divide o espaço de dados." },
      ],
      correctOptionId: "a",
      feedback:
        "Árvores decidem por encadeamento de testes, levando cada exemplo até uma folha final.",
    },
    {
      id: "q2",
      prompt: "Em duas dimensões, um split típico de árvore gera:",
      options: [
        { id: "a", label: "Um corte que divide o plano em duas regiões." },
        { id: "b", label: "Uma curva senoidal obrigatória." },
        { id: "c", label: "Uma rotação do espaço inteiro." },
      ],
      correctOptionId: "a",
      feedback:
        "Cada teste em um atributo funciona como um corte, normalmente horizontal ou vertical, no espaço das entradas.",
    },
    {
      id: "q3",
      prompt: "Por que árvores profundas costumam ter alta variância?",
      options: [
        { id: "a", label: "Porque são sensíveis a pequenas mudanças no conjunto de treino." },
        { id: "b", label: "Porque não conseguem representar regras locais." },
        { id: "c", label: "Porque sempre usam poucos atributos." },
      ],
      correctOptionId: "a",
      feedback:
        "Como o particionamento é recursivo, uma mudança cedo na árvore pode alterar grande parte da estrutura final.",
    },
    {
      id: "q4",
      prompt: "A principal intuição do bagging é:",
      options: [
        { id: "a", label: "Treinar modelos em sequência para corrigir resíduos." },
        { id: "b", label: "Treinar várias versões em amostras bootstrap e agregá-las." },
        { id: "c", label: "Eliminar completamente o uso de árvores." },
      ],
      correctOptionId: "b",
      feedback:
        "Bagging usa diversidade de amostras e agregação para reduzir variância do modelo base.",
    },
    {
      id: "q5",
      prompt: "O que random forests adicionam ao bagging clássico?",
      options: [
        { id: "a", label: "Aleatoriedade também na escolha de atributos considerados em cada split." },
        { id: "b", label: "Obrigação de treinar apenas uma árvore." },
        { id: "c", label: "Substituição de voto por regressão logística." },
      ],
      correctOptionId: "a",
      feedback:
        "Essa aleatoriedade reduz correlação entre árvores, aumentando o ganho da agregação.",
    },
    {
      id: "q6",
      prompt: "Boosting difere do bagging principalmente porque:",
      options: [
        { id: "a", label: "Ignora os erros anteriores durante o treinamento." },
        { id: "b", label: "Constrói modelos de forma sequencial, tentando corrigir erros acumulados." },
        { id: "c", label: "Não usa combinação de modelos." },
      ],
      correctOptionId: "b",
      feedback:
        "No boosting, cada aprendiz novo depende do desempenho dos anteriores.",
    },
    {
      id: "q7",
      prompt: "Quando um ensemble de modelos fracos tende a funcionar melhor?",
      options: [
        { id: "a", label: "Quando os modelos cometem erros parcialmente diferentes." },
        { id: "b", label: "Quando todos os modelos são clones que erram igual." },
        { id: "c", label: "Quando nenhum modelo usa os dados de entrada." },
      ],
      correctOptionId: "a",
      feedback:
        "A complementaridade entre erros é uma parte essencial do ganho coletivo.",
    },
    {
      id: "q8",
      prompt: "Qual é a leitura mais madura sobre feature importance?",
      options: [
        { id: "a", label: "É uma medida operacional útil, mas não prova causalidade." },
        { id: "b", label: "Sempre revela a causa real do fenômeno estudado." },
        { id: "c", label: "Serve apenas para modelos lineares." },
      ],
      correctOptionId: "a",
      feedback:
        "Importância diz respeito ao uso que o modelo fez dos atributos, não necessariamente à estrutura causal do mundo.",
    },
  ],
  glossary: [
    {
      term: "Árvore de decisão",
      definition:
        "Modelo que realiza previsões por meio de uma sequência de testes em atributos até chegar a uma folha.",
    },
    {
      term: "Nó",
      definition:
        "Ponto da árvore onde ocorre um teste ou divisão sobre um atributo.",
    },
    {
      term: "Folha",
      definition:
        "Nó terminal da árvore, onde a predição final é emitida.",
    },
    {
      term: "Split",
      definition:
        "Divisão do conjunto de exemplos em duas ou mais partes com base em uma regra sobre um atributo.",
    },
    {
      term: "Impureza",
      definition:
        "Medida de mistura das classes dentro de um nó; quanto maior, menos homogêneo é o grupo.",
    },
    {
      term: "Profundidade",
      definition:
        "Número de divisões ao longo de um caminho da raiz até uma folha.",
    },
    {
      term: "Bootstrap",
      definition:
        "Amostragem com reposição usada para gerar réplicas do conjunto de treino.",
    },
    {
      term: "Bagging",
      definition:
        "Ensemble que combina várias versões de um modelo treinadas em amostras bootstrap para reduzir variância.",
    },
    {
      term: "Random forest",
      definition:
        "Conjunto de árvores bagged com aleatoriedade adicional na seleção de atributos a cada split.",
    },
    {
      term: "Boosting",
      definition:
        "Família de métodos que constrói aprendizes em sequência, enfatizando erros anteriores.",
    },
    {
      term: "Aprendiz fraco",
      definition:
        "Modelo simples que sozinho tem desempenho limitado, mas pode contribuir bem em ensemble.",
    },
    {
      term: "Feature importance",
      definition:
        "Medida de quanto um atributo parece contribuir para as decisões ou o desempenho do modelo.",
    },
  ],
};
