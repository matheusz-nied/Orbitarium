import type { LessonModule } from "../../../types/content";
import { comoUmProgramaViraProcessoContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const comoUmProgramaViraProcessoLesson = {
  content: comoUmProgramaViraProcessoContent,
  visuals,
  interactions,
} satisfies LessonModule;
