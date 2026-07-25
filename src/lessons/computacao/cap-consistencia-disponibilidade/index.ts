import type { LessonModule } from "../../../types/content";
import { capConsistenciaDisponibilidadeContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const capConsistenciaDisponibilidadeLesson = {
  content: capConsistenciaDisponibilidadeContent,
  visuals,
  interactions,
} satisfies LessonModule;
