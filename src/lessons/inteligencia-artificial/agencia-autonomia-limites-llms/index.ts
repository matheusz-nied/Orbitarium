import type { LessonModule } from "../../../types/content";
import { agenciaAutonomiaLimitesLlmsContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const agenciaAutonomiaLimitesLlmsLesson = {
  content: agenciaAutonomiaLimitesLlmsContent,
  visuals,
  interactions,
} satisfies LessonModule;
