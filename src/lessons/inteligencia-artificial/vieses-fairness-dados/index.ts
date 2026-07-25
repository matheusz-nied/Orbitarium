import type { LessonModule } from "../../../types/content";
import { viesesFairnessDadosContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const viesesFairnessDadosLesson = {
  content: viesesFairnessDadosContent,
  visuals,
  interactions,
} satisfies LessonModule;
