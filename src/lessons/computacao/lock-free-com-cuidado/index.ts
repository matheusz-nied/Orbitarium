import type { LessonModule } from "../../../types/content";
import { interactions } from "./interactions";
import { lockFreeComCuidadoContent } from "./content";
import { visuals } from "./visuals";

export const lockFreeComCuidadoLesson = {
  content: lockFreeComCuidadoContent,
  visuals,
  interactions,
} satisfies LessonModule;
