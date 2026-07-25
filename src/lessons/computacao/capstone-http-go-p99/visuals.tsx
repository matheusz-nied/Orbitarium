import type { LessonModule } from "../../../types/content";
import { buildComputacaoVisuals } from "../shared/lessonFactory";

export const visuals = buildComputacaoVisuals({
  hero: {
    id: "go-http-p99-hero",
    title: "Capstone: Servidor HTTP em Go e p99",
    subtitle: "Instrumentar, localizar o bound dominante e melhorar a cauda com criterio.",
    chips: ["Go", "HTTP", "p99", "pprof", "bound"],
  },
  map: {
    id: "go-http-p99-map",
    title: "Da distribuicao ao mecanismo dominante",
    items: [
      { label: "Metrica", detail: "rota e percentis" },
      { label: "Etapa", detail: "decompor request" },
      { label: "Bound", detail: "CPU, I/O, lock, GC" },
      { label: "Patch", detail: "mudanca focada" },
      { label: "Verificacao", detail: "mesmo alvo" },
    ],
    caption: "a cauda melhora quando distribuicao, etapa e tipo de custo entram na mesma conversa",
  },
  summary: {
    id: "go-http-p99-summary",
    title: "Tres guardrails contra tuning teatral",
    panels: [
      {
        label: "Qual percentil e qual rota realmente motivaram a investigacao?",
        body: "Sem esse recorte, qualquer melhora em grafico agregado pode parecer melhor do que realmente e.",
      },
      {
        label: "Qual bound esta mais plausivel neste cenario?",
        body: "CPU, I/O, lock e GC pedem familias diferentes de coleta e de intervencao.",
      },
      {
        label: "O patch continua atribuivel e reversivel?",
        body: "Mexer pouco por vez ajuda a ensinar o time e a evitar regressao escondida.",
      },
    ],
    footer: "o objetivo nao e apenas baixar um numero: e entender por que a distribuicao melhorou",
  },
}) satisfies LessonModule["visuals"];
