import type { LessonModule } from "../../../types/content";
import { createComputacaoInteractions } from "../_shared/factories";

const interactionConfig = {
  "title": "Segurança de Memória",
  "pipelineSteps": [
    {
      "name": "Alocação",
      "summary": "Uma região é reservada e passa a ter dono, tamanho e tempo de vida esperados.",
      "signal": "ownership",
      "risk": "uso sem contrato claro",
      "takeaway": "Sem contrato de posse, o bug começa cedo."
    },
    {
      "name": "Acesso",
      "summary": "Leituras e escritas precisam respeitar limites e sincronização.",
      "signal": "bounds",
      "risk": "overflow ou race",
      "takeaway": "Acesso correto é parte da semântica, não detalhe."
    },
    {
      "name": "Liberação ou reutilização",
      "summary": "A memória deixa de pertencer ao objeto e pode ser reaproveitada.",
      "signal": "fim do lifetime",
      "risk": "use after free",
      "takeaway": "Um ponteiro válido ontem pode ser lixo hoje."
    },
    {
      "name": "Detecção e mitigação",
      "summary": "Sanitizers, checks, ASLR e isolamento ajudam a conter ou revelar falhas.",
      "signal": "crash ou relatório",
      "risk": "achar que mitigação substitui design seguro",
      "takeaway": "Ferramenta boa ajuda, mas não anula o modelo mental."
    }
  ],
  "leftLabel": "controle manual e performance",
  "rightLabel": "garantias automáticas e isolamento",
  "tradeoffSummary": "Quanto mais controle manual você assume, maior fica o ônus de provar bounds e lifetime. Garantias automáticas e sandboxes reduzem essa carga, mas exigem arquitetura, toolchain e eventualmente mudanças de linguagem.",
  "tradeoffRisks": [
    "Máxima flexibilidade, com grande superfície para corrupção e bugs difíceis de provar.",
    "Equilíbrio entre desempenho e segurança, desde que a disciplina e as ferramentas sejam fortes.",
    "Menor superfície de erro, com exigência maior de arquitetura e integração entre linguagens.",
    "Otimizar demais o hot path ignorando ownership quase sempre reabre riscos graves."
  ],
  "practiceRule": "reduza superfícies unsafe, use sanitizers e prefira APIs ou linguagens que expressem ownership explicitamente",
  "scenarios": [
    {
      "name": "Parser de upload",
      "situation": "Um serviço recebe formatos complexos de usuários desconhecidos.",
      "choice": "Conter parsing em camadas mais seguras, usar limites explícitos e instrumentação de sanitizers.",
      "why": "Input hostil pressiona exatamente as classes clássicas de bug de memória.",
      "caution": "Biblioteca madura também precisa de sandbox e atualização."
    },
    {
      "name": "FFI com legado",
      "situation": "Um projeto moderno depende de uma biblioteca legada em C ou C++.",
      "choice": "Isolar a fronteira unsafe, documentar ownership e reduzir a área que cruza a FFI.",
      "why": "O risco não some; ele precisa de fronteiras claras.",
      "caution": "Copiar ponteiros entre mundos sem contrato é convite a UAF."
    },
    {
      "name": "Serviço de longa duração",
      "situation": "Um processo fica meses no ar e lida com carga variável.",
      "choice": "Usar observabilidade, fuzzing e sanitizers em ambientes adequados para pegar bugs antes da produção.",
      "why": "Bugs raros tendem a aparecer sob tempo e diversidade de input.",
      "caution": "Esperar o incidente em produção como forma de teste é caro e perigoso."
    }
  ]
};

export const interactions = createComputacaoInteractions(interactionConfig) satisfies LessonModule["interactions"];
