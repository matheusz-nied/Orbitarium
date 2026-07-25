import type { LessonModule } from "../../../types/content";
import { buildComputacaoVisuals } from "../shared/lessonFactory";

export const visuals = buildComputacaoVisuals({
  "hero": {
    "id": "auth-hero",
    "title": "Autenticação e Autorização",
    "subtitle": "Identidade primeiro, permissão depois",
    "chips": [
      "AuthN",
      "AuthZ",
      "sessão",
      "JWT",
      "least privilege"
    ]
  },
  "map": {
    "id": "auth-mapa",
    "title": "Autenticar abre a conversa; autorizar decide a ação",
    "items": [
      {
        "label": "Identidade",
        "detail": "quem é?"
      },
      {
        "label": "Prova",
        "detail": "como sabe?"
      },
      {
        "label": "Sessão",
        "detail": "como continua?"
      },
      {
        "label": "Política",
        "detail": "o que pode?"
      },
      {
        "label": "Recurso",
        "detail": "acesso final"
      }
    ],
    "caption": "misturar identidade e permissão é fonte clássica de falha de segurança"
  },
  "summary": {
    "id": "auth-resumo",
    "title": "Três perguntas para cada rota sensível",
    "panels": [
      {
        "label": "Quem está chamando?",
        "body": "A identidade foi realmente estabelecida com o grau certo de confiança?"
      },
      {
        "label": "Em nome de quem?",
        "body": "Há delegação, tenant ou contexto especial mudando a decisão?"
      },
      {
        "label": "Por que isso é permitido?",
        "body": "A política está explícita, testável e registrada?"
      }
    ],
    "footer": "segurança robusta depende de identidade, política e localização correta da checagem"
  }
}) satisfies LessonModule["visuals"];
