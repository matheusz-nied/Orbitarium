import type { LessonContent } from "../../../types/content";

export const observabilidadeDeSistemasContent: LessonContent = {
  "id": "observabilidade-de-sistemas",
  "title": "Observabilidade de Sistemas",
  "subtitle": "Logs, métricas e traces como ferramentas para perguntar melhor e responder mais rápido em produção.",
  "description": "Uma aula visual sobre sinais de telemetria, correlação, instrumentação, SLI/SLO, cardinalidade, alertas e os erros mais comuns em observabilidade moderna.",
  "primaryCategoryId": "computacao",
  "secondaryCategoryId": "engenharia",
  "level": "Intermediário",
  "estimatedTime": "45-60 min",
  "tags": [
    "Observabilidade",
    "Logs",
    "Métricas",
    "Tracing",
    "SLO",
    "OpenTelemetry",
    "Operação"
  ],
  "learningObjectives": [
    "Distinguir monitoramento tradicional de observabilidade como capacidade investigativa.",
    "Comparar logs, métricas e traces como sinais complementares e não rivais.",
    "Entender por que contexto, correlação e propagação são cruciais em sistemas distribuídos.",
    "Relacionar instrumentação com custo, cardinalidade e valor analítico.",
    "Explicar o papel de SLIs, SLOs e alertas bem desenhados na operação saudável.",
    "Reconhecer erros comuns como excesso de dashboards sem perguntas operacionais claras."
  ],
  "prerequisites": [
    "Noção básica de aplicações web ou serviços distribuídos.",
    "Alguma experiência com erros em produção ajuda, mas não é obrigatória.",
    "Interesse por operação, confiabilidade e depuração de sistemas."
  ],
  "references": [
    {
      "title": "Observability Primer",
      "source": "OpenTelemetry",
      "url": "https://opentelemetry.io/docs/concepts/observability-primer/",
      "note": "Introdução oficial ao conceito de observabilidade aplicada a software."
    },
    {
      "title": "Signals",
      "source": "OpenTelemetry",
      "url": "https://opentelemetry.io/docs/concepts/signals/",
      "note": "Visão oficial sobre logs, métricas e traces."
    },
    {
      "title": "Context Propagation",
      "source": "OpenTelemetry",
      "url": "https://opentelemetry.io/docs/concepts/context-propagation/",
      "note": "Explica como contexto viaja entre componentes distribuídos."
    },
    {
      "title": "Monitoring Distributed Systems",
      "source": "Google SRE Book",
      "url": "https://sre.google/sre-book/monitoring-distributed-systems/",
      "note": "Capítulo clássico sobre monitoramento e sinais úteis."
    },
    {
      "title": "Histograms and summaries",
      "source": "Prometheus Documentation",
      "url": "https://prometheus.io/docs/practices/histograms/",
      "note": "Guia prático sobre métricas de latência e distribuição."
    },
    {
      "title": "Alerting on SLOs",
      "source": "Google SRE Workbook",
      "url": "https://sre.google/workbook/alerting-on-slos/",
      "note": "Material reconhecido sobre alertas guiados por objetivos de serviço."
    }
  ],
  "heroVisual": "observability-hero",
  "openingText": "Sistemas modernos falham de formas que quase nunca cabem em uma métrica isolada. Um timeout pode nascer de saturação, fila acumulada, propagação ausente de contexto, dependência externa degradada ou simples erro de código. Observabilidade existe para reduzir esse espaço de adivinhação. Ela não é um mural de gráficos bonitos; é a capacidade de formular perguntas úteis sobre um sistema real com base nos sinais que ele emite.",
  "quickFacts": [
    {
      "title": "Sinais são complementares",
      "body": "Logs, métricas e traces iluminam ângulos diferentes do mesmo comportamento."
    },
    {
      "title": "Contexto vale ouro",
      "body": "Sem correlação entre componentes, a investigação distribuída vira caça ao acaso."
    },
    {
      "title": "Alertar não é gritar",
      "body": "Bom alerta aponta para impacto operacional relevante, não para qualquer ruído."
    }
  ],
  "sections": [
    {
      "id": "o-que-e-observabilidade",
      "eyebrow": "Fundamento",
      "title": "Observabilidade não é só monitorar; é conseguir investigar o desconhecido",
      "lead": "Monitoramento responde bem a perguntas previstas. Observabilidade amplia a capacidade de explorar perguntas novas quando a produção surpreende.",
      "visual": "observability-mapa",
      "paragraphs": [
        "Dashboards e alarmes fazem parte do trabalho, mas observabilidade vai além do painel pronto. Ela depende de sinais ricos o bastante para sustentar exploração, correlação e decomposição do problema quando a falha não segue o roteiro esperado.",
        "Em outras palavras, monitoramento tende a vigiar sintomas conhecidos; observabilidade tenta dar visibilidade estrutural para entender sistemas complexos sob comportamento emergente."
      ],
      "blocks": [
        {
          "type": "definition",
          "title": "Observabilidade",
          "body": "Capacidade de inferir o estado interno de um sistema a partir dos sinais externos que ele produz."
        },
        {
          "type": "insight",
          "title": "Perguntas novas importam",
          "body": "O maior valor aparece quando a equipe consegue investigar o que não tinha sido antecipado em um dashboard pronto."
        }
      ]
    },
    {
      "id": "pipeline-de-telemetria",
      "eyebrow": "Fluxo",
      "title": "Da aplicação ao painel, existe um pipeline de telemetria com perdas e escolhas",
      "lead": "Instrumentação, coleta, agregação, armazenamento e consulta moldam o que você realmente consegue enxergar.",
      "interactive": "telemetry-pipeline-lab",
      "paragraphs": [
        "A aplicação emite sinais. Agentes ou SDKs coletam. Um backend agrega, indexa ou amostra. Ferramentas de consulta e visualização finalmente tornam o dado explorável. Em cada etapa há trade-offs entre custo, latência, fidelidade e retenção.",
        "Ignorar esse pipeline leva a falsas expectativas: nem todo dado foi armazenado, nem toda consulta é barata, e nem toda ausência de evidência significa ausência de evento."
      ],
      "blocks": [
        {
          "type": "example",
          "title": "Exemplo",
          "body": "Uma trace perdida por amostragem pode explicar por que o painel parece calmo enquanto um cliente específico sofre lentidão."
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Assumir que coletar tudo sempre é a melhor escolha. Em produção, custo e ruído cobram essa conta."
        }
      ]
    },
    {
      "id": "logs-metricas-traces",
      "eyebrow": "Sinais",
      "title": "Logs, métricas e traces respondem perguntas diferentes",
      "lead": "Em vez de escolher um “vencedor”, a prática madura combina sinais conforme o tipo de dúvida operacional.",
      "interactive": "signals-comparison-lab",
      "paragraphs": [
        "Métricas resumem comportamento ao longo do tempo e são ótimas para tendências e alertas. Logs capturam eventos e contexto textual. Traces conectam o caminho de uma requisição ou tarefa entre múltiplos componentes. Juntos, esses sinais reduzem cegueira distribuída.",
        "O erro clássico é tentar usar um sinal para resolver tudo: logs demais afogam, métricas demais explodem cardinalidade e traces sem contexto viram desenho bonito sem explicação."
      ],
      "blocks": [
        {
          "type": "definition",
          "title": "Trace distribuída",
          "body": "Representação do caminho de uma operação por múltiplos serviços, spans e dependências."
        },
        {
          "type": "insight",
          "title": "Cada sinal tem uma vocação",
          "body": "Combinar vocações diferentes é o que torna a investigação mais rápida e menos arbitrária."
        }
      ]
    },
    {
      "id": "contexto-e-correlacao",
      "eyebrow": "Correlação",
      "title": "Sem propagação de contexto, cada serviço conta uma história isolada",
      "lead": "IDs de correlação, atributos consistentes e contexto propagado conectam eventos que, de outro modo, pareceriam desconexos.",
      "paragraphs": [
        "Em sistemas distribuídos, um erro visível no frontend pode nascer de uma chamada ao serviço A, que depende do B, que por sua vez enfileira trabalho no C. Sem contexto propagado entre esses saltos, a investigação se fragmenta em buscas paralelas pouco conclusivas.",
        "Correlacionar não é apenas “ter um request id”; é garantir convenções consistentes para que as ferramentas e as pessoas consigam juntar pedaços do comportamento real."
      ],
      "blocks": [
        {
          "type": "definition",
          "title": "Context propagation",
          "body": "Mecanismo pelo qual informações de contexto seguem a execução entre fronteiras de processo, rede ou fila."
        },
        {
          "type": "example",
          "title": "Exemplo",
          "body": "Um trace id presente em logs e spans ajuda a ligar um pico de latência a um passo exato da cadeia de serviços."
        }
      ]
    },
    {
      "id": "instrumentacao-e-slos",
      "eyebrow": "Trade-off",
      "title": "Instrumentar bem é escolher o que observar sem explodir custo e cardinalidade",
      "lead": "Boa observabilidade exige foco: medir tudo sem critério pode piorar a operação em vez de melhorá-la.",
      "interactive": "observability-dial-lab",
      "paragraphs": [
        "Atributos úteis demais podem gerar cardinalidade explosiva; pouca estrutura pode impedir análise significativa. O mesmo vale para alertas: métricas sem vínculo com experiência do usuário ou objetivos de serviço produzem muito ruído e pouca ação.",
        "SLIs e SLOs ajudam a ancorar a telemetria no que realmente importa para o serviço, deslocando a conversa de “tem dado suficiente?” para “esse dado sustenta uma decisão operacional relevante?”."
      ],
      "blocks": [
        {
          "type": "definition",
          "title": "SLO",
          "body": "Objetivo de nível de serviço que expressa uma meta operacional mensurável para confiabilidade ou desempenho."
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Alertar por qualquer variação técnica sem relação clara com impacto ao usuário ou risco real ao serviço."
        }
      ]
    },
    {
      "id": "erros-comuns",
      "eyebrow": "Prática",
      "title": "Ferramenta cara não compensa ausência de perguntas operacionais claras",
      "lead": "Muitos fracassos de observabilidade nascem de dashboards demais, nomenclatura inconsistente e telemetria sem dono.",
      "visual": "observability-resumo",
      "paragraphs": [
        "Sem padronização mínima, atributos comparáveis e rotinas de revisão, cada equipe interpreta os sinais de um jeito. Isso dificulta resposta a incidentes, aprendizado pós-falha e evolução coerente da instrumentação.",
        "Observabilidade madura combina técnica, processo e linguagem comum: o objetivo é tornar o sistema mais legível para humanos sob pressão."
      ],
      "blocks": [
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Criar dezenas de dashboards e alertas sem clareza sobre quem age em cada um e por quê."
        },
        {
          "type": "insight",
          "title": "Observabilidade é disciplina compartilhada",
          "body": "Ela depende tanto de instrumentação quanto de convenções operacionais e revisão contínua."
        }
      ]
    },
    {
      "id": "sintese-operacional",
      "eyebrow": "Síntese",
      "title": "Checklist mental de observabilidade",
      "lead": "Revise sinais, contexto e objetivos de serviço antes de confiar em um painel isolado.",
      "interactive": "summary-cards",
      "paragraphs": [
        "Use os cartões para consolidar como investigar melhor em vez de apenas olhar gráficos."
      ]
    },
    {
      "id": "quiz-revisao",
      "eyebrow": "Revisão",
      "title": "Quiz de revisão",
      "lead": "Teste sua intuição sobre sinais, correlação e ruído operacional.",
      "interactive": "quiz",
      "paragraphs": [
        "As perguntas conectam investigação, SLOs e trade-offs de instrumentação."
      ]
    },
    {
      "id": "glossario",
      "eyebrow": "Vocabulário",
      "title": "Glossário essencial",
      "lead": "Termos recorrentes em plataformas de telemetria e confiabilidade.",
      "interactive": "glossary",
      "paragraphs": [
        "Consulte o glossário ao ler guias de OpenTelemetry, Prometheus e SRE."
      ]
    }
  ],
  "summaryCards": [
    {
      "title": "Observabilidade responde ao inesperado",
      "body": "Ela vale mais quando o comportamento real foge do dashboard pronto."
    },
    {
      "title": "Sinais precisam conversar",
      "body": "Logs, métricas e traces ficam mais úteis quando compartilham contexto e convenções."
    },
    {
      "title": "SLIs e SLOs orientam foco",
      "body": "Telemetria boa ajuda a tomar decisão, não apenas a acumular dado."
    }
  ],
  "quiz": [
    {
      "id": "q1",
      "prompt": "Qual ideia resume melhor observabilidade?",
      "options": [
        {
          "id": "a",
          "label": "Capacidade de investigar o estado de um sistema a partir dos sinais que ele emite."
        },
        {
          "id": "b",
          "label": "Quantidade total de gráficos em uma TV."
        },
        {
          "id": "c",
          "label": "Uso exclusivo de logs textuais."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Observabilidade é uma capacidade investigativa, não um tipo único de ferramenta."
    },
    {
      "id": "q2",
      "prompt": "Para que métricas costumam ser especialmente úteis?",
      "options": [
        {
          "id": "a",
          "label": "Tendências, agregações e alertas ao longo do tempo."
        },
        {
          "id": "b",
          "label": "Guardar cada linha detalhada de execução."
        },
        {
          "id": "c",
          "label": "Substituir totalmente traces distribuídas."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Métricas brilham em visão agregada e monitoramento contínuo."
    },
    {
      "id": "q3",
      "prompt": "Qual é a vocação principal de traces?",
      "options": [
        {
          "id": "a",
          "label": "Mostrar o caminho de uma operação por múltiplos serviços e etapas."
        },
        {
          "id": "b",
          "label": "Servir como autenticação de usuário."
        },
        {
          "id": "c",
          "label": "Armazenar assets estáticos do frontend."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Traces ajudam a enxergar dependências e latência distribuída."
    },
    {
      "id": "q4",
      "prompt": "Por que propagação de contexto importa?",
      "options": [
        {
          "id": "a",
          "label": "Porque ela conecta eventos e spans que pertencem à mesma jornada distribuída."
        },
        {
          "id": "b",
          "label": "Porque ela reduz o tamanho do binário."
        },
        {
          "id": "c",
          "label": "Porque elimina a necessidade de logs."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Sem contexto propagado, cada componente vira uma ilha investigativa."
    },
    {
      "id": "q5",
      "prompt": "O que é um SLO?",
      "options": [
        {
          "id": "a",
          "label": "Uma meta mensurável de nível de serviço usada para orientar confiabilidade."
        },
        {
          "id": "b",
          "label": "Um log com timestamp."
        },
        {
          "id": "c",
          "label": "Uma fila de mensagens ordenada."
        }
      ],
      "correctOptionId": "a",
      "feedback": "SLOs ajudam a ancorar decisões operacionais em objetivos explícitos."
    },
    {
      "id": "q6",
      "prompt": "Qual é um risco clássico de instrumentação sem critério?",
      "options": [
        {
          "id": "a",
          "label": "Explodir cardinalidade, custo e ruído sem aumentar clareza operacional."
        },
        {
          "id": "b",
          "label": "Apagar automaticamente dados antigos do banco."
        },
        {
          "id": "c",
          "label": "Quebrar o DNS da aplicação."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Mais dado nem sempre significa mais entendimento."
    },
    {
      "id": "q7",
      "prompt": "Qual afirmação é mais saudável sobre sinais?",
      "options": [
        {
          "id": "a",
          "label": "Eles são complementares e devem ser combinados conforme a pergunta operacional."
        },
        {
          "id": "b",
          "label": "Logs são sempre superiores a qualquer outro sinal."
        },
        {
          "id": "c",
          "label": "Métricas tornam traces desnecessárias."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Maturidade vem da combinação inteligente entre sinais."
    },
    {
      "id": "q8",
      "prompt": "Qual é um erro comum em alertas?",
      "options": [
        {
          "id": "a",
          "label": "Alertar sobre ruído técnico sem relação com impacto real ou ação esperada."
        },
        {
          "id": "b",
          "label": "Usar dashboards compartilhados."
        },
        {
          "id": "c",
          "label": "Registrar latência de requisições."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Bom alerta precisa ser acionável e alinhado a objetivos de serviço."
    }
  ],
  "glossary": [
    {
      "term": "Observabilidade",
      "definition": "Capacidade de inferir o estado interno de um sistema a partir de sinais externos."
    },
    {
      "term": "Telemetria",
      "definition": "Conjunto de dados emitidos por um sistema para análise operacional."
    },
    {
      "term": "Log",
      "definition": "Registro de evento ou mensagem produzido por software durante a execução."
    },
    {
      "term": "Métrica",
      "definition": "Medida numérica agregável, útil para tendências, dashboards e alertas."
    },
    {
      "term": "Trace",
      "definition": "Representação do percurso de uma operação através de múltiplos componentes."
    },
    {
      "term": "Span",
      "definition": "Unidade individual dentro de uma trace, representando uma etapa de trabalho."
    },
    {
      "term": "Context propagation",
      "definition": "Propagação de informações de contexto entre processos, serviços ou filas."
    },
    {
      "term": "Cardinalidade",
      "definition": "Quantidade de combinações possíveis de rótulos ou atributos em uma série ou evento."
    },
    {
      "term": "SLI",
      "definition": "Indicador mensurável que reflete um aspecto da experiência ou da confiabilidade do serviço."
    },
    {
      "term": "SLO",
      "definition": "Meta operacional para um ou mais indicadores de serviço."
    },
    {
      "term": "Amostragem",
      "definition": "Redução deliberada do volume coletado ou armazenado para controlar custo e escala."
    }
  ],
  "relatedTopics": [
    {
      "title": "APIs REST",
      "body": "Endpoints e status codes são parte importante do que você observa no comportamento de um serviço."
    },
    {
      "title": "Filas e Arquitetura Event-Driven",
      "body": "Sistemas assíncronos aumentam a necessidade de contexto propagado e sinais correlacionáveis."
    }
  ]
};
