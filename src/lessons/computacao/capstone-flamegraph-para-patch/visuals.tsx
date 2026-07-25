import type { LessonModule } from "../../../types/content";
import { buildComputacaoVisuals } from "../shared/lessonFactory";

export const visuals = buildComputacaoVisuals({
  hero: {
    id: "flamegraph-patch-hero",
    title: "Capstone: Do Flamegraph ao Patch",
    subtitle: "Ler o profile, formar hipotese, intervir com criterio e medir de novo.",
    chips: ["sintoma", "profiling", "hipotese", "patch", "verificacao"],
  },
  map: {
    id: "flamegraph-patch-map",
    title: "Da barra larga a uma mudanca verificavel",
    items: [
      { label: "Sintoma", detail: "dor operacional real" },
      { label: "Coleta", detail: "recorte e profile" },
      { label: "Leitura", detail: "paths quentes" },
      { label: "Hipotese", detail: "mecanismo do custo" },
      { label: "Patch", detail: "mudanca + revalidacao" },
    ],
    caption: "o flamegraph fica no meio da cadeia: ele afunila, mas nao decide sozinho",
  },
  summary: {
    id: "flamegraph-patch-summary",
    title: "Tres perguntas antes de mexer no codigo",
    panels: [
      {
        label: "Este path explica o sintoma ou so parece importante?",
        body: "Nem todo custo visivel e causa primaria do problema percebido pelo usuario ou pela operacao.",
      },
      {
        label: "Minha hipotese fala de mecanismo, nao so de implementacao?",
        body: "Descrever por que o custo aparece ajuda a escolher entre patch local, redesenho ou nova coleta.",
      },
      {
        label: "Vou conseguir medir antes e depois com atribuibilidade?",
        body: "Intervencao boa nasce pequena o bastante para ser comparada e grande o bastante para ensinar algo.",
      },
    ],
    footer: "performance madura troca pressa por uma cadeia curta de evidencia, decisao e reavaliacao",
  },
}) satisfies LessonModule["visuals"];
