import type { LessonModule } from "../../../types/content";
import { cpuBoundIoBoundMemoryBoundContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const cpuBoundIoBoundMemoryBoundLesson = {
  content: cpuBoundIoBoundMemoryBoundContent,
  visuals,
  interactions,
} satisfies LessonModule;
