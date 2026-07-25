import type { LessonModule } from "../../../types/content";
import { graphqlComoContratoContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const graphqlComoContratoLesson = {
  content: graphqlComoContratoContent,
  visuals,
  interactions,
} satisfies LessonModule;
