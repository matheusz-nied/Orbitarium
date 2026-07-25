import type { LessonModule } from "../../../types/content";
import { goModeloMentalContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const goModeloMentalLesson = {
  content: goModeloMentalContent,
  visuals,
  interactions,
} satisfies LessonModule;
