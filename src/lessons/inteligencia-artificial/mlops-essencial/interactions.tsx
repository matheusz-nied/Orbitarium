import { BarChart3, ShieldAlert, Sliders } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import {
  createScenarioExplorer,
  createSliderPlayground,
} from "../_shared/interactionFactories";

const pipelineMaturityLab = createSliderPlayground({
  eyebrow: "Maturidade",
  title: "Ajuste automação, versionamento e testes",
  description:
    "Veja como reprodutibilidade e velocidade dependem de bases organizadas, não só de scripts rodando sozinhos.",
  tone: "emerald",
  icon: <Sliders size={18} aria-hidden="true" />,
  initialState: {
    automation: 0.5,
    versioning: 0.55,
    tests: 0.45,
  },
  controls: [
    { key: "automation", label: "automação do pipeline", min: 0.1, max: 1, step: 0.05, formatValue: (value) => value.toFixed(2) },
    { key: "versioning", label: "qualidade do versionamento e lineage", min: 0.1, max: 1, step: 0.05, formatValue: (value) => value.toFixed(2) },
    { key: "tests", label: "cobertura de testes e validações", min: 0.1, max: 1, step: 0.05, formatValue: (value) => value.toFixed(2) },
  ],
  compute: ({ automation, versioning, tests }) => {
    const reproducibility = Math.max(0, Math.min(1, versioning * 0.55 + tests * 0.25 + automation * 0.2));
    const delivery = Math.max(0, Math.min(1, automation * 0.6 + tests * 0.2 + versioning * 0.2));
    const fragility = Math.max(0, Math.min(1, 1 - reproducibility * 0.55 - tests * 0.25 - automation * 0.2 + 0.15));
    return {
      metrics: [
        { label: "reprodutibilidade", value: `${(reproducibility * 100).toFixed(0)}%` },
        { label: "fluidez de entrega", value: `${(delivery * 100).toFixed(0)}%` },
        { label: "fragilidade operacional", value: `${(fragility * 100).toFixed(0)}%` },
        { label: "perfil", value: reproducibility < 0.5 ? "artesanal" : "controlado" },
      ],
      bars: [
        { label: "Reproduzir experimentos", value: reproducibility, display: `${(reproducibility * 100).toFixed(0)}%` },
        { label: "Entregar versões", value: delivery, display: `${(delivery * 100).toFixed(0)}%` },
        { label: "Risco invisível", value: fragility, display: `${(fragility * 100).toFixed(0)}%` },
      ],
      narrative:
        versioning < 0.4
          ? "Sem lineage confiável, a automação roda, mas ninguém consegue provar exatamente o que foi para produção."
          : automation > 0.75 && tests < 0.4
            ? "Você ganhou velocidade, mas não garantiu contenção. Automação sem testes só acelera o erro."
            : "O sistema começa a se tornar repetível: o time não depende só de memória e boa vontade para reproduzir e promover versões.",
      footer:
        "Maturidade vem quando automação, versionamento e testes se sustentam mutuamente.",
    };
  },
});

const releaseRiskLab = createSliderPlayground({
  eyebrow: "Release",
  title: "Relacione passos manuais, monitoramento e rollback",
  description:
    "A segurança de um deploy de ML depende tanto das travas antes quanto do caminho de saída depois.",
  tone: "teal",
  icon: <BarChart3 size={18} aria-hidden="true" />,
  initialState: {
    manualSteps: 0.5,
    monitoring: 0.55,
    rollback: 0.45,
  },
  controls: [
    { key: "manualSteps", label: "dependência de passos manuais", min: 0, max: 1, step: 0.05, formatValue: (value) => value.toFixed(2) },
    { key: "monitoring", label: "cobertura de monitoramento", min: 0.1, max: 1, step: 0.05, formatValue: (value) => value.toFixed(2) },
    { key: "rollback", label: "prontidão para rollback", min: 0.1, max: 1, step: 0.05, formatValue: (value) => value.toFixed(2) },
  ],
  compute: ({ manualSteps, monitoring, rollback }) => {
    const incidentRisk = Math.max(0, Math.min(1, manualSteps * 0.45 + (1 - monitoring) * 0.3 + (1 - rollback) * 0.25));
    const detection = Math.max(0, Math.min(1, monitoring * 0.7 + rollback * 0.3));
    const releaseConfidence = Math.max(0, Math.min(1, detection * 0.6 + (1 - manualSteps) * 0.2 + rollback * 0.2));
    return {
      metrics: [
        { label: "risco de incidente", value: `${(incidentRisk * 100).toFixed(0)}%` },
        { label: "capacidade de detecção", value: `${(detection * 100).toFixed(0)}%` },
        { label: "confiança no release", value: `${(releaseConfidence * 100).toFixed(0)}%` },
        { label: "perfil", value: incidentRisk > 0.55 ? "vulnerável" : "protegido" },
      ],
      bars: [
        { label: "Risco acumulado", value: incidentRisk, display: `${(incidentRisk * 100).toFixed(0)}%` },
        { label: "Descobrir rápido", value: detection, display: `${(detection * 100).toFixed(0)}%` },
        { label: "Voltar atrás com segurança", value: rollback, display: `${(rollback * 100).toFixed(0)}%` },
      ],
      narrative:
        rollback < 0.3
          ? "Sem rollback pronto, qualquer promoção vira aposta longa. Mesmo detectando o problema, o time demora a reduzir exposição."
          : manualSteps > 0.7
            ? "Muitos pontos manuais criam inconsistência e tornam o processo dependente de contexto implícito."
            : "A combinação está mais saudável: dá para promover com mais confiança porque existe detecção e rota de saída claras.",
      footer:
        "Release seguro não é o que nunca falha; é o que falha de forma detectável e reversível.",
    };
  },
});

const teamTopologies = createScenarioExplorer({
  eyebrow: "Organização",
  title: "Compare topologias de time e plataforma",
  description:
    "Nem todo time precisa da mesma pilha. O importante é casar complexidade de ferramenta com maturidade e risco reais.",
  tone: "rose",
  icon: <ShieldAlert size={18} aria-hidden="true" />,
  scenarios: [
    {
      id: "artesanal-disciplinado",
      label: "Artesanal disciplinado",
      title: "Pouca automação, muito critério",
      description: "Bom para times pequenos que ainda conseguem manter clareza com poucos modelos e forte disciplina manual.",
      bullets: ["Baixo custo inicial.", "Risco de gargalo humano ao crescer.", "Depende fortemente de documentação e ownership."],
      metrics: [
        { label: "complexidade", value: "baixa" },
        { label: "escala", value: "limitada" },
      ],
      bars: [
        { label: "Velocidade inicial", value: 0.72, display: "72%" },
        { label: "Escalabilidade futura", value: 0.38, display: "38%" },
      ],
    },
    {
      id: "plataforma-enxuta",
      label: "Plataforma enxuta",
      title: "Guardrails antes de burocracia",
      description: "Modelo comum em equipes em crescimento: algumas automações centrais e processos objetivos de promoção e rollback.",
      bullets: ["Bom equilíbrio entre custo e controle.", "Permite padronizar sem engessar demais.", "Exige priorização clara do que automatizar primeiro."],
      metrics: [
        { label: "complexidade", value: "média" },
        { label: "escala", value: "boa" },
      ],
      bars: [
        { label: "Velocidade inicial", value: 0.62, display: "62%" },
        { label: "Escalabilidade futura", value: 0.76, display: "76%" },
      ],
    },
    {
      id: "plataforma-madura",
      label: "Plataforma madura",
      title: "Muitos modelos, contratos e automação forte",
      description: "Necessária quando vários times compartilham dados, modelos e releases com forte necessidade de governança.",
      bullets: ["Grande capacidade de padronização.", "Mais custo de construção e manutenção da plataforma.", "Compensa apenas quando a escala realmente exige."],
      metrics: [
        { label: "complexidade", value: "alta" },
        { label: "escala", value: "muito alta" },
      ],
      bars: [
        { label: "Velocidade inicial", value: 0.36, display: "36%" },
        { label: "Escalabilidade futura", value: 0.92, display: "92%" },
      ],
    },
  ],
});

export const interactions = {
  "pipeline-maturity-lab": pipelineMaturityLab,
  "release-risk-lab": releaseRiskLab,
  "team-topologies": teamTopologies,
} satisfies LessonModule["interactions"];
