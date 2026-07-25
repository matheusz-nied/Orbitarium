import type { LessonModule } from "../../../types/content";
import { createComputacaoInteractions } from "../_shared/factories";

const interactionConfig = {
  "title": "Como Funciona a Memória RAM",
  "pipelineSteps": [
    {
      "name": "Miss de cache",
      "summary": "A CPU não encontra o dado nas camadas mais próximas e precisa descer na hierarquia.",
      "signal": "miss de cache",
      "risk": "espera da CPU",
      "takeaway": "RAM aparece quando a localidade não bastou."
    },
    {
      "name": "Escalonamento pelo controlador",
      "summary": "O controlador escolhe banco, linha e ordem de acesso à DRAM.",
      "signal": "fila no controlador",
      "risk": "contenção e reordenação",
      "takeaway": "A RAM não é um bloco mágico uniforme."
    },
    {
      "name": "Ativação e burst",
      "summary": "Uma linha é ativada e dados são transferidos em blocos úteis para caches.",
      "signal": "row hit ou row miss",
      "risk": "acessos dispersos",
      "takeaway": "Localidade conversa com a física da DRAM."
    },
    {
      "name": "Preenchimento e substituição",
      "summary": "Os dados sobem para cache e algo pode ser desalojado para abrir espaço.",
      "signal": "substituição de linha",
      "risk": "baixo reaproveitamento",
      "takeaway": "Capacidade ajuda, mas reuso continua decisivo."
    }
  ],
  "leftLabel": "mais dados residentes",
  "rightLabel": "menos espera por acesso",
  "tradeoffSummary": "Mais RAM ajuda a manter working sets vivos e reduz pressão sobre paginação, mas desempenho real ainda depende de localidade, latência e largura de banda quando a CPU precisa buscar dados na memória principal.",
  "tradeoffRisks": [
    "Pouca memória útil aumenta a chance de paginação, recargas e pressão sobre o sistema.",
    "Mesmo com capacidade razoável, o desempenho continua sensível ao padrão de acesso.",
    "Boa localidade reduz espera, mas não compensa automaticamente working set grande demais.",
    "Olhar só capacidade ou só micro-otimização de acesso pode esconder o gargalo principal."
  ],
  "practiceRule": "separe a pergunta cabe em memória da pergunta é acessado com localidade suficiente",
  "scenarios": [
    {
      "name": "Muitas abas abertas",
      "situation": "O usuário alterna entre várias aplicações e páginas ao longo do dia.",
      "choice": "Observar working set e pressão de memória antes de concluir que faltou CPU.",
      "why": "Interatividade depende de manter conjuntos ativos por perto.",
      "caution": "Mais abas também podem expulsar dados úteis e aumentar page faults."
    },
    {
      "name": "Análise em memória",
      "situation": "Um job cabe inteiro em RAM, mas percorre estruturas grandes de forma irregular.",
      "choice": "Revisar layout e padrão de acesso para explorar localidade, em vez de confiar só no fato de caber na RAM.",
      "why": "Caber não elimina latência de memória principal.",
      "caution": "Acesso aleatório pode arruinar ganhos esperados."
    },
    {
      "name": "Carregamento de checkpoint",
      "situation": "Um sistema precisa ler e preparar um artefato grande repetidamente.",
      "choice": "Aproveitar page cache e prever quando o gargalo é RAM versus storage.",
      "why": "O caminho entre disco, RAM e caches define a experiência real.",
      "caution": "Confundir aquecimento de cache com benchmark reprodutível distorce conclusões."
    }
  ]
};

export const interactions = createComputacaoInteractions(interactionConfig) satisfies LessonModule["interactions"];
