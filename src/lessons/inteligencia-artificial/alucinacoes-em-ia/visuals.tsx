import type { LessonModule } from "../../../types/content";
import { createStandardLessonVisuals } from "../_shared/visualFactories";

export const visuals = createStandardLessonVisuals({
  tone: "amber",
  heroTitle: "Alucinação nasce quando plausibilidade anda sem evidência",
  heroSubtitle: "LLMs escrevem bem, mas isso não garante verdade nem fonte confiável",
  heroSteps: ["Pergunta", "Evidência", "Resposta"],
  heroFooter:
    "Quanto mais contexto verificável e liberdade para abster-se, menor tende a ser o improviso factual.",
  conceptTitle: "Soar convincente e estar correto são coisas diferentes",
  conceptLeft: {
    title: "Plausibilidade",
    body: "Texto bem formado, coerente e estilisticamente confiante pode parecer excelente mesmo quando falta base factual.",
  },
  conceptRight: {
    title: "Grounding",
    body: "Resposta fica mais confiável quando é ancorada em documentos, dados ou contexto verificável no momento da tarefa.",
  },
  conceptFooter:
    "Confiabilidade não vem só do modelo: vem do sistema que decide como ele responde e com base em quê.",
  pipelineTitle: "Como o risco costuma surgir",
  pipelineSteps: ["Pedido", "Lacuna", "Inferência", "Tom seguro", "Erro"],
  comparisonTitle: "Duas formas de responder a uma lacuna",
  comparisonLeft: {
    title: "Improvisar",
    body: "Completa o vazio com uma continuação plausível, mesmo sem apoio suficiente em fatos ou fontes.",
  },
  comparisonRight: {
    title: "Ancorar ou abster-se",
    body: "Usa contexto explícito, cita evidência ou reconhece quando a base não basta para responder bem.",
  },
  tradeoffTitle: "Mais liberdade pode aumentar utilidade e também risco",
  tradeoffXAxis: "Liberdade para extrapolar",
  tradeoffYAxis: "Risco de erro factual",
  tradeoffPoints: [
    { label: "Abster-se", x: 0.12, y: 0.1 },
    { label: "RAG", x: 0.38, y: 0.28 },
    { label: "Chat aberto", x: 0.7, y: 0.66 },
    { label: "Improviso total", x: 0.9, y: 0.9 },
  ],
  checklistTitle: "Checklist anti-alucinação",
  checklistItems: [
    "O pedido está específico o suficiente?",
    "Há documentos ou dados para ancorar a resposta?",
    "O sistema permite dizer 'não sei' ou pedir clarificação?",
    "A aplicação exige citação, rastreabilidade ou revisão?",
    "Existe avaliação para detectar respostas inventadas?",
    "O custo do erro foi considerado no desenho do fluxo?",
  ],
}) satisfies LessonModule["visuals"];
