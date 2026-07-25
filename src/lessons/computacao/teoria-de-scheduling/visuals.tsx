import type { LessonModule } from "../../../types/content";
import { buildComputacaoVisuals } from "../shared/lessonFactory";

export const visuals = buildComputacaoVisuals({
  hero: {
    id: "scheduling-theory-hero",
    title: "Teoria de Scheduling",
    subtitle: "Quem roda agora depende do que o sistema quer proteger",
    chips: ["FIFO", "SJF", "Round Robin", "starvation", "fairness", "latencia"],
  },
  map: {
    id: "scheduling-tension-map",
    title: "O scheduler arbitra conflitos entre metas que nao cabem todas ao mesmo tempo",
    items: [
      { label: "Fila", detail: "trabalho pronto" },
      { label: "Politica", detail: "quem vai agora" },
      { label: "Metrica", detail: "o que importa" },
      { label: "Preempcao", detail: "ceder ou nao" },
      { label: "Fairness", detail: "quem ja esperou" },
    ],
    caption: "scheduling bom e alinhamento entre objetivo, fila, custo de troca e justica percebida",
  },
  summary: {
    id: "scheduling-summary",
    title: "Tres perguntas antes de discutir politica de scheduling",
    panels: [
      {
        label: "Qual dor voce quer evitar?",
        body: "Response time, turnaround, fairness e locality raramente apontam todos para a mesma resposta.",
      },
      {
        label: "Quem pode ficar invisivel?",
        body: "Toda fila precisa de um mecanismo para impedir que alguns trabalhos sumam atras dos mais privilegiados.",
      },
      {
        label: "Migrar ajuda ou atrapalha?",
        body: "Em multicore, balancear uso de CPU e preservar cache affinity entram na mesma conversa.",
      },
    ],
    footer: "o scheduler certo e o que protege a metrica certa sem esquecer o custo invisivel da propria escolha",
  },
}) satisfies LessonModule["visuals"];
