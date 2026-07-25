import { GraduationCap, HeartHandshake, ShieldAlert } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import {
  createScenarioExplorer,
  createSliderPlayground,
} from "../_shared/interactionFactories";

const sftLab = createSliderPlayground({
  eyebrow: "SFT",
  title: "Demonstrações boas mudam a política inicial",
  description:
    "Ajuste quantidade, diversidade e dificuldade das demonstrações para ver o papel do SFT antes das preferências comparativas.",
  tone: "teal",
  icon: <GraduationCap size={18} aria-hidden="true" />,
  initialState: {
    demos: 50,
    diversity: 0.6,
    difficulty: 0.5,
  },
  controls: [
    { key: "demos", label: "volume relativo de demonstrações", min: 10, max: 100, step: 5 },
    {
      key: "diversity",
      label: "diversidade das instruções",
      min: 0.1,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
    {
      key: "difficulty",
      label: "dificuldade média das tarefas",
      min: 0.1,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
  ],
  compute: ({ demos, diversity, difficulty }) => {
    const coverage = Math.min(1, demos / 100 * 0.6 + diversity * 0.6);
    const brittleness = Math.max(0, difficulty * 0.5 - coverage * 0.3);
    const imitation = Math.min(1, coverage * 0.8 + (1 - difficulty) * 0.2);

    return {
      metrics: [
        { label: "cobertura comportamental", value: `${(coverage * 100).toFixed(0)}%` },
        { label: "capacidade de imitação", value: `${(imitation * 100).toFixed(0)}%` },
        { label: "fragilidade fora da amostra", value: `${(Math.min(1, brittleness) * 100).toFixed(0)}%` },
        { label: "papel do SFT", value: "política inicial" },
      ],
      bars: [
        { label: "Cobertura dos exemplos", value: coverage, display: `${(coverage * 100).toFixed(0)}%` },
        { label: "Imitação útil", value: imitation, display: `${(imitation * 100).toFixed(0)}%` },
        { label: "Risco de rigidez", value: Math.min(1, brittleness), display: `${(Math.min(1, brittleness) * 100).toFixed(0)}%` },
      ],
      narrative:
        demos < 25 && diversity < 0.4
          ? "Poucas demonstrações e pouca variedade tendem a produzir uma política supervisionada estreita, que imita bem alguns casos, mas generaliza mal para instruções novas."
          : difficulty > 0.75 && coverage < 0.6
            ? "As tarefas são difíceis demais para o volume e a diversidade de exemplos disponíveis. O SFT ajuda, mas ainda deixa lacunas comportamentais importantes."
            : "Aqui o SFT cumpre bem seu papel: estabelecer um estilo básico de resposta útil antes da etapa mais sutil de otimização por preferências.",
      footer:
        "SFT raramente resolve tudo sozinho, mas um pipeline de RLHF ruim costuma começar com um SFT fraco.",
    };
  },
});

const preferenceLab = createSliderPlayground({
  eyebrow: "Preferências",
  title: "O reward model depende da qualidade do feedback humano",
  description:
    "Ajuste ruído nas comparações, diversidade de prompts e força da penalidade de desvio para perceber estabilidade e risco de reward hacking.",
  tone: "indigo",
  icon: <HeartHandshake size={18} aria-hidden="true" />,
  initialState: {
    labelNoise: 0.2,
    promptCoverage: 0.7,
    klPenalty: 0.5,
  },
  controls: [
    {
      key: "labelNoise",
      label: "ruído/inconsistência nas preferências",
      min: 0,
      max: 0.8,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
    {
      key: "promptCoverage",
      label: "cobertura do espaço de prompts",
      min: 0.1,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
    {
      key: "klPenalty",
      label: "força da restrição à política base",
      min: 0,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
  ],
  compute: ({ labelNoise, promptCoverage, klPenalty }) => {
    const rewardReliability = Math.max(0, promptCoverage * 0.7 - labelNoise * 0.5 + 0.3);
    const hackingRisk = Math.min(1, labelNoise * 0.6 + (1 - klPenalty) * 0.5);
    const adaptability = Math.max(0, promptCoverage * 0.5 + (1 - klPenalty) * 0.3);

    return {
      metrics: [
        { label: "confiabilidade do reward", value: `${(Math.min(1, rewardReliability) * 100).toFixed(0)}%` },
        { label: "risco de reward hacking", value: `${(hackingRisk * 100).toFixed(0)}%` },
        { label: "liberdade da política", value: `${(adaptability * 100).toFixed(0)}%` },
        { label: "cobertura de prompts", value: `${(promptCoverage * 100).toFixed(0)}%` },
      ],
      bars: [
        { label: "Sinal humano confiável", value: Math.min(1, rewardReliability), display: `${(Math.min(1, rewardReliability) * 100).toFixed(0)}%` },
        { label: "Risco de explorar o proxy", value: hackingRisk, display: `${(hackingRisk * 100).toFixed(0)}%` },
        { label: "Capacidade de adaptação", value: adaptability, display: `${(adaptability * 100).toFixed(0)}%` },
      ],
      narrative:
        labelNoise > 0.45
          ? "Quando as preferências são muito inconsistentes, o reward model aprende um alvo ruidoso. A política posterior pode otimizar um critério mal definido."
          : klPenalty < 0.2
            ? "Pouca restrição deixa a política livre para buscar atalhos no reward model. Isso aumenta flexibilidade, mas também o risco de reward hacking."
            : "Aqui o feedback humano tem boa cobertura e a política ainda mantém algum vínculo com a base supervisionada. É um regime mais plausível para RLHF estável.",
      footer:
        "O reward model não mede 'valor humano total'; ele mede padrões aprendidos de um protocolo específico de comparações.",
    };
  },
});

const alignmentScenarios = createScenarioExplorer({
  eyebrow: "Cenários",
  title: "Compare pipelines de alinhamento",
  description:
    "Mudanças pequenas no pipeline alteram bastante o comportamento final observado no assistente.",
  tone: "rose",
  icon: <ShieldAlert size={18} aria-hidden="true" />,
  scenarios: [
    {
      id: "sft-only",
      label: "SFT apenas",
      title: "Boa política inicial, sensibilidade limitada",
      description:
        "O modelo aprende a imitar exemplos desejados, mas não explora tão bem preferências comparativas ou trade-offs sutis fora da amostra.",
      bullets: [
        "Ótimo ponto de partida.",
        "Mais simples e estável do que RLHF completo.",
        "Pode ficar rígido ou pouco calibrado em casos ambíguos.",
      ],
      metrics: [
        { label: "estabilidade", value: "alta" },
        { label: "adaptação fina", value: "média" },
      ],
      bars: [
        { label: "Controle comportamental", value: 0.62, display: "62%" },
        { label: "Risco de hacking", value: 0.12, display: "12%" },
      ],
    },
    {
      id: "balanced-rlhf",
      label: "SFT + RLHF balanceado",
      title: "Preferências refinam a política",
      description:
        "A política supervisionada serve de base, e o reward model empurra o comportamento em direção a respostas mais preferidas.",
      bullets: [
        "Combina imitação e otimização por preferências.",
        "Costuma melhorar utilidade percebida e seguimento de instruções.",
        "Depende fortemente da qualidade do feedback e da avaliação contínua.",
      ],
      metrics: [
        { label: "estabilidade", value: "boa" },
        { label: "adaptação fina", value: "alta" },
      ],
      bars: [
        { label: "Controle comportamental", value: 0.82, display: "82%" },
        { label: "Risco de hacking", value: 0.28, display: "28%" },
      ],
    },
    {
      id: "proxy-exploited",
      label: "Reward model explorado",
      title: "Pontuação interna sobe, qualidade real não necessariamente",
      description:
        "A política aprende a agradar o medidor proxy em vez de melhorar no critério humano mais amplo.",
      bullets: [
        "Respostas podem parecer excessivamente seguras, prolixas ou artificiais.",
        "Métrica interna melhora, experiência real pode piorar.",
        "Exige revisão humana, red-teaming e ajustes do pipeline.",
      ],
      metrics: [
        { label: "score interno", value: "alto" },
        { label: "qualidade real", value: "incerta" },
      ],
      bars: [
        { label: "Controle comportamental", value: 0.46, display: "46%" },
        { label: "Risco de hacking", value: 0.86, display: "86%" },
      ],
    },
  ],
});

export const interactions = {
  "sft-lab": sftLab,
  "preference-lab": preferenceLab,
  "alignment-scenarios": alignmentScenarios,
} satisfies LessonModule["interactions"];
