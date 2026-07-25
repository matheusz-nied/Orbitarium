import type { LessonModule } from "../../../types/content";
import { goNetHttpPerformanceContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const goNetHttpPerformanceLesson = {
  content: goNetHttpPerformanceContent,
  visuals,
  interactions,
} satisfies LessonModule;
