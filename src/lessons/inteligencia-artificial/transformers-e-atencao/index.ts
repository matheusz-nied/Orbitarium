import type { LessonModule } from "../../../types/content";
import { transformersEAtencaoContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const transformersEAtencaoLesson = {
  content: transformersEAtencaoContent,
  visuals,
  interactions,
} satisfies LessonModule;