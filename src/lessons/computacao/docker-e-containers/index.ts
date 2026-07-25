import type { LessonModule } from "../../../types/content";
import { dockerEContainersContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const dockerEContainersLesson = {
  content: dockerEContainersContent,
  visuals,
  interactions,
} satisfies LessonModule;
