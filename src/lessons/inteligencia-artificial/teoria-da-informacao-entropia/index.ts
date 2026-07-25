import type { LessonModule } from "../../../types/content";
import { teoriaDaInformacaoEntropiaContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const teoriaDaInformacaoEntropiaLesson = {
  content: teoriaDaInformacaoEntropiaContent,
  visuals,
  interactions,
} satisfies LessonModule;

