import type { LessonModule } from "../../../types/content";
import { sistemaDeArquivosContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const sistemaDeArquivosLesson = {
  content: sistemaDeArquivosContent,
  visuals,
  interactions,
} satisfies LessonModule;
