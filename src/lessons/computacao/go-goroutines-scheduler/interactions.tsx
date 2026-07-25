import type { LessonModule } from "../../../types/content";
import { buildComputacaoInteractions } from "../shared/lessonFactory";

export const interactions = buildComputacaoInteractions({
  flow: {
    id: "go-scheduler-cycle-lab",
    eyebrow: "Escalonamento",
    title: "Siga o ciclo de vida de uma goroutine",
    description:
      "Veja como criação, fila, execução, bloqueio e retomada fazem parte do custo real de concorrência em Go.",
    tone: "indigo",
    icon: "Workflow",
    stages: [
      {
        label: "Criação",
        detail:
          "Criar uma goroutine é barato porque não implica criar uma thread dedicada. Ainda assim, há stack inicial, bookkeeping e trabalho de scheduler.",
        cue: "leve, não grátis",
      },
      {
        label: "Runnable",
        detail:
          "Quando pode executar, a goroutine entra em uma fila local ou global aguardando um P disponível e uma thread pronta para rodar código Go.",
        cue: "pronta, mas ainda não rodando",
      },
      {
        label: "Running",
        detail:
          "A goroutine consome um intervalo de execução sobre uma thread associada a um P. Aqui GOMAXPROCS limita o paralelismo simultâneo.",
        cue: "ocupando CPU Go",
      },
      {
        label: "Blocked",
        detail:
          "Syscalls, I/O, canais, mutexes e timers podem tirar a goroutine da fila de execução e devolver oportunidade para outras.",
        cue: "espera coordenada",
      },
      {
        label: "Preempted",
        detail:
          "Quando uma goroutine não cede naturalmente, o runtime pode interrompê-la para preservar justiça, GC e capacidade de resposta.",
        cue: "fairness do runtime",
      },
    ],
  },
  compare: {
    id: "go-scheduler-scenario-lab",
    eyebrow: "Cenários",
    title: "Compare três situações clássicas de scheduler",
    description:
      "Mude o cenário e veja por que 'tenho muitas goroutines' não significa automaticamente 'estou usando CPU bem'.",
    tone: "violet",
    icon: "ArrowRightLeft",
    options: [
      {
        label: "CPU-bound",
        headline: "Muitas goroutines disputando CPU real podem apenas alternar espera",
        bullets: [
          "Se quase tudo é cálculo puro, GOMAXPROCS e contenção viram protagonistas.",
          "Mais goroutines do que paralelismo disponível aumentam fila, não throughput mágico.",
          "Preempção e balanceamento importam para manter responsividade.",
        ],
      },
      {
        label: "I/O e syscalls",
        headline: "Goroutines brilham quando grande parte do tempo é espera",
        bullets: [
          "Bloqueios frequentes permitem reutilizar threads com pouco esforço do programador.",
          "O runtime tenta evitar que uma espera longa congele progresso global.",
          "A lógica pode continuar parecendo síncrona sem perder concorrência.",
        ],
      },
      {
        label: "Oversubscription",
        headline: "Concorrência excessiva também tem custo em filas, memória e tail latency",
        bullets: [
          "Cada goroutine extra aumenta housekeeping e possíveis hotspots de coordenação.",
          "Burst de trabalho pode virar tempestade de runnable goroutines.",
          "Diagnóstico com trace e perfis costuma ser melhor do que adivinhar.",
        ],
      },
    ],
  },
  slider: {
    id: "go-gomaxprocs-dial",
    eyebrow: "Paralelismo",
    title: "Ajuste a relação entre workload e GOMAXPROCS",
    description:
      "Visualize o efeito conceitual de pouco, suficiente ou excessivo paralelismo disponível para o runtime.",
    tone: "emerald",
    icon: "Cpu",
    axisLabel: "Paralelismo disponível",
    states: [
      {
        label: "Abaixo da necessidade",
        summary:
          "Poucos Ps para a quantidade de trabalho CPU-bound criam filas longas e aumentam a percepção de engarrafamento.",
        leftLabel: "Fila de goroutines",
        leftValue: 84,
        rightLabel: "Trabalho simultâneo",
        rightValue: 32,
        takeaway:
          "Quando o gargalo é CPU, paralelismo insuficiente limita throughput e pode piorar caudas de latência.",
        metrics: [
          { label: "Run queues", value: "Pressão alta" },
          { label: "Tail latency", value: "Piora" },
          { label: "Uso de CPU", value: "Subótimo" },
          { label: "Leitura", value: "Parece travado" },
        ],
      },
      {
        label: "Próximo do ideal",
        summary:
          "O runtime consegue manter CPUs úteis sem criar oversubscription grande nem deixar work excessivo parado.",
        leftLabel: "Fila de goroutines",
        leftValue: 46,
        rightLabel: "Trabalho simultâneo",
        rightValue: 78,
        takeaway:
          "É o ponto em que o scheduler trabalha a favor do código: pouca surpresa e boa previsibilidade.",
        metrics: [
          { label: "Run queues", value: "Saudáveis" },
          { label: "Tail latency", value: "Melhor" },
          { label: "Uso de CPU", value: "Bom" },
          { label: "Leitura", value: "Estável" },
        ],
      },
      {
        label: "Acima do ambiente",
        summary:
          "Paralelismo configurado acima do que o ambiente realmente sustenta pode introduzir contenção, throttling e ruído.",
        leftLabel: "Fila de goroutines",
        leftValue: 40,
        rightLabel: "Trabalho simultâneo",
        rightValue: 66,
        takeaway:
          "Mais threads ativas não garantem melhor latência, especialmente em containers com limite de CPU apertado.",
        metrics: [
          { label: "Run queues", value: "Oscilam" },
          { label: "Tail latency", value: "Instável" },
          { label: "Uso de CPU", value: "Espinhoso" },
          { label: "Leitura", value: "Pode enganar" },
        ],
      },
    ],
  },
}) satisfies LessonModule["interactions"];
