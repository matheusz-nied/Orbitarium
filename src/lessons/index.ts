import type { LessonModule } from "../types/content";
import { radiacaoCosmicaDeFundoLesson } from "./astrofisica/radiacao-cosmica-de-fundo";
import { newtonCalculoLesson } from "./matematica/newton-calculo";

export const lessonModules = [
  newtonCalculoLesson,
  radiacaoCosmicaDeFundoLesson,
] satisfies LessonModule[];

export const contents = lessonModules.map((lessonModule) => lessonModule.content);

export function getLessonModuleById(contentId: string) {
  return lessonModules.find((lessonModule) => lessonModule.content.id === contentId);
}
