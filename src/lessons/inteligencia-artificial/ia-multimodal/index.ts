import type { LessonModule } from "../../../types/content";
import { iaMultimodalContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const iaMultimodalLesson = {
  content: iaMultimodalContent,
  visuals,
  interactions,
} satisfies LessonModule;
