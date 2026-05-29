import type { LessonModule } from "../../../types/content";
import { fundamentosImagensDigitaisSegmentacaoContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const fundamentosImagensDigitaisSegmentacaoLesson = {
  content: fundamentosImagensDigitaisSegmentacaoContent,
  visuals,
  interactions,
} satisfies LessonModule;
