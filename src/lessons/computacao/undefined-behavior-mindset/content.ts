import type { LessonContent } from "../../../types/content";

export const undefinedBehaviorMindsetContent: LessonContent = {
  "id": "undefined-behavior-mindset",
  "title": "Mindset de Undefined Behavior",
  "subtitle": "UB não é 'azar em produção': é quebrar contratos que o compilador usa para otimizar e raciocinar sobre seu programa.",
  "description": "Aula avançada sobre comportamento indefinido como quebra de invariantes, aliasing, validade de referências, alinhamento, uninitialized memory, raw pointers, unsafe boundaries e atitude mental correta para escrever código de baixo nível sem autoengano.",
  "primaryCategoryId": "computacao",
  "secondaryCategoryId": "engenharia",
  "level": "Avançado",
  "estimatedTime": "60-70 min",
  "tags": [
    "Undefined Behavior",
    "Unsafe",
    "Aliasing",
    "Rustonomicon",
    "References",
    "Invariants"
  ],
  "learningObjectives": [
    "Entender UB como violação de contratos assumidos pelo compilador e pelo modelo da linguagem.",
    "Reconhecer famílias comuns de UB ligadas a aliasing, validade, alinhamento e inicialização.",
    "Adotar uma postura de prova local ao escrever código unsafe ou de baixo nível.",
    "Distinguir 'funcionou no teste' de 'continua dentro do contrato da linguagem'.",
    "Tratar otimização e semântica como partes do mesmo problema, não como camadas independentes."
  ],
  "prerequisites": [
    "Stack, heap, ponteiros e lifetime são fundamentais para esta aula.",
    "Segurança de memória e concorrência de baixo nível ajudam a contextualizar os riscos.",
    "Não é necessário dominar Rust, mas os exemplos usam fontes oficiais do ecossistema para ancorar o modelo."
  ],
  "references": [
    {
      "title": "Behavior considered undefined",
      "source": "The Rust Reference",
      "url": "https://doc.rust-lang.org/stable/reference/behavior-considered-undefined.html",
      "note": "Lista oficial de comportamentos considerados UB e princípios de aliasing/validade."
    },
    {
      "title": "Aliasing",
      "source": "The Rustonomicon",
      "url": "https://doc.rust-lang.org/nomicon/aliasing.html",
      "note": "Capítulo essencial para entender por que aliasing interfere em otimização e corretude."
    },
    {
      "title": "References",
      "source": "The Rustonomicon",
      "url": "https://doc.rust-lang.org/nomicon/references.html",
      "note": "Explica as promessas associadas a referências compartilhadas e mutáveis em Rust."
    },
    {
      "title": "std::ptr",
      "source": "Rust Standard Library",
      "url": "https://doc.rust-lang.org/std/ptr/index.html",
      "note": "Documentação oficial sobre raw pointers e notas de segurança/validade relevantes."
    },
    {
      "title": "MaybeUninit",
      "source": "Rust Standard Library",
      "url": "https://doc.rust-lang.org/std/mem/union.MaybeUninit.html",
      "note": "Material oficial sobre memória possivelmente não inicializada e seu uso correto."
    }
  ],
  "heroVisual": "lesson-hero",
  "openingText": "Undefined Behavior não é um modo dramático de dizer 'o programa pode crashar'. É pior e mais sutil: significa que você violou regras que o compilador assumia como verdade para transformar e raciocinar sobre o código. A partir daí, perguntas como 'mas no meu teste funcionou' perdem força semântica. Em baixo nível, o mindset certo não é procurar truques para calar o compilador; é explicitar invariantes, reduzir a área unsafe e tratar cada atalho como uma obrigação de prova.",
  "quickFacts": [
    {
      "title": "unsafe não desliga as regras",
      "body": "Ele apenas desloca para você a responsabilidade de mantê-las."
    },
    {
      "title": "UB não é só crash",
      "body": "Pode se manifestar como resultado errado, otimização surpreendente ou fragilidade intermitente."
    },
    {
      "title": "Aliasing importa",
      "body": "O compilador otimiza porque assume certas exclusividades e validades."
    },
    {
      "title": "Teste não substitui contrato",
      "body": "Passar em casos locais não prova que o programa continua dentro do modelo da linguagem."
    }
  ],
  "sections": [
    {
      "id": "motivacao",
      "eyebrow": "Motivação",
      "title": "Por que Mindset de Undefined Behavior muda código real",
      "lead": "O perigo de UB não está apenas no sintoma final, mas no fato de você quebrar premissas que o compilador já incorporou ao programa transformado.",
      "visual": "lesson-hero",
      "paragraphs": [
        "Quando uma linguagem diz que certo comportamento é indefinido, ela está avisando que não promete significado para aquele programa. O compilador pode assumir que isso não acontece e otimizar baseado nessa suposição.",
        "Isso altera a conversa sobre bugs de baixo nível. Não se trata só de 'o que a CPU fez desta vez', mas de 'qual contrato foi violado antes mesmo de chegar na execução concreta'.",
        "Adotar um mindset de UB significa parar de perguntar apenas 'funciona?' e passar a perguntar 'quais invariantes estou prometendo aqui, e onde estou provando que elas continuam verdadeiras?'."
      ],
      "blocks": [
        {
          "type": "definition",
          "title": "Undefined Behavior",
          "body": "Situação em que o programa viola regras do modelo da linguagem, de modo que o compilador não precisa atribuir significado válido ao resultado."
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Concluir que um trecho é seguro porque passou em testes locais ou porque 'sempre funcionou até agora'."
        }
      ]
    },
    {
      "id": "modelo-mental",
      "eyebrow": "Modelo mental",
      "title": "A abstração certa para não decorar sem entender",
      "lead": "O modelo mental central é enxergar referências, ponteiros e dados não inicializados como promessas semânticas feitas ao compilador.",
      "visual": "concept-grid",
      "paragraphs": [
        "Uma referência válida promete mais do que um endereço qualquer: ela promete alinhamento, validade e certas regras de aliasing ao longo de seu lifetime.",
        "Raw pointers são mais permissivos em alguns aspectos, mas não autorizam ignorar validade, proveniência ou fronteiras de acesso. Eles apenas movem mais prova para o programador.",
        "Isso ajuda a entender por que otimização e semântica não são camadas separadas. O compilador otimiza justamente porque acredita nessas promessas."
      ],
      "blocks": [
        {
          "type": "definition",
          "title": "Definição",
          "body": "tratar invariantes de validade, aliasing, alinhamento e inicialização como contratos ativos que sustentam a semântica e as otimizações do programa"
        },
        {
          "type": "example",
          "title": "Exemplo concreto",
          "body": "criar duas referências mutáveis sobrepostas e depois usar ambas como se cada uma fosse a única dona exclusiva da região"
        }
      ]
    },
    {
      "id": "fluxo-essencial",
      "eyebrow": "Fluxo",
      "title": "O caminho que os dados percorrem",
      "lead": "A disciplina prática passa por declarar invariantes, manipular o dado dentro dessas regras, limitar a área unsafe e checar continuamente se nada escapou do contrato.",
      "visual": "pipeline-diagram",
      "interactive": "pipeline-lab",
      "paragraphs": [
        "Primeiro, você identifica qual promessa está sendo feita: unicidade de mutação, validade da referência, alinhamento, inicialização ou ausência de corrida de dados.",
        "Depois, o código unsafe precisa manter essa promessa enquanto cria, converte ou expõe ponteiros e referências. Esse é o momento em que bugs sutis costumam nascer.",
        "Por fim, você fecha a fronteira: minimiza escopo unsafe, documenta a invariantes e prefere APIs seguras na superfície. Quanto menor a região que exige prova manual, menor a chance de autoengano."
      ],
      "blocks": [
        {
          "type": "example",
          "title": "Etapas para observar",
          "body": "Use a interação para percorrer a pipeline e notar onde surgem custo, contenção, invalidação, cópia, sincronização ou reuso.",
          "items": [
            "Tornar explícita a invariante que o trecho assume.",
            "Executar manipulações de baixo nível sem quebrar essa promessa.",
            "Conter e documentar a fronteira unsafe.",
            "Usar ferramentas e revisão para validar a prova continuamente."
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
      "lead": "Baixo nível dá poder de representação e performance, mas transfere para você a obrigação de preservar invariantes que o restante da linguagem manteria automaticamente.",
      "visual": "tradeoff-spectrum",
      "interactive": "tradeoff-lab",
      "paragraphs": [
        "Unsafe, raw pointers e manipulação manual de memória existem porque certos componentes precisam desse poder. O problema começa quando o poder é usado como licença para raciocínio impreciso.",
        "Quanto maior a área unsafe, maior a superfície onde invariantes implícitas podem ser perdidas. Isso afeta não só segurança de memória, mas também a validade das otimizações esperadas pelo compilador.",
        "O ponto maduro é concentrar o unsafe onde ele é inevitável, documentar pressupostos e expor uma interface segura na borda. Essa é a forma mais saudável de equilibrar desempenho e correção."
      ],
      "blocks": [
        {
          "type": "insight",
          "title": "Projeto é posicionamento",
          "body": "O eixo aqui vai de 'tudo é byte e deu certo no meu teste' até contratos explícitos de validade e prova local de invariantes."
        },
        {
          "type": "mistake",
          "title": "O mito do extremo ideal",
          "body": "Confundir liberdade de baixo nível com permissão para deixar aliasing, inicialização ou validade implícitos demais para que alguém prove o trecho depois."
        }
      ]
    },
    {
      "id": "aliasing-e-validade",
      "eyebrow": "Invariantes",
      "title": "Aliasing, validade e alinhamento são promessas ativas",
      "lead": "Referência válida não é sinônimo de 'tenho um endereço'; ela carrega compromissos semânticos concretos.",
      "paragraphs": [
        "No material oficial de Rust, referências compartilham regras fortes: &T não pode observar mutação arbitrária enquanto vive, e &mut T promete exclusividade de acesso relevante àquela região.",
        "Essas garantias são justamente o que permite ao compilador raciocinar melhor sobre reorder, eliminação de cargas redundantes e outras otimizações.",
        "Alinhamento e validade também entram no pacote. Produzir uma referência desalinhada ou para dado inválido não é só 'ler um valor esquisito'; é violar uma categoria inteira de contrato."
      ],
      "blocks": [
        {
          "type": "definition",
          "title": "Aliasing",
          "body": "Sobreposição de caminhos de acesso à mesma região de memória, relevante quando há mutação, validade e promises de exclusividade."
        },
        {
          "type": "insight",
          "title": "Otimização depende da promessa",
          "body": "O compilador só pode simplificar acessos porque assume que certas sobreposições perigosas não existem."
        }
      ]
    },
    {
      "id": "uninit-e-raw-pointers",
      "eyebrow": "Baixo nível",
      "title": "Memória não inicializada e raw pointers exigem disciplina extra",
      "lead": "Essas ferramentas existem para casos reais, mas pedem muito mais cuidado do que simples endereços numéricos sugerem.",
      "paragraphs": [
        "Memória possivelmente não inicializada não pode ser tratada como se já contivesse um valor válido de qualquer tipo. Tipos diferentes carregam expectativas diferentes sobre bit patterns aceitáveis.",
        "Raw pointers permitem construir estruturas flexíveis e interagir com FFI, mas continuam sujeitos a contratos de validade, limites e uso correto antes de virar referências ou serem dereferenciados.",
        "Essa é uma boa hora para abandonar a fantasia de que 'unsafe é só C dentro de Rust'. O ecossistema oficial deixa claro que as invariantes continuam valendo; apenas a responsabilidade passou para você."
      ],
      "blocks": [
        {
          "type": "example",
          "title": "Ferramenta certa",
          "body": "MaybeUninit existe justamente para representar memória que ainda não pode ser tratada como valor plenamente válido."
        },
        {
          "type": "mistake",
          "title": "Leitura perigosa",
          "body": "Produzir referências válidas cedo demais a partir de ponteiros crus ou memória ainda não inicializada."
        }
      ]
    },
    {
      "id": "armadilhas",
      "eyebrow": "Armadilhas",
      "title": "Os piores enganos começam com 'mas funcionou aqui'",
      "lead": "UB costuma ser traiçoeira porque o programa pode parecer normal até um detalhe de compilação, plataforma ou otimização mudar.",
      "paragraphs": [
        "Um trecho pode passar em debug, em release local e até em produção inicial, mas ainda assim estar fora do contrato. A ausência imediata de crash não reescreve a semântica da linguagem.",
        "Outro engano frequente é espalhar unsafe em vez de concentrá-lo. Quanto mais lugares precisam 'lembrar' da mesma invariante, maior a chance de alguém quebrá-la sem perceber.",
        "Também é comum misturar termos: comportamento indefinido, implementação definida, comportamento não especificado e simples bug lógico não são a mesma coisa. O mindset saudável separa essas categorias com rigor."
      ],
      "blocks": [
        {
          "type": "mistake",
          "title": "Autoengano clássico",
          "body": "Usar 'funcionou no meu teste' como substituto para demonstrar validade, alinhamento e aliasing corretos."
        },
        {
          "type": "insight",
          "title": "Prova local vence intuição",
          "body": "Quanto menor e mais documentada a fronteira unsafe, mais auditável fica o código."
        }
      ]
    },
    {
      "id": "decisoes-de-projeto",
      "eyebrow": "Prática",
      "title": "Como decidir em vez de só repetir slogans",
      "lead": "A melhor decisão de baixo nível quase sempre reduz a quantidade de coisas que precisam ser 'lembradas mentalmente' para que o trecho continue válido.",
      "interactive": "scenario-lab",
      "paragraphs": [
        "Se uma otimização exige espalhar raw pointers e invariantes implícitas pelo sistema inteiro, o custo cognitivo talvez seja maior do que o benefício de runtime esperado.",
        "Se um trecho unsafe pode ser encapsulado atrás de uma API segura que valida entradas e preserva ownership, você concentrou a prova em um ponto muito mais auditável.",
        "Ferramentas como sanitizers, Miri ou checagens do compilador não substituem o modelo mental, mas ajudam a confirmar que a prova local não ficou só na sua cabeça."
      ],
      "blocks": [
        {
          "type": "example",
          "title": "Heurística de decisão",
          "body": "As recomendações abaixo não são receitas eternas; elas são pontos de partida guiados pelo mecanismo que a aula explicou.",
          "items": [
            "Reduza a fronteira unsafe e documente explicitamente a invariante que o trecho exige.",
            "Evite produzir referências válidas cedo demais a partir de ponteiros crus ou memória incompleta.",
            "Prefira APIs seguras na borda e use ferramentas para validar a prova sempre que possível."
          ]
        },
        {
          "type": "definition",
          "title": "Regra prática",
          "body": "trate todo unsafe como obrigação de prova: declare a invariante, minimize o escopo e exponha uma borda segura para o restante do sistema"
        }
      ]
    },
    {
      "id": "pontes",
      "eyebrow": "Conexões",
      "title": "Como este fundamento reaparece em outros sistemas",
      "lead": "Esse mindset reaparece em FFI, alocadores, containers customizados, concorrência, serialização binária e qualquer lugar onde a linguagem deixa o programador mais perto da representação física.",
      "visual": "impact-board",
      "paragraphs": [
        "Toda vez que você manipula memória, produz referências a partir de ponteiros, ou tenta burlar uma abstração segura por desempenho, está lidando com o mesmo tema: quais invariantes continuam verdadeiras aqui?",
        "Esse pensamento também melhora revisões de código. Em vez de discutir só estilo, o time passa a perguntar que promessa semântica cada trecho unsafe está exigindo e onde ela está documentada.",
        "No fim, mindset de UB é menos sobre medo e mais sobre honestidade técnica: saber exatamente o que está sendo prometido ao compilador, à arquitetura e aos futuros mantenedores."
      ],
      "blocks": [
        {
          "type": "insight",
          "title": "Transferência de modelo mental",
          "body": "Corretude de baixo nível depende de invariantes explícitas; sem elas, otimização e segurança perdem chão ao mesmo tempo."
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
        "Mais importante do que decorar categorias é aprender a tratar unsafe como responsabilidade de prova, não como atalho psicológico."
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
        "Esses termos são o vocabulário mínimo para conversar seriamente sobre UB em código de baixo nível."
      ],
      "blocks": []
    }
  ],
  "summaryCards": [
    {
      "title": "UB é quebra de contrato",
      "body": "Não é apenas um crash possível; é perda de significado semântico garantido."
    },
    {
      "title": "unsafe não desliga regras",
      "body": "Ele transfere a responsabilidade de mantê-las para o programador."
    },
    {
      "title": "Aliasing e validade importam",
      "body": "O compilador otimiza porque acredita em certas promessas sobre referências e ponteiros."
    },
    {
      "title": "MaybeUninit existe por um motivo",
      "body": "Memória não inicializada precisa de representação honesta."
    },
    {
      "title": "Teste não prova tudo",
      "body": "Passar localmente não significa continuar dentro do modelo da linguagem."
    },
    {
      "title": "Fronteiras pequenas vencem",
      "body": "Unsafe concentrado e documentado é muito mais auditável."
    }
  ],
  "quiz": [
    {
      "id": "q1",
      "prompt": "Qual frase descreve melhor Undefined Behavior?",
      "options": [
        {
          "id": "a",
          "label": "Quebra de contrato semântico em que a linguagem não precisa atribuir resultado válido ao programa."
        },
        {
          "id": "b",
          "label": "Qualquer bug lógico simples."
        },
        {
          "id": "c",
          "label": "Apenas um crash causado por falta de memória."
        }
      ],
      "correctOptionId": "a",
      "feedback": "UB é mais profunda do que um sintoma específico em runtime."
    },
    {
      "id": "q2",
      "prompt": "O que 'unsafe' significa em Rust de forma correta?",
      "options": [
        {
          "id": "a",
          "label": "Que o programador assume a responsabilidade de manter invariantes; não que as regras deixaram de existir."
        },
        {
          "id": "b",
          "label": "Que qualquer operação com ponteiro passa a ser sempre válida."
        },
        {
          "id": "c",
          "label": "Que o compilador para de otimizar o trecho."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Unsafe desloca a prova, mas não elimina o contrato."
    },
    {
      "id": "q3",
      "prompt": "Por que aliasing importa tanto?",
      "options": [
        {
          "id": "a",
          "label": "Porque certas otimizações dependem de promessas sobre sobreposição e exclusividade de acesso."
        },
        {
          "id": "b",
          "label": "Porque só afeta programas gráficos."
        },
        {
          "id": "c",
          "label": "Porque aliasing muda o tamanho da RAM."
        }
      ],
      "correctOptionId": "a",
      "feedback": "O compilador usa essas promessas para raciocinar sobre cargas e stores."
    },
    {
      "id": "q4",
      "prompt": "Qual é o papel de MaybeUninit?",
      "options": [
        {
          "id": "a",
          "label": "Representar memória que ainda não pode ser tratada como valor plenamente válido."
        },
        {
          "id": "b",
          "label": "Eliminar qualquer necessidade de provar inicialização."
        },
        {
          "id": "c",
          "label": "Permitir criar referências nulas seguras."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Ele existe para ser honesto sobre o estado do dado."
    },
    {
      "id": "q5",
      "prompt": "Qual é um erro clássico de mindset?",
      "options": [
        {
          "id": "a",
          "label": "Usar 'funcionou no meu teste' como substituto para provar a invariante exigida."
        },
        {
          "id": "b",
          "label": "Documentar uma fronteira unsafe pequena."
        },
        {
          "id": "c",
          "label": "Preferir interface segura sobre interior complexo."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Teste local não redefine a semântica da linguagem."
    },
    {
      "id": "q6",
      "prompt": "Qual estratégia costuma ser mais saudável?",
      "options": [
        {
          "id": "a",
          "label": "Concentrar unsafe em uma fronteira pequena e documentada com API segura na borda."
        },
        {
          "id": "b",
          "label": "Espalhar raw pointers pelo sistema inteiro."
        },
        {
          "id": "c",
          "label": "Confiar só em comentários informais sem encapsulamento."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Fronteiras pequenas reduzem a superfície de erro e melhoram a auditabilidade."
    },
    {
      "id": "q7",
      "prompt": "O que uma referência válida promete além de um endereço?",
      "options": [
        {
          "id": "a",
          "label": "Validade, alinhamento e regras de aliasing/lifetime compatíveis com seu tipo."
        },
        {
          "id": "b",
          "label": "Somente que o valor é maior que zero."
        },
        {
          "id": "c",
          "label": "Que o dado nunca será movido pela linguagem."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Referência é uma promessa semântica, não um inteiro mágico."
    },
    {
      "id": "q8",
      "prompt": "Qual frase resume o mindset correto?",
      "options": [
        {
          "id": "a",
          "label": "Trate unsafe como obrigação de prova de invariantes, não como licença para ignorá-las."
        },
        {
          "id": "b",
          "label": "Quanto mais unsafe, mais rápido e sempre melhor."
        },
        {
          "id": "c",
          "label": "UB só importa para compiladores acadêmicos."
        }
      ],
      "correctOptionId": "a",
      "feedback": "O ganho de baixo nível só é saudável quando a prova continua sob controle."
    }
  ],
  "glossary": [
    {
      "term": "Undefined Behavior",
      "definition": "Quebra de contrato semântico em que a linguagem não garante significado válido para o programa."
    },
    {
      "term": "Unsafe",
      "definition": "Contexto em que o programador assume manualmente certas garantias exigidas pela linguagem."
    },
    {
      "term": "Aliasing",
      "definition": "Sobreposição de caminhos de acesso à mesma região de memória."
    },
    {
      "term": "Validade",
      "definition": "Condição de um dado ou referência cumprir as regras exigidas para aquele tipo e uso."
    },
    {
      "term": "Alinhamento",
      "definition": "Posicionamento do dado em endereços compatíveis com as exigências do tipo e da arquitetura."
    },
    {
      "term": "Raw pointer",
      "definition": "Ponteiro cru com menos garantias embutidas do que uma referência segura."
    },
    {
      "term": "Reference",
      "definition": "Acesso com promessas semânticas mais fortes sobre o dado apontado."
    },
    {
      "term": "MaybeUninit",
      "definition": "Representação explícita de memória que ainda pode não conter um valor válido de T."
    },
    {
      "term": "Invariante",
      "definition": "Propriedade que precisa permanecer verdadeira para que um trecho seja correto."
    },
    {
      "term": "Lifetime",
      "definition": "Período em que um valor ou referência permanece válido."
    },
    {
      "term": "Proveniência",
      "definition": "Relação entre um ponteiro e a região de memória que ele está autorizado a acessar."
    },
    {
      "term": "Fronteira unsafe",
      "definition": "Região delimitada do código onde garantias manuais precisam ser mantidas e auditadas."
    }
  ]
};
