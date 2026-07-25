import type { LessonModule } from "../../../types/content";
import { medirAntesDeOtimizarContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const medirAntesDeOtimizarLesson = {
  content: medirAntesDeOtimizarContent,
  visuals,
  interactions,
} satisfies LessonModule;
