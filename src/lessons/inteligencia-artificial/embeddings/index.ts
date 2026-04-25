import type { LessonModule } from "../../../types/content";
import { embeddingsContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const embeddingsLesson = {
  content: embeddingsContent,
  visuals,
  interactions,
} satisfies LessonModule;
