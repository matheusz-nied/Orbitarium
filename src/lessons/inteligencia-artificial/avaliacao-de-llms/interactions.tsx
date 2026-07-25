import { Gauge, Microscope, Scale } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import {
  createScenarioExplorer,
  createSliderPlayground,
} from "../_shared/interactionFactories";

const evalDesignLab = createSliderPlayground({
  eyebrow: "Desenho de eval",
  title: "Ajuste objetivo, dataset e slices",
  description:
    "Veja como a força do sinal de avaliação depende da nitidez do objetivo, da qualidade do dataset e da cobertura de slices importantes.",
  tone: "rose",
  icon: <Microscope size={18} aria-hidden="true" />,
  initialState: {
    objective: 0.7,
    datasetQuality: 0.55,
    sliceCoverage: 0.4,
  },
  controls: [
    {
      key: "objective",
      label: "clareza do objetivo",
      min: 0.05,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
    {
      key: "datasetQuality",
      label: "representatividade do dataset",
      min: 0.05,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
    {
      key: "sliceCoverage",
      label: "cobertura de slices importantes",
      min: 0,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
  ],
  compute: ({ objective, datasetQuality, sliceCoverage }) => {
    const signal = Math.min(1, objective * 0.4 + datasetQuality * 0.35 + sliceCoverage * 0.25);
    const blindSpots = Math.max(0, 1 - (datasetQuality * 0.45 + sliceCoverage * 0.4 + objective * 0.15));
    const comparability = Math.min(1, objective * 0.5 + datasetQuality * 0.3 + sliceCoverage * 0.2);

    return {
      metrics: [
        { label: "força do sinal", value: `${(signal * 100).toFixed(0)}%` },
        { label: "pontos cegos", value: `${(blindSpots * 100).toFixed(0)}%` },
        { label: "comparabilidade", value: `${(comparability * 100).toFixed(0)}%` },
        { label: "regime", value: signal < 0.4 ? "frágil" : blindSpots > 0.5 ? "cego" : "saudável" },
      ],
      bars: [
        { label: "Objetivo", value: objective, display: `${(objective * 100).toFixed(0)}%` },
        { label: "Dataset", value: datasetQuality, display: `${(datasetQuality * 100).toFixed(0)}%` },
        { label: "Slices", value: sliceCoverage, display: `${(sliceCoverage * 100).toFixed(0)}%` },
      ],
      narrative:
        objective < 0.3
          ? "Sem objetivo bem definido, qualquer métrica vira proxy frouxo. Você mede coisas, mas não sabe se mediu o que realmente importava."
          : sliceCoverage < 0.3
            ? "A média pode parecer boa, porém o eval continua míope. Falhas críticas costumam morar justamente nos slices que não foram representados."
            : "Evals fortes nascem quando objetivo, dados e cortes analíticos trabalham juntos. A avaliação para de ser ritual e vira instrumento de decisão.",
      footer:
        "Dataset grande sem cobertura relevante pode ser pior do que dataset menor, porém melhor desenhado.",
    };
  },
});

const judgeModes = createScenarioExplorer({
  eyebrow: "Juízes",
  title: "Compare modos de avaliação",
  description:
    "Nem toda forma de julgamento cabe em toda tarefa. Cada modo tem custo, escala e viés diferentes.",
  tone: "violet",
  icon: <Scale size={18} aria-hidden="true" />,
  scenarios: [
    {
      id: "automatic-check",
      label: "Check automático",
      title: "Escala bem quando o critério é objetivo",
      description:
        "Excelente para schema, classificação, presença de campos, citações obrigatórias e outras propriedades verificáveis automaticamente.",
      bullets: [
        "Barato e reprodutível.",
        "Ótimo para regressão contínua.",
        "Fraco para utilidade aberta e nuance qualitativa.",
      ],
      metrics: [
        { label: "escala", value: "muito alta" },
        { label: "nuance", value: "baixa" },
      ],
      bars: [
        { label: "Custo por caso", value: 0.12, display: "12%" },
        { label: "Consistência", value: 0.92, display: "92%" },
      ],
    },
    {
      id: "human-review",
      label: "Revisão humana",
      title: "Mais cara, mas ainda é referência forte em nuance e risco",
      description:
        "Avaliação humana continua valiosa quando o critério é complexo, contextual ou de alto impacto.",
      bullets: [
        "Captura sutilezas difíceis de automatizar.",
        "Pode ser inconsistente se a rubrica for fraca.",
        "Escala pior e custa mais tempo.",
      ],
      metrics: [
        { label: "escala", value: "baixa" },
        { label: "nuance", value: "muito alta" },
      ],
      bars: [
        { label: "Custo por caso", value: 0.86, display: "86%" },
        { label: "Cobertura qualitativa", value: 0.9, display: "90%" },
      ],
    },
    {
      id: "llm-judge",
      label: "LLM-as-a-judge",
      title: "Escala comparações abertas com cautela metodológica",
      description:
        "Juiz-modelo é intermediário poderoso entre automação simples e revisão humana total.",
      bullets: [
        "Escala melhor que humano puro.",
        "Captura alguma nuance textual e comparativa.",
        "Exige atenção a viés de posição, verbosidade e alinhamento do avaliador.",
      ],
      metrics: [
        { label: "escala", value: "alta" },
        { label: "nuance", value: "média-alta" },
      ],
      bars: [
        { label: "Custo por caso", value: 0.38, display: "38%" },
        { label: "Dependência de calibração", value: 0.74, display: "74%" },
      ],
    },
  ],
});

const evaluationScenarios = createScenarioExplorer({
  eyebrow: "Operação",
  title: "Compare maturidades de avaliação",
  description:
    "O que muda não é só o score; muda a capacidade da equipe de aprender e evoluir sem quebrar o produto.",
  tone: "emerald",
  icon: <Gauge size={18} aria-hidden="true" />,
  scenarios: [
    {
      id: "ad-hoc",
      label: "Ad hoc",
      title: "Testes impressionistas e pouca memória do sistema",
      description:
        "A equipe faz verificações casuais, sem dataset estável nem baseline formal.",
      bullets: [
        "Rápido no começo.",
        "Alto risco de viés de confirmação.",
        "Regressões passam despercebidas com facilidade.",
      ],
      metrics: [
        { label: "aprendizado acumulado", value: "baixo" },
        { label: "segurança de mudança", value: "baixa" },
      ],
      bars: [
        { label: "Velocidade inicial", value: 0.88, display: "88%" },
        { label: "Confiabilidade comparativa", value: 0.22, display: "22%" },
      ],
    },
    {
      id: "baseline-driven",
      label: "Com baseline",
      title: "Comparações mais honestas entre versões",
      description:
        "Existe conjunto de casos relativamente estável e a equipe mede antes e depois das mudanças importantes.",
      bullets: [
        "Melhor para evoluir prompts, modelos e retrievers.",
        "Ainda pode falhar se o dataset não representar o mundo real.",
        "Cria memória operacional útil do sistema.",
      ],
      metrics: [
        { label: "aprendizado acumulado", value: "bom" },
        { label: "segurança de mudança", value: "média-alta" },
      ],
      bars: [
        { label: "Velocidade inicial", value: 0.62, display: "62%" },
        { label: "Confiabilidade comparativa", value: 0.72, display: "72%" },
      ],
    },
    {
      id: "continuous-eval",
      label: "Contínuo",
      title: "Produto guiado por observação e regressão controlada",
      description:
        "Mudanças relevantes acionam evals recorrentes, análise por slice e revisão de modos de falha importantes.",
      bullets: [
        "Mais maduro para produção real.",
        "Exige investimento em dados, observabilidade e manutenção.",
        "Reduz improviso decisório em mudanças de sistema.",
      ],
      metrics: [
        { label: "aprendizado acumulado", value: "muito alto" },
        { label: "segurança de mudança", value: "alta" },
      ],
      bars: [
        { label: "Velocidade inicial", value: 0.42, display: "42%" },
        { label: "Confiabilidade comparativa", value: 0.88, display: "88%" },
      ],
    },
  ],
});

export const interactions = {
  "eval-design-lab": evalDesignLab,
  "judge-modes": judgeModes,
  "evaluation-scenarios": evaluationScenarios,
} satisfies LessonModule["interactions"];
