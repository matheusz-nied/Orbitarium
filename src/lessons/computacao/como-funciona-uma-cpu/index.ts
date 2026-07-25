import type { LessonModule } from "../../../types/content";
import { comoFuncionaUmaCpuContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const comoFuncionaUmaCpuLesson = {
  content: comoFuncionaUmaCpuContent,
  visuals,
  interactions,
} satisfies LessonModule;
