import type { LessonModule } from "../../../types/content";
import { transferLearningFineTuningRedesContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const transferLearningFineTuningRedesLesson = {
  content: transferLearningFineTuningRedesContent,
  visuals,
  interactions,
} satisfies LessonModule;
