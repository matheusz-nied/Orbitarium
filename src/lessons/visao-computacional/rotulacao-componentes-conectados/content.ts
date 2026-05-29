import type { LessonContent } from "../../../types/content";

export const rotulacaoComponentesConectadosContent: LessonContent = {
  id: "rotulacao-componentes-conectados",
  title: "Rotulação de Componentes Conectados",
  subtitle: "Como transformar blobs em IDs, estatísticas, centroides e tabelas prontas para análise.",
  description:
    "Aula prática sobre connected component labeling, labels, stats, centroids, área, bounding box, colormap, filtragem de ruído e histogramas de áreas com OpenCV.",
  primaryCategoryId: "inteligencia-artificial",
  secondaryCategoryId: "computacao",
  level: "Intermediário",
  estimatedTime: "40-50 min",
  tags: ["Visão Computacional", "Componentes Conectados", "Blobs", "OpenCV", "Labels", "Stats"],
  learningObjectives: [
    "Explicar o que é rotulação de componentes conectados e por que ela vem depois da binarização.",
    "Interpretar num_labels, labels, stats e centroids retornados pelo OpenCV.",
    "Extrair área, bounding box e centroide de cada blob.",
    "Criar visualização colorida por label para depurar segmentação.",
    "Filtrar blobs pequenos usando área mínima.",
    "Montar tabela de componentes para análise e apresentação.",
  ],
  prerequisites: [
    "Imagem binária limpa por thresholding e morfologia.",
    "Conectividade-4 e conectividade-8.",
    "Noção básica de arrays NumPy e OpenCV.",
  ],
  references: [
    { title: "OpenCV — Structural Analysis and Shape Descriptors", source: "OpenCV docs", url: "https://docs.opencv.org/4.x/d3/dc0/group__imgproc__shape.html", note: "Documenta connectedComponentsWithStats, contornos e descritores." },
    { title: "Connected-component labeling", source: "Rosenfeld & Pfaltz, 1966 — JACM", url: "https://dl.acm.org/doi/10.1145/321356.321357", note: "Trabalho clássico sobre rotulação de componentes." },
    { title: "Digital Image Processing", source: "Gonzalez & Woods", url: "https://www.imageprocessingplace.com/", note: "Fundamentos de componentes conectados e análise de regiões." },
    { title: "scikit-image measure.label", source: "scikit-image docs", url: "https://scikit-image.org/docs/stable/api/skimage.measure.html#skimage.measure.label", note: "Alternativa em Python para rotulação e regionprops." },
    { title: "Computer Vision: Algorithms and Applications", source: "Richard Szeliski", url: "https://szeliski.org/Book/", note: "Referência ampla sobre segmentação e análise de regiões." },
  ],
  heroVisual: "rotulacao-hero",
  openingText:
    "Depois de definir conectividade, a pergunta muda: quantos objetos existem e onde cada um está? Rotulação de componentes conectados percorre a imagem binária, dá um ID para cada blob e retorna estatísticas como área, bounding box e centroide. É aqui que uma imagem deixa de ser uma matriz e vira uma tabela de objetos mensuráveis.",
  quickFacts: [
    { title: "Cada blob recebe um ID", body: "O fundo normalmente é label 0; os objetos começam em 1, 2, 3..." },
    { title: "labels é uma imagem", body: "Cada pixel guarda o ID do componente ao qual pertence." },
    { title: "stats vira tabela", body: "OpenCV retorna left, top, width, height e area para cada componente." },
    { title: "centroids localizam", body: "Cada blob ganha um centro (cx, cy), útil para anotar e comparar objetos." },
  ],
  sections: [
    section("motivacao", "Motivação", "De blobs visuais para objetos mensuráveis", "Rotular componentes é transformar regiões conectadas em objetos com identidade.", "rotulacao-motivacao", undefined, ["Uma imagem binária limpa mostra regiões brancas, mas ainda não fornece uma lista de objetos. Rotular componentes cria essa lista: cada região conectada recebe um ID próprio.", "A partir do ID, podemos medir área, bounding box, centroide e filtrar ruídos. Sem rotulação, você vê objetos; com rotulação, você calcula sobre objetos.", "Essa etapa é central para a atividade porque gera as tabelas e imagens anotadas que sustentam a análise crítica."], [{ type: "definition", title: "Connected component labeling", body: "Processo de atribuir um rótulo numérico para cada região conectada de pixels de objeto." }, { type: "insight", title: "Rotulação é a ponte para pandas", body: "Depois que cada blob tem ID, suas estatísticas podem virar DataFrame, gráfico e relatório." }]),
    section("funcao-opencv", "OpenCV", "connectedComponentsWithStats", "A função do OpenCV retorna labels, stats e centroides em uma única chamada.", "funcao-opencv", "label-map-hover", ["A chamada principal é cv2.connectedComponentsWithStats(binary, connectivity=8). Ela percorre a imagem, agrupa pixels conectados e retorna quatro objetos.", "num_labels inclui o fundo. labels é uma imagem com o ID de cada pixel. stats é uma matriz de medidas por componente. centroids guarda o centro de massa aproximado de cada região.", "O índice 0 representa o fundo. Por isso, ao iterar objetos, normalmente começamos em label=1."], [{ type: "example", title: "Chamada-base", body: "num_labels, labels, stats, centroids = cv2.connectedComponentsWithStats(binary, connectivity=8)", items: ["labels: imagem de IDs", "stats: left, top, width, height, area", "centroids: cx, cy"] }, { type: "mistake", title: "Contar o fundo como objeto", body: "num_labels inclui o label 0, que é o fundo. O número de blobs é num_labels - 1." }]),
    section("labels", "Mapa de labels", "labels é uma imagem de IDs", "O mapa de labels tem o mesmo tamanho da imagem, mas cada pixel guarda o ID do blob.", "labels-visual", undefined, ["Se um pixel pertence ao blob 3, labels[y, x] vale 3. Se pertence ao fundo, vale 0. Isso permite selecionar todos os pixels de um objeto com labels == id.", "Visualizar labels com cores aleatórias é uma forma excelente de depurar. Se dois objetos aparecem com a mesma cor, foram unidos; se um objeto aparece dividido em várias cores, foi fragmentado.", "O mapa de labels também serve como máscara para calcular medidas customizadas que não vêm prontas em stats."], [{ type: "definition", title: "Label map", body: "Imagem em que cada pixel contém o ID do componente conectado ao qual pertence." }, { type: "insight", title: "Labels revelam erros invisíveis", body: "Às vezes a binária parece boa, mas o mapa colorido mostra fusões e fragmentações que mudam as medidas." }]),
    section("stats", "Stats", "Área e bounding box", "stats transforma cada blob em números prontos para tabela.", "stats-visual", "stats-table-demo", ["OpenCV retorna stats como uma matriz onde cada linha corresponde a um label. As colunas mais usadas são CC_STAT_LEFT, TOP, WIDTH, HEIGHT e AREA.", "A bounding box é o retângulo mínimo alinhado aos eixos que contém o componente. Ela é útil para desenhar anotações, recortar objetos e calcular proporções.", "A área retornada por stats é simplesmente o número de pixels do componente. Em imagens binárias, isso geralmente é a primeira métrica para filtrar ruído."], [{ type: "definition", title: "Bounding box", body: "Retângulo envolvente alinhado aos eixos, representado por x, y, largura e altura." }, { type: "example", title: "Acessando área", body: "area = stats[label, cv2.CC_STAT_AREA]" }]),
    section("centroides", "Centroides", "Onde está o centro de cada blob?", "centroids retorna a posição média dos pixels de cada componente.", "centroides-visual", undefined, ["O centroide é a média das coordenadas dos pixels do componente. Ele indica aproximadamente onde o objeto está localizado na imagem.", "É comum desenhar o ID do objeto próximo ao centroide. Isso ajuda a comparar tabela e imagem: a linha 4 do DataFrame corresponde ao objeto marcado como 4 no resultado visual.", "Centroide não é necessariamente o centro da bounding box. Em objetos assimétricos, buracos ou formas em C, os dois pontos podem divergir bastante."], [{ type: "definition", title: "Centroide", body: "Ponto médio calculado a partir das coordenadas dos pixels do componente." }, { type: "mistake", title: "Confundir centroide com centro da bounding box", body: "O centro da caixa ignora a distribuição real dos pixels; o centroide considera a massa do objeto." }]),
    section("colorizacao", "Visualização", "Mapa colorido de blobs", "Colorir cada componente facilita inspecionar fusões, fragmentações e ruídos.", "colorizacao-visual", undefined, ["Uma prática útil é criar uma imagem RGB vazia e atribuir uma cor aleatória para cada label. Assim, cada componente conectado aparece como uma região colorida distinta.", "Essa visualização é mais informativa que a binária pura. Ela deixa claro quantos objetos foram encontrados e se a conectividade escolhida produziu resultados coerentes.", "Também é possível sobrepor IDs, bounding boxes e centroides sobre a imagem original ou binária."], [{ type: "example", title: "Colorindo labels", body: "colored[labels == label] = color", items: ["Itere de 1 até num_labels - 1", "Ignore o fundo", "Use colormap fixo se quiser reprodutibilidade"] }]),
    section("filtragem", "Limpeza", "Filtrando blobs pequenos", "Depois da rotulação, ruídos podem ser removidos por área mínima.", "filtragem-visual", "area-filter-demo", ["Mesmo após morfologia, alguns componentes pequenos podem sobreviver. Como cada blob tem área, podemos filtrar tudo abaixo de um limite.", "O limite de área deve ser justificado pela escala da imagem. Se os objetos reais têm centenas de pixels, um blob com área 3 provavelmente é ruído. Mas se objetos reais são pequenos, o mesmo limite pode apagar informação importante.", "Filtrar por área é simples, interpretável e muito útil antes de calcular métricas agregadas."], [{ type: "insight", title: "Filtragem por área é uma regra de negócio", body: "A área mínima não é universal; ela depende do tamanho esperado dos objetos na sua cena." }, { type: "mistake", title: "Filtrar antes de inspecionar", body: "Se você remove blobs pequenos sem olhar, pode apagar objetos reais. Primeiro visualize, depois escolha o limite." }]),
    section("histograma-areas", "Análise", "Histograma de áreas", "A distribuição de áreas mostra ruídos, objetos típicos e outliers.", "histograma-areas-visual", undefined, ["Depois de extrair áreas, um histograma ajuda a entender a população de blobs. Um pico em áreas muito pequenas costuma indicar ruído residual.", "Blobs muito grandes podem indicar objetos unidos por falha de segmentação. Blobs muito pequenos podem indicar partículas, poeira ou buracos classificados como objeto.", "O histograma de áreas é uma excelente figura para justificar filtros e discutir limitações na apresentação."], [{ type: "definition", title: "Histograma de áreas", body: "Gráfico que mostra quantos componentes aparecem em cada faixa de área." }, { type: "insight", title: "Outliers contam histórias", body: "Um blob enorme pode ser dois objetos grudados; um blob minúsculo pode ser ruído que escapou da morfologia." }]),
    section("quiz-revisao", "Revisão", "Quiz de revisão", "Teste se você entende labels, stats, centroides, área e filtragem.", undefined, "quiz", ["Revise os conceitos centrais antes de avançar para contornos e features geométricas."], []),
    section("glossario", "Glossário", "Glossário e próximos estudos", "Consolide o vocabulário usado na rotulação de componentes conectados.", undefined, "glossary", ["Esses termos serão usados diretamente em contornos, área, perímetro, bounding box e classificação por regras."], []),
  ],
  summaryCards: [
    { title: "Labels dão identidade", body: "Cada pixel de objeto passa a pertencer a um componente com ID próprio." },
    { title: "stats vira tabela", body: "Área e bounding box vêm prontos em connectedComponentsWithStats." },
    { title: "Centroides localizam", body: "cx e cy ajudam a anotar IDs e sincronizar imagem com DataFrame." },
    { title: "Colorir ajuda depurar", body: "Mapa de labels colorido revela fusões, fragmentações e ruídos." },
    { title: "Área filtra ruído", body: "Blobs pequenos podem ser removidos com limite justificado pela escala." },
    { title: "Histograma explica", body: "Distribuição de áreas apoia decisões e análise crítica." },
  ],
  quiz: [
    q("q1", "O que o label 0 normalmente representa?", "O fundo da imagem.", "O primeiro objeto detectado.", "O maior blob.", "a", "Em OpenCV, label 0 corresponde ao fundo; objetos começam em 1."),
    q("q2", "Qual é o número real de blobs quando num_labels vale 9?", "8 blobs.", "9 blobs.", "10 blobs.", "a", "num_labels inclui o fundo. Logo, objetos = num_labels - 1."),
    q("q3", "O que labels armazena?", "O ID do componente de cada pixel.", "A cor RGB de cada blob.", "Só a área dos objetos.", "a", "labels tem o mesmo tamanho da imagem e guarda o ID do componente por pixel."),
    q("q4", "Qual métrica em stats é usada para filtrar ruído pequeno?", "Área.", "Top.", "Width isoladamente.", "a", "Área pequena é um critério simples para remover componentes que provavelmente são ruído."),
    q("q5", "O que a bounding box representa?", "O retângulo envolvente do componente.", "O contorno exato do objeto.", "O histograma do blob.", "a", "Bounding box é um retângulo alinhado aos eixos que contém o componente."),
    q("q6", "Por que colorir labels é útil?", "Para revelar fusões, fragmentações e ruídos visualmente.", "Para melhorar automaticamente o threshold.", "Para aumentar a resolução da imagem.", "a", "Cores por label facilitam verificar se os componentes fazem sentido."),
    q("q7", "Centroide é sempre igual ao centro da bounding box?", "Não, em formas assimétricas eles podem divergir.", "Sim, por definição.", "Só quando connectivity=4.", "a", "Centroide depende da distribuição dos pixels; centro da caixa depende apenas do retângulo."),
    q("q8", "Por que criar histograma de áreas?", "Para identificar ruídos pequenos, objetos típicos e outliers.", "Para converter a imagem para binário.", "Para escolher o canal RGB.", "a", "A distribuição de áreas ajuda a justificar filtros e discutir erros."),
  ],
  glossary: [
    g("Rotulação", "Atribuição de um ID numérico para cada componente conectado em uma imagem binária."),
    g("Label", "Identificador de um componente conectado. O fundo normalmente é label 0."),
    g("Label map", "Imagem em que cada pixel contém o ID do componente ao qual pertence."),
    g("num_labels", "Quantidade de labels retornada pelo OpenCV, incluindo o fundo."),
    g("stats", "Matriz de estatísticas por componente: left, top, width, height e area."),
    g("Centroid", "Centro médio dos pixels de um componente, retornado como coordenadas cx e cy."),
    g("Área", "Número de pixels pertencentes a um componente conectado."),
    g("Bounding box", "Retângulo envolvente alinhado aos eixos que contém o componente."),
    g("Colormap", "Mapeamento de labels para cores usado para visualizar componentes."),
    g("Filtro de área", "Regra que remove componentes abaixo de uma área mínima."),
    g("Outlier", "Componente com medida muito diferente do padrão, possivelmente ruído ou objeto unido."),
    g("connectedComponentsWithStats", "Função do OpenCV que rotula componentes e retorna labels, stats e centroides."),
  ],
};

function section(id: string, eyebrow: string, title: string, lead: string, visual: string | undefined, interactive: string | undefined, paragraphs: string[], blocks: LessonContent["sections"][number]["blocks"]) {
  return { id, eyebrow, title, lead, visual, interactive, paragraphs, blocks };
}

function q(id: string, prompt: string, a: string, b: string, c: string, correctOptionId: string, feedback: string) {
  return { id, prompt, options: [{ id: "a", label: a }, { id: "b", label: b }, { id: "c", label: c }], correctOptionId, feedback };
}

function g(term: string, definition: string) {
  return { term, definition };
}
