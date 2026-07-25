import type { LessonModule } from "../../../types/content";
import { createStandardLessonVisuals } from "../_shared/visualFactories";

export const visuals = {
  ...createStandardLessonVisuals({
    tone: "amber",
    heroTitle: "Do som à linguagem e da linguagem à voz",
    heroSubtitle: "waveform ↔ representação acústica ↔ texto",
    heroSteps: ["Escutar", "Transcrever", "Falar"],
    heroFooter:
      "ASR e TTS fecham o ciclo entre percepção acústica e expressão verbal.",
    conceptTitle: "Fala vive entre som e símbolo",
    conceptLeft: {
      title: "ASR",
      body: "transforma sinal contínuo em sequência textual discreta",
    },
    conceptRight: {
      title: "TTS",
      body: "transforma texto em voz com ritmo, timbre e prosódia plausíveis",
    },
    conceptFooter: "o desafio é físico, temporal e linguístico ao mesmo tempo",
    pipelineTitle: "Pipeline conceitual de voz",
    pipelineSteps: ["Áudio", "Features", "Modelo", "Texto/Plano", "Waveform"],
    comparisonTitle: "Robustez de ASR vs naturalidade de TTS",
    comparisonLeft: {
      title: "Reconhecimento",
      body: "quer precisão sob ruído, sotaque, pausas e streaming",
    },
    comparisonRight: {
      title: "Síntese",
      body: "quer voz fluida, inteligível, estável e com prosódia natural",
    },
    tradeoffTitle: "Latência vs contexto em fala",
    tradeoffXAxis: "resposta rápida",
    tradeoffYAxis: "contexto / qualidade",
    tradeoffPoints: [
      { label: "streaming curto", x: 0.84, y: 0.32 },
      { label: "equilíbrio", x: 0.52, y: 0.64 },
      { label: "offline completo", x: 0.16, y: 0.9 },
      { label: "TTS natural", x: 0.32, y: 0.78 },
    ],
    checklistTitle: "Checklist mental para sistemas de voz",
    checklistItems: [
      "O sinal está limpo o suficiente?",
      "A tarefa é offline ou streaming?",
      "A métrica principal é WER ou experiência do usuário?",
      "O modelo lida bem com sotaques e ruído?",
      "A voz sintetizada tem prosódia natural?",
      "Existe plano para exceções e ambiguidade?",
    ],
  }),
} satisfies LessonModule["visuals"];
