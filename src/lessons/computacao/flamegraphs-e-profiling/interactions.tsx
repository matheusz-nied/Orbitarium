import type { LessonModule } from "../../../types/content";
import { getWaveL1Interactions } from "../shared/performanceWaveL1";

export const interactions = getWaveL1Interactions("flamegraphs-e-profiling") satisfies LessonModule["interactions"];
