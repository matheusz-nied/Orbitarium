import type { LessonModule } from "../../../types/content";
import { gansVsDiffusionContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const gansVsDiffusionLesson = {
  content: gansVsDiffusionContent,
  visuals,
  interactions,
} satisfies LessonModule;
