import type { LessonModule } from "../../../types/content";
import { createComputacaoInteractions } from "../_shared/factories";

const interactionConfig = {
  "title": "Locality e Data-Oriented Design",
  "pipelineSteps": [
    {
      "name": "Achar o percurso quente",
      "summary": "Descubra qual loop, scan ou consulta consome de fato o tempo e a banda de memória.",
      "signal": "cache misses e throughput",
      "risk": "otimizar o caminho errado",
      "takeaway": "Sem hot path explícito, toda discussão sobre layout fica abstrata demais."
    },
    {
      "name": "Agrupar o que anda junto",
      "summary": "Campos usados juntos devem viajar próximos; campos frios podem morar longe.",
      "signal": "bytes úteis por linha",
      "risk": "arrastar bagagem irrelevante",
      "takeaway": "Layout é sobre quais bytes entram no mesmo trem para o cache."
    },
    {
      "name": "Iterar em blocos previsíveis",
      "summary": "Scans contíguos e lotes homogêneos ajudam prefetch, cache e vectorização.",
      "signal": "reuso espacial",
      "risk": "indireção e stride ruim",
      "takeaway": "Percurso previsível vale muito quando o volume de dados cresce."
    },
    {
      "name": "Medir o efeito",
      "summary": "Verifique se a reorganização reduziu misses, tráfego e tempo total do caminho crítico.",
      "signal": "tempo total do loop",
      "risk": "ganho imaginário",
      "takeaway": "Design orientado a dados precisa aparecer na métrica, não só na teoria."
    }
  ],
  "leftLabel": "flexibilidade de entidades",
  "rightLabel": "fluxo contíguo de dados",
  "tradeoffSummary": "Modelos ricos em objetos podem expressar melhor o domínio, mas frequentemente arrastam indireção e dados frios para o loop quente. Modelos orientados a dados simplificam o percurso do hardware, porém exigem mais cuidado para manter invariantes e múltiplas visões consistentes.",
  "tradeoffRisks": [
    "Muita indireção, pouca previsibilidade e reuso ruim no caminho quente.",
    "Híbrido razoável, mas com risco de duplicar estruturas sem critério.",
    "Alta eficiência para scans e updates massivos, porém com APIs menos óbvias para o domínio.",
    "Especialização agressiva demais pode piorar manutenção e tornar escrita ou sincronização mais difíceis do que o necessário."
  ],
  "practiceRule": "modele pelo percurso mais frequente e mais caro do sistema, não pela taxonomia mais elegante em abstrato",
  "scenarios": [
    {
      "name": "Loop de entidades",
      "situation": "Uma atualização por frame lê posição, velocidade e estado básico de centenas de milhares de itens.",
      "choice": "Mover campos realmente usados para blocos contíguos e processar em lotes previsíveis.",
      "why": "O hot path é um scan homogêneo; contiguidade e reuso costumam valer muito.",
      "caution": "Não carregue junto nomes, ponteiros de debug ou metadados raros a cada iteração."
    },
    {
      "name": "Analytics colunares",
      "situation": "Uma consulta agrega milhões de linhas lendo poucas colunas numéricas.",
      "choice": "Preferir layout por colunas, já alinhado ao padrão de leitura e compressão.",
      "why": "A consulta não precisa do registro inteiro, só de alguns campos repetidos.",
      "caution": "Operações que reconstroem a linha toda podem ter custo diferente e merecer outra visão."
    },
    {
      "name": "Serviço com poucas mutações",
      "situation": "Uma API mexe em objetos relativamente pequenos e o volume do hot path é baixo.",
      "choice": "Talvez um modelo mais simples por objeto já seja suficiente, com atenção pontual a buffers e caches locais.",
      "why": "Nem todo sistema ganha o bastante com reestruturações pesadas de layout.",
      "caution": "Não copie padrões de engine ou banco colunar sem pressão real de throughput."
    }
  ]
};

export const interactions = createComputacaoInteractions(interactionConfig) satisfies LessonModule["interactions"];
