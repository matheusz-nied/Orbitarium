import type { LessonModule } from "../../../types/content";
import { buildComputacaoVisuals } from "../shared/lessonFactory";

export const visuals = buildComputacaoVisuals({
  hero: {
    id: "go-scheduler-hero",
    title: "Go: Goroutines e Scheduler",
    subtitle: "Concorrência barata porque o runtime multiplexa trabalho sobre threads e Ps",
    chips: ["goroutines", "scheduler", "GOMAXPROCS", "preempção", "trace"],
  },
  map: {
    id: "go-scheduler-map",
    title: "O scheduler tenta casar trabalho, threads e paralelismo disponível",
    items: [
      { label: "G", detail: "código Go" },
      { label: "Fila", detail: "runnable" },
      { label: "P", detail: "direito de rodar" },
      { label: "M", detail: "thread SO" },
      { label: "Trace", detail: "evidência" },
    ],
    caption: "entender o scheduler ajuda a diferenciar espera útil de disputa inútil",
  },
  summary: {
    id: "go-scheduler-summary",
    title: "Três perguntas para diagnosticar concorrência em Go",
    panels: [
      {
        label: "O trabalho é CPU-bound ou espera?",
        body: "A resposta muda completamente a leitura de 'muitas goroutines'.",
      },
      {
        label: "GOMAXPROCS combina com o ambiente?",
        body: "Máquina, container e throttling contam tanto quanto a sua intuição local.",
      },
      {
        label: "Você viu trace ou só supôs?",
        body: "Scheduler e GC deixam pistas mensuráveis; adivinhação costuma custar caro.",
      },
    ],
    footer: "goroutines simplificam concorrência, mas o runtime continua pagando contas concretas",
  },
}) satisfies LessonModule["visuals"];
