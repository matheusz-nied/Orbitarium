import type { LessonModule } from "../../../types/content";
import { radiacaoCosmicaDeFundoContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const radiacaoCosmicaDeFundoLesson = {
  content: radiacaoCosmicaDeFundoContent,
  visuals,
  interactions,
} satisfies LessonModule;
