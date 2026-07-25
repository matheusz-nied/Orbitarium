import type { LessonModule } from "../../../types/content";
import { rustUnsafeBoundariesContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const rustUnsafeBoundariesLesson = {
  content: rustUnsafeBoundariesContent,
  visuals,
  interactions,
} satisfies LessonModule;
