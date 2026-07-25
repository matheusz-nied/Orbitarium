import type { LessonModule } from "../../../types/content";
import { balanceamentoECdnContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const balanceamentoECdnLesson = {
  content: balanceamentoECdnContent,
  visuals,
  interactions,
} satisfies LessonModule;
