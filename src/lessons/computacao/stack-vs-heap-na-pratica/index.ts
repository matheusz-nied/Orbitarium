import type { LessonModule } from "../../../types/content";
import { stackVsHeapNaPraticaContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const stackVsHeapNaPraticaLesson = {
  content: stackVsHeapNaPraticaContent,
  visuals,
  interactions,
} satisfies LessonModule;
