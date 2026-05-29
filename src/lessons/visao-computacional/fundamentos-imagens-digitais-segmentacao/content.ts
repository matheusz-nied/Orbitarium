import type { LessonContent } from "../../../types/content";

export const fundamentosImagensDigitaisSegmentacaoContent: LessonContent = {
  id: "fundamentos-imagens-digitais-segmentacao",
  title: "Fundamentos de Imagens Digitais para Segmentação",
  subtitle:
    "Pixels, matrizes e a base de tudo que a visão computacional constrói: antes de detectar, classificar ou medir, é preciso entender como o computador representa uma imagem.",
  description:
    "Uma aula visual sobre imagens digitais como matrizes, pixels, coordenadas, canais RGB, escala de cinza, intensidade, contraste, ruído, resolução e imagem binária como ponto de partida para segmentação.",
  primaryCategoryId: "inteligencia-artificial",
  secondaryCategoryId: "computacao",
  level: "Iniciante",
  estimatedTime: "35-45 min",
  tags: [
    "Visão Computacional",
    "Imagens Digitais",
    "Segmentação",
    "Pixels",
    "OpenCV",
    "Escala de Cinza",
    "Thresholding",
  ],
  learningObjectives: [
    "Entender que uma imagem digital é uma matriz numérica e por que isso importa para segmentação.",
    "Dominar o conceito de pixel, coordenadas e intensidade em escala de cinza.",
    "Compreender canais RGB e sua conversão para escala de cinza usando a fórmula ponderada.",
    "Entender como contraste e ruído afetam a separação objeto/fundo.",
    "Compreender o que é uma imagem binária e por que ela é o ponto de partida para detectar objetos.",
    "Aplicar o conceito de threshold simples para converter uma imagem em escala de cinza em imagem binária.",
  ],
  prerequisites: [
    "Curiosidade sobre como computadores 'veem' imagens.",
    "Noção básica de matrizes (linhas e colunas).",
    "Familiaridade com programação em Python é útil, mas não obrigatória.",
  ],
  references: [
    {
      title: "Digital Image Processing",
      source: "Gonzalez & Woods, 4th Edition — Pearson",
      url: "https://www.imageprocessingplace.com/",
      note:
        "Livro clássico de processamento de imagens digitais. Cobre fundamentos de imagem, histogramas, thresholding e segmentação.",
    },
    {
      title: "OpenCV Documentation — Image Processing",
      source: "OpenCV — Documentação oficial",
      url: "https://docs.opencv.org/4.x/d7/dbd/group__imgproc.html",
      note:
        "Documentação oficial do OpenCV para processamento de imagens, incluindo conversão de cores, thresholding e operações morfológicas.",
    },
    {
      title: "NumPy Documentation — Array Indexing",
      source: "NumPy — Documentação oficial",
      url: "https://numpy.org/doc/stable/reference/arrays.indexing.html",
      note:
        "Documentação sobre indexação de arrays em NumPy, essencial para acessar pixels e regiões de imagens.",
    },
    {
      title: "Computer Vision: Algorithms and Applications",
      source: "Richard Szeliski, 2nd Edition — Springer",
      url: "https://szeliski.org/Book/",
      note:
        "Livro completo sobre visão computacional, cobrindo desde fundamentos de imagem até técnicas avançadas de segmentação e reconhecimento.",
    },
    {
      title: "NASA Earth Observatory — False Color Images",
      source: "NASA — Earth Observatory",
      url: "https://earthobservatory.nasa.gov/features/FalseColor",
      note:
        "Exemplo prático de como imagens multiespectrais são processadas e convertidas em representações visuais úteis.",
    },
    {
      title: "Scikit-image Documentation — Thresholding",
      source: "scikit-image — Documentação oficial",
      url: "https://scikit-image.org/docs/stable/api/skimage.filters.html",
      note:
        "Documentação sobre técnicas de thresholding em Python, incluindo Otsu e thresholding adaptativo.",
    },
  ],
  heroVisual: "fundamentos-hero",
  openingText:
    "Em 1997, a sonda Mars Pathfinder enviou fotos de Marte. Para analisar o solo marciano, os cientistas precisaram converter essas imagens em números — cada pixel era uma medida de refletância luminosa. Sem entender como uma imagem vira matriz, não há segmentação, não há detecção, não há visão computacional. Quando você olha uma foto, vê formas, cores, objetos. O computador vê apenas uma tabela de números. A primeira tarefa da visão computacional é traduzir essa tabela em informação útil — e a segmentação é o passo que separa 'o que importa' do 'resto'.",
  quickFacts: [
    {
      title: "Imagem é matriz",
      body:
        "Uma foto de 1920×1080 é uma matriz com 2.073.600 valores. Cada posição guarda um número que representa a intensidade luminosa daquele ponto.",
    },
    {
      title: "Pixel é o átomo",
      body:
        "O pixel é a menor unidade de informação visual. Ele tem uma posição [linha, coluna] e um valor entre 0 (preto) e 255 (branco) em escala de cinza.",
    },
    {
      title: "RGB são 3 imagens",
      body:
        "Uma imagem colorida é três matrizes empilhadas: vermelho, verde e azul. Cada canal é uma imagem em escala de cinza independente.",
    },
    {
      title: "Binarização é o portal",
      body:
        "Uma imagem binária tem apenas dois valores: 0 (fundo) e 255 (objeto). É o formato de entrada para detectar componentes, contornos e features.",
    },
  ],
  sections: [
    {
      id: "motivacao",
      eyebrow: "Motivação",
      title: "Por que um computador precisa aprender a ver?",
      lead:
        "Antes de segmentar, classificar ou detectar qualquer coisa, precisamos entender como o computador representa uma imagem. Um computador não 'vê' uma foto — ele lê números.",
      visual: "motivacao-hero",
      paragraphs: [
        "Médicos precisam detectar tumores em radiografias. Carros autônomos precisam identificar pedestres. Robôs precisam reconhecer peças em fábricas. Todos esses problemas começam da mesma forma: uma imagem que precisa ser entendida numericamente.",
        "Quando você olha uma foto, vê formas, cores, objetos. O computador vê apenas uma tabela de números. A primeira tarefa da visão computacional é traduzir essa tabela em informação útil — e a segmentação é o passo que separa 'o que importa' do 'resto'.",
        "Sem segmentação, não há como detectar objetos, medir áreas, contar componentes ou classificar formas. Tudo começa aqui: entender que uma imagem é uma matriz, e que cada número nessa matriz carrega informação sobre a cena.",
      ],
      blocks: [
        {
          type: "insight",
          title: "A Mars Pathfinder usou imagens de 256 níveis de cinza",
          body:
            "Cada pixel era uma medida de refletância luminosa — um número, não uma cor. Para mapear o solo de Marte, os cientistas precisaram entender como esses números representavam a realidade.",
        },
        {
          type: "mistake",
          title: "Pensar que o computador 'vê' como nós",
          body:
            "O computador não vê formas nem cores — vê apenas uma grade de valores numéricos. A visão computacional é a arte de extrair significado desses números.",
        },
      ],
    },
    {
      id: "imagem-como-matriz",
      eyebrow: "Definição",
      title: "Uma imagem é uma matriz",
      lead:
        "Uma imagem digital é uma grade de números organizados em linhas e colunas. Cada posição guarda um valor que representa a intensidade luminosa daquele ponto.",
      visual: "imagem-matriz",
      paragraphs: [
        "Uma imagem de 640×480 tem 640 colunas e 480 linhas. Cada posição [i, j] contém um valor. Em escala de cinza, esse valor vai de 0 a 255. Em RGB, cada posição tem três valores: R, G e B.",
        "Imagine uma planilha de Excel onde cada célula é um tom de cinza. Uma foto de 1 megapixel é uma planilha com 1 milhão de células. Para acessar o pixel na linha 100, coluna 200, você usa img[100, 200] em NumPy.",
        "Para separar objeto de fundo, o algoritmo percorre essa matriz lendo valores e tomando decisões numéricas. Cada decisão de segmentação é, em última análise, uma comparação entre números.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Imagem digital",
          body:
            "Representação visual como uma matriz bidimensional (escala de cinza) ou tridimensional (RGB), onde cada elemento armazena um valor numérico de intensidade.",
        },
        {
          type: "example",
          title: "Imagem 4×4 em NumPy",
          body:
            "Uma imagem minúscula pode ser representada como um array NumPy com valores entre 0 e 255.",
          items: [
            "img = np.array([[0, 50, 120, 200], [30, 80, 160, 255], [10, 40, 90, 180], [5, 20, 60, 140]])",
            "img[0, 0] = 0 (preto absoluto)",
            "img[1, 3] = 255 (branco absoluto)",
          ],
        },
        {
          type: "mistake",
          title: "Confundir coordenadas de imagem com eixo cartesiano",
          body:
            "Na imagem, a origem [0, 0] está no canto superior esquerdo, e o eixo Y aponta para baixo. Não é como o eixo cartesiano tradicional onde Y aponta para cima.",
        },
      ],
    },
    {
      id: "pixel",
      eyebrow: "Conceito",
      title: "O pixel: a menor unidade de informação",
      lead:
        "Um pixel é o átomo da imagem — o menor elemento que carrega informação visual. Ele tem uma posição e um valor.",
      visual: "pixel-grid",
      interactive: "pixel-zoom-interactive",
      paragraphs: [
        "Pixel é a menor unidade discreta de uma imagem raster. Cada pixel tem coordenadas [i, j] e um valor de intensidade. Em escala de cinza, o valor vai de 0 a 255. Em RGB, são três valores.",
        "Uma foto de 1920×1080 tem 2.073.600 pixels. Se você der zoom suficiente, cada 'quadradinho' que aparece é um pixel. Telas Retina e 4K têm tantos pixels por polegada que nossos olhos não conseguem distingui-los individualmente.",
        "Por que pixels importam para segmentação: cada decisão de segmentação (este pixel é objeto ou fundo?) é tomada pixel a pixel ou região a região. Sem entender o pixel, não há como entender o algoritmo.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Pixel",
          body:
            "Menor unidade de uma imagem digital, com posição [linha, coluna] e valor de intensidade (0 a 255 em escala de cinza).",
        },
        {
          type: "insight",
          title: "Telas Retina 'escondem' os pixels",
          body:
            "Telas de alta densidade têm tantos pixels por polegada que nossos olhos não conseguem distingui-los. Mas o computador ainda lê cada um separadamente — ele nunca 'ignora' pixels.",
        },
        {
          type: "example",
          title: "Zoom em uma foto",
          body:
            "De longe parece pelagem contínua; de perto revela milhares de quadrados coloridos. Cada quadrado é um pixel com seu próprio valor.",
        },
      ],
    },
    {
      id: "coordenadas",
      eyebrow: "Conceito",
      title: "Coordenadas: como encontrar um pixel",
      lead:
        "Para acessar um pixel, usamos coordenadas de linha e coluna. Mas a indexação de imagem não funciona como o eixo cartesiano — e isso gera confusão frequente.",
      visual: "coordenadas-mapa",
      paragraphs: [
        "Na imagem, [0, 0] é o canto superior esquerdo. A primeira coordenada é a linha (eixo Y para baixo), a segunda é a coluna (eixo X para a direita). Isso é o inverso do eixo cartesiano tradicional.",
        "Em NumPy: img[l, c] acessa a linha l e coluna c. É o inverso da notação matricial [x, y] do eixo cartesiano. img[100, 200] é o pixel na linha 100, coluna 200. Não é x=100, y=200.",
        "Essa confusão é a fonte de muitos bugs em visão computacional. Sempre que você ver código com img[y, x], lembre-se: o primeiro índice é a linha (Y), não o X.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Coordenadas de imagem",
          body:
            "Par [linha, coluna] que identifica a posição de um pixel na matriz, com origem no canto superior esquerdo.",
        },
        {
          type: "example",
          title: "Acessar pixel específico",
          body:
            "pixel = img[50, 120] — acessa o pixel na linha 50, coluna 120 da imagem.",
        },
        {
          type: "mistake",
          title: "Trocar linha e coluna",
          body:
            "img[x, y] em NumPy é na verdade img[y, x] se você está pensando em coordenadas cartesianas. Na imagem, o primeiro índice é a linha (Y), não o X.",
        },
      ],
    },
    {
      id: "canais-rgb",
      eyebrow: "Aprofundamento",
      title: "Canais RGB: três imagens em uma",
      lead:
        "Uma imagem colorida é três imagens em escala de cinza empilhadas: vermelho, verde e azul. Cada canal é independente e pode ser processado separadamente.",
      visual: "canais-rgb",
      interactive: "rgb-to-grayscale-interactive",
      paragraphs: [
        "Cada pixel de uma imagem colorida tem 3 valores (R, G, B), cada um entre 0 e 255. A combinação dos 3 produz a cor final. Um pixel branco puro tem R=255, G=255, B=255. Um pixel vermelho puro tem R=255, G=0, B=0.",
        "Se você separar os canais, cada um parece uma foto em tons de cinza com diferente iluminação. O canal verde geralmente é o mais detalhado porque o olho humano é mais sensível ao verde.",
        "Conexão com OpenCV: o OpenCV carrega imagens em formato BGR, não RGB. Isso é uma pegadinha clássica. Se você exibir com matplotlib sem converter, o vermelho e o azul ficam trocados.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Canal RGB",
          body:
            "Cada um dos três componentes de cor (vermelho, verde e azul) que compõem um pixel colorido, armazenado como valor de 0 a 255.",
        },
        {
          type: "example",
          title: "Separar canais de uma imagem",
          body:
            "Em OpenCV: b, g, r = cv2.split(img) — cada canal é uma imagem em escala de cinza independente.",
        },
        {
          type: "insight",
          title: "OpenCV usa BGR, não RGB",
          body:
            "O OpenCV carrega imagens em ordem BGR, não RGB. Se você exibir com matplotlib sem converter, o vermelho e o azul ficam trocados.",
        },
      ],
    },
    {
      id: "escala-de-cinza",
      eyebrow: "Aprofundamento",
      title: "De 3 canais para 1: a escala de cinza",
      lead:
        "A conversão para escala de cinza condensa 3 canais em 1 usando uma fórmula ponderada. Não é uma média simples — é uma média que respeita a sensibilidade do olho humano.",
      visual: "escala-cinza-formula",
      paragraphs: [
        "A fórmula é Y = 0.299R + 0.587G + 0.114B. O verde recebe o maior peso porque nossos olhos são mais sensíveis ao verde. Isso não é arbitrário — é baseado na fisiologia da visão humana.",
        "Por que não usar média simples: (R+G+B)/3 trata os canais igualmente, desperdiçando informação perceptual. A tela pareceria mais escura do que deveria. A fórmula ponderada produz resultados visualmente corretos.",
        "Por que escala de cinza é suficiente para segmentação: a maioria dos algoritmos trabalha com intensidade luminosa, não com cor. A forma, a borda e o contraste estão no brilho, não na cor.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Escala de cinza",
          body:
            "Representação de imagem com um único canal de intensidade luminosa, onde cada pixel vale de 0 (preto) a 255 (branco).",
        },
        {
          type: "formula",
          title: "Conversão RGB para escala de cinza",
          body: "Fórmula ponderada que respeita a sensibilidade do olho humano.",
          formula: "Y = 0.299R + 0.587G + 0.114B",
        },
        {
          type: "example",
          title: "Converter para escala de cinza",
          body:
            "Na OpenCV: gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY) — converte BGR para escala de cinza com a fórmula ponderada.",
        },
        {
          type: "mistake",
          title: "Usar média simples (R+G+B)/3",
          body:
            "Isso ignora a sensibilidade do olho humano e produz resultados visualmente incorretos. A fórmula ponderada é o padrão.",
        },
      ],
    },
    {
      id: "intensidade",
      eyebrow: "Aprofundamento",
      title: "Intensidade: o que significa o número de um pixel",
      lead:
        "Em escala de cinza, o valor de cada pixel é chamado de intensidade. Esse número entre 0 e 255 codifica quão claro ou escuro aquele ponto é.",
      visual: "intensidade-escala",
      paragraphs: [
        "0 é preto absoluto, 255 é branco absoluto, 128 é cinza médio. Cada step representa uma mudança perceptível de luminosidade. Imagens de 8 bits usam 2^8 = 256 níveis.",
        "Por que 256 valores: isso é suficiente para o olho humano distinguir tons de cinza sem banding visível. Imagens médicas e científicas costumam usar 16 bits (65.536 níveis) para capturar mais detalhes.",
        "Histograma de intensidade: o histograma mostra quantos pixels existem em cada valor de intensidade. É a ferramenta mais importante para escolher um threshold — e você vai usar muito nas próximas aulas.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Intensidade",
          body:
            "Valor numérico de um pixel em escala de cinza, variando de 0 (preto) a 255 (branco), representando a luminosidade daquele ponto.",
        },
        {
          type: "insight",
          title: "Por que 256 valores e não 1000?",
          body:
            "Imagens de 8 bits oferecem 256 níveis — suficiente para que o olho humano não perceba degraus entre tons. Imagens médicas usam 16 bits para mais precisão.",
        },
      ],
    },
    {
      id: "contraste",
      eyebrow: "Problema",
      title: "Contraste: o que separa objeto de fundo",
      lead:
        "O contraste é a diferença de intensidade entre o que queremos detectar e o resto da imagem. Sem contraste suficiente, nenhum algoritmo consegue separar os dois.",
      visual: "contraste-impacto",
      interactive: "contrast-slider-interactive",
      paragraphs: [
        "Contraste é a distância entre os valores de intensidade do objeto e do fundo. Se o objeto é escuro e o fundo é claro, o contraste é alto. Se ambos são parecidos, o contraste é baixo.",
        "Por que contraste importa: thresholding, detecção de borda e segmentação todos dependem de haver uma separação clara entre objeto e fundo. Baixo contraste = resultados ruins.",
        "Como melhorar: equalização de histograma, ajuste de brilho/contraste, ou aquisição com iluminação controlada. Mas o ideal é capturar a imagem com bom contraste desde o início.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Contraste",
          body:
            "Diferença de intensidade entre regiões de interesse (objeto) e regiões de fundo. Alto contraste facilita a segmentação; baixo contraste dificulta.",
        },
        {
          type: "example",
          title: "Texto em fundo claro vs escuro",
          body:
            "Texto preto em fundo branco tem contraste máximo. Texto cinza escuro em fundo cinza médio tem contraste baixo — difícil de ler e de segmentar.",
        },
        {
          type: "mistake",
          title: "Tentar segmentar imagem com baixo contraste sem pré-processamento",
          body:
            "Resultado: threshold gera ruído e forma irregular. Solução: equalizar o histograma antes de aplicar threshold.",
        },
      ],
    },
    {
      id: "ruido-resolucao",
      eyebrow: "Problema",
      title: "Ruído e resolução: os inimigos da segmentação",
      lead:
        "Ruído é variação aleatória que não pertence à cena real. Resolução é a quantidade de pixels disponível. Ambos podem prejudicar a segmentação — mas são problemas diferentes.",
      visual: "ruido-resolucao",
      paragraphs: [
        "Ruído são valores de pixel que não representam a cena. Pode vir do sensor da câmera, compressão JPEG ou transmissão. Os tipos mais comuns são sal-e-pimenta (pixels 0 ou 255 isolados) e gaussiano (desvio aleatório em todos os pixels).",
        "Resolução é a quantidade de pixels da imagem. Uma imagem de 100×80 tem menos detalhe que uma de 1000×800. Mais resolução permite detectar objetos menores, mas não resolve ruído.",
        "Como lidar: filtros de suavização (como blur gaussiano) reduzem ruído mas perdem detalhe de borda. Mais resolução digital não compensa ruído de sensor. Um sensor de 12MP com boa iluminação produz imagens mais limpas que um sensor de 48MP com pouca luz.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Ruído",
          body:
            "Variação aleatória nos valores dos pixels que não corresponde à realidade da cena capturada. Os tipos mais comuns são sal-e-pimenta e gaussiano.",
        },
        {
          type: "definition",
          title: "Resolução",
          body:
            "Número de pixels (linhas × colunas) que compõem a imagem. Maior resolução significa mais detalhe capturado.",
        },
        {
          type: "example",
          title: "Ruído sal-e-pimenta",
          body:
            "Pixels isolados com valor 0 (preto) ou 255 (branco) espalhados aleatoriamente, como grão na foto.",
        },
        {
          type: "insight",
          title: "Mais megapixels não resolvem ruído",
          body:
            "Um sensor de 12MP com boa iluminação produz imagens mais limpas que um sensor de 48MP com pouca luz. Qualidade do sensor e iluminação importam mais que quantidade de pixels.",
        },
        {
          type: "mistake",
          title: "Confundir ruído com detalhe",
          body:
            "Ruído é informação falsa; detalhe é informação real. Suavizar demais remove ambos. O desafio é remover ruído preservando bordas.",
        },
      ],
    },
    {
      id: "imagem-binaria",
      eyebrow: "Síntese",
      title: "Imagem binária: o portal para a segmentação",
      lead:
        "Uma imagem binária tem apenas dois valores: 0 (fundo) e 255 (objeto). É o formato de entrada para quase todo algoritmo de detecção — desde componentes conectados até contornos e features geométricas.",
      visual: "binaria-pipeline",
      paragraphs: [
        "Binarização é aplicar um threshold na imagem em escala de cinza. Pixels acima do limiar viram 255 (objeto), abaixo viram 0 (fundo). É uma decisão simples: este pixel é objeto ou fundo?",
        "Por que binarizar: algoritmos de componentes conectados, contornos e features precisam decidir 'este pixel é objeto ou fundo?'. A binarização é essa decisão. Sem ela, não há como contar, medir ou classificar.",
        "Conexão com as próximas aulas: a partir daqui, tudo se constrói sobre a imagem binária — morfologia, componentes conectados, contornos, features geométricas e classificação. A binarização é o portal entre 'ver' e 'medir'.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Imagem binária",
          body:
            "Imagem com apenas dois valores de pixel: 0 (fundo/preto) e 255 (objeto/branco), obtida por thresholding de uma imagem em escala de cinza.",
        },
        {
          type: "example",
          title: "Threshold simples",
          body:
            "_, binary = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY) — pixels acima de 127 viram 255, os demais viram 0.",
        },
        {
          type: "insight",
          title: "Binarização é o portal entre 'ver' e 'medir'",
          body:
            "Enquanto a imagem em escala de cinza permite ver, a imagem binária permite contar, medir e classificar. É a transição de dados brutos para informação estruturada.",
        },
      ],
    },
    {
      id: "quiz-revisao",
      eyebrow: "Revisão",
      title: "Quiz de revisão",
      lead:
        "Teste se as ideias centrais ficaram conectadas: pixel, matriz, coordenadas, RGB, escala de cinza, intensidade, contraste, ruído e binarização.",
      interactive: "quiz",
      paragraphs: [
        "Use as perguntas para revisar o raciocínio. O objetivo é entender por que imagens digitais são matrizes e como isso afeta a segmentação, não memorizar fórmulas.",
      ],
    },
    {
      id: "glossario-proximos-estudos",
      eyebrow: "Glossário",
      title: "Glossário e próximos estudos",
      lead:
        "Feche a aula consolidando o vocabulário essencial para trabalhar com imagens digitais e segmentação.",
      interactive: "glossary",
      paragraphs: [
        "Dominar esses termos ajuda a ler documentação, escolher técnicas, diagnosticar problemas e projetar pipelines de visão computacional.",
      ],
    },
  ],
  summaryCards: [
    {
      title: "Imagem é matriz",
      body:
        "Uma foto é uma grade de números. Cada posição [linha, coluna] guarda um valor de intensidade.",
    },
    {
      title: "Pixel é o átomo",
      body:
        "Menor unidade de informação visual. Tem posição e valor. Tudo em visão computacional começa no pixel.",
    },
    {
      title: "RGB são 3 canais",
      body:
        "Vermelho, verde e azul empilhados. Cada canal é uma imagem em escala de cinza independente.",
    },
    {
      title: "Escala de cinza é suficiente",
      body:
        "A fórmula Y = 0.299R + 0.587G + 0.114B condensa 3 canais em 1 respeitando a visão humana.",
    },
    {
      title: "Contraste é determinante",
      body:
        "Sem diferença clara entre objeto e fundo, nenhum algoritmo de segmentação funciona bem.",
    },
    {
      title: "Binarização é o portal",
      body:
        "Imagem binária (0 ou 255) é o formato de entrada para detectar componentes, contornos e features.",
    },
    {
      title: "Cuidado com ruído e resolução",
      body:
        "Ruído é informação falsa. Mais megapixels não resolvem ruído. Iluminação e sensor importam mais.",
    },
  ],
  quiz: [
    {
      id: "q1",
      prompt: "Uma imagem 100×80 em escala de cinza tem quantos valores numéricos?",
      options: [
        { id: "a", label: "8.000 valores (100 × 80)." },
        { id: "b", label: "24.000 valores (100 × 80 × 3 canais)." },
        { id: "c", label: "180 valores (100 + 80)." },
      ],
      correctOptionId: "a",
      feedback:
        "Em escala de cinza, cada pixel tem um único valor. 100 × 80 = 8.000 pixels, cada um com um valor de intensidade.",
    },
    {
      id: "q2",
      prompt: "Por que o canal verde recebe peso maior na conversão para escala de cinza?",
      options: [
        { id: "a", label: "Porque o olho humano é mais sensível ao verde." },
        { id: "b", label: "Porque o verde é a cor mais brilhante." },
        { id: "c", label: "Porque o OpenCV foi projetado assim arbitrariamente." },
      ],
      correctOptionId: "a",
      feedback:
        "A fórmula Y = 0.299R + 0.587G + 0.114B é baseada na fisiologia da visão humana. Nossos olhos são mais sensíveis ao verde, por isso ele recebe o maior peso (0.587).",
    },
    {
      id: "q3",
      prompt: "Se um pixel na posição [2, 5] de uma imagem tem valor 0, o que isso significa?",
      options: [
        { id: "a", label: "O pixel na linha 2, coluna 5 é preto absoluto." },
        { id: "b", label: "O pixel na coluna 2, linha 5 é preto absoluto." },
        { id: "c", label: "O pixel está fora da imagem." },
      ],
      correctOptionId: "a",
      feedback:
        "Em NumPy, img[2, 5] acessa a linha 2, coluna 5. O valor 0 significa preto absoluto em escala de cinza. A primeira coordenada é sempre a linha (Y), não a coluna (X).",
    },
    {
      id: "q4",
      prompt: "Qual é o principal motivo de uma segmentação falhar mesmo com o algoritmo correto?",
      options: [
        { id: "a", label: "Baixo contraste entre objeto e fundo." },
        { id: "b", label: "A imagem ter muitos canais RGB." },
        { id: "c", label: "O algoritmo estar desatualizado." },
      ],
      correctOptionId: "a",
      feedback:
        "Sem contraste suficiente entre objeto e fundo, nenhum algoritmo de segmentação consegue separar os dois. Contraste é o requisito fundamental para segmentação bem-sucedida.",
    },
    {
      id: "q5",
      prompt: "Acessar img[10, 20] em NumPy corresponde a qual coordenada da imagem?",
      options: [
        { id: "a", label: "Linha 10, coluna 20 (Y=10, X=20)." },
        { id: "b", label: "Coluna 10, linha 20 (X=10, Y=20)." },
        { id: "c", label: "Pixel na posição cartesiana (10, 20)." },
      ],
      correctOptionId: "a",
      feedback:
        "Em NumPy, o primeiro índice é a linha (Y) e o segundo é a coluna (X). img[10, 20] acessa linha 10, coluna 20. Isso é o inverso da notação cartesiana (x, y).",
    },
    {
      id: "q6",
      prompt: "O que acontece com o histograma quando o contraste de uma imagem é muito baixo?",
      options: [
        { id: "a", label: "Os valores se concentram numa faixa estreita, sem separação clara entre objeto e fundo." },
        { id: "b", label: "O histograma fica uniformemente distribuído de 0 a 255." },
        { id: "c", label: "O histograma desaparece completamente." },
      ],
      correctOptionId: "a",
      feedback:
        "Baixo contraste significa que objeto e fundo têm intensidades similares. O histograma mostra uma concentração de valores numa faixa estreita, sem picos distintos para objeto e fundo.",
    },
    {
      id: "q7",
      prompt: "Por que usamos imagens em escala de cinza como entrada para segmentação em vez de RGB?",
      options: [
        { id: "a", label: "Porque a maioria dos algoritmos trabalha com intensidade luminosa, não com cor. Forma, borda e contraste estão no brilho." },
        { id: "b", label: "Porque imagens RGB são muito grandes para processar." },
        { id: "c", label: "Porque o OpenCV não suporta segmentação em RGB." },
      ],
      correctOptionId: "a",
      feedback:
        "A maioria dos algoritmos de segmentação trabalha com intensidade luminosa. A forma, a borda e o contraste estão no brilho, não na cor. Escala de cinza é suficiente e mais eficiente.",
    },
    {
      id: "q8",
      prompt: "Ruído sal-e-pimenta adiciona pixels com quais valores?",
      options: [
        { id: "a", label: "0 (preto) ou 255 (branco) isolados." },
        { id: "b", label: "128 (cinza médio) em todos os pixels." },
        { id: "c", label: "Valores aleatórios entre 0 e 255 em todos os pixels." },
      ],
      correctOptionId: "a",
      feedback:
        "Ruído sal-e-pimenta adiciona pixels isolados com valor 0 (preto, 'pimenta') ou 255 (branco, 'sal') espalhados aleatoriamente pela imagem.",
    },
  ],
  glossary: [
    {
      term: "Pixel",
      definition:
        "Menor unidade de uma imagem digital, com posição [linha, coluna] e valor de intensidade (0 a 255 em escala de cinza).",
    },
    {
      term: "Imagem digital",
      definition:
        "Representação visual como uma matriz bidimensional (escala de cinza) ou tridimensional (RGB), onde cada elemento armazena um valor numérico de intensidade.",
    },
    {
      term: "Matriz",
      definition:
        "Estrutura de dados bidimensional organizada em linhas e colunas. Uma imagem em escala de cinza é uma matriz onde cada célula é um pixel.",
    },
    {
      term: "Canal RGB",
      definition:
        "Cada um dos três componentes de cor (vermelho, verde e azul) que compõem um pixel colorido, armazenado como valor de 0 a 255.",
    },
    {
      term: "Escala de cinza",
      definition:
        "Representação de imagem com um único canal de intensidade luminosa, onde cada pixel vale de 0 (preto) a 255 (branco).",
    },
    {
      term: "Intensidade",
      definition:
        "Valor numérico de um pixel em escala de cinza, variando de 0 (preto) a 255 (branco), representando a luminosidade daquele ponto.",
    },
    {
      term: "Contraste",
      definition:
        "Diferença de intensidade entre regiões de interesse (objeto) e regiões de fundo. Alto contraste facilita a segmentação; baixo contraste dificulta.",
    },
    {
      term: "Ruído",
      definition:
        "Variação aleatória nos valores dos pixels que não corresponde à realidade da cena capturada. Os tipos mais comuns são sal-e-pimenta e gaussiano.",
    },
    {
      term: "Resolução",
      definition:
        "Número de pixels (linhas × colunas) que compõem a imagem. Maior resolução significa mais detalhe capturado.",
    },
    {
      term: "Imagem binária",
      definition:
        "Imagem com apenas dois valores de pixel: 0 (fundo/preto) e 255 (objeto/branco), obtida por thresholding de uma imagem em escala de cinza.",
    },
    {
      term: "Threshold",
      definition:
        "Valor de corte usado para converter uma imagem em escala de cinza em imagem binária. Pixels acima do threshold viram 255; abaixo viram 0.",
    },
    {
      term: "Histograma",
      definition:
        "Gráfico que mostra quantos pixels existem em cada valor de intensidade. Ferramenta essencial para escolher o threshold ideal.",
    },
  ],
};
