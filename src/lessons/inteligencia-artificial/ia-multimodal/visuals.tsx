import type { LessonModule } from "../../../types/content";
import { createStandardLessonVisuals } from "../_shared/visualFactories";

export const visuals = {
  ...createStandardLessonVisuals({
    tone: "teal",
    heroTitle: "Múltiplas modalidades, uma representação útil",
    heroSubtitle: "texto + imagem + áudio + contexto",
    heroSteps: ["Codificar", "Alinhar", "Fundir"],
    heroFooter:
      "Multimodalidade forte exige pontes entre sinais, não apenas inputs paralelos.",
    conceptTitle: "Cada modalidade traz uma estrutura diferente",
    conceptLeft: {
      title: "Especialização",
      body: "texto, imagem e áudio pedem encoders e vieses arquiteturais distintos",
    },
    conceptRight: {
      title: "Integração",
      body: "em algum ponto as representações precisam conversar de forma útil",
    },
    conceptFooter: "especializar primeiro, alinhar depois, fundir com critério",
    pipelineTitle: "Pipeline conceitual multimodal",
    pipelineSteps: ["Encoder A", "Encoder B", "Alinhamento", "Fusão", "Saída"],
    comparisonTitle: "Fusão rasa vs grounding real",
    comparisonLeft: {
      title: "Concatenação simples",
      body: "junta sinais, mas pode não aprender como um corrige ou explica o outro",
    },
    comparisonRight: {
      title: "Integração grounded",
      body: "uma modalidade consulta a outra e ancora a decisão em evidência real",
    },
    tradeoffTitle: "Generalidade multimodal vs ruído entre sinais",
    tradeoffXAxis: "número / variedade de modalidades",
    tradeoffYAxis: "integração útil",
    tradeoffPoints: [
      { label: "duas modalidades limpas", x: 0.22, y: 0.86 },
      { label: "fusão boa", x: 0.46, y: 0.74 },
      { label: "muitas modalidades", x: 0.82, y: 0.44 },
      { label: "dados desalinhados", x: 0.68, y: 0.28 },
    ],
    checklistTitle: "Checklist mental para um sistema multimodal",
    checklistItems: [
      "As modalidades estão realmente alinhadas?",
      "O encoder respeita a estrutura de cada sinal?",
      "Quando a fusão acontece?",
      "Há grounding perceptual real?",
      "Uma modalidade está dominando as outras?",
      "O benchmark mede integração ou só correlação espúria?",
    ],
  }),
} satisfies LessonModule["visuals"];
