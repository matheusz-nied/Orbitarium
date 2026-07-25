import type { LessonModule } from "../../../types/content";
import { goGoroutinesSchedulerContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const goGoroutinesSchedulerLesson = {
  content: goGoroutinesSchedulerContent,
  visuals,
  interactions,
} satisfies LessonModule;
