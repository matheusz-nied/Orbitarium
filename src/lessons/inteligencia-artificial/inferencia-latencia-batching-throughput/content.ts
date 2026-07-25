import type { LessonContent } from "../../../types/content";

export const inferenciaLatenciaBatchingThroughputContent: LessonContent = {
  "id": "inferencia-latencia-batching-throughput",
  "title": "Inferência: Latência, Batching e Throughput",
  "subtitle": "Servir modelos não é só rodar forward: é gerenciar fila, prefill, decode, concorrência e escolhas que mudam a experiência do usuário.",
  "description": "Uma aula intermediária sobre latência ponta a ponta, throughput, batching estático, dinâmico e contínuo, diferença entre prefill e decode em LLMs e como projetar serving sob metas reais de produto.",
  "primaryCategoryId": "inteligencia-artificial",
  "secondaryCategoryId": "engenharia",
  "level": "Intermediário",
  "estimatedTime": "40-55 min",
  "tags": [
    "Inferência",
    "Latência",
    "Throughput",
    "Batching",
    "Serving",
    "LLM",
    "Triton"
  ],
  "learningObjectives": [
    "Distinguir latência percebida pelo usuário de throughput agregado do sistema.",
    "Entender como filas, janelas de batching e concorrência alteram p50 e p95.",
    "Explicar a diferença entre prefill e decode em LLMs.",
    "Comparar batching estático, dinâmico e contínuo.",
    "Reconhecer quando aumentar lote melhora custo total e quando piora a experiência.",
    "Projetar medições coerentes com SLOs e comportamento real de tráfego."
  ],
  "prerequisites": [
    "Noção de inferência em modelos neurais.",
    "Entender o básico de APIs ou serviços em produção.",
    "Familiaridade conceitual com geração token a token em LLMs ajuda, mas não é obrigatória."
  ],
  "references": [
    {
      "title": "Batchers",
      "source": "NVIDIA Triton Inference Server",
      "url": "https://docs.nvidia.com/deeplearning/triton-inference-server/user-guide/docs/user_guide/batcher.html",
      "note": "Documentação oficial sobre dynamic batching e inflight/continuous batching."
    },
    {
      "title": "Welcome to vLLM",
      "source": "vLLM Documentation",
      "url": "https://docs.vllm.ai/",
      "note": "Resumo oficial de PagedAttention, continuous batching e serving de LLMs."
    },
    {
      "title": "Best Practices",
      "source": "NVIDIA TensorRT",
      "url": "https://docs.nvidia.com/deeplearning/tensorrt/10.15.1/performance/best-practices.html",
      "note": "Guia oficial de benchmark, profiling e otimização de inferência."
    },
    {
      "title": "How TensorRT Works",
      "source": "NVIDIA TensorRT",
      "url": "https://docs.nvidia.com/deeplearning/tensorrt/latest/architecture/how-trt-works.html",
      "note": "Explica memória, contexto de execução e comportamento do runtime."
    },
    {
      "title": "Productionization",
      "source": "Google for Developers",
      "url": "https://developers.google.com/machine-learning/managing-ml-projects/production",
      "note": "Boas práticas de observabilidade e operação em produção."
    },
    {
      "title": "FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness",
      "source": "Dao et al., arXiv",
      "url": "https://arxiv.org/abs/2205.14135",
      "note": "Referência importante para entender otimização de atenção em serving moderno."
    }
  ],
  "heroVisual": "hero",
  "openingText": "Quem usa um modelo em produto quase nunca pergunta quantos parâmetros ele tem. A pergunta real é: quanto demora para responder, quantas requisições por segundo ele aguenta e como essa conta muda quando o tráfego fica irregular. Essas três perguntas parecem próximas, mas puxam o sistema em direções diferentes. Latência baixa pede resposta imediata; throughput alto pede consolidar trabalho; batching pede esperar um pouco para ganhar muito. Servir bem é administrar essa tensão sem mentir para as métricas nem para o usuário.",
  "quickFacts": [
    {
      "title": "p50 não conta a história toda",
      "body": "Sistemas podem parecer rápidos na média e ainda assim decepcionar nos percentis altos, onde o usuário sente engasgos."
    },
    {
      "title": "LLM tem duas fases",
      "body": "Prefill processa o prompt inicial; decode gera tokens iterativamente. Elas escalam de modos diferentes."
    },
    {
      "title": "Batching não é grátis",
      "body": "Esperar por mais requisições melhora utilização, mas adiciona fila e pode estourar o orçamento de latência."
    }
  ],
  "sections": [
    {
      "id": "produto-e-sistema",
      "eyebrow": "Motivação",
      "title": "Latência, batching e throughput são objetivos parentes, não gêmeos",
      "lead": "Melhorar um quase sempre pressiona os outros dois.",
      "paragraphs": [
        "Se você responde imediatamente a cada requisição, minimiza fila, mas talvez desperdice a GPU. Se espera para formar lotes maiores, melhora utilização, mas o usuário sente atraso extra. Throughput, por sua vez, cresce quando o sistema trabalha cheio, não necessariamente quando cada indivíduo recebe resposta mais cedo.",
        "Essas tensões explicam por que serving não é apenas escolher uma GPU maior. É decidir como o sistema deve se comportar quando a carga está leve, normal ou congestionada.",
        "A boa engenharia começa ao admitir que não existe um único número mágico. Existem metas de produto, limites de infraestrutura e compromissos explícitos."
      ],
      "visual": "hero",
      "blocks": [
        {
          "type": "definition",
          "title": "Latência vs. throughput",
          "body": "Latência mede tempo por requisição; throughput mede volume de trabalho agregado por tempo."
        },
        {
          "type": "insight",
          "title": "Fila é política",
          "body": "Quase toda configuração de batching escolhe conscientemente quanto atraso aceitar agora para ganhar eficiência logo depois."
        }
      ]
    },
    {
      "id": "latencia-ponta-a-ponta",
      "eyebrow": "Métrica",
      "title": "Latência real é a soma de várias pequenas esperas",
      "lead": "CPU, serialização, fila, cópia, prefill, decode e pós-processamento aparecem no cronômetro do usuário.",
      "paragraphs": [
        "Em produção, a latência não pertence só ao modelo. Parsing do pedido, validação, roteamento, fila do scheduler, cópias host-device, inferência propriamente dita e serialização da resposta compõem o tempo total.",
        "Isso importa porque otimizar apenas o forward pode gerar vitórias localmente invisíveis para o cliente final. O usuário não recebe 'latência de kernel'; ele recebe a soma do caminho inteiro.",
        "Por isso percentis como p95 e p99 são tão valiosos: eles capturam quando alguma parte da cadeia começa a acumular atraso."
      ],
      "visual": "concept",
      "blocks": [
        {
          "type": "definition",
          "title": "Latência ponta a ponta",
          "body": "Tempo total observado do pedido à resposta, incluindo etapas fora do modelo."
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Comparar um benchmark de notebook com a experiência real do endpoint, como se fossem a mesma coisa."
        }
      ]
    },
    {
      "id": "throughput-utilizacao",
      "eyebrow": "Capacidade",
      "title": "Throughput mede quanta utilidade o sistema entrega quando está trabalhando de verdade",
      "lead": "Capacidade útil não é a mesma coisa que pico teórico de hardware.",
      "paragraphs": [
        "Uma GPU pode ter ótimo desempenho bruto e ainda assim entregar pouco throughput se o scheduler, a fila ou o formato de lote não a alimentarem bem. O gargalo, nesses casos, deixa de ser a matemática do modelo e passa a ser o fluxo de trabalho do serviço.",
        "Throughput saudável depende de ocupação, mas também de previsibilidade. Se a fila explode e o p95 desaba, talvez o sistema esteja extraindo volume à custa da experiência do usuário.",
        "Em produto, throughput bom é throughput dentro do SLO, não throughput arrancado a qualquer preço."
      ],
      "visual": "comparison",
      "blocks": [
        {
          "type": "example",
          "title": "Sinal de alerta",
          "body": "Tokens por segundo altos com p95 péssimo podem indicar que o sistema só fica eficiente quando o usuário já está esperando demais."
        },
        {
          "type": "insight",
          "title": "Capacidade útil",
          "body": "Capacidade real é o volume que você consegue servir mantendo a qualidade operacional combinada com o produto."
        }
      ]
    },
    {
      "id": "batching-dinamico",
      "eyebrow": "Scheduler",
      "title": "Batching dinâmico troca um pouco de espera por mais aproveitamento",
      "lead": "A pergunta crítica é: quanto atraso extra cabe no orçamento?",
      "paragraphs": [
        "Batching dinâmico permite segurar requisições por uma janela curta para formar lotes melhores. Isso costuma aumentar throughput, pois a GPU processa mais itens por passagem.",
        "O custo aparece na fila. Cada microssegundo de espera é um investimento esperando retorno em utilização. Se o tráfego for irregular ou o orçamento de latência muito apertado, essa aposta pode falhar.",
        "Por isso bons schedulers expõem janelas, prioridades e limites de fila. O comportamento do sistema precisa ser regulado, não apenas ativado."
      ],
      "visual": "pipeline",
      "interactive": "queue-batching-lab",
      "blocks": [
        {
          "type": "definition",
          "title": "Batching dinâmico",
          "body": "Estratégia de juntar requisições por uma pequena janela para melhorar eficiência da execução."
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Configurar janela de batching pelo máximo throughput do laboratório e descobrir tarde que o produto perdeu fluidez."
        }
      ]
    },
    {
      "id": "prefill-decode",
      "eyebrow": "LLMs",
      "title": "Prefill e decode vivem em regimes diferentes",
      "lead": "Misturar as duas fases em uma métrica só esconde gargalos importantes.",
      "paragraphs": [
        "No prefill, o modelo processa o prompt inteiro e prepara estados internos. Em geral é uma fase mais densa e paralelizável. No decode, cada novo token depende do anterior, e a inferência passa a girar em iterações menores e altamente sensíveis a memória e agendamento.",
        "Essa diferença explica por que prompts longos e respostas longas pressionam o sistema de modos distintos. Às vezes o gargalo está no prefill do contexto; às vezes no decode sob alta concorrência.",
        "Separar as duas fases ajuda a decidir onde batching, cache, kernels e roteamento realmente valem a pena."
      ],
      "visual": "tradeoff",
      "interactive": "prefill-decode-lab",
      "blocks": [
        {
          "type": "definition",
          "title": "Prefill",
          "body": "Processamento inicial do prompt completo para popular estados de atenção e cache."
        },
        {
          "type": "definition",
          "title": "Decode",
          "body": "Geração iterativa de tokens, normalmente sensível a latência por passo e reutilização de KV cache."
        }
      ]
    },
    {
      "id": "continuous-batching",
      "eyebrow": "LLM serving",
      "title": "Continuous batching tenta reduzir o desperdício entre passos",
      "lead": "Em vez de esperar o lote inteiro terminar, ele reaproveita slots ao longo das iterações.",
      "paragraphs": [
        "Em workloads de LLM, requisições não têm a mesma duração. Algumas terminam rápido, outras continuam gerando por muito tempo. Se o sistema esperar todo mundo acabar para montar novo lote, muita capacidade fica ociosa.",
        "Batching contínuo ou inflight batching resolve parte disso permitindo que novas requisições entrem conforme slots ficam livres. É um casamento natural com geração token a token.",
        "O ganho vem de melhor ocupação; a complexidade vem de um scheduler mais sofisticado e de observabilidade mais cuidadosa."
      ],
      "visual": "pipeline",
      "blocks": [
        {
          "type": "insight",
          "title": "Por que isso importa",
          "body": "A variabilidade de comprimentos em LLMs faz o batching contínuo render bem mais do que políticas rígidas em muitos cenários."
        },
        {
          "type": "example",
          "title": "Ferramentas",
          "body": "Servidores como Triton e engines como vLLM tratam continuous batching como elemento central do serving moderno de LLMs."
        }
      ]
    },
    {
      "id": "cauda-e-congestionamento",
      "eyebrow": "Operação",
      "title": "A pior experiência costuma morar na cauda, não na média",
      "lead": "Congestionamento aparece primeiro em p95, filas e variação de tempo por token.",
      "paragraphs": [
        "Sistemas sob carga alta raramente falham de forma elegante. O mais comum é a fila crescer, a latência de primeira resposta subir e a geração ficar irregular. Quando isso acontece, p50 ainda pode parecer aceitável por algum tempo.",
        "Monitorar só médias é perigoso porque a experiência ruim se concentra nas bordas: bursts, prompts longos, sessões simultâneas e rotas com menos headroom.",
        "A engenharia de serving precisa tratar a cauda como problema de primeira classe, com limites de fila, shedding, roteamento e alertas coerentes."
      ],
      "visual": "checklist",
      "blocks": [
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Achar que throughput alto compensa qualquer degradação de p95. Para o usuário preso na fila, essa conta não fecha."
        },
        {
          "type": "insight",
          "title": "Cauda é sinal de arquitetura",
          "body": "Percentis altos geralmente denunciam políticas de agendamento, não apenas potência insuficiente."
        }
      ]
    },
    {
      "id": "estrategias-serving",
      "eyebrow": "Decisão",
      "title": "O melhor desenho depende do tráfego e da promessa do produto",
      "lead": "Suporte a streaming, bursts, lotes curtos ou sessões longas muda a estratégia ideal.",
      "paragraphs": [
        "Produtos conversacionais em streaming tendem a valorizar tempo até o primeiro token e regularidade do decode. Sistemas offline ou assíncronos costumam priorizar throughput agregado.",
        "Também importa o formato de tráfego: picos curtos pedem elasticidade; filas previsíveis aceitam janelas mais agressivas de batching; clientes premium podem merecer prioridades separadas.",
        "Por isso a arquitetura de serving nunca deve ser copiada no escuro. Ela precisa nascer do padrão de uso e do SLO real."
      ],
      "visual": "tradeoff",
      "interactive": "serving-strategy-scenarios",
      "blocks": [
        {
          "type": "example",
          "title": "Pergunta de projeto",
          "body": "Seu produto prefere responder um pouco mais rápido para cada pessoa ou atender mais pessoas por segundo dentro de um atraso aceitável?"
        },
        {
          "type": "definition",
          "title": "SLO",
          "body": "Objetivo operacional formal que amarra a experiência do produto às métricas do sistema."
        }
      ]
    },
    {
      "id": "medir-direito",
      "eyebrow": "Benchmark",
      "title": "Sem tráfego realista, otimização vira teatro",
      "lead": "O bom benchmark reproduz concorrência, distribuição de tamanhos e percentis relevantes.",
      "paragraphs": [
        "Testes úteis variam tamanho de prompt, comprimento de saída, número de clientes simultâneos e estratégia de streaming. Também comparam first-token latency, tempo total, tokens por segundo e ocupação do serviço.",
        "Essa visão composta impede conclusões falsas, como achar que uma configuração é melhor porque acelerou uma única classe de requisição enquanto piorou o resto.",
        "O objetivo final é simples: sustentar o comportamento prometido pelo produto quando o tráfego de verdade chegar."
      ],
      "visual": "checklist",
      "blocks": [
        {
          "type": "insight",
          "title": "Benchmark é contrato",
          "body": "Medir direito significa transformar expectativas do produto em critérios técnicos observáveis."
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Comparar configurações com workloads diferentes e chamar isso de tuning de serving."
        }
      ]
    },
    {
      "id": "quiz-revisao",
      "eyebrow": "Revisão",
      "title": "Quiz de revisão",
      "lead": "Use as perguntas para verificar se você consegue ligar conceitos de fila, lote, throughput e experiência do usuário.",
      "paragraphs": [
        "A meta não é decorar nomes, mas explicar por que duas métricas boas isoladamente podem produzir um produto ruim quando combinadas sem cuidado."
      ],
      "interactive": "quiz"
    },
    {
      "id": "glossario",
      "eyebrow": "Glossário",
      "title": "Glossário essencial",
      "lead": "Feche a aula consolidando o vocabulário operacional de serving.",
      "paragraphs": [
        "Esses termos aparecem em documentação de runtimes, relatórios de incidentes e tuning de produção."
      ],
      "interactive": "glossary"
    }
  ],
  "summaryCards": [
    {
      "title": "Latência é experiência",
      "body": "O usuário sente o tempo até a primeira resposta e a fluidez durante a geração."
    },
    {
      "title": "Throughput é capacidade",
      "body": "Ele mede quanto trabalho útil o sistema entrega por unidade de tempo."
    },
    {
      "title": "Batching é alavanca",
      "body": "Quando bem configurado, melhora utilização; quando mal configurado, fabrica fila."
    },
    {
      "title": "Medição precisa refletir tráfego real",
      "body": "Benchmarks sintéticos sem concorrência raramente predizem produção."
    }
  ],
  "quiz": [
    {
      "id": "q1",
      "prompt": "O que melhor descreve throughput?",
      "options": [
        {
          "id": "a",
          "label": "Quantidade de trabalho útil entregue por unidade de tempo."
        },
        {
          "id": "b",
          "label": "Tempo que a primeira requisição levou em ambiente local."
        },
        {
          "id": "c",
          "label": "Número de parâmetros do modelo."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Throughput mede capacidade agregada do sistema, não velocidade de um único caso isolado."
    },
    {
      "id": "q2",
      "prompt": "Por que batching pode piorar latência?",
      "options": [
        {
          "id": "a",
          "label": "Porque requisições podem esperar na fila até que outras se juntem ao lote."
        },
        {
          "id": "b",
          "label": "Porque diminui o número de kernels por segundo."
        },
        {
          "id": "c",
          "label": "Porque remove o prefill."
        }
      ],
      "correctOptionId": "a",
      "feedback": "A espera para formar lote adiciona atraso, mesmo quando a GPU depois trabalha melhor."
    },
    {
      "id": "q3",
      "prompt": "Em LLMs, o que muda entre prefill e decode?",
      "options": [
        {
          "id": "a",
          "label": "Prefill processa o prompt inicial; decode gera tokens iterativamente."
        },
        {
          "id": "b",
          "label": "Prefill usa CPU e decode usa GPU por definição."
        },
        {
          "id": "c",
          "label": "Não há diferença operacional relevante."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Essas fases têm perfis de custo diferentes e exigem tuning distinto."
    },
    {
      "id": "q4",
      "prompt": "Quando batching contínuo costuma ser especialmente útil?",
      "options": [
        {
          "id": "a",
          "label": "Quando diferentes requisições terminam em momentos distintos e novos pedidos podem ocupar slots livres."
        },
        {
          "id": "b",
          "label": "Quando existe apenas uma requisição por vez."
        },
        {
          "id": "c",
          "label": "Quando o modelo roda sem KV cache."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Continuous batching aproveita melhor a natureza iterativa e desigual das sequências em LLMs."
    },
    {
      "id": "q5",
      "prompt": "Por que olhar só p50 de latência é perigoso?",
      "options": [
        {
          "id": "a",
          "label": "Porque esconde caudas ruins que usuários reais podem sentir."
        },
        {
          "id": "b",
          "label": "Porque p50 mede throughput, não latência."
        },
        {
          "id": "c",
          "label": "Porque p50 só existe em CPU."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Percentis altos como p95 e p99 capturam congestionamentos e variabilidade importantes."
    },
    {
      "id": "q6",
      "prompt": "O que um lote maior costuma oferecer primeiro?",
      "options": [
        {
          "id": "a",
          "label": "Melhor utilização do hardware, com possível custo de fila e memória."
        },
        {
          "id": "b",
          "label": "Eliminação de fila por definição."
        },
        {
          "id": "c",
          "label": "Garantia de melhor qualidade do modelo."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Lotes maiores costumam melhorar ocupação, mas pressionam fila, memória e percentis altos."
    },
    {
      "id": "q7",
      "prompt": "Qual benchmark é mais próximo da produção?",
      "options": [
        {
          "id": "a",
          "label": "Carga com concorrência, distribuição realista de prompts e medição de percentis."
        },
        {
          "id": "b",
          "label": "Uma única inferência isolada em notebook."
        },
        {
          "id": "c",
          "label": "Somente o tempo de exportação do modelo."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Serving precisa ser medido sob tráfego parecido com o uso real, não apenas em casos controlados."
    },
    {
      "id": "q8",
      "prompt": "Qual decisão expressa um bom SLO?",
      "options": [
        {
          "id": "a",
          "label": "Definir orçamento de latência e volume esperado, e então ajustar batching e infraestrutura."
        },
        {
          "id": "b",
          "label": "Aumentar batch indefinidamente até a GPU ficar cheia."
        },
        {
          "id": "c",
          "label": "Otimizar apenas tokens por segundo sem olhar experiência do usuário."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Serving saudável começa de metas do produto e volta para as escolhas de sistema."
    }
  ],
  "glossary": [
    {
      "term": "Latência",
      "definition": "Tempo decorrido entre o envio da requisição e a resposta observada pelo cliente."
    },
    {
      "term": "Throughput",
      "definition": "Quantidade de trabalho útil processado por unidade de tempo, como requisições ou tokens por segundo."
    },
    {
      "term": "p95",
      "definition": "Percentil que indica um limite de latência abaixo do qual ficam 95% das observações."
    },
    {
      "term": "Fila",
      "definition": "Período em que a requisição espera por recursos antes de começar a ser processada."
    },
    {
      "term": "Batching estático",
      "definition": "Agrupamento com lote pré-definido e pouco adaptável à variação do tráfego."
    },
    {
      "term": "Batching dinâmico",
      "definition": "Agrupamento que espera uma pequena janela para combinar requisições compatíveis."
    },
    {
      "term": "Batching contínuo",
      "definition": "Estratégia que reaproveita slots ao longo das iterações, muito útil em LLMs."
    },
    {
      "term": "Prefill",
      "definition": "Fase inicial em que o prompt inteiro é processado para preparar estados de geração."
    },
    {
      "term": "Decode",
      "definition": "Fase iterativa em que o modelo produz tokens sucessivos, geralmente limitada por memória e sincronização."
    },
    {
      "term": "SLO",
      "definition": "Objetivo operacional mensurável, como manter p95 abaixo de um orçamento acordado."
    }
  ]
};
