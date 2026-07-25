import type { LessonContent } from "../../../types/content";

export const oQueEAprendizadoDeMaquinaContent: LessonContent = {
  id: "o-que-e-aprendizado-de-maquina",
  title: "O que é Aprendizado de Máquina",
  subtitle:
    "Quando escrever a regra exata é difícil, mas exemplos revelam um padrão: a ideia central de fazer sistemas aprenderem relações úteis a partir de dados.",
  description:
    "Uma aula visual sobre a diferença entre regras, estatística e aprendizado com dados; o papel de features, treino, generalização e os cenários em que machine learning realmente ajuda.",
  primaryCategoryId: "inteligencia-artificial",
  secondaryCategoryId: "computacao",
  level: "Iniciante",
  estimatedTime: "35-50 min",
  tags: [
    "Machine Learning",
    "Inteligência Artificial",
    "Features",
    "Generalização",
    "Classificação",
    "Dados",
  ],
  learningObjectives: [
    "Distinguir sistemas baseados em regras, estatística descritiva e aprendizado de máquina.",
    "Entender por que ML é útil quando o padrão existe, mas é difícil de programar manualmente.",
    "Reconhecer o papel de features, rótulos e exemplos na formulação de um problema de aprendizado.",
    "Explicar a diferença entre treinar bem em dados vistos e generalizar para dados novos.",
    "Visualizar um problema de ML como um espaço de features onde exemplos ocupam regiões.",
    "Identificar tarefas básicas como classificação e regressão sem confundir a tarefa com o algoritmo.",
    "Avaliar quando ML é uma boa escolha e quando regras simples, busca ou software tradicional bastam.",
    "Desenvolver uma intuição inicial sobre o ciclo de vida de um produto que usa modelos.",
  ],
  prerequisites: [
    "Noção básica de que programas podem receber dados de entrada e produzir saídas.",
    "Conforto com gráficos simples e tabelas.",
    "Curiosidade sobre como sistemas digitais fazem previsões sem uma lista explícita de regras.",
  ],
  references: [
    {
      title: "What is Machine Learning?",
      source: "Google for Developers",
      url: "https://developers.google.com/machine-learning/intro-to-ml/what-is-ml",
      note:
        "Introdução oficial e acessível aos tipos de sistemas de ML, incluindo aprendizado supervisionado, não supervisionado e por reforço.",
    },
    {
      title: "Machine Learning Crash Course",
      source: "Google for Developers",
      url: "https://developers.google.com/machine-learning/crash-course",
      note:
        "Curso introdutório com foco em conceitos fundamentais, boas práticas e vocabulário de machine learning.",
    },
    {
      title: "The Elements of Statistical Learning",
      source: "Hastie, Tibshirani e Friedman — Stanford",
      url: "https://hastie.su.domains/ElemStatLearn/",
      note:
        "Referência clássica para a visão conceitual de aprendizado estatístico, predição e generalização.",
    },
    {
      title: "CS229 Lecture Notes",
      source: "Stanford University",
      url: "https://cs229.stanford.edu/main_notes.pdf",
      note:
        "Notas oficiais de curso cobrindo formulação de problemas, generalização, regularização e avaliação de modelos.",
    },
    {
      title: "Deep Learning",
      source: "Goodfellow, Bengio e Courville — MIT Press",
      url: "https://www.deeplearningbook.org/",
      note:
        "Livro-texto que situa machine learning dentro da família maior de modelos de representação e otimização.",
    },
    {
      title: "Getting Started",
      source: "scikit-learn — Documentação oficial",
      url: "https://scikit-learn.org/stable/getting_started.html",
      note:
        "Guia prático que mostra a estrutura comum de problemas de ML: ajustar, prever, avaliar e selecionar modelos.",
    },
  ],
  heroVisual: "ml-hero",
  openingText:
    "Há problemas em que sabemos exatamente o que fazer: somar dois números, validar um CPF, ordenar uma lista. Basta escrever a regra. Mas existem problemas em que a regra é difusa, cheia de exceções ou tão longa que seria inviável programá-la manualmente. Distinguir spam de e-mail legítimo, prever demanda, reconhecer um objeto em imagem ou estimar risco de evasão são exemplos em que padrões existem, mas estão espalhados pelos dados. Aprendizado de máquina surge exatamente nesse intervalo: quando o programador descreve o objetivo e os exemplos, e o sistema ajusta internamente uma função de decisão.",
  quickFacts: [
    {
      title: "Não é mágica",
      body:
        "Um modelo não descobre verdades ocultas por intuição. Ele ajusta parâmetros para reduzir erro em exemplos observados.",
    },
    {
      title: "Feature importa",
      body:
        "O mundo real precisa virar medições: números, categorias, sinais ou vetores que o modelo consiga manipular.",
    },
    {
      title: "Treinar não é decorar",
      body:
        "O alvo não é repetir o conjunto visto, mas manter desempenho em dados novos e plausíveis.",
    },
    {
      title: "ML é escolha de engenharia",
      body:
        "Nem todo problema merece um modelo. Às vezes regras simples, busca, otimização ou revisão humana são melhores.",
    },
  ],
  sections: [
    {
      id: "por-que-aprender",
      eyebrow: "Motivação",
      title: "Por que criar sistemas que aprendem em vez de só seguir regras?",
      lead:
        "A ideia de machine learning começa quando percebemos que há decisões úteis demais para serem capturadas por um punhado de ifs.",
      visual: "ml-hero",
      paragraphs: [
        "Programação tradicional é excelente quando a lógica pode ser descrita de modo claro e estável. Se a regra for explícita, o software clássico tende a ser mais barato, mais explicável e mais confiável do que um modelo aprendido.",
        "O problema aparece quando a fronteira de decisão é difusa. Como programar manualmente todos os jeitos possíveis de escrever um spam? Como enumerar todas as combinações de sinais de evasão escolar, fraude ou demanda futura? Em muitos casos, não faltam padrões; falta uma regra curta o bastante para caber na cabeça do programador.",
        "Machine learning muda o contrato. Em vez de especificar cada passo da decisão, descrevemos o objetivo, fornecemos exemplos e deixamos o sistema ajustar parâmetros que capturam regularidades observadas nos dados.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Aprendizado de máquina",
          body:
            "Abordagem em que um sistema ajusta automaticamente um modelo a partir de dados para realizar previsões, classificações ou decisões sem receber todas as regras de forma explícita.",
        },
        {
          type: "insight",
          title: "O programador não desaparece",
          body:
            "Alguém ainda precisa definir a tarefa, coletar dados, escolher métricas, validar resultados e decidir se automatizar aquele problema faz sentido.",
        },
      ],
    },
    {
      id: "regras-estatistica-e-aprendizado",
      eyebrow: "Distinção central",
      title: "Regras, estatística e aprendizado não são a mesma coisa",
      lead:
        "As três abordagens podem olhar para o mesmo problema, mas fazem perguntas diferentes e operam de modos diferentes.",
      visual: "regras-estatistica-aprendizado",
      interactive: "rules-vs-data-classifier",
      paragraphs: [
        "Um sistema baseado em regras depende de lógica escrita por humanos: se aconteceu X e Y, faça Z. Isso funciona muito bem quando as condições são claras e poucas. O custo aparece quando as exceções explodem ou quando a linguagem do problema muda rápido.",
        "Estatística, em um sentido introdutório, ajuda a descrever e medir padrões: médias, dispersão, correlação, frequências, intervalos. Ela pode dizer que 42% das mensagens eram spam, ou que clientes de uma faixa gastam mais do que outra. Mas descrever a base não equivale automaticamente a construir um mecanismo que decide cada caso novo.",
        "Machine learning usa dados para ajustar um modelo preditivo ou decisório. A diferença prática é que o sistema aprende uma função que transforma atributos de entrada em uma saída provável. Ele herda muito da estatística, mas é orientado à previsão e à generalização para exemplos não vistos.",
      ],
      blocks: [
        {
          type: "example",
          title: "Mesmo problema, três lentes",
          body:
            "No filtro de spam, regras podem procurar expressões suspeitas; estatística pode medir quantas mensagens são spam; ML pode combinar muitos sinais fracos para decidir cada e-mail novo.",
        },
        {
          type: "mistake",
          title: "Confundir média com inteligência",
          body:
            "Saber a classe mais frequente é útil como linha de base, mas isso ainda não significa que o sistema aprendeu a distinguir exemplos individuais.",
        },
      ],
    },
    {
      id: "dados-features-rotulos",
      eyebrow: "Representação",
      title: "O modelo não vê o mundo: ele vê dados, features e às vezes rótulos",
      lead:
        "Toda tarefa de ML depende de traduzir um problema real para uma estrutura de exemplos que o algoritmo consiga manipular.",
      visual: "dados-features-rotulos",
      paragraphs: [
        "Uma pessoa vê um cliente indeciso, uma imagem de gato ou um texto agressivo. O modelo não vê nada disso diretamente. Ele vê uma linha de dados: idade, renda, histórico de cliques, pixels, embeddings, presença de certos termos, duração de sessão e assim por diante.",
        "Essas medições são as features. Elas não são detalhe operacional: são a forma matemática do problema. Se as features ignoram o que realmente distingue as classes, o algoritmo pode ser sofisticado e ainda assim fracassar porque a representação é pobre.",
        "Em muitos cenários há também um rótulo: spam ou não spam, preço futuro, diagnóstico confirmado, nota de satisfação. O aprendizado supervisionado usa exatamente essa dupla: features e resposta esperada.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Feature",
          body:
            "Atributo observável ou derivado usado para representar um exemplo em um modelo. Pode ser numérico, categórico, textual ou vetorial.",
        },
        {
          type: "mistake",
          title: "Achar que o algoritmo compensa qualquer dado ruim",
          body:
            "Se a representação ignora variáveis relevantes, o modelo aprende um retrato distorcido do problema. Não existe arquitetura milagrosa que recupere informação ausente.",
        },
      ],
    },
    {
      id: "tarefas-basicas",
      eyebrow: "Formulação",
      title: "Antes do algoritmo vem a tarefa: classificar, prever ou ordenar",
      lead:
        "Muita confusão em ML nasce de misturar a pergunta do problema com a ferramenta que será usada para respondê-la.",
      paragraphs: [
        "Classificação significa escolher uma categoria: fraude ou não fraude, planta saudável ou doente, comentário tóxico ou neutro. Regressão significa prever um valor contínuo: preço, demanda, temperatura, tempo de entrega. Ranking e recomendação significam ordenar alternativas úteis para um contexto.",
        "Essas tarefas descrevem a saída desejada, não o modelo específico. O mesmo problema de classificação pode ser atacado com regressão logística, árvores, redes neurais ou métodos lineares. Escolher o algoritmo é um passo posterior à formulação da tarefa.",
        "Essa separação importa porque uma formulação ruim gera métricas ruins, coleta de dados confusa e expectativas equivocadas. Às vezes o produto quer 'prever churn', mas o dado disponível só permite detectar risco atual. São perguntas diferentes.",
      ],
      blocks: [
        {
          type: "example",
          title: "Pergunta bem formulada",
          body:
            "Em vez de 'quero usar IA para vender mais', uma formulação mais operacional seria 'quero estimar a probabilidade de recompra nos próximos 30 dias para priorizar ofertas'.",
        },
        {
          type: "insight",
          title: "Problema bom, modelo médio; problema ruim, modelo inútil",
          body:
            "Em projetos de ML, definir a pergunta e a métrica certas costuma ser mais decisivo do que trocar de algoritmo cedo demais.",
        },
      ],
    },
    {
      id: "treino-e-generalizacao",
      eyebrow: "Aprendizagem",
      title: "Treinar é ajustar nos exemplos vistos; generalizar é acertar os novos",
      lead:
        "O coração de ML não é apenas reduzir erro no passado, mas manter desempenho quando o sistema encontra dados que nunca viu.",
      visual: "treino-generalizacao",
      paragraphs: [
        "Durante o treino, o algoritmo procura uma combinação de parâmetros que relacione features e saídas. Em linguagem simples, ele procura um padrão útil. Mas um padrão útil não pode ser apenas uma memória comprimida da base histórica.",
        "Generalização é a capacidade de transferir o que foi aprendido para exemplos futuros do mesmo tipo de problema. Um classificador de spam que parece impecável na base antiga, mas falha em mensagens novas, não aprendeu o fenômeno; aprendeu o conjunto de treino.",
        "É por isso que falamos tanto de validação, teste e distribuição dos dados. O desempenho relevante é o que sobrevive fora do conjunto usado para ajustar o modelo.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Generalização",
          body:
            "Capacidade de um modelo manter bom desempenho em dados novos, vindos da mesma família de situações que motivou o treinamento.",
        },
        {
          type: "mistake",
          title: "Celebrar 100% no treino",
          body:
            "Acerto perfeito no conjunto visto pode ser sinal de sobreajuste, vazamento de informação ou métrica mal construída. Sem dados novos, a confiança é ilusória.",
        },
      ],
    },
    {
      id: "espaco-de-features",
      eyebrow: "Intuição geométrica",
      title: "Uma forma poderosa de pensar: cada exemplo vira um ponto em um espaço",
      lead:
        "Quando descrevemos um objeto por features, passamos a tratá-lo como coordenadas. Aprender é, em parte, descobrir fronteiras e regiões nesse espaço.",
      visual: "feature-space-map",
      interactive: "feature-space-sketch",
      paragraphs: [
        "Se uma fruta é representada por doçura e crocância, cada fruto vira um ponto em um plano. Se uma casa é descrita por área e distância do centro, novamente temos coordenadas. O algoritmo deixa de pensar em 'objetos' e passa a operar em regiões de um espaço geométrico.",
        "Essa intuição é útil porque explica por que escolhas de features são tão importantes. Features bem escolhidas aproximam exemplos semelhantes e afastam os diferentes. Features ruins misturam tudo e tornam a fronteira entre classes artificialmente confusa.",
        "Mesmo quando o espaço real tem centenas de dimensões, a lógica permanece: prever é localizar um novo ponto dentro de uma estrutura aprendida a partir dos exemplos anteriores.",
      ],
      blocks: [
        {
          type: "insight",
          title: "Toda previsão tem uma geometria escondida",
          body:
            "Modelos diferentes aprendem essa geometria de jeitos diferentes, mas todos dependem de algum critério para dizer quais exemplos estão perto, separados ou alinhados.",
        },
        {
          type: "example",
          title: "Exemplo conceitual",
          body:
            "Uma mensagem curta com muitos links pode cair perto da região de spam; uma longa conversa com remetente conhecido pode cair perto da região de mensagens legítimas.",
        },
      ],
    },
    {
      id: "quando-ml-ajuda",
      eyebrow: "Escolha de engenharia",
      title: "Quando ML ajuda de verdade — e quando pode ser exagero",
      lead:
        "A melhor pergunta não é 'posso usar IA?', mas 'este problema tem estrutura, dados e tolerância operacional para um modelo?'",
      visual: "checklist-ml",
      interactive: "when-ml-helps-or-fails",
      paragraphs: [
        "ML costuma valer a pena quando existe um padrão real a ser aprendido, quando há exemplos representativos e quando a saída desejada pode ser medida de modo relativamente claro. Nesses casos, a automação ganha escala porque o modelo aproveita regularidades difíceis de programar manualmente.",
        "Ele pode ser uma má escolha quando as regras já são simples e estáveis, quando quase não há dados, quando o ambiente muda radicalmente toda hora ou quando os erros precisam de justificativa detalhada e determinística. Nesses cenários, software tradicional, heurísticas ou revisão humana podem ser mais adequados.",
        "Também existe um meio-termo importante: usar modelos como apoio à decisão, não como piloto automático. Em muitos produtos bons, ML ranqueia, recomenda ou sinaliza risco, enquanto regras e humanos fazem a camada final de controle.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Bom candidato a ML",
          body:
            "Problema em que a regra explícita é difícil, os dados representam o fenômeno com alguma fidelidade e existe um critério observável para aprender e avaliar.",
        },
        {
          type: "mistake",
          title: "Automatizar cedo demais",
          body:
            "Sem linha de base simples, sem inspeção de erros e sem observabilidade, o modelo vira uma caixa-preta cara que ninguém sabe consertar.",
        },
      ],
    },
    {
      id: "ciclo-de-vida",
      eyebrow: "Operação",
      title: "Um modelo em produção vive num ciclo, não em um momento único",
      lead:
        "Construir o primeiro modelo é só o começo; depois vêm coleta contínua, monitoramento, revisão de drift e ajustes de objetivo.",
      visual: "ciclo-ml",
      paragraphs: [
        "Em aula introdutória, é comum imaginar ML como uma etapa isolada: treinei e pronto. Na prática, um sistema útil depende de coleta de dados, limpeza, validação, implantação, monitoramento de desempenho e revisão periódica quando o mundo muda.",
        "Isso acontece porque o modelo aprende a partir de uma fotografia parcial da realidade. Se o comportamento dos usuários muda, se políticas mudam ou se o produto muda, o padrão que sustentava a previsão pode enfraquecer. O problema deixa de ser apenas estatístico e vira também um problema operacional.",
        "Por isso, projetos maduros tratam modelos como componentes vivos de software. Eles precisam de métricas, alertas, rollback, inspeção de erros e alinhamento constante com o objetivo do produto.",
      ],
      blocks: [
        {
          type: "insight",
          title: "Dados são dependência de produção",
          body:
            "Se o fluxo de dados quebra, atrasa ou muda de significado, o modelo continua rodando, mas pode deixar de fazer sentido sem avisar em linguagem humana.",
        },
        {
          type: "example",
          title: "Exemplo realista",
          body:
            "Um modelo de recomendação treinado em uma campanha promocional pode parecer ótimo naquele período e perder qualidade quando o comportamento do público volta ao normal.",
        },
      ],
    },
    {
      id: "resumo-estrutural",
      eyebrow: "Síntese",
      title: "Mapa mental da aula",
      lead:
        "Se precisar guardar poucas ideias, guarde estas: o problema vem antes do algoritmo, a representação importa e o sucesso mora na generalização.",
      interactive: "summary-cards",
      paragraphs: [
        "Volte a este resumo sempre que alguém usar 'IA' como sinônimo de qualquer automação. O valor de ML aparece em problemas com padrões aprendíveis, boas representações e avaliação honesta em dados novos.",
      ],
    },
    {
      id: "quiz",
      eyebrow: "Revisão",
      title: "Quiz de revisão",
      lead:
        "Teste se as diferenças entre regras, estatística e aprendizado ficaram bem conectadas.",
      interactive: "quiz",
      paragraphs: [
        "As perguntas abaixo foram pensadas para verificar relações entre conceitos, não para decorar nomes de algoritmos.",
      ],
    },
    {
      id: "glossario",
      eyebrow: "Vocabulário",
      title: "Glossário essencial",
      lead:
        "Feche a aula consolidando o vocabulário básico que aparece em praticamente qualquer conversa sobre machine learning.",
      interactive: "glossary",
      paragraphs: [
        "Dominar estes termos ajuda a ler artigos, documentações e decisões de produto com muito menos ruído conceitual.",
      ],
    },
  ],
  summaryCards: [
    {
      title: "Regra explícita x padrão aprendido",
      body:
        "Programas tradicionais executam lógica descrita diretamente. ML aprende uma função de decisão a partir de exemplos.",
    },
    {
      title: "Estatística não some",
      body:
        "Machine learning herda muitos princípios da estatística, mas é usado com ênfase em previsão, decisão e generalização.",
    },
    {
      title: "Features são a linguagem do problema",
      body:
        "O modelo só consegue aprender o que está representado nos dados de forma minimamente relevante.",
    },
    {
      title: "O teste real é no dado novo",
      body:
        "Desempenho em treino pode enganar. Generalização é o critério central de qualidade.",
    },
  ],
  quiz: [
    {
      id: "q1",
      prompt: "Quando um problema costuma ser bom candidato a regras em vez de ML?",
      options: [
        { id: "a", label: "Quando a lógica é clara, estável e fácil de escrever explicitamente." },
        { id: "b", label: "Quando há muitos exemplos e a regra é desconhecida." },
        { id: "c", label: "Quando a saída depende de padrões sutis em muitos sinais." },
      ],
      correctOptionId: "a",
      feedback:
        "Se a regra é simples e robusta, software tradicional tende a ser mais barato e previsível do que treinar um modelo.",
    },
    {
      id: "q2",
      prompt: "Qual afirmação diferencia melhor estatística descritiva de aprendizado de máquina?",
      options: [
        { id: "a", label: "Estatística descreve padrões na base; ML aprende uma regra de previsão para novos exemplos." },
        { id: "b", label: "Estatística serve apenas para gráficos; ML serve apenas para imagens." },
        { id: "c", label: "São exatamente a mesma coisa em qualquer contexto." },
      ],
      correctOptionId: "a",
      feedback:
        "Em nível introdutório, estatística pode resumir frequências e relações; ML usa dados para ajustar um modelo preditivo ou decisório.",
    },
    {
      id: "q3",
      prompt: "O que são features?",
      options: [
        { id: "a", label: "Atributos usados para representar um exemplo de forma que o modelo possa operar sobre ele." },
        { id: "b", label: "Somente os parâmetros internos da rede neural." },
        { id: "c", label: "A resposta correta que o modelo deve produzir." },
      ],
      correctOptionId: "a",
      feedback:
        "Features são medições ou representações do exemplo. Elas são a ponte entre o fenômeno real e o cálculo do modelo.",
    },
    {
      id: "q4",
      prompt: "Qual é o objetivo principal do treinamento em ML?",
      options: [
        { id: "a", label: "Memorizar integralmente o conjunto de treino." },
        { id: "b", label: "Ajustar um modelo que consiga generalizar para exemplos novos." },
        { id: "c", label: "Eliminar a necessidade de escolher métricas." },
      ],
      correctOptionId: "b",
      feedback:
        "Treinar serve para aprender padrões úteis, mas a medida de sucesso é o desempenho fora da base usada no ajuste.",
    },
    {
      id: "q5",
      prompt: "Por que um modelo pode falhar mesmo com um algoritmo poderoso?",
      options: [
        { id: "a", label: "Porque dados e features podem representar mal o problema." },
        { id: "b", label: "Porque algoritmos poderosos nunca aprendem." },
        { id: "c", label: "Porque qualquer base de treino já garante generalização." },
      ],
      correctOptionId: "a",
      feedback:
        "Se a representação é ruim ou os dados são inadequados, o modelo aprende um retrato pobre do fenômeno.",
    },
    {
      id: "q6",
      prompt: "O que significa generalizar?",
      options: [
        { id: "a", label: "Funcionar bem apenas nos dados históricos usados no ajuste." },
        { id: "b", label: "Manter desempenho útil em dados novos do mesmo tipo de problema." },
        { id: "c", label: "Usar o mesmo algoritmo para qualquer domínio." },
      ],
      correctOptionId: "b",
      feedback:
        "Generalização é o critério central: acertar em exemplos ainda não vistos, desde que venham da mesma família de situações.",
    },
    {
      id: "q7",
      prompt: "Qual cenário abaixo sugere cautela antes de aplicar ML?",
      options: [
        { id: "a", label: "Poucos dados, regra simples já funciona e erros precisam ser totalmente explicáveis." },
        { id: "b", label: "Muitos dados representativos e feedback claro." },
        { id: "c", label: "Padrão estável e objetivo mensurável." },
      ],
      correctOptionId: "a",
      feedback:
        "Nessas condições, talvez seja melhor começar com regras, revisão humana ou uma solução mais simples e auditável.",
    },
    {
      id: "q8",
      prompt: "Pensar em um espaço de features ajuda porque...",
      options: [
        { id: "a", label: "permite imaginar exemplos como pontos e decisões como regiões ou fronteiras." },
        { id: "b", label: "substitui a necessidade de dados reais." },
        { id: "c", label: "faz o modelo entender linguagem humana diretamente." },
      ],
      correctOptionId: "a",
      feedback:
        "A intuição geométrica ajuda a entender por que proximidade, separação e representação são tão importantes em ML.",
    },
  ],
  glossary: [
    {
      term: "Aprendizado de máquina",
      definition:
        "Abordagem em que um sistema ajusta um modelo a partir de dados para prever, classificar ou decidir sem receber todas as regras explicitamente.",
    },
    {
      term: "Modelo",
      definition:
        "Estrutura matemática ajustada pelos dados para transformar entradas em saídas previstas.",
    },
    {
      term: "Feature",
      definition:
        "Atributo observável ou derivado usado para representar cada exemplo na entrada do modelo.",
    },
    {
      term: "Rótulo",
      definition:
        "Resposta esperada associada a um exemplo em tarefas supervisionadas, como uma classe ou valor-alvo.",
    },
    {
      term: "Exemplo",
      definition:
        "Uma instância individual do conjunto de dados, como uma linha de tabela, uma imagem ou uma mensagem.",
    },
    {
      term: "Classificação",
      definition:
        "Tarefa em que o sistema escolhe uma entre várias categorias possíveis.",
    },
    {
      term: "Regressão",
      definition:
        "Tarefa em que o sistema prevê um valor contínuo, como preço, demanda ou temperatura.",
    },
    {
      term: "Generalização",
      definition:
        "Capacidade de o modelo manter desempenho útil em dados novos do mesmo tipo de problema.",
    },
    {
      term: "Treinamento",
      definition:
        "Processo de ajustar os parâmetros do modelo com base em exemplos e em um critério de erro.",
    },
    {
      term: "Linha de base",
      definition:
        "Solução simples usada como referência inicial para saber se um modelo mais complexo realmente agrega valor.",
    },
    {
      term: "Espaço de features",
      definition:
        "Representação geométrica em que cada exemplo é tratado como um ponto definido por suas features.",
    },
    {
      term: "Inferência",
      definition:
        "Momento em que o modelo já treinado recebe novos dados e produz uma previsão ou decisão.",
    },
  ],
  relatedTopics: [
    {
      title: "Paradigmas de aprendizado",
      body:
        "Depois desta base, vale explorar como supervisionado, não supervisionado e reforço mudam o tipo de sinal disponível para aprender.",
    },
    {
      title: "Treino, validação e teste",
      body:
        "A próxima camada prática é aprender a medir generalização sem se enganar com vazamento ou avaliação mal feita.",
    },
  ],
};
