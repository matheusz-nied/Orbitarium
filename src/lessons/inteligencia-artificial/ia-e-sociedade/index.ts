import type { LessonModule } from "../../../types/content";
import { iaESociedadeContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const iaESociedadeLesson = {
  content: iaESociedadeContent,
  visuals,
  interactions,
} satisfies LessonModule;
