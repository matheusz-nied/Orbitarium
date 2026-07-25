export { categories } from "./categories";

import type { LessonModule } from "../types/content";
import {
  contents as baseContents,
  lessonModules as baseLessonModules,
} from "../lessons";
import { alucinacoesEmIaLesson } from "../lessons/inteligencia-artificial/alucinacoes-em-ia";
import { avaliacaoDeLlmsLesson } from "../lessons/inteligencia-artificial/avaliacao-de-llms";
import { chunkingRankingBasesVetoriaisLesson } from "../lessons/inteligencia-artificial/chunking-ranking-bases-vetoriais";
import { oQueEAprendizadoDeMaquinaLesson } from "../lessons/inteligencia-artificial/o-que-e-aprendizado-de-maquina";
import { overfittingUnderfittingRegularizacaoLesson } from "../lessons/inteligencia-artificial/overfitting-underfitting-regularizacao";
import { paradigmasAprendizadoLesson } from "../lessons/inteligencia-artificial/paradigmas-aprendizado-supervisionado-nao-supervisionado-reforco";
import { promptEngineeringComFundamentoLesson } from "../lessons/inteligencia-artificial/prompt-engineering-com-fundamento";
import { ragRetrievalAugmentedGenerationLesson } from "../lessons/inteligencia-artificial/rag-retrieval-augmented-generation";
import { treinoValidacaoTesteLesson } from "../lessons/inteligencia-artificial/treino-validacao-teste-vazamento-dados";
import { categories } from "./categories";

const extraLessonModules: LessonModule[] = [
  alucinacoesEmIaLesson,
  promptEngineeringComFundamentoLesson,
  ragRetrievalAugmentedGenerationLesson,
  chunkingRankingBasesVetoriaisLesson,
  avaliacaoDeLlmsLesson,
  oQueEAprendizadoDeMaquinaLesson,
  paradigmasAprendizadoLesson,
  treinoValidacaoTesteLesson,
  overfittingUnderfittingRegularizacaoLesson,
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
