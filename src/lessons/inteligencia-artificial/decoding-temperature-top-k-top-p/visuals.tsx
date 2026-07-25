import type { LessonModule } from "../../../types/content";
import { createStandardLessonVisuals } from "../_shared/visualFactories";

export const visuals = createStandardLessonVisuals({
  tone: "rose",
  heroTitle: "Decoding decide como explorar a distribuição",
  heroSubtitle: "O modelo produz probabilidades; a estratégia decide como transformá-las em texto",
  heroSteps: ["Pontuar", "Truncar", "Escolher"],
  heroFooter: "A mesma distribuição pode soar conservadora, criativa ou arriscada dependendo do decoding.",
  conceptTitle: "Greedy e sampling não fazem a mesma aposta",
  conceptLeft: {
    title: "Greedy",
    body: "Sempre segue o token líder e privilegia máxima previsibilidade local.",
  },
  conceptRight: {
    title: "Sampling",
    body: "Permite explorar alternativas plausíveis dentro de uma distribuição ajustada e truncada.",
  },
  conceptFooter: "Decoding é política de escolha, não nova fonte de conhecimento.",
  pipelineTitle: "Fluxo mental da geração",
  pipelineSteps: ["Logits", "Softmax", "Temperatura", "Top-k/p", "Token"],
  comparisonTitle: "Duas formas de cortar candidatos",
  comparisonLeft: {
    title: "Top-k",
    body: "Mantém quantidade fixa de finalistas, mesmo quando a incerteza do contexto muda.",
  },
  comparisonRight: {
    title: "Top-p",
    body: "Mantém massa acumulada confiável, deixando o tamanho do núcleo variar a cada passo.",
  },
  tradeoffTitle: "Diversidade e risco crescem juntos",
  tradeoffXAxis: "Exploração",
  tradeoffYAxis: "Risco/variação da saída",
  tradeoffPoints: [
    { label: "Greedy", x: 0.08, y: 0.12 },
    { label: "Temp. baixa", x: 0.28, y: 0.24 },
    { label: "Top-p", x: 0.6, y: 0.56 },
    { label: "Temp. alta", x: 0.84, y: 0.82 },
  ],
  checklistTitle: "Checklist de geração",
  checklistItems: [
    "A tarefa tolera erro ou exige consistência alta?",
    "A diversidade desejada justifica aumentar temperatura?",
    "Vale limitar a cauda com top-k ou top-p?",
    "A saída ficou repetitiva por excesso de determinismo?",
    "A saída ficou errática por excesso de exploração?",
    "Há grounding e validação para tarefas de alto risco?",
  ],
}) satisfies LessonModule["visuals"];
