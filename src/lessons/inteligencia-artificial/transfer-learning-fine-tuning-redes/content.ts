import type { LessonContent } from "../../../types/content";

export const transferLearningFineTuningRedesContent: LessonContent = {
  id: "transfer-learning-fine-tuning-redes",
  title: "Transfer Learning e Fine-tuning de Redes",
  subtitle:
    "Como reaproveitar conhecimento aprendido em uma tarefa grande para acelerar outra tarefa menor sem começar do zero.",
  description:
    "Uma aula visual sobre pré-treinamento, feature extractor, congelamento de camadas, fine-tuning, similaridade entre tarefas, catastrophic forgetting e estratégias práticas em visão computacional.",
  primaryCategoryId: "inteligencia-artificial",
  secondaryCategoryId: "computacao",
  level: "Intermediário",
  estimatedTime: "40-55 min",
  tags: [
    "Transfer Learning",
    "Fine-tuning",
    "Visão Computacional",
    "CNN",
    "Pré-treinamento",
    "ImageNet",
  ],
  learningObjectives: [
    "Entender por que pré-treinamento em datasets grandes produz representações reutilizáveis.",
    "Distinguir uso de backbone congelado de fine-tuning parcial ou total.",
    "Explicar por que camadas iniciais tendem a transferir melhor do que camadas finais.",
    "Relacionar tamanho do dataset alvo e similaridade de domínio à estratégia de adaptação.",
    "Reconhecer riscos de catastrophic forgetting durante fine-tuning agressivo.",
    "Planejar learning rates e descongelamento progressivo de forma mais segura.",
    "Conectar transfer learning ao restante da trilha de visão computacional do projeto.",
  ],
  prerequisites: [
    "Noção básica de CNNs e hierarquia de features.",
    "Entender que camadas profundas aprendem representações intermediárias e finais.",
    "Familiaridade inicial com treino supervisionado e validação.",
  ],
  references: [
    {
      title: "CS231n Notes: Transfer Learning",
      source: "Stanford CS231n",
      url: "https://cs231n.github.io/transfer-learning/",
      note:
        "Notas didáticas clássicas sobre feature extractor, fine-tuning e similaridade entre datasets em visão.",
    },
    {
      title: "Transfer Learning for Computer Vision Tutorial",
      source: "PyTorch — Documentação oficial",
      url: "https://docs.pytorch.org/tutorials/beginner/transfer_learning_tutorial.html",
      note:
        "Tutorial oficial mostrando as duas estratégias mais usadas: congelar backbone ou ajustar a rede pré-treinada.",
    },
    {
      title: "A Survey on Transfer Learning",
      source: "Pan & Yang, 2010 — IEEE TKDE",
      url: "https://doi.org/10.1109/TKDE.2009.191",
      note:
        "Survey clássico que organiza o campo de transfer learning e dá vocabulário conceitual para diferentes formas de transferência.",
    },
    {
      title: "How transferable are features in deep neural networks?",
      source: "Yosinski et al., 2014 — arXiv",
      url: "https://arxiv.org/abs/1411.1792",
      note:
        "Artigo fundamental para a intuição de que camadas rasas são mais gerais e camadas profundas mais específicas.",
    },
    {
      title: "ImageNet Classification with Deep Convolutional Neural Networks",
      source: "Krizhevsky, Sutskever & Hinton, 2012 — NeurIPS",
      url: "https://proceedings.neurips.cc/paper/2012/file/c399862d3b9d6b76c8436e924a68c45b-Paper.pdf",
      note:
        "Marco do pré-treinamento visual moderno que se tornou base para inúmeras transferências posteriores.",
    },
    {
      title: "Transfer learning & fine-tuning",
      source: "Keras — Documentação oficial",
      url: "https://keras.io/guides/transfer_learning/",
      note:
        "Guia prático sobre congelamento, BatchNorm e cuidados operacionais no fine-tuning.",
    },
  ],
  heroVisual: "hero",
  openingText:
    "Treinar uma rede visual grande do zero exige muito dado, muito cálculo e muita estabilidade. Transfer learning muda o jogo ao permitir que um modelo aproveite regularidades já aprendidas em uma tarefa ampla, como ImageNet, e as reutilize em outra tarefa menor. Em vez de começar com pesos aleatórios, começamos com detectores de borda, textura, partes e formas já organizados. A pergunta deixa de ser 'como aprender tudo de novo?' e passa a ser 'quanto desse conhecimento prévio eu devo preservar e quanto devo adaptar?'",
  quickFacts: [
    {
      title: "Pré-treinamento vira ponto de partida",
      body:
        "Backbones pré-treinados já trazem representações visuais úteis antes mesmo de ver o dataset alvo.",
    },
    {
      title: "Camadas rasas tendem a ser mais gerais",
      body:
        "Bordas, cantos e texturas simples costumam transferir bem entre muitos problemas visuais.",
    },
    {
      title: "Ajustar tudo nem sempre é melhor",
      body:
        "Se o dataset alvo é pequeno ou distante do de origem, fine-tuning total pode destruir conhecimento útil e overfitar rápido.",
    },
  ],
  sections: [
    {
      id: "motivacao",
      eyebrow: "Motivação",
      title: "Por que reaproveitar uma rede já treinada é tão valioso?",
      lead:
        "Pré-treinamento condensa milhões de exemplos em um conjunto de pesos que já sabe algo sobre a estrutura do mundo visual.",
      visual: "hero",
      paragraphs: [
        "Treinar do zero significa descobrir, a partir de pesos aleatórios, como detectar bordas, texturas, partes e objetos. Isso é caro em dados e em tempo. Quando usamos um backbone pré-treinado, todo esse caminho inicial já foi parcialmente percorrido.",
        "Em muitos problemas reais, o dataset alvo é pequeno: algumas centenas, alguns milhares ou algumas dezenas de milhares de imagens. Isso raramente basta para aprender do zero representações profundas tão boas quanto as extraídas de um pré-treinamento grande.",
        "Transfer learning transforma conhecimento acumulado em vantagem prática. Em vez de pedir à rede que redescubra a visão básica do zero, pedimos apenas que ela a ajuste ao novo contexto.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Transfer learning",
          body:
            "Uso de conhecimento aprendido em uma tarefa ou domínio de origem para melhorar o desempenho em uma nova tarefa ou domínio alvo.",
        },
        {
          type: "insight",
          title: "Os pesos viram memória útil",
          body:
            "Um modelo pré-treinado não guarda imagens específicas, mas organiza detectores e representações que já capturam regularidades visuais importantes.",
        },
      ],
    },
    {
      id: "feature-extractor",
      eyebrow: "Estratégia 1",
      title: "Usar a CNN como extratora fixa de features",
      lead:
        "A opção mais conservadora é congelar o backbone e treinar apenas a cabeça final para a nova tarefa.",
      visual: "concept",
      interactive: "freeze-lab",
      paragraphs: [
        "Quando congelamos quase toda a rede, assumimos que as representações aprendidas no pré-treinamento já são suficientemente úteis para o novo problema. O que muda é apenas a camada que transforma essas features em saídas específicas da nova tarefa.",
        "Essa abordagem é muito atraente quando o dataset alvo é pequeno, quando temos pouco orçamento computacional ou quando queremos evitar overfitting agressivo. O backbone funciona como um extrator visual genérico; a cabeça aprende a interpretar esse vocabulário para a nova tarefa.",
        "O limite é claro: se o domínio alvo é muito diferente do domínio de origem, congelar demais pode impedir adaptações necessárias. O modelo passa a ver o novo mundo com óculos velhos demais.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Feature extractor",
          body:
            "Uso de um backbone pré-treinado com pesos congelados para gerar representações, treinando apenas a camada ou o head final da nova tarefa.",
        },
        {
          type: "example",
          title: "Exemplo típico",
          body:
            "Usar uma ResNet pré-treinada em ImageNet para extrair features e treinar apenas um classificador final para distinguir defeitos em peças industriais.",
        },
      ],
    },
    {
      id: "fine-tuning",
      eyebrow: "Estratégia 2",
      title: "Fine-tuning ajusta o backbone ao novo domínio",
      lead:
        "Quando o dataset alvo e o domínio justificam, descongelar parte da rede permite adaptar melhor as representações internas.",
      visual: "pipeline",
      interactive: "similarity-lab",
      paragraphs: [
        "No fine-tuning, começamos com pesos pré-treinados, mas permitimos que parte ou toda a rede continue aprendendo no novo dataset. Isso é mais poderoso do que um feature extractor fixo porque atualiza não só a cabeça, mas a própria linguagem interna da representação visual.",
        "O risco é que essa liberdade extra pode apagar conhecimento útil, especialmente se o dataset alvo for pequeno, ruidoso ou muito desbalanceado. Um fine-tuning agressivo com learning rate alto pode causar catastrophic forgetting: a rede deixa de aproveitar o que sabia antes e passa a se adaptar de forma instável demais ao novo contexto.",
        "Por isso, o fine-tuning bem feito costuma ser gradual: treina-se primeiro a cabeça, depois descongelam-se blocos superiores, frequentemente com learning rates menores para o backbone do que para o head novo.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Fine-tuning",
          body:
            "Processo de continuar o treinamento de um modelo pré-treinado, ajustando parte ou todos os pesos para a nova tarefa.",
        },
        {
          type: "mistake",
          title: "Erro comum",
          body:
            "Descongelar tudo imediatamente com learning rate alto. Isso pode destruir rapidamente representações úteis aprendidas no pré-treinamento.",
        },
      ],
    },
    {
      id: "camadas-gerais-especificas",
      eyebrow: "Profundidade",
      title: "Camadas iniciais tendem a ser mais gerais; camadas finais, mais específicas",
      lead:
        "Essa é uma das ideias mais úteis de todo transfer learning moderno: não transferimos todas as camadas com a mesma expectativa.",
      paragraphs: [
        "As primeiras camadas de uma CNN normalmente capturam estruturas muito genéricas: bordas, orientações, texturas básicas e pequenos contrastes. Essas pistas aparecem em muitos datasets visuais, então costumam transferir muito bem.",
        "Conforme subimos na rede, as representações ficam mais ajustadas ao objetivo do pré-treinamento. Se a tarefa original exigia diferenciar muitas raças de cachorro, parte das camadas profundas pode ter ficado especializada em nuances que não ajudam tanto em radiografias, imagens de satélite ou inspeção industrial.",
        "Esse gradiente entre generalidade e especificidade é o motivo pelo qual descongelamento parcial funciona tão bem. Ele permite preservar blocos mais universais e adaptar melhor os blocos que provavelmente carregam viés forte da tarefa de origem.",
      ],
      blocks: [
        {
          type: "insight",
          title: "Transferir não é decisão binária",
          body:
            "A boa pergunta não é só 'uso pré-treinamento ou não?'. É 'quais partes da rede eu preservo e quais partes eu adapto?'.",
        },
        {
          type: "example",
          title: "Leitura prática",
          body:
            "Se o novo problema ainda é classificação de objetos naturais, camadas profundas podem transferir bem. Se o domínio muda muito, elas podem exigir adaptação maior.",
        },
      ],
    },
    {
      id: "tamanho-similaridade",
      eyebrow: "Decisão",
      title: "Tamanho do dataset e similaridade do domínio guiam a estratégia",
      lead:
        "Quanto menor o dataset e quanto maior a distância para o domínio de origem, mais cuidado precisamos ter na adaptação.",
      visual: "comparison",
      paragraphs: [
        "Se o dataset alvo é pequeno e parecido com o dataset de origem, congelar bastante costuma funcionar bem. Se ele é grande e parecido, fine-tuning parcial ou total pode capturar ganhos adicionais. Se é pequeno e muito diferente, a situação fica delicada: pré-treinamento ainda ajuda, mas um ajuste agressivo pode overfitar ou esquecer rápido demais.",
        "Essa matriz mental é mais útil do que qualquer regra fixa. Transfer learning é uma engenharia de compatibilidade entre duas tarefas: a de origem, que produziu a representação, e a de destino, que quer reutilizá-la.",
        "Também vale lembrar que 'distância de domínio' não é apenas assunto da imagem parecer diferente. Mudam estatísticas, texturas, escalas, ruído, objetivo da tarefa e até semântica do que conta como relevante.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Similaridade de domínio",
          body:
            "Grau de proximidade entre o tipo de dado e o objetivo da tarefa de origem e o tipo de dado e objetivo da tarefa alvo.",
        },
      ],
    },
    {
      id: "catastrophic-forgetting",
      eyebrow: "Risco",
      title: "Catastrophic forgetting acontece quando adaptar demais apaga o que era útil",
      lead:
        "Fine-tuning não é só adicionar conhecimento novo; ele também pode substituir conhecimento antigo de forma destrutiva.",
      interactive: "fine-tuning-scenarios",
      paragraphs: [
        "Quando o learning rate é alto ou o dataset alvo é pequeno demais, o backbone pode se mover rápido demais em direção a padrões específicos do novo conjunto. Em vez de adaptar gradualmente, ele abandona regularidades mais gerais que vinham do pré-treinamento.",
        "O resultado é paradoxal: a rede passou a treinar mais livremente, mas terminou pior. Isso acontece porque o conhecimento prévio era um recurso valioso e foi corrompido antes de ser convertido em vantagem na nova tarefa.",
        "Estratégias como descongelamento progressivo, learning rates discriminativos e monitoramento cuidadoso da validação existem justamente para reduzir esse risco.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Catastrophic forgetting",
          body:
            "Perda rápida de conhecimento útil previamente aprendido quando o modelo é ajustado de forma agressiva em uma nova tarefa.",
        },
        {
          type: "mistake",
          title: "Erro comum",
          body:
            "Interpretar melhora inicial de treino como sinal de que o backbone está sendo adaptado corretamente, sem observar a validação.",
        },
      ],
    },
    {
      id: "learning-rates",
      eyebrow: "Técnica",
      title: "Learning rates diferentes para backbone e head costumam ser mais seguros",
      lead:
        "A cabeça nova precisa aprender rápido; o backbone pré-treinado geralmente precisa de ajustes mais delicados.",
      visual: "tradeoff",
      paragraphs: [
        "O head novo começa praticamente do zero e costuma exigir passos maiores para aprender. Já o backbone carrega representações úteis que não devem ser desmontadas abruptamente. Por isso é comum usar learning rate menor para blocos pré-treinados.",
        "Esse princípio aparece em fine-tuning discriminativo, onde diferentes grupos de camadas recebem intensidades de atualização diferentes. Camadas mais profundas podem ser liberadas com mais cautela, enquanto o head recebe maior flexibilidade inicial.",
        "É uma maneira concreta de respeitar a assimetria entre 'aprender algo novo' e 'preservar algo valioso enquanto adapta'.",
      ],
      blocks: [
        {
          type: "insight",
          title: "Nem todos os pesos merecem o mesmo passo",
          body:
            "O head é novato; o backbone é veterano. Tratar ambos como iguais costuma ser uma simplificação cara.",
        },
      ],
    },
    {
      id: "trilha-visao",
      eyebrow: "Conexão",
      title: "Transfer learning é a ponte para tarefas densas da trilha de visão computacional",
      lead:
        "Segmentação, detecção e classificação especializada raramente começam do zero em projetos reais.",
      visual: "checklist",
      paragraphs: [
        "Na prática, boa parte das arquiteturas de visão reaproveita backbones pré-treinados e acopla heads específicas. U-Net, FPN, Mask R-CNN, segmentadores semânticos e detectores modernos quase sempre se beneficiam de representações aprendidas previamente.",
        "Isso conecta diretamente esta aula às lições já existentes no projeto sobre segmentação semântica, segmentação por instâncias e comparação entre pipelines clássicos e profundos. Em todas elas, transfer learning ajuda a explicar por que modelos profundos conseguem começar tão fortes mesmo em datasets menores.",
        "Entender essa ponte também ajuda a ler papers e repositórios reais, onde 'backbone pré-treinado' aparece como pressuposto básico e não como detalhe opcional.",
      ],
      blocks: [
        {
          type: "example",
          title: "Leitura de arquitetura real",
          body:
            "Em muitos modelos de segmentação, o encoder é uma CNN pré-treinada; o decoder aprende a transformar essas features em máscaras densas.",
        },
      ],
    },
    {
      id: "limites",
      eyebrow: "Limites",
      title: "Nem todo pré-treinamento transfere igualmente bem",
      lead:
        "Transfer learning é poderoso, mas depende da qualidade do pré-treinamento, da distância entre tarefas e do protocolo de adaptação.",
      paragraphs: [
        "Se o domínio de origem é estreito demais, o backbone pode carregar vieses fortes que não ajudam no alvo. Se o dataset alvo é muito diferente ou se a resolução e a física do dado mudam radicalmente, parte da representação precisará ser reconstruída.",
        "Também existe o risco de sobreconfiar no pré-treinamento e ignorar o valor de dados-alvo melhores, augmentações adequadas ou heads mais coerentes com a tarefa. Pré-treinamento não substitui projeto cuidadoso.",
        "A visão madura é esta: transfer learning economiza trabalho e melhora resultados, mas continua sendo uma hipótese operacional que precisa ser validada experimentalmente.",
      ],
      blocks: [
        {
          type: "insight",
          title: "Transferir é apostar em compatibilidade",
          body:
            "A transferência funciona quando a estrutura útil aprendida na origem continua relevante para o alvo em algum grau significativo.",
        },
      ],
    },
    {
      id: "resumo",
      eyebrow: "Síntese",
      title: "Resumo visual do transfer learning",
      lead:
        "Pré-treinamento fornece representação; congelamento preserva; fine-tuning adapta; validação decide o quanto destravar.",
      interactive: "summary-cards",
      paragraphs: [
        "Guarde o mapa: datasets pequenos tendem a pedir mais preservação; datasets maiores e semelhantes permitem adaptações mais profundas e confiantes.",
      ],
    },
    {
      id: "quiz-revisao",
      eyebrow: "Revisão",
      title: "Quiz de revisão",
      lead:
        "Verifique se você conectou backbone congelado, fine-tuning, similaridade de domínio e catastrophic forgetting.",
      interactive: "quiz",
      paragraphs: [
        "O foco é saber decidir a estratégia, não apenas repetir o nome das técnicas.",
      ],
    },
    {
      id: "glossario",
      eyebrow: "Vocabulário",
      title: "Glossário essencial",
      lead:
        "Feche a aula consolidando os termos mais usados em papers e pipelines de adaptação de modelos visuais.",
      interactive: "glossary",
      paragraphs: [
        "Esses termos aparecem em quase todo repositório de visão moderna baseado em backbones pré-treinados.",
      ],
    },
  ],
  summaryCards: [
    {
      title: "Pré-treinamento economiza descoberta",
      body:
        "Em vez de aprender tudo do zero, a rede já começa com detectores visuais úteis.",
    },
    {
      title: "Congelar é estratégia conservadora",
      body:
        "Quando o dataset alvo é pequeno, usar o backbone como extrator fixo reduz risco de overfitting e forgetting.",
    },
    {
      title: "Fine-tuning é adaptação controlada",
      body:
        "Descongelar parte da rede permite especializar melhor as features ao novo domínio, desde que o processo seja gradual.",
    },
    {
      title: "Domínio e tamanho importam",
      body:
        "A melhor estratégia depende de quão parecido o alvo é com a origem e de quanto dado novo você realmente tem.",
    },
  ],
  quiz: [
    {
      id: "q1",
      prompt: "Por que modelos pré-treinados costumam ajudar tanto em datasets menores?",
      options: [
        { id: "a", label: "Porque já carregam representações visuais úteis aprendidas em grande escala." },
        { id: "b", label: "Porque não precisam mais de validação." },
        { id: "c", label: "Porque sempre acertam sem adaptação." },
      ],
      correctOptionId: "a",
      feedback:
        "O backbone pré-treinado já aprendeu muitos detectores e representações, reduzindo a dependência de aprender tudo novamente com poucos dados.",
    },
    {
      id: "q2",
      prompt: "O que significa usar uma rede como feature extractor?",
      options: [
        { id: "a", label: "Congelar o backbone e treinar apenas a cabeça da nova tarefa." },
        { id: "b", label: "Descartar todas as camadas pré-treinadas." },
        { id: "c", label: "Treinar toda a rede do zero com learning rate alto." },
      ],
      correctOptionId: "a",
      feedback:
        "Essa estratégia preserva a representação aprendida e usa apenas um head novo para interpretar as features no problema alvo.",
    },
    {
      id: "q3",
      prompt: "Por que camadas iniciais tendem a transferir melhor?",
      options: [
        { id: "a", label: "Porque costumam aprender padrões visuais mais gerais, como bordas e texturas simples." },
        { id: "b", label: "Porque são as únicas camadas com pesos treináveis." },
        { id: "c", label: "Porque já codificam a classe final diretamente." },
      ],
      correctOptionId: "a",
      feedback:
        "Camadas rasas capturam estruturas mais universais; as profundas tendem a ficar mais especializadas na tarefa original.",
    },
    {
      id: "q4",
      prompt: "O que é fine-tuning?",
      options: [
        { id: "a", label: "Continuar treinando parte ou toda a rede pré-treinada na nova tarefa." },
        { id: "b", label: "Usar apenas data augmentation sem mexer nos pesos." },
        { id: "c", label: "Trocar o dataset sem treinar nada." },
      ],
      correctOptionId: "a",
      feedback:
        "No fine-tuning, os pesos pré-treinados deixam de ser totalmente fixos e passam a ser adaptados ao novo contexto.",
    },
    {
      id: "q5",
      prompt: "Qual risco aparece ao descongelar tudo com learning rate alto?",
      options: [
        { id: "a", label: "Catastrophic forgetting e adaptação instável." },
        { id: "b", label: "Resolução espacial maior na entrada." },
        { id: "c", label: "Eliminação da necessidade de validação." },
      ],
      correctOptionId: "a",
      feedback:
        "Atualizações agressivas podem apagar rapidamente o conhecimento útil do pré-treinamento e levar a overfitting ou divergência.",
    },
    {
      id: "q6",
      prompt: "Quando congelar mais camadas costuma ser mais seguro?",
      options: [
        { id: "a", label: "Quando o dataset alvo é pequeno e queremos preservar mais o conhecimento prévio." },
        { id: "b", label: "Quando temos muitos dados e domínio muito semelhante." },
        { id: "c", label: "Quando queremos adaptar rapidamente todas as representações profundas." },
      ],
      correctOptionId: "a",
      feedback:
        "Em datasets pequenos, liberdade excessiva no backbone aumenta muito o risco de overfitting e forgetting.",
    },
    {
      id: "q7",
      prompt: "Por que usar learning rate menor no backbone do que no head?",
      options: [
        { id: "a", label: "Porque o head é novo e precisa aprender mais rápido, enquanto o backbone deve ser ajustado com delicadeza." },
        { id: "b", label: "Porque o backbone nunca deve receber gradiente." },
        { id: "c", label: "Porque learning rate só afeta o head." },
      ],
      correctOptionId: "a",
      feedback:
        "Essa assimetria respeita o fato de que o backbone já contém conhecimento valioso, enquanto o head ainda precisa ser construído.",
    },
    {
      id: "q8",
      prompt: "Qual afirmação melhor resume a decisão entre congelar e ajustar?",
      options: [
        { id: "a", label: "Depende do tamanho do dataset alvo, da similaridade do domínio e do risco de esquecer o que o backbone já sabe." },
        { id: "b", label: "Sempre devemos ajustar a rede inteira." },
        { id: "c", label: "Sempre devemos congelar tudo." },
      ],
      correctOptionId: "a",
      feedback:
        "Transfer learning é uma decisão de compatibilidade entre origem e destino, não uma regra única válida para todos os casos.",
    },
  ],
  glossary: [
    { term: "Pré-treinamento", definition: "Treino inicial de um modelo em grande escala antes de adaptá-lo a uma tarefa específica." },
    { term: "Transfer learning", definition: "Reaproveitamento de conhecimento aprendido em uma tarefa ou domínio para melhorar outra tarefa ou domínio." },
    { term: "Backbone", definition: "Parte principal da rede responsável por extrair representações intermediárias do dado." },
    { term: "Head", definition: "Camada ou bloco final específico da tarefa, responsável por produzir as saídas desejadas." },
    { term: "Feature extractor", definition: "Uso de um backbone pré-treinado congelado para gerar features, treinando apenas o head." },
    { term: "Fine-tuning", definition: "Ajuste adicional de pesos pré-treinados no novo dataset alvo." },
    { term: "Congelar camadas", definition: "Impedir a atualização de certos pesos durante o treino da nova tarefa." },
    { term: "Descongelamento progressivo", definition: "Estratégia de liberar blocos da rede aos poucos durante o fine-tuning." },
    { term: "Similaridade de domínio", definition: "Grau em que os dados e objetivos de origem e destino se parecem em estrutura e semântica." },
    { term: "Catastrophic forgetting", definition: "Perda rápida de conhecimento útil anterior quando a adaptação à nova tarefa é agressiva demais." },
    { term: "Learning rates discriminativos", definition: "Uso de learning rates diferentes para grupos distintos de camadas, como backbone e head." },
    { term: "ImageNet", definition: "Grande benchmark de classificação visual que serviu de base de pré-treinamento para muitos backbones de visão." },
  ],
  relatedTopics: [
    {
      title: "Segmentação semântica",
      body:
        "Observe como backbones pré-treinados aparecem em arquiteturas que precisam rotular regiões densamente.",
    },
    {
      title: "Segmentação por instâncias",
      body:
        "Veja como heads específicas são acopladas sobre representações compartilhadas para detectar e separar objetos.",
    },
  ],
};
