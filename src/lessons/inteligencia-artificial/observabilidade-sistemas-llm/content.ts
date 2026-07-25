import type { LessonContent } from "../../../types/content";

export const observabilidadeSistemasLlmContent: LessonContent = {
  id: "observabilidade-sistemas-llm",
  title: "Observabilidade de Sistemas LLM",
  subtitle:
    "Como enxergar o que um sistema com LLMs realmente fez, medir qualidade com evidência e reagir a falhas antes que elas se tornem comportamento normal em produção.",
  description:
    "Uma aula avançada sobre observabilidade de sistemas LLM, cobrindo tracing, métricas, avaliação offline e online, datasets versionados, alertas, incidentes e limites de interpretação de sinais.",
  primaryCategoryId: "inteligencia-artificial",
  secondaryCategoryId: "engenharia",
  level: "Avançado",
  estimatedTime: "50-65 min",
  tags: [
    "Observabilidade",
    "Tracing",
    "Evals",
    "Monitoramento",
    "LLMOps",
    "Produção",
  ],
  learningObjectives: [
    "Definir observabilidade em sistemas com LLMs para além de logs básicos.",
    "Distinguir tracing, métricas, logs e avaliações de qualidade.",
    "Entender a utilidade de spans, traces e semânticas específicas para apps com LLM.",
    "Comparar avaliação offline e monitoramento online em produção.",
    "Reconhecer a importância de dataset versionado e experimentação repetível.",
    "Projetar alertas e gates de release que não dependam apenas de feeling.",
    "Interpretar limites de métricas proxy e evitar Goodhart em sistemas de IA.",
  ],
  prerequisites: [
    "Noção básica de pipelines com LLMs, ferramentas ou retrieval.",
    "Familiaridade geral com logs, métricas ou monitoramento em software.",
    "Entender que qualidade percebida do usuário nem sempre coincide com métricas internas simples.",
  ],
  references: [
    {
      title: "OpenTelemetry Documentation",
      source: "OpenTelemetry",
      url: "https://opentelemetry.io/docs/",
      note:
        "Base conceitual para tracing distribuído e instrumentação observável de sistemas.",
    },
    {
      title: "OpenInference",
      source: "Arize AI / Open Source",
      url: "https://github.com/Arize-ai/openinference",
      note:
        "Convenções semânticas voltadas a observabilidade específica de aplicações com LLMs.",
    },
    {
      title: "Overview: Tracing - Phoenix",
      source: "Arize Phoenix Docs",
      url: "https://arize.com/docs/phoenix/tracing/llm-traces",
      note:
        "Boa referência prática para tracing de aplicações com LLM, retrieval e tool use.",
    },
    {
      title: "LangSmith observability",
      source: "LangSmith Docs",
      url: "https://docs.langchain.com/langsmith/observability",
      note:
        "Material prático sobre rastreamento, depuração e comparação de runs de aplicações LLM.",
    },
    {
      title: "Holistic Evaluation of Language Models",
      source: "Liang et al., 2022 — arXiv",
      url: "https://arxiv.org/abs/2211.09110",
      note:
        "Referência importante para pensar avaliação ampla em vez de uma métrica única e estreita.",
    },
    {
      title: "Building effective agents",
      source: "Anthropic Engineering",
      url: "https://www.anthropic.com/engineering/building-effective-agents",
      note:
        "Ajuda a conectar observabilidade a workflows, ferramentas e falhas reais de sistemas agenticos.",
    },
  ],
  heroVisual: "hero",
  openingText:
    "Sistemas com LLMs são difíceis de depurar porque parte do comportamento emerge de interação entre prompt, modelo, retrieval, ferramentas, dados do usuário e política de produto. Se algo piora, nem sempre a resposta está no último log do servidor. Observabilidade, nesse contexto, significa reconstruir o caminho da execução com granularidade suficiente para responder perguntas úteis: qual prompt entrou, que documentos foram recuperados, qual ferramenta foi chamada, por que o modelo escolheu esse caminho, onde a latência explodiu, em que dataset a regressão já aparecia e se o problema é de qualidade, custo ou segurança. Sem essa visibilidade, ajustes de produção viram adivinhação cara.",
  quickFacts: [
    {
      title: "Log nao basta",
      body:
        "Texto cru de entrada e saída raramente explica onde um pipeline com retrieval, ferramentas e múltiplos passos começou a falhar.",
    },
    {
      title: "Qualidade tambem e telemetria",
      body:
        "Observabilidade em LLMs precisa unir execução técnica e sinais de qualidade, não só CPU, memória e status HTTP.",
    },
    {
      title: "Métrica proxy pode enganar",
      body:
        "Uma taxa interna melhor pode esconder piora real para o usuário se você medir o alvo errado.",
    },
  ],
  sections: [
    {
      id: "motivacao",
      eyebrow: "Diagnostico",
      title: "Por que sistemas com LLMs sao mais opacos do que APIs tradicionais",
      lead:
        "Porque parte do comportamento emerge da composicao entre componentes probabilisticos, contexto dinamico e dados externos.",
      visual: "hero",
      paragraphs: [
        "Em uma API tradicional, bugs costumam ter trajetórias mais lineares: uma entrada inválida, uma exceção, um timeout. Em sistemas com LLMs, o sintoma final pode surgir de uma combinação sutil entre prompt, contexto recuperado, temperatura, escolha de ferramenta e resumo da saída.",
        "Além disso, qualidade não é só disponibilidade. Um sistema pode responder rápido e com status 200, mas ainda assim estar alucinando, recuperando contexto irrelevante, ignorando políticas ou gastando tokens de forma absurda.",
        "Observabilidade de LLMs precisa, portanto, responder tanto perguntas de engenharia quanto perguntas de comportamento.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Observabilidade",
          body:
            "Capacidade de inferir o estado interno e o comportamento de um sistema a partir de sinais externos suficientemente ricos, como traces, métricas, logs e avaliações.",
        },
      ],
    },
    {
      id: "tracing",
      eyebrow: "Execucao",
      title: "Tracing reconstrói o caminho real da resposta",
      lead:
        "Sem rastrear spans, dependencias e tempos de cada etapa, o sistema vira uma caixa-preta com entrada e saida bonitas.",
      visual: "pipeline",
      interactive: "trace-coverage-lab",
      paragraphs: [
        "Tracing divide uma execução em spans: chamada ao modelo, retrieval, reranking, uso de ferramenta, pós-processamento, filtros e envio da resposta. Cada span registra duração, entradas relevantes, outputs resumidos, erros e relações com outros spans.",
        "Esse nível de detalhe permite responder perguntas como: a latência veio do modelo ou da busca? O documento ruim foi recuperado antes do erro factual? O tool call falhou por argumento inválido ou por indisponibilidade do sistema externo?",
        "Em aplicações com LLMs, tracing não é luxo. É o equivalente de abrir o encanamento e ver por onde a água passou.",
      ],
      blocks: [
        {
          type: "insight",
          title: "Trace bom narra causalidade operacional",
          body:
            "Ele não mostra apenas que o sistema demorou; mostra qual etapa demorou, com que insumo e em que relação com o restante do fluxo.",
        },
      ],
    },
    {
      id: "metricas-logs-e-evals",
      eyebrow: "Sinais",
      title: "Logs, métricas, traces e evals respondem perguntas diferentes",
      lead:
        "Misturar tudo em um painel unico sem semantica costuma produzir mais ruido do que clareza.",
      visual: "concept",
      paragraphs: [
        "Logs são úteis para registrar eventos, payloads resumidos e erros textuais. Métricas condensam comportamento agregado, como latência média, taxa de erro, custo por request ou uso de determinada ferramenta. Traces conectam essas peças por request ou run.",
        "Avaliações entram em outro plano: elas tentam medir qualidade do comportamento. Podem olhar factualidade, aderência a política, precisão de extração, utilidade percebida, groundedness ou qualquer outro critério relevante ao produto.",
        "Um sistema observável cruza essas camadas. Nem toda piora de qualidade gera erro técnico; nem todo spike técnico destrói qualidade. Precisamos enxergar os dois mundos juntos.",
      ],
      blocks: [
        {
          type: "mistake",
          title: "Erro comum",
          body:
            "Concluir que o sistema está saudável só porque a latência e o uptime parecem bons, ignorando drift de qualidade.",
        },
      ],
    },
    {
      id: "datasets-experimentos",
      eyebrow: "Reprodutibilidade",
      title: "Sem datasets versionados, comparar mudancas vira memoria subjetiva do time",
      lead:
        "Toda evolucao seria de LLM deveria poder ser reavaliada contra um conjunto conhecido de casos representativos.",
      visual: "comparison",
      paragraphs: [
        "Quando prompts, modelos, retrievers ou políticas mudam, precisamos medir o efeito dessas mudanças em exemplos representativos. Isso exige datasets versionados, com casos difíceis, falhas históricas, entradas reais anonimizadas e critérios claros de avaliação.",
        "Sem essa base, o time depende de impressões dispersas: 'parece melhor', 'um cliente reclamou menos', 'o demo ficou bom'. Isso é fraco demais para orientar release em sistemas sensíveis.",
        "Observabilidade madura conversa com experimentação. O que aparece como incidente em produção deve voltar para o conjunto de avaliação; o que melhora no laboratório precisa ser rastreável até os runs reais que justificaram a mudança.",
      ],
      blocks: [
        {
          type: "example",
          title: "Ciclo saudável",
          body:
            "Uma falha vista em produção vira caso de teste versionado. A próxima alteração só entra em release se não regredir nesse caso e nos demais relevantes.",
        },
      ],
    },
    {
      id: "offline-online",
      eyebrow: "Qualidade",
      title: "Avaliação offline e observacao online se complementam",
      lead:
        "Offline testa hipoteses com controle; online revela interacoes do mundo real que o laboratório ainda nao antecipou.",
      visual: "tradeoff",
      interactive: "eval-mix-scenarios",
      paragraphs: [
        "Avaliação offline é ótima para comparar variantes com repetibilidade. Você controla inputs, critérios e baseline. Isso é excelente para decidir entre prompts, modelos, retrievers e versões de política.",
        "Mas produção traz distribuição viva: usuários imprevistos, documentos novos, combinações esquisitas de contexto e casos de borda que não estavam no dataset. Sem observação online, o sistema pode passar em benchmark e fracassar no mundo.",
        "A maturidade está em fechar o ciclo. Offline orienta releases; online revela lacunas do offline; essas lacunas voltam para o conjunto de avaliação.",
      ],
      blocks: [
        {
          type: "insight",
          title: "Offline sem online vira laboratório cego",
          body:
            "Online sem offline vira reação caótica a sintomas. Os dois lados precisam conversar.",
        },
      ],
    },
    {
      id: "alertas-gates",
      eyebrow: "Operacao",
      title: "Alertas e gates de release transformam sinal em acao",
      lead:
        "Observabilidade so vira confiabilidade quando os sinais gatilham decisoes concretas de bloqueio, rollback, triagem ou revisao humana.",
      visual: "checklist",
      interactive: "alerting-lab",
      paragraphs: [
        "Não basta coletar traces e painéis bonitos. É preciso definir limiares: aumento anormal de falha em tool calls, queda de groundedness, subida de custo por request, piora de score em dataset crítico ou explosão de latência em um estágio específico.",
        "Esses sinais podem bloquear release, acionar incidentes, reduzir tráfego, abrir modo degradado ou exigir aprovação humana temporária. O importante é que observabilidade gere resposta operacional, não só documentação póstuma.",
        "Ao mesmo tempo, alertas mal calibrados cansam o time. Excesso de ruído faz com que ninguém reaja quando o alerta certo finalmente chega.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Release gate",
          body:
            "Condição objetiva que uma mudança precisa satisfazer para avançar, baseada em qualidade, custo, segurança ou desempenho.",
        },
      ],
    },
    {
      id: "incidentes-causa-raiz",
      eyebrow: "Resposta a falhas",
      title: "Incidentes em LLMs raramente têm causa unica",
      lead:
        "A depuracao eficaz exige correlacionar comportamento do modelo, contexto, ferramentas e politica do produto.",
      paragraphs: [
        "Uma resposta errada pode ter vindo de retrieval ruim, resumo excessivo, ferramenta com schema ambíguo, mudança de prompt, regressão do modelo, temperatura alta ou combinação de tudo isso. Sem trace e sem casos reproduzíveis, a análise vira disputa de palpites.",
        "Causa raiz em LLMs é frequentemente sistêmica. O modelo pode apenas ter sido o último elo visível de um pipeline que começou a falhar muito antes. Por isso, as equipes mais maduras investigam o fluxo inteiro, não só o texto final exibido ao usuário.",
        "Essa postura reduz a tendência de culpar genericamente 'a IA' quando o problema real estava em um documento recuperado, em um cache vencido ou em uma política mal formulada.",
      ],
      blocks: [
        {
          type: "example",
          title: "Erro com várias camadas",
          body:
            "Uma resposta desatualizada pode ter surgido porque o retriever trouxe documento antigo e o modelo, obedientemente, resumiu exatamente essa fonte antiga.",
        },
      ],
    },
    {
      id: "blind-spots",
      eyebrow: "Limites",
      title: "Toda métrica proxy pode ser otimizada do jeito errado",
      lead:
        "Se voce mede um atalho, o sistema aprende a parecer melhor naquela medicao sem necessariamente melhorar para o usuario.",
      paragraphs: [
        "Esse é um ponto clássico de observabilidade e avaliação: a métrica escolhida molda o comportamento do time e do sistema. Se medimos apenas uma proxy estreita, podemos melhorar o número enquanto degradamos a experiência real.",
        "Em sistemas LLM, isso aparece quando otimizamos só latência e sacrificamos groundedness, só taxa de conclusão e sacrificamos precisão, ou só score de um avaliador automático e sacrificamos legibilidade e utilidade prática.",
        "Por isso, observabilidade madura usa múltiplos sinais, reconhece conflitos entre métricas e aceita que nenhum dashboard substitui totalmente revisão qualitativa e contato com uso real.",
      ],
      blocks: [
        {
          type: "insight",
          title: "Painel nao e verdade total",
          body:
            "Dashboards são mapas de interesse, não o território completo do comportamento do sistema.",
        },
      ],
    },
    {
      id: "resumo",
      eyebrow: "Sintese",
      title: "Mapa mental da observabilidade em LLMs",
      lead:
        "Rastreie o caminho da execucao, meca qualidade com contexto e feche o ciclo entre producao, dataset e release.",
      interactive: "summary-cards",
      paragraphs: [
        "Observabilidade útil em IA combina telemetria técnica, avaliação de comportamento e mecanismos concretos de reação operacional.",
      ],
    },
    {
      id: "quiz-revisao",
      eyebrow: "Revisao",
      title: "Quiz de revisão",
      lead:
        "Cheque se ficaram claros os papéis de tracing, evals, alertas e análise de causa raiz.",
      interactive: "quiz",
      paragraphs: [
        "A meta é desenvolver intuição operacional para sistemas com LLMs, não apenas decorar jargões de observabilidade.",
      ],
    },
    {
      id: "glossario",
      eyebrow: "Vocabulário",
      title: "Glossário essencial",
      lead:
        "Termos básicos para acompanhar conversas técnicas sobre monitoramento e depuração de sistemas LLM.",
      interactive: "glossary",
      paragraphs: [
        "Use este glossário para distinguir sinais técnicos, sinais de qualidade e mecanismos de resposta.",
      ],
    },
  ],
  summaryCards: [
    {
      title: "Observabilidade em LLMs vai alem de logs",
      body:
        "Precisamos rastrear passos do pipeline, sinais técnicos e qualidade comportamental para realmente entender o sistema.",
    },
    {
      title: "Tracing reconstrói a execução",
      body:
        "Spans e traces mostram onde a resposta passou, quanto custou e em que etapa ocorreu a degradação.",
    },
    {
      title: "Evals completam o quadro",
      body:
        "Latência e uptime não revelam sozinhos factualidade, groundedness, utilidade ou aderência a política.",
    },
    {
      title: "Produção alimenta o laboratório",
      body:
        "Falhas observadas online devem virar casos versionados para comparação futura e prevenção de regressões.",
    },
    {
      title: "Métrica proxy exige humildade",
      body:
        "Nenhum número isolado representa qualidade total; múltiplos sinais e revisão qualitativa continuam necessários.",
    },
  ],
  quiz: [
    {
      id: "q1",
      prompt: "Por que observabilidade de LLMs vai além de logs simples?",
      options: [
        { id: "a", label: "Porque precisamos entender múltiplas etapas, contexto dinâmico e qualidade comportamental do sistema." },
        { id: "b", label: "Porque logs deixaram de existir." },
        { id: "c", label: "Porque métricas técnicas não importam mais." },
      ],
      correctOptionId: "a",
      feedback:
        "LLMs participam de pipelines probabilísticos e compostos; entender o sistema exige mais do que registrar entrada e saída brutas.",
    },
    {
      id: "q2",
      prompt: "Qual é o papel principal do tracing?",
      options: [
        { id: "a", label: "Reconstruir o caminho da execução e a relação entre etapas, tempos e falhas." },
        { id: "b", label: "Substituir toda necessidade de métricas agregadas." },
        { id: "c", label: "Medir apenas custo financeiro mensal." },
      ],
      correctOptionId: "a",
      feedback:
        "Tracing mostra a causalidade operacional de cada request ou run, algo que logs soltos não capturam bem.",
    },
    {
      id: "q3",
      prompt: "O que logs, métricas, traces e evals têm em comum?",
      options: [
        { id: "a", label: "São sinais complementares que respondem perguntas diferentes sobre o sistema." },
        { id: "b", label: "São todos equivalentes e intercambiáveis." },
        { id: "c", label: "Servem apenas para auditoria financeira." },
      ],
      correctOptionId: "a",
      feedback:
        "Cada camada ilumina um aspecto do comportamento técnico ou qualitativo do sistema; juntas, oferecem um retrato melhor.",
    },
    {
      id: "q4",
      prompt: "Por que datasets versionados são importantes?",
      options: [
        { id: "a", label: "Porque permitem comparar mudanças de forma repetível em casos representativos." },
        { id: "b", label: "Porque eliminam a necessidade de produção." },
        { id: "c", label: "Porque reduzem automaticamente toda latência." },
      ],
      correctOptionId: "a",
      feedback:
        "Sem base versionada, o time perde reprodutibilidade e passa a comparar mudanças por impressão subjetiva.",
    },
    {
      id: "q5",
      prompt: "Como offline e online se relacionam em observabilidade de LLMs?",
      options: [
        { id: "a", label: "Offline ajuda a comparar hipóteses; online revela comportamentos vivos e alimenta novos casos de teste." },
        { id: "b", label: "Um torna o outro desnecessário." },
        { id: "c", label: "Online serve só para medir CPU." },
      ],
      correctOptionId: "a",
      feedback:
        "A maturidade está no ciclo entre experimento controlado e realidade de produção.",
    },
    {
      id: "q6",
      prompt: "O que um release gate faz?",
      options: [
        { id: "a", label: "Bloqueia ou condiciona mudanças com base em critérios objetivos de qualidade, custo ou segurança." },
        { id: "b", label: "Aumenta o tamanho do prompt." },
        { id: "c", label: "Substitui qualquer análise humana." },
      ],
      correctOptionId: "a",
      feedback:
        "Observabilidade vira ação quando sinais concretos influenciam liberação, rollback e triagem.",
    },
    {
      id: "q7",
      prompt: "Por que incidentes com LLMs costumam ter causa sistêmica?",
      options: [
        { id: "a", label: "Porque o erro final pode resultar da interação entre modelo, contexto, ferramentas e políticas." },
        { id: "b", label: "Porque o modelo sempre é o único culpado." },
        { id: "c", label: "Porque tracing impede qualquer investigação." },
      ],
      correctOptionId: "a",
      feedback:
        "Culpar genericamente o modelo costuma esconder falhas anteriores do pipeline que o trace ajuda a revelar.",
    },
    {
      id: "q8",
      prompt: "Qual é o perigo de otimizar uma métrica proxy estreita?",
      options: [
        { id: "a", label: "Melhorar o número sem melhorar, ou até piorando, a experiência real do usuário." },
        { id: "b", label: "Eliminar toda necessidade de produto." },
        { id: "c", label: "Impedir observabilidade distribuída." },
      ],
      correctOptionId: "a",
      feedback:
        "Esse é um caso clássico de Goodhart: o indicador vira alvo e deixa de representar bem o objetivo real.",
    },
  ],
  glossary: [
    { term: "Observabilidade", definition: "Capacidade de entender o comportamento interno do sistema por sinais externos ricos e correlacionáveis." },
    { term: "Trace", definition: "Representação de uma execução ponta a ponta, normalmente composta por múltiplos spans relacionados." },
    { term: "Span", definition: "Unidade de trabalho dentro de um trace, como uma chamada ao modelo, retrieval ou tool call." },
    { term: "Métrica", definition: "Sinal agregado e quantificável do sistema, como latência, custo, taxa de erro ou groundedness médio." },
    { term: "Log", definition: "Registro textual ou estruturado de eventos, entradas, saídas e mensagens de erro." },
    { term: "Eval", definition: "Procedimento de avaliação de qualidade do comportamento do sistema em um critério específico." },
    { term: "Offline evaluation", definition: "Avaliação executada em conjuntos controlados e repetíveis fora do tráfego real de produção." },
    { term: "Online monitoring", definition: "Observação contínua do comportamento do sistema em produção, sob uso real." },
    { term: "Release gate", definition: "Condição obrigatória de qualidade, custo, desempenho ou segurança para liberar uma mudança." },
    { term: "Drift", definition: "Mudança gradual na distribuição de entradas, comportamento do sistema ou qualidade percebida ao longo do tempo." },
    { term: "Causa raiz", definition: "Explicação fundamental e verificável para um incidente, indo além do sintoma final observado." },
    { term: "Métrica proxy", definition: "Indicador indireto usado para aproximar um objetivo mais complexo, com risco de representar mal a realidade." },
  ],
};
