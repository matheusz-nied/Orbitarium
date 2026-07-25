import type { LessonModule } from "../../../types/content";
import { apisRestContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const apisRestLesson = {
  content: apisRestContent,
  visuals,
  interactions,
} satisfies LessonModule;
