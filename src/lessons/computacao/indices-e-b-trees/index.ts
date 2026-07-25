import type { LessonModule } from "../../../types/content";
import { indicesEBTreesContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const indicesEBTreesLesson = {
  content: indicesEBTreesContent,
  visuals,
  interactions,
} satisfies LessonModule;
