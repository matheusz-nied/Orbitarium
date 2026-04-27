import type { LessonContent } from "../../../types/content";

export const transformersEAtencaoContent: LessonContent = {
  id: "transformers-e-atencao",
  title: "Transformers e Atenção",
  subtitle:
    "Como a autoatenção revolucionou o processamento de linguagem: tokens que se conectam, camadas que contextualizam e uma arquitetura que escalou até mudar o mundo.",
  description:
    "Uma aula profunda sobre a arquitetura Transformer, self-attention, queries/keys/values, multi-head attention, positional encoding, camadas feed-forward e os motivos pelos quais essa arquitetura dominou a IA.",
  primaryCategoryId: "inteligencia-artificial",
  secondaryCategoryId: "computacao",
  level: "Intermediário",
  estimatedTime: "50-65 min",
  tags: [
    "Inteligência Artificial",
    "Transformer",
    "Self-Attention",
    "Multi-Head Attention",
    "Positional Encoding",
    "NLP",
    "Deep Learning",
  ],
  learningObjectives: [
    "Entender por que as arquiteturas anteriores (RNNs, LSTMs) eram limitadas em contexto e paralelização.",
    "Explicar a intuição por trás da atenção: por que o significado de uma palavra depende das outras ao redor.",
    "Descrever o mecanismo de self-attention com Queries, Keys e Values e entender de onde vêm essas matrizes.",
    "Compreender a matemática da atenção: produto escalar como medida de similaridade, softmax como normalização e soma ponderada como composição contextual.",
    "Diferenciar atenção de cabeça única e multi-head attention, explicando por que múltiplas cabeças capturam relações diferentes simultaneamente.",
    "Entender por que o Transformer precisa de positional encoding e como funções senoidais injetam informação de ordem.",
    "Descrever o bloco Transformer completo: atenção → conexão residual → normalização → feed-forward → conexão residual → normalização.",
    "Reconhecer a complexidade quadrática O(n²) da atenção e suas consequências práticas (consumo de memória, janelas de contexto).",
    "Explicar por que a paralelização total do Transformer permitiu o surgimento de modelos como GPT e BERT.",
  ],
  prerequisites: [
    "Noções básicas de embeddings como vetores que representam significado.",
    "Familiaridade com o conceito de que modelos de linguagem processam representações numéricas de texto.",
    "Curiosidade sobre como modelos como ChatGPT e BERT funcionam internamente.",
  ],
  references: [
    {
      title: "Attention Is All You Need",
      source: "Vaswani et al., 2017 — arXiv",
      url: "https://arxiv.org/abs/1706.03762",
      note:
        "Artigo original que introduziu a arquitetura Transformer, propondo que mecanismos de atenção são suficientes para modelar sequências sem recorrência.",
    },
    {
      title: "The Illustrated Transformer",
      source: "Jay Alammar, 2018",
      url: "https://jalammar.github.io/illustrated-transformer/",
      note:
        "Visualização didática passo a passo da arquitetura Transformer, muito usada como referência introdutória.",
    },
    {
      title: "CS224N: Natural Language Processing with Deep Learning",
      source: "Stanford University",
      url: "http://web.stanford.edu/class/cs224n/",
      note:
        "Curso de Stanford com aulas detalhadas sobre atenção, Transformers e modelagem de linguagem, cobrindo fundamentos teóricos e práticos.",
    },
    {
      title: "The Annotated Transformer",
      source: "Harvard NLP — Rush & George, 2018",
      url: "https://nlp.seas.harvard.edu/annotated-transformer/",
      note:
        "Implementação linha a linha do artigo original com comentários detalhados. Referência essencial para entender o código por trás dos conceitos.",
    },
    {
      title: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding",
      source: "Devlin et al., 2019 — NAACL",
      url: "https://aclanthology.org/N19-1423/",
      note:
        "Artigo que demonstrou o poder do Transformer bidirecional para pré-treinamento, inaugurando uma nova era em NLP.",
    },
    {
      title: "Language Models are Few-Shot Learners",
      source: "Brown et al., 2020 — arXiv (GPT-3)",
      url: "https://arxiv.org/abs/2005.14165",
      note:
        "Artigo que mostrou como escalar Transformers autoregressivos gera capacidades emergentes de few-shot learning.",
    },
    {
      title: "Longformer: The Long-Document Transformer",
      source: "Beltagy, Peters & Cohan, 2020 — arXiv",
      url: "https://arxiv.org/abs/2004.05150",
      note:
        "Artigo que propõe atenção local dilatada como alternativa à atenção completa para documentos longos, abordando a complexidade quadrática.",
    },
    {
      title: "On Layer Normalization in the Transformer Architecture",
      source: "Xiong et al., 2020 — ICML",
      url: "https://arxiv.org/abs/2002.04745",
      note:
        "Análise do impacto da posição da normalização (Pre-Norm vs Post-Norm) na estabilidade do treinamento profundo de Transformers.",
    },
  ],
  heroVisual: "transformers-hero",
  openingText:
    "Como você ensina uma máquina a entender que a palavra 'manga' numa receita é uma fruta, mas num ateliê de costura é parte de uma roupa? Antes de 2017, tentávamos resolver isso obrigando a Inteligência Artificial a ler textos como nós: uma palavra por vez. O problema é que a máquina sofria de 'amnésia', esquecendo o início da frase ao chegar no final, além de ser um processo dolorosamente lento. O Transformer mudou todas as regras do jogo: em vez de ler sequencialmente, ele processa o texto inteiro de uma só vez e faz com que cada palavra pergunte instantaneamente a todas as outras 'como vocês se conectam comigo?'. Essa mudança aparentemente simples — a autoatenção — não apenas curou a amnésia das máquinas, mas destravou a velocidade paralela que tornou a era de ouro da IA possível.",
  quickFacts: [
    {
      title: "Atenção como um detetive simultâneo",
      body:
        "Em vez de ler do início ao fim, o Transformer funciona como um detetive analisando um quadro de evidências. Ao ver o token 'banco', ele instantaneamente checa todos os outros tokens do texto. Se achar 'dinheiro' e 'cofre', resolve a ambiguidade em frações de segundo.",
    },
    {
      title: "Q, K e V: O evento de networking",
      body:
        "Imagine um evento corporativo. Cada palavra ganha três atributos: uma Query (o que ela procura: 'preciso de um sujeito'), uma Key (o que ela oferece: 'sou um pronome') e um Value (seu conteúdo real). O 'match' semântico acontece quando Queries e Keys se alinham.",
    },
    {
      title: "GPS Matemático em vez de Ordem",
      body:
        "Sem olhos ou fluxo de tempo, o Transformer recebe todas as palavras soltas num bloco só. O 'Positional Encoding' atua como carimbos invisíveis de GPS em cada palavra (usando ondas senoidais) para que ele saiba que 'o cão mordeu o homem' é diferente de 'o homem mordeu o cão'.",
    },
    {
      title: "A velocidade que devorou a internet",
      body:
        "A verdadeira mágica do Transformer não foi só traduzir melhor, foi sua escalabilidade brutal. Por ler tudo em paralelo, pesquisadores puderam conectar milhares de GPUs simultaneamente para engolir a internet inteira em meses, dando origem a gigantes como ChatGPT e Claude.",
    },
  ],
  timeline: [
    {
      id: "seq2seq",
      period: "2014",
      title: "Seq2Seq com atenção",
      description:
        "Modelos encoder-decoder com atenção sobre a sequência de entrada permitiram tradução melhor, mas ainda presos ao processamento sequencial das RNNs.",
    },
    {
      id: "transformer-paper",
      period: "2017",
      title: "Attention Is All You Need",
      description:
        "Vaswani et al. propõem arquitetura sem recorrência nem convolução: apenas atenção e feed-forward. O nome do artigo é provocativo — atenção é tudo o que você precisa.",
    },
    {
      id: "bert",
      period: "2018",
      title: "BERT",
      description:
        "Devlin et al. usam o encoder do Transformer para pré-treinamento bidirecional, estabelecendo novos recordes em múltiplas tarefas de NLP. A era do pré-treinamento começou.",
    },
    {
      id: "gpt2",
      period: "2019",
      title: "GPT-2",
      description:
        "OpenAI escala o decoder do Transformer e demonstra que modelos de linguagem grandes podem gerar texto coerente sem supervisão específica.",
    },
    {
      id: "gpt3",
      period: "2020",
      title: "GPT-3 e few-shot",
      description:
        "Com 175 bilhões de parâmetros, GPT-3 mostra capacidades emergentes de seguir instruções com exemplos no contexto, sem fine-tuning.",
    },
    {
      id: "scaling",
      period: "2022 em diante",
      title: "Escala e fundamentação",
      description:
        "Modelos como GPT-4, LLaMA e Gemini mostram que escalar Transformers treina com mais dados continua produzindo capacidades novas. A arquitetura Transformer permanece como base de praticamente todos os modelos de linguagem de grande escala.",
    },
  ],
  sections: [
    {
      id: "o-paradigma-sequencial",
      eyebrow: "Ponto de partida",
      title: "O gargalo da leitura humana: por que a IA estava travada",
      lead:
        "Por décadas, tentamos fazer a inteligência artificial ler textos exatamente como nós: uma palavra de cada vez. O que parecia lógico tornou-se o maior obstáculo tecnológico para as máquinas.",
      visual: "rnn-sequential",
      paragraphs: [
        "Imagine tentar traduzir um texto complexo ouvindo uma fita cassete lenta, onde você não pode pausar nem prever a próxima palavra. Você precisa memorizar o início da frase com extrema precisão para que o final faça sentido. Esse era o drama arquitetônico da IA até 2017. O processamento de linguagem era dominado pelas Redes Neurais Recorrentes (RNNs) e LSTMs, que operavam como uma esteira de montagem: processavam a primeira palavra, atualizavam uma 'memória' interna, e a passavam para a segunda palavra.",
        "O primeiro grande problema dessa esteira era a amnésia de longo alcance. A memória de uma RNN é um vetor de espaço limitado. Ao chegar na vigésima palavra, as nuances das primeiras já haviam sido esmagadas ou sobrescritas. Se o texto dissesse 'A blusa de frio que comprei na loja ontem rasgou', a máquina frequentemente esquecia que o verbo 'rasgou' referia-se a 'blusa', comprometendo o entendimento gramatical.",
        "Mas o golpe fatal era a lentidão. Na computação sequencial, a palavra 3 precisa absolutamente esperar a palavra 2 ser processada para sequer começar. Esse engarrafamento impedia as IAs de usarem o verdadeiro superpoder das GPUs modernas: o processamento de milhares de cálculos ao mesmo tempo. Os pesquisadores precisavam treinar modelos com toda a internet, mas a leitura 'palavra por palavra' tornava o processo inviável financeiramente e em termos de tempo. A solução exigia uma quebra de paradigma: parar de simular a leitura humana e começar a processar a linguagem espacialmente.",
      ],
      blocks: [
        {
          type: "insight",
          title: "O erro de imitar a biologia",
          body:
            "Nós lemos sequencialmente porque nossos olhos existem num fluxo de tempo contínuo. Mas processadores gráficos existem para efetuar cálculos matriciais simultâneos no espaço. As RNNs forçavam uma máquina paralela a trabalhar de forma serial, o que segurou o avanço da IA por anos.",
        },
        {
          type: "mistake",
          title: "Achar que mais memória resolveria tudo",
          body:
            "As LSTMs foram criadas para consertar o 'esquecimento' das RNNs, adicionando válvulas e canais de memória extras. Embora funcionassem para parágrafos maiores, a esteira de montagem ficou matematicamente muito mais pesada, o que piorou severamente o problema da velocidade de treinamento.",
        },
        {
          type: "example",
          title: "O pronome ambíguo que quebrava o modelo",
          body:
            "Em 'Os troféus não couberam nas malas porque eles eram grandes demais', a palavra 'eles' refere-se aos troféus. Mas para uma RNN que estava presa ao fluxo linear e acabara de passar por 'malas', o foco excessivo no contexto imediato (a última coisa lida) causava erros crassos de interpretação.",
        },
      ],
    },
    {
      id: "a-intuicao-da-atencao",
      eyebrow: "Intuição",
      title: "O que significa prestar atenção num texto",
      lead:
        "Atenção é o mecanismo pelo qual cada token consulta os demais e combina informações relevantes para construir uma representação contextualizada.",
      visual: "attention-intuition",
      interactive: "attention-map",
      paragraphs: [
        "Quando você lê a frase 'o banco ficou cheio de gente hoje', o significado de 'banco' depende das palavras ao redor. Se você encontrasse 'banco' sozinho, não saberia se é instituição financeira ou assento. Mas com 'cheio de gente', o contexto resolve a ambiguidade. A atenção automatiza esse processo: cada posição na sequência pode consultar todas as outras posições e ponderar quais são mais relevantes para determinar seu significado.",
        "Imagine uma festa onde cada convidado pergunta aos outros: 'quem aqui tem informações relevantes para mim?'. Um convidado que trabalha com finanças vai prestar mais atenção em outros financeiros, enquanto um que trabalha com música vai se conectar com músicos. No Transformer, cada token faz exatamente isso: olha para todos os outros tokens, calcula uma pontuação de relevância e combina as informações das posições mais relevantes.",
        "O resultado é que, após passar por uma camada de atenção, a representação de cada token não é mais apenas aquele token isolado — ele incorporou informações dos tokens mais relevantes da sequência. 'Banco' em 'banco de praça' fica diferente de 'banco' em 'banco financeiro' porque as conexões de atenção apontam para contextos diferentes. Essa contextualização é o que torna o Transformer tão poderoso: a mesma palavra recebe representações diferentes dependendo do bairro em que mora.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Autoatenção (self-attention)",
          body:
            "Mecanismo em que cada posição de uma sequência calcula pesos sobre todas as outras posições (incluindo a si mesma) e combina suas informações proporcionalmente a esses pesos.",
        },
        {
          type: "insight",
          title: "Atenção resolve ambiguidade",
          body:
            "A representação final de 'banco' em 'banco financeiro' é diferente da de 'banco' em 'banco de praça' porque os pesos de atenção apontam para tokens diferentes. A atenção não soma palavras — soma informações relevantes.",
        },
        {
          type: "mistake",
          title: "Atenção não é compreensão humana",
          body:
            "Os pesos de atenção indicam quais posições receberam mais peso num cálculo matemático. Eles não são garantia de que o modelo 'entendeu' a relação no sentido humano, mas são parte real do mecanismo que contextualiza representações.",
        },
        {
          type: "example",
          title: "'Ela' precisa encontrar 'Ana'",
          body:
            "Em 'Maria entregou o livro para Ana porque ela precisava', a atenção permite que o token 'ela' atribua maior peso a 'Ana' do que a 'Maria'. Sem atenção, 'ela' seria apenas um vetor genérico de pronome feminino.",
        },
        {
          type: "insight",
          title: "Atenção como um grafo",
          body:
            "Na RNN, as conexões formam uma linha: cada palavra só enxerga a anterior. Na atenção, cada palavra se conecta simultaneamente a todas as outras, formando uma teia — ou grafo — onde cada nó tem arestas ponderadas para todos os demais. É essa estrutura de grafo completo que elimina a amnésia: não importa quão longe esteja a palavra relevante, ela está a um salto de distância.",
        },
      ],
    },
    {
      id: "self-attention-o-coracao",
      eyebrow: "Mecanismo central",
      title: "Self-attention: cada token gera sua Query, Key e Value",
      lead:
        "No coração do Transformer, cada token é multiplicado por três matrizes de pesos diferentes, produzindo três vetores: Query (pergunta), Key (chave) e Value (valor).",
      visual: "qkv-diagram",
      paragraphs: [
        "A autoatenção começou com uma analogia de banco de dados: você faz uma Query (pergunta), o sistema compara com as Keys (chaves) de todos os registros e devolve os Values (valores) dos registros mais relevantes. No Transformer, a diferença crucial é que Queries, Keys e Values vêm da mesma sequência — são os próprios tokens perguntando sobre os próprios tokens.",
        "Cada token de entrada é um vetor (o embedding daquela posição). Esse vetor é multiplicado por três matrizes de pesos aprendidas — Wq, Wk e Wv — para produzir três vetores: Query (q), Key (k) e Value (v). Essas matrizes não são escolhidas manualmente. Elas são parâmetros treináveis: o modelo as ajusta durante o treinamento para que as Queries façam perguntas úteis, as Keys forneçam respostas relevantes e os Values carreguem a informação que precisa ser combinada.",
        "A consequência é que o mesmo token gera três perspectivas sobre si mesmo. A Query diz 'o que estou procurando?', a Key diz 'o que ofereço?', e o Value diz 'o que entrego se me escolherem'. Quando o token 'ela' produz uma Query que combina com a Key de 'Ana', o Value de 'Ana' flui para a representação de 'ela', contextualizando-a.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Query (Q)",
          body:
            "Vetor produzido pela multiplicação do embedding do token pela matriz Wq. Representa o que o token está procurando na sequência.",
        },
        {
          type: "definition",
          title: "Key (K)",
          body:
            "Vetor produzido pela multiplicação do embedding do token pela matriz Wk. Representa o que o token oferece para comparação — sua 'etiqueta' de relevância.",
        },
        {
          type: "definition",
          title: "Value (V)",
          body:
            "Vetor produzido pela multiplicação do embedding do token pela matriz Wv. Representa a informação que o token contribui caso seja selecionado pela atenção.",
        },
        {
          type: "insight",
          title: "Wq, Wk e Wv são aprendidas",
          body:
            "As três matrizes de projeção não são fixas nem escolhidas manualmente. Elas são parâmetros treináveis que o modelo otimiza para que Queries façam perguntas úteis, Keys forneçam respostas relevantes e Values carreguem informações que combinem bem.",
        },
        {
          type: "mistake",
          title: "Q, K e V não são cópias do token",
          body:
            "Embora venham do mesmo token de entrada, cada um é uma projeção diferente. A Query de 'banco' pode estar procurando informações sobre finanças, a Key pode estar anunciando 'contexto financeiro aqui', e o Value pode carregar o conteúdo semântico que combina contexto e significado.",
        },
        {
          type: "mistake",
          title: "Não confunda Key com Value",
          body:
            "A Query e a Key servem exclusivamente para gerar a pontuação de relevância — o 'match'. O Value é o conteúdo real que será transferido. Pense assim: Q e K são a embalagem, V é o presente. Você não abre o presente para decidir se quer trocar — você lê a etiqueta (Key) e compara com o que procura (Query). Só depois de decidir quem é relevante é que o presente é desembrulhado e entregue.",
        },
        {
          type: "example",
          title: "O que acontece dentro dos vetores de 'ela' e 'Ana'",
          body:
            "A Query do token 'ela' pode ter valores altos em dimensões abstratas como [procura_substantivo, procura_feminino], enquanto a Key de 'Ana' tem valores altos em [sou_substantivo, sou_feminino]. O produto escalar entre esses dois vetores será alto porque as dimensões se alinham — a pergunta de 'ela' encontra a oferta de 'Ana'. Já a Key de 'entregou' teria valores baixos nessas dimensões e altos em [sou_verbo, sou_ação], resultando em um match fraco com a Query de 'ela'. Nada de mágica: é geometria vetorial. As matrizes Wq e Wk aprendem, durante o treinamento, a organizar essas dimensões abstratas para que perguntas e respostas se encontrem.",
        },
      ],
    },
    {
      id: "a-matematica-da-atencao",
      eyebrow: "A fórmula",
      title: "Produto escalar, softmax e soma ponderada: a matemática que contextualiza",
      lead:
        "A atenção calcula similaridade entre Query e Key via produto escalar, normaliza com softmax e combina Values proporcionalmente. O resultado é uma representação que mistura informações de toda a sequência.",
      visual: "attention-math",
      interactive: "attention-calculator",
      paragraphs: [
        "A fórmula da atenção escalada é: Attention(Q, K, V) = softmax(QK^T / √d_k) · V. Parece complicada, mas cada passo tem uma função clara. Primeiro, multiplicamos a Query de cada token pela Key de cada outro token. Isso produz uma matriz de pontuações brutas que indicam quanto cada par de tokens está relacionado.",
        "O produto escalar Q · k_j mede a similaridade entre a pergunta do token i e a etiqueta do token j. Se a Query aponta na mesma direção que a Key, o produto é alto — os vetores estão alinhados, sugerindo relevância. Se apontam em direções ortogonais, o produto é próximo de zero — não há relação especial. Se apontam em direções opostas, o produto é negativo — rejeição ativa.",
        "Antes de converter pontuações em pesos, dividimos por √d_k (a raiz quadrada da dimensão das Keys). Essa escala é necessária por um motivo estatístico: o produto escalar entre Query e Key soma d_k multiplicações (uma para cada dimensão). Quanto mais dimensões existem, mais termos estão sendo acumulados na soma, e maior tende a ser o resultado absoluto — simplesmente pelo acúmulo de contribuições independentes, não porque os vetores são mais similares. Em termos técnicos, a variância do produto escalar cresce proporcionalmente a d_k. Dividir por √d_k 'achata' o resultado de volta para uma escala com variância controlada (aproximadamente 1), impedindo que o softmax sature — isto é, que concentre quase todo o peso em uma posição e produza gradientes minúsculos nas demais. Sem essa correção, modelos com dezenas de camadas simplesmente não convergiriam nas primeiras épocas de treinamento.",
        "O softmax converte as pontuações escaladas em pesos que somam 1. Cada token agora tem uma distribuição de atenção sobre toda a sequência. Finalmente, multiplicamos cada Value pelo seu peso e somamos tudo. O resultado é um vetor contextualizado: a representação do token i agora contém informação de todos os tokens, mas ponderada pela relevância.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Atenção escalada por produto escalar",
          body:
            "Attention(Q, K, V) = softmax(QK^T / √d_k) · V. Cada posição consulta todas as outras, pondera por similaridade e combina os valores relevantes.",
        },
        {
          type: "formula",
          title: "Fórmula de atenção",
          body:
            "A fórmula completa: softmax(QK^T / √d_k) · V, onde Q, K e V são matrizes de Queries, Keys e Values, e d_k é a dimensionalidade das Keys.",
          formula: "Attention(Q, K, V) = softmax(QK^T / √d_k) V",
        },
        {
          type: "insight",
          title: "Produto escalar como similaridade",
          body:
            "O produto escalar entre dois vetores mede seu alinhamento. Valores altos indicam que a Query e a Key apontam na mesma direção — o token que fez a pergunta encontrou um token relevante. Essa medida simples de similaridade é o que substitui mecanismos explícitos de memória e recorrência.",
        },
        {
          type: "mistake",
          title: "A escala por √d_k não é opcional",
          body:
            "Sem a divisão por √d_k, a variância do produto escALAR cresce linearmente com a dimensionalidade, empurrando valores para extremos. O softmax tenderia a produzir pesos quase binários (um token recebe quase 1, todos os outros recebem quase 0), matando o gradiente e tornando o treinamento instável. A escala por √d_k normaliza a variância de volta para ~1, mantendo o softmax informativo. É uma correção estatística necessária, não um ajuste fino.",
        },
        {
          type: "example",
          title: "Atenção na frase 'O gato sentou no tapete'",
          body:
            "O token 'gato' gera uma Query que pergunta 'quais tokens me ajudam a definir meu significado?'. As Keys de 'O', 'sentou', 'no' e 'tapete' respondem com pontuações diferentes. 'Sentou' pode ter alta pontuação porque verbos de ação frequentemente contextualizam sujeitos. O Value de 'sentou' flui para a representação de 'gato', enriquecendo-o.",
        },
        {
          type: "definition",
          title: "Softmax: de pontuações brutas a porcentagens",
          body:
            "O softmax é a função que converte uma lista de números quaisquer (que podem ser negativos, positivos, grandes ou pequenos) em uma distribuição de probabilidades que soma exatamente 1. Cada valor de entrada é exponenciado (e^x) e dividido pela soma de todas as exponenciações. Na atenção, o softmax transforma as pontuações Q·K em pesos relativos: nenhum peso é negativo, todos somam 1, e os maiores scores recebem as maiores fatias — mas sem nunca serem zeros absolutos.",
        },
      ],
    },
    {
      id: "multi-head-attention",
      eyebrow: "Especialistas",
      title: "Multi-head attention: múltiplos ângulos para o mesmo texto",
      lead:
        "Uma única atenção pode capturar um tipo de relação. Múltiplas cabeças permitem que o modelo aprenda relações diferentes simultaneamente — gramática, sentimento, referência, tópico.",
      visual: "multi-head-visual",
      interactive: "multi-head-demo",
      paragraphs: [
        "Se todo token tem apenas uma Query, uma Key e um Value, o modelo tem uma chance de capturar as relações certas. Mas linguagem tem múltiplas dimensões simultâneas: a palavra 'banco' precisa ao mesmo tempo verificar concordância gramatical com o verbo, identificar o tópico financeiro ou geográfico da frase, resolver a referência de pronomes e capturar o tom da sentença. Uma cabeça de atenção não dá conta de tudo isso ao mesmo tempo.",
        "Multi-head attention resolve isso projetando o embedding de cada token não em um trio Q/K/V, mas em h trios diferentes — cada um com suas próprias matrizes de projeção. Cada cabeça opera em um subespaço de menor dimensionalidade (d_k = d_model / h), processando as mesmas posições da sequência de forma independente. As saídas das h cabeças são concatenadas e linearmente projetadas de volta para a dimensionalidade original.",
        "A intuição é a de um comitê de especialistas. Cada cabeça aprende a prestar atenção em padrões diferentes: uma pode se especializar em relações sujeito-verbo, outra em referências pronominais, outra em adjacência sintática, outra em conectivos lógicos. Juntas, as cabeças criam uma representação rica que codifica múltiplos aspectos da relação entre os tokens simultaneamente.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Multi-head attention",
          body:
            "Mecanismo que executa h atenções paralelas em subespaços de menor dimensionalidade, cada uma com suas próprias matrizes de projeção. As saídas são concatenadas e projetadas linearmente.",
        },
        {
          type: "insight",
          title: "Cabeças aprendem especializações",
          body:
            "Análises de modelos treinados mostram que cabeças de atenção se especializam em padrões específicos: algumas focam em palavras adjacentes, outras em dependências sintáticas, outras em referências de longo alcance. Essa especialização emerge naturalmente do treinamento.",
        },
        {
          type: "example",
          title: "\"Ela disse que Maria saiu\"",
          body:
            "Cabeça 1 pode prestar atenção em 'disse' e 'saiu' (relação verbal). Cabeça 2 pode conectar 'Ela' e 'Maria' (referência). Cabeça 3 pode focar em 'que' (conectivo subordinativo). Cada cabeça captura um aspecto diferente da mesma frase.",
        },
        {
          type: "mistake",
          title: "Mais cabeças não é automaticamente melhor",
          body:
            "Aumentar o número de cabeças sem aumentar a dimensionalidade do modelo faz cada cabeça trabalhar em subespaços muito pequenos, com capacidade reduzida. O número de cabeças e a dimensionalidade precisam crescer juntos.",
        },
        {
          type: "insight",
          title: "Concatenação e projeção: de volta a um vetor só",
          body:
            "Depois que as h cabeças produzem seus resultados, elas não ficam soltas. O modelo concatena todas as saídas (cada uma com dimensionalidade d_model/h) em um vetor de tamanho d_model e aplica uma matriz linear aprendida Wo que comprime essas perspectivas múltiplas de volta em uma representação unificada. Sem essa projeção, as cabeças seriam visões fragmentadas que nunca se comunicariam entre si.",
        },
        {
          type: "insight",
          title: "8 cabeças não custam 8× mais recursos",
          body:
            "Cada cabeça opera em dimensionalidade d_model/h. Com d_model = 512 e h = 8, cada cabeça trabalha com vetores de 64 dimensões. O total de parâmetros de projeção (Wq, Wk, Wv, Wo) é praticamente o mesmo de uma atenção de cabeça única na dimensionalidade total. Multi-head não é mais pesado — é mais diverso.",
        },
      ],
    },
    {
      id: "o-problema-da-ordem",
      eyebrow: "Sequência",
      title: "Positional encoding: injetando ordem num modelo sem noção de posição",
      lead:
        "O Transformer processa todos os tokens simultaneamente e, por isso, não tem nenhuma informação sobre a ordem em que aparecem. Positional encoding resolve isso injetando sinais de posição diretamente nos embeddings.",
      visual: "positional-encoding-visual",
      interactive: "positional-encoding-demo",
      paragraphs: [
        "A autoatenção é invariante à permutação: se você embaralhar a ordem dos tokens, as pontuações de atenção entre pares de tokens individuais não mudam. O modelo não sabe por si só que 'o gato mordeu o cachorro' é diferente de 'o cachorro mordeu o gato' — porque as relações entre os mesmos pares de palavras são as mesmas. A ordem é fundamental na linguagem, e o Transformer precisa recebê-la explicitamente.",
        "A solução do artigo original é somar ao embedding de cada posição um vetor de codificação posicional (positional encoding) construído com funções senoidais e cossenoidais em frequências variadas. Cada dimensão do vetor posicional oscila em uma frequência diferente: as primeiras dimensões oscilam rapidamente (capturando diferenças entre posições adjacentes), enquanto as últimas oscilam lentamente (capturando posições distantes na sequência).",
        "Por que senos e cossenos em vez de, digamos, um simples índice numérico (posição 1, 2, 3...)? Três motivos. Primeiro, funções trigonométricas são contínuas e diferenciáveis, o que é importante para o treinamento via backpropagation. Segundo, elas permitem que o modelo generalize para sequências mais longas do que as vistas no treinamento, porque os padrões de oscilação são regulares. Terceiro, a diferença entre a codificação de posições adjacentes é constante, o que facilita ao modelo aprender relações relativas de posição.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Positional encoding",
          body:
            "Vetor somado ao embedding de cada posição na sequência para injetar informação de ordem. No Transformer original, usa funções senoidais e cossenoidais em frequências variadas.",
        },
        {
          type: "formula",
          title: "Codificação posicional senoidal",
          body:
            "Para posição pos e dimensão i: PE(pos, 2i) = seno(pos / 10000^(2i/d_model)) e PE(pos, 2i+1) = cosseno(pos / 10000^(2i/d_model)).",
          formula: "PE(pos, 2i) = sin(pos / 10000^(2i/d))  |  PE(pos, 2i+1) = cos(pos / 10000^(2i/d))",
        },
        {
          type: "insight",
          title: "A atenção é permutação-invariante por natureza",
          body:
            "Sem positional encoding, a atenção não distingue 'gato mordeu cachorro' de 'cachorro mordeu gato'. As mesmas palavras com as mesmas relações par a par geram o mesmo resultado. Injetar posição é a única forma de dar ao modelo noção de ordem.",
        },
        {
          type: "mistake",
          title: "Positional encoding não é a mesma coisa que embedding posicional aprendido",
          body:
            "O artigo original usa funções senoidais fixas, mas versões posteriores (como BERT e GPT) frequentemente usam embeddings posicionais aprendidos — vetores treináveis para cada posição. Ambos os métodos são válidos e têm prós e contras: senos permitem extrapolação para comprimentos não vistos; aprendidos podem ser mais flexíveis dentro da janela de treino.",
        },
        {
          type: "mistake",
          title: "Positional encoding é concatenado ao embedding? Não, é somado",
          body:
            "É contra-intuitivo: somar dois vetores parece que deveria destruir a informação original. Em vetores de alta dimensionalidade (como 512 dimensões), há espaço suficiente para que o sinal semântico do embedding e o sinal posicional coexistam sem interferência fatal — cada tipo de informação ocupa bandas de frequência diferentes dentro do mesmo vetor. Concatenação dobraria a dimensionalidade e quebraria a arquitetura.",
        },
        {
          type: "insight",
          title: "O relógio analógico do Positional Encoding",
          body:
            "Imagine um relógio analógico com vários ponteiros de tamanhos diferentes. O ponteiro dos segundos gira rápido — cada tick marca uma posição adjacente (as primeiras dimensões do vetor posicional oscilam rapidamente, distinguindo posições vizinhas). O ponteiro dos minutos gira médio — separa blocos de posições (dimensões intermediárias). O ponteiro das horas gira devagar — marca em qual região distante da sequência o token está (últimas dimensões, oscilando lentamente). Lendo todos os ponteiros juntos, o modelo sabe a posição absoluta exata de cada token, assim como você sabe as horas completas olhando todos os ponteiros do relógio.",
        },
      ],
    },
    {
      id: "o-bloco-transformer",
      eyebrow: "Arquitetura",
      title: "O bloco Transformer completo: atenção, conexões residuais e feed-forward",
      lead:
        "A atenção contextualiza os tokens, mas sozinha ela não transforma nem armazena conhecimento. O bloco Transformer completo adiciona conexões residuais, normalização e uma rede feed-forward por posição.",
      visual: "transformer-block",
      paragraphs: [
        "Depois da multi-head attention, o Transformer faz algo sutil mas essencial: soma a saída da atenção com a entrada original. Essa conexão residual (Add) garante que a informação original não se perca. Sem ela, camadas profundas teriam dificuldade para propagar gradientes e o modelo não conseguiria treinar de forma estável. É como se cada camada dissesse: 'pega o que você já tinha, e adiciona o que a atenção descobriu'.",
        "Após a conexão residual, vem a normalização (Norm), que estabiliza a distribuição dos valores e acelera o treinamento. A combinação 'atenção → Add → Norm' é seguida por uma segunda subcamada: uma rede neural feed-forward aplicada de forma independente a cada posição. O feed-forward transforma a representação contextualizada pela atenção, processando cada token individualmente com dois conjuntos de pesos que não mudam entre posições — mesmo conjunto de pesos para todos os tokens, mas cada token é processado separadamente.",
        "O feed-forward é onde grande parte do conhecimento factual do modelo é armazenado. Pesquisas mostram que as camadas de atenção misturam informações entre posições, enquanto o feed-forward armazena e recupera padrões aprendidos durante o treinamento — fatos, relações, estruturações. É uma divisão de trabalho: atenção promove a comunicação entre tokens; feed-forward processa e refina o que foi comunicado. Depois do feed-forward, outra conexão residual e outra normalização completam o bloco.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Conexão residual (Add)",
          body:
            "Soma da entrada com a saída de uma subcamada: output = x + sublayer(x). Garante que a informação original não se perca e facilita o fluxo de gradientes em redes profundas.",
        },
        {
          type: "definition",
          title: "Layer normalization (Norm)",
          body:
            "Normalização que subtrai a média e divide pelo desvio padrão de cada subvetor, estabilizando a distribuição de ativações e acelerando o treinamento.",
        },
        {
          type: "definition",
          title: "Feed-forward (FFN)",
          body:
            "Rede neural de duas camadas aplicada independentemente a cada posição. Típica: linear → ReLU (ou GELU) → linear. Mesmos parâmetros para todas as posições, mas cada posição é processada separadamente.",
        },
        {
          type: "insight",
          title: "Atenção comunica, feed-forward pensa",
          body:
            "Estudos sugerem que as camadas de atenção servem principalmente para rotear informação entre posições, enquanto o feed-forward armazena o conhecimento factual aprendido. É uma divisão de trabalho clara: atenção é o barramento de comunicação; feed-forward é o processador local.",
        },
        {
          type: "insight",
          title: "O FFN infla e contrai: uma memória key-value disfarçada",
          body:
            "A rede feed-forward não apenas transforma linearmente. Ela expande a dimensionalidade da entrada (tipicamente de d_model para 4×d_model na camada oculta), aplica uma ativação não-linear, e contrai de volta para d_model. Esse inflamento cria um espaço interno vasto onde o modelo pode 'pesquisar e recuperar' fatos aprendidos — funcionando como uma enorme memória key-value fixa. O FFN representa aproximadamente 2/3 dos parâmetros de um bloco Transformer denso.",
        },
        {
          type: "mistake",
          title: "Sem Add & Norm, Transformers profundos não treinam",
          body:
            "Pode parecer que conexões residuais e normalização são detalhes de implementação. Sem elas, modelos com dezenas de camadas sofrem de desvanecimento ou explosão do gradiente, e o treinamento simplesmente não converge. Elas não são opcionais — são parte essencial da arquitetura.",
        },
        {
          type: "mistake",
          title: "A Guerra do Norm: Pre-Norm vs. Post-Norm",
          body:
            "O artigo original do Transformer usa a ordem Attention → Add → Norm (Post-Norm): a normalização vem depois da soma residual. Essa ordem funciona em modelos rasos, mas Xiong et al. (2020) demonstraram que em arquiteturas profundas o Post-Norm causa instabilidade nos gradientes das camadas iniciais, dificultando o treinamento. Por isso, modelos modernos como GPT adotam a ordem Norm → Attention → Add (Pre-Norm): a normalização é aplicada antes da atenção, suavizando os gradientes e permitindo que dezenas ou centenas de camadas treinem de forma estável. A referência 8 desta aula (Xiong et al., 2020) é exatamente sobre essa questão — não é um detalhe de implementação, é uma decisão arquitetônica que determina se um modelo profundo consegue ou não convergir.",
        },
      ],
    },
    {
      id: "complexidade-quadratica",
      eyebrow: "Custo",
      title: "A complexidade O(n²): por que janelas grandes custam tanta memória",
      lead:
        "A atenção compara cada token com todos os outros. Para uma sequência de n tokens, isso gera uma matriz n × n de pontuações. Esse custo quadrático é o preço de olhar para tudo simultaneamente.",
      visual: "quadratic-cost",
      interactive: "quadratic-cost-demo",
      paragraphs: [
        "A autoatenção tem um custo computacional e de memória que cresce com o quadrado do comprimento da sequência. Com 100 tokens, a matriz de atenção é 100 × 100 = 10.000 pontuações. Com 1.000 tokens, são 1.000.000. Com 128.000 tokens (a janela de contexto de modelos recentes), são mais de 16 bilhões de pontuações, cada uma ocupando memória na GPU durante o treinamento e a inferência.",
        "Isso acontece porque cada token precisa comparar sua Query com a Key de todos os outros tokens. O número de comparações cresce proporcionalmente ao produto do número de tokens por ele mesmo — daí o O(n²). Na prática, isso significa que dobrar o tamanho da janela de contexto mais do que quadruplica o uso de memória, e o custo real é ainda maior porque a memória para armazenar as matrizes intermediárias de atenção compete com outros recursos da GPU.",
        "A consequência prática é direta: contextos longos são caros. Modelos com janelas de 128K ou 1M tokens usam técnicas como atenção local dilatada (Longformer), agrupamento de tokens ou cache eficiente para contornar o custo quadrático. Essas técnicas sacrificam parte da atenção total em troca de viabilidade computacional. Não existe almoço grátis: olhar para tudo simultaneamente é poderoso, mas tem um preço que cresce mais rápido que a sequência.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Complexidade O(n²)",
          body:
            "O custo computacional e de memória de um algoritmo cresce proporcionalmente ao quadrado do tamanho da entrada. Na atenção, cada token compara com todos, gerando n² comparações.",
        },
        {
          type: "example",
          title: "Janela de contexto e memória",
          body:
            "Um modelo com janela de 4K tokens gera uma matriz de atenção de 16 milhões de elementos. Com 128K tokens, a matriz passa para mais de 16 bilhões. A GPU precisa armazenar tudo isso simultaneamente durante o cálculo.",
        },
        {
          type: "insight",
          title: "O custo de olhar para tudo",
          body:
            "A atenção full (completa) troca eficiência por completude. Cada token pode se conectar com qualquer outro, mas o preço é quadrático. Técnicas como atenção local, sparse ou linear tentam reduzir esse custo aceitando que nem todo token precisa olhar para todo outro.",
        },
        {
          type: "mistake",
          title: "Janela maior não é sempre melhor",
          body:
            "Aumentar a janela de contexto de 4K para 128K tokens não apenas requer mais memória — o custo computacional por token de saída também cresce, porque cada passo de atenção precisa considerar mais posições. Em aplicações práticas, janelas enormes são úteis apenas se o conteúdo extra for efetivamente relevante.",
        },
      ],
    },
    {
      id: "a-grande-virada",
      eyebrow: "Impacto",
      title: "Por que o Transformer permitiu modelos como GPT e BERT",
      lead:
        "A arquitetura Transformer não era a mais precisa em laboratório. Mas sua capacidade de processar tudo em paralelo a tornou escalável como nenhuma outra, e escala é o que transformou a IA.",
      visual: "parallelization-visual",
      interactive: "rnn-vs-transformer",
      paragraphs: [
        "O artigo 'Attention Is All You Need' foi escrito em 2017 por pesquisadores do Google.originalmente para tradução automática. A proposta era ousada: eliminar recorrência e convolução inteiramente, usar apenas mecanismos de atenção. Os resultados impressionaram a comunidade — o modelo traduziu melhor que tudo que veio antes — mas poucos previram que essa arquitetura se tornaria a base de praticamente todos os modelos de linguagem de grande escala nos anos seguintes.",
        "A razão não era apenas acurácia. Era escalabilidade. Processar todos os tokens em paralelo eliminou o gargalo sequencial das RNNs. Em uma RNN, para processar o token 100, você precisa processar os 99 anteriores. No Transformer, todos os tokens são processados simultaneamente. Isso significa que milhares de núcleos de GPU podem trabalhar ao mesmo tempo, reduzindo semanas de treinamento para dias — e tornando possível treinar modelos com bilhões de parâmetros em trilhões de tokens.",
        "A combinação de paralelização total + conexões residuais + normalização criou uma arquitetura que escala de forma previsível: mais dados, mais parâmetros e mais computo quase sempre resultam em modelos melhores. Esse fenômeno foi batizado de 'scaling laws' e é o que tornou viável o investimento massivo em treinamento de LLMs. Sem a escalabilidade do Transformer, projetos como GPT-4 e Gemini não seriam viáveis — não porque o Transformer é necessariamente superior em pequena escala, mas porque é a única arquitetura que suporta essa escala de forma eficiente.",
        "Até aqui falamos de treinamento, onde a paralelização total brilha: a resposta inteira já está disponível, mascarada token por token, e o modelo processa tudo simultaneamente em cada passo. Mas durante a inferência — quando o modelo gera texto de verdade — a história muda. O modelo precisa gerar o primeiro token para depois prever o segundo, gerar o segundo para prever o terceiro, e assim por diante. Esse processo é estritamente sequencial: não dá para prever o token 50 sem antes ter gerado os 49 anteriores, porque cada novo token se torna parte do contexto do próximo passo. Essa dualidade entre treinamento paralelo e inferência sequencial é fundamental para entender o próximo otimização — e também a principal limitação prática dos modelos generativos.",
      ],
      blocks: [
        {
          type: "insight",
          title: "Paralelização é o superpoder",
          body:
            "O Transformer não venceu RNNs porque é teoricamente superior em qualquer escala. Venceu porque pode ser treinado em paralelo, o que torna viável usar hardware moderno de forma eficiente. Escala é o que transformou a IA.",
        },
        {
          type: "insight",
          title: "Scaling laws",
          body:
            "Pesquisas de Kaplan et al. (2020) e outros mostraram que a performance de Transformers escala de forma previsível com mais dados, mais parâmetros e mais computo. Essa previsibilidade transformou o treinamento de LLMs de experimento científico em investimento de engenharia.",
        },
        {
          type: "example",
          title: "De tradução para tudo",
          body:
            "O Transformer original era encoder-decoder para tradução. BERT usou apenas o encoder para representação bidirecional. GPT usou apenas o decoder para geração autoregressiva. Toda a família de modelos modernos é uma variação da mesma arquitetura.",
        },
        {
          type: "mistake",
          title: "O Transformer não resolve tudo",
          body:
            "Atenção quadrática, custo de inferência em contextos longos, risco de alucinação e limitações de memória persistem. A arquitetura é poderosa, mas tem custos e limitações reais. Pesquisas sobre atenção eficiente, memória externa e arquiteturas alternativas continuam ativas.",
        },
        {
          type: "insight",
          title: "O segredo por trás do ChatGPT não travar: o KV Cache",
          body:
            "Durante a inferência autoregressiva, o modelo gera um token por vez. Sem otimização, cada novo token recalcularia a atenção sobre todos os tokens anteriores — o custo cresceria como um triângulo. O KV Cache armazena as matrizes K e V já computadas dos tokens anteriores, evitando recálculo. Mas conforme o histórico cresce, o cache ocupa mais memória GPU — é por isso que conversas muito longas no ChatGPT eventualmente ficam mais lentas ou são truncadas.",
        },
      ],
    },
    {
      id: "resumo-final",
      eyebrow: "Resumo",
      title: "O que você precisa lembrar",
      lead:
        "O Transformer resolveu dois problemas centrais — contexto e paralelização — com um mecanismo elegante: atenção total combinada com conexões residuais.",
      visual: "summary-transformers-stack",
      interactive: "summary-cards",
      paragraphs: [
        "Relembre os pontos centrais antes de seguir para o quiz.",
      ],
    },
    {
      id: "quiz-revisao",
      eyebrow: "Revisão",
      title: "Quiz de revisão",
      lead:
        "Teste se os conceitos de Transformers e atenção ficaram conectados: Q/K/V, matemática, multi-head, positional encoding, bloco completo e complexidade.",
      interactive: "quiz",
      paragraphs: [
        "Use as perguntas para revisar o raciocínio. O objetivo é entender por que a arquitetura funciona e quais são suas limitações, não memorizar fórmulas.",
      ],
    },
    {
      id: "glossario-proximos-estudos",
      eyebrow: "Glossário",
      title: "Glossário e próximos estudos",
      lead:
        "Consolide o vocabulário essencial sobre Transformers e atenção para acompanhar papers, documentação e discussões técnicas.",
      interactive: "glossary",
      paragraphs: [
        "Dominar esses termos ajuda a ler artigos, implementar modelos e diagnosticar problemas em aplicações reais.",
      ],
    },
  ],
  summaryCards: [
    {
      title: "RNNs eram sequenciais",
      body:
        "Processavam palavra por palavra, limitando contexto longo e impedindo paralelização. Dois problemas conectados: esquecimento e lentidão.",
    },
    {
      title: "Atenção contextualiza",
      body:
        "Cada token consulta todos os outros e combina informações relevantes. O mesmo 'banco' vira coisas diferentes em contextos diferentes.",
    },
    {
      title: "Q, K, V são projeções",
      body:
        "Cada token gera uma Query (pergunta), uma Key (etiqueta) e um Value (conteúdo). As matrizes de projeção são aprendidas no treinamento.",
    },
    {
      title: "Produto escalar mede similaridade",
      body:
        "Q·K mede alinhamento. Softmax normaliza. Soma ponderada compõe. Dividir por √d_k evita saturação do softmax.",
    },
    {
      title: "Multi-head captura múltiplos padrões",
      body:
        "Cada cabeça atende a tipos diferentes de relação: sintaxe, referência, tópico. Concatenar as cabeças dá uma representação rica.",
    },
    {
      title: "Posição vem de fora",
      body:
        "Atenção é permutação-invariante. Positional encoding (senos/cossenos ou aprendido) injeta ordem nos embeddings.",
    },
    {
      title: "Add & Norm + FFN completam o bloco",
      body:
        "Atenção comunica, feed-forward pensa. Conexões residuais e normalização permitem modelos profundos sem desvanecer gradientes.",
    },
    {
      title: "Atenção custa O(n²)",
      body:
        "Cada token compara com todos. Dobrar a janela mais do que quadruplica a memória. Técnicas de atenção eficiente tentam contornar isso.",
    },
    {
      title: "Paralelização é o superpoder",
      body:
        "Processar todos os tokens simultaneamente eliminou o gargalo das RNNs e viabilizou o treinamento em escala — o que levou aos LLMs modernos.",
    },
  ],
  quiz: [
    {
      id: "q1",
      prompt: "Quais eram os dois problemas centrais das RNNs que o Transformer veio resolver?",
      options: [
        {
          id: "a",
          label:
            "Esquecimento de contexto distante e lentidão de treinamento por sequencialidade.",
        },
        {
          id: "b",
          label:
            "Limitação no tamanho do vocabulário de treinamento e incapacidade de generalizar para domínios fora da distribuição de dados.",
        },
        {
          id: "c",
          label:
            "Consumo excessivo de memória por camada e dificuldade em representar palavras raras em espaços de alta dimensionalidade.",
        },
      ],
      correctOptionId: "a",
      feedback:
        "As RNNs liam palavra por palavra, esquecendo contexto longo e impossibilitando paralelização. O Transformer resolveu ambos com atenção total e processamento simultâneo.",
    },
{
      id: "q2",
      prompt: "Na self-attention, de onde vêm as Queries, Keys e Values?",
      options: [
        {
          id: "a",
          label:
            "De uma camada de embedding pré-treinada e fixa que codifica relações gramaticais entre os tokens da sequência.",
        },
        {
          id: "b",
          label:
            "Do mesmo token de entrada, multiplicado por três matrizes de pesos diferentes que o modelo aprende.",
        },
        {
          id: "c",
          label:
            "De uma projeção linear única compartilhada entre Q, K e V, que é decomposta por funções de ativação diferentes.",
        },
      ],
      correctOptionId: "b",
      feedback:
        "Cada token é projetado três vezes: por Wq (gera Query), por Wk (gera Key) e por Wv (gera Value). As matrizes Wq, Wk e Wv são parâmetros treináveis.",
    },
    {
      id: "q3",
      prompt: "Por que o produto escalar Q · K é dividido por √d_k antes do softmax?",
      options: [
        {
          id: "a",
          label:
            "Para evitar que produtos escalares grandes saturem o softmax, concentrando quase todo o peso em uma posição.",
        },
        {
          id: "b",
          label:
            "Para amplificar a diferença entre tokens muito similares, forçando o modelo a discriminar melhor entre posições relevantes e irrelevantes.",
        },
        {
          id: "c",
          label:
            "Para centralizar a distribuição dos valores de atenção em torno da média, reduzindo o desvio padrão entre posições vizinhas.",
        },
      ],
      correctOptionId: "a",
      feedback:
        "Quando d_k é grande, produtos escalares tendem a valores extremos. O softmax satura: um valor próximo de 1 e os outros próximos de 0, matando o gradiente. A escala por √d_k controla a variância e mantém o softmax informativo.",
    },
    {
      id: "q4",
      prompt: "Qual é a principal vantagem de multi-head attention sobre atenção de cabeça única?",
      options: [
        {
          id: "a",
          label:
            "Permite que cada cabeça processe uma subsequência diferente da entrada, dividindo o trabalho de forma independente entre os grupos de tokens.",
        },
        {
          id: "b",
          label:
            "Permite que diferentes cabeças aprendam tipos diferentes de relações simultaneamente (gramática, referência, tópico).",
        },
        {
          id: "c",
          label:
            "Garante que cada cabeça tenha acesso a um subconjunto exclusivo dos parâmetros de Value, evitando redundância na representação final.",
        },
      ],
      correctOptionId: "b",
      feedback:
        "Cada cabeça opera em um subespaço menor, mas o poder vem da diversidade: cabeças diferentes se especializam em padrões diferentes, e a concatenação dessas saídas cria uma representação rica que uma única cabeça não conseguiria.",
    },
    {
      id: "q5",
      prompt: "Por que o Transformer precisa de positional encoding?",
      options: [
        {
          id: "a",
          label:
            "Porque a atenção é permutação-invariante e não distingue ordem entre os tokens sem essa informação.",
        },
        {
          id: "b",
          label:
            "Porque os embeddings de palavra carregam informação semântica mas não codificam relações gramaticais entre posições adjacentes.",
        },
        {
          id: "c",
          label:
            "Porque o mecanismo de atenção elimina informação posicional ao calcular produtos escalares entre vetores de mesma dimensionalidade.",
        },
      ],
      correctOptionId: "a",
      feedback:
        "Se você embaralhar os tokens antes da atenção, as pontuações par a par não mudam. A atenção não tem noção de 'primeiro' ou 'último' — positional encoding injeta essa informação.",
    },
    {
      id: "q6",
      prompt: "Qual é a função da conexão residual (Add) e da normalização (Norm) no bloco Transformer?",
      options: [
        {
          id: "a",
          label:
            "Garantir que a informação original não se perca e estabilizar a distribuição de valores para permitir treinamento de modelos profundos.",
        },
        {
          id: "b",
          label:
            "Expandir a dimensionalidade intermediária da rede feed-forward, permitindo que o modelo represente transformações não-lineares mais complexas.",
        },
        {
          id: "c",
          label:
            "Comprimir a representação dos tokens entre camadas consecutivas, forçando o modelo a codificar apenas as informações mais relevantes para a saída.",
        },
      ],
      correctOptionId: "a",
      feedback:
        "Sem Add & Norm, Transformers profundos sofrem de desvanecimento ou explosão do gradiente. A conexão residual preserva a informação original; a normalização estabiliza os valores para que o treinamento convirja.",
    },
    {
      id: "q7",
      prompt: "O que a rede feed-forward faz após a atenção no bloco Transformer?",
      options: [
        {
          id: "a",
          label:
            "Processa cada token individualmente, refinando sua representação e armazenando conhecimento factual aprendido.",
        },
        {
          id: "b",
          label:
            "Intercala representações entre posições vizinhas por meio de convoluções deslizantes, refinando o significado de cada token com base nos tokens adjacentes.",
        },
        {
          id: "c",
          label:
            "Calcula a distribuição de probabilidades final sobre o vocabulário inteiro através de projeções lineares e softmax, gerando diretamente os tokens de saída.",
        },
      ],
      correctOptionId: "a",
      feedback:
        "A atenção mistura informação entre posições (comunica). O feed-forward processa cada posição independentemente, transformando e refinando (pensa). Estudos sugerem que é no feed-forward que grande parte do conhecimento factual é armazenado.",
    },
    {
      id: "q8",
      prompt: "Por que aumentar a janela de contexto de 4K para 128K tokens tem um custo maior do que 32 vezes mais memória?",
      options: [
        {
          id: "a",
          label:
            "Porque a atenção gera uma matriz n × n, e o custo quadrático significa que 32× mais tokens gera 1024× mais elementos na matriz de atenção.",
        },
        {
          id: "b",
          label:
            "Porque cada token necessita de uma representação posicional progressivamente maior conforme a janela cresce, multiplicando o custo linear por posição.",
        },
        {
          id: "c",
          label:
            "Porque a rede feed-forward interna replica seus parâmetros proporcionalmente ao comprimento da janela de contexto a cada camada.",
        },
      ],
      correctOptionId: "a",
      feedback:
        "A matriz de atenção é quadrada. Com 4K tokens, são 16M elementos. Com 128K, são mais de 16B — 1024 vezes mais. O custo cresce com o quadrado do comprimento.",
    },
    {
      id: "q9",
      prompt: "Qual foi a principal razão pela qual o Transformer se tornou a base de modelos como GPT e BERT?",
      options: [
        {
          id: "a",
          label:
            "Projetou uma arquitetura mais eficiente em termos de parâmetros que qualquer modelo recorrente, reduzindo o custo computacional por token em todos os cenários.",
        },
        {
          id: "b",
          label:
            "Permitia processamento totalmente paralelo, viabilizando treinamento em escala com hardware moderno.",
        },
        {
          id: "c",
          label:
            "Introduziu um mecanismo de memória persistente que elimina a necessidade de recalcular estados ocultos, tornando a inferência em contextos longos mais barata.",
        },
      ],
      correctOptionId: "b",
      feedback:
        "A superioridade do Transformer não é apenas em acurácia por acurácia em pequena escala. É a paralelização total que permite usar eficientemente GPUs e TPUs, viabilizando o treinamento com trilhões de tokens e bilhões de parâmetros.",
    },
    {
      id: "q10",
      prompt: "Na self-attention, o que o produto escalar entre uma Query e uma Key mede?",
      options: [
        {
          id: "a",
          label:
            "O alinhamento entre 'o que estou procurando' e 'o que você oferece' — vetores na mesma direção indicam alta relevância.",
        },
        {
          id: "b",
          label:
            "A distância posicional absoluta entre os dois tokens na sequência de entrada, determinada pelo índice de cada um no contexto.",
        },
        {
          id: "c",
          label:
            "A magnitude do vetor de Value associado àquela posição, que indica a importância relativa do conteúdo semântico armazenado.",
        },
      ],
      correctOptionId: "a",
      feedback:
        "O produto escalar mede alinhamento. Query e Key apontando na mesma direção → pontuação alta → alta atenção. Ortogonais → pontuação baixa. É uma medida de similaridade vetorial.",
    },
  ],
  glossary: [
    {
      term: "Transformer",
      definition:
        "Arquitetura neural baseada em mecanismos de atenção e redes feed-forward, sem recorrência nem convolução. Processa sequências em paralelo e escala de forma eficiente.",
    },
    {
      term: "Self-attention",
      definition:
        "Mecanismo em que cada posição de uma sequência calcula pesos sobre todas as outras posições (incluindo a si mesma) para combinar informações relevantes e contextualizar sua representação.",
    },
    {
      term: "Query (Q)",
      definition:
        "Vetor produzido pela projeção do embedding de um token pela matriz Wq. Representa o que o token está procurando na sequência.",
    },
    {
      term: "Key (K)",
      definition:
        "Vetor produzido pela projeção do embedding de um token pela matriz Wk. Representa o que o token oferece para comparação — sua etiqueta de relevância.",
    },
    {
      term: "Value (V)",
      definition:
        "Vetor produzido pela projeção do embedding de um token pela matriz Wv. Contém a informação que o token contribui caso seja selecionado pela atenção.",
    },
    {
      term: "Produto escalar",
      definition:
        "Operação entre dois vetores que mede seu alinhamento. Na atenção, o produto escalar entre Query e Key indica similaridade e relevância.",
    },
    {
      term: "Softmax",
      definition:
        "Função que converte um vetor de pontuações em uma distribuição de probabilidades (soma 1). Na atenção, normaliza as pontuações em pesos.",
    },
    {
      term: "Multi-head attention",
      definition:
        "Extensão da atenção que executa múltiplas atenções em paralelo em subespaços de menor dimensionalidade, cada uma com suas próprias matrizes de projeção.",
    },
    {
      term: "Positional encoding",
      definition:
        "Vetor somado ao embedding de cada posição para injetar informação de ordem. Pode ser senoidal (fixo) ou aprendido (treinável).",
    },
    {
      term: "Conexão residual (Add)",
      definition:
        "Soma da entrada com a saída de uma subcamada: output = x + sublayer(x). Preserva a informação original e facilita o fluxo de gradientes.",
    },
    {
      term: "Layer normalization (Norm)",
      definition:
        "Normalização que subtrai a média e divide pelo desvio padrão das ativações de cada subvetor, estabilizando a distribuição e acelerando o treinamento.",
    },
    {
      term: "Rede feed-forward (FFN)",
      definition:
        "Rede neural de duas camadas aplicada independentemente a cada posição. Típica: linear → ativação → linear. Armazena grande parte do conhecimento factual do modelo.",
    },
    {
      term: "Complexidade O(n²)",
      definition:
        "Custo computacional e de memória que cresce com o quadrado do tamanho da entrada. Na atenção, cada token compara com todos, gerando n² pontuações.",
    },
    {
      term: "Atenção causal",
      definition:
        "Variação da atenção que impede que posições vejam tokens futuros, usada em modelos autoregressivos (como GPT) para garantir que a geração não use informações do futuro.",
    },
    {
      term: "Scaling laws",
      definition:
        "Relação empírica entre performance, dados, parâmetros e computo. Mostra que Transformers escalam de forma previsível: mais recursos quase sempre produzem modelos melhores.",
    },
    {
      term: "Autoregressivo",
      definition:
        "Modo de geração em que o modelo produz um token por vez, condicionando cada previsão em todos os tokens gerados anteriormente. Na inferência de modelos como GPT, o processo é estritamente sequencial — não é possível prever o token t sem antes ter gerado os tokens 1 até t-1.",
    },
    {
      term: "KV Cache",
      definition:
        "Otimização usada durante inferência autoregressiva que armazena as matrizes de Keys e Values já computadas dos tokens anteriores, evitando recalcular a atenção sobre todo o histórico a cada novo passo. Sem o KV Cache, o custo de geração cresceria quadraticamente a cada token produzido.",
    },
    {
      term: "Desvanecimento do gradiente (vanishing gradient)",
      definition:
        "Problema em redes profundas em que os gradientes diminuem exponencialmente ao serem propagados para camadas iniciais, impossibilitando o aprendizado dessas camadas. Nas RNNs, era a causa direta da 'amnésia': sinais de treino não alcançavam o início da sequência. Conexões residuais e normalização no Transformer mitigam esse problema.",
    },
  ],
};