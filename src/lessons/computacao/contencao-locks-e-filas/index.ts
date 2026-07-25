import type { LessonModule } from "../../../types/content";
import { contencaoLocksEFilasContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const contencaoLocksEFilasLesson = {
  content: contencaoLocksEFilasContent,
  visuals,
  interactions,
} satisfies LessonModule;
