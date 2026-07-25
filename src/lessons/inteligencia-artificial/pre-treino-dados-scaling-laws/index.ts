import type { LessonModule } from "../../../types/content";
import { preTreinoDadosScalingLawsContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const preTreinoDadosScalingLawsLesson = {
  content: preTreinoDadosScalingLawsContent,
  visuals,
  interactions,
} satisfies LessonModule;
