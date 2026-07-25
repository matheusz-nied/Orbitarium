import type { LessonModule } from "../../../types/content";
import { interactions } from "./interactions";
import { syscallsEOverheadDeIoContent } from "./content";
import { visuals } from "./visuals";

export const syscallsEOverheadDeIoLesson = {
  content: syscallsEOverheadDeIoContent,
  visuals,
  interactions,
} satisfies LessonModule;
