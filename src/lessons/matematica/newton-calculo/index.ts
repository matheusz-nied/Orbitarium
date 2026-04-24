import type { LessonModule } from "../../../types/content";
import { newtonCalculoContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const newtonCalculoLesson = {
  content: newtonCalculoContent,
  visuals,
  interactions,
} satisfies LessonModule;
