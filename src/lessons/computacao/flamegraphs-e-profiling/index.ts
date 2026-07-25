import type { LessonModule } from "../../../types/content";
import { flamegraphsEProfilingContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const flamegraphsEProfilingLesson = {
  content: flamegraphsEProfilingContent,
  visuals,
  interactions,
} satisfies LessonModule;
