import type { LessonModule } from "../../../types/content";
import {
  createStandardLessonVisuals,
} from "../_shared/visualFactories";

export const visuals = createStandardLessonVisuals({
  tone: "indigo",
  heroTitle: "Estabilidade nasce do controle de escala",
  heroSubtitle: "Inicialização, normalização e caminhos residuais trabalham juntos",
  heroSteps: ["Inicializar", "Normalizar", "Propagar"],
  heroFooter: "Quanto mais profunda a rede, mais caro fica errar a escala no começo.",
  conceptTitle: "O problema central é preservar um sinal útil",
  conceptLeft: {
    title: "Sinal apagado",
    body: "Ativações e gradientes encolhem até quase zero.",
  },
  conceptRight: {
    title: "Sinal explosivo",
    body: "Ativações e gradientes crescem demais e desestabilizam o treino.",
  },
  conceptFooter: "Boas práticas de treino tentam manter a rede entre esses extremos.",
  pipelineTitle: "BatchNorm em um bloco de treino",
  pipelineSteps: [
    "Ativação",
    "Média/var",
    "Normaliza",
    "Gamma/Beta",
    "Próxima camada",
  ],
  comparisonTitle: "Treino sensível vs. treino estabilizado",
  comparisonLeft: {
    title: "Sem controle",
    body: "Cada camada recebe uma escala diferente e o otimizador pisa em terreno instável.",
  },
  comparisonRight: {
    title: "Com controle",
    body: "A distribuição interna fica mais previsível e learning rates úteis se ampliam.",
  },
  tradeoffTitle: "BatchNorm melhora muito, mas não é gratuito",
  tradeoffXAxis: "Dependência de batch",
  tradeoffYAxis: "Estabilidade do treino",
  tradeoffPoints: [
    { label: "Batch pequeno", x: 0.2, y: 0.35 },
    { label: "Batch médio", x: 0.5, y: 0.72 },
    { label: "Residual + BN", x: 0.68, y: 0.9 },
    { label: "Sem BN", x: 0.1, y: 0.22 },
  ],
  checklistTitle: "Checklist de diagnóstico",
  checklistItems: [
    "Loss vira NaN cedo?",
    "Gradiente explode em algumas camadas?",
    "Ativações ficam quase todas em zero?",
    "Learning rate pequeno já diverge?",
    "Batch é tão pequeno que BN fica ruidoso?",
    "Arquitetura residual poderia ajudar?",
  ],
}) satisfies LessonModule["visuals"];
