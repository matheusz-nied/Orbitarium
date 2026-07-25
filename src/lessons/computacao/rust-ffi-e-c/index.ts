import type { LessonModule } from "../../../types/content";
import { rustFfiECContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const rustFfiECLesson = {
  content: rustFfiECContent,
  visuals,
  interactions,
} satisfies LessonModule;
