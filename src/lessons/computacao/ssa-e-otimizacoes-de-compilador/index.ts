import type { LessonModule } from "../../../types/content";
import { ssaEOtimizacoesDeCompiladorContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const ssaEOtimizacoesDeCompiladorLesson = {
  content: ssaEOtimizacoesDeCompiladorContent,
  visuals,
  interactions,
} satisfies LessonModule;
