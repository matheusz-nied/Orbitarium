import type { LessonContent } from "../../../types/content";

export const imagensBinariasLimiarizacaoHistogramasContent: LessonContent = {
  id: "imagens-binarias-limiarizacao-histogramas",
  title: "Imagens Binárias, Limiarização e Histogramas",
  subtitle:
    "Como transformar uma imagem em escala de cinza em apenas dois níveis — objeto e fundo — usando um limiar, e como o histograma revela o valor ideal.",
  description:
    "Uma aula visual sobre imagens binárias, thresholding, histogramas de intensidade, separação objeto/fundo, falso positivo/negativo e impacto da iluminação na segmentação.",
  primaryCategoryId: "inteligencia-artificial",
  secondaryCategoryId: "computacao",
  level: "Intermediário",
  estimatedTime: "35-45 min",
  tags: [
    "Visão Computacional",
    "Imagem Binária",
    "Thresholding",
    "Histograma",
    "Segmentação",
    "OpenCV",
  ],
  learningObjectives: [
    "Entender o que é uma imagem binária e por que ela é essencial para segmentação.",
    "Compreender como o thresholding converte escala de cinza em binário usando um limiar.",
    "Ler e interpretar histogramas de intensidade para escolher o threshold ideal.",
    "Identificar separação objeto/fundo em histogramas bimodais.",
    "Reconhecer falso positivo e falso negativo em segmentação binária.",
    "Entender como iluminação desigual e ruído afetam a qualidade da binarização.",
  ],
  prerequisites: [
    "Conhecimento de imagem digital como matriz (aula anterior).",
    "Noção de escala de cinza e intensidade de pixel.",
    "Familiaridade básica com Python e OpenCV é útil.",
  ],
  references: [
    {
      title: "Digital Image Processing",
      source: "Gonzalez & Woods, 4th Edition — Pearson",
      url: "https://www.imageprocessingplace.com/",
      note:
        "Capítulo sobre segmentação por thresholding e análise de histogramas. Referência clássica para fundamentos.",
    },
    {
      title: "OpenCV Documentation — Thresholding",
      source: "OpenCV — Documentação oficial",
      url: "https://docs.opencv.org/4.x/d7/d4d/tutorial_py_thresholding.html",
      note:
        "Tutorial oficial sobre thresholding em OpenCV, cobrindo threshold global, Otsu e adaptativo.",
    },
    {
      title: "Scikit-image — Thresholding",
      source: "scikit-image — Documentação oficial",
      url: "https://scikit-image.org/docs/stable/api/skimage.filters.html#module-skimage.filters.thresholding",
      note:
        "Documentação sobre técnicas de thresholding em Python, incluindo Otsu, Li, Yen e thresholding adaptativo.",
    },
    {
      title: "Computer Vision: Algorithms and Applications",
      source: "Richard Szeliski, 2nd Edition — Springer",
      url: "https://szeliski.org/Book/",
      note:
        "Seção sobre segmentação por thresholding e análise de histogramas em visão computacional.",
    },
    {
      title: "A Threshold Selection Method from Gray-Level Histograms",
      source: "Nobuyuki Otsu, 1979 — IEEE Transactions on Systems, Man, and Cybernetics",
      url: "https://ieeexplore.ieee.org/document/4310076",
      note:
        "Artigo original do método de Otsu para seleção automática de threshold baseado em histogramas.",
    },
  ],
  heroVisual: "binarias-hero",
  openingText:
    "Imagine que você precisa contar quantas moedas estão sobre uma mesa. Para o computador, essa tarefa começa com uma decisão simples: cada pixel da imagem é moeda ou é mesa? A binarização é exatamente isso — transformar uma imagem com 256 tons de cinza em apenas dois valores: 0 (fundo) e 255 (objeto). Mas como escolher o valor certo de corte? O histograma de intensidades é a ferramenta que revela a resposta, mostrando onde estão os pixels do objeto e onde estão os do fundo.",
  quickFacts: [
    {
      title: "Imagem binária = 2 valores",
      body:
        "Uma imagem binária tem apenas 0 (preto/fundo) e 255 (branco/objeto). É o formato de entrada para detectar contornos, componentes e features.",
    },
    {
      title: "Threshold = valor de corte",
      body:
        "O threshold é um número entre 0 e 255. Pixels acima viram 255 (objeto), pixels abaixo viram 0 (fundo). Escolher bem esse valor é crucial.",
    },
    {
      title: "Histograma revela a estrutura",
      body:
        "O histograma mostra quantos pixels existem em cada intensidade. Dois picos separados (bimodal) indicam objeto e fundo distintos — o vale entre eles é o threshold ideal.",
    },
    {
      title: "Iluminação é tudo",
      body:
        "Iluminação desigual cria histogramas sem separação clara. Sem contraste entre objeto e fundo, nenhum threshold funciona bem.",
    },
  ],
  sections: [
    {
      id: "motivacao-binarizacao",
      eyebrow: "Motivação",
      title: "Por que binarizar uma imagem?",
      lead:
        "Antes de contar objetos, medir áreas ou detectar contornos, precisamos decidir: cada pixel é objeto ou fundo? A binarização é essa decisão.",
      visual: "motivacao-binaria",
      paragraphs: [
        "Na aula anterior, aprendemos que imagens são matrizes de números entre 0 e 255. Mas para detectar objetos, precisamos de algo mais simples: uma resposta binária para cada pixel. Este pixel é parte do objeto que me interessa, ou é fundo?",
        "A binarização transforma uma imagem em escala de cinza em uma imagem binária — apenas dois valores: 0 (fundo, preto) e 255 (objeto, branco). É como decidir quais pixels 'importam' e quais podem ser ignorados.",
        "Por que isso importa? Porque quase todos os algoritmos de visão computacional que vêm depois — componentes conectados, contornos, features geométricas, classificação — trabalham sobre imagens binárias. A binarização é o portal entre 'ver a imagem' e 'analisar os objetos'.",
      ],
      blocks: [
        {
          type: "insight",
          title: "Binarização é uma decisão pixel a pixel",
          body:
            "Cada pixel recebe um rótulo: objeto ou fundo. Não há meio-termo. Essa simplicidade é o que torna os algoritmos subsequentes eficientes.",
        },
        {
          type: "mistake",
          title: "Binarização não é o mesmo que segmentação completa",
          body:
            "Binarizar separa objeto de fundo, mas não identifica quais pixels pertencem a qual objeto. Para isso, precisamos de componentes conectados (próxima aula).",
        },
      ],
    },
    {
      id: "imagem-binaria-definicao",
      eyebrow: "Definição",
      title: "O que é uma imagem binária",
      lead:
        "Uma imagem binária é uma matriz onde cada pixel tem apenas dois valores possíveis: 0 (fundo) ou 255 (objeto).",
      visual: "binaria-definicao",
      paragraphs: [
        "Em uma imagem em escala de cinza, cada pixel pode ter qualquer valor entre 0 e 255 — são 256 possibilidades. Em uma imagem binária, essa variedade colapsa para apenas duas: 0 (geralmente representado como preto, o fundo) e 255 (geralmente branco, o objeto).",
        "Matematicamente, a binarização é uma função simples: se o valor do pixel é maior que um limiar (threshold), ele vira 255; caso contrário, vira 0. Em código: binary = gray > threshold.",
        "A imagem binária resultante é muito mais fácil de processar. Algoritmos podem percorrer a matriz e tomar decisões rápidas: 'este pixel é 1 (objeto), então pertence a algo que me interessa'. Isso é a base para contagem de objetos, medição de áreas e extração de contornos.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Imagem binária",
          body:
            "Imagem com apenas dois valores de pixel: 0 (fundo/preto) e 255 (objeto/branco). Obtida por thresholding de uma imagem em escala de cinza.",
        },
        {
          type: "example",
          title: "Binarização em Python",
          body:
            "Usando OpenCV, a binarização é feita com cv2.threshold:",
          items: [
            "_, binary = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY)",
            "Pixels com valor > 127 viram 255 (branco/objeto)",
            "Pixels com valor ≤ 127 viram 0 (preto/fundo)",
          ],
        },
        {
          type: "insight",
          title: "Por que 0 e 255, e não 0 e 1?",
          body:
            "Tecnicamente, poderíamos usar 0 e 1. Mas 0 e 255 são usados porque mantêm compatibilidade com o formato de 8 bits (uint8) que o OpenCV e outras bibliotecas usam para imagens.",
        },
      ],
    },
    {
      id: "threshold-limiar",
      eyebrow: "Conceito",
      title: "Threshold: o valor de corte",
      lead:
        "O threshold é um número entre 0 e 255 que decide quais pixels viram objeto e quais viram fundo. Escolher bem esse valor é o desafio central da binarização.",
      visual: "threshold-conceito",
      interactive: "threshold-slider-interactive",
      paragraphs: [
        "O threshold (limiar) é o parâmetro mais importante da binarização. É um valor numérico entre 0 e 255 que funciona como uma fronteira: pixels com intensidade acima do threshold são classificados como objeto (255), e pixels abaixo são classificados como fundo (0).",
        "A escolha do threshold determina a qualidade da segmentação. Se o threshold for muito baixo, pixels do fundo podem ser classificados como objeto (falso positivo). Se for muito alto, pixels do objeto podem ser classificados como fundo (falso negativo). O ideal é encontrar o valor que separa claramente os dois grupos.",
        "Em cenas simples com iluminação uniforme e fundo homogêneo, escolher o threshold é relativamente fácil. Mas em cenas reais com sombras, reflexos e texturas, a escolha se torna um desafio que exige análise do histograma.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Threshold (limiar)",
          body:
            "Valor numérico entre 0 e 255 usado para converter uma imagem em escala de cinza em imagem binária. Pixels acima do threshold viram 255; pixels abaixo viram 0.",
        },
        {
          type: "example",
          title: "Threshold em código",
          body:
            "Em OpenCV, o threshold é aplicado assim:",
          items: [
            "threshold_value = 120",
            "_, binary = cv2.threshold(gray, threshold_value, 255, cv2.THRESH_BINARY)",
          ],
        },
        {
          type: "mistake",
          title: "Usar o mesmo threshold para todas as imagens",
          body:
            "Cada imagem tem características diferentes de iluminação e contraste. Um threshold que funciona para uma imagem pode falhar completamente para outra. Sempre analise o histograma antes de decidir.",
        },
      ],
    },
    {
      id: "histograma-intensidades",
      eyebrow: "Ferramenta",
      title: "Histograma de intensidades",
      lead:
        "O histograma mostra quantos pixels existem em cada valor de intensidade. É a ferramenta mais importante para escolher o threshold ideal.",
      visual: "histograma-conceito",
      interactive: "histograma-interativo",
      paragraphs: [
        "O histograma de intensidades é um gráfico que mostra a distribuição dos valores de pixel em uma imagem. No eixo X, temos os valores de intensidade de 0 a 255. No eixo Y, temos a quantidade de pixels que possuem cada valor.",
        "Para uma imagem com objeto escuro sobre fundo claro, o histograma tipicamente mostra dois picos: um pico à esquerda (valores baixos, objeto) e um pico à direita (valores altos, fundo). O vale entre os dois picos é o ponto ideal para o threshold.",
        "Histogramas bimodais (com dois picos claros) indicam que a imagem tem boa separação entre objeto e fundo. Histogramas unimodais (com um único pico) ou multimodais (com muitos picos) indicam que a separação é mais difícil e pode exigir técnicas avançadas como thresholding adaptativo.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Histograma de intensidades",
          body:
            "Gráfico que mostra a quantidade de pixels para cada valor de intensidade (0-255) em uma imagem. Ferramenta essencial para análise de contraste e escolha de threshold.",
        },
        {
          type: "example",
          title: "Calcular histograma em Python",
          body:
            "Em OpenCV ou NumPy:",
          items: [
            "hist = cv2.calcHist([gray], [0], None, [256], [0, 256])",
            "Ou: hist, bins = np.histogram(gray.ravel(), bins=256, range=(0,256))",
          ],
        },
        {
          type: "insight",
          title: "Histograma bimodal = separação fácil",
          body:
            "Quando o histograma tem dois picos claros com um vale entre eles, o threshold ideal está no ponto mais baixo do vale. Isso indica boa separação entre objeto e fundo.",
        },
      ],
    },
    {
      id: "separacao-objeto-fundo",
      eyebrow: "Aplicação",
      title: "Separação objeto/fundo",
      lead:
        "O objetivo da binarização é separar os pixels do objeto dos pixels do fundo. O histograma revela se essa separação é possível e onde está o ponto de corte ideal.",
      visual: "separacao-objeto-fundo",
      paragraphs: [
        "A separação objeto/fundo é o coração da segmentação binária. Quando o histograma é bimodal, temos dois grupos distintos de pixels: um grupo com intensidades baixas (objeto escuro) e outro com intensidades altas (fundo claro), ou vice-versa.",
        "O threshold ideal é o valor que minimiza a classificação errada. Se colocarmos o threshold no vale entre os dois picos, a maioria dos pixels do objeto ficará de um lado e a maioria dos pixels do fundo ficará do outro.",
        "Mas nem sempre a separação é perfeita. Pixels na borda do objeto podem ter intensidades intermediárias (nem totalmente objeto, nem totalmente fundo). Esses pixels são os mais difíceis de classificar corretamente e são a fonte de erros como bordas serrilhadas ou buracos no objeto.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Separação objeto/fundo",
          body:
            "Processo de classificar cada pixel como pertencente ao objeto de interesse ou ao fundo da imagem. A qualidade da separação depende do contraste e da escolha do threshold.",
        },
        {
          type: "insight",
          title: "O vale do histograma é o ponto ideal",
          body:
            "Em histogramas bimodais, o ponto mais baixo entre os dois picos (o vale) é geralmente o melhor threshold. Ele minimiza a sobreposição entre objeto e fundo.",
        },
        {
          type: "mistake",
          title: "Ignorar a forma do histograma",
          body:
            "Escolher um threshold arbitrário sem olhar o histograma é como atirar no escuro. Sempre visualize o histograma antes de decidir o valor de corte.",
        },
      ],
    },
    {
      id: "falso-positivo-negativo",
      eyebrow: "Problema",
      title: "Falso positivo e falso negativo",
      lead:
        "Nenhuma binarização é perfeita. Falso positivo é quando o fundo é classificado como objeto; falso negativo é quando o objeto é classificado como fundo.",
      visual: "falso-positivo-negativo",
      paragraphs: [
        "Falso positivo ocorre quando pixels do fundo são incorretamente classificados como objeto. Isso acontece quando o threshold é muito baixo — pixels claros do fundo que deveriam ser 0 acabam virando 255.",
        "Falso negativo ocorre quando pixels do objeto são incorretamente classificados como fundo. Isso acontece quando o threshold é muito alto — pixels escuros do objeto que deveriam ser 255 acabam virando 0.",
        "O equilíbrio entre falso positivo e falso negativo depende da aplicação. Em detecção de tumores, por exemplo, é melhor ter falso positivo (detectar algo que não é tumor) do que falso negativo (deixar passar um tumor real). Em contagem de objetos, ambos os erros prejudicam a precisão.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Falso positivo",
          body:
            "Pixel do fundo classificado incorretamente como objeto. Ocorre quando o threshold é muito baixo.",
        },
        {
          type: "definition",
          title: "Falso negativo",
          body:
            "Pixel do objeto classificado incorretamente como fundo. Ocorre quando o threshold é muito alto.",
        },
        {
          type: "example",
          title: "Impacto na prática",
          body:
            "Em contagem de moedas:",
          items: [
            "Falso positivo: ruído do fundo vira 'moeda fantasma'",
            "Falso negativo: parte da moeda some, área medida fica menor",
          ],
        },
        {
          type: "insight",
          title: "O threshold ideal minimiza ambos os erros",
          body:
            "Não existe threshold perfeito. O objetivo é encontrar o valor que equilibra falso positivo e falso negativo, minimizando o erro total.",
        },
      ],
    },
    {
      id: "impacto-iluminacao",
      eyebrow: "Problema",
      title: "O impacto da iluminação",
      lead:
        "Iluminação desigual é o maior inimigo da binarização. Sombras e reflexos criam histogramas sem separação clara, tornando o threshold global ineficaz.",
      visual: "impacto-iluminacao",
      interactive: "iluminacao-simulador",
      paragraphs: [
        "A iluminação é o fator mais crítico para a qualidade da binarização. Quando a iluminação é uniforme, o histograma tende a ser bimodal e o threshold global funciona bem. Mas quando a iluminação é desigual — com sombras, reflexos ou gradientes — o histograma se deforma e a separação objeto/fundo se torna difícil.",
        "Imagine uma foto de moedas sobre uma mesa com uma sombra caindo sobre metade da cena. As moedas na sombra terão intensidades mais baixas que as moedas na luz. O histograma não mostrará dois picos claros, mas sim uma distribuição espalhada. Um threshold global vai classificar corretamente as moedas na luz, mas falhará com as moedas na sombra.",
        "Para lidar com iluminação desigual, existem técnicas como thresholding adaptativo (que calcula um threshold diferente para cada região da imagem) e equalização de histograma (que redistribui as intensidades para melhorar o contraste). Mas a melhor solução é sempre capturar a imagem com iluminação uniforme desde o início.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Iluminação uniforme",
          body:
            "Condição ideal onde todas as partes da cena recebem a mesma quantidade de luz, resultando em histograma bimodal e threshold global eficaz.",
        },
        {
          type: "example",
          title: "Problemas comuns de iluminação",
          body:
            "Situações que prejudicam a binarização:",
          items: [
            "Sombras projetadas sobre parte da cena",
            "Reflexos de luz direta criando pixels saturados (255)",
            "Gradiente de iluminação (um lado claro, outro escuro)",
          ],
        },
        {
          type: "mistake",
          title: "Tentar resolver iluminação ruim com threshold",
          body:
            "Se a iluminação é muito desigual, nenhum threshold global vai funcionar bem. É preciso usar thresholding adaptativo ou corrigir a iluminação na captura.",
        },
      ],
    },
    {
      id: "ruido-binarizacao",
      eyebrow: "Problema",
      title: "Ruído e binarização",
      lead:
        "Ruído na imagem cria pixels isolados que são classificados incorretamente, gerando 'buracos' no objeto ou 'ilhas' no fundo.",
      visual: "ruido-binarizacao",
      paragraphs: [
        "Ruído é variação aleatória nos valores dos pixels que não corresponde à realidade da cena. Quando aplicamos thresholding em uma imagem com ruído, pixels ruidosos podem ser classificados incorretamente, criando artefatos na imagem binária.",
        "Os artefatos mais comuns são: buracos no objeto (pixels do objeto classificados como fundo por causa de ruído escuro) e ilhas no fundo (pixels do fundo classificados como objeto por causa de ruído claro). Esses artefatos prejudicam a contagem de objetos e a medição de áreas.",
        "A solução é aplicar filtros de suavização (como blur gaussiano ou filtro mediano) antes da binarização. O filtro mediano é especialmente eficaz contra ruído sal-e-pimenta, enquanto o blur gaussiano ajuda com ruído gaussiano. Mas cuidado: suavizar demais pode borrar as bordas do objeto.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Ruído em segmentação",
          body:
            "Variações aleatórias nos valores dos pixels que causam classificação incorreta durante a binarização, criando buracos no objeto ou ilhas no fundo.",
        },
        {
          type: "example",
          title: "Filtrar antes de binarizar",
          body:
            "Em OpenCV:",
          items: [
            "blur = cv2.GaussianBlur(gray, (5, 5), 0)",
            "_, binary = cv2.threshold(blur, 127, 255, cv2.THRESH_BINARY)",
          ],
        },
        {
          type: "insight",
          title: "Filtro mediano é rei contra sal-e-pimenta",
          body:
            "O filtro mediano (cv2.medianBlur) substitui cada pixel pela mediana dos vizinhos, eliminando pixels isolados com valores extremos (0 ou 255) típicos do ruído sal-e-pimenta.",
        },
        {
          type: "mistake",
          title: "Suavizar demais borra as bordas",
          body:
            "Filtros de suavização reduzem ruído, mas também borram transições bruscas. Se o kernel for muito grande, as bordas do objeto ficam imprecisas e a segmentação perde qualidade.",
        },
      ],
    },
    {
      id: "escolha-threshold",
      eyebrow: "Síntese",
      title: "Como escolher o threshold ideal",
      lead:
        "A escolha do threshold depende da análise do histograma, do contraste da cena e do equilíbrio entre falso positivo e falso negativo aceitável para a aplicação.",
      visual: "escolha-threshold",
      paragraphs: [
        "Escolher o threshold ideal é um processo de análise, não de adivinhação. O primeiro passo é sempre visualizar o histograma da imagem. Se o histograma é bimodal, o threshold está no vale entre os dois picos. Se não é bimodal, a separação será mais difícil.",
        "Para histogramas bimodais, o método de Otsu calcula automaticamente o threshold que minimiza a variância intra-classe (a dispersão dos pixels dentro de cada grupo). É uma solução automática e robusta para a maioria dos casos simples.",
        "Para histogramas não-bimodais ou cenas com iluminação desigual, o thresholding adaptativo calcula um threshold diferente para cada região da imagem, usando a média ou mediana local. É mais lento, mas lida melhor com variações de iluminação.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Método de Otsu",
          body:
            "Algoritmo que calcula automaticamente o threshold ótimo para histogramas bimodais, minimizando a variância intra-classe entre objeto e fundo.",
        },
        {
          type: "example",
          title: "Otsu em OpenCV",
          body:
            "Aplicar Otsu é simples:",
          items: [
            "_, binary = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)",
            "O valor 0 é ignorado — Otsu calcula o threshold automaticamente",
          ],
        },
        {
          type: "insight",
          title: "Não existe threshold universal",
          body:
            "Cada imagem exige análise própria. O que funciona para uma cena pode falhar para outra. Sempre visualize o histograma e valide o resultado visualmente.",
        },
      ],
    },
    {
      id: "quiz-revisao",
      eyebrow: "Revisão",
      title: "Quiz de revisão",
      lead:
        "Teste se os conceitos de binarização, threshold, histograma e separação objeto/fundo ficaram claros.",
      interactive: "quiz",
      paragraphs: [
        "Use as perguntas para revisar o raciocínio. O objetivo é entender como o threshold funciona e como o histograma guia a escolha, não memorizar código.",
      ],
    },
    {
      id: "glossario-proximos-estudos",
      eyebrow: "Glossário",
      title: "Glossário e próximos estudos",
      lead:
        "Consolide o vocabulário essencial para trabalhar com binarização e thresholding.",
      interactive: "glossary",
      paragraphs: [
        "Dominar esses termos ajuda a ler documentação, escolher técnicas e diagnosticar problemas de segmentação.",
      ],
    },
  ],
  summaryCards: [
    {
      title: "Imagem binária = 2 valores",
      body:
        "Apenas 0 (fundo) e 255 (objeto). É o formato de entrada para contagem, medição e classificação de objetos.",
    },
    {
      title: "Threshold = valor de corte",
      body:
        "Pixels acima viram 255, pixels abaixo viram 0. A escolha do threshold determina a qualidade da segmentação.",
    },
    {
      title: "Histograma revela a estrutura",
      body:
        "Dois picos (bimodal) = separação fácil. O vale entre os picos é o threshold ideal.",
    },
    {
      title: "Falso positivo vs falso negativo",
      body:
        "Threshold baixo = falso positivo (fundo vira objeto). Threshold alto = falso negativo (objeto vira fundo).",
    },
    {
      title: "Iluminação é tudo",
      body:
        "Iluminação desigual cria histogramas sem separação clara. Threshold global falha — use adaptativo ou corrija a iluminação.",
    },
    {
      title: "Filtre antes de binarizar",
      body:
        "Ruído cria artefatos na imagem binária. Aplique blur gaussiano ou filtro mediano antes do threshold.",
    },
    {
      title: "Otsu é automático",
      body:
        "Para histogramas bimodais, Otsu calcula o threshold ideal automaticamente. É rápido e robusto.",
    },
  ],
  quiz: [
    {
      id: "q1",
      prompt: "O que é uma imagem binária?",
      options: [
        { id: "a", label: "Uma imagem com apenas dois valores de pixel: 0 (fundo) e 255 (objeto)." },
        { id: "b", label: "Uma imagem com dois canais de cor." },
        { id: "c", label: "Uma imagem em preto e branco com 256 tons de cinza." },
      ],
      correctOptionId: "a",
      feedback:
        "Imagem binária tem apenas dois valores: 0 (fundo/preto) e 255 (objeto/branco). É obtida por thresholding de uma imagem em escala de cinza.",
    },
    {
      id: "q2",
      prompt: "O que o histograma de intensidades mostra?",
      options: [
        { id: "a", label: "A quantidade de pixels para cada valor de intensidade (0-255)." },
        { id: "b", label: "A posição de cada pixel na imagem." },
        { id: "c", label: "A cor de cada pixel em RGB." },
      ],
      correctOptionId: "a",
      feedback:
        "O histograma mostra a distribuição dos valores de pixel. No eixo X, os valores de intensidade (0-255). No eixo Y, a quantidade de pixels com cada valor.",
    },
    {
      id: "q3",
      prompt: "O que indica um histograma bimodal?",
      options: [
        { id: "a", label: "Boa separação entre objeto e fundo, com dois picos distintos." },
        { id: "b", label: "A imagem tem muito ruído." },
        { id: "c", label: "A imagem está em cores." },
      ],
      correctOptionId: "a",
      feedback:
        "Histograma bimodal tem dois picos claros, indicando dois grupos distintos de pixels (objeto e fundo). O vale entre os picos é o threshold ideal.",
    },
    {
      id: "q4",
      prompt: "O que é falso positivo em binarização?",
      options: [
        { id: "a", label: "Pixel do fundo classificado incorretamente como objeto." },
        { id: "b", label: "Pixel do objeto classificado corretamente como objeto." },
        { id: "c", label: "Pixel do objeto classificado incorretamente como fundo." },
      ],
      correctOptionId: "a",
      feedback:
        "Falso positivo ocorre quando pixels do fundo são classificados como objeto. Acontece quando o threshold é muito baixo.",
    },
    {
      id: "q5",
      prompt: "O que acontece se o threshold for muito alto?",
      options: [
        { id: "a", label: "Falso negativo: pixels do objeto são classificados como fundo." },
        { id: "b", label: "Falso positivo: pixels do fundo são classificados como objeto." },
        { id: "c", label: "A imagem binária fica perfeita." },
      ],
      correctOptionId: "a",
      feedback:
        "Threshold muito alto classifica pixels do objeto como fundo (falso negativo). O objeto fica menor ou desaparece parcialmente.",
    },
    {
      id: "q6",
      prompt: "Por que iluminação desigual prejudica a binarização?",
      options: [
        { id: "a", label: "Porque cria histogramas sem separação clara, tornando o threshold global ineficaz." },
        { id: "b", label: "Porque aumenta a resolução da imagem." },
        { id: "c", label: "Porque adiciona ruído sal-e-pimenta." },
      ],
      correctOptionId: "a",
      feedback:
        "Iluminação desigual espalha as intensidades no histograma, eliminando os dois picos claros. Threshold global falha — é preciso thresholding adaptativo.",
    },
    {
      id: "q7",
      prompt: "O que o método de Otsu faz?",
      options: [
        { id: "a", label: "Calcula automaticamente o threshold ideal para histogramas bimodais." },
        { id: "b", label: "Remove ruído da imagem antes da binarização." },
        { id: "c", label: "Converte imagem RGB para escala de cinza." },
      ],
      correctOptionId: "a",
      feedback:
        "Otsu calcula automaticamente o threshold que minimiza a variância intra-classe entre objeto e fundo. Funciona bem para histogramas bimodais.",
    },
    {
      id: "q8",
      prompt: "Por que aplicar filtro antes da binarização?",
      options: [
        { id: "a", label: "Para reduzir ruído que causaria artefatos (buracos e ilhas) na imagem binária." },
        { id: "b", label: "Para aumentar o contraste da imagem." },
        { id: "c", label: "Para converter a imagem para RGB." },
      ],
      correctOptionId: "a",
      feedback:
        "Ruído cria pixels isolados que são classificados incorretamente, gerando buracos no objeto ou ilhas no fundo. Filtros de suavização reduzem esse problema.",
    },
  ],
  glossary: [
    {
      term: "Imagem binária",
      definition:
        "Imagem com apenas dois valores de pixel: 0 (fundo/preto) e 255 (objeto/branco). Obtida por thresholding de uma imagem em escala de cinza.",
    },
    {
      term: "Threshold (limiar)",
      definition:
        "Valor numérico entre 0 e 255 usado para converter uma imagem em escala de cinza em imagem binária. Pixels acima viram 255; pixels abaixo viram 0.",
    },
    {
      term: "Histograma de intensidades",
      definition:
        "Gráfico que mostra a quantidade de pixels para cada valor de intensidade (0-255). Ferramenta essencial para análise de contraste e escolha de threshold.",
    },
    {
      term: "Histograma bimodal",
      definition:
        "Histograma com dois picos claros, indicando boa separação entre objeto e fundo. O vale entre os picos é o threshold ideal.",
    },
    {
      term: "Separação objeto/fundo",
      definition:
        "Processo de classificar cada pixel como pertencente ao objeto de interesse ou ao fundo da imagem.",
    },
    {
      term: "Falso positivo",
      definition:
        "Pixel do fundo classificado incorretamente como objeto. Ocorre quando o threshold é muito baixo.",
    },
    {
      term: "Falso negativo",
      definition:
        "Pixel do objeto classificado incorretamente como fundo. Ocorre quando o threshold é muito alto.",
    },
    {
      term: "Método de Otsu",
      definition:
        "Algoritmo que calcula automaticamente o threshold ótimo para histogramas bimodais, minimizando a variância intra-classe.",
    },
    {
      term: "Thresholding adaptativo",
      definition:
        "Técnica que calcula um threshold diferente para cada região da imagem, lidando melhor com iluminação desigual.",
    },
    {
      term: "Ruído sal-e-pimenta",
      definition:
        "Tipo de ruído que adiciona pixels isolados com valor 0 (preto) ou 255 (branco) espalhados aleatoriamente pela imagem.",
    },
    {
      term: "Filtro mediano",
      definition:
        "Filtro que substitui cada pixel pela mediana dos vizinhos. Eficaz contra ruído sal-e-pimenta.",
    },
    {
      term: "Equalização de histograma",
      definition:
        "Técnica que redistribui as intensidades dos pixels para melhorar o contraste, útil quando o histograma está concentrado numa faixa estreita.",
    },
  ],
};
