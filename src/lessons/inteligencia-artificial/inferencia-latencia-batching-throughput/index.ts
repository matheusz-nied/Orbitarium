import type { LessonModule } from "../../../types/content";
import { inferenciaLatenciaBatchingThroughputContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const inferenciaLatenciaBatchingThroughputLesson = {
  content: inferenciaLatenciaBatchingThroughputContent,
  visuals,
  interactions,
} satisfies LessonModule;
