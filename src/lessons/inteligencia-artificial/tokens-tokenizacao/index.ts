import type { LessonModule } from "../../../types/content";
import { tokensTokenizacaoContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const tokensTokenizacaoLesson = {
  content: tokensTokenizacaoContent,
  visuals,
  interactions,
} satisfies LessonModule;
