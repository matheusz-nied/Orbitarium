import type { LessonModule } from "../../../types/content";
import { getWaveL1Interactions } from "../shared/performanceWaveL1";

export const interactions = getWaveL1Interactions("cpu-bound-io-bound-memory-bound") satisfies LessonModule["interactions"];
