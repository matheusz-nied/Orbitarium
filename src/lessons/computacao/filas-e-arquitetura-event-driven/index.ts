import type { LessonModule } from "../../../types/content";
import { filasEArquiteturaEventDrivenContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const filasEArquiteturaEventDrivenLesson = {
  content: filasEArquiteturaEventDrivenContent,
  visuals,
  interactions,
} satisfies LessonModule;
