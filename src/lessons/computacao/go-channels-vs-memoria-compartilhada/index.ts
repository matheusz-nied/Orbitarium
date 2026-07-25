import type { LessonModule } from "../../../types/content";
import { goChannelsVsMemoriaCompartilhadaContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const goChannelsVsMemoriaCompartilhadaLesson = {
  content: goChannelsVsMemoriaCompartilhadaContent,
  visuals,
  interactions,
} satisfies LessonModule;
