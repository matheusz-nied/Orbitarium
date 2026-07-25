import type { LessonModule } from "../../../types/content";
import { custoDeAbstracoesContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const custoDeAbstracoesLesson = {
  content: custoDeAbstracoesContent,
  visuals,
  interactions,
} satisfies LessonModule;
