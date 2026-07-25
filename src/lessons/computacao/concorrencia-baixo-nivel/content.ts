import type { LessonContent } from "../../../types/content";

export const concorrenciaBaixoNivelContent: LessonContent = {
  "id": "concorrencia-baixo-nivel",
  "title": "Concorrência em Baixo Nível",
  "subtitle": "Atomics, happens-before e ordens de memória: por que ver a mesma variável não significa ver o mesmo mundo entre cores.",
  "description": "Uma aula sobre atomics, lock-free, acquire/release, sequential consistency, fences e o custo de provar visibilidade correta em multicore moderno.",
  "primaryCategoryId": "computacao",
  "secondaryCategoryId": "engenharia",
  "level": "Avançado",
  "estimatedTime": "60-70 min",
  "tags": [
    "Atomics",
    "Concurrency",
    "Memory Order",
    "Lock-Free",
    "Happens-Before",
    "Multicore"
  ],
  "learningObjectives": [
    "Entender que ordem de observação entre threads não é simplesmente a ordem do código fonte.",
    "Relacionar atomics, locks e fences a garantias de visibilidade.",
    "Perceber quando lock-free ajuda e quando só aumenta a fragilidade do sistema.",
    "Construir intuição para raciocinar sobre happens-before."
  ],
  "prerequisites": [
    "Ajuda já ter visto threads e concorrência em alto nível.",
    "Curiosidade sobre sistemas multicore e performance.",
    "Não é obrigatório dominar C++ ou Rust para aproveitar a intuição da aula."
  ],
  "references": [
    {
      "title": "std::memory_order",
      "source": "cppreference",
      "url": "https://en.cppreference.com/w/cpp/atomic/memory_order",
      "note": "Referência prática e amplamente usada para ordens de memória."
    },
    {
      "title": "std::sync::atomic",
      "source": "Rust Standard Library",
      "url": "https://doc.rust-lang.org/std/sync/atomic/",
      "note": "Documentação oficial de atomics com semântica clara."
    },
    {
      "title": "Memory Barriers",
      "source": "Linux Kernel Documentation",
      "url": "https://www.kernel.org/doc/html/latest/core-api/wrappers/memory-barriers.html",
      "note": "Texto clássico para entender visibilidade e ordering."
    },
    {
      "title": "Rust Atomics and Locks",
      "source": "marabos",
      "url": "https://marabos.nl/atomics/",
      "note": "Livro técnico moderno e respeitado sobre concorrência de baixo nível."
    },
    {
      "title": "Intel 64 and IA-32 Architectures Optimization Reference Manual",
      "source": "Intel",
      "url": "https://www.intel.com/content/www/us/en/developer/articles/technical/intel64-and-ia-32-architectures-optimization-reference-manual.html",
      "note": "Conecta semântica de memória a comportamento em hardware real."
    }
  ],
  "heroVisual": "lesson-hero",
  "openingText": "Em concorrência de baixo nível, o bug mais traiçoeiro não é o que sempre falha - é o que parece funcionar durante semanas e quebra quando muda o compilador, a arquitetura ou o timing. O motivo é simples e cruel: diferentes cores não são obrigados a observar memória na ordem intuitiva do seu código fonte, a menos que você imponha essa ordem corretamente.",
  "quickFacts": [
    {
      "title": "Unidade crítica",
      "body": "a operação atômica e a relação de sincronização que ela pode estabelecer quando combinada corretamente"
    },
    {
      "title": "Trade-off central",
      "body": "simplicidade de raciocínio ↔ paralelismo e baixa contenção"
    },
    {
      "title": "Regra prática",
      "body": "prove qual borda de sincronização protege cada leitura importante antes de buscar lock free heroico"
    }
  ],
  "sections": [
    {
      "id": "motivacao",
      "eyebrow": "Motivação",
      "title": "Por que Concorrência em Baixo Nível aparece em sistemas sérios",
      "lead": "Coordenar múltiplos agentes sobre memória compartilhada com garantias explícitas de visibilidade e ordem muda latência, custo, previsibilidade ou segurança. Por isso, o tema aparece cedo em qualquer sistema que sai do protótipo.",
      "visual": "lesson-hero",
      "paragraphs": [
        "Concorrência em Baixo Nível existe para coordenar múltiplos agentes sobre memória compartilhada com garantias explícitas de visibilidade e ordem. Sem isso, corridas de dados, leituras fora de ordem e bugs raros se acumulam em sistemas multicore.",
        "Um bom modelo intuitivo é pensar em concorrência de baixo nível como um problema de observação e sincronização, não só de execução paralela. Pense em um ready flag liberado antes que outra thread veja os dados que supostamente já estavam prontos.",
        "Esse assunto importa porque afeta correção de multicore, caudas de latência e custo de provar invariantes concorrentes. Quando você o entende, decisões de arquitetura deixam de parecer um conjunto de truques desconexos."
      ],
      "blocks": [
        {
          "type": "insight",
          "title": "Intuição útil",
          "body": "pensar em concorrência de baixo nível como um problema de observação e sincronização, não só de execução paralela"
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "assumir que a ordem escrita no código é a mesma ordem observada por todas as threads"
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
        "Definição operacional: conjunto de primitivas e regras de ordem de memória que define quando leituras e escritas se tornam visíveis entre threads.",
        "A unidade crítica para raciocinar sobre custo e comportamento é a operação atômica junto da relação de sincronização que ela pode formar com outras operações. É nela que atrasos, contenção ou corrupção costumam aparecer primeiro.",
        "Quando você enxerga a unidade certa, fica mais fácil separar sintoma de causa. Isso evita o atalho mental de achar que assumir que a ordem escrita no código é a mesma ordem observada por todas as threads."
      ],
      "blocks": [
        {
          "type": "definition",
          "title": "Definição",
          "body": "conjunto de primitivas e regras de ordem de memória que define quando leituras e escritas se tornam visíveis entre threads"
        },
        {
          "type": "example",
          "title": "Exemplo concreto",
          "body": "um ready flag liberado antes que outra thread veja os dados que supostamente já estavam prontos"
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
        "Em alto nível, o fluxo é uma thread produz dados, publica sinalização com semântica apropriada e outra thread só pode consumir corretamente depois da sincronização correspondente.",
        "Em vez de decorar siglas, vale observar a ordem das decisões: produção local, publicação sincronizada, observação remota e progresso e retry. O desenho muda de tema para tema, mas a disciplina mental é a mesma.",
        "A pergunta importante não é apenas 'qual etapa existe?'. A pergunta melhor é 'onde a decisão errada se propaga e quanto custa corrigi-la depois?'."
      ],
      "blocks": [
        {
          "type": "example",
          "title": "Etapas para observar",
          "body": "Use a interação para percorrer a pipeline e notar onde surgem classificação, mediação, sincronização, persistência ou reaproveitamento.",
          "items": [
            "Produção local",
            "Publicação sincronizada",
            "Observação remota",
            "Progresso e retry"
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
        "O eixo central desta aula vai de simplicidade de raciocínio até paralelismo e baixa contenção. Locks e ordens fortes costumam ser mais fáceis de provar, enquanto atomics e caminhos lock-free podem reduzir contenção ao custo de raciocínio muito mais delicado.",
        "Empurrar o desenho demais para um extremo tende a simplificar uma parte e complicar outra. O trabalho do arquiteto é tornar essa troca visível, não escondê-la atrás de defaults.",
        "Por isso, a pergunta madura não é 'qual tecnologia vence?'. É 'qual ponto do eixo faz sentido para este perfil de tráfego, risco e equipe?'."
      ],
      "blocks": [
        {
          "type": "insight",
          "title": "Projeto é posicionamento",
          "body": "O eixo 'simplicidade de raciocínio ↔ paralelismo e baixa contenção' existe porque cada ponta otimiza uma propriedade diferente do sistema."
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
        "O erro recorrente é assumir que a ordem escrita no código é a mesma ordem observada por todas as threads. Isso costuma soar plausível porque a abstração superficial parece simples demais.",
        "Na prática, o limite aparece quando testes locais passam, mas mudanças de cpu, compilador ou carga revelam visibilidade incorreta ou data races. É nesse ponto que o sistema revela o que realmente estava sendo garantido - ou apenas assumido.",
        "Tratar esses limites como detalhes raros é caro. Tratá-los como parte do desenho inicial economiza incidentes, retrabalho e debates improdutivos depois."
      ],
      "blocks": [
        {
          "type": "mistake",
          "title": "Suposição perigosa",
          "body": "assumir que a ordem escrita no código é a mesma ordem observada por todas as threads"
        },
        {
          "type": "insight",
          "title": "Limites são parte da especificação",
          "body": "testes locais passam, mas mudanças de CPU, compilador ou carga revelam visibilidade incorreta ou data races"
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
        "Uma regra prática desta aula é prove qual borda de sincronização protege cada leitura importante antes de buscar lock free heroico.",
        "Repare nos cenários propostos: contador compartilhado, ready flag e fila sob disputa. O mecanismo é o mesmo, mas a decisão muda conforme estado, risco e tipo de carga.",
        "É por isso que bons times documentam intenção, observam métricas e revisam o desenho quando o contexto operacional muda."
      ],
      "blocks": [
        {
          "type": "example",
          "title": "Heurística de decisão",
          "body": "As recomendações abaixo não são receitas eternas; elas são pontos de partida guiados pelo mecanismo que a aula explicou.",
          "items": [
            "Decidir entre lock simples e atomic fetch add conforme a contenção e a semântica exigidas.",
            "Usar uma ordem de memória que garanta que os dados ficaram visíveis antes do sinal.",
            "Medir progresso real e considerar simplificação com locks ou particionamento."
          ]
        },
        {
          "type": "definition",
          "title": "Regra prática",
          "body": "prove qual borda de sincronização protege cada leitura importante antes de buscar lock free heroico"
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
        "Runtimes de serving, sistemas de filas e bibliotecas de tensor também dependem de sincronização correta sob carga multicore.",
        "Em produtos modernos, a mesma lógica reaparece em APIs, jobs assíncronos, pipelines de dados, páginas web, storage, modelos e plataformas internas.",
        "Aprender este tópico dá vocabulário para discutir latência, throughput, integridade, consistência, segurança e custo com mais precisão técnica."
      ],
      "blocks": [
        {
          "type": "insight",
          "title": "Transferência de modelo mental",
          "body": "correção de multicore, caudas de latência e custo de provar invariantes concorrentes"
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
      "body": "coordenar múltiplos agentes sobre memória compartilhada com garantias explícitas de visibilidade e ordem"
    },
    {
      "title": "Modelo mental",
      "body": "pensar em concorrência de baixo nível como um problema de observação e sincronização, não só de execução paralela"
    },
    {
      "title": "Erro comum",
      "body": "assumir que a ordem escrita no código é a mesma ordem observada por todas as threads"
    },
    {
      "title": "Onde reaparece",
      "body": "Runtimes de serving, sistemas de filas e bibliotecas de tensor também dependem de sincronização correta sob carga multicore"
    }
  ],
  "quiz": [
    {
      "id": "q1",
      "prompt": "Qual é a função principal de Concorrência em Baixo Nível em um sistema?",
      "options": [
        {
          "id": "a",
          "label": "coordenar múltiplos agentes sobre memória compartilhada com garantias explícitas de visibilidade e ordem"
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
      "feedback": "A ideia central da aula é coordenar múltiplos agentes sobre memória compartilhada com garantias explícitas de visibilidade e ordem. O tema melhora o projeto do sistema, mas não apaga restrições físicas nem substitui todas as outras camadas."
    },
    {
      "id": "q2",
      "prompt": "Qual modelo mental ajuda mais a entender concorrência em baixo nível?",
      "options": [
        {
          "id": "a",
          "label": "pensar em concorrência de baixo nível como um problema de observação e sincronização, não só de execução paralela"
        },
        {
          "id": "b",
          "label": "Pensar apenas na interface visual, ignorando o mecanismo interno."
        },
        {
          "id": "c",
          "label": "Assumir que concorrência em baixo nível resolve sozinho qualquer gargalo restante."
        }
      ],
      "correctOptionId": "a",
      "feedback": "O melhor atalho mental aqui é: pensar em concorrência de baixo nível como um problema de observação e sincronização, não só de execução paralela. Esse modelo ajuda a prever custo, limite e comportamento operacional."
    },
    {
      "id": "q3",
      "prompt": "No fluxo estudado, qual etapa aparece cedo e condiciona decisões posteriores?",
      "options": [
        {
          "id": "a",
          "label": "Produção local"
        },
        {
          "id": "b",
          "label": "Progresso e retry"
        },
        {
          "id": "c",
          "label": "Uma etapa mágica que elimina a necessidade de observar o sistema."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Produção local acontece cedo e molda o resto do caminho. Erros de classificação ou roteamento se propagam com facilidade."
    },
    {
      "id": "q4",
      "prompt": "Qual afirmação descreve melhor o trade-off central da aula?",
      "options": [
        {
          "id": "a",
          "label": "O objetivo é equilibrar simplicidade de raciocínio e paralelismo e baixa contenção, não maximizar um extremo automaticamente."
        },
        {
          "id": "b",
          "label": "Sempre vale empurrar tudo para paralelismo e baixa contenção."
        },
        {
          "id": "c",
          "label": "Sempre vale empurrar tudo para simplicidade de raciocínio."
        }
      ],
      "correctOptionId": "a",
      "feedback": "O eixo 'simplicidade de raciocínio ↔ paralelismo e baixa contenção' existe porque cada extremo resolve uma dor e cria outra. Projeto maduro explicita essa troca."
    },
    {
      "id": "q5",
      "prompt": "Qual das opções abaixo representa um erro comum discutido na aula?",
      "options": [
        {
          "id": "a",
          "label": "assumir que a ordem escrita no código é a mesma ordem observada por todas as threads"
        },
        {
          "id": "b",
          "label": "prove qual borda de sincronização protege cada leitura importante antes de buscar lock free heroico"
        },
        {
          "id": "c",
          "label": "Medir hipóteses antes de alterar um sistema que já está em produção."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Este é o atalho mental perigoso do tema: assumir que a ordem escrita no código é a mesma ordem observada por todas as threads. A aula insiste em tornar essas suposições explícitas."
    },
    {
      "id": "q6",
      "prompt": "Pensando em cenários reais, qual decisão inicial está mais alinhada com a aula?",
      "options": [
        {
          "id": "a",
          "label": "Decidir entre lock simples e atomic fetch add conforme a contenção e a semântica exigidas."
        },
        {
          "id": "b",
          "label": "Usar uma ordem de memória que garanta que os dados ficaram visíveis antes do sinal."
        },
        {
          "id": "c",
          "label": "Medir progresso real e considerar simplificação com locks ou particionamento."
        }
      ],
      "correctOptionId": "a",
      "feedback": "No primeiro cenário, a recomendação é decidir entre lock simples e atomic fetch add conforme a contenção e a semântica exigidas.. A solução depende do mecanismo certo para o caso, não de um padrão aplicado sem contexto."
    },
    {
      "id": "q7",
      "prompt": "Por que este tema também importa para sistemas de IA e produtos modernos?",
      "options": [
        {
          "id": "a",
          "label": "Runtimes de serving, sistemas de filas e bibliotecas de tensor também dependem de sincronização correta sob carga multicore"
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
      "feedback": "A ponte da aula é direta: runtimes de serving, sistemas de filas e bibliotecas de tensor também dependem de sincronização correta sob carga multicore. Os mesmos fundamentos reaparecem em serving, dados, rede, storage e operação."
    },
    {
      "id": "q8",
      "prompt": "O que costuma quebrar ou exigir cuidado adicional neste tema?",
      "options": [
        {
          "id": "a",
          "label": "testes locais passam, mas mudanças de CPU, compilador ou carga revelam visibilidade incorreta ou data races"
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
      "feedback": "O limite importante aqui é concreto: testes locais passam, mas mudanças de cpu, compilador ou carga revelam visibilidade incorreta ou data races. Em sistemas reais, garantias dependem de política, falha, carga e integração entre camadas."
    }
  ],
  "glossary": [
    {
      "term": "Atomic",
      "definition": "Operação sobre um objeto atômico com indivisibilidade garantida; a visibilidade extra depende da ordem de memória e da sincronização com outra operação compatível."
    },
    {
      "term": "Data race",
      "definition": "Acesso concorrente não sincronizado a um mesmo dado, com pelo menos uma escrita."
    },
    {
      "term": "Acquire",
      "definition": "Semântica de leitura que, ao sincronizar com um release compatível, impede reordenações indevidas e permite observar efeitos publicados antes daquele release."
    },
    {
      "term": "Release",
      "definition": "Semântica de escrita que publica efeitos anteriores da thread para leitores que depois a observam por um acquire compatível."
    },
    {
      "term": "Sequential consistency",
      "definition": "Modelo forte em que operações parecem seguir uma ordem global coerente."
    },
    {
      "term": "Fence",
      "definition": "Barreira que restringe reordenações de memória."
    },
    {
      "term": "CAS",
      "definition": "Compare-and-swap, operação atômica comum em algoritmos lock free."
    },
    {
      "term": "Happens-before",
      "definition": "Relação que nasce de sequenciamento local ou sincronização bem formada e permite afirmar que certos efeitos devem ser visíveis antes de outros."
    },
    {
      "term": "Lock-free",
      "definition": "Propriedade de algoritmos que garantem progresso global sem lock tradicional."
    },
    {
      "term": "Contenção",
      "definition": "Disputa entre múltiplas threads pelo mesmo recurso ou dado."
    }
  ]
} satisfies LessonContent;
