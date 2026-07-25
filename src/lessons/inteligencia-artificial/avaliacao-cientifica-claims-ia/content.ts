import type { LessonContent } from "../../../types/content";

export const avaliacaoCientificaClaimsIaContent: LessonContent = {
  "id": "avaliacao-cientifica-claims-ia",
  "title": "Avaliação Científica de Claims de IA",
  "subtitle": "Como diferenciar score impressionante, evidência robusta e marketing técnico ao interpretar resultados em IA.",
  "description": "Uma aula avançada sobre validade de benchmarks, leakage, contaminação, baselines, ablações, reprodutibilidade e documentação para avaliação de claims de IA.",
  "primaryCategoryId": "inteligencia-artificial",
  "secondaryCategoryId": "historia-da-ciencia",
  "level": "Avançado",
  "estimatedTime": "50-65 min",
  "tags": [
    "Avaliação",
    "Benchmarks",
    "Reprodutibilidade",
    "Leakage",
    "HELM",
    "Claims científicos"
  ],
  "learningObjectives": [
    "Distinguir score em benchmark de claim científico amplo sobre capacidade do sistema.",
    "Entender conceitos de validade interna, externa e comparabilidade em avaliação de IA.",
    "Reconhecer leakage, contaminação e seleção oportunista de benchmark como ameaças centrais à evidência.",
    "Explicar por que baselines, ablações e documentação são parte da própria força do claim.",
    "Avaliar o papel de frameworks como HELM, model cards e datasheets na interpretação responsável de resultados.",
    "Ler resultados de IA com menos credulidade diante de números isolados e mais atenção ao desenho experimental."
  ],
  "prerequisites": [
    "Noção básica de treino, teste e benchmark.",
    "Familiaridade inicial com métricas de desempenho.",
    "Interesse em metodologia científica e avaliação comparativa."
  ],
  "references": [
    {
      "title": "Holistic Evaluation of Language Models",
      "source": "Liang et al. — TMLR / OpenReview",
      "url": "https://openreview.net/forum?id=iO4LZibEqW",
      "note": "Referência importante para avaliação holística e multissinal de modelos de linguagem."
    },
    {
      "title": "Leakage and the reproducibility crisis in machine-learning-based science",
      "source": "Patterns",
      "url": "https://doi.org/10.1016/j.patter.2023.100804",
      "note": "Discussão central sobre leakage e claims que desmoronam sob reprodução cuidadosa."
    },
    {
      "title": "Model Cards for Model Reporting",
      "source": "Mitchell et al. — ACM FAccT",
      "url": "https://doi.org/10.1145/3287560.3287596",
      "note": "Framework para relatar escopo, avaliação e limitações de modelos."
    },
    {
      "title": "Datasheets for Datasets",
      "source": "Gebru et al. — arXiv",
      "url": "https://arxiv.org/abs/1803.09010",
      "note": "Framework para relatar composição, coleta e riscos de datasets."
    },
    {
      "title": "BenchmarkCards: Standardized Documentation for Large Language Model Benchmarks",
      "source": "Sokol et al. — arXiv",
      "url": "https://arxiv.org/abs/2410.12974",
      "note": "Proposta recente para documentação mais clara de benchmarks."
    },
    {
      "title": "Reproducible.cs.princeton.edu",
      "source": "Princeton University",
      "url": "https://reproducible.cs.princeton.edu/",
      "note": "Repositório de estudos sobre falhas de reprodução e leakage em ciência orientada por ML."
    }
  ],
  "heroVisual": "avaliacao-cientifica-claims-ia-hero",
  "openingText": "Resultados em IA circulam como números curtos e claims longos. Um score alto vira “o modelo raciocina”, “o sistema entende”, “a abordagem supera humanos” ou “a solução é pronta para produção”. A metodologia científica pede freio: o que exatamente foi medido, em qual cenário, contra quais baselines, com quais artefatos reprodutíveis e com que relação entre benchmark e claim? Avaliar IA cientificamente é, em grande parte, aprender a resistir ao salto indevido entre resultado e interpretação.",
  "quickFacts": [
    {
      "title": "Benchmark não é o mundo",
      "body": "Um benchmark mede um recorte, não uma capacidade universal do sistema."
    },
    {
      "title": "Score alto pode esconder atalhos",
      "body": "Leakage, contaminação, seleção oportunista e prompts específicos podem inflar resultados sem sustentar o claim amplo."
    },
    {
      "title": "Documentação é evidência",
      "body": "Sem relatar dados, protocolo, seeds, prompts e baselines, a interpretação do resultado fica dramaticamente mais frágil."
    }
  ],
  "sections": [
    {
      "id": "score-vs-claim",
      "eyebrow": "Problema",
      "title": "Um número sozinho não sustenta um claim científico amplo",
      "lead": "Benchmarks são úteis porque comprimem comparação em cenários manejáveis. O perigo surge quando o score vira atalho retórico para afirmações muito maiores do que o desenho experimental autoriza.",
      "paragraphs": [
        "Dizer que um modelo obteve certo resultado em um conjunto de tarefas é diferente de dizer que ele “raciocina”, “compreende”, “é seguro” ou “funciona em produção”. Entre resultado e claim há um espaço de validade que precisa ser explicitado.",
        "A avaliação madura começa perguntando: qual foi exatamente a pergunta respondida pelo experimento? Se o claim excede muito essa pergunta, já temos um primeiro sinal de fragilidade metodológica."
      ],
      "visual": "avaliacao-cientifica-claims-ia-hero",
      "blocks": [
        {
          "type": "definition",
          "title": "Claim científico",
          "body": "Afirmação interpretativa que tenta generalizar o que um resultado experimental de fato mostra."
        },
        {
          "type": "insight",
          "title": "A força do claim depende do desenho",
          "body": "Quanto mais ambicioso o claim, mais robusta precisa ser a cadeia de evidências e controles experimentais."
        }
      ]
    },
    {
      "id": "validade",
      "eyebrow": "Método",
      "title": "Validade interna e externa delimitam o que podemos concluir",
      "lead": "Validade interna pergunta se o resultado realmente decorre do que o experimento pretendeu testar. Validade externa pergunta até que ponto ele se transfere para outros cenários, populações, tarefas ou tempos.",
      "paragraphs": [
        "Em IA, é comum ter validade interna razoável em um benchmark e validade externa fraca fora dele. Um modelo pode parecer excelente em tarefas curadas e desabar quando muda o domínio, a distribuição, o idioma ou a interface de uso.",
        "Separar essas camadas é libertador: nem todo benchmark precisa provar generalidade universal. O problema é quando o artigo, a demo ou o marketing vendem esse salto sem sustentação proporcional."
      ],
      "visual": "avaliacao-cientifica-claims-ia-validade",
      "blocks": [
        {
          "type": "definition",
          "title": "Validade externa",
          "body": "Grau em que o resultado sustenta inferências para além do cenário experimental específico."
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Confundir bom desempenho em benchmark fechado com prova automática de robustez em ambiente real."
        }
      ]
    },
    {
      "id": "leakage",
      "eyebrow": "Ameaças",
      "title": "Leakage e contaminação podem fabricar superioridade ilusória",
      "lead": "Leakage ocorre quando informação indevida do conjunto de teste ou do futuro entra no treino, na seleção de features, no tuning ou no protocolo. Em modelos fundacionais, contaminação também inclui o caso em que benchmarks aparecem explícita ou implicitamente no corpus de treino.",
      "paragraphs": [
        "O efeito epistemológico é grave: o sistema pode parecer “descobrir” regularidades quando, na verdade, está se beneficiando de uma pista ilegítima. Em alguns campos científicos, claims de superioridade desaparecem quando esses vazamentos são removidos.",
        "É por isso que avaliação séria pergunta não apenas “qual score saiu?”, mas “como garantimos ausência de atalhos espúrios, vazamento e reuso indevido de informação?”."
      ],
      "interactive": "avaliacao-cientifica-claims-ia-cenarios",
      "blocks": [
        {
          "type": "definition",
          "title": "Leakage",
          "body": "Entrada indevida de informação que não deveria estar disponível no momento de treino, validação ou decisão."
        },
        {
          "type": "example",
          "title": "Exemplo",
          "body": "Escolher features depois de inspecionar o teste, ou normalizar toda a série temporal usando estatísticas que incluem o futuro, são formas clássicas de leakage."
        }
      ]
    },
    {
      "id": "baselines",
      "eyebrow": "Comparação",
      "title": "Sem baseline forte e ablação clara, o ganho pode ser teatro experimental",
      "lead": "Um resultado impressiona mais quando comparado com baselines relevantes, implementados de forma justa e replicável. Baselines fracos, desatualizados ou mal configurados podem fabricar a sensação de avanço.",
      "paragraphs": [
        "Ablations são igualmente importantes porque mostram quais componentes realmente sustentam o ganho. Sem elas, qualquer combinação complexa pode parecer necessária apenas porque foi apresentada como pacote indivisível.",
        "Em resumo: boa avaliação não premia apenas quem vence; premia quem mostra de forma convincente por que venceu e o que aconteceria sem cada peça relevante do sistema."
      ],
      "visual": "avaliacao-cientifica-claims-ia-benchmark-vs-claim",
      "blocks": [
        {
          "type": "definition",
          "title": "Ablação",
          "body": "Experimento que remove ou altera componentes do sistema para medir o quanto cada um contribui para o resultado."
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Comparar um sistema cuidadosamente afinado com um baseline preguiçosamente configurado e chamar isso de avanço conclusivo."
        }
      ]
    },
    {
      "id": "reporting",
      "eyebrow": "Reprodutibilidade",
      "title": "Prompts, seeds, judges, dados e scripts fazem parte da evidência",
      "lead": "Em pipelines modernos, principalmente com LLMs, a avaliação depende de muitas camadas: prompt de geração, prompt do juiz, temperatura, corpus de recuperação, versões de ferramenta, seeds, filtros e critérios de agregação.",
      "paragraphs": [
        "Se esses artefatos não forem relatados, o score fica difícil de interpretar e mais difícil ainda de reproduzir. Frameworks como HELM, model cards, datasheets, benchmark cards e standards de reporting existem justamente para combater essa opacidade.",
        "Documentar não é burocracia lateral: é parte do próprio conteúdo científico do resultado, porque condiciona o que outro pesquisador consegue verificar ou contestar."
      ],
      "visual": "avaliacao-cientifica-claims-ia-pipeline-eval",
      "blocks": [
        {
          "type": "definition",
          "title": "Comparabilidade",
          "body": "Condição pela qual resultados entre modelos ou estudos podem ser comparados de maneira metodologicamente justa."
        },
        {
          "type": "insight",
          "title": "Score sem artefato é evidência fraca",
          "body": "Quanto mais complexo o pipeline, mais indispensável é relatar os componentes que moldaram o resultado final."
        }
      ]
    },
    {
      "id": "forca-evidencia",
      "eyebrow": "Escala do claim",
      "title": "Quanto maior o claim, maior a exigência sobre a força da evidência",
      "lead": "Há claims modestos e úteis: “neste benchmark, sob este protocolo, este método obteve melhor resultado médio”. Há claims muito mais ambiciosos: “o sistema raciocina”, “supera especialistas”, “está pronto para substituir humanos”.",
      "paragraphs": [
        "Os segundos exigem não só melhores números, mas triangulação metodológica: múltiplos cenários, análise de erro, robustez, comparação com condições reais de uso e cuidado especial com o que foi realmente testado.",
        "Esse escalonamento é uma prática científica básica frequentemente esquecida no debate público sobre IA."
      ],
      "interactive": "avaliacao-cientifica-claims-ia-evidencia",
      "blocks": [
        {
          "type": "definition",
          "title": "Força da evidência",
          "body": "Grau de robustez com que um conjunto de experimentos sustenta uma conclusão interpretativa."
        },
        {
          "type": "example",
          "title": "Exemplo",
          "body": "“Melhora accuracy neste dataset” é um claim menos ambicioso do que “o modelo generaliza para qualquer tarefa similar”."
        }
      ]
    },
    {
      "id": "documentacao",
      "eyebrow": "Infraestrutura epistêmica",
      "title": "Boa documentação reduz interpretações infladas e facilita auditoria",
      "lead": "Model cards ajudam a explicitar uso pretendido, limites e métricas desagregadas. Datasheets esclarecem composição e motivação do dataset. Benchmark cards tornam mais visível o que um benchmark realmente mede e quais riscos de interpretação ele carrega.",
      "paragraphs": [
        "Nenhum desses instrumentos substitui experimento cuidadoso. Mas eles reduzem ambiguidade, facilitam comparação honesta e tornam mais difícil vender como ciência aquilo que foi apenas demo favorável.",
        "Em um campo rápido como IA, a qualidade da documentação é parte da qualidade da ciência, porque protege a comunidade contra memória curta, hype e reinterpretação oportunista de resultados."
      ],
      "visual": "avaliacao-cientifica-claims-ia-reporting",
      "interactive": "avaliacao-cientifica-claims-ia-documentacao",
      "blocks": [
        {
          "type": "example",
          "title": "Exemplo",
          "body": "Se um benchmark mede apenas inglês escrito formal, documentar isso evita que alguém leia o score como evidência de competência universal em linguagem."
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Tratar material suplementar como detalhe opcional, quando ele contém justamente os elementos que tornam o resultado auditável."
        }
      ]
    },
    {
      "id": "resumo-final",
      "eyebrow": "Síntese",
      "title": "Feche a aula lembrando da distância entre score e sentido",
      "lead": "Revise como validade, leakage, baseline e reporting moldam o peso real de um resultado.",
      "paragraphs": [
        "A lição central é que claims fortes sobre IA exigem não apenas bons números, mas desenho experimental rigoroso, documentação suficiente e muita sobriedade interpretativa."
      ],
      "interactive": "summary-cards"
    },
    {
      "id": "quiz-revisao",
      "eyebrow": "Revisão",
      "title": "Quiz sobre avaliação científica de IA",
      "lead": "Teste se você consegue reconhecer sinais de evidência forte e sinais de inflacionamento metodológico.",
      "paragraphs": [
        "As perguntas retomam validade, comparabilidade, leakage, baselines e reporting."
      ],
      "interactive": "quiz"
    },
    {
      "id": "glossario",
      "eyebrow": "Vocabulário",
      "title": "Glossário de avaliação e claims",
      "lead": "Consolide o vocabulário que ajuda a ler papers, leaderboards e relatórios com mais rigor.",
      "paragraphs": [
        "Esses termos são o antídoto mais básico contra confundir benchmark impressionante com ciência conclusiva."
      ],
      "interactive": "glossary"
    }
  ],
  "summaryCards": [
    {
      "title": "Resultado não é claim",
      "body": "O que o experimento mediu pode ser muito menor do que o que o texto afirma."
    },
    {
      "title": "Leakage destrói confiança",
      "body": "Vazamentos e contaminações podem fabricar superioridade onde não há generalização real."
    },
    {
      "title": "Baseline e ablação são essenciais",
      "body": "Sem comparação honesta e decomposição do ganho, avanço técnico pode ser só teatro experimental."
    },
    {
      "title": "Documentação é método",
      "body": "Prompts, datasets, judges, seeds e escopo precisam ser relatados para que o resultado tenha peso científico."
    }
  ],
  "quiz": [
    {
      "id": "q1",
      "prompt": "Qual afirmação é mais metodologicamente cuidadosa?",
      "options": [
        {
          "id": "a",
          "label": "O modelo foi bem em um benchmark, então compreende o domínio em geral."
        },
        {
          "id": "b",
          "label": "O modelo melhorou sob um protocolo específico, e a generalização além dele ainda precisa ser demonstrada."
        },
        {
          "id": "c",
          "label": "Qualquer score acima do SOTA encerra o debate."
        }
      ],
      "correctOptionId": "b",
      "feedback": "A formulação cuidadosa respeita os limites do desenho experimental."
    },
    {
      "id": "q2",
      "prompt": "O que é leakage?",
      "options": [
        {
          "id": "a",
          "label": "Uso indevido de informação que não deveria estar disponível em treino, validação ou decisão."
        },
        {
          "id": "b",
          "label": "Qualquer aumento de parâmetro."
        },
        {
          "id": "c",
          "label": "Apenas erro de visualização em gráfico."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Leakage compromete a validade porque injeta pistas ilegítimas no processo."
    },
    {
      "id": "q3",
      "prompt": "Por que baselines fortes importam?",
      "options": [
        {
          "id": "a",
          "label": "Porque sem comparação honesta é fácil fabricar sensação de avanço técnico."
        },
        {
          "id": "b",
          "label": "Porque qualquer baseline antigo já basta."
        },
        {
          "id": "c",
          "label": "Porque baselines substituem análise de erro."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Baselines relevantes e bem configurados são parte central da interpretação do ganho."
    },
    {
      "id": "q4",
      "prompt": "Para que serve uma ablação?",
      "options": [
        {
          "id": "a",
          "label": "Mostrar quais componentes realmente contribuem para o resultado."
        },
        {
          "id": "b",
          "label": "Ocultar complexidade do sistema."
        },
        {
          "id": "c",
          "label": "Substituir o conjunto de teste."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Ablations ajudam a separar o que é componente essencial do que é enfeite experimental."
    },
    {
      "id": "q5",
      "prompt": "O que validade externa pergunta?",
      "options": [
        {
          "id": "a",
          "label": "Se o resultado se transfere para cenários além do experimento específico."
        },
        {
          "id": "b",
          "label": "Se o arquivo CSV abriu corretamente."
        },
        {
          "id": "c",
          "label": "Se o artigo tem gráficos bonitos."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Validade externa trata do alcance da conclusão para outros contextos."
    },
    {
      "id": "q6",
      "prompt": "Qual é um risco comum em pipelines de avaliação com LLMs?",
      "options": [
        {
          "id": "a",
          "label": "Não relatar prompts, judges, seeds e corpus de recuperação que moldam o score."
        },
        {
          "id": "b",
          "label": "Usar documentação demais."
        },
        {
          "id": "c",
          "label": "Comparar resultados em mais de um cenário."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Sem esses artefatos, comparabilidade e reprodução ficam seriamente prejudicadas."
    },
    {
      "id": "q7",
      "prompt": "Qual claim exige evidência mais forte?",
      "options": [
        {
          "id": "a",
          "label": "“Melhorou F1 neste dataset sob este protocolo.”"
        },
        {
          "id": "b",
          "label": "“O sistema está pronto para substituir especialistas em qualquer contexto.”"
        },
        {
          "id": "c",
          "label": "“Executou um script específico.”"
        }
      ],
      "correctOptionId": "b",
      "feedback": "Quanto maior a generalização ou impacto do claim, maior a exigência sobre a força da evidência."
    },
    {
      "id": "q8",
      "prompt": "Qual é a melhor leitura sobre model cards e datasheets?",
      "options": [
        {
          "id": "a",
          "label": "São parte da infraestrutura epistêmica da avaliação, não apenas anexos cosméticos."
        },
        {
          "id": "b",
          "label": "São irrelevantes se o score for alto."
        },
        {
          "id": "c",
          "label": "Servem apenas para modelos de visão computacional."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Documentação estruturada ajuda a restringir interpretação indevida e a permitir auditoria."
    }
  ],
  "glossary": [
    {
      "term": "Benchmark",
      "definition": "Conjunto padronizado de tarefas e métricas usado para comparar sistemas."
    },
    {
      "term": "Claim científico",
      "definition": "Afirmação interpretativa sobre o que um resultado experimental supostamente demonstra."
    },
    {
      "term": "Validade interna",
      "definition": "Grau em que o resultado pode ser atribuído corretamente ao desenho experimental proposto."
    },
    {
      "term": "Validade externa",
      "definition": "Grau em que a conclusão se transfere para outros cenários ou populações."
    },
    {
      "term": "Leakage",
      "definition": "Vazamento de informação indevida entre treino, validação, teste ou uso."
    },
    {
      "term": "Contaminação",
      "definition": "Presença de exemplos de benchmark, explícitos ou parafraseados, no material usado para treinar o sistema."
    },
    {
      "term": "Baseline",
      "definition": "Método de referência contra o qual um novo sistema é comparado."
    },
    {
      "term": "Ablação",
      "definition": "Experimento que remove ou altera componentes para medir sua contribuição ao resultado."
    },
    {
      "term": "Reprodutibilidade",
      "definition": "Capacidade de outro pesquisador repetir o procedimento e obter resultados compatíveis."
    },
    {
      "term": "Comparabilidade",
      "definition": "Condição em que diferentes resultados podem ser comparados de maneira metodologicamente justa."
    }
  ]
};
