import type { LessonModule } from "../../../types/content";
import { goSyncAtomicMutexContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const goSyncAtomicMutexLesson = {
  content: goSyncAtomicMutexContent,
  visuals,
  interactions,
} satisfies LessonModule;
