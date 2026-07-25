import type { LessonModule } from "../../../types/content";
import { privacidadePiiDadosSensiveisIaContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const privacidadePiiDadosSensiveisIaLesson = {
  content: privacidadePiiDadosSensiveisIaContent,
  visuals,
  interactions,
} satisfies LessonModule;
