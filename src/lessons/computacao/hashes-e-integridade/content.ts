import type { LessonContent } from "../../../types/content";

export const hashesEIntegridadeContent: LessonContent = {
  "id": "hashes-e-integridade",
  "title": "Hashes e Integridade",
  "subtitle": "Como resumir bytes em uma impressão digital útil para detectar mudanças - sem transformar hash em magia criptográfica.",
  "description": "Uma aula sobre digest, colisão, pré-imagem, checksums, SHA-256, comparação confiável e a diferença entre integridade e autenticidade.",
  "primaryCategoryId": "computacao",
  "secondaryCategoryId": "engenharia",
  "level": "Intermediário",
  "estimatedTime": "45-55 min",
  "tags": [
    "Hash",
    "Integridade",
    "SHA-256",
    "Git",
    "Checksums",
    "Supply Chain"
  ],
  "learningObjectives": [
    "Entender hash como fingerprint determinístico de bytes.",
    "Diferenciar integridade, autenticidade e sigilo.",
    "Relacionar algoritmos rápidos com usos não criptográficos e algoritmos seguros com contexto de ameaça.",
    "Ler casos como verificação de download, Git e supply chain com mais precisão."
  ],
  "prerequisites": [
    "Noção básica de bytes e arquivos.",
    "Curiosidade sobre verificação de downloads, Git ou segurança de software.",
    "Não é preciso saber criptografia formal antes."
  ],
  "references": [
    {
      "title": "Secure Hash Standard (SHS)",
      "source": "NIST FIPS 180-4",
      "url": "https://csrc.nist.gov/publications/detail/fips/180/4/final",
      "note": "Padrão oficial para SHA-1/SHA-2 e noções de uso apropriado."
    },
    {
      "title": "SHA-3 Standard",
      "source": "NIST FIPS 202",
      "url": "https://csrc.nist.gov/publications/detail/fips/202/final",
      "note": "Referência para a família SHA-3 e sua motivação criptográfica."
    },
    {
      "title": "US Secure Hash Algorithms (SHA and HMAC-SHA)",
      "source": "RFC 6234",
      "url": "https://datatracker.ietf.org/doc/html/rfc6234",
      "note": "Material normativo acessível sobre funcionamento e terminologia dos hashes."
    },
    {
      "title": "Git Internals - Git Objects",
      "source": "Pro Git",
      "url": "https://git-scm.com/book/en/v2/Git-Internals-Git-Objects",
      "note": "Exemplo real de como hashes estruturam integridade e identidade de objetos."
    },
    {
      "title": "SubtleCrypto.digest()",
      "source": "MDN Web Docs",
      "url": "https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest",
      "note": "Exemplo prático de uso de digest em plataformas modernas."
    }
  ],
  "heroVisual": "lesson-hero",
  "openingText": "Baixar um arquivo e comparar um hash parece um ritual simples. Mas a pergunta que realmente importa é: comparar com o quê, publicado por quem e usando qual algoritmo? Hashes ajudam a detectar mudança; o resto depende do modelo de ameaça e da cadeia de confiança em torno deles.",
  "quickFacts": [
    {
      "title": "Unidade crítica",
      "body": "o digest calculado a partir de uma entrada específica"
    },
    {
      "title": "Trade-off central",
      "body": "velocidade e conveniência ↔ resistência criptográfica"
    },
    {
      "title": "Regra prática",
      "body": "separe integridade de autenticidade e escolha o algoritmo pelo modelo de ameaça, não pelo costume"
    }
  ],
  "sections": [
    {
      "id": "motivacao",
      "eyebrow": "Motivação",
      "title": "Por que Hashes e Integridade aparece em sistemas sérios",
      "lead": "Gerar uma impressão digital compacta de dados para detectar alterações com rapidez muda latência, custo, previsibilidade ou segurança. Por isso, o tema aparece cedo em qualquer sistema que sai do protótipo.",
      "visual": "lesson-hero",
      "paragraphs": [
        "Hashes e Integridade existe para gerar uma impressão digital compacta de dados para detectar alterações com rapidez. Sem isso, fica difícil saber se um arquivo, artefato ou mensagem mudou no caminho ou no armazenamento.",
        "Um bom modelo intuitivo é pensar no hash como uma impressão digital dos bytes, não como cifra ou assinatura. Pense em verificar um checkpoint de modelo baixado ou identificar objetos no git sem olhar todos os bytes a cada comparação.",
        "Esse assunto importa porque afeta confiança em artefatos, reprodutibilidade de pipelines e segurança da cadeia de software. Quando você o entende, decisões de arquitetura deixam de parecer um conjunto de truques desconexos."
      ],
      "blocks": [
        {
          "type": "insight",
          "title": "Intuição útil",
          "body": "pensar no hash como uma impressão digital dos bytes, não como cifra ou assinatura"
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "tratar qualquer hash como prova de autenticidade, mesmo sem uma fonte confiável ou assinatura que proteja o valor publicado"
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
        "Definição operacional: função determinística que transforma uma entrada arbitrária em um digest de tamanho fixo.",
        "A unidade crítica para raciocinar sobre custo e comportamento é o digest calculado a partir de uma entrada específica. É nela que atrasos, contenção ou corrupção costumam aparecer primeiro.",
        "Quando você enxerga a unidade certa, fica mais fácil separar sintoma de causa. Isso evita o atalho mental de achar que tratar qualquer hash como prova de autenticidade, mesmo sem uma fonte confiável ou assinatura que proteja o valor publicado."
      ],
      "blocks": [
        {
          "type": "definition",
          "title": "Definição",
          "body": "função determinística que transforma uma entrada arbitrária em um digest de tamanho fixo"
        },
        {
          "type": "example",
          "title": "Exemplo concreto",
          "body": "verificar um checkpoint de modelo baixado ou identificar objetos no Git sem olhar todos os bytes a cada comparação"
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
        "Em alto nível, o fluxo é os bytes entram, o algoritmo mistura estados internos, produz um digest e esse valor só tem sentido quando comparado com uma referência confiável.",
        "Em vez de decorar siglas, vale observar a ordem das decisões: entrada de bytes, mistura interna, digest final e comparação confiável. O desenho muda de tema para tema, mas a disciplina mental é a mesma.",
        "A pergunta importante não é apenas 'qual etapa existe?'. A pergunta melhor é 'onde a decisão errada se propaga e quanto custa corrigi-la depois?'."
      ],
      "blocks": [
        {
          "type": "example",
          "title": "Etapas para observar",
          "body": "Use a interação para percorrer a pipeline e notar onde surgem classificação, mediação, sincronização, persistência ou reaproveitamento.",
          "items": [
            "Entrada de bytes",
            "Mistura interna",
            "Digest final",
            "Comparação confiável"
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
        "O eixo central desta aula vai de velocidade e conveniência até resistência criptográfica. Algoritmos muito rápidos e simples ajudam em checksum e deduplicação, mas cenários adversariais pedem funções desenhadas para resistir a colisões e ataques de pré-imagem.",
        "Empurrar o desenho demais para um extremo tende a simplificar uma parte e complicar outra. O trabalho do arquiteto é tornar essa troca visível, não escondê-la atrás de defaults.",
        "Por isso, a pergunta madura não é 'qual tecnologia vence?'. É 'qual ponto do eixo faz sentido para este perfil de tráfego, risco e equipe?'."
      ],
      "blocks": [
        {
          "type": "insight",
          "title": "Projeto é posicionamento",
          "body": "O eixo 'velocidade e conveniência ↔ resistência criptográfica' existe porque cada ponta otimiza uma propriedade diferente do sistema."
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
        "O erro recorrente é tratar qualquer hash como prova de autenticidade, mesmo sem uma fonte confiável ou assinatura que proteja o valor publicado. Isso costuma soar plausível porque a abstração superficial parece simples demais.",
        "Na prática, o limite aparece quando o atacante consegue alterar tanto o conteúdo quanto o hash divulgado, ou o algoritmo escolhido já não oferece resistência suficiente. É nesse ponto que o sistema revela o que realmente estava sendo garantido - ou apenas assumido.",
        "Tratar esses limites como detalhes raros é caro. Tratá-los como parte do desenho inicial economiza incidentes, retrabalho e debates improdutivos depois."
      ],
      "blocks": [
        {
          "type": "mistake",
          "title": "Suposição perigosa",
          "body": "tratar qualquer hash como prova de autenticidade, mesmo sem uma fonte confiável ou assinatura que proteja o valor publicado"
        },
        {
          "type": "insight",
          "title": "Limites são parte da especificação",
          "body": "o atacante consegue alterar tanto o conteúdo quanto o hash divulgado, ou o algoritmo escolhido já não oferece resistência suficiente"
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
        "Uma regra prática desta aula é separe integridade de autenticidade e escolha o algoritmo pelo modelo de ameaça, não pelo costume.",
        "Repare nos cenários propostos: download de artefato, deduplicação interna e supply chain. O mecanismo é o mesmo, mas a decisão muda conforme estado, risco e tipo de carga.",
        "É por isso que bons times documentam intenção, observam métricas e revisam o desenho quando o contexto operacional muda."
      ],
      "blocks": [
        {
          "type": "example",
          "title": "Heurística de decisão",
          "body": "As recomendações abaixo não são receitas eternas; elas são pontos de partida guiados pelo mecanismo que a aula explicou.",
          "items": [
            "Comparar o digest com uma referência publicada por um canal confiável e, idealmente, assinada.",
            "Usar hash como índice eficiente, entendendo o risco de colisão e a necessidade de confirmação quando o caso exigir.",
            "Combinar hashes com assinaturas, versionamento e origem verificável."
          ]
        },
        {
          "type": "definition",
          "title": "Regra prática",
          "body": "separe integridade de autenticidade e escolha o algoritmo pelo modelo de ameaça, não pelo costume"
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
        "Modelos, datasets, containers e caches de artefatos usam hashes o tempo todo para deduplicação, reprodutibilidade e verificação de supply chain.",
        "Em produtos modernos, a mesma lógica reaparece em APIs, jobs assíncronos, pipelines de dados, páginas web, storage, modelos e plataformas internas.",
        "Aprender este tópico dá vocabulário para discutir latência, throughput, integridade, consistência, segurança e custo com mais precisão técnica."
      ],
      "blocks": [
        {
          "type": "insight",
          "title": "Transferência de modelo mental",
          "body": "confiança em artefatos, reprodutibilidade de pipelines e segurança da cadeia de software"
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
      "body": "gerar uma impressão digital compacta de dados para detectar alterações com rapidez"
    },
    {
      "title": "Modelo mental",
      "body": "pensar no hash como uma impressão digital dos bytes, não como cifra ou assinatura"
    },
    {
      "title": "Erro comum",
      "body": "tratar qualquer hash como prova de autenticidade, mesmo sem uma fonte confiável ou assinatura que proteja o valor publicado"
    },
    {
      "title": "Onde reaparece",
      "body": "Modelos, datasets, containers e caches de artefatos usam hashes o tempo todo para deduplicação, reprodutibilidade e verificação de supply chain"
    }
  ],
  "quiz": [
    {
      "id": "q1",
      "prompt": "Qual é a função principal de Hashes e Integridade em um sistema?",
      "options": [
        {
          "id": "a",
          "label": "gerar uma impressão digital compacta de dados para detectar alterações com rapidez"
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
      "feedback": "A ideia central da aula é gerar uma impressão digital compacta de dados para detectar alterações com rapidez. O tema melhora o projeto do sistema, mas não apaga restrições físicas nem substitui todas as outras camadas."
    },
    {
      "id": "q2",
      "prompt": "Qual modelo mental ajuda mais a entender hashes e integridade?",
      "options": [
        {
          "id": "a",
          "label": "pensar no hash como uma impressão digital dos bytes, não como cifra ou assinatura"
        },
        {
          "id": "b",
          "label": "Pensar apenas na interface visual, ignorando o mecanismo interno."
        },
        {
          "id": "c",
          "label": "Assumir que hashes e integridade resolve sozinho qualquer gargalo restante."
        }
      ],
      "correctOptionId": "a",
      "feedback": "O melhor atalho mental aqui é: pensar no hash como uma impressão digital dos bytes, não como cifra ou assinatura. Esse modelo ajuda a prever custo, limite e comportamento operacional."
    },
    {
      "id": "q3",
      "prompt": "No fluxo estudado, qual etapa aparece cedo e condiciona decisões posteriores?",
      "options": [
        {
          "id": "a",
          "label": "Entrada de bytes"
        },
        {
          "id": "b",
          "label": "Comparação confiável"
        },
        {
          "id": "c",
          "label": "Uma etapa mágica que elimina a necessidade de observar o sistema."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Entrada de bytes acontece cedo e molda o resto do caminho. Erros de classificação ou roteamento se propagam com facilidade."
    },
    {
      "id": "q4",
      "prompt": "Qual afirmação descreve melhor o trade-off central da aula?",
      "options": [
        {
          "id": "a",
          "label": "O objetivo é equilibrar velocidade e conveniência e resistência criptográfica, não maximizar um extremo automaticamente."
        },
        {
          "id": "b",
          "label": "Sempre vale empurrar tudo para resistência criptográfica."
        },
        {
          "id": "c",
          "label": "Sempre vale empurrar tudo para velocidade e conveniência."
        }
      ],
      "correctOptionId": "a",
      "feedback": "O eixo 'velocidade e conveniência ↔ resistência criptográfica' existe porque cada extremo resolve uma dor e cria outra. Projeto maduro explicita essa troca."
    },
    {
      "id": "q5",
      "prompt": "Qual das opções abaixo representa um erro comum discutido na aula?",
      "options": [
        {
          "id": "a",
          "label": "tratar qualquer hash como prova de autenticidade, mesmo sem uma fonte confiável ou assinatura que proteja o valor publicado"
        },
        {
          "id": "b",
          "label": "separe integridade de autenticidade e escolha o algoritmo pelo modelo de ameaça, não pelo costume"
        },
        {
          "id": "c",
          "label": "Medir hipóteses antes de alterar um sistema que já está em produção."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Este é o atalho mental perigoso do tema: tratar qualquer hash como prova de autenticidade, mesmo sem uma fonte confiável ou assinatura que proteja o valor publicado. A aula insiste em tornar essas suposições explícitas."
    },
    {
      "id": "q6",
      "prompt": "Pensando em cenários reais, qual decisão inicial está mais alinhada com a aula?",
      "options": [
        {
          "id": "a",
          "label": "Comparar o digest com uma referência publicada por um canal confiável e, idealmente, assinada."
        },
        {
          "id": "b",
          "label": "Usar hash como índice eficiente, entendendo o risco de colisão e a necessidade de confirmação quando o caso exigir."
        },
        {
          "id": "c",
          "label": "Combinar hashes com assinaturas, versionamento e origem verificável."
        }
      ],
      "correctOptionId": "a",
      "feedback": "No primeiro cenário, a recomendação é comparar o digest com uma referência publicada por um canal confiável e, idealmente, assinada.. A solução depende do mecanismo certo para o caso, não de um padrão aplicado sem contexto."
    },
    {
      "id": "q7",
      "prompt": "Por que este tema também importa para sistemas de IA e produtos modernos?",
      "options": [
        {
          "id": "a",
          "label": "Modelos, datasets, containers e caches de artefatos usam hashes o tempo todo para deduplicação, reprodutibilidade e verificação de supply chain"
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
      "feedback": "A ponte da aula é direta: modelos, datasets, containers e caches de artefatos usam hashes o tempo todo para deduplicação, reprodutibilidade e verificação de supply chain. Os mesmos fundamentos reaparecem em serving, dados, rede, storage e operação."
    },
    {
      "id": "q8",
      "prompt": "O que costuma quebrar ou exigir cuidado adicional neste tema?",
      "options": [
        {
          "id": "a",
          "label": "o atacante consegue alterar tanto o conteúdo quanto o hash divulgado, ou o algoritmo escolhido já não oferece resistência suficiente"
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
      "feedback": "O limite importante aqui é concreto: o atacante consegue alterar tanto o conteúdo quanto o hash divulgado, ou o algoritmo escolhido já não oferece resistência suficiente. Em sistemas reais, garantias dependem de política, falha, carga e integração entre camadas."
    }
  ],
  "glossary": [
    {
      "term": "Digest",
      "definition": "Saída de tamanho fixo produzida por uma função hash."
    },
    {
      "term": "Colisão",
      "definition": "Situação em que duas entradas diferentes geram o mesmo digest."
    },
    {
      "term": "Pré-imagem",
      "definition": "Problema de recuperar uma entrada plausível a partir de um digest dado."
    },
    {
      "term": "Checksum",
      "definition": "Resumo voltado a detecção de erro acidental, sem necessariamente resistir a adversários."
    },
    {
      "term": "SHA-256",
      "definition": "Função hash da família SHA-2 amplamente usada para integridade."
    },
    {
      "term": "SHA-3",
      "definition": "Família de hashes padronizada pelo NIST com construção diferente da SHA-2."
    },
    {
      "term": "Integridade",
      "definition": "Propriedade de detectar se o conteúdo mudou de forma não pretendida."
    },
    {
      "term": "Autenticidade",
      "definition": "Propriedade de saber que algo veio de quem dizia ter vindo."
    },
    {
      "term": "Merkle tree",
      "definition": "Estrutura que combina hashes em árvore para verificar conjuntos grandes de dados."
    },
    {
      "term": "Hashing criptográfico",
      "definition": "Uso de funções projetadas para resistir a colisões e outros ataques relevantes."
    }
  ]
} satisfies LessonContent;
