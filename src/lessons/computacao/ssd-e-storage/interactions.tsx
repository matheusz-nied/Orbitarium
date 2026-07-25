import type { LessonModule } from "../../../types/content";
import { createComputacaoInteractions } from "../_shared/factories";

const interactionConfig = {
  "title": "Como um SSD Funciona",
  "pipelineSteps": [
    {
      "name": "Fila lógica do host",
      "summary": "O sistema operacional envia leituras e escritas em termos de blocos lógicos.",
      "signal": "queue depth",
      "risk": "achar que lógico é físico",
      "takeaway": "A interface do host é uma abstração."
    },
    {
      "name": "Mapeamento FTL",
      "summary": "O controlador decide onde cada gravação vai parar na mídia flash.",
      "signal": "logical to physical map",
      "risk": "perda de locality física",
      "takeaway": "Endereço lógico e localização física se separam."
    },
    {
      "name": "Program erase em flash",
      "summary": "Páginas são gravadas, mas blocos inteiros precisam ser apagados para reuso futuro.",
      "signal": "erase block pressure",
      "risk": "write amplification",
      "takeaway": "Flash não é atualização in place simples."
    },
    {
      "name": "Limpeza e desgaste",
      "summary": "Garbage collection e wear leveling reorganizam dados para manter o dispositivo saudável.",
      "signal": "background work",
      "risk": "latência irregular",
      "takeaway": "Velocidade sustentável depende de housekeeping."
    }
  ],
  "leftLabel": "baixa latência aparente",
  "rightLabel": "durabilidade e housekeeping interno",
  "tradeoffSummary": "SSDs são rápidos para muitas leituras e gravações, mas a própria mídia exige remapeamento, limpeza e cuidado com desgaste, o que faz padrão de escrita e ocupação do dispositivo importarem muito.",
  "tradeoffRisks": [
    "Pouco cuidado com housekeeping leva a quedas bruscas sob escrita pesada.",
    "Boa previsibilidade para misto de cargas comuns e espaço razoável livre.",
    "Mais durabilidade e estabilidade, com mais trabalho de fundo e políticas internas relevantes.",
    "Encher o dispositivo e insistir em pequenas regravações pode tornar qualquer benchmark inicial enganoso."
  ],
  "practiceRule": "raciocine em termos de mapeamento lógico, filas e write amplification, não só em megabytes por segundo de marketing",
  "scenarios": [
    {
      "name": "Log append only",
      "situation": "Uma carga escreve principalmente de forma sequencial e quase nunca reescreve.",
      "choice": "Explorar o padrão amigável e observar filas e flush, sem assumir custo nulo.",
      "why": "Append tende a conversar melhor com a mídia flash do que atualizações pequenas e dispersas.",
      "caution": "Mesmo append sofre se o dispositivo estiver cheio ou mal provisionado."
    },
    {
      "name": "Pequenas atualizações aleatórias",
      "situation": "Um banco atualiza páginas espalhadas o tempo todo.",
      "choice": "Pensar em write amplification e no efeito da compactação e das filas sobre a estabilidade do SSD.",
      "why": "O controlador precisa remapear e limpar muito mais do que o host enxerga.",
      "caution": "Benchmark de pico pode esconder degradação sustentada."
    },
    {
      "name": "Apagar dataset grande",
      "situation": "Um job remove e reescreve grandes conjuntos de dados com frequência.",
      "choice": "Usar comandos e políticas que permitam ao dispositivo reciclar espaço com mais informação, como TRIM quando aplicável.",
      "why": "A limpeza interna responde melhor quando o host comunica blocos que deixaram de importar.",
      "caution": "Excluir no sistema de arquivos não significa apagar fisicamente na hora."
    }
  ]
};

export const interactions = createComputacaoInteractions(interactionConfig) satisfies LessonModule["interactions"];
