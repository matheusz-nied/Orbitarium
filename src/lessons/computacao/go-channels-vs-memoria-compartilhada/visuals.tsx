import type { LessonModule } from "../../../types/content";
import { buildComputacaoVisuals } from "../shared/lessonFactory";

export const visuals = buildComputacaoVisuals({
  hero: {
    id: "go-coordination-hero",
    title: "Go: Channels vs Memória Compartilhada",
    subtitle: "Escolher a primitiva pela semântica do problema, não pelo slogan",
    chips: ["channels", "mutex", "atomic", "ownership", "happens-before"],
  },
  map: {
    id: "go-coordination-map",
    title: "Sincronização em Go é um cardápio, não um dogma único",
    items: [
      { label: "Channel", detail: "handoff" },
      { label: "Mutex", detail: "proteção" },
      { label: "Atomic", detail: "sinal fino" },
      { label: "Memory model", detail: "ordem" },
      { label: "Race detector", detail: "prova prática" },
    ],
    caption: "a pergunta correta é 'qual mecanismo expressa melhor esta relação?'",
  },
  summary: {
    id: "go-coordination-summary",
    title: "Três perguntas antes de escolher a primitiva",
    panels: [
      {
        label: "Estou passando trabalho ou protegendo estado?",
        body: "Channels brilham mais no primeiro caso; mutexes, no segundo.",
      },
      {
        label: "Preciso de ordem observável entre goroutines?",
        body: "Sem happens-before, até código aparentemente simples pode quebrar.",
      },
      {
        label: "A escolha ficou mais simples ou mais esperta?",
        body: "Em Go, o mecanismo melhor costuma ser o mais expressivo e legível.",
      },
    ],
    footer: "a concorrência idiomática de Go é pragmática: canais, locks e atomics são complementares",
  },
}) satisfies LessonModule["visuals"];
