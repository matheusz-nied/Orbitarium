import type { LessonContent } from "../../../types/content";

export const segurancaDeMemoriaContent: LessonContent = {
  "id": "seguranca-de-memoria",
  "title": "Segurança de Memória",
  "subtitle": "Por que bugs como buffer overflow e use-after-free são mais do que crashes: eles podem virar execução arbitrária, vazamento e corrupção silenciosa.",
  "description": "Uma aula sobre bounds, lifetime, ownership, sanitizers, mitigations e o custo de provar que acessos à memória continuam válidos em código de baixo nível.",
  "primaryCategoryId": "computacao",
  "secondaryCategoryId": "engenharia",
  "level": "Avançado",
  "estimatedTime": "60-70 min",
  "tags": [
    "Memory Safety",
    "Buffer Overflow",
    "UAF",
    "Rust",
    "Sanitizers",
    "Exploit"
  ],
  "learningObjectives": [
    "Entender as classes centrais de falhas de segurança de memória.",
    "Relacionar bounds, ownership e lifetime com comportamento correto.",
    "Perceber por que testes superficiais não provam segurança de memória.",
    "Avaliar mitigação por linguagem, abstração, ferramenta e isolamento."
  ],
  "prerequisites": [
    "Noção básica de ponteiros, heap e stack ajuda bastante.",
    "Curiosidade sobre sistemas, runtimes ou navegadores.",
    "Não é preciso saber explorar vulnerabilidades para aproveitar a aula."
  ],
  "references": [
    {
      "title": "Buffer Overflow",
      "source": "OWASP",
      "url": "https://owasp.org/www-community/vulnerabilities/Buffer_Overflow",
      "note": "Resumo claro do impacto prático de estouro de buffer."
    },
    {
      "title": "CWE-119",
      "source": "MITRE CWE",
      "url": "https://cwe.mitre.org/data/definitions/119.html",
      "note": "Taxonomia de falhas de memória usada na indústria."
    },
    {
      "title": "AddressSanitizer",
      "source": "Clang/LLVM",
      "url": "https://clang.llvm.org/docs/AddressSanitizer.html",
      "note": "Ferramenta importante para detectar classes de corrupção de memória."
    },
    {
      "title": "Ownership",
      "source": "The Rust Programming Language",
      "url": "https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html",
      "note": "Material didático sobre garantias de ownership e borrow checking."
    },
    {
      "title": "C++ Core Guidelines",
      "source": "ISO C++",
      "url": "https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines",
      "note": "Diretrizes práticas para reduzir superfícies inseguras em C++."
    }
  ],
  "heroVisual": "lesson-hero",
  "openingText": "Em sistemas de baixo nível, a pergunta não é só 'isso funciona?'. Também é 'quem é dono desta região, por quanto tempo ela vive e o que acontece se eu ultrapassar seus limites?'. Segurança de memória é o conjunto de garantias que impede que um bug banal vire corrupção arbitrária ou execução controlada por atacante.",
  "quickFacts": [
    {
      "title": "Unidade crítica",
      "body": "o objeto e a validade do ponteiro ou referência que o alcança"
    },
    {
      "title": "Trade-off central",
      "body": "controle manual e performance ↔ garantias automáticas e isolamento"
    },
    {
      "title": "Regra prática",
      "body": "reduza superfícies unsafe, use sanitizers e prefira APIs ou linguagens que expressem ownership explicitamente"
    }
  ],
  "sections": [
    {
      "id": "motivacao",
      "eyebrow": "Motivação",
      "title": "Por que Segurança de Memória aparece em sistemas sérios",
      "lead": "Impedir leituras e escritas fora dos limites ou do tempo de vida válidos dos objetos muda latência, custo, previsibilidade ou segurança. Por isso, o tema aparece cedo em qualquer sistema que sai do protótipo.",
      "visual": "lesson-hero",
      "paragraphs": [
        "Segurança de Memória existe para impedir leituras e escritas fora dos limites ou do tempo de vida válidos dos objetos. Sem isso, erros de ponteiro, corrupção silenciosa e superfícies de exploração se multiplicam.",
        "Um bom modelo intuitivo é pensar em memória segura como a combinação entre quem possui um objeto, quanto tempo ele vive e quem pode referenciá-lo. Pense em um parser de arquivo que aceita tamanho malicioso e escreve além do buffer ou acessa memória já liberada.",
        "Esse assunto importa porque afeta exploitabilidade, estabilidade e custo de auditoria de software crítico. Quando você o entende, decisões de arquitetura deixam de parecer um conjunto de truques desconexos."
      ],
      "blocks": [
        {
          "type": "insight",
          "title": "Intuição útil",
          "body": "pensar em memória segura como a combinação entre quem possui um objeto, quanto tempo ele vive e quem pode referenciá-lo"
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "assumir que o programa está seguro porque passou nos testes funcionais do caminho feliz"
        }
      ]
    },
    {
      "id": "modelo-mental",
      "eyebrow": "Modelo mental",
      "title": "A abstração certa para não decorar sem entender",
      "lead": "Boas decisões de engenharia nascem de uma abstração operacional simples: o que está sendo movido, validado, sincronizado ou reaproveitado?",
      "visual": "concept-grid",
      "paragraphs": [
        "Definição operacional: disciplina, ferramenta e modelo de linguagem que tentam garantir bounds, lifetime e validade de acessos à memória.",
        "A unidade crítica para raciocinar sobre custo e comportamento é o objeto e a validade do ponteiro ou referência que o alcança. É nela que atrasos, contenção ou corrupção costumam aparecer primeiro.",
        "Quando você enxerga a unidade certa, fica mais fácil separar sintoma de causa. Isso evita o atalho mental de achar que assumir que o programa está seguro porque passou nos testes funcionais do caminho feliz."
      ],
      "blocks": [
        {
          "type": "definition",
          "title": "Definição",
          "body": "disciplina, ferramenta e modelo de linguagem que tentam garantir bounds, lifetime e validade de acessos à memória"
        },
        {
          "type": "example",
          "title": "Exemplo concreto",
          "body": "um parser de arquivo que aceita tamanho malicioso e escreve além do buffer ou acessa memória já liberada"
        }
      ]
    },
    {
      "id": "fluxo-essencial",
      "eyebrow": "Fluxo",
      "title": "O caminho que os dados percorrem",
      "lead": "Quase todo gargalo difícil nasce quando esquecemos que há uma sequência de etapas, e que cada uma delas impõe uma política diferente.",
      "visual": "pipeline-diagram",
      "interactive": "pipeline-lab",
      "paragraphs": [
        "Em alto nível, o fluxo é um objeto é alocado, inicializado, usado, eventualmente liberado e pode voltar a ser reutilizado pelo sistema ou pelo alocador.",
        "Em vez de decorar siglas, vale observar a ordem das decisões: alocação, acesso, liberação ou reutilização e detecção e mitigação. O desenho muda de tema para tema, mas a disciplina mental é a mesma.",
        "A pergunta importante não é apenas 'qual etapa existe?'. A pergunta melhor é 'onde a decisão errada se propaga e quanto custa corrigi-la depois?'."
      ],
      "blocks": [
        {
          "type": "example",
          "title": "Etapas para observar",
          "body": "Use a interação para percorrer a pipeline e notar onde surgem classificação, mediação, sincronização, persistência ou reaproveitamento.",
          "items": [
            "Alocação",
            "Acesso",
            "Liberação ou reutilização",
            "Detecção e mitigação"
          ]
        },
        {
          "type": "insight",
          "title": "Fluxos distribuem responsabilidade",
          "body": "Uma etapa ruim costuma contaminar as seguintes. Por isso times experientes observam não só o resultado final, mas também o caminho percorrido."
        }
      ]
    },
    {
      "id": "tradeoffs",
      "eyebrow": "Trade-offs",
      "title": "A escolha que nunca é gratuita",
      "lead": "Sistemas bons não maximizam um único número. Eles escolhem conscientemente qual dor reduzir agora e qual custo aceitar depois.",
      "visual": "tradeoff-spectrum",
      "interactive": "tradeoff-lab",
      "paragraphs": [
        "O eixo central desta aula vai de controle manual e performance até garantias automáticas e isolamento. Quanto mais controle manual você assume, maior fica o ônus de provar bounds e lifetime. Garantias automáticas e sandboxes reduzem essa carga, mas exigem arquitetura, toolchain e eventualmente mudanças de linguagem.",
        "Empurrar o desenho demais para um extremo tende a simplificar uma parte e complicar outra. O trabalho do arquiteto é tornar essa troca visível, não escondê-la atrás de defaults.",
        "Por isso, a pergunta madura não é 'qual tecnologia vence?'. É 'qual ponto do eixo faz sentido para este perfil de tráfego, risco e equipe?'."
      ],
      "blocks": [
        {
          "type": "insight",
          "title": "Projeto é posicionamento",
          "body": "O eixo 'controle manual e performance ↔ garantias automáticas e isolamento' existe porque cada ponta otimiza uma propriedade diferente do sistema."
        },
        {
          "type": "mistake",
          "title": "O mito do extremo ideal",
          "body": "Quando alguém trata um extremo como solução universal, geralmente está escondendo custos operacionais, latência, consistência ou carga cognitiva."
        }
      ]
    },
    {
      "id": "falhas-e-armadilhas",
      "eyebrow": "Armadilhas",
      "title": "Onde equipes experientes ainda escorregam",
      "lead": "A maioria dos incidentes não nasce da teoria errada, e sim de suposições implícitas que ninguém modelou até o sistema crescer.",
      "paragraphs": [
        "O erro recorrente é assumir que o programa está seguro porque passou nos testes funcionais do caminho feliz. Isso costuma soar plausível porque a abstração superficial parece simples demais.",
        "Na prática, o limite aparece quando caminhos raros, concorrência, input hostil e reutilização do alocador revelam ponteiros inválidos tarde demais. É nesse ponto que o sistema revela o que realmente estava sendo garantido - ou apenas assumido.",
        "Tratar esses limites como detalhes raros é caro. Tratá-los como parte do desenho inicial economiza incidentes, retrabalho e debates improdutivos depois."
      ],
      "blocks": [
        {
          "type": "mistake",
          "title": "Suposição perigosa",
          "body": "assumir que o programa está seguro porque passou nos testes funcionais do caminho feliz"
        },
        {
          "type": "insight",
          "title": "Limites são parte da especificação",
          "body": "caminhos raros, concorrência, input hostil e reutilização do alocador revelam ponteiros inválidos tarde demais"
        }
      ]
    },
    {
      "id": "decisoes-de-projeto",
      "eyebrow": "Prática",
      "title": "Como decidir em vez de só repetir padrões",
      "lead": "Padrão bom é padrão contextualizado. Sem cenário, benchmark e política, a mesma técnica vira conselho ruim.",
      "interactive": "scenario-lab",
      "paragraphs": [
        "Uma regra prática desta aula é reduza superfícies unsafe, use sanitizers e prefira apis ou linguagens que expressem ownership explicitamente.",
        "Repare nos cenários propostos: parser de upload, ffi com legado e serviço de longa duração. O mecanismo é o mesmo, mas a decisão muda conforme estado, risco e tipo de carga.",
        "É por isso que bons times documentam intenção, observam métricas e revisam o desenho quando o contexto operacional muda."
      ],
      "blocks": [
        {
          "type": "example",
          "title": "Heurística de decisão",
          "body": "As recomendações abaixo não são receitas eternas; elas são pontos de partida guiados pelo mecanismo que a aula explicou.",
          "items": [
            "Conter parsing em camadas mais seguras, usar limites explícitos e instrumentação de sanitizers.",
            "Isolar a fronteira unsafe, documentar ownership e reduzir a área que cruza a FFI.",
            "Usar observabilidade, fuzzing e sanitizers em ambientes adequados para pegar bugs antes da produção."
          ]
        },
        {
          "type": "definition",
          "title": "Regra prática",
          "body": "reduza superfícies unsafe, use sanitizers e prefira APIs ou linguagens que expressem ownership explicitamente"
        }
      ]
    },
    {
      "id": "pontes",
      "eyebrow": "Conexões",
      "title": "Como este fundamento reaparece em outros sistemas",
      "lead": "Uma boa aula de computação não fecha em si mesma. Ela amplia sua capacidade de interpretar bancos, redes, runtimes, browsers e produtos de IA.",
      "visual": "impact-board",
      "paragraphs": [
        "Servidores de inferência, parsers de formatos, kernels, browsers e runtimes de aceleração continuam expostos a bugs de memória quando lidam com dados não confiáveis.",
        "Em produtos modernos, a mesma lógica reaparece em APIs, jobs assíncronos, pipelines de dados, páginas web, storage, modelos e plataformas internas.",
        "Aprender este tópico dá vocabulário para discutir latência, throughput, integridade, consistência, segurança e custo com mais precisão técnica."
      ],
      "blocks": [
        {
          "type": "insight",
          "title": "Transferência de modelo mental",
          "body": "exploitabilidade, estabilidade e custo de auditoria de software crítico"
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
        "O objetivo não é decorar frases, e sim verificar se você consegue explicar onde a abstração ajuda, onde ela falha e como decidir melhor em um sistema real."
      ]
    },
    {
      "id": "glossario",
      "eyebrow": "Glossário",
      "title": "Vocabulário para continuar estudando",
      "lead": "Feche a aula consolidando termos que aparecem em documentação, incidentes, artigos técnicos e discussões de arquitetura.",
      "interactive": "glossary",
      "paragraphs": [
        "Dominar esse vocabulário acelera leitura de documentação oficial, revisão de incidentes e conversas com outras camadas do stack."
      ]
    }
  ],
  "summaryCards": [
    {
      "title": "Problema que resolve",
      "body": "impedir leituras e escritas fora dos limites ou do tempo de vida válidos dos objetos"
    },
    {
      "title": "Modelo mental",
      "body": "pensar em memória segura como a combinação entre quem possui um objeto, quanto tempo ele vive e quem pode referenciá-lo"
    },
    {
      "title": "Erro comum",
      "body": "assumir que o programa está seguro porque passou nos testes funcionais do caminho feliz"
    },
    {
      "title": "Onde reaparece",
      "body": "Servidores de inferência, parsers de formatos, kernels, browsers e runtimes de aceleração continuam expostos a bugs de memória quando lidam com dados não confiáveis"
    }
  ],
  "quiz": [
    {
      "id": "q1",
      "prompt": "Qual é a função principal de Segurança de Memória em um sistema?",
      "options": [
        {
          "id": "a",
          "label": "impedir leituras e escritas fora dos limites ou do tempo de vida válidos dos objetos"
        },
        {
          "id": "b",
          "label": "Substituir todas as outras camadas do stack por uma única técnica."
        },
        {
          "id": "c",
          "label": "Eliminar por definição qualquer latência, falha ou custo."
        }
      ],
      "correctOptionId": "a",
      "feedback": "A ideia central da aula é impedir leituras e escritas fora dos limites ou do tempo de vida válidos dos objetos. O tema melhora o projeto do sistema, mas não apaga restrições físicas nem substitui todas as outras camadas."
    },
    {
      "id": "q2",
      "prompt": "Qual modelo mental ajuda mais a entender segurança de memória?",
      "options": [
        {
          "id": "a",
          "label": "pensar em memória segura como a combinação entre quem possui um objeto, quanto tempo ele vive e quem pode referenciá-lo"
        },
        {
          "id": "b",
          "label": "Pensar apenas na interface visual, ignorando o mecanismo interno."
        },
        {
          "id": "c",
          "label": "Assumir que segurança de memória resolve sozinho qualquer gargalo restante."
        }
      ],
      "correctOptionId": "a",
      "feedback": "O melhor atalho mental aqui é: pensar em memória segura como a combinação entre quem possui um objeto, quanto tempo ele vive e quem pode referenciá-lo. Esse modelo ajuda a prever custo, limite e comportamento operacional."
    },
    {
      "id": "q3",
      "prompt": "No fluxo estudado, qual etapa aparece cedo e condiciona decisões posteriores?",
      "options": [
        {
          "id": "a",
          "label": "Alocação"
        },
        {
          "id": "b",
          "label": "Detecção e mitigação"
        },
        {
          "id": "c",
          "label": "Uma etapa mágica que elimina a necessidade de observar o sistema."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Alocação acontece cedo e molda o resto do caminho. Erros de classificação ou roteamento se propagam com facilidade."
    },
    {
      "id": "q4",
      "prompt": "Qual afirmação descreve melhor o trade-off central da aula?",
      "options": [
        {
          "id": "a",
          "label": "O objetivo é equilibrar controle manual e performance e garantias automáticas e isolamento, não maximizar um extremo automaticamente."
        },
        {
          "id": "b",
          "label": "Sempre vale empurrar tudo para garantias automáticas e isolamento."
        },
        {
          "id": "c",
          "label": "Sempre vale empurrar tudo para controle manual e performance."
        }
      ],
      "correctOptionId": "a",
      "feedback": "O eixo 'controle manual e performance ↔ garantias automáticas e isolamento' existe porque cada extremo resolve uma dor e cria outra. Projeto maduro explicita essa troca."
    },
    {
      "id": "q5",
      "prompt": "Qual das opções abaixo representa um erro comum discutido na aula?",
      "options": [
        {
          "id": "a",
          "label": "assumir que o programa está seguro porque passou nos testes funcionais do caminho feliz"
        },
        {
          "id": "b",
          "label": "reduza superfícies unsafe, use sanitizers e prefira APIs ou linguagens que expressem ownership explicitamente"
        },
        {
          "id": "c",
          "label": "Medir hipóteses antes de alterar um sistema que já está em produção."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Este é o atalho mental perigoso do tema: assumir que o programa está seguro porque passou nos testes funcionais do caminho feliz. A aula insiste em tornar essas suposições explícitas."
    },
    {
      "id": "q6",
      "prompt": "Pensando em cenários reais, qual decisão inicial está mais alinhada com a aula?",
      "options": [
        {
          "id": "a",
          "label": "Conter parsing em camadas mais seguras, usar limites explícitos e instrumentação de sanitizers."
        },
        {
          "id": "b",
          "label": "Isolar a fronteira unsafe, documentar ownership e reduzir a área que cruza a FFI."
        },
        {
          "id": "c",
          "label": "Usar observabilidade, fuzzing e sanitizers em ambientes adequados para pegar bugs antes da produção."
        }
      ],
      "correctOptionId": "a",
      "feedback": "No primeiro cenário, a recomendação é conter parsing em camadas mais seguras, usar limites explícitos e instrumentação de sanitizers.. A solução depende do mecanismo certo para o caso, não de um padrão aplicado sem contexto."
    },
    {
      "id": "q7",
      "prompt": "Por que este tema também importa para sistemas de IA e produtos modernos?",
      "options": [
        {
          "id": "a",
          "label": "Servidores de inferência, parsers de formatos, kernels, browsers e runtimes de aceleração continuam expostos a bugs de memória quando lidam com dados não confiáveis"
        },
        {
          "id": "b",
          "label": "Porque produtos de IA não dependem de infraestrutura, segurança ou dados."
        },
        {
          "id": "c",
          "label": "Porque modelos grandes fazem arquitetura e operação deixarem de importar."
        }
      ],
      "correctOptionId": "a",
      "feedback": "A ponte da aula é direta: servidores de inferência, parsers de formatos, kernels, browsers e runtimes de aceleração continuam expostos a bugs de memória quando lidam com dados não confiáveis. Os mesmos fundamentos reaparecem em serving, dados, rede, storage e operação."
    },
    {
      "id": "q8",
      "prompt": "O que costuma quebrar ou exigir cuidado adicional neste tema?",
      "options": [
        {
          "id": "a",
          "label": "caminhos raros, concorrência, input hostil e reutilização do alocador revelam ponteiros inválidos tarde demais"
        },
        {
          "id": "b",
          "label": "Somente o nome das variáveis ou detalhes cosméticos da interface."
        },
        {
          "id": "c",
          "label": "Nada relevante: testes básicos já eliminam esse tipo de risco completamente."
        }
      ],
      "correctOptionId": "a",
      "feedback": "O limite importante aqui é concreto: caminhos raros, concorrência, input hostil e reutilização do alocador revelam ponteiros inválidos tarde demais. Em sistemas reais, garantias dependem de política, falha, carga e integração entre camadas."
    }
  ],
  "glossary": [
    {
      "term": "Buffer overflow",
      "definition": "Escrita ou leitura além do espaço válido de um buffer."
    },
    {
      "term": "Use-after-free",
      "definition": "Acesso a uma região já liberada e potencialmente reutilizada."
    },
    {
      "term": "Dangling pointer",
      "definition": "Ponteiro que ainda existe, mas aponta para um objeto cuja vida acabou."
    },
    {
      "term": "Bounds check",
      "definition": "Verificação de que um acesso permanece dentro dos limites válidos."
    },
    {
      "term": "Ownership",
      "definition": "Regra que define quem é responsável por um recurso e por seu ciclo de vida."
    },
    {
      "term": "Borrow",
      "definition": "Empréstimo temporário de acesso a um recurso sem transferir ownership."
    },
    {
      "term": "Sanitizer",
      "definition": "Ferramenta de instrumentação que detecta classes de erro durante execução de testes."
    },
    {
      "term": "ASLR",
      "definition": "Técnica que randomiza endereços para dificultar exploração de memória."
    },
    {
      "term": "NX ou DEP",
      "definition": "Mitigação que impede execução de dados em regiões marcadas como não executáveis."
    },
    {
      "term": "Memory corruption",
      "definition": "Alteração indevida do conteúdo ou da estrutura de memória de um processo."
    }
  ]
} satisfies LessonContent;
