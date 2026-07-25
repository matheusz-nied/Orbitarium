import type { LessonModule } from "../../../types/content";
import { chunkingRankingBasesVetoriaisContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const chunkingRankingBasesVetoriaisLesson = {
  content: chunkingRankingBasesVetoriaisContent,
  visuals,
  interactions,
} satisfies LessonModule;
