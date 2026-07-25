import type { LessonModule } from "../../../types/content";
import { createComputacaoInteractions } from "../_shared/factories";

const interactionConfig = {
  "title": "Alocação: Arena, Pool e Bump",
  "pipelineSteps": [
    {
      "name": "Ler o lifetime",
      "summary": "Descubra se os objetos morrem juntos, reaparecem com frequência ou exigem liberdade total.",
      "signal": "fronteira de uso",
      "risk": "escolha fora de contexto",
      "takeaway": "Estratégia de alocação boa começa em semântica, não em benchmark solto."
    },
    {
      "name": "Escolher a política",
      "summary": "Arena, pool, bump e heap geral servem contratos diferentes de uso e descarte.",
      "signal": "churn e forma do objeto",
      "risk": "especialização inadequada",
      "takeaway": "Não existe alocador mágico; existe alinhamento com o fluxo real."
    },
    {
      "name": "Controlar reset e reuso",
      "summary": "A limpeza e a devolução corretas fazem parte do desenho, não do detalhe posterior.",
      "signal": "conteúdo residual",
      "risk": "bugs de lifetime ou lixo lógico",
      "takeaway": "Memória reciclada sem higiene vira problema semântico."
    },
    {
      "name": "Validar na carga real",
      "summary": "Confirme se o ganho aparece no sistema completo e não apenas em microbench isolado.",
      "signal": "throughput e footprint",
      "risk": "vitória local enganosa",
      "takeaway": "A especialização precisa simplificar custo real do fluxo inteiro."
    }
  ],
  "leftLabel": "flexibilidade geral",
  "rightLabel": "lifetime restrito e reuso",
  "tradeoffSummary": "Quanto mais você restringe o contrato de lifetime, mais simples e barato o alocador pode ficar. O preço é que objetos não devem escapar desse contrato por acidente, e a disciplina de reset ou reciclagem precisa ser tratada como parte da semântica do sistema.",
  "tradeoffRisks": [
    "Heap geral resolve muitos casos, mas cobra overhead e fragmentação para atender padrões diversos.",
    "Um desenho híbrido costuma funcionar bem quando só algumas fases concentram churn pesado.",
    "Arena, pool e bump aceleram caminhos específicos, desde que ownership e limpeza sejam explícitos.",
    "Especializar demais sem contrato claro de uso costuma criar bugs de lifetime difíceis de rastrear."
  ],
  "practiceRule": "escolha um alocador especializado apenas quando o padrão de lifetime for claro o suficiente para virar contrato explícito do código",
  "scenarios": [
    {
      "name": "Parser por requisição",
      "situation": "Cada request constrói tokens, nós e tabelas temporárias que desaparecem ao final.",
      "choice": "Avaliar arena ou bump com reset por requisição.",
      "why": "Os objetos compartilham fronteira clara de vida útil.",
      "caution": "Não deixe ponteiros para dentro da arena escaparem para caches globais ou filas assíncronas."
    },
    {
      "name": "Buffers temporários",
      "situation": "Um serviço formata mensagens ou serializa respostas em buffers repetidos o dia inteiro.",
      "choice": "Usar pool de buffers com política explícita de reset e capacidade.",
      "why": "O padrão é recorrente e o reaproveitamento pode aliviar churn de alocação.",
      "caution": "Pools podem reter buffers gigantes ou vazar conteúdo se o reset for negligenciado."
    },
    {
      "name": "Objetos heterogêneos",
      "situation": "O sistema cria estruturas de tamanhos diversos, compartilhadas por subsistemas com tempos de vida imprevisíveis.",
      "choice": "Manter o heap geral como padrão e otimizar apenas focos de churn comprovado.",
      "why": "Especializar cedo demais aqui aumenta risco sem entregar simplicidade real.",
      "caution": "Não confunda volume de alocação com compatibilidade automática com arenas ou pools."
    }
  ]
};

export const interactions = createComputacaoInteractions(interactionConfig) satisfies LessonModule["interactions"];
