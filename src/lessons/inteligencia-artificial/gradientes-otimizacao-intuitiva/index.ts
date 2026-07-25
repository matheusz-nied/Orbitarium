import type { LessonModule } from "../../../types/content";
import { gradientesOtimizacaoIntuitivaContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const gradientesOtimizacaoIntuitivaLesson = {
  content: gradientesOtimizacaoIntuitivaContent,
  visuals,
  interactions,
} satisfies LessonModule;

