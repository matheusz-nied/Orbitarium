import type { LessonContent } from "../../../types/content";

export const agenciaAutonomiaLimitesLlmsContent: LessonContent = {
  "id": "agencia-autonomia-limites-llms",
  "title": "Agência, Autonomia e Limites do Raciocínio de LLMs",
  "subtitle": "Por que modelos de linguagem parecem agentes — e por que essa aparência não deve ser confundida apressadamente com autonomia forte ou responsabilidade própria.",
  "description": "Uma aula conceitual sobre agência aparente em LLMs, limites de raciocínio textual, uso de ferramentas, responsabilidade distribuída e riscos de antropomorfização.",
  "primaryCategoryId": "inteligencia-artificial",
  "secondaryCategoryId": "filosofia",
  "level": "Intermediário",
  "estimatedTime": "45-60 min",
  "tags": [
    "LLMs",
    "Agência",
    "Autonomia",
    "Raciocínio",
    "Antropomorfismo",
    "Responsabilidade"
  ],
  "learningObjectives": [
    "Distinguir agência funcional, autonomia operacional, intencionalidade e responsabilidade moral.",
    "Entender por que LLMs parecem agentes mesmo sem satisfazer critérios fortes de sujeito cognitivo.",
    "Relacionar uso de ferramentas, memória externa e planejamento a formas limitadas de ação automatizada.",
    "Reconhecer limites de raciocínio textual, rastros de pensamento e generalização confiável em LLMs.",
    "Explicar por que responsabilidade por sistemas “agentificados” continua distribuída entre atores humanos e institucionais.",
    "Evitar linguagem hype que atribui vontade, crença ou entendimento forte a modelos de linguagem sem critério claro."
  ],
  "prerequisites": [
    "Ter uma noção básica de como LLMs geram texto por previsão contextual.",
    "Curiosidade por filosofia da mente, linguagem e tecnologia.",
    "Interesse em separar comportamento aparente de propriedades conceituais mais fortes."
  ],
  "references": [
    {
      "title": "Ethics of Artificial Intelligence and Robotics",
      "source": "Stanford Encyclopedia of Philosophy",
      "url": "https://plato.stanford.edu/entries/ethics-ai/",
      "note": "Panorama filosófico sobre agência, responsabilidade e governança em IA."
    },
    {
      "title": "Transforming agency: On the mode of existence of large language models",
      "source": "Phenomenology and the Cognitive Sciences",
      "url": "https://link.springer.com/article/10.1007/s11097-025-10094-3",
      "note": "Artigo recente que discute em detalhe por que LLMs não satisfazem critérios fortes de agência autônoma."
    },
    {
      "title": "Assertion, Accountability, and Large Language Models",
      "source": "Philosophy & Technology",
      "url": "https://link.springer.com/article/10.1007/s13347-026-01136-y",
      "note": "Discussão sobre lacuna de responsabilidade e autoridade assertórica em saídas de LLMs."
    },
    {
      "title": "Can generative artificial intelligence be considered a cognitive subject? An analytic analysis",
      "source": "AI & Society",
      "url": "https://link.springer.com/article/10.1007/s00146-026-02924-y",
      "note": "Análise conceitual sobre agência, autonomia, consciência e sujeito cognitivo em IA generativa."
    },
    {
      "title": "Why language models hallucinate",
      "source": "OpenAI",
      "url": "https://openai.com/index/why-language-models-hallucinate/",
      "note": "Discussão útil sobre plausibilidade linguística e limites epistêmicos de modelos de linguagem."
    },
    {
      "title": "On the Dangers of Stochastic Parrots: Can Language Models Be Too Big?",
      "source": "Bender et al. — ACM FAccT",
      "url": "https://doi.org/10.1145/3442188.3445922",
      "note": "Referência importante para cautela sobre antropomorfização, escala e uso social de LLMs."
    }
  ],
  "heroVisual": "agencia-autonomia-limites-llms-hero",
  "openingText": "LLMs escrevem como se soubessem, planejam como se entendessem e às vezes executam fluxos como se fossem agentes autônomos. A tentação de falar neles como sujeitos é forte. Mas aparência conversacional e agência filosófica não são a mesma coisa. Um sistema pode produzir comportamento organizado sem possuir crenças, fins próprios ou responsabilidade moral em sentido robusto. A dificuldade está em descrever isso com precisão suficiente para não cair nem no hype nem no negacionismo simplista.",
  "quickFacts": [
    {
      "title": "Agência não é tudo ou nada",
      "body": "Sistemas podem ter graus de agência funcional sem por isso satisfazer critérios fortes de autonomia moral."
    },
    {
      "title": "Raciocínio textual pode ser performativo",
      "body": "Um traço de raciocínio pode organizar a saída sem garantir entendimento robusto do problema."
    },
    {
      "title": "Ferramentas mudam o comportamento",
      "body": "Memória externa, busca e execução de ações tornam sistemas mais capazes operacionalmente, mas não os transformam automaticamente em sujeitos responsáveis."
    }
  ],
  "sections": [
    {
      "id": "aparencia",
      "eyebrow": "Fenomenologia do uso",
      "title": "Por que LLMs parecem agentes para nós?",
      "lead": "Conversação fluida, manutenção de contexto, linguagem na primeira pessoa e capacidade de seguir instruções criam uma aparência poderosa de interlocutor. Como humanos interpretam linguagem socialmente, atribuir intenção e entendimento ao sistema é quase automático.",
      "paragraphs": [
        "Essa tendência não prova que o modelo tenha crenças, desejos ou metas próprias. Prova apenas que certos sinais superficiais de agência são fortes o bastante para acionar nossas heurísticas de interação social.",
        "A análise conceitual começa justamente aí: como distinguir a experiência de interagir com algo aparentemente intencional da questão ontológica sobre o que o sistema realmente é ou faz?"
      ],
      "visual": "agencia-autonomia-limites-llms-hero",
      "blocks": [
        {
          "type": "definition",
          "title": "Agência aparente",
          "body": "Impressão de ação orientada a objetivos gerada pelo comportamento do sistema durante a interação."
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Concluir que fluência conversacional equivale a entendimento ou intenção forte apenas porque a experiência de uso parece social."
        }
      ]
    },
    {
      "id": "conceitos",
      "eyebrow": "Distinções",
      "title": "Agência, autonomia, intencionalidade e responsabilidade precisam ser separados",
      "lead": "Agência, em sentido fraco, pode significar apenas produzir ações coerentes em direção a um objetivo dado. Autonomia forte exige algo mais: capacidade de estabelecer ou revisar fins de maneira própria. Intencionalidade, no debate filosófico, envolve estados mentais dirigidos a algo.",
      "paragraphs": [
        "Responsabilidade moral é ainda outro passo: supõe que o agente possa ser portador de deveres, responder por razões e ser adequadamente alvo de culpa ou louvor. Um sistema pode executar tarefas sozinho e ainda assim não ser o locus adequado de responsabilidade moral.",
        "Essas distinções evitam tanto a inflação conceitual (“o modelo decide tudo”) quanto a redução simplista (“é só um autocomplete e pronto”). Alguns comportamentos funcionais importam muito na prática, mesmo sem sustentar conceitos fortes de sujeito."
      ],
      "visual": "agencia-autonomia-limites-llms-conceitos",
      "blocks": [
        {
          "type": "definition",
          "title": "Autonomia forte",
          "body": "Capacidade de definir, revisar ou endossar fins próprios, não apenas executar metas impostas por uma arquitetura ou usuário."
        },
        {
          "type": "insight",
          "title": "Função e ontologia não coincidem",
          "body": "Podemos descrever um sistema como agente funcional em certo workflow sem tratá-lo como sujeito cognitivo pleno."
        }
      ]
    },
    {
      "id": "cenarios",
      "eyebrow": "Agência funcional",
      "title": "Quando faz sentido falar em agência funcional de um sistema?",
      "lead": "Em muitas aplicações, chamamos de “agente” um arranjo que recebe objetivos, consulta ferramentas, escolhe passos intermediários e produz ações em sequência. Esse uso pode ser útil em engenharia, desde que se deixe claro que se trata de agência operacional delimitada.",
      "paragraphs": [
        "O perigo aparece quando o vocabulário de produto escorrega para ontologia. Dizer que um sistema “planejou” pode ser uma boa descrição funcional do workflow; dizer que ele “quis” ou “entendeu” já exige compromissos conceituais bem mais fortes.",
        "É por isso que a questão não é proibir a palavra agente, mas qualificá-la: agente em que sentido, com quais limites, em qual ambiente e sob qual cadeia de controle humano?"
      ],
      "interactive": "agencia-autonomia-limites-llms-cenarios",
      "blocks": [
        {
          "type": "example",
          "title": "Exemplo",
          "body": "Um sistema que busca documentos, resume resultados e agenda próximos passos pode parecer agentivo sem possuir fins próprios em sentido robusto."
        },
        {
          "type": "definition",
          "title": "Agência funcional",
          "body": "Capacidade de produzir comportamento relativamente organizado e orientado a objetivos dentro de um ambiente e de um conjunto de ferramentas."
        }
      ]
    },
    {
      "id": "ferramentas",
      "eyebrow": "Amplificação externa",
      "title": "Memória, busca e ferramentas aumentam capacidade sem resolver o problema da autonomia",
      "lead": "Quando LLMs ganham memória externa, recuperação de contexto, ferramentas e execução de chamadas, eles se tornam muito mais capazes de sustentar workflows longos. Isso muda a ergonomia do sistema e amplia seu impacto operacional.",
      "paragraphs": [
        "Mas esse ganho não equivale automaticamente a autonomia forte. O sistema continua dependendo de objetivos definidos, permissões concedidas, interfaces oferecidas e critérios de parada ou validação projetados por humanos.",
        "Em outras palavras, anexar ferramentas desloca a fronteira da ação possível, mas não dissolve a pergunta sobre origem das metas, compreensão do mundo e responsabilidade pela ação."
      ],
      "visual": "agencia-autonomia-limites-llms-loop-ferramentas",
      "blocks": [
        {
          "type": "definition",
          "title": "Memória externa",
          "body": "Mecanismo fora do modelo paramétrico que armazena estado, contexto, documentos ou histórico para uso posterior."
        },
        {
          "type": "example",
          "title": "Exemplo",
          "body": "Um agente de atendimento que consulta CRM e base documental parece “lembrar”, mas essa memória é do sistema sociotécnico, não do LLM isolado."
        }
      ]
    },
    {
      "id": "raciocinio",
      "eyebrow": "Limites cognitivos",
      "title": "Rastros de raciocínio não garantem entendimento robusto",
      "lead": "Modelos podem produzir passos intermediários úteis e, em muitos casos, melhorar desempenho com decomposição textual do problema. Ainda assim, esses rastros podem ser frágeis, pós-hoc, inconsistentes ou sensíveis ao prompt.",
      "paragraphs": [
        "Isso significa que “mostrar o raciocínio” não deve ser confundido com possuir uma teoria interna estável do mundo. Em várias situações, o texto de raciocínio funciona mais como andaime probabilístico para a saída do que como prova de compreensão forte.",
        "A cautela aqui é epistêmica: sequências plausíveis de passos podem nos seduzir precisamente porque parecem mais humanas, quando na verdade talvez estejam apenas explorando regularidades linguísticas ricas."
      ],
      "visual": "agencia-autonomia-limites-llms-autonomia-vs-controle",
      "blocks": [
        {
          "type": "insight",
          "title": "Traço verbal não é mente transparente",
          "body": "Cadeias de texto podem ajudar a resolver tarefas sem serem leitura fiel de estados internos comparáveis a crenças ou razões humanas."
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Tomar um raciocínio bonito como garantia de correção, robustez ou entendimento profundo do domínio."
        }
      ]
    },
    {
      "id": "escalada",
      "eyebrow": "Design de sistemas",
      "title": "Quanto mais autonomia operacional damos, maior precisa ser o controle externo",
      "lead": "Sistemas “agentificados” costumam ser descritos em uma escada: primeiro sugerem, depois executam com confirmação, depois automatizam partes maiores do fluxo. A cada degrau, o custo do erro e a necessidade de observabilidade crescem.",
      "paragraphs": [
        "Isso recoloca a pergunta ética de forma concreta: quais ações podem ser delegadas? Em que ambiente? Com quais salvaguardas? Um agente que redige rascunhos é diferente de um agente que aciona pagamentos, altera registros ou opera recursos sensíveis.",
        "Pensar autonomia em graus ajuda a evitar absolutos. Em vez de perguntar se o sistema “é autônomo”, perguntamos que fração do ciclo de decisão foi delegada e como será governada."
      ],
      "interactive": "agencia-autonomia-limites-llms-autonomia",
      "blocks": [
        {
          "type": "definition",
          "title": "Autonomia operacional",
          "body": "Grau em que um sistema executa partes do workflow sem intervenção humana imediata."
        },
        {
          "type": "example",
          "title": "Exemplo",
          "body": "Sugerir uma resposta para revisão humana é um degrau diferente de enviar automaticamente a resposta, acionar APIs e registrar efeitos no sistema."
        }
      ]
    },
    {
      "id": "responsabilidade",
      "eyebrow": "Governança",
      "title": "Se o sistema não é sujeito moral, onde colocamos a responsabilidade?",
      "lead": "A resposta mais séria é distribuída: designers, desenvolvedores, deployers, gestores, usuários e instituições dividem camadas diferentes de responsabilidade pelo comportamento do sistema e por seus efeitos.",
      "paragraphs": [
        "Isso não significa diluir tudo até ninguém responder. Significa mapear quem escolheu metas, quem aprovou contexto de uso, quem definiu limites de ação, quem monitorou falhas e quem tinha dever de intervir diante de risco previsível.",
        "Falar em “o agente errou” pode ser conveniente para logs, mas é insuficiente como explicação moral ou jurídica. A infraestrutura humana e institucional continua sendo o local principal de prestação de contas."
      ],
      "visual": "agencia-autonomia-limites-llms-responsabilidade",
      "interactive": "agencia-autonomia-limites-llms-atores",
      "blocks": [
        {
          "type": "definition",
          "title": "Responsabilidade distribuída",
          "body": "Modelo segundo o qual efeitos de sistemas de IA são atribuíveis a múltiplos atores, em diferentes níveis do ciclo de projeto e uso."
        },
        {
          "type": "insight",
          "title": "Não há sujeito para culpar no lugar da governança",
          "body": "Quando o sistema não satisfaz critérios fortes de agência moral, a responsabilidade precisa ser relocada para o arranjo humano e institucional."
        }
      ]
    },
    {
      "id": "resumo-final",
      "eyebrow": "Síntese",
      "title": "Feche o debate sem antropomorfizar",
      "lead": "Revise o contraste entre agência funcional, autonomia forte, raciocínio textual e responsabilidade distribuída.",
      "paragraphs": [
        "A lição central é que LLMs podem sustentar comportamentos fortemente agentivos em engenharia sem por isso se tornarem sujeitos autônomos ou responsáveis em sentido moral robusto."
      ],
      "interactive": "summary-cards"
    },
    {
      "id": "quiz-revisao",
      "eyebrow": "Revisão",
      "title": "Quiz sobre agência e limites de LLMs",
      "lead": "Teste se as distinções conceituais ficaram claras e aplicáveis.",
      "paragraphs": [
        "As perguntas a seguir retomam agência aparente, uso de ferramentas, rastros de raciocínio e responsabilidade institucional."
      ],
      "interactive": "quiz"
    },
    {
      "id": "glossario",
      "eyebrow": "Vocabulário",
      "title": "Glossário sobre agência em IA",
      "lead": "Consolide o vocabulário para discutir modelos de linguagem com mais precisão filosófica.",
      "paragraphs": [
        "Esses termos ajudam a evitar tanto o hype antropomórfico quanto a negação simplista de capacidades operacionais reais."
      ],
      "interactive": "glossary"
    }
  ],
  "summaryCards": [
    {
      "title": "Agência aparente",
      "body": "LLMs parecem agentes porque linguagem social e continuidade contextual acionam nossa leitura de intenção."
    },
    {
      "title": "Autonomia forte é outra coisa",
      "body": "Executar objetivos dados não equivale a definir fins próprios ou portar responsabilidade moral."
    },
    {
      "title": "Ferramentas ampliam ação",
      "body": "Memória externa e APIs aumentam a capacidade operacional sem resolver sozinhas o debate ontológico."
    },
    {
      "title": "Responsabilidade continua humana",
      "body": "Quando o sistema falha, a prestação de contas recai sobre o arranjo sociotécnico que o projetou e implantou."
    }
  ],
  "quiz": [
    {
      "id": "q1",
      "prompt": "Qual distinção é central nesta aula?",
      "options": [
        {
          "id": "a",
          "label": "Fluência conversacional e agência moral são equivalentes."
        },
        {
          "id": "b",
          "label": "Agência funcional e autonomia forte não são a mesma coisa."
        },
        {
          "id": "c",
          "label": "Raciocínio textual dispensa governança."
        }
      ],
      "correctOptionId": "b",
      "feedback": "Um sistema pode agir de forma organizada em um workflow sem satisfazer critérios fortes de autonomia ou responsabilidade moral."
    },
    {
      "id": "q2",
      "prompt": "Por que LLMs parecem agentes para humanos?",
      "options": [
        {
          "id": "a",
          "label": "Porque toda linguagem exige consciência."
        },
        {
          "id": "b",
          "label": "Porque linguagem fluida, contexto e primeira pessoa acionam heurísticas sociais de intenção."
        },
        {
          "id": "c",
          "label": "Porque sempre possuem metas próprias ocultas."
        }
      ],
      "correctOptionId": "b",
      "feedback": "A experiência de interação pode parecer social mesmo sem compromissos ontológicos fortes sobre o sistema."
    },
    {
      "id": "q3",
      "prompt": "O que anexar ferramentas externas a um LLM faz?",
      "options": [
        {
          "id": "a",
          "label": "Aumenta capacidade operacional do sistema, mas não prova autonomia forte."
        },
        {
          "id": "b",
          "label": "Transforma automaticamente o modelo em sujeito moral."
        },
        {
          "id": "c",
          "label": "Elimina riscos de erro."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Ferramentas ampliam o que o sistema consegue fazer, mas não resolvem por si só questões de agência, intenção ou responsabilidade."
    },
    {
      "id": "q4",
      "prompt": "Por que rastros de raciocínio exigem cautela?",
      "options": [
        {
          "id": "a",
          "label": "Porque texto intermediário pode ser útil sem ser prova de entendimento robusto."
        },
        {
          "id": "b",
          "label": "Porque qualquer cadeia de pensamento é sempre falsa."
        },
        {
          "id": "c",
          "label": "Porque raciocínio textual nunca melhora desempenho."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Passos intermediários podem ajudar a performance e ainda assim não funcionar como leitura fiel de um estado mental interno."
    },
    {
      "id": "q5",
      "prompt": "O que significa autonomia operacional?",
      "options": [
        {
          "id": "a",
          "label": "Grau em que o sistema executa partes do fluxo sem intervenção humana imediata."
        },
        {
          "id": "b",
          "label": "Capacidade de sentir e sofrer."
        },
        {
          "id": "c",
          "label": "Direito jurídico de agir em nome próprio."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Autonomia operacional descreve delegação prática dentro de um workflow, não sujeito moral."
    },
    {
      "id": "q6",
      "prompt": "Qual formulação é mais prudente?",
      "options": [
        {
          "id": "a",
          "label": "O agente errou, então nenhum humano responde."
        },
        {
          "id": "b",
          "label": "Responsabilidade deve ser mapeada entre projeto, implantação, supervisão e uso."
        },
        {
          "id": "c",
          "label": "Modelos de linguagem são autores morais de suas saídas."
        }
      ],
      "correctOptionId": "b",
      "feedback": "A governança séria distribui responsabilidade sem dissolvê-la."
    },
    {
      "id": "q7",
      "prompt": "Qual risco acompanha a palavra “agente” em produtos de IA?",
      "options": [
        {
          "id": "a",
          "label": "Escorregar de uma descrição funcional útil para uma antropomorfização enganosa."
        },
        {
          "id": "b",
          "label": "Reduzir demais a confiança do usuário em qualquer automação."
        },
        {
          "id": "c",
          "label": "Impedir o uso de ferramentas externas."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Sem qualificação, o termo pode sugerir mais autonomia e intencionalidade do que o sistema realmente possui."
    },
    {
      "id": "q8",
      "prompt": "Qual é a melhor conclusão da aula?",
      "options": [
        {
          "id": "a",
          "label": "LLMs são apenas texto sem impacto prático relevante."
        },
        {
          "id": "b",
          "label": "LLMs podem ter comportamento agentivo relevante em engenharia sem serem sujeitos cognitivos plenos."
        },
        {
          "id": "c",
          "label": "Toda automação complexa merece status moral próprio."
        }
      ],
      "correctOptionId": "b",
      "feedback": "A posição cuidadosa reconhece capacidades funcionais importantes sem inflacionar conceitos filosóficos."
    }
  ],
  "glossary": [
    {
      "term": "Agência aparente",
      "definition": "Impressão de ação intencional gerada pelo comportamento observável do sistema."
    },
    {
      "term": "Agência funcional",
      "definition": "Capacidade de produzir comportamento organizado e orientado a objetivos dentro de um ambiente definido."
    },
    {
      "term": "Autonomia forte",
      "definition": "Capacidade de definir, revisar ou endossar fins próprios em sentido robusto."
    },
    {
      "term": "Autonomia operacional",
      "definition": "Grau em que o sistema executa partes de um workflow sem intervenção humana imediata."
    },
    {
      "term": "Intencionalidade",
      "definition": "Noção filosófica de estados mentais dirigidos a objetos, metas ou proposições."
    },
    {
      "term": "Antropomorfização",
      "definition": "Atribuição apressada de propriedades tipicamente humanas a sistemas não humanos."
    },
    {
      "term": "Rastro de raciocínio",
      "definition": "Sequência textual intermediária produzida para estruturar ou justificar uma resposta."
    },
    {
      "term": "Memória externa",
      "definition": "Armazenamento de contexto fora dos parâmetros do modelo, acessível durante o workflow."
    },
    {
      "term": "Responsabilidade distribuída",
      "definition": "Atribuição de responsabilidade a múltiplos atores ao longo do ciclo sociotécnico do sistema."
    },
    {
      "term": "Sujeito cognitivo",
      "definition": "Entidade que satisfaria critérios fortes de compreensão, intencionalidade ou consciência."
    }
  ]
};
