import { Dices, Flame, ListFilter } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import {
  createScenarioExplorer,
  createSliderPlayground,
} from "../_shared/interactionFactories";

const temperatureLab = createSliderPlayground({
  eyebrow: "Temperatura",
  title: "Ajuste a concentração da distribuição",
  description:
    "Mude a temperatura e a confiança inicial do modelo para ver a troca entre previsibilidade e diversidade.",
  tone: "rose",
  icon: <Flame size={18} aria-hidden="true" />,
  initialState: {
    temperature: 0.8,
    confidence: 0.7,
    tail: 0.3,
  },
  controls: [
    {
      key: "temperature",
      label: "temperatura",
      min: 0.1,
      max: 2,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
    {
      key: "confidence",
      label: "confiança da cabeça da distribuição",
      min: 0.2,
      max: 0.95,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
    {
      key: "tail",
      label: "massa da cauda",
      min: 0.05,
      max: 0.6,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
  ],
  compute: ({ temperature, confidence, tail }) => {
    const sharpness = Math.min(1, (confidence / Math.max(temperature, 0.1)));
    const diversity = Math.min(1, temperature * 0.55 + tail * 0.7);
    const risk = Math.min(1, (temperature - 0.7) * 0.5 + tail * 0.8);

    return {
      metrics: [
        { label: "concentração", value: `${(sharpness * 100).toFixed(0)}%` },
        { label: "diversidade", value: `${(diversity * 100).toFixed(0)}%` },
        { label: "risco de desvio", value: `${(Math.max(0, risk) * 100).toFixed(0)}%` },
        { label: "regime", value: temperature < 0.5 ? "conservador" : temperature > 1.2 ? "exploratório" : "equilibrado" },
      ],
      bars: [
        { label: "Token líder", value: Math.min(1, sharpness), display: `${(Math.min(1, sharpness) * 100).toFixed(0)}%` },
        { label: "Diversidade útil", value: diversity, display: `${(diversity * 100).toFixed(0)}%` },
        { label: "Risco da cauda", value: Math.max(0, risk), display: `${(Math.max(0, risk) * 100).toFixed(0)}%` },
      ],
      narrative:
        temperature < 0.4
          ? "A distribuição ficou afiada: o modelo quase sempre seguirá o candidato dominante. Isso reduz variação, mas também pode empobrecer a escrita."
          : temperature > 1.3
            ? "A distribuição abriu bastante. Há mais espaço para alternativas interessantes, porém a cauda pouco confiável também ganha mais influência."
            : "Esta faixa intermediária costuma ser a mais útil em muitas tarefas abertas: ainda existe direção, mas não tudo fica preso ao token mais previsível.",
      footer:
        "Temperatura ajusta a forma da distribuição; ela não adiciona fatos nem melhora raciocínio por si só.",
    };
  },
});

const candidateTruncationLab = createSliderPlayground({
  eyebrow: "Top-k e top-p",
  title: "Controle quantos candidatos entram no sorteio",
  description:
    "Ajuste k, p e a confiança do modelo para comparar truncação fixa e truncação por massa acumulada.",
  tone: "amber",
  icon: <ListFilter size={18} aria-hidden="true" />,
  initialState: {
    topK: 20,
    topP: 0.9,
    confidence: 0.65,
  },
  controls: [
    { key: "topK", label: "top-k", min: 1, max: 100, step: 1 },
    {
      key: "topP",
      label: "top-p",
      min: 0.5,
      max: 0.99,
      step: 0.01,
      formatValue: (value) => value.toFixed(2),
    },
    {
      key: "confidence",
      label: "confiança da distribuição",
      min: 0.2,
      max: 0.95,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
  ],
  compute: ({ topK, topP, confidence }) => {
    const normalizedK = Math.min(1, topK / 100);
    const dynamicCore = Math.min(1, topP * (1 - confidence * 0.4));
    const tailRisk = Math.max(0, normalizedK * 0.5 + topP * 0.4 - confidence * 0.3);

    return {
      metrics: [
        { label: "shortlist fixa", value: `${topK} tokens` },
        { label: "massa alvo", value: `${(topP * 100).toFixed(0)}%` },
        { label: "núcleo dinâmico", value: `${(dynamicCore * 100).toFixed(0)}%` },
        { label: "risco de cauda", value: `${(Math.min(1, tailRisk) * 100).toFixed(0)}%` },
      ],
      bars: [
        { label: "Abertura do top-k", value: normalizedK, display: `${(normalizedK * 100).toFixed(0)}%` },
        { label: "Abertura do top-p", value: dynamicCore, display: `${(dynamicCore * 100).toFixed(0)}%` },
        { label: "Exposição à cauda", value: Math.min(1, tailRisk), display: `${(Math.min(1, tailRisk) * 100).toFixed(0)}%` },
      ],
      narrative:
        topK <= 5
          ? "Top-k muito pequeno força uma shortlist rígida. Isso pode funcionar bem em contextos confiantes, mas perde flexibilidade quando há muitas continuações plausíveis."
          : topP >= 0.97
            ? "Top-p muito alto inclui quase toda a massa, aproximando-se de sampling bem menos truncado. A diversidade sobe, e o risco da cauda também."
            : "A ideia central aparece aqui: top-k decide por quantidade fixa; top-p decide por massa acumulada, adaptando melhor o tamanho do núcleo à incerteza do contexto.",
      footer:
        "Na prática, top-k e top-p podem ser combinados. O importante é entender qual cauda você está deixando participar do processo.",
    };
  },
});

const decodingScenarios = createScenarioExplorer({
  eyebrow: "Escolha por tarefa",
  title: "Compare estilos de decoding",
  description:
    "Cada política produz um tipo de comportamento. O melhor ajuste depende do custo do erro e da necessidade de variedade.",
  tone: "violet",
  icon: <Dices size={18} aria-hidden="true" />,
  scenarios: [
    {
      id: "greedy",
      label: "Greedy",
      title: "Mais previsibilidade, menos exploração",
      description:
        "Escolhe sempre o token mais provável. Útil quando a consistência local é prioridade absoluta.",
      bullets: [
        "Determinístico para o mesmo contexto.",
        "Pode gerar saídas repetitivas em texto aberto.",
        "Bom quando o custo do desvio é alto.",
      ],
      metrics: [
        { label: "diversidade", value: "baixa" },
        { label: "previsibilidade", value: "alta" },
      ],
      bars: [
        { label: "Exploração", value: 0.08, display: "8%" },
        { label: "Estabilidade", value: 0.92, display: "92%" },
      ],
    },
    {
      id: "temperature",
      label: "Temperatura moderada",
      title: "Equilíbrio entre direção e variedade",
      description:
        "Mantém a cabeça da distribuição relevante, mas libera alguma exploração de alternativas plausíveis.",
      bullets: [
        "Boa escolha genérica para muitas tarefas abertas.",
        "Exige calibrar criatividade contra risco.",
        "Pode ser combinada com top-k ou top-p.",
      ],
      metrics: [
        { label: "diversidade", value: "média" },
        { label: "previsibilidade", value: "média" },
      ],
      bars: [
        { label: "Exploração", value: 0.48, display: "48%" },
        { label: "Estabilidade", value: 0.62, display: "62%" },
      ],
    },
    {
      id: "top-p",
      label: "Top-p",
      title: "Núcleo dinâmico para texto aberto",
      description:
        "Adapta o número de candidatos à confiança do modelo naquele passo, mantendo foco na massa mais confiável.",
      bullets: [
        "Costuma funcionar bem em escrita aberta.",
        "Evita parte da cauda pouco confiável.",
        "Ainda precisa de temperatura e contexto bem calibrados.",
      ],
      metrics: [
        { label: "diversidade", value: "média-alta" },
        { label: "adaptatividade", value: "alta" },
      ],
      bars: [
        { label: "Exploração", value: 0.64, display: "64%" },
        { label: "Estabilidade", value: 0.58, display: "58%" },
      ],
    },
  ],
});

export const interactions = {
  "temperature-lab": temperatureLab,
  "candidate-truncation-lab": candidateTruncationLab,
  "decoding-scenarios": decodingScenarios,
} satisfies LessonModule["interactions"];
