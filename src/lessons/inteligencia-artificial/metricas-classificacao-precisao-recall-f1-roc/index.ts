import type { LessonModule } from "../../../types/content";
import { metricasClassificacaoPrecisaoRecallF1RocContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const metricasClassificacaoPrecisaoRecallF1RocLesson = {
  content: metricasClassificacaoPrecisaoRecallF1RocContent,
  visuals,
  interactions,
} satisfies LessonModule;
