import { createComputacaoVisuals } from "../_shared/factories";

export const visuals = createComputacaoVisuals({
  title: "Tipos, Traits e Zero-Cost",
  subtitle: "Modelar melhor o domínio e abstrair sem custo estrutural desnecessário",
  level: "Intermediário",
  tags: ["tipos", "traits", "enum", "dispatch", "iterators", "monomorfização"],
  conceptNodes: ["invariantes", "traits", "genéricos", "iterators"],
  pipelineSteps: [
    "modelar tipo",
    "definir capacidade",
    "especializar código",
    "medir resultado",
  ],
  leftLabel: "mais flexibilidade",
  rightLabel: "mais especialização",
  impactRows: [
    { label: "domínio", value: "tipos e enums reduzem estados inválidos logo na interface" },
    { label: "api", value: "traits descrevem capacidades sem prender tudo a uma hierarquia única" },
    { label: "performance", value: "genéricos podem virar código concreto otimizado em compilação" },
    { label: "trade-off", value: "dispatch dinâmico compra extensibilidade ao custo de indireção" },
  ],
});
