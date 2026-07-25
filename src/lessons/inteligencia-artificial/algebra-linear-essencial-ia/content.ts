import type { LessonContent } from "../../../types/content";

export const algebraLinearEssencialIaContent: LessonContent = {
  id: "algebra-linear-essencial-ia",
  title: "Álgebra Linear Essencial para IA",
  subtitle:
    "Vetores, matrizes, produto escalar e projeções como a gramática geométrica por trás de embeddings, camadas neurais, imagens e similaridade.",
  description:
    "Uma aula visual sobre vetores, matrizes, produto escalar, multiplicação matriz×vetor, espaços e projeção, conectando a intuição geométrica à prática de machine learning.",
  primaryCategoryId: "inteligencia-artificial",
  secondaryCategoryId: "matematica",
  level: "Iniciante",
  estimatedTime: "40-55 min",
  tags: [
    "Álgebra Linear",
    "Vetores",
    "Matrizes",
    "Produto Escalar",
    "Transformações",
    "Embeddings",
    "Machine Learning",
  ],
  learningObjectives: [
    "Entender vetores como objetos que podem representar direção, posição, estado ou lista de características.",
    "Interpretar matrizes como transformações lineares além de tabelas de números.",
    "Compreender o produto escalar como medida de alinhamento e similaridade.",
    "Visualizar a multiplicação matriz×vetor como aplicação de uma transformação sobre um ponto ou direção.",
    "Construir intuição para espaço vetorial, span e combinação linear sem cair em formalismo excessivo.",
    "Entender projeção como extração do componente relevante de um vetor em uma direção escolhida.",
    "Reconhecer onde esses conceitos aparecem em embeddings, redes neurais, regressão e dados tabulares.",
  ],
  prerequisites: [
    "Noção básica de plano cartesiano e pares ordenados.",
    "Conforto com soma e multiplicação de números reais.",
    "Curiosidade sobre como modelos representam dados como listas numéricas.",
    "Não é necessário saber provar teoremas de álgebra linear.",
  ],
  references: [
    {
      title: "Linear Algebra",
      source: "MIT OpenCourseWare",
      url: "https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/",
      note:
        "Curso de Gilbert Strang com forte ênfase em interpretação geométrica e aplicações de matrizes e espaços vetoriais.",
    },
    {
      title: "Linear algebra",
      source: "Khan Academy",
      url: "https://www.khanacademy.org/math/linear-algebra",
      note:
        "Trilha introdutória sobre vetores, espaços, matrizes e transformações lineares.",
    },
    {
      title: "Vector dot product and vector length",
      source: "Khan Academy",
      url: "https://www.khanacademy.org/math/linear-algebra/vectors-and-spaces/dot-cross-products/v/vector-dot-product-and-vector-length",
      note:
        "Material didático sobre produto escalar, magnitude e interpretação geométrica do alinhamento entre vetores.",
    },
    {
      title: "Linear transformations as matrix vector products",
      source: "Khan Academy",
      url: "https://www.khanacademy.org/math/linear-algebra/matrix_transformations/linear_transformations/v/linear-transformations-as-matrix-vector-products",
      note:
        "Mostra como matrizes agem sobre vetores e por que multiplicação matriz×vetor representa transformação.",
    },
    {
      title: "Linear Algebra",
      source: "Deep Learning Book — Goodfellow, Bengio e Courville",
      url: "https://www.deeplearningbook.org/contents/linear_algebra.html",
      note:
        "Capítulo introdutório sobre os conceitos de álgebra linear mais usados em aprendizado profundo.",
    },
  ],
  heroVisual: "algebra-linear-hero",
  openingText:
    "Quando você vê um embedding, um lote de imagens, um conjunto de pesos ou a saída de uma camada neural, você está vendo álgebra linear em ação. O ponto não é decorar contas: é perceber que IA usa vetores para representar informação e matrizes para transformá-la. Álgebra linear é a linguagem geométrica que permite dizer como dados se movem, se alinham, se comprimem e se tornam comparáveis.",
  quickFacts: [
    {
      title: "Vetor pode ser estado",
      body:
        "Um vetor pode representar posição no plano, atributos de um usuário, intensidades de pixels ou um embedding semântico de centenas de dimensões.",
    },
    {
      title: "Matriz é máquina",
      body:
        "Pensar em matriz só como tabela é pouco. Em IA, ela atua como uma máquina que gira, estica, mistura ou projeta vetores.",
    },
    {
      title: "Produto escalar mede alinhamento",
      body:
        "Se dois vetores apontam para direções parecidas, o produto escalar cresce. Se são ortogonais, ele cai para zero.",
    },
    {
      title: "Projeção filtra informação",
      body:
        "Projetar um vetor em uma direção é perguntar quanto dele aponta para aquilo que importa nessa direção.",
    },
  ],
  sections: [
    {
      id: "ia-pensa-em-vetores",
      eyebrow: "Motivação",
      title: "Por que IA enxerga o mundo como vetores e matrizes",
      lead:
        "Modelos precisam representar entradas, parâmetros e saídas numericamente. Vetores e matrizes são a forma mais flexível e escalável de fazer isso.",
      visual: "ia-vetorial",
      paragraphs: [
        "Uma imagem pode ser achatada em uma longa lista de intensidades. Uma frase pode virar um embedding. O histórico de um usuário pode ser representado por dezenas de atributos numéricos. Em todos esses casos, um vetor organiza características em uma estrutura que a máquina consegue manipular sistematicamente.",
        "Já as matrizes entram quando queremos aplicar transformações. Uma camada linear em rede neural pega um vetor de entrada e o transforma em outro vetor. O mesmo raciocínio aparece em regressão, redução de dimensionalidade, sistemas de recomendação e visão computacional.",
        "Por isso, aprender álgebra linear para IA não é estudar algo externo ao campo. É aprender a gramática básica que descreve como representações são armazenadas, comparadas e modificadas.",
      ],
      blocks: [
        {
          type: "insight",
          title: "O dado não é só um número; é uma direção em um espaço",
          body:
            "A ideia de espaço vetorial permite tratar exemplos como pontos ou setas com relações geométricas interpretáveis.",
        },
        {
          type: "example",
          title: "Onde vetores aparecem em IA",
          body:
            "Pesos de um modelo, embeddings de palavras, pixels de uma imagem e features de um usuário podem todos ser tratados como vetores.",
        },
      ],
    },
    {
      id: "vetores-intuicao",
      eyebrow: "Conceito central",
      title: "Vetor é direção, magnitude e também coleção organizada de atributos",
      lead:
        "No plano, um vetor pode ser visto como uma seta. Em dados, ele também pode ser visto como uma lista de valores. As duas leituras são compatíveis e poderosas.",
      visual: "vetores-no-plano",
      interactive: "vector-playground-2d",
      paragraphs: [
        "Geometricamente, um vetor indica para onde ir e quanto andar. O vetor (3, 2), por exemplo, pode ser lido como 'três unidades para a direita e duas para cima'. Isso nos permite somar deslocamentos, comparar direções e medir tamanhos.",
        "Em machine learning, a interpretação como lista de atributos é igualmente útil. Um vetor pode significar [idade, renda, tempo de sessão, número de compras]. Cada coordenada guarda uma dimensão diferente do problema, e o conjunto forma um ponto em um espaço com muitas dimensões.",
        "A sacada importante é que a álgebra é a mesma. Somar vetores combina informação coordenada a coordenada. Escalar um vetor aumenta ou reduz sua magnitude. Essa consistência é o que torna a representação vetorial tão universal.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Vetor",
          body:
            "Objeto matemático com magnitude e direção, ou, de forma equivalente em muitos contextos de dados, uma coleção ordenada de valores numéricos.",
        },
        {
          type: "mistake",
          title: "Pensar que vetor é apenas seta desenhada",
          body:
            "A visualização como seta ajuda em 2D e 3D, mas em IA vetores normalmente vivem em dezenas ou milhares de dimensões.",
        },
      ],
    },
    {
      id: "matrizes-como-transformacoes",
      eyebrow: "Aprofundamento",
      title: "Matrizes valem mais quando você as vê como transformações",
      lead:
        "Uma matriz pode girar, esticar, comprimir ou misturar coordenadas. Esse é o ponto de vista mais útil para IA.",
      visual: "matriz-transformacao",
      paragraphs: [
        "É tentador pensar em matriz apenas como uma tabela retangular de números. Mas o ganho conceitual real aparece quando percebemos que ela define uma regra: dado um vetor de entrada, como produzir um vetor de saída? Essa regra pode preservar linhas, deformar escalas e alterar orientações de forma estruturada.",
        "No plano, algumas matrizes giram a figura; outras ampliam mais um eixo que outro; outras refletem pontos. Em redes neurais, essa noção vira algo extremamente prático: cada camada linear aprende uma transformação que reorganiza a representação do dado para a tarefa desejada.",
        "O benefício dessa leitura é enorme. Em vez de decorar contas de multiplicação, você passa a perguntar: o que esta matriz faz com o espaço? Esse tipo de pergunta geométrica costuma explicar melhor o comportamento do modelo.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Matriz",
          body:
            "Estrutura retangular de números que, entre muitas interpretações, pode representar uma transformação linear aplicada a vetores.",
        },
        {
          type: "insight",
          title: "Camada linear = transformação aprendida",
          body:
            "Em muitos modelos, treinar significa justamente ajustar uma matriz para transformar melhor os vetores de entrada.",
        },
      ],
    },
    {
      id: "matriz-vezes-vetor",
      eyebrow: "Operação-chave",
      title: "Multiplicar matriz por vetor é fazer o espaço agir sobre um ponto",
      lead:
        "A conta de matriz×vetor é a forma concreta pela qual uma transformação entra em ação.",
      visual: "produto-matriz-vetor",
      interactive: "matrix-vector-machine",
      paragraphs: [
        "Quando multiplicamos uma matriz por um vetor, produzimos um novo vetor cujas coordenadas são combinações lineares das coordenadas originais. Isso parece técnico, mas a leitura geométrica é simples: pegamos um ponto ou direção e vemos como ele muda sob a transformação definida pela matriz.",
        "Na prática, cada linha da matriz coleta informação do vetor de entrada com pesos diferentes. Em IA, isso é exatamente o que acontece quando uma camada linear mistura features para construir novas representações mais úteis para classificação, regressão ou compressão.",
        "A boa intuição aqui é dupla: a operação é algébrica por dentro e geométrica por fora. Contas e desenho contam a mesma história sob duas linguagens complementares.",
      ],
      blocks: [
        {
          type: "example",
          title: "Misturar duas features",
          body:
            "Uma matriz 2×2 pode transformar [x, y] em novas coordenadas que misturam x e y. Isso já basta para visualizar a essência de uma camada linear pequena.",
        },
        {
          type: "mistake",
          title: "Ver a multiplicação como ritual mecânico",
          body:
            "Se você só acompanha a regra linha vezes coluna, perde o sentido principal: a matriz está remodelando o espaço do vetor.",
        },
      ],
    },
    {
      id: "produto-escalar",
      eyebrow: "Comparação",
      title: "Produto escalar mede alinhamento, similaridade e resposta em uma direção",
      lead:
        "O produto escalar diz, em essência, quanto um vetor 'anda junto' com outro. Em IA, isso aparece em ranking, busca semântica e atenção.",
      visual: "produto-escalar-similaridade",
      interactive: "dot-product-similarity-lab",
      paragraphs: [
        "Se dois vetores apontam em direções parecidas, o produto escalar cresce. Se estão ortogonais, ele zera. Se apontam em sentidos opostos, ele pode ficar negativo. Essa leitura geométrica faz do produto escalar uma ferramenta natural para medir compatibilidade ou afinidade entre representações.",
        "Em embeddings, por exemplo, queremos que itens semanticamente próximos tenham alinhamento maior. Em mecanismos de atenção, consultas e chaves são comparadas por produtos escalares para medir relevância. Em regressão linear, projeções sobre direções específicas ajudam a decompor a explicação do dado.",
        "O valor bruto do produto escalar mistura alinhamento e magnitude. Por isso, às vezes usamos similaridade de cosseno, que normaliza o tamanho. Mesmo assim, a intuição-base continua sendo a mesma: alinhamento importa.",
      ],
      blocks: [
        {
          type: "formula",
          title: "Produto escalar em 2D",
          body:
            "A soma coordenada a coordenada equivale geometricamente ao produto das magnitudes pelo cosseno do ângulo entre os vetores.",
          formula: "a · b = a1b1 + a2b2 = ||a|| ||b|| cos(theta)",
        },
        {
          type: "insight",
          title: "Semelhança pode ser vista como alinhamento",
          body:
            "Essa é uma das pontes mais úteis entre geometria e IA: duas representações semelhantes tendem a apontar para regiões parecidas do espaço.",
        },
      ],
    },
    {
      id: "espacos-e-span",
      eyebrow: "Estrutura",
      title: "Espaço vetorial e span: o conjunto de coisas que você consegue construir",
      lead:
        "Combinações lineares dizem quais vetores podem ser produzidos a partir de outros. Essa ideia é o coração do span e da noção de espaço gerado.",
      visual: "espacos-span",
      paragraphs: [
        "Se você tem dois vetores não paralelos no plano, consegue combiná-los para alcançar qualquer ponto do plano. Se eles forem paralelos, só alcança uma reta. Esse raciocínio intuitivo já revela o que significa span: o conjunto de todos os vetores obtidos por combinações lineares dos vetores disponíveis.",
        "Em IA, isso ajuda a pensar sobre capacidade representacional. Uma transformação pode expandir, comprimir ou restringir os vetores a certos subespaços. Técnicas como PCA e autoencoders, em níveis diferentes, conversam com essa ideia de encontrar direções mais informativas e descartar redundâncias.",
        "A noção de espaço não precisa assustar no começo. Ela é apenas uma forma organizada de perguntar: com essas direções básicas, até onde eu consigo ir?",
      ],
      blocks: [
        {
          type: "definition",
          title: "Span",
          body:
            "Conjunto de todos os vetores que podem ser obtidos por combinações lineares de um conjunto dado de vetores.",
        },
        {
          type: "example",
          title: "Dois vetores paralelos",
          body:
            "Se ambos apontam para a mesma direção, variar os coeficientes só alonga ou encurta essa mesma linha. O plano inteiro continua inacessível.",
        },
      ],
    },
    {
      id: "projecao-intuitiva",
      eyebrow: "Filtro geométrico",
      title: "Projeção é a sombra útil de um vetor em uma direção escolhida",
      lead:
        "Projetar é medir quanto de um vetor está alinhado a um eixo de interesse. Isso simplifica, resume e destaca a parte relevante da informação.",
      visual: "projecao-intuicao",
      paragraphs: [
        "Imagine uma lanterna jogando a sombra de uma seta sobre uma reta. Essa sombra é a projeção. Em termos geométricos, estamos extraindo o componente do vetor na direção escolhida. Em termos de dados, estamos medindo quanto um exemplo carrega de uma característica específica.",
        "Essa ideia aparece em decomposições, PCA, regressão e representação de sinal. Projetar não destrói necessariamente a informação de forma arbitrária; muitas vezes, ele isola justamente o componente que mais interessa para análise ou decisão.",
        "A intuição mais importante é não confundir projeção com simples descarte. Uma boa projeção é uma forma de resumir preservando a pergunta certa.",
      ],
      blocks: [
        {
          type: "formula",
          title: "Forma conceitual da projeção",
          body:
            "Projetamos um vetor sobre uma direção usando o produto escalar com um vetor-base adequado e reconstruindo o componente alinhado.",
          formula: "proj_u(v) = (v · u / u · u) u",
        },
        {
          type: "mistake",
          title: "Achar que projeção sempre significa perda inútil",
          body:
            "Projetar pode reduzir dimensão, mas faz isso de maneira orientada por direção. O ponto não é jogar fora ao acaso; é destacar o que importa naquela leitura.",
        },
      ],
    },
    {
      id: "algebra-linear-no-ml",
      eyebrow: "Conexão com prática",
      title: "Onde tudo isso aparece no machine learning real",
      lead:
        "Embeddings, camadas lineares, atenção, redução de dimensionalidade e comparação semântica dependem diretamente dessas operações.",
      visual: "algebra-no-ml",
      paragraphs: [
        "Quando um modelo transforma um embedding em outro, há matrizes agindo sobre vetores. Quando mede semelhança entre itens, produto escalar ou cosseno entram em cena. Quando projeta dados para dimensões mais úteis, a linguagem é de subespaços e projeções. Não são capítulos separados: são manifestações da mesma estrutura.",
        "Essa unificação é uma das grandes vantagens da álgebra linear. Uma vez que você entende vetores como representações e matrizes como transformações, muitas arquiteturas deixam de parecer uma coleção arbitrária de blocos e começam a revelar um fio condutor geométrico.",
        "O objetivo desta aula não é esgotar o tema, mas deixar uma base sólida para que embeddings, atenção, PCA, redes neurais e otimização façam mais sentido nas próximas etapas do estudo.",
      ],
      blocks: [
        {
          type: "example",
          title: "Transformer em linguagem geométrica",
          body:
            "Tokens viram vetores, matrizes aprendidas criam queries/keys/values, e produtos escalares medem alinhamento entre representações.",
        },
        {
          type: "insight",
          title: "A mesma álgebra reaparece em toda parte",
          body:
            "Muda o domínio do problema, mas a lógica de representar, transformar, alinhar e projetar vetores continua a mesma.",
        },
      ],
    },
    {
      id: "quiz-revisao",
      eyebrow: "Revisão",
      title: "Quiz de revisão",
      lead:
        "Teste se a intuição geométrica ficou firme: vetores, matrizes, produto escalar, span e projeção.",
      interactive: "quiz",
      paragraphs: [
        "Use o quiz para verificar se você está vendo operações como ideias geométricas e não apenas como contas mecânicas.",
      ],
    },
    {
      id: "glossario-proximos-estudos",
      eyebrow: "Fechamento",
      title: "Glossário e próximos estudos",
      lead:
        "Feche a aula consolidando o vocabulário que reaparece em praticamente todo curso sério de IA moderna.",
      interactive: "glossary",
      paragraphs: [
        "Com esse repertório, temas como embeddings, atenção, PCA, SVD e redes neurais ficam muito mais navegáveis.",
      ],
    },
  ],
  summaryCards: [
    {
      title: "Vetores representam informação",
      body:
        "Eles podem ser setas geométricas ou coleções de atributos em alta dimensão.",
    },
    {
      title: "Matrizes transformam espaços",
      body:
        "Mais do que tabelas, elas agem como regras que remodelam vetores.",
    },
    {
      title: "Produto escalar mede alinhamento",
      body:
        "Essa é uma ponte direta entre geometria e similaridade em IA.",
    },
    {
      title: "Span responde 'até onde eu chego?'",
      body:
        "Combinações lineares revelam o subespaço gerado por um conjunto de vetores.",
    },
    {
      title: "Projeção extrai componente relevante",
      body:
        "Projetar é medir quanto de um vetor aponta para uma direção escolhida.",
    },
    {
      title: "IA moderna é profundamente linear",
      body:
        "Mesmo modelos sofisticados ainda dependem dessa base vetorial para representar e transformar dados.",
    },
  ],
  quiz: [
    {
      id: "q1",
      prompt: "Qual leitura de vetor é mais útil em IA?",
      options: [
        { id: "a", label: "Apenas seta no plano 2D." },
        { id: "b", label: "Objeto que pode representar direção e também coleção ordenada de atributos." },
        { id: "c", label: "Tabela de números com várias linhas." },
      ],
      correctOptionId: "b",
      feedback:
        "Em IA, a interpretação de vetor como lista de atributos é tão importante quanto a interpretação geométrica como direção.",
    },
    {
      id: "q2",
      prompt: "Qual é a visão mais poderosa de uma matriz nesta aula?",
      options: [
        { id: "a", label: "Uma lista estática de números sem comportamento." },
        { id: "b", label: "Uma transformação que age sobre vetores." },
        { id: "c", label: "Apenas um jeito alternativo de guardar dados em tabela." },
      ],
      correctOptionId: "b",
      feedback:
        "Pensar em matriz como transformação revela seu papel real em camadas lineares, projeções e deformações do espaço.",
    },
    {
      id: "q3",
      prompt: "Se dois vetores são ortogonais, o que acontece com o produto escalar entre eles?",
      options: [
        { id: "a", label: "Ele tende a zero." },
        { id: "b", label: "Ele fica máximo." },
        { id: "c", label: "Ele sempre fica negativo." },
      ],
      correctOptionId: "a",
      feedback:
        "Ortogonalidade significa ausência de alinhamento naquela direção, por isso o produto escalar zera.",
    },
    {
      id: "q4",
      prompt: "O que a multiplicação matriz×vetor faz conceitualmente?",
      options: [
        { id: "a", label: "Aplica uma transformação ao vetor de entrada." },
        { id: "b", label: "Converte o vetor em escalar automaticamente." },
        { id: "c", label: "Sempre preserva direção e magnitude originais." },
      ],
      correctOptionId: "a",
      feedback:
        "A matriz age sobre o vetor e produz uma nova representação, possivelmente girada, escalada ou misturada.",
    },
    {
      id: "q5",
      prompt: "O span de dois vetores paralelos no plano tende a ser:",
      options: [
        { id: "a", label: "O plano inteiro." },
        { id: "b", label: "Uma reta." },
        { id: "c", label: "Um ponto apenas, sempre." },
      ],
      correctOptionId: "b",
      feedback:
        "Vetores paralelos não criam uma nova direção independente, então seu span continua preso a uma linha.",
    },
    {
      id: "q6",
      prompt: "Qual ideia descreve melhor uma projeção?",
      options: [
        { id: "a", label: "Medir o componente de um vetor em uma direção escolhida." },
        { id: "b", label: "Eliminar completamente a informação de um vetor." },
        { id: "c", label: "Trocar o vetor por uma matriz quadrada." },
      ],
      correctOptionId: "a",
      feedback:
        "A projeção extrai a parte do vetor alinhada a uma direção. É como uma sombra geométrica orientada.",
    },
    {
      id: "q7",
      prompt: "Por que produto escalar aparece tanto em embeddings e atenção?",
      options: [
        { id: "a", label: "Porque mede alinhamento ou compatibilidade entre representações." },
        { id: "b", label: "Porque sempre normaliza automaticamente os vetores." },
        { id: "c", label: "Porque substitui qualquer necessidade de treinar matrizes." },
      ],
      correctOptionId: "a",
      feedback:
        "Produto escalar oferece um jeito direto de comparar vetores. Por isso ele é tão útil em busca semântica e atenção.",
    },
    {
      id: "q8",
      prompt: "Qual é um erro comum de iniciante em álgebra linear para IA?",
      options: [
        { id: "a", label: "Interpretar operações apenas como receitas de conta e não como transformações ou relações geométricas." },
        { id: "b", label: "Usar vetores para representar embeddings." },
        { id: "c", label: "Comparar alinhamento entre representações." },
      ],
      correctOptionId: "a",
      feedback:
        "A álgebra linear fica muito mais clara quando cada conta é ligada a uma ideia geométrica ou representacional.",
    },
  ],
  glossary: [
    {
      term: "Vetor",
      definition:
        "Objeto com direção e magnitude, ou, em dados, coleção ordenada de valores numéricos que representa um exemplo, estado ou embedding.",
    },
    {
      term: "Magnitude",
      definition:
        "Tamanho ou norma de um vetor.",
    },
    {
      term: "Matriz",
      definition:
        "Estrutura retangular de números que pode representar uma transformação linear aplicada a vetores.",
    },
    {
      term: "Transformação linear",
      definition:
        "Regra que leva vetores a outros vetores preservando soma e multiplicação por escalar.",
    },
    {
      term: "Produto escalar",
      definition:
        "Operação que combina dois vetores e produz um escalar relacionado ao alinhamento entre eles.",
    },
    {
      term: "Ortogonalidade",
      definition:
        "Relação entre vetores perpendiculares, com produto escalar igual a zero.",
    },
    {
      term: "Combinação linear",
      definition:
        "Soma de vetores multiplicados por coeficientes escalares.",
    },
    {
      term: "Span",
      definition:
        "Conjunto de todos os vetores que podem ser gerados por combinações lineares de um conjunto dado.",
    },
    {
      term: "Subespaço",
      definition:
        "Parte de um espaço vetorial que continua obedecendo às regras desse espaço e é fechada por combinações lineares.",
    },
    {
      term: "Projeção",
      definition:
        "Componente de um vetor alinhado a uma direção ou subespaço escolhido.",
    },
    {
      term: "Embedding",
      definition:
        "Representação vetorial densa de um item, como palavra, imagem ou usuário, em um espaço de características.",
    },
  ],
};

