import type { LessonContent } from "../../../../types/content";

export const newtonCalculoContent: LessonContent = {
  id: "newton-calculo",
  title: "Como Newton chegou ao cálculo diferencial e integral",
  subtitle:
    "Como a tentativa de entender movimento, gravidade e mudança contínua levou ao nascimento de uma das ferramentas mais importantes da matemática.",
  description:
    "Uma jornada visual pela origem do cálculo: movimento, velocidade instantânea, áreas sob curvas, derivadas, integrais e o Teorema Fundamental do Cálculo.",
  primaryCategoryId: "matematica",
  secondaryCategoryId: "historia-da-ciencia",
  level: "Intermediário",
  estimatedTime: "35-50 min",
  tags: ["Newton", "Cálculo", "Derivada", "Integral", "História da Ciência", "Física"],
  sections: [
    {
      id: "newton-nao-comecou-com-formulas",
      eyebrow: "Introdução",
      title: "Newton não começou com fórmulas",
      lead:
        "O cálculo não nasceu como uma lista de regras. Ele nasceu quando problemas concretos de movimento exigiram uma linguagem nova.",
      visual: "newton-motion",
      paragraphs: [
        "Quando hoje estudamos cálculo, normalmente encontramos símbolos, limites, derivadas e integrais logo no começo. Isso dá a impressão de que a história começou com fórmulas abstratas. Com Newton, a ordem foi quase inversa: os problemas vieram antes da notação.",
        "Ele queria entender como corpos se movem, como a gravidade age, como uma velocidade muda de instante para instante e como uma trajetória pode ser descrita continuamente. Essas perguntas não cabiam bem apenas na geometria estática herdada dos gregos.",
        "Antes de pensar em derivadas como f'(x), é mais útil enxergar o incômodo original: se tudo está mudando, como a matemática pode falar com precisão sobre um instante, uma curva, uma queda ou uma órbita?",
      ],
      blocks: [
        {
          type: "insight",
          title: "Ideia central",
          body:
            "O cálculo nasceu quando a matemática precisou parar de olhar apenas para formas prontas e começou a olhar para processos.",
        },
        {
          type: "example",
          title: "O tipo de pergunta que importava",
          body:
            "Não era apenas calcular uma área conhecida. Era entender quanto um corpo percorreu quando sua velocidade varia o tempo todo.",
          items: [
            "Qual é a velocidade exatamente agora?",
            "Como uma força altera uma trajetória?",
            "Como somar pequenas mudanças que acontecem continuamente?",
          ],
        },
      ],
    },
    {
      id: "matematica-antiga-estatica",
      eyebrow: "O problema histórico",
      title: "A matemática antiga era poderosa, mas estática",
      lead:
        "A geometria clássica resolvia muitos problemas de forma brilhante, mas encontrava limites quando o objeto de estudo era um processo em transformação.",
      visual: "static-dynamic",
      paragraphs: [
        "Triângulos, círculos, proporções e áreas simples podiam ser tratados com ferramentas geométricas muito refinadas. A matemática antiga era poderosa justamente porque transformava problemas em figuras bem definidas.",
        "Mas a física do século XVII pressionava a matemática em outra direção. Um corpo caindo não é só uma figura; é uma posição que muda com o tempo. Um planeta em órbita não é só um círculo ou uma elipse; é uma trajetória percorrida com velocidades variáveis.",
        "O tempo passou a ocupar o centro do problema. Para estudar movimento, não bastava perguntar onde algo está. Era preciso perguntar como essa posição muda, com que rapidez muda e como essa rapidez também pode mudar.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Grandeza variável",
          body:
            "Uma quantidade que pode mudar ao longo do tempo ou em relação a outra quantidade.",
          items: [
            "posição de um objeto",
            "velocidade de um carro",
            "distância percorrida",
            "área acumulada abaixo de uma curva",
          ],
        },
        {
          type: "example",
          title: "Formas prontas vs. processos",
          body:
            "Um círculo parado pode ser medido como forma. Uma órbita precisa ser entendida como movimento contínuo.",
        },
      ],
    },
    {
      id: "velocidade-instantanea",
      eyebrow: "Derivada",
      title: "Como medir uma coisa que muda exatamente agora?",
      lead:
        "A pergunta pela velocidade instantânea leva diretamente ao coração da derivada: medir mudança em um intervalo que encolhe até revelar o instante.",
      visual: "secant-tangent",
      interactive: "secant-tangent",
      paragraphs: [
        "Se um objeto percorre 100 metros em 10 segundos, sua velocidade média é 10 m/s. Essa conta é útil, mas esconde tudo que aconteceu no meio. O objeto pode ter acelerado, freado, parado por um instante e acelerado novamente.",
        "A velocidade instantânea tenta responder outra pergunta: qual era a velocidade em um momento exato? Para chegar perto disso, calculamos velocidades médias em intervalos cada vez menores. Quanto menor o intervalo, menos misturamos momentos diferentes.",
        "A ideia de limite entra justamente aí. A taxa média em um intervalo pequeno se aproxima de uma taxa local. Quando esse intervalo tende a zero, a taxa média deixa de ser uma média grosseira e passa a representar a mudança instantânea.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Derivada",
          body:
            "Taxa de variação instantânea de uma quantidade. Geometricamente, é a inclinação da tangente em um ponto da curva.",
        },
        {
          type: "formula",
          title: "Forma moderna da ideia",
          body:
            "A fração mede uma taxa média; o limite transforma essa taxa média em uma taxa instantânea.",
          formula: "f'(x) = lim h -> 0 [f(x+h) - f(x)] / h",
        },
        {
          type: "mistake",
          title: "Erro comum",
          body:
            "Derivada não é apenas uma técnica algébrica. A técnica serve para calcular, mas o conceito é medir mudança instantânea.",
        },
      ],
    },
    {
      id: "secante-a-tangente",
      eyebrow: "Construção geométrica",
      title: "Da secante à tangente",
      lead:
        "A derivada pode ser vista como a inclinação local de uma curva. O caminho até ela passa pela reta secante.",
      visual: "secant-tangent",
      paragraphs: [
        "Uma curva representa uma quantidade variando. Dois pontos nessa curva permitem medir uma inclinação média: quanto a altura mudou em relação ao avanço horizontal. Essa inclinação média é desenhada como uma reta secante.",
        "Quando aproximamos os dois pontos, reduzimos o intervalo usado para medir a mudança. No limite, a secante deixa de representar um trecho inteiro e passa a representar a direção da curva em um único ponto.",
        "É como tentar descobrir a direção exata de uma estrada curva em um ponto específico. Se você olha para um trecho longo, vê uma direção média. Se olha para um trecho cada vez menor, entende melhor a direção naquele ponto.",
      ],
      blocks: [
        {
          type: "example",
          title: "Interpretações da derivada",
          body: "A mesma ideia aparece com nomes diferentes conforme o contexto.",
          items: [
            "inclinação local",
            "taxa de variação",
            "velocidade instantânea",
            "sensibilidade",
            "tendência local",
          ],
        },
        {
          type: "mistake",
          title: "Não reduza derivada a uma regra",
          body:
            "Derivada não é apenas aplicar uma técnica algébrica. A técnica serve para calcular, mas o conceito é medir mudança instantânea.",
        },
      ],
    },
    {
      id: "area-sob-curvas",
      eyebrow: "Integral",
      title: "Como somar algo que está espalhado continuamente?",
      lead:
        "Outro problema central era calcular áreas sob curvas e, de forma mais geral, somar contribuições distribuídas continuamente.",
      visual: "area-under-curve",
      interactive: "integral-rectangles",
      paragraphs: [
        "Um retângulo tem área simples. Um triângulo também. Um círculo tem fórmula. Mas uma região irregular abaixo de uma curva não se deixa medir tão facilmente.",
        "A ideia é dividir a região em retângulos pequenos. Com poucos retângulos, a aproximação é grosseira. Com muitos, a soma começa a acompanhar melhor a curva. No limite, retângulos infinitamente finos apontam para uma área ideal.",
        "Esse raciocínio é mais profundo do que uma técnica de desenho. Ele mostra como uma quantidade contínua pode ser tratada como soma de pequenas partes.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Integral",
          body:
            "Operação que representa acumulação contínua ou soma de infinitas contribuições pequenas.",
        },
        {
          type: "insight",
          title: "Área como porta de entrada",
          body:
            "A área sob a curva é uma imagem poderosa, mas a ideia maior é acumular uma quantidade que varia.",
        },
      ],
    },
    {
      id: "integral-como-acumulacao",
      eyebrow: "Acumulação",
      title: "Integral não é só área",
      lead:
        "A interpretação geométrica é útil, mas a integral é uma linguagem geral para acumular mudanças.",
      visual: "area-under-curve",
      paragraphs: [
        "Se você conhece a velocidade de um objeto ao longo do tempo, a integral pode recuperar a distância percorrida. Se conhece uma taxa de entrada de água, a integral pode recuperar o volume acumulado.",
        "A mesma ideia aparece em força aplicada ao longo de um deslocamento, crescimento populacional, energia consumida e muitas outras situações. A integral pergunta: quanto foi acumulado quando pequenas contribuições foram se somando?",
        "Se a derivada pergunta 'como isso está mudando?', a integral pergunta 'quanto isso acumulou?'. Essas perguntas são opostas e complementares.",
      ],
      blocks: [
        {
          type: "formula",
          title: "Símbolo da integral",
          body:
            "O símbolo integral vem de uma ideia de soma. f(x) representa o que está sendo acumulado; dx representa pedaços muito pequenos da variável.",
          formula: "∫ f(x) dx",
        },
        {
          type: "example",
          title: "Acumulações comuns",
          body: "Integral aparece sempre que uma taxa variável precisa virar um total.",
          items: [
            "velocidade acumulada ao longo do tempo gera distância",
            "taxa de entrada de água acumulada gera volume",
            "força aplicada ao longo de um deslocamento gera trabalho",
            "crescimento acumulado gera quantidade total",
          ],
        },
        {
          type: "mistake",
          title: "Integral não é apenas fórmula de área",
          body:
            "Área é uma porta de entrada. O conceito mais geral é acumulação contínua.",
        },
      ],
    },
    {
      id: "derivada-integral-inversas",
      eyebrow: "Teorema Fundamental",
      title: "O golpe de gênio",
      lead:
        "A descoberta profunda não foi apenas saber derivar ou integrar, mas perceber que essas operações estão conectadas.",
      visual: "derivative-integral-flow",
      interactive: "derivative-integral-toggle",
      paragraphs: [
        "Derivar mostra como uma quantidade muda. Integrar reconstrói quanto foi acumulado a partir dessas mudanças. Uma operação desmonta o acumulado em taxa; a outra reconstrói o acumulado a partir da taxa.",
        "No movimento, isso fica claro: se você tem posição, derivando encontra velocidade. Se deriva a velocidade, encontra aceleração. No caminho inverso, se integra aceleração, recupera velocidade; se integra velocidade, recupera posição.",
        "O Teorema Fundamental do Cálculo formaliza essa conexão. Ele mostra que, sob certas condições, derivação e integração são operações inversas.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Teorema Fundamental do Cálculo",
          body:
            "Resultado que conecta derivadas e integrais como operações inversas sob condições adequadas.",
        },
        {
          type: "insight",
          title: "Frase central",
          body:
            "Derivar desmonta a acumulação em taxa de mudança. Integrar reconstrói a acumulação a partir da taxa.",
        },
      ],
    },
    {
      id: "fluentes-e-fluxoes",
      eyebrow: "Newton",
      title: "A linguagem original de Newton",
      lead:
        "Newton não falava exatamente em derivadas e integrais como fazemos hoje. Sua linguagem era a dos fluentes e das fluxões.",
      visual: "fluxions-flow",
      paragraphs: [
        "Fluentes eram quantidades que fluem, isto é, que mudam com o tempo. A posição de um corpo, por exemplo, é uma fluente: ela se transforma continuamente enquanto o corpo se move.",
        "Fluxões eram as taxas de mudança dessas quantidades. A velocidade é a fluxão da posição. A aceleração é a fluxão da velocidade. Isso mostra como Newton pensava o cálculo profundamente ligado ao tempo.",
        "A linguagem moderna ficou diferente, mas a intuição física de Newton continua muito presente: observar grandezas que variam e entender suas taxas de variação.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Fluente",
          body: "Na linguagem de Newton, uma quantidade que varia ou flui ao longo do tempo.",
        },
        {
          type: "definition",
          title: "Fluxão",
          body: "Na linguagem de Newton, a taxa de mudança de uma fluente.",
        },
        {
          type: "example",
          title: "Exemplo em cadeia",
          body:
            "Posição é fluente; velocidade é sua fluxão. Velocidade também pode ser fluente; aceleração é sua fluxão.",
        },
      ],
    },
    {
      id: "newton-e-a-fisica",
      eyebrow: "Física",
      title: "O cálculo como linguagem do movimento",
      lead:
        "O cálculo se tornou essencial para a física porque conecta posição, velocidade, aceleração e força.",
      visual: "falling-orbit",
      paragraphs: [
        "No estudo do movimento, posição indica onde o objeto está. Velocidade indica como a posição muda. Aceleração indica como a velocidade muda. Força se relaciona com a aceleração.",
        "Esse encadeamento permite estudar quedas, órbitas, gravidade, movimentos planetários e sistemas dinâmicos. O mundo físico deixa de ser apenas uma coleção de formas e passa a ser descrito por relações de mudança.",
        "A força do cálculo está em permitir que uma lei local, válida em cada instante, produza uma trajetória inteira quando integrada ao longo do tempo.",
      ],
      blocks: [
        {
          type: "formula",
          title: "Fluxo conceitual",
          body:
            "A física do movimento usa uma cadeia de relações entre causa, taxa e acumulação.",
          formula: "força -> aceleração -> velocidade -> posição",
        },
        {
          type: "example",
          title: "Onde isso aparece",
          body: "A mesma estrutura aparece em fenômenos muito diferentes.",
          items: [
            "queda de corpos",
            "órbitas planetárias",
            "gravidade",
            "movimento de planetas",
            "sistemas dinâmicos",
          ],
        },
      ],
    },
    {
      id: "newton-vs-leibniz",
      eyebrow: "História da ciência",
      title: "Newton criou sozinho?",
      lead:
        "Newton e Leibniz chegaram ao cálculo de forma independente, com ênfases e linguagens diferentes.",
      visual: "newton-leibniz",
      interactive: "newton-leibniz-comparison",
      paragraphs: [
        "Newton tinha uma motivação muito ligada à física: movimento, tempo, fluxões e problemas mecânicos. Sua linguagem refletia a ideia de quantidades fluindo.",
        "Leibniz desenvolveu uma notação extremamente poderosa: dx, dy e ∫. Essa linguagem simbólica era mais flexível para cálculo algébrico e acabou se aproximando muito da notação usada atualmente.",
        "A física do cálculo tem muito de Newton. A notação moderna tem muito de Leibniz. A história real é menos sobre um único inventor e mais sobre uma convergência de problemas que exigiam uma nova matemática.",
      ],
      blocks: [
        {
          type: "insight",
          title: "Conclusão histórica",
          body:
            "Newton e Leibniz ajudam a ver duas faces do cálculo: uma linguagem para o movimento e uma linguagem simbólica para operar com mudanças.",
        },
      ],
    },
    {
      id: "linha-do-tempo",
      eyebrow: "Linha do tempo",
      title: "Como as ideias se encaixam historicamente",
      lead:
        "O cálculo não apareceu do nada. Ele reorganizou problemas antigos de áreas, tangentes e movimento em uma linguagem unificada.",
      visual: "timeline",
      interactive: "timeline",
      paragraphs: [
        "A geometria clássica, os estudos antigos de áreas e tangentes, a física de Galileu e as órbitas de Kepler criaram uma pressão intelectual. Era preciso uma matemática capaz de acompanhar mudança contínua.",
        "Newton, especialmente nos anos de 1665 e 1666, encontrou uma forma de pensar quantidades variáveis e suas taxas. Depois, o Principia mostrou a força dessas ideias na física.",
        "Leibniz, por outro caminho, ajudou a consolidar uma notação que tornou o cálculo mais transmissível, manipulável e ensinável.",
      ],
    },
    {
      id: "resumo-final",
      eyebrow: "Resumo",
      title: "O que você precisa levar daqui",
      lead:
        "A história do cálculo fica mais clara quando derivada e integral são vistas como respostas a problemas concretos.",
      visual: "summary",
      interactive: "summary-cards",
      paragraphs: [
        "Newton chegou ao cálculo porque precisava descrever movimento e mudança contínua. A derivada nasceu da tentativa de medir mudança instantânea. A integral nasceu da tentativa de somar partes continuamente.",
        "O ponto central foi perceber que derivada e integral se conectam. Esse conjunto de ideias criou uma nova linguagem para a ciência moderna, capaz de transformar leis locais em descrições globais de movimento.",
      ],
      blocks: [
        {
          type: "insight",
          title: "Síntese",
          body:
            "Cálculo é a matemática da variação: ele descreve como algo muda e quanto essa mudança acumula.",
        },
      ],
    },
    {
      id: "perguntas-de-revisao",
      eyebrow: "Revisão",
      title: "Perguntas de revisão",
      lead:
        "Use o quiz para verificar se os conceitos principais ficaram conectados: movimento, derivada, integral e história.",
      interactive: "quiz",
      paragraphs: [
        "As perguntas abaixo misturam múltipla escolha e verdadeiro/falso. O objetivo não é decorar nomes, mas testar se a lógica da aula ficou clara.",
      ],
    },
    {
      id: "glossario",
      eyebrow: "Glossário",
      title: "Glossário essencial",
      lead:
        "Revise os termos centrais da aula. Abra cada card para consolidar a definição.",
      interactive: "glossary",
      paragraphs: [
        "O vocabulário do cálculo costuma parecer intimidador no início. Mas cada termo nomeia uma ideia simples quando visto no contexto correto.",
      ],
    },
  ],
  timeline: [
    {
      id: "geometria-classica",
      period: "Antiguidade",
      title: "Geometria clássica",
      description:
        "A matemática desenvolve ferramentas poderosas para formas, proporções, áreas simples e argumentos geométricos rigorosos.",
    },
    {
      id: "areas-tangentes",
      period: "Antes do século XVII",
      title: "Áreas e tangentes",
      description:
        "Problemas de área, tangência e aproximação já eram investigados, mas ainda sem uma linguagem unificada para mudança contínua.",
    },
    {
      id: "galileu",
      period: "Século XVII",
      title: "Galileu e o movimento",
      description:
        "O estudo sistemático do movimento torna o tempo uma variável central e pressiona a matemática tradicional.",
    },
    {
      id: "kepler",
      period: "1609-1619",
      title: "Kepler e as órbitas",
      description:
        "As órbitas planetárias mostram que a natureza exige uma matemática capaz de tratar trajetórias curvas e velocidades variáveis.",
    },
    {
      id: "newton-anos-miraculosos",
      period: "1665-1666",
      title: "Newton e os anos decisivos",
      description:
        "Newton desenvolve ideias centrais sobre fluentes, fluxões, movimento e gravidade durante um período de isolamento e estudo intenso.",
    },
    {
      id: "principia",
      period: "1687",
      title: "Publicação do Principia",
      description:
        "Newton apresenta uma síntese poderosa entre matemática e física, consolidando uma nova forma de descrever o movimento.",
    },
    {
      id: "leibniz",
      period: "Final do século XVII",
      title: "Leibniz e a notação moderna",
      description:
        "Leibniz desenvolve símbolos como dx, dy e ∫, que tornam o cálculo mais manipulável e influenciam a notação usada até hoje.",
    },
    {
      id: "calculo-moderno",
      period: "Séculos XVIII-XIX",
      title: "Consolidação do cálculo moderno",
      description:
        "As ideias são refinadas, formalizadas e incorporadas ao centro da matemática, da física e da engenharia.",
    },
  ],
  comparisonRows: [
    {
      topic: "Motivação",
      newton: "Movimento, gravidade, física e quantidades que variam no tempo.",
      leibniz: "Sistema simbólico geral para operar com diferenças e somas.",
    },
    {
      topic: "Linguagem",
      newton: "Fluentes e fluxões.",
      leibniz: "dx, dy, ∫ e notação diferencial.",
    },
    {
      topic: "Força histórica",
      newton: "Conectou cálculo à mecânica e à gravitação.",
      leibniz: "Criou uma notação muito eficiente para ensino e cálculo algébrico.",
    },
    {
      topic: "Legado",
      newton: "A intuição física do cálculo.",
      leibniz: "A notação mais próxima da usada atualmente.",
    },
  ],
  summaryCards: [
    {
      title: "Derivada = mudança instantânea",
      body:
        "Ela mede como uma quantidade muda localmente, como a velocidade em um instante.",
    },
    {
      title: "Integral = acumulação contínua",
      body:
        "Ela soma contribuições pequenas para recuperar um total, como distância a partir da velocidade.",
    },
    {
      title: "Teorema Fundamental = conexão",
      body:
        "Ele mostra que derivar e integrar são operações inversas sob condições adequadas.",
    },
    {
      title: "Cálculo = matemática da variação",
      body:
        "É a linguagem que permite estudar processos, movimentos e mudanças contínuas.",
    },
  ],
  quiz: [
    {
      id: "q1",
      prompt: "Qual problema levou Newton diretamente à ideia de derivada?",
      options: [
        { id: "a", label: "Medir mudança instantânea, como velocidade em um instante." },
        { id: "b", label: "Classificar triângulos por ângulos." },
        { id: "c", label: "Encontrar números primos grandes." },
      ],
      correctOptionId: "a",
      feedback:
        "A derivada nasce da tentativa de medir taxas instantâneas de mudança.",
    },
    {
      id: "q2",
      prompt: "Velocidade média e velocidade instantânea são a mesma coisa?",
      options: [
        { id: "a", label: "Sim, ambas sempre dão exatamente o mesmo valor." },
        {
          id: "b",
          label: "Não. A média vale para um intervalo; a instantânea vale para um momento.",
        },
      ],
      correctOptionId: "b",
      feedback:
        "A velocidade média mistura um intervalo; a instantânea tenta capturar a taxa local.",
    },
    {
      id: "q3",
      prompt: "O que representa uma reta secante em uma curva?",
      options: [
        { id: "a", label: "Uma variação média entre dois pontos." },
        { id: "b", label: "A área exata abaixo da curva." },
        { id: "c", label: "Uma quantidade constante sem mudança." },
      ],
      correctOptionId: "a",
      feedback:
        "A secante conecta dois pontos e mede a inclinação média entre eles.",
    },
    {
      id: "q4",
      prompt: "O que acontece quando os pontos da secante se aproximam?",
      options: [
        { id: "a", label: "A secante se aproxima da tangente." },
        { id: "b", label: "A curva desaparece." },
        { id: "c", label: "A área sob a curva vira zero automaticamente." },
      ],
      correctOptionId: "a",
      feedback:
        "No limite, a secante revela a direção local da curva: a tangente.",
    },
    {
      id: "q5",
      prompt: "Por que a integral pode ser vista como soma contínua?",
      options: [
        { id: "a", label: "Porque acumula contribuições pequenas ao longo de uma variável." },
        { id: "b", label: "Porque sempre calcula apenas perímetros." },
        { id: "c", label: "Porque ignora mudanças pequenas." },
      ],
      correctOptionId: "a",
      feedback:
        "A integral soma pequenas partes para formar um acumulado.",
    },
    {
      id: "q6",
      prompt: "Integral é apenas área sob a curva?",
      options: [
        { id: "a", label: "Sim, nunca significa outra coisa." },
        { id: "b", label: "Não. Área é uma interpretação; a ideia geral é acumulação." },
      ],
      correctOptionId: "b",
      feedback:
        "Área é uma visualização importante, mas integral é mais geral: acumulação contínua.",
    },
    {
      id: "q7",
      prompt: "Como derivada e integral se relacionam?",
      options: [
        { id: "a", label: "São operações desconectadas." },
        { id: "b", label: "São operações inversas sob certas condições." },
        { id: "c", label: "Ambas servem apenas para desenhar gráficos." },
      ],
      correctOptionId: "b",
      feedback:
        "Essa é a ideia central do Teorema Fundamental do Cálculo.",
    },
    {
      id: "q8",
      prompt: "O que são fluentes na linguagem de Newton?",
      options: [
        { id: "a", label: "Quantidades que variam com o tempo." },
        { id: "b", label: "Símbolos modernos dx e dy." },
        { id: "c", label: "Apenas números inteiros." },
      ],
      correctOptionId: "a",
      feedback:
        "Fluentes são grandezas que fluem, isto é, mudam ao longo do tempo.",
    },
    {
      id: "q9",
      prompt: "O que são fluxões?",
      options: [
        { id: "a", label: "Taxas de mudança das fluentes." },
        { id: "b", label: "Áreas de triângulos." },
        { id: "c", label: "Órbitas perfeitamente circulares." },
      ],
      correctOptionId: "a",
      feedback: "Fluxão é a taxa de mudança de uma fluente.",
    },
    {
      id: "q10",
      prompt: "Qual diferença resume bem Newton e Leibniz?",
      options: [
        {
          id: "a",
          label:
            "Newton enfatizou movimento; Leibniz desenvolveu notação muito eficiente.",
        },
        { id: "b", label: "Newton estudou apenas filosofia; Leibniz estudou apenas astronomia." },
        { id: "c", label: "Leibniz negou o uso de símbolos matemáticos." },
      ],
      correctOptionId: "a",
      feedback:
        "A intuição física newtoniana e a notação leibniziana são dois legados centrais.",
    },
  ],
  glossary: [
    {
      term: "Derivada",
      definition: "Taxa de variação instantânea de uma quantidade.",
    },
    {
      term: "Integral",
      definition: "Acumulação contínua de pequenas contribuições.",
    },
    {
      term: "Limite",
      definition:
        "Ideia de observar o comportamento de uma expressão quando uma variável se aproxima de determinado valor.",
    },
    {
      term: "Secante",
      definition: "Reta que corta uma curva em dois pontos.",
    },
    {
      term: "Tangente",
      definition:
        "Reta que toca uma curva em um ponto e representa sua direção local.",
    },
    {
      term: "Taxa de variação",
      definition: "Medida de quanto uma quantidade muda em relação a outra.",
    },
    {
      term: "Acumulação",
      definition:
        "Processo de somar contribuições ao longo de uma variável, como tempo ou espaço.",
    },
    {
      term: "Fluente",
      definition: "Na linguagem de Newton, uma quantidade que varia com o tempo.",
    },
    {
      term: "Fluxão",
      definition: "Na linguagem de Newton, a taxa de mudança de uma fluente.",
    },
    {
      term: "Teorema Fundamental do Cálculo",
      definition:
        "Resultado que conecta derivadas e integrais como operações inversas.",
    },
  ],
};
