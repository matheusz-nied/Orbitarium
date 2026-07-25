import type { LessonModule } from "../../../types/content";
import { createComputacaoVisuals } from "../_shared/factories";

const visualConfig = {
  "title": "Mindset de Undefined Behavior",
  "subtitle": "UB não é 'azar em produção': é quebrar contratos que o compilador usa para otimizar e raciocinar sobre seu programa.",
  "level": "Avançado",
  "tags": [
    "Undefined Behavior",
    "Unsafe",
    "Aliasing",
    "Rustonomicon",
    "References",
    "Invariants"
  ],
  "conceptNodes": [
    "invariantes",
    "aliasing",
    "validade",
    "UnsafeCell"
  ],
  "pipelineSteps": [
    "Declarar a promessa",
    "Manipular sem quebrar",
    "Fechar a fronteira",
    "Revalidar continuamente"
  ],
  "leftLabel": "intuição sem contrato",
  "rightLabel": "invariantes explícitas",
  "impactRows": [
    {
      "label": "Unidade crítica",
      "value": "a invariante que torna o acesso válido e otimizável"
    },
    {
      "label": "Primeira etapa",
      "value": "declarar qual promessa de validade, aliasing ou inicialização o trecho exige"
    },
    {
      "label": "Erro comum",
      "value": "trocar prova por intuição porque o teste local passou"
    },
    {
      "label": "Eixo de projeto",
      "value": "intuição sem contrato ↔ invariantes explícitas"
    }
  ]
};

export const visuals = createComputacaoVisuals(visualConfig) satisfies LessonModule["visuals"];
