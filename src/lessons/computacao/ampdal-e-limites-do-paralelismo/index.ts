import type { LessonModule } from "../../../types/content";
import { ampdalELimitesDoParalelismoContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const ampdalELimitesDoParalelismoLesson = {
  content: ampdalELimitesDoParalelismoContent,
  visuals,
  interactions,
} satisfies LessonModule;
