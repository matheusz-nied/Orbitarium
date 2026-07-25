import type { LessonModule } from "../../../types/content";
import { getWaveL5PartAInteractions } from "../shared/performanceWaveL5PartA";

export const interactions =
  getWaveL5PartAInteractions("lock-free-com-cuidado") satisfies LessonModule["interactions"];
