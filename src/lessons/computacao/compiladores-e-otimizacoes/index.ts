import type { LessonModule } from "../../../types/content";
import { compiladoresEOtimizacoesContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const compiladoresEOtimizacoesLesson = {
  content: compiladoresEOtimizacoesContent,
  visuals,
  interactions,
} satisfies LessonModule;
