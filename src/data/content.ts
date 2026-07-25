export { categories } from "./categories";

import { lessonModules as baseLessonModules } from "../lessons";
import { computacaoLessonModules } from "../lessons/computacao";
import { categories } from "./categories";

export const lessonModules = [...baseLessonModules, ...computacaoLessonModules];
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
