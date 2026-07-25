import type { LessonModule } from "../../../types/content";
import { debuggingNativoContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const debuggingNativoLesson = {
  content: debuggingNativoContent,
  visuals,
  interactions,
} satisfies LessonModule;
