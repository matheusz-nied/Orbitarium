import type { LessonModule } from "../../../types/content";
import { rustCollectionsEAlocacaoContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const rustCollectionsEAlocacaoLesson = {
  content: rustCollectionsEAlocacaoContent,
  visuals,
  interactions,
} satisfies LessonModule;
