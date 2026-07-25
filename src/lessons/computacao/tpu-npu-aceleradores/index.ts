import type { LessonModule } from "../../../types/content";
import { tpuNpuAceleradoresContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const tpuNpuAceleradoresLesson = {
  content: tpuNpuAceleradoresContent,
  visuals,
  interactions,
} satisfies LessonModule;
