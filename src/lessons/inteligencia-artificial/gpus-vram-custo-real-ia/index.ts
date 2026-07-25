import type { LessonModule } from "../../../types/content";
import { gpusVramCustoRealIaContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const gpusVramCustoRealIaLesson = {
  content: gpusVramCustoRealIaContent,
  visuals,
  interactions,
} satisfies LessonModule;
