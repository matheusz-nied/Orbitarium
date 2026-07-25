import type { LessonModule } from "../../../types/content";
import { ferramentasFunctionCallingGroundingContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const ferramentasFunctionCallingGroundingLesson = {
  content: ferramentasFunctionCallingGroundingContent,
  visuals,
  interactions,
} satisfies LessonModule;
