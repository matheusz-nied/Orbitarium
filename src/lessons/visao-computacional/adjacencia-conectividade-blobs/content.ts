import type { LessonContent } from "../../../types/content";

export const adjacenciaConectividadeBlobsContent: LessonContent = {
  id: "adjacencia-conectividade-blobs",
  title: "Adjacência, Conectividade e Blobs",
  subtitle:
    "Como pixels binários deixam de ser pontos isolados e passam a formar regiões, objetos e componentes conectados.",
  description:
    "Uma aula visual sobre adjacência, vizinhança, conectividade-4, conectividade-8, caminhos conectados, componentes conectados e blobs em imagens binárias.",
  primaryCategoryId: "inteligencia-artificial",
  secondaryCategoryId: "computacao",
  level: "Intermediário",
  estimatedTime: "35-45 min",
  tags: [
    "Visão Computacional",
    "Conectividade",
    "Blobs",
    "Componentes Conectados",
    "Imagem Binária",
    "Segmentação",
  ],
  learningObjectives: [
    "Entender o conceito de adjacência entre pixels em imagens binárias.",
    "Diferenciar conectividade-4 e conectividade-8 e prever seus efeitos.",
    "Compreender caminho conectado, componente conectado e blob.",
    "Explicar por que pixels diagonais podem formar um objeto ou dois dependendo da conectividade escolhida.",
    "Reconhecer casos em que conectividade-4 fragmenta objetos e conectividade-8 une objetos indevidamente.",
    "Preparar a base conceitual para connectedComponentsWithStats e análise de blobs.",
  ],
  prerequisites: [
    "Conhecimento de imagem binária, thresholding e morfologia matemática.",
    "Noção de pixel como célula em uma matriz.",
    "Familiaridade básica com coordenadas de imagem.",
  ],
  references: [
    {
      title: "Digital Image Processing",
      source: "Gonzalez & Woods, 4th Edition — Pearson",
      url: "https://www.imageprocessingplace.com/",
      note:
        "Referência clássica para conectividade, componentes conectados e análise de regiões em imagens digitais.",
    },
    {
      title: "OpenCV Documentation — Structural Analysis and Shape Descriptors",
      source: "OpenCV — Documentação oficial",
      url: "https://docs.opencv.org/4.x/d3/dc0/group__imgproc__shape.html",
      note:
        "Documentação oficial de connectedComponents, connectedComponentsWithStats, contornos e descritores de forma.",
    },
    {
      title: "scikit-image — Measure Region Properties",
      source: "scikit-image — Documentação oficial",
      url: "https://scikit-image.org/docs/stable/api/skimage.measure.html",
      note:
        "Documentação de rotulação e propriedades de regiões, incluindo label e regionprops.",
    },
    {
      title: "Computer Vision: Algorithms and Applications",
      source: "Richard Szeliski, 2nd Edition — Springer",
      url: "https://szeliski.org/Book/",
      note:
        "Livro de referência em visão computacional com fundamentos de segmentação e análise de regiões.",
    },
    {
      title: "Connected-component labeling",
      source: "Rosenfeld & Pfaltz, 1966 — Journal of the ACM",
      url: "https://dl.acm.org/doi/10.1145/321356.321357",
      note:
        "Trabalho clássico sobre algoritmos de rotulação de componentes conectados em imagens digitais.",
    },
  ],
  heroVisual: "conectividade-hero",
  openingText:
    "Depois de binarizar e limpar uma imagem, ainda falta uma pergunta essencial: quais pixels brancos pertencem ao mesmo objeto? Um pixel branco sozinho pode ser ruído; vários pixels brancos próximos podem formar uma moeda, uma célula, uma peça ou uma letra. A conectividade é a regra que transforma pixels em regiões. Sem ela, o computador não sabe onde um objeto começa, termina ou se separa de outro.",
  quickFacts: [
    {
      title: "Adjacência é vizinhança",
      body:
        "Dois pixels são adjacentes quando estão próximos segundo uma regra de vizinhança: horizontal/vertical ou também diagonal.",
    },
    {
      title: "4 vs 8 muda tudo",
      body:
        "Na conectividade-4, diagonais não conectam. Na conectividade-8, diagonais conectam. A mesma imagem pode gerar números diferentes de blobs.",
    },
    {
      title: "Blob é região conectada",
      body:
        "Um blob é um conjunto de pixels de objeto ligados por um caminho conectado. É a unidade que será contada e medida.",
    },
    {
      title: "Escolha é semântica",
      body:
        "A conectividade correta depende do problema: separar objetos encostados ou preservar formas diagonais contínuas.",
    },
  ],
  sections: [
    {
      id: "pixels-viram-objetos",
      eyebrow: "Motivação",
      title: "Como pixels viram objetos?",
      lead:
        "Uma imagem binária só diz quais pixels são objeto. Conectividade decide quais desses pixels pertencem ao mesmo objeto.",
      visual: "pixels-viram-objetos",
      paragraphs: [
        "Depois do thresholding, temos uma matriz de zeros e uns. Isso ainda não é uma lista de objetos. Para contar moedas, medir células ou localizar peças, precisamos agrupar pixels brancos que formam regiões coerentes.",
        "A pergunta central é local: este pixel branco está ligado a quais outros pixels brancos? Repetindo essa pergunta pela imagem inteira, o algoritmo descobre regiões conectadas. Cada região é um candidato a objeto.",
        "Essa etapa é a ponte entre segmentação e descrição. Antes dela, temos pixels; depois dela, temos blobs com área, bounding box, centroide e outras features.",
      ],
      blocks: [
        {
          type: "insight",
          title: "Conectividade dá identidade ao objeto",
          body:
            "Sem conectividade, pixels brancos são apenas pontos. Com conectividade, eles viram regiões que podem ser contadas, medidas e classificadas.",
        },
        {
          type: "mistake",
          title: "Achar que todo pixel branco é um objeto",
          body:
            "Um objeto geralmente é um conjunto de pixels conectados. Um pixel branco isolado pode ser só ruído, não uma entidade real.",
        },
      ],
    },
    {
      id: "adjacencia-vizinhanca",
      eyebrow: "Fundamento",
      title: "Adjacência e vizinhança",
      lead:
        "Adjacência define quais posições ao redor de um pixel contam como vizinhas. Essa regra é a base da conectividade.",
      visual: "adjacencia-vizinhanca",
      paragraphs: [
        "Em uma grade de pixels, cada pixel pode ter vizinhos acima, abaixo, à esquerda, à direita e nas diagonais. Mas nem toda aplicação considera todos esses vizinhos como conexão válida.",
        "A vizinhança-4 inclui apenas os quatro vizinhos ortogonais: cima, baixo, esquerda e direita. A vizinhança-8 inclui também as quatro diagonais. Essa diferença parece pequena, mas muda completamente a quantidade de componentes conectados.",
        "Adjacência é uma relação local. Conectividade é o resultado global de encadear várias adjacências. Se A toca B e B toca C, então A pode estar conectado a C por um caminho.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Adjacência",
          body:
            "Relação local que indica se dois pixels são considerados vizinhos conectáveis segundo uma regra de vizinhança.",
        },
        {
          type: "definition",
          title: "Vizinhança",
          body:
            "Conjunto de posições ao redor de um pixel central que podem ser consideradas na análise local: normalmente 4 ou 8 vizinhos.",
        },
        {
          type: "example",
          title: "Vizinhos de P",
          body:
            "Na conectividade-4, apenas N, S, L e O contam. Na conectividade-8, diagonais também contam.",
          items: [
            "4-vizinhos: cima, baixo, esquerda, direita",
            "8-vizinhos: os 4-vizinhos + diagonais",
          ],
        },
      ],
    },
    {
      id: "conectividade-4",
      eyebrow: "Regra 1",
      title: "Conectividade-4: só horizontal e vertical",
      lead:
        "Na conectividade-4, pixels diagonais não se tocam. Isso separa regiões ligadas apenas por cantos.",
      visual: "conectividade-4-visual",
      interactive: "conectividade-grid",
      paragraphs: [
        "Conectividade-4 é mais restritiva. Um pixel só se conecta aos vizinhos de cima, baixo, esquerda e direita. Se dois pixels se encostam apenas pela diagonal, eles são considerados separados.",
        "Essa regra é útil quando contatos diagonais são provavelmente ruído ou quando você quer evitar unir objetos que estão muito próximos, mas não deveriam formar um único objeto.",
        "A desvantagem é que objetos com formas diagonais podem ficar fragmentados. Uma linha diagonal perfeita, por exemplo, vira vários componentes separados em conectividade-4.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Conectividade-4",
          body:
            "Regra em que um pixel só está conectado aos vizinhos horizontal e verticalmente adjacentes. Diagonais não conectam.",
        },
        {
          type: "insight",
          title: "Conectividade-4 evita pontes diagonais",
          body:
            "Ela é conservadora: prefere separar regiões em dúvida em vez de unir por um contato mínimo no canto.",
        },
        {
          type: "mistake",
          title: "Usar conectividade-4 em formas diagonais",
          body:
            "Linhas e bordas diagonais podem se fragmentar em vários blobs, mesmo parecendo contínuas para humanos.",
        },
      ],
    },
    {
      id: "conectividade-8",
      eyebrow: "Regra 2",
      title: "Conectividade-8: diagonais também conectam",
      lead:
        "Na conectividade-8, qualquer vizinho ao redor do pixel pode criar conexão, incluindo diagonais.",
      visual: "conectividade-8-visual",
      paragraphs: [
        "Conectividade-8 é mais permissiva. Ela considera todos os oito vizinhos ao redor do pixel central. Se dois pixels se tocam por um canto, já podem fazer parte do mesmo componente.",
        "Essa regra preserva melhor formas diagonais e objetos com contornos inclinados. Para muitos objetos naturais, conectividade-8 corresponde melhor à percepção humana de continuidade visual.",
        "A desvantagem é que ruídos diagonais ou objetos muito próximos podem ser unidos indevidamente. Um único pixel diagonal pode virar uma ponte entre dois componentes que deveriam permanecer separados.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Conectividade-8",
          body:
            "Regra em que um pixel se conecta a todos os oito vizinhos ao redor: horizontal, vertical e diagonal.",
        },
        {
          type: "insight",
          title: "Conectividade-8 preserva continuidade diagonal",
          body:
            "Ela costuma representar melhor formas inclinadas e contornos naturais, mas pode unir objetos próximos por contatos mínimos.",
        },
        {
          type: "mistake",
          title: "Ignorar pontes diagonais falsas",
          body:
            "Um ruído diagonal pode unir dois objetos em conectividade-8. Morfologia ou conectividade-4 podem ser melhores nesse caso.",
        },
      ],
    },
    {
      id: "caminho-conectado",
      eyebrow: "Raciocínio",
      title: "Caminho conectado: de pixel em pixel até formar uma região",
      lead:
        "Dois pixels pertencem ao mesmo componente se existe uma sequência de pixels adjacentes ligando um ao outro.",
      visual: "caminho-conectado-visual",
      interactive: "caminho-conectado-demo",
      paragraphs: [
        "Conectividade não exige que dois pixels estejam diretamente lado a lado. Eles podem estar ligados por uma cadeia de pixels intermediários. Essa cadeia é chamada de caminho conectado.",
        "Se um pixel A está adjacente a B, B está adjacente a C, e C está adjacente a D, então A e D pertencem ao mesmo componente, mesmo que estejam distantes na matriz.",
        "Essa ideia explica como blobs extensos são descobertos: o algoritmo começa em um pixel ainda não rotulado e visita todos os pixels alcançáveis por caminhos conectados.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Caminho conectado",
          body:
            "Sequência de pixels de objeto em que cada pixel é adjacente ao próximo segundo a conectividade escolhida.",
        },
        {
          type: "example",
          title: "Cadeia de conexão",
          body:
            "A não precisa tocar D diretamente. Basta existir uma sequência A → B → C → D de pixels conectados.",
        },
        {
          type: "insight",
          title: "Conectividade é transitiva pelo caminho",
          body:
            "A ligação entre pixels próximos se propaga. É isso que transforma decisões locais em regiões globais.",
        },
      ],
    },
    {
      id: "componente-conectado",
      eyebrow: "Objeto computacional",
      title: "Componente conectado e blob",
      lead:
        "Um componente conectado é um conjunto máximo de pixels de objeto ligados por caminhos conectados. Na prática, chamamos essa região de blob.",
      visual: "blob-visual",
      paragraphs: [
        "Um componente conectado não é qualquer conjunto de pixels ligados; é o maior conjunto possível dentro daquela região. Se ainda existe um pixel de objeto alcançável por caminho conectado, ele deve fazer parte do mesmo componente.",
        "Em visão computacional aplicada, frequentemente usamos o termo blob para essa região. Um blob pode representar uma moeda, uma célula, uma peça industrial, uma letra ou uma área segmentada qualquer.",
        "Depois que os blobs são identificados, podemos medir propriedades: área, bounding box, centroide, largura, altura, perímetro e descritores de forma. Por isso conectividade é a base da análise quantitativa.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Componente conectado",
          body:
            "Conjunto máximo de pixels de objeto em que qualquer pixel pode alcançar qualquer outro por um caminho conectado.",
        },
        {
          type: "definition",
          title: "Blob",
          body:
            "Nome prático para uma região conectada em uma imagem binária. Normalmente corresponde a um objeto candidato.",
        },
        {
          type: "insight",
          title: "Blob é a unidade de medida",
          body:
            "Pixels são unidades de imagem; blobs são unidades de análise. É no blob que calculamos área, centroide e bounding box.",
        },
      ],
    },
    {
      id: "comparando-4-e-8",
      eyebrow: "Comparação",
      title: "A mesma imagem pode ter respostas diferentes",
      lead:
        "Conectividade-4 e conectividade-8 podem produzir números diferentes de blobs na mesma imagem binária.",
      visual: "comparando-4-8",
      interactive: "comparador-4-8",
      paragraphs: [
        "O caso clássico é uma diagonal de pixels brancos. Visualmente, humanos tendem a perceber uma linha contínua. Em conectividade-4, cada pixel diagonal pode virar um componente separado. Em conectividade-8, todos formam um único componente.",
        "Outro caso importante é quando dois objetos quase se tocam por uma diagonal. Conectividade-8 pode uni-los; conectividade-4 pode separá-los. Qual está correto? Depende da semântica da cena.",
        "Por isso, relatórios e notebooks devem sempre informar qual conectividade foi usada. Sem essa informação, o número de blobs, áreas e estatísticas podem parecer contraditórios.",
      ],
      blocks: [
        {
          type: "example",
          title: "Diagonais mudam a contagem",
          body:
            "Uma sequência diagonal de 5 pixels pode produzir 5 blobs com conectividade-4 e 1 blob com conectividade-8.",
        },
        {
          type: "insight",
          title: "A conectividade faz parte do método",
          body:
            "Não é detalhe de implementação. É uma escolha que altera os resultados e precisa ser documentada.",
        },
        {
          type: "mistake",
          title: "Comparar resultados sem fixar conectividade",
          body:
            "Se um teste usa conectividade-4 e outro usa 8, a diferença de blobs pode vir da regra, não da segmentação.",
        },
      ],
    },
    {
      id: "escolha-da-conectividade",
      eyebrow: "Decisão prática",
      title: "Como escolher entre conectividade-4 e 8",
      lead:
        "A regra correta depende do tipo de objeto, do ruído e do que uma diagonal significa no seu problema.",
      visual: "escolha-conectividade",
      paragraphs: [
        "Use conectividade-4 quando diagonais frágeis provavelmente são contato acidental, ruído ou objetos diferentes quase encostando. Ela é útil para evitar união indevida de componentes.",
        "Use conectividade-8 quando diagonais representam continuidade real da forma: letras inclinadas, bordas oblíquas, objetos naturais e regiões que humanos percebem como contínuas.",
        "A melhor escolha vem de comparação experimental. Rode as duas conectividades, conte blobs, compare áreas e visualize labels coloridos. Depois justifique qual representa melhor a cena real.",
      ],
      blocks: [
        {
          type: "example",
          title: "Regra de bolso",
          body:
            "Conectividade-4 separa mais. Conectividade-8 une mais.",
          items: [
            "Quer evitar fusão? Teste 4.",
            "Quer preservar diagonais? Teste 8.",
            "Quer justificar academicamente? Mostre as duas e discuta.",
          ],
        },
        {
          type: "insight",
          title: "A melhor conectividade é a que representa a cena",
          body:
            "Não existe uma escolha universal. O critério é se o resultado corresponde aos objetos reais que você quer medir.",
        },
      ],
    },
    {
      id: "ponte-para-rotulacao",
      eyebrow: "Próximo passo",
      title: "Da conectividade para a rotulação",
      lead:
        "Depois de definir conectividade, o próximo passo é rotular cada componente com um ID e extrair suas estatísticas.",
      visual: "ponte-rotulacao",
      paragraphs: [
        "A conectividade define a regra. A rotulação aplica essa regra na imagem inteira e atribui um número para cada componente: blob 1, blob 2, blob 3, e assim por diante.",
        "Em OpenCV, a função central é cv2.connectedComponentsWithStats. Ela retorna labels, número de componentes, estatísticas como área e bounding box, e centroides.",
        "Essa próxima etapa transforma a imagem binária em uma tabela de objetos. A partir daí, podemos filtrar ruído por área, desenhar bounding boxes, construir histogramas de tamanhos e comparar conectividade-4 versus 8 quantitativamente.",
      ],
      blocks: [
        {
          type: "example",
          title: "Chamada em OpenCV",
          body:
            "A conectividade aparece explicitamente no parâmetro connectivity.",
          items: [
            "num_labels, labels, stats, centroids = cv2.connectedComponentsWithStats(binary, connectivity=8)",
            "Use connectivity=4 ou connectivity=8 para comparar resultados.",
          ],
        },
        {
          type: "insight",
          title: "Conectividade vira tabela",
          body:
            "Depois da rotulação, cada blob deixa de ser apenas pixels e passa a ter atributos mensuráveis.",
        },
      ],
    },
    {
      id: "quiz-revisao",
      eyebrow: "Revisão",
      title: "Quiz de revisão",
      lead:
        "Teste se você entende adjacência, conectividade-4, conectividade-8, caminhos conectados, componentes e blobs.",
      interactive: "quiz",
      paragraphs: [
        "O objetivo é prever como a escolha de conectividade altera os blobs obtidos numa imagem binária.",
      ],
    },
    {
      id: "glossario-proximos-estudos",
      eyebrow: "Glossário",
      title: "Glossário e próximos estudos",
      lead:
        "Consolide os termos essenciais antes de avançar para rotulação de componentes conectados.",
      interactive: "glossary",
      paragraphs: [
        "Esses conceitos serão usados diretamente em connectedComponentsWithStats, análise de blobs e extração de features.",
      ],
    },
  ],
  summaryCards: [
    {
      title: "Adjacência é local",
      body:
        "Define quais pixels vizinhos contam como contato válido: ortogonais ou também diagonais.",
    },
    {
      title: "Conectividade-4 separa mais",
      body:
        "Considera apenas cima, baixo, esquerda e direita. Diagonais não conectam.",
    },
    {
      title: "Conectividade-8 une mais",
      body:
        "Inclui diagonais. Preserva formas inclinadas, mas pode unir objetos por pontes frágeis.",
    },
    {
      title: "Caminho conecta regiões",
      body:
        "Pixels distantes podem pertencer ao mesmo componente se existe uma cadeia de adjacências entre eles.",
    },
    {
      title: "Blob é objeto candidato",
      body:
        "Um componente conectado vira a unidade de análise para área, centroide, bounding box e classificação.",
    },
    {
      title: "Documente a regra",
      body:
        "Sempre informe se usou conectividade-4 ou 8, porque isso muda a contagem e as medidas.",
    },
  ],
  quiz: [
    {
      id: "q1",
      prompt: "O que a conectividade decide em uma imagem binária?",
      options: [
        { id: "a", label: "Quais pixels de objeto pertencem à mesma região ou blob." },
        { id: "b", label: "Qual threshold deve ser usado para binarizar a imagem." },
        { id: "c", label: "Qual canal RGB tem mais contraste." },
      ],
      correctOptionId: "a",
      feedback:
        "Conectividade agrupa pixels binários em regiões conectadas. Ela define quais pixels formam o mesmo objeto candidato.",
    },
    {
      id: "q2",
      prompt: "Na conectividade-4, quais vizinhos são considerados?",
      options: [
        { id: "a", label: "Cima, baixo, esquerda e direita." },
        { id: "b", label: "Apenas diagonais." },
        { id: "c", label: "Todos os oito vizinhos ao redor do pixel." },
      ],
      correctOptionId: "a",
      feedback:
        "Conectividade-4 considera apenas vizinhos ortogonais. Diagonais não conectam.",
    },
    {
      id: "q3",
      prompt: "O que muda na conectividade-8?",
      options: [
        { id: "a", label: "Diagonais também passam a conectar pixels." },
        { id: "b", label: "A imagem passa a ter oito níveis de cinza." },
        { id: "c", label: "O algoritmo ignora pixels nas bordas." },
      ],
      correctOptionId: "a",
      feedback:
        "Conectividade-8 inclui os quatro vizinhos diagonais, além dos quatro ortogonais.",
    },
    {
      id: "q4",
      prompt: "Uma linha diagonal de pixels brancos tende a virar o quê em conectividade-4?",
      options: [
        { id: "a", label: "Vários componentes separados, porque diagonais não conectam." },
        { id: "b", label: "Sempre um único blob." },
        { id: "c", label: "Uma imagem em escala de cinza." },
      ],
      correctOptionId: "a",
      feedback:
        "Em conectividade-4, pixels que só se encostam pela diagonal não fazem parte do mesmo componente.",
    },
    {
      id: "q5",
      prompt: "O que é um caminho conectado?",
      options: [
        { id: "a", label: "Uma sequência de pixels adjacentes ligando dois pixels de objeto." },
        { id: "b", label: "Uma linha desenhada manualmente no gráfico." },
        { id: "c", label: "A borda externa de um objeto calculada por findContours." },
      ],
      correctOptionId: "a",
      feedback:
        "Caminho conectado é uma sequência de pixels em que cada pixel é adjacente ao próximo segundo a regra escolhida.",
    },
    {
      id: "q6",
      prompt: "Por que conectividade-8 pode ser perigosa em objetos muito próximos?",
      options: [
        { id: "a", label: "Porque uma ponte diagonal pequena pode unir objetos que deveriam ficar separados." },
        { id: "b", label: "Porque ela remove todos os pixels diagonais." },
        { id: "c", label: "Porque só funciona em imagens coloridas." },
      ],
      correctOptionId: "a",
      feedback:
        "Como diagonais conectam, um contato mínimo pode fundir objetos em um único blob.",
    },
    {
      id: "q7",
      prompt: "O que é um componente conectado?",
      options: [
        { id: "a", label: "Um conjunto máximo de pixels de objeto ligados por caminhos conectados." },
        { id: "b", label: "Um pixel isolado obrigatoriamente classificado como ruído." },
        { id: "c", label: "Uma operação morfológica de fechamento." },
      ],
      correctOptionId: "a",
      feedback:
        "Componente conectado é a região completa alcançável por caminhos conectados a partir de um pixel de objeto.",
    },
    {
      id: "q8",
      prompt: "Por que é importante documentar a conectividade usada?",
      options: [
        { id: "a", label: "Porque conectividade-4 e 8 podem produzir contagens e medidas diferentes na mesma imagem." },
        { id: "b", label: "Porque muda a resolução da câmera." },
        { id: "c", label: "Porque substitui a etapa de thresholding." },
      ],
      correctOptionId: "a",
      feedback:
        "A regra de conectividade altera quantos blobs são encontrados e quais pixels entram em cada medida.",
    },
  ],
  glossary: [
    {
      term: "Adjacência",
      definition:
        "Relação local que indica se dois pixels são considerados vizinhos conectáveis segundo uma regra definida.",
    },
    {
      term: "Vizinhança",
      definition:
        "Conjunto de pixels ao redor de um pixel central usados para análise local, normalmente 4 ou 8 vizinhos.",
    },
    {
      term: "Conectividade-4",
      definition:
        "Regra em que apenas vizinhos de cima, baixo, esquerda e direita conectam pixels. Diagonais não conectam.",
    },
    {
      term: "Conectividade-8",
      definition:
        "Regra em que os oito vizinhos ao redor do pixel, incluindo diagonais, podem conectar regiões.",
    },
    {
      term: "Caminho conectado",
      definition:
        "Sequência de pixels de objeto em que cada pixel é adjacente ao próximo segundo a conectividade escolhida.",
    },
    {
      term: "Componente conectado",
      definition:
        "Conjunto máximo de pixels de objeto em que qualquer pixel pode alcançar qualquer outro por um caminho conectado.",
    },
    {
      term: "Blob",
      definition:
        "Região conectada em uma imagem binária, normalmente tratada como objeto candidato para medição e classificação.",
    },
    {
      term: "Label",
      definition:
        "Identificador numérico atribuído a cada componente conectado durante a rotulação.",
    },
    {
      term: "Rotulação",
      definition:
        "Processo de percorrer a imagem e atribuir um ID para cada componente conectado encontrado.",
    },
    {
      term: "connectedComponentsWithStats",
      definition:
        "Função do OpenCV que rotula componentes conectados e retorna estatísticas como área, bounding box e centroide.",
    },
    {
      term: "Ponte diagonal",
      definition:
        "Contato por diagonal que pode unir componentes em conectividade-8, mas não em conectividade-4.",
    },
    {
      term: "Fragmentação",
      definition:
        "Situação em que um objeto visualmente contínuo é dividido em múltiplos componentes por uma regra de conectividade restritiva ou falhas na segmentação.",
    },
  ],
};
