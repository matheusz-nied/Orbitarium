import type { LessonModule } from "../../../types/content";
import { comoFuncionaUmSistemaOperacionalContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const comoFuncionaUmSistemaOperacionalLesson = {
  content: comoFuncionaUmSistemaOperacionalContent,
  visuals,
  interactions,
} satisfies LessonModule;
