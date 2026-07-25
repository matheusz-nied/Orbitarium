import type { LessonModule } from "../../../types/content";
import { algoritmosEComplexidadeContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const algoritmosEComplexidadeLesson = {
  content: algoritmosEComplexidadeContent,
  visuals,
  interactions,
} satisfies LessonModule;
