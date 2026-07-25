import type { LessonModule } from "../../../types/content";
import { treinoValidacaoTesteContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const treinoValidacaoTesteLesson = {
  content: treinoValidacaoTesteContent,
  visuals,
  interactions,
} satisfies LessonModule;
