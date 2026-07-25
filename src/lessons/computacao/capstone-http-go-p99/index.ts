import type { LessonModule } from "../../../types/content";
import { capstoneHttpGoP99Content } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const capstoneHttpGoP99Lesson = {
  content: capstoneHttpGoP99Content,
  visuals,
  interactions,
} satisfies LessonModule;
