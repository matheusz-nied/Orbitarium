import type { LessonModule } from "../../../types/content";
import { createStandardLessonVisuals } from "../_shared/visualFactories";

export const visuals = createStandardLessonVisuals({
  tone: "violet",
  heroTitle: "Regularizar é disciplinar a capacidade da rede",
  heroSubtitle: "Menos memorização frágil, mais padrões que sobrevivem fora do treino",
  heroSteps: ["Restringir", "Validar", "Parar"],
  heroFooter: "O melhor modelo não é o que vence o treino; é o que continua bom quando o treino acaba.",
  conceptTitle: "Dois erros diferentes pedem respostas diferentes",
  conceptLeft: {
    title: "Underfitting",
    body: "O modelo não aprende nem o padrão principal.",
  },
  conceptRight: {
    title: "Overfitting",
    body: "O modelo aprende demais os detalhes do treino e pouco da estrutura geral.",
  },
  conceptFooter: "Regularização combate overfitting; em excesso, ela própria pode causar underfitting.",
  pipelineTitle: "Três formas de regularizar",
  pipelineSteps: ["Ruído", "Penalização", "Validação", "Checkpoint", "Generalização"],
  comparisonTitle: "Sem controle vs. controle calibrado",
  comparisonLeft: {
    title: "Memorização livre",
    body: "Capacidade máxima pode capturar padrões reais e também acidentes do conjunto de treino.",
  },
  comparisonRight: {
    title: "Capacidade guiada",
    body: "Restrições empurram a rede a usar sua flexibilidade onde isso mais generaliza.",
  },
  tradeoffTitle: "Regularização sempre é compromisso",
  tradeoffXAxis: "Liberdade do modelo",
  tradeoffYAxis: "Robustez fora do treino",
  tradeoffPoints: [
    { label: "Sem reg.", x: 0.92, y: 0.28 },
    { label: "Equilíbrio", x: 0.58, y: 0.82 },
    { label: "Excesso", x: 0.18, y: 0.34 },
    { label: "Early stop", x: 0.46, y: 0.76 },
  ],
  checklistTitle: "Checklist de generalização",
  checklistItems: [
    "O gap treino-validação abriu demais?",
    "A validação piora mesmo com treino ainda melhorando?",
    "Dropout está alto demais para a arquitetura?",
    "Weight decay está coerente com o otimizador usado?",
    "Early stopping observa a métrica certa?",
    "Há vazamento ou ruído nos dados de validação?",
  ],
}) satisfies LessonModule["visuals"];
