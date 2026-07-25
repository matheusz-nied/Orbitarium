import type { LessonModule } from "../../../types/content";
import { alucinacoesEmIaContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const alucinacoesEmIaLesson = {
  content: alucinacoesEmIaContent,
  visuals,
  interactions,
} satisfies LessonModule;
