import type { LessonContent } from "../../../types/content";

export const falseSharingECacheLinesContent: LessonContent = {
  "id": "false-sharing-e-cache-lines",
  "title": "False Sharing e Cache Lines",
  "subtitle": "Duas threads podem 'brigar' mesmo escrevendo campos diferentes, desde que esses campos morem na mesma linha de cache.",
  "description": "Aula avançada sobre coerência de cache, granularidade por cache line, line bouncing, false sharing, padding, sharding, per-thread state e diagnóstico com perf c2c e inspeção de layout.",
  "primaryCategoryId": "computacao",
  "secondaryCategoryId": "engenharia",
  "level": "Avançado",
  "estimatedTime": "60-70 min",
  "tags": [
    "False Sharing",
    "Cache Line",
    "Coerência",
    "Multicore",
    "Padding",
    "perf c2c"
  ],
  "learningObjectives": [
    "Explicar por que coerência opera em cache lines e não em campos lógicos isolados.",
    "Distinguir true sharing de false sharing em cenários concorrentes.",
    "Reconhecer sintomas de line bouncing em contadores, filas e estruturas globais.",
    "Avaliar trade-offs entre padding, sharding, memória extra e simplicidade de código.",
    "Planejar uma investigação com métricas e ferramentas em vez de diagnosticar no chute."
  ],
  "prerequisites": [
    "Cache de CPU e cache lines são pré-requisitos importantes.",
    "Concorrência de baixo nível e noção de múltiplos cores ajudam bastante.",
    "Átomos, locks e contadores compartilhados aparecem como exemplos ao longo da aula."
  ],
  "references": [
    {
      "title": "False Sharing",
      "source": "Linux Kernel Documentation",
      "url": "https://docs.kernel.org/kernel-hacking/false-sharing.html",
      "note": "Documentação oficial com definição, sintomas, ferramentas e mitigação."
    },
    {
      "title": "Intel 64 and IA-32 Architectures Optimization Reference Manual",
      "source": "Intel",
      "url": "https://www.intel.com/content/www/us/en/content-details/814198/intel-64-and-ia-32-architectures-optimization-reference-manual-volume-1.html",
      "note": "Manual oficial para entender coerência, acesso multicore e layout eficiente."
    },
    {
      "title": "What Every Programmer Should Know About Memory",
      "source": "Ulrich Drepper",
      "url": "https://www.akkadia.org/drepper/cpumemory.pdf",
      "note": "Excelente referência para coerência, linhas de cache e implicações em software."
    },
    {
      "title": "Arm Cortex-A76 Software Optimization Guide",
      "source": "Arm",
      "url": "https://developer.arm.com/documentation/110661/12-0",
      "note": "Reforça efeitos de acesso multicore, cache e layout em arquiteturas Arm."
    },
    {
      "title": "Computer Systems: A Programmer's Perspective",
      "source": "Bryant e O'Hallaron — Carnegie Mellon University",
      "url": "https://csapp.cs.cmu.edu/",
      "note": "Base para conectar hierarquia de memória, coerência e paralelismo real."
    }
  ],
  "heroVisual": "lesson-hero",
  "openingText": "False sharing é um daqueles bugs de performance que parecem absurdos na primeira vez. 'Mas cada thread atualiza seu próprio contador; como isso pode gerar contenção?' A resposta está na granularidade do hardware: a coerência de cache não protege campos lógicos, e sim linhas inteiras. Se dois campos independentes dividem a mesma cache line, um write de um core invalida a cópia do outro. O dado lógico é diferente; o pedaço físico de memória é o mesmo.",
  "quickFacts": [
    {
      "title": "Coerência é por linha",
      "body": "O protocolo trabalha sobre a cache line inteira, não sobre o campo que você imaginou estar isolado."
    },
    {
      "title": "Leitura também sofre",
      "body": "Um campo read-mostly pode ser arrastado para a guerra se morar ao lado de um contador muito escrito."
    },
    {
      "title": "Padding ajuda, mas custa",
      "body": "Separar por linha consome memória e pode ampliar pressão de cache e TLB."
    },
    {
      "title": "Diagnóstico exige evidência",
      "body": "Contenção invisível precisa de profiling e inspeção de layout, não de palpite."
    }
  ],
  "sections": [
    {
      "id": "motivacao",
      "eyebrow": "Motivação",
      "title": "Por que False Sharing e Cache Lines muda código real",
      "lead": "Em multicore, a disputa pode surgir não porque duas threads compartilham o mesmo valor, mas porque compartilham o mesmo pedaço físico do cache.",
      "visual": "lesson-hero",
      "paragraphs": [
        "False sharing aparece quando diferentes threads tocam variáveis lógicas distintas que residem na mesma cache line, e pelo menos uma delas escreve. O protocolo de coerência precisa invalidar ou mover a linha inteira, mesmo que os campos sejam conceitualmente independentes.",
        "Isso causa line bouncing: a linha passa de cache em cache à medida que diferentes cores tentam obter permissão de escrita. O custo não vem da aritmética do contador, e sim da coreografia de invalidações e transferências.",
        "Por isso, às vezes um contador por thread ainda escala mal. O programador 'separou' os contadores no código, mas não os separou fisicamente na granularidade que o hardware enxerga."
      ],
      "blocks": [
        {
          "type": "definition",
          "title": "False sharing",
          "body": "Contenção causada por acessos concorrentes a campos diferentes que residem na mesma cache line, com pelo menos um writer."
        },
        {
          "type": "mistake",
          "title": "Leitura ingênua",
          "body": "Achar que 'variáveis diferentes' implicam automaticamente independência física para o hardware."
        }
      ]
    },
    {
      "id": "modelo-mental",
      "eyebrow": "Modelo mental",
      "title": "A abstração certa para não decorar sem entender",
      "lead": "O modelo mental certo é este: coerência preserva consistência de cache lines, então qualquer campo vizinho pode pagar a conta de um write frequente.",
      "visual": "concept-grid",
      "paragraphs": [
        "Quando um core quer escrever numa linha, ele precisa posse exclusiva daquela linha ou de um estado compatível com escrita. Isso já sugere o problema: a unidade em disputa é o bloco inteiro.",
        "Se outro core mantém uma cópia para leitura, ou também quer escrever outro campo da mesma linha, a coerência entra em ação. O hardware está sendo correto; o software é que empacotou dados incompatíveis no mesmo endereço quente.",
        "Esse raciocínio ajuda a distinguir false sharing de lock contention. Você pode ter uma estrutura sem lock explícito e ainda assim sofrer contenção forte por layout ruim."
      ],
      "blocks": [
        {
          "type": "definition",
          "title": "Definição",
          "body": "contenção emergente de coerência em que campos lógicos independentes brigam por uma mesma cache line por causa de escritas concorrentes"
        },
        {
          "type": "example",
          "title": "Exemplo concreto",
          "body": "um struct com contador de referência muito atualizado ao lado de um nome lido por várias threads, provocando recargas repetidas da linha inteira"
        }
      ]
    },
    {
      "id": "fluxo-essencial",
      "eyebrow": "Fluxo",
      "title": "O caminho que os dados percorrem",
      "lead": "O caminho do false sharing é curto: um core escreve, a linha invalida em outro, a posse exclusiva muda de lugar e o trabalho útil fica refém do transporte da linha.",
      "visual": "pipeline-diagram",
      "interactive": "pipeline-lab",
      "paragraphs": [
        "O primeiro passo é a escrita frequente num campo. Em seguida, a coerência invalida cópias alheias daquela linha ou exige transições de estado para permitir a escrita.",
        "Quando outro core toca um campo vizinho da mesma linha, precisa recarregar ou recuperar a linha, mesmo sem relação semântica direta com o campo anterior. Essa ida e volta é o line bouncing.",
        "Mitigação quase sempre envolve layout: separar fisicamente, shardear por thread, transformar dado global em agregação posterior ou mover leitura fria para outra região."
      ],
      "blocks": [
        {
          "type": "example",
          "title": "Etapas para observar",
          "body": "Use a interação para percorrer a pipeline e notar onde surgem custo, contenção, invalidação, cópia, sincronização ou reuso.",
          "items": [
            "Uma thread escreve um campo muito quente.",
            "A coerência invalida ou move a linha inteira.",
            "Outra thread toca um vizinho e paga a recarga.",
            "O software separa linhas ou reduz escritas compartilhadas."
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
      "lead": "Blindar cada campo com sua própria linha pode reduzir contenção, mas aumenta consumo de memória, pressão de cache e custo de manutenção.",
      "visual": "tradeoff-spectrum",
      "interactive": "tradeoff-lab",
      "paragraphs": [
        "Padding, alignment explícito e structs com espaço de sobra são armas poderosas contra false sharing. Mas elas expandem a pegada de memória e podem reduzir a densidade útil das estruturas.",
        "Sharding e contadores por thread costumam escalar melhor do que um contador global, porém exigem agregação posterior e mudam semântica de leitura imediata.",
        "A decisão madura depende de quão quente é a escrita, quão frequente é a leitura compartilhada e quão caro é ampliar a estrutura física."
      ],
      "blocks": [
        {
          "type": "insight",
          "title": "Projeto é posicionamento",
          "body": "O eixo aqui é densidade de memória versus isolamento físico entre writers e leitores compartilhados."
        },
        {
          "type": "mistake",
          "title": "O mito do extremo ideal",
          "body": "Padding indiscriminado em todas as estruturas desperdiça memória e esconde o problema real: nem todo dado é quente o suficiente para merecer uma linha dedicada."
        }
      ]
    },
    {
      "id": "true-vs-false-sharing",
      "eyebrow": "Diagnóstico",
      "title": "True sharing e false sharing não são a mesma dor",
      "lead": "Em true sharing, as threads realmente precisam do mesmo valor. Em false sharing, elas só herdaram a mesma linha.",
      "paragraphs": [
        "Se várias threads incrementam o mesmo contador global, existe disputa lógica pelo mesmo estado. Nesse caso, padding não resolve a semântica compartilhada; talvez seja preciso shardear ou mudar o algoritmo.",
        "Em false sharing, o estado lógico poderia ser independente. A contenção nasce apenas porque o empacotamento físico colocou vizinhos incompatíveis na mesma linha.",
        "Essa distinção importa muito: a mitigação de true sharing costuma exigir mudança de coordenação; a mitigação de false sharing costuma exigir mudança de layout."
      ],
      "blocks": [
        {
          "type": "definition",
          "title": "True sharing",
          "body": "Várias threads disputam o mesmo dado lógico, então a coordenação é necessária por semântica."
        },
        {
          "type": "definition",
          "title": "Line bouncing",
          "body": "Migração repetida da posse de uma cache line entre cores por causa de escritas concorrentes."
        }
      ]
    },
    {
      "id": "medir-e-mitigar",
      "eyebrow": "Ferramentas",
      "title": "Como investigar sem transformar o tema em superstição",
      "lead": "False sharing raramente se prova só olhando para o código; é preciso cruzar hotspot, endereço e layout.",
      "paragraphs": [
        "Um bom caminho começa no profiler para confirmar que existe um hotspot sob carga concorrente. Depois, ferramentas voltadas para cache-to-cache ajudam a localizar linhas com tráfego excessivo entre cores.",
        "A documentação do kernel destaca perf c2c para capturar linhas quentes e pahole para entender offsets de campos em structs. A ideia é sair do sintoma e chegar ao membro exato da estrutura.",
        "Na mitigação, opções comuns são padding seletivo, alinhamento, per-thread state, contadores agregados e reordenação de campos para afastar leitores frios de writers quentes."
      ],
      "blocks": [
        {
          "type": "example",
          "title": "Ferramentas úteis",
          "body": "perf c2c aponta linhas quentes; inspeção de layout mostra quais campos moram naquela linha."
        },
        {
          "type": "insight",
          "title": "Métrica antes da cura",
          "body": "Sem evidência de line bouncing, padding pode resolver um problema imaginário e criar outro real."
        }
      ]
    },
    {
      "id": "armadilhas",
      "eyebrow": "Armadilhas",
      "title": "Erros comuns ao tentar curar false sharing",
      "lead": "O maior erro é enxergar toda contenção como false sharing ou toda escrita atômica como culpada automática.",
      "paragraphs": [
        "Alguns problemas são simplesmente true sharing: um único contador global, uma fila central com cabeça compartilhada ou um lock realmente disputado. Nesses casos, separar linhas não remove a dependência semântica.",
        "Também é comum esquecer o custo colateral do padding. Estruturas maiores ocupam mais linhas, aumentam a pegada de cache e podem prejudicar varreduras que antes eram compactas.",
        "Por fim, mover um campo quente para longe resolve pouco se o algoritmo ainda força todos os workers a convergirem num mesmo ponto global a cada passo."
      ],
      "blocks": [
        {
          "type": "mistake",
          "title": "Atalho perigoso",
          "body": "Concluir 'é false sharing' sem antes provar que a disputa vem de vizinhos independentes e não do mesmo dado lógico."
        },
        {
          "type": "insight",
          "title": "Solução boa muda o formato do conflito",
          "body": "A melhor correção reduz a necessidade de troca de linha, e não apenas esconde o problema visualmente."
        }
      ]
    },
    {
      "id": "decisoes-de-projeto",
      "eyebrow": "Prática",
      "title": "Como decidir em vez de só repetir slogans",
      "lead": "A boa decisão depende menos de gosto e mais de temperatura de escrita, topologia de threads e custo agregado de memória.",
      "interactive": "scenario-lab",
      "paragraphs": [
        "Se cada worker atualiza seu próprio contador, per-thread storage seguido de redução costuma ser um ponto de partida excelente. A escrita fica local; a sincronização vai para um momento controlado.",
        "Se uma estrutura precisa mesmo de um contador compartilhado, vale verificar se o campo quente pode ser isolado do restante do registro, evitando arrastar leitores inocentes para a disputa.",
        "Quando o estado é lido raramente, talvez o melhor seja aceitar leitura agregada posterior em troca de escalabilidade muito melhor na fase quente."
      ],
      "blocks": [
        {
          "type": "example",
          "title": "Heurística de decisão",
          "body": "As recomendações abaixo não são receitas eternas; elas são pontos de partida guiados pelo mecanismo que a aula explicou.",
          "items": [
            "Use estado por thread ou por shard quando a operação puder ser agregada depois.",
            "Isole contadores, flags ou head/tail muito escritos dos metadados majoritariamente lidos.",
            "Meça o custo total da expansão estrutural antes de padronizar padding como solução universal."
          ]
        },
        {
          "type": "definition",
          "title": "Regra prática",
          "body": "separe primeiro os campos com escrita concorrente frequente antes de mexer em atomics, fences ou micro-otimizações de instrução"
        }
      ]
    },
    {
      "id": "pontes",
      "eyebrow": "Conexões",
      "title": "Como este fundamento reaparece em outros sistemas",
      "lead": "False sharing aparece em kernels, runtimes, serviços de alta taxa, filas, telemetria e qualquer pipeline multicore que combine escrita quente com layout ingênuo.",
      "visual": "impact-board",
      "paragraphs": [
        "Kernels lidam com esse tema o tempo todo porque estruturas globais pequenas podem escalar muito mal quando muitos cores atualizam campos vizinhos em paralelo.",
        "Runtimes de linguagem, pools de workers e bibliotecas de métricas também tropeçam nesse problema quando usam contadores, slots ou buffers aparentemente independentes mas fisicamente colados.",
        "Aprender false sharing amplia seu repertório de leitura de perfil: você passa a desconfiar não só de lock, mas também do formato da memória compartilhada."
      ],
      "blocks": [
        {
          "type": "insight",
          "title": "Transferência de modelo mental",
          "body": "Em multicore, layout também é uma política de sincronização implícita: quem mora junto numa linha pode acabar sincronizando à força."
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
        "A grande virada mental é lembrar que o hardware enxerga linhas inteiras em disputa, não as fronteiras semânticas do seu struct."
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
        "Esses termos ajudam a ler contenção física em multicore com mais precisão."
      ],
      "blocks": []
    }
  ],
  "summaryCards": [
    {
      "title": "Coerência opera por linha",
      "body": "Variáveis diferentes podem disputar a mesma cache line."
    },
    {
      "title": "False sharing é físico",
      "body": "O conflito nasce do layout, não necessariamente da semântica do dado."
    },
    {
      "title": "True sharing pede outra cura",
      "body": "Semântica compartilhada não se resolve só com padding."
    },
    {
      "title": "Line bouncing custa caro",
      "body": "A linha viaja entre caches e atrasa trabalho útil."
    },
    {
      "title": "Ferramentas importam",
      "body": "Hotspot, endereço e layout precisam ser cruzados."
    },
    {
      "title": "Padding é remédio seletivo",
      "body": "Ajuda muito em pontos quentes, mas cobra em memória."
    }
  ],
  "quiz": [
    {
      "id": "q1",
      "prompt": "O que caracteriza false sharing?",
      "options": [
        {
          "id": "a",
          "label": "Campos lógicos diferentes na mesma cache line, com pelo menos uma escrita concorrente."
        },
        {
          "id": "b",
          "label": "Duas threads lendo o mesmo valor sem nunca escrever."
        },
        {
          "id": "c",
          "label": "Qualquer uso de atomic em qualquer programa."
        }
      ],
      "correctOptionId": "a",
      "feedback": "O conflito nasce na granularidade física da cache line."
    },
    {
      "id": "q2",
      "prompt": "Por que a coerência provoca o problema?",
      "options": [
        {
          "id": "a",
          "label": "Porque ela trabalha sobre a linha inteira, não sobre o campo individual."
        },
        {
          "id": "b",
          "label": "Porque a ALU não diferencia variáveis."
        },
        {
          "id": "c",
          "label": "Porque caches só guardam bytes isolados."
        }
      ],
      "correctOptionId": "a",
      "feedback": "A invalidação e a posse exclusiva acontecem por cache line."
    },
    {
      "id": "q3",
      "prompt": "Qual situação descreve true sharing?",
      "options": [
        {
          "id": "a",
          "label": "Várias threads disputam o mesmo contador lógico."
        },
        {
          "id": "b",
          "label": "Cada thread escreve seu próprio contador em linhas diferentes."
        },
        {
          "id": "c",
          "label": "Um campo textual frio é lido por uma única thread."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Nesse caso existe dependência semântica no mesmo dado."
    },
    {
      "id": "q4",
      "prompt": "Qual ferramenta a documentação do kernel cita para localizar linhas suspeitas?",
      "options": [
        {
          "id": "a",
          "label": "perf c2c"
        },
        {
          "id": "b",
          "label": "tcpdump"
        },
        {
          "id": "c",
          "label": "gdb tui"
        }
      ],
      "correctOptionId": "a",
      "feedback": "A documentação oficial menciona perf c2c para investigar compartilhamento de cache line."
    },
    {
      "id": "q5",
      "prompt": "Qual mitigação costuma funcionar bem quando cada worker atualiza estado próprio?",
      "options": [
        {
          "id": "a",
          "label": "Sharding ou estado por thread com agregação posterior."
        },
        {
          "id": "b",
          "label": "Mais branches no hot path."
        },
        {
          "id": "c",
          "label": "Trocar todo atomic por mutex global."
        }
      ],
      "correctOptionId": "a",
      "feedback": "A escrita local reduz a necessidade de trocar a mesma linha entre cores."
    },
    {
      "id": "q6",
      "prompt": "Qual é o risco de padronizar padding em toda estrutura?",
      "options": [
        {
          "id": "a",
          "label": "Aumentar pegada de memória e piorar outros percursos de cache."
        },
        {
          "id": "b",
          "label": "Eliminar qualquer paralelismo do programa."
        },
        {
          "id": "c",
          "label": "Quebrar o tipo da linguagem automaticamente."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Padding é útil, mas cobra em densidade e footprint."
    },
    {
      "id": "q7",
      "prompt": "Qual frase resume melhor line bouncing?",
      "options": [
        {
          "id": "a",
          "label": "A posse de uma mesma linha viaja repetidamente entre cores por causa de writes."
        },
        {
          "id": "b",
          "label": "A thread salta entre funções pequenas."
        },
        {
          "id": "c",
          "label": "A RAM física muda de posição no barramento."
        }
      ],
      "correctOptionId": "a",
      "feedback": "É o movimento repetido da linha quente entre caches."
    },
    {
      "id": "q8",
      "prompt": "Qual erro de diagnóstico é especialmente comum?",
      "options": [
        {
          "id": "a",
          "label": "Chamar toda contenção de false sharing sem separar layout físico de semântica compartilhada."
        },
        {
          "id": "b",
          "label": "Usar profiler antes de mexer no código."
        },
        {
          "id": "c",
          "label": "Alinhar uma estrutura crítica."
        }
      ],
      "correctOptionId": "a",
      "feedback": "É preciso distinguir conflito lógico de conflito físico."
    }
  ],
  "glossary": [
    {
      "term": "Cache line",
      "definition": "Bloco básico sobre o qual cache e coerência operam."
    },
    {
      "term": "Coerência de cache",
      "definition": "Mecanismo que mantém visão consistente entre caches de diferentes cores."
    },
    {
      "term": "False sharing",
      "definition": "Contenção por layout quando campos independentes dividem uma mesma linha com writes concorrentes."
    },
    {
      "term": "True sharing",
      "definition": "Compartilhamento real do mesmo dado lógico entre threads."
    },
    {
      "term": "Line bouncing",
      "definition": "Migração repetida da posse de uma linha entre cores."
    },
    {
      "term": "Padding",
      "definition": "Espaço adicional usado para separar fisicamente campos quentes."
    },
    {
      "term": "Alignment",
      "definition": "Alinhamento de dados em fronteiras convenientes para hardware ou ABI."
    },
    {
      "term": "Sharding",
      "definition": "Particionamento de estado para reduzir disputa global."
    },
    {
      "term": "Per-thread state",
      "definition": "Estado local a cada thread, agregado depois se necessário."
    },
    {
      "term": "Hotspot",
      "definition": "Trecho ou estrutura que concentra custo relevante em profiling."
    },
    {
      "term": "perf c2c",
      "definition": "Ferramenta do ecossistema perf voltada a analisar tráfego cache-to-cache."
    },
    {
      "term": "pahole",
      "definition": "Ferramenta usada para inspecionar layout e offsets de structs."
    }
  ]
};
