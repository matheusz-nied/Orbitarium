import type { LessonModule } from "../../../types/content";
import { undefinedBehaviorMindsetContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const undefinedBehaviorMindsetLesson = {
  content: undefinedBehaviorMindsetContent,
  visuals,
  interactions,
} satisfies LessonModule;
