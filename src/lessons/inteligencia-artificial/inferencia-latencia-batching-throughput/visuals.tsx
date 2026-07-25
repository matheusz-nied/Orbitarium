import type { LessonModule } from "../../../types/content";
import { createStandardLessonVisuals } from "../_shared/visualFactories";

export const visuals = createStandardLessonVisuals({
  "tone": "teal",
  "heroTitle": "Serving é uma negociação entre fila, lote e experiência",
  "heroSubtitle": "Latência e throughput melhoram por caminhos diferentes e precisam de um SLO para conversar",
  "heroSteps": [
    "Medir",
    "Agendar",
    "Ajustar"
  ],
  "heroFooter": "A configuração ideal depende do padrão de tráfego e da promessa feita ao usuário.",
  "conceptTitle": "Latência vista pelo cliente",
  "conceptLeft": {
    "title": "Tempo técnico",
    "body": "Kernel rápido importa, mas não encerra a história."
  },
  "conceptRight": {
    "title": "Tempo percebido",
    "body": "Fila, serialização e streaming aparecem no relógio do usuário."
  },
  "conceptFooter": "Serving bom otimiza o caminho completo, não apenas o forward.",
  "pipelineTitle": "Cadeia básica de uma requisição",
  "pipelineSteps": [
    "Entrar",
    "Enfileirar",
    "Prefill",
    "Decode",
    "Responder"
  ],
  "comparisonTitle": "Capacidade útil vs. pico teórico",
  "comparisonLeft": {
    "title": "Hardware ocioso",
    "body": "Pouca fila e pouco lote podem desperdiçar paralelismo."
  },
  "comparisonRight": {
    "title": "Hardware cheio",
    "body": "Muito lote sem controle pode fabricar cauda e atrasos ruins."
  },
  "tradeoffTitle": "Mais batching, mais fila",
  "tradeoffXAxis": "Aproveitamento do hardware",
  "tradeoffYAxis": "Risco de latência ruim",
  "tradeoffPoints": [
    {
      "label": "Sem lote",
      "x": 0.18,
      "y": 0.16
    },
    {
      "label": "Lote moderado",
      "x": 0.48,
      "y": 0.34
    },
    {
      "label": "Lote agressivo",
      "x": 0.78,
      "y": 0.72
    },
    {
      "label": "Continuous batching",
      "x": 0.68,
      "y": 0.44
    }
  ],
  "checklistTitle": "Checklist de serving saudável",
  "checklistItems": [
    "Existe meta explícita para p95 e tempo até o primeiro token?",
    "O benchmark usa concorrência e prompts realistas?",
    "A fila possui limites e alertas claros?",
    "Prefill e decode são medidos separadamente?",
    "A política de batching cabe no SLO?",
    "Há estratégia para bursts e sessões longas?"
  ]
}) satisfies LessonModule["visuals"];
