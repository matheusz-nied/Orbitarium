import type { LessonModule } from "../../../types/content";
import { getWaveL1Interactions } from "../shared/performanceWaveL1";

export const interactions = getWaveL1Interactions("performance-mental-model") satisfies LessonModule["interactions"];
