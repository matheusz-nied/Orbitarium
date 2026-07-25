import { BarChart3, ShieldAlert, Sliders } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import {
  createScenarioExplorer,
  createSliderPlayground,
} from "../_shared/interactionFactories";

const queueBatchingLab = createSliderPlayground({
  eyebrow: "Fila e lote",
  title: "Ajuste janela de batching e taxa de chegada",
  description:
    "Veja como aumentar o lote melhora utilização, mas também pode empurrar o sistema para latências piores.",
  tone: "teal",
  icon: <Sliders size={18} aria-hidden="true" />,
  initialState: {
    arrivalRate: 0.6,
    batchWindow: 0.2,
    targetBatch: 8,
  },
  controls: [
    {
      key: "arrivalRate",
      label: "taxa relativa de chegada",
      min: 0.1,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
    {
      key: "batchWindow",
      label: "janela de espera para agrupar",
      min: 0,
      max: 0.5,
      step: 0.05,
      formatValue: (value) => `${(value * 1000).toFixed(0)} ms`,
    },
    { key: "targetBatch", label: "tamanho do lote-alvo", min: 1, max: 16, step: 1 },
  ],
  compute: ({ arrivalRate, batchWindow, targetBatch }) => {
    const utilization = Math.max(0, Math.min(1, arrivalRate * 0.45 + targetBatch / 16 * 0.55));
    const queuePressure = Math.max(0, Math.min(1, batchWindow * 1.1 + targetBatch / 16 * 0.25 + arrivalRate * 0.25));
    const sloFit = Math.max(0, Math.min(1, utilization * 0.55 + (1 - queuePressure) * 0.45));

    return {
      metrics: [
        { label: "utilização estimada", value: `${(utilization * 100).toFixed(0)}%` },
        { label: "pressão de fila", value: `${(queuePressure * 100).toFixed(0)}%` },
        { label: "aderência ao SLO", value: `${(sloFit * 100).toFixed(0)}%` },
        { label: "perfil", value: targetBatch >= 12 ? "agressivo" : "moderado" },
      ],
      bars: [
        { label: "Aproveitamento do hardware", value: utilization, display: `${(utilization * 100).toFixed(0)}%` },
        { label: "Fila acumulada", value: queuePressure, display: `${(queuePressure * 100).toFixed(0)}%` },
        { label: "Compatibilidade com experiência", value: sloFit, display: `${(sloFit * 100).toFixed(0)}%` },
      ],
      narrative:
        batchWindow > 0.35
          ? "A janela está segurando requisições por tempo demais. O lote melhora, mas a experiência começa a pagar a conta em fila."
          : arrivalRate < 0.3 && targetBatch > 10
            ? "Com pouco tráfego, perseguir lote grande vira ilusão: você espera bastante e quase nunca fecha o lote ideal."
            : "Aqui há um compromisso razoável entre eficiência e espera. O segredo é garantir que esse equilíbrio continue válido quando o tráfego mudar.",
      footer:
        "Dynamic batching só funciona bem quando a política de espera cabe dentro do orçamento de latência.",
    };
  },
});

const prefillDecodeLab = createSliderPlayground({
  eyebrow: "LLM phases",
  title: "Compare pressão de prefill e decode",
  description:
    "Ajuste tamanho do prompt, saída esperada e concorrência para entender onde o gargalo muda.",
  tone: "indigo",
  icon: <BarChart3 size={18} aria-hidden="true" />,
  initialState: {
    promptSize: 0.5,
    outputSize: 0.4,
    concurrency: 0.5,
  },
  controls: [
    {
      key: "promptSize",
      label: "tamanho relativo do prompt",
      min: 0.1,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
    {
      key: "outputSize",
      label: "tamanho relativo da saída",
      min: 0.1,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
    {
      key: "concurrency",
      label: "concorrência",
      min: 0.1,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
  ],
  compute: ({ promptSize, outputSize, concurrency }) => {
    const prefillPressure = Math.max(0, Math.min(1, promptSize * 0.7 + concurrency * 0.3));
    const decodePressure = Math.max(0, Math.min(1, outputSize * 0.6 + concurrency * 0.4));
    const smoothness = Math.max(0, Math.min(1, 1 - Math.abs(prefillPressure - decodePressure) * 0.55 - concurrency * 0.15 + 0.35));

    return {
      metrics: [
        { label: "pressão no prefill", value: `${(prefillPressure * 100).toFixed(0)}%` },
        { label: "pressão no decode", value: `${(decodePressure * 100).toFixed(0)}%` },
        { label: "fluidez esperada", value: `${(smoothness * 100).toFixed(0)}%` },
        { label: "gargalo", value: prefillPressure > decodePressure ? "prefill" : "decode" },
      ],
      bars: [
        { label: "Carga do prefill", value: prefillPressure, display: `${(prefillPressure * 100).toFixed(0)}%` },
        { label: "Carga do decode", value: decodePressure, display: `${(decodePressure * 100).toFixed(0)}%` },
        { label: "Regularidade da resposta", value: smoothness, display: `${(smoothness * 100).toFixed(0)}%` },
      ],
      narrative:
        promptSize > 0.75 && outputSize < 0.35
          ? "Prompts grandes com respostas curtas costumam doer mais no prefill. A primeira resposta demora, mas o decode termina cedo."
          : outputSize > 0.75 && concurrency > 0.6
            ? "Respostas longas sob concorrência pressionam o decode e pioram a regularidade do streaming."
            : "Quando prefill e decode ficam equilibrados, o tuning do serviço tende a ser mais previsível e menos sujeito a caudas dramáticas.",
      footer:
        "Separar first-token latency de tempo total ajuda a descobrir se o problema mora no prefill, no decode ou no scheduler.",
    };
  },
});

const servingStrategyScenarios = createScenarioExplorer({
  eyebrow: "Arquitetura",
  title: "Escolha a estratégia de serving",
  description:
    "Produtos diferentes pedem políticas diferentes de lote, fila e prioridade.",
  tone: "rose",
  icon: <ShieldAlert size={18} aria-hidden="true" />,
  scenarios: [
    {
      id: "interactive-chat",
      label: "Chat em streaming",
      title: "Tempo até o primeiro token é rei",
      description:
        "Aqui a sensação de resposta rápida e a regularidade do decode importam mais do que throughput máximo teórico.",
      bullets: [
        "Batching moderado ou contínuo costuma fazer mais sentido.",
        "p95 de first-token latency merece atenção máxima.",
        "Filas longas destroem a percepção de qualidade.",
      ],
      metrics: [
        { label: "prioridade", value: "latência" },
        { label: "lote", value: "moderado" },
      ],
      bars: [
        { label: "Foco em experiência", value: 0.9, display: "90%" },
        { label: "Foco em volume bruto", value: 0.45, display: "45%" },
      ],
    },
    {
      id: "async-pipeline",
      label: "Pipeline assíncrono",
      title: "Throughput vira objetivo principal",
      description:
        "Sem usuário esperando em tempo real, o sistema pode absorver filas maiores para ganhar eficiência agregada.",
      bullets: [
        "Janelas de batching podem ser mais agressivas.",
        "Capacidade por custo tende a dominar a escolha.",
        "Percentis altos ainda importam, mas menos para UX imediata.",
      ],
      metrics: [
        { label: "prioridade", value: "throughput" },
        { label: "lote", value: "alto" },
      ],
      bars: [
        { label: "Foco em experiência", value: 0.38, display: "38%" },
        { label: "Foco em volume bruto", value: 0.88, display: "88%" },
      ],
    },
    {
      id: "mixed-traffic",
      label: "Tráfego misto",
      title: "Prioridades e classes de serviço ajudam",
      description:
        "Quando sessões curtas e longas coexistem, separar filas ou classes reduz contaminação entre workloads.",
      bullets: [
        "Pode valer usar roteamento por perfil de prompt.",
        "Continuous batching ajuda a amortecer variabilidade.",
        "Observabilidade por segmento é essencial.",
      ],
      metrics: [
        { label: "prioridade", value: "balanceada" },
        { label: "lote", value: "adaptativo" },
      ],
      bars: [
        { label: "Foco em experiência", value: 0.68, display: "68%" },
        { label: "Foco em volume bruto", value: 0.7, display: "70%" },
      ],
    },
  ],
});

export const interactions = {
  "queue-batching-lab": queueBatchingLab,
  "prefill-decode-lab": prefillDecodeLab,
  "serving-strategy-scenarios": servingStrategyScenarios,
} satisfies LessonModule["interactions"];
