import type { LessonModule } from "../../../types/content";
import { imagensBinariasLimiarizacaoHistogramasContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const imagensBinariasLimiarizacaoHistogramasLesson = {
  content: imagensBinariasLimiarizacaoHistogramasContent,
  visuals,
  interactions,
} satisfies LessonModule;
