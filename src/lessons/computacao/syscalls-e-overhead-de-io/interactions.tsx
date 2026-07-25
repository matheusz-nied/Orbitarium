import type { LessonModule } from "../../../types/content";
import { getWaveL5PartAInteractions } from "../shared/performanceWaveL5PartA";

export const interactions =
  getWaveL5PartAInteractions("syscalls-e-overhead-de-io") satisfies LessonModule["interactions"];
