import type { LessonModule } from "../../../types/content";
import { observabilidadeDeSistemasContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const observabilidadeDeSistemasLesson = {
  content: observabilidadeDeSistemasContent,
  visuals,
  interactions,
} satisfies LessonModule;
