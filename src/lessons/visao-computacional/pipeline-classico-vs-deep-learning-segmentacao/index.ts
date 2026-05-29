import type { LessonModule } from "../../../types/content";
import { pipelineClassicoVsDeepLearningSegmentacaoContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const pipelineClassicoVsDeepLearningSegmentacaoLesson = {
  content: pipelineClassicoVsDeepLearningSegmentacaoContent,
  visuals,
  interactions,
} satisfies LessonModule;
