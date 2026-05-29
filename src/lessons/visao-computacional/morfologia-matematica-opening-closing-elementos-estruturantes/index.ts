import type { LessonModule } from "../../../types/content";
import { morfologiaMatematicaOpeningClosingElementosEstruturantesContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const morfologiaMatematicaOpeningClosingElementosEstruturantesLesson = {
  content: morfologiaMatematicaOpeningClosingElementosEstruturantesContent,
  visuals,
  interactions,
} satisfies LessonModule;
