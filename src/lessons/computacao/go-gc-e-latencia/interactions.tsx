import type { LessonModule } from "../../../types/content";
import { buildComputacaoInteractions } from "../shared/lessonFactory";

export const interactions = buildComputacaoInteractions({
  flow: {
    id: "go-gc-cycle-lab",
    eyebrow: "GC",
    title: "Siga um ciclo de GC em alto nível",
    description:
      "Acompanhe como o runtime alterna entre alocação normal, marcação concorrente, assist e sweep para equilibrar memória e CPU.",
    tone: "indigo",
    icon: "Workflow",
    stages: [
      {
        label: "Alocar",
        detail:
          "O programa segue produzindo objetos enquanto o runtime observa heap, taxa de alocação e orçamento de memória disponível.",
        cue: "custo entrando",
      },
      {
        label: "Iniciar ciclo",
        detail:
          "Quando chega a hora, o GC começa a localizar raízes e preparar a fase de marcação sem parar o mundo por longos períodos.",
        cue: "janela de coleta",
      },
      {
        label: "Marcar concorrentemente",
        detail:
          "O coletor rastreia o que continua vivo enquanto o programa segue mutando referências, apoiado por write barriers.",
        cue: "mutator + collector",
      },
      {
        label: "Assistir e concluir",
        detail:
          "Em certos momentos, alocadores ajudam a pagar o trabalho de marcação. Isso reduz dívida de GC, mas pode aparecer como latência.",
        cue: "assist cost",
      },
      {
        label: "Sweep e reciclar",
        detail:
          "Depois de saber o que sobreviveu, o runtime libera o restante e prepara o próximo ciclo de acordo com seus objetivos.",
        cue: "memória reutilizada",
      },
    ],
  },
  compare: {
    id: "go-gc-pressure-scenarios",
    eyebrow: "Pressão",
    title: "Compare três fontes comuns de dor de latência",
    description:
      "Nem toda latência atribuída ao GC é pausa pura. A maior parte do custo aparece como trabalho distribuído ao longo da execução.",
    tone: "violet",
    icon: "ArrowRightLeft",
    options: [
      {
        label: "Alocação excessiva",
        headline: "Criar lixo demais aumenta a frequência e o esforço do ciclo",
        bullets: [
          "Objetos de vida curtíssima ainda precisam ser alocados e rastreados se caem na heap.",
          "O problema real costuma ser taxa de alocação, não existência abstrata do GC.",
          "Escape analysis, reuse e batching podem aliviar a pressão.",
        ],
      },
      {
        label: "Limite apertado",
        headline: "Pouca folga de memória força o runtime a trabalhar mais cedo e com mais agressividade",
        bullets: [
          "GOGC baixo ou memory limit apertado deslocam a troca para menos memória e mais CPU.",
          "Em casos extremos, a aplicação entra em thrashing de GC.",
          "A latência piora porque sobra menos tempo para trabalho útil.",
        ],
      },
      {
        label: "Observabilidade fraca",
        headline: "Sem gctrace, metrics e perfis, o GC vira bode expiatório universal",
        bullets: [
          "Tail latency pode vir de scheduler, syscalls, lock contention ou throttling.",
          "O runtime oferece sinais específicos para separar hipótese de evidência.",
          "Tuning sem medição costuma mover custo de um lugar para outro.",
        ],
      },
    ],
  },
  slider: {
    id: "go-gc-tradeoff-dial",
    eyebrow: "Trade-off",
    title: "Ajuste a balança entre memória e CPU de GC",
    description:
      "Compare como mais folga de heap ou mais agressividade de coleta mudam o perfil conceitual da aplicação.",
    tone: "emerald",
    icon: "BarChart3",
    axisLabel: "Política de memória",
    states: [
      {
        label: "Memória apertada",
        summary:
          "O runtime precisa coletar cedo e com frequência para manter a aplicação dentro de um orçamento pequeno de heap.",
        leftLabel: "Uso de memória",
        leftValue: 28,
        rightLabel: "CPU em GC",
        rightValue: 82,
        takeaway:
          "Esse modo poupa memória, mas pode ampliar custo distribuído de GC e prejudicar progresso útil.",
        metrics: [
          { label: "Frequência de ciclos", value: "Alta" },
          { label: "Tail latency", value: "Sensível" },
          { label: "Folga operacional", value: "Baixa" },
          { label: "Risco", value: "Thrashing" },
        ],
      },
      {
        label: "Equilíbrio saudável",
        summary:
          "Há memória suficiente para absorver variação sem forçar coleta agressiva, mantendo CPU e latência em equilíbrio mais previsível.",
        leftLabel: "Uso de memória",
        leftValue: 58,
        rightLabel: "CPU em GC",
        rightValue: 54,
        takeaway:
          "É o ponto de operação desejado para muitos serviços: custo controlado sem pânico nem desperdício cego.",
        metrics: [
          { label: "Frequência de ciclos", value: "Moderada" },
          { label: "Tail latency", value: "Melhor" },
          { label: "Folga operacional", value: "Boa" },
          { label: "Risco", value: "Controlado" },
        ],
      },
      {
        label: "Heap folgada",
        summary:
          "O programa ganha mais espaço antes de coletar, reduzindo trabalho frequente de GC ao preço de memória maior e possível retenção excessiva.",
        leftLabel: "Uso de memória",
        leftValue: 84,
        rightLabel: "CPU em GC",
        rightValue: 34,
        takeaway:
          "Mais heap pode aliviar CPU e cauda, mas não substitui disciplina de alocação nem limites bem escolhidos.",
        metrics: [
          { label: "Frequência de ciclos", value: "Menor" },
          { label: "Tail latency", value: "Pode melhorar" },
          { label: "Folga operacional", value: "Alta" },
          { label: "Risco", value: "Memória ociosa" },
        ],
      },
    ],
  },
}) satisfies LessonModule["interactions"];
