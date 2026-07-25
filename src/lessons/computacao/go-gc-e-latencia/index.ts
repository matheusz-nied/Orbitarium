import type { LessonModule } from "../../../types/content";
import { goGcELatenciaContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const goGcELatenciaLesson = {
  content: goGcELatenciaContent,
  visuals,
  interactions,
} satisfies LessonModule;
