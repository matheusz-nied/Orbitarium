import type { LessonModule } from "../../../types/content";
import { getWaveL1Interactions } from "../shared/performanceWaveL1";

export const interactions = getWaveL1Interactions("ampdal-e-limites-do-paralelismo") satisfies LessonModule["interactions"];
