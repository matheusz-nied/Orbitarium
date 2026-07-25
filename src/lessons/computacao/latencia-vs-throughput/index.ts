import type { LessonModule } from "../../../types/content";
import { latenciaVsThroughputContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const latenciaVsThroughputLesson = {
  content: latenciaVsThroughputContent,
  visuals,
  interactions,
} satisfies LessonModule;
