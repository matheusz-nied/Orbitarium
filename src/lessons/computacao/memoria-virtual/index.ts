import type { LessonModule } from "../../../types/content";
import { memoriaVirtualContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const memoriaVirtualLesson = {
  content: memoriaVirtualContent,
  visuals,
  interactions,
} satisfies LessonModule;
