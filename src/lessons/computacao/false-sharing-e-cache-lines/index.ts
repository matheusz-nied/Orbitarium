import type { LessonModule } from "../../../types/content";
import { falseSharingECacheLinesContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const falseSharingECacheLinesLesson = {
  content: falseSharingECacheLinesContent,
  visuals,
  interactions,
} satisfies LessonModule;
