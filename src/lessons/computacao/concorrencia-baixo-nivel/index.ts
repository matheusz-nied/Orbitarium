import type { LessonModule } from "../../../types/content";
import { concorrenciaBaixoNivelContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const concorrenciaBaixoNivelLesson = {
  content: concorrenciaBaixoNivelContent,
  visuals,
  interactions,
} satisfies LessonModule;
