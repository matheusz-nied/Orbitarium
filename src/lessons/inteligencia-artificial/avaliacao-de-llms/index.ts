import type { LessonModule } from "../../../types/content";
import { avaliacaoDeLlmsContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const avaliacaoDeLlmsLesson = {
  content: avaliacaoDeLlmsContent,
  visuals,
  interactions,
} satisfies LessonModule;
