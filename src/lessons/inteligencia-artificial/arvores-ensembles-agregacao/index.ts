import type { LessonModule } from "../../../types/content";
import { arvoresEnsemblesAgregacaoContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const arvoresEnsemblesAgregacaoLesson = {
  content: arvoresEnsemblesAgregacaoContent,
  visuals,
  interactions,
} satisfies LessonModule;
