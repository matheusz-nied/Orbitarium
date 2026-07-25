import { Binary, HardDriveDownload, RefreshCcwDot } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import {
  createScenarioExplorer,
  createSliderPlayground,
} from "../_shared/interactionFactories";

const stateDesignLab = createSliderPlayground({
  eyebrow: "Estado",
  title: "Projete o estado do workflow",
  description:
    "Ajuste granularidade do estado, número de ramos paralelos e escopo de memória para perceber como isso afeta reprodutibilidade e custo de coordenação.",
  tone: "indigo",
  icon: <Binary size={18} aria-hidden="true" />,
  initialState: {
    stateGranularity: 0.6,
    branchCount: 3,
    memoryScope: 0.5,
  },
  controls: [
    {
      key: "stateGranularity",
      label: "granularidade do estado",
      min: 0.1,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
    { key: "branchCount", label: "ramos paralelos", min: 1, max: 8, step: 1 },
    {
      key: "memoryScope",
      label: "escopo da memória carregada",
      min: 0.1,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
  ],
  compute: ({ stateGranularity, branchCount, memoryScope }) => {
    const reproducibility = Math.min(1, 0.16 + stateGranularity * 0.52 - memoryScope * 0.08);
    const coordinationCost = Math.min(
      1,
      0.08 + branchCount / 8 * 0.48 + stateGranularity * 0.18 + memoryScope * 0.14,
    );
    const contextNoise = Math.min(1, 0.06 + memoryScope * 0.56 + branchCount / 8 * 0.12);

    return {
      metrics: [
        { label: "reprodutibilidade", value: `${(reproducibility * 100).toFixed(0)}%` },
        { label: "custo de coordenação", value: `${(coordinationCost * 100).toFixed(0)}%` },
        { label: "ruído de contexto", value: `${(contextNoise * 100).toFixed(0)}%` },
        { label: "trade-off central", value: "clareza vs. peso" },
      ],
      bars: [
        { label: "Capacidade de reconstruir o fluxo", value: reproducibility, display: `${(reproducibility * 100).toFixed(0)}%` },
        { label: "Sobrecarga de coordenação", value: coordinationCost, display: `${(coordinationCost * 100).toFixed(0)}%` },
        { label: "Probabilidade de excesso de contexto", value: contextNoise, display: `${(contextNoise * 100).toFixed(0)}%` },
      ],
      narrative:
        stateGranularity < 0.25
          ? "O estado está pobre demais. O fluxo até pode rodar, mas fica difícil saber o que já ocorreu, retomar após falhas e auditar decisões."
          : memoryScope > 0.8
            ? "Você trouxe memória demais para perto da execução. Em vez de ajudar, o excesso pode confundir o modelo e aumentar acoplamento desnecessário."
            : "Aqui o estado carrega progresso suficiente para recuperar e explicar a execução, sem transformar cada etapa em um dump pesado de contexto.",
      footer:
        "Estado útil é detalhado o bastante para coordenar e leve o bastante para não entupir o sistema.",
    };
  },
});

const durabilityScenarios = createScenarioExplorer({
  eyebrow: "Durabilidade",
  title: "Compare regimes de execução",
  description:
    "Veja quando um fluxo simples basta e quando a durabilidade passa a valer o custo extra.",
  tone: "teal",
  icon: <HardDriveDownload size={18} aria-hidden="true" />,
  scenarios: [
    {
      id: "in-process",
      label: "Run em processo",
      title: "Simples e rápido, mas frágil a falhas",
      description:
        "Tudo acontece na memória local do processo. Funciona bem para fluxos curtos, síncronos e sem efeitos críticos.",
      bullets: [
        "Baixa sobrecarga operacional.",
        "Pouca proteção contra reinício do serviço ou timeout longo.",
        "Auditoria e retomada tendem a ser limitadas.",
      ],
      metrics: [
        { label: "durabilidade", value: "baixa" },
        { label: "simplicidade", value: "alta" },
      ],
      bars: [
        { label: "Recuperação após falha", value: 0.18, display: "18%" },
        { label: "Sobrecarga de plataforma", value: 0.14, display: "14%" },
      ],
    },
    {
      id: "state-graph",
      label: "State graph",
      title: "Mais controle estrutural",
      description:
        "Representa nós e transições explicitamente, facilitando coordenação e depuração, mas sem necessariamente oferecer execução durável completa.",
      bullets: [
        "Ótimo para workflows com decisão local controlada.",
        "Clareia dependências e pontos de intervenção.",
        "Pode ainda precisar de outra camada para longas esperas ou retries sofisticados.",
      ],
      metrics: [
        { label: "durabilidade", value: "média" },
        { label: "simplicidade", value: "boa" },
      ],
      bars: [
        { label: "Recuperação após falha", value: 0.56, display: "56%" },
        { label: "Sobrecarga de plataforma", value: 0.42, display: "42%" },
      ],
    },
    {
      id: "durable-orchestrator",
      label: "Orquestrador durável",
      title: "Maior resiliência operacional",
      description:
        "Registra progresso, reexecuta lógica com segurança e lida melhor com filas, timeouts, callbacks e efeitos externos de longa duração.",
      bullets: [
        "Excelente para processos longos e críticos.",
        "Facilita retries, checkpoints e retomada consistente.",
        "Exige mais disciplina de modelagem e contratos de operação.",
      ],
      metrics: [
        { label: "durabilidade", value: "alta" },
        { label: "simplicidade", value: "menor" },
      ],
      bars: [
        { label: "Recuperação após falha", value: 0.92, display: "92%" },
        { label: "Sobrecarga de plataforma", value: 0.72, display: "72%" },
      ],
    },
  ],
});

const checkpointLab = createSliderPlayground({
  eyebrow: "Recuperação",
  title: "Ajuste checkpoint, idempotência e efeitos externos",
  description:
    "Entenda por que retry sem contratos seguros pode trocar disponibilidade por incidentes duplicados.",
  tone: "amber",
  icon: <RefreshCcwDot size={18} aria-hidden="true" />,
  initialState: {
    checkpointFrequency: 0.6,
    idempotencyStrength: 0.7,
    sideEffectIntensity: 0.5,
  },
  controls: [
    {
      key: "checkpointFrequency",
      label: "frequência de checkpoints",
      min: 0.1,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
    {
      key: "idempotencyStrength",
      label: "força da idempotência",
      min: 0.1,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
    {
      key: "sideEffectIntensity",
      label: "criticidade dos efeitos externos",
      min: 0.1,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
  ],
  compute: ({ checkpointFrequency, idempotencyStrength, sideEffectIntensity }) => {
    const recoverySpeed = Math.min(1, 0.12 + checkpointFrequency * 0.56);
    const duplicateRisk = Math.min(
      1,
      Math.max(0, 0.14 + sideEffectIntensity * 0.48 - idempotencyStrength * 0.42),
    );
    const throughput = Math.min(
      1,
      Math.max(0, 0.86 - checkpointFrequency * 0.22 - sideEffectIntensity * 0.1),
    );

    return {
      metrics: [
        { label: "velocidade de recuperação", value: `${(recoverySpeed * 100).toFixed(0)}%` },
        { label: "risco de duplicação", value: `${(duplicateRisk * 100).toFixed(0)}%` },
        { label: "throughput relativo", value: `${(throughput * 100).toFixed(0)}%` },
        { label: "princípio central", value: "retry seguro" },
      ],
      bars: [
        { label: "Rapidez para retomar", value: recoverySpeed, display: `${(recoverySpeed * 100).toFixed(0)}%` },
        { label: "Chance de efeito em dobro", value: duplicateRisk, display: `${(duplicateRisk * 100).toFixed(0)}%` },
        { label: "Velocidade operacional", value: throughput, display: `${(throughput * 100).toFixed(0)}%` },
      ],
      narrative:
        idempotencyStrength < 0.3 && sideEffectIntensity > 0.6
          ? "Este é o regime mais perigoso: os retries ajudam a disponibilidade, mas podem disparar consequências externas em duplicidade."
          : checkpointFrequency > 0.85
            ? "Os checkpoints tornaram a recuperação ótima, porém a execução carrega overhead alto. Isso pode valer a pena em fluxos críticos, mas não em toda rotina."
            : "O equilíbrio saudável combina checkpoint suficiente para retomar bem com contratos idempotentes que tornam a reexecução aceitável.",
      footer:
        "A pergunta não é só 'posso repetir?', mas 'o que acontece no mundo se eu repetir?'.",
    };
  },
});

export const interactions = {
  "state-design-lab": stateDesignLab,
  "durability-scenarios": durabilityScenarios,
  "checkpoint-lab": checkpointLab,
} satisfies LessonModule["interactions"];
