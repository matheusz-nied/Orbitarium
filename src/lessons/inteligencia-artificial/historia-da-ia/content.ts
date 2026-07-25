import type { LessonContent } from "../../../types/content";

export const historiaDaIaContent: LessonContent = {
  "id": "historia-da-ia",
  "title": "História da IA: Simbólica, Conexionista e Transformers",
  "subtitle": "Da lógica explícita aos modelos de grande escala: uma história de promessas, limites e mudanças de ênfase sobre o que significa “fazer uma máquina inteligente”.",
  "description": "Uma aula histórica e conceitual sobre IA simbólica, conexionismo, invernos da IA, deep learning e Transformers, mostrando continuidades e rupturas sem simplificações triunfalistas.",
  "primaryCategoryId": "inteligencia-artificial",
  "secondaryCategoryId": "historia-da-ciencia",
  "level": "Iniciante",
  "estimatedTime": "40-55 min",
  "tags": [
    "História da IA",
    "IA Simbólica",
    "Conexionismo",
    "Transformers",
    "Deep Learning",
    "Filosofia da IA"
  ],
  "learningObjectives": [
    "Identificar as diferenças centrais entre IA simbólica, conexionismo e modelos baseados em Transformers.",
    "Entender por que a história da IA não é linear nem puramente cumulativa.",
    "Reconhecer o papel dos invernos da IA como crises de avaliação, expectativa e infraestrutura.",
    "Explicar por que dados, compute e benchmarks mudaram o destino do aprendizado profundo.",
    "Perceber que modelos atuais recuperam problemas antigos sob novas condições técnicas.",
    "Ler discursos sobre “revoluções” em IA com mais nuance histórica e menos hype."
  ],
  "prerequisites": [
    "Curiosidade sobre tecnologia e história da ciência.",
    "Noção básica de que algoritmos podem usar regras explícitas ou aprender a partir de dados.",
    "Interesse em entender por que o debate atual sobre IA tem raízes antigas."
  ],
  "references": [
    {
      "title": "Artificial Intelligence",
      "source": "Stanford Encyclopedia of Philosophy",
      "url": "https://plato.stanford.edu/entries/artificial-intelligence/",
      "note": "Panorama filosófico e histórico amplo sobre o campo."
    },
    {
      "title": "Connectionism",
      "source": "Stanford Encyclopedia of Philosophy",
      "url": "https://plato.stanford.edu/entries/connectionism/",
      "note": "Discussão filosófica sobre redes neurais, representação distribuída e crítica ao classicismo."
    },
    {
      "title": "A Proposal for the Dartmouth Summer Research Project on Artificial Intelligence",
      "source": "Stanford University / John McCarthy archive",
      "url": "https://www-formal.stanford.edu/jmc/history/dartmouth/dartmouth.html",
      "note": "Texto histórico do projeto que consolidou o nome “artificial intelligence”."
    },
    {
      "title": "History of artificial intelligence",
      "source": "Britannica",
      "url": "https://www.britannica.com/science/history-of-artificial-intelligence",
      "note": "Síntese histórica acessível com boa curadoria editorial."
    },
    {
      "title": "Deep Learning",
      "source": "LeCun, Bengio & Hinton — Nature",
      "url": "https://www.nature.com/articles/nature14539",
      "note": "Marco de consolidação do ressurgimento conexionista moderno."
    },
    {
      "title": "Attention Is All You Need",
      "source": "Vaswani et al. — arXiv",
      "url": "https://arxiv.org/abs/1706.03762",
      "note": "Artigo fundador da arquitetura Transformer."
    }
  ],
  "heroVisual": "historia-da-ia-hero",
  "openingText": "A história da IA costuma ser contada como uma marcha inevitável rumo aos modelos atuais. Essa narrativa é sedutora, mas enganosa. O campo mudou várias vezes de método, vocabulário e promessa. Em alguns momentos, acreditar em regras explícitas parecia a via mais rigorosa. Em outros, parecia claro que inteligência exigia aprender padrões distribuídos com muitos dados. Os Transformers não apagaram esse passado: eles reorganizaram questões antigas sob uma nova infraestrutura técnica.",
  "quickFacts": [
    {
      "title": "Não existe uma única IA",
      "body": "“IA” sempre abrigou tradições diferentes: lógica, busca, probabilidade, redes neurais, otimização e engenharia de sistemas."
    },
    {
      "title": "Cada época mudou o que chamava de progresso",
      "body": "Em certos períodos, progresso significava provar teoremas; em outros, vencer benchmarks; hoje, também inclui escalar modelos e integrá-los a produtos."
    },
    {
      "title": "Transformers não surgiram no vácuo",
      "body": "Eles dependem de uma longa história de representação vetorial, treinamento profundo, dados massivos e hardware especializado."
    }
  ],
  "timeline": [
    {
      "id": "turing-dartmouth",
      "period": "1940-1956",
      "title": "Fundação conceitual",
      "description": "Turing, McCulloch-Pitts e o projeto de Dartmouth colocam a possibilidade de inteligência maquínica como programa de pesquisa."
    },
    {
      "id": "simbolica",
      "period": "1956-1970s",
      "title": "Ascensão simbólica",
      "description": "Busca, lógica, prova automática e representação explícita dominam a imaginação do campo."
    },
    {
      "id": "perceptron-inverno",
      "period": "1960s-1980s",
      "title": "Debates e invernos",
      "description": "Redes neurais sofrem críticas, sistemas simbólicos escalam mal e as expectativas se chocam com resultados limitados."
    },
    {
      "id": "deep-learning",
      "period": "2006-2016",
      "title": "Ressurgimento conexionista",
      "description": "Mais dados, GPUs e técnicas de treino estável recolocam redes neurais no centro."
    },
    {
      "id": "transformers",
      "period": "2017 em diante",
      "title": "Modelos fundacionais",
      "description": "Autoatenção e escala transformam NLP e depois avançam sobre várias modalidades."
    }
  ],
  "sections": [
    {
      "id": "problema-historico",
      "eyebrow": "Panorama",
      "title": "Por que a história da IA volta sempre às mesmas perguntas?",
      "lead": "A IA não nasceu apenas como um conjunto de técnicas, mas como uma aposta sobre a forma da inteligência. Parte do campo acreditou que pensar era manipular símbolos com regras claras. Outra parte insistiu que sistemas inteligentes precisariam aprender por ajuste gradual, como redes distribuídas.",
      "paragraphs": [
        "Essas visões não se alternaram como modas puras. Elas responderam a limites reais: regras são poderosas quando o domínio é estruturado, mas frágeis diante de ambiguidade e escala. Redes aprendem padrões ricos, mas podem ser opacas, custosas e difíceis de controlar.",
        "Ler essa história ajuda a desfazer dois mitos comuns: o de que tudo antes dos LLMs era irrelevante, e o de que um único paradigma finalmente “resolveu” inteligência. Na prática, o campo avança quando reformula problemas antigos em novas condições científicas e computacionais."
      ],
      "visual": "historia-da-ia-hero",
      "blocks": [
        {
          "type": "definition",
          "title": "História intelectual da IA",
          "body": "É a história das hipóteses sobre como representar conhecimento, aprender, generalizar e agir com máquinas."
        },
        {
          "type": "insight",
          "title": "Mudança de infraestrutura muda teoria aplicada",
          "body": "Quando compute, dados e benchmarks mudam, teorias antigas podem voltar com desempenho e escala antes impossíveis."
        }
      ]
    },
    {
      "id": "ia-simbolica",
      "eyebrow": "Tradição clássica",
      "title": "IA simbólica: inteligência como manipulação explícita de símbolos",
      "lead": "Na tradição simbólica, o raciocínio é modelado por estruturas formais: regras, árvores de busca, lógicas, ontologias e sistemas especialistas. A intuição é elegante: se conseguimos explicitar o conhecimento relevante, a máquina pode inferir conclusões de modo rastreável.",
      "paragraphs": [
        "Esse paradigma brilhou em problemas onde o mundo pode ser descrito com relativa clareza: prova de teoremas, planejamento, jogos com regras fixas, diagnóstico em domínios estreitos. Ele oferecia algo muito valorizado: legibilidade. Em princípio, era possível perguntar quais regras o sistema aplicou e por quê.",
        "O custo era a engenharia de conhecimento. Capturar exceções, ambiguidade, contexto e senso comum em regras explícitas mostrou-se muito mais difícil do que parecia nas promessas iniciais. Escalar não era apenas ter mais regras; era lidar com explosão combinatória e manutenção conceitual complexa."
      ],
      "visual": "historia-da-ia-mapa-fundador",
      "blocks": [
        {
          "type": "definition",
          "title": "IA simbólica",
          "body": "Abordagem que enfatiza representação explícita de conhecimento e inferência por regras, lógica ou busca estruturada."
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Tratar IA simbólica como “obsoleta”. Em muitos sistemas reais, representação explícita, restrições e regras continuam essenciais."
        }
      ]
    },
    {
      "id": "conexionismo",
      "eyebrow": "Virada conceitual",
      "title": "Conexionismo: aprender pesos em vez de escrever todas as regras",
      "lead": "O conexionismo parte de outra aposta: inteligência pode emergir do ajuste de muitas conexões simples em uma rede. Em vez de programar diretamente cada regularidade, treinamos o sistema para encontrar padrões em exemplos.",
      "paragraphs": [
        "Essa abordagem muda o centro de gravidade do trabalho. O desafio deixa de ser “quais regras devo escrever?” e vira “quais dados, objetivos e arquiteturas permitem que o sistema aprenda?”. O conhecimento fica menos explícito e mais distribuído em parâmetros.",
        "O ganho é grande em domínios perceptivos e ambíguos, como fala, visão e linguagem natural. A perda é que entender exatamente o que foi aprendido se torna mais difícil. Por isso, a disputa com o paradigma simbólico sempre foi também filosófica: o que conta como explicação satisfatória de inteligência?"
      ],
      "interactive": "historia-da-ia-tradicoes",
      "blocks": [
        {
          "type": "definition",
          "title": "Conexionismo",
          "body": "Família de abordagens inspiradas em redes neurais, nas quais representações e respostas são aprendidas por ajuste de pesos."
        },
        {
          "type": "example",
          "title": "Exemplo histórico",
          "body": "O perceptron de Rosenblatt mostrou cedo a promessa do aprendizado a partir de exemplos, embora com limitações importantes."
        }
      ]
    },
    {
      "id": "invernos",
      "eyebrow": "Crise e método",
      "title": "Os invernos da IA foram crises de avaliação, não simples pausas de entusiasmo",
      "lead": "Os chamados invernos da IA aparecem quando promessas públicas, financiamento e resultados empíricos entram em descompasso. Isso aconteceu tanto com abordagens simbólicas quanto com redes neurais, em momentos diferentes.",
      "paragraphs": [
        "No caso simbólico, muitos sistemas funcionavam apenas em ambientes estreitos e exigiam manutenção intensiva. No caso conexionista inicial, limitações de dados, hardware e técnicas de treinamento restringiam o que redes conseguiam fazer. Em ambos os casos, a crise teve um componente metodológico: estávamos medindo a coisa certa e prometendo no nível certo?",
        "Esses invernos ensinaram algo valioso: progresso em IA depende tanto de critérios de avaliação quanto de arquitetura. Um sistema pode parecer impressionante em demonstrações controladas e ainda falhar como base geral para aplicações robustas."
      ],
      "visual": "historia-da-ia-comparacao-tradicoes",
      "blocks": [
        {
          "type": "insight",
          "title": "Fracasso histórico não significa ideia falsa",
          "body": "Muitas ideias recuaram por falta de infraestrutura adequada, não porque fossem conceitualmente sem valor."
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Explicar um inverno apenas como “as pessoas não entenderam a tecnologia”. Muitas crises vieram de promessas exageradas e avaliação insuficiente."
        }
      ]
    },
    {
      "id": "deep-learning",
      "eyebrow": "Ressurgimento",
      "title": "Por que redes neurais voltaram com tanta força no século XXI?",
      "lead": "O aprendizado profundo não venceu um debate apenas por retórica. Ele apareceu num momento em que três fatores se alinharam: grandes bases de dados digitais, hardware paralelo viável e técnicas de otimização mais estáveis.",
      "paragraphs": [
        "Isso permitiu que redes mais profundas aprendessem representações úteis em tarefas antes resistentes. Em visão computacional, fala e tradução, a diferença prática ficou difícil de ignorar. O argumento deixou de ser somente teórico e passou a ser também operacional: qual paradigma entrega melhor desempenho no benchmark relevante?",
        "Ao mesmo tempo, essa vitória teve um preço epistemológico. Muitos sistemas ficaram mais eficazes sem se tornarem proporcionalmente mais transparentes. O sucesso do deep learning, portanto, não encerra o debate clássico; ele o desloca para novas perguntas sobre explicação, controle e governança."
      ],
      "visual": "historia-da-ia-linha-do-tempo",
      "blocks": [
        {
          "type": "definition",
          "title": "Deep learning",
          "body": "Uso de redes neurais com múltiplas camadas para aprender representações hierárquicas a partir de dados."
        },
        {
          "type": "example",
          "title": "Exemplo",
          "body": "O avanço em reconhecimento de imagem e fala mostrou que representação aprendida podia superar pipelines manuais em vários contextos."
        }
      ]
    },
    {
      "id": "transformers",
      "eyebrow": "Mudança arquitetural",
      "title": "Transformers reorganizam a história ao tornar contexto e escala centrais",
      "lead": "Os Transformers não são apenas “redes neurais maiores”. Eles mudam a forma de processar sequência ao usar autoatenção para relacionar partes distantes da entrada com grande eficiência paralela.",
      "paragraphs": [
        "Isso foi decisivo para linguagem: em vez de depender fortemente de processamento sequencial, o modelo consegue combinar sinais de várias posições ao mesmo tempo. Quando esse mecanismo encontra dados abundantes e treino em escala, surgem capacidades amplas de modelagem textual que reconfiguram o campo inteiro.",
        "Mas é importante não transformar essa virada em mito absoluto. Transformers resolvem certos gargalos e escalam muito bem, porém não eliminam questões antigas sobre generalização, composição, robustez, verdade factual e interpretação do que o sistema faz."
      ],
      "interactive": "historia-da-ia-escala",
      "blocks": [
        {
          "type": "definition",
          "title": "Transformer",
          "body": "Arquitetura baseada em atenção que facilita o processamento paralelo de sequências e a contextualização entre posições distantes."
        },
        {
          "type": "insight",
          "title": "Escala não é uma teoria da mente",
          "body": "Escalar parâmetros e dados pode ampliar desempenho, mas não responde sozinho ao que significa compreender, representar ou raciocinar."
        }
      ]
    },
    {
      "id": "convergencias",
      "eyebrow": "Depois das batalhas",
      "title": "Hoje falamos mais em convergências e complementos do que em vencedores absolutos",
      "lead": "Sistemas contemporâneos frequentemente combinam componentes antes tratados como rivais: modelos neurais com ferramentas externas, recuperação de informação, restrições, verificadores, ontologias e regras de negócio.",
      "paragraphs": [
        "Isso mostra que a história não é um tribunal que absolve um paradigma e condena todos os outros. Muitas vezes, a solução prática é híbrida. Modelos aprendem representações potentes; mecanismos explícitos organizam, verificam ou limitam o comportamento.",
        "Entender essa convergência também evita uma leitura simplista do presente. O fato de um modelo gerar linguagem impressionante não implica que todos os problemas clássicos de representação simbólica, controle ou explicação tenham desaparecido."
      ],
      "visual": "historia-da-ia-tradeoffs",
      "blocks": [
        {
          "type": "definition",
          "title": "Abordagem híbrida",
          "body": "Estratégia que combina aprendizado estatístico com estruturas explícitas, ferramentas, regras ou mecanismos de verificação."
        },
        {
          "type": "example",
          "title": "Exemplo atual",
          "body": "Um sistema de IA pode usar um LLM para interpretar a consulta, recuperação para buscar evidência e regras para validar ações permitidas."
        }
      ]
    },
    {
      "id": "lentes-criticas",
      "eyebrow": "Leitura crítica",
      "title": "Como contar essa história sem cair em propaganda retroativa?",
      "lead": "Uma boa história da IA distingue três planos: ideias, resultados empíricos e ecossistema material. Ideias importam, mas hardware, disponibilidade de dados, competição industrial e critérios de benchmark também moldam o que parece plausível em cada época.",
      "paragraphs": [
        "Isso ajuda a resistir a duas tentações. A primeira é ridicularizar o passado a partir do presente. A segunda é reescrever o passado como se tudo naturalmente apontasse para os modelos atuais. Em ciência, trajetórias são contingentes: alguns caminhos vencem porque estavam melhor adaptados às condições do momento, não porque eram a única possibilidade racional.",
        "Aprender história da IA, portanto, não é decorar datas. É ganhar vocabulário para perguntar com mais rigor o que exatamente um sistema faz, por quais meios, sob quais limites e com quais custos."
      ],
      "visual": "historia-da-ia-checklist",
      "interactive": "historia-da-ia-lentes",
      "blocks": [
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Confundir sucesso comercial recente com encerramento definitivo de debates científicos e filosóficos."
        },
        {
          "type": "insight",
          "title": "Lição histórica",
          "body": "Toda geração de IA redefine temporariamente o que parece “inteligente”. Por isso, critérios de avaliação precisam ser examinados junto com a técnica."
        }
      ]
    },
    {
      "id": "resumo-final",
      "eyebrow": "Síntese",
      "title": "Amarre o fio histórico sem teleologia",
      "lead": "Revise como cada paradigma respondeu a um problema diferente de representação, aprendizagem e escala.",
      "paragraphs": [
        "O ponto central da aula é enxergar IA como uma família de programas científicos em tensão, e não como uma linha reta que simplesmente culmina nos Transformers."
      ],
      "interactive": "summary-cards"
    },
    {
      "id": "quiz-revisao",
      "eyebrow": "Revisão",
      "title": "Quiz de revisão histórica",
      "lead": "Teste se as continuidades e rupturas entre simbólica, conexionismo e Transformers ficaram claras.",
      "paragraphs": [
        "Use o quiz para revisar ideias-chave: representação explícita, aprendizado distribuído, crise de expectativas, escala e abordagens híbridas."
      ],
      "interactive": "quiz"
    },
    {
      "id": "glossario",
      "eyebrow": "Vocabulário",
      "title": "Glossário da história da IA",
      "lead": "Feche a aula consolidando o vocabulário necessário para ler textos históricos e atuais sobre IA.",
      "paragraphs": [
        "Esses termos ajudam a entender por que debates contemporâneos sobre LLMs recuperam dilemas antigos com nova roupagem."
      ],
      "interactive": "glossary"
    }
  ],
  "summaryCards": [
    {
      "title": "Simbólica",
      "body": "Modela inteligência com regras, estruturas explícitas e inferência legível."
    },
    {
      "title": "Conexionista",
      "body": "Modela inteligência como aprendizado distribuído a partir de exemplos e ajuste de pesos."
    },
    {
      "title": "Transformers",
      "body": "Reorganizam o processamento de sequências e amplificam o efeito da escala em linguagem."
    },
    {
      "title": "Lição histórica",
      "body": "A história da IA é feita de ciclos de promessa, infraestrutura, avaliação e recombinação de ideias."
    }
  ],
  "quiz": [
    {
      "id": "q1",
      "prompt": "O que caracteriza melhor a IA simbólica clássica?",
      "options": [
        {
          "id": "a",
          "label": "Representações explícitas, regras e inferência estruturada."
        },
        {
          "id": "b",
          "label": "Treino por gradiente em redes profundas."
        },
        {
          "id": "c",
          "label": "Uso obrigatório de grandes corpora textuais."
        }
      ],
      "correctOptionId": "a",
      "feedback": "A tradição simbólica enfatiza conhecimento explícito, lógica, busca e regras."
    },
    {
      "id": "q2",
      "prompt": "Qual foi uma motivação central do conexionismo?",
      "options": [
        {
          "id": "a",
          "label": "Evitar qualquer forma de matemática."
        },
        {
          "id": "b",
          "label": "Aprender padrões a partir de exemplos em vez de escrever todas as regras."
        },
        {
          "id": "c",
          "label": "Trocar linguagem natural por álgebra booleana."
        }
      ],
      "correctOptionId": "b",
      "feedback": "O conexionismo aposta em aprendizagem distribuída por ajuste de pesos."
    },
    {
      "id": "q3",
      "prompt": "Por que os invernos da IA são importantes historicamente?",
      "options": [
        {
          "id": "a",
          "label": "Porque mostram que o campo parou completamente."
        },
        {
          "id": "b",
          "label": "Porque revelam tensões entre promessa, infraestrutura e avaliação."
        },
        {
          "id": "c",
          "label": "Porque provam que só uma escola estava certa desde o início."
        }
      ],
      "correctOptionId": "b",
      "feedback": "Os invernos expõem quando expectativa pública e capacidade real se desalinham."
    },
    {
      "id": "q4",
      "prompt": "O que ajudou o ressurgimento do deep learning?",
      "options": [
        {
          "id": "a",
          "label": "Mais dados digitais, hardware paralelo e técnicas de treino melhores."
        },
        {
          "id": "b",
          "label": "Abandono completo de otimização."
        },
        {
          "id": "c",
          "label": "Retorno exclusivo aos sistemas especialistas."
        }
      ],
      "correctOptionId": "a",
      "feedback": "O ressurgimento dependeu fortemente de infraestrutura e estabilidade de treino."
    },
    {
      "id": "q5",
      "prompt": "Qual foi a contribuição estrutural dos Transformers?",
      "options": [
        {
          "id": "a",
          "label": "Eliminar qualquer forma de contexto."
        },
        {
          "id": "b",
          "label": "Substituir dados por regras manuais."
        },
        {
          "id": "c",
          "label": "Usar atenção para relacionar posições de forma eficiente e paralela."
        }
      ],
      "correctOptionId": "c",
      "feedback": "A autoatenção reorganiza o processamento de sequência e sustenta treino em escala."
    },
    {
      "id": "q6",
      "prompt": "Qual leitura histórica é mais cuidadosa?",
      "options": [
        {
          "id": "a",
          "label": "Tudo antes de 2017 foi irrelevante."
        },
        {
          "id": "b",
          "label": "A história da IA é feita de tradições em tensão e recombinação."
        },
        {
          "id": "c",
          "label": "O melhor benchmark de hoje encerra o debate filosófico."
        }
      ],
      "correctOptionId": "b",
      "feedback": "A leitura mais robusta reconhece continuidade, disputa e hibridização."
    },
    {
      "id": "q7",
      "prompt": "Por que abordagens híbridas voltaram a ganhar interesse?",
      "options": [
        {
          "id": "a",
          "label": "Porque combinam representações aprendidas com mecanismos explícitos de controle ou verificação."
        },
        {
          "id": "b",
          "label": "Porque dispensam dados e avaliação."
        },
        {
          "id": "c",
          "label": "Porque impedem qualquer erro do sistema."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Muitos sistemas atuais articulam aprendizado estatístico com ferramentas e restrições explícitas."
    },
    {
      "id": "q8",
      "prompt": "Qual erro conceitual aparece com frequência ao falar de história da IA?",
      "options": [
        {
          "id": "a",
          "label": "Tratar o presente como destino inevitável de todo o passado."
        },
        {
          "id": "b",
          "label": "Comparar métodos com seus contextos."
        },
        {
          "id": "c",
          "label": "Separar desempenho de narrativa de marketing."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Teleologia histórica simplifica demais o campo e apaga contingências importantes."
    }
  ],
  "glossary": [
    {
      "term": "IA simbólica",
      "definition": "Abordagem que modela conhecimento e raciocínio com símbolos, regras e inferência explícita."
    },
    {
      "term": "Conexionismo",
      "definition": "Tradição que enfatiza aprendizagem em redes de unidades conectadas com pesos ajustáveis."
    },
    {
      "term": "Sistema especialista",
      "definition": "Sistema baseado em regras criado para atuar em um domínio estreito com conhecimento codificado."
    },
    {
      "term": "Perceptron",
      "definition": "Modelo inicial de neurônio artificial associado ao aprendizado supervisionado simples."
    },
    {
      "term": "Inverno da IA",
      "definition": "Período de retração de expectativas, financiamento e confiança após promessas não cumpridas."
    },
    {
      "term": "Deep learning",
      "definition": "Uso de redes neurais profundas para aprender representações hierárquicas a partir de dados."
    },
    {
      "term": "Transformer",
      "definition": "Arquitetura baseada em atenção que processa sequências com forte capacidade de paralelização."
    },
    {
      "term": "Autoatenção",
      "definition": "Mecanismo pelo qual cada posição de uma sequência pesa outras posições para construir contexto."
    },
    {
      "term": "Escala",
      "definition": "Crescimento de parâmetros, dados e compute como estratégia de ampliação de desempenho."
    },
    {
      "term": "Abordagem híbrida",
      "definition": "Combinação de modelos aprendidos com regras, ferramentas, recuperação ou verificações explícitas."
    }
  ]
};
