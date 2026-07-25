import type { LessonModule } from "../../../types/content";
import { getWaveL5PartAInteractions } from "../shared/performanceWaveL5PartA";

export const interactions =
  getWaveL5PartAInteractions("contencao-locks-e-filas") satisfies LessonModule["interactions"];
