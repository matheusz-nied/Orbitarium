import type { LessonModule } from "../../../types/content";
import { rustAsyncIntuicaoContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const rustAsyncIntuicaoLesson = {
  content: rustAsyncIntuicaoContent,
  visuals,
  interactions,
} satisfies LessonModule;
