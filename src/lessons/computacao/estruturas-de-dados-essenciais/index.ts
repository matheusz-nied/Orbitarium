import type { LessonModule } from "../../../types/content";
import { estruturasDeDadosEssenciaisContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const estruturasDeDadosEssenciaisLesson = {
  content: estruturasDeDadosEssenciaisContent,
  visuals,
  interactions,
} satisfies LessonModule;
