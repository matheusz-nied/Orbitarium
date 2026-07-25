import type { LessonModule } from "../../../types/content";
import { segurancaDeMemoriaContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const segurancaDeMemoriaLesson = {
  content: segurancaDeMemoriaContent,
  visuals,
  interactions,
} satisfies LessonModule;
