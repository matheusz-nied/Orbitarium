import { Gauge, Layers, Unplug } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import {
  createScenarioExplorer,
  createSliderPlayground,
} from "../_shared/interactionFactories";

const freezeLab = createSliderPlayground({
  eyebrow: "Congelamento",
  title: "Quanto do backbone vale a pena preservar?",
  description:
    "Ajuste tamanho do dataset, porcentagem congelada e similaridade do domínio para sentir quando um feature extractor fixo faz mais sentido.",
  tone: "teal",
  icon: <Unplug size={18} aria-hidden="true" />,
  initialState: {
    datasetSize: 2000,
    frozen: 80,
    similarity: 0.7,
  },
  controls: [
    { key: "datasetSize", label: "imagens no dataset alvo", min: 200, max: 20000, step: 200 },
    {
      key: "frozen",
      label: "percentual do backbone congelado",
      min: 0,
      max: 100,
      step: 10,
      formatValue: (value) => `${value}%`,
    },
    {
      key: "similarity",
      label: "similaridade com o domínio de origem",
      min: 0,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
  ],
  compute: ({ datasetSize, frozen, similarity }) => {
    const dataStrength = Math.min(1, datasetSize / 12000);
    const preservation = frozen / 100;
    const reuseScore = Math.min(1, preservation * 0.5 + similarity * 0.6 + (1 - dataStrength) * 0.3);
    const adaptationNeed = Math.min(1, (1 - similarity) * 0.7 + dataStrength * 0.4);

    return {
      metrics: [
        { label: "reuso do pré-treino", value: `${(reuseScore * 100).toFixed(0)}%` },
        { label: "necessidade de adaptação", value: `${(adaptationNeed * 100).toFixed(0)}%` },
        { label: "dados disponíveis", value: datasetSize.toLocaleString() },
        { label: "estratégia provável", value: frozen >= 70 ? "mais conservadora" : "mais adaptativa" },
      ],
      bars: [
        { label: "Preservação útil", value: reuseScore, display: `${(reuseScore * 100).toFixed(0)}%` },
        { label: "Espaço para fine-tuning", value: adaptationNeed, display: `${(adaptationNeed * 100).toFixed(0)}%` },
        { label: "Risco de overfit no backbone", value: Math.max(0, 1 - preservation) * (1 - dataStrength), display: `${(((Math.max(0, 1 - preservation) * (1 - dataStrength))) * 100).toFixed(0)}%` },
      ],
      narrative:
        frozen >= 80 && similarity >= 0.6
          ? "Congelar bastante faz sentido aqui: o domínio ainda conversa com o pré-treinamento e o dataset não é enorme."
          : frozen <= 30 && datasetSize >= 10000
            ? "Com mais dados e pouca preservação, você está apostando em adaptação profunda. Isso pode trazer ganho real se a validação confirmar."
            : "A situação está no meio-termo clássico do transfer learning: parte da representação deve ser preservada, parte deve ser ajustada com cautela.",
      footer:
        "Não é uma fórmula universal; é uma lente para pensar a troca entre proteger o que o backbone já sabe e deixá-lo aprender o suficiente no novo domínio.",
    };
  },
});

const similarityLab = createSliderPlayground({
  eyebrow: "Distância entre tarefas",
  title: "Similaridade e dados mudam o quanto descongelar",
  description:
    "Ajuste tamanho do dataset, distância de domínio e agressividade do learning rate para ver o risco de forgetting.",
  tone: "amber",
  icon: <Layers size={18} aria-hidden="true" />,
  initialState: {
    datasetSize: 4000,
    domainShift: 0.4,
    lrAggression: 0.3,
  },
  controls: [
    { key: "datasetSize", label: "imagens no alvo", min: 200, max: 20000, step: 200 },
    {
      key: "domainShift",
      label: "distância entre domínios",
      min: 0,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
    {
      key: "lrAggression",
      label: "agressividade do learning rate",
      min: 0,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
  ],
  compute: ({ datasetSize, domainShift, lrAggression }) => {
    const dataSupport = Math.min(1, datasetSize / 15000);
    const forgetting = Math.min(1, lrAggression * 0.7 + (1 - dataSupport) * 0.4 + domainShift * 0.3);
    const adaptationGain = Math.min(1, domainShift * 0.6 + dataSupport * 0.5);
    const safeZone = Math.max(0, 1 - Math.abs(adaptationGain - forgetting));

    return {
      metrics: [
        { label: "ganho potencial de adaptação", value: `${(adaptationGain * 100).toFixed(0)}%` },
        { label: "risco de forgetting", value: `${(forgetting * 100).toFixed(0)}%` },
        { label: "apoio de dados", value: `${(dataSupport * 100).toFixed(0)}%` },
        { label: "zona de segurança", value: `${(safeZone * 100).toFixed(0)}%` },
      ],
      bars: [
        { label: "Motivo para ajustar", value: adaptationGain, display: `${(adaptationGain * 100).toFixed(0)}%` },
        { label: "Risco de esquecer", value: forgetting, display: `${(forgetting * 100).toFixed(0)}%` },
        { label: "Calibração saudável", value: safeZone, display: `${(safeZone * 100).toFixed(0)}%` },
      ],
      narrative:
        domainShift > 0.7 && datasetSize < 3000
          ? "Aqui mora um cenário difícil: o domínio mudou bastante, mas faltam dados para justificar ajuste agressivo do backbone."
          : forgetting > adaptationGain
            ? "O fine-tuning pode estar rápido demais para o suporte de dados disponível. Há risco de apagar conhecimento útil antes de convertê-lo em ganho real."
            : "Você tem motivo razoável para adaptar o backbone e suporte de dados suficiente para tentar isso com alguma segurança.",
      footer:
        "Quanto mais distante o novo domínio, mais o backbone precisa mudar; quanto menos dados você tem, mais perigoso é mudar rápido demais.",
    };
  },
});

const fineTuningScenarios = createScenarioExplorer({
  eyebrow: "Estratégias",
  title: "Compare estratégias clássicas de adaptação",
  description:
    "Cada estratégia equilibra de forma diferente preservação, custo e poder de adaptação.",
  tone: "indigo",
  icon: <Gauge size={18} aria-hidden="true" />,
  scenarios: [
    {
      id: "head-only",
      label: "Head only",
      title: "Backbone congelado, head novo",
      description:
        "Opção segura e barata para datasets pequenos ou tarefas ainda próximas do domínio de origem.",
      bullets: [
        "Baixo risco de catastrophic forgetting.",
        "Treino rápido e estável.",
        "Pode limitar adaptação se o domínio alvo for diferente demais.",
      ],
      metrics: [
        { label: "custo", value: "baixo" },
        { label: "adaptação", value: "limitada" },
      ],
      bars: [
        { label: "Preservação", value: 0.92, display: "92%" },
        { label: "Flexibilidade", value: 0.32, display: "32%" },
      ],
    },
    {
      id: "partial",
      label: "Fine-tuning parcial",
      title: "Descongelar blocos superiores",
      description:
        "Equilíbrio frequente: preserva blocos gerais e adapta melhor as partes mais específicas da representação.",
      bullets: [
        "Bom compromisso para muitos problemas reais.",
        "Permite especialização sem destruir tanto a base.",
        "Costuma combinar bem com learning rates discriminativos.",
      ],
      metrics: [
        { label: "custo", value: "médio" },
        { label: "adaptação", value: "boa" },
      ],
      bars: [
        { label: "Preservação", value: 0.7, display: "70%" },
        { label: "Flexibilidade", value: 0.68, display: "68%" },
      ],
    },
    {
      id: "full",
      label: "Fine-tuning total",
      title: "Rede inteira liberada",
      description:
        "Maior liberdade para adaptar o modelo, mas maior risco de forgetting e overfitting se o regime não for bem controlado.",
      bullets: [
        "Pode render mais com muito dado e domínio razoavelmente próximo.",
        "Exige mais cuidado com learning rate e regularização.",
        "Validação torna-se ainda mais importante para saber se o ganho é real.",
      ],
      metrics: [
        { label: "custo", value: "alto" },
        { label: "adaptação", value: "máxima" },
      ],
      bars: [
        { label: "Preservação", value: 0.35, display: "35%" },
        { label: "Flexibilidade", value: 0.94, display: "94%" },
      ],
    },
  ],
});

export const interactions = {
  "freeze-lab": freezeLab,
  "similarity-lab": similarityLab,
  "fine-tuning-scenarios": fineTuningScenarios,
} satisfies LessonModule["interactions"];
