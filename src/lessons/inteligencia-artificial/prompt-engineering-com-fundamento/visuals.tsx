import type { LessonModule } from "../../../types/content";
import { createStandardLessonVisuals } from "../_shared/visualFactories";

export const visuals = createStandardLessonVisuals({
  tone: "violet",
  heroTitle: "Prompting funciona melhor quando vira interface clara",
  heroSubtitle: "Objetivo, contexto, restrições e formato moldam muito mais do que frases mágicas",
  heroSteps: ["Definir", "Contextualizar", "Formatar"],
  heroFooter:
    "Prompt bom reduz ambiguidade e entra em ciclo de avaliação, em vez de depender de tentativa e erro opaco.",
  conceptTitle: "Dois jeitos de tratar um prompt",
  conceptLeft: {
    title: "Superstição",
    body: "Trocar palavras esperando milagre, sem hipóteses, sem testes e sem critério claro de sucesso.",
  },
  conceptRight: {
    title: "Engenharia",
    body: "Projetar contrato de tarefa com informação relevante, limites explícitos e saídas observáveis.",
  },
  conceptFooter:
    "Prompting maduro se aproxima mais de design de sistema do que de improviso em chat.",
  pipelineTitle: "Fluxo mental do prompting com fundamento",
  pipelineSteps: ["Tarefa", "Objetivo", "Contexto", "Restrições", "Saída"],
  comparisonTitle: "Exemplo ensina ou polui",
  comparisonLeft: {
    title: "Few-shot bom",
    body: "Mostra casos representativos, fronteiras reais e formato desejado sem ruído desnecessário.",
  },
  comparisonRight: {
    title: "Few-shot ruim",
    body: "Ensina padrão enviesado, redundante ou mal rotulado e empurra o modelo para o erro.",
  },
  tradeoffTitle: "Mais controle pode reduzir variação e também flexibilidade",
  tradeoffXAxis: "Controle do prompt",
  tradeoffYAxis: "Variabilidade / liberdade da saída",
  tradeoffPoints: [
    { label: "Vago", x: 0.12, y: 0.86 },
    { label: "Zero-shot claro", x: 0.42, y: 0.52 },
    { label: "Few-shot", x: 0.64, y: 0.38 },
    { label: "Schema rígido", x: 0.88, y: 0.14 },
  ],
  checklistTitle: "Checklist de prompt",
  checklistItems: [
    "A tarefa está descrita com verbo e objetivo claros?",
    "O contexto fornecido é realmente relevante?",
    "As restrições estão explícitas e sem conflito?",
    "O formato de saída é compatível com o uso downstream?",
    "Há exemplos apenas quando eles realmente ensinam algo?",
    "Existe um conjunto de casos para comparar versões do prompt?",
  ],
}) satisfies LessonModule["visuals"];
