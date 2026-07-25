import { BarChart3, Calculator, Layers } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import {
  createScenarioExplorer,
  createSliderPlayground,
} from "../_shared/interactionFactories";

const primaryExplorer = createScenarioExplorer({
  eyebrow: "Leakage",
  title: "Compare três formas clássicas de vazamento temporal",
  description: "Cada cenário mostra um jeito comum de trapacear sem perceber em forecasting.",
  tone: "amber",
  icon: <BarChart3 size={18} aria-hidden="true" />,
  scenarios: [
  {
    "id": "split",
    "label": "Split aleatório",
    "title": "Treino viu o futuro sem você perceber",
    "description": "Ao embaralhar, o modelo aprende padrões usando amostras que na prática pertencem ao futuro do período testado.",
    "bullets": [
      "Infla score artificialmente.",
      "Desrespeita a pergunta causal da previsão.",
      "É um dos erros mais frequentes em iniciantes."
    ],
    "metrics": [
      {
        "label": "Gravidade",
        "value": "Alta"
      },
      {
        "label": "Visibilidade do erro",
        "value": "Baixa"
      }
    ],
    "bars": [
      {
        "label": "Inflação potencial do score",
        "value": 0.9,
        "display": "90%"
      },
      {
        "label": "Plausibilidade operacional",
        "value": 0.12,
        "display": "12%"
      },
      {
        "label": "Necessidade de correção",
        "value": 0.96,
        "display": "96%"
      }
    ]
  },
  {
    "id": "normalizacao",
    "label": "Normalização global",
    "title": "Estatísticas do futuro contaminaram o presente",
    "description": "Escalonar ou imputar usando o dataset inteiro insere no treino conhecimento sobre períodos posteriores.",
    "bullets": [
      "Erro sutil e muito comum em pipelines automatizados.",
      "Atinge transformações além do modelo em si.",
      "Pode ser evitado com fit apenas na janela de treino."
    ],
    "metrics": [
      {
        "label": "Gravidade",
        "value": "Média-alta"
      },
      {
        "label": "Visibilidade do erro",
        "value": "Muito baixa"
      }
    ],
    "bars": [
      {
        "label": "Inflação potencial do score",
        "value": 0.72,
        "display": "72%"
      },
      {
        "label": "Plausibilidade operacional",
        "value": 0.28,
        "display": "28%"
      },
      {
        "label": "Necessidade de correção",
        "value": 0.88,
        "display": "88%"
      }
    ]
  },
  {
    "id": "feature",
    "label": "Feature do futuro",
    "title": "A feature usa informação que ainda não existia",
    "description": "Médias móveis ou agregações mal construídas podem incorporar janelas que atravessam o instante de previsão.",
    "bullets": [
      "Parece detalhe de engenharia, mas invalida o experimento.",
      "Exige pensar a construção das features passo a passo.",
      "É especialmente traiçoeiro em pipelines ricos em agregações."
    ],
    "metrics": [
      {
        "label": "Gravidade",
        "value": "Alta"
      },
      {
        "label": "Visibilidade do erro",
        "value": "Média-baixa"
      }
    ],
    "bars": [
      {
        "label": "Inflação potencial do score",
        "value": 0.84,
        "display": "84%"
      },
      {
        "label": "Plausibilidade operacional",
        "value": 0.18,
        "display": "18%"
      },
      {
        "label": "Necessidade de correção",
        "value": 0.92,
        "display": "92%"
      }
    ]
  }
],
});

const sliderFrames = [
  {
    "label": "Ingênuo",
    "metrics": [
      {
        "label": "Split",
        "value": "Aleatório"
      },
      {
        "label": "Confiança no score",
        "value": "Baixa"
      },
      {
        "label": "Risco de ilusão",
        "value": "Altíssimo"
      }
    ],
    "bars": [
      {
        "label": "Aderência ao uso real",
        "value": 0.16,
        "display": "16%"
      },
      {
        "label": "Risco de leakage",
        "value": 0.92,
        "display": "92%"
      },
      {
        "label": "Confiabilidade da comparação",
        "value": 0.18,
        "display": "18%"
      }
    ],
    "narrative": "Protocolos ingênuos costumam premiar o modelo errado por razões metodológicas e não por capacidade real de previsão.",
    "footer": "Score bonito aqui vale pouco como evidência operacional."
  },
  {
    "label": "Temporal simples",
    "metrics": [
      {
        "label": "Split",
        "value": "Holdout temporal"
      },
      {
        "label": "Confiança no score",
        "value": "Média"
      },
      {
        "label": "Risco de ilusão",
        "value": "Moderado"
      }
    ],
    "bars": [
      {
        "label": "Aderência ao uso real",
        "value": 0.62,
        "display": "62%"
      },
      {
        "label": "Risco de leakage",
        "value": 0.44,
        "display": "44%"
      },
      {
        "label": "Confiabilidade da comparação",
        "value": 0.64,
        "display": "64%"
      }
    ],
    "narrative": "Segurar um período futuro já melhora muito a honestidade do experimento, embora ainda possa haver dependência forte de uma janela específica.",
    "footer": "É um bom ponto de partida, mas nem sempre suficiente para avaliar robustez ao longo do tempo."
  },
  {
    "label": "Walk-forward",
    "metrics": [
      {
        "label": "Split",
        "value": "Múltiplas janelas"
      },
      {
        "label": "Confiança no score",
        "value": "Alta"
      },
      {
        "label": "Risco de ilusão",
        "value": "Baixo"
      }
    ],
    "bars": [
      {
        "label": "Aderência ao uso real",
        "value": 0.9,
        "display": "90%"
      },
      {
        "label": "Risco de leakage",
        "value": 0.18,
        "display": "18%"
      },
      {
        "label": "Confiabilidade da comparação",
        "value": 0.92,
        "display": "92%"
      }
    ],
    "narrative": "Backtesting em múltiplas janelas aproxima melhor o uso real e reduz a chance de um bom score ser só sorte de um período específico.",
    "footer": "Mais caro computacionalmente, muito melhor epistemicamente."
  }
];

const sliderPlayground = createSliderPlayground({
  eyebrow: "Avaliação",
  title: "Deslize a maturidade do protocolo",
  description: "Veja como a confiança no resultado aumenta quando a avaliação respeita melhor o tempo e a operação real.",
  tone: "violet",
  icon: <Calculator size={18} aria-hidden="true" />,
  initialState: { step: 1 },
  controls: [{
    key: "step",
    label: "Maturidade do protocolo de avaliação",
    min: 0,
    max: sliderFrames.length - 1,
    step: 1,
    formatValue: (value) => sliderFrames[value]?.label ?? String(value),
  }],
  compute: (state) => sliderFrames[state.step] ?? sliderFrames[0],
});

const secondaryExplorer = createScenarioExplorer({
  eyebrow: "Famílias",
  title: "Compare famílias de modelos para forecasting",
  description: "O melhor modelo depende da série, do volume de dados e do regime de uso.",
  tone: "teal",
  icon: <Layers size={18} aria-hidden="true" />,
  scenarios: [
  {
    "id": "classicos",
    "label": "Clássicos",
    "title": "Estrutura temporal explícita e forte baseline",
    "description": "Modelos estatísticos como ETS, ARIMA e similares continuam muito competitivos em diversas séries bem estruturadas.",
    "bullets": [
      "Ótimos para séries únicas e interpretação temporal clara.",
      "Exigem menos dados do que deep learning em muitos casos.",
      "Merecem respeito como baseline forte."
    ],
    "metrics": [
      {
        "label": "Força típica",
        "value": "Séries estruturadas"
      },
      {
        "label": "Risco",
        "value": "Subaproveitar covariáveis complexas"
      }
    ]
  },
  {
    "id": "tabular",
    "label": "ML tabular",
    "title": "Lags e engenharia de features bem feitos",
    "description": "Árvores e regressões com features temporais podem performar muito bem em cenários práticos.",
    "bullets": [
      "Versátil e muitas vezes robusto.",
      "Feature engineering é central.",
      "Leakage entra facilmente se a engenharia for descuidada."
    ],
    "metrics": [
      {
        "label": "Força típica",
        "value": "Prática industrial"
      },
      {
        "label": "Risco",
        "value": "Feature leakage"
      }
    ]
  },
  {
    "id": "deep",
    "label": "Deep learning",
    "title": "Escala, multisséries e estrutura complexa",
    "description": "Redes profundas podem brilhar em grandes ecossistemas de séries, covariáveis ricas e padrões não lineares complexos.",
    "bullets": [
      "Podem capturar padrões ricos em larga escala.",
      "Custam mais em dados, tuning e infraestrutura.",
      "Nem sempre vencem em séries pequenas ou simples."
    ],
    "metrics": [
      {
        "label": "Força típica",
        "value": "Grandes ecossistemas"
      },
      {
        "label": "Risco",
        "value": "Complexidade sem ganho real"
      }
    ]
  }
],
});

export const interactions = {
  "time-series-forecasting-ml-leakage": primaryExplorer,
  "time-series-forecasting-ml-avaliacao": sliderPlayground,
  "time-series-forecasting-ml-familias": secondaryExplorer,
} satisfies LessonModule["interactions"];
