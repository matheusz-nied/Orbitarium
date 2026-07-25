import type { LessonModule } from "../../../types/content";
import { rustTiposTraitsZeroCostContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const rustTiposTraitsZeroCostLesson = {
  content: rustTiposTraitsZeroCostContent,
  visuals,
  interactions,
} satisfies LessonModule;
