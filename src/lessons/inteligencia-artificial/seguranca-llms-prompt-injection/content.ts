import type { LessonContent } from "../../../types/content";

export const segurancaLlmsPromptInjectionContent: LessonContent = {
  "id": "seguranca-llms-prompt-injection",
  "title": "Segurança de LLMs: Prompt Injection e Defesa",
  "subtitle": "Quando dados e instruções compartilham o mesmo canal de linguagem, o sistema precisa aprender a desconfiar do contexto errado.",
  "description": "Uma aula intermediária e defensiva sobre prompt injection em LLMs, incluindo ataques diretos e indiretos, fronteiras de confiança, riscos em RAG e ferramentas, mitigação em camadas, least privilege e estratégias de contenção inspiradas em OWASP e Microsoft.",
  "primaryCategoryId": "inteligencia-artificial",
  "secondaryCategoryId": "computacao",
  "level": "Intermediário",
  "estimatedTime": "40-55 min",
  "tags": [
    "Segurança",
    "LLM",
    "Prompt Injection",
    "OWASP",
    "RAG",
    "Least Privilege"
  ],
  "learningObjectives": [
    "Entender por que LLMs são vulneráveis quando dados e instruções chegam no mesmo formato textual.",
    "Diferenciar prompt injection direta e indireta sem entrar em orientação ofensiva detalhada.",
    "Relacionar risco de prompt injection a RAG, ferramentas, memória e automações agentic.",
    "Aplicar princípios de least privilege, isolamento e human-in-the-loop.",
    "Avaliar mitigação em camadas em vez de buscar uma defesa única perfeita.",
    "Ler o problema como engenharia de fronteiras de confiança, e não como bug superficial de prompt."
  ],
  "prerequisites": [
    "Noção de funcionamento básico de LLMs e system/user prompts.",
    "Familiaridade conceitual com RAG ou ferramentas acopladas a modelos ajuda, mas não é obrigatória.",
    "Entender princípios gerais de segurança como privilégio mínimo é útil."
  ],
  "references": [
    {
      "title": "Prompt Injection",
      "source": "OWASP Foundation",
      "url": "https://owasp.org/www-community/attacks/PromptInjection",
      "note": "Introdução geral da OWASP ao problema."
    },
    {
      "title": "LLM01: Prompt Injection",
      "source": "OWASP Gen AI Security Project",
      "url": "https://genai.owasp.org/llmrisk2023-24/llm01-24-prompt-injection/",
      "note": "Referência específica do risco LLM01."
    },
    {
      "title": "OWASP Top 10 for LLM Applications 2025",
      "source": "OWASP",
      "url": "https://owasp.org/www-project-top-10-for-large-language-model-applications/assets/PDF/OWASP-Top-10-for-LLMs-v2025.pdf",
      "note": "Documento de referência com taxonomia atualizada de riscos."
    },
    {
      "title": "Not what you've signed up for: Compromising Real-World LLM-Integrated Applications with Indirect Prompt Injection",
      "source": "Greshake et al., arXiv",
      "url": "https://arxiv.org/abs/2302.12173",
      "note": "Paper central sobre prompt injection indireta em aplicações integradas."
    },
    {
      "title": "Defending Against Indirect Prompt Injection Attacks With Spotlighting",
      "source": "Microsoft Research",
      "url": "https://www.microsoft.com/en-us/research/publication/defending-against-indirect-prompt-injection-attacks-with-spotlighting/",
      "note": "Referência importante sobre defesa por sinalização de proveniência."
    },
    {
      "title": "How Microsoft defends against indirect prompt injection attacks",
      "source": "Microsoft MSRC",
      "url": "https://www.microsoft.com/en-us/msrc/blog/2025/07/how-microsoft-defends-against-indirect-prompt-injection-attacks",
      "note": "Visão prática de defesa em camadas com Prompt Shields e monitoramento."
    }
  ],
  "heroVisual": "hero",
  "openingText": "Prompt injection parece estranha à primeira vista porque não se comporta como SQL injection ou XSS. O problema é mais fundamental: para o LLM, instruções legítimas e dados não confiáveis podem chegar na mesma substância, texto natural. Quando o sistema concatena tudo e pede ao modelo para decidir o que seguir, a fronteira de confiança fica borrada. Em aplicações com RAG, ferramentas e automações, esse borrão deixa de ser curiosidade de prompt e vira risco operacional sério. Defender um sistema desses exige arquitetura, não só frases mais duras no prompt.",
  "quickFacts": [
    {
      "title": "Não é só jailbreak de chat",
      "body": "Em aplicações integradas, o perigo cresce quando conteúdo externo influencia ferramentas ou dados sensíveis."
    },
    {
      "title": "Prompt injection indireta é traiçoeira",
      "body": "O ataque pode vir escondido em documentos, páginas, e-mails ou outras fontes lidas pelo sistema."
    },
    {
      "title": "Defesa única não basta",
      "body": "Classificadores, isolamento, least privilege e revisão humana se complementam."
    }
  ],
  "sections": [
    {
      "id": "por-que-acontece",
      "eyebrow": "Fundamento",
      "title": "O LLM não recebe instruções e dados em compartimentos naturais",
      "lead": "Quando tudo chega como texto, o sistema precisa criar a fronteira de confiança que o modelo não tem sozinho.",
      "paragraphs": [
        "Em muitas aplicações, system prompt, mensagem do usuário, conteúdo recuperado, trechos de documentos e resultados de ferramentas são concatenados antes da inferência. Para o modelo, tudo isso pode parecer apenas contexto textual a ser interpretado.",
        "Essa fusão cria a vulnerabilidade central: o LLM pode tratar conteúdo não confiável como instrução relevante, especialmente quando o desenho da aplicação lhe dá autonomia para agir sobre o mundo externo.",
        "O problema, portanto, é menos 'um prompt ruim' e mais 'um sistema que não separou bem o que pode mandar e o que só pode informar'."
      ],
      "visual": "hero",
      "blocks": [
        {
          "type": "definition",
          "title": "Fronteira de confiança",
          "body": "Separação explícita entre o que pode orientar o sistema e o que deve ser tratado como dado não confiável."
        },
        {
          "type": "insight",
          "title": "Texto é canal compartilhado",
          "body": "Em LLMs, dados e comandos podem parecer semanticamente parecidos demais se a aplicação não os diferenciar."
        }
      ]
    },
    {
      "id": "direta-vs-indireta",
      "eyebrow": "Taxonomia",
      "title": "Ataques diretos e indiretos mudam a forma de defesa",
      "lead": "O ponto decisivo é de onde vem o conteúdo e quanto poder ele ganha ao entrar no contexto.",
      "paragraphs": [
        "Prompt injection direta ocorre quando alguém tenta explicitamente manipular o contexto enviado ao modelo. Já a indireta aparece quando conteúdo externo — como páginas, arquivos ou mensagens — traz instruções escondidas que o sistema decide ingerir.",
        "A forma indireta é especialmente relevante em RAG e agentes. O usuário pode nem perceber que a fonte consultada carregava orientação maliciosa para o modelo.",
        "Do ponto de vista defensivo, a pergunta certa deixa de ser 'quem digitou isso?' e passa a ser 'por que este conteúdo recebeu autoridade suficiente para influenciar ações?'."
      ],
      "visual": "concept",
      "blocks": [
        {
          "type": "definition",
          "title": "Prompt injection indireta",
          "body": "Instrução maliciosa embutida em conteúdo externo processado pelo sistema."
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Pensar que basta filtrar prompts do usuário e ignorar documentos, páginas e outras fontes recuperadas."
        }
      ]
    },
    {
      "id": "rag-tools-memoria",
      "eyebrow": "Superfície",
      "title": "RAG, ferramentas e memória ampliam a superfície de ataque",
      "lead": "Quanto mais o sistema faz, mais importante fica limitar o que ele pode fazer errado.",
      "paragraphs": [
        "Um chatbot só textual já pode vazar comportamento indevido. Mas um agente com busca, e-mail, CRM, banco de dados, escrita em arquivos ou ferramentas administrativas tem caminho para transformar contexto malicioso em ação operacional.",
        "Mesmo sem ação destrutiva, há riscos de exfiltração, instruções desviadas, summaries manipuladas e falsas prioridades em fluxos automatizados.",
        "Por isso o poder operacional do sistema precisa ser desenhado assumindo que algum contexto eventualmente será enganoso."
      ],
      "visual": "comparison",
      "blocks": [
        {
          "type": "insight",
          "title": "Blast radius cresce com privilégio",
          "body": "Quanto mais ferramentas e dados sensíveis disponíveis, maior o impacto potencial de um desvio de contexto."
        },
        {
          "type": "example",
          "title": "Leitura madura",
          "body": "Uma aplicação que só responde texto tem risco diferente de outra que também lê documentos privados e aciona APIs."
        }
      ]
    },
    {
      "id": "fronteiras-de-confianca",
      "eyebrow": "Análise",
      "title": "Modelar confiança é mais importante do que escrever um prompt heróico",
      "lead": "A arquitetura deve indicar o que é dado externo, o que é comando interno e o que pede revisão humana.",
      "paragraphs": [
        "Uma forma produtiva de pensar o problema é mapear fontes de contexto por nível de confiança. Conteúdo recuperado da web, e-mails, anexos e input do usuário não devem receber a mesma autoridade do sistema de políticas internas da aplicação.",
        "Esse mapeamento orienta filtros, delimitação, marcação de proveniência e principalmente limites de ferramenta. Mesmo que um trecho externo tente manipular o modelo, ele não deveria conseguir escalar facilmente para ação sensível.",
        "A decisão mais importante, portanto, ocorre antes do prompt final: no desenho dos contratos entre componentes."
      ],
      "visual": "pipeline",
      "interactive": "trust-boundary-lab",
      "blocks": [
        {
          "type": "definition",
          "title": "Modelagem de ameaça",
          "body": "Processo de identificar ativos, entradas, agentes de risco e impactos possíveis em uma aplicação de LLM."
        },
        {
          "type": "example",
          "title": "Pergunta útil",
          "body": "Se esse documento externo for hostil, o que exatamente ele pode influenciar ou acionar no sistema?"
        }
      ]
    },
    {
      "id": "defesa-em-camadas",
      "eyebrow": "Defesa",
      "title": "Não existe correção única; existe contenção em profundidade",
      "lead": "Filtrar, isolar, limitar e observar são estratégias complementares.",
      "paragraphs": [
        "Camadas úteis incluem classificação de entrada, delimitação forte entre dados e instruções, técnicas como spotlighting para conteúdo externo, filtros de saída, uso de allowlists de ferramenta e checkpoints humanos para ações sensíveis.",
        "Também importa desenhar prompts e orquestração para deixar explícito ao modelo que certos trechos são dados não confiáveis. Isso não elimina o risco, mas reduz confusão semântica.",
        "A maturidade da defesa aparece quando cada camada assume que a outra pode falhar e ainda assim tenta reduzir o dano."
      ],
      "visual": "tradeoff",
      "interactive": "defense-depth-lab",
      "blocks": [
        {
          "type": "insight",
          "title": "Defesa em profundidade",
          "body": "Se uma camada deixa passar algo, outra ainda pode diminuir o impacto ou bloquear a ação."
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Acreditar que um único classificador ou um único prompt resolve todo o problema por conta própria."
        }
      ]
    },
    {
      "id": "least-privilege",
      "eyebrow": "Princípio",
      "title": "Privilégio mínimo é a forma mais confiável de reduzir dano",
      "lead": "O sistema deve poder fazer pouco por padrão e ganhar poderes adicionais só quando estritamente necessário.",
      "paragraphs": [
        "Mesmo com filtros e prompts bons, algum conteúdo malicioso pode atravessar. Se as ferramentas disponíveis forem altamente privilegiadas, a consequência de um erro semântico cresce demais.",
        "Separar ferramentas por escopo, exigir confirmação para ações irreversíveis, usar tokens de curta duração e evitar acesso amplo a dados desnecessários reduz o impacto de falhas inevitáveis.",
        "Esse raciocínio é clássico em segurança e continua válido para LLMs: não confie em contenção puramente textual quando o problema já chegou ao nível de ação."
      ],
      "visual": "checklist",
      "blocks": [
        {
          "type": "definition",
          "title": "Least privilege",
          "body": "Conceder apenas as permissões mínimas necessárias para cada função do sistema."
        },
        {
          "type": "example",
          "title": "Aplicação prática",
          "body": "Ferramentas de leitura e de escrita podem ter fluxos, aprovações e identidades separados."
        }
      ]
    },
    {
      "id": "observabilidade-e-incidente",
      "eyebrow": "Operação",
      "title": "Ataques sutis exigem trilha operacional boa",
      "lead": "Sem observabilidade, o time só percebe a manipulação quando o dano já apareceu no produto ou no downstream.",
      "paragraphs": [
        "Logs estruturados, rastreamento de uso de ferramentas, captura de trechos recuperados, métricas de bloqueio e revisão amostral de casos suspeitos ajudam a perceber padrões incomuns antes de virarem incidente grande.",
        "Também importa registrar decisões automatizadas: qual documento influenciou a resposta, qual ferramenta foi chamada, quais limites foram acionados e que sinais de risco apareceram.",
        "Segurança de LLM não termina no design do prompt. Ela continua na capacidade de investigar, aprender e atualizar defesas continuamente."
      ],
      "visual": "checklist",
      "blocks": [
        {
          "type": "insight",
          "title": "Segurança precisa de memória",
          "body": "Sem trilha de execução, o time não consegue explicar nem corrigir ataques de contexto complexos."
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Desligar rastreamento por conforto operacional e perder justamente a evidência necessária para melhorar o sistema."
        }
      ]
    },
    {
      "id": "cenarios",
      "eyebrow": "Decisão",
      "title": "Cada arquitetura expõe um perfil diferente de risco",
      "lead": "Sistemas puramente conversacionais, RAG com leitura e agentes com ferramentas não devem receber a mesma política de defesa.",
      "paragraphs": [
        "Um assistente que só responde texto pode priorizar filtros e revisão amostral. Um sistema com RAG precisa tratar proveniência e confiança do conteúdo recuperado como primeira classe. Um agente que chama ferramentas exige política de privilégio e aprovação muito mais rigorosa.",
        "O valor da análise está em mapear o risco real do seu desenho, em vez de importar controles indiscriminadamente.",
        "Segurança madura escolhe profundidade de defesa compatível com o poder do sistema."
      ],
      "visual": "tradeoff",
      "interactive": "attack-surface-scenarios",
      "blocks": [
        {
          "type": "example",
          "title": "Pergunta-chave",
          "body": "Se o conteúdo recuperado tentar desviar a tarefa, qual seria o pior efeito possível neste produto específico?"
        },
        {
          "type": "definition",
          "title": "Blast radius",
          "body": "Amplitude potencial do dano caso um desvio de contexto consiga influenciar o sistema."
        }
      ]
    },
    {
      "id": "quiz-revisao",
      "eyebrow": "Revisão",
      "title": "Quiz de revisão",
      "lead": "Use as perguntas para testar se fronteira de confiança, privilégio mínimo e defesa em camadas ficaram conectados.",
      "paragraphs": [
        "A meta não é decorar nomes de ataques, mas entender como desenhar sistemas de LLM menos ingênuos diante de contexto não confiável."
      ],
      "interactive": "quiz"
    },
    {
      "id": "glossario",
      "eyebrow": "Glossário",
      "title": "Glossário essencial",
      "lead": "Feche a aula consolidando o vocabulário central de segurança defensiva para LLMs.",
      "paragraphs": [
        "Esses termos ajudam a ler OWASP, documentação de vendors e discussões de arquitetura segura."
      ],
      "interactive": "glossary"
    }
  ],
  "summaryCards": [
    {
      "title": "O problema é de fronteira de confiança",
      "body": "O modelo não entende naturalmente quais trechos são dados e quais são comandos legítimos."
    },
    {
      "title": "Ferramentas ampliam impacto",
      "body": "Quanto mais poder o sistema tem, maior o dano potencial de contexto malicioso."
    },
    {
      "title": "Mitigação é em camadas",
      "body": "Delimitar, filtrar, reduzir privilégio e exigir aprovação humana são partes do mesmo desenho."
    },
    {
      "title": "Segurança pede observabilidade",
      "body": "Sem logs, amostras e alertas, ataques sutis passam despercebidos."
    }
  ],
  "quiz": [
    {
      "id": "q1",
      "prompt": "Qual é a intuição central do prompt injection em LLMs?",
      "options": [
        {
          "id": "a",
          "label": "O modelo pode confundir dados externos com instruções legítimas."
        },
        {
          "id": "b",
          "label": "O modelo para de usar atenção."
        },
        {
          "id": "c",
          "label": "O tokenizer perde contexto automaticamente."
        }
      ],
      "correctOptionId": "a",
      "feedback": "A vulnerabilidade nasce da mistura entre comando e dados em um mesmo canal de linguagem."
    },
    {
      "id": "q2",
      "prompt": "O que distingue a prompt injection indireta?",
      "options": [
        {
          "id": "a",
          "label": "A entrada maliciosa chega embutida em conteúdo externo que o sistema decide ler."
        },
        {
          "id": "b",
          "label": "Ela só funciona em prompts de administrador."
        },
        {
          "id": "c",
          "label": "Ela depende de SQL."
        }
      ],
      "correctOptionId": "a",
      "feedback": "O problema se agrava quando o sistema consome documentos, páginas ou mensagens de fontes não confiáveis."
    },
    {
      "id": "q3",
      "prompt": "Por que tool calling aumenta o risco?",
      "options": [
        {
          "id": "a",
          "label": "Porque o modelo passa a ter caminhos para agir sobre sistemas externos."
        },
        {
          "id": "b",
          "label": "Porque sempre reduz latência."
        },
        {
          "id": "c",
          "label": "Porque impede observabilidade."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Mais capacidade de ação amplia o blast radius de contexto malicioso."
    },
    {
      "id": "q4",
      "prompt": "Qual princípio defensivo é especialmente importante?",
      "options": [
        {
          "id": "a",
          "label": "Privilégio mínimo para ferramentas e dados acessíveis."
        },
        {
          "id": "b",
          "label": "Dar ao modelo acesso irrestrito e confiar no system prompt."
        },
        {
          "id": "c",
          "label": "Remover logs do sistema."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Mesmo se o contexto for envenenado, o alcance do dano deve permanecer limitado."
    },
    {
      "id": "q5",
      "prompt": "Por que uma defesa única costuma falhar?",
      "options": [
        {
          "id": "a",
          "label": "Porque o problema aparece em múltiplas camadas: entrada, recuperação, ferramenta, saída e operação."
        },
        {
          "id": "b",
          "label": "Porque classificadores são inúteis por definição."
        },
        {
          "id": "c",
          "label": "Porque RAG nunca é seguro."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Prompt injection é um risco sistêmico; mitigação também precisa ser sistêmica."
    },
    {
      "id": "q6",
      "prompt": "Qual é o papel do human-in-the-loop?",
      "options": [
        {
          "id": "a",
          "label": "Servir de barreira adicional antes de ações sensíveis ou irreversíveis."
        },
        {
          "id": "b",
          "label": "Substituir toda a automação do sistema."
        },
        {
          "id": "c",
          "label": "Eliminar a necessidade de logs."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Revisão humana é útil sobretudo quando a ação tem alto impacto ou custo de erro elevado."
    },
    {
      "id": "q7",
      "prompt": "O que spotlighting tenta fazer?",
      "options": [
        {
          "id": "a",
          "label": "Tornar mais explícita a proveniência do conteúdo externo para o modelo."
        },
        {
          "id": "b",
          "label": "Acelerar o softmax do decoder."
        },
        {
          "id": "c",
          "label": "Aumentar a VRAM disponível."
        }
      ],
      "correctOptionId": "a",
      "feedback": "A técnica ajuda o modelo a distinguir melhor dados não confiáveis de comandos."
    },
    {
      "id": "q8",
      "prompt": "Qual visão é mais madura sobre segurança de LLMs?",
      "options": [
        {
          "id": "a",
          "label": "Segurança é só escrever um prompt mais duro."
        },
        {
          "id": "b",
          "label": "Segurança depende de arquitetura, limites de privilégio, filtros e observabilidade."
        },
        {
          "id": "c",
          "label": "Se o modelo é grande o bastante, ele resolve sozinho."
        }
      ],
      "correctOptionId": "b",
      "feedback": "O problema é sistêmico e exige defesa em profundidade."
    }
  ],
  "glossary": [
    {
      "term": "Prompt injection",
      "definition": "Manipulação de entradas para alterar o comportamento do LLM de forma não desejada."
    },
    {
      "term": "Prompt injection indireta",
      "definition": "Ataque em que instruções maliciosas ficam embutidas em conteúdo externo ingerido pelo sistema."
    },
    {
      "term": "Fronteira de confiança",
      "definition": "Separação entre entradas confiáveis e não confiáveis dentro do desenho da aplicação."
    },
    {
      "term": "Least privilege",
      "definition": "Princípio de conceder apenas o mínimo poder necessário a um componente ou ferramenta."
    },
    {
      "term": "RAG",
      "definition": "Retrieval-augmented generation: uso de conteúdo recuperado para enriquecer o contexto da resposta."
    },
    {
      "term": "Tool calling",
      "definition": "Capacidade do sistema de acionar funções, APIs ou ferramentas externas a partir da saída do modelo."
    },
    {
      "term": "Spotlighting",
      "definition": "Técnica de sinalizar proveniência de dados externos para reduzir a chance de o modelo tratá-los como instrução."
    },
    {
      "term": "Human-in-the-loop",
      "definition": "Ponto de aprovação ou revisão humana antes de ações sensíveis."
    },
    {
      "term": "Output filtering",
      "definition": "Camada que inspeciona saídas para bloquear ou redirecionar comportamentos perigosos."
    },
    {
      "term": "Blast radius",
      "definition": "Amplitude potencial do dano quando um componente comprometido possui muito alcance ou privilégio."
    }
  ]
};
