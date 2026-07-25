import type { LessonModule } from "../../../types/content";
import { createComputacaoVisuals } from "../_shared/factories";

const visualConfig = {
  title: "Capstone: Mesma Tarefa em Go e Rust",
  subtitle: "Decisão por critério: latência, memória, complexidade, operação e time",
  level: "Avançado",
  tags: [
    "Go",
    "Rust",
    "GC",
    "Ownership",
    "Latência",
    "Operações",
  ],
  conceptNodes: [
    "workload congelado",
    "critério explícito",
    "ops e diagnóstico",
    "fronteira híbrida",
  ],
  pipelineSteps: [
    "congelar workload",
    "instrumentar comparavelmente",
    "ler custo total",
    "escolher linguagem ou fronteira",
  ],
  leftLabel: "simplicidade operacional",
  rightLabel: "controle fino do runtime",
  impactRows: [
    {
      label: "Erro clássico",
      value: "comparar linguagens sem fixar o problema que precisa ser vencido",
    },
    {
      label: "Pergunta madura",
      value: "qual modelo reduz melhor o risco dominante desta mesma tarefa",
    },
    {
      label: "Critérios",
      value: "latência, memória, complexidade, operação, modelo de memória e time",
    },
    {
      label: "Saída possível",
      value: "Go, Rust ou fronteira híbrida com contrato bem escolhido",
    },
  ],
};

export const visuals =
  createComputacaoVisuals(visualConfig) satisfies LessonModule["visuals"];
