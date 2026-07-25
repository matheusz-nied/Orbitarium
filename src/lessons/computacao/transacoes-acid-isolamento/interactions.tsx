import type { LessonModule } from "../../../types/content";
import { createComputacaoInteractions } from "../_shared/factories";

const interactionConfig = {
  "title": "Transações, ACID e Isolamento",
  "pipelineSteps": [
    {
      "name": "Início e snapshot",
      "summary": "A transação entra com uma visão dos dados e ou locks adequados ao nível pedido.",
      "signal": "snapshot ou lock",
      "risk": "ler estado enganoso",
      "takeaway": "A visão inicial já muda o que é possível observar."
    },
    {
      "name": "Leituras e escritas",
      "summary": "A operação constrói sua decisão usando linhas, versões e índices.",
      "signal": "read write set",
      "risk": "anomalias invisíveis",
      "takeaway": "Nem toda leitura vê o mesmo mundo."
    },
    {
      "name": "Detecção de conflito",
      "summary": "O banco verifica locks, versões e dependências que podem invalidar o commit.",
      "signal": "abort ou retry",
      "risk": "supor sucesso inevitável",
      "takeaway": "Conflito não é exceção rara; é parte do modelo."
    },
    {
      "name": "Commit e WAL",
      "summary": "As mudanças ganham permanência e visibilidade segundo o mecanismo de durabilidade.",
      "signal": "flush e publicação",
      "risk": "confundir ack com invariantes globais",
      "takeaway": "Commit publica; não pensa pela aplicação."
    }
  ],
  "leftLabel": "concorrência máxima",
  "rightLabel": "isolamento forte",
  "tradeoffSummary": "Quanto mais você pede isolamento, menos anomalias tolera - mas maior pode ser o custo em bloqueio, validação ou retries quando muitas operações competem ao mesmo tempo.",
  "tradeoffRisks": [
    "Muitas anomalias passam despercebidas apesar do throughput alto.",
    "Bom compromisso para muitos casos, com algumas regras ainda exigindo cuidado da aplicação.",
    "Mais proteção, mas com maior chance de contenção ou retries sob pico.",
    "Exigir isolamento máximo em toda parte pode degradar throughput sem necessidade."
  ],
  "practiceRule": "comece pela invariante que precisa sobreviver e só depois escolha isolamento, índices e política de retry",
  "scenarios": [
    {
      "name": "Transferência financeira",
      "situation": "Débito e crédito precisam sobreviver ou falhar juntos.",
      "choice": "Executar toda a regra crítica dentro de uma transação que proteja a invariante de saldo.",
      "why": "O problema é lógico: as duas pontas precisam ser publicadas como uma unidade coerente.",
      "caution": "Separar etapas entre requests diferentes aumenta risco de inconsistência."
    },
    {
      "name": "Estoque concorrente",
      "situation": "Múltiplos compradores tentam reservar o último item ao mesmo tempo.",
      "choice": "Escolher isolamento e checagens de conflito que impeçam venda dupla e prever retry.",
      "why": "Contenção é parte do domínio, não ruído do banco.",
      "caution": "Sem índices e condição corretos, a regra pode falhar mesmo com transação."
    },
    {
      "name": "Relatório analítico",
      "situation": "Uma leitura longa quer consistência suficiente sem travar o sistema inteiro.",
      "choice": "Usar nível compatível com leitura estável ou snapshot, em vez de serializar tudo cegamente.",
      "why": "Leitura coerente também é um requisito de negócio.",
      "caution": "Isolamento excessivo em relatórios pode custar concorrência sem agregar valor."
    }
  ]
};

export const interactions = createComputacaoInteractions(interactionConfig) satisfies LessonModule["interactions"];
