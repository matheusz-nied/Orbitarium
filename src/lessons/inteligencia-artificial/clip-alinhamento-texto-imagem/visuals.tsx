import type { LessonModule } from "../../../types/content";
import { createStandardLessonVisuals } from "../_shared/visualFactories";

export const visuals = {
  ...createStandardLessonVisuals({
    tone: "indigo",
    heroTitle: "Texto e imagem no mesmo espaço semântico",
    heroSubtitle: "dual encoders + contraste + zero-shot",
    heroSteps: ["Codificar", "Alinhar", "Comparar"],
    heroFooter:
      "CLIP transforma linguagem natural em interface flexível para reconhecer conceitos visuais.",
    conceptTitle: "O coração do CLIP",
    conceptLeft: {
      title: "Encoder visual",
      body: "transforma imagem em embedding compatível com linguagem",
    },
    conceptRight: {
      title: "Encoder textual",
      body: "transforma descrição em embedding comparável à imagem",
    },
    conceptFooter: "pares corretos se aproximam, pares errados se afastam",
    pipelineTitle: "Treino contrastivo do CLIP",
    pipelineSteps: ["Imagem", "Texto", "Embeddings", "Similaridade", "Softmax"],
    comparisonTitle: "Classificação fechada vs zero-shot com prompts",
    comparisonLeft: {
      title: "Catálogo fixo",
      body: "novas classes exigem novo ajuste supervisionado específico",
    },
    comparisonRight: {
      title: "Prompt aberto",
      body: "novas classes podem ser descritas em linguagem e comparadas diretamente",
    },
    tradeoffTitle: "Alinhamento global vs detalhe fino",
    tradeoffXAxis: "detalhe perceptual exigido",
    tradeoffYAxis: "força típica do CLIP",
    tradeoffPoints: [
      { label: "semântica global", x: 0.18, y: 0.9 },
      { label: "atributos médios", x: 0.44, y: 0.72 },
      { label: "contagem fina", x: 0.78, y: 0.34 },
      { label: "OCR detalhado", x: 0.88, y: 0.22 },
    ],
    checklistTitle: "Checklist mental ao usar CLIP",
    checklistItems: [
      "O prompt descreve bem a classe?",
      "A tarefa exige semântica global ou detalhe fino?",
      "A similaridade vetorial basta para o objetivo?",
      "Há risco de viés textual ou visual?",
      "É melhor zero-shot ou fine-tuning?",
      "Retrieval e classificação pedem a mesma métrica?",
    ],
  }),
} satisfies LessonModule["visuals"];
