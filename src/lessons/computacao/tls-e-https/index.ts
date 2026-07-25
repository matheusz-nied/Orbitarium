import type { LessonModule } from "../../../types/content";
import { tlsEHttpsContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const tlsEHttpsLesson = {
  content: tlsEHttpsContent,
  visuals,
  interactions,
} satisfies LessonModule;
