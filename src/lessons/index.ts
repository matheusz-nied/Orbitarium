import type { LessonModule } from "../types/content";
import { newtonCalculoLesson } from "./matematica/newton-calculo";
import { radiacaoCosmicaDeFundoLesson } from "./astrofisica/radiacao-cosmica-de-fundo";
import { algebraLinearEssencialIaLesson } from "./inteligencia-artificial/algebra-linear-essencial-ia";
import { gradientesOtimizacaoIntuitivaLesson } from "./inteligencia-artificial/gradientes-otimizacao-intuitiva";
import { probabilidadeParaIaLesson } from "./inteligencia-artificial/probabilidade-para-ia";
import { teoriaDaInformacaoEntropiaLesson } from "./inteligencia-artificial/teoria-da-informacao-entropia";
import { arvoresEnsemblesAgregacaoLesson } from "./inteligencia-artificial/arvores-ensembles-agregacao";
import { metricasClassificacaoPrecisaoRecallF1RocLesson } from "./inteligencia-artificial/metricas-classificacao-precisao-recall-f1-roc";
import { oQueEAprendizadoDeMaquinaLesson } from "./inteligencia-artificial/o-que-e-aprendizado-de-maquina";
import { overfittingUnderfittingRegularizacaoLesson } from "./inteligencia-artificial/overfitting-underfitting-regularizacao";
import { paradigmasAprendizadoLesson } from "./inteligencia-artificial/paradigmas-aprendizado-supervisionado-nao-supervisionado-reforco";
import { regressaoLinearELogisticaLesson } from "./inteligencia-artificial/regressao-linear-e-logistica";
import { treinoValidacaoTesteLesson } from "./inteligencia-artificial/treino-validacao-teste-vazamento-dados";
import { viesVarianciaErroIrredutivelLesson } from "./inteligencia-artificial/vies-variancia-erro-irredutivel";
import { backpropagationLesson } from "./inteligencia-artificial/backpropagation";
import { cnnsRedesConvolucionaisLesson } from "./inteligencia-artificial/cnns-redes-convolucionais";
import { funcoesDeAtivacaoLesson } from "./inteligencia-artificial/funcoes-de-ativacao";
import { funcoesDePerdaLesson } from "./inteligencia-artificial/funcoes-de-perda";
import { inicializacaoBatchNormEstabilidadeLesson } from "./inteligencia-artificial/inicializacao-batch-norm-estabilidade";
import { otimizadoresSgdMomentumAdamLesson } from "./inteligencia-artificial/otimizadores-sgd-momentum-adam";
import { redesNeuraisDoZeroLesson } from "./inteligencia-artificial/redes-neurais-do-zero";
import { regularizacaoDeepLearningLesson } from "./inteligencia-artificial/regularizacao-deep-learning";
import { transferLearningFineTuningRedesLesson } from "./inteligencia-artificial/transfer-learning-fine-tuning-redes";
import { alinhamentoSftRlhfLesson } from "./inteligencia-artificial/alinhamento-sft-rlhf";
import { comoFuncionaUmLlmLesson } from "./inteligencia-artificial/como-funciona-um-llm";
import { decodingTemperatureTopKTopPLesson } from "./inteligencia-artificial/decoding-temperature-top-k-top-p";
import { embeddingsLesson } from "./inteligencia-artificial/embeddings";
import { positionalEncodingJanelaContextoLesson } from "./inteligencia-artificial/positional-encoding-janela-contexto";
import { preTreinoDadosScalingLawsLesson } from "./inteligencia-artificial/pre-treino-dados-scaling-laws";
import { tokensTokenizacaoLesson } from "./inteligencia-artificial/tokens-tokenizacao";
import { transformersEAtencaoLesson } from "./inteligencia-artificial/transformers-e-atencao";
import { agentesDeIaLesson } from "./inteligencia-artificial/agentes-de-ia";
import { alucinacoesEmIaLesson } from "./inteligencia-artificial/alucinacoes-em-ia";
import { avaliacaoDeLlmsLesson } from "./inteligencia-artificial/avaliacao-de-llms";
import { chunkingRankingBasesVetoriaisLesson } from "./inteligencia-artificial/chunking-ranking-bases-vetoriais";
import { ferramentasFunctionCallingGroundingLesson } from "./inteligencia-artificial/ferramentas-function-calling-grounding";
import { fineTuningELoraLesson } from "./inteligencia-artificial/fine-tuning-e-lora";
import { memoriaEstadoOrquestracaoWorkflowsLesson } from "./inteligencia-artificial/memoria-estado-orquestracao-workflows";
import { observabilidadeSistemasLlmLesson } from "./inteligencia-artificial/observabilidade-sistemas-llm";
import { promptEngineeringComFundamentoLesson } from "./inteligencia-artificial/prompt-engineering-com-fundamento";
import { ragRetrievalAugmentedGenerationLesson } from "./inteligencia-artificial/rag-retrieval-augmented-generation";
import { adjacenciaConectividadeBlobsLesson } from "./visao-computacional/adjacencia-conectividade-blobs";
import { audioFalaAsrTtsLesson } from "./inteligencia-artificial/audio-fala-asr-tts";
import { circularidadeSolidezConvexHullLesson } from "./visao-computacional/circularidade-solidez-convex-hull";
import { classificacaoBaseadaEmRegrasLesson } from "./visao-computacional/classificacao-baseada-em-regras";
import { clipAlinhamentoTextoImagemLesson } from "./inteligencia-artificial/clip-alinhamento-texto-imagem";
import { contornosAreaPerimetroBoundingBoxLesson } from "./visao-computacional/contornos-area-perimetro-bounding-box";
import { deteccaoDeObjetosYoloLesson } from "./visao-computacional/deteccao-de-objetos-yolo";
import { diffusionModelsLesson } from "./inteligencia-artificial/diffusion-models";
import { fundamentosImagensDigitaisSegmentacaoLesson } from "./visao-computacional/fundamentos-imagens-digitais-segmentacao";
import { gansVsDiffusionLesson } from "./inteligencia-artificial/gans-vs-diffusion";
import { iaMultimodalLesson } from "./inteligencia-artificial/ia-multimodal";
import { imagensBinariasLimiarizacaoHistogramasLesson } from "./visao-computacional/imagens-binarias-limiarizacao-histogramas";
import { momentosCentroMassaOrientacaoLesson } from "./visao-computacional/momentos-centro-massa-orientacao";
import { morfologiaMatematicaOpeningClosingElementosEstruturantesLesson } from "./visao-computacional/morfologia-matematica-opening-closing-elementos-estruturantes";
import { ocrDocumentAiLesson } from "./visao-computacional/ocr-document-ai";
import { pipelineClassicoVsDeepLearningSegmentacaoLesson } from "./visao-computacional/pipeline-classico-vs-deep-learning-segmentacao";
import { rotulacaoComponentesConectadosLesson } from "./visao-computacional/rotulacao-componentes-conectados";
import { segmentacaoPorInstanciasLesson } from "./visao-computacional/segmentacao-por-instancias";
import { segmentacaoSemanticaLesson } from "./visao-computacional/segmentacao-semantica";
import { thresholdingGlobalOtsuAdaptativoLesson } from "./visao-computacional/thresholding-global-otsu-adaptativo";
import { avaliacaoContinuaMonitoramentoProducaoLesson } from "./inteligencia-artificial/avaliacao-continua-monitoramento-producao";
import { destilacaoCompressaoModelosLesson } from "./inteligencia-artificial/destilacao-compressao-modelos";
import { gpusVramCustoRealIaLesson } from "./inteligencia-artificial/gpus-vram-custo-real-ia";
import { inferenciaLatenciaBatchingThroughputLesson } from "./inteligencia-artificial/inferencia-latencia-batching-throughput";
import { mlopsEssencialLesson } from "./inteligencia-artificial/mlops-essencial";
import { privacidadePiiDadosSensiveisIaLesson } from "./inteligencia-artificial/privacidade-pii-dados-sensiveis-ia";
import { quantizacaoDeModelosLesson } from "./inteligencia-artificial/quantizacao-de-modelos";
import { segurancaLlmsPromptInjectionLesson } from "./inteligencia-artificial/seguranca-llms-prompt-injection";
import { agenciaAutonomiaLimitesLlmsLesson } from "./inteligencia-artificial/agencia-autonomia-limites-llms";
import { avaliacaoCientificaClaimsIaLesson } from "./inteligencia-artificial/avaliacao-cientifica-claims-ia";
import { explicabilidadeInterpretabilidadeLesson } from "./inteligencia-artificial/explicabilidade-interpretabilidade";
import { graphNeuralNetworksLesson } from "./inteligencia-artificial/graph-neural-networks";
import { historiaDaIaLesson } from "./inteligencia-artificial/historia-da-ia";
import { iaESociedadeLesson } from "./inteligencia-artificial/ia-e-sociedade";
import { reinforcementLearningIntroducaoLesson } from "./inteligencia-artificial/reinforcement-learning-introducao";
import { timeSeriesForecastingMlLesson } from "./inteligencia-artificial/time-series-forecasting-ml";
import { viesesFairnessDadosLesson } from "./inteligencia-artificial/vieses-fairness-dados";

export const lessonModules = [
  newtonCalculoLesson,
  radiacaoCosmicaDeFundoLesson,
  algebraLinearEssencialIaLesson,
  gradientesOtimizacaoIntuitivaLesson,
  probabilidadeParaIaLesson,
  teoriaDaInformacaoEntropiaLesson,
  arvoresEnsemblesAgregacaoLesson,
  metricasClassificacaoPrecisaoRecallF1RocLesson,
  oQueEAprendizadoDeMaquinaLesson,
  overfittingUnderfittingRegularizacaoLesson,
  paradigmasAprendizadoLesson,
  regressaoLinearELogisticaLesson,
  treinoValidacaoTesteLesson,
  viesVarianciaErroIrredutivelLesson,
  backpropagationLesson,
  cnnsRedesConvolucionaisLesson,
  funcoesDeAtivacaoLesson,
  funcoesDePerdaLesson,
  inicializacaoBatchNormEstabilidadeLesson,
  otimizadoresSgdMomentumAdamLesson,
  redesNeuraisDoZeroLesson,
  regularizacaoDeepLearningLesson,
  transferLearningFineTuningRedesLesson,
  alinhamentoSftRlhfLesson,
  comoFuncionaUmLlmLesson,
  decodingTemperatureTopKTopPLesson,
  embeddingsLesson,
  positionalEncodingJanelaContextoLesson,
  preTreinoDadosScalingLawsLesson,
  tokensTokenizacaoLesson,
  transformersEAtencaoLesson,
  agentesDeIaLesson,
  alucinacoesEmIaLesson,
  avaliacaoDeLlmsLesson,
  chunkingRankingBasesVetoriaisLesson,
  ferramentasFunctionCallingGroundingLesson,
  fineTuningELoraLesson,
  memoriaEstadoOrquestracaoWorkflowsLesson,
  observabilidadeSistemasLlmLesson,
  promptEngineeringComFundamentoLesson,
  ragRetrievalAugmentedGenerationLesson,
  adjacenciaConectividadeBlobsLesson,
  audioFalaAsrTtsLesson,
  circularidadeSolidezConvexHullLesson,
  classificacaoBaseadaEmRegrasLesson,
  clipAlinhamentoTextoImagemLesson,
  contornosAreaPerimetroBoundingBoxLesson,
  deteccaoDeObjetosYoloLesson,
  diffusionModelsLesson,
  fundamentosImagensDigitaisSegmentacaoLesson,
  gansVsDiffusionLesson,
  iaMultimodalLesson,
  imagensBinariasLimiarizacaoHistogramasLesson,
  momentosCentroMassaOrientacaoLesson,
  morfologiaMatematicaOpeningClosingElementosEstruturantesLesson,
  ocrDocumentAiLesson,
  pipelineClassicoVsDeepLearningSegmentacaoLesson,
  rotulacaoComponentesConectadosLesson,
  segmentacaoPorInstanciasLesson,
  segmentacaoSemanticaLesson,
  thresholdingGlobalOtsuAdaptativoLesson,
  avaliacaoContinuaMonitoramentoProducaoLesson,
  destilacaoCompressaoModelosLesson,
  gpusVramCustoRealIaLesson,
  inferenciaLatenciaBatchingThroughputLesson,
  mlopsEssencialLesson,
  privacidadePiiDadosSensiveisIaLesson,
  quantizacaoDeModelosLesson,
  segurancaLlmsPromptInjectionLesson,
  agenciaAutonomiaLimitesLlmsLesson,
  avaliacaoCientificaClaimsIaLesson,
  explicabilidadeInterpretabilidadeLesson,
  graphNeuralNetworksLesson,
  historiaDaIaLesson,
  iaESociedadeLesson,
  reinforcementLearningIntroducaoLesson,
  timeSeriesForecastingMlLesson,
  viesesFairnessDadosLesson,
] satisfies LessonModule[];

export const contents = lessonModules.map((lessonModule) => lessonModule.content);

export function getLessonModuleById(contentId: string) {
  return lessonModules.find((lessonModule) => lessonModule.content.id === contentId);
}
