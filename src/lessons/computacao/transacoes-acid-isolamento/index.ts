import type { LessonModule } from "../../../types/content";
import { transacoesAcidIsolamentoContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const transacoesAcidIsolamentoLesson = {
  content: transacoesAcidIsolamentoContent,
  visuals,
  interactions,
} satisfies LessonModule;
