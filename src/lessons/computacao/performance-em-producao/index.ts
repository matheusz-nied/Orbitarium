import type { LessonModule } from "../../../types/content";
import { performanceEmProducaoContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const performanceEmProducaoLesson = {
  content: performanceEmProducaoContent,
  visuals,
  interactions,
} satisfies LessonModule;
