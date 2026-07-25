import type { LessonContent } from "../../../types/content";

export const positionalEncodingJanelaContextoContent: LessonContent = {
  id: "positional-encoding-janela-contexto",
  title: "Positional Encoding e Janela de Contexto",
  subtitle:
    "Como Transformers recuperam ordem em sequências e por que 'caber no contexto' não é o mesmo que realmente usar tudo com a mesma qualidade.",
  description:
    "Uma aula visual sobre positional encodings, ordem em Transformers, sinusoidal, RoPE, ALiBi, janela de contexto, custo quadrático e limites práticos de contexto longo.",
  primaryCategoryId: "inteligencia-artificial",
  secondaryCategoryId: "computacao",
  level: "Intermediário",
  estimatedTime: "40-55 min",
  tags: [
    "Transformers",
    "Positional Encoding",
    "RoPE",
    "ALiBi",
    "Janela de Contexto",
    "LLM",
  ],
  learningObjectives: [
    "Entender por que autoatenção pura precisa de algum mecanismo para representar ordem.",
    "Explicar a intuição do positional encoding senoidal sem depender apenas da fórmula.",
    "Diferenciar abordagens absolutas e relativas de posição, incluindo RoPE e ALiBi em nível conceitual.",
    "Interpretar a janela de contexto como orçamento compartilhado entre instruções, histórico, documentos e saída.",
    "Relacionar contexto longo a custo computacional e pressão de memória na atenção.",
    "Reconhecer por que 'caber no contexto' não garante uso uniforme de toda a informação.",
    "Entender limitações práticas de extrapolar para comprimentos maiores do que os vistos no treino.",
  ],
  prerequisites: [
    "Familiaridade básica com tokens e atenção em Transformers.",
    "Noção de que o modelo recebe uma sequência e produz representações por posição.",
    "Curiosidade sobre por que LLMs têm limite de contexto.",
  ],
  references: [
    {
      title: "Attention Is All You Need",
      source: "Vaswani et al., 2017 — arXiv",
      url: "https://arxiv.org/abs/1706.03762",
      note:
        "Artigo fundador do Transformer, incluindo a formulação clássica do positional encoding senoidal.",
    },
    {
      title: "RoFormer: Enhanced Transformer with Rotary Position Embedding",
      source: "Su et al., 2021 — arXiv",
      url: "https://arxiv.org/abs/2104.09864",
      note:
        "Referência para Rotary Position Embedding (RoPE), amplamente usado em LLMs contemporâneos.",
    },
    {
      title: "Train Short, Test Long: Attention with Linear Biases Enables Input Length Extrapolation",
      source: "Press et al., 2021 — arXiv",
      url: "https://arxiv.org/abs/2108.12409",
      note:
        "Artigo do ALiBi, útil para discutir extrapolação de comprimento e vieses lineares por distância.",
    },
    {
      title: "Longformer: The Long-Document Transformer",
      source: "Beltagy, Peters & Cohan, 2020 — arXiv",
      url: "https://arxiv.org/abs/2004.05150",
      note:
        "Exemplo importante de arquitetura desenhada para reduzir custo em contextos longos.",
    },
    {
      title: "FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness",
      source: "Dao et al., 2022 — arXiv",
      url: "https://arxiv.org/abs/2205.14135",
      note:
        "Referência sobre engenharia eficiente de atenção para contextos maiores e uso melhor de memória.",
    },
    {
      title: "Caching",
      source: "Hugging Face Transformers — Documentação oficial",
      url: "https://huggingface.co/docs/transformers/main/cache_explanation",
      note:
        "Explica KV cache e detalhes operacionais relevantes para compreender inferência autoregressiva em janelas longas.",
    },
  ],
  heroVisual: "hero",
  openingText:
    "Se removermos a ordem de uma frase, sobra um saco de palavras. A autoatenção, sozinha, é muito boa em comparar conteúdos, mas não sabe espontaneamente quem veio antes, quem veio depois e quão distantes dois tokens estão. Positional encoding existe para recolocar essa noção de posição dentro do cálculo. Já a janela de contexto define quanto dessa sequência cabe de uma vez. Uma diz onde cada token está; a outra limita quantos tokens cabem na mesa.",
  quickFacts: [
    {
      title: "Atenção não nasce com ordem",
      body:
        "Sem um mecanismo posicional, permutar tokens pode deixar a arquitetura cega à diferença entre várias ordens possíveis.",
    },
    {
      title: "Contexto é orçamento compartilhado",
      body:
        "Prompt, histórico, documentos recuperados e saída competem pelo mesmo limite de tokens.",
    },
    {
      title: "Longo não significa igualmente acessível",
      body:
        "Mesmo dentro do limite, nem toda informação distante recebe o mesmo aproveitamento prático durante a geração.",
    },
  ],
  sections: [
    {
      id: "problema-da-ordem",
      eyebrow: "Problema",
      title: "Por que Transformers precisam de posição explícita?",
      lead:
        "Atenção compara conteúdos entre posições, mas não tem, por si só, uma noção embutida de sequência ordenada.",
      visual: "hero",
      paragraphs: [
        "Uma camada de autoatenção olha para todos os tokens e calcula relações entre eles. Isso é poderoso, mas tem uma limitação estrutural: se não adicionarmos informação posicional, a operação tende a tratar a sequência como um conjunto onde a ordem não é distinguida adequadamente.",
        "Para linguagem, ordem é decisiva. 'Cão morde homem' e 'homem morde cão' não são equivalentes. A arquitetura precisa de um modo de saber qual token está em qual posição e como distâncias relativas mudam o significado.",
        "Positional encoding resolve exatamente essa lacuna. Ele não substitui atenção; ele a orienta, fornecendo coordenadas sobre onde cada token vive na sequência.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Informação posicional",
          body:
            "Sinal adicional que informa à arquitetura em que posição um token está e, em algumas abordagens, como ele se relaciona em distância com outros tokens.",
        },
        {
          type: "mistake",
          title: "Erro comum",
          body:
            "Achar que o token já 'traz' sua posição naturalmente. O embedding do token fala sobre conteúdo; a posição precisa entrar por outro mecanismo.",
        },
      ],
    },
    {
      id: "senoidal",
      eyebrow: "Clássico",
      title: "O positional encoding senoidal representa posições como ondas de várias frequências",
      lead:
        "A ideia não é decorar a fórmula, mas entender que diferentes frequências ajudam a distinguir posições próximas e distantes.",
      visual: "concept",
      interactive: "position-wave-lab",
      paragraphs: [
        "No Transformer original, cada posição recebe um vetor construído com senos e cossenos em frequências diferentes. Dimensões de alta frequência mudam rapidamente e ajudam a separar posições vizinhas. Dimensões de baixa frequência variam mais devagar e ajudam a distinguir regiões mais distantes da sequência.",
        "Essa construção oferece duas vantagens elegantes: não exige uma tabela aprendida de posições e permite que a relação entre posições seja capturada por padrões geométricos consistentes. Em outras palavras, a rede ganha uma noção suave de onde cada token está sem precisar memorizar uma posição como rótulo isolado.",
        "Embora muitas arquiteturas modernas tenham ido além do senoidal clássico, a intuição dele continua valiosa porque mostra que posição pode ser codificada como geometria periódica, não apenas como índice bruto.",
      ],
      blocks: [
        {
          type: "formula",
          title: "Ideia da codificação senoidal",
          body:
            "Posições são mapeadas para componentes seno e cosseno com frequências variadas, formando um vetor contínuo por posição.",
          formula: "PE(pos, 2i) = sin(pos / 10000^(2i/d)) | PE(pos, 2i+1) = cos(pos / 10000^(2i/d))",
        },
        {
          type: "insight",
          title: "Ondas rápidas e lentas têm papéis diferentes",
          body:
            "Frequências altas distinguem posições próximas; frequências baixas mantêm uma noção mais ampla de distância ao longo da sequência.",
        },
      ],
    },
    {
      id: "absoluto-relativo",
      eyebrow: "Evolução",
      title: "Da posição absoluta à posição relativa",
      lead:
        "Nem todo mecanismo posicional responde à mesma pergunta. Alguns dizem 'onde estou?'; outros dizem 'quão longe estou do outro token?'.",
      visual: "pipeline",
      paragraphs: [
        "Positional encodings absolutos atribuem a cada posição um vetor próprio. Isso responde diretamente 'esta é a posição 17' ou 'esta é a posição 204'. Em muitos casos funciona bem, mas pode ser menos natural quando o importante é a distância entre tokens e não apenas o índice bruto.",
        "Abordagens relativas procuram incorporar o efeito da distância entre posições no próprio cálculo da atenção. Isso é intuitivamente atraente porque a relação entre um sujeito e um verbo, por exemplo, depende muito de quão próximos ou afastados eles estão e de que lado da sequência aparecem.",
        "RoPE e ALiBi podem ser vistos como respostas modernas a esse problema. Cada um injeta posição de forma diferente, mas ambos tentam tornar o cálculo da atenção mais sensível a distância e mais robusto em contextos longos.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Posição absoluta",
          body:
            "Representação em que cada índice da sequência recebe um vetor ou embedding associado diretamente àquela posição.",
        },
        {
          type: "definition",
          title: "Posição relativa",
          body:
            "Representação em que o foco está na relação de distância e orientação entre dois tokens, não apenas no índice absoluto de cada um.",
        },
      ],
    },
    {
      id: "rope-alibi",
      eyebrow: "Modelos modernos",
      title: "RoPE e ALiBi mudam a forma como a atenção percebe distância",
      lead:
        "Esses métodos modernos não são só detalhes de implementação; eles mudam o tipo de noção espacial que a atenção recebe.",
      interactive: "length-scenarios",
      paragraphs: [
        "RoPE aplica rotações dependentes da posição sobre queries e keys. A consequência conceitual importante é que a interação entre posições passa a carregar naturalmente informação relativa de distância e orientação. Por isso ele se tornou tão popular em LLMs recentes.",
        "ALiBi segue outra rota: em vez de rotacionar vetores, adiciona vieses lineares por distância nos scores de atenção, favorecendo certos padrões de proximidade. O apelo está em uma extrapolação de comprimento simples e operacionalmente elegante.",
        "Não existe um campeão universal em todos os contextos. O ponto pedagógico é perceber que posicional encoding não é um adereço fixo da arquitetura: ele influencia de forma real como o modelo enxerga sequência e distância.",
      ],
      blocks: [
        {
          type: "insight",
          title: "Posição vive dentro da atenção",
          body:
            "Em métodos como RoPE e ALiBi, a posição não é apenas somada no início; ela molda o próprio cálculo relacional entre tokens.",
        },
      ],
    },
    {
      id: "janela-contexto",
      eyebrow: "Orçamento",
      title: "Janela de contexto é a mesa onde prompt, histórico e saída disputam espaço",
      lead:
        "Toda chamada ao modelo precisa caber em um limite. Esse limite inclui mais coisas do que a pergunta do usuário.",
      visual: "comparison",
      interactive: "context-budget-lab",
      paragraphs: [
        "Quando falamos em janela de contexto, não estamos falando apenas da pergunta digitada pelo usuário. O pacote completo costuma incluir instruções do sistema, histórico anterior, documentos recuperados, exemplos few-shot, ferramentas e também os tokens reservados para a resposta.",
        "Isso significa que uma janela longa não é 'espaço livre' para jogar documentos enormes sem pensar. Cada novo elemento consome orçamento e força decisões sobre o que entra inteiro, o que entra resumido e o que fica de fora.",
        "Aplicações robustas tratam contexto como recurso escasso, mesmo quando o limite nominal é grande. A engenharia de prompts, recuperação e compressão existe justamente para gastar esse orçamento onde ele mais ajuda.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Janela de contexto",
          body:
            "Quantidade máxima de tokens que o modelo pode considerar diretamente em uma execução, incluindo entrada, histórico e saída em geração.",
        },
        {
          type: "example",
          title: "Competição por tokens",
          body:
            "Um histórico longo e muitos documentos deixam menos espaço para a resposta; uma resposta longa deixa menos espaço para a entrada.",
        },
      ],
    },
    {
      id: "custo-quadratico",
      eyebrow: "Custo",
      title: "Contexto maior pressiona memória e computação",
      lead:
        "Atenção densa clássica cresce mal com o comprimento da sequência, e isso explica parte do fascínio por técnicas eficientes.",
      visual: "tradeoff",
      paragraphs: [
        "Na atenção clássica, cada posição pode olhar para todas as outras. Isso produz uma matriz cujo custo cresce de forma quadrática com o número de tokens. Dobrar o contexto não dobra apenas o trabalho: multiplica de forma bem mais agressiva o custo de memória e computação.",
        "Esse comportamento ajuda a entender por que contextos muito longos exigem otimizações como kernels mais eficientes, atenção em blocos, janelas deslizantes, cache de chaves e valores e outras estratégias de engenharia.",
        "A moral não é 'contexto longo é impossível', e sim 'contexto longo exige escolhas arquiteturais e sistêmicas'. O limite não é apenas conceitual; é físico e computacional.",
      ],
      blocks: [
        {
          type: "mistake",
          title: "Erro comum",
          body:
            "Achar que aumentar contexto é só mudar um número no config. Na prática, isso pressiona seriamente custo, latência e memória.",
        },
      ],
    },
    {
      id: "caber-nao-basta",
      eyebrow: "Limites reais",
      title: "Caber no contexto não garante leitura uniforme de toda a sequência",
      lead:
        "Mesmo dentro da janela, informação distante pode ser menos aproveitada na prática do que imaginamos.",
      visual: "checklist",
      paragraphs: [
        "Modelos podem priorizar partes recentes, trechos mais salientes ou segmentos repetidos do prompt. Além disso, ruído, redundância e formatação ruim competem com o conteúdo realmente importante. Uma janela grande não transforma automaticamente um prompt bagunçado em contexto útil.",
        "Outro ponto é que extrapolar para comprimentos maiores do que os vistos no treino pode funcionar parcialmente, mas nem sempre com a mesma fidelidade qualitativa. Mecanismos posicionais e técnicas de atenção ajudam, porém não eliminam todos os desafios de generalização para sequências muito mais longas.",
        "Por isso sistemas sérios de contexto longo usam recuperação seletiva, chunking, sumários e mecanismos de memória externa. A janela é poderosa, mas não substitui boa curadoria do que entra nela.",
      ],
      blocks: [
        {
          type: "insight",
          title: "Contexto útil é contexto curado",
          body:
            "Mais tokens só ajudam quando adicionam evidência relevante, organizada e recuperável para a tarefa atual.",
        },
      ],
    },
    {
      id: "resumo",
      eyebrow: "Síntese",
      title: "Resumo visual do tema",
      lead:
        "Positional encoding devolve ordem à atenção; janela de contexto limita quantos tokens cabem e quanto custa processá-los.",
      interactive: "summary-cards",
      paragraphs: [
        "Guarde esta separação conceitual: posição responde 'onde está cada token?'; contexto responde 'quantos tokens eu consigo considerar de uma vez?'.",
      ],
    },
    {
      id: "quiz-revisao",
      eyebrow: "Revisão",
      title: "Quiz de revisão",
      lead:
        "Teste se ficaram claros os papéis de ordem, distância, contexto, custo e extrapolação em Transformers modernos.",
      interactive: "quiz",
      paragraphs: [
        "O objetivo é saber raciocinar sobre limitações e escolhas, não apenas reconhecer nomes como RoPE ou ALiBi.",
      ],
    },
    {
      id: "glossario",
      eyebrow: "Vocabulário",
      title: "Glossário essencial",
      lead:
        "Consolide aqui os termos mais frequentes quando se estuda contexto longo e mecanismos posicionais em LLMs.",
      interactive: "glossary",
      paragraphs: [
        "Esse vocabulário aparece em papers, implementações de bibliotecas e discussões de engenharia de inferência.",
      ],
    },
  ],
  summaryCards: [
    {
      title: "Atenção precisa de ordem",
      body:
        "Sem um mecanismo posicional, o Transformer perde a noção clara de sequência e distância entre tokens.",
    },
    {
      title: "Senoidal dá a intuição base",
      body:
        "Ondas em várias frequências mostram que posição pode ser codificada geometricamente, não só por índice bruto.",
    },
    {
      title: "RoPE e ALiBi mudam a atenção por dentro",
      body:
        "Ambos incorporam posição no próprio cálculo relacional, com implicações para distância e extrapolação.",
    },
    {
      title: "Contexto é orçamento",
      body:
        "Prompt, histórico, documentos e saída compartilham o mesmo limite de tokens.",
    },
    {
      title: "Longo custa caro",
      body:
        "Mais contexto pressiona custo quadrático da atenção, memória e latência, exigindo otimizações adicionais.",
    },
  ],
  quiz: [
    {
      id: "q1",
      prompt: "Por que o Transformer precisa de informação posicional adicional?",
      options: [
        { id: "a", label: "Porque autoatenção, sozinha, não fornece uma noção suficiente de ordem na sequência." },
        { id: "b", label: "Porque tokens não podem ser comparados entre si." },
        { id: "c", label: "Porque embeddings já codificam posição automaticamente." },
      ],
      correctOptionId: "a",
      feedback:
        "Atenção compara conteúdos, mas precisa de um mecanismo extra para distinguir claramente quem veio antes, depois e a que distância.",
    },
    {
      id: "q2",
      prompt: "Qual é a intuição do positional encoding senoidal?",
      options: [
        { id: "a", label: "Representar cada posição como uma combinação de ondas com frequências diferentes." },
        { id: "b", label: "Somar o índice inteiro da posição a cada embedding sem transformação." },
        { id: "c", label: "Remover a necessidade de atenção." },
      ],
      correctOptionId: "a",
      feedback:
        "O esquema senoidal usa senos e cossenos em várias frequências para criar vetores posicionais contínuos e estruturados.",
    },
    {
      id: "q3",
      prompt: "O que diferencia abordagens relativas de posicionamento?",
      options: [
        { id: "a", label: "Elas enfatizam a distância e a relação entre tokens, não apenas o índice absoluto." },
        { id: "b", label: "Elas impedem o modelo de olhar para tokens próximos." },
        { id: "c", label: "Elas removem completamente o custo da atenção." },
      ],
      correctOptionId: "a",
      feedback:
        "Posição relativa tenta representar melhor 'quão longe' e 'em que direção' um token está de outro no cálculo da atenção.",
    },
    {
      id: "q4",
      prompt: "Qual afirmação sobre janela de contexto é correta?",
      options: [
        { id: "a", label: "Ela inclui prompt, histórico, documentos e também tokens reservados para a saída." },
        { id: "b", label: "Ela conta apenas a pergunta do usuário." },
        { id: "c", label: "Ela é memória permanente entre chamadas ao modelo." },
      ],
      correctOptionId: "a",
      feedback:
        "A janela de contexto é um orçamento compartilhado por tudo que entra na execução atual do modelo, inclusive a resposta gerada.",
    },
    {
      id: "q5",
      prompt: "Por que contextos longos pressionam custo computacional?",
      options: [
        { id: "a", label: "Porque a atenção densa cresce quadraticamente com o comprimento da sequência." },
        { id: "b", label: "Porque tokens longos têm mais caracteres." },
        { id: "c", label: "Porque embeddings deixam de funcionar em sequências longas." },
      ],
      correctOptionId: "a",
      feedback:
        "Na atenção clássica, cada token compara-se com muitos outros, e isso escala mal à medida que a sequência cresce.",
    },
    {
      id: "q6",
      prompt: "O que significa dizer que 'caber no contexto' não basta?",
      options: [
        { id: "a", label: "Que a informação pode estar dentro do limite, mas ainda assim ser mal aproveitada por distância, ruído ou organização ruim." },
        { id: "b", label: "Que o modelo nunca usa janelas longas." },
        { id: "c", label: "Que o positional encoding substitui o contexto." },
      ],
      correctOptionId: "a",
      feedback:
        "A utilidade do contexto depende da forma como a informação entra, compete e permanece acessível para a tarefa.",
    },
    {
      id: "q7",
      prompt: "Qual é uma característica conceitual do RoPE?",
      options: [
        { id: "a", label: "Introduzir posição por rotações nas representações usadas pela atenção." },
        { id: "b", label: "Eliminar a necessidade de queries e keys." },
        { id: "c", label: "Substituir o embedding do token por índices brutos." },
      ],
      correctOptionId: "a",
      feedback:
        "RoPE injeta posição de forma rotacional nas queries e keys, o que afeta diretamente como distâncias relativas entram na atenção.",
    },
    {
      id: "q8",
      prompt: "Qual prática ajuda mais em aplicações com muito contexto?",
      options: [
        { id: "a", label: "Curar o contexto com recuperação seletiva, chunking e resumos, em vez de apenas despejar tudo na janela." },
        { id: "b", label: "Ignorar custo e sempre usar o máximo possível de tokens." },
        { id: "c", label: "Remover qualquer histórico anterior." },
      ],
      correctOptionId: "a",
      feedback:
        "Sistemas robustos tratam contexto como recurso escasso e organizam bem o que entra para maximizar utilidade real.",
    },
  ],
  glossary: [
    { term: "Positional encoding", definition: "Mecanismo que injeta informação de ordem e posição na sequência processada pelo Transformer." },
    { term: "Posição absoluta", definition: "Representação em que cada índice da sequência recebe um vetor próprio associado diretamente àquela posição." },
    { term: "Posição relativa", definition: "Representação que enfatiza a distância e a relação entre dois tokens na sequência." },
    { term: "Codificação senoidal", definition: "Esquema clássico do Transformer original que usa senos e cossenos em múltiplas frequências para representar posição." },
    { term: "RoPE", definition: "Rotary Position Embedding: método que injeta posição por rotações em queries e keys da atenção." },
    { term: "ALiBi", definition: "Attention with Linear Biases: método que adiciona vieses lineares por distância aos scores de atenção." },
    { term: "Janela de contexto", definition: "Limite máximo de tokens considerados diretamente em uma execução do modelo." },
    { term: "Custo quadrático", definition: "Crescimento típico do custo da atenção densa em relação ao número de tokens da sequência." },
    { term: "KV cache", definition: "Armazenamento de keys e values já computados durante inferência autoregressiva para evitar recomputação desnecessária." },
    { term: "Extrapolação de comprimento", definition: "Capacidade de um modelo lidar com sequências maiores do que as vistas durante o treino." },
    { term: "Sliding window attention", definition: "Estratégia que limita a atenção a vizinhanças locais para reduzir custo em sequências longas." },
    { term: "Chunking", definition: "Divisão de documentos longos em trechos menores para caber melhor no orçamento de contexto e facilitar recuperação." },
  ],
};
