import type { LessonModule } from "../../../types/content";
import { avaliacaoCientificaClaimsIaContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const avaliacaoCientificaClaimsIaLesson = {
  content: avaliacaoCientificaClaimsIaContent,
  visuals,
  interactions,
} satisfies LessonModule;
