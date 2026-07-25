import type { LessonModule } from "../../../types/content";
import { buildComputacaoVisuals } from "../shared/lessonFactory";

export const visuals = buildComputacaoVisuals({
  "hero": {
    "id": "isa-hero",
    "title": "ISA: x86, ARM e RISC-V",
    "subtitle": "O contrato que conecta software e hardware",
    "chips": [
      "registradores",
      "instruções",
      "ABI",
      "microarquitetura",
      "portabilidade"
    ]
  },
  "map": {
    "id": "isa-mapa",
    "title": "Onde a ISA fica na pilha conceitual",
    "items": [
      {
        "label": "Programa",
        "detail": "intenção"
      },
      {
        "label": "Compilador",
        "detail": "tradução"
      },
      {
        "label": "ISA",
        "detail": "contrato"
      },
      {
        "label": "CPU",
        "detail": "implementação"
      },
      {
        "label": "Resultado",
        "detail": "execução"
      }
    ],
    "caption": "o software vê a ISA; o hardware por baixo pode mudar bastante"
  },
  "summary": {
    "id": "isa-resumo",
    "title": "O que o programador realmente precisa guardar",
    "panels": [
      {
        "label": "Contrato",
        "body": "A ISA define o que o software pode pedir e assumir."
      },
      {
        "label": "Ecossistema",
        "body": "ABI, toolchains e sistemas operacionais fazem a compatibilidade acontecer."
      },
      {
        "label": "Trade-off",
        "body": "Mais tuning por alvo quase sempre implica menos portabilidade."
      }
    ],
    "footer": "saber onde termina a interface e começa a implementação evita muitas confusões"
  }
}) satisfies LessonModule["visuals"];
