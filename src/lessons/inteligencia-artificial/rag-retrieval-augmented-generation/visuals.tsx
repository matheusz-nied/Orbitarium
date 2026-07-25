import type { LessonModule } from "../../../types/content";
import { createStandardLessonVisuals } from "../_shared/visualFactories";

export const visuals = createStandardLessonVisuals({
  tone: "emerald",
  heroTitle: "RAG conecta recuperação externa à geração",
  heroSubtitle: "O modelo continua gerando texto, mas agora com apoio em documentos relevantes trazidos no momento da tarefa",
  heroSteps: ["Indexar", "Recuperar", "Responder"],
  heroFooter:
    "Base boa, ranking bom e síntese disciplinada são os três pilares do grounding em RAG.",
  conceptTitle: "Duas memórias trabalhando juntas",
  conceptLeft: {
    title: "Paramétrica",
    body: "Conhecimento internalizado nos pesos do modelo, útil mas pouco auditável e menos atualizável item a item.",
  },
  conceptRight: {
    title: "Não paramétrica",
    body: "Documentos externos recuperáveis que podem ser atualizados, filtrados e citados sem retreinar o modelo inteiro.",
  },
  conceptFooter:
    "RAG não apaga a memória do modelo; ele a complementa com evidência recuperada.",
  pipelineTitle: "Fluxo básico de RAG",
  pipelineSteps: ["Docs", "Chunks", "Retriever", "Contexto", "Resposta"],
  comparisonTitle: "Dois contextos possíveis",
  comparisonLeft: {
    title: "Contexto útil",
    body: "Poucos trechos fortes, coerentes e diretamente relacionados à pergunta ajudam a síntese grounded.",
  },
  comparisonRight: {
    title: "Contexto ruidoso",
    body: "Trechos demais, pouco relacionados ou mal segmentados dispersam a atenção do modelo e pioram a resposta.",
  },
  tradeoffTitle: "Cobertura e ruído disputam a mesma janela de contexto",
  tradeoffXAxis: "Cobertura de recuperação",
  tradeoffYAxis: "Ruído / distração no contexto",
  tradeoffPoints: [
    { label: "Top-k curto", x: 0.24, y: 0.16 },
    { label: "Balanceado", x: 0.54, y: 0.34 },
    { label: "Muitos candidatos", x: 0.86, y: 0.72 },
    { label: "Base ruim", x: 0.3, y: 0.82 },
  ],
  checklistTitle: "Checklist de um RAG saudável",
  checklistItems: [
    "A base foi limpa e segmentada com cuidado?",
    "Os metadados ajudam a filtrar e explicar a busca?",
    "O retriever traz o trecho certo entre os candidatos?",
    "O top-k injeta cobertura sem encher a janela de ruído?",
    "A política de resposta respeita os documentos recuperados?",
    "Há logging para inspecionar ranking, contexto e síntese?",
  ],
}) satisfies LessonModule["visuals"];
