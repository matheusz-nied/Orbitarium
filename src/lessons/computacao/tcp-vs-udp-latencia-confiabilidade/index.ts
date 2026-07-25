import type { LessonModule } from "../../../types/content";
import { tcpVsUdpLatenciaConfiabilidadeContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const tcpVsUdpLatenciaConfiabilidadeLesson = {
  content: tcpVsUdpLatenciaConfiabilidadeContent,
  visuals,
  interactions,
} satisfies LessonModule;
