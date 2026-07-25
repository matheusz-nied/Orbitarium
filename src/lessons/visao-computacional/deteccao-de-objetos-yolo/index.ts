import type { LessonModule } from "../../../types/content";
import { deteccaoDeObjetosYoloContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const deteccaoDeObjetosYoloLesson = {
  content: deteccaoDeObjetosYoloContent,
  visuals,
  interactions,
} satisfies LessonModule;
