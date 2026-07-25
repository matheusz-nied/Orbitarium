import type {
  LessonBlock,
  LessonBlockType,
  LessonContent,
  LessonReference,
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

function s(
  id: string,
  eyebrow: string,
  title: string,
  lead: string,
  visual: string | undefined,
  interactive: string | undefined,
  paragraphs: string[],
  blocks?: LessonBlock[],
) {
  return { id, eyebrow, title, lead, visual, interactive, paragraphs, blocks };
}

function q(
  id: string,
  prompt: string,
  a: string,
  b: string,
  c: string,
  correctOptionId: "a" | "b" | "c",
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

export const capstoneFlamegraphParaPatchContent: LessonContent = {
  id: "capstone-flamegraph-para-patch",
  title: "Capstone: Do Flamegraph ao Patch",
  subtitle:
    "Uma oficina guiada de performance em que o flamegraph deixa de ser poster bonito e vira ponto de partida para recorte, hipotese, patch e verificacao.",
  description:
    "Capstone avancado sobre metodologia de otimizacao a partir de profiling: sair do sintoma, ler flamegraphs com criterio, formular hipoteses, escolher entre opcoes de patch e validar ou invalidar a mudanca sem cair em teatro de performance.",
  primaryCategoryId: "computacao",
  secondaryCategoryId: "engenharia",
  level: "Avançado",
  estimatedTime: "65-80 min",
  tags: [
    "Flamegraph",
    "Profiling",
    "perf",
    "pprof",
    "Otimização",
    "Diagnóstico",
    "Metodologia",
  ],
  learningObjectives: [
    "Transformar um sintoma amplo de lentidão em uma pergunta de medição específica.",
    "Ler flamegraphs sem confundir largura com linha do tempo ou com culpa automática.",
    "Distinguir trabalho útil, trabalho redundante, coordenação cara e espera escondida ao interpretar stacks quentes.",
    "Gerar hipóteses testáveis a partir do profile em vez de saltar direto para um patch sedutor.",
    "Comparar patches locais, estruturais e a decisão de não otimizar ainda com critérios explícitos.",
    "Fechar o ciclo com nova medição, validação ou invalidação consciente da hipótese original.",
  ],
  prerequisites: [
    "Ter visto ou dominar a ideia geral de profiling por amostragem e stacks.",
    "Noções de metodologia de otimização, benchmark honesto e recorte de hipótese.",
    "Entendimento básico de CPU, I/O, alocação e contenção ajuda a dar nomes melhores aos sintomas.",
  ],
  references: [
    ref(
      "Flame Graphs",
      "Brendan Gregg",
      "https://www.brendangregg.com/flamegraphs.html",
      "Página oficial do criador dos flame graphs, com definição, usos e armadilhas de interpretação.",
    ),
    ref(
      "CPU Flame Graphs",
      "Brendan Gregg",
      "https://www.brendangregg.com/FlameGraphs/cpuflamegraphs.html",
      "Explica a construção de flamegraphs a partir de amostragem de CPU e a leitura dos caminhos quentes.",
    ),
    ref(
      "The Flame Graph",
      "ACM Queue",
      "https://queue.acm.org/detail.cfm?id=2927301",
      "Artigo de Brendan Gregg mostrando motivação, leitura visual e valor metodológico do flamegraph.",
    ),
    ref(
      "perf(1)",
      "Linux man-pages / man7.org",
      "https://www.man7.org/linux/man-pages/man1/perf.1.html",
      "Manual de referência para coleta de perfis e outros diagnósticos no Linux.",
    ),
    ref(
      "Diagnostics",
      "The Go Programming Language",
      "https://go.dev/doc/diagnostics",
      "Resumo oficial do ecossistema Go para escolher ferramentas de diagnóstico, inclusive pprof e flame graphs.",
    ),
    ref(
      "Profiling Go Programs",
      "The Go Blog",
      "https://go.dev/blog/pprof",
      "Exemplo clássico de como transformar profiling em intervenção concreta e revalidação.",
    ),
  ],
  heroVisual: "flamegraph-patch-hero",
  openingText:
    "Um flamegraph sozinho nao otimiza nada. Ele mostra um desenho agregado de custo, mas quem decide o que fazer ainda e voce: qual parte desse peso e trabalho util, qual parte e redundancia, qual parte e sintoma secundario, e qual mudanca vale o risco operacional. Este capstone existe para treinar exatamente essa passagem: sair da imagem, entrar na hipotese e voltar para a medicao depois do patch.",
  quickFacts: [
    {
      title: "Barra larga nao e sentenca",
      body: "Ela indica presenca relevante nas amostras, mas ainda precisa de contexto para virar acao.",
    },
    {
      title: "Patch bom reduz incerteza",
      body: "As melhores intervencoes melhoram o sistema e tambem ensinam algo sobre o custo dominante.",
    },
    {
      title: "Nem todo hotspot merece cirurgia",
      body: "As vezes o caminho quente e simplesmente trabalho util esperado para a carga atual.",
    },
    {
      title: "Invalidar e vitoria",
      body: "Descobrir que a hipotese estava errada custa menos do que otimizar o lugar errado por uma semana.",
    },
  ],
  sections: [
    s(
      "motivacao",
      "Capstone",
      "O objetivo nao e decorar ferramenta; e aprender a atravessar o ciclo completo",
      "Nesta oficina, o flamegraph e tratado como um recorte operacional que precisa desembocar em decisao engenheirada.",
      "flamegraph-patch-hero",
      undefined,
      [
        "Times imaturos em performance tendem a parar cedo demais em uma das pontas. Ou ficam presos na coleta, produzindo capturas bonitas sem consequencia, ou pulam para o patch por intuicao e depois tentam justificar a mudanca com um profile lido de tras para frente.",
        "O caminho profissional e outro: sintoma, recorte, coleta, leitura, hipotese, intervencao e verificacao. Cada etapa reduz um tipo diferente de incerteza. O flamegraph participa do meio do processo, nao do processo inteiro.",
        "A habilidade que queremos treinar aqui e metodologica. Mesmo quando a ferramenta mudar de `perf` para `pprof`, ou de um servico Go para um binario nativo em Linux, o raciocinio de investigacao continua reconhecivel.",
      ],
      [
        block(
          "definition",
          "Oficina guiada",
          "Formato em que a aula avanca por problema, medicao, hipotese e verificacao, em vez de apresentar uma lista de comandos soltos.",
        ),
        block(
          "insight",
          "O flamegraph entra no meio da historia",
          "Ele nao substitui triagem inicial nem revalidacao final; seu papel e afunilar onde vale pensar melhor.",
        ),
      ],
    ),
    s(
      "contrato-da-oficina",
      "Metodo",
      "Do sintoma ao patch existe uma cadeia de traducao",
      "Cada elo dessa cadeia pode falhar, e boa engenharia de performance sabe nomear o tipo de erro cometido em cada etapa.",
      "flamegraph-patch-map",
      undefined,
      [
        "Sintoma geralmente chega em linguagem de negocio ou operacao: rota lenta, job demorando demais, CPU alta, throughput abaixo do esperado. O primeiro trabalho nao e abrir o profiler, e sim transformar essa dor em uma pergunta mais recortada.",
        "Depois da coleta vem o perigo da narrativa sedutora. Ver um caminho quente e facil; decidir se ele aponta para duplicacao, algoritmo, serializacao, lock ou apenas trabalho util ja exige modelo mental do sistema.",
        "Por fim, o patch so merece esse nome quando fecha um loop: a mudanca precisa ser pequena o bastante para ser atribuivel e medida, mas significativa o bastante para ensinar algo sobre o comportamento observado.",
      ],
      [
        block(
          "example",
          "Traducao saudavel",
          "Sintoma: 'a exportacao ficou lenta'. Pergunta melhor: 'o custo dominante ficou on-CPU no parse, na serializacao ou na espera por dependencia?'",
        ),
        block(
          "mistake",
          "Erro comum",
          "Comecar dizendo 'vamos trocar a estrutura de dados' antes de estabelecer qual custo esta realmente dominante.",
        ),
      ],
    ),
    s(
      "sintoma-e-recorte",
      "Recorte",
      "O flamegraph so ajuda bem quando voce coleta para uma pergunta razoavel",
      "Coletar em cima de um periodo aleatorio ou de uma carga irrelevante cria um profile real de um problema falso.",
      undefined,
      undefined,
      [
        "Antes do profile, vale responder: que sintoma queremos reproduzir, em que rota, sob que tipo de carga e com que criterio de sucesso? Sem isso, a coleta vira um retrato estatisticamente honesto de um contexto operacionalmente inutil.",
        "Recorte nao precisa ser perfeito, mas precisa ser explicito. Um caminho de background pode dominar a CPU durante a captura e ainda assim nao explicar a lentidao percebida pelo usuario. Do mesmo modo, uma janela muito curta ou muito fria pode esconder o comportamento que importa.",
        "Pense nesta etapa como a preparacao do laboratorio. O flamegraph nao corrige experimento mal desenhado; ele apenas desenha com nitidez o custo do experimento errado.",
      ],
      [
        block(
          "definition",
          "Recorte de medicao",
          "Conjunto de condicoes que define qual comportamento esta sendo observado, em que carga e com qual pergunta.",
        ),
        block(
          "insight",
          "Perfil fiel pode ser inutil",
          "Uma captura pode estar tecnicamente correta e mesmo assim nao representar o sintoma que originou a investigacao.",
        ),
      ],
    ),
    s(
      "coleta-e-contaminacao",
      "Coleta",
      "Colete sem transformar o sistema investigado em outra coisa",
      "A instrumentacao ideal responde a pergunta atual com o menor custo razoavel de intrusao.",
      undefined,
      "flamegraph-patch-flow-lab",
      [
        "Em muitos casos, sampling e o melhor ponto de partida porque oferece boa visao de hotspots com overhead relativamente contido. Ja tracing detalhado, logs excessivos ou benchmarks artificiais demais podem contaminar o alvo e mudar o que voce esta tentando entender.",
        "Tambem importa lembrar que o profile precisa conversar com outras pistas. CPU alta pode apontar para custo computacional; CPU baixa pode sugerir espera; block e mutex profiles podem ser mais informativos do que um flamegraph de CPU em certos cenarios.",
        "Coletar bem e escolher a menor ferramenta que derruba a maior duvida atual. Se a pergunta mudar, a coleta tambem pode mudar. Metodo maduro nao idolatra um unico formato de evidencia.",
      ],
      [
        block(
          "definition",
          "Contaminacao da medicao",
          "Quando o proprio mecanismo de observacao altera de modo relevante o comportamento do sistema observado.",
        ),
        block(
          "mistake",
          "Misturar tudo cedo demais",
          "Abrir profiler, tracer, logs detalhados e benchmark improvisado ao mesmo tempo dificulta atribuir o que cada evidencia realmente diz.",
        ),
      ],
    ),
    s(
      "leitura-correta",
      "Leitura",
      "Ler um flamegraph bem e diferenciar peso, profundidade e contexto",
      "A largura mostra presenca agregada nas amostras; a altura mostra pilha; nenhuma das duas, sozinha, entrega causalidade completa.",
      undefined,
      undefined,
      [
        "A primeira regra classica continua valendo: o eixo horizontal nao e linha do tempo. Frames lado a lado nao significam que a execucao percorreu aqueles caminhos naquela ordem; significam apenas agregacao de stacks semelhantes.",
        "A segunda regra e menos lembrada: barra larga no topo nem sempre explica a raiz arquitetural do custo. As vezes o topo so concentra o trabalho porque um nivel abaixo escolheu mal um algoritmo, um formato de dados, uma forma de alocacao ou um padrao de repeticao.",
        "Por isso, a leitura madura procura paths quentes, repeticao estrutural e relacao entre caller e callee. Voce nao esta procurando um culpado unico; esta procurando a melhor proxima pergunta.",
      ],
      [
        block(
          "definition",
          "Path quente",
          "Sequencia de chamadas que aparece repetidamente nas amostras e concentra parte relevante do custo observado.",
        ),
        block(
          "example",
          "Leitura melhor",
          "Em vez de dizer 'esta funcao esta larga', diga 'este caminho sugere custo dominante de serializacao chamado por este handler sob esta carga'.",
        ),
      ],
    ),
    s(
      "hipotese",
      "Hipotese",
      "O profile nao entrega o patch; ele entrega uma suspeita melhor formulada",
      "A mudanca certa nasce quando voce traduz o desenho visual em uma afirmacao que possa ser confirmada ou negada.",
      undefined,
      undefined,
      [
        "Uma boa hipotese tem sujeito, mecanismo e efeito esperado. Por exemplo: 'duplicamos parse no caminho de resposta', 'a serializacao reconstrui estruturas temporarias em excesso', 'o lock protege mais trabalho do que deveria'.",
        "Note que a hipotese ainda nao e o patch. Ela e uma explicacao operacional provisoria sobre o que torna aquele path largo. Separar esses dois niveis evita um erro frequente: transformar a primeira intuicao de implementacao em verdade sobre o sistema.",
        "Quanto melhor a hipotese, melhor a escolha do experimento seguinte. Talvez baste um patch pequeno. Talvez seja necessario outro tipo de profile. Talvez o melhor resultado seja invalidar a suspeita atual e voltar um passo.",
      ],
      [
        block(
          "definition",
          "Hipotese testavel",
          "Explicacao provisoria que faz previsoes observaveis sobre o efeito de uma mudanca ou de uma medicao adicional.",
        ),
        block(
          "insight",
          "Ver e explicar sao trabalhos diferentes",
          "O flamegraph ajuda muito no primeiro; o segundo exige modelo do dominio, runtime e arquitetura.",
        ),
      ],
    ),
    s(
      "patch-options",
      "Decisao",
      "Patch bom nem sempre e o mais esperto; e o que melhor equilibra ganho, risco e clareza",
      "Ao sair da hipotese, voce entra num espaco de opcoes: intervir localmente, mover o desenho, coletar mais ou explicitamente nao mexer ainda.",
      undefined,
      "flamegraph-patch-options-lab",
      [
        "Intervencoes locais costumam ser atraentes porque sao baratas de codar e faceis de revisar. Elas funcionam muito bem quando o problema esta realmente em redundancia, copia, alocacao ou escolha de API num ponto circunscrito.",
        "Ja certas leituras apontam para algo mais estrutural: fila errada, lock grande demais, fan-out excessivo, repeticao de trabalho entre camadas. Nesses casos, micro-ajuste local pode ate diminuir uma barra, mas deixar o desenho fundamental intacto.",
        "Existe ainda uma opcao madura e pouco glamourizada: nao patchar agora. Se a hipotese ainda esta fraca ou o risco de regressao e alto, investir em uma medicao complementar pode ser a escolha mais tecnica da sala.",
      ],
      [
        block(
          "mistake",
          "Patch por vaidade",
          "Escolher a mudanca mais engenhosa em vez da mudanca que melhor responde a hipotese atual.",
        ),
        block(
          "example",
          "Nao mexer tambem e decisao",
          "Se o path quente reflete trabalho util esperado e o gargalo real esta em outra camada, a melhor acao e preservar clareza e seguir investigando.",
        ),
      ],
    ),
    s(
      "verificacao",
      "Verificacao",
      "Depois do patch, a pergunta nao e 'ficou bonito?', e sim 'o que mudou de forma atribuivel?'",
      "Validar significa medir de novo no mesmo recorte relevante e observar tanto o alvo principal quanto efeitos colaterais.",
      undefined,
      "flamegraph-patch-validation-dial",
      [
        "Um resultado maduro compara antes e depois com a mesma pergunta, nao com qualquer numero conveniente. Se o sintoma original era latencia de uma rota, o patch precisa ser reavaliado nesse contexto, nao apenas em um microbenchmark isolado que ficou elegante.",
        "Tambem vale olhar o formato do profile, nao so um numero resumido. Reduzir um caminho quente pode deslocar custo para outra etapa, aumentar alocacao, piorar legibilidade ou introduzir contenção nova. O ganho real aparece quando a mudanca melhora o sistema inteiro relevante.",
        "E se a hipotese cair? Excelente. A invalidação evita acoplamento acidental entre narrativa e codigo. Em performance, aprender rapidamente que a historia estava errada costuma ser mais barato do que insistir nela por apego ao patch.",
      ],
      [
        block(
          "definition",
          "Atribuibilidade",
          "Capacidade de relacionar uma mudanca observada a uma intervencao especifica, sem misturar muitas variaveis ao mesmo tempo.",
        ),
        block(
          "insight",
          "Diff de profile tambem ensina",
          "Mesmo quando o ganho principal nao aparece, a comparacao antes/depois revela se voce tocou a causa ou apenas moveu o sintoma.",
        ),
      ],
    ),
    s(
      "anti-overfit",
      "Armadilhas",
      "Os erros mais caros aparecem quando a equipe passa a otimizar a figura em vez do sistema",
      "Flamegraphs sao excelentes para reduzir fantasia, mas podem alimentar nova fantasia se forem tratados como fim em si mesmos.",
      "flamegraph-patch-summary",
      undefined,
      [
        "Uma barra larga pode ser trabalho util inevitavel dado o produto que voce entrega. Outra pode diminuir em benchmark e reaparecer em producao porque a carga real tem formato diferente. Outra pode sumir enquanto a cauda de latencia piora por um motivo lateral que o recorte nao capturou.",
        "Tambem existe o overfit intelectual: o time aprende uma vez que certa classe de problema se resolvia com pool, cache, SIMD, arena ou lock-free, e passa a enxergar a mesma moral em todo flamegraph seguinte.",
        "Por isso, o fechamento desta oficina nao e 'otimize sempre o topo', e sim 'mantenha a cadeia de raciocinio curta, explicita e reavaliada'. Isso torna a melhoria mais confiavel e a regressao mais detectavel.",
      ],
      [
        block(
          "mistake",
          "Otimizar o flamegraph",
          "Fazer mudancas para encolher uma barra especifica sem verificar se o sintoma de negocio ou operacao realmente melhorou.",
        ),
        block(
          "mistake",
          "Generalizar a ultima vitoria",
          "Aplicar a mesma tecnica em todo problema novo sem reconstituir sintoma, recorte e hipotese.",
        ),
      ],
    ),
    s(
      "quiz-revisao",
      "Revisao",
      "Quiz de revisao",
      "Use as perguntas para testar se voce consegue atravessar do profile a decisao sem pular etapas.",
      undefined,
      "quiz",
      ["O objetivo do quiz e reforcar metodo, nao decorar slogans sobre ferramenta."],
      [],
    ),
    s(
      "glossario",
      "Vocabulário",
      "Glossario essencial",
      "Revise os termos que organizam uma investigacao de performance guiada por flamegraphs e perfis.",
      undefined,
      "glossary",
      ["Esses conceitos reaparecem em perf, pprof, benchmarks, tracing e revisoes de patch."],
      [],
    ),
  ],
  summaryCards: [
    {
      title: "Sintoma vem antes da coleta",
      body: "O profile certo depende da pergunta operacional que voce esta tentando responder.",
    },
    {
      title: "Flamegraph agrega stacks",
      body: "Largura e peso agregado; altura e profundidade de chamada; contexto continua indispensavel.",
    },
    {
      title: "Hipotese nao e patch",
      body: "Primeiro explique o custo observado; so depois escolha a intervencao mais plausivel.",
    },
    {
      title: "Nem todo hotspot pede cirurgia",
      body: "Trabalho util, risco de regressao e representatividade do recorte entram no calculo.",
    },
    {
      title: "Verificar e parte da otimizacao",
      body: "Sem reavaliacao antes/depois, performance vira narrativa e nao engenharia.",
    },
    {
      title: "Invalidar economiza semanas",
      body: "Descobrir cedo que a historia estava errada e um resultado tecnico valioso.",
    },
  ],
  quiz: [
    q(
      "q1",
      "Qual e a melhor descricao do papel do flamegraph neste capstone?",
      "Ele reduz o espaco de busca e ajuda a formular hipoteses sobre caminhos de custo relevantes.",
      "Ele entrega automaticamente o patch correto a partir da barra mais larga.",
      "Ele substitui a necessidade de revalidar o sistema depois da mudanca.",
      "a",
      "O flamegraph e uma ferramenta forte de afunilamento, nao um oraculo de implementacao.",
    ),
    q(
      "q2",
      "Por que o recorte da coleta importa tanto?",
      "Porque um profile pode ser fiel a uma carga irrelevante e, ainda assim, nao explicar o sintoma investigado.",
      "Porque flamegraphs so funcionam em janelas muito longas.",
      "Porque o profiler exige que toda CPU do sistema esteja ociosa.",
      "a",
      "Representatividade do experimento e parte central da metodologia, nao detalhe operacional.",
    ),
    q(
      "q3",
      "Ao ver uma barra larga no topo do flamegraph, qual e a leitura mais madura?",
      "Perguntar se ela representa trabalho util, redundancia ou sintoma secundario dentro de um path maior.",
      "Assumir que aquela funcao deve ser reescrita imediatamente em uma linguagem mais rapida.",
      "Concluir que o eixo horizontal mostra exatamente a ordem temporal dos eventos.",
      "a",
      "Barra larga e pista, nao veredito automatico.",
    ),
    q(
      "q4",
      "Qual frase define melhor uma hipotese testavel de performance?",
      "Uma explicacao provisoria que faz previsoes observaveis sobre o efeito de uma mudanca ou medicao extra.",
      "Um patch plausivel que parece elegante mesmo sem evidencias complementares.",
      "Uma lista de tecnicas conhecidas que geralmente ajudam em qualquer servico.",
      "a",
      "Hipotese boa permite confirmacao ou refutacao, em vez de apenas inspirar otimismo.",
    ),
    q(
      "q5",
      "Quando a decisao de nao patchar ainda pode ser a melhor?",
      "Quando a hipotese esta fraca, o risco de regressao e alto ou a medicao atual ainda nao separa bem as causas.",
      "Quando o time nao gosta de profiling.",
      "Quando toda barra larga e considerada inevitavel por definicao.",
      "a",
      "Nao agir tambem pode ser engenharia madura quando a incerteza principal ainda nao caiu.",
    ),
    q(
      "q6",
      "O que significa validar um patch com criterio?",
      "Repetir a medicao relevante e observar tanto o sintoma alvo quanto efeitos colaterais e deslocamentos de custo.",
      "Comparar apenas uma captura visual sem controlar mais nada do experimento.",
      "Aceitar que o codigo ficou menor e, portanto, certamente mais rapido.",
      "a",
      "Verificacao forte precisa de comparacao atribuivel no contexto que realmente importa.",
    ),
    q(
      "q7",
      "Qual e um exemplo de overfit de otimizacao?",
      "Aplicar a mesma tecnica que funcionou no ultimo incidente sem reconstituir sintoma, recorte e hipotese do caso atual.",
      "Rejeitar qualquer melhoria local mesmo quando o profile a sustenta.",
      "Medir antes e depois da intervencao.",
      "a",
      "Otimizar por memoria da ultima vitoria e um atalho cognitivo perigoso.",
    ),
    q(
      "q8",
      "Se a hipotese original for invalidada depois do patch ou da medicao complementar, qual e a leitura correta?",
      "A investigacao ainda gerou valor porque reduziu o espaco de busca e evitou insistir na historia errada.",
      "Todo o trabalho anterior foi inutil porque nao confirmou o patch imaginado.",
      "O flamegraph deixa de servir para qualquer outra etapa da investigacao.",
      "a",
      "Invalidacao disciplinada e parte normal de um processo forte de diagnostico.",
    ),
  ],
  glossary: [
    g("Flamegraph", "Visualizacao agregada de stacks amostradas, usada para destacar caminhos de custo recorrentes."),
    g("Sampling", "Tecnica de observacao por amostras periodicas ou orientadas a evento, em vez de registrar tudo."),
    g("Path quente", "Sequencia de chamadas recorrente que concentra parte relevante do custo observado."),
    g("Hotspot", "Ponto ou caminho do programa que aparece como concentracao de custo em uma medicao."),
    g("Recorte", "Conjunto de condicoes da coleta: carga, janela, rota e pergunta investigada."),
    g("Hipotese testavel", "Explicacao provisoria que faz previsoes observaveis e pode ser invalidada."),
    g("Atribuibilidade", "Capacidade de relacionar mudanca medida a uma intervencao especifica."),
    g("Overhead de instrumentacao", "Custo introduzido pela propria ferramenta de observacao."),
    g("Trabalho util", "Custo que de fato entrega valor esperado da aplicacao, nao apenas desperdicio ou redundancia."),
    g("Sintoma secundario", "Manifestacao visivel de custo que nasce de uma causa mais funda em outra parte do sistema."),
    g("Overfit de otimizacao", "Ato de adaptar a mudanca ao experimento ou ao grafico em vez do problema real do sistema."),
  ],
};
