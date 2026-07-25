import type { LessonModule } from "../../../types/content";
import { createStandardLessonVisuals } from "../_shared/visualFactories";

export const visuals = createStandardLessonVisuals({
  tone: "emerald",
  heroTitle: "Agentes sao loops controlados de linguagem, ferramentas e estado",
  heroSubtitle:
    "O valor surge quando o sistema observa o ambiente, escolhe poucos passos bons e integra o resultado de volta ao fluxo",
  heroSteps: ["Observar", "Agir", "Reavaliar"],
  heroFooter:
    "Autonomia útil depende tanto de ferramentas e memória quanto de critérios de parada e fronteiras de segurança.",
  conceptTitle: "Duas fontes de capacidade",
  conceptLeft: {
    title: "Modelo",
    body: "Interpreta objetivo, decide próximos passos e integra observações em linguagem.",
  },
  conceptRight: {
    title: "Ferramentas",
    body: "Fornecem busca, cálculo, execução e acesso a dados que o modelo puro não garante.",
  },
  conceptFooter:
    "Um agente bom não finge saber tudo; ele coordena especialistas externos com critério.",
  pipelineTitle: "Loop básico de um agente",
  pipelineSteps: ["Objetivo", "Plano", "Ação", "Observação", "Decisão"],
  comparisonTitle: "Chat único vs. agente",
  comparisonLeft: {
    title: "Resposta única",
    body: "Baixa latência e alta simplicidade, mas pouca capacidade de verificar, buscar ou agir fora do texto.",
  },
  comparisonRight: {
    title: "Sistema agentico",
    body: "Pode consultar ferramentas e iterar, porém assume custos extras de latência, coordenação e segurança.",
  },
  tradeoffTitle: "Quanto mais autonomia, maior a necessidade de controle",
  tradeoffXAxis: "Autonomia operacional",
  tradeoffYAxis: "Superficie de risco",
  tradeoffPoints: [
    { label: "Chat", x: 0.18, y: 0.1 },
    { label: "Workflow", x: 0.42, y: 0.24 },
    { label: "Agente balanceado", x: 0.72, y: 0.4 },
    { label: "Agente sem freios", x: 0.92, y: 0.86 },
  ],
  checklistTitle: "Checklist de um agente saudável",
  checklistItems: [
    "As ferramentas realmente cobrem o que o modelo não faz bem sozinho?",
    "O estado guarda só o necessário para executar e auditar o fluxo?",
    "Há critérios claros para parar, pedir ajuda ou escalar para humano?",
    "A superfície de permissão é mínima para o objetivo atual?",
    "As observações externas são tratadas como confiáveis, duvidosas ou hostis?",
    "O time conseguiria explicar por que cada ação foi tomada?",
  ],
}) satisfies LessonModule["visuals"];
