import type { LessonContent } from "../../../types/content";

export const thresholdingGlobalOtsuAdaptativoContent: LessonContent = {
  id: "thresholding-global-otsu-adaptativo",
  title: "Thresholding Global, Otsu e Adaptativo",
  subtitle:
    "Três técnicas de binarização para cenários diferentes: quando usar threshold fixo, quando deixar Otsu decidir automaticamente e quando recorrer ao adaptativo.",
  description:
    "Uma aula comparativa sobre thresholding global manual, método de Otsu e thresholding adaptativo, mostrando quando cada técnica funciona melhor e como implementá-las em OpenCV.",
  primaryCategoryId: "inteligencia-artificial",
  secondaryCategoryId: "computacao",
  level: "Intermediário",
  estimatedTime: "40-50 min",
  tags: [
    "Visão Computacional",
    "Thresholding",
    "Otsu",
    "Adaptativo",
    "Binarização",
    "OpenCV",
  ],
  learningObjectives: [
    "Entender a diferença entre thresholding global, Otsu e adaptativo.",
    "Saber quando usar threshold fixo (cenas com iluminação uniforme).",
    "Compreender como o método de Otsu calcula automaticamente o threshold ideal para histogramas bimodais.",
    "Entender quando thresholding adaptativo é necessário (iluminação desigual).",
    "Implementar as três técnicas em OpenCV e comparar os resultados.",
    "Escolher a técnica apropriada para cada tipo de cena.",
  ],
  prerequisites: [
    "Conhecimento de imagem binária e histograma (aula anterior).",
    "Noção de threshold e separação objeto/fundo.",
    "Familiaridade básica com Python e OpenCV.",
  ],
  references: [
    {
      title: "A Threshold Selection Method from Gray-Level Histograms",
      source: "Nobuyuki Otsu, 1979 — IEEE Transactions on Systems, Man, and Cybernetics",
      url: "https://ieeexplore.ieee.org/document/4310076",
      note:
        "Artigo original do método de Otsu. Descreve o algoritmo que minimiza a variância intra-classe para encontrar o threshold ótimo.",
    },
    {
      title: "OpenCV Documentation — Thresholding",
      source: "OpenCV — Documentação oficial",
      url: "https://docs.opencv.org/4.x/d7/d4d/tutorial_py_thresholding.html",
      note:
        "Tutorial oficial sobre thresholding em OpenCV, cobrindo threshold global, Otsu e adaptativo com exemplos práticos.",
    },
    {
      title: "Digital Image Processing",
      source: "Gonzalez & Woods, 4th Edition — Pearson",
      url: "https://www.imageprocessingplace.com/",
      note:
        "Capítulo sobre segmentação por thresholding. Cobre técnicas globais e adaptativas com fundamentos matemáticos.",
    },
    {
      title: "Scikit-image — Thresholding",
      source: "scikit-image — Documentação oficial",
      url: "https://scikit-image.org/docs/stable/api/skimage.filters.html#module-skimage.filters.thresholding",
      note:
        "Documentação sobre técnicas de thresholding em Python, incluindo Otsu, Li, Yen, Sauvola e thresholding adaptativo.",
    },
    {
      title: "Computer Vision: Algorithms and Applications",
      source: "Richard Szeliski, 2nd Edition — Springer",
      url: "https://szeliski.org/Book/",
      note:
        "Seção sobre segmentação por thresholding e comparação de técnicas globais vs locais.",
    },
  ],
  heroVisual: "thresholding-hero",
  openingText:
    "Na aula anterior, aprendemos que o threshold é o valor de corte que separa objeto de fundo. Mas como escolher esse valor? E se a iluminação não for uniforme? Nesta aula, vamos comparar três técnicas: thresholding global (você escolhe o valor), Otsu (o algoritmo escolhe automaticamente) e adaptativo (cada região tem seu próprio threshold). Cada técnica resolve um tipo diferente de problema.",
  quickFacts: [
    {
      title: "Global = valor fixo",
      body:
        "Você escolhe um threshold e ele é aplicado à imagem inteira. Funciona bem quando a iluminação é uniforme e o histograma é bimodal.",
    },
    {
      title: "Otsu = automático",
      body:
        "O algoritmo calcula o threshold ideal analisando o histograma. Minimiza a variância intra-classe. Perfeito para histogramas bimodais.",
    },
    {
      title: "Adaptativo = local",
      body:
        "Cada região da imagem tem seu próprio threshold, calculado com base nos pixels vizinhos. Resolve problemas de iluminação desigual.",
    },
    {
      title: "Escolha pela cena",
      body:
        "Iluminação uniforme → Global ou Otsu. Iluminação desigual → Adaptativo. Histograma bimodal → Otsu é ideal.",
    },
  ],
  sections: [
    {
      id: "motivacao-tres-tecnicas",
      eyebrow: "Motivação",
      title: "Por que três técnicas diferentes?",
      lead:
        "Nem toda imagem tem iluminação uniforme. Cenas diferentes exigem abordagens diferentes de thresholding.",
      visual: "motivacao-tres-tecnicas",
      paragraphs: [
        "Na aula anterior, usamos um threshold fixo para binarizar a imagem. Isso funciona bem quando a iluminação é uniforme e o histograma tem dois picos claros. Mas e se a cena tiver sombras? E se metade da imagem estiver mais escura que a outra?",
        "Imagine uma foto de moedas sobre uma mesa com uma janela ao lado. As moedas perto da janela estão bem iluminadas, mas as moedas do outro lado estão na sombra. Um threshold global vai classificar corretamente as moedas na luz, mas falhará com as moedas na sombra — elas serão confundidas com o fundo.",
        "Para resolver esse problema, precisamos de técnicas diferentes para cenários diferentes. Thresholding global para cenas simples, Otsu para automação em cenas bem iluminadas, e adaptativo para cenas com iluminação desigual.",
      ],
      blocks: [
        {
          type: "insight",
          title: "Não existe técnica universal",
          body:
            "Cada técnica de thresholding resolve um tipo específico de problema. A escolha depende da iluminação da cena e da forma do histograma.",
        },
        {
          type: "mistake",
          title: "Usar threshold global para tudo",
          body:
            "Threshold global é simples e rápido, mas falha em cenas com iluminação desigual. Sempre analise a cena antes de escolher a técnica.",
        },
      ],
    },
    {
      id: "thresholding-global",
      eyebrow: "Técnica 1",
      title: "Thresholding Global: valor fixo",
      lead:
        "O thresholding global aplica o mesmo valor de corte a todos os pixels da imagem. É simples, rápido e funciona bem quando a iluminação é uniforme.",
      visual: "thresholding-global",
      interactive: "threshold-global-slider",
      paragraphs: [
        "No thresholding global, você escolhe um valor entre 0 e 255 e ele é aplicado uniformemente a toda a imagem. Pixels com intensidade acima do threshold viram 255 (objeto), pixels abaixo viram 0 (fundo).",
        "Em OpenCV, a função é cv2.threshold(gray, threshold_value, 255, cv2.THRESH_BINARY). O parâmetro threshold_value é o valor de corte que você escolhe manualmente, geralmente analisando o histograma.",
        "Quando funciona bem: cenas com iluminação uniforme, fundo homogêneo e histograma bimodal. Quando falha: cenas com sombras, gradientes de iluminação ou histogramas sem separação clara.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Thresholding Global",
          body:
            "Técnica de binarização que aplica um único valor de corte a todos os pixels da imagem. Simples e rápido, mas exige iluminação uniforme.",
        },
        {
          type: "example",
          title: "Thresholding global em OpenCV",
          body:
            "Aplicar threshold global é direto:",
          items: [
            "threshold_value = 127",
            "_, binary = cv2.threshold(gray, threshold_value, 255, cv2.THRESH_BINARY)",
            "Todos os pixels > 127 viram 255, os demais viram 0",
          ],
        },
        {
          type: "insight",
          title: "Analise o histograma antes de escolher",
          body:
            "O threshold ideal está no vale entre os dois picos do histograma bimodal. Sempre visualize o histograma antes de decidir o valor.",
        },
        {
          type: "mistake",
          title: "Usar o mesmo threshold para imagens diferentes",
          body:
            "Cada imagem tem características próprias. Um threshold que funciona para uma cena pode falhar para outra, mesmo que pareçam similares.",
        },
      ],
    },
    {
      id: "metodo-otsu",
      eyebrow: "Técnica 2",
      title: "Método de Otsu: threshold automático",
      lead:
        "O método de Otsu calcula automaticamente o threshold ideal para histogramas bimodais, minimizando a variância intra-classe entre objeto e fundo.",
      visual: "metodo-otsu",
      interactive: "otsu-comparador",
      paragraphs: [
        "O método de Otsu, proposto por Nobuyuki Otsu em 1979, é um algoritmo que encontra automaticamente o threshold ótimo para histogramas bimodais. Ele funciona testando todos os possíveis valores de threshold e escolhendo aquele que minimiza a variância intra-classe (a dispersão dos pixels dentro de cada grupo).",
        "A intuição é elegante: se o histograma tem dois picos (objeto e fundo), existe um ponto entre eles que separa os dois grupos da melhor forma possível. Otsu encontra esse ponto matematicamente, sem intervenção humana.",
        "Em OpenCV, aplicar Otsu é simples: cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU). O valor 0 é ignorado — o algoritmo calcula o threshold automaticamente e retorna o valor usado.",
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
            "O valor 0 é ignorado — Otsu calcula automaticamente",
            "A função retorna o threshold usado como segundo valor",
          ],
        },
        {
          type: "insight",
          title: "Otsu minimiza a variância intra-classe",
          body:
            "O algoritmo testa todos os thresholds possíveis e escolhe aquele que deixa os pixels do objeto mais próximos entre si e os pixels do fundo mais próximos entre si. É uma solução matematicamente ótima para histogramas bimodais.",
        },
        {
          type: "mistake",
          title: "Usar Otsu em histogramas não-bimodais",
          body:
            "Otsu funciona bem para histogramas com dois picos claros. Se o histograma é unimodal ou multimodal, o resultado pode ser ruim. Sempre visualize o histograma antes.",
        },
      ],
    },
    {
      id: "thresholding-adaptativo",
      eyebrow: "Técnica 3",
      title: "Thresholding Adaptativo: threshold local",
      lead:
        "O thresholding adaptativo calcula um threshold diferente para cada região da imagem, resolvendo problemas de iluminação desigual.",
      visual: "thresholding-adaptativo",
      interactive: "adaptativo-comparador",
      paragraphs: [
        "O thresholding adaptativo divide a imagem em pequenas regiões e calcula um threshold diferente para cada uma, com base nos pixels vizinhos. Isso permite lidar com cenas onde a iluminação varia ao longo da imagem.",
        "Existem duas variantes principais: adaptativo por média (ADAPTIVE_THRESH_MEAN_C) e adaptativo por gaussiano (ADAPTIVE_THRESH_GAUSSIAN_C). O primeiro usa a média dos pixels vizinhos, o segundo usa uma média ponderada por uma janela gaussiana.",
        "Em OpenCV: cv2.adaptiveThreshold(gray, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY, blockSize, C). O blockSize define o tamanho da janela vizinha (deve ser ímpar), e C é uma constante subtraída da média.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Thresholding Adaptativo",
          body:
            "Técnica que calcula um threshold diferente para cada região da imagem, usando a média ou mediana dos pixels vizinhos. Resolve problemas de iluminação desigual.",
        },
        {
          type: "example",
          title: "Adaptativo em OpenCV",
          body:
            "Aplicar thresholding adaptativo:",
          items: [
            "binary = cv2.adaptiveThreshold(gray, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY, 11, 2)",
            "blockSize = 11 (tamanho da janela vizinha, deve ser ímpar)",
            "C = 2 (constante subtraída da média)",
          ],
        },
        {
          type: "insight",
          title: "blockSize controla a granularidade",
          body:
            "blockSize pequeno = threshold mais local, sensível a detalhes. blockSize grande = threshold mais global, suaviza variações. Escolha com base na escala dos objetos.",
        },
        {
          type: "mistake",
          title: "Usar blockSize par",
          body:
            "O blockSize deve ser um número ímpar (11, 15, 21, etc.). Números pares causam erro no OpenCV porque a janela precisa ter um centro definido.",
        },
      ],
    },
    {
      id: "comparacao-tecnicas",
      eyebrow: "Comparação",
      title: "Quando usar cada técnica",
      lead:
        "Cada técnica de thresholding tem seu lugar. A escolha depende da iluminação da cena e da forma do histograma.",
      visual: "comparacao-tecnicas",
      paragraphs: [
        "Thresholding Global é ideal para cenas simples com iluminação uniforme e histograma bimodal. É rápido, simples e funciona bem quando as condições são controladas. Use quando você conhece a cena e pode escolher o threshold manualmente.",
        "Método de Otsu é perfeito para automatizar a escolha do threshold em cenas com iluminação uniforme e histograma bimodal. Ele elimina a necessidade de análise manual do histograma. Use quando você quer automação e a cena tem boa separação objeto/fundo.",
        "Thresholding Adaptativo é necessário quando a iluminação é desigual — sombras, gradientes, reflexos. Ele é mais lento e tem mais parâmetros (blockSize, C), mas resolve problemas que as outras técnicas não conseguem. Use quando a iluminação varia ao longo da imagem.",
      ],
      blocks: [
        {
          type: "example",
          title: "Tabela de decisão",
          body:
            "Guia rápido para escolher a técnica:",
          items: [
            "Iluminação uniforme + histograma bimodal → Global ou Otsu",
            "Iluminação uniforme + automação desejada → Otsu",
            "Iluminação desigual + sombras → Adaptativo",
            "Cena desconhecida → Teste Otsu primeiro, se falhar use Adaptativo",
          ],
        },
        {
          type: "insight",
          title: "Comece pelo mais simples",
          body:
            "Sempre tente thresholding global ou Otsu primeiro. Se o resultado for ruim, parta para o adaptativo. Técnicas mais simples são mais rápidas e têm menos parâmetros para ajustar.",
        },
        {
          type: "mistake",
          title: "Usar adaptativo para tudo",
          body:
            "Thresholding adaptativo é mais lento e tem mais parâmetros. Se a iluminação é uniforme, global ou Otsu são suficientes e mais eficientes.",
        },
      ],
    },
    {
      id: "parametros-adaptativo",
      eyebrow: "Aprofundamento",
      title: "Parâmetros do thresholding adaptativo",
      lead:
        "O thresholding adaptativo tem dois parâmetros críticos: blockSize (tamanho da janela) e C (constante de ajuste). Entender como ajustá-los é essencial.",
      visual: "parametros-adaptativo",
      paragraphs: [
        "O blockSize define o tamanho da janela vizinha usada para calcular o threshold local. Deve ser um número ímpar (11, 15, 21, etc.). blockSize pequeno (11-15) resulta em threshold mais local, sensível a detalhes e ruído. blockSize grande (21-51) resulta em threshold mais global, suavizando variações.",
        "O parâmetro C é uma constante subtraída da média (ou mediana) calculada. Valores positivos de C tornam o threshold mais rigoroso (menos pixels viram objeto). Valores negativos tornam o threshold mais permissivo (mais pixels viram objeto). O valor padrão é geralmente 2.",
        "A escolha dos parâmetros depende da escala dos objetos e da intensidade do ruído. Para objetos pequenos, use blockSize pequeno. Para objetos grandes, use blockSize grande. Se houver muito ruído, aumente o blockSize ou aplique filtro antes.",
      ],
      blocks: [
        {
          type: "definition",
          title: "blockSize",
          body:
            "Tamanho da janela vizinha usada para calcular o threshold local. Deve ser ímpar. Controla a granularidade do thresholding.",
        },
        {
          type: "definition",
          title: "C (constante)",
          body:
            "Valor subtraído da média calculada. Controla o rigor do threshold. Valores positivos = mais rigoroso, negativos = mais permissivo.",
        },
        {
          type: "example",
          title: "Ajustando parâmetros",
          body:
            "Exemplos de configurações:",
          items: [
            "Objetos pequenos + detalhe: blockSize=11, C=2",
            "Objetos grandes + suave: blockSize=31, C=2",
            "Muito ruído: blockSize=21, C=5 + filtro mediano antes",
          ],
        },
        {
          type: "insight",
          title: "Teste diferentes blockSize",
          body:
            "O blockSize ideal depende da escala dos objetos e da distância entre eles. Teste valores como 11, 21, 31, 51 e compare os resultados.",
        },
      ],
    },
    {
      id: "combinando-tecnicas",
      eyebrow: "Síntese",
      title: "Combinando técnicas e pré-processamento",
      lead:
        "Às vezes, a melhor solução é combinar técnicas: filtrar ruído antes, aplicar Otsu, e usar morfologia depois para limpar artefatos.",
      visual: "combinando-tecnicas",
      paragraphs: [
        "Na prática, raramente usamos thresholding isoladamente. O pipeline típico inclui: pré-processamento (filtro para reduzir ruído), thresholding (global, Otsu ou adaptativo), e pós-processamento (morfologia para limpar artefatos).",
        "Para cenas com ruído: aplique filtro mediano ou gaussiano antes do thresholding. Para cenas com iluminação desigual: tente equalização de histograma antes de Otsu, ou use adaptativo diretamente. Para resultados limpos: aplique opening/closing após o thresholding para remover buracos e ilhas.",
        "A ordem importa: filtro → thresholding → morfologia. Inverter a ordem pode piorar o resultado. Sempre valide visualmente cada etapa do pipeline.",
      ],
      blocks: [
        {
          type: "example",
          title: "Pipeline completo",
          body:
            "Exemplo de pipeline robusto:",
          items: [
            "1. Filtro: blur = cv2.GaussianBlur(gray, (5, 5), 0)",
            "2. Thresholding: _, binary = cv2.threshold(blur, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)",
            "3. Morfologia: binary = cv2.morphologyEx(binary, cv2.MORPH_OPEN, kernel)",
          ],
        },
        {
          type: "insight",
          title: "Pré-processamento é tão importante quanto thresholding",
          body:
            "Um bom filtro antes do thresholding pode fazer mais diferença do que escolher entre Otsu e adaptativo. Sempre considere o pipeline completo.",
        },
        {
          type: "mistake",
          title: "Ignorar pós-processamento",
          body:
            "Thresholding raramente produz resultado perfeito. Buracos no objeto e ilhas no fundo são comuns. Use morfologia (opening/closing) para limpar.",
        },
      ],
    },
    {
      id: "quiz-revisao",
      eyebrow: "Revisão",
      title: "Quiz de revisão",
      lead:
        "Teste se você entendeu quando usar cada técnica de thresholding e como ajustar os parâmetros.",
      interactive: "quiz",
      paragraphs: [
        "Use as perguntas para revisar o raciocínio. O objetivo é entender quando usar global, Otsu ou adaptativo, não memorizar código.",
      ],
    },
    {
      id: "glossario-proximos-estudos",
      eyebrow: "Glossário",
      title: "Glossário e próximos estudos",
      lead:
        "Consolide o vocabulário essencial para trabalhar com diferentes técnicas de thresholding.",
      interactive: "glossary",
      paragraphs: [
        "Dominar esses termos ajuda a escolher a técnica certa e ajustar parâmetros para cada cenário.",
      ],
    },
  ],
  summaryCards: [
    {
      title: "Global = valor fixo",
      body:
        "Você escolhe o threshold. Rápido e simples. Funciona com iluminação uniforme e histograma bimodal.",
    },
    {
      title: "Otsu = automático",
      body:
        "O algoritmo calcula o threshold ideal. Perfeito para histogramas bimodais. Elimina análise manual.",
    },
    {
      title: "Adaptativo = local",
      body:
        "Cada região tem seu threshold. Resolve iluminação desigual. Mais lento, mais parâmetros.",
    },
    {
      title: "Escolha pela cena",
      body:
        "Iluminação uniforme → Global ou Otsu. Iluminação desigual → Adaptativo. Na dúvida, teste Otsu primeiro.",
    },
    {
      title: "blockSize é crítico",
      body:
        "No adaptativo, blockSize controla a granularidade. Pequeno = detalhe, grande = suave. Deve ser ímpar.",
    },
    {
      title: "Pipeline completo",
      body:
        "Filtro → Thresholding → Morfologia. Pré e pós-processamento são tão importantes quanto o thresholding.",
    },
  ],
  quiz: [
    {
      id: "q1",
      prompt: "Quando usar thresholding global?",
      options: [
        { id: "a", label: "Quando a iluminação é uniforme e o histograma é bimodal." },
        { id: "b", label: "Quando a iluminação é desigual e há sombras." },
        { id: "c", label: "Sempre, porque é o mais rápido." },
      ],
      correctOptionId: "a",
      feedback:
        "Thresholding global funciona bem quando a iluminação é uniforme e o histograma tem dois picos claros. Para iluminação desigual, use adaptativo.",
    },
    {
      id: "q2",
      prompt: "O que o método de Otsu faz?",
      options: [
        { id: "a", label: "Calcula automaticamente o threshold ideal para histogramas bimodais." },
        { id: "b", label: "Aplica um threshold diferente para cada região da imagem." },
        { id: "c", label: "Remove ruído da imagem antes da binarização." },
      ],
      correctOptionId: "a",
      feedback:
        "Otsu calcula automaticamente o threshold que minimiza a variância intra-classe. Funciona bem para histogramas bimodais.",
    },
    {
      id: "q3",
      prompt: "Quando usar thresholding adaptativo?",
      options: [
        { id: "a", label: "Quando a iluminação é desigual e há sombras ou gradientes." },
        { id: "b", label: "Sempre, porque é o mais preciso." },
        { id: "c", label: "Quando o histograma é bimodal." },
      ],
      correctOptionId: "a",
      feedback:
        "Thresholding adaptativo é necessário quando a iluminação varia ao longo da imagem. Para iluminação uniforme, global ou Otsu são suficientes.",
    },
    {
      id: "q4",
      prompt: "O que é blockSize no thresholding adaptativo?",
      options: [
        { id: "a", label: "Tamanho da janela vizinha usada para calcular o threshold local. Deve ser ímpar." },
        { id: "b", label: "Número de blocos em que a imagem é dividida." },
        { id: "c", label: "Valor do threshold aplicado a cada bloco." },
      ],
      correctOptionId: "a",
      feedback:
        "blockSize define o tamanho da janela vizinha (ex: 11x11 pixels) usada para calcular o threshold local. Deve ser ímpar para ter um centro definido.",
    },
    {
      id: "q5",
      prompt: "O que acontece se blockSize for muito pequeno?",
      options: [
        { id: "a", label: "O threshold fica muito local, sensível a ruído e detalhes." },
        { id: "b", label: "O threshold fica muito global, perdendo detalhes." },
        { id: "c", label: "O OpenCV retorna erro." },
      ],
      correctOptionId: "a",
      feedback:
        "blockSize pequeno resulta em threshold muito local, que pode capturar ruído e variações indesejadas. Aumente o blockSize para suavizar.",
    },
    {
      id: "q6",
      prompt: "Qual a ordem correta do pipeline de segmentação?",
      options: [
        { id: "a", label: "Filtro → Thresholding → Morfologia." },
        { id: "b", label: "Thresholding → Filtro → Morfologia." },
        { id: "c", label: "Morfologia → Thresholding → Filtro." },
      ],
      correctOptionId: "a",
      feedback:
        "A ordem correta é: filtro (reduz ruído) → thresholding (binariza) → morfologia (limpa artefatos). Inverter pode piorar o resultado.",
    },
    {
      id: "q7",
      prompt: "Otsu funciona bem para histogramas unimodais?",
      options: [
        { id: "a", label: "Não, Otsu é otimizado para histogramas bimodais. Unimodais podem ter resultado ruim." },
        { id: "b", label: "Sim, Otsu funciona igualmente bem para qualquer tipo de histograma." },
        { id: "c", label: "Sim, mas é mais lento que thresholding global." },
      ],
      correctOptionId: "a",
      feedback:
        "Otsu minimiza a variância intra-classe, o que funciona bem quando há dois grupos distintos (bimodal). Para unimodais, o resultado pode ser ruim.",
    },
    {
      id: "q8",
      prompt: "Qual técnica usar para uma foto de documento com sombra?",
      options: [
        { id: "a", label: "Thresholding adaptativo, porque a iluminação é desigual." },
        { id: "b", label: "Thresholding global, porque é mais rápido." },
        { id: "c", label: "Otsu, porque é automático." },
      ],
      correctOptionId: "a",
      feedback:
        "Documentos com sombra têm iluminação desigual. Thresholding adaptativo calcula um threshold diferente para cada região, lidando bem com sombras.",
    },
  ],
  glossary: [
    {
      term: "Thresholding Global",
      definition:
        "Técnica de binarização que aplica um único valor de corte a todos os pixels da imagem. Simples e rápido, mas exige iluminação uniforme.",
    },
    {
      term: "Método de Otsu",
      definition:
        "Algoritmo que calcula automaticamente o threshold ótimo para histogramas bimodais, minimizando a variância intra-classe entre objeto e fundo.",
    },
    {
      term: "Thresholding Adaptativo",
      definition:
        "Técnica que calcula um threshold diferente para cada região da imagem, usando a média ou mediana dos pixels vizinhos. Resolve problemas de iluminação desigual.",
    },
    {
      term: "blockSize",
      definition:
        "Tamanho da janela vizinha usada no thresholding adaptativo. Deve ser ímpar. Controla a granularidade do threshold local.",
    },
    {
      term: "Variância intra-classe",
      definition:
        "Medida da dispersão dos pixels dentro de cada grupo (objeto e fundo). Otsu minimiza essa variância para encontrar o threshold ótimo.",
    },
    {
      term: "Histograma bimodal",
      definition:
        "Histograma com dois picos claros, indicando boa separação entre objeto e fundo. Ideal para Otsu e thresholding global.",
    },
    {
      term: "ADAPTIVE_THRESH_MEAN_C",
      definition:
        "Variante do thresholding adaptativo que usa a média aritmética dos pixels vizinhos para calcular o threshold local.",
    },
    {
      term: "ADAPTIVE_THRESH_GAUSSIAN_C",
      definition:
        "Variante do thresholding adaptativo que usa média ponderada por janela gaussiana. Mais suave que a média simples.",
    },
    {
      term: "Pipeline de segmentação",
      definition:
        "Sequência de etapas: pré-processamento (filtro) → thresholding → pós-processamento (morfologia). A ordem é crítica.",
    },
    {
      term: "Equalização de histograma",
      definition:
        "Técnica que redistribui as intensidades para melhorar o contraste. Pode ser usada antes de Otsu em cenas com baixo contraste.",
    },
    {
      term: "Iluminação uniforme",
      definition:
        "Condição onde todas as partes da cena recebem a mesma quantidade de luz. Permite uso de thresholding global ou Otsu.",
    },
    {
      term: "Iluminação desigual",
      definition:
        "Condição onde a luz varia ao longo da cena (sombras, gradientes). Exige thresholding adaptativo ou correção prévia.",
    },
  ],
};
