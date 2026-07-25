import type { LessonContent } from "../../../types/content";

export const criptografiaModernaIntuicaoContent: LessonContent = {
  "id": "criptografia-moderna-intuicao",
  "title": "Criptografia Moderna (Intuição)",
  "subtitle": "Chaves, sigilo, autenticidade e protocolos: como pensar cifragem sem misturar hash, cifra e assinatura no mesmo saco.",
  "description": "Uma aula intuitiva sobre criptografia simétrica, assimétrica, AEAD, assinaturas, certificados, nonces e por que protocolos padrão vencem invenções caseiras.",
  "primaryCategoryId": "computacao",
  "secondaryCategoryId": "engenharia",
  "level": "Intermediário",
  "estimatedTime": "55-65 min",
  "tags": [
    "Criptografia",
    "TLS",
    "Assinaturas",
    "AES",
    "Chaves",
    "Segurança"
  ],
  "learningObjectives": [
    "Diferenciar sigilo, integridade e autenticidade como objetivos distintos.",
    "Entender por que cifra simétrica e assimétrica cumprem papéis diferentes.",
    "Relacionar nonces, chaves e protocolos a erros operacionais frequentes.",
    "Valorizar protocolos estabelecidos em vez de cripto caseira."
  ],
  "prerequisites": [
    "Curiosidade sobre HTTPS, senhas ou troca segura de mensagens.",
    "Noção básica de que redes podem ser observadas por terceiros.",
    "Não é necessário conhecimento matemático formal."
  ],
  "references": [
    {
      "title": "What is public-key cryptography?",
      "source": "Cloudflare Learning Center",
      "url": "https://www.cloudflare.com/learning/ssl/how-does-public-key-encryption-work/",
      "note": "Explica o papel de chaves públicas e privadas em canais inseguros."
    },
    {
      "title": "What happens in a TLS handshake?",
      "source": "Cloudflare Learning Center",
      "url": "https://www.cloudflare.com/learning/ssl/what-happens-in-a-tls-handshake/",
      "note": "Boa ponte entre teoria criptográfica e HTTPS real."
    },
    {
      "title": "The Transport Layer Security (TLS) Protocol Version 1.3",
      "source": "RFC 8446",
      "url": "https://datatracker.ietf.org/doc/html/rfc8446",
      "note": "Especificação oficial de um protocolo moderno que combina várias primitivas."
    },
    {
      "title": "Advanced Encryption Standard (AES)",
      "source": "NIST FIPS 197",
      "url": "https://csrc.nist.gov/publications/detail/fips/197/final",
      "note": "Padrão oficial para cifra simétrica amplamente usada."
    },
    {
      "title": "Web security",
      "source": "MDN Web Docs",
      "url": "https://developer.mozilla.org/en-US/docs/Web/Security",
      "note": "Panorama prático de segurança na Web, autenticidade e transporte seguro."
    }
  ],
  "heroVisual": "lesson-hero",
  "openingText": "Muita gente fala 'criptografar' como se isso respondesse a qualquer pergunta de segurança. Mas esconder conteúdo, provar autoria e impedir alteração são objetivos diferentes. Criptografia moderna é menos sobre um algoritmo isolado e mais sobre combinar primitivas certas sob um protocolo confiável.",
  "quickFacts": [
    {
      "title": "Unidade crítica",
      "body": "a relação entre chave, nonce e mensagem"
    },
    {
      "title": "Trade-off central",
      "body": "simplicidade operacional ↔ garantias criptográficas fortes"
    },
    {
      "title": "Regra prática",
      "body": "reuse protocolos padrão, trate chaves como ativos de primeira classe e faça autenticidade ser explícita"
    }
  ],
  "sections": [
    {
      "id": "motivacao",
      "eyebrow": "Motivação",
      "title": "Por que Criptografia Moderna (Intuição) aparece em sistemas sérios",
      "lead": "Proteger confidencialidade e autenticidade de dados em ambientes onde não podemos confiar no canal muda latência, custo, previsibilidade ou segurança. Por isso, o tema aparece cedo em qualquer sistema que sai do protótipo.",
      "visual": "lesson-hero",
      "paragraphs": [
        "Criptografia Moderna (Intuição) existe para proteger confidencialidade e autenticidade de dados em ambientes onde não podemos confiar no canal. Sem isso, escuta, adulteração e impersonação se tornam triviais em trânsito ou armazenamento exposto.",
        "Um bom modelo intuitivo é pensar em duas famílias complementares: criptografia simétrica protege dados em volume e criptografia assimétrica ajuda a estabelecer confiança e distribuir chaves. Pense em um navegador negociando chaves por tls antes de enviar cookies, formulários e tokens de autenticação.",
        "Esse assunto importa porque afeta confidencialidade, integridade e identidade em canais inseguros. Quando você o entende, decisões de arquitetura deixam de parecer um conjunto de truques desconexos."
      ],
      "blocks": [
        {
          "type": "insight",
          "title": "Intuição útil",
          "body": "pensar em duas famílias complementares: criptografia simétrica protege dados em volume e criptografia assimétrica ajuda a estabelecer confiança e distribuir chaves"
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "confundir hash, cifra e assinatura como se fossem técnicas intercambiáveis"
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
        "Definição operacional: conjunto de construções com chaves que permite cifrar, autenticar e assinar dados segundo um modelo explícito de ameaça.",
        "A unidade crítica para raciocinar sobre custo e comportamento é a relação entre chave, nonce e mensagem. É nela que atrasos, contenção ou corrupção costumam aparecer primeiro.",
        "Quando você enxerga a unidade certa, fica mais fácil separar sintoma de causa. Isso evita o atalho mental de achar que confundir hash, cifra e assinatura como se fossem técnicas intercambiáveis."
      ],
      "blocks": [
        {
          "type": "definition",
          "title": "Definição",
          "body": "conjunto de construções com chaves que permite cifrar, autenticar e assinar dados segundo um modelo explícito de ameaça"
        },
        {
          "type": "example",
          "title": "Exemplo concreto",
          "body": "um navegador negociando chaves por TLS antes de enviar cookies, formulários e tokens de autenticação"
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
        "Em alto nível, o fluxo é um sistema estabelece chaves, cifra e autentica dados, verifica a origem quando necessário e renova ou revoga segredos ao longo do tempo.",
        "Em vez de decorar siglas, vale observar a ordem das decisões: estabelecimento de chaves, cifra e autenticação, verificação de origem e rotação e revogação. O desenho muda de tema para tema, mas a disciplina mental é a mesma.",
        "A pergunta importante não é apenas 'qual etapa existe?'. A pergunta melhor é 'onde a decisão errada se propaga e quanto custa corrigi-la depois?'."
      ],
      "blocks": [
        {
          "type": "example",
          "title": "Etapas para observar",
          "body": "Use a interação para percorrer a pipeline e notar onde surgem classificação, mediação, sincronização, persistência ou reaproveitamento.",
          "items": [
            "Estabelecimento de chaves",
            "Cifra e autenticação",
            "Verificação de origem",
            "Rotação e revogação"
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
        "O eixo central desta aula vai de simplicidade operacional até garantias criptográficas fortes. Quanto mais você delega segurança a protocolos maduros, mais key management e disciplina operacional precisa abraçar - mas menos improviso perigoso deixa escapar segredos ou aceitar mensagens falsas.",
        "Empurrar o desenho demais para um extremo tende a simplificar uma parte e complicar outra. O trabalho do arquiteto é tornar essa troca visível, não escondê-la atrás de defaults.",
        "Por isso, a pergunta madura não é 'qual tecnologia vence?'. É 'qual ponto do eixo faz sentido para este perfil de tráfego, risco e equipe?'."
      ],
      "blocks": [
        {
          "type": "insight",
          "title": "Projeto é posicionamento",
          "body": "O eixo 'simplicidade operacional ↔ garantias criptográficas fortes' existe porque cada ponta otimiza uma propriedade diferente do sistema."
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
        "O erro recorrente é confundir hash, cifra e assinatura como se fossem técnicas intercambiáveis. Isso costuma soar plausível porque a abstração superficial parece simples demais.",
        "Na prática, o limite aparece quando chaves ficam mal armazenadas, nonces são reutilizados ou a aplicação ignora quem realmente pode ler e verificar cada mensagem. É nesse ponto que o sistema revela o que realmente estava sendo garantido - ou apenas assumido.",
        "Tratar esses limites como detalhes raros é caro. Tratá-los como parte do desenho inicial economiza incidentes, retrabalho e debates improdutivos depois."
      ],
      "blocks": [
        {
          "type": "mistake",
          "title": "Suposição perigosa",
          "body": "confundir hash, cifra e assinatura como se fossem técnicas intercambiáveis"
        },
        {
          "type": "insight",
          "title": "Limites são parte da especificação",
          "body": "chaves ficam mal armazenadas, nonces são reutilizados ou a aplicação ignora quem realmente pode ler e verificar cada mensagem"
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
        "Uma regra prática desta aula é reuse protocolos padrão, trate chaves como ativos de primeira classe e faça autenticidade ser explícita.",
        "Repare nos cenários propostos: api pública, artefato assinado e segredo interno. O mecanismo é o mesmo, mas a decisão muda conforme estado, risco e tipo de carga.",
        "É por isso que bons times documentam intenção, observam métricas e revisam o desenho quando o contexto operacional muda."
      ],
      "blocks": [
        {
          "type": "example",
          "title": "Heurística de decisão",
          "body": "As recomendações abaixo não são receitas eternas; elas são pontos de partida guiados pelo mecanismo que a aula explicou.",
          "items": [
            "Usar protocolo padronizado como TLS para proteger o transporte e autenticar a origem do servidor.",
            "Usar assinatura digital sobre um hash do conteúdo, com gestão confiável da chave privada.",
            "Distribuir o segredo por mecanismo confiável e armazená-lo com políticas explícitas de rotação e acesso."
          ]
        },
        {
          "type": "definition",
          "title": "Regra prática",
          "body": "reuse protocolos padrão, trate chaves como ativos de primeira classe e faça autenticidade ser explícita"
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
        "APIs de modelos, browsers, agentes com ferramentas e supply chain de software dependem de TLS, assinaturas e gerenciamento correto de segredos.",
        "Em produtos modernos, a mesma lógica reaparece em APIs, jobs assíncronos, pipelines de dados, páginas web, storage, modelos e plataformas internas.",
        "Aprender este tópico dá vocabulário para discutir latência, throughput, integridade, consistência, segurança e custo com mais precisão técnica."
      ],
      "blocks": [
        {
          "type": "insight",
          "title": "Transferência de modelo mental",
          "body": "confidencialidade, integridade e identidade em canais inseguros"
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
      "body": "proteger confidencialidade e autenticidade de dados em ambientes onde não podemos confiar no canal"
    },
    {
      "title": "Modelo mental",
      "body": "pensar em duas famílias complementares: criptografia simétrica protege dados em volume e criptografia assimétrica ajuda a estabelecer confiança e distribuir chaves"
    },
    {
      "title": "Erro comum",
      "body": "confundir hash, cifra e assinatura como se fossem técnicas intercambiáveis"
    },
    {
      "title": "Onde reaparece",
      "body": "APIs de modelos, browsers, agentes com ferramentas e supply chain de software dependem de TLS, assinaturas e gerenciamento correto de segredos"
    }
  ],
  "quiz": [
    {
      "id": "q1",
      "prompt": "Qual é a função principal de Criptografia Moderna (Intuição) em um sistema?",
      "options": [
        {
          "id": "a",
          "label": "proteger confidencialidade e autenticidade de dados em ambientes onde não podemos confiar no canal"
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
      "feedback": "A ideia central da aula é proteger confidencialidade e autenticidade de dados em ambientes onde não podemos confiar no canal. O tema melhora o projeto do sistema, mas não apaga restrições físicas nem substitui todas as outras camadas."
    },
    {
      "id": "q2",
      "prompt": "Qual modelo mental ajuda mais a entender criptografia moderna (intuição)?",
      "options": [
        {
          "id": "a",
          "label": "pensar em duas famílias complementares: criptografia simétrica protege dados em volume e criptografia assimétrica ajuda a estabelecer confiança e distribuir chaves"
        },
        {
          "id": "b",
          "label": "Pensar apenas na interface visual, ignorando o mecanismo interno."
        },
        {
          "id": "c",
          "label": "Assumir que criptografia moderna (intuição) resolve sozinho qualquer gargalo restante."
        }
      ],
      "correctOptionId": "a",
      "feedback": "O melhor atalho mental aqui é: pensar em duas famílias complementares: criptografia simétrica protege dados em volume e criptografia assimétrica ajuda a estabelecer confiança e distribuir chaves. Esse modelo ajuda a prever custo, limite e comportamento operacional."
    },
    {
      "id": "q3",
      "prompt": "No fluxo estudado, qual etapa aparece cedo e condiciona decisões posteriores?",
      "options": [
        {
          "id": "a",
          "label": "Estabelecimento de chaves"
        },
        {
          "id": "b",
          "label": "Rotação e revogação"
        },
        {
          "id": "c",
          "label": "Uma etapa mágica que elimina a necessidade de observar o sistema."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Estabelecimento de chaves acontece cedo e molda o resto do caminho. Erros de classificação ou roteamento se propagam com facilidade."
    },
    {
      "id": "q4",
      "prompt": "Qual afirmação descreve melhor o trade-off central da aula?",
      "options": [
        {
          "id": "a",
          "label": "O objetivo é equilibrar simplicidade operacional e garantias criptográficas fortes, não maximizar um extremo automaticamente."
        },
        {
          "id": "b",
          "label": "Sempre vale empurrar tudo para garantias criptográficas fortes."
        },
        {
          "id": "c",
          "label": "Sempre vale empurrar tudo para simplicidade operacional."
        }
      ],
      "correctOptionId": "a",
      "feedback": "O eixo 'simplicidade operacional ↔ garantias criptográficas fortes' existe porque cada extremo resolve uma dor e cria outra. Projeto maduro explicita essa troca."
    },
    {
      "id": "q5",
      "prompt": "Qual das opções abaixo representa um erro comum discutido na aula?",
      "options": [
        {
          "id": "a",
          "label": "confundir hash, cifra e assinatura como se fossem técnicas intercambiáveis"
        },
        {
          "id": "b",
          "label": "reuse protocolos padrão, trate chaves como ativos de primeira classe e faça autenticidade ser explícita"
        },
        {
          "id": "c",
          "label": "Medir hipóteses antes de alterar um sistema que já está em produção."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Este é o atalho mental perigoso do tema: confundir hash, cifra e assinatura como se fossem técnicas intercambiáveis. A aula insiste em tornar essas suposições explícitas."
    },
    {
      "id": "q6",
      "prompt": "Pensando em cenários reais, qual decisão inicial está mais alinhada com a aula?",
      "options": [
        {
          "id": "a",
          "label": "Usar protocolo padronizado como TLS para proteger o transporte e autenticar a origem do servidor."
        },
        {
          "id": "b",
          "label": "Usar assinatura digital sobre um hash do conteúdo, com gestão confiável da chave privada."
        },
        {
          "id": "c",
          "label": "Distribuir o segredo por mecanismo confiável e armazená-lo com políticas explícitas de rotação e acesso."
        }
      ],
      "correctOptionId": "a",
      "feedback": "No primeiro cenário, a recomendação é usar protocolo padronizado como tls para proteger o transporte e autenticar a origem do servidor.. A solução depende do mecanismo certo para o caso, não de um padrão aplicado sem contexto."
    },
    {
      "id": "q7",
      "prompt": "Por que este tema também importa para sistemas de IA e produtos modernos?",
      "options": [
        {
          "id": "a",
          "label": "APIs de modelos, browsers, agentes com ferramentas e supply chain de software dependem de TLS, assinaturas e gerenciamento correto de segredos"
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
      "feedback": "A ponte da aula é direta: apis de modelos, browsers, agentes com ferramentas e supply chain de software dependem de tls, assinaturas e gerenciamento correto de segredos. Os mesmos fundamentos reaparecem em serving, dados, rede, storage e operação."
    },
    {
      "id": "q8",
      "prompt": "O que costuma quebrar ou exigir cuidado adicional neste tema?",
      "options": [
        {
          "id": "a",
          "label": "chaves ficam mal armazenadas, nonces são reutilizados ou a aplicação ignora quem realmente pode ler e verificar cada mensagem"
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
      "feedback": "O limite importante aqui é concreto: chaves ficam mal armazenadas, nonces são reutilizados ou a aplicação ignora quem realmente pode ler e verificar cada mensagem. Em sistemas reais, garantias dependem de política, falha, carga e integração entre camadas."
    }
  ],
  "glossary": [
    {
      "term": "Criptografia simétrica",
      "definition": "Família de técnicas em que a mesma chave protege e recupera os dados."
    },
    {
      "term": "Criptografia assimétrica",
      "definition": "Técnicas que usam pares de chaves públicas e privadas para troca de chaves ou assinaturas."
    },
    {
      "term": "Nonce",
      "definition": "Valor único usado para evitar reutilização perigosa em esquemas criptográficos."
    },
    {
      "term": "AEAD",
      "definition": "Modo que oferece confidencialidade e autenticação ao mesmo tempo."
    },
    {
      "term": "Assinatura digital",
      "definition": "Mecanismo que permite verificar autoria e integridade com chave pública."
    },
    {
      "term": "Certificado",
      "definition": "Documento assinado que vincula uma identidade a uma chave pública."
    },
    {
      "term": "Handshake",
      "definition": "Fase inicial em que partes negociam parâmetros e chaves de um protocolo."
    },
    {
      "term": "Revogação",
      "definition": "Processo de invalidar uma credencial ou chave antes de seu fim natural."
    },
    {
      "term": "Key management",
      "definition": "Conjunto de práticas para gerar, armazenar, distribuir, rotacionar e remover chaves."
    },
    {
      "term": "Autenticidade",
      "definition": "Garantia de que a mensagem ou artefato veio de quem afirma ter vindo."
    }
  ]
} satisfies LessonContent;
