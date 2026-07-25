import type { LessonContent } from "../../../types/content";

export const mlopsEssencialContent: LessonContent = {
  "id": "mlops-essencial",
  "title": "MLOps Essencial",
  "subtitle": "Treinar um modelo é só o começo: produção exige versionamento, validação, observabilidade e processos que sobrevivam ao tempo.",
  "description": "Uma aula intermediária sobre o núcleo do MLOps: dívida técnica em sistemas de ML, pipelines reprodutíveis, CI/CD/CT, versionamento de dados e modelos, gates de release, monitoramento e rollback.",
  "primaryCategoryId": "inteligencia-artificial",
  "secondaryCategoryId": "engenharia",
  "level": "Intermediário",
  "estimatedTime": "40-55 min",
  "tags": [
    "MLOps",
    "Pipelines",
    "CI/CD",
    "Reprodutibilidade",
    "Model Registry",
    "Monitoramento"
  ],
  "learningObjectives": [
    "Entender por que sistemas de ML acumulam dívida técnica específica além da dívida tradicional de software.",
    "Explicar o papel de pipelines, metadados e versionamento para reproduzir experimentos e releases.",
    "Diferenciar CI, CD e CT em contextos de machine learning.",
    "Relacionar validação de dados, avaliação de modelo e gates de deploy.",
    "Reconhecer a importância de rollback, observabilidade e ownership claro.",
    "Usar MLOps como disciplina operacional, e não como pilha de ferramentas da moda."
  ],
  "prerequisites": [
    "Noção geral de treinamento e deployment de modelos.",
    "Familiaridade básica com software versionado e automação de pipeline.",
    "Entender que um modelo em produção precisa ser mantido, não apenas lançado."
  ],
  "references": [
    {
      "title": "Hidden Technical Debt in Machine Learning Systems",
      "source": "Google Research",
      "url": "https://research.google/pubs/hidden-technical-debt-in-machine-learning-systems/",
      "note": "Paper clássico sobre dívida técnica específica de sistemas de ML."
    },
    {
      "title": "Architecture for MLOps using TensorFlow Extended, Agent Platform Pipelines, and Cloud Build",
      "source": "Google Cloud Architecture Center",
      "url": "https://docs.cloud.google.com/architecture/architecture-for-mlops-using-tfx-kubeflow-pipelines-and-cloud-build",
      "note": "Documento oficial sobre CI/CD/CT e pipelines de ML."
    },
    {
      "title": "TFX Guide",
      "source": "TensorFlow",
      "url": "https://www.tensorflow.org/tfx/guide",
      "note": "Guia oficial do TensorFlow Extended para pipelines de produção."
    },
    {
      "title": "MLflow Documentation",
      "source": "MLflow",
      "url": "https://mlflow.org/docs/latest/index.html",
      "note": "Documentação oficial de tracking, registry e deployment."
    },
    {
      "title": "Kubeflow Overview",
      "source": "Kubeflow",
      "url": "https://www.kubeflow.org/docs/started/introduction/",
      "note": "Introdução oficial à plataforma de orquestração de ML em Kubernetes."
    }
  ],
  "heroVisual": "hero",
  "openingText": "Machine learning adora demos brilhantes: notebook bonito, métrica boa, checkpoint salvo. O problema começa no dia seguinte, quando alguém precisa reproduzir o experimento, atualizar dados, subir outra versão, comparar resultados e voltar atrás se a produção piorar. É aí que MLOps deixa de ser buzzword e vira disciplina. O trabalho não é só automatizar treino; é construir um sistema em que dados, código, modelos e decisões operacionais possam ser compreendidos, auditados e repetidos sem heroísmo.",
  "quickFacts": [
    {
      "title": "Dívida técnica em ML cresce em silêncio",
      "body": "Mudanças pequenas em dados, features ou consumo do modelo podem gerar efeitos longos e difíceis de rastrear."
    },
    {
      "title": "Sem versionamento, não há memória",
      "body": "Código sozinho não reproduz um modelo; dados, parâmetros e ambiente também precisam ser rastreados."
    },
    {
      "title": "Release de ML é sociotécnico",
      "body": "Deploy bom depende de automação, mas também de ownership, critérios e rollback claros."
    }
  ],
  "sections": [
    {
      "id": "por-que-mlops",
      "eyebrow": "Motivação",
      "title": "Modelos em produção sofrem com o tempo, não só com bugs",
      "lead": "MLOps existe para tornar esse desgaste observável e administrável.",
      "paragraphs": [
        "Sistemas de ML mudam mesmo quando o código parece estável. Dados novos, consumo novo, features novas e mudanças externas podem deslocar o comportamento do modelo sem tocar diretamente na arquitetura.",
        "É por isso que a dívida técnica em ML frequentemente cresce fora do arquivo-fonte. Ela vive em pipelines, dependências implícitas, jobs manuais e consumo difuso do modelo por outras áreas.",
        "MLOps entra como resposta a essa fragilidade: criar trilhas, critérios e automações que diminuam surpresa operacional."
      ],
      "visual": "hero",
      "blocks": [
        {
          "type": "definition",
          "title": "MLOps",
          "body": "Conjunto de práticas para operar modelos de forma reprodutível, auditável e sustentável em produção."
        },
        {
          "type": "insight",
          "title": "ML quebra por contexto",
          "body": "A saúde do sistema depende de dados, ambiente, consumo e processos além do código do modelo."
        }
      ]
    },
    {
      "id": "reprodutibilidade",
      "eyebrow": "Base",
      "title": "Sem reproduzir, você não consegue melhorar nem depurar",
      "lead": "Dados, parâmetros e ambiente precisam ser tratados como parte do artefato.",
      "paragraphs": [
        "Um experimento de ML não é apenas um commit. É também uma versão de dados, um conjunto de hiperparâmetros, dependências de ambiente e, muitas vezes, transformações de features que nem sempre ficam explícitas no notebook.",
        "Quando isso não é rastreado, cada treino bem-sucedido vira um evento histórico, não um processo repetível. O time passa a depender de memória humana e sorte.",
        "Reprodutibilidade não é burocracia: é a condição mínima para comparar versões com justiça."
      ],
      "visual": "concept",
      "blocks": [
        {
          "type": "definition",
          "title": "Lineage",
          "body": "Histórico de como dados, código e configurações produziram um modelo específico."
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Guardar só o checkpoint final e tratar todo o resto como detalhe recuperável depois."
        }
      ]
    },
    {
      "id": "pipelines-e-metadados",
      "eyebrow": "Estrutura",
      "title": "Pipelines transformam rituais manuais em processos legíveis",
      "lead": "Quando o fluxo é explícito, fica mais fácil testar, reexecutar e auditar.",
      "paragraphs": [
        "Ingestão, validação, transformação, treino, avaliação, empacotamento e publicação podem ser modelados como etapas com entradas, saídas e metadados claros. Isso reduz improviso e aumenta previsibilidade.",
        "Ferramentas como TFX, Kubeflow e MLflow materializam essa ideia de modos diferentes, mas compartilham um princípio: o sistema precisa lembrar o que aconteceu sem depender da pessoa que estava online naquele dia.",
        "Pipelines bons também expõem falhas cedo, em vez de enterrá-las no notebook ou no deploy manual."
      ],
      "visual": "pipeline",
      "interactive": "pipeline-maturity-lab",
      "blocks": [
        {
          "type": "example",
          "title": "Etapas típicas",
          "body": "Validação de dados → treino → avaliação → registro → promoção controlada."
        },
        {
          "type": "insight",
          "title": "Metadados são memória operacional",
          "body": "Sem eles, o time sabe que treinou algo, mas não sabe exatamente o quê, com quais insumos e por quê."
        }
      ]
    },
    {
      "id": "ci-cd-ct",
      "eyebrow": "Entrega",
      "title": "CI, CD e CT parecem siglas irmãs, mas cobrem riscos diferentes",
      "lead": "Confundir essas camadas produz automação sem governança ou governança sem fluidez.",
      "paragraphs": [
        "CI ajuda a garantir que mudanças em código, contratos e transformações quebrem cedo. CD organiza promoção e deploy de artefatos. CT adiciona a lógica de retreinar ou recalibrar o modelo ao longo do tempo.",
        "Nem todo sistema precisa de CT agressivo. Em muitos contextos, o mais seguro é treinar sob gatilhos bem definidos, com aprovação humana ou gates objetivos.",
        "O ponto importante é separar claramente qual automação protege qualidade de código, qual promove artefatos e qual altera comportamento do modelo."
      ],
      "visual": "comparison",
      "blocks": [
        {
          "type": "definition",
          "title": "CT",
          "body": "Continuous training: estratégia para atualizar modelos de modo recorrente ou acionado por critérios."
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Automatizar retreinamento sem garantir que os dados, métricas e critérios de promoção estejam sólidos."
        }
      ]
    },
    {
      "id": "gates-e-release",
      "eyebrow": "Governança",
      "title": "Toda promoção precisa de uma porta de segurança",
      "lead": "Gates reduzem a chance de transformar experimento promissor em incidente de produção.",
      "paragraphs": [
        "Antes de promover um modelo, o time pode exigir validação de schema, comparação com baseline, verificação de skew, métricas mínimas por segmento, testes de integração e checagens de custo ou latência.",
        "Esses gates não existem para atrapalhar velocidade, mas para impedir que ganhos pontuais escondam perdas importantes. Um modelo bom em média ainda pode ser ruim no que mais importa ao negócio.",
        "Gates bem desenhados tornam decisões explícitas e repetíveis."
      ],
      "visual": "tradeoff",
      "interactive": "release-risk-lab",
      "blocks": [
        {
          "type": "definition",
          "title": "Gate de validação",
          "body": "Critério automático ou humano que bloqueia promoção de versões sem evidência suficiente de segurança operacional."
        },
        {
          "type": "insight",
          "title": "Promoção é decisão",
          "body": "Deploy de modelo não é só copiar artefato; é assumir risco calculado sobre comportamento futuro."
        }
      ]
    },
    {
      "id": "registry-ownership",
      "eyebrow": "Operação",
      "title": "Registry e ownership evitam o caos do 'ninguém sabe quem lançou isso'",
      "lead": "Versionar artefatos sem responsáveis claros ainda deixa metade do problema em aberto.",
      "paragraphs": [
        "Model registry organiza versões, estágios, lineage e metadados de promoção. Ownership define quem responde por desvios, monitoramento, documentação e rollback.",
        "Sem essas duas peças, o time sabe que há modelos em circulação, mas não consegue responder rapidamente quem depende deles e qual caminho seguro existe para voltar atrás.",
        "MLOps maduro transforma artefatos em produtos internos com responsável conhecido."
      ],
      "visual": "checklist",
      "blocks": [
        {
          "type": "definition",
          "title": "Ownership",
          "body": "Clareza sobre quem mantém, monitora e decide sobre o ciclo de vida do modelo."
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Ter muitas versões registradas, mas nenhum processo claro de promoção, descontinuação e suporte."
        }
      ]
    },
    {
      "id": "monitorar-e-voltar",
      "eyebrow": "Confiabilidade",
      "title": "Se produção degradar, o time precisa descobrir cedo e recuar rápido",
      "lead": "Observabilidade e rollback são parte do lançamento, não acessórios posteriores.",
      "paragraphs": [
        "Drift, skew, incidentes de dados, picos de latência e regressões de qualidade nem sempre aparecem offline. Por isso, o plano de release precisa incluir dashboards, alertas, amostragem e um caminho seguro de reversão.",
        "Rollback rápido reduz tempo de exposição. Observabilidade rica reduz tempo até diagnóstico. Juntos, eles transformam incidentes em eventos controláveis em vez de crises prolongadas.",
        "Sem esse fechamento de ciclo, cada deploy carrega um medo difuso que desacelera o time inteiro."
      ],
      "visual": "checklist",
      "blocks": [
        {
          "type": "insight",
          "title": "Rollback é parte do design",
          "body": "Se não há retorno claro para a versão anterior, a estratégia de release ainda está incompleta."
        },
        {
          "type": "example",
          "title": "Sinal útil",
          "body": "Alertas por métricas de qualidade proxy, skew de features e latência ajudam a perceber degradação cedo."
        }
      ]
    },
    {
      "id": "topologias-de-time",
      "eyebrow": "Decisão",
      "title": "MLOps também é desenho organizacional",
      "lead": "A pilha técnica precisa combinar com a maturidade do time e com o tamanho do problema.",
      "paragraphs": [
        "Alguns times operam bem com poucas automações e forte disciplina manual. Outros já precisam de plataforma dedicada, contratos internos e abstrações comuns entre vários modelos e equipes.",
        "Copiar o stack do time mais maduro do mercado raramente é a decisão certa. Ferramenta demais sem processo produz teatro operacional. Processo demais sem automação produz fila humana.",
        "A boa topologia é aquela que reduz atrito sem esconder responsabilidade."
      ],
      "visual": "tradeoff",
      "interactive": "team-topologies",
      "blocks": [
        {
          "type": "example",
          "title": "Pergunta útil",
          "body": "Você precisa de plataforma central agora ou de dois ou três guardrails simples que resolvam o risco mais frequente?"
        },
        {
          "type": "definition",
          "title": "Maturidade operacional",
          "body": "Grau de capacidade do time para reproduzir, promover, monitorar e corrigir modelos de forma consistente."
        }
      ]
    },
    {
      "id": "quiz-revisao",
      "eyebrow": "Revisão",
      "title": "Quiz de revisão",
      "lead": "Use as perguntas para verificar se dívida técnica, pipelines, gates e rollback ficaram conectados.",
      "paragraphs": [
        "O valor de MLOps aparece quando você consegue explicar como reduzir fragilidade operacional sem transformar o time em refém da própria ferramenta."
      ],
      "interactive": "quiz"
    },
    {
      "id": "glossario",
      "eyebrow": "Glossário",
      "title": "Glossário essencial",
      "lead": "Feche a aula consolidando o vocabulário-base de operação de ML em produção.",
      "paragraphs": [
        "Esses termos ajudam a ler documentação, discutir arquitetura e evitar ambiguidades em incidentes e releases."
      ],
      "interactive": "glossary"
    }
  ],
  "summaryCards": [
    {
      "title": "MLOps reduz fragilidade",
      "body": "Pipelines reprodutíveis e metadados confiáveis diminuem dependência de memória humana."
    },
    {
      "title": "CI/CD/CT têm papéis distintos",
      "body": "Nem todo pipeline precisa treinar, nem todo treino deve publicar automaticamente."
    },
    {
      "title": "Gates protegem produção",
      "body": "Validação de dados e modelo evita que regressões virem incidente."
    },
    {
      "title": "Observabilidade fecha o ciclo",
      "body": "Sem monitorar, o time descobre tarde demais que a produção mudou."
    }
  ],
  "quiz": [
    {
      "id": "q1",
      "prompt": "Qual problema o paper de dívida técnica em ML destacou com força?",
      "options": [
        {
          "id": "a",
          "label": "Que sistemas de ML acumulam acoplamentos e riscos que o código sozinho não revela."
        },
        {
          "id": "b",
          "label": "Que modelos nunca precisam de manutenção."
        },
        {
          "id": "c",
          "label": "Que pipelines substituem observabilidade."
        }
      ],
      "correctOptionId": "a",
      "feedback": "A dívida de ML nasce de dependências de dados, feedback loops e consumo externo, entre outros fatores."
    },
    {
      "id": "q2",
      "prompt": "Por que versionar apenas o código não basta em ML?",
      "options": [
        {
          "id": "a",
          "label": "Porque dados, parâmetros e ambiente também afetam o modelo final."
        },
        {
          "id": "b",
          "label": "Porque modelos não usam código."
        },
        {
          "id": "c",
          "label": "Porque Git não funciona com IA."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Reproduzir um modelo requer rastrear mais do que o repositório de aplicação."
    },
    {
      "id": "q3",
      "prompt": "Qual opção descreve melhor CT?",
      "options": [
        {
          "id": "a",
          "label": "Treinar automaticamente sempre que alguém abrir o notebook."
        },
        {
          "id": "b",
          "label": "Estratégia de retreinamento contínuo ou periódico com critérios definidos."
        },
        {
          "id": "c",
          "label": "Publicar qualquer modelo após o treino sem validação."
        }
      ],
      "correctOptionId": "b",
      "feedback": "CT precisa de gatilhos, dados, critérios e proteções claras."
    },
    {
      "id": "q4",
      "prompt": "Qual é o papel de um model registry?",
      "options": [
        {
          "id": "a",
          "label": "Guardar versões e metadados para promover, comparar e auditar modelos."
        },
        {
          "id": "b",
          "label": "Substituir o monitoramento em produção."
        },
        {
          "id": "c",
          "label": "Fazer inferência mais rápida por si só."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Registry organiza o ciclo de vida do artefato do modelo, não elimina outras práticas."
    },
    {
      "id": "q5",
      "prompt": "O que um gate de validação evita?",
      "options": [
        {
          "id": "a",
          "label": "Que versões com regressão evidente avancem para produção sem controle."
        },
        {
          "id": "b",
          "label": "Que o time escreva documentação."
        },
        {
          "id": "c",
          "label": "Que dados mudem ao longo do tempo."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Gates são mecanismos de contenção de risco, não garantia absoluta contra toda mudança futura."
    },
    {
      "id": "q6",
      "prompt": "Qual situação sugere training-serving skew?",
      "options": [
        {
          "id": "a",
          "label": "Features processadas de forma diferente no treino e no endpoint."
        },
        {
          "id": "b",
          "label": "Modelo com boa acurácia offline e boa latência."
        },
        {
          "id": "c",
          "label": "Existência de um dashboard de métricas."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Skew aparece quando o que é servido não corresponde ao que o modelo aprendeu a consumir."
    },
    {
      "id": "q7",
      "prompt": "Por que rollback é tão importante em MLOps?",
      "options": [
        {
          "id": "a",
          "label": "Porque produção muda e regressões precisam de uma saída rápida e segura."
        },
        {
          "id": "b",
          "label": "Porque elimina a necessidade de testes."
        },
        {
          "id": "c",
          "label": "Porque toda versão nova sempre falha."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Rollback reduz tempo de exposição quando uma promoção dá errado."
    },
    {
      "id": "q8",
      "prompt": "Qual leitura sobre MLOps é mais madura?",
      "options": [
        {
          "id": "a",
          "label": "É uma coleção fixa de ferramentas obrigatórias."
        },
        {
          "id": "b",
          "label": "É uma disciplina para tornar sistemas de ML reproduzíveis, auditáveis e operáveis."
        },
        {
          "id": "c",
          "label": "É apenas CI para notebooks."
        }
      ],
      "correctOptionId": "b",
      "feedback": "Ferramentas variam; a disciplina operacional é o elemento duradouro."
    }
  ],
  "glossary": [
    {
      "term": "MLOps",
      "definition": "Prática de operar sistemas de machine learning com foco em reprodutibilidade, entrega e governança."
    },
    {
      "term": "Feature store",
      "definition": "Camada usada para organizar, versionar ou servir features de modo consistente entre treino e inferência."
    },
    {
      "term": "Model registry",
      "definition": "Repositório de versões de modelos com metadados, estágios e histórico de promoção."
    },
    {
      "term": "CI",
      "definition": "Integração contínua, com testes e verificações automatizadas a cada mudança."
    },
    {
      "term": "CD",
      "definition": "Entrega contínua ou deploy contínuo, com promoção automatizada ou semiautomatizada de artefatos."
    },
    {
      "term": "CT",
      "definition": "Continuous training: retreinamento recorrente ou acionado por critérios definidos."
    },
    {
      "term": "Training-serving skew",
      "definition": "Diferença entre o que o modelo viu no treino e o que encontra ao servir."
    },
    {
      "term": "Lineage",
      "definition": "Rastro de dependências entre dados, código, modelo e release."
    },
    {
      "term": "Gate de validação",
      "definition": "Critério automático ou manual usado para bloquear promoção de versões arriscadas."
    },
    {
      "term": "Rollback",
      "definition": "Ação de voltar para uma versão anterior quando a atual apresenta regressão ou incidente."
    }
  ]
};
