import type { LessonModule } from "../../../types/content";
import { ocrDocumentAiContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const ocrDocumentAiLesson = {
  content: ocrDocumentAiContent,
  visuals,
  interactions,
} satisfies LessonModule;
