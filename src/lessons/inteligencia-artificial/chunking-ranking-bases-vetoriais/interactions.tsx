import { DatabaseZap, Scissors, Scale } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import {
  createScenarioExplorer,
  createSliderPlayground,
} from "../_shared/interactionFactories";

const chunkingLab = createSliderPlayground({
  eyebrow: "Chunking",
  title: "Ajuste tamanho, overlap e estrutura",
  description:
    "Visualize a troca entre coerência do trecho, precisão de recuperação e redundância do índice.",
  tone: "indigo",
  icon: <Scissors size={18} aria-hidden="true" />,
  initialState: {
    chunkSize: 0.55,
    overlap: 0.3,
    structure: 0.7,
  },
  controls: [
    {
      key: "chunkSize",
      label: "tamanho relativo do chunk",
      min: 0.1,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
    {
      key: "overlap",
      label: "overlap entre chunks",
      min: 0,
      max: 0.8,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
    {
      key: "structure",
      label: "respeito à estrutura do documento",
      min: 0,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
  ],
  compute: ({ chunkSize, overlap, structure }) => {
    const coherence = Math.min(1, structure * 0.45 + chunkSize * 0.35 + overlap * 0.2);
    const precision = Math.max(0, 1 - chunkSize * 0.45 + structure * 0.25 - overlap * 0.05);
    const redundancy = Math.min(1, overlap * 0.7 + chunkSize * 0.15 + (1 - structure) * 0.15);

    return {
      metrics: [
        { label: "coerência do chunk", value: `${(coherence * 100).toFixed(0)}%` },
        { label: "precisão local", value: `${(precision * 100).toFixed(0)}%` },
        { label: "redundância do índice", value: `${(redundancy * 100).toFixed(0)}%` },
        { label: "regime", value: chunkSize < 0.3 ? "fragmentado" : chunkSize > 0.75 ? "grosso" : "moderado" },
      ],
      bars: [
        { label: "Coerência", value: coherence, display: `${(coherence * 100).toFixed(0)}%` },
        { label: "Precisão", value: precision, display: `${(precision * 100).toFixed(0)}%` },
        { label: "Redundância", value: redundancy, display: `${(redundancy * 100).toFixed(0)}%` },
      ],
      narrative:
        chunkSize < 0.25
          ? "Chunks muito curtos ganham foco, mas podem quebrar a ideia ao meio e dificultar respostas que dependem de mais de uma frase conectada."
          : chunkSize > 0.8
            ? "Chunks grandes preservam mais contexto interno, porém carregam ruído temático e tornam a recuperação menos precisa para perguntas específicas."
            : "O objetivo do chunking não é maximizar um único número. É equilibrar coerência semântica, precisão de recuperação e custo operacional do índice.",
      footer:
        "Respeitar headings, parágrafos e unidades naturais do texto frequentemente vale mais do que perseguir um número fixo universal.",
    };
  },
});

const rankingModes = createScenarioExplorer({
  eyebrow: "Ranking",
  title: "Compare lentes de relevância",
  description:
    "Lexical, denso e híbrido sobem candidatos diferentes porque priorizam sinais diferentes.",
  tone: "amber",
  icon: <Scale size={18} aria-hidden="true" />,
  scenarios: [
    {
      id: "lexical",
      label: "BM25 / lexical",
      title: "Forte quando a palavra importa exatamente",
      description:
        "Ranking lexical brilha quando os termos da consulta e do documento coincidem de forma informativa e distintiva.",
      bullets: [
        "Excelente para entidades, siglas e terminologia exata.",
        "Pode perder sinônimos e paráfrases.",
        "Costuma ser forte em corpus técnicos com vocabulário estável.",
      ],
      metrics: [
        { label: "sinal explícito", value: "muito alto" },
        { label: "robustez semântica", value: "média" },
      ],
      bars: [
        { label: "Exatidão lexical", value: 0.9, display: "90%" },
        { label: "Cobertura de paráfrase", value: 0.32, display: "32%" },
      ],
    },
    {
      id: "dense",
      label: "Denso",
      title: "Forte para equivalência de sentido",
      description:
        "Embeddings ajudam quando a mesma ideia aparece com palavras diferentes ou formulações mais livres.",
      bullets: [
        "Captura semelhança semântica.",
        "Pode trazer trechos próximos no tema, mas não no detalhe decisivo.",
        "Depende bastante do encoder e do domínio.",
      ],
      metrics: [
        { label: "sinal explícito", value: "médio" },
        { label: "robustez semântica", value: "alta" },
      ],
      bars: [
        { label: "Exatidão lexical", value: 0.46, display: "46%" },
        { label: "Cobertura de paráfrase", value: 0.82, display: "82%" },
      ],
    },
    {
      id: "hybrid",
      label: "Híbrido",
      title: "Melhora cobertura combinando sinais",
      description:
        "Mistura correspondência explícita e proximidade semântica para reduzir pontos cegos de cada abordagem isolada.",
      bullets: [
        "Costuma performar melhor em bases heterogêneas.",
        "Introduz mais complexidade de calibração.",
        "Frequentemente é o melhor ponto de partida prático.",
      ],
      metrics: [
        { label: "sinal explícito", value: "alto" },
        { label: "robustez semântica", value: "alta" },
      ],
      bars: [
        { label: "Exatidão lexical", value: 0.74, display: "74%" },
        { label: "Cobertura de paráfrase", value: 0.76, display: "76%" },
      ],
    },
  ],
});

const vectorIndexLab = createSliderPlayground({
  eyebrow: "Base vetorial",
  title: "Sinta o trade-off entre recall, memória e latência",
  description:
    "Ajuste precisão da busca, compressão e escala para visualizar por que índices aproximados são úteis e por que eles também cobram um preço.",
  tone: "teal",
  icon: <DatabaseZap size={18} aria-hidden="true" />,
  initialState: {
    exactness: 0.6,
    compression: 0.5,
    scale: 0.7,
  },
  controls: [
    {
      key: "exactness",
      label: "foco em precisão da busca",
      min: 0.1,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
    {
      key: "compression",
      label: "nível de compressão / aproximação",
      min: 0,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
    {
      key: "scale",
      label: "escala do acervo",
      min: 0.1,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
  ],
  compute: ({ exactness, compression, scale }) => {
    const recall = Math.max(0, exactness * 0.75 - compression * 0.2 + 0.15);
    const latency = Math.min(1, scale * 0.5 + exactness * 0.35 - compression * 0.25);
    const memoryPressure = Math.min(1, scale * 0.55 + (1 - compression) * 0.25 + exactness * 0.2);

    return {
      metrics: [
        { label: "recall provável", value: `${(recall * 100).toFixed(0)}%` },
        { label: "latência relativa", value: `${(latency * 100).toFixed(0)}%` },
        { label: "pressão de memória", value: `${(memoryPressure * 100).toFixed(0)}%` },
        { label: "estilo de índice", value: compression > 0.65 ? "agressivo" : exactness > 0.75 ? "conservador" : "equilibrado" },
      ],
      bars: [
        { label: "Recall", value: recall, display: `${(recall * 100).toFixed(0)}%` },
        { label: "Latência", value: latency, display: `${(latency * 100).toFixed(0)}%` },
        { label: "Memória", value: memoryPressure, display: `${(memoryPressure * 100).toFixed(0)}%` },
      ],
      narrative:
        compression > 0.75
          ? "Aqui o índice comprime e aproxima bastante. Isso ajuda custo e velocidade, mas pode deixar vizinhos relevantes escaparem em consultas difíceis."
          : exactness > 0.8 && scale > 0.75
            ? "Você está privilegiando recall em grande escala. O sistema fica forte em qualidade, mas tende a pagar mais em memória e latência."
            : "Índice vetorial é negociação prática: o melhor ponto depende do tamanho do acervo, do custo da falha de recuperação e da experiência de uso esperada.",
      footer:
        "A boa engenharia mede não só velocidade, mas também quantas respostas úteis a busca deixa de trazer quando fica agressivamente aproximada.",
    };
  },
});

export const interactions = {
  "chunking-lab": chunkingLab,
  "ranking-modes": rankingModes,
  "vector-index-lab": vectorIndexLab,
} satisfies LessonModule["interactions"];
