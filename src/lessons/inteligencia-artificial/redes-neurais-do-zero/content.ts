import type { LessonContent } from "../../../types/content";

export const redesNeuraisDoZeroContent: LessonContent = {
  id: "redes-neurais-do-zero",
  title: "Redes Neurais do Zero",
  subtitle:
    "Uma construção visual da ideia mais importante do deep learning: combinar entradas, pesos e não linearidades para aprender transformações úteis a partir de dados.",
  description:
    "Uma aula sobre neurônios artificiais, pesos, bias, camadas, forward pass, função de perda e a intuição de treinamento que sustenta redes neurais modernas.",
  primaryCategoryId: "inteligencia-artificial",
  secondaryCategoryId: "computacao",
  level: "Intermediário",
  estimatedTime: "45-60 min",
  tags: [
    "Inteligência Artificial",
    "Redes Neurais",
    "Perceptron",
    "Forward Pass",
    "Treinamento",
    "Função de Perda",
    "Deep Learning",
  ],
  learningObjectives: [
    "Entender o neurônio artificial como uma combinação ponderada de entradas mais um termo de deslocamento.",
    "Interpretar pesos como seletividade e bias como ajuste do ponto de ativação.",
    "Visualizar por que empilhar camadas aumenta a capacidade de representar padrões compostos.",
    "Acompanhar um forward pass completo e entender como cada camada transforma a representação anterior.",
    "Compreender o papel da função de perda como bússola do treinamento.",
    "Construir uma intuição sólida para o ajuste iterativo de pesos em direção a previsões melhores.",
    "Diferenciar memorizar exemplos de aprender regularidades reutilizáveis.",
  ],
  prerequisites: [
    "Noção básica de álgebra escolar, especialmente soma e multiplicação.",
    "Conforto com a ideia de função matemática que recebe entradas e produz uma saída.",
    "Curiosidade sobre como modelos aprendem a partir de exemplos.",
  ],
  references: [
    {
      title: "Deep Learning — Chapter 6: Deep Feedforward Networks",
      source: "Goodfellow, Bengio e Courville — MIT Press",
      url: "https://www.deeplearningbook.org/contents/mlp.html",
      note:
        "Capítulo de referência para perceptrons multicamadas, composição de camadas e fundamentos de redes feedforward.",
    },
    {
      title: "Neural Networks and Deep Learning — Chapter 1",
      source: "Michael Nielsen",
      url: "http://neuralnetworksanddeeplearning.com/chap1.html",
      note:
        "Introdução intuitiva a neurônios, camadas e ao comportamento de redes simples.",
    },
    {
      title: "Neural Networks and Deep Learning — Chapter 2",
      source: "Michael Nielsen",
      url: "http://neuralnetworksanddeeplearning.com/chap2.html",
      note:
        "Base conceitual para entender como o erro informa ajustes de parâmetros durante o treinamento.",
    },
    {
      title: "CS231n — Neural Networks Part 1",
      source: "Stanford University",
      url: "https://cs231n.github.io/neural-networks-1/",
      note:
        "Notas de curso com explicações claras sobre neurônio artificial, ativações e arquitetura de redes.",
    },
    {
      title: "Learning representations by back-propagating errors",
      source: "Rumelhart, Hinton e Williams, Nature (1986)",
      url: "https://doi.org/10.1038/323533a0",
      note:
        "Paper clássico que consolidou o treinamento eficiente de redes neurais multicamadas.",
    },
  ],
  heroVisual: "redes-neurais-hero",
  openingText:
    "Uma rede neural parece misteriosa até você desmontá-la. Quando isso acontece, a névoa some: cada neurônio faz uma conta simples, cada camada reorganiza sinais e o treinamento nada mais é do que um processo repetido de tentativa, erro e correção. A força do deep learning não nasce de uma equação mágica isolada, mas da composição de milhares dessas decisões locais. Entender essa mecânica muda completamente a forma como você lê papers, usa bibliotecas e diagnostica modelos.",
  quickFacts: [
    {
      title: "Peso é preferência",
      body:
        "Um peso grande amplifica uma entrada relevante; um peso pequeno ou negativo enfraquece ou inverte sua influência.",
    },
    {
      title: "Bias desloca a decisão",
      body:
        "Sem bias, o neurônio fica preso a um comportamento rígido. Com bias, ele aprende limiares mais úteis.",
    },
    {
      title: "Camadas compõem padrões",
      body:
        "Uma camada pode detectar traços simples; a próxima combina esses traços em estruturas mais abstratas.",
    },
  ],
  sections: [
    {
      id: "por-que-redes-neurais",
      eyebrow: "Ponto de partida",
      title: "Por que redes neurais não são só uma moda computacional",
      lead:
        "Redes neurais são uma forma prática de construir funções flexíveis que ajustam seu comportamento a partir de exemplos, sem precisarmos programar todas as regras manualmente.",
      visual: "motivacao-aprendizado",
      paragraphs: [
        "Imagine tentar programar explicitamente todas as variações possíveis de escrita de um número, de um rosto ou do tom emocional de uma frase. O problema não é apenas grande: ele muda de forma o tempo todo. Redes neurais são valiosas porque aprendem regularidades a partir dos dados em vez de depender de listas intermináveis de regras artesanais.",
        "Essa aprendizagem, porém, não acontece por magia. A rede começa como uma função qualquer, com pesos inicializados sem muito significado. Ao comparar a previsão produzida com a resposta desejada, ela recebe um sinal de erro e ajusta seus parâmetros pouco a pouco. O poder surge da repetição disciplinada desse ciclo em muitos exemplos.",
        "Por isso, a pergunta central desta aula não é 'o que uma rede neural faz em aplicações famosas?', mas 'que contas mínimas precisam existir para que ela possa aprender?'. Quando você domina essa base, frameworks deixam de parecer caixas-pretas.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Rede neural feedforward",
          body:
            "Família de modelos em que a informação flui da entrada para a saída por camadas sucessivas, sem ciclos, compondo transformações matemáticas aprendidas.",
        },
        {
          type: "insight",
          title: "O segredo está na composição",
          body:
            "Uma única operação linear é limitada. Várias operações simples, encadeadas e ajustáveis, conseguem representar estruturas muito mais ricas.",
        },
      ],
    },
    {
      id: "neuronio-artificial",
      eyebrow: "Construção",
      title: "O neurônio artificial: soma ponderada, bias e ativação",
      lead:
        "No nível mais básico, um neurônio recebe números, multiplica cada um por um peso, soma tudo, acrescenta um bias e passa o resultado por uma função de ativação.",
      visual: "neuronio-anatomia",
      interactive: "neuronio-ajustavel",
      paragraphs: [
        "Se uma entrada representa 'presença de borda' e outra representa 'contraste local', o neurônio pode decidir que a primeira importa mais do que a segunda. Essa preferência aparece nos pesos. Pesos positivos reforçam uma entrada; pesos negativos a empurram na direção oposta; pesos próximos de zero praticamente a ignoram.",
        "O bias funciona como um deslocamento. Ele permite que o neurônio ative mesmo quando as entradas são pequenas, ou que permaneça desligado até que a soma ponderada alcance um limiar mais alto. Sem bias, a flexibilidade do neurônio cai bastante, porque a fronteira de decisão fica artificialmente restrita.",
        "A ativação fecha o circuito. Depois da soma ponderada, aplicamos uma função que decide como transformar esse valor em um novo sinal. Esse detalhe parece técnico, mas muda completamente a expressividade da rede, assunto que ganha destaque na próxima aula.",
      ],
      blocks: [
        {
          type: "formula",
          title: "Conta essencial do neurônio",
          body: "A forma canônica de um neurônio é uma soma ponderada seguida de uma ativação.",
          formula: "a = \phi(w_1x_1 + w_2x_2 + ... + w_nx_n + b)",
        },
        {
          type: "example",
          title: "Peso como seletividade",
          body:
            "Se a entrada x1 é muito informativa para o problema, o treinamento tende a aumentar o peso w1. Se x2 atrapalha, o peso correspondente pode se tornar pequeno ou negativo.",
        },
        {
          type: "mistake",
          title: "Confundir peso com importância fixa e universal",
          body:
            "Um peso só faz sentido dentro da rede, da escala das entradas e da interação com outras camadas. Peso grande não é sinônimo automático de 'feature mais importante'.",
        },
      ],
    },
    {
      id: "camadas",
      eyebrow: "Arquitetura",
      title: "Camadas escondidas existem para recombinar sinais",
      lead:
        "Uma camada intermediária não é um enfeite: ela cria uma nova representação dos dados, mais útil para a decisão final do que a entrada bruta.",
      visual: "camadas-composicao",
      paragraphs: [
        "A primeira camada costuma detectar padrões simples: combinações locais, tendências, alinhamentos, presenças ou ausências. A camada seguinte já não enxerga o dado cru; ela enxerga a interpretação produzida pela camada anterior. Em outras palavras, a rede vai reescrevendo o problema em uma linguagem interna mais conveniente.",
        "Essa ideia de representação progressiva é central. Em visão, uma rede pode começar captando bordas e contrastes, depois cantos, depois texturas, depois partes de objetos. Em linguagem, pode passar de padrões lexicais para relações sintáticas e semânticas. Em todos os casos, o mecanismo básico continua sendo o mesmo: compor transformações aprendidas.",
        "É por isso que dizer que uma rede tem 'duas camadas escondidas' não é apenas contar blocos. É dizer quantos estágios de recombinação ela possui antes de emitir uma previsão.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Camada escondida",
          body:
            "Conjunto intermediário de neurônios cujo objetivo é transformar a representação da entrada antes da camada de saída.",
        },
        {
          type: "insight",
          title: "Aprender é redescrever o dado",
          body:
            "O ganho de uma camada oculta não é 'decorar mais', mas construir uma base de características que torne a tarefa de saída mais simples.",
        },
        {
          type: "mistake",
          title: "Pensar em camadas como etapas independentes",
          body:
            "Cada camada só faz sentido em conjunto com as demais. O que uma aprende depende do que a anterior produz e do erro que chega da saída.",
        },
      ],
    },
    {
      id: "forward-pass",
      eyebrow: "Fluxo",
      title: "Forward pass: a rede empurra informação para frente",
      lead:
        "O forward pass é a execução da rede com pesos atuais: entrada entra, sinais são transformados camada a camada, e a saída final aparece.",
      visual: "forward-pass-diagrama",
      interactive: "animacao-forward-pass",
      paragraphs: [
        "Toda previsão nasce de um forward pass. Em uma rede simples, as entradas alimentam a primeira camada, que produz ativações intermediárias. Essas ativações viram entradas da próxima camada, e assim por diante, até obtermos um número, um vetor de logits ou uma distribuição de probabilidades.",
        "O forward pass não ajusta nada; ele apenas revela o que a rede acredita neste instante. Essa distinção é importante porque muita gente mistura inferência com aprendizado. Primeiro a rede prevê. Só depois, ao comparar a previsão com o alvo, o treinamento calcula como os pesos deveriam mudar.",
        "Quando você aprende a rastrear um forward pass manualmente, entende muito melhor por que certos erros acontecem. Saídas saturadas, ativações mortas e escalas descontroladas deixam de ser sintomas misteriosos e passam a ser consequências visíveis do fluxo numérico.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Forward pass",
          body:
            "Propagação das entradas pela rede para produzir uma saída com os parâmetros atuais, sem ainda atualizar os pesos.",
        },
        {
          type: "example",
          title: "Predição antes de aprender",
          body:
            "Se a rede recebe duas features e devolve 0,82 para a classe positiva, isso significa apenas que, com os pesos atuais, ela está inclinada a essa resposta. Não significa que ela já esteja certa.",
        },
      ],
    },
    {
      id: "funcao-de-perda",
      eyebrow: "Objetivo",
      title: "A função de perda diz o que conta como erro",
      lead:
        "Sem uma função de perda, a rede produz números, mas não sabe em que direção deve melhorar.",
      visual: "perda-como-bussola",
      paragraphs: [
        "A perda transforma o problema abstrato de 'acertar mais' em um alvo quantitativo. Se a previsão ficou distante do desejado, a perda cresce. Se ficou compatível com o alvo, a perda diminui. Essa medida condensa a qualidade da previsão em um número que o treinamento pode otimizar.",
        "Note que a perda não é uma simples pontuação decorativa. Ela define o comportamento que queremos incentivar. Em regressão, costumamos punir desvios numéricos; em classificação, punimos confiança errada e recompensamos probabilidade concentrada na classe correta. Em resumo: a perda escolhe o que a rede deve levar a sério.",
        "Esse ponto é crucial porque uma rede não 'busca a verdade' por iniciativa própria. Ela busca reduzir a função que você forneceu. Se a perda estiver mal alinhada à tarefa, o modelo pode melhorar no objetivo matemático e piorar no comportamento que você realmente desejava.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Função de perda",
          body:
            "Função que mede quão incompatível a saída da rede está com o alvo desejado, servindo como sinal quantitativo para o treinamento.",
        },
        {
          type: "insight",
          title: "A rede não aprende 'acertos', aprende redução de perda",
          body:
            "Acerto é uma linguagem humana. O treinamento trabalha reduzindo uma função matemática específica que codifica o que você quer priorizar.",
        },
        {
          type: "mistake",
          title: "Tratar perda e métrica como sinônimos",
          body:
            "Acurácia pode ser a métrica final de negócio, mas ela não fornece um gradiente útil na maioria dos cenários. A perda faz esse papel operacional.",
        },
      ],
    },
    {
      id: "intuicao-treinamento",
      eyebrow: "Aprendizado",
      title: "Treinar é repetir pequenas correções, não dar um salto genial",
      lead:
        "O treinamento de uma rede neural é um processo iterativo de ajustes minúsculos guiados pelo erro observado nos exemplos.",
      visual: "treinamento-em-loop",
      interactive: "mini-treino-rede",
      paragraphs: [
        "Quando a rede erra, ela não recebe uma regra pronta dizendo exatamente qual conceito aprender. Ela recebe um sinal numérico mostrando o quanto errou, e então usa esse sinal para alterar os pesos na direção que tende a reduzir a perda em iterações futuras. Esse mecanismo gradual é uma das ideias mais elegantes do campo.",
        "A palavra importante aqui é gradual. Pesos não são substituídos por uma resposta perfeita de uma vez. Eles são empurrados um pouco, observam o novo resultado, recebem nova correção e repetem o processo. Em problemas complexos, a aprendizagem é a acumulação de milhares ou milhões dessas microcorreções coordenadas.",
        "Essa visão evita um erro comum de expectativa: imaginar que a rede 'entende' um conceito após poucos exemplos do mesmo modo que humanos às vezes entendem. Em redes profundas, o aprendizado costuma ser estatístico, distribuído e progressivo. O sinal útil emerge da repetição em larga escala.",
      ],
      blocks: [
        {
          type: "example",
          title: "Corrigir um pouco já é avanço",
          body:
            "Se a rede previa 0,30 quando deveria prever algo próximo de 1, não precisamos saltar diretamente para 0,99. Mover a previsão para 0,38 já pode ser uma atualização útil na direção correta.",
        },
        {
          type: "insight",
          title: "Conhecimento fica distribuído nos parâmetros",
          body:
            "O que a rede aprende raramente mora em um único peso. O comportamento emerge da coordenação entre muitos parâmetros ao mesmo tempo.",
        },
        {
          type: "mistake",
          title: "Esperar explicações simbólicas para cada peso",
          body:
            "Em redes pequenas isso às vezes é possível, mas em redes reais o significado está espalhado. Tentar atribuir sem contexto um conceito humano a cada parâmetro costuma ser enganoso.",
        },
      ],
    },
    {
      id: "quiz-revisao",
      eyebrow: "Revisão",
      title: "Quiz de revisão",
      lead:
        "Conecte as peças centrais: neurônio, pesos, bias, camadas, forward pass, perda e intuição de treinamento.",
      interactive: "quiz",
      paragraphs: [
        "Use o quiz para testar se a lógica do sistema ficou clara. O objetivo não é decorar nomes, mas entender o papel que cada componente desempenha no aprendizado.",
      ],
    },
    {
      id: "glossario",
      eyebrow: "Fechamento",
      title: "Glossário essencial",
      lead:
        "Consolidar o vocabulário ajuda a interpretar artigos, cursos e implementações sem depender de memorização superficial.",
      interactive: "glossary",
      paragraphs: [
        "Se estes termos estiverem claros, as próximas aulas sobre ativações, perdas, backpropagation e otimização ficarão muito mais naturais.",
      ],
    },
  ],
  summaryCards: [
    {
      title: "Neurônios fazem contas simples",
      body:
        "Cada neurônio combina entradas, pesos e bias antes de aplicar uma ativação.",
    },
    {
      title: "Pesos moldam a sensibilidade",
      body:
        "Eles dizem quais sinais devem ser reforçados, atenuados ou invertidos.",
    },
    {
      title: "Camadas constroem representações",
      body:
        "A força da rede está em compor transformações úteis, não em um único neurônio isolado.",
    },
    {
      title: "Forward pass revela a crença atual",
      body:
        "Ele produz a previsão com os parâmetros atuais, mas ainda não corrige nada.",
    },
    {
      title: "Perda é a bússola",
      body:
        "Ela define matematicamente o que conta como erro e em que direção melhorar.",
    },
    {
      title: "Treinamento é ajuste incremental",
      body:
        "Aprender em redes neurais significa acumular muitas pequenas correções coerentes.",
    },
  ],
  quiz: [
    {
      id: "q1",
      prompt: "Qual descrição representa melhor o papel de um peso em um neurônio artificial?",
      options: [
        { id: "a", label: "Ele controla o quanto uma entrada influencia a soma do neurônio." },
        { id: "b", label: "Ele decide automaticamente a classe final sem depender de outras camadas." },
        { id: "c", label: "Ele substitui a necessidade de função de perda." },
      ],
      correctOptionId: "a",
      feedback:
        "Pesos modulam a influência de cada entrada. Eles não eliminam a necessidade de outras partes da rede nem definem sozinhos a saída final.",
    },
    {
      id: "q2",
      prompt: "Para que serve o bias em um neurônio?",
      options: [
        { id: "a", label: "Para deslocar a soma e permitir fronteiras de decisão mais flexíveis." },
        { id: "b", label: "Para normalizar automaticamente todos os dados." },
        { id: "c", label: "Para impedir que a ativação seja aplicada." },
      ],
      correctOptionId: "a",
      feedback:
        "O bias desloca a resposta do neurônio e permite limiares úteis mesmo quando as entradas são pequenas ou centradas perto de zero.",
    },
    {
      id: "q3",
      prompt: "O forward pass faz o quê?",
      options: [
        { id: "a", label: "Propaga as entradas pela rede para produzir uma saída com os pesos atuais." },
        { id: "b", label: "Atualiza pesos diretamente sem precisar de erro." },
        { id: "c", label: "Escolhe a arquitetura da rede automaticamente." },
      ],
      correctOptionId: "a",
      feedback:
        "Forward pass é a execução da rede em modo de previsão. A atualização dos pesos acontece em outra etapa do treinamento.",
    },
    {
      id: "q4",
      prompt: "Por que adicionar camadas escondidas pode ser útil?",
      options: [
        { id: "a", label: "Porque elas permitem recombinar sinais e construir representações intermediárias." },
        { id: "b", label: "Porque fazem a função de perda deixar de ser necessária." },
        { id: "c", label: "Porque garantem que o modelo nunca cometa overfitting." },
      ],
      correctOptionId: "a",
      feedback:
        "Camadas intermediárias ajudam a transformar o dado em representações mais adequadas para a tarefa. Elas não eliminam outros desafios de modelagem.",
    },
    {
      id: "q5",
      prompt: "A função de perda é importante porque...",
      options: [
        { id: "a", label: "fornece uma medida quantitativa do erro que o treinamento tenta reduzir." },
        { id: "b", label: "substitui completamente a necessidade de dados rotulados." },
        { id: "c", label: "define a cor dos neurônios no diagrama da rede." },
      ],
      correctOptionId: "a",
      feedback:
        "A perda traduz a qualidade da previsão em um número otimizable. Sem ela, a rede não teria um critério claro de melhoria.",
    },
    {
      id: "q6",
      prompt: "O que melhor descreve o treinamento de redes neurais?",
      options: [
        { id: "a", label: "Uma sequência de pequenas correções de parâmetros guiadas pelo erro." },
        { id: "b", label: "Uma troca instantânea de pesos ruins por pesos perfeitos." },
        { id: "c", label: "Um processo puramente aleatório sem relação com a saída desejada." },
      ],
      correctOptionId: "a",
      feedback:
        "Treinamento é iterativo. Em geral, a rede melhora por acumular muitos pequenos ajustes, não por um único salto perfeito.",
    },
    {
      id: "q7",
      prompt: "Qual afirmação sobre conhecimento em redes neurais é mais adequada?",
      options: [
        { id: "a", label: "Ele costuma estar distribuído por muitos parâmetros e interações." },
        { id: "b", label: "Ele sempre fica armazenado em um único peso dominante." },
        { id: "c", label: "Ele aparece apenas na camada de entrada." },
      ],
      correctOptionId: "a",
      feedback:
        "Em redes reais, o comportamento aprendido emerge da coordenação entre muitos parâmetros, não de um peso isolado com significado universal.",
    },
    {
      id: "q8",
      prompt: "Confundir perda com métrica final de negócio é um erro porque...",
      options: [
        { id: "a", label: "a perda orienta o treinamento, enquanto a métrica resume desempenho sob outro ponto de vista." },
        { id: "b", label: "perda e métrica nunca podem crescer ou cair juntas." },
        { id: "c", label: "a métrica sempre substitui o forward pass." },
      ],
      correctOptionId: "a",
      feedback:
        "Perda e métrica podem se relacionar, mas exercem papéis diferentes. A perda precisa ser treinável; a métrica pode priorizar interpretação final.",
    },
  ],
  glossary: [
    {
      term: "Neurônio artificial",
      definition:
        "Unidade computacional que combina entradas com pesos, soma um bias e aplica uma ativação para produzir uma saída.",
    },
    {
      term: "Peso",
      definition:
        "Parâmetro que ajusta a influência de uma entrada sobre a soma do neurônio.",
    },
    {
      term: "Bias",
      definition:
        "Termo aditivo que desloca a resposta do neurônio e aumenta sua flexibilidade.",
    },
    {
      term: "Ativação",
      definition:
        "Função aplicada após a soma ponderada para produzir o sinal de saída do neurônio.",
    },
    {
      term: "Camada",
      definition:
        "Conjunto de neurônios calculados em paralelo dentro da arquitetura da rede.",
    },
    {
      term: "Camada escondida",
      definition:
        "Camada intermediária que transforma a representação do dado antes da saída.",
    },
    {
      term: "Forward pass",
      definition:
        "Processo de propagar as entradas para frente na rede até obter uma previsão.",
    },
    {
      term: "Função de perda",
      definition:
        "Função que mede o quão distante a previsão está do alvo e orienta o treinamento.",
    },
    {
      term: "Parâmetro",
      definition:
        "Valor ajustável aprendido durante o treinamento, como pesos e biases.",
    },
    {
      term: "Representação",
      definition:
        "Forma interna como a rede reorganiza a informação em cada camada.",
    },
    {
      term: "Treinamento",
      definition:
        "Processo iterativo de ajustar parâmetros para reduzir a perda em exemplos de dados.",
    },
  ],
};
