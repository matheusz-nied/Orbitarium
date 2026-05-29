import type { LessonModule } from "../../../types/content";
import { segmentacaoSemanticaContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const segmentacaoSemanticaLesson = {
  content: segmentacaoSemanticaContent,
  visuals,
  interactions,
} satisfies LessonModule;
