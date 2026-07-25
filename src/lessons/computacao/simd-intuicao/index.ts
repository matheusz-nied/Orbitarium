import type { LessonModule } from "../../../types/content";
import { simdIntuicaoContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const simdIntuicaoLesson = {
  content: simdIntuicaoContent,
  visuals,
  interactions,
} satisfies LessonModule;
