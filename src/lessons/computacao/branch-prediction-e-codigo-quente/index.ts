import type { LessonModule } from "../../../types/content";
import { branchPredictionECodigoQuenteContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const branchPredictionECodigoQuenteLesson = {
  content: branchPredictionECodigoQuenteContent,
  visuals,
  interactions,
} satisfies LessonModule;
