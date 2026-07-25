import type { LessonModule } from "../../../types/content";
import { createStandardLessonVisuals } from "../_shared/visualFactories";

export const visuals = createStandardLessonVisuals({
  tone: "amber",
  heroTitle: "Ordem e contexto são problemas diferentes",
  heroSubtitle: "Positional encoding diz onde cada token está; a janela decide quantos cabem",
  heroSteps: ["Posicionar", "Relacionar", "Orçar"],
  heroFooter: "Atenção precisa de coordenadas para ordem e de orçamento para caber em memória e custo.",
  conceptTitle: "Sem posição, a sequência perde direção",
  conceptLeft: {
    title: "Conteúdo puro",
    body: "Tokens podem ser comparados, mas a ordem entre eles fica mal definida.",
  },
  conceptRight: {
    title: "Conteúdo + posição",
    body: "A arquitetura passa a distinguir quem veio antes, depois e a que distância.",
  },
  conceptFooter: "Posição não substitui atenção; ela orienta a atenção.",
  pipelineTitle: "Caminhos modernos para informar distância",
  pipelineSteps: ["Token", "Posição", "Query/Key", "Atenção", "Contexto"],
  comparisonTitle: "Duas perguntas diferentes",
  comparisonLeft: {
    title: "Positional encoding",
    body: "Responde como a arquitetura representa ordem e distância na sequência.",
  },
  comparisonRight: {
    title: "Janela de contexto",
    body: "Responde quantos tokens cabem e como esse orçamento é disputado na chamada.",
  },
  tradeoffTitle: "Contexto maior aumenta custo e capacidade",
  tradeoffXAxis: "Comprimento da sequência",
  tradeoffYAxis: "Custo/benefício potencial",
  tradeoffPoints: [
    { label: "Curto", x: 0.18, y: 0.28 },
    { label: "Médio", x: 0.45, y: 0.58 },
    { label: "Longo", x: 0.72, y: 0.84 },
    { label: "Mal curado", x: 0.82, y: 0.42 },
  ],
  checklistTitle: "Checklist de contexto longo",
  checklistItems: [
    "A ordem está sendo representada pelo mecanismo posicional correto?",
    "O orçamento inclui saída e histórico, não só o prompt?",
    "Há contexto redundante demais ocupando a janela?",
    "A arquitetura lida bem com comprimentos maiores?",
    "O custo de atenção está aceitável?",
    "Chunking e recuperação poderiam organizar melhor a informação?",
  ],
}) satisfies LessonModule["visuals"];
