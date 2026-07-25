import type { LessonModule } from "../../../types/content";
import { createComputacaoInteractions } from "../_shared/factories";

const interactionConfig = {
  "title": "Mindset de Undefined Behavior",
  "pipelineSteps": [
    {
      "name": "Declarar a promessa",
      "summary": "Toda manipulação de baixo nível parte de uma invariante que torna o acesso válido.",
      "signal": "contrato explícito",
      "risk": "suposição implícita",
      "takeaway": "Se a promessa não está clara, a prova já começou frágil."
    },
    {
      "name": "Manipular sem quebrar",
      "summary": "Raw pointers, conversões e inicialização manual devem preservar validade, alinhamento e aliasing compatíveis.",
      "signal": "escopo unsafe",
      "risk": "UB silenciosa",
      "takeaway": "Unsafe é onde mais importa ser preciso, não onde dá para ser vago."
    },
    {
      "name": "Fechar a fronteira",
      "summary": "Concentre a complexidade e exponha uma API segura para o restante do sistema.",
      "signal": "encapsulamento",
      "risk": "invariante espalhada",
      "takeaway": "Quanto menos lugares souberem do detalhe perigoso, melhor."
    },
    {
      "name": "Revalidar continuamente",
      "summary": "Ferramentas, revisão e testes especializados ajudam a confirmar que a prova continua válida com a evolução do código.",
      "signal": "auditoria constante",
      "risk": "funcionou ontem",
      "takeaway": "Invariantes precisam sobreviver a mudanças de código e de compilação, não só a um experimento local."
    }
  ],
  "leftLabel": "intuição sem contrato",
  "rightLabel": "invariantes explícitas",
  "tradeoffSummary": "Quanto mais baixo nível e manual o trecho, mais importante fica explicitar o que torna aquele acesso válido. Unsafe não é um atalho para ignorar regras; é um pedido para assumi-las conscientemente. O ganho de desempenho ou flexibilidade só vale quando o contrato continua provável e auditável.",
  "tradeoffRisks": [
    "Confiar em intuição e testes locais costuma mascarar violações de invariantes difíceis de ver.",
    "Uma fronteira unsafe pequena e bem documentada já captura muito do poder com menos risco.",
    "Manipulação manual pode render estruturas e APIs eficientes quando a prova está sob controle.",
    "Espalhar raw pointers e invariantes implícitas por todo o código transforma manutenção em loteria semântica."
  ],
  "practiceRule": "trate todo unsafe como obrigação de prova: declare a invariante, minimize o escopo e exponha uma borda segura para o restante do sistema",
  "scenarios": [
    {
      "name": "Wrapper FFI",
      "situation": "Uma biblioteca segura precisa expor uma interface confiável sobre ponteiros crus vindos de C.",
      "choice": "Concentrar a validação e a conversão em uma fronteira pequena, com contratos explícitos.",
      "why": "A superfície segura deve impedir que invariantes frágeis se espalhem pelo resto do código.",
      "caution": "Não exponha referências ou slices sem provar validade, alinhamento e lifetime suficientes."
    },
    {
      "name": "Container customizado",
      "situation": "Uma estrutura própria manipula capacidade, crescimento e ponteiros internamente.",
      "choice": "Usar tipos como MaybeUninit e manter regras locais claras para inicialização e aliasing.",
      "why": "O problema principal não é só alocar, mas saber em que momento o dado já é válido para a API segura.",
      "caution": "Evite transformar detalhes internos de representação em pressupostos implícitos para os chamadores."
    },
    {
      "name": "Micro-otimização tentadora",
      "situation": "Um trecho unsafe promete pular checagens ou cópias em um caminho quente.",
      "choice": "Exigir prova explícita de invariantes e medir se o ganho real compensa o risco extra.",
      "why": "Unsafe sem benefício mensurável vira dívida semântica desnecessária.",
      "caution": "Não aceite 'parece melhor' como critério suficiente para expandir a superfície de UB potencial."
    }
  ]
};

export const interactions = createComputacaoInteractions(interactionConfig) satisfies LessonModule["interactions"];
