import type { LessonContent } from "../../../types/content";

export const avaliacaoContinuaMonitoramentoProducaoContent: LessonContent = {
  "id": "avaliacao-continua-monitoramento-producao",
  "title": "Avaliação Contínua e Monitoramento em Produção",
  "subtitle": "Offline bom não garante produção saudável: drift, mudanças de uso, regressões silenciosas e custos invisíveis exigem avaliação permanente.",
  "description": "Uma aula avançada sobre avaliação contínua em produção, métricas online e offline, observabilidade, traces, feedback loops, skew, drift, testes de regressão, alertas, shadow evaluation e resposta operacional a mudanças reais de comportamento.",
  "primaryCategoryId": "inteligencia-artificial",
  "secondaryCategoryId": "engenharia",
  "level": "Avançado",
  "estimatedTime": "45-60 min",
  "tags": [
    "Avaliação",
    "Monitoramento",
    "Produção",
    "Drift",
    "Observabilidade",
    "Feedback",
    "MLflow"
  ],
  "learningObjectives": [
    "Entender por que métricas offline são necessárias, mas insuficientes para produção.",
    "Diferenciar indicadores de qualidade, latência, segurança, custo e experiência.",
    "Relacionar drift, skew e mudança de uso a regressões silenciosas.",
    "Projetar observabilidade com traces, amostragem e metadados úteis.",
    "Explicar o papel de feedback humano, alertas e shadow evaluation.",
    "Tratar monitoramento como laço de aprendizado contínuo, não como dashboard decorativo."
  ],
  "prerequisites": [
    "Noção de métricas de avaliação e deployment de modelos.",
    "Familiaridade básica com observabilidade ou logging ajuda.",
    "Entender que produção traz distribuições e comportamentos diferentes dos conjuntos de teste."
  ],
  "references": [
    {
      "title": "Artificial Intelligence Risk Management Framework (AI RMF 1.0)",
      "source": "NIST",
      "url": "https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf?stream=top",
      "note": "Framework com ênfase em medir, monitorar e operar sistemas de IA."
    },
    {
      "title": "Rules of Machine Learning",
      "source": "Google for Developers",
      "url": "https://developers.google.com/machine-learning/guides/rules-of-ml",
      "note": "Boas práticas clássicas sobre freshness, skew e monitoramento."
    },
    {
      "title": "Productionization",
      "source": "Google for Developers",
      "url": "https://developers.google.com/machine-learning/managing-ml-projects/production",
      "note": "Guia oficial sobre logging, alerting e monitoramento em produção."
    },
    {
      "title": "Production Monitoring for GenAI Applications",
      "source": "MLflow",
      "url": "https://mlflow.org/docs/3.1.3/genai/tracing/prod-tracing/",
      "note": "Guia oficial sobre tracing e monitoramento de aplicações GenAI em produção."
    },
    {
      "title": "What is OpenTelemetry?",
      "source": "OpenTelemetry",
      "url": "https://opentelemetry.io/docs/what-is-opentelemetry/",
      "note": "Visão oficial da especificação de observabilidade amplamente adotada."
    }
  ],
  "heroVisual": "hero",
  "openingText": "Muita equipe celebra quando o modelo passa nos testes offline e é promovido. Só que produção não é um conjunto de validação em câmera lenta. Usuários mudam, dados envelhecem, integrações falham, segmentos raros aparecem e custo operacional se desloca. O dashboard que mostra só uma métrica média pode permanecer verde enquanto a experiência real já piorou. Avaliação contínua existe para enfrentar essa realidade: observar comportamento vivo, comparar contra expectativas e alimentar correções antes que a regressão vire hábito do sistema.",
  "quickFacts": [
    {
      "title": "Offline não basta",
      "body": "Uma boa AUC, acurácia ou score de benchmark não captura toda a dinâmica do uso real."
    },
    {
      "title": "Produção pede múltiplos eixos",
      "body": "Qualidade, latência, custo, segurança e feedback humano precisam ser observados juntos."
    },
    {
      "title": "Sem feedback, o modelo envelhece sozinho",
      "body": "Mudanças de uso e drift passam despercebidos quando o sistema não aprende com o que acontece depois do deploy."
    }
  ],
  "sections": [
    {
      "id": "por-que-monitorar",
      "eyebrow": "Motivação",
      "title": "Produção é um experimento contínuo com usuários reais",
      "lead": "Depois do deploy, o modelo entra em um ambiente que continua mudando sem pedir permissão.",
      "paragraphs": [
        "O conjunto de teste é estático; produção é dinâmica. Novos comportamentos de usuário, sazonalidade, mudança de inventário, alterações de integração e efeitos de feedback podem deslocar o sistema mesmo quando o código permanece igual.",
        "Isso significa que um modelo aprovado ontem pode estar mais frágil amanhã sem nenhuma falha explícita. O dashboard precisa detectar essa erosão antes que ela vire nova normalidade operacional.",
        "Avaliação contínua nasce dessa constatação: o trabalho real de medir começa quando o modelo encontra o mundo vivo."
      ],
      "visual": "hero",
      "blocks": [
        {
          "type": "definition",
          "title": "Avaliação contínua",
          "body": "Prática de medir sistematicamente o comportamento do sistema em produção e alimentar ajustes recorrentes."
        },
        {
          "type": "insight",
          "title": "Deploy não encerra a avaliação",
          "body": "Ele inaugura a fase em que o modelo finalmente encontra o contexto que mais importa."
        }
      ]
    },
    {
      "id": "metricas-multiplas",
      "eyebrow": "Métricas",
      "title": "Qualidade não é um número único em produção",
      "lead": "Latência, custo, segurança e experiência convivem com métricas clássicas de desempenho.",
      "paragraphs": [
        "Modelos em produção precisam ser observados em vários eixos ao mesmo tempo. Um sistema pode manter qualidade semântica e ainda assim falhar por custo excessivo, latência ruim, deriva em segmentos críticos ou violações de política.",
        "A escolha de métricas deve refletir a promessa do produto. Isso inclui métricas diretas, métricas proxy e cortes por população, origem, tipo de tarefa ou tamanho de entrada.",
        "Medição madura exige declarar explicitamente o que é considerado sucesso e o que conta como regressão."
      ],
      "visual": "concept",
      "blocks": [
        {
          "type": "definition",
          "title": "Proxy metric",
          "body": "Sinal indireto usado quando a ground truth não está disponível em tempo real."
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Reduzir a saúde do sistema a uma média agregada e perder segmentos degradados."
        }
      ]
    },
    {
      "id": "traces-e-observabilidade",
      "eyebrow": "Observabilidade",
      "title": "Métricas resumem; traces explicam",
      "lead": "Para investigar bem, o time precisa saber o que aconteceu, com qual contexto e em qual ordem.",
      "paragraphs": [
        "Dashboards mostram tendências agregadas e ajudam a acionar alertas. Mas quando surge um caso estranho, o time precisa de traces, metadados e logs estruturados para entender o caminho da requisição.",
        "Em aplicações de IA e GenAI, isso pode incluir usuário, sessão, origem do dado, documentos recuperados, latência por etapa, ferramentas chamadas e classificações automáticas aplicadas.",
        "A utilidade da observabilidade cresce quando ela é desenhada para explicar comportamento, não apenas para preencher gráficos."
      ],
      "visual": "pipeline",
      "interactive": "observability-coverage-lab",
      "blocks": [
        {
          "type": "definition",
          "title": "Trace",
          "body": "Registro estruturado do percurso de uma requisição e de seus eventos internos."
        },
        {
          "type": "insight",
          "title": "Explicar é diferente de resumir",
          "body": "Quando algo foge do normal, traces ajudam a reconstruir o caso concreto em vez de apenas observar a média."
        }
      ]
    },
    {
      "id": "offline-online-gap",
      "eyebrow": "Risco",
      "title": "O gap entre offline e online é uma fonte clássica de surpresa",
      "lead": "Skew, drift e feedback loops criam regressões silenciosas que o laboratório não previa.",
      "paragraphs": [
        "Mesmo com bons conjuntos de validação, a produção pode apresentar distribuições de entrada, tempos de resposta e intenções de usuário diferentes das observadas no treino. Esse desvio aparece como skew ou drift dependendo do caso.",
        "Também podem surgir loops de retroalimentação: o sistema altera o comportamento do usuário e, com isso, modifica a distribuição futura que encontrará. Em recomendação, ranking, moderação e agentes, isso é especialmente importante.",
        "O valor do monitoramento está em detectar cedo essas mudanças e decidir se basta ajustar threshold, retreinar, revisar features ou voltar a uma versão anterior."
      ],
      "visual": "comparison",
      "interactive": "offline-online-gap-lab",
      "blocks": [
        {
          "type": "definition",
          "title": "Drift e skew",
          "body": "Mudanças na distribuição ou inconsistências entre treino e serving que alteram o comportamento do sistema."
        },
        {
          "type": "example",
          "title": "Situação típica",
          "body": "O modelo foi validado com entradas curtas, mas a produção passou a receber documentos bem maiores e com outro vocabulário."
        }
      ]
    },
    {
      "id": "feedback-e-rotulos",
      "eyebrow": "Aprendizado",
      "title": "Nem toda ground truth chega rápido, mas o sistema ainda precisa aprender",
      "lead": "Feedback humano, amostragem e revisões periódicas ajudam a fechar o ciclo.",
      "paragraphs": [
        "Em muitos produtos, a verdade final leva tempo a aparecer ou nunca aparece de forma perfeita. Isso não impede avaliação contínua: o sistema pode usar amostragem de casos, revisão humana, sinais de insatisfação, métricas operacionais e avaliações assíncronas para aprender.",
        "O importante é tratar esses sinais como parte do produto, e não como tarefa informal de apagar incêndio. Quando o feedback entra no pipeline, o time consegue priorizar correções com evidência.",
        "Em IA generativa, julgamentos humanos e revisões por rubricas estruturadas continuam especialmente valiosos."
      ],
      "visual": "comparison",
      "blocks": [
        {
          "type": "insight",
          "title": "Feedback é infraestrutura",
          "body": "Sem caminho claro para captar e reutilizar sinal humano, a produção vira ruído não aproveitado."
        },
        {
          "type": "definition",
          "title": "Feedback loop",
          "body": "Mecanismo pelo qual sinais do uso real retornam ao sistema para medir, corrigir ou retreinar."
        }
      ]
    },
    {
      "id": "alertas-e-resposta",
      "eyebrow": "Operação",
      "title": "Monitorar sem plano de resposta produz dashboards passivos",
      "lead": "Alertas precisam levar a investigação, mitigação e decisão operacional clara.",
      "paragraphs": [
        "Quando métricas cruzam limites definidos, o time precisa saber quem olha, o que examina, quais traces consulta e quais opções de contenção estão disponíveis. Sem isso, o alerta é só ansiedade automatizada.",
        "Boas práticas incluem runbooks, thresholds com contexto, prioridade por severidade e caminhos explícitos para rollback, throttling, mudança de feature flag ou isolamento de tráfego.",
        "Observabilidade só fecha o ciclo quando a organização sabe agir sobre ela."
      ],
      "visual": "checklist",
      "blocks": [
        {
          "type": "definition",
          "title": "Alerting",
          "body": "Notificação automática acionada por comportamento anômalo ou fora do orçamento definido."
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Configurar muitos alertas sem runbook e dessensibilizar o time ao que realmente importa."
        }
      ]
    },
    {
      "id": "shadow-and-canary",
      "eyebrow": "Lançamento",
      "title": "Nem toda versão nova precisa ganhar produção inteira de uma vez",
      "lead": "Shadow evaluation e canary releases ajudam a aprender com menos risco.",
      "paragraphs": [
        "Executar uma nova versão em paralelo, comparar traces, medir diferenças e observar impacto antes da promoção completa reduz exposição a regressões inesperadas.",
        "Esse tipo de rollout é especialmente útil quando a ground truth demora ou quando o comportamento qualitativo do sistema precisa de inspeção adicional.",
        "O objetivo não é desacelerar por medo, mas aprender progressivamente com tráfego real de forma controlada."
      ],
      "visual": "tradeoff",
      "interactive": "monitoring-strategies",
      "blocks": [
        {
          "type": "definition",
          "title": "Shadow evaluation",
          "body": "Execução paralela e observável de uma versão nova sem lhe dar controle completo do resultado em produção."
        },
        {
          "type": "example",
          "title": "Canary mental",
          "body": "Liberar para uma pequena fatia de tráfego pode revelar problemas que o offline não mostrou."
        }
      ]
    },
    {
      "id": "sustentacao",
      "eyebrow": "Decisão",
      "title": "Avaliação contínua é um laço, não um relatório",
      "lead": "Quando bem feita, ela alimenta produto, engenharia e governança ao mesmo tempo.",
      "paragraphs": [
        "O sistema aprende com sua própria operação: detecta padrões novos, sinaliza segmentos frágeis, corrige thresholds, informa roadmap de dados e justifica retreinamento ou redesign.",
        "Isso exige combinar métricas, traces, feedback e revisão humana com disciplina operacional. Nenhuma peça isolada substitui a outra.",
        "A recompensa é grande: decisões deixam de ser movidas por intuição reativa e passam a ser orientadas por evidência contínua."
      ],
      "visual": "checklist",
      "blocks": [
        {
          "type": "insight",
          "title": "Monitorar é aprender",
          "body": "A melhor pilha de monitoramento não serve apenas para detectar falhas, mas para orientar evolução do sistema."
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Tratar observabilidade como obrigação de compliance e não como fonte de melhoria concreta."
        }
      ]
    },
    {
      "id": "quiz-revisao",
      "eyebrow": "Revisão",
      "title": "Quiz de revisão",
      "lead": "Use as perguntas para testar se monitoramento, traces, drift e resposta operacional ficaram conectados.",
      "paragraphs": [
        "A meta é sair capaz de desenhar um loop de avaliação que continue útil quando o tráfego e o produto mudarem."
      ],
      "interactive": "quiz"
    },
    {
      "id": "glossario",
      "eyebrow": "Glossário",
      "title": "Glossário essencial",
      "lead": "Feche a aula consolidando os termos usados em avaliação contínua e monitoramento de IA em produção.",
      "paragraphs": [
        "Eles aparecem em práticas de observabilidade, frameworks de risco e ferramentas modernas de tracing e avaliação."
      ],
      "interactive": "glossary"
    }
  ],
  "summaryCards": [
    {
      "title": "Monitorar é comparar promessa com realidade",
      "body": "A operação precisa mostrar se o comportamento real continua dentro do esperado."
    },
    {
      "title": "Traces explicam, métricas resumem",
      "body": "Uma sem a outra deixa lacunas importantes de investigação."
    },
    {
      "title": "Drift e skew pedem resposta contínua",
      "body": "O risco cresce quando o mundo muda e o pipeline não percebe."
    },
    {
      "title": "Avaliação contínua fecha o loop",
      "body": "Alertas, revisão humana e rollback permitem corrigir cedo e com evidência."
    }
  ],
  "quiz": [
    {
      "id": "q1",
      "prompt": "Por que avaliação offline não basta?",
      "options": [
        {
          "id": "a",
          "label": "Porque produção traz distribuições, usos e custos diferentes dos dados de validação."
        },
        {
          "id": "b",
          "label": "Porque métricas offline são sempre inúteis."
        },
        {
          "id": "c",
          "label": "Porque modelos não mudam ao longo do tempo."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Offline é necessário, mas o ambiente vivo acrescenta variáveis e mudanças que o benchmark não captura sozinho."
    },
    {
      "id": "q2",
      "prompt": "O que uma proxy metric tenta fazer?",
      "options": [
        {
          "id": "a",
          "label": "Substituir parcialmente a ground truth quando ela não chega em tempo real."
        },
        {
          "id": "b",
          "label": "Aumentar a VRAM do servidor."
        },
        {
          "id": "c",
          "label": "Eliminar a necessidade de observabilidade."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Muitas aplicações precisam de sinais indiretos para detectar degradação antes de ter rótulo definitivo."
    },
    {
      "id": "q3",
      "prompt": "Por que traces são valiosos?",
      "options": [
        {
          "id": "a",
          "label": "Porque ajudam a explicar o caminho e o contexto de eventos específicos, não apenas a média agregada."
        },
        {
          "id": "b",
          "label": "Porque substituem todos os dashboards."
        },
        {
          "id": "c",
          "label": "Porque fazem o modelo treinar sozinho."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Métricas resumem; traces ajudam a investigar causas e sequências concretas."
    },
    {
      "id": "q4",
      "prompt": "Qual é um exemplo clássico de skew?",
      "options": [
        {
          "id": "a",
          "label": "Features transformadas de forma diferente no treino e no serving."
        },
        {
          "id": "b",
          "label": "Ter mais de uma métrica no dashboard."
        },
        {
          "id": "c",
          "label": "Usar monitoramento assíncrono."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Skew nasce quando a produção não replica adequadamente as condições assumidas no treino."
    },
    {
      "id": "q5",
      "prompt": "Quando shadow evaluation é útil?",
      "options": [
        {
          "id": "a",
          "label": "Quando se quer observar uma versão nova em paralelo antes de lhe dar poder total em produção."
        },
        {
          "id": "b",
          "label": "Quando não há interesse em comparar modelos."
        },
        {
          "id": "c",
          "label": "Quando o sistema não gera logs."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Shadow mode permite aprender com tráfego real sem expor totalmente usuários e decisões ao novo comportamento."
    },
    {
      "id": "q6",
      "prompt": "Por que monitorar custo junto de qualidade?",
      "options": [
        {
          "id": "a",
          "label": "Porque um sistema pode manter qualidade e ainda assim se tornar economicamente inviável."
        },
        {
          "id": "b",
          "label": "Porque custo nunca muda em produção."
        },
        {
          "id": "c",
          "label": "Porque qualidade e custo são a mesma métrica."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Operação saudável precisa equilibrar utilidade, latência e sustentabilidade econômica."
    },
    {
      "id": "q7",
      "prompt": "Qual papel do feedback humano?",
      "options": [
        {
          "id": "a",
          "label": "Fornecer sinais qualitativos e corretivos que métricas automáticas nem sempre capturam."
        },
        {
          "id": "b",
          "label": "Substituir toda medição automática."
        },
        {
          "id": "c",
          "label": "Eliminar a necessidade de alertas."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Revisão e feedback humano ajudam especialmente em qualidade semântica, segurança e casos raros."
    },
    {
      "id": "q8",
      "prompt": "Qual postura é mais madura em monitoramento?",
      "options": [
        {
          "id": "a",
          "label": "Manter dashboards bonitos e reagir apenas quando usuários reclamam."
        },
        {
          "id": "b",
          "label": "Combinar métricas, traces, amostragem, alertas e plano de resposta operacional."
        },
        {
          "id": "c",
          "label": "Olhar apenas p50 e ignorar segmentos raros."
        }
      ],
      "correctOptionId": "b",
      "feedback": "Monitoramento eficaz liga medição a investigação e resposta, e não apenas a visualização."
    }
  ],
  "glossary": [
    {
      "term": "Drift",
      "definition": "Mudança gradual ou abrupta na distribuição dos dados, comportamento ou contexto operacional."
    },
    {
      "term": "Skew",
      "definition": "Diferença entre as condições do treino e as condições de serving ou monitoramento."
    },
    {
      "term": "Shadow evaluation",
      "definition": "Avaliação paralela de uma versão nova sem expô-la diretamente a decisões de produção."
    },
    {
      "term": "Trace",
      "definition": "Registro estruturado do caminho de uma requisição, com contexto, tempos e eventos relevantes."
    },
    {
      "term": "Proxy metric",
      "definition": "Métrica indireta usada quando a ground truth não está disponível em tempo real."
    },
    {
      "term": "Feedback loop",
      "definition": "Ciclo em que saídas, avaliações e sinais de uso retornam ao sistema para ajuste."
    },
    {
      "term": "Sampling",
      "definition": "Coleta parcial e intencional de eventos para observar comportamento sem custo descontrolado."
    },
    {
      "term": "Alerting",
      "definition": "Mecanismo automático de notificação quando métricas ou padrões ultrapassam limites definidos."
    },
    {
      "term": "First-token latency",
      "definition": "Tempo até o primeiro token ou primeira resposta percebida pelo usuário em modelos generativos."
    },
    {
      "term": "Residual risk",
      "definition": "Risco remanescente depois da aplicação das medidas de controle e monitoramento."
    }
  ]
};
