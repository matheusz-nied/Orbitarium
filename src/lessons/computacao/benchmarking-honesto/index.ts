import type { LessonModule } from "../../../types/content";
import { benchmarkingHonestoContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const benchmarkingHonestoLesson = {
  content: benchmarkingHonestoContent,
  visuals,
  interactions,
} satisfies LessonModule;
