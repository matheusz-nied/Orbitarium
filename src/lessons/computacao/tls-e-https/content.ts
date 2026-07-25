import type { LessonContent } from "../../../types/content";

export const tlsEHttpsContent: LessonContent = {
  "id": "tls-e-https",
  "title": "TLS e HTTPS",
  "subtitle": "Como navegadores e servidores negociam um canal autenticado e criptografado antes do primeiro byte útil.",
  "description": "Uma aula visual sobre HTTP em claro, handshake TLS, certificados, CAs, chaves de sessão, TLS 1.3, forward secrecy e erros comuns de implantação.",
  "primaryCategoryId": "computacao",
  "secondaryCategoryId": "engenharia",
  "level": "Intermediário",
  "estimatedTime": "45-60 min",
  "tags": [
    "TLS",
    "HTTPS",
    "Certificados",
    "Criptografia",
    "PKI",
    "Segurança",
    "TLS 1.3"
  ],
  "learningObjectives": [
    "Explicar por que HTTPS existe e quais problemas do HTTP em claro ele resolve.",
    "Descrever as etapas centrais de um handshake TLS moderno sem cair em jargão vazio.",
    "Relacionar certificados, autoridades certificadoras e validação de identidade do servidor.",
    "Entender a função das chaves efêmeras e da forward secrecy em TLS 1.3.",
    "Reconhecer o papel prático de configuração segura, rotação de certificados e HSTS.",
    "Identificar erros comuns como misturar segurança de transporte com segurança da aplicação."
  ],
  "prerequisites": [
    "Noção básica de cliente, servidor e requisições HTTP.",
    "Alguma familiaridade com cadeados no navegador ajuda, mas não é necessária.",
    "Curiosidade sobre como segurança real aparece em protocolos da web."
  ],
  "references": [
    {
      "title": "RFC 8446: The Transport Layer Security (TLS) Protocol Version 1.3",
      "source": "IETF RFC Editor",
      "url": "https://www.rfc-editor.org/rfc/rfc8446",
      "note": "Especificação oficial do TLS 1.3."
    },
    {
      "title": "TLS",
      "source": "MDN Web Docs",
      "url": "https://developer.mozilla.org/en-US/docs/Glossary/TLS",
      "note": "Definição curta e precisa do protocolo TLS."
    },
    {
      "title": "HTTPS",
      "source": "MDN Web Docs",
      "url": "https://developer.mozilla.org/en-US/docs/Glossary/HTTPS",
      "note": "Resumo da ideia de HTTP sobre TLS."
    },
    {
      "title": "Transport Layer Security Cheat Sheet",
      "source": "OWASP Cheat Sheet Series",
      "url": "https://cheatsheetseries.owasp.org/cheatsheets/Transport_Layer_Security_Cheat_Sheet.html",
      "note": "Boas práticas práticas de implantação e configuração."
    },
    {
      "title": "Server Side TLS",
      "source": "Mozilla Wiki",
      "url": "https://wiki.mozilla.org/Security/Server_Side_TLS",
      "note": "Recomendações públicas da Mozilla para servidores TLS."
    },
    {
      "title": "How It Works",
      "source": "Let’s Encrypt",
      "url": "https://letsencrypt.org/how-it-works/",
      "note": "Explicação didática sobre certificados e confiança pública."
    }
  ],
  "heroVisual": "tls-hero",
  "openingText": "Quando você abre um site por HTTPS, há um ritual silencioso antes do conteúdo aparecer: o navegador precisa ter confiança de que está falando com o servidor certo e os dois lados precisam concordar em como proteger a conversa. Esse ritual é o TLS. Ele não elimina todos os riscos de uma aplicação, mas protege a camada de transporte contra leitura e adulteração no caminho. Entender esse limite é tão importante quanto entender o que o protocolo faz bem.",
  "quickFacts": [
    {
      "title": "HTTPS = HTTP sobre TLS",
      "body": "A semântica HTTP continua, mas a conversa passa por um canal autenticado e criptografado."
    },
    {
      "title": "Certificado não é só enfeite",
      "body": "Ele ajuda o cliente a validar com quem está falando e a montar uma cadeia de confiança."
    },
    {
      "title": "TLS 1.3 simplificou muito",
      "body": "O protocolo moderno reduz complexidade histórica e fortalece o padrão operacional."
    }
  ],
  "sections": [
    {
      "id": "por-que-https",
      "eyebrow": "Problema",
      "title": "HTTP em claro expõe leitura e adulteração no caminho",
      "lead": "Sem proteção de transporte, intermediários podem observar, alterar ou sequestrar a conversa entre cliente e servidor.",
      "visual": "tls-mapa",
      "paragraphs": [
        "Em uma rede sem TLS, conteúdo, cookies e cabeçalhos podem trafegar em claro para qualquer ponto intermediário com visibilidade suficiente. Isso inclui redes locais hostis, proxies mal configurados e cenários de interceptação.",
        "HTTPS surge para reduzir esse risco com autenticação do servidor, integridade da conversa e confidencialidade do canal. O navegador continua falando HTTP, mas agora dentro de um túnel criptográfico autenticado."
      ],
      "blocks": [
        {
          "type": "definition",
          "title": "HTTPS",
          "body": "Uso da semântica HTTP sobre uma conexão protegida por TLS."
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Achar que HTTPS protege automaticamente contra bugs de autorização, XSS ou lógica insegura de aplicação."
        }
      ]
    },
    {
      "id": "handshake-tls",
      "eyebrow": "Fluxo",
      "title": "O handshake decide identidade e chaves antes do tráfego útil",
      "lead": "Cliente e servidor trocam capacidades, validam identidade e derivam chaves de sessão para proteger a conversa.",
      "interactive": "tls-handshake-lab",
      "paragraphs": [
        "O cliente inicia a conversa com versões e algoritmos compatíveis. O servidor escolhe parâmetros, apresenta certificado e participa da negociação criptográfica. Depois disso, os dois lados derivam segredos de sessão e passam a proteger o tráfego de aplicação.",
        "A grande ideia é simples: autenticar o par, combinar criptografia forte e chegar a uma chave compartilhada sem transmiti-la diretamente pela rede."
      ],
      "blocks": [
        {
          "type": "example",
          "title": "Exemplo",
          "body": "Ao acessar um banco on-line, o navegador quer ter evidências de que o servidor realmente controla o domínio esperado antes de enviar credenciais."
        },
        {
          "type": "insight",
          "title": "Intuição útil",
          "body": "O handshake existe para preparar a segurança da conversa; ele não é a conversa de negócio em si."
        }
      ]
    },
    {
      "id": "certificados-e-confianca",
      "eyebrow": "Identidade",
      "title": "Certificados e CAs organizam a confiança pública da web",
      "lead": "O certificado liga uma chave pública a uma identidade observável, e o navegador decide se confia nessa ligação.",
      "interactive": "trust-models-lab",
      "paragraphs": [
        "Um certificado contém informações sobre o sujeito, a chave pública e assinaturas que ajudam a formar uma cadeia até uma âncora de confiança conhecida pelo cliente. O navegador não confia porque o servidor disse quem é; ele confia porque a cadeia apresentada faz sentido para sua base de confiança.",
        "Essa verificação não é perfeita nem mágica, mas é o mecanismo operacional que torna viável autenticar milhões de sites sem cadastro manual por usuário."
      ],
      "blocks": [
        {
          "type": "definition",
          "title": "CA",
          "body": "Autoridade certificadora que emite ou assina certificados dentro de uma infraestrutura de confiança."
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Confundir possuir um certificado com estar seguro por completo. O certificado autentica o canal, não corrige a aplicação."
        }
      ]
    },
    {
      "id": "chaves-de-sessao",
      "eyebrow": "Criptografia",
      "title": "Depois da identidade validada, entram em cena as chaves de sessão",
      "lead": "O custo e a função da criptografia assimétrica são diferentes dos da criptografia simétrica usada no tráfego principal.",
      "paragraphs": [
        "Operações assimétricas ajudam na autenticação e na negociação inicial, mas o grosso dos dados costuma ser protegido por chaves simétricas derivadas ao final do handshake. Isso torna o canal seguro e rápido o bastante para uso cotidiano.",
        "Separar identidade, troca de segredo e proteção contínua do tráfego ajuda a enxergar por que o protocolo combina diferentes famílias de técnicas criptográficas."
      ],
      "blocks": [
        {
          "type": "definition",
          "title": "Chave de sessão",
          "body": "Segredo temporário derivado para proteger o tráfego de uma conexão específica."
        },
        {
          "type": "example",
          "title": "Exemplo",
          "body": "O navegador valida o servidor com dados assimétricos, mas a página e seus recursos trafegam depois sob proteção simétrica derivada."
        }
      ]
    },
    {
      "id": "tls13-e-forward-secrecy",
      "eyebrow": "Trade-off",
      "title": "TLS 1.3 fortalece o padrão com menos escolhas perigosas e melhor forward secrecy",
      "lead": "O protocolo moderno remove parte da herança complicada e favorece mecanismos mais seguros por padrão.",
      "interactive": "crypto-dial-lab",
      "paragraphs": [
        "Forward secrecy significa que o comprometimento de uma chave de longo prazo não deveria permitir descriptografar sessões antigas gravadas por um atacante. Isso reduz o impacto de um vazamento tardio.",
        "Na prática, TLS 1.3 simplifica a negociação, reduz algoritmos obsoletos expostos e melhora a base operacional para a maioria dos serviços web modernos."
      ],
      "blocks": [
        {
          "type": "definition",
          "title": "Forward secrecy",
          "body": "Propriedade pela qual o vazamento de uma chave de longo prazo não expõe automaticamente sessões passadas."
        },
        {
          "type": "insight",
          "title": "Segurança e ergonomia podem andar juntas",
          "body": "Quando o protocolo elimina opções ruins, fica mais fácil acertar na implantação do dia a dia."
        }
      ]
    },
    {
      "id": "https-na-pratica",
      "eyebrow": "Operação",
      "title": "Segurança de transporte também depende de configuração, renovação e políticas auxiliares",
      "lead": "Certificado expirado, redirecionamento inconsistente ou TLS mal configurado transformam um protocolo bom em operação frágil.",
      "visual": "tls-resumo",
      "paragraphs": [
        "Na vida real, HTTPS envolve automação de emissão e renovação de certificados, configurações adequadas no servidor, políticas como HSTS e observação de erros de handshake ou de cadeias inválidas.",
        "O objetivo não é decorar nomes de cipher suites, mas garantir que clientes atualizados consigam estabelecer conexões seguras com baixa fricção e baixo risco de configuração regressiva."
      ],
      "blocks": [
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Ativar HTTPS na borda, mas manter redirecionamentos, cookies ou recursos mistos de forma inconsistente."
        },
        {
          "type": "insight",
          "title": "Boa operação é parte da segurança",
          "body": "O cadeado só inspira confiança quando a infraestrutura inteira acompanha o protocolo com disciplina."
        }
      ]
    },
    {
      "id": "sintese-operacional",
      "eyebrow": "Síntese",
      "title": "Checklist mental para pensar HTTPS",
      "lead": "Revise ameaça, identidade, chaves e implantação antes de resumir TLS a um cadeado.",
      "interactive": "summary-cards",
      "paragraphs": [
        "Use os cartões para consolidar o que o protocolo resolve e o que continua fora dele."
      ]
    },
    {
      "id": "quiz-revisao",
      "eyebrow": "Revisão",
      "title": "Quiz de revisão",
      "lead": "Teste a diferença entre autenticar o servidor, proteger o canal e proteger a aplicação.",
      "interactive": "quiz",
      "paragraphs": [
        "As perguntas enfatizam handshake, certificados e limites do HTTPS."
      ]
    },
    {
      "id": "glossario",
      "eyebrow": "Vocabulário",
      "title": "Glossário essencial",
      "lead": "Termos recorrentes em documentação de segurança de transporte e navegadores.",
      "interactive": "glossary",
      "paragraphs": [
        "Consulte o glossário ao ler RFCs, guias de deploy e alertas de navegador."
      ]
    }
  ],
  "summaryCards": [
    {
      "title": "HTTPS protege o transporte",
      "body": "Ele autentica o servidor e protege a conversa contra leitura e alteração no caminho."
    },
    {
      "title": "Certificados organizam confiança",
      "body": "O navegador precisa validar a cadeia apresentada; não basta o servidor se autodeclarar."
    },
    {
      "title": "Operação importa muito",
      "body": "Renovação, configuração e políticas como HSTS fazem parte da segurança prática."
    }
  ],
  "quiz": [
    {
      "id": "q1",
      "prompt": "O que HTTPS adiciona ao HTTP?",
      "options": [
        {
          "id": "a",
          "label": "Um canal protegido por TLS com autenticação e criptografia de transporte."
        },
        {
          "id": "b",
          "label": "Um novo formato de banco de dados."
        },
        {
          "id": "c",
          "label": "Uma forma de eliminar bugs de aplicação."
        }
      ],
      "correctOptionId": "a",
      "feedback": "HTTPS é HTTP trafegando sobre TLS."
    },
    {
      "id": "q2",
      "prompt": "Qual é o papel principal do handshake TLS?",
      "options": [
        {
          "id": "a",
          "label": "Negociar parâmetros, validar identidade e derivar chaves de sessão."
        },
        {
          "id": "b",
          "label": "Compactar o HTML para envio mais rápido."
        },
        {
          "id": "c",
          "label": "Substituir o DNS do cliente."
        }
      ],
      "correctOptionId": "a",
      "feedback": "O handshake prepara a segurança da conversa."
    },
    {
      "id": "q3",
      "prompt": "O certificado do servidor serve principalmente para quê?",
      "options": [
        {
          "id": "a",
          "label": "Ajudar o cliente a verificar a identidade associada à chave pública apresentada."
        },
        {
          "id": "b",
          "label": "Aumentar a velocidade da CPU do servidor."
        },
        {
          "id": "c",
          "label": "Garantir que a aplicação não tenha falhas lógicas."
        }
      ],
      "correctOptionId": "a",
      "feedback": "O certificado participa da autenticação do par remoto."
    },
    {
      "id": "q4",
      "prompt": "O que significa forward secrecy?",
      "options": [
        {
          "id": "a",
          "label": "Vazamento de chave de longo prazo não deve expor automaticamente sessões passadas."
        },
        {
          "id": "b",
          "label": "O navegador sempre usar HTTP/3."
        },
        {
          "id": "c",
          "label": "Todo certificado valer para qualquer domínio."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Essa propriedade limita o impacto de um vazamento tardio."
    },
    {
      "id": "q5",
      "prompt": "Por que o tráfego principal costuma usar criptografia simétrica após o handshake?",
      "options": [
        {
          "id": "a",
          "label": "Porque ela é mais eficiente para proteger grandes volumes de dados."
        },
        {
          "id": "b",
          "label": "Porque certificados não aceitam texto."
        },
        {
          "id": "c",
          "label": "Porque TLS não usa mais chaves de sessão."
        }
      ],
      "correctOptionId": "a",
      "feedback": "O protocolo combina técnicas diferentes para funções diferentes."
    },
    {
      "id": "q6",
      "prompt": "Qual afirmação está correta sobre HTTPS?",
      "options": [
        {
          "id": "a",
          "label": "Ele melhora a segurança do transporte, mas não substitui autenticação e autorização da aplicação."
        },
        {
          "id": "b",
          "label": "Ele impede qualquer erro de negócio."
        },
        {
          "id": "c",
          "label": "Ele torna desnecessário renovar certificados."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Segurança de transporte não cobre toda a aplicação."
    },
    {
      "id": "q7",
      "prompt": "O que é uma CA?",
      "options": [
        {
          "id": "a",
          "label": "Uma autoridade certificadora envolvida na infraestrutura de confiança de certificados."
        },
        {
          "id": "b",
          "label": "Um algoritmo de compressão de imagens."
        },
        {
          "id": "c",
          "label": "Um cache local do navegador."
        }
      ],
      "correctOptionId": "a",
      "feedback": "CA significa autoridade certificadora."
    },
    {
      "id": "q8",
      "prompt": "Qual é um erro operacional comum em HTTPS?",
      "options": [
        {
          "id": "a",
          "label": "Deixar certificados expirarem ou manter configuração inconsistente de redirecionamento e recursos."
        },
        {
          "id": "b",
          "label": "Usar portas TCP."
        },
        {
          "id": "c",
          "label": "Retornar JSON em APIs."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Boa operação é parte do funcionamento seguro de TLS/HTTPS."
    }
  ],
  "glossary": [
    {
      "term": "TLS",
      "definition": "Protocolo de segurança de transporte que protege a comunicação entre cliente e servidor."
    },
    {
      "term": "HTTPS",
      "definition": "HTTP executado sobre uma conexão protegida por TLS."
    },
    {
      "term": "Handshake",
      "definition": "Etapa inicial em que os lados negociam parâmetros e estabelecem chaves."
    },
    {
      "term": "Certificado digital",
      "definition": "Documento assinado que associa uma chave pública a uma identidade observável."
    },
    {
      "term": "CA",
      "definition": "Autoridade certificadora que participa da cadeia de confiança pública."
    },
    {
      "term": "PKI",
      "definition": "Infraestrutura de chaves públicas usada para emissão, validação e confiança em certificados."
    },
    {
      "term": "Chave pública",
      "definition": "Parte pública de um par criptográfico, distribuída para verificação ou negociação."
    },
    {
      "term": "Chave de sessão",
      "definition": "Segredo temporário usado para proteger os dados de uma conexão específica."
    },
    {
      "term": "Forward secrecy",
      "definition": "Propriedade que reduz o impacto de vazamento de chaves de longo prazo sobre sessões passadas."
    },
    {
      "term": "HSTS",
      "definition": "Política que instrui navegadores a preferirem HTTPS para um domínio."
    },
    {
      "term": "Cipher suite",
      "definition": "Conjunto de algoritmos e parâmetros usados por uma conexão TLS."
    }
  ],
  "relatedTopics": [
    {
      "title": "Autenticação e Autorização",
      "body": "HTTPS protege o transporte, mas as decisões de acesso continuam sendo problema da aplicação."
    },
    {
      "title": "APIs REST",
      "body": "A semântica HTTP permanece; o que muda é o canal em que ela trafega."
    }
  ]
};
