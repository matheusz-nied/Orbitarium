import { BarChart3, ShieldAlert, Sliders } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import {
  createScenarioExplorer,
  createSliderPlayground,
} from "../_shared/interactionFactories";

const dataMinimizationLab = createSliderPlayground({
  eyebrow: "Minimização",
  title: "Ajuste escopo de coleta, retenção e clareza de propósito",
  description:
    "Privacidade melhora quando o sistema coleta menos, guarda por menos tempo e sabe por que está guardando.",
  tone: "indigo",
  icon: <Sliders size={18} aria-hidden="true" />,
  initialState: {
    collectionScope: 0.55,
    retention: 0.55,
    purposeClarity: 0.5,
  },
  controls: [
    { key: "collectionScope", label: "escopo de coleta", min: 0.1, max: 1, step: 0.05, formatValue: (value) => value.toFixed(2) },
    { key: "retention", label: "retenção relativa", min: 0.1, max: 1, step: 0.05, formatValue: (value) => value.toFixed(2) },
    { key: "purposeClarity", label: "clareza de propósito", min: 0.1, max: 1, step: 0.05, formatValue: (value) => value.toFixed(2) },
  ],
  compute: ({ collectionScope, retention, purposeClarity }) => {
    const privacyRisk = Math.max(0, Math.min(1, collectionScope * 0.4 + retention * 0.35 + (1 - purposeClarity) * 0.25));
    const discipline = Math.max(0, Math.min(1, purposeClarity * 0.55 + (1 - collectionScope) * 0.2 + (1 - retention) * 0.25));
    const cleanupBurden = Math.max(0, Math.min(1, collectionScope * 0.35 + retention * 0.45 + (1 - purposeClarity) * 0.2));
    return {
      metrics: [
        { label: "risco estrutural", value: `${(privacyRisk * 100).toFixed(0)}%` },
        { label: "disciplina de governança", value: `${(discipline * 100).toFixed(0)}%` },
        { label: "custo futuro de limpeza", value: `${(cleanupBurden * 100).toFixed(0)}%` },
        { label: "perfil", value: privacyRisk > 0.6 ? "coleta excessiva" : "enxuto" },
      ],
      bars: [
        { label: "Exposição potencial", value: privacyRisk, display: `${(privacyRisk * 100).toFixed(0)}%` },
        { label: "Clareza de propósito", value: discipline, display: `${(discipline * 100).toFixed(0)}%` },
        { label: "Dívida de privacidade", value: cleanupBurden, display: `${(cleanupBurden * 100).toFixed(0)}%` },
      ],
      narrative:
        collectionScope > 0.75 && purposeClarity < 0.45
          ? "O sistema está acumulando dado demais para um propósito mal definido. Isso é a receita clássica para vazamento futuro e justificativa fraca."
          : retention > 0.75
            ? "Mesmo com coleta moderada, retenção longa prolonga a janela de exposição e aumenta o custo de governança."
            : "Aqui a postura é mais saudável: menos dados desnecessários entram e menos resíduo precisa ser controlado depois.",
      footer:
        "Minimização reduz o problema antes que redaction, alertas e auditorias precisem persegui-lo em dezenas de lugares.",
    };
  },
});

const piiExposureLab = createSliderPlayground({
  eyebrow: "Exposição",
  title: "Relacione logs, acesso e cobertura de redaction",
  description:
    "Boa detecção ajuda, mas a combinação entre logging amplo e acesso frouxo continua perigosa.",
  tone: "teal",
  icon: <BarChart3 size={18} aria-hidden="true" />,
  initialState: {
    logScope: 0.55,
    accessControl: 0.5,
    redaction: 0.45,
  },
  controls: [
    { key: "logScope", label: "escopo dos logs e traces", min: 0.1, max: 1, step: 0.05, formatValue: (value) => value.toFixed(2) },
    { key: "accessControl", label: "força do controle de acesso", min: 0.1, max: 1, step: 0.05, formatValue: (value) => value.toFixed(2) },
    { key: "redaction", label: "cobertura de redaction/de-identification", min: 0.1, max: 1, step: 0.05, formatValue: (value) => value.toFixed(2) },
  ],
  compute: ({ logScope, accessControl, redaction }) => {
    const exposure = Math.max(0, Math.min(1, logScope * 0.45 + (1 - accessControl) * 0.3 + (1 - redaction) * 0.25));
    const diagnosability = Math.max(0, Math.min(1, logScope * 0.35 + accessControl * 0.15 + redaction * 0.5));
    const containment = Math.max(0, Math.min(1, accessControl * 0.45 + redaction * 0.4 + (1 - logScope) * 0.15));
    return {
      metrics: [
        { label: "exposição provável", value: `${(exposure * 100).toFixed(0)}%` },
        { label: "capacidade de diagnóstico", value: `${(diagnosability * 100).toFixed(0)}%` },
        { label: "contenção", value: `${(containment * 100).toFixed(0)}%` },
        { label: "perfil", value: exposure > 0.6 ? "vazável" : "contido" },
      ],
      bars: [
        { label: "Risco nos logs", value: exposure, display: `${(exposure * 100).toFixed(0)}%` },
        { label: "Valor operacional do rastreio", value: diagnosability, display: `${(diagnosability * 100).toFixed(0)}%` },
        { label: "Barreiras de proteção", value: containment, display: `${(containment * 100).toFixed(0)}%` },
      ],
      narrative:
        logScope > 0.75 && redaction < 0.4
          ? "O sistema coleta rastros ricos demais sem tratamento suficiente. Debugging fica fácil, mas privacidade vira passivo permanente."
          : accessControl < 0.4
            ? "Mesmo com alguma redaction, acesso frouxo amplia muito a superfície. Quem não precisa ver o dado não deveria conseguir vê-lo."
            : "A combinação está mais madura: a observabilidade continua útil sem expor o texto bruto para gente e lugares demais.",
      footer:
        "Privacidade saudável tenta preservar valor de diagnóstico sem transformar a observabilidade em segundo banco de dados sensível.",
    };
  },
});

const privacyDesignScenarios = createScenarioExplorer({
  eyebrow: "Cenários",
  title: "Compare posturas de privacidade por desenho",
  description:
    "Arquiteturas diferentes aceitam graus diferentes de coleta, retenção e uso secundário de dados.",
  tone: "rose",
  icon: <ShieldAlert size={18} aria-hidden="true" />,
  scenarios: [
    {
      id: "ephemeral-assistant",
      label: "Assistente efêmero",
      title: "Pouca retenção e escopo limitado",
      description: "Foca em responder a interação atual e minimizar o rastro persistido para análise posterior.",
      bullets: ["Menor superfície de privacidade.", "Menos material para depuração histórica profunda.", "Boa escolha quando o custo de exposição é alto."],
      metrics: [
        { label: "exposição", value: "baixa" },
        { label: "diagnóstico histórico", value: "médio/baixo" },
      ],
      bars: [
        { label: "Risco estrutural", value: 0.26, display: "26%" },
        { label: "Conforto de observação", value: 0.42, display: "42%" },
      ],
    },
    {
      id: "analytics-heavy",
      label: "Analytics pesado",
      title: "Muita coleta, muito cuidado necessário",
      description: "Busca maximizar rastreamento e análise, mas exige governança forte para não acumular passivo sensível demais.",
      bullets: ["Grande valor analítico aparente.", "Risco de exposição e retenção cresce rápido.", "Vendor e acesso precisam de controle rigoroso."],
      metrics: [
        { label: "exposição", value: "alta" },
        { label: "diagnóstico histórico", value: "alto" },
      ],
      bars: [
        { label: "Risco estrutural", value: 0.84, display: "84%" },
        { label: "Conforto de observação", value: 0.88, display: "88%" },
      ],
    },
    {
      id: "regulated-workflow",
      label: "Fluxo regulado",
      title: "Detecção, masking e acesso forte por padrão",
      description: "Combina redaction, políticas de retenção curtas e privilégios rigorosos em ambientes sensíveis.",
      bullets: ["Boa contenção de risco.", "Maior custo de desenho e governança.", "Adequado quando o dano potencial de exposição é alto."],
      metrics: [
        { label: "exposição", value: "média/baixa" },
        { label: "diagnóstico histórico", value: "médio" },
      ],
      bars: [
        { label: "Risco estrutural", value: 0.38, display: "38%" },
        { label: "Conforto de observação", value: 0.58, display: "58%" },
      ],
    },
  ],
});

export const interactions = {
  "data-minimization-lab": dataMinimizationLab,
  "pii-exposure-simulator": piiExposureLab,
  "privacy-design-scenarios": privacyDesignScenarios,
} satisfies LessonModule["interactions"];
