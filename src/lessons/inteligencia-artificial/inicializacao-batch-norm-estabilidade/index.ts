import type { LessonModule } from "../../../types/content";
import { inicializacaoBatchNormEstabilidadeContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const inicializacaoBatchNormEstabilidadeLesson = {
  content: inicializacaoBatchNormEstabilidadeContent,
  visuals,
  interactions,
} satisfies LessonModule;
