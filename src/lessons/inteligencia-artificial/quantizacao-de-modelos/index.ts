import type { LessonModule } from "../../../types/content";
import { quantizacaoDeModelosContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const quantizacaoDeModelosLesson = {
  content: quantizacaoDeModelosContent,
  visuals,
  interactions,
} satisfies LessonModule;
