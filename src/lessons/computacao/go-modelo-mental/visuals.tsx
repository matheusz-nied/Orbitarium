import type { LessonModule } from "../../../types/content";
import { buildComputacaoVisuals } from "../shared/lessonFactory";

export const visuals = buildComputacaoVisuals({
  hero: {
    id: "go-mental-hero",
    title: "Go: Modelo Mental da Linguagem",
    subtitle: "Simplicidade deliberada, contratos legíveis e custo razoavelmente visível",
    chips: ["zero value", "valores", "interfaces", "erros", "composição"],
  },
  map: {
    id: "go-mental-map",
    title: "A linguagem empurra o leitor para contratos simples",
    items: [
      { label: "Tipo", detail: "estado definido" },
      { label: "Valor", detail: "cópia ou ponteiro" },
      { label: "Interface", detail: "capacidade mínima" },
      { label: "Erro", detail: "fluxo explícito" },
      { label: "Runtime", detail: "custo aparece" },
    ],
    caption: "o estilo idiomático de Go tenta reduzir surpresa conceitual e operacional",
  },
  summary: {
    id: "go-mental-summary",
    title: "Três perguntas para ler uma API Go",
    panels: [
      {
        label: "O zero value já funciona?",
        body: "Se sim, a API tende a pedir menos ritual e menos estado implícito.",
      },
      {
        label: "O contrato mostra custo e mutação?",
        body: "Valores, ponteiros e interfaces dizem muito sobre ownership e efeito.",
      },
      {
        label: "O erro é parte do fluxo?",
        body: "Em Go, falha rara e falha comum aparecem no mesmo plano do código.",
      },
    ],
    footer: "clareza idiomática não elimina trade-offs, mas torna esses trade-offs mais legíveis",
  },
}) satisfies LessonModule["visuals"];
