import type { LessonModule } from "../../../types/content";
import { contornosAreaPerimetroBoundingBoxContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const contornosAreaPerimetroBoundingBoxLesson = {
  content: contornosAreaPerimetroBoundingBoxContent,
  visuals,
  interactions,
} satisfies LessonModule;
