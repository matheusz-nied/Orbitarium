import type { LessonModule } from "../../../types/content";
import { createComputacaoInteractions } from "../_shared/factories";

const interactionConfig = {
  "title": "Branch Prediction e Código Quente",
  "pipelineSteps": [
    {
      "name": "Predizer o caminho",
      "summary": "O hardware aposta no ramo provável para manter o front-end alimentado.",
      "signal": "histórico do branch",
      "risk": "escolher trilha ruim",
      "takeaway": "Prediction existe para não deixar o pipeline esperando a decisão final."
    },
    {
      "name": "Executar especulativamente",
      "summary": "Instruções do caminho previsto são buscadas e preparadas antes da confirmação total.",
      "signal": "front-end ocupado",
      "risk": "trabalho descartado",
      "takeaway": "O acerto acelera; o erro cobra refazer rota."
    },
    {
      "name": "Confirmar e corrigir",
      "summary": "A condição real valida a aposta ou força redirecionamento e flush parcial.",
      "signal": "taxa de acerto",
      "risk": "mispredicts frequentes",
      "takeaway": "Quanto mais imprevisível e quente o branch, mais esse custo aparece."
    },
    {
      "name": "Moldar dados e caminho quente",
      "summary": "Organização de código e distribuição dos dados ajudam a CPU a apostar melhor.",
      "signal": "fast path curto",
      "risk": "branchless indiscriminado",
      "takeaway": "A otimização robusta costuma mexer na forma do fluxo, não só no operador da condição."
    }
  ],
  "leftLabel": "lógica com muitos ramos",
  "rightLabel": "fluxo quente previsível",
  "tradeoffSummary": "Branches previsíveis convivem muito bem com desempenho. O problema real está no branch extremamente frequente e imprevisível. Nessas horas, separar caminhos raros, reorganizar dados ou aplicar branchless seletivo pode ajudar — desde que a técnica reduza o custo total em vez de só trocar um estilo por outro.",
  "tradeoffRisks": [
    "Código cheio de ramos no hot path pode sofrer quando a distribuição dos dados é ruidosa.",
    "Fast path claro e cold path deslocado costumam entregar bons ganhos com baixo custo de manutenção.",
    "Branchless seletivo pode render em kernels críticos e realmente imprevisíveis.",
    "Forçar branchless em qualquer lugar pode aumentar trabalho, registros e complexidade sem retorno suficiente."
  ],
  "practiceRule": "se o branch quente depende de dados barulhentos, tente primeiro tornar o caso comum explícito ou reorganizar os dados antes de perseguir branchless agressivo",
  "scenarios": [
    {
      "name": "Filtro 50/50",
      "situation": "Um loop quente testa uma condição cuja distribuição é quase aleatória e metade dos itens vai para cada lado.",
      "choice": "Avaliar se branchless seletivo ou reorganização dos dados reduz mispredict no hot path.",
      "why": "A previsibilidade do branch é ruim, então o custo especulativo aparece com mais força.",
      "caution": "Se o trabalho alternativo for pesado, branchless pode fazer mais mal do que bem."
    },
    {
      "name": "Erros raros",
      "situation": "O caminho de sucesso domina e falhas são de fato excepcionais.",
      "choice": "Manter fast path compacto e deslocar tratamento raro para um cold path bem separado.",
      "why": "Isso favorece tanto predictor quanto front-end e legibilidade do caminho principal.",
      "caution": "Não suponha raridade; valide com métricas reais da aplicação."
    },
    {
      "name": "Dados particionáveis",
      "situation": "Os itens podem ser reorganizados para agrupar casos semelhantes antes do processamento.",
      "choice": "Considerar particionar ou ordenar para tornar o branch mais previsível.",
      "why": "Às vezes mudar os dados é mais poderoso do que mudar a forma do if.",
      "caution": "A reordenação também tem custo; vale apenas se o hot path realmente ganha com isso."
    }
  ]
};

export const interactions = createComputacaoInteractions(interactionConfig) satisfies LessonModule["interactions"];
