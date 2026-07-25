import type { LessonContent, LessonModule, LessonReference } from "../../../types/content";
import {
  createComputacaoInteractions,
  createComputacaoVisuals,
  type InteractionFactoryConfig,
  type VisualFactoryConfig,
} from "../_shared/factories";

type WaveL1LessonId =
  | "performance-mental-model"
  | "medir-antes-de-otimizar"
  | "cpu-bound-io-bound-memory-bound"
  | "latencia-vs-throughput"
  | "ampdal-e-limites-do-paralelismo"
  | "custo-de-abstracoes"
  | "flamegraphs-e-profiling"
  | "benchmarking-honesto";

interface WaveL1VisualIds {
  hero: string;
  concept: string;
  pipeline: string;
  tradeoff: string;
  impact: string;
}

interface WaveL1InteractionIds {
  pipeline: string;
  tradeoff: string;
  scenario: string;
}

interface WaveL1LessonDefinition {
  content: LessonContent;
  visualConfig: VisualFactoryConfig;
  interactionConfig: InteractionFactoryConfig;
  visualIds: WaveL1VisualIds;
  interactionIds: WaveL1InteractionIds;
}

const library = {
  greggSystemsPerformance: {
    title: "Systems Performance: Enterprise and the Cloud",
    source: "Brendan Gregg",
    url: "https://www.brendangregg.com/systems-performance-2nd-edition-book.html",
    note:
      "Referência ampla para gargalos de CPU, memória, I/O, filas, saturação e metodologia de análise de performance.",
  },
  greggFlamegraphs: {
    title: "Flame Graphs",
    source: "Brendan Gregg",
    url: "https://www.brendangregg.com/flamegraphs.html",
    note:
      "Página oficial do criador dos flame graphs, com definição, interpretação visual e formas de geração.",
  },
  greggCpuFlamegraphs: {
    title: "CPU Flame Graphs",
    source: "Brendan Gregg",
    url: "https://www.brendangregg.com/FlameGraphs/cpuflamegraphs.html",
    note:
      "Mostra o uso de amostragem com stack traces para entender consumo on-CPU e transformar perfis em flame graphs.",
  },
  sreMonitoring: {
    title: "Monitoring Distributed Systems",
    source: "Google SRE Book",
    url: "https://sre.google/sre-book/monitoring-distributed-systems/",
    note:
      "Capítulo clássico sobre sinais dourados, percentis, correlação temporal e métricas úteis para sistemas reais.",
  },
  sreSlo: {
    title: "Service Level Objectives",
    source: "Google SRE Book",
    url: "https://sre.google/sre-book/service-level-objectives/",
    note:
      "Base sólida para distinguir métricas internas de indicadores que realmente representam a experiência do usuário.",
  },
  perfWiki: {
    title: "perf: Linux profiling with performance counters",
    source: "perf wiki",
    url: "https://perfwiki.github.io/main/",
    note:
      "Documentação introdutória do ecossistema perf, cobrindo perf stat, record, report e sampling com baixo overhead.",
  },
  perfMan: {
    title: "perf(1) - Linux manual page",
    source: "man7.org / Linux man-pages",
    url: "https://www.man7.org/linux/man-pages/man1/perf.1.html",
    note:
      "Manual consolidado das subcommands e do posicionamento do perf como suíte de análise de performance do Linux.",
  },
  goPprofBlog: {
    title: "Profiling Go Programs",
    source: "The Go Blog",
    url: "https://go.dev/blog/pprof",
    note:
      "Guia oficial do ecossistema Go para usar pprof e transformar perfis em mudanças concretas no programa.",
  },
  goDiagnostics: {
    title: "Diagnostics",
    source: "Go Documentation",
    url: "https://go.dev/doc/diagnostics",
    note:
      "Resumo oficial das ferramentas de diagnóstico de Go, incluindo profiling, traces e cuidados de uso em produção.",
  },
  runtimePprof: {
    title: "runtime/pprof",
    source: "Go Packages",
    url: "https://pkg.go.dev/runtime/pprof",
    note:
      "Documentação oficial do formato de profiling do runtime e dos fluxos de coleta via go test ou endpoints HTTP.",
  },
  goTesting: {
    title: "testing",
    source: "Go Packages",
    url: "https://pkg.go.dev/testing@latest",
    note:
      "Documentação oficial de benchmarks em Go, incluindo formas de execução, RunParallel e referência a benchstat.",
  },
  criterionAnalysis: {
    title: "Analysis Process",
    source: "Criterion.rs Documentation",
    url: "https://bheisler.github.io/criterion.rs/book/analysis.html",
    note:
      "Explica warmup, measurement, análise estatística e comparação entre execuções em benchmarks Rust.",
  },
  criterionOutput: {
    title: "Command-Line Output",
    source: "Criterion.rs Documentation",
    url: "https://criterion-rs.github.io/book/user_guide/command_line_output.html",
    note:
      "Detalha como interpretar intervalos de confiança, ruído, outliers e consistência de workload no Criterion.",
  },
  rustIteratorsPerformance: {
    title: "Performance of Loops vs. Iterators",
    source: "The Rust Programming Language",
    url: "https://doc.rust-lang.org/book/ch13-04-performance.html",
    note:
      "Referência oficial sobre zero-cost abstractions em iterators e por que release builds importam na análise.",
  },
  rustBlackBox: {
    title: "std::hint::black_box",
    source: "Rust Standard Library",
    url: "https://doc.rust-lang.org/std/hint/fn.black_box.html",
    note:
      "Documentação oficial sobre bloquear otimizações indevidas que fariam um benchmark medir menos trabalho do que parece.",
  },
  mitQueueing: {
    title: "Queuing Models",
    source: "MIT 1.041 / Queueing Theory Notes",
    url: "https://web.mit.edu/1.041/spring2023/lectures/L8-queuing-models-2023sp.pdf",
    note:
      "Notas de teoria de filas com Little's Law e intuições úteis para ligar throughput, ocupação e tempo de resposta.",
  },
  brownAmdahl: {
    title: "Amdahl's Law",
    source: "Brown University",
    url: "https://cs.brown.edu/courses/cs176/handouts/amdahl.pdf",
    note:
      "Derivação didática da fórmula de Amdahl em termos de tempo original, fração paralelizável e número de processadores.",
  },
  openCsfScaling: {
    title: "Limits of Parallelism and Scaling",
    source: "Computer Systems Fundamentals",
    url: "https://opencsf.org/Books/csf/html/Scaling.html",
    note:
      "Material educacional aberto que contextualiza strong scaling, speedup e interpretação operacional de Amdahl.",
  },
  csapp: {
    title: "Computer Systems: A Programmer's Perspective",
    source: "Bryant e O'Hallaron",
    url: "https://csapp.cs.cmu.edu/",
    note:
      "Base excelente para conectar custo de abstrações, hardware, memória, chamada de função e observação de performance.",
  },
  drepperMemory: {
    title: "What Every Programmer Should Know About Memory",
    source: "Ulrich Drepper",
    url: "https://www.akkadia.org/drepper/cpumemory.pdf",
    note:
      "Texto clássico para entender quando o gargalo deixa de ser computação pura e vira alimentação da CPU com dados.",
  },
} satisfies Record<string, LessonReference>;

function refs(...keys: Array<keyof typeof library>) {
  return keys.map((key) => library[key]);
}

function assetIds(prefix: WaveL1LessonId) {
  return {
    visualIds: {
      hero: `${prefix}-hero`,
      concept: `${prefix}-concept-map`,
      pipeline: `${prefix}-pipeline-visual`,
      tradeoff: `${prefix}-tradeoff-visual`,
      impact: `${prefix}-impact-board`,
    },
    interactionIds: {
      pipeline: `${prefix}-pipeline-lab`,
      tradeoff: `${prefix}-tradeoff-lab`,
      scenario: `${prefix}-scenario-lab`,
    },
  } as const;
}

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

const performanceMentalModel = (() => {
  const { visualIds, interactionIds } = assetIds("performance-mental-model");

  return {
    visualIds,
    interactionIds,
    visualConfig: {
      title: "Modelo Mental de Performance",
      subtitle: "Orçamentos de CPU, memória, I/O e contenção",
      level: "Intermediário",
      tags: ["Gargalo", "Budget", "Saturação", "CPU", "I/O", "Memória"],
      conceptNodes: ["trabalho", "espera", "saturação", "trade-off"],
      pipelineSteps: [
        "entrada de demanda",
        "execução útil",
        "movimento de dados",
        "coordenação e filas",
      ],
      leftLabel: "folga operacional",
      rightLabel: "uso agressivo do recurso",
      impactRows: [
        { label: "CPU", value: "tempo on-CPU, instruções, branches, locks" },
        { label: "Memória", value: "localidade, misses, cópias, alocações" },
        { label: "I/O", value: "syscalls, disco, rede e serialização" },
        { label: "Filas", value: "espera acumulada entre etapas do sistema" },
      ],
    },
    interactionConfig: {
      title: "Modelo Mental de Performance",
      pipelineSteps: [
        {
          name: "Receber demanda",
          summary:
            "Toda análise começa entendendo o formato da demanda: bursts, constância, paralelismo e deadlines impostos pelo produto.",
          signal: "taxa de chegada e variabilidade",
          risk: "assumir carga estável quando ela chega em rajadas",
          takeaway:
            "Carga não é só quantidade; é o ritmo com que o sistema precisa absorver trabalho.",
        },
        {
          name: "Executar trabalho útil",
          summary:
            "Parte do tempo realmente transforma dados. Outra parte é gasto indireto de abstrações, serialização, parsing e coordenação.",
          signal: "tempo on-CPU e hotspots",
          risk: "otimizar código frio por parecer elegante",
          takeaway:
            "Nem todo ciclo de CPU entrega valor direto ao usuário; diferencie computação útil de overhead.",
        },
        {
          name: "Mover dados",
          summary:
            "Muitas rotas lentas não estão travadas por conta aritmética, mas por busca de dados na memória, disco ou rede.",
          signal: "stalls, cópias, throughput de I/O",
          risk: "ignorar locality e custo de copiar estruturas grandes",
          takeaway:
            "Performance costuma quebrar quando dados andam demais entre camadas.",
        },
        {
          name: "Esperar coordenação",
          summary:
            "Locks, filas, backpressure e limites externos introduzem espera mesmo quando o código local parece eficiente.",
          signal: "fila, bloqueio, saturação",
          risk: "ver CPU livre e concluir que está tudo folgado",
          takeaway:
            "Espera também é custo e muitas vezes é o custo dominante.",
        },
      ],
      leftLabel: "folga",
      rightLabel: "ocupação",
      tradeoffSummary:
        "Operar muito próximo do limite aumenta o risco de filas e piores percentis, mesmo quando a média ainda parece aceitável.",
      tradeoffRisks: [
        "Recurso caro ocioso pode indicar espaço para consolidar trabalho.",
        "Boa margem, mas talvez com custo operacional maior que o necessário.",
        "Você ganha eficiência média, porém fica mais sensível a rajadas.",
        "Pequenas variações de carga passam a produzir espera desproporcional.",
      ],
      practiceRule:
        "Trate performance como orçamento: qual recurso está sendo consumido, por qual etapa, e com qual folga restante.",
      scenarios: [
        {
          name: "API de baixa latência",
          situation:
            "Usuários interativos sentem cada request individualmente. Mesmo com throughput modesto, filas curtas e jitter importam muito.",
          choice:
            "Priorize caminho crítico curto, observação de percentis e redução de coordenação desnecessária.",
          why:
            "Nesse contexto, uma única etapa instável já contamina a percepção do sistema inteiro.",
          caution:
            "Não confunda CPU baixa com saúde: espera por disco, rede ou lock pode esconder o gargalo real.",
        },
        {
          name: "Pipeline batch",
          situation:
            "O objetivo principal é escoar muito trabalho ao longo do tempo sem explodir custo de máquina.",
          choice:
            "Olhe throughput sustentável, ocupação e custo por unidade processada.",
          why:
            "Aqui folga demais pode virar desperdício, desde que o SLA aceite maior latência individual.",
          caution:
            "Mesmo batch cria fila; se a taxa de entrada superar a de saída, o atraso final cresce continuamente.",
        },
        {
          name: "Serviço com dependências externas",
          situation:
            "Seu processo local parece rápido, mas chamadas a banco, cache remoto ou APIs terceiras controlam o tempo total.",
          choice:
            "Modele o sistema como soma de orçamentos e separe tempo local de tempo dependente.",
          why:
            "Assim você evita mexer no trecho errado quando a principal espera está fora do processo.",
          caution:
            "Sem separar fases, o time conclui que 'o serviço está lento' sem saber em qual camada o atraso nasce.",
        },
      ],
      tone: "indigo",
    },
    content: {
      id: "performance-mental-model",
      title: "Modelo Mental de Performance",
      subtitle:
        "Software rápido nasce menos de truques isolados e mais da habilidade de enxergar trabalho, espera, dados em movimento e recursos que saturam.",
      description:
        "Aula interativa sobre budgets de CPU, memória, I/O e coordenação; como pensar gargalos antes de abrir o profiler; e por que latência, filas e saturação precisam ser lidas como sistema.",
      primaryCategoryId: "computacao",
      secondaryCategoryId: "engenharia",
      level: "Intermediário",
      estimatedTime: "50-60 min",
      tags: [
        "Performance",
        "Gargalos",
        "Saturação",
        "Latency Budget",
        "Throughput",
        "Engenharia de Performance",
      ],
      learningObjectives: [
        "Modelar performance como orçamento de recursos em vez de um único número mágico.",
        "Distinguir trabalho útil, overhead e tempo de espera dentro de um sistema.",
        "Relacionar CPU, memória, I/O e contenção a sintomas operacionais concretos.",
        "Entender por que saturação e fila mudam drasticamente a percepção de latência.",
        "Escolher primeiras métricas de investigação com base em hipótese, não em impulso.",
        "Conectar performance a decisões de arquitetura e operação do sistema.",
      ],
      prerequisites: [
        "Como funciona uma CPU e a diferença entre calcular e esperar dados.",
        "Cache de CPU e memória principal como restrições físicas reais.",
        "Processos, threads e noção básica de syscalls e concorrência.",
      ],
      references: refs(
        "greggSystemsPerformance",
        "sreMonitoring",
        "perfWiki",
        "csapp",
        "drepperMemory",
      ),
      heroVisual: visualIds.hero,
      openingText:
        "Quando alguém diz que um sistema está lento, isso quase nunca significa uma única coisa. Pode ser CPU saturada, disco atrasando leituras, fila de requests crescendo, cópias demais entre camadas, lock disputado ou simplesmente uma combinação ruim desses fatores. O modelo mental de performance serve para impedir a reação infantil de 'vamos otimizar esse loop'. Antes de otimizar qualquer pedaço, você precisa enxergar qual orçamento está acabando e em qual ponto o trabalho vira espera.",
      quickFacts: [
        {
          title: "Gargalo é relacional",
          body: "Um mesmo código pode ser CPU-bound hoje e I/O-bound amanhã, dependendo da carga e do ambiente.",
        },
        {
          title: "Espera também custa",
          body: "Tempo sem executar instruções úteis ainda faz parte da experiência de latência do usuário.",
        },
        {
          title: "Saturação muda tudo",
          body: "Perto do limite, pequenas variações de demanda geram filas e piora desproporcional.",
        },
        {
          title: "Métrica isolada engana",
          body: "CPU média, sozinha, raramente conta a história completa de um sistema.",
        },
      ],
      sections: [
        s(
          "mapa-da-performance",
          "Mapa mental",
          "Performance e a arte de perguntar 'onde o tempo vai?'",
          "Antes de abrir ferramenta, vale decompor o sistema em etapas que trabalham, movem dados e esperam.",
          visualIds.concept,
          undefined,
          [
            "Performance não é sinônimo de 'rodar mais rápido' em sentido abstrato. O que nos interessa é como o tempo total de uma operação se distribui entre computação, acesso a dados, coordenação e espera por recursos externos.",
            "Esse enquadramento muda a conversa. Em vez de culpar genericamente o código, você passa a perguntar qual parte do caminho crítico consome orçamento demais e em que forma esse consumo aparece: CPU, memória, I/O ou fila.",
          ],
          [
            {
              type: "definition",
              title: "Budget de performance",
              body: "Quantidade de tempo, ocupação ou largura de banda que uma etapa pode gastar antes de comprometer o objetivo do sistema.",
            },
          ],
        ),
        s(
          "fluxo-de-recursos",
          "Fluxo",
          "Um sistema sempre transforma entrada em saída atravessando recursos",
          "Pensar em etapas e handoffs ajuda a localizar o custo em vez de tratá-lo como névoa.",
          visualIds.pipeline,
          interactionIds.pipeline,
          [
            "Quase todo serviço real recebe demanda, executa lógica, move dados e coordena múltiplas partes. Mesmo que o código pareça um único endpoint, por baixo há serialização, parsing, chamadas de rede, acesso a cache, filas internas e sincronização.",
            "O objetivo do modelo mental é transformar isso em um fluxo observável. Cada transição entre etapas pode adicionar espera, e cada etapa pode saturar um recurso diferente.",
          ],
          [
            {
              type: "insight",
              title: "Fluxo bom explicita handoffs",
              body: "Toda vez que o trabalho troca de camada, thread, processo ou máquina, há oportunidade para aparecer latência invisível.",
            },
          ],
        ),
        s(
          "trabalho-vs-espera",
          "Distinção",
          "Nem todo tempo de resposta é trabalho útil",
          "O usuário sente o total; o engenheiro precisa separar produção de valor e custo de coordenação.",
          undefined,
          undefined,
          [
            "Do ponto de vista do request, pouco importa se a demora veio de CPU, lock ou disco: o relógio continua correndo. Do ponto de vista do diagnóstico, porém, essa diferença é tudo. Um sistema pode estar devagar mesmo executando pouco trabalho útil.",
            "Essa é uma razão central para estudar stacks, filas, perfis e métricas de resource saturation. Sem esse recorte, times passam semanas polindo trechos que quase não participam do tempo final.",
          ],
          [
            {
              type: "mistake",
              title: "Confundir atividade com produtividade",
              body: "Muito movimento interno, logs, serialização ou coordenação podem fazer a máquina trabalhar sem entregar ganho proporcional ao usuário.",
            },
          ],
        ),
        s(
          "folga-e-saturacao",
          "Trade-off",
          "Folga operacional costuma comprar previsibilidade",
          "A mesma taxa média pode produzir experiências muito diferentes dependendo da proximidade do limite.",
          visualIds.tradeoff,
          interactionIds.tradeoff,
          [
            "Quando um recurso opera com margem, o sistema absorve bursts e variabilidade com mais serenidade. Quando opera no talo, qualquer desvio vira fila. Por isso throughput médio aceitável não garante percentis bons.",
            "Em engenharia real, o jogo é escolher onde vale operar com folga e onde vale espremer eficiência. Não existe resposta universal; existe decisão alinhada ao tipo de produto.",
          ],
          [
            {
              type: "example",
              title: "API interativa vs batch noturno",
              body: "O primeiro costuma pagar mais por previsibilidade de latência; o segundo aceita esperar mais para usar melhor a máquina.",
            },
          ],
        ),
        s(
          "sinais-praticos",
          "Observação",
          "Sinais práticos que denunciam o tipo de pressão no sistema",
          "CPU alta, memória pressionada, I/O lento e locks disputados deixam pistas diferentes.",
          visualIds.impact,
          undefined,
          [
            "Tempo on-CPU aponta que há execução quente. Crescimento de alocações ou stalls de memória sugerem custo de movimentação e locality ruim. Syscalls lentas, filas de disco ou rede saturada empurram o sistema para o lado I/O-bound.",
            "O ponto não é decorar ferramentas, mas aprender a ler os sinais como sintomas de um orçamento que está estourando. Esse hábito organiza a investigação antes mesmo da etapa de profiling detalhado.",
          ],
          [
            {
              type: "insight",
              title: "Sintoma não é solução",
              body: "CPU alta não significa automaticamente paralelizar; fila alta não significa automaticamente aumentar réplicas. O sinal precisa ser interpretado no contexto do fluxo.",
            },
          ],
        ),
        s(
          "primeira-hipotese",
          "Decisão",
          "A primeira pergunta de diagnóstico vale mais que a primeira otimização",
          "A missão inicial é formular uma hipótese grosseira, porém útil, sobre o recurso dominante.",
          undefined,
          interactionIds.scenario,
          [
            "Se você suspeita que a demora está no banco, meça a fatia de tempo gasta em chamadas externas. Se suspeita de CPU, procure hotspots on-CPU. Se suspeita de memória, observe alocação, locality e cópias. Cada hipótese sugere um conjunto diferente de instrumentos.",
            "Essa disciplina é um filtro contra teatro de performance: mudanças bonitas, mas desconectadas do custo dominante real.",
          ],
          [
            {
              type: "definition",
              title: "Hipótese operacional",
              body: "Explicação testável e provisória sobre o motivo principal de um custo observável no sistema.",
            },
          ],
        ),
        s(
          "ligacao-com-pre-requisitos",
          "Conexão",
          "CPU, cache, memória virtual e syscalls continuam no quadro",
          "O modelo mental de performance não substitui os fundamentos: ele organiza quando cada fundamento importa mais.",
          visualIds.concept,
          undefined,
          [
            "Se você estudou cache, já sabe que custo de memória não é uniforme. Se estudou syscalls, já sabe que cruzar o kernel tem preço. Se estudou concorrência, já sabe que coordenação e contenção podem transformar paralelismo em fila.",
            "Esta aula apenas costura esses fundamentos em uma lente unificada: sempre pergunte qual mecanismo físico ou de runtime está sendo tensionado pelo workload atual.",
          ],
          [
            {
              type: "example",
              title: "Dois O(n), comportamentos diferentes",
              body: "Um laço pode ser lento por cálculo; outro, por cache ruim, alocação excessiva ou dependência externa. A ordem assintótica não resolve isso sozinha.",
            },
          ],
        ),
        s(
          "checklist-mental",
          "Síntese",
          "Checklist mental para entrar em qualquer investigação",
          "Toda vez que ouvir 'está lento', tente nomear demanda, gargalo provável, sinal disponível e risco de fila.",
          visualIds.impact,
          undefined,
          [
            "Que tipo de workload é esse? O usuário se importa mais com latência individual ou com volume processado? Qual recurso parece mais pressionado? Qual medição pode separar tempo útil de tempo de espera? Essas perguntas organizam a busca.",
            "O ganho desse checklist não é acertar sempre de primeira, e sim errar de forma barata, orientada e mensurável.",
          ],
          [
            {
              type: "insight",
              title: "Bom modelo mental encurta iteração",
              body: "Quanto melhor você formula a hipótese, mais rápido descobre se deve insistir, descartar ou redirecionar a investigação.",
            },
          ],
        ),
        s(
          "quiz-revisao",
          "Revisão",
          "Quiz de revisão",
          "Verifique se o mapa de budgets, espera e saturação ficou claro.",
          undefined,
          "quiz",
          ["A meta não é decorar nomes, mas aprender a enquadrar sintomas de forma operacional."],
          [],
        ),
        s(
          "glossario",
          "Glossário",
          "Termos essenciais",
          "Feche a aula consolidando o vocabulário de investigação de performance.",
          undefined,
          "glossary",
          ["Esses termos retornam em profiling, benchmarking, caches, concorrência e produção."],
          [],
        ),
      ],
      summaryCards: [
        {
          title: "Performance é fluxo",
          body: "O tempo final mistura computação, movimento de dados e espera por coordenação.",
        },
        {
          title: "Budget importa mais que palpite",
          body: "Cada sistema quebra primeiro em algum recurso dominante.",
        },
        {
          title: "Saturação produz filas",
          body: "Perto do limite, pequenos bursts geram degradação desproporcional.",
        },
        {
          title: "Métricas precisam de hipótese",
          body: "A leitura correta depende da pergunta certa sobre o gargalo provável.",
        },
        {
          title: "Fundamentos continuam valendo",
          body: "CPU, cache, syscalls e locks reaparecem sob a lente de budgets e sintomas.",
        },
        {
          title: "Modelo mental economiza tempo",
          body: "Ele evita otimização teatral e encurta o ciclo de diagnóstico.",
        },
      ],
      quiz: [
        q(
          "q1",
          "O que o modelo mental de performance tenta evitar primeiro?",
          "Otimizar no escuro antes de entender qual recurso está pressionado.",
          "Medir o sistema em produção.",
          "Separar trabalho útil de espera.",
          "a",
          "Sem hipótese sobre o budget dominante, a otimização vira tentativa estética.",
        ),
        q(
          "q2",
          "Qual frase descreve melhor um budget de performance?",
          "É o limite de tempo, ocupação ou banda que uma etapa pode gastar sem comprometer o objetivo do sistema.",
          "É a quantidade máxima de CPUs instaladas no servidor.",
          "É a média de latência permitida por uma linguagem de programação.",
          "a",
          "Budget é uma forma operacional de falar sobre consumo aceitável de recurso.",
        ),
        q(
          "q3",
          "Por que CPU média sozinha é uma métrica fraca?",
          "Porque espera por I/O, locks ou filas pode dominar a latência mesmo com CPU modesta.",
          "Porque CPU só existe em programas compilados.",
          "Porque latência nunca tem relação com hardware.",
          "a",
          "Uma média isolada apaga onde o tempo realmente está sendo gasto.",
        ),
        q(
          "q4",
          "O que normalmente acontece quando um recurso opera muito perto da saturação?",
          "Pequenas variações de demanda passam a formar filas e piorar percentis.",
          "A latência sempre cai porque a máquina está mais ocupada.",
          "O throughput para de existir como conceito.",
          "a",
          "É a ausência de folga que torna o sistema sensível a burst e jitter.",
        ),
        q(
          "q5",
          "Qual é a utilidade de decompor o sistema em etapas e handoffs?",
          "Localizar onde o trabalho vira espera e qual recurso cada transição tensiona.",
          "Substituir toda instrumentação por diagrama.",
          "Garantir que CPU e memória sempre tenham o mesmo peso.",
          "a",
          "A decomposição deixa o custo mais observável e testável.",
        ),
        q(
          "q6",
          "Qual decisão faz mais sentido logo no começo de uma investigação?",
          "Escolher uma hipótese operacional sobre o gargalo provável.",
          "Refatorar a função mais longa do serviço.",
          "Paralelizar tudo que parecer repetitivo.",
          "a",
          "Hipótese guia quais métricas e ferramentas têm mais chance de responder algo útil.",
        ),
        q(
          "q7",
          "Qual comparação resume bem folga operacional?",
          "Ela compra previsibilidade especialmente em workloads sensíveis a latência.",
          "Ela sempre reduz throughput total.",
          "Ela impede qualquer tipo de fila.",
          "a",
          "Folga não elimina risco, mas reduz sensibilidade a variações de carga.",
        ),
        q(
          "q8",
          "Qual afirmação melhor conecta esta aula aos pré-requisitos de computação?",
          "Cache, syscalls e contenção continuam valendo; o modelo mental apenas organiza quando cada um pesa mais.",
          "Os fundamentos deixam de importar depois que se mede CPU.",
          "Performance é independente de memória e sistema operacional.",
          "a",
          "Esta aula é uma lente de integração, não um substituto para os mecanismos fundamentais.",
        ),
      ],
      glossary: [
        g("Budget de performance", "Limite de custo aceitável para uma etapa ou recurso."),
        g("Gargalo", "Parte do sistema que mais restringe o ganho global naquele cenário."),
        g("Saturação", "Estado em que um recurso opera próximo do seu limite útil."),
        g("Fila", "Acúmulo de trabalho esperando atendimento por capacidade insuficiente."),
        g("Trabalho útil", "Parte do tempo que realmente produz o resultado desejado."),
        g("Overhead", "Custo indireto de coordenação, abstração, cópia ou instrumentação."),
        g("Latência", "Tempo para uma unidade de trabalho completar seu caminho."),
        g("Throughput", "Taxa de trabalho concluído por unidade de tempo."),
        g("Handoff", "Transferência de trabalho entre camadas, threads, processos ou serviços."),
        g("Hipótese operacional", "Explicação provisória e testável para um custo observado."),
        g("Percentil", "Medida de distribuição usada para ver caudas de latência além da média."),
        g("Folga operacional", "Margem de capacidade disponível antes da saturação."),
      ],
    },
  } satisfies WaveL1LessonDefinition;
})();

const medirAntesDeOtimizar = (() => {
  const { visualIds, interactionIds } = assetIds("medir-antes-de-otimizar");

  return {
    visualIds,
    interactionIds,
    visualConfig: {
      title: "Medir Antes de Otimizar",
      subtitle: "Hipótese, baseline, experimento e validação",
      level: "Intermediário",
      tags: ["Medição", "Baseline", "Experimento", "SLO", "Perf"],
      conceptNodes: ["hipótese", "métrica", "baseline", "validação"],
      pipelineSteps: ["formular pergunta", "coletar baseline", "mudar variável", "comparar resultado"],
      leftLabel: "instrumentação leve",
      rightLabel: "instrumentação rica",
      impactRows: [
        { label: "Questão", value: "qual comportamento preciso explicar?" },
        { label: "Métrica", value: "qual sinal diferencia as hipóteses?" },
        { label: "Controle", value: "o que foi mantido constante?" },
        { label: "Validação", value: "o ganho é real e relevante?" },
      ],
    },
    interactionConfig: {
      title: "Medir Antes de Otimizar",
      pipelineSteps: [
        {
          name: "Definir a pergunta",
          summary:
            "Toda medição útil responde uma pergunta explícita: o serviço está lento para quem, em qual operação e sob que carga?",
          signal: "objetivo claro",
          risk: "medir tudo e não explicar nada",
          takeaway:
            "Sem pergunta, dashboard vira decoração e benchmark vira ritual.",
        },
        {
          name: "Coletar baseline",
          summary:
            "Antes de mudar qualquer coisa, registre como o sistema se comporta hoje com workload conhecido.",
          signal: "latência, throughput, erro, saturação",
          risk: "não conseguir provar se melhorou ou piorou",
          takeaway:
            "Baseline é o ponto de comparação que impede conclusões imaginárias.",
        },
        {
          name: "Isolar a variável",
          summary:
            "Mude uma coisa de cada vez, ou você terá um resultado impossível de atribuir.",
          signal: "mudança única e descrita",
          risk: "efeito confundido por ambiente ou carga diferente",
          takeaway:
            "Experimento bom corta ambiguidade, não apenas produz números.",
        },
        {
          name: "Validar ganho",
          summary:
            "A mudança precisa melhorar a métrica certa, no contexto certo, sem deslocar o custo para outro lugar importante.",
          signal: "comparação consistente",
          risk: "ganho local com regressão sistêmica",
          takeaway:
            "Otimização é uma afirmação causal; você precisa evidência para sustentá-la.",
        },
      ],
      leftLabel: "baixo overhead",
      rightLabel: "alta visibilidade",
      tradeoffSummary:
        "Quanto mais detalhada a instrumentação, maior o risco de perturbar o sistema; quanto mais leve, menor a resolução da explicação.",
      tradeoffRisks: [
        "Você quase não perturba o sistema, mas também aprende pouco sobre a origem do custo.",
        "Bom compromisso para acompanhamento contínuo em produção.",
        "Muita riqueza de detalhe pode exigir janelas curtas ou ambientes controlados.",
        "Ferramenta errada pode passar a medir a própria instrumentação.",
      ],
      practiceRule:
        "Meça o mínimo necessário para diferenciar hipóteses, não o máximo possível por ansiedade.",
      scenarios: [
        {
          name: "Endpoint web instável",
          situation:
            "A média parece razoável, mas alguns usuários relatam lentidão intermitente.",
          choice:
            "Comece por percentis, correlação temporal e separação entre tempo local e dependências externas.",
          why:
            "A média esconde caudas; você precisa ver quando e em qual fase o desvio aparece.",
          caution:
            "Se comparar ambientes com cargas diferentes, concluirá causalidade onde só havia contexto diferente.",
        },
        {
          name: "Microbenchmark local",
          situation:
            "Você quer comparar duas implementações de uma função pequena e pura.",
          choice:
            "Use benchmark controlado, release build e proteção contra otimizações indevidas.",
          why:
            "Nesse recorte, o ruído do sistema é menor e dá para focar em custo da função em si.",
          caution:
            "Resultado local não substitui validação no workload que realmente usa a função.",
        },
        {
          name: "Serviço com dependência de banco",
          situation:
            "O time suspeita do código da aplicação, mas o request passa por pool, rede e consulta remota.",
          choice:
            "Separe métricas de aplicação, pool e banco antes de refatorar o handler.",
          why:
            "Sem decompor a latência, você pode otimizar milissegundos locais enquanto perde quase tudo fora do processo.",
          caution:
            "Medição sem corte de fase mistura filas, serialização e banco em um único número sem ação clara.",
        },
      ],
      tone: "teal",
    },
    content: {
      id: "medir-antes-de-otimizar",
      title: "Medir Antes de Otimizar",
      subtitle:
        "Sem hipótese, baseline e validação, otimização vira teatro: você muda código, mas não sabe se mexeu no problema certo.",
      description:
        "Aula interativa sobre metodologia de medição, escolha de métricas, desenho de experimentos, baseline, risco de perturbação e como validar melhora real sem se enganar.",
      primaryCategoryId: "computacao",
      secondaryCategoryId: "engenharia",
      level: "Intermediário",
      estimatedTime: "50-60 min",
      tags: [
        "Medição",
        "Baseline",
        "Experimentos",
        "Observabilidade",
        "SLO",
        "Benchmarking",
      ],
      learningObjectives: [
        "Entender por que toda otimização precisa nascer de uma pergunta mensurável.",
        "Construir baselines antes de alterar código ou arquitetura.",
        "Escolher métricas que diferenciam hipóteses em vez de apenas preencher dashboards.",
        "Reconhecer o trade-off entre overhead de medição e profundidade de explicação.",
        "Desenhar experimentos que isolam variáveis e evitam confusão causal.",
        "Validar se uma melhora local realmente importa para o objetivo do sistema.",
      ],
      prerequisites: [
        "Modelo mental de performance: budgets, saturação e filas.",
        "Observabilidade básica e familiaridade com latência e throughput.",
        "Noções de serviços, workloads e efeitos de cache/memória no comportamento do código.",
      ],
      references: refs(
        "sreMonitoring",
        "sreSlo",
        "perfWiki",
        "criterionAnalysis",
        "goDiagnostics",
      ),
      heroVisual: visualIds.hero,
      openingText:
        "O erro clássico em performance não é otimizar pouco; é otimizar sem prova. Um time observa lentidão, reescreve um trecho elegante, comemora um benchmark local e descobre depois que a cauda de latência em produção continuou igual. Medir antes de otimizar é aceitar que software complexo mente para quem olha sem método. Você precisa fazer perguntas claras, coletar baseline, isolar variáveis e validar se a mudança realmente altera a experiência ou o custo que motivou a intervenção.",
      quickFacts: [
        {
          title: "Pergunta antes da métrica",
          body: "Uma métrica faz sentido quando ajuda a separar hipóteses concorrentes.",
        },
        {
          title: "Baseline é contrato",
          body: "Sem o estado inicial, não existe noção confiável de melhora ou regressão.",
        },
        {
          title: "Instrumentação perturba",
          body: "Quanto mais você observa, maior pode ser o efeito sobre o sistema observado.",
        },
        {
          title: "Ganho precisa importar",
          body: "Melhorar uma média local irrelevante pode não mudar o problema real do produto.",
        },
      ],
      sections: [
        s(
          "pergunta-primeiro",
          "Método",
          "Toda medição boa responde uma pergunta explícita",
          "O primeiro ato não é abrir dashboard; é formular que comportamento precisa ser explicado.",
          visualIds.concept,
          undefined,
          [
            "Perguntas vagas como 'o sistema está lento' são ruins porque misturam sintomas, público e contexto. Melhor perguntar: qual operação está degradando, sob qual carga, para qual perfil de usuário e desde quando?",
            "Esse enquadramento reduz o espaço de investigação. Ele também orienta quais sinais são relevantes e quais são ruído de fundo naquele momento.",
          ],
          [
            {
              type: "definition",
              title: "Pergunta operacional",
              body: "Formulação concreta do comportamento a ser explicado, com escopo, contexto e métrica-alvo.",
            },
          ],
        ),
        s(
          "baseline",
          "Comparação",
          "Sem baseline, você só coleciona números",
          "A primeira coleta serve para dizer como o sistema se comporta antes da intervenção.",
          visualIds.pipeline,
          interactionIds.pipeline,
          [
            "Baseline não precisa ser perfeita, mas precisa ser suficiente para comparação honesta. Idealmente, ela registra workload, ambiente, parâmetros e a métrica que motivou a investigação.",
            "Em sistemas distribuídos, valem não apenas números agregados, mas também a decomposição por fase: aplicação, rede, cache, banco, fila e saturação dos recursos-chave.",
          ],
          [
            {
              type: "insight",
              title: "Sem antes, não existe depois",
              body: "É impossível alegar melhora com confiança se você não registrou o ponto de partida em condições comparáveis.",
            },
          ],
        ),
        s(
          "escolha-de-metricas",
          "Escolha",
          "A métrica certa depende da hipótese que você quer derrubar",
          "Nem toda lentidão se revela em CPU, e nem toda CPU alta interessa ao usuário final.",
          undefined,
          undefined,
          [
            "Se a suspeita é gargalo externo, separe tempo local de dependências remotas. Se o medo é saturação, acompanhe ocupação, fila e caudas de latência. Se o problema é throughput de pipeline, monitore entrada, saída e backlog.",
            "A disciplina central é esta: uma boa métrica diferencia explicações rivais. Uma má métrica apenas confirma o que todo mundo já achava, sem permitir ação precisa.",
          ],
          [
            {
              type: "mistake",
              title: "Usar CPU como resposta universal",
              body: "CPU pode ser importante, mas é apenas um dos sinais possíveis e frequentemente não representa a experiência do usuário.",
            },
          ],
        ),
        s(
          "perturbacao-da-medicao",
          "Trade-off",
          "Medir também tem custo",
          "Instrumentação detalhada aumenta visibilidade, mas pode alterar o comportamento observado.",
          visualIds.tradeoff,
          interactionIds.tradeoff,
          [
            "Sampling, tracing, logging detalhado e profiling têm overheads diferentes. A escolha da ferramenta depende do quão invasiva a coleta pode ser naquele ambiente e da resolução explicativa desejada.",
            "Em produção, muitas vezes vale começar leve e aprofundar em janelas curtas ou ambientes replicáveis. Em laboratório, vale enriquecer a visibilidade para desmontar o problema com mais detalhe.",
          ],
          [
            {
              type: "example",
              title: "Tracing sempre ligado nem sempre é inocente",
              body: "Quanto mais eventos e payloads você captura, mais fácil fica medir a própria ferramenta em vez do sistema original.",
            },
          ],
        ),
        s(
          "isolar-variavel",
          "Experimento",
          "Mude uma variável por vez sempre que puder",
          "Comparação honesta depende de saber o que de fato mudou entre as execuções.",
          visualIds.impact,
          undefined,
          [
            "Refatorar o algoritmo, trocar o formato de serialização e alterar o tamanho da máquina na mesma rodada destrói a capacidade de atribuição causal. Você até pode ver um número melhor, mas não saberá por quê.",
            "No mundo real, nem sempre dá para isolar tudo. Ainda assim, vale reduzir a ambiguidade: documente ambiente, build, flags, dados de entrada e temperatura geral do sistema.",
          ],
          [
            {
              type: "definition",
              title: "Variável de confusão",
              body: "Fator que muda junto com o experimento e pode gerar falsa impressão de causalidade.",
            },
          ],
        ),
        s(
          "cenarios-de-medicao",
          "Prática",
          "A ferramenta depende do recorte do problema",
          "Microbenchmark, profiling em serviço, tracing distribuído e SLO analysis respondem perguntas diferentes.",
          undefined,
          interactionIds.scenario,
          [
            "Uma função pura e pequena pede benchmark controlado. Um endpoint instável pede percentis, correlação temporal e decomposição por dependência. Um problema de produção com vários serviços pode exigir tracing e sinais de saturação por hop.",
            "Ferramenta boa é a que reduz incerteza na pergunta atual. Ferramenta errada produz números bonitos e explicação pobre.",
          ],
          [
            {
              type: "insight",
              title: "Escopo correto economiza dias",
              body: "Você não precisa do instrumento mais sofisticado do mercado; precisa do instrumento que responde a pergunta de hoje.",
            },
          ],
        ),
        s(
          "validar-resultado",
          "Validação",
          "Melhora local só vale quando move a métrica que importava",
          "A etapa final é verificar se a mudança alterou o comportamento relevante e não apenas um número intermediário.",
          visualIds.impact,
          undefined,
          [
            "Reduzir alocações pode ser ótimo, mas talvez o usuário continue esperando o banco. Diminuir latência média pode ser irrelevante se a cauda continuar ruim. A validação precisa usar a métrica e o workload associados ao objetivo real da otimização.",
            "Também vale procurar deslocamento de custo: menos CPU com mais memória; mais throughput com pior previsibilidade; benchmark melhor e produção igual. O sistema sempre cobra a conta em algum lugar.",
          ],
          [
            {
              type: "mistake",
              title: "Parar na primeira métrica melhor",
              body: "Otimização honesta verifica ganho primário, regressões colaterais e consistência em condições comparáveis.",
            },
          ],
        ),
        s(
          "ciclo-disciplinado",
          "Síntese",
          "Hipótese -> baseline -> experimento -> comparação",
          "Esse ciclo simples é menos glamouroso do que 'hackear performance', mas gera melhoria replicável.",
          visualIds.pipeline,
          undefined,
          [
            "Equipes maduras de performance não dependem de heróis que adivinham o bug certo; elas dependem de processos que tornam hipóteses testáveis e refutações rápidas.",
            "Com o tempo, a disciplina de medir antes de otimizar se torna uma habilidade de economia cognitiva: menos esforço desperdiçado, menos regressão escondida e mais previsibilidade nas decisões.",
          ],
          [
            {
              type: "insight",
              title: "Método vence intuição solta",
              body: "A intuição é valiosa para formular hipótese; a medição é o que decide se a hipótese sobrevive.",
            },
          ],
        ),
        s(
          "quiz-revisao",
          "Revisão",
          "Quiz de revisão",
          "Confira se hipótese, baseline e validação ficaram amarrados.",
          undefined,
          "quiz",
          ["Medição útil serve para tomar decisão melhor, não para acumular gráficos."],
          [],
        ),
        s(
          "glossario",
          "Glossário",
          "Termos essenciais",
          "Consolide o vocabulário do ciclo de medição e experimentação.",
          undefined,
          "glossary",
          ["Esses termos reaparecem em profiling, benchmarking e observabilidade em produção."],
          [],
        ),
      ],
      summaryCards: [
        { title: "Pergunta orienta tudo", body: "Sem pergunta operacional, a medição perde foco e utilidade." },
        { title: "Baseline é indispensável", body: "Comparação honesta exige registrar o estado inicial." },
        { title: "Métrica serve à hipótese", body: "O melhor sinal é o que separa explicações concorrentes." },
        { title: "Instrumentação tem custo", body: "Mais visibilidade pode significar mais perturbação." },
        { title: "Isolamento reduz confusão", body: "Mudar uma variável por vez fortalece inferência causal." },
        { title: "Validação fecha o ciclo", body: "Melhoria local só importa se altera o problema relevante." },
      ],
      quiz: [
        q(
          "q1",
          "Qual é o primeiro passo recomendado antes de medir?",
          "Formular a pergunta operacional que precisa ser respondida.",
          "Trocar a implementação mais longa do código.",
          "Ligar todos os logs possíveis.",
          "a",
          "A pergunta define quais sinais valem a pena coletar.",
        ),
        q(
          "q2",
          "Para que serve o baseline?",
          "Para comparar o sistema antes e depois da mudança em condições equivalentes.",
          "Para substituir qualquer teste funcional.",
          "Para eliminar a necessidade de workload real.",
          "a",
          "Sem baseline, você não sabe se houve melhora real ou só impressão.",
        ),
        q(
          "q3",
          "O que caracteriza uma métrica útil?",
          "Ela ajuda a diferenciar hipóteses sobre a causa do problema.",
          "Ela é a mais fácil de coletar.",
          "Ela sempre mede CPU.",
          "a",
          "Métrica boa gera decisão; métrica ruim só enfeita dashboard.",
        ),
        q(
          "q4",
          "Qual risco aparece quando várias mudanças são aplicadas ao mesmo tempo?",
          "Você perde capacidade de atribuir o resultado a uma causa específica.",
          "O baseline automaticamente melhora.",
          "A instrumentação passa a ter zero overhead.",
          "a",
          "Esse é o problema clássico das variáveis de confusão.",
        ),
        q(
          "q5",
          "Por que instrumentação detalhada precisa de cuidado?",
          "Porque pode alterar o comportamento observado ao adicionar overhead.",
          "Porque só funciona em benchmarks de Rust.",
          "Porque impede qualquer coleta em produção.",
          "a",
          "A visibilidade cresce, mas a perturbação também pode crescer.",
        ),
        q(
          "q6",
          "Qual ferramenta tende a fazer mais sentido para uma função pequena e pura?",
          "Benchmark controlado com build otimizada.",
          "Tracing distribuído de ponta a ponta.",
          "Métrica de backlog do banco.",
          "a",
          "O recorte da pergunta determina o instrumento adequado.",
        ),
        q(
          "q7",
          "O que significa validar uma otimização?",
          "Verificar se a mudança alterou a métrica relevante no contexto que motivou o trabalho.",
          "Confirmar que o código ficou mais curto.",
          "Comparar apenas a média de uma execução isolada.",
          "a",
          "Ganhos locais podem não mover o problema que interessava.",
        ),
        q(
          "q8",
          "Qual sequência resume o ciclo disciplinado desta aula?",
          "Hipótese -> baseline -> experimento -> comparação.",
          "Mudança -> celebração -> deploy -> observação casual.",
          "CPU -> memória -> disco -> rede.",
          "a",
          "Esse fluxo torna o trabalho de performance mais falsificável e menos teatral.",
        ),
      ],
      glossary: [
        g("Pergunta operacional", "Questão concreta que a medição deve responder."),
        g("Baseline", "Estado inicial registrado para comparação posterior."),
        g("Hipótese", "Explicação provisória para um comportamento observado."),
        g("Métrica", "Sinal quantitativo usado para acompanhar ou explicar um sistema."),
        g("SLI", "Indicador que mede algum aspecto observável do serviço."),
        g("SLO", "Objetivo-alvo definido para um indicador importante do serviço."),
        g("Overhead de instrumentação", "Custo adicional introduzido pela própria coleta."),
        g("Variável de confusão", "Fator externo que impede atribuir corretamente um resultado."),
        g("Workload", "Padrão de carga ou conjunto de operações exercido sobre o sistema."),
        g("Validação", "Etapa de confirmar que a mudança mexeu no resultado relevante."),
        g("Comparação A/B", "Comparação entre duas variantes em contexto controlado."),
        g("Causalidade", "Relação entre mudança aplicada e efeito observado."),
      ],
    },
  } satisfies WaveL1LessonDefinition;
})();

const cpuIoMemoryBound = (() => {
  const { visualIds, interactionIds } = assetIds("cpu-bound-io-bound-memory-bound");

  return {
    visualIds,
    interactionIds,
    visualConfig: {
      title: "CPU-bound, I/O-bound e Memory-bound",
      subtitle: "O tipo de bound muda a solução",
      level: "Intermediário",
      tags: ["CPU-bound", "I/O-bound", "Memory-bound", "Gargalos", "Locality"],
      conceptNodes: ["execução", "espera externa", "alimentação de dados", "coordenação"],
      pipelineSteps: ["sintoma", "bound provável", "sinal útil", "primeiro experimento"],
      leftLabel: "mais cálculo",
      rightLabel: "mais espera externa",
      impactRows: [
        { label: "CPU-bound", value: "hotspots on-CPU, alta ocupação e trabalho aritmético" },
        { label: "I/O-bound", value: "latência de rede, disco, fila e dependências remotas" },
        { label: "Memory-bound", value: "stalls, cópias, misses, locality ruim" },
        { label: "Misto", value: "mudança de gargalo conforme carga e fase da operação" },
      ],
    },
    interactionConfig: {
      title: "CPU-bound, I/O-bound e Memory-bound",
      pipelineSteps: [
        {
          name: "Observar o sintoma",
          summary:
            "A investigação começa pelo que se manifesta: CPU alta, tempo parado, filas, throughput baixo ou caudas crescendo.",
          signal: "sintoma dominante",
          risk: "assumir que todo lento é CPU",
          takeaway:
            "O sintoma inicial orienta a hipótese de bound, não a resposta final.",
        },
        {
          name: "Classificar o bound",
          summary:
            "Pergunte qual recurso ou forma de espera mais limita o avanço do trabalho nesse momento.",
          signal: "recurso dominante",
          risk: "misturar cálculo, memória e I/O no mesmo saco",
          takeaway:
            "Bound é uma lente operacional: ele aponta o primeiro lugar para investigar e não um rótulo eterno do sistema.",
        },
        {
          name: "Escolher o instrumento",
          summary:
            "Perfis on-CPU, métricas de dependência, filas e indícios de locality respondem perguntas diferentes.",
          signal: "medição alinhada ao tipo de custo",
          risk: "usar a ferramenta favorita em vez da ferramenta certa",
          takeaway:
            "A ferramenta correta depende do tipo de espera suspeitado.",
        },
        {
          name: "Testar a direção",
          summary:
            "O primeiro experimento deve confirmar ou derrubar a hipótese de bound com custo baixo.",
          signal: "mudança observável após experimento simples",
          risk: "pular direto para refatoração profunda",
          takeaway:
            "Classificar bem o bound reduz bastante o espaço de soluções erradas.",
        },
      ],
      leftLabel: "compute-heavy",
      rightLabel: "wait-heavy",
      tradeoffSummary:
        "Há workloads em que mais paralelismo ajuda, outros em que apenas aumenta pressão sobre memória ou multiplica requests a uma dependência já lenta.",
      tradeoffRisks: [
        "Você pode estar subutilizando CPU se o problema real for sincronização ou I/O mal aproveitado.",
        "Algum ganho local pode existir, mas ainda sem clareza sobre o bound dominante.",
        "Aumentar concorrência sem mudar o gargalo pode só produzir mais fila.",
        "Se o recurso limitante está fora da CPU, empurrar mais trabalho para ela pouco resolve.",
      ],
      practiceRule:
        "A solução boa depende do bound dominante: reduzir cálculo, reduzir espera externa ou reduzir movimento/organização ruim de dados.",
      scenarios: [
        {
          name: "Compactador local",
          situation:
            "O processo trabalha sobre dados já em memória, usa pouco disco e mantém os núcleos ocupados.",
          choice:
            "Suspeite primeiro de CPU-bound e procure hotspots on-CPU antes de discutir I/O.",
          why:
            "Se a taxa de cálculo limita o avanço, reduzir instruções ou melhorar paralelismo tende a render mais.",
          caution:
            "Mesmo workloads compute-heavy podem virar memory-bound se o acesso aos dados for irregular demais.",
        },
        {
          name: "API dependente de banco",
          situation:
            "Cada request faz pouco processamento local, mas espera resposta remota para continuar.",
          choice:
            "Trate como candidato a I/O-bound e decomponha a latência por dependência.",
          why:
            "O tempo parado fora da CPU provavelmente domina o request.",
          caution:
            "Aumentar threads sem reduzir a espera pode apenas ampliar contenção e fila de conexões.",
        },
        {
          name: "Processamento com arrays grandes",
          situation:
            "Há CPU livre aparente, mas o código desacelera ao crescer o volume de dados e o padrão de acesso é pouco local.",
          choice:
            "Suspeite de memory-bound: layout, cópias e locality importam mais do que algumas instruções a menos.",
          why:
            "A CPU pode estar esperando dados chegarem em vez de gastando tempo computando.",
          caution:
            "Olhando só para CPU média, você pode chamar esse caso de 'leve' quando ele está, na prática, faminto por memória.",
        },
      ],
      tone: "violet",
    },
    content: {
      id: "cpu-bound-io-bound-memory-bound",
      title: "CPU-bound, I/O-bound e Memory-bound",
      subtitle:
        "Quando você identifica qual tipo de espera ou recurso domina o custo, metade da solução errada já foi descartada.",
      description:
        "Aula interativa para reconhecer diferenças entre gargalos de CPU, I/O e memória, escolher medições adequadas e evitar aplicar remédios de um tipo de bound em outro.",
      primaryCategoryId: "computacao",
      secondaryCategoryId: "engenharia",
      level: "Intermediário",
      estimatedTime: "50-60 min",
      tags: [
        "CPU-bound",
        "I/O-bound",
        "Memory-bound",
        "Locality",
        "Profiling",
        "Diagnóstico",
      ],
      learningObjectives: [
        "Distinguir o significado operacional de CPU-bound, I/O-bound e memory-bound.",
        "Entender por que o bound dominante muda o conjunto de soluções que fazem sentido.",
        "Ler sintomas iniciais e convertê-los em hipóteses testáveis sobre o recurso limitante.",
        "Selecionar métricas e ferramentas coerentes com cada tipo de gargalo.",
        "Reconhecer casos mistos em que o gargalo muda conforme carga, fase ou tamanho de dados.",
        "Evitar remédios superficiais como 'paraleliza tudo' ou 'corta código' sem classificar o problema.",
      ],
      prerequisites: [
        "Modelo mental de performance e budgets de recursos.",
        "Cache de CPU, RAM e custo de acesso a dados.",
        "Syscalls, rede, disco e noção de contenção entre threads.",
      ],
      references: refs(
        "greggSystemsPerformance",
        "drepperMemory",
        "perfWiki",
        "csapp",
        "goDiagnostics",
      ),
      heroVisual: visualIds.hero,
      openingText:
        "A palavra 'gargalo' é útil, mas insuficiente. Dizer que um sistema está com gargalo não informa se ele está queimando ciclos de CPU, esperando rede, apanhando da memória ou oscilando entre esses estados. Essa classificação importa porque cada tipo de bound responde a perguntas diferentes. O mesmo ajuste que ajuda um código CPU-bound pode ser irrelevante — ou até piorar — um fluxo dominado por I/O ou movimento de dados.",
      quickFacts: [
        {
          title: "Bound não é essência",
          body: "É uma descrição do recurso limitante naquele workload e naquele momento.",
        },
        {
          title: "CPU alta é só um caso",
          body: "Muita lentidão nasce com CPU livre, mas com espera em outro subsistema.",
        },
        {
          title: "Memória não é só capacidade",
          body: "Locality, misses e cópias ruins podem frear a CPU sem RAM estar 'cheia'.",
        },
        {
          title: "Mais concorrência não é panaceia",
          body: "Em I/O ou memória mal classificadas, pode apenas multiplicar fila e contenção.",
        },
      ],
      sections: [
        s(
          "o-que-e-bound",
          "Vocabulário",
          "Bound é o nome do recurso que mais limita o avanço do trabalho",
          "A classificação não é moral nem permanente; ela descreve o custo dominante sob um cenário específico.",
          visualIds.concept,
          undefined,
          [
            "Dizer que algo é CPU-bound significa que a taxa de cálculo útil ou o custo on-CPU domina o tempo total. Dizer que é I/O-bound significa que a espera por disco, rede ou dependência externa é a trava principal. Dizer que é memory-bound significa que a CPU passa mais tempo sendo alimentada com dados do que efetivamente calculando sobre eles.",
            "Esses rótulos simplificam a investigação porque apontam para mecanismos diferentes. Não são absolutos: o mesmo serviço pode mudar de bound conforme tamanho de entrada, concorrência, cache aquecido ou ambiente de produção.",
          ],
          [
            {
              type: "definition",
              title: "Bound dominante",
              body: "Recurso ou forma de espera que mais restringe o ganho global em um workload específico.",
            },
          ],
        ),
        s(
          "cpu-bound",
          "CPU-bound",
          "Quando o tempo útil de CPU é o custo que mais pesa",
          "Nesse caso, faz sentido olhar hotspots, instruções executadas e paralelismo possível.",
          visualIds.pipeline,
          interactionIds.pipeline,
          [
            "Workloads CPU-bound costumam manter núcleos ocupados com transformação de dados: compressão, criptografia, parsing pesado, inferência ou cálculos numéricos. O gargalo aparece no caminho on-CPU.",
            "As perguntas típicas aqui são: qual função está quente? existe trabalho redundante? o algoritmo pode fazer menos? o compilador ou layout ajudam? há parte serial que impede escalar?",
          ],
          [
            {
              type: "example",
              title: "Compactação local",
              body: "Se os dados já estão presentes e o processo passa a maior parte do tempo transformando bytes, reduzir trabalho on-CPU pode render bem.",
            },
          ],
        ),
        s(
          "io-bound",
          "I/O-bound",
          "Quando o sistema avança no ritmo das dependências externas",
          "Aqui a CPU frequentemente aparece folgada porque o trabalho fica estacionado esperando disco, rede ou serviços remotos.",
          undefined,
          undefined,
          [
            "Uma API que passa pouco tempo no handler e muito tempo aguardando banco ou outro serviço é um exemplo clássico. O request continua lento, mas a solução dificilmente será mexer em laços locais sem antes decompor a latência externa.",
            "Nesse cenário, throughput pode crescer mais com redução de round-trips, batching, caching, pool tuning ou mudança de protocolo do que com micro-otimizações no código principal.",
          ],
          [
            {
              type: "mistake",
              title: "Ver CPU baixa e achar que não há gargalo",
              body: "CPU ociosa pode ser exatamente o sinal de que o tempo está indo para espera remota ou bloqueio em I/O.",
            },
          ],
        ),
        s(
          "memory-bound",
          "Memory-bound",
          "Quando o problema principal é alimentar a CPU com dados no ritmo certo",
          "Nem toda lentidão de memória se parece com falta de RAM; muitas vezes o vilão é locality ruim.",
          visualIds.tradeoff,
          interactionIds.tradeoff,
          [
            "Memory-bound aparece quando a CPU depende de dados que chegam devagar em relação ao seu apetite. Isso pode vir de padrões de acesso ruins, cópias excessivas, alocação intensa, estruturas dispersas ou misses frequentes na hierarquia de memória.",
            "O sintoma é traiçoeiro porque às vezes a CPU não está 'cheia', mas também não está progredindo bem. Ela está aguardando dados, não descansando.",
          ],
          [
            {
              type: "insight",
              title: "Memória é throughput de dados, não só capacidade",
              body: "Ter RAM disponível não garante que o programa esteja alimentando bem a CPU no caminho crítico.",
            },
          ],
        ),
        s(
          "ferramentas-por-bound",
          "Ferramentas",
          "Cada tipo de bound pede sinais diferentes",
          "O que ajuda em CPU nem sempre ajuda em I/O ou memória.",
          visualIds.impact,
          undefined,
          [
            "Para CPU-bound, perfis on-CPU e hotspots fazem muito sentido. Para I/O-bound, latência por dependência, filas, conexões e tempos de syscall ficam mais relevantes. Para memory-bound, locality, alocações, cópias e comportamento de cache entram no centro.",
            "Esse mapeamento evita usar a ferramenta favorita em todos os problemas. O objetivo é escolher a medição que mais rapidamente derruba a hipótese errada.",
          ],
          [
            {
              type: "example",
              title: "Perfis e métricas coexistem",
              body: "Você pode usar profiling para o lado on-CPU e, ao mesmo tempo, métricas externas para latência remota e saturação de pools.",
            },
          ],
        ),
        s(
          "casos-mistos",
          "Realidade",
          "Muitos sistemas trocam de bound conforme a carga",
          "Classificações puras ajudam a pensar, mas workloads reais costumam mudar de regime.",
          undefined,
          interactionIds.scenario,
          [
            "Um serviço pode ser I/O-bound em carga leve, virar CPU-bound ao ativar compressão e depois tornar-se memory-bound quando os dados excedem os caches. Um pipeline pode alternar entre fase de leitura, fase de transformação e fase de persistência.",
            "Por isso, a pergunta correta não é 'esse sistema é o quê para sempre?', e sim 'o que está limitando agora, nesta fase, com este tamanho de entrada e esta concorrência?'.",
          ],
          [
            {
              type: "definition",
              title: "Mudança de regime",
              body: "Troca do recurso dominante conforme workload, fase de execução ou ambiente.",
            },
          ],
        ),
        s(
          "solucoes-alinhadas",
          "Escolha",
          "Solução boa ataca o bound dominante",
          "É por isso que diagnosticar bem normalmente vale mais do que começar a otimizar cedo demais.",
          visualIds.impact,
          undefined,
          [
            "CPU-bound pede menos trabalho, melhor paralelismo ou algoritmos mais adequados. I/O-bound pede menos espera remota, menos round-trip, melhor pipeline externo ou melhor uso de buffers e caches. Memory-bound pede reduzir movimento de dados, melhorar layout e reaproveitar locality.",
            "Errar a classificação costuma levar a soluções cosméticas. Você mexe em tudo, menos no mecanismo que realmente limita o sistema.",
          ],
          [
            {
              type: "insight",
              title: "Tipo de bound muda o cardápio de otimização",
              body: "A mesma receita não serve para recursos limitantes diferentes.",
            },
          ],
        ),
        s(
          "regra-de-bolso",
          "Síntese",
          "Pergunte sempre: estou calculando, esperando ou alimentando mal a CPU?",
          "Essa tríade simples já filtra uma enorme quantidade de diagnósticos ruins.",
          visualIds.pipeline,
          undefined,
          [
            "Quando o problema parece abstrato demais, volte a essa regra. Se o sistema calcula demais, foque o caminho on-CPU. Se espera demais, procure dependências, fila e coordenação. Se alimenta mal a CPU, observe memória, layout e cópias.",
            "Não resolve tudo, mas organiza a cabeça rápido e mantém a investigação perto dos mecanismos reais.",
          ],
          [
            {
              type: "mistake",
              title: "Pular direto para solução favorita",
              body: "Paralelizar, cachear ou refatorar sem classificar o bound costuma desperdiçar tempo e introduzir complexidade desnecessária.",
            },
          ],
        ),
        s(
          "quiz-revisao",
          "Revisão",
          "Quiz de revisão",
          "Teste se os três tipos de bound ficaram bem separados.",
          undefined,
          "quiz",
          ["A utilidade do rótulo está em escolher melhor o primeiro experimento e não em etiquetar o sistema para sempre."],
          [],
        ),
        s(
          "glossario",
          "Glossário",
          "Termos essenciais",
          "Feche consolidando o vocabulário de classificação de gargalos.",
          undefined,
          "glossary",
          ["Esses termos reaparecem em perf, pprof, queues, caches e capacity planning."],
          [],
        ),
      ],
      summaryCards: [
        { title: "Bound é diagnóstico", body: "Ele aponta o recurso limitante em um cenário específico." },
        { title: "CPU-bound pede olhar on-CPU", body: "Hotspots, algoritmo e paralelismo entram em foco." },
        { title: "I/O-bound pede decomposição externa", body: "Latência remota e filas dominam mais do que o código local." },
        { title: "Memory-bound é fome de dados", body: "Locality, cópias e layout podem frear a CPU sem RAM acabar." },
        { title: "Casos reais trocam de regime", body: "O gargalo muda com carga, fase e tamanho de entrada." },
        { title: "Remédio depende do bound", body: "Classificar bem evita otimização bonita e irrelevante." },
      ],
      quiz: [
        q(
          "q1",
          "O que significa dizer que um workload está CPU-bound?",
          "Que o custo dominante está no trabalho on-CPU e na taxa de cálculo útil.",
          "Que o sistema só usa uma CPU física.",
          "Que a memória acabou.",
          "a",
          "Nesse caso, reduzir instruções úteis ou melhorar paralelismo tende a render mais.",
        ),
        q(
          "q2",
          "Qual cenário combina melhor com I/O-bound?",
          "Request que passa pouco tempo local e muito tempo esperando banco ou rede.",
          "Laço numérico intenso sem chamadas externas.",
          "Processamento sobre dados já quentes em cache.",
          "a",
          "A lentidão nasce da espera por dependências externas.",
        ),
        q(
          "q3",
          "Qual frase resume memory-bound?",
          "A CPU progride mal porque dados chegam devagar ou de forma ineficiente ao caminho crítico.",
          "A RAM física está sempre lotada.",
          "O compilador deixou de otimizar laços.",
          "a",
          "O problema central é alimentação de dados, não necessariamente capacidade total.",
        ),
        q(
          "q4",
          "Por que CPU média baixa não descarta gargalo?",
          "Porque o sistema pode estar esperando I/O, lock ou memória.",
          "Porque CPU só importa em debug builds.",
          "Porque throughput não depende de recursos.",
          "a",
          "Baixa CPU pode significar muito tempo parado em espera.",
        ),
        q(
          "q5",
          "O que deve mudar junto com a classificação do bound?",
          "As métricas, ferramentas e tipo de experimento inicial.",
          "O nome da linguagem usada no projeto.",
          "A existência de benchmarks.",
          "a",
          "Cada tipo de custo pede sinais diferentes.",
        ),
        q(
          "q6",
          "Qual risco existe em aumentar concorrência num caso I/O-bound?",
          "Ampliar fila e contenção sem reduzir a espera dominante.",
          "Eliminar completamente a latência remota.",
          "Transformar o sistema automaticamente em CPU-bound de forma benigna.",
          "a",
          "Mais concorrência não resolve o bound errado por mágica.",
        ),
        q(
          "q7",
          "Por que um sistema pode trocar de bound?",
          "Porque carga, fase de execução e tamanho de dados mudam o recurso dominante.",
          "Porque bound é decidido pela linguagem no momento do build.",
          "Porque só existe um tipo de gargalo por máquina.",
          "a",
          "Workloads reais frequentemente alternam entre regimes.",
        ),
        q(
          "q8",
          "Qual pergunta de bolso resume a aula?",
          "Estou calculando demais, esperando demais ou alimentando mal a CPU?",
          "Tenho memória suficiente para abrir o editor?",
          "Meu código está bonito o bastante?",
          "a",
          "Essa tríade já orienta um diagnóstico inicial muito melhor.",
        ),
      ],
      glossary: [
        g("CPU-bound", "Situação em que o custo dominante está no trabalho on-CPU."),
        g("I/O-bound", "Situação em que a espera por disco, rede ou dependência externa domina."),
        g("Memory-bound", "Situação em que o movimento e acesso a dados limitam o avanço da CPU."),
        g("Hotspot", "Trecho que concentra parte importante do custo observado."),
        g("Locality", "Qualidade do padrão de acesso a dados na hierarquia de memória."),
        g("Round-trip", "Ida e volta de uma interação remota."),
        g("Fila", "Trabalho acumulado esperando capacidade de atendimento."),
        g("Mudança de regime", "Troca do recurso dominante sob outra condição de workload."),
        g("On-CPU", "Tempo em que a thread está efetivamente executando na CPU."),
        g("Stall", "Parada ou atraso enquanto a CPU espera recursos ou dados."),
        g("Dependência externa", "Serviço, disco, rede ou componente fora do processo local."),
        g("Recurso dominante", "Recurso que mais limita o ganho global naquele instante."),
      ],
    },
  } satisfies WaveL1LessonDefinition;
})();

const latenciaVsThroughput = (() => {
  const { visualIds, interactionIds } = assetIds("latencia-vs-throughput");

  return {
    visualIds,
    interactionIds,
    visualConfig: {
      title: "Latência vs Throughput",
      subtitle: "Otimizar um pode piorar o outro",
      level: "Intermediário",
      tags: ["Latência", "Throughput", "Fila", "Little's Law", "Batch"],
      conceptNodes: ["tempo por item", "itens por segundo", "fila", "cauda"],
      pipelineSteps: ["chegada", "espera", "serviço", "saída"],
      leftLabel: "resposta imediata",
      rightLabel: "agrupar para escoar mais",
      impactRows: [
        { label: "Latência", value: "tempo sentido por uma unidade de trabalho" },
        { label: "Throughput", value: "vazão sustentada do sistema ao longo do tempo" },
        { label: "Fila", value: "ponte entre demanda excedente e atraso observado" },
        { label: "Cauda", value: "percentis ruins que a média quase nunca mostra" },
      ],
    },
    interactionConfig: {
      title: "Latência vs Throughput",
      pipelineSteps: [
        {
          name: "Chegada",
          summary:
            "O sistema recebe trabalho em certo ritmo e com certa variabilidade. Esse ritmo já define parte da dificuldade operacional.",
          signal: "taxa de chegada",
          risk: "assumir fluxo uniforme",
          takeaway:
            "Burst de chegada pode gerar atraso mesmo em sistemas rápidos em média.",
        },
        {
          name: "Espera",
          summary:
            "Se a chegada se aproxima demais da capacidade de serviço, a fila cresce e a latência explode.",
          signal: "backlog e tempo em fila",
          risk: "olhar só para o tempo de serviço",
          takeaway:
            "Latência total é serviço mais espera, e às vezes a espera domina tudo.",
        },
        {
          name: "Serviço",
          summary:
            "Aqui mora o custo direto de processar cada item. Reduzi-lo melhora tanto latência quanto throughput, mas nem sempre na mesma intensidade.",
          signal: "tempo por item",
          risk: "medir só média por request",
          takeaway:
            "Processamento local importa, mas ele entra dentro de um sistema que também enfileira.",
        },
        {
          name: "Saída",
          summary:
            "O resultado operacional é o encontro entre vazão sustentada e experiência por item concluído.",
          signal: "throughput efetivo e percentis",
          risk: "celebrar throughput alto com experiência individual ruim",
          takeaway:
            "O produto pode preferir latência baixa ou throughput alto; a engenharia precisa saber qual objetivo pesa mais.",
        },
      ],
      leftLabel: "latência individual",
      rightLabel: "vazão agregada",
      tradeoffSummary:
        "Batching, coalescing e buffers maiores podem melhorar throughput, mas acrescentam tempo de espera por item antes do processamento.",
      tradeoffRisks: [
        "Resposta imediata pode sacrificar eficiência agregada e custo por unidade.",
        "Bom equilíbrio quando há um pouco de amortização sem fila excessiva.",
        "Você começa a ganhar vazão, mas alguns itens esperam mais para serem agrupados.",
        "A busca agressiva por throughput pode ferir interatividade e piorar a cauda.",
      ],
      practiceRule:
        "Decida explicitamente se o produto compra mais valor com previsibilidade por item ou com maior vazão total do sistema.",
      scenarios: [
        {
          name: "Chat ou interface humana",
          situation:
            "Cada operação é percebida diretamente por uma pessoa que está aguardando resposta.",
          choice:
            "Priorize latência baixa e caudas controladas, mesmo abrindo mão de alguma eficiência agregada.",
          why:
            "Para o usuário interativo, esperar para formar lote geralmente é pior do que desperdiçar um pouco de throughput.",
          caution:
            "Média boa não consola uma interface que ocasionalmente trava em p95 ou p99.",
        },
        {
          name: "Pipeline de ingestão",
          situation:
            "O valor principal está em processar muito volume total ao longo do tempo.",
          choice:
            "Batching e amortização costumam fazer mais sentido, desde que o atraso agregado fique dentro do SLA.",
          why:
            "Nesse contexto, custo por unidade processada e vazão sustentada pesam mais do que cada item individual.",
          caution:
            "Se a taxa de chegada exceder a de saída por muito tempo, o backlog cresce e o SLA estoura mesmo em sistemas bem batched.",
        },
        {
          name: "API híbrida",
          situation:
            "Há endpoints interativos e tarefas assíncronas coexistindo na mesma plataforma.",
          choice:
            "Separe classes de workload e política de fila em vez de otimizar todos os fluxos com o mesmo objetivo.",
          why:
            "Misturar metas diferentes no mesmo pipeline gera decisões ruins para ambos os lados.",
          caution:
            "Tentar maximizar throughput de tudo ao mesmo tempo costuma degradar justamente o caminho mais sensível ao usuário.",
        },
      ],
      tone: "amber",
    },
    content: {
      id: "latencia-vs-throughput",
      title: "Latência vs Throughput",
      subtitle:
        "O sistema que processa muita coisa por segundo nem sempre é o que responde melhor a cada pedido individual.",
      description:
        "Aula interativa sobre diferença entre tempo por item e vazão agregada, teoria básica de filas, caudas de latência, batching e como metas de produto mudam a noção de otimização correta.",
      primaryCategoryId: "computacao",
      secondaryCategoryId: "engenharia",
      level: "Intermediário",
      estimatedTime: "50-60 min",
      tags: [
        "Latência",
        "Throughput",
        "Queueing",
        "Little's Law",
        "Batching",
        "SLO",
      ],
      learningObjectives: [
        "Distinguir latência individual e throughput agregado sem tratá-los como sinônimos.",
        "Entender o papel das filas no crescimento da latência percebida.",
        "Relacionar variabilidade e proximidade da saturação ao pior comportamento de cauda.",
        "Usar a intuição de Little's Law para conectar vazão, ocupação e tempo no sistema.",
        "Explicar por que batching pode ajudar throughput e piorar latência por item.",
        "Escolher o objetivo de otimização de acordo com o tipo de produto e workload.",
      ],
      prerequisites: [
        "Modelo mental de performance e ideia de saturação.",
        "Noção de filas, processos e concorrência.",
        "Entendimento básico de percentis e diferença entre média e cauda.",
      ],
      references: refs(
        "sreMonitoring",
        "sreSlo",
        "mitQueueing",
        "greggSystemsPerformance",
        "perfWiki",
      ),
      heroVisual: visualIds.hero,
      openingText:
        "É tentador resumir performance a 'mais rápido'. O problema é que rápido para quem e em qual métrica? Um sistema pode processar um grande volume total por segundo e ainda assim fazer cada item esperar demais na fila. Também pode responder individualmente muito bem, mas usar recursos de modo pouco eficiente para workloads massivos. Latência e throughput caminham juntos, mas não andam sempre na mesma direção. A engenharia de performance começa quando você aceita essa tensão em vez de fingir que existe um único botão de velocidade.",
      quickFacts: [
        { title: "Latência é por item", body: "Ela mede quanto uma unidade de trabalho leva para terminar." },
        { title: "Throughput é vazão", body: "Ele mede quantas unidades o sistema conclui por unidade de tempo." },
        { title: "Fila cola os dois", body: "Quando a capacidade aperta, a espera cresce e puxa a latência para cima." },
        { title: "Batching é troca", body: "Agrupar trabalho amortiza custo, mas adiciona espera antes do serviço." },
      ],
      sections: [
        s(
          "duas-metricas-duas-perguntas",
          "Definição",
          "Latência e throughput respondem perguntas diferentes",
          "Uma olha para a jornada individual; a outra para a vazão total do sistema.",
          visualIds.concept,
          undefined,
          [
            "Latência pergunta: quanto tempo uma operação específica leva do início ao fim? Throughput pergunta: quantas operações completas cabem em uma janela de tempo? As duas são importantes, mas servem a decisões distintas.",
            "Produtos interativos costumam valorizar mais a experiência individual. Sistemas batch ou pipelines massivos frequentemente valorizam mais vazão sustentada e custo por unidade processada.",
          ],
          [
            {
              type: "definition",
              title: "Latência",
              body: "Tempo total que uma unidade de trabalho passa no sistema até completar.",
            },
            {
              type: "definition",
              title: "Throughput",
              body: "Quantidade de unidades concluídas por unidade de tempo.",
            },
          ],
        ),
        s(
          "fila-como-ponte",
          "Fila",
          "Fila é a ponte entre capacidade e atraso percebido",
          "Quando chegam mais itens do que o sistema consegue drenar, a espera aparece antes mesmo do serviço em si.",
          visualIds.pipeline,
          interactionIds.pipeline,
          [
            "Mesmo que o tempo de serviço por item seja razoável, a fila pode tornar o tempo total ruim. É por isso que olhar apenas para a etapa de processamento às vezes subestima muito a experiência real.",
            "Essa visão ajuda a explicar por que sistemas perto da saturação ficam frágeis. Não é só o trabalho útil que custa; é o acúmulo de trabalho esperando para ser atendido.",
          ],
          [
            {
              type: "insight",
              title: "Latência total = serviço + espera",
              body: "Em sistemas pressionados, a espera pode superar de longe o custo do processamento efetivo.",
            },
          ],
        ),
        s(
          "littles-law",
          "Modelo",
          "Little's Law dá uma ponte simples entre ocupação, throughput e tempo",
          "Em regime estável, número médio de itens no sistema, vazão e tempo médio ficam ligados por uma relação curta e poderosa.",
          undefined,
          undefined,
          [
            "A forma clássica é L = λW: em regime estável, o número médio de itens no sistema é igual à taxa média efetiva de chegada — que coincide com a taxa média de saída, isto é, o throughput observado — multiplicada pelo tempo médio gasto no sistema. Não é um modelo completo de fila, mas é uma regra extremamente útil para raciocinar.",
            "A intuição operacional é forte: se a vazão fica parecida, mais itens acumulados significam mais tempo médio no sistema. Se o tempo cresce e a vazão não sobe junto, o backlog está dizendo algo importante.",
          ],
          [
            {
              type: "formula",
              title: "Little's Law",
              body: "Relaciona ocupação, vazão e tempo médio em regime estável.",
              formula: "L = λW",
            },
          ],
        ),
        s(
          "media-vs-cauda",
          "Distribuição",
          "Média sozinha quase sempre subestima a dor do usuário",
          "Caudas de latência importam porque um número pequeno de requests ruins pode dominar a percepção do sistema inteiro.",
          visualIds.impact,
          undefined,
          [
            "O SRE Book insiste em olhar percentis porque médias escondem assimetria. Um backend com média aceitável pode ainda ter uma cauda que explode sob bursts, contenda ou dependências instáveis.",
            "Em aplicações compostas por várias chamadas, caudas se acumulam. O p99 de um serviço pode contaminar o comportamento mediano do fluxo de ponta a ponta quando há muitas dependências em série.",
          ],
          [
            {
              type: "mistake",
              title: "Declarar vitória pela média",
              body: "Se o usuário sofre com jitter e cauda, reduzir só o valor médio não ataca a principal dor.",
            },
          ],
        ),
        s(
          "batching",
          "Trade-off",
          "Batching amortiza custo, mas injeta espera antes do serviço",
          "Agrupar itens pode melhorar a vazão global e o custo por item, ao preço de latência adicional para cada unidade.",
          visualIds.tradeoff,
          interactionIds.tradeoff,
          [
            "Esse padrão aparece em escrita em lote, flush de buffers, compaction, agregação de requests e pipelines de ingestão. O ganho vem do amortecimento de overhead fixo, da melhor locality ou da melhor utilização de links e dispositivos.",
            "O preço é claro: um item pode ficar esperando companhia para formar lote. Em contextos interativos, essa espera extra muitas vezes vale menos do que a economia conseguida.",
          ],
          [
            {
              type: "example",
              title: "Flush por lote",
              body: "Persistir vários itens de uma vez pode aumentar throughput, mas cada item pode aguardar mais tempo até o lote fechar.",
            },
          ],
        ),
        s(
          "regimes-diferentes",
          "Contexto",
          "Otimização correta depende do produto e da classe de workload",
          "Não existe resposta única; existe objetivo explicitado.",
          undefined,
          interactionIds.scenario,
          [
            "Interfaces humanas, chat, jogos e APIs de baixa latência costumam favorecer previsibilidade individual. ETL, indexação, logs e pipelines assíncronos tendem a valorizar vazão sustentada. Plataformas híbridas precisam separar classes de trabalho para não misturar objetivos incompatíveis.",
            "Quando o time não explicita a meta, surge a guerra infinita entre quem quer throughput e quem quer latência — e ambos parecem certos porque estão otimizando problemas diferentes.",
          ],
          [
            {
              type: "insight",
              title: "Objetivo de produto antecede técnica",
              body: "A escolha entre mais vazão e menos atraso só faz sentido quando o valor esperado para o usuário já está claro.",
            },
          ],
        ),
        s(
          "saturacao-e-explosao",
          "Saturação",
          "Perto do limite, o sistema fica muito mais sensível",
          "É nesse ponto que throughput pode até parecer bom enquanto a experiência piora rápido.",
          visualIds.impact,
          undefined,
          [
            "À medida que a utilização se aproxima da capacidade efetiva, há menos margem para absorver variações. O resultado é fila maior e latência mais instável. A matemática detalhada depende do modelo de fila, mas a intuição prática é quase universal.",
            "Esse comportamento explica por que operações com boa média sob carga moderada podem desmoronar em p95 e p99 quando o sistema é apertado um pouco além do confortável.",
          ],
          [
            {
              type: "definition",
              title: "Cauda de latência",
              body: "Parte mais lenta da distribuição, normalmente observada por percentis altos como p95 e p99.",
            },
          ],
        ),
        s(
          "escolha-explicita",
          "Síntese",
          "Pergunte sempre o que você está comprando ao otimizar",
          "Mais throughput, menos latência, menor custo, mais previsibilidade: esses objetivos se combinam, mas raramente na mesma proporção.",
          visualIds.pipeline,
          undefined,
          [
            "A boa engenharia explicita a troca. Se você aumenta lote, diga que está comprando throughput ao preço de espera. Se reduz buffers, diga que está comprando responsividade ao preço de alguma eficiência. O erro é vender uma troca como se fosse ganho gratuito.",
            "Ao nomear a compra e o custo, fica mais fácil discutir design com clareza e defender decisões de performance de forma madura.",
          ],
          [
            {
              type: "insight",
              title: "Trade-off nomeado vira decisão consciente",
              body: "Quando você sabe o que ganhou e o que perdeu, deixa de tratar performance como superstição.",
            },
          ],
        ),
        s(
          "quiz-revisao",
          "Revisão",
          "Quiz de revisão",
          "Teste se latência, throughput, fila e batching ficaram conectados.",
          undefined,
          "quiz",
          ["A aula funciona quando você enxerga a fila como mecanismo central da troca entre tempo individual e vazão agregada."],
          [],
        ),
        s(
          "glossario",
          "Glossário",
          "Termos essenciais",
          "Consolide o vocabulário básico de filas e metas de desempenho.",
          undefined,
          "glossary",
          ["Esses conceitos retornam em SLOs, capacidade, escalabilidade e otimização de pipelines."],
          [],
        ),
      ],
      summaryCards: [
        { title: "Latência e throughput não são sinônimos", body: "Cada um responde a uma pergunta diferente sobre o sistema." },
        { title: "Fila liga um ao outro", body: "Esperas crescem quando a chegada pressiona a capacidade de serviço." },
        { title: "Little's Law organiza a intuição", body: "Mais ocupação para vazão parecida implica mais tempo no sistema." },
        { title: "Cauda importa", body: "Média boa pode coexistir com experiência ruim em percentis altos." },
        { title: "Batching é troca", body: "Amortiza overhead e aumenta vazão, mas adiciona espera por item." },
        { title: "Objetivo do produto decide", body: "A otimização correta depende do valor esperado por workload." },
      ],
      quiz: [
        q(
          "q1",
          "O que a latência mede?",
          "Quanto tempo uma unidade individual de trabalho leva para completar.",
          "Quantas unidades terminam por segundo.",
          "Quantas CPUs o sistema tem.",
          "a",
          "Latência é uma métrica por item, não de vazão agregada.",
        ),
        q(
          "q2",
          "O que o throughput mede?",
          "Quantas unidades o sistema conclui por unidade de tempo.",
          "O maior percentil de latência possível.",
          "O espaço livre no disco.",
          "a",
          "Throughput olha o fluxo agregado de saída.",
        ),
        q(
          "q3",
          "Qual relação expressa Little's Law?",
          "L = λW",
          "S = 1 / (1 - p + p/N)",
          "CPU = RAM / I/O",
          "a",
          "Ela conecta ocupação média, vazão média e tempo médio em regime estável.",
        ),
        q(
          "q4",
          "Por que filas importam tanto para latência?",
          "Porque a espera em fila se soma ao tempo de serviço e pode dominá-lo.",
          "Porque filas sempre aumentam throughput automaticamente.",
          "Porque removem a necessidade de percentis.",
          "a",
          "Latência total inclui tempo aguardando atendimento.",
        ),
        q(
          "q5",
          "Qual efeito típico o batching tem?",
          "Pode melhorar throughput ao preço de maior espera por item antes do processamento.",
          "Sempre reduz latência individual e throughput ao mesmo tempo.",
          "Elimina qualquer overhead de I/O.",
          "a",
          "Batching amortiza custos fixos, mas costuma introduzir atraso de agrupamento.",
        ),
        q(
          "q6",
          "Por que médias de latência podem enganar?",
          "Porque percentis altos podem estar ruins mesmo com média aceitável.",
          "Porque médias sempre são maiores que p99.",
          "Porque throughput substitui toda distribuição.",
          "a",
          "Caudas ruins frequentemente representam melhor a dor do usuário.",
        ),
        q(
          "q7",
          "Qual produto tende a priorizar mais latência do que throughput?",
          "Uma interface interativa em que a pessoa espera resposta na hora.",
          "Um pipeline batch noturno de agregação.",
          "Um job offline sem urgência individual.",
          "a",
          "A experiência humana direta costuma valorizar resposta rápida por item.",
        ),
        q(
          "q8",
          "Qual lição central resume a aula?",
          "Toda otimização compra alguma combinação de tempo individual, vazão, custo e previsibilidade.",
          "Existe um único botão universal para melhorar tudo ao mesmo tempo.",
          "Basta aumentar a fila para ter throughput melhor.",
          "a",
          "A maturidade está em nomear a troca e escolher conscientemente.",
        ),
      ],
      glossary: [
        g("Latência", "Tempo total para uma unidade individual completar."),
        g("Throughput", "Quantidade de unidades concluídas por unidade de tempo."),
        g("Fila", "Acúmulo de itens esperando serviço."),
        g("Tempo de serviço", "Tempo gasto efetivamente processando um item."),
        g("Backlog", "Trabalho acumulado que ainda não foi drenado."),
        g("Little's Law", "Relação entre ocupação média, vazão efetiva e tempo médio no sistema em regime estável."),
        g("Cauda de latência", "Extremo mais lento da distribuição de tempos."),
        g("Percentil", "Ponto da distribuição que mostra quão ruim é a experiência de uma fração dos casos."),
        g("Batching", "Agrupamento de itens para amortizar custos fixos."),
        g("Vazão sustentada", "Throughput mantido de forma estável ao longo do tempo."),
        g("Saturação", "Proximidade do limite de capacidade útil do sistema."),
        g("Interatividade", "Sensibilidade do produto à latência percebida por item."),
      ],
    },
  } satisfies WaveL1LessonDefinition;
})();

const amdahlLimites = (() => {
  const { visualIds, interactionIds } = assetIds("ampdal-e-limites-do-paralelismo");

  return {
    visualIds,
    interactionIds,
    visualConfig: {
      title: "Amdahl e os Limites do Paralelismo",
      subtitle: "A parte serial domina o teto do speedup",
      level: "Intermediário",
      tags: ["Amdahl", "Paralelismo", "Strong Scaling", "Speedup"],
      conceptNodes: ["fração serial", "fração paralela", "núcleos", "overhead"],
      pipelineSteps: ["trabalho original", "parte serial", "parte paralela", "speedup efetivo"],
      leftLabel: "menos núcleos, menos coordenação",
      rightLabel: "mais núcleos, mais ambição",
      impactRows: [
        { label: "Serial", value: "trecho que não divide e limita o teto global" },
        { label: "Paralelo", value: "trecho que pode ser distribuído entre N workers" },
        { label: "Overhead", value: "sync, merge, comunicação e balanceamento" },
        { label: "Speedup", value: "ganho global e não apenas ganho local do trecho paralelo" },
      ],
    },
    interactionConfig: {
      title: "Amdahl e os Limites do Paralelismo",
      pipelineSteps: [
        {
          name: "Separar o trabalho",
          summary:
            "Amdahl começa dividindo o tempo original em parte serial e parte paralelizável.",
          signal: "fração p e 1-p",
          risk: "superestimar o que realmente paraleliza",
          takeaway:
            "Não é o algoritmo em abstrato que importa, e sim qual parte do tempo total atual pode dividir.",
        },
        {
          name: "Distribuir a parte paralela",
          summary:
            "Se p do tempo pode ser dividido por N processadores, essa fatia encolhe aproximadamente para p/N em um modelo ideal.",
          signal: "número de workers",
          risk: "ignorar custo de coordenação",
          takeaway:
            "Mais núcleos ajudam apenas sobre a parte que realmente compartilha o ganho.",
        },
        {
          name: "Somar o teto",
          summary:
            "A parte serial continua inteira e impõe um piso para o tempo final, mesmo com infinitos processadores no modelo ideal.",
          signal: "teto de speedup",
          risk: "fazer promessa linear onde não existe",
          takeaway:
            "O gargalo do futuro costuma ser o trecho que sobrou serial hoje.",
        },
        {
          name: "Confrontar a realidade",
          summary:
            "Sincronização, comunicação e imbalance normalmente reduzem ainda mais o ganho observado.",
          signal: "diferença entre speedup teórico e prático",
          risk: "culpar hardware quando o limite era metodológico",
          takeaway:
            "Amdahl já é um teto idealizado; o mundo real costuma ficar abaixo dele.",
        },
      ],
      leftLabel: "simplicidade",
      rightLabel: "paralelismo",
      tradeoffSummary:
        "Adicionar workers reduz a parte paralelizável, mas aumenta coordenação, contenção e trabalho de orquestração que o modelo ideal não captura.",
      tradeoffRisks: [
        "Poucos workers deixam speedup potencial na mesa.",
        "Bom equilíbrio quando a parte paralela é relevante e o overhead ainda é pequeno.",
        "Coordenação passa a competir com o ganho aritmético.",
        "Mais núcleos podem render pouco se o serial e o overhead já dominam a execução.",
      ],
      practiceRule:
        "Antes de pedir mais paralelismo, estime qual fração do tempo atual realmente é paralelizável e qual trecho serial passa a ser o novo teto.",
      scenarios: [
        {
          name: "Render ou processamento de imagem",
          situation:
            "Muitos pixels ou blocos podem ser tratados em paralelo, mas ainda há setup, leitura e junção final.",
          choice:
            "Aplique Amdahl para lembrar que a fase serial e o merge também contam.",
          why:
            "É comum superestimar o ganho olhando só para o miolo paralelizável.",
          caution:
            "Se a leitura de dados ou a composição final pesa bastante, o speedup real fica muito abaixo do número de núcleos.",
        },
        {
          name: "Serviço com lock central",
          situation:
            "Há várias goroutines ou threads, mas uma estrutura crítica é atualizada serialmente.",
          choice:
            "Enxergue esse trecho central como fração serial do tempo total.",
          why:
            "Sem reduzir o ponto serial, aumentar concorrência pode só ampliar espera em torno do lock.",
          caution:
            "O sistema pode parecer paralelo no desenho e ainda assim comportar-se como quase serial no throughput.",
        },
        {
          name: "Pipeline de dados distribuído",
          situation:
            "A parte de processamento escala, mas comunicação entre stages e shuffle cresce junto.",
          choice:
            "Modele o overhead explicitamente e não venda speedup linear.",
          why:
            "Amdahl ajuda a lembrar que coordenação também entra na conta do tempo final.",
          caution:
            "Paralelismo sem medição de overhead costuma produzir expectativas irreais sobre custo e capacidade.",
        },
      ],
      tone: "emerald",
    },
    content: {
      id: "ampdal-e-limites-do-paralelismo",
      title: "Amdahl e os Limites do Paralelismo",
      subtitle:
        "Adicionar núcleos ajuda apenas na parte que realmente divide; o trecho serial continua cobrando o pedágio inteiro.",
      description:
        "Aula sobre a Lei de Amdahl, strong scaling, fração paralelizável, teto de speedup e como coordenação real faz o ganho observado ficar abaixo do ideal.",
      primaryCategoryId: "computacao",
      secondaryCategoryId: "matematica",
      level: "Intermediário",
      estimatedTime: "50-60 min",
      tags: [
        "Amdahl",
        "Paralelismo",
        "Speedup",
        "Strong Scaling",
        "Overhead",
        "Matemática Aplicada",
      ],
      learningObjectives: [
        "Entender o significado da Lei de Amdahl como limite superior de speedup sob workload fixo.",
        "Derivar a fórmula a partir da divisão entre parte serial e parte paralelizável do tempo original.",
        "Reconhecer a diferença entre ganho local numa etapa e speedup global do programa.",
        "Ler a fração serial como novo gargalo quando a parte paralela melhora.",
        "Entender por que coordenação, comunicação e imbalance reduzem ainda mais o ganho real.",
        "Usar Amdahl como ferramenta de priorização e não como slogan pró ou contra paralelismo.",
      ],
      prerequisites: [
        "Threads, concorrência e noção de coordenação entre workers.",
        "Modelo mental de performance e conceito de gargalo.",
        "Noções básicas de funções e proporções matemáticas.",
      ],
      references: refs(
        "brownAmdahl",
        "openCsfScaling",
        "greggSystemsPerformance",
        "perfWiki",
        "sreMonitoring",
      ),
      heroVisual: visualIds.hero,
      openingText:
        "Paralelismo costuma ser vendido como multiplicador linear: dobre núcleos, dobre velocidade. Na prática, isso quase nunca acontece. A Lei de Amdahl é valiosa justamente porque corta essa fantasia com uma pergunta simples: qual fração do tempo total atual realmente pode ser dividida? Se parte importante da execução continua serial, ou se o paralelismo exige muita coordenação, o ganho global encontra um teto muito antes do que a intuição otimista gostaria.",
      quickFacts: [
        { title: "Amdahl fala de speedup global", body: "Não basta acelerar um trecho; importa o efeito sobre o programa inteiro." },
        { title: "A parte serial sobrevive", body: "Ela continua inteira mesmo quando a parte paralela melhora muito." },
        { title: "É um teto ideal", body: "A fórmula clássica assume paralelismo perfeito na parte paralelizável." },
        { title: "O mundo real fica abaixo", body: "Sync, comunicação e imbalance costumam corroer o ganho teórico." },
      ],
      sections: [
        s(
          "intuicao-central",
          "Intuição",
          "Paralelizar tudo o que dá não elimina o que não dá",
          "Amdahl é uma maneira disciplinada de lembrar que o trecho serial continua pesando no resultado global.",
          visualIds.concept,
          undefined,
          [
            "Imagine um programa cujo tempo total se divide entre uma parte serial e uma parte paralelizável. Mesmo que a parte paralela fique muito rápida com mais workers, a parte serial permanece inteira e passa a dominar cada vez mais a fração do tempo final.",
            "É por isso que speedup global não acompanha automaticamente a velocidade do trecho otimizado. O gargalo encolhe de um lado e se concentra do outro.",
          ],
          [
            {
              type: "definition",
              title: "Speedup",
              body: "Razão entre o tempo original e o tempo após a otimização ou paralelização.",
            },
          ],
        ),
        s(
          "derivacao",
          "Fórmula",
          "A forma clássica de Amdahl para N processadores",
          "Se p é a fração paralelizável do tempo original, o speedup teórico máximo fica limitado pela soma da parte serial com a parte paralela dividida por N.",
          visualIds.pipeline,
          interactionIds.pipeline,
          [
            "Usando p para a fração do tempo original que pode ser paralelizada, e 1-p para a fração serial, o tempo paralelo ideal vira (1-p) + p/N em unidades normalizadas do tempo original. O speedup então é o inverso disso.",
            "A fórmula clássica, sob esse modelo ideal de strong scaling, fica S(N) = 1 / ((1 - p) + p/N). Se N cresce muito, p/N tende a zero, mas a parcela 1-p continua lá.",
          ],
          [
            {
              type: "formula",
              title: "Lei de Amdahl",
              body: "Limite teórico de speedup sob workload fixo e paralelismo ideal da parte paralela.",
              formula: "S(N) = 1 / ((1 - p) + p/N)",
            },
          ],
        ),
        s(
          "o-que-p-representa",
          "Cuidado",
          "p é fração do tempo, não fração de linhas de código",
          "Esse detalhe evita uma leitura ingênua da fórmula.",
          undefined,
          undefined,
          [
            "É comum alguém olhar um módulo grande e concluir que ele é 'a maior parte do sistema'. Amdahl, porém, não fala do tamanho visual do código nem do número de funções; fala da fração do tempo total original gasta naquela parte.",
            "Uma seção pequena do código pode dominar o runtime. Uma seção enorme pode ser quase irrelevante para speedup. É por isso que profiling e medição entram antes da matemática aplicada.",
          ],
          [
            {
              type: "mistake",
              title: "Usar p como porcentagem do código-fonte",
              body: "A variável representa participação no tempo original da execução, não quantidade de arquivos, funções ou linhas.",
            },
          ],
        ),
        s(
          "limite-assintotico",
          "Teto",
          "Mesmo com infinitos processadores, o serial fixa um limite",
          "Quando N cresce muito, a parte p/N quase desaparece, mas o trecho serial vira o chão do tempo final.",
          visualIds.tradeoff,
          interactionIds.tradeoff,
          [
            "No limite ideal N -> infinito, o speedup tende a 1 / (1 - p). Essa observação é poderosa porque transforma a fração serial em teto absoluto do ganho. Se 10% do tempo fica inevitavelmente serial no modelo, o speedup ideal jamais ultrapassa 10x.",
            "Mais importante do que decorar números é absorver a lógica: à medida que o paralelo melhora, o que sobrou serial se torna cada vez mais caro em termos relativos.",
          ],
          [
            {
              type: "insight",
              title: "O gargalo do futuro é o serial que sobrou",
              body: "Toda otimização bem-sucedida torna mais visível aquilo que não foi otimizado.",
            },
          ],
        ),
        s(
          "overhead-real",
          "Realidade",
          "O mundo real acrescenta coordenação, comunicação e imbalance",
          "Amdahl clássico já é otimista porque supõe paralelismo perfeito na parte paralela.",
          visualIds.impact,
          undefined,
          [
            "Na prática, workers precisam sincronizar, disputar recursos, balancear lotes, mover dados e reunir resultados. Esses custos entram no tempo final e diminuem o speedup observado em relação ao teto teórico.",
            "Essa é uma razão importante para não vender paralelismo como upgrade gratuito: a infra de coordenação também consome CPU, memória e atenção do runtime.",
          ],
          [
            {
              type: "definition",
              title: "Overhead de paralelismo",
              body: "Custo adicional de coordenar, comunicar, sincronizar ou balancear trabalho entre workers.",
            },
          ],
        ),
        s(
          "priorizacao",
          "Priorização",
          "Amdahl serve mais para escolher foco do que para fazer propaganda",
          "A pergunta útil é: qual trecho do tempo total vale mais a pena atacar agora?",
          undefined,
          interactionIds.scenario,
          [
            "Se uma parte minúscula do runtime pode receber speedup enorme, o ganho global ainda pode ser pequeno. Se uma parte moderada concentra grande fatia do tempo, pequenas melhorias ali podem render mais valor total.",
            "A grande virtude pedagógica de Amdahl é essa disciplina de olhar participação no custo global antes de investir energia de engenharia.",
          ],
          [
            {
              type: "example",
              title: "Lock central",
              body: "Mesmo com muitas threads, um lock crítico pode representar a fração serial que impede o throughput de escalar.",
            },
          ],
        ),
        s(
          "strong-scaling",
          "Escopo",
          "Amdahl conversa com strong scaling: workload fixo",
          "Ou seja, estamos perguntando quanto o mesmo trabalho acelera ao adicionar recursos paralelos.",
          visualIds.pipeline,
          undefined,
          [
            "Essa moldura importa. Em outros contextos, o workload cresce junto com os recursos e a interpretação muda. Para esta aula, a ideia relevante é: se o trabalho total permanece o mesmo, o quanto a paralelização reduz o tempo até a resposta?",
            "Guardar o escopo evita usar a lei em debates errados. Ela é excelente para lembrar limites sob workload fixo e para combater expectativas lineares irreais.",
          ],
          [
            {
              type: "insight",
              title: "Fórmula sem contexto vira slogan",
              body: "Amdahl é mais útil quando você sabe sob quais suposições a está aplicando.",
            },
          ],
        ),
        s(
          "leitura-operacional",
          "Síntese",
          "A pergunta madura não é 'quantos núcleos tenho?', mas 'quanto do tempo atual eles podem realmente atacar?'",
          "Essa troca de pergunta já torna o debate de paralelismo muito mais sério.",
          visualIds.impact,
          undefined,
          [
            "Antes de investir em mais paralelismo, estime a fração de tempo global afetada, o provável overhead de coordenação e o que se tornará o próximo teto depois da melhoria. É assim que a fórmula vira prática.",
            "Quando usada desse jeito, Amdahl não desencoraja paralelismo. Ela só impede que o time confunda desejo de escalar com evidência de escalabilidade.",
          ],
          [
            {
              type: "mistake",
              title: "Prometer speedup linear por padrão",
              body: "Sem medir a fração serial e o overhead, essa promessa é mais marketing do que engenharia.",
            },
          ],
        ),
        s(
          "quiz-revisao",
          "Revisão",
          "Quiz de revisão",
          "Teste se a leitura correta da fórmula e dos limites ficou firme.",
          undefined,
          "quiz",
          ["O alvo da aula é fazer você pensar em speedup global e fração do tempo, não em contagem de linhas ou núcleos."],
          [],
        ),
        s(
          "glossario",
          "Glossário",
          "Termos essenciais",
          "Consolide o vocabulário de paralelismo e speedup.",
          undefined,
          "glossary",
          ["Esses termos voltam em profiling paralelo, lock contention, sharding e pipelines distribuídos."],
          [],
        ),
      ],
      summaryCards: [
        { title: "Amdahl fala do todo", body: "Speedup relevante é o do programa inteiro, não só do trecho otimizado." },
        { title: "p é fração do tempo", body: "A variável representa participação no runtime original." },
        { title: "O serial impõe teto", body: "Mesmo com N muito grande, a parte serial não desaparece." },
        { title: "A fórmula é idealizada", body: "Coordenação e comunicação reais reduzem o ganho observado." },
        { title: "Paralelismo desloca gargalos", body: "Melhorar um lado torna o restante relativamente mais caro." },
        { title: "Amdahl ajuda a priorizar", body: "Ela orienta onde vale investir esforço de engenharia." },
      ],
      quiz: [
        q(
          "q1",
          "Na Lei de Amdahl, o que p representa?",
          "A fração do tempo original que pode ser paralelizada.",
          "A porcentagem de linhas de código paralelas.",
          "O número de processadores disponíveis.",
          "a",
          "O ponto crucial é que p mede participação no runtime, não tamanho do código.",
        ),
        q(
          "q2",
          "Qual é a forma clássica da Lei de Amdahl para N processadores?",
          "S(N) = 1 / ((1 - p) + p/N)",
          "L = λW",
          "S(N) = N / p",
          "a",
          "Essa é a formulação clássica de strong scaling com paralelismo ideal da parte paralela.",
        ),
        q(
          "q3",
          "O que acontece com a parte serial quando N aumenta muito?",
          "Ela continua inteira e passa a dominar o teto do speedup.",
          "Ela é dividida automaticamente entre todos os núcleos.",
          "Ela desaparece por efeito de cache.",
          "a",
          "Amdahl é justamente o lembrete de que o serial não some.",
        ),
        q(
          "q4",
          "Por que a fórmula clássica de Amdahl é otimista?",
          "Porque assume paralelismo perfeito da parte p e não inclui overhead real.",
          "Porque supõe mais código do que existe.",
          "Porque modela apenas disco e rede.",
          "a",
          "Coordenação, imbalance e comunicação costumam piorar o speedup observado.",
        ),
        q(
          "q5",
          "Qual leitura está errada sobre p?",
          "Tratar p como porcentagem do código-fonte.",
          "Tratá-lo como fração do tempo original.",
          "Usá-lo para discutir participação no runtime.",
          "a",
          "A grande armadilha é confundir tamanho visual de código com tempo de execução.",
        ),
        q(
          "q6",
          "Para que Amdahl é especialmente útil em engenharia?",
          "Para priorizar trechos cujo ganho global potencial realmente vale o esforço.",
          "Para provar que paralelismo nunca compensa.",
          "Para substituir profiling real.",
          "a",
          "Ela organiza investimento em otimização segundo impacto total.",
        ),
        q(
          "q7",
          "O que o overhead de paralelismo inclui?",
          "Custo de sincronização, comunicação, balanceamento e merge.",
          "Apenas a contagem de CPUs físicas.",
          "Somente o consumo de energia do monitor.",
          "a",
          "Esse overhead explica por que o speedup real fica abaixo do teórico.",
        ),
        q(
          "q8",
          "Qual pergunta resume a leitura madura desta aula?",
          "Quanto do tempo atual realmente pode ser atacado por mais paralelismo?",
          "Quantos núcleos posso anunciar no slide?",
          "Posso paralelizar todas as funções do projeto?",
          "a",
          "Essa pergunta desloca o foco de hardware para impacto real no runtime.",
        ),
      ],
      glossary: [
        g("Lei de Amdahl", "Limite teórico de speedup quando só parte do trabalho pode ser paralelizada."),
        g("Speedup", "Razão entre tempo original e tempo após otimização."),
        g("Fração serial", "Parte do tempo total que não se beneficia do paralelismo considerado."),
        g("Fração paralelizável", "Parte do tempo total que pode ser distribuída entre workers."),
        g("Strong scaling", "Análise do ganho ao adicionar recursos mantendo o workload fixo."),
        g("Overhead de paralelismo", "Custo adicional de coordenar workers paralelos."),
        g("Sincronização", "Coordenação temporal entre partes concorrentes."),
        g("Imbalance", "Distribuição desigual de trabalho entre workers."),
        g("Merge", "Etapa de reunir ou consolidar resultados paralelos."),
        g("Teto de speedup", "Máximo ganho global possível sob certas hipóteses."),
        g("Gargalo serial", "Trecho que passa a dominar após melhorar a parte paralela."),
        g("Workload fixo", "Mesma quantidade total de trabalho sendo comparada em diferentes configurações."),
      ],
    },
  } satisfies WaveL1LessonDefinition;
})();

const custoAbstracoes = (() => {
  const { visualIds, interactionIds } = assetIds("custo-de-abstracoes");

  return {
    visualIds,
    interactionIds,
    visualConfig: {
      title: "Custo de Abstrações",
      subtitle: "Zero-cost vs 'parece barato'",
      level: "Intermediário",
      tags: ["Abstrações", "Allocations", "Dispatch", "Zero-cost", "Overhead"],
      conceptNodes: ["ergonomia", "alocação", "indireção", "movimento de dados"],
      pipelineSteps: ["fonte", "expansão runtime", "custos ocultos", "medição"],
      leftLabel: "ergonomia e clareza",
      rightLabel: "controle explícito do hot path",
      impactRows: [
        { label: "Alocações", value: "objetos temporários, buffers e pressão de GC/allocator" },
        { label: "Despacho", value: "indireção dinâmica ou fronteiras que impedem otimização" },
        { label: "Cópias", value: "movimento de dados que parecia 'só um detalhe'" },
        { label: "Syscalls ocultas", value: "camadas convenientes podem atravessar o kernel mais do que parece" },
      ],
    },
    interactionConfig: {
      title: "Custo de Abstrações",
      pipelineSteps: [
        {
          name: "Ler a intenção",
          summary:
            "A abstração descreve uma ideia melhor do que o código manual, mas isso ainda não responde quanto custa executá-la.",
          signal: "semântica de alto nível",
          risk: "achar que legibilidade implica custo zero ou custo alto por definição",
          takeaway:
            "Abstração não é vilã nem heroína; ela precisa ser interrogada no runtime certo.",
        },
        {
          name: "Desdobrar em mecanismos",
          summary:
            "Pergunte se a camada cria alocações, cópias, despacho dinâmico, boxing, syscalls extras ou impede otimizações do compilador.",
          signal: "mecanismo concreto",
          risk: "tratar sintaxe agradável como se não se traduzisse em nada",
          takeaway:
            "Todo custo vem de algum mecanismo concreto, mesmo quando a API esconde bem esse mecanismo.",
        },
        {
          name: "Classificar o caminho",
          summary:
            "Fora do hot path, uma abstração mais cara pode ser um ótimo negócio de manutenção. Dentro dele, o mesmo custo pode virar gargalo.",
          signal: "temperatura do caminho",
          risk: "otimizar abstrações frias e deixar quentes intactas",
          takeaway:
            "O contexto de uso decide se o custo é aceitável ou dominante.",
        },
        {
          name: "Medir no build certo",
          summary:
            "Claim de zero-cost depende do que o compilador consegue remover em release, não do que parece quando você lê o código.",
          signal: "assembly, profiling e benchmark otimizado",
          risk: "medir debug e tirar conclusão sobre produção",
          takeaway:
            "Abstração só vira 'de graça' depois que as otimizações certas realmente acontecem.",
        },
      ],
      leftLabel: "conveniência",
      rightLabel: "controle",
      tradeoffSummary:
        "Abstrações elevam produtividade e segurança, mas podem esconder custo de alocação, despacho ou cópia nos lugares mais sensíveis do sistema.",
      tradeoffRisks: [
        "Controle demais espalha complexidade onde o custo nem era relevante.",
        "Boa ergonomia com chance de o compilador ou runtime remover parte do overhead.",
        "Alguma penalidade já começa a importar em trechos quentes.",
        "Você ganha previsibilidade do hot path, mas paga com código mais manual e menos flexível.",
      ],
      practiceRule:
        "Desça um nível só depois de localizar o hot path e nomear o mecanismo concreto que a abstração está cobrando.",
      scenarios: [
        {
          name: "Iterator em release",
          situation:
            "Uma pipeline expressiva de transformação roda em build otimizada de Rust.",
          choice:
            "Considere seriamente a hipótese de zero-cost e meça antes de reescrever em loop manual.",
          why:
            "O compilador pode inlinear e remover camadas, produzindo código equivalente ao manual.",
          caution:
            "Medir em debug ou sem workload real faz a abstração parecer mais cara do que será no ambiente final.",
        },
        {
          name: "API que clona buffers",
          situation:
            "Uma função confortável copia dados grandes em cada chamada para simplificar ownership ou mutabilidade.",
          choice:
            "Olhe para volume de cópia e frequência antes de decidir se a ergonomia continua valendo o preço.",
          why:
            "Às vezes o problema não é o algoritmo, e sim o movimento de dados escondido pela conveniência.",
          caution:
            "Trocar tudo por ponteiros ou mutabilidade compartilhada sem necessidade pode piorar manutenção e bugs.",
        },
        {
          name: "Interface dinâmica em caminho quente",
          situation:
            "Um ponto muito executado faz despacho indireto e aloca pequenos objetos em cada iteração.",
          choice:
            "Avalie especialização, static dispatch ou buffers reutilizáveis nesse trecho específico.",
          why:
            "No hot path, pequenos custos repetidos milhares de vezes podem virar parcela dominante.",
          caution:
            "Faça a cirurgia só no caminho quente e preserve a abstração onde ela continua pagando mais do que custa.",
        },
      ],
      tone: "rose",
    },
    content: {
      id: "custo-de-abstracoes",
      title: "Custo de Abstrações",
      subtitle:
        "O que parece uma chamada inocente pode esconder alocação, cópia, despacho indireto ou até uma viagem extra ao kernel.",
      description:
        "Aula interativa sobre custo real de abstrações, zero-cost abstractions, alocações, cópias, despacho dinâmico e como decidir quando descer um nível no hot path.",
      primaryCategoryId: "computacao",
      secondaryCategoryId: "engenharia",
      level: "Intermediário",
      estimatedTime: "50-60 min",
      tags: [
        "Abstrações",
        "Zero-cost",
        "Allocations",
        "Dispatch",
        "Overhead",
        "Hot Path",
      ],
      learningObjectives: [
        "Entender que toda abstração deve ser analisada pelo mecanismo que produz no runtime.",
        "Identificar fontes comuns de custo escondido: alocação, cópia, boxing, despacho indireto e syscalls extras.",
        "Distinguir abstrações cujo custo some em release daquelas que realmente cobram no hot path.",
        "Relacionar contexto de uso a aceitabilidade do overhead introduzido pela camada.",
        "Usar profiling e benchmarking corretos para decidir quando vale descer um nível.",
        "Evitar tanto o dogma 'abstração é sempre ruim' quanto o dogma 'abstração é sempre grátis'.",
      ],
      prerequisites: [
        "Caches, memória e movemento de dados como custos reais.",
        "Noção de profiling e benchmarking para validar overhead.",
        "Noções básicas de compilação e otimizações de release.",
      ],
      references: refs(
        "rustIteratorsPerformance",
        "rustBlackBox",
        "goDiagnostics",
        "greggSystemsPerformance",
        "csapp",
      ),
      heroVisual: visualIds.hero,
      openingText:
        "Abstração é uma das grandes vitórias da engenharia de software: ela condensa intenção, reduz repetição e torna sistemas maiores governáveis. O problema é que o runtime não executa intenção; ele executa mecanismos. Uma API elegante pode criar objetos temporários, clonar buffers, fazer dispatch indireto ou bloquear otimizações do compilador. Em alguns contextos isso é um preço excelente. Em outros, especialmente no hot path, esse preço vira o gargalo principal. Aprender custo de abstrações é aprender a traduzir conforto sintático em consequências operacionais.",
      quickFacts: [
        { title: "Custo vem de mecanismo", body: "Alguém precisa alocar, copiar, despachar ou sincronizar a abstração." },
        { title: "Zero-cost é condicional", body: "Depende do que o compilador consegue remover no build e no contexto reais." },
        { title: "Hot path muda a conta", body: "Custos pequenos repetidos milhões de vezes deixam de ser pequenos." },
        { title: "Não é guerra contra ergonomia", body: "O objetivo é localizar onde a abstração vale o preço e onde não vale." },
      ],
      sections: [
        s(
          "traducao-runtime",
          "Princípio",
          "Toda abstração precisa ser traduzida em mecanismos concretos",
          "A pergunta central não é 'a API é bonita?', mas 'o que ela força a máquina a fazer?'.",
          visualIds.concept,
          undefined,
          [
            "Uma função genérica, um iterator chain, um trait object, um builder conveniente ou uma coleção temporária têm custos potenciais diferentes. Alguns deles somem com otimização. Outros permanecem porque refletem trabalho real que alguém precisa executar.",
            "A disciplina útil é decompor abstração em mecanismos: aloca? copia? indireta? sincroniza? chama o kernel? impede inlining? Esse vocabulário troca intuição vaga por análise operacional.",
          ],
          [
            {
              type: "definition",
              title: "Custo de abstração",
              body: "Overhead adicional — ou economia — que uma camada de alto nível produz quando é traduzida em execução real.",
            },
          ],
        ),
        s(
          "fontes-comuns",
          "Fontes",
          "Alocação, cópia e despacho são cobradores recorrentes",
          "Grande parte do preço escondido aparece como criação de objetos temporários, movemento de dados e indireção.",
          visualIds.pipeline,
          interactionIds.pipeline,
          [
            "Alocação frequente pressiona allocator ou GC. Cópia excessiva aumenta tráfego de memória. Despacho indireto pode reduzir otimizações, prejudicar branch prediction e complicar o hot path. Syscalls extras introduzem outra classe de custo, ainda mais alta.",
            "Nem todo uso dessas técnicas é ruim. O ponto é que elas precisam estar visíveis na cabeça do engenheiro ao avaliar uma API muito confortável em trechos sensíveis.",
          ],
          [
            {
              type: "example",
              title: "Buffer temporário por request",
              body: "Uma API simples de usar pode parecer limpa e ainda assim criar várias estruturas efêmeras por chamada.",
            },
          ],
        ),
        s(
          "zero-cost-na-pratica",
          "Zero-cost",
          "Zero-cost abstractions não significam 'magia', e sim remoção de overhead pelo compilador",
          "O exemplo clássico é a promessa de que certos iterators em Rust podem compilar para código equivalente ao manual.",
          undefined,
          undefined,
          [
            "O Rust Book mostra que iterators podem ter custo runtime equivalente a loops manuais em release porque inlining, monomorfização e outras otimizações removem a camada abstrata no código final.",
            "Isso não significa que toda abstração em toda linguagem seja gratuita. Significa apenas que algumas abstrações foram desenhadas para possibilitar essa remoção em certos contextos e builds.",
          ],
          [
            {
              type: "insight",
              title: "Zero-cost é propriedade do código gerado",
              body: "A prova não está na elegância da sintaxe, mas no que sobra depois da compilação otimizada.",
            },
          ],
        ),
        s(
          "build-importa",
          "Build",
          "Medir em debug pode contar a história errada",
          "Muitas abstrações só se aproximam do custo mínimo quando as otimizações do compilador entram em jogo.",
          visualIds.tradeoff,
          interactionIds.tradeoff,
          [
            "Se você mede iterator-heavy code em build sem otimização, pode concluir erroneamente que a abstração é cara por natureza. Em release, parte desse custo pode evaporar.",
            "Essa lição vale além de Rust. Qualquer benchmark ou profiling usado para decidir sobre abstrações precisa refletir o caminho de compilação e execução mais próximo do ambiente real.",
          ],
          [
            {
              type: "mistake",
              title: "Julgar abstração pelo build errado",
              body: "Você pode atacar uma camada elegante e segura por causa de um número produzido num modo de compilação irrelevante para produção.",
            },
          ],
        ),
        s(
          "temperatura-do-caminho",
          "Contexto",
          "A mesma abstração é barata num lugar e cara em outro",
          "Tudo depende de frequência, volume de dados e posição no caminho crítico.",
          visualIds.impact,
          undefined,
          [
            "Fora do hot path, overheads modestos podem ser completamente aceitáveis em troca de clareza, segurança e menor custo de manutenção. Dentro do hot path, os mesmos overheads podem se tornar dominantes apenas por repetição massiva.",
            "É por isso que a pergunta 'vale a pena?' sempre precisa de contexto: quantas vezes roda, sobre quantos dados, em qual etapa da latência total e sob qual tipo de carga?",
          ],
          [
            {
              type: "definition",
              title: "Hot path",
              body: "Trecho de execução acionado com muita frequência ou grande participação no tempo total do sistema.",
            },
          ],
        ),
        s(
          "quando-descer-um-nivel",
          "Decisão",
          "Descer um nível faz sentido quando o mecanismo e o impacto já foram nomeados",
          "Trocar abstração por código manual é cirurgia localizada, não filosofia geral.",
          undefined,
          interactionIds.scenario,
          [
            "Se profiling e benchmark mostram que um ponto específico concentra alocação, cópia ou dispatch caro, pode fazer sentido especializar, reutilizar buffer, materializar menos estruturas ou usar uma representação mais direta.",
            "A parte mais importante é o escopo. Você não precisa tornar o sistema inteiro mais baixo nível; precisa tratar o trecho em que a abstração está cobrando mais do que vale.",
          ],
          [
            {
              type: "insight",
              title: "Otimização local, abstração global",
              body: "Muitas bases saudáveis preservam APIs boas e abrem exceções cuidadosamente nos pontos realmente quentes.",
            },
          ],
        ),
        s(
          "medicao-honesta",
          "Validação",
          "Profiling e benchmark são o juiz final",
          "A abstração só pode ser condenada ou inocentada depois de medir no workload e no build corretos.",
          visualIds.impact,
          undefined,
          [
            "É fácil imaginar custo onde não existe e ignorar custo onde existe. Perfis e benchmarks corretos servem justamente para transformar essa intuição em evidência: quantas alocações? quantas cópias? qual o peso no tempo total? qual a diferença em release?",
            "Sem essa validação, você pode sacrificar ergonomia, segurança e capacidade de evolução do código em troca de ganhos minúsculos ou inexistentes.",
          ],
          [
            {
              type: "mistake",
              title: "Refatorar por estética de baixo nível",
              body: "Código mais manual só vale quando a evidência mostra que o ganho compensa o custo de complexidade.",
            },
          ],
        ),
        s(
          "regra-pratica",
          "Síntese",
          "Pergunte qual mecanismo a camada introduz e se ele está quente o suficiente para importar",
          "Essa pergunta costuma ser melhor do que debates genéricos sobre pureza ou performance.",
          visualIds.pipeline,
          undefined,
          [
            "Quando alguém diz 'essa abstração é lenta', peça tradução: lenta por quê? alocação? cópia? dispatch? sincronização? kernel crossing? Sem mecanismo, o diagnóstico ainda não existe.",
            "Quando o mecanismo existe e o trecho é quente, a discussão fica adulta. A partir daí, dá para escolher entre manter, ajustar ou abrir exceção de forma consciente.",
          ],
          [
            {
              type: "insight",
              title: "Mecanismo + frequência = relevância",
              body: "Esse par simples organiza quando vale se preocupar com custo de abstração.",
            },
          ],
        ),
        s(
          "quiz-revisao",
          "Revisão",
          "Quiz de revisão",
          "Teste se abstração, mecanismo e hot path ficaram bem conectados.",
          undefined,
          "quiz",
          ["A meta é saber traduzir conforto de API em trabalho real de runtime sem cair em dogmas."],
          [],
        ),
        s(
          "glossario",
          "Glossário",
          "Termos essenciais",
          "Consolide o vocabulário para discutir overhead de camadas de alto nível.",
          undefined,
          "glossary",
          ["Esses termos retornam em Rust, Go, runtimes, allocators e profiling de código quente."],
          [],
        ),
      ],
      summaryCards: [
        { title: "Abstração vira mecanismo", body: "O runtime executa alocação, cópia, dispatch e sync, não intenção." },
        { title: "Zero-cost é específico", body: "Algumas camadas somem em release; outras não." },
        { title: "Build importa", body: "Medir debug pode inventar um custo que não existirá em produção." },
        { title: "Hot path decide", body: "O mesmo overhead pode ser irrelevante num trecho frio e crítico num trecho quente." },
        { title: "Cirurgia deve ser localizada", body: "Descer um nível vale onde há evidência e impacto real." },
        { title: "Medição fecha a conversa", body: "Sem profiling e benchmark corretos, abstração vira discussão ideológica." },
      ],
      quiz: [
        q(
          "q1",
          "Qual pergunta melhor inicia a análise de uma abstração?",
          "Que mecanismo concreto ela introduz no runtime?",
          "O nome dela parece sofisticado?",
          "Ela usa generics?",
          "a",
          "A resposta precisa vir em termos de alocação, cópia, dispatch, sync ou I/O, por exemplo.",
        ),
        q(
          "q2",
          "O que significa dizer que uma abstração é zero-cost?",
          "Que seu overhead runtime pode ser removido ou reduzido a equivalente manual no código gerado otimizado.",
          "Que ela nunca faz alocação em hipótese alguma.",
          "Que ela é gratuita até em debug build.",
          "a",
          "A propriedade relevante aparece no código final, não só na API.",
        ),
        q(
          "q3",
          "Por que alocação frequente costuma preocupar?",
          "Porque adiciona trabalho de allocator ou GC e movimento extra de memória.",
          "Porque impede qualquer tipo de paralelismo.",
          "Porque sempre dobra a latência do sistema inteiro.",
          "a",
          "O efeito exato varia, mas a classe de custo é real e recorrente.",
        ),
        q(
          "q4",
          "Qual risco existe ao medir uma abstração apenas em debug?",
          "Concluir que ela é cara por natureza quando o custo podia ser removido em release.",
          "Eliminar completamente branch prediction.",
          "Fazer o compilador ignorar syscalls.",
          "a",
          "O caminho de compilação errado distorce a decisão.",
        ),
        q(
          "q5",
          "Quando um overhead pequeno costuma se tornar importante?",
          "Quando aparece repetidamente em um hot path ou em grande volume de dados.",
          "Somente quando o código é orientado a objetos.",
          "Apenas em aplicações sem rede.",
          "a",
          "Frequência e posição no caminho crítico transformam custos modestos em dominantes.",
        ),
        q(
          "q6",
          "Qual atitude é mais madura diante de uma abstração suspeita?",
          "Localizar o hot path, medir e então decidir se abre exceção localizada.",
          "Reescrever toda a base em estilo manual imediatamente.",
          "Ignorar qualquer profiling e confiar na estética do código.",
          "a",
          "Otimização localizada costuma preservar mais ergonomia e segurança.",
        ),
        q(
          "q7",
          "Qual é o erro da frase 'abstrações são sempre lentas'?",
          "Ela ignora contexto, build, mecanismo concreto e capacidade do compilador de remover overhead.",
          "Ela exagera apenas no caso de Python.",
          "Ela é falsa porque toda abstração é garantidamente gratuita.",
          "a",
          "O custo depende de tradução, temperatura do caminho e ambiente.",
        ),
        q(
          "q8",
          "Qual dupla resume melhor a relevância do custo de abstração?",
          "Mecanismo concreto + frequência no caminho crítico.",
          "Quantidade de classes + cor do tema do editor.",
          "Tamanho do arquivo + idade do projeto.",
          "a",
          "Essa combinação explica por que um custo existe e se vale a pena atacá-lo.",
        ),
      ],
      glossary: [
        g("Abstração", "Camada que permite expressar ideias de forma mais alta ou mais segura."),
        g("Overhead", "Custo adicional introduzido por uma técnica ou camada."),
        g("Zero-cost abstraction", "Abstração cujo overhead runtime pode desaparecer no código gerado otimizado."),
        g("Alocação", "Reserva de memória em tempo de execução."),
        g("Dispatch dinâmico", "Escolha de implementação em runtime por indireção."),
        g("Inlining", "Substituição de chamada por corpo de função pelo compilador."),
        g("Monomorfização", "Geração de versões especializadas de código genérico em tempo de compilação."),
        g("Hot path", "Trecho que participa fortemente do tempo total ou roda com muita frequência."),
        g("Cópia", "Duplicação de dados entre buffers ou estruturas."),
        g("Boxing", "Encapsulamento de valor em representação mais indireta, frequentemente alocada."),
        g("Build otimizado", "Compilação com otimizações relevantes para o ambiente de produção."),
        g("Exceção localizada", "Otimização específica aplicada apenas onde a abstração cobra caro demais."),
      ],
    },
  } satisfies WaveL1LessonDefinition;
})();

const flamegraphsEProfiling = (() => {
  const { visualIds, interactionIds } = assetIds("flamegraphs-e-profiling");

  return {
    visualIds,
    interactionIds,
    visualConfig: {
      title: "Flamegraphs e Profiling",
      subtitle: "Ver para onde o tempo realmente vai",
      level: "Intermediário",
      tags: ["Flamegraph", "Profiling", "perf", "pprof", "Sampling"],
      conceptNodes: ["amostragem", "stacks", "largura", "interpretação"],
      pipelineSteps: ["coletar", "agregar", "visualizar", "validar"],
      leftLabel: "baixo overhead",
      rightLabel: "mais detalhe contextual",
      impactRows: [
        { label: "On-CPU", value: "onde a thread realmente gastou amostras executando" },
        { label: "Off-CPU", value: "onde o tempo some em espera, bloqueio ou dormência" },
        { label: "Flat", value: "tempo próprio de um frame sem filhos" },
        { label: "Cumulative", value: "tempo somado com todos os descendentes da pilha" },
      ],
    },
    interactionConfig: {
      title: "Flamegraphs e Profiling",
      pipelineSteps: [
        {
          name: "Coletar amostras",
          summary:
            "Sampling captura snapshots periódicos do stack para estimar onde o programa passa mais tempo.",
          signal: "frequência de amostragem",
          risk: "esperar precisão de relógio em uma técnica probabilística",
          takeaway:
            "Profiling por amostragem não mede cada evento; ele estima hotspots pelo volume de amostras.",
        },
        {
          name: "Agrupar stacks",
          summary:
            "Stacks iguais ou parecidos são combinados para revelar caminhos de execução quentes.",
          signal: "agregação por pilha",
          risk: "olhar frames isolados sem contexto de chamada",
          takeaway:
            "A força do flamegraph está em visualizar caminhos, não apenas funções soltas.",
        },
        {
          name: "Interpretar a figura",
          summary:
            "A largura de cada caixa representa peso amostral; a altura representa profundidade de chamada, não passagem de tempo cronológica.",
          signal: "largura e ancestry",
          risk: "achar que o eixo x é linha do tempo",
          takeaway:
            "Flamegraph é mapa de densidade de stacks, não filme da execução.",
        },
        {
          name: "Voltar ao sistema",
          summary:
            "O perfil aponta onde investigar, mas ainda precisa ser lido junto de workload, métricas e compreensão do produto.",
          signal: "hipótese validada",
          risk: "otimizar qualquer barra larga sem perguntar se ela é causa, efeito ou ruído esperado",
          takeaway:
            "Profiling é parte do ciclo de medição, não atalho para pular entendimento do problema.",
        },
      ],
      leftLabel: "coleta leve",
      rightLabel: "coleta rica",
      tradeoffSummary:
        "Sampling costuma ser leve e ótimo para hotspots on-CPU; tracing e perfis mais ricos explicam mais contexto, mas com overhead e volume maiores.",
      tradeoffRisks: [
        "Baixo impacto operacional, porém menos contexto fino para certos tipos de espera.",
        "Bom ponto de partida para localizar regiões quentes sem perturbar muito.",
        "Mais detalhe ajuda a explicar relações, mas torna a coleta mais cara e mais difícil de operar.",
        "Excesso de instrumentação pode transformar a investigação em problema de observabilidade da própria observabilidade.",
      ],
      practiceRule:
        "Use profiling para descobrir onde olhar; use conhecimento do workload para decidir o que fazer com o que você viu.",
      scenarios: [
        {
          name: "CPU alta",
          situation:
            "O processo mantém núcleos ocupados e o objetivo é entender quais caminhos de chamada concentram o consumo.",
          choice:
            "Sampling on-CPU com perf ou pprof é um excelente ponto de partida.",
          why:
            "Ele mostra hotspots reais com overhead relativamente baixo e boa visão estrutural.",
          caution:
            "Nem toda barra larga é necessariamente bug; algumas são simplesmente trabalho útil esperado.",
        },
        {
          name: "Threads esperando",
          situation:
            "A aplicação parece lenta, mas pouco tempo aparece on-CPU.",
          choice:
            "Pense em perfis off-CPU, block, mutex ou métricas de espera além do flamegraph tradicional on-CPU.",
          why:
            "O tempo pode estar sumindo em locks, I/O ou filas fora da execução ativa.",
          caution:
            "O flamegraph de CPU sozinho não explica tempos perdidos fora da CPU.",
        },
        {
          name: "Serviço Go em produção",
          situation:
            "Você precisa observar CPU e memória com ferramentas já integradas ao ecossistema.",
          choice:
            "Use pprof via go test, runtime/pprof ou endpoints HTTP, e interprete os resultados junto das métricas do serviço.",
          why:
            "O tooling oficial já entrega coleta e visualizações suficientes para muitas investigações.",
          caution:
            "Em produção, estime o overhead e prefira janelas curtas ou réplicas selecionadas; do contrário, o profiler pode distorcer justamente o comportamento que você quer explicar.",
        },
      ],
      tone: "emerald",
    },
    content: {
      id: "flamegraphs-e-profiling",
      title: "Flamegraphs e Profiling",
      subtitle:
        "O perfil não mostra o que o código 'parece fazer'; ele mostra onde a execução realmente concentrou tempo ou amostras.",
      description:
        "Aula interativa sobre profiling por amostragem, leitura de flamegraphs, diferença entre on-CPU e off-CPU, perf, pprof e como transformar um perfil em ação de engenharia.",
      primaryCategoryId: "computacao",
      secondaryCategoryId: "engenharia",
      level: "Intermediário",
      estimatedTime: "50-60 min",
      tags: [
        "Flamegraph",
        "Profiling",
        "Sampling",
        "perf",
        "pprof",
        "Hotspots",
      ],
      learningObjectives: [
        "Entender o que profiling por amostragem mede e o que ele não mede.",
        "Ler flamegraphs corretamente em termos de largura, pilhas e paths quentes.",
        "Distinguir perfis on-CPU de investigações sobre espera off-CPU.",
        "Escolher entre perf, pprof e outras formas de coleta conforme o tipo de pergunta.",
        "Evitar interpretações erradas, como tratar o eixo horizontal como linha do tempo.",
        "Usar perfis como ponto de partida para hipóteses, validação e novas medições.",
      ],
      prerequisites: [
        "Modelo mental de performance e distinção entre trabalho útil e espera.",
        "CPU-bound, I/O-bound e memory-bound.",
        "Noções básicas de stack de chamada, threads e ferramentas de medição.",
      ],
      references: refs(
        "greggFlamegraphs",
        "greggCpuFlamegraphs",
        "perfWiki",
        "goPprofBlog",
        "runtimePprof",
      ),
      heroVisual: visualIds.hero,
      openingText:
        "Quando a performance degrada, o palpite humano costuma apontar para o código mais feio, mais longo ou mais recentemente alterado. Profiling existe para quebrar esse viés. Em vez de adivinhar, você amostra a execução e observa quais caminhos de chamada realmente acumulam custo. O flamegraph é a visualização que transforma milhares de stacks em uma imagem legível: barras largas destacam onde o peso se concentra. Mas como toda ferramenta poderosa, ele também é fácil de interpretar mal se você esquecer o que o gráfico representa.",
      quickFacts: [
        { title: "Sampling é estimativa", body: "Ele aproxima hotspots por amostras periódicas, não por rastreio integral do tempo." },
        { title: "Largura é peso", body: "Barras largas indicam maior presença daquele stack nas amostras." },
        { title: "Altura não é tempo", body: "Ela representa profundidade de chamada, não sequência cronológica." },
        { title: "CPU não é tudo", body: "Tempo off-CPU pede outras visões além do flamegraph on-CPU clássico." },
      ],
      sections: [
        s(
          "profiling-por-amostragem",
          "Base",
          "Profiling por amostragem observa a execução sem rastrear cada evento",
          "A ideia central é capturar stacks periodicamente e inferir os caminhos quentes pelo volume de amostras.",
          visualIds.concept,
          undefined,
          [
            "Em vez de registrar cada instrução ou cada chamada, o profiler dispara amostragens e anota onde a execução estava. Repetido várias vezes, isso cria uma estimativa robusta dos pontos quentes com overhead geralmente aceitável.",
            "Essa técnica é poderosa porque reduz perturbação. Em troca, ela oferece uma visão probabilística: excelente para hotspots, menos adequada para questões que exigem ordem temporal exata.",
          ],
          [
            {
              type: "definition",
              title: "Profiling por amostragem",
              body: "Coleta periódica de snapshots da execução para estimar onde o programa gasta mais tempo.",
            },
          ],
        ),
        s(
          "como-o-flamegraph-nasce",
          "Construção",
          "Flamegraph é pilha agregada, não linha do tempo",
          "As amostras são agrupadas por stack e transformadas em uma figura onde largura significa frequência acumulada.",
          visualIds.pipeline,
          interactionIds.pipeline,
          [
            "Brendan Gregg popularizou essa visualização justamente porque ela torna legível um volume enorme de stacks. Frames que aparecem juntos repetidamente se fundem, revelando caminhos quentes de chamada.",
            "Essa agregação é a chave para a leitura correta: o eixo horizontal organiza densidade e agrupamento, não a ordem temporal dos eventos da execução.",
          ],
          [
            {
              type: "insight",
              title: "O x não é relógio",
              body: "Se você ler o flamegraph como timeline, perderá a principal utilidade da ferramenta.",
            },
          ],
        ),
        s(
          "como-ler",
          "Leitura",
          "Largura, profundidade e ancestry contam histórias diferentes",
          "Saber o papel de cada dimensão evita conclusões apressadas.",
          undefined,
          undefined,
          [
            "A largura de um frame mostra quão presente ele esteve nas amostras. A altura da pilha mostra profundidade de chamada. O importante é olhar caminhos completos: uma função larga pode ser só o invólucro de um filho ainda mais decisivo.",
            "Em muitos perfis, vale comparar tempo flat e cumulative. Às vezes o custo está no próprio frame; outras vezes, o frame é largo porque chama descendentes caros.",
          ],
          [
            {
              type: "definition",
              title: "Flat vs cumulative",
              body: "Flat é o custo próprio do frame; cumulative inclui o custo agregado de seus descendentes.",
            },
          ],
        ),
        s(
          "on-cpu-vs-off-cpu",
          "Tipos",
          "Flamegraph de CPU mostra execução ativa; espera exige outra lente",
          "Se o problema principal é bloqueio, lock ou I/O, a pilha on-CPU pode mostrar pouco.",
          visualIds.tradeoff,
          interactionIds.tradeoff,
          [
            "Perfis on-CPU são ideais para descobrir por que os núcleos estão ocupados. Já tempos off-CPU, block profiles, mutex profiles e métricas de espera explicam por que o sistema ficou parado, dormindo ou bloqueado.",
            "Essa distinção é crucial. Um serviço lento com CPU baixa pode ter um flamegraph de CPU aparentemente inocente e ainda assim sofrer horrores fora da CPU.",
          ],
          [
            {
              type: "mistake",
              title: "Exigir do flamegraph de CPU uma resposta sobre bloqueios",
              body: "Ele não é a ferramenta principal para todo tipo de espera; o tipo de perfil precisa combinar com a hipótese.",
            },
          ],
        ),
        s(
          "ferramentas-ecossistema",
          "Ferramentas",
          "perf, pprof e perfis nativos servem a recortes diferentes, mas convergem na mesma disciplina",
          "O nome da ferramenta muda; a lógica de medir, interpretar e validar continua.",
          visualIds.impact,
          undefined,
          [
            "No Linux, perf é um canivete suíço excelente para contadores e sampling com stack traces. No mundo Go, pprof integra coleta e visualização de CPU, memória, block e mutex. Em outros ecossistemas, ferramentas análogas cumprem papéis parecidos.",
            "O importante é não idolatrar a ferramenta. Ela serve para responder uma hipótese específica sobre custo, não para substituir pensamento.",
          ],
          [
            {
              type: "example",
              title: "pprof e flame graph",
              body: "O ecossistema Go já permite coletar e visualizar perfis sem instalar um universo paralelo de tooling.",
            },
          ],
        ),
        s(
          "cenario-e-contexto",
          "Contexto",
          "O mesmo perfil pode indicar ação diferente dependendo do workload",
          "Uma barra larga não é automaticamente um problema; às vezes ela representa trabalho útil esperado.",
          undefined,
          interactionIds.scenario,
          [
            "Se o sistema é um compressor, compressão aparecer larga pode ser totalmente natural. A pergunta então muda: esse custo é inevitável, está exagerado ou deslocou outro budget relevante? Profiling sem contexto de produto gera perseguição a barras grandes por reflexo.",
            "O perfil aponta onde o tempo está. A decisão de engenharia ainda depende de saber se aquele tempo é desejável, inevitável, mal distribuído ou apenas efeito colateral de um mecanismo substituível.",
          ],
          [
            {
              type: "insight",
              title: "Barra larga não implica bug",
              body: "Algumas barras largas simplesmente representam a parte útil do trabalho que o sistema foi contratado para executar.",
            },
          ],
        ),
        s(
          "do-perfil-para-a-acao",
          "Ação",
          "Um perfil bom encurta o caminho até o próximo experimento",
          "Depois de localizar o hotspot, a próxima etapa é formular mudança testável e validar o efeito no sistema real.",
          visualIds.impact,
          undefined,
          [
            "O melhor uso do profiling é reduzir incerteza. Você encontra o caminho quente, propõe uma mudança concreta, mede novamente e observa se o custo caiu e se o problema original melhorou.",
            "Sem esse fechamento, o flamegraph vira poster de investigação inacabada: bonito, informativo e impotente.",
          ],
          [
            {
              type: "mistake",
              title: "Parar no perfil",
              body: "A ferramenta mostra pistas; o ciclo só termina com experimento e validação do impacto na métrica relevante.",
            },
          ],
        ),
        s(
          "regra-pratica",
          "Síntese",
          "Profile para localizar, interprete com contexto e valide com nova medição",
          "Essa tríade evita tanto chute quanto fetichismo de ferramenta.",
          visualIds.pipeline,
          undefined,
          [
            "Se você lembrar apenas de uma regra, que seja esta: flamegraph não substitui o modelo mental do sistema, mas o torna menos fantasioso. Ele te mostra onde o custo se concentra para que o próximo passo seja inteligente.",
            "Ao combinar perfil, contexto e revalidação, você transforma uma imagem estática em um ciclo de engenharia confiável.",
          ],
          [
            {
              type: "insight",
              title: "Ferramenta boa é aquela que vira próximo passo claro",
              body: "O valor do profiling aparece quando ele reduz o número de hipóteses plausíveis o suficiente para permitir ação rápida.",
            },
          ],
        ),
        s(
          "quiz-revisao",
          "Revisão",
          "Quiz de revisão",
          "Teste se sampling, leitura visual e tipos de perfil ficaram distintos.",
          undefined,
          "quiz",
          ["A meta é aprender a usar o flamegraph como mapa de investigação, não como adivinhação automática."],
          [],
        ),
        s(
          "glossario",
          "Glossário",
          "Termos essenciais",
          "Consolide o vocabulário de profiling e leitura de stacks.",
          undefined,
          "glossary",
          ["Esses termos retornam em perf, pprof, eBPF e diagnóstico de produção."],
          [],
        ),
      ],
      summaryCards: [
        { title: "Sampling estima hotspots", body: "Ele usa amostras periódicas para encontrar caminhos quentes com baixo overhead relativo." },
        { title: "Flamegraph agrega stacks", body: "A largura mostra peso; a altura mostra profundidade de chamada." },
        { title: "O eixo x não é tempo", body: "É densidade agregada de stacks, não timeline." },
        { title: "On-CPU e off-CPU pedem visões diferentes", body: "Bloqueio e espera não aparecem plenamente no flamegraph de CPU." },
        { title: "Ferramenta não substitui contexto", body: "Barra larga pode ser trabalho útil esperado ou custo evitável." },
        { title: "Perfil deve virar experimento", body: "A imagem só ganha valor completo quando orienta a próxima medição." },
      ],
      quiz: [
        q(
          "q1",
          "O que profiling por amostragem faz?",
          "Captura snapshots periódicos da execução para estimar hotspots.",
          "Registra cada instrução executada com precisão absoluta.",
          "Mede apenas uso de disco.",
          "a",
          "É uma técnica probabilística, ótima para localizar caminhos quentes.",
        ),
        q(
          "q2",
          "Em um flamegraph, o que a largura de uma barra representa?",
          "O peso acumulado daquele frame nas amostras.",
          "O instante cronológico em que ele ocorreu.",
          "O número de núcleos da máquina.",
          "a",
          "Largura é importância amostral, não tempo em linha do tempo.",
        ),
        q(
          "q3",
          "O que a altura da pilha representa?",
          "Profundidade de chamada.",
          "Latência em milissegundos.",
          "Número de requests por segundo.",
          "a",
          "Quanto mais alto, mais profundo está o frame na stack.",
        ),
        q(
          "q4",
          "Qual interpretação está errada sobre o flamegraph clássico?",
          "Tratar o eixo horizontal como timeline da execução.",
          "Usar a largura para inferir concentração de custo.",
          "Ler caminhos de chamadas agregados.",
          "a",
          "Esse é um dos erros mais comuns na leitura da visualização.",
        ),
        q(
          "q5",
          "Quando um perfil on-CPU pode ser insuficiente?",
          "Quando a lentidão principal vem de bloqueio, lock ou espera off-CPU.",
          "Quando a aplicação foi compilada em release.",
          "Quando há mais de uma função na stack.",
          "a",
          "Nesse caso, block, mutex ou perfis off-CPU ajudam mais.",
        ),
        q(
          "q6",
          "Qual é o papel de ferramentas como perf e pprof?",
          "Coletar e visualizar perfis para apoiar hipóteses sobre custo.",
          "Substituir completamente métricas e entendimento do produto.",
          "Eliminar a necessidade de benchmark.",
          "a",
          "A ferramenta serve ao método; ela não o substitui.",
        ),
        q(
          "q7",
          "Por que uma barra larga não implica automaticamente um bug?",
          "Porque ela pode representar trabalho útil esperado do sistema.",
          "Porque perfis nunca mostram custo real.",
          "Porque flamegraphs escondem funções importantes.",
          "a",
          "A interpretação depende do workload e do objetivo do produto.",
        ),
        q(
          "q8",
          "Qual sequência resume o uso maduro de profiling?",
          "Localizar com perfil, interpretar com contexto e validar com nova medição.",
          "Gerar o flamegraph e imediatamente reescrever o módulo maior.",
          "Substituir todos os testes por amostragem.",
          "a",
          "Essa tríade evita tanto chute quanto fetichismo de ferramenta.",
        ),
      ],
      glossary: [
        g("Profiling por amostragem", "Coleta periódica de stacks para estimar hotspots."),
        g("Flamegraph", "Visualização agregada de stacks de chamada baseada em perfis."),
        g("Hotspot", "Região de execução que concentra grande parcela do custo observado."),
        g("On-CPU", "Tempo em que a execução está efetivamente rodando na CPU."),
        g("Off-CPU", "Tempo em que a execução está bloqueada, dormindo ou esperando recurso."),
        g("Flat time", "Custo próprio de um frame."),
        g("Cumulative time", "Custo agregado do frame com seus descendentes."),
        g("Stack trace", "Sequência de frames que representa o caminho de chamadas ativo."),
        g("Sampling frequency", "Ritmo com que o profiler coleta amostras."),
        g("pprof", "Ferramenta e formato amplamente usados para perfis em Go."),
        g("perf", "Suíte de profiling e contadores de performance do Linux."),
        g("Ancestry path", "Caminho de chamadas representado pelos frames empilhados."),
      ],
    },
  } satisfies WaveL1LessonDefinition;
})();

const benchmarkingHonesto = (() => {
  const { visualIds, interactionIds } = assetIds("benchmarking-honesto");

  return {
    visualIds,
    interactionIds,
    visualConfig: {
      title: "Benchmarking Honesto",
      subtitle: "Microbench mente fácil",
      level: "Avançado",
      tags: ["Benchmark", "Noise", "Warmup", "benchstat", "black_box"],
      conceptNodes: ["workload", "warmup", "noise", "comparação"],
      pipelineSteps: ["formular benchmark", "aquecer", "medir", "comparar"],
      leftLabel: "sintético e estável",
      rightLabel: "realista e variável",
      impactRows: [
        { label: "Warmup", value: "caches, branch predictor, JIT ou runtime se adaptando" },
        { label: "Noise", value: "SO, frequência, vizinhos, I/O e variação do ambiente" },
        { label: "Dead-code elimination", value: "o compilador remove o trabalho que você achava estar medindo" },
        { label: "Comparação", value: "diferença estatisticamente robusta vale mais que uma corrida isolada" },
      ],
    },
    interactionConfig: {
      title: "Benchmarking Honesto",
      pipelineSteps: [
        {
          name: "Definir o workload",
          summary:
            "Um benchmark só vale se o trabalho medido representar algo relevante para a decisão que você quer tomar.",
          signal: "representatividade do caso",
          risk: "medir uma função isolada que não se comporta como no sistema real",
          takeaway:
            "Antes do número, pergunte se o benchmark se parece com o uso que importa.",
        },
        {
          name: "Aquecer e preparar",
          summary:
            "Warmup reduz distorções de caches frios, estados iniciais do runtime e adaptação do ambiente ao workload.",
          signal: "estabilidade após aquecimento",
          risk: "misturar setup com medição",
          takeaway:
            "A primeira execução raramente representa o regime que você quer estudar.",
        },
        {
          name: "Medir sem se enganar",
          summary:
            "Você precisa impedir otimizações indevidas, controlar ruído e observar distribuição, não apenas um único valor final.",
          signal: "amostras consistentes",
          risk: "medir menos trabalho do que parece por eliminação do compilador",
          takeaway:
            "Benchmark bom luta contra duas fraudes: a do ambiente e a do otimizador.",
        },
        {
          name: "Comparar com rigor",
          summary:
            "A diferença entre A e B deve sobreviver a repetição, variação natural e análise estatística razoável.",
          signal: "comparação robusta",
          risk: "celebrar ruído como regressão ou melhoria",
          takeaway:
            "Um benchmark vale mais pelo método de comparação do que pelo número mais baixo impresso na tela.",
        },
      ],
      leftLabel: "controle de ruído",
      rightLabel: "fidelidade ao mundo real",
      tradeoffSummary:
        "Benchmarks muito sintéticos são reprodutíveis, mas podem medir um mundo que não existe; benchmarks muito fiéis ao sistema real capturam valor, mas acumulam variáveis e ruído.",
      tradeoffRisks: [
        "Você ganha repetibilidade, mas pode perder representatividade do caso de uso real.",
        "Bom equilíbrio quando o benchmark ainda espelha o padrão importante sem virar laboratório caótico.",
        "Mais fidelidade traz mais ruído e dificulta atribuição causal.",
        "Realismo sem controle pode esconder regressões pequenas e fabricar grandes demais.",
      ],
      practiceRule:
        "Use o benchmark mais simples que ainda preserva o mecanismo relevante para a decisão de engenharia que você precisa tomar.",
      scenarios: [
        {
          name: "Função pura muito pequena",
          situation:
            "O compilador pode otimizar fora partes importantes do trabalho se entradas e saídas forem previsíveis.",
          choice:
            "Use black_box ou mecanismo equivalente e garanta build otimizada.",
          why:
            "Sem isso, o benchmark pode medir o otimizador, não a função.",
          caution:
            "Mesmo protegido, o microbenchmark ainda pode não refletir o comportamento dentro do sistema real.",
        },
        {
          name: "Comparação A/B em Go",
          situation:
            "Duas variantes parecem próximas e você quer evitar conclusões a partir de corridas isoladas.",
          choice:
            "Colete resultados repetidos e use ferramentas como benchstat para comparar com mais rigor.",
          why:
            "Diferenças pequenas podem ser só ruído do ambiente e do scheduler.",
          caution:
            "Número único sem repetição é um terreno fértil para regressões imaginárias.",
        },
        {
          name: "Benchmark muito realista",
          situation:
            "Você quer medir o comportamento mais parecido possível com produção, envolvendo parsing, rede e serialização.",
          choice:
            "Aceite mais ruído, mas mantenha variáveis principais sob controle e documentadas.",
          why:
            "Representatividade do workload às vezes vale mais do que pureza laboratorial absoluta.",
          caution:
            "Se tudo varia ao mesmo tempo, fica difícil saber qual mudança produziu o efeito observado.",
        },
      ],
      tone: "violet",
    },
    content: {
      id: "benchmarking-honesto",
      title: "Benchmarking Honesto",
      subtitle:
        "Um benchmark ruim não apenas mede mal: ele empurra a equipe para conclusões confiantes e erradas.",
      description:
        "Aula avançada sobre como escrever benchmarks honestos, lidar com warmup e ruído, evitar dead-code elimination, comparar resultados com rigor e escolher workloads representativos.",
      primaryCategoryId: "computacao",
      secondaryCategoryId: "engenharia",
      level: "Avançado",
      estimatedTime: "55-65 min",
      tags: [
        "Benchmark",
        "Warmup",
        "Noise",
        "benchstat",
        "Criterion",
        "black_box",
      ],
      learningObjectives: [
        "Entender por que microbenchmarks podem mentir sobre o comportamento de sistemas reais.",
        "Projetar workloads que preservam o mecanismo relevante sem acumular ruído desnecessário.",
        "Separar setup, warmup e medição com mais disciplina.",
        "Reconhecer riscos de dead-code elimination, constant folding e inputs irreais.",
        "Comparar variantes usando repetição e análise estatística básica em vez de corridas isoladas.",
        "Escolher entre benchmarks sintéticos e mais realistas com consciência do trade-off envolvido.",
      ],
      prerequisites: [
        "Medir antes de otimizar e noção de baseline.",
        "Custo de abstrações e importância de build otimizada.",
        "Latência, throughput e entendimento básico de variabilidade de sistemas.",
      ],
      references: refs(
        "criterionAnalysis",
        "criterionOutput",
        "goTesting",
        "rustBlackBox",
        "runtimePprof",
      ),
      heroVisual: visualIds.hero,
      openingText:
        "Benchmark é uma ferramenta sedutora porque produz um número simples e comparável. Essa simplicidade é justamente o perigo. O número pode estar medindo caches frios, setup repetido, um input artificial demais, ruído do ambiente ou até um pedaço de código que o compilador removeu. Benchmarking honesto é a arte de fazer o experimento mais estreito possível sem mutilar o mecanismo que você realmente quer entender. É menos sobre apertar 'run' e mais sobre proteger a pergunta contra autoengano.",
      quickFacts: [
        { title: "Microbench não é inocente", body: "Ele pode medir um mundo artificial que não se parece com o uso real." },
        { title: "Warmup importa", body: "Primeiras execuções carregam frio de cache, runtime e outros efeitos transitórios." },
        { title: "Otimizador participa", body: "Se você não se proteger, o compilador pode remover o trabalho supostamente medido." },
        { title: "Comparar é mais que correr uma vez", body: "Diferenças pequenas pedem repetição e análise robusta." },
      ],
      sections: [
        s(
          "pergunta-do-benchmark",
          "Pergunta",
          "Benchmark bom começa pela decisão que ele precisa informar",
          "Antes de escrever o laço, defina qual mecanismo ou escolha de engenharia está sendo comparado.",
          visualIds.concept,
          undefined,
          [
            "Você quer comparar dois algoritmos, duas representações de dados, duas APIs de serialização ou apenas uma hipótese sobre alocação? Sem essa clareza, é fácil construir um benchmark elegante que não influencia nenhuma decisão real.",
            "A pergunta certa também protege contra benchmark ornamental: aquele que roda bonito no CI, mas não conversa com o comportamento do sistema de verdade.",
          ],
          [
            {
              type: "definition",
              title: "Workload representativo",
              body: "Carga de teste suficientemente parecida com o uso relevante para sustentar a decisão que o benchmark pretende informar.",
            },
          ],
        ),
        s(
          "warmup-e-setup",
          "Preparação",
          "Warmup e setup não devem contaminar a medição principal",
          "O tempo de aquecer caches, inicializar estruturas e estabilizar o ambiente raramente representa o regime de interesse.",
          visualIds.pipeline,
          interactionIds.pipeline,
          [
            "Criterion deixa isso explícito ao separar warmup, measurement e analysis. A ideia é simples: a primeira execução não costuma representar o estado em que o workload realmente viverá durante a medição prolongada.",
            "Do mesmo modo, setup caro precisa ficar fora da região que mede o corpo da operação, a menos que o setup faça parte do custo que você realmente quer comparar.",
          ],
          [
            {
              type: "insight",
              title: "Medir fase errada é medir outro problema",
              body: "Se o benchmark mistura inicialização e trabalho repetido, você perde foco sobre o mecanismo principal.",
            },
          ],
        ),
        s(
          "ruido-de-ambiente",
          "Ruído",
          "O ambiente tenta participar do seu benchmark o tempo todo",
          "Scheduler, vizinhos, turbo, frequência, I/O e variabilidade do SO adicionam ruído mesmo quando o código parece determinístico.",
          undefined,
          undefined,
          [
            "Benchmarks pequenos são especialmente sensíveis a ruído porque a parcela medida pode ser comparável ao custo do próprio ambiente em volta. Repetição, tempo de medição maior e comparação estatística ajudam a reduzir a chance de ler esse ruído como sinal.",
            "Não existe benchmark perfeitamente puro fora do papel. O objetivo é tornar a variabilidade pequena o bastante — e explícita o bastante — para apoiar decisão melhor.",
          ],
          [
            {
              type: "mistake",
              title: "Acreditar em uma corrida única",
              body: "Um único número pode refletir mais o humor do ambiente do que a diferença entre as variantes comparadas.",
            },
          ],
        ),
        s(
          "otimizador-vilao-util",
          "Compilador",
          "O compilador pode remover o trabalho que você acha estar medindo",
          "Dead-code elimination, constant folding e previsibilidade excessiva de inputs distorcem microbenchmarks com facilidade.",
          visualIds.tradeoff,
          interactionIds.tradeoff,
          [
            "É por isso que Rust oferece black_box para benchmarks e que frameworks especializados se preocupam com formas de impedir otimizações indevidas sobre entrada e saída. Se o compilador prova que o cálculo é inútil ou previsível, ele pode encurtar artificialmente o benchmark.",
            "Esse problema é perverso porque o resultado ainda parece 'rápido'. O benchmark fica ótimo justamente porque deixou de medir o trabalho relevante.",
          ],
          [
            {
              type: "definition",
              title: "Dead-code elimination",
              body: "Otimização em que o compilador remove trabalho cujo resultado não afeta o programa observável.",
            },
          ],
        ),
        s(
          "sintetico-vs-realista",
          "Trade-off",
          "Controle e realismo raramente vêm na mesma proporção",
          "Benchmarks sintéticos são limpos, mas podem perder o mecanismo que realmente importa em produção.",
          visualIds.impact,
          undefined,
          [
            "Um benchmark extremamente controlado facilita comparar variantes pequenas. Já um benchmark mais próximo do sistema real captura interações importantes entre parsing, buffers, chamadas externas e formatos de dados. O primeiro ganha em isolamento; o segundo em representatividade.",
            "A escolha boa depende da pergunta. Muitas vezes vale manter os dois níveis: um microbenchmark para mecanismo local e um benchmark mais integrado para validar relevância sistêmica.",
          ],
          [
            {
              type: "example",
              title: "Dois níveis de benchmark",
              body: "Um mede a função quente isolada; outro confirma se a diferença realmente aparece no pipeline mais próximo do real.",
            },
          ],
        ),
        s(
          "comparacao-rigorosa",
          "Comparação",
          "Benchmarking sério compara distribuições e não só melhores números",
          "Ferramentas como Criterion e benchstat existem porque diferença pequena pede leitura estatística, não impressão casual.",
          undefined,
          interactionIds.scenario,
          [
            "Repetir execuções, observar intervalos de confiança, ruído e consistência do workload ajuda a distinguir melhoria real de oscilação natural. O pacote testing do Go referencia benchstat exatamente para tornar comparações A/B mais robustas.",
            "Esse cuidado é especialmente importante quando o ganho é modesto, mas a mudança de código é grande. Sem rigor, você pode comprar complexidade permanente por uma vantagem estatisticamente inexistente.",
          ],
          [
            {
              type: "insight",
              title: "Comparação boa é parte do benchmark",
              body: "Não basta coletar tempos; você precisa de uma forma honesta de interpretá-los e comparar variantes.",
            },
          ],
        ),
        s(
          "do-micro-ao-sistema",
          "Validação",
          "O benchmark local precisa conversar com a métrica sistêmica",
          "Ganhar na microfunção e perder no produto é mais comum do que parece.",
          visualIds.impact,
          undefined,
          [
            "Uma mudança pode melhorar nanos por iteração e ainda ser irrelevante na latência ponta a ponta porque o trecho quase não participa do custo total. Também pode melhorar CPU, mas piorar memória ou legibilidade a um preço que o sistema não recupera.",
            "Por isso, benchmark honesto não substitui profiling nem validação em workload mais realista. Ele ocupa um lugar específico no processo: responder uma pergunta local com método forte.",
          ],
          [
            {
              type: "mistake",
              title: "Tomar o micro como verdade final",
              body: "Microbench é uma lente local; o sistema real continua sendo o árbitro da relevância global.",
            },
          ],
        ),
        s(
          "regra-pratica",
          "Síntese",
          "Use o benchmark mais simples que preserve o mecanismo que interessa, e o rigor necessário para não comprar ruído",
          "Essa combinação mantém o experimento útil sem transformá-lo em laboratório ornamental.",
          visualIds.pipeline,
          undefined,
          [
            "Se o benchmark é simples demais, mede um mundo fictício. Se é realista demais e sem controle, não consegue explicar por que os números mudaram. Benchmarking honesto é ficar no ponto em que o mecanismo relevante continua presente e a variabilidade continua administrável.",
            "Ao praticar isso, você para de pedir 'um benchmark' e passa a pedir 'um experimento confiável para esta hipótese'.",
          ],
          [
            {
              type: "insight",
              title: "Benchmark é método, não ritual",
              body: "O valor não está em rodar o comando, mas em construir uma comparação que mereça confiança.",
            },
          ],
        ),
        s(
          "quiz-revisao",
          "Revisão",
          "Quiz de revisão",
          "Teste se warmup, ruído, compilador e comparação ficaram bem amarrados.",
          undefined,
          "quiz",
          ["A meta é sair desta aula desconfiando de benchmarks fáceis demais e sabendo como fortalecê-los."],
          [],
        ),
        s(
          "glossario",
          "Glossário",
          "Termos essenciais",
          "Consolide o vocabulário necessário para discutir benchmark com rigor.",
          undefined,
          "glossary",
          ["Esses conceitos voltam em Rust, Go, CI, regressão de performance e experimentos locais."],
          [],
        ),
      ],
      summaryCards: [
        { title: "Benchmark responde decisão", body: "Ele precisa representar o mecanismo que interessa para a escolha de engenharia." },
        { title: "Warmup separa transiente de regime", body: "Primeiras execuções raramente refletem o estado estável desejado." },
        { title: "Ruído existe sempre", body: "Por isso repetição e análise robusta importam mais que uma corrida isolada." },
        { title: "Compilador pode enganar", body: "Sem proteção, você mede trabalho otimizado fora da existência." },
        { title: "Sintético e realista competem", body: "Controle e representatividade precisam ser balanceados conscientemente." },
        { title: "Micro não substitui sistema", body: "Resultado local precisa conversar com a relevância global da aplicação." },
      ],
      quiz: [
        q(
          "q1",
          "Qual é a primeira pergunta de um benchmark honesto?",
          "Que decisão de engenharia ele precisa informar e qual mecanismo quer comparar.",
          "Qual framework imprime o menor número.",
          "Qual linguagem é mais famosa no momento.",
          "a",
          "Sem essa pergunta, o benchmark pode ser elegante e inútil.",
        ),
        q(
          "q2",
          "Por que warmup é importante?",
          "Porque primeiras execuções costumam refletir estados transitórios de cache, runtime ou setup.",
          "Porque substitui comparação estatística.",
          "Porque elimina toda variabilidade do sistema.",
          "a",
          "A medição principal deve focar o regime que interessa, não a fase de aquecimento.",
        ),
        q(
          "q3",
          "Qual risco existe em benchmarks muito pequenos?",
          "O ruído do ambiente pode ser comparável ao trabalho medido.",
          "Eles automaticamente medem produção com fidelidade total.",
          "O compilador desliga otimizações por padrão.",
          "a",
          "Quanto menor o trabalho, maior a sensibilidade a variações externas e custo fixo.",
        ),
        q(
          "q4",
          "Por que black_box é útil em benchmarks?",
          "Porque ajuda a impedir que o compilador otimize fora o trabalho que você queria medir.",
          "Porque acelera qualquer código em produção.",
          "Porque substitui warmup.",
          "a",
          "Sem essa proteção, o benchmark pode medir menos trabalho do que aparenta.",
        ),
        q(
          "q5",
          "Qual trade-off aparece entre benchmarks sintéticos e realistas?",
          "Sintéticos ganham controle; realistas ganham representatividade do uso final.",
          "Sintéticos sempre são mais verdadeiros que realistas.",
          "Realistas sempre têm zero ruído.",
          "a",
          "A escolha depende do mecanismo e da decisão que você quer informar.",
        ),
        q(
          "q6",
          "Por que repetir e comparar com rigor importa?",
          "Porque diferenças pequenas podem ser apenas ruído do ambiente.",
          "Porque a melhor corrida única sempre revela a verdade.",
          "Porque benchmark não varia quando o build é release.",
          "a",
          "Ferramentas como benchstat e Criterion ajudam justamente nisso.",
        ),
        q(
          "q7",
          "Qual erro resume 'microbench mente fácil'?",
          "Tomar o número local como verdade global sem validar relevância no sistema real.",
          "Usar qualquer benchmark para loops.",
          "Comparar duas versões do mesmo algoritmo.",
          "a",
          "O micro é uma lente local; ele não encerra o caso sozinho.",
        ),
        q(
          "q8",
          "Qual regra prática resume esta aula?",
          "Use o benchmark mais simples que preserve o mecanismo relevante e o rigor necessário para não comprar ruído.",
          "Sempre replique produção inteira antes de medir uma função.",
          "Evite benchmarks e use só opinião experiente.",
          "a",
          "Esse equilíbrio é o coração do benchmarking honesto.",
        ),
      ],
      glossary: [
        g("Benchmark", "Experimento repetível para medir desempenho de uma operação ou variante."),
        g("Warmup", "Fase de aquecimento anterior à medição principal."),
        g("Setup", "Preparação necessária para o benchmark rodar."),
        g("Noise", "Variabilidade do ambiente que contamina a medição."),
        g("Dead-code elimination", "Remoção de trabalho pelo compilador quando o resultado não importa."),
        g("Constant folding", "Otimização que pré-calcula resultados previsíveis em compilação."),
        g("black_box", "Barreira usada para reduzir otimizações indevidas em benchmarks."),
        g("benchstat", "Ferramenta para comparação estatística de resultados de benchmark."),
        g("Workload representativo", "Carga de benchmark parecida com o uso que interessa para a decisão."),
        g("Regime estável", "Fase em que o benchmark já saiu dos efeitos transitórios iniciais."),
        g("Microbenchmark", "Benchmark muito focado em trecho local e mecanismo isolado."),
        g("Regressão de performance", "Piora mensurável de desempenho entre variantes ou versões."),
      ],
    },
  } satisfies WaveL1LessonDefinition;
})();

export const waveL1LessonDefinitions = {
  "performance-mental-model": performanceMentalModel,
  "medir-antes-de-otimizar": medirAntesDeOtimizar,
  "cpu-bound-io-bound-memory-bound": cpuIoMemoryBound,
  "latencia-vs-throughput": latenciaVsThroughput,
  "ampdal-e-limites-do-paralelismo": amdahlLimites,
  "custo-de-abstracoes": custoAbstracoes,
  "flamegraphs-e-profiling": flamegraphsEProfiling,
  "benchmarking-honesto": benchmarkingHonesto,
} satisfies Record<WaveL1LessonId, WaveL1LessonDefinition>;

export function getWaveL1Content(id: WaveL1LessonId) {
  return waveL1LessonDefinitions[id].content;
}

export function getWaveL1Visuals(id: WaveL1LessonId): LessonModule["visuals"] {
  const definition = waveL1LessonDefinitions[id];
  const base = createComputacaoVisuals(definition.visualConfig);

  return {
    [definition.visualIds.hero]: base["lesson-hero"],
    [definition.visualIds.concept]: base["concept-grid"],
    [definition.visualIds.pipeline]: base["pipeline-diagram"],
    [definition.visualIds.tradeoff]: base["tradeoff-spectrum"],
    [definition.visualIds.impact]: base["impact-board"],
  };
}

export function getWaveL1Interactions(id: WaveL1LessonId): LessonModule["interactions"] {
  const definition = waveL1LessonDefinitions[id];
  const base = createComputacaoInteractions(definition.interactionConfig);

  return {
    [definition.interactionIds.pipeline]: base["pipeline-lab"],
    [definition.interactionIds.tradeoff]: base["tradeoff-lab"],
    [definition.interactionIds.scenario]: base["scenario-lab"],
  };
}
