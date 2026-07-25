import type { LessonModule } from "../../../types/content";
import { diffusionModelsContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const diffusionModelsLesson = {
  content: diffusionModelsContent,
  visuals,
  interactions,
} satisfies LessonModule;
