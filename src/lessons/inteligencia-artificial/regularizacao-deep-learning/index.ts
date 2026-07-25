import type { LessonModule } from "../../../types/content";
import { regularizacaoDeepLearningContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const regularizacaoDeepLearningLesson = {
  content: regularizacaoDeepLearningContent,
  visuals,
  interactions,
} satisfies LessonModule;
