import type { LessonModule } from "../../../types/content";
import { createStandardLessonVisuals } from "../_shared/visualFactories";

export const visuals = createStandardLessonVisuals({
  tone: "rose",
  heroTitle: "Observar LLMs e reconstruir comportamento, nao apenas uptime",
  heroSubtitle:
    "Tracing, evals e gates de release ajudam a explicar por que o sistema respondeu como respondeu",
  heroSteps: ["Rastrear", "Avaliar", "Reagir"],
  heroFooter:
    "Sem fechar o ciclo entre producao, dataset e release, melhorias viram palpites caros e regressões passam despercebidas.",
  conceptTitle: "Camadas de observabilidade",
  conceptLeft: {
    title: "Execução",
    body: "Logs, spans e métricas mostram como o pipeline correu, custou e falhou.",
  },
  conceptRight: {
    title: "Qualidade",
    body: "Evals e feedback do usuário mostram se a resposta foi útil, factual e segura.",
  },
  conceptFooter:
    "Sinais técnicos sem sinais de qualidade são insuficientes para explicar sistemas com LLMs.",
  pipelineTitle: "Ciclo observável de um sistema LLM",
  pipelineSteps: ["Run", "Trace", "Eval", "Gate", "Aprendizado"],
  comparisonTitle: "Monitoramento técnico vs. observabilidade completa",
  comparisonLeft: {
    title: "Só técnico",
    body: "Latência e erro podem estar bons mesmo quando groundedness, utilidade ou política já pioraram para o usuário.",
  },
  comparisonRight: {
    title: "Completo",
    body: "Une execução, qualidade e resposta operacional para detectar e corrigir regressões mais cedo.",
  },
  tradeoffTitle: "Mais telemetria e eval aumentam clareza, mas custam engenharia",
  tradeoffXAxis: "Sobrecarga observacional",
  tradeoffYAxis: "Capacidade de diagnosticar",
  tradeoffPoints: [
    { label: "Logs", x: 0.18, y: 0.26 },
    { label: "Traces", x: 0.44, y: 0.62 },
    { label: "Traces + evals", x: 0.7, y: 0.86 },
    { label: "Painel pobre", x: 0.08, y: 0.1 },
  ],
  checklistTitle: "Checklist de observabilidade saudável",
  checklistItems: [
    "Os traces realmente cobrem modelo, retrieval, ferramentas e pós-processamento?",
    "Há semântica suficiente para entender cada span sem adivinhar?",
    "Os datasets de avaliação incluem falhas reais já vistas em produção?",
    "Existe diferença clara entre alertas técnicos e alertas de qualidade?",
    "Mudanças em prompt, modelo ou retriever passam por gates objetivos antes do release?",
    "O time consegue converter incidentes em aprendizado versionado para o próximo ciclo?",
  ],
}) satisfies LessonModule["visuals"];
