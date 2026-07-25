import type { LessonModule } from "../../../types/content";
import { rustToolingCargoPerfContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const rustToolingCargoPerfLesson = {
  content: rustToolingCargoPerfContent,
  visuals,
  interactions,
} satisfies LessonModule;
