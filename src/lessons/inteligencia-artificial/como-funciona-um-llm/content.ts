import type { LessonContent } from "../../../types/content";

export const comoFuncionaUmLlmContent: LessonContent = {
  id: "como-funciona-um-llm",
  title: "Como Funciona um LLM",
  subtitle:
    "Do texto aos tokens: como modelos de linguagem aprendem padrões estatísticos e geram respostas prevendo a próxima unidade provável.",
  description:
    "Uma aula visual sobre tokens, embeddings, Transformer, atenção, contexto, sampling, temperatura, alucinação e limites práticos de LLMs.",
  primaryCategoryId: "inteligencia-artificial",
  secondaryCategoryId: "computacao",
  level: "Intermediário",
  estimatedTime: "45-60 min",
  tags: ["LLM", "Transformer", "Tokens", "Embeddings", "Atenção", "NLP", "IA generativa"],
  learningObjectives: [
    "Explicar por que LLMs processam tokens, não frases humanas completas.",
    "Entender embeddings como representações numéricas que colocam tokens em um espaço de significado.",
    "Descrever o papel do Transformer e da autoatenção na combinação de contexto.",
    "Interpretar geração autoregressiva como previsão sequencial de próximos tokens.",
    "Distinguir logits, probabilidades, sampling, temperatura, top-k e top-p em nível conceitual.",
    "Reconhecer por que janela de contexto não equivale a memória permanente.",
    "Explicar por que alucinações podem surgir mesmo em respostas fluentes.",
    "Identificar limitações técnicas, sociais e operacionais de LLMs em aplicações reais.",
  ],
  prerequisites: [
    "Noção básica de probabilidade como medida de plausibilidade.",
    "Familiaridade inicial com tokens e embeddings ajuda, mas a aula recapitula os conceitos essenciais.",
    "Curiosidade sobre como chatbots geram texto sem consultar um roteiro pronto.",
  ],
  references: [
    {
      title: "Attention Is All You Need",
      source: "Vaswani et al., 2017 — arXiv",
      url: "https://arxiv.org/abs/1706.03762",
      note: "Artigo que introduziu a arquitetura Transformer e consolidou a autoatenção como mecanismo central para sequências.",
    },
    {
      title: "Language Models are Few-Shot Learners",
      source: "Brown et al., 2020 — arXiv",
      url: "https://arxiv.org/abs/2005.14165",
      note: "Artigo do GPT-3, referência histórica para LLMs autoregressivos em grande escala.",
    },
    {
      title: "Neural Machine Translation of Rare Words with Subword Units",
      source: "Sennrich, Haddow & Birch, 2016 — arXiv",
      url: "https://arxiv.org/abs/1508.07909",
      note: "Referência clássica sobre subword units e BPE, base conceitual de muitos tokenizadores modernos.",
    },
    {
      title: "Large language models",
      source: "Google Machine Learning Crash Course",
      url: "https://developers.google.com/machine-learning/crash-course/llm",
      note: "Material educacional sobre LLMs, tokens, autoatenção e previsão de linguagem.",
    },
    {
      title: "Introduction to Large Language Models",
      source: "Stanford CS324",
      url: "https://stanford-cs324.github.io/winter2022/lectures/introduction/",
      note: "Notas de curso sobre modelagem de linguagem, geração e temperatura.",
    },
    {
      title: "Text generation strategies",
      source: "Hugging Face Transformers Documentation",
      url: "https://huggingface.co/docs/transformers/v4.44.0/en/generation_strategies",
      note: "Documentação prática sobre estratégias de decodificação, sampling e parâmetros de geração.",
    },
    {
      title: "Why language models hallucinate",
      source: "OpenAI Research",
      url: "https://openai.com/research/why-language-models-hallucinate/",
      note: "Discussão recente sobre alucinações como desafio estrutural de modelos de linguagem.",
    },
  ],
  heroVisual: "llm-hero",
  openingText:
    "Um LLM não escreve porque tem uma lista de respostas prontas. Ele recebe um contexto, transforma esse contexto em números, calcula quais continuações são mais prováveis e escolhe uma delas. Repetido milhares de vezes, esse mecanismo simples na superfície produz respostas longas, coerentes e úteis. A parte difícil é entender como tokens, embeddings, atenção e sampling se encaixam para que uma previsão local pareça conversa, explicação ou raciocínio.",
  quickFacts: [
    {
      title: "A unidade básica é o token",
      body: "Antes de qualquer cálculo, o texto é quebrado em unidades menores. Um token pode ser uma palavra, parte de palavra, pontuação ou símbolo.",
    },
    {
      title: "O treinamento é estatístico",
      body: "Durante o pré-treinamento, o modelo ajusta bilhões de parâmetros para reduzir erros ao prever tokens ocultos ou próximos em enormes coleções de texto.",
    },
    {
      title: "Atenção mistura contexto",
      body: "Cada posição da sequência pode pesar outras posições. Isso permite ligar pronomes, termos técnicos, instruções e exemplos distantes no prompt.",
    },
    {
      title: "Fluência não garante verdade",
      body: "O objetivo de gerar uma continuação plausível não é o mesmo que verificar fatos. Por isso respostas convincentes ainda podem estar erradas.",
    },
  ],
  timeline: [
    {
      id: "n-gram",
      period: "Antes de 2010",
      title: "Modelos estatísticos de linguagem",
      description: "Sistemas estimavam a próxima palavra a partir de frequências locais, úteis mas limitados para dependências longas.",
    },
    {
      id: "embeddings",
      period: "2013",
      title: "Embeddings modernos",
      description: "Representações densas como Word2Vec tornaram similaridade semântica mais manipulável por redes neurais.",
    },
    {
      id: "transformer",
      period: "2017",
      title: "Transformer",
      description: "A autoatenção permitiu processar sequências de modo eficiente e relacionar tokens distantes.",
    },
    {
      id: "scale",
      period: "2020 em diante",
      title: "Escala e uso geral",
      description: "Modelos grandes demonstraram capacidade de seguir instruções, usar exemplos no contexto e gerar texto em muitas tarefas.",
    },
  ],
  sections: [
    {
      id: "tokens",
      eyebrow: "Entrada",
      title: "O modelo começa quebrando texto em tokens",
      lead: "A primeira transformação é discreta: texto humano vira uma sequência de unidades que o modelo consegue indexar.",
      paragraphs: [
        "O problema é que redes neurais não leem letras com significado humano. Elas precisam de números. Tokenização resolve a ponte inicial: divide o texto em unidades e associa cada unidade a um identificador no vocabulário do modelo.",
        "Tokenizadores modernos usam subpalavras para equilibrar flexibilidade e eficiência. Palavras frequentes podem virar um token só; palavras raras podem ser divididas em pedaços. Isso evita um vocabulário infinito e permite lidar com nomes, idiomas e termos novos.",
        "Isso importa porque custo, limite de contexto e qualidade dependem de tokens. Uma frase curta para humanos pode ocupar mais tokens em outro idioma, com muitos símbolos ou com termos pouco comuns.",
      ],
      interactive: "llm-tokenizer",
      blocks: [
        {
          type: "definition",
          title: "Token",
          body: "Unidade discreta de texto processada por um modelo. Pode representar uma palavra inteira, parte de palavra, pontuação, espaço ou símbolo.",
        },
        {
          type: "mistake",
          title: "Erro comum",
          body: "Achar que um token sempre equivale a uma palavra. Em muitos tokenizadores, 'imprevisibilidade' pode virar várias unidades menores.",
        },
      ],
    },
    {
      id: "embeddings",
      eyebrow: "Representação",
      title: "Tokens viram vetores antes de ganhar contexto",
      lead: "Depois da tokenização, cada identificador é convertido em um vetor numérico treinável.",
      paragraphs: [
        "Um token isolado é só um índice. O embedding é a tabela que transforma esse índice em coordenadas. Essas coordenadas não são escolhidas manualmente; elas são ajustadas durante o treinamento conforme ajudam o modelo a prever melhor.",
        "A intuição visual é um mapa: tokens que aparecem em contextos parecidos tendem a ocupar regiões próximas. Isso não significa que o modelo tenha conceitos humanos perfeitos, mas cria uma geometria útil para generalizar padrões.",
        "Embeddings de entrada ainda não resolvem ambiguidade por si só. A palavra 'banco' precisa do contexto para indicar instituição financeira ou assento. Essa contextualização acontece nas camadas do Transformer.",
      ],
      interactive: "embedding-map",
      blocks: [
        {
          type: "insight",
          title: "Por que vetores ajudam",
          body: "Com vetores, significado parcial vira operação matemática. O modelo pode comparar, combinar e transformar representações em muitas camadas.",
        },
        {
          type: "example",
          title: "Exemplo",
          body: "Em um espaço aprendido, 'gato' tende a ficar mais próximo de 'cachorro' do que de 'algoritmo', não pela grafia, mas pelos contextos em que aparece.",
        },
      ],
    },
    {
      id: "transformer",
      eyebrow: "Arquitetura",
      title: "O Transformer empilha camadas de mistura e transformação",
      lead: "A arquitetura organiza o processamento em blocos que combinam informação da sequência e refinam representações.",
      paragraphs: [
        "Antes dos Transformers, muitos modelos processavam sequências passo a passo. Isso dificultava capturar dependências longas e treinar em grande escala. O Transformer mudou o centro da arquitetura para atenção e processamento paralelo.",
        "Cada camada recebe vetores contextuais, aplica autoatenção para misturar informações entre posições e usa redes feed-forward para transformar cada posição. Repetir esse ciclo cria representações progressivamente mais úteis.",
        "Em LLMs geradores, uma máscara causal impede que a posição atual veja tokens futuros durante o treinamento. Assim, o modelo aprende a prever a continuação usando apenas o que veio antes.",
      ],
      visual: "transformer-stack",
      blocks: [
        {
          type: "definition",
          title: "Transformer",
          body: "Arquitetura neural baseada em atenção, camadas feed-forward, normalização e conexões residuais para processar sequências de tokens.",
        },
        {
          type: "insight",
          title: "O detalhe decisivo",
          body: "O modelo não guarda uma árvore gramatical explícita. Ele aprende transformações numéricas que tornam a próxima previsão mais provável.",
        },
      ],
    },
    {
      id: "atencao",
      eyebrow: "Contexto interno",
      title: "Atenção decide quais relações merecem peso",
      lead: "Autoatenção permite que cada token consulte outros tokens e combine sinais relevantes.",
      paragraphs: [
        "Atenção resolve um problema essencial: a interpretação de uma palavra depende do resto da frase. Em 'o banco fica perto do rio', o termo 'rio' muda a leitura provável de 'banco'.",
        "Tecnicamente, cada posição produz consultas, chaves e valores. Consultas são comparadas com chaves para calcular pesos; os valores são combinados por esses pesos. O resultado é um vetor contextualizado.",
        "Múltiplas cabeças de atenção observam relações diferentes ao mesmo tempo. Algumas podem capturar sintaxe, outras entidades, outras padrões de instrução. Não devemos tratar cada peso como explicação humana definitiva, mas ele é parte real do mecanismo.",
      ],
      interactive: "attention-map",
      blocks: [
        {
          type: "example",
          title: "Exemplo",
          body: "Em 'Maria entregou o livro a Ana porque ela pediu', atenção ajuda a distribuir sinais para interpretar a quem 'ela' provavelmente se refere.",
        },
        {
          type: "mistake",
          title: "Erro comum",
          body: "Dizer que atenção é exatamente o mesmo que compreensão. Ela é um mecanismo de cálculo, não uma garantia de interpretação humana.",
        },
      ],
    },
    {
      id: "janela-contexto",
      eyebrow: "Memória de trabalho",
      title: "A janela de contexto limita o que o modelo enxerga agora",
      lead: "O LLM só condiciona a geração ao conteúdo presente na janela de contexto daquela chamada.",
      paragraphs: [
        "Quando você conversa com um assistente, o sistema envia instruções, histórico relevante, documentos e sua pergunta dentro de um limite. Tudo isso compete pelo mesmo orçamento de tokens.",
        "A janela de contexto é parecida com uma mesa de trabalho: cabe muita coisa, mas não tudo. Se um documento importante fica fora, o modelo não consegue usá-lo diretamente. Se a resposta reservada é grande, sobra menos espaço para entrada.",
        "Isso explica por que aplicações robustas usam recuperação de documentos, resumo de histórico e seleção cuidadosa de contexto. A qualidade não depende só do modelo; depende do que chega até ele.",
      ],
      visual: "context-window",
      blocks: [
        {
          type: "definition",
          title: "Janela de contexto",
          body: "Quantidade máxima de tokens que o modelo pode considerar em uma geração, incluindo instruções, prompt, histórico, documentos e saída gerada.",
        },
        {
          type: "insight",
          title: "Memória não é contexto",
          body: "Um modelo pode parecer lembrar, mas a geração atual só usa o que está no contexto enviado ou em mecanismos externos de memória/recuperação.",
        },
      ],
    },
    {
      id: "predicao",
      eyebrow: "Saída",
      title: "Gerar texto é prever um token, depois outro, depois outro",
      lead: "A cada passo, o modelo calcula uma distribuição de probabilidade sobre o vocabulário.",
      paragraphs: [
        "O mecanismo de geração autoregressiva é simples de enunciar: dado o contexto anterior, calcule o próximo token provável. Depois anexe esse token ao contexto e repita.",
        "O modelo não escolhe uma frase inteira de uma vez. Ele cria uma distribuição sobre candidatos. Tokens coerentes com a pergunta, o estilo e o histórico recebem probabilidade maior; tokens improváveis recebem probabilidade menor.",
        "Esse processo explica tanto a fluência quanto alguns erros. Uma sequência localmente plausível pode se afastar de fatos reais se o modelo não tiver evidência suficiente ou se a estratégia de decodificação favorecer uma continuação sedutora.",
      ],
      interactive: "next-token-prediction",
      blocks: [
        {
          type: "definition",
          title: "Modelo autoregressivo",
          body: "Modelo que gera uma sequência usando os elementos anteriores como condição para prever o próximo elemento.",
        },
        {
          type: "example",
          title: "Exemplo",
          body: "Depois de 'A capital do Brasil é', 'Brasília' deve ter probabilidade muito maior do que 'banana'. O modelo aprende isso por padrões recorrentes nos dados.",
        },
      ],
    },
    {
      id: "sampling",
      eyebrow: "Decodificação",
      title: "Sampling transforma probabilidades em uma escolha concreta",
      lead: "Nem sempre escolhemos o token mais provável; parâmetros de geração controlam variação e risco.",
      paragraphs: [
        "Se sempre escolhermos o maior candidato, a saída tende a ser estável, mas pode ficar repetitiva ou presa em formulações previsíveis. Sampling permite sortear entre candidatos plausíveis.",
        "Temperatura ajusta a concentração da distribuição. Valores baixos deixam o modelo conservador; valores altos aumentam diversidade. Top-k e top-p restringem o sorteio a um conjunto de candidatos considerados viáveis.",
        "A escolha correta depende da tarefa. Para código, contratos ou respostas factuais, costuma-se preferir baixa variação. Para brainstorming, nomes, histórias ou alternativas de redação, alguma aleatoriedade pode ser útil.",
      ],
      interactive: "temperature-sampling",
      blocks: [
        {
          type: "definition",
          title: "Temperatura",
          body: "Parâmetro de decodificação que controla quão concentrada ou espalhada fica a distribuição usada para escolher o próximo token.",
        },
        {
          type: "mistake",
          title: "Erro comum",
          body: "Aumentar temperatura não deixa o modelo mais inteligente. Apenas muda o padrão de escolha, muitas vezes aumentando criatividade e erro ao mesmo tempo.",
        },
      ],
    },
    {
      id: "treinamento",
      eyebrow: "Aprendizagem",
      title: "O modelo aprende comprimindo regularidades do texto",
      lead: "Treinamento não é copiar a internet; é ajustar parâmetros para prever melhor padrões observados.",
      paragraphs: [
        "Durante o pré-treinamento, o modelo vê muitos exemplos e compara suas previsões com o token real. O erro é usado para ajustar pesos internos. Após muitos passos, os parâmetros codificam regularidades linguísticas, factuais, estilísticas e estatísticas.",
        "Essa aprendizagem é poderosa porque padrões se transferem. O mesmo mecanismo que aprende gramática pode aprender formatos de tabela, estilo de explicação, analogias e trechos de código.",
        "Mas também absorve ruído, lacunas e vieses. Se os dados contêm associações injustas ou fatos desatualizados, o modelo pode reproduzir padrões problemáticos. Treinamento posterior e filtros reduzem riscos, mas não eliminam o problema.",
      ],
      blocks: [
        {
          type: "insight",
          title: "Compressão útil",
          body: "Um LLM pode ser visto como uma compressão estatística muito sofisticada de padrões de linguagem, não como um banco de dados consultável linha por linha.",
        },
        {
          type: "example",
          title: "Exemplo",
          body: "Ao ver muitas receitas, o modelo aprende estruturas como ingredientes, preparo e tempo. Isso permite gerar uma receita plausível mesmo sem recuperar uma receita específica.",
        },
      ],
    },
    {
      id: "alucinacao",
      eyebrow: "Falhas",
      title: "Alucinação é plausibilidade sem ancoragem suficiente",
      lead: "O modelo pode produzir texto fluente e ainda assim falso, inventado ou incompatível com a fonte.",
      paragraphs: [
        "Alucinação não acontece porque o modelo decide mentir. Ela surge quando o mecanismo de geração encontra uma continuação linguística plausível sem garantia factual. Se o prompt pede uma referência inexistente, por exemplo, o formato de citação pode ser mais fácil de prever do que a honestidade sobre a ausência da fonte.",
        "O risco cresce em perguntas ambíguas, domínios especializados, dados recentes, tarefas que exigem cálculo exato ou citações. Mesmo quando o modelo sabe padrões gerais, pode preencher lacunas com detalhes que parecem corretos.",
        "Mitigação envolve dar fontes, recuperar documentos, pedir incerteza, validar respostas, usar ferramentas externas e criar testes. O ponto prático é não confundir boa redação com verificação.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Alucinação",
          body: "Resposta gerada que parece natural ou confiante, mas é falsa, sem suporte ou infiel ao contexto fornecido.",
        },
        {
          type: "mistake",
          title: "Erro comum",
          body: "Tratar uma resposta detalhada como mais confiável apenas por ser detalhada. Detalhe pode ser estilo, não evidência.",
        },
      ],
    },
    {
      id: "limitacoes",
      eyebrow: "Aplicação",
      title: "LLMs são componentes poderosos, não oráculos",
      lead: "A engenharia responsável combina modelo, contexto, ferramentas, validação e critérios de risco.",
      paragraphs: [
        "LLMs são ótimos para linguagem, síntese, transformação de texto, programação assistida e exploração de ideias. Eles são menos confiáveis quando precisam garantir verdade, estado atualizado, cálculo exato ou decisão de alto impacto sem verificação.",
        "A pergunta de engenharia não é 'o modelo sabe?'. É 'o sistema tem evidência, ferramenta, limite e teste para esta tarefa?'. Um bom produto com LLM delimita escopo, mede falhas e oferece caminhos de revisão humana quando necessário.",
        "Entender tokens, embeddings, atenção, contexto e sampling ajuda a projetar prompts melhores, diagnosticar erros e escolher quando usar ou não usar IA generativa.",
      ],
      interactive: "summary-cards",
      blocks: [
        {
          type: "insight",
          title: "Critério prático",
          body: "Use LLMs para acelerar trabalho cognitivo, mas use fontes, testes e ferramentas quando a resposta precisa ser correta, auditável ou atualizada.",
        },
      ],
    },
    {
      id: "quiz-revisao",
      eyebrow: "Revisão",
      title: "Verifique se o mecanismo ficou conectado",
      lead: "Responda às perguntas para revisar o caminho completo: tokenização, Transformer, geração e limites.",
      paragraphs: ["O objetivo do quiz é testar relações entre conceitos, não decorar nomes de componentes."],
      interactive: "quiz",
    },
    {
      id: "glossario",
      eyebrow: "Vocabulário",
      title: "Glossário essencial de LLMs",
      lead: "Termos para consultar quando estiver lendo documentação, papers ou configurando uma aplicação.",
      paragraphs: ["Use o glossário como mapa rápido dos conceitos que aparecem em discussões técnicas sobre modelos de linguagem."],
      interactive: "glossary",
    },
  ],
  summaryCards: [
    {
      title: "Pipeline mental",
      body: "Texto vira tokens; tokens viram embeddings; camadas Transformer contextualizam; uma distribuição prevê o próximo token; sampling escolhe a continuação.",
    },
    {
      title: "O ponto crítico",
      body: "O modelo aprende padrões estatísticos úteis, mas não possui garantia automática de verdade, memória completa ou compreensão humana.",
    },
    {
      title: "Uso responsável",
      body: "Para tarefas importantes, combine LLM com contexto confiável, ferramentas, validação, logs e revisão adequada ao risco.",
    },
  ],
  quiz: [
    {
      id: "q1",
      prompt: "Qual é a função inicial da tokenização em um LLM?",
      options: [
        { id: "a", label: "Converter texto em unidades discretas que podem ser mapeadas para números." },
        { id: "b", label: "Verificar automaticamente se o texto é verdadeiro." },
        { id: "c", label: "Traduzir todas as palavras para inglês." },
      ],
      correctOptionId: "a",
      feedback: "Tokenização divide o texto em unidades que recebem IDs e entram no modelo.",
    },
    {
      id: "q2",
      prompt: "Por que embeddings são importantes?",
      options: [
        { id: "a", label: "Porque substituem completamente a necessidade de contexto." },
        { id: "b", label: "Porque transformam tokens em vetores que podem carregar relações aprendidas." },
        { id: "c", label: "Porque impedem alucinações." },
      ],
      correctOptionId: "b",
      feedback: "Embeddings são representações numéricas treináveis usadas pelas camadas seguintes.",
    },
    {
      id: "q3",
      prompt: "O que a autoatenção permite fazer?",
      options: [
        { id: "a", label: "Combinar informação entre posições da sequência." },
        { id: "b", label: "Acessar qualquer site em tempo real." },
        { id: "c", label: "Eliminar a necessidade de treinamento." },
      ],
      correctOptionId: "a",
      feedback: "Atenção pesa relações entre tokens para contextualizar cada posição.",
    },
    {
      id: "q4",
      prompt: "Em um LLM autoregressivo, como o texto é gerado?",
      options: [
        { id: "a", label: "A frase inteira é escolhida de uma lista fixa." },
        { id: "b", label: "Um token é previsto e anexado ao contexto repetidamente." },
        { id: "c", label: "Todas as respostas são copiadas do documento mais próximo." },
      ],
      correctOptionId: "b",
      feedback: "A geração autoregressiva repete previsão e anexação de tokens.",
    },
    {
      id: "q5",
      prompt: "O que temperatura alta tende a fazer?",
      options: [
        { id: "a", label: "Espalhar a distribuição e aumentar diversidade." },
        { id: "b", label: "Garantir respostas factuais." },
        { id: "c", label: "Aumentar a janela de contexto." },
      ],
      correctOptionId: "a",
      feedback: "Temperatura alta aumenta variação, mas também pode elevar o risco de saídas ruins.",
    },
    {
      id: "q6",
      prompt: "Qual afirmação sobre janela de contexto é correta?",
      options: [
        { id: "a", label: "Ela é tudo que o modelo pode considerar diretamente naquela geração." },
        { id: "b", label: "Ela é uma memória permanente de todas as conversas." },
        { id: "c", label: "Ela contém automaticamente todos os fatos da internet." },
      ],
      correctOptionId: "a",
      feedback: "A janela de contexto limita instruções, histórico, documentos e saída considerados na chamada.",
    },
    {
      id: "q7",
      prompt: "Por que alucinações podem ocorrer?",
      options: [
        { id: "a", label: "Porque fluência probabilística não garante ancoragem factual." },
        { id: "b", label: "Porque tokenizadores sempre removem substantivos." },
        { id: "c", label: "Porque embeddings não usam números." },
      ],
      correctOptionId: "a",
      feedback: "O modelo pode gerar continuação plausível sem evidência suficiente para verdade.",
    },
    {
      id: "q8",
      prompt: "Qual é uma boa prática em aplicações de alto risco?",
      options: [
        { id: "a", label: "Aceitar a resposta mais longa como correta." },
        { id: "b", label: "Usar fontes, ferramentas, validação e revisão apropriada." },
        { id: "c", label: "Sempre aumentar a temperatura." },
      ],
      correctOptionId: "b",
      feedback: "Sistemas confiáveis combinam LLM com evidência, controles e verificação.",
    },
  ],
  glossary: [
    { term: "LLM", definition: "Large Language Model: modelo de linguagem grande treinado para processar e gerar sequências de texto ou tokens." },
    { term: "Token", definition: "Unidade de texto usada pelo modelo, como palavra, subpalavra, pontuação ou símbolo." },
    { term: "Tokenizador", definition: "Algoritmo que divide texto em tokens e converte cada token em um identificador." },
    { term: "Embedding", definition: "Vetor numérico que representa um token ou trecho em um espaço aprendido." },
    { term: "Transformer", definition: "Arquitetura neural baseada em autoatenção e blocos feed-forward para processar sequências." },
    { term: "Autoatenção", definition: "Mecanismo em que cada posição da sequência calcula pesos sobre outras posições para combinar informação." },
    { term: "Janela de contexto", definition: "Limite de tokens que o modelo considera diretamente durante uma geração." },
    { term: "Logit", definition: "Valor bruto produzido pelo modelo antes de ser convertido em probabilidade." },
    { term: "Sampling", definition: "Processo de escolher o próximo token a partir de uma distribuição de probabilidades." },
    { term: "Temperatura", definition: "Parâmetro que controla o espalhamento da distribuição de probabilidades durante a geração." },
    { term: "Top-p", definition: "Estratégia que restringe a escolha ao menor conjunto de tokens cuja probabilidade acumulada atinge um limite." },
    { term: "Alucinação", definition: "Resposta plausível na forma, mas falsa, sem suporte ou infiel ao contexto." },
  ],
  relatedTopics: [
    {
      title: "Tokens e tokenização",
      body: "Aprofunde como encodings reais dividem texto e afetam custo, contexto e idiomas.",
    },
    {
      title: "Embeddings",
      body: "Explore como vetores representam significado e servem de base para busca semântica.",
    },
  ],
};
