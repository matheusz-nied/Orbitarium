import type { LessonContent } from "../../../types/content";

export const deteccaoDeObjetosYoloContent: LessonContent = {
  id: "deteccao-de-objetos-yolo",
  title: "Detecção de Objetos: Bounding Boxes e YOLO",
  subtitle:
    "Como um detector transforma uma imagem inteira em caixas, classes e confianças em uma única passagem, conciliando localização, reconhecimento e velocidade.",
  description:
    "Uma aula intermediária sobre bounding boxes, IoU, objectness, supressão de duplicatas e a ideia central do YOLO como detector one-stage que prevê caixas e classes diretamente sobre a imagem.",
  primaryCategoryId: "inteligencia-artificial",
  secondaryCategoryId: "computacao",
  level: "Intermediário",
  estimatedTime: "45-60 min",
  tags: [
    "Visão Computacional",
    "Detecção de Objetos",
    "YOLO",
    "Bounding Boxes",
    "IoU",
    "NMS",
    "Deep Learning",
  ],
  learningObjectives: [
    "Entender por que detecção de objetos é diferente de classificação simples de imagens.",
    "Ler uma bounding box como uma hipótese geométrica sobre posição, escala e classe de um objeto.",
    "Interpretar IoU como medida de sobreposição usada em treino, avaliação e pós-processamento.",
    "Explicar a ideia central do YOLO: prever caixas e classes em uma única passagem pela imagem.",
    "Compreender os papéis de objectness, probabilidade de classe e score final de detecção.",
    "Entender por que NMS é necessário para remover duplicatas sem apagar objetos vizinhos reais.",
    "Diferenciar a intuição do YOLO original de evoluções posteriores como anchors e pirâmides multiescala.",
    "Reconhecer limitações práticas como objetos pequenos, oclusão, mudança de domínio e calibração de limiares.",
  ],
  prerequisites: [
    "Noções básicas de imagens digitais e pixels.",
    "Familiaridade geral com redes neurais convolucionais.",
    "Curiosidade sobre como sistemas localizam objetos em tempo real.",
  ],
  references: [
    {
      title: "You Only Look Once: Unified, Real-Time Object Detection",
      source: "Redmon, Divvala, Girshick e Farhadi, 2016 — arXiv/CVPR",
      url: "https://arxiv.org/abs/1506.02640",
      note:
        "Paper seminal do YOLO original. Introduz a formulação one-stage que prevê caixas e probabilidades diretamente da imagem inteira.",
    },
    {
      title: "You Only Look Once: Unified, Real-Time Object Detection",
      source: "CVPR 2016 Open Access",
      url: "https://www.cv-foundation.org/openaccess/content_cvpr_2016/html/Redmon_You_Only_Look_CVPR_2016_paper.html",
      note:
        "Versão publicada em conferência do trabalho original, útil para citação formal e leitura complementar.",
    },
    {
      title: "YOLO9000: Better, Faster, Stronger",
      source: "Redmon e Farhadi, 2016 — arXiv/CVPR 2017",
      url: "https://arxiv.org/abs/1612.08242",
      note:
        "Mostra a evolução da família YOLO com anchors, multi-scale training e expansão do vocabulário visual.",
    },
    {
      title: "Faster R-CNN: Towards Real-Time Object Detection with Region Proposal Networks",
      source: "Ren, He, Girshick e Sun, 2015 — arXiv/NeurIPS",
      url: "https://arxiv.org/abs/1506.01497",
      note:
        "Referência importante para comparar detectores em dois estágios com a filosofia one-stage do YOLO.",
    },
    {
      title: "Microsoft COCO: Common Objects in Context",
      source: "Lin et al., 2014 — arXiv",
      url: "https://arxiv.org/abs/1405.0312",
      note:
        "Benchmark central para detecção moderna, com objetos em cenas complexas e contexto realista.",
    },
    {
      title: "COCO Dataset",
      source: "COCO — site oficial",
      url: "https://cocodataset.org/#home",
      note:
        "Portal oficial do benchmark COCO com descrição das tarefas, métricas e downloads.",
    },
    {
      title: "Ultralytics YOLO Docs",
      source: "Ultralytics — documentação oficial",
      url: "https://docs.ultralytics.com/",
      note:
        "Documentação prática de variantes modernas de YOLO, útil para conectar os conceitos da aula ao uso aplicado.",
    },
  ],
  heroVisual: "hero",
  openingText:
    "Classificar uma imagem é responder algo como 'há um cachorro aqui?'. Detectar objetos é mais exigente: precisamos dizer onde está o cachorro, quantos existem, quão confiantes estamos e como evitar caixas duplicadas. O YOLO ficou famoso porque atacou esse problema de forma radicalmente simples para a época: olhar a imagem inteira uma vez só e prever caixas e classes de uma vez. Essa mudança de perspectiva trocou pipelines cheios de etapas por um detector unificado, rápido o suficiente para vídeo e forte o bastante para mudar o rumo da detecção moderna.",
  quickFacts: [
    {
      title: "Detectar não é só classificar",
      body:
        "O modelo precisa responder o que existe e também onde está, em geral com múltiplos objetos por imagem.",
    },
    {
      title: "Bounding box é hipótese geométrica",
      body:
        "Uma caixa resume posição e escala aproximadas do objeto. Ela é útil, mas nunca é a forma real do objeto.",
    },
    {
      title: "YOLO é one-stage",
      body:
        "Em vez de gerar propostas e refinar depois, ele aprende a prever caixas e classes diretamente em uma única passagem.",
    },
    {
      title: "NMS limpa duplicatas",
      body:
        "Sem pós-processamento, vários candidatos quase idênticos podem sobreviver para o mesmo objeto.",
    },
  ],
  sections: [
    s(
      "motivacao",
      "Ponto de partida",
      "Por que detecção de objetos é um problema mais difícil que classificação",
      "Quando há muitos objetos, apenas dizer a classe dominante da imagem não resolve a tarefa.",
      "hero",
      undefined,
      [
        "Uma rede de classificação olha a imagem inteira e produz uma etiqueta global. Isso funciona quando a pergunta é 'qual é o objeto principal?'. Já em vigilância, direção autônoma, varejo, robótica ou inspeção industrial, a pergunta real é outra: quantos objetos existem, onde estão e quais merecem atenção imediata.",
        "Detecção de objetos combina reconhecimento semântico com localização espacial. O sistema precisa diferenciar um gato de um cachorro, mas também desenhar uma caixa plausível ao redor de cada instância. Em uma cena densa, isso acontece várias vezes na mesma imagem.",
        "Essa dupla exigência cria um espaço de erro mais amplo. Uma detecção pode errar a classe, errar o tamanho da caixa, deslocar a localização ou duplicar o mesmo objeto várias vezes. O sucesso não depende apenas de 'acertar o rótulo', mas de alinhar semântica e geometria ao mesmo tempo.",
      ],
      [
        {
          type: "definition",
          title: "Detecção de objetos",
          body:
            "Tarefa de visão computacional que localiza e classifica múltiplos objetos em uma mesma imagem, geralmente produzindo caixas, classes e scores de confiança.",
        },
        {
          type: "insight",
          title: "O problema já nasce estruturado",
          body:
            "Detecção não devolve uma resposta única; devolve uma lista variável de hipóteses. Isso torna o problema naturalmente mais próximo de decisão estruturada do que de classificação plana.",
        },
      ],
    ),
    s(
      "bounding-boxes",
      "Geometria",
      "Bounding boxes: a linguagem mínima para dizer onde algo está",
      "Uma caixa não descreve o objeto inteiro em detalhe, mas oferece uma aproximação compacta, barata e muito útil.",
      "concept",
      "bbox-iou-lab",
      [
        "A bounding box costuma ser descrita por centro, largura e altura, ou pelos cantos superior esquerdo e inferior direito. Em ambos os casos, a ideia é a mesma: transformar localização em poucos números contínuos que podem ser previstos por regressão.",
        "Essa escolha é um compromisso engenhoso. Uma caixa retangular não segue contornos reais, não entende transparência e não distingue pose. Ainda assim, ela é suficiente para navegação, contagem, rastreamento, recorte e muitas aplicações industriais.",
        "Na prática, a caixa não é a verdade física do objeto; ela é uma convenção de anotação. Isso importa porque o modelo aprende a reproduzir essa convenção. Se o dataset for inconsistente sobre quanto fundo incluir ao redor do objeto, o detector herdará essa ambiguidade.",
      ],
      [
        {
          type: "definition",
          title: "Bounding box",
          body:
            "Retângulo anotado em torno de um objeto para resumir sua posição e sua extensão espacial aproximada.",
        },
        {
          type: "example",
          title: "Caixa boa o suficiente",
          body:
            "Para contar pessoas em uma fila, uma caixa aproximada já serve. Para medir a silhueta exata de uma ferramenta, seria melhor segmentação.",
        },
        {
          type: "mistake",
          title: "Confundir caixa com contorno real",
          body:
            "A box é uma aproximação retangular. Ela não representa detalhes finos do objeto, apenas sua ocupação espacial aproximada.",
        },
      ],
    ),
    s(
      "iou",
      "Medição",
      "IoU: quando duas caixas são parecidas o bastante?",
      "Detecção precisa de uma forma objetiva de comparar a caixa prevista com a caixa anotada.",
      "comparison",
      "bbox-iou-lab",
      [
        "Intersection over Union, ou IoU, mede a sobreposição relativa entre duas caixas. Ele é calculado como a área da interseção dividida pela área da união. Se as caixas coincidem perfeitamente, o valor é 1. Se não se encostam, é 0.",
        "Esse número aparece em vários momentos da vida de um detector. Durante a avaliação, ajuda a decidir se uma hipótese conta como acerto. Durante o pós-processamento, ajuda a identificar duplicatas. Em variantes modernas, também inspira funções de perda mais alinhadas à geometria da caixa.",
        "A beleza do IoU é que ele pune deslocamento, diferença de escala e mau alinhamento numa única medida. A limitação é que ele enxerga apenas sobreposição retangular. Duas caixas podem ter o mesmo IoU e, ainda assim, uma errar mais em largura enquanto a outra erra mais em posição.",
      ],
      [
        {
          type: "definition",
          title: "IoU",
          body:
            "Razão entre interseção e união de duas caixas. É a medida padrão de sobreposição em grande parte da detecção moderna.",
        },
        {
          type: "insight",
          title: "Um número, três usos",
          body:
            "IoU serve para casar previsão com anotação, decidir duplicatas no NMS e formular perdas geométricas mais informativas.",
        },
        {
          type: "mistake",
          title: "Score alto não garante boa localização",
          body:
            "Um detector pode estar muito confiante em uma classe e ainda produzir uma caixa mal encaixada. Score e IoU medem coisas diferentes.",
        },
      ],
    ),
    s(
      "yolo-core",
      "Arquitetura",
      "A grande ideia do YOLO: olhar a imagem uma vez e prever tudo direto",
      "O YOLO trocou pipelines fragmentados por uma rede única que aprende localização e classificação juntas.",
      "pipeline",
      "yolo-grid-lab",
      [
        "Antes do YOLO, muitos detectores seguiam uma lógica em dois estágios: primeiro sugerir regiões candidatas, depois classificar e refinar. O YOLO original propôs algo conceitualmente mais limpo: dividir o problema em regressão direta sobre a imagem inteira.",
        "No artigo seminal, a imagem é processada por uma única rede convolucional que prevê, para diferentes regiões, caixas e probabilidades de classe. A mensagem conceitual é poderosa: a detecção inteira vira uma função diferenciável fim a fim, treinada com o contexto da imagem completa.",
        "Essa visão unificada tem dois efeitos importantes. Primeiro, acelera a inferência porque evita várias etapas separadas. Segundo, força o modelo a raciocinar sobre contexto global: ao ver a cena inteira, o detector aprende melhor o que é objeto plausível e o que é fundo enganoso.",
      ],
      [
        {
          type: "definition",
          title: "Detector one-stage",
          body:
            "Família de modelos que prevê diretamente caixas e classes sem um estágio explícito separado de propostas de região.",
        },
        {
          type: "insight",
          title: "YOLO simplificou o pipeline mental",
          body:
            "A contribuição histórica do YOLO não foi só velocidade; foi mostrar que detecção podia ser pensada como uma previsão densa e unificada sobre a imagem inteira.",
        },
        {
          type: "example",
          title: "Contexto global ajuda",
          body:
            "Uma pequena textura circular pode ser confundida com roda, prato ou relógio. Ver a cena inteira ajuda a decidir qual objeto faz sentido naquele contexto.",
        },
      ],
    ),
    s(
      "objectness-scores",
      "Leitura da saída",
      "Objectness, classe e score final: como uma detecção ganha significado",
      "Uma caixa só se torna útil quando o modelo também estima se há objeto ali e de qual classe ele parece ser.",
      undefined,
      "yolo-grid-lab",
      [
        "Em detectores da família YOLO, a saída costuma combinar pelo menos três ingredientes conceituais: parâmetros geométricos da caixa, objectness e distribuição de classes. Objectness responde algo como 'há um objeto plausível aqui?'. As probabilidades de classe refinam 'se houver, do que se trata?'.",
        "O score final usado para filtrar detecções normalmente deriva da combinação entre confiança de objeto e probabilidade de classe. Isso é importante porque uma classe alta em uma região sem objeto confiável ainda é suspeita; e um objeto claro com classe mal distribuída também não basta.",
        "Essa decomposição ajuda o detector a separar duas dúvidas diferentes: existência e identidade. Em cenas difíceis, um modelo pode localizar algo bem mas hesitar entre classes próximas, ou ter certeza da classe mas incerteza sobre a caixa. Ler essas partes separadamente ajuda muito no diagnóstico.",
      ],
      [
        {
          type: "definition",
          title: "Objectness",
          body:
            "Estimativa de que uma região contém algum objeto relevante, independentemente da classe específica.",
        },
        {
          type: "insight",
          title: "Confiança não é uma só coisa",
          body:
            "Em detecção, 'confiança' mistura noções de existência, classe e qualidade da hipótese. Separar essas peças evita análises superficiais.",
        },
      ],
    ),
    s(
      "nms",
      "Pós-processamento",
      "Por que precisamos de NMS para impedir que o detector se repita",
      "Em torno de um mesmo objeto, o modelo costuma prever várias caixas parecidas. O pós-processamento decide qual sobrevive.",
      "tradeoff",
      "nms-lab",
      [
        "Imagine que o detector encontrou um carro. Em vez de devolver uma única caixa, ele pode devolver cinco caixas quase iguais, todas com scores altos. Isso não significa que o modelo 'não funciona'; é um efeito natural de predição densa sobre regiões vizinhas.",
        "Non-Maximum Suppression resolve esse excesso ordenando as hipóteses por score e removendo caixas muito sobrepostas em relação à melhor candidata. O limiar de IoU controla quão agressiva é essa limpeza. Um limiar muito baixo pode apagar objetos próximos reais; muito alto deixa duplicatas passarem.",
        "NMS é um detalhe de engenharia com efeito pedagógico importante: ele mostra que um detector não termina quando a rede neural termina. A saída bruta ainda precisa ser organizada para virar uma lista final coerente para a aplicação.",
      ],
      [
        {
          type: "definition",
          title: "Non-Maximum Suppression (NMS)",
          body:
            "Técnica de pós-processamento que preserva hipóteses mais confiantes e remove caixas redundantes com alta sobreposição.",
        },
        {
          type: "mistake",
          title: "Achar que NMS corrige tudo",
          body:
            "Se o detector produz scores ruins ou caixas sistematicamente mal localizadas, o NMS apenas reorganiza um problema que já nasceu fraco.",
        },
      ],
    ),
    s(
      "evolucao-yolo",
      "Evolução",
      "Do YOLO original às variantes modernas: anchors, multiescala e engenharia melhor",
      "A ideia histórica do YOLO permaneceu, mas vários detalhes operacionais evoluíram para lidar melhor com objetos de tamanhos e formatos variados.",
      "comparison",
      undefined,
      [
        "O YOLO original é seminal porque consolidou a filosofia one-stage. Depois dele, variantes introduziram anchors, treinamento multiescala, melhores backbones, feature pyramids e perdas mais refinadas para localização. Essas mudanças não negam a ideia original; elas a tornam mais robusta.",
        "Anchors ajudam a cobrir priors geométricos diferentes: caixas largas, altas, pequenas ou grandes. Já a leitura multiescala tenta resolver uma fraqueza clássica dos detectores rápidos: objetos pequenos, que desaparecem cedo demais se a representação espacial encolher demais.",
        "Essa evolução ensina uma lição importante de engenharia em IA: um paper seminal frequentemente traz a mudança de paradigma, e as gerações seguintes resolvem gargalos específicos de estabilidade, detalhe fino e cobertura de casos difíceis.",
      ],
      [
        {
          type: "insight",
          title: "Paradigma vs implementação",
          body:
            "Quando falamos 'YOLO' em prática, quase sempre nos referimos à família de ideias que nasceu no paper original, não apenas à versão de 2016 em estado puro.",
        },
        {
          type: "example",
          title: "Objetos pequenos pedem cuidado multiescala",
          body:
            "Uma placa distante ocupa poucos pixels. Se o detector perder resolução cedo demais, a semântica até pode existir, mas a caixa desaparece.",
        },
      ],
    ),
    s(
      "treino-avaliacao",
      "Treinamento e benchmark",
      "Dados, anotações e métricas moldam o que o detector aprende",
      "O comportamento de um detector depende tanto da arquitetura quanto do tipo de dado e da convenção de anotação.",
      "checklist",
      undefined,
      [
        "Datasets como COCO empurraram a detecção para cenários mais realistas: muitos objetos, classes variadas, oclusão, fundo confuso e diferenças grandes de escala. Isso tornou o problema mais próximo do mundo real e mais difícil ao mesmo tempo.",
        "Anotar boxes parece simples, mas não é trivial. Onde termina uma mochila parcialmente oculta? Quanto fundo incluir em uma bicicleta? Pessoas diferentes podem desenhar caixas ligeiramente diferentes, e o modelo aprende a média dessas decisões humanas.",
        "Na avaliação, não basta contar detecções. É preciso verificar se a classe está correta, se a localização tem IoU suficiente e se não houve duplicações desnecessárias. Métricas de benchmark resumem isso, mas inspeção visual continua essencial para entender fracassos qualitativos.",
      ],
      [
        {
          type: "mistake",
          title: "Treinar com dados limpos demais",
          body:
            "Se o conjunto de treino só tem objetos centrados, grandes e bem iluminados, o detector pode parecer ótimo em laboratório e fraco em produção.",
        },
        {
          type: "insight",
          title: "Anotação também é modelagem",
          body:
            "Ao escolher como rotular uma caixa, o dataset define uma noção prática de 'objeto correto'. O detector aprende exatamente essa noção.",
        },
      ],
    ),
    s(
      "limites",
      "Limitações",
      "Onde YOLO e detectores rápidos ainda sofrem",
      "Velocidade e unificação não eliminam os casos difíceis da percepção visual.",
      undefined,
      undefined,
      [
        "Objetos pequenos, fortemente ocluídos ou sobrepostos continuam sendo desafiadores. Em cenas densas, a separação entre caixas reais e duplicatas fica mais sensível aos limiares de score e NMS.",
        "Mudança de domínio também pesa: um detector treinado em fotos naturais pode falhar em imagens térmicas, satelitais, médicas ou industriais. A caixa prevista continua saindo, mas sua confiabilidade semântica diminui porque o modelo nunca viu esse estilo visual.",
        "Além disso, box detection tem um limite estrutural: ela responde 'onde aproximadamente está?'. Quando o problema exige forma exata, contorno fino ou medição precisa, segmentação por instâncias passa a ser uma escolha mais adequada.",
      ],
      [
        {
          type: "mistake",
          title: "Tratar score como probabilidade perfeita",
          body:
            "Scores de detecção são úteis para ranking e filtragem, mas podem ser mal calibrados. Em produção, convém validar limiares no domínio real.",
        },
        {
          type: "insight",
          title: "Velocidade não vence física do pixel",
          body:
            "Se o objeto ocupa pouquíssimos pixels ou está fortemente escondido, não há arquitetura mágica que recupere informação que quase não existe.",
        },
      ],
    ),
    s(
      "aplicacoes",
      "Aplicação",
      "Quando caixas rápidas resolvem o problema de negócio",
      "Nem toda aplicação precisa de segmentação fina; em muitos cenários, boxes rápidas e confiáveis já entregam muito valor.",
      undefined,
      undefined,
      [
        "Em varejo, detectar produtos ou pessoas pode apoiar contagem, prevenção de perdas e análise de fluxo. Em segurança, caixas ajudam a rastrear veículos ou pedestres em vídeo quase em tempo real. Em robótica, oferecem alvos iniciais para agarrar, evitar ou inspecionar.",
        "O ponto forte do YOLO está exatamente no equilíbrio entre custo e utilidade: caixas são compactas, rápidas de prever e suficientes para acionar decisões subsequentes. Muitas pipelines usam a detecção como primeira triagem, seguida de OCR, rastreamento, reidentificação ou segmentação apenas quando necessário.",
        "Essa modularidade é uma das razões pelas quais a detecção continua tão central. Ela raramente é o fim da história, mas muitas vezes é a porta de entrada operacional para sistemas visuais maiores.",
      ],
      [
        {
          type: "example",
          title: "Detecção como gatilho",
          body:
            "Primeiro localize a placa com um detector; depois aplique OCR apenas na região recortada. Isso reduz ruído e custo computacional.",
        },
      ],
    ),
    s(
      "resumo",
      "Síntese",
      "O que precisa ficar na memória sobre boxes e YOLO",
      "Consolide a relação entre geometria, confiança e pipeline unificado antes do quiz.",
      undefined,
      "summary-cards",
      [
        "Revise os pontos centrais: localização por caixas, medição por IoU, previsão direta one-stage e limpeza por NMS.",
      ],
      [],
    ),
    s(
      "quiz",
      "Revisão",
      "Quiz de revisão",
      "Teste se a lógica da detecção ficou coesa: caixas, IoU, objectness, YOLO e NMS.",
      undefined,
      "quiz",
      [
        "Use o quiz para checar se você sabe interpretar uma saída de detector, não apenas repetir siglas.",
      ],
      [],
    ),
    s(
      "glossario",
      "Glossário",
      "Termos essenciais",
      "Feche a aula fixando o vocabulário que aparece em papers, bibliotecas e benchmarks de detecção.",
      undefined,
      "glossary",
      [
        "Dominar esses termos ajuda a ler documentação, comparar modelos e diagnosticar falhas de pipeline.",
      ],
      [],
    ),
  ],
  summaryCards: [
    {
      title: "Detecção une semântica e geometria",
      body:
        "O detector precisa dizer o que existe e onde está, geralmente várias vezes na mesma imagem.",
    },
    {
      title: "Bounding box é aproximação útil",
      body:
        "A caixa não segue o contorno real, mas resume posição e escala de forma barata e operacional.",
    },
    {
      title: "IoU mede qualidade espacial",
      body:
        "Sobreposição entre previsão e anotação ajuda a avaliar acertos, casar hipóteses e remover duplicatas.",
    },
    {
      title: "YOLO tornou detecção unificada",
      body:
        "A grande virada foi prever caixas e classes diretamente em uma única passagem pela imagem inteira.",
    },
    {
      title: "Objectness e classe são dúvidas diferentes",
      body:
        "Primeiro o modelo estima se há objeto plausível; depois distingue qual classe melhor explica a região.",
    },
    {
      title: "NMS organiza a saída bruta",
      body:
        "Sem ele, um único objeto frequentemente aparece em várias caixas quase idênticas.",
    },
  ],
  quiz: [
    q(
      "q1",
      "O que diferencia detecção de objetos de classificação de imagem?",
      "Detecção precisa localizar e classificar múltiplos objetos na mesma imagem.",
      "Detecção trabalha apenas com imagens em preto e branco.",
      "Detecção não usa redes neurais convolucionais.",
      "a",
      "Classificação global responde uma etiqueta para a imagem inteira; detecção devolve uma lista de objetos com posição e classe.",
    ),
    q(
      "q2",
      "O que uma bounding box representa?",
      "Uma aproximação retangular da posição e extensão espacial do objeto.",
      "O contorno exato pixel a pixel do objeto.",
      "Uma medida de velocidade do detector.",
      "a",
      "A box é uma convenção geométrica compacta. Ela não substitui segmentação fina.",
    ),
    q(
      "q3",
      "Para que serve IoU em detecção?",
      "Medir a sobreposição entre duas caixas.",
      "Calcular o número de classes do dataset.",
      "Converter uma imagem colorida em escala de cinza.",
      "a",
      "IoU compara duas caixas pela razão entre interseção e união, sendo central em avaliação e pós-processamento.",
    ),
    q(
      "q4",
      "Qual é a ideia central do YOLO original?",
      "Prever caixas e classes diretamente da imagem inteira em uma única passagem.",
      "Segmentar cada objeto com máscaras antes de classificar.",
      "Rodar um classificador diferente para cada pixel da imagem.",
      "a",
      "O salto conceitual do YOLO foi tratar detecção como uma regressão unificada e fim a fim.",
    ),
    q(
      "q5",
      "O que objectness tenta estimar?",
      "Se existe um objeto plausível naquela hipótese de região.",
      "O número total de pixels da imagem.",
      "A largura ideal da caixa anotada no dataset.",
      "a",
      "Objectness separa a dúvida sobre existência da dúvida sobre identidade de classe.",
    ),
    q(
      "q6",
      "Por que NMS é necessário?",
      "Porque o detector costuma produzir várias caixas parecidas para o mesmo objeto.",
      "Porque IoU não pode ser calculado durante inferência.",
      "Porque a imagem precisa ser recortada em quadrados antes do treino.",
      "a",
      "Predição densa gera redundância; o NMS ajuda a transformar hipóteses brutas em uma lista final mais limpa.",
    ),
    q(
      "q7",
      "Qual caso costuma continuar difícil para detectores rápidos?",
      "Objetos pequenos, ocluídos ou muito sobrepostos.",
      "Objetos centralizados em fundo limpo.",
      "Imagens com apenas uma classe conhecida.",
      "a",
      "Quando a evidência visual é pequena ou ambígua, a localização e a classificação ficam mais frágeis.",
    ),
    q(
      "q8",
      "Quando segmentação pode ser melhor que detecção por boxes?",
      "Quando a forma exata do objeto importa, não apenas sua posição aproximada.",
      "Quando queremos apenas saber se há algum objeto na imagem.",
      "Quando a latência precisa ser muito baixa.",
      "a",
      "Boxes são ótimas para localização aproximada; contornos finos pedem uma representação mais detalhada.",
    ),
  ],
  glossary: [
    g("Detecção de objetos", "Tarefa que localiza e classifica múltiplos objetos em uma imagem."),
    g("Bounding box", "Retângulo usado para aproximar posição e escala de um objeto."),
    g("IoU", "Razão entre interseção e união de duas caixas."),
    g("One-stage detector", "Detector que prevê caixas e classes diretamente, sem estágio separado explícito de propostas."),
    g("YOLO", "Família de detectores one-stage iniciada pelo paper de Redmon et al. em 2016."),
    g("Objectness", "Estimativa de que uma hipótese contém algum objeto relevante."),
    g("Score", "Valor de confiança usado para ordenar e filtrar detecções."),
    g("NMS", "Supressão de hipóteses redundantes com alta sobreposição."),
    g("Anchor box", "Caixa de referência usada em muitas variantes modernas para cobrir formatos e escalas iniciais."),
    g("Oclusão", "Situação em que um objeto aparece parcialmente escondido por outro."),
    g("Domínio", "Tipo de imagem e contexto visual em que o modelo opera, como fotos naturais, raio X ou imagens industriais."),
    g("COCO", "Benchmark central para detecção, segmentação e outras tarefas de visão computacional."),
  ],
};

function s(
  id: string,
  eyebrow: string,
  title: string,
  lead: string,
  visual: string | undefined,
  interactive: string | undefined,
  paragraphs: string[],
  blocks: LessonContent["sections"][number]["blocks"],
) {
  return { id, eyebrow, title, lead, visual, interactive, paragraphs, blocks };
}

function q(
  id: string,
  prompt: string,
  a: string,
  b: string,
  c: string,
  correctOptionId: string,
  feedback: string,
) {
  return {
    id,
    prompt,
    options: [
      { id: "a", label: a },
      { id: "b", label: b },
      { id: "c", label: c },
    ],
    correctOptionId,
    feedback,
  };
}

function g(term: string, definition: string) {
  return { term, definition };
}
