import { createComputacaoInteractions } from "../_shared/factories";

export const interactions = createComputacaoInteractions({
  title: "Collections e Alocação",
  pipelineSteps: [
    {
      name: "Escolher coleção",
      summary:
        "A decisão inicial já define muita coisa: tamanho fixo ou variável, posse ou borrow, acesso linear ou associação por chave.",
      signal: "semântica necessária",
      risk: "escolher Vec ou String por reflexo",
      takeaway:
        "A melhor coleção é a que expressa a menor quantidade de poder necessária para o problema.",
    },
    {
      name: "Reservar espaço",
      summary:
        "Em buffers dinâmicos, capacidade importa. Reservar cedo quando o volume já é conhecido pode evitar crescimento incremental caro.",
      signal: "volume esperado",
      risk: "realocações repetidas",
      takeaway:
        "Tamanho atual e capacidade futura são perguntas diferentes e ambas importam.",
    },
    {
      name: "Inserir e crescer",
      summary:
        "Push, append e concatenações podem exigir mover ou copiar dados quando o buffer precisa se expandir.",
      signal: "crescimento do buffer",
      risk: "cópia implícita em laços quentes",
      takeaway:
        "Grandes custos de coleção costumam aparecer na política de crescimento, não apenas nas operações lógicas.",
    },
    {
      name: "Reusar ou clonar",
      summary:
        "Depois de construir os dados, a arquitetura decide se reaproveita buffers e empresta vistas ou se duplica conteúdo em novas estruturas.",
      signal: "pressão de alocação",
      risk: "clone automático de containers grandes",
      takeaway:
        "Ownership e capacidade precisam ser pensados junto com a escolha da coleção.",
    },
  ],
  leftLabel: "alocar sempre",
  rightLabel: "reusar buffers",
  tradeoffSummary:
    "Criar containers novos a cada etapa simplifica o fluxo local; reservar e reaproveitar buffers pode reduzir bastante alocação em caminhos repetitivos.",
  tradeoffRisks: [
    "Alocar sempre pode multiplicar realocações e cópias de dados em cargas repetitivas.",
    "Um ponto intermediário costuma equilibrar clareza e custo quando a pressão ainda não é extrema.",
    "Reusar buffers exige mais disciplina sobre estado e limpeza entre etapas.",
    "Buscar controle máximo cedo demais pode complicar código que nem está em caminho crítico.",
  ],
  practiceRule:
    "Se o pipeline é quente e volumoso, considere capacidade e reuso. Se o caminho é raro, simplicidade pode ser a melhor otimização.",
  scenarios: [
    {
      name: "API de leitura de texto",
      situation:
        "Uma função só precisa inspecionar um texto recebido e extrair informações sem armazená-lo depois.",
      choice: "Aceitar &str em vez de String.",
      why: "A interface fica mais flexível e evita exigir posse ou cópia do buffer do chamador.",
      caution:
        "Se a função precisar guardar o texto para uso posterior, será necessário possuir dados em algum ponto.",
    },
    {
      name: "Batch com tamanho conhecido",
      situation:
        "Você vai acumular milhares de itens e já conhece uma estimativa boa do volume antes de começar.",
      choice: "Criar Vec com capacidade reservada.",
      why: "Antecipar espaço ajuda a reduzir realocações e movimentações do conteúdo.",
      caution:
        "Reservar demais também é uma decisão; vale alinhar a estimativa à realidade do uso.",
    },
    {
      name: "Índice por chave",
      situation:
        "Um componente precisa consultar valores repetidamente por identificador textual ao longo da vida da aplicação.",
      choice: "Armazenar dados em HashMap possuído e consultar por borrowing quando possível.",
      why: "O mapa assume ownership do que precisa manter e ainda permite lookups sem cópia em muitos casos.",
      caution:
        "Se as chaves ou valores forem grandes, clones de construção e atualização merecem atenção especial.",
    },
  ],
});
