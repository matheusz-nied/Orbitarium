import type { LessonModule } from "../../../types/content";
import { isaX86ArmRiscvContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const isaX86ArmRiscvLesson = {
  content: isaX86ArmRiscvContent,
  visuals,
  interactions,
} satisfies LessonModule;
