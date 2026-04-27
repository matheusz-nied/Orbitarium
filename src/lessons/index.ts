import type { LessonModule } from "../types/content";
import { radiacaoCosmicaDeFundoLesson } from "./astrofisica/radiacao-cosmica-de-fundo";
import { comoFuncionaUmLlmLesson } from "./inteligencia-artificial/como-funciona-um-llm";
import { embeddingsLesson } from "./inteligencia-artificial/embeddings";
import { tokensTokenizacaoLesson } from "./inteligencia-artificial/tokens-tokenizacao";
import { newtonCalculoLesson } from "./matematica/newton-calculo";

export const lessonModules = [
  newtonCalculoLesson,
  radiacaoCosmicaDeFundoLesson,
  tokensTokenizacaoLesson,
  embeddingsLesson,
  comoFuncionaUmLlmLesson,
] satisfies LessonModule[];

export const contents = lessonModules.map((lessonModule) => lessonModule.content);

export function getLessonModuleById(contentId: string) {
  return lessonModules.find((lessonModule) => lessonModule.content.id === contentId);
}
