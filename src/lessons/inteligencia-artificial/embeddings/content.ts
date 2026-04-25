import type { LessonContent } from "../../../types/content";

export const embeddingsContent: LessonContent = {
  id: "embeddings",
  title: "Embeddings",
  subtitle:
    "Como converter significado em coordenadas: a técnica que permite a máquinas medir similaridade, organizar conceitos e buscar pelo sentido.",
  description:
    "Uma aula visual sobre embeddings, espaço vetorial, similaridade de cosseno, Word2Vec, busca semântica, clustering, embeddings contextuais e limitações.",
  primaryCategoryId: "inteligencia-artificial",
  secondaryCategoryId: "computacao",
  level: "Intermediário",
  estimatedTime: "40-55 min",
  tags: [
    "Inteligência Artificial",
    "Embeddings",
    "Vetores",
    "NLP",
    "Similaridade Semântica",
    "Word2Vec",
    "Busca Semântica",
  ],
  learningObjectives: [
    "Entender por que representações esparsas como one-hot encoding falham em capturar relações de significado.",
    "Visualizar embeddings como coordenadas em um espaço vetorial onde proximidade indica similaridade semântica.",
    "Diferenciar similaridade de cosseno de distância euclidiana e saber quando usar cada uma.",
    "Compreender como operações vetoriais capturam relações analógicas como rei − homem + mulher ≈ rainha.",
    "Explicar o princípio do Word2Vec e como o espaço de embeddings é aprendido a partir de co-ocorrência.",
    "Diferenciar embeddings estáticos de contextuais e entender por que isso importa.",
    "Aplicar embeddings em busca semântica, clustering e bancos de dados vetoriais.",
    "Reconhecer limitações: viés, ambiguidade, dependência de corpus, ilusão da projeção 2D e custo computacional de embeddings contextuais.",
  ],
  prerequisites: [
    "Noção básica de vetores como setas com direção e magnitude.",
    "Familiaridade com o conceito de que modelos processam representações numéricas de texto.",
    "Curiosidade sobre como sistemas de recomendação e busca entendem significado.",
  ],
  references: [
    {
      title: "Efficient Estimation of Word Representations in Vector Space",
      source: "Mikolov et al., 2013 — arXiv",
      url: "https://arxiv.org/abs/1301.3781",
      note:
        "Artigo original que introduziu Word2Vec, demonstrando que representações densas de palavras capturam relações semânticas e sintáticas.",
    },
    {
      title: "Linguistic Regularities in Continuous Space Word Representations",
      source: "Mikolov et al., 2013 — NAACL",
      url: "https://aclanthology.org/N13-1090/",
      note:
        "Artigo que demonstrou as famosas analogias vetoriais (rei − homem + mulher ≈ rainha) e revelou a estrutura geométrica dos embeddings.",
    },
    {
      title: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding",
      source: "Devlin et al., 2019 — NAACL",
      url: "https://aclanthology.org/N19-1423/",
      note:
        "Artigo que introduziu BERT, modelo contextual que gera embeddings diferentes para a mesma palavra conforme o contexto.",
    },
    {
      title: "Learning Transferable Visual Models From Natural Language Supervision",
      source: "Radford et al., 2021 — ICML (CLIP)",
      url: "https://openai.com/index/clip/",
      note:
        "Artigo do CLIP que demonstrou embeddings multimodais: texto e imagem no mesmo espaço vetorial.",
    },
    {
      title: "Man is to Computer Programmer as Woman is to Homemaker?",
      source: "Bolukbasi et al., 2016 — arXiv",
      url: "https://arxiv.org/abs/1607.06520",
      note:
        "Artigo seminal sobre viés de gênero em embeddings de palavras e métodos para mitigá-lo.",
    },
    {
      title: "A Biological Approach to Textual Pattern Processing",
      source: "Firth, 1957",
      url: "https://en.wikipedia.org/wiki/John_Rupert_Firth",
      note:
        "Origem do princípio 'You shall know a word by the company it keeps', fundamentação linguística dos embeddings.",
    },
    {
      title: "Visualizing Data using t-SNE",
      source: "van der Maaten & Hinton, 2008 — Journal of Machine Learning Research",
      url: "https://jmlr.org/papers/v9/vandermaaten08a.html",
      note:
        "Artigo que introduziu t-SNE, técnica de redução de dimensionalidade muito usada para visualizar embeddings em 2D.",
    },
    {
      title: "pgvector: PostgreSQL extension for vector similarity search",
      source: "pgvector — GitHub",
      url: "https://github.com/pgvector/pgvector",
      note:
        "Extensão para bancos de dados vetoriais em PostgreSQL, exemplo de infraestrutura para armazenar e consultar embeddings em produção.",
    },
    {
      title: "OpenAI Embeddings Guide",
      source: "OpenAI — Documentação oficial",
      url: "https://platform.openai.com/docs/guides/embeddings",
      note:
        "Guia prático de uso de embeddings em produção, cobrindo melhores práticas de chunking, escolha de modelo e limites de tokens. Referência moderna com perspectiva de engenharia.",
    },
  ],
  heroVisual: "embeddings-hero",
  openingText:
    "Como você ensinaria a um computador a diferença entre 'rei' e 'rainha', ou a semelhança entre 'gato' e 'cachorro'? Para as máquinas, palavras são apenas sequências de caracteres vazias de sentido. O problema de ensinar significado a sistemas digitais parecia insolúvel até que deixamos de olhar para a linguística clássica e passamos a olhar para a geometria. Embeddings são a técnica fascinante que transforma ideias, sentimentos e conceitos em coordenadas matemáticas, permitindo que a inteligência artificial finalmente comece a 'entender' o mundo.",
  quickFacts: [
    {
      title: "Coordenadas de significado",
      body:
        "Assim como latitude e longitude indicam onde uma cidade está no mapa, embeddings dão a cada palavra coordenadas em um espaço de centenas de dimensões, capturando sua essência.",
    },
    {
      title: "Próximos no espaço, próximos na ideia",
      body:
        "A mágica acontece na geometria: se plotarmos essas coordenadas, os vetores de 'abacate' e 'banana' estarão aglomerados no canto das frutas, muito distantes de 'avião' e 'helicóptero'.",
    },
    {
      title: "Nascem da leitura voraz",
      body:
        "As máquinas não recebem um dicionário. Elas deduzem as coordenadas lendo bilhões de textos e percebendo que palavras como 'café' e 'chá' costumam aparecer cercadas por palavras semelhantes, como 'xícara' e 'quente'.",
    },
    {
      title: "Matemática com palavras",
      body:
        "Como são números, podemos fazer equações puramente semânticas. A IA descobriu sozinha que se você pegar as coordenadas de 'Paris', subtrair 'França' e somar 'Japão', o resultado cai nas coordenadas de 'Tóquio'.",
    },
  ],
  timeline: [
    {
      id: "tfidf",
      period: "Década de 1970–2000",
      title: "TF-IDF e Bag of Words",
      description:
        "Representações numéricas de texto baseadas em frequência de termos. Esparsas, sem semântica: 'gato' e 'cachorro' são tão distantes quanto 'gato' e 'planeta'.",
    },
    {
      id: "word2vec",
      period: "2013",
      title: "Word2Vec",
      description:
        "Mikolov et al. tornam embeddings densos práticos e escaláveis. A ideia central: palavras que aparecem em contextos similares têm significados similares.",
    },
    {
      id: "elmo",
      period: "2018",
      title: "ELMo",
      description:
        "Embeddings contextuais via LSTM. A mesma palavra pode receber vetores diferentes dependendo da sentença.",
    },
    {
      id: "bert",
      period: "2018",
      title: "BERT",
      description:
        "Transformer bidirecional gera embeddings contextuais ricos. 'banco' (instituição) e 'banco' (assento) recebem representações diferentes conforme o contexto.",
    },
    {
      id: "clip",
      period: "2021",
      title: "CLIP",
      description:
        "Embeddings multimodais: texto e imagem compartilham o mesmo espaço vetorial. A generalização do conceito de embedding para qualquer modalidade.",
    },
  ],
  sections: [
    {
      id: "o-problema-da-representacao",
      eyebrow: "Ponto de partida",
      title: "Como representar significado para uma máquina?",
      lead:
        "Computadores operam sobre números, não sobre conceitos. Representar 'gato' como um identificador arbitrário ignora toda relação semântica que humanos conhecem intuitivamente.",
      visual: "one-hot-vs-embedding",
      paragraphs: [
        "Historicamente, a inteligência artificial enfrentava uma barreira invisível: computadores calculam números com perfeição, mas são cegos para conceitos. Nos primeiros sistemas, tentar fazer a máquina entender que 'carro' e 'automóvel' eram a mesma coisa exigia programar regras manuais exaustivas. Era um dicionário infinito de exceções que invariavelmente desmoronava perante a complexidade da linguagem humana real.",
        "A abordagem clássica mais adotada durante décadas para tentar traduzir palavras em números foi o one-hot encoding. Imagine um vocabulário de 50.000 palavras. A palavra 'gato' ganharia uma lista de 50.000 posições, contendo um único '1' e 49.999 zeros. 'Cachorro' teria o seu próprio '1' isolado em outro canto. O resultado? Sistemas completamente engessados. Um modelo treinado para reconhecer frases sobre 'gatos' não reaproveitava nenhum conhecimento ao ler sobre 'felinos'.",
        "O problema geométrico dessa abordagem antiga era fatal: no modelo one-hot, a distância matemática entre 'gato' e 'cachorro' é exatamente idêntica à distância entre 'gato' e 'frigideira'. Todas as palavras estão igualmente isoladas no espaço. Essa total incapacidade de capturar nuances e categorias forçou uma revolução na IA, motivando a busca por representações densas onde a própria geometria refletisse o significado.",
      ],
      blocks: [
        {
          type: "definition",
          title: "One-hot encoding",
          body:
            "Representação onde cada elemento recebe um vetor com um único valor 1 e o restante zero. Todas as distâncias entre pares são idênticas e máxima.",
        },
        {
          type: "mistake",
          title: "One-hot não captura relação nenhuma",
          body:
            "No one-hot, similaridade de cosseno e distância euclidiana são iguais para todo par de palavras diferentes. Não importa se as palavras são sinônimos ou antônimos — geometricamente, são idênticas.",
        },
        {
          type: "insight",
          title: "A geometria deveria refletir o significado",
          body:
            "O fracasso do one-hot revela o requisito fundamental: uma boa representação precisa colocar conceitos relacionados próximos e conceitos distantes longe. Embeddings surgem justamente para resolver isso.",
        },
      ],
    },
    {
      id: "vetores-como-coordenadas",
      eyebrow: "Intuição geométrica",
      title: "Vetores como coordenadas de significado",
      lead:
        "Se 'gato' e 'cachorro' estão próximos no espaço, é porque são semanticamente similares. A posição de cada conceito codifica relações com todos os outros.",
      visual: "embedding-space-2d",
      interactive: "embedding-explorer",
      paragraphs: [
        "Pense em embeddings como coordenadas geográficas. Latitude e longitude posicionam cidades num mapa: cidades próximas compartilham região, clima, cultura. Analogamente, embeddings posicionam conceitos num mapa de significado. 'Cachorro' e 'gato' ficam na região de 'animais domésticos'. 'Rei' e 'rainha' ficam na região de 'monarquia'.",
        "Cada dimensão do vetor pode capturar um eixo de variação semântica. Em um espaço bidimensional, um eixo poderia representar animado vs. inanimado, o outro, doméstico vs. selvagem. Em espaços reais com centenas de dimensões, os eixos não são tão legíveis, mas a lógica é a mesma: a posição relativa entre dois pontos reflete a relação entre seus significados.",
        "A vantagem sobre one-hot é decisiva: em vez de 50.000 dimensões com um único valor não-zero, embeddings usam 300 dimensões com valores contínuos em cada uma. Cada dimensão carrega informação. A dimensionalidade é menor, a representação é mais rica, e similaridades emergem naturalmente da geometria.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Embedding",
          body:
            "Representação densa e contínua de um conceito como um vetor em um espaço de dimensão reduzida, onde a posição relativa entre vetores codifica relações semânticas.",
        },
        {
          type: "example",
          title: "Animais no espaço vetorial",
          body:
            "Em um espaço bem aprendido, 'cachorro' está próximo de 'gato' (ambos são animais domésticos), que está próximo de 'peixe' (animal), que está um pouco mais longe de 'árvore' (ser vivo, mas não animal). Distância gradual, não tudo-ou-nada.",
          items: [
            "cachorro ↔ gato: muito próximo",
            "cachorro ↔ peixe: moderadamente próximo",
            "cachorro ↔ planeta: distante",
          ],
        },
        {
          type: "insight",
          title: "Mapa de significado, não mapa de palavras",
          body:
            "A analogia geográfica é poderosa: assim como cidades próximas compartilham características regionais, conceitos próximos no espaço de embeddings compartilham características semânticas.",
        },
        {
          type: "mistake",
          title: "Não tente visualizar centenas de dimensões",
          body:
            "A analogia em 2D ajuda a construir intuição, mas embeddings reais operam em 300 a 1.536 dimensões. A geometria em alta dimensionalidade se comporta de forma contraintuitiva: quase todo vetor é ortogonal a quase todo outro, e distâncias entre pontos tendem a se tornar similares. Usar a intuição de 2D para raciocinar sobre comportamento real do espaço é enganoso — as visualizações em 2D são didáticas, não fiéis.",
        },
      ],
    },
    {
      id: "similaridade-de-cosseno",
      eyebrow: "Medindo proximidade",
      title: "Similaridade de cosseno: medindo o ângulo entre vetores",
      lead:
        "Para saber quão próximos dois conceitos são, precisamos quantificar a distância. Similaridade de cosseno mede o ângulo entre vetores e é o padrão em embeddings.",
      visual: "cosine-similarity",
      interactive: "cosine-distance-demo",
      paragraphs: [
        "Dois vetores podem ser comparados de maneiras diferentes. A distância euclidiana mede o comprimento do segmento retinho entre as pontas dos vetores. A similaridade de cosseno mede o ângulo entre eles. No espaço de embeddings, cosseno é o padrão — e entender por que é essencial.",
        "Similaridade de cosseno é o cosseno do ângulo entre dois vetores. Se os vetores apontam na mesma direção, o ângulo é zero e a similaridade é 1. Se são ortogonais, a similaridade é 0. Se apontam em direções opostas, a similaridade é −1. Ela ignora a magnitude e captura apenas a orientação relativa — ou seja, o padrão semântico, não o tamanho do vetor.",
        "Por que isso importa? Em muitos modelos não normalizados, a magnitude do vetor reflete a frequência da palavra no corpus de treino: palavras mais comuns como 'gato' tendem a vetores maiores, enquanto palavras raras como 'gatinho' tendem a vetores menores. Se ambos apontam na mesma direção, são semanticamente equivalentes — mas a distância euclidiana entre eles seria grande, enquanto a similaridade de cosseno seria 1. Em alta dimensionalidade, essa divergência é comum: vetores podem ter magnitudes muito diferentes e ainda assim codificar o mesmo significado. Cosseno resolve isso ao olhar só para a direção.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Similaridade de cosseno",
          body:
            "Medida de similaridade baseada no ângulo entre dois vetores, dada por cos(θ) = (A · B) / (||A|| × ||B||). Varia de −1 (opostos) a 1 (idênticos). Ignora magnitude.",
        },
        {
          type: "definition",
          title: "Distância euclidiana",
          body:
            "Comprimento do segmento reto entre as pontas de dois vetores. Depende tanto da direção quanto da magnitude. Varia de 0 a infinito.",
        },
        {
          type: "mistake",
          title: "Cosseno e euclidiana não são intercambiáveis",
          body:
            "Quando vetores não estão normalizados, a distância euclidiana pode ser grande entre vetores semanticamente idênticos, apenas porque um tem magnitude maior. Cosseno corrige isso ao focar só na direção.",
        },
        {
          type: "example",
          title: "Onde as duas medidas divergem",
          body:
            "Dois vetores apontando na mesma direção com magnitudes diferentes: cosseno = 1 (semanticamente iguais), euclidiana > 0 (geometricamente distantes). Embeddings normalizados convergem as duas medidas, mas muitos modelos não normalizam.",
        },
      ],
    },
    {
      id: "operacoes-vetoriais",
      eyebrow: "Álgebra de significado",
      title: "Operações vetoriais capturam relações semânticas",
      lead:
        "O famoso rei − homem + mulher ≈ rainha não é truque, é consequência: se gênero é uma direção no espaço, subtrair e adicionar move conceitos ao longo dessa direção.",
      visual: "vector-operations",
      interactive: "analogy-calculator",
      paragraphs: [
        "A analogia vetorial mais célebre de embeddings é a operação rei − homem + mulher ≈ rainha. Isso funciona porque o espaço aprendeu que a diferença entre 'rei' e 'rainha' é similar à diferença entre 'homem' e 'mulher' — ambas codificam o eixo de gênero. Ao subtrair 'homem' de 'rei', removemos a dimensão de masculinidade; ao adicionar 'mulher', movemos na direção da feminilidade.",
        "Essa propriedade não é acidental. O treinamento do Word2Vec otimiza vetores para que palavras que predizem contextos similares tenham representações similares. Quando o modelo consistentemente vê 'rainha' nos mesmos contextos sintáticos onde vê 'rei', mas com marcadores de gênero feminino, a diferença vetorial aprendida é análoga à diferença 'homem' — 'mulher'.",
        "A mesma lógica se aplica a outras relações: país − capital, presente − passado, singular − plural. A direção entre 'Brasil' e 'Brasília' é similar à direção entre 'França' e 'Paris'. Cada tipo de relação vira uma direção consistente no espaço — desde que o corpus contenha evidência suficiente para que o modelo a aprenda.",
      ],
      blocks: [
        {
          type: "insight",
          title: "Direções = relações",
          body:
            "Cada tipo de relação semântica (gênero, plural, tempo verbal, capital) tende a formar uma direção consistente no espaço vetorial. Operações aritméticas navegam nessas direções.",
        },
        {
          type: "example",
          title: "Analogias vetoriais clássicas",
          body:
            "Operações aritméticas sobre embeddings podem resolver analogias porque capturam relações como direções no espaço.",
          items: [
            "rei − homem + mulher ≈ rainha",
            "Paris − França + Brasil ≈ Brasília",
            "andou − andar + comer ≈ comeu",
          ],
        },
        {
          type: "mistake",
          title: "Analogias perfeitas são exceção, não regra",
          body:
            "Essas analogias funcionam bem em relações fortes e frequentes no corpus, mas não são universalmente precisas. O motivo é sutil: quando fazemos 'rei − homem + mulher', o resultado exato da conta cai num ponto vazio do espaço — não exatamente em cima de 'rainha'. O sistema procura a palavra mais próxima daquele ponto e a apresenta como resposta, mas o espaço é ruidoso e denso. Palavras irrelevantes podem estar mais próximas do ponto do que a palavra esperada, e o corpus pode não conter evidência suficiente para que a direção seja consistente.",
        },
      ],
    },
    {
      id: "o-espaco-e-aprendido",
      eyebrow: "Como surge",
      title: "O espaço de embeddings é aprendido, não dado",
      lead:
        "As coordenadas não são escolhidas manualmente. Elas emergem do treinamento com base em padrões de co-ocorrência nos dados.",
      visual: "word2vec-training",
      paragraphs: [
        "Em 2013, Mikolov e colaboradores mostraram que um conjunto simples de técnicas poderia produzir embeddings de alta qualidade em escala. O princípio é elegantemente simples, e foi bem resumido por Firth em 1957: 'You shall know a word by the company it keeps'. Palavras que aparecem em contextos similares tendem a ter significados similares, e o treinamento ajusta os vetores para refletir isso.",
        "Word2Vec oferece dois modelos: Skip-gram, que prevê o contexto a partir de uma palavra central, e CBOW (Continuous Bag of Words), que prevê a palavra central a partir do contexto. Pense nisso como um jogo de 'preencha a lacuna': a máquina recebe 'O [?] tomou leite de manhã' e precisa adivinhar que a lacuna é 'gato', 'homem', 'menino'. Jogamos esse jogo bilhões de vezes, forçando o modelo a errar e corrigir. A cada rodada, os vetores são ajustados para que palavras que compartilham contextos — e portanto compartilham aspectos de significado — acabem com representações próximas. Skip-gram usa uma palavra para prever as vizinhas; CBOW usa as vizinhas para prever a palavra central.",
        "O ponto crucial: troque o corpus e o mapa inteiro muda. Um modelo treinado em literatura britânica do século XIX posicionar 'rede' próximo de 'pesca', enquanto um modelo treinado em textos de tecnologia dos anos 2020 posicionar 'rede' próximo de 'internet' e 'Wi-Fi'. Não existe 'o' espaço semântico — existe o espaço que um modelo específico aprendeu com dados específicos.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Word2Vec",
          body:
            "Família de modelos que aprende embeddings densos de palavras otimizando a predição de contexto (skip-gram) ou de palavra central (CBOW). A posição de cada palavra emerge dos padrões de co-ocorrência no corpus de treinamento.",
        },
        {
          type: "insight",
          title: "O corpus é o mapa",
          body:
            "Embeddings são espelhos dos dados. Mudou o corpus, muda o espaço. Embeddings de textos médicos codificam relações clínicas; embeddings de redes sociais codificam relações informais e contemporâneas.",
        },
        {
          type: "mistake",
          title: "Embeddings não 'entendem' linguagem",
          body:
            "Embeddings capturam padrões estatísticos de co-ocorrência. 'Banco' (instituição financeira) e 'banco' (assento) podem ficam próximos num modelo genérico porque compartilham contexto. Compreensão depende de mecanismos adicionais.",
        },
        {
          type: "insight",
          title: "A tarefa falsa (pretext task)",
          body:
            "O truque por trás do Word2Vec é criar um jogo de 'preencha a lacuna' e forçar a máquina a jogar bilhões de vezes. No Skip-gram, o modelo recebe uma palavra e tenta prever as palavras ao redor. No CBOW, recebe as palavras ao redor e tenta prever a palavra central. Ninguém quer o modelo que prevê palavras — ele é descartável. Os embeddings são os pesos que sobram depois que o modelo aprende a jogar esse jogo. Eles não são o objetivo do treinamento; são o subproduto de um modelo treinado para uma tarefa artificial.",
        },
      ],
    },
    {
      id: "estaticos-vs-contextuais",
      eyebrow: "Evolução",
      title: "Embeddings estáticos vs. contextuais",
      lead:
        "Word2Vec gera um vetor fixo por palavra. BERT gera vetores diferentes conforme o contexto. Essa diferença é fundamental e frequentemente ignorada.",
      visual: "static-vs-contextual",
      paragraphs: [
        "Num modelo estático como Word2Vec, 'banco' é sempre o mesmo vetor, independentemente de estar em 'banco financeiro' ou 'banco de praça'. O modelo aprendeu uma média de todos os contextos em que 'banco' apareceu e armazenou essa média como representação única. Para palavras polissêmicas, essa média dilui os sentidos distintos.",
        "Modelos contextuais como BERT, ELMo e GPT resolvem isso: a representação de 'banco' muda conforme a sentença. Em 'Depositei dinheiro no banco', o vetor é influenciado por 'dinheiro' e 'depositei'. Em 'Sentei no banco da praça', o vetor é influenciado por 'sentei' e 'praça'. O embedding deixa de ser uma propriedade da palavra e passa a ser uma propriedade da palavra no contexto.",
        "Essa evolução é mais do que um refinamento técnico. Ela muda o que os embeddings representam. Word2Vec captura uma espécie de essência estatística da palavra. BERT captura a palavra em uso, com o sentido que ela assume naquela sentença específica. Para busca semântica e análise de sentimento, embeddings contextuais são significativamente mais eficazes.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Embedding estático",
          body:
            "Representação fixa por palavra. Uma única palavra, um único vetor, independentemente do contexto. Exemplos: Word2Vec, GloVe, FastText.",
        },
        {
          type: "definition",
          title: "Embedding contextual",
          body:
            "Representação que varia conforme o contexto da sentença. A mesma palavra em contextos diferentes recebe vetores diferentes. Exemplos: BERT, ELMo, GPT.",
        },
        {
          type: "example",
          title: "'Banco' em dois contextos",
          body:
            "Estático: 'banco' é sempre o mesmo vetor, média de todos os sentidos. Contextual: 'banco' em 'conta bancária' fica próximo de 'dinheiro'; 'banco' em 'banco de jardim' fica próximo de 'assento'.",
        },
        {
          type: "insight",
          title: "Contextual resolve ambiguidade",
          body:
            "Palavras polissêmicas são o campo de prova natural. Em embeddings estáticos, sentidos distintos são misturados numa média. Em contextuais, cada sentido recebe representação própria.",
        },
        {
          type: "mistake",
          title: "Contextual é mais preciso, mas custa mais",
          body:
            "Word2Vec é literalmente uma tabela chave-valor: consultar o vetor de uma palavra custa microssegundos e memória RAM. BERT é uma inferência de rede neural: cada texto precisa passar por todo o transformer, consumindo GPU e dinheiro. Em produção com milhões de queries, a diferença entre um lookup instantâneo e uma passagem por um modelo pesado é decisiva. Modelos como sentence-transformers buscam equilibrar qualidade contextual com custo viável.",
        },
      ],
    },
    {
      id: "busca-semantica",
      eyebrow: "Aplicação",
      title: "Busca semântica: procurar pelo significado",
      lead:
        "Em vez de coincidência de palavras, busca semântica encontra documentos cujo significado é próximo da pergunta, mesmo sem compartilhar termos.",
      visual: "semantic-search",
      interactive: "semantic-search-demo",
      paragraphs: [
        "Busca tradicional por palavras-chave funciona como montar um quebra-cabeça olhando para o formato das peças: se a forma não encaixa, não serve. A pergunta 'como tratar ansiedade' não encontra 'técnicas para lidar com nervosismo' porque não há nenhuma palavra em comum, embora o significado seja essencialmente o mesmo.",
        "Busca semântica transforma tanto a pergunta quanto os documentos em embeddings. Depois, encontra os documentos mais próximos no espaço vetorial — os cujos vetores têm maior similaridade de cosseno com o vetor da pergunta. 'Tratar ansiedade' e 'lidar com nervosismo' ficam próximos no espaço porque seus significados são similares, mesmo sem vocabulário compartilhado.",
        "O fluxo é: (1) os documentos são embedados e armazenados num índice vetorial; (2) a pergunta é embedada com o mesmo modelo; (3) o sistema busca os vizinhos mais próximos usando similaridade de cosseno; (4) os resultados são ordenados por relevância semântica. Bancos de dados vetoriais como pgvector, Pinecone e Milvus otimizam essa busca para funcionar em escala com milhões de vetores.",
        "Um desafio prático da busca semântica é a assimetria entre pergunta e documento. Na busca simétrica, pergunta e resposta têm tamanhos similares — 'lidar com ansiedade' vs. 'técnicas para nervosismo'. Mas na busca assimétrica, a pergunta do usuário é curta ('tratar ansiedade') e o documento alvo é longo (um artigo inteiro). Embedar um documento longo num único vetor dilui seu significado: informações relevantes ficam misturadas com informações periféricas no mesmo vetor, e a similaridade de cosseno com a pergunta curta cai. É por isso que sistemas em produção fazem chunking — dividir documentos em trechos menores antes de embedar — e armazenam cada trecho como um vetor independente no banco vetorial.",
      ],
      blocks: [
        {
          type: "example",
          title: "Comparativo: lexical vs. semântica",
          body:
            "Busca lexical é como buscar por formato de peça de quebra-cabeça: precisa encaixar exatamente. Busca semântica é como buscar pela imagem da caixa: o contexto e o significado importam mais que a forma exata.",
        },
        {
          type: "definition",
          title: "Busca semântica",
          body:
            "Busca que utiliza embeddings para comparar significados em vez de strings. A similaridade entre vetores substitui a coincidência de termos como critério de relevância.",
        },
        {
          type: "insight",
          title: "Embeddings + índice vetorial = busca em escala",
          body:
            "A parte inteligente é o embedding. A parte prática é o índice vetorial — estruturas como HNSW ou IVF que tornam a busca de vizinhos mais próximos eficiente mesmo com milhões de documentos.",
        },
        {
          type: "mistake",
          title: "Documentos longos não viram um vetor só",
          body:
            "Embedar um documento de 5.000 palavras num único vetor dilui o significado: conceitos específicos ficam afogados na média. Sistemas reais fazem chunking — dividem o texto em trechos de algumas centenas de palavras — e armazenam cada trecho como um vetor separado. Isso preserva a granularidade semântica e melhora a recuperação em buscas assimétricas, onde a pergunta é curta e o documento é extenso.",
        },
      ],
    },
    {
      id: "clustering",
      eyebrow: "Organização",
      title: "Clustering: agrupar sem rotular",
      lead:
        "Se embeddings posicionam conceitos semanticamente, então conceitos próximos devem formar grupos naturais. Clustering encontra esses grupos sem necessidade de categorias pré-definidas.",
      visual: "clustering-visual",
      paragraphs: [
        "Imagine que você tem milhares de artigos e quer organizá-los por tema sem ler todos. Ao embedar os artigos e aplicar um algoritmo de clustering como K-means, os artigos sobre saúde ficam num grupo, os de tecnologia noutro, os de esportes noutro — sem que ninguém tenha definido essas categorias previamente. Os grupos emergem da geometria do espaço.",
        "K-means é o algoritmo mais comum: ele escolhe K centros, atribui cada ponto ao centro mais próximo e reposiciona os centros até convergir. O resultado é uma partição do espaço vetorial em regiões que tendem a corresponder a categorias semânticas. Cada cluster recebe um rótulo interpretável pelos humanos após a formação, não antes.",
        "A qualidade do clustering depende da qualidade dos embeddings. Se o espaço captura bem as relações semânticas, os clusters são coerentes. Se o espaço é ruidoso ou enviesado, os clusters refletem esses problemas. Por isso, clustering é tanto uma ferramenta prática de organização quanto uma ferramenta de diagnóstico: ele revela a estrutura latente do espaço aprendido.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Clustering",
          body:
            "Conjunto de técnicas que agrupa pontos em um espaço vetorial com base em proximidade. No contexto de embeddings, agrupa conceitos ou documentos semanticamente similares.",
        },
        {
          type: "example",
          title: "K-means em embeddings",
          body:
            "1. Escolha K (número de grupos). 2. Posicione K centros aleatoriamente no espaço. 3. Atribua cada embedding ao centro mais próximo. 4. Reposicione os centros na média dos pontos atribuídos. 5. Repita até convergir.",
        },
        {
          type: "insight",
          title: "Clustering como diagnóstico",
          body:
            "Se os clusters não fazem sentido semântico, o espaço de embeddings pode estar enviesado, ruidoso ou mal treinado. Clustering revela a qualidade da representação.",
        },
      ],
    },
    {
      id: "alem-de-texto",
      eyebrow: "Generalização",
      title: "Além de texto: embeddings de imagem e multimodal",
      lead:
        "O conceito de embedding não se limita a palavras. Imagens, áudio e outros dados também podem ser representados como vetores — e em espaços compartilhados.",
      visual: "multimodal-embeddings",
      paragraphs: [
        "CLIP (2021) demonstrou algo poderoso: um modelo pode aprender a mapear imagens e textos no mesmo espaço vetorial. Uma foto de um gato e a legenda 'um gato laranja dormindo no sofá' ficam próximas não por coincidência, mas porque o modelo aprendeu que elas descrevem a mesma cena. Busca multimodal — encontrar imagens com texto e vice-versa — torna-se busca de vizinhos num espaço compartilhado.",
        "A consequência prática é que a mesma infraestrutura que armazena embeddings de texto pode armazenar embeddings de imagem, áudio ou vídeo. Um sistema de recomendação pode sugerir produtos similares com base na distância vetorial entre embeddings de imagem, sem depender de metadados ou categorias manuais.",
        "A generalização do conceito é clara: qualquer domínio onde similaridade faz sentido pode ser embedado. Moléculas em química, sequências de DNA em biologia, preferências de usuários em sistemas de recomendação. O princípio é sempre o mesmo: transformar dados em vetores onde proximidade indica relevância.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Embedding multimodal",
          body:
            "Representação vetorial de dados de diferentes modalidades (texto, imagem, áudio) no mesmo espaço, permitindo comparação direta entre modalidades.",
        },
        {
          type: "example",
          title: "CLIP em ação",
          body:
            "O modelo recebe textos e imagens e aprende a posicionar pares correspondentes próximos no espaço. Resultado: buscar imagens com descrições em linguagem natural, ou encontrar textos que descrevem uma imagem dada.",
        },
        {
          type: "insight",
          title: "Qualquer dado pode ser embedado",
          body:
            "Se existe uma noção de similaridade no domínio, existe a possibilidade de um embedding que a capture. A técnica é genérica; o que muda é o modelo e os dados de treinamento.",
        },
        {
          type: "insight",
          title: "Aprendizado contrastivo: ímãs de atração e repulsão",
          body:
            "No treinamento do CLIP, não basta embedar imagem e texto separadamente — é preciso que eles fiquem no mesmo espaço. O mecanismo funciona como ímãs: durante o treinamento, o modelo puxa a imagem de um gato e a legenda 'um gato laranja no sofá' para o mesmo ponto do espaço (atração), ao mesmo tempo que empurra para longe todas as imagens e legendas que não combinam — 'um carro vermelho', 'um prédio alto' (repulsão). A cada lote de treinamento, milhões de pares errados são afastados e pares certos são aproximados. Após bilhões de exemplos, o espaço converge: imagens e textos que descrevem a mesma cena compartilham uma região do espaço vetorial, como se ímãs positivos tivessem agrupado o que é similar e repelido o que é diferente.",
        },
      ],
    },
    {
      id: "limitacoes-e-cuidados",
      eyebrow: "Limitações",
      title: "Limitações e cuidados necessários",
      lead:
        "Embeddings são poderosos, mas refletem vieses, dependem do corpus, sofrem com ambiguidade e podem criar ilusões quando projetados em 2D.",
      visual: "limitations-visual",
      interactive: "bias-demo",
      paragraphs: [
        "Viés semântico é o problema mais sério. Bolukbasi et al. (2016) mostraram que embeddings treinados em textos da internet associam 'programador' a 'homem' e 'dona de casa' a 'mulher' com muita força. Não porque os embeddings escolheram isso, mas porque o corpus de treinamento contém esses vieses e o modelo os absorveu. Embeddings espelham a sociedade que produziu os dados.",
        "A ambiguidade é outra armadilha. Em modelos estáticos, 'banco' é um único vetor — uma média dos sentidos 'instituição financeira' e 'assento'. Isso pode ser irrelevante em busca semântica ampla, mas prejudicial em aplicações que exigem precisão. Embeddings contextuais mitigam o problema, mas não o eliminam: o contexto pode ser insuficiente para desambiguar completamente.",
        "A ilusão da projeção 2D merece destaque. Visualizar embeddings com t-SNE ou PCA é útil para intuição, mas o espaço real tem centenas de dimensões. Agrupamentos que parecem claros em 2D podem não existir no espaço original, e pontos que parecem distantes em 2D podem ser próximos em alta dimensionalidade. A projeção é uma simplificação com perdas, não uma observação direta.",
        "Há ainda uma limitação prática frequentemente ignorada: embeddings estáticos como Word2Vec são baratos. Consultar um dicionário de vetores custa apenas memória RAM — microssegundos por palavra. Já embeddings contextuais como BERT exigem inferência de uma rede neural inteira para cada novo texto, o que consome GPU e dinheiro. Para aplicações em escala, a diferença entre um lookup em tabela e uma passagem por um transformer é decisiva. Modelos mais recentes como os sentence-transformers buscam equilibrar qualidade contextual com custo computacional, mas a tensão entre precisão e eficiência permanece.",
      ],
      blocks: [
        {
          type: "mistake",
          title: "Projeção 2D não é o espaço real",
          body:
            "t-SNE e PCA reduzem centenas de dimensões para 2. A preservação de estrutura não é garantida. Clusters visuais podem ser artefatos da redução, não estrutura real do espaço.",
        },
        {
          type: "mistake",
          title: "Proximidade não é sinonímia",
          body:
            "'Quente' e 'frio' podem ficar próximos porque ocorrem nos mesmos contextos (previsão do tempo, receitas, sensores). Proximidade indica intercambiabilidade contextual, não equivalência de significado.",
        },
        {
          type: "example",
          title: "Viés em ação",
          body:
            "Num embedding treinado em textos da internet, a operação 'pai' − 'mãe' + 'médico' pode resultar mais próximo de 'enfermeiro' do que de 'médica', revelando um viés de gênero presente nos dados.",
        },
        {
          type: "insight",
          title: "Embeddings são espelhos, não juízes",
          body:
            "Os vieses não são criados pelo algoritmo — são absorvidos dos dados. Isso torna embeddings ferramentas de diagnóstico sociológico, mas também exige intervenção consciente para mitigar danos.",
        },
        {
          type: "mistake",
          title: "Embedding contextual não é de graça",
          body:
            "Word2Vec é um dicionário: consultar o vetor de uma palavra custa microssegundos e memória RAM. BERT é uma inferência de rede neural: cada novo texto exige uma passagem completa pelo modelo, consumindo GPU e dinheiro. A diferença entre lookup e inferência é decisiva em produção. Circuitos que rodam Busca semântica com milhões de queries por dia precisam escolher entre embeddings estáticos rápidos e contextuais caros, ou adotar modelos destilados que buscam equilibrar qualidade e custo.",
        },
      ],
    },
    {
      id: "resumo-final",
      eyebrow: "Resumo",
      title: "O que você precisa lembrar",
      lead:
        "Embeddings transformam significado em geometria. A posição relativa entre vetores codifica relações semânticas, e isso é o que os torna tão úteis.",
      visual: "summary-embeddings-stack",
      paragraphs: [
        "Relembre os pontos centrais antes de seguir para o quiz.",
      ],
    },
    {
      id: "quiz-revisao",
      eyebrow: "Revisão",
      title: "Quiz de revisão",
      lead:
        "Teste se as ideias centrais ficaram conectadas: one-hot, embeddings, cosseno, operações, estático vs. contextual, busca semântica e limitações.",
      interactive: "quiz",
      paragraphs: [
        "Use as perguntas para revisar o raciocínio. O objetivo é entender por que embeddings funcionam e onde podem falhar, não memorizar fórmulas.",
      ],
    },
    {
      id: "glossario-proximos-estudos",
      eyebrow: "Glossário",
      title: "Glossário e próximos estudos",
      lead:
        "Feche a aula consolidando o vocabulário essencial para trabalhar com embeddings e sistemas semânticos.",
      interactive: "glossary",
      paragraphs: [
        "Dominar esses termos ajuda a ler documentação, escolher modelos, diagnosticar problemas e projetar sistemas de busca e recomendação baseados em embeddings.",
      ],
    },
  ],
  summaryCards: [
    {
      title: "One-hot não serve",
      body:
        "Representações esparsas não capturam similaridade. Todos os pares de palavras são igualmente distantes.",
    },
    {
      title: "Embeddings são vetores densos",
      body:
        "Cada conceito é um ponto num espaço contínuo. Proximidade indica similaridade semântica.",
    },
    {
      title: "Cosseno é o padrão",
      body:
        "Similaridade de cosseno mede direção, não magnitude. É a métrica padrão para comparar embeddings.",
    },
    {
      title: "Operações capturam relações",
      body:
        "rei − homem + mulher ≈ rainha: direções no espaço codificam relações como gênero, plural e tempo verbal.",
    },
    {
      title: "O espaço é aprendido",
      body:
        "As coordenadas vêm do treinamento. Troque o corpus e o mapa muda. Não existe 'o' espaço semântico universal.",
    },
    {
      title: "Contextuais são melhores",
      body:
        "Embeddings estáticos dão um vetor por palavra. Embeddings contextuais dão vetores diferentes por contexto.",
    },
    {
      title: "Cuidado com viés e ilusões",
      body:
        "Embeddings refletem vieses do corpus. Projeções 2D podem criar agrupamentos enganosos. Proximidade não é sinonímia.",
    },
  ],
  quiz: [
    {
      id: "q1",
      prompt: "Por que one-hot encoding falha em capturar similaridade semântica?",
      options: [
        {
          id: "a",
          label:
            "Porque todas as palavras são equidistantes — a distância entre 'gato' e 'cachorro' é igual à distância entre 'gato' e 'planeta'.",
        },
        {
          id: "b",
          label: "Porque one-hot usa poucas dimensões para representar palavras.",
        },
        {
          id: "c",
          label: "Porque one-hot não consegue representar mais de uma palavra por vez.",
        },
      ],
      correctOptionId: "a",
      feedback:
        "No one-hot, todo par de palavras diferentes tem a mesma distância. A representação é esparsa e não codifica nenhuma relação de significado.",
    },
    {
      id: "q2",
      prompt: "O que a similaridade de cosseno mede que a distância euclidiana não mede?",
      options: [
        {
          id: "a",
          label: "A magnitude dos vetores.",
        },
        {
          id: "b",
          label: "O ângulo entre vetores, ignorando a magnitude.",
        },
        {
          id: "c",
          label: "O número de dimensões dos vetores.",
        },
      ],
      correctOptionId: "b",
      feedback:
        "Similaridade de cosseno foca na direção (ângulo), não no tamanho. Dois vetores com mesma direção e magnitudes diferentes têm cosseno 1 e distância euclidiana > 0.",
    },
    {
      id: "q3",
      prompt: "Por que a operação rei − homem + mulher ≈ rainha funciona?",
      options: [
        {
          id: "a",
          label:
            "Porque o espaço aprendeu que gênero é uma direção consistente, e as operações aritméticas navegam nessa direção.",
        },
        {
          id: "b",
          label: "Porque o modelo foi programado manualmente com essas relações.",
        },
        {
          id: "c",
          label: "Porque 'rei' e 'rainha' são sinônimos perfeitos.",
        },
      ],
      correctOptionId: "a",
      feedback:
        "O espaço emerge do treinamento. Relações como gênero formam direções consistentes porque o corpus contém evidência suficiente para que o modelo as aprenda.",
    },
    {
      id: "q4",
      prompt: "Qual é a diferença fundamental entre embeddings estáticos e contextuais?",
      options: [
        {
          id: "a",
          label:
            "Estáticos produzem um vetor fixo por palavra; contextuais produzem vetores diferentes conforme o contexto da sentença.",
        },
        {
          id: "b",
          label:
            "Estáticos ignoram a gramática da frase, enquanto contextuais analisam a sintaxe profunda de cada palavra.",
        },
        {
          id: "c",
          label:
            "Estáticos só funcionam para palavras isoladas, enquanto contextuais só funcionam para frases completas com mais de 10 palavras.",
        },
      ],
      correctOptionId: "a",
      feedback:
        "A diferença central é o contexto: estáticos (Word2Vec, GloVe) dão um vetor fixo por palavra, independentemente do uso. Contextuais (BERT, GPT) geram vetores que mudam conforme a sentença. Opção B confunde semântica com sintaxe — contextuais capturam sentido, não análise gramatical. Opção C é falsa: ambos funcionam para qualquer comprimento de texto.",
    },
    {
      id: "q5",
      prompt: "O que acontece quando mudamos o corpus de treinamento de um embedding?",
      options: [
        {
          id: "a",
          label: "As posições dos vetores mudam — não existe o espaço semântico universal.",
        },
        {
          id: "b",
          label: "As posições permanecem idênticas porque a semântica é universal.",
        },
        {
          id: "c",
          label: "Apenas as dimensões mudam, mas as distâncias relativas se mantêm.",
        },
      ],
      correctOptionId: "a",
      feedback:
        "Embeddings são espelhos dos dados. Mudou o corpus, mudou o mapa. Um modelo treinado em textos médicos captura relações diferentes de um treinado em redes sociais.",
    },
    {
      id: "q6",
      prompt: "Por que busca semântica encontra documentos que busca lexical não encontra?",
      options: [
        {
          id: "a",
          label:
            "Porque compara significados via similaridade entre embeddings, não coincidência de palavras.",
        },
        {
          id: "b",
          label: "Porque usa palavras-chave maiores e mais específicas.",
        },
        {
          id: "c",
          label: "Porque ignora completamente o conteúdo dos documentos.",
        },
      ],
      correctOptionId: "a",
      feedback:
        "Busca semântica encontra vizinhos no espaço vetorial. Documentos com significado próximo mas sem vocabulário compartilhado são recuperados corretamente.",
    },
    {
      id: "q7",
      prompt: "Por que projeções 2D de embeddings podem ser enganosas?",
      options: [
        {
          id: "a",
          label:
            "Porque reduzem centenas de dimensões para 2 com perda de informação. Clusters visuais podem ser artefatos da projeção.",
        },
        {
          id: "b",
          label: "Porque t-SNE sempre separa grupos que deveriam estar juntos.",
        },
        {
          id: "c",
          label: "Porque 2D não é suficiente para representar vetores de qualquer tamanho.",
        },
      ],
      correctOptionId: "a",
      feedback:
        "Redução de dimensionalidade é uma simplificação com perdas. Agrupamentos claros em 2D podem não existir no espaço original de centenas de dimensões.",
    },
    {
      id: "q8",
      prompt: "O que significa dizer que 'embeddings são espelhos'?",
      options: [
        {
          id: "a",
          label:
            "Refletem os padrões e vieses presentes nos dados de treinamento, incluindo preconceitos sociais.",
        },
        {
          id: "b",
          label: "São uma cópia exata da realidade sem distorções.",
        },
        {
          id: "c",
          label: "Só funcionam para textos em espelho (palíndromos).",
        },
      ],
      correctOptionId: "a",
      feedback:
        "Embeddings absorvem vieses dos dados. Associações estereotipadas nos textos de treinamento aparecem como direções no espaço vetorial.",
    },
    {
      id: "q9",
      prompt: "'Quente' e 'frio' ficam próximos em muitos embeddings. Isso significa que são sinônimos?",
      options: [
        {
          id: "a",
          label:
            "Não. Proximidade indica intercambiabilidade contextual, não sinonímia. Antônimos frequentemente co-ocorrem e ficam próximos.",
        },
        {
          id: "b",
          label: "Sim. Se ficam próximos, são semanticamente idênticos.",
        },
        {
          id: "c",
          label: "Isso só acontece em modelos mal treinados.",
        },
      ],
      correctOptionId: "a",
      feedback:
        "Antônimos como 'quente' e 'frio' aparecem nos mesmos contextos (previsão do tempo, receitas) e por isso ficam próximos. Proximidade vetorial indica contexto compartilhado, não equivalência de significado.",
    },
  ],
  glossary: [
    {
      term: "Embedding",
      definition:
        "Representação densa e contínua de um conceito como vetor num espaço de dimensão reduzida, onde proximidade indica similaridade semântica.",
    },
    {
      term: "One-hot encoding",
      definition:
        "Representação esparsa onde cada elemento recebe um vetor com um único valor 1 e zeros no resto. Não captura relações entre elementos.",
    },
    {
      term: "Similaridade de cosseno",
      definition:
        "Medida de similaridade baseada no ângulo entre dois vetores. Varia de −1 (opostos) a 1 (idênticos). Ignora magnitude e foca na direção.",
    },
    {
      term: "Distância euclidiana",
      definition:
        "Comprimento do segmento reto entre as pontas de dois vetores. Depende de direção e magnitude. Não é o padrão para comparar embeddings.",
    },
    {
      term: "Word2Vec",
      definition:
        "Modelo que aprende embeddings densos de palavras otimizando a predição de contexto (skip-gram) ou de palavra central (CBOW). Introduzido por Mikolov et al. em 2013.",
    },
    {
      term: "Skip-gram",
      definition:
        "Arquitetura do Word2Vec que prevê palavras do contexto a partir de uma palavra central. Palavras com contextos similares ficam com vetores próximos.",
    },
    {
      term: "CBOW",
      definition:
        "Continuous Bag of Words: arquitetura do Word2Vec que prevê a palavra central a partir das palavras do contexto.",
    },
    {
      term: "Embedding contextual",
      definition:
        "Representação que varia conforme a sentença. A mesma palavra em contextos diferentes recebe vetores diferentes. Exemplos: BERT, ELMo.",
    },
    {
      term: "Embedding estático",
      definition:
        "Representação fixa por palavra. Um vetor único por palavra, independente do contexto. Exemplos: Word2Vec, GloVe, FastText.",
    },
    {
      term: "Busca semântica",
      definition:
        "Busca por significado usando embeddings. A similaridade entre vetores substitui a coincidência de termos como critério de relevância.",
    },
    {
      term: "Clustering",
      definition:
        "Conjunto de técnicas que agrupa pontos vetoriais por proximidade semântica. K-means é o algoritmo mais comum para embeddings.",
    },
    {
      term: "CLIP",
      definition:
        "Modelo da OpenAI que aprende embeddings multimodais, posicionando textos e imagens no mesmo espaço vetorial para busca cruzada entre modalidades.",
    },
    {
      term: "t-SNE",
      definition:
        "Técnica de redução de dimensionalidade usada para visualizar embeddings em 2D ou 3D. Simplificação com perdas que pode criar artefatos visuais enganosos.",
    },
    {
      term: "Viés semântico",
      definition:
        "Vieses e estereótipos presentes nos dados de treinamento que são absorvidos pelos embeddings e aparecem como relações indesejadas no espaço vetorial.",
    },
    {
      term: "Aprendizado contrastivo",
      definition:
        "Técnica de treinamento que aproxima pares corretos (imagem e legenda correspondente) e afasta pares incorretos no espaço vetorial. É o mecanismo central por trás de embeddings multimodais como o CLIP.",
    },
    {
      term: "Chunking",
      definition:
        "Divisão de documentos longos em trechos menores antes de embedar, para evitar que o significado específico seja diluído na média de um vetor único.",
    },
    {
      term: "HNSW",
      definition:
        "Hierarchical Navigable Small World: algoritmo de índice vetorial que organiza os embeddings numa estrutura hierárquica de grafos, permitindo busca de vizinhos mais próximos em tempo sub-linear mesmo com milhões de vetores.",
    },
    {
      term: "IVF",
      definition:
        "Inverted File Index: técnica de indexação vetorial que divide o espaço em regiões (clusters) e só busca nas regiões mais próximas da query, reduzindo drasticamente o tempo de busca em bancos de dados vetoriais grandes.",
    },
  ],
};
