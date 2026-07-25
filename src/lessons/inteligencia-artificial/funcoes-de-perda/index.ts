import type { LessonModule } from "../../../types/content";
import { funcoesDePerdaContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const funcoesDePerdaLesson = {
  content: funcoesDePerdaContent,
  visuals,
  interactions,
} satisfies LessonModule;
