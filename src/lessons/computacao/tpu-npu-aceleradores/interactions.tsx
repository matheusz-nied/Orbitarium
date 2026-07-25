import type { LessonModule } from "../../../types/content";
import { createComputacaoInteractions } from "../_shared/factories";

const interactionConfig = {
  "title": "TPU, NPU e Aceleradores",
  "pipelineSteps": [
    {
      "name": "Lowering do grafo",
      "summary": "O modelo é traduzido para operadores e formas que o acelerador consegue entender.",
      "signal": "operators supported",
      "risk": "fallback inesperado",
      "takeaway": "Compilador é parte do hardware percebido."
    },
    {
      "name": "Tile e escalonamento",
      "summary": "Blocos de tensor são particionados e distribuídos para unidades compatíveis.",
      "signal": "utilização",
      "risk": "ocupação ruim",
      "takeaway": "Granularidade importa tanto quanto FLOPs."
    },
    {
      "name": "Reuso em memória local",
      "summary": "Memórias on-chip tentam reduzir acessos caros a níveis mais lentos.",
      "signal": "traffic on chip",
      "risk": "movimento excessivo",
      "takeaway": "Mover dado custa quase tanto quanto computar."
    },
    {
      "name": "I/O e sincronização",
      "summary": "Resultados voltam ao host, a outro dispositivo ou a outra fase do pipeline.",
      "signal": "host device transfer",
      "risk": "gargalo fora do núcleo de compute",
      "takeaway": "A cadeia inteira define o ganho real."
    }
  ],
  "leftLabel": "generalidade de execução",
  "rightLabel": "especialização de operadores e energia",
  "tradeoffSummary": "Quanto mais especializado o hardware, melhor ele pode explorar regularidade e eficiência energética em certos operadores - mas menor tende a ser a flexibilidade para código arbitrário ou operadores fora do caminho feliz.",
  "tradeoffRisks": [
    "Execução mais geral, mas com menos eficiência específica para operadores de IA.",
    "Bom equilíbrio entre flexibilidade e aceleração para muitos workloads.",
    "Ótima eficiência em caminhos suportados, com maior dependência da pilha de compilação.",
    "Especialização extrema pode prender o workload a formatos ou operadores estreitos demais."
  ],
  "practiceRule": "avalie compute, memória, formato numérico e suporte de compilador antes de fazer qualquer claim de desempenho",
  "scenarios": [
    {
      "name": "Treino em datacenter",
      "situation": "Um modelo grande precisa throughput alto em operadores já bem suportados.",
      "choice": "Avaliar aceleradores que combinem largura de banda, compilador estável e topologia adequada ao workload.",
      "why": "A eficiência real depende da pilha completa, não do nome do chip.",
      "caution": "Hardware forte com suporte ruim de software vira throughput desperdiçado."
    },
    {
      "name": "Inferência on-device",
      "situation": "Um dispositivo móvel precisa executar modelos pequenos com energia limitada.",
      "choice": "Priorizar caminhos de baixa potência, formatos quantizados e NPUs integradas ao dispositivo.",
      "why": "Nesse caso, eficiência por watt e integração contam tanto quanto pico teórico.",
      "caution": "Modelos com operadores exóticos podem cair de volta na CPU."
    },
    {
      "name": "Modelo fora do caminho feliz",
      "situation": "A arquitetura usa operadores pouco suportados ou shapes irregulares.",
      "choice": "Medir fallback, custo de conversão e possível necessidade de reescrever partes do grafo.",
      "why": "Especialização ajuda pouco quando o workload não encaixa no contrato do acelerador.",
      "caution": "Marketing de aceleração não substitui profiling real."
    }
  ]
};

export const interactions = createComputacaoInteractions(interactionConfig) satisfies LessonModule["interactions"];
