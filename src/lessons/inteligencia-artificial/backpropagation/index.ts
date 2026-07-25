import type { LessonModule } from "../../../types/content";
import { backpropagationContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const backpropagationLesson = {
  content: backpropagationContent,
  visuals,
  interactions,
} satisfies LessonModule;
