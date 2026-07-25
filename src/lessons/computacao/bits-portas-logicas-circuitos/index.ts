import type { LessonModule } from "../../../types/content";
import { bitsPortasLogicasCircuitosContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const bitsPortasLogicasCircuitosLesson = {
  content: bitsPortasLogicasCircuitosContent,
  visuals,
  interactions,
} satisfies LessonModule;
