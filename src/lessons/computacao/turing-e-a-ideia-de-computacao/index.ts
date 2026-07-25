import type { LessonModule } from "../../../types/content";
import { turingEAIdeiaDeComputacaoContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const turingEAIdeiaDeComputacaoLesson = {
  content: turingEAIdeiaDeComputacaoContent,
  visuals,
  interactions,
} satisfies LessonModule;
