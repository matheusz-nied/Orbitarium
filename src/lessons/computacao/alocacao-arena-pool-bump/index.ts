import type { LessonModule } from "../../../types/content";
import { alocacaoArenaPoolBumpContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const alocacaoArenaPoolBumpLesson = {
  content: alocacaoArenaPoolBumpContent,
  visuals,
  interactions,
} satisfies LessonModule;
