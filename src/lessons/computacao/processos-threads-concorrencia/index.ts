import type { LessonModule } from "../../../types/content";
import { processosThreadsConcorrenciaContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const processosThreadsConcorrenciaLesson = {
  content: processosThreadsConcorrenciaContent,
  visuals,
  interactions,
} satisfies LessonModule;
