import type { LessonModule } from "../../../types/content";
import { adjacenciaConectividadeBlobsContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const adjacenciaConectividadeBlobsLesson = {
  content: adjacenciaConectividadeBlobsContent,
  visuals,
  interactions,
} satisfies LessonModule;
