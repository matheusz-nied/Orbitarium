import type { LessonModule } from "../../../types/content";
import { audioFalaAsrTtsContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const audioFalaAsrTtsLesson = {
  content: audioFalaAsrTtsContent,
  visuals,
  interactions,
} satisfies LessonModule;
