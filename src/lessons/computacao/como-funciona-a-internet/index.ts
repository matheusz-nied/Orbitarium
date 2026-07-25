import type { LessonModule } from "../../../types/content";
import { comoFuncionaAInternetContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const comoFuncionaAInternetLesson = {
  content: comoFuncionaAInternetContent,
  visuals,
  interactions,
} satisfies LessonModule;
