import type { LessonModule } from "../../types/content";
import { bitsBytesRepresentacaoDadosLesson } from "./bits-bytes-representacao-dados";
import { bitsPortasLogicasCircuitosLesson } from "./bits-portas-logicas-circuitos";
import { cacheDeCpuLesson } from "./cache-de-cpu";
import { comoFuncionaAMemoriaRamLesson } from "./como-funciona-a-memoria-ram";
import { comoFuncionaUmaCpuLesson } from "./como-funciona-uma-cpu";
import { memoriaStackHeapPonteirosLesson } from "./memoria-stack-heap-ponteiros";

export const computacaoLessonModules = [
  bitsBytesRepresentacaoDadosLesson,
  bitsPortasLogicasCircuitosLesson,
  comoFuncionaUmaCpuLesson,
  memoriaStackHeapPonteirosLesson,
  cacheDeCpuLesson,
  comoFuncionaAMemoriaRamLesson,
] satisfies LessonModule[];
