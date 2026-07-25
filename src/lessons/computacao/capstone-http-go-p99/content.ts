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

export const capstoneHttpGoP99Content: LessonContent = {
  id: "capstone-http-go-p99",
  title: "Capstone: Servidor HTTP em Go e p99",
  subtitle:
    "Uma oficina para instrumentar latencia de verdade, distinguir media de cauda e melhorar um servico Go sem cair em tuning teatral.",
  description:
    "Capstone avancado sobre diagnostico de latencia em servidores HTTP Go: instrumentar o caminho da requisicao, ler media versus p99, localizar se o bound dominante esta em CPU, I/O, lock ou GC e intervir com verificacao cuidadosa.",
  primaryCategoryId: "computacao",
  secondaryCategoryId: "engenharia",
  level: "Avançado",
  estimatedTime: "70-85 min",
  tags: [
    "Go",
    "HTTP",
    "p99",
    "pprof",
    "net/http",
    "Latência",
    "Diagnóstico",
  ],
  learningObjectives: [
    "Instrumentar latencia em um servico Go de forma que a requisicao deixe de ser um numero monolitico.",
    "Explicar por que media, mediana e percentis altos contam historias diferentes sobre a experiencia do usuario.",
    "Distinguir sinais de bound dominante em CPU, I/O, lock e GC sem tratar toda lentidao como problema de handler.",
    "Escolher entre `httptrace`, metricas de rota, `net/http/pprof`, `runtime/pprof` e profiles de block ou mutex conforme a pergunta.",
    "Preferir melhorias pequenas, atribuiveis e reversiveis em vez de mexer em varios knobs ao mesmo tempo.",
    "Validar se a mudanca melhorou o p99 relevante sem mascarar regressao em throughput, erro ou estabilidade.",
  ],
  prerequisites: [
    "Familiaridade basica com `net/http`, handlers, clientes e contexto em Go.",
    "Noções de profiling, benchmark honesto e leitura de latencia ao longo de distribuicoes.",
    "Ajuda ter visto aulas de performance HTTP, pprof, GC e concorrencia no ecossistema Go.",
  ],
  references: [
    ref(
      "net/http package",
      "Go Packages",
      "https://pkg.go.dev/net/http",
      "Documentacao oficial para servidor, cliente, pools, timeouts e ciclo de requisicao.",
    ),
    ref(
      "net/http/httptrace package",
      "Go Packages",
      "https://pkg.go.dev/net/http/httptrace",
      "Referencia oficial para decompor etapas do request no cliente e entender fases do round trip.",
    ),
    ref(
      "net/http/pprof package",
      "Go Packages",
      "https://pkg.go.dev/net/http/pprof",
      "Endpoints HTTP oficiais para perfis de CPU, heap, goroutines, mutex e block em processos Go vivos.",
    ),
    ref(
      "runtime/pprof package",
      "Go Packages",
      "https://pkg.go.dev/runtime/pprof",
      "Coleta programatica de perfis quando o fluxo por HTTP nao e o melhor encaixe.",
    ),
    ref(
      "Diagnostics",
      "The Go Programming Language",
      "https://go.dev/doc/diagnostics",
      "Panorama oficial das ferramentas de diagnostico do ecossistema Go e das perguntas que cada uma responde melhor.",
    ),
    ref(
      "A Guide to the Go Garbage Collector",
      "The Go Programming Language",
      "https://go.dev/doc/gc-guide",
      "Guia oficial para relacionar alocacao, heap, custo de GC e comportamento de aplicacoes Go.",
    ),
    ref(
      "The Tail at Scale",
      "Google Research",
      "https://research.google/pubs/the-tail-at-scale/",
      "Referencia classica sobre por que cauda de latencia importa e por que medias escondem sofrimento real.",
    ),
    ref(
      "Monitoring Systems",
      "Google SRE Workbook",
      "https://sre.google/workbook/monitoring/",
      "Discute percentis e por que medias aritmeticas podem mascarar comportamento ruim em sistemas distribuidos.",
    ),
  ],
  heroVisual: "go-http-p99-hero",
  openingText:
    "Quando um servidor HTTP em Go fica 'lento', o diagnostico ruim comprime tudo em uma media e tudo em um handler. O diagnostico melhor separa distribuicoes, etapas e formas de custo: talvez o problema esteja no percentil alto e nao na media; talvez esteja na dependencia externa e nao no codigo local; talvez esteja em lock, alocacao ou GC. Este capstone treina essa decomposicao antes de qualquer tunagem.",
  quickFacts: [
    {
      title: "Media pode esconder a dor",
      body: "Um servico pode parecer saudavel na media enquanto uma fatia pequena e importante de requests sofre na cauda.",
    },
    {
      title: "p99 nao aponta causa sozinho",
      body: "Ele revela forma de distribuicao; a origem exige instrumentacao adicional e leitura das etapas.",
    },
    {
      title: "Bound e linguagem de projeto",
      body: "CPU, I/O, lock e GC pedem coletas diferentes e tambem familias diferentes de patch.",
    },
    {
      title: "Mexer em tudo mata atribuibilidade",
      body: "Ajustes simultaneos demais deixam dificil provar o que realmente ajudou o p99.",
    },
  ],
  sections: [
    s(
      "motivacao",
      "Capstone",
      "A pergunta correta nao e apenas 'o servidor esta lento?', mas 'quem esta sofrendo, onde e por que?'",
      "Latencia HTTP madura se entende por distribuicao, por etapa e por bound dominante.",
      "go-http-p99-hero",
      undefined,
      [
        "Em servicos Go, o problema chega quase sempre como um resumo insuficiente: a API esta lenta, o throughput caiu, o cliente reclamou. Se a investigacao para nesse nivel, a equipe corre o risco de mexer em timeout, pool, GC e handler no mesmo dia sem aprender nada confiavel.",
        "Este capstone parte de uma disciplina mais forte. Primeiro voce define qual experiencia esta se degradando e como observa isso em distribuicao. Depois voce abre o request em partes: fila, transporte, handler, dependencia, serializacao, lock, alocacao e resposta.",
        "So entao faz sentido perguntar qual bound domina. A intervencao muda completamente se o custo principal for CPU on-CPU, espera por I/O, contenção entre goroutines ou pressao de heap e GC.",
      ],
      [
        block(
          "definition",
          "Bound dominante",
          "Tipo de recurso ou mecanismo que mais limita o avancar da requisicao no cenario observado.",
        ),
        block(
          "insight",
          "Latencia nao e um unico numero",
          "Ela e uma distribuicao produzida por varias etapas e varios tipos de custo competindo dentro do mesmo request.",
        ),
      ],
    ),
    s(
      "media-vs-cauda",
      "Distribuicao",
      "Media, p50 e p99 respondem perguntas diferentes",
      "Sem distinguir o caso tipico do caso ruim plausivel, voce pode declarar vitoria cedo demais.",
      "go-http-p99-map",
      undefined,
      [
        "A media resume o comportamento agregado, mas pode esconder extremos importantes. A mediana enfatiza o request tipico. Percentis altos, como p95 ou p99, contam a historia do que acontece com a cauda do sistema, justamente onde filas, fan-out, lock contention e variabilidade de dependencia costumam aparecer com mais clareza.",
        "Isso nao significa que a media deixa de servir; significa apenas que ela nao basta quando o objetivo e experiencia percebida ou cumprimento de SLO. Uma mesma serie pode ter media aparentemente estavel e, ao mesmo tempo, um p99 em degradacao por causa de uma minoria de requests que fica presa em um caminho especifico.",
        "A boa noticia e que essa leitura ja orienta perguntas melhores. Se apenas a cauda piora, talvez o problema seja saturacao ocasional, pool mal dimensionado, concorrencia desigual, dependencia intermitente ou interacao de GC com bursts. Se tudo piora junto, o bound dominante pode ser mais global.",
      ],
      [
        block(
          "definition",
          "p99",
          "Percentil que marca o valor abaixo do qual ficam 99% das observacoes, deixando explicita a cauda mais lenta da distribuicao.",
        ),
        block(
          "mistake",
          "Erro comum",
          "Celebrar uma media bonita enquanto a experiencia ruim se concentra justamente na cauda que o usuario mais percebe.",
        ),
      ],
    ),
    s(
      "instrumentacao",
      "Instrumentacao",
      "O request precisa deixar de ser um bloco opaco",
      "Instrumentar bem significa separar etapa, rota, erro, dependencia e contexto suficiente para decidir a proxima coleta.",
      undefined,
      "go-http-p99-instrumentation-flow",
      [
        "A primeira melhoria raramente e no codigo de negocio; quase sempre e na capacidade de enxergar melhor o caminho. Medir apenas 'tempo do handler' ou 'tempo medio da API' deixa escondidas perguntas importantes sobre fila, primeira byte, dependencia externa, serializacao, retries e reaproveitamento de conexoes.",
        "Em servidores Go, isso combina metricas por rota e status, histograms para percentis, traces ou spans onde fizer sentido, e perfis acionados com criterio para observar CPU, heap, block ou mutex quando a distribuicao sugerir necessidade. Cada camada acrescenta contraste sem exigir que tudo seja ligado o tempo todo.",
        "A instrumentacao tambem precisa respeitar o objetivo operacional. Se o usuario sente lentidao em um endpoint especifico, agregacoes amplas demais por servico inteiro podem esconder a pista. Se o problema aparece em bursts, medias por janela muito grande podem achatar a variacao critica.",
      ],
      [
        block(
          "definition",
          "Observabilidade acionavel",
          "Conjunto de medidas que nao apenas registram o que aconteceu, mas orientam qual pergunta deve ser feita em seguida.",
        ),
        block(
          "example",
          "Sinal melhor",
          "Separar percentis por rota, metodo e classe de status ja torna muito mais dificil culpar o servidor inteiro por um problema localizado.",
        ),
      ],
    ),
    s(
      "decompondo-o-request",
      "Caminho",
      "Uma requisicao HTTP atravessa varias fronteiras antes de virar resposta",
      "Quando a equipe chama tudo de 'latencia do handler', ela apaga partes inteiras da historia.",
      undefined,
      undefined,
      [
        "Mesmo num servidor aparentemente simples, a jornada do request inclui aceite, fila no balanceador ou runtime, leitura do body, parse, validacao, chamadas internas, serializacao, escrita da resposta e possiveis esperas por cliente ou dependencia. Nem toda etapa pesa em todo caso, mas qualquer uma delas pode dominar a cauda.",
        "No ecossistema Go, `net/http` e as ferramentas de diagnostics ajudam a olhar para essas fronteiras com mais precisao. Em clientes, `httptrace` separa fases do round trip. Em servidores, rotas, middlewares, spans, logs estruturados e perfis conectam a latencia observada ao comportamento do processo e das dependencias.",
        "A vantagem desse mapa e evitar um falso binario entre 'o problema e de aplicacao' e 'o problema e de infraestrutura'. Quase sempre a latencia relevante emerge do acoplamento entre os dois.",
      ],
      [
        block(
          "insight",
          "Cada etapa pede uma evidencia melhor encaixada",
          "Tempo ate o primeiro byte, perfil de CPU, profile de mutex e distribuicao por dependencia contam historias complementares, nao concorrentes.",
        ),
      ],
    ),
    s(
      "achando-o-bound",
      "Diagnóstico",
      "CPU, I/O, lock e GC deixam assinaturas diferentes",
      "A maior economia de tempo vem de reconhecer cedo qual familia de custo esta mais plausivel.",
      undefined,
      "go-http-p99-bound-lab",
      [
        "Se o processo fica ativamente ocupado no caminho das requisicoes, CPU profiles e flame graphs tendem a mostrar stacks quentes, serializacao pesada, compressao, parse, criptografia ou loops custosos. Nesse caso, a variacao do p99 pode acompanhar saturacao computacional ou explosao de trabalho por request.",
        "Se a cauda se forma em esperas, o desenho muda: dependencia remota oscila, pool serializa, conexao nao reutiliza, lock disputa, filas internas crescem, ou o runtime passa a coordenar goroutines demais ao redor do mesmo estado. O processo pode parecer menos quente na CPU e ainda assim entregar uma experiencia ruim.",
        "GC entra como uma categoria que conversa com heap, alocacao e pressao de memoria. Nem toda alocacao e problema, mas churn elevado no caminho quente pode aumentar trabalho do coletor, ampliar variabilidade ou deslocar custo entre requests. O erro e tentar resolver tudo com um unico knob sem ligar isso ao profile e ao padrao de carga.",
      ],
      [
        block(
          "definition",
          "Assinatura de custo",
          "Conjunto de sinais que sugere que tipo de recurso ou mecanismo domina o tempo da requisicao.",
        ),
        block(
          "mistake",
          "Tuning antes do bound",
          "Mudar timeouts, pools, goroutines e configuracoes de GC sem identificar qual mecanismo realmente domina a cauda.",
        ),
      ],
    ),
    s(
      "melhorias-cuidadosas",
      "Intervencao",
      "A forma da melhoria deve combinar com a forma do bound",
      "Patch bom para p99 e o que reduz variabilidade relevante sem explodir complexidade ou esconder regressao lateral.",
      undefined,
      "go-http-p99-improvement-dial",
      [
        "Quando o bound e CPU, pequenos cortes de trabalho util ou redundante podem ajudar bastante: reduzir alocacoes quentes, evitar serializacao duplicada, reaproveitar estruturas onde fizer sentido, simplificar formato de resposta ou reorganizar loops. Mas tudo isso so vale se o profile apontar nessa direcao.",
        "Quando o bound e I/O, a conversa muda para reuso de conexao, cancelamento, fan-out, paralelismo responsavel, politicas de retry e instrumentacao de dependencia. Em lock contention, as melhores vitorias costumam vir de reduzir compartilhamento, encolher regiao critica ou mudar a topologia da coordenacao. Em GC, o foco passa por churn de objetos, heap e ritmo de alocacao, nao por supersticoes soltas.",
        "O principio comum e simples: altere pouco por vez, preserve atribuibilidade e observe efeitos colaterais. Uma melhora de p99 que piora taxa de erro, consumo de memoria ou estabilidade de filas pode ser apenas transferencia de sofrimento.",
      ],
      [
        block(
          "example",
          "Patch focado",
          "Ao confirmar que a cauda nasce de lock em um cache compartilhado, redesenhar ownership do estado costuma ser mais honesto do que trocar meia duzia de constantes operacionais.",
        ),
        block(
          "insight",
          "p99 ruim raramente cede a 'uma flag salvadora'",
          "Quase sempre a melhoria duravel vem de alinhar o patch ao mecanismo dominante observado.",
        ),
      ],
    ),
    s(
      "verificacao",
      "Verificacao",
      "Melhorar o p99 sem teatro exige reavaliar o mesmo alvo e checar custo colateral",
      "Distribuicao, throughput, taxa de erro e perfis depois da mudanca contam juntos a historia do resultado.",
      "go-http-p99-summary",
      undefined,
      [
        "Depois do patch, a pergunta continua sendo operacional: a rota relevante, na carga relevante, ficou melhor para a distribuicao relevante? Essa formulacao impede o atalho de medir outra coisa mais conveniente so porque ela melhorou.",
        "Tambem vale comparar se a forma da distribuicao mudou de modo coerente com o bound atacado. Se o p99 caiu, mas o sistema passou a errar mais, a consumir memoria de modo preocupante ou a criar novos pontos de contenção, a intervencao merece reexame.",
        "Em ambiente real, ha ainda a questao de rollout e reversao. Melhorias de latencia precisam ser tao observaveis quanto correcoes funcionais. O time maduro consegue dizer nao apenas 'ficou melhor', mas 'ficou melhor nestas rotas, sob estas condicoes, com estes efeitos secundarios sob controle'.",
      ],
      [
        block(
          "definition",
          "Teatro de performance",
          "Sequencia de mudancas e dashboards que parece sofisticada, mas nao fecha o nexo entre sintoma, causa provavel, intervencao e resultado.",
        ),
        block(
          "mistake",
          "Ganhar no grafico errado",
          "Apresentar melhora em um agregado amplo ou em benchmark isolado enquanto o p99 que motivou o trabalho continua doente.",
        ),
      ],
    ),
    s(
      "armadilhas",
      "Armadilhas",
      "A maior parte dos erros vem de compressao excessiva da historia",
      "Compressao demais da metrica, da etapa ou da causa faz times inteligentes tomarem decisoes burras rapidamente.",
      undefined,
      undefined,
      [
        "Uma armadilha frequente e tratar p99 como destino final e nao como alarme semantico. Percentil alto ruim diz que existe variabilidade importante; ele nao decide se a origem e fila, CPU, lock, heap, dependencia ou cliente.",
        "Outra armadilha e culpar sempre o handler porque e a parte do sistema que a equipe mais enxerga. Servicos HTTP em Go sofrem com pools ruins, cancelamento ausente, retries em cascata, limites desalinhados e reuse defeituoso tanto quanto sofrem com codigo quente local.",
        "Por fim, ha o habito de aplicar varias supostas boas praticas ao mesmo tempo. Isso produz dashboards novos, comentarios confiantes e atribuibilidade zero. Performance sem atribuibilidade vira folclore tecnico.",
      ],
      [
        block(
          "mistake",
          "Culpar a media",
          "Tomar decisao so porque a media piorou ou melhorou, sem perguntar quem esta na cauda e qual caminho ficou mais lento.",
        ),
        block(
          "mistake",
          "Trocar cinco knobs por release",
          "Sem isolacao de variaveis, ate a melhora real fica dificil de entender, reproduzir e sustentar.",
        ),
      ],
    ),
    s(
      "quiz-revisao",
      "Revisao",
      "Quiz de revisao",
      "Teste se voce consegue sair de uma metrica ampla e chegar a uma intervencao com criterio.",
      undefined,
      "quiz",
      ["As perguntas abaixo priorizam leitura de distribuicao, escolha de ferramenta e qualidade de decisao."],
      [],
    ),
    s(
      "glossario",
      "Vocabulário",
      "Glossario essencial",
      "Consolide os termos que organizam uma investigacao de latencia HTTP em Go orientada por distribuicao e bound.",
      undefined,
      "glossary",
      ["Esses conceitos reaparecem em SLOs, pprof, runtime, pools, filas e revisoes de operacao."],
      [],
    ),
  ],
  summaryCards: [
    {
      title: "Media nao substitui percentis",
      body: "A distribuicao importa porque o usuario e a operacao sentem especialmente a cauda.",
    },
    {
      title: "O request precisa ser decomposto",
      body: "Latencia monolitica esconde em que etapa o sofrimento realmente aparece.",
    },
    {
      title: "Bound vem antes do knob",
      body: "CPU, I/O, lock e GC pedem perguntas, perfis e patches diferentes.",
    },
    {
      title: "Instrumentacao tambem e produto",
      body: "Sem metricas acionaveis, o time reage com supersticao e ajustes simultaneos demais.",
    },
    {
      title: "Patch pequeno ensina mais",
      body: "Mudancas atribuiveis aceleram aprendizado e reduzem risco de regressao escondida.",
    },
    {
      title: "Verificacao precisa mirar o mesmo alvo",
      body: "O p99 relevante, a rota relevante e os efeitos laterais relevantes precisam ser reavaliados juntos.",
    },
  ],
  quiz: [
    q(
      "q1",
      "Por que um servidor pode parecer bem na media e mal no p99?",
      "Porque uma minoria de requests pode sofrer bastante sem puxar a media o suficiente para denunciar a cauda.",
      "Porque percentis altos ignoram completamente o comportamento real do sistema.",
      "Porque media e p99 sempre andam juntos por definicao.",
      "a",
      "A distribuicao pode concentrar sofrimento em uma fatia pequena, mas operacionalmente importante, dos requests.",
    ),
    q(
      "q2",
      "Qual e a melhor primeira reacao ao ver p99 degradando?",
      "Melhorar a instrumentacao e decompor a latencia por rota, etapa e sinais que ajudem a localizar o bound.",
      "Trocar varios timeouts e tamanhos de pool de uma vez para ganhar rapidamente.",
      "Assumir que o handler principal precisa ser reescrito.",
      "a",
      "Antes de otimizar, e preciso separar a metrica ampla em partes mais explicativas.",
    ),
    q(
      "q3",
      "Qual combinacao combina melhor com suspeita de custo on-CPU?",
      "CPU profile, flame graph e leitura de hot paths dentro do request relevante.",
      "Apenas media global por servico e contagem de erros.",
      "Somente alterar GOGC e observar se algo melhora por acaso.",
      "a",
      "Quando o custo dominante e computacional, perfis on-CPU tendem a iluminar melhor a causa provavel.",
    ),
    q(
      "q4",
      "Se o p99 piora mas o processo nao parece quente na CPU, qual leitura inicial fica mais plausivel?",
      "Investigar espera por dependencia, lock, filas, reuse de conexao ou outras formas de custo fora do trabalho ativo de CPU.",
      "Concluir que nao existe problema real porque a CPU esta baixa.",
      "Trocar imediatamente a serializacao por um formato binario.",
      "a",
      "Latencia ruim com CPU modesta costuma apontar para espera e coordenação, nao apenas para calculo puro.",
    ),
    q(
      "q5",
      "Qual frase descreve melhor um bound de GC?",
      "E uma situacao em que churn de alocacao, heap e trabalho do coletor participam de forma relevante da variabilidade observada.",
      "E qualquer caso em que exista mais de uma goroutine por request.",
      "E sempre equivalente a lock contention.",
      "a",
      "GC conversa com alocacao e heap; ele nao deve ser reduzido a supersticoes sobre pausas isoladas.",
    ),
    q(
      "q6",
      "Por que ajustar muitos knobs na mesma release e perigoso?",
      "Porque melhora ou piora deixam de ser atribuiveis, dificultando aprender o que realmente afetou o p99.",
      "Porque o compilador Go proibe alteracoes simultaneas de configuracao.",
      "Porque percentis deixam de existir quando mais de um ajuste e feito.",
      "a",
      "Sem isolacao de variaveis, performance vira folclore tecnico em vez de engenharia repetivel.",
    ),
    q(
      "q7",
      "Qual e um bom criterio de verificacao depois do patch?",
      "Reavaliar a mesma rota ou classe de requests, com a mesma pergunta operacional, e observar tambem throughput, erro e efeitos laterais.",
      "Comparar apenas um benchmark local que ficou melhor, ainda que o trafego real nao tenha sido considerado.",
      "Medir outro endpoint qualquer para economizar tempo.",
      "a",
      "O resultado so e confiavel quando conversa com o alvo que motivou o trabalho.",
    ),
    q(
      "q8",
      "Quando um patch para p99 tende a ser mais promissor?",
      "Quando a forma da melhoria combina com o bound dominante identificado por metricas e perfis relevantes.",
      "Quando ele muda bastante o codigo e impressiona numa revisao superficial.",
      "Quando ele foi inspirado pela ultima vitoria da equipe, independentemente do perfil atual.",
      "a",
      "A ligacao entre mecanismo observado e tipo de intervencao e o que torna o patch plausivel e ensinavel.",
    ),
  ],
  glossary: [
    g("p50", "Mediana da distribuicao de latencia, usada como retrato do caso tipico."),
    g("p99", "Valor abaixo do qual ficam 99% das observacoes; os 1% restantes formam a cauda mais lenta."),
    g("Cauda de latencia", "Faixa mais lenta da distribuicao, onde variabilidade e degradacoes ficam mais evidentes."),
    g("SLO", "Objetivo de nivel de servico que define qualidade esperada para uma metrica relevante."),
    g("Bound dominante", "Recurso ou mecanismo que mais limita o avancar do request no cenario analisado."),
    g("CPU-bound", "Situacao em que trabalho ativo de CPU domina o custo relevante."),
    g("I/O-bound", "Situacao em que espera por rede, disco ou dependencia domina o custo relevante."),
    g("Lock contention", "Disputa entre goroutines por estado ou regiao critica compartilhada."),
    g("GC", "Garbage collector do runtime Go, ligado ao custo de heap, alocacao e reciclarem de memoria."),
    g("Histogram", "Estrutura de metricas adequada para observar distribuicoes e estimar percentis."),
    g("Atribuibilidade", "Capacidade de relacionar melhora ou regressao a uma mudanca especifica."),
  ],
};
