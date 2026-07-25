import type { LessonModule } from "../../../types/content";
import { criptografiaModernaIntuicaoContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const criptografiaModernaIntuicaoLesson = {
  content: criptografiaModernaIntuicaoContent,
  visuals,
  interactions,
} satisfies LessonModule;
