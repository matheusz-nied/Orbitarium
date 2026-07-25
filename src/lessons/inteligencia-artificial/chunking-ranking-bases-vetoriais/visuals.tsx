import type { LessonModule } from "../../../types/content";
import { createStandardLessonVisuals } from "../_shared/visualFactories";

export const visuals = createStandardLessonVisuals({
  tone: "indigo",
  heroTitle: "Busca boa depende de como o conhecimento foi quebrado e ranqueado",
  heroSubtitle: "Chunking, ranking e índice vetorial decidem se a evidência certa chega ao modelo leitor",
  heroSteps: ["Quebrar", "Ranquear", "Buscar"],
  heroFooter:
    "Embeddings ajudam muito, mas só dentro de uma infraestrutura textual e vetorial bem projetada.",
  conceptTitle: "Dois erros clássicos de chunking",
  conceptLeft: {
    title: "Chunk pequeno demais",
    body: "Recupera detalhes isolados, mas pode perder a ideia completa ao cortar a unidade semântica cedo demais.",
  },
  conceptRight: {
    title: "Chunk grande demais",
    body: "Preserva contexto interno, mas mistura assuntos e piora a precisão do trecho que volta no topo.",
  },
  conceptFooter:
    "A melhor unidade é a que permanece coerente e ainda pode ser encontrada de forma precisa.",
  pipelineTitle: "Fluxo da camada de recuperação",
  pipelineSteps: ["Texto", "Chunks", "Embeddings", "Índice", "Ranking"],
  comparisonTitle: "Duas lentes de relevância",
  comparisonLeft: {
    title: "Lexical",
    body: "Favorece coincidência explícita de termos e funciona muito bem quando a palavra exata carrega o significado crítico.",
  },
  comparisonRight: {
    title: "Semântica",
    body: "Favorece proximidade de sentido e ajuda quando a consulta é paráfrase ou sinônimo do texto relevante.",
  },
  tradeoffTitle: "Mais compressão reduz custo e pode reduzir recall",
  tradeoffXAxis: "Eficiência operacional",
  tradeoffYAxis: "Risco de perder vizinhos úteis",
  tradeoffPoints: [
    { label: "Busca exata", x: 0.18, y: 0.12 },
    { label: "ANN moderado", x: 0.56, y: 0.34 },
    { label: "Compressão alta", x: 0.84, y: 0.7 },
    { label: "Base enorme", x: 0.68, y: 0.52 },
  ],
  checklistTitle: "Checklist da recuperação",
  checklistItems: [
    "Os chunks respeitam a estrutura natural do texto?",
    "Há overlap suficiente sem inflar demais o índice?",
    "A consulta se beneficia mais de sinal lexical, denso ou híbrido?",
    "O encoder representa bem o domínio do corpus?",
    "O índice vetorial preserva recall suficiente para o caso de uso?",
    "A equipe mede recuperação, não só a resposta final do LLM?",
  ],
}) satisfies LessonModule["visuals"];
