import type { LessonModule } from "../../../types/content";
import { fineTuningELoraContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const fineTuningELoraLesson = {
  content: fineTuningELoraContent,
  visuals,
  interactions,
} satisfies LessonModule;
