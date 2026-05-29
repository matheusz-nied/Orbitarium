import type { LessonContent } from "../../../types/content";

export const morfologiaMatematicaOpeningClosingElementosEstruturantesContent: LessonContent = {
  id: "morfologia-matematica-opening-closing-elementos-estruturantes",
  title: "Morfologia Matemática: Opening, Closing e Elementos Estruturantes",
  subtitle:
    "Como limpar ruídos, preencher buracos e controlar a forma dos objetos em imagens binárias usando erosão, dilatação e kernels.",
  description:
    "Uma aula visual e interativa sobre morfologia matemática aplicada à segmentação: erosão, dilatação, opening, closing, elemento estruturante, tamanho de kernel e erros comuns em imagens binárias.",
  primaryCategoryId: "inteligencia-artificial",
  secondaryCategoryId: "computacao",
  level: "Intermediário",
  estimatedTime: "40-50 min",
  tags: [
    "Visão Computacional",
    "Morfologia Matemática",
    "Erosão",
    "Dilatação",
    "Opening",
    "Closing",
    "OpenCV",
  ],
  learningObjectives: [
    "Entender por que imagens binárias quase sempre precisam de limpeza após o thresholding.",
    "Compreender erosão e dilatação como operações locais guiadas por um elemento estruturante.",
    "Diferenciar opening de closing e saber quando usar cada um.",
    "Entender como tamanho e formato do kernel alteram o resultado morfológico.",
    "Aplicar operações morfológicas em OpenCV usando cv2.erode, cv2.dilate e cv2.morphologyEx.",
    "Reconhecer erros comuns: kernel grande demais, ordem errada das operações e perda de objetos pequenos.",
  ],
  prerequisites: [
    "Conhecimento de imagem binária e thresholding.",
    "Noção de pixel, vizinhança e matriz de imagem.",
    "Familiaridade básica com Python/OpenCV é útil.",
  ],
  references: [
    {
      title: "OpenCV Documentation — Morphological Transformations",
      source: "OpenCV — Documentação oficial",
      url: "https://docs.opencv.org/4.x/d9/d61/tutorial_py_morphological_ops.html",
      note:
        "Tutorial oficial sobre erosão, dilatação, opening, closing, gradiente morfológico, top hat e black hat em OpenCV.",
    },
    {
      title: "Digital Image Processing",
      source: "Gonzalez & Woods, 4th Edition — Pearson",
      url: "https://www.imageprocessingplace.com/",
      note:
        "Referência clássica sobre morfologia matemática em processamento de imagens digitais.",
    },
    {
      title: "Image Analysis and Mathematical Morphology",
      source: "Jean Serra, 1982 — Academic Press",
      url: "https://www.sciencedirect.com/book/9780126372403/image-analysis-and-mathematical-morphology",
      note:
        "Obra fundamental de Jean Serra, um dos principais nomes da morfologia matemática aplicada a imagens.",
    },
    {
      title: "scikit-image — Morphological Filtering",
      source: "scikit-image — Documentação oficial",
      url: "https://scikit-image.org/docs/stable/auto_examples/applications/plot_morphology.html",
      note:
        "Exemplos práticos de erosão, dilatação, opening e closing com visualizações em Python.",
    },
    {
      title: "Mathematical Morphology and Its Applications to Image and Signal Processing",
      source: "ISMM — Springer Proceedings",
      url: "https://link.springer.com/conference/ismm",
      note:
        "Série de conferências e trabalhos reconhecidos sobre teoria e aplicações modernas de morfologia matemática.",
    },
  ],
  heroVisual: "morfologia-hero",
  openingText:
    "Thresholding raramente entrega uma imagem binária perfeita. Depois da binarização, aparecem pontos soltos no fundo, pequenos buracos dentro dos objetos, bordas serrilhadas e regiões coladas por ruído. A morfologia matemática é o kit de ferramentas que limpa essas imperfeições olhando para a vizinhança de cada pixel. Ela não tenta entender a cena inteira; ela pergunta: este pequeno padrão local deveria sobreviver, crescer, sumir ou preencher uma falha?",
  quickFacts: [
    {
      title: "Opera sobre forma",
      body:
        "Morfologia matemática modifica regiões binárias com base em vizinhança. Ela é especialmente útil depois de thresholding.",
    },
    {
      title: "Erosão encolhe",
      body:
        "Erosão remove pixels das bordas e elimina ruídos pequenos, mas também pode apagar objetos finos.",
    },
    {
      title: "Dilatação expande",
      body:
        "Dilatação cresce regiões brancas, conecta pequenas falhas e ajuda a preencher descontinuidades.",
    },
    {
      title: "Opening e closing",
      body:
        "Opening remove ruído branco pequeno. Closing fecha buracos pequenos e falhas internas no objeto.",
    },
  ],
  sections: [
    {
      id: "por-que-morfologia",
      eyebrow: "Motivação",
      title: "Por que a binarização ainda precisa de limpeza?",
      lead:
        "Depois do thresholding, a imagem binária geralmente contém artefatos. Morfologia matemática corrige esses defeitos usando regras locais de forma.",
      visual: "morfologia-motivacao",
      paragraphs: [
        "Uma imagem binária ideal teria objetos completos, fundo limpo e bordas coerentes. Na prática, thresholding produz ruído: pontos brancos soltos no fundo, pontos pretos dentro do objeto, pequenas pontes indevidas entre regiões e buracos causados por iluminação ou textura.",
        "A morfologia matemática resolve esses problemas sem precisar de redes neurais ou treinamento. Ela usa pequenas máscaras chamadas elementos estruturantes, que percorrem a imagem decidindo se uma região deve encolher, crescer, abrir ou fechar.",
        "Essa etapa é crucial antes de componentes conectados e contornos. Um único pixel ruidoso pode virar um blob falso; um buraco pequeno pode distorcer área e circularidade; uma conexão acidental pode juntar dois objetos que deveriam ficar separados.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Morfologia matemática",
          body:
            "Família de operações que analisam e modificam a forma de regiões em imagens, normalmente binárias, usando um elemento estruturante local.",
        },
        {
          type: "insight",
          title: "Morfologia é pós-processamento inteligente",
          body:
            "Ela não substitui uma boa binarização. Ela corrige defeitos locais que surgem depois dela, preparando a imagem para medir e contar objetos.",
        },
        {
          type: "mistake",
          title: "Esperar que thresholding resolva tudo",
          body:
            "Mesmo um threshold bom pode deixar ruído e buracos. Sem morfologia, etapas posteriores podem contar objetos falsos ou medir áreas erradas.",
        },
      ],
    },
    {
      id: "elemento-estruturante",
      eyebrow: "Fundamento",
      title: "Elemento estruturante: a régua que mede a vizinhança",
      lead:
        "O elemento estruturante, ou kernel, define qual vizinhança será usada para decidir o destino de cada pixel.",
      visual: "elemento-estruturante",
      paragraphs: [
        "Um elemento estruturante é uma pequena matriz, normalmente 3×3, 5×5 ou 7×7, que desliza sobre a imagem. Ele define quais pixels vizinhos entram na decisão morfológica. Um kernel quadrado considera todos os vizinhos; um kernel em cruz considera apenas vertical e horizontal; um elíptico preserva melhor formas arredondadas.",
        "O centro do kernel fica sobre o pixel analisado. A operação compara o padrão local da imagem com o padrão do kernel. Em erosão, todos os pontos exigidos pelo kernel precisam caber dentro do objeto. Em dilatação, basta que algum ponto relevante encontre o objeto para expandi-lo.",
        "O tamanho do kernel é uma escolha semântica: ele define a escala do que será considerado pequeno. Um ruído menor que o kernel tende a desaparecer; um buraco menor que o kernel tende a ser preenchido. Um kernel grande demais pode destruir detalhes legítimos.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Elemento estruturante / kernel",
          body:
            "Pequena matriz que define a vizinhança usada pelas operações morfológicas. Seu tamanho e formato controlam quais detalhes são preservados ou removidos.",
        },
        {
          type: "example",
          title: "Criando kernels em OpenCV",
          body:
            "Kernels comuns podem ser criados com NumPy ou OpenCV.",
          items: [
            "kernel = np.ones((3, 3), np.uint8)",
            "ellipse = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))",
            "cross = cv2.getStructuringElement(cv2.MORPH_CROSS, (3, 3))",
          ],
        },
        {
          type: "insight",
          title: "Kernel define a escala do problema",
          body:
            "Se o kernel é 5×5, detalhes menores que essa vizinhança podem ser removidos ou preenchidos. A operação não sabe o que é objeto: ela só sabe o tamanho do padrão local.",
        },
      ],
    },
    {
      id: "erosao-e-dilatacao",
      eyebrow: "Operações base",
      title: "Erosão e dilatação: encolher e expandir formas",
      lead:
        "Erosão remove pixels das bordas dos objetos. Dilatação adiciona pixels às bordas. Quase toda morfologia nasce da combinação dessas duas operações.",
      visual: "erosao-dilatacao",
      interactive: "erosao-dilatacao-simulador",
      paragraphs: [
        "Erosão pergunta: o kernel inteiro cabe dentro do objeto? Se não cabe, o pixel central vira fundo. O efeito visual é encolher regiões brancas, remover detalhes finos e apagar ruído branco pequeno.",
        "Dilatação faz o oposto: se o kernel toca algum pixel do objeto, o pixel central pode virar objeto. O efeito visual é expandir regiões brancas, engrossar bordas e conectar pequenas falhas.",
        "Essas operações são complementares, mas não inversas perfeitas. Erodir e depois dilatar não devolve exatamente a imagem original; detalhes menores que o kernel podem sumir definitivamente. Por isso a ordem importa.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Erosão",
          body:
            "Operação morfológica que encolhe regiões brancas, removendo pixels das bordas quando o elemento estruturante não cabe completamente dentro do objeto.",
        },
        {
          type: "definition",
          title: "Dilatação",
          body:
            "Operação morfológica que expande regiões brancas, adicionando pixels às bordas quando o elemento estruturante toca o objeto.",
        },
        {
          type: "example",
          title: "OpenCV básico",
          body:
            "As duas operações-base são diretas.",
          items: [
            "eroded = cv2.erode(binary, kernel, iterations=1)",
            "dilated = cv2.dilate(binary, kernel, iterations=1)",
          ],
        },
        {
          type: "mistake",
          title: "Achar que erosão + dilatação desfazem uma à outra",
          body:
            "Se a erosão apaga um detalhe pequeno, a dilatação posterior não sabe que ele existia. A informação perdida não volta.",
        },
      ],
    },
    {
      id: "opening",
      eyebrow: "Composição",
      title: "Opening: remover ruído branco pequeno",
      lead:
        "Opening é erosão seguida de dilatação. Ele remove pequenas partículas brancas sem expandir demais os objetos restantes.",
      visual: "opening-visual",
      paragraphs: [
        "Opening resolve um problema muito comum: pontos brancos soltos no fundo após thresholding. A erosão inicial apaga esses pontos pequenos. A dilatação posterior tenta restaurar o tamanho dos objetos maiores que sobreviveram à erosão.",
        "Pense em opening como passar uma peneira: objetos grandes passam e continuam presentes, mas ruídos menores que o elemento estruturante ficam para trás. A operação preserva estruturas maiores, mas remove detalhes brancos pequenos.",
        "Use opening quando a imagem binária tem ilhas brancas isoladas no fundo, respingos, poeira ou pixels claros acidentais. Não use com kernel grande demais se os objetos legítimos forem pequenos ou finos.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Opening",
          body:
            "Operação composta por erosão seguida de dilatação. Remove ruídos brancos pequenos e suaviza contornos sem aumentar o objeto principal.",
        },
        {
          type: "formula",
          title: "Opening em OpenCV",
          body: "A operação é chamada com MORPH_OPEN.",
          formula: "opening = cv2.morphologyEx(binary, cv2.MORPH_OPEN, kernel)",
        },
        {
          type: "insight",
          title: "Opening remove o que não sobrevive à erosão",
          body:
            "Se um ruído é menor que o kernel, ele desaparece na erosão e não volta na dilatação. Objetos maiores sobrevivem e são parcialmente restaurados.",
        },
      ],
    },
    {
      id: "closing",
      eyebrow: "Composição",
      title: "Closing: preencher buracos e falhas internas",
      lead:
        "Closing é dilatação seguida de erosão. Ele fecha buracos pequenos e conecta falhas estreitas dentro de objetos.",
      visual: "closing-visual",
      interactive: "opening-closing-comparador",
      paragraphs: [
        "Closing resolve o problema oposto ao opening. Se o objeto tem pequenos buracos pretos, rachaduras ou falhas internas, a dilatação inicial expande as regiões brancas até cobrir essas falhas. A erosão posterior tenta devolver o objeto ao tamanho original.",
        "A operação é útil quando o thresholding quebrou o objeto por textura, reflexo ou ruído escuro. Por exemplo: uma moeda segmentada pode ficar com pequenos pontos pretos internos; closing tende a preenchê-los.",
        "Como toda morfologia, closing também tem custo: se dois objetos estiverem muito próximos, uma dilatação grande pode conectá-los, e a erosão posterior pode não separá-los novamente. O tamanho do kernel precisa respeitar a distância entre objetos.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Closing",
          body:
            "Operação composta por dilatação seguida de erosão. Preenche buracos pequenos, fecha rachaduras e suaviza falhas internas nos objetos.",
        },
        {
          type: "formula",
          title: "Closing em OpenCV",
          body: "A operação é chamada com MORPH_CLOSE.",
          formula: "closing = cv2.morphologyEx(binary, cv2.MORPH_CLOSE, kernel)",
        },
        {
          type: "mistake",
          title: "Usar closing com objetos próximos demais",
          body:
            "Se o kernel for grande e os objetos estiverem próximos, a dilatação pode conectá-los. Depois disso, eles podem virar um único componente conectado.",
        },
      ],
    },
    {
      id: "tamanho-kernel",
      eyebrow: "Parâmetro crítico",
      title: "Tamanho do kernel: o botão que muda tudo",
      lead:
        "O tamanho do kernel define quais detalhes são tratados como ruído e quais são preservados como estrutura real.",
      visual: "tamanho-kernel",
      interactive: "kernel-size-playground",
      paragraphs: [
        "Kernel 3×3 faz mudanças pequenas: remove ruídos de um ou poucos pixels e preserva melhor detalhes finos. Kernel 5×5 é mais agressivo: remove partículas maiores e preenche buracos mais amplos. Kernel 7×7 ou maior pode deformar objetos pequenos.",
        "A pergunta prática é: qual é o tamanho do erro que você quer corrigir? Se o ruído tem 1 ou 2 pixels, 3×3 pode bastar. Se o buraco tem vários pixels, talvez 5×5 seja necessário. Mas se o objeto legítimo é fino, kernels grandes podem destruí-lo.",
        "A escolha deve ser feita visualmente e com métricas. Compare número de blobs, área média e contornos antes e depois da operação. Morfologia é poderosa, mas pode alterar medidas se for aplicada sem critério.",
      ],
      blocks: [
        {
          type: "insight",
          title: "Kernel é uma hipótese sobre escala",
          body:
            "Ao escolher 5×5, você está dizendo ao algoritmo: detalhes menores que isso provavelmente são imperfeições. Se essa hipótese estiver errada, a imagem será distorcida.",
        },
        {
          type: "example",
          title: "Comparar kernels",
          body:
            "Teste múltiplos tamanhos antes de decidir.",
          items: [
            "kernel_3 = np.ones((3, 3), np.uint8)",
            "kernel_5 = np.ones((5, 5), np.uint8)",
            "kernel_7 = np.ones((7, 7), np.uint8)",
          ],
        },
        {
          type: "mistake",
          title: "Escolher kernel por hábito",
          body:
            "Usar sempre 5×5 porque 'funciona' é perigoso. O tamanho certo depende da resolução da imagem, do tamanho do ruído e do tamanho dos objetos.",
        },
      ],
    },
    {
      id: "formato-kernel",
      eyebrow: "Formato",
      title: "Quadrado, cruz ou elipse? O formato também importa",
      lead:
        "Além do tamanho, o formato do elemento estruturante define quais direções e formas serão preservadas ou removidas.",
      visual: "formato-kernel",
      paragraphs: [
        "Um kernel quadrado considera todos os vizinhos ao redor do pixel central. Ele é forte e simétrico, mas pode alterar cantos e diagonais de forma mais agressiva. Um kernel em cruz considera apenas direções horizontal e vertical, preservando melhor algumas estruturas finas e evitando conexões diagonais.",
        "Um kernel elíptico é útil quando os objetos são arredondados, como moedas, células ou partículas circulares. Ele tende a preservar melhor a geometria de regiões curvas do que um kernel quadrado de mesmo tamanho.",
        "Na prática, a escolha do formato deve refletir a forma esperada dos objetos. Para objetos arredondados, tente elipse. Para estruturas ortogonais, cruz ou retângulo. Para limpeza geral, quadrado costuma ser o ponto de partida.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Formato do kernel",
          body:
            "Distribuição dos pixels ativos dentro do elemento estruturante. Pode ser retangular, elíptica, em cruz ou personalizada.",
        },
        {
          type: "example",
          title: "Kernels com getStructuringElement",
          body:
            "OpenCV já fornece formatos comuns.",
          items: [
            "cv2.MORPH_RECT: retangular",
            "cv2.MORPH_ELLIPSE: elíptico",
            "cv2.MORPH_CROSS: cruz",
          ],
        },
        {
          type: "insight",
          title: "Formato carrega conhecimento do domínio",
          body:
            "Se você sabe que os objetos são circulares, um kernel elíptico incorpora essa expectativa ao processamento.",
        },
      ],
    },
    {
      id: "pipeline-pratico",
      eyebrow: "Pipeline",
      title: "Como encaixar morfologia no notebook da atividade",
      lead:
        "Na prática, morfologia entra depois da binarização e antes de componentes conectados, contornos e extração de features.",
      visual: "pipeline-morfologia",
      paragraphs: [
        "O fluxo típico é: carregar imagem, converter para grayscale, aplicar threshold, limpar com morfologia, rotular componentes, extrair features e montar tabelas. Morfologia fica exatamente no meio: ela prepara a imagem binária para que a etapa de análise não seja contaminada por ruído.",
        "Para sua atividade, compare pelo menos dois tamanhos de kernel e duas operações: opening para remover ruído externo e closing para preencher buracos internos. Mostre lado a lado a imagem binária original e os resultados morfológicos.",
        "Depois, use métricas para justificar a escolha: número de blobs, áreas medidas, qualidade visual das bordas e presença de buracos. A melhor morfologia não é a mais agressiva; é a que melhora a imagem sem destruir informação relevante.",
      ],
      blocks: [
        {
          type: "example",
          title: "Código-base para a atividade",
          body:
            "Estrutura mínima para comparar operações.",
          items: [
            "kernel_3 = np.ones((3, 3), np.uint8)",
            "opening = cv2.morphologyEx(binary, cv2.MORPH_OPEN, kernel_3)",
            "closing = cv2.morphologyEx(binary, cv2.MORPH_CLOSE, kernel_3)",
            "plt.imshow(opening, cmap='gray')",
          ],
        },
        {
          type: "insight",
          title: "Justifique com antes/depois",
          body:
            "Não basta aplicar morfologia. Mostre visualmente o que melhorou e explique o trade-off: ruído removido, buracos preenchidos, detalhes perdidos ou objetos conectados.",
        },
      ],
    },
    {
      id: "erros-comuns",
      eyebrow: "Cuidados",
      title: "Erros comuns ao usar morfologia",
      lead:
        "Morfologia parece simples, mas escolhas erradas de ordem, kernel e iterações podem destruir a segmentação.",
      visual: "erros-morfologia",
      paragraphs: [
        "O erro mais comum é aplicar uma operação correta com kernel errado. Opening com kernel grande remove ruído, mas também remove objetos pequenos. Closing com kernel grande preenche buracos, mas também pode fundir objetos próximos.",
        "Outro erro é repetir iterações sem avaliar o efeito. iterations=3 não significa 'um pouco melhor'; significa aplicar a operação três vezes, o que pode alterar drasticamente a geometria dos objetos.",
        "Também é comum inverter a ordem por engano. Opening e closing usam as mesmas peças (erosão e dilatação), mas em ordens opostas. Trocar a ordem troca completamente o objetivo da operação.",
      ],
      blocks: [
        {
          type: "mistake",
          title: "Kernel grande demais",
          body:
            "Remove ruído, mas pode apagar objetos pequenos e deformar bordas. Sempre compare com o tamanho real dos objetos.",
        },
        {
          type: "mistake",
          title: "Iterações demais",
          body:
            "Cada iteração repete a operação. Várias iterações podem expandir, encolher ou destruir regiões de forma acumulativa.",
        },
        {
          type: "mistake",
          title: "Confundir opening com closing",
          body:
            "Opening remove ruído branco pequeno. Closing preenche buracos pretos pequenos. A ordem das operações muda o propósito.",
        },
      ],
    },
    {
      id: "quiz-revisao",
      eyebrow: "Revisão",
      title: "Quiz de revisão",
      lead:
        "Teste se você sabe escolher erosão, dilatação, opening, closing e kernels para diferentes problemas de segmentação.",
      interactive: "quiz",
      paragraphs: [
        "O objetivo é revisar raciocínio prático: qual operação resolve qual artefato e qual trade-off ela introduz.",
      ],
    },
    {
      id: "glossario-proximos-estudos",
      eyebrow: "Glossário",
      title: "Glossário e próximos estudos",
      lead:
        "Consolide os termos essenciais antes de avançar para conectividade, blobs e componentes conectados.",
      interactive: "glossary",
      paragraphs: [
        "Dominar esse vocabulário ajuda a documentar notebooks, explicar decisões na apresentação e depurar resultados de segmentação.",
      ],
    },
  ],
  summaryCards: [
    {
      title: "Morfologia limpa binários",
      body:
        "Ela corrige ruídos, buracos e falhas locais depois do thresholding e antes da análise de componentes.",
    },
    {
      title: "Erosão encolhe",
      body:
        "Remove pixels das bordas, apaga ruído branco pequeno e pode destruir objetos finos.",
    },
    {
      title: "Dilatação expande",
      body:
        "Adiciona pixels às bordas, conecta falhas pequenas e pode fundir objetos próximos.",
    },
    {
      title: "Opening remove ilhas",
      body:
        "Erosão seguida de dilatação. Ideal para ruído branco pequeno no fundo.",
    },
    {
      title: "Closing fecha buracos",
      body:
        "Dilatação seguida de erosão. Ideal para buracos pretos e rachaduras pequenas dentro do objeto.",
    },
    {
      title: "Kernel define escala",
      body:
        "Tamanho e formato do elemento estruturante determinam o que é considerado detalhe real ou imperfeição.",
    },
  ],
  quiz: [
    {
      id: "q1",
      prompt: "Qual é o objetivo principal da morfologia matemática em imagens binárias?",
      options: [
        { id: "a", label: "Modificar formas locais para remover ruídos, preencher falhas e preparar a imagem para análise." },
        { id: "b", label: "Converter uma imagem RGB para escala de cinza." },
        { id: "c", label: "Calcular automaticamente o threshold de Otsu." },
      ],
      correctOptionId: "a",
      feedback:
        "Morfologia atua sobre a forma de regiões binárias, corrigindo artefatos locais depois da binarização.",
    },
    {
      id: "q2",
      prompt: "O que a erosão faz em uma região branca?",
      options: [
        { id: "a", label: "Encolhe a região, removendo pixels das bordas." },
        { id: "b", label: "Expande a região, adicionando pixels nas bordas." },
        { id: "c", label: "Converte a região para tons de cinza." },
      ],
      correctOptionId: "a",
      feedback:
        "Erosão encolhe regiões brancas e remove detalhes ou ruídos menores que o elemento estruturante.",
    },
    {
      id: "q3",
      prompt: "Qual operação é mais indicada para remover pontos brancos pequenos no fundo?",
      options: [
        { id: "a", label: "Opening." },
        { id: "b", label: "Closing." },
        { id: "c", label: "Thresholding adaptativo." },
      ],
      correctOptionId: "a",
      feedback:
        "Opening é erosão seguida de dilatação. Ele remove partículas brancas pequenas que não sobrevivem à erosão.",
    },
    {
      id: "q4",
      prompt: "Qual operação é mais indicada para preencher pequenos buracos pretos dentro de um objeto branco?",
      options: [
        { id: "a", label: "Closing." },
        { id: "b", label: "Opening." },
        { id: "c", label: "Erosão isolada." },
      ],
      correctOptionId: "a",
      feedback:
        "Closing é dilatação seguida de erosão. Ele fecha buracos e falhas internas pequenas.",
    },
    {
      id: "q5",
      prompt: "Por que um kernel grande demais pode ser perigoso?",
      options: [
        { id: "a", label: "Porque pode remover objetos pequenos, deformar bordas ou fundir objetos próximos." },
        { id: "b", label: "Porque deixa a imagem colorida." },
        { id: "c", label: "Porque impede o OpenCV de carregar a imagem." },
      ],
      correctOptionId: "a",
      feedback:
        "Kernel grande altera a imagem numa escala maior. Isso pode destruir detalhes legítimos, não apenas corrigir ruído.",
    },
    {
      id: "q6",
      prompt: "Qual é a ordem correta do opening?",
      options: [
        { id: "a", label: "Erosão seguida de dilatação." },
        { id: "b", label: "Dilatação seguida de erosão." },
        { id: "c", label: "Threshold seguido de Otsu." },
      ],
      correctOptionId: "a",
      feedback:
        "Opening = erosão depois dilatação. Closing = dilatação depois erosão.",
    },
    {
      id: "q7",
      prompt: "Quando um kernel elíptico pode ser melhor que um quadrado?",
      options: [
        { id: "a", label: "Quando os objetos de interesse são arredondados, como moedas ou células." },
        { id: "b", label: "Quando a imagem está em RGB." },
        { id: "c", label: "Quando não existe ruído." },
      ],
      correctOptionId: "a",
      feedback:
        "O formato do kernel pode refletir a geometria esperada dos objetos. Elipses preservam melhor formas arredondadas.",
    },
    {
      id: "q8",
      prompt: "Onde a morfologia entra no pipeline clássico de segmentação?",
      options: [
        { id: "a", label: "Depois do thresholding e antes de componentes conectados, contornos e features." },
        { id: "b", label: "Antes de converter a imagem para escala de cinza." },
        { id: "c", label: "Depois da classificação final, apenas para visualização." },
      ],
      correctOptionId: "a",
      feedback:
        "Morfologia limpa a imagem binária antes que blobs, contornos e medidas geométricas sejam calculados.",
    },
  ],
  glossary: [
    {
      term: "Morfologia matemática",
      definition:
        "Família de operações que modifica formas em imagens, geralmente binárias, usando elementos estruturantes locais.",
    },
    {
      term: "Elemento estruturante",
      definition:
        "Pequena matriz, também chamada de kernel, que define a vizinhança usada pelas operações morfológicas.",
    },
    {
      term: "Kernel",
      definition:
        "Máscara usada para percorrer a imagem e aplicar uma operação local. Em morfologia, define tamanho e formato da vizinhança.",
    },
    {
      term: "Erosão",
      definition:
        "Operação que encolhe regiões brancas e remove pixels das bordas, útil para eliminar ruído branco pequeno.",
    },
    {
      term: "Dilatação",
      definition:
        "Operação que expande regiões brancas, engrossando bordas e conectando falhas pequenas.",
    },
    {
      term: "Opening",
      definition:
        "Erosão seguida de dilatação. Remove ruídos brancos pequenos e suaviza contornos.",
    },
    {
      term: "Closing",
      definition:
        "Dilatação seguida de erosão. Preenche buracos pretos pequenos e fecha rachaduras internas.",
    },
    {
      term: "MORPH_OPEN",
      definition:
        "Constante do OpenCV usada em cv2.morphologyEx para aplicar opening.",
    },
    {
      term: "MORPH_CLOSE",
      definition:
        "Constante do OpenCV usada em cv2.morphologyEx para aplicar closing.",
    },
    {
      term: "Iterações",
      definition:
        "Número de vezes que uma operação morfológica é repetida. Mais iterações aumentam o efeito cumulativo.",
    },
    {
      term: "Ruído branco",
      definition:
        "Pequenas regiões brancas indesejadas no fundo de uma imagem binária, frequentemente removidas com opening.",
    },
    {
      term: "Buraco interno",
      definition:
        "Pequena região preta dentro de um objeto branco, frequentemente preenchida com closing.",
    },
  ],
};
