import type { LessonModule } from "../../../types/content";
import { pcieBarramentosContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const pcieBarramentosLesson = {
  content: pcieBarramentosContent,
  visuals,
  interactions,
} satisfies LessonModule;
