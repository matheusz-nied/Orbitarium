import type {
  GlossaryTerm,
  LessonContent,
  LessonModule,
  LessonReference,
  QuizQuestion,
  SummaryCard,
} from "../../../types/content";
import {
  createComputacaoInteractions,
  createComputacaoVisuals,
  type InteractionFactoryConfig,
  type VisualFactoryConfig,
} from "../_shared/factories";

type WaveL5PartALessonId =
  | "metodologia-de-otimizacao"
  | "contencao-locks-e-filas"
  | "lock-free-com-cuidado"
  | "syscalls-e-overhead-de-io";

const visualIds = {
  hero: "lesson-hero",
  concept: "concept-grid",
  pipeline: "pipeline-diagram",
  tradeoff: "tradeoff-spectrum",
  impact: "impact-board",
} as const;

const interactionIds = {
  pipeline: "pipeline-lab",
  tradeoff: "tradeoff-lab",
  scenario: "scenario-lab",
} as const;

interface WaveL5PartADefinition {
  content: LessonContent;
  visualConfig: VisualFactoryConfig;
  interactionConfig: InteractionFactoryConfig;
}

const library = {
  greggSystemsPerformance: {
    title: "Systems Performance: Enterprise and the Cloud",
    source: "Brendan Gregg",
    url: "https://www.brendangregg.com/systems-performance-2nd-edition-book.html",
    note:
      "Referência ampla sobre CPU, I/O, filas, contenção, latência e metodologia de análise em sistemas reais.",
  },
  greggTsaMethod: {
    title: "The TSA Method",
    source: "Brendan Gregg",
    url: "https://www.brendangregg.com/tsamethod.html",
    note:
      "Mostra como separar tempo on-CPU, espera em fila, locks e sono por I/O para investigar latência com disciplina.",
  },
  greggOffCpu: {
    title: "Off-CPU Analysis",
    source: "Brendan Gregg",
    url: "https://www.brendangregg.com/offcpuanalysis.html",
    note:
      "Explica como medir o tempo em que threads ficam fora da CPU esperando I/O, locks ou escalonamento.",
  },
  greggPerfExamples: {
    title: "Linux perf Examples",
    source: "Brendan Gregg",
    url: "https://www.brendangregg.com/perf.html",
    note:
      "Coleção prática de exemplos com perf, incluindo profiling, tracing e investigação de contenção.",
  },
  sreMonitoring: {
    title: "Monitoring Distributed Systems",
    source: "Google SRE Book",
    url: "https://sre.google/sre-book/monitoring-distributed-systems/",
    note:
      "Capítulo clássico para ligar sintoma, sinal, percentis e interpretação operacional de métricas.",
  },
  sreSlo: {
    title: "Service Level Objectives",
    source: "Google SRE Book",
    url: "https://sre.google/sre-book/service-level-objectives/",
    note:
      "Ajuda a conectar otimização local com impacto real na experiência do usuário e no orçamento de erro.",
  },
  perfMan: {
    title: "perf(1)",
    source: "Linux man-pages",
    url: "https://www.man7.org/linux/man-pages/man1/perf.1.html",
    note:
      "Manual principal da suíte perf, útil para mapear record, report, lock, sched e trace.",
  },
  perfRecord: {
    title: "perf-record(1)",
    source: "Linux man-pages",
    url: "https://www.man7.org/linux/man-pages/man1/perf-record.1.html",
    note:
      "Documenta a coleta de perfis e amostras para análise posterior com perf report.",
  },
  perfReport: {
    title: "perf-report(1)",
    source: "Linux man-pages",
    url: "https://www.man7.org/linux/man-pages/man1/perf-report.1.html",
    note:
      "Manual para leitura de perf.data, incluindo visões mais centradas em latência.",
  },
  perfLock: {
    title: "perf-lock(1)",
    source: "Linux man-pages",
    url: "https://man7.org/linux/man-pages/man1/perf-lock.1.html",
    note:
      "Ferramenta do perf voltada para eventos de lock, estatísticas de contenção e lock ownership.",
  },
  perfStat: {
    title: "perf-stat(1)",
    source: "Linux man-pages",
    url: "https://man7.org/linux/man-pages/man1/perf-stat.1.html",
    note:
      "Ajuda a validar se uma mudança alterou contadores, instruções, ciclos ou comportamento geral da carga.",
  },
  criterionAnalysis: {
    title: "Analysis Process",
    source: "Criterion.rs Documentation",
    url: "https://bheisler.github.io/criterion.rs/book/analysis.html",
    note:
      "Explica warmup, medição, análise estatística e comparação de regressões em benchmarks Rust.",
  },
  goDiagnostics: {
    title: "Diagnostics",
    source: "Go Documentation",
    url: "https://go.dev/doc/diagnostics",
    note:
      "Página oficial sobre profiling, tracing e investigação de problemas de desempenho em Go.",
  },
  rustAtomics: {
    title: "std::sync::atomic",
    source: "Rust Standard Library",
    url: "https://doc.rust-lang.org/std/sync/atomic/",
    note:
      "Documentação oficial dos tipos atômicos e de suas garantias dentro do modelo de memória do Rust.",
  },
  rustOrdering: {
    title: "std::sync::atomic::Ordering",
    source: "Rust Standard Library",
    url: "https://doc.rust-lang.org/stable/std/sync/atomic/enum.Ordering.html",
    note:
      "Referência oficial sobre Relaxed, Acquire, Release, AcqRel e SeqCst.",
  },
  rustNomiconAtomics: {
    title: "Atomics",
    source: "The Rustonomicon",
    url: "https://doc.rust-lang.org/beta/nomicon/atomics.html",
    note:
      "Material oficial avançado sobre o modelo de memória, reordenação e armadilhas de código lock-free em Rust.",
  },
  rustMutex: {
    title: "std::sync::Mutex",
    source: "Rust Standard Library",
    url: "https://doc.rust-lang.org/stable/std/sync/struct.Mutex.html",
    note:
      "Documentação oficial do mutex do Rust para comparar locks tradicionais com abordagens lock-free.",
  },
  goAtomic: {
    title: "sync/atomic package",
    source: "Go Packages",
    url: "https://pkg.go.dev/sync/atomic",
    note:
      "Mostra as primitivas atômicas de Go e alerta que elas exigem grande cuidado para uso correto.",
  },
  goMemoryModel: {
    title: "The Go Memory Model",
    source: "Go",
    url: "https://go.dev/ref/mem",
    note:
      "Base oficial para entender happens-before, data races e o papel de atomics e mutexes em Go.",
  },
  goSync: {
    title: "sync package",
    source: "Go Packages",
    url: "https://pkg.go.dev/sync",
    note:
      "Referência oficial de Mutex, RWMutex e outras primitivas para comparar com atomics e canais.",
  },
  read2: {
    title: "read(2)",
    source: "Linux man-pages",
    url: "https://www.man7.org/linux/man-pages/man2/read.2.html",
    note:
      "Explica semântica de leitura, leituras parciais, bloqueio, retorno e errno.",
  },
  write2: {
    title: "write(2)",
    source: "Linux man-pages",
    url: "https://linuxman7.org/linux/man-pages/man2/write.2.html",
    note:
      "Documenta semântica de escrita, escritas parciais, atomicidade observável e erros comuns.",
  },
  readv2: {
    title: "readv(2) / writev(2)",
    source: "Linux man-pages",
    url: "https://man7.org/linux/man-pages/man2/readv.2.html",
    note:
      "Cobertura oficial de scatter/gather I/O para reduzir travessias e juntar buffers em uma chamada.",
  },
  recvmsg2: {
    title: "recv(2), recvfrom(2) e recvmsg(2)",
    source: "Linux man-pages",
    url: "https://man7.org/linux/man-pages/man2/recvmsg.2.html",
    note:
      "Base oficial para semântica de recebimento em sockets, flags e comportamento bloqueante.",
  },
  sendmsg2: {
    title: "send(2), sendto(2) e sendmsg(2)",
    source: "Linux man-pages",
    url: "https://man7.org/linux/man-pages/man2/sendmsg.2.html",
    note:
      "Documentação dos envios em sockets, inclusive variantes com msghdr e gather output.",
  },
  recvmmsg2: {
    title: "recvmmsg(2)",
    source: "Linux man-pages",
    url: "https://man7.org/linux/man-pages/man2/recvmmsg.2.html",
    note:
      "Exemplo oficial de batching em sockets: receber múltiplos datagramas em uma única chamada.",
  },
  ioUring7: {
    title: "io_uring(7)",
    source: "Linux man-pages",
    url: "https://www.man7.org/linux/man-pages/man7/io_uring.7.html",
    note:
      "Apresenta o modelo de filas compartilhadas e por que ele muda a forma de submeter I/O ao kernel.",
  },
  strace1: {
    title: "strace(1)",
    source: "Linux man-pages",
    url: "https://man7.org/linux/man-pages/man1/strace.1.html",
    note:
      "Ferramenta clássica para enxergar syscalls, tamanhos, erros e padrões de chamada de I/O.",
  },
} satisfies Record<string, LessonReference>;

function refs(...keys: Array<keyof typeof library>) {
  return keys.map((key) => library[key]);
}

function ref(title: string, source: string, url: string, note?: string): LessonReference {
  return { title, source, url, note };
}

function card(title: string, body: string): SummaryCard {
  return { title, body };
}

function g(term: string, definition: string): GlossaryTerm {
  return { term, definition };
}

function q(
  id: string,
  prompt: string,
  a: string,
  b: string,
  c: string,
  correctOptionId: "a" | "b" | "c",
  feedback: string,
): QuizQuestion {
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

function s(
  id: string,
  eyebrow: string,
  title: string,
  lead: string,
  paragraphs: string[],
  options?: {
    visual?: string;
    interactive?: string;
    blocks?: LessonContent["sections"][number]["blocks"];
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

const metodologiaDeOtimizacao: WaveL5PartADefinition = {
  visualConfig: {
    title: "Metodologia de Otimização",
    subtitle: "Observar, hipotetizar, experimentar e validar",
    level: "Intermediário",
    tags: ["Perf", "Observabilidade", "Profiling", "Experimento", "Validação", "Trade-off"],
    conceptNodes: ["sintoma", "mecanismo", "experimento", "resultado"],
    pipelineSteps: ["sinal", "escopo", "hipótese", "mudança", "validação"],
    leftLabel: "velocidade de iteração",
    rightLabel: "fidelidade de medição",
    impactRows: [
      { label: "Sinal principal", value: "latência, throughput ou CPU" },
      { label: "Unidade de análise", value: "rota, thread, syscall, função" },
      { label: "Mudança isolada", value: "uma variável por vez" },
      { label: "Critério de sucesso", value: "impacto técnico + impacto de negócio" },
    ],
  },
  interactionConfig: {
    title: "Metodologia de Otimização",
    tone: "teal",
    pipelineSteps: [
      {
        name: "Observe o sintoma",
        summary:
          "Comece com um sinal confiável: qual métrica se moveu, em qual janela de tempo e em qual parte do sistema o usuário sente a dor.",
        signal: "p95/p99, fila, erro, CPU, throughput",
        risk: "otimizar por impressão subjetiva",
        takeaway:
          "Sem sintoma delimitado você tende a perfilar o sistema inteiro e colecionar curiosidades em vez de encontrar uma causa provável.",
      },
      {
        name: "Reduza o escopo",
        summary:
          "Localize a investigação: endpoint, workload, thread, goroutine, core, operação de banco ou padrão de I/O.",
        signal: "onde a regressão concentra volume",
        risk: "misturar causas independentes",
        takeaway:
          "Escopo curto não garante verdade, mas reduz o espaço de busca e melhora a qualidade da hipótese.",
      },
      {
        name: "Formule a hipótese",
        summary:
          "Hipótese boa descreve mecanismo, não só esperança: por exemplo, contenção em lock, excesso de cópia, localidade ruim ou batching insuficiente.",
        signal: "mecanismo observável",
        risk: "confundir correlação com causa",
        takeaway:
          "A frase certa é 'acho que X produz Y porque Z', não 'vou tentar um truque conhecido'.",
      },
      {
        name: "Experimente com controle",
        summary:
          "Mude uma variável relevante e preserve o resto do ambiente o máximo possível para que o antes e depois sejam comparáveis.",
        signal: "mesma carga, mesma coleta, mesmo alvo",
        risk: "múltiplas mudanças na mesma rodada",
        takeaway:
          "Experimento fraco não mata hipótese ruim; ele apenas deixa a equipe mais confusa.",
      },
      {
        name: "Valide e documente",
        summary:
          "Confirme se o ganho aparece de novo, se não transferiu custo para outro lugar e se ainda faz sentido no contexto de produto.",
        signal: "repetição, regressão cruzada, SLO",
        risk: "celebrar benchmark local e piorar produção",
        takeaway:
          "Otimização madura fecha o ciclo com aprendizado reproduzível, não só com um número bonito em uma máquina.",
      },
    ],
    leftLabel: "exploração rápida",
    rightLabel: "medição rigorosa",
    tradeoffSummary:
      "Investigações muito leves aceleram o aprendizado inicial, mas podem mascarar ruído, warmup, fila e comportamento off-CPU. Investigações muito pesadas elevam a confiança, porém custam tempo, ferramentas e disciplina experimental.",
    tradeoffRisks: [
      "Você aprende rápido, mas pode perseguir ruído em vez de causa.",
      "Há bom equilíbrio, porém ainda existe risco de confirmação prematura.",
      "A evidência fica mais sólida, mas o ciclo de iteração desacelera.",
      "A coleta vira projeto em si e deixa de responder à pergunta original.",
    ],
    practiceRule:
      "Comece leve para localizar a região problemática e aumente a fidelidade apenas quando isso melhora a decisão, não por ritual.",
    scenarios: [
      {
        name: "API com p95 piorando",
        situation:
          "Uma rota crítica começa a violar SLO em horários de pico. CPU total do host não parece saturada, mas o tempo de resposta cresce e filas internas aparecem.",
        choice:
          "Comece delimitando a rota, compare volume versus latência e colete sinais de tempo bloqueado antes de reescrever código quente.",
        why:
          "O problema pode ser lock contention, espera em banco ou pressão de fila, e não necessariamente custo puro de CPU na função mais famosa do serviço.",
        caution:
          "Trocar algoritmo local sem medir tempo off-CPU e saturação pode melhorar um benchmark e deixar a cauda de latência igual.",
      },
      {
        name: "Worker de ingestão lento",
        situation:
          "Um processo que lê, transforma e grava eventos ficou mais lento após uma mudança de formato. Há suspeita de alocação excessiva.",
        choice:
          "Isole uma carga reprodutível, compare allocation profile, tamanho de lotes e número de syscalls por unidade de trabalho.",
        why:
          "O sintoma pode nascer de mais cópias, serialização pior ou batching quebrado; a hipótese precisa apontar qual mecanismo mudou.",
        caution:
          "Não parta direto para otimizações de microcódigo sem antes confirmar se o gargalo está em parser, memória ou I/O.",
      },
      {
        name: "Benchmark bonito, produção igual",
        situation:
          "Um ajuste diminui o tempo do microbenchmark, mas os painéis de produção não mudam de forma perceptível.",
        choice:
          "Revise se o benchmark representa o workload, se a fração otimizada é material e se o limite real está em outra etapa do fluxo.",
        why:
          "Muitas mudanças otimizam uma região correta, porém irrelevante diante de fila, banco, rede ou serialização.",
        caution:
          "Ganhos locais podem continuar válidos, mas não devem ser vendidos como solução do problema original sem validação no sistema inteiro.",
      },
    ],
  },
  content: {
    id: "metodologia-de-otimizacao",
    title: "Metodologia de Otimização",
    subtitle:
      "Performance engineering começa menos com truques e mais com um ciclo disciplinado: observar, formular hipótese, experimentar e validar.",
    description:
      "Uma aula prática sobre como investigar gargalos sem teatro de performance: sinais, hipótese causal, desenho de experimento, validação e prevenção de regressões.",
    primaryCategoryId: "computacao",
    secondaryCategoryId: "engenharia",
    level: "Intermediário",
    estimatedTime: "55-70 min",
    tags: ["Performance Engineering", "Observabilidade", "Profiling", "Benchmarking", "perf", "pprof"],
    learningObjectives: [
      "Transformar um sintoma de performance em uma pergunta técnica clara e mensurável.",
      "Distinguir observação, hipótese causal, experimento e validação final.",
      "Reduzir o risco de confirmar preconceitos com benchmarks frágeis ou perfis mal interpretados.",
      "Escolher o nível certo de instrumentação para cada etapa da investigação.",
      "Relacionar ganho local com impacto no SLO, no throughput e na experiência do usuário.",
      "Documentar aprendizados de performance para evitar regressões e repetição de erros.",
    ],
    prerequisites: [
      "Ter estudado ou ao menos conhecer a ideia de medir antes de otimizar.",
      "Noções básicas de profiling, flamegraphs e benchmarking ajudam bastante.",
      "É útil já ter uma intuição de CPU, memória, I/O e contenção como fontes diferentes de gargalo.",
    ],
    references: refs(
      "greggSystemsPerformance",
      "greggTsaMethod",
      "sreMonitoring",
      "sreSlo",
      "perfMan",
      "perfRecord",
      "perfStat",
      "criterionAnalysis",
      "goDiagnostics",
    ),
    heroVisual: visualIds.hero,
    openingText:
      "Otimizar sem método é uma das formas mais eficientes de desperdiçar tempo técnico. A equipe olha para um gráfico ruim, escolhe a parte mais chamativa do código, mexe em três coisas ao mesmo tempo e termina com uma história impossível de explicar. Performance engineering sério não é sobre adivinhar mais rápido: é sobre reduzir incerteza. Cada rodada idealmente responde a uma pergunta específica e deixa o sistema mais compreensível, mesmo quando a hipótese inicial estava errada.",
    quickFacts: [
      card("Sintoma não é causa", "A métrica que piorou aponta onde dói; ela raramente revela sozinha por que dói."),
      card("Hipótese boa descreve mecanismo", "Falar em lock, fila, cópia, cache ou syscall ensina mais do que falar em 'código lento'."),
      card("Experimento muda uma variável por vez", "Sem controle mínimo, você não sabe qual mudança produziu o efeito."),
      card("Validação fecha o ciclo", "Ganho local sem reflexo no sistema certo é aprendizado parcial, não solução completa."),
    ],
    sections: [
      s(
        "por-que-metodologia",
        "Mentalidade",
        "Otimização sem método costuma produzir histórias bonitas e diagnósticos ruins",
        "A tentação de 'tentar qualquer coisa rápida' cresce quando o problema é urgente, mas justamente aí o método vale mais.",
        [
          "Uma regressão real mistura várias camadas: workload, concorrência, dados, infraestrutura, escalonamento, caches e I/O. Se você escolhe uma única explicação cedo demais, passa a interpretar toda métrica como confirmação daquela narrativa.",
          "O papel da metodologia não é desacelerar por burocracia; é impedir que a equipe gaste dias em mudanças irrelevantes, quebre corretude ou torne o sistema mais frágil por uma melhora que nem era necessária.",
          "Na prática, bons times de performance trabalham como investigadores: primeiro delimitam o fenômeno, depois propõem um mecanismo plausível e só então mudam código ou configuração.",
        ],
        {
          visual: visualIds.hero,
          blocks: [
            {
              type: "definition",
              title: "Metodologia de otimização",
              body: "Sequência disciplinada para transformar um sintoma em hipótese testável, experimento controlado e decisão validada.",
            },
            {
              type: "mistake",
              title: "Erro comum",
              body: "Confundir urgência com licença para pular observação e partir direto para reescrita ou tuning genérico.",
            },
          ],
        },
      ),
      s(
        "ciclo-central",
        "Modelo",
        "Observe, formule hipótese, experimente e valide",
        "O ciclo é simples de memorizar, mas profundo no jeito como organiza o trabalho da investigação.",
        [
          "Observar significa localizar um sinal confiável e descrevê-lo com contexto: o que piorou, quando, sob qual carga, em qual componente e para qual classe de usuário ou requisição.",
          "Hipótese é a ponte entre sintoma e mecanismo. Ela precisa dizer como um comportamento interno do sistema poderia gerar o sintoma observado. Sem mecanismo, a investigação vira catálogo de palpites.",
          "Experimentar é introduzir uma mudança comparável com o cenário original. Validar é confirmar se a hipótese sobrevive fora do microambiente da experiência e se o ganho faz sentido para o problema inicial.",
        ],
        {
          visual: visualIds.concept,
          blocks: [
            {
              type: "insight",
              title: "Cada etapa reduz um tipo de incerteza",
              body: "Observação reduz confusão sobre o fenômeno, hipótese reduz o espaço de busca, experimento reduz ambiguidade causal e validação reduz o risco de regressão ou overfitting.",
            },
            {
              type: "example",
              title: "Exemplo mental",
              body: "Em vez de 'o serviço está lento', diga algo como 'a rota de checkout piora no p99 durante pico, sem aumento proporcional de CPU, então suspeito de espera em lock ou dependência externa'.",
            },
          ],
        },
      ),
      s(
        "observar-bem",
        "Observação",
        "Comece pelo sinal certo e reduza o escopo antes de tocar no código",
        "O primeiro ganho de uma boa investigação muitas vezes não é técnico; é semântico: parar de tratar tudo como o mesmo problema.",
        [
          "Um aumento de latência média não conta a mesma história que uma piora só na cauda. Um host com CPU estável, mas tempo de resposta piorando, sugere classes de gargalo diferentes de um host com saturação evidente.",
          "Reduzir escopo é vital. Endpoint, workload, tamanho de lote, tenant, versão, tipo de consulta ou etapa da pipeline podem ter comportamentos muito distintos. Investigar 'o sistema' inteiro costuma produzir ruído demais.",
          "Nessa fase você quer sinais comparáveis, não perfeição absoluta. Ferramentas leves e painéis confiáveis normalmente bastam para localizar a área onde vale aprofundar a coleta.",
        ],
        {
          interactive: interactionIds.pipeline,
          blocks: [
            {
              type: "definition",
              title: "Sinal operacional",
              body: "Métrica ou traço que realmente varia quando o problema aparece e que pode ser observado de novo sob condições semelhantes.",
            },
            {
              type: "mistake",
              title: "Erro comum",
              body: "Abrir um profiler pesado na primeira rodada sem saber qual workload e qual janela temporal reproduzem o sintoma relevante.",
            },
          ],
        },
      ),
      s(
        "hipotese-causal",
        "Hipótese",
        "Hipótese útil aponta um mecanismo plausível, não um desejo disfarçado",
        "Entre observar e mudar código existe uma etapa intelectual que separa engenharia de superstição.",
        [
          "Dizer 'acho que alocação está alta' ainda é pouco. O formato maduro é: 'acho que a alocação aumentou porque passamos a copiar buffers em cada etapa, o que eleva pressão no alocador e tempo de coleta'.",
          "Hipótese boa também sugere o que deveria aparecer na coleta se ela estiver correta. Se a suspeita é lock contention, espera-se fila em regiões críticas, tempo off-CPU compatível e talvez evidência em mutex profile ou perf lock.",
          "Quando duas hipóteses explicam o mesmo sintoma, a melhor investigação é a que desenha um experimento capaz de separar as duas em vez de tentar confirmar as duas ao mesmo tempo.",
        ],
        {
          blocks: [
            {
              type: "definition",
              title: "Hipótese causal",
              body: "Explicação provisória que relaciona sintoma observado a um mecanismo interno verificável.",
            },
            {
              type: "insight",
              title: "Toda hipótese embute previsões",
              body: "Se você não consegue dizer o que deveria mudar na métrica, no trace ou no perfil caso a hipótese seja verdadeira, ela ainda está vaga demais.",
            },
          ],
        },
      ),
      s(
        "experimento-controlado",
        "Experimento",
        "Rodadas controladas valem mais do que grandes refactors de uma vez",
        "Em performance, clareza causal costuma ser mais valiosa do que quantidade de mudanças por commit.",
        [
          "O experimento ideal preserva workload, ambiente, forma de medição e janela de observação. Nem sempre isso é possível por completo, mas a disciplina de aproximar esses elementos já melhora muito a qualidade das conclusões.",
          "Uma única variável por vez não é dogma cego; é forma de proteger o raciocínio. Se você troca algoritmo, tamanho de lote e configuração de runtime no mesmo teste, fica impossível saber quem produziu o ganho ou a piora.",
          "A interação a seguir ajuda a sentir um trade-off comum: aumentar rigor de medição eleva confiança, mas desacelera o ciclo de iteração. O segredo é calibrar o peso de cada lado para a decisão que precisa ser tomada.",
        ],
        {
          interactive: interactionIds.tradeoff,
          blocks: [
            {
              type: "example",
              title: "Exemplo prático",
              body: "Trocar apenas o tamanho do lote de escrita e medir de novo ensina mais do que trocar lote, formato de serialização e pool de buffers de uma vez.",
            },
            {
              type: "mistake",
              title: "Erro comum",
              body: "Usar o experimento para provar a conclusão desejada, escolhendo métricas ou cenários que favorecem a mudança já decidida.",
            },
          ],
        },
      ),
      s(
        "validar-direito",
        "Validação",
        "Validar é confirmar repetibilidade e impacto, não só olhar um antes e depois",
        "A otimização madura precisa sobreviver à segunda rodada, a outra máquina e, idealmente, ao workload real.",
        [
          "Resultados consistentes aparecem de novo quando você repete a coleta sob condições semelhantes. Se o ganho some a cada nova execução, talvez você tenha medido ruído, warmup, carga externa ou não determinismo do ambiente.",
          "Também é preciso validar deslocamento de custo. Reduzir CPU de uma função enquanto aumenta alocação, picos de cauda, contenção ou tráfego de rede pode ser uma troca aceitável ou um desastre; isso depende do objetivo original.",
          "Por fim, a decisão correta costuma envolver produto. Um ganho em throughput pode ser ótimo para um batch, mas irrelevante ou até ruim em uma rota online sensível à cauda de latência.",
        ],
        {
          visual: visualIds.tradeoff,
          blocks: [
            {
              type: "definition",
              title: "Repetibilidade",
              body: "Capacidade de reproduzir o comportamento observado com variação pequena o suficiente para sustentar uma decisão.",
            },
            {
              type: "insight",
              title: "Validar inclui efeitos colaterais",
              body: "O trabalho não termina quando a métrica principal melhora; ele termina quando você entende o que piorou, o que ficou neutro e por que a troca ainda vale.",
            },
          ],
        },
      ),
      s(
        "guardrails-regressao",
        "Guardrails",
        "Documente o aprendizado para evitar regressão e repetição de investigação",
        "Boa metodologia gera memória organizacional, não só hotfix de performance.",
        [
          "Se uma equipe descobre que certa rota degrada quando o lote cai abaixo de determinado perfil, esse conhecimento deveria virar teste, dashboard, benchmark, alerta ou pelo menos documentação de operação.",
          "Sem guardrails, o sistema volta ao mesmo problema meses depois, outra pessoa repete o diagnóstico do zero e o custo organizacional reaparece como se fosse uma surpresa inédita.",
          "O objetivo de performance engineering não é criar especialistas inacessíveis, e sim transformar investigação boa em rotina reproduzível para o time.",
        ],
        {
          visual: visualIds.impact,
          blocks: [
            {
              type: "example",
              title: "Guardrails típicos",
              body: "Benchmark representativo, painel com percentis, alerta de throughput por worker, profiling de regressão em CI ou checklist de rollout gradual.",
            },
            {
              type: "mistake",
              title: "Erro comum",
              body: "Guardar a explicação do ganho apenas no texto do commit sem vincular a métricas, gráficos ou hipóteses descartadas.",
            },
          ],
        },
      ),
      s(
        "ferramentas-rust-go",
        "Tooling",
        "Ferramentas boas ajudam, mas cada uma responde a perguntas diferentes",
        "Perf, pprof, traces e benchmarks são lentes complementares, não substitutas.",
        [
          "Profilers de CPU mostram onde há amostras on-CPU. Isso é excelente para loops quentes, mas insuficiente quando a dor dominante está em espera por lock, I/O, page fault ou run queue.",
          "Benchmarks servem para comparar hipóteses em ambiente controlado. Eles não substituem observação de produção, porque muitos gargalos reais nascem da composição entre várias camadas e não de uma função isolada.",
          "A melhor pergunta a fazer antes de qualquer ferramenta é: 'qual incerteza ela reduz agora?' Se a resposta não estiver clara, a coleta tende a virar ruído sofisticado.",
        ],
        {
          interactive: interactionIds.scenario,
          blocks: [
            {
              type: "definition",
              title: "Fidelidade de medição",
              body: "Grau em que a coleta representa o comportamento que você realmente quer explicar ou comparar.",
            },
            {
              type: "insight",
              title: "Ferramenta sem pergunta vira distração",
              body: "O valor do profiler está menos na popularidade da ferramenta e mais na adequação entre pergunta, overhead e tipo de evidência gerada.",
            },
          ],
        },
      ),
      s(
        "checklist-final",
        "Síntese",
        "Checklist mental para qualquer investigação de performance",
        "Se você lembrar destas perguntas, já reduz bastante a chance de otimizar no escuro.",
        [
          "Qual sintoma exatamente motivou a investigação? Qual unidade de trabalho ele afeta? Que mecanismo específico parece explicar esse comportamento? Que mudança isolada pode testar essa hipótese?",
          "Se o experimento mostrar ganho, como ele será validado fora do microcontexto? Se mostrar nada, qual hipótese foi descartada e qual próxima pergunta ficou mais promissora?",
          "Metodologia boa não elimina erros; ela torna os erros mais baratos e o aprendizado mais cumulativo.",
        ],
        {
          blocks: [
            {
              type: "formula",
              title: "Ciclo mínimo",
              body: "observe → delimite → hipotetize → experimente → valide → documente",
              formula: "sintoma + mecanismo + teste controlado + impacto reproduzível",
            },
          ],
        },
      ),
      s(
        "quiz-revisao",
        "Revisão",
        "Quiz de revisão",
        "Teste se o ciclo de investigação ficou operacional e não apenas memorável.",
        ["As perguntas abaixo reforçam a diferença entre sintoma, hipótese, experimento e validação."],
        { interactive: "quiz" },
      ),
      s(
        "glossario",
        "Vocabulário",
        "Glossário essencial",
        "Termos que aparecem repetidamente quando uma equipe trabalha performance de forma séria.",
        ["Use o glossário para fixar o vocabulário de investigação e discutir gargalos com mais precisão."],
        { interactive: "glossary" },
      ),
    ],
    summaryCards: [
      card("Observe antes de agir", "Sinal confiável e escopo bem delimitado evitam semanas de tuning cego."),
      card("Hipótese descreve mecanismo", "O caminho da causa importa mais do que a intuição do truque."),
      card("Valide no contexto certo", "Ganho local só vira solução quando resiste à repetição e ajuda o problema original."),
    ],
    quiz: [
      q(
        "met-q1",
        "Qual frase representa melhor uma hipótese útil de performance?",
        "Acho que o serviço está lento porque sim, então vou otimizar a função maior.",
        "Suspeito de contenção em lock na fila de trabalho, então espero ver tempo off-CPU e sinais de espera nessa região.",
        "Toda regressão deve ser resolvida primeiro com mais CPU.",
        "b",
        "Hipótese boa conecta sintoma a um mecanismo observável e prevê que tipo de evidência deveria aparecer.",
      ),
      q(
        "met-q2",
        "Por que reduzir o escopo da investigação cedo é importante?",
        "Porque qualquer ferramenta funciona melhor em um arquivo pequeno.",
        "Porque assim você evita medir e parte logo para correção.",
        "Porque problemas diferentes podem aparecer misturados quando você trata o sistema inteiro como uma única dor.",
        "c",
        "Delimitar rota, workload ou etapa reduz ruído e melhora a qualidade das hipóteses.",
      ),
      q(
        "met-q3",
        "Qual é o principal risco de mudar várias variáveis ao mesmo tempo em um experimento?",
        "O risco é apenas gastar mais memória.",
        "Fica difícil atribuir o efeito observado a uma causa específica.",
        "A coleta deixa de funcionar em qualquer profiler.",
        "b",
        "Sem isolamento mínimo, a relação causal entre mudança e resultado fica nebulosa.",
      ),
      q(
        "met-q4",
        "O que diferencia sintoma de causa?",
        "Sintoma é o efeito observado; causa é o mecanismo que o produz.",
        "Sintoma é sempre uma linha de código específica.",
        "Causa é sempre a métrica com maior valor no dashboard.",
        "a",
        "Latência alta, queda de throughput ou CPU saturada são sintomas; a causa pode ser lock, fila, cópia, I/O ou outro mecanismo.",
      ),
      q(
        "met-q5",
        "Quando um microbenchmark mostra ganho mas produção não muda, qual leitura é mais madura?",
        "O ganho local pode ser real, mas talvez a parte otimizada não domine o problema original.",
        "O benchmark sempre está errado.",
        "Produção nunca deve ser usada para validar performance.",
        "a",
        "Muitas otimizações corretas não deslocam o gargalo principal do sistema inteiro.",
      ),
      q(
        "met-q6",
        "Qual atitude combina melhor com validação?",
        "Aceitar o primeiro resultado positivo e seguir em frente.",
        "Repetir a medição, observar efeitos colaterais e confrontar o ganho com o objetivo de produto ou SLO.",
        "Trocar de ferramenta até aparecer um número melhor.",
        "b",
        "Validar inclui repetibilidade, impacto cruzado e aderência ao objetivo original.",
      ),
      q(
        "met-q7",
        "Qual pergunta uma ferramenta de profiling deve responder antes de ser usada?",
        "Qual cor ela usa no flamegraph.",
        "Qual incerteza da investigação ela reduz neste momento.",
        "Quantos comandos de shell ela possui.",
        "b",
        "Ferramenta boa é a que responde à pergunta certa com overhead e granularidade adequados.",
      ),
      q(
        "met-q8",
        "O que é um bom guardrail após uma otimização importante?",
        "Deixar o conhecimento apenas na memória de quem fez a mudança.",
        "Adicionar algum mecanismo que ajude a detectar ou explicar regressões semelhantes no futuro.",
        "Remover todas as métricas para evitar ruído.",
        "b",
        "Benchmark, painel, alerta ou documentação operacional transformam o ganho em memória reutilizável do time.",
      ),
    ],
    glossary: [
      g("Sintoma", "Manifestação observável do problema, como latência alta, throughput baixo ou fila crescendo."),
      g("Hipótese causal", "Explicação provisória que conecta o sintoma a um mecanismo técnico observável."),
      g("Escopo", "Recorte da investigação: rota, workload, thread, componente, etapa ou perfil de dado."),
      g("Experimento controlado", "Rodada em que se tenta isolar a mudança relevante para comparar antes e depois."),
      g("Repetibilidade", "Capacidade de reproduzir um resultado com estabilidade suficiente para sustentar decisão."),
      g("Ruído", "Variação não explicada que contamina a leitura de métricas ou benchmarks."),
      g("Profiling", "Coleta de evidência sobre onde tempo, CPU, memória ou espera estão sendo gastos."),
      g("SLO", "Objetivo de nível de serviço que transforma métricas em critério operacional relevante."),
      g("Overfitting de benchmark", "Quando uma mudança melhora o teste local, mas não o comportamento que importa no sistema real."),
      g("Guardrail", "Proteção organizacional ou técnica que ajuda a detectar regressões e preservar aprendizado."),
      g("Fidelidade de medição", "Grau em que a coleta representa a pergunta de performance que você quer responder."),
    ],
    relatedTopics: [
      card("Medir Antes de Otimizar", "Complementa esta aula com a disciplina de coleta e leitura crítica de métricas."),
      card("Flamegraphs e Profiling", "Ajuda a escolher e interpretar as ferramentas usadas na fase de observação."),
    ],
  },
};

const contencaoLocksEFilas: WaveL5PartADefinition = {
  visualConfig: {
    title: "Contenção, Locks e Filas",
    subtitle: "Esperar também é custo",
    level: "Avançado",
    tags: ["Locks", "Filas", "Off-CPU", "Mutex", "Queueing", "Throughput"],
    conceptNodes: ["região crítica", "espera", "fila", "saturação"],
    pipelineSteps: ["chegada", "tentativa", "espera", "execução", "acordar"],
    leftLabel: "menos compartilhamento",
    rightLabel: "mais coordenação central",
    impactRows: [
      { label: "Sinal principal", value: "tempo de espera e cauda de latência" },
      { label: "Pergunta central", value: "quem segura o lock e por quanto tempo" },
      { label: "Risco oculto", value: "convoying e fila invisível" },
      { label: "Mitigação comum", value: "reduzir escopo crítico ou particionar estado" },
    ],
  },
  interactionConfig: {
    title: "Contenção, Locks e Filas",
    tone: "amber",
    pipelineSteps: [
      {
        name: "Trabalho chega",
        summary:
          "Múltiplas threads ou goroutines tentam tocar o mesmo estado ou recurso sincronizado dentro de uma janela curta.",
        signal: "burst, backlog, picos de concorrência",
        risk: "subestimar o pico olhando média",
        takeaway:
          "Contenção nasce do encontro entre padrão de chegada e centralização do estado, não apenas do lock em si.",
      },
      {
        name: "Disputa pelo lock",
        summary:
          "Cada participante tenta entrar na região crítica. Se alguém já está dentro, o restante vira fila explícita ou implícita.",
        signal: "mutex wait, block profile, off-CPU",
        risk: "culpar a CPU quando o tempo está em espera",
        takeaway:
          "Espera em lock é latência adicionada antes mesmo de o trabalho útil começar.",
      },
      {
        name: "Fila cresce",
        summary:
          "Quanto maior o hold time ou a taxa de chegada, mais tempo cada unidade de trabalho precisa esperar para começar.",
        signal: "cauda piora mais que a média",
        risk: "convoying e amplificação de jitter",
        takeaway:
          "Filas transformam pequenas variações em grandes caudas quando o sistema opera perto da saturação.",
      },
      {
        name: "Região crítica executa",
        summary:
          "A thread dona do lock faz o trabalho protegido. Se esse trecho acessa I/O, memória fria ou lógica demais, a fila atrás sofre.",
        signal: "hold time alto, código quente dentro do lock",
        risk: "misturar invariantes com trabalho não essencial",
        takeaway:
          "Otimizar contenção frequentemente significa diminuir o trabalho feito sob proteção, não remover o lock por reflexo.",
      },
      {
        name: "Wake-up e reentrada",
        summary:
          "Quem esperou precisa ser acordado, voltar a disputar CPU e talvez disputar o lock novamente sob alta concorrência.",
        signal: "off-CPU seguido de run queue",
        risk: "esquecer custo de acordar e reagendar",
        takeaway:
          "Mesmo depois de o lock liberar, ainda há custo de escalonamento e retomada que afeta a cauda.",
      },
    ],
    leftLabel: "simplicidade e invariantes",
    rightLabel: "escalabilidade e particionamento",
    tradeoffSummary:
      "Locks simples preservam invariantes com clareza, mas concentram tráfego em um ponto quente. Técnicas para reduzir fila — sharding, ownership, read-copy-update, redução do escopo crítico — tendem a escalar melhor, porém aumentam complexidade de desenho e observabilidade.",
    tradeoffRisks: [
      "Você privilegia clareza, mas pode centralizar demais um caminho muito quente.",
      "O equilíbrio é bom, porém a fila ainda aparece sob picos de concorrência.",
      "A escalabilidade melhora, mas o estado fica mais espalhado e difícil de raciocinar.",
      "A arquitetura fica agressiva demais e a complexidade operacional passa a dominar o custo total.",
    ],
    practiceRule:
      "Antes de trocar o lock, pergunte se o problema é invariância legítima, trabalho excessivo dentro da região crítica ou compartilhamento desnecessário.",
    scenarios: [
      {
        name: "Contador global de métricas",
        situation:
          "Centenas de workers atualizam um mesmo conjunto de contadores em alta frequência, e a cauda de latência aparece justamente em horários de maior paralelismo.",
        choice:
          "Avalie contadores por shard ou por thread com agregação posterior, em vez de insistir em um único ponto global sob lock.",
        why:
          "O valor lógico continua existindo, mas a coordenação deixa de ocorrer no caminho quente de cada atualização individual.",
        caution:
          "A agregação muda a semântica de leitura instantânea; isso pode ser ótimo para telemetria e ruim para decisões que exigem valor exato naquele instante.",
      },
      {
        name: "Mapa compartilhado de cache",
        situation:
          "Um mapa sob mutex atende leituras e escritas, mas apenas uma fração pequena do tráfego realmente modifica entradas.",
        choice:
          "Compare mutex simples, RWMutex e até snapshots para leitura read-mostly, sempre medindo hold time e padrão real de acesso.",
        why:
          "RWMutex só compensa quando a leitura domina de verdade e a gestão de writers não se transforma em novo gargalo.",
        caution:
          "Migrar para RWMutex sem medir pode piorar a situação se a escrita seguir frequente ou se houver starvation de writers.",
      },
      {
        name: "Fila de jobs centralizada",
        situation:
          "Um scheduler caseiro usa um único lock para decidir prioridade, fazer accounting e despachar trabalho para muitos consumidores.",
        choice:
          "Separe invariantes essenciais da lógica administrativa e veja se parte do trabalho pode acontecer fora da região crítica ou por fila particionada.",
        why:
          "O lock talvez esteja protegendo coisa demais: decisão, logging, estatística e despacho no mesmo bloco.",
        caution:
          "Distribuir filas sem estratégia pode aumentar desequilíbrio, complicar fairness e criar hotspots em outro lugar.",
      },
    ],
  },
  content: {
    id: "contencao-locks-e-filas",
    title: "Contenção, Locks e Filas",
    subtitle:
      "Muitos gargalos parecem CPU, mas na prática são tempo gasto esperando: por um lock, por uma fila ou pela chance de voltar à CPU.",
    description:
      "Aula avançada sobre lock contention, regiões críticas, hold time, lock wait time, convoying, filas e técnicas para reduzir espera sem sacrificar corretude.",
    primaryCategoryId: "computacao",
    secondaryCategoryId: "engenharia",
    level: "Avançado",
    estimatedTime: "60-75 min",
    tags: ["Lock Contention", "Filas", "Mutex", "Off-CPU", "Sched", "Escalabilidade"],
    learningObjectives: [
      "Explicar por que espera em lock e filas também são consumo de tempo, mesmo sem CPU alta.",
      "Distinguir hold time, wait time, convoying e saturação por taxa de chegada.",
      "Relacionar compartilhamento excessivo com filas invisíveis dentro do software.",
      "Comparar mitigação por redução de região crítica, sharding, ownership e estruturas read-mostly.",
      "Usar perf lock, perf e perfis off-CPU como evidência em vez de palpite.",
      "Evitar a armadilha de culpar o lock quando o problema real é arquitetura ou trabalho demais na seção crítica.",
    ],
    prerequisites: [
      "Noções de processos, threads, goroutines ou outras formas de concorrência.",
      "É útil entender o básico de syscalls, escalonamento e acesso a memória compartilhada.",
      "Ter estudado concorrência de baixo nível ajuda bastante a aproveitar a aula.",
    ],
    references: [
      ...refs(
        "greggSystemsPerformance",
        "greggTsaMethod",
        "greggOffCpu",
        "greggPerfExamples",
        "perfMan",
        "perfLock",
        "perfReport",
      ),
      ref(
        "Queuing Models",
        "MIT 1.041 / Queueing Theory Notes",
        "https://web.mit.edu/1.041/spring2023/lectures/L8-queuing-models-2023sp.pdf",
        "Notas didáticas para conectar taxa de chegada, ocupação, fila e tempo de resposta.",
      ),
      library.goSync,
      library.rustMutex,
    ],
    heroVisual: visualIds.hero,
    openingText:
      "Quando duas ou duzentas unidades de trabalho precisam da mesma decisão central ao mesmo tempo, a pergunta importante deixa de ser 'quanto custa a instrução?' e passa a ser 'quanto custa esperar para poder executar a instrução?'. Locks e filas existem para preservar corretude e organizar fluxo, mas também criam pontos de serialização. Em sistemas concorrentes, esperar pode ser o custo dominante — e esse custo quase sempre aparece primeiro como latência, não como CPU.",
    quickFacts: [
      card("Espera é trabalho do ponto de vista do usuário", "Se a thread ficou parada por lock, o request continuou lento do mesmo jeito."),
      card("Fila amplifica variação", "Pequenos atrasos no caminho crítico podem explodir a cauda quando o sistema está perto do limite."),
      card("Lock não é vilão automático", "Muitas vezes o problema é o tamanho da região crítica ou o compartilhamento do estado."),
      card("Off-CPU precisa entrar na história", "Sem medir espera, você enxerga só metade do gargalo."),
    ],
    sections: [
      s(
        "esperar-tambem-custa",
        "Motivação",
        "Contenção é desempenho pago em forma de espera",
        "Um sistema pode parecer leve em CPU e ainda assim estar perdendo muito tempo em filas e bloqueios.",
        [
          "Se várias threads tentam avançar por uma mesma porta estreita, boa parte do tempo total passa a ser gasto aguardando vez, e não executando trabalho útil. Do lado do usuário, essa distinção importa pouco: latência é latência.",
          "Essa é uma razão comum para perfis tradicionais de CPU parecerem decepcionantes. O hot path lógico do request existe, mas muitas requisições passam boa parte da vida fora da CPU, esperando lock, socket, disco ou retorno do scheduler.",
          "A boa engenharia de performance trata espera como cidadão de primeira classe. Não basta saber onde o tempo on-CPU vai; é preciso saber onde a thread estaciona e por quê.",
        ],
        {
          visual: visualIds.hero,
          blocks: [
            {
              type: "definition",
              title: "Contenção",
              body: "Situação em que múltiplos executores competem pelo mesmo recurso sincronizado ou ponto de serialização.",
            },
            {
              type: "insight",
              title: "Latência inclui fila",
              body: "Para quem chama o sistema, o tempo parado esperando um lock é tão real quanto o tempo gasto calculando algo.",
            },
          ],
        },
      ),
      s(
        "de-lock-para-fila",
        "Modelo",
        "Lock é uma fila com semântica de exclusão",
        "Pensar em lock como fila ajuda a sair da visão simplista de 'tem ou não tem lock'.",
        [
          "Toda vez que uma região crítica só permite um dono por vez, os demais candidatos formam algum tipo de fila: explícita, escondida na implementação do runtime ou dispersa em reacordar e tentar de novo.",
          "Esse enquadramento aproxima programação concorrente de teoria de filas. Taxa de chegada, tempo de serviço e variabilidade passam a influenciar diretamente throughput e cauda de latência.",
          "O ganho dessa visão é estratégico: em vez de discutir só primitiva, você começa a perguntar onde a serialização nasce, quanto tempo ela dura e como redistribuir o trabalho.",
        ],
        {
          visual: visualIds.concept,
          blocks: [
            {
              type: "definition",
              title: "Hold time",
              body: "Tempo em que um lock permanece com um dono e impede o avanço dos demais.",
            },
            {
              type: "definition",
              title: "Wait time",
              body: "Tempo gasto esperando para adquirir o lock ou entrar na região crítica.",
            },
          ],
        },
      ),
      s(
        "caminho-da-contencao",
        "Fluxo",
        "Do trabalho que chega ao trabalho que finalmente começa",
        "A maior parte da dor de contenção não está no lock isolado, mas no encadeamento lock → fila → wake-up → novo atraso.",
        [
          "Primeiro chega trabalho concorrente. Depois todos tentam tocar o mesmo estado. Quando um já está dentro, os demais vão para espera. Até aqui quase nada de CPU útil aconteceu para quem ficou atrás.",
          "Se o trecho protegido é grande ou imprevisível, a fila cresce e a cauda se alonga. Em seguida vem o custo de acordar quem estava esperando e recolocá-lo em condição de disputar CPU e lock novamente.",
          "A interação abaixo destaca essas etapas para reforçar que o gargalo de lock raramente é apenas um `Lock()` caro; ele é um fluxo de serialização com múltiplos custos em cascata.",
        ],
        {
          interactive: interactionIds.pipeline,
          blocks: [
            {
              type: "example",
              title: "Exemplo",
              body: "Um mapa compartilhado protegido por mutex pode parecer trivial em baixa carga e se transformar em gargalo quando muitas goroutines consultam, atualizam e registram estatísticas dentro da mesma seção crítica.",
            },
          ],
        },
      ),
      s(
        "hold-time-vs-wait-time",
        "Diagnóstico",
        "O que segura a fila importa tanto quanto o tamanho da fila",
        "Dois sistemas podem ter o mesmo número de esperas e custos bem diferentes dependendo do tempo passado dentro da região crítica.",
        [
          "Se o hold time cresce, cada unidade de trabalho que chega atrás sofre mais. Se a taxa de chegada cresce mantendo hold time constante, a fila também pode explodir. Os dois fenômenos são parecidos no sintoma, mas pedem respostas distintas.",
          "Por isso vale diferenciar custo intrínseco do trecho protegido e padrão de concorrência. Às vezes o lock protege pouca coisa, mas gente demais bate nele. Em outros casos, pouca concorrência já basta porque o trecho protegido faz trabalho demais.",
          "Essa distinção orienta a mitigação: reduzir trabalho sob lock, mover I/O para fora, shardear estado, trocar política de acesso ou simplesmente aceitar o lock quando a invariância vale mais do que o ganho potencial.",
        ],
        {
          blocks: [
            {
              type: "mistake",
              title: "Erro comum",
              body: "Olhar apenas quantidade de locks adquiridos sem medir quanto tempo os outros passaram esperando ou quanto trabalho ocorre dentro da região crítica.",
            },
            {
              type: "insight",
              title: "Fila é multiplicadora",
              body: "Uma pequena piora no hold time de um ponto central pode aparecer como grande aumento de cauda para todo o tráfego concorrente.",
            },
          ],
        },
      ),
      s(
        "rwmutex-e-read-mostly",
        "Trade-offs",
        "Nem todo padrão read-mostly pede RWMutex, e nem todo RWMutex melhora throughput",
        "Separar leitores e escritores pode ajudar bastante, mas o perfil real de acesso continua mandando.",
        [
          "Quando leituras dominam e a escrita é rara, permitir vários leitores em paralelo pode reduzir fila percebida. Porém isso só vale quando a semântica de leitura concorrente realmente se encaixa e quando o custo de coordenar writers compensa.",
          "Em alguns workloads, a escrita continua frequente o suficiente para transformar `RWMutex` em uma otimização cosmética com mais complexidade. Em outros, snapshots imutáveis ou copy-on-write podem ser melhores do que travar leitura em torno do mesmo estado mutável.",
          "A régua certa continua sendo evidência: padrão de leitura e escrita, hold time, impacto na cauda e custo cognitivo do desenho.",
        ],
        {
          interactive: interactionIds.tradeoff,
          blocks: [
            {
              type: "mistake",
              title: "Erro comum",
              body: "Migrar automaticamente para `RWMutex` ao ver leitura alta sem medir a frequência e a sensibilidade do caminho de escrita.",
            },
            {
              type: "definition",
              title: "Convoying",
              body: "Fenômeno em que um atraso numa região crítica faz um conjunto de esperadores acumular e seguir se influenciando negativamente em cascata.",
            },
          ],
        },
      ),
      s(
        "reduzir-compartilhamento",
        "Projeto",
        "Reduzir contenção costuma significar reduzir compartilhamento",
        "Muitos gargalos de lock somem não porque o lock foi trocado, mas porque o estado deixou de ser centralizado demais.",
        [
          "Sharding, ownership por fila, agregação posterior, partição por core ou por tenant e separação entre dados quentes e frios são formas de fazer menos atores dependerem do mesmo ponto de decisão.",
          "Essas mudanças podem aumentar complexidade de reconciliação ou observabilidade, mas frequentemente atacam a causa estrutural da fila. O lock continua existindo em algum lugar, só deixa de estar no caminho de todo mundo.",
          "Esse tipo de refatoração também conversa com locality e layout de dados: às vezes reduzir contenção melhora tanto coordenação quanto comportamento de cache.",
        ],
        {
          visual: visualIds.tradeoff,
          blocks: [
            {
              type: "example",
              title: "Exemplo",
              body: "Contadores por shard com agregação periódica reduzem disputa local ao custo de uma leitura global menos imediata.",
            },
            {
              type: "insight",
              title: "Escalabilidade é desenho de fluxo",
              body: "Quanto mais trabalho precisa da mesma verdade instantânea, mais fila o sistema tende a produzir sob carga.",
            },
          ],
        },
      ),
      s(
        "medir-espera",
        "Ferramentas",
        "Perfis de espera e lock analysis mostram o que CPU pura não mostra",
        "Contenção boa de investigar começa com perguntas precisas e ferramentas adequadas ao fenômeno off-CPU.",
        [
          "Perfis on-CPU continuam úteis para entender o que acontece dentro da região crítica. Mas eles não revelam sozinhos quanto tempo ficou parado do lado de fora. É aí que entram perfis de mutex, block profiles, perf lock e análise off-CPU.",
          "Ferramentas como `perf lock` ajudam a identificar eventos de lock e estatísticas de contenção. Já abordagens off-CPU ajudam a enxergar pilhas de espera e a distinguir lock wait de sono por I/O ou run queue.",
          "A combinação madura é cruzar o hotspot com o comportamento de espera: qual região segura o lock, por quanto tempo, quem espera atrás e o que o dono estava fazendo enquanto segurava a fila.",
        ],
        {
          visual: visualIds.impact,
          blocks: [
            {
              type: "definition",
              title: "Off-CPU",
              body: "Tempo em que uma thread não está executando na CPU, frequentemente porque está dormindo, esperando lock ou aguardando ser reagendada.",
            },
            {
              type: "mistake",
              title: "Erro comum",
              body: "Concluir que não há gargalo importante porque o processo usa pouca CPU, sem medir espera e fila.",
            },
          ],
        },
      ),
      s(
        "cenarios-decisao",
        "Aplicação",
        "O mesmo lock pode ser correto em um contexto e problemático em outro",
        "Contexto muda a decisão. O lock ideal não existe fora do workload e da invariância que ele protege.",
        [
          "Alguns caminhos são frios o suficiente para que um mutex simples seja impecável. Outros exigem partição, snapshots ou mudança de ownership porque a coordenação central já virou gargalo de produto.",
          "A pergunta madura não é 'lock é lento?'. É 'qual garantia esse lock protege, qual fila ele cria e quanto custa manter essa centralização diante da carga real?'.",
          "A interação abaixo compara cenários justamente para exercitar essa mudança de lente: sair da primitiva e voltar ao desenho do sistema.",
        ],
        {
          interactive: interactionIds.scenario,
          blocks: [
            {
              type: "insight",
              title: "Trade-off situacional",
              body: "A mesma técnica pode ser elegante num cache read-mostly e péssima num scheduler com fairness forte e escrita frequente.",
            },
          ],
        },
      ),
      s(
        "quiz-revisao",
        "Revisão",
        "Quiz de revisão",
        "Verifique se o modelo de lock como fila ficou claro.",
        ["As perguntas reforçam a diferença entre custo de CPU, espera, hold time e mitigação arquitetural."],
        { interactive: "quiz" },
      ),
      s(
        "glossario",
        "Vocabulário",
        "Glossário essencial",
        "Conceitos que ajudam a discutir contenção com precisão técnica.",
        ["Use o glossário para nomear corretamente o tipo de espera e a forma de mitigação."],
        { interactive: "glossary" },
      ),
    ],
    summaryCards: [
      card("Lock também é fila", "Quem não entra na região crítica entra na cauda de espera."),
      card("Off-CPU conta muito", "Latência de lock quase sempre aparece primeiro como tempo fora da CPU."),
      card("Escalar é compartilhar menos", "Mitigações robustas geralmente reduzem o quanto todos dependem da mesma verdade central."),
    ],
    quiz: [
      q(
        "locks-q1",
        "Por que um sistema pode sofrer contenção forte sem mostrar CPU alta?",
        "Porque parte importante do tempo está sendo gasta esperando lock, fila ou wake-up.",
        "Porque locks só afetam memória, nunca latência.",
        "Porque profiling de CPU mede qualquer forma de espera automaticamente.",
        "a",
        "Boa parte da dor de contenção é off-CPU, então CPU moderada não elimina a hipótese de gargalo sério.",
      ),
      q(
        "locks-q2",
        "O que hold time mede?",
        "O número total de locks existentes no programa.",
        "O tempo em que o lock permanece em posse de um dono.",
        "O intervalo entre deploys.",
        "b",
        "Hold time é o tempo dentro da região crítica, segurando os demais na fila.",
      ),
      q(
        "locks-q3",
        "Qual leitura sobre locks é mais madura?",
        "Todo lock é ruim e deve ser removido.",
        "Locks são aceitáveis quando protegem invariantes relevantes e não criam fila problemática no workload real.",
        "O único lock bom é o spinlock.",
        "b",
        "O custo do lock depende do contexto, da taxa de chegada e do trabalho executado sob proteção.",
      ),
      q(
        "locks-q4",
        "Quando um RWMutex tende a ajudar mais?",
        "Quando a leitura domina de fato e a escrita é relativamente rara.",
        "Quando qualquer código possui mais de uma função.",
        "Quando a escrita é o caminho principal do sistema.",
        "a",
        "Separar leitores e escritores só compensa quando o perfil real favorece esse desenho.",
      ),
      q(
        "locks-q5",
        "O que é convoying?",
        "Um algoritmo de rede para balanceamento de pacotes.",
        "Uma amplificação de atraso em fila causada por seções críticas ou despertares que passam a influenciar vários esperadores.",
        "Uma forma de compilação incremental.",
        "b",
        "Convoying ajuda a explicar por que pequenas lentidões locais podem virar caudas longas sob concorrência.",
      ),
      q(
        "locks-q6",
        "Qual ação costuma atacar a causa estrutural da contenção?",
        "Reduzir compartilhamento ou particionar estado quente.",
        "Adicionar logs dentro da região crítica.",
        "Executar mais trabalho de I/O enquanto o lock está segurado.",
        "a",
        "Sharding, ownership e separação de estado costumam reduzir a fila em vez de só trocar a primitiva.",
      ),
      q(
        "locks-q7",
        "Que tipo de ferramenta ajuda especialmente a enxergar lock contention?",
        "Ferramentas que medem espera, mutex e eventos de lock, como perf lock e perfis off-CPU.",
        "Apenas um compilador em modo release.",
        "Somente contadores de linhas de código.",
        "a",
        "Contenção pede evidência de espera e não apenas uso de CPU.",
      ),
      q(
        "locks-q8",
        "Qual é um erro comum ao diagnosticar contenção?",
        "Separar trabalho útil de espera.",
        "Medir hold time e wait time.",
        "Culpar o lock isoladamente sem analisar o tamanho da região crítica e o compartilhamento que ele protege.",
        "c",
        "O lock pode ser apenas o sintoma visível de um desenho excessivamente centralizado ou de trabalho demais sob proteção.",
      ),
    ],
    glossary: [
      g("Lock contention", "Espera causada por vários executores competindo pela mesma primitiva de exclusão."),
      g("Hold time", "Duração pela qual o lock permanece com um dono."),
      g("Wait time", "Tempo gasto aguardando a aquisição do lock."),
      g("Região crítica", "Trecho de código e estado que devem ser acessados com exclusão ou coordenação específica."),
      g("Convoying", "Efeito em cascata em que atrasos locais aumentam a fila e pioram a cauda do sistema."),
      g("Off-CPU", "Tempo fora da CPU, frequentemente em espera por lock, I/O ou reagendamento."),
      g("Sharding", "Particionamento do estado para reduzir disputa sobre um único ponto global."),
      g("Read-mostly", "Perfil em que leituras dominam e escritas são menos frequentes."),
      g("Wake-up cost", "Custo de acordar e recolocar em execução quem estava esperando."),
      g("Saturação", "Estado em que a taxa de chegada ou a ocupação tornam filas e atrasos muito sensíveis."),
      g("Fairness", "Propriedade de distribuição razoável de acesso ou progresso entre competidores."),
    ],
    relatedTopics: [
      card("Concorrência de Baixo Nível", "Fornece o vocabulário base para locks, atomics e coordenação compartilhada."),
      card("False Sharing e Cache Lines", "Mostra que contenção nem sempre vem de lock explícito; o hardware também cria espera."),
    ],
  },
};

const lockFreeComCuidado: WaveL5PartADefinition = {
  visualConfig: {
    title: "Lock-Free (com Cuidado)",
    subtitle: "Não é automaticamente mais rápido",
    level: "Avançado",
    tags: ["Lock-Free", "Atomics", "CAS", "Memory Ordering", "ABA", "Wait-Free"],
    conceptNodes: ["progresso", "CAS", "ordenação", "reclamação de memória"],
    pipelineSteps: ["ler", "tentar CAS", "falhar", "repetir", "publicar"],
    leftLabel: "simplicidade sem lock-free",
    rightLabel: "agressividade lock-free",
    impactRows: [
      { label: "Pergunta principal", value: "qual progresso você realmente precisa" },
      { label: "Risco técnico", value: "ABA, ordering e lifetime" },
      { label: "Sinal útil", value: "retry loops, cache traffic, tail latency" },
      { label: "Alternativa válida", value: "mutex, canal ou shard simples" },
    ],
  },
  interactionConfig: {
    title: "Lock-Free (com Cuidado)",
    tone: "indigo",
    pipelineSteps: [
      {
        name: "Ler o estado atual",
        summary:
          "Uma thread observa o valor ou ponteiro corrente e calcula qual seria a próxima versão desejada do estado.",
        signal: "load atômico e snapshot local",
        risk: "assumir que nada mudou até o commit",
        takeaway:
          "No lock-free, ler não reserva exclusividade; entre a leitura e a publicação, o mundo pode mudar várias vezes.",
      },
      {
        name: "Tentar publicar com CAS",
        summary:
          "A mudança só é aceita se o estado ainda corresponder ao valor esperado. Caso contrário, o compare-and-swap falha.",
        signal: "sucesso ou falha do CAS",
        risk: "loops de retry sob contenção",
        takeaway:
          "CAS não remove coordenação; ele desloca a coordenação para tentativas otimistas e possíveis repetições.",
      },
      {
        name: "Lidar com falhas",
        summary:
          "Quando a tentativa falha, a thread relê o estado, reavalia a lógica e tenta outra vez.",
        signal: "taxa de retries",
        risk: "starvation ou gasto excessivo de CPU",
        takeaway:
          "Sob alta disputa, falhar e tentar de novo pode custar mais do que dormir esperando um lock curto e bem projetado.",
      },
      {
        name: "Garantir visibilidade",
        summary:
          "A escolha do memory ordering define quais escritas ficam visíveis para outros observadores e em que relação temporal.",
        signal: "Acquire, Release, SeqCst e semântica do modelo",
        risk: "código parece correto, mas publica estado incompleto",
        takeaway:
          "Lock-free correto depende tanto de progresso quanto de publicação correta de memória.",
      },
      {
        name: "Tratar a vida dos dados",
        summary:
          "Em estruturas com ponteiros ou nós reciclados, é preciso evitar ABA e uso após descarte com estratégias explícitas de reclamation.",
        signal: "hazard pointers, epochs, versões ou ownership claro",
        risk: "bugs raros, severos e difíceis de reproduzir",
        takeaway:
          "A grande complexidade do lock-free quase sempre aparece na gestão de memória e invariantes, não no CAS em si.",
      },
    ],
    leftLabel: "clareza e invariantes",
    rightLabel: "progresso lock-free",
    tradeoffSummary:
      "Estruturas lock-free podem reduzir bloqueios e melhorar certos perfis de disputa, mas trazem complexidade de ordering, loops de retry, cache traffic, ABA e reclamation. Em muitos casos, um lock curto, um canal ou um shard simples entrega desempenho melhor com muito menos risco.",
    tradeoffRisks: [
      "Você mantém clareza e corretude, mas talvez perca escalabilidade em um ponto realmente quente.",
      "Há bom compromisso, porém ainda existe custo de coordenação e alguma fila em cargas de pico.",
      "Você reduz bloqueio explícito, mas aumenta retries, pressão de cache e dificuldade de raciocínio.",
      "A solução vira sofisticada demais, e o custo cognitivo ou o risco de bug supera o ganho prático.",
    ],
    practiceRule:
      "Use lock-free quando o perfil de workload e a semântica do problema justificarem o aumento de complexidade — e depois meça de novo.",
    scenarios: [
      {
        name: "Flag de desligamento",
        situation:
          "Várias threads precisam observar um pedido simples de encerramento e não há invariantes compostas nem estrutura complexa associada ao valor.",
        choice:
          "Uma atomic flag costuma ser excelente aqui: estado pequeno, semântica simples e pouca necessidade de coordenação estrutural.",
        why:
          "O valor protege um sinal único e o custo cognitivo permanece baixo, desde que a publicação seja feita com ordering apropriado.",
        caution:
          "Mesmo flags simples exigem pensar em visibilidade: o problema não é só atualizar o bit, mas publicar corretamente o que ele significa para o restante do programa.",
      },
      {
        name: "Fila encadeada concorrente",
        situation:
          "Você quer throughput alto em múltiplos produtores e consumidores e considera trocar uma fila sob mutex por uma estrutura lock-free com ponteiros.",
        choice:
          "Avalie primeiro se o lock atual realmente domina a latência e se o custo de ordering e memory reclamation cabe na maturidade da equipe.",
        why:
          "A fila lock-free pode reduzir bloqueio em certos cenários, mas também introduz ABA, loops de CAS e bugs muito mais difíceis de debugar.",
        caution:
          "Não venda lock-free como ganho automático: com baixa ou média contenção, um mutex bem desenhado pode ser mais rápido e muito mais seguro.",
      },
      {
        name: "Cache read-mostly",
        situation:
          "Muitas threads leem uma estrutura quase imutável, e atualizações são raras, porém precisam ser publicadas sem parar leitores.",
        choice:
          "Snapshots imutáveis com troca atômica de ponteiro ou mecanismos read-copy-update podem fazer mais sentido do que lock-free genérico em cada operação.",
        why:
          "Você reduz disputa no caminho de leitura e mantém a complexidade concentrada no caminho raro de publicação.",
        caution:
          "Ainda é preciso definir ciclo de vida dos snapshots e garantir que leituras antigas não usem memória já reciclada.",
      },
    ],
  },
  content: {
    id: "lock-free-com-cuidado",
    title: "Lock-Free (com Cuidado)",
    subtitle:
      "Código lock-free pode ser elegante e útil em contextos específicos, mas não é um passe mágico para ganhar performance ou corretude.",
    description:
      "Aula avançada sobre progresso lock-free, CAS, memory ordering, ABA, gestão de memória e critérios práticos para decidir quando atomics realmente vencem.",
    primaryCategoryId: "computacao",
    secondaryCategoryId: "engenharia",
    level: "Avançado",
    estimatedTime: "65-80 min",
    tags: ["Lock-Free", "CAS", "Atomics", "Ordering", "ABA", "Concorrência"],
    learningObjectives: [
      "Definir lock-free em termos de garantia de progresso, sem confundir com 'mais rápido por padrão'.",
      "Explicar o papel de CAS, retries e memory ordering em algoritmos sem lock explícito.",
      "Reconhecer por que ABA e reclamation de memória tornam estruturas lock-free difíceis na prática.",
      "Comparar atomics, mutexes, canais e sharding conforme o tipo de estado e o perfil de contenção.",
      "Interpretar o custo de retries, cache traffic e complexidade cognitiva como parte do orçamento de performance.",
      "Evitar evangelismo: usar lock-free quando ele resolve um problema real e mensurável.",
    ],
    prerequisites: [
      "Conhecimento básico de concorrência, exclusão mútua e memória compartilhada.",
      "Noções de atomics, cache coherence e false sharing ajudam muito.",
      "É útil ter visto ao menos uma introdução a Rust ou Go para reconhecer as APIs citadas.",
    ],
    references: refs(
      "rustAtomics",
      "rustOrdering",
      "rustNomiconAtomics",
      "rustMutex",
      "goAtomic",
      "goMemoryModel",
      "goSync",
      "greggSystemsPerformance",
    ),
    heroVisual: visualIds.hero,
    openingText:
      "Lock-free é sedutor porque parece prometer o melhor dos dois mundos: evitar bloqueio e ainda ganhar performance. Mas, em software real, a pergunta certa não é 'há lock?'. A pergunta é 'qual coordenação esse problema exige, quanto custa implementá-la e quem pagará a conta da complexidade?'. Algoritmos lock-free deslocam o problema: saem filas explícitas, entram retries, ordering, tráfego de cache e gerenciamento delicado do ciclo de vida dos dados. Às vezes isso vale muito. Muitas vezes, não.",
    quickFacts: [
      card("Lock-free é garantia de progresso, não de velocidade", "Você pode evitar bloqueio total e ainda assim gastar muita CPU em retries."),
      card("CAS não resolve tudo sozinho", "A dificuldade real costuma estar em publicar memória corretamente e reciclar dados sem erro."),
      card("Mutex curto continua excelente em muitos casos", "Quando o estado é composto ou a contenção é moderada, simplicidade pode vencer."),
      card("Não misture 'atômico' com 'invariante completo'", "Uma operação composta segura raramente cabe em um único CAS."),
    ],
    sections: [
      s(
        "o-que-esta-em-jogo",
        "Motivação",
        "Lock-free interessa porque muda como o sistema progride sob disputa",
        "O tema não gira apenas em torno de performance média; ele trata do que acontece quando muitos atores tentam avançar ao mesmo tempo.",
        [
          "Em uma estrutura com lock, um competidor pode bloquear os outros enquanto segura a região crítica. Em uma estrutura lock-free, a promessa é diferente: mesmo sob disputa, algum participante continua fazendo progresso sem exigir exclusão global tradicional.",
          "Essa promessa é valiosa em alguns caminhos extremamente quentes ou sensíveis a bloqueio. Mas ela não elimina coordenação, apenas a reexpressa por meio de atomics, retries e regras de visibilidade.",
          "Por isso, a comparação madura não é lock versus lock-free em abstrato; é mecanismo versus mecanismo dentro de um workload concreto.",
        ],
        {
          visual: visualIds.hero,
          blocks: [
            {
              type: "definition",
              title: "Lock-free",
              body: "Classe de algoritmo concorrente em que o sistema como um todo continua progredindo sem depender de exclusão mútua tradicional para cada operação.",
            },
            {
              type: "mistake",
              title: "Erro comum",
              body: "Usar lock-free como sinônimo de wait-free, de zero contenção ou de 'sempre mais rápido'.",
            },
          ],
        },
      ),
      s(
        "garantias-de-progresso",
        "Conceito",
        "Obstruction-free, lock-free e wait-free não dizem a mesma coisa",
        "A primeira confusão a evitar é semântica: diferentes algoritmos prometem diferentes níveis de progresso.",
        [
          "Obstruction-free costuma garantir avanço apenas quando a thread eventualmente executa sozinha. Lock-free garante que alguma thread progride. Wait-free vai mais longe e tenta garantir que cada operação termina em número finito de passos.",
          "Essas categorias importam porque a conversa sobre desempenho e justiça depende delas. Um algoritmo lock-free pode sofrer starvation individual, e mesmo assim cumprir sua promessa global de progresso.",
          "Entender o tipo de garantia evita vender o algoritmo errado para o problema errado — especialmente quando previsibilidade de cauda importa mais do que throughput bruto.",
        ],
        {
          visual: visualIds.concept,
          blocks: [
            {
              type: "definition",
              title: "Wait-free",
              body: "Garantia mais forte em que cada operação individual conclui em número finito de passos, independentemente do comportamento dos demais.",
            },
            {
              type: "insight",
              title: "Mais forte não significa sempre melhor",
              body: "Garantias de progresso mais fortes costumam cobrar caro em complexidade, espaço, engenharia e até desempenho em workloads comuns.",
            },
          ],
        },
      ),
      s(
        "cas-e-retries",
        "Fluxo",
        "O coração de muitos algoritmos lock-free é: ler, tentar CAS, falhar e recomeçar",
        "A parte elegante da ideia é curta; a parte difícil está em tudo o que orbita em volta dela.",
        [
          "Uma thread observa um estado, calcula um novo estado e tenta publicá-lo com compare-and-swap. Se outra thread mudou o valor antes, o CAS falha e a operação recomeça com uma nova leitura.",
          "Esse padrão é poderoso porque evita exclusão tradicional em diversas situações. Mas sob contenção ele pode produzir tempestades de retries, desperdiçando ciclos que um lock curto teria transformado em espera mais previsível.",
          "A interação abaixo evidencia esse ciclo para mostrar que lock-free ainda coordena atores concorrentes — só faz isso de modo otimista e repetitivo.",
        ],
        {
          interactive: interactionIds.pipeline,
          blocks: [
            {
              type: "example",
              title: "Exemplo",
              body: "Um contador atômico simples costuma funcionar muito bem. Já uma fila encadeada com múltiplos produtores e consumidores adiciona estados intermediários, ponteiros e riscos que o contador não tem.",
            },
          ],
        },
      ),
      s(
        "ordering-publicacao",
        "Memória",
        "Atomicidade sem ordenação adequada ainda pode publicar estado errado",
        "A palavra 'atômico' é traiçoeira porque parece prometer mais do que realmente garante.",
        [
          "Operações atômicas impedem certas condições de corrida no endereço tocado, mas não automaticamente em todo o estado lógico que depende daquele endereço. É por isso que memory ordering importa tanto.",
          "Em Rust, você escolhe explicitamente orderings como Relaxed, Acquire, Release, AcqRel e SeqCst. Em Go, os atomics oficiais se comportam como sequencialmente consistentes, o que simplifica o modelo observado pelo usuário, embora não elimine a necessidade de raciocinar sobre publicação.",
          "A grande pergunta é: quando outro observador vê a atualização atômica, quais outras escritas relacionadas ele está autorizado a ver também? Sem essa resposta, o algoritmo pode parecer funcionar por meses e falhar sob combinação rara de interleavings.",
        ],
        {
          blocks: [
            {
              type: "definition",
              title: "Memory ordering",
              body: "Conjunto de garantias sobre como leituras e escritas ficam observáveis entre threads ao redor de operações atômicas.",
            },
            {
              type: "mistake",
              title: "Erro comum",
              body: "Trocar um valor compartilhado por um atomic e assumir que toda a estrutura lógica ao redor agora está corretamente sincronizada.",
            },
          ],
        },
      ),
      s(
        "aba-e-lifetime",
        "Armadilhas",
        "ABA e ciclo de vida dos dados são onde muitos projetos lock-free realmente doem",
        "A parte mais perigosa do lock-free geralmente não está no CAS, mas no que ele não vê.",
        [
          "O problema ABA aparece quando uma thread lê um valor A, outra o muda para B e depois de volta para A. Para o CAS, o valor parece inalterado, mas o mundo intermediário pode ter mudado profundamente.",
          "Em estruturas com ponteiros, outra armadilha é o lifetime: um nó removido pode ser reciclado enquanto outra thread ainda o observa. Resolver isso exige estratégias como epochs, hazard pointers, contagem cuidadosa de referências ou modelos de ownership bem delimitados.",
          "Esses detalhes explicam por que tantas estruturas lock-free de produção são pequenas, muito revisadas ou encapsuladas em bibliotecas maduras. O custo de errar é alto e difícil de depurar.",
        ],
        {
          visual: visualIds.pipeline,
          blocks: [
            {
              type: "definition",
              title: "ABA",
              body: "Situação em que o valor lido parece igual ao original, embora tenha passado por mudanças intermediárias relevantes para a corretude.",
            },
            {
              type: "insight",
              title: "Tipo de bug cruel",
              body: "Muitos erros lock-free passam em testes simples e só aparecem em produção sob padrões raros de interleaving e reciclagem de memória.",
            },
          ],
        },
      ),
      s(
        "contencao-e-backoff",
        "Trade-offs",
        "Sem lock explícito não significa sem contenção",
        "Sob disputa, o custo pode migrar da espera dormindo para loops quentes, cache traffic e starvation.",
        [
          "Quando muitas threads repetem CAS sobre a mesma célula ou o mesmo ponteiro, a linha de cache continua disputada. Além disso, quem falha precisa reler, recalcular e tentar de novo. Isso pode consumir CPU intensamente sem melhorar a produtividade do sistema.",
          "Backoff e técnicas de dispersão ajudam, mas introduzem novos parâmetros e novos compromissos. Em certos workloads, um lock bem curto transforma briga caótica em fila previsível e vence justamente por ser mais simples.",
          "A interação a seguir coloca essa intuição no eixo certo: lock-free agressivo pode reduzir bloqueio, porém aumentar retry cost, complexidade e sensibilidade a layout de memória.",
        ],
        {
          interactive: interactionIds.tradeoff,
          blocks: [
            {
              type: "mistake",
              title: "Erro comum",
              body: "Medir apenas throughput médio e ignorar retry loops, fairness, cauda de latência e custo de manutenção.",
            },
            {
              type: "example",
              title: "Exemplo",
              body: "Um contador global atômico em disputa pesada pode sofrer com line bouncing e virar um ponto quente tão real quanto um mutex disputado.",
            },
          ],
        },
      ),
      s(
        "quando-lock-vence",
        "Decisão",
        "Mutex, canal ou shard simples muitas vezes vencem por economia de complexidade",
        "Não há derrota conceitual em escolher uma solução mais simples quando ela atende corretude e desempenho suficiente.",
        [
          "Se o estado é composto, se a invariância envolve múltiplos campos ou se a contenção observada é moderada, locks tradicionais podem entregar excelente resultado com muito menos risco. O mesmo vale para ownership via canais ou particionamento simples do estado.",
          "Essa escolha não é conservadorismo preguiçoso. É engenharia: medir o custo real do mecanismo e compará-lo ao custo de construir, revisar, testar e operar uma estrutura lock-free delicada.",
          "Ao comparar alternativas, lembre que tempo de desenvolvimento, chance de bug e clareza de manutenção também fazem parte do orçamento de performance do produto.",
        ],
        {
          blocks: [
            {
              type: "insight",
              title: "Desempenho total inclui custo humano",
              body: "Uma solução 5% mais rápida e 5 vezes mais difícil de manter pode ser pior para o sistema ao longo do tempo.",
            },
          ],
        },
      ),
      s(
        "rust-go",
        "Ecossistema",
        "Rust e Go expõem atomics de formas diferentes, mas ambos pedem disciplina",
        "A linguagem muda a ergonomia, não a realidade física da memória compartilhada.",
        [
          "Rust torna explícitos os orderings e costuma empurrar o programador para fronteiras de segurança mais visíveis. Isso ajuda a não esconder complexidade, mas não elimina a necessidade de raciocinar profundamente sobre visibilidade e aliasing.",
          "Go oferece um modelo mais concentrado em atomics sequencialmente consistentes, além de recomendações fortes para preferir `sync` ou canais fora de casos realmente low-level. Isso reduz espaço de erro em alguns usos, mas não torna estruturas lock-free compostas automaticamente simples.",
          "A lição transversal é a mesma: comece pelas primitivas mais claras para o problema, e só desça para lock-free quando o ganho esperado justificar o peso semântico e operacional.",
        ],
        {
          interactive: interactionIds.scenario,
          blocks: [
            {
              type: "definition",
              title: "CAS",
              body: "Compare-and-swap: operação atômica que publica um novo valor apenas se o valor observado ainda for o esperado.",
            },
          ],
        },
      ),
      s(
        "quiz-revisao",
        "Revisão",
        "Quiz de revisão",
        "Teste se a prudência do título virou critério prático de decisão.",
        ["As perguntas destacam progresso, ordering, retries e os limites do lock-free."],
        { interactive: "quiz" },
      ),
      s(
        "glossario",
        "Vocabulário",
        "Glossário essencial",
        "Termos fundamentais para ler documentação e discutir algoritmos lock-free com precisão.",
        ["Use o glossário para fixar a diferença entre atomicidade, ordenação e garantias de progresso."],
        { interactive: "glossary" },
      ),
    ],
    summaryCards: [
      card("Lock-free não é mantra", "É uma ferramenta especializada para problemas específicos."),
      card("Atomicidade não basta", "Ordering e publicação correta definem se o algoritmo realmente é seguro."),
      card("Complexidade principal mora no lifetime", "ABA e reclamation tornam estruturas lock-free muito mais difíceis do que um CAS sugere."),
    ],
    quiz: [
      q(
        "lockfree-q1",
        "Qual afirmação sobre lock-free é a mais correta?",
        "Lock-free significa sempre mais rápido do que mutex.",
        "Lock-free descreve uma garantia de progresso, não uma garantia universal de desempenho melhor.",
        "Lock-free e wait-free são sinônimos.",
        "b",
        "O valor de lock-free depende do workload, da contenção e da complexidade necessária para manter corretude.",
      ),
      q(
        "lockfree-q2",
        "O que um loop com CAS faz quando falha?",
        "Entra automaticamente em modo kernel.",
        "Garante que todos os outros observadores parem.",
        "Relê o estado e tenta publicar de novo sob um novo snapshot.",
        "c",
        "Falha de CAS indica que outro ator mudou o estado no meio do caminho, então a tentativa precisa ser recalculada.",
      ),
      q(
        "lockfree-q3",
        "Por que memory ordering importa em código lock-free?",
        "Porque operações atômicas precisam de cor especial no editor.",
        "Porque atomicidade sozinha não diz quais outras escritas ficam visíveis para outras threads.",
        "Porque apenas o compilador precisa disso, nunca o hardware.",
        "b",
        "O problema central é publicação correta de estado, não só atualização indivisível de um endereço.",
      ),
      q(
        "lockfree-q4",
        "O que é o problema ABA?",
        "Um algoritmo de compressão de filas.",
        "Uma forma de deadlock com três mutexes.",
        "Quando o valor parece ter voltado ao original, embora mudanças intermediárias relevantes tenham ocorrido.",
        "c",
        "ABA mostra que igualdade aparente do valor nem sempre implica equivalência semântica do estado.",
      ),
      q(
        "lockfree-q5",
        "Qual cenário costuma combinar bem com atomics simples?",
        "Uma flag ou contador pequeno com semântica bem delimitada.",
        "Qualquer estrutura complexa com múltiplos ponteiros e invariantes compostas.",
        "Um banco de dados inteiro sem particionamento.",
        "a",
        "Estados pequenos e com significado claro costumam ser as melhores portas de entrada para atomics.",
      ),
      q(
        "lockfree-q6",
        "Por que lock-free pode consumir muita CPU sob contenção?",
        "Porque toda falha de CAS implica kernel panic.",
        "Porque retries repetidos e tráfego de cache podem substituir espera dormindo por trabalho improdutivo.",
        "Porque o compilador sempre desativa otimizações.",
        "b",
        "Sem lock explícito ainda pode haver muita disputa e repetição de trabalho.",
      ),
      q(
        "lockfree-q7",
        "Quando um mutex pode ser a escolha melhor?",
        "Quando a invariância é composta, a contenção é moderada ou o custo de complexidade lock-free não se paga.",
        "Nunca; mutex é sempre obsoleto.",
        "Somente em código single-thread.",
        "a",
        "Simplicidade, corretude e desempenho suficiente fazem de mutex uma excelente ferramenta em muitos casos.",
      ),
      q(
        "lockfree-q8",
        "Qual é uma mensagem central desta aula?",
        "Lock-free deve ser adotado por padrão em todo caminho concorrente.",
        "O critério para usar lock-free deve incluir workload, progresso necessário, ordering, lifetime e comparação real com alternativas mais simples.",
        "Atomics eliminam a necessidade de pensar em arquitetura.",
        "b",
        "O título 'com cuidado' existe justamente para lembrar que a técnica precisa se justificar empiricamente e semanticamente.",
      ),
    ],
    glossary: [
      g("Lock-free", "Garantia de progresso em que o sistema como um todo continua avançando sem lock tradicional por operação."),
      g("Wait-free", "Garantia de progresso em que cada operação individual conclui em número finito de passos."),
      g("CAS", "Compare-and-swap, operação atômica que publica um novo valor apenas se o antigo ainda for o esperado."),
      g("Retry loop", "Laço que relê o estado e tenta novamente após falha de CAS."),
      g("Memory ordering", "Regras sobre como leituras e escritas se tornam observáveis entre threads ao redor de operações atômicas."),
      g("Acquire", "Ordering usado para garantir que leituras e operações seguintes vejam escritas previamente publicadas."),
      g("Release", "Ordering usado para publicar escritas anteriores antes de tornar um valor observável para outros."),
      g("SeqCst", "Ordenação sequencialmente consistente, mais forte e mais fácil de raciocinar, embora nem sempre necessária."),
      g("ABA", "Problema em que o valor observado parece o mesmo, mas passou por mudanças intermediárias relevantes."),
      g("Memory reclamation", "Estratégia para reciclar memória com segurança quando várias threads podem ainda observar referências antigas."),
      g("Starvation", "Situação em que algum participante pode demorar indefinidamente para progredir, apesar do sistema avançar."),
    ],
    relatedTopics: [
      card("Contenção, Locks e Filas", "Ajuda a comparar lock-free com o custo real de esperar em estruturas com lock."),
      card("Go: sync, Atomic e Mutex", "Oferece a base prática para escolher primitivas antes de descer ao nível de algoritmos lock-free."),
    ],
  },
};

const syscallsEOverheadDeIo: WaveL5PartADefinition = {
  visualConfig: {
    title: "Syscalls e Overhead de I/O",
    subtitle: "Cruzar o kernel tem preço",
    level: "Intermediário",
    tags: ["Syscalls", "I/O", "Batching", "readv", "strace", "io_uring"],
    conceptNodes: ["fronteira", "granularidade", "cópia", "prontidão"],
    pipelineSteps: ["gerar dados", "entrar no kernel", "validar/copiar", "esperar dispositivo", "retornar"],
    leftLabel: "resposta imediata",
    rightLabel: "amortização por lote",
    impactRows: [
      { label: "Pergunta central", value: "quantas travessias por unidade útil" },
      { label: "Risco frequente", value: "syscalls pequenas demais" },
      { label: "Ferramenta inicial", value: "strace ou perf trace" },
      { label: "Alternativa comum", value: "buffers, readv/writev, recvmmsg ou mmap" },
    ],
  },
  interactionConfig: {
    title: "Syscalls e Overhead de I/O",
    tone: "emerald",
    pipelineSteps: [
      {
        name: "Gerar a intenção",
        summary:
          "O programa decide ler, escrever, enviar ou receber dados e prepara descritores, buffers e tamanho do pedido.",
        signal: "tamanho do lote e frequência da chamada",
        risk: "unidades úteis pequenas demais",
        takeaway:
          "A eficiência da travessia começa antes do kernel: o formato do pedido já define quanta sobrecarga será amortizada.",
      },
      {
        name: "Entrar no kernel",
        summary:
          "A chamada cruza a fronteira user space → kernel space, passa por wrappers, validação de argumentos e seleção do subsistema certo.",
        signal: "contagem de syscalls e padrão temporal",
        risk: "achar que a travessia é gratuita",
        takeaway:
          "Mesmo quando o trabalho útil parece simples, entrar no kernel já traz custo de coordenação e checagem.",
      },
      {
        name: "Copiar, mapear ou descrever buffers",
        summary:
          "Dependendo da interface escolhida, dados podem ser copiados, referenciados por múltiplos vetores ou acessados por regiões mapeadas.",
        signal: "cópias por unidade útil e layout dos buffers",
        risk: "copiar mais do que o necessário",
        takeaway:
          "Boa parte do overhead de I/O nasce de como os dados são apresentados ao kernel, não só do dispositivo em si.",
      },
      {
        name: "Esperar prontidão",
        summary:
          "O kernel pode concluir logo, bloquear a thread, retornar parcial ou exigir mecanismos de prontidão para continuar sem bloquear.",
        signal: "readiness, partials, EAGAIN",
        risk: "tratar I/O como sempre completo e imediato",
        takeaway:
          "A semântica de retorno faz parte do custo: bloqueio e reentrada moldam latência e throughput.",
      },
      {
        name: "Retornar e repetir",
        summary:
          "O programa recebe resultado, atualiza estado e decide se fará nova syscall, maior lote, scatter/gather ou outro modelo de I/O.",
        signal: "travessias por segundo e por requisição",
        risk: "loop de syscalls minúsculas",
        takeaway:
          "Otimização robusta em I/O frequentemente vem de menos travessias ou travessias melhor preenchidas.",
      },
    ],
    leftLabel: "latência unitária",
    rightLabel: "throughput por lote",
    tradeoffSummary:
      "Fazer chamadas menores aumenta responsividade unitária, mas pode desperdiçar a própria travessia ao kernel. Lotes maiores, scatter/gather, chamadas vetorizadas e filas compartilhadas amortizam overhead, porém podem elevar bufferização, cauda ou complexidade de controle.",
    tradeoffRisks: [
      "Resposta rápida por unidade, mas sobrecarga de syscall domina o custo total.",
      "Equilíbrio bom para muitos workloads, embora ainda haja alguma fragmentação.",
      "Throughput melhora, mas cresce o cuidado com memória, backlog e latência de cauda.",
      "A estratégia fica agressiva demais e a lógica de buffering ou completion se torna mais cara do que o ganho obtido.",
    ],
    practiceRule:
      "Antes de procurar uma API exótica, conte quantas travessias ao kernel existem por unidade útil e veja se elas estão bem preenchidas.",
    scenarios: [
      {
        name: "Log com muitas escritas pequenas",
        situation:
          "Um processo grava mensagens curtas em alta frequência e passa a gastar tempo demais em escrita e flush, mesmo sem volume gigante de dados por segundo.",
        choice:
          "Revise buffering e agrupamento de writes antes de trocar a lógica interna do formatter.",
        why:
          "O problema pode ser mais a quantidade de travessias e sincronizações do que o custo de formatar cada mensagem.",
        caution:
          "Batching excessivo pode piorar durabilidade percebida ou aumentar latência de visibilidade dos eventos.",
      },
      {
        name: "Servidor UDP recebendo datagramas",
        situation:
          "O processo recebe grande quantidade de mensagens pequenas e o perfil mostra muito tempo em borda de syscall.",
        choice:
          "Avalie chamadas batched como `recvmmsg` e layout de buffers que reduzam o número de entradas no kernel por rajada.",
        why:
          "Receber várias mensagens por chamada pode amortizar a travessia sem mudar o protocolo lógico do serviço.",
        caution:
          "O ganho depende do padrão de carga e da tolerância do sistema a acumular lotes em vez de processar cada datagrama imediatamente.",
      },
      {
        name: "Leitura read-mostly de arquivo grande",
        situation:
          "Uma aplicação percorre dados grandes com padrão de acesso relativamente previsível e você considera trocar read() repetido por mmap ou outro modelo.",
        choice:
          "Compare o custo das cópias e da ergonomia de acesso com o comportamento de page faults e o controle que você precisa sobre o fluxo.",
        why:
          "mmap pode simplificar acesso e evitar algumas cópias explícitas, mas desloca parte do custo para faltas de página e para a política do kernel.",
        caution:
          "Não trate mmap como atalho universal para velocidade; ele muda o modelo de I/O e o perfil de diagnóstico.",
      },
    ],
  },
  content: {
    id: "syscalls-e-overhead-de-io",
    title: "Syscalls e Overhead de I/O",
    subtitle:
      "Ao trabalhar com arquivos, sockets e dispositivos, parte crucial da performance depende menos do dado em si e mais de quantas vezes e de que forma você cruza a fronteira com o kernel.",
    description:
      "Uma aula sobre overhead de syscalls em I/O: granularidade, batching, scatter/gather, bloqueio, cópias, mmap, recvmmsg, io_uring e observação com strace/perf.",
    primaryCategoryId: "computacao",
    secondaryCategoryId: "engenharia",
    level: "Intermediário",
    estimatedTime: "55-70 min",
    tags: ["Syscalls", "I/O", "Linux", "Batching", "readv/writev", "strace"],
    learningObjectives: [
      "Explicar por que a travessia user space ↔ kernel space entra no custo do I/O.",
      "Relacionar granularidade de syscalls com latência, throughput e desperdício de overhead.",
      "Comparar read/write, readv/writev, recvmsg/recvmmsg, mmap e io_uring em termos conceituais.",
      "Reconhecer quando o problema principal é excesso de chamadas pequenas em vez de dispositivo lento.",
      "Interpretar leituras parciais, bloqueio e prontidão como parte do desenho do I/O.",
      "Usar strace e perf como ferramentas iniciais para enxergar frequência, padrão e forma das syscalls.",
    ],
    prerequisites: [
      "Noção básica de user space, kernel space e descritores de arquivo.",
      "Ajuda já conhecer o essencial de syscalls tradicionais como read e write.",
      "É útil ter visto latência versus throughput e a ideia de batching em sistemas.",
    ],
    references: refs(
      "read2",
      "write2",
      "readv2",
      "recvmsg2",
      "sendmsg2",
      "recvmmsg2",
      "ioUring7",
      "strace1",
      "perfMan",
      "greggSystemsPerformance",
    ),
    heroVisual: visualIds.hero,
    openingText:
      "Quando um programa faz I/O, o custo total raramente está só no disco, na rede ou na função do seu código. Há também o preço de conversar com o kernel, validar argumentos, copiar ou descrever buffers, dormir esperando prontidão e voltar para user space. Esse preço por travessia pode ficar quase invisível em chamadas bem preenchidas — ou dominar completamente o desempenho quando o programa transforma cada unidade minúscula de trabalho em uma syscall própria.",
    quickFacts: [
      card("I/O não é só dispositivo", "A forma de pedir o I/O influencia tanto quanto o recurso acessado."),
      card("Chamadas pequenas se acumulam rápido", "Muitas travessias podem custar mais do que o trabalho útil dentro de cada uma."),
      card("Batching é ferramenta, não dogma", "Lotes amortizam overhead, mas podem empurrar custo para buffers, cauda e complexidade."),
      card("Mudar a API muda o perfil", "mmap, readv e io_uring não são meros atalhos; cada um altera semântica e observabilidade."),
    ],
    sections: [
      s(
        "travessia-custa",
        "Motivação",
        "Cruzar a fronteira do kernel tem custo mesmo antes de o dispositivo entrar em cena",
        "Grande parte da engenharia de I/O é escolher quando vale a pena pagar essa travessia e como preenchê-la bem.",
        [
          "Toda syscall de I/O precisa entrar no kernel, validar descritores, entender buffers, acessar subsistemas internos e eventualmente coordenar bloqueio ou prontidão. Isso vale tanto para arquivo quanto para rede.",
          "Se a chamada carrega trabalho útil suficiente, o custo da borda pode ser pequeno no quadro geral. Se cada syscall leva pouquíssimos bytes ou uma operação logicamente minúscula, a borda passa a competir com o trabalho útil.",
          "Por isso, otimizações de I/O frequentemente começam com uma pergunta desconfortável e poderosa: quantas travessias ao kernel estou fazendo por unidade de trabalho de verdade?",
        ],
        {
          visual: visualIds.hero,
          blocks: [
            {
              type: "definition",
              title: "Overhead de syscall",
              body: "Custo associado à travessia user↔kernel, à validação e à coordenação necessária para executar a operação pedida.",
            },
            {
              type: "insight",
              title: "Granularidade é projeto",
              body: "O tamanho lógico de cada chamada costuma ser uma decisão de arquitetura de fluxo, não mero detalhe de implementação.",
            },
          ],
        },
      ),
      s(
        "modelo-mental-io",
        "Modelo",
        "I/O é fronteira, dados, espera e retorno semântico",
        "A imagem correta não é 'chamei write e o disco resolveu'; há um pequeno fluxo com custos e escolhas no meio.",
        [
          "O programa prepara o pedido, cruza a fronteira, descreve buffers, pode bloquear esperando recurso ou retornar parcial, e então decide o próximo passo. Esse ciclo se repete inúmeras vezes sob carga.",
          "A API escolhida altera como os dados entram nessa conversa. Chamadas simples lidam com um buffer por vez; interfaces vetorizadas descrevem vários buffers; mmap muda o modelo para acesso por memória mapeada; io_uring muda a submissão e a colheita das respostas.",
          "Pensar no fluxo inteiro ajuda a evitar duas simplificações ruins: culpar apenas o hardware ou acreditar que trocar de API sempre reduz custo sem mover nada de lugar.",
        ],
        {
          visual: visualIds.concept,
          blocks: [
            {
              type: "definition",
              title: "Granularidade de I/O",
              body: "Quantidade de trabalho útil agrupada por chamada ou submissão ao kernel.",
            },
          ],
        },
      ),
      s(
        "pipeline-da-syscall",
        "Fluxo",
        "Veja onde o custo aparece entre o pedido e o retorno",
        "Mesmo sem usar números absolutos, dá para raciocinar muito sobre eficiência observando etapas e repetições.",
        [
          "Se uma aplicação gera muitos pequenos pedidos, entra no kernel inúmeras vezes e ainda recebe resultados parciais que exigem novas chamadas, o overhead tende a se acumular.",
          "Quando o pedido descreve melhor os buffers e concentra trabalho útil, a travessia é mais amortizada. Isso não elimina bloqueio ou cópia, mas muda o balanço entre custo fixo e custo útil.",
          "A interação abaixo ajuda a percorrer essas etapas e localizar onde diferentes tipos de melhoria costumam atuar: buffering, scatter/gather, prontidão, non-blocking ou mudança de API.",
        ],
        {
          interactive: interactionIds.pipeline,
          blocks: [
            {
              type: "example",
              title: "Exemplo",
              body: "Ler um socket em blocos muito pequenos pode multiplicar chamadas e reacordares mesmo quando o volume total de dados não é grande.",
            },
          ],
        },
      ),
      s(
        "batching-e-tamanho",
        "Granularidade",
        "Muitas chamadas pequenas transformam o overhead em protagonista",
        "Nem todo I/O deve virar lote enorme, mas I/O extremamente fragmentado quase sempre cobra caro.",
        [
          "Chamadas minúsculas podem parecer inofensivas no código local, especialmente quando cada pedaço tem significado lógico. O problema é que a fronteira com o kernel não enxerga seu significado semântico; ela enxerga travessias repetidas.",
          "Buffers razoáveis, agregação de writes, leitura por blocos e envio/recebimento vetorizado existem para preencher melhor cada ida ao kernel. Isso costuma elevar throughput e reduzir desperdício de overhead.",
          "Ainda assim, batching não é remédio universal. Lotes grandes demais aumentam latência de resposta unitária, memória em voo e dificuldade de interromper ou priorizar fluxos diferentes.",
        ],
        {
          blocks: [
            {
              type: "mistake",
              title: "Erro comum",
              body: "Focar apenas no custo do parse ou do format sem contar quantas syscalls a aplicação executa por evento, linha ou pacote.",
            },
            {
              type: "insight",
              title: "Throughput nasce de amortização",
              body: "Quanto mais trabalho útil cada travessia carrega, menos o custo fixo da borda pesa no total.",
            },
          ],
        },
      ),
      s(
        "scatter-gather-e-batching",
        "APIs",
        "readv, writev e recvmmsg mostram que às vezes o ganho está em descrever melhor o trabalho",
        "Nem toda otimização exige menos dados; algumas exigem menos chamadas ou uma descrição mais rica por chamada.",
        [
          "As chamadas `readv` e `writev` permitem scatter/gather I/O, isto é, ler ou escrever múltiplos buffers de uma vez. Isso ajuda a evitar concatenações e reduzir travessias quando o dado lógico já está repartido.",
          "No mundo de sockets, `recvmsg` amplia a semântica da operação e `recvmmsg` permite receber múltiplas mensagens numa única chamada, o que pode ser valioso em cargas com muitos datagramas pequenos.",
          "O ponto central é este: às vezes a forma como você apresenta os buffers ao kernel importa tanto quanto o algoritmo de processamento posterior.",
        ],
        {
          visual: visualIds.pipeline,
          blocks: [
            {
              type: "definition",
              title: "Scatter/gather",
              body: "Modelo em que múltiplos buffers são descritos para leitura ou escrita em uma única operação de I/O.",
            },
            {
              type: "example",
              title: "Exemplo",
              body: "Cabeçalho, corpo e rodapé já separados em buffers distintos podem ser enviados juntos sem cópia extra para montar um bloco intermediário.",
            },
          ],
        },
      ),
      s(
        "bloqueio-prontidao-e-parciais",
        "Semântica",
        "I/O rápido não significa I/O completo em uma única chamada",
        "Retorno parcial, bloqueio e prontidão fazem parte do contrato e influenciam bastante o desenho da aplicação.",
        [
          "Leituras e escritas podem retornar menos dados do que o pedido, especialmente em sockets, pipes e modos não bloqueantes. Isso não é anomalia; é semântica normal do contrato.",
          "Em muitas arquiteturas de servidor, o gargalo não está na cópia bruta, mas na coreografia entre readiness, wake-up e quantidade de chamadas necessárias até escoar o trabalho.",
          "Entender esse protocolo evita bugs e também melhora performance: uma aplicação que lida bem com partials e prontidão escolhe melhor quando chamar de novo e com que tamanho.",
        ],
        {
          blocks: [
            {
              type: "definition",
              title: "EAGAIN/EWOULDBLOCK",
              body: "Sinal de que o recurso configurado como não bloqueante ainda não está pronto para a operação pedida.",
            },
            {
              type: "mistake",
              title: "Erro comum",
              body: "Assumir que `read`, `write`, `recv` ou `send` completam o pedido integral em toda chamada.",
            },
          ],
        },
      ),
      s(
        "mmap-io-uring-e-trocas",
        "Trade-offs",
        "Mudar de API muda o modelo de custo, não só a velocidade aparente",
        "mmap e io_uring são poderosos, mas cada um desloca complexidades e observabilidade para outro lugar.",
        [
          "Com `mmap`, o acesso deixa de ser uma sequência explícita de read/write e passa a depender mais fortemente de paginação e page faults. Isso pode reduzir cópias e simplificar certas leituras, mas também muda o jeito de diagnosticar latência.",
          "`io_uring` usa filas compartilhadas e um modelo de submissão/completion diferente, o que pode reduzir número de syscalls em alguns cenários e alterar como o trabalho é amortizado. Ainda assim, ele não elimina a necessidade de o kernel realizar trabalho real.",
          "A interação a seguir ajuda a sentir o eixo central: menos travessias diretas podem aumentar complexidade de buffering, de completions ou de entendimento do perfil final.",
        ],
        {
          interactive: interactionIds.tradeoff,
          blocks: [
            {
              type: "insight",
              title: "Não existe API universalmente mais rápida",
              body: "Cada modelo paga custos diferentes em cópia, bloqueio, page fault, fila de submissão e dificuldade de depuração.",
            },
          ],
        },
      ),
      s(
        "observando-io",
        "Ferramentas",
        "strace e perf mostram frequência, forma e contexto das syscalls",
        "Antes de reescrever o caminho de I/O, vale enxergar quantas chamadas existem, com que tamanhos e em que ritmo.",
        [
          "`strace` é excelente para ver o formato das chamadas e capturar sequências suspeitas: loops de reads pequenos, writes parciais, repetição intensa de syscalls semelhantes ou erros que forçam retrabalho.",
          "A suíte perf ajuda a ligar syscalls ao restante do sistema: profiling, tracing, latência, agendamento e efeitos colaterais em CPU e espera. Juntas, essas ferramentas montam a história da travessia e do custo que ela adiciona.",
          "A pergunta orientadora continua a mesma: essa aplicação está limitada pelo recurso externo, pelo padrão de chamada ou pela forma como organiza buffers e wake-ups?",
        ],
        {
          visual: visualIds.impact,
          blocks: [
            {
              type: "example",
              title: "O que procurar",
              body: "Contagem alta de syscalls pequenas, partial writes frequentes, lotes mal dimensionados, EAGAIN em excesso ou bloqueios inesperados no caminho quente.",
            },
          ],
        },
      ),
      s(
        "cenarios-reais",
        "Aplicação",
        "A recomendação muda conforme o padrão de workload e o contrato do sistema",
        "O melhor arranjo para logging, streaming, UDP e leitura mapeada não costuma ser o mesmo.",
        [
          "I/O sensível à latência unitária pode preferir lotes menores e flushes mais frequentes. Já workloads orientados a throughput geralmente se beneficiam de amortização maior por chamada.",
          "Em alguns casos, a melhor melhoria é só um buffer decente. Em outros, vale adotar scatter/gather, batching de mensagens, snapshots mapeados ou um modelo de submissão diferente.",
          "A interação abaixo compara cenários para reforçar que a escolha da API precisa nascer do perfil do fluxo, e não de ranking genérico de performance.",
        ],
        {
          interactive: interactionIds.scenario,
          blocks: [
            {
              type: "insight",
              title: "A pergunta certa",
              body: "Quantas travessias faço, quanta utilidade cada travessia carrega e qual semântica de resposta o fluxo realmente precisa?",
            },
          ],
        },
      ),
      s(
        "quiz-revisao",
        "Revisão",
        "Quiz de revisão",
        "Verifique se o custo conceitual da travessia kernel↔user ficou claro.",
        ["As perguntas reforçam granularidade, batching, semântica de retorno e escolha de API."],
        { interactive: "quiz" },
      ),
      s(
        "glossario",
        "Vocabulário",
        "Glossário essencial",
        "Termos úteis para discutir performance de I/O sem simplificações perigosas.",
        ["Use o glossário para consolidar o mapa mental de syscalls, buffers e prontidão."],
        { interactive: "glossary" },
      ),
    ],
    summaryCards: [
      card("Travessia tem preço", "I/O lento nem sempre é só dispositivo; a fronteira com o kernel entra na conta."),
      card("Granularidade decide muito", "Muitas syscalls pequenas podem desperdiçar tempo no próprio ato de pedir o trabalho."),
      card("API muda o perfil do custo", "readv, recvmmsg, mmap e io_uring reequilibram overhead e complexidade de formas diferentes."),
    ],
    quiz: [
      q(
        "io-q1",
        "Qual pergunta costuma iniciar bem uma investigação de overhead de I/O?",
        "Quantas travessias ao kernel acontecem por unidade de trabalho útil?",
        "Qual cor do terminal o serviço usa?",
        "Qual é a frequência da CPU do laptop do desenvolvedor?",
        "a",
        "Contar a relação entre trabalho útil e número de syscalls costuma revelar desperdício rapidamente.",
      ),
      q(
        "io-q2",
        "Por que muitas syscalls pequenas podem ser ruins para throughput?",
        "Porque toda chamada precisa atravessar a fronteira com o kernel e carregar custos fixos de validação e coordenação.",
        "Porque o kernel se recusa a processar chamadas pequenas.",
        "Porque o compilador proíbe buffers curtos.",
        "a",
        "Fragmentar demais o trabalho aumenta a parte fixa do custo em relação ao trabalho útil.",
      ),
      q(
        "io-q3",
        "O que `readv` e `writev` ajudam a fazer?",
        "Ignorar completamente o kernel.",
        "Descrever múltiplos buffers em uma única operação de I/O.",
        "Trocar disco por memória RAM.",
        "b",
        "Scatter/gather permite aproveitar melhor a chamada quando o dado lógico já está separado em vários buffers.",
      ),
      q(
        "io-q4",
        "Qual afirmação sobre partial reads ou partial writes é mais adequada?",
        "Eles são sempre bug do sistema operacional.",
        "Fazem parte da semântica normal de várias operações de I/O e o código deve estar preparado para isso.",
        "Só acontecem em programas gráficos.",
        "b",
        "Leituras ou escritas parciais são parte do contrato em muitos contextos, especialmente com sockets e recursos não bloqueantes.",
      ),
      q(
        "io-q5",
        "Por que `recvmmsg` pode ser interessante em certos servidores UDP?",
        "Porque permite receber múltiplas mensagens em uma única chamada, amortizando overhead de syscall.",
        "Porque transforma UDP em TCP.",
        "Porque garante zero cópia em qualquer caso.",
        "a",
        "O ganho conceitual está em batching de mensagens, não em mudança do protocolo lógico.",
      ),
      q(
        "io-q6",
        "Qual cuidado é importante ao usar `mmap` como alternativa a `read` repetido?",
        "Nenhum; `mmap` é sempre o caminho mais rápido.",
        "Entender que ele muda o modelo de custo e pode deslocar parte da dor para paginação e page faults.",
        "Ele remove completamente a necessidade de observar o sistema.",
        "b",
        "mmap pode ser excelente, mas muda a forma de acesso e de diagnóstico do I/O.",
      ),
      q(
        "io-q7",
        "Para que `strace` é especialmente útil nessa aula?",
        "Para reescrever o kernel automaticamente.",
        "Para enxergar frequência, formato, tamanhos e erros das syscalls feitas pela aplicação.",
        "Para medir apenas uso de GPU.",
        "b",
        "Strace ajuda a ver o padrão concreto das chamadas antes de mudanças mais invasivas.",
      ),
      q(
        "io-q8",
        "Qual mensagem resume melhor a aula?",
        "A melhor otimização de I/O é sempre trocar para a API mais nova.",
        "Performance de I/O depende do padrão de chamadas, do tamanho dos lotes, das cópias e da semântica da API escolhida.",
        "Qualquer write pequeno é irrelevante.",
        "b",
        "A fronteira com o kernel, a granularidade e o modelo de buffers fazem parte do problema central.",
      ),
    ],
    glossary: [
      g("Syscall", "Chamada formal para pedir ao kernel um serviço privilegiado, como I/O ou gerenciamento de recursos."),
      g("Overhead de syscall", "Custo fixo associado à travessia user↔kernel e à coordenação da operação."),
      g("Granularidade", "Quantidade de trabalho útil agrupada em cada chamada ou submissão."),
      g("Batching", "Agrupamento de várias unidades lógicas de trabalho para amortizar overhead."),
      g("Scatter/gather I/O", "Modelo em que múltiplos buffers são lidos ou escritos em uma operação só."),
      g("Partial read/write", "Leitura ou escrita que retorna menos dados do que o pedido originalmente especificado."),
      g("Non-blocking I/O", "Modo em que a chamada retorna cedo quando o recurso ainda não está pronto."),
      g("Readiness", "Condição observável de que um recurso está pronto para leitura, escrita ou outra operação sem bloquear."),
      g("mmap", "Mapeamento de arquivo ou memória em uma região de endereços do processo."),
      g("recvmmsg", "Syscall Linux que permite receber múltiplas mensagens de uma vez."),
      g("io_uring", "Interface Linux de filas compartilhadas para submissão e coleta de operações de I/O."),
    ],
    relatedTopics: [
      card("Syscalls: Como Programas Conversam com o Kernel", "Fornece a base conceitual da fronteira user↔kernel explorada aqui de forma orientada a performance."),
      card("Zero-Copy e Buffers", "Aprofunda o papel de cópias, buffers e layout na eficiência de I/O."),
    ],
  },
};

const lessons: Record<WaveL5PartALessonId, WaveL5PartADefinition> = {
  "metodologia-de-otimizacao": metodologiaDeOtimizacao,
  "contencao-locks-e-filas": contencaoLocksEFilas,
  "lock-free-com-cuidado": lockFreeComCuidado,
  "syscalls-e-overhead-de-io": syscallsEOverheadDeIo,
};

export function getWaveL5PartAContent(id: WaveL5PartALessonId): LessonContent {
  return lessons[id].content;
}

export function getWaveL5PartAVisuals(id: WaveL5PartALessonId): LessonModule["visuals"] {
  return createComputacaoVisuals(lessons[id].visualConfig);
}

export function getWaveL5PartAInteractions(
  id: WaveL5PartALessonId,
): LessonModule["interactions"] {
  return createComputacaoInteractions(lessons[id].interactionConfig);
}
