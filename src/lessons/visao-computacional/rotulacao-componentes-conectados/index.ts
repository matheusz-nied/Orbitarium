import type { LessonModule } from "../../../types/content";
import { rotulacaoComponentesConectadosContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const rotulacaoComponentesConectadosLesson = {
  content: rotulacaoComponentesConectadosContent,
  visuals,
  interactions,
} satisfies LessonModule;
