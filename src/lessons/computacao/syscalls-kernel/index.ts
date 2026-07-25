import type { LessonModule } from "../../../types/content";
import { syscallsKernelContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const syscallsKernelLesson = {
  content: syscallsKernelContent,
  visuals,
  interactions,
} satisfies LessonModule;
