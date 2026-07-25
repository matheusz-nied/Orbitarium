import { BarChart3, Calculator, Layers } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import {
  createScenarioExplorer,
  createSliderPlayground,
} from "../_shared/interactionFactories";

const primaryExplorer = createScenarioExplorer({
  eyebrow: "Definições",
  title: "Compare três noções de fairness",
  description: "Cada cenário destaca uma maneira diferente de dizer o que seria tratar grupos ou indivíduos de forma justa.",
  tone: "rose",
  icon: <BarChart3 size={18} aria-hidden="true" />,
  scenarios: [
  {
    "id": "independencia",
    "label": "Independência",
    "title": "A predição não deveria variar com o grupo",
    "description": "Essa família de critérios busca tornar a saída menos dependente da pertença a um grupo sensível.",
    "bullets": [
      "Foco em paridade de seleção ou de resultado.",
      "Pode ser atraente em contextos com forte risco de discriminação direta.",
      "Pode ignorar diferenças relevantes no alvo e mascarar outros custos."
    ],
    "metrics": [
      {
        "label": "Valor enfatizado",
        "value": "Paridade"
      },
      {
        "label": "Risco",
        "value": "Cegueira ao contexto"
      }
    ],
    "bars": [
      {
        "label": "Sensibilidade ao contexto",
        "value": 0.28,
        "display": "28%"
      },
      {
        "label": "Simplicidade comunicável",
        "value": 0.84,
        "display": "84%"
      },
      {
        "label": "Adequação universal",
        "value": 0.22,
        "display": "22%"
      }
    ]
  },
  {
    "id": "erros",
    "label": "Paridade de erro",
    "title": "Taxas de erro parecidas entre grupos",
    "description": "Aqui o objetivo é evitar que um grupo suporte mais falsos positivos ou falsos negativos que outro.",
    "bullets": [
      "Útil quando custos de erro são moralmente e politicamente salientes.",
      "Expõe disparidades invisíveis na acurácia média.",
      "Pode conflitar com calibração e com outras noções de justiça."
    ],
    "metrics": [
      {
        "label": "Valor enfatizado",
        "value": "Distribuição do erro"
      },
      {
        "label": "Risco",
        "value": "Conflito métrico"
      }
    ],
    "bars": [
      {
        "label": "Sensibilidade ao contexto",
        "value": 0.66,
        "display": "66%"
      },
      {
        "label": "Simplicidade comunicável",
        "value": 0.62,
        "display": "62%"
      },
      {
        "label": "Adequação universal",
        "value": 0.18,
        "display": "18%"
      }
    ]
  },
  {
    "id": "individual",
    "label": "Justiça individual",
    "title": "Casos semelhantes deveriam receber tratamento semelhante",
    "description": "Essa visão desloca o foco para comparações finas entre indivíduos, mas exige definir o que é semelhança relevante.",
    "bullets": [
      "Parece intuitiva, mas depende de uma métrica de similaridade controversa.",
      "Evita resumir tudo apenas em médias por grupo.",
      "Pode ser difícil de operacionalizar e auditar em larga escala."
    ],
    "metrics": [
      {
        "label": "Valor enfatizado",
        "value": "Coerência local"
      },
      {
        "label": "Risco",
        "value": "Definição de similaridade"
      }
    ],
    "bars": [
      {
        "label": "Sensibilidade ao contexto",
        "value": 0.82,
        "display": "82%"
      },
      {
        "label": "Simplicidade comunicável",
        "value": 0.34,
        "display": "34%"
      },
      {
        "label": "Adequação universal",
        "value": 0.16,
        "display": "16%"
      }
    ]
  }
],
});

const sliderFrames = [
  {
    "label": "Pós-processamento",
    "metrics": [
      {
        "label": "Velocidade",
        "value": "Alta"
      },
      {
        "label": "Profundidade da correção",
        "value": "Baixa"
      },
      {
        "label": "Dependência do diagnóstico",
        "value": "Alta"
      }
    ],
    "bars": [
      {
        "label": "Ataca sintoma",
        "value": 0.82,
        "display": "82%"
      },
      {
        "label": "Ataca causa",
        "value": 0.24,
        "display": "24%"
      },
      {
        "label": "Facilidade de adoção",
        "value": 0.86,
        "display": "86%"
      }
    ],
    "narrative": "Ajustar limiares ou scores depois do treino pode ser útil quando o problema está na decisão final, mas tende a ser superficial se a coleta ou o target já estavam distorcidos.",
    "footer": "Boa para correções rápidas, fraca como resposta universal."
  },
  {
    "label": "Treino",
    "metrics": [
      {
        "label": "Velocidade",
        "value": "Média"
      },
      {
        "label": "Profundidade da correção",
        "value": "Média"
      },
      {
        "label": "Dependência do diagnóstico",
        "value": "Alta"
      }
    ],
    "bars": [
      {
        "label": "Ataca sintoma",
        "value": 0.54,
        "display": "54%"
      },
      {
        "label": "Ataca causa",
        "value": 0.52,
        "display": "52%"
      },
      {
        "label": "Facilidade de adoção",
        "value": 0.58,
        "display": "58%"
      }
    ],
    "narrative": "Restrições e objetivos de fairness no treinamento ajudam quando a distorção está ligada à forma como o modelo distribui erro ou usa sinais espúrios.",
    "footer": "Ainda assim, o modelo só pode aprender bem sobre o mundo que o dado tornou visível."
  },
  {
    "label": "Coleta e target",
    "metrics": [
      {
        "label": "Velocidade",
        "value": "Baixa"
      },
      {
        "label": "Profundidade da correção",
        "value": "Alta"
      },
      {
        "label": "Dependência do diagnóstico",
        "value": "Muito alta"
      }
    ],
    "bars": [
      {
        "label": "Ataca sintoma",
        "value": 0.18,
        "display": "18%"
      },
      {
        "label": "Ataca causa",
        "value": 0.88,
        "display": "88%"
      },
      {
        "label": "Facilidade de adoção",
        "value": 0.26,
        "display": "26%"
      }
    ],
    "narrative": "Reformular o problema, coletar melhor e revisar proxies costuma ser mais difícil, mas atinge a camada em que muitos danos realmente nascem.",
    "footer": "Intervenção estrutural custa mais, porém costuma corrigir mais."
  },
  {
    "label": "Governança",
    "metrics": [
      {
        "label": "Velocidade",
        "value": "Média"
      },
      {
        "label": "Profundidade da correção",
        "value": "Alta"
      },
      {
        "label": "Dependência do diagnóstico",
        "value": "Distribuída"
      }
    ],
    "bars": [
      {
        "label": "Ataca sintoma",
        "value": 0.34,
        "display": "34%"
      },
      {
        "label": "Ataca causa",
        "value": 0.74,
        "display": "74%"
      },
      {
        "label": "Facilidade de adoção",
        "value": 0.44,
        "display": "44%"
      }
    ],
    "narrative": "Recursos, supervisão humana, delimitação de escopo e direito de contestação não “consertam” o modelo, mas mudam decisivamente o dano social que ele pode causar.",
    "footer": "Em muitos casos, a justiça prática depende tanto da instituição quanto do score."
  }
];

const sliderPlayground = createSliderPlayground({
  eyebrow: "Mitigação",
  title: "Mude a camada da intervenção",
  description: "Deslize para ver como o foco da solução muda quando o diagnóstico da origem do dano melhora.",
  tone: "amber",
  icon: <Calculator size={18} aria-hidden="true" />,
  initialState: { step: 1 },
  controls: [{
    key: "step",
    label: "Camada principal de intervenção",
    min: 0,
    max: sliderFrames.length - 1,
    step: 1,
    formatValue: (value) => sliderFrames[value]?.label ?? String(value),
  }],
  compute: (state) => sliderFrames[state.step] ?? sliderFrames[0],
});

const secondaryExplorer = createScenarioExplorer({
  eyebrow: "Stakeholders",
  title: "Mude o ponto de vista sobre o sistema",
  description: "Fairness muda de significado quando olhamos para quem sofre o erro, quem responde por ele e quem lucra com a automação.",
  tone: "emerald",
  icon: <Layers size={18} aria-hidden="true" />,
  scenarios: [
  {
    "id": "afetado",
    "label": "Pessoa afetada",
    "title": "Posso entender, contestar e reparar o erro?",
    "description": "Para quem recebe a decisão, fairness inclui transparência suficiente, canal de recurso e chance real de reparação.",
    "bullets": [
      "Importa menos a elegância da métrica e mais a possibilidade de defesa.",
      "O dano é concreto: exclusão, atraso, vigilância, perda de oportunidade.",
      "A assimetria de poder faz parte do problema."
    ],
    "metrics": [
      {
        "label": "Pergunta central",
        "value": "Recurso"
      },
      {
        "label": "Risco visível",
        "value": "Opacidade"
      }
    ]
  },
  {
    "id": "equipe",
    "label": "Equipe técnica",
    "title": "Onde está a fonte do dano?",
    "description": "A equipe técnica precisa decompor o problema: dados, target, métrica, threshold, uso fora do escopo, monitoramento.",
    "bullets": [
      "Diagnóstico correto evita soluções cosméticas.",
      "Documentação e métricas desagregadas são indispensáveis.",
      "Nem todo trade-off é resolvido pela modelagem."
    ],
    "metrics": [
      {
        "label": "Pergunta central",
        "value": "Diagnóstico"
      },
      {
        "label": "Risco visível",
        "value": "Reducionismo"
      }
    ]
  },
  {
    "id": "instituicao",
    "label": "Instituição",
    "title": "Quem assume responsabilidade pública?",
    "description": "A organização precisa decidir como legitima o sistema, como monitora dano e quem responde quando a automação falha.",
    "bullets": [
      "Governança define o espaço de responsabilização.",
      "Uso responsável inclui limite de escopo e revisão contínua.",
      "Eficiência não substitui justificativa institucional."
    ],
    "metrics": [
      {
        "label": "Pergunta central",
        "value": "Responsabilização"
      },
      {
        "label": "Risco visível",
        "value": "Lavagem algorítmica"
      }
    ]
  }
],
});

export const interactions = {
  "vieses-fairness-dados-cenarios": primaryExplorer,
  "vieses-fairness-dados-mitigacao": sliderPlayground,
  "vieses-fairness-dados-stakeholders": secondaryExplorer,
} satisfies LessonModule["interactions"];
