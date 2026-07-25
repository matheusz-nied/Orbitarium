import type { LessonModule } from "../../../types/content";
import { zeroCopyEBuffersContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const zeroCopyEBuffersLesson = {
  content: zeroCopyEBuffersContent,
  visuals,
  interactions,
} satisfies LessonModule;
