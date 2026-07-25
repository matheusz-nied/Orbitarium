import type { LessonModule } from "../../../types/content";
import { memoriaEstadoOrquestracaoWorkflowsContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const memoriaEstadoOrquestracaoWorkflowsLesson = {
  content: memoriaEstadoOrquestracaoWorkflowsContent,
  visuals,
  interactions,
} satisfies LessonModule;
