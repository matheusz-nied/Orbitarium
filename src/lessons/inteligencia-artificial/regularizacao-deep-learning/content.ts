import type { LessonContent } from "../../../types/content";

export const regularizacaoDeepLearningContent: LessonContent = {
  id: "regularizacao-deep-learning",
  title: "Regularização em Deep Learning",
  subtitle:
    "Como impedir que uma rede decore o treino demais: dropout, weight decay, early stopping e o equilíbrio entre capacidade e generalização.",
  description:
    "Uma aula visual sobre overfitting, viés e variância, dropout, L2 e weight decay, early stopping, combinação de regularizadores e sinais de diagnóstico em treino profundo.",
  primaryCategoryId: "inteligencia-artificial",
  secondaryCategoryId: "computacao",
  level: "Intermediário",
  estimatedTime: "40-55 min",
  tags: [
    "Regularização",
    "Dropout",
    "Weight Decay",
    "Early Stopping",
    "Generalização",
    "Deep Learning",
  ],
  learningObjectives: [
    "Distinguir overfitting de underfitting em termos de comportamento de treino e validação.",
    "Entender regularização como controle de capacidade efetiva e não apenas como penalidade matemática.",
    "Explicar a intuição do dropout como quebra de coadaptação entre unidades.",
    "Diferenciar L2 e weight decay, incluindo a sutileza com otimizadores adaptativos.",
    "Interpretar early stopping como regularização temporal guiada pela validação.",
    "Reconhecer quando múltiplos regularizadores se complementam e quando começam a sufocar o modelo.",
    "Ler curvas de treino para diagnosticar se o problema é falta ou excesso de regularização.",
  ],
  prerequisites: [
    "Noção básica de loss de treino e loss de validação.",
    "Entender que um modelo pode memorizar padrões espúrios do conjunto de treino.",
    "Familiaridade inicial com o processo de otimização por gradiente.",
  ],
  references: [
    {
      title: "Dropout: A Simple Way to Prevent Neural Networks from Overfitting",
      source: "Srivastava et al., 2014 — JMLR",
      url: "https://www.jmlr.org/papers/v15/srivastava14a.html",
      note:
        "Referência clássica sobre dropout e sua interpretação como combinação aproximada de muitas sub-redes.",
    },
    {
      title: "Decoupled Weight Decay Regularization",
      source: "Loshchilov & Hutter, 2017 — arXiv",
      url: "https://arxiv.org/abs/1711.05101",
      note:
        "Mostra por que L2 e weight decay deixam de ser equivalentes em otimizadores adaptativos como Adam.",
    },
    {
      title: "Deep Learning — Chapter 7: Regularization for Deep Learning",
      source: "Goodfellow, Bengio & Courville",
      url: "https://www.deeplearningbook.org/contents/regularization.html",
      note:
        "Capítulo conceitual sólido sobre penalizações, normas, dropout e capacidade efetiva.",
    },
    {
      title: "CS231n Notes: Neural Networks Part 2",
      source: "Stanford CS231n",
      url: "https://cs231n.github.io/neural-networks-2/",
      note:
        "Notas práticas sobre regularização, dropout, BatchNorm e considerações de treinamento.",
    },
    {
      title: "EarlyStopping",
      source: "Keras — Documentação oficial",
      url: "https://keras.io/api/callbacks/early_stopping/",
      note:
        "Documentação oficial para o uso prático de early stopping como mecanismo de parada guiado por validação.",
    },
    {
      title: "Batch Normalization: Accelerating Deep Network Training by Reducing Internal Covariate Shift",
      source: "Ioffe & Szegedy, 2015 — arXiv",
      url: "https://arxiv.org/abs/1502.03167",
      note:
        "Além de estabilizar treino, o artigo discute o efeito regularizador adicional do BatchNorm em alguns cenários.",
    },
  ],
  heroVisual: "hero",
  openingText:
    "Uma rede grande o bastante sempre encontra um jeito de reduzir a loss do treino. A pergunta relevante é outra: ela aprendeu um padrão geral ou apenas memorizou idiossincrasias do conjunto? Regularização existe para responder essa pergunta do lado certo. Em vez de deixar a rede usar toda sua capacidade de forma oportunista, introduzimos restrições, ruído ou critérios de parada que favorecem soluções mais estáveis fora do treino.",
  quickFacts: [
    {
      title: "Regularizar não é enfraquecer por capricho",
      body:
        "É pressionar o modelo a aprender estruturas que sobrevivem melhor fora do conjunto de treino.",
    },
    {
      title: "Mais capacidade pede mais disciplina",
      body:
        "Quanto maior e mais flexível a rede, maior a necessidade de controlar como ela usa essa flexibilidade.",
    },
    {
      title: "Excesso de regularização também dói",
      body:
        "Se a restrição for forte demais, o modelo deixa de aprender até padrões reais e entra em underfitting.",
    },
  ],
  sections: [
    {
      id: "motivacao",
      eyebrow: "Problema",
      title: "Generalização é o objetivo; loss de treino é apenas o meio",
      lead:
        "Uma rede pode parecer excelente no treino e ainda falhar ao ver dados novos. Esse descolamento é o coração do overfitting.",
      visual: "hero",
      paragraphs: [
        "Treinar uma rede é ajustar parâmetros para reduzir uma loss em exemplos observados. Se o modelo tiver capacidade suficiente, ele pode começar a capturar não apenas o padrão útil, mas também ruídos, coincidências e artefatos específicos do conjunto de treino.",
        "Quando isso acontece, a loss de treino continua caindo, mas a validação para de acompanhar e pode até piorar. A rede aprendeu demais sobre aquele conjunto e de menos sobre a estrutura geral do problema.",
        "Regularização entra como freio inteligente. Ela impede que a solução ótima no treino seja também a solução mais frágil fora dele.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Generalização",
          body:
            "Capacidade de um modelo manter bom desempenho em dados novos, e não apenas nos exemplos vistos durante o treino.",
        },
        {
          type: "mistake",
          title: "Erro comum",
          body:
            "Interpretar loss de treino muito baixa como sinônimo de modelo bom. Sem validação, isso pode ser apenas memorização eficiente.",
        },
      ],
    },
    {
      id: "overfitting-underfitting",
      eyebrow: "Diagnóstico",
      title: "Overfitting e underfitting são falhas diferentes",
      lead:
        "Regularização só faz sentido quando sabemos contra qual falha estamos lutando: memorizar demais ou aprender de menos.",
      visual: "concept",
      paragraphs: [
        "Underfitting acontece quando o modelo não consegue capturar nem o padrão principal do treino. A loss de treino permanece alta e a validação também. Isso sugere capacidade insuficiente, features ruins, otimização fraca ou regularização excessiva.",
        "Overfitting é o oposto assimétrico: o treino vai muito bem, mas a validação se deteriora. Aqui o modelo possui capacidade suficiente para explorar detalhes específicos demais do conjunto de treino.",
        "A sutileza importante é que regularização não corrige underfitting. Se o modelo já está contido demais, adicionar mais restrição só piora. Diagnóstico vem antes do remédio.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Overfitting",
          body:
            "Quando o modelo se adapta excessivamente aos detalhes do treino e perde desempenho em dados novos.",
        },
        {
          type: "definition",
          title: "Underfitting",
          body:
            "Quando o modelo é incapaz de aprender adequadamente até o padrão principal do treino.",
        },
      ],
    },
    {
      id: "dropout",
      eyebrow: "Ruído estruturado",
      title: "Dropout força a rede a não depender sempre das mesmas unidades",
      lead:
        "Durante o treino, o dropout desliga aleatoriamente parte das ativações. Isso impede coadaptação excessiva entre neurônios.",
      visual: "pipeline",
      interactive: "dropout-lab",
      paragraphs: [
        "A intuição do dropout é elegante: se uma unidade sabe que suas vizinhas podem desaparecer em qualquer batch, ela não pode confiar cegamente nelas. Isso força representações mais distribuídas e menos frágeis.",
        "Sob essa ótica, dropout é como treinar uma família de sub-redes parcialmente diferentes, todas compartilhando pesos. Na inferência, usamos a rede completa com a escala ajustada, aproximando a média desse conjunto de submodelos.",
        "Dropout é poderoso, mas não universal. Em algumas arquiteturas modernas com BatchNorm pesado, residuals e muita data augmentation, seu ganho pode ser menor do que foi em redes antigas totalmente conectadas.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Dropout",
          body:
            "Técnica que zera aleatoriamente ativações durante o treino, reduzindo coadaptação e incentivando representações mais robustas.",
        },
        {
          type: "insight",
          title: "O alvo não é o neurônio isolado",
          body:
            "O dropout regulariza padrões de dependência entre unidades, não apenas a magnitude de uma ativação individual.",
        },
      ],
    },
    {
      id: "weight-decay",
      eyebrow: "Penalização",
      title: "Weight decay empurra a rede para soluções menos extremas",
      lead:
        "Penalizar pesos grandes demais tende a suavizar o modelo e reduzir a tentação de memorizar padrões frágeis.",
      interactive: "weight-decay-lab",
      paragraphs: [
        "Em linguagem intuitiva, weight decay puxa os pesos na direção de zero durante o treino. Isso não significa que pesos pequenos sejam sempre melhores, mas soluções com normas menores frequentemente correspondem a fronteiras menos agressivas e menos sensíveis a ruído.",
        "Historicamente, muita gente tratou L2 e weight decay como sinônimos. Em SGD simples essa aproximação costuma funcionar bem. Em otimizadores adaptativos, porém, a equivalência se quebra. Foi daí que a formulação desacoplada, popularizada como AdamW, ganhou tanta importância prática.",
        "A lição relevante para engenheiros é: não basta dizer 'usei weight decay'. É preciso saber em qual otimizador, com qual implementação e com qual intensidade relativa ao learning rate.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Weight decay",
          body:
            "Forma de regularização que reduz a magnitude dos pesos ao longo do treinamento, favorecendo soluções menos extremas.",
        },
        {
          type: "mistake",
          title: "Erro comum",
          body:
            "Achar que o mesmo valor de weight decay tem o mesmo efeito em qualquer otimizador. Em Adam e variantes, a implementação importa bastante.",
        },
      ],
    },
    {
      id: "early-stopping",
      eyebrow: "Tempo como regularização",
      title: "Early stopping regulariza escolhendo quando parar",
      lead:
        "Às vezes o melhor modelo não é o último checkpoint, mas o momento em que a validação ainda melhorava antes da rede começar a memorizar demais.",
      interactive: "training-curves-lab",
      paragraphs: [
        "Se continuarmos treinando indefinidamente, um modelo flexível pode explorar cada vez mais detalhes específicos do treino. Early stopping observa a validação e interrompe o processo quando esse ganho deixa de se traduzir fora do treino.",
        "Essa é uma forma de regularização temporal: em vez de restringir diretamente os pesos, restringimos o quanto eles podem continuar se ajustando na direção de uma solução excessivamente especializada.",
        "Na prática, patience e monitoramento adequado importam muito. Parar cedo demais equivale a underfitting; parar tarde demais perde justamente o benefício do método.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Early stopping",
          body:
            "Critério de parada que usa o desempenho em validação para interromper o treino antes que o modelo overfit demais.",
        },
        {
          type: "example",
          title: "Leitura de curvas",
          body:
            "Se a loss de treino cai enquanto a de validação estagna ou sobe por várias épocas, o melhor checkpoint pode estar algumas épocas atrás.",
        },
      ],
    },
    {
      id: "combinar",
      eyebrow: "Estratégia",
      title: "Regularizadores se complementam, mas também podem se empilhar demais",
      lead:
        "Dropout, weight decay, BatchNorm, augmentação e early stopping atuam em níveis diferentes da aprendizagem.",
      visual: "comparison",
      paragraphs: [
        "Dropout introduz ruído e combate coadaptação. Weight decay controla norma dos parâmetros. Early stopping limita a especialização temporal. Data augmentation amplia a variedade efetiva da entrada. Cada mecanismo empurra a solução em uma direção ligeiramente diferente.",
        "Usar vários regularizadores juntos faz sentido quando eles atacam vulnerabilidades distintas do pipeline. Mas combinar tudo no máximo quase nunca é uma boa ideia. A rede pode ficar tão contida que nem padrões reais sejam aprendidos com clareza.",
        "A melhor combinação depende de arquitetura, tamanho do dataset, ruído dos rótulos e objetivo da tarefa. Regularização eficiente é ajuste fino de regime, não coleção de receitas automáticas.",
      ],
      blocks: [
        {
          type: "insight",
          title: "Regularização é um orçamento",
          body:
            "Cada técnica consome parte da liberdade do modelo. O desafio é gastar esse orçamento onde ele realmente evita memorizações frágeis.",
        },
      ],
    },
    {
      id: "sinais-praticos",
      eyebrow: "Prática",
      title: "Curvas e sintomas revelam quando a regularização está errada",
      lead:
        "Diagnosticar excesso ou falta de regularização olhando curvas e amostras vale mais do que ajustar hiperparâmetros às cegas.",
      visual: "tradeoff",
      paragraphs: [
        "Se treino e validação estão ambos ruins, suspeite de underfitting, otimização ruim ou regularização forte demais. Se o treino está excelente e a validação abre um grande gap, suspeite de overfitting e capacidade efetiva excessiva.",
        "Também vale inspecionar exemplos. Em tarefas generativas, regularização insuficiente pode aparecer como repetições de padrões espúrios do treino. Em visão, pode se manifestar como confiança excessiva em texturas ou fundos particulares do dataset.",
        "Regularização boa aparece menos como um número mágico e mais como um regime coerente em que a rede aprende o padrão principal sem agarrar cada detalhe acidental.",
      ],
      blocks: [
        {
          type: "mistake",
          title: "Erro comum",
          body:
            "Aumentar dropout só porque a validação piorou. Às vezes o modelo já está subajustado, e o problema está no lado oposto.",
        },
      ],
    },
    {
      id: "limites",
      eyebrow: "Limites",
      title: "Regularização não substitui dados melhores nem avaliação melhor",
      lead:
        "Nenhum truque de generalização compensa rótulos ruins, vazamento de dados ou uma validação que não representa o mundo real.",
      visual: "checklist",
      paragraphs: [
        "Se há data leakage entre treino e validação, early stopping vai parecer brilhante por motivos errados. Se os rótulos são inconsistentes, o modelo pode parecer regularizado quando na verdade está limitado por ruído supervisionado. Se a validação não reflete a distribuição real de uso, o ajuste de regularização será enganoso.",
        "Esse lembrete é importante porque regularização atua dentro do pipeline de aprendizagem, não fora dele. Ela melhora o uso da capacidade do modelo, mas não corrige problemas estruturais de coleta, divisão ou medição.",
        "A ordem correta do raciocínio é: dados confiáveis, avaliação representativa, arquitetura razoável e, então, regularização calibrada.",
      ],
      blocks: [
        {
          type: "insight",
          title: "Regularização é parte do sistema, não o sistema inteiro",
          body:
            "Sem um protocolo de validação confiável, até a melhor técnica de regularização pode orientar decisões erradas.",
        },
      ],
    },
    {
      id: "resumo",
      eyebrow: "Síntese",
      title: "Resumo visual da regularização",
      lead:
        "Regularizar é limitar a forma como a rede usa sua capacidade para favorecer padrões que sobrevivem fora do treino.",
      interactive: "summary-cards",
      paragraphs: [
        "Guarde este mapa: dropout quebra dependências frágeis, weight decay controla amplitude dos pesos e early stopping limita especialização tardia guiando a parada pela validação.",
      ],
    },
    {
      id: "quiz-revisao",
      eyebrow: "Revisão",
      title: "Quiz de revisão",
      lead:
        "Teste o vínculo entre overfitting, dropout, weight decay, early stopping e leitura de curvas de treino.",
      interactive: "quiz",
      paragraphs: [
        "O objetivo é entender o raciocínio de generalização, não memorizar hiperparâmetros de prateleira.",
      ],
    },
    {
      id: "glossario",
      eyebrow: "Vocabulário",
      title: "Glossário essencial",
      lead:
        "Feche a aula com os termos mais recorrentes quando o assunto é generalização em deep learning.",
      interactive: "glossary",
      paragraphs: [
        "Esses termos aparecem tanto em papers quanto em APIs de frameworks e ferramentas de experimento.",
      ],
    },
  ],
  summaryCards: [
    {
      title: "Generalizar é o objetivo real",
      body:
        "Treino bom sem validação boa costuma ser sinal de capacidade usada de forma frágil ou oportunista.",
    },
    {
      title: "Dropout combate coadaptação",
      body:
        "Ao desligar unidades aleatoriamente, a rede aprende representações menos dependentes de caminhos fixos.",
    },
    {
      title: "Weight decay controla normas",
      body:
        "Reduzir amplitude dos pesos tende a favorecer soluções menos extremas e menos sensíveis a ruído.",
    },
    {
      title: "Early stopping regulariza no tempo",
      body:
        "Parar no checkpoint certo evita que a rede continue especializando-se além do que a validação suporta.",
    },
  ],
  quiz: [
    {
      id: "q1",
      prompt: "O que caracteriza overfitting em termos de curvas?",
      options: [
        { id: "a", label: "Loss de treino continua melhorando enquanto validação estagna ou piora." },
        { id: "b", label: "Treino e validação estão ambos ruins desde o início." },
        { id: "c", label: "Treino e validação melhoram no mesmo ritmo por todo o processo." },
      ],
      correctOptionId: "a",
      feedback:
        "Esse descolamento entre treino e validação é o sinal mais clássico de memorizar demais detalhes do conjunto de treino.",
    },
    {
      id: "q2",
      prompt: "Qual é a intuição principal do dropout?",
      options: [
        { id: "a", label: "Quebrar coadaptação entre unidades ao desligar ativações aleatoriamente no treino." },
        { id: "b", label: "Aumentar o número de parâmetros da rede." },
        { id: "c", label: "Tornar o learning rate irrelevante." },
      ],
      correctOptionId: "a",
      feedback:
        "Dropout força a rede a distribuir melhor a representação, reduzindo dependência excessiva de combinações fixas de neurônios.",
    },
    {
      id: "q3",
      prompt: "O que o weight decay tenta desencorajar?",
      options: [
        { id: "a", label: "Soluções com pesos excessivamente grandes e potencialmente mais frágeis." },
        { id: "b", label: "Qualquer uso de não linearidade." },
        { id: "c", label: "Treinamento com batches pequenos." },
      ],
      correctOptionId: "a",
      feedback:
        "Ao empurrar pesos para magnitudes menores, o weight decay favorece soluções menos extremas e menos propensas a memorizações oportunistas.",
    },
    {
      id: "q4",
      prompt: "Por que L2 e weight decay não devem ser confundidos cegamente em Adam?",
      options: [
        { id: "a", label: "Porque em otimizadores adaptativos a equivalência matemática se rompe." },
        { id: "b", label: "Porque weight decay só funciona com CNNs." },
        { id: "c", label: "Porque Adam não usa gradientes." },
      ],
      correctOptionId: "a",
      feedback:
        "A formulação desacoplada mostrou que implementar L2 dentro do gradiente não é o mesmo que aplicar weight decay real em Adam e variantes.",
    },
    {
      id: "q5",
      prompt: "Qual é a ideia de early stopping?",
      options: [
        { id: "a", label: "Parar o treino quando a validação deixa de melhorar de forma útil." },
        { id: "b", label: "Parar o treino assim que a loss de treino cair." },
        { id: "c", label: "Parar o treino antes da primeira atualização." },
      ],
      correctOptionId: "a",
      feedback:
        "Early stopping usa a validação como bússola para escolher o checkpoint antes que o modelo continue especializando-se demais.",
    },
    {
      id: "q6",
      prompt: "Qual sintoma sugere regularização excessiva?",
      options: [
        { id: "a", label: "Treino e validação permanecem ambos ruins, sem aprender nem o padrão principal." },
        { id: "b", label: "Treino fica ótimo e validação também." },
        { id: "c", label: "O modelo memoriza completamente o treino." },
      ],
      correctOptionId: "a",
      feedback:
        "Quando nem o treino melhora direito, pode haver capacidade insuficiente ou restrição forte demais: é sinal clássico de underfitting.",
    },
    {
      id: "q7",
      prompt: "Por que combinar vários regularizadores no máximo costuma ser ruim?",
      options: [
        { id: "a", label: "Porque a soma de restrições pode sufocar o aprendizado de padrões reais." },
        { id: "b", label: "Porque regularizadores nunca funcionam juntos." },
        { id: "c", label: "Porque só dropout é permitido em deep learning moderno." },
      ],
      correctOptionId: "a",
      feedback:
        "Regularizadores atacam fragilidades distintas, mas em excesso retiram liberdade demais do modelo e empurram para underfitting.",
    },
    {
      id: "q8",
      prompt: "Qual afirmação é mais correta sobre regularização?",
      options: [
        { id: "a", label: "Ela ajuda a usar melhor a capacidade do modelo, mas não substitui dados e validação de qualidade." },
        { id: "b", label: "Ela corrige qualquer problema de rótulo ou data leakage." },
        { id: "c", label: "Ela elimina a necessidade de escolher arquitetura." },
      ],
      correctOptionId: "a",
      feedback:
        "Regularização é parte importante do sistema de aprendizagem, mas não conserta problemas estruturais de dados e avaliação.",
    },
  ],
  glossary: [
    { term: "Regularização", definition: "Conjunto de técnicas que limita ou orienta a capacidade efetiva do modelo para melhorar generalização." },
    { term: "Generalização", definition: "Capacidade de manter desempenho em dados novos, fora do conjunto de treino." },
    { term: "Overfitting", definition: "Adaptação excessiva aos detalhes do treino, com piora relativa em validação ou teste." },
    { term: "Underfitting", definition: "Falha em aprender até o padrão principal do problema, deixando treino e validação ruins." },
    { term: "Dropout", definition: "Técnica que desliga ativações aleatoriamente durante o treino para reduzir coadaptação." },
    { term: "Coadaptação", definition: "Dependência excessiva entre unidades específicas da rede para produzir uma boa resposta." },
    { term: "Weight decay", definition: "Mecanismo que reduz a magnitude dos pesos ao longo do treinamento." },
    { term: "L2 regularization", definition: "Penalização baseada na soma dos quadrados dos pesos; em SGD simples costuma se aproximar de weight decay." },
    { term: "AdamW", definition: "Variante do Adam que implementa weight decay desacoplado da atualização do gradiente." },
    { term: "Early stopping", definition: "Parada do treino guiada pelo desempenho em validação para evitar especialização tardia excessiva." },
    { term: "Patience", definition: "Número de épocas sem melhora tolerado antes de acionar early stopping." },
    { term: "Gap de generalização", definition: "Diferença entre desempenho em treino e desempenho fora do treino." },
  ],
};
