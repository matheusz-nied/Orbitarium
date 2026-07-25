import type { LessonModule } from "../../../types/content";
import { alinhamentoSftRlhfContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const alinhamentoSftRlhfLesson = {
  content: alinhamentoSftRlhfContent,
  visuals,
  interactions,
} satisfies LessonModule;
