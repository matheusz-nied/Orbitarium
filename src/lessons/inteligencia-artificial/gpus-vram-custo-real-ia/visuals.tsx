import type { LessonModule } from "../../../types/content";
import { createStandardLessonVisuals } from "../_shared/visualFactories";

export const visuals = createStandardLessonVisuals({
  "tone": "rose",
  "heroTitle": "Custo real de IA nasce da união entre GPU, tráfego e utilização",
  "heroSubtitle": "Preço de tabela ajuda, mas o que decide a conta é o trabalho útil entregue com estabilidade",
  "heroSteps": [
    "Provisionar",
    "Ocupar",
    "Comparar"
  ],
  "heroFooter": "A GPU certa não é a maior: é a que sustenta o produto dentro do orçamento operacional.",
  "conceptTitle": "O orçamento de VRAM tem vários moradores",
  "conceptLeft": {
    "title": "Pesos",
    "body": "Definem a base estrutural do modelo em memória."
  },
  "conceptRight": {
    "title": "Cache e buffers",
    "body": "Crescem com contexto, batch, concorrência e runtime."
  },
  "conceptFooter": "Servir bem é gerir memória dinâmica, não apenas armazenar o checkpoint.",
  "pipelineTitle": "Da capacidade provisionada ao trabalho útil",
  "pipelineSteps": [
    "Alugar",
    "Carregar",
    "Agendar",
    "Servir",
    "Medir"
  ],
  "comparisonTitle": "Preço nominal vs. custo por resultado",
  "comparisonLeft": {
    "title": "GPU ociosa",
    "body": "Pode parecer barata por hora e cara por requisição."
  },
  "comparisonRight": {
    "title": "GPU ocupada",
    "body": "Pode ter preço maior, mas custo útil melhor."
  },
  "tradeoffTitle": "Mais headroom, menos risco; mais ociosidade, mais custo",
  "tradeoffXAxis": "Segurança de capacidade",
  "tradeoffYAxis": "Ineficiência econômica",
  "tradeoffPoints": [
    {
      "label": "Ajustado",
      "x": 0.32,
      "y": 0.28
    },
    {
      "label": "Folga saudável",
      "x": 0.52,
      "y": 0.34
    },
    {
      "label": "Superprovisionado",
      "x": 0.86,
      "y": 0.82
    },
    {
      "label": "Sem headroom",
      "x": 0.12,
      "y": 0.76
    }
  ],
  "checklistTitle": "Checklist econômico de infraestrutura",
  "checklistItems": [
    "Você sabe o que ocupa VRAM além dos pesos?",
    "Existe medida de custo por requisição ou por token útil?",
    "O tráfego justifica a capacidade provisionada?",
    "Há headroom sem superprovisionar demais?",
    "O modelo de cobrança combina com a previsibilidade da carga?",
    "A topologia escolhida ajuda ou atrapalha o isolamento dos workloads?"
  ]
}) satisfies LessonModule["visuals"];
