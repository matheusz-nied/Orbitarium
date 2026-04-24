import type { LessonContent } from "../../../types/content";

export const tokensTokenizacaoContent: LessonContent = {
  id: "tokens-tokenizacao",
  title: "Tokens e Tokenização",
  subtitle:
    "Por que modelos de linguagem não leem texto como humanos: eles transformam frases em unidades menores, numéricas e limitadas por uma janela de contexto.",
  description:
    "Uma aula visual sobre tokens, subwords, vocabulário, encoding, contexto, custo, limites, idiomas e truncamento em modelos de linguagem.",
  primaryCategoryId: "inteligencia-artificial",
  secondaryCategoryId: "computacao",
  level: "Intermediário",
  estimatedTime: "35-50 min",
  tags: [
    "Inteligência Artificial",
    "LLM",
    "Tokenização",
    "NLP",
    "Subword",
    "Contexto",
    "Custo",
  ],
  learningObjectives: [
    "Entender por que modelos processam tokens em vez de palavras humanas.",
    "Diferenciar caractere, palavra, subword, token, vocabulário e encoding.",
    "Ver como texto comum, texto raro, código, acentos, emojis e idiomas diferentes mudam a contagem de tokens.",
    "Relacionar tokens com custo, latência, limites de contexto e truncamento.",
    "Usar a contagem de tokens como ferramenta prática para escrever prompts, resumir documentos e projetar aplicações com LLMs.",
  ],
  prerequisites: [
    "Noção básica de que modelos de linguagem recebem texto e geram texto.",
    "Familiaridade simples com listas, tabelas e números.",
    "Curiosidade sobre como prompts grandes são processados por sistemas de IA.",
  ],
  references: [
    {
      title: "What are tokens and how to count them?",
      source: "OpenAI Help Center",
      url: "https://help.openai.com/en/articles/4936856-what-are-tokens-and-how-to-count-them",
      note:
        "Definição prática de tokens, limites, categorias de uso e variação por idioma.",
    },
    {
      title: "How to count tokens with tiktoken",
      source: "OpenAI Cookbook",
      url: "https://developers.openai.com/cookbook/examples/how_to_count_tokens_with_tiktoken",
      note:
        "Exemplos de contagem programática e explicação sobre encodings usados por modelos.",
    },
    {
      title: "tiktoken",
      source: "OpenAI GitHub",
      url: "https://github.com/openai/tiktoken",
      note:
        "Biblioteca oficial de tokenização BPE usada para contar tokens em modelos da OpenAI.",
    },
    {
      title: "Pricing",
      source: "OpenAI API Docs",
      url: "https://developers.openai.com/api/docs/pricing",
      note:
        "Referência atual para entender que preços de API são definidos por quantidade e tipo de token.",
    },
    {
      title: "Summary of the tokenizers",
      source: "Hugging Face Transformers",
      url: "https://huggingface.co/docs/transformers/v4.39.1/tokenizer_summary",
      note:
        "Resumo educacional sobre tokenização por palavras, subwords, BPE, WordPiece e SentencePiece.",
    },
    {
      title: "Neural Machine Translation of Rare Words with Subword Units",
      source: "ACL Anthology",
      url: "https://aclanthology.org/P16-1162/",
      note:
        "Artigo clássico sobre unidades subword para lidar melhor com palavras raras e vocabulário aberto.",
    },
    {
      title:
        "SentencePiece: A simple and language independent subword tokenizer and detokenizer for Neural Text Processing",
      source: "Hugging Face Papers",
      url: "https://huggingface.co/papers/1808.06226",
      note:
        "Referência sobre tokenização subword treinada diretamente em sentenças brutas e útil para múltiplos idiomas.",
    },
  ],
  heroVisual: "tokenization-hero",
  openingText:
    "Quando você escreve um prompt, vê palavras, espaços, pontuação e intenção. O modelo vê outra coisa: uma sequência de números que apontam para pedaços de texto aprendidos durante o treinamento do tokenizador.",
  quickFacts: [
    {
      title: "Token não é palavra",
      body:
        "Um token pode ser uma palavra inteira, parte de uma palavra, um espaço, pontuação ou uma sequência de bytes.",
    },
    {
      title: "Encoding importa",
      body:
        "O mesmo texto pode gerar contagens diferentes se for processado por encodings diferentes.",
    },
    {
      title: "Contexto é orçamento",
      body:
        "Entrada, histórico, documentos e resposta disputam a mesma janela de contexto do modelo.",
    },
    {
      title: "Custo segue tokens",
      body:
        "Em APIs de LLM, cobranças e limites costumam depender de tokens de entrada, saída e cache.",
    },
  ],
  sections: [
    {
      id: "texto-nao-entra-como-texto",
      eyebrow: "Ideia central",
      title: "O modelo não recebe a frase como você a lê",
      lead:
        "Para uma pessoa, uma frase é feita de palavras e sentido. Para um modelo, ela precisa virar uma sequência de unidades discretas antes de qualquer cálculo.",
      visual: "tokenization-hero",
      paragraphs: [
        "A intuição humana enxerga texto como significado: uma pergunta, uma ordem, uma lembrança, uma história. Um modelo de linguagem começa por uma etapa mais mecânica. O texto é quebrado em partes, cada parte vira um identificador numérico e esses números entram nas camadas do modelo.",
        "Essa transformação é necessária porque redes neurais trabalham com vetores e operações matemáticas. Elas não manipulam diretamente letras coloridas na tela. O que chega ao modelo é uma sequência ordenada de IDs, e cada ID representa um token conhecido pelo tokenizador.",
        "Isso explica por que pequenos detalhes do texto podem ter efeitos práticos. Um espaço antes de uma palavra, uma letra maiúscula, um acento, um emoji ou uma palavra rara podem mudar a segmentação e a contagem de tokens.",
      ],
      blocks: [
        {
          type: "insight",
          title: "A tradução invisível",
          body:
            "Tokenização é a tradução entre o texto que humanos escrevem e a sequência numérica que modelos conseguem processar.",
        },
        {
          type: "mistake",
          title: "Não confunda leitura com processamento",
          body:
            "Dizer que o modelo 'leu' uma frase é uma metáfora útil, mas a operação real começa com divisão em tokens, IDs e vetores.",
        },
      ],
    },
    {
      id: "o-que-e-token",
      eyebrow: "Token",
      title: "Token é uma unidade de processamento",
      lead:
        "Um token é um pedaço de texto que o tokenizador reconhece como uma unidade. Ele pode coincidir com uma palavra, mas não precisa.",
      visual: "token-chip-flow",
      interactive: "token-playground",
      paragraphs: [
        "A palavra 'casa' pode aparecer como um token único em certo encoding, mas uma palavra mais incomum pode ser quebrada em vários pedaços menores. Em outros casos, o token inclui um espaço antes da palavra, porque o tokenizador aprendeu que esse padrão aparece com frequência.",
        "O objetivo não é imitar a divisão gramatical perfeita. O objetivo é construir uma representação eficiente para o modelo. Um vocabulário puramente por caracteres deixaria sequências muito longas; um vocabulário puramente por palavras teria dificuldade com nomes novos, erros de digitação e palavras raras.",
        "Subwords são um meio-termo. Elas permitem que o modelo reaproveite partes frequentes, como prefixos, sufixos, radicais e combinações comuns, sem precisar conhecer todas as palavras possíveis como unidades inteiras.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Token",
          body:
            "Unidade textual que o tokenizador converte em um ID numérico antes de enviar a sequência ao modelo.",
        },
        {
          type: "example",
          title: "O que pode virar token",
          body:
            "Dependendo do encoding, tokens podem representar diferentes tipos de pedaços textuais.",
          items: [
            "uma palavra comum",
            "um pedaço de palavra",
            "um espaço seguido de palavra",
            "um sinal de pontuação",
            "parte de um emoji ou de outro caractere Unicode",
          ],
        },
      ],
    },
    {
      id: "espacos-pontuacao-contexto",
      eyebrow: "Detalhes que contam",
      title: "Espaços, pontuação e maiúsculas também entram no jogo",
      lead:
        "Tokenização não é apenas contar palavras. O contexto visual da palavra dentro da frase também pode alterar o token gerado.",
      visual: "token-boundaries",
      paragraphs: [
        "Uma palavra no início de uma frase pode ser tokenizada de forma diferente da mesma palavra depois de um espaço. Isso acontece porque muitos encodings aprendem padrões com espaços incorporados aos tokens, como ' modelo' em vez de apenas 'modelo'.",
        "Pontuação também importa. Uma vírgula, um ponto, parênteses ou aspas podem ser tokens próprios ou aparecer conectados a outros fragmentos. Em código, isso fica ainda mais evidente: chaves, indentação, operadores e quebras de linha fazem parte da sequência.",
        "A consequência prática é simples: o número de palavras não basta para estimar bem o tamanho de um prompt. Duas frases com a mesma quantidade de palavras podem ter contagens de tokens diferentes por causa de acentos, nomes, símbolos e formatação.",
      ],
      blocks: [
        {
          type: "example",
          title: "Mesma palavra, situação diferente",
          body:
            "A palavra no começo da frase, no meio da frase ou colada à pontuação pode gerar tokens diferentes. O modelo não vê apenas a palavra isolada; vê o padrão textual codificado.",
        },
        {
          type: "mistake",
          title: "Contar palavras não é contar tokens",
          body:
            "A contagem de palavras pode servir como aproximação grosseira, mas não substitui o tokenizador real quando limites e custos importam.",
        },
      ],
    },
    {
      id: "subwords-palavras-raras",
      eyebrow: "Subword",
      title: "Palavras comuns tendem a ser compactas; palavras raras se quebram",
      lead:
        "Tokenizadores modernos costumam decompor palavras incomuns em partes menores para lidar com vocabulário aberto.",
      visual: "subword-split",
      interactive: "rarity-comparison",
      paragraphs: [
        "Imagine um sistema que só aceitasse palavras já vistas. Ele falharia com sobrenomes, neologismos, nomes de remédios, termos técnicos e erros de digitação. Subwords ajudam a evitar esse problema porque uma palavra nova pode ser montada a partir de pedaços conhecidos.",
        "Essa estratégia foi importante em tradução neural e se tornou comum em modelos de linguagem. Em vez de representar toda palavra rara como 'desconhecida', o sistema divide a palavra em fragmentos que carregam alguma regularidade estatística.",
        "O preço dessa flexibilidade é que textos com muitos termos raros podem consumir mais tokens. Um nome técnico longo pode ocupar muito mais espaço de contexto do que uma expressão cotidiana com a mesma quantidade de caracteres aparentes.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Subword",
          body:
            "Pedaço menor que uma palavra inteira, mas maior ou mais informativo que um caractere isolado. Subwords permitem recombinar partes frequentes para representar palavras novas ou raras.",
        },
        {
          type: "insight",
          title: "Vocabulário aberto por montagem",
          body:
            "O tokenizador não precisa guardar todas as palavras possíveis. Ele pode compor palavras novas a partir de peças reutilizáveis.",
        },
      ],
    },
    {
      id: "vocabulario-ids",
      eyebrow: "Vocabulário",
      title: "O vocabulário liga pedaços de texto a números",
      lead:
        "Depois de segmentar o texto, o tokenizador consulta um vocabulário: cada token conhecido corresponde a um ID.",
      visual: "vocabulary-map",
      paragraphs: [
        "O vocabulário do tokenizador é como uma tabela enorme. De um lado há fragmentos textuais; do outro, IDs numéricos. Esses IDs são a forma compacta de representar a sequência antes de convertê-la em vetores.",
        "O número do token não é o significado completo do token. Ele é um índice. O significado aparece indiretamente quando o modelo aprende representações vetoriais e padrões de uso para esses índices durante o treinamento.",
        "Essa diferença é importante porque o tokenizador e o modelo precisam combinar. Se você alimenta um modelo com IDs produzidos por regras incompatíveis, os números deixam de apontar para as unidades esperadas.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Vocabulário",
          body:
            "Conjunto de tokens que um tokenizador conhece, junto com os IDs numéricos usados para representá-los.",
        },
        {
          type: "mistake",
          title: "ID não é significado",
          body:
            "O ID do token é um endereço na tabela do tokenizador. Ele só ganha utilidade dentro do modelo que aprendeu a trabalhar com aquele encoding.",
        },
      ],
    },
    {
      id: "encoding-regras-do-jogo",
      eyebrow: "Encoding",
      title: "Encoding é o conjunto de regras que transforma texto em tokens",
      lead:
        "Modelos diferentes podem usar encodings diferentes. Trocar o encoding pode mudar a divisão, os IDs e a contagem.",
      visual: "encoding-layers",
      interactive: "encoding-comparison",
      paragraphs: [
        "Um encoding define como o texto é pré-processado, quais padrões são reconhecidos e como os tokens são mapeados para IDs. Por isso, tokenização não é uma propriedade universal do texto. É uma propriedade do texto dentro de um tokenizador específico.",
        "A OpenAI mantém encodings como `cl100k_base` e `o200k_base`, e bibliotecas como `tiktoken` permitem contar tokens com as mesmas regras usadas por modelos compatíveis. Isso é muito melhor do que estimar apenas por caracteres ou palavras.",
        "Na prática, sempre que um limite de API, custo ou janela de contexto estiver em jogo, o encoding certo deve ser usado. A pergunta correta não é só 'quantos tokens este texto tem?', mas 'quantos tokens este texto tem para este modelo ou encoding?'.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Encoding",
          body:
            "Conjunto de regras e tabelas que converte texto em tokens e tokens em IDs, de forma compatível com determinados modelos.",
        },
        {
          type: "example",
          title: "Por que comparar encodings",
          body:
            "Um texto curto em português pode ter uma contagem próxima em dois encodings, enquanto emojis, código ou caracteres de outros sistemas de escrita podem divergir mais.",
        },
      ],
    },
    {
      id: "idiomas-e-sistemas-de-escrita",
      eyebrow: "Idiomas",
      title: "Idiomas diferentes não pagam o mesmo preço em tokens",
      lead:
        "A eficiência da tokenização depende dos dados e padrões aprendidos pelo tokenizador. Nem todos os idiomas são compactados da mesma forma.",
      visual: "language-grid",
      interactive: "language-comparison",
      paragraphs: [
        "Textos em inglês costumam ser bem compactados por muitos tokenizadores usados em LLMs, porque há grande presença de inglês nos dados e nos padrões de treinamento. Outros idiomas podem precisar de mais tokens para transmitir uma quantidade parecida de informação.",
        "Português geralmente fica em uma zona intermediária: palavras frequentes aparecem bem, mas acentos, flexões e termos menos comuns podem aumentar a fragmentação. Idiomas sem espaços entre palavras ou com sistemas de escrita diferentes podem apresentar comportamento ainda mais distinto.",
        "Isso importa para produto e pesquisa. Um limite de contexto que parece confortável em inglês pode ficar mais apertado em outro idioma. Avaliar aplicações multilíngues exige medir tokens no idioma real dos usuários, não apenas traduzir exemplos curtos.",
      ],
      blocks: [
        {
          type: "insight",
          title: "Tokenização também é uma questão de idioma",
          body:
            "Quando uma aplicação atende vários idiomas, o orçamento de contexto e custo precisa considerar que a mesma ideia pode ocupar quantidades diferentes de tokens.",
        },
        {
          type: "mistake",
          title: "Não generalize a partir do inglês",
          body:
            "Regras práticas como caracteres por token são úteis para intuição, mas podem falhar em textos multilíngues, técnicos ou com muitos símbolos.",
        },
      ],
    },
    {
      id: "janela-de-contexto",
      eyebrow: "Contexto",
      title: "A janela de contexto é o espaço de trabalho do modelo",
      lead:
        "Tudo que o modelo precisa considerar precisa caber em uma sequência limitada: instruções, pergunta, histórico, documentos e resposta.",
      visual: "context-window",
      interactive: "context-budget",
      paragraphs: [
        "A janela de contexto é frequentemente descrita como a memória temporária do modelo. Ela não é memória permanente; é o conjunto de tokens disponível naquela chamada ou conversa para orientar a próxima resposta.",
        "Entrada e saída disputam o mesmo orçamento. Se você envia um documento enorme, sobra menos espaço para histórico, instruções auxiliares e resposta. Se pede uma resposta muito longa, precisa reservar tokens para ela.",
        "Essa limitação força escolhas de arquitetura: resumir documentos, recuperar trechos relevantes, compactar histórico, dividir tarefas em etapas ou escolher um modelo com contexto maior quando isso for necessário.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Janela de contexto",
          body:
            "Quantidade máxima de tokens que um modelo consegue considerar em uma chamada, somando entrada, histórico e espaço reservado para saída.",
        },
        {
          type: "example",
          title: "O que ocupa contexto",
          body:
            "Não é apenas a pergunta final. Instruções do sistema, mensagens anteriores, documentos recuperados, ferramentas e resposta esperada também entram na conta.",
        },
      ],
    },
    {
      id: "custo-latencia",
      eyebrow: "Custo",
      title: "Tokens também são unidade de custo e tempo",
      lead:
        "Em APIs de modelos de linguagem, o consumo costuma ser medido por tokens de entrada, saída e, em alguns casos, cache ou raciocínio interno.",
      visual: "cost-meter",
      interactive: "cost-context-simulator",
      paragraphs: [
        "Quanto maior a entrada, mais trabalho o modelo precisa fazer para processar o contexto. Quanto maior a saída, mais passos de geração são necessários. Isso afeta custo e pode afetar latência.",
        "Preços mudam por modelo e modalidade, então uma boa aula não deve decorar uma tabela fixa. O hábito correto é olhar a página de preços atual e entender a fórmula: tokens multiplicados pelo preço correspondente.",
        "Essa visão muda como projetamos prompts. Em vez de jogar todo o histórico e todos os documentos na entrada, muitas aplicações reduzem contexto com busca, resumo e seleção de trechos realmente relevantes.",
      ],
      blocks: [
        {
          type: "formula",
          title: "Estimativa simples",
          body:
            "Uma conta prática separa entrada e saída porque elas podem ter preços diferentes.",
          formula:
            "custo aproximado = (tokens_entrada / 1.000.000 * preco_entrada) + (tokens_saida / 1.000.000 * preco_saida)",
        },
        {
          type: "mistake",
          title: "Mais contexto nem sempre é melhor",
          body:
            "Contexto extra pode aumentar custo, latência e ruído. A melhor entrada é suficiente, relevante e bem organizada.",
        },
      ],
    },
    {
      id: "limites-truncamento",
      eyebrow: "Limites",
      title: "Quando passa do limite, algo precisa sair",
      lead:
        "Se a entrada e a saída reservada ultrapassam a janela de contexto, a aplicação precisa reduzir, dividir ou truncar conteúdo.",
      visual: "truncation-visual",
      interactive: "truncation-demo",
      paragraphs: [
        "Truncar significa cortar parte da sequência. O corte pode ser explícito, quando a aplicação remove conteúdo antes de enviar, ou pode aparecer como erro de limite, resposta incompleta ou perda de informação em algum ponto do fluxo.",
        "O maior risco é cortar justamente o trecho importante: uma instrução, uma restrição, uma definição, uma citação ou a pergunta que dava sentido ao documento. Por isso, truncamento automático sem critério pode produzir respostas erradas.",
        "A alternativa robusta é controlar o orçamento. Conte tokens, reserve espaço para a resposta, priorize trechos importantes e divida entradas grandes em etapas. Para documentos, recuperação por relevância costuma ser melhor do que enviar tudo.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Truncamento",
          body:
            "Remoção de uma parte do texto ou da sequência de tokens para que a entrada caiba dentro de um limite.",
        },
        {
          type: "insight",
          title: "Cortar texto é cortar evidência",
          body:
            "Quando um trecho sai da janela, o modelo não pode usá-lo para responder. Ele não 'sabe' que o pedaço cortado existia naquela chamada.",
        },
      ],
    },
    {
      id: "resumo-final",
      eyebrow: "Resumo",
      title: "O que você precisa lembrar",
      lead:
        "Tokens conectam texto humano, custo computacional e limites práticos dos modelos de linguagem.",
      visual: "summary-token-stack",
      interactive: "summary-cards",
      paragraphs: [
        "Tokenização é a primeira ponte entre linguagem e cálculo. O texto é segmentado, convertido em IDs e só então processado pelo modelo. Essa etapa parece técnica, mas aparece em decisões muito práticas.",
        "Palavras comuns podem caber em poucos tokens; palavras raras, idiomas diferentes, símbolos e formatação podem consumir mais. Encodings diferentes podem gerar resultados diferentes para o mesmo texto.",
        "Ao projetar prompts e aplicações, pense em tokens como orçamento. Eles definem quanto cabe no contexto, quanto pode custar, quanto tempo pode levar e o que pode ser perdido quando o conteúdo estoura o limite.",
      ],
    },
    {
      id: "quiz-revisao",
      eyebrow: "Revisão",
      title: "Quiz de revisão",
      lead:
        "Teste se as ideias centrais ficaram conectadas: tokens, subwords, encoding, vocabulário, contexto, custo e truncamento.",
      interactive: "quiz",
      paragraphs: [
        "Use as perguntas para revisar o raciocínio. O objetivo não é decorar números, mas entender como texto vira orçamento de processamento.",
      ],
    },
    {
      id: "glossario-proximos-estudos",
      eyebrow: "Glossário",
      title: "Glossário e próximos estudos",
      lead:
        "Feche a aula consolidando o vocabulário essencial para estudar modelos de linguagem com mais precisão.",
      interactive: "glossary",
      paragraphs: [
        "Dominar esses termos ajuda a ler documentação, depurar prompts, estimar custos e entender por que modelos se comportam de forma diferente em textos diferentes.",
      ],
    },
  ],
  summaryCards: [
    {
      title: "Modelos processam tokens",
      body:
        "Texto humano é convertido em uma sequência de unidades e IDs antes de virar cálculo neural.",
    },
    {
      title: "Token não é palavra",
      body:
        "Um token pode ser palavra, subword, espaço, pontuação, símbolo ou parte de caractere codificado.",
    },
    {
      title: "Encoding muda a conta",
      body:
        "A mesma frase pode ter divisão e IDs diferentes dependendo do tokenizador usado.",
    },
    {
      title: "Contexto é limitado",
      body:
        "Instruções, histórico, documentos e resposta precisam caber na janela do modelo.",
    },
    {
      title: "Tokens viram custo",
      body:
        "Entrada e saída costumam ser cobradas por token, com preços que variam por modelo e modalidade.",
    },
    {
      title: "Truncamento remove informação",
      body:
        "Se algo fica fora da janela, o modelo não pode usar aquele trecho para responder.",
    },
  ],
  relatedTopics: [
    {
      title: "Embeddings",
      body:
        "Como tokens e textos viram vetores para busca semântica, recomendação e recuperação de contexto.",
    },
    {
      title: "RAG",
      body:
        "Como selecionar trechos relevantes de documentos para preencher a janela de contexto com menos ruído.",
    },
    {
      title: "Transformers",
      body:
        "Arquitetura que processa sequências de tokens usando atenção para relacionar posições diferentes.",
    },
    {
      title: "Prompt engineering",
      body:
        "Como escrever instruções e contexto com clareza, economia e controle de orçamento.",
    },
  ],
  quiz: [
    {
      id: "q1",
      prompt: "O que é um token em modelos de linguagem?",
      options: [
        {
          id: "a",
          label:
            "Uma unidade textual convertida em ID numérico antes do processamento pelo modelo.",
        },
        { id: "b", label: "Sempre uma palavra completa do idioma original." },
        { id: "c", label: "A resposta final gerada pelo modelo." },
      ],
      correctOptionId: "a",
      feedback:
        "Token é uma unidade de processamento. Ele pode coincidir com uma palavra, mas também pode ser subword, espaço, pontuação ou símbolo.",
    },
    {
      id: "q2",
      prompt: "Por que modelos usam subwords?",
      options: [
        {
          id: "a",
          label:
            "Para representar palavras raras ou novas combinando pedaços menores conhecidos.",
        },
        { id: "b", label: "Para eliminar completamente a necessidade de vocabulário." },
        { id: "c", label: "Para garantir que todo idioma tenha exatamente a mesma contagem." },
      ],
      correctOptionId: "a",
      feedback:
        "Subwords ajudam com vocabulário aberto: nomes, termos técnicos e palavras raras podem ser montados por partes.",
    },
    {
      id: "q3",
      prompt: "O que um encoding define?",
      options: [
        {
          id: "a",
          label:
            "As regras e tabelas que convertem texto em tokens e tokens em IDs.",
        },
        { id: "b", label: "A opinião do modelo sobre o texto." },
        { id: "c", label: "A quantidade fixa de palavras em toda resposta." },
      ],
      correctOptionId: "a",
      feedback:
        "Encoding é o conjunto de regras do tokenizador. Trocar o encoding pode mudar tokens, IDs e contagem.",
    },
    {
      id: "q4",
      prompt: "Por que contar palavras pode ser insuficiente?",
      options: [
        {
          id: "a",
          label:
            "Porque tokens podem incluir subwords, espaços, pontuação, símbolos e partes de caracteres.",
        },
        { id: "b", label: "Porque modelos ignoram todos os espaços." },
        { id: "c", label: "Porque toda palavra sempre vira dois tokens." },
      ],
      correctOptionId: "a",
      feedback:
        "A contagem de palavras é uma aproximação. A contagem real depende do tokenizador e do texto.",
    },
    {
      id: "q5",
      prompt: "O que é janela de contexto?",
      options: [
        {
          id: "a",
          label:
            "O limite de tokens que o modelo consegue considerar em uma chamada, somando entrada e espaço para saída.",
        },
        { id: "b", label: "A tela onde a aplicação mostra a resposta." },
        { id: "c", label: "Uma memória permanente que nunca é apagada." },
      ],
      correctOptionId: "a",
      feedback:
        "A janela de contexto é temporária e limitada. Tudo que precisa orientar a resposta deve caber nela.",
    },
    {
      id: "q6",
      prompt: "Como tokens se relacionam com custo de API?",
      options: [
        {
          id: "a",
          label:
            "APIs costumam cobrar pelo volume de tokens de entrada, saída e, dependendo do caso, cache ou outras categorias.",
        },
        { id: "b", label: "Tokens só afetam estilo, não custo." },
        { id: "c", label: "Apenas palavras raras são cobradas." },
      ],
      correctOptionId: "a",
      feedback:
        "O consumo de tokens é uma unidade central de cobrança em APIs de LLM, embora preços variem por modelo e modalidade.",
    },
    {
      id: "q7",
      prompt: "O que acontece quando o conteúdo ultrapassa o limite de contexto?",
      options: [
        {
          id: "a",
          label:
            "A aplicação precisa reduzir, dividir ou truncar conteúdo; caso contrário pode ocorrer erro ou perda de informação.",
        },
        { id: "b", label: "O modelo passa automaticamente a ter memória infinita." },
        { id: "c", label: "Apenas a pontuação é removida, sem risco semântico." },
      ],
      correctOptionId: "a",
      feedback:
        "Limites de contexto exigem gestão de orçamento. Truncamento sem critério pode remover o trecho mais importante.",
    },
    {
      id: "q8",
      prompt: "Por que idiomas diferentes podem ter custos diferentes em tokens?",
      options: [
        {
          id: "a",
          label:
            "Porque o tokenizador aprendeu padrões com eficiências diferentes para cada idioma e sistema de escrita.",
        },
        { id: "b", label: "Porque idiomas sem inglês não podem ser tokenizados." },
        { id: "c", label: "Porque todo idioma usa exatamente uma letra por token." },
      ],
      correctOptionId: "a",
      feedback:
        "A eficiência varia com os padrões do vocabulário e do encoding. Aplicações multilíngues devem medir textos reais.",
    },
    {
      id: "q9",
      prompt: "Qual é uma boa prática ao projetar prompts longos?",
      options: [
        {
          id: "a",
          label:
            "Contar tokens, reservar espaço de saída e selecionar contexto relevante antes de enviar.",
        },
        { id: "b", label: "Enviar sempre tudo que existe, sem filtragem." },
        { id: "c", label: "Remover todas as instruções para economizar tokens." },
      ],
      correctOptionId: "a",
      feedback:
        "Prompts robustos tratam tokens como orçamento: selecionam, organizam e reservam espaço para a resposta.",
    },
  ],
  glossary: [
    {
      term: "Token",
      definition:
        "Unidade textual que o tokenizador reconhece e converte em ID numérico para processamento pelo modelo.",
    },
    {
      term: "Tokenização",
      definition:
        "Processo de dividir texto em tokens e convertê-los em uma sequência compatível com o modelo.",
    },
    {
      term: "Subword",
      definition:
        "Fragmento menor que uma palavra inteira, usado para representar palavras comuns, raras e novas por composição.",
    },
    {
      term: "Vocabulário",
      definition:
        "Conjunto de tokens conhecidos por um tokenizador, normalmente associado a IDs numéricos.",
    },
    {
      term: "ID de token",
      definition:
        "Número que representa um token específico dentro do vocabulário de um encoding.",
    },
    {
      term: "Encoding",
      definition:
        "Regras e tabelas usadas para converter texto em tokens e tokens em IDs de forma compatível com certos modelos.",
    },
    {
      term: "BPE",
      definition:
        "Byte Pair Encoding, família de métodos que aprende combinações frequentes para formar tokens maiores a partir de partes menores.",
    },
    {
      term: "Janela de contexto",
      definition:
        "Quantidade máxima de tokens que o modelo consegue considerar em uma chamada, incluindo entrada e espaço para saída.",
    },
    {
      term: "Token de entrada",
      definition:
        "Token enviado ao modelo como parte de instruções, pergunta, histórico, documentos ou mensagens de ferramenta.",
    },
    {
      term: "Token de saída",
      definition:
        "Token gerado pelo modelo durante a resposta.",
    },
    {
      term: "Truncamento",
      definition:
        "Corte de parte do texto ou da sequência de tokens para respeitar um limite de contexto ou tamanho.",
    },
    {
      term: "Detokenização",
      definition:
        "Processo inverso da tokenização: converter tokens ou IDs de volta para texto legível.",
    },
  ],
};
