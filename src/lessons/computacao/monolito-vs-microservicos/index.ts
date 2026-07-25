import type { LessonModule } from "../../../types/content";
import { monolitoVsMicroservicosContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const monolitoVsMicroservicosLesson = {
  content: monolitoVsMicroservicosContent,
  visuals,
  interactions,
} satisfies LessonModule;
