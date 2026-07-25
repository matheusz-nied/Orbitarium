import type { LessonModule } from "../../../types/content";
import { createComputacaoInteractions } from "../_shared/factories";

const interactionConfig = {
  "title": "Concorrência em Baixo Nível",
  "pipelineSteps": [
    {
      "name": "Produção local",
      "summary": "Uma thread escreve ou calcula dados em seu contexto de execução.",
      "signal": "write set",
      "risk": "publicar cedo demais",
      "takeaway": "Escrever não implica ser visto corretamente."
    },
    {
      "name": "Publicação sincronizada",
      "summary": "Atomics, locks ou fences estabelecem quando a informação pode ser observada.",
      "signal": "memory order",
      "risk": "sinal sem payload consistente",
      "takeaway": "Sincronizar é definir visibilidade, não só exclusão."
    },
    {
      "name": "Observação remota",
      "summary": "Outra thread lê o sinal e passa a confiar no estado associado.",
      "signal": "read side",
      "risk": "ler velho e novo ao mesmo tempo",
      "takeaway": "Consumidor precisa de sincronização simétrica."
    },
    {
      "name": "Progresso e retry",
      "summary": "Estruturas concorrentes frequentemente repetem tentativas ou disputam atualizações.",
      "signal": "contention",
      "risk": "lock free sem progresso útil",
      "takeaway": "Menos locks não garante sistema melhor."
    }
  ],
  "leftLabel": "simplicidade de raciocínio",
  "rightLabel": "paralelismo e baixa contenção",
  "tradeoffSummary": "Locks e ordens fortes costumam ser mais fáceis de provar, enquanto atomics e caminhos lock-free podem reduzir contenção ao custo de raciocínio muito mais delicado.",
  "tradeoffRisks": [
    "Raciocínio simples, mas potencialmente com mais contenção.",
    "Bom equilíbrio para muitos sistemas quando locks são bem posicionados.",
    "Maior paralelismo, com prova de correção muito mais delicada.",
    "Lock free mal modelado costuma produzir fragilidade cara de depurar."
  ],
  "practiceRule": "prove qual borda de sincronização protege cada leitura importante antes de buscar lock free heroico",
  "scenarios": [
    {
      "name": "Contador compartilhado",
      "situation": "Muitas threads precisam atualizar um contador simples.",
      "choice": "Decidir entre lock simples e atomic fetch add conforme a contenção e a semântica exigidas.",
      "why": "Nem todo problema pede estrutura lock free elaborada.",
      "caution": "O ganho de throughput não compensa se a prova de correção ficar obscura."
    },
    {
      "name": "Ready flag",
      "situation": "Uma thread publica dados e sinaliza que a outra pode consumi-los.",
      "choice": "Usar uma ordem de memória que garanta que os dados ficaram visíveis antes do sinal.",
      "why": "Sem a borda correta, a flag pode chegar antes do conteúdo útil.",
      "caution": "Ver a flag true não garante enxergar os dados certos sem sincronização correspondente."
    },
    {
      "name": "Fila sob disputa",
      "situation": "Uma estrutura lock free enfrenta alta contenção e retries frequentes.",
      "choice": "Medir progresso real e considerar simplificação com locks ou particionamento.",
      "why": "Baixa contenção teórica nem sempre entrega latência melhor na prática.",
      "caution": "CAS em loop também custa CPU e complexidade."
    }
  ]
};

export const interactions = createComputacaoInteractions(interactionConfig) satisfies LessonModule["interactions"];
