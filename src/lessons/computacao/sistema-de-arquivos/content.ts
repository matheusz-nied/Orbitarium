import type { LessonContent } from "../../../types/content";

export const sistemaDeArquivosContent = {
  "id": "sistema-de-arquivos",
  "title": "Sistema de Arquivos",
  "subtitle": "A abstração que transforma blocos persistentes em nomes, diretórios, permissões e operações que fazem sentido para programas e pessoas.",
  "description": "Uma aula sobre nomes, inodes, diretórios, page cache, journaling e o caminho entre um open() e bytes realmente persistidos.",
  "primaryCategoryId": "computacao",
  "secondaryCategoryId": "engenharia",
  "level": "Intermediário",
  "estimatedTime": "50-60 min",
  "tags": [
    "File System",
    "inode",
    "Persistência",
    "Linux",
    "Journaling",
    "I/O"
  ],
  "learningObjectives": [
    "Entender por que sistema de arquivos é mais do que um conjunto de bytes com nome.",
    "Relacionar path lookup, inode, blocos e page cache.",
    "Perceber a diferença entre gravar na memória do kernel e persistir no dispositivo.",
    "Ler operações comuns como rename, write e fsync com mais precisão."
  ],
  "prerequisites": [
    "Noção básica de armazenamento e arquivos em sistemas operacionais.",
    "Curiosidade sobre Linux ou sistemas Unix-like.",
    "Ajuda ter visto conceitos de memória e kernel, mas não é obrigatório."
  ],
  "references": [
    {
      "title": "Operating Systems: Three Easy Pieces",
      "source": "OSTEP",
      "url": "https://pages.cs.wisc.edu/~remzi/OSTEP/",
      "note": "Capítulos de sistemas de arquivos, persistência e journaling em linguagem didática."
    },
    {
      "title": "inode(7)",
      "source": "Linux man-pages",
      "url": "https://man7.org/linux/man-pages/man7/inode.7.html",
      "note": "Referência conceitual para inode, metadados e tipos de arquivo."
    },
    {
      "title": "Virtual Filesystem (VFS)",
      "source": "Linux Kernel Documentation",
      "url": "https://docs.kernel.org/filesystems/vfs.html",
      "note": "Explica a camada de abstração usada pelo kernel para vários sistemas de arquivos."
    },
    {
      "title": "ext4 documentation",
      "source": "Linux Kernel Documentation",
      "url": "https://docs.kernel.org/filesystems/ext4/",
      "note": "Mostra como um sistema de arquivos real lida com alocação, journal e recuperação."
    },
    {
      "title": "Computer Systems: A Programmer's Perspective",
      "source": "CS:APP / CMU 15-213",
      "url": "https://www.cs.cmu.edu/~213/",
      "note": "Boa ponte entre armazenamento, I/O e a visão do programador de sistemas."
    }
  ],
  "heroVisual": "lesson-hero",
  "openingText": "Salvar um arquivo parece banal: digitar, apertar Ctrl+S e seguir a vida. Mas por trás desse gesto, o sistema precisa resolver um caminho, encontrar metadados, atualizar cache, escolher blocos e se preparar para quedas de energia ou travamentos no meio da operação. Sistema de arquivos é a camada que faz isso parecer simples.",
  "quickFacts": [
    {
      "title": "Unidade crítica",
      "body": "o inode, a entrada de diretório e o mapeamento para blocos"
    },
    {
      "title": "Trade-off central",
      "body": "layout simples e direto ↔ recuperação, cache e recursos extras"
    },
    {
      "title": "Regra prática",
      "body": "separe mentalmente nome, inode, cache e persistência física ao depurar I/O"
    }
  ],
  "sections": [
    {
      "id": "motivacao",
      "eyebrow": "Motivação",
      "title": "Por que Sistema de Arquivos aparece em sistemas sérios",
      "lead": "Organizar dados persistentes como arquivos, diretórios e metadados com semântica útil para programas muda latência, custo, previsibilidade ou segurança. Por isso, o tema aparece cedo em qualquer sistema que sai do protótipo.",
      "visual": "lesson-hero",
      "paragraphs": [
        "Sistema de Arquivos existe para organizar dados persistentes como arquivos, diretórios e metadados com semântica útil para programas. Sem isso, cada aplicação teria de conhecer blocos físicos, recuperação de falhas e controle de nomes por conta própria.",
        "Um bom modelo intuitivo é pensar no sistema de arquivos como um índice de nomes mais uma política de alocação e recuperação sobre blocos persistentes. Pense em renomear uma pasta, salvar uma foto e garantir que o sistema volte consistente após uma queda.",
        "Esse assunto importa porque afeta integridade após falha, custo de i/o e previsibilidade de persistência. Quando você o entende, decisões de arquitetura deixam de parecer um conjunto de truques desconexos."
      ],
      "blocks": [
        {
          "type": "insight",
          "title": "Intuição útil",
          "body": "pensar no sistema de arquivos como um índice de nomes mais uma política de alocação e recuperação sobre blocos persistentes"
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "pensar que arquivo é apenas uma sequência de bytes com nome, ignorando metadados, diretórios e persistência adiada"
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
        "Definição operacional: abstração que mapeia nomes para dados e metadados sobre um meio persistente, definindo também regras de cache, alocação e recuperação.",
        "A unidade crítica para raciocinar sobre custo e comportamento é o inode, a entrada de diretório e o mapeamento para blocos. É nela que atrasos, contenção ou corrupção costumam aparecer primeiro.",
        "Quando você enxerga a unidade certa, fica mais fácil separar sintoma de causa. Isso evita o atalho mental de achar que pensar que arquivo é apenas uma sequência de bytes com nome, ignorando metadados, diretórios e persistência adiada."
      ],
      "blocks": [
        {
          "type": "definition",
          "title": "Definição",
          "body": "abstração que mapeia nomes para dados e metadados sobre um meio persistente, definindo também regras de cache, alocação e recuperação"
        },
        {
          "type": "example",
          "title": "Exemplo concreto",
          "body": "renomear uma pasta, salvar uma foto e garantir que o sistema volte consistente após uma queda"
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
        "Em alto nível, o fluxo é o processo abre um caminho, diretórios resolvem nomes, inodes apontam para dados e o kernel decide quando cache e journal viram persistência real.",
        "Em vez de decorar siglas, vale observar a ordem das decisões: path lookup, metadados e inode, page cache e journal e flush e recuperação. O desenho muda de tema para tema, mas a disciplina mental é a mesma.",
        "A pergunta importante não é apenas 'qual etapa existe?'. A pergunta melhor é 'onde a decisão errada se propaga e quanto custa corrigi-la depois?'."
      ],
      "blocks": [
        {
          "type": "example",
          "title": "Etapas para observar",
          "body": "Use a interação para percorrer a pipeline e notar onde surgem classificação, mediação, sincronização, persistência ou reaproveitamento.",
          "items": [
            "Path lookup",
            "Metadados e inode",
            "Page cache e journal",
            "Flush e recuperação"
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
        "O eixo central desta aula vai de layout simples e direto até recuperação, cache e recursos extras. A estrutura mínima é fácil de entender, mas sistemas reais adicionam cache, journal e metadados ricos para tolerar falhas e concorrência com custo adicional no caminho de escrita.",
        "Empurrar o desenho demais para um extremo tende a simplificar uma parte e complicar outra. O trabalho do arquiteto é tornar essa troca visível, não escondê-la atrás de defaults.",
        "Por isso, a pergunta madura não é 'qual tecnologia vence?'. É 'qual ponto do eixo faz sentido para este perfil de tráfego, risco e equipe?'."
      ],
      "blocks": [
        {
          "type": "insight",
          "title": "Projeto é posicionamento",
          "body": "O eixo 'layout simples e direto ↔ recuperação, cache e recursos extras' existe porque cada ponta otimiza uma propriedade diferente do sistema."
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
        "O erro recorrente é pensar que arquivo é apenas uma sequência de bytes com nome, ignorando metadados, diretórios e persistência adiada. Isso costuma soar plausível porque a abstração superficial parece simples demais.",
        "Na prática, o limite aparece quando uma queda acontece entre escrever dados, atualizar metadados e registrar a intenção de recuperação. É nesse ponto que o sistema revela o que realmente estava sendo garantido - ou apenas assumido.",
        "Tratar esses limites como detalhes raros é caro. Tratá-los como parte do desenho inicial economiza incidentes, retrabalho e debates improdutivos depois."
      ],
      "blocks": [
        {
          "type": "mistake",
          "title": "Suposição perigosa",
          "body": "pensar que arquivo é apenas uma sequência de bytes com nome, ignorando metadados, diretórios e persistência adiada"
        },
        {
          "type": "insight",
          "title": "Limites são parte da especificação",
          "body": "uma queda acontece entre escrever dados, atualizar metadados e registrar a intenção de recuperação"
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
        "Uma regra prática desta aula é separe mentalmente nome, inode, cache e persistência física ao depurar i/o.",
        "Repare nos cenários propostos: gravação crítica, milhares de arquivos pequenos e queda inesperada. O mecanismo é o mesmo, mas a decisão muda conforme estado, risco e tipo de carga.",
        "É por isso que bons times documentam intenção, observam métricas e revisam o desenho quando o contexto operacional muda."
      ],
      "blocks": [
        {
          "type": "example",
          "title": "Heurística de decisão",
          "body": "As recomendações abaixo não são receitas eternas; elas são pontos de partida guiados pelo mecanismo que a aula explicou.",
          "items": [
            "Usar operação atômica compatível com o caso e forçar persistência quando a semântica realmente exigir.",
            "Observar o custo de diretórios, metadados e cache antes de culpar apenas o dispositivo.",
            "Confiar em mecanismos de journal e operações pensadas para recuperação, em vez de assumir escrita instantânea in-place."
          ]
        },
        {
          "type": "definition",
          "title": "Regra prática",
          "body": "separe mentalmente nome, inode, cache e persistência física ao depurar I/O"
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
        "Checkpoints, datasets e artefatos de modelos ainda dependem de arquivos, page cache, flush e recuperação após falha.",
        "Em produtos modernos, a mesma lógica reaparece em APIs, jobs assíncronos, pipelines de dados, páginas web, storage, modelos e plataformas internas.",
        "Aprender este tópico dá vocabulário para discutir latência, throughput, integridade, consistência, segurança e custo com mais precisão técnica."
      ],
      "blocks": [
        {
          "type": "insight",
          "title": "Transferência de modelo mental",
          "body": "integridade após falha, custo de I/O e previsibilidade de persistência"
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
      "body": "organizar dados persistentes como arquivos, diretórios e metadados com semântica útil para programas"
    },
    {
      "title": "Modelo mental",
      "body": "pensar no sistema de arquivos como um índice de nomes mais uma política de alocação e recuperação sobre blocos persistentes"
    },
    {
      "title": "Erro comum",
      "body": "pensar que arquivo é apenas uma sequência de bytes com nome, ignorando metadados, diretórios e persistência adiada"
    },
    {
      "title": "Onde reaparece",
      "body": "Checkpoints, datasets e artefatos de modelos ainda dependem de arquivos, page cache, flush e recuperação após falha"
    }
  ],
  "quiz": [
    {
      "id": "q1",
      "prompt": "Qual é a função principal de Sistema de Arquivos em um sistema?",
      "options": [
        {
          "id": "a",
          "label": "organizar dados persistentes como arquivos, diretórios e metadados com semântica útil para programas"
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
      "feedback": "A ideia central da aula é organizar dados persistentes como arquivos, diretórios e metadados com semântica útil para programas. O tema melhora o projeto do sistema, mas não apaga restrições físicas nem substitui todas as outras camadas."
    },
    {
      "id": "q2",
      "prompt": "Qual modelo mental ajuda mais a entender sistema de arquivos?",
      "options": [
        {
          "id": "a",
          "label": "pensar no sistema de arquivos como um índice de nomes mais uma política de alocação e recuperação sobre blocos persistentes"
        },
        {
          "id": "b",
          "label": "Pensar apenas na interface visual, ignorando o mecanismo interno."
        },
        {
          "id": "c",
          "label": "Assumir que sistema de arquivos resolve sozinho qualquer gargalo restante."
        }
      ],
      "correctOptionId": "a",
      "feedback": "O melhor atalho mental aqui é: pensar no sistema de arquivos como um índice de nomes mais uma política de alocação e recuperação sobre blocos persistentes. Esse modelo ajuda a prever custo, limite e comportamento operacional."
    },
    {
      "id": "q3",
      "prompt": "No fluxo estudado, qual etapa aparece cedo e condiciona decisões posteriores?",
      "options": [
        {
          "id": "a",
          "label": "Path lookup"
        },
        {
          "id": "b",
          "label": "Flush e recuperação"
        },
        {
          "id": "c",
          "label": "Uma etapa mágica que elimina a necessidade de observar o sistema."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Path lookup acontece cedo e molda o resto do caminho. Erros de classificação ou roteamento se propagam com facilidade."
    },
    {
      "id": "q4",
      "prompt": "Qual afirmação descreve melhor o trade-off central da aula?",
      "options": [
        {
          "id": "a",
          "label": "O objetivo é equilibrar layout simples e direto e recuperação, cache e recursos extras, não maximizar um extremo automaticamente."
        },
        {
          "id": "b",
          "label": "Sempre vale empurrar tudo para recuperação, cache e recursos extras."
        },
        {
          "id": "c",
          "label": "Sempre vale empurrar tudo para layout simples e direto."
        }
      ],
      "correctOptionId": "a",
      "feedback": "O eixo 'layout simples e direto ↔ recuperação, cache e recursos extras' existe porque cada extremo resolve uma dor e cria outra. Projeto maduro explicita essa troca."
    },
    {
      "id": "q5",
      "prompt": "Qual das opções abaixo representa um erro comum discutido na aula?",
      "options": [
        {
          "id": "a",
          "label": "pensar que arquivo é apenas uma sequência de bytes com nome, ignorando metadados, diretórios e persistência adiada"
        },
        {
          "id": "b",
          "label": "separe mentalmente nome, inode, cache e persistência física ao depurar I/O"
        },
        {
          "id": "c",
          "label": "Medir hipóteses antes de alterar um sistema que já está em produção."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Este é o atalho mental perigoso do tema: pensar que arquivo é apenas uma sequência de bytes com nome, ignorando metadados, diretórios e persistência adiada. A aula insiste em tornar essas suposições explícitas."
    },
    {
      "id": "q6",
      "prompt": "Pensando em cenários reais, qual decisão inicial está mais alinhada com a aula?",
      "options": [
        {
          "id": "a",
          "label": "Usar operação atômica compatível com o caso e forçar persistência quando a semântica realmente exigir."
        },
        {
          "id": "b",
          "label": "Observar o custo de diretórios, metadados e cache antes de culpar apenas o dispositivo."
        },
        {
          "id": "c",
          "label": "Confiar em mecanismos de journal e operações pensadas para recuperação, em vez de assumir escrita instantânea in-place."
        }
      ],
      "correctOptionId": "a",
      "feedback": "No primeiro cenário, a recomendação é usar operação atômica compatível com o caso e forçar persistência quando a semântica realmente exigir.. A solução depende do mecanismo certo para o caso, não de um padrão aplicado sem contexto."
    },
    {
      "id": "q7",
      "prompt": "Por que este tema também importa para sistemas de IA e produtos modernos?",
      "options": [
        {
          "id": "a",
          "label": "Checkpoints, datasets e artefatos de modelos ainda dependem de arquivos, page cache, flush e recuperação após falha"
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
      "feedback": "A ponte da aula é direta: checkpoints, datasets e artefatos de modelos ainda dependem de arquivos, page cache, flush e recuperação após falha. Os mesmos fundamentos reaparecem em serving, dados, rede, storage e operação."
    },
    {
      "id": "q8",
      "prompt": "O que costuma quebrar ou exigir cuidado adicional neste tema?",
      "options": [
        {
          "id": "a",
          "label": "uma queda acontece entre escrever dados, atualizar metadados e registrar a intenção de recuperação"
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
      "feedback": "O limite importante aqui é concreto: uma queda acontece entre escrever dados, atualizar metadados e registrar a intenção de recuperação. Em sistemas reais, garantias dependem de política, falha, carga e integração entre camadas."
    }
  ],
  "glossary": [
    {
      "term": "inode",
      "definition": "Estrutura que identifica um arquivo e guarda seus metadados principais, exceto o nome."
    },
    {
      "term": "Entrada de diretório",
      "definition": "Associação entre um nome legível e um inode."
    },
    {
      "term": "Page cache",
      "definition": "Cache mantido pelo kernel para leituras e escritas de arquivos."
    },
    {
      "term": "Journaling",
      "definition": "Técnica para registrar intenções ou mudanças a fim de facilitar recuperação após falhas."
    },
    {
      "term": "fsync",
      "definition": "Operação que solicita a persistência dos dados e/ou metadados de um arquivo."
    },
    {
      "term": "Metadados",
      "definition": "Informações sobre o arquivo, como dono, tamanho, timestamps e permissões."
    },
    {
      "term": "Bloco",
      "definition": "Unidade de alocação ou transferência entre sistema de arquivos e armazenamento subjacente."
    },
    {
      "term": "Mount point",
      "definition": "Ponto da árvore de diretórios onde um sistema de arquivos é anexado."
    },
    {
      "term": "File descriptor",
      "definition": "Identificador que um processo usa para operar sobre um arquivo aberto."
    },
    {
      "term": "VFS",
      "definition": "Camada do kernel que abstrai diferentes implementações de sistemas de arquivos."
    }
  ]
} satisfies LessonContent;
