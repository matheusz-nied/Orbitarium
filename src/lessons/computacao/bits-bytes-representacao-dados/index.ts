import type { LessonModule } from "../../../types/content";
import { bitsBytesRepresentacaoDadosContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const bitsBytesRepresentacaoDadosLesson = {
  content: bitsBytesRepresentacaoDadosContent,
  visuals,
  interactions,
} satisfies LessonModule;
