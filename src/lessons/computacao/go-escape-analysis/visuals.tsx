import type { LessonModule } from "../../../types/content";
import { buildComputacaoVisuals } from "../shared/lessonFactory";

export const visuals = buildComputacaoVisuals({
  hero: {
    id: "go-escape-hero",
    title: "Go: Escape Analysis e Alocação",
    subtitle: "O compilador tenta decidir se um valor pode morrer na stack ou precisa viver na heap",
    chips: ["stack", "heap", "escape", "gcflags", "profiles"],
  },
  map: {
    id: "go-escape-map",
    title: "Escape analysis liga design de API ao custo do runtime",
    items: [
      { label: "Lifetime", detail: "até quando vive?" },
      { label: "Address", detail: "quem guarda?" },
      { label: "Closure", detail: "capturou?" },
      { label: "Heap", detail: "entra no GC" },
      { label: "Flag -m", detail: "explica pistas" },
    ],
    caption: "o objetivo não é vencer o compilador, e sim dar a ele contratos mais claros quando isso importa",
  },
  summary: {
    id: "go-escape-summary",
    title: "Três perguntas antes de caçar escapes",
    panels: [
      {
        label: "O valor realmente precisa sobreviver?",
        body: "Se precisa, heap não é falha; é o custo correto do lifetime pedido.",
      },
      {
        label: "Você viu o profile primeiro?",
        body: "Heap profile e benchmark dizem se o escape é relevante ou só uma curiosidade.",
      },
      {
        label: "A refatoração melhora clareza ou só ruído?",
        body: "Mudanças boas reduzem alocação sem deixar a API mais obscura.",
      },
    ],
    footer: "escape analysis é uma conversa entre semântica do código, compilador e custo operacional",
  },
}) satisfies LessonModule["visuals"];
