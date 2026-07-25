import type { LessonModule } from "../../../types/content";
import { createComputacaoVisuals } from "../_shared/factories";

const visualConfig = {
  "title": "Linux na Prática: Permissões e Processos",
  "subtitle": "Usuários, grupos, modos, PIDs, sinais e exec: como o modelo operacional do Linux realmente organiza acesso e execução.",
  "level": "Intermediário",
  "tags": [
    "Linux",
    "Permissões",
    "Processos",
    "Signals",
    "fork",
    "exec"
  ],
  "conceptNodes": [
    "Owner",
    "Group",
    "chmod",
    "chown"
  ],
  "pipelineSteps": [
    "Contexto de usuário",
    "fork e exec",
    "Execução e inspeção",
    "Sinais e término"
  ],
  "leftLabel": "conveniência operacional",
  "rightLabel": "princípio do menor privilégio",
  "impactRows": [
    {
      "label": "Unidade crítica",
      "value": "o inode com seus bits de permissão e o processo identificado por PID"
    },
    {
      "label": "Primeira etapa",
      "value": "Contexto de usuário"
    },
    {
      "label": "Erro comum",
      "value": "usar root ou permissões abertas como solução padrão em vez de entender dono, grupo e processo"
    },
    {
      "label": "Eixo de projeto",
      "value": "conveniência operacional ↔ princípio do menor privilégio"
    }
  ]
};

export const visuals = createComputacaoVisuals(visualConfig) satisfies LessonModule["visuals"];
