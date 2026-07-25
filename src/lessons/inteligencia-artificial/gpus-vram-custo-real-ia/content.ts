import type { LessonContent } from "../../../types/content";

export const gpusVramCustoRealIaContent: LessonContent = {
  "id": "gpus-vram-custo-real-ia",
  "title": "GPUs, VRAM e o Custo Real da IA",
  "subtitle": "Rodar IA em produção custa mais do que comprar FLOPs: memória, ocupação, janelas de contexto, ociosidade e modelo de contratação pesam tanto quanto a placa escolhida.",
  "description": "Uma aula intermediária sobre o que consome VRAM, como pesos, ativações e KV cache pressionam GPUs, por que utilização importa para custo real e como preços de nuvem, ociosidade e arquitetura mudam a conta operacional.",
  "primaryCategoryId": "inteligencia-artificial",
  "secondaryCategoryId": "engenharia",
  "level": "Intermediário",
  "estimatedTime": "40-55 min",
  "tags": [
    "GPU",
    "VRAM",
    "Custo",
    "Infraestrutura",
    "Inferência",
    "KV Cache",
    "Cloud"
  ],
  "learningObjectives": [
    "Entender quais componentes de um sistema de IA ocupam VRAM além dos pesos do modelo.",
    "Diferenciar custo de provisionamento de custo por trabalho útil entregue.",
    "Relacionar batch, contexto, concorrência e KV cache ao consumo de memória.",
    "Explicar por que utilização baixa torna GPUs caras mesmo quando o preço nominal parece aceitável.",
    "Comparar trade-offs entre uma GPU maior, múltiplas GPUs, particionamento e políticas de fila.",
    "Discutir custos de nuvem com cautela, usando fontes oficiais e sem inventar preços estáticos."
  ],
  "prerequisites": [
    "Noção de deployment de modelos em GPU.",
    "Entender os conceitos básicos de batch e inferência.",
    "Familiaridade geral com infraestrutura em nuvem ajuda, mas não é obrigatória."
  ],
  "references": [
    {
      "title": "How TensorRT Works",
      "source": "NVIDIA TensorRT",
      "url": "https://docs.nvidia.com/deeplearning/tensorrt/latest/architecture/how-trt-works.html",
      "note": "Explica como memória de dispositivo é usada durante build e execução."
    },
    {
      "title": "Best Practices",
      "source": "NVIDIA TensorRT",
      "url": "https://docs.nvidia.com/deeplearning/tensorrt/10.15.1/performance/best-practices.html",
      "note": "Traz recomendações oficiais sobre profiling, memória e transferência host-device."
    },
    {
      "title": "Amazon EC2 Capacity Blocks for ML Pricing",
      "source": "AWS",
      "url": "https://aws.amazon.com/ec2/capacityblocks/pricing/",
      "note": "Página oficial com informações de reserva e precificação para capacidade de aceleradores."
    },
    {
      "title": "VM instance pricing",
      "source": "Google Cloud",
      "url": "https://cloud.google.com/products/compute/pricing",
      "note": "Página oficial de preços e modalidades de cobrança de VMs e aceleradores."
    },
    {
      "title": "Pricing - Azure Machine Learning",
      "source": "Microsoft Azure",
      "url": "https://azure.microsoft.com/en-ca/pricing/details/machine-learning/",
      "note": "Página oficial com opções de cobrança e instâncias, incluindo perfis com GPU."
    },
    {
      "title": "NVIDIA Multi-Instance GPU User Guide",
      "source": "NVIDIA",
      "url": "https://docs.nvidia.com/datacenter/tesla/mig-user-guide/",
      "note": "Guia oficial de particionamento de GPUs compatíveis via MIG."
    }
  ],
  "heroVisual": "hero",
  "openingText": "Quando alguém pergunta 'quanto custa rodar esse modelo?', a resposta intuitiva costuma ser o preço da GPU por hora. Mas a conta real quase nunca mora aí sozinha. Dois times podem pagar pela mesma placa e obter economias totalmente diferentes: um mantém a GPU ocupada com tráfego previsível; o outro sustenta muita ociosidade, faz transferências ruins entre CPU e GPU e superdimensiona contexto para pouca demanda. O custo real da IA está no encontro entre hardware, perfil de tráfego e arquitetura do serving.",
  "quickFacts": [
    {
      "title": "Pesos não são tudo",
      "body": "VRAM é consumida também por ativações, buffers temporários, KV cache e contextos do runtime."
    },
    {
      "title": "GPU ociosa continua cara",
      "body": "Uma placa subutilizada pode parecer potente, mas entrega custo ruim por requisição ou por token útil."
    },
    {
      "title": "Preço oficial muda",
      "body": "Clouds ajustam preços, regiões e descontos; o critério robusto é comparar modelos de cobrança e não decorar números estáticos."
    }
  ],
  "sections": [
    {
      "id": "preco-vs-custo",
      "eyebrow": "Motivação",
      "title": "Preço da GPU e custo da IA não são sinônimos",
      "lead": "Custo real aparece quando você divide gasto por trabalho útil entregue com estabilidade.",
      "paragraphs": [
        "Duas equipes podem alugar a mesma GPU e ter resultados econômicos opostos. Uma enche o hardware com tráfego previsível e lotes saudáveis; a outra o mantém metade do tempo esperando requisição. O preço é igual, o custo por resposta não.",
        "Essa diferença explica por que a pergunta certa não é apenas 'quanto custa por hora?', mas 'o que consigo servir por hora dentro do meu SLO?'.",
        "Em IA aplicada, eficiência econômica nasce da combinação entre infraestrutura, scheduler e perfil de uso."
      ],
      "visual": "hero",
      "blocks": [
        {
          "type": "definition",
          "title": "Custo por trabalho útil",
          "body": "Maneira de avaliar infraestrutura dividindo gasto pelo volume útil realmente entregue, como requisições ou tokens."
        },
        {
          "type": "insight",
          "title": "Ociosidade corrói margem",
          "body": "GPU parada continua sendo despesa provisionada, mesmo que o modelo seja excelente."
        }
      ]
    },
    {
      "id": "o-que-ocupa-vram",
      "eyebrow": "Memória",
      "title": "VRAM é um orçamento disputado por vários moradores",
      "lead": "Pesos são importantes, mas não moram sozinhos nessa casa.",
      "paragraphs": [
        "Além dos pesos do modelo, a GPU precisa acomodar ativações intermediárias, KV cache em modelos autoregressivos, buffers temporários, contexto do runtime e, em alguns casos, espaço de workspace para táticas específicas.",
        "Isso significa que 'o checkpoint cabe' não basta. Um modelo pode caber em repouso e falhar sob batch maior, contexto longo ou múltiplas sessões simultâneas.",
        "Pensar VRAM como orçamento dinâmico evita a armadilha de comprar uma placa olhando só o tamanho do arquivo do modelo."
      ],
      "visual": "concept",
      "interactive": "vram-budget-lab",
      "blocks": [
        {
          "type": "definition",
          "title": "KV cache",
          "body": "Estrutura de memória usada para evitar recomputar atenção a cada novo token."
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Confundir tamanho do checkpoint com memória total exigida durante serving real."
        }
      ]
    },
    {
      "id": "pesos-ativacoes-cache",
      "eyebrow": "Anatomia",
      "title": "Pesos, ativações e cache crescem por lógicas diferentes",
      "lead": "Entender essa anatomia ajuda a escolher onde otimizar.",
      "paragraphs": [
        "Pesos refletem a capacidade estrutural do modelo. Ativações sobem e descem com batch, arquitetura e fase da inferência. KV cache cresce com contexto, número de sessões e comprimento da geração.",
        "Por isso nem todo problema de VRAM se resolve do mesmo jeito. Quantizar pesos ajuda em um eixo; reduzir contexto ou concorrência ataca outro; mudar estratégia de batching atinge um terceiro.",
        "Boa engenharia separa os componentes antes de decidir a intervenção."
      ],
      "visual": "comparison",
      "blocks": [
        {
          "type": "example",
          "title": "Leitura prática",
          "body": "Um LLM pode caber em memória com batch 1 e falhar rapidamente quando sessões longas acumulam KV cache."
        },
        {
          "type": "insight",
          "title": "Memória é comportamento",
          "body": "O padrão de uso do produto determina quanto cada componente pesa no orçamento final."
        }
      ]
    },
    {
      "id": "utilizacao-e-economia",
      "eyebrow": "Operação",
      "title": "A GPU mais barata por hora pode ser a mais cara por resposta",
      "lead": "Utilização baixa transforma qualquer placa em custo inflado.",
      "paragraphs": [
        "Se o serviço tem tráfego irregular, pouca fila útil e muito tempo ocioso, a conta por requisição dispara. Isso acontece porque o provedor cobra capacidade provisionada, não intenção de uso.",
        "Melhorar utilização pode envolver batching, roteamento por classe de requisição, consolidação de workloads ou particionamento de recursos. Nem sempre envolve trocar de hardware.",
        "A pergunta econômica relevante é: quanto trabalho útil eu extraio desta GPU sem violar meu SLO?"
      ],
      "visual": "pipeline",
      "interactive": "throughput-vs-cost-lab",
      "blocks": [
        {
          "type": "definition",
          "title": "Utilização",
          "body": "Proporção entre tempo provisionado e tempo gasto com trabalho útil relevante."
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Escolher infraestrutura pelo preço nominal da hora sem medir o volume útil gerado por essa hora."
        }
      ]
    },
    {
      "id": "transferencias-e-workspace",
      "eyebrow": "Baixo nível",
      "title": "Nem toda latência em GPU é cálculo puro",
      "lead": "Cópias CPU↔GPU, alocação e workspace também entram na conta de desempenho.",
      "paragraphs": [
        "Em sistemas discretos, copiar dados do host para a GPU e trazer respostas de volta pode se tornar parte visível da latência, especialmente quando os lotes são pequenos ou a orquestração é ruim.",
        "Runtimes como TensorRT também usam memória temporária para explorar táticas de execução. Isso cria mais uma dimensão de trade-off entre performance, footprint e concorrência.",
        "Ignorar essas camadas leva a diagnósticos rasos, como culpar o modelo quando o gargalo real está no encanamento ao redor dele."
      ],
      "visual": "comparison",
      "blocks": [
        {
          "type": "definition",
          "title": "Workspace",
          "body": "Memória temporária que certas implementações usam para executar mais rápido."
        },
        {
          "type": "insight",
          "title": "Encanamento importa",
          "body": "Uma pilha mal configurada pode desperdiçar parte do ganho teórico da melhor GPU."
        }
      ]
    },
    {
      "id": "contratos-de-cloud",
      "eyebrow": "Nuvem",
      "title": "On-demand, reserva, spot e regionalidade mudam o custo de verdade",
      "lead": "A mesma família de GPU pode ter contas bem diferentes dependendo do modo de contratação e da disponibilidade.",
      "paragraphs": [
        "Provedores oferecem preços sob demanda, reservas, planos de economia, capacidade antecipada e modalidades preemptíveis. A escolha correta depende de previsibilidade de tráfego, tolerância a interrupção e disciplina operacional.",
        "Por isso é mais seguro ensinar padrões do que decorar números. Preços variam por região, geração de hardware, duração do compromisso e momento do mercado.",
        "O que não varia é a lógica: estabilidade e previsibilidade compram desconto; elasticidade pura costuma custar mais."
      ],
      "visual": "tradeoff",
      "blocks": [
        {
          "type": "insight",
          "title": "Preço é contrato",
          "body": "O mesmo hardware muda de custo conforme compromisso, elasticidade e risco operacional aceito pelo time."
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Usar um número visto em uma região ou data como se fosse verdade universal e permanente."
        }
      ]
    },
    {
      "id": "particionamento-e-topologia",
      "eyebrow": "Arquitetura",
      "title": "Uma GPU grande, várias pequenas ou partições internas?",
      "lead": "A topologia ideal depende de isolamento, concorrência e elasticidade desejada.",
      "paragraphs": [
        "Alguns workloads se beneficiam de uma GPU maior para manter contextos extensos ou lotes maiores. Outros ganham ao separar serviços, evitar contaminação entre filas e usar partições de hardware como MIG quando disponível.",
        "Mais GPUs também significam mais complexidade de orquestração, sincronização e custo fixo agregado. Menos GPUs maiores concentram risco e reduzem flexibilidade.",
        "Não existe topologia universalmente melhor; existe a que conversa melhor com o tráfego e com o orçamento do produto."
      ],
      "visual": "checklist",
      "blocks": [
        {
          "type": "example",
          "title": "Critério de escolha",
          "body": "Sistemas multi-tenant ou com workloads muito diferentes podem ganhar bastante com isolamento maior entre filas."
        },
        {
          "type": "definition",
          "title": "MIG",
          "body": "Mecanismo da NVIDIA para criar partições menores e isoladas em GPUs compatíveis."
        }
      ]
    },
    {
      "id": "cenarios-deploy",
      "eyebrow": "Decisão",
      "title": "Infraestrutura boa é a que fecha a conta técnica e econômica ao mesmo tempo",
      "lead": "Escolher GPU sem olhar o perfil de uso produz desperdício ou instabilidade.",
      "paragraphs": [
        "Se o produto vive de sessões curtas e muitas esperas entre picos, talvez o maior inimigo seja a ociosidade. Se lida com contexto longo e concorrência constante, o orçamento de VRAM pode dominar. Se o tráfego é previsível, reservas podem compensar. Se é volátil e tolera interrupção, modalidades mais baratas podem entrar no jogo.",
        "O importante é testar arquitetura, não só placa. Muitas decisões econômicas reais surgem do scheduler, do batching e da forma como o time administra capacidade.",
        "Em outras palavras: custo de IA é engenharia de sistemas com planilha aberta do lado."
      ],
      "visual": "tradeoff",
      "interactive": "deployment-strategy-scenarios",
      "blocks": [
        {
          "type": "insight",
          "title": "Sem tráfego, não há escolha correta",
          "body": "A melhor GPU para um time depende menos do marketing da placa e mais do padrão de uso que ela vai sustentar."
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Comprar headroom infinito para se sentir seguro e descobrir depois que o custo por requisição ficou insustentável."
        }
      ]
    },
    {
      "id": "quiz-revisao",
      "eyebrow": "Revisão",
      "title": "Quiz de revisão",
      "lead": "Use as perguntas para verificar se memória, utilização, contratos e topologia ficaram conectados.",
      "paragraphs": [
        "A meta é sair capaz de discutir custo de IA sem cair na simplificação 'preço por hora resolve tudo'."
      ],
      "interactive": "quiz"
    },
    {
      "id": "glossario",
      "eyebrow": "Glossário",
      "title": "Glossário essencial",
      "lead": "Feche a aula consolidando o vocabulário de GPU, VRAM e economia operacional.",
      "paragraphs": [
        "Esses termos aparecem em documentações de vendors, clouds e post-mortems de serving."
      ],
      "interactive": "glossary"
    }
  ],
  "summaryCards": [
    {
      "title": "VRAM é orçamento vivo",
      "body": "Pesos, lotes, contexto e cache disputam o mesmo espaço finito."
    },
    {
      "title": "Custo depende de utilização",
      "body": "Provisionar capacidade sem ocupação suficiente corrói eficiência econômica."
    },
    {
      "title": "Mais GPU nem sempre resolve",
      "body": "Às vezes o gargalo está em scheduler, batching, rede ou tráfego mal classificado."
    },
    {
      "title": "Arquitetura e contrato importam",
      "body": "Spot, reservado, prioridade e particionamento mudam a conta operacional."
    }
  ],
  "quiz": [
    {
      "id": "q1",
      "prompt": "O que costuma disputar VRAM com os pesos de um LLM em produção?",
      "options": [
        {
          "id": "a",
          "label": "KV cache, buffers temporários e outros contextos de execução."
        },
        {
          "id": "b",
          "label": "Apenas o tokenizer."
        },
        {
          "id": "c",
          "label": "Somente logs de aplicação no disco."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Pesos são só uma parte do orçamento de memória da GPU; serving real usa mais componentes."
    },
    {
      "id": "q2",
      "prompt": "Por que preço por hora da GPU não basta para medir custo real?",
      "options": [
        {
          "id": "a",
          "label": "Porque utilização, ociosidade e arquitetura do serving mudam o custo por trabalho útil."
        },
        {
          "id": "b",
          "label": "Porque GPUs não têm memória própria."
        },
        {
          "id": "c",
          "label": "Porque preços de cloud nunca mudam."
        }
      ],
      "correctOptionId": "a",
      "feedback": "O mesmo hardware pode gerar contas muito diferentes dependendo do quanto produz de fato."
    },
    {
      "id": "q3",
      "prompt": "Qual fator costuma crescer com contexto longo em LLMs?",
      "options": [
        {
          "id": "a",
          "label": "Pressão do KV cache."
        },
        {
          "id": "b",
          "label": "Velocidade da rede local por definição."
        },
        {
          "id": "c",
          "label": "Tamanho do tokenizer."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Contexto e geração prolongada pressionam memória de cache, não apenas o checkpoint."
    },
    {
      "id": "q4",
      "prompt": "Quando uma GPU cara pode ser um bom negócio?",
      "options": [
        {
          "id": "a",
          "label": "Quando sua utilização e seu throughput útil compensam o preço maior."
        },
        {
          "id": "b",
          "label": "Sempre, independentemente do tráfego."
        },
        {
          "id": "c",
          "label": "Somente se rodar com batch 1."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Custo eficiente depende de produtividade operacional, não só do preço nominal."
    },
    {
      "id": "q5",
      "prompt": "Qual é um risco de provisionar zero headroom de VRAM?",
      "options": [
        {
          "id": "a",
          "label": "Pequenas variações de batch, contexto ou runtime podem causar falha ou instabilidade."
        },
        {
          "id": "b",
          "label": "A GPU passa a usar menos energia por definição."
        },
        {
          "id": "c",
          "label": "A latência deixa de importar."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Produção precisa de margem para absorver variação real do tráfego."
    },
    {
      "id": "q6",
      "prompt": "O que MIG tenta oferecer em GPUs compatíveis?",
      "options": [
        {
          "id": "a",
          "label": "Particionamento de hardware para isolar e dividir capacidade."
        },
        {
          "id": "b",
          "label": "Quantização automática dos pesos."
        },
        {
          "id": "c",
          "label": "Substituição do runtime de inferência."
        }
      ],
      "correctOptionId": "a",
      "feedback": "MIG cria instâncias menores e isoladas em uma GPU física compatível."
    },
    {
      "id": "q7",
      "prompt": "Por que ociosidade é tão importante na conta?",
      "options": [
        {
          "id": "a",
          "label": "Porque a GPU provisionada continua custando mesmo quando entrega pouco trabalho útil."
        },
        {
          "id": "b",
          "label": "Porque elimina a necessidade de monitoramento."
        },
        {
          "id": "c",
          "label": "Porque reduz automaticamente o custo por token."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Capacidade parada pode ser o maior vilão econômico em times pequenos e tráfego irregular."
    },
    {
      "id": "q8",
      "prompt": "Qual avaliação é mais madura para escolher infraestrutura?",
      "options": [
        {
          "id": "a",
          "label": "Comparar memória, throughput, risco operacional e modelo de cobrança para o seu tráfego."
        },
        {
          "id": "b",
          "label": "Escolher a GPU com mais VRAM sem medir nada."
        },
        {
          "id": "c",
          "label": "Fixar um preço por hora e ignorar o resto do sistema."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Escolher GPU é decisão de sistema e finanças operacionais ao mesmo tempo."
    }
  ],
  "glossary": [
    {
      "term": "VRAM",
      "definition": "Memória diretamente acessível pela GPU, usada para pesos, ativações, cache e buffers de execução."
    },
    {
      "term": "KV cache",
      "definition": "Memória usada para armazenar chaves e valores da atenção durante geração autoregressiva."
    },
    {
      "term": "Workspace",
      "definition": "Memória temporária usada por algumas implementações e táticas de execução do runtime."
    },
    {
      "term": "Pinned memory",
      "definition": "Memória de host fixada que pode melhorar cópias entre CPU e GPU em certos cenários."
    },
    {
      "term": "Utilização",
      "definition": "Grau em que a GPU está realizando trabalho útil em relação ao tempo provisionado."
    },
    {
      "term": "Headroom",
      "definition": "Margem operacional de memória ou capacidade deixada para absorver variações de carga."
    },
    {
      "term": "Spot / preemptible",
      "definition": "Modalidade de cobrança mais barata, porém sujeita a interrupção pelo provedor."
    },
    {
      "term": "Capacity reservation",
      "definition": "Reserva explícita de capacidade para garantir disponibilidade futura de aceleradores."
    },
    {
      "term": "MIG",
      "definition": "Tecnologia da NVIDIA para particionar certas GPUs em instâncias menores e isoladas."
    },
    {
      "term": "Custo por trabalho útil",
      "definition": "Forma de pensar custo dividindo gasto por requisição, token ou lote realmente entregue."
    }
  ]
};
