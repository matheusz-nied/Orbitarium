import { createComputacaoVisuals } from "../_shared/factories";

export const visuals = createComputacaoVisuals({
  title: "Collections e Alocação",
  subtitle: "Escolhas de containers como política de posse, crescimento e memória",
  level: "Intermediário",
  tags: ["vec", "string", "&str", "hashmap", "capacidade", "heap"],
  conceptNodes: ["heap", "capacidade", "borrowing", "reuso"],
  pipelineSteps: [
    "escolher coleção",
    "reservar espaço",
    "inserir e crescer",
    "reusar ou clonar",
  ],
  leftLabel: "mais simplicidade",
  rightLabel: "mais controle",
  impactRows: [
    { label: "memória", value: "collections dinâmicas carregam custo de crescimento e realocação" },
    { label: "api", value: "aceitar slices e &str pode reduzir ownership desnecessário" },
    { label: "performance", value: "capacidade e reuso de buffers afetam cópias e alocações" },
    { label: "modelagem", value: "HashMap, Vec e String mudam a responsabilidade sobre os dados" },
  ],
});
