import type { LessonContent } from "../../../types/content";

export const capstoneGoVsRustCriterioContent: LessonContent = {
  id: "capstone-go-vs-rust-criterio",
  title: "Capstone: Mesma Tarefa em Go e Rust",
  subtitle:
    "Aqui a comparação não é abstrata: a mesma carga de trabalho é colocada sob critérios explícitos de latência, memória, complexidade, operação e capacidade do time.",
  description:
    "Capstone avançada e balanced sobre comparar a mesma tarefa em Go e Rust. A aula usa um laboratório de decisão para avaliar o mesmo workload sob GC versus ownership, latência de cauda, footprint de memória, custo de implementação, tooling operacional e encaixe organizacional.",
  primaryCategoryId: "computacao",
  secondaryCategoryId: "engenharia",
  level: "Avançado",
  estimatedTime: "70-90 min",
  tags: [
    "Go",
    "Rust",
    "GC",
    "Ownership",
    "Latência",
    "Memória",
    "Operações",
    "Arquitetura",
  ],
  learningObjectives: [
    "Comparar duas implementações do mesmo workload sem cair em benchmarking de torcida.",
    "Definir critérios de decisão antes de olhar para a linguagem favorita do time.",
    "Explicar como GC e ownership mudam previsibilidade de latência, forma do uso de memória e desenho das APIs.",
    "Incluir complexidade de implementação, tooling e operação no custo total de propriedade.",
    "Reconhecer quando Go, Rust ou uma fronteira híbrida são respostas mais maduras.",
    "Invalidar conclusões iniciais quando a medição mostrar que o risco dominante estava em outro lugar.",
  ],
  prerequisites: [
    "Noções de profiling e observabilidade.",
    "Noções de concorrência, buffers e custo de alocação.",
    "Familiaridade básica com Go ou Rust ajuda, mas o foco aqui é o critério de engenharia.",
    "Recomendado: lessons anteriores sobre Go, Rust e metodologia de otimização.",
  ],
  references: [
    {
      title: "Diagnostics",
      source: "The Go Programming Language",
      url: "https://go.dev/doc/diagnostics",
      note: "Referência oficial para escolher ferramentas de profile e diagnóstico do lado Go.",
    },
    {
      title: "A Guide to the Go Garbage Collector",
      source: "The Go Programming Language",
      url: "https://go.dev/doc/gc-guide",
      note: "Base oficial para discutir custo, comportamento e leitura de impacto do GC em workloads reais.",
    },
    {
      title: "runtime/pprof",
      source: "Go Packages",
      url: "https://pkg.go.dev/runtime/pprof",
      note: "Mostra o caminho padrão para coletar perfis de CPU e memória em programas Go.",
    },
    {
      title: "net/http/pprof",
      source: "Go Packages",
      url: "https://pkg.go.dev/net/http/pprof",
      note: "Útil para falar de diagnóstico de processos vivos e custo operacional de observabilidade.",
    },
    {
      title: "Profiling Go Programs",
      source: "The Go Blog",
      url: "https://go.dev/blog/pprof",
      note: "Exemplo clássico de transformar profile em investigação concreta em Go.",
    },
    {
      title: "Understanding Ownership",
      source: "The Rust Programming Language",
      url: "https://doc.rust-lang.org/book/ch04-00-understanding-ownership.html",
      note: "Base para discutir o modelo sem GC tradicional e seu impacto em desenho de dados.",
    },
    {
      title: "Fearless Concurrency",
      source: "The Rust Programming Language",
      url: "https://doc.rust-lang.org/book/ch16-00-concurrency.html",
      note: "Ajuda a ancorar a conversa sobre concorrência segura em Rust.",
    },
    {
      title: "Ownership",
      source: "The Rustonomicon",
      url: "https://doc.rust-lang.org/nomicon/ownership.html",
      note: "Aprofunda implicações de aliasing, validade e contratos de posse em contextos exigentes.",
    },
    {
      title: "Optimizing Build Performance",
      source: "The Cargo Book",
      url: "https://doc.rust-lang.org/cargo/guide/build-performance.html",
      note: "Útil para lembrar que feedback loop e ciclo de build também entram no custo de engenharia.",
    },
  ],
  heroVisual: "lesson-hero",
  openingText:
    "Neste capstone vamos comparar a mesma tarefa em duas linguagens sem transformar a aula em campeonato. O workload-base será um serviço de ingestão de eventos que recebe payloads, parseia cabeçalhos, faz pequena validação, agrega metadados e encaminha o resultado para outra etapa. Ele não é ficção extravagante: é o tipo de caminho que mistura rede, parsing, concorrência, memória, filas e observabilidade. A pergunta da oficina é simples e difícil ao mesmo tempo: para esse mesmo trabalho, em que contexto Go tende a ser a escolha mais racional, em que contexto Rust passa a valer o custo extra e quando a resposta correta é dividir a fronteira em vez de forçar um vencedor único?",
  quickFacts: [
    {
      title: "Mesma carga, critérios explícitos",
      body: "A comparação só presta quando o workload e as metas ficam congelados antes da discussão.",
    },
    {
      title: "Latência sem contexto engana",
      body: "Média boa pode esconder cauda ruim; memória baixa pode esconder complexidade alta demais.",
    },
    {
      title: "Operação é parte da arquitetura",
      body: "Observabilidade, tempo de diagnóstico e rotina do time entram no custo real da linguagem.",
    },
    {
      title: "Híbrido é resposta séria",
      body: "Às vezes a melhor decisão é um núcleo crítico em uma linguagem e bordas de serviço em outra.",
    },
  ],
  sections: [
    s(
      "mesma-carga",
      "Laboratório",
      "A honestidade começa em congelar a mesma tarefa",
      "Go e Rust só podem ser comparados com justiça quando workload, metas e contexto operacional são mantidos constantes.",
      "lesson-hero",
      undefined,
      [
        "O experimento desta aula é um serviço de ingestão que recebe eventos por rede, parseia campos, valida regras simples, agrega metadados leves e encaminha a saída para outro estágio. O fluxo é propositalmente comum: não é um kernel, mas também não é uma planilha disfarçada de backend.",
        "Esse enquadramento evita comparações vazias. Não estamos perguntando se uma linguagem é 'mais rápida em geral'; estamos perguntando como duas filosofias diferentes lidam com o mesmo caminho de bytes, alocação, concorrência, erros e operação.",
        "A primeira regra do laboratório é não mexer na meta depois de ver a linguagem favorita performar melhor em um critério. Se a meta envolve latência previsível, memória estável, rapidez de entrega ou operação simples, isso precisa ser explicitado antes.",
      ],
      [
        {
          type: "definition",
          title: "Workload congelado",
          body: "Descrição funcional e operacional da tarefa que permanece constante durante a comparação, impedindo mudança oportunista de escopo.",
        },
        {
          type: "mistake",
          title: "Trocar a pergunta no meio",
          body: "Celebrar throughput em uma linguagem e ignorar que o problema real do sistema era cauda de latência, memória ou custo do time.",
        },
      ],
    ),
    s(
      "criterios-antes-da-linguagem",
      "Premissa",
      "A linguagem entra depois dos critérios",
      "Decisões maduras começam definindo o que conta como vitória para o sistema e para a organização.",
      "concept-grid",
      undefined,
      [
        "Para o mesmo workload, diferentes organizações podem chegar a respostas diferentes e, ainda assim, todas estarem corretas. Se a pressão dominante é entregar rápido com observabilidade muito prática, uma linguagem pode ganhar força. Se a pressão dominante é previsibilidade de memória e fronteira segura em caminho crítico, outra pode subir.",
        "É por isso que o laboratório usa seis critérios: latência, memória, complexidade de implementação, operação, modelo de memória e encaixe do time. Eles impedem que a escolha seja reduzida a benchmark sintético ou a gosto pessoal.",
        "Esses critérios também ajudam a declarar empate parcial. Uma linguagem pode ganhar em simplicidade de operação e perder em controle fino de alocação. O trabalho do arquiteto não é apagar a tensão, mas decidir qual tensão o sistema suporta melhor.",
      ],
      [
        {
          type: "example",
          title: "Critérios desta oficina",
          body: "A mesma tarefa será comparada com estes eixos de leitura.",
          items: [
            "Latência média e principalmente comportamento de cauda.",
            "Footprint de memória e forma de alocação ao longo do fluxo.",
            "Complexidade da implementação e superfície de erro.",
            "Ferramentas de diagnóstico e rotina de operação.",
            "Impacto de GC versus ownership no desenho do componente.",
            "Capacidade do time de manter, revisar e evoluir a solução.",
          ],
        },
        {
          type: "insight",
          title: "Critério é proteção contra fanboy",
          body: "Quando os eixos estão explicitados, fica mais difícil torcer por uma linguagem ignorando custos reais.",
        },
      ],
    ),
    s(
      "instrumentacao-comparavel",
      "Medição",
      "Sem instrumentação comparável, a comparação já nasce ruim",
      "A mesma carga precisa ser observada com ferramentas adequadas em cada ecossistema, mas com perguntas equivalentes.",
      "pipeline-diagram",
      "pipeline-lab",
      [
        "Comparar a mesma tarefa não significa usar as mesmas ferramentas, e sim fazer perguntas equivalentes. No lado Go, diagnostics, pprof e perfis de runtime ajudam a enxergar CPU, heap, block, mutex e efeitos do GC. No lado Rust, perfis, traces e inspeção de alocação ajudam a localizar churn, cópias e custo de layout.",
        "O perigo é comparar uma implementação profundamente observada com outra quase opaca. Se um time olha para heap, block e traces em Go, mas no Rust se contenta com tempos finais de benchmark, ou vice-versa, a discussão perde seriedade.",
        "Instrumentar de forma comparável também significa medir o sistema sob carga parecida, com o mesmo contrato de entrada, mesmas hipóteses de erro e mesmas restrições operacionais. A linguagem só começa a entrar no debate depois disso.",
      ],
      [
        {
          type: "definition",
          title: "Instrumentação comparável",
          body: "Conjunto de observações que responde às mesmas perguntas de engenharia em cada implementação, mesmo que use ferramentas diferentes.",
        },
        {
          type: "mistake",
          title: "Comparar números sem anatomia",
          body: "Olhar apenas para o tempo final e ignorar onde CPU, alocação, bloqueio e cauda realmente nasceram em cada runtime.",
        },
      ],
    ),
    s(
      "latencia-e-cauda",
      "Critério 1",
      "Latência precisa ser lida como distribuição, não só como média",
      "Para a mesma tarefa, Go e Rust podem parecer parecidos no centro e muito diferentes nas bordas da distribuição.",
      "impact-board",
      undefined,
      [
        "Em um serviço de ingestão, a média muitas vezes conta só metade da história. O usuário ou o sistema seguinte sofre mais com a cauda: pausas ocasionais, bursts, retenção momentânea, disputa por recurso e trabalho acumulado em pontos específicos da pipeline.",
        "Go oferece um runtime maduro, scheduler forte e ferramentas muito práticas para examinar o processo vivo. Isso é excelente para entender o sistema em produção. Ao mesmo tempo, o modelo com GC pode introduzir comportamentos que precisam caber no orçamento de latência do workload.",
        "Rust, por outro lado, elimina o GC do caminho central e pode favorecer maior previsibilidade em componentes sensíveis, mas essa previsibilidade não vem de graça: ela cobra mais desenho de ownership, mais cuidado com alocação e maior exigência de modelagem na implementação.",
      ],
      [
        {
          type: "insight",
          title: "Cauda é comportamento sistêmico",
          body: "Ela depende de runtime, alocação, filas, locks, scheduling e desenho de fronteiras, não apenas da velocidade de uma função isolada.",
        },
        {
          type: "mistake",
          title: "Ler p99 como slogan",
          body: "Falar de cauda sem examinar bloqueio, fila, GC, cópia e contenção reduz a comparação a folclore técnico.",
        },
      ],
    ),
    s(
      "memoria-e-alocacao",
      "Critério 2",
      "Memória não é só quantidade; é forma de uso ao longo do fluxo",
      "O mesmo workload pode ficar saudável ou frágil dependendo de como cada implementação aloca, retém e recicla objetos e buffers.",
      "tradeoff-spectrum",
      "tradeoff-lab",
      [
        "No lado Go, a ergonomia de alocar e deixar o runtime organizar a memória acelera bastante o desenvolvimento e simplifica muitas bordas. O custo de engenharia cai cedo, mas o sistema passa a conviver com trade-offs de heap, churn de objetos e pressão sobre o GC que precisam ser observados.",
        "No lado Rust, ownership e tipos permitem desenhar buffers, borrows e estruturas com controle mais fino sobre duração e materialização. Isso pode conter churn e deixar o perfil de memória mais previsível, mas exige que o time pense explicitamente nessas decisões desde o início.",
        "A leitura madura aqui não é 'Go gasta mais' ou 'Rust sempre usa menos'. É perguntar: qual modelo encaixa melhor no padrão de alocação desta carga, e qual custo cognitivo ou operacional ele traz junto?",
      ],
      [
        {
          type: "definition",
          title: "Forma do uso de memória",
          body: "Padrão pelo qual a aplicação cria, retém, recicla e descarta objetos e buffers ao longo do workload.",
        },
        {
          type: "example",
          title: "Dois problemas bem diferentes",
          body: "Um serviço pode sofrer com churn de objetos pequenos em Go ou com retenção e fronteiras de ownership mal escolhidas em Rust.",
        },
      ],
    ),
    s(
      "complexidade-de-implementacao",
      "Critério 3",
      "A linguagem também escolhe onde a complexidade aparece",
      "Comparar o mesmo workload exige observar se o custo principal cai na escrita inicial, na revisão, no debug ou na operação.",
      "concept-grid",
      undefined,
      [
        "Go tende a oferecer um caminho muito direto para colocar serviços concorrentes, legíveis e operáveis de pé. O time costuma conseguir convergir rápido em padrões de código, diagnóstico e revisão. Isso é um ativo real em cargas de trabalho de backend e infraestrutura.",
        "Rust costuma cobrar mais logo na fase de modelagem. Ownership, borrowing, lifetimes e fronteiras seguras empurram decisões difíceis para cedo. Em troca, parte relevante da ambiguidade desaparece antes de o binário ir para produção.",
        "Na mesma tarefa, portanto, a pergunta certa é: onde sua organização prefere pagar? Em menor atrito de implementação e operação, ou em mais exigência inicial para ganhar controle e garantia estrutural depois?",
      ],
      [
        {
          type: "insight",
          title: "Complexidade deslocada continua sendo complexidade",
          body: "Se o runtime simplifica agora, ele pode cobrar mais observação depois; se o compilador cobra cedo, ele pode aliviar incidentes mais tarde.",
        },
        {
          type: "mistake",
          title: "Chamar ergonomia de superficial",
          body: "Velocidade sustentada do time e capacidade de revisão são custos de engenharia tão reais quanto throughput.",
        },
      ],
    ),
    s(
      "operacao-e-diagnostico",
      "Critério 4",
      "Operação e diagnóstico fazem parte da decisão, não do pós-escolha",
      "Uma linguagem pode ganhar muito valor prático quando o time consegue enxergar e resolver problemas com menos atrito em produção.",
      "impact-board",
      undefined,
      [
        "Go tem uma vantagem cultural e ferramental muito forte em serviços: diagnostics, pprof, endpoints padrão e um repertório operacional conhecido por muitos times. Isso reduz tempo de resposta quando o problema real aparece num processo vivo, sob carga e com pressão de incidente.",
        "Rust também possui excelente ecossistema de profiling e observabilidade, mas a experiência operacional depende mais do stack adotado e da maturidade do time na leitura do binário e das ferramentas do ambiente. Em alguns contextos isso é perfeitamente aceitável; em outros, pesa bastante.",
        "O ponto importante é parar de tratar operação como detalhe de suporte. O esforço para reproduzir, medir, explicar e corrigir comportamento em produção muda o custo total da linguagem escolhida para o workload.",
      ],
      [
        {
          type: "example",
          title: "Pergunta operacional concreta",
          body: "Quando um processo sob carga piora, quão rápido o time consegue capturar um perfil útil, formar hipótese e testar correção com segurança?",
        },
        {
          type: "insight",
          title: "Diagnóstico reduz tempo de incerteza",
          body: "Tooling forte encurta a fase mais cara do incidente: o período em que ninguém sabe direito onde o problema nasce.",
        },
      ],
    ),
    s(
      "gc-vs-ownership",
      "Critério 5",
      "GC versus ownership precisa ser lido sem caricatura",
      "Os dois modelos trazem ganhos reais; a oficina quer descobrir qual deles combina melhor com o risco dominante do workload.",
      undefined,
      "scenario-lab",
      [
        "O GC do Go é uma solução poderosa para grande parte da engenharia de serviços. Ele simplifica o manejo cotidiano da memória, reduz certos tipos de erro manual e permite ao time focar cedo na lógica do sistema e na operação do processo. Isso tem valor concreto.",
        "Ownership em Rust não existe para vencer uma discussão ideológica contra GC. Ele existe para tornar explícito quem possui o quê, quando esse algo pode ser observado e em que ponto ele é descartado. Esse modelo pode ser extremamente valioso quando previsibilidade, controle e fronteiras seguras pesam mais do que a ergonomia inicial.",
        "A pergunta madura, então, não é qual filosofia é moralmente superior. É qual delas compra o tipo de clareza que o seu workload mais precisa: clareza operacional com runtime forte, ou clareza estrutural com contratos mais rígidos em compile time.",
      ],
      [
        {
          type: "definition",
          title: "Risco dominante",
          body: "Tipo de dor que mais ameaça o sistema: cauda de latência, footprint de memória, prazo, dificuldade de operação, bugs estruturais ou capacidade do time.",
        },
        {
          type: "mistake",
          title: "Transformar modelo de memória em identidade",
          body: "GC e ownership são ferramentas de engenharia; tratá-los como bandeira atrapalha a comparação do workload real.",
        },
      ],
    ),
    s(
      "time-e-manutencao",
      "Critério 6",
      "O melhor resultado técnico pode não ser o melhor resultado organizacional",
      "A decisão precisa incluir quem vai manter, revisar, depurar e evoluir a implementação pelos próximos ciclos.",
      "concept-grid",
      undefined,
      [
        "Uma implementação excelente em laboratório perde valor se só duas pessoas do time conseguem modificá-la com segurança. O mesmo vale ao contrário: uma escolha confortável demais pode ocultar um custo runtime que o sistema já não consegue mais suportar.",
        "No mesmo workload, Go costuma ganhar força quando a equipe é ampla, a operação precisa ser muito fluida e o tipo de concorrência é fortemente orientado a serviços, requests e jobs. Rust sobe muito de valor quando o componente é sensível a recursos, bugs estruturais custam caro e o time aceita pagar mais modelagem cedo.",
        "Esse critério também orienta estratégia híbrida. Em vez de exigir que todo o sistema siga uma única linguagem, pode ser mais maduro concentrar Rust onde ele reduz risco estrutural e usar Go onde ele multiplica a velocidade e a simplicidade do restante da plataforma.",
      ],
      [
        {
          type: "insight",
          title: "Organização também tem hot path",
          body: "Revisão, onboarding, incidentes e evolução cotidiana formam o caminho quente humano do sistema.",
        },
        {
          type: "example",
          title: "Resposta híbrida",
          body: "Núcleo de parsing ou componente crítico em Rust; bordas de orquestração, jobs e serviço em Go.",
        },
      ],
    ),
    s(
      "decisao-por-fronteira",
      "Síntese",
      "A resposta certa às vezes não escolhe um vencedor, e sim uma fronteira",
      "Quando critérios conflitantes aparecem, dividir o problema por módulo pode ser melhor do que forçar homogeneidade.",
      "pipeline-diagram",
      undefined,
      [
        "Em muitos sistemas, a parte que realmente sofre com memória, cauda ou fronteira segura é menor do que a aplicação inteira. Se você tratar a decisão de linguagem como decisão por domínio e fronteira, em vez de identidade total, aparece uma alternativa muito mais madura.",
        "O núcleo que parseia, valida formatos difíceis ou lida com recurso apertado pode merecer Rust. Já as camadas de integração, controle, operação e serviço podem se beneficiar mais da velocidade e da ergonomia operacional de Go.",
        "Isso não é falta de coragem arquitetural; é justamente o contrário. É admitir que um sistema pode carregar tensões diferentes em módulos diferentes e que a engenharia boa sabe desenhar interfaces para isso.",
      ],
      [
        {
          type: "definition",
          title: "Fronteira híbrida",
          body: "Separação deliberada entre componentes com riscos diferentes, permitindo que linguagens distintas sejam usadas com contrato claro.",
        },
        {
          type: "insight",
          title: "Interface vale mais do que marketing",
          body: "Arquitetura híbrida funciona quando a borda entre os módulos é pequena, observável e estável.",
        },
      ],
    ),
    s(
      "invalidar-a-primeira-resposta",
      "Verificação",
      "Capstone maduro termina testando a própria conclusão",
      "Depois de escolher, volte e tente provar que você pode estar errado: foi o runtime, a alocação, a fila, a API ou o time que realmente decidiram o jogo?",
      "impact-board",
      undefined,
      [
        "Toda conclusão boa nesta oficina deve sobreviver a uma tentativa séria de invalidação. Talvez o argumento pró-Rust estivesse apoiado em um parser quente, mas o processo real perca muito mais tempo esperando I/O, rede e serviço externo. Talvez o argumento pró-Go ignore um núcleo que já estourou a previsibilidade de memória que o sistema precisa.",
        "Essa etapa evita decisões míticas. Em vez de dizer 'Rust é melhor para performance' ou 'Go é melhor para backend', você formula algo como: 'neste workload, com esta equipe e estas metas, Go reduz melhor o custo total' — ou o oposto — e consegue explicar por quê.",
        "No fim, a aula quer formar critério transferível. O aluno não sai com um vencedor universal; sai com uma disciplina para comparar filosofias diferentes sem virar refém de identidade técnica.",
      ],
      [
        {
          type: "example",
          title: "Perguntas para invalidar a escolha",
          body: "Antes de encerrar a decisão, teste se ela continua em pé sob estas dúvidas.",
          items: [
            "O risco dominante é mesmo runtime e memória, ou era observabilidade e tempo de entrega?",
            "O hotspot crítico representa o sistema todo ou só um submódulo pequeno?",
            "O time consegue operar e revisar a solução escolhida em ritmo sustentável?",
            "Uma fronteira híbrida resolveria melhor a tensão do que uma escolha total?",
          ],
        },
        {
          type: "mistake",
          title: "Declarar vitória por identidade",
          body: "Se a justificativa final cabe num slogan, provavelmente a comparação ainda não ficou madura.",
        },
      ],
    ),
    s(
      "quiz-revisao",
      "Revisão",
      "Quiz de revisão",
      "Use o quiz para verificar se os critérios estão amarrados como sistema de decisão, e não como lista solta de argumentos.",
      undefined,
      "quiz",
      [
        "A meta é decidir por contexto, risco dominante e fronteira de sistema, sem evangelismo.",
      ],
      [],
    ),
    s(
      "glossario",
      "Vocabulário",
      "Glossário essencial",
      "Consolide os termos que aparecem o tempo todo quando a comparação deixa de ser emocional e vira engenharia.",
      undefined,
      "glossary",
      [
        "Esses conceitos ajudam a discutir runtime, memória, latência e time com mais precisão.",
      ],
      [],
    ),
  ],
  summaryCards: [
    {
      title: "Congele a mesma tarefa",
      body: "A comparação só é honesta quando workload e metas permanecem constantes.",
    },
    {
      title: "Critério vem antes da linguagem",
      body: "Latência, memória, complexidade, ops, modelo de memória e time devem guiar a escolha.",
    },
    {
      title: "Instrumentação comparável é obrigatória",
      body: "Ferramentas podem mudar entre ecossistemas, mas as perguntas precisam ser equivalentes.",
    },
    {
      title: "GC e ownership compram clarezas diferentes",
      body: "Um modelo favorece ergonomia operacional; o outro favorece contratos explícitos e controle fino.",
    },
    {
      title: "Equipe faz parte do benchmark",
      body: "Velocidade de revisão, debug e manutenção pesa no resultado tanto quanto o binário.",
    },
    {
      title: "Híbrido é decisão legítima",
      body: "Às vezes o melhor desenho separa núcleo crítico e camadas de serviço por fronteira.",
    },
  ],
  comparisonRows: [
    {
      topic: "Latência de cauda",
      newton:
        "Go: forte em serviço operável e diagnóstico rápido, mas a leitura do GC e do runtime precisa caber no SLA do workload.",
      leibniz:
        "Rust: tende a favorecer mais previsibilidade no caminho crítico sem GC central, ao custo de desenho mais exigente.",
    },
    {
      topic: "Memória e alocação",
      newton:
        "Go: ergonomia alta para alocar e iterar rápido, exigindo atenção contínua a churn, heap e pressão de GC.",
      leibniz:
        "Rust: mais controle explícito sobre materialização, buffers e durações, cobrando mais decisão cedo.",
    },
    {
      topic: "Complexidade de implementação",
      newton:
        "Go: costuma reduzir atrito inicial e padronizar rápido a produção de serviços concorrentes.",
      leibniz:
        "Rust: desloca mais complexidade para compile time e modelagem de ownership, mas reduz ambiguidades estruturais depois.",
    },
    {
      topic: "Operação e observabilidade",
      newton:
        "Go: diagnostics e pprof tornam investigação de processos vivos especialmente prática em muitos times.",
      leibniz:
        "Rust: excelente desempenho e boa observabilidade possível, porém mais dependente do stack e da maturidade operacional adotados.",
    },
    {
      topic: "Decisão organizacional",
      newton:
        "Go: encaixa muito bem quando produtividade, simplicidade operacional e equipes amplas são dominantes.",
      leibniz:
        "Rust: ganha força quando o componente é crítico em memória, integridade e previsibilidade, e o time aceita pagar mais modelagem.",
    },
  ],
  quiz: [
    q(
      "q1",
      "Qual é a primeira condição para comparar a mesma tarefa em Go e Rust com honestidade?",
      "Congelar workload, metas e contexto operacional antes da linguagem entrar na conversa.",
      "Olhar primeiro para benchmarks sintéticos e depois escolher a tarefa que combina com o resultado.",
      "Assumir que a linguagem mais nova merece o benefício da dúvida.",
      "a",
      "Sem workload e critérios estáveis, a comparação vira ajuste oportunista de narrativa.",
    ),
    q(
      "q2",
      "Se o serviço é fortemente I/O-bound, a equipe é grande e a prioridade dominante é velocidade sustentável de entrega e operação, qual tendência inicial costuma ser mais racional?",
      "Começar a avaliação com forte atenção a Go, sem descartar que algum submódulo crítico possa merecer Rust.",
      "Forçar Rust para tudo, porque linguagem sem GC é sempre mais séria.",
      "Evitar qualquer medição, porque o caso já está decidido por definição.",
      "a",
      "Nessa combinação, ergonomia operacional e velocidade de time tendem a pesar bastante, embora a medição continue necessária.",
    ),
    q(
      "q3",
      "Qual leitura é mais madura sobre latência nesta oficina?",
      "A média sozinha é insuficiente; é preciso entender também a distribuição, a cauda e os mecanismos que a produzem.",
      "Se a média é boa, a linguagem venceu no critério de latência.",
      "Latência é irrelevante se a memória parecer estável.",
      "a",
      "O sistema sofre com a distribuição completa, especialmente em filas, bursts, bloqueios e pausas ocasionais.",
    ),
    q(
      "q4",
      "Quando o argumento pró-Rust costuma ganhar força real no mesmo workload?",
      "Quando previsibilidade de memória, controle fino e fronteiras seguras do caminho crítico valem mais do que o atrito extra de implementação.",
      "Sempre que o time quiser parecer tecnicamente mais sofisticado.",
      "Quando o sistema só faz integrações simples e jobs rotineiros.",
      "a",
      "Rust brilha mais quando o componente realmente sente o valor dessas garantias estruturais.",
    ),
    q(
      "q5",
      "Por que tooling operacional entra no custo total da linguagem?",
      "Porque reproduzir, perfilar e explicar problemas em produção muda diretamente tempo de incidente e velocidade de correção.",
      "Porque observabilidade é um tema separado da arquitetura.",
      "Porque só benchmarks offline importam na escolha séria.",
      "a",
      "A rotina de diagnóstico é parte integrante da engenharia de sistemas, não um acessório pós-escolha.",
    ),
    q(
      "q6",
      "Qual frase descreve melhor GC versus ownership de forma balanced?",
      "São modelos que compram clarezas diferentes; a decisão depende do risco dominante e não de identidade técnica.",
      "Ownership sempre vence, porque GC é sinal de linguagem menos eficiente.",
      "GC sempre vence, porque compile time não deveria influenciar arquitetura.",
      "a",
      "A aula rejeita caricaturas e trata ambos como instrumentos para perfis de risco distintos.",
    ),
    q(
      "q7",
      "Quando uma arquitetura híbrida costuma ser uma resposta madura?",
      "Quando um submódulo concentra os requisitos críticos de memória ou previsibilidade, mas o restante do sistema se beneficia mais de simplicidade operacional.",
      "Somente quando o time não conseguiu escolher um vencedor por falta de opinião.",
      "Nunca; usar mais de uma linguagem é sempre sinal de projeto mal planejado.",
      "a",
      "Separar por fronteiras bem definidas pode capturar o melhor de cada lado sem impor custo total desnecessário.",
    ),
    q(
      "q8",
      "O que significa invalidar a primeira conclusão neste capstone?",
      "Voltar à hipótese e testar se o risco dominante era realmente o que parecia, ou se outro critério estava decidindo mais do que a linguagem em si.",
      "Trocar de linguagem ao acaso para parecer imparcial.",
      "Descartar qualquer decisão que não gere unanimidade imediata.",
      "a",
      "A invalidação protege contra decisões baseadas em narrativa sedutora, mas mal conectada ao comportamento real do workload.",
    ),
  ],
  glossary: [
    g("Workload", "Conjunto de tarefas, entradas, restrições e metas que definem o comportamento real comparado entre implementações."),
    g("Latência de cauda", "Comportamento das requisições mais lentas da distribuição, frequentemente mais importante que a média."),
    g("GC", "Garbage collector que recicla memória automaticamente em tempo de execução."),
    g("Ownership", "Modelo de posse explícita de dados que orienta validade, descarte e fronteiras de acesso em Rust."),
    g("pprof", "Ferramenta e formato usados no ecossistema Go para analisar perfis de CPU, heap e outros aspectos do runtime."),
    g("Diagnostics", "Guia oficial do Go para escolher ferramentas de observação e investigação de problemas."),
    g("Footprint de memória", "Pegada de memória efetivamente sustentada pelo processo sob determinada carga."),
    g("Churn de alocação", "Criação e descarte frequentes de objetos e buffers ao longo do workload."),
    g("Fronteira híbrida", "Divisão intencional entre módulos com exigências diferentes, permitindo mais de uma linguagem no sistema."),
    g("Custo total de engenharia", "Soma de implementação, revisão, build, operação, observabilidade e manutenção ao longo do tempo."),
    g("Previsibilidade runtime", "Capacidade de antecipar o comportamento do sistema sob carga, especialmente em latência e memória."),
    g("Risco dominante", "Dor principal que a decisão precisa reduzir: prazo, operação, memória, latência, bugs estruturais ou outra."),
  ],
};

function s(
  id: string,
  eyebrow: string,
  title: string,
  lead: string,
  visual: string | undefined,
  interactive: string | undefined,
  paragraphs: string[],
  blocks: LessonContent["sections"][number]["blocks"],
) {
  return { id, eyebrow, title, lead, visual, interactive, paragraphs, blocks };
}

function q(
  id: string,
  prompt: string,
  a: string,
  b: string,
  c: string,
  correctOptionId: string,
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
