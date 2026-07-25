export { categories } from "./categories";

import { lessonModules as baseLessonModules } from "../lessons";
import { computacaoLessonModules } from "../lessons/computacao";
import { goContextCancelamentoLesson } from "../lessons/computacao/go-context-cancelamento";
import { goNetHttpPerformanceLesson } from "../lessons/computacao/go-net-http-performance";
import { goPprofEBenchmarksLesson } from "../lessons/computacao/go-pprof-e-benchmarks";
import { goSyncAtomicMutexLesson } from "../lessons/computacao/go-sync-atomic-mutex";
import { goVsRustQuandoUsarLesson } from "../lessons/computacao/go-vs-rust-quando-usar";
import { rustOwnershipBorrowingLesson } from "../lessons/computacao/rust-ownership-borrowing";
import { rustLifetimesIntuicaoLesson } from "../lessons/computacao/rust-lifetimes-intuicao";
import { rustTiposTraitsZeroCostLesson } from "../lessons/computacao/rust-tipos-traits-zero-cost";
import { rustErrorHandlingLesson } from "../lessons/computacao/rust-error-handling";
import { rustCollectionsEAlocacaoLesson } from "../lessons/computacao/rust-collections-e-alocacao";
import { categories } from "./categories";

export const lessonModules = [
  ...baseLessonModules,
  ...computacaoLessonModules,
  goSyncAtomicMutexLesson,
  goPprofEBenchmarksLesson,
  goNetHttpPerformanceLesson,
  goContextCancelamentoLesson,
  goVsRustQuandoUsarLesson,
  rustOwnershipBorrowingLesson,
  rustLifetimesIntuicaoLesson,
  rustTiposTraitsZeroCostLesson,
  rustErrorHandlingLesson,
  rustCollectionsEAlocacaoLesson,
];
export const contents = lessonModules.map((lessonModule) => lessonModule.content);

export function getLessonModuleById(contentId: string) {
  return lessonModules.find((lessonModule) => lessonModule.content.id === contentId);
}

export function getCategoryById(categoryId: string) {
  return categories.find((category) => category.id === categoryId);
}

export function getContentById(contentId: string) {
  return contents.find((content) => content.id === contentId);
}

export function getContentsByCategory(categoryId: string) {
  return contents.filter(
    (content) =>
      content.primaryCategoryId === categoryId || content.secondaryCategoryId === categoryId,
  );
}
