import type { LessonModule } from "../../../types/content";
import { observabilidadeSistemasLlmContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const observabilidadeSistemasLlmLesson = {
  content: observabilidadeSistemasLlmContent,
  visuals,
  interactions,
} satisfies LessonModule;
