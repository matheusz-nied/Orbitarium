import type { LessonModule } from "../../../types/content";
import { goContextCancelamentoContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const goContextCancelamentoLesson = {
  content: goContextCancelamentoContent,
  visuals,
  interactions,
} satisfies LessonModule;
