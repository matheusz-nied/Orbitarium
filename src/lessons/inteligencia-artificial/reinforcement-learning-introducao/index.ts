import type { LessonModule } from "../../../types/content";
import { reinforcementLearningIntroducaoContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const reinforcementLearningIntroducaoLesson = {
  content: reinforcementLearningIntroducaoContent,
  visuals,
  interactions,
} satisfies LessonModule;
