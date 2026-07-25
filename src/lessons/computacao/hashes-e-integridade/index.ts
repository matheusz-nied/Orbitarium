import type { LessonModule } from "../../../types/content";
import { hashesEIntegridadeContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const hashesEIntegridadeLesson = {
  content: hashesEIntegridadeContent,
  visuals,
  interactions,
} satisfies LessonModule;
