import type { LessonModule } from "../../../types/content";
import { buildComputacaoInteractions } from "../shared/lessonFactory";

export const interactions = buildComputacaoInteractions({
  flow: {
    id: "go-mental-model-flow",
    eyebrow: "Modelo mental",
    title: "Siga o caminho de um valor em Go",
    description:
      "Acompanhe como Go favorece contratos simples: valores nascem com zero value, ganham contexto, podem ser copiados e expostos por interfaces pequenas.",
    tone: "indigo",
    icon: "Workflow",
    stages: [
      {
        label: "Zero value",
        detail:
          "Todo tipo utilizável começa em um estado definido. Isso reduz inicialização defensiva e orienta APIs que funcionam bem sem construtores obrigatórios.",
        cue: "estado inicial útil",
      },
      {
        label: "Valor explícito",
        detail:
          "Em Go, passar um valor significa tornar a cópia parte visível do contrato. Quem lê a assinatura consegue suspeitar do custo e da mutabilidade.",
        cue: "semântica aparente",
      },
      {
        label: "Composição",
        detail:
          "Em vez de hierarquias profundas, structs e funções compõem comportamento em partes pequenas e reaproveitáveis.",
        cue: "montar em vez de herdar",
      },
      {
        label: "Interface mínima",
        detail:
          "Interfaces pequenas descrevem capacidades, não árvores de tipos. O consumidor costuma definir o contrato de que precisa.",
        cue: "capacidade, não linhagem",
      },
      {
        label: "Erro como valor",
        detail:
          "Falhas ficam no fluxo normal do programa. Isso aumenta verbosidade local, mas mantém controle, contexto e retorno visíveis.",
        cue: "falha explícita",
      },
    ],
  },
  compare: {
    id: "go-values-interfaces-lab",
    eyebrow: "Trade-offs",
    title: "Compare três lentes para ler código Go",
    description:
      "Troque a lente principal e veja como o mesmo trecho pode ser interpretado por semântica de valor, capacidade ou custo operacional.",
    tone: "violet",
    icon: "ArrowRightLeft",
    options: [
      {
        label: "Valores",
        headline: "A pergunta central é: quem possui esta cópia e quem pode mutá-la?",
        bullets: [
          "Assinaturas contam muita história sobre custo e isolamento.",
          "Copiar pode simplificar raciocínio e reduzir acoplamento.",
          "Endereços são úteis, mas não devem virar reflexo automático.",
        ],
      },
      {
        label: "Interfaces",
        headline: "A pergunta central é: qual capacidade mínima este código realmente exige?",
        bullets: [
          "Interfaces pequenas facilitam teste e substituição.",
          "O consumidor costuma ser o melhor lugar para definir contratos.",
          "Acoplar cedo a tipos concretos reduz flexibilidade futura.",
        ],
      },
      {
        label: "Operação",
        headline: "A pergunta central é: o runtime vai ter trabalho extra aqui?",
        bullets: [
          "Alocações, escapes e contenção importam mais que elegância abstrata.",
          "Simplicidade idiomática costuma ajudar profiling e manutenção.",
          "O modelo mental certo combina clareza sem esquecer o custo.",
        ],
      },
    ],
  },
  slider: {
    id: "go-explicitness-dial",
    eyebrow: "Estilo",
    title: "Ajuste o quanto a API privilegia explicitude",
    description:
      "Compare desenhos mais mágicos com desenhos mais literais. Go tende a favorecer aquilo que o leitor consegue inferir rápido.",
    tone: "emerald",
    icon: "BarChart3",
    axisLabel: "Grau de explicitude",
    states: [
      {
        label: "Abstração escondida",
        summary:
          "A API faz bastante trabalho implícito e pede que o leitor adivinhe inicialização, ownership e efeitos colaterais.",
        leftLabel: "Conveniência local",
        leftValue: 84,
        rightLabel: "Previsibilidade do leitor",
        rightValue: 30,
        takeaway:
          "Pode parecer elegante no começo, mas custa entendimento, debugging e tuning quando o sistema cresce.",
        metrics: [
          { label: "Superfície mágica", value: "Alta" },
          { label: "Leitura de assinatura", value: "Fraca" },
          { label: "Custo inferível", value: "Baixo" },
          { label: "Manutenção", value: "Mais tensa" },
        ],
      },
      {
        label: "Explícito idiomático",
        summary:
          "A API mostra entradas, erros e dependências com pouco teatro. Há alguma repetição, mas o contrato fica legível.",
        leftLabel: "Conveniência local",
        leftValue: 68,
        rightLabel: "Previsibilidade do leitor",
        rightValue: 78,
        takeaway:
          "É o ponto em que Go costuma brilhar: menos surpresa, mais clareza operacional e manutenção menos arriscada.",
        metrics: [
          { label: "Superfície mágica", value: "Baixa" },
          { label: "Leitura de assinatura", value: "Forte" },
          { label: "Custo inferível", value: "Melhor" },
          { label: "Manutenção", value: "Estável" },
        ],
      },
      {
        label: "Detalhe excessivo",
        summary:
          "Tudo fica tão explícito que o código começa a repetir infraestrutura e esconder a intenção principal atrás de cerimônia.",
        leftLabel: "Conveniência local",
        leftValue: 36,
        rightLabel: "Previsibilidade do leitor",
        rightValue: 70,
        takeaway:
          "Explícito demais também pesa. O alvo não é burocracia; é clareza suficiente para sustentar operação e evolução.",
        metrics: [
          { label: "Superfície mágica", value: "Mínima" },
          { label: "Leitura de assinatura", value: "Clara" },
          { label: "Ruído estrutural", value: "Alto" },
          { label: "Manutenção", value: "Verbosa" },
        ],
      },
    ],
  },
}) satisfies LessonModule["interactions"];
