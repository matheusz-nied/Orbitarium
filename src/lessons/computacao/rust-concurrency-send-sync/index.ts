import type { LessonModule } from "../../../types/content";
import { rustConcurrencySendSyncContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const rustConcurrencySendSyncLesson = {
  content: rustConcurrencySendSyncContent,
  visuals,
  interactions,
} satisfies LessonModule;
