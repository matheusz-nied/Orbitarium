import type {
  GlossaryTerm,
  LessonBlock,
  LessonBlockType,
  LessonContent,
  LessonReference,
  QuizQuestion,
} from "../../../types/content";

function ref(title: string, source: string, url: string, note: string): LessonReference {
  return { title, source, url, note };
}

function block(
  type: LessonBlockType,
  title: string,
  body: string,
  items?: string[],
): LessonBlock {
  return { type, title, body, items };
}

function section(
  id: string,
  eyebrow: string,
  title: string,
  lead: string,
  paragraphs: string[],
  options?: {
    visual?: string;
    interactive?: string;
    blocks?: LessonBlock[];
  },
) {
  return {
    id,
    eyebrow,
    title,
    lead,
    paragraphs,
    visual: options?.visual,
    interactive: options?.interactive,
    blocks: options?.blocks,
  };
}

function quiz(
  id: string,
  prompt: string,
  options: [string, string, string],
  correctOptionId: "a" | "b" | "c",
  feedback: string,
): QuizQuestion {
  return {
    id,
    prompt,
    options: [
      { id: "a", label: options[0] },
      { id: "b", label: options[1] },
      { id: "c", label: options[2] },
    ],
    correctOptionId,
    feedback,
  };
}

function glossary(term: string, definition: string): GlossaryTerm {
  return { term, definition };
}

export const rooflineModeloDePerformanceContent: LessonContent = {
  id: "roofline-modelo-de-performance",
  title: "Modelo Roofline de Performance",
  subtitle:
    "Como separar limites de compute e de movimentacao de dados antes de otimizar o lado errado do sistema.",
  description:
    "Uma aula avancada sobre intensidade operacional, tetos de banda e de compute, classificacao de kernels e uso pratico do Roofline sem inventar numeros de hardware.",
  primaryCategoryId: "computacao",
  secondaryCategoryId: "matematica",
  level: "Avançado",
  estimatedTime: "45-60 min",
  tags: [
    "Roofline",
    "Performance Modeling",
    "Operational Intensity",
    "Memory Bandwidth",
    "Compute-Bound",
    "Otimizacao",
  ],
  learningObjectives: [
    "Entender por que o Roofline resume o conflito entre throughput de compute e movimentacao de dados.",
    "Calcular intuitivamente intensidade operacional como operacoes uteis por byte movimentado.",
    "Classificar kernels como memory-bound ou compute-bound sem depender de slogans.",
    "Escolher intervencoes coerentes: mexer em locality, algoritmo, precisao ou teto de compute.",
    "Reconhecer o que o Roofline nao modela bem, como sincronizacao, I/O, serializacao e caudas.",
  ],
  prerequisites: [
    "Ter visto cache, RAM e a diferenca entre CPU-bound, I/O-bound e memory-bound ajuda bastante.",
    "A aula de metodologia de otimizacao ajuda a transformar o grafico em criterio de decisao.",
    "Nao e necessario dominar HPC formalmente; a aula construiu a intuicao em cima de modelos ja estudados no catalogo.",
  ],
  references: [
    ref(
      "Roofline: An Insightful Visual Performance Model for Floating-Point Programs and Multicore Architectures",
      "UC Berkeley EECS Technical Report",
      "https://www2.eecs.berkeley.edu/Pubs/TechRpts/2008/Archive/EECS-2008-134.pdf",
      "Fonte primaria do modelo Roofline, com definicao de intensidade operacional e interpretacao do ridge point.",
    ),
    ref(
      "Roofline: An Insightful Visual Performance Model For Multicore Architectures",
      "Communications of the ACM",
      "https://cacm.acm.org/research/roofline-an-insightful-visual-performance-model-for-multicore-architectures/",
      "Versao em revista do trabalho de Williams, Waterman e Patterson.",
    ),
    ref(
      "Roofline Performance Model",
      "NERSC Documentation",
      "https://docs.nersc.gov/tools/performance/roofline/",
      "Mostra como medir FLOPs, bytes e throughput para posicionar codigo real no grafico.",
    ),
    ref(
      "Identify Performance Bottlenecks Using CPU Roofline",
      "Intel Advisor Documentation",
      "https://www.intel.com/content/www/us/en/docs/advisor/get-started-guide/2024-2/identify-bottlenecks-using-cpu-roofline.html",
      "Documentacao oficial de ferramenta que usa o modelo para orientar otimizacao pratica.",
    ),
    ref(
      "The Roofline Model: Visualizing and Optimizing Performance",
      "Berkeley Lab AMCR",
      "https://amcr.lbl.gov/departments/computer-science-department/ppan/roofline-performance-model/",
      "Resumo moderno do uso do Roofline em CPUs, GPUs e aceleradores.",
    ),
    ref(
      "Latency Lags Bandwidth",
      "Communications of the ACM",
      "https://cacm.acm.org/research/latency-lags-bandwith/",
      "Contexto util para lembrar por que mover dados continua sendo caro mesmo quando a banda cresce.",
    ),
  ],
  heroVisual: "roofline-hero",
  openingText:
    "Uma otimizacao pode ser tecnicamente correta e ainda assim nao mexer quase nada no tempo total, porque ela melhorou a parte errada do sistema. O Roofline e valioso justamente por isso: ele obriga voce a perguntar se o kernel esta limitado pelo teto de compute ou pelo teto de movimentacao de dados antes de sair trocando instrucoes, threads ou flags de compilacao.",
  quickFacts: [
    {
      title: "Pergunta central",
      body: "o gargalo dominante vem de fazer operacoes ou de alimentar a CPU com dados no ritmo certo?",
    },
    {
      title: "Variavel-chave",
      body: "intensidade operacional, isto e, quantas operacoes uteis saem para cada byte trafegado",
    },
    {
      title: "Erro comum",
      body: "aumentar threads, SIMD ou FLOPs pico quando o kernel continua preso no teto de memoria",
    },
  ],
  sections: [
    section(
      "sintoma",
      "Sintoma",
      "Quando melhorar compute nao melhora a aplicacao",
      "Muitos times so percebem a utilidade do Roofline depois de uma frustracao: trocar compilador, ligar vetorizacao ou aumentar threads e ainda assim ver pouco ganho.",
      [
        "Se voce acabou de sair das aulas sobre cache, RAM e CPU-bound versus memory-bound, este e o proximo passo natural: transformar aquelas intuicoes em um mapa quantitativo simples. O Roofline resume a pergunta 'o kernel esta faminto por dados ou por unidades de execucao?' em um grafico legivel.",
        "O ponto importante nao e decorar o formato do grafico, e sim adquirir um filtro mental. Quando a movimentacao de dados domina, mexer apenas no teto horizontal de compute quase nao altera a performance observada. O resultado e a sensacao enganosa de que a otimizacao 'nao funcionou'.",
        "Essa aula serve justamente para evitar otimizar o lado errado do teto. Em vez de tratar performance como colecao de truques, voce passa a tratá-la como uma restricao geometrica entre algoritmo e maquina.",
      ],
      {
        visual: "roofline-hero",
        blocks: [
          block(
            "insight",
            "Insight central",
            "O Roofline nao diz apenas quanto seu codigo rende. Ele diz qual familia de mudancas ainda tem chance de mexer no resultado.",
          ),
          block(
            "mistake",
            "Erro comum",
            "Concluir que falta SIMD, mais cores ou mais FLOPs pico quando o kernel ainda passa a maior parte do tempo esperando dados chegarem.",
          ),
        ],
      },
    ),
    section(
      "dualidade",
      "Modelo",
      "Compute e data movement competem pelo papel de gargalo",
      "O grafico existe porque todo kernel vive sob dois limites simultaneos: um teto de throughput de compute e um teto imposto pela banda de memoria.",
      [
        "No eixo horizontal, o Roofline coloca a intensidade operacional: quantas operacoes uteis sao realizadas por byte trafegado. No eixo vertical, coloca o throughput sustentado observado. A linha diagonal nasce da banda de memoria; a horizontal, do pico de compute.",
        "Enquanto a intensidade operacional e baixa, o teto diagonal costuma mandar no jogo: adicionar mais capacidade de compute nao ajuda muito se os dados chegam devagar demais. Quando a intensidade cresce o suficiente, o gargalo pode migrar para o teto horizontal.",
        "Essa dualidade conecta diretamente a aula `cpu-bound-io-bound-memory-bound` com a metodologia de otimizacao: primeiro entenda a natureza do limite, depois escolha a intervencao.",
      ],
      {
        visual: "roofline-plane",
        blocks: [
          block(
            "example",
            "Exemplo qualitativo",
            "AXPY e outros kernels de streaming tendem a fazer pouco trabalho por byte lido, enquanto multiplicacao de matrizes densa pode reaproveitar mais dados e subir no eixo X.",
          ),
        ],
      },
    ),
    section(
      "intensidade-operacional",
      "Definicao",
      "Intensidade operacional e trabalho util por byte",
      "A variavel mais importante do Roofline nao e o clock, nem o numero de cores: e a relacao entre operacoes uteis e bytes movimentados no nivel de memoria que voce esta modelando.",
      [
        "Williams, Waterman e Patterson usam intensidade operacional para ligar algoritmo e maquina. Se o algoritmo exige trafegar muitos bytes para poucas operacoes, ele nasce com um teto baixo no lado esquerdo do grafico.",
        "Em termos intuitivos, intensidade operacional sobe quando voce reaproveita melhor os mesmos dados, bloqueia acesso para caber mais em cache, reduz trafego redundante ou muda a formulacao do algoritmo. Ela nao sobe so porque sua CPU ficou mais rapida.",
        "Essa e uma das grandes utilidades do modelo: ele separa nitidamente mudancas que movem o ponto para a direita das mudancas que so erguem o teto horizontal.",
      ],
      {
        visual: "roofline-plane",
        blocks: [
          block(
            "definition",
            "Definicao",
            "Intensidade operacional e a quantidade de operacoes uteis realizada por byte trafegado no nivel de memoria que voce esta analisando.",
          ),
          block(
            "insight",
            "Ponto delicado",
            "Intensidade nao e o mesmo que FLOP/s. Intensidade descreve a razao trabalho-dados; FLOP/s descreve taxa de execucao no tempo.",
          ),
        ],
      },
    ),
    section(
      "desenho-do-roofline",
      "Grafico",
      "Como ler o Roofline sem supersticao",
      "O grafico parece tecnico, mas a leitura operacional e simples: seu ponto so pode viver abaixo dos telhados e encostar em um deles quando o gargalo dominante fica evidente.",
      [
        "A linha diagonal representa o melhor throughput sustentavel caso a banda de memoria seja o fator limitante. Quanto mais voce se move para a direita, mais a mesma banda permite produzir trabalho util. A linha horizontal representa o limite superior de compute da maquina.",
        "O encontro das duas linhas e chamado de ridge point. Ele marca a intensidade minima necessaria para que um kernel sequer tenha chance de atingir o teto de compute. Abaixo desse ponto, a memoria dita o ritmo.",
        "Use o playground a seguir como um modelo didatico normalizado. Ele nao representa um hardware especifico; serve para sedimentar a leitura geometrica do Roofline.",
      ],
      {
        visual: "roofline-plane",
        interactive: "roofline-playground",
        blocks: [
          block(
            "definition",
            "Ridge point",
            "E o ponto onde o teto de memoria encontra o teto de compute; abaixo dele, subir FLOPs pico so raramente muda o resultado.",
          ),
        ],
      },
    ),
    section(
      "classificando-kernels",
      "Classificacao",
      "Kernels diferentes caem em tetos diferentes",
      "Roofline nao foi feito para produzir um rótulo abstrato, e sim para orientar a classificacao de kernels concretos.",
      [
        "AXPY, stencils, SpMV, reducoes e matmul denso ocupam regioes diferentes do grafico porque pedem quantidades muito diferentes de trabalho por byte. O que importa nao e decorar a lista, mas explicar o motivo pelo qual cada familia de kernel nasce mais a esquerda ou mais a direita.",
        "A classificacao tambem depende do nivel de memoria observado. Um kernel pode ter uma historia no DRAM Roofline e outra em um Roofline hierarquico que explicita L1, L2 ou HBM. A regra intuitiva, no entanto, continua a mesma: pergunte quanto trafego foi realmente necessario para sustentar o trabalho.",
        "Na interacao abaixo, voce vai treinar o diagnostico qualitativo sem depender de numeros de pico inventados.",
      ],
      {
        interactive: "kernel-classifier",
        blocks: [
          block(
            "example",
            "AXPY versus matmul",
            "AXPY costuma trafegar memoria quase no mesmo compasso do trabalho feito. Matmul denso, quando bem bloqueado, reaproveita dados por muito mais tempo e tende a caminhar para a direita.",
          ),
        ],
      },
    ),
    section(
      "movendo-o-ponto",
      "Alavancas",
      "O que realmente move um ponto no grafico",
      "Uma das melhores partes do Roofline e que ele separa familias de intervencao que frequentemente sao confundidas.",
      [
        "Melhorar locality, fazer blocking, mudar layout de dados, reduzir bytes por elemento ou eliminar trafego redundante costuma mover o ponto para a direita. Ja vetorizacao, melhor uso de unidades FMA ou um hardware com mais throughput de compute tendem a levantar o teto horizontal.",
        "Algumas intervencoes fazem os dois efeitos em graus diferentes. Mudar precisao, por exemplo, pode reduzir bytes trafegados e ao mesmo tempo permitir outro regime de throughput. O modelo ajuda a perguntar qual dos efeitos e dominante no seu caso.",
        "Essa leitura tambem explica por que 'mais threads sempre ajudam' e um erro recorrente. Se cada thread extra so aumenta disputa pelo mesmo subsistema de memoria, voce apenas chega mais rapido ao mesmo teto diagonal.",
      ],
      {
        visual: "roofline-levers",
        blocks: [
          block(
            "mistake",
            "Mais threads nao sao um passe magico",
            "Paralelismo extra pode apenas empurrar varios workers contra o mesmo limite de banda, sem mudar a intensidade operacional do kernel.",
          ),
          block(
            "insight",
            "Pergunta correta",
            "Sua mudanca vai mover o ponto para a direita, erguer o teto horizontal ou so apertar ainda mais um recurso que ja esta saturado?",
          ),
        ],
      },
    ),
    section(
      "what-if",
      "What-if",
      "Compare intervencoes antes de investir tempo de implementacao",
      "Um bom modelo de performance nao serve so para explicar o passado; ele serve para descartar caminhos ruins antes de voce pagar o custo de implementa-los.",
      [
        "A interacao abaixo compara tipos de mudanca em uma maquina didatica normalizada. O objetivo nao e prever um benchmark real, e sim treinar o raciocinio: em kernels muito a esquerda, ganhar locality tende a valer mais do que aumentar apenas o teto de compute.",
        "Quando o kernel ja esta proximo do lado direito do grafico, a hierarquia muda. Nesse caso, melhorar vetorizacao, reduzir ineficiencias do backend ou usar unidades de compute melhores pode ser o movimento mais rentavel.",
        "Leve essa disciplina para a aula `metodologia-de-otimizacao`: formular hipoteses melhores reduz retrabalho e evita micro-otimizacoes desconectadas da causa.",
      ],
      {
        interactive: "roofline-what-if",
        blocks: [
          block(
            "insight",
            "Otimizar o lado errado do teto",
            "Se o kernel esta colado na diagonal, aumentar apenas o teto horizontal quase sempre produz pouco retorno visivel.",
          ),
        ],
      },
    ),
    section(
      "ponte-cache-ram",
      "Ponte",
      "Cache e RAM continuam no centro da historia",
      "O Roofline nao substitui o que voce aprendeu sobre hierarquia de memoria; ele organiza essas intuicoes em um espaco de decisao.",
      [
        "Quando falamos em bytes no denominador, precisamos perguntar: bytes de onde para onde? O trabalho original de Roofline foi formulado em torno de trafego para DRAM em kernels que nao cabem totalmente em cache, mas o uso moderno do modelo frequentemente desce para niveis de cache e constrói Rooflines hierarquicos.",
        "Isso e util porque otimizar locality muda mais do que 'cache hit rate'. Ela muda a quantidade efetiva de trafego exigida do nivel lento da hierarquia. Em outras palavras, o algoritmo passa a comprar mais trabalho util por byte caro.",
        "Por isso o Roofline conversa tao bem com aulas como `cache-de-cpu`, `como-funciona-a-memoria-ram` e `locality-data-oriented-design`: todas elas ajudam a explicar por que um ponto foi parar onde foi.",
      ],
      {
        visual: "roofline-practice",
        blocks: [
          block(
            "example",
            "Leitura pratica",
            "Blocking de matrizes, fusao de loops e layout de dados nao sao apenas 'truques de cache'. Eles alteram o custo efetivo de abastecer o kernel.",
          ),
        ],
      },
    ),
    section(
      "limites-do-modelo",
      "Limites",
      "O que o Roofline deixa de fora",
      "Como todo bom modelo, o Roofline ganha poder justamente por simplificar. Isso significa que ele tem limites claros.",
      [
        "O modelo ajuda muito quando o gargalo central e throughput de compute versus movimentacao de dados. Ele e menos expressivo para filas de I/O, bloqueios do sistema operacional, sincronia entre threads, serializacao, branch misprediction, divergência de controle e efeitos de cauda.",
        "Tambem nao basta olhar um ponto isolado e concluir que o algoritmo ja esta no melhor possivel. Um ponto muito abaixo dos tetos pode indicar ineficiencia de implementacao, vetorizar mal, acessos irregulares, baixo occupancy ou uma medicao ruim.",
        "A leitura madura, portanto, e dupla: use o Roofline para limitar o espaco de explicacoes e, em seguida, conecte-o a perfis, contadores e evidencia experimental.",
      ],
      {
        visual: "roofline-limits",
        blocks: [
          block(
            "mistake",
            "Erro de modelagem",
            "Tratar o Roofline como explicacao total da aplicacao inteira, ignorando sincronizacao, sistema operacional, I/O e distribuicao temporal do workload.",
          ),
        ],
      },
    ),
    section(
      "uso-pratico",
      "Pratica",
      "Como usar o Roofline no fluxo real de otimizacao",
      "A utilidade pratica do modelo aparece quando ele vira filtro para a proxima pergunta experimental.",
      [
        "Primeiro, escolha o kernel ou regiao quente. Depois, estime ou meca trabalho util, bytes e throughput sustentado com ferramental apropriado. So entao pergunte se vale mais perseguir locality, mudar algoritmo, reduzir trafego, melhorar vetorizacao ou aceitar que outro gargalo manda no sistema.",
        "Ferramentas como o Intel Advisor e a documentacao do NERSC mostram justamente esse fluxo: posicionar loops reais no grafico para decidir onde o esforco de otimizacao deve ir. O grafico nao substitui benchmark nem profiling; ele organiza ambos.",
        "Em equipes maduras, Roofline tambem melhora comunicacao. Em vez de 'parece lento por memoria', voce passa a dizer 'este kernel ainda vive muito a esquerda do ridge point; sem reduzir trafego, o teto de compute nao importa'.",
      ],
      {
        blocks: [
          block(
            "definition",
            "Resumo operacional",
            "Use o Roofline para decidir se a proxima aposta deve atacar bytes, reutilizacao de dados, formulacao do algoritmo ou teto de compute.",
          ),
        ],
      },
    ),
    section(
      "quiz-revisao",
      "Revisao",
      "Quiz de revisao",
      "Cheque se o modelo virou criterio de decisao, nao apenas um desenho bonito.",
      [
        "As perguntas abaixo focam em classificacao de bound, leitura do ridge point e escolha de intervencoes coerentes com a posicao do kernel.",
      ],
      {
        interactive: "quiz",
      },
    ),
    section(
      "glossario",
      "Glossario",
      "Termos para continuar estudando performance model",
      "Feche a aula consolidando o vocabulario tecnico que costuma aparecer em artigos, documentacao de ferramentas e discussao de otimização.",
      [
        "Se esses termos fizerem sentido de forma conectada, voce ja deixou de usar o Roofline como slogan e passou a usa-lo como modelo.",
      ],
      {
        interactive: "glossary",
      },
    ),
  ],
  summaryCards: [
    {
      title: "Pergunta certa",
      body: "o kernel esta limitado por compute ou por movimentacao de dados no nivel de memoria que estou modelando?",
    },
    {
      title: "Variavel central",
      body: "intensidade operacional: trabalho util por byte trafegado",
    },
    {
      title: "Melhor uso",
      body: "filtrar quais intervencoes ainda podem mover o desempenho de forma material",
    },
    {
      title: "Cuidado",
      body: "o modelo nao explica sozinho I/O, sincronizacao, serializacao e caudas de latencia",
    },
  ],
  quiz: [
    quiz(
      "q1",
      "Um kernel esta muito a esquerda do ridge point e quase encostado na diagonal de banda. Qual conclusao e a mais coerente?",
      [
        "Ele esta memory-bound; locality e reducao de trafego tendem a ser apostas melhores do que so aumentar compute pico.",
        "Ele ja esta compute-bound; a unica saida e subir o teto horizontal.",
        "O grafico garante que a implementacao ja esta perfeita.",
      ],
      "a",
      "A esquerda do ridge point, a limitacao dominante tende a vir da banda de memoria. Antes de perseguir mais compute, faz sentido perguntar como mover o ponto para a direita.",
    ),
    quiz(
      "q2",
      "Qual mudanca tende a mover um kernel para a direita no Roofline?",
      [
        "Melhorar reutilizacao de dados com blocking e reduzir bytes redundantes.",
        "Trocar de CPU por outra com clock maior, sem alterar o trafego de dados.",
        "Adicionar threads quando todos acessam o mesmo padrao de streaming.",
      ],
      "a",
      "Mover para a direita significa aumentar intensidade operacional. Isso normalmente vem de locality, blocking, layout e menos trafego, nao apenas de um pico maior de compute.",
    ),
    quiz(
      "q3",
      "Por que AXPY costuma aparecer mais proximo do lado memory-bound do que multiplicacao de matrizes densa?",
      [
        "Porque AXPY costuma fazer pouco trabalho util por byte trafegado, enquanto matmul pode reaproveitar dados muitas vezes.",
        "Porque AXPY usa menos linhas de codigo e o Roofline penaliza kernels pequenos.",
        "Porque matmul nao usa memoria nenhuma depois de carregar os primeiros elementos.",
      ],
      "a",
      "AXPY e um exemplo classico de baixa intensidade operacional. Ja matmul, quando bem bloqueado, aumenta o reaproveitamento e sobe no eixo X.",
    ),
    quiz(
      "q4",
      "O que o ridge point representa de forma intuitiva?",
      [
        "A intensidade minima a partir da qual o teto de compute passa a ser alcancavel.",
        "O ponto exato em que qualquer kernel se torna vetorizado automaticamente.",
        "Uma garantia de que throughput sustentado sera igual ao pico teorico.",
      ],
      "a",
      "O ridge point marca a transicao entre o dominio da diagonal de memoria e a possibilidade de o teto horizontal virar o limite relevante.",
    ),
    quiz(
      "q5",
      "Qual intervencao faz mais sentido testar primeiro em um kernel de streaming ainda preso na diagonal?",
      [
        "Melhorar locality, fusao de loops, layout de dados ou outra mudanca que reduza trafego.",
        "Subir apenas o pico de FLOPs da maquina.",
        "Trocar nomes das variaveis para facilitar o compilador.",
      ],
      "a",
      "Se o kernel esta preso na diagonal, o primeiro grupo de hipoteses deve mirar trafego e intensidade operacional, nao apenas compute.",
    ),
    quiz(
      "q6",
      "Qual afirmacao sobre o Roofline e mais correta?",
      [
        "Ele ajuda a limitar explicacoes plausiveis, mas ainda precisa ser combinado com profiling, contadores e contexto do workload.",
        "Ele substitui por completo medições reais e ja basta para provar qualquer gargalo.",
        "Ele funciona apenas para GPUs e nao ajuda em CPUs.",
      ],
      "a",
      "O Roofline e um modelo-guia. Ele organiza a investigacao, mas nao elimina a necessidade de medir e interpretar implementacao real.",
    ),
    quiz(
      "q7",
      "Se reduzir a precisao dos dados diminuir bastante os bytes trafegados por operacao, o que tende a acontecer no grafico?",
      [
        "A intensidade operacional tende a subir e o ponto pode andar para a direita.",
        "O eixo X permanece sempre identico, porque precisao nunca altera trafego.",
        "O Roofline deixa de valer porque menos bytes sempre significa menos operacoes.",
      ],
      "a",
      "Menos bytes por operacao pode aumentar intensidade operacional. Dependendo do hardware, a mudanca ainda pode interagir com o teto de compute.",
    ),
    quiz(
      "q8",
      "Um ponto esta muito abaixo da diagonal e do teto horizontal. O que isso sugere?",
      [
        "Ha espaco para investigar ineficiencias de implementacao ou medicao; nao basta dizer que o algoritmo ja encontrou o limite teorico.",
        "O algoritmo ultrapassou o Roofline, o que mostra erro no modelo.",
        "Que o kernel necessariamente esta I/O-bound.",
      ],
      "a",
      "Ficar bem abaixo dos telhados indica que outro fator pode estar desperdicando desempenho: vetorizacao fraca, acessos ruins, ocupacao baixa, serializacao ou medicao incompleta.",
    ),
  ],
  glossary: [
    glossary(
      "Roofline",
      "Modelo visual que limita o throughput sustentado de um kernel pelo menor entre o teto de compute e o teto de movimentacao de dados.",
    ),
    glossary(
      "Intensidade operacional",
      "Razao entre operacoes uteis e bytes trafegados no nivel de memoria observado.",
    ),
    glossary(
      "Arithmetic intensity",
      "Nome comum em literatura HPC para intensidade operacional.",
    ),
    glossary(
      "Memory-bound",
      "Situacao em que a banda de memoria dita o throughput dominante do kernel.",
    ),
    glossary(
      "Compute-bound",
      "Situacao em que o kernel ja tem intensidade suficiente para ser limitado principalmente pelo teto de compute.",
    ),
    glossary(
      "Ridge point",
      "Ponto de encontro entre a diagonal de memoria e o teto horizontal de compute.",
    ),
    glossary(
      "Throughput sustentado",
      "Taxa realmente observada durante a execucao, distinta do pico teorico de hardware.",
    ),
    glossary(
      "Bandwidth",
      "Quantidade de dados que um nivel de memoria consegue movimentar por unidade de tempo.",
    ),
    glossary(
      "Locality",
      "Capacidade de reaproveitar dados proximos no tempo ou no espaco, reduzindo trafego para niveis lentos da hierarquia.",
    ),
    glossary(
      "Blocking",
      "Tecnica de reorganizar computacao e dados em blocos para melhorar reutilizacao e caber melhor em cache.",
    ),
    glossary(
      "Roofline hierarquico",
      "Extensao do modelo que mostra telhados de diferentes niveis de cache e memoria, em vez de apenas DRAM.",
    ),
    glossary(
      "Kernel",
      "Trecho quente de codigo, loop ou rotina cujo comportamento de performance e analisado no grafico.",
    ),
  ],
} satisfies LessonContent;
