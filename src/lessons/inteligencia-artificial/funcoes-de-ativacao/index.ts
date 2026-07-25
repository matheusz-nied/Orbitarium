import type { LessonModule } from "../../../types/content";
import { funcoesDeAtivacaoContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const funcoesDeAtivacaoLesson = {
  content: funcoesDeAtivacaoContent,
  visuals,
  interactions,
} satisfies LessonModule;
