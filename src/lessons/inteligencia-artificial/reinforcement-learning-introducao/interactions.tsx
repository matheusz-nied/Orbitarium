import { BarChart3, Calculator, Layers } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import {
  createScenarioExplorer,
  createSliderPlayground,
} from "../_shared/interactionFactories";

const primaryExplorer = createScenarioExplorer({
  eyebrow: "Cenários",
  title: "Compare três dilemas clássicos de exploração",
  description: "Veja como o problema muda quando o ambiente parece simples, competitivo ou arriscado.",
  tone: "indigo",
  icon: <BarChart3 size={18} aria-hidden="true" />,
  scenarios: [
  {
    "id": "bandit",
    "label": "Bandit",
    "title": "Escolher entre braços incertos",
    "description": "O agente precisa testar opções com retorno desconhecido e ir ajustando a preferência conforme observa resultado.",
    "bullets": [
      "Forma mais simples do dilema exploração-explotação.",
      "Não há estado complexo, mas já há incerteza de ação.",
      "Ótimo para intuição inicial."
    ],
    "metrics": [
      {
        "label": "Estado",
        "value": "Quase estático"
      },
      {
        "label": "Desafio central",
        "value": "Exploração"
      }
    ],
    "bars": [
      {
        "label": "Complexidade temporal",
        "value": 0.22,
        "display": "22%"
      },
      {
        "label": "Importância da exploração",
        "value": 0.92,
        "display": "92%"
      },
      {
        "label": "Risco do atalho",
        "value": 0.66,
        "display": "66%"
      }
    ]
  },
  {
    "id": "jogo",
    "label": "Jogo",
    "title": "Sequência longa e competitiva",
    "description": "A ação atual molda o futuro em ambiente estratégico com recompensa muitas vezes atrasada até o final do episódio.",
    "bullets": [
      "Crédito temporal fica muito mais difícil.",
      "Valor de longo prazo é decisivo.",
      "Busca e simulação podem ajudar bastante."
    ],
    "metrics": [
      {
        "label": "Estado",
        "value": "Sequencial"
      },
      {
        "label": "Desafio central",
        "value": "Planejamento"
      }
    ],
    "bars": [
      {
        "label": "Complexidade temporal",
        "value": 0.84,
        "display": "84%"
      },
      {
        "label": "Importância da exploração",
        "value": 0.68,
        "display": "68%"
      },
      {
        "label": "Risco do atalho",
        "value": 0.88,
        "display": "88%"
      }
    ]
  },
  {
    "id": "mundo-real",
    "label": "Mundo real",
    "title": "Explorar pode ser caro ou perigoso",
    "description": "Em domínios reais, o agente não pode simplesmente experimentar livremente sem considerar segurança, custo e governança.",
    "bullets": [
      "A coleta de experiência é cara.",
      "Feedback pode ser lento ou parcial.",
      "Segurança e simulação se tornam centrais."
    ],
    "metrics": [
      {
        "label": "Estado",
        "value": "Parcial/complexo"
      },
      {
        "label": "Desafio central",
        "value": "Explorar com segurança"
      }
    ],
    "bars": [
      {
        "label": "Complexidade temporal",
        "value": 0.78,
        "display": "78%"
      },
      {
        "label": "Importância da exploração",
        "value": 0.74,
        "display": "74%"
      },
      {
        "label": "Risco do atalho",
        "value": 0.94,
        "display": "94%"
      }
    ]
  }
],
});

const sliderFrames = [
  {
    "label": "Curto",
    "metrics": [
      {
        "label": "Foco temporal",
        "value": "Imediato"
      },
      {
        "label": "Miopia estratégica",
        "value": "Alta"
      },
      {
        "label": "Estabilidade de treino",
        "value": "Mais simples"
      }
    ],
    "bars": [
      {
        "label": "Valorização do presente",
        "value": 0.92,
        "display": "92%"
      },
      {
        "label": "Aceitação de perdas locais",
        "value": 0.18,
        "display": "18%"
      },
      {
        "label": "Risco de estratégia míope",
        "value": 0.88,
        "display": "88%"
      }
    ],
    "narrative": "Horizonte curto favorece decisões que parecem ótimas agora, mesmo que prejudiquem trajetórias melhores no futuro.",
    "footer": "Bom para estabilidade local, ruim para tarefas em que o payoff relevante demora."
  },
  {
    "label": "Intermediário",
    "metrics": [
      {
        "label": "Foco temporal",
        "value": "Misto"
      },
      {
        "label": "Miopia estratégica",
        "value": "Moderada"
      },
      {
        "label": "Estabilidade de treino",
        "value": "Equilibrada"
      }
    ],
    "bars": [
      {
        "label": "Valorização do presente",
        "value": 0.58,
        "display": "58%"
      },
      {
        "label": "Aceitação de perdas locais",
        "value": 0.56,
        "display": "56%"
      },
      {
        "label": "Risco de estratégia míope",
        "value": 0.52,
        "display": "52%"
      }
    ],
    "narrative": "Horizonte intermediário tenta equilibrar viabilidade de aprendizado e consideração de efeitos futuros relevantes.",
    "footer": "É frequentemente um compromisso prático entre ambição de longo prazo e sinal aprendível."
  },
  {
    "label": "Longo",
    "metrics": [
      {
        "label": "Foco temporal",
        "value": "Futuro"
      },
      {
        "label": "Miopia estratégica",
        "value": "Baixa"
      },
      {
        "label": "Estabilidade de treino",
        "value": "Mais difícil"
      }
    ],
    "bars": [
      {
        "label": "Valorização do presente",
        "value": 0.24,
        "display": "24%"
      },
      {
        "label": "Aceitação de perdas locais",
        "value": 0.88,
        "display": "88%"
      },
      {
        "label": "Risco de estratégia míope",
        "value": 0.18,
        "display": "18%"
      }
    ],
    "narrative": "Horizonte longo permite estratégias mais pacientes, mas também aumenta variância, dificuldade de crédito temporal e risco de otimizar sinais mal desenhados.",
    "footer": "Olhar longe é poderoso, mas só ajuda quando a recompensa faz sentido e o ambiente permite aprender."
  }
];

const sliderPlayground = createSliderPlayground({
  eyebrow: "Horizonte",
  title: "Deslize o horizonte de planejamento",
  description: "Veja como o comportamento do agente muda quando ele olha mais para o agora ou mais para o futuro.",
  tone: "amber",
  icon: <Calculator size={18} aria-hidden="true" />,
  initialState: { step: 1 },
  controls: [{
    key: "step",
    label: "Horizonte de planejamento",
    min: 0,
    max: sliderFrames.length - 1,
    step: 1,
    formatValue: (value) => sliderFrames[value]?.label ?? String(value),
  }],
  compute: (state) => sliderFrames[state.step] ?? sliderFrames[0],
});

const secondaryExplorer = createScenarioExplorer({
  eyebrow: "Tarefas",
  title: "Troque o tipo de tarefa",
  description: "Nem todo domínio precisa do mesmo grau de RL; observe onde a formulação se encaixa melhor.",
  tone: "teal",
  icon: <Layers size={18} aria-hidden="true" />,
  scenarios: [
  {
    "id": "controle",
    "label": "Controle",
    "title": "Ações alteram continuamente o estado do sistema",
    "description": "Robótica, navegação e controle industrial são exemplos em que o mundo responde a cada ação e o tempo importa o tempo todo.",
    "bullets": [
      "Estado e transição são centrais.",
      "Segurança de exploração é crítica.",
      "Simulação costuma ser valiosa."
    ],
    "metrics": [
      {
        "label": "Adequação de RL",
        "value": "Alta"
      },
      {
        "label": "Risco",
        "value": "Exploração insegura"
      }
    ]
  },
  {
    "id": "recomendacao",
    "label": "Recomendação",
    "title": "Ações influenciam comportamento futuro do usuário",
    "description": "Sistemas de recomendação sequencial podem se beneficiar de RL quando há efeito de longo prazo e feedback dependente da política.",
    "bullets": [
      "Curto e longo prazo podem entrar em tensão.",
      "Recompensa mal definida leva a otimização oportunista.",
      "Muitos problemas do setor ainda são formulados de outras maneiras."
    ],
    "metrics": [
      {
        "label": "Adequação de RL",
        "value": "Contextual"
      },
      {
        "label": "Risco",
        "value": "Reward hacking"
      }
    ]
  },
  {
    "id": "estatico",
    "label": "Predição estática",
    "title": "Sem sequência relevante, RL pode ser overkill",
    "description": "Se não há ambiente reagindo à ação nem retorno acumulado relevante, talvez outra formulação seja mais simples e melhor.",
    "bullets": [
      "Classificação e regressão bastam em muitos casos.",
      "Chamar tudo de agente atrapalha o desenho.",
      "Escolher o paradigma certo economiza complexidade."
    ],
    "metrics": [
      {
        "label": "Adequação de RL",
        "value": "Baixa"
      },
      {
        "label": "Risco",
        "value": "Overengineering"
      }
    ]
  }
],
});

export const interactions = {
  "reinforcement-learning-introducao-cenarios": primaryExplorer,
  "reinforcement-learning-introducao-horizonte": sliderPlayground,
  "reinforcement-learning-introducao-tarefas": secondaryExplorer,
} satisfies LessonModule["interactions"];
