import type { LessonModule } from "../../../types/content";
import { probabilidadeParaIaContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const probabilidadeParaIaLesson = {
  content: probabilidadeParaIaContent,
  visuals,
  interactions,
} satisfies LessonModule;

