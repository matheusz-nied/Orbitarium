import type { LessonModule } from "../../../types/content";
import { pipelineDeCpuContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const pipelineDeCpuLesson = {
  content: pipelineDeCpuContent,
  visuals,
  interactions,
} satisfies LessonModule;
