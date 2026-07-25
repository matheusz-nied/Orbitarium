import type { LessonModule } from "../../../types/content";
import { promptEngineeringComFundamentoContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const promptEngineeringComFundamentoLesson = {
  content: promptEngineeringComFundamentoContent,
  visuals,
  interactions,
} satisfies LessonModule;
