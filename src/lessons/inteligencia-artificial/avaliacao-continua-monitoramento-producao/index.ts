import type { LessonModule } from "../../../types/content";
import { avaliacaoContinuaMonitoramentoProducaoContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const avaliacaoContinuaMonitoramentoProducaoLesson = {
  content: avaliacaoContinuaMonitoramentoProducaoContent,
  visuals,
  interactions,
} satisfies LessonModule;
