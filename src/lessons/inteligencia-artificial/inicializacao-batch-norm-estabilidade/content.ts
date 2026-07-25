import type { LessonContent } from "../../../types/content";

export const inicializacaoBatchNormEstabilidadeContent: LessonContent = {
  id: "inicializacao-batch-norm-estabilidade",
  title: "Inicialização, Batch Norm e Estabilidade do Treino",
  subtitle:
    "Por que redes profundas às vezes explodem, às vezes apagam sinais, e como inicialização, normalização e conexões residuais tornam o treinamento viável.",
  description:
    "Uma aula visual sobre propagação de variância, inicialização Xavier e He, Batch Normalization, estatísticas de mini-batch, gradientes, learning rate e estabilidade de redes profundas.",
  primaryCategoryId: "inteligencia-artificial",
  secondaryCategoryId: "computacao",
  level: "Avançado",
  estimatedTime: "50-65 min",
  tags: [
    "Deep Learning",
    "Batch Normalization",
    "Inicialização",
    "Gradientes",
    "ResNet",
    "Otimização",
  ],
  learningObjectives: [
    "Explicar por que a escala inicial dos pesos afeta diretamente a estabilidade do sinal em redes profundas.",
    "Diferenciar o problema de gradientes que explodem do problema de gradientes que desaparecem.",
    "Entender a intuição por trás das inicializações Xavier e He e quando cada uma é mais apropriada.",
    "Descrever o que o Batch Normalization faz durante treino e inferência.",
    "Reconhecer por que BatchNorm facilita o uso de learning rates mais agressivos.",
    "Identificar limitações práticas de BatchNorm com lotes pequenos, distribuição instável e tarefas fora de visão clássica.",
    "Relacionar conexões residuais, normalização e inicialização como mecanismos complementares de estabilidade.",
  ],
  prerequisites: [
    "Familiaridade com camadas lineares, ativações e retropropagação.",
    "Noção básica de média, desvio padrão e variância.",
    "Entender que treinamento profundo é uma composição de muitas transformações sucessivas.",
  ],
  references: [
    {
      title: "Understanding the difficulty of training deep feedforward neural networks",
      source: "Glorot & Bengio, 2010 — PMLR",
      url: "https://proceedings.mlr.press/v9/glorot10a.html",
      note:
        "Artigo clássico que motivou inicializações que preservam a escala do sinal entre camadas.",
    },
    {
      title: "Delving Deep into Rectifiers: Surpassing Human-Level Performance on ImageNet Classification",
      source: "He et al., 2015 — arXiv",
      url: "https://arxiv.org/abs/1502.01852",
      note:
        "Introduz a inicialização He, especialmente apropriada para redes com ReLU.",
    },
    {
      title: "Batch Normalization: Accelerating Deep Network Training by Reducing Internal Covariate Shift",
      source: "Ioffe & Szegedy, 2015 — arXiv",
      url: "https://arxiv.org/abs/1502.03167",
      note:
        "Referência principal sobre BatchNorm, sua formulação e impacto no treinamento.",
    },
    {
      title: "Deep Residual Learning for Image Recognition",
      source: "He et al., 2015 — arXiv",
      url: "https://arxiv.org/abs/1512.03385",
      note:
        "Mostra como conexões residuais facilitam otimização de redes profundas quando combinadas com boas práticas de treinamento.",
    },
    {
      title: "CS231n Notes: Neural Networks Part 2",
      source: "Stanford CS231n",
      url: "https://cs231n.github.io/neural-networks-2/",
      note:
        "Notas didáticas sobre inicialização, BatchNorm, regularização e detalhes práticos de treino.",
    },
    {
      title: "Deep Learning — Chapter 8: Optimization for Training Deep Models",
      source: "Goodfellow, Bengio & Courville",
      url: "https://www.deeplearningbook.org/contents/optimization.html",
      note:
        "Capítulo de referência sobre otimização, conditioning e dificuldades de treinar modelos profundos.",
    },
  ],
  heroVisual: "hero",
  openingText:
    "Treinar uma rede profunda não falha apenas porque o modelo é 'difícil'. Muitas falhas surgem antes mesmo do modelo aprender qualquer padrão relevante: o sinal explode, some, oscila ou muda de escala a cada camada. Inicialização, normalização e arquitetura entram em cena exatamente para impedir que a matemática básica da propagação destrua o aprendizado. Esta aula trata dessas engrenagens invisíveis que tornam o treinamento profundo estável o bastante para funcionar.",
  quickFacts: [
    {
      title: "A profundidade amplifica tudo",
      body:
        "Qualquer pequeno erro de escala numa camada pode ser multiplicado dezenas de vezes ao atravessar a rede inteira.",
    },
    {
      title: "Inicialização não é detalhe",
      body:
        "Pesos iniciais definem o regime onde a otimização começa: saudável, explosivo ou praticamente morto.",
    },
    {
      title: "BatchNorm estabiliza o fluxo",
      body:
        "Normalizar ativações intermediárias ajuda a manter gradientes utilizáveis e torna o treinamento menos sensível à escala.",
    },
  ],
  sections: [
    {
      id: "motivacao",
      eyebrow: "Problema",
      title: "Por que redes profundas podem ser numericamente instáveis?",
      lead:
        "Uma rede profunda é uma composição longa de multiplicações, somas e não linearidades. Se a escala se desajusta cedo, o erro cresce junto com a profundidade.",
      visual: "hero",
      paragraphs: [
        "Em uma rede rasa, é relativamente fácil sobreviver a uma inicialização imperfeita. Em uma rede com dezenas de camadas, esse luxo desaparece. Cada camada recebe ativações da camada anterior, aplica pesos e produz novas ativações. Se essas ativações vão ficando maiores a cada etapa, o modelo entra em regime explosivo; se vão encolhendo, a informação some.",
        "A retropropagação sofre do mesmo jeito. O gradiente precisa atravessar muitas transformações na volta. Se em cada camada ele for multiplicado por fatores pequenos, chega quase zero ao início da rede. Se for multiplicado por fatores grandes, vira ruído descontrolado. O resultado prático é conhecido: treinamento não converge, oscila ou aprende muito devagar.",
        "Por isso estabilidade não é enfeite matemático. É pré-condição para que a otimização enxergue um caminho útil de melhoria. Quando falamos de inicialização e BatchNorm, estamos falando de controlar a escala do processo inteiro antes que ele desande.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Estabilidade do treino",
          body:
            "Capacidade de manter ativações e gradientes em faixas numéricas úteis ao longo das camadas, evitando explosão, apagamento e oscilações extremas.",
        },
        {
          type: "mistake",
          title: "Erro comum",
          body:
            "Atribuir toda falha de treino ao otimizador. Muitas vezes o problema começa antes: os sinais já chegam mal escalados ao otimizador.",
        },
      ],
    },
    {
      id: "propagacao-variancia",
      eyebrow: "Intuição central",
      title: "Treinar bem começa preservando a variância do sinal",
      lead:
        "A pergunta prática é simples: o que acontece com a escala das ativações quando o mesmo padrão de transformação é repetido camada após camada?",
      visual: "concept",
      interactive: "variance-lab",
      paragraphs: [
        "Se cada neurônio recebe muitas entradas e os pesos são sorteados grandes demais, a soma tende a crescer. Se os pesos são pequenos demais, a soma encolhe. Em ambos os casos, a rede começa o treino em um regime ruim: ou saturada, ou silenciosa. A ideia de boa inicialização é manter a variância aproximadamente controlada enquanto o sinal atravessa a pilha de camadas.",
        "Esse raciocínio vale tanto para a ida quanto para a volta. Quando a rede propaga ativações, queremos evitar amplificação ou contração sistemática. Quando propaga gradientes, queremos a mesma coisa. As fórmulas de inicialização aparecem como soluções aproximadas para esse equilíbrio.",
        "Na prática, você pode pensar em inicialização como um ajuste de impedância entre camadas: nem sinal demais, nem sinal de menos. É isso que faz a primeira iteração já nascer em um território treinável.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Propagação de variância",
          body:
            "Análise de como a escala estatística das ativações e dos gradientes muda ao atravessar sucessivas camadas da rede.",
        },
        {
          type: "insight",
          title: "Boa inicialização é engenharia de escala",
          body:
            "Ela não 'ensina' o modelo. Apenas evita que o modelo comece o treino em um regime numericamente inviável.",
        },
      ],
    },
    {
      id: "xavier-he",
      eyebrow: "Inicialização",
      title: "Xavier e He: duas respostas para duas famílias de ativações",
      lead:
        "As inicializações mais famosas tentam preservar o fluxo do sinal, mas partem de hipóteses ligeiramente diferentes sobre o comportamento da ativação.",
      paragraphs: [
        "A inicialização Xavier, associada a Glorot e Bengio, surge em um contexto onde ativações simétricas como tanh eram muito usadas. A meta é balancear a escala de entrada e saída de cada camada usando o fan-in e o fan-out. Assim, as ativações não crescem nem encolhem demais em média.",
        "Com a popularização da ReLU, o problema mudou um pouco. Como metade do sinal tende a ser zerada, a variância efetiva após a ativação diminui. A inicialização He compensa exatamente isso, escolhendo uma escala maior que a de Xavier para manter a energia do sinal em redes com ReLU.",
        "Não vale decorar as fórmulas como mantra cego. O importante é entender o motivo: a melhor escala depende tanto da largura da camada quanto da não linearidade usada depois dela.",
      ],
      blocks: [
        {
          type: "formula",
          title: "Escalas típicas",
          body:
            "Em forma simplificada, Xavier usa algo proporcional a 1/sqrt(fan) e He usa algo proporcional a sqrt(2/fan_in).",
          formula: "Xavier ~ 1 / sqrt(fan) | He ~ sqrt(2 / fan_in)",
        },
        {
          type: "example",
          title: "Regra prática",
          body:
            "Camada linear seguida de tanh costuma combinar melhor com Xavier. Camada seguida de ReLU costuma combinar melhor com He.",
        },
        {
          type: "mistake",
          title: "Erro comum",
          body:
            "Usar a mesma escala para toda arquitetura sem considerar a ativação. O que é saudável para tanh pode ser tímido demais para ReLU.",
        },
      ],
    },
    {
      id: "batchnorm-mecanismo",
      eyebrow: "Normalização",
      title: "BatchNorm recentra e reescala ativações no meio da rede",
      lead:
        "A ideia operacional do BatchNorm é simples: usar estatísticas do mini-batch para padronizar ativações intermediárias durante o treino.",
      visual: "pipeline",
      interactive: "batchnorm-lab",
      paragraphs: [
        "Para cada mini-batch, o BatchNorm estima média e variância de uma ativação e a transforma para uma escala padronizada. Em seguida, aplica dois parâmetros treináveis, geralmente chamados de gamma e beta, para permitir que a rede recupere uma escala útil se quiser. Ou seja: normaliza, mas não engessa a representação.",
        "O ganho prático é que as camadas seguintes passam a receber entradas mais previsíveis em escala. Isso reduz a sensibilidade à inicialização e frequentemente permite learning rates maiores. A rede ainda aprende representações complexas, mas aprende em um terreno menos escorregadio.",
        "É importante não absolutizar a famosa expressão 'internal covariate shift'. Independentemente da interpretação histórica, o valor prático do BatchNorm aparece na estabilização do fluxo e na melhoria do condicionamento da otimização.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Batch Normalization",
          body:
            "Camada que normaliza ativações usando estatísticas do mini-batch durante o treino e estatísticas acumuladas durante a inferência.",
        },
        {
          type: "insight",
          title: "Normalizar não significa perder expressividade",
          body:
            "Os parâmetros gamma e beta permitem que a rede reaprenda uma escala conveniente depois da padronização.",
        },
      ],
    },
    {
      id: "learning-rate-estabilidade",
      eyebrow: "Otimização",
      title: "Por que BatchNorm costuma permitir learning rates maiores?",
      lead:
        "Quando a escala das ativações oscila menos, o espaço de otimização tende a ficar menos hostil a passos maiores.",
      visual: "comparison",
      paragraphs: [
        "Sem normalização, uma atualização de peso em uma camada pode alterar drasticamente a distribuição vista pela próxima camada. Isso torna o efeito do learning rate mais difícil de prever. Pequenas mudanças no passo podem levar a explosão ou travamento do treino.",
        "Com BatchNorm, as estatísticas são parcialmente reancoradas a cada batch. Isso não elimina toda dificuldade, mas reduz a cascata de desbalanceamentos internos. Em muitos casos, o otimizador passa a tolerar passos maiores sem entrar em divergência imediata.",
        "Esse é um motivo pelo qual arquiteturas modernas combinaram BatchNorm com redes mais profundas e agressivas. A normalização não substitui tuning, mas aumenta a região de hiperparâmetros que funciona.",
      ],
      blocks: [
        {
          type: "example",
          title: "Intuição operacional",
          body:
            "Treinar com learning rate alto sem controle de escala é como acelerar em uma estrada escorregadia. BatchNorm não dirige por você, mas melhora a aderência.",
        },
        {
          type: "mistake",
          title: "Erro comum",
          body:
            "Concluir que BatchNorm autoriza qualquer learning rate. Há menos sensibilidade, não ausência de sensibilidade.",
        },
      ],
    },
    {
      id: "residuais",
      eyebrow: "Arquitetura",
      title: "Conexões residuais ajudam porque criam caminhos curtos para sinal e gradiente",
      lead:
        "Inicialização e normalização cuidam da escala local; conexões residuais melhoram a geometria global da propagação.",
      interactive: "stability-scenarios",
      paragraphs: [
        "Em uma pilha totalmente sequencial, cada camada precisa reinventar a transformação inteira. Em uma arquitetura residual, a rede aprende correções sobre um caminho de identidade. Isso facilita tanto a preservação do sinal quanto a passagem do gradiente, sobretudo em profundidades grandes.",
        "ResNet não substitui boa inicialização nem BatchNorm. O ganho vem do acoplamento: caminhos residuais reduzem degradação de profundidade, enquanto normalização e escala adequada tornam cada bloco mais treinável. Juntas, essas técnicas redefiniram o que era praticável em profundidade.",
        "A lição conceitual é importante: estabilidade não costuma vir de um único truque milagroso, mas de várias escolhas coerentes que evitam gargalos numéricos em diferentes níveis.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Conexão residual",
          body:
            "Atalho que soma a entrada de um bloco à sua saída transformada, permitindo que o bloco aprenda uma correção em vez de reconstruir tudo do zero.",
        },
        {
          type: "insight",
          title: "Aprender a correção é mais fácil",
          body:
            "Quando a identidade já está disponível, a rede pode gastar capacidade ajustando o que falta, não reconstruindo o básico.",
        },
      ],
    },
    {
      id: "limites-batchnorm",
      eyebrow: "Limites",
      title: "BatchNorm resolve muita coisa, mas traz custos e fragilidades próprias",
      lead:
        "Usar estatísticas do mini-batch é poderoso, porém essa mesma escolha introduz dependência do tamanho e da qualidade do lote.",
      visual: "tradeoff",
      paragraphs: [
        "Se o batch é pequeno demais, as estimativas de média e variância ficam ruidosas. Isso pode tornar o treino instável ou pouco reprodutível, especialmente em tarefas com pouca memória disponível ou em domínios onde o batch naturalmente é minúsculo, como certos problemas 3D e segmentação médica.",
        "Outra sutileza aparece na inferência. Durante o treino, BatchNorm usa estatísticas do batch atual; na inferência, usa médias móveis acumuladas. Se o treino foi muito instável ou a distribuição de dados mudou, essa troca pode introduzir comportamento inesperado.",
        "Por isso alternativas como LayerNorm, GroupNorm e normalizações sem dependência forte de batch ganharam espaço em alguns contextos. O ponto não é 'BatchNorm é ruim', mas 'BatchNorm tem hipóteses de funcionamento'.",
      ],
      blocks: [
        {
          type: "mistake",
          title: "Erro comum",
          body:
            "Usar BatchNorm em lotes muito pequenos e interpretar o ruído estatístico como se fosse capacidade do modelo.",
        },
        {
          type: "example",
          title: "Quando outras normas ganham",
          body:
            "Transformers preferem LayerNorm; muitas pipelines de visão com batch pequeno usam GroupNorm para reduzir dependência de estatísticas instáveis.",
        },
      ],
    },
    {
      id: "diagnostico",
      eyebrow: "Diagnóstico",
      title: "Como reconhecer problemas de estabilidade na prática",
      lead:
        "Curvas de loss, gradientes e ativações contam uma história. Ler esses sinais evita longas sessões de tuning às cegas.",
      visual: "checklist",
      paragraphs: [
        "Loss que vira NaN cedo, gradientes absurdamente altos, ativações quase sempre zeradas ou saturadas e forte sensibilidade a pequenas mudanças de learning rate são pistas clássicas de instabilidade. Nem sempre a arquitetura é o problema; às vezes basta revisar a escala inicial, a ordem conv-BN-ativação ou o próprio batch size.",
        "Também vale olhar o comportamento por camada. Uma rede pode parecer estável globalmente, mas esconder blocos que colapsam internamente. Ferramentas de logging de ativação, histogramas e normas de gradiente por camada ajudam a localizar o ponto onde o sinal se perde.",
        "Boa engenharia de treino combina teoria suficiente para suspeitar da causa e instrumentação suficiente para confirmar. Sem isso, estabilidade vira superstição.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Diagnóstico de treino",
          body:
            "Leitura sistemática de métricas como loss, gradientes, normas de ativação e estatísticas internas para localizar causas de falha ou lentidão.",
        },
        {
          type: "insight",
          title: "Nem todo loss ruim é subajuste",
          body:
            "Às vezes a rede não está 'aprendendo pouco'; ela nem chegou a um regime numérico onde possa aprender de forma consistente.",
        },
      ],
    },
    {
      id: "resumo",
      eyebrow: "Síntese",
      title: "Resumo visual dos mecanismos de estabilidade",
      lead:
        "Antes do quiz, consolide o mapa mental: escala inicial, normalização durante o treino e caminhos residuais trabalham em camadas complementares do problema.",
      interactive: "summary-cards",
      paragraphs: [
        "Pense nesta aula como um manual de preservação de sinal. Primeiro, inicialize para não destruir a variância. Depois, normalize para manter a distribuição sob controle enquanto a rede muda. Por fim, use arquitetura e instrumentação que facilitem a passagem de informação em profundidade.",
      ],
    },
    {
      id: "quiz-revisao",
      eyebrow: "Revisão",
      title: "Quiz de revisão",
      lead:
        "Teste se os conceitos ficaram conectados: propagação de variância, inicialização, BatchNorm, learning rate e limites práticos.",
      interactive: "quiz",
      paragraphs: [
        "O objetivo não é decorar nomes, e sim entender por que estabilidade é condição de possibilidade para treinar redes profundas.",
      ],
    },
    {
      id: "glossario",
      eyebrow: "Vocabulário",
      title: "Glossário essencial",
      lead:
        "Feche a aula consolidando o vocabulário técnico que aparece em papers e implementações sobre treinamento profundo.",
      interactive: "glossary",
      paragraphs: [
        "Volte a este glossário quando estiver lendo documentação de frameworks, artigos de otimização ou implementando novas arquiteturas.",
      ],
    },
  ],
  summaryCards: [
    {
      title: "Escala importa desde a primeira iteração",
      body:
        "Inicialização ruim já posiciona a rede em um regime onde ativações ou gradientes explodem ou desaparecem.",
    },
    {
      title: "Xavier e He são respostas estatísticas",
      body:
        "Elas tentam preservar a variância do sinal, mas assumem comportamentos diferentes das ativações usadas.",
    },
    {
      title: "BatchNorm reduz sensibilidade",
      body:
        "Normalizar ativações intermediárias ajuda a estabilizar o fluxo e frequentemente amplia a faixa útil de learning rates.",
    },
    {
      title: "Residuais complementam normalização",
      body:
        "Caminhos de identidade criam rotas mais curtas para informação e gradiente, ajudando redes muito profundas.",
    },
  ],
  quiz: [
    {
      id: "q1",
      prompt: "Qual é a função conceitual de uma boa inicialização?",
      options: [
        { id: "a", label: "Manter a escala do sinal e do gradiente em uma faixa treinável." },
        { id: "b", label: "Escolher automaticamente a melhor arquitetura." },
        { id: "c", label: "Substituir a necessidade de normalização." },
      ],
      correctOptionId: "a",
      feedback:
        "Inicialização boa não aprende a tarefa, mas evita que o treinamento comece em regime explosivo ou apagado.",
    },
    {
      id: "q2",
      prompt: "Por que a inicialização He costuma ser preferida com ReLU?",
      options: [
        { id: "a", label: "Porque compensa o fato de a ReLU zerar parte do sinal." },
        { id: "b", label: "Porque funciona apenas em redes rasas." },
        { id: "c", label: "Porque elimina completamente gradientes ruins." },
      ],
      correctOptionId: "a",
      feedback:
        "A ReLU deixa uma parte das ativações em zero, então a escala precisa compensar essa perda para preservar a variância.",
    },
    {
      id: "q3",
      prompt: "O que o BatchNorm faz durante o treino?",
      options: [
        { id: "a", label: "Normaliza ativações usando estatísticas do mini-batch e depois reaplica escala e deslocamento treináveis." },
        { id: "b", label: "Congela o learning rate da rede inteira." },
        { id: "c", label: "Impede que a rede use ativações negativas." },
      ],
      correctOptionId: "a",
      feedback:
        "O mecanismo central do BatchNorm é padronizar ativações do batch atual e, em seguida, permitir readaptação com gamma e beta.",
    },
    {
      id: "q4",
      prompt: "Por que BatchNorm frequentemente permite learning rates maiores?",
      options: [
        { id: "a", label: "Porque reduz a oscilação da escala interna e melhora o condicionamento da otimização." },
        { id: "b", label: "Porque remove a necessidade de backpropagation." },
        { id: "c", label: "Porque impede overfitting por definição." },
      ],
      correctOptionId: "a",
      feedback:
        "A normalização tende a tornar o espaço de treinamento menos sensível a variações abruptas de escala entre camadas.",
    },
    {
      id: "q5",
      prompt: "Qual é uma limitação prática do BatchNorm?",
      options: [
        { id: "a", label: "Ele pode ficar ruidoso com batches muito pequenos." },
        { id: "b", label: "Ele funciona apenas para imagens coloridas." },
        { id: "c", label: "Ele impede o uso de conexões residuais." },
      ],
      correctOptionId: "a",
      feedback:
        "Como depende de estatísticas do mini-batch, lotes pequenos podem gerar estimativas instáveis de média e variância.",
    },
    {
      id: "q6",
      prompt: "O que uma conexão residual oferece à otimização?",
      options: [
        { id: "a", label: "Um caminho de identidade que facilita fluxo de sinal e gradiente." },
        { id: "b", label: "Uma forma de remover toda necessidade de inicialização." },
        { id: "c", label: "Uma garantia de que a loss será convexa." },
      ],
      correctOptionId: "a",
      feedback:
        "Residuais criam atalhos para informação e gradiente, o que ajuda especialmente em redes profundas.",
    },
    {
      id: "q7",
      prompt: "Qual sintoma sugere instabilidade numérica de treino?",
      options: [
        { id: "a", label: "Loss vira NaN ou oscila violentamente após poucas iterações." },
        { id: "b", label: "Acurácia melhora gradualmente ao longo do tempo." },
        { id: "c", label: "O modelo usa validação cruzada." },
      ],
      correctOptionId: "a",
      feedback:
        "NaNs, explosões repentinas e sensibilidade extrema ao learning rate são sinais clássicos de que a escala interna saiu do controle.",
    },
    {
      id: "q8",
      prompt: "Qual afirmação resume melhor a relação entre inicialização, BatchNorm e residuais?",
      options: [
        { id: "a", label: "São técnicas complementares que atacam gargalos diferentes da estabilidade do treino." },
        { id: "b", label: "São três nomes para o mesmo mecanismo." },
        { id: "c", label: "Só uma delas importa de verdade em redes profundas." },
      ],
      correctOptionId: "a",
      feedback:
        "Inicialização controla o ponto de partida, BatchNorm estabiliza ativações durante o treino e residuais melhoram a passagem de informação em profundidade.",
    },
  ],
  glossary: [
    {
      term: "Fan-in",
      definition:
        "Número de entradas que alimentam um neurônio ou canal, usado para calibrar a escala da inicialização.",
    },
    {
      term: "Fan-out",
      definition:
        "Número de saídas associadas a uma camada, relevante em algumas análises de preservação de variância.",
    },
    {
      term: "Inicialização Xavier",
      definition:
        "Estratégia de inicialização que busca equilibrar a variância do sinal entre entrada e saída de camadas, especialmente útil com ativações simétricas.",
    },
    {
      term: "Inicialização He",
      definition:
        "Estratégia de inicialização ajustada para redes com ReLU, compensando a redução efetiva de variância causada pela ativação.",
    },
    {
      term: "Gradiente que desaparece",
      definition:
        "Situação em que o gradiente encolhe tanto ao retropropagar que as primeiras camadas quase não recebem sinal de aprendizado.",
    },
    {
      term: "Gradiente que explode",
      definition:
        "Situação em que o gradiente cresce demais ao retropropagar, tornando as atualizações numericamente instáveis.",
    },
    {
      term: "Batch Normalization",
      definition:
        "Camada que normaliza ativações com base em estatísticas do mini-batch e reaplica escala e deslocamento aprendíveis.",
    },
    {
      term: "Gamma",
      definition:
        "Parâmetro treinável do BatchNorm que controla a escala após a normalização.",
    },
    {
      term: "Beta",
      definition:
        "Parâmetro treinável do BatchNorm que desloca a ativação após a normalização.",
    },
    {
      term: "Média móvel",
      definition:
        "Estimativa acumulada das estatísticas usada por BatchNorm na inferência em vez das estatísticas instantâneas do batch atual.",
    },
    {
      term: "Conexão residual",
      definition:
        "Atalho que soma a entrada de um bloco à sua saída transformada, preservando um caminho de identidade.",
    },
    {
      term: "Condicionamento",
      definition:
        "Propriedade geométrica do problema de otimização que afeta quão sensível o treino é a passos do otimizador e à escala das variáveis.",
    },
  ],
};
