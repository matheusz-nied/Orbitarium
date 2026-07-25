import type { LessonModule } from "../../../types/content";
import { rustOwnershipBorrowingContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const rustOwnershipBorrowingLesson = {
  content: rustOwnershipBorrowingContent,
  visuals,
  interactions,
} satisfies LessonModule;
