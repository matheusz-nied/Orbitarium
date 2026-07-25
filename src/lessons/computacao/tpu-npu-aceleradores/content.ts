import type { LessonContent } from "../../../types/content";

export const tpuNpuAceleradoresContent: LessonContent = {
  "id": "tpu-npu-aceleradores",
  "title": "TPU, NPU e Aceleradores",
  "subtitle": "Quando hardware especializado vence CPU generalista - e quando o movimento de dados destrói a vantagem prometida.",
  "description": "Uma aula sobre aceleradores para IA, dataflow, tiles, compilação, throughput por watt, operadores suportados e a diferença entre GPU, TPU e NPU sem inventar claims de hardware.",
  "primaryCategoryId": "computacao",
  "secondaryCategoryId": "inteligencia-artificial",
  "level": "Avançado",
  "estimatedTime": "55-65 min",
  "tags": [
    "TPU",
    "NPU",
    "Aceleradores",
    "IA",
    "Dataflow",
    "Quantização"
  ],
  "learningObjectives": [
    "Entender por que aceleradores são otimizados para certos padrões de computação.",
    "Separar compute, movimento de dados e suporte de compilador ao avaliar hardware.",
    "Comparar generalidade de CPU ou GPU com especialização de TPU ou NPU.",
    "Evitar claims simplistas sobre qualquer chip de IA."
  ],
  "prerequisites": [
    "Noção básica de CPU, GPU e operações matriciais ajuda bastante.",
    "Curiosidade sobre inferência e treino de modelos.",
    "Não é preciso conhecer microarquitetura profunda antes."
  ],
  "references": [
    {
      "title": "TPU system architecture",
      "source": "Google Cloud Documentation",
      "url": "https://cloud.google.com/tpu/docs/system-architecture",
      "note": "Material oficial sobre arquitetura de TPUs em datacenter."
    },
    {
      "title": "Hardware Acceleration",
      "source": "MLSys Book",
      "url": "https://mlsysbook.ai/vol1/hw_acceleration/hw_acceleration.html",
      "note": "Livro moderno e confiável sobre aceleradores para ML."
    },
    {
      "title": "NPU devices",
      "source": "Microsoft Learn",
      "url": "https://learn.microsoft.com/en-us/windows/ai/npu-devices/",
      "note": "Panorama confiável sobre NPUs em dispositivos modernos."
    },
    {
      "title": "Core ML",
      "source": "Apple Developer Documentation",
      "url": "https://developer.apple.com/documentation/coreml",
      "note": "Documentação oficial de um stack real que usa aceleração on-device."
    },
    {
      "title": "CUDA C++ Programming Guide",
      "source": "NVIDIA Documentation",
      "url": "https://docs.nvidia.com/cuda/cuda-c-programming-guide/",
      "note": "Base oficial para compreender GPUs como referência de aceleração paralela."
    }
  ],
  "heroVisual": "lesson-hero",
  "openingText": "Dizer que um chip é de IA não explica quase nada. A pergunta relevante é: que operadores ele acelera bem, como move dados entre memórias e qual compilador consegue de fato usar seus blocos especializados? TPU, NPU e outros aceleradores valem ouro quando o workload combina com o contrato do hardware - e podem frustrar quando esse encaixe não existe.",
  "quickFacts": [
    {
      "title": "Unidade crítica",
      "body": "o tile de tensor e o operador que o hardware consegue reaproveitar eficientemente"
    },
    {
      "title": "Trade-off central",
      "body": "generalidade de execução ↔ especialização de operadores e energia"
    },
    {
      "title": "Regra prática",
      "body": "avalie compute, memória, formato numérico e suporte de compilador antes de fazer qualquer claim de desempenho"
    }
  ],
  "sections": [
    {
      "id": "motivacao",
      "eyebrow": "Motivação",
      "title": "Por que TPU, NPU e Aceleradores aparece em sistemas sérios",
      "lead": "Explicar por que hardware especializado pode executar certos workloads de ia com melhor eficiência do que cpus generalistas muda latência, custo, previsibilidade ou segurança. Por isso, o tema aparece cedo em qualquer sistema que sai do protótipo.",
      "visual": "lesson-hero",
      "paragraphs": [
        "TPU, NPU e Aceleradores existe para explicar por que hardware especializado pode executar certos workloads de ia com melhor eficiência do que cpus generalistas. Sem isso, gpu, tpu e npu parecem nomes de marketing indistinguíveis, e decisões de plataforma viram chute.",
        "Um bom modelo intuitivo é pensar no acelerador como um contrato entre operador, compilador, memória on-chip e caminho de i/o. Pense em matmul e inferência quantizada ganhando eficiência quando a pilha inteira foi pensada para esses padrões.",
        "Esse assunto importa porque afeta throughput por watt, latência de inferência e viabilidade de deployment em nuvem ou borda. Quando você o entende, decisões de arquitetura deixam de parecer um conjunto de truques desconexos."
      ],
      "blocks": [
        {
          "type": "insight",
          "title": "Intuição útil",
          "body": "pensar no acelerador como um contrato entre operador, compilador, memória on-chip e caminho de I/O"
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "achar que qualquer workload de IA automaticamente roda melhor em qualquer acelerador anunciado como NPU ou TPU"
        }
      ]
    },
    {
      "id": "modelo-mental",
      "eyebrow": "Modelo mental",
      "title": "A abstração certa para não decorar sem entender",
      "lead": "Boas decisões de engenharia nascem de uma abstração operacional simples: o que está sendo movido, validado, sincronizado ou reaproveitado?",
      "visual": "concept-grid",
      "paragraphs": [
        "Definição operacional: classe de hardware otimizada para operações e fluxos de dados recorrentes em cargas de machine learning.",
        "A unidade crítica para raciocinar sobre custo e comportamento é o tile de tensor e o operador que o hardware consegue reaproveitar eficientemente. É nela que atrasos, contenção ou corrupção costumam aparecer primeiro.",
        "Quando você enxerga a unidade certa, fica mais fácil separar sintoma de causa. Isso evita o atalho mental de achar que achar que qualquer workload de ia automaticamente roda melhor em qualquer acelerador anunciado como npu ou tpu."
      ],
      "blocks": [
        {
          "type": "definition",
          "title": "Definição",
          "body": "classe de hardware otimizada para operações e fluxos de dados recorrentes em cargas de machine learning"
        },
        {
          "type": "example",
          "title": "Exemplo concreto",
          "body": "matmul e inferência quantizada ganhando eficiência quando a pilha inteira foi pensada para esses padrões"
        }
      ]
    },
    {
      "id": "fluxo-essencial",
      "eyebrow": "Fluxo",
      "title": "O caminho que os dados percorrem",
      "lead": "Quase todo gargalo difícil nasce quando esquecemos que há uma sequência de etapas, e que cada uma delas impõe uma política diferente.",
      "visual": "pipeline-diagram",
      "interactive": "pipeline-lab",
      "paragraphs": [
        "Em alto nível, o fluxo é o grafo do modelo é reduzido, operadores são mapeados para unidades compatíveis, dados percorrem memórias locais e resultados retornam ao host ou a outra camada.",
        "Em vez de decorar siglas, vale observar a ordem das decisões: lowering do grafo, tile e escalonamento, reuso em memória local e i/o e sincronização. O desenho muda de tema para tema, mas a disciplina mental é a mesma.",
        "A pergunta importante não é apenas 'qual etapa existe?'. A pergunta melhor é 'onde a decisão errada se propaga e quanto custa corrigi-la depois?'."
      ],
      "blocks": [
        {
          "type": "example",
          "title": "Etapas para observar",
          "body": "Use a interação para percorrer a pipeline e notar onde surgem classificação, mediação, sincronização, persistência ou reaproveitamento.",
          "items": [
            "Lowering do grafo",
            "Tile e escalonamento",
            "Reuso em memória local",
            "I/O e sincronização"
          ]
        },
        {
          "type": "insight",
          "title": "Fluxos distribuem responsabilidade",
          "body": "Uma etapa ruim costuma contaminar as seguintes. Por isso times experientes observam não só o resultado final, mas também o caminho percorrido."
        }
      ]
    },
    {
      "id": "tradeoffs",
      "eyebrow": "Trade-offs",
      "title": "A escolha que nunca é gratuita",
      "lead": "Sistemas bons não maximizam um único número. Eles escolhem conscientemente qual dor reduzir agora e qual custo aceitar depois.",
      "visual": "tradeoff-spectrum",
      "interactive": "tradeoff-lab",
      "paragraphs": [
        "O eixo central desta aula vai de generalidade de execução até especialização de operadores e energia. Quanto mais especializado o hardware, melhor ele pode explorar regularidade e eficiência energética em certos operadores - mas menor tende a ser a flexibilidade para código arbitrário ou operadores fora do caminho feliz.",
        "Empurrar o desenho demais para um extremo tende a simplificar uma parte e complicar outra. O trabalho do arquiteto é tornar essa troca visível, não escondê-la atrás de defaults.",
        "Por isso, a pergunta madura não é 'qual tecnologia vence?'. É 'qual ponto do eixo faz sentido para este perfil de tráfego, risco e equipe?'."
      ],
      "blocks": [
        {
          "type": "insight",
          "title": "Projeto é posicionamento",
          "body": "O eixo 'generalidade de execução ↔ especialização de operadores e energia' existe porque cada ponta otimiza uma propriedade diferente do sistema."
        },
        {
          "type": "mistake",
          "title": "O mito do extremo ideal",
          "body": "Quando alguém trata um extremo como solução universal, geralmente está escondendo custos operacionais, latência, consistência ou carga cognitiva."
        }
      ]
    },
    {
      "id": "falhas-e-armadilhas",
      "eyebrow": "Armadilhas",
      "title": "Onde equipes experientes ainda escorregam",
      "lead": "A maioria dos incidentes não nasce da teoria errada, e sim de suposições implícitas que ninguém modelou até o sistema crescer.",
      "paragraphs": [
        "O erro recorrente é achar que qualquer workload de ia automaticamente roda melhor em qualquer acelerador anunciado como npu ou tpu. Isso costuma soar plausível porque a abstração superficial parece simples demais.",
        "Na prática, o limite aparece quando operadores não suportados, batches pequenos ou movimento de dados dominante anulam o ganho teórico do chip. É nesse ponto que o sistema revela o que realmente estava sendo garantido - ou apenas assumido.",
        "Tratar esses limites como detalhes raros é caro. Tratá-los como parte do desenho inicial economiza incidentes, retrabalho e debates improdutivos depois."
      ],
      "blocks": [
        {
          "type": "mistake",
          "title": "Suposição perigosa",
          "body": "achar que qualquer workload de IA automaticamente roda melhor em qualquer acelerador anunciado como NPU ou TPU"
        },
        {
          "type": "insight",
          "title": "Limites são parte da especificação",
          "body": "operadores não suportados, batches pequenos ou movimento de dados dominante anulam o ganho teórico do chip"
        }
      ]
    },
    {
      "id": "decisoes-de-projeto",
      "eyebrow": "Prática",
      "title": "Como decidir em vez de só repetir padrões",
      "lead": "Padrão bom é padrão contextualizado. Sem cenário, benchmark e política, a mesma técnica vira conselho ruim.",
      "interactive": "scenario-lab",
      "paragraphs": [
        "Uma regra prática desta aula é avalie compute, memória, formato numérico e suporte de compilador antes de fazer qualquer claim de desempenho.",
        "Repare nos cenários propostos: treino em datacenter, inferência on-device e modelo fora do caminho feliz. O mecanismo é o mesmo, mas a decisão muda conforme estado, risco e tipo de carga.",
        "É por isso que bons times documentam intenção, observam métricas e revisam o desenho quando o contexto operacional muda."
      ],
      "blocks": [
        {
          "type": "example",
          "title": "Heurística de decisão",
          "body": "As recomendações abaixo não são receitas eternas; elas são pontos de partida guiados pelo mecanismo que a aula explicou.",
          "items": [
            "Avaliar aceleradores que combinem largura de banda, compilador estável e topologia adequada ao workload.",
            "Priorizar caminhos de baixa potência, formatos quantizados e NPUs integradas ao dispositivo.",
            "Medir fallback, custo de conversão e possível necessidade de reescrever partes do grafo."
          ]
        },
        {
          "type": "definition",
          "title": "Regra prática",
          "body": "avalie compute, memória, formato numérico e suporte de compilador antes de fazer qualquer claim de desempenho"
        }
      ]
    },
    {
      "id": "pontes",
      "eyebrow": "Conexões",
      "title": "Como este fundamento reaparece em outros sistemas",
      "lead": "Uma boa aula de computação não fecha em si mesma. Ela amplia sua capacidade de interpretar bancos, redes, runtimes, browsers e produtos de IA.",
      "visual": "impact-board",
      "paragraphs": [
        "Esta aula fala diretamente de workloads de IA, mas o aprendizado mais importante é combinar forma do trabalho com contrato do hardware.",
        "Em produtos modernos, a mesma lógica reaparece em APIs, jobs assíncronos, pipelines de dados, páginas web, storage, modelos e plataformas internas.",
        "Aprender este tópico dá vocabulário para discutir latência, throughput, integridade, consistência, segurança e custo com mais precisão técnica."
      ],
      "blocks": [
        {
          "type": "insight",
          "title": "Transferência de modelo mental",
          "body": "throughput por watt, latência de inferência e viabilidade de deployment em nuvem ou borda"
        }
      ]
    },
    {
      "id": "quiz-revisao",
      "eyebrow": "Revisão",
      "title": "Quiz de revisão",
      "lead": "Use o quiz para checar se mecanismo, trade-off e armadilhas ficaram conectados como um único raciocínio.",
      "interactive": "quiz",
      "paragraphs": [
        "O objetivo não é decorar frases, e sim verificar se você consegue explicar onde a abstração ajuda, onde ela falha e como decidir melhor em um sistema real."
      ]
    },
    {
      "id": "glossario",
      "eyebrow": "Glossário",
      "title": "Vocabulário para continuar estudando",
      "lead": "Feche a aula consolidando termos que aparecem em documentação, incidentes, artigos técnicos e discussões de arquitetura.",
      "interactive": "glossary",
      "paragraphs": [
        "Dominar esse vocabulário acelera leitura de documentação oficial, revisão de incidentes e conversas com outras camadas do stack."
      ]
    }
  ],
  "summaryCards": [
    {
      "title": "Problema que resolve",
      "body": "explicar por que hardware especializado pode executar certos workloads de IA com melhor eficiência do que CPUs generalistas"
    },
    {
      "title": "Modelo mental",
      "body": "pensar no acelerador como um contrato entre operador, compilador, memória on-chip e caminho de I/O"
    },
    {
      "title": "Erro comum",
      "body": "achar que qualquer workload de IA automaticamente roda melhor em qualquer acelerador anunciado como NPU ou TPU"
    },
    {
      "title": "Onde reaparece",
      "body": "Esta aula fala diretamente de workloads de IA, mas o aprendizado mais importante é combinar forma do trabalho com contrato do hardware"
    }
  ],
  "quiz": [
    {
      "id": "q1",
      "prompt": "Qual é a função principal de TPU, NPU e Aceleradores em um sistema?",
      "options": [
        {
          "id": "a",
          "label": "explicar por que hardware especializado pode executar certos workloads de IA com melhor eficiência do que CPUs generalistas"
        },
        {
          "id": "b",
          "label": "Substituir todas as outras camadas do stack por uma única técnica."
        },
        {
          "id": "c",
          "label": "Eliminar por definição qualquer latência, falha ou custo."
        }
      ],
      "correctOptionId": "a",
      "feedback": "A ideia central da aula é explicar por que hardware especializado pode executar certos workloads de ia com melhor eficiência do que cpus generalistas. O tema melhora o projeto do sistema, mas não apaga restrições físicas nem substitui todas as outras camadas."
    },
    {
      "id": "q2",
      "prompt": "Qual modelo mental ajuda mais a entender tpu, npu e aceleradores?",
      "options": [
        {
          "id": "a",
          "label": "pensar no acelerador como um contrato entre operador, compilador, memória on-chip e caminho de I/O"
        },
        {
          "id": "b",
          "label": "Pensar apenas na interface visual, ignorando o mecanismo interno."
        },
        {
          "id": "c",
          "label": "Assumir que tpu, npu e aceleradores resolve sozinho qualquer gargalo restante."
        }
      ],
      "correctOptionId": "a",
      "feedback": "O melhor atalho mental aqui é: pensar no acelerador como um contrato entre operador, compilador, memória on-chip e caminho de i/o. Esse modelo ajuda a prever custo, limite e comportamento operacional."
    },
    {
      "id": "q3",
      "prompt": "No fluxo estudado, qual etapa aparece cedo e condiciona decisões posteriores?",
      "options": [
        {
          "id": "a",
          "label": "Lowering do grafo"
        },
        {
          "id": "b",
          "label": "I/O e sincronização"
        },
        {
          "id": "c",
          "label": "Uma etapa mágica que elimina a necessidade de observar o sistema."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Lowering do grafo acontece cedo e molda o resto do caminho. Erros de classificação ou roteamento se propagam com facilidade."
    },
    {
      "id": "q4",
      "prompt": "Qual afirmação descreve melhor o trade-off central da aula?",
      "options": [
        {
          "id": "a",
          "label": "O objetivo é equilibrar generalidade de execução e especialização de operadores e energia, não maximizar um extremo automaticamente."
        },
        {
          "id": "b",
          "label": "Sempre vale empurrar tudo para especialização de operadores e energia."
        },
        {
          "id": "c",
          "label": "Sempre vale empurrar tudo para generalidade de execução."
        }
      ],
      "correctOptionId": "a",
      "feedback": "O eixo 'generalidade de execução ↔ especialização de operadores e energia' existe porque cada extremo resolve uma dor e cria outra. Projeto maduro explicita essa troca."
    },
    {
      "id": "q5",
      "prompt": "Qual das opções abaixo representa um erro comum discutido na aula?",
      "options": [
        {
          "id": "a",
          "label": "achar que qualquer workload de IA automaticamente roda melhor em qualquer acelerador anunciado como NPU ou TPU"
        },
        {
          "id": "b",
          "label": "avalie compute, memória, formato numérico e suporte de compilador antes de fazer qualquer claim de desempenho"
        },
        {
          "id": "c",
          "label": "Medir hipóteses antes de alterar um sistema que já está em produção."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Este é o atalho mental perigoso do tema: achar que qualquer workload de ia automaticamente roda melhor em qualquer acelerador anunciado como npu ou tpu. A aula insiste em tornar essas suposições explícitas."
    },
    {
      "id": "q6",
      "prompt": "Pensando em cenários reais, qual decisão inicial está mais alinhada com a aula?",
      "options": [
        {
          "id": "a",
          "label": "Avaliar aceleradores que combinem largura de banda, compilador estável e topologia adequada ao workload."
        },
        {
          "id": "b",
          "label": "Priorizar caminhos de baixa potência, formatos quantizados e NPUs integradas ao dispositivo."
        },
        {
          "id": "c",
          "label": "Medir fallback, custo de conversão e possível necessidade de reescrever partes do grafo."
        }
      ],
      "correctOptionId": "a",
      "feedback": "No primeiro cenário, a recomendação é avaliar aceleradores que combinem largura de banda, compilador estável e topologia adequada ao workload.. A solução depende do mecanismo certo para o caso, não de um padrão aplicado sem contexto."
    },
    {
      "id": "q7",
      "prompt": "Por que este tema também importa para sistemas de IA e produtos modernos?",
      "options": [
        {
          "id": "a",
          "label": "Esta aula fala diretamente de workloads de IA, mas o aprendizado mais importante é combinar forma do trabalho com contrato do hardware"
        },
        {
          "id": "b",
          "label": "Porque produtos de IA não dependem de infraestrutura, segurança ou dados."
        },
        {
          "id": "c",
          "label": "Porque modelos grandes fazem arquitetura e operação deixarem de importar."
        }
      ],
      "correctOptionId": "a",
      "feedback": "A ponte da aula é direta: esta aula fala diretamente de workloads de ia, mas o aprendizado mais importante é combinar forma do trabalho com contrato do hardware. Os mesmos fundamentos reaparecem em serving, dados, rede, storage e operação."
    },
    {
      "id": "q8",
      "prompt": "O que costuma quebrar ou exigir cuidado adicional neste tema?",
      "options": [
        {
          "id": "a",
          "label": "operadores não suportados, batches pequenos ou movimento de dados dominante anulam o ganho teórico do chip"
        },
        {
          "id": "b",
          "label": "Somente o nome das variáveis ou detalhes cosméticos da interface."
        },
        {
          "id": "c",
          "label": "Nada relevante: testes básicos já eliminam esse tipo de risco completamente."
        }
      ],
      "correctOptionId": "a",
      "feedback": "O limite importante aqui é concreto: operadores não suportados, batches pequenos ou movimento de dados dominante anulam o ganho teórico do chip. Em sistemas reais, garantias dependem de política, falha, carga e integração entre camadas."
    }
  ],
  "glossary": [
    {
      "term": "Acelerador",
      "definition": "Hardware especializado para executar certas classes de operação com mais eficiência."
    },
    {
      "term": "TPU",
      "definition": "Família de aceleradores voltados a workloads de tensor, popularizada pelo ecossistema Google."
    },
    {
      "term": "NPU",
      "definition": "Unidade especializada em cargas neurais, comum em SoCs e dispositivos de borda."
    },
    {
      "term": "Tile",
      "definition": "Bloco de dados usado como unidade prática de mapeamento para computação e memória."
    },
    {
      "term": "Dataflow",
      "definition": "Forma como dados se movem e são reaproveitados dentro do hardware."
    },
    {
      "term": "Operator lowering",
      "definition": "Tradução de operadores de alto nível para primitivas aceitas pelo backend."
    },
    {
      "term": "Quantização",
      "definition": "Representação de números em menor precisão para reduzir custo e energia."
    },
    {
      "term": "On-chip memory",
      "definition": "Memória muito próxima das unidades de compute, usada para reuso rápido."
    },
    {
      "term": "Throughput por watt",
      "definition": "Quantidade de trabalho útil entregue por unidade de energia consumida."
    },
    {
      "term": "Fallback",
      "definition": "Execução desviada para outra unidade ou backend quando o acelerador não suporta bem a operação."
    }
  ]
} satisfies LessonContent;
