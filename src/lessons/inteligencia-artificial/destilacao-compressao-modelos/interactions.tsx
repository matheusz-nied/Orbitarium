import { BarChart3, ShieldAlert, Sliders } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import {
  createScenarioExplorer,
  createSliderPlayground,
} from "../_shared/interactionFactories";

const teacherStudentLab = createSliderPlayground({
  eyebrow: "Teacher-student",
  title: "Ajuste temperatura, gap e capacidade do aluno",
  description:
    "Veja como a destilação depende do que o professor sabe, do que o aluno suporta e do quão legível a distribuição fica.",
  tone: "indigo",
  icon: <Sliders size={18} aria-hidden="true" />,
  initialState: {
    teacherQuality: 0.8,
    temperature: 3,
    studentCapacity: 0.6,
  },
  controls: [
    {
      key: "teacherQuality",
      label: "qualidade relativa do teacher",
      min: 0.2,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
    { key: "temperature", label: "temperatura", min: 1, max: 8, step: 0.5 },
    {
      key: "studentCapacity",
      label: "capacidade do aluno",
      min: 0.1,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
  ],
  compute: ({ teacherQuality, temperature, studentCapacity }) => {
    const signalRichness = Math.max(0, Math.min(1, teacherQuality * 0.55 + Math.min(temperature / 6, 1) * 0.45));
    const fit = Math.max(0, Math.min(1, studentCapacity * 0.65 + teacherQuality * 0.35));
    const distillationYield = Math.max(0, Math.min(1, signalRichness * 0.5 + fit * 0.5 - Math.max(0, temperature - 5) * 0.05));

    return {
      metrics: [
        { label: "riqueza do sinal", value: `${(signalRichness * 100).toFixed(0)}%` },
        { label: "encaixe teacher→student", value: `${(fit * 100).toFixed(0)}%` },
        { label: "ganho esperado", value: `${(distillationYield * 100).toFixed(0)}%` },
        { label: "perfil", value: studentCapacity < 0.35 ? "apertado" : "viável" },
      ],
      bars: [
        { label: "Sinal pedagógico", value: signalRichness, display: `${(signalRichness * 100).toFixed(0)}%` },
        { label: "Capacidade do aluno", value: fit, display: `${(fit * 100).toFixed(0)}%` },
        { label: "Rendimento da destilação", value: distillationYield, display: `${(distillationYield * 100).toFixed(0)}%` },
      ],
      narrative:
        studentCapacity < 0.3
          ? "O professor pode ser ótimo, mas o aluno está pequeno demais para capturar o comportamento útil com estabilidade."
          : temperature > 6
            ? "A distribuição está tão suave que parte do sinal discriminativo começa a se diluir. Nem toda suavização ajuda."
            : "Aqui a destilação tem espaço para funcionar: o teacher oferece estrutura e o aluno ainda tem capacidade de absorvê-la.",
      footer:
        "Teacher forte ajuda, mas não substitui capacidade suficiente no aluno nem tuning coerente da loss.",
    };
  },
});

const compressionBudgetLab = createSliderPlayground({
  eyebrow: "Budget",
  title: "Combine destilação, poda e redução de bits",
  description:
    "Comprimir bem é distribuir agressividade entre técnicas diferentes, em vez de exagerar em uma só.",
  tone: "teal",
  icon: <BarChart3 size={18} aria-hidden="true" />,
  initialState: {
    distillWeight: 0.6,
    pruning: 0.2,
    bitBudget: 8,
  },
  controls: [
    {
      key: "distillWeight",
      label: "peso relativo da destilação",
      min: 0.1,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
    {
      key: "pruning",
      label: "agressividade da poda",
      min: 0,
      max: 0.8,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
    { key: "bitBudget", label: "bits do deployment", min: 2, max: 16, step: 1 },
  ],
  compute: ({ distillWeight, pruning, bitBudget }) => {
    const footprintGain = Math.max(0, Math.min(1, pruning * 0.45 + (16 - bitBudget) / 14 * 0.55));
    const behaviorPreservation = Math.max(0, Math.min(1, distillWeight * 0.65 + (1 - pruning) * 0.2 + bitBudget / 16 * 0.15));
    const fragility = Math.max(0, Math.min(1, pruning * 0.5 + (8 - bitBudget) * 0.06 + Math.max(0, 0.4 - distillWeight) * 0.35));

    return {
      metrics: [
        { label: "ganho de footprint", value: `${(footprintGain * 100).toFixed(0)}%` },
        { label: "preservação comportamental", value: `${(behaviorPreservation * 100).toFixed(0)}%` },
        { label: "fragilidade", value: `${(fragility * 100).toFixed(0)}%` },
        { label: "estratégia", value: bitBudget <= 4 ? "agressiva" : "balanceada" },
      ],
      bars: [
        { label: "Economia operacional", value: footprintGain, display: `${(footprintGain * 100).toFixed(0)}%` },
        { label: "Qualidade preservada", value: behaviorPreservation, display: `${(behaviorPreservation * 100).toFixed(0)}%` },
        { label: "Risco de quebra", value: fragility, display: `${(fragility * 100).toFixed(0)}%` },
      ],
      narrative:
        pruning > 0.55 && bitBudget <= 4
          ? "Você está comprimindo por todos os lados ao mesmo tempo. O footprint cai rápido, mas a margem para manter comportamento útil fica estreita."
          : distillWeight < 0.35
            ? "Sem peso suficiente para a distilação, o aluno perde justamente o mecanismo que o ajuda a preservar a generalização do teacher."
            : "A combinação está mais equilibrada: distilação protege comportamento enquanto poda e bits atacam o custo do deployment.",
      footer:
        "Combinar técnicas funciona melhor quando cada uma resolve uma fonte diferente de custo.",
    };
  },
});

const compressionStrategies = createScenarioExplorer({
  eyebrow: "Estratégias",
  title: "Compare caminhos de compressão",
  description:
    "Há casos em que basta reduzir bits e casos em que você precisa realmente ensinar um aluno novo.",
  tone: "rose",
  icon: <ShieldAlert size={18} aria-hidden="true" />,
  scenarios: [
    {
      id: "quantize-only",
      label: "Quantizar apenas",
      title: "Quando o gargalo principal é formato de execução",
      description:
        "Se o comportamento do modelo já é adequado e o problema está no footprint/latência, quantização pode ser o primeiro passo natural.",
      bullets: [
        "Baixa alteração de pipeline de treino.",
        "Bom quando o modelo já entrega qualidade suficiente.",
        "Depende de runtime e kernels maduros.",
      ],
      metrics: [
        { label: "mudança arquitetural", value: "baixa" },
        { label: "ganho comportamental", value: "baixo" },
      ],
      bars: [
        { label: "Simplicidade operacional", value: 0.82, display: "82%" },
        { label: "Redução estrutural do modelo", value: 0.36, display: "36%" },
      ],
    },
    {
      id: "distill-student",
      label: "Destilar um aluno",
      title: "Quando o modelo precisa nascer menor",
      description:
        "Faz sentido quando a economia desejada é estrutural e não apenas numérica.",
      bullets: [
        "Cria nova fronteira de custo em treinamento e serving.",
        "Pode preservar mais comportamento do que poda cega.",
        "Exige tuning cuidadoso de loss, teacher e capacidade.",
      ],
      metrics: [
        { label: "mudança arquitetural", value: "alta" },
        { label: "ganho comportamental", value: "médio/alto" },
      ],
      bars: [
        { label: "Simplicidade operacional", value: 0.46, display: "46%" },
        { label: "Redução estrutural do modelo", value: 0.84, display: "84%" },
      ],
    },
    {
      id: "stacked-compression",
      label: "Combinar técnicas",
      title: "Quando custo e qualidade exigem projeto fino",
      description:
        "Aluno destilado, pruning seletivo e quantização calibrada podem entregar o melhor compromisso global.",
      bullets: [
        "Maior complexidade de engenharia.",
        "Maior espaço de otimização total.",
        "Exige benchmarks e guardrails sólidos.",
      ],
      metrics: [
        { label: "mudança arquitetural", value: "média" },
        { label: "ganho comportamental", value: "alto" },
      ],
      bars: [
        { label: "Simplicidade operacional", value: 0.34, display: "34%" },
        { label: "Redução estrutural do modelo", value: 0.9, display: "90%" },
      ],
    },
  ],
});

export const interactions = {
  "teacher-student-lab": teacherStudentLab,
  "compression-budget-lab": compressionBudgetLab,
  "compression-strategies": compressionStrategies,
} satisfies LessonModule["interactions"];
