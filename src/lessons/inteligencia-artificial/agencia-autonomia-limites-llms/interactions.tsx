import { BarChart3, Calculator, Layers } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import {
  createScenarioExplorer,
  createSliderPlayground,
} from "../_shared/interactionFactories";

const primaryExplorer = createScenarioExplorer({
  eyebrow: "Cenários",
  title: "Em quais cenários a palavra “agente” ajuda?",
  description: "Compare três usos do termo e veja onde a descrição funcional é útil e onde começa a inflar demais o conceito.",
  tone: "violet",
  icon: <BarChart3 size={18} aria-hidden="true" />,
  scenarios: [
  {
    "id": "assistente",
    "label": "Assistente",
    "title": "Sugere e reformula",
    "description": "O sistema organiza linguagem, resume contexto e propõe próximos passos, mas não executa efeitos materiais relevantes sozinho.",
    "bullets": [
      "Boa descrição funcional de assistência cognitiva.",
      "Baixa delegação operacional.",
      "Pouco sentido em falar de autonomia forte aqui."
    ],
    "metrics": [
      {
        "label": "Delegação",
        "value": "Baixa"
      },
      {
        "label": "Risco ontológico",
        "value": "Antropomorfizar"
      }
    ],
    "bars": [
      {
        "label": "Agência funcional",
        "value": 0.46,
        "display": "46%"
      },
      {
        "label": "Autonomia forte",
        "value": 0.08,
        "display": "8%"
      },
      {
        "label": "Necessidade de supervisão",
        "value": 0.34,
        "display": "34%"
      }
    ]
  },
  {
    "id": "copiloto",
    "label": "Co-piloto",
    "title": "Planeja e usa ferramentas com confirmação",
    "description": "O sistema coordena passos intermediários e consulta serviços externos, mas ações sensíveis ainda exigem confirmação humana.",
    "bullets": [
      "Há agência funcional mais robusta.",
      "Ferramentas ampliam poder operacional.",
      "Responsabilidade continua fortemente humana e procedimental."
    ],
    "metrics": [
      {
        "label": "Delegação",
        "value": "Média"
      },
      {
        "label": "Risco ontológico",
        "value": "Inflar competência"
      }
    ],
    "bars": [
      {
        "label": "Agência funcional",
        "value": 0.72,
        "display": "72%"
      },
      {
        "label": "Autonomia forte",
        "value": 0.14,
        "display": "14%"
      },
      {
        "label": "Necessidade de supervisão",
        "value": 0.68,
        "display": "68%"
      }
    ]
  },
  {
    "id": "executor",
    "label": "Executor",
    "title": "Executa fluxo longo com pouca fricção",
    "description": "O sistema dispara ações, manipula registros ou atua sobre processos com baixa intervenção humana imediata.",
    "bullets": [
      "Maior risco prático e jurídico.",
      "Mais logs, travas e escopo explícito se tornam indispensáveis.",
      "A aparência de agente cresce junto com a necessidade de não confundir descrição funcional com sujeito moral."
    ],
    "metrics": [
      {
        "label": "Delegação",
        "value": "Alta"
      },
      {
        "label": "Risco ontológico",
        "value": "Má atribuição de culpa"
      }
    ],
    "bars": [
      {
        "label": "Agência funcional",
        "value": 0.88,
        "display": "88%"
      },
      {
        "label": "Autonomia forte",
        "value": 0.18,
        "display": "18%"
      },
      {
        "label": "Necessidade de supervisão",
        "value": 0.94,
        "display": "94%"
      }
    ]
  }
],
});

const sliderFrames = [
  {
    "label": "Sugestão",
    "metrics": [
      {
        "label": "Ação automática",
        "value": "Quase nenhuma"
      },
      {
        "label": "Risco do erro",
        "value": "Baixo"
      },
      {
        "label": "Responsabilidade operacional",
        "value": "Humana imediata"
      }
    ],
    "bars": [
      {
        "label": "Liberdade do sistema",
        "value": 0.18,
        "display": "18%"
      },
      {
        "label": "Necessidade de logs",
        "value": 0.26,
        "display": "26%"
      },
      {
        "label": "Custo do erro",
        "value": 0.24,
        "display": "24%"
      }
    ],
    "narrative": "Quando o sistema apenas sugere, a linguagem de agência pode ser útil para descrever interação, mas o risco prático ainda é contido.",
    "footer": "Baixa delegação permite experimentar com menos impacto, sem dispensar revisão."
  },
  {
    "label": "Confirmação humana",
    "metrics": [
      {
        "label": "Ação automática",
        "value": "Parcial"
      },
      {
        "label": "Risco do erro",
        "value": "Médio"
      },
      {
        "label": "Responsabilidade operacional",
        "value": "Compartilhada"
      }
    ],
    "bars": [
      {
        "label": "Liberdade do sistema",
        "value": 0.52,
        "display": "52%"
      },
      {
        "label": "Necessidade de logs",
        "value": 0.66,
        "display": "66%"
      },
      {
        "label": "Custo do erro",
        "value": 0.58,
        "display": "58%"
      }
    ],
    "narrative": "Em sistemas com confirmação humana, a qualidade da supervisão vira parte do próprio desempenho. Revisão ritual sem tempo ou contexto não é controle real.",
    "footer": "Controle humano eficaz depende de desenho do workflow, não só da presença simbólica de um humano."
  },
  {
    "label": "Execução ampla",
    "metrics": [
      {
        "label": "Ação automática",
        "value": "Alta"
      },
      {
        "label": "Risco do erro",
        "value": "Alto"
      },
      {
        "label": "Responsabilidade operacional",
        "value": "Institucionalizada"
      }
    ],
    "bars": [
      {
        "label": "Liberdade do sistema",
        "value": 0.86,
        "display": "86%"
      },
      {
        "label": "Necessidade de logs",
        "value": 0.94,
        "display": "94%"
      },
      {
        "label": "Custo do erro",
        "value": 0.9,
        "display": "90%"
      }
    ],
    "narrative": "Quanto maior a delegação, menos faz sentido falar apenas do modelo e mais precisamos falar de governança, limites de ação, rollback e prestação de contas.",
    "footer": "Autonomia operacional alta exige arquitetura institucional tão sofisticada quanto a técnica."
  }
];

const sliderPlayground = createSliderPlayground({
  eyebrow: "Escalada",
  title: "Deslize a autonomia operacional",
  description: "Veja como a exigência de supervisão cresce à medida que o sistema passa de assistente a executor.",
  tone: "amber",
  icon: <Calculator size={18} aria-hidden="true" />,
  initialState: { step: 1 },
  controls: [{
    key: "step",
    label: "Grau de delegação operacional",
    min: 0,
    max: sliderFrames.length - 1,
    step: 1,
    formatValue: (value) => sliderFrames[value]?.label ?? String(value),
  }],
  compute: (state) => sliderFrames[state.step] ?? sliderFrames[0],
});

const secondaryExplorer = createScenarioExplorer({
  eyebrow: "Atores",
  title: "Quem responde quando um sistema agentificado falha?",
  description: "Troque a lente para ver como a cadeia de responsabilidade muda conforme o papel considerado.",
  tone: "emerald",
  icon: <Layers size={18} aria-hidden="true" />,
  scenarios: [
  {
    "id": "designer",
    "label": "Designer/desenvolvedor",
    "title": "Quem definiu metas, limites e affordances?",
    "description": "Nessa camada se decide o que o sistema pode fazer, quais ferramentas acessa e como lida com erro, incerteza e parada.",
    "bullets": [
      "Escolhe arquitetura do workflow.",
      "Define guardrails, testes e escopo.",
      "Pode introduzir risco ao superdelegar ou subinstrumentar o sistema."
    ],
    "metrics": [
      {
        "label": "Ponto central",
        "value": "Projeto"
      },
      {
        "label": "Risco",
        "value": "Escopo imprudente"
      }
    ]
  },
  {
    "id": "gestor",
    "label": "Gestor/deployer",
    "title": "Quem colocou o sistema no mundo real?",
    "description": "A implantação decide contexto de uso, monitoramento, critérios de aceitação, equipe de revisão e política de incidente.",
    "bullets": [
      "Escolhe onde a automação entra.",
      "Define procedimentos de resposta a falhas.",
      "Transforma capability em impacto institucional."
    ],
    "metrics": [
      {
        "label": "Ponto central",
        "value": "Governança"
      },
      {
        "label": "Risco",
        "value": "Lavagem de responsabilidade"
      }
    ]
  },
  {
    "id": "usuario",
    "label": "Usuário final",
    "title": "Quem acionou, supervisionou ou confiou demais?",
    "description": "Usuários também participam da cadeia causal, sobretudo quando delegam sem verificar ou usam o sistema fora do escopo previsto.",
    "bullets": [
      "Pode haver overreliance.",
      "Treinamento e interface importam muito.",
      "Culpar só o usuário costuma esconder falhas de desenho e política."
    ],
    "metrics": [
      {
        "label": "Ponto central",
        "value": "Uso situado"
      },
      {
        "label": "Risco",
        "value": "Overreliance"
      }
    ]
  }
],
});

export const interactions = {
  "agencia-autonomia-limites-llms-cenarios": primaryExplorer,
  "agencia-autonomia-limites-llms-autonomia": sliderPlayground,
  "agencia-autonomia-limites-llms-atores": secondaryExplorer,
} satisfies LessonModule["interactions"];
