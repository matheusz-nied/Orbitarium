import type { LessonContent } from "../../../types/content";

export const timeSeriesForecastingMlContent: LessonContent = {
  "id": "time-series-forecasting-ml",
  "title": "Time Series e Forecasting com ML",
  "subtitle": "Quando o tempo entra nos dados, a ordem importa — e ignorá-la produz modelos vistosos, mas enganadores.",
  "description": "Uma aula sobre séries temporais, decomposição, lags, horizonte, backtesting, leakage temporal e escolha entre modelos estatísticos, ML tabular e deep learning.",
  "primaryCategoryId": "inteligencia-artificial",
  "secondaryCategoryId": "matematica",
  "level": "Intermediário",
  "estimatedTime": "45-60 min",
  "tags": [
    "Time Series",
    "Forecasting",
    "Backtesting",
    "Lags",
    "Seasonality",
    "Leakage"
  ],
  "learningObjectives": [
    "Entender por que observações temporais não podem ser tratadas como linhas independentes embaralháveis.",
    "Distinguir tendência, sazonalidade, ruído e eventos exógenos em problemas de previsão.",
    "Reconhecer leakage temporal e por que splits aleatórios podem inflar performance artificialmente.",
    "Entender o papel de lags, janelas, variáveis exógenas e horizonte de previsão.",
    "Comparar avaliação por holdout temporal, walk-forward e métricas como MASE em vez de confiar apenas em RMSE isolado.",
    "Escolher com mais critério entre modelos estatísticos, ML tabular e redes profundas para forecasting."
  ],
  "prerequisites": [
    "Noção básica de regressão ou previsão.",
    "Curiosidade sobre dados ordenados no tempo.",
    "Interesse em entender por que forecasting pede validação diferente de datasets i.i.d. clássicos."
  ],
  "references": [
    {
      "title": "Forecasting: Principles and Practice (3rd ed)",
      "source": "Hyndman & Athanasopoulos",
      "url": "https://otexts.com/fpp3/",
      "note": "Livro aberto de referência para forecasting e avaliação temporal."
    },
    {
      "title": "Forecasting: theory and practice",
      "source": "Petropoulos et al. — arXiv",
      "url": "https://arxiv.org/pdf/2012.03854",
      "note": "Panorama amplo de métodos e princípios de forecasting."
    },
    {
      "title": "Deep Learning for Time Series Forecasting: Tutorial and Literature Survey",
      "source": "ACM Computing Surveys",
      "url": "https://doi.org/10.1145/3533382",
      "note": "Survey importante sobre abordagens neurais modernas para forecasting."
    },
    {
      "title": "Another look at measures of forecast accuracy",
      "source": "Hyndman & Koehler",
      "url": "https://robjhyndman.com/papers/another-look-at-measures-of-forecast-accuracy/",
      "note": "Discussão clássica sobre métricas e proposta do MASE."
    },
    {
      "title": "Time Series Analysis",
      "source": "statsmodels documentation",
      "url": "https://www.statsmodels.org/stable/tsa.html",
      "note": "Documentação prática para modelos clássicos de séries temporais."
    },
    {
      "title": "sktime documentation",
      "source": "sktime",
      "url": "https://www.sktime.net/en/stable/",
      "note": "Ecossistema moderno para forecasting e avaliação temporal em Python."
    }
  ],
  "heroVisual": "time-series-forecasting-ml-hero",
  "openingText": "Em forecasting, o erro conceitual mais caro é fingir que o tempo não existe. Em dados i.i.d., embaralhar pode ser aceitável. Em séries temporais, isso frequentemente destrói a própria pergunta que queremos responder: dado o passado, o que posso dizer sobre o futuro? Aprender forecasting é, antes de tudo, aprender a respeitar direção temporal, horizonte e mecanismo de avaliação.",
  "quickFacts": [
    {
      "title": "Tempo impõe causalidade prática",
      "body": "O futuro não pode informar o treino se o objetivo é prever esse próprio futuro."
    },
    {
      "title": "Baseline ingênuo ainda é forte",
      "body": "Em muitas séries, comparar com o último valor, com sazonalidade simples ou com média histórica já evita ilusões de avanço."
    },
    {
      "title": "Boa métrica depende da série",
      "body": "Comparar forecasting exige atenção a escala, sazonalidade, intermitência e horizonte de previsão."
    }
  ],
  "sections": [
    {
      "id": "tempo-importa",
      "eyebrow": "Princípio básico",
      "title": "Séries temporais não são tabelas embaralháveis",
      "lead": "O traço definidor de uma série temporal é a dependência entre observações ao longo do tempo. O valor de hoje pode carregar informação sobre o de amanhã, e a ordem das observações faz parte da estrutura do problema.",
      "paragraphs": [
        "Isso muda tudo: features, splits, métricas e interpretação de erro. Em forecasting, cada decisão de modelagem precisa respeitar o fato de que o sistema só deveria usar informação disponível até o instante de previsão.",
        "Quando ignoramos esse princípio, podemos produzir modelos que parecem excelentes em validação, mas seriam impossíveis de operar corretamente no mundo real."
      ],
      "visual": "time-series-forecasting-ml-hero",
      "blocks": [
        {
          "type": "definition",
          "title": "Forecasting",
          "body": "Tarefa de estimar valores futuros de uma série com base em observações passadas e, às vezes, variáveis exógenas disponíveis."
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Misturar passado e futuro no pipeline e depois tratar o score resultante como previsão legítima."
        }
      ]
    },
    {
      "id": "componentes",
      "eyebrow": "Estrutura da série",
      "title": "Tendência, sazonalidade, ruído e eventos exógenos ajudam a ler o comportamento temporal",
      "lead": "Muitas séries combinam componentes distintos: tendência de longo prazo, padrões sazonais recorrentes, choques específicos e ruído residual. Entender essa composição ajuda a formular hipóteses mais úteis do que simplesmente jogar a série em um modelo genérico.",
      "paragraphs": [
        "Esse diagnóstico inicial também orienta baselines e features. Se há forte sazonalidade semanal, por exemplo, um baseline sazonal já oferece uma barra de comparação mais justa do que média simples.",
        "Boa modelagem começa com boa leitura da série. Forecasting não é só ajuste paramétrico; é interpretação temporal."
      ],
      "visual": "time-series-forecasting-ml-componentes",
      "blocks": [
        {
          "type": "definition",
          "title": "Sazonalidade",
          "body": "Padrão que se repete em intervalos relativamente regulares, como dia, semana, mês ou ano."
        },
        {
          "type": "example",
          "title": "Exemplo",
          "body": "Demanda elétrica costuma carregar sazonalidade diária e semanal, além de choques por clima ou feriados."
        }
      ]
    },
    {
      "id": "leakage",
      "eyebrow": "Perigo clássico",
      "title": "Leakage temporal produz modelos excelentes demais para serem verdadeiros",
      "lead": "Normalizar usando todo o dataset, construir features com janelas que invadem o futuro, fazer split aleatório ou ajustar hiperparâmetros olhando repetidamente para períodos futuros são formas clássicas de leakage temporal.",
      "paragraphs": [
        "O resultado costuma ser sedutor: erros baixos, curva bonita, sensação de progresso. Mas o sistema aprendeu com informação que não teria no momento real da previsão. O score, então, mede uma habilidade impossível de usar legitimamente.",
        "Por isso, forecasting exige disciplina metodológica especial. A pergunta sempre volta: este pipeline poderia ser executado em produção exatamente do jeito como foi avaliado?"
      ],
      "interactive": "time-series-forecasting-ml-leakage",
      "blocks": [
        {
          "type": "definition",
          "title": "Leakage temporal",
          "body": "Uso indevido de informação futura em etapas de treino, validação, transformação ou escolha de modelo."
        },
        {
          "type": "insight",
          "title": "Boa previsão é previsão causalmente plausível",
          "body": "Não basta acertar o número; é preciso acertá-lo com informação que realmente estaria disponível no momento correto."
        }
      ]
    },
    {
      "id": "splits",
      "eyebrow": "Avaliação",
      "title": "Backtesting temporal é mais honesto do que split aleatório",
      "lead": "Em vez de embaralhar, avaliamos forecasting respeitando a seta do tempo: treinamos no passado e testamos em janelas futuras. Isso pode ser feito com holdout temporal ou, melhor ainda, com esquemas walk-forward que repetem a avaliação ao longo do tempo.",
      "paragraphs": [
        "Essa prática reduz a chance de um bom score ser apenas acidente de um período específico. Também aproxima mais a avaliação das condições de uso real, em que o modelo é continuamente atualizado ou reaplicado em novas janelas.",
        "O custo é maior, mas o ganho epistêmico compensa: a estimativa de desempenho fica menos fantasiosa."
      ],
      "visual": "time-series-forecasting-ml-splits",
      "blocks": [
        {
          "type": "definition",
          "title": "Walk-forward validation",
          "body": "Procedimento em que a janela de treino avança no tempo e a previsão é repetida em múltiplos períodos futuros."
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Usar random split porque “é o padrão do scikit-learn” mesmo quando a estrutura temporal torna esse padrão inadequado."
        }
      ]
    },
    {
      "id": "features",
      "eyebrow": "Representação",
      "title": "Lags, janelas e variáveis exógenas transformam passado em sinal útil",
      "lead": "Modelos de ML tabular para forecasting costumam converter a série em features como lags, médias móveis, diferenças, calendários e covariáveis externas. Essa etapa é poderosa, mas também é onde muito leakage entra disfarçado.",
      "paragraphs": [
        "A regra de ouro é simples: cada feature deve poder ser construída usando apenas o passado disponível até o instante da previsão. Qualquer atalho para “dar uma olhada mais à frente” invalida o experimento.",
        "Quando essa disciplina é respeitada, métodos tabulares podem competir muito bem com abordagens mais sofisticadas em vários contextos práticos."
      ],
      "visual": "time-series-forecasting-ml-pipeline-forecast",
      "blocks": [
        {
          "type": "definition",
          "title": "Lag",
          "body": "Valor passado da própria série usado como feature para prever valores futuros."
        },
        {
          "type": "example",
          "title": "Exemplo",
          "body": "Para prever vendas amanhã, podemos usar vendas de ontem, da semana passada e do mesmo dia em semanas anteriores."
        }
      ]
    },
    {
      "id": "horizonte",
      "eyebrow": "Escopo da previsão",
      "title": "Prever 1 passo à frente não é o mesmo problema que prever 30",
      "lead": "Horizonte de previsão muda o problema. Curto prazo costuma depender mais da persistência local; longo prazo pode exigir estrutura sazonal, covariáveis e tratamento mais explícito de incerteza.",
      "paragraphs": [
        "Também mudam os erros relevantes. Um modelo excelente em horizonte curto pode degradar rapidamente quando precisa iterar previsões para horizontes maiores. Isso precisa aparecer no desenho da avaliação e na forma de relatar resultados.",
        "Forecasting sério, portanto, quase sempre pergunta “em qual horizonte?” antes de comparar modelos."
      ],
      "interactive": "time-series-forecasting-ml-avaliacao",
      "blocks": [
        {
          "type": "definition",
          "title": "Horizonte de previsão",
          "body": "Número de passos futuros para os quais queremos gerar estimativas."
        },
        {
          "type": "insight",
          "title": "Um único score pode esconder muita coisa",
          "body": "Sem separar horizontes, um resultado agregado pode misturar previsões fáceis e difíceis como se fossem a mesma tarefa."
        }
      ]
    },
    {
      "id": "escolha-modelo",
      "eyebrow": "Modelagem",
      "title": "Clássico, tabular ou deep? A melhor família depende da série e do regime de dados",
      "lead": "Modelos estatísticos clássicos continuam fortíssimos quando a série é relativamente bem comportada e os dados não são imensos. ML tabular pode capturar padrões úteis com engenharia de features bem feita. Redes profundas podem ajudar em cenários multisséries, grandes escalas e relações mais complexas.",
      "paragraphs": [
        "O erro comum é presumir que deep learning sempre vence. Em forecasting, baselines clássicos e híbridos continuam difíceis de bater quando o problema é pequeno, bem estruturado ou dominado por sazonalidade simples.",
        "A boa escolha é pragmática: qual família respeita a estrutura temporal, oferece avaliação honesta e entrega o melhor compromisso entre desempenho, interpretabilidade e custo operacional?"
      ],
      "visual": "time-series-forecasting-ml-modelos",
      "interactive": "time-series-forecasting-ml-familias",
      "blocks": [
        {
          "type": "example",
          "title": "Exemplo",
          "body": "Uma série única curta pode se beneficiar mais de um modelo sazonal clássico do que de uma rede profunda com dezenas de hiperparâmetros."
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Ignorar baselines simples e ir direto para arquiteturas complexas sem demonstrar ganho real sob backtesting honesto."
        }
      ]
    },
    {
      "id": "resumo-final",
      "eyebrow": "Síntese",
      "title": "Feche a aula lembrando que tempo é método",
      "lead": "Revise como estrutura temporal, leakage, backtesting e horizonte moldam a escolha e a interpretação do modelo.",
      "paragraphs": [
        "A grande lição é que forecasting com ML exige tanto respeito à seta do tempo quanto criatividade de modelagem; sem esse respeito, a avaliação vira teatro."
      ],
      "interactive": "summary-cards"
    },
    {
      "id": "quiz-revisao",
      "eyebrow": "Revisão",
      "title": "Quiz de revisão de forecasting",
      "lead": "Teste se ficaram claros os perigos de leakage temporal e as escolhas centrais de validação.",
      "paragraphs": [
        "As perguntas retomam componentes de série, splits temporais, features causais e comparação entre famílias de modelos."
      ],
      "interactive": "quiz"
    },
    {
      "id": "glossario",
      "eyebrow": "Vocabulário",
      "title": "Glossário essencial de séries temporais",
      "lead": "Consolide o vocabulário que organiza forecasting antes de partir para modelos específicos.",
      "paragraphs": [
        "Esse conjunto de termos ajuda a evitar os erros mais caros de avaliação e de formulação em dados temporais."
      ],
      "interactive": "glossary"
    }
  ],
  "summaryCards": [
    {
      "title": "Tempo não pode ser embaralhado",
      "body": "Forecasting exige usar apenas informação disponível no passado da janela prevista."
    },
    {
      "title": "Componentes ajudam a pensar",
      "body": "Tendência, sazonalidade, ruído e choques exógenos orientam baselines e features."
    },
    {
      "title": "Backtesting importa",
      "body": "Holdout temporal e walk-forward aproximam mais a avaliação do uso real do que splits aleatórios."
    },
    {
      "title": "Modelo bom depende do contexto",
      "body": "Clássicos, tabulares e neurais têm regimes diferentes de vantagem em forecasting."
    }
  ],
  "quiz": [
    {
      "id": "q1",
      "prompt": "Qual é o erro conceitual mais grave em forecasting com ML?",
      "options": [
        {
          "id": "a",
          "label": "Ignorar a direção temporal e usar informação futura no pipeline."
        },
        {
          "id": "b",
          "label": "Calcular uma média móvel."
        },
        {
          "id": "c",
          "label": "Usar um lag como feature."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Sem respeitar a seta do tempo, o score deixa de medir uma previsão legítima."
    },
    {
      "id": "q2",
      "prompt": "O que é sazonalidade?",
      "options": [
        {
          "id": "a",
          "label": "Padrão que se repete em intervalos relativamente regulares."
        },
        {
          "id": "b",
          "label": "Erro de medição em sensores."
        },
        {
          "id": "c",
          "label": "Qualquer ruído branco."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Sazonalidade captura repetições temporais estruturadas, como semanais ou anuais."
    },
    {
      "id": "q3",
      "prompt": "Por que random split é perigoso em séries temporais?",
      "options": [
        {
          "id": "a",
          "label": "Porque pode misturar futuro no treino e inflar artificialmente a performance."
        },
        {
          "id": "b",
          "label": "Porque séries não têm números suficientes."
        },
        {
          "id": "c",
          "label": "Porque toda série é estacionária."
        }
      ],
      "correctOptionId": "a",
      "feedback": "O embaralhamento rompe a estrutura temporal e produz leakage prático."
    },
    {
      "id": "q4",
      "prompt": "O que faz a walk-forward validation?",
      "options": [
        {
          "id": "a",
          "label": "Repete treino e teste em múltiplas janelas futuras respeitando a ordem temporal."
        },
        {
          "id": "b",
          "label": "Troca aleatoriamente as colunas do dataset."
        },
        {
          "id": "c",
          "label": "Apaga a sazonalidade da série."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Ela é um procedimento mais honesto para estimar desempenho de previsão ao longo do tempo."
    },
    {
      "id": "q5",
      "prompt": "O que é um lag?",
      "options": [
        {
          "id": "a",
          "label": "Valor passado da série usado como feature."
        },
        {
          "id": "b",
          "label": "Erro absoluto médio."
        },
        {
          "id": "c",
          "label": "Um tipo de distribuição gaussiana."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Lags transformam o passado recente ou sazonal em sinal para prever o futuro."
    },
    {
      "id": "q6",
      "prompt": "Por que horizonte importa?",
      "options": [
        {
          "id": "a",
          "label": "Porque prever um passo à frente pode ser muito diferente de prever muitos passos à frente."
        },
        {
          "id": "b",
          "label": "Porque horizonte não muda a tarefa."
        },
        {
          "id": "c",
          "label": "Porque só modelos neurais usam horizonte."
        }
      ],
      "correctOptionId": "a",
      "feedback": "O problema muda com o horizonte e a avaliação precisa refletir isso."
    },
    {
      "id": "q7",
      "prompt": "Qual é uma boa prática em forecasting?",
      "options": [
        {
          "id": "a",
          "label": "Comparar contra baselines simples e fortes antes de declarar vitória de um modelo complexo."
        },
        {
          "id": "b",
          "label": "Ignorar o último valor como baseline."
        },
        {
          "id": "c",
          "label": "Escolher o modelo mais profundo por padrão."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Baselines simples muitas vezes são difíceis de bater e são referência indispensável."
    },
    {
      "id": "q8",
      "prompt": "Qual é a melhor síntese da aula?",
      "options": [
        {
          "id": "a",
          "label": "Forecasting bom depende tanto de respeitar o tempo e avaliar corretamente quanto da escolha do modelo."
        },
        {
          "id": "b",
          "label": "Basta aplicar qualquer regressor com split aleatório."
        },
        {
          "id": "c",
          "label": "Deep learning sempre vence em séries temporais."
        }
      ],
      "correctOptionId": "a",
      "feedback": "O método de avaliação é parte central da própria qualidade do forecasting."
    }
  ],
  "glossary": [
    {
      "term": "Série temporal",
      "definition": "Sequência de observações ordenadas no tempo, com dependências potenciais entre instantes."
    },
    {
      "term": "Forecasting",
      "definition": "Previsão de valores futuros com base em dados passados e eventualmente covariáveis externas."
    },
    {
      "term": "Tendência",
      "definition": "Direção de longo prazo da série ao longo do tempo."
    },
    {
      "term": "Sazonalidade",
      "definition": "Padrão recorrente em intervalos temporais relativamente regulares."
    },
    {
      "term": "Ruído",
      "definition": "Variação residual não explicada pelos componentes estruturais principais."
    },
    {
      "term": "Lag",
      "definition": "Valor passado da série usado como feature preditiva."
    },
    {
      "term": "Leakage temporal",
      "definition": "Uso indevido de informação futura em treino, transformação, tuning ou validação."
    },
    {
      "term": "Holdout temporal",
      "definition": "Separação entre treino e teste que respeita a ordem do tempo, testando em período futuro."
    },
    {
      "term": "Walk-forward",
      "definition": "Validação repetida em janelas temporais sucessivas que avançam ao longo da série."
    },
    {
      "term": "MASE",
      "definition": "Mean Absolute Scaled Error, métrica proposta para comparar forecast accuracy de forma mais robusta entre séries."
    }
  ]
};
