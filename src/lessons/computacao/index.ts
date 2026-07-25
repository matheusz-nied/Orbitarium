import type { LessonModule } from "../../types/content";
import { bitsBytesRepresentacaoDadosLesson } from "./bits-bytes-representacao-dados";
import { comoFuncionaUmSistemaOperacionalLesson } from "./como-funciona-um-sistema-operacional";
import { processosThreadsConcorrenciaLesson } from "./processos-threads-concorrencia";
import { memoriaVirtualLesson } from "./memoria-virtual";
import { gpuParaIaLesson } from "./gpu-para-ia";
import { comoFuncionaAInternetLesson } from "./como-funciona-a-internet";
import { comoFuncionaUmBancoDeDadosLesson } from "./como-funciona-um-banco-de-dados";
import { indicesEBTreesLesson } from "./indices-e-b-trees";
import { dockerEContainersLesson } from "./docker-e-containers";

export const computacaoLessonModules = [
  bitsBytesRepresentacaoDadosLesson,
  comoFuncionaUmSistemaOperacionalLesson,
  processosThreadsConcorrenciaLesson,
  memoriaVirtualLesson,
  gpuParaIaLesson,
  comoFuncionaAInternetLesson,
  comoFuncionaUmBancoDeDadosLesson,
  indicesEBTreesLesson,
  dockerEContainersLesson,
] satisfies LessonModule[];
