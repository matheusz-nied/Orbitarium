import type { LessonModule } from "../../../types/content";
import { cnnsRedesConvolucionaisContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const cnnsRedesConvolucionaisLesson = {
  content: cnnsRedesConvolucionaisContent,
  visuals,
  interactions,
} satisfies LessonModule;
