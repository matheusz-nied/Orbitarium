import type { LessonModule } from "../../../types/content";
import { agentesDeIaContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const agentesDeIaLesson = {
  content: agentesDeIaContent,
  visuals,
  interactions,
} satisfies LessonModule;
