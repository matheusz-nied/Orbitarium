import type { LessonModule } from "../../../types/content";
import { rooflineModeloDePerformanceContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const rooflineModeloDePerformanceLesson = {
  content: rooflineModeloDePerformanceContent,
  visuals,
  interactions,
} satisfies LessonModule;
