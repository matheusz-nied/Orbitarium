import type { LessonModule } from "../../../types/content";
import { networkPerformanceBasicsContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const networkPerformanceBasicsLesson = {
  content: networkPerformanceBasicsContent,
  visuals,
  interactions,
} satisfies LessonModule;
