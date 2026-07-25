import type { LessonModule } from "../../../types/content";
import { viesVarianciaErroIrredutivelContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const viesVarianciaErroIrredutivelLesson = {
  content: viesVarianciaErroIrredutivelContent,
  visuals,
  interactions,
} satisfies LessonModule;
