import type { LessonModule } from "../../../types/content";
import { metodologiaDeOtimizacaoContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const metodologiaDeOtimizacaoLesson = {
  content: metodologiaDeOtimizacaoContent,
  visuals,
  interactions,
} satisfies LessonModule;
