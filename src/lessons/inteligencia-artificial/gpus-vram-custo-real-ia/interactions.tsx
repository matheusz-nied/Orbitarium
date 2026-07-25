import { BarChart3, ShieldAlert, Sliders } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import {
  createScenarioExplorer,
  createSliderPlayground,
} from "../_shared/interactionFactories";

const vramBudgetLab = createSliderPlayground({
  eyebrow: "VRAM",
  title: "Monte um orçamento relativo de memória",
  description:
    "Ajuste tamanho do modelo, contexto e batch para ver quais componentes pressionam a GPU em primeiro lugar.",
  tone: "rose",
  icon: <Sliders size={18} aria-hidden="true" />,
  initialState: {
    modelScale: 0.5,
    contextLoad: 0.4,
    batch: 4,
  },
  controls: [
    {
      key: "modelScale",
      label: "escala relativa do modelo",
      min: 0.1,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
    {
      key: "contextLoad",
      label: "carga relativa de contexto/KV cache",
      min: 0.1,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
    { key: "batch", label: "batch", min: 1, max: 16, step: 1 },
  ],
  compute: ({ modelScale, contextLoad, batch }) => {
    const weightShare = Math.max(0, Math.min(1, modelScale * 0.7));
    const runtimeShare = Math.max(0, Math.min(1, contextLoad * 0.55 + batch / 16 * 0.45));
    const memoryPressure = Math.max(0, Math.min(1, weightShare * 0.45 + runtimeShare * 0.55));

    return {
      metrics: [
        { label: "pressão dos pesos", value: `${(weightShare * 100).toFixed(0)}%` },
        { label: "pressão dinâmica", value: `${(runtimeShare * 100).toFixed(0)}%` },
        { label: "pressão total", value: `${(memoryPressure * 100).toFixed(0)}%` },
        { label: "leitura", value: memoryPressure > 0.75 ? "apertado" : "viável" },
      ],
      bars: [
        { label: "Pesos do modelo", value: weightShare, display: `${(weightShare * 100).toFixed(0)}%` },
        { label: "KV cache + batch + runtime", value: runtimeShare, display: `${(runtimeShare * 100).toFixed(0)}%` },
        { label: "Orçamento consumido", value: memoryPressure, display: `${(memoryPressure * 100).toFixed(0)}%` },
      ],
      narrative:
        contextLoad > 0.75
          ? "O contexto está puxando forte o orçamento. Mesmo que os pesos caibam, o KV cache pode virar o verdadeiro vilão da VRAM."
          : batch >= 12 && modelScale > 0.6
            ? "Modelo relativamente grande com batch alto pressiona peso e memória dinâmica ao mesmo tempo. Sem headroom, a operação fica frágil."
            : "O orçamento está mais balanceado. Isso facilita decidir se vale atacar pesos, contexto, batch ou política de fila primeiro.",
      footer:
        "Servir um checkpoint que cabe em repouso não garante que o workload real cabe durante a execução.",
    };
  },
});

const throughputVsCostLab = createSliderPlayground({
  eyebrow: "Economia",
  title: "Relacione utilização, lote e ociosidade",
  description:
    "O custo útil melhora quando a GPU trabalha bem, não apenas quando o preço por hora parece baixo.",
  tone: "teal",
  icon: <BarChart3 size={18} aria-hidden="true" />,
  initialState: {
    utilization: 0.55,
    batching: 0.5,
    idleTime: 0.3,
  },
  controls: [
    {
      key: "utilization",
      label: "utilização média da GPU",
      min: 0.1,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
    {
      key: "batching",
      label: "eficiência da política de batching",
      min: 0.1,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
    {
      key: "idleTime",
      label: "ociosidade relativa",
      min: 0,
      max: 0.9,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
  ],
  compute: ({ utilization, batching, idleTime }) => {
    const productivity = Math.max(0, Math.min(1, utilization * 0.6 + batching * 0.4));
    const waste = Math.max(0, Math.min(1, idleTime * 0.75 + Math.max(0, 0.45 - utilization) * 0.35));
    const costEfficiency = Math.max(0, Math.min(1, productivity * 0.65 + (1 - waste) * 0.35));

    return {
      metrics: [
        { label: "produtividade útil", value: `${(productivity * 100).toFixed(0)}%` },
        { label: "desperdício estimado", value: `${(waste * 100).toFixed(0)}%` },
        { label: "eficiência econômica", value: `${(costEfficiency * 100).toFixed(0)}%` },
        { label: "perfil", value: waste > 0.5 ? "ocioso" : "aproveitado" },
      ],
      bars: [
        { label: "Trabalho útil", value: productivity, display: `${(productivity * 100).toFixed(0)}%` },
        { label: "Ociosidade/desperdício", value: waste, display: `${(waste * 100).toFixed(0)}%` },
        { label: "Custo por trabalho útil", value: costEfficiency, display: `${(costEfficiency * 100).toFixed(0)}%` },
      ],
      narrative:
        idleTime > 0.55
          ? "A GPU parece disponível, mas a conta útil fica ruim. Muita ociosidade transforma qualquer preço em custo inflado por resposta."
          : utilization > 0.8 && batching > 0.7
            ? "Aqui o hardware está rendendo bem. O próximo cuidado passa a ser não comprar eficiência econômica ao custo de latência inaceitável."
            : "O cenário é intermediário: há algum aproveitamento, mas ainda sobra espaço para consolidar tráfego ou melhorar agendamento.",
      footer:
        "Custo bom é custo por resultado, não custo por equipamento parado esperando uso.",
    };
  },
});

const deploymentStrategyScenarios = createScenarioExplorer({
  eyebrow: "Topologia",
  title: "Compare estratégias de deployment",
  description:
    "A mesma família de GPUs pode fazer sentido diferente dependendo do tráfego, da tolerância a risco e do isolamento desejado.",
  tone: "indigo",
  icon: <ShieldAlert size={18} aria-hidden="true" />,
  scenarios: [
    {
      id: "single-large-gpu",
      label: "Uma GPU maior",
      title: "Simplicidade com menos fragmentação",
      description:
        "Útil quando contexto, cache e lotes precisam de memória ampla e o tráfego é relativamente previsível.",
      bullets: [
        "Menos overhead de orquestração.",
        "Mais espaço para cargas grandes e contextos longos.",
        "Concentra risco e pode gerar ociosidade em horários vazios.",
      ],
      metrics: [
        { label: "isolamento", value: "baixo" },
        { label: "simplicidade", value: "alta" },
      ],
      bars: [
        { label: "Flexibilidade", value: 0.42, display: "42%" },
        { label: "Capacidade concentrada", value: 0.86, display: "86%" },
      ],
    },
    {
      id: "many-smaller-gpus",
      label: "Várias menores",
      title: "Mais elasticidade e mais coordenação",
      description:
        "Pode melhorar isolamento e escalonamento, mas aumenta coordenação e custo fixo agregado.",
      bullets: [
        "Ajuda a separar workloads e filas distintas.",
        "Exige melhor roteamento e observabilidade.",
        "Pode ficar mais caro se muita capacidade ficar ociosa.",
      ],
      metrics: [
        { label: "isolamento", value: "alto" },
        { label: "simplicidade", value: "média/baixa" },
      ],
      bars: [
        { label: "Flexibilidade", value: 0.78, display: "78%" },
        { label: "Capacidade concentrada", value: 0.48, display: "48%" },
      ],
    },
    {
      id: "partitioned-gpu",
      label: "Partições / MIG",
      title: "Isolamento fino na mesma placa",
      description:
        "Bom para multi-tenant e cargas previsíveis quando o hardware suporta particionamento com segurança operacional.",
      bullets: [
        "Reduz contaminação entre workloads.",
        "Pode melhorar utilização em serviços menores.",
        "Limita o tamanho máximo de cada fatia disponível.",
      ],
      metrics: [
        { label: "isolamento", value: "médio/alto" },
        { label: "simplicidade", value: "média" },
      ],
      bars: [
        { label: "Flexibilidade", value: 0.7, display: "70%" },
        { label: "Capacidade concentrada", value: 0.58, display: "58%" },
      ],
    },
  ],
});

export const interactions = {
  "vram-budget-lab": vramBudgetLab,
  "throughput-vs-cost-lab": throughputVsCostLab,
  "deployment-strategy-scenarios": deploymentStrategyScenarios,
} satisfies LessonModule["interactions"];
