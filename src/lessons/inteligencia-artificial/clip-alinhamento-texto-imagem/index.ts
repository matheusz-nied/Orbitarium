import type { LessonModule } from "../../../types/content";
import { clipAlinhamentoTextoImagemContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const clipAlinhamentoTextoImagemLesson = {
  content: clipAlinhamentoTextoImagemContent,
  visuals,
  interactions,
} satisfies LessonModule;
