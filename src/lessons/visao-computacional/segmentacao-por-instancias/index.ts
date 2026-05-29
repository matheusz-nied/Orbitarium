import type { LessonModule } from "../../../types/content";
import { segmentacaoPorInstanciasContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const segmentacaoPorInstanciasLesson = {
  content: segmentacaoPorInstanciasContent,
  visuals,
  interactions,
} satisfies LessonModule;
