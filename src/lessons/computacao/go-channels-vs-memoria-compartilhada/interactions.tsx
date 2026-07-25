import type { LessonModule } from "../../../types/content";
import { buildComputacaoInteractions } from "../shared/lessonFactory";

export const interactions = buildComputacaoInteractions({
  flow: {
    id: "go-ownership-flow-lab",
    eyebrow: "Coordenação",
    title: "Siga a posse de um dado entre goroutines",
    description:
      "Visualize quando um canal transfere ownership conceitual e quando o problema pede proteção explícita de estado compartilhado.",
    tone: "indigo",
    icon: "Workflow",
    stages: [
      {
        label: "Produção",
        detail:
          "Uma goroutine cria ou recebe um dado e decide se ele continuará sendo só dela ou se entrará em coordenação com outras.",
        cue: "ponto de posse",
      },
      {
        label: "Envio por canal",
        detail:
          "Ao enviar um valor ou referência, você comunica não apenas dados, mas também ordem e oportunidade de processamento.",
        cue: "handoff explícito",
      },
      {
        label: "Recebimento",
        detail:
          "Quem recebe pode tratar aquele item como unidade de trabalho, resultado assíncrono ou autorização para continuar o fluxo.",
        cue: "sincronização + dado",
      },
      {
        label: "Estado compartilhado",
        detail:
          "Se vários agentes precisam ler e escrever a mesma estrutura viva, a conversa muda: mutexes ou atomics podem expressar melhor o contrato.",
        cue: "mapa comum",
      },
      {
        label: "Ordem garantida",
        detail:
          "O valor da solução está em estabelecer happens-before com o mecanismo certo, e não em idolatrar um único estilo.",
        cue: "semântica correta",
      },
    ],
  },
  compare: {
    id: "go-sync-choice-lab",
    eyebrow: "Escolha",
    title: "Compare três famílias de problema",
    description:
      "Nem todo problema concorrente quer channel. Às vezes ele quer mutex; às vezes, atomic; às vezes, uma composição.",
    tone: "violet",
    icon: "ArrowRightLeft",
    options: [
      {
        label: "Fila de trabalho",
        headline: "Channels brilham quando você quer distribuir unidades de trabalho e resultados",
        bullets: [
          "Ownership do item anda junto com a sincronização.",
          "Backpressure e cancelamento ficam mais visíveis.",
          "O fluxo costuma ficar mais legível do que uma fila manual com locks.",
        ],
      },
      {
        label: "Cache compartilhado",
        headline: "Mutex muitas vezes é a forma mais simples de proteger estado vivo",
        bullets: [
          "Uma estrutura central acessada por muitos leitores e escritores não vira channel magic só por desejo.",
          "Lock bem colocado pode ser mais claro e mais barato.",
          "A wiki oficial do Go é explícita: não tenha medo de usar sync.Mutex.",
        ],
      },
      {
        label: "Sinal fino",
        headline: "Atomics servem para coordenação enxuta e de baixo nível, não para substituir desenho de concorrência",
        bullets: [
          "São ótimos para flags, contadores e fast paths bem medidos.",
          "Exigem cuidado com invariantes e composição de estado.",
          "Escalam bem em casos pequenos, mas complicam rápido quando a regra cresce.",
        ],
      },
    ],
  },
  slider: {
    id: "go-coordination-dial",
    eyebrow: "Ferramenta",
    title: "Ajuste o problema entre ownership e estado compartilhado",
    description:
      "Veja como a escolha muda quando o trabalho parece uma mensagem em trânsito ou um mapa comum sob disputa.",
    tone: "emerald",
    icon: "BarChart3",
    axisLabel: "Natureza do problema",
    states: [
      {
        label: "Ownership em trânsito",
        summary:
          "Cada item pode pertencer a uma goroutine por vez, e a principal tarefa é mover trabalho ou resultado entre etapas.",
        leftLabel: "Afinidade com channels",
        leftValue: 88,
        rightLabel: "Afinidade com locks",
        rightValue: 26,
        takeaway:
          "Aqui channels comunicam dado e ordenação ao mesmo tempo, com bom encaixe conceitual.",
        metrics: [
          { label: "Backpressure", value: "Natural" },
          { label: "Modelo mental", value: "Fila/pipeline" },
          { label: "Estado global", value: "Pequeno" },
          { label: "Ferramenta provável", value: "channel" },
        ],
      },
      {
        label: "Misto",
        summary:
          "Parte do fluxo é mensagem, parte é estrutura compartilhada. O desenho mais limpo frequentemente combina mecanismos.",
        leftLabel: "Afinidade com channels",
        leftValue: 58,
        rightLabel: "Afinidade com locks",
        rightValue: 62,
        takeaway:
          "Em muitos serviços reais, channel, mutex, context e WaitGroup convivem sem problema algum.",
        metrics: [
          { label: "Backpressure", value: "Parcial" },
          { label: "Modelo mental", value: "híbrido" },
          { label: "Estado global", value: "Moderado" },
          { label: "Ferramenta provável", value: "combinação" },
        ],
      },
      {
        label: "Estado quente compartilhado",
        summary:
          "Muitas goroutines acessam a mesma estrutura viva, com alta frequência e necessidade de invariantes locais.",
        leftLabel: "Afinidade com channels",
        leftValue: 24,
        rightLabel: "Afinidade com locks",
        rightValue: 86,
        takeaway:
          "Forçar channels aqui pode introduzir indireção demais; um mutex claro costuma ser a resposta mais pragmática.",
        metrics: [
          { label: "Backpressure", value: "Secundário" },
          { label: "Modelo mental", value: "estado compartilhado" },
          { label: "Estado global", value: "Alto" },
          { label: "Ferramenta provável", value: "mutex/atomic" },
        ],
      },
    ],
  },
}) satisfies LessonModule["interactions"];
