import type { LessonModule } from "../../../types/content";
import { capstoneGoVsRustCriterioContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const capstoneGoVsRustCriterioLesson = {
  content: capstoneGoVsRustCriterioContent,
  visuals,
  interactions,
} satisfies LessonModule;
