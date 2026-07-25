import type { LessonModule } from "../../../types/content";
import { oQueEAprendizadoDeMaquinaContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const oQueEAprendizadoDeMaquinaLesson = {
  content: oQueEAprendizadoDeMaquinaContent,
  visuals,
  interactions,
} satisfies LessonModule;
