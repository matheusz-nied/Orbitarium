import type { LessonModule } from "../../../types/content";
import { getWaveL1Visuals } from "../shared/performanceWaveL1";

export const visuals = getWaveL1Visuals("latencia-vs-throughput") satisfies LessonModule["visuals"];
