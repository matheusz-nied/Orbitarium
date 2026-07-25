import type { LessonContent } from "../../../types/content";

export const viesesFairnessDadosContent: LessonContent = {
  "id": "vieses-fairness-dados",
  "title": "Vieses, Fairness e Dados que Distorcem Decisões",
  "subtitle": "Como distorções entram em datasets, métricas e decisões — e por que fairness não é um botão único de correção.",
  "description": "Uma aula conceitual sobre viés algorítmico, fontes de dano ao longo do ciclo de ML, definições concorrentes de fairness e limites das soluções puramente técnicas.",
  "primaryCategoryId": "inteligencia-artificial",
  "secondaryCategoryId": "filosofia",
  "level": "Intermediário",
  "estimatedTime": "45-60 min",
  "tags": [
    "Fairness",
    "Viés Algorítmico",
    "Datasets",
    "Ética em IA",
    "Avaliação",
    "Governança"
  ],
  "learningObjectives": [
    "Reconhecer que distorções podem entrar antes, durante e depois do treinamento do modelo.",
    "Distinguir viés estatístico, erro de medição, proxy inadequado e dano social.",
    "Entender por que diferentes definições de fairness podem entrar em conflito.",
    "Explicar o papel de base rates, limiares e contexto institucional nos trade-offs de fairness.",
    "Avaliar mitigações técnicas sem esquecer documentação, governança e participação social.",
    "Evitar a ideia enganosa de que fairness é uma métrica universal e neutra."
  ],
  "prerequisites": [
    "Noção básica de classificação e predição.",
    "Familiaridade inicial com datasets de treino e teste.",
    "Abertura para pensar tecnologia como parte de arranjos sociais mais amplos."
  ],
  "references": [
    {
      "title": "Algorithmic Fairness",
      "source": "Stanford Encyclopedia of Philosophy",
      "url": "https://plato.stanford.edu/entries/algorithmic-fairness/",
      "note": "Panorama filosófico das diferentes noções de justiça algorítmica."
    },
    {
      "title": "Fairness and Machine Learning: Limitations and Opportunities",
      "source": "Barocas, Hardt & Narayanan",
      "url": "https://fairmlbook.org/",
      "note": "Livro aberto com definições, impossibilidades e exemplos de fairness em ML."
    },
    {
      "title": "A Framework for Understanding Sources of Harm throughout the Machine Learning Life Cycle",
      "source": "Suresh & Guttag — arXiv",
      "url": "https://arxiv.org/abs/1901.10002",
      "note": "Taxonomia influente sobre fontes de dano ao longo do ciclo de vida de ML."
    },
    {
      "title": "Model Cards for Model Reporting",
      "source": "Mitchell et al. — ACM FAccT",
      "url": "https://doi.org/10.1145/3287560.3287596",
      "note": "Framework para documentar uso, limites e métricas desagregadas de modelos."
    },
    {
      "title": "Datasheets for Datasets",
      "source": "Gebru et al. — arXiv",
      "url": "https://arxiv.org/abs/1803.09010",
      "note": "Framework para documentar motivação, coleta, composição e riscos de datasets."
    },
    {
      "title": "Lecture 13: Interpretability, Fairness, and Ethics",
      "source": "Stanford BIO-DS 220",
      "url": "https://web.stanford.edu/class/biods220/lectures/lecture13.pdf",
      "note": "Material didático que resume tensões entre métricas de fairness, robustez e contexto."
    }
  ],
  "heroVisual": "vieses-fairness-dados-hero",
  "openingText": "Quando um sistema de IA erra de modo sistemático contra um grupo, a pergunta mais importante raramente é “qual fórmula faltou?”. Antes disso, precisamos perguntar o que foi medido, quem ficou de fora, qual proxy foi adotado, qual dano está em jogo e quem decide o que conta como justo. Fairness em IA não é um selo mágico; é um campo de escolhas técnicas e normativas em tensão.",
  "quickFacts": [
    {
      "title": "Dado não é espelho neutro",
      "body": "Dados carregam ausências, categorias herdadas, instrumentos imperfeitos e decisões humanas anteriores."
    },
    {
      "title": "Métricas competem",
      "body": "Diferentes noções de fairness podem ser incompatíveis quando grupos têm distribuições distintas."
    },
    {
      "title": "Correção técnica não basta",
      "body": "Mesmo um modelo “balanceado” pode sustentar instituições injustas se o problema foi mal formulado."
    }
  ],
  "sections": [
    {
      "id": "problema",
      "eyebrow": "Ponto de partida",
      "title": "Viés em IA não começa no momento do treino",
      "lead": "É comum imaginar que um modelo se torna injusto apenas porque “aprendeu errado”. Mas, na prática, muitas distorções já chegam prontas antes do algoritmo atuar. O que foi coletado, como foi rotulado, quem foi medido e qual objetivo foi escolhido moldam o espaço do possível.",
      "paragraphs": [
        "Por isso, fairness não pode ser reduzida a um ajuste tardio. Se o target já é um proxy contestável, se grupos foram sub-representados ou se o dado reflete discriminações históricas, o modelo pode apenas tornar mais eficiente uma assimetria antiga.",
        "A pergunta útil deixa de ser “o algoritmo é viesado?” e passa a ser “em quais etapas do ciclo esse sistema pode introduzir ou amplificar dano, e segundo qual ideal de justiça estamos avaliando isso?”"
      ],
      "visual": "vieses-fairness-dados-hero",
      "blocks": [
        {
          "type": "definition",
          "title": "Viés algorítmico",
          "body": "Padrão sistemático de erro, tratamento desigual ou dano que emerge de dados, modelagem, decisão institucional ou interação entre esses fatores."
        },
        {
          "type": "insight",
          "title": "Distorção e injustiça não são sinônimos perfeitos",
          "body": "Um sistema pode ser estatisticamente enviesado sem gerar um dano social relevante em certo contexto, e pode gerar dano mesmo com métricas agregadas aparentemente boas."
        }
      ]
    },
    {
      "id": "fontes",
      "eyebrow": "Diagnóstico",
      "title": "A maior parte dos problemas nasce de múltiplas fontes ao mesmo tempo",
      "lead": "Alguns problemas surgem porque o dado medido não representa bem o fenômeno. Outros aparecem porque o grupo relevante quase não está presente na amostra. Há ainda casos em que a variável-alvo escolhida é apenas um proxy ruim para o que realmente importa.",
      "paragraphs": [
        "Suresh e Guttag são importantes justamente por organizar essa paisagem. Em vez de tratar “viés” como rótulo genérico, eles mostram fontes diferentes de dano ao longo do ciclo de vida de ML: enquadramento do problema, coleta, rotulação, construção do modelo, avaliação e uso em contexto.",
        "Essa distinção muda a intervenção correta. Se o problema está na amostragem, a solução não é a mesma que em um caso de proxy inadequado, nem a mesma que em um caso de feedback de implantação."
      ],
      "visual": "vieses-fairness-dados-fontes-de-distorcao",
      "blocks": [
        {
          "type": "definition",
          "title": "Proxy",
          "body": "Variável usada no lugar do fenômeno de interesse quando não conseguimos medir diretamente o que realmente importa."
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Falar em “dataset enviesado” como se fosse uma propriedade única e autoexplicativa, sem perguntar qual viés, para quem e em que etapa."
        }
      ]
    },
    {
      "id": "definicoes",
      "eyebrow": "Noções de justiça",
      "title": "Fairness não tem uma definição única aceita em todos os contextos",
      "lead": "Algumas definições exigem independência da predição em relação ao grupo sensível. Outras pedem igualdade de métricas como taxa de falso positivo ou verdadeiro positivo. Outras ainda defendem que indivíduos semelhantes devam receber tratamento semelhante.",
      "paragraphs": [
        "O ponto filosófico decisivo é que essas definições carregam valores diferentes. Igualar erro entre grupos não é o mesmo que ignorar grupo na decisão; tratar “casos semelhantes” de modo semelhante pressupõe uma noção controversa do que conta como semelhança relevante.",
        "Por isso, discutir fairness é sempre discutir também qual concepção de justiça faz sentido naquela aplicação. Não existe atalho puramente matemático que substitua esse trabalho normativo."
      ],
      "interactive": "vieses-fairness-dados-cenarios",
      "blocks": [
        {
          "type": "definition",
          "title": "Fairness algorítmica",
          "body": "Conjunto de critérios usados para avaliar se um sistema trata pessoas ou grupos de maneira justificável no contexto da decisão."
        },
        {
          "type": "example",
          "title": "Exemplo",
          "body": "Em crédito, reduzir diferença de falso negativo pode ser prioritário; em medicina, talvez a preocupação maior seja não perder casos graves em grupos subatendidos."
        }
      ]
    },
    {
      "id": "tradeoffs",
      "eyebrow": "Incompatibilidades",
      "title": "Base rates diferentes tornam vários objetivos mutuamente tensionados",
      "lead": "Quando grupos têm distribuições diferentes do alvo, não costuma ser possível satisfazer simultaneamente todas as métricas intuitivas de fairness mantendo calibração e desempenho da mesma forma. Isso não é uma falha do pesquisador; é uma estrutura do problema.",
      "paragraphs": [
        "O efeito prático é desconfortável: qualquer escolha privilegia certos erros, certos tipos de igualdade e certos riscos. Em vez de esconder esse fato atrás de um score, sistemas responsáveis o tornam visível e discutível.",
        "É aqui que o debate precisa sair do jargão técnico e entrar na governança: quem decide qual erro é mais aceitável, com base em que evidência e sob qual mecanismo de prestação de contas?"
      ],
      "visual": "vieses-fairness-dados-metricas-em-tensao",
      "blocks": [
        {
          "type": "insight",
          "title": "Não existe “métrica final de justiça”",
          "body": "Se duas métricas entram em conflito, escolher uma delas é uma decisão normativa com consequências distributivas."
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Tratar uma melhoria em fairness como ganho monotônico universal, sem explicitar quais grupos ou tipos de erro estão sendo privilegiados."
        }
      ]
    },
    {
      "id": "feedback-loops",
      "eyebrow": "Dinâmica social",
      "title": "Sistemas também mudam o mundo que depois usam como dado",
      "lead": "Quando um modelo passa a orientar contratação, policiamento, crédito ou moderação, ele não apenas lê a realidade: ele altera incentivos, distribui atenção e produz novos registros. Esses registros depois voltam como dados para treinamento ou auditoria.",
      "paragraphs": [
        "Esse ciclo pode amplificar distorções. Um sistema que envia mais fiscalização a uma região pode registrar mais ocorrências ali, reforçando a aparência de maior risco local. O problema não é só predição ruim; é um circuito entre predição, intervenção e nova medição.",
        "Por isso fairness não deve ser avaliada apenas offline. O comportamento do sistema em implantação, inclusive com monitoramento longitudinal, é parte do próprio objeto de estudo."
      ],
      "visual": "vieses-fairness-dados-ciclo-decisao",
      "blocks": [
        {
          "type": "definition",
          "title": "Feedback loop",
          "body": "Ciclo em que saídas do sistema alteram o ambiente e retornam depois como novas entradas ou novos dados."
        },
        {
          "type": "example",
          "title": "Exemplo",
          "body": "Se um sistema de detecção direciona mais inspeção a um grupo, ele pode produzir mais evidência observada sobre esse grupo, ainda que o risco real não tenha mudado."
        }
      ]
    },
    {
      "id": "mitigacoes",
      "eyebrow": "Intervenção",
      "title": "Mitigar fairness exige escolher em qual camada agir",
      "lead": "Algumas técnicas atuam antes do modelo, como reamostragem, revisão de rótulos, melhoria de coleta ou redefinição do target. Outras atuam no modelo, ajustando objetivos ou restrições. Outras atuam depois, via limiares, revisão humana, documentação e mecanismos de recurso.",
      "paragraphs": [
        "A decisão correta depende do diagnóstico. Se a coleta foi ruim, um pós-processamento elegante pode mascarar o problema sem corrigi-lo. Se o contexto institucional é opaco, mexer no loss function tampouco resolverá tudo.",
        "Soluções sérias combinam intervenção técnica, documentação e governança: datasets documentados, métricas desagregadas, testes de uso fora do escopo e canais reais para contestar decisões."
      ],
      "interactive": "vieses-fairness-dados-mitigacao",
      "blocks": [
        {
          "type": "definition",
          "title": "Mitigação em camadas",
          "body": "Estratégia que distingue intervenções na coleta, no treinamento, na calibragem e no uso institucional do sistema."
        },
        {
          "type": "insight",
          "title": "A melhor mitigação depende da origem do dano",
          "body": "Intervenções elegantes no modelo podem ter pouco efeito se a formulação do problema ou a coleta já estiverem erradas."
        }
      ]
    },
    {
      "id": "governanca",
      "eyebrow": "Além da técnica",
      "title": "Fairness é um problema sócio-técnico e institucional",
      "lead": "Modelos não decidem sozinhos o que é uma boa decisão. Organizações escolhem objetivos, limites de uso, processos de apelação, políticas de registro e formas de supervisão. Essas camadas institucionais definem se um erro será reparável, auditável e politicamente contestável.",
      "paragraphs": [
        "Isso explica por que práticas como model cards e datasheets são importantes. Elas não substituem justiça, mas tornam visíveis pressupostos, populações avaliadas, usos previstos e limitações. Transparência não resolve tudo, porém sem transparência o debate fica ainda pior.",
        "Uma leitura madura de fairness evita tanto o ceticismo cínico (“nada pode ser feito”) quanto o solucionismo (“basta escolher a métrica certa”). O trabalho real é iterativo, contextual e público."
      ],
      "visual": "vieses-fairness-dados-governanca",
      "interactive": "vieses-fairness-dados-stakeholders",
      "blocks": [
        {
          "type": "example",
          "title": "Exemplo institucional",
          "body": "Um sistema de triagem pode combinar predição com revisão humana, explicitação de limites e direito de recurso para reduzir dano prático."
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Confundir documentação com solução. Relatar vieses é necessário, mas não substitui mudança de coleta, desenho ou governança."
        }
      ]
    },
    {
      "id": "resumo-final",
      "eyebrow": "Síntese",
      "title": "Feche o mapa de fairness sem reducionismo",
      "lead": "Revise como definição, dados, implantação e governança entram juntos na análise.",
      "paragraphs": [
        "A lição central é que fairness em IA exige diagnóstico de origem do dano, clareza normativa sobre o que se quer igualar e responsabilidade institucional sobre os efeitos do sistema."
      ],
      "interactive": "summary-cards"
    },
    {
      "id": "quiz-revisao",
      "eyebrow": "Revisão",
      "title": "Quiz sobre vieses e fairness",
      "lead": "Verifique se você consegue distinguir fontes de dano, métricas e tipos de intervenção.",
      "paragraphs": [
        "As perguntas a seguir retomam a relação entre dados, proxies, base rates, feedback loops e governança."
      ],
      "interactive": "quiz"
    },
    {
      "id": "glossario",
      "eyebrow": "Vocabulário",
      "title": "Glossário essencial de fairness",
      "lead": "Consolide os termos mais usados em debates técnicos e filosóficos sobre justiça algorítmica.",
      "paragraphs": [
        "Dominar esse vocabulário ajuda a ler papers, políticas públicas e auditorias com menos confusão conceitual."
      ],
      "interactive": "glossary"
    }
  ],
  "summaryCards": [
    {
      "title": "Dado é construção",
      "body": "Amostra, medição, rótulo e proxy já carregam escolhas que podem distorcer a decisão."
    },
    {
      "title": "Fairness é plural",
      "body": "Há várias noções de justiça algorítmica, frequentemente tensionadas entre si."
    },
    {
      "title": "Implantação importa",
      "body": "Sistemas alteram o ambiente, criam feedback loops e precisam ser avaliados também em uso."
    },
    {
      "title": "Governança é parte da solução",
      "body": "Documentação, recurso, supervisão e delimitação de escopo são tão importantes quanto a métrica escolhida."
    }
  ],
  "quiz": [
    {
      "id": "q1",
      "prompt": "Qual afirmação capta melhor o problema de fairness em IA?",
      "options": [
        {
          "id": "a",
          "label": "Ele surge apenas quando o algoritmo é matematicamente mal implementado."
        },
        {
          "id": "b",
          "label": "Ele pode surgir desde a formulação do problema até a implantação do sistema."
        },
        {
          "id": "c",
          "label": "Ele desaparece se removermos o atributo sensível do dataset."
        }
      ],
      "correctOptionId": "b",
      "feedback": "Fontes de dano aparecem na coleta, no target, na avaliação e no uso do sistema, não só no algoritmo."
    },
    {
      "id": "q2",
      "prompt": "O que é um proxy inadequado?",
      "options": [
        {
          "id": "a",
          "label": "Uma variável usada no lugar do fenômeno de interesse, mas que o representa mal ou distorce sua interpretação."
        },
        {
          "id": "b",
          "label": "Qualquer variável numérica."
        },
        {
          "id": "c",
          "label": "Uma métrica de acurácia ajustada por grupo."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Proxy ruim é uma fonte clássica de erro porque substitui o objetivo real por algo mais fácil, porém discutível."
    },
    {
      "id": "q3",
      "prompt": "Por que diferentes métricas de fairness podem entrar em conflito?",
      "options": [
        {
          "id": "a",
          "label": "Porque matematicamente são sempre idênticas, mas mal implementadas."
        },
        {
          "id": "b",
          "label": "Porque grupos podem ter distribuições e custos de erro diferentes, tornando vários objetivos simultaneamente difíceis."
        },
        {
          "id": "c",
          "label": "Porque fairness depende apenas de opinião política e não de estrutura do problema."
        }
      ],
      "correctOptionId": "b",
      "feedback": "Há tensões estruturais entre calibração, paridade de erro, independência e outros critérios, especialmente com base rates diferentes."
    },
    {
      "id": "q4",
      "prompt": "Qual é um exemplo de feedback loop?",
      "options": [
        {
          "id": "a",
          "label": "Um modelo muda o ambiente e depois aprende com dados produzidos por essa própria mudança."
        },
        {
          "id": "b",
          "label": "Um cientista plota o mesmo gráfico duas vezes."
        },
        {
          "id": "c",
          "label": "Um dataset é salvo em dois arquivos."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Feedback loop ocorre quando a decisão automatizada altera o mundo observado e esse novo mundo volta como dado."
    },
    {
      "id": "q5",
      "prompt": "Qual estratégia é mais adequada quando o principal problema está na amostragem?",
      "options": [
        {
          "id": "a",
          "label": "Revisar coleta e cobertura populacional, não apenas mexer no pós-processamento."
        },
        {
          "id": "b",
          "label": "Trocar a cor do dashboard."
        },
        {
          "id": "c",
          "label": "Ignorar grupos minoritários para aumentar a acurácia média."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Se a origem do dano está na amostragem, a mitigação precisa atingir a coleta e a composição do dataset."
    },
    {
      "id": "q6",
      "prompt": "Qual leitura é mais madura sobre model cards e datasheets?",
      "options": [
        {
          "id": "a",
          "label": "Eles substituem completamente auditoria e governança."
        },
        {
          "id": "b",
          "label": "Eles ajudam a tornar pressupostos e limites explícitos, mas não resolvem o problema sozinhos."
        },
        {
          "id": "c",
          "label": "Eles só servem para marketing."
        }
      ],
      "correctOptionId": "b",
      "feedback": "Documentação é uma camada importante de transparência, não uma solução total."
    },
    {
      "id": "q7",
      "prompt": "Remover a coluna de raça de um dataset garante fairness?",
      "options": [
        {
          "id": "a",
          "label": "Sim, porque nenhum outro atributo pode funcionar como proxy."
        },
        {
          "id": "b",
          "label": "Não, porque outros atributos e o contexto institucional podem continuar produzindo disparidades."
        },
        {
          "id": "c",
          "label": "Sim, desde que a acurácia suba."
        }
      ],
      "correctOptionId": "b",
      "feedback": "Proxies e estruturas históricas podem manter disparidades mesmo sem o atributo sensível explícito."
    },
    {
      "id": "q8",
      "prompt": "Qual é o erro conceitual mais comum em debates públicos sobre fairness?",
      "options": [
        {
          "id": "a",
          "label": "Imaginar que existe uma única métrica neutra capaz de resolver todos os contextos."
        },
        {
          "id": "b",
          "label": "Distinguir fonte de dano e tipo de intervenção."
        },
        {
          "id": "c",
          "label": "Avaliar uso fora do escopo."
        }
      ],
      "correctOptionId": "a",
      "feedback": "A busca por uma métrica universal costuma apagar o caráter normativo e contextual do problema."
    }
  ],
  "glossary": [
    {
      "term": "Viés algorítmico",
      "definition": "Padrão sistemático de erro, tratamento desigual ou dano emergente em sistemas de decisão automatizada."
    },
    {
      "term": "Fairness",
      "definition": "Conjunto de critérios usados para discutir se um sistema trata pessoas ou grupos de modo justificável."
    },
    {
      "term": "Proxy",
      "definition": "Variável usada como substituta do fenômeno de interesse quando ele não é medido diretamente."
    },
    {
      "term": "Base rate",
      "definition": "Frequência de ocorrência do alvo em um grupo ou população."
    },
    {
      "term": "Paridade de erro",
      "definition": "Família de critérios que busca aproximar taxas de erro entre grupos."
    },
    {
      "term": "Calibração",
      "definition": "Propriedade segundo a qual scores ou probabilidades previstas correspondem aproximadamente às frequências observadas."
    },
    {
      "term": "Sub-representação",
      "definition": "Situação em que um grupo aparece menos do que deveria na amostra usada para treinar ou avaliar o sistema."
    },
    {
      "term": "Feedback loop",
      "definition": "Ciclo em que a decisão automatizada altera o ambiente e produz novos dados que reforçam o próprio sistema."
    },
    {
      "term": "Model card",
      "definition": "Documento estruturado que descreve uso previsto, avaliação, limitações e riscos de um modelo."
    },
    {
      "term": "Datasheet for dataset",
      "definition": "Documento estruturado que descreve motivação, coleta, composição, manutenção e riscos de um dataset."
    }
  ]
};
