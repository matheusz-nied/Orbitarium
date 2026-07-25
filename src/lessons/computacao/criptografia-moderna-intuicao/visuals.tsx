import type { LessonModule } from "../../../types/content";
import { createComputacaoVisuals } from "../_shared/factories";

const visualConfig = {
  "title": "Criptografia Moderna (Intuição)",
  "subtitle": "Chaves, sigilo, autenticidade e protocolos: como pensar cifragem sem misturar hash, cifra e assinatura no mesmo saco.",
  "level": "Intermediário",
  "tags": [
    "Criptografia",
    "TLS",
    "Assinaturas",
    "AES",
    "Chaves",
    "Segurança"
  ],
  "conceptNodes": [
    "Criptografia simétrica",
    "Criptografia assimétrica",
    "Nonce",
    "AEAD"
  ],
  "pipelineSteps": [
    "Estabelecimento de chaves",
    "Cifra e autenticação",
    "Verificação de origem",
    "Rotação e revogação"
  ],
  "leftLabel": "simplicidade operacional",
  "rightLabel": "garantias criptográficas fortes",
  "impactRows": [
    {
      "label": "Unidade crítica",
      "value": "a relação entre chave, nonce e mensagem"
    },
    {
      "label": "Primeira etapa",
      "value": "Estabelecimento de chaves"
    },
    {
      "label": "Erro comum",
      "value": "confundir hash, cifra e assinatura como se fossem técnicas intercambiáveis"
    },
    {
      "label": "Eixo de projeto",
      "value": "simplicidade operacional ↔ garantias criptográficas fortes"
    }
  ]
};

export const visuals = createComputacaoVisuals(visualConfig) satisfies LessonModule["visuals"];
