import type { LessonModule } from "../../../types/content";
import { createComputacaoVisuals } from "../_shared/factories";

const visualConfig = {
  title: "Sistemas de Tipos e Soundness",
  subtitle:
    "Tipos como prova parcial, progress e preservation em intuição prática, e o contraste entre Rust e Go",
  level: "Avançado",
  tags: [
    "Type Systems",
    "Soundness",
    "Rust",
    "Go",
    "Progress",
    "Preservation",
  ],
  conceptNodes: [
    "contrato estático",
    "prova parcial",
    "soundness",
    "escape hatch",
  ],
  pipelineSteps: [
    "atribuir tipos",
    "executar um passo",
    "preservar o contrato",
    "cruzar fronteiras",
  ],
  leftLabel: "tipos simples e previsíveis",
  rightLabel: "tipos mais expressivos",
  impactRows: [
    {
      label: "O que o tipo pega bem",
      value: "formas, operações compatíveis, capacidades e parte dos protocolos que a linguagem realmente modela",
    },
    {
      label: "O que costuma sobrar",
      value: "regras de negócio, bounds gerais, integração externa, desempenho real e ambiente de execução",
    },
    {
      label: "Promessa de Rust",
      value: "ownership e borrowing empurram validade e aliasing mais cedo para compile-time",
    },
    {
      label: "Promessa de Go",
      value: "tipagem útil e simples, com mais espaço para runtime, GC, tooling e disciplina de equipe",
    },
  ],
};

export const visuals =
  createComputacaoVisuals(visualConfig) satisfies LessonModule["visuals"];
