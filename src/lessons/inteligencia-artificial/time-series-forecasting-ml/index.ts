import type { LessonModule } from "../../../types/content";
import { timeSeriesForecastingMlContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const timeSeriesForecastingMlLesson = {
  content: timeSeriesForecastingMlContent,
  visuals,
  interactions,
} satisfies LessonModule;
