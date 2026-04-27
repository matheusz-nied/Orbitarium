import type { LessonModule } from "../../../types/content";
import { comoFuncionaUmLlmContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const comoFuncionaUmLlmLesson = {
  content: comoFuncionaUmLlmContent,
  visuals,
  interactions,
} satisfies LessonModule;
