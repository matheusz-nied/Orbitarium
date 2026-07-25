import type { LessonModule } from "../../../types/content";
import { buildComputacaoInteractions } from "../shared/lessonFactory";

export const interactions = buildComputacaoInteractions({
  flow: {
    id: "flamegraph-patch-flow-lab",
    eyebrow: "Laboratorio",
    title: "Percorra um ciclo saudavel do sintoma ao profile",
    description:
      "Use o fluxo para lembrar que a coleta so vale quando esta conectada a uma pergunta e termina em verificacao.",
    tone: "indigo",
    icon: "Search",
    stages: [
      {
        label: "Fixar o sintoma",
        detail:
          "Comece pelo que esta doendo de verdade: rota lenta, lote atrasado, CPU alta, throughput ruim ou cauda piorando.",
        cue: "qual dor queremos explicar?",
      },
      {
        label: "Escolher o recorte",
        detail:
          "Defina a carga, a janela e o contexto que realmente representam o problema antes de ligar o profiler.",
        cue: "estou medindo o caso certo?",
      },
      {
        label: "Coletar o profile",
        detail:
          "Sampling on-CPU, block, mutex ou outra visao entram conforme a pergunta atual e o custo aceitavel de observacao.",
        cue: "qual evidencia derruba mais incerteza?",
      },
      {
        label: "Ler o path quente",
        detail:
          "Observe stacks recorrentes e relacao entre callers e callees para sair da barra larga e chegar a um mecanismo plausivel.",
        cue: "o que este desenho sugere?",
      },
      {
        label: "Patchar e revalidar",
        detail:
          "A intervencao so se sustenta quando o antes e depois mostram mudanca atribuivel no sintoma relevante.",
        cue: "o loop fechou?",
      },
    ],
  },
  compare: {
    id: "flamegraph-patch-options-lab",
    eyebrow: "Decisao",
    title: "Compare quatro respostas possiveis ao mesmo flamegraph",
    description:
      "A melhor acao depende do mecanismo suspeito, do risco de regressao e da confianca na hipotese atual.",
    tone: "violet",
    icon: "ArrowRightLeft",
    options: [
      {
        label: "Remover redundancia",
        headline: "Boa opcao quando o path quente aponta para parse, copia, formatacao ou alocacao repetidos",
        bullets: [
          "Costuma render rapido quando o profile mostra trabalho duplicado no caminho principal.",
          "E um patch local com boa atribuibilidade se a hipotese estiver clara.",
          "Falha quando o custo aparente e apenas sintoma de um desenho maior mal escolhido.",
        ],
      },
      {
        label: "Trocar estrutura",
        headline: "Faz sentido quando o formato do dado ou o algoritmo explicam o peso do caminho quente",
        bullets: [
          "Pode reduzir custo recorrente em loops, serializacao, busca ou montagem de resposta.",
          "Pede atencao a legibilidade e a efeitos colaterais fora do benchmark mais obvio.",
          "Vale mais quando a mudanca conversa com o mecanismo suspeito, e nao apenas com o frame visivel.",
        ],
      },
      {
        label: "Redesenhar fluxo",
        headline: "Entra em cena quando lock, fila, fan-out ou fronteiras entre camadas sao o custo dominante",
        bullets: [
          "A barra larga as vezes e o retrato de uma coordenacao ruim, nao de uma funcao isolada.",
          "Mudar ownership, granularidade de trabalho ou ordem de chamadas pode render mais do que microajuste.",
          "O risco e maior, entao o recorte e a verificacao precisam ser ainda mais disciplinados.",
        ],
      },
      {
        label: "Medir mais antes",
        headline: "Opcao madura quando a evidencia ainda nao separa causa primaria de ruido ou de sintoma secundario",
        bullets: [
          "Pode significar coletar outro profile, refinar a carga ou decompor melhor a etapa observada.",
          "Evita gastar energia otimizando a historia mais bonita em vez do custo dominante real.",
          "Nao e atraso burocratico; e reducao de risco tecnico quando a hipotese ainda esta fraca.",
        ],
      },
    ],
  },
  slider: {
    id: "flamegraph-patch-validation-dial",
    eyebrow: "Confianca",
    title: "Ajuste o grau de rigor da sua verificacao",
    description:
      "Quanto melhor o antes e depois conversa com o sintoma original, menor a chance de celebrar ruído.",
    tone: "emerald",
    icon: "BarChart3",
    axisLabel: "Maturidade da validacao",
    states: [
      {
        label: "Sinal fraco",
        summary:
          "O patch parece promissor, mas o recorte mudou, a carga nao foi controlada ou a leitura esta apoiada em uma unica captura.",
        leftLabel: "Rapidez para concluir",
        leftValue: 88,
        rightLabel: "Confianca na historia",
        rightValue: 24,
        takeaway:
          "Serve para explorar intuicao, mas nao para fechar um diagnostico ou justificar uma refatoracao mais cara.",
        metrics: [
          { label: "Atribuibilidade", value: "baixa" },
          { label: "Risco de overfit", value: "alto" },
          { label: "Uso ideal", value: "triagem" },
          { label: "Status", value: "provisorio" },
        ],
      },
      {
        label: "Sinal razoavel",
        summary:
          "A pergunta e o recorte se mantiveram, e o profile antes/depois ja mostra deslocamento coerente do custo principal.",
        leftLabel: "Praticidade",
        leftValue: 64,
        rightLabel: "Confianca na historia",
        rightValue: 69,
        takeaway:
          "E o ponto em que muita otimizacao de aplicacao ja fica defensavel e util para seguir iterando.",
        metrics: [
          { label: "Atribuibilidade", value: "media" },
          { label: "Risco de regressao invisivel", value: "moderado" },
          { label: "Uso ideal", value: "iteracao" },
          { label: "Status", value: "promissor" },
        ],
      },
      {
        label: "Confirmacao forte",
        summary:
          "A mesma dor operacional foi reavaliada com recorte consistente, e o patch melhorou o alvo sem introduzir deslocamentos ruins relevantes.",
        leftLabel: "Custo de disciplina",
        leftValue: 42,
        rightLabel: "Confianca na historia",
        rightValue: 92,
        takeaway:
          "Esse e o nivel de evidencia que transforma uma boa suspeita em aprendizado reutilizavel para a equipe.",
        metrics: [
          { label: "Atribuibilidade", value: "alta" },
          { label: "Risco de overfit", value: "baixo" },
          { label: "Uso ideal", value: "consolidar" },
          { label: "Status", value: "validado" },
        ],
      },
    ],
  },
}) satisfies LessonModule["interactions"];
