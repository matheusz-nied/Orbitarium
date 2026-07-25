import { createComputacaoVisuals } from "../_shared/factories";

export const visuals = createComputacaoVisuals({
  title: "Lifetimes (Intuição)",
  subtitle: "Relações de validade entre referências, escopos e retornos",
  level: "Avançado",
  tags: ["lifetimes", "escopo", "elision", "outlives", "'static", "borrows"],
  conceptNodes: ["escopo", "referência", "relação", "retorno"],
  pipelineSteps: [
    "criar referência",
    "sobrepor escopos",
    "ligar retorno",
    "provar validade",
  ],
  leftLabel: "mais borrowing",
  rightLabel: "mais ownership",
  impactRows: [
    { label: "assinaturas", value: "lifetimes tornam dependências de validade visíveis na interface" },
    { label: "arquitetura", value: "borrows prolongados podem acoplar módulos e structs" },
    { label: "ergonomia", value: "elision cobre o óbvio, anotações aparecem quando a relação é ambígua" },
    { label: "manutenção", value: "possuir dados em pontos certos pode simplificar o sistema inteiro" },
  ],
});
