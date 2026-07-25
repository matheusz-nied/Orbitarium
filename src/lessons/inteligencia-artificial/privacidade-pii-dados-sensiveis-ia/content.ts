import type { LessonContent } from "../../../types/content";

export const privacidadePiiDadosSensiveisIaContent: LessonContent = {
  "id": "privacidade-pii-dados-sensiveis-ia",
  "title": "Privacidade, PII e Dados Sensíveis em Sistemas de IA",
  "subtitle": "Dados pessoais vazam em muitos pontos do ciclo de vida da IA: coleta, treino, logs, observabilidade, prompts, recuperação e integrações.",
  "description": "Uma aula intermediária sobre PII, minimização de dados, retenção, memorization risk, logs, redaction, access control, ferramentas como Presidio e Sensitive Data Protection, e como desenhar sistemas de IA com privacidade por padrão.",
  "primaryCategoryId": "inteligencia-artificial",
  "secondaryCategoryId": "engenharia",
  "level": "Intermediário",
  "estimatedTime": "40-55 min",
  "tags": [
    "Privacidade",
    "PII",
    "Dados Sensíveis",
    "NIST",
    "Redação",
    "Governança",
    "Presidio"
  ],
  "learningObjectives": [
    "Identificar onde PII e dados sensíveis aparecem no ciclo de vida de sistemas de IA.",
    "Diferenciar coleta necessária de coleta excessiva em nome de conveniência analítica.",
    "Entender riscos de logs, observabilidade, vendors e retenção prolongada.",
    "Aplicar princípios de minimização, redaction, access control e purpose limitation.",
    "Relacionar privacidade a memorization, inferências sensíveis e vazamentos em saídas.",
    "Usar privacidade como requisito de arquitetura, não como filtro tardio."
  ],
  "prerequisites": [
    "Noção geral de sistemas de IA e prompts em produção.",
    "Familiaridade básica com conceitos de segurança e controle de acesso ajuda.",
    "Entender que dado sensível não é sinônimo apenas de documento oficial; contexto importa."
  ],
  "references": [
    {
      "title": "Guide to Protecting the Confidentiality of Personally Identifiable Information (PII)",
      "source": "NIST",
      "url": "https://www.nist.gov/publications/guide-protecting-confidentiality-personally-identifiable-information-pii",
      "note": "Guia clássico do NIST sobre PII e proteção contextual."
    },
    {
      "title": "NIST SP 800-122",
      "source": "NIST",
      "url": "https://nvlpubs.nist.gov/nistpubs/legacy/sp/nistspecialpublication800-122.pdf",
      "note": "Versão em PDF com orientações detalhadas para proteção de PII."
    },
    {
      "title": "Privacy Framework",
      "source": "NIST",
      "url": "https://www.nist.gov/privacy-framework",
      "note": "Framework voluntário do NIST para gestão de risco de privacidade."
    },
    {
      "title": "Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile",
      "source": "NIST",
      "url": "https://nvlpubs.nist.gov/nistpubs/ai/nist.ai.600-1.pdf",
      "note": "Discute riscos de privacidade e memorization em sistemas generativos."
    },
    {
      "title": "Getting started with text de-identification",
      "source": "Microsoft Presidio",
      "url": "https://presidio.dataprivacystack.org/getting_started/getting_started_text/",
      "note": "Guia oficial de detecção e anonimização de PII com Presidio."
    },
    {
      "title": "Sensitive Data Protection documentation",
      "source": "Google Cloud",
      "url": "https://cloud.google.com/sensitive-data-protection/docs",
      "note": "Documentação oficial do serviço gerenciado de descoberta e desidentificação de dados sensíveis."
    }
  ],
  "heroVisual": "hero",
  "openingText": "Privacidade em sistemas de IA quase nunca falha em um único ponto óbvio. O problema pode nascer no dataset de treino, reaparecer em logs de prompts, ampliar-se em observabilidade rica demais, escapar por integrações terceiras ou surgir como inferência sensível que ninguém pretendia fazer. É por isso que tratar PII como um regex no fim do pipeline é insuficiente. Privacidade precisa de desenho: o sistema deve coletar menos, reter por menos tempo, expor a menos pessoas e auditar continuamente onde dados pessoais podem aparecer ou ser reconstruídos.",
  "quickFacts": [
    {
      "title": "PII é contextual",
      "body": "O mesmo dado pode ser mais ou menos sensível conforme o cenário, o vínculo com outras informações e o uso pretendido."
    },
    {
      "title": "Logs são superfície de vazamento",
      "body": "Prompts, respostas, feedbacks e traces podem acumular dados pessoais sem perceber."
    },
    {
      "title": "IA também infere",
      "body": "Mesmo sem copiar literalmente um dado, o sistema pode reconstruir ou inferir informação sensível a partir de sinais dispersos."
    }
  ],
  "sections": [
    {
      "id": "onde-o-risco-nasce",
      "eyebrow": "Motivação",
      "title": "Dados pessoais entram no sistema por muitos caminhos",
      "lead": "Treino, prompts, arquivos, feedbacks, vendors e observabilidade podem todos carregar exposição.",
      "paragraphs": [
        "Em aplicações modernas de IA, dados pessoais podem aparecer em datasets históricos, interações em tempo real, anexos, resultados de busca, ferramentas externas e até labels humanos usados para avaliação. Isso torna a superfície de privacidade muito mais ampla do que um banco tradicional único.",
        "Quando o time pensa apenas no modelo ou apenas no banco, perde a visão do pipeline inteiro. O resultado é risco pulverizado e difícil de governar.",
        "O primeiro passo, portanto, é mapear onde a informação sensível pode nascer, circular e permanecer."
      ],
      "visual": "hero",
      "blocks": [
        {
          "type": "definition",
          "title": "Superfície de privacidade",
          "body": "Conjunto de pontos do sistema em que dados pessoais podem ser coletados, processados, observados ou inferidos."
        },
        {
          "type": "insight",
          "title": "Risco distribuído",
          "body": "Em IA, privacidade se espalha pela cadeia inteira, não apenas pelo armazenamento principal."
        }
      ]
    },
    {
      "id": "pii-e-contexto",
      "eyebrow": "Conceito",
      "title": "PII não é só lista de campos; é contexto e reidentificação",
      "lead": "Dados aparentemente inofensivos podem se tornar sensíveis quando combinados ou reutilizados.",
      "paragraphs": [
        "Nome, e-mail e documento são exemplos óbvios. Mas localização aproximada, histórico de navegação, cargo, texto livre ou combinação de atributos também podem identificar alguém ou revelar informações íntimas.",
        "Por isso políticas maduras tratam PII de forma contextual. O risco depende do propósito, da combinação possível com outras fontes e do dano potencial se houver exposição ou inferência indevida.",
        "Em sistemas de IA, esse contexto importa ainda mais porque o modelo pode correlacionar sinais dispersos com grande facilidade."
      ],
      "visual": "concept",
      "blocks": [
        {
          "type": "definition",
          "title": "PII contextual",
          "body": "Informação que pode identificar ou contribuir para identificar uma pessoa dependendo do cenário e das combinações possíveis."
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Achar que basta filtrar alguns campos clássicos e assumir que o resto do texto é neutro."
        }
      ]
    },
    {
      "id": "minimizacao-e-proposito",
      "eyebrow": "Princípio",
      "title": "Coletar menos é a forma mais confiável de vazar menos",
      "lead": "Minimização e purpose limitation reduzem risco antes que ele se espalhe pelo pipeline.",
      "paragraphs": [
        "Dados guardados por conveniência tendem a reaparecer em lugares improváveis: feature stores, backups, datasets de avaliação, prompts de debugging e relatórios internos. Cada cópia amplia a chance de exposição.",
        "Quando o time define com clareza o propósito do dado e coleta apenas o estritamente necessário, ganha duas coisas: menos risco estrutural e mais clareza de governança.",
        "Esse princípio é mais poderoso do que confiar exclusivamente em limpeza posterior."
      ],
      "visual": "pipeline",
      "interactive": "data-minimization-lab",
      "blocks": [
        {
          "type": "definition",
          "title": "Minimização de dados",
          "body": "Prática de limitar coleta, retenção e compartilhamento ao mínimo necessário."
        },
        {
          "type": "insight",
          "title": "Governar cedo é mais barato",
          "body": "É muito mais simples evitar que o dado entre do que remover o dado de todas as réplicas depois."
        }
      ]
    },
    {
      "id": "logs-traces-vendors",
      "eyebrow": "Operação",
      "title": "Observabilidade e integrações podem vazar sem querer",
      "lead": "Prompts, traces e dashboards são úteis, mas também viram depósitos silenciosos de sensibilidade.",
      "paragraphs": [
        "Ao instrumentar um sistema de IA, times frequentemente registram prompts completos, respostas, metadados de sessão, documentos recuperados e IDs de usuário. Isso ajuda no debugging, mas pode acumular exposição rapidamente.",
        "Integrações com vendors externos e SaaS de observabilidade também precisam ser avaliadas com cuidado: quem recebe o dado, por quanto tempo, com que contrato e com que possibilidade de reutilização?",
        "Privacidade madura não é antiobservabilidade; é observabilidade desenhada com escopo, retenção e redaction adequados."
      ],
      "visual": "comparison",
      "interactive": "pii-exposure-simulator",
      "blocks": [
        {
          "type": "definition",
          "title": "Observability exhaust",
          "body": "Resíduos operacionais como logs, traces e métricas que podem conter PII."
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Ativar logging completo em produção e só depois perguntar se havia dados sensíveis ali dentro."
        }
      ]
    },
    {
      "id": "redaction-e-deteccao",
      "eyebrow": "Técnica",
      "title": "Ferramentas de detecção ajudam, mas não substituem arquitetura",
      "lead": "Regex, NER, políticas de mascaramento e revisão humana reduzem exposição, mas não são licença para coletar tudo.",
      "paragraphs": [
        "Ferramentas como Presidio e serviços gerenciados de descoberta e desidentificação ajudam a encontrar e transformar trechos sensíveis antes de armazenamento, compartilhamento ou uso secundário.",
        "Elas são valiosas em logs, bases legadas e fluxos de suporte, mas possuem limites: falsos positivos, falsos negativos e dificuldade com contexto ambíguo.",
        "Por isso o desenho certo combina detecção automática com escopo restrito de coleta e revisão de políticas."
      ],
      "visual": "comparison",
      "blocks": [
        {
          "type": "example",
          "title": "Uso prudente",
          "body": "Redigir logs e documentos antes de enviá-los para ferramentas de observabilidade ou análise externa."
        },
        {
          "type": "insight",
          "title": "Detecção é apoio",
          "body": "Ela fortalece a arquitetura, mas não substitui minimização, retenção e controle de acesso."
        }
      ]
    },
    {
      "id": "access-and-retention",
      "eyebrow": "Governança",
      "title": "Quem vê e por quanto tempo vê importa tanto quanto o que foi coletado",
      "lead": "Privacidade exige limitar alcance e duração da exposição.",
      "paragraphs": [
        "Mesmo dados razoavelmente desidentificados podem se tornar problemáticos se forem acessíveis a muita gente, exportáveis sem controle ou mantidos por tempo excessivo. A superfície de risco cresce com alcance e permanência.",
        "Políticas de acesso por função, segregação de ambientes, retenção curta para traces ricos e descarte seguro ajudam a conter esse efeito. A lógica é simples: menos pessoas, menos tempo, menos risco.",
        "Sem isso, a organização vira um grande vazamento em potencial esperando o contexto errado."
      ],
      "visual": "checklist",
      "blocks": [
        {
          "type": "definition",
          "title": "Retention policy",
          "body": "Regra de quanto tempo cada tipo de dado pode permanecer armazenado."
        },
        {
          "type": "definition",
          "title": "Access control",
          "body": "Mecanismos de autenticação, autorização e segregação que limitam quem pode acessar dados sensíveis."
        }
      ]
    },
    {
      "id": "memorization-e-inferencia",
      "eyebrow": "IA generativa",
      "title": "Privacidade em IA não é só copiar texto; também é inferir demais",
      "lead": "Modelos podem expor ou reconstruir informação sensível de formas menos óbvias.",
      "paragraphs": [
        "Em alguns cenários, o modelo pode memorizar trechos específicos do treinamento ou combinar sinais para inferir atributos que a pessoa nunca revelou explicitamente na interação atual. Isso amplia o debate de privacidade para além do vazamento literal.",
        "Mesmo inferências incorretas podem ser danosas se forem tratadas como verdade em decisões ou respostas. Portanto, o risco inclui também a produção de conclusões sensíveis sobre indivíduos ou grupos.",
        "Essa camada reforça a necessidade de políticas de uso, red-team, avaliação e restrição de finalidades."
      ],
      "visual": "tradeoff",
      "blocks": [
        {
          "type": "definition",
          "title": "Memorization",
          "body": "Retenção ou reprodução de exemplos específicos pelo modelo."
        },
        {
          "type": "insight",
          "title": "Inferência também é exposição",
          "body": "O dano pode surgir mesmo quando o sistema não repete o dado original, mas o reconstrói de forma plausível."
        }
      ]
    },
    {
      "id": "privacy-by-design",
      "eyebrow": "Decisão",
      "title": "Privacidade precisa aparecer no desenho do sistema desde cedo",
      "lead": "A melhor arquitetura não é a que remenda vazamentos; é a que evita que dados sensíveis se espalhem sem necessidade.",
      "paragraphs": [
        "Definir propósito, escopo de coleta, políticas de retenção, pontos de redaction, contratos com vendors e critérios de acesso logo no início reduz retrabalho e risco acumulado.",
        "Também ajuda decidir onde o dado realmente precisa aparecer: o modelo precisa disso para responder? O dashboard precisa ver o texto completo? A ferramenta externa precisa do prompt inteiro?",
        "Quanto mais cedo essas perguntas são feitas, menor a chance de a pilha inteira se organizar em torno do excesso."
      ],
      "visual": "tradeoff",
      "interactive": "privacy-design-scenarios",
      "blocks": [
        {
          "type": "example",
          "title": "Pergunta-chave",
          "body": "Se amanhã você precisasse justificar por que este dado está neste sistema, conseguiria explicar necessidade, retenção e acesso?"
        },
        {
          "type": "mistake",
          "title": "Erro comum",
          "body": "Assumir que privacidade pode ser resolvida depois de o pipeline já ter sido espalhado por várias integrações."
        }
      ]
    },
    {
      "id": "quiz-revisao",
      "eyebrow": "Revisão",
      "title": "Quiz de revisão",
      "lead": "Use as perguntas para verificar se coleta, logs, retenção e inferência sensível ficaram conectados.",
      "paragraphs": [
        "A meta é enxergar privacidade como requisito de arquitetura e operação, não como trabalho de limpeza no fim da fila."
      ],
      "interactive": "quiz"
    },
    {
      "id": "glossario",
      "eyebrow": "Glossário",
      "title": "Glossário essencial",
      "lead": "Feche a aula consolidando o vocabulário de privacidade aplicado a sistemas de IA.",
      "paragraphs": [
        "Esses termos ajudam a discutir riscos com segurança, produto, jurídico e operação usando uma linguagem comum."
      ],
      "interactive": "glossary"
    }
  ],
  "summaryCards": [
    {
      "title": "Minimizar é melhor que limpar depois",
      "body": "Coletar menos e reter menos reduz risco estrutural."
    },
    {
      "title": "Privacidade atravessa o pipeline inteiro",
      "body": "Treino, serving, logs, vendors e dashboards podem carregar exposição."
    },
    {
      "title": "Redação ajuda, mas não resolve sozinha",
      "body": "É preciso combinar detecção, controle de acesso e políticas de retenção."
    },
    {
      "title": "Memorization e inferência importam",
      "body": "Risco de privacidade em IA não se limita a vazamento literal de texto."
    }
  ],
  "quiz": [
    {
      "id": "q1",
      "prompt": "Qual visão sobre PII é mais correta?",
      "options": [
        {
          "id": "a",
          "label": "PII é sempre o mesmo conjunto fixo de campos, independentemente do contexto."
        },
        {
          "id": "b",
          "label": "PII e sensibilidade dependem também do contexto e da possibilidade de reidentificação."
        },
        {
          "id": "c",
          "label": "PII só existe em bancos governamentais."
        }
      ],
      "correctOptionId": "b",
      "feedback": "Contexto, combinação de atributos e uso esperado importam muito na avaliação de risco."
    },
    {
      "id": "q2",
      "prompt": "Por que logs merecem tanta atenção em sistemas de IA?",
      "options": [
        {
          "id": "a",
          "label": "Porque prompts, respostas e traces podem acumular dados sensíveis inesperadamente."
        },
        {
          "id": "b",
          "label": "Porque logs não ajudam em debugging."
        },
        {
          "id": "c",
          "label": "Porque modelos nunca usam logs."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Observabilidade mal desenhada pode virar uma grande superfície de vazamento."
    },
    {
      "id": "q3",
      "prompt": "O que minimização de dados tenta fazer?",
      "options": [
        {
          "id": "a",
          "label": "Coletar e reter apenas o necessário para o propósito definido."
        },
        {
          "id": "b",
          "label": "Guardar tudo e decidir depois o que remover."
        },
        {
          "id": "c",
          "label": "Remover todo dado de produção, sempre."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Minimização reduz risco estrutural sem inviabilizar o sistema."
    },
    {
      "id": "q4",
      "prompt": "Qual risco de privacidade é específico de IA generativa?",
      "options": [
        {
          "id": "a",
          "label": "O modelo poder memorizar, inferir ou reconstruir informações sensíveis."
        },
        {
          "id": "b",
          "label": "A existência de checkpoints em disco, sem mais nada."
        },
        {
          "id": "c",
          "label": "O uso de JSON no backend."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Memorization e inferência sensível ampliam o problema além de vazamentos literais."
    },
    {
      "id": "q5",
      "prompt": "Redaction resolve tudo sozinha?",
      "options": [
        {
          "id": "a",
          "label": "Não; ela ajuda, mas precisa ser acompanhada de governança, acesso e retenção adequados."
        },
        {
          "id": "b",
          "label": "Sim, porque qualquer dado mascarado deixa de ser risco automaticamente."
        },
        {
          "id": "c",
          "label": "Sim, desde que haja dashboard."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Privacidade é multicamada: redigir sem rever pipeline, acesso e vendors deixa lacunas relevantes."
    },
    {
      "id": "q6",
      "prompt": "O que uma retention policy faz?",
      "options": [
        {
          "id": "a",
          "label": "Define quanto tempo dados ficam armazenados e quando devem ser descartados."
        },
        {
          "id": "b",
          "label": "Treina o modelo em tempo real."
        },
        {
          "id": "c",
          "label": "Substitui criptografia por padrão."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Tempo de retenção é parte essencial do controle de exposição."
    },
    {
      "id": "q7",
      "prompt": "Por que access control importa tanto quanto de-identification?",
      "options": [
        {
          "id": "a",
          "label": "Porque dados ainda acessíveis demais continuam expostos, mesmo com algumas transformações."
        },
        {
          "id": "b",
          "label": "Porque controle de acesso só importa em bancos tradicionais."
        },
        {
          "id": "c",
          "label": "Porque de-identification torna qualquer usuário confiável."
        }
      ],
      "correctOptionId": "a",
      "feedback": "Privacidade depende de reduzir tanto a quantidade de dado quanto o alcance de quem pode vê-lo."
    },
    {
      "id": "q8",
      "prompt": "Qual postura é mais madura?",
      "options": [
        {
          "id": "a",
          "label": "Tratar privacidade como filtro opcional no final do projeto."
        },
        {
          "id": "b",
          "label": "Projetar coleta, retenção, observabilidade e acesso já considerando o risco de PII."
        },
        {
          "id": "c",
          "label": "Registrar tudo e limpar se alguém reclamar."
        }
      ],
      "correctOptionId": "b",
      "feedback": "Privacidade por desenho reduz risco antes que ele se espalhe pelo pipeline."
    }
  ],
  "glossary": [
    {
      "term": "PII",
      "definition": "Personally identifiable information: dados que identificam ou podem identificar uma pessoa, direta ou indiretamente."
    },
    {
      "term": "Dados sensíveis",
      "definition": "Informações cujo uso, exposição ou inferência pode causar dano relevante ao indivíduo ou grupo."
    },
    {
      "term": "Minimização de dados",
      "definition": "Princípio de coletar e reter apenas o que é necessário para um propósito legítimo definido."
    },
    {
      "term": "Purpose limitation",
      "definition": "Limitação de uso dos dados ao propósito para o qual foram coletados e justificados."
    },
    {
      "term": "Redaction",
      "definition": "Remoção ou mascaramento de trechos sensíveis antes de armazenamento, observação ou compartilhamento."
    },
    {
      "term": "De-identification",
      "definition": "Transformação de dados para reduzir ou remover identificabilidade direta."
    },
    {
      "term": "Memorization",
      "definition": "Fenômeno em que o modelo retém ou reproduz conteúdo específico do treinamento."
    },
    {
      "term": "Access control",
      "definition": "Conjunto de mecanismos que limita quem pode ler, modificar ou exportar dados."
    },
    {
      "term": "Retention policy",
      "definition": "Política que define por quanto tempo dados ficam armazenados e quando devem ser descartados."
    },
    {
      "term": "Observability exhaust",
      "definition": "Resíduos operacionais como logs, traces e métricas que podem carregar dados sensíveis."
    }
  ]
};
