import type { LessonModule } from "../../../types/content";
import { dnsIpTcpHttpContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const dnsIpTcpHttpLesson = {
  content: dnsIpTcpHttpContent,
  visuals,
  interactions,
} satisfies LessonModule;
