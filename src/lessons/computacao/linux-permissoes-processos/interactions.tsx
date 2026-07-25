import type { LessonModule } from "../../../types/content";
import { createComputacaoInteractions } from "../_shared/factories";

const interactionConfig = {
  "title": "Linux na Prática: Permissões e Processos",
  "pipelineSteps": [
    {
      "name": "Contexto de usuário",
      "summary": "Arquivos e processos operam sob uma identidade e grupos associados.",
      "signal": "uid gid",
      "risk": "acesso acidental excessivo",
      "takeaway": "Quem executa importa tanto quanto o que executa."
    },
    {
      "name": "fork e exec",
      "summary": "Um processo cria outro e, se necessário, troca sua imagem por um novo programa.",
      "signal": "pid ppid",
      "risk": "achar que tudo é o mesmo processo",
      "takeaway": "Criar e substituir são operações distintas."
    },
    {
      "name": "Execução e inspeção",
      "summary": "O processo roda, consome recursos e pode ser observado por ps, top ou ferramentas afins.",
      "signal": "state cpu mem",
      "risk": "agir sem inspeção",
      "takeaway": "Entender o estado evita matar o alvo errado."
    },
    {
      "name": "Sinais e término",
      "summary": "Sinais pedem cooperação ou forçam encerramento conforme o caso.",
      "signal": "TERM KILL",
      "risk": "usar KILL cedo demais",
      "takeaway": "Encerrar com cuidado preserva limpeza e consistência."
    }
  ],
  "leftLabel": "conveniência operacional",
  "rightLabel": "princípio do menor privilégio",
  "tradeoffSummary": "Dar acesso demais costuma reduzir atrito no curto prazo, mas destrói isolamento, auditabilidade e segurança quando o sistema cresce ou passa a ser compartilhado.",
  "tradeoffRisks": [
    "Pouco atrito imediato, mas grande risco de exposição e bagunça operacional.",
    "Boa experiência com defaults razoáveis e responsabilidades claras.",
    "Maior proteção e rastreabilidade, com mais disciplina de configuração.",
    "Bloqueio excessivo sem documentação também atrapalha fluxo e manutenção."
  ],
  "practiceRule": "inspecione owner, mode, árvore de processos e sinais antes de mudar estado com força bruta",
  "scenarios": [
    {
      "name": "Script não executa",
      "situation": "Um arquivo está no diretório correto, mas o shell não consegue executá-lo.",
      "choice": "Conferir bits de permissão, dono e forma de invocação antes de mudar tudo para permissivo.",
      "why": "O problema costuma ser semântico, não místico.",
      "caution": "Abrir permissões sem entender o caso cria risco maior do que o bug original."
    },
    {
      "name": "Processo runaway",
      "situation": "Um job consome CPU demais e precisa ser interrompido.",
      "choice": "Inspecionar o PID e enviar sinais graduais, começando por TERM quando possível.",
      "why": "Processos às vezes precisam de chance para fechar recursos e sair limpos.",
      "caution": "KILL resolve rápido, mas corta limpeza e pode esconder a causa."
    },
    {
      "name": "Pasta compartilhada",
      "situation": "Vários usuários precisam colaborar sobre um conjunto de arquivos.",
      "choice": "Ajustar owner, group e modos de forma explícita, em vez de recorrer a permissões globais.",
      "why": "O modelo de grupos existe justamente para esse tipo de colaboração controlada.",
      "caution": "Permissividade exagerada vira dívida de segurança."
    }
  ]
};

export const interactions = createComputacaoInteractions(interactionConfig) satisfies LessonModule["interactions"];
