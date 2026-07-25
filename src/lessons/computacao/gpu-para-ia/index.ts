import type { LessonModule } from "../../../types/content";
import { gpuParaIaContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const gpuParaIaLesson = {
  content: gpuParaIaContent,
  visuals,
  interactions,
} satisfies LessonModule;
