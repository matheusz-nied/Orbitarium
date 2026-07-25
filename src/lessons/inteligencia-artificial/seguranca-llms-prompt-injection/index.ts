import type { LessonModule } from "../../../types/content";
import { segurancaLlmsPromptInjectionContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const segurancaLlmsPromptInjectionLesson = {
  content: segurancaLlmsPromptInjectionContent,
  visuals,
  interactions,
} satisfies LessonModule;
