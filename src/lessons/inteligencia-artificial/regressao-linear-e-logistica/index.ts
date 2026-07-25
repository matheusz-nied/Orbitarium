import type { LessonModule } from "../../../types/content";
import { regressaoLinearELogisticaContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const regressaoLinearELogisticaLesson = {
  content: regressaoLinearELogisticaContent,
  visuals,
  interactions,
} satisfies LessonModule;
