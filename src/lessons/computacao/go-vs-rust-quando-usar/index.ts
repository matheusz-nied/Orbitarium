import type { LessonModule } from "../../../types/content";
import { goVsRustQuandoUsarContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const goVsRustQuandoUsarLesson = {
  content: goVsRustQuandoUsarContent,
  visuals,
  interactions,
} satisfies LessonModule;
