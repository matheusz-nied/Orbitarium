import type { LessonModule } from "../../../types/content";
import { sistemasDistribuidosFundamentosContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const sistemasDistribuidosFundamentosLesson = {
  content: sistemasDistribuidosFundamentosContent,
  visuals,
  interactions,
} satisfies LessonModule;
