import type { LessonModule } from "../../../types/content";
import { createStandardLessonVisuals } from "../_shared/visualFactories";

export const visuals = createStandardLessonVisuals({
  tone: "violet",
  heroTitle: "Adaptar um modelo nem sempre exige mover todos os pesos",
  heroSubtitle:
    "Fine-tuning completo, LoRA e QLoRA ocupam posições diferentes no mapa entre flexibilidade e eficiência",
  heroSteps: ["Especializar", "Compactar", "Validar"],
  heroFooter:
    "A grande decisão prática é equilibrar custo, capacidade de adaptação e risco de regressão comportamental.",
  conceptTitle: "Duas formas de adaptar",
  conceptLeft: {
    title: "Ajuste completo",
    body: "Reotimiza muitos pesos e oferece liberdade máxima, com custo alto.",
  },
  conceptRight: {
    title: "LoRA / PEFT",
    body: "Aprende correções compactas sobre uma base congelada, reduzindo custo.",
  },
  conceptFooter:
    "PEFT é valioso quando o conhecimento de base já é forte e o objetivo é redirecionar comportamento.",
  pipelineTitle: "Pipeline de adaptação responsável",
  pipelineSteps: ["Objetivo", "Dados", "Método", "Treino", "Avaliação"],
  comparisonTitle: "Base geral vs. modelo adaptado",
  comparisonLeft: {
    title: "Modelo base",
    body: "Sabe muita linguagem ampla, mas não necessariamente responde no formato, tom e domínio desejados.",
  },
  comparisonRight: {
    title: "Modelo ajustado",
    body: "Foi deslocado para um comportamento mais útil ao caso de uso, com custo e riscos específicos.",
  },
  tradeoffTitle: "Mapa de trade-offs da adaptação",
  tradeoffXAxis: "Eficiência operacional",
  tradeoffYAxis: "Liberdade de adaptação",
  tradeoffPoints: [
    { label: "Full FT", x: 0.18, y: 0.93 },
    { label: "LoRA", x: 0.76, y: 0.74 },
    { label: "QLoRA", x: 0.9, y: 0.67 },
    { label: "Só prompt", x: 0.98, y: 0.2 },
  ],
  checklistTitle: "Checklist antes de fine-tunar",
  checklistItems: [
    "O problema é paramétrico ou seria melhor resolvido com contexto externo?",
    "Os exemplos de treino refletem realmente o uso do produto?",
    "Há dados suficientes para mover o comportamento sem rigidez excessiva?",
    "A avaliação mede ganho e também regressão em capacidades sensíveis?",
    "O custo de manter múltiplas variantes foi considerado?",
    "A técnica escolhida cabe no orçamento de VRAM e iteração do time?",
  ],
}) satisfies LessonModule["visuals"];
