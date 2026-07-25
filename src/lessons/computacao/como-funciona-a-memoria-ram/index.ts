import type { LessonModule } from "../../../types/content";
import { comoFuncionaAMemoriaRamContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const comoFuncionaAMemoriaRamLesson = {
  content: comoFuncionaAMemoriaRamContent,
  visuals,
  interactions,
} satisfies LessonModule;
