import { BarChart3, ShieldAlert, Sliders } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import {
  createScenarioExplorer,
  createSliderPlayground,
} from "../_shared/interactionFactories";

const precisionTradeoffLab = createSliderPlayground({
  eyebrow: "Precisão",
  title: "Teste o trade-off entre bits e calibração",
  description:
    "Ajuste a precisão de pesos e ativações, além da qualidade da calibração, para perceber como eficiência e risco andam juntos.",
  tone: "amber",
  icon: <Sliders size={18} aria-hidden="true" />,
  initialState: {
    weightBits: 8,
    activationBits: 8,
    calibration: 0.7,
  },
  controls: [
    { key: "weightBits", label: "bits dos pesos", min: 2, max: 16, step: 1 },
    { key: "activationBits", label: "bits das ativações", min: 2, max: 16, step: 1 },
    {
      key: "calibration",
      label: "qualidade da calibração",
      min: 0.1,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
  ],
  compute: ({ weightBits, activationBits, calibration }) => {
    const compression = Math.max(0, Math.min(1, 1 - (weightBits + activationBits) / 32));
    const qualityRisk = Math.max(
      0,
      Math.min(1, (8 - weightBits) * 0.06 + (8 - activationBits) * 0.08 + (1 - calibration) * 0.45),
    );
    const deploymentReadiness = Math.max(0, Math.min(1, compression * 0.55 + calibration * 0.45 - qualityRisk * 0.25));

    return {
      metrics: [
        { label: "compressão relativa", value: `${(compression * 100).toFixed(0)}%` },
        { label: "risco de regressão", value: `${(qualityRisk * 100).toFixed(0)}%` },
        { label: "prontidão operacional", value: `${(deploymentReadiness * 100).toFixed(0)}%` },
        { label: "leitura rápida", value: weightBits <= 4 ? "agressiva" : "conservadora" },
      ],
      bars: [
        { label: "Ganho de memória", value: compression, display: `${(compression * 100).toFixed(0)}%` },
        { label: "Risco de erro", value: qualityRisk, display: `${(qualityRisk * 100).toFixed(0)}%` },
        { label: "Chance de deployment estável", value: deploymentReadiness, display: `${(deploymentReadiness * 100).toFixed(0)}%` },
      ],
      narrative:
        weightBits <= 4 && calibration < 0.45
          ? "Poucos bits com calibração fraca costumam gerar uma versão atraente no papel e arriscada na prática. Você ganha footprint, mas compra incerteza justamente nas entradas mais raras."
          : activationBits < weightBits
            ? "Ativações muito mais agressivas do que pesos costumam doer mais. Elas carregam o contexto dinâmico da entrada e podem reagir mal a outliers."
            : "Aqui o equilíbrio está mais saudável: o ganho de footprint aparece sem transformar o erro numérico em loteria operacional.",
      footer:
        "A pergunta correta não é 'qual o menor número de bits?', mas 'qual o menor número de bits que preserva o comportamento útil?'.",
    };
  },
});

const ptqVsQat = createScenarioExplorer({
  eyebrow: "Estratégia",
  title: "Escolha entre PTQ, QAT e weight-only",
  description:
    "Cada caminho otimiza velocidade de implementação, risco de regressão e custo de engenharia de maneira diferente.",
  tone: "indigo",
  icon: <BarChart3 size={18} aria-hidden="true" />,
  scenarios: [
    {
      id: "ptq-rapido",
      label: "PTQ rápido",
      title: "Primeiro corte operacional",
      description:
        "Ideal para descobrir rapidamente o espaço de ganho, desde que exista benchmark representativo e critério claro de rollback.",
      bullets: [
        "Baixo custo de implementação.",
        "Bom para explorar INT8 e weight-only.",
        "Depende fortemente de calibração e suporte do runtime.",
      ],
      metrics: [
        { label: "custo de engenharia", value: "baixo" },
        { label: "risco inicial", value: "médio" },
      ],
      bars: [
        { label: "Velocidade de adoção", value: 0.88, display: "88%" },
        { label: "Robustez fora da amostra", value: 0.54, display: "54%" },
      ],
    },
    {
      id: "qat-orientado",
      label: "QAT orientado",
      title: "Quando PTQ já não segura qualidade",
      description:
        "Vale quando a meta de precisão é agressiva e existe orçamento de dados e treino para adaptar o modelo.",
      bullets: [
        "Maior complexidade de pipeline.",
        "Melhora a convivência do modelo com o ruído quantizado.",
        "Tende a fazer mais sentido em camadas sensíveis e tarefas críticas.",
      ],
      metrics: [
        { label: "custo de engenharia", value: "alto" },
        { label: "potencial de qualidade", value: "alto" },
      ],
      bars: [
        { label: "Velocidade de adoção", value: 0.42, display: "42%" },
        { label: "Robustez fora da amostra", value: 0.78, display: "78%" },
      ],
    },
    {
      id: "weight-only",
      label: "Weight-only em LLMs",
      title: "Ganho rápido na memória dos pesos",
      description:
        "Compromisso muito comum em serving de LLMs: corta pegada de pesos sem forçar toda a pilha a descer de precisão ao mesmo tempo.",
      bullets: [
        "Excelente para aumentar capacidade por GPU.",
        "Ainda exige atenção a KV cache e kernels específicos.",
        "Não dispensa teste de qualidade por domínio.",
      ],
      metrics: [
        { label: "ganho de memória", value: "alto" },
        { label: "mudança de pipeline", value: "média" },
      ],
      bars: [
        { label: "Velocidade de adoção", value: 0.74, display: "74%" },
        { label: "Robustez fora da amostra", value: 0.68, display: "68%" },
      ],
    },
  ],
});

const hardwarePathSimulator = createSliderPlayground({
  eyebrow: "Runtime",
  title: "Simule o caminho real até o hardware",
  description:
    "A quantização só funciona bem quando outliers, suporte de kernel e tamanho do lote contam a mesma história.",
  tone: "rose",
  icon: <ShieldAlert size={18} aria-hidden="true" />,
  initialState: {
    batch: 4,
    outlierPressure: 0.4,
    kernelSupport: 0.8,
  },
  controls: [
    { key: "batch", label: "tamanho do lote", min: 1, max: 16, step: 1 },
    {
      key: "outlierPressure",
      label: "pressão de outliers",
      min: 0,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
    {
      key: "kernelSupport",
      label: "maturidade do kernel no runtime",
      min: 0.1,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
  ],
  compute: ({ batch, outlierPressure, kernelSupport }) => {
    const throughputGain = Math.max(0, Math.min(1, batch / 16 * 0.45 + kernelSupport * 0.55));
    const fallbackRisk = Math.max(0, Math.min(1, (1 - kernelSupport) * 0.7 + outlierPressure * 0.3));
    const stability = Math.max(0, Math.min(1, kernelSupport * 0.65 + (1 - outlierPressure) * 0.35 - Math.max(0, batch - 10) * 0.015));

    return {
      metrics: [
        { label: "ganho de throughput", value: `${(throughputGain * 100).toFixed(0)}%` },
        { label: "risco de fallback", value: `${(fallbackRisk * 100).toFixed(0)}%` },
        { label: "estabilidade esperada", value: `${(stability * 100).toFixed(0)}%` },
        { label: "lote", value: batch >= 10 ? "agressivo" : "moderado" },
      ],
      bars: [
        { label: "Aproveitamento do runtime", value: throughputGain, display: `${(throughputGain * 100).toFixed(0)}%` },
        { label: "Chance de fallback/desquantização", value: fallbackRisk, display: `${(fallbackRisk * 100).toFixed(0)}%` },
        { label: "Previsibilidade operacional", value: stability, display: `${(stability * 100).toFixed(0)}%` },
      ],
      narrative:
        kernelSupport < 0.45
          ? "O maior inimigo aqui não é a matemática da quantização, mas o runtime. Sem kernel maduro, o sistema vive de conversões e fallback."
          : outlierPressure > 0.7
            ? "Mesmo com bom suporte de hardware, muitos outliers tornam a discretização mais delicada e pressionam a estabilidade da qualidade."
            : "Quando suporte de kernel e perfil do modelo estão alinhados, a quantização deixa de ser promessa e vira ganho observável.",
      footer:
        "Runtime ruim transforma ótima quantização em demo bonita e produção decepcionante.",
    };
  },
});

export const interactions = {
  "precision-tradeoff-lab": precisionTradeoffLab,
  "ptq-vs-qat": ptqVsQat,
  "hardware-path-simulator": hardwarePathSimulator,
} satisfies LessonModule["interactions"];
