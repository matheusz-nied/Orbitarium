import type { LessonContent } from "../../../types/content";

export const linuxPermissoesProcessosContent = {
  "id": "linux-permissoes-processos",
  "title": "Linux na Prática: Permissões e Processos",
  "subtitle": "Usuários, grupos, modos, PIDs, sinais e exec: como o modelo operacional do Linux realmente organiza acesso e execução.",
  "description": "Uma aula prática sobre permissões de arquivos, owner, group, chmod, chown, fork, exec, sinais e a diferença entre encerrar, substituir e inspecionar processos.",
  "primaryCategoryId": "computacao",
  "secondaryCategoryId": "engenharia",
  "level": "Intermediário",
  "estimatedTime": "45-55 min",
  "tags": [
    "Linux",
    "Permissões",
    "Processos",
    "Signals",
    "fork",
    "exec"
  ],
  "learningObjectives": [
    "Entender permissões como política de acesso multiusuário, não como ritual de comando.",
    "Relacionar owner, group e mode a arquivos e diretórios.",
    "Explicar o fluxo fork → exec → execução → sinalização.",
    "Ganhar intuição prática para inspecionar e agir sobre processos com mais segurança."
  ],
  "prerequisites": [
    "Ter usado terminal ajuda, mas não é obrigatório.",
    "Curiosidade sobre como programas vivem no Linux.",
    "Noção básica de arquivos e diretórios já basta."
  ],
  "references": [
    {
      "title": "chmod(1)",
      "source": "Linux man-pages",
      "url": "https://man7.org/linux/man-pages/man1/chmod.1.html",
      "note": "Referência sobre bits de permissão e uso prático."
    },
    {
      "title": "chown(1)",
      "source": "Linux man-pages",
      "url": "https://man7.org/linux/man-pages/man1/chown.1.html",
      "note": "Explica propriedade e mudança de dono/grupo."
    },
    {
      "title": "fork(2)",
      "source": "Linux man-pages",
      "url": "https://man7.org/linux/man-pages/man2/fork.2.html",
      "note": "Base para o modelo de criação de processos."
    },
    {
      "title": "execve(2)",
      "source": "Linux man-pages",
      "url": "https://man7.org/linux/man-pages/man2/execve.2.html",
      "note": "Mostra como um processo troca sua imagem por outro programa."
    },
    {
      "title": "signal(7)",
      "source": "Linux man-pages",
      "url": "https://man7.org/linux/man-pages/man7/signal.7.html",
      "note": "Referência conceitual para sinais, entrega e comportamento."
    }
  ],
  "heroVisual": "lesson-hero",
  "openingText": "No Linux, muita gente resolve problema com sudo e chmod 777 até a coisa funcionar. Só que esse atalho troca entendimento por risco. Permissões e processos são o idioma operacional do sistema: arquivos carregam dono e modo, programas viram processos, processos recebem sinais e tudo isso influencia segurança, debugging e automação.",
  "quickFacts": [
    {
      "title": "Unidade crítica",
      "body": "o inode com seus bits de permissão e o processo identificado por PID"
    },
    {
      "title": "Trade-off central",
      "body": "conveniência operacional ↔ princípio do menor privilégio"
    },
    {
      "title": "Regra prática",
      "body": "inspecione owner, mode, árvore de processos e sinais antes de mudar estado com força bruta"
    }
  ],
  "sections": [
    {
      "id": "motivacao",
      "eyebrow": "Motivação",
      "title": "Por que Linux na Prática: Permissões e Processos aparece em sistemas sérios",
      "lead": "Explicar como o linux controla acesso a arquivos e como programas vivem como processos observáveis e sinalizáveis muda latência, custo, previsibilidade ou segurança. Por isso, o tema aparece cedo em qualquer sistema que sai do protótipo.",
      "visual": "lesson-hero",
      "paragraphs": [
        "Linux na Prática: Permissões e Processos existe para explicar como o linux controla acesso a arquivos e como programas vivem como processos observáveis e sinalizáveis. Sem isso, usuários expõem dados, matam o processo errado e resolvem operação no modo tentativa e erro.",
        "Um bom modelo intuitivo é pensar em cada arquivo como objeto com política de acesso e em cada programa rodando como entidade com pid, pai e ciclo de vida. Pense em um script que não executa, um job runaway que precisa ser encerrado e um diretório compartilhado entre times.",
        "Esse assunto importa porque afeta segurança operacional, velocidade de debugging e qualidade de automação no linux. Quando você o entende, decisões de arquitetura deixam de parecer um conjunto de truques desconexos."
      ],
      "blocks": [
        {
          "type": "insight",
          "title": "Intuição útil",
          "body": "pensar em cada arquivo como objeto com política de acesso e em cada programa rodando como entidade com PID, pai e ciclo de vida"
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "usar root ou permissões abertas como solução padrão em vez de entender dono, grupo e processo"
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
        "Definição operacional: modelo operacional em que arquivos têm dono, grupo e modo, e programas em execução se tornam processos com identidade, hierarquia e sinais.",
        "A unidade crítica para raciocinar sobre custo e comportamento é o inode com seus bits de permissão e o processo identificado por pid. É nela que atrasos, contenção ou corrupção costumam aparecer primeiro.",
        "Quando você enxerga a unidade certa, fica mais fácil separar sintoma de causa. Isso evita o atalho mental de achar que usar root ou permissões abertas como solução padrão em vez de entender dono, grupo e processo."
      ],
      "blocks": [
        {
          "type": "definition",
          "title": "Definição",
          "body": "modelo operacional em que arquivos têm dono, grupo e modo, e programas em execução se tornam processos com identidade, hierarquia e sinais"
        },
        {
          "type": "example",
          "title": "Exemplo concreto",
          "body": "um script que não executa, um job runaway que precisa ser encerrado e um diretório compartilhado entre times"
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
        "Em alto nível, o fluxo é um processo nasce via fork, troca sua imagem com exec quando necessário, roda sob um usuário e pode receber sinais até encerrar.",
        "Em vez de decorar siglas, vale observar a ordem das decisões: contexto de usuário, fork e exec, execução e inspeção e sinais e término. O desenho muda de tema para tema, mas a disciplina mental é a mesma.",
        "A pergunta importante não é apenas 'qual etapa existe?'. A pergunta melhor é 'onde a decisão errada se propaga e quanto custa corrigi-la depois?'."
      ],
      "blocks": [
        {
          "type": "example",
          "title": "Etapas para observar",
          "body": "Use a interação para percorrer a pipeline e notar onde surgem classificação, mediação, sincronização, persistência ou reaproveitamento.",
          "items": [
            "Contexto de usuário",
            "fork e exec",
            "Execução e inspeção",
            "Sinais e término"
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
        "O eixo central desta aula vai de conveniência operacional até princípio do menor privilégio. Dar acesso demais costuma reduzir atrito no curto prazo, mas destrói isolamento, auditabilidade e segurança quando o sistema cresce ou passa a ser compartilhado.",
        "Empurrar o desenho demais para um extremo tende a simplificar uma parte e complicar outra. O trabalho do arquiteto é tornar essa troca visível, não escondê-la atrás de defaults.",
        "Por isso, a pergunta madura não é 'qual tecnologia vence?'. É 'qual ponto do eixo faz sentido para este perfil de tráfego, risco e equipe?'."
      ],
      "blocks": [
        {
          "type": "insight",
          "title": "Projeto é posicionamento",
          "body": "O eixo 'conveniência operacional ↔ princípio do menor privilégio' existe porque cada ponta otimiza uma propriedade diferente do sistema."
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
        "O erro recorrente é usar root ou permissões abertas como solução padrão em vez de entender dono, grupo e processo. Isso costuma soar plausível porque a abstração superficial parece simples demais.",
        "Na prática, o limite aparece quando scripts, jobs e dados compartilhados ficam frágeis quando ninguém sabe quem pode fazer o quê e qual processo está realmente rodando. É nesse ponto que o sistema revela o que realmente estava sendo garantido - ou apenas assumido.",
        "Tratar esses limites como detalhes raros é caro. Tratá-los como parte do desenho inicial economiza incidentes, retrabalho e debates improdutivos depois."
      ],
      "blocks": [
        {
          "type": "mistake",
          "title": "Suposição perigosa",
          "body": "usar root ou permissões abertas como solução padrão em vez de entender dono, grupo e processo"
        },
        {
          "type": "insight",
          "title": "Limites são parte da especificação",
          "body": "scripts, jobs e dados compartilhados ficam frágeis quando ninguém sabe quem pode fazer o quê e qual processo está realmente rodando"
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
        "Uma regra prática desta aula é inspecione owner, mode, árvore de processos e sinais antes de mudar estado com força bruta.",
        "Repare nos cenários propostos: script não executa, processo runaway e pasta compartilhada. O mecanismo é o mesmo, mas a decisão muda conforme estado, risco e tipo de carga.",
        "É por isso que bons times documentam intenção, observam métricas e revisam o desenho quando o contexto operacional muda."
      ],
      "blocks": [
        {
          "type": "example",
          "title": "Heurística de decisão",
          "body": "As recomendações abaixo não são receitas eternas; elas são pontos de partida guiados pelo mecanismo que a aula explicou.",
          "items": [
            "Conferir bits de permissão, dono e forma de invocação antes de mudar tudo para permissivo.",
            "Inspecionar o PID e enviar sinais graduais, começando por TERM quando possível.",
            "Ajustar owner, group e modos de forma explícita, em vez de recorrer a permissões globais."
          ]
        },
        {
          "type": "definition",
          "title": "Regra prática",
          "body": "inspecione owner, mode, árvore de processos e sinais antes de mudar estado com força bruta"
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
        "Notebooks, serviços de modelo, cron jobs e containers ainda herdam esse mesmo modelo de usuários, arquivos e processos.",
        "Em produtos modernos, a mesma lógica reaparece em APIs, jobs assíncronos, pipelines de dados, páginas web, storage, modelos e plataformas internas.",
        "Aprender este tópico dá vocabulário para discutir latência, throughput, integridade, consistência, segurança e custo com mais precisão técnica."
      ],
      "blocks": [
        {
          "type": "insight",
          "title": "Transferência de modelo mental",
          "body": "segurança operacional, velocidade de debugging e qualidade de automação no Linux"
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
      "body": "explicar como o Linux controla acesso a arquivos e como programas vivem como processos observáveis e sinalizáveis"
    },
    {
      "title": "Modelo mental",
      "body": "pensar em cada arquivo como objeto com política de acesso e em cada programa rodando como entidade com PID, pai e ciclo de vida"
    },
    {
      "title": "Erro comum",
      "body": "usar root ou permissões abertas como solução padrão em vez de entender dono, grupo e processo"
    },
    {
      "title": "Onde reaparece",
      "body": "Notebooks, serviços de modelo, cron jobs e containers ainda herdam esse mesmo modelo de usuários, arquivos e processos"
    }
  ],
  "quiz": [
    {
      "id": "q1",
      "prompt": "Qual é a função principal de Linux na Prática: Permissões e Processos em um sistema?",
      "options": [
        {
          "id": "a",
          "label": "explicar como o Linux controla acesso a arquivos e como programas vivem como processos observáveis e sinalizáveis"
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
      "feedback": "A ideia central da aula é explicar como o linux controla acesso a arquivos e como programas vivem como processos observáveis e sinalizáveis. O tema melhora o projeto do sistema, mas não apaga restrições físicas nem substitui todas as outras camadas."
    },
    {
      "id": "q2",
      "prompt": "Qual modelo mental ajuda mais a entender linux na prática: permissões e processos?",
      "options": [
        {
          "id": "a",
          "label": "pensar em cada arquivo como objeto com política de acesso e em cada programa rodando como entidade com PID, pai e ciclo de vida"
        },
        {
          "id": "b",
          "label": "Pensar apenas na interface visual, ignorando o mecanismo interno."
        },
        {
          "id": "c",
          "label": "Assumir que linux na prática: permissões e processos resolve sozinho qualquer gargalo restante."
        }
      ],
      "correctOptionId": "a",
      "feedback": "O melhor atalho mental aqui é: pensar em cada arquivo como objeto com política de acesso e em cada programa rodando como entidade com pid, pai e ciclo de vida. Esse modelo ajuda a prever custo, limite e comportamento operacional."
    },
    {
      "id": "q3",
      "prompt": "No fluxo estudado, qual etapa aparece cedo e condiciona decisões posteriores?",
      "options": [
        {
          "id": "a",
          "label": "Contexto de usuário"
        },
        {
          "id": "b",
          "label": "Sinais e término"
        },
        {
          "id": "c",
          "label": "Uma etapa mágica que elimina a necessidade de observar o sistema."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Contexto de usuário acontece cedo e molda o resto do caminho. Erros de classificação ou roteamento se propagam com facilidade."
    },
    {
      "id": "q4",
      "prompt": "Qual afirmação descreve melhor o trade-off central da aula?",
      "options": [
        {
          "id": "a",
          "label": "O objetivo é equilibrar conveniência operacional e princípio do menor privilégio, não maximizar um extremo automaticamente."
        },
        {
          "id": "b",
          "label": "Sempre vale empurrar tudo para princípio do menor privilégio."
        },
        {
          "id": "c",
          "label": "Sempre vale empurrar tudo para conveniência operacional."
        }
      ],
      "correctOptionId": "a",
      "feedback": "O eixo 'conveniência operacional ↔ princípio do menor privilégio' existe porque cada extremo resolve uma dor e cria outra. Projeto maduro explicita essa troca."
    },
    {
      "id": "q5",
      "prompt": "Qual das opções abaixo representa um erro comum discutido na aula?",
      "options": [
        {
          "id": "a",
          "label": "usar root ou permissões abertas como solução padrão em vez de entender dono, grupo e processo"
        },
        {
          "id": "b",
          "label": "inspecione owner, mode, árvore de processos e sinais antes de mudar estado com força bruta"
        },
        {
          "id": "c",
          "label": "Medir hipóteses antes de alterar um sistema que já está em produção."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Este é o atalho mental perigoso do tema: usar root ou permissões abertas como solução padrão em vez de entender dono, grupo e processo. A aula insiste em tornar essas suposições explícitas."
    },
    {
      "id": "q6",
      "prompt": "Pensando em cenários reais, qual decisão inicial está mais alinhada com a aula?",
      "options": [
        {
          "id": "a",
          "label": "Conferir bits de permissão, dono e forma de invocação antes de mudar tudo para permissivo."
        },
        {
          "id": "b",
          "label": "Inspecionar o PID e enviar sinais graduais, começando por TERM quando possível."
        },
        {
          "id": "c",
          "label": "Ajustar owner, group e modos de forma explícita, em vez de recorrer a permissões globais."
        }
      ],
      "correctOptionId": "a",
      "feedback": "No primeiro cenário, a recomendação é conferir bits de permissão, dono e forma de invocação antes de mudar tudo para permissivo.. A solução depende do mecanismo certo para o caso, não de um padrão aplicado sem contexto."
    },
    {
      "id": "q7",
      "prompt": "Por que este tema também importa para sistemas de IA e produtos modernos?",
      "options": [
        {
          "id": "a",
          "label": "Notebooks, serviços de modelo, cron jobs e containers ainda herdam esse mesmo modelo de usuários, arquivos e processos"
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
      "feedback": "A ponte da aula é direta: notebooks, serviços de modelo, cron jobs e containers ainda herdam esse mesmo modelo de usuários, arquivos e processos. Os mesmos fundamentos reaparecem em serving, dados, rede, storage e operação."
    },
    {
      "id": "q8",
      "prompt": "O que costuma quebrar ou exigir cuidado adicional neste tema?",
      "options": [
        {
          "id": "a",
          "label": "scripts, jobs e dados compartilhados ficam frágeis quando ninguém sabe quem pode fazer o quê e qual processo está realmente rodando"
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
      "feedback": "O limite importante aqui é concreto: scripts, jobs e dados compartilhados ficam frágeis quando ninguém sabe quem pode fazer o quê e qual processo está realmente rodando. Em sistemas reais, garantias dependem de política, falha, carga e integração entre camadas."
    }
  ],
  "glossary": [
    {
      "term": "Owner",
      "definition": "Usuário dono de um arquivo ou processo."
    },
    {
      "term": "Group",
      "definition": "Grupo associado que participa da política de acesso."
    },
    {
      "term": "chmod",
      "definition": "Comando para alterar bits de permissão de um arquivo ou diretório."
    },
    {
      "term": "chown",
      "definition": "Comando para alterar o dono e, opcionalmente, o grupo de um arquivo."
    },
    {
      "term": "PID",
      "definition": "Identificador de processo no sistema operacional."
    },
    {
      "term": "PPID",
      "definition": "PID do processo pai."
    },
    {
      "term": "fork",
      "definition": "Chamada que cria um novo processo a partir do atual."
    },
    {
      "term": "exec",
      "definition": "Família de chamadas que substitui a imagem do processo por outro programa."
    },
    {
      "term": "Signal",
      "definition": "Notificação assíncrona usada para controlar ou informar um processo."
    },
    {
      "term": "Least privilege",
      "definition": "Princípio de conceder apenas o acesso mínimo necessário."
    }
  ]
} satisfies LessonContent;
