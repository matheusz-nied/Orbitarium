import type { LessonModule } from "../../../types/content";
import { redesNeuraisDoZeroContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const redesNeuraisDoZeroLesson = {
  content: redesNeuraisDoZeroContent,
  visuals,
  interactions,
} satisfies LessonModule;
