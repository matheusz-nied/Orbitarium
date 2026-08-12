import type { LessonModule } from "../../../types/content";
import { teoriaDeSchedulingContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const teoriaDeSchedulingLesson = {
  content: teoriaDeSchedulingContent,
  visuals,
  interactions,
} satisfies LessonModule;
