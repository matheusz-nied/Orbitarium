import type { LessonModule } from "../../../types/content";
import { linuxPermissoesProcessosContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const linuxPermissoesProcessosLesson = {
  content: linuxPermissoesProcessosContent,
  visuals,
  interactions,
} satisfies LessonModule;
