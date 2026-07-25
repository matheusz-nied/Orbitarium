import type { LessonModule } from "../../../types/content";
import { createStandardLessonVisuals } from "../_shared/visualFactories";

export const visuals = createStandardLessonVisuals({
  tone: "emerald",
  heroTitle: "CNNs transformam pixels em padrões reutilizáveis",
  heroSubtitle: "Filtro local, mapa de ativação e composição hierárquica",
  heroSteps: ["Filtrar", "Resumir", "Compor"],
  heroFooter: "A força das CNNs vem de assumir corretamente que imagens têm estrutura espacial local.",
  conceptTitle: "Um filtro lê vizinhanças, não a imagem inteira de uma vez",
  conceptLeft: {
    title: "MLP densa",
    body: "Todos os pixels entram sem privilégio explícito para a vizinhança local.",
  },
  conceptRight: {
    title: "CNN",
    body: "Pequenos filtros reutilizados percorrem a imagem e detectam padrões repetíveis.",
  },
  conceptFooter: "Compartilhamento de pesos é eficiência e também um bom viés indutivo.",
  pipelineTitle: "Pipeline mental de uma camada convolucional",
  pipelineSteps: ["Patch local", "Kernel", "Resposta", "Mapa", "Próxima camada"],
  comparisonTitle: "Mapas iniciais vs. semântica profunda",
  comparisonLeft: {
    title: "Camadas rasas",
    body: "Bordas, texturas simples, contrastes e orientações locais.",
  },
  comparisonRight: {
    title: "Camadas profundas",
    body: "Partes, configurações e pistas cada vez mais alinhadas à tarefa visual.",
  },
  tradeoffTitle: "Projeto de CNN é uma troca entre detalhe e custo",
  tradeoffXAxis: "Resolução preservada",
  tradeoffYAxis: "Semântica/custo agregado",
  tradeoffPoints: [
    { label: "Classificação", x: 0.35, y: 0.8 },
    { label: "Segmentação", x: 0.78, y: 0.82 },
    { label: "Modelo leve", x: 0.28, y: 0.48 },
    { label: "Pooling cedo", x: 0.18, y: 0.38 },
  ],
  checklistTitle: "Checklist para ler uma CNN",
  checklistItems: [
    "Qual padrão cada filtro tende a detectar?",
    "Stride está reduzindo detalhe cedo demais?",
    "Padding preserva bordas adequadamente?",
    "Pooling é útil para a tarefa ou agressivo demais?",
    "As camadas profundas ainda recebem resolução suficiente?",
    "A arquitetura combina com classificação, detecção ou segmentação?",
  ],
}) satisfies LessonModule["visuals"];
