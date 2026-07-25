import type { LessonContent } from "../../../types/content";

export const treinoValidacaoTesteContent: LessonContent = {
  id: "treino-validacao-teste-vazamento-dados",
  title: "Treino, Validação, Teste e Vazamento de Dados",
  subtitle:
    "Como medir generalização sem se enganar: separar bem os dados é tão importante quanto escolher o modelo.",
  description:
    "Uma aula visual sobre splits, generalização, validação, teste cego, vazamento de dados, séries temporais e leitura honesta de métricas.",
  primaryCategoryId: "inteligencia-artificial",
  secondaryCategoryId: "computacao",
  level: "Intermediário",
  estimatedTime: "40-55 min",
  tags: [
    "Validação",
    "Treino e Teste",
    "Data Leakage",
    "Generalização",
    "Cross-validation",
    "Pipelines",
  ],
  learningObjectives: [
    "Entender o papel distinto de treino, validação e teste em um pipeline de ML.",
    "Explicar por que desempenho em treino não mede generalização por si só.",
    "Reconhecer vazamento de dados em pré-processamento, temporalidade e duplicatas entre splits.",
    "Interpretar gaps entre métricas de treino, validação e teste.",
    "Saber por que o teste deve permanecer cego durante o desenvolvimento.",
    "Entender quando usar splits cronológicos em vez de embaralhamento aleatório.",
    "Relacionar pipelines e validação cruzada a práticas que reduzem contaminação.",
    "Desenvolver um checklist mental para avaliar se um experimento de ML é metodologicamente confiável.",
  ],
  prerequisites: [
    "Noção básica do que é treinar um modelo supervisionado.",
    "Familiaridade inicial com métricas como acurácia ou erro médio.",
    "Entender que modelos precisam ser avaliados em dados novos, não apenas nos exemplos vistos.",
  ],
  references: [
    {
      title: "Cross-validation: evaluating estimator performance",
      source: "scikit-learn — Documentação oficial",
      url: "https://scikit-learn.org/stable/modules/cross_validation",
      note:
        "Explica treino, validação, teste e por que ajustar hiperparâmetros olhando o teste contamina a estimativa de generalização.",
    },
    {
      title: "Common pitfalls and recommended practices",
      source: "scikit-learn — Documentação oficial",
      url: "https://scikit-learn.org/stable/common_pitfalls.html",
      note:
        "Guia oficial sobre vazamento de dados, uso correto de pipelines e separação entre fit no treino e transformação no teste.",
    },
    {
      title: "CS229 Lecture Notes",
      source: "Stanford University",
      url: "https://cs229.stanford.edu/main_notes.pdf",
      note:
        "Notas oficiais com discussão de generalização, viés, variância, regularização e model selection.",
    },
    {
      title: "Supervised Learning",
      source: "Google for Developers",
      url: "https://developers.google.com/machine-learning/intro-to-ml/supervised",
      note:
        "Material introdutório sobre treino, avaliação e uso de dados rotulados em problemas supervisionados.",
    },
    {
      title: "Deep Learning",
      source: "Goodfellow, Bengio e Courville — MIT Press",
      url: "https://www.deeplearningbook.org/",
      note:
        "O capítulo de metodologia prática ajuda a entender por que avaliação, tuning e separação de dados são centrais em ML moderno.",
    },
    {
      title: "The Elements of Statistical Learning",
      source: "Hastie, Tibshirani e Friedman — Stanford",
      url: "https://hastie.su.domains/ElemStatLearn/",
      note:
        "Referência clássica para intuições de generalização, model selection e avaliação fora da amostra.",
    },
  ],
  heroVisual: "splits-hero",
  openingText:
    "É tentador acreditar no número mais bonito que aparece no notebook. O modelo atingiu 98%? Excelente. Mas em machine learning a pergunta decisiva não é 'quão bem ele foi no treino?', e sim 'o que acontece quando encontra dados novos, parecidos com o mundo real?'. É por isso que treino, validação e teste existem. Eles não são uma burocracia acadêmica; são a barreira entre um experimento honesto e um sistema que parece brilhante só porque trapaceou sem perceber.",
  quickFacts: [
    {
      title: "Treino não é auditoria",
      body:
        "O conjunto de treino serve para ajustar o modelo. Ele é, por definição, o ambiente mais fácil para o próprio modelo.",
    },
    {
      title: "Validação decide, teste confirma",
      body:
        "Use validação para escolher configurações. Use teste para medir o pipeline final sem deixá-lo influenciar as escolhas.",
    },
    {
      title: "Vazamento pode ser silencioso",
      body:
        "Padronizar, selecionar features ou usar informação futura antes do split já é suficiente para inflar métricas.",
    },
    {
      title: "Séries temporais pedem cuidado extra",
      body:
        "Quando o tempo importa, embaralhar exemplos pode fazer o futuro vazar para o passado.",
    },
  ],
  sections: [
    {
      id: "por-que-dividir",
      eyebrow: "Fundamento",
      title: "Por que dividir os dados em vez de treinar em tudo de uma vez?",
      lead:
        "Porque o objetivo real não é explicar perfeitamente o passado, e sim prever ou decidir bem em situações novas.",
      visual: "splits-hero",
      paragraphs: [
        "Se você treina e mede no mesmo conjunto, o modelo é avaliado no ambiente mais favorável possível: o próprio conjunto que influenciou seus parâmetros. Isso pode mascarar sobreajuste, memorizações acidentais e simplificações perigosas.",
        "Separar os dados cria um pequeno teatro metodológico. O treino é o passado conhecido. A validação é o laboratório onde você compara alternativas. O teste é a simulação mais honesta de um dado novo que ainda não influenciou suas decisões.",
        "Essa disciplina não existe para 'ser formal'. Ela existe porque, sem ela, métricas bonitas podem refletir contaminação do experimento em vez de aprendizado verdadeiro.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Avaliação fora da amostra",
          body:
            "Prática de medir desempenho em exemplos que não foram usados para ajustar diretamente os parâmetros do modelo.",
        },
        {
          type: "mistake",
          title: "Medir só no treino",
          body:
            "Um modelo pode parecer excelente no conjunto visto e ainda assim falhar quando sai do laboratório. Desempenho no treino não substitui generalização.",
        },
      ],
    },
    {
      id: "papel-do-treino",
      eyebrow: "Papel 1",
      title: "Treino: aqui o modelo pode errar, corrigir e ajustar parâmetros",
      lead:
        "O conjunto de treino é o espaço onde o algoritmo aprende diretamente a partir dos exemplos disponíveis.",
      visual: "split-pipeline",
      paragraphs: [
        "Durante o treino, o modelo vê entradas e respostas esperadas e ajusta seus parâmetros para reduzir erro. Esse é o único conjunto onde o fit deve acontecer. Qualquer transformação que aprenda estatísticas do dado também pertence a essa etapa.",
        "Isso inclui normalização, imputação, seleção de features, redução de dimensionalidade e qualquer outro passo que calcule alguma estrutura. Se esses passos olharem para o teste, o isolamento metodológico se perde.",
        "O treino não é 'melhor' nem 'mais verdadeiro' do que os demais. Ele é apenas o conjunto autorizado a ensinar o modelo.",
      ],
      blocks: [
        {
          type: "example",
          title: "Exemplo de pipeline correto",
          body:
            "Separar os dados primeiro, ajustar scaler e modelo apenas no treino e depois aplicar transform nos demais conjuntos usando os parâmetros aprendidos no treino.",
        },
      ],
    },
    {
      id: "papel-da-validacao",
      eyebrow: "Papel 2",
      title: "Validação: o laboratório de escolhas do experimento",
      lead:
        "É na validação que você compara versões de modelo, escolhe hiperparâmetros e decide quando algo parece generalizar melhor.",
      paragraphs: [
        "A validação existe porque precisamos tomar decisões durante o desenvolvimento. Qual regularização usar? Qual profundidade? Qual conjunto de features? Qual arquitetura? Se todas essas escolhas forem feitas olhando o teste, o teste deixa de ser honesto.",
        "Pense na validação como um espelho parcial do mundo novo. Ela ainda está participando do desenvolvimento, então suas métricas precisam ser lidas com humildade. Mesmo assim, ela é o lugar correto para escolher entre alternativas sem destruir o valor do teste final.",
        "Quando os dados são escassos, validação cruzada ajuda a reutilizar melhor o conjunto disponível, mas a lógica continua a mesma: o teste final deve continuar isolado.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Hiperparâmetro",
          body:
            "Configuração escolhida externamente ao treinamento dos parâmetros, como profundidade máxima, taxa de regularização ou número de vizinhos.",
        },
        {
          type: "insight",
          title: "Validação não é o fim da história",
          body:
            "Mesmo boas decisões tomadas na validação podem se mostrar otimistas. Por isso o teste continua sendo necessário como auditoria final.",
        },
      ],
    },
    {
      id: "papel-do-teste",
      eyebrow: "Papel 3",
      title: "Teste: o conjunto cego que deve chegar por último",
      lead:
        "O teste serve para responder uma pergunta estreita e valiosa: depois de todas as escolhas, como o pipeline final se comporta em dados realmente novos?",
      visual: "blind-test-audit",
      paragraphs: [
        "Se você consulta o teste para escolher entre alternativas, mesmo que sem ajustar parâmetros diretamente, já está deixando o teste influenciar o desenho do experimento. Aos poucos, ele vira mais uma validação disfarçada.",
        "Um bom teste não precisa ser enorme nem perfeito, mas precisa estar protegido da curiosidade prematura. Em equipes maduras, isso é tratado quase como uma auditoria: o conjunto final é guardado até o momento apropriado.",
        "Essa disciplina é a diferença entre estimar generalização e apenas otimizar para mais uma tela de métricas.",
      ],
      blocks: [
        {
          type: "mistake",
          title: "Escolher pelo teste porque 'é o conjunto mais real'",
          body:
            "Justamente por ser o mais realista, o teste precisa permanecer cego. Se ele guia suas escolhas, deixa de medir o que deveria medir.",
        },
      ],
    },
    {
      id: "laboratorio-de-splits",
      eyebrow: "Exploração",
      title: "Proporções de split mudam o equilíbrio entre aprender, ajustar e auditar",
      lead:
        "Não existe uma porcentagem sagrada, mas existe um raciocínio: cada parte precisa ser grande o suficiente para cumprir sua função.",
      interactive: "interactive-split-lab",
      paragraphs: [
        "Se o treino é pequeno demais, o modelo aprende pouco. Se a validação é minúscula, escolher hiperparâmetros vira loteria. Se o teste é residual, sua leitura final oscila demais e perde credibilidade.",
        "Em séries temporais, a lógica muda ainda mais: o fundamental não é só proporção, mas respeitar ordem cronológica. O conjunto de avaliação precisa simular o futuro, não misturar passado e futuro aleatoriamente.",
      ],
      blocks: [
        {
          type: "example",
          title: "Heurística comum",
          body:
            "Muitas equipes começam com algo como treino maior, validação intermediária e teste reservado, depois ajustam conforme volume, custo de erro e necessidade de tuning.",
        },
      ],
    },
    {
      id: "vazamento",
      eyebrow: "Risco central",
      title: "Vazamento de dados: quando o modelo aprende com informação que não deveria ter",
      lead:
        "Vazamento não exige má intenção. Ele costuma surgir de atalhos aparentemente inocentes na preparação dos dados.",
      visual: "leakage-flow",
      paragraphs: [
        "O caso clássico é ajustar um pré-processador no dataset inteiro antes da divisão. Embora ninguém tenha copiado os rótulos do teste para o treino, o sistema já aprendeu algo sobre a distribuição do teste e contaminou a avaliação.",
        "Outro caso comum aparece em problemas temporais: usar uma variável que só é conhecida depois do evento que estamos tentando prever. Nessa situação, o modelo 'vê o futuro'. Duplicatas, sessões do mesmo usuário espalhadas entre splits e engineered features derivadas do alvo também podem causar vazamento.",
        "A característica mais traiçoeira do vazamento é que ele costuma melhorar as métricas. Ou seja: o erro metodológico se apresenta com cara de sucesso.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Vazamento de dados",
          body:
            "Uso de informação indisponível no momento real da previsão durante o treinamento, tuning ou avaliação de um modelo.",
        },
        {
          type: "insight",
          title: "Métrica muito boa pode ser sintoma",
          body:
            "Quando um resultado parece bom demais para ser verdade, vale investigar se o pipeline recebeu ajuda indevida do próprio conjunto de avaliação.",
        },
      ],
    },
    {
      id: "detetive-de-vazamento",
      eyebrow: "Diagnóstico",
      title: "Treine o olhar para reconhecer vazamento cedo",
      lead:
        "Mais importante do que decorar exemplos é internalizar a regra: nada que aprende com dados pode ver o teste antes da hora.",
      interactive: "leakage-detective",
      paragraphs: [
        "Esse olhar metodológico é uma habilidade de engenharia. Pipelines, validação cruzada e organização do experimento existem justamente para automatizar boas fronteiras entre o que pode e o que não pode ser ajustado com cada split.",
        "Em projetos sérios, detectar vazamento cedo economiza semanas de confiança mal depositada. Corrigir depois que o modelo foi apresentado como ótimo costuma ser muito mais caro politicamente e tecnicamente.",
      ],
      blocks: [
        {
          type: "example",
          title: "Pipelines ajudam",
          body:
            "Quando o pré-processamento e o modelo ficam encadeados no pipeline, fica mais fácil garantir que cada fold ou split aprende apenas do conjunto autorizado.",
        },
      ],
    },
    {
      id: "ler-metricas",
      eyebrow: "Interpretação",
      title: "Treino, validação e teste contam histórias diferentes sobre o modelo",
      lead:
        "Olhar só para um número esconde o que está acontecendo. Comparar os conjuntos revela subajuste, sobreajuste e experimentos contaminados.",
      visual: "generalization-gap",
      interactive: "train-vs-test-chart",
      paragraphs: [
        "Quando treino e validação estão ambos baixos, o modelo talvez esteja simples demais ou mal representado. Quando treino é excelente e validação cai bastante, pode haver sobreajuste. Quando treino e validação parecem espetaculares, mas o teste desaba, o experimento provavelmente contou vantagem cedo demais.",
        "Ler métricas assim não substitui investigação qualitativa dos erros, mas ajuda a diagnosticar rapidamente onde o problema está: capacidade, dados, tuning, vazamento ou mudança de distribuição.",
      ],
      blocks: [
        {
          type: "mistake",
          title: "Chamar toda diferença de overfitting",
          body:
            "Nem todo gap é sobreajuste puro. Às vezes o problema é vazamento, distribuição diferente ou um conjunto de validação pouco representativo.",
        },
      ],
    },
    {
      id: "series-temporais-e-grupos",
      eyebrow: "Casos especiais",
      title: "Nem todo split deve ser aleatório: tempo e grupos exigem fronteiras próprias",
      lead:
        "Quando exemplos compartilham usuário, paciente, máquina ou ordem temporal, dividir ingenuamente pode criar avaliação artificialmente fácil.",
      visual: "timeseries-split",
      paragraphs: [
        "Em séries temporais, a lógica correta costuma ser treinar no passado e avaliar no futuro. Em dados agrupados, como múltiplas amostras do mesmo paciente, é comum preservar o grupo inteiro no mesmo lado do split para evitar quase duplicatas entre treino e teste.",
        "A pergunta que guia tudo é: no uso real, o modelo verá algo verdadeiramente novo ou uma variação quase idêntica do que já conheceu? O split deve reproduzir essa condição da forma mais honesta possível.",
        "Separar bem os dados não é um detalhe operacional. É a tradução metodológica da pergunta 'que tipo de novidade meu modelo enfrentará em produção?'.",
      ],
      blocks: [
        {
          type: "insight",
          title: "O split deve imitar o uso real",
          body:
            "A melhor estratégia de divisão é aquela que torna a avaliação parecida com a situação de produção mais importante para o produto.",
        },
      ],
    },
    {
      id: "resumo-final",
      eyebrow: "Síntese",
      title: "Resumo visual da avaliação honesta",
      lead:
        "Guardar o teste, proteger o pipeline e desconfiar de métricas boas demais são hábitos que sustentam experimentos confiáveis.",
      interactive: "summary-cards",
      paragraphs: [
        "Volte a este resumo sempre que estiver montando um novo experimento. Separação de dados correta é parte do modelo, não uma etapa periférica.",
      ],
    },
    {
      id: "quiz",
      eyebrow: "Revisão",
      title: "Quiz de revisão",
      lead:
        "Teste se você consegue diferenciar as funções dos splits e identificar vazamentos comuns.",
      interactive: "quiz",
      paragraphs: [
        "O objetivo aqui é fortalecer o julgamento metodológico que evita resultados ilusórios.",
      ],
    },
    {
      id: "glossario",
      eyebrow: "Vocabulário",
      title: "Glossário essencial",
      lead:
        "Feche a aula consolidando o vocabulário que aparece em quase toda discussão séria sobre avaliação de modelos.",
      interactive: "glossary",
      paragraphs: [
        "Com estes termos claros, fica mais fácil conversar sobre confiabilidade experimental e riscos de generalização.",
      ],
    },
  ],
  summaryCards: [
    {
      title: "Treino ajusta",
      body:
        "O conjunto de treino é a única parte autorizada a ensinar diretamente o modelo e os transformadores do pipeline.",
    },
    {
      title: "Validação decide",
      body:
        "Use validação para comparar alternativas, escolher hiperparâmetros e calibrar o desenvolvimento sem corromper o teste.",
    },
    {
      title: "Teste audita",
      body:
        "O teste deve chegar por último para estimar generalização do pipeline final sem participar das escolhas.",
    },
    {
      title: "Vazamento infla métricas",
      body:
        "Quando o experimento deixa o modelo ver informação indevida, os números melhoram do jeito errado.",
    },
  ],
  quiz: [
    {
      id: "q1",
      prompt: "Qual é a principal função do conjunto de treino?",
      options: [
        { id: "a", label: "Ajustar os parâmetros do modelo." },
        { id: "b", label: "Servir como auditoria final do pipeline." },
        { id: "c", label: "Ser consultado só depois de toda decisão." },
      ],
      correctOptionId: "a",
      feedback:
        "O treino é o conjunto usado para fit. Ele ensina diretamente o modelo e outros passos aprendidos do pipeline.",
    },
    {
      id: "q2",
      prompt: "Por que usar o teste para escolher hiperparâmetros é um problema?",
      options: [
        { id: "a", label: "Porque o teste passa a influenciar o desenvolvimento e deixa de ser auditoria honesta." },
        { id: "b", label: "Porque hiperparâmetros só podem ser escolhidos aleatoriamente." },
        { id: "c", label: "Porque o treino então não precisa mais existir." },
      ],
      correctOptionId: "a",
      feedback:
        "Quando o teste orienta escolhas, ele se torna parte do tuning e perde seu papel de estimar generalização final.",
    },
    {
      id: "q3",
      prompt: "Padronizar o dataset inteiro antes do split é...",
      options: [
        { id: "a", label: "uma boa prática para ganhar estabilidade." },
        { id: "b", label: "um tipo comum de vazamento de dados." },
        { id: "c", label: "irrelevante para a avaliação." },
      ],
      correctOptionId: "b",
      feedback:
        "O scaler aprende estatísticas do conjunto inteiro, inclusive do teste, contaminando a avaliação.",
    },
    {
      id: "q4",
      prompt: "Quando treino e validação estão ambos baixos, o que isso costuma sugerir primeiro?",
      options: [
        { id: "a", label: "Subajuste ou representação insuficiente." },
        { id: "b", label: "Vazamento severo." },
        { id: "c", label: "Teste cego bem protegido." },
      ],
      correctOptionId: "a",
      feedback:
        "Baixo desempenho consistente entre treino e validação costuma indicar que o modelo ainda não capturou o padrão principal.",
    },
    {
      id: "q5",
      prompt: "Qual afirmação descreve melhor o conjunto de validação?",
      options: [
        { id: "a", label: "É usado para escolher entre alternativas durante o desenvolvimento." },
        { id: "b", label: "É o único conjunto que nunca deve ser visto." },
        { id: "c", label: "Substitui completamente a necessidade de treino." },
      ],
      correctOptionId: "a",
      feedback:
        "Validação serve para comparações e tuning sem tocar no teste final.",
    },
    {
      id: "q6",
      prompt: "Em séries temporais, por que embaralhar pode ser perigoso?",
      options: [
        { id: "a", label: "Porque pode fazer o futuro vazar para o passado." },
        { id: "b", label: "Porque sempre reduz o tamanho do treino pela metade." },
        { id: "c", label: "Porque impede o uso de qualquer métrica." },
      ],
      correctOptionId: "a",
      feedback:
        "Quando o tempo importa, misturar tudo pode gerar avaliação artificialmente fácil e pouco realista.",
    },
    {
      id: "q7",
      prompt: "O que torna o vazamento especialmente perigoso?",
      options: [
        { id: "a", label: "Ele geralmente piora muito as métricas e denuncia o erro imediatamente." },
        { id: "b", label: "Ele pode melhorar as métricas e parecer sucesso legítimo." },
        { id: "c", label: "Ele só acontece em redes neurais profundas." },
      ],
      correctOptionId: "b",
      feedback:
        "Vazamento é traiçoeiro justamente porque costuma inflar os números, criando confiança onde deveria haver desconfiança.",
    },
    {
      id: "q8",
      prompt: "Qual é a melhor leitura para um cenário em que treino e validação parecem ótimos, mas o teste final cai muito?",
      options: [
        { id: "a", label: "Tudo está bem; o teste é que é desnecessário." },
        { id: "b", label: "Há indício de experimento contaminado, tuning excessivo ou avaliação otimista." },
        { id: "c", label: "O treino deve ser imediatamente descartado." },
      ],
      correctOptionId: "b",
      feedback:
        "Esse padrão pede investigação: vazamento, validação pouco representativa ou ajuste demais às escolhas de desenvolvimento.",
    },
  ],
  glossary: [
    {
      term: "Treino",
      definition:
        "Conjunto de dados usado para ajustar diretamente os parâmetros do modelo.",
    },
    {
      term: "Validação",
      definition:
        "Conjunto usado durante o desenvolvimento para comparar alternativas e escolher configurações.",
    },
    {
      term: "Teste",
      definition:
        "Conjunto reservado para avaliar o pipeline final sem influenciar as decisões de desenvolvimento.",
    },
    {
      term: "Generalização",
      definition:
        "Capacidade do modelo de manter desempenho útil em dados novos e plausíveis.",
    },
    {
      term: "Vazamento de dados",
      definition:
        "Uso indevido de informação indisponível no momento real da previsão durante treino, tuning ou avaliação.",
    },
    {
      term: "Pipeline",
      definition:
        "Encadeamento de transformações e modelo de forma a controlar corretamente em que dados cada etapa faz fit.",
    },
    {
      term: "Hiperparâmetro",
      definition:
        "Configuração externa ao ajuste dos parâmetros, escolhida pelo pesquisador ou por busca sistemática.",
    },
    {
      term: "Validação cruzada",
      definition:
        "Procedimento que reutiliza o conjunto de treino em múltiplos folds para estimar desempenho e escolher configurações.",
    },
    {
      term: "Split cronológico",
      definition:
        "Estratégia de divisão em que treino, validação e teste respeitam a ordem temporal dos exemplos.",
    },
    {
      term: "Duplicata entre splits",
      definition:
        "Exemplo idêntico ou quase idêntico que aparece em mais de uma partição e torna a avaliação artificialmente fácil.",
    },
    {
      term: "Fora da amostra",
      definition:
        "Expressão para dados que não participaram diretamente do ajuste do modelo.",
    },
    {
      term: "Gap de generalização",
      definition:
        "Diferença entre desempenho no treino e em conjuntos não usados para ajuste direto, como validação ou teste.",
    },
  ],
  relatedTopics: [
    {
      title: "Overfitting e regularização",
      body:
        "Depois de organizar bem os splits, o próximo passo é entender por que modelos complexos podem se encaixar demais no treino.",
    },
    {
      title: "Paradigmas de aprendizado",
      body:
        "O papel de treino, validação e teste aparece com mais força em tarefas supervisionadas, mas a lógica de avaliação honesta importa em outros contextos também.",
    },
  ],
};
