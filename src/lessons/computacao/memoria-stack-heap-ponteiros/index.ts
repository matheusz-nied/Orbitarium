import type { LessonModule } from "../../../types/content";
import { memoriaStackHeapPonteirosContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const memoriaStackHeapPonteirosLesson = {
  content: memoriaStackHeapPonteirosContent,
  visuals,
  interactions,
} satisfies LessonModule;
