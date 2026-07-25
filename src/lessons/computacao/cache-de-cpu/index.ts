import type { LessonModule } from "../../../types/content";
import { cacheDeCpuContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const cacheDeCpuLesson = {
  content: cacheDeCpuContent,
  visuals,
  interactions,
} satisfies LessonModule;
