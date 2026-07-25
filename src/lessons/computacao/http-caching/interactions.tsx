import type { LessonModule } from "../../../types/content";
import { createComputacaoInteractions } from "../_shared/factories";

const interactionConfig = {
  "title": "HTTP Caching",
  "pipelineSteps": [
    {
      "name": "Armazenamento com política",
      "summary": "A resposta chega com cabeçalhos que definem se pode ser guardada e por quanto tempo.",
      "signal": "Cache-Control",
      "risk": "guardar o que não deveria",
      "takeaway": "Cache começa na política."
    },
    {
      "name": "Freshness check",
      "summary": "O cliente ou intermediário decide se a resposta ainda está fresca.",
      "signal": "max-age and age",
      "risk": "stale silencioso",
      "takeaway": "Reaproveitar não é o mesmo que revalidar."
    },
    {
      "name": "Revalidação",
      "summary": "Se não estiver fresca, validadores como ETag ou Last-Modified perguntam se algo mudou.",
      "signal": "304",
      "risk": "confundir 304 com resposta completa",
      "takeaway": "Revalidar economiza bytes sem abrir mão de controle."
    },
    {
      "name": "Invalidação prática",
      "summary": "Mudanças de conteúdo exigem versionamento, purge ou políticas mais curtas.",
      "signal": "deploy cadence",
      "risk": "asset preso em clientes",
      "takeaway": "Sem estratégia de invalidação, cache vira loteria."
    }
  ],
  "leftLabel": "frescor imediato",
  "rightLabel": "reaproveitamento agressivo",
  "tradeoffSummary": "Quanto mais você reaproveita respostas, menor fica a latência e a carga na origem - mas maior precisa ser a disciplina para distinguir conteúdo imutável, revalidável e privado.",
  "tradeoffRisks": [
    "Conteúdo sempre fresco, com pouca economia de round trip ou carga.",
    "Bom equilíbrio para recursos mutáveis, usando validação explícita.",
    "Ótimo reaproveitamento para assets e dados apropriados, com disciplina de versionamento.",
    "Cache agressivo em conteúdo errado produz stale data ou vazamento de contexto."
  ],
  "practiceRule": "separe assets imutáveis, recursos revalidáveis e respostas privadas antes de escolher cabeçalhos",
  "scenarios": [
    {
      "name": "Bundle versionado",
      "situation": "Um arquivo JS muda só quando o hash do build muda.",
      "choice": "Usar cache longo e imutável com versionamento no nome do asset.",
      "why": "Quando o identificador muda, o cache antigo deixa de ser relevante.",
      "caution": "Sem versionamento, cache longo prende byte velho nos clientes."
    },
    {
      "name": "API de catálogo",
      "situation": "Um endpoint muda de tempos em tempos, mas não a cada request.",
      "choice": "Combinar freshness moderada com revalidação por ETag ou Last-Modified.",
      "why": "A origem pode economizar bytes sem abrir mão de correção.",
      "caution": "Confundir dado público com dado por usuário quebra a política."
    },
    {
      "name": "Dashboard pessoal",
      "situation": "Cada usuário vê informações privadas e altamente mutáveis.",
      "choice": "Usar política privada ou sem armazenamento compartilhado e revisar Vary quando necessário.",
      "why": "A semântica de reaproveitamento aqui é muito mais restrita.",
      "caution": "Cache compartilhado em dado pessoal é risco funcional e de segurança."
    }
  ]
};

export const interactions = createComputacaoInteractions(interactionConfig) satisfies LessonModule["interactions"];
