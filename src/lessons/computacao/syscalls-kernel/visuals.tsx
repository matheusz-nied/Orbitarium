import type { LessonModule } from "../../../types/content";
import { buildComputacaoVisuals } from "../shared/lessonFactory";

export const visuals = buildComputacaoVisuals({
  "hero": {
    "id": "syscalls-hero",
    "title": "Syscalls: Como Programas Conversam com o Kernel",
    "subtitle": "Atravessar a fronteira com segurança e semântica",
    "chips": [
      "user space",
      "kernel space",
      "errno",
      "read/write",
      "mmap"
    ]
  },
  "map": {
    "id": "syscalls-mapa",
    "title": "A conversa oficial com recursos privilegiados",
    "items": [
      {
        "label": "Programa",
        "detail": "pede serviço"
      },
      {
        "label": "Wrapper",
        "detail": "organiza chamada"
      },
      {
        "label": "Trap",
        "detail": "entra no kernel"
      },
      {
        "label": "Subsistema",
        "detail": "faz o trabalho"
      },
      {
        "label": "Retorno",
        "detail": "valor + erro"
      }
    ],
    "caption": "user space → kernel → user space com regras de segurança e semântica"
  },
  "summary": {
    "id": "syscalls-resumo",
    "title": "Três perguntas para qualquer syscall lenta ou estranha",
    "panels": [
      {
        "label": "Quanto cruza?",
        "body": "Muitas chamadas pequenas podem desperdiçar tempo na própria fronteira."
      },
      {
        "label": "O que espera?",
        "body": "O processo pode estar dormindo por I/O e não gastando CPU."
      },
      {
        "label": "Como retorna?",
        "body": "Partial results e códigos de erro fazem parte do contrato."
      }
    ],
    "footer": "desempenho e robustez dependem de entender mecanismo, semântica e granularidade"
  }
}) satisfies LessonModule["visuals"];
