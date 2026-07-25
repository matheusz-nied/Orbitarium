import { AlertTriangle, BookCheck, ShieldCheck } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import {
  createScenarioExplorer,
  createSliderPlayground,
} from "../_shared/interactionFactories";

const hallucinationRiskLab = createSliderPlayground({
  eyebrow: "Risco de alucinação",
  title: "Equilibre contexto, ambiguidade e liberdade de resposta",
  description:
    "Ajuste os controles para ver como a chance de improviso cresce quando falta evidência e o sistema pressiona o modelo a responder mesmo assim.",
  tone: "amber",
  icon: <AlertTriangle size={18} aria-hidden="true" />,
  initialState: {
    context: 0.55,
    ambiguity: 0.45,
    abstention: 0.35,
  },
  controls: [
    {
      key: "context",
      label: "força do contexto/evidência disponível",
      min: 0.05,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
    {
      key: "ambiguity",
      label: "ambiguidade do pedido",
      min: 0,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
    {
      key: "abstention",
      label: "liberdade para dizer 'não sei'",
      min: 0,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
  ],
  compute: ({ context, ambiguity, abstention }) => {
    const grounding = Math.min(1, context * 0.85 + abstention * 0.15);
    const pressure = Math.max(0, ambiguity * 0.6 + (1 - abstention) * 0.5);
    const hallucinationRisk = Math.min(1, (1 - context) * 0.55 + ambiguity * 0.35 + (1 - abstention) * 0.25);

    return {
      metrics: [
        { label: "grounding útil", value: `${(grounding * 100).toFixed(0)}%` },
        { label: "pressão para improvisar", value: `${(pressure * 100).toFixed(0)}%` },
        { label: "risco estimado", value: `${(hallucinationRisk * 100).toFixed(0)}%` },
        { label: "política dominante", value: abstention > 0.6 ? "prudente" : ambiguity > 0.6 ? "arriscada" : "mista" },
      ],
      bars: [
        { label: "Evidência acionável", value: grounding, display: `${(grounding * 100).toFixed(0)}%` },
        { label: "Necessidade de inferir", value: pressure, display: `${(pressure * 100).toFixed(0)}%` },
        { label: "Chance de inventar", value: hallucinationRisk, display: `${(hallucinationRisk * 100).toFixed(0)}%` },
      ],
      narrative:
        context < 0.3 && abstention < 0.3
          ? "Aqui o sistema cria o pior cenário clássico: pouco apoio factual e pouca permissão para reconhecer limite. O modelo fica empurrado a completar o vazio com algo plausível."
          : abstention > 0.7 && context > 0.55
            ? "Neste regime, o sistema favorece respostas melhor ancoradas. Se faltar base, o modelo pode pedir mais dados ou recusar extrapolar além da evidência."
            : "O risco não depende só do modelo. Ele nasce da combinação entre qualidade do contexto, clareza da tarefa e política que autoriza ou proíbe prudência.",
      footer:
        "Reduzir alucinação não é apenas 'mandar o modelo tomar cuidado'; é dar contexto e permitir comportamento epistemicamente honesto.",
    };
  },
});

const groundingModes = createScenarioExplorer({
  eyebrow: "Modos de grounding",
  title: "Compare políticas de resposta",
  description:
    "Diferentes aplicações pedem diferentes graus de liberdade. Compare o que muda quando o sistema depende só da memória paramétrica, usa documentos ou prefere abstenção prudente.",
  tone: "teal",
  icon: <BookCheck size={18} aria-hidden="true" />,
  scenarios: [
    {
      id: "parametric-only",
      label: "Memória paramétrica",
      title: "Rápido, mas mais vulnerável a lacunas ocultas",
      description:
        "O modelo responde com base no que internalizou no treinamento, sem apoio explícito em documentos do momento da consulta.",
      bullets: [
        "Útil para tarefas amplas e de baixo risco.",
        "Pode parecer confiante mesmo quando a lembrança está incompleta ou desatualizada.",
        "Não oferece evidência explícita por padrão.",
      ],
      metrics: [
        { label: "flexibilidade", value: "alta" },
        { label: "verificabilidade", value: "baixa" },
      ],
      bars: [
        { label: "Velocidade de resposta", value: 0.86, display: "86%" },
        { label: "Apoio documental", value: 0.18, display: "18%" },
      ],
    },
    {
      id: "document-grounded",
      label: "Com documentos",
      title: "Mais ancoragem, mais rastreabilidade",
      description:
        "O sistema traz contexto relevante e instrui o modelo a responder a partir dele, idealmente citando ou sinalizando a fonte usada.",
      bullets: [
        "Costuma reduzir improviso factual.",
        "Permite atualizar conhecimento sem retreinar todo o modelo.",
        "Ainda depende da qualidade do retrieval e da interpretação do texto recuperado.",
      ],
      metrics: [
        { label: "flexibilidade", value: "média" },
        { label: "verificabilidade", value: "alta" },
      ],
      bars: [
        { label: "Velocidade de resposta", value: 0.62, display: "62%" },
        { label: "Apoio documental", value: 0.82, display: "82%" },
      ],
    },
    {
      id: "abstain-first",
      label: "Abstenção prudente",
      title: "Quando faltar base, o sistema freia",
      description:
        "A política prioriza declarar incerteza, pedir mais contexto ou encaminhar para validação em vez de completar a lacuna automaticamente.",
      bullets: [
        "Útil em saúde, jurídico, finanças e contextos regulados.",
        "Diminui risco de resposta inventada com aparência profissional.",
        "Pode parecer menos 'mágico', mas frequentemente é mais confiável.",
      ],
      metrics: [
        { label: "utilidade aberta", value: "moderada" },
        { label: "prudência", value: "muito alta" },
      ],
      bars: [
        { label: "Cobertura de respostas", value: 0.48, display: "48%" },
        { label: "Redução de risco", value: 0.88, display: "88%" },
      ],
    },
  ],
});

const responsePolicyScenarios = createScenarioExplorer({
  eyebrow: "Mitigação",
  title: "Escolha a política certa para o custo do erro",
  description:
    "O melhor comportamento depende do que é pior na sua aplicação: responder pouco ou responder inventando.",
  tone: "rose",
  icon: <ShieldCheck size={18} aria-hidden="true" />,
  scenarios: [
    {
      id: "chat-open",
      label: "Chat aberto",
      title: "Mais utilidade conversacional, mais vigilância necessária",
      description:
        "Aplicações abertas tendem a aceitar mais exploração, mas precisam de observabilidade para detectar quando a fluidez vira improviso sem base.",
      bullets: [
        "Boa experiência de uso geral.",
        "Maior risco em perguntas factuais específicas ou muito recentes.",
        "Beneficia-se de nudges de prudência e pedidos de clarificação.",
      ],
      metrics: [
        { label: "utilidade percebida", value: "alta" },
        { label: "risco factual", value: "médio-alto" },
      ],
      bars: [
        { label: "Cobertura", value: 0.82, display: "82%" },
        { label: "Risco", value: 0.64, display: "64%" },
      ],
    },
    {
      id: "rag-guarded",
      label: "RAG com guardrails",
      title: "Bom equilíbrio entre utilidade e rastreabilidade",
      description:
        "O sistema recupera contexto relevante, pede resposta apoiada no material e limita extrapolações sem evidência.",
      bullets: [
        "Forte para suporte, documentação e base de conhecimento.",
        "Ainda pode falhar se o chunk ou o ranking estiverem ruins.",
        "Permite inspeção posterior do que sustentou a resposta.",
      ],
      metrics: [
        { label: "utilidade", value: "alta" },
        { label: "auditabilidade", value: "alta" },
      ],
      bars: [
        { label: "Cobertura", value: 0.74, display: "74%" },
        { label: "Risco", value: 0.31, display: "31%" },
      ],
    },
    {
      id: "human-review",
      label: "Revisão humana",
      title: "Mais fricção, mais segurança em contextos críticos",
      description:
        "A IA propõe um rascunho, mas a decisão final depende de um humano ou de uma checagem formal antes do uso externo.",
      bullets: [
        "Útil quando o custo do erro é alto.",
        "Transforma o modelo em copiloto, não em fonte final de verdade.",
        "Exige desenho de workflow e UX apropriados.",
      ],
      metrics: [
        { label: "autonomia", value: "baixa" },
        { label: "segurança operacional", value: "muito alta" },
      ],
      bars: [
        { label: "Cobertura automática", value: 0.42, display: "42%" },
        { label: "Risco", value: 0.16, display: "16%" },
      ],
    },
  ],
});

export const interactions = {
  "hallucination-risk-lab": hallucinationRiskLab,
  "grounding-modes": groundingModes,
  "response-policy-scenarios": responsePolicyScenarios,
} satisfies LessonModule["interactions"];
