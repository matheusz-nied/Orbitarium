import type { LessonModule } from "../../../types/content";
import { rustErrorHandlingContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const rustErrorHandlingLesson = {
  content: rustErrorHandlingContent,
  visuals,
  interactions,
} satisfies LessonModule;
