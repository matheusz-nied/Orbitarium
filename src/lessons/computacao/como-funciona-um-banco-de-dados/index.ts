import type { LessonModule } from "../../../types/content";
import { comoFuncionaUmBancoDeDadosContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const comoFuncionaUmBancoDeDadosLesson = {
  content: comoFuncionaUmBancoDeDadosContent,
  visuals,
  interactions,
} satisfies LessonModule;
