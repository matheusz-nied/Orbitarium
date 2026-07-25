import type { LessonModule } from "../../../types/content";
import { algebraLinearEssencialIaContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const algebraLinearEssencialIaLesson = {
  content: algebraLinearEssencialIaContent,
  visuals,
  interactions,
} satisfies LessonModule;

