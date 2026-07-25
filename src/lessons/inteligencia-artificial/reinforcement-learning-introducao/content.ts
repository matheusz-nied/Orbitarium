import type { LessonContent } from "../../../types/content";

export const reinforcementLearningIntroducaoContent: LessonContent = {
  "id": "reinforcement-learning-introducao",
  "title": "Reinforcement Learning: Introdução Conceitual",
  "subtitle": "Aprender a agir ao longo do tempo quando a resposta certa não vem pronta, só a consequência acumulada.",
  "description": "Uma aula avançada e conceitual sobre agentes, estados, ações, recompensa, retorno, exploração, crédito temporal e quando RL é ou não uma boa formulação.",
  "primaryCategoryId": "inteligencia-artificial",
  "secondaryCategoryId": "computacao",
  "level": "Avançado",
  "estimatedTime": "50-65 min",
  "tags": [
    "Reinforcement Learning",
    "Agente",
    "MDP",
    "Exploração",
    "Retorno",
    "Política"
  ],
  "learningObjectives": [
    "Distinguir RL de supervisão e de simples otimização estática.",
    "Entender os papéis de estado, ação, recompensa e política em problemas sequenciais.",
    "Explicar por que retorno acumulado e atraso de recompensa tornam RL difícil.",
    "Reconhecer o dilema exploração versus explotação como tensão estrutural do paradigma.",
    "Entender intuições de valor, crédito temporal e bootstrapping sem depender de formalismo excessivo.",
    "Saber quando um problema parece RL de verdade e quando é apenas previsão disfarçada."
  ],
  "prerequisites": [
    "Noção básica de aprendizado de máquina.",
    "Conforto com a ideia de decisão em múltiplos passos.",
    "Curiosidade sobre agentes, jogos, controle ou otimização sequencial."
  ],
  "references": [
    {
      "title": "Reinforcement Learning: An Introduction",
      "source": "Sutton & Barto",
      "url": "http://incompleteideas.net/book/the-book.html",
      "note": "Livro clássico, gratuito e oficial da área."
    },
    {
      "title": "Reinforcement Learning: An Introduction (PDF)",
      "source": "Sutton & Barto / CMU mirror",
      "url": "https://www.andrew.cmu.edu/course/10-703/textbook/BartoSutton.pdf",
      "note": "Versão em PDF amplamente usada em cursos."
    },
    {
      "title": "Teaching",
      "source": "David Silver",
      "url": "https://www.davidsilver.uk/teaching/",
      "note": "Curso clássico com ênfase conceitual em valor, política e controle."
    },
    {
      "title": "Spinning Up in Deep RL",
      "source": "OpenAI",
      "url": "https://spinningup.openai.com/en/latest/",
      "note": "Material didático de referência sobre RL moderno."
    },
    {
      "title": "Playing Atari with Deep Reinforcement Learning",
      "source": "Mnih et al. — arXiv",
      "url": "https://arxiv.org/abs/1312.5602",
      "note": "Marco do uso de deep RL em jogos Atari."
    },
    {
      "title": "Mastering the game of Go with deep neural networks and tree search",
      "source": "Silver et al. — Nature",
      "url": "https://www.nature.com/articles/nature16961",
      "note": "Caso emblemático do uso de RL e busca em jogos complexos."
    }
  ],
  "heroVisual": "reinforcement-learning-introducao-hero",
  "openingText": "Em problemas supervisionados, a resposta correta já está no dataset. Em RL, ela não vem pronta por passo. O agente precisa agir, observar consequência, acumular recompensa e descobrir que algumas decisões ruins hoje podem ser necessárias para ganhos melhores amanhã. Esse deslocamento — de prever uma saída para aprender uma política de ação ao longo do tempo — muda completamente o tipo de dificuldade do problema.",
  "quickFacts": [
    {
      "title": "O problema é sequencial",
      "body": "Uma boa ação agora pode ser ruim localmente e ótima no horizonte maior."
    },
    {
      "title": "O feedback é escasso",
      "body": "Muitas vezes o agente não recebe correção detalhada por passo, apenas recompensas agregadas ou atrasadas."
    },
    {
      "title": "Explorar custa",
      "body": "Aprender requer testar ações, mas testar ações erradas pode ser caro, lento ou arriscado."
    }
  ],
  "sections": [
    {
      "id": "o-que-muda",
      "eyebrow": "Mudança de paradigma",
      "title": "RL não aprende uma resposta; aprende uma forma de agir",
      "lead": "A diferença essencial do RL é que o objeto da aprendizagem não é apenas um mapeamento entrada-saída, mas uma política: o que fazer em cada situação para maximizar retorno ao longo do tempo.",
      "paragraphs": [
        "Isso já mostra por que a formulação é delicada. O agente não interage com exemplos independentes; ele altera o ambiente com suas próprias ações. As observações futuras dependem do que ele fez antes.",
        "É por isso que RL combina aprendizado e controle. O sistema precisa decidir e aprender com o efeito de suas decisões sobre o próprio fluxo de experiência."
      ],
      "visual": "reinforcement-learning-introducao-hero",
      "blocks": [
        {
          "type": "definition",
          "title": "Política",
          "body": "Estratégia que associa estados a ações ou distribuições sobre ações."
        },
        {
          "type": "insight",
          "title": "Prever não basta",
          "body": "Um excelente preditor pode ainda ser um péssimo agente se não souber escolher ações ao longo do tempo."
        }
      ]
    },
    {
      "id": "mdp",
      "eyebrow": "Estrutura do problema",
      "title": "Estado, ação, recompensa e transição formam o vocabulário mínimo",
      "lead": "Em nível conceitual, um problema de RL costuma ser descrito por estados, ações possíveis, recompensas e dinâmica de transição. O agente observa algo sobre a situação, escolhe uma ação e recebe de volta novo estado e sinal de recompensa.",
      "paragraphs": [
        "Esse vocabulário não implica que o mundo seja perfeitamente conhecido ou plenamente observável. Ele apenas organiza o tipo de pergunta que fazemos: qual ação tende a produzir melhor retorno dadas as consequências futuras que ela desencadeia?",
        "Mesmo antes de qualquer equação, esse enquadramento já ajuda a reconhecer se estamos diante de um problema genuinamente sequencial ou apenas de uma previsão estática mal descrita."
      ],
      "visual": "reinforcement-learning-introducao-mdp",
      "blocks": [
        {
          "type": "definition",
          "title": "Recompensa",
          "body": "Sinal numérico que indica quão desejável foi um resultado imediato ou local."
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Confundir recompensa local com objetivo final. Em RL, boas recompensas precisam orientar o que realmente queremos no horizonte total."
        }
      ]
    },
    {
      "id": "exploracao",
      "eyebrow": "Dilema estrutural",
      "title": "Explorar ou aproveitar? O agente precisa das duas coisas",
      "lead": "Se o agente só repete a melhor ação conhecida até agora, talvez nunca descubra opções melhores. Se explora demais, desperdiça retorno e pode correr riscos desnecessários. Esse equilíbrio é o dilema exploração versus explotação.",
      "paragraphs": [
        "Ele é estrutural, não um detalhe de implementação. Todo sistema que aprende interagindo com um ambiente precisa decidir quanto arriscar para descobrir mais e quanto capitalizar o que já sabe.",
        "Em ambientes reais, o custo da exploração importa enormemente. O que parece aceitável em um jogo pode ser imprudente em saúde, finanças ou direção autônoma."
      ],
      "interactive": "reinforcement-learning-introducao-cenarios",
      "blocks": [
        {
          "type": "definition",
          "title": "Exploração",
          "body": "Ação voltada a obter informação sobre alternativas ainda pouco conhecidas."
        },
        {
          "type": "definition",
          "title": "Explotação",
          "body": "Uso da melhor ação conhecida até o momento para obter retorno imediato maior."
        }
      ]
    },
    {
      "id": "retorno",
      "eyebrow": "Tempo importa",
      "title": "Recompensa atrasada torna a atribuição de mérito muito mais difícil",
      "lead": "Muitas tarefas de RL têm recompensas atrasadas. Uma decisão agora pode produzir consequência só vários passos depois. O agente precisa então resolver o problema de crédito temporal: qual ação passada merece crédito ou culpa pelo resultado futuro?",
      "paragraphs": [
        "Essa é uma das diferenças mais profundas em relação a tarefas supervisionadas. Nem sempre sabemos imediatamente qual rótulo deveria acompanhar cada ação intermediária. O sistema precisa aprender isso indiretamente, por propagação de valor e estrutura do ambiente.",
        "Quando o horizonte cresce, a dificuldade também cresce: trajetórias longas aumentam incerteza, variância e risco de otimizar atalhos ruins de recompensa."
      ],
      "visual": "reinforcement-learning-introducao-recompensa-atrasada",
      "blocks": [
        {
          "type": "definition",
          "title": "Crédito temporal",
          "body": "Problema de atribuir a ações passadas responsabilidade por recompensas observadas depois."
        },
        {
          "type": "example",
          "title": "Exemplo",
          "body": "Em um jogo, pegar um item agora pode parecer inútil localmente, mas ser decisivo para pontuar muito mais no fim da fase."
        }
      ]
    },
    {
      "id": "valor",
      "eyebrow": "Intuição",
      "title": "Funções de valor condensam expectativa de futuro",
      "lead": "Para agir melhor, o agente precisa de alguma noção do que tende a acontecer depois de cada estado ou ação. Funções de valor sintetizam essa expectativa de retorno futuro em um número útil para decisão.",
      "paragraphs": [
        "Esse número não é verdade metafísica sobre o mundo; é uma estimativa operacional que ajuda a comparar caminhos. O poder do RL moderno vem, em grande parte, de aprender boas aproximações dessas quantidades em ambientes grandes e complexos.",
        "A ideia é elegante: aprender não apenas respostas imediatas, mas estimativas do futuro que orientam a política presente."
      ],
      "visual": "reinforcement-learning-introducao-ciclo-aprendizado",
      "blocks": [
        {
          "type": "definition",
          "title": "Valor de estado",
          "body": "Estimativa do retorno esperado ao seguir certa política a partir de um estado."
        },
        {
          "type": "insight",
          "title": "Valor é previsão para agir",
          "body": "Em RL, prever o futuro serve diretamente ao controle da ação, e não apenas à descrição passiva do sistema."
        }
      ]
    },
    {
      "id": "horizonte",
      "eyebrow": "Desenho do objetivo",
      "title": "O horizonte de planejamento muda radicalmente o comportamento aprendido",
      "lead": "Sistemas que valorizam quase só o ganho imediato tendem a aprender estratégias míopes. Sistemas que consideram horizontes maiores podem aceitar perdas locais para obter melhor retorno total — desde que a recompensa esteja bem desenhada.",
      "paragraphs": [
        "Essa escolha é prática e conceitual. Em alguns domínios, querer retorno muito distante introduz variância demais; em outros, ignorar o futuro torna o agente desastroso. Não existe horizonte perfeito fora do contexto da tarefa.",
        "Projetar o objetivo em RL é, portanto, parte do próprio problema científico: o agente otimiza exatamente aquilo que conseguimos transformar em sinal."
      ],
      "interactive": "reinforcement-learning-introducao-horizonte",
      "blocks": [
        {
          "type": "definition",
          "title": "Horizonte",
          "body": "Extensão temporal relevante para considerar consequências futuras na decisão atual."
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Supor que basta aumentar o horizonte para obter comportamento mais inteligente. Sem recompensa adequada, o agente pode só ampliar atalhos ruins."
        }
      ]
    },
    {
      "id": "quando-usar",
      "eyebrow": "Formulação correta",
      "title": "Nem todo problema com palavras sofisticadas é um problema de RL",
      "lead": "Às vezes equipes chamam de RL algo que é apenas classificação, ranking ou otimização estática. RL faz mais sentido quando há decisão sequencial, feedback dependente da ação e trade-off real entre exploração, retorno e estado futuro.",
      "paragraphs": [
        "Essa triagem é importante porque RL costuma ser caro, instável e exigente em dados ou simulação. Se o problema não tem essas características, outras formulações podem ser mais simples e mais robustas.",
        "Aprender RL conceitualmente é também aprender a não usá-lo sem necessidade."
      ],
      "visual": "reinforcement-learning-introducao-aplicacoes",
      "interactive": "reinforcement-learning-introducao-tarefas",
      "blocks": [
        {
          "type": "example",
          "title": "Exemplo",
          "body": "Escolher o melhor anúncio em uma única rodada é mais próximo de um problema supervisionado ou contextual simples do que de um RL profundo de longo horizonte."
        },
        {
          "type": "insight",
          "title": "Boa formulação economiza meses",
          "body": "Entender se há de fato ambiente, estado, retorno acumulado e exploração relevante evita overengineering."
        }
      ]
    },
    {
      "id": "resumo-final",
      "eyebrow": "Síntese",
      "title": "Feche o mapa conceitual do RL",
      "lead": "Revise o que torna RL um paradigma próprio: sequência, feedback atrasado, política e exploração.",
      "paragraphs": [
        "A grande lição é que RL trata de aprender a agir sob incerteza temporal, e isso exige pensar objetivo, horizonte, risco de exploração e estrutura do ambiente com muito cuidado."
      ],
      "interactive": "summary-cards"
    },
    {
      "id": "quiz-revisao",
      "eyebrow": "Revisão",
      "title": "Quiz de revisão de RL",
      "lead": "Teste se ficaram claras as distinções entre política, valor, exploração e recompensa atrasada.",
      "paragraphs": [
        "As perguntas a seguir retomam o que torna RL especial e quando ele é a formulação adequada."
      ],
      "interactive": "quiz"
    },
    {
      "id": "glossario",
      "eyebrow": "Vocabulário",
      "title": "Glossário conceitual de RL",
      "lead": "Consolide o vocabulário central para avançar depois para algoritmos como Q-learning, policy gradients e actor-critic.",
      "paragraphs": [
        "Esses termos formam a base conceitual sobre a qual as técnicas específicas da área são construídas."
      ],
      "interactive": "glossary"
    }
  ],
  "summaryCards": [
    {
      "title": "Política",
      "body": "O objeto aprendido em RL é uma estratégia de ação, não apenas uma resposta pontual."
    },
    {
      "title": "Exploração custa",
      "body": "Aprender requer tentar alternativas, mas experimentar pode ser caro e arriscado."
    },
    {
      "title": "Retorno é temporal",
      "body": "Boas decisões não são avaliadas só pelo efeito local, mas pela trajetória que desencadeiam."
    },
    {
      "title": "Nem tudo é RL",
      "body": "Só vale formular assim quando há de fato decisão sequencial, ambiente e feedback dependente da ação."
    }
  ],
  "quiz": [
    {
      "id": "q1",
      "prompt": "O que diferencia RL de um problema supervisionado clássico?",
      "options": [
        {
          "id": "a",
          "label": "Em RL o sistema aprende uma política em ambiente sequencial com retorno acumulado."
        },
        {
          "id": "b",
          "label": "Em RL não há dados numéricos."
        },
        {
          "id": "c",
          "label": "Em RL nunca existe incerteza."
        }
      ],
      "correctOptionId": "a",
      "feedback": "A chave é a decisão sequencial com feedback dependente da ação e objetivo de retorno."
    },
    {
      "id": "q2",
      "prompt": "O que é uma política?",
      "options": [
        {
          "id": "a",
          "label": "Uma estratégia que associa estados a ações."
        },
        {
          "id": "b",
          "label": "Um conjunto fixo de labels corretos."
        },
        {
          "id": "c",
          "label": "Uma medida de acurácia."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Política é a regra prática de escolha de ação do agente."
    },
    {
      "id": "q3",
      "prompt": "Por que exploração é necessária?",
      "options": [
        {
          "id": "a",
          "label": "Porque sem testar alternativas o agente pode nunca descobrir ações melhores."
        },
        {
          "id": "b",
          "label": "Porque explorar sempre dá retorno imediato maior."
        },
        {
          "id": "c",
          "label": "Porque ambientes são sempre determinísticos."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Exploração serve para obter informação sobre possibilidades ainda pouco conhecidas."
    },
    {
      "id": "q4",
      "prompt": "O que significa recompensa atrasada?",
      "options": [
        {
          "id": "a",
          "label": "A consequência relevante de uma ação pode aparecer vários passos depois."
        },
        {
          "id": "b",
          "label": "O reward é sempre negativo."
        },
        {
          "id": "c",
          "label": "O agente nunca recebe sinal algum."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Recompensa atrasada torna difícil atribuir mérito ou culpa a ações específicas."
    },
    {
      "id": "q5",
      "prompt": "Para que serve uma função de valor?",
      "options": [
        {
          "id": "a",
          "label": "Estimar retorno futuro esperado para orientar a decisão presente."
        },
        {
          "id": "b",
          "label": "Armazenar o código-fonte do ambiente."
        },
        {
          "id": "c",
          "label": "Substituir totalmente a política."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Valor resume expectativa de futuro útil para comparar estados ou ações."
    },
    {
      "id": "q6",
      "prompt": "Qual é o problema de crédito temporal?",
      "options": [
        {
          "id": "a",
          "label": "Descobrir quais ações passadas contribuíram para recompensas observadas depois."
        },
        {
          "id": "b",
          "label": "Escolher uma cor para o agente."
        },
        {
          "id": "c",
          "label": "Dividir o dataset em treino e teste."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Esse é um dos desafios centrais de tarefas com retorno atrasado."
    },
    {
      "id": "q7",
      "prompt": "Quando RL tende a fazer menos sentido?",
      "options": [
        {
          "id": "a",
          "label": "Quando o problema é essencialmente estático e não há decisão sequencial relevante."
        },
        {
          "id": "b",
          "label": "Quando há ambiente e retorno acumulado."
        },
        {
          "id": "c",
          "label": "Quando existe exploração versus explotação."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Nem toda tarefa precisa da maquinaria de RL; às vezes outra formulação é melhor."
    },
    {
      "id": "q8",
      "prompt": "Qual é uma conclusão importante sobre RL?",
      "options": [
        {
          "id": "a",
          "label": "Projetar recompensa e horizonte faz parte do próprio problema, não é detalhe secundário."
        },
        {
          "id": "b",
          "label": "Recompensa local sempre coincide com objetivo final."
        },
        {
          "id": "c",
          "label": "Exploração pode ser ignorada em qualquer ambiente."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Objetivo mal desenhado leva o agente a otimizar a coisa errada com grande eficiência."
    }
  ],
  "glossary": [
    {
      "term": "Agente",
      "definition": "Entidade que interage com um ambiente escolhendo ações."
    },
    {
      "term": "Estado",
      "definition": "Descrição da situação atual relevante para a decisão do agente."
    },
    {
      "term": "Ação",
      "definition": "Intervenção escolhida pelo agente em um dado estado."
    },
    {
      "term": "Recompensa",
      "definition": "Sinal numérico que indica desejabilidade de um resultado imediato ou local."
    },
    {
      "term": "Política",
      "definition": "Estratégia que associa estados a ações ou distribuições sobre ações."
    },
    {
      "term": "Retorno",
      "definition": "Acúmulo de recompensas ao longo do tempo, conforme algum horizonte ou desconto."
    },
    {
      "term": "Exploração",
      "definition": "Busca de informação sobre ações ainda pouco conhecidas."
    },
    {
      "term": "Explotação",
      "definition": "Uso da melhor ação conhecida até o momento para maximizar retorno imediato."
    },
    {
      "term": "Função de valor",
      "definition": "Estimativa do retorno futuro esperado associado a estados ou ações."
    },
    {
      "term": "Crédito temporal",
      "definition": "Problema de atribuir a ações passadas responsabilidade por recompensas futuras."
    }
  ]
};
