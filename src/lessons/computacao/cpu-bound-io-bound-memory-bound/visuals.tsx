import type { LessonModule } from "../../../types/content";
import { getWaveL1Visuals } from "../shared/performanceWaveL1";

export const visuals = getWaveL1Visuals("cpu-bound-io-bound-memory-bound") satisfies LessonModule["visuals"];
