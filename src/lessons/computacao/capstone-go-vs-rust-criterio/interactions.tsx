import type { LessonModule } from "../../../types/content";
import { createComputacaoInteractions } from "../_shared/factories";

const interactionConfig = {
  title: "Capstone: Mesma Tarefa em Go e Rust",
  pipelineSteps: [
    {
      name: "Congelar workload e meta",
      summary:
        "Defina a mesma tarefa, a mesma entrada e o mesmo conceito de vitória antes de discutir linguagem.",
      signal: "critério explícito",
      risk: "mudar a pergunta no meio",
      takeaway:
        "A comparação só é justa quando workload e meta permanecem estáveis.",
    },
    {
      name: "Instrumentar de forma comparável",
      summary:
        "Use as ferramentas adequadas de cada ecossistema, mas faça perguntas equivalentes sobre CPU, memória, bloqueio, cauda e operação.",
      signal: "profiles equivalentes",
      risk: "comparar opacidade com transparência",
      takeaway:
        "Ferramentas podem ser diferentes; a anatomia observada precisa ser comparável.",
    },
    {
      name: "Ler custo total",
      summary:
        "Observe latência, memória, complexidade, runtime, operação e encaixe do time como um sistema único de decisão.",
      signal: "trade-offs declarados",
      risk: "eleger um único número",
      takeaway:
        "Linguagem é estratégia de risco, não corrida de microbenchmark.",
    },
    {
      name: "Escolher linguagem ou fronteira",
      summary:
        "Decida se o workload pede Go, Rust ou separação híbrida entre núcleo crítico e bordas de serviço.",
      signal: "fronteira defendável",
      risk: "vencedor universal",
      takeaway:
        "Em muitos casos, a melhor resposta é escolher por módulo e não por identidade total.",
    },
  ],
  leftLabel: "simplicidade operacional",
  rightLabel: "controle fino do runtime",
  tradeoffSummary:
    "Go costuma oferecer uma combinação muito forte de produtividade, tooling e operação pragmática para serviços concorrentes. Rust costuma cobrar mais modelagem, mas pode devolver maior controle sobre memória, layout, alocação e previsibilidade em componentes sensíveis. O ponto ótimo depende do tipo de risco que domina o workload e da capacidade do time de sustentar a escolha.",
  tradeoffRisks: [
    "Buscar simplicidade total pode mascarar que a carga já não suporta bem certos custos de memória ou cauda.",
    "Um equilíbrio conservador costuma aceitar que velocidade de time e diagnóstico também valem performance total do sistema.",
    "Avançar para mais controle runtime pode reduzir ambiguidade estrutural, mas cobra curva cognitiva e maior custo de implementação.",
    "Levar o extremo técnico longe demais pode gerar solução difícil de revisar, operar e evoluir para o contexto organizacional real.",
  ],
  practiceRule:
    "Escolha pelo risco dominante: Go tende a ganhar em velocidade organizacional e operação de serviços; Rust ganha força quando previsibilidade, controle e fronteiras seguras do núcleo crítico passam a dominar.",
  scenarios: [
    {
      name: "API interna de ingestão",
      situation:
        "O sistema é majoritariamente I/O-bound, precisa integrar serviços, operar com observabilidade muito prática e ser mantido por um time amplo de backend.",
      choice:
        "Comece a avaliação com forte viés para Go e valide se o custo runtime cabe confortavelmente nas metas do serviço.",
      why:
        "Nesse contexto, tooling operacional, simplicidade estrutural e velocidade sustentável de entrega costumam pesar muito.",
      caution:
        "Se um trecho pequeno concentrar o verdadeiro risco de memória ou cauda, talvez ele mereça tratamento separado em vez de um veredito global.",
    },
    {
      name: "Núcleo crítico de parsing",
      situation:
        "O workload concentra custo em parsing, buffers e previsibilidade de latência, e o componente ficará no caminho mais sensível do sistema.",
      choice:
        "Rust passa a merecer avaliação preferencial, principalmente se controle de memória e fronteiras seguras forem mais valiosos que a ergonomia inicial.",
      why:
        "Ownership e ausência de GC no caminho central podem favorecer um desenho mais previsível nesse tipo de componente.",
      caution:
        "Se a maior dor organizacional for velocidade de equipe e o ganho real do núcleo for modesto, o custo extra pode não se pagar em escala do produto.",
    },
    {
      name: "Plataforma com tensões mistas",
      situation:
        "Uma pequena parte do sistema é extremamente sensível a recursos, mas a maior parte é serviço, integração, observabilidade e automação.",
      choice:
        "Avalie fronteira híbrida: núcleo crítico em Rust e bordas de serviço e operação em Go.",
      why:
        "Essa divisão permite encaixar cada linguagem onde seu modelo reduz mais risco no custo total do sistema.",
      caution:
        "Híbrido só funciona bem quando a interface entre as partes é pequena, observável e estável o bastante para não virar uma nova fonte de atrito.",
    },
  ],
};

export const interactions =
  createComputacaoInteractions(interactionConfig) satisfies LessonModule["interactions"];
