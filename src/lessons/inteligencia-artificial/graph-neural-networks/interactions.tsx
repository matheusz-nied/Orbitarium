import { BarChart3, Calculator, Layers } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import {
  createScenarioExplorer,
  createSliderPlayground,
} from "../_shared/interactionFactories";

const primaryExplorer = createScenarioExplorer({
  eyebrow: "Tarefas",
  title: "Compare tarefas em diferentes níveis do grafo",
  description: "Veja como muda a pergunta quando o rótulo está em um nó, em uma aresta ou no grafo todo.",
  tone: "teal",
  icon: <BarChart3 size={18} aria-hidden="true" />,
  scenarios: [
  {
    "id": "no",
    "label": "Nó",
    "title": "Predizer propriedades de entidades individuais",
    "description": "Aqui cada nó recebe um rótulo, e a vizinhança ajuda a contextualizar esse nó.",
    "bullets": [
      "Exemplo: classificar papers em uma rede de citações.",
      "Readout é local ao nó.",
      "Estrutura vizinha pode melhorar muito a predição."
    ],
    "metrics": [
      {
        "label": "Saída",
        "value": "Por nó"
      },
      {
        "label": "Pergunta central",
        "value": "Quem é este nó?"
      }
    ],
    "bars": [
      {
        "label": "Importância da vizinhança",
        "value": 0.84,
        "display": "84%"
      },
      {
        "label": "Necessidade de readout global",
        "value": 0.16,
        "display": "16%"
      },
      {
        "label": "Sensibilidade a homofilia",
        "value": 0.78,
        "display": "78%"
      }
    ]
  },
  {
    "id": "aresta",
    "label": "Aresta",
    "title": "Predizer relações ou links",
    "description": "O objetivo é decidir se dois nós deveriam se conectar, qual é o tipo da relação ou quão forte ela é.",
    "bullets": [
      "Exemplo: recomendação usuário-item.",
      "Importa modelar compatibilidade entre pares.",
      "Pode exigir atenção a tipos de aresta e direção."
    ],
    "metrics": [
      {
        "label": "Saída",
        "value": "Por aresta"
      },
      {
        "label": "Pergunta central",
        "value": "Qual relação existe aqui?"
      }
    ],
    "bars": [
      {
        "label": "Importância da vizinhança",
        "value": 0.72,
        "display": "72%"
      },
      {
        "label": "Necessidade de readout global",
        "value": 0.24,
        "display": "24%"
      },
      {
        "label": "Sensibilidade a tipos de aresta",
        "value": 0.86,
        "display": "86%"
      }
    ]
  },
  {
    "id": "grafo",
    "label": "Grafo",
    "title": "Resumir a estrutura inteira",
    "description": "Queremos uma representação global do grafo para classificar ou regressar uma propriedade do conjunto.",
    "bullets": [
      "Exemplo: propriedade de uma molécula.",
      "Readout global é decisivo.",
      "É preciso preservar informação útil sem perder a estrutura."
    ],
    "metrics": [
      {
        "label": "Saída",
        "value": "Por grafo"
      },
      {
        "label": "Pergunta central",
        "value": "Que tipo de estrutura é esta?"
      }
    ],
    "bars": [
      {
        "label": "Importância da vizinhança",
        "value": 0.76,
        "display": "76%"
      },
      {
        "label": "Necessidade de readout global",
        "value": 0.92,
        "display": "92%"
      },
      {
        "label": "Sensibilidade a pooling",
        "value": 0.82,
        "display": "82%"
      }
    ]
  }
],
});

const sliderFrames = [
  {
    "label": "Rasa",
    "metrics": [
      {
        "label": "Alcance relacional",
        "value": "Curto"
      },
      {
        "label": "Oversmoothing",
        "value": "Baixo"
      },
      {
        "label": "Dependência distante",
        "value": "Pouco capturada"
      }
    ],
    "bars": [
      {
        "label": "Informação local preservada",
        "value": 0.88,
        "display": "88%"
      },
      {
        "label": "Alcance de múltiplos saltos",
        "value": 0.24,
        "display": "24%"
      },
      {
        "label": "Risco de oversmoothing",
        "value": 0.16,
        "display": "16%"
      }
    ],
    "narrative": "Poucas camadas preservam bem o sinal local, mas podem não alcançar dependências importantes que vivem alguns saltos adiante no grafo.",
    "footer": "Boa escolha quando vizinhos imediatos concentram a informação principal."
  },
  {
    "label": "Intermediária",
    "metrics": [
      {
        "label": "Alcance relacional",
        "value": "Moderado"
      },
      {
        "label": "Oversmoothing",
        "value": "Controlável"
      },
      {
        "label": "Dependência distante",
        "value": "Parcialmente capturada"
      }
    ],
    "bars": [
      {
        "label": "Informação local preservada",
        "value": 0.62,
        "display": "62%"
      },
      {
        "label": "Alcance de múltiplos saltos",
        "value": 0.62,
        "display": "62%"
      },
      {
        "label": "Risco de oversmoothing",
        "value": 0.46,
        "display": "46%"
      }
    ],
    "narrative": "Profundidade intermediária tende a equilibrar propagação útil e preservação de distinção entre nós, mas continua dependente da topologia e da tarefa.",
    "footer": "Muitas aplicações operam nesse meio-termo por razões práticas e estatísticas."
  },
  {
    "label": "Profunda",
    "metrics": [
      {
        "label": "Alcance relacional",
        "value": "Longo"
      },
      {
        "label": "Oversmoothing",
        "value": "Alto"
      },
      {
        "label": "Dependência distante",
        "value": "Tentativa ambiciosa"
      }
    ],
    "bars": [
      {
        "label": "Informação local preservada",
        "value": 0.24,
        "display": "24%"
      },
      {
        "label": "Alcance de múltiplos saltos",
        "value": 0.9,
        "display": "90%"
      },
      {
        "label": "Risco de oversmoothing",
        "value": 0.88,
        "display": "88%"
      }
    ],
    "narrative": "Muitas camadas ampliam alcance, mas podem apagar identidades locais e espremer dependências em gargalos difíceis de otimizar.",
    "footer": "Mais longe nem sempre significa melhor: profundidade sem desenho pode degradar a representação."
  }
];

const sliderPlayground = createSliderPlayground({
  eyebrow: "Camadas",
  title: "Deslize a profundidade da GNN",
  description: "Veja como o aumento de camadas amplia o alcance relacional, mas também pode introduzir degradação.",
  tone: "amber",
  icon: <Calculator size={18} aria-hidden="true" />,
  initialState: { step: 1 },
  controls: [{
    key: "step",
    label: "Profundidade da agregação",
    min: 0,
    max: sliderFrames.length - 1,
    step: 1,
    formatValue: (value) => sliderFrames[value]?.label ?? String(value),
  }],
  compute: (state) => sliderFrames[state.step] ?? sliderFrames[0],
});

const secondaryExplorer = createScenarioExplorer({
  eyebrow: "Usos",
  title: "Troque o domínio de aplicação",
  description: "O que faz sentido em moléculas não é idêntico ao que faz sentido em recomendação ou grafos de conhecimento.",
  tone: "emerald",
  icon: <Layers size={18} aria-hidden="true" />,
  scenarios: [
  {
    "id": "moleculas",
    "label": "Moléculas",
    "title": "Estrutura química como grafo",
    "description": "Átomos viram nós, ligações viram arestas, e o readout global ajuda a predizer propriedades físico-químicas.",
    "bullets": [
      "Estrutura local é muito informativa.",
      "Tarefa frequentemente está no nível do grafo.",
      "Bias relacional combina bem com o domínio."
    ],
    "metrics": [
      {
        "label": "Adequação",
        "value": "Alta"
      },
      {
        "label": "Risco",
        "value": "Construção inadequada do grafo"
      }
    ]
  },
  {
    "id": "recomendacao",
    "label": "Recomendação",
    "title": "Usuários e itens como rede de interação",
    "description": "A estrutura de co-interação ajuda a estimar afinidades, mas o design do grafo e o viés de exposição contam muito.",
    "bullets": [
      "Tarefa muitas vezes é de aresta.",
      "Feedback histórico pode ser enviesado.",
      "Escala e atualização online pesam bastante."
    ],
    "metrics": [
      {
        "label": "Adequação",
        "value": "Contextual"
      },
      {
        "label": "Risco",
        "value": "Viés de exposição"
      }
    ]
  },
  {
    "id": "conhecimento",
    "label": "Conhecimento",
    "title": "Entidades e relações tipadas",
    "description": "Grafos de conhecimento exigem atenção a múltiplos tipos de relação e semântica estrutural.",
    "bullets": [
      "Heterogeneidade é central.",
      "Predição de link e raciocínio relacional ganham destaque.",
      "Modelagem ingênua pode apagar tipos distintos de conexão."
    ],
    "metrics": [
      {
        "label": "Adequação",
        "value": "Alta"
      },
      {
        "label": "Risco",
        "value": "Mistura semântica"
      }
    ]
  }
],
});

export const interactions = {
  "graph-neural-networks-tarefas": primaryExplorer,
  "graph-neural-networks-camadas": sliderPlayground,
  "graph-neural-networks-usos": secondaryExplorer,
} satisfies LessonModule["interactions"];
