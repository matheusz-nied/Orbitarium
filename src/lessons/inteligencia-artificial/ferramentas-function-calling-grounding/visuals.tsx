import type { LessonModule } from "../../../types/content";
import { createStandardLessonVisuals } from "../_shared/visualFactories";

export const visuals = createStandardLessonVisuals({
  tone: "teal",
  heroTitle: "Ferramentas e grounding ligam linguagem a sistemas e evidências reais",
  heroSubtitle:
    "O modelo deixa de responder sozinho e passa a sugerir chamadas estruturadas sobre fontes e ações controladas",
  heroSteps: ["Sugerir", "Executar", "Ancorar"],
  heroFooter:
    "O ganho real vem da combinação entre schema claro, validação rígida e observações externas relevantes.",
  conceptTitle: "Duas ampliações de capacidade",
  conceptLeft: {
    title: "Ferramentas",
    body: "Permitem agir, consultar APIs e delegar cálculo ou operações a módulos especializados.",
  },
  conceptRight: {
    title: "Grounding",
    body: "Permite responder com base em evidências externas em vez de depender só da memória do modelo.",
  },
  conceptFooter:
    "Ferramenta amplia ação; grounding amplia confiança factual, desde que a evidência seja boa.",
  pipelineTitle: "Fluxo básico de function calling",
  pipelineSteps: ["Prompt", "Schema", "Chamada", "Execução", "Observação"],
  comparisonTitle: "Modelo puro vs. modelo conectado",
  comparisonLeft: {
    title: "Modelo puro",
    body: "Explica e resume bem, mas erra quando precisa de fatos atuais, cálculo exato ou ação autorizada.",
  },
  comparisonRight: {
    title: "Modelo conectado",
    body: "Pode consultar e agir sobre sistemas reais, mas exige validação, roteamento e segurança adicionais.",
  },
  tradeoffTitle: "Mais grounding reduz improviso, mas custa engenharia",
  tradeoffXAxis: "Sobrecarga operacional",
  tradeoffYAxis: "Confianca factual",
  tradeoffPoints: [
    { label: "Puro", x: 0.12, y: 0.24 },
    { label: "Tools vagas", x: 0.46, y: 0.52 },
    { label: "Tools + grounding", x: 0.74, y: 0.86 },
    { label: "RAG fraco", x: 0.52, y: 0.38 },
  ],
  checklistTitle: "Checklist de tool use saudável",
  checklistItems: [
    "A ferramenta está descrita em linguagem que o modelo realmente entende?",
    "Os argumentos têm tipos, restrições e validação suficientes?",
    "A execução real continua sob autoridade da aplicação?",
    "As fontes usadas para grounding são atuais, confiáveis e relevantes?",
    "O catálogo visível de ferramentas foi reduzido ao contexto necessário?",
    "Há proteção contra conteúdo externo malicioso ou irrelevante?",
  ],
}) satisfies LessonModule["visuals"];
