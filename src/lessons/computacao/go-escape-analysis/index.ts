import type { LessonModule } from "../../../types/content";
import { goEscapeAnalysisContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const goEscapeAnalysisLesson = {
  content: goEscapeAnalysisContent,
  visuals,
  interactions,
} satisfies LessonModule;
