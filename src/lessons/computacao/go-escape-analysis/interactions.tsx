import type { LessonModule } from "../../../types/content";
import { buildComputacaoInteractions } from "../shared/lessonFactory";

export const interactions = buildComputacaoInteractions({
  flow: {
    id: "go-escape-path-lab",
    eyebrow: "Alocação",
    title: "Siga a decisão do compilador sobre um valor",
    description:
      "Acompanhe como um valor local pode permanecer na stack ou escapar para a heap conforme o contexto de uso.",
    tone: "indigo",
    icon: "Workflow",
    stages: [
      {
        label: "Valor nasce local",
        detail:
          "O ponto de partida costuma ser uma variável local que, em princípio, poderia viver apenas durante aquela chamada.",
        cue: "escopo imediato",
      },
      {
        label: "Uso observado",
        detail:
          "O compilador examina como o valor é retornado, capturado, convertido ou armazenado em estruturas com vida potencialmente maior.",
        cue: "fluxo de referência",
      },
      {
        label: "Decisão de storage",
        detail:
          "Se o valor puder sobreviver ao frame atual, a heap vira a opção segura. Se não, a stack pode bastar e baratear o custo total.",
        cue: "segurança do lifetime",
      },
      {
        label: "Impacto no runtime",
        detail:
          "Valores na heap entram no universo do coletor, da alocação e do profile de memória; valores na stack tendem a ser mais baratos.",
        cue: "pressão de GC",
      },
      {
        label: "Leitura com evidência",
        detail:
          "Flags do compilador, heap profiles e benchmarks ajudam a ver por que uma decisão aconteceu e se vale mexer nela.",
        cue: "medir antes de reescrever",
      },
    ],
  },
  compare: {
    id: "go-escape-trigger-lab",
    eyebrow: "Gatilhos",
    title: "Compare três gatilhos comuns de escape",
    description:
      "Troque o cenário e veja por que o mesmo tipo local pode ou não ir para a heap dependendo da forma de uso.",
    tone: "violet",
    icon: "ArrowRightLeft",
    options: [
      {
        label: "Retornar ponteiro",
        headline: "Se o valor precisa sobreviver ao frame atual, a heap costuma ser o destino seguro",
        bullets: [
          "O chamador pode manter a referência além do retorno.",
          "A decisão é sobre lifetime, não sobre gosto pessoal.",
          "Às vezes retornar por valor resolve; às vezes não faz sentido mudar.",
        ],
      },
      {
        label: "Captura em closure",
        headline: "Fechamentos podem prolongar a vida útil de variáveis locais",
        bullets: [
          "O problema aparece muito com goroutines, callbacks e funções retornadas.",
          "Nem toda closure é ruim, mas ela pede leitura mais cuidadosa.",
          "Inlining e outras otimizações podem alterar o resultado entre versões.",
        ],
      },
      {
        label: "Indireção e boxing",
        headline: "Interfaces, endereços e armazenamento indireto podem dificultar a análise",
        bullets: [
          "Quando o compilador perde certeza, ele escolhe a opção segura.",
          "O custo pode aparecer em lugares surpreendentes do profile.",
          "Refatorar para clareza de ownership às vezes ajuda mais do que microtruques.",
        ],
      },
    ],
  },
  slider: {
    id: "go-allocation-pressure-dial",
    eyebrow: "Pressão",
    title: "Ajuste a forma como a API trata valores e referências",
    description:
      "Compare desenhos mais amigáveis à stack com desenhos que criam mais oportunidades de escape e GC.",
    tone: "emerald",
    icon: "BarChart3",
    axisLabel: "Desenho da API",
    states: [
      {
        label: "Value-friendly",
        summary:
          "O desenho mantém ownership claro, evita prolongar lifetimes sem necessidade e dá mais chances ao compilador de usar stack.",
        leftLabel: "Chance de stack",
        leftValue: 84,
        rightLabel: "Pressão de heap",
        rightValue: 28,
        takeaway:
          "Nem sempre é possível, mas APIs simples e locais costumam facilitar escape analysis e reduzir trabalho do runtime.",
        metrics: [
          { label: "Lifetimes", value: "Curtos" },
          { label: "GC pressure", value: "Menor" },
          { label: "Leitura", value: "Explícita" },
          { label: "Risco", value: "Baixo" },
        ],
      },
      {
        label: "Equilíbrio pragmático",
        summary:
          "Alguns valores escapam por necessidade real, outros permanecem locais. O importante é distinguir design essencial de ruído evitável.",
        leftLabel: "Chance de stack",
        leftValue: 58,
        rightLabel: "Pressão de heap",
        rightValue: 56,
        takeaway:
          "É o cenário mais comum em software útil: clareza primeiro, otimização guiada por perfil depois.",
        metrics: [
          { label: "Lifetimes", value: "Misturados" },
          { label: "GC pressure", value: "Moderada" },
          { label: "Leitura", value: "Boa" },
          { label: "Risco", value: "Controlável" },
        ],
      },
      {
        label: "Pointer-heavy",
        summary:
          "A API espalha referências, closures e indireções a ponto de dificultar análise e ampliar alocação no heap.",
        leftLabel: "Chance de stack",
        leftValue: 24,
        rightLabel: "Pressão de heap",
        rightValue: 86,
        takeaway:
          "O custo aparece em alocação, GC e depuração. Nem toda referência é ruim, mas excesso sem motivo cobra juros.",
        metrics: [
          { label: "Lifetimes", value: "Longos/obscuros" },
          { label: "GC pressure", value: "Alta" },
          { label: "Leitura", value: "Difusa" },
          { label: "Risco", value: "Maior" },
        ],
      },
    ],
  },
}) satisfies LessonModule["interactions"];
