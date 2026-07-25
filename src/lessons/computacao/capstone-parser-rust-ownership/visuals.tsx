import type { LessonModule } from "../../../types/content";
import { createComputacaoVisuals } from "../_shared/factories";

const visualConfig = {
  title: "Capstone: Parser/Buffer em Rust",
  subtitle: "Ownership do buffer, zero-copy com critério e fronteiras seguras",
  level: "Avançado",
  tags: [
    "Rust",
    "Parser",
    "Ownership",
    "Lifetimes",
    "Zero-Copy",
    "Buffers",
  ],
  conceptNodes: [
    "dono do buffer",
    "saída borrowed",
    "fronteira owned",
    "retenção evitável",
  ],
  pipelineSteps: [
    "reproduzir sintoma",
    "mapear cópias e donos",
    "escolher fronteira",
    "verificar hipótese",
  ],
  leftLabel: "materializar cedo",
  rightLabel: "zero-copy agressivo",
  impactRows: [
    {
      label: "Pergunta central",
      value: "quem realmente possui os bytes que o parser está expondo",
    },
    {
      label: "Sinal útil",
      value: "clones repetidos, buffers retidos ou lifetime espalhado pela pipeline",
    },
    {
      label: "Fronteira madura",
      value: "borrowing no hot path e ownership explícita ao cruzar tempo ou camada",
    },
    {
      label: "Erro comum",
      value: "tratar zero-copy como objetivo absoluto em vez de ferramenta contextual",
    },
  ],
};

export const visuals =
  createComputacaoVisuals(visualConfig) satisfies LessonModule["visuals"];
