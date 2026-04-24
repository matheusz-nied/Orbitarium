import type { Category, LessonContent } from "../types/content";

export const categories: Category[] = [
  {
    id: "matematica",
    name: "Matemática",
    description: "Conceitos matemáticos explicados de forma visual e progressiva.",
    accent: "#2563eb",
    softAccent: "#dbeafe",
  },
  {
    id: "fisica",
    name: "Física",
    description: "Leis, modelos e fenômenos físicos com diagramas e exemplos.",
    accent: "#0f766e",
    softAccent: "#ccfbf1",
  },
  {
    id: "computacao",
    name: "Computação",
    description: "Programação, sistemas, algoritmos e arquitetura.",
    accent: "#7c3aed",
    softAccent: "#ede9fe",
  },
  {
    id: "historia-da-ciencia",
    name: "História da Ciência",
    description: "Como grandes ideias científicas surgiram e evoluíram.",
    accent: "#c2410c",
    softAccent: "#ffedd5",
  },
  {
    id: "filosofia",
    name: "Filosofia",
    description: "Perguntas fundamentais, argumentos e mapas conceituais.",
    accent: "#a21caf",
    softAccent: "#fae8ff",
  },
  {
    id: "engenharia",
    name: "Engenharia",
    description: "Modelos, sistemas e decisões técnicas com foco aplicado.",
    accent: "#475569",
    softAccent: "#e2e8f0",
  },
];

export const contents: LessonContent[] = [
  {
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
    ],
  },
];

export function getCategoryById(categoryId: string) {
  return categories.find((category) => category.id === categoryId);
}

export function getContentById(contentId: string) {
  return contents.find((content) => content.id === contentId);
}

export function getContentsByCategory(categoryId: string) {
  return contents.filter(
    (content) =>
      content.primaryCategoryId === categoryId || content.secondaryCategoryId === categoryId,
  );
}
