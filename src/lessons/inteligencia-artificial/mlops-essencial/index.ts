import type { LessonModule } from "../../../types/content";
import { mlopsEssencialContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const mlopsEssencialLesson = {
  content: mlopsEssencialContent,
  visuals,
  interactions,
} satisfies LessonModule;
