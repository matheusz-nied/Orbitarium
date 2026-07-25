import type { LessonModule } from "../../../types/content";
import { createStandardLessonVisuals } from "../_shared/visualFactories";

export const visuals = {
  ...createStandardLessonVisuals({
    tone: "rose",
    heroTitle: "Duas rotas para gerar imagens",
    heroSubtitle: "jogo adversarial vs denoising iterativo",
    heroSteps: ["Aprender distribuição", "Gerar amostras", "Aceitar trade-offs"],
    heroFooter:
      "GANs e diffusion resolvem o mesmo objetivo por dinâmicas de treino muito diferentes.",
    conceptTitle: "Filosofia das duas famílias",
    conceptLeft: {
      title: "GAN",
      body: "gerador cria e discriminador julga em um jogo competitivo",
    },
    conceptRight: {
      title: "Diffusion",
      body: "modelo aprende a remover ruído passo a passo até chegar ao dado",
    },
    conceptFooter: "competição adversarial vs refinamento iterativo",
    pipelineTitle: "Onde os caminhos se separam",
    pipelineSteps: ["Sinal de treino", "Estabilidade", "Amostragem", "Controle", "Custo"],
    comparisonTitle: "Perfil típico das famílias",
    comparisonLeft: {
      title: "GANs",
      body: "amostragem rápida, nitidez forte, treino mais sensível e risco de collapse",
    },
    comparisonRight: {
      title: "Diffusion",
      body: "treino estável, controle rico e inferência mais iterativa e cara",
    },
    tradeoffTitle: "Velocidade vs estabilidade de engenharia",
    tradeoffXAxis: "velocidade de amostragem",
    tradeoffYAxis: "facilidade de treino / uso",
    tradeoffPoints: [
      { label: "GAN", x: 0.84, y: 0.32 },
      { label: "StyleGAN", x: 0.72, y: 0.48 },
      { label: "DDPM", x: 0.18, y: 0.82 },
      { label: "Latent diffusion", x: 0.46, y: 0.74 },
    ],
    checklistTitle: "Checklist mental para escolher uma família",
    checklistItems: [
      "A latência de geração é crítica?",
      "O treino adversarial é aceitável?",
      "A diversidade importa tanto quanto a nitidez?",
      "Há condicionamento complexo por texto ou máscara?",
      "O domínio é aberto ou muito restrito?",
      "O ecossistema de tooling pesa na decisão?",
    ],
  }),
} satisfies LessonModule["visuals"];
