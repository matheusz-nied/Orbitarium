import type { LessonModule } from "../../../types/content";
import { createComputacaoInteractions } from "../_shared/factories";

const interactionConfig = {
  "title": "Barramentos: PCIe e Comunicação Interna",
  "pipelineSteps": [
    {
      "name": "Enumeração",
      "summary": "O sistema descobre dispositivos e a topologia da malha PCIe.",
      "signal": "bus topology",
      "risk": "assumir caminho inexistente",
      "takeaway": "Antes de transferir, o host precisa saber quem está conectado."
    },
    {
      "name": "Treino de link",
      "summary": "Dispositivo e host negociam largura e velocidade efetivas do link.",
      "signal": "link width and speed",
      "risk": "esperar x16 onde só há x8",
      "takeaway": "Largura nominal e largura ativa podem divergir."
    },
    {
      "name": "Transferência por DMA",
      "summary": "O dispositivo move dados para ou desde memória do host com pouca intervenção da CPU.",
      "signal": "dma throughput",
      "risk": "bottleneck fora do chip",
      "takeaway": "Mover dado também depende da memória do sistema."
    },
    {
      "name": "Interrupção e sincronização",
      "summary": "O host coordena conclusão de trabalho e resposta a eventos.",
      "signal": "interrupt rate",
      "risk": "saturação de software",
      "takeaway": "I/O rápido ainda encontra o sistema operacional."
    }
  ],
  "leftLabel": "flexibilidade de expansão",
  "rightLabel": "previsibilidade de largura de banda",
  "tradeoffSummary": "PCIe oferece enorme flexibilidade para conectar periféricos rápidos, mas a topologia real da placa e do chipset define quem compartilha caminho, largura de link e gargalos.",
  "tradeoffRisks": [
    "Plataforma muito flexível, mas com menor previsibilidade de banda por dispositivo.",
    "Boa expansão para muitos casos, desde que a topologia seja conhecida.",
    "Maior controle de largura de banda, com mais rigidez na alocação de recursos.",
    "Assumir throughput máximo só pelo conector pode mascarar gargalos de caminho e memória."
  ],
  "practiceRule": "mapeie a topologia real antes de culpar um dispositivo isolado por um gargalo de transferência",
  "scenarios": [
    {
      "name": "Adicionar segunda GPU",
      "situation": "Uma workstation recebe outra GPU e o desempenho por placa cai.",
      "choice": "Verificar como as lanes foram repartidas e quais links ficaram efetivamente ativos.",
      "why": "A topologia de PCIe pode redistribuir recursos ao adicionar dispositivos.",
      "caution": "O gargalo pode estar no caminho da plataforma, não na GPU em si."
    },
    {
      "name": "NVMe abaixo do esperado",
      "situation": "Um SSD rápido não alcança a taxa prometida em certas placas.",
      "choice": "Inspecionar se o slot passa por chipset, compartilha lanes ou negocia menos largura do que o esperado.",
      "why": "Nem todo slot físico oferece o mesmo caminho lógico.",
      "caution": "Benchmark isolado sem topologia costuma enganar."
    },
    {
      "name": "Pipelines de dados",
      "situation": "Um job move batches grandes entre SSD, RAM e GPU.",
      "choice": "Analisar a cadeia SSD → RAM → GPU e o papel do DMA em vez de olhar cada componente isoladamente.",
      "why": "O throughput útil depende da jornada completa do dado.",
      "caution": "Foco só em FLOPs da GPU ignora o custo de alimentação do dispositivo."
    }
  ]
};

export const interactions = createComputacaoInteractions(interactionConfig) satisfies LessonModule["interactions"];
