import type { LessonContent } from "../../../types/content";

export const explicabilidadeInterpretabilidadeContent: LessonContent = {
  "id": "explicabilidade-interpretabilidade",
  "title": "Explicabilidade e Interpretabilidade",
  "subtitle": "Quando uma explicação ilumina um modelo — e quando apenas produz conforto aparente.",
  "description": "Uma aula avançada sobre interpretabilidade intrínseca, explicações pós-hoc, fidelidade, utilidade, limites de saliency/LIME/SHAP e o debate sobre modelos interpretáveis em decisões de alto risco.",
  "primaryCategoryId": "inteligencia-artificial",
  "secondaryCategoryId": "filosofia",
  "level": "Avançado",
  "estimatedTime": "50-65 min",
  "tags": [
    "XAI",
    "Interpretabilidade",
    "Explicabilidade",
    "LIME",
    "SHAP",
    "Modelos Interpretáveis"
  ],
  "learningObjectives": [
    "Distinguir interpretabilidade, explicabilidade, transparência e rastreabilidade.",
    "Comparar explicações locais e globais, intrínsecas e pós-hoc.",
    "Entender o problema da fidelidade: uma explicação pode parecer boa e ainda assim representar mal o modelo.",
    "Reconhecer limitações de feature importance, saliency maps e explicações aproximadas.",
    "Avaliar quando modelos intrinsecamente interpretáveis devem ser preferidos em contextos de alto risco.",
    "Relacionar tipo de explicação ao usuário e à decisão concreta em jogo."
  ],
  "prerequisites": [
    "Familiaridade básica com modelos preditivos.",
    "Noção intuitiva de features, predição e score.",
    "Disposição para separar “entender o output” de “entender o mecanismo”."
  ],
  "references": [
    {
      "title": "What is Explainable AI (XAI)?",
      "source": "Stanford HAI",
      "url": "https://hai.stanford.edu/ai-definitions/what-is-explainable-ai-xai",
      "note": "Definição introdutória e cuidado conceitual sobre XAI."
    },
    {
      "title": "The Mythos of Model Interpretability",
      "source": "Lipton — arXiv",
      "url": "https://arxiv.org/abs/1606.03490",
      "note": "Texto clássico sobre ambiguidades do termo interpretabilidade."
    },
    {
      "title": "Interpretable Machine Learning",
      "source": "Christoph Molnar",
      "url": "https://christophm.github.io/interpretable-ml-book/",
      "note": "Livro aberto com técnicas, limites e exemplos de explicações."
    },
    {
      "title": "“Why Should I Trust You?”: Explaining the Predictions of Any Classifier",
      "source": "Ribeiro, Singh & Guestrin — arXiv",
      "url": "https://arxiv.org/abs/1602.04938",
      "note": "Artigo fundador do LIME."
    },
    {
      "title": "A Unified Approach to Interpreting Model Predictions",
      "source": "Lundberg & Lee — arXiv",
      "url": "https://arxiv.org/abs/1705.07874",
      "note": "Artigo que popularizou SHAP."
    },
    {
      "title": "Stop Explaining Black Box Machine Learning Models for High Stakes Decisions and Use Interpretable Models Instead",
      "source": "Cynthia Rudin — Nature Machine Intelligence",
      "url": "https://www.nature.com/articles/s42256-019-0048-x",
      "note": "Argumento importante em favor de modelos intrinsecamente interpretáveis em alto risco."
    }
  ],
  "heroVisual": "explicabilidade-interpretabilidade-hero",
  "openingText": "Muitos sistemas de IA são criticados por serem caixas-pretas. A resposta imediata costuma ser: “vamos explicar o modelo”. Mas explicar pode significar coisas muito diferentes. Às vezes queremos saber por que uma predição saiu daquele jeito. Às vezes queremos auditar o mecanismo global. Às vezes buscamos confiança operacional. E às vezes uma visualização sedutora apenas nos dá a impressão de compreensão. A dificuldade central é separar explicações úteis de explicações ilusórias.",
  "quickFacts": [
    {
      "title": "Explicar não é o mesmo que interpretar",
      "body": "Uma explicação pode ser uma aproximação local ou narrativa de apoio; interpretabilidade costuma sugerir acesso mais direto à estrutura do modelo."
    },
    {
      "title": "Explicação boa depende do usuário",
      "body": "O que ajuda um cientista de dados não é igual ao que ajuda um médico, um regulador ou uma pessoa afetada pela decisão."
    },
    {
      "title": "Pós-hoc pode enganar",
      "body": "Explicações geradas depois da predição podem soar convincentes sem representar fielmente o comportamento real do sistema."
    }
  ],
  "sections": [
    {
      "id": "motivacao",
      "eyebrow": "Problema",
      "title": "Por que pedimos explicações a modelos?",
      "lead": "Pedimos explicações por várias razões: depurar, auditar, confiar, contestar, aprender ou justificar decisões a terceiros. O erro começa quando tratamos todas essas demandas como se fossem uma só.",
      "paragraphs": [
        "Uma explicação para depuração pode ser técnica e detalhada. Uma explicação para a pessoa afetada por um sistema de crédito precisa ser inteligível, contestável e ligada à decisão concreta. Uma explicação para um regulador deve permitir prestação de contas e comparação de procedimentos.",
        "Sem distinguir finalidade e público, acabamos aceitando qualquer artefato visual como “explicação suficiente”. O problema não é só técnico; é também epistemológico: que tipo de entendimento estamos realmente obtendo?"
      ],
      "visual": "explicabilidade-interpretabilidade-hero",
      "blocks": [
        {
          "type": "definition",
          "title": "Explicabilidade",
          "body": "Capacidade de produzir algum tipo de justificativa ou relato compreensível sobre uma predição, um comportamento ou um sistema."
        },
        {
          "type": "insight",
          "title": "Explicação sem usuário é categoria vazia",
          "body": "Toda explicação pressupõe uma audiência, uma finalidade e um nível de detalhe adequado ao contexto."
        }
      ]
    },
    {
      "id": "mapa",
      "eyebrow": "Conceitos",
      "title": "Interpretabilidade, explicabilidade, transparência e rastreabilidade não são sinônimos",
      "lead": "Interpretabilidade costuma apontar para modelos cuja estrutura já é, em algum sentido, diretamente inspecionável. Explicabilidade é mais ampla: inclui mecanismos pós-hoc para dar pistas sobre o comportamento de sistemas opacos.",
      "paragraphs": [
        "Transparência pode envolver abertura sobre dados, arquitetura, pipeline e uso previsto, mesmo quando o mecanismo interno do modelo continua difícil de interpretar. Rastreabilidade, por sua vez, enfatiza a possibilidade de reconstruir passos, entradas e versões de um sistema.",
        "Misturar esses conceitos gera promessas erradas. Um dashboard transparente não torna um modelo interpretável; uma importância de features não torna automaticamente o processo decisório auditável em sentido forte."
      ],
      "visual": "explicabilidade-interpretabilidade-mapa-conceitos",
      "blocks": [
        {
          "type": "definition",
          "title": "Interpretabilidade",
          "body": "Propriedade pela qual a estrutura ou o raciocínio operacional do modelo pode ser entendido de modo relativamente direto por humanos."
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Chamar qualquer gráfico colorido de interpretabilidade, mesmo quando ele é apenas uma heurística local sobre um modelo opaco."
        }
      ]
    },
    {
      "id": "tipos",
      "eyebrow": "Tipos de explicação",
      "title": "Local, global, intrínseca e pós-hoc: quatro eixos úteis para não se perder",
      "lead": "Explicações locais tentam iluminar uma predição específica; explicações globais tentam resumir o comportamento geral do sistema. Modelos intrinsecamente interpretáveis já trazem alguma legibilidade em sua própria forma. Explicações pós-hoc são adicionadas depois.",
      "paragraphs": [
        "Nenhum desses tipos é sempre superior. Explicações locais são boas para contestar casos; explicações globais ajudam a entender tendência geral; modelos intrínsecos podem ser preferíveis quando o risco é alto; técnicas pós-hoc podem ser úteis para exploração, mas pedem cautela com fidelidade.",
        "A chave é não confundir escopo. Saber quais features influenciaram uma decisão local não equivale a entender o comportamento global do modelo; enxergar a lógica global não garante compreender cada caso extremo."
      ],
      "interactive": "explicabilidade-interpretabilidade-tipos",
      "blocks": [
        {
          "type": "example",
          "title": "Exemplo",
          "body": "Uma árvore pequena pode ser relativamente interpretável globalmente; um mapa de saliência pode explicar apenas um caso em um modelo muito maior."
        },
        {
          "type": "definition",
          "title": "Pós-hoc",
          "body": "Técnica aplicada depois do treinamento para produzir uma aproximação explicativa sobre um modelo já pronto."
        }
      ]
    },
    {
      "id": "fidelidade",
      "eyebrow": "Critério crítico",
      "title": "Uma explicação útil pode não ser fiel — e uma explicação fiel pode não ser útil",
      "lead": "Fidelidade pergunta se a explicação realmente acompanha o comportamento do modelo. Utilidade pergunta se ela ajuda alguém a agir, revisar ou entender algo relevante. Essas duas qualidades não andam sempre juntas.",
      "paragraphs": [
        "Uma regra simples pode ser ótima para comunicação, mas capturar mal o sistema real. Já uma decomposição muito fiel pode ser incompreensível para o usuário que precisa dela. Por isso, avaliar explicações é mais difícil do que apenas produzir explicações.",
        "Esse ponto é central em debates recentes: uma boa prática de XAI não é gerar qualquer interpretação pós-hoc, mas explicitar seu escopo, sua estabilidade e o tipo de decisão que ela de fato suporta."
      ],
      "visual": "explicabilidade-interpretabilidade-fidelidade-vs-utilidade",
      "blocks": [
        {
          "type": "insight",
          "title": "Plausibilidade não basta",
          "body": "Explicações que “fazem sentido” para humanos podem ainda assim ser versões pobres ou enganosas do mecanismo real."
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Tomar uma explicação estável visualmente como prova de causalidade ou de compreensão completa do modelo."
        }
      ]
    },
    {
      "id": "ferramentas",
      "eyebrow": "Ferramentas",
      "title": "LIME, SHAP, saliency maps e afins ajudam, mas cada ferramenta responde a uma pergunta limitada",
      "lead": "LIME aproxima localmente o modelo com uma regra mais simples perto de um caso específico. SHAP distribui contribuição entre features a partir de uma formulação inspirada em valores de Shapley. Mapas de saliência destacam regiões influentes em entradas como imagem e texto.",
      "paragraphs": [
        "Essas técnicas são valiosas para investigação, mas não são janelas mágicas para “o pensamento interno” do sistema. Elas dependem de suposições, perturbações, amostragens e formas específicas de agregar relevância. Pequenas mudanças de configuração podem alterar bastante o resultado.",
        "Em aplicações sérias, o ideal é tratar essas saídas como instrumentos de diagnóstico e não como certificados definitivos de entendimento. Explicar o que a técnica mede é tão importante quanto mostrar seu gráfico."
      ],
      "visual": "explicabilidade-interpretabilidade-ferramentas",
      "blocks": [
        {
          "type": "definition",
          "title": "Feature importance",
          "body": "Estimativa de quão relevante uma variável parece ser para a predição segundo um critério específico."
        },
        {
          "type": "example",
          "title": "Exemplo",
          "body": "Um score alto para uma feature em SHAP não significa automaticamente que ela seja causa do fenômeno; significa contribuição dentro daquele modelo e daquela decomposição."
        }
      ]
    },
    {
      "id": "alto-risco",
      "eyebrow": "Alto risco",
      "title": "Em certas decisões, talvez seja melhor preferir modelos interpretáveis desde o começo",
      "lead": "Cynthia Rudin formula a crítica de modo incisivo: em contextos de alto risco, como saúde ou justiça criminal, pode ser melhor usar modelos intrinsecamente interpretáveis do que tentar explicar caixas-pretas depois.",
      "paragraphs": [
        "O argumento não diz que modelos simples sempre bastam. Ele diz que, quando houver desempenho comparável, um modelo legível e fiel ao seu próprio funcionamento pode oferecer governança superior ao arranjo “modelo opaco + explicação aproximada”.",
        "Essa posição não elimina XAI, mas muda a pergunta. Antes de buscar explicações sofisticadas, deveríamos verificar se a tarefa realmente exige uma caixa-preta ou se a complexidade foi naturalizada cedo demais."
      ],
      "interactive": "explicabilidade-interpretabilidade-riscos",
      "blocks": [
        {
          "type": "definition",
          "title": "Modelo intrinsecamente interpretável",
          "body": "Modelo cuja forma já permite entender razoavelmente como entradas e estrutura produzem a saída, sem depender tanto de explicações externas."
        },
        {
          "type": "insight",
          "title": "XAI não substitui desenho prudente",
          "body": "Em decisões sensíveis, a exigência pode ser menos “como explicar melhor?” e mais “por que usar este tipo de modelo aqui?”"
        }
      ]
    },
    {
      "id": "usuarios",
      "eyebrow": "Audiências",
      "title": "A mesma explicação não serve para todo mundo",
      "lead": "Pessoas afetadas por uma decisão precisam motivos acionáveis e contestáveis. Equipes técnicas precisam sinais para depuração e robustez. Gestores e reguladores precisam documentação comparável, riscos conhecidos e trilha de responsabilidade.",
      "paragraphs": [
        "Projetar uma camada explicativa responsável, portanto, implica mapear usuários, finalidade e dano potencial. Em vez de perguntar “o modelo é explicável?”, vale perguntar “explicável para quem, para quê, com qual fidelidade e sob qual margem de erro?”.",
        "Esse enquadramento evita uma ilusão recorrente: a de que explicabilidade é um atributo único, estático e universalmente satisfatório."
      ],
      "visual": "explicabilidade-interpretabilidade-stakeholders",
      "interactive": "explicabilidade-interpretabilidade-usuarios",
      "blocks": [
        {
          "type": "example",
          "title": "Exemplo",
          "body": "Uma pessoa recusada em um benefício precisa saber quais fatores pesarão em novo recurso; um pesquisador precisa saber se a explicação é estável a pequenas perturbações."
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Tomar uma explicação pensada para o time técnico como suficiente para responsabilização pública ou contestação jurídica."
        }
      ]
    },
    {
      "id": "resumo-final",
      "eyebrow": "Síntese",
      "title": "Feche o mapa de XAI com mais precisão",
      "lead": "Revise os eixos centrais: tipo de explicação, fidelidade, utilidade e contexto de uso.",
      "paragraphs": [
        "A grande lição é que explicações úteis são contextuais e que explicações convincentes nem sempre são fiéis ao mecanismo real do modelo."
      ],
      "interactive": "summary-cards"
    },
    {
      "id": "quiz-revisao",
      "eyebrow": "Revisão",
      "title": "Quiz sobre explicabilidade e interpretabilidade",
      "lead": "Teste se você consegue separar escopo, audiência e limite das técnicas de XAI.",
      "paragraphs": [
        "As perguntas retomam diferenças entre explicações locais, globais, intrínsecas e pós-hoc, além do debate sobre alto risco."
      ],
      "interactive": "quiz"
    },
    {
      "id": "glossario",
      "eyebrow": "Vocabulário",
      "title": "Glossário essencial de XAI",
      "lead": "Consolide o vocabulário para ler papers, auditorias e discussões aplicadas sobre interpretabilidade.",
      "paragraphs": [
        "Esse conjunto de termos ajuda a evitar confusões comuns quando a palavra “explicação” é usada de maneira vaga."
      ],
      "interactive": "glossary"
    }
  ],
  "summaryCards": [
    {
      "title": "Explicação é plural",
      "body": "Explicar pode significar depurar, justificar, auditar, contestar ou aprender, e cada finalidade pede um desenho diferente."
    },
    {
      "title": "Fidelidade importa",
      "body": "Uma explicação sóbria precisa dizer o quanto representa de fato o comportamento do modelo."
    },
    {
      "title": "Pós-hoc ajuda, mas não absolve",
      "body": "Ferramentas como LIME e SHAP são úteis, porém não substituem compreensão completa nem documentação rigorosa."
    },
    {
      "title": "Em alto risco, desenho vem antes",
      "body": "Às vezes a melhor explicação é escolher desde o início um modelo mais legível e governável."
    }
  ],
  "quiz": [
    {
      "id": "q1",
      "prompt": "Qual distinção é conceitualmente importante?",
      "options": [
        {
          "id": "a",
          "label": "Interpretabilidade, explicabilidade e transparência são sinônimos perfeitos."
        },
        {
          "id": "b",
          "label": "Interpretabilidade, explicabilidade e transparência apontam para camadas diferentes de entendimento."
        },
        {
          "id": "c",
          "label": "Nenhuma dessas palavras tem uso técnico."
        }
      ],
      "correctOptionId": "b",
      "feedback": "Os termos se sobrepõem, mas não são equivalentes: falam de níveis distintos de acesso ao sistema."
    },
    {
      "id": "q2",
      "prompt": "O que uma explicação local procura fazer?",
      "options": [
        {
          "id": "a",
          "label": "Descrever o comportamento completo do modelo em todos os casos."
        },
        {
          "id": "b",
          "label": "Iluminar uma predição ou região específica do comportamento do modelo."
        },
        {
          "id": "c",
          "label": "Substituir a documentação do dataset."
        }
      ],
      "correctOptionId": "b",
      "feedback": "Explicações locais focam um caso ou vizinhança específicos, não o comportamento global do sistema."
    },
    {
      "id": "q3",
      "prompt": "Qual é o problema central da fidelidade?",
      "options": [
        {
          "id": "a",
          "label": "Saber se a explicação realmente acompanha o modelo que pretende explicar."
        },
        {
          "id": "b",
          "label": "Medir a qualidade estética do gráfico."
        },
        {
          "id": "c",
          "label": "Ver se a explicação usa poucas palavras."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Fidelidade pergunta se a explicação é uma boa representação do comportamento real do modelo."
    },
    {
      "id": "q4",
      "prompt": "Por que técnicas pós-hoc exigem cautela?",
      "options": [
        {
          "id": "a",
          "label": "Porque toda aproximação explicativa é automaticamente causal."
        },
        {
          "id": "b",
          "label": "Porque podem soar plausíveis sem serem suficientemente fiéis ou estáveis."
        },
        {
          "id": "c",
          "label": "Porque só funcionam em modelos lineares."
        }
      ],
      "correctOptionId": "b",
      "feedback": "Explicações pós-hoc podem produzir conforto interpretativo sem representar bem o mecanismo real."
    },
    {
      "id": "q5",
      "prompt": "Qual é uma leitura responsável de SHAP ou LIME?",
      "options": [
        {
          "id": "a",
          "label": "São instrumentos úteis de diagnóstico, não provas definitivas de compreensão total."
        },
        {
          "id": "b",
          "label": "Eliminam a necessidade de escolher o modelo com cuidado."
        },
        {
          "id": "c",
          "label": "Garantem transparência institucional completa."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Essas técnicas ajudam muito, mas precisam ser contextualizadas em seus limites e pressupostos."
    },
    {
      "id": "q6",
      "prompt": "O que o argumento de Rudin enfatiza em cenários de alto risco?",
      "options": [
        {
          "id": "a",
          "label": "Que caixas-pretas sempre são proibidas por definição."
        },
        {
          "id": "b",
          "label": "Que modelos interpretáveis podem ser preferíveis quando oferecem desempenho comparável e melhor governança."
        },
        {
          "id": "c",
          "label": "Que explicação pós-hoc sempre basta."
        }
      ],
      "correctOptionId": "b",
      "feedback": "O ponto é priorizar modelos intrinsecamente interpretáveis quando isso é viável e prudente."
    },
    {
      "id": "q7",
      "prompt": "Por que a audiência da explicação importa?",
      "options": [
        {
          "id": "a",
          "label": "Porque diferentes usuários precisam de níveis e formas de entendimento distintos."
        },
        {
          "id": "b",
          "label": "Porque explicações só podem ser lidas por especialistas."
        },
        {
          "id": "c",
          "label": "Porque reguladores não se importam com documentação."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Uma explicação boa para o time técnico pode ser inútil para a pessoa afetada ou para um auditor."
    },
    {
      "id": "q8",
      "prompt": "Qual é o erro conceitual mais frequente em XAI?",
      "options": [
        {
          "id": "a",
          "label": "Presumir que qualquer explicação visualmente convincente equivale a entendimento robusto do sistema."
        },
        {
          "id": "b",
          "label": "Distinguir escopo local e global."
        },
        {
          "id": "c",
          "label": "Relacionar explicação ao contexto de uso."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Conforto narrativo não é o mesmo que fidelidade, utilidade ou responsabilização adequada."
    }
  ],
  "glossary": [
    {
      "term": "Explicabilidade",
      "definition": "Capacidade de oferecer algum relato compreensível sobre uma predição ou comportamento do sistema."
    },
    {
      "term": "Interpretabilidade",
      "definition": "Propriedade segundo a qual a estrutura ou o funcionamento do modelo pode ser entendido de forma relativamente direta."
    },
    {
      "term": "Transparência",
      "definition": "Abertura sobre componentes, dados, pipeline, escopo e limitações de um sistema."
    },
    {
      "term": "Rastreabilidade",
      "definition": "Capacidade de reconstruir entradas, versões, passos e condições de operação do sistema."
    },
    {
      "term": "Explicação local",
      "definition": "Explicação focada em uma predição específica ou em sua vizinhança imediata."
    },
    {
      "term": "Explicação global",
      "definition": "Resumo do comportamento geral do modelo ao longo de muitos casos."
    },
    {
      "term": "Pós-hoc",
      "definition": "Técnica aplicada depois do treinamento para aproximar ou relatar o comportamento de um modelo."
    },
    {
      "term": "Fidelidade",
      "definition": "Grau em que a explicação representa corretamente o comportamento do modelo que explica."
    },
    {
      "term": "LIME",
      "definition": "Método que aproxima localmente um classificador complexo por um modelo mais simples ao redor de um caso."
    },
    {
      "term": "SHAP",
      "definition": "Método de atribuição de contribuição de features inspirado em valores de Shapley."
    }
  ]
};
