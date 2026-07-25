import type { LessonModule } from "../../../types/content";
import { createComputacaoInteractions } from "../_shared/factories";

const interactionConfig = {
  "title": "Sistema de Arquivos",
  "pipelineSteps": [
    {
      "name": "Path lookup",
      "summary": "O kernel percorre diretórios para transformar um nome em uma identidade interna.",
      "signal": "latência de lookup",
      "risk": "resolver caminho errado",
      "takeaway": "Nome não é o dado; é a rota até ele."
    },
    {
      "name": "Metadados e inode",
      "summary": "O inode concentra tipo, tamanho, permissões e ponteiros ou mapas para dados.",
      "signal": "cache de metadados",
      "risk": "confundir nome com inode",
      "takeaway": "Metadado também é dado crítico."
    },
    {
      "name": "Page cache e journal",
      "summary": "Escritas costumam entrar primeiro em cache e em estruturas de recuperação.",
      "signal": "dirty pages",
      "risk": "achar que write já persistiu",
      "takeaway": "Persistir é diferente de aceitar no kernel."
    },
    {
      "name": "Flush e recuperação",
      "summary": "O sistema decide quando forçar o dispositivo e como se recuperar de quedas.",
      "signal": "fsync e replay",
      "risk": "corrupção lógica",
      "takeaway": "Recuperação é parte do desenho do sistema de arquivos."
    }
  ],
  "leftLabel": "layout simples e direto",
  "rightLabel": "recuperação, cache e recursos extras",
  "tradeoffSummary": "A estrutura mínima é fácil de entender, mas sistemas reais adicionam cache, journal e metadados ricos para tolerar falhas e concorrência com custo adicional no caminho de escrita.",
  "tradeoffRisks": [
    "Pouca tolerância a falhas complexas e menos recursos operacionais.",
    "Boa legibilidade, mas ainda com dependência de disciplina explícita do software.",
    "Mais proteção e desempenho percebido, com caminho interno mais complexo.",
    "Recursos demais sem compreensão clara tornam debugging e tuning mais difíceis."
  ],
  "practiceRule": "separe mentalmente nome, inode, cache e persistência física ao depurar I/O",
  "scenarios": [
    {
      "name": "Gravação crítica",
      "situation": "Um programa precisa garantir que um arquivo exista de forma consistente após um commit local.",
      "choice": "Usar operação atômica compatível com o caso e forçar persistência quando a semântica realmente exigir.",
      "why": "Nem todo write implica durabilidade imediata; a política precisa ser explícita.",
      "caution": "fsync em excesso também custa desempenho."
    },
    {
      "name": "Milhares de arquivos pequenos",
      "situation": "Uma aplicação cria muitos arquivos minúsculos e sofre com latência de metadata.",
      "choice": "Observar o custo de diretórios, metadados e cache antes de culpar apenas o dispositivo.",
      "why": "O gargalo pode estar no próprio padrão de acesso lógico.",
      "caution": "Pequenos arquivos amplificam overhead por objeto."
    },
    {
      "name": "Queda inesperada",
      "situation": "A máquina desliga no meio de atualizações de dados e nomes.",
      "choice": "Confiar em mecanismos de journal e operações pensadas para recuperação, em vez de assumir escrita instantânea in-place.",
      "why": "Recuperação é exatamente o que o sistema de arquivos tenta fornecer.",
      "caution": "Nem toda combinação de operações é automaticamente atômica para a aplicação."
    }
  ]
};

export const interactions = createComputacaoInteractions(interactionConfig) satisfies LessonModule["interactions"];
