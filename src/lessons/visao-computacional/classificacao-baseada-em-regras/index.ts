import type { LessonModule } from "../../../types/content";
import { classificacaoBaseadaEmRegrasContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const classificacaoBaseadaEmRegrasLesson = {
  content: classificacaoBaseadaEmRegrasContent,
  visuals,
  interactions,
} satisfies LessonModule;
