import type { LessonModule } from "../../../types/content";
import { explicabilidadeInterpretabilidadeContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const explicabilidadeInterpretabilidadeLesson = {
  content: explicabilidadeInterpretabilidadeContent,
  visuals,
  interactions,
} satisfies LessonModule;
