import type { LessonModule } from "../../../types/content";
import { getWaveL5PartAVisuals } from "../shared/performanceWaveL5PartA";

export const visuals = getWaveL5PartAVisuals("lock-free-com-cuidado") satisfies LessonModule["visuals"];
