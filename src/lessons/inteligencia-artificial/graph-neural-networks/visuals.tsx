import type { LessonModule } from "../../../types/content";
import { createStandardLessonVisuals } from "../_shared/visualFactories";

const standardVisuals = createStandardLessonVisuals({
  "tone": "teal",
  "heroTitle": "Aprender em redes, não em grades",
  "heroSubtitle": "GNNs exploram estrutura relacional como parte do próprio sinal.",
  "heroSteps": [
    "Nós",
    "Mensagens",
    "Readout"
  ],
  "heroFooter": "Quando conexões importam, o grafo vira o palco principal da aprendizagem.",
  "conceptTitle": "Atributos e relações",
  "conceptLeft": {
    "title": "Informação local",
    "body": "Cada nó traz atributos próprios e contexto imediato."
  },
  "conceptRight": {
    "title": "Informação estrutural",
    "body": "A topologia e os tipos de conexão moldam o que a vizinhança significa."
  },
  "conceptFooter": "Boa modelagem em grafos precisa juntar ambas as camadas.",
  "pipelineTitle": "Ciclo de message passing",
  "pipelineSteps": [
    "Mensagem",
    "Agregação",
    "Atualização",
    "Empilhamento",
    "Readout"
  ],
  "comparisonTitle": "Profundidade com cuidado",
  "comparisonLeft": {
    "title": "Poucas camadas",
    "body": "Preservam sinal local, mas podem não alcançar dependências mais distantes."
  },
  "comparisonRight": {
    "title": "Muitas camadas",
    "body": "Amplificam alcance relacional, mas podem misturar demais ou comprimir informação."
  },
  "tradeoffTitle": "Profundidade x estabilidade representacional",
  "tradeoffXAxis": "Mais camadas de agregação",
  "tradeoffYAxis": "Mais alcance, mas também mais risco de mistura excessiva",
  "tradeoffPoints": [
    {
      "label": "Raso",
      "x": 0.2,
      "y": 0.22
    },
    {
      "label": "Útil",
      "x": 0.5,
      "y": 0.58
    },
    {
      "label": "Excessivo",
      "x": 0.84,
      "y": 0.88
    }
  ],
  "checklistTitle": "Checklist antes de usar GNN",
  "checklistItems": [
    "A estrutura relacional realmente importa?",
    "O grafo foi bem construído?",
    "A tarefa é de nó, aresta ou grafo?",
    "Há homofilia suficiente?",
    "A profundidade é adequada?",
    "Outro modelo não resolveria mais simples?"
  ]
});

export const visuals = {
  "graph-neural-networks-hero": standardVisuals.hero,
  "graph-neural-networks-grafos": standardVisuals.concept,
  "graph-neural-networks-message-passing": standardVisuals.pipeline,
  "graph-neural-networks-profundidade": standardVisuals.comparison,
  "graph-neural-networks-tradeoffs": standardVisuals.tradeoff,
  "graph-neural-networks-aplicacoes": standardVisuals.checklist,
} satisfies LessonModule["visuals"];
