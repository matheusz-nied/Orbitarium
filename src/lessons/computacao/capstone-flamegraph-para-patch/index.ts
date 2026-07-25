import type { LessonModule } from "../../../types/content";
import { capstoneFlamegraphParaPatchContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const capstoneFlamegraphParaPatchLesson = {
  content: capstoneFlamegraphParaPatchContent,
  visuals,
  interactions,
} satisfies LessonModule;
