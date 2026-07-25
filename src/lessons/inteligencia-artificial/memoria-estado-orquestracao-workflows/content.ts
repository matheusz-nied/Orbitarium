import type { LessonContent } from "../../../types/content";

export const memoriaEstadoOrquestracaoWorkflowsContent: LessonContent = {
  id: "memoria-estado-orquestracao-workflows",
  title: "Memória, Estado e Orquestração de Workflows",
  subtitle:
    "Como fazer sistemas com LLMs lembrarem o que importa, coordenarem etapas complexas e sobreviverem a falhas sem perder coerência.",
  description:
    "Uma aula avançada sobre memória, estado e orquestração de workflows em sistemas com LLMs, cobrindo tipos de memória, grafos de execução, durabilidade, checkpoints, idempotência e coordenação entre passos.",
  primaryCategoryId: "inteligencia-artificial",
  secondaryCategoryId: "engenharia",
  level: "Avançado",
  estimatedTime: "50-65 min",
  tags: [
    "Memória",
    "Estado",
    "Workflows",
    "Orquestração",
    "Durabilidade",
    "Agentes",
  ],
  learningObjectives: [
    "Distinguir memória e estado em sistemas com LLMs.",
    "Comparar memória de curto prazo, memória persistente e contexto recuperado.",
    "Entender por que workflows explícitos importam em tarefas longas ou com efeitos externos.",
    "Explicar durabilidade, retry, checkpoint e idempotência em pipelines de IA.",
    "Reconhecer riscos de concorrência, duplicação e efeitos colaterais não controlados.",
    "Avaliar quando um grafo simples basta e quando um orquestrador durável se justifica.",
    "Projetar sistemas mais auditáveis e recuperáveis em vez de depender apenas do contexto da janela do modelo.",
  ],
  prerequisites: [
    "Familiaridade geral com agentes e uso de ferramentas por LLMs.",
    "Noção básica de APIs, filas, tarefas assíncronas ou processamento em múltiplos passos.",
    "Entender que janelas de contexto têm limite e não substituem arquitetura de execução.",
  ],
  references: [
    {
      title: "MEMGPT: Towards LLMs as Operating Systems",
      source: "Packer et al., 2023 — arXiv",
      url: "https://arxiv.org/abs/2310.08560",
      note:
        "Referência importante para pensar memória hierárquica e gestão explícita de contexto em agentes.",
    },
    {
      title: "LangGraph overview",
      source: "LangChain / LangGraph Docs",
      url: "https://docs.langchain.com/oss/python/langgraph/overview",
      note:
        "Apresenta modelagem de fluxo com estado e grafos, útil para sistemas agenticos controlados.",
    },
    {
      title: "Temporal Workflows",
      source: "Temporal Docs",
      url: "https://docs.temporal.io/workflows",
      note:
        "Referência prática para durabilidade, reexecução lógica e recuperação de workflows longos.",
    },
    {
      title: "Temporal LangGraph integration",
      source: "Temporal Docs",
      url: "https://docs.temporal.io/develop/python/integrations/langgraph",
      note:
        "Mostra como ligar grafos de agentes a execução durável, retries e timeouts.",
    },
    {
      title: "AWS Step Functions Developer Guide",
      source: "AWS Documentation",
      url: "https://docs.aws.amazon.com/step-functions/latest/dg/welcome.html",
      note:
        "Bom material para contrastar orquestração explícita de estados com loops livres de agentes.",
    },
    {
      title: "Building effective agents",
      source: "Anthropic Engineering",
      url: "https://www.anthropic.com/engineering/building-effective-agents",
      note:
        "Ajuda a diferenciar workflows, agentes e padrões intermediários de coordenação.",
    },
  ],
  heroVisual: "hero",
  openingText:
    "Quando um sistema com LLMs cresce, a pergunta deixa de ser apenas 'qual prompt usar?' e passa a ser 'como esse sistema mantém continuidade, coordena etapas e se recupera de falhas?'. Memória, estado e orquestração entram exatamente aí. Memória decide o que pode ser trazido de execuções passadas ou fontes persistentes. Estado decide o que esta execução sabe agora sobre seu próprio progresso. Orquestração decide quem roda primeiro, quem depende de quem, o que acontece se uma chamada falha e como evitar efeitos duplicados. Em projetos sérios, esses três temas não são detalhes de infra: eles moldam a confiabilidade do comportamento observado pelo usuário.",
  quickFacts: [
    {
      title: "Contexto nao e memoria suficiente",
      body:
        "Jogar tudo na janela do modelo não substitui representar explicitamente progresso, fatos persistentes e decisões do fluxo.",
    },
    {
      title: "Estado bom melhora recuperacao",
      body:
        "Quando cada etapa sabe o que recebeu e o que produziu, o sistema reinicia melhor após falhas.",
    },
    {
      title: "Workflow explicito reduz caos",
      body:
        "Em tarefas longas ou críticas, desenhar dependências e retries costuma ser mais seguro do que deixar tudo para um loop livre.",
    },
  ],
  sections: [
    {
      id: "motivacao",
      eyebrow: "Escala",
      title: "Por que sistemas com LLMs quebram quando tentam viver so de contexto",
      lead:
        "Porque execuções longas, efeitos externos e falhas reais exigem mais do que uma conversa estendida com o modelo.",
      visual: "hero",
      paragraphs: [
        "Enquanto o problema cabe em um único turno, o contexto em memória do modelo parece suficiente. Mas assim que surgem múltiplas etapas, dependências externas, retries, aprovações ou tarefas assíncronas, a abordagem de 'colocar tudo no prompt' começa a colapsar.",
        "O sistema passa a precisar saber o que já fez, o que ainda falta, o que foi confirmado por ferramentas, quais passos podem ser refeitos e quais jamais devem ser duplicados. Isso já é arquitetura de execução, não apenas engenharia de prompt.",
        "Em outras palavras: memória, estado e orquestração aparecem quando queremos continuidade confiável, não apenas eloquência momentânea.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Orquestração",
          body:
            "Coordenação explícita das etapas de um sistema, incluindo ordem de execução, dependências, retries, timeouts e tratamento de falhas.",
        },
      ],
    },
    {
      id: "estado-vs-memoria",
      eyebrow: "Fundacao conceitual",
      title: "Estado nao e a mesma coisa que memoria",
      lead:
        "Estado descreve a situacao corrente da execucao; memoria preserva ou recupera informacoes alem do instante imediato.",
      visual: "concept",
      interactive: "state-design-lab",
      paragraphs: [
        "Estado é o retrato atual de uma execução: entrada recebida, subtarefas concluídas, resultados intermediários, flags de erro, checkpoints e decisões tomadas. Ele precisa ser claro, atualizável e auditável.",
        "Memória, por sua vez, é a capacidade de recuperar ou persistir informação para além do turno atual. Pode ser histórico de interações, perfil do usuário, fatos aprovados, documentos relevantes ou experiências passadas organizadas em outro sistema.",
        "Misturar os dois conceitos leva a projetos confusos. Um run não deveria depender de memória difusa para lembrar se já enviou um email; isso é estado. Ao mesmo tempo, não faz sentido carregar todo o histórico do usuário como estado transitório de cada ação.",
      ],
      blocks: [
        {
          type: "insight",
          title: "Pergunta útil",
          body:
            "Se a informação serve para saber onde esta execução está, provavelmente é estado. Se serve para informar futuras execuções, provavelmente é memória.",
        },
      ],
    },
    {
      id: "tipos-memoria",
      eyebrow: "Arquitetura cognitiva",
      title: "Memoria curta, memoria persistente e contexto recuperado cumprem papeis diferentes",
      lead:
        "Sistemas robustos normalmente combinam varios mecanismos, em vez de tratar tudo como um bloco unico de lembranca.",
      visual: "pipeline",
      paragraphs: [
        "Há uma memória de trabalho imediata, geralmente limitada ao run atual: tarefas abertas, observações recentes, hipótese corrente. Existe também memória persistente, como preferências do usuário, fatos aprovados, artefatos gerados ou logs de execução.",
        "Além disso, muitos sistemas usam recuperação sob demanda: em vez de manter tudo sempre presente, buscam só o que é relevante no momento. Isso reduz ruído, economiza tokens e evita que o modelo trabalhe sobre uma massa indiscriminada de contexto.",
        "Essa decomposição é importante porque memória demais também atrapalha. Quanto mais informação irrelevante você mistura, mais difícil fica para o modelo encontrar o sinal correto.",
      ],
      blocks: [
        {
          type: "example",
          title: "Exemplo prático",
          body:
            "Um assistente de suporte pode guardar no estado o ticket atual, mas consultar memória persistente para histórico do cliente e artigos aprovados da base.",
        },
      ],
    },
    {
      id: "grafos-workflows",
      eyebrow: "Estrutura",
      title: "Grafos e workflows tornam a execucao mais explicita",
      lead:
        "Representar etapas e transicoes ajuda o sistema a saber o que pode ocorrer a seguir e o que depende do que ja aconteceu.",
      visual: "comparison",
      paragraphs: [
        "Quando modelamos um fluxo como grafo ou máquina de estados, deixamos mais claro quais nós existem, quais entradas eles esperam, qual saída produzem e para onde a execução pode seguir. Isso reduz improvisação desnecessária.",
        "Esse desenho é útil porque muitos problemas agenticos não exigem total abertura. Frequentemente o que precisamos é um espaço controlado de decisão dentro de uma espinha dorsal previsível: classificar, buscar, sintetizar, validar, aprovar, executar.",
        "Workflows explícitos também facilitam testes, observabilidade e governança. Você sabe quais arestas são críticas, quais passos podem disparar efeitos externos e onde encaixar retries ou intervenção humana.",
      ],
      blocks: [
        {
          type: "definition",
          title: "State graph",
          body:
            "Representação em que cada nó opera sobre um estado compartilhado ou explicitamente passado, e cada transição define como o fluxo pode evoluir.",
        },
      ],
    },
    {
      id: "durabilidade",
      eyebrow: "Confiabilidade",
      title: "Durabilidade importa quando o mundo externo nao coopera",
      lead:
        "Chamadas lentas, filas, timeouts e falhas de rede pedem um modelo de execucao que sobreviva alem do processo atual.",
      visual: "tradeoff",
      interactive: "durability-scenarios",
      paragraphs: [
        "Em tarefas longas, pode levar minutos, horas ou mais para todas as ações externas terminarem. Se o processo morre no meio e você não tem um mecanismo durável, perde-se o progresso ou, pior, repete-se trabalho sem saber o que já foi feito.",
        "Orquestração durável registra eventos suficientes para reconstruir o fluxo, reaplicar lógica e retomar a execução de forma previsível. Isso é especialmente importante quando o sistema aciona APIs instáveis, lotes grandes de chamadas ou aprovações humanas fora do ciclo imediato.",
        "A maturidade aqui está em tratar falha como caso normal da engenharia, não como exceção improvável.",
      ],
      blocks: [
        {
          type: "insight",
          title: "Durabilidade compra tranquilidade operacional",
          body:
            "Você troca alguma complexidade inicial por muito menos fragilidade quando a execução precisa sobreviver a falhas inevitáveis.",
        },
      ],
    },
    {
      id: "checkpoints-idempotencia",
      eyebrow: "Recuperacao",
      title: "Checkpoint, retry e idempotencia precisam trabalhar juntos",
      lead:
        "Recuperar nao e so voltar do meio do caminho; e voltar sem produzir duplicacoes perigosas.",
      visual: "checklist",
      interactive: "checkpoint-lab",
      paragraphs: [
        "Checkpoint significa registrar um ponto em que o sistema sabe exatamente o que já foi produzido e o que ainda pode ser feito. Isso acelera recuperação e reduz a necessidade de recomputar tudo.",
        "Mas recovery seguro depende também de idempotência. Se uma etapa pode ser reexecutada após falha, ela precisa fazer isso sem duplicar cobranças, mensagens, tickets ou escritas inconsistentes. Caso contrário, retries viram fonte de incidentes.",
        "Em pipelines com LLMs, isso é ainda mais importante porque o raciocínio pode ser não determinístico. A camada de orquestração precisa compensar essa variabilidade com contratos claros de entrada, saída e repetição.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Idempotencia",
          body:
            "Propriedade segundo a qual repetir uma operação produz o mesmo efeito final de executá-la uma vez, evitando duplicação de consequências externas.",
        },
      ],
    },
    {
      id: "concorrencia-efeitos",
      eyebrow: "Complexidade real",
      title: "Concorrencia e efeitos colaterais sao onde workflows inocentes ficam perigosos",
      lead:
        "Executar em paralelo acelera, mas tambem complica coordenacao, consistencia e depuracao.",
      paragraphs: [
        "Rodar múltiplas buscas, extrações ou chamadas a modelos em paralelo pode reduzir tempo total, mas introduz disputas por estado, ordenação incerta de respostas e necessidade de consolidar resultados parciais sem contradição.",
        "Se diferentes ramos escrevem no mesmo artefato, disparam ações externas relacionadas ou competem por uma decisão final, o sistema precisa de regras explícitas para merge, cancelamento e precedência.",
        "É aqui que muita arquitetura 'simples' deixa de ser simples. A aceleração paralela só vale a pena quando acompanhada de semântica clara sobre quem pode atualizar o quê, quando e com quais garantias.",
      ],
      blocks: [
        {
          type: "mistake",
          title: "Erro comum",
          body:
            "Paralelizar tudo cedo demais. Sem contratos claros de merge e isolamento, a velocidade conquistada vira instabilidade difícil de reproduzir.",
        },
      ],
    },
    {
      id: "escolhas-arquiteturais",
      eyebrow: "Decisao de engenharia",
      title: "Quando um loop simples basta e quando um orquestrador duravel se justifica",
      lead:
        "A melhor arquitetura depende da duracao do fluxo, do risco de efeitos externos e da necessidade de auditoria.",
      paragraphs: [
        "Se o trabalho é curto, síncrono e sem impacto crítico, um state graph leve ou até uma orquestração no próprio processo pode ser suficiente. Isso reduz sobrecarga e mantém o sistema simples.",
        "Quando entram filas, tarefas longas, múltiplas dependências, reentrância, retries complexos, callbacks ou efeitos irreversíveis, um orquestrador durável se torna muito mais atraente. Ele transforma caos potencial em protocolo explícito.",
        "A escolha madura evita extremos: nem tudo precisa de uma plataforma pesada, mas também nem todo problema pode ser tratado como um loop de notebook em produção.",
      ],
      blocks: [
        {
          type: "insight",
          title: "Arquitetura e expectativa de falha",
          body:
            "Quanto mais caro ou irreversível for errar, mais valor existe em explicitar estado, checkpoints e governança do fluxo.",
        },
      ],
    },
    {
      id: "resumo",
      eyebrow: "Sintese",
      title: "Mapa mental de memoria, estado e workflow",
      lead:
        "Memoria informa, estado situa, workflow coordena e durabilidade protege a execucao contra a realidade.",
      interactive: "summary-cards",
      paragraphs: [
        "Sistemas com LLMs ficam mais robustos quando distinguem claramente o que deve ser lembrado, o que deve ser representado agora e como cada etapa é retomada após falhas.",
      ],
    },
    {
      id: "quiz-revisao",
      eyebrow: "Revisao",
      title: "Quiz de revisão",
      lead:
        "Confira se ficaram claros os papeis distintos de memoria, estado, durabilidade e idempotencia.",
      interactive: "quiz",
      paragraphs: [
        "A ideia é consolidar um raciocínio de engenharia de execução, e não apenas terminologia.",
      ],
    },
    {
      id: "glossario",
      eyebrow: "Vocabulário",
      title: "Glossário essencial",
      lead:
        "Termos úteis para projetar sistemas com LLMs que não quebrem na primeira falha real.",
      interactive: "glossary",
      paragraphs: [
        "Este glossário ajuda a manter precisão entre o que é cognição aparente do modelo e o que é infraestrutura de controle.",
      ],
    },
  ],
  summaryCards: [
    {
      title: "Contexto nao resolve tudo",
      body:
        "Janelas de contexto ajudam, mas não substituem representação explícita de progresso, memória persistente e recuperação do fluxo.",
    },
    {
      title: "Estado e memoria têm papeis diferentes",
      body:
        "Estado acompanha a execução atual; memória alimenta execuções com fatos ou experiências relevantes além do instante.",
    },
    {
      title: "Workflows tornam dependencias visiveis",
      body:
        "Grafos, máquinas de estados e orquestradores explícitos reduzem improvisação e facilitam auditoria.",
    },
    {
      title: "Durabilidade trata falhas como realidade",
      body:
        "Executar por muito tempo sem perder progresso exige registros, retomada previsível e desenho cuidadoso de retries.",
    },
    {
      title: "Idempotencia protege contra duplicacao",
      body:
        "Em presença de retry e reexecução, operações externas precisam poder repetir sem causar efeitos indesejados em dobro.",
    },
  ],
  quiz: [
    {
      id: "q1",
      prompt: "Qual afirmação melhor distingue estado de memória?",
      options: [
        { id: "a", label: "Estado descreve a execução atual; memória guarda ou recupera informação além dela." },
        { id: "b", label: "São exatamente a mesma coisa." },
        { id: "c", label: "Memória serve só para logs, estado serve só para prompts." },
      ],
      correctOptionId: "a",
      feedback:
        "Essa distinção evita sistemas confusos que não sabem o que precisa ser transitório e o que precisa persistir.",
    },
    {
      id: "q2",
      prompt: "Por que depender apenas da janela de contexto é insuficiente em fluxos longos?",
      options: [
        { id: "a", label: "Porque faltam mecanismos explícitos de progresso, recuperação e controle de efeitos externos." },
        { id: "b", label: "Porque contexto nunca ajuda." },
        { id: "c", label: "Porque modelos não conseguem ler texto longo." },
      ],
      correctOptionId: "a",
      feedback:
        "Fluxos longos precisam de estrutura operacional, não apenas de mais texto acumulado no prompt.",
    },
    {
      id: "q3",
      prompt: "Qual é uma vantagem de representar o fluxo como grafo ou workflow explícito?",
      options: [
        { id: "a", label: "Deixar etapas, dependências e transições mais auditáveis e testáveis." },
        { id: "b", label: "Eliminar toda necessidade de estado." },
        { id: "c", label: "Tornar qualquer tarefa automaticamente paralela." },
      ],
      correctOptionId: "a",
      feedback:
        "A estrutura explícita reduz improvisação e melhora governança do sistema.",
    },
    {
      id: "q4",
      prompt: "Quando durabilidade tende a ser importante?",
      options: [
        { id: "a", label: "Quando o fluxo é longo, depende de serviços externos e precisa sobreviver a falhas." },
        { id: "b", label: "Apenas em experimentos locais de cinco segundos." },
        { id: "c", label: "Somente quando não há nenhum efeito externo." },
      ],
      correctOptionId: "a",
      feedback:
        "Durabilidade é mais valiosa justamente quando a execução precisa persistir além do processo atual e tolerar falhas reais.",
    },
    {
      id: "q5",
      prompt: "O que checkpoint oferece?",
      options: [
        { id: "a", label: "Pontos claros de progresso para retomar ou inspecionar a execução." },
        { id: "b", label: "Garantia de que o modelo nunca errará." },
        { id: "c", label: "Substituição da avaliação." },
      ],
      correctOptionId: "a",
      feedback:
        "Checkpoint ajuda a recuperar e auditar o fluxo, reduzindo recomputação e incerteza após falhas.",
    },
    {
      id: "q6",
      prompt: "Por que idempotência é crucial em workflows com retry?",
      options: [
        { id: "a", label: "Porque a mesma operação pode ser reexecutada sem duplicar efeitos externos." },
        { id: "b", label: "Porque impede qualquer timeout." },
        { id: "c", label: "Porque reduz tokens do prompt." },
      ],
      correctOptionId: "a",
      feedback:
        "Sem idempotência, retries podem cobrar duas vezes, enviar duas mensagens ou criar registros inconsistentes.",
    },
    {
      id: "q7",
      prompt: "Qual é um risco comum da concorrência?",
      options: [
        { id: "a", label: "Disputas por estado, merge confuso e efeitos colaterais difíceis de reproduzir." },
        { id: "b", label: "Redução automática do custo de depuração." },
        { id: "c", label: "Eliminação de toda variabilidade do sistema." },
      ],
      correctOptionId: "a",
      feedback:
        "Paralelismo acelera, mas cobra regras mais claras de consistência e coordenação.",
    },
    {
      id: "q8",
      prompt: "Qual decisão arquitetural é mais madura?",
      options: [
        { id: "a", label: "Escolher entre loop simples e orquestrador durável com base em risco, duração e auditabilidade." },
        { id: "b", label: "Usar a solução mais complexa sempre." },
        { id: "c", label: "Evitar qualquer representação explícita de estado." },
      ],
      correctOptionId: "a",
      feedback:
        "A boa engenharia dimensiona a complexidade ao problema real, sem romantizar nem simplificar demais.",
    },
  ],
  glossary: [
    { term: "Estado", definition: "Representação da situação atual de uma execução, incluindo progresso, resultados intermediários e flags operacionais." },
    { term: "Memória", definition: "Capacidade de persistir ou recuperar informação além do turno ou run atual." },
    { term: "Memória de trabalho", definition: "Conjunto de informações temporárias relevantes para a execução corrente." },
    { term: "Memória persistente", definition: "Informação armazenada para reuso posterior, como histórico de usuário, fatos aprovados ou artefatos." },
    { term: "Contexto recuperado", definition: "Informação buscada sob demanda de uma base externa no momento em que se torna relevante." },
    { term: "Workflow", definition: "Sequência orquestrada de etapas com ordem, dependências e políticas de execução definidas explicitamente." },
    { term: "State graph", definition: "Grafo em que nós operam sobre um estado compartilhado ou passado entre etapas." },
    { term: "Durabilidade", definition: "Capacidade do sistema de preservar progresso e retomar execução após falhas ou reinícios." },
    { term: "Checkpoint", definition: "Marco persistido que registra um ponto confiável do progresso do fluxo." },
    { term: "Retry", definition: "Tentativa automática de reexecutar uma etapa após falha transitória ou condição tratável." },
    { term: "Idempotência", definition: "Propriedade que permite repetir uma operação sem multiplicar seu efeito final." },
    { term: "Efeito colateral", definition: "Mudança externa causada por uma etapa, como gravar em banco, cobrar, enviar mensagem ou abrir ticket." },
  ],
};
