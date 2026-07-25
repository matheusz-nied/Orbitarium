import { BarChart3, Calculator, Layers } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import {
  createScenarioExplorer,
  createSliderPlayground,
} from "../_shared/interactionFactories";

const primaryExplorer = createScenarioExplorer({
  eyebrow: "Comparação",
  title: "Explore as tradições lado a lado",
  description: "Compare o que cada tradição prioriza, o que entrega bem e onde tropeça.",
  tone: "indigo",
  icon: <BarChart3 size={18} aria-hidden="true" />,
  scenarios: [
  {
    "id": "simbolica",
    "label": "Simbólica",
    "title": "Regras e inferência explícita",
    "description": "Boa quando o domínio permite estruturar conhecimento com clareza e o caminho de decisão precisa ser rastreável.",
    "bullets": [
      "Representação explícita de conceitos e relações.",
      "Forte em domínios estreitos e bem especificados.",
      "Pode sofrer com explosão combinatória e manutenção difícil."
    ],
    "metrics": [
      {
        "label": "Legibilidade",
        "value": "Alta"
      },
      {
        "label": "Dependência de dados",
        "value": "Baixa"
      },
      {
        "label": "Escala aberta",
        "value": "Limitada"
      }
    ],
    "bars": [
      {
        "label": "Conhecimento explícito",
        "value": 0.92,
        "display": "92%"
      },
      {
        "label": "Aprendizado a partir de dados",
        "value": 0.24,
        "display": "24%"
      },
      {
        "label": "Robustez a ambiguidade",
        "value": 0.38,
        "display": "38%"
      }
    ]
  },
  {
    "id": "conexionista",
    "label": "Conexionista",
    "title": "Representações distribuídas",
    "description": "Boa quando o problema exige aprender regularidades difíceis de escrever manualmente, sobretudo em percepção e linguagem.",
    "bullets": [
      "Aprende pesos e padrões em vez de receber todas as regras.",
      "Escala melhor com dados e otimização adequada.",
      "Torna mais difícil apontar uma justificativa única e legível."
    ],
    "metrics": [
      {
        "label": "Legibilidade",
        "value": "Média-baixa"
      },
      {
        "label": "Dependência de dados",
        "value": "Alta"
      },
      {
        "label": "Flexibilidade",
        "value": "Alta"
      }
    ],
    "bars": [
      {
        "label": "Conhecimento explícito",
        "value": 0.32,
        "display": "32%"
      },
      {
        "label": "Aprendizado a partir de dados",
        "value": 0.88,
        "display": "88%"
      },
      {
        "label": "Robustez a ambiguidade",
        "value": 0.76,
        "display": "76%"
      }
    ]
  },
  {
    "id": "transformers",
    "label": "Transformers",
    "title": "Escala contextual com atenção",
    "description": "Boa quando contexto amplo, paralelismo e pré-treinamento em larga escala alteram a fronteira do possível em linguagem e além.",
    "bullets": [
      "Atenção ajuda a combinar dependências distantes.",
      "Escala em dados e compute importa decisivamente.",
      "Capacidade ampla não elimina problemas de verdade, controle e explicação."
    ],
    "metrics": [
      {
        "label": "Contextualização",
        "value": "Muito alta"
      },
      {
        "label": "Custo computacional",
        "value": "Muito alto"
      },
      {
        "label": "Generalidade",
        "value": "Alta"
      }
    ],
    "bars": [
      {
        "label": "Conhecimento explícito",
        "value": 0.18,
        "display": "18%"
      },
      {
        "label": "Aprendizado a partir de dados",
        "value": 0.97,
        "display": "97%"
      },
      {
        "label": "Escala operacional",
        "value": 0.94,
        "display": "94%"
      }
    ]
  }
],
});

const sliderFrames = [
  {
    "label": "Dartmouth",
    "metrics": [
      {
        "label": "Dados disponíveis",
        "value": "Escassos"
      },
      {
        "label": "Compute prático",
        "value": "Muito baixo"
      },
      {
        "label": "Promessa pública",
        "value": "Altíssima"
      }
    ],
    "bars": [
      {
        "label": "Formalização teórica",
        "value": 0.82,
        "display": "82%"
      },
      {
        "label": "Capacidade empírica",
        "value": 0.18,
        "display": "18%"
      },
      {
        "label": "Infraestrutura",
        "value": 0.12,
        "display": "12%"
      }
    ],
    "narrative": "No início, a ambição intelectual era enorme. A infraestrutura para realizar essa ambição ainda era mínima, o que ajudou a gerar promessas maiores do que os resultados sustentáveis.",
    "footer": "Quando a infraestrutura é baixa, a história da IA é guiada mais por conjecturas do que por escala empírica."
  },
  {
    "label": "Especialistas",
    "metrics": [
      {
        "label": "Dados disponíveis",
        "value": "Moderados"
      },
      {
        "label": "Compute prático",
        "value": "Baixo"
      },
      {
        "label": "Conhecimento manual",
        "value": "Central"
      }
    ],
    "bars": [
      {
        "label": "Formalização teórica",
        "value": 0.76,
        "display": "76%"
      },
      {
        "label": "Capacidade empírica",
        "value": 0.42,
        "display": "42%"
      },
      {
        "label": "Infraestrutura",
        "value": 0.28,
        "display": "28%"
      }
    ],
    "narrative": "Sistemas especialistas ganharam tração porque era possível obter valor em nichos bem especificados. O gargalo passou a ser manter e ampliar bases de regras sem colapsar em complexidade.",
    "footer": "Legibilidade cresceu, mas também cresceu o custo de codificar e atualizar conhecimento."
  },
  {
    "label": "Pré-deep",
    "metrics": [
      {
        "label": "Dados disponíveis",
        "value": "Crescentes"
      },
      {
        "label": "Compute prático",
        "value": "Médio"
      },
      {
        "label": "Redes viáveis",
        "value": "Parcialmente"
      }
    ],
    "bars": [
      {
        "label": "Formalização teórica",
        "value": 0.58,
        "display": "58%"
      },
      {
        "label": "Capacidade empírica",
        "value": 0.54,
        "display": "54%"
      },
      {
        "label": "Infraestrutura",
        "value": 0.48,
        "display": "48%"
      }
    ],
    "narrative": "Nesse meio-termo, nem o paradigma simbólico parecia suficiente, nem as redes tinham ainda toda a infraestrutura necessária. O campo ficou metodologicamente aberto e instável.",
    "footer": "Fases intermediárias costumam parecer confusas porque nenhuma tradição resolve bem todos os problemas relevantes."
  },
  {
    "label": "Deep learning",
    "metrics": [
      {
        "label": "Dados disponíveis",
        "value": "Altos"
      },
      {
        "label": "Compute prático",
        "value": "Alto"
      },
      {
        "label": "Benchmarks",
        "value": "Centrais"
      }
    ],
    "bars": [
      {
        "label": "Formalização teórica",
        "value": 0.46,
        "display": "46%"
      },
      {
        "label": "Capacidade empírica",
        "value": 0.82,
        "display": "82%"
      },
      {
        "label": "Infraestrutura",
        "value": 0.78,
        "display": "78%"
      }
    ],
    "narrative": "Com dados digitais, GPUs e otimização robusta, redes profundas passam a vencer tarefas relevantes. O desempenho medido ganha peso decisivo na redistribuição de prestígio entre paradigmas.",
    "footer": "A história vira também história de benchmark, produção de dados e hardware."
  },
  {
    "label": "Transformers",
    "metrics": [
      {
        "label": "Dados disponíveis",
        "value": "Massivos"
      },
      {
        "label": "Compute prático",
        "value": "Muito alto"
      },
      {
        "label": "Escala de modelo",
        "value": "Massiva"
      }
    ],
    "bars": [
      {
        "label": "Formalização teórica",
        "value": 0.34,
        "display": "34%"
      },
      {
        "label": "Capacidade empírica",
        "value": 0.96,
        "display": "96%"
      },
      {
        "label": "Infraestrutura",
        "value": 0.94,
        "display": "94%"
      }
    ],
    "narrative": "Atenção e paralelismo encontram um ecossistema disposto a treinar modelos enormes. O salto é real, mas a discussão sobre compreensão, confiabilidade e explicação volta com força renovada.",
    "footer": "Escala resolveu parte do problema prático e reabriu parte do problema filosófico."
  }
];

const sliderPlayground = createSliderPlayground({
  eyebrow: "Escala histórica",
  title: "Deslize pelas condições que mudaram o campo",
  description: "Ajuste a fase para ver como dados, hardware e expectativa pública alteram o tipo de sistema que se torna viável.",
  tone: "amber",
  icon: <Calculator size={18} aria-hidden="true" />,
  initialState: { step: 2 },
  controls: [{
    key: "step",
    label: "Momento histórico simplificado",
    min: 0,
    max: sliderFrames.length - 1,
    step: 1,
    formatValue: (value) => sliderFrames[value]?.label ?? String(value),
  }],
  compute: (state) => sliderFrames[state.step] ?? sliderFrames[0],
});

const secondaryExplorer = createScenarioExplorer({
  eyebrow: "Lentes",
  title: "Troque a lente histórica",
  description: "O mesmo episódio muda de significado conforme o olhar: científico, de engenharia ou filosófico.",
  tone: "emerald",
  icon: <Layers size={18} aria-hidden="true" />,
  scenarios: [
  {
    "id": "historiador",
    "label": "Historiador",
    "title": "Mudanças de contexto importam",
    "description": "O historiador pergunta quais problemas foram redefinidos, quais promessas circularam e quais instituições sustentaram cada virada.",
    "bullets": [
      "Evita contar a história como uma linha reta.",
      "Observa financiamento, dados, hardware e ecossistema.",
      "Distingue sucesso de demonstração e adoção real."
    ],
    "metrics": [
      {
        "label": "Foco",
        "value": "Contexto"
      },
      {
        "label": "Risco evitado",
        "value": "Teleologia"
      }
    ]
  },
  {
    "id": "engenheiro",
    "label": "Engenheiro",
    "title": "O que escala de fato?",
    "description": "O engenheiro pergunta quais abstrações reduzem trabalho humano, quais sistemas se mantêm estáveis e qual método performa melhor no problema concreto.",
    "bullets": [
      "Compara custo de desenvolvimento e manutenção.",
      "Olha para dados, latência e capacidade de atualização.",
      "Aceita soluções híbridas sem apego ideológico."
    ],
    "metrics": [
      {
        "label": "Foco",
        "value": "Viabilidade"
      },
      {
        "label": "Risco evitado",
        "value": "Dogmatismo"
      }
    ]
  },
  {
    "id": "filosofo",
    "label": "Filósofo",
    "title": "O que conta como compreensão?",
    "description": "O filósofo pergunta se bom desempenho basta para falar em inteligência, explicação ou raciocínio, e quais conceitos estamos usando ao descrever sistemas.",
    "bullets": [
      "Examina analogias apressadas entre fluência e entendimento.",
      "Pergunta o que a representação interna precisa explicar.",
      "Mantém vivo o debate sobre interpretação e responsabilidade."
    ],
    "metrics": [
      {
        "label": "Foco",
        "value": "Conceitos"
      },
      {
        "label": "Risco evitado",
        "value": "Antropomorfismo"
      }
    ]
  }
],
});

export const interactions = {
  "historia-da-ia-tradicoes": primaryExplorer,
  "historia-da-ia-escala": sliderPlayground,
  "historia-da-ia-lentes": secondaryExplorer,
} satisfies LessonModule["interactions"];
