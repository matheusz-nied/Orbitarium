import type { LessonContent } from "../../../types/content";

export const agentesDeIaContent: LessonContent = {
  id: "agentes-de-ia",
  title: "Agentes de IA",
  subtitle:
    "Como sistemas baseados em LLMs observam, planejam, usam ferramentas e agem em múltiplos passos sem virar magia nem autonomia ilimitada.",
  description:
    "Uma aula intermediária sobre agentes de IA, cobrindo loops observe-plan-act, uso de ferramentas, decomposição de tarefas, limites reais, riscos de autonomia excessiva e padrões de segurança.",
  primaryCategoryId: "inteligencia-artificial",
  secondaryCategoryId: "computacao",
  level: "Intermediário",
  estimatedTime: "45-60 min",
  tags: [
    "Agentes",
    "ReAct",
    "Ferramentas",
    "Planejamento",
    "Autonomia",
    "Segurança",
  ],
  learningObjectives: [
    "Explicar por que um agente é mais do que uma chamada única de chat.",
    "Descrever o ciclo observe-plan-act e seu valor prático.",
    "Entender o papel de ferramentas externas na ampliação da capacidade do sistema.",
    "Distinguir planejamento útil de loops longos que só aumentam custo e erro.",
    "Reconhecer limites reais de confiabilidade, memória e coordenação em agentes.",
    "Comparar quando usar um agente aberto e quando preferir um workflow explícito.",
    "Aplicar princípios de segurança, aprovação humana e escopo mínimo de permissão.",
  ],
  prerequisites: [
    "Familiaridade básica com LLMs e prompting.",
    "Entender que modelos puros geram texto, mas não executam ações externas sozinhos.",
    "Noção geral de APIs, ferramentas e chamadas a sistemas externos.",
  ],
  references: [
    {
      title: "ReAct: Synergizing Reasoning and Acting in Language Models",
      source: "Yao et al., 2022 — arXiv / ICLR 2023",
      url: "https://arxiv.org/abs/2210.03629",
      note:
        "Referência central para o padrão de alternar raciocínio, ação e observação em múltiplos passos.",
    },
    {
      title: "Toolformer: Language Models Can Teach Themselves to Use Tools",
      source: "Schick et al., 2023 — arXiv / NeurIPS 2023",
      url: "https://arxiv.org/abs/2302.04761",
      note:
        "Importante para situar o aprendizado de uso de ferramentas dentro do próprio comportamento do modelo.",
    },
    {
      title: "MRKL Systems: A modular, neuro-symbolic architecture",
      source: "Karpas et al., 2022 — arXiv",
      url: "https://arxiv.org/abs/2205.00445",
      note:
        "Contextualiza agentes como roteadores e coordenadores de módulos especializados.",
    },
    {
      title: "Plan-and-Solve Prompting: Improving Zero-Shot Chain-of-Thought Reasoning",
      source: "Wang et al., 2023 — arXiv",
      url: "https://arxiv.org/abs/2305.04091",
      note:
        "Útil para discutir decomposição e planejamento antes de agir.",
    },
    {
      title: "Building effective agents",
      source: "Anthropic Engineering",
      url: "https://www.anthropic.com/engineering/building-effective-agents",
      note:
        "Guia prático sobre padrões de agentes, workflows e decisões de arquitetura.",
    },
    {
      title: "Function calling",
      source: "OpenAI Developers",
      url: "https://developers.openai.com/api/docs/guides/function-calling",
      note:
        "Referência prática para o elo entre modelo, ferramentas e execução controlada pelo sistema.",
    },
  ],
  heroVisual: "hero",
  openingText:
    "Muito do que hoje se chama de 'agente' é, tecnicamente, um sistema que alterna pensar, agir e observar. O LLM recebe um objetivo, decide se precisa de passos intermediários, chama uma ferramenta, lê o resultado, corrige a rota e repete. Isso parece mais inteligente do que uma resposta única porque o sistema interage com o mundo: consulta dados, executa funções, persiste estado e revisa o próprio plano. Ao mesmo tempo, esse poder vem com novos problemas. Toda etapa extra cria mais latência, mais custo, mais superfície de erro e mais oportunidade para o sistema confundir ruído com sinal. Por isso, estudar agentes não é estudar ficção sobre autonomia total; é estudar engenharia de loops controlados.",
  quickFacts: [
    {
      title: "Agente nao e so chat",
      body:
        "A marca central de um agente é operar em múltiplos passos com observações do ambiente, e não apenas produzir texto de uma vez.",
    },
    {
      title: "Ferramentas ampliam capacidade",
      body:
        "Busca, banco de dados, calculadora e execução controlada transformam limites do modelo em chamadas a sistemas especializados.",
    },
    {
      title: "Mais autonomia exige mais guarda",
      body:
        "Permissões, validação, tempo limite e supervisão humana ficam mais importantes à medida que o agente ganha poder de agir.",
    },
  ],
  sections: [
    {
      id: "motivacao",
      eyebrow: "Panorama",
      title: "O que faz um sistema parecer agentico?",
      lead:
        "Nao e apenas responder bem, e conseguir progredir em uma tarefa por meio de uma sequencia de acoes informadas por observacoes.",
      visual: "hero",
      paragraphs: [
        "Um chatbot tradicional recebe uma entrada e devolve uma resposta. Um agente, em sentido prático, recebe um objetivo e pode quebrá-lo em subtarefas, consultar ferramentas, inspecionar resultados e decidir o próximo passo. Esse ciclo de interação o torna mais útil para problemas que não cabem em uma única geração.",
        "O ponto importante é que a agência percebida surge da arquitetura, não de uma consciência autônoma. O LLM continua sendo um motor probabilístico de linguagem, mas agora inserido em um laço onde texto vira decisão, decisão vira chamada de ferramenta e resultado volta como novo contexto.",
        "É por isso que agentes são simultaneamente empolgantes e frágeis: eles expandem o alcance do sistema, mas também expandem tudo que pode dar errado.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Agente de IA",
          body:
            "Sistema que usa um modelo para decidir e coordenar múltiplos passos, geralmente com acesso a ferramentas, estado e observações do ambiente.",
        },
      ],
    },
    {
      id: "observe-plan-act",
      eyebrow: "Loop central",
      title: "Observe, planeje, aja e reavalie",
      lead:
        "O coracao de muitos agentes modernos e um loop simples: ler o estado, escolher um proximo passo e incorporar a observacao resultante.",
      visual: "pipeline",
      interactive: "agent-loop-lab",
      paragraphs: [
        "No padrão observe-plan-act, o sistema começa interpretando o objetivo e o estado atual. Em seguida, formula um plano local: qual ferramenta usar, qual subtarefa resolver, que dado buscar ou se precisa perguntar algo ao usuário antes de continuar.",
        "Depois da ação, vem a observação. Esse retorno é crucial porque ancora o próximo passo em evidência externa. Sem observação, o agente só encadeia texto em cima de texto. Com observação, ele pode corrigir rumos, perceber falhas e atualizar sua estratégia.",
        "Esse loop parece simples, mas sua qualidade depende de três coisas: capacidade de planejar sem delirar, ferramentas confiáveis e critérios claros para parar.",
      ],
      blocks: [
        {
          type: "insight",
          title: "Loop curto costuma vencer loop bonito",
          body:
            "Em vários cenários, poucos passos bem definidos batem agentes longos e verbosos que pensam demais e verificam de menos.",
        },
      ],
    },
    {
      id: "ferramentas",
      eyebrow: "Capacidade",
      title: "Ferramentas transformam o agente em um orquestrador, nao em um sabio universal",
      lead:
        "O agente melhora porque delega a modulos certos, e nao porque passa a saber tudo por si so.",
      visual: "concept",
      paragraphs: [
        "Uma ferramenta pode ser um buscador, uma consulta a banco de dados, um interpretador de codigo, um conector de CRM ou uma acao sensivel como aprovar um pedido. O papel do agente é decidir quando chamar cada uma e integrar a resposta ao raciocínio seguinte.",
        "Essa delegação é fundamental porque há classes de problema em que o modelo puro é fraco por natureza: cálculo exato, fatos atualizados, acesso a permissões de usuário, consulta a sistemas privados ou execução determinística.",
        "Quando bem projetado, o agente deixa de fingir competência total e passa a operar como coordenador de especialistas. Isso é uma virtude arquitetural, não uma limitação vergonhosa.",
      ],
      blocks: [
        {
          type: "example",
          title: "Exemplo concreto",
          body:
            "Um agente de suporte pode consultar o histórico do cliente, checar política atual de devolução e só então redigir a resposta final.",
        },
        {
          type: "mistake",
          title: "Erro comum",
          body:
            "Dar ao agente uma ferramenta e assumir que ele automaticamente vai usá-la bem. Descrição, schema, retorno e tratamento de erro importam muito.",
        },
      ],
    },
    {
      id: "planejamento",
      eyebrow: "Estratégia",
      title: "Planejar ajuda, mas planejar demais pode degradar o sistema",
      lead:
        "Decompor tarefas é útil quando reduz incerteza; vira custo improdutivo quando apenas multiplica passos e superfície de falha.",
      visual: "tradeoff",
      interactive: "tool-policy-scenarios",
      paragraphs: [
        "Há tarefas em que um pequeno plano inicial evita ações caóticas. Isso vale especialmente para problemas com dependências claras, como pesquisar, comparar, sintetizar e então agir. Planejamento explícito pode reduzir impulsividade e melhorar uso de ferramentas.",
        "Mas planejar também tem custo. Cada etapa adiciona latência, consumo de tokens, risco de desvio e exposição a resultados intermediários potencialmente contaminados. Em outras palavras: nem toda tarefa precisa de um mini-gerente interno antes de começar.",
        "A competência está em adaptar o grau de deliberação à complexidade real do trabalho, e não em forçar todos os pedidos a parecerem uma missão de longa duração.",
      ],
      blocks: [
        {
          type: "insight",
          title: "Complexidade precisa ser merecida",
          body:
            "Se o problema pode ser resolvido com um ou dois passos determinísticos, um workflow explícito geralmente é melhor do que um agente aberto.",
        },
      ],
    },
    {
      id: "memoria-operacional",
      eyebrow: "Contexto",
      title: "Todo agente precisa de algum estado, nem que seja um rascunho de trabalho",
      lead:
        "Sem alguma forma de estado, o agente nao sabe o que ja tentou, o que encontrou e por que decidiu mudar de rumo.",
      visual: "comparison",
      paragraphs: [
        "Mesmo agentes simples precisam manter contexto operacional: objetivo atual, resultados já coletados, passos concluídos, falhas, hipóteses e critérios de parada. Esse estado pode ser curto, local ao run, ou mais persistente, dependendo da arquitetura.",
        "A função do estado não é transformar o modelo em memória perfeita. É evitar que ele reinicie mentalmente a tarefa a cada turno. Quanto mais longo o fluxo, mais importante fica representar explicitamente o que o sistema acredita saber e o que ainda falta.",
        "Em sistemas sérios, estado também serve para auditoria: ele permite reconstruir por que uma ação foi tomada e em qual observação ela se baseou.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Scratchpad / estado de trabalho",
          body:
            "Representação temporária do progresso do agente durante uma execução, usada para registrar plano, observações e próximos passos.",
        },
      ],
    },
    {
      id: "limites-reais",
      eyebrow: "Realismo",
      title: "Agentes falham por motivos previsiveis",
      lead:
        "Erros de leitura, selecao ruim de ferramenta, perseveranca excessiva e interpretacao ingênua de resultados sao fontes comuns de falha.",
      paragraphs: [
        "Agentes podem insistir em um caminho ruim, usar a ferramenta certa com argumentos errados, interpretar uma mensagem de erro como dado válido ou continuar tentando quando já deveriam parar e pedir ajuda.",
        "Também são sensíveis a descrições ambíguas de ferramentas, mudanças de interface, contexto insuficiente e observações mal estruturadas. Quanto mais o mundo externo participa do loop, mais o sistema precisa ser resiliente a entradas imperfeitas.",
        "Falar de limites não é desmerecer agentes. É lembrar que o ganho deles vem da interação com um ambiente ruidoso, e ambientes ruidosos punem arquiteturas ingênuas.",
      ],
      blocks: [
        {
          type: "mistake",
          title: "Erro comum",
          body:
            "Confundir quantidade de passos com profundidade de raciocínio. Um agente pode fazer dez ações fracas e ainda assim performar pior do que um fluxo curto e bem definido.",
        },
      ],
    },
    {
      id: "seguranca",
      eyebrow: "Guardrails",
      title: "Autonomia util nasce de limites explicitos",
      lead:
        "Permissao minima, aprovacao humana e validacao de entrada nao sao burocracia: sao parte da propria capacidade confiavel do agente.",
      visual: "checklist",
      interactive: "safety-boundary-lab",
      paragraphs: [
        "Um agente que pode ler dados privados, acionar pagamentos, enviar mensagens ou modificar registros precisa operar com escopo mínimo de permissão. O sistema não deve assumir que, porque o modelo 'pareceu entender', a ação é segura.",
        "Também é essencial distinguir observações confiáveis de conteúdo potencialmente adversarial. Resultados de busca, páginas externas e entradas do usuário podem conter instruções maliciosas ou irrelevantes que tentam sequestrar o loop.",
        "Por isso, muitas arquiteturas saudáveis usam confirmações humanas para ações irreversíveis, filtros de validação de argumentos e separação entre planejamento linguístico e camada real de autorização.",
      ],
      blocks: [
        {
          type: "example",
          title: "Aprovacao humana sensata",
          body:
            "Gerar um rascunho de email automaticamente pode ser aceitável; enviá-lo em nome do usuário sem revisão talvez não seja.",
        },
      ],
    },
    {
      id: "agente-vs-workflow",
      eyebrow: "Arquitetura",
      title: "Quando um workflow explicito e melhor do que um agente aberto",
      lead:
        "Nem todo problema deve ser entregue a um laço geral de deliberação; às vezes a melhor solução é desenhar o caminho você mesmo.",
      paragraphs: [
        "Se a tarefa tem passos fixos, regras claras e baixo benefício de improvisação, um workflow explícito costuma ser mais barato, mais auditável e mais previsível. Exemplos: classificar tickets, extrair campos de formulários, gerar resposta com contexto e submeter para revisão.",
        "Agentes brilham quando o caminho não é óbvio de antemão, quando a escolha de ferramentas varia caso a caso ou quando a pesquisa incremental realmente melhora a resposta. Mesmo assim, convém limitar o espaço de ação em vez de deixá-lo irrestrito.",
        "A boa pergunta não é 'como deixar tudo agentico?', mas 'onde a adaptatividade adicional paga o custo que ela introduz?'.",
      ],
      blocks: [
        {
          type: "insight",
          title: "Workflow e agente não são rivais",
          body:
            "Na prática, muitos sistemas maduros usam workflows rígidos por fora e pequenos blocos agenticos apenas onde a incerteza justifica.",
        },
      ],
    },
    {
      id: "resumo",
      eyebrow: "Sintese",
      title: "O mapa mental de um agente competente",
      lead:
        "Observe o estado, escolha poucas acoes boas, use ferramentas certas, valide observacoes e respeite limites operacionais.",
      interactive: "summary-cards",
      paragraphs: [
        "Agência útil surge do casamento entre loop iterativo, ferramentas bem descritas, estado explícito e guardrails proporcionais ao risco.",
      ],
    },
    {
      id: "quiz-revisao",
      eyebrow: "Revisao",
      title: "Quiz de revisão",
      lead:
        "Teste se ficaram claros o loop agentico, o papel das ferramentas e os limites práticos da autonomia.",
      interactive: "quiz",
      paragraphs: [
        "O objetivo é raciocinar arquiteturalmente sobre agentes, não tratá-los como uma caixa-preta mágica.",
      ],
    },
    {
      id: "glossario",
      eyebrow: "Vocabulário",
      title: "Glossário essencial",
      lead:
        "Conceitos recorrentes em papers e sistemas modernos de agentes baseados em LLMs.",
      interactive: "glossary",
      paragraphs: [
        "Este vocabulário ajuda a separar metáforas chamativas da mecânica real do sistema.",
      ],
    },
  ],
  summaryCards: [
    {
      title: "Agente é loop, não mito",
      body:
        "A sensação de autonomia vem da sequência observar-planejar-agir, e não de um tipo novo de inteligência mística.",
    },
    {
      title: "Ferramentas ampliam o alcance do modelo",
      body:
        "Busca, APIs, bancos de dados e executores controlados compensam limites naturais do conhecimento paramétrico.",
    },
    {
      title: "Mais passos não significam melhor raciocínio",
      body:
        "Latência, custo e ruído crescem a cada etapa, então a profundidade do loop deve ser justificada.",
    },
    {
      title: "Estado explicito evita reinicios mentais",
      body:
        "Guardar progresso, observações e decisões torna o fluxo mais coerente, auditável e robusto.",
    },
    {
      title: "Autonomia boa precisa de fronteiras",
      body:
        "Permissão mínima, validação de argumentos e aprovação humana são parte do design de agentes confiáveis.",
    },
  ],
  quiz: [
    {
      id: "q1",
      prompt: "Qual característica mais distingue um agente de uma chamada única de chat?",
      options: [
        { id: "a", label: "Capacidade de operar em múltiplos passos com observações e ferramentas." },
        { id: "b", label: "Uso de uma fonte tipográfica diferente." },
        { id: "c", label: "Ausência total de contexto." },
      ],
      correctOptionId: "a",
      feedback:
        "O ponto central do agente é a iteração orientada por objetivo, e não apenas a geração de um texto final.",
    },
    {
      id: "q2",
      prompt: "No loop observe-plan-act, qual é o papel da observação?",
      options: [
        { id: "a", label: "Trazer evidência externa para corrigir ou atualizar o próximo passo." },
        { id: "b", label: "Substituir toda necessidade de planejamento." },
        { id: "c", label: "Servir apenas como decoração do prompt." },
      ],
      correctOptionId: "a",
      feedback:
        "A observação ancora o raciocínio em resultados do ambiente, em vez de deixar o agente apenas encadear texto.",
    },
    {
      id: "q3",
      prompt: "Por que ferramentas são importantes para agentes?",
      options: [
        { id: "a", label: "Porque permitem delegar cálculo, busca, acesso a dados e ações a módulos especializados." },
        { id: "b", label: "Porque tornam o modelo infalível." },
        { id: "c", label: "Porque dispensam estado e segurança." },
      ],
      correctOptionId: "a",
      feedback:
        "Ferramentas ampliam capacidade ao conectar o modelo a sistemas mais confiáveis para tarefas específicas.",
    },
    {
      id: "q4",
      prompt: "Qual é um risco de planejar demais?",
      options: [
        { id: "a", label: "Aumentar custo, latência e superfície de erro sem ganho proporcional." },
        { id: "b", label: "Reduzir demais a complexidade do sistema." },
        { id: "c", label: "Eliminar a necessidade de observações externas." },
      ],
      correctOptionId: "a",
      feedback:
        "Planejamento é útil quando reduz incerteza; quando só adiciona passos, vira peso morto.",
    },
    {
      id: "q5",
      prompt: "Por que estado operacional é útil em agentes?",
      options: [
        { id: "a", label: "Porque registra progresso, observações e decisões, evitando que o sistema se perca." },
        { id: "b", label: "Porque impede qualquer erro do modelo." },
        { id: "c", label: "Porque substitui as ferramentas." },
      ],
      correctOptionId: "a",
      feedback:
        "Sem estado, o agente recomeça mentalmente a tarefa a cada passo e perde auditabilidade.",
    },
    {
      id: "q6",
      prompt: "Qual é um princípio saudável de segurança para agentes?",
      options: [
        { id: "a", label: "Conceder permissão mínima e exigir aprovação humana para ações sensíveis." },
        { id: "b", label: "Dar acesso irrestrito para reduzir latência." },
        { id: "c", label: "Confiar em qualquer conteúdo observado pelo agente." },
      ],
      correctOptionId: "a",
      feedback:
        "Autonomia útil depende de fronteiras claras de autorização, validação e revisão.",
    },
    {
      id: "q7",
      prompt: "Quando um workflow explicito tende a ser melhor que um agente aberto?",
      options: [
        { id: "a", label: "Quando os passos são fixos, auditáveis e pouco dependentes de improvisação." },
        { id: "b", label: "Quando o problema é altamente aberto e exploratório." },
        { id: "c", label: "Quando não há qualquer regra de negócio." },
      ],
      correctOptionId: "a",
      feedback:
        "Fluxos determinísticos costumam ser mais baratos e previsíveis do que deliberação aberta desnecessária.",
    },
    {
      id: "q8",
      prompt: "Qual afirmação resume melhor a natureza de um agente de IA moderno?",
      options: [
        { id: "a", label: "É uma arquitetura que combina modelo, ferramentas, estado e controles para iterar sobre um objetivo." },
        { id: "b", label: "É um modelo que ganhou vontade própria." },
        { id: "c", label: "É apenas um prompt mais longo." },
      ],
      correctOptionId: "a",
      feedback:
        "A agência emerge da composição de componentes e loops, não de uma mudança ontológica no modelo.",
    },
  ],
  glossary: [
    { term: "Agente", definition: "Sistema que usa um modelo para coordenar ações, observações e decisões em múltiplos passos." },
    { term: "Observe-plan-act", definition: "Loop em que o agente lê o estado, escolhe uma ação, executa e incorpora a observação resultante." },
    { term: "ReAct", definition: "Paradigma que combina raciocínio e ação para resolver tarefas com múltiplos passos e ferramentas." },
    { term: "Ferramenta", definition: "Função, API, banco de dados ou executor externo que o agente pode chamar para ampliar sua capacidade." },
    { term: "Observação", definition: "Resultado retornado pelo ambiente ou por uma ferramenta após uma ação do agente." },
    { term: "Planejamento", definition: "Decomposição de um objetivo em passos ou subtarefas antes ou durante a execução." },
    { term: "Estado", definition: "Informações mantidas ao longo da execução para registrar progresso, evidências e decisões." },
    { term: "Scratchpad", definition: "Representação temporária do raciocínio e do progresso operacional do agente." },
    { term: "MRKL", definition: "Arquitetura modular em que o modelo atua como roteador de capacidades especializadas." },
    { term: "Permissão mínima", definition: "Princípio de segurança que concede ao sistema apenas o acesso estritamente necessário." },
    { term: "Aprovação humana", definition: "Ponto de controle em que uma pessoa valida ações sensíveis antes da execução final." },
    { term: "Workflow", definition: "Fluxo explícito e normalmente determinístico de etapas orquestradas por regras definidas pelo sistema." },
  ],
};
