import type { LessonModule } from "../../../types/content";
import { thresholdingGlobalOtsuAdaptativoContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const thresholdingGlobalOtsuAdaptativoLesson = {
  content: thresholdingGlobalOtsuAdaptativoContent,
  visuals,
  interactions,
} satisfies LessonModule;
