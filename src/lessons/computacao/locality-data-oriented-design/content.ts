import type { LessonContent } from "../../../types/content";

export const localityDataOrientedDesignContent: LessonContent = {
  "id": "locality-data-oriented-design",
  "title": "Locality e Data-Oriented Design",
  "subtitle": "Quando um programa parece 'CPU-bound', muitas vezes ele está perdendo tempo esperando dados espalhados demais para o hardware consumir bem.",
  "description": "Aula sobre localidade, layouts orientados a acesso, hot/cold split, AoS vs SoA, batches, data pipelines e por que representar dados pelo percurso dominante costuma render mais do que micro-otimizações isoladas.",
  "primaryCategoryId": "computacao",
  "secondaryCategoryId": "engenharia",
  "level": "Intermediário",
  "estimatedTime": "55-65 min",
  "tags": [
    "Localidade",
    "Data-Oriented Design",
    "AoS",
    "SoA",
    "Cache",
    "Layout"
  ],
  "learningObjectives": [
    "Explicar por que localidade é uma propriedade de layout e de percurso, não só de algoritmo abstrato.",
    "Comparar arranjos como Array of Structs e Struct of Arrays pelo padrão de acesso quente.",
    "Reconhecer hot/cold split e batching como ferramentas de projeto, não truques cosméticos.",
    "Conectar modelagem de dados com misses de cache, prefetch e desperdício de banda.",
    "Decidir quando um design mais orientado a dados compensa a perda de flexibilidade estrutural."
  ],
  "prerequisites": [
    "Cache de CPU e localidade espacial ajudam muito.",
    "Stack, heap e ponteiros ajudam a visualizar layout e indireção.",
    "Já ter implementado arrays, listas ou objetos torna os exemplos mais concretos."
  ],
  "references": [
    {
      "title": "Computer Systems: A Programmer's Perspective",
      "source": "Bryant e O'Hallaron — Carnegie Mellon University",
      "url": "https://csapp.cs.cmu.edu/",
      "note": "Referência-base para hierarquia de memória, localidade e desempenho observado por software."
    },
    {
      "title": "What Every Programmer Should Know About Memory",
      "source": "Ulrich Drepper",
      "url": "https://www.akkadia.org/drepper/cpumemory.pdf",
      "note": "Texto clássico sobre custo real de layout, cache e acesso à memória."
    },
    {
      "title": "Intel 64 and IA-32 Architectures Optimization Reference Manual",
      "source": "Intel",
      "url": "https://www.intel.com/content/www/us/en/content-details/814198/intel-64-and-ia-32-architectures-optimization-reference-manual-volume-1.html",
      "note": "Manual oficial de otimização com recomendações práticas de layout, prefetch e acesso eficiente."
    },
    {
      "title": "Arm Cortex-A76 Software Optimization Guide",
      "source": "Arm",
      "url": "https://developer.arm.com/documentation/110661/12-0",
      "note": "Guia oficial de otimização que reforça a importância de acesso contíguo e previsível."
    },
    {
      "title": "Memory Hierarchy, Revisited",
      "source": "UC Berkeley CS 61C Notes",
      "url": "https://notes.cs61c.org/content/caches-intro/memory-hierarchy/",
      "note": "Notas didáticas modernas para ligar localidade, cache e estrutura de dados."
    }
  ],
  "heroVisual": "lesson-hero",
  "openingText": "Muita modelagem nasce do jeito como gostamos de nomear entidades. Mas o processador não executa 'conceitos'; ele percorre bytes em alguma ordem. Se a atualização mais frequente do seu sistema lê posição, velocidade e estado de um milhão de itens, o formato desses bytes passa a importar tanto quanto a lógica do loop. Data-Oriented Design começa justamente quando você troca a pergunta 'como representar o mundo?' por 'como os dados serão consumidos de verdade?'.",
  "quickFacts": [
    {
      "title": "Layout é comportamento",
      "body": "O formato físico dos dados influencia diretamente quantas linhas de cache você toca para fazer o mesmo trabalho lógico."
    },
    {
      "title": "AoS e SoA não são rivais absolutos",
      "body": "Cada layout favorece um tipo de leitura e de atualização."
    },
    {
      "title": "Hot/cold split reduz desperdício",
      "body": "Separar campos raros dos campos quentes evita trazer bytes que o loop não vai usar."
    },
    {
      "title": "DOD não é antiabstração",
      "body": "A ideia é escolher abstrações que preservem o percurso dominante da memória."
    }
  ],
  "sections": [
    {
      "id": "motivacao",
      "eyebrow": "Motivação",
      "title": "Por que Locality e Data-Oriented Design muda código real",
      "lead": "Quando o código visita muitos objetos grandes para usar poucos campos, o gargalo costuma ser a viagem até os dados, não a conta feita sobre eles.",
      "visual": "lesson-hero",
      "paragraphs": [
        "Imagine um loop que atualiza a posição de cem mil entidades. Se cada entidade guarda dezenas de campos, mas o passo atual precisa apenas de posição e velocidade, o processador acaba arrastando para o cache muita informação inútil. O trabalho lógico parece simples, mas o tráfego de memória fica caro.",
        "É por isso que dois programas ambos O(n) podem se comportar de forma radicalmente diferente. Um percorre memória de forma compacta, previsível e amigável ao prefetch. Outro vive perseguindo ponteiros e carregando estruturas gordas para usar só um pedaço.",
        "Locality e Data-Oriented Design importam porque organizam os dados a partir do acesso quente. Em vez de pensar primeiro em 'objetos bonitos', você pensa no fluxo de leitura, escrita e reuso que a máquina realmente executa."
      ],
      "blocks": [
        {
          "type": "insight",
          "title": "Sinal clássico",
          "body": "Se o profiler mostra muito tempo em loops simples, vale suspeitar menos do operador aritmético e mais do layout dos dados."
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Assumir que basta trocar linguagem ou compilador quando o verdadeiro desperdício está na forma como os bytes foram agrupados."
        }
      ]
    },
    {
      "id": "modelo-mental",
      "eyebrow": "Modelo mental",
      "title": "A abstração certa para não decorar sem entender",
      "lead": "Data-Oriented Design reorganiza estruturas segundo a pergunta 'quais campos são lidos juntos e com qual frequência?'.",
      "visual": "concept-grid",
      "paragraphs": [
        "A definição útil aqui não é ideológica. Data-Oriented Design é a prática de escolher layout, agrupamento e ordem de travessia segundo o padrão de acesso dominante do sistema.",
        "Isso desloca o foco da entidade conceitual para a unidade quente de trabalho. Às vezes a unidade quente é 'um registro completo'. Em outras, é só uma coluna, um vetor de componentes ou um bloco contíguo pronto para SIMD.",
        "Quando você enxerga a unidade quente, a discussão sobre desempenho muda. Deixa de ser um debate genérico sobre 'código rápido' e passa a ser uma escolha concreta sobre contiguidade, indireção, reuso e largura de banda."
      ],
      "blocks": [
        {
          "type": "definition",
          "title": "Definição",
          "body": "organizar dados, campos e iterações de acordo com o padrão de acesso dominante, minimizando indireção e desperdício de memória trazida ao cache"
        },
        {
          "type": "example",
          "title": "Exemplo concreto",
          "body": "um sistema de partículas que atualiza posições e velocidades em vetores contíguos em vez de visitar objetos cheios de campos irrelevantes a cada frame"
        }
      ]
    },
    {
      "id": "fluxo-essencial",
      "eyebrow": "Fluxo",
      "title": "O caminho que os dados percorrem",
      "lead": "Projetos orientados a dados costumam nascer em quatro movimentos: descobrir o loop quente, reorganizar os campos, iterar em blocos e medir se os misses realmente caíram.",
      "visual": "pipeline-diagram",
      "interactive": "pipeline-lab",
      "paragraphs": [
        "O primeiro passo é identificar o percurso frequente: scan, atualização, filtro, agregação, render ou serialização. Sem esse passo, a modelagem vira chute.",
        "Depois, agrupamos juntos os campos que andam juntos. Isso pode significar trocar ponteiros por arrays contíguos, separar dados frios, ou transformar objetos ricos em colunas simples para uma fase crítica.",
        "Por fim, mede-se o efeito. A boa modelagem de dados reduz bytes inúteis carregados, melhora o reuso e geralmente simplifica também auto-vectorização, batching e paralelismo por partições."
      ],
      "blocks": [
        {
          "type": "example",
          "title": "Etapas para observar",
          "body": "Use a interação para percorrer a pipeline e notar onde surgem custo, contenção, invalidação, cópia, sincronização ou reuso.",
          "items": [
            "Encontrar o loop ou a consulta realmente quentes.",
            "Agrupar campos que são consumidos em conjunto.",
            "Executar a travessia em lotes contíguos e previsíveis.",
            "Medir se o custo caiu em cache misses, throughput ou latência."
          ]
        },
        {
          "type": "insight",
          "title": "Fluxos distribuem responsabilidade",
          "body": "Otimizações robustas quase sempre nascem quando você identifica em qual etapa o custo realmente aparece, em vez de atacar o sintoma final."
        }
      ]
    },
    {
      "id": "tradeoffs",
      "eyebrow": "Trade-offs",
      "title": "A escolha que nunca é gratuita",
      "lead": "Layouts mais orientados a acesso melhoram a memória, mas pedem disciplina extra para manter legibilidade e consistência entre diferentes vistas do mesmo dado.",
      "visual": "tradeoff-spectrum",
      "interactive": "tradeoff-lab",
      "paragraphs": [
        "Representações no estilo objeto tradicional ajudam a encapsular e aproximar dados de uma entidade conceitual. Isso é excelente para partes do sistema com muita variedade de comportamento e pouco volume de travessia.",
        "Já loops de alto volume costumam preferir estruturas achatadas, colunas e blocos homogêneos. O ganho vem da localidade e da previsibilidade, não de um 'truque secreto' do compilador.",
        "O ponto maduro não é adotar um estilo único. É separar onde vale uma representação orientada a manutenção e onde vale uma representação orientada ao percurso quente da memória."
      ],
      "blocks": [
        {
          "type": "insight",
          "title": "Projeto é posicionamento",
          "body": "O eixo aqui não é 'OO versus DOD' como religião; é flexibilidade estrutural versus fluxo contíguo de dados no caminho realmente quente."
        },
        {
          "type": "mistake",
          "title": "O mito do extremo ideal",
          "body": "Transformar todo o sistema em colunas especializadas sem distinguir partes frias e partes quentes costuma criar complexidade administrativa maior do que o ganho real."
        }
      ]
    },
    {
      "id": "layout-e-percurso",
      "eyebrow": "Layout",
      "title": "Layout é uma decisão algorítmica",
      "lead": "AoS, SoA e layouts híbridos são maneiras diferentes de responder à pergunta: quais bytes precisam viajar juntos?",
      "paragraphs": [
        "Em Array of Structs, cada elemento traz consigo todos os seus campos. Isso ajuda quando você realmente consome o registro inteiro de uma vez. Mas pode ser desperdiçador quando o loop usa só um subconjunto pequeno.",
        "Em Struct of Arrays, cada campo quente vira uma coluna contígua. Scans, filtros, reduções e kernels numéricos costumam gostar disso porque a CPU atravessa bytes homogêneos, com menos desperdício por linha de cache.",
        "Na prática, muitos sistemas usam arranjos híbridos: dados quentes em colunas ou blocos compactos; dados frios, textuais ou raramente consultados em outra estrutura. É um compromisso de engenharia, não uma conversão estética."
      ],
      "blocks": [
        {
          "type": "definition",
          "title": "AoS",
          "body": "Array of Structs: sequência de registros completos, útil quando muitos campos do mesmo objeto são consumidos juntos."
        },
        {
          "type": "definition",
          "title": "SoA",
          "body": "Struct of Arrays: cada campo vira uma sequência própria, útil quando o loop lê a mesma coluna em muitos elementos."
        }
      ]
    },
    {
      "id": "dados-quentes-e-frios",
      "eyebrow": "Projeto",
      "title": "Separe dados quentes, dados frios e metadados raros",
      "lead": "Muitas estruturas ficam lentas não pelo dado essencial, mas pela bagagem que acompanha cada elemento sem ser usada na fase crítica.",
      "paragraphs": [
        "Hot/cold split funciona quando você identifica um conjunto de campos consultados o tempo todo e outro consultado apenas em eventos raros, depuração, serialização ou telas administrativas.",
        "Ao separar essas partes, o loop quente deixa de carregar nomes, ponteiros, descrições ou configurações que não participa daquele cálculo. A memória gasta continua existindo, mas o tráfego do caminho crítico cai.",
        "Essa separação também ajuda paralelismo e vectorização porque cada worker passa a operar sobre blocos menores e mais homogêneos. O mesmo raciocínio aparece em engines, bancos colunares, codecs e pipelines de IA."
      ],
      "blocks": [
        {
          "type": "insight",
          "title": "Pergunta certa",
          "body": "Se um campo não entra no hot path, ele não precisa morar ao lado do campo que entra milhares de vezes por segundo."
        },
        {
          "type": "example",
          "title": "Exemplo típico",
          "body": "pos, vel e massa num bloco quente; nome, debug tags e estatísticas históricas num bloco frio"
        }
      ]
    },
    {
      "id": "armadilhas",
      "eyebrow": "Armadilhas",
      "title": "Onde times bons erram ao aplicar DOD",
      "lead": "O erro clássico não é ignorar localidade, e sim tentar forçá-la sem medir o caminho quente ou sem respeitar a fase de escrita.",
      "paragraphs": [
        "Há casos em que SoA acelera a leitura, mas complica tanto inserção, remoção, sincronização ou reconstrução de entidades que o custo total do sistema piora. O ciclo completo precisa entrar na conta.",
        "Outro erro frequente é mover campos para arrays separados sem resolver a indireção principal: IDs dispersos, ponteiros encadeados ou filtros imprevisíveis continuam destruindo o percurso.",
        "Também vale evitar a conclusão automática de que DOD significa 'sem abstrações'. O objetivo é criar abstrações que preservem acesso eficiente, não escrever um mar de índices opacos impossível de manter."
      ],
      "blocks": [
        {
          "type": "mistake",
          "title": "Slogan ruim",
          "body": "Trocar tudo para SoA só porque 'cache gosta', sem provar qual consulta realmente domina o custo."
        },
        {
          "type": "insight",
          "title": "Regra de sanidade",
          "body": "Se a reestruturação não vier acompanhada de um percurso quente explícito e de uma métrica, ela provavelmente virou ritual."
        }
      ]
    },
    {
      "id": "decisoes-de-projeto",
      "eyebrow": "Prática",
      "title": "Como decidir em vez de só repetir slogans",
      "lead": "Layouts bons são contextuais. O melhor desenho para um scan massivo não é automaticamente o melhor para uma estrutura cheia de mutações irregulares.",
      "interactive": "scenario-lab",
      "paragraphs": [
        "O primeiro filtro de decisão é o tipo de acesso: você lê colunas, atualiza registros completos, filtra por poucos campos ou visita grafos cheios de ponteiros? A resposta muda a representação certa.",
        "O segundo filtro é frequência. Um caminho executado milhares de vezes por segundo merece mais cuidado com layout do que uma rotina administrativa ocasional.",
        "O terceiro filtro é custo de manutenção. Às vezes vale manter duas visões do mesmo dado: uma forma rica para o domínio e uma forma compacta para o processamento quente."
      ],
      "blocks": [
        {
          "type": "example",
          "title": "Heurística de decisão",
          "body": "As recomendações abaixo não são receitas eternas; elas são pontos de partida guiados pelo mecanismo que a aula explicou.",
          "items": [
            "Use colunas ou blocos contíguos quando o trabalho principal for scan, filtro, soma, transform ou física em lote.",
            "Mantenha registros mais completos quando o fluxo principal manipular a entidade inteira e com pouca cardinalidade.",
            "Considere hot/cold split antes de reescrever todo o modelo; muitas vezes essa separação já entrega boa parte do ganho."
          ]
        },
        {
          "type": "definition",
          "title": "Regra prática",
          "body": "modele pelo percurso mais frequente e mais caro do sistema, não pela taxonomia mais elegante em abstrato"
        }
      ]
    },
    {
      "id": "pontes",
      "eyebrow": "Conexões",
      "title": "Como este fundamento reaparece em outros sistemas",
      "lead": "A mesma intuição aparece muito além de engines: bancos colunares, inferência, imagens, codecs, telemetry pipelines e até serialização de rede repetem esse jogo entre layout e percurso.",
      "visual": "impact-board",
      "paragraphs": [
        "Sistemas de banco colunar organizam dados por coluna porque a consulta costuma ler poucas colunas em muitas linhas. Isso é Data-Oriented Design aplicado a analytics.",
        "Frameworks de ML e kernels numéricos tratam tensores como blocos contíguos precisamente para alimentar bem cache, SIMD e paralelismo por lote.",
        "Mesmo aplicações web se beneficiam disso quando transformam logs, métricas, eventos ou lotes de payloads em estruturas compactas para processamento massivo."
      ],
      "blocks": [
        {
          "type": "insight",
          "title": "Transferência de modelo mental",
          "body": "Modelar dados pelo acesso dominante é uma ideia transversal: ela reaparece sempre que o volume de travessia supera o conforto de uma representação puramente conceitual."
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
        "Mais importante que decorar AoS e SoA é saber perguntar quais bytes andam juntos no caminho quente e quanto lixo eles arrastam."
      ],
      "blocks": []
    },
    {
      "id": "glossario",
      "eyebrow": "Glossário",
      "title": "Termos essenciais",
      "lead": "Feche a aula consolidando o vocabulário que sustenta as decisões de projeto discutidas aqui.",
      "interactive": "glossary",
      "paragraphs": [
        "Esses termos conectam modelagem de dados, cache, SIMD e throughput de sistemas reais."
      ],
      "blocks": []
    }
  ],
  "summaryCards": [
    {
      "title": "Localidade é projeto",
      "body": "A forma como os dados são agrupados muda o custo do mesmo algoritmo lógico."
    },
    {
      "title": "AoS e SoA servem a percursos diferentes",
      "body": "O layout ideal depende do que é lido ou escrito em conjunto."
    },
    {
      "title": "Hot/cold split reduz bagagem",
      "body": "Campos raros não precisam viajar com o hot path."
    },
    {
      "title": "Batches ajudam o hardware",
      "body": "Percursos previsíveis melhoram prefetch, cache e vectorização."
    },
    {
      "title": "DOD não é dogma",
      "body": "É uma resposta a pressão real de volume e latência."
    },
    {
      "title": "Meça o percurso dominante",
      "body": "Sem um hot path explícito, reestruturação vira ritual."
    }
  ],
  "quiz": [
    {
      "id": "q1",
      "prompt": "Qual pergunta melhor guia Data-Oriented Design?",
      "options": [
        {
          "id": "a",
          "label": "Como os dados serão consumidos de verdade no hot path?"
        },
        {
          "id": "b",
          "label": "Qual nome de classe fica mais elegante no diagrama?"
        },
        {
          "id": "c",
          "label": "Qual estrutura usa mais padrões de orientação a objetos?"
        }
      ],
      "correctOptionId": "a",
      "feedback": "DOD parte do percurso dominante de leitura e escrita."
    },
    {
      "id": "q2",
      "prompt": "Quando Array of Structs costuma funcionar bem?",
      "options": [
        {
          "id": "a",
          "label": "Quando o loop consome vários campos do mesmo registro ao mesmo tempo."
        },
        {
          "id": "b",
          "label": "Quando só uma coluna é lida em milhões de elementos."
        },
        {
          "id": "c",
          "label": "Quando toda leitura é totalmente aleatória."
        }
      ],
      "correctOptionId": "a",
      "feedback": "AoS faz sentido quando o registro completo é a unidade quente."
    },
    {
      "id": "q3",
      "prompt": "Qual situação favorece Struct of Arrays?",
      "options": [
        {
          "id": "a",
          "label": "Scans que leem o mesmo campo em muitos elementos contíguos."
        },
        {
          "id": "b",
          "label": "Operações que sempre precisam reconstruir o objeto inteiro."
        },
        {
          "id": "c",
          "label": "Estruturas com pouquíssimos dados e quase nenhum volume."
        }
      ],
      "correctOptionId": "a",
      "feedback": "SoA costuma brilhar em percursos colunares e homogêneos."
    },
    {
      "id": "q4",
      "prompt": "O que hot/cold split tenta reduzir?",
      "options": [
        {
          "id": "a",
          "label": "Bytes inúteis trazidos ao cache junto do dado realmente quente."
        },
        {
          "id": "b",
          "label": "O número de instruções aritméticas por operação."
        },
        {
          "id": "c",
          "label": "A necessidade de qualquer tipo de abstração."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Separar dados frios evita carregar bagagem irrelevante no caminho crítico."
    },
    {
      "id": "q5",
      "prompt": "Por que layout pode mudar um algoritmo O(n)?",
      "options": [
        {
          "id": "a",
          "label": "Porque o custo real também depende de misses, indireção e largura de banda."
        },
        {
          "id": "b",
          "label": "Porque complexidade assintótica deixa de valer em hardware moderno."
        },
        {
          "id": "c",
          "label": "Porque o compilador troca a linguagem sem avisar."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Dois O(n) podem percorrer a memória de formas muito diferentes."
    },
    {
      "id": "q6",
      "prompt": "Qual é um erro clássico ao aplicar DOD?",
      "options": [
        {
          "id": "a",
          "label": "Migrar tudo para colunas sem provar qual acesso domina o custo."
        },
        {
          "id": "b",
          "label": "Usar arrays em qualquer lugar."
        },
        {
          "id": "c",
          "label": "Separar dados quentes de dados frios."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Sem um percurso quente explícito, a mudança vira slogan."
    },
    {
      "id": "q7",
      "prompt": "Qual frase resume melhor a relação entre DOD e abstração?",
      "options": [
        {
          "id": "a",
          "label": "O objetivo é preservar acesso eficiente, não eliminar abstrações por esporte."
        },
        {
          "id": "b",
          "label": "Abstração e desempenho são sempre incompatíveis."
        },
        {
          "id": "c",
          "label": "DOD só serve para C e C++."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Boas abstrações podem expor percursos eficientes sem sacrificar totalmente o domínio."
    },
    {
      "id": "q8",
      "prompt": "Em qual cenário DOD tende a aparecer naturalmente?",
      "options": [
        {
          "id": "a",
          "label": "Scans, filtros ou atualizações massivas sobre grandes coleções homogêneas."
        },
        {
          "id": "b",
          "label": "Rotinas raras de administração com baixo volume."
        },
        {
          "id": "c",
          "label": "Código de configuração executado uma vez no startup."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Pressão de throughput e repetição tornam layout uma decisão central."
    }
  ],
  "glossary": [
    {
      "term": "Localidade",
      "definition": "Propriedade de reutilizar dados recentes ou vizinhos no espaço de endereços."
    },
    {
      "term": "Data-Oriented Design",
      "definition": "Projeto que organiza dados segundo o padrão de acesso dominante."
    },
    {
      "term": "AoS",
      "definition": "Array of Structs, em que cada elemento armazena um registro completo."
    },
    {
      "term": "SoA",
      "definition": "Struct of Arrays, em que cada campo vira sua própria sequência contígua."
    },
    {
      "term": "Hot path",
      "definition": "Trecho ou percurso de execução que concentra grande parte do custo."
    },
    {
      "term": "Hot/cold split",
      "definition": "Separação entre campos quentes e campos raros para reduzir desperdício."
    },
    {
      "term": "Indireção",
      "definition": "Acesso que depende de ponteiros, índices ou referências extras até o dado."
    },
    {
      "term": "Scan",
      "definition": "Percurso sequencial sobre muitos elementos de uma coleção."
    },
    {
      "term": "Batching",
      "definition": "Processamento em lotes para melhorar previsibilidade e amortizar overhead."
    },
    {
      "term": "Prefetch",
      "definition": "Mecanismo de hardware que tenta trazer dados antes de eles serem usados."
    },
    {
      "term": "Largura de banda de memória",
      "definition": "Quantidade de dados que pode ser movida por unidade de tempo."
    },
    {
      "term": "Banco colunar",
      "definition": "Sistema que organiza registros por coluna, não por linha, para favorecer certas consultas."
    }
  ]
};
