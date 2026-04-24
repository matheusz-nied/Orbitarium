export { categories } from "./categories";
export { contents, getLessonModuleById, lessonModules } from "../lessons";

import { contents } from "../lessons";
import { categories } from "./categories";

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
