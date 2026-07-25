import type { LessonModule } from "../../../types/content";
import { autenticacaoEAutorizacaoContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const autenticacaoEAutorizacaoLesson = {
  content: autenticacaoEAutorizacaoContent,
  visuals,
  interactions,
} satisfies LessonModule;
