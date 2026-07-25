import { createComputacaoVisuals } from "../_shared/factories";

export const visuals = createComputacaoVisuals({
  title: "Ownership e Borrowing",
  subtitle: "Posse explicita, empréstimos temporários e descarte previsível",
  level: "Intermediário",
  tags: ["ownership", "move", "borrow", "slice", "clone", "drop"],
  conceptNodes: ["owner único", "move", "borrow", "drop"],
  pipelineSteps: [
    "criar valor",
    "transferir posse",
    "emprestar acesso",
    "encerrar escopo",
  ],
  leftLabel: "clonar cedo",
  rightLabel: "emprestar mais",
  impactRows: [
    { label: "segurança", value: "double free e uso após liberação viram erros de compilação" },
    { label: "api", value: "assinaturas deixam claro quem lê, quem muta e quem armazena" },
    { label: "performance", value: "menos cópias acidentais e melhor controle de buffers" },
    { label: "manutenção", value: "responsabilidade por dados fica auditável no código" },
  ],
});
