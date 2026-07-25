import { BarChart3, Calculator, Layers } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import {
  createScenarioExplorer,
  createSliderPlayground,
} from "../_shared/interactionFactories";

const primaryExplorer = createScenarioExplorer({
  eyebrow: "Ameaças",
  title: "Compare cenários de fragilidade metodológica",
  description: "Cada cenário mostra uma forma comum de inflar resultado sem sustentar o claim correspondente.",
  tone: "teal",
  icon: <BarChart3 size={18} aria-hidden="true" />,
  scenarios: [
  {
    "id": "leakage",
    "label": "Leakage",
    "title": "Informação indevida entrou no processo",
    "description": "O resultado parece melhor porque treino, seleção ou preprocessing receberam uma pista que o teste não deveria oferecer.",
    "bullets": [
      "Destrói validade interna.",
      "Pode simular generalização inexistente.",
      "Nem sempre é óbvio sem auditoria cuidadosa."
    ],
    "metrics": [
      {
        "label": "Sinal de alerta",
        "value": "Pipeline opaco"
      },
      {
        "label": "Tipo de dano",
        "value": "Ilusão de desempenho"
      }
    ],
    "bars": [
      {
        "label": "Confiança residual",
        "value": 0.18,
        "display": "18%"
      },
      {
        "label": "Inflacionamento possível",
        "value": 0.9,
        "display": "90%"
      },
      {
        "label": "Necessidade de revisão",
        "value": 0.96,
        "display": "96%"
      }
    ]
  },
  {
    "id": "baseline",
    "label": "Baseline fraco",
    "title": "A comparação favorece artificialmente o método novo",
    "description": "O sistema novo parece superior porque foi comparado com referências irrelevantes ou mal implementadas.",
    "bullets": [
      "A vantagem pode evaporar com baselines fortes.",
      "Teatro experimental é comum em áreas aceleradas.",
      "Ablations e replicações independentes ajudam a expor o problema."
    ],
    "metrics": [
      {
        "label": "Sinal de alerta",
        "value": "Comparação incompleta"
      },
      {
        "label": "Tipo de dano",
        "value": "Avanço exagerado"
      }
    ],
    "bars": [
      {
        "label": "Confiança residual",
        "value": 0.42,
        "display": "42%"
      },
      {
        "label": "Inflacionamento possível",
        "value": 0.72,
        "display": "72%"
      },
      {
        "label": "Necessidade de revisão",
        "value": 0.82,
        "display": "82%"
      }
    ]
  },
  {
    "id": "claim",
    "label": "Claim inflado",
    "title": "O experimento é estreito, mas a interpretação é ampla",
    "description": "O número pode ser correto no benchmark e ainda assim sustentar mal uma narrativa de capacidade muito maior.",
    "bullets": [
      "Problema principal é validade externa e retórica do resultado.",
      "Nem todo claim inflado envolve erro numérico.",
      "A solução é reescalar a interpretação ao desenho real."
    ],
    "metrics": [
      {
        "label": "Sinal de alerta",
        "value": "Generalização apressada"
      },
      {
        "label": "Tipo de dano",
        "value": "Marketing científico"
      }
    ],
    "bars": [
      {
        "label": "Confiança residual",
        "value": 0.48,
        "display": "48%"
      },
      {
        "label": "Inflacionamento possível",
        "value": 0.84,
        "display": "84%"
      },
      {
        "label": "Necessidade de revisão",
        "value": 0.88,
        "display": "88%"
      }
    ]
  }
],
});

const sliderFrames = [
  {
    "label": "Resultado local",
    "metrics": [
      {
        "label": "Escopo",
        "value": "Restrito"
      },
      {
        "label": "Evidência necessária",
        "value": "Moderada"
      },
      {
        "label": "Risco de exagero",
        "value": "Baixo-médio"
      }
    ],
    "bars": [
      {
        "label": "Necessidade de benchmark múltiplo",
        "value": 0.24,
        "display": "24%"
      },
      {
        "label": "Necessidade de análise de erro",
        "value": 0.48,
        "display": "48%"
      },
      {
        "label": "Necessidade de validação externa",
        "value": 0.32,
        "display": "32%"
      }
    ],
    "narrative": "Claims modestos e bem delimitados são mais fáceis de sustentar. Ainda exigem cuidado, mas não pedem que o experimento prove o mundo todo.",
    "footer": "Saber limitar a conclusão é parte de fazer boa ciência."
  },
  {
    "label": "Capacidade específica",
    "metrics": [
      {
        "label": "Escopo",
        "value": "Intermediário"
      },
      {
        "label": "Evidência necessária",
        "value": "Alta"
      },
      {
        "label": "Risco de exagero",
        "value": "Médio-alto"
      }
    ],
    "bars": [
      {
        "label": "Necessidade de benchmark múltiplo",
        "value": 0.64,
        "display": "64%"
      },
      {
        "label": "Necessidade de análise de erro",
        "value": 0.78,
        "display": "78%"
      },
      {
        "label": "Necessidade de validação externa",
        "value": 0.66,
        "display": "66%"
      }
    ],
    "narrative": "Quando o claim fala em uma capacidade mais geral, já não basta um score único: precisamos triangulação, análise de falhas e comparação em cenários variados.",
    "footer": "Claim médio pede ecossistema médio-alto de evidência."
  },
  {
    "label": "Generalização ampla",
    "metrics": [
      {
        "label": "Escopo",
        "value": "Muito amplo"
      },
      {
        "label": "Evidência necessária",
        "value": "Muito alta"
      },
      {
        "label": "Risco de exagero",
        "value": "Altíssimo"
      }
    ],
    "bars": [
      {
        "label": "Necessidade de benchmark múltiplo",
        "value": 0.92,
        "display": "92%"
      },
      {
        "label": "Necessidade de análise de erro",
        "value": 0.94,
        "display": "94%"
      },
      {
        "label": "Necessidade de validação externa",
        "value": 0.98,
        "display": "98%"
      }
    ],
    "narrative": "Afirmações muito amplas sobre entendimento, segurança ou substituição humana exigem muito mais do que leaderboards: pedem robustez, documentação, contexto de uso e evidência independente.",
    "footer": "Claims grandiosos sem esse lastro tendem a ser mais marketing do que ciência."
  }
];

const sliderPlayground = createSliderPlayground({
  eyebrow: "Evidência",
  title: "Deslize a força do claim",
  description: "Veja como a exigência metodológica cresce quando a conclusão tenta generalizar cada vez mais.",
  tone: "amber",
  icon: <Calculator size={18} aria-hidden="true" />,
  initialState: { step: 1 },
  controls: [{
    key: "step",
    label: "Amplitude do claim interpretativo",
    min: 0,
    max: sliderFrames.length - 1,
    step: 1,
    formatValue: (value) => sliderFrames[value]?.label ?? String(value),
  }],
  compute: (state) => sliderFrames[state.step] ?? sliderFrames[0],
});

const secondaryExplorer = createScenarioExplorer({
  eyebrow: "Documentação",
  title: "Veja o que cada artefato de reporting torna visível",
  description: "Model cards, datasheets e benchmark cards respondem perguntas diferentes e complementares.",
  tone: "emerald",
  icon: <Layers size={18} aria-hidden="true" />,
  scenarios: [
  {
    "id": "model-card",
    "label": "Model card",
    "title": "O que este modelo faz e onde falha?",
    "description": "Foca uso pretendido, métricas, limitações, grupos avaliados e riscos operacionais do modelo.",
    "bullets": [
      "Ajuda a restringir escopo de uso.",
      "Torna métricas desagregadas mais visíveis.",
      "Não substitui a documentação do dataset ou do benchmark."
    ],
    "metrics": [
      {
        "label": "Objeto central",
        "value": "Modelo"
      },
      {
        "label": "Ganho epistêmico",
        "value": "Escopo e limite"
      }
    ]
  },
  {
    "id": "datasheet",
    "label": "Datasheet",
    "title": "De onde vieram estes dados e o que eles deixam de fora?",
    "description": "Foca motivação, coleta, composição, manutenção e riscos do conjunto de dados.",
    "bullets": [
      "Ajuda a detectar cobertura desigual e proxies ruins.",
      "Torna mais legível a genealogia do dataset.",
      "É vital para discutir validade e fairness."
    ],
    "metrics": [
      {
        "label": "Objeto central",
        "value": "Dataset"
      },
      {
        "label": "Ganho epistêmico",
        "value": "Proveniência"
      }
    ]
  },
  {
    "id": "benchmark-card",
    "label": "Benchmark card",
    "title": "O que este benchmark realmente mede?",
    "description": "Foca objetivo, protocolo, tarefas, limites e riscos de interpretação do benchmark.",
    "bullets": [
      "Reduz extrapolações indevidas.",
      "Ajuda a separar score local de claim amplo.",
      "É particularmente útil em ecossistemas de leaderboards rápidos."
    ],
    "metrics": [
      {
        "label": "Objeto central",
        "value": "Benchmark"
      },
      {
        "label": "Ganho epistêmico",
        "value": "Comparabilidade"
      }
    ]
  }
],
});

export const interactions = {
  "avaliacao-cientifica-claims-ia-cenarios": primaryExplorer,
  "avaliacao-cientifica-claims-ia-evidencia": sliderPlayground,
  "avaliacao-cientifica-claims-ia-documentacao": secondaryExplorer,
} satisfies LessonModule["interactions"];
