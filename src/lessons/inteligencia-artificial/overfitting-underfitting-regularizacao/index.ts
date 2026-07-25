import type { LessonModule } from "../../../types/content";
import { overfittingUnderfittingRegularizacaoContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const overfittingUnderfittingRegularizacaoLesson = {
  content: overfittingUnderfittingRegularizacaoContent,
  visuals,
  interactions,
} satisfies LessonModule;
