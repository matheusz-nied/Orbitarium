import type { LessonModule } from "../../../types/content";
import { buildComputacaoVisuals } from "../shared/lessonFactory";

export const visuals = buildComputacaoVisuals({
  hero: {
    id: "ssa-compiler-hero",
    title: "SSA e Otimizacoes de Compilador",
    subtitle: "Definicoes unicas deixam fluxo e dependencias muito mais legiveis",
    chips: ["SSA", "phi", "LLVM IR", "mem2reg", "DCE", "alias"],
  },
  map: {
    id: "ssa-compiler-map",
    title: "A IR em SSA fica entre significado de alto nivel e provas locais de otimizacao",
    items: [
      { label: "AST", detail: "estrutura" },
      { label: "CFG", detail: "caminhos" },
      { label: "SSA", detail: "versoes unicas" },
      { label: "Passes", detail: "reescritas" },
      { label: "Alias", detail: "limites" },
    ],
    caption: "ssa ajuda a enxergar valores com clareza, mas memoria e efeitos ainda exigem provas extras",
  },
  summary: {
    id: "ssa-compiler-summary",
    title: "Tres ideias para sair usando SSA como modelo mental",
    panels: [
      {
        label: "Cada definicao ganha identidade",
        body: "Renomeacao transforma reatribuicoes ambigas em uma historia clara de versoes e usos.",
      },
      {
        label: "Phi nomeia juncoes de caminho",
        body: "A selecao do valor correto acontece no encontro do controle, nao como uma magia escondida no codigo.",
      },
      {
        label: "Otimizacao precisa de prova",
        body: "SSA ajuda bastante, mas aliasing, side effects e memoria observavel continuam impondo limites reais.",
      },
    ],
    footer: "ssa nao e o fim do compilador; e a lente que torna varias otimizacoes finalmente visiveis e justificaveis",
  },
}) satisfies LessonModule["visuals"];
