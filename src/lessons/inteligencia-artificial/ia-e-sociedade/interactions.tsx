import { BarChart3, Calculator, Layers } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import {
  createScenarioExplorer,
  createSliderPlayground,
} from "../_shared/interactionFactories";

const primaryExplorer = createScenarioExplorer({
  eyebrow: "Conflitos",
  title: "Compare três conflitos sociais recorrentes",
  description: "Cada cenário mostra uma tensão típica na adoção social de IA: trabalho, criação e responsabilização.",
  tone: "emerald",
  icon: <BarChart3 size={18} aria-hidden="true" />,
  scenarios: [
  {
    "id": "trabalho",
    "label": "Trabalho",
    "title": "Produtividade para quem?",
    "description": "A mesma ferramenta pode aliviar tarefas repetitivas ou intensificar metas e vigilância, dependendo do arranjo laboral.",
    "bullets": [
      "Ganhos de produtividade não se distribuem sozinhos.",
      "Automação parcial pode aumentar controle sobre o trabalhador.",
      "Qualificação e negociação importam."
    ],
    "metrics": [
      {
        "label": "Pergunta central",
        "value": "Quem captura o ganho?"
      },
      {
        "label": "Risco",
        "value": "Precarização"
      }
    ],
    "bars": [
      {
        "label": "Potencial de aumento de capacidade",
        "value": 0.82,
        "display": "82%"
      },
      {
        "label": "Risco de intensificação",
        "value": 0.74,
        "display": "74%"
      },
      {
        "label": "Dependência de governança",
        "value": 0.92,
        "display": "92%"
      }
    ]
  },
  {
    "id": "autoria",
    "label": "Autoria",
    "title": "Criar com IA é o quê exatamente?",
    "description": "Entre saída bruta, curadoria e transformação, há muitos graus de contribuição humana possíveis.",
    "bullets": [
      "Prompt não esgota a análise de autoria.",
      "Curadoria e edição podem ser centrais.",
      "Plataformas e licenças influenciam captura de valor."
    ],
    "metrics": [
      {
        "label": "Pergunta central",
        "value": "Onde está a contribuição humana?"
      },
      {
        "label": "Risco",
        "value": "Apagamento de autoria"
      }
    ],
    "bars": [
      {
        "label": "Ambiguidade jurídica",
        "value": 0.84,
        "display": "84%"
      },
      {
        "label": "Importância da curadoria",
        "value": 0.76,
        "display": "76%"
      },
      {
        "label": "Necessidade de documentação",
        "value": 0.82,
        "display": "82%"
      }
    ]
  },
  {
    "id": "responsabilidade",
    "label": "Responsabilidade",
    "title": "Quem responde quando a automação erra?",
    "description": "Sistemas de IA tornam cadeias de decisão mais complexas, mas isso não justifica dissolver a responsabilização.",
    "bullets": [
      "Projeto, implantação e uso compartilham causalidade.",
      "O discurso de neutralidade técnica pode ocultar decisão humana.",
      "Recurso e reparo importam tanto quanto acurácia."
    ],
    "metrics": [
      {
        "label": "Pergunta central",
        "value": "Quem presta contas?"
      },
      {
        "label": "Risco",
        "value": "Lavagem algorítmica"
      }
    ],
    "bars": [
      {
        "label": "Complexidade causal",
        "value": 0.88,
        "display": "88%"
      },
      {
        "label": "Necessidade de logs",
        "value": 0.9,
        "display": "90%"
      },
      {
        "label": "Necessidade de recurso",
        "value": 0.94,
        "display": "94%"
      }
    ]
  }
],
});

const sliderFrames = [
  {
    "label": "Apoio",
    "metrics": [
      {
        "label": "Delegação",
        "value": "Baixa"
      },
      {
        "label": "Risco social",
        "value": "Contido"
      },
      {
        "label": "Necessidade de requalificação",
        "value": "Moderada"
      }
    ],
    "bars": [
      {
        "label": "Autonomia humana preservada",
        "value": 0.82,
        "display": "82%"
      },
      {
        "label": "Risco de corte de postos",
        "value": 0.22,
        "display": "22%"
      },
      {
        "label": "Necessidade de governança",
        "value": 0.56,
        "display": "56%"
      }
    ],
    "narrative": "Quando a IA entra como apoio, costuma ampliar produtividade sem retirar integralmente o controle do processo. Ainda assim, precisa de regra de uso e proteção contra intensificação invisível.",
    "footer": "Apoio não é socialmente neutro: ele pode melhorar ou degradar o trabalho conforme o desenho."
  },
  {
    "label": "Reconfiguração",
    "metrics": [
      {
        "label": "Delegação",
        "value": "Média"
      },
      {
        "label": "Risco social",
        "value": "Médio"
      },
      {
        "label": "Necessidade de requalificação",
        "value": "Alta"
      }
    ],
    "bars": [
      {
        "label": "Autonomia humana preservada",
        "value": 0.54,
        "display": "54%"
      },
      {
        "label": "Risco de corte de postos",
        "value": 0.56,
        "display": "56%"
      },
      {
        "label": "Necessidade de governança",
        "value": 0.82,
        "display": "82%"
      }
    ],
    "narrative": "Na reconfiguração, tarefas mudam e fronteiras ocupacionais se deslocam. Sem participação e treinamento, o ganho vira instabilidade para grupos específicos.",
    "footer": "É a zona em que política de transição faz mais diferença."
  },
  {
    "label": "Substituição dura",
    "metrics": [
      {
        "label": "Delegação",
        "value": "Alta"
      },
      {
        "label": "Risco social",
        "value": "Alto"
      },
      {
        "label": "Necessidade de requalificação",
        "value": "Muito alta"
      }
    ],
    "bars": [
      {
        "label": "Autonomia humana preservada",
        "value": 0.18,
        "display": "18%"
      },
      {
        "label": "Risco de corte de postos",
        "value": 0.9,
        "display": "90%"
      },
      {
        "label": "Necessidade de governança",
        "value": 0.96,
        "display": "96%"
      }
    ],
    "narrative": "Quando a lógica principal é substituição e corte, os ganhos de produtividade tendem a se concentrar. A ausência de proteção amplifica desigualdade e ressentimento social.",
    "footer": "Automação agressiva sem governança pode ser eficiente localmente e socialmente destrutiva."
  }
];

const sliderPlayground = createSliderPlayground({
  eyebrow: "Transição",
  title: "Deslize o modo de adoção",
  description: "O impacto social muda quando a mesma capacidade técnica é adotada como apoio, reconfiguração ou substituição dura.",
  tone: "amber",
  icon: <Calculator size={18} aria-hidden="true" />,
  initialState: { step: 1 },
  controls: [{
    key: "step",
    label: "Modo predominante de adoção",
    min: 0,
    max: sliderFrames.length - 1,
    step: 1,
    formatValue: (value) => sliderFrames[value]?.label ?? String(value),
  }],
  compute: (state) => sliderFrames[state.step] ?? sliderFrames[0],
});

const secondaryExplorer = createScenarioExplorer({
  eyebrow: "Stakeholders",
  title: "Troque o stakeholder central",
  description: "O que conta como boa adoção muda conforme olhamos para trabalhador, criador ou instituição pública.",
  tone: "teal",
  icon: <Layers size={18} aria-hidden="true" />,
  scenarios: [
  {
    "id": "trabalhador",
    "label": "Trabalhador",
    "title": "Quero saber como minha tarefa e meu poder de barganha mudam",
    "description": "Para quem trabalha, importam ritmo, autonomia, monitoramento, qualificação e distribuição do ganho de produtividade.",
    "bullets": [
      "A mesma ferramenta pode aliviar ou intensificar o trabalho.",
      "Participação no redesenho do processo importa.",
      "Transição sem proteção tende a ser regressiva."
    ],
    "metrics": [
      {
        "label": "Foco",
        "value": "Condição de trabalho"
      },
      {
        "label": "Risco",
        "value": "Intensificação"
      }
    ]
  },
  {
    "id": "criador",
    "label": "Criador",
    "title": "Quero saber como minha contribuição será reconhecida e remunerada",
    "description": "Para criadores, importam autoria, licenciamento, rastreio, captura de valor e opacidade do treinamento.",
    "bullets": [
      "Prompt, curadoria e edição têm pesos diferentes.",
      "A regra de plataforma interfere no reconhecimento.",
      "Copyright é uma parte do problema, não o todo."
    ],
    "metrics": [
      {
        "label": "Foco",
        "value": "Reconhecimento e valor"
      },
      {
        "label": "Risco",
        "value": "Apagamento"
      }
    ]
  },
  {
    "id": "instituicao",
    "label": "Instituição",
    "title": "Quero saber se o sistema é governável e reparável",
    "description": "Para instituições, importam trilha de decisão, recurso, responsabilidade e compatibilidade com direitos e políticas públicas.",
    "bullets": [
      "Adoção responsável precisa de escopo e accountability.",
      "Eficiência sem reparação é governança ruim.",
      "Monitoramento contínuo é parte do sistema."
    ],
    "metrics": [
      {
        "label": "Foco",
        "value": "Prestação de contas"
      },
      {
        "label": "Risco",
        "value": "Opacidade institucional"
      }
    ]
  }
],
});

export const interactions = {
  "ia-e-sociedade-conflitos": primaryExplorer,
  "ia-e-sociedade-transicao": sliderPlayground,
  "ia-e-sociedade-stakeholders": secondaryExplorer,
} satisfies LessonModule["interactions"];
