import {
  DatabaseZap,
  GitCompareArrows,
  SlidersHorizontal,
} from "lucide-react";
import type { LessonModule } from "../../../types/content";
import {
  createScenarioExplorer,
  createSliderPlayground,
} from "../_shared/interactionFactories";

const adapterBudgetLab = createSliderPlayground({
  eyebrow: "LoRA",
  title: "Ajuste o orçamento do adapter",
  description:
    "Varie rank, cobertura de módulos e aderência do dataset para perceber como capacidade, custo e risco mudam juntos.",
  tone: "violet",
  icon: <SlidersHorizontal size={18} aria-hidden="true" />,
  initialState: {
    rank: 16,
    coverage: 0.5,
    dataFit: 0.7,
  },
  controls: [
    { key: "rank", label: "rank do adapter", min: 4, max: 128, step: 4 },
    {
      key: "coverage",
      label: "fração dos módulos alvo",
      min: 0.2,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
    {
      key: "dataFit",
      label: "aderência dos dados à tarefa real",
      min: 0.1,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
  ],
  compute: ({ rank, coverage, dataFit }) => {
    const capacity = Math.min(1, 0.18 + rank / 128 * 0.48 + coverage * 0.34);
    const trainableShare = Math.min(1, 0.02 + rank / 128 * 0.12 + coverage * 0.14);
    const overfitRisk = Math.min(
      1,
      Math.max(0, 0.16 + capacity * 0.44 - dataFit * 0.32),
    );

    return {
      metrics: [
        { label: "capacidade do adapter", value: `${(capacity * 100).toFixed(0)}%` },
        {
          label: "fração treinável relativa",
          value: `${(trainableShare * 100).toFixed(1)}%`,
        },
        { label: "risco de sobreajuste", value: `${(overfitRisk * 100).toFixed(0)}%` },
        { label: "vantagem central", value: "eficiência" },
      ],
      bars: [
        {
          label: "Capacidade de adaptação",
          value: capacity,
          display: `${(capacity * 100).toFixed(0)}%`,
        },
        {
          label: "Parâmetros extras relativos",
          value: trainableShare,
          display: `${(trainableShare * 100).toFixed(1)}%`,
        },
        {
          label: "Risco de especializar demais",
          value: overfitRisk,
          display: `${(overfitRisk * 100).toFixed(0)}%`,
        },
      ],
      narrative:
        rank < 12 && coverage < 0.4
          ? "O adapter está muito econômico. Isso pode ser excelente para custo, mas talvez insuficiente para mover o comportamento tanto quanto a tarefa exige."
          : dataFit < 0.35
            ? "Mesmo com rank alto, dados pouco aderentes desperdiçam capacidade. O modelo aprende deslocamentos que não representam bem o uso real."
            : "Aqui o LoRA opera no regime desejado: correções compactas o bastante para serem baratas, mas expressivas o bastante para capturar a adaptação necessária.",
      footer:
        "Rank maior e mais módulos alvo ampliam a capacidade, mas não compensam um dataset mal curado.",
    };
  },
});

const fullVsPeft = createScenarioExplorer({
  eyebrow: "Trade-off",
  title: "Compare três estratégias de adaptação",
  description:
    "Observe como custo, portabilidade e flexibilidade mudam conforme o método escolhido.",
  tone: "teal",
  icon: <GitCompareArrows size={18} aria-hidden="true" />,
  scenarios: [
    {
      id: "full-ft",
      label: "Full fine-tuning",
      title: "Máxima liberdade, maior custo",
      description:
        "Atualiza amplamente os pesos do modelo e pode capturar mudanças profundas, mas exige mais memória, mais tempo e maior cuidado com regressões.",
      bullets: [
        "Bom quando a adaptação precisa ser estrutural e o orçamento comporta.",
        "Tende a gerar checkpoints grandes e mais caros de comparar entre si.",
        "Pode esquecer comportamentos úteis da base se o dataset for estreito.",
      ],
      metrics: [
        { label: "custo operacional", value: "alto" },
        { label: "flexibilidade", value: "máxima" },
      ],
      bars: [
        { label: "Liberdade de adaptação", value: 0.94, display: "94%" },
        { label: "Eficiência operacional", value: 0.22, display: "22%" },
      ],
    },
    {
      id: "lora",
      label: "LoRA",
      title: "Equilíbrio forte entre custo e especialização",
      description:
        "Mantém a base congelada e aprende correções compactas. É uma escolha muito competitiva quando a tarefa pede especialização sem infra excessiva.",
      bullets: [
        "Treina poucos parâmetros relativos ao modelo completo.",
        "Facilita manter múltiplos adapters por cliente, idioma ou domínio.",
        "Pode ser insuficiente se a mudança desejada for muito profunda.",
      ],
      metrics: [
        { label: "custo operacional", value: "médio-baixo" },
        { label: "flexibilidade", value: "alta" },
      ],
      bars: [
        { label: "Liberdade de adaptação", value: 0.74, display: "74%" },
        { label: "Eficiência operacional", value: 0.82, display: "82%" },
      ],
    },
    {
      id: "qlora",
      label: "QLoRA",
      title: "Eficiência agressiva para iterar sob restrição",
      description:
        "Reduz ainda mais o uso de memória ao treinar adapters sobre base quantizada, ampliando acessibilidade computacional.",
      bullets: [
        "Ótimo para prototipação e iteração em hardware mais limitado.",
        "Exige atenção ao regime de quantização e estabilidade do pipeline.",
        "Eficiência extra pode trazer sensibilidades que pedem benchmark cuidadoso.",
      ],
      metrics: [
        { label: "custo operacional", value: "baixo" },
        { label: "flexibilidade", value: "boa" },
      ],
      bars: [
        { label: "Liberdade de adaptação", value: 0.68, display: "68%" },
        { label: "Eficiência operacional", value: 0.91, display: "91%" },
      ],
    },
  ],
});

const dataRegimeLab = createSliderPlayground({
  eyebrow: "Pipeline",
  title: "Teste a robustez do seu fine-tuning",
  description:
    "Combine gap de domínio, qualidade dos rótulos e disciplina de avaliação para ver quando um treino aparentemente bom pode enganar.",
  tone: "amber",
  icon: <DatabaseZap size={18} aria-hidden="true" />,
  initialState: {
    domainGap: 0.5,
    labelQuality: 0.8,
    evalDiscipline: 0.7,
  },
  controls: [
    {
      key: "domainGap",
      label: "distância entre base e domínio alvo",
      min: 0.1,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
    {
      key: "labelQuality",
      label: "qualidade das respostas de treino",
      min: 0.1,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
    {
      key: "evalDiscipline",
      label: "qualidade da avaliação fora do treino",
      min: 0.1,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
  ],
  compute: ({ domainGap, labelQuality, evalDiscipline }) => {
    const expectedGain = Math.min(1, 0.18 + domainGap * 0.28 + labelQuality * 0.46);
    const regressionRisk = Math.min(
      1,
      Math.max(0, 0.18 + domainGap * 0.26 + (1 - evalDiscipline) * 0.34),
    );
    const confidence = Math.min(1, 0.12 + evalDiscipline * 0.58 + labelQuality * 0.22);

    return {
      metrics: [
        { label: "ganho esperado", value: `${(expectedGain * 100).toFixed(0)}%` },
        { label: "risco de regressão", value: `${(regressionRisk * 100).toFixed(0)}%` },
        { label: "confiança no resultado", value: `${(confidence * 100).toFixed(0)}%` },
        { label: "fator decisivo", value: "dados + eval" },
      ],
      bars: [
        { label: "Espaço para melhorar", value: expectedGain, display: `${(expectedGain * 100).toFixed(0)}%` },
        { label: "Chance de engano experimental", value: regressionRisk, display: `${(regressionRisk * 100).toFixed(0)}%` },
        { label: "Qualidade da evidência", value: confidence, display: `${(confidence * 100).toFixed(0)}%` },
      ],
      narrative:
        evalDiscipline < 0.4
          ? "Sem avaliação disciplinada, você pode confundir overfitting com progresso. O treino parece ótimo, mas o produto real piora."
          : labelQuality < 0.45
            ? "As respostas de treino estão ensinando um comportamento inconsistente. O modelo se adapta, mas se adapta ao alvo errado."
            : "Quando os dados representam bem a tarefa e a avaliação é séria, LoRA ou QLoRA podem entregar ganhos sólidos com ótimo custo-benefício.",
      footer:
        "A decisão certa raramente nasce só do método; ela nasce da combinação entre objetivo, dados e validação.",
    };
  },
});

export const interactions = {
  "adapter-budget-lab": adapterBudgetLab,
  "full-vs-peft": fullVsPeft,
  "data-regime-lab": dataRegimeLab,
} satisfies LessonModule["interactions"];
