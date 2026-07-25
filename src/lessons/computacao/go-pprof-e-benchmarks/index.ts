import type { LessonModule } from "../../../types/content";
import { goPprofEBenchmarksContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const goPprofEBenchmarksLesson = {
  content: goPprofEBenchmarksContent,
  visuals,
  interactions,
} satisfies LessonModule;
