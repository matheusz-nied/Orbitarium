import type { LessonContent } from "../../../types/content";

export const paradigmasAprendizadoContent: LessonContent = {
  id: "paradigmas-aprendizado-supervisionado-nao-supervisionado-reforco",
  title: "Paradigmas: Supervisionado, Não Supervisionado e por Reforço",
  subtitle:
    "Três maneiras de aprender, três tipos de feedback e três perguntas diferentes para a mesma realidade.",
  description:
    "Uma aula visual sobre os paradigmas fundamentais de machine learning, mostrando como o tipo de dado e sinal disponível molda o que o sistema consegue aprender.",
  primaryCategoryId: "inteligencia-artificial",
  secondaryCategoryId: "computacao",
  level: "Iniciante",
  estimatedTime: "35-50 min",
  tags: [
    "Machine Learning",
    "Supervisionado",
    "Não Supervisionado",
    "Reforço",
    "Clustering",
    "Política",
  ],
  learningObjectives: [
    "Distinguir claramente aprendizado supervisionado, não supervisionado e por reforço.",
    "Relacionar cada paradigma ao tipo de feedback disponível durante o aprendizado.",
    "Reconhecer exemplos típicos de classificação e regressão como casos supervisionados.",
    "Entender clustering e descoberta de estrutura como núcleo do aprendizado não supervisionado.",
    "Explicar por que reforço envolve decisões sequenciais e recompensa acumulada.",
    "Comparar o mesmo domínio sob três enquadramentos diferentes de tarefa.",
    "Evitar a confusão comum entre paradigma, algoritmo e aplicação.",
    "Escolher o paradigma inicial mais plausível a partir da forma como o problema está instrumentado.",
  ],
  prerequisites: [
    "Noção básica de que modelos recebem entradas e produzem saídas.",
    "Familiaridade inicial com a ideia de dados e exemplos.",
    "Ter visto ou intuído o que significa aprender um padrão a partir de observações.",
  ],
  references: [
    {
      title: "What is Machine Learning?",
      source: "Google for Developers",
      url: "https://developers.google.com/machine-learning/intro-to-ml/what-is-ml",
      note:
        "Resumo oficial com definições introdutórias dos principais tipos de sistemas de ML, incluindo supervisão, descoberta de padrões e reforço.",
    },
    {
      title: "Supervised Learning",
      source: "Google for Developers",
      url: "https://developers.google.com/machine-learning/intro-to-ml/supervised",
      note:
        "Material introdutório sobre exemplos rotulados, treino e avaliação em problemas supervisionados.",
    },
    {
      title: "Getting Started",
      source: "scikit-learn — Documentação oficial",
      url: "https://scikit-learn.org/stable/getting_started.html",
      note:
        "Mostra a estrutura comum de uso em ML, incluindo estimadores supervisionados e não supervisionados.",
    },
    {
      title: "CS 229 Course Handouts",
      source: "Stanford University",
      url: "https://cs229.stanford.edu/materials.html-full",
      note:
        "Índice oficial de notas de aula cobrindo supervisionado, não supervisionado e reforço em sequência conceitual clara.",
    },
    {
      title: "Pattern Recognition and Machine Learning",
      source: "Christopher M. Bishop — Springer",
      url: "https://link.springer.com/book/9780387310732",
      note:
        "Referência clássica para formulação probabilística de tarefas supervisionadas e não supervisionadas.",
    },
    {
      title: "Reinforcement Learning: An Introduction",
      source: "Sutton e Barto",
      url: "http://incompleteideas.net/book/the-book-2nd.html",
      note:
        "Livro clássico e oficial sobre aprendizado por reforço, políticas, recompensas e retorno acumulado.",
    },
  ],
  heroVisual: "paradigms-hero",
  openingText:
    "Quando alguém diz 'vamos usar machine learning', a conversa está só começando. Antes de escolher algoritmo, biblioteca ou arquitetura, é preciso descobrir de que tipo de aprendizado estamos falando. Temos exemplos com resposta correta? Só temos dados crus e queremos descobrir estrutura? Ou o sistema aprende agindo e observando recompensa ao longo do tempo? Esses cenários parecem próximos no vocabulário, mas são paradigmas diferentes porque mudam o tipo de informação disponível para aprender. Entender isso evita erros conceituais que parecem pequenos na teoria e ficam caríssimos na implementação.",
  quickFacts: [
    {
      title: "Paradigma não é algoritmo",
      body:
        "Supervisionado, não supervisionado e reforço descrevem o tipo de aprendizado, não a ferramenta exata usada.",
    },
    {
      title: "Tudo começa pelo sinal",
      body:
        "Rótulo, estrutura latente ou recompensa são sinais muito diferentes. O paradigma nasce daí.",
    },
    {
      title: "O mesmo domínio pode virar três tarefas",
      body:
        "Streaming, saúde ou trânsito podem ser enquadrados como previsão, descoberta de grupos ou decisão sequencial.",
    },
    {
      title: "Misturar objetivos confunde o produto",
      body:
        "Um time pode pedir segmentação quando, na verdade, precisa de previsão. A formulação errada trava todo o projeto.",
    },
  ],
  sections: [
    {
      id: "mapa-geral",
      eyebrow: "Mapa mental",
      title: "Os paradigmas respondem à pergunta: como o sistema recebe orientação para aprender?",
      lead:
        "A principal diferença entre os paradigmas não está na aparência da aplicação, mas no tipo de feedback disponível durante o aprendizado.",
      visual: "paradigms-hero",
      paragraphs: [
        "Em aprendizado supervisionado, cada exemplo vem acompanhado da resposta desejada. O sistema vê perguntas e gabaritos e aprende a aproximar um mapeamento entre entrada e saída. É o paradigma natural para classificação e regressão.",
        "No não supervisionado, há exemplos, mas não há resposta pronta dizendo o que cada linha deveria produzir. O objetivo então muda: procurar grupos, estruturas, fatores latentes, compressões úteis ou pontos atípicos.",
        "No reforço, o agente não recebe a resposta correta de cada passo. Em vez disso, interage com um ambiente, toma ações e observa recompensas ou punições. O que importa é o efeito acumulado de uma sequência de decisões.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Paradigma de aprendizado",
          body:
            "Forma geral de estruturar a aprendizagem de um sistema conforme o tipo de dado, feedback e objetivo disponíveis.",
        },
        {
          type: "insight",
          title: "A pergunta certa vem antes do modelo",
          body:
            "Quando um time escolhe o paradigma errado, geralmente está descrevendo mal o problema ou ignorando o tipo real de sinal que possui.",
        },
      ],
    },
    {
      id: "tipo-de-sinal",
      eyebrow: "Critério decisivo",
      title: "Rótulo, estrutura ou recompensa: três sinais, três lógicas",
      lead:
        "Cada paradigma nasce do que o sistema pode observar como orientação para melhorar.",
      visual: "three-signals-map",
      interactive: "paradigm-selector",
      paragraphs: [
        "O supervisionado precisa de uma referência externa: alguém disse qual era a resposta certa no passado. O não supervisionado trabalha sem essa referência e tenta organizar os dados de forma útil. O reforço observa o efeito de agir, não um gabarito por passo.",
        "Essa distinção ajuda a evitar uma armadilha comum: usar o mesmo termo 'aprender' para processos que têm naturezas diferentes. Um cluster não está tentando acertar um rótulo. Um agente de reforço não recebe a melhor ação pronta a cada instante.",
        "Na prática, escolher o paradigma certo é identificar qual dessas fontes de orientação está realmente disponível, confiável e alinhada ao objetivo do produto.",
      ],
      blocks: [
        {
          type: "example",
          title: "Exemplo comparativo",
          body:
            "Em música: prever se o usuário vai pular a faixa é supervisionado; descobrir grupos de músicas semelhantes é não supervisionado; escolher a próxima faixa para maximizar retenção é reforço.",
        },
        {
          type: "mistake",
          title: "Chamar tudo de classificação",
          body:
            "Muitos projetos dizem 'quero classificar clientes' quando, na verdade, querem segmentação exploratória sem rótulos. Isso muda totalmente a tarefa.",
        },
      ],
    },
    {
      id: "supervisionado",
      eyebrow: "Paradigma 1",
      title: "Aprendizado supervisionado: aprender com exemplos que já vêm com resposta",
      lead:
        "Se você sabe como eram as entradas e também sabe qual era a saída correta, pode treinar um sistema para prever novas saídas semelhantes.",
      visual: "supervised-flow",
      paragraphs: [
        "O supervisionado é o paradigma mais intuitivo para iniciantes porque se parece com exercícios corrigidos. Cada exemplo do passado traz features e um alvo correspondente. O modelo ajusta seus parâmetros para reduzir a diferença entre sua previsão e a resposta observada.",
        "Classificação e regressão nascem daqui. Em classificação, a saída é uma categoria: fraude ou não fraude, tumor benigno ou maligno, spam ou mensagem legítima. Em regressão, a saída é um valor contínuo: preço, tempo, temperatura, demanda.",
        "Esse paradigma é extremamente poderoso quando os rótulos são confiáveis e representativos. Seu risco aparece quando o rótulo é ruidoso, enviesado ou não mede exatamente o que o produto quer otimizar.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Aprendizado supervisionado",
          body:
            "Paradigma em que cada exemplo de treino traz entrada e saída esperada, permitindo ajustar um modelo para prever o alvo em novos casos.",
        },
        {
          type: "example",
          title: "Exemplos comuns",
          body:
            "Prever preço de imóveis, detectar spam, estimar risco de churn, reconhecer objetos em imagens rotuladas e classificar sentimentos em textos.",
        },
      ],
    },
    {
      id: "nao-supervisionado",
      eyebrow: "Paradigma 2",
      title: "Aprendizado não supervisionado: descobrir organização sem gabarito",
      lead:
        "Aqui não há resposta correta por exemplo. O objetivo é encontrar estrutura útil dentro dos próprios dados.",
      visual: "unsupervised-clusters",
      paragraphs: [
        "No não supervisionado, o sistema recebe dados e precisa procurar regularidades internas: grupos semelhantes, representações compactas, anomalias, correlações ou fatores latentes. O resultado não é 'a classe correta' dada por um professor, mas uma forma útil de organizar o conjunto.",
        "Clustering é o exemplo mais didático. O algoritmo tenta aproximar itens parecidos e separar itens diferentes, gerando grupos cuja interpretação humana vem depois. Isso é muito útil quando o time ainda está explorando um domínio e quer entender que tipos de perfis existem.",
        "O cuidado aqui é não tratar qualquer agrupamento como verdade natural. O algoritmo sempre produz alguma estrutura, mas nem toda estrutura é semanticamente relevante para o negócio ou cientificamente robusta.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Aprendizado não supervisionado",
          body:
            "Paradigma em que o sistema aprende a partir de dados sem rótulos explícitos, buscando organização, compressão ou padrões latentes.",
        },
        {
          type: "mistake",
          title: "Interpretar clusters como categorias naturais obrigatórias",
          body:
            "Agrupamentos dependem de features, escala, algoritmo e objetivo. Eles são hipóteses úteis, não leis da natureza.",
        },
      ],
    },
    {
      id: "reforco",
      eyebrow: "Paradigma 3",
      title: "Aprendizado por reforço: melhorar decisões observando consequências",
      lead:
        "Quando o sistema precisa agir em sequência e aprender pelo efeito acumulado dessas ações, entramos no paradigma de reforço.",
      visual: "reinforcement-loop",
      paragraphs: [
        "Em reforço, o agente observa um estado, escolhe uma ação e recebe de volta um novo estado mais uma recompensa. A grande diferença para o supervisionado é que não existe um gabarito dizendo qual era a ação correta em cada instante.",
        "O aprendizado envolve explorar alternativas, colher consequências e construir uma política: uma estratégia de ação que maximize retorno acumulado ao longo do tempo. Isso é fundamental em jogos, controle, robótica e alguns problemas de recomendação sequencial.",
        "Esse paradigma é poderoso, mas mais delicado do ponto de vista prático. Projetar recompensas ruins pode ensinar comportamentos indesejados. Além disso, o sistema precisa experimentar, o que pode ser caro ou arriscado fora de simulação.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Aprendizado por reforço",
          body:
            "Paradigma em que um agente aprende a agir interagindo com um ambiente e maximizando recompensa acumulada ao longo do tempo.",
        },
        {
          type: "insight",
          title: "A recompensa é o sinal, não o roteiro",
          body:
            "Dizer ao agente o que vale a pena não é o mesmo que dizer exatamente o que fazer. Ele ainda precisa descobrir uma política eficaz.",
        },
      ],
    },
    {
      id: "comparar-setups",
      eyebrow: "Comparação",
      title: "O mesmo domínio pode ser supervisionado, não supervisionado ou por reforço",
      lead:
        "Paradigmas não pertencem a setores específicos. Eles dependem de como a tarefa foi formulada e instrumentada.",
      interactive: "signal-setup-comparator",
      paragraphs: [
        "Filtragem de spam, música e robótica mostram bem essa ideia. Em todos os casos, o domínio pode permanecer o mesmo, mas a pergunta feita ao sistema muda. Se há rótulos históricos, pensamos em previsão. Se queremos explorar perfis, pensamos em estrutura. Se a meta depende de uma sequência de decisões, pensamos em reforço.",
        "Esse raciocínio ajuda times de produto a deixar de perguntar 'qual algoritmo usar?' cedo demais. O primeiro passo é descobrir se estamos pedindo uma estimativa pontual, uma organização exploratória ou uma política de ação.",
      ],
      blocks: [
        {
          type: "example",
          title: "Streaming em três versões",
          body:
            "Prever skip é supervisionado. Descobrir tribos musicais é não supervisionado. Maximizar retenção ao longo da sessão é reforço.",
        },
      ],
    },
    {
      id: "escolher-paradigma",
      eyebrow: "Diagnóstico",
      title: "Como escolher o paradigma inicial certo",
      lead:
        "A pergunta prática é simples: o que você tem nas mãos e que tipo de saída quer produzir?",
      visual: "paradigm-choice-map",
      paragraphs: [
        "Se você tem exemplos antigos com resposta confiável e quer prever a mesma resposta no futuro, comece pelo supervisionado. Se não tem resposta pronta, mas quer resumir estrutura, padrões e grupos, comece pelo não supervisionado. Se o sistema vai agir em etapas e o que importa é retorno futuro, olhe para reforço.",
        "Em projetos reais, esse diagnóstico pode revelar que o time não tem o dado necessário para o paradigma desejado. Às vezes todos falam em previsão, mas o rótulo não existe. Às vezes falam em reforço, mas o ambiente não permite experimentação segura.",
        "Escolher bem o ponto de partida evita meses modelando a tarefa errada. O paradigma não é só uma decisão acadêmica: ele molda coleta de dados, métricas, interface do produto e custo operacional.",
      ],
      blocks: [
        {
          type: "mistake",
          title: "Começar pelo modismo",
          body:
            "Usar reforço porque parece avançado ou clustering porque faltam rótulos pode ser um erro se o objetivo real exigir outra forma de sinal.",
        },
        {
          type: "insight",
          title: "Nem sempre é um ou outro",
          body:
            "Muitos sistemas combinam paradigmas: representação aprendida sem supervisão, ajuste supervisionado e otimização por reforço em etapas posteriores.",
        },
      ],
    },
    {
      id: "mesmo-mundo-tres-perguntas",
      eyebrow: "Reenquadramento",
      title: "Trocar o paradigma é trocar a pergunta feita ao mundo",
      lead:
        "A realidade pode ser a mesma; o que muda é qual aspecto dela você quer extrair ou otimizar.",
      interactive: "same-problem-three-views",
      paragraphs: [
        "Essa é uma ideia importante para avançar em IA: problemas não vêm com rótulo de paradigma colado neles. O domínio 'saúde', 'trânsito' ou 'e-commerce' não determina sozinho a abordagem. O que determina é a pergunta operacional que você formula e o tipo de dado que consegue obter.",
        "Quanto mais cedo você aprende a reformular problemas assim, menos preso fica a nomes de modelos específicos. Em engenharia, a maturidade aparece quando o time entende a estrutura do problema antes de correr para treinar qualquer coisa.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Enquadramento da tarefa",
          body:
            "Escolha explícita de qual pergunta o sistema deve responder e de qual forma de feedback sustentará essa aprendizagem.",
        },
      ],
    },
    {
      id: "resumo-final",
      eyebrow: "Síntese",
      title: "Resumo visual dos paradigmas",
      lead:
        "Se tudo parece parecido à primeira vista, volte a este mapa: rótulo, estrutura e recompensa são os três sinais que organizam a paisagem.",
      interactive: "summary-cards",
      paragraphs: [
        "Depois desta aula, a meta é reconhecer rapidamente o que é supervisão, o que é descoberta de estrutura e o que é decisão sequencial com retorno acumulado.",
      ],
    },
    {
      id: "quiz",
      eyebrow: "Revisão",
      title: "Quiz de revisão",
      lead:
        "Teste se a diferença entre os três paradigmas ficou operacional, não apenas verbal.",
      interactive: "quiz",
      paragraphs: [
        "As perguntas abaixo verificam se você consegue mapear cenários ao tipo de sinal disponível e ao objetivo do aprendizado.",
      ],
    },
    {
      id: "glossario",
      eyebrow: "Vocabulário",
      title: "Glossário essencial",
      lead:
        "Use estes termos como referência rápida ao ler materiais introdutórios e documentações de ML.",
      interactive: "glossary",
      paragraphs: [
        "O vocabulário certo reduz ruído em discussões técnicas e ajuda a formular problemas com mais precisão.",
      ],
    },
  ],
  summaryCards: [
    {
      title: "Supervisionado",
      body:
        "Você tem exemplos com resposta correta e quer prever saídas novas da mesma família.",
    },
    {
      title: "Não supervisionado",
      body:
        "Você não tem rótulos e quer descobrir organização, agrupamentos ou estrutura latente nos dados.",
    },
    {
      title: "Reforço",
      body:
        "Você quer que um agente aprenda a agir ao longo do tempo com base em recompensas e consequências.",
    },
    {
      title: "O paradigma vem do sinal",
      body:
        "A escolha não começa pelo algoritmo; começa pelo tipo de feedback que o problema oferece.",
    },
  ],
  quiz: [
    {
      id: "q1",
      prompt: "Qual é a marca mais característica do aprendizado supervisionado?",
      options: [
        { id: "a", label: "Cada exemplo de treino vem com uma saída esperada." },
        { id: "b", label: "O sistema aprende apenas observando recompensas futuras." },
        { id: "c", label: "Não existem alvos nem rótulos nos dados." },
      ],
      correctOptionId: "a",
      feedback:
        "No supervisionado há exemplos com resposta conhecida, o que permite aprender um mapeamento entrada-saída.",
    },
    {
      id: "q2",
      prompt: "Clustering é normalmente associado a qual paradigma?",
      options: [
        { id: "a", label: "Aprendizado supervisionado." },
        { id: "b", label: "Aprendizado não supervisionado." },
        { id: "c", label: "Aprendizado por reforço." },
      ],
      correctOptionId: "b",
      feedback:
        "Clustering busca grupos ou estrutura sem depender de rótulos prévios para cada exemplo.",
    },
    {
      id: "q3",
      prompt: "O que diferencia mais claramente o aprendizado por reforço?",
      options: [
        { id: "a", label: "A existência de uma resposta correta para cada passo." },
        { id: "b", label: "O foco em decisões sequenciais guiadas por recompensa acumulada." },
        { id: "c", label: "A ausência total de interação com o ambiente." },
      ],
      correctOptionId: "b",
      feedback:
        "No reforço, o agente aprende uma política por tentativa, erro e retorno acumulado ao longo do tempo.",
    },
    {
      id: "q4",
      prompt: "Prever preço de aluguel a partir de imóveis históricos é, em geral, qual tipo de tarefa?",
      options: [
        { id: "a", label: "Supervisionada." },
        { id: "b", label: "Não supervisionada." },
        { id: "c", label: "Por reforço." },
      ],
      correctOptionId: "a",
      feedback:
        "Há exemplos com features e valor-alvo conhecido, o que caracteriza um problema supervisionado de regressão.",
    },
    {
      id: "q5",
      prompt: "Por que o mesmo domínio pode aparecer em paradigmas diferentes?",
      options: [
        { id: "a", label: "Porque paradigma depende da pergunta formulada e do tipo de feedback disponível." },
        { id: "b", label: "Porque cada setor de negócio pertence a um único paradigma fixo." },
        { id: "c", label: "Porque qualquer problema é sempre melhor em reforço." },
      ],
      correctOptionId: "a",
      feedback:
        "O domínio é o mesmo, mas a tarefa e o tipo de sinal podem mudar completamente o enquadramento do problema.",
    },
    {
      id: "q6",
      prompt: "Qual situação sugere mais naturalmente aprendizado não supervisionado?",
      options: [
        { id: "a", label: "Você quer segmentar clientes sem grupos previamente rotulados." },
        { id: "b", label: "Você tem milhares de fotos já marcadas com a classe correta." },
        { id: "c", label: "Um robô precisa maximizar pontos em um jogo por várias etapas." },
      ],
      correctOptionId: "a",
      feedback:
        "Sem rótulos, mas com interesse em estrutura ou agrupamento, o enquadramento natural é não supervisionado.",
    },
    {
      id: "q7",
      prompt: "Qual erro conceitual é comum em times iniciantes?",
      options: [
        { id: "a", label: "Confundir paradigma com algoritmo ou com aplicação final." },
        { id: "b", label: "Entender que rótulos ajudam em previsão." },
        { id: "c", label: "Separar classificação de clustering." },
      ],
      correctOptionId: "a",
      feedback:
        "Paradigma descreve a forma de aprender; algoritmo é a ferramenta específica; aplicação é o contexto de uso.",
    },
    {
      id: "q8",
      prompt: "Se o sistema aprende agindo e recebe recompensa apenas depois de uma sequência de passos, qual é o melhor enquadramento inicial?",
      options: [
        { id: "a", label: "Supervisionado." },
        { id: "b", label: "Não supervisionado." },
        { id: "c", label: "Aprendizado por reforço." },
      ],
      correctOptionId: "c",
      feedback:
        "Esse é o cenário clássico do reforço: aprendizado por interação, política e retorno acumulado.",
    },
  ],
  glossary: [
    {
      term: "Paradigma de aprendizado",
      definition:
        "Forma geral de estruturar uma tarefa de ML conforme o tipo de feedback e objetivo disponíveis.",
    },
    {
      term: "Aprendizado supervisionado",
      definition:
        "Paradigma em que exemplos de treino trazem entrada e saída esperada.",
    },
    {
      term: "Aprendizado não supervisionado",
      definition:
        "Paradigma em que o sistema aprende a partir de dados sem rótulos explícitos.",
    },
    {
      term: "Aprendizado por reforço",
      definition:
        "Paradigma em que um agente aprende a agir para maximizar recompensa acumulada.",
    },
    {
      term: "Rótulo",
      definition:
        "Resposta correta associada a um exemplo em tarefas supervisionadas.",
    },
    {
      term: "Clustering",
      definition:
        "Agrupamento de exemplos semelhantes sem exigir categorias rotuladas previamente.",
    },
    {
      term: "Política",
      definition:
        "Estratégia que diz qual ação tomar em cada estado em um problema de reforço.",
    },
    {
      term: "Recompensa",
      definition:
        "Sinal numérico que indica o quão desejável foi o resultado de uma ação ou sequência de ações.",
    },
    {
      term: "Estado",
      definition:
        "Descrição da situação atual do ambiente em problemas de reforço.",
    },
    {
      term: "Classificação",
      definition:
        "Tarefa supervisionada em que a saída é uma categoria discreta.",
    },
    {
      term: "Regressão",
      definition:
        "Tarefa supervisionada em que a saída é um valor contínuo.",
    },
    {
      term: "Estrutura latente",
      definition:
        "Padrão interno dos dados que não está explicitamente rotulado, mas pode ser inferido por organização ou proximidade.",
    },
  ],
  relatedTopics: [
    {
      title: "Treino, validação e teste",
      body:
        "Depois de escolher o paradigma, o próximo passo é avaliar corretamente se o modelo generaliza sem vazamento.",
    },
    {
      title: "Overfitting e regularização",
      body:
        "Qualquer paradigma supervisionado que ajusta um modelo precisa lidar com o risco de aprender demais o treino.",
    },
  ],
};
