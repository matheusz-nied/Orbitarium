import type { LessonModule } from "../../../types/content";
import { paradigmasAprendizadoContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const paradigmasAprendizadoLesson = {
  content: paradigmasAprendizadoContent,
  visuals,
  interactions,
} satisfies LessonModule;
