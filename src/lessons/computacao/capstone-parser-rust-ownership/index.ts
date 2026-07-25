import type { LessonModule } from "../../../types/content";
import { capstoneParserRustOwnershipContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const capstoneParserRustOwnershipLesson = {
  content: capstoneParserRustOwnershipContent,
  visuals,
  interactions,
} satisfies LessonModule;
