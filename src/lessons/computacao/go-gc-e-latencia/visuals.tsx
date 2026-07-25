import type { LessonModule } from "../../../types/content";
import { buildComputacaoVisuals } from "../shared/lessonFactory";

export const visuals = buildComputacaoVisuals({
  hero: {
    id: "go-gc-hero",
    title: "Go: GC e Latência",
    subtitle: "O coletor não é um vilão isolado; ele é parte do orçamento de memória, CPU e tail latency",
    chips: ["GC", "latência", "GOGC", "memory limit", "gctrace"],
  },
  map: {
    id: "go-gc-map",
    title: "Latência de GC nasce da combinação entre alocação, orçamento e observabilidade",
    items: [
      { label: "Heap", detail: "pressão viva" },
      { label: "Mark", detail: "rastrear vivos" },
      { label: "Assist", detail: "mutator ajuda" },
      { label: "Sweep", detail: "reciclar" },
      { label: "Metrics", detail: "medir" },
    ],
    caption: "entender o ciclo evita confundir pausa curta com custo total do gerenciamento de memória",
  },
  summary: {
    id: "go-gc-summary",
    title: "Três perguntas antes de culpar o GC",
    panels: [
      {
        label: "Estou alocando demais para o meu orçamento?",
        body: "Taxa de alocação costuma explicar mais do que opinião geral sobre collectors.",
      },
      {
        label: "O limite de memória está realista?",
        body: "Limite apertado demais pode trocar OOM por thrashing e caudas ruins.",
      },
      {
        label: "Tenho sinais de runtime suficientes?",
        body: "gctrace, runtime/metrics, trace e profiles evitam tuning no escuro.",
      },
    ],
    footer: "boa latência em Go nasce de desenho de alocação, limites sensatos e observabilidade disciplinada",
  },
}) satisfies LessonModule["visuals"];
