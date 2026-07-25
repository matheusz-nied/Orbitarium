import { createComputacaoVisuals } from "../_shared/factories";

export const visuals = createComputacaoVisuals({
  title: "Erros com Result e ?",
  subtitle: "Falha explícita, propagação clara e fronteiras mais robustas",
  level: "Intermediário",
  tags: ["result", "panic", "?", "contexto", "api", "erro"],
  conceptNodes: ["falha", "contrato", "propagação", "decisão"],
  pipelineSteps: [
    "produzir erro",
    "propagar causa",
    "adicionar contexto",
    "decidir na borda",
  ],
  leftLabel: "falhar cedo",
  rightLabel: "recuperar e traduzir",
  impactRows: [
    { label: "robustez", value: "Result expõe falhas previsíveis como parte do tipo da função" },
    { label: "operação", value: "contexto de erro melhora log, telemetria e suporte" },
    { label: "arquitetura", value: "bibliotecas devolvem estrutura; aplicações aplicam política" },
    { label: "disciplina", value: "panic e unwrap ficam reservados a invariantes e casos defendáveis" },
  ],
});
