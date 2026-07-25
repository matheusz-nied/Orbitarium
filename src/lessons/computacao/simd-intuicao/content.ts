import type { LessonContent } from "../../../types/content";

export const simdIntuicaoContent: LessonContent = {
  "id": "simd-intuicao",
  "title": "SIMD: Intuição de Paralelismo de Dados",
  "subtitle": "Quando a mesma operação se repete sobre dados independentes e contíguos, o hardware pode fazer mais trabalho por instrução do que o código escalar sugere.",
  "description": "Aula avançada sobre lanes, vetorização, auto-vectorization, reductions, tails, alignment, contiguidade, limitações práticas e critérios para decidir entre deixar o compilador agir ou descer a intrinsics.",
  "primaryCategoryId": "computacao",
  "secondaryCategoryId": "engenharia",
  "level": "Avançado",
  "estimatedTime": "60-70 min",
  "tags": [
    "SIMD",
    "Vectorization",
    "Lanes",
    "Intrinsics",
    "LLVM",
    "NEON"
  ],
  "learningObjectives": [
    "Construir intuição para SIMD como paralelismo de dados, não como magia de assembly.",
    "Relacionar contiguidade, independência e regularidade do loop à possibilidade de vetorização.",
    "Entender por que branches, aliasing e gathers dificultam auto-vectorization.",
    "Reconhecer o papel de tails, reductions e custo de movimentação de dados.",
    "Decidir quando deixar o compilador vetorizar e quando considerar intrinsics com cautela."
  ],
  "prerequisites": [
    "Cache, localidade e layouts contíguos ajudam muito.",
    "Branch prediction e custo de abstrações são ótimos temas de apoio.",
    "Não é preciso escrever assembly para aproveitar o modelo mental desta aula."
  ],
  "references": [
    {
      "title": "Intel 64 and IA-32 Architectures Optimization Reference Manual",
      "source": "Intel",
      "url": "https://www.intel.com/content/www/us/en/content-details/814198/intel-64-and-ia-32-architectures-optimization-reference-manual-volume-1.html",
      "note": "Manual oficial com capítulos de otimização e uso de arquiteturas SIMD."
    },
    {
      "title": "Intel Intrinsics Guide",
      "source": "Intel",
      "url": "https://www.intel.com/content/www/us/en/docs/intrinsics-guide/index.html",
      "note": "Guia oficial para entender a interface de intrinsics e suporte por ISA."
    },
    {
      "title": "Optimizing C/C++ code with Arm SIMD (Neon)",
      "source": "Arm",
      "url": "https://developer.arm.com/documentation/101458/2404/Optimize/Optimizing-C-C---code-with-Arm-SIMD--Neon-",
      "note": "Referência oficial sobre Neon, auto-vectorization e uso de intrinsics em Arm."
    },
    {
      "title": "Auto-Vectorization in LLVM",
      "source": "LLVM",
      "url": "https://llvm.org/docs/Vectorizers.html",
      "note": "Explica loop vectorizer, SLP vectorizer e limitações práticas."
    },
    {
      "title": "Computer Systems: A Programmer's Perspective",
      "source": "Bryant e O'Hallaron — Carnegie Mellon University",
      "url": "https://csapp.cs.cmu.edu/",
      "note": "Ajuda a ancorar a aula em representação de dados e custo de memória."
    }
  ],
  "heroVisual": "lesson-hero",
  "openingText": "SIMD costuma assustar porque parece pertencer só ao mundo das intrinsics e do assembly. Mas a intuição central é simples: se o mesmo cálculo se repete sobre vários elementos independentes, podemos empacotar esses elementos em lanes e aplicar uma única instrução vetorial sobre todos eles. A dificuldade real não é entender a ideia; é expor ao compilador — ou ao programador que usa intrinsics — um loop suficientemente regular, contíguo e previsível para que isso compense.",
  "quickFacts": [
    {
      "title": "SIMD é paralelismo de dados",
      "body": "A mesma operação avança sobre vários elementos independentes ao mesmo tempo."
    },
    {
      "title": "Contiguidade importa",
      "body": "O ganho aparece melhor quando os dados já estão num formato amigável ao acesso vetorial."
    },
    {
      "title": "Compilador precisa de pista",
      "body": "Alias, branches e chamadas opacas podem impedir vetorização automática."
    },
    {
      "title": "Memória continua mandando",
      "body": "Se o gargalo já é buscar dados, vetorizar a conta pode não ser o grande limitante."
    }
  ],
  "sections": [
    {
      "id": "motivacao",
      "eyebrow": "Motivação",
      "title": "Por que SIMD: Intuição de Paralelismo de Dados muda código real",
      "lead": "Quando o trabalho sobre cada elemento é parecido e independente, a CPU pode deixar de pensar 'um por vez' e começar a pensar em grupos de lanes.",
      "visual": "lesson-hero",
      "paragraphs": [
        "Considere um loop que soma, normaliza ou ajusta brilho em um grande vetor. O padrão do trabalho é repetitivo: a mesma sequência de operações sobre muitos elementos homogêneos.",
        "Esse é o cenário clássico de SIMD. Em vez de executar a mesma instrução para cada elemento escalarmente, o hardware opera sobre pacotes de dados usando registradores vetoriais.",
        "O ganho potencial é grande, mas não automático. Se o acesso é irregular, dependente, cheio de branches imprevisíveis ou sem contiguidade, a oportunidade de vetorização diminui bastante."
      ],
      "blocks": [
        {
          "type": "insight",
          "title": "Pergunta certa",
          "body": "As iterações são independentes e tocam dados contíguos o bastante para serem agrupadas em lanes?"
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Pular direto para intrinsics sem primeiro verificar se o compilador já consegue vetorizar o loop ou se a memória é o gargalo dominante."
        }
      ]
    },
    {
      "id": "modelo-mental",
      "eyebrow": "Modelo mental",
      "title": "A abstração certa para não decorar sem entender",
      "lead": "SIMD é uma forma de ampliar a largura do passo lógico: várias iterações parecidas avançam juntas, desde que o programa exponha esse paralelismo de dados.",
      "visual": "concept-grid",
      "paragraphs": [
        "Cada registrador vetorial pode carregar múltiplos elementos do mesmo tipo. A instrução então atua sobre todas as lanes de uma vez, como se vários cálculos escalares tivessem sido agrupados.",
        "Isso funciona melhor quando os dados são contíguos, o controle de fluxo é simples e não há dependências entre iterações. Por isso layout e regularidade do loop são tão importantes quanto a ISA vetorial em si.",
        "O programador experiente pensa primeiro em abrir espaço para vetorização: dados homogêneos, strides previsíveis, aliasing controlado e estruturas que o compilador consegue raciocinar."
      ],
      "blocks": [
        {
          "type": "definition",
          "title": "Definição",
          "body": "paralelismo de dados em que uma instrução aplica a mesma operação sobre várias lanes de elementos independentes empacotados em registradores vetoriais"
        },
        {
          "type": "example",
          "title": "Exemplo concreto",
          "body": "somar dois vetores contíguos de floats onde cada iteração é independente e pode ser agrupada em lanes"
        }
      ]
    },
    {
      "id": "fluxo-essencial",
      "eyebrow": "Fluxo",
      "title": "O caminho que os dados percorrem",
      "lead": "A sequência conceitual é enxergar independência, expor contiguidade, vetorizar o corpo principal e tratar sobras ou casos especiais no fim.",
      "visual": "pipeline-diagram",
      "interactive": "pipeline-lab",
      "paragraphs": [
        "Primeiro, o loop precisa ser separável: uma iteração não deve depender do resultado imediato da anterior, ou essa dependência precisa ser tratável como reduction controlada.",
        "Depois, os dados devem estar num layout amigável. Colunas, arrays contíguos e strides pequenos ajudam muito; ponteiros soltos e gathers caros atrapalham.",
        "Por fim, o compilador ou o código com intrinsics executa o corpo vetorial e deixa para um tail escalar os elementos restantes. Esse detalhe é parte normal da técnica, não um defeito."
      ],
      "blocks": [
        {
          "type": "example",
          "title": "Etapas para observar",
          "body": "Use a interação para percorrer a pipeline e notar onde surgem custo, contenção, invalidação, cópia, sincronização ou reuso.",
          "items": [
            "Encontrar iterações independentes e repetitivas.",
            "Garantir layout e acesso contíguos o suficiente.",
            "VetorizAR o corpo principal do loop.",
            "Tratar reductions, tails e exceções de fluxo."
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
      "lead": "SIMD pode multiplicar trabalho útil por instrução, mas cobra regularidade de dados, portabilidade adicional e, às vezes, complexidade de implementação.",
      "visual": "tradeoff-spectrum",
      "interactive": "tradeoff-lab",
      "paragraphs": [
        "Auto-vectorization é ótima quando o compilador consegue provar independência e lucratividade. Você preserva código mais simples e deixa a toolchain escolher a largura mais adequada ao alvo.",
        "Intrinsics dão mais controle, porém trazem custo de portabilidade, manutenção e acoplamento à ISA. Além disso, nem toda intrinsic representa uma única instrução eficiente.",
        "Também é preciso lembrar que nem todo loop é compute-bound. Se o caminho já é memory-bound, mais largura vetorial na ALU pode não mover tanto a métrica final quanto reorganizar dados ou reduzir misses."
      ],
      "blocks": [
        {
          "type": "insight",
          "title": "Projeto é posicionamento",
          "body": "O eixo principal vai de código escalar simples e portável até paralelismo de dados mais explícito e dependente de regularidade/ISA."
        },
        {
          "type": "mistake",
          "title": "O mito do extremo ideal",
          "body": "Escrever intrinsics cedo demais pode esconder o problema real — layout ruim ou bound de memória — atrás de código muito mais difícil de manter."
        }
      ]
    },
    {
      "id": "dados-e-lanes",
      "eyebrow": "Intuição",
      "title": "SIMD só parece mágico até você enxergar as lanes",
      "lead": "Pensar em registradores vetoriais como pequenos lotes de dados elimina boa parte do mistério.",
      "paragraphs": [
        "Se um registrador comporta várias lanes do mesmo tipo, somar dois vetores pode significar somar vários pares de elementos com uma única instrução vetorial.",
        "A ideia central não é tão diferente de batching em software: agrupar trabalho homogêneo para amortizar overhead. Aqui, porém, o agrupamento é feito no nível das instruções e registradores.",
        "Essa visão também ajuda a perceber limites. Se os dados não cabem em agrupamentos naturais, ou se cada lane precisaria seguir um caminho de controle muito diferente, o modelo perde eficiência."
      ],
      "blocks": [
        {
          "type": "definition",
          "title": "Lane",
          "body": "Posição individual dentro de um registrador vetorial, tratada em paralelo com as demais pela mesma instrução."
        },
        {
          "type": "example",
          "title": "Bom encaixe",
          "body": "operações aritméticas homogêneas sobre arrays contíguos de números"
        }
      ]
    },
    {
      "id": "porque-o-compilador-nega",
      "eyebrow": "Limites",
      "title": "Por que o compilador às vezes não vetoriza",
      "lead": "Muitas negativas do vetorizer nascem de dúvida legítima: ele não conseguiu provar que a transformação é correta ou lucrativa.",
      "paragraphs": [
        "Dependências entre iterações, aliasing entre ponteiros, chamadas opacas, controle de fluxo complexo e acessos com stride ruim são obstáculos frequentes.",
        "Mesmo reduções e tails precisam de tratamento especial. O compilador pode lidar com vários casos, mas nem sempre o custo modelado compensa no alvo atual.",
        "Isso reforça uma lição importante: otimizar para SIMD quase sempre começa em dados e estrutura do loop, e só raramente em escrever instruções vetoriais diretamente como primeira reação."
      ],
      "blocks": [
        {
          "type": "insight",
          "title": "Compilador prudente",
          "body": "Quando o vetorizer recusa um loop, muitas vezes ele está protegendo correção ou lucratividade, não sendo 'burro'."
        },
        {
          "type": "mistake",
          "title": "Atalho ruim",
          "body": "Forçar branchless ou intrinsics em um loop memory-bound sem resolver contiguidade e aliasing."
        }
      ]
    },
    {
      "id": "armadilhas",
      "eyebrow": "Armadilhas",
      "title": "Erros comuns ao buscar SIMD",
      "lead": "Os maiores tropeços aparecem quando se confunde largura vetorial com ganho garantido.",
      "paragraphs": [
        "Se o loop já espera memória, colocar mais lanes na conta aritmética talvez pouco ajude. O gargalo continua sendo alimentar essas lanes.",
        "Outro erro frequente é ignorar custo de preparação: rearranjar dados, alinhar buffers, tratar tails, manter múltiplos caminhos por ISA e preservar portabilidade tem preço real.",
        "Também é perigoso transformar um kernel simples em um bloco intrincado de intrinsics sem medição robusta. A legibilidade perdida pode ser maior do que o ganho incremental."
      ],
      "blocks": [
        {
          "type": "mistake",
          "title": "Métrica errada",
          "body": "Celebrar uso de intrinsics sem confirmar melhora no throughput ou na latência do fluxo real."
        },
        {
          "type": "insight",
          "title": "SIMD é parte do sistema",
          "body": "Layout, cache, branches e largura de banda continuam determinando se o paralelismo vetorial será bem alimentado."
        }
      ]
    },
    {
      "id": "decisoes-de-projeto",
      "eyebrow": "Prática",
      "title": "Como decidir em vez de só repetir slogans",
      "lead": "A melhor decisão depende da regularidade do loop, do layout dos dados e do quanto a toolchain já consegue entregar sozinha.",
      "interactive": "scenario-lab",
      "paragraphs": [
        "Se o loop é simples, contíguo e repetitivo, o primeiro passo deve ser escrever uma forma amigável ao compilador e verificar se auto-vectorization já resolve.",
        "Se o kernel é crítico, estável e aparece no topo do perfil, intrinsics podem entrar para controle fino — mas com testes, benchmarking e clara justificativa de manutenção.",
        "Se o caminho é branchy, cheio de aliasing ou dominado por memória, talvez valha mais reorganizar dados ou reduzir irregularidade antes de pensar em instruções vetoriais explícitas."
      ],
      "blocks": [
        {
          "type": "example",
          "title": "Heurística de decisão",
          "body": "As recomendações abaixo não são receitas eternas; elas são pontos de partida guiados pelo mecanismo que a aula explicou.",
          "items": [
            "Comece com layout contíguo, aliasing controlado e loop simples o bastante para o vetorizer trabalhar.",
            "Considere intrinsics apenas em kernels muito quentes, bem medidos e com retorno claro sobre o custo de manutenção.",
            "Se o loop é memory-bound, investigue localidade e banda antes de atribuir tudo à falta de SIMD."
          ]
        },
        {
          "type": "definition",
          "title": "Regra prática",
          "body": "exponha independência e contiguidade primeiro; só depois avalie se auto-vectorization basta ou se intrinsics realmente se justificam"
        }
      ]
    },
    {
      "id": "pontes",
      "eyebrow": "Conexões",
      "title": "Como este fundamento reaparece em outros sistemas",
      "lead": "SIMD aparece em áudio, imagem, codecs, ML, bancos colunares, vetores numéricos e qualquer fluxo com dados homogêneos em lote.",
      "visual": "impact-board",
      "paragraphs": [
        "Bibliotecas numéricas e frameworks de ML vivem desse paralelismo de dados: matrizes, tensores e vetores frequentemente se encaixam bem no modelo vetorial quando layout, stride e operação cooperam.",
        "Codecs, filtros de imagem e kernels de áudio também dependem de operações repetitivas sobre coleções contíguas, o que torna SIMD uma ferramenta central.",
        "Mesmo quando você não escreve intrinsics, entender SIMD ajuda a projetar estruturas e loops que a toolchain consegue aproveitar melhor."
      ],
      "blocks": [
        {
          "type": "insight",
          "title": "Transferência de modelo mental",
          "body": "SIMD é menos sobre 'instruções especiais' e mais sobre revelar ao hardware que várias iterações independentes podem andar juntas."
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
        "A essência da aula é enxergar SIMD como consequência de dados independentes e bem organizados, não como feitiço de assembly."
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
        "Esses termos ajudam a conversar sobre vetorização com clareza técnica e menos misticismo."
      ],
      "blocks": []
    }
  ],
  "summaryCards": [
    {
      "title": "SIMD é batching em hardware",
      "body": "A mesma operação avança sobre várias lanes de dados independentes."
    },
    {
      "title": "Contiguidade ajuda muito",
      "body": "Layout e stride definem o quanto o vetorizer consegue aproveitar."
    },
    {
      "title": "Compilador precisa provar",
      "body": "Corretude e lucratividade influenciam auto-vectorization."
    },
    {
      "title": "Intrinsics são ferramenta fina",
      "body": "Entram melhor quando o kernel é muito quente e estável."
    },
    {
      "title": "Tails e reductions são normais",
      "body": "Parte do trabalho vetorial é lidar com sobras e combinações finais."
    },
    {
      "title": "Memória continua soberana",
      "body": "Sem dados bem alimentados, a largura vetorial perde parte do valor."
    }
  ],
  "quiz": [
    {
      "id": "q1",
      "prompt": "Qual ideia central define SIMD?",
      "options": [
        {
          "id": "a",
          "label": "Aplicar a mesma operação a várias lanes de dados independentes ao mesmo tempo."
        },
        {
          "id": "b",
          "label": "Executar várias branches diferentes em paralelo por thread."
        },
        {
          "id": "c",
          "label": "Mover todo o programa para a GPU automaticamente."
        }
      ],
      "correctOptionId": "a",
      "feedback": "SIMD é paralelismo de dados, não paralelismo arbitrário de controle."
    },
    {
      "id": "q2",
      "prompt": "Qual padrão mais favorece vetorização?",
      "options": [
        {
          "id": "a",
          "label": "Loop regular sobre dados contíguos e independentes."
        },
        {
          "id": "b",
          "label": "Acesso totalmente aleatório com múltiplas dependências entre iterações."
        },
        {
          "id": "c",
          "label": "Estrutura recursiva com branches imprevisíveis a cada elemento."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Regularidade e contiguidade abrem a porta para lanes úteis."
    },
    {
      "id": "q3",
      "prompt": "Por que aliasing pode atrapalhar auto-vectorization?",
      "options": [
        {
          "id": "a",
          "label": "Porque o compilador pode não conseguir provar que acessos diferentes não se sobrepõem."
        },
        {
          "id": "b",
          "label": "Porque aliasing desliga a ALU vetorial fisicamente."
        },
        {
          "id": "c",
          "label": "Porque lanes só funcionam com inteiros."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Sem prova de independência, a transformação pode ser incorreta."
    },
    {
      "id": "q4",
      "prompt": "O que é um tail em loops vetorizados?",
      "options": [
        {
          "id": "a",
          "label": "Elementos restantes que não cabem no pacote vetorial principal."
        },
        {
          "id": "b",
          "label": "Um branch sempre mal previsto."
        },
        {
          "id": "c",
          "label": "A linha final do cache L1."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Sobras escalares ou epílogos fazem parte natural do processo."
    },
    {
      "id": "q5",
      "prompt": "Quando intrinsics costumam fazer mais sentido?",
      "options": [
        {
          "id": "a",
          "label": "Em kernels muito quentes, bem medidos e estáveis, quando o controle extra compensa."
        },
        {
          "id": "b",
          "label": "Como primeira reação a qualquer loop numérico."
        },
        {
          "id": "c",
          "label": "Somente em linguagens sem compilador."
        }
      ],
      "correctOptionId": "a",
      "feedback": "O custo de manutenção precisa ser justificado por ganho real."
    },
    {
      "id": "q6",
      "prompt": "Qual é um erro comum ao buscar SIMD?",
      "options": [
        {
          "id": "a",
          "label": "Ignorar que o loop pode estar memory-bound e culpar apenas a falta de vetorização."
        },
        {
          "id": "b",
          "label": "Começar por um loop simples e contíguo."
        },
        {
          "id": "c",
          "label": "Observar o comportamento do compilador."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Mais largura aritmética não resolve automaticamente falta de dados."
    },
    {
      "id": "q7",
      "prompt": "O que a noção de lane representa?",
      "options": [
        {
          "id": "a",
          "label": "Uma posição individual dentro do registrador vetorial processada junto com as demais."
        },
        {
          "id": "b",
          "label": "Uma pilha de chamadas do sistema operacional."
        },
        {
          "id": "c",
          "label": "Uma thread completa do scheduler."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Lane é a unidade elementar do pacote vetorial."
    },
    {
      "id": "q8",
      "prompt": "Qual frase resume o papel do compilador?",
      "options": [
        {
          "id": "a",
          "label": "Ele vetoriza quando consegue provar correção e estimar que o ganho compensa no alvo."
        },
        {
          "id": "b",
          "label": "Ele sempre veta loops por conservadorismo absoluto."
        },
        {
          "id": "c",
          "label": "Ele substitui automaticamente qualquer algoritmo por intrinsics ideais."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Auto-vectorization depende de prova e modelo de custo."
    }
  ],
  "glossary": [
    {
      "term": "SIMD",
      "definition": "Single Instruction, Multiple Data; paralelismo de dados por instrução."
    },
    {
      "term": "Lane",
      "definition": "Posição individual dentro de um registrador vetorial."
    },
    {
      "term": "Vectorization",
      "definition": "Transformação de código escalar em operações vetoriais."
    },
    {
      "term": "Auto-vectorization",
      "definition": "Vetorização feita automaticamente pelo compilador."
    },
    {
      "term": "Intrinsic",
      "definition": "Função especial que expõe instruções ou padrões específicos da ISA ao código de alto nível."
    },
    {
      "term": "Reduction",
      "definition": "Operação que combina vários elementos em um resultado acumulado, como soma total."
    },
    {
      "term": "Tail",
      "definition": "Sobras de elementos que ficam fora do corpo vetorial principal."
    },
    {
      "term": "Alignment",
      "definition": "Alinhamento do dado em memória de modo conveniente para acesso eficiente."
    },
    {
      "term": "Gather",
      "definition": "Leitura vetorial de elementos espalhados em endereços não contíguos."
    },
    {
      "term": "Stride",
      "definition": "Passo entre acessos consecutivos de memória."
    },
    {
      "term": "SLP Vectorizer",
      "definition": "Vectorizer do LLVM que agrupa instruções escalares independentes em vetores."
    },
    {
      "term": "Loop Vectorizer",
      "definition": "Vectorizer do LLVM que amplia iterações de loops regulares para largura vetorial."
    }
  ]
};
