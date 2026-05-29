import type { LessonModule } from "../../../types/content";
import { momentosCentroMassaOrientacaoContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const momentosCentroMassaOrientacaoLesson = {
  content: momentosCentroMassaOrientacaoContent,
  visuals,
  interactions,
} satisfies LessonModule;
