import type { LessonModule } from "../../../types/content";
import { rustLifetimesIntuicaoContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const rustLifetimesIntuicaoLesson = {
  content: rustLifetimesIntuicaoContent,
  visuals,
  interactions,
} satisfies LessonModule;
