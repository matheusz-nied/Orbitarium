import type { LessonModule } from "../../../types/content";
import { positionalEncodingJanelaContextoContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const positionalEncodingJanelaContextoLesson = {
  content: positionalEncodingJanelaContextoContent,
  visuals,
  interactions,
} satisfies LessonModule;
