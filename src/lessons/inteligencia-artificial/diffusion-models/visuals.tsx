import type { LessonModule } from "../../../types/content";
import { createStandardLessonVisuals } from "../_shared/visualFactories";

export const visuals = {
  ...createStandardLessonVisuals({
    tone: "violet",
    heroTitle: "Geração como denoising iterativo",
    heroSubtitle: "ruído puro → vários passos → imagem coerente",
    heroSteps: ["Corromper", "Aprender inversão", "Refinar"],
    heroFooter:
      "Diffusion models trocam um salto gerativo único por muitas correções locais estáveis.",
    conceptTitle: "A intuição central da difusão",
    conceptLeft: {
      title: "Processo direto",
      body: "adiciona ruído até quase apagar o dado original",
    },
    conceptRight: {
      title: "Processo inverso",
      body: "remove ruído gradualmente até recuperar uma amostra plausível",
    },
    conceptFooter: "destruição conhecida torna a reconstrução aprendível",
    pipelineTitle: "Pipeline conceitual do DDPM",
    pipelineSteps: ["Amostrar t", "Adicionar ruído", "Prever epsilon", "Atualizar estado", "Repetir"],
    comparisonTitle: "Espaço de pixel vs espaço latente",
    comparisonLeft: {
      title: "Difusão em pixels",
      body: "mais cara e direta, com alta dimensionalidade visual desde o início",
    },
    comparisonRight: {
      title: "Latent diffusion",
      body: "opera em representação comprimida e reduz muito o custo prático",
    },
    tradeoffTitle: "Passos de amostragem vs custo",
    tradeoffXAxis: "velocidade de geração",
    tradeoffYAxis: "qualidade / fidelidade",
    tradeoffPoints: [
      { label: "poucos passos", x: 0.84, y: 0.42 },
      { label: "equilíbrio", x: 0.56, y: 0.68 },
      { label: "muitos passos", x: 0.18, y: 0.9 },
      { label: "guidance forte", x: 0.48, y: 0.58 },
    ],
    checklistTitle: "Checklist mental para ler um modelo de difusão",
    checklistItems: [
      "Como o ruído é agendado ao longo do tempo?",
      "A rede prevê ruído, x0 ou outra parametrização?",
      "Qual sampler está sendo usado?",
      "Há guidance condicional?",
      "A difusão ocorre em pixels ou latentes?",
      "Qual é o custo total em passos e memória?",
    ],
  }),
} satisfies LessonModule["visuals"];
