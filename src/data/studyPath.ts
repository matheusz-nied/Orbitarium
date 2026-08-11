import type { LessonContent } from "../types/content";

export type LearningTrackStatus = "published" | "planned";
export const ALL_TRACKS_QUERY_VALUE = "todas";

export interface LearningTrackPhase {
  id: string;
  label: string;
  title: string;
  description: string;
  lessonIds: string[];
}

export type StudyPathPhase = LearningTrackPhase;

export interface LearningTrack {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  status: LearningTrackStatus;
  isDefault?: boolean;
  phases: LearningTrackPhase[];
}

export interface LessonTrackInfo {
  track: LearningTrack;
  order: number;
  phaseIndex: number;
  phaseOrder: number;
  phase: LearningTrackPhase;
}

export type StudyPathInfo = LessonTrackInfo;

/**
 * Sequência pedagógica principal da trilha de IA.
 *
 * A lista é deliberadamente mantida fora dos conteúdos individuais: a ordem
 * é uma decisão de navegação do catálogo e pode mudar sem editar 76 aulas.
 */
export const studyPathPhases: StudyPathPhase[] = [
  {
    id: "fundamentos",
    label: "Fase 0",
    title: "Fundamentos",
    description: "A matemática e a intuição necessárias para pensar em modelos.",
    lessonIds: [
      "probabilidade-para-ia",
      "algebra-linear-essencial-ia",
      "gradientes-otimizacao-intuitiva",
      "teoria-da-informacao-entropia",
    ],
  },
  {
    id: "machine-learning",
    label: "Fase 1",
    title: "Machine Learning clássico",
    description: "Como modelos aprendem, generalizam e são avaliados com honestidade.",
    lessonIds: [
      "o-que-e-aprendizado-de-maquina",
      "paradigmas-aprendizado-supervisionado-nao-supervisionado-reforco",
      "treino-validacao-teste-vazamento-dados",
      "overfitting-underfitting-regularizacao",
      "regressao-linear-e-logistica",
      "arvores-ensembles-agregacao",
      "metricas-classificacao-precisao-recall-f1-roc",
      "vies-variancia-erro-irredutivel",
      "time-series-forecasting-ml",
    ],
  },
  {
    id: "deep-learning",
    label: "Fase 2",
    title: "Deep Learning",
    description: "Da primeira rede neural à otimização e às representações profundas.",
    lessonIds: [
      "redes-neurais-do-zero",
      "funcoes-de-ativacao",
      "funcoes-de-perda",
      "backpropagation",
      "otimizadores-sgd-momentum-adam",
      "inicializacao-batch-norm-estabilidade",
      "cnns-redes-convolucionais",
      "regularizacao-deep-learning",
      "transfer-learning-fine-tuning-redes",
      "graph-neural-networks",
    ],
  },
  {
    id: "llms",
    label: "Fase 3",
    title: "LLMs por dentro",
    description: "Tokens, atenção, contexto e treinamento dos modelos de linguagem.",
    lessonIds: [
      "tokens-tokenizacao",
      "embeddings",
      "como-funciona-um-llm",
      "transformers-e-atencao",
      "positional-encoding-janela-contexto",
      "decoding-temperature-top-k-top-p",
      "pre-treino-dados-scaling-laws",
      "alinhamento-sft-rlhf",
    ],
  },
  {
    id: "sistemas-llm",
    label: "Fase 4",
    title: "Sistemas com LLMs",
    description: "Como transformar um modelo em uma aplicação útil, mensurável e conectada.",
    lessonIds: [
      "alucinacoes-em-ia",
      "prompt-engineering-com-fundamento",
      "rag-retrieval-augmented-generation",
      "avaliacao-de-llms",
      "chunking-ranking-bases-vetoriais",
      "fine-tuning-e-lora",
      "agentes-de-ia",
      "ferramentas-function-calling-grounding",
      "memoria-estado-orquestracao-workflows",
      "observabilidade-sistemas-llm",
    ],
  },
  {
    id: "visao-e-geracao",
    label: "Fase 5",
    title: "Visão, geração e multimodal",
    description: "Do pixel e da segmentação aos modelos generativos e multimodais.",
    lessonIds: [
      "fundamentos-imagens-digitais-segmentacao",
      "imagens-binarias-limiarizacao-histogramas",
      "thresholding-global-otsu-adaptativo",
      "morfologia-matematica-opening-closing-elementos-estruturantes",
      "adjacencia-conectividade-blobs",
      "rotulacao-componentes-conectados",
      "contornos-area-perimetro-bounding-box",
      "momentos-centro-massa-orientacao",
      "circularidade-solidez-convex-hull",
      "classificacao-baseada-em-regras",
      "pipeline-classico-vs-deep-learning-segmentacao",
      "segmentacao-semantica",
      "segmentacao-por-instancias",
      "deteccao-de-objetos-yolo",
      "diffusion-models",
      "gans-vs-diffusion",
      "ia-multimodal",
      "clip-alinhamento-texto-imagem",
      "ocr-document-ai",
      "audio-fala-asr-tts",
    ],
  },
  {
    id: "producao",
    label: "Fase 6",
    title: "Produção e eficiência",
    description: "O que muda quando o modelo precisa ser rápido, seguro e observável.",
    lessonIds: [
      "quantizacao-de-modelos",
      "inferencia-latencia-batching-throughput",
      "destilacao-compressao-modelos",
      "gpus-vram-custo-real-ia",
      "gpu-para-ia",
      "tpu-npu-aceleradores",
      "mlops-essencial",
      "seguranca-llms-prompt-injection",
      "privacidade-pii-dados-sensiveis-ia",
      "avaliacao-continua-monitoramento-producao",
    ],
  },
  {
    id: "visao-critica",
    label: "Fase 7",
    title: "Especialização e visão crítica",
    description: "Limites, impactos e critérios para julgar sistemas de IA com maturidade.",
    lessonIds: [
      "historia-da-ia",
      "vieses-fairness-dados",
      "explicabilidade-interpretabilidade",
      "agencia-autonomia-limites-llms",
      "avaliacao-cientifica-claims-ia",
      "ia-e-sociedade",
      "reinforcement-learning-introducao",
    ],
  },
];

const studyPathByContentId = new Map<string, StudyPathInfo>();

export const learningTracks: LearningTrack[] = [
  {
    id: "especialista-ia",
    categoryId: "inteligencia-artificial",
    name: "Especialista em Inteligência Artificial",
    description: "Do fundamento matemático aos sistemas de IA em produção e à visão crítica.",
    status: "published",
    isDefault: true,
    phases: studyPathPhases,
  },
  {
    id: "sistemas-operacionais",
    categoryId: "computacao",
    name: "Sistemas Operacionais",
    description: "Como o sistema operacional transforma hardware, memória e processos em uma plataforma utilizável.",
    status: "published",
    isDefault: true,
    phases: [
      {
        id: "fundamentos-do-so",
        label: "Módulo 1",
        title: "Fundamentos do sistema operacional",
        description: "Kernel, processos e a fronteira entre programas e recursos da máquina.",
        lessonIds: [
          "como-funciona-um-sistema-operacional",
          "como-um-programa-vira-processo",
          "syscalls-kernel",
        ],
      },
      {
        id: "processos-e-recursos",
        label: "Módulo 2",
        title: "Processos, concorrência e memória",
        description: "Como tarefas compartilham CPU e como cada processo enxerga seu espaço de memória.",
        lessonIds: [
          "processos-threads-concorrencia",
          "memoria-virtual",
          "sistema-de-arquivos",
        ],
      },
      {
        id: "linux-e-isolamento",
        label: "Módulo 3",
        title: "Linux, isolamento e baixo nível",
        description: "Permissões, containers e os custos reais da concorrência próxima do hardware.",
        lessonIds: [
          "linux-permissoes-processos",
          "docker-e-containers",
          "concorrencia-baixo-nivel",
        ],
      },
    ],
  },
  {
    id: "fenomenos-de-transporte",
    categoryId: "engenharia",
    name: "Fenômenos de Transporte",
    description: "Uma trilha para entender movimento, energia e matéria atravessando sistemas físicos.",
    status: "planned",
    phases: [
      {
        id: "fundamentos-de-transporte",
        label: "Módulo 1",
        title: "Fundamentos e propriedades",
        description: "Grandezas, balanços e propriedades necessárias para modelar transportes.",
        lessonIds: [],
      },
      {
        id: "mecanica-dos-fluidos",
        label: "Módulo 2",
        title: "Mecânica dos fluidos",
        description: "Pressão, escoamento, conservação e resistência ao movimento.",
        lessonIds: [],
      },
      {
        id: "transferencia-de-calor",
        label: "Módulo 3",
        title: "Transferência de calor",
        description: "Condução, convecção e radiação como formas de transporte de energia.",
        lessonIds: [],
      },
      {
        id: "transferencia-de-massa",
        label: "Módulo 4",
        title: "Transferência de massa",
        description: "Difusão, convecção e balanços de espécies em sistemas reais.",
        lessonIds: [],
      },
    ],
  },
];

function registerTrack(track: LearningTrack) {
  let trackOrder = 1;

  track.phases.forEach((phase, phaseIndex) => {
    phase.lessonIds.forEach((contentId, phaseOrder) => {
      studyPathByContentId.set(`${track.id}:${contentId}`, {
        track,
        order: trackOrder,
        phaseIndex,
        phaseOrder,
        phase,
      });
      trackOrder += 1;
    });
  });
}

learningTracks.forEach(registerTrack);

export function getLearningTrackById(trackId: string) {
  return learningTracks.find((track) => track.id === trackId);
}

export function getLearningTracksByCategory(categoryId: string, includePlanned = false) {
  return learningTracks.filter(
    (track) =>
      track.categoryId === categoryId &&
      (includePlanned || track.status === "published") &&
      (includePlanned || getTrackLessonCount(track) > 0),
  );
}

export function getDefaultLearningTrackForCategory(categoryId: string) {
  return getLearningTracksByCategory(categoryId).find((track) => track.isDefault);
}

export function getLessonTrackInfo(trackId: string, contentId: string) {
  return studyPathByContentId.get(`${trackId}:${contentId}`);
}

export function getTrackLessonCount(track: LearningTrack) {
  return track.phases.reduce((total, phase) => total + phase.lessonIds.length, 0);
}

export function getTrackOrderComparator(trackId: string) {
  return (first: LessonContent, second: LessonContent) => {
    const firstInfo = getLessonTrackInfo(trackId, first.id);
    const secondInfo = getLessonTrackInfo(trackId, second.id);
    const firstOrder = firstInfo?.order ?? Number.MAX_SAFE_INTEGER;
    const secondOrder = secondInfo?.order ?? Number.MAX_SAFE_INTEGER;

    return firstOrder - secondOrder || first.title.localeCompare(second.title, "pt-BR");
  };
}

export function getStudyPathInfo(contentId: string) {
  return getLessonTrackInfo("especialista-ia", contentId);
}

export function compareContentsByRecommendedOrder(first: LessonContent, second: LessonContent) {
  return getTrackOrderComparator("especialista-ia")(first, second);
}
