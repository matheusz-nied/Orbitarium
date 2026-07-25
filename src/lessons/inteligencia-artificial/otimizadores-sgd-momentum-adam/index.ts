import type { LessonModule } from "../../../types/content";
import { otimizadoresSgdMomentumAdamContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const otimizadoresSgdMomentumAdamLesson = {
  content: otimizadoresSgdMomentumAdamContent,
  visuals,
  interactions,
} satisfies LessonModule;
