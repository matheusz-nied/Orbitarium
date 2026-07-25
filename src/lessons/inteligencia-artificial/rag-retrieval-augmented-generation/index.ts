import type { LessonModule } from "../../../types/content";
import { ragRetrievalAugmentedGenerationContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const ragRetrievalAugmentedGenerationLesson = {
  content: ragRetrievalAugmentedGenerationContent,
  visuals,
  interactions,
} satisfies LessonModule;
