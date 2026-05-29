import type { LessonModule } from "../types/content";
import { radiacaoCosmicaDeFundoLesson } from "./astrofisica/radiacao-cosmica-de-fundo";
import { comoFuncionaUmLlmLesson } from "./inteligencia-artificial/como-funciona-um-llm";
import { embeddingsLesson } from "./inteligencia-artificial/embeddings";
import { tokensTokenizacaoLesson } from "./inteligencia-artificial/tokens-tokenizacao";
import { transformersEAtencaoLesson } from "./inteligencia-artificial/transformers-e-atencao";
import { newtonCalculoLesson } from "./matematica/newton-calculo";
import { adjacenciaConectividadeBlobsLesson } from "./visao-computacional/adjacencia-conectividade-blobs";
import { classificacaoBaseadaEmRegrasLesson } from "./visao-computacional/classificacao-baseada-em-regras";
import { contornosAreaPerimetroBoundingBoxLesson } from "./visao-computacional/contornos-area-perimetro-bounding-box";
import { circularidadeSolidezConvexHullLesson } from "./visao-computacional/circularidade-solidez-convex-hull";
import { fundamentosImagensDigitaisSegmentacaoLesson } from "./visao-computacional/fundamentos-imagens-digitais-segmentacao";
import { imagensBinariasLimiarizacaoHistogramasLesson } from "./visao-computacional/imagens-binarias-limiarizacao-histogramas";
import { momentosCentroMassaOrientacaoLesson } from "./visao-computacional/momentos-centro-massa-orientacao";
import { morfologiaMatematicaOpeningClosingElementosEstruturantesLesson } from "./visao-computacional/morfologia-matematica-opening-closing-elementos-estruturantes";
import { pipelineClassicoVsDeepLearningSegmentacaoLesson } from "./visao-computacional/pipeline-classico-vs-deep-learning-segmentacao";
import { rotulacaoComponentesConectadosLesson } from "./visao-computacional/rotulacao-componentes-conectados";
import { segmentacaoPorInstanciasLesson } from "./visao-computacional/segmentacao-por-instancias";
import { segmentacaoSemanticaLesson } from "./visao-computacional/segmentacao-semantica";
import { thresholdingGlobalOtsuAdaptativoLesson } from "./visao-computacional/thresholding-global-otsu-adaptativo";

export const lessonModules = [
  newtonCalculoLesson,
  radiacaoCosmicaDeFundoLesson,
  tokensTokenizacaoLesson,
  embeddingsLesson,
  comoFuncionaUmLlmLesson,
  transformersEAtencaoLesson,
  fundamentosImagensDigitaisSegmentacaoLesson,
  imagensBinariasLimiarizacaoHistogramasLesson,
  thresholdingGlobalOtsuAdaptativoLesson,
  morfologiaMatematicaOpeningClosingElementosEstruturantesLesson,
  adjacenciaConectividadeBlobsLesson,
  rotulacaoComponentesConectadosLesson,
  contornosAreaPerimetroBoundingBoxLesson,
  momentosCentroMassaOrientacaoLesson,
  circularidadeSolidezConvexHullLesson,
  classificacaoBaseadaEmRegrasLesson,
  segmentacaoSemanticaLesson,
  segmentacaoPorInstanciasLesson,
  pipelineClassicoVsDeepLearningSegmentacaoLesson,
] satisfies LessonModule[];

export const contents = lessonModules.map((lessonModule) => lessonModule.content);

export function getLessonModuleById(contentId: string) {
  return lessonModules.find((lessonModule) => lessonModule.content.id === contentId);
}
