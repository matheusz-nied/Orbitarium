import type { LessonModule } from "../../../types/content";
import { decodingTemperatureTopKTopPContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const decodingTemperatureTopKTopPLesson = {
  content: decodingTemperatureTopKTopPContent,
  visuals,
  interactions,
} satisfies LessonModule;
