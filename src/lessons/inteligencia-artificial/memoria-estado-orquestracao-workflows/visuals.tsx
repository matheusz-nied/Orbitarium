import type { LessonModule } from "../../../types/content";
import { createStandardLessonVisuals } from "../_shared/visualFactories";

export const visuals = createStandardLessonVisuals({
  tone: "indigo",
  heroTitle: "Sistemas com LLMs precisam lembrar, coordenar e sobreviver a falhas",
  heroSubtitle:
    "Memória informa o modelo, estado situa a execução e workflows explicitam como cada passo evolui",
  heroSteps: ["Representar", "Orquestrar", "Retomar"],
  heroFooter:
    "Quanto mais longo, crítico ou externo for o fluxo, mais valor existe em explicitar dependências, checkpoints e contratos de retry.",
  conceptTitle: "Estado e memória cumprem papéis diferentes",
  conceptLeft: {
    title: "Estado",
    body: "Descreve onde a execução está, o que já fez e o que falta fazer.",
  },
  conceptRight: {
    title: "Memória",
    body: "Traz fatos, histórico e contexto persistente além do run atual.",
  },
  conceptFooter:
    "Confundir estado com memória costuma gerar sistemas opacos, frágeis e difíceis de recuperar.",
  pipelineTitle: "Workflow de IA em camadas",
  pipelineSteps: ["Entrada", "Estado", "Nós", "Checkpoint", "Retomada"],
  comparisonTitle: "Loop livre vs. workflow explícito",
  comparisonLeft: {
    title: "Loop improvisado",
    body: "Pode resolver casos simples, mas sofre quando há dependências longas, auditoria e efeitos externos críticos.",
  },
  comparisonRight: {
    title: "Workflow orquestrado",
    body: "Explicita etapas, políticas de retry e pontos de recuperação, ganhando previsibilidade operacional.",
  },
  tradeoffTitle: "Durabilidade custa, mas compra resiliência",
  tradeoffXAxis: "Sobrecarga de plataforma",
  tradeoffYAxis: "Capacidade de recuperação",
  tradeoffPoints: [
    { label: "In-process", x: 0.14, y: 0.18 },
    { label: "State graph", x: 0.42, y: 0.56 },
    { label: "Durável", x: 0.74, y: 0.92 },
    { label: "Sem checkpoint", x: 0.1, y: 0.06 },
  ],
  checklistTitle: "Checklist de workflow confiável",
  checklistItems: [
    "O estado corrente é suficiente para reconstruir o progresso do run?",
    "A memória persistente entra sob demanda ou está entupindo cada etapa?",
    "Há checkpoints nos pontos onde falhar seria caro de recomputar?",
    "As operações externas são idempotentes ou protegidas contra duplicação?",
    "Os ramos paralelos têm política clara de merge, cancelamento e precedência?",
    "O fluxo poderia ser explicado em uma auditoria sem depender de memória humana do time?",
  ],
}) satisfies LessonModule["visuals"];
