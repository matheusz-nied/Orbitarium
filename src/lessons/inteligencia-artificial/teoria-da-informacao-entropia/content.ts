import type { LessonContent } from "../../../types/content";

export const teoriaDaInformacaoEntropiaContent: LessonContent = {
  id: "teoria-da-informacao-entropia",
  title: "Teoria da Informação: Entropia e Surpresa",
  subtitle:
    "Como quantificar incerteza, previsibilidade e custo de errar probabilidades — da ideia de surpresa de Shannon até a cross-entropy usada para treinar modelos modernos.",
  description:
    "Uma aula visual sobre surpresa, bits, entropia de Shannon, compressão, previsibilidade de texto e a ponte entre cross-entropy e loss em machine learning.",
  primaryCategoryId: "inteligencia-artificial",
  secondaryCategoryId: "matematica",
  level: "Intermediário",
  estimatedTime: "45-60 min",
  tags: [
    "Teoria da Informação",
    "Entropia",
    "Cross-Entropy",
    "Compressão",
    "Bits",
    "Shannon",
    "Machine Learning",
  ],
  learningObjectives: [
    "Entender surpresa como quantidade de informação associada a um evento improvável.",
    "Relacionar bits à ideia de perguntas binárias necessárias para identificar um resultado.",
    "Interpretar entropia de Shannon como incerteza média de uma distribuição.",
    "Explicar por que distribuições mais equilibradas têm entropia maior do que distribuições mais concentradas.",
    "Relacionar entropia à compressão e à previsibilidade de sequências simbólicas.",
    "Construir a ponte conceitual entre entropia, cross-entropy e loss de classificação.",
    "Entender por que modelos de linguagem e classificadores probabilísticos são avaliados por quão bem distribuem probabilidade.",
  ],
  prerequisites: [
    "Noção básica de probabilidade e distribuições.",
    "Familiaridade com logaritmo ajuda, mas não é obrigatória para acompanhar a intuição.",
    "Curiosidade sobre compressão, linguagem e treinamento de modelos.",
    "Conforto com interpretação de gráficos simples.",
  ],
  references: [
    {
      title: "A Mathematical Theory of Communication",
      source: "Claude E. Shannon, 1948 — Computer History Archive",
      url: "http://archive.computerhistory.org/projects/chess/related_materials/text/2-0%20and%202-1.A_mathematical_theory_of_communication/2-0%20and%202-1.A_mathematical_theory_of_communication.shannon-claude.1948.062303000.pdf",
      note:
        "Paper fundador da teoria da informação, introduzindo bit, entropia e a formalização matemática da comunicação.",
    },
    {
      title: "Information Theory",
      source: "MIT OpenCourseWare",
      url: "https://ocw.mit.edu/courses/6-441-information-theory-spring-2016/",
      note:
        "Curso do MIT sobre entropia, compressão, canais e medidas de informação.",
    },
    {
      title: "Information Measures: Entropy and Divergence",
      source: "MIT OpenCourseWare",
      url: "https://ocw.mit.edu/courses/6-441-information-theory-spring-2016/resources/mit6_441s16_chapter_1/",
      note:
        "Notas sobre definição de entropia, divergência e interpretação operacional.",
    },
    {
      title: "Information Theory, Inference, and Learning Algorithms",
      source: "David J. C. MacKay",
      url: "https://inference.org.uk/mackay/itila/p0.html",
      note:
        "Livro clássico disponível legalmente online, conectando entropia, compressão, inferência e aprendizado.",
    },
    {
      title: "Elements of Information Theory",
      source: "Cover & Thomas — Wiley Online Library",
      url: "https://onlinelibrary.wiley.com/doi/book/10.1002/047174882X",
      note:
        "Referência clássica sobre entropia, informação mútua, compressão e codificação.",
    },
    {
      title: "Logistic regression: Loss and regularization",
      source: "Google Machine Learning Crash Course",
      url: "https://developers.google.com/machine-learning/crash-course/logistic-regression/loss-regularization",
      note:
        "Material oficial que liga log loss e cross-entropy ao treinamento de classificadores probabilísticos.",
    },
    {
      title: "Probability and Information Theory",
      source: "Deep Learning Book — Goodfellow, Bengio e Courville",
      url: "https://www.deeplearningbook.org/contents/prob.html",
      note:
        "Capítulo que apresenta entropia, divergência e sua importância para modelos de aprendizado profundo.",
    },
  ],
  heroVisual: "teoria-informacao-hero",
  openingText:
    "Nem toda mensagem tem o mesmo impacto informacional. Se alguém diz 'o Sol nasceu hoje', você aprende quase nada, porque o evento era extremamente esperado. Se alguém diz 'um satélite detectou um fenômeno raro exatamente agora', a surpresa é muito maior. A teoria da informação formaliza essa diferença. Ela mede quanta incerteza havia antes do evento, quantos bits seriam necessários para descrevê-lo e quão caro é, para um modelo, apostar probabilidades ruins. Essa ponte entre surpresa e perda é uma das conexões mais elegantes entre matemática e IA.",
  quickFacts: [
    {
      title: "Surpresa depende da probabilidade",
      body:
        "Eventos improváveis carregam mais informação quando acontecem, porque reduzem mais incerteza do que eventos previsíveis.",
    },
    {
      title: "Bit é pergunta binária",
      body:
        "Pensar em bits como respostas sim/não ajuda a entender por que entropia mede o custo médio mínimo de descrição.",
    },
    {
      title: "Entropia é média, não caso isolado",
      body:
        "Ela resume a incerteza média de toda a distribuição, não apenas a surpresa de um evento específico.",
    },
    {
      title: "Cross-entropy pune má confiança",
      body:
        "Modelos erram menos quando colocam alta probabilidade no resultado correto; erram mais caro quando ficam confiantes no resultado errado.",
    },
  ],
  sections: [
    {
      id: "surpresa-como-informacao",
      eyebrow: "Ponto de partida",
      title: "Informação começa como surpresa: o improvável ensina mais",
      lead:
        "A intuição central de Shannon é simples e profunda: quanto menos provável um evento, mais informação ele carrega quando acontece.",
      visual: "surpresa-intuicao",
      paragraphs: [
        "Se um resultado é quase certo, observá-lo muda pouco o seu estado de conhecimento. Se um resultado era improvável, observá-lo reduz mais incerteza e, por isso, informa mais. A teoria da informação não pergunta pelo significado humano da mensagem; pergunta pelo quanto ela reduz a incerteza entre alternativas possíveis.",
        "Essa perspectiva é extremamente útil para IA porque muitos sistemas lidam com previsão. Modelos competem para colocar mais massa de probabilidade em eventos que realmente ocorrem. Quando falham de forma confiante, a surpresa do evento correto se torna alta — e a perda também.",
        "Pensar em surpresa como informação já prepara o terreno para entropia. Primeiro medimos a surpresa de um evento específico; depois calculamos a média dessa surpresa ao longo da distribuição inteira.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Surpresa informacional",
          body:
            "Quantidade de informação associada à ocorrência de um evento, maior quando esse evento tinha baixa probabilidade.",
        },
        {
          type: "insight",
          title: "Shannon separa informação de significado",
          body:
            "Para teoria da informação, o ponto não é se a mensagem é profunda ou banal em termos humanos, mas sim quanto ela reduz incerteza no sistema de comunicação.",
        },
      ],
    },
    {
      id: "bits-e-perguntas",
      eyebrow: "Unidade",
      title: "Bit é a unidade de escolha entre alternativas binárias",
      lead:
        "Bits ficam mais intuitivos quando pensamos em perguntas sim/não necessárias para identificar um resultado.",
      visual: "bits-perguntas",
      paragraphs: [
        "Se há apenas duas alternativas equiprováveis, uma pergunta binária basta para distinguir qual aconteceu. Se há quatro alternativas equiprováveis, em média precisamos de duas perguntas. Essa lógica conecta informação à ideia de código e descrição eficiente.",
        "O logaritmo em base 2 aparece justamente porque cada bit dobra a quantidade de alternativas distinguíveis. Em vez de tratar bit como entidade abstrata, é melhor vê-lo como custo mínimo de decisão binária acumulada.",
        "Para IA, essa interpretação é importante porque cross-entropy, perplexidade e compressão todos herdam essa visão operacional da informação.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Bit",
          body:
            "Unidade de informação associada a uma escolha binária entre duas alternativas equiprováveis.",
        },
        {
          type: "example",
          title: "Quatro resultados equiprováveis",
          body:
            "Se cada resultado é igualmente plausível, duas perguntas sim/não bastam para identificá-lo. Isso corresponde a 2 bits.",
        },
      ],
    },
    {
      id: "entropia-shannon",
      eyebrow: "Conceito central",
      title: "Entropia de Shannon mede a incerteza média de uma distribuição",
      lead:
        "Entropia não descreve um evento isolado; ela resume o quanto, em média, ainda não sabemos antes de observar o resultado.",
      visual: "entropia-distribuicao",
      interactive: "live-entropy-distribution",
      paragraphs: [
        "Quando uma distribuição é totalmente concentrada em um único resultado, quase não há incerteza: a entropia é baixa. Quando vários resultados são igualmente plausíveis, a incerteza média cresce: a entropia é alta. Essa leitura faz da entropia um resumo estrutural da imprevisibilidade.",
        "O grande mérito da fórmula de Shannon é transformar essa intuição em quantidade comparável. Ela soma a surpresa de cada resultado ponderada pela sua própria probabilidade. Ou seja, entropia é surpresa média.",
        "Em IA, essa noção ajuda a distinguir previsões seguras de previsões difusas, distribuições concentradas de distribuições indecisas e textos previsíveis de textos ricos em alternativas.",
      ],
      blocks: [
        {
          type: "formula",
          title: "Entropia de Shannon",
          body:
            "A entropia é a média ponderada da surpresa dos resultados possíveis em base 2.",
          formula: "H(X) = - soma p(x) log2 p(x)",
        },
        {
          type: "mistake",
          title: "Confundir entropia alta com desordem sem contexto",
          body:
            "Entropia alta significa maior incerteza média na distribuição considerada. Não é um julgamento universal sobre caos ou qualidade.",
        },
      ],
    },
    {
      id: "texto-e-previsibilidade",
      eyebrow: "Aplicação intuitiva",
      title: "Textos previsíveis têm menos entropia do que textos variados",
      lead:
        "Uma sequência repetitiva é fácil de prever e fácil de comprimir. Uma sequência rica em alternativas carrega mais surpresa média.",
      visual: "compressao-predictability",
      interactive: "text-entropy-comparator",
      paragraphs: [
        "Se um texto repete sempre os mesmos poucos símbolos, o próximo símbolo tende a ser previsível. Em contrapartida, quando muitos símbolos aparecem com frequências mais distribuídas, a incerteza sobre o próximo caractere ou token cresce. Essa é uma forma simples de sentir entropia sem mergulhar logo em formalismos.",
        "É claro que texto real envolve contexto, dependências e linguagem natural complexa. Ainda assim, a frequência dos símbolos já oferece uma ponte inicial entre estatística e compressão. Quanto mais previsível a fonte, menos bits médios tendem a ser necessários para codificá-la.",
        "Essa ponte é especialmente relevante para IA de linguagem, porque modelos não aprendem significado de forma mágica. Eles aprendem padrões estatísticos de previsibilidade em sequências.",
      ],
      blocks: [
        {
          type: "insight",
          title: "Previsibilidade e compressão caminham juntas",
          body:
            "Se algo é fácil de prever, também tende a ser fácil de codificar com poucas decisões extras.",
        },
        {
          type: "example",
          title: "AAAAAA vs texto diversificado",
          body:
            "Uma sequência de um único símbolo quase não surpreende. Já uma sequência com muitos símbolos balanceados tende a exigir mais informação média por símbolo.",
        },
      ],
    },
    {
      id: "compressao",
      eyebrow: "Consequência operacional",
      title: "Entropia conversa com compressão porque descreve o limite médio de descrição",
      lead:
        "Teoria da informação não é só filosofia sobre incerteza: ela também fala sobre quantos bits, em média, uma fonte realmente exige.",
      visual: "compressao-predictability",
      paragraphs: [
        "Se alguns símbolos aparecem muito mais que outros, vale usar códigos curtos para os frequentes e códigos mais longos para os raros. Essa é a intuição por trás da compressão sem perdas. Não se trata de adivinhação, mas de explorar estatisticamente a estrutura da fonte.",
        "A entropia entra como limite conceitual: ela informa o custo médio mínimo que uma codificação eficiente pode esperar alcançar em certas condições ideais. Ou seja, a distribuição não é apenas uma curiosidade teórica; ela determina quão comprimível a informação é.",
        "Essa conexão é uma das belezas da teoria da informação: a mesma medida que resume incerteza também orienta engenharia de representação eficiente.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Compressão sem perdas",
          body:
            "Estratégia de codificação que reduz o tamanho da representação sem destruir a possibilidade de reconstruir exatamente a mensagem original.",
        },
        {
          type: "insight",
          title: "Distribuição dita código eficiente",
          body:
            "Sem conhecer quão frequentes são os símbolos, não há como projetar um bom esquema médio de compressão.",
        },
      ],
    },
    {
      id: "cross-entropy",
      eyebrow: "Ponte para loss",
      title: "Cross-entropy mede o custo de usar a distribuição errada para prever a correta",
      lead:
        "Entropia olha para a incerteza da fonte. Cross-entropy olha para o custo de descrevê-la usando probabilidades previstas por outro modelo.",
      visual: "cross-entropy-loss",
      interactive: "cross-entropy-bridge",
      paragraphs: [
        "Se a distribuição prevista por um modelo coincide com a distribuição verdadeira, o custo médio é baixo. Se o modelo coloca pouca probabilidade no que realmente acontece, o custo cresce. É por isso que cross-entropy é uma loss tão natural para classificação probabilística.",
        "A grande força dessa loss é punir especialmente erros confiantes. Dizer 'tal classe tem 1% de chance' quando ela era a correta é muito pior do que dizer 'talvez 35%'. A cross-entropy transforma essa intuição em penalização matemática consistente.",
        "Em outras palavras, não basta acertar o rótulo final às vezes; importa como a massa de probabilidade foi distribuída. A loss avalia justamente essa qualidade probabilística.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Cross-entropy",
          body:
            "Medida do custo médio de representar uma distribuição verdadeira usando as probabilidades atribuídas por outro modelo.",
        },
        {
          type: "mistake",
          title: "Achar que só o rótulo importa",
          body:
            "Cross-entropy mostra que a qualidade da distribuição prevista importa muito. Dois modelos podem acertar o mesmo rótulo e ainda assim ter losses bem diferentes.",
        },
      ],
    },
    {
      id: "llms-e-classificadores",
      eyebrow: "Conexão com IA",
      title: "Modelos de linguagem e classificadores treinam para distribuir probabilidade melhor",
      lead:
        "Treinar com cross-entropy significa ensinar o modelo a colocar mais massa nos eventos que realmente ocorrem no dado.",
      visual: "llm-proximapalavra",
      paragraphs: [
        "Em classificação, isso significa aumentar a probabilidade da classe correta. Em modelos de linguagem, significa aumentar a probabilidade do próximo token observado no corpus. O processo inteiro pode ser visto como ajuste iterativo de distribuições previstas para que combinem melhor com os dados.",
        "Essa visão é valiosa porque mostra continuidade entre teoria da informação e prática moderna. Quando falamos de log loss, perplexidade ou distribuição sobre o próximo token, estamos apenas reencenando as ideias de Shannon em um contexto computacional contemporâneo.",
        "Assim, a entropia não é um capítulo distante da IA. Ela reaparece no coração dos objetivos de treinamento usados todos os dias.",
      ],
      blocks: [
        {
          type: "example",
          title: "Próximo token",
          body:
            "Se o texto real segue com 'planeta' e o modelo havia dado alta probabilidade a 'planeta', a cross-entropy daquele passo é baixa. Se apostou forte em outra palavra, a penalização cresce.",
        },
        {
          type: "insight",
          title: "Treinar bem é distribuir bem",
          body:
            "A saída final pode parecer uma palavra ou um rótulo, mas o que está sendo otimizado é a qualidade probabilística da distribuição inteira.",
        },
      ],
    },
    {
      id: "estatistica-sem-significado",
      eyebrow: "Cuidado conceitual",
      title: "Baixa entropia não significa verdade profunda, e alta entropia não significa boa linguagem",
      lead:
        "Entropia é uma medida estatística contextual. Ela não resume sozinha qualidade, sentido ou utilidade humana.",
      visual: "semantica-vs-estatistica",
      paragraphs: [
        "Um texto repetitivo pode ter entropia baixíssima e ainda assim ser péssimo para leitura. Um texto rico e imprevisível pode ter entropia maior e ainda assim ser excelente. A teoria da informação mede previsibilidade estatística e custo de codificação, não valor literário ou relevância semântica.",
        "Esse cuidado também vale em IA. Um modelo pode produzir distribuições com certas propriedades informacionais sem que isso resolva automaticamente problemas de compreensão, alinhamento ou raciocínio. Entropia e cross-entropy são ferramentas poderosas, mas elas medem algo específico.",
        "Usar bem essas medidas exige sempre lembrar a pergunta exata que elas respondem: quanta incerteza média há aqui, e quão boa foi a distribuição prevista?",
      ],
      blocks: [
        {
          type: "mistake",
          title: "Transformar entropia em metáfora vaga para qualquer tipo de bagunça",
          body:
            "Na teoria da informação, entropia tem definição precisa ligada a distribuição e probabilidade. Usá-la sem contexto enfraquece a intuição correta.",
        },
        {
          type: "insight",
          title: "Boa medida, pergunta certa",
          body:
            "Entropia e cross-entropy brilham quando a tarefa é avaliar incerteza, previsibilidade ou ajuste probabilístico.",
        },
      ],
    },
    {
      id: "quiz-revisao",
      eyebrow: "Revisão",
      title: "Quiz de revisão",
      lead:
        "Teste se os conceitos se conectaram: surpresa, bits, entropia, compressão e cross-entropy.",
      interactive: "quiz",
      paragraphs: [
        "O objetivo é reconstruir a ponte conceitual inteira, não apenas lembrar definições isoladas.",
      ],
    },
    {
      id: "glossario-proximos-estudos",
      eyebrow: "Fechamento",
      title: "Glossário e próximos estudos",
      lead:
        "Feche a aula consolidando o vocabulário que reaparece em NLP, compressão, inferência e treinamento de classificadores.",
      interactive: "glossary",
      paragraphs: [
        "Com essa base, termos como perplexidade, divergência KL e modelagem probabilística ficam muito mais naturais.",
      ],
    },
  ],
  summaryCards: [
    {
      title: "Informação começa como surpresa",
      body:
        "Eventos improváveis reduzem mais incerteza quando acontecem.",
    },
    {
      title: "Bit é decisão binária",
      body:
        "Pensar em perguntas sim/não torna a unidade de informação mais concreta.",
    },
    {
      title: "Entropia é surpresa média",
      body:
        "Ela resume a incerteza média de toda a distribuição, não de um caso isolado.",
    },
    {
      title: "Previsibilidade afeta compressão",
      body:
        "Fontes mais previsíveis tendem a exigir menos bits médios para codificação eficiente.",
    },
    {
      title: "Cross-entropy avalia distribuição prevista",
      body:
        "Ela pune especialmente quando o modelo fica confiante no resultado errado.",
    },
    {
      title: "Loss de IA moderna tem raízes shannonianas",
      body:
        "Modelos de linguagem e classificadores treinam para melhorar distribuições probabilísticas, não só rótulos finais.",
    },
  ],
  quiz: [
    {
      id: "q1",
      prompt: "Um evento muito improvável carrega mais informação porque:",
      options: [
        { id: "a", label: "Ele reduz mais incerteza quando ocorre." },
        { id: "b", label: "Ele é sempre mais importante para humanos." },
        { id: "c", label: "Ele tem necessariamente mais palavras para ser descrito." },
      ],
      correctOptionId: "a",
      feedback:
        "Na teoria da informação, a medida está ligada à redução de incerteza, não ao valor subjetivo do conteúdo.",
    },
    {
      id: "q2",
      prompt: "Pensar em bits como perguntas binárias ajuda porque bits representam:",
      options: [
        { id: "a", label: "Escolhas sim/não que distinguem alternativas." },
        { id: "b", label: "Qualquer palavra escrita em um texto." },
        { id: "c", label: "Apenas armazenamento físico em disco." },
      ],
      correctOptionId: "a",
      feedback:
        "Essa leitura operacional aproxima bit de decisão entre alternativas equiprováveis.",
    },
    {
      id: "q3",
      prompt: "Quando a entropia de uma distribuição tende a ser maior?",
      options: [
        { id: "a", label: "Quando a massa de probabilidade está mais espalhada e balanceada entre resultados." },
        { id: "b", label: "Quando um único resultado domina quase toda a probabilidade." },
        { id: "c", label: "Sempre que o número de resultados possíveis passa de dois, independentemente das probabilidades." },
      ],
      correctOptionId: "a",
      feedback:
        "Mais equilíbrio entre alternativas costuma significar mais incerteza média e, portanto, maior entropia.",
    },
    {
      id: "q4",
      prompt: "Qual frase descreve melhor a relação entre entropia e compressão?",
      options: [
        { id: "a", label: "Entropia informa o limite médio de descrição eficiente de uma fonte." },
        { id: "b", label: "Entropia elimina completamente a necessidade de projetar códigos." },
        { id: "c", label: "Compressão só depende do tamanho do alfabeto, não das probabilidades." },
      ],
      correctOptionId: "a",
      feedback:
        "A estrutura probabilística da fonte é o que torna alguns códigos médios mais eficientes que outros.",
    },
    {
      id: "q5",
      prompt: "Cross-entropy é especialmente útil em IA porque:",
      options: [
        { id: "a", label: "Avalia quão boa é a distribuição de probabilidades prevista pelo modelo." },
        { id: "b", label: "Substitui qualquer necessidade de probabilidades." },
        { id: "c", label: "Só se importa com o rótulo final e ignora confiança." },
      ],
      correctOptionId: "a",
      feedback:
        "Ela pune previsões que colocam pouca probabilidade no que realmente ocorre, especialmente quando o modelo erra com confiança.",
    },
    {
      id: "q6",
      prompt: "Dois modelos acertam a mesma classe. Qual pode ter cross-entropy menor?",
      options: [
        { id: "a", label: "O que atribuiu probabilidade maior à classe correta." },
        { id: "b", label: "Os dois sempre empatam, porque o rótulo final foi igual." },
        { id: "c", label: "O que atribuiu probabilidade menor à classe correta para ser mais conservador." },
      ],
      correctOptionId: "a",
      feedback:
        "A loss também avalia a confiança probabilística, não apenas o acerto seco do rótulo.",
    },
    {
      id: "q7",
      prompt: "Textos mais previsíveis tendem a ter:",
      options: [
        { id: "a", label: "Menor entropia média por símbolo." },
        { id: "b", label: "Maior entropia automaticamente." },
        { id: "c", label: "Entropia indefinida, porque linguagem não admite estatística." },
      ],
      correctOptionId: "a",
      feedback:
        "Maior previsibilidade reduz a surpresa média e tende a diminuir o custo médio de descrição.",
    },
    {
      id: "q8",
      prompt: "Qual é um cuidado importante ao usar entropia?",
      options: [
        { id: "a", label: "Lembrar que ela mede incerteza estatística em um contexto, não qualidade semântica universal." },
        { id: "b", label: "Assumir que entropia alta sempre significa texto melhor." },
        { id: "c", label: "Usá-la apenas quando todas as probabilidades são iguais." },
      ],
      correctOptionId: "a",
      feedback:
        "Entropia responde a uma pergunta específica sobre distribuição e previsibilidade. Ela não substitui todas as outras medidas de valor ou sentido.",
    },
  ],
  glossary: [
    {
      term: "Surpresa informacional",
      definition:
        "Quantidade de informação associada à ocorrência de um evento, maior para eventos menos prováveis.",
    },
    {
      term: "Bit",
      definition:
        "Unidade de informação correspondente a uma escolha binária entre duas alternativas equiprováveis.",
    },
    {
      term: "Fonte",
      definition:
        "Processo ou sistema que gera símbolos, mensagens ou eventos segundo certa distribuição.",
    },
    {
      term: "Entropia de Shannon",
      definition:
        "Média da surpresa dos resultados possíveis de uma variável aleatória, ponderada por suas probabilidades.",
    },
    {
      term: "Distribuição",
      definition:
        "Forma como a probabilidade é repartida entre resultados possíveis.",
    },
    {
      term: "Compressão sem perdas",
      definition:
        "Codificação que reduz o tamanho da mensagem sem impedir reconstrução exata.",
    },
    {
      term: "Previsibilidade",
      definition:
        "Grau em que o próximo resultado pode ser antecipado com baixa incerteza.",
    },
    {
      term: "Cross-entropy",
      definition:
        "Custo médio de representar a distribuição verdadeira usando probabilidades previstas por outro modelo.",
    },
    {
      term: "Log loss",
      definition:
        "Forma prática de cross-entropy usada como função de perda em classificação probabilística.",
    },
    {
      term: "Perplexidade",
      definition:
        "Medida derivada da entropia ou da cross-entropy que resume o grau médio de incerteza de um modelo de linguagem.",
    },
    {
      term: "Divergência",
      definition:
        "Medida de discrepância entre distribuições probabilísticas, central em várias extensões da teoria da informação.",
    },
  ],
};

