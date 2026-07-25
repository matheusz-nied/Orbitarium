import type { LessonModule } from "../../../types/content";
import { httpCachingContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const httpCachingLesson = {
  content: httpCachingContent,
  visuals,
  interactions,
} satisfies LessonModule;
