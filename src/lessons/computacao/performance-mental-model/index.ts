import type { LessonModule } from "../../../types/content";
import { performanceMentalModelContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const performanceMentalModelLesson = {
  content: performanceMentalModelContent,
  visuals,
  interactions,
} satisfies LessonModule;
