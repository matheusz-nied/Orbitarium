import type { LessonModule } from "../../../types/content";
import { createComputacaoVisuals } from "../_shared/factories";

const visualConfig = {
  "title": "Segurança de Memória",
  "subtitle": "Por que bugs como buffer overflow e use-after-free são mais do que crashes: eles podem virar execução arbitrária, vazamento e corrupção silenciosa.",
  "level": "Avançado",
  "tags": [
    "Memory Safety",
    "Buffer Overflow",
    "UAF",
    "Rust",
    "Sanitizers",
    "Exploit"
  ],
  "conceptNodes": [
    "Buffer overflow",
    "Use-after-free",
    "Dangling pointer",
    "Bounds check"
  ],
  "pipelineSteps": [
    "Alocação",
    "Acesso",
    "Liberação ou reutilização",
    "Detecção e mitigação"
  ],
  "leftLabel": "controle manual e performance",
  "rightLabel": "garantias automáticas e isolamento",
  "impactRows": [
    {
      "label": "Unidade crítica",
      "value": "o objeto e a validade do ponteiro ou referência que o alcança"
    },
    {
      "label": "Primeira etapa",
      "value": "Alocação"
    },
    {
      "label": "Erro comum",
      "value": "assumir que o programa está seguro porque passou nos testes funcionais do caminho feliz"
    },
    {
      "label": "Eixo de projeto",
      "value": "controle manual e performance ↔ garantias automáticas e isolamento"
    }
  ]
};

export const visuals = createComputacaoVisuals(visualConfig) satisfies LessonModule["visuals"];
