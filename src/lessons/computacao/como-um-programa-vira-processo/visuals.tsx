import type { LessonModule } from "../../../types/content";
import { buildComputacaoVisuals } from "../shared/lessonFactory";

export const visuals = buildComputacaoVisuals({
  "hero": {
    "id": "programa-processo-hero",
    "title": "Como um Programa Vira Processo",
    "subtitle": "Do executável ao entry point",
    "chips": [
      "execve",
      "fork",
      "loader",
      "stack inicial",
      "bibliotecas"
    ]
  },
  "map": {
    "id": "programa-processo-mapa",
    "title": "Do arquivo ao processo executando",
    "items": [
      {
        "label": "Binário",
        "detail": "bytes e metadados"
      },
      {
        "label": "Kernel",
        "detail": "valida e cria"
      },
      {
        "label": "Memória",
        "detail": "mapeia regiões"
      },
      {
        "label": "Stack",
        "detail": "args e ambiente"
      },
      {
        "label": "CPU",
        "detail": "salta ao entry point"
      }
    ],
    "caption": "artefato em disco → imagem de memória → controle da CPU"
  },
  "summary": {
    "id": "programa-processo-resumo",
    "title": "Onde depurar quando o processo nem começou direito",
    "panels": [
      {
        "label": "Permissões e formato",
        "body": "Sem executar ou sem formato válido, o processo morre antes da lógica."
      },
      {
        "label": "Dependências de ambiente",
        "body": "Bibliotecas, interpretadores e variáveis interferem no arranque."
      },
      {
        "label": "Medição certa",
        "body": "Procfs, strace e logs de bootstrap mostram a fase correta do problema."
      }
    ],
    "footer": "quando a falha acontece cedo, observe loader, mapeamentos e herança de ambiente"
  }
}) satisfies LessonModule["visuals"];
