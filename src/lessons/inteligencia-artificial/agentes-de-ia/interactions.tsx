import { Bot, ShieldCheck, Waypoints } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import {
  createScenarioExplorer,
  createSliderPlayground,
} from "../_shared/interactionFactories";

const agentLoopLab = createSliderPlayground({
  eyebrow: "Loop",
  title: "Ajuste a qualidade do ciclo observe-plan-act",
  description:
    "Varie profundidade de planejamento, confiabilidade das ferramentas e disciplina de parada para ver como um agente muda de comportamento.",
  tone: "emerald",
  icon: <Waypoints size={18} aria-hidden="true" />,
  initialState: {
    planningDepth: 0.5,
    toolReliability: 0.8,
    stopDiscipline: 0.7,
  },
  controls: [
    {
      key: "planningDepth",
      label: "profundidade de planejamento",
      min: 0.1,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
    {
      key: "toolReliability",
      label: "confiabilidade das ferramentas",
      min: 0.1,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
    {
      key: "stopDiscipline",
      label: "clareza para parar ou pedir ajuda",
      min: 0.1,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
  ],
  compute: ({ planningDepth, toolReliability, stopDiscipline }) => {
    const completion = Math.min(
      1,
      0.12 + toolReliability * 0.42 + stopDiscipline * 0.22 + planningDepth * 0.16,
    );
    const latency = Math.min(1, 0.08 + planningDepth * 0.48 + (1 - toolReliability) * 0.18);
    const driftRisk = Math.min(
      1,
      Math.max(0, 0.16 + planningDepth * 0.18 + (1 - stopDiscipline) * 0.38),
    );

    return {
      metrics: [
        { label: "chance de concluir bem", value: `${(completion * 100).toFixed(0)}%` },
        { label: "latência relativa", value: `${(latency * 100).toFixed(0)}%` },
        { label: "risco de desvio", value: `${(driftRisk * 100).toFixed(0)}%` },
        { label: "fator-chave", value: "observação confiável" },
      ],
      bars: [
        { label: "Qualidade da execução", value: completion, display: `${(completion * 100).toFixed(0)}%` },
        { label: "Peso do loop", value: latency, display: `${(latency * 100).toFixed(0)}%` },
        { label: "Chance de insistir no erro", value: driftRisk, display: `${(driftRisk * 100).toFixed(0)}%` },
      ],
      narrative:
        stopDiscipline < 0.35
          ? "O agente até pode encontrar sinais úteis, mas não sabe bem quando parar. Isso favorece loops longos, custo alto e tentativas redundantes."
          : toolReliability < 0.4
            ? "Quando as ferramentas falham ou devolvem observações ruins, o agente raciocina em cima de chão movediço. Não há bom planejamento que compense isso."
            : "Neste regime, o agente consegue usar planejamento com moderação, agir sobre dados relativamente confiáveis e encerrar o fluxo sem deriva excessiva.",
      footer:
        "O melhor agente não é o que pensa mais; é o que fecha o loop com observações úteis e critérios de parada claros.",
    };
  },
});

const toolPolicyScenarios = createScenarioExplorer({
  eyebrow: "Arquitetura",
  title: "Compare políticas de agentividade",
  description:
    "Veja quando abrir mais autonomia ajuda e quando começa a atrapalhar.",
  tone: "teal",
  icon: <Bot size={18} aria-hidden="true" />,
  scenarios: [
    {
      id: "chat-only",
      label: "Chat puro",
      title: "Rápido, mas sem braços",
      description:
        "O sistema responde bem a perguntas simples, mas não consulta fontes nem executa ações. Útil para instruções diretas e baixo risco.",
      bullets: [
        "Baixa latência e pouca superfície de falha.",
        "Não resolve tarefas que dependem de dados externos ou passos sequenciais.",
        "Pode soar confiante mesmo sem capacidade de verificar fatos ou agir.",
      ],
      metrics: [
        { label: "autonomia", value: "baixa" },
        { label: "previsibilidade", value: "alta" },
      ],
      bars: [
        { label: "Adaptatividade", value: 0.24, display: "24%" },
        { label: "Risco operacional", value: 0.12, display: "12%" },
      ],
    },
    {
      id: "balanced-agent",
      label: "Agente balanceado",
      title: "Ferramentas, estado e poucos passos bons",
      description:
        "Usa observações e ferramentas onde elas realmente agregam, mantendo o escopo de ação relativamente controlado.",
      bullets: [
        "Bom equilíbrio entre capacidade e governança.",
        "Permite pesquisa, verificação e execução restrita.",
        "Exige desenho cuidadoso de ferramentas e paradas.",
      ],
      metrics: [
        { label: "autonomia", value: "média-alta" },
        { label: "previsibilidade", value: "boa" },
      ],
      bars: [
        { label: "Adaptatividade", value: 0.78, display: "78%" },
        { label: "Risco operacional", value: 0.38, display: "38%" },
      ],
    },
    {
      id: "over-agentic",
      label: "Autonomia exagerada",
      title: "Muitos passos, poucos freios",
      description:
        "O sistema pode até parecer poderoso, mas a combinação de liberdade ampla e observações imperfeitas eleva custo e fragilidade.",
      bullets: [
        "Mais latência, mais tokens e mais oportunidades de erro.",
        "Pode insistir em planos ruins ou interpretar mal sinais externos.",
        "Sem guardrails fortes, torna-se difícil auditar e confiar.",
      ],
      metrics: [
        { label: "autonomia", value: "alta" },
        { label: "previsibilidade", value: "baixa" },
      ],
      bars: [
        { label: "Adaptatividade", value: 0.88, display: "88%" },
        { label: "Risco operacional", value: 0.83, display: "83%" },
      ],
    },
  ],
});

const safetyBoundaryLab = createSliderPlayground({
  eyebrow: "Segurança",
  title: "Regule as fronteiras do agente",
  description:
    "Ajuste escopo de permissão, confiança nas observações e intensidade de aprovação humana para entender o custo-benefício da autonomia.",
  tone: "rose",
  icon: <ShieldCheck size={18} aria-hidden="true" />,
  initialState: {
    permissionScope: 0.4,
    observationTrust: 0.5,
    approvalGate: 0.7,
  },
  controls: [
    {
      key: "permissionScope",
      label: "amplitude das permissões",
      min: 0.1,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
    {
      key: "observationTrust",
      label: "quão confiáveis são as observações externas",
      min: 0.1,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
    {
      key: "approvalGate",
      label: "grau de revisão humana",
      min: 0.1,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
  ],
  compute: ({ permissionScope, observationTrust, approvalGate }) => {
    const autonomy = Math.min(1, 0.12 + permissionScope * 0.58 + (1 - approvalGate) * 0.22);
    const incidentRisk = Math.min(
      1,
      Math.max(0, 0.1 + permissionScope * 0.38 + (1 - observationTrust) * 0.28 - approvalGate * 0.18),
    );
    const userBurden = Math.min(1, 0.12 + approvalGate * 0.58);

    return {
      metrics: [
        { label: "autonomia efetiva", value: `${(autonomy * 100).toFixed(0)}%` },
        { label: "risco de incidente", value: `${(incidentRisk * 100).toFixed(0)}%` },
        { label: "carga sobre o usuário", value: `${(userBurden * 100).toFixed(0)}%` },
        { label: "princípio central", value: "escopo mínimo" },
      ],
      bars: [
        { label: "Liberdade operacional", value: autonomy, display: `${(autonomy * 100).toFixed(0)}%` },
        { label: "Superfície de risco", value: incidentRisk, display: `${(incidentRisk * 100).toFixed(0)}%` },
        { label: "Fricção de aprovação", value: userBurden, display: `${(userBurden * 100).toFixed(0)}%` },
      ],
      narrative:
        permissionScope > 0.8 && approvalGate < 0.35
          ? "Aqui o agente ganhou liberdade demais sem contraponto suficiente. O sistema fica ágil, mas a probabilidade de uma ação ruim custar caro sobe bastante."
          : approvalGate > 0.85
            ? "As revisões humanas reduziram risco, porém a experiência ficou pesada. Isso pode ser aceitável em contextos críticos, mas talvez inviável em tarefas frequentes."
            : "Esse regime busca o meio-termo: ação suficiente para ser útil, mas com contenções que evitam transformar confiança estatística em poder irrestrito.",
      footer:
        "Guardrails não são só defesa; eles definem a zona onde a autonomia é realmente utilizável.",
    };
  },
});

export const interactions = {
  "agent-loop-lab": agentLoopLab,
  "tool-policy-scenarios": toolPolicyScenarios,
  "safety-boundary-lab": safetyBoundaryLab,
} satisfies LessonModule["interactions"];
