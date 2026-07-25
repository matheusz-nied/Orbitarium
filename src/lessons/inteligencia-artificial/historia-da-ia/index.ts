import type { LessonModule } from "../../../types/content";
import { historiaDaIaContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const historiaDaIaLesson = {
  content: historiaDaIaContent,
  visuals,
  interactions,
} satisfies LessonModule;
