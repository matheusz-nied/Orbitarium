import { createComputacaoInteractions } from "../_shared/factories";

export const interactions = createComputacaoInteractions({
  title: "Tipos, Traits e Zero-Cost",
  pipelineSteps: [
    {
      name: "Modelar tipo",
      summary:
        "O primeiro ganho de performance e confiabilidade muitas vezes vem de um tipo que elimina estados inválidos antes mesmo da lógica rodar.",
      signal: "invariante explícita",
      risk: "domínio modelado com primitivos genéricos demais",
      takeaway:
        "Tipos melhores simplificam validação espalhada e tornam bugs menos representáveis.",
    },
    {
      name: "Definir capacidade",
      summary:
        "Traits entram para descrever o comportamento necessário sem prender a função a um único tipo concreto.",
      signal: "bounds realmente usados",
      risk: "abstração larga demais",
      takeaway:
        "Peça às assinaturas apenas as capacidades de que o algoritmo precisa.",
    },
    {
      name: "Especializar código",
      summary:
        "Genéricos podem ser monomorfizados, permitindo que o compilador enxergue tipos concretos e otimize chamadas e pipelines com agressividade.",
      signal: "tipo conhecido em compilação",
      risk: "assumir custo de runtime sem necessidade",
      takeaway:
        "Muitas abstrações expressivas em Rust cooperam com o otimizador em vez de enfrentá-lo.",
    },
    {
      name: "Medir resultado",
      summary:
        "Depois da modelagem e da composição, ainda é preciso olhar custo real: tamanho de binário, dispatch, alocação e layout de dados continuam importando.",
      signal: "hot path real",
      risk: "usar zero-cost como mantra",
      takeaway:
        "O sistema de tipos ajuda muito, mas profiling continua sendo parte da disciplina.",
    },
  ],
  leftLabel: "dispatch dinâmico",
  rightLabel: "dispatch estático",
  tradeoffSummary:
    "Trait objects trazem flexibilidade em runtime; genéricos monomorfizados trazem especialização. A melhor escolha depende do tipo de extensibilidade e do peso do hot path.",
  tradeoffRisks: [
    "Flexibilidade ampla demais pode inserir indireção justamente em caminhos muito quentes.",
    "Uma solução híbrida muitas vezes preserva ergonomia sem sacrificar o núcleo crítico.",
    "Especialização ampla demais pode aumentar binário e tempo de compilação em troca de ganhos pequenos.",
    "Extremos sem critério costumam trocar clareza arquitetural por uma obsessão local de performance ou de abstração.",
  ],
  practiceRule:
    "No hot path, prefira especialização quando o conjunto de tipos é conhecido. Em fronteiras plugáveis, flexibilidade dinâmica pode valer o custo.",
  scenarios: [
    {
      name: "Pipeline numérico quente",
      situation:
        "Um algoritmo interno roda milhões de vezes por segundo sobre poucos tipos já conhecidos em compilação.",
      choice: "Usar genéricos e dispatch estático tende a ser a primeira leitura.",
      why: "O compilador pode especializar e otimizar melhor o caminho crítico.",
      caution:
        "Ainda assim, o custo real depende de layout, cache e alocação, não apenas do mecanismo de dispatch.",
    },
    {
      name: "Sistema de plugins",
      situation:
        "O conjunto de implementações varia por configuração e precisa coexistir em coleções heterogêneas em runtime.",
      choice: "Trait objects podem fazer mais sentido.",
      why: "A necessidade principal é extensibilidade e uniformização operacional de tipos diferentes.",
      caution:
        "Se parte do fluxo for muito quente, vale isolar essa flexibilidade fora do núcleo crítico.",
    },
    {
      name: "Validação de domínio",
      situation:
        "Vários módulos recebem strings e inteiros crus que representam conceitos diferentes, mas acabam se confundindo nas fronteiras.",
      choice: "Criar enums e newtypes específicos.",
      why: "O sistema de tipos passa a carregar significado e reduz estados inválidos antes da execução.",
      caution:
        "Tipos mais ricos ajudam muito, mas precisam continuar legíveis e bem posicionados no domínio.",
    },
  ],
});
