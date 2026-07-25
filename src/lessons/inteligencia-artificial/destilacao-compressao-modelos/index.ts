import type { LessonModule } from "../../../types/content";
import { destilacaoCompressaoModelosContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const destilacaoCompressaoModelosLesson = {
  content: destilacaoCompressaoModelosContent,
  visuals,
  interactions,
} satisfies LessonModule;
