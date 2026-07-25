import type { LessonModule } from "../../../types/content";
import { buildComputacaoVisuals } from "../shared/lessonFactory";

export const visuals = buildComputacaoVisuals({
  "hero": {
    "id": "compilador-hero",
    "title": "Como Funciona um Compilador",
    "subtitle": "Várias representações, um binário final",
    "chips": [
      "lexer",
      "parser",
      "AST",
      "IR",
      "backend"
    ]
  },
  "map": {
    "id": "compilador-mapa",
    "title": "O texto vai ficando mais apropriado para máquina",
    "items": [
      {
        "label": "Fonte",
        "detail": "feito para humanos"
      },
      {
        "label": "Tokens",
        "detail": "peças léxicas"
      },
      {
        "label": "AST",
        "detail": "estrutura"
      },
      {
        "label": "IR",
        "detail": "análise"
      },
      {
        "label": "Objeto",
        "detail": "alvo real"
      }
    ],
    "caption": "cada camada elimina ambiguidades e prepara a próxima decisão"
  },
  "summary": {
    "id": "compilador-resumo",
    "title": "Por que os compiladores gostam tanto de camadas",
    "panels": [
      {
        "label": "Mensagens melhores",
        "body": "Cada estágio sabe localizar um tipo diferente de erro."
      },
      {
        "label": "Reuso maior",
        "body": "Frontends e backends podem ser recombinados em toolchains flexíveis."
      },
      {
        "label": "Otimização viável",
        "body": "IRs foram desenhadas para facilitar passes e análises."
      }
    ],
    "footer": "representações certas colocam cada problema na camada onde ele fica mais tratável"
  }
}) satisfies LessonModule["visuals"];
