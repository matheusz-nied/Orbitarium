import type { LessonModule } from "../../../types/content";
import { sistemasDeTiposESoundnessContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const sistemasDeTiposESoundnessLesson = {
  content: sistemasDeTiposESoundnessContent,
  visuals,
  interactions,
} satisfies LessonModule;
