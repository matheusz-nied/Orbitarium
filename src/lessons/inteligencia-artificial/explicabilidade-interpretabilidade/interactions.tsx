import { BarChart3, Calculator, Layers } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import {
  createScenarioExplorer,
  createSliderPlayground,
} from "../_shared/interactionFactories";

const primaryExplorer = createScenarioExplorer({
  eyebrow: "Tipos",
  title: "Navegue pelos tipos de explicação",
  description: "Compare o que cada classe de explicação costuma responder melhor — e o que ela deixa de fora.",
  tone: "amber",
  icon: <BarChart3 size={18} aria-hidden="true" />,
  scenarios: [
  {
    "id": "local",
    "label": "Local",
    "title": "Iluminar um caso específico",
    "description": "Útil quando queremos entender por que uma pessoa, imagem ou documento recebeu certa saída.",
    "bullets": [
      "Bom para contestação e revisão de caso.",
      "Não descreve sozinho o comportamento global do sistema.",
      "Pode variar bastante com pequenas mudanças de configuração."
    ],
    "metrics": [
      {
        "label": "Escopo",
        "value": "Caso"
      },
      {
        "label": "Risco",
        "value": "Generalização indevida"
      }
    ],
    "bars": [
      {
        "label": "Ajuda em recurso",
        "value": 0.84,
        "display": "84%"
      },
      {
        "label": "Explica o sistema todo",
        "value": 0.22,
        "display": "22%"
      },
      {
        "label": "Sensibilidade a configuração",
        "value": 0.78,
        "display": "78%"
      }
    ]
  },
  {
    "id": "global",
    "label": "Global",
    "title": "Resumir o comportamento geral",
    "description": "Útil quando queremos padrões amplos do modelo: features dominantes, regras estruturais ou regiões de decisão.",
    "bullets": [
      "Ajuda na auditoria e no desenho do sistema.",
      "Pode esconder casos extremos ou injustiças localizadas.",
      "Nem sempre é suficiente para explicar decisões individuais."
    ],
    "metrics": [
      {
        "label": "Escopo",
        "value": "Sistema"
      },
      {
        "label": "Risco",
        "value": "Apagar exceções"
      }
    ],
    "bars": [
      {
        "label": "Ajuda em auditoria",
        "value": 0.82,
        "display": "82%"
      },
      {
        "label": "Explica um caso concreto",
        "value": 0.34,
        "display": "34%"
      },
      {
        "label": "Cobertura média",
        "value": 0.76,
        "display": "76%"
      }
    ]
  },
  {
    "id": "intrinseca",
    "label": "Intrínseca",
    "title": "Legibilidade na própria forma do modelo",
    "description": "Útil quando a estrutura do modelo já é legível o bastante para apoiar inspeção e governança mais direta.",
    "bullets": [
      "Fidelidade tende a ser maior porque explicação e mecanismo se aproximam.",
      "Nem sempre alcança o melhor desempenho em tarefas muito complexas.",
      "Pode ser especialmente valiosa em alto risco."
    ],
    "metrics": [
      {
        "label": "Escopo",
        "value": "Mecanismo"
      },
      {
        "label": "Risco",
        "value": "Capacidade limitada"
      }
    ],
    "bars": [
      {
        "label": "Fidelidade",
        "value": 0.9,
        "display": "90%"
      },
      {
        "label": "Facilidade operacional",
        "value": 0.58,
        "display": "58%"
      },
      {
        "label": "Aderência a alto risco",
        "value": 0.86,
        "display": "86%"
      }
    ]
  }
],
});

const sliderFrames = [
  {
    "label": "Exploratório",
    "metrics": [
      {
        "label": "Consequência do erro",
        "value": "Baixa"
      },
      {
        "label": "Aceitação de pós-hoc",
        "value": "Alta"
      },
      {
        "label": "Preferência por intrínseco",
        "value": "Opcional"
      }
    ],
    "bars": [
      {
        "label": "Tolerância à opacidade",
        "value": 0.78,
        "display": "78%"
      },
      {
        "label": "Exigência de recurso",
        "value": 0.24,
        "display": "24%"
      },
      {
        "label": "Necessidade de auditoria formal",
        "value": 0.28,
        "display": "28%"
      }
    ],
    "narrative": "Em cenários exploratórios, explicações pós-hoc podem ser excelentes ferramentas de investigação, desde que ninguém as confunda com garantia forte de governança.",
    "footer": "Baixo risco amplia o espaço para técnicas aproximadas e uso experimental."
  },
  {
    "label": "Operacional",
    "metrics": [
      {
        "label": "Consequência do erro",
        "value": "Média"
      },
      {
        "label": "Aceitação de pós-hoc",
        "value": "Moderada"
      },
      {
        "label": "Preferência por intrínseco",
        "value": "Contextual"
      }
    ],
    "bars": [
      {
        "label": "Tolerância à opacidade",
        "value": 0.52,
        "display": "52%"
      },
      {
        "label": "Exigência de recurso",
        "value": 0.58,
        "display": "58%"
      },
      {
        "label": "Necessidade de auditoria formal",
        "value": 0.62,
        "display": "62%"
      }
    ],
    "narrative": "Quando o sistema entra em produção, a pergunta deixa de ser apenas “isso ajuda a entender?” e passa a incluir “isso ajuda a monitorar, contestar e corrigir?”.",
    "footer": "Em produção, a explicação precisa conversar com observabilidade e responsabilidade institucional."
  },
  {
    "label": "Alto risco",
    "metrics": [
      {
        "label": "Consequência do erro",
        "value": "Alta"
      },
      {
        "label": "Aceitação de pós-hoc",
        "value": "Baixa"
      },
      {
        "label": "Preferência por intrínseco",
        "value": "Forte"
      }
    ],
    "bars": [
      {
        "label": "Tolerância à opacidade",
        "value": 0.18,
        "display": "18%"
      },
      {
        "label": "Exigência de recurso",
        "value": 0.92,
        "display": "92%"
      },
      {
        "label": "Necessidade de auditoria formal",
        "value": 0.94,
        "display": "94%"
      }
    ],
    "narrative": "Quando saúde, justiça, emprego ou crédito estão em jogo, explicações aproximadas podem não bastar. A própria escolha do modelo se torna parte da ética do sistema.",
    "footer": "Em alto risco, a pergunta sobre interpretabilidade deixa de ser luxo metodológico e vira requisito de governança."
  }
];

const sliderPlayground = createSliderPlayground({
  eyebrow: "Risco",
  title: "Deslize o contexto de uso",
  description: "Quanto mais alto o risco da decisão, mais a exigência sobre fidelidade, recurso e escolha prudente do modelo aumenta.",
  tone: "violet",
  icon: <Calculator size={18} aria-hidden="true" />,
  initialState: { step: 1 },
  controls: [{
    key: "step",
    label: "Nível de risco da aplicação",
    min: 0,
    max: sliderFrames.length - 1,
    step: 1,
    formatValue: (value) => sliderFrames[value]?.label ?? String(value),
  }],
  compute: (state) => sliderFrames[state.step] ?? sliderFrames[0],
});

const secondaryExplorer = createScenarioExplorer({
  eyebrow: "Audiências",
  title: "Escolha quem precisa da explicação",
  description: "A utilidade da explicação muda conforme o usuário, o dano possível e a ação que a pessoa precisa tomar.",
  tone: "emerald",
  icon: <Layers size={18} aria-hidden="true" />,
  scenarios: [
  {
    "id": "afetado",
    "label": "Pessoa afetada",
    "title": "Quero entender e contestar a decisão",
    "description": "A pessoa diretamente impactada precisa motivos acionáveis, não uma aula de SHAP em abstrato.",
    "bullets": [
      "Explicação deve ser inteligível e ligada ao caso.",
      "É crucial haver possibilidade de recurso ou correção.",
      "O foco é justificativa prática, não decomposição completa do modelo."
    ],
    "metrics": [
      {
        "label": "Pergunta central",
        "value": "Como recorrer?"
      },
      {
        "label": "Risco",
        "value": "Formalismo vazio"
      }
    ]
  },
  {
    "id": "tecnico",
    "label": "Equipe técnica",
    "title": "Quero depurar, testar estabilidade e localizar erro",
    "description": "Para a equipe técnica, explicações funcionam como instrumentos de diagnóstico, comparação e monitoramento.",
    "bullets": [
      "Interessa saber robustez, sensibilidade e fidelidade.",
      "Ferramentas pós-hoc podem ser muito úteis nessa camada.",
      "É preciso separar correlação explicativa de causalidade."
    ],
    "metrics": [
      {
        "label": "Pergunta central",
        "value": "O que o modelo está usando?"
      },
      {
        "label": "Risco",
        "value": "Superinterpretação"
      }
    ]
  },
  {
    "id": "regulador",
    "label": "Regulador/gestor",
    "title": "Quero responsabilização e comparabilidade",
    "description": "Nessa camada, importam documentação, escopo, monitoramento, limites declarados e consistência de procedimento.",
    "bullets": [
      "Explicação isolada não basta sem trilha de governança.",
      "Model cards, logs e critérios de uso são centrais.",
      "A questão é tanto institucional quanto matemática."
    ],
    "metrics": [
      {
        "label": "Pergunta central",
        "value": "Quem responde pelo sistema?"
      },
      {
        "label": "Risco",
        "value": "Caixa-preta administrada"
      }
    ]
  }
],
});

export const interactions = {
  "explicabilidade-interpretabilidade-tipos": primaryExplorer,
  "explicabilidade-interpretabilidade-riscos": sliderPlayground,
  "explicabilidade-interpretabilidade-usuarios": secondaryExplorer,
} satisfies LessonModule["interactions"];
