import type { LessonModule } from "../../../types/content";
import { comoFuncionaUmCompiladorContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const comoFuncionaUmCompiladorLesson = {
  content: comoFuncionaUmCompiladorContent,
  visuals,
  interactions,
} satisfies LessonModule;
