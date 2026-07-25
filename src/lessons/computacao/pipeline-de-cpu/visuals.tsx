import type { LessonModule } from "../../../types/content";
import { buildComputacaoVisuals } from "../shared/lessonFactory";

export const visuals = buildComputacaoVisuals({
  "hero": {
    "id": "pipeline-cpu-hero",
    "title": "Pipeline de CPU",
    "subtitle": "Várias instruções, estágios diferentes, mesma máquina",
    "chips": [
      "IF/ID/EX/MEM/WB",
      "throughput",
      "hazards",
      "forwarding",
      "branches"
    ]
  },
  "map": {
    "id": "pipeline-cpu-mapa",
    "title": "Linha de montagem interna da CPU",
    "items": [
      {
        "label": "Buscar",
        "detail": "IF"
      },
      {
        "label": "Decodificar",
        "detail": "ID"
      },
      {
        "label": "Executar",
        "detail": "EX"
      },
      {
        "label": "Memória",
        "detail": "MEM"
      },
      {
        "label": "Publicar",
        "detail": "WB"
      }
    ],
    "caption": "uma instrução anda para frente enquanto outras ocupam estágios vizinhos"
  },
  "summary": {
    "id": "pipeline-cpu-resumo",
    "title": "Três perguntas para ler o desempenho de um pipeline",
    "panels": [
      {
        "label": "Onde está a dependência?",
        "body": "Descobrir o tipo de hazard orienta a mitigação correta."
      },
      {
        "label": "Quanto o pipeline esvazia?",
        "body": "Bolhas frequentes significam perda direta de throughput."
      },
      {
        "label": "Vale a complexidade?",
        "body": "Nem toda recuperação de desempenho compensa o custo de controle."
      }
    ],
    "footer": "pipeline eficiente é equilíbrio entre sobreposição, correção e custo de mitigação"
  }
}) satisfies LessonModule["visuals"];
