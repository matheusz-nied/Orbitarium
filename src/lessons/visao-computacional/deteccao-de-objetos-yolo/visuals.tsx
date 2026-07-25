import type { LessonModule } from "../../../types/content";
import { createStandardLessonVisuals } from "../../inteligencia-artificial/_shared/visualFactories";

export const visuals = {
  ...createStandardLessonVisuals({
    tone: "emerald",
    heroTitle: "Detecção unificada em uma única passagem",
    heroSubtitle: "imagem inteira → caixas + classes + scores",
    heroSteps: ["Ler a cena", "Prever hipóteses", "Filtrar duplicatas"],
    heroFooter:
      "YOLO trocou pipelines fragmentados por uma previsão direta e fim a fim.",
    conceptTitle: "Bounding box é linguagem geométrica compacta",
    conceptLeft: {
      title: "O que ela captura",
      body: "posição aproximada, largura e altura do objeto",
    },
    conceptRight: {
      title: "O que ela não captura",
      body: "contorno fino, transparência e forma exata",
    },
    conceptFooter: "caixas são simples, baratas e operacionais",
    pipelineTitle: "Pipeline conceitual de um detector YOLO",
    pipelineSteps: ["Backbone", "Features", "Caixas", "Scores", "NMS"],
    comparisonTitle: "IoU compara qualidade espacial",
    comparisonLeft: {
      title: "IoU alto",
      body: "caixa prevista coincide bem com a anotada e indica boa localização",
    },
    comparisonRight: {
      title: "IoU baixo",
      body: "caixa deslocada ou mal escalada compromete a utilidade da detecção",
    },
    tradeoffTitle: "Velocidade, sensibilidade e duplicatas",
    tradeoffXAxis: "limiar / agressividade",
    tradeoffYAxis: "quantidade de hipóteses úteis",
    tradeoffPoints: [
      { label: "score baixo", x: 0.18, y: 0.86 },
      { label: "equilíbrio", x: 0.48, y: 0.68 },
      { label: "NMS forte", x: 0.78, y: 0.42 },
      { label: "caos", x: 0.32, y: 0.92 },
    ],
    checklistTitle: "Checklist mental ao interpretar um detector",
    checklistItems: [
      "A classe está correta?",
      "A caixa cobre o objeto?",
      "O score faz sentido no domínio?",
      "Há duplicatas do mesmo objeto?",
      "Objetos pequenos estão sumindo?",
      "A anotação do dataset é consistente?",
    ],
  }),
} satisfies LessonModule["visuals"];
