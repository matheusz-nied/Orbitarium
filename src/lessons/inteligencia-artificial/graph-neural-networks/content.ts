import type { LessonContent } from "../../../types/content";

export const graphNeuralNetworksContent: LessonContent = {
  "id": "graph-neural-networks",
  "title": "Graph Neural Networks",
  "subtitle": "Como aprender em dados relacionais quando a estrutura importante não é uma grade, mas uma rede de conexões.",
  "description": "Uma aula avançada sobre grafos, message passing, tarefas em nível de nó/aresta/grafo, oversmoothing, heterofilia e aplicações de GNNs.",
  "primaryCategoryId": "inteligencia-artificial",
  "secondaryCategoryId": "computacao",
  "level": "Avançado",
  "estimatedTime": "50-65 min",
  "tags": [
    "GNN",
    "Grafos",
    "Message Passing",
    "GCN",
    "Node Classification",
    "Relational Learning"
  ],
  "learningObjectives": [
    "Entender por que grafos exigem um tratamento diferente de imagens e sequências regulares.",
    "Explicar a intuição de message passing como agregação de vizinhança.",
    "Distinguir tarefas em nível de nó, aresta e grafo.",
    "Reconhecer limites como oversmoothing, oversquashing e dependência de homofilia.",
    "Relacionar escolhas de profundidade e agregação ao tipo de estrutura relacional presente nos dados.",
    "Mapear usos típicos de GNNs em moléculas, recomendação, conhecimento e redes complexas."
  ],
  "prerequisites": [
    "Noção básica de redes neurais.",
    "Familiaridade inicial com a ideia de grafo como nós e arestas.",
    "Interesse em dados relacionais, moléculas, redes ou recomendação."
  ],
  "references": [
    {
      "title": "Semi-Supervised Classification with Graph Convolutional Networks",
      "source": "Kipf & Welling — arXiv",
      "url": "https://arxiv.org/abs/1609.02907",
      "note": "Artigo clássico de GCN."
    },
    {
      "title": "Representation Learning on Graphs: Methods and Applications",
      "source": "Hamilton, Ying & Leskovec — arXiv",
      "url": "https://arxiv.org/pdf/1709.05584",
      "note": "Survey introdutório muito influente."
    },
    {
      "title": "Relational inductive biases, deep learning, and graph networks",
      "source": "Battaglia et al. — arXiv",
      "url": "https://arxiv.org/abs/1806.01261",
      "note": "Texto importante sobre viés indutivo relacional e graph networks."
    },
    {
      "title": "A Comprehensive Survey on Graph Neural Networks",
      "source": "Wu et al. — arXiv",
      "url": "https://arxiv.org/abs/1901.00596",
      "note": "Survey amplo sobre arquiteturas, tarefas e desafios de GNNs."
    },
    {
      "title": "CS224W: Machine Learning with Graphs",
      "source": "Stanford / Jure Leskovec",
      "url": "http://snap.stanford.edu/class/cs224w-2019/slides/08-GNN.pdf",
      "note": "Material didático de referência sobre aprendizado em grafos."
    },
    {
      "title": "PyTorch Geometric Documentation",
      "source": "PyTorch Geometric",
      "url": "https://pytorch-geometric.readthedocs.io/en/latest/",
      "note": "Documentação prática de uma biblioteca central para GNNs."
    }
  ],
  "heroVisual": "graph-neural-networks-hero",
  "openingText": "Muitos dados relevantes não vivem em grades regulares como imagens nem em sequências lineares simples. Moléculas, redes sociais, grafos de conhecimento, sistemas de recomendação e circuitos são dominados por relações. GNNs surgem exatamente para isso: aprender não apenas com atributos de entidades isoladas, mas com a estrutura das conexões entre elas. A grande ideia é simples; os detalhes do que pode dar errado também são.",
  "quickFacts": [
    {
      "title": "Relações importam",
      "body": "Em muitos domínios, o valor de um nó depende fortemente da vizinhança e do padrão de conexões."
    },
    {
      "title": "Agregação não é neutra",
      "body": "Como agregamos vizinhos determina que informação o modelo preserva, mistura ou perde."
    },
    {
      "title": "Mais camadas nem sempre ajudam",
      "body": "Profundidade excessiva pode apagar distinções locais ou comprimir informação demais."
    }
  ],
  "sections": [
    {
      "id": "porque-grafo",
      "eyebrow": "Motivação",
      "title": "Quando dados têm estrutura relacional, tratar tudo como tabela perde informação",
      "lead": "Em um grafo, entidades não são apenas linhas independentes. Cada nó carrega atributos, mas também posição relacional: quem se conecta com quem, por quais tipos de aresta e em que padrão estrutural.",
      "paragraphs": [
        "Isso é decisivo em muitos problemas. Uma molécula não é só a soma de átomos; é também a disposição das ligações. Um usuário em uma rede não é só um vetor de perfil; é também a vizinhança e a topologia de suas conexões.",
        "A pergunta, então, é como construir modelos que usem essa estrutura sem perder a flexibilidade do deep learning."
      ],
      "visual": "graph-neural-networks-hero",
      "blocks": [
        {
          "type": "definition",
          "title": "Dado relacional",
          "body": "Dado em que as relações entre entidades carregam informação tão importante quanto os atributos das próprias entidades."
        },
        {
          "type": "insight",
          "title": "Estrutura é dado",
          "body": "Em grafos, conectividade não é metadado periférico; ela é parte do próprio sinal que queremos aprender."
        }
      ]
    },
    {
      "id": "vocabulario",
      "eyebrow": "Estrutura",
      "title": "Nós, arestas e vizinhança formam o alfabeto do problema",
      "lead": "Um grafo é composto por nós e arestas, mas essa definição mínima esconde muita riqueza: arestas podem ter direção, peso, tipo e temporalidade; nós podem ter atributos densos, esparsos ou quase nenhum.",
      "paragraphs": [
        "Essa variabilidade explica por que GNNs são uma família ampla de modelos, e não um único algoritmo. O tipo de grafo e o tipo de tarefa influenciam fortemente que mecanismo de agregação faz sentido.",
        "Mesmo assim, a intuição geral permanece: cada nó atualiza sua representação combinando sua informação local com mensagens vindas dos vizinhos."
      ],
      "visual": "graph-neural-networks-grafos",
      "blocks": [
        {
          "type": "definition",
          "title": "Vizinhança",
          "body": "Conjunto de nós conectados a um nó, frequentemente usado como contexto imediato para atualização de representação."
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Achar que grafo é sempre não direcionado e homogêneo. Muitos domínios têm múltiplos tipos de nós e relações."
        }
      ]
    },
    {
      "id": "tarefas",
      "eyebrow": "Formulações",
      "title": "O que estamos prevendo: um nó, uma aresta ou o grafo inteiro?",
      "lead": "Em classificação de nós, queremos rotular entidades individuais com ajuda da estrutura ao redor. Em predição de arestas, queremos saber se duas entidades deveriam se conectar ou qual tipo de relação existe entre elas. Em classificação de grafos, queremos resumir a estrutura inteira.",
      "paragraphs": [
        "Essa distinção é essencial porque muda o que agregamos e o que lemos como saída final. Muitos mal-entendidos começam quando alguém imagina que toda GNN serve do mesmo jeito para qualquer tarefa relacional.",
        "A pergunta certa vem antes da arquitetura: qual unidade do grafo carrega o rótulo de interesse?"
      ],
      "interactive": "graph-neural-networks-tarefas",
      "blocks": [
        {
          "type": "definition",
          "title": "Readout",
          "body": "Operação que transforma representações locais em uma saída no nível desejado, como nó, aresta ou grafo."
        },
        {
          "type": "example",
          "title": "Exemplo",
          "body": "Em moléculas, a tarefa pode ser classificar o grafo inteiro; em redes sociais, pode ser classificar nós; em recomendação, pode ser predizer arestas."
        }
      ]
    },
    {
      "id": "message-passing",
      "eyebrow": "Mecanismo central",
      "title": "Message passing: cada camada espalha e mistura contexto local",
      "lead": "A intuição do message passing é simples: em cada camada, um nó recebe mensagens dos vizinhos, agrega essas mensagens e atualiza sua representação. Repetir esse processo permite incorporar informação de vizinhanças mais distantes.",
      "paragraphs": [
        "Esse esquema cria um viés indutivo relacional poderoso. Em vez de aprender do zero que conexões importam, o modelo já parte da hipótese de que estrutura local e propagação importam para a tarefa.",
        "Mas o mesmo mecanismo que ajuda também cria limites: propagar demais pode misturar informações em excesso ou comprimir dependências distantes em gargalos difíceis."
      ],
      "visual": "graph-neural-networks-message-passing",
      "blocks": [
        {
          "type": "definition",
          "title": "Message passing",
          "body": "Procedimento em que nós trocam, agregam e transformam mensagens ao longo das arestas do grafo."
        },
        {
          "type": "insight",
          "title": "Camada = raio de influência",
          "body": "Cada nova camada amplia, em geral, o alcance relacional considerado por um nó."
        }
      ]
    },
    {
      "id": "limites",
      "eyebrow": "Profundidade",
      "title": "Mais camadas podem gerar oversmoothing e oversquashing",
      "lead": "Oversmoothing ocorre quando, após muitas camadas, representações de nós diferentes ficam parecidas demais. Oversquashing ocorre quando muita informação distante precisa passar por gargalos estreitos da estrutura local.",
      "paragraphs": [
        "Esses dois problemas lembram que profundidade não é sinônimo simples de potência. Em grafos, topologia e agregação interagem de maneiras não triviais com o número de camadas.",
        "Praticamente, isso exige pensar arquitetura com mais cuidado: residuals, attention, sampling, positional encodings e outras técnicas tentam aliviar esses gargalos."
      ],
      "visual": "graph-neural-networks-profundidade",
      "blocks": [
        {
          "type": "definition",
          "title": "Oversmoothing",
          "body": "Fenômeno em que representações de nós perdem distinção após muitas rodadas de agregação."
        },
        {
          "type": "definition",
          "title": "Oversquashing",
          "body": "Compressão excessiva de muita informação distante em canais locais estreitos durante a propagação."
        }
      ]
    },
    {
      "id": "homofilia",
      "eyebrow": "Estrutura do domínio",
      "title": "GNNs funcionam melhor quando o padrão relacional combina com o viés do modelo",
      "lead": "Muitas GNNs clássicas assumem implicitamente homofilia: nós conectados tendem a ser parecidos. Isso ajuda bastante em vários domínios, mas falha quando relações importantes ligam entidades diferentes ou papéis complementares.",
      "paragraphs": [
        "Em grafos heterofílicos, agregar vizinhos indiscriminadamente pode degradar o sinal. O modelo precisa então mecanismos mais finos para distinguir que tipo de vizinho ajuda e em que relação.",
        "A lição conceitual é importante: a estrutura do grafo não é automaticamente informativa da mesma forma em todo domínio."
      ],
      "interactive": "graph-neural-networks-camadas",
      "blocks": [
        {
          "type": "definition",
          "title": "Homofilia",
          "body": "Tendência de nós conectados apresentarem rótulos ou atributos semelhantes."
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Aplicar uma GCN padrão como receita universal sem verificar se a estrutura relacional realmente favorece agregação local simples."
        }
      ]
    },
    {
      "id": "aplicacoes",
      "eyebrow": "Uso real",
      "title": "Moléculas, recomendação e conhecimento mostram a força — e a especificidade — das GNNs",
      "lead": "Em moléculas, GNNs exploram ligações químicas e propriedades locais. Em grafos de conhecimento, aprendem sobre entidades e relações tipadas. Em recomendação, ajudam a combinar histórico de interação e estrutura do sistema.",
      "paragraphs": [
        "O ponto comum é o viés relacional: quando a estrutura importa, GNNs oferecem uma linguagem natural para incorporar essa estrutura ao aprendizado profundo. O ponto de cautela é que cada domínio exige escolhas próprias de construção do grafo, mensagem e readout.",
        "Aprender GNNs bem significa entender esse casamento entre arquitetura e estrutura do dado, e não apenas decorar nomes de modelos."
      ],
      "visual": "graph-neural-networks-aplicacoes",
      "interactive": "graph-neural-networks-usos",
      "blocks": [
        {
          "type": "example",
          "title": "Exemplo",
          "body": "Um grafo de molécula pode representar átomos como nós e ligações como arestas; uma GNN aprende propriedades emergentes a partir dessa composição."
        },
        {
          "type": "insight",
          "title": "A qualidade do grafo decide muito",
          "body": "Construir mal o grafo de entrada pode arruinar até uma arquitetura sofisticada."
        }
      ]
    },
    {
      "id": "resumo-final",
      "eyebrow": "Síntese",
      "title": "Feche o mapa de GNNs pela estrutura",
      "lead": "Revise a relação entre tipo de tarefa, message passing, profundidade e padrão relacional.",
      "paragraphs": [
        "A grande lição é que GNNs aprendem bem quando o viés de agregação combina com a forma relacional do domínio — e falham quando tratamos esse casamento como automático."
      ],
      "interactive": "summary-cards"
    },
    {
      "id": "quiz-revisao",
      "eyebrow": "Revisão",
      "title": "Quiz sobre GNNs",
      "lead": "Teste se ficaram claros o vocabulário, o mecanismo e os principais limites de GNNs.",
      "paragraphs": [
        "As perguntas retomam tarefas em diferentes níveis, message passing, homofilia e problemas de profundidade."
      ],
      "interactive": "quiz"
    },
    {
      "id": "glossario",
      "eyebrow": "Vocabulário",
      "title": "Glossário essencial de aprendizado em grafos",
      "lead": "Consolide os termos básicos para estudar depois arquiteturas específicas como GCN, GAT, GraphSAGE e MPNNs.",
      "paragraphs": [
        "Esse vocabulário é a base para avançar do mapa conceitual para modelos concretos."
      ],
      "interactive": "glossary"
    }
  ],
  "summaryCards": [
    {
      "title": "Estrutura relacional",
      "body": "Em muitos domínios, conexões são parte do sinal e não mero detalhe auxiliar."
    },
    {
      "title": "Message passing",
      "body": "GNNs atualizam representações locais trocando e agregando mensagens entre vizinhos."
    },
    {
      "title": "Profundidade tem custo",
      "body": "Camadas demais podem gerar oversmoothing ou oversquashing."
    },
    {
      "title": "Viés do modelo precisa combinar com o domínio",
      "body": "Homofilia, heterofilia e construção do grafo mudam fortemente o desempenho e a interpretação."
    }
  ],
  "quiz": [
    {
      "id": "q1",
      "prompt": "Por que grafos exigem modelos específicos?",
      "options": [
        {
          "id": "a",
          "label": "Porque as relações entre entidades carregam informação estrutural relevante."
        },
        {
          "id": "b",
          "label": "Porque não possuem atributos."
        },
        {
          "id": "c",
          "label": "Porque não podem ser armazenados em memória."
        }
      ],
      "correctOptionId": "a",
      "feedback": "O diferencial está na informação relacional entre nós e arestas."
    },
    {
      "id": "q2",
      "prompt": "O que é message passing?",
      "options": [
        {
          "id": "a",
          "label": "Processo de trocar, agregar e transformar mensagens entre nós conectados."
        },
        {
          "id": "b",
          "label": "Enviar e-mails entre servidores."
        },
        {
          "id": "c",
          "label": "Uma função de perda exclusiva de grafos."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Message passing é a intuição central de muitas GNNs modernas."
    },
    {
      "id": "q3",
      "prompt": "Qual tarefa está no nível do grafo inteiro?",
      "options": [
        {
          "id": "a",
          "label": "Classificar uma molécula como tóxica ou não."
        },
        {
          "id": "b",
          "label": "Rotular um usuário individual em uma rede."
        },
        {
          "id": "c",
          "label": "Predizer se duas contas vão se conectar."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Nesse caso, a saída resume o grafo inteiro e não só um nó ou aresta."
    },
    {
      "id": "q4",
      "prompt": "O que é oversmoothing?",
      "options": [
        {
          "id": "a",
          "label": "Quando muitas camadas tornam representações de nós diferentes parecidas demais."
        },
        {
          "id": "b",
          "label": "Quando o grafo tem poucas arestas."
        },
        {
          "id": "c",
          "label": "Quando o dataset contém muito ruído textual."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Agregação excessiva pode apagar distinções úteis entre nós."
    },
    {
      "id": "q5",
      "prompt": "O que é oversquashing?",
      "options": [
        {
          "id": "a",
          "label": "Compressão excessiva de informação distante em gargalos locais estreitos."
        },
        {
          "id": "b",
          "label": "Usar poucas features numéricas."
        },
        {
          "id": "c",
          "label": "Aplicar dropout em demasia."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Esse é um limite estrutural importante em grafos com dependências longas."
    },
    {
      "id": "q6",
      "prompt": "Por que homofilia importa em muitas GNNs?",
      "options": [
        {
          "id": "a",
          "label": "Porque vários modelos assumem que vizinhos parecidos ajudam a predição local."
        },
        {
          "id": "b",
          "label": "Porque todo grafo é homogêneo por definição."
        },
        {
          "id": "c",
          "label": "Porque elimina a necessidade de treino."
        }
      ],
      "correctOptionId": "a",
      "feedback": "A agregação local simples funciona melhor quando conexões ligam entidades semelhantes ou compatíveis para a tarefa."
    },
    {
      "id": "q7",
      "prompt": "Qual erro é comum ao aplicar GNNs?",
      "options": [
        {
          "id": "a",
          "label": "Assumir que uma mesma arquitetura serve automaticamente para qualquer grafo e qualquer tarefa."
        },
        {
          "id": "b",
          "label": "Perguntar se o grafo é heterogêneo."
        },
        {
          "id": "c",
          "label": "Escolher um readout para a saída."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Tipo de tarefa, construção do grafo e padrão relacional mudam fortemente a escolha adequada."
    },
    {
      "id": "q8",
      "prompt": "Qual é a melhor síntese da aula?",
      "options": [
        {
          "id": "a",
          "label": "GNNs aprendem em dados relacionais propagando contexto, mas seus vieses e limites precisam combinar com o domínio."
        },
        {
          "id": "b",
          "label": "GNNs sempre superam qualquer outro modelo."
        },
        {
          "id": "c",
          "label": "Profundidade ilimitada é sempre desejável."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Essa é a leitura mais fiel da força e dos limites conceituais das GNNs."
    }
  ],
  "glossary": [
    {
      "term": "Grafo",
      "definition": "Estrutura composta por nós e arestas que representam entidades e relações."
    },
    {
      "term": "Nó",
      "definition": "Entidade individual em um grafo."
    },
    {
      "term": "Aresta",
      "definition": "Conexão entre nós, possivelmente com direção, tipo ou peso."
    },
    {
      "term": "Vizinhança",
      "definition": "Conjunto de nós conectados a um nó dado."
    },
    {
      "term": "Message passing",
      "definition": "Troca e agregação de informações entre nós conectados ao longo das arestas."
    },
    {
      "term": "Readout",
      "definition": "Operação que produz uma saída no nível de nó, aresta ou grafo a partir das representações aprendidas."
    },
    {
      "term": "Oversmoothing",
      "definition": "Perda de distinção entre nós após muitas rodadas de agregação."
    },
    {
      "term": "Oversquashing",
      "definition": "Compressão de muita informação distante em canais locais insuficientes."
    },
    {
      "term": "Homofilia",
      "definition": "Tendência de nós conectados serem semelhantes em atributos ou rótulos."
    },
    {
      "term": "Heterofilia",
      "definition": "Padrão em que conexões relevantes frequentemente ligam nós diferentes ou complementares."
    }
  ]
};
