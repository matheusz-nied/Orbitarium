import type { LessonModule } from "../../../types/content";
import { createComputacaoInteractions } from "../_shared/factories";

const interactionConfig = {
  "title": "Hashes e Integridade",
  "pipelineSteps": [
    {
      "name": "Entrada de bytes",
      "summary": "O algoritmo lê exatamente a sequência de bytes fornecida.",
      "signal": "fonte de dados",
      "risk": "comparar entradas diferentes",
      "takeaway": "Hash é sensível até a pequenas mudanças."
    },
    {
      "name": "Mistura interna",
      "summary": "Rodadas internas condensam a entrada em um estado menor.",
      "signal": "algoritmo escolhido",
      "risk": "supor propriedades que ele não oferece",
      "takeaway": "Nem todo hash serve para segurança."
    },
    {
      "name": "Digest final",
      "summary": "Um valor fixo representa aquela entrada para fins de comparação.",
      "signal": "digest size",
      "risk": "colar confiança no valor bruto",
      "takeaway": "Digest sem contexto não decide autenticidade."
    },
    {
      "name": "Comparação confiável",
      "summary": "O digest só ajuda quando comparado com uma referência protegida.",
      "signal": "cadeia de confiança",
      "risk": "referência adulterada",
      "takeaway": "Integridade depende do que você confia."
    }
  ],
  "leftLabel": "velocidade e conveniência",
  "rightLabel": "resistência criptográfica",
  "tradeoffSummary": "Algoritmos muito rápidos e simples ajudam em checksum e deduplicação, mas cenários adversariais pedem funções desenhadas para resistir a colisões e ataques de pré-imagem.",
  "tradeoffRisks": [
    "Ótima velocidade, mas propriedades fracas para cenários adversariais.",
    "Boa relação entre custo e robustez para muitos usos de integridade.",
    "Segurança maior, com custo computacional mais alto e mais cuidado operacional.",
    "Usar pouca proteção diante de adversário é pior do que gastar alguns ciclos extras."
  ],
  "practiceRule": "separe integridade de autenticidade e escolha o algoritmo pelo modelo de ameaça, não pelo costume",
  "scenarios": [
    {
      "name": "Download de artefato",
      "situation": "Um time baixa um modelo grande e quer saber se o arquivo chegou íntegro.",
      "choice": "Comparar o digest com uma referência publicada por um canal confiável e, idealmente, assinada.",
      "why": "O valor do hash depende da confiança na referência comparada.",
      "caution": "Se o mesmo atacante troca arquivo e hash, a comparação perde valor."
    },
    {
      "name": "Deduplicação interna",
      "situation": "Um sistema quer identificar blobs repetidos para economizar armazenamento.",
      "choice": "Usar hash como índice eficiente, entendendo o risco de colisão e a necessidade de confirmação quando o caso exigir.",
      "why": "Aqui o objetivo é performance e organização, não autenticidade contra adversário.",
      "caution": "Não confunda deduplicação interna com verificação criptográfica pública."
    },
    {
      "name": "Supply chain",
      "situation": "Uma pipeline consome dependências produzidas por terceiros.",
      "choice": "Combinar hashes com assinaturas, versionamento e origem verificável.",
      "why": "Integridade isolada não resolve confiança na fonte.",
      "caution": "Sem cadeia de confiança, o valor do digest pode ser tão enganoso quanto o arquivo."
    }
  ]
};

export const interactions = createComputacaoInteractions(interactionConfig) satisfies LessonModule["interactions"];
