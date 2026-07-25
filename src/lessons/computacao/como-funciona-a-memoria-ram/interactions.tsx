import type { LessonModule } from "../../../types/content";
import { createComputacaoInteractions } from "../_shared/factories";

const interactionConfig = {
  "title": "Como Funciona a Memória RAM",
  "pipelineSteps": [
    {
      "name": "Miss de cache",
      "summary": "A CPU não encontra o dado nas camadas mais próximas e precisa descer na hierarquia.",
      "signal": "cache miss",
      "risk": "stall",
      "takeaway": "RAM aparece quando a locality não bastou."
    },
    {
      "name": "Escalonamento pelo controlador",
      "summary": "O controlador escolhe banco, linha e ordem de acesso à DRAM.",
      "signal": "queueing",
      "risk": "contenção e reordenação",
      "takeaway": "A RAM não é um bloco mágico uniforme."
    },
    {
      "name": "Ativação e burst",
      "summary": "Uma linha é ativada e dados são transferidos em blocos úteis para caches.",
      "signal": "row hit ou row miss",
      "risk": "acessos dispersos",
      "takeaway": "Locality conversa com a física da DRAM."
    },
    {
      "name": "Preenchimento e substituição",
      "summary": "Os dados sobem para cache e algo pode ser desalojado para abrir espaço.",
      "signal": "eviction",
      "risk": "thrashing",
      "takeaway": "Capacidade e reuse andam juntos."
    }
  ],
  "leftLabel": "capacidade",
  "rightLabel": "latência e locality",
  "tradeoffSummary": "Mais RAM ajuda a manter working sets vivos, mas desempenho real continua dependendo de como os acessos exploram locality e de quantas vezes a CPU precisa esperar a memória principal.",
  "tradeoffRisks": [
    "Pouca memória útil e maior chance de page fault ou troca constante.",
    "Capacidade suficiente para muitos casos, com desempenho ainda sensível a locality.",
    "Boa eficiência quando o working set é amigável, mas dependência maior do desenho dos acessos.",
    "Otimizar só capacidade sem olhar padrão de acesso pode esconder stalls enormes."
  ],
  "practiceRule": "separe a pergunta cabe em memória da pergunta é acessado com locality suficiente",
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
      "choice": "Revisar layout e padrão de acesso para explorar locality, em vez de confiar só no fato de caber na RAM.",
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
