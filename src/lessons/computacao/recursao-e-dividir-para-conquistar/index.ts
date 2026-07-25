import type { LessonModule } from "../../../types/content";
import { recursaoEDividirParaConquistarContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const recursaoEDividirParaConquistarLesson = {
  content: recursaoEDividirParaConquistarContent,
  visuals,
  interactions,
} satisfies LessonModule;
