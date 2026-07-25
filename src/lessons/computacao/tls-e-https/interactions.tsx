import type { LessonModule } from "../../../types/content";
import { buildComputacaoInteractions } from "../shared/lessonFactory";

export const interactions = buildComputacaoInteractions({
  "flow": {
    "id": "tls-handshake-lab",
    "eyebrow": "Handshake",
    "title": "Siga a negociação de uma conexão TLS",
    "description": "Veja como identidade, parâmetros e chaves aparecem antes do tráfego útil.",
    "tone": "indigo",
    "icon": "Lock",
    "stages": [
      {
        "label": "Client hello",
        "detail": "O cliente anuncia versões e capacidades compatíveis para iniciar a negociação.",
        "cue": "preferências e aleatoriedade"
      },
      {
        "label": "Server hello",
        "detail": "O servidor escolhe os parâmetros e confirma o caminho criptográfico viável.",
        "cue": "acordo inicial"
      },
      {
        "label": "Certificado",
        "detail": "O servidor apresenta identidade e prova material para o cliente validar a cadeia de confiança.",
        "cue": "quem está do outro lado?"
      },
      {
        "label": "Troca efêmera",
        "detail": "Os lados combinam material para derivar segredos de sessão sem transmitir a chave pronta.",
        "cue": "sigilo futuro"
      },
      {
        "label": "Canal protegido",
        "detail": "Depois da derivação das chaves, o tráfego HTTP passa a circular sob proteção TLS.",
        "cue": "dados úteis com proteção"
      }
    ]
  },
  "compare": {
    "id": "trust-models-lab",
    "eyebrow": "Confiança",
    "title": "Compare três peças do modelo de confiança do HTTPS",
    "description": "Entenda como domínio, certificado e cadeia de confiança colaboram na validação.",
    "tone": "violet",
    "icon": "ShieldCheck",
    "options": [
      {
        "label": "Domínio",
        "headline": "O nome esperado pelo cliente orienta a validação",
        "bullets": [
          "O navegador parte de um host esperado pelo usuário.",
          "A identidade apresentada precisa combinar com esse nome.",
          "Sem essa coerência, o alerta de segurança faz sentido."
        ]
      },
      {
        "label": "Certificado",
        "headline": "A chave pública vem acompanhada de identidade e metadados",
        "bullets": [
          "O certificado sozinho não cria confiança absoluta.",
          "Ele organiza identidade e material criptográfico.",
          "Validade temporal e escopo importam na aceitação."
        ]
      },
      {
        "label": "Cadeia de confiança",
        "headline": "Assinaturas intermediárias conectam o servidor a âncoras conhecidas pelo cliente",
        "bullets": [
          "O cliente verifica se a cadeia apresentada fecha corretamente.",
          "A confiança depende das raízes instaladas localmente.",
          "Essa estrutura viabiliza a web pública em larga escala."
        ]
      }
    ]
  },
  "slider": {
    "id": "crypto-dial-lab",
    "eyebrow": "Maturidade",
    "title": "Ajuste o nível de maturidade de uma implantação TLS",
    "description": "Compare uma implantação só “ligada” com uma postura mais segura e moderna.",
    "tone": "emerald",
    "icon": "BarChart3",
    "axisLabel": "Postura TLS",
    "states": [
      {
        "label": "HTTPS só no nome",
        "summary": "O serviço tem certificado, mas convive com recursos mistos, expiração mal monitorada e parâmetros herdados sem revisão.",
        "leftLabel": "Facilidade inicial",
        "leftValue": 84,
        "rightLabel": "Resiliência real",
        "rightValue": 26,
        "takeaway": "O cadeado aparece, mas a superfície operacional continua frágil e propensa a regressões.",
        "metrics": [
          {
            "label": "Renovação",
            "value": "Manual"
          },
          {
            "label": "Compatibilidade segura",
            "value": "Irregular"
          },
          {
            "label": "Forward secrecy",
            "value": "Incerta"
          },
          {
            "label": "Risco operacional",
            "value": "Alto"
          }
        ]
      },
      {
        "label": "Boa base moderna",
        "summary": "Certificados são renovados com previsibilidade e a configuração acompanha recomendações contemporâneas.",
        "leftLabel": "Facilidade inicial",
        "leftValue": 62,
        "rightLabel": "Resiliência real",
        "rightValue": 76,
        "takeaway": "É o patamar saudável para a maior parte das APIs e aplicações web atuais.",
        "metrics": [
          {
            "label": "Renovação",
            "value": "Automatizada"
          },
          {
            "label": "Compatibilidade segura",
            "value": "Boa"
          },
          {
            "label": "Forward secrecy",
            "value": "Presente"
          },
          {
            "label": "Risco operacional",
            "value": "Moderado"
          }
        ]
      },
      {
        "label": "Operação madura",
        "summary": "A equipe acompanha métricas de handshake, políticas auxiliares e regressões de configuração como parte da confiabilidade do produto.",
        "leftLabel": "Facilidade inicial",
        "leftValue": 34,
        "rightLabel": "Resiliência real",
        "rightValue": 92,
        "takeaway": "Mais disciplina operacional produz menos surpresas em renovação, compatibilidade e segurança de transporte.",
        "metrics": [
          {
            "label": "Renovação",
            "value": "Contínua"
          },
          {
            "label": "Compatibilidade segura",
            "value": "Muito boa"
          },
          {
            "label": "Forward secrecy",
            "value": "Robusta"
          },
          {
            "label": "Risco operacional",
            "value": "Baixo"
          }
        ]
      }
    ]
  }
}) satisfies LessonModule["interactions"];
