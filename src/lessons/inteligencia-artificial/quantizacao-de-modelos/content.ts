import type { LessonContent } from "../../../types/content";

export const quantizacaoDeModelosContent: LessonContent = {
  "id": "quantizacao-de-modelos",
  "title": "Quantização de Modelos",
  "subtitle": "Como reduzir precisão numérica sem perder o norte: memória, largura de banda, kernels suportados e o delicado equilíbrio entre eficiência e qualidade.",
  "description": "Uma aula intermediária sobre PTQ, QAT, escalas, zero-points, quantização por tensor e por canal, weight-only para LLMs, riscos com outliers e como medir se a troca realmente vale a pena.",
  "primaryCategoryId": "inteligencia-artificial",
  "secondaryCategoryId": "engenharia",
  "level": "Intermediário",
  "estimatedTime": "40-55 min",
  "tags": [
    "Quantização",
    "PTQ",
    "QAT",
    "INT8",
    "INT4",
    "LLMs",
    "Inferência"
  ],
  "learningObjectives": [
    "Entender por que quantização costuma atacar custo de memória e largura de banda antes mesmo de atacar FLOPs.",
    "Diferenciar pós-treinamento (PTQ) de quantization-aware training (QAT).",
    "Explicar o papel de escala, zero-point e clipping na conversão entre domínio real e domínio quantizado.",
    "Comparar quantização por tensor, por canal e weight-only em LLMs.",
    "Reconhecer quando kernels, outliers e calibração tornam a quantização frágil.",
    "Saber medir sucesso com métricas de qualidade, latência e memória em conjunto."
  ],
  "prerequisites": [
    "Noção de inferência em redes neurais e formatos numéricos como FP32 e FP16.",
    "Familiaridade básica com deployment de modelos.",
    "Entender que uma melhoria operacional só importa se preservar utilidade real."
  ],
  "references": [
    {
      "title": "Quantization",
      "source": "PyTorch Documentation",
      "url": "https://docs.pytorch.org/docs/2.4/quantization.html",
      "note": "Visão geral dos fluxos de quantização suportados pelo ecossistema PyTorch."
    },
    {
      "title": "Quantize ONNX models",
      "source": "ONNX Runtime Documentation",
      "url": "https://onnxruntime.ai/docs/performance/model-optimizations/quantization.html",
      "note": "Documentação oficial sobre quantização INT8 e weight-only no ONNX Runtime."
    },
    {
      "title": "Explicit Quantization",
      "source": "NVIDIA TensorRT Documentation",
      "url": "https://docs.nvidia.com/deeplearning/tensorrt/latest/inference-library/quantized-types-explicit-quantization.html",
      "note": "Explica o caminho Q/DQ, calibração e formatos quantizados no TensorRT."
    },
    {
      "title": "Quantization and Training of Neural Networks for Efficient Integer-Arithmetic-Only Inference",
      "source": "Jacob et al., arXiv",
      "url": "https://arxiv.org/abs/1712.05877",
      "note": "Referência clássica para inferência inteira e QAT/PTQ em visão."
    },
    {
      "title": "GPTQ: Accurate Post-Training Quantization for Generative Pre-trained Transformers",
      "source": "Frantar et al., arXiv",
      "url": "https://arxiv.org/abs/2210.17323",
      "note": "Referência importante para weight-only quantization em LLMs."
    },
    {
      "title": "AWQ: Activation-aware Weight Quantization for LLM Compression and Acceleration",
      "source": "Lin et al., arXiv",
      "url": "https://arxiv.org/abs/2306.00978",
      "note": "Mostra por que proteger canais salientes ajuda em quantização agressiva de LLMs."
    }
  ],
  "heroVisual": "hero",
  "openingText": "Quantização costuma ser apresentada como um truque simples: trocar FP16 por INT8 ou INT4 e colher ganhos automáticos. Na prática, ela mexe em algo mais sensível: a forma como o modelo representa informação sob limites rígidos de hardware. O ganho operacional pode vir de menor tráfego de memória, kernels mais eficientes e melhor encaixe em cache, mas o preço aparece em calibração ruim, camadas com outliers e perda de robustez em distribuições fora do conjunto de teste. Em engenharia, quantizar não é apertar um botão; é redesenhar o contrato entre modelo e infraestrutura.",
  "quickFacts": [
    {
      "title": "Nem toda quantização acelera",
      "body": "Se o runtime não tiver kernels bons para o formato escolhido, o modelo pode até ficar menor e ainda assim não ganhar latência."
    },
    {
      "title": "Memória pesa muito",
      "body": "Em muitos cenários de inferência, a largura de banda para mover pesos e ativações pesa tanto quanto o cálculo bruto."
    },
    {
      "title": "LLM costuma quantizar pesos primeiro",
      "body": "Weight-only quantization preserva parte da estabilidade das ativações e é comum em pipelines de LLMs."
    }
  ],
  "sections": [
    {
      "id": "pressao-operacional",
      "eyebrow": "Motivação",
      "title": "Quantizar é responder a limites concretos de deployment",
      "lead": "O objetivo não é apenas 'ficar menor', mas reorganizar como o modelo consome memória, largura de banda e suporte do runtime.",
      "paragraphs": [
        "Modelos grandes raramente falham por um único motivo. Às vezes o gargalo é VRAM; em outras, o tráfego de pesos por token, a janela de latência ou o custo de servir concorrência. Quantização entra nesse cenário como ferramenta de engenharia, não como fetiche de paper.",
        "Ao reduzir bits, você diminui o volume de dados movimentados e pode habilitar kernels especializados. Isso explica por que a quantização costuma aparecer junto de exportação, escolha de runtime e tuning de batch.",
        "O ponto importante é este: eficiência real depende do sistema inteiro. Um checkpoint menor sem um caminho de execução compatível vira apenas uma compressão cosmética."
      ],
      "visual": "hero",
      "blocks": [
        {
          "type": "definition",
          "title": "Quantização de modelos",
          "body": "Processo de representar pesos, ativações ou ambos com menos bits do que em ponto flutuante tradicional."
        },
        {
          "type": "insight",
          "title": "Menos bits mudam o pipeline todo",
          "body": "Quantização afeta armazenamento, cache, largura de banda, tipos de kernel e, em alguns casos, até a forma de medir qualidade."
        }
      ]
    },
    {
      "id": "de-float-para-inteiros",
      "eyebrow": "Fundamento",
      "title": "A ideia central é aproximar valores reais com uma grade discreta",
      "lead": "Quantizar significa aceitar erro controlado em troca de eficiência mensurável.",
      "paragraphs": [
        "Um tensor em FP32 ou FP16 vive em um espaço contínuo de valores possíveis. Ao passar para INT8 ou INT4, esse espaço precisa ser mapeado para poucos níveis discretos. Escala e zero-point definem esse mapa.",
        "Esse mapeamento nunca é neutro: alguns valores ficam bem representados, outros perdem detalhe. Se a faixa escolhida for larga demais, a resolução útil cai. Se for estreita demais, ocorre clipping dos extremos.",
        "A intuição correta não é 'trocar formato'. É 'decidir quais erros numéricos o sistema pode tolerar'."
      ],
      "visual": "concept",
      "blocks": [
        {
          "type": "definition",
          "title": "Escala e zero-point",
          "body": "Parâmetros usados para converter entre domínio real e domínio quantizado."
        },
        {
          "type": "formula",
          "title": "Mapeamento simplificado",
          "body": "Uma forma comum de pensar a quantização linear é usar uma escala e um deslocamento inteiro.",
          "formula": "valor_quantizado ≈ round(valor_real / escala) + zero_point"
        }
      ]
    },
    {
      "id": "granularidade",
      "eyebrow": "Projeto",
      "title": "A granularidade decide quanta flexibilidade cada parte do tensor recebe",
      "lead": "Uma escala global é simples; várias escalas locais costumam preservar mais fidelidade.",
      "paragraphs": [
        "Na quantização por tensor, todo o peso compartilha a mesma faixa. É simples e barata, mas sofre quando diferentes canais têm dinâmicas muito diferentes.",
        "Na quantização por canal, cada canal recebe parâmetros próprios. Isso aumenta fidelidade em camadas heterogêneas e explica por que muitos runtimes a priorizam para pesos de convoluções e projeções lineares.",
        "Em LLMs, também surgem estratégias por grupo ou weight-only. O padrão escolhido precisa conversar com o suporte do runtime e com a topologia do modelo."
      ],
      "visual": "comparison",
      "blocks": [
        {
          "type": "example",
          "title": "Escolha prática",
          "body": "Pesos com canais muito desbalanceados costumam se beneficiar de quantização por canal ou por grupo."
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Escolher a forma mais agressiva só porque o número de bits parece melhor. Granularidade ruim pode destruir a utilidade antes de gerar qualquer ganho operacional."
        }
      ]
    },
    {
      "id": "ptq-calibracao",
      "eyebrow": "Fluxo",
      "title": "PTQ é o caminho mais rápido para testar o limite do hardware",
      "lead": "Calibração boa costuma separar um ganho útil de uma regressão silenciosa.",
      "paragraphs": [
        "No PTQ, você parte de um modelo já treinado e estima faixas a partir de dados representativos, normalmente sem reabrir um ciclo completo de treinamento. Essa etapa de calibração define escalas e ajuda a decidir onde a quantização é segura ou arriscada.",
        "Se o conjunto de calibração não se parece com a produção, o modelo pode parecer estável em laboratório e quebrar sob cargas reais. Em LLMs, isso aparece em prompts longos, domínios raros e padrões de ativação com outliers.",
        "PTQ brilha porque é rápido e barato. Mas rapidez não compensa calibração preguiçosa."
      ],
      "visual": "pipeline",
      "interactive": "precision-tradeoff-lab",
      "blocks": [
        {
          "type": "definition",
          "title": "Calibração",
          "body": "Uso de dados representativos para estimar intervalos e parâmetros de quantização antes da inferência."
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Calibrar com poucas amostras limpas demais e concluir que o modelo está pronto para todo o tráfego de produção."
        }
      ]
    },
    {
      "id": "qat",
      "eyebrow": "Ajuste fino",
      "title": "QAT ensina o modelo a conviver com o ruído antes do deployment",
      "lead": "Em vez de apenas sofrer a quantização, o modelo passa a treiná-la mentalmente durante o forward.",
      "paragraphs": [
        "Quantization-aware training insere fake quantization no treino ou no fine-tuning. O modelo ainda aprende em ponto flutuante, mas vê no forward uma simulação da baixa precisão final.",
        "Isso ajuda quando PTQ derruba qualidade demais, especialmente em arquiteturas sensíveis, tarefas estreitas ou metas de precisão mais agressivas. O custo é maior complexidade de pipeline e necessidade de dados para reajuste.",
        "QAT não é um ritual obrigatório. Ele faz sentido quando o ganho operacional esperado compensa o custo adicional de engenharia e experimentação."
      ],
      "visual": "comparison",
      "interactive": "ptq-vs-qat",
      "blocks": [
        {
          "type": "insight",
          "title": "QAT é adaptação",
          "body": "O objetivo não é achar um formato mágico, mas permitir que o modelo redistribua robustez diante do ruído numérico."
        },
        {
          "type": "example",
          "title": "Uso típico",
          "body": "Aplicar QAT em um modelo já fine-tunado quando PTQ em INT8 ficou aceitável em latência, mas ruim em qualidade para casos críticos."
        }
      ]
    },
    {
      "id": "llms-weight-only",
      "eyebrow": "LLMs",
      "title": "Em modelos autoregressivos, quantizar pesos costuma ser o primeiro grande corte",
      "lead": "Isso reduz pegada de memória sem atacar de forma igualmente agressiva todas as ativações.",
      "paragraphs": [
        "LLMs carregam enormes matrizes lineares e repetem esse custo a cada token. Por isso weight-only quantization virou estratégia prática: atacar a memória dos pesos já destrava mais modelos por GPU e mais concorrência por processo.",
        "Métodos como GPTQ e AWQ tentam preservar partes mais sensíveis do modelo quando descem para poucos bits. A ideia central é aceitar aproximação, mas proteger justamente onde o erro custa mais em qualidade.",
        "Mesmo assim, weight-only não resolve tudo. KV cache, embeddings, kernels específicos e padrões de outlier continuam importando."
      ],
      "visual": "tradeoff",
      "interactive": "hardware-path-simulator",
      "blocks": [
        {
          "type": "definition",
          "title": "Weight-only quantization",
          "body": "Quantização concentrada nos pesos, geralmente mantendo ativações ou partes do runtime em precisão mais alta."
        },
        {
          "type": "insight",
          "title": "LLM é memória em movimento",
          "body": "Quando o gargalo é movimentar matrizes enormes repetidamente, reduzir a pegada dos pesos pode valer mais do que discutir apenas FLOPs teóricos."
        }
      ]
    },
    {
      "id": "benchmarking",
      "eyebrow": "Medição",
      "title": "Quantização boa precisa sobreviver a um placar com várias colunas",
      "lead": "Qualidade isolada engana; latência isolada também.",
      "paragraphs": [
        "O benchmark mínimo inclui latência, throughput, memória, taxa de fallback para kernels não quantizados e métricas de qualidade apropriadas à tarefa, como acurácia, perplexidade, exatidão factual ou score de produto.",
        "Também é importante observar estabilidade por segmentos: prompts curtos e longos, lotes pequenos e grandes, tráfego limpo e tráfego esquisito. Quantização frequentemente falha primeiro nas bordas do domínio.",
        "Uma decisão madura define de antemão o que é regressão aceitável. Sem esse contrato, qualquer ganho operacional pode ser vendido como vitória, mesmo quando a experiência piora."
      ],
      "visual": "checklist",
      "blocks": [
        {
          "type": "example",
          "title": "Checklist mínimo",
          "body": "Compare memória, latência p50/p95, throughput, qualidade e suporte de kernel entre o baseline e a versão quantizada."
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Anunciar sucesso porque o checkpoint ficou menor sem medir o comportamento do sistema inteiro."
        }
      ]
    },
    {
      "id": "quando-nao-quantizar",
      "eyebrow": "Critério",
      "title": "Há cenários em que quantizar demais é cortar o fio errado",
      "lead": "Se a margem de qualidade já está curta, agressividade extra pode custar mais do que economiza.",
      "paragraphs": [
        "Modelos usados em tarefas altamente sensíveis, com pouca tolerância a regressão ou com forte presença de outliers podem exigir formatos menos agressivos ou segmentação seletiva por camadas.",
        "Também existe o caso operacional inverso: o gargalo principal não está nos pesos, mas em rede, CPU host, serialização, banco de vetores ou pós-processamento. Nesses casos, quantização ajuda pouco.",
        "A pergunta correta não é 'qual o menor formato possível?', mas 'qual a menor precisão que ainda respeita os objetivos do produto?'."
      ],
      "visual": "tradeoff",
      "blocks": [
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Transformar quantização em objetivo em si. O objetivo real continua sendo entregar boa resposta dentro de um orçamento de sistema."
        },
        {
          "type": "insight",
          "title": "Seleção é melhor que dogma",
          "body": "Camadas ou componentes diferentes podem merecer estratégias diferentes dentro do mesmo modelo."
        }
      ]
    },
    {
      "id": "quiz-revisao",
      "eyebrow": "Revisão",
      "title": "Quiz de revisão",
      "lead": "Use as perguntas para testar se as ideias centrais de quantização ficaram conectadas ao deployment real.",
      "paragraphs": [
        "A quantização só fica clara quando você consegue explicar o trade-off entre bits, suporte de kernel, calibração e qualidade."
      ],
      "interactive": "quiz"
    },
    {
      "id": "glossario",
      "eyebrow": "Glossário",
      "title": "Glossário essencial",
      "lead": "Feche a aula consolidando o vocabulário usado em PTQ, QAT e serving quantizado.",
      "paragraphs": [
        "Esses termos aparecem com frequência em papers, documentação de runtime e discussões de performance."
      ],
      "interactive": "glossary"
    }
  ],
  "summaryCards": [
    {
      "title": "Quantização é trade-off",
      "body": "Menos bits melhoram eficiência, mas aumentam risco de erro de aproximação."
    },
    {
      "title": "PTQ é rápido",
      "body": "Ótimo para iteração operacional, desde que a calibração represente o tráfego real."
    },
    {
      "title": "QAT prepara o modelo",
      "body": "Treinar com fake quantization ajuda o modelo a conviver com o ruído do formato final."
    },
    {
      "title": "Benchmark completo é obrigatório",
      "body": "Memória, latência, qualidade e suporte de kernel precisam ser medidos juntos."
    }
  ],
  "quiz": [
    {
      "id": "q1",
      "prompt": "Por que quantização frequentemente melhora custo operacional mesmo quando o número de operações não muda muito?",
      "options": [
        {
          "id": "a",
          "label": "Porque reduz tráfego de memória e pode usar kernels mais eficientes."
        },
        {
          "id": "b",
          "label": "Porque remove todas as ativações intermediárias."
        },
        {
          "id": "c",
          "label": "Porque sempre elimina a necessidade de calibração."
        }
      ],
      "correctOptionId": "a",
      "feedback": "O ganho costuma aparecer ao mover menos bytes e usar caminhos de execução mais favoráveis ao hardware."
    },
    {
      "id": "q2",
      "prompt": "Qual situação descreve melhor PTQ?",
      "options": [
        {
          "id": "a",
          "label": "Treinar o modelo do zero em INT8."
        },
        {
          "id": "b",
          "label": "Quantizar depois do treino, tipicamente com calibração e sem retreinamento completo do modelo."
        },
        {
          "id": "c",
          "label": "Trocar o tokenizer por uma versão menor."
        }
      ],
      "correctOptionId": "b",
      "feedback": "PTQ parte de um modelo já treinado e aplica quantização como etapa posterior; se for necessário adaptar o modelo ao ruído numérico por treino explícito, já entramos em regimes mais próximos de QAT ou fine-tuning específico."
    },
    {
      "id": "q3",
      "prompt": "Quando QAT tende a valer mais a pena?",
      "options": [
        {
          "id": "a",
          "label": "Quando a queda de qualidade com PTQ já ficou perceptível e o modelo pode ser reajustado."
        },
        {
          "id": "b",
          "label": "Quando o hardware não suporta formatos quantizados."
        },
        {
          "id": "c",
          "label": "Quando não existe nenhum dado para calibração."
        }
      ],
      "correctOptionId": "a",
      "feedback": "QAT ajuda justamente quando o modelo precisa aprender a acomodar o ruído introduzido pela baixa precisão."
    },
    {
      "id": "q4",
      "prompt": "O que a quantização por canal tenta resolver?",
      "options": [
        {
          "id": "a",
          "label": "Diferenças de escala entre canais que uma única escala global não captura bem."
        },
        {
          "id": "b",
          "label": "Ausência de tokenizer multilíngue."
        },
        {
          "id": "c",
          "label": "Falta de espaço em disco para datasets."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Per-channel preserva melhor tensores heterogêneos, especialmente em convoluções e projeções lineares."
    },
    {
      "id": "q5",
      "prompt": "Qual é um risco real de escolher INT4 sem olhar suporte de runtime?",
      "options": [
        {
          "id": "a",
          "label": "O modelo ficar menor, mas o caminho de execução continuar desquantizando para formatos altos."
        },
        {
          "id": "b",
          "label": "O modelo deixar de usar atenção."
        },
        {
          "id": "c",
          "label": "O modelo precisar de menos benchmark."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Sem kernel adequado, o ganho teórico de bits não vira ganho concreto de inferência."
    },
    {
      "id": "q6",
      "prompt": "Por que outliers atrapalham quantização?",
      "options": [
        {
          "id": "a",
          "label": "Porque ampliam o intervalo necessário e comprimem a resolução útil para a maior parte dos valores."
        },
        {
          "id": "b",
          "label": "Porque tornam o modelo incompatível com GPU."
        },
        {
          "id": "c",
          "label": "Porque impedem exportação para ONNX."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Quando poucos valores muito grandes dominam a faixa, sobra menos detalhe para o restante do tensor."
    },
    {
      "id": "q7",
      "prompt": "Em LLMs, por que weight-only quantization é tão comum?",
      "options": [
        {
          "id": "a",
          "label": "Porque reduz memória de pesos sem obrigar todas as ativações a sofrerem a mesma agressividade."
        },
        {
          "id": "b",
          "label": "Porque elimina KV cache."
        },
        {
          "id": "c",
          "label": "Porque dispensa benchmark de qualidade."
        }
      ],
      "correctOptionId": "a",
      "feedback": "É um compromisso operacional bastante usado para manter estabilidade enquanto corta pegada de memória."
    },
    {
      "id": "q8",
      "prompt": "Qual benchmark é mais honesto para validar quantização?",
      "options": [
        {
          "id": "a",
          "label": "Medir só tamanho do checkpoint."
        },
        {
          "id": "b",
          "label": "Avaliar latência, memória, throughput e qualidade em tráfego parecido com produção."
        },
        {
          "id": "c",
          "label": "Olhar apenas a perda de treino."
        }
      ],
      "correctOptionId": "b",
      "feedback": "Quantização só se prova quando melhora o sistema real sem degradar utilidade além do aceitável."
    }
  ],
  "glossary": [
    {
      "term": "PTQ",
      "definition": "Post-training quantization: quantizar um modelo já treinado, em geral com calibração e sem um novo ciclo completo de treinamento."
    },
    {
      "term": "QAT",
      "definition": "Quantization-aware training: treino ou fine-tuning que simula quantização no forward para adaptar os pesos."
    },
    {
      "term": "Escala",
      "definition": "Fator que mapeia valores reais para o intervalo discreto disponível no formato quantizado."
    },
    {
      "term": "Zero-point",
      "definition": "Deslocamento inteiro que permite representar zero real dentro do intervalo quantizado."
    },
    {
      "term": "Clipping",
      "definition": "Corte de valores extremos para caber no intervalo do formato, reduzindo influência de outliers."
    },
    {
      "term": "Per-tensor",
      "definition": "Quantização em que um tensor inteiro compartilha a mesma escala e o mesmo zero-point."
    },
    {
      "term": "Per-channel",
      "definition": "Quantização em que cada canal ou grupo recebe parâmetros próprios, preservando melhor variações locais."
    },
    {
      "term": "Weight-only",
      "definition": "Estratégia que quantiza principalmente pesos, mantendo ativações em precisão mais alta."
    },
    {
      "term": "Calibração",
      "definition": "Processo de estimar faixas e estatísticas a partir de dados representativos para definir parâmetros de quantização."
    },
    {
      "term": "Kernel quantizado",
      "definition": "Implementação otimizada no runtime que realmente executa operações no formato reduzido."
    }
  ]
};
