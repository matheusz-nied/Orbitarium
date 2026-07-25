import type { LessonContent } from "../../../types/content";

export const ferramentasFunctionCallingGroundingContent: LessonContent = {
  id: "ferramentas-function-calling-grounding",
  title: "Ferramentas, Function Calling e Grounding",
  subtitle:
    "Como conectar LLMs a sistemas externos, fazer chamadas estruturadas e ancorar respostas em fontes reais em vez de depender só da memória paramétrica.",
  description:
    "Uma aula intermediária sobre uso de ferramentas por LLMs, function calling, grounding, recuperação de contexto, validação de argumentos e limites de confiabilidade em sistemas conectados.",
  primaryCategoryId: "inteligencia-artificial",
  secondaryCategoryId: "computacao",
  level: "Intermediário",
  estimatedTime: "45-60 min",
  tags: [
    "Ferramentas",
    "Function calling",
    "Grounding",
    "RAG",
    "Tool use",
    "Validação",
  ],
  learningObjectives: [
    "Explicar por que ferramentas mudam o tipo de problema que um LLM consegue resolver.",
    "Entender o papel de schemas e contratos em function calling.",
    "Distinguir chamada de ferramenta, execução real e retorno controlado ao modelo.",
    "Definir grounding e compará-lo com conhecimento puramente paramétrico.",
    "Reconhecer erros comuns de roteamento, argumentos e excesso de confiança.",
    "Relacionar grounding a factualidade, atualidade e auditabilidade das respostas.",
    "Aplicar princípios de validação e segurança no uso de ferramentas externas.",
  ],
  prerequisites: [
    "Familiaridade básica com LLMs e prompting.",
    "Noção geral de APIs, funções e respostas estruturadas.",
    "Entender que um modelo pode soar confiante sem necessariamente ter acesso a fatos atuais ou sistemas reais.",
  ],
  references: [
    {
      title: "Toolformer: Language Models Can Teach Themselves to Use Tools",
      source: "Schick et al., 2023 — arXiv / NeurIPS 2023",
      url: "https://arxiv.org/abs/2302.04761",
      note:
        "Referência importante para contextualizar quando e como modelos podem aprender a usar ferramentas.",
    },
    {
      title: "Function calling",
      source: "OpenAI Developers",
      url: "https://developers.openai.com/api/docs/guides/function-calling",
      note:
        "Guia prático de definição de ferramentas, schemas e fluxo de execução controlado pela aplicação.",
    },
    {
      title: "Tool use overview",
      source: "Anthropic Docs",
      url: "https://docs.anthropic.com/en/docs/agents-and-tools/tool-use/overview",
      note:
        "Boa referência de arquitetura para chamadas de ferramenta e integração do resultado de volta ao modelo.",
    },
    {
      title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks",
      source: "Lewis et al., 2020 — arXiv / NeurIPS 2020",
      url: "https://arxiv.org/abs/2005.11401",
      note:
        "Trabalho fundamental para grounding via recuperação de contexto externo.",
    },
    {
      title: "Gorilla: Large Language Model Connected with Massive APIs",
      source: "Patil et al., 2023 — arXiv",
      url: "https://arxiv.org/abs/2305.15334",
      note:
        "Discute geração de chamadas corretas para ecossistemas amplos de APIs.",
    },
    {
      title: "Augmented Language Models: a Survey",
      source: "Mialon et al., 2023 — arXiv",
      url: "https://arxiv.org/abs/2302.07842",
      note:
        "Panorama do campo de modelos aumentados com recuperação, ferramentas e módulos externos.",
    },
  ],
  heroVisual: "hero",
  openingText:
    "Quando conectamos um LLM a ferramentas, o sistema deixa de ser apenas um gerador de texto e passa a operar sobre dados e ações reais. Isso é poderoso porque cálculo, busca, leitura de base privada, execução de comandos e consulta a APIs deixam de depender da memória estatística do modelo. Mas o ganho não vem de um truque único. Ele depende de três peças trabalhando juntas: uma ferramenta bem descrita, uma camada de execução que valida e controla a chamada, e um mecanismo de grounding que devolve ao modelo observações confiáveis o suficiente para responder. Se qualquer parte falha, o sistema pode chamar a função errada, preencher argumentos ruins ou transformar um dado externo imperfeito em uma resposta confiante e equivocada.",
  quickFacts: [
    {
      title: "Ferramenta nao e o mesmo que resposta",
      body:
        "O modelo sugere uma chamada; a aplicação decide se executa, valida a entrada e devolve o resultado ao fluxo.",
    },
    {
      title: "Schema reduz ambiguidade",
      body:
        "Descrições claras e tipos bem definidos ajudam o modelo a montar argumentos mais corretos.",
    },
    {
      title: "Grounding pode melhorar factualidade",
      body:
        "Ancorar a resposta em documentos ou sistemas externos pode reduzir dependência de memória paramétrica desatualizada, desde que a evidência recuperada seja relevante e confiável.",
    },
  ],
  sections: [
    {
      id: "motivacao",
      eyebrow: "Problema",
      title: "Por que um LLM puro nao basta para muitas tarefas reais",
      lead:
        "Porque texto plausivel nao garante acesso a fatos atualizados, calculo exato, autorizacao nem acao sobre sistemas externos.",
      visual: "hero",
      paragraphs: [
        "Modelos de linguagem são fortes em síntese, reformulação, explicação e inferência aproximada. Mas vários problemas reais exigem algo além disso: consultar uma base privada, calcular com precisão, verificar uma política atual ou executar uma ação em um sistema externo.",
        "Sem ferramentas, o modelo é pressionado a improvisar. Ele tenta responder com base no que viu durante o treino, mesmo quando a tarefa pede atualização, determinismo ou autorização. Esse é um terreno fértil para alucinação e excesso de confiança.",
        "Ferramentas e grounding entram justamente para deslocar parte da responsabilidade do modelo para módulos mais apropriados à natureza do problema.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Grounding",
          body:
            "Processo de ancorar a resposta do sistema em evidências externas, como documentos, banco de dados, APIs ou resultados observáveis.",
        },
      ],
    },
    {
      id: "ferramentas",
      eyebrow: "Capacidade",
      title: "Ferramentas mudam a classe de tarefa que o sistema consegue resolver",
      lead:
        "Um LLM com ferramentas nao se torna onisciente; ele se torna capaz de delegar partes certas do trabalho.",
      visual: "concept",
      paragraphs: [
        "Ao chamar uma calculadora, o sistema usa um módulo determinístico onde o modelo seria frágil. Ao consultar uma base documental, ele troca memória velha por contexto atual. Ao chamar uma API interna, ele passa a operar sobre o mundo real e não apenas descrevê-lo.",
        "Isso não apaga os limites do LLM. O modelo ainda pode interpretar mal o pedido, escolher a ferramenta errada ou resumir mal a saída obtida. O ponto é que agora existe a chance de operar sobre uma fonte mais confiável do que a pura memória paramétrica.",
        "Na prática, pensar em ferramentas é pensar em delegação correta de responsabilidade.",
      ],
      blocks: [
        {
          type: "example",
          title: "Exemplo de delegação",
          body:
            "Para responder 'qual o saldo atual?', o modelo não deveria adivinhar. Ele deveria consultar a conta correta por meio de uma ferramenta autorizada.",
        },
      ],
    },
    {
      id: "schemas-contratos",
      eyebrow: "Function calling",
      title: "Schema bom funciona como contrato entre modelo e sistema",
      lead:
        "Quanto mais claro o formato esperado, menor a chance de o modelo inventar argumentos ambíguos ou impraticáveis.",
      visual: "pipeline",
      interactive: "schema-lab",
      paragraphs: [
        "Function calling não é só expor nomes de funções. É fornecer descrição semântica, campos esperados, restrições de tipo e, idealmente, instruções sobre quando aquela ferramenta realmente deve ser usada.",
        "Um schema mal definido deixa o modelo navegar por suposições vagas. Já um schema claro ajuda a reduzir erros de preenchimento, escolher melhor entre ferramentas parecidas e manter o output mais previsível para a camada executora.",
        "Vale lembrar: o schema orienta, mas não garante. Sempre é necessário validar argumentos antes de executar qualquer ação externa.",
      ],
      blocks: [
        {
          type: "insight",
          title: "Ferramenta bem descrita e UX para o modelo",
          body:
            "A descrição da ferramenta é parte da interface cognitiva do sistema. Se ela é ruim, o modelo entende mal o que pode fazer.",
        },
      ],
    },
    {
      id: "loop-execucao",
      eyebrow: "Arquitetura",
      title: "O modelo sugere, mas a aplicacao executa",
      lead:
        "Separar recomendacao linguistica de acao real e uma decisao de seguranca e confiabilidade.",
      visual: "comparison",
      paragraphs: [
        "Em sistemas bem desenhados, o modelo não executa diretamente a função. Ele retorna uma intenção estruturada: qual ferramenta chamar e com quais argumentos. A camada de aplicação então valida, autoriza, executa e transforma o resultado em nova observação para o modelo.",
        "Essa separação é crucial porque permite checar permissões do usuário, normalizar campos, aplicar políticas e tratar erros do mundo real sem delegar cegamente esses passos a uma sequência de tokens.",
        "Assim, function calling não é dar controle absoluto ao modelo; é criar um canal estruturado pelo qual a aplicação continua sendo a autoridade final de execução.",
      ],
      blocks: [
        {
          type: "mistake",
          title: "Erro comum",
          body:
            "Executar automaticamente qualquer chamada proposta pelo modelo sem validação de schema, autorização e contexto do usuário.",
        },
      ],
    },
    {
      id: "grounding-retrieval",
      eyebrow: "Factualidade",
      title: "Grounding e retrieval reduzem a pressao para o modelo fingir que sabe",
      lead:
        "Quando a resposta depende de fatos atuais ou privados, recuperar evidencias certas e tao importante quanto gerar texto bom.",
      visual: "tradeoff",
      interactive: "grounding-sources-lab",
      paragraphs: [
        "Grounding significa alimentar o modelo com observações externas relevantes: trechos de documentação, registros de sistema, resultados de busca, dados transacionais ou outras evidências de alta confiança.",
        "Esse mecanismo melhora factualidade porque muda a pergunta interna do modelo. Em vez de 'o que eu lembro sobre isso?', ele passa a responder 'como devo explicar o que acabei de observar?'.",
        "Mas grounding ruim também produz respostas ruins. Se a recuperação busca fonte desatualizada, irrelevante ou contraditória, o modelo ainda pode sintetizar com confiança um retrato incorreto do mundo.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Retrieval",
          body:
            "Processo de buscar, ranquear e entregar ao modelo apenas a parte do contexto externo considerada mais relevante para a pergunta atual.",
        },
      ],
    },
    {
      id: "roteamento",
      eyebrow: "Escala",
      title: "Quando existem muitas ferramentas, roteamento vira um problema proprio",
      lead:
        "Quanto maior o ecossistema de ferramentas, mais o sistema precisa ajudar o modelo a escolher sem se perder.",
      visual: "checklist",
      interactive: "tool-routing-scenarios",
      paragraphs: [
        "Com poucas ferramentas, descrições simples já ajudam bastante. Mas em ecossistemas grandes, o modelo pode confundir funções parecidas, escolher APIs erradas ou gastar contexto lendo muitas definições irrelevantes.",
        "Por isso surgem técnicas de roteamento e seleção dinâmica: agrupar ferramentas por domínio, recuperar só as candidatas relevantes, usar metadata, aplicar busca semântica sobre catálogos e restringir o conjunto visível em cada etapa.",
        "O sistema ideal não despeja cem ferramentas no prompt. Ele oferece ao modelo um espaço de escolha que ainda seja cognitivamente administrável.",
      ],
      blocks: [
        {
          type: "insight",
          title: "Mais ferramentas nem sempre significam mais capacidade útil",
          body:
            "Sem organização e seleção contextual, o catálogo grande pode piorar a precisão de escolha.",
        },
      ],
    },
    {
      id: "validacao-seguranca",
      eyebrow: "Controles",
      title: "Validar argumentos e desconfiar do ambiente e parte do trabalho",
      lead:
        "Ferramenta conectada a sistema real pede defesa contra entrada ruim, ambiguidade e instrucoes adversariais vindas de fora.",
      paragraphs: [
        "Argumentos propostos pelo modelo devem ser verificados: tipos, ranges, campos obrigatórios, permissão do usuário e consistência com o estado do sistema. Isso evita desde erros triviais até ações perigosas.",
        "Também é importante tratar resultados externos com ceticismo operacional. Conteúdo recuperado pode conter prompt injection, instruções irrelevantes ou campos malformados. O modelo não deve absorver tudo como verdade executável.",
        "Em aplicações críticas, é recomendável separar claramente dados, instruções e autorizações, reduzindo a chance de uma observação externa sequestrar o comportamento do fluxo.",
      ],
      blocks: [
        {
          type: "example",
          title: "Validação saudável",
          body:
            "Se a ferramenta espera um identificador de pedido existente, a aplicação deve checar esse identificador antes da consulta ou da mutação correspondente.",
        },
      ],
    },
    {
      id: "quando-nao-usar",
      eyebrow: "Escopo",
      title: "Nem toda resposta precisa de ferramenta ou grounding pesado",
      lead:
        "Conectar tudo a tudo aumenta custo e complexidade. O melhor desenho distingue quando a chamada externa agrega valor real.",
      paragraphs: [
        "Se a pergunta é conceitual, atemporal e não depende de dado privado ou exato, talvez o modelo puro já resolva bem. Inserir retrieval ou function calling em todo turno pode encarecer e alongar interações sem melhorar o resultado.",
        "A maturidade está em identificar gatilhos: necessidade de factualidade recente, cálculo determinístico, permissão contextual, leitura de base privada ou execução no mundo. Fora desses casos, talvez a resposta direta seja a melhor arquitetura.",
      ],
      blocks: [
        {
          type: "mistake",
          title: "Erro comum",
          body:
            "Pressupor que toda resposta grounded será melhor. Em alguns casos, a camada extra só adiciona latência e ruído.",
        },
      ],
    },
    {
      id: "resumo",
      eyebrow: "Sintese",
      title: "Mapa mental de ferramentas e grounding",
      lead:
        "O modelo decide melhor quando as ferramentas sao claras, a execucao e controlada e as evidencias externas entram de forma relevante.",
      interactive: "summary-cards",
      paragraphs: [
        "Ferramentas ampliam ação, schemas ampliam previsibilidade e grounding amplia factualidade; as três coisas juntas pedem validação e arquitetura disciplinada.",
      ],
    },
    {
      id: "quiz-revisao",
      eyebrow: "Revisao",
      title: "Quiz de revisão",
      lead:
        "Verifique se ficaram claros o papel de schemas, a separacao entre chamada e execucao e a ideia de grounding.",
      interactive: "quiz",
      paragraphs: [
        "O foco é entender a arquitetura por trás do recurso, e não apenas a terminologia de API.",
      ],
    },
    {
      id: "glossario",
      eyebrow: "Vocabulário",
      title: "Glossário essencial",
      lead:
        "Termos centrais para trabalhar com modelos conectados a ferramentas e fontes externas.",
      interactive: "glossary",
      paragraphs: [
        "Use este glossário para manter nítida a diferença entre texto gerado, chamada sugerida e evidência observada.",
      ],
    },
  ],
  summaryCards: [
    {
      title: "Ferramentas deslocam responsabilidade",
      body:
        "Cálculo, consulta, execução e leitura de dados podem sair da memória estatística do modelo e ir para módulos mais apropriados.",
    },
    {
      title: "Schema é contrato, não ornamento",
      body:
        "Descrições, tipos e campos bem definidos aumentam a previsibilidade das chamadas e reduzem ambiguidade.",
    },
    {
      title: "Modelo nao deve executar sozinho",
      body:
        "A aplicação precisa validar, autorizar e controlar a chamada antes de qualquer efeito externo.",
    },
    {
      title: "Grounding melhora factualidade",
      body:
        "Respostas baseadas em evidência recente ou privada reduzem a necessidade de o modelo improvisar fatos.",
    },
    {
      title: "Roteamento e validação viram essenciais em escala",
      body:
        "Mais ferramentas exigem melhor seleção contextual, contratos mais claros e defesa contra entradas maliciosas ou irrelevantes.",
    },
  ],
  quiz: [
    {
      id: "q1",
      prompt: "Por que ferramentas são úteis para LLMs?",
      options: [
        { id: "a", label: "Porque permitem delegar busca, cálculo, leitura de base e ações a módulos especializados." },
        { id: "b", label: "Porque tornam o modelo automaticamente verdadeiro." },
        { id: "c", label: "Porque eliminam qualquer necessidade de validação." },
      ],
      correctOptionId: "a",
      feedback:
        "Ferramentas ampliam o tipo de trabalho que o sistema consegue fazer, mas não removem a necessidade de controle arquitetural.",
    },
    {
      id: "q2",
      prompt: "Qual é a função principal de um schema em function calling?",
      options: [
        { id: "a", label: "Orientar o modelo e a aplicação sobre formato, tipos e significado dos argumentos." },
        { id: "b", label: "Substituir autenticação do usuário." },
        { id: "c", label: "Impedir qualquer erro do modelo por definição." },
      ],
      correctOptionId: "a",
      feedback:
        "Schema é contrato de interface. Ele melhora previsibilidade, mas não dispensa validação posterior.",
    },
    {
      id: "q3",
      prompt: "Em uma arquitetura segura, quem executa a função real?",
      options: [
        { id: "a", label: "A camada de aplicação, após validar e autorizar a chamada sugerida pelo modelo." },
        { id: "b", label: "O modelo diretamente, sem intermediários." },
        { id: "c", label: "O próprio documento recuperado." },
      ],
      correctOptionId: "a",
      feedback:
        "Separar intenção gerada de execução real é parte central da confiabilidade e da segurança do sistema.",
    },
    {
      id: "q4",
      prompt: "O que grounding procura resolver?",
      options: [
        { id: "a", label: "Reduzir dependência da memória paramétrica quando a resposta precisa de evidência externa." },
        { id: "b", label: "Aumentar o tamanho da saída sem motivo." },
        { id: "c", label: "Eliminar toda latência do sistema." },
      ],
      correctOptionId: "a",
      feedback:
        "Grounding ancora a resposta em documentos, bancos de dados ou outros sinais observáveis do mundo.",
    },
    {
      id: "q5",
      prompt: "Qual risco continua existindo mesmo com function calling?",
      options: [
        { id: "a", label: "O modelo ainda pode escolher a ferramenta errada ou propor argumentos ruins." },
        { id: "b", label: "Nenhum; a estrutura elimina falhas." },
        { id: "c", label: "A aplicação deixa de precisar autorizar ações." },
      ],
      correctOptionId: "a",
      feedback:
        "A estrutura melhora muito o fluxo, mas a seleção e o preenchimento ainda podem falhar sem boa descrição e validação.",
    },
    {
      id: "q6",
      prompt: "Por que validar argumentos é importante?",
      options: [
        { id: "a", label: "Porque tipos, permissões e consistência com o estado do sistema precisam ser conferidos antes da execução." },
        { id: "b", label: "Porque o schema torna a validação redundante." },
        { id: "c", label: "Porque validação serve apenas para logs visuais." },
      ],
      correctOptionId: "a",
      feedback:
        "A validação protege contra chamadas incorretas, ambíguas ou perigosas antes que virem efeito real.",
    },
    {
      id: "q7",
      prompt: "Qual problema aparece quando há ferramentas demais sem organização?",
      options: [
        { id: "a", label: "O modelo pode se perder no catálogo e piorar a precisão de roteamento." },
        { id: "b", label: "O sistema sempre fica mais inteligente automaticamente." },
        { id: "c", label: "Grounding deixa de existir." },
      ],
      correctOptionId: "a",
      feedback:
        "Catálogo grande sem seleção contextual aumenta carga cognitiva e confusão na escolha.",
    },
    {
      id: "q8",
      prompt: "Qual cenário costuma justificar grounding?",
      options: [
        { id: "a", label: "Perguntas que dependem de fatos atuais, privados ou verificáveis em fontes externas." },
        { id: "b", label: "Qualquer saudação trivial." },
        { id: "c", label: "Toda resposta conceitual atemporal sem exceção." },
      ],
      correctOptionId: "a",
      feedback:
        "Quando a resposta depende de evidência externa, grounding geralmente vale o custo extra.",
    },
  ],
  glossary: [
    { term: "Ferramenta", definition: "Função, API ou sistema externo que o modelo pode acionar indiretamente para obter dados ou executar ações." },
    { term: "Function calling", definition: "Padrão em que o modelo propõe chamadas estruturadas para funções definidas pela aplicação." },
    { term: "Schema", definition: "Contrato que descreve os campos, tipos e significado esperado de uma ferramenta ou função." },
    { term: "Argumentos", definition: "Valores concretos que o modelo sugere para preencher a chamada de uma ferramenta." },
    { term: "Grounding", definition: "Ancoragem da resposta em evidências externas observadas pelo sistema." },
    { term: "Retrieval", definition: "Busca e seleção de contexto externo relevante antes ou durante a geração." },
    { term: "RAG", definition: "Retrieval-Augmented Generation, abordagem que combina recuperação de informação com geração textual." },
    { term: "Roteamento", definition: "Processo de selecionar qual ferramenta, conjunto de ferramentas ou fonte de contexto faz mais sentido para a tarefa atual." },
    { term: "Validação", definition: "Checagem de tipos, permissões, ranges e consistência dos argumentos antes da execução real." },
    { term: "Observação", definition: "Resultado retornado por uma ferramenta ou fonte externa para alimentar a próxima etapa do modelo." },
    { term: "Prompt injection", definition: "Tentativa de manipular o comportamento do sistema por instruções maliciosas embutidas em conteúdo externo ou entrada do usuário." },
    { term: "Memória paramétrica", definition: "Conhecimento armazenado implicitamente nos pesos do modelo a partir do pré-treinamento e ajustes posteriores." },
  ],
};
