import { AlertTriangle, Activity, Telescope } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import {
  createScenarioExplorer,
  createSliderPlayground,
} from "../_shared/interactionFactories";

const traceCoverageLab = createSliderPlayground({
  eyebrow: "Tracing",
  title: "Ajuste a cobertura da instrumentação",
  description:
    "Varie cobertura de spans, amostragem e qualidade das labels para ver como depuração, custo e pontos cegos se comportam.",
  tone: "indigo",
  icon: <Activity size={18} aria-hidden="true" />,
  initialState: {
    spanCoverage: 0.7,
    samplingRate: 0.5,
    labelQuality: 0.75,
  },
  controls: [
    {
      key: "spanCoverage",
      label: "cobertura de spans instrumentados",
      min: 0.1,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
    {
      key: "samplingRate",
      label: "taxa de amostragem",
      min: 0.1,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
    {
      key: "labelQuality",
      label: "qualidade semântica das labels",
      min: 0.1,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
  ],
  compute: ({ spanCoverage, samplingRate, labelQuality }) => {
    const debuggability = Math.min(
      1,
      0.08 + spanCoverage * 0.42 + samplingRate * 0.18 + labelQuality * 0.24,
    );
    const telemetryCost = Math.min(1, 0.08 + spanCoverage * 0.34 + samplingRate * 0.36);
    const blindSpots = Math.min(
      1,
      Math.max(0, 0.12 + (1 - spanCoverage) * 0.42 + (1 - labelQuality) * 0.2),
    );

    return {
      metrics: [
        { label: "capacidade de depurar", value: `${(debuggability * 100).toFixed(0)}%` },
        { label: "custo de telemetria", value: `${(telemetryCost * 100).toFixed(0)}%` },
        { label: "pontos cegos", value: `${(blindSpots * 100).toFixed(0)}%` },
        { label: "princípio central", value: "visibilidade útil" },
      ],
      bars: [
        { label: "Clareza sobre o caminho do run", value: debuggability, display: `${(debuggability * 100).toFixed(0)}%` },
        { label: "Overhead observacional", value: telemetryCost, display: `${(telemetryCost * 100).toFixed(0)}%` },
        { label: "Partes invisíveis do pipeline", value: blindSpots, display: `${(blindSpots * 100).toFixed(0)}%` },
      ],
      narrative:
        spanCoverage < 0.35
          ? "Você instrumentou pouco demais. Quando algo der errado, parte importante da narrativa do request simplesmente não estará visível."
          : labelQuality < 0.4
            ? "Há dados, mas a semântica está ruim. Isso gera telemetria difícil de interpretar e baixa utilidade para causa raiz."
            : "Neste regime, os traces contam uma história suficientemente completa do run sem tornar a coleta impraticável.",
      footer:
        "Mais telemetria não basta; ela precisa ser legível, correlacionável e conectada às perguntas que o time realmente faz.",
    };
  },
});

const evalMixScenarios = createScenarioExplorer({
  eyebrow: "Qualidade",
  title: "Compare estratégias de observação de qualidade",
  description:
    "Veja o que cada combinação de sinais consegue ou não consegue revelar.",
  tone: "teal",
  icon: <Telescope size={18} aria-hidden="true" />,
  scenarios: [
    {
      id: "logs-only",
      label: "Logs e métricas técnicas",
      title: "Saúde operacional básica",
      description:
        "Você enxerga latência, custo e falha técnica, mas pouco da qualidade real da resposta entregue.",
      bullets: [
        "Bom para uptime, throughput e erros evidentes.",
        "Fraco para groundedness, utilidade e aderência a política.",
        "Incidentes de qualidade podem passar despercebidos por muito tempo.",
      ],
      metrics: [
        { label: "visão técnica", value: "boa" },
        { label: "visão qualitativa", value: "fraca" },
      ],
      bars: [
        { label: "Detecção de falha operacional", value: 0.78, display: "78%" },
        { label: "Detecção de regressão qualitativa", value: 0.22, display: "22%" },
      ],
    },
    {
      id: "traces-offline-evals",
      label: "Traces + evals offline",
      title: "Comparação disciplinada e depuração melhor",
      description:
        "Você ganha rastreabilidade por run e benchmark repetível para releases, mas ainda não vê toda a distribuição viva de produção.",
      bullets: [
        "Excelente para comparar variantes antes do deploy.",
        "Ajuda muito em análise de causa raiz de exemplos reproduzíveis.",
        "Ainda depende de o dataset cobrir bem o mundo real.",
      ],
      metrics: [
        { label: "visão técnica", value: "alta" },
        { label: "visão qualitativa", value: "boa" },
      ],
      bars: [
        { label: "Detecção de falha operacional", value: 0.86, display: "86%" },
        { label: "Detecção de regressão qualitativa", value: 0.68, display: "68%" },
      ],
    },
    {
      id: "closed-loop",
      label: "Traces + evals + produção",
      title: "Ciclo quase completo de aprendizado",
      description:
        "Une telemetria técnica, avaliação controlada e feedback vivo de produção, alimentando novos datasets e novos gates.",
      bullets: [
        "Melhor postura para sistemas críticos ou de grande escala.",
        "Exige mais disciplina de governança e engenharia de dados.",
        "Reduz o risco de laboratório bonito e produção decepcionante.",
      ],
      metrics: [
        { label: "visão técnica", value: "alta" },
        { label: "visão qualitativa", value: "alta" },
      ],
      bars: [
        { label: "Detecção de falha operacional", value: 0.9, display: "90%" },
        { label: "Detecção de regressão qualitativa", value: 0.88, display: "88%" },
      ],
    },
  ],
});

const alertingLab = createSliderPlayground({
  eyebrow: "Ação",
  title: "Calibre alertas e gates de release",
  description:
    "Ajuste severidade dos limiares, velocidade de release e completude do feedback para entender o equilíbrio entre agilidade e estabilidade.",
  tone: "rose",
  icon: <AlertTriangle size={18} aria-hidden="true" />,
  initialState: {
    thresholdStrictness: 0.65,
    releasePace: 0.55,
    feedbackLoop: 0.7,
  },
  controls: [
    {
      key: "thresholdStrictness",
      label: "rigidez dos limiares",
      min: 0.1,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
    {
      key: "releasePace",
      label: "ritmo de releases",
      min: 0.1,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
    {
      key: "feedbackLoop",
      label: "completude do ciclo de feedback",
      min: 0.1,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
  ],
  compute: ({ thresholdStrictness, releasePace, feedbackLoop }) => {
    const incidentRate = Math.min(
      1,
      Math.max(0, 0.14 + releasePace * 0.34 - thresholdStrictness * 0.16 - feedbackLoop * 0.2),
    );
    const falsePositives = Math.min(1, 0.08 + thresholdStrictness * 0.34);
    const learningSpeed = Math.min(1, 0.1 + releasePace * 0.28 + feedbackLoop * 0.42);

    return {
      metrics: [
        { label: "taxa de incidentes", value: `${(incidentRate * 100).toFixed(0)}%` },
        { label: "falsos positivos", value: `${(falsePositives * 100).toFixed(0)}%` },
        { label: "velocidade de aprendizado", value: `${(learningSpeed * 100).toFixed(0)}%` },
        { label: "equilíbrio", value: "agilidade vs. ruído" },
      ],
      bars: [
        { label: "Chance de algo escapar", value: incidentRate, display: `${(incidentRate * 100).toFixed(0)}%` },
        { label: "Fadiga de alerta", value: falsePositives, display: `${(falsePositives * 100).toFixed(0)}%` },
        { label: "Capacidade de aprender rápido", value: learningSpeed, display: `${(learningSpeed * 100).toFixed(0)}%` },
      ],
      narrative:
        releasePace > 0.8 && feedbackLoop < 0.4
          ? "Seu time está mudando rápido demais sem aprender direito com o que entrou no ar. Esse regime costuma gerar regressões recorrentes."
          : thresholdStrictness > 0.85
            ? "Os gates estão duros e reduzem risco, mas provavelmente aumentam ruído e lentidão. Pode valer em cenários críticos, mas nem sempre em todo fluxo."
            : "Aqui há um compromisso razoável entre velocidade de iteração, proteção contra regressões e aprendizado acumulado a partir do uso real.",
      footer:
        "Sinal bom é o que ajuda a decidir melhor, não o que apenas multiplica notificações.",
    };
  },
});

export const interactions = {
  "trace-coverage-lab": traceCoverageLab,
  "eval-mix-scenarios": evalMixScenarios,
  "alerting-lab": alertingLab,
} satisfies LessonModule["interactions"];
