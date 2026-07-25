import type { LessonModule } from "../../../types/content";
import { buildComputacaoInteractions } from "../shared/lessonFactory";

export const interactions = buildComputacaoInteractions({
  flow: {
    id: "go-http-p99-instrumentation-flow",
    eyebrow: "Instrumentacao",
    title: "Monte uma trilha de medicao util para requests HTTP em Go",
    description:
      "O fluxo mostra como sair de um numero monolitico e chegar a uma observacao acionavel sobre a cauda.",
    tone: "indigo",
    icon: "Workflow",
    stages: [
      {
        label: "Escolher o alvo",
        detail:
          "Defina qual rota, classe de requests ou operacao esta falhando do ponto de vista do usuario ou do SLO.",
        cue: "qual p99 importa aqui?",
      },
      {
        label: "Separar distribuicao",
        detail:
          "Colete percentis e histogramas por recorte util para diferenciar caso tipico de cauda lenta.",
        cue: "media esconde o quê?",
      },
      {
        label: "Abrir etapas",
        detail:
          "Use spans, logs estruturados, metricas de dependencia ou httptrace quando o request precisa ser decomposto.",
        cue: "onde o tempo se acumula?",
      },
      {
        label: "Escolher profile",
        detail:
          "CPU, heap, block ou mutex entram conforme a forma da latencia observada e o bound suspeito.",
        cue: "que mecanismo esta mais plausivel?",
      },
      {
        label: "Patchar e medir de novo",
        detail:
          "A mudanca so vale quando o mesmo alvo mostra melhora coerente sem criar sofrimento lateral relevante.",
        cue: "o resultado e atribuivel?",
      },
    ],
  },
  compare: {
    id: "go-http-p99-bound-lab",
    eyebrow: "Bound",
    title: "Compare quatro leituras tipicas para p99 ruim em Go",
    description:
      "Cada suspeita dominante pede ferramentas e patches diferentes. O erro mais caro e tratar tudo como handler lento.",
    tone: "violet",
    icon: "ArrowRightLeft",
    options: [
      {
        label: "CPU-bound",
        headline: "O request gasta tempo ativo em codigo quente, parse, serializacao, compressao ou criptografia",
        bullets: [
          "CPU profile e flame graph tendem a mostrar paths quentes consistentes.",
          "A melhora costuma vir de reduzir trabalho ou reorganizar o codigo do caminho dominante.",
          "Se a CPU nao estiver realmente ocupada, suspeite que essa leitura talvez esteja errada.",
        ],
      },
      {
        label: "I/O-bound",
        headline: "A cauda nasce de dependencia remota, rede, disco, pool ou espera antes do primeiro byte",
        bullets: [
          "Percentis por dependencia e decomposicao de etapas costumam render mais do que olhar so para o handler.",
          "Reuso de conexao, cancelamento, fan-out e retry entram no debate com mais peso.",
          "CPU profile pode parecer inocente mesmo quando a experiencia do usuario esta claramente ruim.",
        ],
      },
      {
        label: "Lock-bound",
        headline: "Goroutines disputam estado compartilhado, fila interna ou regiao critica grande demais",
        bullets: [
          "Mutex e block profiles ajudam a revelar espera entre goroutines e caminhos serializados.",
          "As melhores melhorias geralmente reduzem compartilhamento ou encurtam a regiao critica.",
          "Trocar pequenas partes do handler sem mexer na coordenacao costuma render pouco.",
        ],
      },
      {
        label: "GC-bound",
        headline: "Heap, churn de alocacao e trabalho do coletor participam da variabilidade observada",
        bullets: [
          "Heap, allocs e o guia oficial de GC ajudam a ligar distribuiçao de latencia a pressao de memoria.",
          "Nem toda alocacao e bug; o problema e a alocacao relevante no caminho quente e sob a carga real.",
          "Mexer em GOGC sem entender o perfil pode trocar uma dor por outra sem resolver o mecanismo dominante.",
        ],
      },
    ],
  },
  slider: {
    id: "go-http-p99-improvement-dial",
    eyebrow: "Intervencao",
    title: "Ajuste o estilo de melhoria para p99",
    description:
      "A melhor mudanca combina o tipo de bound com o grau de disciplina experimental que o caso pede.",
    tone: "emerald",
    icon: "BarChart3",
    axisLabel: "Postura de melhoria",
    states: [
      {
        label: "Tuning rapido",
        summary:
          "Muda varios knobs operacionais ou detalhes de codigo ao mesmo tempo para ver se algum grafico melhora.",
        leftLabel: "Velocidade inicial",
        leftValue: 86,
        rightLabel: "Confianca no aprendizado",
        rightValue: 22,
        takeaway:
          "Pode gerar alivio acidental, mas quase sempre destrói atribuibilidade e dificulta repetir a vitoria.",
        metrics: [
          { label: "Risco de regressao invisivel", value: "alto" },
          { label: "Atribuibilidade", value: "baixa" },
          { label: "Uso ideal", value: "quase nunca" },
          { label: "Perfil", value: "reativo" },
        ],
      },
      {
        label: "Patch focado",
        summary:
          "Ataca um mecanismo dominante plausivel com mudanca pequena o bastante para comparar antes e depois.",
        leftLabel: "Praticidade",
        leftValue: 68,
        rightLabel: "Confianca no aprendizado",
        rightValue: 74,
        takeaway:
          "E a forma mais saudavel de iterar sobre p99 quando a instrumentacao ja separou razoavelmente o problema.",
        metrics: [
          { label: "Risco de regressao invisivel", value: "moderado" },
          { label: "Atribuibilidade", value: "media-alta" },
          { label: "Uso ideal", value: "iteracao principal" },
          { label: "Perfil", value: "engenharia" },
        ],
      },
      {
        label: "Mudanca sistemica",
        summary:
          "Redesenha pool, ownership, fan-out, fluxo ou arquitetura depois de evidencias fortes sobre o bound e sobre os limites da solucao local.",
        leftLabel: "Custo de implantacao",
        leftValue: 38,
        rightLabel: "Potencial de alivio estrutural",
        rightValue: 91,
        takeaway:
          "Vale quando o p99 ruim revela problema de forma do sistema, nao apenas de um trecho pequeno de codigo.",
        metrics: [
          { label: "Risco de regressao invisivel", value: "alto se mal medido" },
          { label: "Atribuibilidade", value: "exige disciplina" },
          { label: "Uso ideal", value: "quando o local nao basta" },
          { label: "Perfil", value: "estrutural" },
        ],
      },
    ],
  },
}) satisfies LessonModule["interactions"];
