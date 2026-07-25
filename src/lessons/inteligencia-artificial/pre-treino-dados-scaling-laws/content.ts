import type { LessonContent } from "../../../types/content";

export const preTreinoDadosScalingLawsContent: LessonContent = {
  id: "pre-treino-dados-scaling-laws",
  title: "Pré-treino, Dados e Scaling Laws",
  subtitle:
    "Como tamanho de modelo, quantidade de tokens, qualidade dos dados e orçamento de compute interagem no treinamento de LLMs.",
  description:
    "Uma aula avançada sobre pré-treinamento autoregressivo, power laws empíricas, trade-offs entre parâmetros e dados, Kaplan, Chinchilla, qualidade de corpus e implicações práticas para LLMs.",
  primaryCategoryId: "inteligencia-artificial",
  secondaryCategoryId: "computacao",
  level: "Avançado",
  estimatedTime: "50-65 min",
  tags: [
    "LLM",
    "Pré-treinamento",
    "Scaling Laws",
    "Chinchilla",
    "Kaplan",
    "Dados",
  ],
  learningObjectives: [
    "Entender o pré-treinamento como ajuste massivo de parâmetros por previsão de próximo token em larga escala.",
    "Explicar a intuição de scaling laws como relações empíricas entre loss, parâmetros, dados e compute.",
    "Distinguir modelo grande subtreinado de modelo balanceado em compute e tokens.",
    "Descrever a diferença conceitual entre a recomendação compute-optimal de Kaplan e a correção posterior de Chinchilla.",
    "Reconhecer por que quantidade de dados e qualidade de dados não são a mesma coisa.",
    "Entender o papel de deduplicação, mistura de fontes e filtragem na utilidade do corpus.",
    "Evitar leituras simplistas ou sensacionalistas de scaling laws como 'quanto maior, melhor' sem condições.",
  ],
  prerequisites: [
    "Familiaridade com Transformers e geração autoregressiva.",
    "Noção básica de loss e otimização.",
    "Entender que treinamento de LLMs depende de grandes corpora de texto.",
  ],
  references: [
    {
      title: "Scaling Laws for Neural Language Models",
      source: "Kaplan et al., 2020 — arXiv",
      url: "https://arxiv.org/abs/2001.08361",
      note:
        "Artigo que popularizou scaling laws para modelos de linguagem e a discussão sobre alocação ótima de compute.",
    },
    {
      title: "Training Compute-Optimal Large Language Models",
      source: "Hoffmann et al., 2022 — arXiv",
      url: "https://arxiv.org/abs/2203.15556",
      note:
        "Artigo do Chinchilla, mostrando que muitos modelos grandes estavam subtreinados e propondo outra relação entre parâmetros e tokens.",
    },
    {
      title: "Language Models are Few-Shot Learners",
      source: "Brown et al., 2020 — arXiv",
      url: "https://arxiv.org/abs/2005.14165",
      note:
        "Referência histórica para a era de LLMs em grande escala e contexto útil sobre pré-treinamento massivo.",
    },
    {
      title: "Exploring the Limits of Transfer Learning with a Unified Text-to-Text Transformer",
      source: "Raffel et al., 2019 — arXiv",
      url: "https://arxiv.org/abs/1910.10683",
      note:
        "Importante para pensar qualidade e construção de corpora, incluindo o papel do C4.",
    },
    {
      title: "The Pile: An 800GB Dataset of Diverse Text for Language Modeling",
      source: "Gao et al., 2020 — arXiv",
      url: "https://arxiv.org/abs/2101.00027",
      note:
        "Exemplo relevante de corpus diverso e curado para pré-treinamento aberto.",
    },
    {
      title: "The Bitter Lesson",
      source: "Rich Sutton",
      url: "http://www.incompleteideas.net/IncIdeas/BitterLesson.html",
      note:
        "Ensaio influente sobre a vantagem recorrente de métodos que escalam com compute e dados.",
    },
  ],
  heroVisual: "hero",
  openingText:
    "Pré-treinar um LLM é transformar gigantescas quantidades de texto em um ajuste fino de bilhões de parâmetros. Durante algum tempo, a intuição dominante foi simples: mais parâmetros tendem a produzir melhores modelos. Scaling laws refinou essa intuição e mostrou algo mais interessante: desempenho depende de relações entre tamanho do modelo, número de tokens e compute disponível. Um modelo enorme pode, paradoxalmente, estar 'subtreinado' se viu pouco dado para o orçamento usado. A discussão entre Kaplan e Chinchilla tornou esse ponto central para a engenharia moderna de LLMs.",
  quickFacts: [
    {
      title: "Pré-treinamento é otimização em escala",
      body:
        "O modelo aprende reduzindo erro de previsão sobre volumes massivos de texto, não por regras linguísticas explícitas.",
    },
    {
      title: "Mais parâmetros não resolvem tudo",
      body:
        "Sem dados suficientes ou compute bem alocado, modelos grandes podem ficar abaixo do que seu potencial permitiria.",
    },
    {
      title: "Quantidade e qualidade coexistem",
      body:
        "Duplicação excessiva, ruído e mistura ruim de fontes podem desperdiçar parte do ganho esperado de escalar tokens.",
    },
  ],
  sections: [
    {
      id: "pre-treino",
      eyebrow: "Fundação",
      title: "Pré-treino é o estágio em que o modelo aprende a compressão estatística da linguagem",
      lead:
        "Antes de seguir instruções ou ser alinhado, o LLM passa por um treinamento massivo de previsão do próximo token.",
      visual: "hero",
      paragraphs: [
        "O pré-treinamento pega um Transformer grande e o expõe a vastos corpora de texto. A tarefa básica é previsiva: dado um contexto, qual token tende a vir em seguida? Repetida em escala gigantesca, essa tarefa força o modelo a internalizar regularidades linguísticas, estilísticas, factuais e estruturais.",
        "O ponto crucial é que essa etapa não produz um sistema pronto para uso final. Ela produz uma base representacional poderosa, capaz de completar, resumir, traduzir e modelar linguagem, mas ainda sem otimização explícita para seguir instruções humanas de forma desejada.",
        "Scaling laws nasce desse estágio porque é nele que modelo, dados e compute interagem em escala industrial. É aqui que a pergunta 'quanto vale aumentar X?' se torna decisiva.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Pré-treinamento",
          body:
            "Treino inicial em larga escala, normalmente autoregressivo, no qual o modelo ajusta seus parâmetros para prever o próximo token em grandes corpora.",
        },
        {
          type: "insight",
          title: "A base do modelo nasce antes do alinhamento",
          body:
            "Capacidades linguísticas amplas costumam emergir fortemente no pré-treinamento; alinhamento e instruction tuning reorganizam esse potencial para usos desejados.",
        },
      ],
    },
    {
      id: "triangulo",
      eyebrow: "Relações",
      title: "Parâmetros, dados e compute formam um triângulo de compromisso",
      lead:
        "Não faz sentido discutir tamanho de modelo isoladamente. Um LLM é sempre uma combinação de arquitetura, tokens vistos e orçamento computacional.",
      visual: "concept",
      paragraphs: [
        "Mais parâmetros aumentam a capacidade de representar padrões complexos. Mais dados ampliam a cobertura de regularidades e reduzem a chance de que o modelo memorize estreitamente o corpus. Mais compute permite explorar combinações maiores desses fatores por mais tempo de otimização.",
        "Mas esses recursos não são independentes. Um modelo muito grande com poucos tokens pode ficar subtreinado. Um volume enorme de dados com um modelo pequeno pode esbarrar em capacidade insuficiente. Um orçamento fixo de compute obriga escolhas sobre onde investir.",
        "Scaling laws tenta descrever empiricamente essa paisagem. Não é uma teoria completa da inteligência; é uma regularidade observada sobre como loss cai quando escalamos certos eixos de treinamento.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Scaling law",
          body:
            "Relação empírica, frequentemente aproximada por power laws, entre desempenho e fatores como tamanho do modelo, dados e compute.",
        },
      ],
    },
    {
      id: "power-laws",
      eyebrow: "Padrões empíricos",
      title: "Scaling laws mostram queda previsível de loss em várias ordens de magnitude",
      lead:
        "A surpresa não foi apenas que modelos maiores melhoram, mas que essa melhora segue padrões surpreendentemente regulares.",
      visual: "pipeline",
      interactive: "scaling-curves-lab",
      paragraphs: [
        "Kaplan e colaboradores mostraram que, em ampla faixa de escalas experimentais, a loss seguia tendências próximas de power laws quando variávamos separadamente tamanho do modelo, tamanho do dataset e compute. Isso transformou o ato de escalar de arte empírica em ciência mais preditiva.",
        "A importância prática dessa descoberta é enorme. Se a curva é relativamente regular, podemos estimar melhor o retorno marginal de treinar por mais tempo, usar mais parâmetros ou ampliar o corpus. Isso afeta orçamento, planejamento de infraestrutura e design de experimentos.",
        "Mas é essencial lembrar: essas leis são aproximações empíricas em regimes específicos, não mandamentos absolutos para qualquer arquitetura, objetivo ou domínio.",
      ],
      blocks: [
        {
          type: "insight",
          title: "Previsibilidade muda a engenharia",
          body:
            "Quando o ganho marginal fica estimável, decisões sobre data pipeline e hardware deixam de ser puro chute e passam a ser comparações mais racionais.",
        },
      ],
    },
    {
      id: "kaplan",
      eyebrow: "Primeira leitura",
      title: "Kaplan popularizou a ideia de que, no regime estudado, compute ótimo favoreceria modelos relativamente maiores",
      lead:
        "Uma interpretação influente do estudo original foi: dado um budget fixo e aquelas hipóteses experimentais, talvez valha mais aumentar bastante o modelo do que insistir em muito mais dados.",
      paragraphs: [
        "No trabalho de Kaplan, uma conclusão marcante foi que modelos maiores pareciam ser mais sample-efficient, levando à ideia de que, sob compute fixo e naquele regime experimental, seria vantajoso escalar parâmetros mais agressivamente do que tokens. Essa leitura influenciou fortemente a fase inicial da corrida por modelos gigantes.",
        "Esse resultado foi extremamente importante historicamente, mas não encerrou a questão. Ele refletia um regime experimental específico e escolhas de análise que depois seriam reavaliadas por trabalhos posteriores.",
        "A boa leitura pedagógica aqui é: Kaplan mostrou que escala importa e formalizou isso com enorme impacto. O debate posterior refinou qual tipo de escala é mais eficiente em certos budgets.",
      ],
      blocks: [
        {
          type: "mistake",
          title: "Erro comum",
          body:
            "Ler Kaplan como prova eterna de que basta inflar parâmetros. O artigo foi seminal, mas não é a palavra final sobre alocação ótima de compute.",
        },
      ],
    },
    {
      id: "chinchilla",
      eyebrow: "Correção importante",
      title: "Chinchilla argumentou que, para o regime estudado, muitos modelos estavam grandes demais para a quantidade de tokens vistos",
      lead:
        "Hoffmann e colegas reformularam a questão e defenderam que vários modelos célebres eram, na prática, subtreinados.",
      interactive: "compute-allocation-lab",
      paragraphs: [
        "O ponto central de Chinchilla foi que, para compute ótimo no regime analisado, não bastava perguntar quantos parâmetros usar. Era preciso perguntar quantos tokens aquele modelo deveria ver para aproveitar melhor o budget disponível. A conclusão prática foi que muitos modelos estavam grandes, mas tinham visto menos tokens do que esse regime compute-optimal sugeriria para sua escala.",
        "Isso alterou a estratégia de design. Em vez de sempre crescer parâmetros o máximo possível, tornou-se mais atraente buscar um equilíbrio melhor entre tamanho do modelo e quantidade de dados de treino.",
        "O mérito de Chinchilla não foi 'desmentir' a importância de escala, e sim refinar a noção de escala eficiente. A discussão saiu de 'mais parâmetros' para 'melhor alocação entre parâmetros e tokens'.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Modelo subtreinado",
          body:
            "Modelo cuja capacidade é grande para o orçamento usado, mas que viu dados insuficientes para converter plenamente essa capacidade em redução de loss.",
        },
        {
          type: "insight",
          title: "Escalar bem não é inflar um único eixo",
          body:
            "Compute ótimo depende de equilíbrio entre tamanho do modelo e quantidade de treino, não de um crescimento cego em apenas um deles.",
        },
      ],
    },
    {
      id: "qualidade-dados",
      eyebrow: "Dados",
      title: "Mais tokens só ajudam plenamente quando o corpus é bem curado",
      lead:
        "Contar tokens é importante, mas tratar qualquer token como igualmente útil é um erro de engenharia.",
      visual: "comparison",
      paragraphs: [
        "Corpus de pré-treinamento não é apenas um monte de texto bruto. Duplicações, spam, ruído, conteúdo quase idêntico, mistura desequilibrada de fontes e problemas de limpeza afetam o quanto os tokens realmente ensinam.",
        "Por isso deduplicação, filtragem, mistura de domínios e curadoria de qualidade tornaram-se partes críticas do pipeline. Um aumento bruto de volume pode render menos do que o esperado se boa parte do material for redundante ou pouco informativo.",
        "Scaling laws nos lembra que tokens importam; engenharia de dados nos lembra que tokens não são todos equivalentes.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Curadoria de corpus",
          body:
            "Conjunto de processos de seleção, filtragem, deduplicação e balanceamento usados para tornar o pré-treinamento mais eficiente e menos ruidoso.",
        },
        {
          type: "example",
          title: "Deduplicação",
          body:
            "Se o mesmo texto aparece repetido muitas vezes, o modelo pode desperdiçar compute revisitando quase a mesma evidência em vez de ampliar cobertura.",
        },
      ],
    },
    {
      id: "tradeoffs-praticos",
      eyebrow: "Engenharia",
      title: "Compute ótimo não é o mesmo que produto ótimo",
      lead:
        "Mesmo quando uma alocação é boa para pré-treino, ainda existem custos de inferência, fine-tuning e implantação.",
      visual: "tradeoff",
      interactive: "scaling-scenarios",
      paragraphs: [
        "Um modelo menor, porém melhor treinado em dados suficientes, pode ser preferível em vários cenários porque também reduz custo de inferência, memória e ajuste downstream. Ou seja: eficiência de pré-treino conversa com eficiência operacional do produto.",
        "Essa perspectiva ajudou a tornar o argumento de Chinchilla especialmente influente. O ponto não era apenas melhorar a loss; era também produzir modelos mais úteis por unidade de compute ao longo do ciclo de vida.",
        "Na prática, escolher o ponto de escala envolve pesquisa, orçamento, latência, objetivos comerciais e restrições ambientais. Scaling laws informa a decisão, mas não decide sozinha.",
      ],
      blocks: [
        {
          type: "insight",
          title: "Treino e inferência fazem parte da mesma economia",
          body:
            "O melhor desenho de um LLM não é apenas o que aprende mais; é o que faz sentido no uso final, inclusive em custo de servir o modelo.",
        },
      ],
    },
    {
      id: "cuidado-com-slogans",
      eyebrow: "Interpretação",
      title: "Scaling laws não significa que 'quanto maior, melhor' sem contexto",
      lead:
        "Os resultados são poderosos, mas viram caricatura quando usados como slogan universal.",
      visual: "checklist",
      paragraphs: [
        "Há regimes onde arquitetura, objetivo, dados, avaliação e eficiência de sistema alteram bastante o retorno de escalar. Além disso, métricas agregadas de loss não capturam tudo o que nos importa em segurança, factualidade, robustez ou utilidade prática.",
        "Também existe o risco de confundir correlação histórica com inevitabilidade técnica. A escala foi transformadora, mas seu retorno depende de muitos detalhes de implementação, limpeza de dados e desenho experimental.",
        "A leitura madura é: scaling laws é uma ferramenta muito forte para planejamento e intuição, não uma licença para desligar o pensamento crítico sobre dados e objetivos.",
      ],
      blocks: [
        {
          type: "mistake",
          title: "Erro comum",
          body:
            "Usar scaling laws como desculpa para ignorar qualidade de dados, avaliação e alinhamento, como se tudo fosse resolvido apenas com mais FLOPs.",
        },
      ],
    },
    {
      id: "resumo",
      eyebrow: "Síntese",
      title: "Resumo visual do tema",
      lead:
        "Pré-treinamento melhora com escala, mas eficiência surge do balanço entre parâmetros, tokens, compute e qualidade do corpus.",
      interactive: "summary-cards",
      paragraphs: [
        "Guarde este mapa: Kaplan mostrou a regularidade da escala; Chinchilla refinou a alocação ótima; a engenharia moderna acrescentou a lição de que dados curados e custos de sistema importam tanto quanto contar parâmetros.",
      ],
    },
    {
      id: "quiz-revisao",
      eyebrow: "Revisão",
      title: "Quiz de revisão",
      lead:
        "Revise pré-treinamento, scaling laws, subtreino, Chinchilla e a diferença entre volume e qualidade de dados.",
      interactive: "quiz",
      paragraphs: [
        "O objetivo é saber raciocinar sobre trade-offs de escala, não decorar slogans ou números famosos.",
      ],
    },
    {
      id: "glossario",
      eyebrow: "Vocabulário",
      title: "Glossário essencial",
      lead:
        "Consolide os termos que aparecem em discussões técnicas sobre pré-treinamento e eficiência de escala em LLMs.",
      interactive: "glossary",
      paragraphs: [
        "Esse vocabulário ajuda bastante na leitura de papers, blogs técnicos e relatórios de treinamento.",
      ],
    },
  ],
  summaryCards: [
    {
      title: "Pré-treinamento é a base estatística",
      body:
        "A maior parte da capacidade linguística ampla do modelo é adquirida ao reduzir erro de previsão em corpora massivos.",
    },
    {
      title: "Scaling laws trazem previsibilidade",
      body:
        "Loss tende a seguir padrões regulares quando escalamos parâmetros, dados e compute em certos regimes.",
    },
    {
      title: "Kaplan formalizou a conversa",
      body:
        "O trabalho foi decisivo para mostrar que escala não é caos completo: há regularidades empíricas úteis.",
    },
    {
      title: "Chinchilla refinou o ótimo",
      body:
        "A correção central foi mostrar que, naquele regime de análise, muitos modelos grandes estavam subtreinados e se beneficiariam de mais tokens ou de um modelo menor para o mesmo budget.",
    },
    {
      title: "Dados bons valem mais que tokens brutos",
      body:
        "Curadoria, deduplicação e mistura de fontes afetam o quanto o pré-treinamento realmente aprende por FLOP gasto.",
    },
  ],
  quiz: [
    {
      id: "q1",
      prompt: "O que é pré-treinamento em LLMs, de forma simplificada?",
      options: [
        { id: "a", label: "Treinar o modelo em larga escala para prever o próximo token em grandes corpora." },
        { id: "b", label: "Ajustar o modelo apenas com preferências humanas." },
        { id: "c", label: "Executar a inferência várias vezes sem atualizar pesos." },
      ],
      correctOptionId: "a",
      feedback:
        "Pré-treinamento é a etapa massiva em que a base estatística do modelo é construída por previsão de próximo token.",
    },
    {
      id: "q2",
      prompt: "O que uma scaling law descreve?",
      options: [
        { id: "a", label: "Uma regularidade empírica entre desempenho e fatores como parâmetros, dados e compute." },
        { id: "b", label: "Uma garantia teórica absoluta para qualquer arquitetura possível." },
        { id: "c", label: "Uma regra de alinhamento com preferências humanas." },
      ],
      correctOptionId: "a",
      feedback:
        "Scaling laws são padrões empíricos observados em regimes de escala, não garantias universais e eternas.",
    },
    {
      id: "q3",
      prompt: "Por que um modelo pode ser considerado subtreinado?",
      options: [
        { id: "a", label: "Porque sua capacidade é grande, mas ele viu dados insuficientes para aproveitar bem o budget de compute." },
        { id: "b", label: "Porque seu vocabulário é pequeno demais." },
        { id: "c", label: "Porque sempre que um modelo é grande ele é automaticamente subtreinado." },
      ],
      correctOptionId: "a",
      feedback:
        "A noção de subtreino discutida por Chinchilla é justamente essa: muitos parâmetros, mas relativamente poucos tokens vistos para o budget usado.",
    },
    {
      id: "q4",
      prompt: "Qual foi a contribuição histórica central de Kaplan?",
      options: [
        { id: "a", label: "Popularizar e quantificar scaling laws para modelos de linguagem em larga escala." },
        { id: "b", label: "Introduzir RLHF para seguir instruções." },
        { id: "c", label: "Criar o Transformer original." },
      ],
      correctOptionId: "a",
      feedback:
        "Kaplan ajudou a transformar a escala em um objeto mais previsível e mensurável para engenharia de LLMs.",
    },
    {
      id: "q5",
      prompt: "Qual foi a correção importante trazida por Chinchilla?",
      options: [
        { id: "a", label: "Que muitos modelos estavam grandes demais para a quantidade de dados vista naquele regime e precisavam de melhor equilíbrio entre parâmetros e tokens." },
        { id: "b", label: "Que mais dados nunca ajudam." },
        { id: "c", label: "Que scaling laws não existem." },
      ],
      correctOptionId: "a",
      feedback:
        "A tese central foi que, para budgets comparáveis no regime estudado, a alocação compute-optimal exigia mais dados do que muitos modelos grandes estavam vendo no regime anterior.",
    },
    {
      id: "q6",
      prompt: "Por que quantidade de tokens e qualidade de dados não são a mesma coisa?",
      options: [
        { id: "a", label: "Porque duplicação, ruído e mistura ruim de fontes podem reduzir o valor de muitos tokens adicionais." },
        { id: "b", label: "Porque um token ruim não é contado no budget." },
        { id: "c", label: "Porque qualidade só importa em alinhamento, não em pré-treino." },
      ],
      correctOptionId: "a",
      feedback:
        "Volume bruto sem curadoria pode desperdiçar compute em conteúdo redundante, espúrio ou pouco informativo.",
    },
    {
      id: "q7",
      prompt: "Por que um modelo menor, porém melhor treinado, pode ser preferível?",
      options: [
        { id: "a", label: "Porque pode equilibrar melhor desempenho, custo de inferência e eficiência de uso do compute." },
        { id: "b", label: "Porque modelos grandes nunca são úteis." },
        { id: "c", label: "Porque scaling laws favorecem sempre modelos pequenos." },
      ],
      correctOptionId: "a",
      feedback:
        "A engenharia real considera não só a loss de pré-treino, mas também custo operacional, memória e uso downstream.",
    },
    {
      id: "q8",
      prompt: "Qual leitura é mais madura sobre scaling laws?",
      options: [
        { id: "a", label: "Elas são guias poderosos de planejamento, mas não dispensam pensar criticamente sobre dados, métricas e objetivos." },
        { id: "b", label: "Elas provam que só compute importa." },
        { id: "c", label: "Elas tornam irrelevante a curadoria de corpus." },
      ],
      correctOptionId: "a",
      feedback:
        "Scaling laws ajudam a planejar melhor a escala, mas não substituem qualidade de dados, avaliação e desenho de sistema.",
    },
  ],
  glossary: [
    { term: "Pré-treinamento", definition: "Treino inicial em larga escala no qual o modelo aprende regularidades gerais por previsão de próximo token." },
    { term: "Scaling law", definition: "Relação empírica entre desempenho e fatores como parâmetros, dados e compute." },
    { term: "Power law", definition: "Padrão matemático aproximado em que uma grandeza varia como potência de outra, muito usado para descrever trends de escala." },
    { term: "Compute budget", definition: "Orçamento total de computação disponível para treinar um modelo." },
    { term: "Modelo subtreinado", definition: "Modelo cuja capacidade não foi plenamente explorada porque viu dados insuficientes para o budget usado." },
    { term: "Sample efficiency", definition: "Capacidade de extrair mais aprendizado útil por unidade de dado observada." },
    { term: "Chinchilla", definition: "Apelido do trabalho de Hoffmann et al. sobre treinamento compute-optimal e melhor equilíbrio entre parâmetros e tokens." },
    { term: "Kaplan scaling laws", definition: "Conjunto de observações empíricas de Kaplan et al. sobre como loss escala com tamanho do modelo, dados e compute." },
    { term: "Curadoria de corpus", definition: "Processo de selecionar, filtrar, deduplicar e balancear dados para pré-treinamento." },
    { term: "Deduplicação", definition: "Remoção de exemplos redundantes ou quase idênticos do corpus de treino." },
    { term: "Corpus", definition: "Conjunto de textos usado para treinar ou avaliar um modelo de linguagem." },
    { term: "Custo de inferência", definition: "Recursos necessários para usar o modelo já treinado em produção ou experimentação downstream." },
  ],
};
