import type { LessonContent } from "../../../types/content";

export const destilacaoCompressaoModelosContent: LessonContent = {
  "id": "destilacao-compressao-modelos",
  "title": "Destilação e Compressão de Modelos",
  "subtitle": "Como um modelo grande ensina um menor, e por que compressão séria combina objetivos de treino, arquitetura e restrições de deployment.",
  "description": "Uma aula avançada sobre knowledge distillation, teacher-student training, temperatura, soft targets, compressão clássica, poda, quantização complementar e critérios para escolher entre reduzir parâmetros, reduzir bits ou transferir comportamento.",
  "primaryCategoryId": "inteligencia-artificial",
  "secondaryCategoryId": "engenharia",
  "level": "Avançado",
  "estimatedTime": "50-65 min",
  "tags": [
    "Destilação",
    "Compressão",
    "Teacher-Student",
    "Distillation",
    "Pruning",
    "Deploy"
  ],
  "learningObjectives": [
    "Explicar por que saídas suaves carregam informação que rótulos duros não mostram.",
    "Entender o papel da temperatura na destilação proposta por Hinton e colaboradores.",
    "Comparar distilação de logits, representações intermediárias e objetivos multi-perda.",
    "Conectar destilação a poda, quantização e outras técnicas de compressão.",
    "Reconhecer falhas comuns, como aluno pequeno demais ou teacher mal calibrado.",
    "Decidir quando destilar vale mais do que apenas quantizar ou trocar de arquitetura."
  ],
  "prerequisites": [
    "Noção de classificação probabilística, logits e softmax.",
    "Familiaridade com fine-tuning e deployment de modelos.",
    "Entender que modelos menores podem falhar não só por capacidade, mas por objetivos de treino inadequados."
  ],
  "references": [
    {
      "title": "Distilling the Knowledge in a Neural Network",
      "source": "Hinton, Vinyals, Dean",
      "url": "https://arxiv.org/abs/1503.02531",
      "note": "Paper clássico que consolidou o uso de teacher-student distillation."
    },
    {
      "title": "Model Compression",
      "source": "Bucila, Caruana, Niculescu-Mizil",
      "url": "http://niculescu-mizil.org/papers/rtpp364-bucila.rev2.pdf",
      "note": "Antecedente importante sobre comprimir modelos complexos em modelos menores."
    },
    {
      "title": "DistilBERT, a distilled version of BERT",
      "source": "Sanh et al., arXiv",
      "url": "https://arxiv.org/abs/1910.01108",
      "note": "Exemplo marcante de destilação para NLP moderno."
    },
    {
      "title": "TinyBERT: Distilling BERT for Natural Language Understanding",
      "source": "Jiao et al., arXiv",
      "url": "https://arxiv.org/abs/1909.10351",
      "note": "Discute destilação em múltiplos níveis de representação."
    },
    {
      "title": "Deep Compression",
      "source": "Han, Mao, Dally",
      "url": "https://arxiv.org/abs/1510.00149",
      "note": "Referência clássica sobre combinar pruning, quantização e codificação."
    },
    {
      "title": "Pruning Tutorial",
      "source": "PyTorch Tutorials",
      "url": "https://docs.pytorch.org/tutorials/intermediate/pruning_tutorial.html",
      "note": "Visão prática de poda estrutural e não estrutural no ecossistema PyTorch."
    }
  ],
  "heroVisual": "hero",
  "openingText": "Quando um modelo grande acerta, ele quase nunca está dizendo apenas 'a classe correta é esta'. Ele também revela que alternativas eram quase corretas, que ambiguidades existem entre exemplos e quais padrões finos separaram uma decisão da outra. Knowledge distillation explora justamente essa riqueza: em vez de treinar o aluno só para repetir rótulos, ele aprende a imitar o comportamento de um professor mais capaz. Isso transforma compressão em algo mais interessante do que encolher pesos: vira transferência de generalização.",
  "quickFacts": [
    {
      "title": "Soft targets carregam estrutura",
      "body": "Probabilidades distribuídas revelam relações entre classes e alternativas plausíveis."
    },
    {
      "title": "Aluno pequeno demais também falha",
      "body": "Se a capacidade arquitetural for insuficiente, nem um ótimo professor salva o estudante."
    },
    {
      "title": "Compressão é pilha, não truque único",
      "body": "Destilação pode ser combinada com poda, quantização e redesign arquitetural."
    }
  ],
  "sections": [
    {
      "id": "por-que-destilar",
      "eyebrow": "Motivação",
      "title": "Compressão não é apenas cortar peso: é preservar comportamento útil",
      "lead": "O teacher oferece ao aluno uma versão mais rica do problema do que o dataset sozinho costuma mostrar.",
      "paragraphs": [
        "Rótulos duros dizem qual resposta está correta, mas ocultam o resto do panorama. Um professor forte, ao contrário, mostra também as alternativas plausíveis e o grau de semelhança entre classes ou respostas.",
        "Essa informação ajuda o aluno a aprender não só decisões binárias, mas uma geometria mais fina do problema. É por isso que destilação pode produzir estudantes surpreendentemente bons mesmo com menos parâmetros.",
        "A compressão então deixa de ser mera poda cega e vira transferência estruturada de generalização."
      ],
      "visual": "hero",
      "blocks": [
        {
          "type": "definition",
          "title": "Knowledge distillation",
          "body": "Família de técnicas em que um modelo estudante aprende a reproduzir aspectos do comportamento de um professor maior ou mais capaz."
        },
        {
          "type": "insight",
          "title": "Professor ensina ambiguidades",
          "body": "Soft targets revelam o que quase foi escolhido, não apenas o vencedor final."
        }
      ]
    },
    {
      "id": "soft-targets",
      "eyebrow": "Sinal",
      "title": "Soft targets carregam informação que o hard label esconde",
      "lead": "O que o professor quase escolheu também ensina.",
      "paragraphs": [
        "Se um exemplo de imagem é 'lobo' mas o professor também dá alguma massa para 'cão', ele está comunicando semelhança semântica. Em NLP, algo parecido acontece quando alternativas próximas recebem probabilidades não desprezíveis.",
        "O aluno aprende melhor quando consegue ver essas relações. Hard labels produzem um objetivo esparso; soft targets produzem um gradiente mais informativo sobre o espaço de decisões.",
        "Essa é a grande sacada do paper de Hinton: usar o comportamento probabilístico do teacher como fonte de sinal."
      ],
      "visual": "concept",
      "interactive": "teacher-student-lab",
      "blocks": [
        {
          "type": "definition",
          "title": "Soft targets",
          "body": "Distribuições de probabilidade do professor usadas como alvo adicional para o aluno."
        },
        {
          "type": "example",
          "title": "Intuição",
          "body": "Saber que duas classes eram quase empatadas ajuda o aluno a organizar fronteiras de decisão mais realistas."
        }
      ]
    },
    {
      "id": "temperatura",
      "eyebrow": "Formalismo",
      "title": "Temperatura regula o quanto dessa estrutura fica visível",
      "lead": "Distribuições muito afiadas escondem relações; distribuições mais suaves tornam o sinal pedagógico mais legível.",
      "paragraphs": [
        "A temperatura aplicada ao softmax suaviza logits e reduz a dominância da classe principal durante o treino de destilação. Isso permite que o aluno perceba melhor as diferenças relativas entre alternativas menores.",
        "Temperatura alta demais também pode lavar informação útil. O ponto não é deixar tudo plano, mas tornar o comportamento do professor mais ensinável.",
        "Na prática, a temperatura vira parte do projeto de loss, junto do peso relativo entre hard labels e distillation loss."
      ],
      "visual": "pipeline",
      "blocks": [
        {
          "type": "formula",
          "title": "Softmax com temperatura",
          "body": "A temperatura altera a nitidez da distribuição usada na destilação.",
          "formula": "p_i = exp(z_i / T) / Σ_j exp(z_j / T)"
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Tratar temperatura como hiperparâmetro decorativo. Ela muda de fato o tipo de informação que o aluno recebe."
        }
      ]
    },
    {
      "id": "multiplos-sinais",
      "eyebrow": "Projeto",
      "title": "Destilar logits é só o começo",
      "lead": "Modelos modernos frequentemente alinham saídas, estados internos e até relações entre camadas.",
      "paragraphs": [
        "Distilação de logits é a forma clássica, mas muitas arquiteturas se beneficiam de supervisionar representações intermediárias, atenção, relações entre embeddings ou objetivos auxiliares específicos da tarefa.",
        "Isso ajuda especialmente quando o aluno tem arquitetura diferente do teacher. Em vez de copiar apenas o resultado final, ele aprende também partes da organização interna do raciocínio do professor.",
        "O custo é maior complexidade de loss e de tuning. O benefício é um aluno mais estável sob compressão forte."
      ],
      "visual": "comparison",
      "blocks": [
        {
          "type": "definition",
          "title": "Feature distillation",
          "body": "Alinhamento de representações internas, não apenas de distribuições finais."
        },
        {
          "type": "insight",
          "title": "Compressão profunda",
          "body": "Quanto maior a diferença entre professor e aluno, mais útil pode ser supervisionar além da última camada."
        }
      ]
    },
    {
      "id": "teacher-student-capacidade",
      "eyebrow": "Capacidade",
      "title": "Um bom professor não compensa um aluno incapaz de aprender a lição",
      "lead": "Há um limite estrutural para o quanto se pode comprimir sem redesenhar a arquitetura.",
      "paragraphs": [
        "Se o aluno é pequeno demais, ele pode reproduzir o contorno geral do comportamento do teacher, mas falhar justamente onde o professor mais agrega valor: casos ambíguos, raros ou long tail.",
        "Por isso compressão séria envolve orçamento de capacidade. Às vezes vale mais trocar a arquitetura do aluno do que insistir em uma distilação heroica sobre um modelo inadequado.",
        "A melhor pergunta não é 'quanto cabe?', mas 'quanto cabe sem trair a tarefa?'."
      ],
      "visual": "tradeoff",
      "blocks": [
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Achar que qualquer professor pode ser comprimido em qualquer aluno se a loss estiver bem escolhida."
        },
        {
          "type": "insight",
          "title": "Capacity gap importa",
          "body": "O aluno precisa ter espaço representacional suficiente para internalizar a parte útil do teacher."
        }
      ]
    },
    {
      "id": "destilar-e-comprimir",
      "eyebrow": "Combinação",
      "title": "Destilação, poda e quantização atacam custos diferentes",
      "lead": "Por isso elas costumam funcionar melhor em conjunto do que como slogans isolados.",
      "paragraphs": [
        "Destilação tenta reduzir complexidade comportamental. Poda reduz estruturas ou conexões consideradas menos importantes. Quantização diminui o custo numérico da representação e da inferência.",
        "Essas técnicas não competem necessariamente. Um caminho comum é destilar um aluno mais enxuto e, depois, aplicar quantização compatível ao deployment. Em outros casos, pruning estrutural ajuda a tornar a arquitetura do estudante ainda mais barata.",
        "A escolha depende do gargalo principal: parâmetros, latência, memória, energia ou custo por requisição."
      ],
      "visual": "pipeline",
      "interactive": "compression-budget-lab",
      "blocks": [
        {
          "type": "example",
          "title": "Pipeline possível",
          "body": "Teacher forte → aluno destilado → poda seletiva → quantização calibrada."
        },
        {
          "type": "definition",
          "title": "Compressão em camadas",
          "body": "Estratégia de combinar técnicas que tratam fontes diferentes de custo em momentos diferentes do pipeline."
        }
      ]
    },
    {
      "id": "falhas-reais",
      "eyebrow": "Risco",
      "title": "Destilação pode transferir acertos, mas também transferir vícios",
      "lead": "Teacher mal calibrado, dados enviesados ou loss mal ponderada propagam problemas.",
      "paragraphs": [
        "Se o professor for excessivamente confiante, sistematicamente enviesado ou frágil fora da amostra, o aluno herdará parte desse comportamento. Em vez de inteligência condensada, você obtém vieses condensados.",
        "Outro risco é sacrificar demais o componente supervisionado e deixar o aluno preso a imitar uma distribuição imperfeita. Em tarefas de produto, isso pode piorar robustez em situações inesperadas.",
        "Compressão madura exige auditoria: medir não só acurácia média, mas estabilidade por subgrupos, exemplos raros e critérios operacionais."
      ],
      "visual": "checklist",
      "blocks": [
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Assumir que qualquer melhoria do teacher é automaticamente destilável sem custos colaterais."
        },
        {
          "type": "insight",
          "title": "Auditar o aluno",
          "body": "O modelo comprimido precisa ser avaliado nos mesmos riscos relevantes do modelo original, não apenas em uma métrica agregada."
        }
      ]
    },
    {
      "id": "escolha-estrategia",
      "eyebrow": "Decisão",
      "title": "Às vezes destilar é melhor; às vezes basta quantizar; às vezes o certo é trocar a arquitetura",
      "lead": "Compressão boa nasce do gargalo real e da tolerância do produto.",
      "paragraphs": [
        "Se o problema central é memória de pesos em inferência, quantização pode dar muito retorno com menor complexidade. Se o modelo é grande demais também do ponto de vista comportamental, destilar para um aluno menor pode destravar custos estruturais maiores.",
        "Quando a tarefa exige baixa latência e pouca memória sob limites rígidos, combinar aluno compacto com quantização costuma ser mais promissor do que insistir no teacher inteiro. Mas nada substitui benchmark na tarefa final.",
        "Em resumo: compressão é economia aplicada à generalização."
      ],
      "visual": "tradeoff",
      "interactive": "compression-strategies",
      "blocks": [
        {
          "type": "definition",
          "title": "Critério de compressão",
          "body": "Conjunto de restrições técnicas e de produto usado para decidir qual técnica de redução faz mais sentido."
        },
        {
          "type": "example",
          "title": "Pergunta-chave",
          "body": "Seu gargalo está no comportamento do modelo, no tamanho do checkpoint ou no formato de execução do runtime?"
        }
      ]
    },
    {
      "id": "quiz-revisao",
      "eyebrow": "Revisão",
      "title": "Quiz de revisão",
      "lead": "Use as perguntas para testar se professor, aluno, temperatura e combinação de técnicas ficaram conectados.",
      "paragraphs": [
        "A meta é explicar compressão como decisão de engenharia e aprendizado, não como coleção de palavras da moda."
      ],
      "interactive": "quiz"
    },
    {
      "id": "glossario",
      "eyebrow": "Glossário",
      "title": "Glossário essencial",
      "lead": "Feche a aula consolidando os termos centrais de destilação e compressão de modelos.",
      "paragraphs": [
        "Eles aparecem em papers clássicos, bibliotecas de treinamento e discussões de deployment eficiente."
      ],
      "interactive": "glossary"
    }
  ],
  "summaryCards": [
    {
      "title": "Destilar é transferir comportamento",
      "body": "O professor oferece sinais mais ricos do que rótulos duros isolados."
    },
    {
      "title": "Temperatura muda o que o aluno enxerga",
      "body": "Distribuições mais suaves expõem semelhanças e incertezas do teacher."
    },
    {
      "title": "Capacidade do aluno importa",
      "body": "Compressão sem arquitetura compatível vira subtreino disfarçado."
    },
    {
      "title": "Combinar técnicas é comum",
      "body": "Distilação, poda e quantização podem atuar em camadas diferentes do problema."
    }
  ],
  "quiz": [
    {
      "id": "q1",
      "prompt": "Qual é a principal intuição da knowledge distillation?",
      "options": [
        {
          "id": "a",
          "label": "Treinar um modelo menor usando apenas rótulos mais rápidos."
        },
        {
          "id": "b",
          "label": "Transferir comportamento de um professor para um aluno usando sinais mais ricos do que o hard label."
        },
        {
          "id": "c",
          "label": "Substituir qualquer fine-tuning por poda."
        }
      ],
      "correctOptionId": "b",
      "feedback": "A essência da destilação é usar o professor como fonte de estrutura comportamental para o aluno."
    },
    {
      "id": "q2",
      "prompt": "Por que soft targets podem ser melhores do que rótulos duros sozinhos?",
      "options": [
        {
          "id": "a",
          "label": "Porque mostram relações entre alternativas e níveis de incerteza."
        },
        {
          "id": "b",
          "label": "Porque removem a necessidade de loss supervisionada."
        },
        {
          "id": "c",
          "label": "Porque impedem overfitting automaticamente."
        }
      ],
      "correctOptionId": "a",
      "feedback": "As probabilidades do professor contêm informação sobre classes parecidas e ambiguidades do exemplo."
    },
    {
      "id": "q3",
      "prompt": "Qual o papel da temperatura na destilação clássica?",
      "options": [
        {
          "id": "a",
          "label": "Suavizar a distribuição para tornar mais visível a informação relativa entre classes."
        },
        {
          "id": "b",
          "label": "Aumentar a VRAM disponível."
        },
        {
          "id": "c",
          "label": "Reduzir o tamanho do tokenizer."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Temperaturas maiores achatam o softmax e revelam melhor o que o professor considera quase correto."
    },
    {
      "id": "q4",
      "prompt": "Quando um aluno pode falhar mesmo com excelente teacher?",
      "options": [
        {
          "id": "a",
          "label": "Quando sua capacidade arquitetural é pequena demais para o comportamento desejado."
        },
        {
          "id": "b",
          "label": "Quando usa softmax na saída."
        },
        {
          "id": "c",
          "label": "Quando o professor foi treinado antes dele."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Há um limite real de compressão compatível com a tarefa e a arquitetura escolhida."
    },
    {
      "id": "q5",
      "prompt": "Qual afirmação sobre destilação e quantização é mais correta?",
      "options": [
        {
          "id": "a",
          "label": "São alternativas mutuamente excludentes."
        },
        {
          "id": "b",
          "label": "Podem ser combinadas: primeiro reduzir comportamento, depois reduzir precisão, por exemplo."
        },
        {
          "id": "c",
          "label": "Quantização sempre elimina a necessidade de professor."
        }
      ],
      "correctOptionId": "b",
      "feedback": "Compressão séria costuma combinar técnicas que atacam fontes diferentes de custo."
    },
    {
      "id": "q6",
      "prompt": "O que feature distillation tenta alinhar?",
      "options": [
        {
          "id": "a",
          "label": "Representações intermediárias do aluno com as do professor."
        },
        {
          "id": "b",
          "label": "Só o tamanho do checkpoint."
        },
        {
          "id": "c",
          "label": "A sequência de prompts do dataset."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Nem toda destilação precisa ficar só na camada de saída; representações internas também podem ser supervisionadas."
    },
    {
      "id": "q7",
      "prompt": "Por que um teacher mal calibrado pode atrapalhar?",
      "options": [
        {
          "id": "a",
          "label": "Porque o aluno pode aprender confianças e vieses ruins em vez de apenas a estrutura útil."
        },
        {
          "id": "b",
          "label": "Porque teachers não usam logits."
        },
        {
          "id": "c",
          "label": "Porque calibration só existe em quantização."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Destilar comportamento ruim ou excessivamente confiante é transferir problema, não só conhecimento."
    },
    {
      "id": "q8",
      "prompt": "Qual escolha é mais madura em compressão?",
      "options": [
        {
          "id": "a",
          "label": "Perguntar qual técnica reduz mais parâmetros em qualquer contexto."
        },
        {
          "id": "b",
          "label": "Escolher a combinação de técnicas que respeita tarefa, hardware, custo e meta de qualidade."
        },
        {
          "id": "c",
          "label": "Sempre podar antes de entender o problema."
        }
      ],
      "correctOptionId": "b",
      "feedback": "Compressão é decisão sistêmica, não competição entre slogans técnicos."
    }
  ],
  "glossary": [
    {
      "term": "Teacher",
      "definition": "Modelo maior ou mais capaz usado como fonte de comportamento para o treinamento do estudante."
    },
    {
      "term": "Student",
      "definition": "Modelo menor ou mais barato que aprende a imitar parcialmente o professor."
    },
    {
      "term": "Soft targets",
      "definition": "Distribuições probabilísticas do professor, não apenas a classe vencedora."
    },
    {
      "term": "Temperatura",
      "definition": "Parâmetro usado para suavizar logits e tornar relações entre classes mais visíveis ao aluno."
    },
    {
      "term": "Logits",
      "definition": "Pontuações antes do softmax que codificam a preferência relativa entre classes."
    },
    {
      "term": "Distilação de logits",
      "definition": "Treino do aluno para aproximar a distribuição de saída do professor."
    },
    {
      "term": "Feature distillation",
      "definition": "Treino do aluno para alinhar representações intermediárias com as do professor."
    },
    {
      "term": "Pruning",
      "definition": "Remoção de pesos, neurônios ou estruturas menos úteis para reduzir custo."
    },
    {
      "term": "Quantização",
      "definition": "Redução de precisão numérica para diminuir memória e custo de inferência."
    },
    {
      "term": "Capacity gap",
      "definition": "Diferença entre a complexidade do comportamento do professor e a capacidade do aluno de imitá-lo."
    }
  ]
};
