import type { LessonModule } from "../../../types/content";
import { consistenciaDeMemoriaEOrderingContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const consistenciaDeMemoriaEOrderingLesson = {
  content: consistenciaDeMemoriaEOrderingContent,
  visuals,
  interactions,
} satisfies LessonModule;
