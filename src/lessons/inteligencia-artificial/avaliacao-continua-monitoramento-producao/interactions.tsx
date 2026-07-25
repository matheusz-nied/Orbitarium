import { BarChart3, ShieldAlert, Sliders } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import {
  createScenarioExplorer,
  createSliderPlayground,
} from "../_shared/interactionFactories";

const observabilityCoverageLab = createSliderPlayground({
  eyebrow: "Observabilidade",
  title: "Ajuste cobertura de traces, metadados e alertas",
  description:
    "Monitoramento útil depende de enxergar o suficiente para investigar, sem coletar ruído cego demais.",
  tone: "teal",
  icon: <Sliders size={18} aria-hidden="true" />,
  initialState: {
    tracing: 0.55,
    metadata: 0.45,
    alerts: 0.5,
  },
  controls: [
    { key: "tracing", label: "cobertura de tracing", min: 0.1, max: 1, step: 0.05, formatValue: (value) => value.toFixed(2) },
    { key: "metadata", label: "riqueza de metadados úteis", min: 0.1, max: 1, step: 0.05, formatValue: (value) => value.toFixed(2) },
    { key: "alerts", label: "qualidade do alerting", min: 0.1, max: 1, step: 0.05, formatValue: (value) => value.toFixed(2) },
  ],
  compute: ({ tracing, metadata, alerts }) => {
    const detectability = Math.max(0, Math.min(1, tracing * 0.4 + metadata * 0.25 + alerts * 0.35));
    const explainability = Math.max(0, Math.min(1, tracing * 0.35 + metadata * 0.5 + alerts * 0.15));
    const blindSpots = Math.max(0, Math.min(1, 1 - detectability * 0.7 - explainability * 0.2 + 0.08));
    return {
      metrics: [
        { label: "detectabilidade", value: `${(detectability * 100).toFixed(0)}%` },
        { label: "explicabilidade operacional", value: `${(explainability * 100).toFixed(0)}%` },
        { label: "pontos cegos", value: `${(blindSpots * 100).toFixed(0)}%` },
        { label: "perfil", value: blindSpots > 0.5 ? "cego" : "instrumentado" },
      ],
      bars: [
        { label: "Perceber desvio", value: detectability, display: `${(detectability * 100).toFixed(0)}%` },
        { label: "Explicar o caso", value: explainability, display: `${(explainability * 100).toFixed(0)}%` },
        { label: "Zona desconhecida", value: blindSpots, display: `${(blindSpots * 100).toFixed(0)}%` },
      ],
      narrative:
        metadata < 0.35
          ? "Há alguma visibilidade, mas falta contexto para explicar por que o evento aconteceu. O time sabe que houve problema, não sabe reconstruí-lo bem."
          : alerts < 0.35
            ? "Você pode ter traces ricos, mas sem alertas úteis o time descobre tarde demais que algo saiu do eixo."
            : "A observabilidade está mais madura: há mais chance de notar desvio cedo e entender seu mecanismo com menos adivinhação.",
      footer:
        "Métricas boas avisam; traces e metadados bons ensinam o que realmente aconteceu.",
    };
  },
});

const offlineOnlineGapLab = createSliderPlayground({
  eyebrow: "Gap offline/online",
  title: "Relacione cobertura offline, drift e feedback",
  description:
    "Modelos envelhecem mais rápido quando o mundo muda e o sistema não aprende com a própria operação.",
  tone: "indigo",
  icon: <BarChart3 size={18} aria-hidden="true" />,
  initialState: {
    offlineCoverage: 0.55,
    drift: 0.45,
    feedback: 0.4,
  },
  controls: [
    { key: "offlineCoverage", label: "cobertura offline relevante", min: 0.1, max: 1, step: 0.05, formatValue: (value) => value.toFixed(2) },
    { key: "drift", label: "intensidade de drift/skew", min: 0, max: 1, step: 0.05, formatValue: (value) => value.toFixed(2) },
    { key: "feedback", label: "força do feedback loop", min: 0.1, max: 1, step: 0.05, formatValue: (value) => value.toFixed(2) },
  ],
  compute: ({ offlineCoverage, drift, feedback }) => {
    const trustGap = Math.max(0, Math.min(1, drift * 0.55 + (1 - offlineCoverage) * 0.25 + (1 - feedback) * 0.2));
    const adaptation = Math.max(0, Math.min(1, feedback * 0.55 + offlineCoverage * 0.25 + (1 - drift) * 0.2));
    const regressionRisk = Math.max(0, Math.min(1, trustGap * 0.65 + (1 - adaptation) * 0.2 + drift * 0.15));
    return {
      metrics: [
        { label: "gap de confiança", value: `${(trustGap * 100).toFixed(0)}%` },
        { label: "capacidade de adaptação", value: `${(adaptation * 100).toFixed(0)}%` },
        { label: "risco de regressão silenciosa", value: `${(regressionRisk * 100).toFixed(0)}%` },
        { label: "perfil", value: regressionRisk > 0.6 ? "instável" : "aprendente" },
      ],
      bars: [
        { label: "Distância entre laboratório e produção", value: trustGap, display: `${(trustGap * 100).toFixed(0)}%` },
        { label: "Capacidade de reagir", value: adaptation, display: `${(adaptation * 100).toFixed(0)}%` },
        { label: "Exposição a regressão", value: regressionRisk, display: `${(regressionRisk * 100).toFixed(0)}%` },
      ],
      narrative:
        drift > 0.7 && feedback < 0.4
          ? "O mundo está mudando rápido e o sistema aprende pouco com isso. É o cenário clássico para regressões silenciosas persistirem." 
          : offlineCoverage < 0.35
            ? "Sem cobertura offline minimamente representativa, produção vira o principal teste do sistema — o que é caro e arriscado."
            : "A combinação está melhor: ainda há gap entre offline e online, mas o sistema tem mecanismos mais claros para percebê-lo e responder.",
      footer:
        "Produção saudável exige que o time saiba tanto medir a distância quanto reduzir essa distância com evidência.",
    };
  },
});

const monitoringStrategies = createScenarioExplorer({
  eyebrow: "Estratégias",
  title: "Compare estratégias de avaliação contínua",
  description:
    "Times diferentes combinam observabilidade, feedback e rollout de maneiras distintas conforme risco e maturidade.",
  tone: "rose",
  icon: <ShieldAlert size={18} aria-hidden="true" />,
  scenarios: [
    {
      id: "basic-dashboards",
      label: "Dashboards básicos",
      title: "Começo útil, mas limitado",
      description: "Ajuda a ver tendências gerais, porém costuma faltar profundidade para explicar incidentes qualitativos ou drift sutil.",
      bullets: ["Baixo custo inicial.", "Boa visibilidade para latência e volume.", "Fraco para investigação qualitativa profunda."],
      metrics: [
        { label: "cobertura", value: "média/baixa" },
        { label: "custo operacional", value: "baixo" },
      ],
      bars: [
        { label: "Capacidade de detectar", value: 0.46, display: "46%" },
        { label: "Capacidade de explicar", value: 0.28, display: "28%" },
      ],
    },
    {
      id: "shadow-plus-alerts",
      label: "Shadow + alertas",
      title: "Aprender com menos risco",
      description: "Versões novas são observadas em paralelo, com comparações e alertas antes da promoção ampla.",
      bullets: ["Ótimo para mudanças arriscadas.", "Permite comparar comportamento em tráfego real.", "Exige disciplina de rollout e análise."],
      metrics: [
        { label: "cobertura", value: "alta" },
        { label: "custo operacional", value: "médio" },
      ],
      bars: [
        { label: "Capacidade de detectar", value: 0.82, display: "82%" },
        { label: "Capacidade de explicar", value: 0.68, display: "68%" },
      ],
    },
    {
      id: "feedback-heavy",
      label: "Feedback humano forte",
      title: "Qualidade semântica guiada por revisão",
      description: "Especialmente útil em GenAI e decisões complexas onde métricas automáticas não contam a história toda.",
      bullets: ["Grande valor para casos raros e qualidade qualitativa.", "Mais custo humano e necessidade de amostragem inteligente.", "Combina bem com traces e alertas automáticos."],
      metrics: [
        { label: "cobertura", value: "alta" },
        { label: "custo operacional", value: "alto" },
      ],
      bars: [
        { label: "Capacidade de detectar", value: 0.78, display: "78%" },
        { label: "Capacidade de explicar", value: 0.88, display: "88%" },
      ],
    },
  ],
});

export const interactions = {
  "observability-coverage-lab": observabilityCoverageLab,
  "offline-online-gap-lab": offlineOnlineGapLab,
  "monitoring-strategies": monitoringStrategies,
} satisfies LessonModule["interactions"];
