import type { LessonModule } from "../../../types/content";
import { buildComputacaoVisuals } from "../shared/lessonFactory";

export const visuals = buildComputacaoVisuals({
  "hero": {
    "id": "tls-hero",
    "title": "TLS e HTTPS",
    "subtitle": "Confiar no par e proteger o canal antes do primeiro byte útil",
    "chips": [
      "handshake",
      "certificados",
      "CA",
      "TLS 1.3",
      "HSTS"
    ]
  },
  "map": {
    "id": "tls-mapa",
    "title": "Do HTTP em claro ao canal autenticado e criptografado",
    "items": [
      {
        "label": "Cliente",
        "detail": "quer falar com um host"
      },
      {
        "label": "Certificado",
        "detail": "quem é o servidor?"
      },
      {
        "label": "Handshake",
        "detail": "combina parâmetros"
      },
      {
        "label": "Chaves",
        "detail": "protegem a sessão"
      },
      {
        "label": "HTTPS",
        "detail": "tráfego útil seguro"
      }
    ],
    "caption": "segurança de transporte protege a conversa, não substitui a segurança da aplicação"
  },
  "summary": {
    "id": "tls-resumo",
    "title": "Três perguntas para auditar um deploy HTTPS",
    "panels": [
      {
        "label": "Estou falando com quem espero?",
        "body": "Certificado, domínio e cadeia de confiança precisam convergir."
      },
      {
        "label": "O canal está bem protegido?",
        "body": "Versões, parâmetros e renovação importam para a proteção real."
      },
      {
        "label": "A operação acompanha isso?",
        "body": "Expiração, erros de handshake e políticas auxiliares precisam ser observados."
      }
    ],
    "footer": "TLS forte combina protocolo moderno com configuração e operação disciplinadas"
  }
}) satisfies LessonModule["visuals"];
