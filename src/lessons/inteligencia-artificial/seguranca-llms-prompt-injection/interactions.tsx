import { BarChart3, ShieldAlert, Sliders } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import {
  createScenarioExplorer,
  createSliderPlayground,
} from "../_shared/interactionFactories";

const trustBoundaryLab = createSliderPlayground({
  eyebrow: "Fronteira de confiança",
  title: "Relacione contexto externo, privilégio e clareza de limites",
  description:
    "Quando conteúdo não confiável ganha muita influência perto de ferramentas poderosas, o risco sobe rapidamente.",
  tone: "violet",
  icon: <Sliders size={18} aria-hidden="true" />,
  initialState: {
    externalContext: 0.6,
    toolPrivilege: 0.55,
    boundaryClarity: 0.45,
  },
  controls: [
    { key: "externalContext", label: "peso do conteúdo externo", min: 0.1, max: 1, step: 0.05, formatValue: (value) => value.toFixed(2) },
    { key: "toolPrivilege", label: "privilégio das ferramentas", min: 0.1, max: 1, step: 0.05, formatValue: (value) => value.toFixed(2) },
    { key: "boundaryClarity", label: "clareza das fronteiras de confiança", min: 0.1, max: 1, step: 0.05, formatValue: (value) => value.toFixed(2) },
  ],
  compute: ({ externalContext, toolPrivilege, boundaryClarity }) => {
    const attackSurface = Math.max(0, Math.min(1, externalContext * 0.45 + toolPrivilege * 0.4 + (1 - boundaryClarity) * 0.15));
    const controllability = Math.max(0, Math.min(1, boundaryClarity * 0.65 + (1 - toolPrivilege) * 0.2 + (1 - externalContext) * 0.15));
    const blastRadius = Math.max(0, Math.min(1, toolPrivilege * 0.6 + externalContext * 0.25 + (1 - boundaryClarity) * 0.15));
    return {
      metrics: [
        { label: "superfície de ataque", value: `${(attackSurface * 100).toFixed(0)}%` },
        { label: "controlabilidade", value: `${(controllability * 100).toFixed(0)}%` },
        { label: "blast radius", value: `${(blastRadius * 100).toFixed(0)}%` },
        { label: "perfil", value: attackSurface > 0.6 ? "exposto" : "contido" },
      ],
      bars: [
        { label: "Exposição ao contexto hostil", value: attackSurface, display: `${(attackSurface * 100).toFixed(0)}%` },
        { label: "Capacidade de conter", value: controllability, display: `${(controllability * 100).toFixed(0)}%` },
        { label: "Impacto potencial", value: blastRadius, display: `${(blastRadius * 100).toFixed(0)}%` },
      ],
      narrative:
        toolPrivilege > 0.75 && boundaryClarity < 0.4
          ? "Ferramentas poderosas combinadas com fronteiras confusas produzem exatamente o tipo de sistema que transforma erro semântico em incidente operacional."
          : externalContext > 0.75
            ? "Há muita dependência de conteúdo externo. Isso não é proibido, mas exige proveniência clara, filtros e política de execução bem limitada."
            : "O desenho está mais contido: ainda pode haver tentativa de manipulação, mas o sistema tem mais chances de absorver o contexto sem ampliar o dano.",
      footer:
        "Segurança madura começa decidindo o que o sistema pode fazer de errado mesmo quando o modelo interpretar mal o contexto.",
    };
  },
});

const defenseDepthLab = createSliderPlayground({
  eyebrow: "Defesa em profundidade",
  title: "Combine isolamento, least privilege e aprovação humana",
  description:
    "A força real da defesa aparece quando diferentes camadas se apoiam mutuamente.",
  tone: "teal",
  icon: <BarChart3 size={18} aria-hidden="true" />,
  initialState: {
    isolation: 0.45,
    leastPrivilege: 0.55,
    humanApproval: 0.35,
  },
  controls: [
    { key: "isolation", label: "isolamento e delimitação de entradas", min: 0.1, max: 1, step: 0.05, formatValue: (value) => value.toFixed(2) },
    { key: "leastPrivilege", label: "privilégio mínimo", min: 0.1, max: 1, step: 0.05, formatValue: (value) => value.toFixed(2) },
    { key: "humanApproval", label: "revisão humana para ações sensíveis", min: 0, max: 1, step: 0.05, formatValue: (value) => value.toFixed(2) },
  ],
  compute: ({ isolation, leastPrivilege, humanApproval }) => {
    const resilience = Math.max(0, Math.min(1, isolation * 0.35 + leastPrivilege * 0.4 + humanApproval * 0.25));
    const friction = Math.max(0, Math.min(1, isolation * 0.15 + humanApproval * 0.55 + leastPrivilege * 0.1));
    const residualRisk = Math.max(0, Math.min(1, 1 - resilience * 0.75 + 0.12));
    return {
      metrics: [
        { label: "resiliência", value: `${(resilience * 100).toFixed(0)}%` },
        { label: "fricção operacional", value: `${(friction * 100).toFixed(0)}%` },
        { label: "risco residual", value: `${(residualRisk * 100).toFixed(0)}%` },
        { label: "perfil", value: resilience > 0.65 ? "camadas fortes" : "camadas frágeis" },
      ],
      bars: [
        { label: "Capacidade de bloquear desvios", value: resilience, display: `${(resilience * 100).toFixed(0)}%` },
        { label: "Custo operacional da defesa", value: friction, display: `${(friction * 100).toFixed(0)}%` },
        { label: "Risco remanescente", value: residualRisk, display: `${(residualRisk * 100).toFixed(0)}%` },
      ],
      narrative:
        leastPrivilege < 0.35
          ? "Sem privilégio mínimo, as outras camadas trabalham demais para compensar um sistema que ainda pode fazer coisas demais quando algo escapa."
          : humanApproval > 0.75
            ? "A revisão humana protege ações críticas, mas traz custo operacional. O ideal é aplicá-la onde o impacto de erro realmente justifica a fricção."
            : "A defesa está mais equilibrada: isolamento reduz confusão, privilégio mínimo reduz alcance do dano e aprovação humana cobre ações sensíveis.",
      footer:
        "Segurança útil procura equilíbrio entre contenção forte e fricção compatível com o produto.",
    };
  },
});

const attackSurfaceScenarios = createScenarioExplorer({
  eyebrow: "Cenários",
  title: "Compare superfícies de ataque em aplicações de LLM",
  description:
    "Nem todo app com LLM precisa da mesma profundidade de controles; o desenho muda com o poder dado ao sistema.",
  tone: "rose",
  icon: <ShieldAlert size={18} aria-hidden="true" />,
  scenarios: [
    {
      id: "chat-only",
      label: "Chat isolado",
      title: "Menor superfície, menor impacto",
      description: "Aplicação restrita a responder texto sem buscar conteúdo externo ou acionar ferramentas.",
      bullets: ["Foco em filtros e observação de saídas.", "Menor blast radius.", "Ainda pode sofrer manipulação de comportamento, mas com menos efeito operacional."],
      metrics: [
        { label: "superfície", value: "baixa" },
        { label: "impacto", value: "baixo/médio" },
      ],
      bars: [
        { label: "Necessidade de controles profundos", value: 0.42, display: "42%" },
        { label: "Impacto potencial", value: 0.28, display: "28%" },
      ],
    },
    {
      id: "rag-reader",
      label: "RAG com leitura",
      title: "Conteúdo externo passa a influenciar o sistema",
      description: "O principal desafio é tratar proveniência e confiança do conteúdo recuperado como parte da arquitetura.",
      bullets: ["Precisa de delimitação clara do conteúdo recuperado.", "Prompt injection indireta vira risco relevante.", "Observabilidade da recuperação se torna essencial."],
      metrics: [
        { label: "superfície", value: "média" },
        { label: "impacto", value: "médio" },
      ],
      bars: [
        { label: "Necessidade de controles profundos", value: 0.68, display: "68%" },
        { label: "Impacto potencial", value: 0.52, display: "52%" },
      ],
    },
    {
      id: "agentic-tools",
      label: "Agente com ferramentas",
      title: "Utilidade alta, dano potencial maior",
      description: "Ferramentas ampliam muito a importância de least privilege, aprovações e trilhas de auditoria.",
      bullets: ["Ação externa vira parte do problema.", "Controles de permissão são obrigatórios.", "Blast radius cresce rápido se o desenho for permissivo."],
      metrics: [
        { label: "superfície", value: "alta" },
        { label: "impacto", value: "alto" },
      ],
      bars: [
        { label: "Necessidade de controles profundos", value: 0.9, display: "90%" },
        { label: "Impacto potencial", value: 0.86, display: "86%" },
      ],
    },
  ],
});

export const interactions = {
  "trust-boundary-lab": trustBoundaryLab,
  "defense-depth-lab": defenseDepthLab,
  "attack-surface-scenarios": attackSurfaceScenarios,
} satisfies LessonModule["interactions"];
