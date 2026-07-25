import type { LessonContent } from "../../../types/content";

export const stackVsHeapNaPraticaContent: LessonContent = {
  "id": "stack-vs-heap-na-pratica",
  "title": "Stack vs Heap na Prática",
  "subtitle": "A pergunta madura não é 'stack é mais rápida?', e sim 'que lifetime, tamanho, compartilhamento e escape este valor realmente exige?'.",
  "description": "Aula sobre stack e heap como escolhas de lifetime e representação, escape analysis mental, custo de indirection, cópia por valor, crescimento de estruturas e como diferentes linguagens materializam essas decisões.",
  "primaryCategoryId": "computacao",
  "secondaryCategoryId": "engenharia",
  "level": "Intermediário",
  "estimatedTime": "55-65 min",
  "tags": [
    "Stack",
    "Heap",
    "Escape Analysis",
    "Lifetime",
    "Indireção",
    "Ownership"
  ],
  "learningObjectives": [
    "Reforçar stack e heap como políticas de lifetime e não como ranking simplista de velocidade.",
    "Construir um modelo mental de escape analysis aplicável além de uma linguagem específica.",
    "Reconhecer o custo de indireção, cópia, crescimento e compartilhamento em estruturas reais.",
    "Interpretar por que o compilador move certos valores para o heap.",
    "Tomar decisões mais informadas sobre buffers, objetos grandes e APIs que compartilham dados."
  ],
  "prerequisites": [
    "A aula de stack, heap e ponteiros é base direta.",
    "Noções de função, retorno e referência ajudam bastante.",
    "Vale já ter alguma intuição de cache para entender o custo de indireção e cópia."
  ],
  "references": [
    {
      "title": "Computer Systems: A Programmer's Perspective",
      "source": "Bryant e O'Hallaron — Carnegie Mellon University",
      "url": "https://csapp.cs.cmu.edu/",
      "note": "Base para stack frames, heap, indireção e custo real de representação."
    },
    {
      "title": "Using Box<T> to Point to Data on the Heap",
      "source": "The Rust Programming Language",
      "url": "https://doc.rust-lang.org/book/ch15-01-box.html",
      "note": "Explica quando usar heap por indirection e ownership em Rust."
    },
    {
      "title": "A Guide to the Go Garbage Collector",
      "source": "The Go Programming Language",
      "url": "https://go.dev/doc/gc-guide",
      "note": "Guia oficial com explicações práticas sobre escape analysis e heap allocations em Go."
    },
    {
      "title": "Go Wiki: Compiler And Runtime Optimizations",
      "source": "The Go Programming Language",
      "url": "https://go.dev/wiki/CompilerOptimizations",
      "note": "Resume como observar decisões de escape analysis e inlining no compilador Go."
    },
    {
      "title": "compile command",
      "source": "Go Packages",
      "url": "https://pkg.go.dev/cmd/compile",
      "note": "Documenta aspectos do compilador, incluindo detalhes ligados a escape analysis."
    }
  ],
  "heroVisual": "lesson-hero",
  "openingText": "A frase 'stack é mais rápida que heap' tem um fundo de verdade, mas vira mau conselho quando usada sozinha. Um valor pode ir para o heap porque precisa sobreviver ao escopo, porque será compartilhado, porque cresce dinamicamente ou porque o compilador não conseguiu provar que ele fica local. A escolha, portanto, não é um ranking moral; é uma consequência do lifetime e da representação exigida pelo programa. Entender isso evita tanto heroísmo prematuro quanto abstrações caras demais.",
  "quickFacts": [
    {
      "title": "Stack combina com escopo",
      "body": "Frames locais seguem naturalmente entrada e saída de função."
    },
    {
      "title": "Heap compra flexibilidade",
      "body": "Dados podem viver além de um escopo ou ser compartilhados por múltiplos donos."
    },
    {
      "title": "Escape é contexto",
      "body": "O mesmo valor pode ou não escapar conforme o uso que a função faz dele."
    },
    {
      "title": "Indireção também custa",
      "body": "Mesmo quando a heap é necessária, ponteiros extras e reuso ruim de cache entram na conta."
    }
  ],
  "sections": [
    {
      "id": "motivacao",
      "eyebrow": "Motivação",
      "title": "Por que Stack vs Heap na Prática muda código real",
      "lead": "O desempenho de uma estrutura depende menos do rótulo 'stack' ou 'heap' e mais do contrato de vida útil e da forma de acesso que esse contrato força.",
      "visual": "lesson-hero",
      "paragraphs": [
        "Valores locais e curtos combinam muito bem com a stack porque o frame já existe para sustentar a chamada. Criar e descartar esse contexto é extremamente natural para a execução.",
        "Por outro lado, muitos dados úteis precisam sobreviver ao retorno, crescer dinamicamente, ser movidos entre componentes ou compartilhados por múltiplos consumidores. A heap atende justamente essa demanda de flexibilidade.",
        "O ponto importante é abandonar o slogan simplista. O que realmente interessa é por que aquele valor precisa daquela região e qual custo essa decisão injeta em cópia, indireção, coleta, sincronização ou localidade."
      ],
      "blocks": [
        {
          "type": "insight",
          "title": "Pergunta certa",
          "body": "Este valor pode permanecer local ao escopo atual ou precisa escapar, crescer ou ser compartilhado?"
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Reescrever APIs só para 'forçar stack' sem entender o lifetime e o padrão real de acesso."
        }
      ]
    },
    {
      "id": "modelo-mental",
      "eyebrow": "Modelo mental",
      "title": "A abstração certa para não decorar sem entender",
      "lead": "Escape analysis mental é uma forma de raciocinar sobre quem ainda precisa do dado depois que o escopo atual termina.",
      "visual": "concept-grid",
      "paragraphs": [
        "Se um valor nunca precisa viver além da chamada e cabe bem no contexto local, a stack tende a ser um bom encaixe natural. Se o dado precisa sair dali vivo, alguma forma de alocação dinâmica costuma aparecer.",
        "Compiladores tentam provar esse raciocínio automaticamente. Em Go, por exemplo, escape analysis decide quando um valor precisa ir para o heap. Em Rust, tipos como Box<T> tornam a indirection e o ownership explícitos.",
        "Mesmo sem depender de uma linguagem específica, a pergunta conceitual é a mesma: quem guarda o dado, por quanto tempo e com que forma de acesso? Essa tríade costuma explicar a escolha muito melhor do que slogans sobre velocidade."
      ],
      "blocks": [
        {
          "type": "definition",
          "title": "Definição",
          "body": "raciocinar se um valor permanece confinado ao escopo local ou se precisa sobreviver, crescer ou ser compartilhado além dele"
        },
        {
          "type": "example",
          "title": "Exemplo concreto",
          "body": "uma função que cria um buffer local e retorna uma referência para ele força uma contradição de lifetime; alguma outra representação precisa assumir esse dado"
        }
      ]
    },
    {
      "id": "fluxo-essencial",
      "eyebrow": "Fluxo",
      "title": "O caminho que os dados percorrem",
      "lead": "O ciclo prático passa por declarar, usar, possivelmente deixar escapar e então observar como a representação escolhida altera cópia, posse e acesso.",
      "visual": "pipeline-diagram",
      "interactive": "pipeline-lab",
      "paragraphs": [
        "O valor nasce em algum contexto: um frame local, um container dinâmico, um objeto compartilhado ou uma estrutura que cresce sob demanda. Essa origem já sugere custos diferentes.",
        "Se o dado é passado adiante apenas por valor pequeno, talvez a cópia seja barata. Se ele passa a viver por referência, mover-se para o heap ou para outra abstração de ownership pode ser inevitável.",
        "O efeito final é sentido em vários lugares: tamanho do frame, número de indireções, pressão sobre o coletor ou o alocador, e facilidade de manter o dado válido pelo tempo necessário."
      ],
      "blocks": [
        {
          "type": "example",
          "title": "Etapas para observar",
          "body": "Use a interação para percorrer a pipeline e notar onde surgem custo, contenção, invalidação, cópia, sincronização ou reuso.",
          "items": [
            "Declarar e usar o valor dentro do escopo atual.",
            "Perguntar se ele precisa escapar, crescer ou ser compartilhado.",
            "Escolher representação coerente com esse lifetime.",
            "Observar custo em cópia, indireção, localidade e gerenciamento."
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
      "lead": "Stack privilegia simplicidade local; heap privilegia flexibilidade de lifetime. As duas podem ser corretas, e o erro nasce quando o contrato não é explícito.",
      "visual": "tradeoff-spectrum",
      "interactive": "tradeoff-lab",
      "paragraphs": [
        "Valores locais em stack podem ser muito eficientes porque evitam mecanismos extras de gerenciamento e combinam com a disciplina de chamada e retorno. Mas isso só ajuda se o dado realmente for local.",
        "A heap é uma solução importante quando o programa precisa mover ou compartilhar objetos, construir estruturas recursivas ou crescer buffers dinamicamente. Ela não é 'ruim'; apenas cobra formas diferentes de administração.",
        "Em engenharia madura, a pergunta não é quem vence para sempre. É qual escolha torna o lifetime verdadeiro do dado mais claro e menos caro para o caminho quente do sistema."
      ],
      "blocks": [
        {
          "type": "insight",
          "title": "Projeto é posicionamento",
          "body": "O eixo aqui é duração local e previsível versus compartilhamento e lifetime flexível."
        },
        {
          "type": "mistake",
          "title": "O mito do extremo ideal",
          "body": "Forçar tudo para a stack por reflexo pode inflar cópias, complicar APIs ou simplesmente lutar contra o lifetime real do problema."
        }
      ]
    },
    {
      "id": "stack-nao-e-magica",
      "eyebrow": "Nuance",
      "title": "Stack não é mágica; ela apenas combina melhor com certos contratos",
      "lead": "A vantagem da stack nasce da simplicidade do contexto local, e não de um poder especial desvinculado do uso.",
      "paragraphs": [
        "Alocar na stack normalmente significa usar espaço associado ao frame da função ou ao stack frame da goroutine/thread. Isso tende a ser barato porque a infraestrutura já existe para a chamada.",
        "Mas nem todo dado deveria morar ali. Objetos muito grandes, estruturas recursivas profundas ou cópias excessivas por valor também podem prejudicar o desempenho ou o limite de memória local.",
        "A lição é importante: stack ajuda quando o contrato de uso combina com ela. Fora disso, insistir nela vira uma forma de esconder o problema em vez de resolvê-lo."
      ],
      "blocks": [
        {
          "type": "insight",
          "title": "Regra prática",
          "body": "Stack ganha quando o dado é local, curto e com tamanho razoável para o contexto da chamada."
        },
        {
          "type": "mistake",
          "title": "Slogan ruim",
          "body": "Trocar toda indirection por cópias grandes só porque 'stack é mais rápida'."
        }
      ]
    },
    {
      "id": "escape-analysis-mental",
      "eyebrow": "Compilador",
      "title": "Escape analysis é um raciocínio, não uma superstição do compilador",
      "lead": "Quando um valor cruza certas fronteiras de uso, o compilador pode não conseguir mantê-lo como local mesmo que o código pareça simples.",
      "paragraphs": [
        "Retornar referências a dados locais, armazenar valores em estruturas compartilhadas, capturá-los por closures ou passá-los a APIs que prolongam sua vida são formas clássicas de escape conceitual.",
        "Ferramentas do compilador ajudam a observar essas decisões. Em Go, flags de otimização mostram por que valores escapam. Isso ensina a reorganizar o código quando a mudança realmente vale a pena.",
        "Mesmo em linguagens com modelos diferentes, pensar em escape ajuda a escrever APIs melhores: quem fica dono do dado, quem só empresta, e quando uma indirection explícita é o preço natural da flexibilidade."
      ],
      "blocks": [
        {
          "type": "definition",
          "title": "Escape analysis",
          "body": "Análise que tenta provar se um valor pode permanecer local ou precisa ir para uma representação de vida útil mais longa."
        },
        {
          "type": "example",
          "title": "Sinal clássico",
          "body": "guardar ponteiro ou referência para além do escopo que originalmente hospedava o valor"
        }
      ]
    },
    {
      "id": "armadilhas",
      "eyebrow": "Armadilhas",
      "title": "Os erros mais comuns misturam lifetime, cópia e indirection",
      "lead": "Às vezes a heap é necessária e o erro é combatê-la. Em outras, a indirection foi introduzida cedo demais e espalhou custo sem necessidade.",
      "paragraphs": [
        "Um engano recorrente é transformar dados pequenos e curtos em ponteiros só porque 'passar por referência parece mais eficiente'. Muitas vezes isso piora localidade e complica ownership sem ganho real.",
        "Outro erro é ignorar que containers dinâmicos trazem seus próprios contratos. O valor pode começar local, mas ao crescer, ser movido ou compartilhado, a representação muda de categoria.",
        "Também vale lembrar que GC, borrow checking, smart pointers ou allocators diferentes são maneiras de lidar com o mesmo problema central: provar que o dado continua válido enquanto houver usuários legítimos."
      ],
      "blocks": [
        {
          "type": "mistake",
          "title": "Falsa otimização",
          "body": "Introduzir ponteiros e heap para valores pequenos sem necessidade de lifetime estendida ou compartilhamento real."
        },
        {
          "type": "insight",
          "title": "Forma segue lifetime",
          "body": "Quando o tempo de vida e o acesso ficam claros, a escolha entre stack e heap deixa de parecer mística."
        }
      ]
    },
    {
      "id": "decisoes-de-projeto",
      "eyebrow": "Prática",
      "title": "Como decidir em vez de só repetir slogans",
      "lead": "A melhor decisão costuma cair de três perguntas: quem precisa do dado depois, quanto ele cresce e quantos caminhos de acesso devem observá-lo.",
      "interactive": "scenario-lab",
      "paragraphs": [
        "Para valores pequenos e confinados a uma função, a solução mais simples costuma ser deixá-los locais e diretos. Menos indirection, menos complexidade mental.",
        "Para estruturas que sobrevivem ao retorno, crescem sob demanda ou participam de ownership compartilhada, a heap e seus contratos associados passam a fazer sentido.",
        "Entre esses extremos, vale considerar o custo real da cópia, o efeito sobre localidade e o nível de clareza que a API oferece sobre posse e mutação."
      ],
      "blocks": [
        {
          "type": "example",
          "title": "Heurística de decisão",
          "body": "As recomendações abaixo não são receitas eternas; elas são pontos de partida guiados pelo mecanismo que a aula explicou.",
          "items": [
            "Mantenha local o que de fato morre no escopo atual e não precisa de owner externo.",
            "Use heap quando o valor deve sobreviver, crescer dinamicamente ou circular por múltiplos contextos.",
            "Observe o compilador e o profiler antes de reestruturar código só para forçar uma determinada região de memória."
          ]
        },
        {
          "type": "definition",
          "title": "Regra prática",
          "body": "comece pelo lifetime e pelo padrão de acesso; a região de memória correta costuma cair dessa análise em vez de ser escolhida por slogan"
        }
      ]
    },
    {
      "id": "pontes",
      "eyebrow": "Conexões",
      "title": "Como este fundamento reaparece em outros sistemas",
      "lead": "Essa intuição volta em coleções, builders, APIs de I/O, motores de concorrência, ownership em Rust e profiling de heap em Go.",
      "visual": "impact-board",
      "paragraphs": [
        "Quando você entende stack vs heap como semântica de lifetime, começa a ler APIs de coleção, smart pointers e containers dinâmicos com muito mais clareza.",
        "Em Go, heap profile e escape diagnostics ajudam a ver onde a flexibilidade custa. Em Rust, tipos e ownership deixam mais explícita a decisão de onde e por quanto tempo o dado viverá.",
        "Essa visão é valiosa em qualquer linguagem: otimização madura começa em contrato de vida útil, não em slogans sobre uma região de memória ser sempre superior à outra."
      ],
      "blocks": [
        {
          "type": "insight",
          "title": "Transferência de modelo mental",
          "body": "Stack e heap são geografia guiada por lifetime; entender essa geografia melhora design de API, profiling e raciocínio de custo."
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
        "A pergunta central desta aula é sempre sobre lifetime real, não sobre slogans de velocidade isolados."
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
        "O vocabulário abaixo ajuda a discutir lifetime, ownership e representação com mais precisão."
      ],
      "blocks": []
    }
  ],
  "summaryCards": [
    {
      "title": "Stack combina com escopo",
      "body": "Dados locais e curtos se encaixam naturalmente em frames de chamada."
    },
    {
      "title": "Heap compra flexibilidade",
      "body": "Sobrevivência, crescimento e compartilhamento costumam exigir outra representação."
    },
    {
      "title": "Escape é contextual",
      "body": "O mesmo valor pode ou não escapar dependendo da API e do uso."
    },
    {
      "title": "Indirection também custa",
      "body": "Heap resolve lifetime, mas pode adicionar ponteiros, misses e gerenciamento."
    },
    {
      "title": "Cópia entra na conta",
      "body": "Às vezes evitar heap com cópias grandes piora o sistema."
    },
    {
      "title": "Lifetime guia a escolha",
      "body": "Representação boa é a que torna o contrato mais claro e menos caro."
    }
  ],
  "quiz": [
    {
      "id": "q1",
      "prompt": "Qual pergunta é mais útil ao pensar em stack vs heap?",
      "options": [
        {
          "id": "a",
          "label": "Esse dado precisa sobreviver, crescer ou ser compartilhado além do escopo atual?"
        },
        {
          "id": "b",
          "label": "Qual região de memória soa mais avançada?"
        },
        {
          "id": "c",
          "label": "Qual escolha usa mais ponteiros?"
        }
      ],
      "correctOptionId": "a",
      "feedback": "Lifetime e forma de acesso explicam melhor a decisão do que slogans."
    },
    {
      "id": "q2",
      "prompt": "Por que a stack costuma ser eficiente?",
      "options": [
        {
          "id": "a",
          "label": "Porque combina naturalmente com o contexto local de chamada e retorno."
        },
        {
          "id": "b",
          "label": "Porque pode armazenar qualquer estrutura arbitrária sem custo."
        },
        {
          "id": "c",
          "label": "Porque elimina toda cópia automaticamente."
        }
      ],
      "correctOptionId": "a",
      "feedback": "A simplicidade do frame local é a principal vantagem."
    },
    {
      "id": "q3",
      "prompt": "Quando a heap costuma entrar em cena?",
      "options": [
        {
          "id": "a",
          "label": "Quando o dado precisa sobreviver ao escopo, crescer dinamicamente ou ser compartilhado."
        },
        {
          "id": "b",
          "label": "Somente para variáveis numéricas."
        },
        {
          "id": "c",
          "label": "Apenas quando há recursion."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Esses cenários exigem flexibilidade de lifetime ou representação."
    },
    {
      "id": "q4",
      "prompt": "O que escape analysis tenta provar?",
      "options": [
        {
          "id": "a",
          "label": "Se um valor pode permanecer local ou precisa de vida útil mais longa."
        },
        {
          "id": "b",
          "label": "Se o programa cabe na RAM física."
        },
        {
          "id": "c",
          "label": "Se a função deve ser executada em outra CPU."
        }
      ],
      "correctOptionId": "a",
      "feedback": "A análise gira em torno de lifetime e representação."
    },
    {
      "id": "q5",
      "prompt": "Qual é um erro clássico de otimização?",
      "options": [
        {
          "id": "a",
          "label": "Introduzir ponteiros e heap para valores pequenos sem necessidade real."
        },
        {
          "id": "b",
          "label": "Usar valor local dentro de uma função."
        },
        {
          "id": "c",
          "label": "Medir perfil antes de mudar código."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Indirection desnecessária pode piorar localidade e clareza."
    },
    {
      "id": "q6",
      "prompt": "Qual frase resume bem a heap?",
      "options": [
        {
          "id": "a",
          "label": "Ela não é ruim; ela resolve contratos de lifetime que a stack não atende sozinha."
        },
        {
          "id": "b",
          "label": "Ela sempre destrói performance."
        },
        {
          "id": "c",
          "label": "Ela existe apenas por causa de garbage collectors."
        }
      ],
      "correctOptionId": "a",
      "feedback": "A heap é uma ferramenta de flexibilidade, não um fracasso automático."
    },
    {
      "id": "q7",
      "prompt": "Por que evitar slogans como 'stack sempre vence'?",
      "options": [
        {
          "id": "a",
          "label": "Porque cópia, tamanho, acesso e lifetime podem tornar a escolha oposta mais correta."
        },
        {
          "id": "b",
          "label": "Porque stack não existe em máquinas modernas."
        },
        {
          "id": "c",
          "label": "Porque compiladores ignoram stack."
        }
      ],
      "correctOptionId": "a",
      "feedback": "O custo total depende do uso real do dado."
    },
    {
      "id": "q8",
      "prompt": "Qual estratégia costuma ser madura?",
      "options": [
        {
          "id": "a",
          "label": "Observar compilador e profiler antes de reestruturar código para forçar uma região de memória."
        },
        {
          "id": "b",
          "label": "Trocar todo container dinâmico por arrays fixos sem medir."
        },
        {
          "id": "c",
          "label": "Assumir que toda referência implica bug."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Mudanças boas aparecem em lifetime claro e métricas melhores."
    }
  ],
  "glossary": [
    {
      "term": "Stack",
      "definition": "Região associada ao contexto local de chamadas e retornos."
    },
    {
      "term": "Heap",
      "definition": "Região de memória usada para alocação dinâmica e lifetime flexível."
    },
    {
      "term": "Frame de stack",
      "definition": "Bloco com contexto local de uma chamada de função."
    },
    {
      "term": "Escape analysis",
      "definition": "Análise que tenta decidir se um valor precisa sair do contexto local."
    },
    {
      "term": "Lifetime",
      "definition": "Período em que um dado permanece válido para uso."
    },
    {
      "term": "Ownership",
      "definition": "Relação de posse e responsabilidade sobre o ciclo de vida de um objeto."
    },
    {
      "term": "Indireção",
      "definition": "Acesso ao dado via ponteiro, referência ou handle intermediário."
    },
    {
      "term": "Cópia por valor",
      "definition": "Duplicação do conteúdo do dado ao passá-lo ou atribuí-lo diretamente."
    },
    {
      "term": "Box",
      "definition": "Tipo que representa dados alocados no heap com ownership explícita em Rust."
    },
    {
      "term": "GC",
      "definition": "Garbage collector, mecanismo que ajuda a gerenciar objetos na heap."
    },
    {
      "term": "Compartilhamento",
      "definition": "Situação em que múltiplos caminhos precisam observar ou usar o mesmo dado."
    },
    {
      "term": "Buffer dinâmico",
      "definition": "Estrutura cujo tamanho pode crescer conforme a carga ou o uso."
    }
  ]
};
