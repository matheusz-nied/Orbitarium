import type { LessonModule } from "../../../types/content";
import { ssdEStorageContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const ssdEStorageLesson = {
  content: ssdEStorageContent,
  visuals,
  interactions,
} satisfies LessonModule;
