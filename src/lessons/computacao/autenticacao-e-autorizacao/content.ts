import type { LessonContent } from "../../../types/content";

export const autenticacaoEAutorizacaoContent: LessonContent = {
  "id": "autenticacao-e-autorizacao",
  "title": "Autenticação e Autorização",
  "subtitle": "Identidade não é permissão: primeiro você prova quem é, depois o sistema decide o que você pode fazer.",
  "description": "Uma aula visual sobre AuthN vs AuthZ, sessões, tokens, API keys, políticas de acesso, least privilege e erros comuns em sistemas web e APIs.",
  "primaryCategoryId": "computacao",
  "secondaryCategoryId": "engenharia",
  "level": "Intermediário",
  "estimatedTime": "45-60 min",
  "tags": [
    "AuthN",
    "AuthZ",
    "Sessão",
    "JWT",
    "OAuth",
    "OWASP",
    "Segurança"
  ],
  "learningObjectives": [
    "Distinguir autenticação de autorização com precisão operacional.",
    "Comparar sessões, tokens de acesso e API keys em termos de uso e risco.",
    "Entender por que políticas de acesso devem ser verificadas no recurso certo e no momento certo.",
    "Relacionar least privilege, deny by default e contexto a decisões de autorização.",
    "Reconhecer falhas comuns como confiar apenas no front-end ou misturar identidade com permissão.",
    "Aplicar o modelo a APIs, painéis administrativos e aplicativos com agentes e ferramentas."
  ],
  "prerequisites": [
    "Noção básica de HTTP e APIs.",
    "Familiaridade com login e perfis de usuário ajuda.",
    "Interesse por segurança aplicada ao desenho de sistemas."
  ],
  "references": [
    {
      "title": "Authentication Cheat Sheet",
      "source": "OWASP Cheat Sheet Series",
      "url": "https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet",
      "note": "Guia oficial de boas práticas para autenticação."
    },
    {
      "title": "Authorization Cheat Sheet",
      "source": "OWASP Cheat Sheet Series",
      "url": "https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html",
      "note": "Guia oficial sobre políticas e verificações de autorização."
    },
    {
      "title": "Session Management Cheat Sheet",
      "source": "OWASP Cheat Sheet Series",
      "url": "https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html",
      "note": "Boas práticas para sessões e estado autenticado."
    },
    {
      "title": "Digital Identity Guidelines",
      "source": "NIST",
      "url": "https://pages.nist.gov/800-63-3/",
      "note": "Referência pública sobre identidade digital e níveis de garantia."
    },
    {
      "title": "OAuth 2.0",
      "source": "RFC Editor",
      "url": "https://www.rfc-editor.org/rfc/rfc6749",
      "note": "Especificação clássica de autorização delegada."
    }
  ],
  "heroVisual": "auth-hero",
  "openingText": "Muitos sistemas quebram a segurança não por falta de criptografia sofisticada, mas por uma confusão conceitual básica: saber quem é alguém não responde automaticamente o que essa pessoa pode fazer. Autenticação responde à identidade; autorização responde ao acesso. Entre essas duas perguntas vivem sessões, tokens, políticas, escopo, contexto e o princípio de menor privilégio. Quando o sistema mistura tudo, o resultado costuma ser uma API fácil de usar no começo e perigosa de operar depois.",
  "quickFacts": [
    {
      "title": "AuthN ≠ AuthZ",
      "body": "Identidade confirmada não implica permissão ilimitada."
    },
    {
      "title": "Sessão e token são veículos",
      "body": "Eles transportam contexto autenticado; não substituem política de acesso."
    },
    {
      "title": "Checagem no lugar certo",
      "body": "Autorizar no front-end ou em camada errada cria brechas previsíveis."
    }
  ],
  "sections": [
    {
      "id": "distincao-central",
      "eyebrow": "Fundamento",
      "title": "Autenticar e autorizar são perguntas diferentes",
      "lead": "A primeira pergunta é quem está falando; a segunda é o que essa identidade pode fazer neste contexto.",
      "visual": "auth-mapa",
      "paragraphs": [
        "Autenticação valida uma alegação de identidade com algum autenticador: senha, MFA, certificado, provedor externo ou outro mecanismo. Autorização verifica se aquela identidade, já estabelecida, tem permissão para executar a ação pedida sobre um recurso específico.",
        "Misturar essas perguntas cria sistemas inseguros e difíceis de evoluir. O usuário autenticado continua precisando passar por políticas de acesso coerentes."
      ],
      "blocks": [
        {
          "type": "definition",
          "title": "Autenticação",
          "body": "Processo de verificar se uma entidade é quem afirma ser."
        },
        {
          "type": "definition",
          "title": "Autorização",
          "body": "Processo de verificar se a ação solicitada é permitida para certa identidade e contexto."
        }
      ]
    },
    {
      "id": "fluxo-identidade",
      "eyebrow": "Fluxo",
      "title": "Do login ao acesso, há mais etapas do que um formulário e um 200 OK",
      "lead": "O sistema precisa estabelecer identidade, manter contexto e aplicar política em cada pedido relevante.",
      "interactive": "auth-flow-lab",
      "paragraphs": [
        "Depois de validar credenciais, o sistema normalmente cria algum mecanismo de continuidade: sessão no servidor, cookie, token ou outro vínculo que permita reconhecer o cliente em chamadas futuras.",
        "Mas o acesso real só acontece quando a política é avaliada sobre o recurso correto. O login bem-sucedido apenas abre a conversa; ele não encerra a pergunta de segurança."
      ],
      "blocks": [
        {
          "type": "example",
          "title": "Exemplo",
          "body": "Um usuário pode entrar corretamente no produto e ainda assim não ter permissão para ver dados financeiros de outro tenant."
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Fazer a checagem de autorização só na tela visível e esquecer que a API por trás continua acessível."
        }
      ]
    },
    {
      "id": "veiculos-de-estado",
      "eyebrow": "Comparação",
      "title": "Sessões, JWTs e API keys resolvem cenários diferentes",
      "lead": "Nenhum mecanismo é universalmente melhor; cada um organiza risco e ergonomia de um jeito.",
      "interactive": "identity-models-lab",
      "paragraphs": [
        "Sessões tradicionais facilitam revogação centralizada e mantêm o estado do lado do servidor. JWTs e outros tokens podem carregar contexto útil e escalar bem em arquiteturas distribuídas, mas exigem desenho cuidadoso de expiração, rotação e escopo. API keys costumam servir melhor para identidade de aplicação, não de usuário final.",
        "O erro clássico é tratar qualquer portador de token como automaticamente autorizado para tudo que consegue bater na API."
      ],
      "blocks": [
        {
          "type": "insight",
          "title": "Mecanismo não substitui política",
          "body": "Trocar cookie por JWT não corrige um modelo fraco de autorização."
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Usar API key para representar usuário humano com controles finos de permissão e auditoria insuficiente."
        }
      ]
    },
    {
      "id": "politicas",
      "eyebrow": "Política",
      "title": "Boa autorização combina menor privilégio, negação por padrão e contexto",
      "lead": "Permissão não precisa ser binária e global; ela pode depender de função, recurso, relação e momento.",
      "paragraphs": [
        "Modelos simples como RBAC ajudam a começar, mas nem sempre bastam. Em muitos sistemas, atributos do recurso, tenancy, vínculo entre usuário e objeto, horário, ambiente e escopo delegados também importam.",
        "A regra estrutural é clara: negar por padrão, conceder explicitamente e revisar onde a decisão está sendo tomada."
      ],
      "blocks": [
        {
          "type": "definition",
          "title": "Least privilege",
          "body": "Princípio segundo o qual identidades recebem apenas o acesso mínimo necessário para cumprir sua função."
        },
        {
          "type": "insight",
          "title": "Contexto importa",
          "body": "A mesma identidade pode ter permissão em um tenant, ambiente ou recurso e ser bloqueada em outro."
        }
      ]
    },
    {
      "id": "granularidade-de-acesso",
      "eyebrow": "Trade-off",
      "title": "Mais granularidade de acesso aumenta controle, mas também aumenta custo de modelagem",
      "lead": "A política ideal precisa ser forte o bastante para conter risco sem virar um labirinto impossível de manter.",
      "interactive": "privilege-dial-lab",
      "paragraphs": [
        "Permissões muito grossas simplificam o desenho inicial, mas tendem a superconceder acesso. Modelos finos demais, por outro lado, podem ficar difíceis de explicar, testar e auditar.",
        "O equilíbrio maduro passa por um bom modelo de domínio, logs de decisão, testes de autorização e revisão explícita das regras críticas."
      ],
      "blocks": [
        {
          "type": "example",
          "title": "Exemplo",
          "body": "Dar o papel admin para qualquer fluxo especial economiza tempo no curto prazo, mas destrói a distinção entre operação excepcional e privilégio total."
        },
        {
          "type": "definition",
          "title": "Escopo",
          "body": "Recorte do que um token ou identidade pode acessar ou executar em determinado contexto."
        }
      ]
    },
    {
      "id": "falhas-comuns",
      "eyebrow": "Prática",
      "title": "A maioria dos bugs nasce em checagens ausentes, mal posicionadas ou implícitas demais",
      "lead": "Segurança quebra com frequência por convenções assumidas e não verificadas.",
      "visual": "auth-resumo",
      "paragraphs": [
        "Checar apenas no front-end, confiar cegamente em campos enviados pelo cliente, esquecer autorização em rotas internas ou pular validação em tarefas assíncronas são falhas recorrentes. Em apps com agentes, ferramentas e integrações externas, isso piora porque a identidade do chamador humano pode não ser a mesma da aplicação que executa a ação.",
        "Por isso, autenticação e autorização precisam aparecer também em logs, trilhas de auditoria e desenho de ferramentas acionadas indiretamente."
      ],
      "blocks": [
        {
          "type": "insight",
          "title": "Apps com agentes elevam o desafio",
          "body": "Quando uma ferramenta age em nome de alguém, identidade, delegação e escopo precisam ficar ainda mais explícitos."
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Assumir que um token válido representa automaticamente autorização suficiente para qualquer ação interna."
        }
      ]
    },
    {
      "id": "sintese-operacional",
      "eyebrow": "Síntese",
      "title": "Checklist mental de AuthN e AuthZ",
      "lead": "Revise identidade, veículo de estado e política antes de liberar uma rota crítica.",
      "interactive": "summary-cards",
      "paragraphs": [
        "Consolide o caminho da identidade até a decisão de acesso."
      ]
    },
    {
      "id": "quiz-revisao",
      "eyebrow": "Revisão",
      "title": "Quiz de revisão",
      "lead": "Teste se a diferença entre provar identidade e conceder acesso ficou sólida.",
      "interactive": "quiz",
      "paragraphs": [
        "As perguntas enfatizam riscos de mistura conceitual e checagem mal posicionada."
      ]
    },
    {
      "id": "glossario",
      "eyebrow": "Vocabulário",
      "title": "Glossário essencial",
      "lead": "Termos recorrentes em segurança aplicada a APIs e produtos.",
      "interactive": "glossary",
      "paragraphs": [
        "Use o glossário como mapa para OWASP, RFCs e desenho de sistemas modernos."
      ]
    }
  ],
  "summaryCards": [
    {
      "title": "Provar identidade não basta",
      "body": "O sistema ainda precisa decidir o acesso por recurso, ação e contexto."
    },
    {
      "title": "Veículo de estado não é política",
      "body": "Cookie, sessão, JWT ou API key apenas carregam contexto; não definem privilégio sozinhos."
    },
    {
      "title": "Negar por padrão reduz surpresa",
      "body": "Autorizações explícitas e revisáveis são mais seguras do que permissões implícitas demais."
    }
  ],
  "quiz": [
    {
      "id": "q1",
      "prompt": "Qual pergunta a autenticação responde?",
      "options": [
        {
          "id": "a",
          "label": "Quem é a entidade que está se apresentando?"
        },
        {
          "id": "b",
          "label": "Quais rotas devem ser públicas?"
        },
        {
          "id": "c",
          "label": "Qual banco de dados usar?"
        }
      ],
      "correctOptionId": "a",
      "feedback": "Autenticação trata da identidade."
    },
    {
      "id": "q2",
      "prompt": "Qual pergunta a autorização responde?",
      "options": [
        {
          "id": "a",
          "label": "O que essa identidade pode fazer neste contexto?"
        },
        {
          "id": "b",
          "label": "Como gerar um certificado TLS?"
        },
        {
          "id": "c",
          "label": "Qual é o fuso horário do usuário?"
        }
      ],
      "correctOptionId": "a",
      "feedback": "Autorização trata da permissão sobre ações e recursos."
    },
    {
      "id": "q3",
      "prompt": "Sessão ou token substituem política de acesso?",
      "options": [
        {
          "id": "a",
          "label": "Não; eles transportam contexto autenticado, mas a política continua necessária."
        },
        {
          "id": "b",
          "label": "Sim; quem tem token pode tudo."
        },
        {
          "id": "c",
          "label": "Só em ambiente de desenvolvimento."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Mecanismo de estado não resolve sozinho o problema de autorização."
    },
    {
      "id": "q4",
      "prompt": "Por que checar autorização apenas no front-end é falho?",
      "options": [
        {
          "id": "a",
          "label": "Porque a API ainda pode ser chamada por outros clientes ou diretamente."
        },
        {
          "id": "b",
          "label": "Porque CSS não suporta segurança."
        },
        {
          "id": "c",
          "label": "Porque navegadores proíbem login."
        }
      ],
      "correctOptionId": "a",
      "feedback": "A verificação precisa existir do lado do recurso protegido."
    },
    {
      "id": "q5",
      "prompt": "O que expressa least privilege?",
      "options": [
        {
          "id": "a",
          "label": "Conceder apenas o acesso mínimo necessário."
        },
        {
          "id": "b",
          "label": "Transformar todo usuário em admin temporário."
        },
        {
          "id": "c",
          "label": "Usar a mesma API key para todos os serviços."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Esse é o princípio de menor privilégio."
    },
    {
      "id": "q6",
      "prompt": "Para que API keys costumam ser mais adequadas?",
      "options": [
        {
          "id": "a",
          "label": "Identidade de aplicação ou integração, não de usuário final com política rica."
        },
        {
          "id": "b",
          "label": "Armazenar sessões no navegador."
        },
        {
          "id": "c",
          "label": "Substituir logs de auditoria."
        }
      ],
      "correctOptionId": "a",
      "feedback": "API keys geralmente funcionam melhor para identidade de sistema."
    },
    {
      "id": "q7",
      "prompt": "O que significa deny by default?",
      "options": [
        {
          "id": "a",
          "label": "Bloquear por padrão e liberar explicitamente o necessário."
        },
        {
          "id": "b",
          "label": "Falhar sempre que a senha tiver símbolos."
        },
        {
          "id": "c",
          "label": "Rejeitar toda chamada sem JSON."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Negação por padrão reduz permissões implícitas perigosas."
    },
    {
      "id": "q8",
      "prompt": "Por que apps com agentes aumentam o desafio de autorização?",
      "options": [
        {
          "id": "a",
          "label": "Porque a ação pode ser executada por uma ferramenta em nome de alguém, exigindo delegação e escopo explícitos."
        },
        {
          "id": "b",
          "label": "Porque agentes não usam HTTP."
        },
        {
          "id": "c",
          "label": "Porque não existem logs nesses sistemas."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Delegação e identidade indireta tornam a política mais delicada."
    }
  ],
  "glossary": [
    {
      "term": "Autenticação",
      "definition": "Processo de verificar a identidade de uma entidade."
    },
    {
      "term": "Autorização",
      "definition": "Processo de verificar se uma ação é permitida para certa identidade e contexto."
    },
    {
      "term": "Sessão",
      "definition": "Vínculo de estado autenticado mantido entre cliente e servidor."
    },
    {
      "term": "Cookie",
      "definition": "Mecanismo de transporte de estado usado com frequência em sessões web."
    },
    {
      "term": "JWT",
      "definition": "Token estruturado que pode carregar claims e contexto autenticado."
    },
    {
      "term": "API key",
      "definition": "Credencial tipicamente usada para identificar aplicações ou integrações."
    },
    {
      "term": "Least privilege",
      "definition": "Princípio de conceder apenas o mínimo acesso necessário."
    },
    {
      "term": "RBAC",
      "definition": "Role-Based Access Control, modelo baseado em papéis."
    },
    {
      "term": "Escopo",
      "definition": "Recorte do que uma identidade ou token pode acessar ou executar."
    },
    {
      "term": "Deny by default",
      "definition": "Estratégia de negar por padrão e liberar explicitamente o que for necessário."
    },
    {
      "term": "MFA",
      "definition": "Autenticação multifator, com mais de um tipo de prova de identidade."
    }
  ],
  "relatedTopics": [
    {
      "title": "APIs REST",
      "body": "Conecte política de acesso à superfície das rotas e seus métodos."
    },
    {
      "title": "Observabilidade de Sistemas",
      "body": "Leve decisões de acesso para logs, auditoria e análise operacional."
    }
  ]
};
