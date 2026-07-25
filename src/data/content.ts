export { categories } from "./categories";

import type { LessonModule } from "../types/content";
import {
  contents as baseContents,
  lessonModules as baseLessonModules,
} from "../lessons";
import { audioFalaAsrTtsLesson } from "../lessons/inteligencia-artificial/audio-fala-asr-tts";
import { alucinacoesEmIaLesson } from "../lessons/inteligencia-artificial/alucinacoes-em-ia";
import { avaliacaoContinuaMonitoramentoProducaoLesson } from "../lessons/inteligencia-artificial/avaliacao-continua-monitoramento-producao";
import { avaliacaoDeLlmsLesson } from "../lessons/inteligencia-artificial/avaliacao-de-llms";
import { chunkingRankingBasesVetoriaisLesson } from "../lessons/inteligencia-artificial/chunking-ranking-bases-vetoriais";
import { clipAlinhamentoTextoImagemLesson } from "../lessons/inteligencia-artificial/clip-alinhamento-texto-imagem";
import { destilacaoCompressaoModelosLesson } from "../lessons/inteligencia-artificial/destilacao-compressao-modelos";
import { diffusionModelsLesson } from "../lessons/inteligencia-artificial/diffusion-models";
import { gpusVramCustoRealIaLesson } from "../lessons/inteligencia-artificial/gpus-vram-custo-real-ia";
import { gansVsDiffusionLesson } from "../lessons/inteligencia-artificial/gans-vs-diffusion";
import { iaMultimodalLesson } from "../lessons/inteligencia-artificial/ia-multimodal";
import { inferenciaLatenciaBatchingThroughputLesson } from "../lessons/inteligencia-artificial/inferencia-latencia-batching-throughput";
import { mlopsEssencialLesson } from "../lessons/inteligencia-artificial/mlops-essencial";
import { oQueEAprendizadoDeMaquinaLesson } from "../lessons/inteligencia-artificial/o-que-e-aprendizado-de-maquina";
import { overfittingUnderfittingRegularizacaoLesson } from "../lessons/inteligencia-artificial/overfitting-underfitting-regularizacao";
import { paradigmasAprendizadoLesson } from "../lessons/inteligencia-artificial/paradigmas-aprendizado-supervisionado-nao-supervisionado-reforco";
import { privacidadePiiDadosSensiveisIaLesson } from "../lessons/inteligencia-artificial/privacidade-pii-dados-sensiveis-ia";
import { promptEngineeringComFundamentoLesson } from "../lessons/inteligencia-artificial/prompt-engineering-com-fundamento";
import { quantizacaoDeModelosLesson } from "../lessons/inteligencia-artificial/quantizacao-de-modelos";
import { ragRetrievalAugmentedGenerationLesson } from "../lessons/inteligencia-artificial/rag-retrieval-augmented-generation";
import { segurancaLlmsPromptInjectionLesson } from "../lessons/inteligencia-artificial/seguranca-llms-prompt-injection";
import { treinoValidacaoTesteLesson } from "../lessons/inteligencia-artificial/treino-validacao-teste-vazamento-dados";
import { deteccaoDeObjetosYoloLesson } from "../lessons/visao-computacional/deteccao-de-objetos-yolo";
import { ocrDocumentAiLesson } from "../lessons/visao-computacional/ocr-document-ai";
import { categories } from "./categories";

const extraLessonModules: LessonModule[] = [
  alucinacoesEmIaLesson,
  promptEngineeringComFundamentoLesson,
  ragRetrievalAugmentedGenerationLesson,
  chunkingRankingBasesVetoriaisLesson,
  avaliacaoDeLlmsLesson,
  quantizacaoDeModelosLesson,
  inferenciaLatenciaBatchingThroughputLesson,
  destilacaoCompressaoModelosLesson,
  gpusVramCustoRealIaLesson,
  mlopsEssencialLesson,
  segurancaLlmsPromptInjectionLesson,
  privacidadePiiDadosSensiveisIaLesson,
  avaliacaoContinuaMonitoramentoProducaoLesson,
  oQueEAprendizadoDeMaquinaLesson,
  paradigmasAprendizadoLesson,
  treinoValidacaoTesteLesson,
  overfittingUnderfittingRegularizacaoLesson,
  deteccaoDeObjetosYoloLesson,
  ocrDocumentAiLesson,
  diffusionModelsLesson,
  gansVsDiffusionLesson,
  iaMultimodalLesson,
  clipAlinhamentoTextoImagemLesson,
  audioFalaAsrTtsLesson,
];

export const lessonModules: LessonModule[] = [...baseLessonModules];
for (const lessonModule of extraLessonModules) {
  if (!lessonModules.some((existingModule) => existingModule.content.id === lessonModule.content.id)) {
    lessonModules.push(lessonModule);
  }
}

export const contents = lessonModules.map((lessonModule) => lessonModule.content);

export function getLessonModuleById(contentId: string) {
  return lessonModules.find((lessonModule) => lessonModule.content.id === contentId);
}

export function getCategoryById(categoryId: string) {
  return categories.find((category) => category.id === categoryId);
}

export function getContentById(contentId: string) {
  return baseContents.find((content) => content.id === contentId) ??
    contents.find((content) => content.id === contentId);
}

export function getContentsByCategory(categoryId: string) {
  return contents.filter(
    (content) =>
      content.primaryCategoryId === categoryId || content.secondaryCategoryId === categoryId,
  );
}
